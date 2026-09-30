import { styled } from "@mui/material";
import { forwardRef } from "react";
import brandOnDark from "../../assets/brand/pastorapp-on-dark.svg";
import brandOnLight from "../../assets/brand/pastorapp-on-light.svg";
import type { BrandLockupProps, BrandLockupSize } from "./BrandLockup.types";

type BrandLockupStyleOwnerState = { brandSize: BrandLockupSize };

const StyledBrandLockup = styled("img", {
  shouldForwardProp: (prop) => prop !== "brandSize",
})<BrandLockupStyleOwnerState>(({ brandSize }) => ({
  display: "block",
  width: "auto",
  maxWidth: "100%",
  height: brandSize === "compact" ? "36px" : "72px",
}));

export const BrandLockup = forwardRef<HTMLImageElement, BrandLockupProps>(
  function BrandLockup(
    {
      decorative = false,
      label = "PastorApp",
      size = "default",
      tone = "on-light",
      ...props
    },
    ref,
  ) {
    const source = tone === "on-dark" ? brandOnDark : brandOnLight;

    return (
      <StyledBrandLockup
        {...props}
        ref={ref}
        alt={decorative ? "" : label}
        aria-hidden={decorative || undefined}
        brandSize={size}
        src={source}
      />
    );
  },
);
