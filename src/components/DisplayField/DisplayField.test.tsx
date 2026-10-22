import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DisplayField } from "./DisplayField";

describe("DisplayField", () => {
  it("associa rótulo e valor em uma lista de definição", () => {
    render(<DisplayField label="Nome completo" value="João da Silva" />);

    expect(screen.getByRole("term")).toHaveTextContent("Nome completo");
    expect(screen.getByRole("definition")).toHaveTextContent("João da Silva");
  });

  it.each([undefined, null, ""])(
    "exibe somente - quando o valor é %s",
    (value) => {
      render(<DisplayField label="Telefone" value={value} copyable />);

      expect(screen.getByRole("definition")).toHaveTextContent(/^-$/);
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    },
  );

  it("torna o valor navegável no tipo link", () => {
    render(
      <DisplayField
        label="Portal"
        value="pastoral.org.br"
        type="link"
        href="https://pastoral.org.br"
      />,
    );

    expect(
      screen.getByRole("link", { name: "pastoral.org.br" }),
    ).toHaveAttribute("href", "https://pastoral.org.br");
  });

  it("copia o valor e confirma para leitores de tela", async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });
    const onCopy = vi.fn();
    render(
      <DisplayField
        label="E-mail"
        value="jose@pastoral.org.br"
        copyable
        onCopy={onCopy}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Copiar E-mail" }));

    expect(writeText).toHaveBeenCalledWith("jose@pastoral.org.br");
    expect(onCopy).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("status")).toHaveTextContent("E-mail copiado");
  });

  it("limpa a confirmação de cópia após 2 segundos", async () => {
    vi.useFakeTimers();
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
    render(<DisplayField label="E-mail" value="a@b.c" copyable />);

    await act(async () => {
      screen.getByRole("button", { name: "Copiar E-mail" }).click();
    });
    expect(screen.getByRole("status")).toHaveTextContent("E-mail copiado");
    await act(async () => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getByRole("status")).toHaveTextContent("");
    vi.useRealTimers();
  });

  it("mascara o valor sem colocá-lo no documento", () => {
    render(<DisplayField label="CPF" value="123.456.789-00" masked />);

    expect(screen.getByRole("definition")).toHaveTextContent("Valor oculto");
    expect(document.body).not.toHaveTextContent("123.456.789-00");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("mantém a máscara mesmo quando o valor não foi enviado", () => {
    render(<DisplayField label="Documento" masked />);

    expect(screen.getByRole("definition")).toHaveTextContent("Valor oculto");
    expect(screen.getByRole("definition")).not.toHaveTextContent(/^-$/);
  });

  it("não oferece cópia de dado mascarado sem permissão de revelar", () => {
    render(<DisplayField label="CPF" value="123" masked copyable />);

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("revela e oculta novamente quando autorizado", async () => {
    const user = userEvent.setup();
    const onReveal = vi.fn();
    render(
      <DisplayField
        label="CPF"
        value="123.456.789-00"
        masked
        canReveal
        onReveal={onReveal}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Revelar CPF" }));
    expect(onReveal).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("definition")).toHaveTextContent("123.456.789-00");

    await user.click(screen.getByRole("button", { name: "Ocultar CPF" }));
    expect(document.body).not.toHaveTextContent("123.456.789-00");
    expect(onReveal).toHaveBeenCalledTimes(1);
  });
});
