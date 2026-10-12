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

  it("usa a geometria do Figma para a Assinatura", () => {
    const { rerender } = render(<BrandLockup />);
    expect(screen.getByRole("img")).toHaveStyle({
      width: "240px",
      height: "72px",
    });

    rerender(<BrandLockup size="compact" />);
    expect(screen.getByRole("img")).toHaveStyle({
      width: "144px",
      height: "43px",
    });
  });

  it("oferece o formato Símbolo", () => {
    render(<BrandLockup format="symbol" />);

    const img = screen.getByRole("img", { name: "PastorApp" });
    expect(img.getAttribute("src")).toMatch(
      /pastorapp-symbol\.svg|^data:image\/svg\+xml/,
    );
    expect(img).toHaveStyle({ width: "72px", height: "72px" });
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
