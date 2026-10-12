import { IconButton, styled } from "@mui/material";
import { forwardRef, useState } from "react";
import { TextField } from "../TextField";
import type { PasswordFieldProps } from "./PasswordField.types";
import { Icon } from "../Icon";

const VisibilityButton = styled(IconButton)({
  width: "var(--pj-icon-size-md)",
  height: "var(--pj-icon-size-md)",
  padding: 0,
  color: "var(--pj-color-text-secondary)",
  "& .material-symbols-outlined": {
    width: "var(--pj-icon-size-md)",
    height: "var(--pj-icon-size-md)",
  },
  "&.Mui-focusVisible": {
    outline:
      "3px solid color-mix(in srgb, var(--pj-color-border-focus) 55%, transparent)",
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
            disabled={props.disabled}
            disableRipple
            onClick={() => setIsPasswordVisible((visible) => !visible)}
            onMouseDown={(event) => event.preventDefault()}
            type="button"
          >
            {isPasswordVisible ? (
              <Icon name="visibility_off" />
            ) : (
              <Icon name="visibility" />
            )}
          </VisibilityButton>
        }
        type={isPasswordVisible ? "text" : "password"}
      />
    );
  },
);
