import { Box, Typography } from "@mui/material";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { Alert, BrandLockup, Button, TextField } from "../../components";
import {
  ApiRequestError,
  createCommunicationError,
  type ApiErrorDetails,
} from "../../shared/api/apiError";
import type { ChangePasswordRequest } from "./authenticationApi";
import {
  JourneyAside,
  JourneyCanvas,
  LoginForm,
  LoginPanel,
} from "./LoginView.styles";
import { pendingLayoutTokens } from "../../theme/tokens";
import { Icon } from "../../components/Icon";

export interface PasswordChangeViewProps {
  change: (request: ChangePasswordRequest) => Promise<void>;
  onCompleted?: () => void;
  onRestart: () => void;
  loading?: boolean;
  initialError?: ApiErrorDetails;
}

export function PasswordChangeView({
  change,
  onCompleted,
  onRestart,
  loading = false,
  initialError,
}: PasswordChangeViewProps) {
  const id = useId();
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(initialError);
  const [mismatch, setMismatch] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const confirmationRef = useRef<HTMLInputElement>(null);
  const submitting = useRef(false);
  const busy = loading || pending;
  const length = Array.from(password).length;
  const criteria = [
    length >= 8,
    length > 0 && length <= 128,
    password.length > 0 && !/\s/u.test(password),
  ];
  const valid = criteria.every(Boolean) && confirmation.length > 0;
  const expired = error?.status === 401;
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy || submitting.current || !valid || expired) return;
    if (password !== confirmation) {
      setMismatch(true);
      confirmationRef.current?.focus();
      return;
    }
    submitting.current = true;
    setPending(true);
    setError(undefined);
    setMismatch(false);
    try {
      await change({ novaSenha: password, confirmacaoNovaSenha: confirmation });
      setPassword("");
      setConfirmation("");
      onCompleted?.();
    } catch (failure: unknown) {
      const details =
        failure instanceof ApiRequestError
          ? failure.details
          : createCommunicationError("/api/v1/autenticacao/alterar-senha");
      if (details.status === 401) {
        setPassword("");
        setConfirmation("");
      }
      setError(details);
    } finally {
      submitting.current = false;
      setPending(false);
    }
  }

  return (
    <JourneyCanvas
      sx={{
        [`@media (min-width: ${pendingLayoutTokens.breakpoints.desktop}px)`]: {
          minHeight: "max(1020px, 100svh)",
        },
      }}
    >
      <LoginPanel aria-labelledby={`${id}-title`}>
        <Box sx={{ alignSelf: "flex-start" }}>
          <BrandLockup size="compact" tone="on-light" />
        </Box>
        <LoginForm
          aria-labelledby={`${id}-title`}
          aria-busy={busy}
          onSubmit={(event) => void submit(event)}
        >
          <Typography
            ref={headingRef}
            tabIndex={-1}
            id={`${id}-title`}
            component="h1"
            variant="headingLarge"
          >
            Crie sua senha
          </Typography>
          <Typography
            variant="bodyMedium"
            sx={{ color: "var(--pj-color-text-secondary)" }}
          >
            Defina sua senha definitiva. A senha temporária deixa de valer assim
            que você salvar a nova.
          </Typography>
          <Alert
            className="login-feedback"
            severity={error || mismatch ? "error" : "information"}
            title={
              expired
                ? "Tempo esgotado"
                : mismatch
                  ? "As senhas não conferem"
                  : error
                    ? "Não foi possível salvar"
                    : "Você tem 15 minutos para concluir"
            }
          >
            {expired
              ? "Inicie novamente o acesso para continuar."
              : mismatch
                ? "Digite a mesma senha nos dois campos."
                : error
                  ? error.status === 0 || error.status >= 500
                    ? "Verifique sua conexão e tente novamente."
                    : error.mensagem
                  : "Passando disso, você vai precisar pedir uma nova senha temporária. Esta etapa não pode ser pulada."}
          </Alert>
          {expired ? (
            <Button
              className="login-submit"
              size="large"
              fullWidth
              onClick={onRestart}
            >
              Voltar ao Login
            </Button>
          ) : (
            <>
              <Box className="login-fields">
                <TextField
                  size="large"
                  type="password"
                  id={`${id}-new`}
                  name="novaSenha"
                  label="Nova senha"
                  required
                  autoComplete="new-password"
                  placeholder="Digite a nova senha"
                  value={password}
                  readOnly={busy}
                  inputProps={{
                    minLength: 8,
                    maxLength: 128,
                    pattern: "\\S+",
                    "aria-describedby": `${id}-criteria`,
                  }}
                  errorMessage={
                    error?.erros?.find((item) => item.campo === "novaSenha")
                      ?.mensagem
                  }
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setMismatch(false);
                  }}
                />
                <TextField
                  size="large"
                  type="password"
                  ref={confirmationRef}
                  id={`${id}-confirmation`}
                  name="confirmacaoNovaSenha"
                  label="Repita a nova senha"
                  required
                  autoComplete="new-password"
                  placeholder="Digite de novo"
                  value={confirmation}
                  readOnly={busy}
                  inputProps={{ minLength: 8, maxLength: 128, pattern: "\\S+" }}
                  errorMessage={
                    mismatch
                      ? "As senhas precisam ser iguais."
                      : error?.erros?.find(
                          (item) => item.campo === "confirmacaoNovaSenha",
                        )?.mensagem
                  }
                  onChange={(event) => {
                    setConfirmation(event.target.value);
                    setMismatch(false);
                  }}
                />
              </Box>
              <Box
                id={`${id}-criteria`}
                sx={{
                  background: "var(--pj-color-bg-canvas)",
                  borderRadius: "var(--pj-radius-lg)",
                  p: "var(--pj-space-3)",
                  color: "var(--pj-color-text-secondary)",
                }}
              >
                <Typography variant="bodySmall">A senha precisa ter</Typography>
                <Box
                  component="ul"
                  sx={{
                    listStyle: "none",
                    p: 0,
                    mb: 0,
                    mt: "var(--pj-space-2)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--pj-space-2)",
                  }}
                >
                  {[
                    "Pelo menos 8 caracteres",
                    "No máximo 128 caracteres",
                    "Nenhum espaço",
                  ].map((label, index) => (
                    <Box
                      component="li"
                      key={label}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "var(--pj-space-2)",
                      }}
                    >
                      {criteria[index] ? (
                        <Icon
                          name="check_circle"
                          size="md"
                          style={{ color: "var(--pj-color-feedback-success)" }}
                        />
                      ) : (
                        <Icon name="radio_button_unchecked" size="md" />
                      )}
                      <Typography variant="bodySmall">
                        {label}
                        <Box
                          component="span"
                          sx={{
                            position: "absolute",
                            width: "1px",
                            height: "1px",
                            overflow: "hidden",
                            clipPath: "inset(50%)",
                          }}
                        >
                          {criteria[index] ? ": atendido" : ": pendente"}
                        </Box>
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
              <Button
                className="login-submit"
                type="submit"
                size="large"
                fullWidth
                loading={busy}
                disabled={!valid}
              >
                Salvar senha
              </Button>
            </>
          )}
        </LoginForm>
        <Typography
          variant="bodySmall"
          sx={{ color: "var(--pj-color-text-secondary)" }}
        >
          Problemas para entrar? Fale com o coordenador da sua pastoral.
        </Typography>
      </LoginPanel>
      <JourneyAside aria-label="Sobre a Pastoral da Juventude">
        <Typography className="login-overline" variant="labelLarge">
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
            <Icon name="calendar_month" />
            <Typography variant="bodyMedium">
              Encontros, presença e pendências no mesmo lugar
            </Typography>
          </li>
          <li>
            <Icon name="groups" />
            <Typography variant="bodyMedium">
              Cada pessoa da pastoral com a sua história
            </Typography>
          </li>
          <li>
            <Icon name="workspace_premium" />
            <Typography variant="bodyMedium">
              Lideranças acompanhadas, não improvisadas
            </Typography>
          </li>
        </Box>
      </JourneyAside>
    </JourneyCanvas>
  );
}
