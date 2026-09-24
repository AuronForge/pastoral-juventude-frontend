import type { TextFieldProps } from "../TextField";

/** Campo de texto especializado para informações sigilosas. */
export type PasswordFieldProps = Omit<TextFieldProps, "type">;
