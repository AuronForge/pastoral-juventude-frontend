import { render, screen, within } from "@testing-library/react";
import { PasswordRequirements } from "./PasswordRequirements";

const requirements = [
  { label: "Entre 8 e 128 caracteres", state: "met" as const },
  { label: "Não conter espaços", state: "unmet" as const },
  { label: "Ser diferente da senha atual", state: "pending" as const },
];

describe("PasswordRequirements", () => {
  it("rotula o grupo pelo título e anuncia mudanças", () => {
    render(<PasswordRequirements requirements={requirements} />);
    const group = screen.getByRole("group", { name: "Sua senha precisa:" });
    expect(within(group).getByRole("list")).toHaveAttribute(
      "aria-live",
      "polite",
    );
  });

  it("comunica o estado por texto, além de ícone e cor", () => {
    render(<PasswordRequirements requirements={requirements} />);
    const items = screen.getAllByRole("listitem");
    expect(items[0]).toHaveTextContent("Entre 8 e 128 caracteres: atendido");
    expect(items[1]).toHaveTextContent("Não conter espaços: não atendido");
    expect(items[2]).toHaveTextContent(
      "Ser diferente da senha atual: pendente",
    );
    expect(items.map((item) => item.dataset.state)).toEqual([
      "met",
      "unmet",
      "pending",
    ]);
  });

  it("aceita o tamanho compacto", () => {
    render(<PasswordRequirements requirements={requirements} size="compact" />);
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });
});
