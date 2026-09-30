import React, { useState } from "react";
import { Search, CornerDownLeft, Sparkles } from "lucide-react";
import { GlassModal } from "./glass/Modal";
import { cx } from "./glass/Glass";
import { useStore } from "../lib/store";
import { aud } from "../lib/format";
import type { AddType } from "./AddSheet";
import type { TabId } from "../lib/nav";

interface CommandBarProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (tab: TabId) => void;
  onAdd: (type: AddType) => void;
}

const SUGGESTIONS = [
  "Add money in",
  "Scan a receipt",
  "Show unpaid invoices",
  "Create a job",
  "How much have I made this month?",
  "What tax tasks are due?",
];

export const CommandBar: React.FC<CommandBarProps> = ({ open, onClose, onNavigate, onAdd }) => {
  const { metrics, tasks } = useStore();
  const [value, setValue] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);

  const run = (raw: string) => {
    const q = raw.toLowerCase().trim();
    if (!q) return;
    setAnswer(null);

    if (/(receipt|scan|expense|spent|bought|money out)/.test(q)) return done(() => onAdd("expense"));
    if (/(add|record|got|received).*(money|income|paid|\$)/.test(q) || /money in/.test(q)) return done(() => onAdd("income"));
    if (/(create|add|new).*(job|booking|gig)/.test(q)) return done(() => onAdd("job"));
    if (/(create|add|new|send).*(invoice)/.test(q)) return done(() => onAdd("invoice"));
    if (/(unpaid|owed|owe|overdue|get paid|waiting)/.test(q)) return done(() => onNavigate("getpaid"));
    if (/(job|booking|pipeline)/.test(q)) return done(() => onNavigate("jobs"));

    if (/(made|earn|income|revenue|money).*(month)/.test(q) || /how much/.test(q)) {
      setAnswer(`You've brought in ${aud(metrics.moneyInMonth)} this month, and spent ${aud(metrics.moneyOutMonth)}.`);
      return;
    }
    if (/tax|bas|gst|due/.test(q)) {
      const pending = tasks.filter((t) => t.tone === "alert" || t.tone === "warn").length;
      setAnswer(
        pending
          ? `You have ${pending} tax task${pending > 1 ? "s" : ""} worth checking. Opening Tax & To Do.`
          : "Nothing tax-related needs action right now."
      );
      setTimeout(() => done(() => onNavigate("tax")), 900);
      return;
    }
    if (/money|spend|ledger/.test(q)) return done(() => onNavigate("money"));

    setAnswer("I'm not sure yet — try one of the suggestions below.");
  };

  const done = (fn: () => void) => {
    fn();
    setValue("");
    setAnswer(null);
    onClose();
  };

  return (
    <GlassModal open={open} onClose={onClose} size="md" align="top" showClose={false} labelledBy="ask-title">
      <h2 id="ask-title" className="sr-only">Ask TalentOS</h2>
      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
        <Search className="h-5 w-5 shrink-0 text-accent" />
        <input
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.nativeEvent.isComposing && e.keyCode !== 229) run(value);
          }}
          placeholder="Ask anything, or type a command…"
          className="w-full bg-transparent text-base text-ink placeholder:text-faint outline-none"
        />
        <kbd className="hidden items-center gap-1 rounded-md border border-white/10 px-1.5 py-0.5 text-[10px] text-faint sm:flex">
          <CornerDownLeft className="h-3 w-3" /> Enter
        </kbd>
      </div>

      {answer && (
        <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-accent-soft px-4 py-3 text-sm text-ink">
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          <span className="text-pretty">{answer}</span>
        </div>
      )}

      <div className="mt-4">
        <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-faint">Try</div>
        <div className="grid gap-1.5">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => run(s)}
              className={cx(
                "flex items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-muted transition-colors cursor-pointer hover:bg-white/6 hover:text-ink"
              )}
            >
              <Sparkles className="h-3.5 w-3.5 text-faint" />
              {s}
            </button>
          ))}
        </div>
      </div>
    </GlassModal>
  );
};
