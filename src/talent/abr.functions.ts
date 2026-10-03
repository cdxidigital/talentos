import { createServerFn } from "@tanstack/react-start";
import { parseAbrHtml, type AbrRecord } from "./lib/abrParse";
import { validateAustralianABN } from "./utils/taxAndRegulatoryEngine";

export interface AbrLookup extends AbrRecord {
  abn: string;
  formatted: string;
  source: "abr" | "checksum";
  lookupUrl: string;
  checkedAt: string;
}

function asAbn(input: unknown): string {
  if (typeof input === "string") return input;
  if (input && typeof input === "object" && "abn" in input) return String((input as { abn: unknown }).abn ?? "");
  return "";
}

export const lookupAbn = createServerFn({ method: "POST" })
  .validator(asAbn)
  .handler(async ({ data }): Promise<AbrLookup> => {
    const check = validateAustralianABN(data);
    const digits = check.formatted.replace(/\s/g, "");
    const lookupUrl = `https://abr.business.gov.au/ABN/View?id=${digits}`;
    const checkedAt = new Date().toISOString();
    if (!check.isValid) {
      return {
        abn: digits,
        formatted: check.formatted,
        found: false,
        legalName: "",
        status: "",
        active: false,
        entityTypeLabel: "",
        gstText: "",
        gstRegistered: false,
        location: "",
        message: check.error ?? "That is not a valid ABN.",
        source: "checksum",
        lookupUrl,
        checkedAt,
      };
    }

    try {
      const res = await fetch(lookupUrl, {
        headers: {
          Accept: "text/html",
          "User-Agent": "TalentOS/1.0 (public ABN Lookup read)",
        },
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) throw new Error(`ABR answered ${res.status}`);
      const html = await res.text();
      const record = parseAbrHtml(html);
      return { ...record, abn: digits, formatted: check.formatted, source: "abr", lookupUrl, checkedAt };
    } catch {
      return {
        abn: digits,
        formatted: check.formatted,
        found: false,
        legalName: "",
        status: "",
        active: false,
        entityTypeLabel: "",
        gstText: "",
        gstRegistered: false,
        location: "",
        message: "The number passes the checksum, but ABN Lookup did not answer. Try the register link.",
        source: "checksum",
        lookupUrl,
        checkedAt,
      };
    }
  });
