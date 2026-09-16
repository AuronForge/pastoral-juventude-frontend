import { apiClient, resolveApiBaseUrl } from "./client";

describe("cliente da API", () => {
  it("usa o endereço local quando não há configuração", () => {
    expect(resolveApiBaseUrl()).toBe("http://localhost:3000");
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
