import { render, screen } from "@testing-library/react";
import { MaterialSymbol } from "./MaterialSymbol";

describe("MaterialSymbol", () => {
  it("aplica a configuração Outlined e a escala oficial", () => {
    const { container } = render(<MaterialSymbol name="home" size="medium" />);
    const symbol = container.querySelector<HTMLSpanElement>(
      ".material-symbols-outlined",
    );

    expect(symbol).toHaveAttribute("aria-hidden", "true");
    expect(symbol).toHaveClass("material-symbol-size-medium");
    expect(symbol?.style.maskImage).toContain("data:image/svg+xml");
    expect(symbol?.style.maskRepeat).toBe("no-repeat");
    expect(symbol?.style.maskSize).toBe("contain");
    expect(symbol).toHaveAttribute("data-fill", "0");
    expect(symbol).toHaveAttribute("data-weight", "400");
    expect(symbol).toHaveAttribute("data-grade", "0");
    expect(symbol).toHaveAttribute("data-optical-size", "20");
  });

  it("aceita rótulo quando o símbolo é informativo", () => {
    render(<MaterialSymbol label="Agenda" name="calendar_month" />);

    expect(screen.getByRole("img", { name: "Agenda" })).toBeInTheDocument();
  });
});
