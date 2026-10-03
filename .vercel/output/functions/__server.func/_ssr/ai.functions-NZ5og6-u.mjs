import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ai.functions-NZ5og6-u.js
var ATO = "https://www.ato.gov.au";
/** Offline answers so Lex still helps when the model is unavailable. */
function localLexAnswer(question, gstRegistered) {
	const q = question.toLowerCase();
	if (q.includes("gst") && (q.includes("75") || q.includes("register") || q.includes("threshold"))) return {
		reply: "You must register for GST once your GST turnover hits $75,000 in a 12-month period (or you expect it to). You can register earlier. Until you are registered, do not issue a document titled Tax Invoice and do not add GST on top.\n\n" + (gstRegistered ? "Your books are marked GST registered, so brand invoices should be tax invoices showing your ABN, the GST amount, and the words Tax Invoice." : "Your profile is not GST registered yet. Keep an eye on rolling 12-month turnover in Money and Compliance."),
		sources: [{
			title: "ATO — Registering for GST",
			uri: `${ATO}/businesses-and-organisations/gst-excise-and-indirect-taxes/gst/registering-gst`
		}]
	};
	if (q.includes("super") || q.includes("videographer") || q.includes("contractor")) return {
		reply: "From 1 July 2025 the super guarantee is 12% of ordinary time earnings. You may have to pay super for a contractor if you pay them mainly for their labour, even if they have an ABN. Paying an invoice to a company or a genuine business that brings their own gear and can delegate the work is often different — that is a business-to-business expense, not wages.\n\nIf you are unsure about a regular editor or videographer, treat it as review-required and ask your tax agent before the quarter closes. Super is paid through SuperStream, not by adding it as GST.",
		sources: [{
			title: "ATO — Super for contractors",
			uri: `${ATO}/businesses-and-organisations/super-for-employers/work-out-if-you-have-to-pay-super`
		}, {
			title: "ATO — Super guarantee rate",
			uri: `${ATO}/tax-rates-and-codes/key-superannuation-rates-and-thresholds/super-guarantee`
		}]
	};
	if (q.includes("onlyfans") || q.includes("platform") || q.includes("youtube") || q.includes("20%")) return {
		reply: "Record the gross the fan or advertiser paid, then the platform fee as a separate expense. If OnlyFans (or YouTube) takes 20%, your income is the gross and the 20% is a deductible platform fee — not a reduction you hide inside the deposit.\n\nOn a cash basis, the amount that matters for BAS timing is when the net hits your bank, but the fee is still a purchase you can claim if it relates to your business. Reconcile the bank deposit to the payout, not to a made-up net-only invoice.",
		sources: [{
			title: "ATO — Income of content creators",
			uri: `${ATO}/businesses-and-organisations/income-deductions-and-concessions/in-detail/content-creators`
		}]
	};
	if (q.includes("camera") || q.includes("laptop") || q.includes("claim") || q.includes("deduct") || q.includes("80%")) return {
		reply: "Gear is deductible only to the extent you use it to earn income. A camera or laptop used 80% for brand work and 20% privately is an 80% claim — keep a simple note of that split. Immediate deduction vs depreciation depends on the cost and the current instant asset write-off settings for your entity. Do not claim private travel, ordinary clothing, or makeup that you would have bought anyway.\n\nCostumes, studio hire, props, and editing software used for paid work are the usual high-confidence claims. Attach the receipt in Money so your accountant can see the supplier and ABN.",
		sources: [{
			title: "ATO — Deductions for content creators",
			uri: `${ATO}/businesses-and-organisations/income-deductions-and-concessions/in-detail/content-creators`
		}]
	};
	if (q.includes("usage") || q.includes("exclusiv") || q.includes("charge") || q.includes("rights") || q.includes("contract")) return {
		reply: "Usage is a separate commercial right, not a free extra on the shoot fee. A practical split for Australian brand work:\n\n• Production / talent fee for the deliverables themselves\n• Organic usage (your channels) — usually included for 30 days\n• Paid digital usage — price a percentage of the talent fee per 30 days (a common band is 25–50% of the fee for 90 days, more for whitelisting or national OOH)\n• Exclusivity — charge for the category and the months you cannot work with competitors\n\nPut usage, territory, whitelisting, and exclusivity on the quote before you convert it to a tax invoice. A quote is not an invoice.",
		sources: [{
			title: "ATO — Tax invoices",
			uri: `${ATO}/businesses-and-organisations/gst-excise-and-indirect-taxes/gst/tax-invoices`
		}]
	};
	if (q.includes("bas") || q.includes("quarter")) return {
		reply: "A quarterly BAS for a cash-basis creator mainly reports G1 total sales and 1A GST on sales, then 1B GST credits on business purchases. Net GST is 1A minus 1B. PAYG withholding (W1/W2) only applies if you have employees or contractors you withhold from.\n\nLock the period in Compliance once the bank is reconciled. Do not lodge from TalentOS — this prepares the figures for you or your tax agent.",
		sources: [{
			title: "ATO — BAS",
			uri: `${ATO}/businesses-and-organisations/gst-excise-and-indirect-taxes/gst/lodging-your-bas`
		}]
	};
	return {
		reply: "I can help with GST registration, tax invoices, the 12% super guarantee, platform-fee splits, gear apportionment, and usage-rights pricing.\n\nAsk a specific question about your books. I am a guide grounded in public ATO material, not your registered tax agent — lodge and legal decisions stay with you and your accountant.",
		sources: [{
			title: "ATO — Business",
			uri: `${ATO}/businesses-and-organisations`
		}]
	};
}
var ATO_SOURCES = [
	{
		title: "ATO — GST registration",
		uri: "https://www.ato.gov.au/businesses-and-organisations/gst-excise-and-indirect-taxes/gst/registering-gst"
	},
	{
		title: "ATO — Tax invoices",
		uri: "https://www.ato.gov.au/businesses-and-organisations/gst-excise-and-indirect-taxes/gst/tax-invoices"
	},
	{
		title: "ATO — Content creators",
		uri: "https://www.ato.gov.au/businesses-and-organisations/income-deductions-and-concessions/in-detail/content-creators"
	}
];
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
var askLex_createServerFn_handler = createServerRpc({
	id: "a2f7dbf14c2714d5eccaa6a4bcb9d44720ebd7d386361f5ccf5faaf86d82c693",
	name: "askLex",
	filename: "src/talent/ai.functions.ts"
}, (opts) => askLex.__executeServer(opts));
var askLex = createServerFn({ method: "POST" }).validator(asLexInput).handler(askLex_createServerFn_handler, async ({ data }) => {
	const lastUser = [...data.messages].reverse().find((m) => m.role === "user")?.content ?? "";
	const fallback = localLexAnswer(lastUser, data.context.gstRegistered);
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey || !lastUser) return fallback;
	try {
		const res = await fetch("https://api.x.ai/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				model: "grok-4.5",
				temperature: .3,
				max_tokens: 700,
				messages: [{
					role: "system",
					content: `You are Lex, a calm Australian creator-business advisor inside TalentOS. Answer in plain English for a sole trader or small company. Financial year context is 2026–27. GST registration threshold is \$75,000 turnover. Super guarantee is 12% from 1 July 2025. Never invent ATO ruling numbers, dollar penalties, or legal citations. Say you are not a registered tax agent and lodging stays with the user or their agent. Use short paragraphs and bullets. No markdown headings. Creator: ${data.context.legalName}, ABN ${data.context.abn || "not set"}, ${data.context.entityType.replaceAll("_", " ")}, GST registered: ${data.context.gstRegistered ? "yes" : "no"}.`
				}, ...data.messages]
			})
		});
		if (!res.ok) return fallback;
		const text = (await res.json()).choices?.[0]?.message?.content?.trim();
		if (!text) return fallback;
		return {
			reply: text,
			sources: fallback.sources.length ? fallback.sources : ATO_SOURCES.slice(0, 1)
		};
	} catch {
		return fallback;
	}
});
var CATEGORIES = [
	"Advertising",
	"Accounting & Legal",
	"Software & Subscriptions",
	"Telecommunications",
	"Photography & Studio",
	"Equipment & Cameras",
	"Costumes & Business Clothing",
	"Props & Styling",
	"Travel & Flights",
	"Accommodation",
	"Motor Vehicle",
	"Insurance",
	"Contractors & Assistants",
	"Platform & Merchant Fees",
	"Bank Fees",
	"Other Expenses"
];
function blankReceipt() {
	return {
		supplier: "",
		supplierAbn: "",
		date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
		description: "",
		category: "Other Expenses",
		grossAmount: 0,
		gstAmount: 0,
		netAmount: 0,
		suggestedBusinessUsePercentage: 100,
		deductibilityConfidence: "REVIEW",
		taxNotes: "Lex could not read this image. Type the supplier and amount before saving."
	};
}
var parseReceipt_createServerFn_handler = createServerRpc({
	id: "9fb1ad3662e2d7cdfe0d2f0c061a122b112706fc74d2b87f97d3c3429df01d16",
	name: "parseReceipt",
	filename: "src/talent/ai.functions.ts"
}, (opts) => parseReceipt.__executeServer(opts));
var parseReceipt = createServerFn({ method: "POST" }).validator((input) => {
	const image = String((input ?? {}).imageBase64 ?? "");
	if (!image.startsWith("data:image/")) throw new Error("Upload a JPEG or PNG receipt.");
	if (image.length > 14e5) throw new Error("That photo is too large. Retake it closer, or enter the expense by hand.");
	return { imageBase64: image };
}).handler(parseReceipt_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		...blankReceipt(),
		taxNotes: "Receipt reading is unavailable right now. Fill in the supplier, date, and amount, then save."
	};
	try {
		const res = await fetch("https://api.x.ai/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				model: "grok-4.5",
				temperature: 0,
				max_tokens: 500,
				messages: [{
					role: "user",
					content: [{
						type: "text",
						text: `Read this Australian receipt or tax invoice. Reply with ONLY JSON: {"supplier":"","supplierAbn":"","date":"YYYY-MM-DD","description":"","category":"Other Expenses","grossAmount":0,"gstAmount":0,"netAmount":0,"suggestedBusinessUsePercentage":100,"deductibilityConfidence":"REVIEW","taxNotes":""}. category must be one of: ${CATEGORIES.join(", ")}. Amounts are numbers in AUD. GST is typically gross/11 when GST is shown. ABN is 11 digits if printed, else empty. If unreadable, leave supplier empty and grossAmount 0.`
					}, {
						type: "image_url",
						image_url: { url: data.imageBase64 }
					}]
				}]
			})
		});
		if (!res.ok) return blankReceipt();
		const text = (await res.json()).choices?.[0]?.message?.content ?? "";
		const jsonStart = text.indexOf("{");
		const jsonEnd = text.lastIndexOf("}");
		if (jsonStart < 0 || jsonEnd < jsonStart) return blankReceipt();
		const parsed = JSON.parse(text.slice(jsonStart, jsonEnd + 1));
		const gross = Number(parsed.grossAmount) || 0;
		const gst = Number(parsed.gstAmount) || 0;
		const category = CATEGORIES.includes(parsed.category) ? parsed.category : "Other Expenses";
		const confidence = [
			"HIGH",
			"REVIEW",
			"RULE_DEPENDENT"
		].includes(String(parsed.deductibilityConfidence)) ? parsed.deductibilityConfidence : "REVIEW";
		return {
			supplier: String(parsed.supplier ?? "").slice(0, 120),
			supplierAbn: String(parsed.supplierAbn ?? "").slice(0, 20),
			date: /^\d{4}-\d{2}-\d{2}$/.test(String(parsed.date)) ? String(parsed.date) : blankReceipt().date,
			description: String(parsed.description ?? "").slice(0, 240),
			category,
			grossAmount: Math.round(gross * 100) / 100,
			gstAmount: Math.round(gst * 100) / 100,
			netAmount: Math.round((Number(parsed.netAmount) || gross - gst) * 100) / 100,
			suggestedBusinessUsePercentage: Math.min(100, Math.max(0, Number(parsed.suggestedBusinessUsePercentage) || 100)),
			deductibilityConfidence: confidence,
			taxNotes: String(parsed.taxNotes ?? "Check the supplier ABN and business-use split before you claim this.").slice(0, 400)
		};
	} catch {
		return blankReceipt();
	}
});
//#endregion
export { askLex_createServerFn_handler, parseReceipt_createServerFn_handler };
