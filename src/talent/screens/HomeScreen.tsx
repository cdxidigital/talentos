import React from "react";
import {
  Plus,
  Minus,
  Briefcase,
  FileText,
  ScanLine,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import {
  GlassCard,
  GlassButton,
  GlassMetric,
  SectionLabel,
  StatusIcon,
  GlassProgress,
  cx,
} from "../components/glass/Glass";
import { useStore, type TaskItem } from "../lib/store";
import { aud, audSigned, shortDate } from "../lib/format";
import type { AddType } from "../components/AddSheet";
import type { TabId } from "../lib/nav";

interface HomeProps {
  onNavigate: (tab: TabId) => void;
  onAdd: (type: AddType) => void;
  onAsk: () => void;
  onOpenTask: (task: TaskItem) => void;
}

function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

const QUICK_ACTIONS: { label: string; icon: typeof Plus; kind: "add" | "ask"; add?: AddType }[] = [
  { label: "Money in", icon: Plus, kind: "add", add: "income" },
  { label: "Money out", icon: Minus, kind: "add", add: "expense" },
  { label: "Job", icon: Briefcase, kind: "add", add: "job" },
  { label: "Invoice", icon: FileText, kind: "add", add: "invoice" },
  { label: "Scan receipt", icon: ScanLine, kind: "add", add: "expense" },
  { label: "Ask", icon: Sparkles, kind: "ask" },
];

export const HomeScreen: React.FC<HomeProps> = ({ onNavigate, onAdd, onAsk, onOpenTask }) => {
  const { profile, metrics, tasks, income, expenses, jobs, taxReserve } = useStore();

  const attention = tasks.filter((t) => t.tone === "alert" || t.tone === "warn");
  const topTasks = [...tasks].sort((a, b) => {
    const order = { alert: 0, warn: 1, info: 2, ok: 3 };
    return order[a.tone] - order[b.tone];
  }).slice(0, 4);

  const recent = [
    ...income.slice(0, 5).map((i) => ({ id: i.id, date: i.date, label: i.label, sub: i.sublabel, amount: i.amount })),
    ...expenses.slice(0, 5).map((e) => ({ id: e.id, date: e.date, label: e.supplier, sub: e.category, amount: -e.amount })),
  ]
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, 6);

  const upcomingJobs = jobs.filter((j) => !["Paid", "Completed"].includes(j.stage)).slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl space-y-6 animate-rise">
      {/* Hero */}
      <header className="pt-1">
        <p className="text-sm font-medium text-accent">Your business is on track</p>
        <h1 className="mt-1 font-display text-3xl font-bold text-ink sm:text-4xl text-balance">
          {greeting()}{profile.discreetMode ? "" : `, ${profile.displayName}`}.
        </h1>
      </header>

      {/* Hero metrics */}
      <div className="grid gap-4 sm:grid-cols-3">
        <GlassCard elevated>
          <GlassMetric label="Money in this month" value={aud(metrics.moneyInMonth)} size="xl" />
        </GlassCard>
        <GlassCard>
          <GlassMetric label="Money out this month" value={aud(metrics.moneyOutMonth)} size="xl" />
        </GlassCard>
        <GlassCard>
          <GlassMetric
            label="Waiting to be paid"
            value={aud(metrics.waiting)}
            size="xl"
            hint={metrics.overdue > 0 ? `${aud(metrics.overdue)} of this is overdue` : undefined}
          />
        </GlassCard>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
        {QUICK_ACTIONS.map((a) => {
          const Icon = a.icon;
          return (
            <button
              key={a.label}
              onClick={() => (a.kind === "ask" ? onAsk() : a.add && onAdd(a.add))}
              className="glass glass-interactive flex flex-col items-center gap-2 rounded-2xl px-2 py-4 text-center cursor-pointer"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-xs font-medium text-ink">{a.label}</span>
            </button>
          );
        })}
      </div>

      {/* Business Pulse + Tax & To Do */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Business Pulse */}
        <GlassCard elevated className="flex flex-col">
          <div className="flex items-center justify-between">
            <SectionLabel>Business Pulse</SectionLabel>
            <TrendingUp className="h-4 w-4 text-accent" />
          </div>
          <div className="mt-4 space-y-3">
            <PulseRow
              label="Revenue"
              value={aud(metrics.moneyInMonth)}
              delta={{ up: metrics.revenueDeltaPct >= 0, value: `${Math.abs(metrics.revenueDeltaPct)}%` }}
            />
            <PulseRow label="Upcoming jobs" value={String(metrics.upcomingJobs)} />
            <PulseRow label="Outstanding" value={aud(metrics.unpaidInvoicesTotal)} />
            <PulseRow label="Tax set aside" value={aud(taxReserve)} />
            <PulseRow label="Repeat customers" value={String(metrics.repeatCustomers)} />
          </div>
          <p className="mt-4 border-t border-white/8 pt-4 text-sm text-muted">
            You&apos;re growing steadily — income is up on last month and your pipeline is healthy.
          </p>
        </GlassCard>

        {/* Tax & To Do */}
        <GlassCard elevated className="flex flex-col">
          <div className="flex items-center justify-between">
            <SectionLabel>Tax &amp; To Do</SectionLabel>
            {attention.length > 0 && (
              <span className="text-xs font-semibold text-warn">{attention.length} to check</span>
            )}
          </div>
          <div className="mt-4 flex-1 space-y-1.5">
            {topTasks.map((t) => (
              <button
                key={t.id}
                onClick={() => onOpenTask(t)}
                className="flex w-full items-center gap-3 rounded-xl px-2 py-2.5 text-left transition-colors hover:bg-white/5 cursor-pointer"
              >
                <StatusIcon tone={t.tone} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-ink">{t.title}</span>
                  <span className="block truncate text-xs text-muted">{t.summary}</span>
                </span>
                <ChevronRight className="h-4 w-4 shrink-0 text-faint" />
              </button>
            ))}
          </div>
          <GlassButton variant="secondary" size="sm" className="mt-4 self-start" onClick={() => onNavigate("tax")}>
            Open Tax &amp; To Do
          </GlassButton>
        </GlassCard>
      </div>

      {/* Growth */}
      <GlassCard elevated>
        <div className="flex items-center justify-between">
          <SectionLabel>Growth</SectionLabel>
          <button onClick={() => onNavigate("money")} className="text-xs font-medium text-accent hover:underline cursor-pointer">
            See money
          </button>
        </div>
        <div className="mt-5 grid gap-6 md:grid-cols-2">
          {/* Revenue this vs last */}
          <div>
            <div className="mb-3 text-xs font-medium text-muted">Revenue</div>
            <div className="space-y-3">
              <RevenueBar label="This month" value={metrics.moneyInMonth} max={Math.max(metrics.moneyInMonth, metrics.moneyInLastMonth)} active />
              <RevenueBar label="Last month" value={metrics.moneyInLastMonth} max={Math.max(metrics.moneyInMonth, metrics.moneyInLastMonth)} />
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
              <MiniStat label="Upcoming" value={String(metrics.upcomingJobs)} />
              <MiniStat label="Completed" value={String(metrics.completedJobs)} />
              <MiniStat label="New customers" value={String(metrics.newCustomers)} />
            </div>
          </div>
          {/* Income sources */}
          <div>
            <div className="mb-3 text-xs font-medium text-muted">Where your money comes from</div>
            <div className="space-y-2.5">
              {metrics.incomeBySource.map((s) => (
                <div key={s.source}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-ink">{s.label}</span>
                    <span className="tabular-nums text-muted">{aud(s.amount)}</span>
                  </div>
                  <GlassProgress value={s.pct} max={100} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Recent activity + upcoming */}
      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard>
          <SectionLabel>Recent activity</SectionLabel>
          <div className="mt-3 divide-y divide-white/6">
            {recent.map((r) => (
              <div key={r.id} className="flex items-center gap-3 py-2.5">
                <span
                  className={cx(
                    "inline-flex h-8 w-8 items-center justify-center rounded-lg",
                    r.amount >= 0 ? "bg-ok/12 text-ok" : "bg-white/6 text-muted"
                  )}
                >
                  {r.amount >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-ink">{r.label}</span>
                  <span className="block truncate text-xs text-muted">{r.sub}</span>
                </span>
                <span className="shrink-0 text-right">
                  <span className={cx("block text-sm font-semibold tabular-nums", r.amount >= 0 ? "text-ok" : "text-ink")}>
                    {audSigned(r.amount)}
                  </span>
                  <span className="block text-xs text-faint">{shortDate(r.date)}</span>
                </span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center justify-between">
            <SectionLabel>Upcoming work</SectionLabel>
            <button onClick={() => onNavigate("jobs")} className="text-xs font-medium text-accent hover:underline cursor-pointer">
              All jobs
            </button>
          </div>
          <div className="mt-3 space-y-2.5">
            {upcomingJobs.map((j) => (
              <button
                key={j.id}
                onClick={() => onNavigate("jobs")}
                className="glass-well flex w-full items-center gap-3 px-3.5 py-3 text-left transition-colors hover:bg-white/6 cursor-pointer"
              >
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-ink">{j.title}</span>
                  <span className="block truncate text-xs text-muted">{j.customer} · {shortDate(j.date)}</span>
                </span>
                <span className="shrink-0 text-sm font-semibold tabular-nums text-ink">{aud(j.fee)}</span>
              </button>
            ))}
            {upcomingJobs.length === 0 && <p className="py-6 text-center text-sm text-muted">No upcoming jobs yet.</p>}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

/* ------------------------------ sub parts ------------------------------ */

const PulseRow: React.FC<{ label: string; value: string; delta?: { up: boolean; value: string } }> = ({ label, value, delta }) => (
  <div className="flex items-center justify-between">
    <span className="text-sm text-muted">{label}</span>
    <span className="flex items-center gap-2">
      <span className="text-sm font-semibold tabular-nums text-ink">{value}</span>
      {delta && (
        <span className={cx("inline-flex items-center gap-0.5 text-xs font-semibold", delta.up ? "text-ok" : "text-alert")}>
          <span aria-hidden>{delta.up ? "↑" : "↓"}</span>
          {delta.value}
        </span>
      )}
    </span>
  </div>
);

const RevenueBar: React.FC<{ label: string; value: number; max: number; active?: boolean }> = ({ label, value, max, active }) => (
  <div>
    <div className="mb-1 flex items-center justify-between text-sm">
      <span className="text-muted">{label}</span>
      <span className="tabular-nums text-ink">{aud(value)}</span>
    </div>
    <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/8">
      <div
        className={cx("h-full rounded-full", active ? "bg-accent" : "bg-white/25")}
        style={{ width: `${max > 0 ? Math.round((value / max) * 100) : 0}%` }}
      />
    </div>
  </div>
);

const MiniStat: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="glass-well px-3 py-2.5">
    <div className="text-lg font-bold tabular-nums text-ink">{value}</div>
    <div className="text-[11px] text-muted">{label}</div>
  </div>
);
