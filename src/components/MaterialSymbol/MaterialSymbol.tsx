import { forwardRef } from "react";
import type {
  MaterialSymbolProps,
  MaterialSymbolSize,
} from "./MaterialSymbol.types";
import { symbolAssets } from "./symbolAssets";

const sizeValues: Record<MaterialSymbolSize, number> = {
  small: 16,
  medium: 20,
  large: 24,
  xlarge: 32,
};

/** Material Symbols Outlined com FILL 0, weight 400 e grade 0. */
export const MaterialSymbol = forwardRef<HTMLSpanElement, MaterialSymbolProps>(
  function MaterialSymbol(
    { className, label, name, size = "large", style, ...props },
    ref,
  ) {
    const pixels = typeof size === "number" ? size : sizeValues[size];

    return (
      <span
        {...props}
        ref={ref}
        aria-hidden={label ? undefined : true}
        aria-label={label}
        className={[
          "material-symbols-outlined",
          "MuiSvgIcon-root",
          typeof size === "number" ? undefined : `material-symbol-size-${size}`,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        role={label ? "img" : undefined}
        data-fill="0"
        data-grade="0"
        data-optical-size={pixels}
        data-weight="400"
        style={{
          display: "inline-flex",
          flex: "0 0 auto",
          alignItems: "center",
          justifyContent: "center",
          width: typeof size === "number" ? pixels : undefined,
          height: typeof size === "number" ? pixels : undefined,
          backgroundColor: "currentColor",
          maskImage: `url("${symbolAssets[name]}")`,
          maskPosition: "center",
          maskRepeat: "no-repeat",
          maskSize: "contain",
          WebkitMaskImage: `url("${symbolAssets[name]}")`,
          WebkitMaskPosition: "center",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskSize: "contain",
          userSelect: "none",
          ...style,
        }}
      />
    );
  },
);
