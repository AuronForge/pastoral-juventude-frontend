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
      ? {
          control: "var(--space-extended-44px)",
          icon: "var(--pj-icon-size-sm)",
        }
      : buttonSize === "medium"
        ? {
            control: "var(--space-extended-44px)",
            icon: "var(--pj-icon-size-md)",
          }
        : { control: "var(--pj-space-8)", icon: "var(--pj-icon-size-lg)" };

  const variant =
    buttonVariant === "primary"
      ? {
          backgroundColor: "var(--pj-color-action-primary)",
          color: "var(--pj-color-text-inverse)",
          "&:hover": {
            backgroundColor: "var(--pj-color-action-primary-hover)",
          },
          "&:active": {
            backgroundColor: "var(--pj-color-action-primary-hover)",
          },
          "&.Mui-disabled": {
            backgroundColor: "var(--pj-color-feedback-neutral-soft)",
            color: "var(--pj-color-text-disabled)",
          },
        }
      : buttonVariant === "secondary"
        ? {
            backgroundColor: "var(--pj-color-bg-surface)",
            border:
              "var(--pj-border-width-default) solid var(--pj-color-border-default)",
            color: "var(--pj-color-action-primary)",
            "&:hover": { backgroundColor: "var(--pj-color-bg-canvas)" },
            "&:active": { backgroundColor: "var(--pj-color-bg-canvas)" },
            "&.Mui-disabled": {
              backgroundColor: "var(--pj-color-bg-surface)",
              borderColor: "var(--pj-color-border-default)",
              color: "var(--pj-color-text-disabled)",
            },
          }
        : buttonVariant === "tertiary"
          ? {
              backgroundColor: "transparent",
              color: "var(--pj-color-action-primary)",
              "&:hover": {
                backgroundColor: "var(--pj-color-feedback-information-soft)",
              },
              "&:active": {
                backgroundColor: "var(--pj-color-feedback-information-soft)",
              },
              "&.Mui-disabled": {
                backgroundColor: "transparent",
                color: "var(--pj-color-text-disabled)",
              },
            }
          : {
              backgroundColor: "var(--pj-color-action-danger)",
              color: "var(--pj-color-text-inverse)",
              "&:hover": {
                backgroundColor: "var(--pj-color-action-danger-hover)",
              },
              "&:active": {
                backgroundColor: "var(--pj-color-action-danger-hover)",
              },
              "&.Mui-disabled": {
                backgroundColor: "var(--pj-color-feedback-neutral-soft)",
                color: "var(--pj-color-text-disabled)",
              },
            };

  return {
    width: size.control,
    height: size.control,
    flexShrink: 0,
    padding: 0,
    borderRadius: "var(--pj-radius-lg)",
    transition: "background-color 120ms ease",
    ...variant,
    "&:hover": { ...variant["&:hover"] },
    "&:active": { ...variant["&:active"] },
    "&.Mui-focusVisible": {
      outline:
        "3px solid color-mix(in srgb, var(--pj-color-border-focus) 55%, transparent)",
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
