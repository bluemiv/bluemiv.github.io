const YEAR_MONTH_PATTERN = /^(\d{4})-(0[1-9]|1[0-2])$/;

function parseYearMonth(yearMonth: string): { year: number; month: number } {
  const match = YEAR_MONTH_PATTERN.exec(yearMonth);

  if (!match) throw new RangeError(`Invalid year-month: ${yearMonth}`);

  return {
    year: Number(match[1]),
    month: Number(match[2]),
  };
}

export function formatYearMonth(date: Date, timeZone: string): string {
  if (Number.isNaN(date.getTime())) throw new RangeError("Invalid date");

  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      timeZone,
    })
      .formatToParts(date)
      .map(({ type, value }) => [type, value]),
  );

  return `${parts.year}-${parts.month}`;
}

export function calculateCareerMonthOrdinal(startMonth: string, currentMonth: string): number {
  const start = parseYearMonth(startMonth);
  const current = parseYearMonth(currentMonth);
  const elapsedMonths = (current.year - start.year) * 12 + (current.month - start.month);

  if (elapsedMonths < 0) {
    throw new RangeError("Current month cannot be earlier than career start month");
  }

  return elapsedMonths + 1;
}
