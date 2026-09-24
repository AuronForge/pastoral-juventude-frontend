import type { TextFieldProps as MuiTextFieldProps } from "@mui/material";
import type { InputHTMLAttributes, ReactNode } from "react";

export type TextFieldSize = "medium" | "large";

export type TextFieldProps = Omit<
  MuiTextFieldProps,
  "error" | "helperText" | "size" | "slotProps" | "variant"
> & {
  errorMessage?: string;
  hint?: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  leadingIcon?: ReactNode;
  minLength?: number;
  prefix?: ReactNode;
  readOnly?: boolean;
  size?: TextFieldSize;
  suffix?: ReactNode;
  trailingIcon?: ReactNode;
};
