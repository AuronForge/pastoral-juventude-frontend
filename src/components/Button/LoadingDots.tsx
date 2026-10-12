import { styled } from "@mui/material";

/**
 * "Indicador de carregamento" dos componentes Button e Icon Button do Figma:
 * três círculos de 4 px com espaçamento layout/fine/3px, na cor do conteúdo.
 */
const Dots = styled("span")({
  display: "inline-flex",
  alignItems: "center",
  gap: "var(--layout-fine-3px)",
  height: "var(--layout-fine-6px)",
  "& > span": {
    display: "block",
    width: "var(--pj-space-1)",
    height: "var(--pj-space-1)",
    borderRadius: "var(--pj-radius-full)",
    backgroundColor: "currentColor",
  },
});

export function LoadingDots() {
  return (
    <Dots aria-hidden className="loading-dots">
      <span />
      <span />
      <span />
    </Dots>
  );
}
