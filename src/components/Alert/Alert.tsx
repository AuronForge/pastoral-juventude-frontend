import {
  CheckCircleOutlined,
  Close,
  ErrorOutlined,
  InfoOutlined,
  WarningAmberOutlined,
} from "@mui/icons-material";
import {
  Alert as MuiAlert,
  IconButton as MuiIconButton,
  styled,
  Typography,
} from "@mui/material";
import { forwardRef } from "react";
import type { AlertProps, AlertTone } from "./Alert.types";

type AlertStyleOwnerState = { alertTone: AlertTone };

const toneDetails = {
  info: { icon: <InfoOutlined />, severity: "info" },
  success: { icon: <CheckCircleOutlined />, severity: "success" },
  warning: { icon: <WarningAmberOutlined />, severity: "warning" },
  danger: { icon: <ErrorOutlined />, severity: "error" },
} as const;

const toneStyles = {
  info: {
    backgroundColor: "var(--pj-color-feedback-information-soft)",
    borderColor: "var(--pj-color-feedback-information)",
    iconColor: "var(--pj-color-feedback-information)",
  },
  success: {
    backgroundColor: "var(--pj-color-feedback-success-soft)",
    borderColor: "var(--pj-color-feedback-success)",
    iconColor: "var(--pj-color-feedback-success)",
  },
  warning: {
    backgroundColor: "var(--pj-color-feedback-attention-soft)",
    borderColor: "var(--pj-color-feedback-attention)",
    iconColor: "var(--pj-color-feedback-attention)",
  },
  danger: {
    backgroundColor: "var(--pj-color-feedback-error-soft)",
    borderColor: "var(--pj-color-border-danger)",
    iconColor: "var(--pj-color-text-danger)",
  },
} as const;

const StyledAlert = styled(MuiAlert, {
  shouldForwardProp: (prop) => prop !== "alertTone",
})<AlertStyleOwnerState>(({ alertTone }) => {
  const tone = toneStyles[alertTone];

  return {
    alignItems: "flex-start",
    width: "100%",
    padding: "var(--pj-space-4)",
    gap: "var(--pj-space-3)",
    border: "var(--pj-border-width-default) solid",
    borderColor: tone.borderColor,
    borderRadius: "var(--pj-radius-xl)",
    backgroundColor: tone.backgroundColor,
    color: "var(--pj-color-text-primary)",
    "& .MuiAlert-icon": {
      margin: 0,
      padding: 0,
      color: tone.iconColor,
      "& .MuiSvgIcon-root": {
        width: "var(--pj-icon-size-md)",
        height: "var(--pj-icon-size-md)",
      },
    },
    "& .MuiAlert-message": {
      flex: "1 1 auto",
      minWidth: 0,
      padding: 0,
    },
    "& .MuiAlert-action": {
      margin: 0,
      padding: 0,
      flexShrink: 0,
    },
  };
});

const CloseButton = styled(MuiIconButton)({
  width: "var(--space-extended-44px)",
  height: "var(--space-extended-44px)",
  flexShrink: 0,
  padding: 0,
  color: "var(--pj-color-text-secondary)",
  "& .MuiSvgIcon-root": {
    width: "var(--pj-icon-size-md)",
    height: "var(--pj-icon-size-md)",
  },
  "&.Mui-focusVisible": {
    outline:
      "3px solid color-mix(in srgb, var(--pj-color-border-focus) 55%, transparent)",
    outlineOffset: 2,
  },
});

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  {
    children,
    closeLabel = "Fechar alerta",
    dismissible = false,
    title,
    tone = "info",
    ...props
  },
  ref,
) {
  const { icon, severity } = toneDetails[tone];
  const onClose = dismissible ? props.onClose : undefined;
  const action = dismissible ? (
    <CloseButton aria-label={closeLabel} onClick={onClose}>
      <Close />
    </CloseButton>
  ) : undefined;

  return (
    <StyledAlert
      {...props}
      ref={ref}
      action={action}
      alertTone={tone}
      icon={icon}
      role="alert"
      severity={severity}
      variant="standard"
    >
      <Typography component="p" variant="labelLarge">
        {title}
      </Typography>
      <Typography component="div" variant="bodySmall" color="text.secondary">
        {children}
      </Typography>
    </StyledAlert>
  );
});
