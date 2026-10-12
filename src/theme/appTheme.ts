import { createTheme, type Shadows } from "@mui/material/styles";
import {
  designSystemCssVariables,
  elevationTokens,
  fontFamily,
  pendingLayoutTokens,
  resolveColor,
  tokenValue,
  typographyStyle,
} from "./tokens";

const elevationByLevel = [
  elevationTokens.none,
  elevationTokens.small,
  elevationTokens.medium,
  elevationTokens.large,
];

const appShadows = Array.from(
  { length: 25 },
  (_, level) => elevationByLevel[Math.min(level, elevationByLevel.length - 1)],
) as Shadows;

const typography = {
  display: typographyStyle("display"),
  headingLarge: typographyStyle("headingLarge"),
  headingMedium: typographyStyle("headingMedium"),
  headingSmall: typographyStyle("headingSmall"),
  title: typographyStyle("title"),
  bodyLarge: typographyStyle("bodyLarge"),
  bodyMedium: typographyStyle("bodyMedium"),
  bodySmall: typographyStyle("bodySmall"),
  labelLarge: typographyStyle("labelLarge"),
  labelMedium: typographyStyle("labelMedium"),
  labelSmall: typographyStyle("labelSmall"),
};

/**
 * Tema MUI derivado dos tokens do Figma. O Figma define somente o modo claro.
 */
export function createAppTheme() {
  return createTheme({
    cssVariables: { cssVarPrefix: "pj" },
    palette: {
      mode: "light",
      primary: {
        main: resolveColor("color/action/primary"),
        dark: resolveColor("color/action/primary-hover"),
        contrastText: resolveColor("color/text/inverse"),
      },
      secondary: {
        main: resolveColor("color/action/accent"),
        contrastText: resolveColor("color/text/inverse"),
      },
      error: {
        main: resolveColor("color/action/danger"),
        dark: resolveColor("color/action/danger-hover"),
        contrastText: resolveColor("color/text/inverse"),
      },
      success: {
        main: resolveColor("color/feedback/success"),
        contrastText: resolveColor("color/text/inverse"),
      },
      warning: {
        main: resolveColor("color/feedback/attention"),
        contrastText: resolveColor("color/text/inverse"),
      },
      info: {
        main: resolveColor("color/feedback/information"),
        contrastText: resolveColor("color/text/inverse"),
      },
      background: {
        default: resolveColor("color/bg/canvas"),
        paper: resolveColor("color/bg/surface"),
      },
      text: {
        primary: resolveColor("color/text/primary"),
        secondary: resolveColor("color/text/secondary"),
        disabled: resolveColor("color/text/disabled"),
      },
      divider: resolveColor("color/border/default"),
      action: {
        disabled: resolveColor("color/text/disabled"),
        disabledBackground: resolveColor("color/action/disabled"),
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: pendingLayoutTokens.breakpoints.mobile,
        md: pendingLayoutTokens.breakpoints.tablet,
        lg: pendingLayoutTokens.breakpoints.desktop,
        xl: pendingLayoutTokens.breakpoints.wide,
      },
    },
    spacing: 8,
    motion: { reducedMotion: "system" },
    shape: { borderRadius: tokenValue("radius/md") },
    shadows: appShadows,
    typography: {
      fontFamily,
      h1: typography.display,
      h2: typography.headingLarge,
      h3: typography.headingMedium,
      h4: typography.headingSmall,
      h5: typography.title,
      h6: typography.title,
      subtitle1: typography.title,
      subtitle2: typography.labelLarge,
      body1: typography.bodyLarge,
      body2: typography.bodyMedium,
      button: { ...typography.labelMedium, textTransform: "none" },
      caption: typography.bodySmall,
      overline: { ...typography.labelLarge, textTransform: "none" },
      ...typography,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          ":root": designSystemCssVariables,
          "*, *::before, *::after": { boxSizing: "border-box" },
          body: {
            margin: 0,
            color: "var(--pj-color-text-primary)",
            backgroundColor: "var(--pj-color-bg-canvas)",
            fontFamily,
          },
          "a:focus-visible, button:focus-visible, [tabindex]:focus-visible": {
            outline:
              "var(--pj-border-width-emphasis) solid var(--pj-color-border-focus)",
            outlineOffset: "var(--layout-fine-2px)",
          },
        },
      },
      MuiPaper: {
        styleOverrides: { root: { backgroundImage: "none" } },
      },
    },
  });
}

export const appTheme = createAppTheme();
