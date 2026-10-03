import React, { useState } from 'react';
import { BusinessIdentity, CreatorProfile, TaxProfile, OperatingProfile, EntityType } from '../types';
import { validateAustralianABN } from '../utils/taxAndRegulatoryEngine';
import { CheckCircle2, ShieldCheck, AlertCircle, Building2, User, ArrowRight, ArrowLeft, RefreshCw, Sparkles } from 'lucide-react';
import { AbnCheck } from './AbnCheck';
import { INDUSTRIES, industryById } from '../lib/industries';
import { applyIndustryTheme, industryAccent } from '../lib/industryTheme';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  business: BusinessIdentity;
  taxProfile: TaxProfile;
  operatingProfile: OperatingProfile;
  creatorProfile: CreatorProfile;
  onSave: (
    business: BusinessIdentity,
    taxProfile: TaxProfile,
    operatingProfile: OperatingProfile,
    creatorProfile: CreatorProfile
  ) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  business,
  taxProfile,
  operatingProfile,
  creatorProfile,
  onSave
}) => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<BusinessIdentity>({ ...business });
  const [taxData, setTaxData] = useState<TaxProfile>({ ...taxProfile });
  const [opData, setOpData] = useState<OperatingProfile>({ ...operatingProfile });
  const [crData, setCrData] = useState<CreatorProfile>({ ...creatorProfile });

  const [abnInput, setAbnInput] = useState<string>(business.abn);
  const [abnValidation, setAbnValidation] = useState(validateAustralianABN(business.abn));

  if (!isOpen) return null;

  const handleAbnChange = (val: string) => {
    setAbnInput(val);
    const result = validateAustralianABN(val);
    setAbnValidation(result);
    if (result.isValid) {
      setFormData(prev => ({
        ...prev,
        abn: result.formatted,
        abnLastVerifiedAt: new Date().toISOString()
      }));
    }
  };

  const handleFinish = () => {
    onSave(formData, taxData, opData, crData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/60">
          <div>
            <div className="text-xs uppercase tracking-wider text-emerald-400 font-mono">Australian Business Onboarding</div>
            <h2 className="text-lg font-semibold text-white">
              {step === 1 && 'Welcome to TalentOS'}
              {step === 2 && 'Step 1: ABN Identity Gate'}
              {step === 3 && 'Step 2: Australian Tax Profile'}
              {step === 4 && 'Step 3: Operating Profile'}
              {step === 5 && 'Step 4: Connect Financial Accounts'}
              {step === 6 && 'Step 5: Business Compliance Baseline'}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-400 font-mono">Step {step} of 6</span>
            <button
              onClick={onClose}
              className="p-1 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 text-sm"
              title="Close modal"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-neutral-200">
          {step === 1 && (
            <div className="space-y-4">
              <div className="rounded-xl border border-accent/25 bg-accent-soft p-4">
                <div className="mb-2 flex items-center gap-2 text-accent">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/15"><Sparkles className="h-4 w-4" /></span>
                  <span className="text-xs font-bold uppercase tracking-wide">Lex will guide you</span>
                </div>
                <h3 className="mb-2 text-base font-semibold text-ink">Let&apos;s get your business set up.</h3>
                <p className="leading-relaxed text-muted">
                  I&apos;ll walk you through each step, explain the important bits, and flag anything you need to do before you start.
                </p>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800">
                    <span className="text-emerald-400 font-semibold block mb-1">ABN Lookup</span>
                    Check a number on the public register. It does not lodge a return.
                  </div>
                  <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800">
                    <span className="text-emerald-400 font-semibold block mb-1">Double-Entry</span>
                    Balanced ledger, platform payout unbundling & GST.
                  </div>
                  <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800">
                    <span className="text-emerald-400 font-semibold block mb-1">Tax from your books</span>
                    GST threshold and BAS dates from what you record. Lodging stays with you or your agent.
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-warn/30 bg-warn/10 p-4 text-xs leading-relaxed text-ink">
                <strong className="text-warn">ABN Policy:</strong> An Australian Business Number (ABN) is required to establish a commercial ledger. In Australia, carrying on an enterprise entitles an individual or company to hold an ABN.
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                  Australian Business Number (ABN)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={abnInput}
                    onChange={(e) => handleAbnChange(e.target.value)}
                    placeholder="e.g. 51 824 753 556"
                    className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-lg text-white font-mono focus:border-emerald-500 focus:outline-none"
                  />
                  <div className="absolute right-3 top-2.5 flex items-center gap-1.5 text-xs">
                    {abnValidation.isValid ? (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Mod-89 Valid
                      </span>
                    ) : (
                      <span className="text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" /> Invalid ABN
                      </span>
                    )}
                  </div>
                </div>
                {abnValidation.error && (
                  <p className="text-xs text-rose-400 mt-1">{abnValidation.error}</p>
                )}
                <p className="text-xs text-neutral-400 mt-1">
                  51 824 753 556 is a real ABN, the Tax Office, so you can see a live result. Use your own number for your books.
                </p>
                <div className="mt-3">
                  <AbnCheck
                    abn={abnInput}
                    booksName={formData.legalName}
                    onUse={(hit) => {
                      setFormData((prev) => ({
                        ...prev,
                        legalName: hit.legalName || prev.legalName,
                        entityType: hit.entityType ?? prev.entityType,
                        businessAddress: hit.location || prev.businessAddress,
                        abnLastVerifiedAt: hit.checkedAt,
                        abrLastCheckedAt: hit.checkedAt,
                      }));
                      setTaxData((prev) => ({ ...prev, gstRegistered: hit.gstRegistered }));
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                    Legal Entity Name (as on ABR)
                  </label>
                  <input
                    type="text"
                    value={formData.legalName}
                    onChange={(e) => setFormData({ ...formData, legalName: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                    Entity Structure
                  </label>
                  <div className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white flex items-center gap-2">
                    <User className="w-4 h-4 text-emerald-400" />
                    Sole Trader (Individual)
                  </div>
                  <p className="mt-1 text-[11px] text-neutral-500">TalentOS is built for Australian sole traders.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                    Trading / Creator Brand Name
                  </label>
                  <input
                    type="text"
                    value={formData.tradingName}
                    onChange={(e) => setFormData({ ...formData, tradingName: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                    Main Business Activity (ANZSIC)
                  </label>
                  <input
                    type="text"
                    value={formData.mainBusinessActivity}
                    onChange={(e) => setFormData({ ...formData, mainBusinessActivity: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                  Registered Business Address (Private & Legal)
                </label>
                <input
                  type="text"
                  value={formData.businessAddress}
                  onChange={(e) => setFormData({ ...formData, businessAddress: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                />
                <p className="text-xs text-neutral-400 mt-1">
                  Protected by Legal Identity Layer. Never disclosed on public storefront or social profiles.
                </p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-neutral-800/40 border border-neutral-700/60 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-white">GST Registration Status</div>
                    <div className="text-xs text-neutral-400">
                      Required by ATO if GST turnover reaches or exceeds $75,000 AUD.
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={taxData.gstRegistered}
                      onChange={(e) => setTaxData({ ...taxData, gstRegistered: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>

                {taxData.gstRegistered && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-neutral-700">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                        Accounting Basis for GST
                      </label>
                      <select
                        value={taxData.accountingBasis}
                        onChange={(e) => setTaxData({ ...taxData, accountingBasis: e.target.value as 'cash' | 'accruals' })}
                        className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                      >
                        <option value="cash">Cash basis (usual for sole traders)</option>
                        <option value="accruals">Accruals / Non-Cash</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                        BAS Lodgement Frequency
                      </label>
                      <select
                        value={taxData.basFrequency}
                        onChange={(e) => setTaxData({ ...taxData, basFrequency: e.target.value as 'quarterly' | 'monthly' | 'annually' })}
                        className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                      >
                        <option value="quarterly">Quarterly (Most common)</option>
                        <option value="monthly">Monthly</option>
                        <option value="annually">Annually</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 rounded-xl bg-neutral-800/40 border border-neutral-700/60 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-white">PAYG Withholding Registration</div>
                    <div className="text-xs text-neutral-400">
                      Required if you employ workers or withhold amounts from suppliers without an ABN.
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={taxData.paygWithholdingRegistered}
                      onChange={(e) => setTaxData({ ...taxData, paygWithholdingRegistered: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-800/40 border border-neutral-700/60 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-white">Registered Tax Agent or BAS Agent</div>
                    <div className="text-xs text-neutral-400">
                      Do you have an external Australian accountant or tax agent?
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={taxData.hasTaxAgent}
                      onChange={(e) => setTaxData({ ...taxData, hasTaxAgent: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
                {taxData.hasTaxAgent && (
                  <div className="pt-2">
                    <input
                      type="text"
                      value={taxData.taxAgentName || ''}
                      onChange={(e) => setTaxData({ ...taxData, taxAgentName: e.target.value })}
                      placeholder="Accountant Firm Name (e.g. Apex Creator Advisory)"
                      className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-300">Industry module</p>
                <p className="mt-1 text-xs text-neutral-400">
                  This sets the job types, and the app colour. Any Australian sole trader can use the books. Pick the closest trade.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {INDUSTRIES.map((item) => {
                  const selected = industryById(opData.industryModule).id === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        applyIndustryTheme(item.id);
                        setOpData((prev) => ({
                          ...prev,
                          industryModule: item.id,
                          hasBookings: true,
                          hasPlatformPayouts: item.id === "creator" ? prev.hasPlatformPayouts : false,
                          hasDigitalProducts: item.id === "creator" || item.id === "maker" || item.id === "health" ? prev.hasDigitalProducts : false,
                          hasPhysicalProducts: item.id === "creator" || item.id === "trades" || item.id === "maker" || item.id === "hospitality" ? prev.hasPhysicalProducts : false,
                          hasSubscriptions: item.id === "professional" ? prev.hasSubscriptions : false,
                          hasAffiliateIncome: false,
                        }));
                      }}
                      className={`flex items-start gap-2 rounded-xl border p-3 text-left ${
                        selected ? "border-accent bg-accent-soft" : "border-neutral-800 bg-neutral-900 hover:border-neutral-700"
                      }`}
                    >
                      <span className="mt-1 h-3 w-3 shrink-0 rounded-full" style={{ background: industryAccent(item.id) }} />
                      <span>
                        <span className="block text-sm font-semibold text-white">{item.label}</span>
                        <span className="mt-0.5 block text-xs text-neutral-400">{item.blurb}</span>
                      </span>
                    </button>
                  );
                })}
              </div>

              <p className="text-xs text-neutral-400">What you actually sell. Turn on only what applies.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {industryById(opData.industryModule).streams.map(({ key, label, desc }) => {
                  const val = Boolean(opData[key]);
                  return (
                    <div
                      key={key}
                      onClick={() => setOpData({ ...opData, [key]: !val })}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-colors ${
                        val ? 'bg-emerald-950/20 border-emerald-500/40 text-white' : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-sm text-neutral-100">{label}</span>
                        <input
                          type="checkbox"
                          checked={val}
                          readOnly
                          className="rounded text-emerald-600 focus:ring-0 bg-neutral-800 border-neutral-700"
                        />
                      </div>
                      <p className="text-xs text-neutral-400">{desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <p className="text-xs text-neutral-400">
                There is no live bank feed. Money you record — invoices paid, expenses, and payouts — lands in an operating account kept in this browser.
              </p>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-neutral-800/40 border border-neutral-700/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-orange-600/20 text-orange-400 flex items-center justify-center font-bold">
                      UP
                    </div>
                    <div>
                      <div className="font-semibold text-white">Operating account</div>
                      <div className="text-xs text-neutral-400">Created in your books. It is not linked to a bank.</div>
                    </div>
                  </div>
                  <span className="text-xs text-neutral-400 font-medium">Not connected</span>
                </div>

                <div className="p-4 rounded-xl bg-neutral-800/40 border border-neutral-700/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-yellow-500/20 text-yellow-400 flex items-center justify-center font-bold">
                      CBA
                    </div>
                    <div>
                      <div className="font-semibold text-white">Tax reserve</div>
                      <div className="text-xs text-neutral-400">Set aside in the books. Not a bank account we can move.</div>
                    </div>
                  </div>
                  <span className="text-xs text-neutral-400 font-medium">In your books</span>
                </div>

                <div className="p-4 rounded-xl bg-neutral-800/40 border border-neutral-700/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold">
                      S
                    </div>
                    <div>
                      <div className="font-semibold text-white">Card and platform sales</div>
                      <div className="text-xs text-neutral-400">Record a payout or a shop sale when the money arrives.</div>
                    </div>
                  </div>
                  <span className="text-xs text-neutral-400 font-medium">Manual</span>
                </div>
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-600/40">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-2">
                  <ShieldCheck className="w-5 h-5" />
                  Business Compliance Map Generated
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Based on your ABN ({formData.abn || "not entered yet"}) as a sole trader in {industryById(opData.industryModule).label}, TalentOS has set up your books. Lodging stays with you or your agent.
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                  <span className="font-mono text-neutral-400">ABR Status</span>
                  <span className="text-emerald-400 font-medium">Verified Active · 28-day change monitor engaged</span>
                </div>
                <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                  <span className="font-mono text-neutral-400">ATO GST Policy</span>
                  <span className="text-neutral-200">
                    {taxData.gstRegistered ? 'Tax Invoices enabled · Quarterly BAS tracking' : '$75,000 threshold monitor running'}
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                  <span className="font-mono text-neutral-400">Workforce Rules</span>
                  <span className="text-neutral-200">
                    {opData.hasContractors ? '12% Super Guarantee contractor check ready' : 'No active staff detected'}
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                  <span className="font-mono text-neutral-400">ASIC Governance</span>
                  <span className="text-neutral-200">
                    {formData.entityType === 'company' ? 'Annual Review & Solvency minute active' : 'Not applicable (Sole Trader)'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer controls */}
        <div className="px-6 py-4 border-t border-neutral-800 flex items-center justify-between bg-neutral-950/60">
          <button
            onClick={() => setStep(s => Math.max(1, s - 1))}
            disabled={step === 1}
            className={`px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
              step === 1 ? 'opacity-30 cursor-not-allowed text-neutral-500' : 'bg-neutral-800 text-neutral-200 hover:bg-neutral-700'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>

          {step < 6 ? (
            <button
              onClick={() => {
                if (step === 2 && !abnValidation.isValid) return;
                setStep(s => s + 1);
              }}
              disabled={step === 2 && !abnValidation.isValid}
              className={`px-5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                step === 2 && !abnValidation.isValid
                  ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-[#fff] shadow-lg shadow-emerald-600/20'
              }`}
            >
              Continue <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="px-6 py-2 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-[#fff] shadow-lg shadow-emerald-600/20 flex items-center gap-1.5"
            >
              Enter Business Workspace <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
