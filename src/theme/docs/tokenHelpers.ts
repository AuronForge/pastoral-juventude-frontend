export function toKebabCase(value: string) {
  return value.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

export function flattenTokens(
  value: Record<string, unknown>,
  prefix = "",
): Array<[string, string | number]> {
  return Object.entries(value).flatMap(([key, token]) => {
    const path = prefix ? `${prefix}/${toKebabCase(key)}` : toKebabCase(key);

    if (typeof token === "string" || typeof token === "number") {
      return [[path, token] as [string, string | number]];
    }

    return flattenTokens(token as Record<string, unknown>, path);
  });
}
