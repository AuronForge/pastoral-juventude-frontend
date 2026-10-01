import type { LoginCredentials, LoginResponse } from "./authenticationApi";
import type { ApiErrorDetails } from "../../shared/api/apiError";

/** API da composição de Login; não faz parte do Design System. */
export interface LoginViewProps {
  authenticate: (credentials: LoginCredentials) => Promise<LoginResponse>;
  initialCredentials?: LoginCredentials;
  initialError?: ApiErrorDetails;
  loading?: boolean;
  notice?: "passwordChanged" | "expired";
  onAuthenticated?: (
    response: Extract<LoginResponse, { tokenType: "Bearer" }>,
  ) => void;
  onPasswordChangeRequired?: (
    response: Extract<LoginResponse, { tokenType: "TROCA_SENHA" }>,
  ) => void;
}
