import { styled, useTheme } from "@mui/material";
import { forwardRef } from "react";
import { TextField } from "../TextField";
import type { DatePickerProps } from "./DatePicker.types";

const CalendarField = styled(TextField)({
  "& input": {
    minHeight: "var(--size-touch-min)",
  },
  "& input::-webkit-calendar-picker-indicator": {
    boxSizing: "border-box",
    width: "var(--size-touch-min)",
    height: "var(--size-touch-min)",
    padding: "var(--spacing-sm)",
    cursor: "pointer",
  },
});

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  function DatePicker({ inputProps, min, max, ...props }, ref) {
    const theme = useTheme();
    return (
      <CalendarField
        {...props}
        ref={ref}
        type="date"
        inputProps={{
          ...inputProps,
          min,
          max,
          style: { ...inputProps?.style, colorScheme: theme.palette.mode },
        }}
      />
    );
  },
);
