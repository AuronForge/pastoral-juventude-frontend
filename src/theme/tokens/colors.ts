export const primitiveColors = {
  blue: {
    600: "#1f4e5f",
    700: "#1b4554",
    950: "#192837",
    "600-alpha12": "rgba(31, 78, 95, 0.12)",
  },
  terracotta: {
    600: "#b85c38",
    "600-alpha12": "rgba(184, 92, 56, 0.12)",
  },
  gold: { 500: "#d6a84b" },
  sand: { 50: "#f7f1e8" },
  cream: { 0: "#fffdf9" },
  brown: {
    300: "#e4d7cb",
    600: "#6d625a",
    900: "#2e2925",
    "600-alpha12": "rgba(109, 98, 90, 0.12)",
  },
  green: {
    600: "#2e7d32",
    "600-alpha12": "rgba(46, 125, 50, 0.12)",
  },
  yellow: {
    500: "#f4b400",
    "500-alpha12": "rgba(244, 180, 0, 0.12)",
  },
  amber: { 700: "#9a6700", 800: "#704800" },
  red: {
    600: "#b3261e",
    700: "#9e211b",
    "600-alpha12": "rgba(179, 38, 30, 0.12)",
  },
} as const;

const {
  amber,
  blue,
  brown,
  cream,
  gold,
  green,
  red,
  sand,
  terracotta,
  yellow,
} = primitiveColors;

/**
 * Aliases consumidos pela aplicação. O modo claro corresponde às variáveis
 * publicadas no Figma. O modo escuro é uma extensão do produto e usa a mesma
 * família cromática, pois o arquivo de design possui somente o modo Light.
 */
export const semanticColors = {
  light: {
    bg: {
      canvas: sand[50],
      surface: cream[0],
      surfaceAlt: sand[50],
      surfaceSunken: brown[300],
      inverse: blue[950],
      overlay: brown[900],
    },
    border: {
      subtle: brown["600-alpha12"],
      default: brown[300],
      strong: brown[600],
      inverse: cream[0],
      focus: blue[600],
    },
    text: {
      primary: brown[900],
      secondary: brown[600],
      placeholder: brown[600],
      disabled: brown[600],
      inverse: cream[0],
      inverseSecondary: brown[300],
      link: blue[600],
      onPrimary: cream[0],
    },
    primary: {
      solid: blue[600],
      solidHover: blue[700],
      solidPressed: blue[950],
      subtle: blue["600-alpha12"],
      border: blue["600-alpha12"],
      text: blue[600],
    },
    accent: {
      subtle: terracotta["600-alpha12"],
      solid: terracotta[600],
      border: terracotta["600-alpha12"],
      text: terracotta[600],
    },
    status: {
      success: {
        subtle: green["600-alpha12"],
        solid: green[600],
        border: green["600-alpha12"],
        text: green[600],
        onSolid: cream[0],
      },
      warning: {
        subtle: yellow["500-alpha12"],
        solid: yellow[500],
        border: yellow["500-alpha12"],
        text: amber[800],
        onSolid: brown[900],
      },
      danger: {
        subtle: red["600-alpha12"],
        solid: red[600],
        solidHover: red[700],
        border: red["600-alpha12"],
        text: red[600],
        onSolid: cream[0],
      },
      neutral: {
        subtle: brown["600-alpha12"],
        solid: brown[600],
        border: brown["600-alpha12"],
        text: brown[600],
        onSolid: cream[0],
      },
      info: {
        subtle: blue["600-alpha12"],
        solid: blue[600],
        border: blue["600-alpha12"],
        text: blue[600],
        onSolid: cream[0],
      },
    },
    sidebar: {
      bg: blue[950],
      itemActiveBg: blue[600],
      itemHoverBg: blue[700],
      border: blue[700],
      text: brown[300],
      textActive: cream[0],
      textMuted: brown[300],
    },
    skeleton: { base: brown[300] },
  },
  dark: {
    bg: {
      canvas: blue[950],
      surface: brown[900],
      surfaceAlt: blue[700],
      surfaceSunken: blue[950],
      inverse: cream[0],
      overlay: blue[950],
    },
    border: {
      subtle: brown["600-alpha12"],
      default: brown[600],
      strong: brown[300],
      inverse: brown[300],
      focus: gold[500],
    },
    text: {
      primary: cream[0],
      secondary: brown[300],
      placeholder: brown[300],
      disabled: brown[300],
      inverse: brown[900],
      inverseSecondary: brown[600],
      link: gold[500],
      onPrimary: cream[0],
    },
    primary: {
      solid: blue[600],
      solidHover: blue[700],
      solidPressed: blue[950],
      subtle: blue["600-alpha12"],
      border: blue[700],
      text: gold[500],
    },
    accent: {
      subtle: terracotta["600-alpha12"],
      solid: terracotta[600],
      border: terracotta[600],
      text: gold[500],
    },
    status: {
      success: {
        subtle: green["600-alpha12"],
        solid: green[600],
        border: green[600],
        text: cream[0],
        onSolid: cream[0],
      },
      warning: {
        subtle: yellow["500-alpha12"],
        solid: yellow[500],
        border: amber[700],
        text: gold[500],
        onSolid: brown[900],
      },
      danger: {
        subtle: red["600-alpha12"],
        solid: red[600],
        solidHover: red[700],
        border: red[600],
        text: cream[0],
        onSolid: cream[0],
      },
      neutral: {
        subtle: brown["600-alpha12"],
        solid: brown[600],
        border: brown[600],
        text: cream[0],
        onSolid: cream[0],
      },
      info: {
        subtle: blue["600-alpha12"],
        solid: blue[600],
        border: blue[700],
        text: cream[0],
        onSolid: cream[0],
      },
    },
    sidebar: {
      bg: blue[950],
      itemActiveBg: blue[600],
      itemHoverBg: blue[700],
      border: blue[700],
      text: brown[300],
      textActive: cream[0],
      textMuted: brown[300],
    },
    skeleton: { base: brown[600] },
  },
} as const;

export type ColorSchemeMode = keyof typeof semanticColors;
export type SemanticColorScheme = (typeof semanticColors)[ColorSchemeMode];
