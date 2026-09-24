import { IconButton as MuiIconButton, styled } from "@mui/material";
import { forwardRef } from "react";
import { LoadingIndicator } from "../LoadingIndicator";
import type {
  IconButtonProps,
  IconButtonSize,
  IconButtonVariant,
} from "./IconButton.types";

type IconButtonStyleOwnerState = {
  buttonSize: IconButtonSize;
  buttonVariant: IconButtonVariant;
};

const StyledIconButton = styled(MuiIconButton, {
  shouldForwardProp: (prop) =>
    prop !== "buttonSize" && prop !== "buttonVariant",
})<IconButtonStyleOwnerState>(({ buttonSize, buttonVariant }) => {
  const size =
    buttonSize === "small"
      ? { control: "var(--spacing-3xl)", icon: "var(--size-icon-sm)" }
      : buttonSize === "medium"
        ? { control: "var(--spacing-4xl)", icon: "var(--size-icon-md)" }
        : { control: "var(--spacing-5xl)", icon: "var(--size-icon-lg)" };

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
            color: "var(--primary-text)",
            "&:hover": { backgroundColor: "var(--bg-surface-alt)" },
            "&:active": { backgroundColor: "var(--bg-surface-sunken)" },
            "&.Mui-disabled": {
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-default)",
              color: "var(--text-disabled)",
            },
          }
        : buttonVariant === "tertiary"
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
              "&:hover": {
                backgroundColor: "var(--status-danger-solid-hover)",
              },
              "&:active": {
                backgroundColor: "var(--status-danger-solid-hover)",
              },
              "&.Mui-disabled": {
                backgroundColor: "var(--status-neutral-subtle)",
                color: "var(--text-disabled)",
              },
            };

  return {
    width: size.control,
    height: size.control,
    padding: 0,
    borderRadius: "var(--radius-md)",
    transition: "background-color 120ms ease",
    ...variant,
    "&:hover": { ...variant["&:hover"] },
    "&:active": { ...variant["&:active"] },
    "&.Mui-focusVisible": {
      outline:
        "3px solid color-mix(in srgb, var(--border-focus) 55%, transparent)",
      outlineOffset: 2,
    },
    "& .MuiSvgIcon-root": {
      width: size.icon,
      height: size.icon,
      fontSize: size.icon,
    },
  };
});

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      disabled = false,
      icon,
      label,
      loading = false,
      size = "medium",
      variant = "tertiary",
      ...props
    },
    ref,
  ) {
    const indicatorTone =
      variant === "primary" || variant === "danger" ? "on-solid" : "default";
    const indicatorSize = size === "small" ? "small" : "medium";

    return (
      <StyledIconButton
        {...props}
        ref={ref}
        aria-busy={loading || undefined}
        aria-label={label}
        buttonSize={size}
        buttonVariant={variant}
        disabled={disabled || loading}
      >
        {loading ? (
          <LoadingIndicator
            decorative
            size={indicatorSize}
            tone={indicatorTone}
          />
        ) : (
          icon
        )}
      </StyledIconButton>
    );
  },
);
