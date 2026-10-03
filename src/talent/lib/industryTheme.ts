import type { IndustryModule } from "./industries";

/** One accent per industry. Creator keeps the talentOS violet. */
const THEMES: Record<IndustryModule, { h: number; s: number; accent: string }> = {
  creator: { h: 272, s: 62, accent: "#7434d1" },
  trades: { h: 18, s: 86, accent: "#c2410c" },
  professional: { h: 221, s: 76, accent: "#1d4ed8" },
  health: { h: 175, s: 78, accent: "#0f766e" },
  hospitality: { h: 343, s: 80, accent: "#9f1239" },
  maker: { h: 84, s: 72, accent: "#4d7c0f" },
  general: { h: 215, s: 28, accent: "#334155" },
};

const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;
const LIGHTS = [96, 91, 82, 72, 62, 50, 42, 34, 26, 18, 12];

function hsl(h: number, s: number, l: number, a?: number) {
  const base = `${h} ${s}% ${l}%`;
  return a === undefined ? `hsl(${base})` : `hsl(${base} / ${a})`;
}

export function industryAccent(id: string | undefined | null): string {
  if (id && id in THEMES) return THEMES[id as IndustryModule].accent;
  return THEMES.creator.accent;
}

/** Paint accent, brand gradient, and the remapped emerald/teal scales. */
export function applyIndustryTheme(id: string | undefined | null) {
  if (typeof document === "undefined") return;
  const key = (id && id in THEMES ? id : "creator") as IndustryModule;
  const theme = THEMES[key];
  const root = document.documentElement;
  const set = (name: string, value: string) => root.style.setProperty(name, value);
  const dark = root.classList.contains("dark");

  set("--color-accent", theme.accent);
  set("--color-accent-strong", hsl(theme.h, theme.s, 32));
  set("--color-accent-soft", hsl(theme.h, theme.s, 42, 0.14));
  set("--color-cyan", hsl(theme.h, Math.min(theme.s, 72), 48));
  set("--color-brand-cyan", hsl(theme.h, Math.min(theme.s, 70), 56));
  set("--color-brand-blue", hsl(theme.h, theme.s, 46));
  set("--color-brand-violet", theme.accent);
  set("--color-brand-magenta", hsl((theme.h + 16) % 360, theme.s, 46));
  set("--color-brand-pink", hsl((theme.h + 32) % 360, Math.min(theme.s, 78), 54));
  set("--glow-a", hsl(theme.h, theme.s, 50, dark ? 0.16 : 0.1));
  set("--glow-b", hsl((theme.h + 28) % 360, theme.s, 48, dark ? 0.14 : 0.09));

  STEPS.forEach((step, index) => {
    const tone = hsl(theme.h, theme.s, LIGHTS[index]);
    set(`--color-emerald-${step}`, tone);
    set(`--color-teal-${step}`, hsl(theme.h, Math.max(18, theme.s - 18), LIGHTS[index]));
  });
  set("--color-emerald-500", theme.accent);
  set("--color-emerald-600", hsl(theme.h, theme.s, 40));

  root.dataset.industry = key;
  const bar = dark ? "#101218" : theme.accent;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", bar);
}
