import { apiClient, resolveApiBaseUrl } from "./client";

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
});
