import { Typography, useMediaQuery } from "@mui/material";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import {
  AccessLayout,
  Alert,
  Button,
  Link,
  PasswordRequirements,
  TextField,
  type PasswordRequirementState,
} from "../../components";
import {
  ApiRequestError,
  createCommunicationError,
  type ApiErrorDetails,
} from "../../shared/api/apiError";
import type { ChangePasswordRequest } from "./authenticationApi";
import { LoginStructure } from "./LoginView.styles";

type Step = "intro" | "form" | "success" | "expired";

export interface PasswordChangeViewProps {
  change: (request: ChangePasswordRequest) => Promise<void>;
  /** "Ir para o login" após a senha definida. */
  onCompleted?: () => void;
  /** "Voltar ao login": encerra o acesso temporário. */
  onRestart: () => void;
  loading?: boolean;
  initialError?: ApiErrorDetails;
  /** Etapa inicial (histórias e testes); padrão: tela informativa. */
  initialStep?: Step;
}

const RULES = {
  regular: [
    "Entre 8 e 128 caracteres",
    "Não conter espaços",
    "Ser diferente da senha atual",
  ],
  compact: ["8 a 128 caracteres", "Sem espaços", "Diferente da senha atual"],
} as const;

const POLICY_ERROR = "Use de 8 a 128 caracteres, sem espaços.";

function validLength(value: string) {
  const length = Array.from(value).length;
  return length >= 8 && length <= 128;
}

/** Jornada JA-03 / Definição de nova senha do Figma, sobre o Access Layout. */
export function PasswordChangeView({
  change,
  onCompleted,
  onRestart,
  loading = false,
  initialError,
  initialStep = "intro",
}: PasswordChangeViewProps) {
  const id = useId();
  const regular = useMediaQuery("(min-width: 768px)");
  const [step, setStep] = useState<Step>(
    initialError?.status === 401 ? "expired" : initialStep,
  );
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(
    initialError?.status === 401 ? undefined : initialError,
  );
  const [fieldErrors, setFieldErrors] = useState<{
    novaSenha?: string;
    confirmacaoNovaSenha?: string;
  }>({});
  const [reused, setReused] = useState(
    initialError?.erros?.some((item) => item.codigo === "senha_reutilizada") ??
      false,
  );
  const headingRef = useRef<HTMLHeadingElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmationRef = useRef<HTMLInputElement>(null);
  const submitting = useRef(false);
  const busy = loading || pending;

  useEffect(() => {
    headingRef.current?.focus();
  }, [step]);

  const states: PasswordRequirementState[] = [
    password === "" ? "pending" : validLength(password) ? "met" : "unmet",
    password === "" ? "pending" : /\s/u.test(password) ? "unmet" : "met",
    reused ? "unmet" : "pending",
  ];
  const labels = regular ? RULES.regular : RULES.compact;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy || submitting.current) return;
    const errors: typeof fieldErrors = {};
    if (!validLength(password) || /\s/u.test(password))
      errors.novaSenha = POLICY_ERROR;
    if (confirmation === "")
      errors.confirmacaoNovaSenha = "Confirme a nova senha.";
    else if (!errors.novaSenha && confirmation !== password)
      errors.confirmacaoNovaSenha = "As senhas não coincidem.";
    setFieldErrors(errors);
    if (errors.novaSenha) {
      passwordRef.current?.focus();
      return;
    }
    if (errors.confirmacaoNovaSenha) {
      confirmationRef.current?.focus();
      return;
    }
    submitting.current = true;
    setPending(true);
    setError(undefined);
    try {
      await change({ novaSenha: password, confirmacaoNovaSenha: confirmation });
      setPassword("");
      setConfirmation("");
      setStep("success");
    } catch (failure: unknown) {
      const details =
        failure instanceof ApiRequestError
          ? failure.details
          : createCommunicationError("/api/v1/autenticacao/alterar-senha");
      if (details.status === 401) {
        setPassword("");
        setConfirmation("");
        setStep("expired");
        return;
      }
      const isReused =
        details.erros?.some((item) => item.codigo === "senha_reutilizada") ??
        false;
      setReused(isReused);
      if (details.erros?.some((item) => item.codigo === "senhas_divergentes")) {
        setFieldErrors({ confirmacaoNovaSenha: "As senhas não coincidem." });
        confirmationRef.current?.focus();
      } else if (!isReused) {
        const byField = (campo: string) =>
          details.erros?.find((item) => item.campo === campo)?.mensagem;
        setFieldErrors({
          novaSenha: byField("novaSenha"),
          confirmacaoNovaSenha: byField("confirmacaoNovaSenha"),
        });
      }
      setError(details);
    } finally {
      submitting.current = false;
      setPending(false);
    }
  }

  const header = (title: string, description: string) => (
    <>
      <Typography
        ref={headingRef}
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

  const backLink = (
    <div className="login-recovery">
      <Link
        href="/login"
        onClick={(event) => {
          event.preventDefault();
          onRestart();
        }}
      >
        Voltar ao login
      </Link>
    </div>
  );

  const content = () => {
    if (step === "intro")
      return (
        <LoginStructure as="div">
          {header(
            "Defina sua senha",
            "Para continuar, você precisa criar sua senha definitiva.",
          )}
          <div className="login-sections">
            <Alert
              severity="information"
              title="Primeiro acesso ou recuperação"
            >
              O acesso às demais áreas será liberado após definir sua senha e
              entrar novamente.
            </Alert>
            <Button size="large" fullWidth onClick={() => setStep("form")}>
              Definir minha senha
            </Button>
          </div>
        </LoginStructure>
      );
    if (step === "success")
      return (
        <LoginStructure as="div">
          {header("Senha definida", "Agora entre com sua nova senha.")}
          <div className="login-sections">
            <Alert severity="success" title="Senha alterada com sucesso">
              Por segurança, faça um novo login para continuar.
            </Alert>
            <Button size="large" fullWidth onClick={onCompleted}>
              Ir para o login
            </Button>
          </div>
        </LoginStructure>
      );
    if (step === "expired")
      return (
        <LoginStructure as="div">
          {header(
            "Valide seu acesso novamente",
            "O prazo para definir sua senha terminou.",
          )}
          <div className="login-sections">
            <Alert severity="attention" title="Acesso temporário expirado">
              Entre novamente com uma senha temporária válida. Se ela expirou,
              recupere seu acesso.
            </Alert>
            {backLink}
          </div>
        </LoginStructure>
      );
    return (
      <LoginStructure
        noValidate
        aria-labelledby={`${id}-title`}
        aria-busy={busy}
        onSubmit={(event) => void submit(event)}
      >
        {header(
          "Defina sua senha",
          "Crie sua senha definitiva para continuar.",
        )}
        <div className="login-sections">
          {error && reused && (
            <Alert severity="error" title="Escolha outra senha">
              A nova senha não pode ser igual à senha atual.
            </Alert>
          )}
          {error && !reused && (
            <Alert severity="error" title="Não foi possível salvar">
              Tente novamente. A troca ainda não foi concluída.
            </Alert>
          )}
          <TextField
            size="large"
            type="password"
            ref={passwordRef}
            id={`${id}-new`}
            name="novaSenha"
            label="Nova senha"
            required
            autoComplete="new-password"
            placeholder="Digite sua senha"
            value={password}
            disabled={busy}
            errorMessage={fieldErrors.novaSenha}
            inputProps={{ "aria-describedby": `${id}-rules` }}
            onChange={(event) => {
              setPassword(event.target.value);
              setReused(false);
              setFieldErrors((current) => ({
                ...current,
                novaSenha: undefined,
              }));
            }}
          />
          <TextField
            size="large"
            type="password"
            ref={confirmationRef}
            id={`${id}-confirmation`}
            name="confirmacaoNovaSenha"
            label="Confirmar nova senha"
            required
            autoComplete="new-password"
            placeholder="Digite sua senha"
            value={confirmation}
            disabled={busy}
            errorMessage={fieldErrors.confirmacaoNovaSenha}
            onChange={(event) => {
              setConfirmation(event.target.value);
              setFieldErrors((current) => ({
                ...current,
                confirmacaoNovaSenha: undefined,
              }));
            }}
          />
          <PasswordRequirements
            id={`${id}-rules`}
            size={regular ? "regular" : "compact"}
            requirements={labels.map((label, index) => ({
              label,
              state: states[index],
            }))}
          />
          <Button type="submit" size="large" fullWidth loading={busy}>
            Salvar nova senha
          </Button>
          {backLink}
        </div>
      </LoginStructure>
    );
  };

  return (
    <AccessLayout aria-labelledby={`${id}-title`}>{content()}</AccessLayout>
  );
}
