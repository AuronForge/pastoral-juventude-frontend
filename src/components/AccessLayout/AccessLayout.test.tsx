import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material";
import { createAppTheme } from "../../theme/appTheme";
import { AccessLayout } from "./AccessLayout";

function setup(help?: string) {
  render(
    <ThemeProvider theme={createAppTheme()}>
      <AccessLayout aria-label="Acesso" help={help}>
        <h1>Entrar</h1>
      </AccessLayout>
    </ThemeProvider>,
  );
}

describe("AccessLayout", () => {
  it("renderiza a marca, o conteúdo e a ajuda padrão do Figma", () => {
    setup();
    expect(screen.getByRole("main", { name: "Acesso" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "PastorApp" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Entrar" })).toBeVisible();
    expect(
      screen.getByText(
        "Problemas para entrar? Fale com o coordenador da sua pastoral.",
      ),
    ).toBeInTheDocument();
  });

  it("aceita outra ajuda", () => {
    setup("Fale com a coordenação.");
    expect(screen.getByText("Fale com a coordenação.")).toBeInTheDocument();
  });

  it("inclui a mensagem institucional com a passagem bíblica", () => {
    setup();
    const aside = screen.getByLabelText("Sobre a Pastoral da Juventude");
    expect(aside.tagName).toBe("ASIDE");
    expect(aside).toHaveTextContent("Mt 18,20");
    expect(screen.getAllByRole("listitem", { hidden: true })).toHaveLength(3);
  });
});
