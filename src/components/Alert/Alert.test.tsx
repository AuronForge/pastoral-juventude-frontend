import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef, type ComponentProps } from "react";
import { Alert } from "./Alert";
import type { AlertTone } from "./Alert.types";

const defaultProps: ComponentProps<typeof Alert> = {
  title: "Não foi possível salvar",
  children:
    "Este registro foi alterado por outra pessoa. Recarregue os dados antes de salvar novamente.",
};

describe("Alert", () => {
  it("expõe a mensagem com o papel acessível de alerta", () => {
    render(<Alert {...defaultProps} />);

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Não foi possível salvar",
    );
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Este registro foi alterado por outra pessoa.",
    );
  });

  it.each([
    ["info", "MuiAlert-colorInfo"],
    ["success", "MuiAlert-colorSuccess"],
    ["warning", "MuiAlert-colorWarning"],
    ["danger", "MuiAlert-colorError"],
  ] as const)("mapeia o tom %s", (tone: AlertTone, muiClass) => {
    render(<Alert {...defaultProps} tone={tone} />);

    expect(screen.getByRole("alert")).toHaveClass(muiClass);
  });

  it("não oferece dispensa por padrão", () => {
    render(<Alert {...defaultProps} />);

    expect(
      screen.queryByRole("button", { name: "Fechar alerta" }),
    ).not.toBeInTheDocument();
  });

  it("executa a ação de dispensar com nome acessível", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();

    render(<Alert {...defaultProps} dismissible onClose={onClose} />);
    await user.click(screen.getByRole("button", { name: "Fechar alerta" }));

    expect(onClose).toHaveBeenCalledOnce();
  });

  it("permite personalizar o nome acessível da ação de dispensar", () => {
    render(
      <Alert
        {...defaultProps}
        closeLabel="Dispensar aviso de conflito"
        dismissible
        onClose={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("button", { name: "Dispensar aviso de conflito" }),
    ).toBeInTheDocument();
  });

  it("encaminha a referência ao elemento raiz", () => {
    const ref = createRef<HTMLDivElement>();

    render(<Alert {...defaultProps} ref={ref} />);

    expect(ref.current).toBe(screen.getByRole("alert"));
  });
});
