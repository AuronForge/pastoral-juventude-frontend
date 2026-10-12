import { Typography } from "@mui/material";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import {
  AccessLayout,
  Alert,
  Button,
  DatePicker,
  Link,
  TextField,
} from "../../components";
import {
  ApiRequestError,
  createCommunicationError,
  type ApiErrorDetails,
} from "../../shared/api/apiError";
import type { RecoveryRequest, RecoveryResponse } from "./authenticationApi";
import { LoginStructure } from "./LoginView.styles";

export interface PasswordRecoveryViewProps {
  recover: (request: RecoveryRequest) => Promise<RecoveryResponse>;
  /** Voltar ao login e Entrar com senha temporária levam ao Login. */
  onBack: () => void;
  loading?: boolean;
  initialError?: ApiErrorDetails;
}

function parseBirthDate(value: string): string | null {
  if (!/^\d{4}-\d{2}-\d{2}$/u.test(value)) return null;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(date.getTime()) &&
    date.toISOString().slice(0, 10) === value
    ? value
    : null;
}

/**
 * Alertas da JA-02. 404, 409, 429 e falha de conexão seguem o Figma;
 * USUARIO_INATIVO não tem tela no Figma (PENDÊNCIA de desenho).
 */
function feedback(error: ApiErrorDetails) {
  if (error.codigo === "RECUPERACAO_SENHA_EM_ANDAMENTO")
    return {
      title: "Recuperação já iniciada",
      text: "Já existe uma recuperação válida. Use a senha temporária obtida ou aguarde sua expiração.",
      severity: "attention" as const,
    };
  if (error.codigo === "DADOS_RECUPERACAO_NAO_LOCALIZADOS")
    return {
      title: "Confira os dados informados",
      text: "Não foi possível localizar os dados de recuperação. Revise as informações.",
      severity: "error" as const,
    };
  if (error.codigo === "USUARIO_INATIVO")
    return {
      title: "Esta conta está inativa",
      text: "Fale com o coordenador da sua pastoral para reativar o acesso.",
      severity: "error" as const,
    };
  if (error.status === 429)
    return {
      title: "Aguarde para tentar novamente",
      text: "Muitas tentativas de recuperação. Tente novamente em 30 minutos.",
      severity: "attention" as const,
    };
  return {
    title: "Não foi possível recuperar",
    text: "Tente novamente quando a conexão estiver disponível.",
    severity: "error" as const,
  };
}

const FIELDS = [
  ["nome", "Nome completo", "Nome completo", "name"],
  ["email", "E-mail", "seuemail@exemplo.com", "email"],
  ["dataNascimento", "Data de nascimento", "", "bday"],
  ["nomeParoquia", "Nome da paróquia", "Nome da paróquia", "off"],
] as const;

/** Jornada JA-02 / Recuperação de senha do Figma, sobre o Access Layout. */
export function PasswordRecoveryView({
  recover,
  onBack,
  loading = false,
  initialError,
}: PasswordRecoveryViewProps) {
  const id = useId();
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
    if (!date) errors.dataNascimento = "Data inválida";
    if (!normalized.nomeParoquia)
      errors.nomeParoquia = "Informe o nome da paróquia.";
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

  const header = (title: string, description: string) => (
    <>
      <Typography
        ref={heading}
        tabIndex={-1}
        component="h1"
        id={`${id}-title`}
        variant="headingMedium"
      >
        {title}
      </Typography>
      <Typography className="login-description" variant="bodyMedium">
        {description}
      </Typography>
    </>
  );
  const message = error ? feedback(error) : undefined;

  return (
    <AccessLayout aria-labelledby={`${id}-title`}>
      {result ? (
        <LoginStructure as="div">
          {header(
            "Senha temporária gerada",
            "Guarde a senha para continuar com a recuperação.",
          )}
          <div className="login-sections">
            <Alert severity="success" title="Senha temporária gerada">
              Esta senha é exibida uma única vez e vale por 15 minutos. Guarde-a
              antes de continuar.
            </Alert>
            <TextField
              id={`${id}-temporaria`}
              label="Sua senha temporária"
              type="password"
              size="large"
              readOnly
              disabled={seconds === 0}
              value={seconds > 0 ? result.senhaTemporaria : ""}
              hint={seconds > 0 ? undefined : "Senha temporária expirada."}
            />
            <Button
              variant="secondary"
              size="large"
              fullWidth
              disabled={seconds === 0}
              onClick={() => void copy()}
            >
              Copiar senha
            </Button>
            <Button size="large" fullWidth onClick={onBack}>
              Entrar com senha temporária
            </Button>
            {/* PENDÊNCIA: sem desenho no Figma (validade e nova solicitação). */}
            <Button
              variant="tertiary"
              size="large"
              fullWidth
              disabled={seconds > 0}
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
            <Typography
              role="status"
              variant="bodySmall"
              sx={{ color: "var(--pj-color-text-secondary)" }}
            >
              {copyFeedback}
            </Typography>
          </div>
        </LoginStructure>
      ) : (
        <LoginStructure
          noValidate
          aria-labelledby={`${id}-title`}
          aria-busy={busy}
          onSubmit={(event) => void submit(event)}
        >
          {header(
            "Recupere seu acesso",
            "Informe os dados do seu cadastro para recuperar a senha.",
          )}
          <div className="login-sections">
            {message && (
              <Alert title={message.title} severity={message.severity}>
                {message.text}
              </Alert>
            )}
            {FIELDS.map(([key, label, placeholder, autoComplete]) => {
              const common = {
                id: `${id}-${key}`,
                name: key,
                label,
                required: true,
                size: "large" as const,
                disabled: blocked || busy,
                autoComplete,
                errorMessage:
                  fieldErrors[key] ??
                  error?.erros?.find((item) => item.campo === key)?.mensagem,
              };
              const update = (value: string) => {
                setValues((current) => ({ ...current, [key]: value }));
                setFieldErrors((current) => ({ ...current, [key]: undefined }));
              };
              return key === "dataNascimento" ? (
                <DatePicker
                  key={key}
                  {...common}
                  value={values[key]}
                  ref={(element) => {
                    inputs.current[key] = element;
                  }}
                  onChange={update}
                />
              ) : (
                <TextField
                  key={key}
                  {...common}
                  type={key === "email" ? "email" : "text"}
                  placeholder={placeholder}
                  value={values[key]}
                  ref={(element) => {
                    inputs.current[key] = element;
                  }}
                  inputProps={{ maxLength: 500 }}
                  onChange={(event) => update(event.target.value)}
                />
              );
            })}
            <Button
              type="submit"
              size="large"
              fullWidth
              loading={busy}
              disabled={blocked}
            >
              Gerar senha temporária
            </Button>
            <div className="login-recovery">
              <Link
                href="/login"
                onClick={(event) => {
                  event.preventDefault();
                  onBack();
                }}
              >
                Voltar ao login
              </Link>
            </div>
          </div>
        </LoginStructure>
      )}
    </AccessLayout>
  );
}
