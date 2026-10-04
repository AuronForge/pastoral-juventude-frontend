import type { TextFieldProps } from "../TextField";

/** Calendário nativo. Valores e limites usam YYYY-MM-DD, sem fuso horário. */
export type DatePickerProps = Omit<
  TextFieldProps,
  | "type"
  | "value"
  | "defaultValue"
  | "placeholder"
  | "leadingIcon"
  | "trailingIcon"
  | "prefix"
  | "suffix"
> & {
  value?: string;
  defaultValue?: string;
  min?: string;
  max?: string;
};
