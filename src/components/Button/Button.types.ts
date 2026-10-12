import type { ButtonProps as MuiButtonProps } from "@mui/material";

/** Hierarquias do componente Button do Figma. */
export type ButtonVariant = "primary" | "secondary" | "tertiary" | "danger";
/** Tamanhos do Figma: Pequeno (44 px), Médio (44 px) e Grande (48 px). */
export type ButtonSize = "small" | "medium" | "large";

export type ButtonProps = Omit<
  MuiButtonProps,
  "aria-busy" | "color" | "loading" | "size" | "variant"
> & {
  /** Estado Carregando: substitui o conteúdo pelo indicador e bloqueia a ação. */
  loading?: boolean;
  /** Hierarquia: Primário, Secundário, Terciário ou Perigo. */
  variant?: ButtonVariant;
  /** Tamanho: Pequeno, Médio ou Grande. */
  size?: ButtonSize;
};
