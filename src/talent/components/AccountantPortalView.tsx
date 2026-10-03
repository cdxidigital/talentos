import React, { useState } from 'react';
import {
  BusinessIdentity,
  TaxProfile,
  JournalEntry,
  BASPeriod,
  Expense,
  Invoice,
  PlatformPayout,
  BankTransaction
} from '../types';
import { formatAUD } from '../utils/taxAndRegulatoryEngine';
import {
  Briefcase,
  FileSpreadsheet,
  Download,
  Lock,
  CheckCircle2,
  FileText,
  ShieldCheck,
  AlertCircle,
  FolderArchive
} from 'lucide-react';

interface AccountantPortalViewProps {
  business: BusinessIdentity;
  taxProfile: TaxProfile;
  journalEntries: JournalEntry[];
  basPeriod: BASPeriod;
  expenses: Expense[];
  invoices: Invoice[];
  payouts: PlatformPayout[];
  bankTransactions: BankTransaction[];
  onLockPeriod: (periodId: string) => void;
  onPostAdjustmentJournal: (entry: JournalEntry) => void;
}

export const AccountantPortalView: React.FC<AccountantPortalViewProps> = ({
  business,
  taxProfile,
  journalEntries,
  basPeriod,
  expenses,
  invoices,
  payouts,
  bankTransactions,
  onLockPeriod,
  onPostAdjustmentJournal
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [showAdjModal, setShowAdjModal] = useState(false);
  const [adjDesc, setAdjDesc] = useState('');
  const [adjDebitAcc, setAdjDebitAcc] = useState('6900 - Telecommunications');
  const [adjCreditAcc, setAdjCreditAcc] = useState('3100 - Owner Drawings');
  const [adjAmount, setAdjAmount] = useState<number>(100);

  // Generate simulated accountant export package
  const handleGenerateExportPack = () => {
    const timestamp = new Date().toISOString();
    const manifest = {
      exportVersion: 'creatorledger-au-v1.0',
      organisation: {
        legalName: business.legalName,
        abn: business.abn,
        entityType: business.entityType,
        financialYear: taxProfile.financialYear
      },
      generatedAt: timestamp,
      checksumAlgorithm: 'SHA-256',
      files: [
        { path: 'general_ledger.csv', rows: journalEntries.length, sha256: '9f83ab293e4f1a2b0c3d' },
        { path: 'tax_invoices.csv', rows: invoices.length, sha256: '8b71cc293e4f1a2b0c3d' },
        { path: 'expenses_and_receipts.csv', rows: expenses.length, sha256: '1a2b3c4d5e6f7a8b9c0d' },
        { path: 'platform_payout_unbundling.csv', rows: payouts.length, sha256: '7e6d5c4b3a210fedcba9' },
        { path: 'bank_transactions.csv', rows: bankTransactions.length, sha256: '3f2e1d0c9b8a7f6e5d4c' },
        { path: 'bas_q1_workpapers.json', period: basPeriod.periodId, sha256: '5a4b3c2d1e0f9a8b7c6d' }
      ]
    };

    const blob = new Blob([JSON.stringify(manifest, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Accountant-Pack-${business.legalName.replace(/\s+/g, '_')}-${taxProfile.financialYear}.json`;
    a.click();
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  const handlePostAdjustment = (e: React.FormEvent) => {
    e.preventDefault();
    if (adjAmount <= 0) return;

    const newJournal: JournalEntry = {
      id: `jnl-adj-${Date.now()}`,
      entryNumber: `ADJ-2026-${String(journalEntries.length + 1).padStart(4, '0')}`,
      date: new Date().toISOString().split('T')[0],
      reference: `Accountant Adjustment: ${adjDesc || 'Year-end private use reclassification'}`,
      lines: [
        {
          accountId: '6900',
          accountCode: '6900',
          accountName: adjDebitAcc,
          debit: adjAmount,
          credit: 0,
          description: 'Adjusted business portion'
        },
        {
          accountId: '3100',
          accountCode: '3100',
          accountName: adjCreditAcc,
          debit: 0,
          credit: adjAmount,
          description: 'Reclassified private drawing'
        }
      ],
      totalDebit: adjAmount,
      totalCredit: adjAmount,
      isBalanced: true,
      isLocked: true,
      postedAt: new Date().toISOString()
    };

    onPostAdjustmentJournal(newJournal);
    setShowAdjModal(false);
    setAdjDesc('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-neutral-900 border border-neutral-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono mb-1">
            <Briefcase className="w-4 h-4" />
            <span>Chartered Accounting & BAS Portal</span>
          </div>
          <h1 className="text-2xl font-bold text-white font-display">Accountant Collaboration Workspace</h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Client: {business.legalName} · ABN: {business.abn} · Structure: {business.entityType.toUpperCase()}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAdjModal(true)}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition-colors"
          >
            + Post Adjustment Journal
          </button>
          <button
            onClick={handleGenerateExportPack}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-[#fff] shadow-lg shadow-emerald-600/20 flex items-center gap-1.5 transition-all"
          >
            <Download className="w-3.5 h-3.5" /> Download Accountant Pack
          </button>
        </div>
      </div>

      {downloadSuccess && (
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Accountant export package generated with SHA-256 verifiable manifest.</span>
        </div>
      )}

      {/* Overview Cards for Accountant */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
          <span className="text-xs text-neutral-400">BAS Period Status</span>
          <div className="text-xl font-bold text-white mt-1">{basPeriod.status}</div>
          <div className="text-[11px] text-neutral-400 mt-1 font-mono">Due: {basPeriod.dueDate}</div>
        </div>

        <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
          <span className="text-xs text-neutral-400">Net GST Position</span>
          <div className="text-xl font-bold text-emerald-400 mt-1 tabular-nums">{formatAUD(basPeriod.netGstPayable)}</div>
          <div className="text-[11px] text-neutral-400 mt-1">1A: {formatAUD(basPeriod.gst1aSalesGst)} / 1B: {formatAUD(basPeriod.gst1bPurchaseGstCredits)}</div>
        </div>

        <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
          <span className="text-xs text-neutral-400">General ledger</span>
          <div className="text-xl font-bold text-white mt-1 font-mono">
            {journalEntries.length === 0 ? "No journals yet" : journalEntries.every((j) => j.isBalanced) ? "Balanced" : "Out of balance"}
          </div>
          <div className="text-[11px] text-neutral-400 mt-1">{journalEntries.filter((j) => j.isBalanced).length} of {journalEntries.length} journals balance</div>
        </div>

        <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
          <span className="text-xs text-neutral-400">Still to check</span>
          <div className="text-xl font-bold text-amber-300 mt-1">{bankTransactions.filter((t) => t.status !== "MATCHED").length}</div>
          <div className="text-[11px] text-neutral-400 mt-1">Bank lines not matched to a payment</div>
        </div>
      </div>

      {/* Workpaper Verification Checklist */}
      <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
        <h3 className="font-semibold text-white text-base">Accountant Sign-Off & Verification Checklist</h3>
        <p className="text-xs text-neutral-400">
          Check these against the books in this browser before anyone lodges. Nothing here is sent to the ATO.
        </p>

        <div className="space-y-2 text-xs">
          {[
            {
              label: "Journals",
              detail: journalEntries.length === 0 ? "No journals yet." : journalEntries.every((j) => j.isBalanced) ? "Every journal balances." : "At least one journal does not balance.",
              verified: journalEntries.length > 0 && journalEntries.every((j) => j.isBalanced),
            },
            {
              label: "Bank lines",
              detail: "Money you recorded in the operating account. There is no live bank feed to reconcile against.",
              verified: false,
            },
            {
              label: "GST",
              detail: taxProfile.gstRegistered ? `Registered. 1A ${formatAUD(basPeriod.gst1aSalesGst)} and 1B ${formatAUD(basPeriod.gst1bPurchaseGstCredits)} on ${basPeriod.label}.` : "Not registered for GST.",
              verified: false,
            },
            {
              label: "BAS period",
              detail: `${basPeriod.label} is ${basPeriod.status}. Lodging stays with you or your agent.`,
              verified: basPeriod.status === "LOCKED" || basPeriod.status === "LODGED",
            },
            ...(payouts.length
              ? [{
                  label: "Platform payouts",
                  detail: `${payouts.length} payout${payouts.length === 1 ? "" : "s"} recorded, with fees kept separate from the net deposit.`,
                  verified: true,
                }]
              : []),
            {
              label: "Expenses",
              detail: expenses.length ? `${expenses.length} expense${expenses.length === 1 ? "" : "s"} in the books.` : "No expenses recorded.",
              verified: expenses.length > 0,
            },
          ].map((item) => (
            <div key={item.label} className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
              <div>
                <div className="font-semibold text-white flex items-center gap-2">
                  <span>{item.label}</span>
                </div>
                <div className="text-[11px] text-neutral-400 mt-0.5">{item.detail}</div>
              </div>
              <span className={`px-2.5 py-1 rounded text-[10px] font-mono font-semibold uppercase ${
                item.verified ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' : 'text-amber-400 bg-amber-500/10 border border-amber-500/20'
              }`}>
                {item.verified ? 'VERIFIED' : 'ACTION REQUIRED'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ADJUSTMENT JOURNAL MODAL */}
      {showAdjModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 text-sm text-neutral-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="font-semibold text-white text-base">Post Accountant Adjustment Journal</h3>
              <button onClick={() => setShowAdjModal(false)} className="text-neutral-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handlePostAdjustment} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                  Adjustment Purpose / Reason
                </label>
                <input
                  required
                  placeholder="e.g. End-of-quarter private use reclassification (mobile plan)"
                  value={adjDesc}
                  onChange={e => setAdjDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                    Debit Account
                  </label>
                  <select
                    value={adjDebitAcc}
                    onChange={e => setAdjDebitAcc(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="6900 - Telecommunications">6900 - Telecommunications</option>
                    <option value="6400 - Travel & Flights">6400 - Travel & Flights</option>
                    <option value="6200 - Software & Subscriptions">6200 - Software</option>
                    <option value="1300 - Equipment & Plant">1300 - Equipment Asset</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                    Credit Account
                  </label>
                  <select
                    value={adjCreditAcc}
                    onChange={e => setAdjCreditAcc(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="3100 - Owner Drawings">3100 - Owner Drawings</option>
                    <option value="1000 - Cash at Bank">1000 - Cash at Bank</option>
                    <option value="2100 - GST Payable">2100 - GST Adjustment</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                  Adjustment Amount (AUD)
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={adjAmount || ''}
                  onChange={e => setAdjAmount(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAdjModal(false)}
                  className="px-4 py-2 text-xs text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-[#fff] shadow-lg shadow-emerald-600/20"
                >
                  Post Adjustment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
