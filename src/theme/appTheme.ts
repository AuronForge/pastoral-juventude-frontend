import { createTheme, type Shadows } from "@mui/material/styles";
import {
  breakpointTokens,
  designSystemCssVariables,
  elevationTokens,
  fontFamilyTokens,
  radiusTokens,
  semanticColors,
  type SemanticColorScheme,
  typographyTokens,
} from "./tokens";

function createPalette(colors: SemanticColorScheme) {
  return {
    primary: {
      main: colors.primary.solid,
      light: colors.primary.subtle,
      dark: colors.primary.solidHover,
      contrastText: colors.text.onPrimary,
    },
    secondary: {
      main: colors.accent.solid,
      light: colors.accent.subtle,
      dark: colors.accent.text,
      contrastText: colors.status.warning.onSolid,
    },
    success: {
      main: colors.status.success.solid,
      light: colors.status.success.subtle,
      dark: colors.status.success.text,
      contrastText: colors.status.success.onSolid,
    },
    warning: {
      main: colors.status.warning.solid,
      light: colors.status.warning.subtle,
      dark: colors.status.warning.text,
      contrastText: colors.status.warning.onSolid,
    },
    error: {
      main: colors.status.danger.solid,
      light: colors.status.danger.subtle,
      dark: colors.status.danger.solidHover,
      contrastText: colors.status.danger.onSolid,
    },
    info: {
      main: colors.status.info.solid,
      light: colors.status.info.subtle,
      dark: colors.status.info.text,
      contrastText: colors.status.info.onSolid,
    },
    background: {
      default: colors.bg.canvas,
      paper: colors.bg.surface,
    },
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
      disabled: colors.text.disabled,
    },
    divider: colors.border.default,
    action: {
      hover: colors.bg.surfaceAlt,
      selected: colors.primary.subtle,
      disabled: colors.text.disabled,
      disabledBackground: colors.bg.surfaceSunken,
      focus: colors.primary.subtle,
    },
  };
}

const appShadows = Array.from({ length: 25 }, (_, index) => {
  if (index === 0) return elevationTokens.none;
  if (index === 1) return elevationTokens.subtle;
  if (index === 2) return elevationTokens.card;
  if (index === 3) return elevationTokens.floating;
  return elevationTokens.modal;
}) as Shadows;

export const appTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data",
    cssVarPrefix: "pj",
  },
  defaultColorScheme: "light",
  colorSchemes: {
    light: { palette: createPalette(semanticColors.light) },
    dark: { palette: createPalette(semanticColors.dark) },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: breakpointTokens.mobile,
      md: breakpointTokens.tablet,
      lg: breakpointTokens.desktop,
      xl: breakpointTokens.wide,
    },
  },
  spacing: 8,
  shape: { borderRadius: radiusTokens.md },
  shadows: appShadows,
  typography: {
    fontFamily: fontFamilyTokens.body,
    h1: typographyTokens.displayXl,
    h2: typographyTokens.displayLarge,
    h3: typographyTokens.displayMedium,
    h4: typographyTokens.displaySmall,
    h5: typographyTokens.headingLarge,
    h6: typographyTokens.headingMedium,
    subtitle1: typographyTokens.headingSmall,
    subtitle2: typographyTokens.bodySmallStrong,
    body1: typographyTokens.bodyLarge,
    body2: typographyTokens.bodyMedium,
    button: {
      ...typographyTokens.labelMedium,
      textTransform: "none",
    },
    caption: typographyTokens.caption,
    overline: typographyTokens.overline,
    displayXl: typographyTokens.displayXl,
    displayLarge: typographyTokens.displayLarge,
    displayMedium: typographyTokens.displayMedium,
    displaySmall: typographyTokens.displaySmall,
    headingLarge: typographyTokens.headingLarge,
    headingMedium: typographyTokens.headingMedium,
    headingSmall: typographyTokens.headingSmall,
    bodyLarge: typographyTokens.bodyLarge,
    bodyMedium: typographyTokens.bodyMedium,
    bodyMediumStrong: typographyTokens.bodyMediumStrong,
    bodySmall: typographyTokens.bodySmall,
    bodySmallStrong: typographyTokens.bodySmallStrong,
    labelMedium: typographyTokens.labelMedium,
    labelSmall: typographyTokens.labelSmall,
    metricDisplay: typographyTokens.metricDisplay,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ":root": designSystemCssVariables.light,
        '[data-mui-color-scheme="dark"]': designSystemCssVariables.dark,
        "*, *::before, *::after": { boxSizing: "border-box" },
        "::selection": {
          color: "var(--text-primary)",
          backgroundColor: "var(--primary-subtle)",
        },
        body: {
          margin: 0,
          color: "var(--text-primary)",
          backgroundColor: "var(--bg-canvas)",
          fontFamily: "var(--font-family-body)",
        },
        "a:focus-visible, button:focus-visible, [tabindex]:focus-visible": {
          outline:
            "3px solid color-mix(in srgb, var(--border-focus) 55%, transparent)",
          outlineOffset: 2,
        },
      },
    },
    MuiPaper: {
      styleOverrides: { root: { backgroundImage: "none" } },
    },
    MuiSkeleton: {
      styleOverrides: { root: { backgroundColor: "var(--skeleton-base)" } },
    },
  },
});
