import {
  InputAdornment,
  IconButton as MuiIconButton,
  TextField as MuiTextField,
  styled,
} from "@mui/material";
import { forwardRef, useState } from "react";
import { typographyStyle } from "../../theme/tokens";
import { Icon } from "../Icon";
import type { TextFieldProps, TextFieldSize } from "./TextField.types";

type OwnerState = { fieldSize: TextFieldSize; readOnly: boolean };

const StyledTextField = styled(MuiTextField, {
  shouldForwardProp: (prop) => prop !== "fieldSize" && prop !== "readOnly",
})<OwnerState>(({ fieldSize, readOnly }) => ({
  width: "100%",
  "& .MuiInputLabel-root": {
    ...typographyStyle("labelMedium"),
    color: "var(--pj-color-text-primary)",
    position: "static",
    transform: "none",
    marginBottom: "var(--layout-fine-6px)",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "var(--pj-color-text-primary)",
  },
  "& .MuiInputLabel-root.Mui-error": { color: "var(--pj-color-text-danger)" },
  "& .MuiInputLabel-root.Mui-disabled": {
    color: "var(--pj-color-text-disabled)",
  },
  "& .MuiInputLabel-asterisk": { color: "inherit" },
  "& .MuiFormHelperText-root": {
    ...typographyStyle("bodySmall"),
    color: "var(--pj-color-text-secondary)",
    margin: "var(--layout-fine-6px) 0 0",
  },
  "& .MuiFormHelperText-root.Mui-error": {
    color: "var(--pj-color-text-danger)",
  },
  "& .MuiFormHelperText-root.Mui-disabled": {
    color: "var(--pj-color-text-disabled)",
  },
  "& .MuiOutlinedInput-root": {
    ...typographyStyle("bodyMedium"),
    height:
      fieldSize === "large"
        ? "var(--pj-space-8)"
        : "var(--space-extended-40px)",
    gap: "var(--pj-space-2)",
    paddingInline: "var(--pj-space-3)",
    borderRadius: "var(--pj-radius-md)",
    backgroundColor: readOnly
      ? "var(--pj-color-bg-canvas)"
      : "var(--pj-color-bg-surface)",
    color: "var(--pj-color-text-primary)",
    "& fieldset": {
      borderColor: "var(--pj-color-border-default)",
      borderWidth: "var(--pj-border-width-default)",
    },
    "&:hover fieldset": { borderColor: "var(--pj-color-border-default)" },
    "&.Mui-focused fieldset": {
      borderColor: "var(--pj-color-border-focus)",
      borderWidth: "var(--pj-border-width-emphasis)",
    },
    "&.Mui-error fieldset, &.Mui-error:hover fieldset": {
      borderColor: "var(--pj-color-border-danger)",
      borderWidth: "var(--pj-border-width-default)",
    },
    "&.Mui-error.Mui-focused fieldset": {
      borderWidth: "var(--pj-border-width-emphasis)",
    },
    "&.Mui-disabled": {
      backgroundColor: "var(--pj-color-action-disabled)",
      color: "var(--pj-color-text-disabled)",
    },
    "&.Mui-disabled fieldset": {
      borderColor: "var(--pj-color-border-default)",
    },
  },
  "& .MuiOutlinedInput-input": {
    padding: 0,
    height: "100%",
  },
  "& .MuiOutlinedInput-input::placeholder": {
    color: "var(--pj-color-text-secondary)",
    opacity: 1,
  },
  "& .MuiOutlinedInput-input.Mui-disabled": {
    WebkitTextFillColor: "var(--pj-color-text-disabled)",
  },
  "& .MuiInputAdornment-root": {
    margin: 0,
    color: "var(--pj-color-action-primary)",
    "& .material-symbols-outlined": {
      width: "var(--pj-icon-size-md)",
      height: "var(--pj-icon-size-md)",
      fontSize: "var(--pj-icon-size-md)",
    },
  },
}));

/** Ação de visibilidade da senha do Figma: área de 24 px e ícone de 20 px. */
const VisibilityButton = styled(MuiIconButton)({
  width: "var(--pj-icon-size-lg)",
  height: "var(--pj-icon-size-lg)",
  padding: 0,
  color: "var(--pj-color-text-secondary)",
  "&.Mui-focusVisible": {
    outline:
      "var(--pj-border-width-emphasis) solid var(--pj-color-border-focus)",
    outlineOffset: "var(--layout-fine-2px)",
  },
});

/**
 * Text Field do Figma: tipos Texto, E-mail, Senha, Número e Busca; tamanhos
 * Médio e Grande; estados Vazio, Preenchido, Foco, Erro, Desabilitado e
 * Somente leitura; ícone opcional à esquerda ou à direita.
 */
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    {
      disabled = false,
      errorMessage,
      hidePasswordLabel = "Ocultar senha",
      hint,
      inputProps,
      leadingIcon,
      minLength,
      readOnly = false,
      showPasswordLabel = "Mostrar senha",
      size = "medium",
      trailingIcon,
      type = "text",
      ...props
    },
    ref,
  ) {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const isPassword = type === "password";
    const showVisibilityAction = isPassword && !readOnly;
    const helperText = errorMessage ?? hint;

    const trailing = showVisibilityAction ? (
      <VisibilityButton
        aria-label={passwordVisible ? hidePasswordLabel : showPasswordLabel}
        aria-pressed={passwordVisible}
        disabled={disabled}
        disableRipple
        onClick={() => setPasswordVisible((visible) => !visible)}
        onMouseDown={(event) => event.preventDefault()}
        type="button"
      >
        <Icon
          name={passwordVisible ? "visibility_off" : "visibility"}
          size="md"
        />
      </VisibilityButton>
    ) : (
      trailingIcon
    );

    return (
      <StyledTextField
        {...props}
        disabled={disabled}
        error={Boolean(errorMessage)}
        fieldSize={size}
        helperText={helperText}
        readOnly={readOnly}
        inputRef={ref}
        type={isPassword && passwordVisible ? "text" : type}
        variant="outlined"
        slotProps={{
          inputLabel: { shrink: true },
          input: {
            notched: false,
            readOnly,
            startAdornment: leadingIcon ? (
              <InputAdornment position="start">{leadingIcon}</InputAdornment>
            ) : undefined,
            endAdornment: trailing ? (
              <InputAdornment position="end">{trailing}</InputAdornment>
            ) : undefined,
          },
          htmlInput: { ...inputProps, minLength },
        }}
      />
    );
  },
);
