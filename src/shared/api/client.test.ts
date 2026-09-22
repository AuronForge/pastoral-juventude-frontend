import { apiClient, createApiClient, resolveApiBaseUrl } from "./client";

describe("cliente da API", () => {
  it("usa a mesma origem quando não há configuração", () => {
    expect(resolveApiBaseUrl(undefined, "https://pastoral.exemplo.test")).toBe(
      "https://pastoral.exemplo.test",
    );
  });

  it("respeita o endereço configurado", () => {
    expect(resolveApiBaseUrl("https://api.exemplo.test")).toBe(
      "https://api.exemplo.test",
    );
  });

  it("expõe o cliente tipado", () => {
    expect(apiClient).toBeDefined();
  });

  it("inclui credenciais nas requisições para suportar o cookie HttpOnly", async () => {
    const fetchMock = vi.fn<typeof globalThis.fetch>().mockResolvedValue(
      new Response(JSON.stringify({ status: "ok" }), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      }),
    );
    const client = createApiClient({
      baseUrl: "https://api.exemplo.test",
      fetch: fetchMock,
    });

    await client.GET("/health/live");

    const request = fetchMock.mock.calls[0]?.[0];
    expect(request).toBeInstanceOf(Request);
    expect((request as Request).credentials).toBe("include");
  });
});
