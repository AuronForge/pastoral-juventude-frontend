import type { RootState } from "../../app/store";

export const selectAuth = (state: RootState) => state.auth;
export const selectAuthenticationStatus = (state: RootState) =>
  state.auth.status;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.status === "authenticated";
export const selectRequiresPasswordChange = (state: RootState) =>
  state.auth.status === "passwordChangeRequired";
