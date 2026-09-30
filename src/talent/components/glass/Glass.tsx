import React from "react";
import {
  Check,
  AlertTriangle,
  AlertCircle,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import type { TaskTone } from "../../lib/store";

/* ----------------------------- utilities ----------------------------- */

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/* ------------------------------- Card -------------------------------- */

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
  interactive?: boolean;
  as?: "div" | "section" | "article";
}

export const GlassCard: React.FC<GlassCardProps> = ({
  elevated,
  interactive,
  className,
  as: Tag = "div",
  children,
  ...rest
}) => (
  <Tag
    className={cx(
      elevated ? "glass-elevated" : "glass",
      interactive && "glass-interactive cursor-pointer",
      "p-5 sm:p-6",
      className
    )}
    {...rest}
  >
    {children}
  </Tag>
);

/* ------------------------------ Section ------------------------------ */

export const SectionLabel: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div
    className={cx(
      "text-[11px] font-semibold uppercase tracking-[0.16em] text-faint",
      className
    )}
  >
    {children}
  </div>
);

/* ------------------------------ Button ------------------------------- */

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  full?: boolean;
}

const VARIANT: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-[#fff] font-semibold shadow-[0_6px_20px_-4px_rgba(139,60,240,0.5)] hover:bg-accent-strong hover:shadow-[0_12px_30px_-6px_rgba(139,60,240,0.65)]",
  secondary:
    "glass text-ink font-medium hover:border-accent/45 hover:shadow-[0_10px_26px_rgba(20,22,29,0.09)]",
  ghost: "text-muted font-medium hover:text-ink hover:bg-[color:rgba(20,22,29,0.05)]",
  danger:
    "border border-alert/40 text-alert font-semibold hover:bg-alert/10 hover:border-alert/60",
};

const SIZE: Record<ButtonSize, string> = {
  sm: "text-xs px-3 py-1.5 gap-1.5 rounded-lg",
  md: "text-sm px-4 py-2.5 gap-2 rounded-xl",
  lg: "text-sm px-5 py-3 gap-2 rounded-xl",
};

export const GlassButton: React.FC<GlassButtonProps> = ({
  variant = "secondary",
  size = "md",
  icon: Icon,
  full,
  className,
  children,
  ...rest
}) => (
  <button
    className={cx(
      "inline-flex items-center justify-center select-none whitespace-nowrap cursor-pointer will-change-transform transition-all duration-200 ease-out hover:-translate-y-px active:translate-y-0 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
      VARIANT[variant],
      SIZE[size],
      full && "w-full",
      className
    )}
    {...rest}
  >
    {Icon && <Icon className={size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"} />}
    {children}
  </button>
);

/* ------------------------------ Metric ------------------------------- */

interface GlassMetricProps {
  label: string;
  value: string;
  delta?: { value: string; up: boolean };
  hint?: string;
  size?: "md" | "lg" | "xl";
}

export const GlassMetric: React.FC<GlassMetricProps> = ({ label, value, delta, hint, size = "md" }) => {
  const valueClass =
    size === "xl"
      ? "text-4xl sm:text-5xl"
      : size === "lg"
        ? "text-3xl"
        : "text-2xl";
  return (
    <div>
      <div className="text-xs font-medium text-muted">{label}</div>
      <div className={cx("mt-1.5 font-display font-bold text-ink tabular-nums", valueClass)}>{value}</div>
      {delta && (
        <div className={cx("mt-1.5 inline-flex items-center gap-1 text-xs font-semibold", delta.up ? "text-ok" : "text-alert")}>
          <span aria-hidden>{delta.up ? "↑" : "↓"}</span>
          {delta.value}
        </div>
      )}
      {hint && <div className="mt-1 text-xs text-faint">{hint}</div>}
    </div>
  );
};

/* ------------------------------ Status ------------------------------- */

export const TONE_META: Record<TaskTone, { icon: LucideIcon; color: string; bg: string; ring: string; label: string }> = {
  ok: { icon: Check, color: "text-ok", bg: "bg-ok/12", ring: "ring-ok/20", label: "All good" },
  warn: { icon: AlertTriangle, color: "text-warn", bg: "bg-warn/12", ring: "ring-warn/20", label: "Worth checking" },
  alert: { icon: AlertCircle, color: "text-alert", bg: "bg-alert/12", ring: "ring-alert/20", label: "Needs action" },
  info: { icon: ArrowRight, color: "text-info", bg: "bg-info/12", ring: "ring-info/20", label: "For your info" },
};

export const StatusIcon: React.FC<{ tone: TaskTone; className?: string }> = ({ tone, className }) => {
  const meta = TONE_META[tone];
  const Icon = meta.icon;
  return (
    <span
      className={cx(
        "inline-flex items-center justify-center rounded-full ring-1",
        meta.bg,
        meta.ring,
        meta.color,
        className ?? "w-7 h-7"
      )}
    >
      <Icon className="w-4 h-4" />
      <span className="sr-only">{meta.label}</span>
    </span>
  );
};

/* ------------------------------ Badge -------------------------------- */

interface GlassBadgeProps {
  children: React.ReactNode;
  tone?: TaskTone | "neutral" | "accent";
  className?: string;
}

export const GlassBadge: React.FC<GlassBadgeProps> = ({ children, tone = "neutral", className }) => {
  const tones: Record<string, string> = {
    neutral: "bg-white/6 text-muted border-white/10",
    accent: "bg-accent-soft text-accent border-accent/25",
    ok: "bg-ok/12 text-ok border-ok/25",
    warn: "bg-warn/12 text-warn border-warn/25",
    alert: "bg-alert/12 text-alert border-alert/25",
    info: "bg-info/12 text-info border-info/25",
  };
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
};

/* ----------------------------- Progress ------------------------------ */

interface ProgressProps {
  value: number;
  max: number;
  tone?: "accent" | "warn" | "alert";
  className?: string;
}

export const GlassProgress: React.FC<ProgressProps> = ({ value, max, tone = "accent", className }) => {
  const pct = Math.min(100, Math.round((value / max) * 100));
  const fill = tone === "warn" ? "bg-warn" : tone === "alert" ? "bg-alert" : "bg-accent";
  return (
    <div
      className={cx("h-2 w-full overflow-hidden rounded-full bg-white/8", className)}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      <div
        className={cx("h-full rounded-full transition-[width] duration-700 ease-out", fill)}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
};

/* ---------------------------- Empty state ---------------------------- */

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  body: string;
  action?: React.ReactNode;
}

export const GlassEmptyState: React.FC<EmptyStateProps> = ({ icon: Icon, title, body, action }) => (
  <div className="flex flex-col items-center justify-center gap-3 py-14 text-center">
    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-muted">
      <Icon className="h-6 w-6" />
    </span>
    <div>
      <h3 className="font-display text-base font-semibold text-ink">{title}</h3>
      <p className="mx-auto mt-1 max-w-xs text-sm text-muted text-pretty">{body}</p>
    </div>
    {action}
  </div>
);

/* ----------------------------- IconTile ------------------------------ */

export const IconTile: React.FC<{ icon: LucideIcon; className?: string }> = ({ icon: Icon, className }) => (
  <span
    className={cx(
      "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/6 text-accent",
      className
    )}
  >
    <Icon className="h-5 w-5" />
  </span>
);
