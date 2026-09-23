const warmShadow = "74, 56, 32";

export const elevationTokens = {
  none: "none",
  subtle: `0 1px 2px rgba(${warmShadow}, 0.06)`,
  card: `0 2px 10px rgba(${warmShadow}, 0.05), 0 1px 2px rgba(${warmShadow}, 0.04)`,
  floating: `0 10px 28px rgba(${warmShadow}, 0.10), 0 2px 6px rgba(${warmShadow}, 0.05)`,
  modal: `0 20px 48px rgba(${warmShadow}, 0.16), 0 4px 10px rgba(${warmShadow}, 0.06)`,
  focusRing: "0 0 0 3px rgba(143, 170, 203, 0.55)",
} as const;
