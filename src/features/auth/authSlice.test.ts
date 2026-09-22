import {
  authenticationFailed,
  authenticationStarted,
  authenticationSucceeded,
  authReducer,
  initialAuthState,
  passwordChangeRequired,
  passwordChangeStarted,
  sessionCleared,
} from "./authSlice";

describe("authSlice", () => {
  it("inicia a autenticação sem persistir credenciais", () => {
    expect(authReducer(initialAuthState, authenticationStarted())).toEqual({
      ...initialAuthState,
      status: "authenticating",
    });
  });

  it("armazena o access token somente em memória após o login", () => {
    const state = authReducer(
      initialAuthState,
      authenticationSucceeded({ accessToken: "access-token", expiresIn: 900 }),
    );

    expect(state).toMatchObject({
      status: "authenticated",
      accessToken: "access-token",
      passwordChangeToken: null,
      expiresIn: 900,
    });
  });

  it("mantém separado o token restrito para troca obrigatória", () => {
    const state = authReducer(
      initialAuthState,
      passwordChangeRequired({ token: "change-token", expiresIn: 900 }),
    );

    expect(state).toMatchObject({
      status: "passwordChangeRequired",
      accessToken: null,
      passwordChangeToken: "change-token",
    });
  });

  it("preserva o fluxo de troca obrigatória quando a alteração falha", () => {
    const passwordChangeState = authReducer(
      initialAuthState,
      passwordChangeRequired({ token: "change-token", expiresIn: 900 }),
    );
    const changingState = authReducer(
      passwordChangeState,
      passwordChangeStarted(),
    );
    const error = {
      status: 400,
      codigo: "SENHA_INVALIDA",
      titulo: "Senha inválida",
      mensagem: "Revise a senha informada.",
      endpoint: "/api/v1/autenticacao/alterar-senha",
    };

    expect(
      authReducer(changingState, authenticationFailed(error)),
    ).toMatchObject({
      status: "passwordChangeRequired",
      passwordChangeToken: "change-token",
      error,
    });
  });

  it("limpa integralmente a sessão", () => {
    const authenticatedState = authReducer(
      initialAuthState,
      authenticationSucceeded({ accessToken: "access-token", expiresIn: 900 }),
    );

    expect(authReducer(authenticatedState, sessionCleared())).toEqual(
      initialAuthState,
    );
  });
});
