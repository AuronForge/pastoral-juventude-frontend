/**
 * Estilos tipográficos espelhados dos 11 text styles do Figma.
 * Roboto é a família oficial; tamanhos avulsos não devem ser introduzidos.
 */

export const fontFamily = '"Roboto", sans-serif';

export type TypographyToken = {
  /** Nome do text style no Figma. */
  name: string;
  fontFamily: string;
  fontSize: number;
  lineHeight: string;
  fontWeight: 400 | 500 | 700;
  letterSpacing: number;
};

function style(
  name: string,
  fontSize: number,
  lineHeight: number,
  fontWeight: TypographyToken["fontWeight"],
): TypographyToken {
  return {
    name,
    fontFamily,
    fontSize,
    lineHeight: `${lineHeight}px`,
    fontWeight,
    letterSpacing: 0,
  };
}

export const typographyTokens = {
  display: style("Typography/Display", 40, 48, 700),
  headingLarge: style("Typography/Heading/Large", 28, 36, 700),
  headingMedium: style("Typography/Heading/Medium", 24, 32, 700),
  headingSmall: style("Typography/Heading/Small", 20, 28, 500),
  title: style("Typography/Title", 18, 24, 500),
  bodyLarge: style("Typography/Body/Large", 16, 24, 400),
  bodyMedium: style("Typography/Body/Medium", 14, 20, 400),
  bodySmall: style("Typography/Body/Small", 12, 16, 400),
  labelLarge: style("Typography/Label/Large", 14, 20, 500),
  labelMedium: style("Typography/Label/Medium", 12, 16, 500),
  labelSmall: style("Typography/Label/Small", 11, 16, 500),
} as const;

export type TypographyStyleName = keyof typeof typographyTokens;

/** Propriedades CSS de um estilo, sem o nome do Figma. */
export function typographyStyle(name: TypographyStyleName) {
  const token = typographyTokens[name];
  return {
    fontFamily: token.fontFamily,
    fontSize: token.fontSize,
    lineHeight: token.lineHeight,
    fontWeight: token.fontWeight,
    letterSpacing: token.letterSpacing,
  };
}
