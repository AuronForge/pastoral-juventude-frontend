import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ApiErrorDetails } from "../../shared/api/apiError";

export type AuthenticationStatus =
  | "anonymous"
  | "authenticating"
  | "authenticated"
  | "passwordChangeRequired"
  | "changingPassword";

export interface AuthState {
  status: AuthenticationStatus;
  accessToken: string | null;
  passwordChangeToken: string | null;
  expiresIn: number | null;
  error: ApiErrorDetails | null;
}

export const initialAuthState: AuthState = {
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
    authenticationStarted(state) {
      state.status = "authenticating";
      state.error = null;
    },
    authenticationSucceeded(
      state,
      action: PayloadAction<{ accessToken: string; expiresIn: number }>,
    ) {
      state.status = "authenticated";
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
    sessionCleared() {
      return initialAuthState;
    },
  },
});

export const {
  authenticationFailed,
  authenticationStarted,
  authenticationSucceeded,
  passwordChangeRequired,
  passwordChangeStarted,
  sessionCleared,
} = authSlice.actions;
export const authReducer = authSlice.reducer;
