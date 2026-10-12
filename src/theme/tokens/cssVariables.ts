import { primitiveColorTokens, semanticColorTokens } from "./colors";
import { numericTokens } from "./layout";

export type CssVariableMap = Record<`--${string}`, string>;

const colorCssVarByName = new Map<string, string>(
  [...primitiveColorTokens, ...semanticColorTokens].map((token) => [
    token.name,
    token.cssVar,
  ]),
);

/**
 * Variáveis CSS do Design System, publicadas em `:root`.
 * Os nomes seguem o code syntax WEB das variáveis do Figma e os tokens
 * semânticos apontam para o token de origem, preservando os aliases.
 */
export const designSystemCssVariables: CssVariableMap = {
  ...Object.fromEntries(
    primitiveColorTokens.map((token) => [token.cssVar, token.value]),
  ),
  ...Object.fromEntries(
    semanticColorTokens.map((token) => [
      token.cssVar,
      `var(${colorCssVarByName.get(token.alias)})`,
    ]),
  ),
  ...Object.fromEntries(
    numericTokens.map((token) => [token.cssVar, `${token.value}px`]),
  ),
};
