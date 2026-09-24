import type { AlertProps as MuiAlertProps } from "@mui/material";
import type { ReactNode } from "react";

export type AlertTone = "info" | "success" | "warning" | "danger";

type AlertBaseProps = Omit<
  MuiAlertProps,
  | "action"
  | "children"
  | "closeText"
  | "color"
  | "icon"
  | "iconMapping"
  | "onClose"
  | "role"
  | "severity"
  | "slotProps"
  | "variant"
> & {
  /** Conteúdo que explica a situação e a ação esperada. */
  children: ReactNode;
  /** Nome acessível da ação de dispensar o alerta. */
  closeLabel?: string;
  /** Exibe uma ação para dispensar um aviso não bloqueante. */
  dismissible?: boolean;
  /** Título conciso da situação apresentada. */
  title: ReactNode;
  /** Tom semântico disponível no catálogo do Design System. */
  tone?: AlertTone;
};

type DismissibleAlertProps = {
  dismissible: true;
  onClose: () => void;
};

type PersistentAlertProps = {
  dismissible?: false;
  onClose?: never;
};

export type AlertProps = AlertBaseProps &
  (DismissibleAlertProps | PersistentAlertProps);
