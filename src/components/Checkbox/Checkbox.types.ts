import type { CheckboxProps as MuiCheckboxProps } from "@mui/material";
import type { ReactNode } from "react";

export type CheckboxProps = Omit<
  MuiCheckboxProps,
  "color" | "icon" | "checkedIcon" | "indeterminateIcon" | "size"
> & {
  /** Rótulo que amplia a área clicável do controle. */
  label: ReactNode;
};
