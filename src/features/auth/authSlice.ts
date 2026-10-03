import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ApiErrorDetails } from "../../shared/api/apiError";

export type AuthenticationStatus =
  | "anonymous"
  | "authenticating"
  | "authenticated"
  | "passwordChangeRequired"
  | "changingPassword";

export interface AuthState {
  restoration: "pending" | "running" | "complete" | "failed";
  status: AuthenticationStatus;
  accessToken: string | null;
  passwordChangeToken: string | null;
  expiresIn: number | null;
  error: ApiErrorDetails | null;
}

export const initialAuthState: AuthState = {
  restoration: "pending",
  status: "anonymous",
  accessToken: null,
  passwordChangeToken: null,
  expiresIn: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    restorationStarted(state) {
      state.restoration = "running";
      state.error = null;
    },
    restorationRejected(_state, action: PayloadAction<ApiErrorDetails>) {
      return {
        ...initialAuthState,
        restoration: "complete" as const,
        error: action.payload,
      };
    },
    restorationFailed(state, action: PayloadAction<ApiErrorDetails>) {
      state.restoration = "failed";
      state.error = action.payload;
    },
    authenticationStarted(state) {
      state.restoration = "complete";
      state.status = "authenticating";
      state.error = null;
    },
    authenticationSucceeded(
      state,
      action: PayloadAction<{ accessToken: string; expiresIn: number }>,
    ) {
      state.status = "authenticated";
      state.restoration = "complete";
      state.accessToken = action.payload.accessToken;
      state.passwordChangeToken = null;
      state.expiresIn = action.payload.expiresIn;
      state.error = null;
    },
    passwordChangeRequired(
      state,
      action: PayloadAction<{ token: string; expiresIn: number }>,
    ) {
      state.status = "passwordChangeRequired";
      state.restoration = "complete";
      state.accessToken = null;
      state.passwordChangeToken = action.payload.token;
      state.expiresIn = action.payload.expiresIn;
      state.error = null;
    },
    passwordChangeStarted(state) {
      state.status = "changingPassword";
      state.error = null;
    },
    authenticationFailed(state, action: PayloadAction<ApiErrorDetails>) {
      state.status = state.passwordChangeToken
        ? "passwordChangeRequired"
        : "anonymous";
      state.error = action.payload;
    },
    sessionExpired() {
      return {
        ...initialAuthState,
        restoration: "complete" as const,
        error: {
          status: 401,
          codigo: "SESSAO_EXPIRADA",
          titulo: "Tempo esgotado",
          mensagem: "Inicie novamente o acesso para continuar.",
          endpoint: "/login",
        },
      };
    },
    sessionCleared() {
      return { ...initialAuthState, restoration: "complete" as const };
    },
  },
});

export const {
  restorationStarted,
  restorationFailed,
  restorationRejected,
  authenticationFailed,
  authenticationStarted,
  authenticationSucceeded,
  passwordChangeRequired,
  passwordChangeStarted,
  sessionExpired,
  sessionCleared,
} = authSlice.actions;
export const authReducer = authSlice.reducer;
