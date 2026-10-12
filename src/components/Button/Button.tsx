import { Button as MuiButton, styled } from "@mui/material";
import { keyframes } from "@mui/material/styles";
import { forwardRef } from "react";
import type { ButtonProps, ButtonSize, ButtonVariant } from "./Button.types";

type ButtonStyleOwnerState = {
  buttonLoading: boolean;
  buttonSize: ButtonSize;
  buttonVariant: ButtonVariant;
};

const loadingDotPulse = keyframes`
  0%, 80%, 100% {
    opacity: 0.4;
    transform: scale(0.8);
  }

  40% {
    opacity: 1;
    transform: scale(1);
  }
`;

const LoadingDots = styled("span")({
  alignItems: "center",
  display: "inline-flex",
  gap: "3px",
  height: "6px",
  justifyContent: "center",
  width: "18px",
  "& > span": {
    animation: `${loadingDotPulse} 900ms ease-in-out infinite`,
    backgroundColor: "currentColor",
    borderRadius: "var(--radius-full)",
    display: "block",
    height: "4px",
    width: "4px",
  },
  "& > span:nth-of-type(2)": { animationDelay: "120ms" },
  "& > span:nth-of-type(3)": { animationDelay: "240ms" },
  "@media (prefers-reduced-motion: reduce)": {
    "& > span": {
      animation: "none",
      opacity: 1,
      transform: "none",
    },
  },
});

const VisuallyHidden = styled("span")({
  border: 0,
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: "1px",
  margin: "-1px",
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  width: "1px",
});

const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) =>
    prop !== "buttonLoading" &&
    prop !== "buttonSize" &&
    prop !== "buttonVariant",
})<ButtonStyleOwnerState>(({ buttonLoading, buttonSize, buttonVariant }) => {
  const size =
    buttonSize === "small"
      ? {
          minHeight: "var(--size-touch-min)",
          paddingInline: "var(--spacing-md)",
          gap: "var(--spacing-xs)",
          fontSize: "var(--font-size-sm)",
          lineHeight: "var(--line-height-sm)",
          iconSize: "var(--size-icon-sm)",
          loadingWidth: "var(--size-touch-min)",
        }
      : buttonSize === "medium"
        ? {
            minHeight: "var(--size-touch-min)",
            paddingInline: "var(--spacing-xl)",
            gap: "var(--spacing-sm)",
            fontSize: "var(--font-size-md)",
            lineHeight: "var(--line-height-md)",
            iconSize: "var(--size-icon-md)",
            loadingWidth: "50px",
          }
        : {
            minHeight: "var(--spacing-5xl)",
            paddingInline: "var(--spacing-2xl)",
            gap: "var(--spacing-sm)",
            fontSize: "var(--font-size-md)",
            lineHeight: "var(--line-height-md)",
            iconSize: "var(--size-icon-md)",
            loadingWidth: "58px",
          };

  const variant =
    buttonVariant === "primary"
      ? {
          backgroundColor: "var(--primary-solid)",
          color: "var(--text-on-primary)",
          "&:hover": { backgroundColor: "var(--primary-solid-hover)" },
          "&:active": { backgroundColor: "var(--primary-solid-pressed)" },
          "&.Mui-disabled": {
            backgroundColor: "var(--status-neutral-subtle)",
            color: "var(--text-disabled)",
          },
        }
      : buttonVariant === "secondary"
        ? {
            backgroundColor: "var(--bg-surface)",
            border: "var(--border-thin) solid var(--border-strong)",
            color: "var(--text-primary)",
            "&:hover": { backgroundColor: "var(--bg-surface-alt)" },
            "&:active": { backgroundColor: "var(--bg-surface-sunken)" },
            "&.Mui-disabled": {
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-default)",
              color: "var(--text-disabled)",
            },
          }
        : buttonVariant === "discreet"
          ? {
              backgroundColor: "transparent",
              color: "var(--primary-text)",
              "&:hover": { backgroundColor: "var(--primary-subtle)" },
              "&:active": { backgroundColor: "var(--primary-border)" },
              "&.Mui-disabled": {
                backgroundColor: "transparent",
                color: "var(--text-disabled)",
              },
            }
          : {
              backgroundColor: "var(--status-danger-solid)",
              color: "var(--text-on-primary)",
              "&:hover, &:active": {
                backgroundColor: "var(--status-danger-solid-hover)",
              },
              "&.Mui-disabled": {
                backgroundColor: "var(--status-neutral-subtle)",
                color: "var(--text-disabled)",
              },
            };

  return {
    minWidth: buttonLoading ? size.loadingWidth : 0,
    minHeight: size.minHeight,
    paddingInline: size.paddingInline,
    gap: size.gap,
    borderRadius: "var(--radius-md)",
    boxShadow: "none",
    fontSize: size.fontSize,
    fontWeight: 600,
    lineHeight: size.lineHeight,
    textTransform: "none",
    transition: "background-color 120ms ease",
    ...variant,
    "&:hover": { boxShadow: "none", ...variant["&:hover"] },
    "&:active": { boxShadow: "none", ...variant["&:active"] },
    "&.Mui-focusVisible": {
      outline:
        "3px solid color-mix(in srgb, var(--border-focus) 55%, transparent)",
      outlineOffset: 2,
    },
    "& .MuiButton-startIcon, & .MuiButton-endIcon": {
      display: "inherit",
      margin: 0,
      "& > *:nth-of-type(1)": { fontSize: size.iconSize },
    },
  };
});

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      children,
      disabled = false,
      loading = false,
      size = "medium",
      startIcon,
      endIcon,
      variant = "primary",
      ...props
    },
    ref,
  ) {
    return (
      <StyledButton
        {...props}
        ref={ref}
        aria-busy={loading || undefined}
        buttonLoading={loading}
        buttonSize={size}
        buttonVariant={variant}
        disabled={disabled || loading}
        startIcon={loading ? undefined : startIcon}
        endIcon={loading ? undefined : endIcon}
      >
        {loading ? (
          <>
            <LoadingDots aria-hidden="true">
              <span />
              <span />
              <span />
            </LoadingDots>
            <VisuallyHidden>{children}</VisuallyHidden>
          </>
        ) : (
          children
        )}
      </StyledButton>
    );
  },
);
