import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef, type ComponentProps } from "react";
import { Alert } from "./Alert";
import type { AlertSeverity } from "./Alert.types";

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
    ["success", "check"],
    ["information", "info_i"],
    ["attention", "priority_high"],
    ["error", "close"],
  ] as const)(
    "mantém o ícone semântico da severidade %s",
    (severity: AlertSeverity, icon) => {
      render(<Alert {...defaultProps} severity={severity} />);

      expect(
        screen.getByRole("alert").querySelector(".alert-icon"),
      ).toHaveTextContent(icon);
    },
  );

  it("usa o modelo Contornado com borda semântica", () => {
    render(<Alert {...defaultProps} model="outlined" severity="error" />);

    expect(screen.getByRole("alert")).toHaveStyle({
      backgroundColor: "var(--pj-color-bg-surface)",
    });
  });

  it("executa a ação opcional", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Alert {...defaultProps} action={{ label: "Ver detalhes", onClick }} />,
    );

    await user.click(screen.getByRole("button", { name: "Ver detalhes" }));
    expect(onClick).toHaveBeenCalledOnce();
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

  it("oferece um alvo de toque sem ampliar o ícone de fechamento", () => {
    render(<Alert {...defaultProps} dismissible onClose={vi.fn()} />);
    const button = screen.getByRole("button", { name: "Fechar alerta" });

    expect(button).toHaveStyle({
      width: "var(--space-extended-44px)",
      height: "var(--space-extended-44px)",
      flexShrink: "0",
    });
    expect(button.querySelector(".material-symbols-outlined")).toHaveStyle({
      width: "var(--pj-icon-size-md)",
      height: "var(--pj-icon-size-md)",
    });
  });

  it.each(["{Enter}", " "])("dispensa pelo teclado com %s", async (key) => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Alert {...defaultProps} dismissible onClose={onClose} />);

    await user.tab();
    expect(screen.getByRole("button", { name: "Fechar alerta" })).toHaveFocus();
    await user.keyboard(key);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("encaminha a referência ao elemento raiz", () => {
    const ref = createRef<HTMLDivElement>();

    render(<Alert {...defaultProps} ref={ref} />);

    expect(ref.current).toBe(screen.getByRole("alert"));
  });
});
