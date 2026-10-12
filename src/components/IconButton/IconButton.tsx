import { IconButton as MuiIconButton, styled } from "@mui/material";
import { forwardRef } from "react";
import { LoadingDots } from "../Button/LoadingDots";
import type {
  IconButtonProps,
  IconButtonSize,
  IconButtonVariant,
} from "./IconButton.types";

type IconButtonStyleOwnerState = {
  buttonSize: IconButtonSize;
  buttonVariant: IconButtonVariant;
};

/** Medidas das variantes do Figma (área e ícone). */
const sizes = {
  small: {
    control: "var(--space-extended-44px)",
    icon: "var(--pj-icon-size-sm)",
  },
  medium: {
    control: "var(--space-extended-44px)",
    icon: "var(--pj-icon-size-md)",
  },
  large: { control: "var(--pj-space-8)", icon: "var(--pj-icon-size-lg)" },
} as const;

/** Sombra interna do estado Pressionado no Figma (0 2 2, #000 18%). */
const pressedShadow = "inset 0 2px 2px 0 rgba(0, 0, 0, 0.18)";

const variants = {
  primary: {
    backgroundColor: "var(--pj-color-action-primary)",
    color: "var(--pj-color-text-inverse)",
    "&:hover": { backgroundColor: "var(--pj-color-action-primary-hover)" },
    "&:active": {
      backgroundColor: "var(--pj-color-action-primary-hover)",
      boxShadow: pressedShadow,
    },
  },
  secondary: {
    backgroundColor: "transparent",
    color: "var(--pj-color-action-primary)",
    border:
      "var(--pj-border-width-default) solid var(--pj-color-action-primary)",
    "&:hover": {
      backgroundColor: "transparent",
      borderColor: "var(--pj-color-action-primary-hover)",
      color: "var(--pj-color-action-primary-hover)",
    },
    "&:active": {
      backgroundColor: "var(--pj-color-feedback-information-soft)",
      borderColor: "var(--pj-color-action-primary-hover)",
      color: "var(--pj-color-action-primary-hover)",
      boxShadow: pressedShadow,
    },
  },
  tertiary: {
    backgroundColor: "transparent",
    color: "var(--pj-color-action-primary)",
    "&:hover": {
      backgroundColor: "transparent",
      color: "var(--pj-color-action-primary-hover)",
    },
    "&:active": {
      backgroundColor: "var(--pj-color-feedback-information-soft)",
      color: "var(--pj-color-action-primary-hover)",
      boxShadow: pressedShadow,
    },
  },
  danger: {
    backgroundColor: "var(--pj-color-action-danger)",
    color: "var(--pj-color-text-inverse)",
    "&:hover": { backgroundColor: "var(--pj-color-action-danger-hover)" },
    "&:active": {
      backgroundColor: "var(--pj-color-action-danger-hover)",
      boxShadow: pressedShadow,
    },
  },
} as const;

/** Estado Desabilitado do Figma por hierarquia. */
const disabledStyles = {
  primary: {
    backgroundColor: "var(--pj-color-action-disabled)",
    color: "var(--pj-color-text-disabled)",
  },
  secondary: {
    backgroundColor: "var(--pj-color-action-disabled)",
    borderColor: "transparent",
    color: "var(--pj-color-text-disabled)",
  },
  tertiary: {
    backgroundColor: "transparent",
    color: "var(--pj-color-text-disabled)",
  },
  danger: {
    backgroundColor: "var(--pj-color-action-disabled)",
    color: "var(--pj-color-text-disabled)",
  },
} as const;

const StyledIconButton = styled(MuiIconButton, {
  shouldForwardProp: (prop) =>
    prop !== "buttonSize" && prop !== "buttonVariant",
})<IconButtonStyleOwnerState>(({ buttonSize, buttonVariant }) => {
  const size = sizes[buttonSize];

  return {
    width: size.control,
    height: size.control,
    flexShrink: 0,
    padding: 0,
    borderRadius: "var(--pj-radius-md)",
    transition: "background-color 120ms ease, color 120ms ease",
    ...variants[buttonVariant],
    "&.Mui-disabled": disabledStyles[buttonVariant],
    "&.icon-button-loading.Mui-disabled": {
      backgroundColor: variants[buttonVariant].backgroundColor,
      color: variants[buttonVariant].color,
      ...(buttonVariant === "secondary" && {
        borderColor: "var(--pj-color-action-primary)",
      }),
    },
    "&.Mui-focusVisible": {
      outline:
        "var(--pj-border-width-emphasis) solid var(--pj-color-border-focus)",
      outlineOffset: "var(--layout-fine-2px)",
    },
    "& .material-symbols-outlined": {
      width: size.icon,
      height: size.icon,
      fontSize: size.icon,
    },
  };
});

/**
 * Icon Button do Figma: hierarquias Primário, Secundário, Terciário e Perigo;
 * alvo de 44 × 44 px (Pequeno e Médio) e 48 × 48 px (Grande).
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      disabled = false,
      icon,
      label,
      loading = false,
      size = "medium",
      variant = "tertiary",
      className,
      ...props
    },
    ref,
  ) {
    return (
      <StyledIconButton
        {...props}
        ref={ref}
        aria-busy={loading || undefined}
        aria-label={label}
        buttonSize={size}
        buttonVariant={variant}
        className={[className, loading ? "icon-button-loading" : undefined]
          .filter(Boolean)
          .join(" ")}
        disabled={disabled || loading}
        disableRipple
      >
        {loading ? <LoadingDots /> : icon}
      </StyledIconButton>
    );
  },
);
