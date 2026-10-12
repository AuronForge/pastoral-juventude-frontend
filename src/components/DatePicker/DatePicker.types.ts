import type { InputHTMLAttributes } from "react";

/** Modelos do Date Picker do Figma: Data, Intervalo, Mês e ano, Data e hora. */
export type DatePickerMode = "date" | "range" | "monthYear" | "dateTime";

/** Tamanhos do Figma: Médio (40 px) e Grande (48 px). */
export type DatePickerSize = "medium" | "large";

/** Intervalo inclusivo em YYYY-MM-DD; vazio quando incompleto. */
export type DateRange = { start: string; end: string };

type DatePickerCommonProps = {
  label: string;
  id?: string;
  name?: string;
  className?: string;
  size?: DatePickerSize;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  autoComplete?: string;
  /** Mensagem do estado Erro. */
  errorMessage?: string;
  /** Texto de apoio abaixo do campo. */
  hint?: string;
  /** Limites inclusivos em YYYY-MM-DD. */
  min?: string;
  max?: string;
  /** Datas indisponíveis em YYYY-MM-DD. */
  disabledDates?: string[];
  inputProps?: Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "value" | "defaultValue" | "onChange" | "type"
  >;
};

type DateModeProps = {
  mode?: "date";
  /** YYYY-MM-DD ou vazio. */
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
};

type RangeModeProps = {
  mode: "range";
  value?: DateRange;
  defaultValue?: DateRange;
  onChange?: (value: DateRange) => void;
};

type MonthYearModeProps = {
  mode: "monthYear";
  /** YYYY-MM ou vazio. */
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
};

type DateTimeModeProps = {
  mode: "dateTime";
  /** YYYY-MM-DDTHH:mm (24 h) ou vazio. */
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
};

export type DatePickerProps = DatePickerCommonProps &
  (DateModeProps | RangeModeProps | MonthYearModeProps | DateTimeModeProps);
