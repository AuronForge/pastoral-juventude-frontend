import type { ImgHTMLAttributes } from "react";

export type BrandLockupTone = "on-light" | "on-dark";
export type BrandLockupSize = "compact" | "default";

type BrandLockupCommonProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "alt" | "height" | "src" | "width"
> & {
  /** Fundo sobre o qual a assinatura será exibida. */
  tone?: BrandLockupTone;
  /** Compacto respeita o tamanho mínimo oficial; padrão reproduz a marca principal. */
  size?: BrandLockupSize;
};

type InformativeBrandLockupProps = BrandLockupCommonProps & {
  decorative?: false;
  /** Nome acessível da marca. */
  label?: string;
};

type DecorativeBrandLockupProps = BrandLockupCommonProps & {
  decorative: true;
  label?: never;
};

export type BrandLockupProps =
  InformativeBrandLockupProps | DecorativeBrandLockupProps;
