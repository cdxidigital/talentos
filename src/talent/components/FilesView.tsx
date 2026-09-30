import React, { useMemo, useState } from "react";
import { FileText, FolderClosed, Lock, Search, Upload } from "lucide-react";
import type { DocumentRecord } from "../types";

const LABELS: Record<DocumentRecord["category"], string> = {
  receipt: "Receipts",
  contract: "Contracts",
  tax_invoice: "Tax invoices",
  registration: "Registrations",
  asic: "ASIC",
  bank_statement: "Bank statements",
};

interface FilesViewProps {
  documents: DocumentRecord[];
  onAddDocument: (doc: DocumentRecord) => void;
}

export const FilesView: React.FC<FilesViewProps> = ({ documents, onAddDocument }) => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<DocumentRecord["category"] | "all">("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return documents.filter((d) => {
      if (category !== "all" && d.category !== category) return false;
      if (!q) return true;
      return `${d.title} ${d.filename} ${d.category}`.toLowerCase().includes(q);
    });
  }, [documents, query, category]);

  const open = documents.find((d) => d.id === openId) ?? null;

  const onUpload = (file: File | undefined) => {
    if (!file) return;
    const today = new Date().toISOString().slice(0, 10);
    onAddDocument({
      id: `doc-${Date.now()}`,
      title: file.name.replace(/\.[^.]+$/, ""),
      category: "contract",
      filename: file.name,
      fileSize: file.size > 1_000_000 ? `${(file.size / 1_000_000).toFixed(1)} MB` : `${Math.max(1, Math.round(file.size / 1000))} KB`,
      uploadDate: today,
      retentionUntil: `${new Date().getFullYear() + 5}-06-30`,
      isSensitiveVault: /contract|agreement|passport|licence/i.test(file.name),
    });
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">Records</p>
          <h1 className="mt-1 font-display text-2xl font-bold text-ink">Files & retention</h1>
          <p className="mt-1 max-w-xl text-sm text-muted">
            Receipts, contracts, and registrations. ATO records generally stay for five years. Nothing here is sent to a
            third-party drive.
          </p>
        </div>
        <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-bold text-[#fff]">
          <Upload className="h-4 w-4" />
          Add a file
          <input
            type="file"
            className="sr-only"
            onChange={(e) => {
              onUpload(e.target.files?.[0]);
              e.target.value = "";
            }}
          />
        </label>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title or filename"
            className="w-full rounded-xl border border-neutral-800 bg-neutral-950 py-2.5 pl-9 pr-3 text-sm text-ink outline-none focus:border-accent"
          />
        </div>
        <div className="flex gap-1 overflow-x-auto">
          {(["all", "receipt", "contract", "tax_invoice", "registration", "bank_statement", "asic"] as const).map((id) => (
            <button
              key={id}
              onClick={() => setCategory(id)}
              className={`shrink-0 rounded-full px-3 py-2 text-xs font-semibold ${
                category === id ? "bg-accent text-[#fff]" : "bg-neutral-900 text-muted"
              }`}
            >
              {id === "all" ? "All" : LABELS[id]}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="glass rounded-2xl p-10 text-center">
          <FolderClosed className="mx-auto h-8 w-8 text-accent" />
          <p className="mt-3 font-display text-lg font-bold text-ink">Nothing filed yet</p>
          <p className="mt-1 text-sm text-muted">Upload a contract or scan a receipt from Money. It will land here.</p>
        </div>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {filtered.map((doc) => (
            <li key={doc.id}>
              <button
                onClick={() => setOpenId(doc.id)}
                className="glass-interactive flex w-full items-start gap-3 rounded-2xl p-4 text-left"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  {doc.isSensitiveVault ? <Lock className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-semibold text-ink">{doc.title}</span>
                  <span className="mt-0.5 block text-xs text-muted">
                    {LABELS[doc.category]} · {doc.uploadDate} · {doc.fileSize}
                  </span>
                  <span className="mt-1 block text-[11px] text-faint">Keep until {doc.retentionUntil}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center">
          <div className="glass-elevated w-full max-w-lg rounded-2xl p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-accent">{LABELS[open.category]}</p>
            <h2 className="mt-1 font-display text-xl font-bold text-ink">{open.title}</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted">File</dt>
                <dd className="font-medium text-ink">{open.filename}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Added</dt>
                <dd className="text-ink">{open.uploadDate}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Retain until</dt>
                <dd className="text-ink">{open.retentionUntil}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Vault</dt>
                <dd className="text-ink">{open.isSensitiveVault ? "Sensitive" : "Standard"}</dd>
              </div>
            </dl>
            <p className="mt-4 text-xs leading-5 text-muted">
              This preview stores the record in your browser. Original scans stay attached to the expense when you capture
              them in Money.
            </p>
            <button
              onClick={() => setOpenId(null)}
              className="mt-5 w-full rounded-xl bg-accent py-2.5 text-sm font-bold text-[#fff]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
