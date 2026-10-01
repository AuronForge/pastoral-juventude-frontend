import { parseRetryAfter } from "./retryAfter";

describe("Retry-After", () => {
  it.each([
    null,
    "",
    "abc",
    "-1",
    "1.5",
    "Infinity",
    "999999999999999999999",
    "Wed, 99 Foo 2026 00:00:00 GMT",
  ])("não inventa prazo para %s", (value) => {
    expect(parseRetryAfter(value, 1000)).toBeUndefined();
  });
  it("usa segundos a partir da resposta e aceita zero", () => {
    expect(parseRetryAfter(" 73 ", 1000)).toBe(74000);
    expect(parseRetryAfter("0", 1000)).toBe(1000);
  });
  it("aceita HTTP-date e limita datas passadas ao instante atual", () => {
    const date = "Thu, 01 Oct 2026 12:00:00 GMT";
    const timestamp = Date.parse(date);
    expect(parseRetryAfter(date, timestamp - 1000)).toBe(timestamp);
    expect(parseRetryAfter(date, timestamp + 1000)).toBe(timestamp + 1000);
  });
});
