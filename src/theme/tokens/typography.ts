export const fontFamilyTokens = {
  display: '"Roboto", Arial, sans-serif',
  body: '"Roboto", Arial, sans-serif',
} as const;

export const fontWeightTokens = {
  regular: 400,
  medium: 500,
  semibold: 500,
  bold: 700,
} as const;

export const fontSizeTokens = {
  xs: 11,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  "2xl": 20,
  "3xl": 24,
  "4xl": 28,
  "5xl": 40,
  "6xl": 40,
} as const;

export const lineHeightTokens = {
  xs: 16,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 24,
  "2xl": 28,
  "3xl": 32,
  "4xl": 36,
  "5xl": 48,
  "6xl": 48,
} as const;

export const letterSpacingTokens = {
  tight: 0,
  normal: 0,
  wide: 0,
  caps: 0,
} as const;

const roboto = fontFamilyTokens.body;

export const typographyTokens = {
  displayXl: {
    fontFamily: roboto,
    fontSize: 40,
    lineHeight: "48px",
    fontWeight: 700,
    letterSpacing: 0,
  },
  displayLarge: {
    fontFamily: roboto,
    fontSize: 40,
    lineHeight: "48px",
    fontWeight: 700,
    letterSpacing: 0,
  },
  displayMedium: {
    fontFamily: roboto,
    fontSize: 28,
    lineHeight: "36px",
    fontWeight: 700,
    letterSpacing: 0,
  },
  displaySmall: {
    fontFamily: roboto,
    fontSize: 24,
    lineHeight: "32px",
    fontWeight: 700,
    letterSpacing: 0,
  },
  headingLarge: {
    fontFamily: roboto,
    fontSize: 28,
    lineHeight: "36px",
    fontWeight: 700,
    letterSpacing: 0,
  },
  headingMedium: {
    fontFamily: roboto,
    fontSize: 24,
    lineHeight: "32px",
    fontWeight: 700,
    letterSpacing: 0,
  },
  headingSmall: {
    fontFamily: roboto,
    fontSize: 20,
    lineHeight: "28px",
    fontWeight: 500,
    letterSpacing: 0,
  },
  title: {
    fontFamily: roboto,
    fontSize: 18,
    lineHeight: "24px",
    fontWeight: 500,
    letterSpacing: 0,
  },
  bodyLarge: {
    fontFamily: roboto,
    fontSize: 16,
    lineHeight: "24px",
    fontWeight: 400,
    letterSpacing: 0,
  },
  bodyMedium: {
    fontFamily: roboto,
    fontSize: 14,
    lineHeight: "20px",
    fontWeight: 400,
    letterSpacing: 0,
  },
  bodyMediumStrong: {
    fontFamily: roboto,
    fontSize: 14,
    lineHeight: "20px",
    fontWeight: 500,
    letterSpacing: 0,
  },
  bodySmall: {
    fontFamily: roboto,
    fontSize: 12,
    lineHeight: "16px",
    fontWeight: 400,
    letterSpacing: 0,
  },
  bodySmallStrong: {
    fontFamily: roboto,
    fontSize: 12,
    lineHeight: "16px",
    fontWeight: 500,
    letterSpacing: 0,
  },
  labelLarge: {
    fontFamily: roboto,
    fontSize: 14,
    lineHeight: "20px",
    fontWeight: 500,
    letterSpacing: 0,
  },
  labelMedium: {
    fontFamily: roboto,
    fontSize: 12,
    lineHeight: "16px",
    fontWeight: 500,
    letterSpacing: 0,
  },
  labelSmall: {
    fontFamily: roboto,
    fontSize: 11,
    lineHeight: "16px",
    fontWeight: 500,
    letterSpacing: 0,
  },
  caption: {
    fontFamily: roboto,
    fontSize: 12,
    lineHeight: "16px",
    fontWeight: 400,
    letterSpacing: 0,
  },
  overline: {
    fontFamily: roboto,
    fontSize: 11,
    lineHeight: "16px",
    fontWeight: 500,
    letterSpacing: 0,
    textTransform: "uppercase" as const,
  },
  metricDisplay: {
    fontFamily: roboto,
    fontSize: 40,
    lineHeight: "48px",
    fontWeight: 700,
    letterSpacing: 0,
  },
} as const;
