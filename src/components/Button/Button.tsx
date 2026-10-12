import { Button as MuiButton, styled } from "@mui/material";
import { forwardRef } from "react";
import { typographyStyle } from "../../theme/tokens";
import { LoadingDots } from "./LoadingDots";
import type { ButtonProps, ButtonSize, ButtonVariant } from "./Button.types";

type ButtonStyleOwnerState = {
  buttonSize: ButtonSize;
  buttonVariant: ButtonVariant;
};

/** Medidas das variantes do Figma (altura, padding horizontal e ícone). */
const sizes = {
  small: {
    height: "var(--space-extended-44px)",
    paddingInline: "var(--pj-space-3)",
    icon: "var(--pj-icon-size-sm)",
  },
  medium: {
    height: "var(--space-extended-44px)",
    paddingInline: "var(--pj-space-4)",
    icon: "var(--pj-icon-size-md)",
  },
  large: {
    height: "var(--pj-space-8)",
    paddingInline: "var(--space-extended-20px)",
    icon: "var(--pj-icon-size-lg)",
  },
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

const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) =>
    prop !== "buttonSize" && prop !== "buttonVariant",
})<ButtonStyleOwnerState>(({ buttonSize, buttonVariant }) => {
  const size = sizes[buttonSize];

  return {
    minWidth: "var(--space-extended-44px)",
    minHeight: size.height,
    paddingBlock: 0,
    paddingInline: size.paddingInline,
    gap: "var(--pj-space-2)",
    borderRadius: "var(--pj-radius-md)",
    boxShadow: "none",
    ...typographyStyle("labelMedium"),
    textTransform: "none",
    transition: "background-color 120ms ease, color 120ms ease",
    ...variants[buttonVariant],
    "&.Mui-disabled": disabledStyles[buttonVariant],
    "&.button-loading.Mui-disabled": {
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
    "& .MuiButton-startIcon, & .MuiButton-endIcon": {
      display: "inherit",
      margin: 0,
      "& > *": {
        width: size.icon,
        height: size.icon,
        fontSize: size.icon,
      },
    },
    "& .button-label-hidden": {
      position: "absolute",
      width: 1,
      height: 1,
      overflow: "hidden",
      clip: "rect(0 0 0 0)",
      whiteSpace: "nowrap",
    },
  };
});

/**
 * Button do Figma: hierarquias Primário, Secundário, Terciário e Perigo;
 * tamanhos Pequeno, Médio e Grande; ícone à esquerda ou à direita; estados
 * Padrão, Hover, Foco, Pressionado, Desabilitado e Carregando.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      children,
      className,
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
        buttonSize={size}
        buttonVariant={variant}
        className={[className, loading ? "button-loading" : undefined]
          .filter(Boolean)
          .join(" ")}
        disabled={disabled || loading}
        disableElevation
        disableRipple
        startIcon={loading ? undefined : startIcon}
        endIcon={loading ? undefined : endIcon}
      >
        {loading ? (
          <>
            <LoadingDots />
            <span className="button-label-hidden">{children}</span>
          </>
        ) : (
          children
        )}
      </StyledButton>
    );
  },
);
