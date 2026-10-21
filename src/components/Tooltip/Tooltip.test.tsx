import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tooltip } from "./Tooltip";

describe("Tooltip", () => {
  it("associa o texto ao elemento de origem como descrição", () => {
    render(
      <Tooltip text="Abrir filtros">
        <button type="button">Filtros</button>
      </Tooltip>,
    );

    expect(
      screen.getByRole("button", { name: "Filtros" }),
    ).toHaveAccessibleDescription("Abrir filtros");
  });

  it("aparece no foco e fecha com Escape", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip text="Abrir filtros">
        <button type="button">Filtros</button>
      </Tooltip>,
    );

    await user.tab();
    expect(await screen.findByRole("tooltip")).toHaveTextContent(
      "Abrir filtros",
    );
    await user.keyboard("{Escape}");
    await vi.waitFor(() =>
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument(),
    );
  });

  it("permite exibição controlada sem hover ou foco", async () => {
    const { rerender } = render(
      <Tooltip text="Copiado" open={false}>
        <button type="button">Copiar</button>
      </Tooltip>,
    );
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();

    rerender(
      <Tooltip text="Copiado" open>
        <button type="button">Copiar</button>
      </Tooltip>,
    );
    expect(await screen.findByRole("tooltip")).toHaveTextContent("Copiado");
  });
});
