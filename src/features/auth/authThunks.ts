import type { AppDispatch, RootState } from "../../app/store";
import {
  ApiRequestError,
  createCommunicationError,
} from "../../shared/api/apiError";
import {
  authenticateUser,
  changePassword,
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
} from "./authSlice";

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
