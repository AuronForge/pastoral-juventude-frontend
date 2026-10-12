import type { ImgHTMLAttributes } from "react";

/** Propriedade Fundo do Brand / Logo do Figma. */
export type BrandLockupTone = "on-light" | "on-dark";

/** Propriedade Formato do Figma: Assinatura (horizontal) ou Símbolo. */
export type BrandLockupFormat = "signature" | "symbol";

/**
 * Tamanhos usados no Figma: padrão (240 × 72 px na Assinatura, 72 × 72 px no
 * Símbolo) e compacto (144 × 43 px, Assinatura no App Shell).
 */
export type BrandLockupSize = "compact" | "default";

type BrandLockupCommonProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "alt" | "height" | "src" | "width"
> & {
  /** Fundo sobre o qual a marca será exibida. */
  tone?: BrandLockupTone;
};

type SignatureProps = {
  format?: "signature";
  size?: BrandLockupSize;
};

type SymbolProps = {
  format: "symbol";
  size?: "default";
};

type InformativeProps = {
  decorative?: false;
  /** Nome acessível da marca. */
  label?: string;
};

type DecorativeProps = {
  decorative: true;
  label?: never;
};

export type BrandLockupProps = BrandLockupCommonProps &
  (SignatureProps | SymbolProps) &
  (InformativeProps | DecorativeProps);
