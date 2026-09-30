export interface LexSource {
  title: string;
  uri: string;
}

export interface LexAnswer {
  reply: string;
  sources: LexSource[];
}

const ATO = "https://www.ato.gov.au";

/** Offline answers so Lex still helps when the model is unavailable. */
export function localLexAnswer(question: string, gstRegistered: boolean): LexAnswer {
  const q = question.toLowerCase();

  if (q.includes("gst") && (q.includes("75") || q.includes("register") || q.includes("threshold"))) {
    return {
      reply:
        "You must register for GST once your GST turnover hits $75,000 in a 12-month period (or you expect it to). You can register earlier. Until you are registered, do not issue a document titled Tax Invoice and do not add GST on top.\n\n" +
        (gstRegistered
          ? "Your books are marked GST registered, so brand invoices should be tax invoices showing your ABN, the GST amount, and the words Tax Invoice."
          : "Your profile is not GST registered yet. Keep an eye on rolling 12-month turnover in Money and Compliance."),
      sources: [
        { title: "ATO — Registering for GST", uri: `${ATO}/businesses-and-organisations/gst-excise-and-indirect-taxes/gst/registering-gst` },
      ],
    };
  }

  if (q.includes("super") || q.includes("videographer") || q.includes("contractor")) {
    return {
      reply:
        "From 1 July 2025 the super guarantee is 12% of ordinary time earnings. You may have to pay super for a contractor if you pay them mainly for their labour, even if they have an ABN. Paying an invoice to a company or a genuine business that brings their own gear and can delegate the work is often different — that is a business-to-business expense, not wages.\n\nIf you are unsure about a regular editor or videographer, treat it as review-required and ask your tax agent before the quarter closes. Super is paid through SuperStream, not by adding it as GST.",
      sources: [
        { title: "ATO — Super for contractors", uri: `${ATO}/businesses-and-organisations/super-for-employers/work-out-if-you-have-to-pay-super` },
        { title: "ATO — Super guarantee rate", uri: `${ATO}/tax-rates-and-codes/key-superannuation-rates-and-thresholds/super-guarantee` },
      ],
    };
  }

  if (q.includes("onlyfans") || q.includes("platform") || q.includes("youtube") || q.includes("20%")) {
    return {
      reply:
        "Record the gross the fan or advertiser paid, then the platform fee as a separate expense. If OnlyFans (or YouTube) takes 20%, your income is the gross and the 20% is a deductible platform fee — not a reduction you hide inside the deposit.\n\nOn a cash basis, the amount that matters for BAS timing is when the net hits your bank, but the fee is still a purchase you can claim if it relates to your business. Reconcile the bank deposit to the payout, not to a made-up net-only invoice.",
      sources: [
        { title: "ATO — Income of content creators", uri: `${ATO}/businesses-and-organisations/income-deductions-and-concessions/in-detail/content-creators` },
      ],
    };
  }

  if (q.includes("camera") || q.includes("laptop") || q.includes("claim") || q.includes("deduct") || q.includes("80%")) {
    return {
      reply:
        "Gear is deductible only to the extent you use it to earn income. A camera or laptop used 80% for brand work and 20% privately is an 80% claim — keep a simple note of that split. Immediate deduction vs depreciation depends on the cost and the current instant asset write-off settings for your entity. Do not claim private travel, ordinary clothing, or makeup that you would have bought anyway.\n\nCostumes, studio hire, props, and editing software used for paid work are the usual high-confidence claims. Attach the receipt in Money so your accountant can see the supplier and ABN.",
      sources: [
        { title: "ATO — Deductions for content creators", uri: `${ATO}/businesses-and-organisations/income-deductions-and-concessions/in-detail/content-creators` },
      ],
    };
  }

  if (q.includes("usage") || q.includes("exclusiv") || q.includes("charge") || q.includes("rights") || q.includes("contract")) {
    return {
      reply:
        "Usage is a separate commercial right, not a free extra on the shoot fee. A practical split for Australian brand work:\n\n• Production / talent fee for the deliverables themselves\n• Organic usage (your channels) — usually included for 30 days\n• Paid digital usage — price a percentage of the talent fee per 30 days (a common band is 25–50% of the fee for 90 days, more for whitelisting or national OOH)\n• Exclusivity — charge for the category and the months you cannot work with competitors\n\nPut usage, territory, whitelisting, and exclusivity on the quote before you convert it to a tax invoice. A quote is not an invoice.",
      sources: [
        { title: "ATO — Tax invoices", uri: `${ATO}/businesses-and-organisations/gst-excise-and-indirect-taxes/gst/tax-invoices` },
      ],
    };
  }

  if (q.includes("bas") || q.includes("quarter")) {
    return {
      reply:
        "A quarterly BAS for a cash-basis creator mainly reports G1 total sales and 1A GST on sales, then 1B GST credits on business purchases. Net GST is 1A minus 1B. PAYG withholding (W1/W2) only applies if you have employees or contractors you withhold from.\n\nLock the period in Compliance once the bank is reconciled. Do not lodge from TalentOS — this prepares the figures for you or your tax agent.",
      sources: [{ title: "ATO — BAS", uri: `${ATO}/businesses-and-organisations/gst-excise-and-indirect-taxes/gst/lodging-your-bas` }],
    };
  }

  return {
    reply:
      "I can help with GST registration, tax invoices, the 12% super guarantee, platform-fee splits, gear apportionment, and usage-rights pricing.\n\nAsk a specific question about your books. I am a guide grounded in public ATO material, not your registered tax agent — lodge and legal decisions stay with you and your accountant.",
    sources: [{ title: "ATO — Business", uri: `${ATO}/businesses-and-organisations` }],
  };
}
