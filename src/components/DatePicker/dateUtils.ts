/** Utilitários de data em convenção brasileira, sem conversão de fuso. */

export const MONTHS = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
] as const;

export const MONTHS_SHORT = MONTHS.map((month) => month.slice(0, 3));

/** Semana iniciada no domingo, como no Figma. */
export const WEEKDAYS = ["D", "S", "T", "Q", "Q", "S", "S"] as const;
export const WEEKDAYS_FULL = [
  "domingo",
  "segunda-feira",
  "terça-feira",
  "quarta-feira",
  "quinta-feira",
  "sexta-feira",
  "sábado",
] as const;

export type DayParts = { year: number; month: number; day: number };

const pad = (value: number, size = 2) => String(value).padStart(size, "0");

export function daysInMonth(year: number, month: number) {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

export function isValidDay({ year, month, day }: DayParts) {
  return (
    year >= 1 &&
    month >= 1 &&
    month <= 12 &&
    day >= 1 &&
    day <= daysInMonth(year, month)
  );
}

export function toIso({ year, month, day }: DayParts) {
  return `${pad(year, 4)}-${pad(month)}-${pad(day)}`;
}

export function fromIso(value: string | undefined | null): DayParts | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/u.exec(value ?? "");
  if (!match) return null;
  const parts = { year: +match[1], month: +match[2], day: +match[3] };
  return isValidDay(parts) ? parts : null;
}

/** DD/MM/AAAA */
export function formatDay(parts: DayParts) {
  return `${pad(parts.day)}/${pad(parts.month)}/${pad(parts.year, 4)}`;
}

export function parseDay(text: string): DayParts | null {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/u.exec(text.trim());
  if (!match) return null;
  const parts = { day: +match[1], month: +match[2], year: +match[3] };
  return isValidDay(parts) ? parts : null;
}

export function compareDays(a: DayParts, b: DayParts) {
  return toIso(a).localeCompare(toIso(b));
}

export function addDays(parts: DayParts, amount: number): DayParts {
  const date = new Date(
    Date.UTC(parts.year, parts.month - 1, parts.day + amount),
  );
  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
  };
}

export function addMonths(parts: DayParts, amount: number): DayParts {
  const index = parts.year * 12 + (parts.month - 1) + amount;
  const year = Math.floor(index / 12);
  const month = (index % 12) + 1;
  return { year, month, day: Math.min(parts.day, daysInMonth(year, month)) };
}

/** Semanas visíveis do mês (6 × 7), começando no domingo. */
export function monthMatrix(year: number, month: number): DayParts[][] {
  const first = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
  const start = addDays({ year, month, day: 1 }, -first);
  const weeks: DayParts[][] = [];
  const total = first + daysInMonth(year, month);
  const rows = Math.ceil(total / 7);
  for (let week = 0; week < rows; week += 1) {
    weeks.push(
      Array.from({ length: 7 }, (_, day) => addDays(start, week * 7 + day)),
    );
  }
  return weeks;
}

/** Aplica a máscara DD/MM/AAAA aos dígitos digitados. */
export function maskDay(digits: string) {
  const value = digits.replace(/\D/gu, "").slice(0, 8);
  return [value.slice(0, 2), value.slice(2, 4), value.slice(4, 8)]
    .filter(Boolean)
    .join("/");
}

/** Aplica a máscara MM/AAAA. */
export function maskMonth(digits: string) {
  const value = digits.replace(/\D/gu, "").slice(0, 6);
  return [value.slice(0, 2), value.slice(2, 6)].filter(Boolean).join("/");
}

/** Aplica a máscara HH:mm. */
export function maskTime(digits: string) {
  const value = digits.replace(/\D/gu, "").slice(0, 4);
  return [value.slice(0, 2), value.slice(2, 4)].filter(Boolean).join(":");
}

export function isValidTime(text: string) {
  const match = /^(\d{2}):(\d{2})$/u.exec(text);
  return Boolean(match && +match[1] <= 23 && +match[2] <= 59);
}

export function todayParts(): DayParts {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
  };
}
