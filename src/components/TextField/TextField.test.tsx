import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { TextField } from "./TextField";

describe("TextField", () => {
  it("associa label e placeholder ao campo", () => {
    render(<TextField label="E-mail" placeholder="nome@exemplo.com" />);

    expect(screen.getByLabelText("E-mail")).toHaveAttribute(
      "placeholder",
      "nome@exemplo.com",
    );
  });

  it("exibe a dica quando não há erro", () => {
    render(<TextField hint="Use seu e-mail pastoral." label="E-mail" />);

    expect(screen.getByText("Use seu e-mail pastoral.")).toBeInTheDocument();
    expect(screen.getByLabelText("E-mail")).not.toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("prioriza a mensagem de erro e sinaliza o campo", () => {
    render(
      <TextField
        errorMessage="Informe um e-mail válido."
        hint="Use seu e-mail pastoral."
        label="E-mail"
      />,
    );

    expect(screen.getByText("Informe um e-mail válido.")).toHaveClass(
      "Mui-error",
    );
    expect(screen.getByLabelText("E-mail")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(
      screen.queryByText("Use seu e-mail pastoral."),
    ).not.toBeInTheDocument();
  });

  it("permite adornos e ícones nos dois lados", () => {
    render(
      <TextField
        label="Valor"
        leadingIcon={<span data-testid="icone-inicial">R</span>}
        prefix="R$"
        suffix=",00"
        trailingIcon={<span data-testid="icone-final">V</span>}
      />,
    );

    expect(screen.getByTestId("icone-inicial")).toBeInTheDocument();
    expect(screen.getByText("R$")).toBeInTheDocument();
    expect(screen.getByText(",00")).toBeInTheDocument();
    expect(screen.getByTestId("icone-final")).toBeInTheDocument();
  });

  it("suporta somente prefixo e sufixo", () => {
    render(<TextField label="Telefone" prefix="+55" suffix="BR" />);

    expect(screen.getByText("+55")).toBeInTheDocument();
    expect(screen.getByText("BR")).toBeInTheDocument();
  });

  it("aplica os estados desabilitado e somente leitura", () => {
    const { rerender } = render(<TextField disabled label="Usuário" />);

    expect(screen.getByLabelText("Usuário")).toBeDisabled();

    rerender(<TextField label="Usuário" readOnly />);

    expect(screen.getByLabelText("Usuário")).toHaveAttribute("readonly");
  });

  it.each(["medium", "large"] as const)("aceita o tamanho %s", (size) => {
    const { container } = render(<TextField label="Nome" size={size} />);

    expect(
      container.querySelector(".MuiOutlinedInput-root"),
    ).toBeInTheDocument();
  });

  it("encaminha a referência para o input", () => {
    const ref = createRef<HTMLInputElement>();

    render(<TextField label="Senha" ref={ref} type="password" />);

    expect(ref.current).toBe(screen.getByLabelText("Senha"));
  });

  it("encaminha atributos nativos de validação para o input", () => {
    render(
      <TextField
        inputProps={{ max: 99, min: 1 }}
        label="Quantidade"
        minLength={2}
        type="number"
      />,
    );

    expect(screen.getByLabelText("Quantidade")).toHaveAttribute("min", "1");
    expect(screen.getByLabelText("Quantidade")).toHaveAttribute("max", "99");
    expect(screen.getByLabelText("Quantidade")).toHaveAttribute(
      "minlength",
      "2",
    );
  });
});
