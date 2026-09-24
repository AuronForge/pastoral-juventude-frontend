import { VisibilityOff } from "@mui/icons-material";
import { render, screen } from "@testing-library/react";
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
        trailingIcon={<VisibilityOff data-testid="icone-senha" />}
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
    expect(screen.getByTestId("icone-senha")).toBeInTheDocument();
  });

  it("encaminha a referência ao input nativo", () => {
    const ref = createRef<HTMLInputElement>();

    render(<PasswordField label="Senha" ref={ref} />);

    expect(ref.current).toBe(screen.getByLabelText("Senha"));
  });
});
