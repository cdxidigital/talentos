import React from 'react';
import {
  BusinessIdentity,
  CreatorProfile,
  TaxProfile,
  Client,
  Booking,
  Invoice,
  Order,
  PlatformPayout,
  Expense,
  BankAccount,
  BASPeriod,
  ObligationItem
} from '../types';
import { formatAUD } from '../utils/taxAndRegulatoryEngine';
import { calendarDaysUntil, shownInvoiceStatus } from '../lib/format';
import { bookingTypeLabel, industryById } from '../lib/industries';
import type { TaskTone } from '../lib/store';
import {
  Calendar,
  FileText,
  Receipt,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Wallet,
  PiggyBank,
  HandCoins,
  Landmark,
  ArrowRight,
  CheckCircle2,
  Plus,
  Check,
  Circle
} from 'lucide-react';
import {
  GlassCard,
  SectionLabel,
  StatusIcon,
} from './glass/Glass';

interface HomeDashboardProps {
  business: BusinessIdentity;
  creator: CreatorProfile;
  taxProfile: TaxProfile;
  clients: Client[];
  bookings: Booking[];
  invoices: Invoice[];
  orders: Order[];
  payouts: PlatformPayout[];
  expenses: Expense[];
  bankAccounts: BankAccount[];
  basPeriod: BASPeriod;
  obligations: ObligationItem[];
  onNavigate: (tab: string) => void;
  onOpenQuickAdd: (type: 'booking' | 'sale' | 'expense' | 'invoice') => void;
  onOpenAssistant: () => void;
  industryModule?: string;
}

interface NextStep {
  id: string;
  tone: TaskTone;
  rank: number;
  title: string;
  detail: string;
  ctaLabel: string;
  tab: string;
}

const TONE_RANK: Record<TaskTone, number> = { alert: 0, warn: 1, info: 2, ok: 3 };

type StatColor = 'violet' | 'blue' | 'green' | 'amber';

/* Colour-coding system — each financial category owns a distinct hue so the
   dashboard reads at a glance. Tints stay soft on the light canvas. */
const STAT_STYLE: Record<StatColor, { tile: string; value: string; rail: string }> = {
  violet: { tile: 'bg-accent-soft text-accent', value: 'text-accent', rail: 'bg-accent' },
  blue: { tile: 'bg-info/12 text-info', value: 'text-info', rail: 'bg-info' },
  green: { tile: 'bg-ok/12 text-ok', value: 'text-ok', rail: 'bg-ok' },
  amber: { tile: 'bg-warn/14 text-warn', value: 'text-warn', rail: 'bg-warn' }
};

/* Left rail + numbered-badge colours for the "What's next" steps, keyed to
   the same tone the StatusIcon uses so colour meaning is consistent app-wide. */
const STEP_STYLE: Record<TaskTone, { rail: string; badge: string }> = {
  alert: { rail: 'bg-alert', badge: 'bg-alert/12 text-alert ring-alert/25' },
  warn: { rail: 'bg-warn', badge: 'bg-warn/14 text-warn ring-warn/25' },
  info: { rail: 'bg-info', badge: 'bg-info/12 text-info ring-info/25' },
  ok: { rail: 'bg-ok', badge: 'bg-ok/12 text-ok ring-ok/25' }
};

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  business,
  creator,
  taxProfile,
  clients,
  bookings,
  invoices,
  payouts,
  expenses,
  bankAccounts,
  basPeriod,
  obligations,
  onNavigate,
  onOpenQuickAdd,
  onOpenAssistant,
  industryModule
}) => {
  /* ---------------------------- calculations ---------------------------- */
  const totalCashBalance = bankAccounts.reduce((acc, b) => acc + b.balance, 0);
  const taxReserveBalance = bankAccounts.find(b => b.type === 'tax_reserve')?.balance || 0;
  const operatingBalance = totalCashBalance - taxReserveBalance;

  const outstandingInvoices = invoices.filter(i => {
    const status = shownInvoiceStatus(i.status, i.dueDate);
    return status === 'issued' || status === 'overdue';
  });
  const overdueInvoices = invoices.filter(i => shownInvoiceStatus(i.status, i.dueDate) === 'overdue');
  const outstandingTotal = outstandingInvoices.reduce((acc, i) => acc + i.total, 0);

  const missingReceipts = expenses.filter(e => !e.receiptName);

  const upcomingBookings = bookings.filter(
    b => b.status === 'confirmed' || b.status === 'delivery' || b.status === 'invoiced'
  );
  const deliveriesInProgress = bookings.filter(b => b.status === 'delivery');
  const bookedRevenuePipeline = bookings.reduce((acc, b) => acc + b.fee, 0);

  const actionObligations = obligations.filter(
    o => o.status === 'ACTION_REQUIRED' || o.status === 'REVIEW_REQUIRED'
  );

  /* --------------------------- next-step engine -------------------------- */
  const steps: NextStep[] = [];

  overdueInvoices.length > 0 &&
    steps.push({
      id: 'overdue',
      tone: 'alert',
      rank: TONE_RANK.alert,
      title: `Get ${overdueInvoices.length} late invoice${overdueInvoices.length > 1 ? 's' : ''} paid`,
      detail: `${formatAUD(overdueInvoices.reduce((a, i) => a + i.total, 0))} is past its due date`,
      ctaLabel: 'Chase payment',
      tab: 'invoices'
    });

  missingReceipts.length > 0 &&
    steps.push({
      id: 'receipts',
      tone: 'warn',
      rank: TONE_RANK.warn,
      title: `Add ${missingReceipts.length} receipt${missingReceipts.length > 1 ? 's' : ''}`,
      detail: 'Add a photo so your expense records are complete',
      ctaLabel: 'Upload receipts',
      tab: 'money-receipts'
    });

  outstandingInvoices.length - overdueInvoices.length > 0 &&
    steps.push({
      id: 'unpaid',
      tone: 'info',
      rank: TONE_RANK.info,
      title: `${outstandingInvoices.length - overdueInvoices.length} invoice${outstandingInvoices.length - overdueInvoices.length > 1 ? 's' : ''} awaiting payment`,
      detail: `${formatAUD(outstandingInvoices.filter(i => shownInvoiceStatus(i.status, i.dueDate) !== 'overdue').reduce((a, i) => a + i.total, 0))} still inside the due date`,
      ctaLabel: 'View invoices',
      tab: 'invoices'
    });

  deliveriesInProgress.length > 0 &&
    steps.push({
      id: 'deliver',
      tone: 'info',
      rank: TONE_RANK.info + 0.1,
      title: `Deliver ${deliveriesInProgress.length} active booking${deliveriesInProgress.length > 1 ? 's' : ''}`,
      detail: deliveriesInProgress[0].campaignName,
      ctaLabel: 'Open bookings',
      tab: 'bookings'
    });

  basPeriod.netGstPayable > 0 &&
    steps.push({
      id: 'bas',
      tone: 'info',
      rank: TONE_RANK.info + 0.2,
      title: 'Check your next tax payment',
      detail: `${formatAUD(basPeriod.netGstPayable)} estimated · ${(() => {
        const days = Math.ceil((new Date(basPeriod.dueDate).getTime() - Date.now()) / 86400000);
        if (!Number.isFinite(days)) return "check the due date";
        return days < 0 ? `${Math.abs(days)} days overdue` : `due in ${days} days`;
      })()}`,
      ctaLabel: 'See what to do',
      tab: 'compliance'
    });

  actionObligations.forEach((ob, idx) =>
    steps.push({
      id: `ob-${ob.id}`,
      tone: ob.status === 'ACTION_REQUIRED' ? 'alert' : 'warn',
      rank: (ob.status === 'ACTION_REQUIRED' ? TONE_RANK.alert : TONE_RANK.warn) + 0.5 + idx * 0.01,
      title: ob.title,
      detail: ob.dueDate
        ? ob.summary.replace(/Due in \d+ days/, `Due in ${calendarDaysUntil(ob.dueDate)} days`)
        : ob.summary,
      ctaLabel: 'Review',
      tab: 'compliance'
    })
  );

  const orderedSteps = steps.sort((a, b) => a.rank - b.rank).slice(0, 5);

  /* ------------------------------- stats -------------------------------- */
  const stats: Array<{
    label: string;
    value: string;
    hint: string;
    icon: typeof Wallet;
    color: StatColor;
  }> = [
    {
      label: 'Available to spend',
      value: formatAUD(operatingBalance),
      hint: 'Operating cash, tax reserve set aside',
      icon: Wallet,
      color: 'violet'
    },
    {
      label: 'Owed to you',
      value: formatAUD(outstandingTotal),
      hint: `${outstandingInvoices.length} unpaid invoice${outstandingInvoices.length === 1 ? '' : 's'}`,
      icon: HandCoins,
      color: 'blue'
    },
    {
      label: 'Tax money saved',
      value: formatAUD(taxReserveBalance),
      hint: 'Kept aside for tax time',
      icon: PiggyBank,
      color: 'green'
    },
    {
      label: 'Next tax payment',
      value: formatAUD(basPeriod.netGstPayable),
      hint: (() => {
        const days = Math.ceil((new Date(basPeriod.dueDate).getTime() - Date.now()) / 86400000);
        if (!Number.isFinite(days)) return "Estimated";
        return days < 0 ? `${Math.abs(days)} days overdue` : `Estimated · due in ${days} days`;
      })(),
      icon: Landmark,
      color: 'amber'
    }
  ];

  const trade = industryById(industryModule);
  const hour = new Date().getHours();
  const hello = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const firstName = creator.creatorHandle.replace('@', '') || 'there';
  const ownerMilestones = [
    { label: 'Basic details', done: Boolean(business.tradingName && business.abn) },
    { label: `First ${trade.jobNoun.toLowerCase()}`, done: bookings.length > 0 },
    { label: 'Tax details', done: Boolean(business.abn && taxProfile.financialYear) }
  ];
  const completedMilestones = ownerMilestones.filter((milestone) => milestone.done).length;
  const progressPercent = Math.round((completedMilestones / ownerMilestones.length) * 100);

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-12 animate-rise">
      {/* Greeting + primary actions */}
      <GlassCard elevated className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-mono text-muted">
            {creator.creatorHandle ? (
              <>
                <span>{creator.creatorHandle}</span>
                <span aria-hidden="true">·</span>
              </>
            ) : null}
            <span className="font-semibold text-accent">{business.tradingName}</span>
            <span aria-hidden="true">·</span>
            <span>ABN {business.abn}</span>
          </div>
          <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink text-balance">
            {hello}, {firstName}.
          </h1>
          <p className="mt-1 max-w-md text-sm text-muted text-pretty">
            Here’s what to do next — no jargon, no fuss.
          </p>
        </div>

        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
          <button
            onClick={() => onOpenQuickAdd('booking')}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-neutral-700/60 bg-neutral-900 px-3.5 py-2 text-xs font-semibold text-ink transition-colors hover:bg-neutral-800 sm:w-auto"
          >
            <Plus className="h-3.5 w-3.5" /> New {trade.jobNoun.toLowerCase()}
          </button>
          <button
            onClick={() => onOpenQuickAdd('invoice')}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-accent px-3.5 py-2 text-xs font-semibold text-[#fff] shadow-[0_8px_24px_rgba(139,60,240,0.28)] transition-colors hover:bg-accent-strong sm:w-auto"
          >
            <FileText className="h-3.5 w-3.5" /> Issue tax invoice
          </button>
          <button
            onClick={onOpenAssistant}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-accent/30 bg-accent-soft px-3.5 py-2 text-xs font-semibold text-accent transition-colors hover:bg-accent/15 sm:w-auto"
            title="Ask AI Assistant Lex"
          >
            <Sparkles className="h-3.5 w-3.5" /> Ask Lex
          </button>
        </div>
      </GlassCard>

      {/* Friendly progress cue for new owners */}
      <GlassCard className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:gap-6">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent-soft font-display text-sm font-bold text-accent">
            {completedMilestones}/{ownerMilestones.length}
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-ink">Your setup</p>
            <p className="mt-0.5 text-xs text-muted">A few small steps and you’re good to go.</p>
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-center justify-between gap-3 text-[11px] font-medium">
            <span className="text-muted">{completedMilestones === ownerMilestones.length ? 'Ready to run your business' : 'Getting started'}</span>
            <span className="font-bold tabular-nums text-accent">{progressPercent}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-[color:rgba(20,22,29,0.08)]">
            <div className="h-full rounded-full bg-accent transition-[width] duration-700 ease-out" style={{ width: `${progressPercent}%` }} />
          </div>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
            {ownerMilestones.map((milestone) => (
              <span key={milestone.label} className={`inline-flex items-center gap-1 text-[11px] ${milestone.done ? 'font-semibold text-ok' : 'text-faint'}`}>
                {milestone.done ? <Check className="h-3 w-3" /> : <Circle className="h-3 w-3" />} {milestone.label}
              </span>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* What's next — signature step-by-step list */}
      <section>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <SectionLabel>What&apos;s next</SectionLabel>
          <div className="flex items-center gap-3 text-[11px] font-medium text-muted">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-alert" /> Needs action
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-warn" /> Worth checking
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-info" /> For info
            </span>
          </div>
        </div>

        <GlassCard elevated className="p-0 overflow-hidden">
          {orderedSteps.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-14 text-center">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-ok/12 text-ok">
                <CheckCircle2 className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-display text-base font-semibold text-ink">You&apos;re all caught up</h3>
                <p className="mx-auto mt-1 max-w-xs text-sm text-muted text-pretty">
                  Nothing to do right now. You’re all set.
                </p>
              </div>
            </div>
          ) : (
            <ol className="divide-y divide-[color:rgba(20,22,29,0.07)]">
              {orderedSteps.map((step, i) => {
                const style = STEP_STYLE[step.tone];
                return (
                  <li key={step.id} className="relative">
                    <span className={`absolute inset-y-0 left-0 w-1 ${style.rail}`} aria-hidden="true" />
                    <button
                      onClick={() => onNavigate(step.tab)}
                      className="group flex w-full items-center gap-3 py-4 pl-5 pr-4 text-left transition-colors hover:bg-[color:rgba(139,60,240,0.05)] sm:gap-4 sm:pl-6 sm:pr-5"
                    >
                      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold ring-1 ${style.badge}`}>
                        {i + 1}
                      </span>
                      <StatusIcon tone={step.tone} className="h-8 w-8 shrink-0" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-ink">{step.title}</span>
                        <span className="mt-0.5 block truncate text-xs text-muted">{step.detail}</span>
                      </span>
                      <span className="hidden shrink-0 items-center gap-1 text-xs font-semibold text-accent sm:inline-flex">
                        {step.ctaLabel}
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </span>
                      <ChevronRight className="h-4 w-4 shrink-0 text-faint sm:hidden" />
                    </button>
                  </li>
                );
              })}
            </ol>
          )}
        </GlassCard>
      </section>

      {/* At a glance */}
      <section>
        <SectionLabel className="mb-3">Your numbers</SectionLabel>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => {
            const Icon = s.icon;
            const style = STAT_STYLE[s.color];
            return (
              <GlassCard key={s.label} className="relative overflow-hidden p-4">
                <span className={`absolute inset-x-0 top-0 h-1 ${style.rail}`} aria-hidden="true" />
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-medium text-muted text-pretty">{s.label}</span>
                  <span className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${style.tile}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                </div>
                <div className={`mt-2 font-display text-2xl font-bold tabular-nums ${style.value}`}>{s.value}</div>
                <div className="mt-1 text-[11px] text-faint text-pretty">{s.hint}</div>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* Secondary: bookings + compliance */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Upcoming bookings */}
        <GlassCard className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-info/12 text-info">
                <Calendar className="h-4 w-4" />
              </span>
              <h3 className="text-sm font-semibold text-ink">Upcoming work</h3>
            </div>
            <button
              onClick={() => onNavigate('bookings')}
              className="text-xs font-medium text-muted transition-colors hover:text-ink"
            >
              View all ({bookings.length}) →
            </button>
          </div>

          <div className="space-y-2.5">
            {upcomingBookings.slice(0, 3).map((b) => {
              const client = clients.find(c => c.id === b.clientId);
              return (
                <button
                  key={b.id}
                  onClick={() => onNavigate('bookings')}
                  className="glass-well flex w-full items-center justify-between gap-3 px-3.5 py-3 text-left transition-colors hover:bg-[color:rgba(139,60,240,0.05)]"
                >
                  <span className="min-w-0">
                    <span className="flex items-center gap-1.5 text-[11px] text-muted">
                      <span className="font-medium text-ink">{client?.tradingName || 'Brand'}</span>
                      <span aria-hidden="true">·</span>
                      <span className="capitalize">{bookingTypeLabel(b.bookingType, industryModule)}</span>
                    </span>
                    <span className="mt-0.5 block truncate text-sm font-semibold text-ink">{b.campaignName}</span>
                    <span className="text-[11px] text-faint">{b.startDate} → {b.endDate}</span>
                  </span>
                  <span className="shrink-0 text-right">
                    <span className="block text-sm font-bold tabular-nums text-ink">{formatAUD(b.fee)}</span>
                    <span className="text-[10px] font-mono uppercase text-accent">{b.status}</span>
                  </span>
                </button>
              );
            })}
            {upcomingBookings.length === 0 && (
              <p className="py-6 text-center text-sm text-muted">No upcoming bookings.</p>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-[color:rgba(20,22,29,0.07)] pt-3 text-xs">
            <span className="text-muted">Booked pipeline</span>
            <span className="font-bold tabular-nums text-ink">{formatAUD(bookedRevenuePipeline)}</span>
          </div>
        </GlassCard>

        {/* Compliance radar */}
        <GlassCard className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-warn/14 text-warn">
                <ShieldCheck className="h-4 w-4" />
              </span>
              <h3 className="text-sm font-semibold text-ink">Keep an eye on</h3>
            </div>
            <button
              onClick={() => onNavigate('compliance')}
              className="text-xs font-medium text-accent transition-colors hover:underline"
            >
              See all →
            </button>
          </div>

          <div className="space-y-2.5">
            {obligations.slice(0, 4).map((ob) => {
              let tone: TaskTone = 'ok';
              if (ob.status === 'ACTION_REQUIRED') tone = 'alert';
              else if (ob.status === 'REVIEW_REQUIRED') tone = 'warn';
              else if (ob.status === 'APPROACHING') tone = 'info';

              return (
                <button
                  key={ob.id}
                  onClick={() => onNavigate('compliance')}
                  className="glass-well flex w-full items-start gap-3 px-3.5 py-3 text-left transition-colors hover:bg-[color:rgba(139,60,240,0.05)]"
                >
                  <StatusIcon tone={tone} className="mt-0.5 h-6 w-6 shrink-0" />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-2">
                      <span className="truncate text-sm font-medium text-ink">{ob.title}</span>
                      <span className="shrink-0 font-mono text-[10px] text-faint">{ob.authority}</span>
                    </span>
                    <span className="mt-0.5 line-clamp-2 block text-[11px] text-muted">{ob.dueDate ? ob.summary.replace(/Due in \d+ days/, `Due in ${calendarDaysUntil(ob.dueDate)} days`) : ob.summary}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </GlassCard>
      </div>

      {/* Platform payouts summary */}
      {payouts.length > 0 && (
        <GlassCard className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-ok/12 text-ok">
                <Receipt className="h-4 w-4" />
              </span>
              <h3 className="text-sm font-semibold text-ink">Recent platform payouts</h3>
            </div>
            <button
              onClick={() => onNavigate('sales')}
              className="text-xs font-medium text-muted transition-colors hover:text-ink"
            >
              All payouts →
            </button>
          </div>

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {payouts.slice(0, 2).map((p) => (
              <div key={p.id} className="glass-well px-3.5 py-3 text-xs">
                <div className="mb-2 flex items-center justify-between font-medium text-ink">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-accent" />
                    {p.platform} · {p.depositDate}
                  </span>
                  <span className="font-bold tabular-nums text-ok">{formatAUD(p.netPayout)}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 border-t border-[color:rgba(20,22,29,0.07)] pt-2 text-[11px] text-muted">
                  <div>Gross <span className="font-medium tabular-nums text-ink">{formatAUD(p.grossRevenue)}</span></div>
                  <div>Platform cut <span className="tabular-nums text-alert">-{formatAUD(p.platformFee)}</span></div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      )}
    </div>
  );
};
