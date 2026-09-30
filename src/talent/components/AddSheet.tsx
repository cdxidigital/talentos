import React, { useState } from "react";
import {
  Check,
  ScanLine,
  PencilLine,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { GlassModal } from "./glass/Modal";
import { GlassButton, SectionLabel, cx } from "./glass/Glass";
import { useStore, type IncomeSource } from "../lib/store";
import { TODAY, aud } from "../lib/format";

export type AddType = "income" | "expense" | "job" | "invoice";

const TITLES: Record<AddType, string> = {
  income: "Add money in",
  expense: "Add money out",
  job: "Add a job",
  invoice: "Create an invoice",
};

const todayIso = TODAY.toISOString().slice(0, 10);

/* --------------------------- small primitives -------------------------- */

const Field: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <label className="block">
    <span className="mb-1.5 block text-xs font-medium text-muted">{label}</span>
    {children}
  </label>
);

const inputCls =
  "w-full rounded-xl bg-white/5 border border-white/10 px-3.5 py-2.5 text-sm text-ink placeholder:text-faint focus:border-accent/50 focus:bg-white/8 outline-none transition-colors";

const OptionButton: React.FC<{
  label: string;
  sub?: string;
  icon?: LucideIcon;
  active?: boolean;
  onClick: () => void;
}> = ({ label, sub, icon: Icon, active, onClick }) => (
  <button
    onClick={onClick}
    className={cx(
      "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-200 cursor-pointer",
      active
        ? "border-accent/50 bg-accent-soft"
        : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
    )}
  >
    {Icon && (
      <span className={cx("inline-flex h-8 w-8 items-center justify-center rounded-lg", active ? "bg-accent/20 text-accent" : "bg-white/6 text-muted")}>
        <Icon className="h-4 w-4" />
      </span>
    )}
    <span className="min-w-0">
      <span className="block text-sm font-medium text-ink">{label}</span>
      {sub && <span className="block truncate text-xs text-muted">{sub}</span>}
    </span>
  </button>
);

const Stepper: React.FC<{ step: number; total: number }> = ({ step, total }) => (
  <div className="mb-5 flex items-center gap-1.5">
    {Array.from({ length: total }).map((_, i) => (
      <span
        key={i}
        className={cx("h-1 flex-1 rounded-full transition-colors", i <= step ? "bg-accent" : "bg-white/10")}
      />
    ))}
  </div>
);

const DoneState: React.FC<{ title: string; body: string; onClose: () => void }> = ({ title, body, onClose }) => (
  <div className="py-6 text-center">
    <span className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/15 text-accent">
      <Check className="h-7 w-7" />
    </span>
    <h3 className="font-display text-xl font-bold text-ink">{title}</h3>
    <p className="mx-auto mt-1.5 max-w-xs text-sm text-muted text-pretty">{body}</p>
    <GlassButton variant="primary" className="mt-6" onClick={onClose}>
      Done
    </GlassButton>
  </div>
);

/* ------------------------------- Income -------------------------------- */

const INCOME_OPTIONS: { label: string; source: IncomeSource; hint: string }[] = [
  { label: "Someone paid me", source: "brand_deal", hint: "A brand, agency or customer" },
  { label: "A platform paid me", source: "platform", hint: "OnlyFans, YouTube, Patreon…" },
  { label: "I sold something", source: "product", hint: "A product, preset or service" },
  { label: "I received a tip", source: "tip", hint: "A one-off gift or tip" },
  { label: "Something else", source: "other", hint: "Anything not listed" },
];

const IncomeFlow: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { addIncome, notify } = useStore();
  const [step, setStep] = useState(0);
  const [source, setSource] = useState<IncomeSource>("brand_deal");
  const [amount, setAmount] = useState("");
  const [label, setLabel] = useState("");
  const [what, setWhat] = useState("");

  const amt = parseFloat(amount) || 0;

  if (step === 4) {
    return <DoneState title="Income recorded" body={`We saved ${aud(amt)} from ${label || "your income"}.`} onClose={onClose} />;
  }

  return (
    <div>
      <Stepper step={step} total={4} />
      {step === 0 && (
        <div className="space-y-2.5">
          <h3 className="mb-1 font-display text-lg font-bold text-ink">What happened?</h3>
          {INCOME_OPTIONS.map((o) => (
            <OptionButton
              key={o.source}
              label={o.label}
              sub={o.hint}
              active={false}
              onClick={() => {
                setSource(o.source);
                setStep(1);
              }}
            />
          ))}
        </div>
      )}
      {step === 1 && (
        <div className="space-y-4">
          <h3 className="font-display text-lg font-bold text-ink">How much?</h3>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-semibold text-faint">$</span>
            <input
              autoFocus
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
              placeholder="0.00"
              className="w-full rounded-xl bg-white/5 border border-white/10 py-4 pl-9 pr-4 text-3xl font-bold tabular-nums text-ink placeholder:text-faint focus:border-accent/50 outline-none"
            />
          </div>
          <div className="flex justify-between gap-3">
            <GlassButton variant="ghost" onClick={() => setStep(0)}>Back</GlassButton>
            <GlassButton variant="primary" disabled={amt <= 0} onClick={() => setStep(2)}>Continue</GlassButton>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="space-y-4">
          <h3 className="font-display text-lg font-bold text-ink">Who was it from?</h3>
          <div className="flex flex-wrap gap-2">
            {["Brand", "Platform", "Customer", "Agency", "Other"].map((c) => (
              <button
                key={c}
                onClick={() => setLabel(c)}
                className={cx(
                  "rounded-full border px-3.5 py-1.5 text-sm transition-colors cursor-pointer",
                  label === c ? "border-accent/50 bg-accent-soft text-accent" : "border-white/10 text-muted hover:text-ink"
                )}
              >
                {c}
              </button>
            ))}
          </div>
          <Field label="Or type a name">
            <input className={inputCls} value={label} onChange={(e) => setLabel(e.target.value)} placeholder="e.g. Vogue Australia" />
          </Field>
          <div className="flex justify-between gap-3">
            <GlassButton variant="ghost" onClick={() => setStep(1)}>Back</GlassButton>
            <GlassButton variant="primary" disabled={!label} onClick={() => setStep(3)}>Continue</GlassButton>
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="space-y-4">
          <h3 className="font-display text-lg font-bold text-ink">What was it for?</h3>
          <Field label="A short description">
            <input autoFocus className={inputCls} value={what} onChange={(e) => setWhat(e.target.value)} placeholder="e.g. Summer campaign" />
          </Field>
          <div className="flex justify-between gap-3">
            <GlassButton variant="ghost" onClick={() => setStep(2)}>Back</GlassButton>
            <GlassButton
              variant="primary"
              onClick={() => {
                addIncome({ date: todayIso, source, label, sublabel: what || undefined, amount: amt });
                notify("Income recorded", `${aud(amt)} from ${label}.`);
                setStep(4);
              }}
            >
              Save income
            </GlassButton>
          </div>
        </div>
      )}
    </div>
  );
};

/* ------------------------------- Expense ------------------------------- */

const CATEGORIES = ["Gear", "Software", "Studio", "Advertising", "Travel", "Phone & internet", "Costumes", "Props", "Fees", "Other"];

const ExpenseFlow: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { addExpense, notify } = useStore();
  const [step, setStep] = useState(0); // 0 method, 1 details, 2 business use, 3 done
  const [supplier, setSupplier] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Gear");
  const [scanned, setScanned] = useState(false);

  const amt = parseFloat(amount) || 0;

  const finish = (businessUse: number, review: boolean) => {
    addExpense({
      date: todayIso,
      supplier: supplier || "Officeworks",
      category,
      amount: amt,
      businessUse,
      hasReceipt: scanned,
      needsReview: review,
      note: review ? "Flagged for review" : undefined,
    });
    notify("Expense saved", `${aud(amt)} at ${supplier || "Officeworks"}.`);
    setStep(3);
  };

  if (step === 3) {
    return <DoneState title="Saved" body="We'll keep the receipt with the expense so it's ready at tax time." onClose={onClose} />;
  }

  return (
    <div>
      <Stepper step={step} total={3} />
      {step === 0 && (
        <div className="space-y-2.5">
          <h3 className="mb-1 font-display text-lg font-bold text-ink">Add an expense</h3>
          <OptionButton
            label="Scan a receipt"
            sub="We'll read the details for you"
            icon={ScanLine}
            onClick={() => {
              setScanned(true);
              setSupplier("Officeworks");
              setAmount("129.00");
              setCategory("Gear");
              setStep(1);
            }}
          />
          <OptionButton label="Enter it manually" sub="Type the details yourself" icon={PencilLine} onClick={() => setStep(1)} />
        </div>
      )}
      {step === 1 && (
        <div className="space-y-4">
          {scanned && (
            <div className="rounded-xl border border-accent/25 bg-accent-soft px-4 py-3 text-sm">
              <div className="flex items-center gap-2 text-accent font-medium">
                <Sparkles className="h-4 w-4" /> We found these details
              </div>
              <p className="mt-1 text-muted">Check they look right, then continue.</p>
            </div>
          )}
          <Field label="Where from?">
            <input className={inputCls} value={supplier} onChange={(e) => setSupplier(e.target.value)} placeholder="e.g. Officeworks" />
          </Field>
          <Field label="How much?">
            <input inputMode="decimal" className={inputCls} value={amount} onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))} placeholder="0.00" />
          </Field>
          <Field label="What was it for?">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={cx(
                    "rounded-full border px-3 py-1.5 text-xs transition-colors cursor-pointer",
                    category === c ? "border-accent/50 bg-accent-soft text-accent" : "border-white/10 text-muted hover:text-ink"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </Field>
          <div className="flex justify-between gap-3">
            <GlassButton variant="ghost" onClick={() => setStep(0)}>Back</GlassButton>
            <GlassButton variant="primary" disabled={amt <= 0 || !supplier} onClick={() => setStep(2)}>Continue</GlassButton>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="space-y-4">
          <h3 className="font-display text-lg font-bold text-ink">Was this for your business?</h3>
          <div className="grid gap-2.5">
            <OptionButton label="Yes, all of it" onClick={() => finish(100, false)} />
            <OptionButton label="Partly" sub="Some business, some personal" onClick={() => {}} />
          </div>
          <div>
            <SectionLabel className="mb-2">If partly, how much was business use?</SectionLabel>
            <div className="flex flex-wrap gap-2">
              {[75, 50, 25].map((p) => (
                <button key={p} onClick={() => finish(p, false)} className="rounded-full border border-white/10 px-4 py-2 text-sm text-muted hover:text-ink hover:border-white/20 transition-colors cursor-pointer">
                  {p}%
                </button>
              ))}
              <button onClick={() => finish(50, true)} className="rounded-full border border-warn/30 bg-warn/10 px-4 py-2 text-sm text-warn transition-colors cursor-pointer">
                Not sure — flag it
              </button>
            </div>
          </div>
          <OptionButton label="No, it was personal" onClick={() => finish(0, false)} />
          <GlassButton variant="ghost" onClick={() => setStep(1)}>Back</GlassButton>
        </div>
      )}
    </div>
  );
};

/* --------------------------------- Job --------------------------------- */

const JobFlow: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { addJob, notify } = useStore();
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState("");
  const [customer, setCustomer] = useState("");
  const [fee, setFee] = useState("");
  const [work, setWork] = useState("");

  const feeAmt = parseFloat(fee) || 0;

  if (step === 1) {
    return <DoneState title="Job added" body={`${title} for ${customer} is now in your pipeline.`} onClose={onClose} />;
  }

  return (
    <div className="space-y-4">
      <h3 className="font-display text-lg font-bold text-ink">Add a job</h3>
      <Field label="What's the job?">
        <input autoFocus className={inputCls} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Summer campaign" />
      </Field>
      <Field label="Who's the customer?">
        <input className={inputCls} value={customer} onChange={(e) => setCustomer(e.target.value)} placeholder="e.g. ABC Agency" />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Fee">
          <input inputMode="decimal" className={inputCls} value={fee} onChange={(e) => setFee(e.target.value.replace(/[^0-9.]/g, ""))} placeholder="0.00" />
        </Field>
        <Field label="What's involved?">
          <input className={inputCls} value={work} onChange={(e) => setWork(e.target.value)} placeholder="e.g. 3 videos" />
        </Field>
      </div>
      <div className="flex justify-end gap-3">
        <GlassButton variant="ghost" onClick={onClose}>Cancel</GlassButton>
        <GlassButton
          variant="primary"
          disabled={!title || !customer}
          onClick={() => {
            addJob({
              title,
              customer,
              fee: feeAmt,
              date: todayIso,
              stage: "Enquiry",
              work: work || "To be confirmed",
              contractSigned: false,
              invoiceCreated: false,
            });
            notify("Job added", `${title} is in your pipeline.`);
            setStep(1);
          }}
        >
          Add job
        </GlassButton>
      </div>
    </div>
  );
};

/* ------------------------------- Invoice ------------------------------- */

const InvoiceFlow: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { notify, profile } = useStore();
  const [step, setStep] = useState(0);
  const [customer, setCustomer] = useState("");
  const [work, setWork] = useState("");
  const [amount, setAmount] = useState("");

  const amt = parseFloat(amount) || 0;

  if (step === 3) {
    return <DoneState title="Invoice ready" body={`We prepared ${profile.gstRegistered ? "a tax invoice" : "an invoice"} for ${customer}.`} onClose={onClose} />;
  }

  return (
    <div>
      <Stepper step={step} total={3} />
      {step === 0 && (
        <div className="space-y-4">
          <h3 className="font-display text-lg font-bold text-ink">Who are you billing?</h3>
          <Field label="Customer or brand">
            <input autoFocus className={inputCls} value={customer} onChange={(e) => setCustomer(e.target.value)} placeholder="e.g. ABC Agency" />
          </Field>
          <div className="flex justify-end">
            <GlassButton variant="primary" disabled={!customer} onClick={() => setStep(1)}>Continue</GlassButton>
          </div>
        </div>
      )}
      {step === 1 && (
        <div className="space-y-4">
          <h3 className="font-display text-lg font-bold text-ink">What did you do?</h3>
          <Field label="Describe the work">
            <input autoFocus className={inputCls} value={work} onChange={(e) => setWork(e.target.value)} placeholder="e.g. 3 reels + usage rights" />
          </Field>
          <div className="flex justify-between gap-3">
            <GlassButton variant="ghost" onClick={() => setStep(0)}>Back</GlassButton>
            <GlassButton variant="primary" disabled={!work} onClick={() => setStep(2)}>Continue</GlassButton>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="space-y-4">
          <h3 className="font-display text-lg font-bold text-ink">How much?</h3>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-semibold text-faint">$</span>
            <input
              autoFocus
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
              placeholder="0.00"
              className="w-full rounded-xl bg-white/5 border border-white/10 py-4 pl-9 pr-4 text-3xl font-bold tabular-nums text-ink placeholder:text-faint focus:border-accent/50 outline-none"
            />
          </div>
          <p className="text-xs text-muted">
            {profile.gstRegistered
              ? "You're registered for GST, so we'll create a compliant tax invoice."
              : "You're not registered for GST, so this will be a standard invoice (no GST added)."}
          </p>
          <div className="flex justify-between gap-3">
            <GlassButton variant="ghost" onClick={() => setStep(1)}>Back</GlassButton>
            <GlassButton
              variant="primary"
              disabled={amt <= 0}
              onClick={() => {
                notify("Invoice created", `${aud(amt)} to ${customer}.`);
                setStep(3);
              }}
            >
              Create invoice
            </GlassButton>
          </div>
        </div>
      )}
    </div>
  );
};

/* ------------------------------ container ------------------------------ */

export const AddSheet: React.FC<{ type: AddType | null; onClose: () => void }> = ({ type, onClose }) => {
  if (!type) return null;
  return (
    <GlassModal open={!!type} onClose={onClose} labelledBy="add-sheet-title">
      <h2 id="add-sheet-title" className="sr-only">{TITLES[type]}</h2>
      {type === "income" && <IncomeFlow onClose={onClose} />}
      {type === "expense" && <ExpenseFlow onClose={onClose} />}
      {type === "job" && <JobFlow onClose={onClose} />}
      {type === "invoice" && <InvoiceFlow onClose={onClose} />}
    </GlassModal>
  );
};
