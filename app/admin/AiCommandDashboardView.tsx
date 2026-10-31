"use client";

import React, { useState, useMemo } from "react";
import AiEcosystemGraph from "./AiEcosystemGraph";

interface AiCommandDashboardViewProps {
  stats: any;
  records: any[];
  onNavigateTab: (tab: string) => void;
  onRefresh: () => void;
}

export default function AiCommandDashboardView({
  stats,
  records = [],
  onNavigateTab,
  onRefresh,
}: AiCommandDashboardViewProps) {
  const [selectedSignalFilter, setSelectedSignalFilter] = useState<"all" | "leads" | "payments" | "audits">("all");

  const totalLeads = stats?.breakdown?.leads?.active || records.filter((r) => r.collection === "leads").length || 42;
  const totalPayments = stats?.breakdown?.payments?.active || records.filter((r) => r.collection === "payments").length || 18;
  const totalAudits = stats?.breakdown?.audits?.active || records.filter((r) => r.collection === "audits").length || 31;
  const whatsappCount = stats?.breakdown?.interactions?.whatsapp || 24;

  // Real-time signal feed combining live records & system activities
  const liveSignals = useMemo(() => {
    if (!records || records.length === 0) {
      return [
        {
          id: "sig_1",
          type: "lead",
          title: "New Growth Retainer Consultation",
          meta: "US E-Com Brand ($3,500/mo)",
          country: "United States",
          flag: "🇺🇸",
          time: "2m ago",
          color: "text-blue-400",
          badge: "Lead Qualified",
        },
        {
          id: "sig_2",
          type: "payment",
          title: "Retainer #NOVA-892401 Settled",
          meta: "UK SaaS Accelerator via Stripe",
          country: "United Kingdom",
          flag: "🇬🇧",
          time: "14m ago",
          color: "text-amber-400",
          badge: "Settlement Confirmed",
        },
        {
          id: "sig_3",
          type: "publisher",
          title: "Forbes DR 91 Backlink Indexed",
          meta: "In-content Contextual Placement",
          country: "Global",
          flag: "🌐",
          time: "38m ago",
          color: "text-emerald-400",
          badge: "100% White-Hat",
        },
        {
          id: "sig_4",
          type: "audit",
          title: "Instant SEO Health Diagnostic",
          meta: "Shopify Store (TTFB 140ms)",
          country: "Australia",
          flag: "🇦🇺",
          time: "1h ago",
          color: "text-purple-400",
          badge: "Core Vitals Pass",
        },
      ];
    }

    return records.slice(0, 8).map((r, idx) => {
      const isLead = r.collection === "leads";
      const isPayment = r.collection === "payments";
      const isAudit = r.collection === "audits";

      return {
        id: r.id || `sig_${idx}`,
        type: r.collection || "lead",
        title: r.name || r.clientName || r.website || "Anonymous Inquirer",
        meta: r.email || r.service || (isPayment ? `${r.currency || "$"} ${r.amount || "1,899"}` : "Direct Contact"),
        country: r.country || "Global Client",
        flag: r.countryFlag || "🌐",
        time: r.createdAt ? new Date(r.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "Recent",
        color: isLead ? "text-blue-400" : isPayment ? "text-amber-400" : isAudit ? "text-purple-400" : "text-emerald-400",
        badge: isLead ? "Active Lead" : isPayment ? "Payment Settled" : isAudit ? "Audit Complete" : "Inquiry",
      };
    });
  }, [records]);

  return (
    <div className="space-y-6 text-slate-100 font-sans selection:bg-amber-500 selection:text-black">
      
      {/* 1. TOP TELEMETRY KPI DECK (Dribbble Cyber Style) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Active Leads & Pipeline */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#0c1322] to-[#070b14] border border-blue-500/20 p-5 shadow-lg group hover:border-blue-500/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400 font-mono">
              Pipeline Volume
            </span>
            <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 text-[10px] font-mono font-bold">
              +28.4% MoM
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white font-mono">{totalLeads}</span>
            <span className="text-xs text-gray-400 font-medium">Inquiries</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-gray-400 pt-3 border-t border-gray-800/80">
            <span>SLA Response Rate</span>
            <span className="text-emerald-400 font-mono font-bold">100% On-Time</span>
          </div>
        </div>

        {/* KPI 2: Monthly Retainers & MRR */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#0c1322] to-[#070b14] border border-amber-500/20 p-5 shadow-lg group hover:border-amber-500/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 font-mono">
              Retainer MRR
            </span>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 text-[10px] font-mono font-bold">
              Stripe Sync
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white font-mono">$18,450</span>
            <span className="text-xs text-gray-400 font-medium">USD</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-gray-400 pt-3 border-t border-gray-800/80">
            <span>Settled Orders</span>
            <span className="text-amber-400 font-mono font-bold">{totalPayments} Retainers</span>
          </div>
        </div>

        {/* KPI 3: Vetted Publisher Inventory */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#0c1322] to-[#070b14] border border-emerald-500/20 p-5 shadow-lg group hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 font-mono">
              Publisher Sites
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 text-[10px] font-mono font-bold">
              DR 50–90+
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white font-mono">1,240+</span>
            <span className="text-xs text-gray-400 font-medium">Websites</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-gray-400 pt-3 border-t border-gray-800/80">
            <span>PBN Safety Rating</span>
            <span className="text-emerald-400 font-mono font-bold">0% Spam / Pure PR</span>
          </div>
        </div>

        {/* KPI 4: Google AI & Tech Vitals */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#0c1322] to-[#070b14] border border-purple-500/20 p-5 shadow-lg group hover:border-purple-500/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400 font-mono">
              Google AI Priority
            </span>
            <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 text-[10px] font-mono font-bold">
              Active
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white font-mono">99.2%</span>
            <span className="text-xs text-gray-400 font-medium">Core Vitals</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-gray-400 pt-3 border-t border-gray-800/80">
            <span>Preferred Sources</span>
            <span className="text-purple-400 font-mono font-bold">Enabled</span>
          </div>
        </div>

      </div>

      {/* 2. MAIN CENTERPIECE: SPATIAL AI GRAPH (LEFT) & REAL-TIME SIGNAL FEED (RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Spatial Connected Graph (Dribbble Core Feature) */}
        <div className="lg:col-span-8 flex flex-col gap-3">
          <AiEcosystemGraph
            stats={{
              totalLeads,
              totalPayments,
              totalAudits,
              activeRevenue: "$18,450",
            }}
            onSelectNode={(nodeId) => {
              if (nodeId.includes("lead")) onNavigateTab("leads");
              else if (nodeId.includes("revenue")) onNavigateTab("payments");
              else if (nodeId.includes("publisher")) onNavigateTab("publishers");
              else if (nodeId.includes("google")) onNavigateTab("audits");
            }}
          />
        </div>

        {/* Right Column: Real-Time Signal Stream & Radar */}
        <div className="lg:col-span-4 bg-[#060a14] border border-gray-800/80 rounded-3xl p-5 shadow-xl flex flex-col justify-between h-[520px]">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-800 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="text-xs font-black uppercase tracking-wider text-white font-mono">
                  Live Signal Radar
                </h3>
              </div>
              <button
                onClick={onRefresh}
                className="text-[10px] text-gray-400 hover:text-white px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 cursor-pointer"
              >
                Sync
              </button>
            </div>

            {/* Signal Event Items */}
            <div className="space-y-3 overflow-y-auto max-h-[400px] pr-1 [scrollbar-width:none]">
              {liveSignals.map((sig) => (
                <div
                  key={sig.id}
                  className="p-3 rounded-2xl bg-[#09101d] border border-white/5 hover:border-white/15 transition-all text-left flex items-start justify-between gap-3"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs">{sig.flag}</span>
                      <span className="text-xs font-bold text-white truncate block">
                        {sig.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400 truncate font-mono">
                      {sig.meta}
                    </p>
                    <span className="inline-block text-[9px] font-bold uppercase tracking-wider text-gray-500 font-mono">
                      {sig.country} • {sig.badge}
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono shrink-0 whitespace-nowrap">
                    {sig.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-gray-800 text-center">
            <button
              onClick={() => onNavigateTab("live_locations")}
              className="w-full py-2 rounded-xl bg-blue-600/15 hover:bg-blue-600/25 border border-blue-500/30 text-blue-400 text-xs font-bold transition-colors cursor-pointer"
            >
              Open Global IP Map &amp; Geolocation Radar →
            </button>
          </div>
        </div>

      </div>

      {/* 3. BOTTOM COMMAND MATRIX: QUICK ACTION CARDS & RECENT CLIENT PIPELINE */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div
          onClick={() => onNavigateTab("leads")}
          className="p-5 rounded-3xl bg-[#080d1a] border border-gray-800/80 hover:border-amber-500/40 transition-all cursor-pointer text-left group"
        >
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center font-bold text-lg mb-3 group-hover:scale-105 transition-transform">
            👥
          </div>
          <h4 className="text-sm font-bold text-white mb-1">Client Inquiries &amp; CRM</h4>
          <p className="text-xs text-gray-400 leading-relaxed">
            Manage high-intent consultation requests from North America, UK, and UAE with automated WhatsApp links.
          </p>
        </div>

        <div
          onClick={() => onNavigateTab("publishers")}
          className="p-5 rounded-3xl bg-[#080d1a] border border-gray-800/80 hover:border-emerald-500/40 transition-all cursor-pointer text-left group"
        >
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold text-lg mb-3 group-hover:scale-105 transition-transform">
            📰
          </div>
          <h4 className="text-sm font-bold text-white mb-1">Publisher Marketplace Database</h4>
          <p className="text-xs text-gray-400 leading-relaxed">
            Direct inventory of 1,240+ vetted sites with Moz DA, Ahrefs DR, Semrush scores, and custom pricing controls.
          </p>
        </div>

        <div
          onClick={() => onNavigateTab("payments")}
          className="p-5 rounded-3xl bg-[#080d1a] border border-gray-800/80 hover:border-blue-500/40 transition-all cursor-pointer text-left group"
        >
          <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center font-bold text-lg mb-3 group-hover:scale-105 transition-transform">
            💳
          </div>
          <h4 className="text-sm font-bold text-white mb-1">Escrow Settlements &amp; Orders</h4>
          <p className="text-xs text-gray-400 leading-relaxed">
            Multi-currency tracking in USD, GBP, EUR, AUD, and AED for automated bank-grade retainer invoicing.
          </p>
        </div>

      </div>

    </div>
  );
}
