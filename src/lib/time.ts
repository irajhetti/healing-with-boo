/**
 * Convert "YYYY-MM-DD" + "HH:mm" interpreted as London wall-clock time to a real UTC Date.
 * Uses Intl.DateTimeFormat.formatToParts deterministically — no locale-string parsing.
 */
export function londonTimeToUTC(dateStr: string, timeStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  const [hour, minute] = timeStr.split(":").map(Number);

  const naiveUtcMs = Date.UTC(year, month - 1, day, hour, minute, 0);

  const dtf = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const parts = Object.fromEntries(
    dtf.formatToParts(new Date(naiveUtcMs)).map((p) => [p.type, p.value]),
  );
  const londonAsUtcMs = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour) === 24 ? 0 : Number(parts.hour),
    Number(parts.minute),
    Number(parts.second),
  );
  const offsetMs = londonAsUtcMs - naiveUtcMs;
  return new Date(naiveUtcMs - offsetMs);
}

/**
 * Add N days to a "YYYY-MM-DD" date string, returning another "YYYY-MM-DD" string.
 * Operates on London calendar dates.
 */
export function addDays(dateStr: string, days: number): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}
