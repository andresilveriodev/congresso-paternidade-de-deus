export function sanitizeText(value: string, maxLength = 500) {
  return value
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

export function sanitizePayload<T extends Record<string, unknown>>(payload: T): T {
  return Object.fromEntries(
    Object.entries(payload).map(([key, value]) => {
      if (Array.isArray(value)) {
        return [key, value.map((item) => (typeof item === "string" ? sanitizeText(item) : item))];
      }

      return [key, typeof value === "string" ? sanitizeText(value, 1500) : value];
    })
  ) as T;
}

