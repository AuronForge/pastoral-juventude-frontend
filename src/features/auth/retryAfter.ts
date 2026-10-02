/** Converts a valid server deadline; never supplies a fallback delay. */
export function parseRetryAfter(
  value: string | null,
  now = Date.now(),
): number | undefined {
  if (value === null || value.trim() === "") return undefined;
  const text = value.trim();
  if (/^\d+$/.test(text)) {
    const deadline = now + Number(text) * 1000;
    return Number.isSafeInteger(deadline) ? deadline : undefined;
  }
  // HTTP-date, not loose numeric strings accepted by Date.parse.
  if (
    !/^[A-Za-z]{3}, \d{2} [A-Za-z]{3} \d{4} \d{2}:\d{2}:\d{2} GMT$/.test(text)
  )
    return undefined;
  const deadline = Date.parse(text);
  return Number.isFinite(deadline) ? Math.max(now, deadline) : undefined;
}
