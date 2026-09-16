import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HomePage } from "./HomePage";
import { NotFoundPage } from "./NotFoundPage";

describe("páginas da aplicação", () => {
  it("apresenta o estado inicial do frontend", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", { name: "Pastoral da Juventude" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Frontend inicializado")).toBeInTheDocument();
    expect(screen.getByText("Redux Toolkit")).toBeInTheDocument();
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
