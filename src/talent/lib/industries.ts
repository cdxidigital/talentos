import type { BookingType, OperatingProfile } from "../types";

export type IndustryModule = "creator" | "trades" | "professional" | "health" | "hospitality" | "maker" | "general";

export interface BookingOption {
  value: BookingType;
  label: string;
}

export interface StreamOption {
  key: Exclude<keyof OperatingProfile, "industryModule">;
  label: string;
  desc: string;
}

export interface Industry {
  id: IndustryModule;
  label: string;
  blurb: string;
  jobNoun: string;
  titleLabel: string;
  titlePlaceholder: string;
  clientLabel: string;
  feeLabel: string;
  types: BookingOption[];
  streams: StreamOption[];
}

export const INDUSTRIES: Industry[] = [
  {
    id: "creator",
    label: "Creator & talent",
    blurb: "Brand work, content, and appearances.",
    jobNoun: "Booking",
    titleLabel: "Campaign / deal title",
    titlePlaceholder: "e.g. Spring campaign, 3 reels",
    clientLabel: "Client",
    feeLabel: "Fee (AUD)",
    types: [
      { value: "campaign", label: "Full campaign" },
      { value: "ugc", label: "UGC" },
      { value: "paid_post", label: "Paid post / reel" },
      { value: "event_appearance", label: "Event / appearance" },
      { value: "modelling", label: "Modelling & stills" },
      { value: "livestream", label: "Livestream" },
      { value: "licensing", label: "Content licensing" },
      { value: "sponsored_content", label: "Sponsored content" },
    ],
    streams: [
      { key: "hasBookings", label: "Brand deals", desc: "Posts, UGC, appearances, and campaigns." },
      { key: "hasPlatformPayouts", label: "Platform payouts", desc: "YouTube, TikTok, Patreon, and similar." },
      { key: "hasDigitalProducts", label: "Digital products", desc: "Presets, guides, and downloads." },
      { key: "hasPhysicalProducts", label: "Merch", desc: "Apparel, prints, and physical goods." },
      { key: "hasContractors", label: "Contractors", desc: "Editors, videographers, assistants." },
      { key: "hasEmployees", label: "Staff", desc: "People you pay wages." },
    ],
  },
  {
    id: "trades",
    label: "Trades",
    blurb: "Call-outs, installs, and maintenance.",
    jobNoun: "Job",
    titleLabel: "Job title",
    titlePlaceholder: "e.g. Switchboard upgrade, Bondi",
    clientLabel: "Customer",
    feeLabel: "Quote / job price (AUD)",
    types: [
      { value: "quoted_job", label: "Quoted job" },
      { value: "callout", label: "Call-out" },
      { value: "install", label: "Installation" },
      { value: "maintenance", label: "Maintenance" },
      { value: "repair", label: "Repair" },
    ],
    streams: [
      { key: "hasBookings", label: "Quoted jobs", desc: "Work you price and invoice." },
      { key: "hasPhysicalProducts", label: "Materials", desc: "Parts and materials on the invoice." },
      { key: "hasContractors", label: "Subcontractors", desc: "Other trades you bring in." },
      { key: "hasEmployees", label: "Apprentices or staff", desc: "People on wages." },
    ],
  },
  {
    id: "professional",
    label: "Professional services",
    blurb: "Advice, retainers, and workshops.",
    jobNoun: "Engagement",
    titleLabel: "Engagement title",
    titlePlaceholder: "e.g. Quarterly advisory, Northside",
    clientLabel: "Client",
    feeLabel: "Fee (AUD)",
    types: [
      { value: "consult", label: "Consult" },
      { value: "session", label: "Session" },
      { value: "retainer", label: "Retainer" },
      { value: "workshop", label: "Workshop" },
    ],
    streams: [
      { key: "hasBookings", label: "Client work", desc: "Advice, projects, and sessions." },
      { key: "hasSubscriptions", label: "Retainers", desc: "Ongoing monthly work." },
      { key: "hasContractors", label: "Associates", desc: "People you subcontract." },
      { key: "hasEmployees", label: "Staff", desc: "People on wages." },
    ],
  },
  {
    id: "health",
    label: "Health & wellbeing",
    blurb: "Appointments, treatments, and packages.",
    jobNoun: "Appointment",
    titleLabel: "Appointment",
    titlePlaceholder: "e.g. Initial consult, 60 minutes",
    clientLabel: "Client",
    feeLabel: "Fee (AUD)",
    types: [
      { value: "appointment", label: "Appointment" },
      { value: "treatment", label: "Treatment" },
      { value: "package", label: "Package" },
      { value: "session", label: "Session" },
    ],
    streams: [
      { key: "hasBookings", label: "Appointments", desc: "Sessions you book and invoice." },
      { key: "hasDigitalProducts", label: "Programs", desc: "Plans or downloads you sell." },
      { key: "hasContractors", label: "Practitioners", desc: "Other practitioners you pay." },
      { key: "hasEmployees", label: "Staff", desc: "Reception or clinicians on wages." },
    ],
  },
  {
    id: "hospitality",
    label: "Hospitality & events",
    blurb: "Functions, catering, and bookings.",
    jobNoun: "Booking",
    titleLabel: "Booking title",
    titlePlaceholder: "e.g. Saturday function, 40 guests",
    clientLabel: "Client",
    feeLabel: "Price (AUD)",
    types: [
      { value: "function", label: "Function" },
      { value: "event_appearance", label: "Event" },
      { value: "catering", label: "Catering" },
      { value: "service", label: "Service" },
    ],
    streams: [
      { key: "hasBookings", label: "Events & bookings", desc: "Functions and dated work." },
      { key: "hasPhysicalProducts", label: "Food & goods", desc: "What you sell on the day." },
      { key: "hasContractors", label: "Casual crew", desc: "People you engage per job." },
      { key: "hasEmployees", label: "Staff", desc: "People on wages." },
    ],
  },
  {
    id: "maker",
    label: "Maker & retail",
    blurb: "Custom orders, commissions, and repairs.",
    jobNoun: "Order",
    titleLabel: "Order title",
    titlePlaceholder: "e.g. Custom table, walnut",
    clientLabel: "Customer",
    feeLabel: "Price (AUD)",
    types: [
      { value: "custom_order", label: "Custom order" },
      { value: "commission", label: "Commission" },
      { value: "repair", label: "Repair" },
      { value: "workshop", label: "Workshop" },
    ],
    streams: [
      { key: "hasBookings", label: "Commissions", desc: "Work made to order." },
      { key: "hasPhysicalProducts", label: "Goods for sale", desc: "Ready-made stock." },
      { key: "hasDigitalProducts", label: "Online sales", desc: "Orders that come in online." },
      { key: "hasEmployees", label: "Staff", desc: "People on wages." },
    ],
  },
  {
    id: "general",
    label: "Other sole trader",
    blurb: "Any other trade. Jobs, quotes, and services.",
    jobNoun: "Job",
    titleLabel: "Job title",
    titlePlaceholder: "e.g. Site visit and quote",
    clientLabel: "Customer",
    feeLabel: "Price (AUD)",
    types: [
      { value: "service", label: "Service" },
      { value: "job", label: "Job" },
      { value: "consult", label: "Advice" },
      { value: "site_visit", label: "Site visit" },
      { value: "quoted_job", label: "Quote" },
    ],
    streams: [
      { key: "hasBookings", label: "Client jobs", desc: "Work you do for a customer." },
      { key: "hasPhysicalProducts", label: "Goods", desc: "Things you sell." },
      { key: "hasDigitalProducts", label: "Digital sales", desc: "Downloads or online offers." },
      { key: "hasContractors", label: "Contractors", desc: "People you pay per job." },
      { key: "hasEmployees", label: "Staff", desc: "People on wages." },
    ],
  },
];

export function industryById(id: string | undefined | null): Industry {
  if (!id) return INDUSTRIES.find((item) => item.id === "creator")!;
  return INDUSTRIES.find((item) => item.id === id) ?? INDUSTRIES.find((item) => item.id === "general")!;
}

export function bookingTypeLabel(type: string, moduleId?: string): string {
  const preferred = industryById(moduleId).types.find((item) => item.value === type);
  if (preferred) return preferred.label;
  for (const industry of INDUSTRIES) {
    const hit = industry.types.find((item) => item.value === type);
    if (hit) return hit.label;
  }
  return type.replaceAll("_", " ");
}
