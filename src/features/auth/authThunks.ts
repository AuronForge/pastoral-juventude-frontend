import type { AppDispatch, RootState } from "../../app/store";
import {
  ApiRequestError,
  createCommunicationError,
} from "../../shared/api/apiError";
import {
  authenticateUser,
  changePassword,
  refreshSession,
  type ChangePasswordRequest,
  type LoginCredentials,
} from "./authenticationApi";
import {
  authenticationFailed,
  authenticationStarted,
  authenticationSucceeded,
  passwordChangeRequired,
  passwordChangeStarted,
  sessionCleared,
  restorationStarted,
  restorationFailed,
  restorationRejected,
} from "./authSlice";

export function restoreSession() {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    // Synchronous state guard also deduplicates React StrictMode effects.
    const state = getState().auth;
    if (state.restoration !== "pending" && state.restoration !== "failed")
      return;
    dispatch(restorationStarted());
    try {
      const response = await refreshSession();
      if (getState().auth.restoration !== "running") return;
      dispatch(authenticationSucceeded(response));
    } catch (error: unknown) {
      if (getState().auth.restoration !== "running") return;
      const details =
        error instanceof ApiRequestError
          ? error.details
          : createCommunicationError("/api/v1/autenticacao/renovar-token");
      if (details.status === 400 && details.codigo === "TOKEN_REFRESH_AUSENTE")
        dispatch(sessionCleared());
      else if (
        details.status === 401 ||
        details.status === 409 ||
        (details.status === 403 &&
          ["USUARIO_BLOQUEADO", "USUARIO_INATIVO"].includes(details.codigo))
      )
        dispatch(restorationRejected(details));
      else dispatch(restorationFailed(details));
    }
  };
}

const CHANGE_PASSWORD_ENDPOINT = "/api/v1/autenticacao/alterar-senha";

export function authenticate(credentials: LoginCredentials) {
  return async (dispatch: AppDispatch) => {
    dispatch(authenticationStarted());

    try {
      const response = await authenticateUser(credentials);

      if (response.tokenType === "TROCA_SENHA") {
        dispatch(
          passwordChangeRequired({
            token: response.tokenTrocaSenha,
            expiresIn: response.expiresIn,
          }),
        );
        return response;
      }

      dispatch(
        authenticationSucceeded({
          accessToken: response.accessToken,
          expiresIn: response.expiresIn,
        }),
      );
      return response;
    } catch (error: unknown) {
      const details =
        error instanceof ApiRequestError
          ? error.details
          : createCommunicationError("/api/v1/autenticacao/login");
      dispatch(authenticationFailed(details));
      throw error;
    }
  };
}

export function completeRequiredPasswordChange(request: ChangePasswordRequest) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const token = getState().auth.passwordChangeToken;

    if (!token) {
      const details = {
        ...createCommunicationError(CHANGE_PASSWORD_ENDPOINT),
        codigo: "TOKEN_TROCA_SENHA_AUSENTE",
        mensagem: "Inicie novamente o acesso para alterar a senha.",
      };
      dispatch(authenticationFailed(details));
      throw new ApiRequestError(details);
    }

    dispatch(passwordChangeStarted());

    try {
      await changePassword(token, request);
      dispatch(sessionCleared());
    } catch (error: unknown) {
      const details =
        error instanceof ApiRequestError
          ? error.details
          : createCommunicationError(CHANGE_PASSWORD_ENDPOINT);
      dispatch(authenticationFailed(details));
      throw error;
    }
  };
}
