import type { EntityType } from "../types";

export interface AbrRecord {
  found: boolean;
  legalName: string;
  status: string;
  active: boolean;
  entityTypeLabel: string;
  entityType?: EntityType;
  gstText: string;
  gstRegistered: boolean;
  location: string;
  message: string;
}

function clean(value: string): string {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function cell(html: string, label: string): string {
  const pattern = new RegExp(`${label}[\\s\\S]*?<td>([\\s\\S]*?)</td>`, "i");
  const match = html.match(pattern);
  return match ? clean(match[1]) : "";
}

export function entityTypeFromLabel(label: string): EntityType | undefined {
  const text = label.toLowerCase();
  if (text.includes("sole trader") || text.includes("individual")) return "sole_trader";
  if (text.includes("partnership")) return "partnership";
  if (text.includes("trust")) return "trust";
  if (text.includes("company") || text.includes("proprietary")) return "company";
  return undefined;
}

/** Reads the public ABN Lookup details page. Lodgement is not part of this record. */
export function parseAbrHtml(html: string): AbrRecord {
  const missing = html.match(/No record found matching ABN[^<]*/i);
  if (missing) {
    return {
      found: false,
      legalName: "",
      status: "",
      active: false,
      entityTypeLabel: "",
      gstText: "",
      gstRegistered: false,
      location: "",
      message: clean(missing[0]),
    };
  }

  const named = html.match(/itemprop="legalName">([^<]+)/i);
  const legalName = clean(named?.[1] ?? "");
  const status = cell(html, "ABN status:");
  const entityTypeLabel = cell(html, "Entity type:");
  const gstText = cell(html, "Services Tax \\(GST\\):");
  const location = cell(html, "Main business location:");
  const gstRegistered = /registered/i.test(gstText) && !/not currently registered/i.test(gstText);

  if (!legalName && !status) {
    return {
      found: false,
      legalName: "",
      status: "",
      active: false,
      entityTypeLabel: "",
      gstText: "",
      gstRegistered: false,
      location: "",
      message: "The register page did not include a business record.",
    };
  }

  return {
    found: true,
    legalName,
    status,
    active: /^active/i.test(status),
    entityTypeLabel,
    entityType: entityTypeFromLabel(entityTypeLabel),
    gstText,
    gstRegistered,
    location,
    message: status || "Record found on ABN Lookup.",
  };
}
