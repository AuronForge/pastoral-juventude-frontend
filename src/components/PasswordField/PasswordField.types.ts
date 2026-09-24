import type { TextFieldProps } from "../TextField";

/** Campo de texto especializado para informações sigilosas. */
export type PasswordFieldProps = Omit<
  TextFieldProps,
  "trailingIcon" | "type"
> & {
  /** Nome acessível da ação exibida quando a senha está visível. */
  hidePasswordLabel?: string;
  /** Nome acessível da ação exibida quando a senha está oculta. */
  showPasswordLabel?: string;
};
