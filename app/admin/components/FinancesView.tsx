"use client";

import React, { useState } from "react";
import {
  DollarSign,
  CreditCard,
  FileText,
  Search,
  Filter,
  Plus,
  Printer,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  Download,
  Building2,
  ArrowUpRight,
} from "lucide-react";
import { PaymentItem, InvoiceItem } from "../types";

interface FinancesViewProps {
  payments: PaymentItem[];
  invoices: InvoiceItem[];
  onOpenAddPaymentModal: () => void;
  onOpenCreateInvoiceModal: () => void;
  onPreviewInvoice: (invoice: InvoiceItem) => void;
  currencyRegion: "USD" | "INR" | "GBP" | "AED";
}

export default function FinancesView({
  payments,
  invoices,
  onOpenAddPaymentModal,
  onOpenCreateInvoiceModal,
  onPreviewInvoice,
  currencyRegion,
}: FinancesViewProps) {
  const [activeTab, setActiveTab] = useState<"payments" | "invoices">("payments");
  const [paymentFilter, setPaymentFilter] = useState<"all" | "paid" | "pending" | "remaining">("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPayments = payments.filter((p) => {
    const matchesSearch =
      p.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.txnRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.rail.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      paymentFilter === "all"
        ? true
        : paymentFilter === "paid"
        ? p.status === "Paid" || p.status === "Settled"
        : paymentFilter === "pending"
        ? p.status === "Pending"
        : p.status === "Remaining";

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Finances, Cash Flow & Invoicing
            </h1>
            <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              Q4 Financial Audit
            </span>
          </div>
          <p className="text-[13px] text-slate-500 dark:text-slate-400 mt-1">
            Track payments via Stripe, UPI, Wise, bank wires, remaining balances, and generate official invoices.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenAddPaymentModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-[13px] hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200/60 dark:border-slate-700 active:scale-95"
          >
            <CreditCard className="w-4 h-4 text-emerald-600" />
            <span>Record Payment</span>
          </button>

          <button
            onClick={onOpenCreateInvoiceModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#4f46e5] text-white font-bold text-[13px] hover:bg-indigo-700 transition-all shadow-[0_10px_15px_-3px_rgba(79,70,229,0.35)] active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Create Invoice</span>
          </button>
        </div>
      </div>

      {/* Financial Overview 4-Stat Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-[#111827] border border-[#f1f5f9] dark:border-slate-800/80 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Total Revenue Collected
          </span>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            {currencyRegion === "INR" ? "₹94,50,000" : "$128,450"}
          </div>
          <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 mt-1">
            <ArrowUpRight className="w-3 h-3" />
            100% Secured via Stripe & UPI
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#111827] border border-[#f1f5f9] dark:border-slate-800/80 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Remaining Balances Due
          </span>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">
            {currencyRegion === "INR" ? "₹1,85,000" : "$2,240"}
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">Due upon milestone delivery</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#111827] border border-[#f1f5f9] dark:border-slate-800/80 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Issued Invoices
          </span>
          <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">
            {invoices.length} Invoices
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">GST & Tax Compliant</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#111827] border border-[#f1f5f9] dark:border-slate-800/80 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Collection Success Rate
          </span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            96.8%
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">0 payment defaults</span>
        </div>
      </div>

      {/* Tab Switcher: Payments vs Invoices */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab("payments")}
          className={`pb-3 px-4 text-[13px] font-extrabold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === "payments"
              ? "border-[#4f46e5] text-[#4f46e5]"
              : "border-transparent text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Payment Ledger ({payments.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("invoices")}
          className={`pb-3 px-4 text-[13px] font-extrabold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === "invoices"
              ? "border-[#4f46e5] text-[#4f46e5]"
              : "border-transparent text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Client Invoices ({invoices.length})</span>
        </button>
      </div>

      {/* VIEW 1: PAYMENTS */}
      {activeTab === "payments" && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="p-4 rounded-3xl bg-white dark:bg-[#111827] border border-[#f1f5f9] dark:border-slate-800/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search client, payment method, UTR reference..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-[13px] text-slate-900 dark:text-white placeholder-slate-400 border border-transparent focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
              {[
                { id: "all", label: "All" },
                { id: "paid", label: "Paid / Settled" },
                { id: "remaining", label: "Remaining Balance" },
                { id: "pending", label: "Pending" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setPaymentFilter(tab.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-[12px] font-bold transition-all ${
                    paymentFilter === tab.id
                      ? "bg-[#4f46e5] text-white"
                      : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Payments Table */}
          <div className="bg-white dark:bg-[#111827] rounded-[36px] border border-[#f1f5f9] dark:border-slate-800/80 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead className="bg-slate-50/70 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 text-[10px] uppercase font-extrabold tracking-wider text-slate-400">
                  <tr>
                    <th className="py-4 px-6">Client / Company</th>
                    <th className="py-4 px-6">Service / Deliverable</th>
                    <th className="py-4 px-6">Total Amount</th>
                    <th className="py-4 px-6">Paid Amount</th>
                    <th className="py-4 px-6">Balance Due</th>
                    <th className="py-4 px-6">Rail & Reference</th>
                    <th className="py-4 px-6 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredPayments.map((p) => (
                    <tr
                      key={p.id}
                      className="hover:bg-slate-50/70 dark:hover:bg-slate-800/30 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="font-extrabold text-slate-900 dark:text-white">
                          {p.clientName}
                        </div>
                        <span className="text-[11px] text-slate-400 block">{p.clientEmail}</span>
                      </td>

                      <td className="py-4 px-6">
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                          {p.service}
                        </span>
                        <span className="text-[10px] text-slate-400 block">{p.date} • {p.time}</span>
                      </td>

                      <td className="py-4 px-6 font-black text-slate-900 dark:text-white">
                        {p.amount}
                      </td>

                      <td className="py-4 px-6 font-bold text-emerald-600">
                        {p.paidAmount}
                      </td>

                      <td className="py-4 px-6 font-bold text-amber-600">
                        {p.pendingAmount}
                      </td>

                      <td className="py-4 px-6">
                        <span className="inline-block px-2.5 py-0.5 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {p.rail}
                        </span>
                        <span className="text-[10px] text-slate-400 block mt-0.5 font-mono truncate max-w-[140px]">
                          {p.txnRef}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-right">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-extrabold ${
                            p.status === "Paid" || p.status === "Settled"
                              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                              : p.status === "Remaining"
                              ? "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300"
                              : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: INVOICES */}
      {activeTab === "invoices" && (
        <div className="bg-white dark:bg-[#111827] rounded-[36px] border border-[#f1f5f9] dark:border-slate-800/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead className="bg-slate-50/70 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 text-[10px] uppercase font-extrabold tracking-wider text-slate-400">
                <tr>
                  <th className="py-4 px-6">Invoice #</th>
                  <th className="py-4 px-6">Client & Company</th>
                  <th className="py-4 px-6">Invoiced Service</th>
                  <th className="py-4 px-6">Subtotal & Tax</th>
                  <th className="py-4 px-6">Due Date</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Preview / Print</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {invoices.map((inv) => (
                  <tr
                    key={inv.id}
                    className="hover:bg-slate-50/70 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="py-4 px-6 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      {inv.invoiceNo}
                    </td>

                    <td className="py-4 px-6">
                      <div className="font-extrabold text-slate-900 dark:text-white">
                        {inv.clientName}
                      </div>
                      <span className="text-[11px] text-slate-400 block">{inv.clientEmail}</span>
                    </td>

                    <td className="py-4 px-6">
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        {inv.serviceName}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <div className="font-black text-slate-900 dark:text-white">
                        {inv.currency === "INR" ? `₹${inv.rate.toLocaleString()}` : `$${inv.rate.toLocaleString()}`}
                      </div>
                      <span className="text-[10px] text-slate-400 block">
                        Tax / GST: {inv.taxPercent}%
                      </span>
                    </td>

                    <td className="py-4 px-6 text-slate-600 dark:text-slate-300 font-medium">
                      {inv.dueDate}
                    </td>

                    <td className="py-4 px-6">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          inv.status === "Paid"
                            ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400"
                            : "bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400"
                        }`}
                      >
                        {inv.status}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => onPreviewInvoice(inv)}
                        className="px-3.5 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold text-xs hover:bg-indigo-100 transition-colors inline-flex items-center gap-1.5"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>PDF Preview</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}