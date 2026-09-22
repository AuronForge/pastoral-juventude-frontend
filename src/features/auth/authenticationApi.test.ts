import { ApiRequestError } from "../../shared/api/apiError";
import { apiClient } from "../../shared/api/client";
import { authenticateUser, changePassword } from "./authenticationApi";

vi.mock("../../shared/api/client", () => ({
  apiClient: { POST: vi.fn() },
}));

const postMock = vi.mocked(apiClient.POST);

const problem = {
  timestamp: "2026-09-22T12:00:00.000Z",
  status: 401,
  codigo: "CREDENCIAIS_INVALIDAS",
  titulo: "Não autorizado",
  mensagem: "Credenciais inválidas.",
  endpoint: "/api/v1/autenticacao/login",
  correlationId: "2cf61d43-8911-4cc8-ad3d-4933c14b709b",
};

describe("API de autenticação", () => {
  beforeEach(() => {
    postMock.mockReset();
  });

  it("retorna o resultado do login", async () => {
    postMock.mockResolvedValue({
      data: { accessToken: "token", tokenType: "Bearer", expiresIn: 900 },
      response: new Response(null, { status: 200 }),
    });

    await expect(
      authenticateUser({ email: "jovem@exemplo.test", senha: "Senha123" }),
    ).resolves.toMatchObject({ tokenType: "Bearer", accessToken: "token" });
  });

  it("preserva o envelope de erro retornado pela API", async () => {
    postMock.mockResolvedValue({
      error: problem,
      response: new Response(null, { status: 401 }),
    });

    await expect(
      authenticateUser({ email: "jovem@exemplo.test", senha: "incorreta" }),
    ).rejects.toMatchObject({ details: problem });
  });

  it("normaliza falhas de comunicação", async () => {
    postMock.mockRejectedValue(new TypeError("Failed to fetch"));

    await expect(
      authenticateUser({ email: "jovem@exemplo.test", senha: "Senha123" }),
    ).rejects.toMatchObject({
      details: { codigo: "ERRO_COMUNICACAO", status: 0 },
    });
  });

  it("rejeita uma resposta de login sem dados nem erro", async () => {
    postMock.mockResolvedValue({
      response: new Response(null, { status: 204 }),
    });

    await expect(
      authenticateUser({ email: "jovem@exemplo.test", senha: "Senha123" }),
    ).rejects.toMatchObject({
      details: { codigo: "ERRO_COMUNICACAO" },
    });
  });

  it("envia o token restrito ao alterar a senha", async () => {
    postMock.mockResolvedValue({
      data: undefined,
      response: new Response(null, { status: 204 }),
    });

    await changePassword("change-token", {
      novaSenha: "NovaSenha123",
      confirmacaoNovaSenha: "NovaSenha123",
    });

    expect(postMock).toHaveBeenCalledWith(
      "/api/v1/autenticacao/alterar-senha",
      expect.objectContaining({
        headers: { Authorization: "Bearer change-token" },
      }),
    );
  });

  it("propaga erro de contrato na alteração de senha", async () => {
    postMock.mockResolvedValue({
      error: { ...problem, endpoint: "/api/v1/autenticacao/alterar-senha" },
      response: new Response(null, { status: 400 }),
    });

    await expect(
      changePassword("change-token", {
        novaSenha: "NovaSenha123",
        confirmacaoNovaSenha: "diferente",
      }),
    ).rejects.toBeInstanceOf(ApiRequestError);
  });

  it("normaliza falha de comunicação na alteração de senha", async () => {
    postMock.mockRejectedValue(new TypeError("Failed to fetch"));

    await expect(
      changePassword("change-token", {
        novaSenha: "NovaSenha123",
        confirmacaoNovaSenha: "NovaSenha123",
      }),
    ).rejects.toMatchObject({
      details: {
        codigo: "ERRO_COMUNICACAO",
        endpoint: "/api/v1/autenticacao/alterar-senha",
      },
    });
  });
});
