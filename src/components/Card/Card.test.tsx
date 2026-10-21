import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { Card } from "./Card";

describe("Card", () => {
  it("agrupa título e conteúdo em uma seção, sem papel interativo", () => {
    render(<Card title="Identidade pastoral">Nome: Artur Matos</Card>);

    expect(screen.getByText("Identidade pastoral")).toBeVisible();
    expect(screen.getByText("Nome: Artur Matos")).toBeVisible();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("mostra a ação contextual somente quando informada", async () => {
    const onClick = vi.fn();
    const { rerender } = render(<Card model="header" title="Perfil" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();

    rerender(
      <Card
        model="header"
        title="Perfil"
        contextAction={{ label: "Mais ações do perfil", onClick }}
      />,
    );
    await userEvent.click(
      screen.getByRole("button", { name: "Mais ações do perfil" }),
    );
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("exibe as ações do rodapé no modelo com ações", () => {
    render(
      <Card
        model="actions"
        title="Confirmar presença"
        actions={
          <>
            <button type="button">Cancelar</button>
            <button type="button">Confirmar</button>
          </>
        }
      >
        Você confirma presença no encontro?
      </Card>,
    );

    expect(screen.getAllByRole("button").map((b) => b.textContent)).toEqual([
      "Cancelar",
      "Confirmar",
    ]);
  });

  it("torna toda a superfície um link quando há destino", () => {
    render(
      <Card model="interactive" href="/encontros/15" title="Espiritualidade">
        Encontro nº 15
      </Card>,
    );

    const link = screen.getByRole("link", { name: /Espiritualidade/ });
    expect(link).toHaveAttribute("href", "/encontros/15");
    expect(link).toHaveTextContent("Encontro nº 15");
  });

  it("é acionado por teclado e informa a seleção", async () => {
    const onClick = vi.fn();
    render(
      <Card model="interactive" selected onClick={onClick} title="Opção A" />,
    );

    const button = screen.getByRole("button", { name: "Opção A" });
    expect(button).toHaveAttribute("aria-pressed", "true");
    button.focus();
    await userEvent.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("não declara seleção quando o card só navega por clique", () => {
    render(<Card model="interactive" onClick={() => undefined} title="Ir" />);

    expect(screen.getByRole("button", { name: "Ir" })).not.toHaveAttribute(
      "aria-pressed",
    );
  });

  it("encaminha a ref para o elemento raiz", () => {
    const ref = createRef<HTMLElement>();
    render(<Card ref={ref} title="Título" />);

    expect(ref.current?.tagName).toBe("SECTION");
  });
});
