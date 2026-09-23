import { Add } from "@mui/icons-material";
import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { Button } from "./Button";

describe("Button", () => {
  it("expõe uma ação nomeada", () => {
    render(<Button>Entrar</Button>);

    expect(screen.getByRole("button", { name: "Entrar" })).toBeEnabled();
  });

  it.each([
    ["small", "var(--size-control-sm)"],
    ["medium", "var(--size-control-md)"],
    ["large", "var(--size-control-lg)"],
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
        startIcon={<Add data-testid="inicio" />}
        endIcon={<Add data-testid="fim" />}
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
});
