// ─────────────────────────────────────────────
// Formatter utilities
// ─────────────────────────────────────────────

/** Format a number as EUR currency, abbreviated (e.g. €182M, €4.2M) */
export function formatCurrency(value: number): string {
  if (Math.abs(value) >= 1_000_000_000) {
    return `€${(value / 1_000_000_000).toFixed(1)}B`;
  }
  if (Math.abs(value) >= 1_000_000) {
    return `€${(value / 1_000_000).toFixed(1)}M`;
  }
  if (Math.abs(value) >= 1_000) {
    return `€${(value / 1_000).toFixed(0)}K`;
  }
  return `€${value.toFixed(0)}`;
}

/** Format a percentage value (e.g. 18.4 → "18.4%") */
export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/** Format a multiple (e.g. 1.72 → "1.72x") */
export function formatMultiple(value: number, decimals = 2): string {
  return `${value.toFixed(decimals)}x`;
}

/** Format a month string "YYYY-MM" → "Jan 24" */
export function formatMonth(month: string): string {
  const [year, mon] = month.split("-");
  const date = new Date(Number(year), Number(mon) - 1, 1);
  return date.toLocaleDateString("en-GB", {
    month: "short",
    year: "2-digit",
  });
}

/** Format an investment date "YYYY-MM-DD" → "Mar 2020" */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}

/** Format NAV tooltip value in full (e.g. €182,000,000) */
export function formatCurrencyFull(value: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}