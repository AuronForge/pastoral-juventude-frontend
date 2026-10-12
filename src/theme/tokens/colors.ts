/**
 * Cores do Design System, espelhadas das coleções "Primitives" e "Color" do
 * Figma (MVP Pastoral da Juventude). Os nomes seguem as variáveis do Figma e
 * `cssVar` segue o code syntax WEB definido em cada variável.
 *
 * Regra do Figma: componentes consomem tokens semânticos, nunca primitivos.
 * O Figma define somente o modo claro.
 */

export type ColorToken = {
  /** Nome da variável no Figma. */
  name: string;
  /** Variável CSS definida pelo code syntax WEB da variável no Figma. */
  cssVar: `--${string}`;
};

export type PrimitiveColorToken = ColorToken & { value: string };
export type SemanticColorToken = ColorToken & { alias: string };

export const primitiveColorTokens = [
  { name: "blue/600", cssVar: "--pj-color-blue-600", value: "#1f4e5f" },
  {
    name: "terracotta/600",
    cssVar: "--pj-color-terracotta-600",
    value: "#b85c38",
  },
  { name: "gold/500", cssVar: "--pj-color-gold-500", value: "#d6a84b" },
  { name: "sand/50", cssVar: "--pj-color-sand-50", value: "#f7f1e8" },
  { name: "cream/0", cssVar: "--pj-color-cream-0", value: "#fffdf9" },
  { name: "brown/900", cssVar: "--pj-color-brown-900", value: "#2e2925" },
  { name: "brown/600", cssVar: "--pj-color-brown-600", value: "#6d625a" },
  { name: "brown/300", cssVar: "--pj-color-brown-300", value: "#e4d7cb" },
  { name: "red/600", cssVar: "--pj-color-red-600", value: "#b3261e" },
  { name: "blue/700", cssVar: "--pj-color-blue-700", value: "#1b4554" },
  { name: "red/700", cssVar: "--pj-color-red-700", value: "#9e211b" },
  { name: "green/600", cssVar: "--pj-color-green-600", value: "#2e7d32" },
  { name: "amber/700", cssVar: "--pj-color-amber-700", value: "#9a6700" },
  {
    name: "brown/600-alpha12",
    cssVar: "--pj-color-brown-600-alpha12",
    value: "rgba(109, 98, 90, 0.12)",
  },
  {
    name: "green/600-alpha12",
    cssVar: "--pj-color-green-600-alpha12",
    value: "rgba(46, 125, 50, 0.12)",
  },
  {
    name: "blue/600-alpha12",
    cssVar: "--pj-color-blue-600-alpha12",
    value: "rgba(31, 78, 95, 0.12)",
  },
  {
    name: "amber/700-alpha12",
    cssVar: "--pj-color-amber-700-alpha12",
    value: "rgba(154, 103, 0, 0.12)",
  },
  {
    name: "red/600-alpha12",
    cssVar: "--pj-color-red-600-alpha12",
    value: "rgba(179, 38, 30, 0.12)",
  },
  { name: "yellow/500", cssVar: "--pj-color-yellow-500", value: "#f4b400" },
  {
    name: "yellow/500-alpha12",
    cssVar: "--pj-color-yellow-500-alpha12",
    value: "rgba(244, 180, 0, 0.12)",
  },
  { name: "amber/800", cssVar: "--pj-color-amber-800", value: "#704800" },
  { name: "blue/950", cssVar: "--blue-950", value: "#192837" },
] as const satisfies readonly PrimitiveColorToken[];

export const semanticColorTokens = [
  { name: "color/bg/canvas", cssVar: "--pj-color-bg-canvas", alias: "sand/50" },
  {
    name: "color/bg/surface",
    cssVar: "--pj-color-bg-surface",
    alias: "cream/0",
  },
  { name: "color/bg/access", cssVar: "--color-bg-access", alias: "blue/950" },
  {
    name: "color/text/primary",
    cssVar: "--pj-color-text-primary",
    alias: "brown/900",
  },
  {
    name: "color/text/secondary",
    cssVar: "--pj-color-text-secondary",
    alias: "brown/600",
  },
  {
    name: "color/text/inverse",
    cssVar: "--pj-color-text-inverse",
    alias: "cream/0",
  },
  {
    name: "color/text/disabled",
    cssVar: "--pj-color-text-disabled",
    alias: "brown/600",
  },
  {
    name: "color/text/danger",
    cssVar: "--pj-color-text-danger",
    alias: "red/600",
  },
  {
    name: "color/border/default",
    cssVar: "--pj-color-border-default",
    alias: "brown/300",
  },
  {
    name: "color/border/focus",
    cssVar: "--pj-color-border-focus",
    alias: "blue/600",
  },
  {
    name: "color/border/danger",
    cssVar: "--pj-color-border-danger",
    alias: "red/600",
  },
  {
    name: "color/action/primary",
    cssVar: "--pj-color-action-primary",
    alias: "blue/600",
  },
  {
    name: "color/action/primary-hover",
    cssVar: "--pj-color-action-primary-hover",
    alias: "blue/700",
  },
  {
    name: "color/action/accent",
    cssVar: "--pj-color-action-accent",
    alias: "terracotta/600",
  },
  {
    name: "color/action/danger",
    cssVar: "--pj-color-action-danger",
    alias: "red/600",
  },
  {
    name: "color/action/danger-hover",
    cssVar: "--pj-color-action-danger-hover",
    alias: "red/700",
  },
  {
    name: "color/action/disabled",
    cssVar: "--pj-color-action-disabled",
    alias: "brown/300",
  },
  {
    name: "color/content/highlight",
    cssVar: "--pj-color-content-highlight",
    alias: "gold/500",
  },
  {
    name: "color/feedback/success",
    cssVar: "--pj-color-feedback-success",
    alias: "green/600",
  },
  {
    name: "color/feedback/information",
    cssVar: "--pj-color-feedback-information",
    alias: "blue/600",
  },
  {
    name: "color/feedback/attention",
    cssVar: "--pj-color-feedback-attention",
    alias: "amber/800",
  },
  {
    name: "color/feedback/error",
    cssVar: "--pj-color-feedback-error",
    alias: "red/600",
  },
  {
    name: "color/feedback/neutral",
    cssVar: "--pj-color-feedback-neutral",
    alias: "brown/600",
  },
  {
    name: "color/feedback/neutral-soft",
    cssVar: "--pj-color-feedback-neutral-soft",
    alias: "brown/600-alpha12",
  },
  {
    name: "color/feedback/success-soft",
    cssVar: "--pj-color-feedback-success-soft",
    alias: "green/600-alpha12",
  },
  {
    name: "color/feedback/information-soft",
    cssVar: "--pj-color-feedback-information-soft",
    alias: "blue/600-alpha12",
  },
  {
    name: "color/feedback/attention-soft",
    cssVar: "--pj-color-feedback-attention-soft",
    alias: "yellow/500-alpha12",
  },
  {
    name: "color/feedback/error-soft",
    cssVar: "--pj-color-feedback-error-soft",
    alias: "red/600-alpha12",
  },
  {
    name: "color/feedback/attention-emphasis",
    cssVar: "--pj-color-feedback-attention-emphasis",
    alias: "yellow/500",
  },
  {
    name: "color/avatar/blue-bg",
    cssVar: "--pj-color-avatar-blue-bg",
    alias: "blue/600",
  },
  {
    name: "color/avatar/blue-fg",
    cssVar: "--pj-color-avatar-blue-fg",
    alias: "color/text/inverse",
  },
  {
    name: "color/avatar/terracotta-bg",
    cssVar: "--pj-color-avatar-terracotta-bg",
    alias: "terracotta/600",
  },
  {
    name: "color/avatar/terracotta-fg",
    cssVar: "--pj-color-avatar-terracotta-fg",
    alias: "color/text/inverse",
  },
  {
    name: "color/avatar/gold-bg",
    cssVar: "--pj-color-avatar-gold-bg",
    alias: "gold/500",
  },
  {
    name: "color/avatar/gold-fg",
    cssVar: "--pj-color-avatar-gold-fg",
    alias: "brown/900",
  },
  {
    name: "color/avatar/neutral-bg",
    cssVar: "--pj-color-avatar-neutral-bg",
    alias: "brown/600",
  },
  {
    name: "color/avatar/neutral-fg",
    cssVar: "--pj-color-avatar-neutral-fg",
    alias: "color/text/inverse",
  },
  {
    name: "color/tooltip/bg",
    cssVar: "--color-tooltip-bg",
    alias: "brown/900",
  },
  {
    name: "color/tooltip/text",
    cssVar: "--color-tooltip-text",
    alias: "color/text/inverse",
  },
] as const satisfies readonly SemanticColorToken[];

type PrimitiveName = (typeof primitiveColorTokens)[number]["name"];
type SemanticName = (typeof semanticColorTokens)[number]["name"];

const primitiveByName = new Map<string, string>(
  primitiveColorTokens.map((token) => [token.name, token.value]),
);
const semanticByName = new Map<string, string>(
  semanticColorTokens.map((token) => [token.name, token.alias]),
);

/** Resolve o valor final de uma variável de cor seguindo os aliases do Figma. */
export function resolveColor(name: PrimitiveName | SemanticName): string {
  let current: string = name;
  for (let depth = 0; depth < 5; depth += 1) {
    const primitive = primitiveByName.get(current);
    if (primitive) return primitive;
    const alias = semanticByName.get(current);
    if (!alias) break;
    current = alias;
  }
  throw new Error(`Token de cor sem valor resolvido: ${name}`);
}

/** Referência `var(...)` a um token semântico de cor. */
export function colorVar(name: SemanticName): string {
  const token = semanticColorTokens.find((item) => item.name === name);
  if (!token) throw new Error(`Token de cor inexistente: ${name}`);
  return `var(${token.cssVar})`;
}
