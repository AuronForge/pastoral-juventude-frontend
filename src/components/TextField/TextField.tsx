import {
  InputAdornment,
  TextField as MuiTextField,
  styled,
} from "@mui/material";
import { forwardRef } from "react";
import type { TextFieldProps, TextFieldSize } from "./TextField.types";

type OwnerState = { fieldSize: TextFieldSize; readOnly: boolean };

const StyledTextField = styled(MuiTextField, {
  shouldForwardProp: (prop) => prop !== "fieldSize" && prop !== "readOnly",
})<OwnerState>(({ fieldSize, readOnly }) => ({
  width: "100%",
  "& .MuiInputLabel-root": {
    color: "var(--text-secondary)",
    fontSize: "var(--font-size-sm)",
    fontWeight: 500,
    lineHeight: "var(--line-height-sm)",
    position: "static",
    transform: "none",
    marginBottom: "var(--spacing-xs)",
  },
  "& .MuiInputLabel-root.Mui-disabled": { color: "var(--text-disabled)" },
  "& .MuiFormHelperText-root": {
    color: "var(--text-secondary)",
    fontSize: "var(--font-size-xs)",
    lineHeight: "var(--line-height-xs)",
    margin: "var(--spacing-xs) 0 0",
    minHeight: "var(--line-height-xs)",
  },
  "& .MuiFormHelperText-root.Mui-error": { color: "var(--status-danger-text)" },
  "& .MuiOutlinedInput-root": {
    minHeight:
      fieldSize === "large"
        ? "var(--size-control-lg)"
        : "var(--size-control-md)",
    borderRadius: "var(--radius-md)",
    backgroundColor: readOnly ? "var(--bg-surface-alt)" : "var(--bg-surface)",
    color: "var(--text-primary)",
    fontSize: "var(--font-size-md)",
    lineHeight: "var(--line-height-md)",
    "& fieldset": {
      borderColor: readOnly ? "var(--border-subtle)" : "var(--border-strong)",
    },
    "&:hover fieldset": {
      borderColor: readOnly ? "var(--border-subtle)" : "var(--border-strong)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--border-focus)",
      borderWidth: "var(--border-thick)",
    },
    "&.Mui-error fieldset": {
      borderColor: "var(--status-danger-text)",
      borderWidth: "var(--border-thick)",
    },
    "&.Mui-disabled": { backgroundColor: "var(--bg-surface-alt)" },
    "&.Mui-disabled fieldset": { borderColor: "var(--border-default)" },
    "&.Mui-disabled input": { WebkitTextFillColor: "var(--text-disabled)" },
  },
  "& .MuiOutlinedInput-input": { padding: "0 var(--spacing-md)" },
  "& .MuiInputAdornment-root": {
    color: "inherit",
    marginLeft: "var(--spacing-md)",
  },
}));

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    {
      disabled = false,
      errorMessage,
      hint,
      leadingIcon,
      prefix,
      readOnly = false,
      size = "large",
      suffix,
      trailingIcon,
      ...props
    },
    ref,
  ) {
    const isError = Boolean(errorMessage);
    const helperText = errorMessage ?? hint ?? " ";
    const startAdornment =
      leadingIcon || prefix ? (
        <InputAdornment position="start">
          {leadingIcon}
          {prefix}
        </InputAdornment>
      ) : undefined;
    const endAdornment =
      trailingIcon || suffix ? (
        <InputAdornment position="end">
          {suffix}
          {trailingIcon}
        </InputAdornment>
      ) : undefined;

    return (
      <StyledTextField
        {...props}
        disabled={disabled}
        error={isError}
        fieldSize={size}
        helperText={helperText}
        readOnly={readOnly}
        inputRef={ref}
        variant="outlined"
        slotProps={{
          input: {
            readOnly,
            startAdornment,
            endAdornment,
          },
        }}
      />
    );
  },
);
