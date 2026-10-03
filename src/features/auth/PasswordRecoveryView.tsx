import {
  CalendarMonthRounded,
  ContentCopyRounded,
  GroupsRounded,
  PasswordRounded,
  WorkspacePremiumRounded,
} from "@mui/icons-material";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import {
  Alert,
  BrandLockup,
  Button,
  IconButton,
  TextField,
} from "../../components";
import {
  ApiRequestError,
  createCommunicationError,
  type ApiErrorDetails,
} from "../../shared/api/apiError";
import { breakpointTokens } from "../../theme/tokens";
import type { RecoveryRequest, RecoveryResponse } from "./authenticationApi";
import {
  JourneyAside,
  JourneyCanvas,
  LoginForm,
  LoginPanel,
} from "./LoginView.styles";

export interface PasswordRecoveryViewProps {
  recover: (request: RecoveryRequest) => Promise<RecoveryResponse>;
  onBack: () => void;
  loading?: boolean;
  initialError?: ApiErrorDetails;
}

function parseBirthDate(value: string): string | null {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/u.exec(value);
  if (!match) return null;
  const iso = `${match[3]}-${match[2]}-${match[1]}`;
  const date = new Date(`${iso}T00:00:00Z`);
  return Number.isFinite(date.getTime()) &&
    date.toISOString().slice(0, 10) === iso
    ? iso
    : null;
}

function feedback(error: ApiErrorDetails) {
  if (error.codigo === "RECUPERACAO_SENHA_EM_ANDAMENTO")
    return {
      title: "Já existe uma recuperação em andamento",
      text: "A senha temporária que você recebeu ainda vale. Use-a para entrar ou espere ela expirar (15 minutos) para pedir outra.",
      tone: "warning" as const,
    };
  if (error.codigo === "DADOS_RECUPERACAO_NAO_LOCALIZADOS")
    return {
      title: "Não foi possível confirmar seus dados",
      text: "Confira nome, e-mail, data de nascimento e paróquia. Se continuar, fale com o coordenador da sua pastoral.",
      tone: "danger" as const,
    };
  if (error.codigo === "USUARIO_INATIVO")
    return {
      title: "Esta conta está inativa",
      text: "Fale com o coordenador da sua pastoral para reativar o acesso.",
      tone: "danger" as const,
    };
  if (error.status === 429)
    return {
      title: "Muitas tentativas",
      text: "Por segurança, aguarde antes de tentar de novo. As tentativas ficam bloqueadas por 30 minutos.",
      tone: "danger" as const,
    };
  return {
    title: "Não foi possível recuperar sua senha",
    text: "Verifique sua conexão e tente novamente.",
    tone: "danger" as const,
  };
}

export function PasswordRecoveryView({
  recover,
  onBack,
  loading = false,
  initialError,
}: PasswordRecoveryViewProps) {
  const id = useId();
  const theme = useTheme();
  const tablet = useMediaQuery(`(min-width: ${breakpointTokens.tablet}px)`);
  const [values, setValues] = useState({
    nome: "",
    email: "",
    dataNascimento: "",
    nomeParoquia: "",
  });
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof RecoveryRequest, string>>
  >({});
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(initialError);
  const [result, setResult] = useState<RecoveryResponse>();
  const [copyFeedback, setCopyFeedback] = useState("");
  const [now, setNow] = useState(Date.now);
  const submitting = useRef(false);
  const mounted = useRef(true);
  const heading = useRef<HTMLHeadingElement>(null);
  const inputs = useRef<
    Partial<Record<keyof RecoveryRequest, HTMLInputElement | null>>
  >({});
  const busy = loading || pending;
  const blocked =
    error?.status === 429 && (!error.retryAfterAt || now < error.retryAfterAt);
  const expiresAt = result ? Date.parse(result.expiraEm) : 0;
  const seconds = Math.max(0, Math.ceil((expiresAt - now) / 1000));
  const remaining = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
  useEffect(() => {
    mounted.current = true;
    heading.current?.focus();
    return () => {
      mounted.current = false;
    };
  }, []);
  useEffect(() => {
    if (!result && error?.status !== 429) return;
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [result, error]);
  useEffect(() => {
    if (result) heading.current?.focus();
  }, [result]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy || blocked || submitting.current) return;
    const normalized = {
      ...values,
      nome: values.nome.trim(),
      email: values.email.trim().toLowerCase(),
      nomeParoquia: values.nomeParoquia.trim().replace(/\s+/gu, " "),
    };
    const date = parseBirthDate(values.dataNascimento);
    const errors: typeof fieldErrors = {};
    if (!normalized.nome) errors.nome = "Informe seu nome completo.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(normalized.email))
      errors.email = "Informe um e-mail válido.";
    if (!date)
      errors.dataNascimento = "Informe uma data válida no formato dd/mm/aaaa.";
    if (!normalized.nomeParoquia)
      errors.nomeParoquia = "Informe o nome da sua paróquia.";
    setFieldErrors(errors);
    const first = Object.keys(errors)[0] as keyof RecoveryRequest | undefined;
    if (first) {
      inputs.current[first]?.focus();
      return;
    }
    submitting.current = true;
    setPending(true);
    setError(undefined);
    try {
      const response = await recover({ ...normalized, dataNascimento: date! });
      if (mounted.current) {
        setResult(response);
        setNow(Date.now());
        setCopyFeedback("");
      }
    } catch (failure: unknown) {
      if (mounted.current)
        setError(
          failure instanceof ApiRequestError
            ? failure.details
            : createCommunicationError("/api/v1/autenticacao/recuperar-senha"),
        );
    } finally {
      submitting.current = false;
      if (mounted.current) setPending(false);
    }
  }
  async function copy() {
    if (!result || seconds === 0) return;
    try {
      await navigator.clipboard.writeText(result.senhaTemporaria);
      if (mounted.current) setCopyFeedback("Senha temporária copiada.");
    } catch {
      if (mounted.current)
        setCopyFeedback(
          "Não foi possível copiar. Selecione o valor e copie manualmente.",
        );
    }
  }
  const message = error ? feedback(error) : undefined;
  return (
    <JourneyCanvas
      sx={{
        [`@media (min-width: ${breakpointTokens.desktop}px)`]: {
          minHeight: "max(1060px, 100svh)",
        },
      }}
    >
      <LoginPanel aria-labelledby={`${id}-title`}>
        <Box sx={{ alignSelf: "flex-start" }}>
          <BrandLockup
            size="compact"
            tone={theme.palette.mode === "dark" ? "on-dark" : "on-light"}
          />
        </Box>
        <LoginForm
          noValidate
          aria-labelledby={`${id}-title`}
          aria-busy={busy}
          onSubmit={(event) => void submit(event)}
          sx={{
            "& .recovery-fields": {
              display: "flex",
              flexDirection: "column",
              mt: "28px",
              "& .MuiFormHelperText-root": { marginTop: 0 },
            },
            "& .login-submit": { mt: "var(--spacing-2xl)" },
          }}
        >
          {result ? (
            <>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "var(--radius-pill)",
                  bgcolor: "var(--status-success-subtle)",
                  color: "var(--status-success-text)",
                  display: "grid",
                  placeItems: "center",
                  mb: "var(--spacing-lg)",
                }}
              >
                <PasswordRounded aria-hidden />
              </Box>
              <Typography
                id={`${id}-title`}
                component="h1"
                variant="displayLarge"
                ref={heading}
                tabIndex={-1}
              >
                Sua senha temporária
              </Typography>
              <Typography
                variant="bodyMedium"
                sx={{ color: "var(--text-secondary)" }}
              >
                Ela vale por 15 minutos e só serve para iniciar a troca
                obrigatória de senha — guarde-a agora.
              </Typography>
              <Box
                sx={{
                  mt: "var(--spacing-lg)",
                  p: "var(--spacing-lg)",
                  bgcolor: "var(--bg-surface-alt)",
                  border: "1px solid var(--border-default)",
                  borderRadius: "var(--radius-md)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "var(--spacing-sm)",
                }}
              >
                <Typography
                  component="code"
                  variant="bodyMedium"
                  sx={{
                    fontSize: "var(--font-size-xl)",
                    fontWeight: 600,
                    letterSpacing: "2px",
                    overflowWrap: "anywhere",
                  }}
                >
                  {seconds > 0
                    ? result.senhaTemporaria
                    : "Senha temporária expirada"}
                </Typography>
                <IconButton
                  label="Copiar senha temporária"
                  icon={<ContentCopyRounded />}
                  variant="tertiary"
                  size="large"
                  disabled={seconds === 0}
                  onClick={() => void copy()}
                />
              </Box>
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  mt: "var(--spacing-sm)",
                  color: "var(--text-secondary)",
                }}
              >
                Copie agora — ela some ao sair desta tela.
              </Typography>
              <Typography role="status" variant="caption">
                {copyFeedback}
              </Typography>
              <Button
                className="login-submit"
                size="large"
                fullWidth
                onClick={onBack}
              >
                Voltar para entrar
              </Button>
              <Button
                variant="discreet"
                size="large"
                fullWidth
                disabled={seconds > 0}
                sx={{ mt: "var(--spacing-md)" }}
                onClick={() => {
                  setResult(undefined);
                  setCopyFeedback("");
                  setError(undefined);
                }}
              >
                {seconds > 0
                  ? `Pedir outra em ${remaining}`
                  : "Pedir outra senha temporária"}
              </Button>
            </>
          ) : (
            <>
              <Typography
                id={`${id}-title`}
                component="h1"
                variant="displayLarge"
                ref={heading}
                tabIndex={-1}
              >
                Esqueci minha senha
              </Typography>
              <Typography
                variant="bodyMedium"
                sx={{ color: "var(--text-secondary)" }}
              >
                Para confirmar que é você, informe os quatro dados do seu
                cadastro. Sua senha temporária aparece na tela, se os dados
                conferirem.
              </Typography>
              {message && (
                <Alert
                  className="login-feedback"
                  title={message.title}
                  tone={message.tone}
                >
                  {message.text}
                </Alert>
              )}
              <Box className="recovery-fields">
                {(
                  [
                    ["nome", "Nome completo", "Como está no cadastro", "name"],
                    ["email", "E-mail", "seu.nome@exemplo.com.br", "email"],
                    [
                      "dataNascimento",
                      "Data de nascimento",
                      "dd/mm/aaaa",
                      "bday",
                    ],
                    ["nomeParoquia", "Paróquia", "Nome da sua paróquia", "off"],
                  ] as const
                ).map(([key, label, placeholder, autoComplete]) => (
                  <TextField
                    key={key}
                    id={`${id}-${key}`}
                    name={key}
                    label={label}
                    placeholder={placeholder}
                    required
                    size={tablet ? "medium" : "large"}
                    disabled={blocked}
                    readOnly={busy}
                    autoComplete={autoComplete}
                    value={values[key]}
                    ref={(element) => {
                      inputs.current[key] = element;
                    }}
                    inputProps={{
                      maxLength: key === "dataNascimento" ? 10 : 500,
                      ...(key === "dataNascimento"
                        ? { inputMode: "numeric" as const }
                        : {}),
                      ...(key === "email"
                        ? { inputMode: "email" as const }
                        : {}),
                    }}
                    errorMessage={
                      fieldErrors[key] ??
                      error?.erros?.find((item) => item.campo === key)?.mensagem
                    }
                    onChange={(event) => {
                      const value = event.target.value;
                      setValues((current) => ({ ...current, [key]: value }));
                      setFieldErrors((current) => ({
                        ...current,
                        [key]: undefined,
                      }));
                    }}
                  />
                ))}
              </Box>
              <Button
                className="login-submit"
                type="submit"
                size="large"
                fullWidth
                loading={busy}
                disabled={blocked}
              >
                Ver minha senha temporária
              </Button>
              <Button
                variant="discreet"
                size="large"
                fullWidth
                disabled={busy}
                onClick={onBack}
                sx={{ mt: "var(--spacing-md)" }}
              >
                Voltar para entrar
              </Button>
            </>
          )}
        </LoginForm>
        <Typography variant="caption" sx={{ color: "var(--text-secondary)" }}>
          Problemas para entrar? Fale com o coordenador da sua pastoral.
        </Typography>
      </LoginPanel>
      <JourneyAside aria-label="Sobre a Pastoral da Juventude">
        <Typography className="login-overline" variant="overline">
          Pastoral da Juventude
        </Typography>
        <Box>
          <blockquote>
            “Porque onde dois ou três estiverem reunidos em meu nome, ali estou
            eu no meio deles.”
          </blockquote>
          <cite>Mt 18,20</cite>
        </Box>
        <Box component="ul" className="login-benefits">
          <li>
            <CalendarMonthRounded />
            <Typography variant="bodyMedium">
              Encontros, presença e pendências no mesmo lugar
            </Typography>
          </li>
          <li>
            <GroupsRounded />
            <Typography variant="bodyMedium">
              Cada pessoa da pastoral com a sua história
            </Typography>
          </li>
          <li>
            <WorkspacePremiumRounded />
            <Typography variant="bodyMedium">
              Lideranças acompanhadas, não improvisadas
            </Typography>
          </li>
        </Box>
      </JourneyAside>
    </JourneyCanvas>
  );
}
