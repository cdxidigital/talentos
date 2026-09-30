import React from "react";
import { Plus, Minus, ArrowUpRight, ArrowDownRight, Paperclip, AlertTriangle } from "lucide-react";
import { GlassCard, GlassButton, SectionLabel, GlassBadge, cx } from "../components/glass/Glass";
import { useStore } from "../lib/store";
import { aud, audSigned, shortDate, isSameMonth, TODAY } from "../lib/format";
import type { AddType } from "../components/AddSheet";

export const MoneyScreen: React.FC<{ onAdd: (t: AddType) => void }> = ({ onAdd }) => {
  const { income, expenses, metrics } = useStore();
  const net = metrics.moneyInMonth - metrics.moneyOutMonth;

  return (
    <div className="mx-auto max-w-6xl space-y-6 animate-rise">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <SectionLabel>Money</SectionLabel>
          <h1 className="mt-1 font-display text-3xl font-bold text-ink">This month</h1>
        </div>
        <div className="flex gap-2">
          <GlassButton variant="primary" icon={Plus} onClick={() => onAdd("income")}>Money in</GlassButton>
          <GlassButton variant="secondary" icon={Minus} onClick={() => onAdd("expense")}>Money out</GlassButton>
        </div>
      </header>

      {/* Summary strip */}
      <GlassCard elevated className="flex flex-wrap items-center gap-x-10 gap-y-4">
        <Summary label="Came in" value={aud(metrics.moneyInMonth)} tone="ok" />
        <Summary label="Went out" value={aud(metrics.moneyOutMonth)} tone="ink" />
        <Summary label="Left over" value={aud(net)} tone={net >= 0 ? "accent" : "alert"} />
      </GlassCard>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Money in */}
        <GlassCard>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-ok/12 text-ok">
              <ArrowUpRight className="h-4 w-4" />
            </span>
            <SectionLabel>Money in</SectionLabel>
          </div>
          <div className="mt-3 divide-y divide-white/6">
            {income.map((i) => (
              <div key={i.id} className="flex items-center gap-3 py-3">
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-ink">{i.label}</span>
                  <span className="block truncate text-xs text-muted">{i.sublabel ?? "Income"}</span>
                </span>
                <span className="shrink-0 text-right">
                  <span className="block text-sm font-semibold tabular-nums text-ok">{audSigned(i.amount)}</span>
                  <span className="block text-xs text-faint">{shortDate(i.date)}</span>
                </span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Money out */}
        <GlassCard>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white/6 text-muted">
              <ArrowDownRight className="h-4 w-4" />
            </span>
            <SectionLabel>Money out</SectionLabel>
          </div>
          <div className="mt-3 divide-y divide-white/6">
            {expenses.map((e) => (
              <div key={e.id} className="flex items-center gap-3 py-3">
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="truncate text-sm font-medium text-ink">{e.supplier}</span>
                    {e.hasReceipt && <Paperclip className="h-3 w-3 shrink-0 text-faint" />}
                  </span>
                  <span className="mt-0.5 flex flex-wrap items-center gap-1.5 text-xs text-muted">
                    <span>{e.category}</span>
                    {e.businessUse < 100 && e.businessUse > 0 && (
                      <GlassBadge>{e.businessUse}% business</GlassBadge>
                    )}
                    {e.needsReview && (
                      <GlassBadge tone="warn"><AlertTriangle className="h-3 w-3" /> Review</GlassBadge>
                    )}
                  </span>
                </span>
                <span className="shrink-0 text-right">
                  <span className="block text-sm font-semibold tabular-nums text-ink">{audSigned(-e.amount)}</span>
                  <span className="block text-xs text-faint">{shortDate(e.date)}</span>
                </span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

const Summary: React.FC<{ label: string; value: string; tone: "ok" | "ink" | "accent" | "alert" }> = ({ label, value, tone }) => {
  const color = tone === "ok" ? "text-ok" : tone === "accent" ? "text-accent" : tone === "alert" ? "text-alert" : "text-ink";
  return (
    <div>
      <div className="text-xs font-medium text-muted">{label}</div>
      <div className={cx("mt-1 font-display text-2xl font-bold tabular-nums", color)}>{value}</div>
    </div>
  );
};
