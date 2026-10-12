import type { HTMLAttributes } from "react";

/** Tamanhos do Figma: 32 (listas compactas), 40 (padrão) e 48 px (destaque). */
export type AvatarSize = 32 | 40 | 48;

/** Cores do Figma, na ordem fixa usada pelo módulo 4. */
export type AvatarColor = "blue" | "terracotta" | "gold" | "neutral";

type AvatarBaseProps = Omit<
  HTMLAttributes<HTMLSpanElement>,
  "children" | "aria-label" | "aria-hidden" | "role" | "color"
> & {
  /** Iniciais configuradas manualmente (1 a 2 caracteres). */
  initials: string;
  /** Identificador imutável da pessoa; define a cor de forma estável. */
  personId: string;
  size?: AvatarSize;
};

type DecorativeAvatarProps = {
  /** Sem nome acessível: decorativo, quando o nome está próximo. */
  label?: undefined;
};

type InformativeAvatarProps = {
  /** Nome completo da pessoa, quando o avatar está isolado. */
  label: string;
};

export type AvatarProps = AvatarBaseProps &
  (DecorativeAvatarProps | InformativeAvatarProps);
