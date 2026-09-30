import React, { createContext, useContext, useMemo, useState, useCallback } from "react";
import {
  SEED_BUSINESS,
  SEED_CREATOR,
  SEED_TAX_PROFILE,
  SEED_CLIENTS,
  SEED_BOOKINGS,
  SEED_INVOICES,
  SEED_ORDERS,
  SEED_PLATFORM_PAYOUTS,
  SEED_EXPENSES,
  SEED_BANK_ACCOUNTS,
  SEED_BAS_PERIOD,
  SEED_OBLIGATIONS,
  SEED_DOCUMENTS,
} from "../data/seedData";
import { TODAY, isSameMonth } from "./format";

/* ------------------------------------------------------------------ */
/*  Creator-facing (jargon-free) view models                          */
/* ------------------------------------------------------------------ */

export type IncomeSource =
  | "brand_deal"
  | "platform"
  | "modelling"
  | "ugc"
  | "affiliate"
  | "product"
  | "tip"
  | "other";

export interface IncomeItem {
  id: string;
  date: string;
  source: IncomeSource;
  label: string;
  sublabel?: string;
  amount: number;
}

export interface ExpenseItem {
  id: string;
  date: string;
  supplier: string;
  category: string;
  amount: number;
  businessUse: number; // 0-100
  hasReceipt: boolean;
  needsReview: boolean;
  note?: string;
}

export type JobStage =
  | "Enquiry"
  | "Quote"
  | "Accepted"
  | "Scheduled"
  | "Completed"
  | "Invoiced"
  | "Paid";

export interface JobItem {
  id: string;
  title: string;
  customer: string;
  fee: number;
  date: string;
  stage: JobStage;
  work: string;
  usage?: string;
  contractSigned: boolean;
  invoiceCreated: boolean;
  location?: string;
}

export type InvoiceState = "draft" | "waiting" | "overdue" | "paid";

export interface InvoiceItem {
  id: string;
  number: string;
  customer: string;
  amount: number;
  due: string;
  issued: string;
  state: InvoiceState;
  isTaxInvoice: boolean;
}

export interface DocItem {
  id: string;
  title: string;
  category: string;
  filename: string;
  size: string;
  date: string;
  sensitive: boolean;
}

export type TaskTone = "ok" | "warn" | "alert" | "info";

export interface TaskItem {
  id: string;
  tone: TaskTone;
  title: string;
  summary: string;
  why: string;
  source: string;
  lastChecked: string;
  action?: string;
  due?: string;
}

export interface Profile {
  displayName: string;
  businessName: string;
  legalName: string;
  state: string;
  gstRegistered: boolean;
  discreetMode: boolean;
  industry: string;
}

/* ------------------------------------------------------------------ */
/*  Derivations from seed data                                        */
/* ------------------------------------------------------------------ */

const clientName = (id: string) =>
  SEED_CLIENTS.find((c) => c.id === id)?.tradingName ?? "Customer";

function sourceForBooking(type: string): IncomeSource {
  switch (type) {
    case "modelling":
      return "modelling";
    case "ugc":
      return "ugc";
    default:
      return "brand_deal";
  }
}

function deriveIncome(): IncomeItem[] {
  const fromPayouts: IncomeItem[] = SEED_PLATFORM_PAYOUTS.map((p) => ({
    id: `inc-${p.id}`,
    date: p.depositDate,
    source: "platform",
    label: p.platform,
    sublabel: "Platform payment",
    amount: p.netPayout,
  }));

  const fromOrders: IncomeItem[] = SEED_ORDERS.filter((o) => o.status !== "refunded").map((o) => ({
    id: `inc-${o.id}`,
    date: o.date,
    source: o.channel === "affiliate" ? "affiliate" : "product",
    label: o.channel === "affiliate" ? "Affiliate" : "Product sale",
    sublabel: o.itemsSummary,
    amount: o.total,
  }));

  const fromPaidInvoices: IncomeItem[] = SEED_INVOICES.filter((i) => i.status === "paid").map((i) => {
    const booking = SEED_BOOKINGS.find((b) => b.id === i.bookingId);
    return {
      id: `inc-${i.id}`,
      date: i.paidDate ?? i.issueDate,
      source: booking ? sourceForBooking(booking.bookingType) : "brand_deal",
      label: clientName(i.clientId),
      sublabel: "Brand deal",
      amount: i.total,
    };
  });

  return [...fromPayouts, ...fromOrders, ...fromPaidInvoices].sort(
    (a, b) => +new Date(b.date) - +new Date(a.date)
  );
}

function deriveExpenses(): ExpenseItem[] {
  return SEED_EXPENSES.map((e) => ({
    id: e.id,
    date: e.date,
    supplier: e.supplier,
    category: e.category,
    amount: e.grossAmount,
    businessUse: e.businessUsePercentage,
    hasReceipt: !!e.receiptName,
    needsReview: e.deductibilityConfidence !== "HIGH",
    note: e.taxNotes,
  })).sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

function stageForBooking(status: string): JobStage {
  switch (status) {
    case "lead":
      return "Enquiry";
    case "quote":
    case "negotiation":
      return "Quote";
    case "confirmed":
      return "Accepted";
    case "delivery":
      return "Scheduled";
    case "invoiced":
      return "Invoiced";
    case "paid":
      return "Paid";
    default:
      return "Completed";
  }
}

function deriveJobs(): JobItem[] {
  return SEED_BOOKINGS.map((b) => ({
    id: b.id,
    title: b.campaignName,
    customer: clientName(b.clientId),
    fee: b.fee,
    date: b.startDate,
    stage: stageForBooking(b.status),
    work: b.deliverables.join(" · "),
    usage: b.usageRights,
    contractSigned: ["confirmed", "delivery", "invoiced", "paid", "completed"].includes(b.status),
    invoiceCreated: !!b.invoiceId,
    location: b.isRemote ? "Remote" : b.location,
  })).sort((a, b) => +new Date(a.date) - +new Date(b.date));
}

function deriveInvoices(): InvoiceItem[] {
  const real: InvoiceItem[] = SEED_INVOICES.map((i) => {
    let state: InvoiceState;
    if (i.status === "paid") state = "paid";
    else if (i.status === "draft") state = "draft";
    else state = new Date(i.dueDate) < TODAY ? "overdue" : "waiting";
    return {
      id: i.id,
      number: "#" + i.invoiceNumber.slice(-3),
      customer: clientName(i.clientId),
      amount: i.total,
      due: i.dueDate,
      issued: i.issueDate,
      state,
      isTaxInvoice: i.isTaxInvoice,
    };
  });

  // A representative overdue invoice so the Get Paid flow has a reminder to send.
  const overdue: InvoiceItem = {
    id: "inv-2026-104",
    number: "#104",
    customer: "MECCA",
    amount: 2400,
    due: "2026-09-10",
    issued: "2026-08-27",
    state: "overdue",
    isTaxInvoice: true,
  };

  return [overdue, ...real].sort((a, b) => +new Date(b.issued) - +new Date(a.issued));
}

function deriveDocs(): DocItem[] {
  return SEED_DOCUMENTS.map((d) => ({
    id: d.id,
    title: d.title,
    category: d.category,
    filename: d.filename,
    size: d.fileSize,
    date: d.uploadDate,
    sensitive: d.isSensitiveVault,
  })).sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

function toneForStatus(status: string): TaskTone {
  switch (status) {
    case "READY":
      return "ok";
    case "APPROACHING":
      return "info";
    case "REVIEW_REQUIRED":
      return "warn";
    case "ACTION_REQUIRED":
      return "alert";
    default:
      return "info";
  }
}

const AUTHORITY_LABEL: Record<string, string> = {
  ABR: "Australian Business Register",
  ASIC: "ASIC",
  ATO: "Australian Taxation Office",
  WORKFORCE: "Australian Taxation Office",
  DOCUMENTS: "Australian Taxation Office",
};

function deriveTasks(): TaskItem[] {
  return SEED_OBLIGATIONS.map((o) => ({
    id: o.id,
    tone: toneForStatus(o.status),
    title: o.title,
    summary: o.summary,
    why: o.whyExplanation,
    source: AUTHORITY_LABEL[o.authority] ?? o.authority,
    lastChecked: "23 Sep 2026",
    action: o.actionRequired,
    due: o.dueDate,
  }));
}

/* ------------------------------------------------------------------ */
/*  Store context                                                     */
/* ------------------------------------------------------------------ */

export interface Toast {
  id: number;
  title: string;
  body?: string;
}

interface StoreValue {
  profile: Profile;
  setProfile: (p: Partial<Profile>) => void;

  income: IncomeItem[];
  expenses: ExpenseItem[];
  jobs: JobItem[];
  invoices: InvoiceItem[];
  documents: DocItem[];
  tasks: TaskItem[];

  addIncome: (i: Omit<IncomeItem, "id">) => void;
  addExpense: (e: Omit<ExpenseItem, "id">) => void;
  addJob: (j: Omit<JobItem, "id">) => void;
  remindInvoice: (id: string) => void;
  markInvoicePaid: (id: string) => void;

  toasts: Toast[];
  notify: (title: string, body?: string) => void;
  dismissToast: (id: number) => void;

  taxReserve: number;
  metrics: Metrics;
}

export interface Metrics {
  moneyInMonth: number;
  moneyOutMonth: number;
  moneyInLastMonth: number;
  waiting: number;
  overdue: number;
  collectedThisMonth: number;
  revenueDeltaPct: number;
  upcomingJobs: number;
  completedJobs: number;
  unpaidInvoicesTotal: number;
  newCustomers: number;
  repeatCustomers: number;
  incomeBySource: { source: IncomeSource; label: string; amount: number; pct: number }[];
  gstTurnover: number;
  gstThreshold: number;
}

const SOURCE_LABELS: Record<IncomeSource, string> = {
  brand_deal: "Brand deals",
  platform: "Platforms",
  modelling: "Modelling",
  ugc: "UGC",
  affiliate: "Affiliate",
  product: "Products",
  tip: "Tips",
  other: "Other",
};

const StoreContext = createContext<StoreValue | null>(null);

let toastSeq = 1;

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfileState] = useState<Profile>({
    displayName: SEED_CREATOR.creatorHandle.replace("@", "").replace(/^\w/, (c) => c.toUpperCase()),
    businessName: SEED_BUSINESS.businessName,
    legalName: SEED_BUSINESS.legalName,
    state: "NSW",
    gstRegistered: SEED_TAX_PROFILE.gstRegistered,
    discreetMode: SEED_CREATOR.discreetMode,
    industry: "Creator",
  });

  const [income, setIncome] = useState<IncomeItem[]>(deriveIncome);
  const [expenses, setExpenses] = useState<ExpenseItem[]>(deriveExpenses);
  const [jobs, setJobs] = useState<JobItem[]>(deriveJobs);
  const [invoices, setInvoices] = useState<InvoiceItem[]>(deriveInvoices);
  const [documents] = useState<DocItem[]>(deriveDocs);
  const [tasks] = useState<TaskItem[]>(deriveTasks);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const taxReserve =
    SEED_BANK_ACCOUNTS.find((a) => a.type === "tax_reserve")?.balance ?? 0;

  const notify = useCallback((title: string, body?: string) => {
    const id = toastSeq++;
    setToasts((prev) => [...prev, { id, title, body }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4200);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const setProfile = useCallback((p: Partial<Profile>) => {
    setProfileState((prev) => ({ ...prev, ...p }));
  }, []);

  const addIncome = useCallback((i: Omit<IncomeItem, "id">) => {
    setIncome((prev) => [{ ...i, id: `inc-${Date.now()}` }, ...prev]);
  }, []);

  const addExpense = useCallback((e: Omit<ExpenseItem, "id">) => {
    setExpenses((prev) => [{ ...e, id: `exp-${Date.now()}` }, ...prev]);
  }, []);

  const addJob = useCallback((j: Omit<JobItem, "id">) => {
    setJobs((prev) => [{ ...j, id: `job-${Date.now()}` }, ...prev]);
  }, []);

  const remindInvoice = useCallback(
    (id: string) => {
      const inv = invoices.find((i) => i.id === id);
      notify("Reminder sent", inv ? `We nudged ${inv.customer} about invoice ${inv.number}.` : undefined);
    },
    [invoices, notify]
  );

  const markInvoicePaid = useCallback(
    (id: string) => {
      setInvoices((prev) => prev.map((i) => (i.id === id ? { ...i, state: "paid" } : i)));
      notify("Marked as paid", "Nice — that money is in.");
    },
    [notify]
  );

  const metrics = useMemo<Metrics>(() => {
    const lastMonth = new Date(TODAY.getFullYear(), TODAY.getMonth() - 1, 1);

    const moneyInMonth = income.filter((i) => isSameMonth(i.date, TODAY)).reduce((s, i) => s + i.amount, 0);
    const moneyInLastMonth = income.filter((i) => isSameMonth(i.date, lastMonth)).reduce((s, i) => s + i.amount, 0);
    const moneyOutMonth = expenses.filter((e) => isSameMonth(e.date, TODAY)).reduce((s, e) => s + e.amount, 0);

    const waiting = invoices.filter((i) => i.state === "waiting" || i.state === "overdue").reduce((s, i) => s + i.amount, 0);
    const overdue = invoices.filter((i) => i.state === "overdue").reduce((s, i) => s + i.amount, 0);
    const collectedThisMonth = moneyInMonth;

    const revenueDeltaPct = moneyInLastMonth > 0
      ? Math.round(((moneyInMonth - moneyInLastMonth) / moneyInLastMonth) * 100)
      : 0;

    const upcomingJobs = jobs.filter((j) => !["Paid", "Completed"].includes(j.stage)).length;
    const completedJobs = jobs.filter((j) => ["Paid", "Completed"].includes(j.stage)).length + 15;
    const unpaidInvoicesTotal = waiting;

    // Income by source
    const totals = new Map<IncomeSource, number>();
    for (const i of income) totals.set(i.source, (totals.get(i.source) ?? 0) + i.amount);
    const grand = [...totals.values()].reduce((s, v) => s + v, 0) || 1;
    const incomeBySource = [...totals.entries()]
      .map(([source, amount]) => ({ source, label: SOURCE_LABELS[source], amount, pct: Math.round((amount / grand) * 100) }))
      .sort((a, b) => b.amount - a.amount);

    return {
      moneyInMonth,
      moneyOutMonth,
      moneyInLastMonth,
      waiting,
      overdue,
      collectedThisMonth,
      revenueDeltaPct,
      upcomingJobs,
      completedJobs,
      unpaidInvoicesTotal,
      newCustomers: 3,
      repeatCustomers: 8,
      incomeBySource,
      gstTurnover: 68200,
      gstThreshold: 75000,
    };
  }, [income, expenses, invoices, jobs]);

  const value: StoreValue = {
    profile,
    setProfile,
    income,
    expenses,
    jobs,
    invoices,
    documents,
    tasks,
    addIncome,
    addExpense,
    addJob,
    remindInvoice,
    markInvoicePaid,
    toasts,
    notify,
    dismissToast,
    taxReserve,
    metrics,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

export { SOURCE_LABELS };
