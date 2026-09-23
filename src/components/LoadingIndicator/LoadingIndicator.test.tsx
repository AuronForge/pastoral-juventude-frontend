import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { LoadingIndicator } from "./LoadingIndicator";

describe("LoadingIndicator", () => {
  it("expõe um indicador de progresso com nome acessível", () => {
    render(<LoadingIndicator label="Carregando encontros" />);

    expect(
      screen.getByRole("progressbar", { name: "Carregando encontros" }),
    ).toBeInTheDocument();
  });

  it.each([
    ["small", "16px"],
    ["medium", "20px"],
    ["large", "24px"],
  ] as const)("mapeia o tamanho %s para %s", (size, pixels) => {
    render(<LoadingIndicator label="Carregando" size={size} />);

    expect(screen.getByRole("progressbar")).toHaveStyle({
      width: pixels,
      height: pixels,
    });
  });

  it("usa a cor primária no tom padrão", () => {
    render(<LoadingIndicator label="Carregando" />);

    expect(screen.getByRole("progressbar")).toHaveClass(
      "MuiCircularProgress-colorPrimary",
    );
  });

  it("herda a cor do contexto no tom sobre sólido", () => {
    render(<LoadingIndicator label="Carregando" tone="on-solid" />);

    expect(screen.getByRole("progressbar")).toHaveClass(
      "MuiCircularProgress-colorInherit",
    );
  });

  it("sai da árvore acessível quando é decorativo", () => {
    const { container } = render(<LoadingIndicator decorative />);

    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
    expect(container.firstChild).not.toHaveAttribute("aria-label");
  });

  it("encaminha a referência e os atributos do elemento raiz", () => {
    const ref = createRef<HTMLSpanElement>();

    render(
      <LoadingIndicator ref={ref} label="Carregando" data-testid="indicador" />,
    );

    expect(ref.current).toBe(screen.getByTestId("indicador"));
  });
});
