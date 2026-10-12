import type { LinkProps as MuiLinkProps } from "@mui/material";

export type LinkProps = Omit<
  MuiLinkProps,
  "color" | "underline" | "variant"
> & {
  /** Estado Desabilitado: não interativo e fora da navegação por Tab. */
  disabled?: boolean;
  /**
   * Ícone externo (open_in_new): opcional, recomendado quando o conteúdo
   * abrir em outra aba ou aplicativo.
   */
  externalIcon?: boolean;
};
