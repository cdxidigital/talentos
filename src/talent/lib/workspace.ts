import {
  SEED_BANK_ACCOUNTS,
  SEED_BANK_TRANSACTIONS,
  SEED_BAS_PERIOD,
  SEED_BOOKINGS,
  SEED_BUSINESS,
  SEED_CLIENTS,
  SEED_CREATOR,
  SEED_DOCUMENTS,
  SEED_EXPENSES,
  SEED_INVOICES,
  SEED_JOURNAL_ENTRIES,
  SEED_OBLIGATIONS,
  SEED_OPERATING_PROFILE,
  SEED_ORDERS,
  SEED_PLATFORM_PAYOUTS,
  SEED_PRODUCTS,
  SEED_QUOTES,
  SEED_TAX_PROFILE,
} from "../data/seedData";
import type {
  BankAccount,
  BankTransaction,
  BASPeriod,
  Booking,
  BusinessIdentity,
  Client,
  CreatorProfile,
  DocumentRecord,
  Expense,
  Invoice,
  JournalEntry,
  ObligationItem,
  OperatingProfile,
  Order,
  PlatformPayout,
  Product,
  Quote,
  TaxProfile,
} from "../types";
import { currentBasPeriod } from "./books";

export interface Workspace {
  onboarded: boolean;
  business: BusinessIdentity;
  creator: CreatorProfile;
  taxProfile: TaxProfile;
  operatingProfile: OperatingProfile;
  clients: Client[];
  bookings: Booking[];
  quotes: Quote[];
  invoices: Invoice[];
  products: Product[];
  orders: Order[];
  payouts: PlatformPayout[];
  expenses: Expense[];
  bankAccounts: BankAccount[];
  bankTransactions: BankTransaction[];
  journalEntries: JournalEntry[];
  basPeriod: BASPeriod;
  obligations: ObligationItem[];
  documents: DocumentRecord[];
}

const blankBusiness = (): BusinessIdentity => ({
  abn: "",
  legalName: "",
  tradingName: "",
  businessName: "",
  entityType: "sole_trader",
  mainBusinessActivity: "",
  anzsicCode: "",
  businessAddress: "",
  postalAddress: "",
  contactEmail: "",
  contactPhone: "",
  startDate: "",
  status: "pending",
  abnLastVerifiedAt: "",
  abrLastCheckedAt: "",
});

export function emptyWorkspace(): Workspace {
  return {
    onboarded: false,
    business: blankBusiness(),
    creator: { creatorHandle: "", primaryPlatforms: [], publicEmail: "", discreetMode: false },
    taxProfile: {
      gstRegistered: false,
      accountingBasis: "cash",
      basFrequency: "quarterly",
      paygWithholdingRegistered: false,
      hasTaxAgent: false,
      financialYear: "2026-2027",
    },
    operatingProfile: {
      hasBookings: true,
      hasPhysicalProducts: false,
      hasDigitalProducts: false,
      hasSubscriptions: false,
      hasPlatformPayouts: false,
      hasAffiliateIncome: false,
      hasContractors: false,
      hasEmployees: false,
      hasInterstateActivity: false,
      hasOverseasActivity: false,
      industryModule: "general",
    },
    clients: [],
    bookings: [],
    quotes: [],
    invoices: [],
    products: [],
    orders: [],
    payouts: [],
    expenses: [],
    bankAccounts: [
      {
        id: "bnk-operating",
        bankName: "Your bank",
        accountName: "Operating account",
        bsb: "",
        accountNumber: "••••",
        balance: 0,
        type: "transaction",
        lastSynced: todayIso(),
      },
    ],
    bankTransactions: [],
    journalEntries: [],
    basPeriod: currentBasPeriod(),
    obligations: [],
    documents: [],
  };
}

export function demoWorkspace(): Workspace {
  return {
    onboarded: true,
    business: structuredClone(SEED_BUSINESS),
    creator: structuredClone(SEED_CREATOR),
    taxProfile: structuredClone(SEED_TAX_PROFILE),
    operatingProfile: structuredClone(SEED_OPERATING_PROFILE),
    clients: structuredClone(SEED_CLIENTS),
    bookings: structuredClone(SEED_BOOKINGS),
    quotes: structuredClone(SEED_QUOTES),
    invoices: structuredClone(SEED_INVOICES),
    products: structuredClone(SEED_PRODUCTS),
    orders: structuredClone(SEED_ORDERS),
    payouts: structuredClone(SEED_PLATFORM_PAYOUTS),
    expenses: structuredClone(SEED_EXPENSES),
    bankAccounts: structuredClone(SEED_BANK_ACCOUNTS),
    bankTransactions: structuredClone(SEED_BANK_TRANSACTIONS),
    journalEntries: structuredClone(SEED_JOURNAL_ENTRIES),
    basPeriod: structuredClone(SEED_BAS_PERIOD),
    obligations: structuredClone(SEED_OBLIGATIONS),
    documents: structuredClone(SEED_DOCUMENTS),
  };
}

export function workspaceKey(userId: string) {
  return `talentos.workspace.${userId}`;
}

export function loadWorkspace(userId: string): Workspace | null {
  try {
    const raw = localStorage.getItem(workspaceKey(userId));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Workspace;
    if (!parsed || typeof parsed !== "object" || !parsed.business) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveWorkspace(userId: string, workspace: Workspace) {
  localStorage.setItem(workspaceKey(userId), JSON.stringify(workspace));
}

export function todayIso() {
  return new Date().toISOString().slice(0, 10);
}
