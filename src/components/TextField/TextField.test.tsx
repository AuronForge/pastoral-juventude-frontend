import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  it("permite um ícone à esquerda ou à direita", () => {
    const { rerender } = render(
      <TextField
        label="Buscar"
        leadingIcon={<span data-testid="icone-inicial">B</span>}
        type="search"
      />,
    );
    expect(screen.getByTestId("icone-inicial")).toBeInTheDocument();

    rerender(
      <TextField
        label="E-mail"
        trailingIcon={<span data-testid="icone-final">E</span>}
        type="email"
      />,
    );
    expect(screen.getByTestId("icone-final")).toBeInTheDocument();
  });

  it("não exibe texto de ajuda vazio", () => {
    const { container } = render(<TextField label="Nome" />);

    expect(
      container.querySelector(".MuiFormHelperText-root"),
    ).not.toBeInTheDocument();
  });

  it("usa Médio (40 px) como tamanho padrão e Grande com 48 px", () => {
    const { container, rerender } = render(<TextField label="Nome" />);
    expect(container.querySelector(".MuiOutlinedInput-root")).toHaveStyle({
      height: "var(--space-extended-40px)",
    });

    rerender(<TextField label="Nome" size="large" />);
    expect(container.querySelector(".MuiOutlinedInput-root")).toHaveStyle({
      height: "var(--pj-space-8)",
    });
  });

  it("não oferece a ação de visibilidade na Senha somente leitura", () => {
    render(<TextField label="Senha" readOnly type="password" />);

    expect(
      screen.queryByRole("button", { name: "Mostrar senha" }),
    ).not.toBeInTheDocument();
  });

  it("aplica os estados desabilitado e somente leitura", () => {
    const { rerender } = render(<TextField disabled label="Usuário" />);

    expect(screen.getByLabelText("Usuário")).toBeDisabled();

    rerender(<TextField label="Usuário" readOnly />);

    expect(screen.getByLabelText("Usuário")).toHaveAttribute("readonly");
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

  it("usa o tipo password na Senha", () => {
    render(<TextField type="password" label="Senha" />);

    expect(screen.getByLabelText("Senha")).toHaveAttribute("type", "password");
  });

  it("mantém label, ajuda, erro e validação na Senha", () => {
    render(
      <TextField
        type="password"
        errorMessage="A senha deve ter ao menos 8 caracteres."
        hint="Use no mínimo 8 caracteres."
        label="Senha"
        minLength={8}
        placeholder="Digite sua senha"
        required
      />,
    );

    expect(screen.getByLabelText(/^Senha/)).toHaveAttribute(
      "placeholder",
      "Digite sua senha",
    );
    expect(screen.getByLabelText(/^Senha/)).toHaveAttribute("minlength", "8");
    expect(
      screen.getByText("A senha deve ter ao menos 8 caracteres."),
    ).toHaveClass("Mui-error");
    expect(
      screen.getByRole("button", { name: "Mostrar senha" }),
    ).toBeInTheDocument();
  });

  it("revela e oculta a senha sem alterar o valor do campo", async () => {
    const user = userEvent.setup();

    render(
      <TextField type="password" defaultValue="segredo123" label="Senha" />,
    );

    const input = screen.getByLabelText("Senha");
    await user.click(screen.getByRole("button", { name: "Mostrar senha" }));

    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveValue("segredo123");
    expect(
      screen.getByRole("button", { name: "Ocultar senha" }),
    ).toHaveAttribute("aria-pressed", "true");

    await user.click(screen.getByRole("button", { name: "Ocultar senha" }));

    expect(input).toHaveAttribute("type", "password");
  });

  it("permite personalizar os nomes acessíveis da ação", () => {
    render(
      <TextField
        type="password"
        label="Senha"
        showPasswordLabel="Exibir credencial"
      />,
    );

    expect(
      screen.getByRole("button", { name: "Exibir credencial" }),
    ).toBeInTheDocument();
  });

  it("encaminha a referência ao input nativo", () => {
    const ref = createRef<HTMLInputElement>();

    render(<TextField type="password" label="Senha" ref={ref} />);

    expect(ref.current).toBe(screen.getByLabelText("Senha"));
  });

  it("bloqueia a revelação da senha quando o campo está desabilitado", () => {
    render(
      <TextField
        type="password"
        defaultValue="segredo123"
        disabled
        label="Senha"
      />,
    );
    const input = screen.getByLabelText("Senha");
    const toggle = screen.getByRole("button", { name: "Mostrar senha" });

    expect(input).toBeDisabled();
    expect(toggle).toBeDisabled();
    fireEvent.click(toggle);
    expect(input).toHaveAttribute("type", "password");
    expect(input).toHaveValue("segredo123");
    expect(toggle).toHaveAttribute("aria-pressed", "false");
  });

  it("retira o campo e sua ação desabilitados da navegação por Tab", async () => {
    const user = userEvent.setup();
    render(
      <>
        <TextField type="password" disabled label="Senha" />
        <button type="button">Próxima ação</button>
      </>,
    );

    await user.tab();
    expect(screen.getByRole("button", { name: "Próxima ação" })).toHaveFocus();
  });

  it("volta a permitir a revelação ao reabilitar o campo", async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <TextField
        type="password"
        defaultValue="segredo123"
        disabled
        label="Senha"
      />,
    );

    rerender(
      <TextField type="password" defaultValue="segredo123" label="Senha" />,
    );
    const toggle = screen.getByRole("button", { name: "Mostrar senha" });
    expect(toggle).toBeEnabled();
    await user.click(toggle);
    expect(screen.getByLabelText("Senha")).toHaveAttribute("type", "text");
    expect(screen.getByLabelText("Senha")).toHaveValue("segredo123");
  });

  it("bloqueia a ação quando um campo habilitado passa a ficar desabilitado", async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <TextField type="password" defaultValue="segredo123" label="Senha" />,
    );
    await user.click(screen.getByRole("button", { name: "Mostrar senha" }));

    rerender(
      <TextField
        type="password"
        defaultValue="segredo123"
        disabled
        label="Senha"
      />,
    );
    const toggle = screen.getByRole("button", { name: "Ocultar senha" });
    expect(toggle).toBeDisabled();
    fireEvent.click(toggle);
    expect(screen.getByLabelText("Senha")).toHaveAttribute("type", "text");
    expect(toggle).toHaveAttribute("aria-pressed", "true");
  });
});
