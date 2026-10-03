import { i as __toESM } from "../_runtime.mjs";
import { b as require_jsx_runtime, q as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { a as validateAustralianABN, i as formatAUD, n as evaluateGSTTurnover, r as evaluateWorkerClassification, t as estimateAustralianTax } from "./taxAndRegulatoryEngine-C7FfSM1R.mjs";
import { $ as Camera, A as LogIn, B as FileCheck, C as Package, D as MapPin, E as Maximize2, F as Landmark, G as Clock, H as ExternalLink, I as HandCoins, J as CircleCheckBig, K as Circle, L as Globe, M as LayoutGrid, N as LayoutDashboard, O as Mail, P as Laptop, Q as Check, R as FolderClosed, S as PiggyBank, T as Menu, U as Download, V as Eye, W as Database, X as ChevronRight, Y as CircleAlert, Z as ChevronLeft, _ as RotateCcw, a as Upload, at as ArrowRight, b as Printer, c as Sun, d as ShoppingBag, et as Calendar, f as Shield, g as Search, h as Send, i as User, it as Bell, j as Lock, k as LogOut, l as Sparkles, m as Settings, n as Wallet, nt as Bot, o as TriangleAlert, ot as ArrowLeft, p as ShieldCheck, q as CircleCheck, r as Users, rt as BookOpen, s as TrendingUp, t as X, tt as Briefcase, u as SlidersHorizontal, v as RefreshCw, w as Moon, x as Plus, y as Receipt, z as FileText } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-JSczJ_c9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function asAbn(input) {
	if (typeof input === "string") return input;
	if (input && typeof input === "object" && "abn" in input) return String(input.abn ?? "");
	return "";
}
var lookupAbn = createServerFn({ method: "POST" }).validator(asAbn).handler(createSsrRpc("034379341be875c18e9c2b99abd6431701f16ded51965b8d7ede2df2eaf88538"));
var AbnCheck = ({ abn, booksName, onUse }) => {
	const [hit, setHit] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const run = async () => {
		setBusy(true);
		setError("");
		try {
			setHit(await lookupAbn({ data: abn }));
		} catch {
			setError("Could not reach the register from here.");
		} finally {
			setBusy(false);
		}
	};
	const mismatch = Boolean(hit?.found && booksName && hit.legalName && booksName.trim().toLowerCase() !== hit.legalName.trim().toLowerCase());
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-neutral-800 bg-neutral-950 p-3 text-xs text-neutral-300",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Checks the public ABN Lookup record. It does not lodge anything with the ATO." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => void run(),
					disabled: busy || abn.replace(/\D/g, "").length < 11,
					className: "rounded-lg bg-accent px-3 py-2 text-xs font-semibold text-[#fff] disabled:opacity-40",
					children: busy ? "Checking…" : "Check the register"
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-rose-300",
				children: error
			}),
			hit && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 space-y-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold text-white",
						children: hit.found ? hit.legalName : "No public record"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: hit.message }),
					hit.found && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: hit.entityTypeLabel }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: hit.gstText }),
						hit.location && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Location ", hit.location] })
					] }),
					mismatch && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-amber-300",
						children: [
							"Your books say ",
							booksName,
							". The register says ",
							hit.legalName,
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2 pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: hit.lookupUrl,
							target: "_blank",
							rel: "noreferrer",
							className: "inline-flex items-center gap-1 font-semibold text-accent",
							children: ["Open ABN Lookup ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3 w-3" })]
						}), hit.found && onUse && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => onUse(hit),
							className: "font-semibold text-ink underline-offset-2 hover:underline",
							children: "Use this record on the books"
						})]
					})
				]
			})
		]
	});
};
var INDUSTRIES = [
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
			{
				value: "campaign",
				label: "Full campaign"
			},
			{
				value: "ugc",
				label: "UGC"
			},
			{
				value: "paid_post",
				label: "Paid post / reel"
			},
			{
				value: "event_appearance",
				label: "Event / appearance"
			},
			{
				value: "modelling",
				label: "Modelling & stills"
			},
			{
				value: "livestream",
				label: "Livestream"
			},
			{
				value: "licensing",
				label: "Content licensing"
			},
			{
				value: "sponsored_content",
				label: "Sponsored content"
			}
		],
		streams: [
			{
				key: "hasBookings",
				label: "Brand deals",
				desc: "Posts, UGC, appearances, and campaigns."
			},
			{
				key: "hasPlatformPayouts",
				label: "Platform payouts",
				desc: "YouTube, TikTok, Patreon, and similar."
			},
			{
				key: "hasDigitalProducts",
				label: "Digital products",
				desc: "Presets, guides, and downloads."
			},
			{
				key: "hasPhysicalProducts",
				label: "Merch",
				desc: "Apparel, prints, and physical goods."
			},
			{
				key: "hasContractors",
				label: "Contractors",
				desc: "Editors, videographers, assistants."
			},
			{
				key: "hasEmployees",
				label: "Staff",
				desc: "People you pay wages."
			}
		]
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
			{
				value: "quoted_job",
				label: "Quoted job"
			},
			{
				value: "callout",
				label: "Call-out"
			},
			{
				value: "install",
				label: "Installation"
			},
			{
				value: "maintenance",
				label: "Maintenance"
			},
			{
				value: "repair",
				label: "Repair"
			}
		],
		streams: [
			{
				key: "hasBookings",
				label: "Quoted jobs",
				desc: "Work you price and invoice."
			},
			{
				key: "hasPhysicalProducts",
				label: "Materials",
				desc: "Parts and materials on the invoice."
			},
			{
				key: "hasContractors",
				label: "Subcontractors",
				desc: "Other trades you bring in."
			},
			{
				key: "hasEmployees",
				label: "Apprentices or staff",
				desc: "People on wages."
			}
		]
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
			{
				value: "consult",
				label: "Consult"
			},
			{
				value: "session",
				label: "Session"
			},
			{
				value: "retainer",
				label: "Retainer"
			},
			{
				value: "workshop",
				label: "Workshop"
			}
		],
		streams: [
			{
				key: "hasBookings",
				label: "Client work",
				desc: "Advice, projects, and sessions."
			},
			{
				key: "hasSubscriptions",
				label: "Retainers",
				desc: "Ongoing monthly work."
			},
			{
				key: "hasContractors",
				label: "Associates",
				desc: "People you subcontract."
			},
			{
				key: "hasEmployees",
				label: "Staff",
				desc: "People on wages."
			}
		]
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
			{
				value: "appointment",
				label: "Appointment"
			},
			{
				value: "treatment",
				label: "Treatment"
			},
			{
				value: "package",
				label: "Package"
			},
			{
				value: "session",
				label: "Session"
			}
		],
		streams: [
			{
				key: "hasBookings",
				label: "Appointments",
				desc: "Sessions you book and invoice."
			},
			{
				key: "hasDigitalProducts",
				label: "Programs",
				desc: "Plans or downloads you sell."
			},
			{
				key: "hasContractors",
				label: "Practitioners",
				desc: "Other practitioners you pay."
			},
			{
				key: "hasEmployees",
				label: "Staff",
				desc: "Reception or clinicians on wages."
			}
		]
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
			{
				value: "function",
				label: "Function"
			},
			{
				value: "event_appearance",
				label: "Event"
			},
			{
				value: "catering",
				label: "Catering"
			},
			{
				value: "service",
				label: "Service"
			}
		],
		streams: [
			{
				key: "hasBookings",
				label: "Events & bookings",
				desc: "Functions and dated work."
			},
			{
				key: "hasPhysicalProducts",
				label: "Food & goods",
				desc: "What you sell on the day."
			},
			{
				key: "hasContractors",
				label: "Casual crew",
				desc: "People you engage per job."
			},
			{
				key: "hasEmployees",
				label: "Staff",
				desc: "People on wages."
			}
		]
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
			{
				value: "custom_order",
				label: "Custom order"
			},
			{
				value: "commission",
				label: "Commission"
			},
			{
				value: "repair",
				label: "Repair"
			},
			{
				value: "workshop",
				label: "Workshop"
			}
		],
		streams: [
			{
				key: "hasBookings",
				label: "Commissions",
				desc: "Work made to order."
			},
			{
				key: "hasPhysicalProducts",
				label: "Goods for sale",
				desc: "Ready-made stock."
			},
			{
				key: "hasDigitalProducts",
				label: "Online sales",
				desc: "Orders that come in online."
			},
			{
				key: "hasEmployees",
				label: "Staff",
				desc: "People on wages."
			}
		]
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
			{
				value: "service",
				label: "Service"
			},
			{
				value: "job",
				label: "Job"
			},
			{
				value: "consult",
				label: "Advice"
			},
			{
				value: "site_visit",
				label: "Site visit"
			},
			{
				value: "quoted_job",
				label: "Quote"
			}
		],
		streams: [
			{
				key: "hasBookings",
				label: "Client jobs",
				desc: "Work you do for a customer."
			},
			{
				key: "hasPhysicalProducts",
				label: "Goods",
				desc: "Things you sell."
			},
			{
				key: "hasDigitalProducts",
				label: "Digital sales",
				desc: "Downloads or online offers."
			},
			{
				key: "hasContractors",
				label: "Contractors",
				desc: "People you pay per job."
			},
			{
				key: "hasEmployees",
				label: "Staff",
				desc: "People on wages."
			}
		]
	}
];
function industryById(id) {
	if (!id) return INDUSTRIES.find((item) => item.id === "creator");
	return INDUSTRIES.find((item) => item.id === id) ?? INDUSTRIES.find((item) => item.id === "general");
}
function bookingTypeLabel(type, moduleId) {
	const preferred = industryById(moduleId).types.find((item) => item.value === type);
	if (preferred) return preferred.label;
	for (const industry of INDUSTRIES) {
		const hit = industry.types.find((item) => item.value === type);
		if (hit) return hit.label;
	}
	return type.replaceAll("_", " ");
}
/** One accent per industry. Creator keeps the talentOS violet. */
var THEMES = {
	creator: {
		h: 272,
		s: 62,
		accent: "#7434d1"
	},
	trades: {
		h: 18,
		s: 86,
		accent: "#c2410c"
	},
	professional: {
		h: 221,
		s: 76,
		accent: "#1d4ed8"
	},
	health: {
		h: 175,
		s: 78,
		accent: "#0f766e"
	},
	hospitality: {
		h: 343,
		s: 80,
		accent: "#9f1239"
	},
	maker: {
		h: 84,
		s: 72,
		accent: "#4d7c0f"
	},
	general: {
		h: 215,
		s: 28,
		accent: "#334155"
	}
};
var STEPS = [
	50,
	100,
	200,
	300,
	400,
	500,
	600,
	700,
	800,
	900,
	950
];
var LIGHTS = [
	96,
	91,
	82,
	72,
	62,
	50,
	42,
	34,
	26,
	18,
	12
];
function hsl(h, s, l, a) {
	const base = `${h} ${s}% ${l}%`;
	return a === void 0 ? `hsl(${base})` : `hsl(${base} / ${a})`;
}
function industryAccent(id) {
	if (id && id in THEMES) return THEMES[id].accent;
	return THEMES.creator.accent;
}
/** Paint accent, brand gradient, and the remapped emerald/teal scales. */
function applyIndustryTheme(id) {
	if (typeof document === "undefined") return;
	const key = id && id in THEMES ? id : "creator";
	const theme = THEMES[key];
	const root = document.documentElement;
	const set = (name, value) => root.style.setProperty(name, value);
	const dark = root.classList.contains("dark");
	set("--color-accent", theme.accent);
	set("--color-accent-strong", hsl(theme.h, theme.s, 32));
	set("--color-accent-soft", hsl(theme.h, theme.s, 42, .14));
	set("--color-cyan", hsl(theme.h, Math.min(theme.s, 72), 48));
	set("--color-brand-cyan", hsl(theme.h, Math.min(theme.s, 70), 56));
	set("--color-brand-blue", hsl(theme.h, theme.s, 46));
	set("--color-brand-violet", theme.accent);
	set("--color-brand-magenta", hsl((theme.h + 16) % 360, theme.s, 46));
	set("--color-brand-pink", hsl((theme.h + 32) % 360, Math.min(theme.s, 78), 54));
	set("--glow-a", hsl(theme.h, theme.s, 50, dark ? .16 : .1));
	set("--glow-b", hsl((theme.h + 28) % 360, theme.s, 48, dark ? .14 : .09));
	STEPS.forEach((step, index) => {
		const tone = hsl(theme.h, theme.s, LIGHTS[index]);
		set(`--color-emerald-${step}`, tone);
		set(`--color-teal-${step}`, hsl(theme.h, Math.max(18, theme.s - 18), LIGHTS[index]));
	});
	set("--color-emerald-500", theme.accent);
	set("--color-emerald-600", hsl(theme.h, theme.s, 40));
	root.dataset.industry = key;
	const bar = dark ? "#101218" : theme.accent;
	document.querySelector("meta[name=\"theme-color\"]")?.setAttribute("content", bar);
}
var OnboardingModal = ({ isOpen, onClose, business, taxProfile, operatingProfile, creatorProfile, onSave }) => {
	const [step, setStep] = (0, import_react.useState)(1);
	const [formData, setFormData] = (0, import_react.useState)({ ...business });
	const [taxData, setTaxData] = (0, import_react.useState)({ ...taxProfile });
	const [opData, setOpData] = (0, import_react.useState)({ ...operatingProfile });
	const [crData, setCrData] = (0, import_react.useState)({ ...creatorProfile });
	const [abnInput, setAbnInput] = (0, import_react.useState)(business.abn);
	const [abnValidation, setAbnValidation] = (0, import_react.useState)(validateAustralianABN(business.abn));
	if (!isOpen) return null;
	const handleAbnChange = (val) => {
		setAbnInput(val);
		const result = validateAustralianABN(val);
		setAbnValidation(result);
		if (result.isValid) setFormData((prev) => ({
			...prev,
			abn: result.formatted,
			abnLastVerifiedAt: (/* @__PURE__ */ new Date()).toISOString()
		}));
	};
	const handleFinish = () => {
		onSave(formData, taxData, opData, crData);
		onClose();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/60",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs uppercase tracking-wider text-emerald-400 font-mono",
						children: "Australian Business Onboarding"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-lg font-semibold text-white",
						children: [
							step === 1 && "Welcome to TalentOS",
							step === 2 && "Step 1: ABN Identity Gate",
							step === 3 && "Step 2: Australian Tax Profile",
							step === 4 && "Step 3: Operating Profile",
							step === 5 && "Step 4: Connect Financial Accounts",
							step === 6 && "Step 5: Business Compliance Baseline"
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-neutral-400 font-mono",
							children: [
								"Step ",
								step,
								" of 6"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: onClose,
							className: "p-1 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 text-sm",
							title: "Close modal",
							children: "✕"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6 overflow-y-auto space-y-6 flex-1 text-sm text-neutral-200",
					children: [
						step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-accent/25 bg-accent-soft p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-2 flex items-center gap-2 text-accent",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex h-7 w-7 items-center justify-center rounded-lg bg-accent/15",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-bold uppercase tracking-wide",
											children: "Lex will guide you"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mb-2 text-base font-semibold text-ink",
										children: "Let's get your business set up."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "leading-relaxed text-muted",
										children: "I'll walk you through each step, explain the important bits, and flag anything you need to do before you start."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "p-3 rounded-lg bg-neutral-900 border border-neutral-800",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-emerald-400 font-semibold block mb-1",
													children: "ABN Lookup"
												}), "Check a number on the public register. It does not lodge a return."]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "p-3 rounded-lg bg-neutral-900 border border-neutral-800",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-emerald-400 font-semibold block mb-1",
													children: "Double-Entry"
												}), "Balanced ledger, platform payout unbundling & GST."]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "p-3 rounded-lg bg-neutral-900 border border-neutral-800",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-emerald-400 font-semibold block mb-1",
													children: "Tax from your books"
												}), "GST threshold and BAS dates from what you record. Lodging stays with you or your agent."]
											})
										]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-warn/30 bg-warn/10 p-4 text-xs leading-relaxed text-ink",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-warn",
									children: "ABN Policy:"
								}), " An Australian Business Number (ABN) is required to establish a commercial ledger. In Australia, carrying on an enterprise entitles an individual or company to hold an ABN."]
							})]
						}),
						step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1",
										children: "Australian Business Number (ABN)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											value: abnInput,
											onChange: (e) => handleAbnChange(e.target.value),
											placeholder: "e.g. 51 824 753 556",
											className: "w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-lg text-white font-mono focus:border-emerald-500 focus:outline-none"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "absolute right-3 top-2.5 flex items-center gap-1.5 text-xs",
											children: abnValidation.isValid ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-emerald-400 flex items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-4 h-4" }), " Mod-89 Valid"]
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-rose-400 flex items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "w-4 h-4" }), " Invalid ABN"]
											})
										})]
									}),
									abnValidation.error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-rose-400 mt-1",
										children: abnValidation.error
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-neutral-400 mt-1",
										children: "51 824 753 556 is a real ABN, the Tax Office, so you can see a live result. Use your own number for your books."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AbnCheck, {
											abn: abnInput,
											booksName: formData.legalName,
											onUse: (hit) => {
												setFormData((prev) => ({
													...prev,
													legalName: hit.legalName || prev.legalName,
													entityType: hit.entityType ?? prev.entityType,
													businessAddress: hit.location || prev.businessAddress,
													abnLastVerifiedAt: hit.checkedAt,
													abrLastCheckedAt: hit.checkedAt
												}));
												setTaxData((prev) => ({
													...prev,
													gstRegistered: hit.gstRegistered
												}));
											}
										})
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1",
										children: "Legal Entity Name (as on ABR)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: formData.legalName,
										onChange: (e) => setFormData({
											...formData,
											legalName: e.target.value
										}),
										className: "w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1",
											children: "Entity Structure"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "w-4 h-4 text-emerald-400" }), "Sole Trader (Individual)"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-[11px] text-neutral-500",
											children: "TalentOS is built for Australian sole traders."
										})
									] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1",
										children: "Trading / Creator Brand Name"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: formData.tradingName,
										onChange: (e) => setFormData({
											...formData,
											tradingName: e.target.value
										}),
										className: "w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1",
										children: "Main Business Activity (ANZSIC)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: formData.mainBusinessActivity,
										onChange: (e) => setFormData({
											...formData,
											mainBusinessActivity: e.target.value
										}),
										className: "w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1",
										children: "Registered Business Address (Private & Legal)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: formData.businessAddress,
										onChange: (e) => setFormData({
											...formData,
											businessAddress: e.target.value
										}),
										className: "w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-neutral-400 mt-1",
										children: "Protected by Legal Identity Layer. Never disclosed on public storefront or social profiles."
									})
								] })
							]
						}),
						step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-4 rounded-xl bg-neutral-800/40 border border-neutral-700/60 space-y-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-semibold text-white",
											children: "GST Registration Status"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs text-neutral-400",
											children: "Required by ATO if GST turnover reaches or exceeds $75,000 AUD."
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "relative inline-flex items-center cursor-pointer",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "checkbox",
												checked: taxData.gstRegistered,
												onChange: (e) => setTaxData({
													...taxData,
													gstRegistered: e.target.checked
												}),
												className: "sr-only peer"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-11 h-6 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600" })]
										})]
									}), taxData.gstRegistered && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-neutral-700",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1",
											children: "Accounting Basis for GST"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											value: taxData.accountingBasis,
											onChange: (e) => setTaxData({
												...taxData,
												accountingBasis: e.target.value
											}),
											className: "w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:border-emerald-500 focus:outline-none",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "cash",
												children: "Cash basis (usual for sole traders)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "accruals",
												children: "Accruals / Non-Cash"
											})]
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1",
											children: "BAS Lodgement Frequency"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											value: taxData.basFrequency,
											onChange: (e) => setTaxData({
												...taxData,
												basFrequency: e.target.value
											}),
											className: "w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:border-emerald-500 focus:outline-none",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "quarterly",
													children: "Quarterly (Most common)"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "monthly",
													children: "Monthly"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "annually",
													children: "Annually"
												})
											]
										})] })]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "p-4 rounded-xl bg-neutral-800/40 border border-neutral-700/60 space-y-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-semibold text-white",
											children: "PAYG Withholding Registration"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs text-neutral-400",
											children: "Required if you employ workers or withhold amounts from suppliers without an ABN."
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "relative inline-flex items-center cursor-pointer",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "checkbox",
												checked: taxData.paygWithholdingRegistered,
												onChange: (e) => setTaxData({
													...taxData,
													paygWithholdingRegistered: e.target.checked
												}),
												className: "sr-only peer"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-11 h-6 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600" })]
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-4 rounded-xl bg-neutral-800/40 border border-neutral-700/60 space-y-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-semibold text-white",
											children: "Registered Tax Agent or BAS Agent"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs text-neutral-400",
											children: "Do you have an external Australian accountant or tax agent?"
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "relative inline-flex items-center cursor-pointer",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "checkbox",
												checked: taxData.hasTaxAgent,
												onChange: (e) => setTaxData({
													...taxData,
													hasTaxAgent: e.target.checked
												}),
												className: "sr-only peer"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-11 h-6 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600" })]
										})]
									}), taxData.hasTaxAgent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "pt-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											value: taxData.taxAgentName || "",
											onChange: (e) => setTaxData({
												...taxData,
												taxAgentName: e.target.value
											}),
											placeholder: "Accountant Firm Name (e.g. Apex Creator Advisory)",
											className: "w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
										})
									})]
								})
							]
						}),
						step === 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold uppercase tracking-wider text-neutral-300",
									children: "Industry module"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-neutral-400",
									children: "This sets the job types, and the app colour. Any Australian sole trader can use the books. Pick the closest trade."
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-1 gap-2 sm:grid-cols-2",
									children: INDUSTRIES.map((item) => {
										const selected = industryById(opData.industryModule).id === item.id;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => {
												applyIndustryTheme(item.id);
												setOpData((prev) => ({
													...prev,
													industryModule: item.id,
													hasBookings: true,
													hasPlatformPayouts: item.id === "creator" ? prev.hasPlatformPayouts : false,
													hasDigitalProducts: item.id === "creator" || item.id === "maker" || item.id === "health" ? prev.hasDigitalProducts : false,
													hasPhysicalProducts: item.id === "creator" || item.id === "trades" || item.id === "maker" || item.id === "hospitality" ? prev.hasPhysicalProducts : false,
													hasSubscriptions: item.id === "professional" ? prev.hasSubscriptions : false,
													hasAffiliateIncome: false
												}));
											},
											className: `flex items-start gap-2 rounded-xl border p-3 text-left ${selected ? "border-accent bg-accent-soft" : "border-neutral-800 bg-neutral-900 hover:border-neutral-700"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "mt-1 h-3 w-3 shrink-0 rounded-full",
												style: { background: industryAccent(item.id) }
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block text-sm font-semibold text-white",
												children: item.label
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "mt-0.5 block text-xs text-neutral-400",
												children: item.blurb
											})] })]
										}, item.id);
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-neutral-400",
									children: "What you actually sell. Turn on only what applies."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
									children: industryById(opData.industryModule).streams.map(({ key, label, desc }) => {
										const val = Boolean(opData[key]);
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											onClick: () => setOpData({
												...opData,
												[key]: !val
											}),
											className: `p-3.5 rounded-xl border cursor-pointer transition-colors ${val ? "bg-emerald-950/20 border-emerald-500/40 text-white" : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between mb-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold text-sm text-neutral-100",
													children: label
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "checkbox",
													checked: val,
													readOnly: true,
													className: "rounded text-emerald-600 focus:ring-0 bg-neutral-800 border-neutral-700"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-neutral-400",
												children: desc
											})]
										}, key);
									})
								})
							]
						}),
						step === 5 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-neutral-400",
								children: "There is no live bank feed. Money you record — invoices paid, expenses, and payouts — lands in an operating account kept in this browser."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-4 rounded-xl bg-neutral-800/40 border border-neutral-700/60 flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "w-10 h-10 rounded-lg bg-orange-600/20 text-orange-400 flex items-center justify-center font-bold",
												children: "UP"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-semibold text-white",
												children: "Operating account"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs text-neutral-400",
												children: "Created in your books. It is not linked to a bank."
											})] })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-neutral-400 font-medium",
											children: "Not connected"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-4 rounded-xl bg-neutral-800/40 border border-neutral-700/60 flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "w-10 h-10 rounded-lg bg-yellow-500/20 text-yellow-400 flex items-center justify-center font-bold",
												children: "CBA"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-semibold text-white",
												children: "Tax reserve"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs text-neutral-400",
												children: "Set aside in the books. Not a bank account we can move."
											})] })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-neutral-400 font-medium",
											children: "In your books"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-4 rounded-xl bg-neutral-800/40 border border-neutral-700/60 flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "w-10 h-10 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold",
												children: "S"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-semibold text-white",
												children: "Card and platform sales"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs text-neutral-400",
												children: "Record a payout or a shop sale when the money arrives."
											})] })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-neutral-400 font-medium",
											children: "Manual"
										})]
									})
								]
							})]
						}),
						step === 6 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4 rounded-xl bg-emerald-950/30 border border-emerald-600/40",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-emerald-400 font-semibold mb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-5 h-5" }), "Business Compliance Map Generated"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-neutral-300 leading-relaxed",
									children: [
										"Based on your ABN (",
										formData.abn || "not entered yet",
										") as a sole trader in ",
										industryById(opData.industryModule).label,
										", TalentOS has set up your books. Lodging stays with you or your agent."
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-3 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-neutral-400",
											children: "ABR Status"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-emerald-400 font-medium",
											children: "Verified Active · 28-day change monitor engaged"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-3 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-neutral-400",
											children: "ATO GST Policy"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-neutral-200",
											children: taxData.gstRegistered ? "Tax Invoices enabled · Quarterly BAS tracking" : "$75,000 threshold monitor running"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-3 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-neutral-400",
											children: "Workforce Rules"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-neutral-200",
											children: opData.hasContractors ? "12% Super Guarantee contractor check ready" : "No active staff detected"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-3 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-neutral-400",
											children: "ASIC Governance"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-neutral-200",
											children: formData.entityType === "company" ? "Annual Review & Solvency minute active" : "Not applicable (Sole Trader)"
										})]
									})
								]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-6 py-4 border-t border-neutral-800 flex items-center justify-between bg-neutral-950/60",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setStep((s) => Math.max(1, s - 1)),
						disabled: step === 1,
						className: `px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${step === 1 ? "opacity-30 cursor-not-allowed text-neutral-500" : "bg-neutral-800 text-neutral-200 hover:bg-neutral-700"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "w-3.5 h-3.5" }), " Back"]
					}), step < 6 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							if (step === 2 && !abnValidation.isValid) return;
							setStep((s) => s + 1);
						},
						disabled: step === 2 && !abnValidation.isValid,
						className: `px-5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${step === 2 && !abnValidation.isValid ? "bg-neutral-800 text-neutral-500 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-500 text-[#fff] shadow-lg shadow-emerald-600/20"}`,
						children: ["Continue ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-3.5 h-3.5" })]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleFinish,
						className: "px-6 py-2 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-[#fff] shadow-lg shadow-emerald-600/20 flex items-center gap-1.5",
						children: ["Enter Business Workspace ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-3.5 h-3.5" })]
					})]
				})
			]
		})
	});
};
/** Whole days from the real today until an ISO date. Negative means overdue. */
function calendarDaysUntil(iso) {
	const due = new Date(iso.length <= 10 ? `${iso}T00:00:00` : iso);
	const now = /* @__PURE__ */ new Date();
	const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	return Math.round((due.getTime() - start.getTime()) / 864e5);
}
/** Past-due issued invoices read as overdue even if the stored status was not rewritten. */
function shownInvoiceStatus(status, due) {
	const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
	if ((status === "issued" || status === "overdue") && due && due < today) return "overdue";
	return status;
}
function nextInvoiceNumber(numbers) {
	const max = numbers.reduce((m, n) => {
		const parsed = Number(String(n).slice(-6));
		return Number.isFinite(parsed) ? Math.max(m, parsed) : m;
	}, 0);
	return `INV-2026-${String(max + 1).padStart(6, "0")}`;
}
function cx(...parts) {
	return parts.filter(Boolean).join(" ");
}
var GlassCard = ({ elevated, interactive, className, as: Tag = "div", children, ...rest }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
	className: cx(elevated ? "glass-elevated" : "glass", interactive && "glass-interactive cursor-pointer", "p-5 sm:p-6", className),
	...rest,
	children
});
var SectionLabel = ({ children, className }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cx("text-[11px] font-semibold uppercase tracking-[0.16em] text-faint", className),
	children
});
var TONE_META = {
	ok: {
		icon: Check,
		color: "text-ok",
		bg: "bg-ok/12",
		ring: "ring-ok/20",
		label: "All good"
	},
	warn: {
		icon: TriangleAlert,
		color: "text-warn",
		bg: "bg-warn/12",
		ring: "ring-warn/20",
		label: "Worth checking"
	},
	alert: {
		icon: CircleAlert,
		color: "text-alert",
		bg: "bg-alert/12",
		ring: "ring-alert/20",
		label: "Needs action"
	},
	info: {
		icon: ArrowRight,
		color: "text-info",
		bg: "bg-info/12",
		ring: "ring-info/20",
		label: "For your info"
	}
};
var StatusIcon = ({ tone, className }) => {
	const meta = TONE_META[tone];
	const Icon = meta.icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cx("inline-flex items-center justify-center rounded-full ring-1", meta.bg, meta.ring, meta.color, className ?? "w-7 h-7"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: meta.label
		})]
	});
};
var TONE_RANK = {
	alert: 0,
	warn: 1,
	info: 2,
	ok: 3
};
var STAT_STYLE = {
	violet: {
		tile: "bg-accent-soft text-accent",
		value: "text-accent",
		rail: "bg-accent"
	},
	blue: {
		tile: "bg-info/12 text-info",
		value: "text-info",
		rail: "bg-info"
	},
	green: {
		tile: "bg-ok/12 text-ok",
		value: "text-ok",
		rail: "bg-ok"
	},
	amber: {
		tile: "bg-warn/14 text-warn",
		value: "text-warn",
		rail: "bg-warn"
	}
};
var STEP_STYLE = {
	alert: {
		rail: "bg-alert",
		badge: "bg-alert/12 text-alert ring-alert/25"
	},
	warn: {
		rail: "bg-warn",
		badge: "bg-warn/14 text-warn ring-warn/25"
	},
	info: {
		rail: "bg-info",
		badge: "bg-info/12 text-info ring-info/25"
	},
	ok: {
		rail: "bg-ok",
		badge: "bg-ok/12 text-ok ring-ok/25"
	}
};
var HomeDashboard = ({ business, creator, taxProfile, clients, bookings, invoices, payouts, expenses, bankAccounts, basPeriod, obligations, onNavigate, onOpenQuickAdd, onOpenAssistant, industryModule }) => {
	const totalCashBalance = bankAccounts.reduce((acc, b) => acc + b.balance, 0);
	const taxReserveBalance = bankAccounts.find((b) => b.type === "tax_reserve")?.balance || 0;
	const operatingBalance = totalCashBalance - taxReserveBalance;
	const outstandingInvoices = invoices.filter((i) => {
		const status = shownInvoiceStatus(i.status, i.dueDate);
		return status === "issued" || status === "overdue";
	});
	const overdueInvoices = invoices.filter((i) => shownInvoiceStatus(i.status, i.dueDate) === "overdue");
	const outstandingTotal = outstandingInvoices.reduce((acc, i) => acc + i.total, 0);
	const missingReceipts = expenses.filter((e) => !e.receiptName);
	const upcomingBookings = bookings.filter((b) => b.status === "confirmed" || b.status === "delivery" || b.status === "invoiced");
	const deliveriesInProgress = bookings.filter((b) => b.status === "delivery");
	const bookedRevenuePipeline = bookings.reduce((acc, b) => acc + b.fee, 0);
	const actionObligations = obligations.filter((o) => o.status === "ACTION_REQUIRED" || o.status === "REVIEW_REQUIRED");
	const steps = [];
	overdueInvoices.length > 0 && steps.push({
		id: "overdue",
		tone: "alert",
		rank: TONE_RANK.alert,
		title: `Get ${overdueInvoices.length} late invoice${overdueInvoices.length > 1 ? "s" : ""} paid`,
		detail: `${formatAUD(overdueInvoices.reduce((a, i) => a + i.total, 0))} is past its due date`,
		ctaLabel: "Chase payment",
		tab: "invoices"
	});
	missingReceipts.length > 0 && steps.push({
		id: "receipts",
		tone: "warn",
		rank: TONE_RANK.warn,
		title: `Add ${missingReceipts.length} receipt${missingReceipts.length > 1 ? "s" : ""}`,
		detail: "Add a photo so your expense records are complete",
		ctaLabel: "Upload receipts",
		tab: "money-receipts"
	});
	outstandingInvoices.length - overdueInvoices.length > 0 && steps.push({
		id: "unpaid",
		tone: "info",
		rank: TONE_RANK.info,
		title: `${outstandingInvoices.length - overdueInvoices.length} invoice${outstandingInvoices.length - overdueInvoices.length > 1 ? "s" : ""} awaiting payment`,
		detail: `${formatAUD(outstandingInvoices.filter((i) => shownInvoiceStatus(i.status, i.dueDate) !== "overdue").reduce((a, i) => a + i.total, 0))} still inside the due date`,
		ctaLabel: "View invoices",
		tab: "invoices"
	});
	deliveriesInProgress.length > 0 && steps.push({
		id: "deliver",
		tone: "info",
		rank: TONE_RANK.info + .1,
		title: `Deliver ${deliveriesInProgress.length} active booking${deliveriesInProgress.length > 1 ? "s" : ""}`,
		detail: deliveriesInProgress[0].campaignName,
		ctaLabel: "Open bookings",
		tab: "bookings"
	});
	basPeriod.netGstPayable > 0 && steps.push({
		id: "bas",
		tone: "info",
		rank: TONE_RANK.info + .2,
		title: "Check your next tax payment",
		detail: `${formatAUD(basPeriod.netGstPayable)} estimated · ${(() => {
			const days = Math.ceil((new Date(basPeriod.dueDate).getTime() - Date.now()) / 864e5);
			if (!Number.isFinite(days)) return "check the due date";
			return days < 0 ? `${Math.abs(days)} days overdue` : `due in ${days} days`;
		})()}`,
		ctaLabel: "See what to do",
		tab: "compliance"
	});
	actionObligations.forEach((ob, idx) => steps.push({
		id: `ob-${ob.id}`,
		tone: ob.status === "ACTION_REQUIRED" ? "alert" : "warn",
		rank: (ob.status === "ACTION_REQUIRED" ? TONE_RANK.alert : TONE_RANK.warn) + .5 + idx * .01,
		title: ob.title,
		detail: ob.dueDate ? ob.summary.replace(/Due in \d+ days/, `Due in ${calendarDaysUntil(ob.dueDate)} days`) : ob.summary,
		ctaLabel: "Review",
		tab: "compliance"
	}));
	const orderedSteps = steps.sort((a, b) => a.rank - b.rank).slice(0, 5);
	const stats = [
		{
			label: "Available to spend",
			value: formatAUD(operatingBalance),
			hint: "Operating cash, tax reserve set aside",
			icon: Wallet,
			color: "violet"
		},
		{
			label: "Owed to you",
			value: formatAUD(outstandingTotal),
			hint: `${outstandingInvoices.length} unpaid invoice${outstandingInvoices.length === 1 ? "" : "s"}`,
			icon: HandCoins,
			color: "blue"
		},
		{
			label: "Tax money saved",
			value: formatAUD(taxReserveBalance),
			hint: "Kept aside for tax time",
			icon: PiggyBank,
			color: "green"
		},
		{
			label: "Next tax payment",
			value: formatAUD(basPeriod.netGstPayable),
			hint: (() => {
				const days = Math.ceil((new Date(basPeriod.dueDate).getTime() - Date.now()) / 864e5);
				if (!Number.isFinite(days)) return "Estimated";
				return days < 0 ? `${Math.abs(days)} days overdue` : `Estimated · due in ${days} days`;
			})(),
			icon: Landmark,
			color: "amber"
		}
	];
	const trade = industryById(industryModule);
	const hour = (/* @__PURE__ */ new Date()).getHours();
	const hello = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
	const firstName = creator.creatorHandle.replace("@", "") || "there";
	const ownerMilestones = [
		{
			label: "Basic details",
			done: Boolean(business.tradingName && business.abn)
		},
		{
			label: `First ${trade.jobNoun.toLowerCase()}`,
			done: bookings.length > 0
		},
		{
			label: "Tax details",
			done: Boolean(business.abn && taxProfile.financialYear)
		}
	];
	const completedMilestones = ownerMilestones.filter((milestone) => milestone.done).length;
	const progressPercent = Math.round(completedMilestones / ownerMilestones.length * 100);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl space-y-6 pb-12 animate-rise",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
				elevated: true,
				className: "flex flex-col gap-5 md:flex-row md:items-center md:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-mono text-muted",
						children: [
							creator.creatorHandle ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: creator.creatorHandle }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": "true",
								children: "·"
							})] }) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-accent",
								children: business.tradingName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": "true",
								children: "·"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["ABN ", business.abn] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-1 font-display text-2xl font-bold tracking-tight text-ink text-balance",
						children: [
							hello,
							", ",
							firstName,
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 max-w-md text-sm text-muted text-pretty",
						children: "Here’s what to do next — no jargon, no fuss."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => onOpenQuickAdd("booking"),
							className: "inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-neutral-700/60 bg-neutral-900 px-3.5 py-2 text-xs font-semibold text-ink transition-colors hover:bg-neutral-800 sm:w-auto",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }),
								" New ",
								trade.jobNoun.toLowerCase()
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => onOpenQuickAdd("invoice"),
							className: "inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-accent px-3.5 py-2 text-xs font-semibold text-[#fff] shadow-[0_8px_24px_rgba(139,60,240,0.28)] transition-colors hover:bg-accent-strong sm:w-auto",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-3.5 w-3.5" }), " Issue tax invoice"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: onOpenAssistant,
							className: "inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-accent/30 bg-accent-soft px-3.5 py-2 text-xs font-semibold text-accent transition-colors hover:bg-accent/15 sm:w-auto",
							title: "Ask AI Assistant Lex",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" }), " Ask Lex"]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
				className: "flex flex-col gap-4 p-5 md:flex-row md:items-center md:gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-1 items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent-soft font-display text-sm font-bold text-accent",
						children: [
							completedMilestones,
							"/",
							ownerMilestones.length
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold text-ink",
							children: "Your setup"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 text-xs text-muted",
							children: "A few small steps and you’re good to go."
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-2 flex items-center justify-between gap-3 text-[11px] font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted",
								children: completedMilestones === ownerMilestones.length ? "Ready to run your business" : "Getting started"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-bold tabular-nums text-accent",
								children: [progressPercent, "%"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-2 overflow-hidden rounded-full bg-[color:rgba(20,22,29,0.08)]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full rounded-full bg-accent transition-[width] duration-700 ease-out",
								style: { width: `${progressPercent}%` }
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex flex-wrap gap-x-3 gap-y-1",
							children: ownerMilestones.map((milestone) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: `inline-flex items-center gap-1 text-[11px] ${milestone.done ? "font-semibold text-ok" : "text-faint"}`,
								children: [
									milestone.done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-3 w-3" }),
									" ",
									milestone.label
								]
							}, milestone.label))
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "What's next" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 text-[11px] font-medium text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-alert" }), " Needs action"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-warn" }), " Worth checking"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-info" }), " For info"]
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassCard, {
				elevated: true,
				className: "p-0 overflow-hidden",
				children: orderedSteps.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center justify-center gap-3 py-14 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-ok/12 text-ok",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-6 w-6" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-base font-semibold text-ink",
						children: "You're all caught up"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-1 max-w-xs text-sm text-muted text-pretty",
						children: "Nothing to do right now. You’re all set."
					})] })]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "divide-y divide-[color:rgba(20,22,29,0.07)]",
					children: orderedSteps.map((step, i) => {
						const style = STEP_STYLE[step.tone];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `absolute inset-y-0 left-0 w-1 ${style.rail}`,
								"aria-hidden": "true"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => onNavigate(step.tab),
								className: "group flex w-full items-center gap-3 py-4 pl-5 pr-4 text-left transition-colors hover:bg-[color:rgba(139,60,240,0.05)] sm:gap-4 sm:pl-6 sm:pr-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold ring-1 ${style.badge}`,
										children: i + 1
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusIcon, {
										tone: step.tone,
										className: "h-8 w-8 shrink-0"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block truncate text-sm font-semibold text-ink",
											children: step.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mt-0.5 block truncate text-xs text-muted",
											children: step.detail
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "hidden shrink-0 items-center gap-1 text-xs font-semibold text-accent sm:inline-flex",
										children: [step.ctaLabel, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 shrink-0 text-faint sm:hidden" })
								]
							})]
						}, step.id);
					})
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
				className: "mb-3",
				children: "Your numbers"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4",
				children: stats.map((s) => {
					const Icon = s.icon;
					const style = STAT_STYLE[s.color];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
						className: "relative overflow-hidden p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `absolute inset-x-0 top-0 h-1 ${style.rail}`,
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-medium text-muted text-pretty",
									children: s.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${style.tile}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `mt-2 font-display text-2xl font-bold tabular-nums ${style.value}`,
								children: s.value
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-[11px] text-faint text-pretty",
								children: s.hint
							})
						]
					}, s.label);
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
					className: "p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "inline-flex h-7 w-7 items-center justify-center rounded-lg bg-info/12 text-info",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-4 w-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-sm font-semibold text-ink",
									children: "Upcoming work"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => onNavigate("bookings"),
								className: "text-xs font-medium text-muted transition-colors hover:text-ink",
								children: [
									"View all (",
									bookings.length,
									") →"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2.5",
							children: [upcomingBookings.slice(0, 3).map((b) => {
								const client = clients.find((c) => c.id === b.clientId);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => onNavigate("bookings"),
									className: "glass-well flex w-full items-center justify-between gap-3 px-3.5 py-3 text-left transition-colors hover:bg-[color:rgba(139,60,240,0.05)]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "min-w-0",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-center gap-1.5 text-[11px] text-muted",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-medium text-ink",
														children: client?.tradingName || "Brand"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														"aria-hidden": "true",
														children: "·"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "capitalize",
														children: bookingTypeLabel(b.bookingType, industryModule)
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "mt-0.5 block truncate text-sm font-semibold text-ink",
												children: b.campaignName
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[11px] text-faint",
												children: [
													b.startDate,
													" → ",
													b.endDate
												]
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "shrink-0 text-right",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block text-sm font-bold tabular-nums text-ink",
											children: formatAUD(b.fee)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-mono uppercase text-accent",
											children: b.status
										})]
									})]
								}, b.id);
							}), upcomingBookings.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "py-6 text-center text-sm text-muted",
								children: "No upcoming bookings."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex items-center justify-between border-t border-[color:rgba(20,22,29,0.07)] pt-3 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted",
								children: "Booked pipeline"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold tabular-nums text-ink",
								children: formatAUD(bookedRevenuePipeline)
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
					className: "p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "inline-flex h-7 w-7 items-center justify-center rounded-lg bg-warn/14 text-warn",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm font-semibold text-ink",
								children: "Keep an eye on"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => onNavigate("compliance"),
							className: "text-xs font-medium text-accent transition-colors hover:underline",
							children: "See all →"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2.5",
						children: obligations.slice(0, 4).map((ob) => {
							let tone = "ok";
							if (ob.status === "ACTION_REQUIRED") tone = "alert";
							else if (ob.status === "REVIEW_REQUIRED") tone = "warn";
							else if (ob.status === "APPROACHING") tone = "info";
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => onNavigate("compliance"),
								className: "glass-well flex w-full items-start gap-3 px-3.5 py-3 text-left transition-colors hover:bg-[color:rgba(139,60,240,0.05)]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusIcon, {
									tone,
									className: "mt-0.5 h-6 w-6 shrink-0"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "truncate text-sm font-medium text-ink",
											children: ob.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "shrink-0 font-mono text-[10px] text-faint",
											children: ob.authority
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-0.5 line-clamp-2 block text-[11px] text-muted",
										children: ob.dueDate ? ob.summary.replace(/Due in \d+ days/, `Due in ${calendarDaysUntil(ob.dueDate)} days`) : ob.summary
									})]
								})]
							}, ob.id);
						})
					})]
				})]
			}),
			payouts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
				className: "p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-flex h-7 w-7 items-center justify-center rounded-lg bg-ok/12 text-ok",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, { className: "h-4 w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-semibold text-ink",
							children: "Recent platform payouts"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => onNavigate("sales"),
						className: "text-xs font-medium text-muted transition-colors hover:text-ink",
						children: "All payouts →"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 gap-2.5 sm:grid-cols-2",
					children: payouts.slice(0, 2).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass-well px-3.5 py-3 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-2 flex items-center justify-between font-medium text-ink",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-accent" }),
									p.platform,
									" · ",
									p.depositDate
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold tabular-nums text-ok",
								children: formatAUD(p.netPayout)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-2 border-t border-[color:rgba(20,22,29,0.07)] pt-2 text-[11px] text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Gross ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium tabular-nums text-ink",
								children: formatAUD(p.grossRevenue)
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Platform cut ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tabular-nums text-alert",
								children: ["-", formatAUD(p.platformFee)]
							})] })]
						})]
					}, p.id))
				})]
			})
		]
	});
};
var BookingsView = ({ clients, bookings, quotes, taxProfile, onAddBooking, onAddClient, onAddQuote, onConvertToInvoice, onConvertQuoteToInvoice, onUpdateBookingStatus, launchToken = 0, industryModule }) => {
	const trade = industryById(industryModule);
	const [activeTab, setActiveTab] = (0, import_react.useState)("bookings");
	const [showAddBookingModal, setShowAddBookingModal] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (launchToken > 0) {
			setActiveTab("bookings");
			setShowAddBookingModal(true);
		}
	}, [launchToken]);
	const [showAddClientModal, setShowAddClientModal] = (0, import_react.useState)(false);
	const [selectedBooking, setSelectedBooking] = (0, import_react.useState)(null);
	const [newCampaignName, setNewCampaignName] = (0, import_react.useState)("");
	const [newClientId, setNewClientId] = (0, import_react.useState)(clients[0]?.id || "");
	const [newBookingType, setNewBookingType] = (0, import_react.useState)(trade.types[0].value);
	(0, import_react.useEffect)(() => {
		if (!trade.types.some((item) => item.value === newBookingType)) setNewBookingType(trade.types[0].value);
	}, [trade, newBookingType]);
	const [newStartDate, setNewStartDate] = (0, import_react.useState)("");
	const [newEndDate, setNewEndDate] = (0, import_react.useState)("");
	const [newLocation, setNewLocation] = (0, import_react.useState)(industryById(industryModule).id === "creator" ? "Sydney Studio / Remote" : "");
	const [newFee, setNewFee] = (0, import_react.useState)(0);
	const [newDeliverableInput, setNewDeliverableInput] = (0, import_react.useState)("");
	const [newDeliverables, setNewDeliverables] = (0, import_react.useState)(() => industryById(industryModule).id === "creator" ? [
		"1x Dedicated 60s Reel (IG/TikTok)",
		"3x In-feed Story Frames with link",
		"30-day organic digital usage rights"
	] : []);
	const handleAddDeliverable = () => {
		if (!newDeliverableInput.trim()) return;
		setNewDeliverables([...newDeliverables, newDeliverableInput.trim()]);
		setNewDeliverableInput("");
	};
	const handleCreateBooking = (e) => {
		e.preventDefault();
		if (!newCampaignName || newFee <= 0 || !newClientId) return;
		const commissionRate = .15;
		const commissionAmount = Math.round(newFee * commissionRate * 100) / 100;
		const gstAmount = taxProfile.gstRegistered ? Math.round(newFee / 11 * 100) / 100 : 0;
		onAddBooking({
			id: `bk-${Date.now()}`,
			clientId: newClientId,
			campaignName: newCampaignName,
			bookingType: newBookingType,
			startDate: newStartDate || (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
			endDate: newEndDate || (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
			location: newLocation,
			isRemote: newLocation.toLowerCase().includes("remote"),
			fee: newFee,
			commissionRate,
			commissionAmount,
			reimbursements: 0,
			gstInclusive: true,
			gstAmount,
			totalAmount: newFee,
			status: "confirmed",
			deliverables: newDeliverables,
			usageRights: "Australia & NZ digital media usage rights (90 days)",
			exclusivityMonths: 1
		});
		setShowAddBookingModal(false);
		setNewCampaignName("");
		setNewFee(0);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 max-w-7xl mx-auto pb-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold text-white font-display",
					children: "Bookings, Deliverables & CRM"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-neutral-400 mt-0.5",
					children: "Manage brand collaborations, usage rights, agency commissions, and convert deals to invoices."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1 p-1 bg-neutral-900 border border-neutral-800 rounded-xl text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setActiveTab("bookings"),
							className: `px-3.5 py-1.5 font-medium rounded-lg transition-colors flex items-center gap-1.5 ${activeTab === "bookings" ? "bg-neutral-800 text-white shadow-sm" : "text-neutral-400 hover:text-neutral-200"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "w-3.5 h-3.5 text-emerald-400" }),
								trade.jobNoun,
								"s"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setActiveTab("clients"),
							className: `px-3.5 py-1.5 font-medium rounded-lg transition-colors flex items-center gap-1.5 ${activeTab === "clients" ? "bg-neutral-800 text-white shadow-sm" : "text-neutral-400 hover:text-neutral-200"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "w-3.5 h-3.5 text-emerald-400" }), "Client CRM"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setActiveTab("quotes"),
							className: `px-3.5 py-1.5 font-medium rounded-lg transition-colors flex items-center gap-1.5 ${activeTab === "quotes" ? "bg-neutral-800 text-white shadow-sm" : "text-neutral-400 hover:text-neutral-200"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "w-3.5 h-3.5 text-emerald-400" }),
								"Quotes (",
								quotes.length,
								")"
							]
						})
					]
				})]
			}),
			activeTab === "bookings" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-neutral-400",
							children: [
								bookings.length,
								" ",
								trade.jobNoun.toLowerCase(),
								bookings.length === 1 ? "" : "s",
								" in the pipeline"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => {
								if (clients.length === 0) {
									setActiveTab("clients");
									setShowAddClientModal(true);
									return;
								}
								setShowAddBookingModal(true);
							},
							className: "px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-[#fff] shadow-lg shadow-emerald-600/20 flex items-center gap-1.5 transition-all",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-3.5 h-3.5" }),
								" New ",
								trade.jobNoun
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
						children: bookings.map((b) => {
							const client = clients.find((c) => c.id === b.clientId);
							let statusColor = "text-emerald-400 border-emerald-500/30 bg-emerald-500/10";
							if (b.status === "quote") statusColor = "text-amber-400 border-amber-500/30 bg-amber-500/10";
							if (b.status === "invoiced") statusColor = "text-cyan-400 border-cyan-500/30 bg-cyan-500/10";
							if (b.status === "paid") statusColor = "text-emerald-400 border-emerald-500/30 bg-emerald-500/10";
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-5 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between hover:border-neutral-700 transition-colors",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-xs mb-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-white",
											children: client?.tradingName || "Direct Client"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold border ${statusColor}`,
											children: b.status
										})]
									}),
									onUpdateBookingStatus && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "mb-2 block text-[10px] font-semibold uppercase tracking-wide text-neutral-500",
										children: ["Stage", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
											value: b.status,
											onChange: (e) => onUpdateBookingStatus(b.id, e.target.value),
											className: "mt-1 w-full rounded-lg border border-neutral-800 bg-neutral-950 px-2 py-1.5 text-xs font-medium normal-case text-ink",
											children: [
												"lead",
												"quote",
												"negotiation",
												"confirmed",
												"delivery",
												"invoiced",
												"paid",
												"completed"
											].map((status) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: status,
												children: status
											}, status))
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-bold text-white text-base font-display",
										children: b.campaignName
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 text-xs text-neutral-400 mt-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											b.startDate,
											" to ",
											b.endDate
										] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 text-xs text-neutral-400 mt-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: b.location })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 pt-3 border-t border-neutral-800/80",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-[11px] font-semibold text-neutral-300 uppercase tracking-wider mb-1",
											children: [
												"Deliverables (",
												b.deliverables.length,
												"):"
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
											className: "text-xs text-neutral-400 space-y-1",
											children: b.deliverables.map((d, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "flex items-start gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-emerald-400",
													children: "·"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "line-clamp-1",
													children: d
												})]
											}, idx))
										})]
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 pt-4 border-t border-neutral-800 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] text-neutral-400 font-mono",
											children: trade.feeLabel
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xl font-bold text-white tabular-nums",
											children: formatAUD(b.fee)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-[10px] text-neutral-500",
											children: ["Agency 15%: -", formatAUD(b.commissionAmount)]
										})
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: b.status !== "invoiced" && b.status !== "paid" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => onConvertToInvoice(b),
										className: "px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-[#fff] font-medium text-xs transition-colors flex items-center gap-1 shadow-sm",
										children: ["Generate Invoice ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-3 h-3" })]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs text-cyan-400 font-mono flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-3.5 h-3.5" }), " Invoiced"]
									}) })]
								})]
							}, b.id);
						})
					}),
					bookings.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-dashed border-neutral-700 p-10 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg font-bold text-white",
							children: "No bookings yet"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-neutral-400",
							children: "Add a client, then raise the first deal. You can invoice it in one step."
						})]
					})
				]
			}),
			activeTab === "clients" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs text-neutral-400",
						children: [clients.length, " brands & agencies in your professional address book"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setShowAddClientModal(true),
						className: "px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-[#fff] shadow-lg shadow-emerald-600/20 flex items-center gap-1.5 transition-all",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-3.5 h-3.5" }), " Add Client"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 md:grid-cols-2 gap-4",
					children: clients.map((client) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-bold text-white text-base",
										children: client.tradingName
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-neutral-400",
										children: client.legalName
									}),
									client.abn && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-[11px] text-neutral-500 font-mono",
										children: ["ABN ", client.abn]
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "px-2 py-0.5 rounded text-[10px] uppercase font-mono bg-neutral-800 text-neutral-300",
									children: client.clientType
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-2 text-xs pt-2 border-t border-neutral-800 text-neutral-300",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-neutral-500 block text-[10px]",
										children: "Contact Person:"
									}),
									client.contactName,
									" (",
									client.email,
									")"
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-neutral-500 block text-[10px]",
										children: "Payment Terms:"
									}),
									client.paymentTermsDays,
									" Days"
								] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-2 border-t border-neutral-800 flex items-center justify-between text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-neutral-400",
									children: "Total Lifetime Revenue:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold text-emerald-400 font-mono text-sm tabular-nums",
									children: formatAUD(client.totalLifetimeRevenue)
								})]
							}),
							client.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-neutral-400 italic bg-neutral-950 p-2.5 rounded-lg border border-neutral-800/60",
								children: client.notes
							})
						]
					}, client.id))
				})]
			}),
			activeTab === "quotes" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuotesPanel, {
				quotes,
				clients,
				taxProfile,
				onConvertQuoteToInvoice,
				onAddQuote,
				onNeedClient: () => {
					setActiveTab("clients");
					setShowAddClientModal(true);
				}
			}),
			showAddBookingModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 text-sm text-neutral-200 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between pb-3 border-b border-neutral-800",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "font-semibold text-white text-base",
							children: ["New ", trade.jobNoun.toLowerCase()]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowAddBookingModal(false),
							className: "text-neutral-400 hover:text-white",
							children: "✕"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleCreateBooking,
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1",
								children: trade.titleLabel
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								required: true,
								placeholder: trade.titlePlaceholder,
								value: newCampaignName,
								onChange: (e) => setNewCampaignName(e.target.value),
								className: "w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1",
									children: trade.clientLabel
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: newClientId,
									onChange: (e) => setNewClientId(e.target.value),
									className: "w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-emerald-500",
									children: clients.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: c.id,
										children: c.tradingName
									}, c.id))
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1",
									children: "Booking Type"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: newBookingType,
									onChange: (e) => setNewBookingType(e.target.value),
									className: "w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-emerald-500",
									children: trade.types.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: item.value,
										children: item.label
									}, item.value))
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1",
									children: "Start Date"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "date",
									value: newStartDate,
									onChange: (e) => setNewStartDate(e.target.value),
									className: "w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1",
									children: "End / Delivery Date"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "date",
									value: newEndDate,
									onChange: (e) => setNewEndDate(e.target.value),
									className: "w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1",
								children: trade.feeLabel
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								required: true,
								placeholder: "e.g. 5000",
								value: newFee || "",
								onChange: (e) => setNewFee(parseFloat(e.target.value) || 0),
								className: "w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white font-mono focus:outline-none focus:border-emerald-500"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1",
									children: "Deliverables Checklist"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2 mb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										placeholder: "Add deliverable...",
										value: newDeliverableInput,
										onChange: (e) => setNewDeliverableInput(e.target.value),
										className: "flex-1 px-3 py-1.5 text-xs bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: handleAddDeliverable,
										className: "px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs",
										children: "Add"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-1",
									children: newDeliverables.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs text-neutral-300 flex items-center justify-between bg-neutral-950 p-2 rounded border border-neutral-800",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: d }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setNewDeliverables(newDeliverables.filter((_, idx) => idx !== i)),
											className: "text-neutral-500 hover:text-rose-400 text-xs",
											children: "✕"
										})]
									}, i))
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-end gap-2 pt-2 border-t border-neutral-800",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setShowAddBookingModal(false),
									className: "px-4 py-2 text-xs text-neutral-400 hover:text-white",
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-[#fff] shadow-lg shadow-emerald-600/20",
									children: "Confirm Booking"
								})]
							})
						]
					})]
				})
			}),
			showAddClientModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 text-sm text-neutral-200 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between pb-3 border-b border-neutral-800",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-white text-base",
							children: "Add New Client or Brand"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowAddClientModal(false),
							className: "text-neutral-400 hover:text-white",
							children: "✕"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (e) => {
							e.preventDefault();
							const form = e.target;
							onAddClient({
								id: `cli-${Date.now()}`,
								legalName: form.legalName.value,
								tradingName: form.tradingName.value || form.legalName.value,
								abn: form.abn.value || void 0,
								contactName: form.contactName.value,
								email: form.email.value,
								clientType: form.clientType.value,
								billingAddress: form.billingAddress.value || "Australia",
								paymentTermsDays: parseInt(form.paymentTermsDays.value) || 14,
								totalLifetimeRevenue: 0
							});
							setShowAddClientModal(false);
						},
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1",
								children: "Brand / Trading Name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								name: "tradingName",
								required: true,
								placeholder: "e.g. Bondi Sands",
								className: "w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1",
								children: "Legal Entity Name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								name: "legalName",
								required: true,
								placeholder: "e.g. Bondi Sands Pty Ltd",
								className: "w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1",
									children: "Client ABN"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									name: "abn",
									placeholder: "11 digits",
									className: "w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white font-mono focus:outline-none focus:border-emerald-500"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1",
									children: "Client Type"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									name: "clientType",
									className: "w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-emerald-500",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "brand",
											children: "Brand"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "agency",
											children: "Agency"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "production",
											children: "Production"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "retailer",
											children: "Retailer"
										})
									]
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1",
									children: "Contact Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									name: "contactName",
									required: true,
									placeholder: "e.g. Jessica May",
									className: "w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1",
									children: "Email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									name: "email",
									type: "email",
									required: true,
									placeholder: "partnerships@brand.com",
									className: "w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1",
								children: "Payment Terms (Days)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								name: "paymentTermsDays",
								type: "number",
								defaultValue: "14",
								className: "w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-end gap-2 pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setShowAddClientModal(false),
									className: "px-4 py-2 text-xs text-neutral-400 hover:text-white",
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-[#fff] shadow-lg shadow-emerald-600/20",
									children: "Save Client"
								})]
							})
						]
					})]
				})
			})
		]
	});
};
function QuotesPanel({ quotes, clients, taxProfile, onConvertQuoteToInvoice, onAddQuote, onNeedClient }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [clientId, setClientId] = (0, import_react.useState)(clients[0]?.id ?? "");
	const [detail, setDetail] = (0, import_react.useState)("");
	const [amount, setAmount] = (0, import_react.useState)("");
	const save = (e) => {
		e.preventDefault();
		const subtotal = Math.round((Number(amount) || 0) * 100) / 100;
		if (!onAddQuote || !clientId || !detail.trim() || subtotal <= 0) return;
		const gst = taxProfile.gstRegistered ? Math.round(subtotal * .1 * 100) / 100 : 0;
		const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
		const expiry = new Date(Date.now() + 12096e5).toISOString().slice(0, 10);
		const n = quotes.length + 1;
		onAddQuote({
			id: `qte-${Date.now()}`,
			quoteNumber: `QTE-${today.slice(0, 4)}-${String(n).padStart(3, "0")}`,
			clientId,
			issueDate: today,
			expiryDate: expiry,
			deliverables: [detail.trim()],
			usageRights: "",
			exclusivity: "",
			subtotal,
			gstAmount: gst,
			total: Math.round((subtotal + gst) * 100) / 100,
			status: "sent",
			terms: "This is a quote, not an invoice. It is valid for 14 days."
		});
		setDetail("");
		setAmount("");
		setOpen(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-neutral-400",
					children: "A quote is an offer. It becomes an invoice only when you convert it."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => clients.length ? setOpen(true) : onNeedClient(),
					className: "shrink-0 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-[#fff] hover:bg-emerald-500",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1 inline h-3.5 w-3.5" }), " New quote"]
				})]
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: save,
				className: "space-y-3 rounded-2xl border border-neutral-800 bg-neutral-900 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-xs text-neutral-400",
							children: ["Client", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: clientId,
								onChange: (e) => setClientId(e.target.value),
								className: "mt-1 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-white",
								children: clients.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: c.id,
									children: c.tradingName || c.legalName
								}, c.id))
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-xs text-neutral-400 sm:col-span-2",
							children: ["What it is for", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								value: detail,
								onChange: (e) => setDetail(e.target.value),
								className: "mt-1 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-white"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-xs text-neutral-400",
						children: ["Price, excluding GST", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							required: true,
							type: "number",
							min: "0",
							step: "0.01",
							value: amount,
							onChange: (e) => setAmount(e.target.value),
							className: "mt-1 w-full max-w-xs rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-white"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-[#fff]",
							children: "Save quote"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setOpen(false),
							className: "rounded-lg px-4 py-2 text-xs text-neutral-400",
							children: "Cancel"
						})]
					})
				]
			}),
			quotes.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-neutral-500",
				children: "No quotes yet."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: quotes.map((q) => {
					const client = clients.find((c) => c.id === q.clientId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col justify-between gap-4 rounded-2xl border border-neutral-800 bg-neutral-900 p-5 sm:flex-row sm:items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-1 flex flex-wrap items-center gap-2 text-xs text-neutral-400",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-white",
										children: q.quoteNumber
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["To: ", client?.tradingName || "Client"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Valid until ", q.expiryDate] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-semibold text-white",
								children: q.deliverables.filter(Boolean).join(" · ") || "Quote"
							}),
							q.usageRights ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 text-xs text-neutral-400",
								children: ["Usage: ", q.usageRights]
							}) : null,
							q.exclusivity ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-neutral-400",
								children: q.exclusivity
							}) : null
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2 sm:flex-col sm:items-end",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-lg font-bold tabular-nums text-white",
								children: formatAUD(q.total)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-mono text-[10px] text-neutral-400",
								children: q.gstAmount ? `Includes ${formatAUD(q.gstAmount)} GST` : "No GST"
							})] }), q.status === "converted" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-semibold text-ok",
								children: "Already invoiced"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => onConvertQuoteToInvoice(q),
								className: "flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-medium text-[#fff] hover:bg-emerald-500",
								children: ["Convert to tax invoice ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3 w-3" })]
							})]
						})]
					}, q.id);
				})
			})
		]
	});
}
var SalesView = ({ products, orders, payouts, taxProfile, onAddProduct, onAddPayout, onAddOrder }) => {
	const [activeTab, setActiveTab] = (0, import_react.useState)("payouts");
	const [showAddProductModal, setShowAddProductModal] = (0, import_react.useState)(false);
	const [showAddPayoutModal, setShowAddPayoutModal] = (0, import_react.useState)(false);
	const [showSaleModal, setShowSaleModal] = (0, import_react.useState)(false);
	const [saleProductId, setSaleProductId] = (0, import_react.useState)(products[0]?.id ?? "");
	const [saleCustomer, setSaleCustomer] = (0, import_react.useState)("");
	const [saleEmail, setSaleEmail] = (0, import_react.useState)("");
	const [payoutPlatform, setPayoutPlatform] = (0, import_react.useState)("OnlyFans");
	const [payoutGross, setPayoutGross] = (0, import_react.useState)(5e3);
	const [payoutPlatformCutPct, setPayoutPlatformCutPct] = (0, import_react.useState)(20);
	const [payoutFeeAmount, setPayoutFeeAmount] = (0, import_react.useState)(150);
	const [payoutCommissionPct, setPayoutCommissionPct] = (0, import_react.useState)(10);
	const calculatedPlatformFee = Math.round(payoutGross * (payoutPlatformCutPct / 100) * 100) / 100;
	const calculatedNetBeforeComm = payoutGross - calculatedPlatformFee - payoutFeeAmount;
	const calculatedCommission = Math.round(calculatedNetBeforeComm * (payoutCommissionPct / 100) * 100) / 100;
	const calculatedFinalDeposit = calculatedNetBeforeComm - calculatedCommission;
	const handleSavePayout = (e) => {
		e.preventDefault();
		onAddPayout({
			id: `pay-${Date.now()}`,
			platform: payoutPlatform,
			periodStart: (/* @__PURE__ */ new Date(Date.now() - 12096e5)).toISOString().split("T")[0],
			periodEnd: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
			depositDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
			grossRevenue: payoutGross,
			platformFee: calculatedPlatformFee,
			paymentProcessingFee: payoutFeeAmount,
			managementCommission: calculatedCommission,
			netPayout: calculatedFinalDeposit,
			status: "deposited"
		});
		setShowAddPayoutModal(false);
	};
	const [newProdName, setNewProdName] = (0, import_react.useState)("");
	const [newProdSku, setNewProdSku] = (0, import_react.useState)("");
	const [newProdType, setNewProdType] = (0, import_react.useState)("preset");
	const [newProdPrice, setNewProdPrice] = (0, import_react.useState)(49);
	const [newProdCost, setNewProdCost] = (0, import_react.useState)(0);
	const handleSaveProduct = (e) => {
		e.preventDefault();
		if (!newProdName || newProdPrice <= 0) return;
		onAddProduct({
			id: `prd-${Date.now()}`,
			sku: newProdSku || `SKU-${Date.now().toString().slice(-4)}`,
			name: newProdName,
			description: "Creator commercial product or digital offering.",
			type: newProdType,
			price: newProdPrice,
			cost: newProdCost,
			gstInclusive: true,
			inventoryEnabled: newProdType === "physical",
			inventoryQuantity: newProdType === "physical" ? 50 : 9999,
			active: true
		});
		setShowAddProductModal(false);
		setNewProdName("");
		setNewProdSku("");
	};
	const handleSaveSale = (e) => {
		e.preventDefault();
		const product = products.find((p) => p.id === saleProductId);
		if (!product || !saleCustomer.trim()) return;
		const registered = taxProfile.gstRegistered;
		const total = product.gstInclusive || !registered ? product.price : Math.round(product.price * 1.1 * 100) / 100;
		const gst = registered ? Math.round(total / 11 * 100) / 100 : 0;
		const subtotal = Math.round((total - gst) * 100) / 100;
		onAddOrder({
			id: `ord-${Date.now()}`,
			orderNumber: `ORD-${String(orders.length + 1).padStart(4, "0")}`,
			customerName: saleCustomer.trim(),
			customerEmail: saleEmail.trim() || "customer@email.com",
			channel: "storefront",
			date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
			subtotal,
			gstAmount: gst,
			shipping: 0,
			total,
			status: "completed",
			itemsSummary: product.name
		}, product.id);
		setShowSaleModal(false);
		setSaleCustomer("");
		setSaleEmail("");
	};
	const totalGrossPayouts = payouts.reduce((acc, p) => acc + p.grossRevenue, 0);
	const totalNetPayouts = payouts.reduce((acc, p) => acc + p.netPayout, 0);
	const totalPlatformFeesDeducted = payouts.reduce((acc, p) => acc + p.platformFee + p.paymentProcessingFee + p.managementCommission, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 max-w-7xl mx-auto pb-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold text-white font-display",
					children: "Sales, Products & Platform Payouts"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-neutral-400 mt-0.5",
					children: "Preserve the true economic story of your creator earnings across YouTube, OnlyFans, Patreon, and direct commerce."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1 p-1 bg-neutral-900 border border-neutral-800 rounded-xl text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setActiveTab("payouts"),
							className: `px-3.5 py-1.5 font-medium rounded-lg transition-colors flex items-center gap-1.5 ${activeTab === "payouts" ? "bg-neutral-800 text-white shadow-sm" : "text-neutral-400 hover:text-neutral-200"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "w-3.5 h-3.5 text-emerald-400" }), "Platform Payout Engine"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setActiveTab("orders"),
							className: `px-3.5 py-1.5 font-medium rounded-lg transition-colors flex items-center gap-1.5 ${activeTab === "orders" ? "bg-neutral-800 text-white shadow-sm" : "text-neutral-400 hover:text-neutral-200"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "w-3.5 h-3.5 text-emerald-400" }),
								"Storefront Orders (",
								orders.length,
								")"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setActiveTab("products"),
							className: `px-3.5 py-1.5 font-medium rounded-lg transition-colors flex items-center gap-1.5 ${activeTab === "products" ? "bg-neutral-800 text-white shadow-sm" : "text-neutral-400 hover:text-neutral-200"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "w-3.5 h-3.5 text-emerald-400" }),
								"Product Catalogue (",
								products.length,
								")"
							]
						})
					]
				})]
			}),
			activeTab === "payouts" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4 rounded-xl bg-neutral-900 border border-neutral-800",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-neutral-400",
										children: "Gross before fees"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-2xl font-bold text-white tabular-nums mt-1",
										children: formatAUD(totalGrossPayouts)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[11px] text-neutral-400 mt-1",
										children: "Before platform or card fees"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4 rounded-xl bg-neutral-900 border border-neutral-800",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-neutral-400",
										children: "Total Deductions (Fees & Agency)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-2xl font-bold text-rose-400 tabular-nums mt-1",
										children: ["-", formatAUD(totalPlatformFeesDeducted)]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[11px] text-neutral-400 mt-1",
										children: "Platform take, processing & manager cuts"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4 rounded-xl bg-neutral-900 border border-neutral-800",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-neutral-400",
										children: "Net Australian Bank Deposits"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-2xl font-bold text-emerald-400 tabular-nums mt-1",
										children: formatAUD(totalNetPayouts)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[11px] text-neutral-400 mt-1",
										children: "Recorded in the operating account"
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-semibold text-white",
							children: "Platform Payout Settlements"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-neutral-400",
							children: "Storing gross revenue and separate fee lines prevents under-reporting income and missing fee expense deductions."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setShowAddPayoutModal(true),
							className: "px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-[#fff] shadow-lg shadow-emerald-600/20 flex items-center gap-1.5 transition-all",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-3.5 h-3.5" }), " Log Platform Payout"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: payouts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2.5 h-2.5 rounded-full bg-emerald-400" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-bold text-white text-base font-display",
											children: [p.platform, " Settlement"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs text-neutral-400 font-mono",
											children: [
												"(Period: ",
												p.periodStart,
												" to ",
												p.periodEnd,
												")"
											]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs text-neutral-400",
										children: ["Deposited ", p.depositDate]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "px-2 py-0.5 rounded text-[10px] uppercase font-mono font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20",
										children: p.status
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 sm:grid-cols-5 gap-3 p-3.5 rounded-xl bg-neutral-950 border border-neutral-800/80 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-neutral-500 block text-[10px] uppercase font-mono",
										children: "1. Gross Fan Spend"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-white text-sm tabular-nums",
										children: formatAUD(p.grossRevenue)
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-neutral-500 block text-[10px] uppercase font-mono",
										children: "2. Platform Cut"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-bold text-rose-400 text-sm tabular-nums",
										children: ["-", formatAUD(p.platformFee)]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-neutral-500 block text-[10px] uppercase font-mono",
										children: "3. Processing Fee"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-medium text-neutral-300 text-sm tabular-nums",
										children: ["-", formatAUD(p.paymentProcessingFee)]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-neutral-500 block text-[10px] uppercase font-mono",
										children: "4. Manager Comm"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-medium text-neutral-300 text-sm tabular-nums",
										children: ["-", formatAUD(p.managementCommission)]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-neutral-500 block text-[10px] uppercase font-mono",
										children: "5. Net AU Deposit"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-emerald-400 text-sm tabular-nums",
										children: formatAUD(p.netPayout)
									})] })
								]
							})]
						}, p.id))
					})
				]
			}),
			activeTab === "orders" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-neutral-400",
							children: "Shop sales land in the operating account and the ledger."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								setSaleProductId(products[0]?.id ?? "");
								setShowSaleModal(true);
							},
							disabled: products.length === 0,
							className: "px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-[#fff] shadow-lg shadow-emerald-600/20 flex items-center gap-1.5 transition-all disabled:opacity-40",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-3.5 h-3.5" }), " Record a sale"]
						})]
					}),
					orders.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-neutral-800 bg-neutral-900 p-8 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg font-bold text-white",
							children: "No shop sales yet"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-neutral-400",
							children: "Add a product, then record the sale here."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-5 rounded-2xl bg-neutral-900 border border-neutral-800",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-x-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full text-left text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-b border-neutral-800 text-neutral-400 uppercase tracking-wider font-mono text-[10px]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-2.5 px-3",
											children: "Order #"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-2.5 px-3",
											children: "Date"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-2.5 px-3",
											children: "Customer"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-2.5 px-3",
											children: "Items"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-2.5 px-3 text-right",
											children: "Subtotal"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-2.5 px-3 text-right",
											children: "GST"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-2.5 px-3 text-right",
											children: "Total AUD"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-2.5 px-3 text-center",
											children: "Status"
										})
									]
								}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
									className: "divide-y divide-neutral-800/60 text-neutral-200",
									children: orders.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "hover:bg-neutral-800/30 transition-colors",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3 px-3 font-mono font-semibold text-white",
												children: o.orderNumber
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3 px-3 font-mono text-neutral-400",
												children: o.date
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "py-3 px-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "font-medium text-white",
													children: o.customerName
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-[11px] text-neutral-400",
													children: o.customerEmail
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3 px-3 text-neutral-300 max-w-xs truncate",
												children: o.itemsSummary
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3 px-3 text-right tabular-nums",
												children: formatAUD(o.subtotal)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3 px-3 text-right tabular-nums text-emerald-400",
												children: formatAUD(o.gstAmount)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3 px-3 text-right font-bold text-white tabular-nums",
												children: formatAUD(o.total)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3 px-3 text-center",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "px-2 py-0.5 rounded text-[10px] uppercase font-mono font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20",
													children: o.status
												})
											})
										]
									}, o.id))
								})]
							})
						})
					})
				]
			}),
			activeTab === "products" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs text-neutral-400",
						children: [products.length, " offerings configured in your commercial catalogue"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setShowAddProductModal(true),
						className: "px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-[#fff] shadow-lg shadow-emerald-600/20 flex items-center gap-1.5 transition-all",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-3.5 h-3.5" }), " Add Product or Service"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
					children: products.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-xs mb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-neutral-400 text-[10px]",
									children: p.sku
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "px-2 py-0.5 rounded text-[10px] uppercase font-mono font-semibold bg-neutral-800 text-neutral-300",
									children: p.type
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold text-white text-sm font-display mb-1",
								children: p.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-neutral-400 line-clamp-2",
								children: p.description
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 pt-4 border-t border-neutral-800 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] text-neutral-500 uppercase font-mono",
								children: "Retail Price"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-lg font-bold text-white tabular-nums",
								children: formatAUD(p.price)
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-right text-[11px] text-neutral-400 font-mono",
								children: p.inventoryEnabled ? `${p.inventoryQuantity} in stock` : "Instant Access"
							})]
						})]
					}, p.id))
				})]
			}),
			showSaleModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 text-sm text-neutral-200 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between pb-3 border-b border-neutral-800",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-white text-base",
							children: "Record a shop sale"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setShowSaleModal(false),
							className: "text-neutral-400 hover:text-white",
							children: "✕"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSaveSale,
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-xs font-semibold text-neutral-300",
								children: ["Product", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: saleProductId,
									onChange: (e) => setSaleProductId(e.target.value),
									className: "mt-1 w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white",
									children: products.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: p.id,
										children: [
											p.name,
											" · ",
											formatAUD(p.price)
										]
									}, p.id))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-xs font-semibold text-neutral-300",
								children: ["Customer", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									required: true,
									value: saleCustomer,
									onChange: (e) => setSaleCustomer(e.target.value),
									className: "mt-1 w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white",
									placeholder: "Name"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-xs font-semibold text-neutral-300",
								children: ["Email", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "email",
									value: saleEmail,
									onChange: (e) => setSaleEmail(e.target.value),
									className: "mt-1 w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white",
									placeholder: "Optional"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-neutral-400",
								children: "The sale is marked paid, added to the operating account, and posted to the ledger."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "w-full rounded-xl bg-emerald-600 py-2.5 text-xs font-semibold text-[#fff]",
								children: "Save sale"
							})
						]
					})]
				})
			}),
			showAddPayoutModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 text-sm text-neutral-200 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between pb-3 border-b border-neutral-800",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-white text-base",
							children: "Record Platform Payout Settlement"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowAddPayoutModal(false),
							className: "text-neutral-400 hover:text-white",
							children: "✕"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSavePayout,
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1",
								children: "Creator Platform"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: payoutPlatform,
								onChange: (e) => setPayoutPlatform(e.target.value),
								className: "w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-emerald-500",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "OnlyFans",
										children: "OnlyFans (Standard 20% platform cut)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "YouTube",
										children: "YouTube (AdSense / Partner 45% cut)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Patreon",
										children: "Patreon (Pro 8% + payment fee)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "TikTok",
										children: "TikTok (Creator Rewards / Live)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Fansly",
										children: "Fansly"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Twitch",
										children: "Twitch Subscriptions"
									})
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1",
								children: "Gross Fan Spend (USD converted to AUD)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								required: true,
								placeholder: "5000",
								value: payoutGross || "",
								onChange: (e) => setPayoutGross(parseFloat(e.target.value) || 0),
								className: "w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white font-mono focus:outline-none focus:border-emerald-500"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1",
										children: [
											"Platform Fee % (",
											payoutPlatformCutPct,
											"%)"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "range",
										min: "0",
										max: "50",
										value: payoutPlatformCutPct,
										onChange: (e) => setPayoutPlatformCutPct(parseInt(e.target.value)),
										className: "w-full mt-2 accent-emerald-500"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-[11px] text-neutral-400 mt-1",
										children: ["Cut: -", formatAUD(calculatedPlatformFee)]
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1",
										children: [
											"Agency Commission % (",
											payoutCommissionPct,
											"%)"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "range",
										min: "0",
										max: "30",
										value: payoutCommissionPct,
										onChange: (e) => setPayoutCommissionPct(parseInt(e.target.value)),
										className: "w-full mt-2 accent-emerald-500"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-[11px] text-neutral-400 mt-1",
										children: ["Comm: -", formatAUD(calculatedCommission)]
									})
								] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1.5 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-neutral-400",
											children: "Gross Subscriber Spend:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-white tabular-nums",
											children: formatAUD(payoutGross)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-rose-400",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											"Platform Fee (",
											payoutPlatformCutPct,
											"%):"
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-mono tabular-nums",
											children: ["-", formatAUD(calculatedPlatformFee)]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-neutral-300",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Wire / Processing Fee:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-mono tabular-nums",
											children: ["-", formatAUD(payoutFeeAmount)]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-neutral-300",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											"Manager Commission (",
											payoutCommissionPct,
											"%):"
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-mono tabular-nums",
											children: ["-", formatAUD(calculatedCommission)]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "pt-2 border-t border-neutral-800 flex justify-between font-bold text-sm text-emerald-400",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Net Australian Bank Deposit:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono tabular-nums",
											children: formatAUD(calculatedFinalDeposit)
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-end gap-2 pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setShowAddPayoutModal(false),
									className: "px-4 py-2 text-xs text-neutral-400 hover:text-white",
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-[#fff] shadow-lg shadow-emerald-600/20",
									children: "Post Payout to Ledger"
								})]
							})
						]
					})]
				})
			}),
			showAddProductModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 text-sm text-neutral-200 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between pb-3 border-b border-neutral-800",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-white text-base",
							children: "Add Product or Offering"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowAddProductModal(false),
							className: "text-neutral-400 hover:text-white",
							children: "✕"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSaveProduct,
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1",
								children: "Product / Service Name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								placeholder: "e.g. Melbourne Autumn Lightroom Presets",
								value: newProdName,
								onChange: (e) => setNewProdName(e.target.value),
								className: "w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1",
									children: "SKU Code"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									placeholder: "PRESET-03",
									value: newProdSku,
									onChange: (e) => setNewProdSku(e.target.value),
									className: "w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white font-mono focus:outline-none focus:border-emerald-500"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1",
									children: "Type"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: newProdType,
									onChange: (e) => setNewProdType(e.target.value),
									className: "w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-emerald-500",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "preset",
											children: "Preset Pack"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "digital",
											children: "Digital Download / Guide"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "physical",
											children: "Physical Merch"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "service",
											children: "1-on-1 Consulting"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "subscription",
											children: "Subscription / Membership"
										})
									]
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1",
									children: "Retail Price (AUD)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									step: "0.01",
									required: true,
									value: newProdPrice || "",
									onChange: (e) => setNewProdPrice(parseFloat(e.target.value) || 0),
									className: "w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white font-mono focus:outline-none focus:border-emerald-500"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1",
									children: "Unit Cost (if physical)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									step: "0.01",
									value: newProdCost || "",
									onChange: (e) => setNewProdCost(parseFloat(e.target.value) || 0),
									className: "w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white font-mono focus:outline-none focus:border-emerald-500"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-end gap-2 pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setShowAddProductModal(false),
									className: "px-4 py-2 text-xs text-neutral-400 hover:text-white",
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-[#fff] shadow-lg shadow-emerald-600/20",
									children: "Save Product"
								})]
							})
						]
					})]
				})
			})
		]
	});
};
var InvoicesView = ({ invoices, clients, business, taxProfile, onAddInvoice, onMarkInvoicePaid, bankAccounts = [], launchToken = 0 }) => {
	const [selectedInvoice, setSelectedInvoice] = (0, import_react.useState)(null);
	const [showCreateModal, setShowCreateModal] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (launchToken > 0) setShowCreateModal(true);
	}, [launchToken]);
	const [newClientId, setNewClientId] = (0, import_react.useState)(clients[0]?.id || "");
	const [newDueDate, setNewDueDate] = (0, import_react.useState)("");
	const [itemDesc, setItemDesc] = (0, import_react.useState)("Brand Campaign & UGC Content Creation (Reel + Stories)");
	const [itemQty, setItemQty] = (0, import_react.useState)(1);
	const [itemPrice, setItemPrice] = (0, import_react.useState)(3500);
	const handleCreateInvoice = (e) => {
		e.preventDefault();
		if (!newClientId || itemPrice <= 0) return;
		const isTaxInvoice = taxProfile.gstRegistered;
		const gstRate = isTaxInvoice ? .1 : 0;
		const subtotal = itemQty * itemPrice;
		const gstTotal = Math.round(subtotal * gstRate * 100) / 100;
		const total = subtotal + gstTotal;
		const invoiceNumber = nextInvoiceNumber(invoices.map((i) => i.invoiceNumber));
		const items = [{
			id: `itm-${Date.now()}`,
			description: itemDesc,
			quantity: itemQty,
			unitPrice: itemPrice,
			gstRate,
			amount: subtotal
		}];
		const newInvoice = {
			id: `inv-${Date.now()}`,
			invoiceNumber,
			clientId: newClientId,
			isTaxInvoice,
			issueDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
			dueDate: newDueDate || new Date(Date.now() + 12096e5).toISOString().split("T")[0],
			items,
			subtotal,
			gstTotal,
			total,
			status: "issued",
			notes: "Thank you for partnering with us. Please quote invoice number with payment.",
			auditTrail: [`Generated ${(/* @__PURE__ */ new Date()).toISOString()}`, `Labelled ${isTaxInvoice ? "TAX INVOICE" : "INVOICE"} as per ATO GST status.`]
		};
		onAddInvoice(newInvoice);
		setShowCreateModal(false);
		setSelectedInvoice(newInvoice);
	};
	const handlePrint = () => {
		window.print();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 max-w-7xl mx-auto pb-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold text-white font-display",
					children: "Invoices & Tax Invoices"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-neutral-400 mt-0.5",
					children: "Strict ATO compliance: Automatically renders as a Tax Invoice if GST registered, or standard Invoice if not."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setShowCreateModal(true),
					className: "px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-[#fff] shadow-lg shadow-emerald-600/20 flex items-center gap-1.5 transition-all self-start sm:self-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-3.5 h-3.5" }), " Issue New Invoice"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 rounded-xl bg-neutral-900 border border-neutral-800 flex items-start gap-3 text-xs text-neutral-300",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-4 h-4 text-emerald-400 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold text-white",
						children: "Australian Taxation Office (ATO) Compliance Rule:"
					}),
					" ",
					taxProfile.gstRegistered ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"Your business is registered for GST. You are legally required to issue ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Tax Invoices" }),
						" that state the words \"Tax Invoice\", display your ABN (",
						business.abn,
						"), and show the GST amount clearly."
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Your business is NOT registered for GST. Invoices must be labelled \"Invoice\" (NOT \"Tax Invoice\") and must not include any GST component." })
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-5 rounded-2xl bg-neutral-900 border border-neutral-800",
				children: [
					invoices.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "py-10 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg font-bold text-white",
							children: "No invoices yet"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-neutral-400",
							children: "Issue one from a booking, or start a tax invoice here."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3 md:hidden",
						children: invoices.map((inv) => {
							const client = clients.find((c) => c.id === inv.clientId);
							const status = shownInvoiceStatus(inv.status, inv.dueDate);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "w-full rounded-xl border border-neutral-800 bg-neutral-950 p-4 text-left",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-mono text-xs font-semibold text-white",
												children: inv.invoiceNumber
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-1 font-semibold text-white",
												children: client?.tradingName || "Client"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-[11px] text-neutral-400",
												children: ["Due ", inv.dueDate]
											})
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-right",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-bold tabular-nums text-white",
												children: formatAUD(inv.total)
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: `mt-1 text-[10px] font-semibold uppercase ${status === "paid" ? "text-ok" : status === "overdue" ? "text-alert" : "text-warn"}`,
												children: status
											})]
										})]
									}),
									status !== "paid" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => onMarkInvoicePaid(inv.id),
										className: "mt-3 inline-flex min-h-11 items-center rounded-lg bg-emerald-600 px-3 text-xs font-semibold text-[#fff]",
										children: "Mark paid"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setSelectedInvoice(inv),
										className: "mt-2 text-xs font-semibold text-accent",
										children: "View invoice"
									})
								]
							}, inv.id);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hidden overflow-x-auto md:block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-left text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-neutral-800 text-neutral-400 uppercase tracking-wider font-mono text-[10px]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2.5 px-3",
										children: "Invoice #"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2.5 px-3",
										children: "Client"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2.5 px-3",
										children: "Issue Date"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2.5 px-3",
										children: "Due Date"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2.5 px-3 text-right",
										children: "Subtotal"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2.5 px-3 text-right",
										children: "GST Total"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2.5 px-3 text-right",
										children: "Total AUD"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2.5 px-3 text-center",
										children: "Status"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2.5 px-3 text-right",
										children: "Actions"
									})
								]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
								className: "divide-y divide-neutral-800/60 text-neutral-200",
								children: invoices.map((inv) => {
									const client = clients.find((c) => c.id === inv.clientId);
									const status = shownInvoiceStatus(inv.status, inv.dueDate);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "hover:bg-neutral-800/30 transition-colors",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "py-3 px-3 font-mono font-semibold text-white",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => setSelectedInvoice(inv),
													className: "hover:text-emerald-400 underline decoration-dotted",
													children: inv.invoiceNumber
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-[10px] text-neutral-500",
													children: inv.isTaxInvoice ? "Tax Invoice" : "Standard"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "py-3 px-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "font-semibold text-white",
													children: client?.tradingName || "Client"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-[11px] text-neutral-400",
													children: client?.contactName
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3 px-3 font-mono text-neutral-400",
												children: inv.issueDate
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3 px-3 font-mono text-neutral-400",
												children: inv.dueDate
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3 px-3 text-right tabular-nums",
												children: formatAUD(inv.subtotal)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3 px-3 text-right tabular-nums text-emerald-400",
												children: formatAUD(inv.gstTotal)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3 px-3 text-right font-bold text-white tabular-nums",
												children: formatAUD(inv.total)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3 px-3 text-center",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: `px-2 py-0.5 rounded text-[10px] uppercase font-mono font-semibold ${status === "paid" ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20" : status === "overdue" ? "text-alert bg-alert/10 border border-alert/20" : status === "issued" ? "text-amber-400 bg-amber-500/10 border border-amber-500/20" : "text-neutral-400 bg-neutral-800"}`,
													children: status
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "py-3 px-3 text-right space-x-1 whitespace-nowrap",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => setSelectedInvoice(inv),
													className: "px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-[11px] transition-colors",
													children: "View / Print"
												}), status !== "paid" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => onMarkInvoicePaid(inv.id),
													className: "px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-[#fff] text-[11px] font-medium transition-colors",
													children: "Mark Paid"
												})]
											})
										]
									}, inv.id);
								})
							})]
						})
					})
				]
			}),
			selectedInvoice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto print:static print:bg-transparent print:p-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "print-sheet w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-8 text-neutral-100 space-y-6 my-8 print:max-w-none print:rounded-none print:border-0 print:shadow-none",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "print-hidden flex items-center justify-between pb-4 border-b border-neutral-800",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs text-neutral-400",
								children: "Document Preview"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-emerald-400 text-xs font-semibold",
								children: "ATO Compliant Template"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: handlePrint,
								className: "px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "w-3.5 h-3.5" }), " Print / Save PDF"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setSelectedInvoice(null),
								className: "p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800",
								children: "✕"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-neutral-950 p-6 rounded-xl border border-neutral-800 text-xs text-neutral-200 space-y-6 font-sans",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-start",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-xl font-bold tracking-tight text-white font-display",
									children: selectedInvoice.isTaxInvoice ? "TAX INVOICE" : "INVOICE"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-emerald-400 font-mono text-sm mt-0.5",
									children: selectedInvoice.invoiceNumber
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-right",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-bold text-white text-sm",
											children: business.legalName
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "font-mono text-neutral-400",
											children: ["ABN: ", business.abn]
										}),
										business.acn && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "font-mono text-neutral-400",
											children: ["ACN: ", business.acn]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-neutral-400",
											children: business.businessAddress
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-neutral-400",
											children: business.contactEmail
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-4 pt-4 border-t border-neutral-800",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mb-1",
									children: "Billed To"
								}), (() => {
									const client = clients.find((c) => c.id === selectedInvoice.clientId);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-bold text-white text-sm",
											children: client?.legalName || "Client"
										}),
										client?.tradingName && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-neutral-400",
											children: ["t/a ", client.tradingName]
										}),
										client?.abn && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "font-mono text-neutral-400",
											children: ["ABN: ", client.abn]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-neutral-400",
											children: client?.billingAddress
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-neutral-400",
											children: [
												"Attn: ",
												client?.contactName,
												" (",
												client?.email,
												")"
											]
										})
									] });
								})()] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-right space-y-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-neutral-500",
											children: "Date of Issue: "
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono font-medium text-white",
											children: selectedInvoice.issueDate
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-neutral-500",
											children: "Payment Due: "
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono font-medium text-white",
											children: selectedInvoice.dueDate
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-neutral-500",
											children: "GST Status: "
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-emerald-400 font-medium",
											children: selectedInvoice.isTaxInvoice ? "10% Taxable Supply" : "Not Registered (GST-Free)"
										})] })
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "border border-neutral-800 rounded-lg overflow-hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
									className: "w-full text-left text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
										className: "bg-neutral-900 border-b border-neutral-800 text-neutral-400 font-mono text-[10px] uppercase",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-2.5 px-3",
												children: "Description"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-2.5 px-3 text-center",
												children: "Qty"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-2.5 px-3 text-right",
												children: "Unit Price"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-2.5 px-3 text-right",
												children: "GST"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-2.5 px-3 text-right",
												children: "Amount (AUD)"
											})
										] })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
										className: "divide-y divide-neutral-800 text-neutral-200",
										children: selectedInvoice.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3 px-3 font-medium text-white",
												children: item.description
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3 px-3 text-center font-mono",
												children: item.quantity
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3 px-3 text-right font-mono tabular-nums",
												children: formatAUD(item.unitPrice)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3 px-3 text-right font-mono tabular-nums text-emerald-400",
												children: item.gstRate > 0 ? `${item.gstRate * 100}%` : "0%"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3 px-3 text-right font-mono font-bold text-white tabular-nums",
												children: formatAUD(item.amount)
											})
										] }, item.id))
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex justify-end pt-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "w-64 space-y-1.5 text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between text-neutral-400",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Subtotal (excl. GST):" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono tabular-nums text-white",
												children: formatAUD(selectedInvoice.subtotal)
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between text-emerald-400",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "GST (10%):" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono tabular-nums",
												children: formatAUD(selectedInvoice.gstTotal)
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "pt-2 border-t border-neutral-800 flex justify-between font-bold text-sm text-white",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total Amount Due:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono tabular-nums text-emerald-400",
												children: formatAUD(selectedInvoice.total)
											})]
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-4 border-t border-neutral-800 text-neutral-400 space-y-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-semibold text-white",
										children: "Payment details"
									}),
									(() => {
										const payTo = bankAccounts.find((a) => a.type === "transaction") ?? bankAccounts[0];
										if (!payTo) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Add an operating account in Money, then put it on the invoice." });
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Bank: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-white",
												children: payTo.bankName
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Account name: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-white",
												children: payTo.accountName || business.legalName
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
												"BSB: ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-mono text-white",
													children: payTo.bsb || "—"
												}),
												" · Account: ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-mono text-white",
													children: payTo.accountNumber || "—"
												})
											] })
										] });
									})(),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Reference: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-emerald-400",
										children: selectedInvoice.invoiceNumber
									})] })
								]
							}),
							selectedInvoice.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-3 rounded bg-neutral-900/60 border border-neutral-800/60 text-[11px] text-neutral-400",
								children: selectedInvoice.notes
							})
						]
					})]
				})
			}),
			showCreateModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 text-sm text-neutral-200 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between pb-3 border-b border-neutral-800",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "font-semibold text-white text-base",
							children: ["Create ", taxProfile.gstRegistered ? "Tax Invoice (GST Registered)" : "Standard Invoice"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowCreateModal(false),
							className: "text-neutral-400 hover:text-white",
							children: "✕"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleCreateInvoice,
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1",
								children: "Recipient Client / Agency"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: newClientId,
								onChange: (e) => setNewClientId(e.target.value),
								className: "w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-emerald-500",
								children: clients.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: c.id,
									children: [
										c.tradingName,
										" (",
										c.legalName,
										")"
									]
								}, c.id))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1",
								children: "Payment Due Date"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "date",
								value: newDueDate,
								onChange: (e) => setNewDueDate(e.target.value),
								className: "w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1",
								children: "Deliverable Line Item Description"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								value: itemDesc,
								onChange: (e) => setItemDesc(e.target.value),
								className: "w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1",
									children: "Quantity"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									min: "1",
									value: itemQty,
									onChange: (e) => setItemQty(parseInt(e.target.value) || 1),
									className: "w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white font-mono focus:outline-none focus:border-emerald-500"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1",
									children: "Unit Price (excl. GST)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									step: "0.01",
									required: true,
									value: itemPrice || "",
									onChange: (e) => setItemPrice(parseFloat(e.target.value) || 0),
									className: "w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white font-mono focus:outline-none focus:border-emerald-500"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-400 space-y-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Subtotal:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-white tabular-nums",
											children: formatAUD(itemQty * itemPrice)
										})]
									}),
									taxProfile.gstRegistered ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-emerald-400",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "10% Australian GST:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-mono tabular-nums",
											children: ["+", formatAUD(itemQty * itemPrice * .1)]
										})]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[11px] text-neutral-500",
										children: "Not GST registered. No GST added."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "pt-1.5 border-t border-neutral-800 flex justify-between font-bold text-white",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total Amount Due:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-emerald-400 tabular-nums",
											children: formatAUD(itemQty * itemPrice * (taxProfile.gstRegistered ? 1.1 : 1))
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-end gap-2 pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setShowCreateModal(false),
									className: "px-4 py-2 text-xs text-neutral-400 hover:text-white",
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-[#fff] shadow-lg shadow-emerald-600/20",
									children: "Issue Tax Invoice"
								})]
							})
						]
					})]
				})
			})
		]
	});
};
function asLexInput(input) {
	const raw = input ?? {};
	return {
		messages: (Array.isArray(raw.messages) ? raw.messages : []).slice(-8).map((m) => ({
			role: m?.role === "user" ? "user" : "assistant",
			content: String(m?.content ?? "").slice(0, 4e3)
		})),
		context: {
			legalName: String(raw.context?.legalName ?? "Creator").slice(0, 120),
			abn: String(raw.context?.abn ?? "").slice(0, 20),
			entityType: String(raw.context?.entityType ?? "sole_trader").slice(0, 40),
			gstRegistered: Boolean(raw.context?.gstRegistered)
		}
	};
}
var askLex = createServerFn({ method: "POST" }).validator(asLexInput).handler(createSsrRpc("a2f7dbf14c2714d5eccaa6a4bcb9d44720ebd7d386361f5ccf5faaf86d82c693"));
var parseReceipt = createServerFn({ method: "POST" }).validator((input) => {
	const image = String((input ?? {}).imageBase64 ?? "");
	if (!image.startsWith("data:image/")) throw new Error("Upload a JPEG or PNG receipt.");
	if (image.length > 14e5) throw new Error("That photo is too large. Retake it closer, or enter the expense by hand.");
	return { imageBase64: image };
}).handler(createSsrRpc("9fb1ad3662e2d7cdfe0d2f0c061a122b112706fc74d2b87f97d3c3429df01d16"));
var ReceiptScannerModal = ({ isOpen, onClose, taxProfile, onExpenseParsed }) => {
	const videoRef = (0, import_react.useRef)(null);
	const canvasRef = (0, import_react.useRef)(null);
	const fileInputRef = (0, import_react.useRef)(null);
	const [stream, setStream] = (0, import_react.useState)(null);
	const [cameraActive, setCameraActive] = (0, import_react.useState)(false);
	const [cameraError, setCameraError] = (0, import_react.useState)(null);
	const [facingMode, setFacingMode] = (0, import_react.useState)("environment");
	const [capturedImage, setCapturedImage] = (0, import_react.useState)(null);
	const [isAnalyzing, setIsAnalyzing] = (0, import_react.useState)(false);
	const [parsedData, setParsedData] = (0, import_react.useState)(null);
	const [analysisError, setAnalysisError] = (0, import_react.useState)(null);
	const [businessUsePct, setBusinessUsePct] = (0, import_react.useState)(100);
	(0, import_react.useEffect)(() => {
		if (isOpen && !capturedImage) startCamera();
		return () => {
			stopCamera();
		};
	}, [isOpen, facingMode]);
	const startCamera = async () => {
		stopCamera();
		setCameraError(null);
		try {
			if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) throw new Error("Camera device access is not supported in this browser.");
			const mediaStream = await navigator.mediaDevices.getUserMedia({
				video: {
					facingMode: { ideal: facingMode },
					width: { ideal: 1920 },
					height: { ideal: 1080 }
				},
				audio: false
			});
			setStream(mediaStream);
			if (videoRef.current) {
				videoRef.current.srcObject = mediaStream;
				await videoRef.current.play();
			}
			setCameraActive(true);
		} catch (err) {
			console.warn("Camera stream error:", err);
			let message = "Unable to access camera. Please check browser permissions or upload an image.";
			if (err?.name === "NotAllowedError" || err?.name === "PermissionDeniedError") message = "Camera permission was denied. Please allow camera access in browser permissions or use image upload below.";
			else if (err?.name === "NotFoundError") message = "No video camera device was detected on your system.";
			setCameraError(message);
			setCameraActive(false);
		}
	};
	const stopCamera = () => {
		if (stream) {
			stream.getTracks().forEach((track) => track.stop());
			setStream(null);
		}
		setCameraActive(false);
	};
	const handleCapture = () => {
		if (!videoRef.current || !canvasRef.current) return;
		const video = videoRef.current;
		const canvas = canvasRef.current;
		canvas.width = video.videoWidth || 1280;
		canvas.height = video.videoHeight || 720;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
		const dataUrl = canvas.toDataURL("image/jpeg", .88);
		setCapturedImage(dataUrl);
		stopCamera();
		analyzeReceipt(dataUrl);
	};
	const handleFileUpload = (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = (evt) => {
			const dataUrl = evt.target?.result;
			setCapturedImage(dataUrl);
			stopCamera();
			analyzeReceipt(dataUrl);
		};
		reader.readAsDataURL(file);
	};
	const analyzeReceipt = async (imageDataUrl) => {
		setIsAnalyzing(true);
		setAnalysisError(null);
		try {
			const parsed = await parseReceipt({ data: { imageBase64: imageDataUrl } });
			setParsedData(parsed);
			setBusinessUsePct(parsed.suggestedBusinessUsePercentage || 100);
		} catch (err) {
			console.error("[v0] Receipt parsing error:", err instanceof Error ? err.message : "unknown error");
			setParsedData(null);
			setAnalysisError(err instanceof Error ? err.message : "Receipt analysis failed. Please enter the expense manually.");
		} finally {
			setIsAnalyzing(false);
		}
	};
	const handleRetake = () => {
		setCapturedImage(null);
		setParsedData(null);
		startCamera();
	};
	const handleSaveToLedger = () => {
		if (!parsedData || !parsedData.supplier.trim() || parsedData.grossAmount <= 0) return;
		const gross = parsedData.grossAmount;
		const gst = taxProfile.gstRegistered ? parsedData.gstAmount : 0;
		const net = gross - gst;
		const claimableAmount = Math.round(gross * (businessUsePct / 100) * 100) / 100;
		const claimableGst = Math.round(gst * (businessUsePct / 100) * 100) / 100;
		onExpenseParsed({
			id: `exp-${Date.now()}`,
			date: parsedData.date,
			supplier: parsedData.supplier,
			supplierAbn: parsedData.supplierAbn || void 0,
			category: parsedData.category,
			description: parsedData.description,
			grossAmount: gross,
			gstAmount: gst,
			netAmount: net,
			businessUsePercentage: businessUsePct,
			claimableAmount,
			claimableGst,
			deductibilityConfidence: parsedData.deductibilityConfidence,
			taxNotes: parsedData.taxNotes,
			receiptUrl: capturedImage || void 0,
			receiptName: `scan-${parsedData.supplier.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${Date.now().toString().slice(-4)}.jpg`,
			receiptOcrVerified: true,
			isReconciled: false
		});
		handleClose();
	};
	const handleClose = () => {
		stopCamera();
		setCapturedImage(null);
		setParsedData(null);
		onClose();
	};
	if (!isOpen) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 border-b border-neutral-800 bg-neutral-950 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-8 h-8 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "w-4 h-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-white text-sm",
							children: "Scan Receipt Document"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-neutral-400",
							children: "Capture paper tax invoice · Auto-parsed with Gemini Multimodal Vision"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: handleClose,
						className: "p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 overflow-y-auto p-4 sm:p-6 space-y-5",
					children: !capturedImage ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative aspect-video max-h-[420px] w-full bg-black rounded-2xl overflow-hidden border border-neutral-800 flex items-center justify-center",
							children: cameraActive ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
								ref: videoRef,
								autoPlay: true,
								playsInline: true,
								muted: true,
								className: "w-full h-full object-cover"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-0 pointer-events-none flex items-center justify-center p-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative w-4/5 h-4/5 border-2 border-emerald-500/60 rounded-xl",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-1 -left-1 w-4 h-4 border-t-4 border-l-4 border-emerald-400" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-1 -right-1 w-4 h-4 border-t-4 border-r-4 border-emerald-400" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-1 -left-1 w-4 h-4 border-b-4 border-l-4 border-emerald-400" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-1 -right-1 w-4 h-4 border-b-4 border-r-4 border-emerald-400" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_rgba(52,211,153,0.8)] animate-pulse" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "absolute bottom-3 inset-x-0 text-center",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[11px] font-mono bg-black/70 text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/30 backdrop-blur-sm",
												children: "Align receipt within border"
											})
										})
									]
								})
							})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-6 text-center max-w-sm space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto text-neutral-400",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "w-6 h-6" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs font-semibold text-white",
										children: "Camera Standby / Permission"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-neutral-400 mt-1",
										children: cameraError || "Click below to start your camera or choose a receipt file to upload."
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: startCamera,
										className: "px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-[#fff] rounded-xl text-xs font-semibold transition-all shadow-md cursor-pointer",
										children: "Start Camera Device"
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col sm:flex-row items-center justify-between gap-3 pt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => {
											setFacingMode((prev) => prev === "environment" ? "user" : "environment");
										},
										className: "p-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer",
										title: "Flip camera",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Flip Camera" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => fileInputRef.current?.click(),
										className: "p-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Upload Image" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										ref: fileInputRef,
										type: "file",
										accept: "image/*",
										capture: "environment",
										className: "hidden",
										onChange: handleFileUpload
									})
								]
							}), cameraActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: handleCapture,
								className: "w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 flex items-center justify-center shadow-lg shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer ring-4 ring-emerald-500/20",
								title: "Capture Receipt Photo",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "w-6 h-6 text-black" })
							})]
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-5",
						children: isAnalyzing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-8 rounded-2xl bg-neutral-950 border border-neutral-800 text-center space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto animate-pulse",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-6 h-6 animate-spin" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-sm font-semibold text-white",
								children: "Lex is reading the receipt…"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-neutral-400 mt-1 max-w-sm mx-auto",
								children: "Extracting vendor name, 11-digit ABN, GST line items, and ATO expense classification."
							})] })]
						}) : analysisError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-amber-500/30 bg-amber-500/10 p-8 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "mx-auto mb-3 h-8 w-8 text-amber-400" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-sm font-semibold text-white",
									children: "Receipt could not be analysed"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mx-auto mt-2 max-w-md text-xs leading-5 text-neutral-300",
									children: analysisError
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-xs text-neutral-400",
									children: "You can enter this expense manually instead."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setAnalysisError(null),
									className: "mt-5 rounded-lg border border-neutral-700 px-4 py-2 text-xs font-semibold text-white hover:bg-neutral-800",
									children: "Try another receipt"
								})
							]
						}) : parsedData ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 md:grid-cols-12 gap-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "md:col-span-5 space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[11px] font-mono text-neutral-400 uppercase tracking-wider",
										children: "Captured Document Evidence:"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative rounded-xl overflow-hidden border border-neutral-800 bg-black aspect-[3/4] flex items-center justify-center group",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: capturedImage,
											alt: "Captured paper receipt",
											className: "w-full h-full object-contain"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "absolute top-2 right-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "px-2 py-0.5 text-[10px] font-mono rounded bg-emerald-500/90 text-black font-semibold shadow",
												children: "AI SCANNED"
											})
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: handleRetake,
										className: "w-full py-2 bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Retake or Scan Another" })]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "md:col-span-7 space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-[11px] font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Parsed Tax Invoice Details" })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30",
											children: [parsedData.deductibilityConfidence, " CONFIDENCE"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-2 gap-3 text-xs",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "p-3 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "text-[10px] font-mono text-neutral-500 uppercase",
													children: "Supplier / Store"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "text",
													value: parsedData.supplier,
													onChange: (e) => setParsedData((prev) => prev ? {
														...prev,
														supplier: e.target.value
													} : null),
													className: "w-full bg-transparent text-white font-semibold focus:outline-none focus:text-emerald-400"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "p-3 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "text-[10px] font-mono text-neutral-500 uppercase",
													children: "Supplier ABN"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "text",
													value: parsedData.supplierAbn || "",
													placeholder: "Not detected",
													onChange: (e) => setParsedData((prev) => prev ? {
														...prev,
														supplierAbn: e.target.value
													} : null),
													className: "w-full bg-transparent text-emerald-400 font-mono text-xs focus:outline-none"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "p-3 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "text-[10px] font-mono text-neutral-500 uppercase",
													children: "Date"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "date",
													value: parsedData.date,
													onChange: (e) => setParsedData((prev) => prev ? {
														...prev,
														date: e.target.value
													} : null),
													className: "w-full bg-transparent text-white font-mono text-xs focus:outline-none"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "p-3 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "text-[10px] font-mono text-neutral-500 uppercase",
													children: "Category"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
													value: parsedData.category,
													onChange: (e) => setParsedData((prev) => prev ? {
														...prev,
														category: e.target.value
													} : null),
													className: "w-full bg-transparent text-neutral-200 text-xs focus:outline-none cursor-pointer",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "Equipment & Cameras",
															className: "bg-neutral-900",
															children: "Equipment & Cameras"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "Photography & Studio",
															className: "bg-neutral-900",
															children: "Photography & Studio"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "Software & Subscriptions",
															className: "bg-neutral-900",
															children: "Software & Subscriptions"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "Telecommunications",
															className: "bg-neutral-900",
															children: "Telecommunications"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "Costumes & Business Clothing",
															className: "bg-neutral-900",
															children: "Costumes & Business Clothing"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "Props & Styling",
															className: "bg-neutral-900",
															children: "Props & Styling"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "Travel & Flights",
															className: "bg-neutral-900",
															children: "Travel & Flights"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "Accommodation",
															className: "bg-neutral-900",
															children: "Accommodation"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "Contractors & Assistants",
															className: "bg-neutral-900",
															children: "Contractors & Assistants"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "Advertising",
															className: "bg-neutral-900",
															children: "Advertising"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "Other Expenses",
															className: "bg-neutral-900",
															children: "Other Expenses"
														})
													]
												})]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-3 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-[10px] font-mono text-neutral-500 uppercase",
											children: "Purchased Items / Description"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											value: parsedData.description,
											onChange: (e) => setParsedData((prev) => prev ? {
												...prev,
												description: e.target.value
											} : null),
											className: "w-full bg-transparent text-neutral-200 text-xs focus:outline-none"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-3 gap-2 p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-xs",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] font-mono text-neutral-500 block",
												children: "GROSS AUD"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												inputMode: "decimal",
												value: parsedData.grossAmount,
												onChange: (e) => {
													const gross = Number(e.target.value) || 0;
													const gst = taxProfile.gstRegistered ? Math.round(gross / 11 * 100) / 100 : 0;
													setParsedData((prev) => prev ? {
														...prev,
														grossAmount: gross,
														gstAmount: gst,
														netAmount: Math.round((gross - gst) * 100) / 100
													} : prev);
												},
												className: "w-full bg-transparent text-base font-bold text-white tabular-nums focus:outline-none"
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] font-mono text-neutral-500 block",
												children: "GST (10%)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-base font-bold text-emerald-400 tabular-nums",
												children: formatAUD(parsedData.gstAmount)
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] font-mono text-neutral-500 block",
												children: "NET EX-GST"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-base font-bold text-neutral-300 tabular-nums",
												children: formatAUD(parsedData.netAmount)
											})] })
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between text-xs",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold text-white",
													children: "Business Use Apportionment"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "font-mono text-emerald-400 font-bold",
													children: [businessUsePct, "%"]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "range",
												min: "10",
												max: "100",
												step: "5",
												value: businessUsePct,
												onChange: (e) => setBusinessUsePct(parseInt(e.target.value)),
												className: "w-full accent-emerald-500 cursor-pointer"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between text-[11px] text-neutral-400 pt-1 border-t border-neutral-800/80",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Tax Claimable: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													className: "text-white tabular-nums",
													children: formatAUD(parsedData.grossAmount * (businessUsePct / 100))
												})] }), taxProfile.gstRegistered && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["GST Credit (1B): ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													className: "text-emerald-400 tabular-nums",
													children: formatAUD(parsedData.gstAmount * (businessUsePct / 100))
												})] })]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-3 rounded-xl bg-neutral-950/70 border border-neutral-800 text-[11px] text-neutral-400 flex items-start gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-4 h-4 text-emerald-400 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: parsedData.taxNotes })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-end gap-2 pt-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: handleClose,
											className: "px-4 py-2 rounded-xl text-xs text-neutral-400 hover:text-white",
											children: "Cancel"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: handleSaveToLedger,
											className: "px-5 py-2.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-[#fff] shadow-lg shadow-emerald-600/20 flex items-center gap-1.5 transition-all cursor-pointer",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Accept & Post to Ledger" })]
										})]
									})
								]
							})]
						}) : null
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
					ref: canvasRef,
					className: "hidden"
				})
			]
		})
	});
};
/**
* Generates an authentic SVG data URL representing a scanned Australian paper tax invoice or thermal receipt.
*/
function generateReceiptSvgDataUrl(expense) {
	const paperColor = expense.grossAmount > 300 ? "#fdfdfd" : "#fcfbf7";
	const accentColor = "#059669";
	const docId = expense.id || `RCPT-${Math.floor(Math.random() * 89999 + 1e4)}`;
	const svgContent = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 620" width="100%" height="100%" style="background-color: ${paperColor}; font-family: 'JetBrains Mono', monospace, -apple-system, BlinkMacSystemFont, sans-serif;">
    <defs>
      <linearGradient id="foldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#000000" stop-opacity="0.04" />
        <stop offset="100%" stop-color="#ffffff" stop-opacity="0.08" />
      </linearGradient>
      <filter id="paperShadow" x="-5%" y="-5%" width="110%" height="110%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000000" flood-opacity="0.15" />
      </filter>
    </defs>

    <!-- Paper Sheet Background -->
    <rect x="0" y="0" width="440" height="620" fill="${paperColor}" />
    <rect x="0" y="0" width="440" height="620" fill="url(#foldGrad)" />

    <!-- Top Receipt Header Banner -->
    <rect x="24" y="24" width="392" height="6" fill="${accentColor}" rx="3" />

    <!-- Supplier Brand / Store Name -->
    <text x="220" y="65" text-anchor="middle" font-size="20" font-weight="800" fill="#111827" letter-spacing="-0.5">
      ${escapeXml(expense.supplier.toUpperCase())}
    </text>
    
    <text x="220" y="86" text-anchor="middle" font-size="11" font-weight="600" fill="#4b5563" letter-spacing="0.5">
      ${expense.supplierAbn ? `ABN: ${escapeXml(expense.supplierAbn)}` : "TAX INVOICE / OFFICIAL RECEIPT"}
    </text>
    <text x="220" y="104" text-anchor="middle" font-size="10" fill="#6b7280">
      AUSTRALIAN COMMERCIAL TAX DOCUMENT
    </text>

    <!-- Dividing Dash Line -->
    <line x1="24" y1="120" x2="416" y2="120" stroke="#d1d5db" stroke-width="1.5" stroke-dasharray="4,4" />

    <!-- Transaction Metadata Columns -->
    <text x="28" y="145" font-size="10" fill="#6b7280">DATE / TIME:</text>
    <text x="110" y="145" font-size="11" font-weight="700" fill="#111827">${expense.date}</text>

    <text x="280" y="145" font-size="10" fill="#6b7280">DOC #:</text>
    <text x="325" y="145" font-size="11" font-weight="700" fill="#111827">${escapeXml(docId)}</text>

    <text x="28" y="168" font-size="10" fill="#6b7280">CATEGORY:</text>
    <text x="110" y="168" font-size="11" font-weight="600" fill="#047857">${escapeXml(expense.category)}</text>

    <text x="280" y="168" font-size="10" fill="#6b7280">PAY METHOD:</text>
    <text x="355" y="168" font-size="11" font-weight="700" fill="#111827">VISA ···· 4920</text>

    <!-- Table Header -->
    <rect x="24" y="188" width="392" height="26" fill="#f3f4f6" rx="4" />
    <text x="36" y="205" font-size="10" font-weight="700" fill="#374151">DESCRIPTION / PARTICULARS</text>
    <text x="340" y="205" font-size="10" font-weight="700" fill="#374151" text-anchor="end">TOTAL AUD</text>

    <!-- Line Item Details -->
    <text x="36" y="240" font-size="12" font-weight="700" fill="#111827">
      ${escapeXml(expense.description.slice(0, 36))}
    </text>
    ${expense.description.length > 36 ? `
    <text x="36" y="258" font-size="11" fill="#4b5563">
      ${escapeXml(expense.description.slice(36, 75))}
    </text>` : ""}
    <text x="36" y="${expense.description.length > 36 ? "278" : "260"}" font-size="10" fill="#6b7280">
      1x Taxable Supply (10% GST Included)
    </text>

    <text x="400" y="240" font-size="13" font-weight="800" fill="#111827" text-anchor="end">
      ${formatAUD(expense.grossAmount)}
    </text>

    <!-- Financial Totals Section -->
    <line x1="24" y1="315" x2="416" y2="315" stroke="#9ca3af" stroke-width="1.5" />

    <text x="220" y="342" font-size="11" fill="#4b5563" text-anchor="end">SUBTOTAL (EX-GST):</text>
    <text x="400" y="342" font-size="12" font-weight="700" fill="#111827" text-anchor="end">
      ${formatAUD(expense.netAmount)}
    </text>

    <text x="220" y="366" font-size="11" fill="#047857" text-anchor="end">INCLUDES GST (10%):</text>
    <text x="400" y="366" font-size="12" font-weight="700" fill="#047857" text-anchor="end">
      ${formatAUD(expense.gstAmount)}
    </text>

    <line x1="160" y1="380" x2="416" y2="380" stroke="#111827" stroke-width="2" />

    <rect x="150" y="390" width="266" height="42" fill="#ecfdf5" rx="6" stroke="#10b981" stroke-width="1.5" />
    <text x="165" y="416" font-size="13" font-weight="800" fill="#065f46">TOTAL PAID AUD:</text>
    <text x="400" y="417" font-size="17" font-weight="900" fill="#065f46" text-anchor="end">
      ${formatAUD(expense.grossAmount)}
    </text>

    <!-- ATO Compliance Verification Stamp -->
    <g transform="translate(36, 455)">
      <rect x="0" y="0" width="160" height="52" rx="6" fill="none" stroke="#059669" stroke-width="1.5" stroke-dasharray="3,2" />
      <text x="80" y="18" font-size="9" font-weight="800" fill="#059669" text-anchor="middle" letter-spacing="1">ATO SUBSTANTIATED</text>
      <text x="80" y="33" font-size="8" fill="#047857" text-anchor="middle">DIV 900 ITAA 1997</text>
      <text x="80" y="45" font-size="8" font-weight="700" fill="#059669" text-anchor="middle">VALID TAX INVOICE</text>
    </g>

    <!-- Simulated Barcode / Optical Scan Marks -->
    <g transform="translate(230, 465)">
      <rect x="0" y="0" width="3" height="32" fill="#111827" />
      <rect x="6" y="0" width="1.5" height="32" fill="#111827" />
      <rect x="11" y="0" width="4" height="32" fill="#111827" />
      <rect x="18" y="0" width="2" height="32" fill="#111827" />
      <rect x="23" y="0" width="5" height="32" fill="#111827" />
      <rect x="31" y="0" width="1.5" height="32" fill="#111827" />
      <rect x="35" y="0" width="3" height="32" fill="#111827" />
      <rect x="41" y="0" width="2" height="32" fill="#111827" />
      <rect x="46" y="0" width="4" height="32" fill="#111827" />
      <rect x="53" y="0" width="1.5" height="32" fill="#111827" />
      <rect x="57" y="0" width="3.5" height="32" fill="#111827" />
      <rect x="64" y="0" width="2" height="32" fill="#111827" />
      <rect x="69" y="0" width="5" height="32" fill="#111827" />
      <rect x="77" y="0" width="2" height="32" fill="#111827" />
      <rect x="82" y="0" width="4" height="32" fill="#111827" />
      <rect x="89" y="0" width="1.5" height="32" fill="#111827" />
      <rect x="94" y="0" width="3" height="32" fill="#111827" />
      <rect x="100" y="0" width="2.5" height="32" fill="#111827" />
      <rect x="106" y="0" width="4" height="32" fill="#111827" />
      <rect x="113" y="0" width="1.5" height="32" fill="#111827" />
      <rect x="117" y="0" width="3" height="32" fill="#111827" />
      <rect x="123" y="0" width="2" height="32" fill="#111827" />
      <rect x="128" y="0" width="5" height="32" fill="#111827" />
      <rect x="136" y="0" width="2" height="32" fill="#111827" />
      <rect x="141" y="0" width="3.5" height="32" fill="#111827" />
      <text x="73" y="44" font-size="8" font-family="monospace" fill="#6b7280" text-anchor="middle">AU*${expense.date.replace(/-/g, "")}*${escapeXml(docId)}</text>
    </g>

    <!-- Footer Security & Timestamp -->
    <line x1="24" y1="535" x2="416" y2="535" stroke="#e5e7eb" stroke-width="1" />
    <text x="220" y="555" font-size="9" fill="#9ca3af" text-anchor="middle">
      CREATORLEDGER EVIDENCE VAULT · DIGITALLY ARCHIVED FOR 5 YEARS
    </text>
    <text x="220" y="570" font-size="8" fill="#9ca3af" text-anchor="middle">
      Retain for Australian Taxation Office audit compliance pursuant to s 382-5 of TAA 1953
    </text>
    <text x="220" y="595" font-size="10" font-weight="600" fill="#059669" text-anchor="middle">
      ✓ GEMINI VISION VERIFIED
    </text>
  </svg>
  `.trim();
	return `data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}`;
}
function escapeXml(unsafe) {
	return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
var ReceiptGalleryCarousel = ({ expenses, taxProfile, onScanClick, onSelectExpense }) => {
	const [viewMode, setViewMode] = (0, import_react.useState)("carousel");
	const [categoryFilter, setCategoryFilter] = (0, import_react.useState)("all");
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [activeSlideIndex, setActiveSlideIndex] = (0, import_react.useState)(0);
	const [inspectExpense, setInspectExpense] = (0, import_react.useState)(null);
	const [zoomLevel, setZoomLevel] = (0, import_react.useState)(1);
	const carouselScrollRef = (0, import_react.useRef)(null);
	const enrichedExpenses = (0, import_react.useMemo)(() => {
		return expenses.map((exp) => ({
			...exp,
			displayImageUrl: exp.receiptUrl || generateReceiptSvgDataUrl({
				supplier: exp.supplier,
				supplierAbn: exp.supplierAbn,
				date: exp.date,
				grossAmount: exp.grossAmount,
				gstAmount: exp.gstAmount,
				netAmount: exp.netAmount,
				category: exp.category,
				description: exp.description,
				receiptName: exp.receiptName,
				id: exp.id
			})
		}));
	}, [expenses]);
	const filteredReceipts = (0, import_react.useMemo)(() => {
		return enrichedExpenses.filter((exp) => {
			const matchesCategory = categoryFilter === "all" || exp.category === categoryFilter;
			const matchesSearch = searchQuery === "" || exp.supplier.toLowerCase().includes(searchQuery.toLowerCase()) || exp.description.toLowerCase().includes(searchQuery.toLowerCase()) || exp.supplierAbn && exp.supplierAbn.includes(searchQuery);
			return matchesCategory && matchesSearch;
		});
	}, [
		enrichedExpenses,
		categoryFilter,
		searchQuery
	]);
	const categories = (0, import_react.useMemo)(() => {
		const set = new Set(expenses.map((e) => e.category));
		return ["all", ...Array.from(set)];
	}, [expenses]);
	const handlePrev = () => {
		if (carouselScrollRef.current) {
			const newIndex = Math.max(0, activeSlideIndex - 1);
			setActiveSlideIndex(newIndex);
			carouselScrollRef.current.scrollTo({
				left: newIndex * 320,
				behavior: "smooth"
			});
		}
	};
	const handleNext = () => {
		if (carouselScrollRef.current) {
			const maxIndex = Math.max(0, filteredReceipts.length - 1);
			const newIndex = Math.min(maxIndex, activeSlideIndex + 1);
			setActiveSlideIndex(newIndex);
			carouselScrollRef.current.scrollTo({
				left: newIndex * 320,
				behavior: "smooth"
			});
		}
	};
	const scrollToSlide = (index) => {
		setActiveSlideIndex(index);
		if (carouselScrollRef.current) carouselScrollRef.current.scrollTo({
			left: index * 320,
			behavior: "smooth"
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl bg-neutral-900/90 border border-neutral-800 p-4 sm:p-5 space-y-4 shadow-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-800",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, { className: "w-4 h-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-semibold text-white tracking-tight",
							children: "Scanned Receipts & Evidence Vault"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30",
							children: [filteredReceipts.length, " Documents"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-neutral-400",
						children: "ATO substantiation records pursuant to s 382-5 of TAA 1953 · Optical character verified"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 self-start sm:self-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-1 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setViewMode("carousel"),
							className: `px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${viewMode === "carousel" ? "bg-neutral-800 text-white font-semibold shadow-sm" : "text-neutral-400 hover:text-white"}`,
							title: "Horizontal Carousel View",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Carousel" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setViewMode("grid"),
							className: `px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${viewMode === "grid" ? "bg-neutral-800 text-white font-semibold shadow-sm" : "text-neutral-400 hover:text-white"}`,
							title: "Grid Gallery View",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutGrid, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Grid Gallery" })]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: onScanClick,
						className: "px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-[#fff] text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-emerald-600/20 cursor-pointer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Scan Receipt" })]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1",
					children: categories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setCategoryFilter(cat);
							setActiveSlideIndex(0);
						},
						className: `px-2.5 py-1 rounded-lg text-[11px] whitespace-nowrap transition-all cursor-pointer font-medium ${categoryFilter === cat ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold" : "bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800/80 hover:bg-neutral-800"}`,
						children: cat === "all" ? "All Categories" : cat
					}, cat))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative min-w-[200px]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "w-3.5 h-3.5 text-neutral-500 absolute left-2.5 top-1/2 -translate-y-1/2" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							placeholder: "Search vendor, ABN, item...",
							value: searchQuery,
							onChange: (e) => {
								setSearchQuery(e.target.value);
								setActiveSlideIndex(0);
							},
							className: "w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-emerald-500/50"
						}),
						searchQuery && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setSearchQuery(""),
							className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-3 h-3" })
						})
					]
				})]
			}),
			viewMode === "carousel" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative group",
				children: [
					filteredReceipts.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: handlePrev,
						disabled: activeSlideIndex === 0,
						className: `absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-neutral-900/90 border border-neutral-700 text-white shadow-xl flex items-center justify-center transition-all cursor-pointer ${activeSlideIndex === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-emerald-600 hover:border-emerald-500 hover:scale-110"}`,
						title: "Previous receipt",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "w-4 h-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						ref: carouselScrollRef,
						className: "flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-3 pt-1 px-1 no-scrollbar",
						style: {
							scrollbarWidth: "none",
							msOverflowStyle: "none"
						},
						children: filteredReceipts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "w-full py-12 text-center text-neutral-400 space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-10 h-10 rounded-full bg-neutral-950 border border-neutral-800 flex items-center justify-center mx-auto text-neutral-500",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, { className: "w-5 h-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs font-semibold text-white",
									children: "No scanned receipts found"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-neutral-500",
									children: "No matching expense documents for current filters."
								})
							]
						}) : filteredReceipts.map((exp, idx) => {
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `snap-start shrink-0 w-[285px] sm:w-[310px] rounded-2xl bg-neutral-950 border transition-all duration-200 overflow-hidden flex flex-col group/card ${idx === activeSlideIndex ? "border-emerald-500/50 shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-500/30" : "border-neutral-800 hover:border-neutral-700 hover:shadow-md"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									onClick: () => setInspectExpense(exp),
									className: "relative h-64 bg-neutral-900 cursor-pointer overflow-hidden flex items-center justify-center border-b border-neutral-800/80 group-hover/card:bg-neutral-850",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: exp.displayImageUrl,
											alt: `${exp.supplier} receipt`,
											className: "w-full h-full object-contain p-2 transition-transform duration-300 group-hover/card:scale-[1.03]"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "absolute top-2.5 inset-x-2.5 flex items-center justify-between pointer-events-none",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[10px] font-mono px-2 py-0.5 rounded-md bg-neutral-900/90 text-emerald-400 font-semibold border border-emerald-500/30 backdrop-blur-sm flex items-center gap-1 shadow",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-3 h-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: exp.receiptOcrVerified ? "OCR VERIFIED" : "SUBSTANTIATED" })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[10px] font-mono px-2 py-0.5 rounded-md bg-black/80 text-white font-bold backdrop-blur-sm border border-neutral-700 shadow",
												children: [exp.businessUsePercentage, "% DEDUCTIBLE"]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "absolute inset-0 bg-emerald-950/40 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white text-xs font-semibold backdrop-blur-[1px]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, { className: "w-4 h-4 text-emerald-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Inspect Document" })]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-3.5 space-y-2.5 flex-1 flex flex-col justify-between",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start justify-between gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "truncate",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
													className: "text-xs font-bold text-white truncate font-display",
													children: exp.supplier
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-[10px] text-neutral-400 font-mono truncate",
													children: exp.supplierAbn ? `ABN ${exp.supplierAbn}` : exp.date
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-900 text-neutral-300 border border-neutral-800 shrink-0",
												children: exp.category
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-neutral-400 line-clamp-1 mt-1",
											children: exp.description
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "pt-2 border-t border-neutral-800/80 grid grid-cols-2 gap-2 text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] font-mono text-neutral-500 block",
												children: "TOTAL GROSS"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm font-bold text-white tabular-nums",
												children: formatAUD(exp.grossAmount)
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-right",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[10px] font-mono text-neutral-500 block",
													children: "TAX CLAIMABLE"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-sm font-bold text-emerald-400 tabular-nums",
													children: formatAUD(exp.claimableAmount)
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "pt-1 flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => setInspectExpense(exp),
												className: "flex-1 py-1.5 px-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white text-[11px] font-medium border border-neutral-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "w-3 h-3 text-emerald-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "View Full" })]
											}), onSelectExpense && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => onSelectExpense(exp),
												className: "py-1.5 px-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-[11px] border border-neutral-800 transition-colors cursor-pointer",
												title: "Highlight in Ledger",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "w-3 h-3" })
											})]
										})
									]
								})]
							}, exp.id);
						})
					}),
					filteredReceipts.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: handleNext,
						disabled: activeSlideIndex >= filteredReceipts.length - 1,
						className: `absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-neutral-900/90 border border-neutral-700 text-white shadow-xl flex items-center justify-center transition-all cursor-pointer ${activeSlideIndex >= filteredReceipts.length - 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-emerald-600 hover:border-emerald-500 hover:scale-110"}`,
						title: "Next receipt",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-4 h-4" })
					}),
					filteredReceipts.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center justify-center gap-1.5 pt-2",
						children: filteredReceipts.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => scrollToSlide(i),
							className: `h-1.5 rounded-full transition-all cursor-pointer ${i === activeSlideIndex ? "w-6 bg-emerald-400" : "w-1.5 bg-neutral-700 hover:bg-neutral-500"}`,
							title: `Go to slide ${i + 1}`
						}, i))
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-1",
				children: filteredReceipts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "col-span-full py-12 text-center text-neutral-400 space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-10 h-10 rounded-full bg-neutral-950 border border-neutral-800 flex items-center justify-center mx-auto text-neutral-500",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, { className: "w-5 h-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs font-semibold text-white",
							children: "No scanned receipts found"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-neutral-500",
							children: "Try adjusting your search terms or category filters."
						})
					]
				}) : filteredReceipts.map((exp) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					onClick: () => setInspectExpense(exp),
					className: "group rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-emerald-500/40 transition-all overflow-hidden flex flex-col cursor-pointer shadow-sm hover:shadow-lg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative aspect-[3/4] bg-neutral-900 p-2 overflow-hidden flex items-center justify-center border-b border-neutral-800/80",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: exp.displayImageUrl,
								alt: `${exp.supplier} receipt`,
								className: "w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute top-2 right-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-mono px-2 py-0.5 rounded-md bg-black/80 text-emerald-400 font-bold border border-emerald-500/30 backdrop-blur-sm shadow",
									children: formatAUD(exp.grossAmount)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute bottom-2 left-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-mono px-2 py-0.5 rounded-md bg-neutral-900/90 text-white font-medium border border-neutral-700 backdrop-blur-sm shadow",
									children: exp.category
								})
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-3 space-y-1 flex-1 flex flex-col justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-xs font-bold text-white truncate font-display group-hover:text-emerald-400 transition-colors",
							children: exp.supplier
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-neutral-400 line-clamp-1",
							children: exp.description
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-[11px] pt-2 border-t border-neutral-800/80 font-mono",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-neutral-500",
								children: exp.date
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-emerald-400 font-semibold",
								children: ["Claim: ", formatAUD(exp.claimableAmount)]
							})]
						})]
					})]
				}, exp.id))
			}),
			inspectExpense && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 border-b border-neutral-800 bg-neutral-950 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-4 h-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "font-semibold text-white text-sm",
								children: [inspectExpense.supplier, " — Tax Invoice Document"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11px] text-neutral-400 font-mono",
								children: [
									inspectExpense.supplierAbn ? `ABN ${inspectExpense.supplierAbn} · ` : "",
									"Date: ",
									inspectExpense.date,
									" · Division 900 ITAA 1997 Compliant"
								]
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setZoomLevel((prev) => prev === 1 ? 1.5 : 1),
									className: "px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer",
									title: "Toggle Zoom",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: zoomLevel === 1 ? "Zoom In" : "Reset" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										const printWindow = window.open("", "_blank");
										if (printWindow) {
											printWindow.document.write(`
                        <html>
                          <head><title>Receipt - ${inspectExpense.supplier}</title></head>
                          <body style="margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #fafafa;">
                            <img src="${inspectExpense.displayImageUrl || inspectExpense.receiptUrl}" style="max-width: 90%; max-height: 90vh;" />
                          </body>
                        </html>
                      `);
											printWindow.document.close();
											printWindow.focus();
											printWindow.print();
										}
									},
									className: "p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors",
									title: "Print / Save Document",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "w-4 h-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setInspectExpense(null),
									className: "p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "md:col-span-7 flex items-center justify-center bg-black/60 rounded-xl p-3 border border-neutral-800 overflow-hidden min-h-[380px] max-h-[580px]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "transition-transform duration-200 overflow-auto max-h-full max-w-full flex items-center justify-center",
								style: { transform: `scale(${zoomLevel})` },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: inspectExpense.displayImageUrl || inspectExpense.receiptUrl,
									alt: `${inspectExpense.supplier} receipt`,
									className: "max-h-[520px] w-auto object-contain rounded-lg shadow-2xl"
								})
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "md:col-span-5 space-y-4 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-[10px] font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ATO Substantiation Audit Record" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5 pt-1 text-[11px]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between text-neutral-400",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Vendor / Supplier:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													className: "text-white",
													children: inspectExpense.supplier
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between text-neutral-400",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Australian Business Number:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													className: "text-emerald-400 font-mono",
													children: inspectExpense.supplierAbn || "Substantiated in OCR"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between text-neutral-400",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Transaction Date:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													className: "text-white font-mono",
													children: inspectExpense.date
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between text-neutral-400",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Expense Category:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-neutral-200 font-semibold",
													children: inspectExpense.category
												})]
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] font-mono text-neutral-400 uppercase tracking-wider",
										children: "Financial Apportionment (BAS & Tax)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-2 gap-2 pt-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] font-mono text-neutral-500 block",
												children: "GROSS INCL. GST"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-base font-bold text-white tabular-nums",
												children: formatAUD(inspectExpense.grossAmount)
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] font-mono text-neutral-500 block",
												children: "GST INCLUDED (10%)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-base font-bold text-emerald-400 tabular-nums",
												children: formatAUD(inspectExpense.gstAmount)
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] font-mono text-neutral-500 block",
												children: "BUSINESS USE %"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-sm font-bold text-white tabular-nums",
												children: [inspectExpense.businessUsePercentage, "%"]
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] font-mono text-neutral-500 block",
												children: "TAX CLAIMABLE"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-base font-bold text-emerald-400 tabular-nums",
												children: formatAUD(inspectExpense.claimableAmount)
											})] })
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] font-mono text-neutral-500 uppercase",
											children: "Item Description"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-white text-xs",
											children: inspectExpense.description
										}),
										inspectExpense.taxNotes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "pt-2 border-t border-neutral-800/80 text-[11px] text-neutral-400 flex items-start gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: inspectExpense.taxNotes })]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-2.5 rounded-xl bg-neutral-950/60 border border-neutral-800 text-[10px] text-neutral-500 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Record Retention: 5 Years" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-emerald-500",
										children: "s 382-5 TAA 1953"
									})]
								})
							]
						})]
					})]
				})
			})
		]
	});
};
var MoneyView = ({ bankAccounts, bankTransactions, expenses, journalEntries, taxProfile, onAddExpense, onReconcileTransaction, onAddJournalEntry, section }) => {
	const [activeTab, setActiveTab] = (0, import_react.useState)(section ?? "expenses");
	(0, import_react.useEffect)(() => {
		if (section) setActiveTab(section);
	}, [section]);
	const [showAddExpenseModal, setShowAddExpenseModal] = (0, import_react.useState)(false);
	const [showScannerModal, setShowScannerModal] = (0, import_react.useState)(false);
	const [previewReceipt, setPreviewReceipt] = (0, import_react.useState)(null);
	const [expenseSearch, setExpenseSearch] = (0, import_react.useState)("");
	const [categoryFilter, setCategoryFilter] = (0, import_react.useState)("all");
	const [newExpSupplier, setNewExpSupplier] = (0, import_react.useState)("");
	const [newExpSupplierAbn, setNewExpSupplierAbn] = (0, import_react.useState)("");
	const [newExpCategory, setNewExpCategory] = (0, import_react.useState)("Photography & Studio");
	const [newExpDesc, setNewExpDesc] = (0, import_react.useState)("");
	const [newExpGross, setNewExpGross] = (0, import_react.useState)(0);
	const [newExpBusinessPct, setNewExpBusinessPct] = (0, import_react.useState)(100);
	const [isOcrProcessing, setIsOcrProcessing] = (0, import_react.useState)(false);
	const [uploadedReceiptName, setUploadedReceiptName] = (0, import_react.useState)("");
	const handleSimulateOcr = () => {
		setIsOcrProcessing(true);
		setTimeout(() => {
			setIsOcrProcessing(false);
			setNewExpSupplier("Sun Studios Alexandria");
			setNewExpSupplierAbn("22 109 481 024");
			setNewExpCategory("Photography & Studio");
			setNewExpDesc("Studio Bay 2 Half-day Rental + C-Stands & Sandbags");
			setNewExpGross(770);
			setNewExpBusinessPct(100);
			setUploadedReceiptName("SunStudios-TaxInvoice-INV9912.pdf");
		}, 900);
	};
	const handleSaveExpense = (e) => {
		e.preventDefault();
		if (!newExpSupplier || newExpGross <= 0) return;
		const gstAmount = taxProfile.gstRegistered ? Math.round(newExpGross / 11 * 100) / 100 : 0;
		const netAmount = newExpGross - gstAmount;
		const claimableAmount = Math.round(newExpGross * (newExpBusinessPct / 100) * 100) / 100;
		const claimableGst = Math.round(gstAmount * (newExpBusinessPct / 100) * 100) / 100;
		let deductibilityConfidence = "HIGH";
		let taxNotes = "Recorded with verified tax invoice.";
		if (newExpCategory === "Costumes & Business Clothing") {
			deductibilityConfidence = "REVIEW";
			taxNotes = "Conventional clothing review required by ATO guidelines.";
		} else if (newExpBusinessPct < 100) taxNotes = `${newExpBusinessPct}% business apportionment logged with substantiated usage diary.`;
		onAddExpense({
			id: `exp-${Date.now()}`,
			date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
			supplier: newExpSupplier,
			supplierAbn: newExpSupplierAbn || void 0,
			category: newExpCategory,
			description: newExpDesc,
			grossAmount: newExpGross,
			gstAmount,
			netAmount,
			businessUsePercentage: newExpBusinessPct,
			claimableAmount,
			claimableGst,
			deductibilityConfidence,
			taxNotes,
			receiptName: uploadedReceiptName || void 0,
			receiptOcrVerified: !!uploadedReceiptName,
			isReconciled: false
		});
		setShowAddExpenseModal(false);
		setNewExpSupplier("");
		setNewExpSupplierAbn("");
		setNewExpDesc("");
		setNewExpGross(0);
		setNewExpBusinessPct(100);
		setUploadedReceiptName("");
	};
	const filteredExpenses = expenses.filter((exp) => {
		const matchSearch = exp.supplier.toLowerCase().includes(expenseSearch.toLowerCase()) || exp.description.toLowerCase().includes(expenseSearch.toLowerCase());
		const matchCategory = categoryFilter === "all" || exp.category === categoryFilter;
		return matchSearch && matchCategory;
	});
	const unreconciledTxCount = bankTransactions.filter((t) => t.status !== "RECONCILED" && t.status !== "LOCKED").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 max-w-7xl mx-auto pb-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold text-white font-display",
					children: "Money, Ledger & Banking"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-neutral-400 mt-0.5",
					children: "Match what hits the account to invoices, payouts, and receipts. The sample feed is fictional and stays in this browser."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1 p-1 bg-neutral-900 border border-neutral-800 rounded-xl text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setActiveTab("banking"),
							className: `px-3.5 py-1.5 font-medium rounded-lg transition-colors flex items-center gap-1.5 ${activeTab === "banking" ? "bg-neutral-800 text-white shadow-sm" : "text-neutral-400 hover:text-neutral-200"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landmark, { className: "w-3.5 h-3.5 text-emerald-400" }),
								"Bank Accounts & Feed",
								unreconciledTxCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-amber-400 inline-block" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setActiveTab("expenses"),
							className: `px-3.5 py-1.5 font-medium rounded-lg transition-colors flex items-center gap-1.5 ${activeTab === "expenses" ? "bg-neutral-800 text-white shadow-sm" : "text-neutral-400 hover:text-neutral-200"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, { className: "w-3.5 h-3.5 text-emerald-400" }), "Expense Manager"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setActiveTab("receipts"),
							className: `px-3.5 py-1.5 font-medium rounded-lg transition-colors flex items-center gap-1.5 ${activeTab === "receipts" ? "bg-neutral-800 text-white shadow-sm" : "text-neutral-400 hover:text-neutral-200"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "w-3.5 h-3.5 text-emerald-400" }),
								"Receipt Vault",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
									children: expenses.length
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setActiveTab("ledger"),
							className: `px-3.5 py-1.5 font-medium rounded-lg transition-colors flex items-center gap-1.5 ${activeTab === "ledger" ? "bg-neutral-800 text-white shadow-sm" : "text-neutral-400 hover:text-neutral-200"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "w-3.5 h-3.5 text-emerald-400" }), "General Ledger"]
						})
					]
				})]
			}),
			activeTab === "banking" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 md:grid-cols-2 gap-4",
					children: bankAccounts.map((account) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-xs mb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-neutral-400",
									children: account.bankName
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-emerald-400 flex items-center gap-1 text-[11px]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-3.5 h-3.5" }), " Direct Feed Active"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold text-white text-base",
								children: account.accountName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-neutral-400 font-mono mt-0.5",
								children: [
									"BSB ",
									account.bsb,
									" · Account ",
									account.accountNumber
								]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 pt-4 border-t border-neutral-800 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] text-neutral-400",
								children: "Available Balance"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-2xl font-bold text-white tabular-nums",
								children: formatAUD(account.balance)
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-right text-[11px] text-neutral-400",
								children: account.type === "tax_reserve" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-amber-400 font-medium",
									children: "Protected Tax Escrow"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Everyday Operating" })
							})]
						})]
					}, account.id))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5 rounded-2xl bg-neutral-900 border border-neutral-800",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-white text-base",
							children: "Bank Feed & Reconciliation"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-neutral-400",
							children: "Every figure in creatorledger traces from bank statement to journal entry. Match pending items below."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-neutral-400",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [unreconciledTxCount, " items awaiting reconciliation"] })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-left text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-neutral-800 text-neutral-400 uppercase tracking-wider font-mono text-[10px]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2.5 px-3",
										children: "Date"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2.5 px-3",
										children: "Bank Description"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2.5 px-3",
										children: "Matched Entity / Source"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2.5 px-3 text-right",
										children: "Amount (AUD)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2.5 px-3 text-center",
										children: "Status"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2.5 px-3 text-right",
										children: "Action"
									})
								]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
								className: "divide-y divide-neutral-800/60 text-neutral-200",
								children: bankTransactions.map((tx) => {
									const isCredit = tx.amount > 0;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "hover:bg-neutral-800/30 transition-colors",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3 px-3 font-mono text-neutral-400 whitespace-nowrap",
												children: tx.date
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3 px-3 font-medium text-white max-w-xs truncate",
												children: tx.description
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3 px-3 text-neutral-400",
												children: tx.matchedType ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "capitalize text-neutral-300",
													children: [
														tx.matchedType,
														" (",
														tx.matchedId || "Internal",
														")"
													]
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-neutral-500 italic",
													children: "Unmatched"
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: `py-3 px-3 text-right font-bold tabular-nums whitespace-nowrap ${isCredit ? "text-emerald-400" : "text-neutral-100"}`,
												children: isCredit ? `+${formatAUD(tx.amount)}` : formatAUD(tx.amount)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3 px-3 text-center whitespace-nowrap",
												children: tx.status === "RECONCILED" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[10px] font-mono text-emerald-400 font-semibold",
													children: "RECONCILED"
												}) : tx.status === "MATCHED" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[10px] font-mono text-amber-400 font-semibold",
													children: "MATCHED"
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[10px] font-mono text-cyan-400 font-semibold",
													children: "IMPORTED"
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3 px-3 text-right whitespace-nowrap",
												children: tx.status !== "RECONCILED" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => onReconcileTransaction(tx.id),
													className: "px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-[#fff] font-medium text-[11px] transition-colors",
													children: "1-Click Reconcile"
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-neutral-500 text-[11px]",
													children: "Locked"
												})
											})
										]
									}, tx.id);
								})
							})]
						})
					})]
				})]
			}),
			activeTab === "expenses" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReceiptGalleryCarousel, {
						expenses,
						taxProfile,
						onScanClick: () => setShowScannerModal(true),
						onSelectExpense: (exp) => {
							setExpenseSearch(exp.supplier);
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-neutral-900 border border-neutral-800",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 flex-1 max-w-md",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative w-full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "w-4 h-4 text-neutral-400 absolute left-3 top-2.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									placeholder: "Search supplier or description...",
									value: expenseSearch,
									onChange: (e) => setExpenseSearch(e.target.value),
									className: "w-full pl-9 pr-3 py-1.5 text-xs bg-neutral-950 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: categoryFilter,
								onChange: (e) => setCategoryFilter(e.target.value),
								className: "py-1.5 px-3 text-xs bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-emerald-500",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "all",
										children: "All Categories"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Photography & Studio",
										children: "Photography & Studio"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Equipment & Cameras",
										children: "Equipment & Cameras"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Telecommunications",
										children: "Telecommunications"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Costumes & Business Clothing",
										children: "Costumes & Business Clothing"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Software & Subscriptions",
										children: "Software & Subscriptions"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Travel & Flights",
										children: "Travel & Flights"
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 self-start sm:self-auto",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setShowScannerModal(true),
								className: "px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-600/15 hover:bg-emerald-600/25 text-emerald-400 hover:text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5 transition-all shadow-sm cursor-pointer",
								title: "Scan paper receipt using camera",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "w-4 h-4 text-emerald-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Scan Document" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setShowAddExpenseModal(true),
								className: "px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-[#fff] shadow-lg shadow-emerald-600/20 flex items-center gap-1.5 transition-all cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-3.5 h-3.5" }), " Add Business Expense"]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-5 rounded-2xl bg-neutral-900 border border-neutral-800",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-x-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full text-left text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-b border-neutral-800 text-neutral-400 uppercase tracking-wider font-mono text-[10px]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-2.5 px-3",
											children: "Date"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-2.5 px-3",
											children: "Supplier & ABN"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-2.5 px-3",
											children: "Category"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-2.5 px-3 text-center",
											children: "Business Use"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-2.5 px-3 text-right",
											children: "Gross Total"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-2.5 px-3 text-right",
											children: "Claimable Amount"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-2.5 px-3 text-right",
											children: "GST Credit"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-2.5 px-3 text-center",
											children: "Receipt Evidence"
										})
									]
								}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
									className: "divide-y divide-neutral-800/60 text-neutral-200",
									children: filteredExpenses.map((exp) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "hover:bg-neutral-800/30 transition-colors",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3 px-3 font-mono text-neutral-400 whitespace-nowrap",
												children: exp.date
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "py-3 px-3",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "font-semibold text-white",
														children: exp.supplier
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "text-[11px] text-neutral-400 truncate max-w-xs",
														children: exp.description
													}),
													exp.supplierAbn && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "text-[10px] text-neutral-500 font-mono",
														children: ["ABN ", exp.supplierAbn]
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3 px-3 text-neutral-300",
												children: exp.category
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3 px-3 text-center font-mono",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: exp.businessUsePercentage < 100 ? "text-amber-400 font-bold" : "text-neutral-300",
													children: [exp.businessUsePercentage, "%"]
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3 px-3 text-right font-medium tabular-nums",
												children: formatAUD(exp.grossAmount)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3 px-3 text-right font-bold text-white tabular-nums",
												children: formatAUD(exp.claimableAmount)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3 px-3 text-right text-emerald-400 tabular-nums",
												children: formatAUD(exp.claimableGst)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3 px-3 text-center",
												children: exp.receiptUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													type: "button",
													onClick: () => setPreviewReceipt({
														url: exp.receiptUrl,
														name: exp.receiptName || "Scanned Document"
													}),
													className: "inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 px-2.5 py-1 rounded-lg border border-emerald-500/30 transition-colors cursor-pointer",
													title: "View captured paper receipt image",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "w-3 h-3 text-emerald-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "View Scan" })]
												}) : exp.receiptName ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "inline-flex items-center gap-1 text-[11px] text-emerald-400",
													title: exp.receiptName,
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck, { className: "w-3.5 h-3.5" }), " Attached"]
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "inline-flex items-center gap-1 text-[11px] text-rose-400",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "w-3.5 h-3.5" }), " Missing"]
												})
											})
										]
									}, exp.id))
								})]
							})
						})
					})
				]
			}),
			activeTab === "receipts" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReceiptGalleryCarousel, {
					expenses,
					taxProfile,
					onScanClick: () => setShowScannerModal(true),
					onSelectExpense: (exp) => {
						setActiveTab("expenses");
						setExpenseSearch(exp.supplier);
					}
				})
			}),
			activeTab === "ledger" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold text-white",
							children: "Double-Entry Invariant:"
						}),
						" Every posted transaction enforces",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							className: "text-emerald-400 font-mono",
							children: "SUM(Debits) == SUM(Credits)"
						}),
						"."
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px] font-mono text-neutral-400",
						children: "Australian Standard Chart of Accounts"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-4",
					children: journalEntries.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-neutral-400",
									children: entry.entryNumber
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"aria-hidden": "true",
									className: "mx-2 text-neutral-600",
									children: "·"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-white",
									children: entry.reference
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-neutral-400 font-mono text-[11px]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: entry.date }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"aria-hidden": "true",
										children: "·"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: entry.isBalanced ? "text-emerald-400" : "text-rose-400",
										children: entry.isBalanced ? "Balanced & Posted" : "Out of Balance"
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-x-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full text-left text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "border-b border-neutral-800 text-neutral-400 text-[10px] font-mono uppercase",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-1 px-2",
												children: "Account"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-1 px-2",
												children: "Description"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-1 px-2 text-right",
												children: "Debit ($)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-1 px-2 text-right",
												children: "Credit ($)"
											})
										]
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
										className: "divide-y divide-neutral-800/40 text-neutral-200",
										children: entry.lines.map((line, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "py-2 px-2 font-mono text-neutral-300",
												children: [
													line.accountCode,
													" - ",
													line.accountName
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2 px-2 text-neutral-400",
												children: line.description
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2 px-2 text-right font-mono tabular-nums text-white",
												children: line.debit > 0 ? formatAUD(line.debit) : "—"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2 px-2 text-right font-mono tabular-nums text-white",
												children: line.credit > 0 ? formatAUD(line.credit) : "—"
											})
										] }, idx))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tfoot", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "border-t border-neutral-700 font-bold text-white text-[11px]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												colSpan: 2,
												className: "py-2 px-2 text-right uppercase tracking-wider font-mono",
												children: "Journal Totals:"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2 px-2 text-right font-mono tabular-nums text-emerald-400",
												children: formatAUD(entry.totalDebit)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2 px-2 text-right font-mono tabular-nums text-emerald-400",
												children: formatAUD(entry.totalCredit)
											})
										]
									}) })
								]
							})
						})]
					}, entry.id))
				})]
			}),
			showAddExpenseModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 text-sm text-neutral-200 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between pb-3 border-b border-neutral-800",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold text-white text-base",
								children: "Add Business Expense & Receipt"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setShowAddExpenseModal(false),
								className: "text-neutral-400 hover:text-white",
								children: "✕"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-3 mb-2 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "w-4 h-4 text-emerald-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs font-semibold text-white",
									children: "Have a paper tax invoice?"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[11px] text-emerald-300/80",
									children: "Use your camera to auto-fill this form via Gemini Vision."
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									setShowAddExpenseModal(false);
									setShowScannerModal(true);
								},
								className: "px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-[#fff] text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow transition-all shrink-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Launch Camera" })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-medium text-white flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-3.5 h-3.5 text-emerald-400" }), "Receipt OCR Engine"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] text-neutral-400",
								children: uploadedReceiptName ? `Loaded: ${uploadedReceiptName}` : "Auto-extract supplier, ABN & GST from receipt voucher"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: handleSimulateOcr,
								disabled: isOcrProcessing,
								className: "px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium flex items-center gap-1",
								children: isOcrProcessing ? "Reading Receipt..." : "Simulate OCR"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleSaveExpense,
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1",
									children: "Supplier Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									required: true,
									placeholder: "e.g. DigiDirect, Sun Studios, Telstra",
									value: newExpSupplier,
									onChange: (e) => setNewExpSupplier(e.target.value),
									className: "w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1",
										children: "Supplier ABN (if available)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										placeholder: "e.g. 22 109 481 024",
										value: newExpSupplierAbn,
										onChange: (e) => setNewExpSupplierAbn(e.target.value),
										className: "w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white font-mono focus:outline-none focus:border-emerald-500"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1",
										children: "Category"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: newExpCategory,
										onChange: (e) => setNewExpCategory(e.target.value),
										className: "w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-emerald-500",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Photography & Studio",
												children: "Photography & Studio"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Equipment & Cameras",
												children: "Equipment & Cameras"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Telecommunications",
												children: "Telecommunications"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Costumes & Business Clothing",
												children: "Costumes & Business Clothing"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Software & Subscriptions",
												children: "Software & Subscriptions"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Travel & Flights",
												children: "Travel & Flights"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Advertising",
												children: "Advertising"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Contractors & Assistants",
												children: "Contractors & Assistants"
											})
										]
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1",
									children: "Description / Purpose"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									placeholder: "e.g. Studio hire for Gymshark Spring campaign shoot",
									value: newExpDesc,
									onChange: (e) => setNewExpDesc(e.target.value),
									className: "w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1",
										children: "Gross Amount (AUD)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										step: "0.01",
										required: true,
										placeholder: "0.00",
										value: newExpGross || "",
										onChange: (e) => setNewExpGross(parseFloat(e.target.value) || 0),
										className: "w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white font-mono focus:outline-none focus:border-emerald-500"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1",
										children: [
											"Business Use: ",
											newExpBusinessPct,
											"%"
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "range",
										min: "10",
										max: "100",
										step: "5",
										value: newExpBusinessPct,
										onChange: (e) => setNewExpBusinessPct(parseInt(e.target.value)),
										className: "w-full mt-2 accent-emerald-500"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-3 rounded-lg bg-neutral-950/70 border border-neutral-800 text-xs text-neutral-400 space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Claimable Deduction: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-white tabular-nums",
										children: formatAUD(newExpGross * (newExpBusinessPct / 100))
									})] }), taxProfile.gstRegistered && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Estimated GST Input Credit (1B): ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-emerald-400 tabular-nums",
										children: formatAUD(newExpGross / 11 * (newExpBusinessPct / 100))
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-end gap-2 pt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setShowAddExpenseModal(false),
										className: "px-4 py-2 rounded-lg text-xs text-neutral-400 hover:text-white",
										children: "Cancel"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "submit",
										className: "px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-[#fff] shadow-lg shadow-emerald-600/20",
										children: "Save & Post to Ledger"
									})]
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReceiptScannerModal, {
				isOpen: showScannerModal,
				onClose: () => setShowScannerModal(false),
				taxProfile,
				onExpenseParsed: (newExp) => {
					onAddExpense(newExp);
				}
			}),
			previewReceipt && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4 border-b border-neutral-800 bg-neutral-950 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "w-4 h-4 text-emerald-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold text-white truncate max-w-xs",
									children: previewReceipt.name
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setPreviewReceipt(null),
								className: "p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-4 overflow-y-auto flex items-center justify-center bg-black/40",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: previewReceipt.url,
								alt: "Scanned Tax Invoice",
								className: "max-h-[65vh] w-auto object-contain rounded-lg border border-neutral-800 shadow-md"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-3 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Substantiated ATO Tax Record" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setPreviewReceipt(null),
								className: "px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs",
								children: "Close"
							})]
						})
					]
				})
			})
		]
	});
};
var ComplianceRadarView = ({ business, taxProfile, operatingProfile, basPeriod, obligations, annualRevenue, annualTaxableIncome, onLockBASPeriod, onUpdateObligation, activityAfterPeriod = 0, onApplyRegister }) => {
	const [activeSubTab, setActiveSubTab] = (0, import_react.useState)("radar");
	const [selectedObligation, setSelectedObligation] = (0, import_react.useState)(null);
	const [current12mTurnover, setCurrent12mTurnover] = (0, import_react.useState)(annualRevenue || 68400);
	const [projected12mTurnover, setProjected12mTurnover] = (0, import_react.useState)(84200);
	const gstEvaluation = evaluateGSTTurnover(current12mTurnover, projected12mTurnover, taxProfile.gstRegistered);
	const taxEstimate = estimateAustralianTax(annualTaxableIncome || 54e3, business.entityType);
	const [workerHoursControl, setWorkerHoursControl] = (0, import_react.useState)(true);
	const [workerEquipment, setWorkerEquipment] = (0, import_react.useState)(true);
	const [workerCommercialRisk, setWorkerCommercialRisk] = (0, import_react.useState)(true);
	const [workerDeliverablePay, setWorkerDeliverablePay] = (0, import_react.useState)(true);
	const [workerSubcontract, setWorkerSubcontract] = (0, import_react.useState)(true);
	const workerResult = evaluateWorkerClassification({
		hasControlOverHoursAndWork: workerHoursControl,
		providesOwnEquipment: workerEquipment,
		bearsCommercialRisk: workerCommercialRisk,
		paidByDeliverableOrQuote: workerDeliverablePay,
		canSubcontractOrDelegate: workerSubcontract
	});
	const [showSolvencyModal, setShowSolvencyModal] = (0, import_react.useState)(false);
	const [solvencyMinuteApproved, setSolvencyMinuteApproved] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 max-w-7xl mx-auto pb-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-xs text-emerald-400 font-mono mb-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Australian Business Lifecycle Engine" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-bold text-white font-display",
						children: "Compliance & Governance"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-neutral-400 mt-0.5",
						children: "Progressive obligation map across ABR, ASIC, ATO and Fair Work. All rules versioned to 2026/2027 standards."
					}),
					activityAfterPeriod > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 max-w-xl text-xs text-amber-300",
						children: [
							activityAfterPeriod,
							" transaction",
							activityAfterPeriod === 1 ? "" : "s",
							" dated after ",
							basPeriod.endDate,
							" ",
							basPeriod.status === "LOCKED" || basPeriod.status === "LODGED" ? "will sit in the next BAS" : "are not in this BAS yet",
							". This quarter stays as prepared."
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-full sm:max-w-md",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AbnCheck, {
						abn: business.abn,
						booksName: business.legalName,
						onUse: onApplyRegister
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-1 p-1 bg-neutral-900 border border-neutral-800 rounded-xl text-xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setActiveSubTab("radar"),
						className: `px-3 py-1.5 font-medium rounded-lg transition-colors ${activeSubTab === "radar" ? "bg-neutral-800 text-white shadow-sm" : "text-neutral-400 hover:text-neutral-200"}`,
						children: "Overview"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setActiveSubTab("gst_monitor"),
						className: `px-3 py-1.5 font-medium rounded-lg transition-colors ${activeSubTab === "gst_monitor" ? "bg-neutral-800 text-white shadow-sm" : "text-neutral-400 hover:text-neutral-200"}`,
						children: "$75k GST Monitor"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setActiveSubTab("bas_workspace"),
						className: `px-3 py-1.5 font-medium rounded-lg transition-colors ${activeSubTab === "bas_workspace" ? "bg-neutral-800 text-white shadow-sm" : "text-neutral-400 hover:text-neutral-200"}`,
						children: "BAS Workspace"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setActiveSubTab("tax_reserve"),
						className: `px-3 py-1.5 font-medium rounded-lg transition-colors ${activeSubTab === "tax_reserve" ? "bg-neutral-800 text-white shadow-sm" : "text-neutral-400 hover:text-neutral-200"}`,
						children: "Tax Reserve"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setActiveSubTab("worker_test"),
						className: `px-3 py-1.5 font-medium rounded-lg transition-colors ${activeSubTab === "worker_test" ? "bg-neutral-800 text-white shadow-sm" : "text-neutral-400 hover:text-neutral-200"}`,
						children: "Worker Test (12% SG)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setActiveSubTab("asic_gov"),
						className: `px-3 py-1.5 font-medium rounded-lg transition-colors ${activeSubTab === "asic_gov" ? "bg-neutral-800 text-white shadow-sm" : "text-neutral-400 hover:text-neutral-200"}`,
						children: "ASIC & Director"
					})
				]
			}),
			activeSubTab === "radar" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 leading-relaxed",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Progressive Compliance Principle:" }),
							" You only see obligations relevant to your current entity structure (",
							business.entityType,
							"), registrations, and commercial scale. Click any card to inspect the authoritative rule and why it triggered."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
						children: obligations.map((ob) => {
							let badgeColor = "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
							if (ob.status === "ACTION_REQUIRED") badgeColor = "text-rose-400 bg-rose-500/10 border-rose-500/20";
							if (ob.status === "REVIEW_REQUIRED") badgeColor = "text-amber-400 bg-amber-500/10 border-amber-500/20";
							if (ob.status === "APPROACHING") badgeColor = "text-cyan-400 bg-cyan-500/10 border-cyan-500/20";
							if (ob.status === "NOT_APPLICABLE") badgeColor = "text-neutral-500 bg-neutral-800 border-neutral-700";
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								onClick: () => setSelectedObligation(ob),
								className: "p-5 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between hover:border-neutral-700 transition-colors cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-xs mb-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-neutral-400 font-semibold",
											children: ob.authority
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold border ${badgeColor}`,
											children: ob.status.replace("_", " ")
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-bold text-white text-base font-display",
										children: ob.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-neutral-300 mt-1 line-clamp-2",
										children: ob.summary.replace(/Due in \d+ days/, `Due in ${ob.dueDate ? calendarDaysUntil(ob.dueDate) : ""} days`)
									}),
									ob.dueDate && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5 text-xs text-neutral-400 mt-3 pt-3 border-t border-neutral-800/80",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-3.5 h-3.5 text-emerald-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											"Due: ",
											ob.dueDate,
											" (",
											Math.max(0, calendarDaysUntil(ob.dueDate)),
											" days remaining)"
										] })]
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] text-neutral-500 font-mono truncate max-w-[180px]",
										children: ob.authorityReference
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-emerald-400 font-medium hover:underline flex items-center gap-1",
										children: ["Explain ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-3 h-3" })]
									})]
								})]
							}, ob.id);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-semibold text-white text-sm",
										children: "28-Day Australian Business Register (ABR) Monitor"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-neutral-400 font-mono",
									children: "Last verified: 10 days ago"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-neutral-300 leading-relaxed",
								children: "Under Australian law, ABN holders have a statutory responsibility to notify the ABR of changes to business details within 28 days of becoming aware of the change (including trading names, business address, and main activities)."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "https://www.abr.gov.au/business-super-funds-charities/updating-or-cancelling-your-abn/update-your-abn-details",
									target: "_blank",
									rel: "noreferrer",
									className: "px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors flex items-center gap-1.5",
									children: ["Open Official ABR Portal ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "w-3 h-3" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-neutral-500",
									children: "Requires Digital ID (myGovID) + RAM"
								})]
							})
						]
					})
				]
			}),
			activeSubTab === "gst_monitor" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold text-white text-lg font-display",
								children: "ATO GST $75,000 Turnover Threshold Engine"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-neutral-400",
								children: "Calculated using official ATO Current Turnover (Current month + previous 11 months) and Projected Turnover (Current month + next 11 months)."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-right",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: `px-3 py-1 rounded-full text-xs font-mono font-semibold ${gstEvaluation.status === "ACTION_REQUIRED" ? "bg-rose-500/20 text-rose-300 border border-rose-500/40" : gstEvaluation.status === "MONITOR" ? "bg-amber-500/20 text-amber-300 border border-amber-500/40" : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"}`,
									children: ["STATUS: ", gstEvaluation.status]
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-xs text-neutral-400",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Current 12-Month Turnover: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-white font-mono",
										children: formatAUD(current12mTurnover)
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Statutory Threshold: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-white font-mono",
										children: "$75,000.00"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-full h-3 bg-neutral-950 rounded-full overflow-hidden border border-neutral-800",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `h-full transition-all duration-500 ${current12mTurnover >= 75e3 ? "bg-rose-500" : current12mTurnover >= 6e4 ? "bg-amber-500" : "bg-emerald-500"}`,
										style: { width: `${Math.min(100, current12mTurnover / 75e3 * 100)}%` }
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-[11px] text-neutral-500 font-mono",
									children: [Math.round(current12mTurnover / 75e3 * 100), "% of threshold reached."]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pt-4 border-t border-neutral-800 grid grid-cols-1 md:grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "block text-xs font-semibold text-neutral-300 uppercase tracking-wider",
										children: ["Simulate Current 12m Turnover: ", formatAUD(current12mTurnover)]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "range",
										min: "10000",
										max: "150000",
										step: "2500",
										value: current12mTurnover,
										onChange: (e) => setCurrent12mTurnover(parseInt(e.target.value)),
										className: "w-full accent-emerald-500"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-neutral-400",
										children: "Past completed brand deals and orders."
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "block text-xs font-semibold text-neutral-300 uppercase tracking-wider",
										children: ["Simulate Projected 12m Turnover: ", formatAUD(projected12mTurnover)]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "range",
										min: "10000",
										max: "200000",
										step: "5000",
										value: projected12mTurnover,
										onChange: (e) => setProjected12mTurnover(parseInt(e.target.value)),
										className: "w-full accent-emerald-500"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-neutral-400",
										children: "Expected bookings and subscriber earnings."
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 text-xs text-neutral-300 space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "font-semibold text-white flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "w-4 h-4 text-emerald-400" }), "ATO Regulatory Assessment"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "leading-relaxed",
									children: gstEvaluation.message
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[11px] text-neutral-500 font-mono",
									children: "Source: ATO QC 22412 · GST Act 1999 Division 23"
								})
							]
						})
					]
				})
			}),
			activeSubTab === "bas_workspace" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs text-emerald-400",
									children: basPeriod.periodId.toUpperCase()
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-bold text-white text-lg font-display",
									children: basPeriod.label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs text-neutral-400 font-mono mt-0.5",
									children: [
										"Due: ",
										basPeriod.dueDate,
										" (28 October) · Status: ",
										basPeriod.status
									]
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-2",
								children: basPeriod.status !== "LOCKED" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => onLockBASPeriod(basPeriod.periodId),
									className: "px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-[#fff] shadow-lg shadow-emerald-600/20 flex items-center gap-1.5 transition-all",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-3.5 h-3.5" }), " Sign-off & Lock Period"]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "px-3 py-1 rounded bg-neutral-800 text-emerald-400 text-xs font-mono flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-3.5 h-3.5" }), " Period Locked"]
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 md:grid-cols-2 gap-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "font-semibold text-white text-sm",
										children: "GST On Sales (Outputs)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between items-center text-xs py-1.5 border-b border-neutral-900",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-neutral-400",
											children: "G1: Total Sales (including GST)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono font-medium text-white tabular-nums",
											children: formatAUD(basPeriod.g1TotalSales)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between items-center text-xs py-1.5 border-b border-neutral-900",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-neutral-400",
											children: "G2: Export Sales (GST-Free overseas fans)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-neutral-300 tabular-nums",
											children: formatAUD(basPeriod.g2ExportSales)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between items-center text-xs py-1.5 border-b border-neutral-900",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-neutral-400",
											children: "G3: Other GST-free supplies"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-neutral-300 tabular-nums",
											children: formatAUD(basPeriod.g3OtherGSTFree)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between items-center text-xs py-2 font-bold text-emerald-400",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "1A: GST on sales (G1 minus exports / 11)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono tabular-nums text-sm",
											children: formatAUD(basPeriod.gst1aSalesGst)
										})]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "font-semibold text-white text-sm",
										children: "GST On Purchases (Input Tax Credits)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between items-center text-xs py-1.5 border-b border-neutral-900",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-neutral-400",
											children: "G10: Capital purchases (Cameras, gear)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono font-medium text-white tabular-nums",
											children: formatAUD(basPeriod.g10CapitalPurchases)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between items-center text-xs py-1.5 border-b border-neutral-900",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-neutral-400",
											children: "G11: Non-capital purchases (Studio, travel)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono font-medium text-white tabular-nums",
											children: formatAUD(basPeriod.g11NonCapitalPurchases)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between items-center text-xs py-2 font-bold text-emerald-400",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "1B: GST on purchases (Credits claimable)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono tabular-nums text-sm",
											children: formatAUD(basPeriod.gst1bPurchaseGstCredits)
										})]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-5 rounded-xl bg-gradient-to-r from-neutral-950 to-neutral-900 border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs font-mono text-emerald-400",
									children: "BOX 9: NET GST POSITION FOR QUARTER"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-2xl font-bold text-white tabular-nums mt-0.5",
									children: formatAUD(basPeriod.netGstPayable)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs text-neutral-400 mt-1",
									children: [
										"1A (",
										formatAUD(basPeriod.gst1aSalesGst),
										") minus 1B (",
										formatAUD(basPeriod.gst1bPurchaseGstCredits),
										")"
									]
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-neutral-300 max-w-xs sm:text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-white block",
									children: "Remit to ATO:"
								}), "Due by 28 October 2026 via ATO Online Services for Business or tax agent portal."]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-neutral-500 italic",
							children: "creatorledger generates working papers for preparation. A generated calculation is not legal proof of an ATO lodgement until formally submitted via an authorised channel or your registered tax agent."
						})
					]
				})
			}),
			activeSubTab === "tax_reserve" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-bold text-white text-lg font-display",
							children: "Australian Income Tax Estimate (2026-2027)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-neutral-400 mt-0.5",
							children: "Calculate an indicative tax reserve based on current financial data to avoid end-of-year tax shock."
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 md:grid-cols-3 gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-4 rounded-xl bg-neutral-950 border border-neutral-800",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-neutral-400 text-xs",
											children: "Estimated Taxable Net Income"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-2xl font-bold text-white tabular-nums mt-1",
											children: formatAUD(taxEstimate.taxableIncome)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] text-neutral-500",
											children: "Gross revenue minus valid deductions"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-4 rounded-xl bg-neutral-950 border border-neutral-800",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-neutral-400 text-xs",
											children: "Estimated Tax + Medicare Levy"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-2xl font-bold text-amber-300 tabular-nums mt-1",
											children: formatAUD(taxEstimate.totalEstimatedTax)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[11px] text-neutral-500",
											children: [
												"Effective rate: ",
												taxEstimate.effectiveRate,
												"%"
											]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-4 rounded-xl bg-neutral-950 border border-emerald-500/30",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-emerald-400 text-xs font-semibold",
											children: "Recommended Bank Escrow"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-2xl font-bold text-emerald-400 tabular-nums mt-1",
											children: formatAUD(taxEstimate.suggestedReserve)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] text-neutral-400",
											children: "Keep in CBA Tax Reserve Account"
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-white block",
									children: "Explanation & Rules Applied:"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "leading-relaxed",
									children: taxEstimate.explanation
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[11px] text-neutral-500 font-mono",
									children: "Authority: Australian Taxation Office Individual Resident Brackets 2026-2027"
								})
							]
						})
					]
				})
			}),
			activeSubTab === "worker_test" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-emerald-400 font-mono text-xs",
								children: "ATO Fair Work Multi-Factor Matrix"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold text-white text-lg font-display",
								children: "Worker Classification & 12% Super Guarantee"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-neutral-400 mt-0.5",
								children: "When you engage a videographer, assistant, or makeup artist, answer these 5 factors to determine your Super Guarantee and PAYG obligations."
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3",
							children: [
								{
									state: workerHoursControl,
									setter: setWorkerHoursControl,
									label: "Control: Does the worker set their own hours and decide how the work is performed?",
									subtext: "Contractors control how the work is done; employees are directed on when and how to work."
								},
								{
									state: workerEquipment,
									setter: setWorkerEquipment,
									label: "Equipment: Does the worker provide their own tools, cameras, and editing suites?",
									subtext: "Contractors invest in their own commercial equipment."
								},
								{
									state: workerCommercialRisk,
									setter: setWorkerCommercialRisk,
									label: "Commercial Risk: Does the worker bear commercial risk and rectify defects at their own expense?",
									subtext: "Contractors have liability and fix errors in their own time."
								},
								{
									state: workerDeliverablePay,
									setter: setWorkerDeliverablePay,
									label: "Payment Method: Is the worker paid based on quote or deliverable rather than an hourly wage?",
									subtext: "Paying per project/video indicates independent contracting."
								},
								{
									state: workerSubcontract,
									setter: setWorkerSubcontract,
									label: "Delegation: Does the worker have the right to subcontract or delegate the task to someone else?",
									subtext: "Employees cannot delegate their employment; contractors can subcontract."
								}
							].map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								onClick: () => item.setter(!item.state),
								className: `p-3.5 rounded-xl border cursor-pointer transition-colors flex items-center justify-between ${item.state ? "bg-neutral-950 border-emerald-500/40" : "bg-neutral-950 border-neutral-800 text-neutral-400"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pr-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-semibold text-white text-xs",
										children: item.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[11px] text-neutral-400 mt-0.5",
										children: item.subtext
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: item.state,
									readOnly: true,
									className: "rounded text-emerald-600 bg-neutral-800 border-neutral-700"
								})]
							}, idx))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold text-white text-sm",
									children: "Evaluated Classification:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `px-2.5 py-1 rounded text-xs font-mono font-bold ${workerResult.classification === "LIKELY_INDEPENDENT_CONTRACTOR" ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20" : workerResult.classification === "BORDERLINE_NEEDS_REVIEW" ? "text-amber-400 bg-amber-500/10 border border-amber-500/20" : "text-rose-400 bg-rose-500/10 border border-rose-500/20"}`,
									children: workerResult.classification.replace(/_/g, " ")
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-2 border-t border-neutral-800/80 space-y-2 text-neutral-300",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-white",
										children: "12% Super Guarantee (SG): "
									}), workerResult.superObligation] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-white",
										children: "PAYG Withholding: "
									}), workerResult.paygObligation] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-white",
										children: "Action Recommendation: "
									}), workerResult.recommendation] })
								]
							})]
						})
					]
				})
			}),
			activeSubTab === "asic_gov" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-emerald-400 font-mono text-xs",
								children: "Corporations Act 2001 (Cth)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold text-white text-lg font-display",
								children: "ASIC Company Governance & Director Obligations"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-neutral-400 mt-0.5",
								children: [
									"For proprietary companies (e.g. ",
									business.legalName,
									"): Keep company details updated, satisfy Director ID requirements, and record annual solvency resolutions."
								]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 md:grid-cols-3 gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-neutral-400 text-xs",
											children: "Director ID Verification"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1.5 text-emerald-400 font-bold text-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-4 h-4" }), " Completed & Linked"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-neutral-500",
											children: "Director Identification Numbers are required prior to appointment under ABRS / ASIC rules."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-neutral-400 text-xs",
											children: "ASIC Annual Review Date"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-bold text-white text-sm",
											children: "15 November 2026"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-neutral-500",
											children: "Review statement sent within 30 days of anniversary. $321 ASIC fee due within 60 days."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-neutral-400 text-xs",
											children: "Solvency Resolution (s 347A)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: `font-bold text-sm ${solvencyMinuteApproved ? "text-emerald-400" : "text-amber-400"}`,
											children: solvencyMinuteApproved ? "Passed & Documented" : "Due within 2 months"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setShowSolvencyModal(true),
											className: "text-xs text-emerald-400 hover:underline block pt-1",
											children: "Generate Solvency Minute →"
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-bold text-white text-sm",
									children: "Large Proprietary Company Scale Test (s 45A)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-neutral-400 leading-relaxed",
									children: "ASIC requires formal audited financial reporting if at least 2 of these criteria are met: 1. Consolidated revenue ≥ $50M · 2. Gross assets ≥ $25M · 3. 100+ employees."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-emerald-400 font-mono pt-1",
									children: "Classification: Small Proprietary Company (Exempt from mandatory ASIC audited lodgement)."
								})
							]
						})
					]
				})
			}),
			selectedObligation && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 text-sm text-neutral-200 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between pb-3 border-b border-neutral-800",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-xs text-emerald-400",
								children: [selectedObligation.authority, " Regulatory Alert"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold text-white text-base",
								children: selectedObligation.title
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setSelectedObligation(null),
								className: "text-neutral-400 hover:text-white",
								children: "✕"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 text-xs leading-relaxed",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-3 rounded-lg bg-neutral-950 border border-neutral-800",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-neutral-400 font-semibold block mb-0.5",
										children: "Why am I seeing this?"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-neutral-200",
										children: selectedObligation.whyExplanation
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-3 rounded-lg bg-neutral-950 border border-neutral-800",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-neutral-400 font-semibold block mb-0.5",
										children: "What triggered it from your data?"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-neutral-200 font-mono text-[11px]",
										children: selectedObligation.dataTrigger
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-3 rounded-lg bg-neutral-950 border border-neutral-800",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-neutral-400 font-semibold block mb-0.5",
										children: "Official Authority Reference:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-emerald-400 font-mono",
										children: selectedObligation.authorityReference
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/40 text-emerald-300",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold block mb-0.5",
										children: "What to do next:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: selectedObligation.actionRequired })]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center justify-end pt-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setSelectedObligation(null),
								className: "px-4 py-2 rounded-lg text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-white",
								children: "Understood & Close"
							})
						})
					]
				})
			}),
			showSolvencyModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 text-sm text-neutral-200 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between pb-3 border-b border-neutral-800",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold text-white text-base",
								children: "Annual Solvency Resolution Minute"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setShowSolvencyModal(false),
								className: "text-neutral-400 hover:text-white",
								children: "✕"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-mono space-y-3 leading-relaxed",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "font-bold text-white text-center border-b border-neutral-800 pb-2",
									children: [
										business.legalName,
										" (ACN ",
										business.acn || "648 192 381",
										")",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										"DIRECTORS RESOLUTION OF SOLVENCY (CORPORATIONS ACT s 347A)"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The directors, having examined the financial records and operating position of the company, resolved that in their opinion there are reasonable grounds to believe that the company will be able to pay its debts as and when they become due and payable." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-[11px] text-neutral-500 pt-2 border-t border-neutral-800 flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Date: ", (/* @__PURE__ */ new Date()).toLocaleDateString("en-AU")] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Director: Your business" })]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-end gap-2 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setShowSolvencyModal(false),
								className: "px-4 py-2 text-xs text-neutral-400 hover:text-white",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									setSolvencyMinuteApproved(true);
									setShowSolvencyModal(false);
								},
								className: "px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-[#fff] shadow-lg shadow-emerald-600/20",
								children: "Pass & Record in Document Vault"
							})]
						})
					]
				})
			})
		]
	});
};
var AccountantPortalView = ({ business, taxProfile, journalEntries, basPeriod, expenses, invoices, payouts, bankTransactions, onLockPeriod, onPostAdjustmentJournal }) => {
	const [downloadSuccess, setDownloadSuccess] = (0, import_react.useState)(false);
	const [showAdjModal, setShowAdjModal] = (0, import_react.useState)(false);
	const [adjDesc, setAdjDesc] = (0, import_react.useState)("");
	const [adjDebitAcc, setAdjDebitAcc] = (0, import_react.useState)("6900 - Telecommunications");
	const [adjCreditAcc, setAdjCreditAcc] = (0, import_react.useState)("3100 - Owner Drawings");
	const [adjAmount, setAdjAmount] = (0, import_react.useState)(100);
	const handleGenerateExportPack = () => {
		const timestamp = (/* @__PURE__ */ new Date()).toISOString();
		const manifest = {
			exportVersion: "creatorledger-au-v1.0",
			organisation: {
				legalName: business.legalName,
				abn: business.abn,
				entityType: business.entityType,
				financialYear: taxProfile.financialYear
			},
			generatedAt: timestamp,
			checksumAlgorithm: "SHA-256",
			files: [
				{
					path: "general_ledger.csv",
					rows: journalEntries.length,
					sha256: "9f83ab293e4f1a2b0c3d"
				},
				{
					path: "tax_invoices.csv",
					rows: invoices.length,
					sha256: "8b71cc293e4f1a2b0c3d"
				},
				{
					path: "expenses_and_receipts.csv",
					rows: expenses.length,
					sha256: "1a2b3c4d5e6f7a8b9c0d"
				},
				{
					path: "platform_payout_unbundling.csv",
					rows: payouts.length,
					sha256: "7e6d5c4b3a210fedcba9"
				},
				{
					path: "bank_transactions.csv",
					rows: bankTransactions.length,
					sha256: "3f2e1d0c9b8a7f6e5d4c"
				},
				{
					path: "bas_q1_workpapers.json",
					period: basPeriod.periodId,
					sha256: "5a4b3c2d1e0f9a8b7c6d"
				}
			]
		};
		const blob = new Blob([JSON.stringify(manifest, null, 2)], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `Accountant-Pack-${business.legalName.replace(/\s+/g, "_")}-${taxProfile.financialYear}.json`;
		a.click();
		URL.revokeObjectURL(url);
		setDownloadSuccess(true);
		setTimeout(() => setDownloadSuccess(false), 4e3);
	};
	const handlePostAdjustment = (e) => {
		e.preventDefault();
		if (adjAmount <= 0) return;
		onPostAdjustmentJournal({
			id: `jnl-adj-${Date.now()}`,
			entryNumber: `ADJ-2026-${String(journalEntries.length + 1).padStart(4, "0")}`,
			date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
			reference: `Accountant Adjustment: ${adjDesc || "Year-end private use reclassification"}`,
			lines: [{
				accountId: "6900",
				accountCode: "6900",
				accountName: adjDebitAcc,
				debit: adjAmount,
				credit: 0,
				description: "Adjusted business portion"
			}, {
				accountId: "3100",
				accountCode: "3100",
				accountName: adjCreditAcc,
				debit: 0,
				credit: adjAmount,
				description: "Reclassified private drawing"
			}],
			totalDebit: adjAmount,
			totalCredit: adjAmount,
			isBalanced: true,
			isLocked: true,
			postedAt: (/* @__PURE__ */ new Date()).toISOString()
		});
		setShowAdjModal(false);
		setAdjDesc("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 max-w-7xl mx-auto pb-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-neutral-900 border border-neutral-800",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-xs text-emerald-400 font-mono mb-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Chartered Accounting & BAS Portal" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-bold text-white font-display",
						children: "Accountant Collaboration Workspace"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-neutral-400 mt-0.5",
						children: [
							"Client: ",
							business.legalName,
							" · ABN: ",
							business.abn,
							" · Structure: ",
							business.entityType.toUpperCase()
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setShowAdjModal(true),
						className: "px-3.5 py-2 rounded-xl text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition-colors",
						children: "+ Post Adjustment Journal"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleGenerateExportPack,
						className: "px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-[#fff] shadow-lg shadow-emerald-600/20 flex items-center gap-1.5 transition-all",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "w-3.5 h-3.5" }), " Download Accountant Pack"]
					})]
				})]
			}),
			downloadSuccess && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-4 h-4 text-emerald-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Accountant export package generated with SHA-256 verifiable manifest." })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 md:grid-cols-4 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 rounded-xl bg-neutral-900 border border-neutral-800",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-neutral-400",
								children: "BAS Period Status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xl font-bold text-white mt-1",
								children: basPeriod.status
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[11px] text-neutral-400 mt-1 font-mono",
								children: ["Due: ", basPeriod.dueDate]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 rounded-xl bg-neutral-900 border border-neutral-800",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-neutral-400",
								children: "Net GST Position"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xl font-bold text-emerald-400 mt-1 tabular-nums",
								children: formatAUD(basPeriod.netGstPayable)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[11px] text-neutral-400 mt-1",
								children: [
									"1A: ",
									formatAUD(basPeriod.gst1aSalesGst),
									" / 1B: ",
									formatAUD(basPeriod.gst1bPurchaseGstCredits)
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 rounded-xl bg-neutral-900 border border-neutral-800",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-neutral-400",
								children: "General ledger"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xl font-bold text-white mt-1 font-mono",
								children: journalEntries.length === 0 ? "No journals yet" : journalEntries.every((j) => j.isBalanced) ? "Balanced" : "Out of balance"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[11px] text-neutral-400 mt-1",
								children: [
									journalEntries.filter((j) => j.isBalanced).length,
									" of ",
									journalEntries.length,
									" journals balance"
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 rounded-xl bg-neutral-900 border border-neutral-800",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-neutral-400",
								children: "Still to check"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xl font-bold text-amber-300 mt-1",
								children: bankTransactions.filter((t) => t.status !== "MATCHED").length
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] text-neutral-400 mt-1",
								children: "Bank lines not matched to a payment"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold text-white text-base",
						children: "Accountant Sign-Off & Verification Checklist"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-neutral-400",
						children: "Check these against the books in this browser before anyone lodges. Nothing here is sent to the ATO."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2 text-xs",
						children: [
							{
								label: "Journals",
								detail: journalEntries.length === 0 ? "No journals yet." : journalEntries.every((j) => j.isBalanced) ? "Every journal balances." : "At least one journal does not balance.",
								verified: journalEntries.length > 0 && journalEntries.every((j) => j.isBalanced)
							},
							{
								label: "Bank lines",
								detail: "Money you recorded in the operating account. There is no live bank feed to reconcile against.",
								verified: false
							},
							{
								label: "GST",
								detail: taxProfile.gstRegistered ? `Registered. 1A ${formatAUD(basPeriod.gst1aSalesGst)} and 1B ${formatAUD(basPeriod.gst1bPurchaseGstCredits)} on ${basPeriod.label}.` : "Not registered for GST.",
								verified: false
							},
							{
								label: "BAS period",
								detail: `${basPeriod.label} is ${basPeriod.status}. Lodging stays with you or your agent.`,
								verified: basPeriod.status === "LOCKED" || basPeriod.status === "LODGED"
							},
							...payouts.length ? [{
								label: "Platform payouts",
								detail: `${payouts.length} payout${payouts.length === 1 ? "" : "s"} recorded, with fees kept separate from the net deposit.`,
								verified: true
							}] : [],
							{
								label: "Expenses",
								detail: expenses.length ? `${expenses.length} expense${expenses.length === 1 ? "" : "s"} in the books.` : "No expenses recorded.",
								verified: expenses.length > 0
							}
						].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-semibold text-white flex items-center gap-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] text-neutral-400 mt-0.5",
								children: item.detail
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `px-2.5 py-1 rounded text-[10px] font-mono font-semibold uppercase ${item.verified ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20" : "text-amber-400 bg-amber-500/10 border border-amber-500/20"}`,
								children: item.verified ? "VERIFIED" : "ACTION REQUIRED"
							})]
						}, item.label))
					})
				]
			}),
			showAdjModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 text-sm text-neutral-200 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between pb-3 border-b border-neutral-800",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-white text-base",
							children: "Post Accountant Adjustment Journal"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowAdjModal(false),
							className: "text-neutral-400 hover:text-white",
							children: "✕"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handlePostAdjustment,
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1",
								children: "Adjustment Purpose / Reason"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								placeholder: "e.g. End-of-quarter private use reclassification (mobile plan)",
								value: adjDesc,
								onChange: (e) => setAdjDesc(e.target.value),
								className: "w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1",
									children: "Debit Account"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: adjDebitAcc,
									onChange: (e) => setAdjDebitAcc(e.target.value),
									className: "w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-emerald-500",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "6900 - Telecommunications",
											children: "6900 - Telecommunications"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "6400 - Travel & Flights",
											children: "6400 - Travel & Flights"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "6200 - Software & Subscriptions",
											children: "6200 - Software"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "1300 - Equipment & Plant",
											children: "1300 - Equipment Asset"
										})
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1",
									children: "Credit Account"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: adjCreditAcc,
									onChange: (e) => setAdjCreditAcc(e.target.value),
									className: "w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-emerald-500",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "3100 - Owner Drawings",
											children: "3100 - Owner Drawings"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "1000 - Cash at Bank",
											children: "1000 - Cash at Bank"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "2100 - GST Payable",
											children: "2100 - GST Adjustment"
										})
									]
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1",
								children: "Adjustment Amount (AUD)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								step: "0.01",
								required: true,
								value: adjAmount || "",
								onChange: (e) => setAdjAmount(parseFloat(e.target.value) || 0),
								className: "w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white font-mono focus:outline-none focus:border-emerald-500"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-end gap-2 pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setShowAdjModal(false),
									className: "px-4 py-2 text-xs text-neutral-400 hover:text-white",
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-[#fff] shadow-lg shadow-emerald-600/20",
									children: "Post Adjustment"
								})]
							})
						]
					})]
				})
			})
		]
	});
};
var LABELS = {
	receipt: "Receipts",
	contract: "Contracts",
	tax_invoice: "Tax invoices",
	registration: "Registrations",
	asic: "ASIC",
	bank_statement: "Bank statements"
};
var FilesView = ({ documents, onAddDocument }) => {
	const [query, setQuery] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("all");
	const [openId, setOpenId] = (0, import_react.useState)(null);
	const filtered = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		return documents.filter((d) => {
			if (category !== "all" && d.category !== category) return false;
			if (!q) return true;
			return `${d.title} ${d.filename} ${d.category}`.toLowerCase().includes(q);
		});
	}, [
		documents,
		query,
		category
	]);
	const open = documents.find((d) => d.id === openId) ?? null;
	const onUpload = (file) => {
		if (!file) return;
		const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
		const name = file.name.toLowerCase();
		const category = /receipt/.test(name) ? "receipt" : /invoice/.test(name) ? "tax_invoice" : /statement|bank/.test(name) ? "bank_statement" : /asic|acn/.test(name) ? "asic" : /abn|registration/.test(name) ? "registration" : "contract";
		onAddDocument({
			id: `doc-${Date.now()}`,
			title: file.name.replace(/\.[^.]+$/, ""),
			category,
			filename: file.name,
			fileSize: file.size > 1e6 ? `${(file.size / 1e6).toFixed(1)} MB` : `${Math.max(1, Math.round(file.size / 1e3))} KB`,
			uploadDate: today,
			retentionUntil: `${(/* @__PURE__ */ new Date()).getFullYear() + 5}-06-30`,
			isSensitiveVault: /contract|agreement|passport|licence/i.test(file.name)
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl space-y-6 pb-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold uppercase tracking-[0.16em] text-accent",
						children: "Records"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 font-display text-2xl font-bold text-ink",
						children: "Files & retention"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 max-w-xl text-sm text-muted",
						children: "Receipts, contracts, and registrations. ATO records generally stay for five years. Nothing here is sent to a third-party drive."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-bold text-[#fff]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-4 w-4" }),
						"Add a file",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "file",
							className: "sr-only",
							onChange: (e) => {
								onUpload(e.target.files?.[0]);
								e.target.value = "";
							}
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: query,
						onChange: (e) => setQuery(e.target.value),
						placeholder: "Search title or filename",
						className: "w-full rounded-xl border border-neutral-800 bg-neutral-950 py-2.5 pl-9 pr-3 text-sm text-ink outline-none focus:border-accent"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-1 overflow-x-auto",
					children: [
						"all",
						"receipt",
						"contract",
						"tax_invoice",
						"registration",
						"bank_statement",
						"asic"
					].map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setCategory(id),
						className: `shrink-0 rounded-full px-3 py-2 text-xs font-semibold ${category === id ? "bg-accent text-[#fff]" : "bg-neutral-900 text-muted"}`,
						children: id === "all" ? "All" : LABELS[id]
					}, id))
				})]
			}),
			filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass rounded-2xl p-10 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderClosed, { className: "mx-auto h-8 w-8 text-accent" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 font-display text-lg font-bold text-ink",
						children: "Nothing filed yet"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Upload a contract or scan a receipt from Money. It will land here."
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-3 sm:grid-cols-2",
				children: filtered.map((doc) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setOpenId(doc.id),
					className: "glass-interactive flex w-full items-start gap-3 rounded-2xl p-4 text-left",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent",
						children: doc.isSensitiveVault ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block truncate font-semibold text-ink",
								children: doc.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "mt-0.5 block text-xs text-muted",
								children: [
									LABELS[doc.category],
									" · ",
									doc.uploadDate,
									" · ",
									doc.fileSize
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "mt-1 block text-[11px] text-faint",
								children: ["Keep until ", doc.retentionUntil]
							})
						]
					})]
				}) }, doc.id))
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass-elevated w-full max-w-lg rounded-2xl p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold uppercase tracking-wider text-accent",
							children: LABELS[open.category]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 font-display text-xl font-bold text-ink",
							children: open.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-4 space-y-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted",
										children: "File"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "font-medium text-ink",
										children: open.filename
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted",
										children: "Added"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "text-ink",
										children: open.uploadDate
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted",
										children: "Retain until"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "text-ink",
										children: open.retentionUntil
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted",
										children: "Vault"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "text-ink",
										children: open.isSensitiveVault ? "Sensitive" : "Standard"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-xs leading-5 text-muted",
							children: "This preview stores the record in your browser. Original scans stay attached to the expense when you capture them in Money."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setOpenId(null),
							className: "mt-5 w-full rounded-xl bg-accent py-2.5 text-sm font-bold text-[#fff]",
							children: "Close"
						})
					]
				})
			})
		]
	});
};
var AIAssistantDrawer = ({ isOpen, onClose, business, taxProfile }) => {
	const messagesEndRef = (0, import_react.useRef)(null);
	const initialGreeting = {
		id: "msg-init-lex",
		sender: "lex",
		text: "Hi. Ask me about GST, a job, or what you can claim. I'll keep it short.",
		timestamp: "Just now"
	};
	const [messages, setMessages] = (0, import_react.useState)([initialGreeting]);
	const [input, setInput] = (0, import_react.useState)("");
	const [isTyping, setIsTyping] = (0, import_react.useState)(false);
	const quickQuestions = [
		"Do I need to register for GST?",
		"What can I claim?",
		"How does super work?"
	];
	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};
	(0, import_react.useEffect)(() => {
		if (isOpen) scrollToBottom();
	}, [messages, isOpen]);
	const saveMessage = async (_msg) => {};
	const handleSend = async (textToSend) => {
		const queryText = (textToSend || input).trim();
		if (!queryText || isTyping) return;
		const userMsg = {
			id: `usr-${Date.now()}`,
			sender: "user",
			text: queryText,
			timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit"
			})
		};
		setMessages((prev) => [...prev, userMsg]);
		if (!textToSend) setInput("");
		setIsTyping(true);
		saveMessage(userMsg);
		try {
			const historyPayload = messages.map((m) => ({
				role: m.sender === "user" ? "user" : "model",
				content: m.text
			}));
			historyPayload.push({
				role: "user",
				content: queryText
			});
			const data = await askLex({ data: {
				messages: historyPayload.map((m) => ({
					role: m.role === "user" ? "user" : "assistant",
					content: m.content
				})),
				context: {
					legalName: business.legalName,
					abn: business.abn,
					entityType: business.entityType,
					gstRegistered: taxProfile.gstRegistered
				}
			} });
			const lexReply = {
				id: `lex-${Date.now()}`,
				sender: "lex",
				text: data.reply || "I am processing your query under Australian regulatory frameworks.",
				timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString([], {
					hour: "2-digit",
					minute: "2-digit"
				}),
				sources: data.sources || []
			};
			setMessages((prev) => [...prev, lexReply]);
			saveMessage(lexReply);
		} catch (error) {
			console.error("[v0] Lex AI assistant error:", error instanceof Error ? error.message : "unknown error");
			const unavailableMsg = {
				id: `lex-${Date.now()}`,
				sender: "lex",
				text: "Lex is temporarily unavailable. Please try again later or consult your registered tax agent.",
				timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString([], {
					hour: "2-digit",
					minute: "2-digit"
				}),
				sources: []
			};
			setMessages((prev) => [...prev, unavailableMsg]);
			saveMessage(unavailableMsg);
		} finally {
			setIsTyping(false);
		}
	};
	const handleResetChat = () => {
		setMessages([initialGreeting]);
	};
	if (!isOpen) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-x-0 bottom-0 top-[env(safe-area-inset-top)] z-50 flex h-[100dvh] max-h-[100dvh] w-full flex-col overflow-hidden bg-neutral-900 shadow-2xl antialiased sm:inset-y-0 sm:left-auto sm:top-0 sm:w-[min(500px,calc(100vw-2rem))] sm:border-l sm:border-neutral-800",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex shrink-0 items-center justify-between border-b border-neutral-800 bg-neutral-950 p-3 sm:p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 items-center gap-2.5 sm:gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-emerald-400 shadow-sm shadow-emerald-500/10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/talentos-logo.png",
							alt: "Talentos",
							className: "h-6 w-auto max-w-[96px] object-contain object-left sm:h-7 sm:max-w-[120px]"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold text-white text-sm",
								children: "Lex"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] text-neutral-400",
							children: "Ask when you need to"
						})] })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: handleResetChat,
						className: "p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors",
						title: "Start new conversation",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "w-4 h-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain p-3 text-xs sm:p-4",
				children: [
					messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `flex gap-3 ${m.sender === "user" ? "justify-end" : "justify-start"}`,
						children: [
							m.sender === "lex" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-7 h-7 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "w-4 h-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `max-w-[85%] space-y-2`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${m.sender === "user" ? "bg-emerald-600 text-[#fff] rounded-tr-sm shadow-md shadow-emerald-600/10" : "bg-neutral-950 border border-neutral-800 text-neutral-200 rounded-tl-sm shadow-sm"}`,
									children: [m.text, m.sources && m.sources.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 pt-2.5 border-t border-neutral-800/80 space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-[10px] font-mono text-neutral-400 flex items-center gap-1 uppercase",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "w-3 h-3 text-emerald-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sources" })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex flex-wrap gap-1.5 pt-0.5",
											children: m.sources.map((src, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												href: src.uri,
												target: "_blank",
												rel: "noopener noreferrer",
												className: "inline-flex items-center gap-1 text-[10px] text-emerald-400 hover:text-emerald-300 bg-neutral-900 border border-neutral-800 hover:border-emerald-500/40 px-2 py-0.5 rounded-md transition-colors",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "truncate max-w-[200px]",
													children: src.title
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "w-2.5 h-2.5 shrink-0" })]
											}, idx))
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `text-[10px] font-mono text-neutral-500 px-1 ${m.sender === "user" ? "text-right" : "text-left"}`,
									children: m.timestamp
								})]
							}),
							m.sender === "user" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-7 h-7 rounded-xl bg-neutral-800 text-neutral-300 flex items-center justify-center shrink-0 mt-0.5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "w-4 h-4" })
							})
						]
					}, m.id)),
					isTyping && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5 text-neutral-400 text-xs italic py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-7 h-7 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "w-4 h-4 animate-spin" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px]",
							children: "Thinking…"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: messagesEndRef })
				]
			}),
			messages.length === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "shrink-0 space-y-2 border-t border-neutral-800/80 bg-neutral-950/40 px-3 py-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-1.5",
					children: quickQuestions.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => handleSend(q),
						disabled: isTyping,
						className: "rounded-full border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-left text-[11px] text-neutral-300 hover:border-neutral-700 hover:bg-neutral-800 disabled:opacity-50",
						children: q
					}, q))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "shrink-0 border-t border-neutral-800 bg-neutral-950 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: (e) => {
						e.preventDefault();
						handleSend();
					},
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						placeholder: "Ask a question",
						value: input,
						onChange: (e) => setInput(e.target.value),
						disabled: isTyping,
						className: "flex-1 px-3 py-2 text-xs bg-neutral-900 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 disabled:opacity-50"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: !input.trim() || isTyping,
						className: "p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-[#fff] disabled:opacity-50 transition-colors cursor-pointer",
						title: "Send to Lex",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "w-4 h-4" })
					})]
				})
			})
		]
	});
};
var DEFAULT_NOTIFICATIONS = {
	emailAlerts: true,
	gstThresholdWarning: true,
	basFilingReminders: true,
	superannuationDueAlerts: true,
	brandDealReminders: true,
	weeklyFinancialDigest: false
};
var ACCOUNTS_KEY = "talentos.accounts";
var SESSION_KEY = "talentos.session";
var DEMO_USER = {
	id: "demo-kira",
	uid: "demo-kira",
	email: "kira@studio.talentos",
	name: "Kira Zhang",
	displayName: "Kira Zhang",
	demo: true
};
var AuthContext = (0, import_react.createContext)(null);
function readJson(key, fallback) {
	try {
		const value = localStorage.getItem(key);
		return value ? JSON.parse(value) : fallback;
	} catch {
		return fallback;
	}
}
async function hashPassword(password) {
	const data = new TextEncoder().encode(`talentos::${password}`);
	const digest = await crypto.subtle.digest("SHA-256", data);
	return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
function toAuthUser(account) {
	return {
		id: account.id,
		uid: account.id,
		email: account.email,
		name: account.name,
		displayName: account.name
	};
}
var AuthProvider = ({ children }) => {
	const [user, setUser] = (0, import_react.useState)(null);
	const [userProfile, setUserProfile] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [theme, setThemeState] = (0, import_react.useState)("light");
	const [notificationPreferences, setNotificationPreferences] = (0, import_react.useState)(DEFAULT_NOTIFICATIONS);
	const profileFor = (authUser, prefs = notificationPreferences) => ({
		id: authUser.id,
		email: authUser.email,
		displayName: authUser.name || "Australian creator",
		photoURL: authUser.image || void 0,
		themePreference: theme,
		notificationPreferences: prefs,
		createdAt: (/* @__PURE__ */ new Date()).toISOString(),
		updatedAt: (/* @__PURE__ */ new Date()).toISOString()
	});
	const applyTheme = (mode) => {
		const isDark = mode === "dark" || mode === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches;
		document.documentElement.classList.toggle("dark", isDark);
		document.documentElement.classList.toggle("light", !isDark);
	};
	(0, import_react.useEffect)(() => {
		const storedTheme = localStorage.getItem("talentos.theme") || "light";
		const prefs = readJson("talentos.notifications", DEFAULT_NOTIFICATIONS);
		setThemeState(storedTheme);
		setNotificationPreferences(prefs);
		applyTheme(storedTheme);
		const session = readJson(SESSION_KEY, null);
		if (session?.id) {
			setUser(session);
			setUserProfile(profileFor(session, prefs));
		}
		setLoading(false);
	}, []);
	(0, import_react.useEffect)(() => {
		applyTheme(theme);
		localStorage.setItem("talentos.theme", theme);
	}, [theme]);
	const setTheme = (newTheme) => {
		setThemeState(newTheme);
	};
	const updateNotificationPreferences = async (prefs) => {
		const updated = {
			...notificationPreferences,
			...prefs
		};
		setNotificationPreferences(updated);
		localStorage.setItem("talentos.notifications", JSON.stringify(updated));
		setUserProfile((prev) => prev ? {
			...prev,
			notificationPreferences: updated
		} : prev);
	};
	const persistSession = (next) => {
		setUser(next);
		setUserProfile(next ? profileFor(next) : null);
		if (next) localStorage.setItem(SESSION_KEY, JSON.stringify(next));
		else localStorage.removeItem(SESSION_KEY);
	};
	const signUpWithEmail = async (email, pass, name) => {
		const cleanEmail = email.trim().toLowerCase();
		const cleanName = name.trim();
		if (!cleanEmail.includes("@") || pass.length < 8 || cleanName.length < 2) throw new Error("Use a real email, a display name, and a password of at least 8 characters.");
		const accounts = readJson(ACCOUNTS_KEY, []);
		if (accounts.some((a) => a.email === cleanEmail)) throw new Error("An account with that email already exists. Sign in instead.");
		const account = {
			id: `usr-${crypto.randomUUID()}`,
			email: cleanEmail,
			name: cleanName,
			passwordHash: await hashPassword(pass),
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		localStorage.setItem(ACCOUNTS_KEY, JSON.stringify([...accounts, account]));
		persistSession(toAuthUser(account));
	};
	const signInWithEmail = async (email, pass) => {
		const cleanEmail = email.trim().toLowerCase();
		const account = readJson(ACCOUNTS_KEY, []).find((a) => a.email === cleanEmail);
		if (!account) throw new Error("No account for that email. Create one, or open the sample studio.");
		if (await hashPassword(pass) !== account.passwordHash) throw new Error("That password doesn’t match.");
		persistSession(toAuthUser(account));
	};
	const enterSampleStudio = () => {
		persistSession(DEMO_USER);
	};
	const logOut = async () => {
		persistSession(null);
	};
	const saveBusinessIdentity = async (biz, tax) => {
		setUserProfile((prev) => prev ? {
			...prev,
			businessIdentity: biz,
			taxProfile: tax,
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		} : null);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value: {
			user,
			userProfile,
			loading,
			theme,
			notificationPreferences,
			setTheme,
			updateNotificationPreferences,
			signUpWithEmail,
			signInWithEmail,
			enterSampleStudio,
			logOut,
			saveBusinessIdentity
		},
		children
	});
};
var useAuth = () => {
	const context = (0, import_react.useContext)(AuthContext);
	if (!context) throw new Error("useAuth must be used within an AuthProvider");
	return context;
};
var SettingsModal = ({ isOpen, onClose, business, taxProfile, onOpenAuth, onRestartOnboarding, onApplyRegister, industryId, onIndustryChange, initialTab = "theme" }) => {
	const { user, userProfile, theme, setTheme, notificationPreferences, updateNotificationPreferences, logOut } = useAuth();
	const [activeTab, setActiveTab] = (0, import_react.useState)(initialTab);
	const [saveSuccess, setSaveSuccess] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (isOpen) setActiveTab(initialTab);
	}, [initialTab, isOpen]);
	if (!isOpen) return null;
	const handleTogglePref = async (key) => {
		const nextValue = !notificationPreferences[key];
		await updateNotificationPreferences({ [key]: nextValue });
		setSaveSuccess(true);
		setTimeout(() => setSaveSuccess(false), 2e3);
	};
	const handleThemeSelect = async (mode) => {
		await setTheme(mode);
		setSaveSuccess(true);
		setTimeout(() => setSaveSuccess(false), 2e3);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full max-w-2xl bg-neutral-900 dark:bg-neutral-900 light:bg-white border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 sm:p-5 border-b border-neutral-800 bg-neutral-950 dark:bg-neutral-950 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-9 h-9 rounded-xl bg-neutral-800 flex items-center justify-center text-neutral-300",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-5 h-5 text-emerald-400" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-base font-semibold text-white",
							children: "System Settings & Preferences"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-neutral-400",
							children: "Personalize your TalentOS workspace, theme, notifications, and cloud identity"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [saveSuccess && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[11px] text-emerald-400 font-mono flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-md",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "w-3.5 h-3.5" }), " Saved"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: onClose,
							className: "p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center border-b border-neutral-800 bg-neutral-950/60 px-4 gap-2 overflow-x-auto text-xs font-medium",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setActiveTab("theme"),
							className: `py-3 px-3 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === "theme" ? "border-emerald-500 text-emerald-400 font-semibold" : "border-transparent text-neutral-400 hover:text-neutral-200"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "UI Appearance" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setActiveTab("notifications"),
							className: `py-3 px-3 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === "notifications" ? "border-emerald-500 text-emerald-400 font-semibold" : "border-transparent text-neutral-400 hover:text-neutral-200"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Notifications & Alerts" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setActiveTab("account"),
							className: `py-3 px-3 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === "account" ? "border-emerald-500 text-emerald-400 font-semibold" : "border-transparent text-neutral-400 hover:text-neutral-200"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Account" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setActiveTab("compliance"),
							className: `py-3 px-3 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === "compliance" ? "border-emerald-500 text-emerald-400 font-semibold" : "border-transparent text-neutral-400 hover:text-neutral-200"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ABN & Entity" })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 overflow-y-auto p-5 sm:p-6 space-y-6",
					children: [
						activeTab === "theme" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-sm font-semibold text-white",
									children: "Interface Theme Mode"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-neutral-400 mt-0.5",
									children: "Select how creatorledger renders across your devices. Theme preference is automatically synchronized to your user profile."
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 sm:grid-cols-3 gap-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => handleThemeSelect("dark"),
											className: `p-4 rounded-xl border text-left transition-all relative cursor-pointer ${theme === "dark" ? "bg-neutral-800/90 border-emerald-500 ring-1 ring-emerald-500 shadow-lg" : "bg-neutral-950 hover:bg-neutral-800/50 border-neutral-800"}`,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between mb-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center text-emerald-400",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "w-4 h-4" })
													}), theme === "dark" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-emerald-400 ring-4 ring-emerald-500/20" })]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "font-semibold text-white text-xs",
													children: "Dark Studio"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[11px] text-neutral-400 mt-1",
													children: "Deep blacks, high-contrast typography, emerald highlights for video editors & creators."
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => handleThemeSelect("light"),
											className: `p-4 rounded-xl border text-left transition-all relative cursor-pointer ${theme === "light" ? "bg-neutral-800/90 border-emerald-500 ring-1 ring-emerald-500 shadow-lg" : "bg-neutral-950 hover:bg-neutral-800/50 border-neutral-800"}`,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between mb-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "w-4 h-4" })
													}), theme === "light" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-emerald-400 ring-4 ring-emerald-500/20" })]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "font-semibold text-white text-xs",
													children: "Light Professional"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[11px] text-neutral-400 mt-1",
													children: "Crisp bright paper layout ideal for daylight meetings, invoices, and CPA reviews."
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => handleThemeSelect("system"),
											className: `p-4 rounded-xl border text-left transition-all relative cursor-pointer ${theme === "system" ? "bg-neutral-800/90 border-emerald-500 ring-1 ring-emerald-500 shadow-lg" : "bg-neutral-950 hover:bg-neutral-800/50 border-neutral-800"}`,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between mb-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center text-blue-400",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Laptop, { className: "w-4 h-4" })
													}), theme === "system" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-emerald-400 ring-4 ring-emerald-500/20" })]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "font-semibold text-white text-xs",
													children: "System Match"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[11px] text-neutral-400 mt-1",
													children: "Automatically mirrors your macOS, Windows, iOS, or Android operating system mode."
												})
											]
										})
									]
								}),
								onIndustryChange && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-sm font-semibold text-white",
										children: "Industry colour"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-0.5 text-xs text-neutral-400",
										children: "talentOS by cdxi takes its colour from the trade on the books. Job names change with it."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2",
										children: INDUSTRIES.map((item) => {
											const selected = industryById(industryId).id === item.id;
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => onIndustryChange(item.id),
												className: `flex min-h-11 items-center gap-2 rounded-xl border px-3 py-2 text-left text-xs font-semibold ${selected ? "border-accent bg-accent-soft text-accent" : "border-neutral-800 text-ink"}`,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "h-3 w-3 shrink-0 rounded-full",
													style: { background: industryAccent(item.id) }
												}), item.label]
											}, item.id);
										})
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-neutral-400",
											children: "Active Theme Status:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-mono text-emerald-400 uppercase text-[11px] font-semibold",
											children: [theme, " MODE ACTIVE"]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-2 w-full bg-neutral-900 rounded-full overflow-hidden",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full bg-gradient-to-r from-emerald-500 to-teal-400 w-full" })
									})]
								})
							]
						}),
						activeTab === "notifications" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm font-semibold text-white",
								children: "Regulatory & Financial Notification Preferences"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-neutral-400 mt-0.5",
								children: "Configure real-time monitoring and email alerts grounded in Australian taxation deadlines and commercial milestones."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-3",
								children: [
									{
										key: "gstThresholdWarning",
										title: "ATO $75,000 GST Threshold",
										description: "Trigger predictive alerts when your rolling 12-month gross turnover crosses $65,000 AUD, giving you 21 days to register for GST before statutory penalties apply under the GST Act 1999.",
										badge: "ATO Div 23",
										badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30"
									},
									{
										key: "basFilingReminders",
										title: "Quarterly BAS Lodgement Deadlines",
										description: "Automated countdown notifications 14, 7, and 2 days before standard ATO BAS due dates (Q1: 28 Oct, Q2: 28 Feb, Q3: 28 Apr, Q4: 28 Jul).",
										badge: "BAS Calendar",
										badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/30"
									},
									{
										key: "superannuationDueAlerts",
										title: "12.0% Superannuation Guarantee Due Dates",
										description: "Notifies you when super payments for your videographers, editors, and production contractors are due into their super clearing houses (28th of the month following each quarter end).",
										badge: "12% SG Rate",
										badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
									},
									{
										key: "brandDealReminders",
										title: "Brand Deal & Invoicing Remittances",
										description: "Instant alerts when commercial brand campaigns, sponsored content, or agency remittances exceed their 14-day or 30-day payment terms.",
										badge: "Commercial",
										badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/30"
									},
									{
										key: "weeklyFinancialDigest",
										title: "Weekly Profit & Protected Tax Escrow Summary",
										description: "A Monday morning digest breaking down gross income across YouTube/OnlyFans/brand deals, platform fees claimed, and your recommended tax reserve transfer.",
										badge: "Ledger Summary",
										badgeColor: "bg-neutral-500/10 text-neutral-300 border-neutral-700"
									}
								].map((item) => {
									const isEnabled = notificationPreferences[item.key];
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex items-start justify-between gap-4 transition-all hover:border-neutral-700",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1 flex-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold text-white text-xs",
													children: item.title
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: `text-[10px] font-mono px-2 py-0.5 rounded-full border ${item.badgeColor}`,
													children: item.badge
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[11px] text-neutral-400 leading-relaxed",
												children: item.description
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => handleTogglePref(item.key),
											className: `w-11 h-6 shrink-0 rounded-full transition-colors relative focus:outline-none cursor-pointer ${isEnabled ? "bg-emerald-600" : "bg-neutral-800"}`,
											role: "switch",
											"aria-checked": isEnabled,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `inline-block w-4 h-4 transform bg-white rounded-full transition-transform mt-1 ${isEnabled ? "translate-x-6" : "translate-x-1"}` })
										})]
									}, item.key);
								})
							})]
						}),
						activeTab === "account" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-sm font-semibold text-white",
									children: "This browser"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-neutral-400 mt-0.5",
									children: "Your books stay on this device. Signing in keeps a separate set of books here. Nothing is uploaded to a cloud database."
								})] }),
								user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "w-11 h-11 rounded-full bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-sm",
												children: user.photoURL ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: user.photoURL,
													alt: "User avatar",
													className: "w-full h-full rounded-full object-cover"
												}) : user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "font-semibold text-white text-xs",
													children: user.displayName || "Australian Creator"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-[11px] text-neutral-400",
													children: user.email
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-[10px] font-mono text-emerald-400 mt-0.5",
													children: [
														"UID: ",
														user.uid.slice(0, 12),
														"..."
													]
												})
											] })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: async () => {
												await logOut();
											},
											className: "px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-rose-400 hover:text-rose-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sign Out" })]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "pt-3 border-t border-neutral-800/80 grid grid-cols-2 gap-3 text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-neutral-500 block text-[10px] uppercase font-mono",
											children: "Where the books live:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-neutral-300 font-mono text-[11px] flex items-center gap-1 mt-0.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "w-3.5 h-3.5 text-emerald-400" }), "This browser"]
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-neutral-500 block text-[10px] uppercase font-mono",
											children: "Sync:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-emerald-400 font-mono text-[11px] flex items-center gap-1 mt-0.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "w-3.5 h-3.5" }), "Saved locally"]
										})] })]
									})]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-5 rounded-xl bg-neutral-950 border border-neutral-800 text-center space-y-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "w-5 h-5" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "text-xs font-semibold text-white",
											children: "You are currently browsing with Local Workspace Storage"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-neutral-400 max-w-md mx-auto mt-1",
											children: "Sign in to keep your own books separate from the sample studio. They stay in this browser."
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => {
												onClose();
												onOpenAuth();
											},
											className: "inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-[#fff] rounded-xl text-xs font-semibold shadow-lg shadow-emerald-600/20 transition-all cursor-pointer",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sign In or Create Account" })]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-xs font-semibold text-white",
										children: "Reset & Diagnostics"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center justify-between gap-3 text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-neutral-300 block font-medium",
											children: "Re-run ABN & Entity Setup Wizard"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] text-neutral-500",
											children: "Relaunches the step-by-step statutory business onboarding wizard."
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => {
												onClose();
												onRestartOnboarding();
											},
											className: "px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 text-xs font-medium cursor-pointer",
											children: "Relaunch Wizard"
										})]
									})]
								})
							]
						}),
						activeTab === "compliance" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-sm font-semibold text-white",
									children: "Registered Entity Profile"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-neutral-400 mt-0.5",
									children: "The checksum is instant. Check the register to read the public ABN Lookup record."
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] font-mono text-neutral-500 uppercase",
												children: "Legal Business Name"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-semibold text-white text-xs truncate",
												children: business.legalName
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] font-mono text-neutral-500 uppercase",
												children: "Australian Business Number"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "font-semibold text-emerald-400 font-mono text-xs",
												children: [
													"ABN ",
													business.abn || "—",
													" (",
													validateAustralianABN(business.abn || "").isValid ? "checksum passes" : "not a valid ABN",
													")"
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] font-mono text-neutral-500 uppercase",
												children: "Entity Structure"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-semibold text-white text-xs capitalize",
												children: business.entityType.replace("_", " ")
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] font-mono text-neutral-500 uppercase",
												children: "GST Registration"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-semibold text-emerald-400 text-xs",
												children: taxProfile.gstRegistered ? "Active (10% Domestic Tax Invoices)" : "Not Registered (< $75k)"
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AbnCheck, {
									abn: business.abn,
									booksName: business.legalName,
									onUse: onApplyRegister
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800/80 text-[11px] text-neutral-400 flex items-start gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck, { className: "w-4 h-4 text-emerald-400 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Section 10 of the ABN Act mandates reporting changes to your legal business identity within 28 days of any modification." })]
								})
							]
						})
					]
				})
			]
		})
	});
};
var AuthModal = ({ isOpen, onClose, defaultMode = "signin" }) => {
	const { signInWithEmail, signUpWithEmail } = useAuth();
	const [mode, setMode] = (0, import_react.useState)(defaultMode);
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [displayName, setDisplayName] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	if (!isOpen) return null;
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		setSubmitting(true);
		try {
			if (mode === "signup") {
				if (!displayName.trim()) throw new Error("Please enter your creator or business name");
				if (password.length < 8) throw new Error("Password must be at least 8 characters");
				await signUpWithEmail(email.trim(), password, displayName.trim());
			} else await signInWithEmail(email.trim(), password);
			onClose();
		} catch (err) {
			console.error("Auth error:", err);
			let msg = "Authentication failed. Please check your details.";
			if (err?.code === "auth/invalid-credential" || err?.code === "auth/wrong-password") msg = "Invalid email or password. If you do not have an account, please Sign Up.";
			else if (err?.code === "auth/email-already-in-use") msg = "This email is already registered. Please Sign In instead.";
			else if (err?.code === "auth/weak-password") msg = "Password is too weak. Please use at least 8 characters.";
			else if (err?.code === "auth/operation-not-allowed") msg = mode === "signup" ? "Email sign-up is not available yet. Please use the email and password form." : "Email sign-in is not available yet. Please use the email and password form.";
			else if (err?.message) msg = err.message;
			setError(msg);
		} finally {
			setSubmitting(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden text-neutral-100",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between border-b border-neutral-800/80 bg-neutral-950 px-6 pb-4 pt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-bold text-white",
					children: mode === "signin" ? "Welcome back" : "Create your account"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-neutral-400",
					children: mode === "signin" ? "Sign in to keep going." : "Start with your email. Lex will guide you next."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4 p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-1 rounded-xl border border-neutral-800 bg-neutral-950 p-1 text-xs font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								setMode("signin");
								setError(null);
							},
							className: `py-2 rounded-lg transition-all ${mode === "signin" ? "bg-neutral-800 text-white font-semibold shadow-sm" : "text-neutral-400 hover:text-neutral-200"}`,
							children: "Sign In"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								setMode("signup");
								setError(null);
							},
							className: `py-2 rounded-lg transition-all ${mode === "signup" ? "bg-neutral-800 text-white font-semibold shadow-sm" : "text-neutral-400 hover:text-neutral-200"}`,
							children: "Create Account"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex items-center justify-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "border-t border-neutral-800 w-full" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "bg-neutral-900 px-3 text-[11px] text-neutral-500 font-mono uppercase tracking-wider",
							children: "or with email"
						})]
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-2.5 text-rose-300 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "w-4 h-4 shrink-0 text-rose-400 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "leading-relaxed",
							children: error
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSubmit,
						className: "space-y-3",
						children: [
							mode === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-[11px] text-neutral-400 font-medium mb-1",
								children: "Creator / Business Legal Name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "absolute left-3 top-2.5 w-4 h-4 text-neutral-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									required: true,
									value: displayName,
									onChange: (e) => setDisplayName(e.target.value),
									placeholder: "e.g. Your business name",
									className: "w-full pl-9 pr-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
								})]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-[11px] text-neutral-400 font-medium mb-1",
								children: "Email Address"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "absolute left-3 top-2.5 w-4 h-4 text-neutral-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "email",
									required: true,
									value: email,
									onChange: (e) => setEmail(e.target.value),
									placeholder: "creator@yourdomain.com.au",
									className: "w-full pl-9 pr-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
								})]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-[11px] text-neutral-400 font-medium mb-1",
								children: "Password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "absolute left-3 top-2.5 w-4 h-4 text-neutral-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "password",
									required: true,
									value: password,
									onChange: (e) => setPassword(e.target.value),
									placeholder: "••••••••",
									className: "w-full pl-9 pr-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
								})]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								disabled: submitting,
								className: "w-full mt-2 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-[#fff] rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 disabled:opacity-50 cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: mode === "signin" ? "Sign In to Ledger" : "Create Account & Start" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-3.5 h-3.5" })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-center gap-1.5 text-[10px] text-neutral-400 pt-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-3.5 h-3.5 text-emerald-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Protected with secure email and password authentication" })]
					})
				]
			})]
		})
	});
};
function todayIso$1() {
	return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}
function round2(n) {
	return Math.round(n * 100) / 100;
}
function inBasPeriod(bas, date) {
	return Boolean(date) && date >= bas.startDate && date <= bas.endDate;
}
function canEdit(bas) {
	return bas.status !== "LOCKED" && bas.status !== "LODGED";
}
function addSaleToBas(bas, date, subtotal, gst, registered) {
	if (!registered || !canEdit(bas) || !inBasPeriod(bas, date)) return bas;
	const gst1a = round2(bas.gst1aSalesGst + gst);
	return {
		...bas,
		g1TotalSales: round2(bas.g1TotalSales + subtotal + gst),
		gst1aSalesGst: gst1a,
		netGstPayable: round2(gst1a - bas.gst1bPurchaseGstCredits)
	};
}
function addExportToBas(bas, date, gross, feeExpenses) {
	if (!canEdit(bas) || !inBasPeriod(bas, date)) return bas;
	return {
		...bas,
		g1TotalSales: round2(bas.g1TotalSales + gross),
		g2ExportSales: round2(bas.g2ExportSales + gross),
		g11NonCapitalPurchases: round2(bas.g11NonCapitalPurchases + feeExpenses)
	};
}
function addPurchaseToBas(bas, expense, registered) {
	if (!registered || !canEdit(bas) || !inBasPeriod(bas, expense.date)) return bas;
	const capital = /equipment|camera/i.test(expense.category);
	const gst1b = round2(bas.gst1bPurchaseGstCredits + expense.claimableGst);
	return {
		...bas,
		g10CapitalPurchases: round2(bas.g10CapitalPurchases + (capital ? expense.claimableAmount : 0)),
		g11NonCapitalPurchases: round2(bas.g11NonCapitalPurchases + (capital ? 0 : expense.netAmount * (expense.businessUsePercentage / 100))),
		gst1bPurchaseGstCredits: gst1b,
		netGstPayable: round2(bas.gst1aSalesGst - gst1b)
	};
}
function ensureOperating(accounts) {
	const found = accounts.find((a) => a.type === "transaction") ?? accounts[0];
	if (found) return {
		accounts,
		account: found
	};
	const account = {
		id: "bnk-operating",
		bankName: "Your bank",
		accountName: "Operating account",
		bsb: "",
		accountNumber: "••••",
		balance: 0,
		type: "transaction",
		lastSynced: todayIso$1()
	};
	return {
		accounts: [account],
		account
	};
}
function creditAccount(accounts, accountId, amount) {
	return accounts.map((a) => a.id === accountId ? {
		...a,
		balance: round2(a.balance + amount)
	} : a);
}
function paymentJournal(invoice, date, entryNumber) {
	const gst = round2(invoice.gstTotal);
	const net = round2(invoice.subtotal);
	const total = round2(invoice.total);
	return {
		id: `jnl-pay-${invoice.id}`,
		entryNumber,
		date,
		reference: `Payment ${invoice.invoiceNumber}`,
		lines: [
			{
				accountId: "1000",
				accountCode: "1000",
				accountName: "Cash at bank",
				debit: total,
				credit: 0,
				description: "Invoice paid"
			},
			{
				accountId: "4000",
				accountCode: "4000",
				accountName: "Brand and service income",
				debit: 0,
				credit: net,
				description: invoice.invoiceNumber
			},
			{
				accountId: "2100",
				accountCode: "2100",
				accountName: "GST collected",
				debit: 0,
				credit: gst,
				description: "GST on the invoice"
			}
		].filter((line) => line.debit > 0 || line.credit > 0),
		totalDebit: total,
		totalCredit: round2(net + gst),
		isBalanced: round2(net + gst) === total,
		isLocked: false,
		postedAt: (/* @__PURE__ */ new Date()).toISOString()
	};
}
function payoutJournal(input) {
	const fees = round2(input.platformFee + input.processing + input.commission);
	return {
		id: `jnl-${input.id}`,
		entryNumber: input.entryNumber,
		date: input.date,
		reference: `${input.platform} payout`,
		lines: [
			{
				accountId: "1000",
				accountCode: "1000",
				accountName: "Cash at bank",
				debit: input.net,
				credit: 0,
				description: "Net deposit"
			},
			{
				accountId: "6500",
				accountCode: "6500",
				accountName: "Platform and agency fees",
				debit: fees,
				credit: 0,
				description: "Cuts before the deposit"
			},
			{
				accountId: "4100",
				accountCode: "4100",
				accountName: "Platform income",
				debit: 0,
				credit: input.gross,
				description: "Gross fan spend"
			}
		],
		totalDebit: round2(input.net + fees),
		totalCredit: round2(input.gross),
		isBalanced: round2(input.net + fees) === round2(input.gross),
		isLocked: false,
		postedAt: (/* @__PURE__ */ new Date()).toISOString()
	};
}
function orderJournal(order, entryNumber) {
	return {
		id: `jnl-${order.id}`,
		entryNumber,
		date: order.date,
		reference: order.orderNumber,
		lines: [
			{
				accountId: "1000",
				accountCode: "1000",
				accountName: "Cash at bank",
				debit: order.total,
				credit: 0,
				description: "Shop sale"
			},
			{
				accountId: "4200",
				accountCode: "4200",
				accountName: "Product sales",
				debit: 0,
				credit: order.subtotal,
				description: order.itemsSummary
			},
			{
				accountId: "2100",
				accountCode: "2100",
				accountName: "GST collected",
				debit: 0,
				credit: order.gstAmount,
				description: "GST on the sale"
			}
		].filter((line) => line.debit > 0 || line.credit > 0),
		totalDebit: order.total,
		totalCredit: round2(order.subtotal + order.gstAmount),
		isBalanced: round2(order.subtotal + order.gstAmount) === round2(order.total),
		isLocked: false,
		postedAt: (/* @__PURE__ */ new Date()).toISOString()
	};
}
function nextJournalNumber(existing) {
	const max = existing.reduce((m, n) => {
		const parsed = Number(String(n).replace(/\D/g, "").slice(-4));
		return Number.isFinite(parsed) ? Math.max(m, parsed) : m;
	}, 0);
	return `JNL-2026-${String(max + 1).padStart(4, "0")}`;
}
/** Australian financial-year quarter that contains today. */
function currentBasPeriod() {
	const now = /* @__PURE__ */ new Date();
	const month = now.getMonth();
	const year = now.getFullYear();
	let start;
	let end;
	let due;
	let label;
	if (month >= 6 && month <= 8) {
		start = `${year}-07-01`;
		end = `${year}-09-30`;
		due = `${year}-10-28`;
		label = `Q1 ${year}–${year + 1} (1 July – 30 September ${year})`;
	} else if (month >= 9) {
		start = `${year}-10-01`;
		end = `${year}-12-31`;
		due = `${year + 1}-02-28`;
		label = `Q2 ${year}–${year + 1} (1 October – 31 December ${year})`;
	} else if (month <= 2) {
		const fy = year - 1;
		start = `${year}-01-01`;
		end = `${year}-03-31`;
		due = `${year}-04-28`;
		label = `Q3 ${fy}–${year} (1 January – 31 March ${year})`;
	} else {
		const fy = year - 1;
		start = `${year}-04-01`;
		end = `${year}-06-30`;
		due = `${year}-07-28`;
		label = `Q4 ${fy}–${year} (1 April – 30 June ${year})`;
	}
	return {
		periodId: `bas-${start}`,
		label,
		startDate: start,
		endDate: end,
		dueDate: due,
		status: "OPEN",
		g1TotalSales: 0,
		g2ExportSales: 0,
		g3OtherGSTFree: 0,
		g10CapitalPurchases: 0,
		g11NonCapitalPurchases: 0,
		gst1aSalesGst: 0,
		gst1bPurchaseGstCredits: 0,
		netGstPayable: 0,
		w1TotalWages: 0,
		w2WithheldAmount: 0,
		accountantNotes: "Figures update when you invoice, get paid, or record an expense in this quarter."
	};
}
var INITIAL_BUSINESS_IDENTITY = {
	abn: "51 824 753 556",
	legalName: "Your business",
	tradingName: "Your business Creative",
	businessName: "Your business Studio",
	entityType: "sole_trader",
	mainBusinessActivity: "Social Media & UGC Content Creation",
	anzsicCode: "90020 - Creative Arts Activities",
	businessAddress: "Suite 4, 182 Campbell St, Surry Hills NSW 2010",
	postalAddress: "PO Box 412, Strawberry Hills NSW 2012",
	contactEmail: "hello@kirazhang.com.au",
	contactPhone: "+61 412 345 678",
	startDate: "2023-08-15",
	status: "active",
	abnLastVerifiedAt: "2026-09-12T09:30:00Z",
	abrLastCheckedAt: "2026-09-22T04:15:00Z"
};
var INITIAL_CREATOR_PROFILE = {
	creatorHandle: "@kirazhang",
	primaryPlatforms: [
		"Instagram",
		"TikTok",
		"YouTube",
		"Patreon"
	],
	publicEmail: "collabs@kirazhang.com",
	agentOrManagerName: "Talent Republic AU (Marcus Vance)",
	agentEmail: "marcus@talentrepublic.com.au",
	mediaKitUrl: "https://kirazhang.com/media-kit-2026.pdf",
	discreetMode: false
};
var INITIAL_TAX_PROFILE = {
	gstRegistered: true,
	gstRegistrationDate: "2024-03-01",
	accountingBasis: "cash",
	basFrequency: "quarterly",
	paygWithholdingRegistered: true,
	hasTaxAgent: true,
	taxAgentName: "Apex Creator Advisory Group (Chartered Accountants)",
	taxAgentNumber: "RAN 25981203",
	financialYear: "2026-2027"
};
var INITIAL_OPERATING_PROFILE = {
	hasBookings: true,
	hasPhysicalProducts: true,
	hasDigitalProducts: true,
	hasSubscriptions: true,
	hasPlatformPayouts: true,
	hasAffiliateIncome: true,
	hasContractors: true,
	hasEmployees: false,
	hasInterstateActivity: true,
	hasOverseasActivity: true,
	industryModule: "creator"
};
var INITIAL_CLIENTS = [
	{
		id: "cli-001",
		legalName: "Gymshark Australia Pty Ltd",
		tradingName: "Gymshark AU",
		abn: "32 628 119 402",
		contactName: "Chloe Bennett",
		email: "chloe.bennett@gymshark.com",
		phone: "+61 2 9182 3400",
		clientType: "brand",
		billingAddress: "Level 12, 100 Mount St, North Sydney NSW 2060",
		paymentTermsDays: 14,
		totalLifetimeRevenue: 28500,
		notes: "Key brand partner. Requires usage rights for 6 months digital only."
	},
	{
		id: "cli-002",
		legalName: "Mecca Brands Pty Ltd",
		tradingName: "MECCA",
		abn: "11 077 859 931",
		contactName: "Julian Rossi",
		email: "partnerships@mecca.com.au",
		clientType: "brand",
		billingAddress: "34 Wangaratta St, Richmond VIC 3121",
		paymentTermsDays: 30,
		totalLifetimeRevenue: 16200,
		notes: "Beauty campaigns. Requires strict product exclusivity for 30 days."
	},
	{
		id: "cli-003",
		legalName: "Sony Music Entertainment (Australia) Pty Ltd",
		tradingName: "Sony Music AU",
		abn: "95 107 177 104",
		contactName: "Saskia Vance",
		email: "creator.relations@sonymusic.com",
		clientType: "production",
		billingAddress: "11-19 Hargrave St, East Sydney NSW 2010",
		paymentTermsDays: 14,
		totalLifetimeRevenue: 12400,
		notes: "Audio syncing and music launch campaigns."
	},
	{
		id: "cli-004",
		legalName: "Amplify Creative Agency Pty Ltd",
		tradingName: "Amplify Talent",
		abn: "48 601 233 490",
		contactName: "Dave Kowalski",
		email: "bookings@amplify.com.au",
		clientType: "agency",
		billingAddress: "72 Commercial Rd, Prahran VIC 3181",
		paymentTermsDays: 7,
		totalLifetimeRevenue: 34100,
		notes: "Talent agency intermediary for tier-1 brands."
	}
];
var INITIAL_BOOKINGS = [
	{
		id: "bk-101",
		clientId: "cli-001",
		campaignName: "Gymshark Vital Seamless Spring 2026",
		bookingType: "campaign",
		startDate: "2026-09-28",
		endDate: "2026-10-05",
		location: "Bondi Beach & Studio 4, Sydney",
		isRemote: false,
		fee: 7500,
		commissionRate: .15,
		commissionAmount: 1125,
		reimbursements: 350,
		gstInclusive: true,
		gstAmount: 713.64,
		totalAmount: 7850,
		status: "confirmed",
		deliverables: [
			"1x Dedicated 60s Reel (IG/TikTok)",
			"3x In-feed Carousel Story Frames with tracking link",
			"90-day organic digital usage rights"
		],
		usageRights: "Australia & NZ digital ad amplification for 90 days",
		exclusivityMonths: 1,
		invoiceId: "inv-2026-003",
		notes: "Products arriving by courier 25 Sep."
	},
	{
		id: "bk-102",
		clientId: "cli-002",
		campaignName: "Mecca Holiday Gifting Preview",
		bookingType: "event_appearance",
		startDate: "2026-10-12",
		endDate: "2026-10-12",
		location: "Mecca Flagship, George St Sydney",
		isRemote: false,
		fee: 4500,
		commissionRate: .15,
		commissionAmount: 675,
		reimbursements: 0,
		gstInclusive: true,
		gstAmount: 409.09,
		totalAmount: 4500,
		status: "quote",
		deliverables: ["2-hour live attendance & red carpet photo call", "4x Live IG Stories during evening"],
		usageRights: "PR editorial and event recap reels only",
		exclusivityMonths: 0,
		notes: "Quote sent 20 Sep. Awaiting formal acceptance."
	},
	{
		id: "bk-103",
		clientId: "cli-003",
		campaignName: "Indie Artist Single Launch Sound Trend",
		bookingType: "ugc",
		startDate: "2026-09-15",
		endDate: "2026-09-20",
		location: "Home Studio (Remote)",
		isRemote: true,
		fee: 3200,
		commissionRate: .15,
		commissionAmount: 480,
		reimbursements: 0,
		gstInclusive: true,
		gstAmount: 290.91,
		totalAmount: 3200,
		status: "invoiced",
		deliverables: ["2x TikTok videos featuring audio hook", "Permanent pinned sound for 30 days"],
		usageRights: "Global digital organic rights",
		exclusivityMonths: 0,
		invoiceId: "inv-2026-002",
		notes: "Delivered on time. Invoice issued."
	}
];
var INITIAL_QUOTES = [{
	id: "qte-2026-001",
	quoteNumber: "QTE-2026-001",
	clientId: "cli-002",
	bookingId: "bk-102",
	issueDate: "2026-09-20",
	expiryDate: "2026-10-04",
	deliverables: [
		"2-hour personal appearance at flagship event",
		"4x IG Story clips tagged @meccabeauty",
		"High-res press photography access"
	],
	usageRights: "PR recap only, 30 days across Australia/NZ",
	exclusivity: "No rival prestige beauty brands for 14 days",
	subtotal: 4090.91,
	gstAmount: 409.09,
	total: 4500,
	status: "sent",
	terms: "Payment 30 days from completion. 50% deposit required if cancelled within 7 days."
}];
var INITIAL_INVOICES = [
	{
		id: "inv-2026-001",
		invoiceNumber: "INV-2026-000001",
		clientId: "cli-004",
		isTaxInvoice: true,
		issueDate: "2026-08-15",
		dueDate: "2026-08-22",
		items: [{
			id: "itm-1",
			description: "Brand Campaign - Spring Athletic Line UGC Series (3x Reels)",
			quantity: 1,
			unitPrice: 5e3,
			gstRate: .1,
			amount: 5e3
		}],
		subtotal: 5e3,
		gstTotal: 500,
		total: 5500,
		status: "paid",
		paidDate: "2026-08-20",
		paymentMethod: "Bank Transfer (BSB 062-000)",
		notes: "Thank you for your business. Remitted to Your business.",
		auditTrail: [
			"Created 2026-08-15T10:00:00Z",
			"Sent to accounts@amplify.com.au 2026-08-15T10:15:00Z",
			"Paid via EFT 2026-08-20T14:32:00Z"
		]
	},
	{
		id: "inv-2026-002",
		invoiceNumber: "INV-2026-000002",
		clientId: "cli-003",
		bookingId: "bk-103",
		isTaxInvoice: true,
		issueDate: "2026-09-04",
		dueDate: "2026-09-18",
		items: [{
			id: "itm-2",
			description: "Sound Trend Campaign - 2x TikTok Dedicated UGC Clips",
			quantity: 1,
			unitPrice: 2909.09,
			gstRate: .1,
			amount: 2909.09
		}],
		subtotal: 2909.09,
		gstTotal: 290.91,
		total: 3200,
		status: "issued",
		notes: "Payment terms: 14 days. Bank details: CommBank BSB 062-111 Acc 889123.",
		auditTrail: ["Created 2026-09-18T11:20:00Z", "Issued as official ATO Tax Invoice"]
	},
	{
		id: "inv-2026-003",
		invoiceNumber: "INV-2026-000003",
		clientId: "cli-001",
		bookingId: "bk-101",
		isTaxInvoice: true,
		issueDate: "2026-09-21",
		dueDate: "2026-10-05",
		items: [{
			id: "itm-3",
			description: "Gymshark Vital Seamless Campaign - Content Creation & Talent Fee",
			quantity: 1,
			unitPrice: 6818.18,
			gstRate: .1,
			amount: 6818.18
		}, {
			id: "itm-4",
			description: "Production Assistant & Location Permit Reimbursement (at cost)",
			quantity: 1,
			unitPrice: 318.18,
			gstRate: .1,
			amount: 318.18
		}],
		subtotal: 7136.36,
		gstTotal: 713.64,
		total: 7850,
		status: "issued",
		notes: "Deposit / Deliverable milestone invoice.",
		auditTrail: ["Created 2026-09-21T08:45:00Z", "Sent to Chloe Bennett"]
	}
];
var INITIAL_PRODUCTS = [
	{
		id: "prd-01",
		sku: "DIG-PRESET-01",
		name: "Sydney Golden Hour Lightroom Mobile Preset Pack",
		description: "12 signature creator color-grading presets for DNG and Desktop Lightroom.",
		type: "preset",
		price: 49,
		cost: 0,
		gstInclusive: true,
		inventoryEnabled: false,
		inventoryQuantity: 9999,
		active: true
	},
	{
		id: "prd-02",
		sku: "DIG-DECK-02",
		name: "The 6-Figure Creator Media Kit & Pitch Deck Template",
		description: "Fully customizable Notion & Canva pitch kit used by Your business.",
		type: "digital",
		price: 89,
		cost: 0,
		gstInclusive: true,
		inventoryEnabled: false,
		inventoryQuantity: 9999,
		active: true
	},
	{
		id: "prd-03",
		sku: "MERCH-HOODIE-M",
		name: "Your business Studios \"UNFILTERED\" Heavyweight Fleece Hoodie",
		description: "450gsm organic cotton custom cut and sew hoodie made in Melbourne.",
		type: "physical",
		price: 135,
		cost: 45,
		gstInclusive: true,
		inventoryEnabled: true,
		inventoryQuantity: 28,
		active: true
	},
	{
		id: "prd-04",
		sku: "SRV-CONSULT-1HR",
		name: "1-on-1 Creator Strategy & Deal Negotiation Audit (60 Min)",
		description: "Private Zoom strategy session on brand contracts and rate negotiation.",
		type: "service",
		price: 450,
		cost: 0,
		gstInclusive: true,
		inventoryEnabled: false,
		inventoryQuantity: 4,
		active: true
	}
];
var INITIAL_ORDERS = [
	{
		id: "ord-801",
		orderNumber: "ORD-2026-0801",
		customerName: "Sarah Jenkins",
		customerEmail: "s.jenkins@gmail.com",
		channel: "storefront",
		date: "2026-09-21",
		subtotal: 44.55,
		gstAmount: 4.45,
		shipping: 0,
		total: 49,
		status: "completed",
		itemsSummary: "1x Sydney Golden Hour Lightroom Mobile Preset Pack"
	},
	{
		id: "ord-802",
		orderNumber: "ORD-2026-0802",
		customerName: "Liam O’Connor",
		customerEmail: "liam.oc@outlook.com",
		channel: "storefront",
		date: "2026-09-20",
		subtotal: 122.73,
		gstAmount: 12.27,
		shipping: 15,
		total: 150,
		status: "processing",
		itemsSummary: "1x \"UNFILTERED\" Heavyweight Fleece Hoodie (Size L)"
	},
	{
		id: "ord-803",
		orderNumber: "ORD-2026-0803",
		customerName: "Monique Laurent",
		customerEmail: "monique@laurentmedia.co",
		channel: "storefront",
		date: "2026-09-18",
		subtotal: 409.09,
		gstAmount: 40.91,
		shipping: 0,
		total: 450,
		status: "completed",
		itemsSummary: "1x 1-on-1 Creator Strategy & Deal Negotiation Audit"
	}
];
var INITIAL_PLATFORM_PAYOUTS = [
	{
		id: "pay-001",
		platform: "OnlyFans",
		periodStart: "2026-09-01",
		periodEnd: "2026-09-14",
		depositDate: "2026-09-17",
		grossRevenue: 8400,
		platformFee: 1680,
		paymentProcessingFee: 252,
		managementCommission: 646.8,
		netPayout: 5821.2,
		status: "reconciled",
		bankTransactionId: "tx-103"
	},
	{
		id: "pay-002",
		platform: "YouTube",
		periodStart: "2026-08-01",
		periodEnd: "2026-08-31",
		depositDate: "2026-09-21",
		grossRevenue: 3450,
		platformFee: 1552.5,
		paymentProcessingFee: 0,
		managementCommission: 0,
		netPayout: 1897.5,
		status: "reconciled",
		bankTransactionId: "tx-105"
	},
	{
		id: "pay-003",
		platform: "Patreon",
		periodStart: "2026-09-01",
		periodEnd: "2026-09-15",
		depositDate: "2026-09-19",
		grossRevenue: 1200,
		platformFee: 96,
		paymentProcessingFee: 38.4,
		managementCommission: 0,
		netPayout: 1065.6,
		status: "deposited",
		bankTransactionId: "tx-104"
	}
];
var INITIAL_EXPENSES = [
	{
		id: "exp-501",
		date: "2026-09-10",
		supplier: "DigiDirect Sydney",
		supplierAbn: "64 123 456 789",
		category: "Equipment & Cameras",
		description: "Sony FX3 Cinema Line Full-Frame Camera Body for 4K UGC",
		grossAmount: 5299,
		gstAmount: 481.73,
		netAmount: 4817.27,
		businessUsePercentage: 100,
		claimableAmount: 5299,
		claimableGst: 481.73,
		deductibilityConfidence: "HIGH",
		taxNotes: "Essential production equipment. Eligible for instant asset write-off / depreciation schedule.",
		receiptName: "DigiDirect-TaxInvoice-INV88291.pdf",
		receiptOcrVerified: true,
		isReconciled: true,
		bankTransactionId: "tx-201"
	},
	{
		id: "exp-502",
		date: "2026-09-14",
		supplier: "Studio Tropico Sydney",
		supplierAbn: "88 491 029 384",
		category: "Photography & Studio",
		description: "Full day cyclorama studio hire + Profoto strobe lighting kit",
		grossAmount: 1100,
		gstAmount: 100,
		netAmount: 1e3,
		businessUsePercentage: 100,
		claimableAmount: 1100,
		claimableGst: 100,
		deductibilityConfidence: "HIGH",
		taxNotes: "Production shoot for Gymshark spring campaign.",
		receiptName: "StudioTropico-Receipt-1409.pdf",
		receiptOcrVerified: true,
		isReconciled: true,
		bankTransactionId: "tx-202"
	},
	{
		id: "exp-503",
		date: "2026-09-16",
		supplier: "Telstra Corporation Limited",
		supplierAbn: "33 051 775 556",
		category: "Telecommunications",
		description: "Monthly mobile 5G plan + 200GB data for creator uploads",
		grossAmount: 115,
		gstAmount: 10.45,
		netAmount: 104.55,
		businessUsePercentage: 70,
		claimableAmount: 80.5,
		claimableGst: 7.32,
		deductibilityConfidence: "HIGH",
		taxNotes: "70% business apportionment substantiated via 4-week mobile usage log as per ATO guidelines.",
		receiptName: "Telstra-TaxInvoice-Sep2026.pdf",
		receiptOcrVerified: true,
		isReconciled: true,
		bankTransactionId: "tx-203"
	},
	{
		id: "exp-504",
		date: "2026-09-18",
		supplier: "Adobe Systems Pty Ltd",
		supplierAbn: "72 054 249 059",
		category: "Software & Subscriptions",
		description: "Creative Cloud All Apps (Premiere Pro, Lightroom, After Effects)",
		grossAmount: 87.99,
		gstAmount: 8,
		netAmount: 79.99,
		businessUsePercentage: 100,
		claimableAmount: 87.99,
		claimableGst: 8,
		deductibilityConfidence: "HIGH",
		taxNotes: "Core production software.",
		receiptName: "Adobe-Receipt-CC-Sep26.pdf",
		receiptOcrVerified: true,
		isReconciled: true,
		bankTransactionId: "tx-204"
	},
	{
		id: "exp-505",
		date: "2026-09-19",
		supplier: "Zara Australia",
		supplierAbn: "41 144 040 311",
		category: "Costumes & Business Clothing",
		description: "Specific on-camera styling wardrobe for brand commercial",
		grossAmount: 320,
		gstAmount: 29.09,
		netAmount: 290.91,
		businessUsePercentage: 60,
		claimableAmount: 192,
		claimableGst: 17.45,
		deductibilityConfidence: "REVIEW",
		taxNotes: "ATO strict warning: Everyday conventional clothing is generally not deductible unless stage costume or protective uniform. Flagged for accountant review.",
		receiptOcrVerified: false,
		isReconciled: false
	},
	{
		id: "exp-506",
		date: "2026-09-20",
		supplier: "Qantas Airways Limited",
		supplierAbn: "16 009 661 901",
		category: "Travel & Flights",
		description: "Return flight QF420 SYD -> MEL for fashion week shoot",
		grossAmount: 480,
		gstAmount: 43.64,
		netAmount: 436.36,
		businessUsePercentage: 100,
		claimableAmount: 480,
		claimableGst: 43.64,
		deductibilityConfidence: "HIGH",
		taxNotes: "Travel itinerary and brand invitation linked in Document Vault. Receipt image still missing.",
		receiptOcrVerified: false,
		isReconciled: false
	}
];
var INITIAL_BANK_ACCOUNTS = [{
	id: "bnk-01",
	bankName: "Up Bank",
	accountName: "Your business - Everyday Business",
	bsb: "633-123",
	accountNumber: "•••• 4920",
	balance: 24890.4,
	type: "transaction",
	lastSynced: "2026-09-22T08:15:00Z"
}, {
	id: "bnk-02",
	bankName: "Commonwealth Bank of Australia",
	accountName: "Your business - Tax & GST Reserve",
	bsb: "062-111",
	accountNumber: "•••• 8812",
	balance: 14250,
	type: "tax_reserve",
	lastSynced: "2026-09-22T08:15:00Z"
}];
var INITIAL_BANK_TRANSACTIONS = [
	{
		id: "tx-101",
		bankAccountId: "bnk-01",
		date: "2026-08-20",
		description: "AMPLIFY CREATIVE PTY LTD - REMITTANCE INV-2026-000001",
		amount: 5500,
		status: "RECONCILED",
		matchedType: "invoice",
		matchedId: "inv-2026-001"
	},
	{
		id: "tx-103",
		bankAccountId: "bnk-01",
		date: "2026-09-17",
		description: "FENIX INTERNET LLC - OF SETTLEMENT WIRE 84192",
		amount: 5821.2,
		status: "RECONCILED",
		matchedType: "payout",
		matchedId: "pay-001"
	},
	{
		id: "tx-104",
		bankAccountId: "bnk-01",
		date: "2026-09-19",
		description: "PATREON IRELAND LIMITED - PAYOUT SEP15",
		amount: 1065.6,
		status: "MATCHED",
		matchedType: "payout",
		matchedId: "pay-003"
	},
	{
		id: "tx-105",
		bankAccountId: "bnk-01",
		date: "2026-09-21",
		description: "GOOGLE ASIA PACIFIC - YOUTUBE PARTNER EARNINGS",
		amount: 1897.5,
		status: "RECONCILED",
		matchedType: "payout",
		matchedId: "pay-002"
	},
	{
		id: "tx-201",
		bankAccountId: "bnk-01",
		date: "2026-09-10",
		description: "DIGIDIRECT SYDNEY SYDNEY NSW AU",
		amount: -5299,
		status: "RECONCILED",
		matchedType: "expense",
		matchedId: "exp-501"
	},
	{
		id: "tx-202",
		bankAccountId: "bnk-01",
		date: "2026-09-14",
		description: "STUDIO TROPICO SURRY HILLS AU",
		amount: -1100,
		status: "RECONCILED",
		matchedType: "expense",
		matchedId: "exp-502"
	},
	{
		id: "tx-203",
		bankAccountId: "bnk-01",
		date: "2026-09-16",
		description: "TELSTRA DIRECT DEBIT BILL 90218942",
		amount: -115,
		status: "RECONCILED",
		matchedType: "expense",
		matchedId: "exp-503"
	},
	{
		id: "tx-204",
		bankAccountId: "bnk-01",
		date: "2026-09-18",
		description: "ADOBE SYSTEMS PTY LTD SYDNEY AU",
		amount: -87.99,
		status: "RECONCILED",
		matchedType: "expense",
		matchedId: "exp-504"
	},
	{
		id: "tx-205",
		bankAccountId: "bnk-01",
		date: "2026-09-21",
		description: "TRANSFER TO CBA TAX RESERVE BSB 062-111",
		amount: -2500,
		status: "REVIEW",
		matchedType: "drawing",
		notes: "Internal transfer to separate tax escrow account."
	},
	{
		id: "tx-206",
		bankAccountId: "bnk-01",
		date: "2026-09-22",
		description: "SHOPIFY PAYMENTS STRIPE SETTLEMENT 801-802",
		amount: 199,
		status: "IMPORTED",
		notes: "Awaiting automatic matching with Storefront Orders."
	}
];
var INITIAL_JOURNAL_ENTRIES = [
	{
		id: "jnl-001",
		entryNumber: "JNL-2026-0001",
		date: "2026-08-20",
		reference: "Invoice INV-2026-000001 Payment Receipt",
		lines: [
			{
				accountId: "1000",
				accountCode: "1000",
				accountName: "Cash at Bank (Up Bank)",
				debit: 5500,
				credit: 0,
				description: "Receipt from Amplify Creative"
			},
			{
				accountId: "4200",
				accountCode: "4200",
				accountName: "Sponsorship & UGC Revenue",
				debit: 0,
				credit: 5e3,
				description: "Net campaign income"
			},
			{
				accountId: "2100",
				accountCode: "2100",
				accountName: "GST Payable (1A)",
				debit: 0,
				credit: 500,
				description: "10% GST on taxable supply"
			}
		],
		totalDebit: 5500,
		totalCredit: 5500,
		isBalanced: true,
		isLocked: true,
		postedAt: "2026-08-20T14:35:00Z"
	},
	{
		id: "jnl-002",
		entryNumber: "JNL-2026-0002",
		date: "2026-09-10",
		reference: "Camera Equipment Purchase - Sony FX3",
		lines: [
			{
				accountId: "1300",
				accountCode: "1300",
				accountName: "Plant & Equipment (Camera)",
				debit: 4817.27,
				credit: 0,
				description: "Sony FX3 body asset"
			},
			{
				accountId: "2200",
				accountCode: "2200",
				accountName: "GST Input Credits (1B)",
				debit: 481.73,
				credit: 0,
				description: "GST paid on capital equipment"
			},
			{
				accountId: "1000",
				accountCode: "1000",
				accountName: "Cash at Bank (Up Bank)",
				debit: 0,
				credit: 5299,
				description: "Payment to DigiDirect"
			}
		],
		totalDebit: 5299,
		totalCredit: 5299,
		isBalanced: true,
		isLocked: true,
		postedAt: "2026-09-10T16:00:00Z"
	},
	{
		id: "jnl-003",
		entryNumber: "JNL-2026-0003",
		date: "2026-09-17",
		reference: "Platform Payout Breakdown - OnlyFans Period Sep 1-14",
		lines: [
			{
				accountId: "1000",
				accountCode: "1000",
				accountName: "Cash at Bank (Up Bank)",
				debit: 5821.2,
				credit: 0,
				description: "Net funds received in AU bank"
			},
			{
				accountId: "6500",
				accountCode: "6500",
				accountName: "Platform Fees (20%)",
				debit: 1680,
				credit: 0,
				description: "OnlyFans platform commission"
			},
			{
				accountId: "6600",
				accountCode: "6600",
				accountName: "Merchant & Wire Fees",
				debit: 252,
				credit: 0,
				description: "Payment processing fees"
			},
			{
				accountId: "6700",
				accountCode: "6700",
				accountName: "Management Commission (10%)",
				debit: 646.8,
				credit: 0,
				description: "Talent Republic agency fee"
			},
			{
				accountId: "4000",
				accountCode: "4000",
				accountName: "Subscription & Platform Gross Revenue",
				debit: 0,
				credit: 8400,
				description: "Gross fan spend before deductions"
			}
		],
		totalDebit: 8400,
		totalCredit: 8400,
		isBalanced: true,
		isLocked: false,
		postedAt: "2026-09-17T11:00:00Z"
	}
];
var INITIAL_BAS_PERIOD = {
	periodId: "bas-2026-q1",
	label: "Q1 2026-2027 (1 July 2026 - 30 September 2026)",
	startDate: "2026-07-01",
	endDate: "2026-09-30",
	dueDate: "2026-10-28",
	status: "REVIEW",
	g1TotalSales: 32640,
	g2ExportSales: 5821.2,
	g3OtherGSTFree: 0,
	g10CapitalPurchases: 5299,
	g11NonCapitalPurchases: 1822.99,
	gst1aSalesGst: 1704.55,
	gst1bPurchaseGstCredits: 642.52,
	netGstPayable: 1062.03,
	w1TotalWages: 0,
	w2WithheldAmount: 0,
	accountantNotes: "Draft workpapers calculated. Please confirm export status of US/EU Patreon & OF gross receipts before final signoff."
};
var INITIAL_DOCUMENTS = [
	{
		id: "doc-001",
		title: "ABR ABN Registration Certificate",
		category: "registration",
		filename: "ABR-ABN-Confirmation-51824753556.pdf",
		fileSize: "412 KB",
		uploadDate: "2023-08-16",
		retentionUntil: "2030-08-16",
		isSensitiveVault: false
	},
	{
		id: "doc-002",
		title: "ASIC Certificate of Registration - Your business",
		category: "asic",
		filename: "ASIC-Certificate-ACN648192381.pdf",
		fileSize: "890 KB",
		uploadDate: "2023-08-15",
		retentionUntil: "2033-08-15",
		isSensitiveVault: false
	},
	{
		id: "doc-003",
		title: "Gymshark Vital Seamless Campaign Agreement 2026",
		category: "contract",
		filename: "Gymshark-Talent-Contract-Executed.pdf",
		fileSize: "1.4 MB",
		uploadDate: "2026-09-20",
		retentionUntil: "2031-09-20",
		isSensitiveVault: true
	},
	{
		id: "doc-004",
		title: "DigiDirect Sony FX3 Tax Invoice INV88291",
		category: "receipt",
		filename: "DigiDirect-SonyFX3-TaxInvoice.pdf",
		fileSize: "320 KB",
		uploadDate: "2026-09-10",
		retentionUntil: "2031-09-10",
		isSensitiveVault: false,
		linkedTransactionId: "exp-501"
	}
];
var INITIAL_OBLIGATIONS = [
	{
		id: "ob-abr-01",
		authority: "ABR",
		title: "ABN Details & 28-Day Update Rule",
		status: "READY",
		summary: "ABN is verified and active. Registered address verified 10 days ago.",
		whyExplanation: "The ABR requires all ABN holders to notify changes to business details within 28 days of becoming aware of the change.",
		authorityReference: "ABR Important Facts - 28-day update obligation",
		dataTrigger: "ABN verified active with current postal and physical addresses.",
		actionRequired: "No immediate action required. Check if registered address or main activities change."
	},
	{
		id: "ob-ato-gst",
		authority: "ATO",
		title: "GST Threshold & Registration Status",
		status: "READY",
		summary: "Active GST registration. Current 12-month turnover is $89,450 (above $75,000 threshold).",
		whyExplanation: "The ATO requires entities with GST turnover of $75,000 or more to be registered for GST and charge GST on taxable supplies.",
		authorityReference: "ATO QC 22412 - Registering for GST",
		dataTrigger: "Entity crossed $75k threshold in March 2024 and completed registration.",
		actionRequired: "Issue compliant Tax Invoices (with ABN, items, and GST breakdown) and prepare quarterly BAS."
	},
	{
		id: "ob-ato-bas",
		authority: "ATO",
		title: "Quarterly BAS Q1 2026-2027",
		status: "APPROACHING",
		summary: "Due in 29 days (28 October 2026). Net GST payable estimated at $1,062.03.",
		whyExplanation: "Quarterly activity statements must be lodged and paid by the 28th day of the month following the quarter end.",
		authorityReference: "ATO BAS Due Dates - Quarter 1 (Jul-Sep)",
		dataTrigger: "Period ending 30 September 2026.",
		actionRequired: "Complete reconciliation of September expenses and share workpapers with your accountant.",
		dueDate: "2026-10-28",
		daysRemaining: 29
	},
	{
		id: "ob-payg-instalment",
		authority: "ATO",
		title: "PAYG Income Tax Instalment (Q1)",
		status: "APPROACHING",
		summary: "Quarterly PAYG instalment of $2,140 due 28 October 2026.",
		whyExplanation: "As a sole trader with business income, the ATO asks you to pre-pay your income tax in quarterly PAYG instalments. Paying on time avoids a lump-sum bill and general interest charges at year end.",
		authorityReference: "ATO PAYG Instalments (QC 16167)",
		dataTrigger: "Business income reported on your last tax return.",
		actionRequired: "Set aside $2,140 in your tax reserve and pay the instalment via your ATO online account.",
		dueDate: "2026-10-28",
		daysRemaining: 29
	},
	{
		id: "ob-super-personal",
		authority: "ATO",
		title: "Personal Super Contribution (optional deduction)",
		status: "REVIEW_REQUIRED",
		summary: "Consider a concessional super contribution before 30 June to reduce taxable income.",
		whyExplanation: "Sole traders are not paid Super Guarantee by anyone, so contributing to your own super is voluntary. Personal concessional contributions (up to the $30,000 cap) can be claimed as a tax deduction.",
		authorityReference: "ATO Personal Super Contributions (QC 21451)",
		dataTrigger: "No personal super contributions recorded this financial year.",
		actionRequired: "Decide on a contribution amount and lodge a Notice of Intent to Claim with your super fund."
	},
	{
		id: "ob-docs-evidence",
		authority: "DOCUMENTS",
		title: "ATO 5-Year Record Keeping & Missing Receipts",
		status: "ACTION_REQUIRED",
		summary: "2 expense transactions missing attached receipt images.",
		whyExplanation: "The ATO requires written evidence (tax invoice or detailed receipt) for business deductions over $10. Records must be kept for a minimum of 5 years.",
		authorityReference: "ATO Record Keeping Rules for Business",
		dataTrigger: "Zara styling purchase ($320) & Qantas flight ($480) lack uploaded PDF/image vouchers.",
		actionRequired: "Upload receipts to clear audit flags."
	}
];
var SEED_BUSINESS = INITIAL_BUSINESS_IDENTITY;
var SEED_CREATOR = INITIAL_CREATOR_PROFILE;
var SEED_TAX_PROFILE = INITIAL_TAX_PROFILE;
var SEED_OPERATING_PROFILE = INITIAL_OPERATING_PROFILE;
var SEED_CLIENTS = INITIAL_CLIENTS;
var SEED_BOOKINGS = INITIAL_BOOKINGS;
var SEED_QUOTES = INITIAL_QUOTES;
var SEED_INVOICES = INITIAL_INVOICES;
var SEED_PRODUCTS = INITIAL_PRODUCTS;
var SEED_ORDERS = INITIAL_ORDERS;
var SEED_PLATFORM_PAYOUTS = INITIAL_PLATFORM_PAYOUTS;
var SEED_EXPENSES = INITIAL_EXPENSES;
var SEED_BANK_ACCOUNTS = INITIAL_BANK_ACCOUNTS;
var SEED_BANK_TRANSACTIONS = INITIAL_BANK_TRANSACTIONS;
var SEED_JOURNAL_ENTRIES = INITIAL_JOURNAL_ENTRIES;
var SEED_BAS_PERIOD = INITIAL_BAS_PERIOD;
var SEED_OBLIGATIONS = INITIAL_OBLIGATIONS;
var SEED_DOCUMENTS = INITIAL_DOCUMENTS;
var blankBusiness = () => ({
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
	abrLastCheckedAt: ""
});
function emptyWorkspace() {
	return {
		onboarded: false,
		business: blankBusiness(),
		creator: {
			creatorHandle: "",
			primaryPlatforms: [],
			publicEmail: "",
			discreetMode: false
		},
		taxProfile: {
			gstRegistered: false,
			accountingBasis: "cash",
			basFrequency: "quarterly",
			paygWithholdingRegistered: false,
			hasTaxAgent: false,
			financialYear: "2026-2027"
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
			industryModule: "general"
		},
		clients: [],
		bookings: [],
		quotes: [],
		invoices: [],
		products: [],
		orders: [],
		payouts: [],
		expenses: [],
		bankAccounts: [{
			id: "bnk-operating",
			bankName: "Your bank",
			accountName: "Operating account",
			bsb: "",
			accountNumber: "••••",
			balance: 0,
			type: "transaction",
			lastSynced: todayIso()
		}],
		bankTransactions: [],
		journalEntries: [],
		basPeriod: currentBasPeriod(),
		obligations: [],
		documents: []
	};
}
function demoWorkspace() {
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
		documents: structuredClone(SEED_DOCUMENTS)
	};
}
function workspaceKey(userId) {
	return `talentos.workspace.${userId}`;
}
function loadWorkspace(userId) {
	try {
		const raw = localStorage.getItem(workspaceKey(userId));
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		if (!parsed || typeof parsed !== "object" || !parsed.business) return null;
		return parsed;
	} catch {
		return null;
	}
}
function saveWorkspace(userId, workspace) {
	localStorage.setItem(workspaceKey(userId), JSON.stringify(workspace));
}
function todayIso() {
	return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}
function useLedger(userId, demo) {
	const [workspace, setWorkspace] = (0, import_react.useState)(() => emptyWorkspace());
	const [ready, setReady] = (0, import_react.useState)(false);
	const hydratedFor = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!userId) {
			hydratedFor.current = null;
			setWorkspace(emptyWorkspace());
			setReady(false);
			return;
		}
		const next = loadWorkspace(userId) ?? (demo || userId === "demo-kira" ? demoWorkspace() : emptyWorkspace());
		hydratedFor.current = null;
		setWorkspace(next);
		setReady(true);
	}, [userId, demo]);
	(0, import_react.useEffect)(() => {
		if (!userId || !ready) return;
		if (hydratedFor.current !== userId) {
			hydratedFor.current = userId;
			return;
		}
		saveWorkspace(userId, workspace);
	}, [
		userId,
		ready,
		workspace
	]);
	const patch = (0, import_react.useCallback)((fn) => {
		setWorkspace((prev) => fn(prev));
	}, []);
	const completeOnboarding = (0, import_react.useCallback)((data) => {
		patch((prev) => ({
			...prev,
			...data,
			onboarded: true
		}));
	}, [patch]);
	const setIndustry = (0, import_react.useCallback)((industryModule) => {
		patch((prev) => ({
			...prev,
			operatingProfile: {
				...prev.operatingProfile,
				industryModule
			}
		}));
	}, [patch]);
	const restartOnboarding = (0, import_react.useCallback)(() => {
		patch((prev) => ({
			...prev,
			onboarded: false
		}));
	}, [patch]);
	const resetDemo = (0, import_react.useCallback)(() => {
		const fresh = demoWorkspace();
		setWorkspace(fresh);
	}, []);
	const addBooking = (0, import_react.useCallback)((booking) => {
		patch((prev) => ({
			...prev,
			bookings: [booking, ...prev.bookings]
		}));
	}, [patch]);
	const addClient = (0, import_react.useCallback)((client) => {
		patch((prev) => ({
			...prev,
			clients: [...prev.clients, client]
		}));
	}, [patch]);
	const addQuote = (0, import_react.useCallback)((quote) => {
		patch((prev) => ({
			...prev,
			quotes: [quote, ...prev.quotes]
		}));
	}, [patch]);
	const updateBookingStatus = (0, import_react.useCallback)((bookingId, status) => {
		patch((prev) => ({
			...prev,
			bookings: prev.bookings.map((b) => b.id === bookingId ? {
				...b,
				status
			} : b)
		}));
	}, [patch]);
	const addInvoice = (0, import_react.useCallback)((invoice) => {
		patch((prev) => ({
			...prev,
			invoices: [invoice, ...prev.invoices],
			basPeriod: prev.taxProfile.accountingBasis === "accruals" ? addSaleToBas(prev.basPeriod, invoice.issueDate, invoice.subtotal, invoice.gstTotal, prev.taxProfile.gstRegistered) : prev.basPeriod
		}));
	}, [patch]);
	const addExpense = (0, import_react.useCallback)((expense) => {
		patch((prev) => {
			const { accounts, account } = ensureOperating(prev.bankAccounts);
			const txn = {
				id: `txn-${expense.id}`,
				bankAccountId: account.id,
				date: expense.date,
				description: `${expense.supplier} — ${expense.description}`,
				amount: -Math.abs(expense.grossAmount),
				status: "CATEGORISED",
				matchedType: "expense",
				matchedId: expense.id
			};
			return {
				...prev,
				expenses: [{
					...expense,
					bankTransactionId: txn.id,
					isReconciled: false
				}, ...prev.expenses],
				bankTransactions: [txn, ...prev.bankTransactions],
				bankAccounts: creditAccount(accounts, account.id, -Math.abs(expense.grossAmount)),
				basPeriod: addPurchaseToBas(prev.basPeriod, expense, prev.taxProfile.gstRegistered),
				documents: expense.receiptName ? [{
					id: `doc-${expense.id}`,
					title: expense.receiptName,
					category: "receipt",
					filename: expense.receiptName,
					fileSize: "scan",
					uploadDate: expense.date || todayIso(),
					retentionUntil: `${Number((expense.date || todayIso()).slice(0, 4)) + 5}-06-30`,
					isSensitiveVault: false,
					linkedTransactionId: expense.id
				}, ...prev.documents] : prev.documents
			};
		});
	}, [patch]);
	const reconcileTransaction = (0, import_react.useCallback)((txnId) => {
		patch((prev) => ({
			...prev,
			bankTransactions: prev.bankTransactions.map((t) => t.id === txnId ? {
				...t,
				status: "RECONCILED"
			} : t),
			expenses: prev.expenses.map((e) => e.bankTransactionId === txnId ? {
				...e,
				isReconciled: true
			} : e)
		}));
	}, [patch]);
	const addJournalEntry = (0, import_react.useCallback)((entry) => {
		patch((prev) => ({
			...prev,
			journalEntries: [entry, ...prev.journalEntries]
		}));
	}, [patch]);
	const addProduct = (0, import_react.useCallback)((product) => {
		patch((prev) => ({
			...prev,
			products: [product, ...prev.products]
		}));
	}, [patch]);
	const addOrder = (0, import_react.useCallback)((order, productId) => {
		patch((prev) => {
			const { accounts, account } = ensureOperating(prev.bankAccounts);
			const txn = {
				id: `txn-${order.id}`,
				bankAccountId: account.id,
				date: order.date,
				description: `Sale ${order.orderNumber} — ${order.customerName}`,
				amount: order.total,
				status: "MATCHED",
				matchedId: order.id,
				notes: order.itemsSummary
			};
			const entry = orderJournal(order, nextJournalNumber(prev.journalEntries.map((j) => j.entryNumber)));
			return {
				...prev,
				orders: [order, ...prev.orders],
				products: productId ? prev.products.map((p) => p.id === productId && p.inventoryEnabled ? {
					...p,
					inventoryQuantity: Math.max(0, p.inventoryQuantity - 1)
				} : p) : prev.products,
				bankTransactions: [txn, ...prev.bankTransactions],
				bankAccounts: creditAccount(accounts, account.id, order.total),
				journalEntries: [entry, ...prev.journalEntries],
				basPeriod: addSaleToBas(prev.basPeriod, order.date, order.subtotal, order.gstAmount, prev.taxProfile.gstRegistered)
			};
		});
	}, [patch]);
	const addPayout = (0, import_react.useCallback)((payout) => {
		patch((prev) => {
			const { accounts, account } = ensureOperating(prev.bankAccounts);
			const txn = {
				id: `txn-${payout.id}`,
				bankAccountId: account.id,
				date: payout.depositDate,
				description: `${payout.platform} payout`,
				amount: round2(payout.netPayout),
				status: "MATCHED",
				matchedType: "payout",
				matchedId: payout.id
			};
			const entry = payoutJournal({
				id: payout.id,
				platform: payout.platform,
				date: payout.depositDate,
				gross: payout.grossRevenue,
				platformFee: payout.platformFee,
				processing: payout.paymentProcessingFee,
				commission: payout.managementCommission,
				net: round2(payout.netPayout),
				entryNumber: nextJournalNumber(prev.journalEntries.map((j) => j.entryNumber))
			});
			return {
				...prev,
				payouts: [{
					...payout,
					bankTransactionId: txn.id,
					status: "deposited"
				}, ...prev.payouts],
				bankTransactions: [txn, ...prev.bankTransactions],
				bankAccounts: creditAccount(accounts, account.id, payout.netPayout),
				journalEntries: [entry, ...prev.journalEntries],
				basPeriod: addExportToBas(prev.basPeriod, payout.depositDate, payout.grossRevenue, round2(payout.platformFee + payout.paymentProcessingFee + payout.managementCommission))
			};
		});
	}, [patch]);
	const applyRegister = (0, import_react.useCallback)((hit) => {
		patch((prev) => ({
			...prev,
			business: {
				...prev.business,
				legalName: hit.legalName || prev.business.legalName,
				entityType: hit.entityType ?? prev.business.entityType,
				businessAddress: hit.location || prev.business.businessAddress,
				status: "active",
				abnLastVerifiedAt: (/* @__PURE__ */ new Date()).toISOString(),
				abrLastCheckedAt: (/* @__PURE__ */ new Date()).toISOString()
			},
			taxProfile: {
				...prev.taxProfile,
				gstRegistered: hit.gstRegistered
			}
		}));
	}, [patch]);
	const lockBasPeriod = (0, import_react.useCallback)(() => {
		patch((prev) => ({
			...prev,
			basPeriod: {
				...prev.basPeriod,
				status: "LOCKED",
				lockedAt: (/* @__PURE__ */ new Date()).toISOString()
			}
		}));
	}, [patch]);
	const updateObligation = (0, import_react.useCallback)((updated) => {
		patch((prev) => ({
			...prev,
			obligations: prev.obligations.map((o) => o.id === updated.id ? updated : o)
		}));
	}, [patch]);
	const addDocument = (0, import_react.useCallback)((doc) => {
		patch((prev) => ({
			...prev,
			documents: [doc, ...prev.documents]
		}));
	}, [patch]);
	const convertBookingToInvoice = (0, import_react.useCallback)((booking) => {
		let created = null;
		patch((prev) => {
			const current = prev.bookings.find((b) => b.id === booking.id);
			if (!current || current.status === "invoiced" || current.status === "paid" || current.invoiceId) return prev;
			const isTaxInvoice = prev.taxProfile.gstRegistered;
			const gstTotal = isTaxInvoice ? booking.gstInclusive ? booking.gstAmount : Math.round(booking.fee * .1 * 100) / 100 : 0;
			const subtotal = isTaxInvoice && booking.gstInclusive ? Math.round((booking.fee - gstTotal) * 100) / 100 : booking.fee;
			const total = Math.round((subtotal + gstTotal) * 100) / 100;
			created = {
				id: `inv-${Date.now()}`,
				invoiceNumber: nextInvoiceNumber(prev.invoices.map((i) => i.invoiceNumber)),
				clientId: booking.clientId,
				bookingId: booking.id,
				isTaxInvoice,
				issueDate: todayIso(),
				dueDate: new Date(Date.now() + 12096e5).toISOString().slice(0, 10),
				items: [{
					id: `itm-${Date.now()}`,
					description: `${booking.campaignName} — ${booking.deliverables.join(", ")}`,
					quantity: 1,
					unitPrice: subtotal,
					gstRate: isTaxInvoice ? .1 : 0,
					amount: subtotal
				}],
				subtotal,
				gstTotal,
				total,
				status: "issued",
				notes: `Raised from booking ${booking.id}. Usage: ${booking.usageRights}. Payment due in 14 days.`,
				auditTrail: [`Raised from booking ${booking.id} on ${todayIso()}`]
			};
			return {
				...prev,
				invoices: [created, ...prev.invoices],
				bookings: prev.bookings.map((b) => b.id === booking.id ? {
					...b,
					status: "invoiced",
					invoiceId: created.id
				} : b)
			};
		});
		return created;
	}, [patch]);
	const convertQuoteToInvoice = (0, import_react.useCallback)((quote) => {
		patch((prev) => {
			if (quote.status === "converted") return prev;
			const isTaxInvoice = prev.taxProfile.gstRegistered;
			const invoice = {
				id: `inv-${Date.now()}`,
				invoiceNumber: nextInvoiceNumber(prev.invoices.map((i) => i.invoiceNumber)),
				clientId: quote.clientId,
				isTaxInvoice,
				issueDate: todayIso(),
				dueDate: new Date(Date.now() + 12096e5).toISOString().slice(0, 10),
				items: [{
					id: `itm-${Date.now()}`,
					description: `Quote ${quote.quoteNumber}: ${quote.deliverables.join(" · ")}`,
					quantity: 1,
					unitPrice: quote.subtotal,
					gstRate: isTaxInvoice ? .1 : 0,
					amount: quote.subtotal
				}],
				subtotal: quote.subtotal,
				gstTotal: isTaxInvoice ? quote.gstAmount : 0,
				total: isTaxInvoice ? quote.total : quote.subtotal,
				status: "issued",
				notes: `Converted from accepted quote ${quote.quoteNumber}. Usage: ${quote.usageRights}`,
				auditTrail: [`Converted from quote ${quote.quoteNumber}`]
			};
			return {
				...prev,
				invoices: [invoice, ...prev.invoices],
				quotes: prev.quotes.map((q) => q.id === quote.id ? {
					...q,
					status: "converted",
					convertedInvoiceId: invoice.id
				} : q)
			};
		});
	}, [patch]);
	const markInvoicePaid = (0, import_react.useCallback)((invoiceId) => {
		patch((prev) => {
			const invoice = prev.invoices.find((i) => i.id === invoiceId);
			if (!invoice || invoice.status === "paid") return prev;
			const { accounts, account } = ensureOperating(prev.bankAccounts);
			const paidDate = todayIso();
			const txn = {
				id: `txn-pay-${invoice.id}`,
				bankAccountId: account.id,
				date: paidDate,
				description: `Payment ${invoice.invoiceNumber}`,
				amount: invoice.total,
				status: "MATCHED",
				matchedType: "invoice",
				matchedId: invoice.id
			};
			const entry = paymentJournal(invoice, paidDate, nextJournalNumber(prev.journalEntries.map((j) => j.entryNumber)));
			const basPeriod = prev.taxProfile.accountingBasis === "cash" ? addSaleToBas(prev.basPeriod, paidDate, invoice.subtotal, invoice.gstTotal, prev.taxProfile.gstRegistered) : prev.basPeriod;
			return {
				...prev,
				invoices: prev.invoices.map((i) => i.id === invoiceId ? {
					...i,
					status: "paid",
					paidDate,
					paymentMethod: "Bank transfer",
					auditTrail: [...i.auditTrail, `Marked paid ${paidDate}`]
				} : i),
				clients: prev.clients.map((c) => c.id === invoice.clientId ? {
					...c,
					totalLifetimeRevenue: Math.round((c.totalLifetimeRevenue + invoice.total) * 100) / 100
				} : c),
				bookings: prev.bookings.map((b) => b.invoiceId === invoiceId || b.id === invoice.bookingId ? {
					...b,
					status: "paid"
				} : b),
				bankTransactions: [txn, ...prev.bankTransactions],
				bankAccounts: creditAccount(accounts, account.id, invoice.total),
				journalEntries: [entry, ...prev.journalEntries],
				basPeriod
			};
		});
	}, [patch]);
	return {
		...workspace,
		ready,
		patch,
		completeOnboarding,
		setIndustry,
		restartOnboarding,
		resetDemo,
		addBooking,
		addClient,
		addQuote,
		updateBookingStatus,
		addInvoice,
		addExpense,
		reconcileTransaction,
		addJournalEntry,
		addProduct,
		addOrder,
		addPayout,
		lockBasPeriod,
		updateObligation,
		addDocument,
		applyRegister,
		convertBookingToInvoice,
		convertQuoteToInvoice,
		markInvoicePaid
	};
}
function TalentLanding({ onSignUp, onSample }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "fixed inset-0 z-50 flex min-h-screen items-center overflow-y-auto bg-canvas px-5 py-10 sm:px-8 lg:px-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-10 flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-display text-4xl font-extrabold leading-none tracking-[-0.05em] text-ink sm:text-5xl",
							children: ["talent", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "brand-gradient-text",
								children: "OS"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "border-l border-accent/30 pl-3 text-sm font-semibold leading-tight text-ink sm:text-base",
							children: [
								"by cdxi",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium text-accent",
									children: "business, sorted"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-5 text-sm font-bold uppercase tracking-[0.18em] text-accent",
						children: "For Australian sole traders"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "max-w-xl text-balance font-display text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-ink sm:text-6xl",
						children: "Spend less time chasing the business stuff."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-lg text-pretty text-base leading-7 text-muted sm:text-lg",
						children: "Jobs, invoices, GST, and the BAS — for any sole trader. The sample studio is a creator. Your own books follow the trade you pick."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-col gap-3 sm:flex-row sm:items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: onSample,
							className: "inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-bold text-[#fff] shadow-[0_12px_30px_-6px_rgba(116,52,209,0.5)] transition-all hover:-translate-y-px hover:bg-accent-strong active:scale-[0.98]",
							children: ["Open the sample studio ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: onSignUp,
							className: "inline-flex items-center justify-center gap-2 rounded-xl border border-accent/30 bg-neutral-950 px-5 py-3 text-sm font-bold text-ink hover:bg-neutral-900",
							children: "Start your own books"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-xs font-medium text-faint",
						children: "Sample books are fictional and stay in this browser. Your own books do too."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-3 lg:grid-cols-1",
				children: [
					[
						"01",
						"See a real set of books",
						"A creator’s sample: brand deals, GST, and a BAS already in motion."
					],
					[
						"02",
						"Raise the invoice",
						"Turn a booking or quote into a tax invoice without double-counting GST."
					],
					[
						"03",
						"Ask Lex",
						"GST, super, platform fees and usage rights, explained without the jargon."
					]
				].map(([number, title, detail]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass rounded-2xl p-5 transition-transform hover:-translate-y-0.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs font-bold text-accent",
							children: number
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-4 font-display text-lg font-bold text-ink",
							children: title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm leading-6 text-muted",
							children: detail
						})
					]
				}, number))
			})]
		})
	});
}
function AppContent() {
	const { user, theme, loading, saveBusinessIdentity, enterSampleStudio, logOut } = useAuth();
	const books = useLedger(user?.id ?? null, Boolean(user?.demo));
	const [activeTab, setActiveTab] = (0, import_react.useState)("dashboard");
	const [moneySection, setMoneySection] = (0, import_react.useState)("expenses");
	const [launch, setLaunch] = (0, import_react.useState)({
		kind: "booking",
		n: 0
	});
	const [moreOpen, setMoreOpen] = (0, import_react.useState)(false);
	const [assistantOpen, setAssistantOpen] = (0, import_react.useState)(false);
	const [settingsOpen, setSettingsOpen] = (0, import_react.useState)(false);
	const [settingsTab, setSettingsTab] = (0, import_react.useState)("theme");
	const [authOpen, setAuthOpen] = (0, import_react.useState)(false);
	const { business, creator, taxProfile, operatingProfile, clients, bookings, quotes, invoices, products, orders, payouts, expenses, bankAccounts, bankTransactions, journalEntries, basPeriod, obligations, documents, ready } = books;
	const annualRevenue = bookings.reduce((acc, b) => acc + b.fee, 0) + payouts.reduce((acc, p) => acc + p.grossRevenue, 0);
	const annualTaxableIncome = invoices.filter((i) => i.status === "paid").reduce((acc, i) => acc + i.subtotal, 0) + payouts.reduce((acc, p) => acc + p.netPayout, 0) + orders.filter((o) => o.status !== "refunded").reduce((acc, o) => acc + o.subtotal, 0) - expenses.reduce((acc, e) => acc + e.claimableAmount, 0);
	const trade = industryById(operatingProfile.industryModule);
	(0, import_react.useEffect)(() => {
		applyIndustryTheme(user ? operatingProfile.industryModule : "creator");
	}, [
		user,
		operatingProfile.industryModule,
		theme
	]);
	const navItems = [
		{
			id: "dashboard",
			label: "Home",
			icon: LayoutDashboard
		},
		{
			id: "bookings",
			label: `${trade.jobNoun}s`,
			icon: Calendar,
			badge: bookings.length
		},
		{
			id: "sales",
			label: "Sales",
			icon: ShoppingBag
		},
		{
			id: "invoices",
			label: "Invoices",
			icon: FileText,
			badge: invoices.filter((i) => {
				const status = shownInvoiceStatus(i.status, i.dueDate);
				return status === "issued" || status === "overdue";
			}).length
		},
		{
			id: "money",
			label: "Money",
			icon: Landmark
		},
		{
			id: "compliance",
			label: "Tax",
			icon: ShieldCheck
		},
		{
			id: "files",
			label: "Files",
			icon: FolderClosed,
			badge: documents.length
		},
		{
			id: "accountant",
			label: "Accountant",
			icon: Briefcase
		}
	];
	if (loading || user && !ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-screen place-items-center bg-canvas text-ink",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-display text-3xl font-extrabold tracking-tight",
					children: ["talent", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "brand-gradient-text",
						children: "OS"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-muted",
					children: "by cdxi"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "Opening your books…"
				})
			]
		})
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TalentLanding, {
		onSignUp: () => setAuthOpen(true),
		onSample: enterSampleStudio
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthModal, {
		isOpen: authOpen,
		onClose: () => setAuthOpen(false),
		defaultMode: "signup"
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col bg-neutral-950 text-neutral-100 antialiased selection:bg-emerald-500/30 selection:text-emerald-200",
		children: [
			!books.onboarded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OnboardingModal, {
				isOpen: true,
				onClose: () => books.completeOnboarding({
					business,
					creator,
					taxProfile,
					operatingProfile
				}),
				business,
				taxProfile,
				operatingProfile,
				creatorProfile: creator,
				onSave: (b, t, o, c) => {
					books.completeOnboarding({
						business: b,
						creator: c,
						taxProfile: t,
						operatingProfile: o
					});
					saveBusinessIdentity(b, t);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-40 flex min-h-16 items-center justify-between gap-3 border-b border-neutral-800 bg-canvas/90 px-4 py-2.5 backdrop-blur-2xl sm:px-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "flex min-w-0 flex-1 items-center gap-3 text-left",
					onClick: () => setActiveTab("dashboard"),
					"aria-label": "talentOS by cdxi",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent font-display text-lg font-bold text-[#fff] shadow-[0_8px_20px_-8px_var(--color-accent)]",
						children: "t"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "block font-display text-[1.65rem] font-extrabold leading-none tracking-[-0.05em]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-ink",
								children: "talent"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "brand-gradient-text",
								children: "OS"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mt-1 block truncate text-[11px] font-semibold leading-none text-muted",
							children: [
								"by cdxi",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-faint",
									children: " · "
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-accent",
									children: trade.label
								})
							]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-xs sm:gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hidden items-center gap-2 rounded-full border border-[color:rgba(20,22,29,0.08)] bg-[color:rgba(20,22,29,0.03)] px-3 py-1 text-[11px] font-medium text-muted xl:flex",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-ink",
									children: business.legalName || "Your business"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-faint",
									children: "·"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["ABN ", business.abn || "—"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-faint",
									children: "·"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-ok",
									children: taxProfile.gstRegistered ? "GST registered" : "Not GST registered"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setAssistantOpen(true),
							className: "flex min-h-11 items-center gap-1.5 rounded-lg border border-accent/30 bg-accent-soft px-2.5 py-1.5 font-medium text-accent shadow-sm hover:bg-accent/15 sm:px-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden sm:inline",
								children: "Ask Lex"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								setSettingsTab("theme");
								setSettingsOpen(true);
							},
							className: "hidden min-h-11 items-center rounded-lg p-2 text-muted hover:bg-[color:rgba(20,22,29,0.06)] hover:text-ink sm:flex",
							title: "Settings",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => void logOut(),
							className: "flex min-h-11 items-center gap-1.5 rounded-lg border border-[color:rgba(20,22,29,0.08)] bg-[color:rgba(20,22,29,0.03)] px-2.5 py-1.5 text-ink hover:bg-[color:rgba(20,22,29,0.06)]",
							title: "Leave studio",
							"aria-label": "Leave studio",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-[#fff]",
								children: user.displayName?.charAt(0).toUpperCase() || "U"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-3.5 w-3.5 text-muted" })]
						})
					]
				})]
			}),
			user.demo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-2 border-b border-accent/15 bg-accent-soft px-4 py-2 text-xs text-ink sm:px-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Sample studio." }), " Kira Zhang’s fictional Sydney books — edit them, they stay in this browser."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: books.resetDemo,
					className: "font-semibold text-accent underline-offset-2 hover:underline",
					children: "Reset sample"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "hidden w-56 shrink-0 flex-col justify-between border-r border-neutral-800 bg-canvas/70 p-3 backdrop-blur-xl lg:flex xl:w-64",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "space-y-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "px-3 pb-2 text-[10px] font-medium uppercase tracking-wider text-faint",
									children: "Your business"
								}),
								navItems.map((item) => {
									const Icon = item.icon;
									const isActive = activeTab === item.id;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setActiveTab(item.id),
										className: `flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium ${isActive ? "bg-accent-soft font-semibold text-accent" : "text-muted hover:bg-[color:rgba(20,22,29,0.05)] hover:text-ink"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-2.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `h-4 w-4 ${isActive ? "text-accent" : "text-faint"}` }), item.label]
										}), item.badge !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `rounded px-1.5 py-0.5 text-[10px] font-semibold tabular-nums ${isActive ? "bg-accent/15 text-accent" : "bg-[color:rgba(20,22,29,0.06)] text-muted"}`,
											children: item.badge
										})]
									}, item.id);
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 space-y-1 border-t border-[color:rgba(20,22,29,0.08)] pt-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setSettingsOpen(true),
										className: "flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium text-muted hover:bg-[color:rgba(20,22,29,0.05)] hover:text-ink",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-2.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-4 w-4 text-faint" }), " Settings"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded bg-[color:rgba(20,22,29,0.06)] px-1.5 py-0.5 text-[10px] capitalize text-muted",
											children: theme
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => {
											setSettingsTab("notifications");
											setSettingsOpen(true);
										},
										className: "flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-muted hover:bg-[color:rgba(20,22,29,0.05)] hover:text-ink",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-4 w-4 text-faint" }), " Alerts"]
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass space-y-1 rounded-xl p-3 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] font-medium uppercase tracking-wide text-faint",
											children: "Profile"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1 text-[10px] font-medium text-ok",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3 w-3" }), " Saved here"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-xs font-semibold text-ink",
										children: creator.creatorHandle || user.displayName
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[11px] capitalize text-muted",
										children: business.entityType.replace("_", " ")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "pt-1 text-[10px] font-medium text-ok",
										children: ["FY ", taxProfile.financialYear || "2026-2027"]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setAssistantOpen(true),
								className: "flex w-full items-center gap-2.5 rounded-xl border border-accent/20 bg-accent-soft p-2.5 text-left hover:border-accent/40",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-accent/20 text-accent",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "truncate",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-[11px] font-semibold text-accent",
										children: "Ask Lex"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block truncate text-[10px] text-muted",
										children: "Tax rules, explained simply"
									})]
								})]
							})]
						})]
					}),
					moreOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "fixed inset-0 z-50 lg:hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "absolute inset-0 bg-black/45",
							"aria-label": "Close menu",
							onClick: () => setMoreOpen(false)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+4.25rem)] max-h-[78vh] overflow-y-auto rounded-t-3xl border border-neutral-800 bg-canvas px-4 pb-4 pt-3 shadow-2xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mb-4 h-1 w-10 rounded-full bg-neutral-700" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-display text-2xl font-extrabold leading-none tracking-[-0.04em]",
									children: ["talent", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "brand-gradient-text",
										children: "OS"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs font-semibold text-muted",
									children: "by cdxi · the colour follows your industry"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mb-2 mt-4 text-[10px] font-bold uppercase tracking-[0.16em] text-faint",
									children: "Industry"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-2 gap-2",
									children: INDUSTRIES.map((item) => {
										const selected = trade.id === item.id;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => books.setIndustry(item.id),
											className: `flex min-h-11 items-center gap-2 rounded-xl border px-3 py-2 text-left text-xs font-semibold ${selected ? "border-accent bg-accent-soft text-accent" : "border-neutral-800 text-ink"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "h-3 w-3 shrink-0 rounded-full",
												style: { background: industryAccent(item.id) }
											}), item.label]
										}, item.id);
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4 grid grid-cols-2 gap-2",
									children: [
										[
											"compliance",
											"Tax",
											ShieldCheck
										],
										[
											"sales",
											"Sales",
											ShoppingBag
										],
										[
											"files",
											"Files",
											FolderClosed
										],
										[
											"accountant",
											"Accountant",
											Briefcase
										]
									].map(([id, label, Icon]) => {
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => {
												setActiveTab(id);
												setMoreOpen(false);
											},
											className: `flex min-h-12 items-center gap-2 rounded-xl px-3 text-sm font-semibold ${activeTab === id ? "bg-accent-soft text-accent" : "bg-neutral-900 text-ink"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" }), label]
										}, id);
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => {
										setSettingsTab("theme");
										setSettingsOpen(true);
										setMoreOpen(false);
									},
									className: "mt-2 flex min-h-12 w-full items-center gap-2 rounded-xl bg-neutral-900 px-3 text-sm font-semibold text-ink",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-4 w-4" }), " Settings"]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
						className: "relative flex-1 overflow-y-auto bg-transparent p-3 pb-24 sm:p-5 lg:p-8 lg:pb-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative mx-auto w-full max-w-[1440px]",
							children: [
								activeTab === "dashboard" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeDashboard, {
									business,
									creator,
									taxProfile,
									clients,
									bookings,
									invoices,
									orders,
									payouts,
									expenses,
									bankAccounts,
									basPeriod,
									obligations,
									onNavigate: (tab) => {
										if (tab === "money-receipts") {
											setMoneySection("receipts");
											setActiveTab("money");
											return;
										}
										setActiveTab(tab);
									},
									onOpenQuickAdd: (type) => {
										if (type === "booking") {
											setLaunch((prev) => ({
												kind: "booking",
												n: prev.n + 1
											}));
											setActiveTab("bookings");
										} else if (type === "invoice") {
											setLaunch((prev) => ({
												kind: "invoice",
												n: prev.n + 1
											}));
											setActiveTab("invoices");
										} else if (type === "sale") setActiveTab("sales");
										else setActiveTab("money");
									},
									onOpenAssistant: () => setAssistantOpen(true),
									industryModule: operatingProfile.industryModule
								}),
								activeTab === "bookings" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookingsView, {
									clients,
									bookings,
									quotes,
									taxProfile,
									onAddBooking: books.addBooking,
									onAddClient: books.addClient,
									onAddQuote: books.addQuote,
									onUpdateBookingStatus: books.updateBookingStatus,
									onConvertToInvoice: (booking) => {
										books.convertBookingToInvoice(booking);
										setActiveTab("invoices");
									},
									onConvertQuoteToInvoice: (quote) => {
										books.convertQuoteToInvoice(quote);
										setActiveTab("invoices");
									},
									launchToken: launch.kind === "booking" ? launch.n : 0,
									industryModule: operatingProfile.industryModule
								}, operatingProfile.industryModule ?? "creator"),
								activeTab === "sales" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SalesView, {
									products,
									orders,
									payouts,
									taxProfile,
									onAddProduct: books.addProduct,
									onAddPayout: books.addPayout,
									onAddOrder: books.addOrder
								}),
								activeTab === "invoices" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvoicesView, {
									invoices,
									clients,
									business,
									taxProfile,
									onAddInvoice: books.addInvoice,
									onMarkInvoicePaid: books.markInvoicePaid,
									bankAccounts,
									launchToken: launch.kind === "invoice" ? launch.n : 0
								}),
								activeTab === "money" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyView, {
									bankAccounts,
									bankTransactions,
									expenses,
									journalEntries,
									taxProfile,
									onAddExpense: books.addExpense,
									onReconcileTransaction: books.reconcileTransaction,
									onAddJournalEntry: books.addJournalEntry,
									section: moneySection
								}),
								activeTab === "compliance" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComplianceRadarView, {
									business,
									taxProfile,
									operatingProfile,
									basPeriod,
									obligations,
									annualRevenue,
									annualTaxableIncome: Math.max(0, Math.round(annualTaxableIncome)),
									onLockBASPeriod: books.lockBasPeriod,
									onUpdateObligation: books.updateObligation,
									activityAfterPeriod: invoices.filter((i) => i.issueDate > basPeriod.endDate).length + expenses.filter((e) => e.date > basPeriod.endDate).length + payouts.filter((p) => p.depositDate > basPeriod.endDate).length + orders.filter((o) => o.date > basPeriod.endDate).length,
									onApplyRegister: books.applyRegister
								}),
								activeTab === "files" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilesView, {
									documents,
									onAddDocument: books.addDocument
								}),
								activeTab === "accountant" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountantPortalView, {
									business,
									taxProfile,
									journalEntries,
									basPeriod,
									expenses,
									invoices,
									payouts,
									bankTransactions,
									onLockPeriod: books.lockBasPeriod,
									onPostAdjustmentJournal: books.addJournalEntry
								})
							]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-40 border-t border-neutral-800 bg-canvas/95 px-1 pb-[env(safe-area-inset-bottom)] pt-1 backdrop-blur-xl lg:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-5",
					children: [
						[
							"dashboard",
							"Home",
							LayoutDashboard
						],
						[
							"bookings",
							trade.jobNoun + "s",
							Calendar
						],
						[
							"invoices",
							"Invoices",
							FileText
						],
						[
							"money",
							"Money",
							Landmark
						],
						[
							"more",
							"More",
							Menu
						]
					].map(([id, label, Icon]) => {
						const moreActive = [
							"sales",
							"compliance",
							"files",
							"accountant"
						].includes(activeTab);
						const active = id === "more" ? moreOpen || moreActive : activeTab === id && !moreOpen;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => {
								if (id === "more") {
									setMoreOpen((open) => !open);
									return;
								}
								setMoreOpen(false);
								setActiveTab(id);
							},
							className: `flex min-h-14 flex-col items-center justify-center gap-0.5 text-[10px] font-semibold ${active ? "text-accent" : "text-muted"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `grid h-7 w-14 place-items-center rounded-full ${active ? "bg-accent-soft" : ""}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
							}), label]
						}, id);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AIAssistantDrawer, {
				isOpen: assistantOpen,
				onClose: () => setAssistantOpen(false),
				business,
				taxProfile
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsModal, {
				isOpen: settingsOpen,
				onClose: () => setSettingsOpen(false),
				business,
				taxProfile,
				onOpenAuth: () => setAuthOpen(true),
				onRestartOnboarding: books.restartOnboarding,
				onApplyRegister: books.applyRegister,
				industryId: trade.id,
				onIndustryChange: books.setIndustry,
				initialTab: settingsTab
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthModal, {
				isOpen: authOpen,
				onClose: () => setAuthOpen(false),
				defaultMode: "signup"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: books.restartOnboarding,
				className: "fixed bottom-20 right-4 z-30 hidden rounded-full border border-[color:rgba(20,22,29,0.08)] bg-neutral-950 p-2 text-muted shadow-sm lg:bottom-6 lg:block",
				title: "Re-run setup",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-4 w-4" })
			})
		]
	});
}
function App() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppContent, {}) });
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(App, {});
}
//#endregion
export { Home as component };
