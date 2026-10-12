import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { Progress } from "./Progress";

describe("Progress", () => {
  it("informa a operação em andamento no modo indeterminado", () => {
    render(<Progress label="Restaurando sua sessão" />);

    const progress = screen.getByRole("progressbar", {
      name: "Restaurando sua sessão",
    });
    expect(progress).not.toHaveAttribute("aria-valuenow");
  });

  it("expõe mínimo, máximo e valor atual no modo determinado", () => {
    render(<Progress label="Enviando arquivo" value={64} type="linear" />);

    const progress = screen.getByRole("progressbar", {
      name: "Enviando arquivo",
    });
    expect(progress).toHaveAttribute("aria-valuemin", "0");
    expect(progress).toHaveAttribute("aria-valuemax", "100");
    expect(progress).toHaveAttribute("aria-valuenow", "64");
  });

  it("mantém o valor entre 0 e 100", () => {
    render(<Progress label="Importando" value={140} showValue />);

    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "100",
    );
    expect(screen.getByText("100%")).toBeInTheDocument();
  });

  it("exibe o percentual somente quando solicitado no modo determinado", () => {
    const { rerender } = render(
      <Progress label="Enviando" value={30} type="linear" />,
    );
    expect(screen.queryByText("30%")).not.toBeInTheDocument();

    rerender(<Progress label="Enviando" value={30} type="linear" showValue />);
    expect(screen.getByText("30%")).toBeInTheDocument();

    rerender(<Progress label="Enviando" type="linear" showValue />);
    expect(screen.queryByText(/%/)).not.toBeInTheDocument();
  });

  it("encaminha a referência e os atributos do elemento raiz", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Progress ref={ref} label="Carregando" data-testid="progresso" />);

    expect(ref.current).toBe(screen.getByTestId("progresso"));
  });
});
