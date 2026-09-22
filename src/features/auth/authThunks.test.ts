import { configureStore } from "@reduxjs/toolkit";
import { ApiRequestError } from "../../shared/api/apiError";
import { systemReducer } from "../system/systemSlice";
import { authenticateUser, changePassword } from "./authenticationApi";
import { authReducer, passwordChangeRequired } from "./authSlice";
import { authenticate, completeRequiredPasswordChange } from "./authThunks";

vi.mock("./authenticationApi", () => ({
  authenticateUser: vi.fn(),
  changePassword: vi.fn(),
}));

const authenticateUserMock = vi.mocked(authenticateUser);
const changePasswordMock = vi.mocked(changePassword);

function createStore() {
  return configureStore({
    reducer: { auth: authReducer, system: systemReducer },
  });
}

describe("fluxos de autenticação", () => {
  beforeEach(() => {
    authenticateUserMock.mockReset();
    changePasswordMock.mockReset();
  });

  it("conclui o login com token de acesso", async () => {
    authenticateUserMock.mockResolvedValue({
      accessToken: "access-token",
      tokenType: "Bearer",
      expiresIn: 900,
    });
    const store = createStore();

    await store.dispatch(
      authenticate({ email: "jovem@exemplo.test", senha: "Senha123" }),
    );

    expect(store.getState().auth).toMatchObject({
      status: "authenticated",
      accessToken: "access-token",
    });
  });

  it("direciona o estado para troca obrigatória de senha", async () => {
    authenticateUserMock.mockResolvedValue({
      tokenTrocaSenha: "change-token",
      tokenType: "TROCA_SENHA",
      expiresIn: 900,
      trocaSenhaObrigatoria: true,
    });
    const store = createStore();

    await store.dispatch(
      authenticate({ email: "jovem@exemplo.test", senha: "Temporaria1" }),
    );

    expect(store.getState().auth).toMatchObject({
      status: "passwordChangeRequired",
      passwordChangeToken: "change-token",
    });
  });

  it("mantém o erro padronizado do backend", async () => {
    const details = {
      status: 401,
      codigo: "CREDENCIAIS_INVALIDAS",
      titulo: "Não autorizado",
      mensagem: "Credenciais inválidas.",
      endpoint: "/api/v1/autenticacao/login",
    };
    authenticateUserMock.mockRejectedValue(new ApiRequestError(details));
    const store = createStore();

    await expect(
      store.dispatch(
        authenticate({ email: "jovem@exemplo.test", senha: "incorreta" }),
      ),
    ).rejects.toBeInstanceOf(ApiRequestError);
    expect(store.getState().auth.error).toEqual(details);
  });

  it("normaliza uma falha inesperada durante o login", async () => {
    authenticateUserMock.mockRejectedValue(new TypeError("Failed to fetch"));
    const store = createStore();

    await expect(
      store.dispatch(
        authenticate({ email: "jovem@exemplo.test", senha: "Senha123" }),
      ),
    ).rejects.toBeInstanceOf(TypeError);
    expect(store.getState().auth.error).toMatchObject({
      codigo: "ERRO_COMUNICACAO",
      endpoint: "/api/v1/autenticacao/login",
    });
  });

  it("conclui a troca obrigatória e limpa o token restrito", async () => {
    changePasswordMock.mockResolvedValue();
    const store = createStore();
    store.dispatch(
      passwordChangeRequired({ token: "change-token", expiresIn: 900 }),
    );

    await store.dispatch(
      completeRequiredPasswordChange({
        novaSenha: "NovaSenha123",
        confirmacaoNovaSenha: "NovaSenha123",
      }),
    );

    expect(changePasswordMock).toHaveBeenCalledWith(
      "change-token",
      expect.any(Object),
    );
    expect(store.getState().auth).toMatchObject({
      status: "anonymous",
      passwordChangeToken: null,
    });
  });

  it("bloqueia a troca obrigatória sem token", async () => {
    const store = createStore();

    await expect(
      store.dispatch(
        completeRequiredPasswordChange({
          novaSenha: "NovaSenha123",
          confirmacaoNovaSenha: "NovaSenha123",
        }),
      ),
    ).rejects.toMatchObject({
      details: { codigo: "TOKEN_TROCA_SENHA_AUSENTE" },
    });
    expect(changePasswordMock).not.toHaveBeenCalled();
  });

  it("preserva o token restrito quando a alteração de senha falha", async () => {
    const details = {
      status: 400,
      codigo: "SENHA_INVALIDA",
      titulo: "Senha inválida",
      mensagem: "Revise a senha informada.",
      endpoint: "/api/v1/autenticacao/alterar-senha",
    };
    changePasswordMock.mockRejectedValue(new ApiRequestError(details));
    const store = createStore();
    store.dispatch(
      passwordChangeRequired({ token: "change-token", expiresIn: 900 }),
    );

    await expect(
      store.dispatch(
        completeRequiredPasswordChange({
          novaSenha: "NovaSenha123",
          confirmacaoNovaSenha: "NovaSenha123",
        }),
      ),
    ).rejects.toBeInstanceOf(ApiRequestError);
    expect(store.getState().auth).toMatchObject({
      status: "passwordChangeRequired",
      passwordChangeToken: "change-token",
      error: details,
    });
  });
});
