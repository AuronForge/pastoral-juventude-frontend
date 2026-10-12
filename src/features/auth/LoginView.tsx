import { Typography } from "@mui/material";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { AccessLayout, Alert, Button, Link, TextField } from "../../components";
import {
  ApiRequestError,
  createCommunicationError,
} from "../../shared/api/apiError";
import type { LoginResponse } from "./authenticationApi";
import type { LoginViewProps } from "./LoginView.types";
import { LoginStructure } from "./LoginView.styles";
import { loginFeedback } from "./loginFeedback";

type Authenticated = Extract<LoginResponse, { tokenType: "Bearer" }>;

const NOTICES = {
  passwordChanged: {
    severity: "success",
    title: "Senha alterada",
    message: "Entre com a sua nova senha.",
  },
  blocked: {
    severity: "attention",
    title: "Usuário bloqueado",
    message: "Entre em contato com o coordenador da pastoral.",
  },
  inactive: {
    severity: "attention",
    title: "Usuário inativo",
    message: "Entre em contato com o coordenador da pastoral.",
  },
  replaced: {
    severity: "attention",
    title: "Sessão substituída",
    message:
      "Um novo login encerrou esta sessão. Entre novamente para continuar.",
  },
  expired: {
    severity: "attention",
    title: "Tempo esgotado",
    message: "Inicie novamente o acesso para continuar.",
  },
} as const;

/** Jornada JA-01 / Login do Figma, montada sobre o Access Layout. */
export function LoginView({
  authenticate,
  initialCredentials = { email: "", senha: "" },
  initialError,
  loading = false,
  recoveryHref,
  notice,
  onAuthenticated,
  onPasswordChangeRequired,
}: LoginViewProps) {
  const id = useId();
  const [email, setEmail] = useState(initialCredentials.email);
  const [password, setPassword] = useState(
    initialError?.status === 401 ? "" : initialCredentials.senha,
  );
  const [now, setNow] = useState(Date.now);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(initialError);
  const [invalid, setInvalid] = useState({ email: false, password: false });
  const [authenticated, setAuthenticated] = useState<Authenticated | null>(
    null,
  );
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const submittingRef = useRef(false);
  const busy = loading || pending;
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
    if (authenticated) titleRef.current?.focus();
  }, [authenticated]);

  function validate() {
    const input = emailRef.current;
    const next = {
      email: email.trim() === "" || (input ? !input.checkValidity() : false),
      password: password === "",
    };
    setInvalid(next);
    if (next.email) emailRef.current?.focus();
    else if (next.password) passwordRef.current?.focus();
    return !next.email && !next.password;
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (
      busy ||
      submittingRef.current ||
      (error?.retryAfterAt !== undefined && Date.now() < error.retryAfterAt)
    )
      return;
    if (!validate()) return;
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
        onPasswordChangeRequired?.(response);
      } else {
        setAuthenticated(response);
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

  const header = (title: string, description: string) => (
    <>
      <Typography
        ref={titleRef}
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

  return (
    <AccessLayout aria-labelledby={`${id}-title`}>
      {authenticated ? (
        <LoginStructure as="div">
          {header("Acesso autorizado", "Você entrou na Pastoral da Juventude.")}
          <div className="login-sections">
            <Alert severity="success" title="Acesso concluído">
              O início será aberto conforme suas permissões.
            </Alert>
            <Button
              size="large"
              fullWidth
              onClick={() => onAuthenticated?.(authenticated)}
            >
              Abrir início
            </Button>
          </div>
        </LoginStructure>
      ) : (
        <LoginStructure
          noValidate
          aria-labelledby={`${id}-title`}
          aria-busy={busy}
          onSubmit={(event) => void submit(event)}
        >
          {header("Entrar", "Use o e-mail cadastrado na sua pastoral.")}
          <div className="login-sections">
            {notice && !error && (
              <Alert
                severity={NOTICES[notice].severity}
                title={NOTICES[notice].title}
              >
                {NOTICES[notice].message}
              </Alert>
            )}
            {error && (
              <Alert
                severity={error.status === 429 ? "attention" : "error"}
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
            <TextField
              size="large"
              ref={emailRef}
              id={`${id}-email`}
              name="email"
              label="E-mail"
              type="email"
              required
              autoComplete="username"
              placeholder="seuemail@exemplo.com"
              value={email}
              readOnly={busy}
              errorMessage={
                invalid.email ? "Informe um e-mail válido." : undefined
              }
              inputProps={{ autoCapitalize: "none", spellCheck: false }}
              onChange={(event) => {
                setEmail(event.target.value);
                if (invalid.email) setInvalid((v) => ({ ...v, email: false }));
              }}
            />
            <TextField
              size="large"
              type="password"
              ref={passwordRef}
              id={`${id}-password`}
              name="senha"
              label="Senha"
              required
              autoComplete="current-password"
              placeholder="Digite sua senha"
              value={password}
              readOnly={busy}
              errorMessage={invalid.password ? "Informe sua senha." : undefined}
              onChange={(event) => {
                setPassword(event.target.value);
                if (invalid.password)
                  setInvalid((v) => ({ ...v, password: false }));
              }}
            />
            <div className="login-recovery">
              <Link
                href={recoveryHref ?? "#recuperacao-senha"}
                disabled={!recoveryHref}
                aria-label={
                  recoveryHref
                    ? "Esqueci minha senha"
                    : "Esqueci minha senha (indisponível)"
                }
              >
                Esqueci minha senha
              </Link>
            </div>
            <Button
              type="submit"
              size="large"
              fullWidth
              loading={busy}
              disabled={blocked}
            >
              Entrar
            </Button>
          </div>
        </LoginStructure>
      )}
    </AccessLayout>
  );
}
