import { styled } from "@mui/material";
import { forwardRef } from "react";
import signatureOnDark from "../../assets/brand/pastorapp-on-dark.svg";
import signatureOnLight from "../../assets/brand/pastorapp-on-light.svg";
import symbol from "../../assets/brand/pastorapp-symbol.svg";
import type {
  BrandLockupFormat,
  BrandLockupProps,
  BrandLockupSize,
} from "./BrandLockup.types";

/**
 * Geometria do componente Brand / Logo do Figma, incluindo a área de
 * respiro: Assinatura 240 × 72 px (arte 200 × 46 px) e Símbolo 72 × 72 px
 * (arte 48 × 48 px). O compacto é a instância de 144 × 43 px do App Shell.
 */
const geometry = {
  signature: {
    default: { width: 240, height: 72, padding: "13px 20px" },
    compact: { width: 144, height: 43, padding: "8px 12px" },
  },
  symbol: {
    default: { width: 72, height: 72, padding: "12px" },
    compact: { width: 72, height: 72, padding: "12px" },
  },
} as const;

type OwnerState = {
  brandFormat: BrandLockupFormat;
  brandSize: BrandLockupSize;
};

const StyledBrandLockup = styled("img", {
  shouldForwardProp: (prop) => prop !== "brandFormat" && prop !== "brandSize",
})<OwnerState>(({ brandFormat, brandSize }) => ({
  display: "block",
  boxSizing: "border-box",
  objectFit: "contain",
  ...geometry[brandFormat][brandSize],
}));

/** Brand / Logo do Figma: Assinatura ou Símbolo, para fundo claro ou escuro. */
export const BrandLockup = forwardRef<HTMLImageElement, BrandLockupProps>(
  function BrandLockup(
    {
      decorative = false,
      format = "signature",
      label = "PastorApp",
      size = "default",
      tone = "on-light",
      ...props
    },
    ref,
  ) {
    const source =
      format === "symbol"
        ? symbol
        : tone === "on-dark"
          ? signatureOnDark
          : signatureOnLight;

    return (
      <StyledBrandLockup
        {...props}
        ref={ref}
        alt={decorative ? "" : label}
        aria-hidden={decorative || undefined}
        brandFormat={format}
        brandSize={size}
        src={source}
      />
    );
  },
);
