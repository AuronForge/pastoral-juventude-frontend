import { configureStore } from "@reduxjs/toolkit";
import { systemReducer } from "../system/systemSlice";
import {
  selectAuth,
  selectAuthenticationStatus,
  selectIsAuthenticated,
  selectRequiresPasswordChange,
} from "./authSelectors";
import {
  authenticationSucceeded,
  authReducer,
  passwordChangeRequired,
} from "./authSlice";

function createStore() {
  return configureStore({
    reducer: { auth: authReducer, system: systemReducer },
  });
}

describe("seletores de autenticação", () => {
  it("identifica uma sessão autenticada", () => {
    const store = createStore();
    store.dispatch(
      authenticationSucceeded({ accessToken: "token", expiresIn: 900 }),
    );

    expect(selectAuth(store.getState()).accessToken).toBe("token");
    expect(selectAuthenticationStatus(store.getState())).toBe("authenticated");
    expect(selectIsAuthenticated(store.getState())).toBe(true);
    expect(selectRequiresPasswordChange(store.getState())).toBe(false);
  });

  it("identifica a troca obrigatória de senha", () => {
    const store = createStore();
    store.dispatch(
      passwordChangeRequired({ token: "change-token", expiresIn: 900 }),
    );

    expect(selectRequiresPasswordChange(store.getState())).toBe(true);
    expect(selectIsAuthenticated(store.getState())).toBe(false);
  });
});
