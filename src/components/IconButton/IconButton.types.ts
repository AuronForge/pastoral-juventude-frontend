import type { IconButtonProps as MuiIconButtonProps } from "@mui/material";
import type { ReactElement } from "react";

export type IconButtonVariant = "primary" | "secondary" | "tertiary" | "danger";

export type IconButtonSize = "small" | "medium" | "large";

export type IconButtonProps = Omit<
  MuiIconButtonProps,
  "aria-busy" | "aria-label" | "children" | "color" | "loading" | "size"
> & {
  /** Símbolo Material que representa a ação. */
  icon: ReactElement;
  /** Nome acessível que descreve a ação do botão. */
  label: string;
  /** Mostra o andamento da ação e evita novos acionamentos. */
  loading?: boolean;
  /** Tamanho semântico disponível no catálogo do Design System. */
  size?: IconButtonSize;
  /** Hierarquia visual disponível no catálogo do Design System. */
  variant?: IconButtonVariant;
};
