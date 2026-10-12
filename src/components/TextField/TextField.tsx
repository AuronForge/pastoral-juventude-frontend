import {
  InputAdornment,
  TextField as MuiTextField,
  styled,
} from "@mui/material";
import { forwardRef } from "react";
import { typographyStyle } from "../../theme/tokens";
import type { TextFieldProps, TextFieldSize } from "./TextField.types";

type OwnerState = { fieldSize: TextFieldSize; readOnly: boolean };

const StyledTextField = styled(MuiTextField, {
  shouldForwardProp: (prop) => prop !== "fieldSize" && prop !== "readOnly",
})<OwnerState>(({ fieldSize, readOnly }) => ({
  width: "100%",
  "& .MuiInputLabel-root": {
    color: "var(--pj-color-text-secondary)",
    ...typographyStyle("labelMedium"),
    position: "static",
    transform: "none",
    marginBottom: "var(--pj-space-1)",
  },
  "& .MuiInputLabel-root.Mui-disabled": {
    color: "var(--pj-color-text-disabled)",
  },
  "& .MuiFormHelperText-root": {
    color: "var(--pj-color-text-secondary)",
    ...typographyStyle("bodySmall"),
    margin: "var(--pj-space-1) 0 0",
    minHeight: typographyStyle("bodySmall").lineHeight,
  },
  "& .MuiFormHelperText-root.Mui-error": {
    color: "var(--pj-color-text-danger)",
  },
  "& .MuiOutlinedInput-root": {
    minHeight:
      fieldSize === "large"
        ? "var(--space-extended-44px)"
        : "var(--space-extended-40px)",
    borderRadius: "var(--pj-radius-lg)",
    backgroundColor: readOnly
      ? "var(--pj-color-bg-canvas)"
      : "var(--pj-color-bg-surface)",
    color: "var(--pj-color-text-primary)",
    ...typographyStyle("bodyMedium"),
    "& fieldset": {
      borderColor: readOnly
        ? "var(--pj-color-border-default)"
        : "var(--pj-color-border-default)",
    },
    "&:hover fieldset": {
      borderColor: readOnly
        ? "var(--pj-color-border-default)"
        : "var(--pj-color-border-default)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--pj-color-border-focus)",
      borderWidth: "var(--pj-border-width-emphasis)",
    },
    "&.Mui-error fieldset": {
      borderColor: "var(--pj-color-text-danger)",
      borderWidth: "var(--pj-border-width-emphasis)",
    },
    "&.Mui-disabled": { backgroundColor: "var(--pj-color-bg-canvas)" },
    "&.Mui-disabled fieldset": {
      borderColor: "var(--pj-color-border-default)",
    },
    "&.Mui-disabled input": {
      WebkitTextFillColor: "var(--pj-color-text-disabled)",
    },
  },
  "& .MuiOutlinedInput-input": { padding: "0 var(--pj-space-3)" },
  "& .MuiOutlinedInput-input::placeholder": {
    color: "var(--pj-color-text-secondary)",
    opacity: 1,
  },
  "& .MuiInputAdornment-root": {
    color: "inherit",
    marginLeft: "var(--pj-space-3)",
  },
}));

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    {
      disabled = false,
      errorMessage,
      hint,
      inputProps,
      leadingIcon,
      minLength,
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
          inputLabel: { shrink: true },
          input: {
            notched: false,
            readOnly,
            startAdornment,
            endAdornment,
          },
          htmlInput: {
            ...inputProps,
            minLength,
          },
        }}
      />
    );
  },
);
