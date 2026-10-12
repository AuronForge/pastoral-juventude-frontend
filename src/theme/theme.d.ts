import type { CSSProperties } from "react";

type FigmaTypographyVariants = {
  display: CSSProperties;
  headingLarge: CSSProperties;
  headingMedium: CSSProperties;
  headingSmall: CSSProperties;
  title: CSSProperties;
  bodyLarge: CSSProperties;
  bodyMedium: CSSProperties;
  bodySmall: CSSProperties;
  labelLarge: CSSProperties;
  labelMedium: CSSProperties;
  labelSmall: CSSProperties;
};

declare module "@mui/material/styles" {
  interface CssThemeVariables {
    enabled: true;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface TypographyVariants extends FigmaTypographyVariants {}

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface TypographyVariantsOptions extends Partial<FigmaTypographyVariants> {}
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    display: true;
    headingLarge: true;
    headingMedium: true;
    headingSmall: true;
    title: true;
    bodyLarge: true;
    bodyMedium: true;
    bodySmall: true;
    labelLarge: true;
    labelMedium: true;
    labelSmall: true;
  }
}

export {};
