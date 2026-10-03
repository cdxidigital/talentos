import { useCallback, useEffect, useRef, useState } from "react";
import type { Booking, Client, EntityType, Expense, Invoice, JournalEntry, ObligationItem, Order, PlatformPayout, Product, Quote } from "../types";
import {
  addExportToBas,
  addPurchaseToBas,
  addSaleToBas,
  creditAccount,
  ensureOperating,
  nextJournalNumber,
  orderJournal,
  paymentJournal,
  payoutJournal,
  round2,
} from "./books";
import { nextInvoiceNumber } from "./format";
import type { IndustryModule } from "./industries";
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

  const setIndustry = useCallback((industryModule: IndustryModule) => {
    patch((prev) => ({
      ...prev,
      operatingProfile: { ...prev.operatingProfile, industryModule },
    }));
  }, [patch]);

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

  const addQuote = useCallback((quote: Quote) => {
    patch((prev) => ({ ...prev, quotes: [quote, ...prev.quotes] }));
  }, [patch]);

  const updateBookingStatus = useCallback((bookingId: string, status: Booking["status"]) => {
    patch((prev) => ({
      ...prev,
      bookings: prev.bookings.map((b) => (b.id === bookingId ? { ...b, status } : b)),
    }));
  }, [patch]);

  const addInvoice = useCallback((invoice: Invoice) => {
    patch((prev) => ({
      ...prev,
      invoices: [invoice, ...prev.invoices],
      basPeriod:
        prev.taxProfile.accountingBasis === "accruals"
          ? addSaleToBas(prev.basPeriod, invoice.issueDate, invoice.subtotal, invoice.gstTotal, prev.taxProfile.gstRegistered)
          : prev.basPeriod,
    }));
  }, [patch]);

  const addExpense = useCallback((expense: Expense) => {
    patch((prev) => {
      const { accounts, account } = ensureOperating(prev.bankAccounts);
      const txn = {
        id: `txn-${expense.id}`,
        bankAccountId: account.id,
        date: expense.date,
        description: `${expense.supplier} — ${expense.description}`,
        amount: -Math.abs(expense.grossAmount),
        status: "CATEGORISED" as const,
        matchedType: "expense" as const,
        matchedId: expense.id,
      };
      return {
        ...prev,
        expenses: [{ ...expense, bankTransactionId: txn.id, isReconciled: false }, ...prev.expenses],
        bankTransactions: [txn, ...prev.bankTransactions],
        bankAccounts: creditAccount(accounts, account.id, -Math.abs(expense.grossAmount)),
        basPeriod: addPurchaseToBas(prev.basPeriod, expense, prev.taxProfile.gstRegistered),
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

  const addOrder = useCallback((order: Order, productId?: string) => {
    patch((prev) => {
      const { accounts, account } = ensureOperating(prev.bankAccounts);
      const txn = {
        id: `txn-${order.id}`,
        bankAccountId: account.id,
        date: order.date,
        description: `Sale ${order.orderNumber} — ${order.customerName}`,
        amount: order.total,
        status: "MATCHED" as const,
        matchedId: order.id,
        notes: order.itemsSummary,
      };
      const entry = orderJournal(order, nextJournalNumber(prev.journalEntries.map((j) => j.entryNumber)));
      return {
        ...prev,
        orders: [order, ...prev.orders],
        products: productId
          ? prev.products.map((p) =>
              p.id === productId && p.inventoryEnabled
                ? { ...p, inventoryQuantity: Math.max(0, p.inventoryQuantity - 1) }
                : p,
            )
          : prev.products,
        bankTransactions: [txn, ...prev.bankTransactions],
        bankAccounts: creditAccount(accounts, account.id, order.total),
        journalEntries: [entry, ...prev.journalEntries],
        basPeriod: addSaleToBas(prev.basPeriod, order.date, order.subtotal, order.gstAmount, prev.taxProfile.gstRegistered),
      };
    });
  }, [patch]);

  const addPayout = useCallback((payout: PlatformPayout) => {
    patch((prev) => {
      const { accounts, account } = ensureOperating(prev.bankAccounts);
      const txn = {
        id: `txn-${payout.id}`,
        bankAccountId: account.id,
        date: payout.depositDate,
        description: `${payout.platform} payout`,
        amount: round2(payout.netPayout),
        status: "MATCHED" as const,
        matchedType: "payout" as const,
        matchedId: payout.id,
      };
      const entry = payoutJournal({
        id: payout.id,
        platform: payout.platform,
        date: payout.depositDate,
        gross: payout.grossRevenue,
        platformFee: payout.platformFee,
        processing: payout.paymentProcessingFee,
        commission: payout.managementCommission,
        net: round2(payout.netPayout),
        entryNumber: nextJournalNumber(prev.journalEntries.map((j) => j.entryNumber)),
      });
      return {
        ...prev,
        payouts: [{ ...payout, bankTransactionId: txn.id, status: "deposited" }, ...prev.payouts],
        bankTransactions: [txn, ...prev.bankTransactions],
        bankAccounts: creditAccount(accounts, account.id, payout.netPayout),
        journalEntries: [entry, ...prev.journalEntries],
        basPeriod: addExportToBas(
          prev.basPeriod,
          payout.depositDate,
          payout.grossRevenue,
          round2(payout.platformFee + payout.paymentProcessingFee + payout.managementCommission),
        ),
      };
    });
  }, [patch]);

  const applyRegister = useCallback(
    (hit: { legalName: string; gstRegistered: boolean; entityType?: EntityType; location: string }) => {
      patch((prev) => ({
        ...prev,
        business: {
          ...prev.business,
          legalName: hit.legalName || prev.business.legalName,
          entityType: hit.entityType ?? prev.business.entityType,
          businessAddress: hit.location || prev.business.businessAddress,
          status: "active",
          abnLastVerifiedAt: new Date().toISOString(),
          abrLastCheckedAt: new Date().toISOString(),
        },
        taxProfile: { ...prev.taxProfile, gstRegistered: hit.gstRegistered },
      }));
    },
    [patch],
  );

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
      const { accounts, account } = ensureOperating(prev.bankAccounts);
      const paidDate = todayIso();
      const txn = {
        id: `txn-pay-${invoice.id}`,
        bankAccountId: account.id,
        date: paidDate,
        description: `Payment ${invoice.invoiceNumber}`,
        amount: invoice.total,
        status: "MATCHED" as const,
        matchedType: "invoice" as const,
        matchedId: invoice.id,
      };
      const entry = paymentJournal(invoice, paidDate, nextJournalNumber(prev.journalEntries.map((j) => j.entryNumber)));
      const basPeriod =
        prev.taxProfile.accountingBasis === "cash"
          ? addSaleToBas(prev.basPeriod, paidDate, invoice.subtotal, invoice.gstTotal, prev.taxProfile.gstRegistered)
          : prev.basPeriod;
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
        bankTransactions: [txn, ...prev.bankTransactions],
        bankAccounts: creditAccount(accounts, account.id, invoice.total),
        journalEntries: [entry, ...prev.journalEntries],
        basPeriod,
      };
    });
  }, [patch]);

  return {
    ...workspace,
    ready,
    patch,
    completeOnboarding,
    setIndustry,
    restartOnboarding,
    resetDemo,
    addBooking,
    addClient,
    addQuote,
    updateBookingStatus,
    addInvoice,
    addExpense,
    reconcileTransaction,
    addJournalEntry,
    addProduct,
    addOrder,
    addPayout,
    lockBasPeriod,
    updateObligation,
    addDocument,
    applyRegister,
    convertBookingToInvoice,
    convertQuoteToInvoice,
    markInvoicePaid,
  };
}
