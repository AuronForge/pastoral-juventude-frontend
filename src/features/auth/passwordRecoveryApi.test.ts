import { apiClient } from "../../shared/api/client";
import { recoverPassword } from "./authenticationApi";
vi.mock("../../shared/api/client", () => ({ apiClient: { POST: vi.fn() } }));
const post = vi.mocked(apiClient.POST);
const request = {
  nome: "Maria Silva",
  email: "maria@exemplo.test",
  dataNascimento: "2000-01-01",
  nomeParoquia: "São João",
};
const problem = {
  timestamp: new Date().toISOString(),
  status: 409,
  codigo: "RECUPERACAO_SENHA_EM_ANDAMENTO",
  titulo: "Erro",
  mensagem: "Espere",
  endpoint: "/api/v1/autenticacao/recuperar-senha",
  correlationId: "00000000-0000-4000-8000-000000000001",
};
afterEach(() => post.mockReset());
it("consome contrato gerado no cliente central", async () => {
  const result = {
    senhaTemporaria: "fixture-only",
    expiraEm: new Date().toISOString(),
    trocaSenhaObrigatoria: true as const,
  };
  post.mockResolvedValue({ data: result, response: new Response(null) });
  await expect(recoverPassword(request)).resolves.toEqual(result);
  expect(post).toHaveBeenCalledWith("/api/v1/autenticacao/recuperar-senha", {
    body: request,
  });
});
it.each([409, 429])(
  "preserva erro %s e prazo de Retry-After quando aplicável",
  async (status) => {
    post.mockResolvedValue({
      error: { ...problem, status },
      response: new Response(null, {
        status,
        headers: { "Retry-After": "1800" },
      }),
    });
    await expect(recoverPassword(request)).rejects.toMatchObject({
      details: {
        status,
        ...(status === 429 ? { retryAfterAt: expect.any(Number) } : {}),
      },
    });
  },
);
it("falhas de rede e resposta sem contrato são seguras", async () => {
  post.mockRejectedValueOnce(new Error("private-network-details"));
  await expect(recoverPassword(request)).rejects.toMatchObject({
    details: { codigo: "ERRO_COMUNICACAO" },
  });
  post.mockResolvedValue({ response: new Response(null) });
  await expect(recoverPassword(request)).rejects.toMatchObject({
    details: { codigo: "ERRO_COMUNICACAO" },
  });
});
