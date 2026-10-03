import React, { useState } from "react";
import { ExternalLink } from "lucide-react";
import { lookupAbn, type AbrLookup } from "../abr.functions";

interface AbnCheckProps {
  abn: string;
  booksName?: string;
  onUse?: (hit: AbrLookup) => void;
}

export const AbnCheck: React.FC<AbnCheckProps> = ({ abn, booksName, onUse }) => {
  const [hit, setHit] = useState<AbrLookup | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

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

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-3 text-xs text-neutral-300">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p>Checks the public ABN Lookup record. It does not lodge anything with the ATO.</p>
        <button
          type="button"
          onClick={() => void run()}
          disabled={busy || abn.replace(/\D/g, "").length < 11}
          className="rounded-lg bg-accent px-3 py-2 text-xs font-semibold text-[#fff] disabled:opacity-40"
        >
          {busy ? "Checking…" : "Check the register"}
        </button>
      </div>
      {error && <p className="mt-2 text-rose-300">{error}</p>}
      {hit && (
        <div className="mt-3 space-y-1">
          <p className="font-semibold text-white">{hit.found ? hit.legalName : "No public record"}</p>
          <p>{hit.message}</p>
          {hit.found && (
            <>
              <p>{hit.entityTypeLabel}</p>
              <p>{hit.gstText}</p>
              {hit.location && <p>Location {hit.location}</p>}
            </>
          )}
          {mismatch && (
            <p className="text-amber-300">Your books say {booksName}. The register says {hit.legalName}.</p>
          )}
          <div className="flex flex-wrap gap-2 pt-2">
            <a href={hit.lookupUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-semibold text-accent">
              Open ABN Lookup <ExternalLink className="h-3 w-3" />
            </a>
            {hit.found && onUse && (
              <button type="button" onClick={() => onUse(hit)} className="font-semibold text-ink underline-offset-2 hover:underline">
                Use this record on the books
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
