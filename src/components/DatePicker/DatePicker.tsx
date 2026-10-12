import { ClickAwayListener, Popper } from "@mui/material";
import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import { Icon } from "../Icon";
import {
  CalendarToggle,
  DayCell,
  Field,
  MonthCell,
  NavButton,
  Panel,
  Root,
} from "./DatePicker.styles";
import type {
  DatePickerMode,
  DatePickerProps,
  DateRange,
} from "./DatePicker.types";
import {
  MONTHS,
  MONTHS_SHORT,
  WEEKDAYS,
  WEEKDAYS_FULL,
  addDays,
  addMonths,
  compareDays,
  formatDay,
  fromIso,
  isValidTime,
  maskDay,
  maskMonth,
  maskTime,
  monthMatrix,
  parseDay,
  toIso,
  todayParts,
  type DayParts,
} from "./dateUtils";

type MonthParts = { year: number; month: number };
type Selection = {
  start: DayParts | null;
  end: DayParts | null;
  month: MonthParts | null;
  time: string;
};
type PickerValue = string | DateRange;

const EMPTY: Selection = { start: null, end: null, month: null, time: "" };
const SEPARATOR = " – ";

const placeholders: Record<DatePickerMode, string> = {
  date: "DD/MM/AAAA",
  range: `DD/MM/AAAA${SEPARATOR}DD/MM/AAAA`,
  monthYear: "MM/AAAA",
  dateTime: "DD/MM/AAAA HH:mm",
};

function pad(value: number, size = 2) {
  return String(value).padStart(size, "0");
}

function fromValue(mode: DatePickerMode, value?: PickerValue): Selection {
  if (!value) return EMPTY;
  if (mode === "range" && typeof value === "object") {
    return { ...EMPTY, start: fromIso(value.start), end: fromIso(value.end) };
  }
  if (typeof value !== "string") return EMPTY;
  if (mode === "monthYear") {
    const match = /^(\d{4})-(\d{2})$/u.exec(value);
    return match && +match[2] >= 1 && +match[2] <= 12
      ? { ...EMPTY, month: { year: +match[1], month: +match[2] } }
      : EMPTY;
  }
  if (mode === "dateTime") {
    const [date, time = ""] = value.split("T");
    return {
      ...EMPTY,
      start: fromIso(date),
      time: isValidTime(time) ? time : "",
    };
  }
  return { ...EMPTY, start: fromIso(value) };
}

function toValue(mode: DatePickerMode, selection: Selection): PickerValue {
  const { start, end, month, time } = selection;
  if (mode === "range") {
    return { start: start ? toIso(start) : "", end: end ? toIso(end) : "" };
  }
  if (mode === "monthYear") {
    return month ? `${pad(month.year, 4)}-${pad(month.month)}` : "";
  }
  if (mode === "dateTime") {
    return start && isValidTime(time) ? `${toIso(start)}T${time}` : "";
  }
  return start ? toIso(start) : "";
}

function toText(mode: DatePickerMode, selection: Selection) {
  const { start, end, month, time } = selection;
  if (mode === "monthYear") {
    return month ? `${pad(month.month)}/${pad(month.year, 4)}` : "";
  }
  if (!start) return "";
  if (mode === "range") {
    return formatDay(start) + (end ? `${SEPARATOR}${formatDay(end)}` : "");
  }
  if (mode === "dateTime") return formatDay(start) + (time ? ` ${time}` : "");
  return formatDay(start);
}

function mask(mode: DatePickerMode, raw: string) {
  const digits = raw.replace(/\D/gu, "");
  if (mode === "monthYear") return maskMonth(digits);
  if (mode === "date") return maskDay(digits);
  const first = maskDay(digits.slice(0, 8));
  if (digits.length <= 8) return first;
  return mode === "range"
    ? `${first}${SEPARATOR}${maskDay(digits.slice(8, 16))}`
    : `${first} ${maskTime(digits.slice(8, 12))}`;
}

function parseText(mode: DatePickerMode, text: string): Selection {
  if (mode === "monthYear") {
    const match = /^(\d{2})\/(\d{4})$/u.exec(text);
    return match && +match[1] >= 1 && +match[1] <= 12
      ? { ...EMPTY, month: { year: +match[2], month: +match[1] } }
      : EMPTY;
  }
  if (mode === "range") {
    const [first = "", second = ""] = text.split(SEPARATOR);
    return { ...EMPTY, start: parseDay(first), end: parseDay(second) };
  }
  if (mode === "dateTime") {
    const [date = "", time = ""] = text.split(" ");
    return {
      ...EMPTY,
      start: parseDay(date),
      time: isValidTime(time) ? time : "",
    };
  }
  return { ...EMPTY, start: parseDay(text) };
}

function serialize(value: PickerValue | undefined) {
  return JSON.stringify(value ?? null);
}

/**
 * Date Picker do Figma: modelos Data, Intervalo, Mês e ano e Data e hora,
 * em convenção brasileira (DD/MM/AAAA, 24 horas, semana iniciada no domingo).
 * Permite digitação direta e seleção pelo calendário.
 */
export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  function DatePicker(props, ref) {
    const {
      autoComplete,
      className,
      disabled = false,
      disabledDates = [],
      errorMessage,
      hint,
      id,
      inputProps,
      label,
      max,
      min,
      mode = "date",
      name,
      readOnly = false,
      required = false,
      size = "medium",
    } = props;
    const value = props.value as PickerValue | undefined;
    const defaultValue = props.defaultValue as PickerValue | undefined;
    const onChange = props.onChange as
      ((value: PickerValue) => void) | undefined;

    const generatedId = useId();
    const inputId = id ?? generatedId;
    const helperId = `${inputId}-ajuda`;
    const panelId = `${inputId}-calendario`;
    const fieldRef = useRef<HTMLDivElement>(null);
    const toggleRef = useRef<HTMLButtonElement>(null);
    const [panelNode, setPanelNode] = useState<HTMLDivElement | null>(null);

    const initial = fromValue(mode, value ?? defaultValue);
    const [selection, setSelection] = useState<Selection>(initial);
    const [text, setText] = useState(() => toText(mode, initial));
    const [open, setOpen] = useState(false);
    const lastValue = useRef(serialize(toValue(mode, initial)));
    const anchor =
      initial.start ?? (initial.month ? { ...initial.month, day: 1 } : null);
    const [focused, setFocused] = useState<DayParts>(anchor ?? todayParts());

    useEffect(() => {
      if (value === undefined || serialize(value) === lastValue.current) return;
      const next = fromValue(mode, value);
      lastValue.current = serialize(toValue(mode, next));
      setSelection(next);
      setText(toText(mode, next));
    }, [mode, value]);

    const helper = errorMessage ?? hint;
    const interactive = !disabled && !readOnly;
    const minDay = fromIso(min);
    const maxDay = fromIso(max);
    const isUnavailable = (day: DayParts) =>
      (minDay !== null && compareDays(day, minDay) < 0) ||
      (maxDay !== null && compareDays(day, maxDay) > 0) ||
      disabledDates.includes(toIso(day));

    function commit(next: Selection, nextText = toText(mode, next)) {
      setSelection(next);
      setText(nextText);
      const output = toValue(mode, next);
      if (serialize(output) !== lastValue.current) {
        lastValue.current = serialize(output);
        onChange?.(output);
      }
    }

    function close(returnFocus = true) {
      setOpen(false);
      if (returnFocus) toggleRef.current?.focus();
    }

    function openPanel() {
      if (!interactive) return;
      const start =
        selection.start ??
        (selection.month ? { ...selection.month, day: 1 } : null) ??
        todayParts();
      setFocused(start);
      setOpen(true);
    }

    useEffect(() => {
      if (!open || !panelNode) return;
      const target = panelNode.querySelector<HTMLElement>(
        "[data-focused='true']",
      );
      target?.focus();
    }, [open, focused, panelNode]);

    function handleInput(event: ChangeEvent<HTMLInputElement>) {
      const masked = mask(mode, event.target.value);
      const parsed = parseText(mode, masked);
      const valid =
        (parsed.start === null || !isUnavailable(parsed.start)) &&
        (parsed.end === null || !isUnavailable(parsed.end));
      commit(valid ? parsed : EMPTY, masked);
      if (parsed.start) setFocused(parsed.start);
    }

    function selectDay(day: DayParts) {
      if (isUnavailable(day)) return;
      if (mode === "range") {
        const { start, end } = selection;
        if (!start || end || compareDays(day, start) < 0) {
          commit({ ...EMPTY, start: day });
          return;
        }
        commit({ ...EMPTY, start, end: day });
        close();
        return;
      }
      if (mode === "dateTime") {
        commit({ ...selection, start: day });
        return;
      }
      commit({ ...EMPTY, start: day });
      close();
    }

    function selectMonth(month: number) {
      commit({ ...EMPTY, month: { year: focused.year, month } });
      close();
    }

    function onGridKeyDown(event: KeyboardEvent<HTMLDivElement>) {
      const step: Record<string, number> =
        mode === "monthYear"
          ? { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -3, ArrowDown: 3 }
          : { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
      if (event.key in step) {
        event.preventDefault();
        setFocused((current) =>
          mode === "monthYear"
            ? addMonths(current, step[event.key])
            : addDays(current, step[event.key]),
        );
      } else if (event.key === "PageUp" || event.key === "PageDown") {
        event.preventDefault();
        const amount = mode === "monthYear" ? 12 : 1;
        setFocused((current) =>
          addMonths(current, event.key === "PageUp" ? -amount : amount),
        );
      }
    }

    function onPanelKeyDown(event: KeyboardEvent<HTMLDivElement>) {
      if (event.key === "Escape") {
        event.stopPropagation();
        close();
      }
    }

    const inRange = (day: DayParts) =>
      mode === "range" &&
      selection.start !== null &&
      selection.end !== null &&
      compareDays(day, selection.start) > 0 &&
      compareDays(day, selection.end) < 0;
    const isSelected = (day: DayParts) =>
      [selection.start, selection.end].some(
        (item) => item !== null && compareDays(item, day) === 0,
      );
    const navigationStep = mode === "monthYear" ? 12 : 1;

    return (
      <Root
        className={[
          className,
          errorMessage ? "date-picker-error" : undefined,
          disabled ? "date-picker-disabled" : undefined,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <label className="date-picker-label" htmlFor={inputId}>
          {label}
          {required ? " *" : null}
        </label>
        <Field
          className={open ? "date-picker-open" : undefined}
          fieldSize={size}
          ref={fieldRef}
        >
          <input
            {...inputProps}
            aria-describedby={helper ? helperId : undefined}
            aria-invalid={errorMessage ? true : undefined}
            autoComplete={autoComplete}
            disabled={disabled}
            id={inputId}
            inputMode="numeric"
            name={name}
            onChange={handleInput}
            placeholder={placeholders[mode]}
            readOnly={readOnly}
            ref={ref}
            required={required}
            type="text"
            value={text}
          />
          <CalendarToggle
            aria-controls={open ? panelId : undefined}
            aria-expanded={open}
            aria-haspopup="dialog"
            aria-label="Abrir calendário"
            disabled={!interactive}
            disableRipple
            onClick={() => (open ? close() : openPanel())}
            ref={toggleRef}
          >
            <Icon name="today" />
          </CalendarToggle>
        </Field>
        {helper ? (
          <p className="date-picker-helper" id={helperId}>
            {helper}
          </p>
        ) : null}
        <Popper
          anchorEl={fieldRef.current}
          modifiers={[{ name: "offset", options: { offset: [0, 6] } }]}
          open={open}
          placement="bottom-start"
          sx={{ zIndex: 1300 }}
        >
          <ClickAwayListener onClickAway={() => close(false)}>
            <Panel
              aria-label={label}
              id={panelId}
              onKeyDown={onPanelKeyDown}
              ref={setPanelNode}
              role="dialog"
              sx={{ width: mode === "range" ? 520 : 320 }}
            >
              <div className="date-picker-header">
                <p aria-live="polite" className="date-picker-title">
                  {mode === "monthYear"
                    ? focused.year
                    : `${MONTHS[focused.month - 1]} de ${focused.year}`}
                </p>
                <div className="date-picker-nav">
                  <NavButton
                    aria-label={
                      mode === "monthYear" ? "Ano anterior" : "Mês anterior"
                    }
                    disableRipple
                    onClick={() =>
                      setFocused((current) =>
                        addMonths(current, -navigationStep),
                      )
                    }
                  >
                    <Icon name="chevron_left" />
                  </NavButton>
                  <NavButton
                    aria-label={
                      mode === "monthYear" ? "Próximo ano" : "Próximo mês"
                    }
                    disableRipple
                    onClick={() =>
                      setFocused((current) =>
                        addMonths(current, navigationStep),
                      )
                    }
                  >
                    <Icon name="chevron_right" />
                  </NavButton>
                </div>
              </div>

              {mode === "monthYear" ? (
                <div
                  aria-label={`Meses de ${focused.year}`}
                  className="date-picker-months"
                  onKeyDown={onGridKeyDown}
                  role="grid"
                >
                  {MONTHS_SHORT.map((month, index) => {
                    const current = index + 1;
                    const selected =
                      selection.month?.year === focused.year &&
                      selection.month?.month === current;
                    const isFocused = focused.month === current;
                    return (
                      <MonthCell
                        aria-label={`${MONTHS[index]} de ${focused.year}`}
                        aria-selected={selected}
                        className={
                          selected ? "date-picker-selected" : undefined
                        }
                        data-focused={isFocused}
                        disableRipple
                        key={month}
                        onClick={() => selectMonth(current)}
                        role="gridcell"
                        tabIndex={isFocused ? 0 : -1}
                      >
                        {month}
                      </MonthCell>
                    );
                  })}
                </div>
              ) : (
                <div
                  aria-label={`${MONTHS[focused.month - 1]} de ${focused.year}`}
                  className="date-picker-grid"
                  onKeyDown={onGridKeyDown}
                  role="grid"
                >
                  {WEEKDAYS.map((weekday, index) => (
                    <span
                      className="date-picker-weekday"
                      key={WEEKDAYS_FULL[index]}
                      role="columnheader"
                      title={WEEKDAYS_FULL[index]}
                    >
                      {weekday}
                    </span>
                  ))}
                  {monthMatrix(focused.year, focused.month)
                    .flat()
                    .map((day) => {
                      const selected = isSelected(day);
                      const isFocused = compareDays(day, focused) === 0;
                      return (
                        <DayCell
                          aria-label={formatDay(day)}
                          aria-selected={selected}
                          className={[
                            selected ? "date-picker-selected" : undefined,
                            inRange(day) ? "date-picker-in-range" : undefined,
                          ]
                            .filter(Boolean)
                            .join(" ")}
                          data-focused={isFocused}
                          disabled={isUnavailable(day)}
                          disableRipple
                          key={toIso(day)}
                          onClick={() => selectDay(day)}
                          role="gridcell"
                          tabIndex={isFocused ? 0 : -1}
                        >
                          {day.day}
                        </DayCell>
                      );
                    })}
                </div>
              )}

              {mode === "dateTime" ? (
                <>
                  <hr className="date-picker-divider" />
                  <div className="date-picker-time">
                    <label htmlFor={`${inputId}-hora`}>Hora</label>
                    <input
                      id={`${inputId}-hora`}
                      inputMode="numeric"
                      onChange={(event) => {
                        const time = maskTime(event.target.value);
                        commit({ ...selection, time });
                      }}
                      placeholder="HH:mm"
                      value={selection.time}
                    />
                    <span className="date-picker-time-hint">24 h</span>
                  </div>
                </>
              ) : null}
            </Panel>
          </ClickAwayListener>
        </Popper>
      </Root>
    );
  },
);
