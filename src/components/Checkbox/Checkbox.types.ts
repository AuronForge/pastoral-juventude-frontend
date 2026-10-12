import type { CheckboxProps as MuiCheckboxProps } from "@mui/material";
import type { ReactNode } from "react";

type CheckboxBaseProps = Omit<
  MuiCheckboxProps,
  "color" | "icon" | "checkedIcon" | "indeterminateIcon" | "size" | "aria-label"
> & {
  /** Texto de ajuda exibido abaixo da opção. */
  hint?: string;
  /** Mensagem do estado Erro; tem prioridade sobre o texto de ajuda. */
  errorMessage?: string;
};

type WithLabelProps = {
  /** Label que explica a opção (Conteúdo = Com label). */
  label: ReactNode;
  "aria-label"?: never;
};

type WithoutLabelProps = {
  /** Conteúdo = Sem label: reservado a contextos com significado explícito. */
  label?: undefined;
  /** Nome acessível obrigatório quando não há label visível. */
  "aria-label": string;
};

export type CheckboxProps = CheckboxBaseProps &
  (WithLabelProps | WithoutLabelProps);
