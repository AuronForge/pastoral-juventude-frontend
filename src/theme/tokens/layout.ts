export const spacingTokens = {
  0: 0,
  "2xs": 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
  "4xl": 40,
  "5xl": 48,
  "6xl": 64,
  "extended-36": 36,
  "extended-44": 44,
  "extended-52": 52,
} as const;

export const radiusTokens = {
  none: 0,
  xs: 4,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  "2xl": 16,
  pill: 999,
  full: 999,
} as const;

export const sizeTokens = {
  sidebarExpanded: 260,
  sidebarCollapsed: 72,
  topbar: 64,
  bottomNav: 64,
  controlSm: 44,
  controlMd: 44,
  controlLg: 48,
  touchMin: 44,
  iconSm: 16,
  iconMd: 20,
  iconLg: 24,
  iconXl: 32,
  avatarSm: 28,
  avatarMd: 36,
  avatarLg: 48,
  contentMax: 1200,
} as const;

export const borderTokens = { thin: 1, thick: 2 } as const;

export const breakpointTokens = {
  mobile: 360,
  tablet: 768,
  desktop: 1200,
  wide: 1440,
} as const;

export const screenTokens = {
  mobile: 390,
  tablet: 768,
  desktop: 1280,
} as const;

export const gridTokens = {
  mobile: { columns: 1, gutter: 16, margin: 16 },
  tablet: { columns: 8, gutter: 20, margin: 24 },
  desktop: { columns: 12, gutter: 24, margin: 32 },
} as const;
