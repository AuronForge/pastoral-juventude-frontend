import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AppProviders } from "../app/AppProviders";
import { HomePage } from "./HomePage";
import { NotFoundPage } from "./NotFoundPage";

describe("páginas da aplicação", () => {
  it("apresenta a página inicial dentro da moldura autenticada", () => {
    render(
      <AppProviders>
        <HomePage />
      </AppProviders>,
    );

    expect(
      screen.getByRole("heading", { name: "Bem-vindo(a)" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", {
        hidden: true,
        name: "Navegação principal",
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Início" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("apresenta a página não encontrada", () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: "Página não encontrada" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Voltar ao início" }),
    ).toHaveAttribute("href", "/");
  });
});
