import {
  Checkbox as MuiCheckbox,
  FormControlLabel,
  styled,
} from "@mui/material";
import { forwardRef } from "react";
import { typographyStyle } from "../../theme/tokens";
import type { CheckboxProps } from "./Checkbox.types";

const StyledCheckbox = styled(MuiCheckbox)({
  width: "var(--pj-icon-size-md)",
  height: "var(--pj-icon-size-md)",
  padding: 0,
  borderRadius: "var(--pj-radius-sm)",
  color: "var(--pj-color-border-default)",
  "& .MuiSvgIcon-root": { fontSize: "var(--pj-icon-size-md)" },
  "&.Mui-checked, &.MuiCheckbox-indeterminate": {
    color: "var(--pj-color-action-primary)",
  },
  "&.Mui-disabled": { color: "var(--pj-color-border-default)" },
  "&.Mui-disabled.Mui-checked, &.Mui-disabled.MuiCheckbox-indeterminate": {
    color: "var(--pj-color-feedback-neutral-soft)",
  },
  "&.Mui-focusVisible": {
    outline:
      "3px solid color-mix(in srgb, var(--pj-color-border-focus) 55%, transparent)",
    outlineOffset: 2,
  },
});

const StyledFormControlLabel = styled(FormControlLabel)({
  alignItems: "center",
  gap: "var(--pj-space-2)",
  minHeight: "var(--space-extended-44px)",
  margin: 0,
  paddingBlock: "var(--pj-space-3)",
  "& .MuiFormControlLabel-label": {
    color: "var(--pj-color-text-primary)",
    ...typographyStyle("bodyMedium"),
  },
  "&.Mui-disabled .MuiFormControlLabel-label": {
    color: "var(--pj-color-text-disabled)",
  },
});

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ label, ...props }, ref) {
    return (
      <StyledFormControlLabel
        control={<StyledCheckbox {...props} slotProps={{ input: { ref } }} />}
        disabled={props.disabled}
        label={label}
      />
    );
  },
);
