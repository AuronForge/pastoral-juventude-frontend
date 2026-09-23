import { Button as MuiButton, styled } from "@mui/material";
import { forwardRef } from "react";
import { LoadingIndicator } from "../LoadingIndicator";
import type { ButtonProps, ButtonSize, ButtonVariant } from "./Button.types";

type ButtonStyleOwnerState = {
  buttonSize: ButtonSize;
  buttonVariant: ButtonVariant;
};

const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) =>
    prop !== "buttonSize" && prop !== "buttonVariant",
})<ButtonStyleOwnerState>(({ buttonSize, buttonVariant }) => {
  const size =
    buttonSize === "small"
      ? {
          minHeight: "var(--size-control-sm)",
          paddingInline: "var(--spacing-md)",
          gap: "var(--spacing-xs)",
          fontSize: "var(--font-size-sm)",
          lineHeight: "var(--line-height-sm)",
          iconSize: "var(--size-icon-sm)",
        }
      : buttonSize === "medium"
        ? {
            minHeight: "var(--size-control-md)",
            paddingInline: "var(--spacing-xl)",
            gap: "var(--spacing-sm)",
            fontSize: "var(--font-size-md)",
            lineHeight: "var(--line-height-md)",
            iconSize: "var(--size-icon-md)",
          }
        : {
            minHeight: "var(--size-control-lg)",
            paddingInline: "var(--spacing-2xl)",
            gap: "var(--spacing-sm)",
            fontSize: "var(--font-size-md)",
            lineHeight: "var(--line-height-md)",
            iconSize: "var(--size-icon-md)",
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
    minWidth: 0,
    minHeight: size.minHeight,
    paddingInline: size.paddingInline,
    gap: size.gap,
    borderRadius: "var(--radius-pill)",
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
    const indicatorTone =
      variant === "primary" || variant === "danger" ? "on-solid" : "default";
    const indicatorSize = size === "small" ? "small" : "medium";
    const resolvedStartIcon =
      loading || startIcon ? (
        <>
          {loading ? (
            <LoadingIndicator
              decorative
              size={indicatorSize}
              tone={indicatorTone}
            />
          ) : null}
          {startIcon}
        </>
      ) : undefined;

    return (
      <StyledButton
        {...props}
        ref={ref}
        aria-busy={loading || undefined}
        buttonSize={size}
        buttonVariant={variant}
        disabled={disabled || loading}
        startIcon={resolvedStartIcon}
        endIcon={endIcon}
      />
    );
  },
);
