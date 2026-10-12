import { Tooltip as MuiTooltip, tooltipClasses } from "@mui/material";
import { typographyStyle } from "../../theme/tokens";
import type { TooltipProps } from "./Tooltip.types";

/**
 * Tooltip do Figma: balão escuro (color/tooltip/bg) com texto em
 * Label/Medium (color/tooltip/text), padding 8/12 px, raio 6 px e seta
 * direcional. Exibido após 300 ms de hover ou foco; fecha com Escape.
 */
export function Tooltip({
  text,
  position = "top",
  disabled = false,
  children,
}: TooltipProps) {
  return (
    <MuiTooltip
      arrow
      describeChild
      disableHoverListener={disabled}
      disableFocusListener={disabled}
      disableTouchListener={disabled}
      enterDelay={300}
      enterNextDelay={300}
      placement={position}
      title={text}
      slotProps={{
        tooltip: {
          sx: {
            [`&.${tooltipClasses.tooltip}`]: {
              ...typographyStyle("labelMedium"),
              padding: "var(--pj-space-2) var(--pj-space-3)",
              borderRadius: "var(--layout-fine-6px)",
              backgroundColor: "var(--color-tooltip-bg)",
              color: "var(--color-tooltip-text)",
            },
          },
        },
        arrow: { sx: { color: "var(--color-tooltip-bg)" } },
      }}
    >
      {children}
    </MuiTooltip>
  );
}
