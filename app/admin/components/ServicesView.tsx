"use client";

import React, { useState } from "react";
import {
  Layers,
  CheckCircle2,
  DollarSign,
  Clock,
  Sparkles,
  Zap,
  Shield,
  FileText,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Search,
} from "lucide-react";
import { ServiceDetailItem } from "../types";

interface ServicesViewProps {
  services: ServiceDetailItem[];
  onOpenCreateInvoiceWithService: (service: ServiceDetailItem) => void;
}

export default function ServicesView({
  services,
  onOpenCreateInvoiceWithService,
}: ServicesViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredServices = services.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.tagline.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopyQuote = (svc: ServiceDetailItem) => {
    const text = `📌 ${svc.name} (${svc.category})\n💰 Pricing: ${svc.priceUSD} USD / ${svc.priceINR} INR (${svc.billingPeriod})\n⏱️ Turnaround Time (TAT): ${svc.tat}\n✨ Core Deliverables Included:\n${svc.deliverables
      .slice(0, 5)
      .map((d) => `• ${d}`)
      .join("\n")}\n\n👉 Contact Balaji Prime Media to get started.`;

    navigator.clipboard.writeText(text);
    setCopiedId(svc.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Official Services & Pricing Catalog
            </h1>
            <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
              8 Core Offerings
            </span>
          </div>
          <p className="text-[13px] text-slate-500 dark:text-slate-400 mt-1">
            Official agency rates in USD & INR, TAT delivery timelines, deliverables checklists, and 1-click quote copy for instant client responses.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter services..."
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 rounded-2xl text-[13px] text-slate-900 dark:text-white placeholder-slate-400 border border-slate-200/80 dark:border-slate-700 focus:border-indigo-500 focus:outline-none shadow-sm"
          />
        </div>
      </div>

      {/* Services Grid (2-column layout for detailed cards) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredServices.map((svc) => {
          const isExpanded = expandedId === svc.id;

          return (
            <div
              key={svc.id}
              className="bg-white dark:bg-[#111827] rounded-[36px] border border-[#f1f5f9] dark:border-slate-800/80 p-6 sm:p-7 shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.05)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header Category & Badges */}
                <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-200/60 dark:border-indigo-800/60">
                      {svc.category}
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-2 tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {svc.name}
                    </h3>
                    <p className="text-[12px] text-slate-400 mt-1 font-medium leading-relaxed">
                      {svc.tagline}
                    </p>
                  </div>
                </div>

                {/* Pricing Box (INR & USD Dual Display) */}
                <div className="my-5 p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-indigo-50/30 dark:from-slate-800/60 dark:to-indigo-950/20 border border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                      Official Client Rate
                    </span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-2xl font-black text-slate-900 dark:text-white">
                        {svc.priceUSD}
                      </span>
                      <span className="text-sm font-bold text-slate-400">USD</span>
                      <span className="text-sm font-bold text-slate-300 dark:text-slate-600">/</span>
                      <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">
                        {svc.priceINR}
                      </span>
                      <span className="text-xs font-bold text-slate-400">INR</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block">
                      Delivery TAT
                    </span>
                    <span className="inline-flex items-center gap-1 font-extrabold text-slate-900 dark:text-white text-xs mt-1 bg-white dark:bg-slate-700 px-2.5 py-1 rounded-lg border border-slate-200/60 dark:border-slate-600">
                      <Clock className="w-3 h-3 text-amber-500" />
                      {svc.tat}
                    </span>
                  </div>
                </div>

                {/* Performance Stats row */}
                {svc.stats && svc.stats.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                    {svc.stats.slice(0, 4).map((st, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-center"
                      >
                        <div className="text-sm font-black text-indigo-600 dark:text-indigo-400">
                          {st.value}
                        </div>
                        <div className="text-[10px] font-bold text-slate-500 truncate">
                          {st.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Deliverables Checklist */}
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Key Deliverables Included:
                  </span>
                  <div className="space-y-1.5">
                    {(isExpanded ? svc.deliverables : svc.deliverables.slice(0, 3)).map(
                      (item, i) => (
                        <div key={i} className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Expand / Collapse toggle */}
                {svc.deliverables.length > 3 && (
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : svc.id)}
                    className="mt-3 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                  >
                    {isExpanded ? (
                      <>
                        <span>Show less</span>
                        <ChevronUp className="w-3.5 h-3.5" />
                      </>
                    ) : (
                      <>
                        <span>Show all deliverables (+{svc.deliverables.length - 3})</span>
                        <ChevronDown className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                <button
                  onClick={() => handleCopyQuote(svc)}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-[12px] font-bold transition-all flex items-center gap-1.5 active:scale-95"
                >
                  {copiedId === svc.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Quote Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>Copy Quote</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onOpenCreateInvoiceWithService(svc)}
                  className="px-4 py-2 rounded-xl bg-[#4f46e5] text-white hover:bg-indigo-700 text-[12px] font-bold transition-all shadow-md flex items-center gap-1.5 active:scale-95"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Invoice this Service</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
