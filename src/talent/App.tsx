import React, { useState } from "react";
import { OnboardingModal } from "./components/OnboardingModal";
import { HomeDashboard } from "./components/HomeDashboard";
import { BookingsView } from "./components/BookingsView";
import { SalesView } from "./components/SalesView";
import { InvoicesView } from "./components/InvoicesView";
import { MoneyView } from "./components/MoneyView";
import { ComplianceRadarView } from "./components/ComplianceRadarView";
import { AccountantPortalView } from "./components/AccountantPortalView";
import { FilesView } from "./components/FilesView";
import { AIAssistantDrawer } from "./components/AIAssistantDrawer";
import { SettingsModal } from "./components/SettingsModal";
import { AuthModal } from "./components/AuthModal";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { useLedger } from "./lib/useLedger";
import { shownInvoiceStatus } from "./lib/format";
import {
  LayoutDashboard,
  Calendar,
  ShoppingBag,
  FileText,
  Landmark,
  ShieldCheck,
  Briefcase,
  FolderClosed,
  Sparkles,
  Menu,
  X,
  RefreshCw,
  Settings,
  LogOut,
  CheckCircle2,
  Bell,
  ArrowRight,
} from "lucide-react";

function TalentLanding({ onSignUp, onSample }: { onSignUp: () => void; onSample: () => void }) {
  return (
    <section className="fixed inset-0 z-50 flex min-h-screen items-center overflow-y-auto bg-canvas px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div className="max-w-2xl">
          <div className="mb-10 flex items-center gap-4">
            <span className="font-display text-4xl font-extrabold leading-none tracking-[-0.05em] text-ink sm:text-5xl">
              Talent<span className="brand-gradient-text">OS</span>
            </span>
            <span className="border-l border-accent/30 pl-3 text-sm font-semibold leading-tight text-accent sm:text-base">
              business,
              <br /> sorted
            </span>
          </div>
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-accent">For independent talent</p>
          <h1 className="max-w-xl text-balance font-display text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-ink sm:text-6xl">
            Spend less time chasing the business stuff.
          </h1>
          <p className="mt-6 max-w-lg text-pretty text-base leading-7 text-muted sm:text-lg">
            Bookings, invoices, GST, and the BAS — in one place, in plain language. Open Kira’s sample studio, or start
            your own books.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              onClick={onSample}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-bold text-[#fff] shadow-[0_12px_30px_-6px_rgba(116,52,209,0.5)] transition-all hover:-translate-y-px hover:bg-accent-strong active:scale-[0.98]"
            >
              Open the sample studio <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={onSignUp}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-accent/30 bg-neutral-950 px-5 py-3 text-sm font-bold text-ink hover:bg-neutral-900"
            >
              Start your own books
            </button>
          </div>
          <p className="mt-4 text-xs font-medium text-faint">
            Sample books are fictional and stay in this browser. Your own books do too.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          {[
            ["01", "See a real set of books", "Brand deals, platform payouts, GST and a BAS already in motion."],
            ["02", "Raise the invoice", "Turn a booking or quote into a tax invoice without double-counting GST."],
            ["03", "Ask Lex", "GST, super, platform fees and usage rights, explained without the jargon."],
          ].map(([number, title, detail]) => (
            <div key={number} className="glass rounded-2xl p-5 transition-transform hover:-translate-y-0.5">
              <span className="font-mono text-xs font-bold text-accent">{number}</span>
              <h2 className="mt-4 font-display text-lg font-bold text-ink">{title}</h2>
              <p className="mt-1 text-sm leading-6 text-muted">{detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AppContent() {
  const { user, theme, loading, saveBusinessIdentity, enterSampleStudio, logOut } = useAuth();
  const books = useLedger(user?.id ?? null, Boolean(user?.demo));

  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [moneySection, setMoneySection] = useState<"banking" | "expenses" | "receipts" | "ledger">("expenses");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState<"theme" | "notifications">("theme");
  const [authOpen, setAuthOpen] = useState(false);

  const {
    business,
    creator,
    taxProfile,
    operatingProfile,
    clients,
    bookings,
    quotes,
    invoices,
    products,
    orders,
    payouts,
    expenses,
    bankAccounts,
    bankTransactions,
    journalEntries,
    basPeriod,
    obligations,
    documents,
    ready,
  } = books;

  const annualRevenue =
    bookings.reduce((acc, b) => acc + b.fee, 0) + payouts.reduce((acc, p) => acc + p.grossRevenue, 0);
  const annualTaxableIncome =
    invoices.filter((i) => i.status === "paid").reduce((acc, i) => acc + i.subtotal, 0) +
    payouts.reduce((acc, p) => acc + p.netPayout, 0) +
    orders.filter((o) => o.status !== "refunded").reduce((acc, o) => acc + o.subtotal, 0) -
    expenses.reduce((acc, e) => acc + e.claimableAmount, 0);

  const navItems = [
    { id: "dashboard", label: "Home", icon: LayoutDashboard },
    { id: "bookings", label: "Bookings", icon: Calendar, badge: bookings.length },
    { id: "sales", label: "Sales", icon: ShoppingBag },
    { id: "invoices", label: "Invoices", icon: FileText, badge: invoices.filter((i) => {
      const status = shownInvoiceStatus(i.status, i.dueDate);
      return status === "issued" || status === "overdue";
    }).length },
    { id: "money", label: "Money", icon: Landmark },
    { id: "compliance", label: "Tax", icon: ShieldCheck },
    { id: "files", label: "Files", icon: FolderClosed, badge: documents.length },
    { id: "accountant", label: "Accountant", icon: Briefcase },
  ];

  if (loading || (user && !ready)) {
    return (
      <div className="grid min-h-screen place-items-center bg-canvas text-ink">
        <div className="text-center">
          <p className="font-display text-3xl font-extrabold tracking-tight">
            Talent<span className="brand-gradient-text">OS</span>
          </p>
          <p className="mt-2 text-sm text-muted">Opening your books…</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <TalentLanding onSignUp={() => setAuthOpen(true)} onSample={enterSampleStudio} />
        <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} defaultMode="signup" />
      </>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-neutral-950 text-neutral-100 antialiased selection:bg-emerald-500/30 selection:text-emerald-200">
      {!books.onboarded && (
        <OnboardingModal
          isOpen
          onClose={() => books.completeOnboarding({ business, creator, taxProfile, operatingProfile })}
          business={business}
          taxProfile={taxProfile}
          operatingProfile={operatingProfile}
          creatorProfile={creator}
          onSave={(b, t, o, c) => {
            books.completeOnboarding({ business: b, creator: c, taxProfile: t, operatingProfile: o });
            saveBusinessIdentity(b, t);
          }}
        />
      )}

      <header className="sticky top-0 z-40 flex min-h-16 items-center justify-between gap-3 border-b border-neutral-800 bg-canvas/85 px-4 py-3 backdrop-blur-2xl sm:px-5">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-muted transition-colors hover:bg-[color:rgba(20,22,29,0.06)] hover:text-ink lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <button className="flex items-center gap-3" onClick={() => setActiveTab("dashboard")} aria-label="TalentOS">
            <span className="font-display text-2xl font-extrabold leading-none tracking-[-0.04em] sm:text-3xl">
              <span className="text-ink">Talent</span>
              <span className="brand-gradient-text">OS</span>
            </span>
            <span className="hidden border-l border-accent/30 pl-3 text-sm font-semibold leading-tight tracking-wide text-accent sm:block">
              business,
              <br /> sorted
            </span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs sm:gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-[color:rgba(20,22,29,0.08)] bg-[color:rgba(20,22,29,0.03)] px-3 py-1 text-[11px] font-medium text-muted xl:flex">
            <span className="font-semibold text-ink">{business.legalName || "Your business"}</span>
            <span className="text-faint">·</span>
            <span>ABN {business.abn || "—"}</span>
            <span className="text-faint">·</span>
            <span className="font-semibold text-ok">{taxProfile.gstRegistered ? "GST registered" : "Not GST registered"}</span>
          </div>
          <button
            onClick={() => setAssistantOpen(true)}
            className="flex min-h-11 items-center gap-1.5 rounded-lg border border-accent/30 bg-accent-soft px-2.5 py-1.5 font-medium text-accent shadow-sm hover:bg-accent/15 sm:px-3"
          >
            <Sparkles className="h-4 w-4" />
            <span className="hidden sm:inline">Ask Lex</span>
          </button>
          <button
            onClick={() => {
              setSettingsTab("theme");
              setSettingsOpen(true);
            }}
            className="hidden min-h-11 items-center rounded-lg p-2 text-muted hover:bg-[color:rgba(20,22,29,0.06)] hover:text-ink sm:flex"
            title="Settings"
          >
            <Settings className="h-4 w-4" />
          </button>
          <button
            onClick={() => void logOut()}
            className="flex min-h-11 items-center gap-1.5 rounded-lg border border-[color:rgba(20,22,29,0.08)] bg-[color:rgba(20,22,29,0.03)] px-2.5 py-1.5 text-ink hover:bg-[color:rgba(20,22,29,0.06)]"
            title="Leave studio"
            aria-label="Leave studio"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-[#fff]">
              {user.displayName?.charAt(0).toUpperCase() || "U"}
            </span>
            <LogOut className="h-3.5 w-3.5 text-muted" />
          </button>
        </div>
      </header>

      {user.demo && (
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-accent/15 bg-accent-soft px-4 py-2 text-xs text-ink sm:px-5">
          <span>
            <strong>Sample studio.</strong> Kira Zhang’s fictional Sydney books — edit them, they stay in this browser.
          </span>
          <button onClick={books.resetDemo} className="font-semibold text-accent underline-offset-2 hover:underline">
            Reset sample
          </button>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden w-56 shrink-0 flex-col justify-between border-r border-neutral-800 bg-canvas/70 p-3 backdrop-blur-xl lg:flex xl:w-64">
          <nav className="space-y-1">
            <div className="px-3 pb-2 text-[10px] font-medium uppercase tracking-wider text-faint">Your business</div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium ${
                    isActive ? "bg-accent-soft font-semibold text-accent" : "text-muted hover:bg-[color:rgba(20,22,29,0.05)] hover:text-ink"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className={`h-4 w-4 ${isActive ? "text-accent" : "text-faint"}`} />
                    {item.label}
                  </span>
                  {item.badge !== undefined && (
                    <span className={`rounded px-1.5 py-0.5 text-[10px] font-semibold tabular-nums ${isActive ? "bg-accent/15 text-accent" : "bg-[color:rgba(20,22,29,0.06)] text-muted"}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
            <div className="mt-3 space-y-1 border-t border-[color:rgba(20,22,29,0.08)] pt-3">
              <button
                onClick={() => setSettingsOpen(true)}
                className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium text-muted hover:bg-[color:rgba(20,22,29,0.05)] hover:text-ink"
              >
                <span className="flex items-center gap-2.5">
                  <Settings className="h-4 w-4 text-faint" /> Settings
                </span>
                <span className="rounded bg-[color:rgba(20,22,29,0.06)] px-1.5 py-0.5 text-[10px] capitalize text-muted">{theme}</span>
              </button>
              <button
                onClick={() => {
                  setSettingsTab("notifications");
                  setSettingsOpen(true);
                }}
                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-muted hover:bg-[color:rgba(20,22,29,0.05)] hover:text-ink"
              >
                <Bell className="h-4 w-4 text-faint" /> Alerts
              </button>
            </div>
          </nav>
          <div className="space-y-2">
            <div className="glass space-y-1 rounded-xl p-3 text-xs">
              <div className="flex items-center justify-between">
                <div className="text-[10px] font-medium uppercase tracking-wide text-faint">Profile</div>
                <span className="flex items-center gap-1 text-[10px] font-medium text-ok">
                  <CheckCircle2 className="h-3 w-3" /> Saved here
                </span>
              </div>
              <div className="truncate text-xs font-semibold text-ink">{creator.creatorHandle || user.displayName}</div>
              <div className="text-[11px] capitalize text-muted">{business.entityType.replace("_", " ")}</div>
              <div className="pt-1 text-[10px] font-medium text-ok">FY {taxProfile.financialYear || "2026-2027"}</div>
            </div>
            <button
              onClick={() => setAssistantOpen(true)}
              className="flex w-full items-center gap-2.5 rounded-xl border border-accent/20 bg-accent-soft p-2.5 text-left hover:border-accent/40"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-accent/20 text-accent">
                <Sparkles className="h-3.5 w-3.5" />
              </span>
              <span className="truncate">
                <span className="block text-[11px] font-semibold text-accent">Ask Lex</span>
                <span className="block truncate text-[10px] text-muted">Tax rules, explained simply</span>
              </span>
            </button>
          </div>
        </aside>

        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex flex-col justify-between bg-canvas p-6 lg:hidden">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[color:rgba(20,22,29,0.08)] pb-4">
                <span className="font-display text-lg font-extrabold">
                  Talent<span className="brand-gradient-text">OS</span>
                </span>
                <button onClick={() => setMobileMenuOpen(false)} aria-label="Close menu" className="p-2 text-muted">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-xl p-3 text-sm font-medium ${
                        isActive ? "bg-accent-soft text-accent" : "text-muted"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <Icon className="h-5 w-5" />
                        {item.label}
                      </span>
                      {item.badge !== undefined && <span className="text-xs tabular-nums">{item.badge}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <main className="relative flex-1 overflow-y-auto bg-transparent p-3 pb-24 sm:p-5 lg:p-8 lg:pb-8">
          <div className="relative mx-auto w-full max-w-[1440px]">
            {activeTab === "dashboard" && (
              <HomeDashboard
                business={business}
                creator={creator}
                taxProfile={taxProfile}
                clients={clients}
                bookings={bookings}
                invoices={invoices}
                orders={orders}
                payouts={payouts}
                expenses={expenses}
                bankAccounts={bankAccounts}
                basPeriod={basPeriod}
                obligations={obligations}
                onNavigate={(tab) => {
                  if (tab === "money-receipts") {
                    setMoneySection("receipts");
                    setActiveTab("money");
                    return;
                  }
                  setActiveTab(tab);
                }}
                onOpenQuickAdd={(type) => {
                  if (type === "booking") setActiveTab("bookings");
                  else if (type === "invoice") setActiveTab("invoices");
                  else if (type === "sale") setActiveTab("sales");
                  else setActiveTab("money");
                }}
                onOpenAssistant={() => setAssistantOpen(true)}
              />
            )}
            {activeTab === "bookings" && (
              <BookingsView
                clients={clients}
                bookings={bookings}
                quotes={quotes}
                taxProfile={taxProfile}
                onAddBooking={books.addBooking}
                onAddClient={books.addClient}
                onUpdateBookingStatus={books.updateBookingStatus}
                onConvertToInvoice={(booking) => {
                  books.convertBookingToInvoice(booking);
                  setActiveTab("invoices");
                }}
                onConvertQuoteToInvoice={(quote) => {
                  books.convertQuoteToInvoice(quote);
                  setActiveTab("invoices");
                }}
              />
            )}
            {activeTab === "sales" && (
              <SalesView
                products={products}
                orders={orders}
                payouts={payouts}
                taxProfile={taxProfile}
                onAddProduct={books.addProduct}
                onAddPayout={books.addPayout}
              />
            )}
            {activeTab === "invoices" && (
              <InvoicesView
                invoices={invoices}
                clients={clients}
                business={business}
                taxProfile={taxProfile}
                onAddInvoice={books.addInvoice}
                onMarkInvoicePaid={books.markInvoicePaid}
              />
            )}
            {activeTab === "money" && (
              <MoneyView
                bankAccounts={bankAccounts}
                bankTransactions={bankTransactions}
                expenses={expenses}
                journalEntries={journalEntries}
                taxProfile={taxProfile}
                onAddExpense={books.addExpense}
                onReconcileTransaction={books.reconcileTransaction}
                onAddJournalEntry={books.addJournalEntry}
                section={moneySection}
              />
            )}
            {activeTab === "compliance" && (
              <ComplianceRadarView
                business={business}
                taxProfile={taxProfile}
                operatingProfile={operatingProfile}
                basPeriod={basPeriod}
                obligations={obligations}
                annualRevenue={annualRevenue}
                annualTaxableIncome={Math.max(0, Math.round(annualTaxableIncome))}
                onLockBASPeriod={books.lockBasPeriod}
                onUpdateObligation={books.updateObligation}
              />
            )}
            {activeTab === "files" && <FilesView documents={documents} onAddDocument={books.addDocument} />}
            {activeTab === "accountant" && (
              <AccountantPortalView
                business={business}
                taxProfile={taxProfile}
                journalEntries={journalEntries}
                basPeriod={basPeriod}
                expenses={expenses}
                invoices={invoices}
                payouts={payouts}
                bankTransactions={bankTransactions}
                onLockPeriod={books.lockBasPeriod}
                onPostAdjustmentJournal={books.addJournalEntry}
              />
            )}
          </div>
        </main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-800 bg-canvas/95 px-1 pb-[env(safe-area-inset-bottom)] pt-1 backdrop-blur-xl lg:hidden">
        <div className="grid grid-cols-5">
          {[
            ["dashboard", "Home", LayoutDashboard],
            ["bookings", "Jobs", Calendar],
            ["invoices", "Invoices", FileText],
            ["money", "Money", Landmark],
            ["compliance", "Tax", ShieldCheck],
          ].map(([id, label, Icon]) => {
            const active = activeTab === id;
            const I = Icon as typeof LayoutDashboard;
            return (
              <button
                key={id as string}
                onClick={() => setActiveTab(id as string)}
                className={`flex min-h-14 flex-col items-center justify-center gap-0.5 text-[10px] font-semibold ${active ? "text-accent" : "text-muted"}`}
              >
                <I className="h-5 w-5" />
                {label as string}
              </button>
            );
          })}
        </div>
      </nav>

      <AIAssistantDrawer isOpen={assistantOpen} onClose={() => setAssistantOpen(false)} business={business} taxProfile={taxProfile} />
      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        business={business}
        taxProfile={taxProfile}
        onOpenAuth={() => setAuthOpen(true)}
        onRestartOnboarding={books.restartOnboarding}
        initialTab={settingsTab}
      />
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} defaultMode="signup" />
      <button
        onClick={books.restartOnboarding}
        className="fixed bottom-20 right-4 z-30 hidden rounded-full border border-[color:rgba(20,22,29,0.08)] bg-neutral-950 p-2 text-muted shadow-sm lg:bottom-6 lg:block"
        title="Re-run setup"
      >
        <RefreshCw className="h-4 w-4" />
      </button>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
