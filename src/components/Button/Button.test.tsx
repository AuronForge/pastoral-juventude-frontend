import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { Button } from "./Button";
import { Icon } from "../Icon";

describe("Button", () => {
  it("expõe uma ação nomeada", () => {
    render(<Button>Entrar</Button>);

    expect(screen.getByRole("button", { name: "Entrar" })).toBeEnabled();
  });

  it.each([
    ["small", "var(--space-extended-44px)"],
    ["medium", "var(--space-extended-44px)"],
    ["large", "var(--pj-space-8)"],
  ] as const)("mapeia o tamanho %s para %s", (size, height) => {
    render(<Button size={size}>Continuar</Button>);

    expect(screen.getByRole("button")).toHaveStyle({ minHeight: height });
  });

  it.each(["primary", "secondary", "discreet", "danger"] as const)(
    "aceita a variante %s do catálogo",
    (variant) => {
      render(<Button variant={variant}>Continuar</Button>);

      expect(screen.getByRole("button")).toBeInTheDocument();
    },
  );

  it("mantém o rótulo, informa andamento e bloqueia a ação ao carregar", () => {
    render(<Button loading>Entrando</Button>);

    const button = screen.getByRole("button", { name: "Entrando" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
  });

  it("preserva ícones posicionados nos dois lados", () => {
    render(
      <Button
        startIcon={<Icon name="add" data-testid="inicio" />}
        endIcon={<Icon name="add" data-testid="fim" />}
      >
        Adicionar
      </Button>,
    );

    expect(screen.getByTestId("inicio")).toBeInTheDocument();
    expect(screen.getByTestId("fim")).toBeInTheDocument();
  });

  it("encaminha a referência e os atributos do elemento raiz", () => {
    const ref = createRef<HTMLButtonElement>();

    render(
      <Button ref={ref} data-testid="botao">
        Continuar
      </Button>,
    );

    expect(ref.current).toBe(screen.getByTestId("botao"));
  });

  it("aciona pelo teclado e ignora estados indisponíveis na navegação", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <>
        <Button onClick={onClick} size="small">
          Continuar
        </Button>
        <Button disabled>Indisponível</Button>
        <Button loading>Carregando</Button>
        <button type="button">Próxima ação</button>
      </>,
    );

    await user.tab();
    expect(screen.getByRole("button", { name: "Continuar" })).toHaveFocus();
    await user.keyboard("{Enter} ");
    expect(onClick).toHaveBeenCalledTimes(2);
    await user.tab();
    expect(screen.getByRole("button", { name: "Próxima ação" })).toHaveFocus();
  });
});
