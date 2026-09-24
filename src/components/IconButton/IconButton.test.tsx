import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { IconButton } from "./IconButton";

describe("IconButton", () => {
  it("expõe uma ação nomeada", () => {
    render(<IconButton icon={<EditOutlined />} label="Editar encontro" />);

    expect(
      screen.getByRole("button", { name: "Editar encontro" }),
    ).toBeEnabled();
  });

  it.each([
    ["small", "var(--spacing-3xl)"],
    ["medium", "var(--spacing-4xl)"],
    ["large", "var(--spacing-5xl)"],
  ] as const)("mapeia o tamanho %s", (size, control) => {
    render(<IconButton icon={<EditOutlined />} label="Editar" size={size} />);

    expect(screen.getByRole("button")).toHaveStyle({
      width: control,
      height: control,
    });
  });

  it.each(["primary", "secondary", "tertiary", "danger"] as const)(
    "aceita a variante %s do catálogo",
    (variant) => {
      render(
        <IconButton icon={<EditOutlined />} label="Editar" variant={variant} />,
      );

      expect(screen.getByRole("button")).toBeInTheDocument();
    },
  );

  it("informa andamento e bloqueia a ação ao carregar", () => {
    render(<IconButton icon={<EditOutlined />} label="Salvar" loading />);

    const button = screen.getByRole("button", { name: "Salvar" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
  });

  it("respeita o estado desabilitado", () => {
    render(
      <IconButton
        disabled
        icon={<DeleteOutlined />}
        label="Excluir encontro"
      />,
    );

    expect(
      screen.getByRole("button", { name: "Excluir encontro" }),
    ).toBeDisabled();
  });

  it("encaminha a referência e os atributos do elemento raiz", () => {
    const ref = createRef<HTMLButtonElement>();

    render(
      <IconButton
        ref={ref}
        data-testid="botao-de-edicao"
        icon={<EditOutlined />}
        label="Editar encontro"
      />,
    );

    expect(ref.current).toBe(screen.getByTestId("botao-de-edicao"));
  });
});
