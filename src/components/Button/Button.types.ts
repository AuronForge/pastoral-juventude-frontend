import type { ButtonProps as MuiButtonProps } from "@mui/material";

export type ButtonVariant = "primary" | "secondary" | "discreet" | "danger";
export type ButtonSize = "small" | "medium" | "large";

export type ButtonProps = Omit<
  MuiButtonProps,
  "aria-busy" | "color" | "loading" | "size" | "variant"
> & {
  /** Mostra o andamento da ação e evita novos acionamentos. */
  loading?: boolean;
  /** Variante visual disponível no catálogo do Design System. */
  variant?: ButtonVariant;
  /** Tamanho semântico disponível no catálogo do Design System. */
  size?: ButtonSize;
};
