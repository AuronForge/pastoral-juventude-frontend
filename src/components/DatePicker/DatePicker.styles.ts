import { ButtonBase, styled } from "@mui/material";
import { typographyStyle } from "../../theme/tokens";
import type { DatePickerSize } from "./DatePicker.types";

export const Root = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "var(--layout-fine-6px)",
  width: "100%",
  "& .date-picker-label": {
    ...typographyStyle("labelMedium"),
    color: "var(--pj-color-text-primary)",
  },
  "&.date-picker-disabled .date-picker-label": {
    color: "var(--pj-color-text-disabled)",
  },
  "& .date-picker-helper": {
    ...typographyStyle("labelSmall"),
    margin: 0,
    color: "var(--pj-color-text-secondary)",
  },
  "&.date-picker-error .date-picker-helper": {
    color: "var(--pj-color-text-danger)",
  },
});

type FieldOwnerState = { fieldSize: DatePickerSize };

/** Campo do Date Picker: padding 0/10/0/12 px e raio de 6 px. */
export const Field = styled("div", {
  shouldForwardProp: (prop) => prop !== "fieldSize",
})<FieldOwnerState>(({ fieldSize }) => ({
  display: "flex",
  alignItems: "center",
  boxSizing: "border-box",
  height:
    fieldSize === "large" ? "var(--pj-space-8)" : "var(--space-extended-40px)",
  paddingInline: "var(--pj-space-3) var(--layout-fine-10px)",
  borderRadius: "var(--layout-fine-6px)",
  border: "var(--pj-border-width-default) solid var(--pj-color-border-default)",
  backgroundColor: "var(--pj-color-bg-surface)",
  color: "var(--pj-color-text-primary)",
  "&:focus-within, &.date-picker-open": {
    borderColor: "var(--pj-color-border-focus)",
    borderWidth: "var(--pj-border-width-emphasis)",
    paddingInline:
      "calc(var(--pj-space-3) - 1px) calc(var(--layout-fine-10px) - 1px)",
  },
  ".date-picker-error &": { borderColor: "var(--pj-color-border-danger)" },
  ".date-picker-disabled &": {
    backgroundColor: "var(--pj-color-action-disabled)",
    color: "var(--pj-color-text-disabled)",
  },
  "& input": {
    ...typographyStyle("bodySmall"),
    flex: 1,
    minWidth: 0,
    height: "100%",
    padding: 0,
    border: 0,
    outline: 0,
    background: "transparent",
    color: "inherit",
  },
  "& input::placeholder": {
    color: "var(--pj-color-text-secondary)",
    opacity: 1,
  },
}));

/** Ação "Abrir calendário": ícone today de 18 px em área de 44 px. */
export const CalendarToggle = styled(ButtonBase)({
  width: "var(--space-extended-44px)",
  height: "var(--space-extended-44px)",
  marginRight:
    "calc((var(--space-extended-44px) - var(--layout-fine-18px)) / -2)",
  flexShrink: 0,
  borderRadius: "var(--pj-radius-md)",
  color: "var(--pj-color-text-primary)",
  "& .material-symbols-outlined": {
    width: "var(--layout-fine-18px)",
    height: "var(--layout-fine-18px)",
    fontSize: "var(--layout-fine-18px)",
  },
  "&.Mui-focusVisible": {
    outline:
      "var(--pj-border-width-emphasis) solid var(--pj-color-border-focus)",
  },
});

/** Painel: padding 14 px, gap 10 px, borda e raio de 8 px. */
export const Panel = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "var(--layout-fine-10px)",
  boxSizing: "border-box",
  padding: "var(--layout-fine-14px)",
  borderRadius: "var(--pj-radius-md)",
  border: "var(--pj-border-width-default) solid var(--pj-color-border-default)",
  backgroundColor: "var(--pj-color-bg-surface)",
  maxWidth: "calc(100vw - var(--pj-space-6))",
  "& .date-picker-header": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 28,
  },
  "& .date-picker-title": {
    ...typographyStyle("labelLarge"),
    margin: 0,
    color: "var(--pj-color-text-primary)",
  },
  "& .date-picker-nav": { display: "flex" },
  "& .date-picker-grid": {
    display: "grid",
    gridTemplateColumns: "repeat(7, 34px)",
    columnGap: "var(--layout-fine-5px)",
    rowGap: "var(--layout-fine-10px)",
  },
  "& .date-picker-weekday": {
    ...typographyStyle("labelSmall"),
    display: "grid",
    placeItems: "center",
    height: "var(--pj-space-6)",
    color: "var(--pj-color-text-primary)",
  },
  "& .date-picker-months": {
    display: "grid",
    gridTemplateColumns: "repeat(3, 86px)",
    gap: "var(--pj-space-2)",
  },
  "& .date-picker-divider": {
    height: "var(--pj-border-width-default)",
    margin: 0,
    border: 0,
    backgroundColor: "var(--pj-color-border-default)",
  },
  "& .date-picker-time": {
    display: "flex",
    alignItems: "center",
    gap: "var(--pj-space-2)",
  },
  "& .date-picker-time label": {
    ...typographyStyle("labelMedium"),
    color: "var(--pj-color-text-primary)",
  },
  "& .date-picker-time input": {
    ...typographyStyle("labelLarge"),
    boxSizing: "border-box",
    width: 92,
    height: "var(--space-extended-36px)",
    padding: "0 var(--pj-space-3)",
    borderRadius: "var(--layout-fine-6px)",
    border:
      "var(--pj-border-width-default) solid var(--pj-color-border-default)",
    color: "var(--pj-color-text-primary)",
    outline: 0,
    "&:focus-visible": {
      borderColor: "var(--pj-color-border-focus)",
      borderWidth: "var(--pj-border-width-emphasis)",
    },
  },
  "& .date-picker-time-hint": {
    ...typographyStyle("labelSmall"),
    color: "var(--pj-color-text-secondary)",
  },
});

/** Navegação de mês/ano: ícone em área de 44 px sem alterar a linha de 28 px. */
export const NavButton = styled(ButtonBase)({
  width: "var(--space-extended-44px)",
  height: "var(--space-extended-44px)",
  margin: "-8px 0",
  borderRadius: "var(--pj-radius-md)",
  color: "var(--pj-color-action-primary)",
  "& .material-symbols-outlined": {
    width: "var(--pj-icon-size-md)",
    height: "var(--pj-icon-size-md)",
    fontSize: "var(--pj-icon-size-md)",
  },
  "&.Mui-focusVisible": {
    outline:
      "var(--pj-border-width-emphasis) solid var(--pj-color-border-focus)",
  },
});

const cellFocus = {
  "&.Mui-focusVisible": {
    outline:
      "var(--pj-border-width-emphasis) solid var(--pj-color-border-focus)",
    outlineOffset: "calc(var(--pj-border-width-emphasis) * -1)",
  },
};

/** Dia: 34 × 32 px; selecionado em color/action/primary; período em canvas. */
export const DayCell = styled(ButtonBase)({
  ...typographyStyle("labelSmall"),
  width: 34,
  height: "var(--pj-space-6)",
  color: "var(--pj-color-text-primary)",
  "&.date-picker-in-range": { backgroundColor: "var(--pj-color-bg-canvas)" },
  "&.date-picker-selected": {
    borderRadius: "var(--pj-radius-full)",
    backgroundColor: "var(--pj-color-action-primary)",
    color: "var(--pj-color-text-inverse)",
  },
  "&.Mui-disabled": { color: "var(--pj-color-text-disabled)" },
  ...cellFocus,
});

/** Mês: 86 × 36 px, raio de 6 px. */
export const MonthCell = styled(ButtonBase)({
  ...typographyStyle("labelSmall"),
  width: 86,
  height: "var(--space-extended-36px)",
  borderRadius: "var(--layout-fine-6px)",
  color: "var(--pj-color-text-primary)",
  "&.date-picker-selected": {
    backgroundColor: "var(--pj-color-action-primary)",
    color: "var(--pj-color-text-inverse)",
  },
  "&.Mui-disabled": { color: "var(--pj-color-text-disabled)" },
  ...cellFocus,
});
