import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, styled } from "@mui/material";
import { forwardRef, useState } from "react";
import { TextField } from "../TextField";
import type { PasswordFieldProps } from "./PasswordField.types";

const VisibilityButton = styled(IconButton)({
  width: "var(--size-icon-md)",
  height: "var(--size-icon-md)",
  padding: 0,
  color: "var(--text-secondary)",
  "& .MuiSvgIcon-root": {
    width: "var(--size-icon-md)",
    height: "var(--size-icon-md)",
  },
  "&.Mui-focusVisible": {
    outline:
      "3px solid color-mix(in srgb, var(--border-focus) 55%, transparent)",
    outlineOffset: 2,
  },
});

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  function PasswordField(
    {
      hidePasswordLabel = "Ocultar senha",
      showPasswordLabel = "Mostrar senha",
      ...props
    },
    ref,
  ) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const toggleLabel = isPasswordVisible
      ? hidePasswordLabel
      : showPasswordLabel;

    return (
      <TextField
        {...props}
        ref={ref}
        trailingIcon={
          <VisibilityButton
            aria-label={toggleLabel}
            aria-pressed={isPasswordVisible}
            disableRipple
            onClick={() => setIsPasswordVisible((visible) => !visible)}
            onMouseDown={(event) => event.preventDefault()}
            type="button"
          >
            {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
          </VisibilityButton>
        }
        type={isPasswordVisible ? "text" : "password"}
      />
    );
  },
);
