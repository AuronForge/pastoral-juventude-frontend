import {
  CalendarMonthRounded,
  GroupsRounded,
  WorkspacePremiumRounded,
} from "@mui/icons-material";
import { Box, Typography, useTheme } from "@mui/material";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import {
  Alert,
  BrandLockup,
  Button,
  Checkbox,
  Link,
  PasswordField,
  TextField,
} from "../../components";
import {
  ApiRequestError,
  createCommunicationError,
} from "../../shared/api/apiError";
import type { LoginViewProps } from "./LoginView.types";
import {
  JourneyAside,
  JourneyCanvas,
  LoginForm,
  LoginPanel,
} from "./LoginView.styles";

import { loginFeedback } from "./loginFeedback";

/** Composição da Jornada de Login, compartilhada com as histórias. */
export function LoginView({
  authenticate,
  initialCredentials = { email: "", senha: "" },
  initialError,
  loading = false,
  notice,
  onAuthenticated,
  onPasswordChangeRequired,
}: LoginViewProps) {
  const id = useId();
  const theme = useTheme();
  const [email, setEmail] = useState(initialCredentials.email);
  const [password, setPassword] = useState(
    initialError?.status === 401 ? "" : initialCredentials.senha,
  );
  const [now, setNow] = useState(Date.now);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(initialError);
  const [destination, setDestination] = useState<
    "authenticated" | "passwordChangeRequired" | null
  >(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const destinationRef = useRef<HTMLHeadingElement>(null);
  const submittingRef = useRef(false);
  const busy = loading || pending;
  const invalidCredentials =
    error?.status === 401 && error.codigo === "CREDENCIAIS_INVALIDAS";
  const blocked =
    error?.status === 429 &&
    error.retryAfterAt !== undefined &&
    now < error.retryAfterAt;
  const feedback = loginFeedback(error);

  useEffect(() => {
    if (error?.retryAfterAt === undefined) return;
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [error?.retryAfterAt]);

  useEffect(() => {
    if (error?.status === 401) passwordRef.current?.focus();
  }, [error]);

  useEffect(() => {
    if (destination) destinationRef.current?.focus();
  }, [destination]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (
      busy ||
      submittingRef.current ||
      (error?.retryAfterAt !== undefined && Date.now() < error.retryAfterAt)
    )
      return;
    submittingRef.current = true;
    setPending(true);
    setError(undefined);
    try {
      const response = await authenticate({
        email: email.trim().toLowerCase(),
        senha: password,
      });
      setPassword("");
      if (response.tokenType === "TROCA_SENHA") {
        setDestination("passwordChangeRequired");
        onPasswordChangeRequired?.(response);
      } else {
        setDestination("authenticated");
        onAuthenticated?.(response);
      }
    } catch (failure: unknown) {
      const details =
        failure instanceof ApiRequestError
          ? failure.details
          : createCommunicationError("/api/v1/autenticacao/login");
      if (details.status === 401) setPassword("");
      setError(details);
    } finally {
      submittingRef.current = false;
      setPending(false);
    }
  }

  return (
    <JourneyCanvas>
      <LoginPanel aria-labelledby={`${id}-title`}>
        <Box sx={{ alignSelf: "flex-start" }}>
          <BrandLockup
            size="compact"
            tone={theme.palette.mode === "dark" ? "on-dark" : "on-light"}
          />
        </Box>
        {destination ? (
          <Box>
            <Typography
              ref={destinationRef}
              tabIndex={-1}
              id={`${id}-title`}
              component="h1"
              variant="displayLarge"
            >
              {destination === "passwordChangeRequired"
                ? "Altere sua senha"
                : "Acesso autorizado"}
            </Typography>
            <Typography
              role="status"
              variant="bodyMedium"
              sx={{ mt: "var(--spacing-lg)" }}
            >
              {destination === "passwordChangeRequired"
                ? "Para continuar seu primeiro acesso, é necessário alterar a senha."
                : "Seu acesso foi autorizado."}
            </Typography>
          </Box>
        ) : (
          <LoginForm
            aria-labelledby={`${id}-title`}
            aria-busy={busy}
            onSubmit={(event) => void submit(event)}
          >
            <Typography
              component="h1"
              id={`${id}-title`}
              variant="displayLarge"
            >
              Entrar
            </Typography>
            <Typography
              variant="bodyMedium"
              sx={{ color: "var(--text-secondary)" }}
            >
              Use o e-mail cadastrado na sua pastoral.
            </Typography>
            {notice && !error && (
              <Alert
                className="login-feedback"
                tone={notice === "passwordChanged" ? "success" : "warning"}
                title={
                  notice === "passwordChanged"
                    ? "Senha alterada"
                    : "Tempo esgotado"
                }
              >
                {notice === "passwordChanged"
                  ? "Entre com a sua nova senha."
                  : "Inicie novamente o acesso para continuar."}
              </Alert>
            )}
            {error && (
              <Alert
                className="login-feedback"
                tone={error.status === 429 ? "warning" : "danger"}
                title={feedback.title}
              >
                {feedback.message}
                {blocked && (
                  <span>
                    {" "}
                    Nova tentativa disponível em{" "}
                    {Math.ceil((error.retryAfterAt! - now) / 1000)} segundos.
                  </span>
                )}
              </Alert>
            )}
            <Box className="login-fields">
              <TextField
                id={`${id}-email`}
                name="email"
                label="E-mail"
                type="email"
                required
                autoComplete="username"
                placeholder="seu.nome@exemplo.com.br"
                value={email}
                readOnly={busy}
                inputProps={{ autoCapitalize: "none", spellCheck: false }}
                onChange={(event) => setEmail(event.target.value)}
              />
              <PasswordField
                ref={passwordRef}
                id={`${id}-password`}
                name="senha"
                label="Senha"
                required
                autoComplete="current-password"
                placeholder="Sua senha"
                value={password}
                readOnly={busy}
                errorMessage={
                  invalidCredentials ? "Digite a senha novamente." : undefined
                }
                onChange={(event) => setPassword(event.target.value)}
              />
            </Box>
            <Box className="login-options">
              <Checkbox
                label="Continuar conectado"
                checked={false}
                disabled
                aria-label="Continuar conectado (indisponível)"
              />
              <Link
                href="#recuperacao-senha"
                disabled
                aria-label="Esqueci minha senha (indisponível)"
              >
                Esqueci minha senha
              </Link>
            </Box>
            <Button
              className="login-submit"
              type="submit"
              size="large"
              fullWidth
              loading={busy}
              disabled={blocked}
            >
              Entrar
            </Button>
          </LoginForm>
        )}
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
