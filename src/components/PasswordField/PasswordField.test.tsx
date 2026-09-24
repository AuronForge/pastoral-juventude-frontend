import { render, screen } from "@testing-library/react";
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
});
