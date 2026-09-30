// Demo books are anchored to late September 2026.
export const TODAY = new Date("2026-09-29T09:00:00");

const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_LONG = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** Whole-dollar currency, e.g. $8,420 */
export function aud(amount: number): string {
  const rounded = Math.round(amount);
  const sign = rounded < 0 ? "-" : "";
  return sign + "$" + Math.abs(rounded).toLocaleString("en-AU");
}

/** Signed whole-dollar currency for money movement, e.g. +$840 / -$120 */
export function audSigned(amount: number): string {
  const sign = amount < 0 ? "-" : "+";
  return sign + "$" + Math.abs(Math.round(amount)).toLocaleString("en-AU");
}

/** Currency with cents, e.g. $129.00 */
export function audCents(amount: number): string {
  const sign = amount < 0 ? "-" : "";
  return sign + "$" + Math.abs(amount).toLocaleString("en-AU", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function parse(iso: string): Date {
  return new Date(iso.length <= 10 ? iso + "T00:00:00" : iso);
}

/** e.g. "12 Oct" */
export function shortDate(iso: string): string {
  const d = parse(iso);
  return `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]}`;
}

/** e.g. "12 October 2026" */
export function longDate(iso: string): string {
  const d = parse(iso);
  return `${d.getDate()} ${MONTHS_LONG[d.getMonth()]} ${d.getFullYear()}`;
}

/** Positive = in the future. */
export function daysUntil(iso: string): number {
  const d = parse(iso);
  return Math.round((d.getTime() - TODAY.getTime()) / 86_400_000);
}

/** 'YYYY-MM' bucket for grouping by month. */
export function monthKey(iso: string): string {
  return parse(iso).toISOString().slice(0, 7);
}

export function isSameMonth(iso: string, ref: Date): boolean {
  const d = parse(iso);
  return d.getFullYear() === ref.getFullYear() && d.getMonth() === ref.getMonth();
}

export function relativeDay(iso: string): string {
  const days = daysUntil(iso);
  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  if (days === -1) return "Yesterday";
  if (days > 1 && days <= 14) return `In ${days} days`;
  if (days < -1 && days >= -14) return `${Math.abs(days)} days ago`;
  return shortDate(iso);
}

/** Past-due issued invoices read as overdue even if the stored status was not rewritten. */
export function shownInvoiceStatus(status: string, due: string): string {
  const today = new Date().toISOString().slice(0, 10);
  if ((status === "issued" || status === "overdue") && due && due < today) return "overdue";
  return status;
}

export function nextInvoiceNumber(numbers: string[]): string {
  const max = numbers.reduce((m, n) => {
    const parsed = Number(String(n).slice(-6));
    return Number.isFinite(parsed) ? Math.max(m, parsed) : m;
  }, 0);
  return `INV-2026-${String(max + 1).padStart(6, "0")}`;
}
