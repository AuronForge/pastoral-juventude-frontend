import { Typography } from "@mui/material";
import { useId, useRef, useState } from "react";
import { AccessLayout, Alert, Button } from "../../components";
import {
  ApiRequestError,
  createCommunicationError,
  type ApiErrorDetails,
} from "../../shared/api/apiError";
import { LoginStructure } from "./LoginView.styles";

export interface LogoutViewProps {
  /** Encerra a sessão (RES-107); rejeita com ApiRequestError. */
  logout: () => Promise<void>;
  /** Chamado após o 204, para seguir ao Login. */
  onLoggedOut: () => void;
  /** Erro inicial (histórias e testes). */
  initialError?: ApiErrorDetails;
}

/**
 * Jornada JA-04 / Encerrar acesso do Figma (sessionActive), sobre o Access
 * Layout. Pendência: a falha ao sair não tem tela no Figma.
 */
export function LogoutView({
  logout,
  onLoggedOut,
  initialError,
}: LogoutViewProps) {
  const id = useId();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(initialError);
  const submitting = useRef(false);

  async function leave() {
    if (submitting.current) return;
    submitting.current = true;
    setPending(true);
    setError(undefined);
    try {
      await logout();
      onLoggedOut();
    } catch (failure: unknown) {
      setError(
        failure instanceof ApiRequestError
          ? failure.details
          : createCommunicationError("/api/v1/autenticacao/logout"),
      );
      submitting.current = false;
      setPending(false);
    }
  }

  return (
    <AccessLayout aria-labelledby={`${id}-title`}>
      <LoginStructure as="div" aria-busy={pending}>
        <Typography component="h1" id={`${id}-title`} variant="headingMedium">
          Encerrar acesso
        </Typography>
        <Typography className="login-description" variant="bodyMedium">
          Seu acesso está ativo. Ao terminar, saia da sua conta.
        </Typography>
        <div className="login-sections">
          {error ? (
            <Alert severity="error" title="Não foi possível sair">
              Seu acesso continua ativo. Tente novamente.
              {error.correlationId
                ? ` Código do atendimento: ${error.correlationId}.`
                : ""}
            </Alert>
          ) : (
            <Alert severity="information" title="Sessão ativa">
              Você pode encerrar seu acesso quando terminar.
            </Alert>
          )}
          <Button
            size="large"
            fullWidth
            loading={pending}
            onClick={() => void leave()}
          >
            Sair
          </Button>
        </div>
      </LoginStructure>
    </AccessLayout>
  );
}
