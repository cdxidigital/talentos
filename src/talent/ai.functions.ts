import { createServerFn } from "@tanstack/react-start";
import { localLexAnswer, type LexAnswer } from "./lib/lexLocal";

interface LexMessage {
  role: "user" | "assistant";
  content: string;
}

interface LexInput {
  messages: LexMessage[];
  context: {
    legalName: string;
    abn: string;
    entityType: string;
    gstRegistered: boolean;
  };
}

const ATO_SOURCES = [
  {
    title: "ATO — GST registration",
    uri: "https://www.ato.gov.au/businesses-and-organisations/gst-excise-and-indirect-taxes/gst/registering-gst",
  },
  {
    title: "ATO — Tax invoices",
    uri: "https://www.ato.gov.au/businesses-and-organisations/gst-excise-and-indirect-taxes/gst/tax-invoices",
  },
  {
    title: "ATO — Content creators",
    uri: "https://www.ato.gov.au/businesses-and-organisations/income-deductions-and-concessions/in-detail/content-creators",
  },
];

function asLexInput(input: unknown): LexInput {
  const raw = (input ?? {}) as Partial<LexInput>;
  const messages = Array.isArray(raw.messages) ? raw.messages : [];
  return {
    messages: messages.slice(-8).map((m) => ({
      role: m?.role === "user" ? "user" : "assistant",
      content: String(m?.content ?? "").slice(0, 4000),
    })),
    context: {
      legalName: String(raw.context?.legalName ?? "Creator").slice(0, 120),
      abn: String(raw.context?.abn ?? "").slice(0, 20),
      entityType: String(raw.context?.entityType ?? "sole_trader").slice(0, 40),
      gstRegistered: Boolean(raw.context?.gstRegistered),
    },
  };
}

export const askLex = createServerFn({ method: "POST" })
  .validator(asLexInput)
  .handler(async ({ data }): Promise<LexAnswer> => {
    const lastUser = [...data.messages].reverse().find((m) => m.role === "user")?.content ?? "";
    const fallback = localLexAnswer(lastUser, data.context.gstRegistered);
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey || !lastUser) return fallback;

    try {
      const res = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "grok-4.5",
          temperature: 0.3,
          max_tokens: 700,
          messages: [
            {
              role: "system",
              content:
                "You are Lex, a calm Australian creator-business advisor inside TalentOS. " +
                "Answer in plain English for a sole trader or small company. Financial year context is 2026–27. " +
                "GST registration threshold is $75,000 turnover. Super guarantee is 12% from 1 July 2025. " +
                "Never invent ATO ruling numbers, dollar penalties, or legal citations. " +
                "Say you are not a registered tax agent and lodging stays with the user or their agent. " +
                "Use short paragraphs and bullets. No markdown headings. " +
                `Creator: ${data.context.legalName}, ABN ${data.context.abn || "not set"}, ` +
                `${data.context.entityType.replaceAll("_", " ")}, GST registered: ${data.context.gstRegistered ? "yes" : "no"}.`,
            },
            ...data.messages,
          ],
        }),
      });
      if (!res.ok) return fallback;
      const body = (await res.json()) as { choices?: { message?: { content?: string } }[] };
      const text = body.choices?.[0]?.message?.content?.trim();
      if (!text) return fallback;
      return { reply: text, sources: fallback.sources.length ? fallback.sources : ATO_SOURCES.slice(0, 1) };
    } catch {
      return fallback;
    }
  });

const CATEGORIES = [
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
  "Other Expenses",
] as const;

export interface ParsedReceipt {
  supplier: string;
  supplierAbn: string;
  date: string;
  description: string;
  category: (typeof CATEGORIES)[number];
  grossAmount: number;
  gstAmount: number;
  netAmount: number;
  suggestedBusinessUsePercentage: number;
  deductibilityConfidence: "HIGH" | "REVIEW" | "RULE_DEPENDENT";
  taxNotes: string;
}

function blankReceipt(): ParsedReceipt {
  const today = new Date().toISOString().slice(0, 10);
  return {
    supplier: "",
    supplierAbn: "",
    date: today,
    description: "",
    category: "Other Expenses",
    grossAmount: 0,
    gstAmount: 0,
    netAmount: 0,
    suggestedBusinessUsePercentage: 100,
    deductibilityConfidence: "REVIEW",
    taxNotes: "Lex could not read this image. Type the supplier and amount before saving.",
  };
}

export const parseReceipt = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const raw = (input ?? {}) as { imageBase64?: string };
    const image = String(raw.imageBase64 ?? "");
    if (!image.startsWith("data:image/")) throw new Error("Upload a JPEG or PNG receipt.");
    if (image.length > 1_400_000) throw new Error("That photo is too large. Retake it closer, or enter the expense by hand.");
    return { imageBase64: image };
  })
  .handler(async ({ data }): Promise<ParsedReceipt> => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return {
        ...blankReceipt(),
        taxNotes: "Receipt reading is unavailable right now. Fill in the supplier, date, and amount, then save.",
      };
    }

    try {
      const res = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "grok-4.5",
          temperature: 0,
          max_tokens: 500,
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text:
                    "Read this Australian receipt or tax invoice. Reply with ONLY JSON: " +
                    '{"supplier":"","supplierAbn":"","date":"YYYY-MM-DD","description":"","category":"Other Expenses","grossAmount":0,"gstAmount":0,"netAmount":0,"suggestedBusinessUsePercentage":100,"deductibilityConfidence":"REVIEW","taxNotes":""}. ' +
                    `category must be one of: ${CATEGORIES.join(", ")}. ` +
                    "Amounts are numbers in AUD. GST is typically gross/11 when GST is shown. " +
                    "ABN is 11 digits if printed, else empty. If unreadable, leave supplier empty and grossAmount 0.",
                },
                { type: "image_url", image_url: { url: data.imageBase64 } },
              ],
            },
          ],
        }),
      });
      if (!res.ok) return blankReceipt();
      const body = (await res.json()) as { choices?: { message?: { content?: string } }[] };
      const text = body.choices?.[0]?.message?.content ?? "";
      const jsonStart = text.indexOf("{");
      const jsonEnd = text.lastIndexOf("}");
      if (jsonStart < 0 || jsonEnd < jsonStart) return blankReceipt();
      const parsed = JSON.parse(text.slice(jsonStart, jsonEnd + 1)) as Partial<ParsedReceipt>;
      const gross = Number(parsed.grossAmount) || 0;
      const gst = Number(parsed.gstAmount) || 0;
      const category = CATEGORIES.includes(parsed.category as (typeof CATEGORIES)[number])
        ? (parsed.category as (typeof CATEGORIES)[number])
        : "Other Expenses";
      const confidence = ["HIGH", "REVIEW", "RULE_DEPENDENT"].includes(String(parsed.deductibilityConfidence))
        ? (parsed.deductibilityConfidence as ParsedReceipt["deductibilityConfidence"])
        : "REVIEW";
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
        taxNotes: String(parsed.taxNotes ?? "Check the supplier ABN and business-use split before you claim this.").slice(0, 400),
      };
    } catch {
      return blankReceipt();
    }
  });
