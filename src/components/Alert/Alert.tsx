import { ButtonBase, styled } from "@mui/material";
import { forwardRef } from "react";
import { typographyStyle } from "../../theme/tokens";
import { Icon } from "../Icon";
import type { AlertModel, AlertProps, AlertSeverity } from "./Alert.types";

/**
 * Ícones semânticos do Figma ("✓", "i", "!" e "×") no equivalente do
 * Material Symbols Outlined.
 */
const severityDetails = {
  success: {
    icon: "check",
    color: "var(--pj-color-feedback-success)",
    soft: "var(--pj-color-feedback-success-soft)",
  },
  information: {
    icon: "info_i",
    color: "var(--pj-color-feedback-information)",
    soft: "var(--pj-color-feedback-information-soft)",
  },
  attention: {
    icon: "priority_high",
    color: "var(--pj-color-feedback-attention)",
    soft: "var(--pj-color-feedback-attention-soft)",
  },
  error: {
    icon: "close",
    color: "var(--pj-color-feedback-error)",
    soft: "var(--pj-color-feedback-error-soft)",
  },
} as const;

type OwnerState = { severity: AlertSeverity; model: AlertModel };

const Root = styled("div", {
  shouldForwardProp: (prop) => prop !== "severity" && prop !== "model",
})<OwnerState>(({ severity, model }) => {
  const details = severityDetails[severity];

  return {
    display: "flex",
    alignItems: "flex-start",
    gap: "var(--pj-space-3)",
    width: "100%",
    boxSizing: "border-box",
    padding: "var(--pj-space-4)",
    borderRadius: "var(--pj-radius-md)",
    backgroundColor:
      model === "soft" ? details.soft : "var(--pj-color-bg-surface)",
    border:
      model === "outlined"
        ? `var(--pj-border-width-default) solid ${details.color}`
        : "none",
    color: "var(--pj-color-text-primary)",
    "& .alert-icon": { color: details.color },
    "& .alert-content": {
      display: "flex",
      flexDirection: "column",
      gap: "var(--pj-space-1)",
      flex: "1 1 auto",
      minWidth: 0,
    },
    "& .alert-title": { ...typographyStyle("labelLarge"), margin: 0 },
    "& .alert-message": { ...typographyStyle("bodyMedium") },
    "& .alert-action, & .alert-close": {
      flexShrink: 0,
      color: details.color,
      "&.Mui-focusVisible": {
        outline:
          "var(--pj-border-width-emphasis) solid var(--pj-color-border-focus)",
        outlineOffset: "var(--layout-fine-2px)",
      },
    },
    "& .alert-action": {
      ...typographyStyle("labelMedium"),
      minHeight: "var(--space-extended-44px)",
      marginBlock:
        "calc((var(--space-extended-44px) - var(--pj-icon-size-lg)) / -2)",
      borderRadius: "var(--pj-radius-md)",
    },
    "& .alert-close": {
      width: "var(--space-extended-44px)",
      height: "var(--space-extended-44px)",
      margin:
        "calc((var(--space-extended-44px) - var(--pj-icon-size-lg)) / -2)",
      borderRadius: "var(--pj-radius-md)",
    },
  };
});

/**
 * Alert do Figma: comunica uma condição persistente dentro do fluxo sem
 * interromper a tarefa. Severidades Sucesso, Informação, Atenção e Erro;
 * modelos Suave e Contornado; Fechável e Com ação opcionais.
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  {
    action,
    children,
    closeLabel = "Fechar alerta",
    dismissible = false,
    model = "soft",
    onClose,
    severity = "information",
    title,
    ...props
  },
  ref,
) {
  return (
    <Root {...props} ref={ref} model={model} role="alert" severity={severity}>
      <Icon className="alert-icon" name={severityDetails[severity].icon} />
      <div className="alert-content">
        <p className="alert-title">{title}</p>
        <div className="alert-message">{children}</div>
      </div>
      {action ? (
        <ButtonBase
          className="alert-action"
          disableRipple
          onClick={action.onClick}
        >
          {action.label}
        </ButtonBase>
      ) : null}
      {dismissible ? (
        <ButtonBase
          aria-label={closeLabel}
          className="alert-close"
          disableRipple
          onClick={onClose}
        >
          <Icon name="close" size="md" />
        </ButtonBase>
      ) : null}
    </Root>
  );
});
