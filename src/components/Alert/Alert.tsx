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
    backgroundColor: "var(--status-info-subtle)",
    borderColor: "var(--status-info-border)",
    iconColor: "var(--status-info-text)",
  },
  success: {
    backgroundColor: "var(--status-success-subtle)",
    borderColor: "var(--status-success-border)",
    iconColor: "var(--status-success-text)",
  },
  warning: {
    backgroundColor: "var(--status-warning-subtle)",
    borderColor: "var(--status-warning-border)",
    iconColor: "var(--status-warning-text)",
  },
  danger: {
    backgroundColor: "var(--status-danger-subtle)",
    borderColor: "var(--status-danger-border)",
    iconColor: "var(--status-danger-text)",
  },
} as const;

const StyledAlert = styled(MuiAlert, {
  shouldForwardProp: (prop) => prop !== "alertTone",
})<AlertStyleOwnerState>(({ alertTone }) => {
  const tone = toneStyles[alertTone];

  return {
    alignItems: "flex-start",
    width: "100%",
    padding: "var(--spacing-lg)",
    gap: "var(--spacing-md)",
    border: "var(--border-thin) solid",
    borderColor: tone.borderColor,
    borderRadius: "var(--radius-lg)",
    backgroundColor: tone.backgroundColor,
    color: "var(--text-primary)",
    "& .MuiAlert-icon": {
      margin: 0,
      padding: 0,
      color: tone.iconColor,
      "& .MuiSvgIcon-root": {
        width: "var(--size-icon-md)",
        height: "var(--size-icon-md)",
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
    },
  };
});

const CloseButton = styled(MuiIconButton)({
  width: "var(--size-icon-md)",
  height: "var(--size-icon-md)",
  padding: 0,
  color: "var(--text-secondary)",
  "& .MuiSvgIcon-root": {
    width: "var(--size-icon-md)",
    height: "var(--size-icon-md)",
  },
  "&.Mui-focusVisible": {
    outline:
      "3px solid color-mix(in srgb, var(--border-focus) 55%, transparent)",
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
      <Typography component="p" variant="bodyMediumStrong">
        {title}
      </Typography>
      <Typography component="div" variant="bodySmall" color="text.secondary">
        {children}
      </Typography>
    </StyledAlert>
  );
});
