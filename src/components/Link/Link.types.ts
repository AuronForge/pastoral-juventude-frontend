import type { LinkProps as MuiLinkProps } from "@mui/material";
import type { ReactNode } from "react";

export type LinkProps = Omit<
  MuiLinkProps,
  "color" | "underline" | "variant"
> & {
  /** Impede a navegação e informa indisponibilidade para tecnologias assistivas. */
  disabled?: boolean;
  /** Ícone exibido antes do conteúdo textual. */
  startIcon?: ReactNode;
  /** Ícone exibido após o conteúdo textual. */
  endIcon?: ReactNode;
};
