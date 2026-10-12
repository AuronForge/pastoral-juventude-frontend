/**
 * Tokens numéricos espelhados das coleções "Spacing", "Geometry", "Icon" e
 * "Layout" do Figma. `cssVar` segue o code syntax WEB de cada variável.
 */

export type NumericToken = {
  /** Nome da variável no Figma. */
  name: string;
  /** Variável CSS definida pelo code syntax WEB da variável no Figma. */
  cssVar: `--${string}`;
  /** Valor em pixels. */
  value: number;
};

/** Coleção Spacing: escala principal (4 a 64 px) e extensões estruturais. */
export const spacingTokens = [
  { name: "space/1", cssVar: "--pj-space-1", value: 4 },
  { name: "space/2", cssVar: "--pj-space-2", value: 8 },
  { name: "space/3", cssVar: "--pj-space-3", value: 12 },
  { name: "space/4", cssVar: "--pj-space-4", value: 16 },
  { name: "space/5", cssVar: "--pj-space-5", value: 24 },
  { name: "space/6", cssVar: "--pj-space-6", value: 32 },
  { name: "space/8", cssVar: "--pj-space-8", value: 48 },
  { name: "space/10", cssVar: "--pj-space-10", value: 64 },
  { name: "space/extended/20px", cssVar: "--space-extended-20px", value: 20 },
  { name: "space/extended/36px", cssVar: "--space-extended-36px", value: 36 },
  { name: "space/extended/40px", cssVar: "--space-extended-40px", value: 40 },
  { name: "space/extended/44px", cssVar: "--space-extended-44px", value: 44 },
  { name: "space/extended/52px", cssVar: "--space-extended-52px", value: 52 },
] as const satisfies readonly NumericToken[];

/** Coleção Geometry: raios, larguras de borda e ajustes finos de alinhamento. */
export const geometryTokens = [
  { name: "radius/none", cssVar: "--pj-radius-none", value: 0 },
  { name: "radius/sm", cssVar: "--pj-radius-sm", value: 4 },
  { name: "radius/md", cssVar: "--pj-radius-md", value: 8 },
  { name: "radius/lg", cssVar: "--pj-radius-lg", value: 12 },
  { name: "radius/xl", cssVar: "--pj-radius-xl", value: 16 },
  { name: "radius/full", cssVar: "--pj-radius-full", value: 999 },
  {
    name: "border/width/default",
    cssVar: "--pj-border-width-default",
    value: 1,
  },
  {
    name: "border/width/emphasis",
    cssVar: "--pj-border-width-emphasis",
    value: 2,
  },
  { name: "layout/fine/2px", cssVar: "--layout-fine-2px", value: 2 },
  { name: "layout/fine/3px", cssVar: "--layout-fine-3px", value: 3 },
  { name: "layout/fine/5px", cssVar: "--layout-fine-5px", value: 5 },
  { name: "layout/fine/6px", cssVar: "--layout-fine-6px", value: 6 },
  { name: "layout/fine/7px", cssVar: "--layout-fine-7px", value: 7 },
  { name: "layout/fine/10px", cssVar: "--layout-fine-10px", value: 10 },
  { name: "layout/fine/14px", cssVar: "--layout-fine-14px", value: 14 },
  { name: "layout/fine/15px", cssVar: "--layout-fine-15px", value: 15 },
  { name: "layout/fine/18px", cssVar: "--layout-fine-18px", value: 18 },
  { name: "layout/fine/22px", cssVar: "--layout-fine-22px", value: 22 },
] as const satisfies readonly NumericToken[];

/** Coleção Icon: tamanhos dos ícones Material Symbols. */
export const iconTokens = [
  { name: "icon/size/sm", cssVar: "--pj-icon-size-sm", value: 16 },
  { name: "icon/size/md", cssVar: "--pj-icon-size-md", value: 20 },
  { name: "icon/size/lg", cssVar: "--pj-icon-size-lg", value: 24 },
  { name: "icon/size/xl", cssVar: "--pj-icon-size-xl", value: 32 },
] as const satisfies readonly NumericToken[];

/** Coleção Layout: medidas estruturais do App Shell, Header e Avatar. */
export const layoutTokens = [
  {
    name: "layout/sidebar/expanded",
    cssVar: "--pj-layout-sidebar-expanded",
    value: 280,
  },
  {
    name: "layout/sidebar/collapsed",
    cssVar: "--pj-layout-sidebar-collapsed",
    value: 72,
  },
  {
    name: "layout/header/desktop",
    cssVar: "--pj-layout-header-desktop",
    value: 64,
  },
  {
    name: "layout/header/compact",
    cssVar: "--pj-layout-header-compact",
    value: 56,
  },
  {
    name: "layout/bottom-nav/height",
    cssVar: "--pj-layout-bottom-nav-height",
    value: 64,
  },
  { name: "avatar/size/sm", cssVar: "--pj-avatar-size-sm", value: 32 },
  { name: "avatar/size/md", cssVar: "--pj-avatar-size-md", value: 40 },
  { name: "avatar/size/lg", cssVar: "--pj-avatar-size-lg", value: 48 },
] as const satisfies readonly NumericToken[];

/**
 * PENDÊNCIA — valores sem variável no Figma, mantidos do código anterior até
 * serem definidos no Figma: breakpoints, grid e largura máxima de conteúdo.
 * Não usar em novos componentes.
 */
export const pendingLayoutTokens = {
  breakpoints: { mobile: 360, tablet: 768, desktop: 1200, wide: 1440 },
  grid: {
    mobile: { columns: 1, gutter: 16, margin: 16 },
    tablet: { columns: 8, gutter: 20, margin: 24 },
    desktop: { columns: 12, gutter: 24, margin: 32 },
  },
  contentMax: 1200,
} as const;

export const numericTokens = [
  ...spacingTokens,
  ...geometryTokens,
  ...iconTokens,
  ...layoutTokens,
] as const;

type NumericTokenName = (typeof numericTokens)[number]["name"];

/** Referência `var(...)` a um token numérico pelo nome da variável no Figma. */
export function tokenVar(name: NumericTokenName): string {
  const token = numericTokens.find((item) => item.name === name);
  if (!token) throw new Error(`Token inexistente: ${name}`);
  return `var(${token.cssVar})`;
}

/** Valor em pixels de um token numérico pelo nome da variável no Figma. */
export function tokenValue(name: NumericTokenName): number {
  const token = numericTokens.find((item) => item.name === name);
  if (!token) throw new Error(`Token inexistente: ${name}`);
  return token.value;
}
