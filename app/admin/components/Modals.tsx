"use client";

import React, { useState } from "react";
import {
  X,
  Plus,
  FileText,
  DollarSign,
  Printer,
  Sparkles,
  CreditCard,
  Building2,
  Globe,
  Mail,
  Phone,
  CheckCircle2,
} from "lucide-react";
import { LeadItem, PaymentItem, InvoiceItem, ServiceDetailItem } from "../types";

// =========================================================================
// 1. ADD LEAD MODAL
// =========================================================================
interface AddLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLead: (lead: Omit<LeadItem, "id" | "createdAt">) => void;
  services: ServiceDetailItem[];
}

export function AddLeadModal({
  isOpen,
  onClose,
  onAddLead,
  services,
}: AddLeadModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("India");
  const [countryCode, setCountryCode] = useState("IN");
  const [countryFlag, setCountryFlag] = useState("🇮🇳");
  const [website, setWebsite] = useState("");
  const [service, setService] = useState(services[0]?.name || "Website Development & Next.js Architecture");
  const [budget, setBudget] = useState("$2,500 – $5,000");
  const [message, setMessage] = useState("");
  const [timeline, setTimeline] = useState("3 Weeks");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    onAddLead({
      name,
      email,
      phone: phone || "+1 (555) 019-2834",
      country,
      countryCode,
      countryFlag,
      website: website || "https://client-project.com",
      service,
      budget,
      message: message || "Lead entered manually via Admin Workspace.",
      status: "new",
      timeline,
      notes: "Added manually by administrator.",
    });

    onClose();
  };

  const handleCountryChange = (c: string) => {
    setCountry(c);
    if (c === "India") {
      setCountryCode("IN");
      setCountryFlag("🇮🇳");
    } else if (c === "United States") {
      setCountryCode("US");
      setCountryFlag("🇺🇸");
    } else if (c === "United Kingdom") {
      setCountryCode("GB");
      setCountryFlag("🇬🇧");
    } else if (c === "United Arab Emirates") {
      setCountryCode("AE");
      setCountryFlag("🇦🇪");
    } else {
      setCountryCode("GLOBAL");
      setCountryFlag("🌐");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#111827] w-full max-w-lg rounded-[36px] border border-slate-100 dark:border-slate-800 shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              New Inbound Lead / Prospect
            </h3>
            <span className="text-xs text-slate-400">
              Saves client inquiry to database & CRM
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 my-5 text-[13px]">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                Full Name *
              </label>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. David Laurent"
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-900 dark:text-white border border-transparent focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                Email Address *
              </label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@company.com"
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-900 dark:text-white border border-transparent focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                Phone / WhatsApp
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 019-2834"
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-900 dark:text-white border border-transparent focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                Country
              </label>
              <select
                value={country}
                onChange={(e) => handleCountryChange(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-900 dark:text-white border border-transparent focus:border-indigo-500 focus:outline-none"
              >
                <option value="India">🇮🇳 India</option>
                <option value="United States">🇺🇸 United States</option>
                <option value="United Kingdom">🇬🇧 United Kingdom</option>
                <option value="United Arab Emirates">🇦🇪 United Arab Emirates</option>
                <option value="France">🇫🇷 France</option>
                <option value="Canada">🇨🇦 Canada</option>
                <option value="Germany">🇩🇪 Germany</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
              Requested Service
            </label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-900 dark:text-white border border-transparent focus:border-indigo-500 focus:outline-none"
            >
              {services.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                Estimated Budget
              </label>
              <input
                type="text"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="e.g. $3,000 / ₹1,50,000"
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-900 dark:text-white border border-transparent focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                Website / Domain
              </label>
              <input
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://client-site.com"
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-900 dark:text-white border border-transparent focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
              Project Scope / Notes
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Specify client requirements, milestones..."
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-900 dark:text-white border border-transparent focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-slate-500 font-bold text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#4f46e5] hover:bg-indigo-700 text-white font-bold text-xs shadow-md"
            >
              Create Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// =========================================================================
// 2. ADD PAYMENT MODAL (PAID, PENDING, REMAINING)
// =========================================================================
interface AddPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPayment: (payment: Omit<PaymentItem, "id" | "date" | "time">) => void;
}

export function AddPaymentModal({
  isOpen,
  onClose,
  onAddPayment,
}: AddPaymentModalProps) {
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [service, setService] = useState("Website Development & Next.js Architecture");
  const [currency, setCurrency] = useState<"USD" | "INR">("USD");
  const [amount, setAmount] = useState("2500");
  const [paidAmount, setPaidAmount] = useState("2500");
  const [pendingAmount, setPendingAmount] = useState("0");
  const [rail, setRail] = useState<PaymentItem["rail"]>("Stripe");
  const [status, setStatus] = useState<PaymentItem["status"]>("Paid");
  const [txnRef, setTxnRef] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !amount.trim()) return;

    const symbol = currency === "INR" ? "₹" : "$";

    onAddPayment({
      clientName,
      clientEmail: clientEmail || "client@domain.com",
      domain: "https://clientbrand.com",
      service,
      amount: `${symbol}${parseFloat(amount).toLocaleString()}`,
      paidAmount: `${symbol}${parseFloat(paidAmount || "0").toLocaleString()}`,
      pendingAmount: `${symbol}${parseFloat(pendingAmount || "0").toLocaleString()}`,
      currency,
      rail,
      status,
      txnRef: txnRef || `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#111827] w-full max-w-lg rounded-[36px] border border-slate-100 dark:border-slate-800 shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Record Client Payment
            </h3>
            <span className="text-xs text-slate-400">
              Manage collected funds, receipts & remaining balances
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 my-5 text-[13px]">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                Client / Company *
              </label>
              <input
                required
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Client name"
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-900 dark:text-white border border-transparent focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                Billing Email
              </label>
              <input
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                placeholder="billing@client.com"
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-900 dark:text-white border border-transparent focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-900 dark:text-white border border-transparent focus:border-indigo-500 focus:outline-none"
              >
                <option value="USD">USD ($)</option>
                <option value="INR">INR (₹)</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                Payment Rail / Method
              </label>
              <select
                value={rail}
                onChange={(e) => setRail(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-900 dark:text-white border border-transparent focus:border-indigo-500 focus:outline-none"
              >
                <option value="Stripe">Stripe</option>
                <option value="UPI">UPI (Instant India)</option>
                <option value="Bank Wire">Bank Wire (SWIFT / NEFT / IMPS)</option>
                <option value="Wise">Wise (TransferWise)</option>
                <option value="PayPal">PayPal</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                Total Project Value *
              </label>
              <input
                required
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-900 dark:text-white border border-transparent focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                Amount Received *
              </label>
              <input
                type="number"
                value={paidAmount}
                onChange={(e) => setPaidAmount(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-900 dark:text-white border border-transparent focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                Remaining Balance
              </label>
              <input
                type="number"
                value={pendingAmount}
                onChange={(e) => setPendingAmount(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-900 dark:text-white border border-transparent focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                Payment Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-900 dark:text-white border border-transparent focus:border-indigo-500 focus:outline-none"
              >
                <option value="Paid">Paid in Full</option>
                <option value="Remaining">Milestone / Partial Paid (Balance Due)</option>
                <option value="Pending">Pending Wire Confirmation</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                UTR Ref / Transaction ID
              </label>
              <input
                type="text"
                value={txnRef}
                onChange={(e) => setTxnRef(e.target.value)}
                placeholder="ch_stripe_xxx or UTR Ref"
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-900 dark:text-white border border-transparent focus:border-indigo-500 focus:outline-none font-mono text-xs"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-slate-500 font-bold text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md"
            >
              Save Payment Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// =========================================================================
// 3. CREATE INVOICE MODAL
// =========================================================================
interface CreateInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateInvoice: (invoice: InvoiceItem) => void;
  prefillLead?: LeadItem | null;
  prefillService?: ServiceDetailItem | null;
}

export function CreateInvoiceModal({
  isOpen,
  onClose,
  onCreateInvoice,
  prefillLead,
  prefillService,
}: CreateInvoiceModalProps) {
  const [clientName, setClientName] = useState(prefillLead?.name || "Nordhaus Estates Ltd");
  const [clientEmail, setClientEmail] = useState(prefillLead?.email || "alex@nordhaus-estates.com");
  const [clientDomain, setClientDomain] = useState(prefillLead?.website || "https://nordhaus-estates.com");
  const [clientAddress, setClientAddress] = useState("450 Sutter St, San Francisco, CA 94108, USA");
  const [serviceName, setServiceName] = useState(
    prefillService?.name || "Website Development & Next.js Architecture"
  );
  const [rate, setRate] = useState("2700");
  const [qty, setQty] = useState("1");
  const [taxPercent, setTaxPercent] = useState("0");
  const [currency, setCurrency] = useState<"USD" | "INR">("USD");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !rate.trim()) return;

    const newInv: InvoiceItem = {
      id: `INV-${Date.now().toString().slice(-4)}`,
      invoiceNo: `BPM-INV-2026-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      dueDate: new Date(Date.now() + 14 * 86400000).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      clientName,
      clientEmail,
      clientDomain,
      clientAddress,
      serviceName,
      rate: parseFloat(rate) || 0,
      qty: parseInt(qty) || 1,
      taxPercent: parseFloat(taxPercent) || 0,
      currency,
      status: "Paid",
    };

    onCreateInvoice(newInv);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#111827] w-full max-w-lg rounded-[36px] border border-slate-100 dark:border-slate-800 shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Generate Official Invoice
            </h3>
            <span className="text-xs text-slate-400">
              Ready for one-click printing & compliant PDF export
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 my-5 text-[13px]">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                Client / Business Name *
              </label>
              <input
                required
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-900 dark:text-white border border-transparent focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                Billing Email
              </label>
              <input
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-900 dark:text-white border border-transparent focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
              Service Description / Deliverable *
            </label>
            <input
              required
              type="text"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-900 dark:text-white border border-transparent focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                Unit Rate *
              </label>
              <input
                required
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-900 dark:text-white border border-transparent focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                Tax / GST (%)
              </label>
              <input
                type="number"
                value={taxPercent}
                onChange={(e) => setTaxPercent(e.target.value)}
                placeholder="0 or 18"
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-900 dark:text-white border border-transparent focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-900 dark:text-white border border-transparent focus:border-indigo-500 focus:outline-none"
              >
                <option value="USD">USD ($)</option>
                <option value="INR">INR (₹)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
              Billing Address
            </label>
            <input
              type="text"
              value={clientAddress}
              onChange={(e) => setClientAddress(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-900 dark:text-white border border-transparent focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-slate-500 font-bold text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#4f46e5] hover:bg-indigo-700 text-white font-bold text-xs shadow-md"
            >
              Issue Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// =========================================================================
// 4. PRINTABLE INVOICE PREVIEW MODAL
// =========================================================================
interface InvoicePreviewModalProps {
  invoice: InvoiceItem | null;
  onClose: () => void;
}

export function InvoicePreviewModal({
  invoice,
  onClose,
}: InvoicePreviewModalProps) {
  if (!invoice) return null;

  const symbol = invoice.currency === "INR" ? "₹" : "$";
  const subtotal = invoice.rate * invoice.qty;
  const taxAmount = (subtotal * invoice.taxPercent) / 100;
  const total = subtotal + taxAmount;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white text-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl p-8 sm:p-10 my-8 animate-in fade-in zoom-in-95 duration-200 print:shadow-none print:m-0 print:p-0">
        {/* Modal Top Control Bar (Hidden when printing) */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-200 print:hidden">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            PDF Invoice Preview
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Export PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="pt-6 space-y-6">
          {/* Header Brand */}
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-black flex items-center justify-center text-sm">
                  BP
                </div>
                <div>
                  <h2 className="text-xl font-black tracking-tight text-slate-900">
                    Balaji Prime Media
                  </h2>
                  <span className="text-xs font-bold text-slate-500">
                    Enterprise Digital Services Agency
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 mt-2">
                Cyber City, DLF Phase 2, Gurugram, India • support@balajiprimemedia.in
              </p>
            </div>

            <div className="text-right">
              <span className="text-2xl font-black text-indigo-600 tracking-tight">
                INVOICE
              </span>
              <div className="text-xs font-mono font-bold text-slate-700 mt-0.5">
                Invoice #{invoice.invoiceNo}
              </div>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 mt-1 uppercase">
                {invoice.status}
              </span>
            </div>
          </div>

          {/* Client & Date Info */}
          <div className="grid grid-cols-2 gap-6 p-4 rounded-2xl bg-slate-50 text-xs">
            <div>
              <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Billed To:
              </span>
              <strong className="text-sm font-extrabold text-slate-900 block">
                {invoice.clientName}
              </strong>
              <span className="text-slate-600 block">{invoice.clientEmail}</span>
              <span className="text-slate-600 block">{invoice.clientAddress}</span>
            </div>

            <div className="text-right">
              <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Invoice Details:
              </span>
              <div>Date of Issue: <strong>{invoice.date}</strong></div>
              <div>Due Date: <strong>{invoice.dueDate}</strong></div>
              <div>Domain Ref: <strong>{invoice.clientDomain}</strong></div>
            </div>
          </div>

          {/* Items Table */}
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
                <th className="py-3">Description</th>
                <th className="py-3 text-center">Qty</th>
                <th className="py-3 text-right">Unit Price</th>
                <th className="py-3 text-right">Total Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-4 font-bold text-slate-900">
                  {invoice.serviceName}
                  <span className="block text-[11px] font-normal text-slate-500 mt-0.5">
                    Agreed deliverables delivered by Balaji Prime Media.
                  </span>
                </td>
                <td className="py-4 text-center">{invoice.qty}</td>
                <td className="py-4 text-right">
                  {symbol}{invoice.rate.toLocaleString()}
                </td>
                <td className="py-4 text-right font-black">
                  {symbol}{subtotal.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Calculation */}
          <div className="flex justify-end pt-4 border-t border-slate-200">
            <div className="w-64 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span className="font-bold">{symbol}{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Tax / GST ({invoice.taxPercent}%):</span>
                <span className="font-bold">{symbol}{taxAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Due:</span>
                <span className="text-indigo-600">{symbol}{total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Footer Notes */}
          <div className="pt-6 border-t border-slate-200 text-[11px] text-slate-500 text-center">
            Thank you for partnering with Balaji Prime Media Agency.
          </div>
        </div>
      </div>
    </div>
  );
}