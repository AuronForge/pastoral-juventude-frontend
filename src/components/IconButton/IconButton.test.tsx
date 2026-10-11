import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
    ["small", "var(--size-touch-min)"],
    ["medium", "var(--size-touch-min)"],
    ["large", "var(--spacing-5xl)"],
  ] as const)("mapeia o tamanho %s", (size, control) => {
    render(<IconButton icon={<EditOutlined />} label="Editar" size={size} />);

    expect(screen.getByRole("button")).toHaveStyle({
      width: control,
      height: control,
      flexShrink: "0",
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

  it("aciona pelo teclado e ignora ações indisponíveis na navegação", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <>
        <IconButton
          icon={<EditOutlined />}
          label="Editar"
          size="small"
          onClick={onClick}
        />
        <IconButton icon={<EditOutlined />} label="Indisponível" disabled />
        <IconButton icon={<EditOutlined />} label="Carregando" loading />
        <button type="button">Próxima ação</button>
      </>,
    );

    await user.tab();
    expect(screen.getByRole("button", { name: "Editar" })).toHaveFocus();
    await user.keyboard("{Enter} ");
    expect(onClick).toHaveBeenCalledTimes(2);
    await user.tab();
    expect(screen.getByRole("button", { name: "Próxima ação" })).toHaveFocus();
  });
});
