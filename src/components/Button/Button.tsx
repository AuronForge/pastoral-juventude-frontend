import { Button as MuiButton, styled } from "@mui/material";
import { forwardRef } from "react";
import { typographyStyle } from "../../theme/tokens";
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
          minHeight: "var(--space-extended-44px)",
          paddingInline: "var(--pj-space-3)",
          gap: "var(--pj-space-1)",
          iconSize: "var(--pj-icon-size-sm)",
        }
      : buttonSize === "medium"
        ? {
            minHeight: "var(--space-extended-44px)",
            paddingInline: "var(--space-extended-20px)",
            gap: "var(--pj-space-2)",
            iconSize: "var(--pj-icon-size-md)",
          }
        : {
            minHeight: "var(--pj-space-8)",
            paddingInline: "var(--pj-space-5)",
            gap: "var(--pj-space-2)",
            iconSize: "var(--pj-icon-size-md)",
          };

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
            color: "var(--pj-color-text-primary)",
            "&:hover": { backgroundColor: "var(--pj-color-bg-canvas)" },
            "&:active": { backgroundColor: "var(--pj-color-bg-canvas)" },
            "&.Mui-disabled": {
              backgroundColor: "var(--pj-color-bg-surface)",
              borderColor: "var(--pj-color-border-default)",
              color: "var(--pj-color-text-disabled)",
            },
          }
        : buttonVariant === "discreet"
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
              "&:hover, &:active": {
                backgroundColor: "var(--pj-color-action-danger-hover)",
              },
              "&.Mui-disabled": {
                backgroundColor: "var(--pj-color-feedback-neutral-soft)",
                color: "var(--pj-color-text-disabled)",
              },
            };

  return {
    minWidth: 0,
    minHeight: size.minHeight,
    paddingInline: size.paddingInline,
    gap: size.gap,
    borderRadius: "var(--pj-radius-full)",
    boxShadow: "none",
    ...typographyStyle("labelMedium"),
    textTransform: "none",
    transition: "background-color 120ms ease",
    ...variant,
    "&:hover": { boxShadow: "none", ...variant["&:hover"] },
    "&:active": { boxShadow: "none", ...variant["&:active"] },
    "&.Mui-focusVisible": {
      outline:
        "3px solid color-mix(in srgb, var(--pj-color-border-focus) 55%, transparent)",
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
