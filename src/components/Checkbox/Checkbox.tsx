import {
  Checkbox as MuiCheckbox,
  FormControlLabel,
  styled,
} from "@mui/material";
import { forwardRef } from "react";
import type { CheckboxProps } from "./Checkbox.types";

const StyledCheckbox = styled(MuiCheckbox)({
  width: "var(--size-icon-md)",
  height: "var(--size-icon-md)",
  padding: 0,
  borderRadius: "var(--radius-xs)",
  color: "var(--border-strong)",
  "& .MuiSvgIcon-root": { fontSize: "var(--size-icon-md)" },
  "&.Mui-checked, &.MuiCheckbox-indeterminate": {
    color: "var(--primary-solid)",
  },
  "&.Mui-disabled": { color: "var(--border-default)" },
  "&.Mui-disabled.Mui-checked, &.Mui-disabled.MuiCheckbox-indeterminate": {
    color: "var(--status-neutral-subtle)",
  },
  "&.Mui-focusVisible": {
    outline:
      "3px solid color-mix(in srgb, var(--border-focus) 55%, transparent)",
    outlineOffset: 2,
  },
});

const StyledFormControlLabel = styled(FormControlLabel)({
  alignItems: "center",
  gap: "var(--spacing-sm)",
  minHeight: "var(--size-touch-min)",
  margin: 0,
  paddingBlock: "var(--spacing-md)",
  "& .MuiFormControlLabel-label": {
    color: "var(--text-primary)",
    fontSize: "var(--font-size-md)",
    lineHeight: "var(--line-height-md)",
  },
  "&.Mui-disabled .MuiFormControlLabel-label": {
    color: "var(--text-disabled)",
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
