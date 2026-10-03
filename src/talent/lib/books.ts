import type { BankAccount, BASPeriod, Expense, Invoice, JournalEntry, Order } from "../types";

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

export function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function inBasPeriod(bas: BASPeriod, date: string): boolean {
  return Boolean(date) && date >= bas.startDate && date <= bas.endDate;
}

function canEdit(bas: BASPeriod): boolean {
  return bas.status !== "LOCKED" && bas.status !== "LODGED";
}

export function addSaleToBas(bas: BASPeriod, date: string, subtotal: number, gst: number, registered: boolean): BASPeriod {
  if (!registered || !canEdit(bas) || !inBasPeriod(bas, date)) return bas;
  const gst1a = round2(bas.gst1aSalesGst + gst);
  return {
    ...bas,
    g1TotalSales: round2(bas.g1TotalSales + subtotal + gst),
    gst1aSalesGst: gst1a,
    netGstPayable: round2(gst1a - bas.gst1bPurchaseGstCredits),
  };
}

export function addExportToBas(bas: BASPeriod, date: string, gross: number, feeExpenses: number): BASPeriod {
  if (!canEdit(bas) || !inBasPeriod(bas, date)) return bas;
  return {
    ...bas,
    g1TotalSales: round2(bas.g1TotalSales + gross),
    g2ExportSales: round2(bas.g2ExportSales + gross),
    g11NonCapitalPurchases: round2(bas.g11NonCapitalPurchases + feeExpenses),
  };
}

export function addPurchaseToBas(bas: BASPeriod, expense: Expense, registered: boolean): BASPeriod {
  if (!registered || !canEdit(bas) || !inBasPeriod(bas, expense.date)) return bas;
  const capital = /equipment|camera/i.test(expense.category);
  const gst1b = round2(bas.gst1bPurchaseGstCredits + expense.claimableGst);
  return {
    ...bas,
    g10CapitalPurchases: round2(bas.g10CapitalPurchases + (capital ? expense.claimableAmount : 0)),
    g11NonCapitalPurchases: round2(bas.g11NonCapitalPurchases + (capital ? 0 : expense.netAmount * (expense.businessUsePercentage / 100))),
    gst1bPurchaseGstCredits: gst1b,
    netGstPayable: round2(bas.gst1aSalesGst - gst1b),
  };
}

export function ensureOperating(accounts: BankAccount[]): { accounts: BankAccount[]; account: BankAccount } {
  const found = accounts.find((a) => a.type === "transaction") ?? accounts[0];
  if (found) return { accounts, account: found };
  const account: BankAccount = {
    id: "bnk-operating",
    bankName: "Your bank",
    accountName: "Operating account",
    bsb: "",
    accountNumber: "••••",
    balance: 0,
    type: "transaction",
    lastSynced: todayIso(),
  };
  return { accounts: [account], account };
}

export function creditAccount(accounts: BankAccount[], accountId: string, amount: number): BankAccount[] {
  return accounts.map((a) => (a.id === accountId ? { ...a, balance: round2(a.balance + amount) } : a));
}

export function paymentJournal(invoice: Invoice, date: string, entryNumber: string): JournalEntry {
  const gst = round2(invoice.gstTotal);
  const net = round2(invoice.subtotal);
  const total = round2(invoice.total);
  return {
    id: `jnl-pay-${invoice.id}`,
    entryNumber,
    date,
    reference: `Payment ${invoice.invoiceNumber}`,
    lines: [
      { accountId: "1000", accountCode: "1000", accountName: "Cash at bank", debit: total, credit: 0, description: "Invoice paid" },
      { accountId: "4000", accountCode: "4000", accountName: "Brand and service income", debit: 0, credit: net, description: invoice.invoiceNumber },
      { accountId: "2100", accountCode: "2100", accountName: "GST collected", debit: 0, credit: gst, description: "GST on the invoice" },
    ].filter((line) => line.debit > 0 || line.credit > 0),
    totalDebit: total,
    totalCredit: round2(net + gst),
    isBalanced: round2(net + gst) === total,
    isLocked: false,
    postedAt: new Date().toISOString(),
  };
}

export function payoutJournal(input: {
  id: string;
  platform: string;
  date: string;
  gross: number;
  platformFee: number;
  processing: number;
  commission: number;
  net: number;
  entryNumber: string;
}): JournalEntry {
  const fees = round2(input.platformFee + input.processing + input.commission);
  return {
    id: `jnl-${input.id}`,
    entryNumber: input.entryNumber,
    date: input.date,
    reference: `${input.platform} payout`,
    lines: [
      { accountId: "1000", accountCode: "1000", accountName: "Cash at bank", debit: input.net, credit: 0, description: "Net deposit" },
      { accountId: "6500", accountCode: "6500", accountName: "Platform and agency fees", debit: fees, credit: 0, description: "Cuts before the deposit" },
      { accountId: "4100", accountCode: "4100", accountName: "Platform income", debit: 0, credit: input.gross, description: "Gross fan spend" },
    ],
    totalDebit: round2(input.net + fees),
    totalCredit: round2(input.gross),
    isBalanced: round2(input.net + fees) === round2(input.gross),
    isLocked: false,
    postedAt: new Date().toISOString(),
  };
}

export function orderJournal(order: Order, entryNumber: string): JournalEntry {
  return {
    id: `jnl-${order.id}`,
    entryNumber,
    date: order.date,
    reference: order.orderNumber,
    lines: [
      { accountId: "1000", accountCode: "1000", accountName: "Cash at bank", debit: order.total, credit: 0, description: "Shop sale" },
      { accountId: "4200", accountCode: "4200", accountName: "Product sales", debit: 0, credit: order.subtotal, description: order.itemsSummary },
      { accountId: "2100", accountCode: "2100", accountName: "GST collected", debit: 0, credit: order.gstAmount, description: "GST on the sale" },
    ].filter((line) => line.debit > 0 || line.credit > 0),
    totalDebit: order.total,
    totalCredit: round2(order.subtotal + order.gstAmount),
    isBalanced: round2(order.subtotal + order.gstAmount) === round2(order.total),
    isLocked: false,
    postedAt: new Date().toISOString(),
  };
}

export function nextJournalNumber(existing: string[]): string {
  const max = existing.reduce((m, n) => {
    const parsed = Number(String(n).replace(/\D/g, "").slice(-4));
    return Number.isFinite(parsed) ? Math.max(m, parsed) : m;
  }, 0);
  return `JNL-2026-${String(max + 1).padStart(4, "0")}`;
}

/** Australian financial-year quarter that contains today. */
export function currentBasPeriod(): BASPeriod {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  let start: string;
  let end: string;
  let due: string;
  let label: string;
  if (month >= 6 && month <= 8) {
    start = `${year}-07-01`;
    end = `${year}-09-30`;
    due = `${year}-10-28`;
    label = `Q1 ${year}–${year + 1} (1 July – 30 September ${year})`;
  } else if (month >= 9) {
    start = `${year}-10-01`;
    end = `${year}-12-31`;
    due = `${year + 1}-02-28`;
    label = `Q2 ${year}–${year + 1} (1 October – 31 December ${year})`;
  } else if (month <= 2) {
    const fy = year - 1;
    start = `${year}-01-01`;
    end = `${year}-03-31`;
    due = `${year}-04-28`;
    label = `Q3 ${fy}–${year} (1 January – 31 March ${year})`;
  } else {
    const fy = year - 1;
    start = `${year}-04-01`;
    end = `${year}-06-30`;
    due = `${year}-07-28`;
    label = `Q4 ${fy}–${year} (1 April – 30 June ${year})`;
  }
  return {
    periodId: `bas-${start}`,
    label,
    startDate: start,
    endDate: end,
    dueDate: due,
    status: "OPEN",
    g1TotalSales: 0,
    g2ExportSales: 0,
    g3OtherGSTFree: 0,
    g10CapitalPurchases: 0,
    g11NonCapitalPurchases: 0,
    gst1aSalesGst: 0,
    gst1bPurchaseGstCredits: 0,
    netGstPayable: 0,
    w1TotalWages: 0,
    w2WithheldAmount: 0,
    accountantNotes: "Figures update when you invoice, get paid, or record an expense in this quarter.",
  };
}
