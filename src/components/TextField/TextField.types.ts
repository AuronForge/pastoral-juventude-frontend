import type { TextFieldProps as MuiTextFieldProps } from "@mui/material";
import type { ReactNode } from "react";

export type TextFieldSize = "medium" | "large";

export type TextFieldProps = Omit<
  MuiTextFieldProps,
  "error" | "helperText" | "label" | "size" | "slotProps" | "variant"
> & {
  errorMessage?: string;
  hint?: string;
  leadingIcon?: ReactNode;
  prefix?: ReactNode;
  readOnly?: boolean;
  size?: TextFieldSize;
  suffix?: ReactNode;
  trailingIcon?: ReactNode;
};
