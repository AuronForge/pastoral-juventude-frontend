import { ApiRequestError } from "../shared/api/apiError";
vi.mock("../features/auth/authenticationApi", () => ({
  refreshSession: vi.fn().mockRejectedValue(
    new ApiRequestError({
      status: 401,
      codigo: "SESSAO_INVALIDA",
      titulo: "Sessão inválida",
      mensagem: "Entre novamente",
      endpoint: "/api/v1/autenticacao/renovar-token",
    }),
  ),
}));
import { render, screen } from "@testing-library/react";
import { App } from "./App";
import { AppProviders } from "./AppProviders";

describe("App", () => {
  it("renderiza a rota inicial com os provedores globais", async () => {
    window.history.pushState({}, "", "/");

    render(
      <AppProviders>
        <App />
      </AppProviders>,
    );

    expect(
      await screen.findByRole("heading", { name: "Entrar" }),
    ).toBeInTheDocument();
  });
});
