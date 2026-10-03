import { t as createServerFn } from "./ssr.mjs";
import { a as validateAustralianABN } from "./taxAndRegulatoryEngine-C7FfSM1R.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/abr.functions-IDlS7T18.js
function clean(value) {
	return value.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&/g, "&").replace(/&#39;/g, "'").replace(/\s+/g, " ").trim();
}
function cell(html, label) {
	const pattern = new RegExp(`${label}[\\s\\S]*?<td>([\\s\\S]*?)</td>`, "i");
	const match = html.match(pattern);
	return match ? clean(match[1]) : "";
}
function entityTypeFromLabel(label) {
	const text = label.toLowerCase();
	if (text.includes("sole trader") || text.includes("individual")) return "sole_trader";
	if (text.includes("partnership")) return "partnership";
	if (text.includes("trust")) return "trust";
	if (text.includes("company") || text.includes("proprietary")) return "company";
}
/** Reads the public ABN Lookup details page. Lodgement is not part of this record. */
function parseAbrHtml(html) {
	const missing = html.match(/No record found matching ABN[^<]*/i);
	if (missing) return {
		found: false,
		legalName: "",
		status: "",
		active: false,
		entityTypeLabel: "",
		gstText: "",
		gstRegistered: false,
		location: "",
		message: clean(missing[0])
	};
	const legalName = clean(html.match(/itemprop="legalName">([^<]+)/i)?.[1] ?? "");
	const status = cell(html, "ABN status:");
	const entityTypeLabel = cell(html, "Entity type:");
	const gstText = cell(html, "Services Tax \\(GST\\):");
	const location = cell(html, "Main business location:");
	const gstRegistered = /registered/i.test(gstText) && !/not currently registered/i.test(gstText);
	if (!legalName && !status) return {
		found: false,
		legalName: "",
		status: "",
		active: false,
		entityTypeLabel: "",
		gstText: "",
		gstRegistered: false,
		location: "",
		message: "The register page did not include a business record."
	};
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
		message: status || "Record found on ABN Lookup."
	};
}
function asAbn(input) {
	if (typeof input === "string") return input;
	if (input && typeof input === "object" && "abn" in input) return String(input.abn ?? "");
	return "";
}
var lookupAbn_createServerFn_handler = createServerRpc({
	id: "034379341be875c18e9c2b99abd6431701f16ded51965b8d7ede2df2eaf88538",
	name: "lookupAbn",
	filename: "src/talent/abr.functions.ts"
}, (opts) => lookupAbn.__executeServer(opts));
var lookupAbn = createServerFn({ method: "POST" }).validator(asAbn).handler(lookupAbn_createServerFn_handler, async ({ data }) => {
	const check = validateAustralianABN(data);
	const digits = check.formatted.replace(/\s/g, "");
	const lookupUrl = `https://abr.business.gov.au/ABN/View?id=${digits}`;
	const checkedAt = (/* @__PURE__ */ new Date()).toISOString();
	if (!check.isValid) return {
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
		checkedAt
	};
	try {
		const res = await fetch(lookupUrl, {
			headers: {
				Accept: "text/html",
				"User-Agent": "TalentOS/1.0 (public ABN Lookup read)"
			},
			signal: AbortSignal.timeout(8e3)
		});
		if (!res.ok) throw new Error(`ABR answered ${res.status}`);
		return {
			...parseAbrHtml(await res.text()),
			abn: digits,
			formatted: check.formatted,
			source: "abr",
			lookupUrl,
			checkedAt
		};
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
			checkedAt
		};
	}
});
//#endregion
export { lookupAbn_createServerFn_handler };
