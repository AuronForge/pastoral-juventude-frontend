import type { TextFieldProps as MuiTextFieldProps } from "@mui/material";
import type { InputHTMLAttributes, ReactElement } from "react";

/** Tamanhos do Text Field do Figma: Médio (40 px) e Grande (48 px). */
export type TextFieldSize = "medium" | "large";

/** Tipos do Figma: Texto, E-mail, Senha, Número e Busca. */
export type TextFieldType = "text" | "email" | "password" | "number" | "search";

type TextFieldBaseProps = Omit<
  MuiTextFieldProps,
  "error" | "helperText" | "size" | "slotProps" | "type" | "variant"
> & {
  /** Tipo do dado esperado. Senha integra a ação de mostrar/ocultar. */
  type?: TextFieldType;
  /** Mensagem do estado Erro; tem prioridade sobre o texto de ajuda. */
  errorMessage?: string;
  /** Texto de ajuda exibido abaixo do campo. */
  hint?: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  minLength?: number;
  /** Estado Somente leitura: preserva o valor sem parecer editável. */
  readOnly?: boolean;
  size?: TextFieldSize;
  /** Nome acessível da ação quando a senha está oculta. */
  showPasswordLabel?: string;
  /** Nome acessível da ação quando a senha está visível. */
  hidePasswordLabel?: string;
};

type LeadingIconProps = {
  /** Ícone à esquerda (Material Symbols). */
  leadingIcon?: ReactElement;
  trailingIcon?: never;
};

type TrailingIconProps = {
  leadingIcon?: never;
  /** Ícone à direita (Material Symbols); a Senha usa a ação de visibilidade. */
  trailingIcon?: ReactElement;
};

export type TextFieldProps = TextFieldBaseProps &
  (LeadingIconProps | TrailingIconProps);
