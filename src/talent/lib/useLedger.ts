import { useCallback, useEffect, useRef, useState } from "react";
import type { Booking, Client, Expense, Invoice, JournalEntry, ObligationItem, PlatformPayout, Product, Quote } from "../types";
import { nextInvoiceNumber } from "./format";
import {
  demoWorkspace,
  emptyWorkspace,
  loadWorkspace,
  saveWorkspace,
  todayIso,
  type Workspace,
} from "./workspace";

export function useLedger(userId: string | null, demo: boolean) {
  const [workspace, setWorkspace] = useState<Workspace>(() => emptyWorkspace());
  const [ready, setReady] = useState(false);
  const hydratedFor = useRef<string | null>(null);

  useEffect(() => {
    if (!userId) {
      hydratedFor.current = null;
      setWorkspace(emptyWorkspace());
      setReady(false);
      return;
    }
    const saved = loadWorkspace(userId);
    const next = saved ?? (demo || userId === "demo-kira" ? demoWorkspace() : emptyWorkspace());
    hydratedFor.current = null;
    setWorkspace(next);
    setReady(true);
  }, [userId, demo]);

  useEffect(() => {
    if (!userId || !ready) return;
    if (hydratedFor.current !== userId) {
      hydratedFor.current = userId;
      return;
    }
    saveWorkspace(userId, workspace);
  }, [userId, ready, workspace]);

  const patch = useCallback((fn: (prev: Workspace) => Workspace) => {
    setWorkspace((prev) => fn(prev));
  }, []);

  const completeOnboarding = useCallback(
    (data: Pick<Workspace, "business" | "creator" | "taxProfile" | "operatingProfile">) => {
      patch((prev) => ({ ...prev, ...data, onboarded: true }));
    },
    [patch],
  );

  const restartOnboarding = useCallback(() => {
    patch((prev) => ({ ...prev, onboarded: false }));
  }, [patch]);

  const resetDemo = useCallback(() => {
    const fresh = demoWorkspace();
    setWorkspace(fresh);
  }, []);

  const addBooking = useCallback((booking: Booking) => {
    patch((prev) => ({ ...prev, bookings: [booking, ...prev.bookings] }));
  }, [patch]);

  const addClient = useCallback((client: Client) => {
    patch((prev) => ({ ...prev, clients: [...prev.clients, client] }));
  }, [patch]);

  const updateBookingStatus = useCallback((bookingId: string, status: Booking["status"]) => {
    patch((prev) => ({
      ...prev,
      bookings: prev.bookings.map((b) => (b.id === bookingId ? { ...b, status } : b)),
    }));
  }, [patch]);

  const addInvoice = useCallback((invoice: Invoice) => {
    patch((prev) => ({ ...prev, invoices: [invoice, ...prev.invoices] }));
  }, [patch]);

  const addExpense = useCallback((expense: Expense) => {
    patch((prev) => {
      const account = prev.bankAccounts.find((a) => a.type === "transaction") ?? prev.bankAccounts[0];
      const txn = account
        ? {
            id: `txn-${expense.id}`,
            bankAccountId: account.id,
            date: expense.date,
            description: `${expense.supplier} — ${expense.description}`,
            amount: -Math.abs(expense.grossAmount),
            status: "CATEGORISED" as const,
            matchedType: "expense" as const,
            matchedId: expense.id,
          }
        : null;
      return {
        ...prev,
        expenses: [{ ...expense, bankTransactionId: txn?.id, isReconciled: false }, ...prev.expenses],
        bankTransactions: txn ? [txn, ...prev.bankTransactions] : prev.bankTransactions,
        bankAccounts: account
          ? prev.bankAccounts.map((a) =>
              a.id === account.id ? { ...a, balance: Math.round((a.balance - expense.grossAmount) * 100) / 100 } : a,
            )
          : prev.bankAccounts,
        documents: expense.receiptName
          ? [
              {
                id: `doc-${expense.id}`,
                title: expense.receiptName,
                category: "receipt" as const,
                filename: expense.receiptName,
                fileSize: "scan",
                uploadDate: expense.date || todayIso(),
                retentionUntil: `${Number((expense.date || todayIso()).slice(0, 4)) + 5}-06-30`,
                isSensitiveVault: false,
                linkedTransactionId: expense.id,
              },
              ...prev.documents,
            ]
          : prev.documents,
      };
    });
  }, [patch]);

  const reconcileTransaction = useCallback((txnId: string) => {
    patch((prev) => ({
      ...prev,
      bankTransactions: prev.bankTransactions.map((t) =>
        t.id === txnId ? { ...t, status: "RECONCILED" } : t,
      ),
      expenses: prev.expenses.map((e) => (e.bankTransactionId === txnId ? { ...e, isReconciled: true } : e)),
    }));
  }, [patch]);

  const addJournalEntry = useCallback((entry: JournalEntry) => {
    patch((prev) => ({ ...prev, journalEntries: [entry, ...prev.journalEntries] }));
  }, [patch]);

  const addProduct = useCallback((product: Product) => {
    patch((prev) => ({ ...prev, products: [product, ...prev.products] }));
  }, [patch]);

  const addPayout = useCallback((payout: PlatformPayout) => {
    patch((prev) => ({ ...prev, payouts: [payout, ...prev.payouts] }));
  }, [patch]);

  const lockBasPeriod = useCallback(() => {
    patch((prev) => ({
      ...prev,
      basPeriod: { ...prev.basPeriod, status: "LOCKED", lockedAt: new Date().toISOString() },
    }));
  }, [patch]);

  const updateObligation = useCallback((updated: ObligationItem) => {
    patch((prev) => ({
      ...prev,
      obligations: prev.obligations.map((o) => (o.id === updated.id ? updated : o)),
    }));
  }, [patch]);

  const addDocument = useCallback((doc: Workspace["documents"][number]) => {
    patch((prev) => ({ ...prev, documents: [doc, ...prev.documents] }));
  }, [patch]);

  const convertBookingToInvoice = useCallback((booking: Booking) => {
    let created: Invoice | null = null;
    patch((prev) => {
      const current = prev.bookings.find((b) => b.id === booking.id);
      if (!current || current.status === "invoiced" || current.status === "paid" || current.invoiceId) return prev;
      const isTaxInvoice = prev.taxProfile.gstRegistered;
      const gstTotal = isTaxInvoice
        ? booking.gstInclusive
          ? booking.gstAmount
          : Math.round(booking.fee * 0.1 * 100) / 100
        : 0;
      const subtotal =
        isTaxInvoice && booking.gstInclusive
          ? Math.round((booking.fee - gstTotal) * 100) / 100
          : booking.fee;
      const total = Math.round((subtotal + gstTotal) * 100) / 100;
      created = {
        id: `inv-${Date.now()}`,
        invoiceNumber: nextInvoiceNumber(prev.invoices.map((i) => i.invoiceNumber)),
        clientId: booking.clientId,
        bookingId: booking.id,
        isTaxInvoice,
        issueDate: todayIso(),
        dueDate: new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10),
        items: [
          {
            id: `itm-${Date.now()}`,
            description: `${booking.campaignName} — ${booking.deliverables.join(", ")}`,
            quantity: 1,
            unitPrice: subtotal,
            gstRate: isTaxInvoice ? 0.1 : 0,
            amount: subtotal,
          },
        ],
        subtotal,
        gstTotal,
        total,
        status: "issued",
        notes: `Raised from booking ${booking.id}. Usage: ${booking.usageRights}. Payment due in 14 days.`,
        auditTrail: [`Raised from booking ${booking.id} on ${todayIso()}`],
      };
      return {
        ...prev,
        invoices: [created, ...prev.invoices],
        bookings: prev.bookings.map((b) =>
          b.id === booking.id ? { ...b, status: "invoiced", invoiceId: created!.id } : b,
        ),
      };
    });
    return created;
  }, [patch]);

  const convertQuoteToInvoice = useCallback((quote: Quote) => {
    patch((prev) => {
      if (quote.status === "converted") return prev;
      const isTaxInvoice = prev.taxProfile.gstRegistered;
      const invoice: Invoice = {
        id: `inv-${Date.now()}`,
        invoiceNumber: nextInvoiceNumber(prev.invoices.map((i) => i.invoiceNumber)),
        clientId: quote.clientId,
        isTaxInvoice,
        issueDate: todayIso(),
        dueDate: new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10),
        items: [
          {
            id: `itm-${Date.now()}`,
            description: `Quote ${quote.quoteNumber}: ${quote.deliverables.join(" · ")}`,
            quantity: 1,
            unitPrice: quote.subtotal,
            gstRate: isTaxInvoice ? 0.1 : 0,
            amount: quote.subtotal,
          },
        ],
        subtotal: quote.subtotal,
        gstTotal: isTaxInvoice ? quote.gstAmount : 0,
        total: isTaxInvoice ? quote.total : quote.subtotal,
        status: "issued",
        notes: `Converted from accepted quote ${quote.quoteNumber}. Usage: ${quote.usageRights}`,
        auditTrail: [`Converted from quote ${quote.quoteNumber}`],
      };
      return {
        ...prev,
        invoices: [invoice, ...prev.invoices],
        quotes: prev.quotes.map((q) =>
          q.id === quote.id ? { ...q, status: "converted", convertedInvoiceId: invoice.id } : q,
        ),
      };
    });
  }, [patch]);

  const markInvoicePaid = useCallback((invoiceId: string) => {
    patch((prev) => {
      const invoice = prev.invoices.find((i) => i.id === invoiceId);
      if (!invoice || invoice.status === "paid") return prev;
      const account = prev.bankAccounts.find((a) => a.type === "transaction") ?? prev.bankAccounts[0];
      const paidDate = todayIso();
      const txn = account
        ? {
            id: `txn-pay-${invoice.id}`,
            bankAccountId: account.id,
            date: paidDate,
            description: `Payment ${invoice.invoiceNumber}`,
            amount: invoice.total,
            status: "MATCHED" as const,
            matchedType: "invoice" as const,
            matchedId: invoice.id,
          }
        : null;
      return {
        ...prev,
        invoices: prev.invoices.map((i) =>
          i.id === invoiceId
            ? {
                ...i,
                status: "paid",
                paidDate,
                paymentMethod: "Bank transfer",
                auditTrail: [...i.auditTrail, `Marked paid ${paidDate}`],
              }
            : i,
        ),
        clients: prev.clients.map((c) =>
          c.id === invoice.clientId
            ? { ...c, totalLifetimeRevenue: Math.round((c.totalLifetimeRevenue + invoice.total) * 100) / 100 }
            : c,
        ),
        bookings: prev.bookings.map((b) =>
          b.invoiceId === invoiceId || b.id === invoice.bookingId ? { ...b, status: "paid" } : b,
        ),
        bankTransactions: txn ? [txn, ...prev.bankTransactions] : prev.bankTransactions,
        bankAccounts: account
          ? prev.bankAccounts.map((a) =>
              a.id === account.id ? { ...a, balance: Math.round((a.balance + invoice.total) * 100) / 100 } : a,
            )
          : prev.bankAccounts,
      };
    });
  }, [patch]);

  return {
    ...workspace,
    ready,
    patch,
    completeOnboarding,
    restartOnboarding,
    resetDemo,
    addBooking,
    addClient,
    updateBookingStatus,
    addInvoice,
    addExpense,
    reconcileTransaction,
    addJournalEntry,
    addProduct,
    addPayout,
    lockBasPeriod,
    updateObligation,
    addDocument,
    convertBookingToInvoice,
    convertQuoteToInvoice,
    markInvoicePaid,
  };
}
