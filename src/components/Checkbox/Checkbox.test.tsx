import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("associa o rótulo ao controle", () => {
    render(<Checkbox label="Registrar presença" />);

    expect(
      screen.getByRole("checkbox", { name: "Registrar presença" }),
    ).toBeInTheDocument();
  });

  it("suporta o estado marcado", () => {
    render(<Checkbox checked label="Presença registrada" />);

    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("expõe o estado indeterminado", () => {
    render(<Checkbox indeterminate label="Presença parcial" />);

    expect(screen.getByRole("checkbox")).toHaveAttribute(
      "data-indeterminate",
      "true",
    );
  });

  it("bloqueia a interação no estado desabilitado", () => {
    render(<Checkbox disabled label="Sem permissão" />);

    expect(screen.getByRole("checkbox")).toBeDisabled();
  });

  it("encaminha a referência ao input nativo", () => {
    const ref = createRef<HTMLInputElement>();

    render(<Checkbox ref={ref} label="Registrar presença" />);

    expect(ref.current).toBe(screen.getByRole("checkbox"));
  });
});
