import { styled } from "@mui/material";
import { forwardRef } from "react";
import { tokenValue } from "../../theme/tokens";
import type { IconProps, IconSize } from "./Icon.types";

const sizeToken = {
  sm: "icon/size/sm",
  md: "icon/size/md",
  lg: "icon/size/lg",
  xl: "icon/size/xl",
} as const;

/** O eixo opsz do Material Symbols vai de 20 a 48. */
function opticalSize(size: IconSize) {
  return Math.min(48, Math.max(20, tokenValue(sizeToken[size])));
}

const Glyph = styled("span", {
  shouldForwardProp: (prop) => prop !== "iconSize",
})<{ iconSize: IconSize }>(({ iconSize }) => ({
  display: "inline-block",
  flexShrink: 0,
  width: `var(--pj-icon-size-${iconSize})`,
  height: `var(--pj-icon-size-${iconSize})`,
  overflow: "hidden",
  fontFamily: '"Material Symbols Outlined"',
  fontSize: `var(--pj-icon-size-${iconSize})`,
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: 1,
  letterSpacing: "normal",
  textTransform: "none",
  whiteSpace: "nowrap",
  wordWrap: "normal",
  direction: "ltr",
  color: "inherit",
  userSelect: "none",
  WebkitFontSmoothing: "antialiased",
  fontFeatureSettings: '"liga"',
  fontVariationSettings: `"FILL" 0, "wght" 400, "GRAD" 0, "opsz" ${opticalSize(iconSize)}`,
}));

/**
 * Ícone Material Symbols Outlined, biblioteca oficial do Figma
 * (FILL 0, weight 400, grade 0, optical size conforme o tamanho).
 * Herda a cor do contexto.
 */
export const Icon = forwardRef<HTMLSpanElement, IconProps>(function Icon(
  { name, size = "lg", label, className, ...props },
  ref,
) {
  return (
    <Glyph
      {...props}
      ref={ref}
      className={["material-symbols-outlined", className]
        .filter(Boolean)
        .join(" ")}
      iconSize={size}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
      translate="no"
    >
      {name}
    </Glyph>
  );
});
