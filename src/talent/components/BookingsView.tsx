import React, { useEffect, useState } from 'react';
import { Client, Booking, Quote, Invoice, TaxProfile, BookingStatus, BookingType } from '../types';
import { industryById } from '../lib/industries';
import { formatAUD } from '../utils/taxAndRegulatoryEngine';
import {
  Calendar,
  Users,
  FileCheck,
  Plus,
  ArrowRight,
  Clock,
  Sparkles,
  MapPin,
  CheckCircle2,
  FileText
} from 'lucide-react';

interface BookingsViewProps {
  clients: Client[];
  bookings: Booking[];
  quotes: Quote[];
  taxProfile: TaxProfile;
  onAddBooking: (booking: Booking) => void;
  onAddClient: (client: Client) => void;
  onAddQuote?: (quote: Quote) => void;
  onConvertToInvoice: (booking: Booking) => void;
  onConvertQuoteToInvoice: (quote: Quote) => void;
  onUpdateBookingStatus?: (bookingId: string, status: BookingStatus) => void;
  launchToken?: number;
  industryModule?: string;
}

export const BookingsView: React.FC<BookingsViewProps> = ({
  clients,
  bookings,
  quotes,
  taxProfile,
  onAddBooking,
  onAddClient,
  onAddQuote,
  onConvertToInvoice,
  onConvertQuoteToInvoice,
  onUpdateBookingStatus,
  launchToken = 0,
  industryModule
}) => {
  const trade = industryById(industryModule);
  const [activeTab, setActiveTab] = useState<'bookings' | 'clients' | 'quotes'>('bookings');
  const [showAddBookingModal, setShowAddBookingModal] = useState(false);
  useEffect(() => {
    if (launchToken > 0) {
      setActiveTab('bookings');
      setShowAddBookingModal(true);
    }
  }, [launchToken]);
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // New Booking State
  const [newCampaignName, setNewCampaignName] = useState('');
  const [newClientId, setNewClientId] = useState(clients[0]?.id || '');
  const [newBookingType, setNewBookingType] = useState<BookingType>(trade.types[0].value);
  useEffect(() => {
    if (!trade.types.some((item) => item.value === newBookingType)) {
      setNewBookingType(trade.types[0].value);
    }
  }, [trade, newBookingType]);
  const [newStartDate, setNewStartDate] = useState('');
  const [newEndDate, setNewEndDate] = useState('');
  const [newLocation, setNewLocation] = useState(industryById(industryModule).id === "creator" ? "Sydney Studio / Remote" : "");
  const [newFee, setNewFee] = useState<number>(0);
  const [newDeliverableInput, setNewDeliverableInput] = useState('');
  const [newDeliverables, setNewDeliverables] = useState<string[]>(() =>
    industryById(industryModule).id === "creator"
      ? ["1x Dedicated 60s Reel (IG/TikTok)", "3x In-feed Story Frames with link", "30-day organic digital usage rights"]
      : [],
  );

  const handleAddDeliverable = () => {
    if (!newDeliverableInput.trim()) return;
    setNewDeliverables([...newDeliverables, newDeliverableInput.trim()]);
    setNewDeliverableInput('');
  };

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCampaignName || newFee <= 0 || !newClientId) return;

    const commissionRate = 0.15; // standard talent agency 15%
    const commissionAmount = Math.round(newFee * commissionRate * 100) / 100;
    const gstAmount = taxProfile.gstRegistered ? Math.round((newFee / 11) * 100) / 100 : 0;

    const booking: Booking = {
      id: `bk-${Date.now()}`,
      clientId: newClientId,
      campaignName: newCampaignName,
      bookingType: newBookingType,
      startDate: newStartDate || new Date().toISOString().split('T')[0],
      endDate: newEndDate || new Date().toISOString().split('T')[0],
      location: newLocation,
      isRemote: newLocation.toLowerCase().includes('remote'),
      fee: newFee,
      commissionRate,
      commissionAmount,
      reimbursements: 0,
      gstInclusive: true,
      gstAmount,
      totalAmount: newFee,
      status: 'confirmed',
      deliverables: newDeliverables,
      usageRights: 'Australia & NZ digital media usage rights (90 days)',
      exclusivityMonths: 1
    };

    onAddBooking(booking);
    setShowAddBookingModal(false);
    // Reset
    setNewCampaignName('');
    setNewFee(0);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-display">Bookings, Deliverables & CRM</h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Manage brand collaborations, usage rights, agency commissions, and convert deals to invoices.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 p-1 bg-neutral-900 border border-neutral-800 rounded-xl text-xs">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-3.5 py-1.5 font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'bookings' ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            {trade.jobNoun}s
          </button>
          <button
            onClick={() => setActiveTab('clients')}
            className={`px-3.5 py-1.5 font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'clients' ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-emerald-400" />
            Client CRM
          </button>
          <button
            onClick={() => setActiveTab('quotes')}
            className={`px-3.5 py-1.5 font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'quotes' ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            Quotes ({quotes.length})
          </button>
        </div>
      </div>

      {/* TAB 1: BOOKINGS PIPELINE */}
      {activeTab === 'bookings' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="text-xs text-neutral-400">
              {bookings.length} {trade.jobNoun.toLowerCase()}{bookings.length === 1 ? "" : "s"} in the pipeline
            </div>
            <button
              onClick={() => {
                if (clients.length === 0) {
                  setActiveTab('clients');
                  setShowAddClientModal(true);
                  return;
                }
                setShowAddBookingModal(true);
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-[#fff] shadow-lg shadow-emerald-600/20 flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-3.5 h-3.5" /> New {trade.jobNoun}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookings.map(b => {
              const client = clients.find(c => c.id === b.clientId);
              let statusColor = 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
              if (b.status === 'quote') statusColor = 'text-amber-400 border-amber-500/30 bg-amber-500/10';
              if (b.status === 'invoiced') statusColor = 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10';
              if (b.status === 'paid') statusColor = 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';

              return (
                <div
                  key={b.id}
                  className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between hover:border-neutral-700 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-semibold text-white">{client?.tradingName || 'Direct Client'}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold border ${statusColor}`}>
                        {b.status}
                      </span>
                    </div>
                    {onUpdateBookingStatus && (
                      <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wide text-neutral-500">
                        Stage
                        <select
                          value={b.status}
                          onChange={(e) => onUpdateBookingStatus(b.id, e.target.value as BookingStatus)}
                          className="mt-1 w-full rounded-lg border border-neutral-800 bg-neutral-950 px-2 py-1.5 text-xs font-medium normal-case text-ink"
                        >
                          {(['lead', 'quote', 'negotiation', 'confirmed', 'delivery', 'invoiced', 'paid', 'completed'] as BookingStatus[]).map((status) => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </label>
                    )}

                    <h3 className="font-bold text-white text-base font-display">{b.campaignName}</h3>

                    <div className="flex items-center gap-2 text-xs text-neutral-400 mt-2">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{b.startDate} to {b.endDate}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-neutral-400 mt-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{b.location}</span>
                    </div>

                    <div className="mt-3 pt-3 border-t border-neutral-800/80">
                      <div className="text-[11px] font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                        Deliverables ({b.deliverables.length}):
                      </div>
                      <ul className="text-xs text-neutral-400 space-y-1">
                        {b.deliverables.map((d, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-emerald-400">·</span>
                            <span className="line-clamp-1">{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-neutral-800 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-neutral-400 font-mono">{trade.feeLabel}</div>
                      <div className="text-xl font-bold text-white tabular-nums">{formatAUD(b.fee)}</div>
                      <div className="text-[10px] text-neutral-500">Agency 15%: -{formatAUD(b.commissionAmount)}</div>
                    </div>

                    <div>
                      {b.status !== 'invoiced' && b.status !== 'paid' ? (
                        <button
                          onClick={() => onConvertToInvoice(b)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-[#fff] font-medium text-xs transition-colors flex items-center gap-1 shadow-sm"
                        >
                          Generate Invoice <ArrowRight className="w-3 h-3" />
                        </button>
                      ) : (
                        <span className="text-xs text-cyan-400 font-mono flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Invoiced
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {bookings.length === 0 && (
            <div className="rounded-2xl border border-dashed border-neutral-700 p-10 text-center">
              <p className="font-display text-lg font-bold text-white">No bookings yet</p>
              <p className="mt-1 text-sm text-neutral-400">Add a client, then raise the first deal. You can invoice it in one step.</p>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: CLIENT CRM */}
      {activeTab === 'clients' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="text-xs text-neutral-400">
              {clients.length} brands & agencies in your professional address book
            </div>
            <button
              onClick={() => setShowAddClientModal(true)}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-[#fff] shadow-lg shadow-emerald-600/20 flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-3.5 h-3.5" /> Add Client
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {clients.map(client => (
              <div key={client.id} className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-white text-base">{client.tradingName}</h3>
                    <div className="text-xs text-neutral-400">{client.legalName}</div>
                    {client.abn && (
                      <div className="text-[11px] text-neutral-500 font-mono">ABN {client.abn}</div>
                    )}
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] uppercase font-mono bg-neutral-800 text-neutral-300">
                    {client.clientType}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-neutral-800 text-neutral-300">
                  <div>
                    <span className="text-neutral-500 block text-[10px]">Contact Person:</span>
                    {client.contactName} ({client.email})
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[10px]">Payment Terms:</span>
                    {client.paymentTermsDays} Days
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-xs">
                  <span className="text-neutral-400">Total Lifetime Revenue:</span>
                  <span className="font-bold text-emerald-400 font-mono text-sm tabular-nums">
                    {formatAUD(client.totalLifetimeRevenue)}
                  </span>
                </div>

                {client.notes && (
                  <p className="text-[11px] text-neutral-400 italic bg-neutral-950 p-2.5 rounded-lg border border-neutral-800/60">
                    {client.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: QUOTES */}
      {activeTab === 'quotes' && (
        <QuotesPanel
          quotes={quotes}
          clients={clients}
          taxProfile={taxProfile}
          onConvertQuoteToInvoice={onConvertQuoteToInvoice}
          onAddQuote={onAddQuote}
          onNeedClient={() => {
            setActiveTab('clients');
            setShowAddClientModal(true);
          }}
        />
      )}

      {/* CREATE BOOKING MODAL */}
      {showAddBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 text-sm text-neutral-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="font-semibold text-white text-base">New {trade.jobNoun.toLowerCase()}</h3>
              <button onClick={() => setShowAddBookingModal(false)} className="text-neutral-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateBooking} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                  {trade.titleLabel}
                </label>
                <input
                  type="text"
                  required
                  placeholder={trade.titlePlaceholder}
                  value={newCampaignName}
                  onChange={e => setNewCampaignName(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                    {trade.clientLabel}
                  </label>
                  <select
                    value={newClientId}
                    onChange={e => setNewClientId(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  >
                    {clients.map(c => (
                      <option key={c.id} value={c.id}>{c.tradingName}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                    Booking Type
                  </label>
                  <select
                    value={newBookingType}
                    onChange={e => setNewBookingType(e.target.value as BookingType)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  >
                    {trade.types.map((item) => (
                      <option key={item.value} value={item.value}>{item.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={newStartDate}
                    onChange={e => setNewStartDate(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                    End / Delivery Date
                  </label>
                  <input
                    type="date"
                    value={newEndDate}
                    onChange={e => setNewEndDate(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                  {trade.feeLabel}
                </label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 5000"
                  value={newFee || ''}
                  onChange={e => setNewFee(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                  Deliverables Checklist
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Add deliverable..."
                    value={newDeliverableInput}
                    onChange={e => setNewDeliverableInput(e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddDeliverable}
                    className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-1">
                  {newDeliverables.map((d, i) => (
                    <div key={i} className="text-xs text-neutral-300 flex items-center justify-between bg-neutral-950 p-2 rounded border border-neutral-800">
                      <span>{d}</span>
                      <button
                        type="button"
                        onClick={() => setNewDeliverables(newDeliverables.filter((_, idx) => idx !== i))}
                        className="text-neutral-500 hover:text-rose-400 text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setShowAddBookingModal(false)}
                  className="px-4 py-2 text-xs text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-[#fff] shadow-lg shadow-emerald-600/20"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE CLIENT MODAL */}
      {showAddClientModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 text-sm text-neutral-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="font-semibold text-white text-base">Add New Client or Brand</h3>
              <button onClick={() => setShowAddClientModal(false)} className="text-neutral-400 hover:text-white">✕</button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as any;
                const newClient: Client = {
                  id: `cli-${Date.now()}`,
                  legalName: form.legalName.value,
                  tradingName: form.tradingName.value || form.legalName.value,
                  abn: form.abn.value || undefined,
                  contactName: form.contactName.value,
                  email: form.email.value,
                  clientType: form.clientType.value,
                  billingAddress: form.billingAddress.value || 'Australia',
                  paymentTermsDays: parseInt(form.paymentTermsDays.value) || 14,
                  totalLifetimeRevenue: 0
                };
                onAddClient(newClient);
                setShowAddClientModal(false);
              }}
              className="space-y-3"
            >
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                  Brand / Trading Name
                </label>
                <input
                  name="tradingName"
                  required
                  placeholder="e.g. Bondi Sands"
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                  Legal Entity Name
                </label>
                <input
                  name="legalName"
                  required
                  placeholder="e.g. Bondi Sands Pty Ltd"
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                    Client ABN
                  </label>
                  <input
                    name="abn"
                    placeholder="11 digits"
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                    Client Type
                  </label>
                  <select
                    name="clientType"
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="brand">Brand</option>
                    <option value="agency">Agency</option>
                    <option value="production">Production</option>
                    <option value="retailer">Retailer</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                    Contact Name
                  </label>
                  <input
                    name="contactName"
                    required
                    placeholder="e.g. Jessica May"
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="partnerships@brand.com"
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                  Payment Terms (Days)
                </label>
                <input
                  name="paymentTermsDays"
                  type="number"
                  defaultValue="14"
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddClientModal(false)}
                  className="px-4 py-2 text-xs text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-[#fff] shadow-lg shadow-emerald-600/20"
                >
                  Save Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

function QuotesPanel({
  quotes,
  clients,
  taxProfile,
  onConvertQuoteToInvoice,
  onAddQuote,
  onNeedClient,
}: {
  quotes: Quote[];
  clients: Client[];
  taxProfile: TaxProfile;
  onConvertQuoteToInvoice: (quote: Quote) => void;
  onAddQuote?: (quote: Quote) => void;
  onNeedClient: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [clientId, setClientId] = useState(clients[0]?.id ?? "");
  const [detail, setDetail] = useState("");
  const [amount, setAmount] = useState("");

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    const subtotal = Math.round((Number(amount) || 0) * 100) / 100;
    if (!onAddQuote || !clientId || !detail.trim() || subtotal <= 0) return;
    const gst = taxProfile.gstRegistered ? Math.round(subtotal * 0.1 * 100) / 100 : 0;
    const today = new Date().toISOString().slice(0, 10);
    const expiry = new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10);
    const n = quotes.length + 1;
    onAddQuote({
      id: `qte-${Date.now()}`,
      quoteNumber: `QTE-${today.slice(0, 4)}-${String(n).padStart(3, "0")}`,
      clientId,
      issueDate: today,
      expiryDate: expiry,
      deliverables: [detail.trim()],
      usageRights: "",
      exclusivity: "",
      subtotal,
      gstAmount: gst,
      total: Math.round((subtotal + gst) * 100) / 100,
      status: "sent",
      terms: "This is a quote, not an invoice. It is valid for 14 days.",
    });
    setDetail("");
    setAmount("");
    setOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-neutral-400">A quote is an offer. It becomes an invoice only when you convert it.</p>
        <button
          type="button"
          onClick={() => (clients.length ? setOpen(true) : onNeedClient())}
          className="shrink-0 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-[#fff] hover:bg-emerald-500"
        >
          <Plus className="mr-1 inline h-3.5 w-3.5" /> New quote
        </button>
      </div>

      {open && (
        <form onSubmit={save} className="space-y-3 rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <label className="text-xs text-neutral-400">
              Client
              <select value={clientId} onChange={(e) => setClientId(e.target.value)} className="mt-1 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-white">
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>{c.tradingName || c.legalName}</option>
                ))}
              </select>
            </label>
            <label className="text-xs text-neutral-400 sm:col-span-2">
              What it is for
              <input required value={detail} onChange={(e) => setDetail(e.target.value)} className="mt-1 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-white" />
            </label>
          </div>
          <label className="block text-xs text-neutral-400">
            Price, excluding GST
            <input required type="number" min="0" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} className="mt-1 w-full max-w-xs rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-white" />
          </label>
          <div className="flex gap-2">
            <button type="submit" className="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-[#fff]">Save quote</button>
            <button type="button" onClick={() => setOpen(false)} className="rounded-lg px-4 py-2 text-xs text-neutral-400">Cancel</button>
          </div>
        </form>
      )}

      {quotes.length === 0 && <p className="text-sm text-neutral-500">No quotes yet.</p>}

      <div className="space-y-3">
        {quotes.map((q) => {
          const client = clients.find((c) => c.id === q.clientId);
          return (
            <div key={q.id} className="flex flex-col justify-between gap-4 rounded-2xl border border-neutral-800 bg-neutral-900 p-5 sm:flex-row sm:items-center">
              <div>
                <div className="mb-1 flex flex-wrap items-center gap-2 text-xs text-neutral-400">
                  <span className="font-mono text-white">{q.quoteNumber}</span>
                  <span>To: {client?.tradingName || "Client"}</span>
                  <span>Valid until {q.expiryDate}</span>
                </div>
                <div className="text-sm font-semibold text-white">{q.deliverables.filter(Boolean).join(" · ") || "Quote"}</div>
                {q.usageRights ? <div className="mt-1 text-xs text-neutral-400">Usage: {q.usageRights}</div> : null}
                {q.exclusivity ? <div className="text-xs text-neutral-400">{q.exclusivity}</div> : null}
              </div>
              <div className="flex items-center justify-between gap-2 sm:flex-col sm:items-end">
                <div>
                  <div className="text-lg font-bold tabular-nums text-white">{formatAUD(q.total)}</div>
                  <div className="font-mono text-[10px] text-neutral-400">{q.gstAmount ? `Includes ${formatAUD(q.gstAmount)} GST` : "No GST"}</div>
                </div>
                {q.status === "converted" ? (
                  <span className="text-xs font-semibold text-ok">Already invoiced</span>
                ) : (
                  <button
                    onClick={() => onConvertQuoteToInvoice(q)}
                    className="flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-medium text-[#fff] hover:bg-emerald-500"
                  >
                    Convert to tax invoice <ArrowRight className="h-3 w-3" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
