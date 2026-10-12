import { styled } from "@mui/material";
import { forwardRef } from "react";
import { TextField } from "../TextField";
import type { DatePickerProps } from "./DatePicker.types";

const CalendarField = styled(TextField)({
  "& input": {
    minHeight: "var(--space-extended-44px)",
  },
  "& input::-webkit-calendar-picker-indicator": {
    boxSizing: "border-box",
    width: "var(--space-extended-44px)",
    height: "var(--space-extended-44px)",
    padding: "var(--pj-space-2)",
    cursor: "pointer",
  },
});

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  function DatePicker({ inputProps, min, max, ...props }, ref) {
    return (
      <CalendarField
        {...props}
        ref={ref}
        // Temporário: o Date Picker do Figma substituirá o calendário nativo.
        {...({ type: "date" } as object)}
        inputProps={{
          ...inputProps,
          min,
          max,
        }}
      />
    );
  },
);
