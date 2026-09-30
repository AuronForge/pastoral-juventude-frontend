import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { BrandLockup } from "./BrandLockup";

describe("BrandLockup", () => {
  it("expõe a marca com nome acessível por padrão", () => {
    render(<BrandLockup />);

    expect(screen.getByRole("img", { name: "PastorApp" })).toHaveAttribute(
      "src",
      expect.stringContaining("pastorapp-on-light.svg"),
    );
  });

  it("seleciona a marca para fundo escuro", () => {
    render(<BrandLockup tone="on-dark" />);

    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      expect.stringContaining("pastorapp-on-dark.svg"),
    );
  });

  it("respeita o tamanho mínimo oficial no modo compacto", () => {
    render(<BrandLockup size="compact" />);

    expect(screen.getByRole("img")).toHaveStyle({ height: "36px" });
  });

  it("remove a marca decorativa da árvore acessível", () => {
    render(<BrandLockup decorative />);

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.getByAltText("")).toHaveAttribute("aria-hidden", "true");
  });

  it("encaminha a referência e os atributos do elemento raiz", () => {
    const ref = createRef<HTMLImageElement>();

    render(<BrandLockup ref={ref} data-testid="marca" />);

    expect(ref.current).toBe(screen.getByTestId("marca"));
  });
});
