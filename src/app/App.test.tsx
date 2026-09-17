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
      await screen.findByRole("heading", { name: "Pastoral da Juventude" }),
    ).toBeInTheDocument();
  });
});
