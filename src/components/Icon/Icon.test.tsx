import { render, screen } from "@testing-library/react";
import { Icon } from "./Icon";

describe("Icon", () => {
  it("é decorativo por padrão e sai da árvore acessível", () => {
    const { container } = render(<Icon name="home" />);
    const icon = container.querySelector("span");

    expect(icon).toHaveAttribute("aria-hidden", "true");
    expect(icon).toHaveClass("material-symbols-outlined");
    expect(icon).toHaveTextContent("home");
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("expõe nome acessível quando informativo", () => {
    render(<Icon name="groups" label="Grupos" />);

    expect(screen.getByRole("img", { name: "Grupos" })).toBeInTheDocument();
  });

  it("usa o token de tamanho do Figma", () => {
    const { container } = render(<Icon name="close" size="sm" />);

    expect(container.querySelector("span")).toHaveStyle({
      fontSize: "var(--pj-icon-size-sm)",
    });
  });

  it("encaminha a referência e os atributos do elemento raiz", () => {
    const ref = { current: null as HTMLSpanElement | null };
    render(<Icon ref={ref} name="menu" data-testid="icone" />);

    expect(ref.current).toBe(screen.getByTestId("icone"));
  });
});
