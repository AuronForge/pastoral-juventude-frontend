import { CircularProgress, circularProgressClasses } from "@mui/material";
import { keyframes, styled } from "@mui/material/styles";
import { forwardRef } from "react";
import { sizeTokens } from "../../theme/tokens";
import type {
  LoadingIndicatorProps,
  LoadingIndicatorSize,
} from "./LoadingIndicator.types";

const reducedMotionPulse = keyframes`
  0%, 100% {
    opacity: 0.45;
  }

  50% {
    opacity: 1;
  }
`;

const StyledCircularProgress = styled(CircularProgress)({
  animationDuration: "900ms",
  [`& .${circularProgressClasses.circle}`]: {
    animationDuration: "900ms",
  },
  "@media (prefers-reduced-motion: reduce)": {
    animation: `${reducedMotionPulse} 1400ms ease-in-out infinite`,
    [`& .${circularProgressClasses.circle}`]: {
      animation: "none",
    },
  },
});

const sizeByName: Record<LoadingIndicatorSize, number> = {
  small: sizeTokens.iconSm,
  medium: sizeTokens.iconMd,
  large: sizeTokens.iconLg,
};

export const LoadingIndicator = forwardRef<
  HTMLSpanElement,
  LoadingIndicatorProps
>(function LoadingIndicator(
  { decorative = false, label, size = "medium", tone = "default", ...props },
  ref,
) {
  return (
    <StyledCircularProgress
      {...props}
      ref={ref}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : label}
      role={decorative ? undefined : "progressbar"}
      color={tone === "on-solid" ? "inherit" : "primary"}
      size={sizeByName[size]}
      thickness={4.4}
      variant="indeterminate"
    />
  );
});
