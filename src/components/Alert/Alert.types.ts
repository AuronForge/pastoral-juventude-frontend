import type { HTMLAttributes, ReactNode } from "react";

/** Severidades do Alert do Figma. */
export type AlertSeverity = "success" | "information" | "attention" | "error";

/** Modelos do Figma: Suave (fundo 12%) e Contornado (borda semântica). */
export type AlertModel = "soft" | "outlined";

export type AlertAction = {
  /** Rótulo iniciado por verbo que indica o resultado esperado. */
  label: string;
  onClick: () => void;
};

type AlertBaseProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "role" | "title"
> & {
  /** Mensagem que explica o ocorrido e orienta o próximo passo. */
  children: ReactNode;
  /** Título curto e específico que resume a condição. */
  title: ReactNode;
  severity?: AlertSeverity;
  model?: AlertModel;
  /** Ação opcional (propriedade "Com ação" do Figma). */
  action?: AlertAction;
  /** Nome acessível da ação de fechar. */
  closeLabel?: string;
};

type DismissibleAlertProps = {
  /** Fechável: permite dispensar o alerta quando isso for seguro. */
  dismissible: true;
  onClose: () => void;
};

type PersistentAlertProps = {
  dismissible?: false;
  onClose?: never;
};

export type AlertProps = AlertBaseProps &
  (DismissibleAlertProps | PersistentAlertProps);
