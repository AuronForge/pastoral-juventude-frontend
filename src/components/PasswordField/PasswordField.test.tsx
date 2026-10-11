import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { PasswordField } from "./PasswordField";

describe("PasswordField", () => {
  it("usa sempre o tipo password", () => {
    render(<PasswordField label="Senha" />);

    expect(screen.getByLabelText("Senha")).toHaveAttribute("type", "password");
  });

  it("preserva o contrato visual e de validação do TextField", () => {
    render(
      <PasswordField
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

    render(<PasswordField defaultValue="segredo123" label="Senha" />);

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
      <PasswordField label="Senha" showPasswordLabel="Exibir credencial" />,
    );

    expect(
      screen.getByRole("button", { name: "Exibir credencial" }),
    ).toBeInTheDocument();
  });

  it("encaminha a referência ao input nativo", () => {
    const ref = createRef<HTMLInputElement>();

    render(<PasswordField label="Senha" ref={ref} />);

    expect(ref.current).toBe(screen.getByLabelText("Senha"));
  });

  it("bloqueia a revelação da senha quando o campo está desabilitado", () => {
    render(<PasswordField defaultValue="segredo123" disabled label="Senha" />);
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
        <PasswordField disabled label="Senha" />
        <button type="button">Próxima ação</button>
      </>,
    );

    await user.tab();
    expect(screen.getByRole("button", { name: "Próxima ação" })).toHaveFocus();
  });

  it("volta a permitir a revelação ao reabilitar o campo", async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <PasswordField defaultValue="segredo123" disabled label="Senha" />,
    );

    rerender(<PasswordField defaultValue="segredo123" label="Senha" />);
    const toggle = screen.getByRole("button", { name: "Mostrar senha" });
    expect(toggle).toBeEnabled();
    await user.click(toggle);
    expect(screen.getByLabelText("Senha")).toHaveAttribute("type", "text");
    expect(screen.getByLabelText("Senha")).toHaveValue("segredo123");
  });

  it("bloqueia a ação quando um campo habilitado passa a ficar desabilitado", async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <PasswordField defaultValue="segredo123" label="Senha" />,
    );
    await user.click(screen.getByRole("button", { name: "Mostrar senha" }));

    rerender(
      <PasswordField defaultValue="segredo123" disabled label="Senha" />,
    );
    const toggle = screen.getByRole("button", { name: "Ocultar senha" });
    expect(toggle).toBeDisabled();
    fireEvent.click(toggle);
    expect(screen.getByLabelText("Senha")).toHaveAttribute("type", "text");
    expect(toggle).toHaveAttribute("aria-pressed", "true");
  });
});
