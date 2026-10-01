import type {
  LoginCredentials,
  LoginResponse,
} from "../../features/auth/authenticationApi";
import type { ApiErrorDetails } from "../../shared/api/apiError";

/** Harness privado do Storybook, não uma página de produção nem API pública do DS. */
export interface LoginJourneyProps {
  authenticate: (credentials: LoginCredentials) => Promise<LoginResponse>;
  initialCredentials?: LoginCredentials;
  initialError?: ApiErrorDetails;
  loading?: boolean;
  onAuthenticated?: (
    response: Extract<LoginResponse, { tokenType: "Bearer" }>,
  ) => void;
  onPasswordChangeRequired?: (
    response: Extract<LoginResponse, { tokenType: "TROCA_SENHA" }>,
  ) => void;
}
