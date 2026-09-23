export const fontFamilyTokens = {
  display: '"Fraunces", Georgia, serif',
  body: '"Figtree", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
} as const;

export const fontWeightTokens = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const fontSizeTokens = {
  xs: 12,
  sm: 13,
  md: 14,
  lg: 16,
  xl: 18,
  "2xl": 20,
  "3xl": 24,
  "4xl": 28,
  "5xl": 32,
  "6xl": 40,
} as const;

export const lineHeightTokens = {
  xs: 16,
  sm: 18,
  md: 20,
  lg: 24,
  xl: 26,
  "2xl": 28,
  "3xl": 32,
  "4xl": 36,
  "5xl": 40,
  "6xl": 48,
} as const;

export const letterSpacingTokens = {
  tight: -0.2,
  normal: 0,
  wide: 0.4,
  caps: 1.1,
} as const;

export const typographyTokens = {
  displayXl: {
    fontFamily: fontFamilyTokens.display,
    fontSize: fontSizeTokens["6xl"],
    lineHeight: `${lineHeightTokens["6xl"]}px`,
    fontWeight: fontWeightTokens.semibold,
    letterSpacing: "-0.4px",
  },
  displayLarge: {
    fontFamily: fontFamilyTokens.display,
    fontSize: fontSizeTokens["5xl"],
    lineHeight: `${lineHeightTokens["5xl"]}px`,
    fontWeight: fontWeightTokens.semibold,
    letterSpacing: "-0.3px",
  },
  displayMedium: {
    fontFamily: fontFamilyTokens.display,
    fontSize: fontSizeTokens["4xl"],
    lineHeight: `${lineHeightTokens["4xl"]}px`,
    fontWeight: fontWeightTokens.semibold,
    letterSpacing: "-0.2px",
  },
  displaySmall: {
    fontFamily: fontFamilyTokens.display,
    fontSize: fontSizeTokens["3xl"],
    lineHeight: `${lineHeightTokens["3xl"]}px`,
    fontWeight: fontWeightTokens.semibold,
    letterSpacing: "-0.2px",
  },
  headingLarge: {
    fontFamily: fontFamilyTokens.body,
    fontSize: fontSizeTokens["2xl"],
    lineHeight: `${lineHeightTokens["2xl"]}px`,
    fontWeight: fontWeightTokens.semibold,
    letterSpacing: "-0.2px",
  },
  headingMedium: {
    fontFamily: fontFamilyTokens.body,
    fontSize: fontSizeTokens.xl,
    lineHeight: `${lineHeightTokens.xl}px`,
    fontWeight: fontWeightTokens.semibold,
    letterSpacing: "-0.1px",
  },
  headingSmall: {
    fontFamily: fontFamilyTokens.body,
    fontSize: fontSizeTokens.lg,
    lineHeight: `${lineHeightTokens.lg}px`,
    fontWeight: fontWeightTokens.semibold,
    letterSpacing: 0,
  },
  bodyLarge: {
    fontFamily: fontFamilyTokens.body,
    fontSize: fontSizeTokens.lg,
    lineHeight: `${lineHeightTokens.lg}px`,
    fontWeight: fontWeightTokens.regular,
    letterSpacing: 0,
  },
  bodyMedium: {
    fontFamily: fontFamilyTokens.body,
    fontSize: fontSizeTokens.md,
    lineHeight: `${lineHeightTokens.md}px`,
    fontWeight: fontWeightTokens.regular,
    letterSpacing: 0,
  },
  bodyMediumStrong: {
    fontFamily: fontFamilyTokens.body,
    fontSize: fontSizeTokens.md,
    lineHeight: `${lineHeightTokens.md}px`,
    fontWeight: fontWeightTokens.semibold,
    letterSpacing: 0,
  },
  bodySmall: {
    fontFamily: fontFamilyTokens.body,
    fontSize: fontSizeTokens.sm,
    lineHeight: `${lineHeightTokens.sm}px`,
    fontWeight: fontWeightTokens.regular,
    letterSpacing: 0,
  },
  bodySmallStrong: {
    fontFamily: fontFamilyTokens.body,
    fontSize: fontSizeTokens.sm,
    lineHeight: `${lineHeightTokens.sm}px`,
    fontWeight: fontWeightTokens.semibold,
    letterSpacing: 0,
  },
  labelMedium: {
    fontFamily: fontFamilyTokens.body,
    fontSize: fontSizeTokens.sm,
    lineHeight: `${lineHeightTokens.sm}px`,
    fontWeight: fontWeightTokens.medium,
    letterSpacing: 0,
  },
  labelSmall: {
    fontFamily: fontFamilyTokens.body,
    fontSize: fontSizeTokens.xs,
    lineHeight: `${lineHeightTokens.xs}px`,
    fontWeight: fontWeightTokens.medium,
    letterSpacing: 0,
  },
  caption: {
    fontFamily: fontFamilyTokens.body,
    fontSize: fontSizeTokens.xs,
    lineHeight: `${lineHeightTokens.xs}px`,
    fontWeight: fontWeightTokens.regular,
    letterSpacing: 0,
  },
  overline: {
    fontFamily: fontFamilyTokens.body,
    fontSize: fontSizeTokens.xs,
    lineHeight: `${lineHeightTokens.xs}px`,
    fontWeight: fontWeightTokens.bold,
    letterSpacing: `${letterSpacingTokens.caps}px`,
    textTransform: "uppercase" as const,
  },
  metricDisplay: {
    fontFamily: fontFamilyTokens.display,
    fontSize: fontSizeTokens["4xl"],
    lineHeight: `${lineHeightTokens["4xl"]}px`,
    fontWeight: fontWeightTokens.semibold,
    letterSpacing: "-0.2px",
  },
} as const;
