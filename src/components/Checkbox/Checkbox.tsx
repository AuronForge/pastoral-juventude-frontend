import {
  FormControlLabel,
  Checkbox as MuiCheckbox,
  styled,
} from "@mui/material";
import { forwardRef, useId } from "react";
import { typographyStyle } from "../../theme/tokens";
import type { CheckboxProps } from "./Checkbox.types";

/** Caixa visual de 20 px do Figma, com raio radius/sm. */
const Box = styled("span")({
  display: "grid",
  placeItems: "center",
  boxSizing: "border-box",
  width: "var(--pj-icon-size-md)",
  height: "var(--pj-icon-size-md)",
  borderRadius: "var(--pj-radius-sm)",
  border: "var(--pj-border-width-default) solid var(--pj-color-border-default)",
  backgroundColor: "var(--pj-color-bg-surface)",
  color: "var(--pj-color-text-inverse)",
  "&.selected": {
    borderColor: "var(--pj-color-action-primary)",
    backgroundColor: "var(--pj-color-action-primary)",
  },
  "& svg": { display: "block", overflow: "visible" },
});

/** Marcas do Figma: traço de 1,8 px (check 11 × 8 px; linha de 10 px). */
function CheckMark() {
  return (
    <svg width="11" height="8" viewBox="0 0 11 8" aria-hidden>
      <polyline
        points="0.9,4.1 3.9,7 10.1,0.9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IndeterminateMark() {
  return (
    <svg width="10" height="2" viewBox="0 0 10 2" aria-hidden>
      <line
        x1="0.9"
        y1="1"
        x2="9.1"
        y2="1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Área de interação de 44 px com a caixa de 20 px centralizada. */
const StyledCheckbox = styled(MuiCheckbox)({
  width: "var(--space-extended-44px)",
  height: "var(--space-extended-44px)",
  padding: "var(--pj-space-3)",
  borderRadius: "var(--pj-radius-md)",
  "&:hover .checkbox-box.selected": {
    backgroundColor: "var(--pj-color-action-primary-hover)",
  },
  "&.Mui-focusVisible .checkbox-box": {
    borderColor: "var(--pj-color-border-focus)",
    borderWidth: "var(--pj-border-width-emphasis)",
  },
  "&.checkbox-error .checkbox-box": {
    borderColor: "var(--pj-color-border-danger)",
  },
  "&.checkbox-error .checkbox-box.selected": {
    backgroundColor: "var(--pj-color-action-danger)",
  },
  "&.Mui-disabled .checkbox-box": {
    backgroundColor: "var(--pj-color-action-disabled)",
    borderColor: "var(--pj-color-border-default)",
  },
  "&.Mui-disabled .checkbox-box.selected": {
    borderColor: "var(--pj-color-action-primary)",
    color: "var(--pj-color-text-disabled)",
  },
});

const Root = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "var(--layout-fine-2px)",
  "& .MuiFormControlLabel-root": {
    alignItems: "center",
    gap: "var(--pj-space-2)",
    margin: 0,
  },
  "& .MuiFormControlLabel-label": {
    ...typographyStyle("bodyMedium"),
    color: "var(--pj-color-text-primary)",
  },
  "& .MuiFormControlLabel-label.Mui-disabled": {
    color: "var(--pj-color-text-disabled)",
  },
  "&.checkbox-error .MuiFormControlLabel-label": {
    color: "var(--pj-color-text-danger)",
  },
  "& .checkbox-helper": {
    ...typographyStyle("bodySmall"),
    margin: 0,
    color: "var(--pj-color-text-secondary)",
  },
  "&.checkbox-error .checkbox-helper": { color: "var(--pj-color-text-danger)" },
  "&.checkbox-disabled .checkbox-helper": {
    color: "var(--pj-color-text-disabled)",
  },
});

/**
 * Checkbox do Figma: seleção Desmarcado, Marcado ou Indeterminado; estados
 * Padrão, Hover, Foco, Desabilitado e Erro; Com label ou Sem label.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    {
      label,
      hint,
      errorMessage,
      className,
      disabled,
      "aria-label": ariaLabel,
      ...props
    },
    ref,
  ) {
    const helperId = useId();
    const helper = errorMessage ?? hint;
    const isError = Boolean(errorMessage);
    const control = (
      <StyledCheckbox
        {...props}
        className={[className, isError ? "checkbox-error" : undefined]
          .filter(Boolean)
          .join(" ")}
        disabled={disabled}
        disableRipple
        icon={<Box className="checkbox-box" />}
        checkedIcon={
          <Box className="checkbox-box selected">
            <CheckMark />
          </Box>
        }
        indeterminateIcon={
          <Box className="checkbox-box selected">
            <IndeterminateMark />
          </Box>
        }
        slotProps={{
          input: {
            ref,
            "aria-label": ariaLabel,
            "aria-invalid": isError || undefined,
            "aria-describedby": helper ? helperId : undefined,
          } as object,
        }}
      />
    );

    return (
      <Root
        className={[
          isError ? "checkbox-error" : undefined,
          disabled ? "checkbox-disabled" : undefined,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {label === undefined ? (
          control
        ) : (
          <FormControlLabel
            control={control}
            disabled={disabled}
            label={label}
          />
        )}
        {helper ? (
          <p className="checkbox-helper" id={helperId}>
            {helper}
          </p>
        ) : null}
      </Root>
    );
  },
);
