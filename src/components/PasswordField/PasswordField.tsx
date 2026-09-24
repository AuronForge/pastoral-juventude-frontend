import { forwardRef } from "react";
import { TextField } from "../TextField";
import type { PasswordFieldProps } from "./PasswordField.types";

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  function PasswordField(props, ref) {
    return <TextField {...props} ref={ref} type="password" />;
  },
);
