import type { CSSProperties } from "react";

declare module "@mui/material/styles" {
  interface CssThemeVariables {
    enabled: true;
  }

  interface TypographyVariants {
    displayXl: CSSProperties;
    displayLarge: CSSProperties;
    displayMedium: CSSProperties;
    displaySmall: CSSProperties;
    title: CSSProperties;
    headingLarge: CSSProperties;
    headingMedium: CSSProperties;
    headingSmall: CSSProperties;
    bodyLarge: CSSProperties;
    bodyMedium: CSSProperties;
    bodyMediumStrong: CSSProperties;
    bodySmall: CSSProperties;
    bodySmallStrong: CSSProperties;
    labelMedium: CSSProperties;
    labelLarge: CSSProperties;
    labelSmall: CSSProperties;
    metricDisplay: CSSProperties;
  }

  interface TypographyVariantsOptions {
    displayXl?: CSSProperties;
    displayLarge?: CSSProperties;
    displayMedium?: CSSProperties;
    displaySmall?: CSSProperties;
    title?: CSSProperties;
    headingLarge?: CSSProperties;
    headingMedium?: CSSProperties;
    headingSmall?: CSSProperties;
    bodyLarge?: CSSProperties;
    bodyMedium?: CSSProperties;
    bodyMediumStrong?: CSSProperties;
    bodySmall?: CSSProperties;
    bodySmallStrong?: CSSProperties;
    labelMedium?: CSSProperties;
    labelLarge?: CSSProperties;
    labelSmall?: CSSProperties;
    metricDisplay?: CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    displayXl: true;
    displayLarge: true;
    displayMedium: true;
    displaySmall: true;
    title: true;
    headingLarge: true;
    headingMedium: true;
    headingSmall: true;
    bodyLarge: true;
    bodyMedium: true;
    bodyMediumStrong: true;
    bodySmall: true;
    bodySmallStrong: true;
    labelMedium: true;
    labelLarge: true;
    labelSmall: true;
    metricDisplay: true;
  }
}

export {};
