import type { HTMLAttributes } from "react";

/** Tamanhos da coleção Icon do Figma: 16, 20, 24 e 32 px. */
export type IconSize = "sm" | "md" | "lg" | "xl";

type IconCommonProps = Omit<
  HTMLAttributes<HTMLSpanElement>,
  "children" | "aria-hidden" | "aria-label" | "role"
> & {
  /** Nome do símbolo no Material Symbols (ex.: "home", "calendar_month"). */
  name: string;
  /** Tamanho do ícone; padrão 24 px, o tamanho padrão da interface. */
  size?: IconSize;
};

type DecorativeIconProps = IconCommonProps & {
  /** Nome acessível. Sem ele, o ícone é decorativo e sai da árvore acessível. */
  label?: undefined;
};

type InformativeIconProps = IconCommonProps & {
  label: string;
};

export type IconProps = DecorativeIconProps | InformativeIconProps;
