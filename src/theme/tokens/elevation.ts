/**
 * Estilos de elevação espelhados dos effect styles do Figma.
 * Regra do Figma: preferir borda ou mudança de superfície antes de sombra.
 */

export const elevationTokens = {
  /** Elevation/None — superfícies planas. */
  none: "none",
  /** Elevation/Small — elementos discretamente elevados. */
  small: "0 2px 6px 0 rgba(46, 41, 37, 0.10)",
  /** Elevation/Medium — menus e popovers. */
  medium: "0 4px 12px 0 rgba(46, 41, 37, 0.14)",
  /** Elevation/Large — dialogs e superfícies modais. */
  large: "0 10px 24px 0 rgba(46, 41, 37, 0.18)",
} as const;

export type ElevationName = keyof typeof elevationTokens;
