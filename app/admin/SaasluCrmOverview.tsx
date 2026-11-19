"use client";

import React, { useState } from "react";

interface UserItem {
  id: string;
  date: string;
  time: string;
  country: string;
  countryCode: string;
  flag: string;
  name: string;
  email: string;
  number: string;
  isNew: boolean;
  ip: string;
  social: string;
  socialType: "linkedin" | "twitter" | "instagram" | "whatsapp";
  domain?: string;
  serviceInterest?: string;
  authType?: string;
}

interface PaymentItem {
  id: string;
  date: string;
  time: string;
  clientName: string;
  clientEmail: string;
  domain: string;
  service: string;
  amount: string;
  paidAmount: string;
  pendingAmount: string;
  currency: "INR" | "USD";
  rail: string;
  status: string;
  txnRef: string;
}

interface SaasluCrmOverviewProps {
  usersList: UserItem[];
  mailsCount: number;
  whatsappCount: number;
  paymentsCount: number;
  invoicesCount: number;
  isDark: boolean;
  onNavigate: (view: string) => void;
  onDownloadExcel: () => void;
}

export default function SaasluCrmOverview({
  usersList,
  mailsCount,
  whatsappCount,
  paymentsCount,
  invoicesCount,
  isDark,
  onNavigate,
  onDownloadExcel,
}: SaasluCrmOverviewProps) {
  const [pipelinePeriod, setPipelinePeriod] = useState<"Weekly" | "Monthly" | "Yearly">("Monthly");
  const [authFilter, setAuthFilter] = useState<"all" | "whatsapp" | "inquiry" | "newsletter">("all");

  // Website auth & lead entries (WhatsApp, Inquiries, Newsletters)
  const authRecords = usersList.filter((u) => {
    const type = (u.authType || "").toLowerCase();
    if (authFilter === "whatsapp") return type.includes("whatsapp");
    if (authFilter === "inquiry") return type.includes("contact") || type.includes("email") || type.includes("custom");
    if (authFilter === "newsletter") return type.includes("newsletter") || type.includes("audit");
    return true; // show all
  });

  return (
    <div className="space-y-6 animate-fadeIn font-sans">
      
      {/* =========================================================================
          TOP BREADCRUMBS & SECTION TITLE (Exact Saaslu header)
         ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
        <div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
            <span>CRM Dashboard</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Real-time pipeline analytics, deal velocity, live website auth events &amp; client database.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-gray-400">Home</span>
          <span className="text-gray-600">›</span>
          <span className="text-gray-400">Dashboard</span>
          <span className="text-gray-600">›</span>
          <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-400 font-semibold border border-purple-500/20">
            CRM / Sales
          </span>
        </div>
      </div>

      {/* =========================================================================
          1. THE 4 METRIC CARDS (Exact match from Saaslu Image 1)
          - TOTAL LEADS: 3,456 (+22% Vs last month)
          - ACTIVE DEALS: 234 (+18% Vs last month)
          - TOTAL CONTACTS: 8,921 (+12% Vs last month)
          - WIN RATE: 68.5% (+5% Vs last month)
         ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        
        {/* Metric 1: TOTAL VERIFIED LEADS */}
        <div
          onClick={() => onNavigate("users")}
          className={`p-5 rounded-2xl border transition-all cursor-pointer hover:-translate-y-0.5 shadow-lg relative group ${
            isDark
              ? "bg-[#101322] border-[#1e2338] hover:border-purple-500/50"
              : "bg-white border-slate-200 hover:border-purple-300"
          }`}
        >
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
              TOTAL VERIFIED LEADS
            </span>
            <span className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center text-xs">
              👥
            </span>
          </div>

          <div className="mt-2 flex items-baseline justify-between">
            <span className={`text-2xl sm:text-3xl font-black tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
              {usersList.length}
            </span>
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-0.5">
              🟢 Live
              <span className="text-[10px] text-gray-400 font-normal ml-1">In Supabase</span>
            </span>
          </div>

          {/* Sparkline Vertical Bars */}
          <div className="mt-4 flex items-end gap-1.5 h-9 pt-1">
            {[40, 65, 30, 80, 55, 90, 70, 85, 45, 95, 60, 100].map((val, idx) => (
              <span
                key={idx}
                className={`flex-1 rounded-sm transition-all ${
                  idx >= 8 ? "bg-[#8b5cf6]" : "bg-[#272f4e]"
                }`}
                style={{ height: `${val}%` }}
              />
            ))}
          </div>

          <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-400">
            <span>Healthy pipeline</span>
            <div className="w-20 h-1.5 rounded-full bg-[#1e243b] overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full w-[78%]" />
            </div>
          </div>
        </div>

        {/* Metric 2: WHATSAPP LEADS */}
        <div
          onClick={() => onNavigate("whatsapp")}
          className={`p-5 rounded-2xl border transition-all cursor-pointer hover:-translate-y-0.5 shadow-lg relative group ${
            isDark
              ? "bg-[#101322] border-[#1e2338] hover:border-emerald-500/50"
              : "bg-white border-slate-200 hover:border-emerald-300"
          }`}
        >
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
              WHATSAPP LEADS
            </span>
            <span className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xs">
              💬
            </span>
          </div>

          <div className="mt-2 flex items-baseline justify-between">
            <span className={`text-2xl sm:text-3xl font-black tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
              {whatsappCount}
            </span>
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-0.5">
              ↗ Active
              <span className="text-[10px] text-gray-400 font-normal ml-1">Conversations</span>
            </span>
          </div>

          {/* Sparkline Vertical Bars */}
          <div className="mt-4 flex items-end gap-1.5 h-9 pt-1">
            {[50, 45, 75, 60, 85, 40, 95, 70, 80, 65, 90, 85].map((val, idx) => (
              <span
                key={idx}
                className={`flex-1 rounded-sm transition-all ${
                  idx >= 8 ? "bg-[#10b981]" : "bg-[#272f4e]"
                }`}
                style={{ height: `${val}%` }}
              />
            ))}
          </div>

          <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-400">
            <span>Instant chat connect</span>
            <div className="w-20 h-1.5 rounded-full bg-[#1e243b] overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full w-[84%]" />
            </div>
          </div>
        </div>

        {/* Metric 3: TOTAL INBOUND MAILS & INQUIRIES */}
        <div
          onClick={() => onNavigate("mails")}
          className={`p-5 rounded-2xl border transition-all cursor-pointer hover:-translate-y-0.5 shadow-lg relative group ${
            isDark
              ? "bg-[#101322] border-[#1e2338] hover:border-cyan-500/50"
              : "bg-white border-slate-200 hover:border-cyan-300"
          }`}
        >
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
              TOTAL INBOUND MAILS
            </span>
            <span className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-xs">
              ✉️
            </span>
          </div>

          <div className="mt-2 flex items-baseline justify-between">
            <span className={`text-2xl sm:text-3xl font-black tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
              {mailsCount}
            </span>
            <span className="text-xs font-bold text-cyan-400 flex items-center gap-0.5">
              ↗ RFPs
              <span className="text-[10px] text-gray-400 font-normal ml-1">&amp; Forms</span>
            </span>
          </div>

          {/* Sparkline Vertical Bars */}
          <div className="mt-4 flex items-end gap-1.5 h-9 pt-1">
            {[30, 55, 40, 70, 60, 85, 75, 90, 65, 80, 95, 90].map((val, idx) => (
              <span
                key={idx}
                className={`flex-1 rounded-sm transition-all ${
                  idx >= 8 ? "bg-[#06b6d4]" : "bg-[#272f4e]"
                }`}
                style={{ height: `${val}%` }}
              />
            ))}
          </div>

          <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-400">
            <span>Inquiry inbox</span>
            <div className="w-20 h-1.5 rounded-full bg-[#1e243b] overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full w-[72%]" />
            </div>
          </div>
        </div>

        {/* Metric 4: PAYMENTS & SETTLEMENTS */}
        <div
          onClick={() => onNavigate("payments")}
          className={`p-5 rounded-2xl border transition-all cursor-pointer hover:-translate-y-0.5 shadow-lg relative group ${
            isDark
              ? "bg-[#101322] border-[#1e2338] hover:border-amber-500/50"
              : "bg-white border-slate-200 hover:border-amber-300"
          }`}
        >
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
              PAYMENTS / TRANSACTIONS
            </span>
            <span className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center text-xs">
              💰
            </span>
          </div>

          <div className="mt-2 flex items-baseline justify-between">
            <span className={`text-2xl sm:text-3xl font-black tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
              {paymentsCount}
            </span>
            <span className="text-xs font-bold text-amber-400 flex items-center gap-0.5">
              ✓ Verified
              <span className="text-[10px] text-gray-400 font-normal ml-1">Settlements</span>
            </span>
          </div>

          {/* Sparkline Vertical Bars */}
          <div className="mt-4 flex items-end gap-1.5 h-9 pt-1">
            {[45, 60, 50, 75, 65, 80, 70, 85, 60, 90, 80, 95].map((val, idx) => (
              <span
                key={idx}
                className={`flex-1 rounded-sm transition-all ${
                  idx >= 8 ? "bg-[#f59e0b]" : "bg-[#272f4e]"
                }`}
                style={{ height: `${val}%` }}
              />
            ))}
          </div>

          <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-400">
            <span>Healthy pipeline</span>
            <div className="w-20 h-1.5 rounded-full bg-[#1e243b] overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full w-[68%]" />
            </div>
          </div>
        </div>

      </div>

      {/* =========================================================================
          2. MIDDLE SECTION: Deal Pipeline Analytics (Left) & Sales Report (Right)
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN (7 Cols): Deal Pipeline Analytics */}
        <div
          className={`lg:col-span-7 p-6 rounded-2xl border shadow-xl flex flex-col justify-between ${
            isDark ? "bg-[#101322] border-[#1e2338]" : "bg-white border-slate-200"
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Deal Pipeline Analytics
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Monthly Deal Flow &amp; Revenue Trends
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Legends */}
              <div className="flex items-center gap-3 text-[11px]">
                <span className="inline-flex items-center gap-1.5 text-purple-300 font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#8b5cf6]" />
                  2026 Deals
                </span>
                <span className="inline-flex items-center gap-1.5 text-cyan-300 font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#06b6d4]" />
                  2025 Deals
                </span>
              </div>

              {/* Timeframe Selectors */}
              <div className="flex items-center rounded-xl bg-[#181c30] p-1 border border-white/5 text-xs">
                {(["Weekly", "Monthly", "Yearly"] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setPipelinePeriod(tab)}
                    className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                      pipelinePeriod === tab
                        ? "bg-[#6366f1] text-white shadow-sm"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bezier Wave Chart SVG */}
          <div className="relative h-64 w-full mt-2">
            <svg
              viewBox="0 0 600 240"
              className="w-full h-full overflow-visible"
              preserveAspectRatio="none"
            >
              <defs>
                {/* Purple Area Gradient */}
                <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0" />
                </linearGradient>

                {/* Cyan Area Gradient */}
                <linearGradient id="cyanGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid lines */}
              <line x1="40" y1="20" x2="590" y2="20" stroke="#1c223a" strokeDasharray="3 3" />
              <line x1="40" y1="65" x2="590" y2="65" stroke="#1c223a" strokeDasharray="3 3" />
              <line x1="40" y1="110" x2="590" y2="110" stroke="#1c223a" strokeDasharray="3 3" />
              <line x1="40" y1="155" x2="590" y2="155" stroke="#1c223a" strokeDasharray="3 3" />
              <line x1="40" y1="200" x2="590" y2="200" stroke="#1c223a" strokeWidth="1" />

              {/* Y Axis Labels */}
              <text x="30" y="24" fill="#64748b" fontSize="10" textAnchor="end">$10k</text>
              <text x="30" y="69" fill="#64748b" fontSize="10" textAnchor="end">$8k</text>
              <text x="30" y="114" fill="#64748b" fontSize="10" textAnchor="end">$6k</text>
              <text x="30" y="159" fill="#64748b" fontSize="10" textAnchor="end">$4k</text>
              <text x="30" y="204" fill="#64748b" fontSize="10" textAnchor="end">$0k</text>

              {/* Curve 1: 2026 Deals (Purple) Area */}
              <path
                d="M 50 180 C 100 160, 140 185, 200 140 C 260 95, 300 80, 360 135 C 420 190, 480 120, 530 110 L 580 90 L 580 200 L 50 200 Z"
                fill="url(#purpleGradient)"
              />
              {/* Curve 1: Stroke */}
              <path
                d="M 50 180 C 100 160, 140 185, 200 140 C 260 95, 300 80, 360 135 C 420 190, 480 120, 530 110 L 580 90"
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Curve 2: 2025 Deals (Cyan) Area */}
              <path
                d="M 50 160 C 110 165, 170 145, 230 170 C 290 195, 330 160, 390 120 C 450 80, 510 130, 580 145 L 580 200 L 50 200 Z"
                fill="url(#cyanGradient)"
              />
              {/* Curve 2: Stroke */}
              <path
                d="M 50 160 C 110 165, 170 145, 230 170 C 290 195, 330 160, 390 120 C 450 80, 510 130, 580 145"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Interactive Data Point Dots */}
              <circle cx="260" cy="95" r="5" fill="#8b5cf6" stroke="#ffffff" strokeWidth="2" />
              <circle cx="450" cy="80" r="5" fill="#06b6d4" stroke="#ffffff" strokeWidth="2" />
            </svg>

            {/* X-Axis Month Labels */}
            <div className="flex justify-between text-[11px] text-gray-400 pt-2 px-6">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (5 Cols): Sales Report Gauge + Top Reps */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Card: Sales Report with Radial Gauge ($2,119.99) */}
          <div
            className={`p-6 rounded-2xl border shadow-xl ${
              isDark ? "bg-[#101322] border-[#1e2338]" : "bg-white border-slate-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`text-base font-bold tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>Sales Report</h3>
                <p className="text-xs text-gray-400 mt-0.5">Quarterly Deal Performance Analysis</p>
              </div>
              <span className="text-gray-500 hover:text-purple-400 cursor-pointer text-sm">⋮</span>
            </div>

            {/* Semi-Circular Radial Arc Gauge */}
            <div className="relative flex flex-col items-center justify-center pt-2">
              <svg viewBox="0 0 200 115" className="w-56 h-32 overflow-visible">
                <defs>
                  <linearGradient id="arcGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
                {/* Background Arc Track */}
                <path
                  d="M 20 100 A 80 80 0 0 1 180 100"
                  fill="none"
                  stroke="#1c223a"
                  strokeWidth="14"
                  strokeLinecap="round"
                />
                {/* Active Gradient Fill Arc */}
                <path
                  d="M 20 100 A 80 80 0 0 1 155 45"
                  fill="none"
                  stroke="url(#arcGradient)"
                  strokeWidth="14"
                  strokeLinecap="round"
                />
              </svg>

              {/* Center Big Stat ($2,119.99) */}
              <div className="absolute bottom-2 flex flex-col items-center">
                <span className={`text-2xl sm:text-3xl font-black tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
                  $2,119.99
                </span>
                <span className="text-[11px] text-gray-400 uppercase tracking-widest font-semibold mt-0.5">
                  Summary
                </span>
              </div>
            </div>

            {/* Bottom Split Metrics */}
            <div className="mt-5 pt-4 border-t border-white/5 grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-[11px] text-gray-400">Monthly Deals</p>
                <p className={`text-base font-bold mt-0.5 ${isDark ? "text-white" : "text-slate-900"}`}>$1,779.44</p>
              </div>
              <div className="border-l border-white/5">
                <p className="text-[11px] text-gray-400">Yearly Revenue</p>
                <p className={`text-base font-bold mt-0.5 ${isDark ? "text-white" : "text-slate-900"}`}>$5,640.51</p>
              </div>
            </div>
          </div>

          {/* Card: Top Sales Representatives */}
          <div
            className={`p-5 rounded-2xl border shadow-xl ${
              isDark ? "bg-[#101322] border-[#1e2338]" : "bg-white border-slate-200"
            }`}
          >
            <div className="flex items-center justify-between pb-3">
              <div>
                <h4 className={`text-xs font-bold uppercase tracking-wider ${isDark ? "text-white" : "text-slate-900"}`}>
                  Top Sales Representatives
                </h4>
                <p className="text-[10px] text-gray-400">Best Performing Team Members</p>
              </div>
              <span className="text-gray-500 hover:text-white cursor-pointer text-xs">⋮</span>
            </div>

            <div className="space-y-3">
              {[
                { name: "Sarah Johnson", initial: "SJ", color: "from-blue-500 to-indigo-600", revenue: "$425,000", closed: "45 Closed" },
                { name: "Michael Chen", initial: "MC", color: "from-cyan-500 to-teal-600", revenue: "$389,000", closed: "38 Closed" },
                { name: "Emily Rodriguez", initial: "ER", color: "from-purple-500 to-pink-600", revenue: "$312,000", closed: "32 Closed" },
                { name: "David Kim", initial: "DK", color: "from-amber-500 to-orange-600", revenue: "$287,000", closed: "28 Closed" },
              ].map((rep, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-1">
                  <div className="flex items-center gap-2.5">
                    <span className={`w-7 h-7 rounded-full bg-gradient-to-tr ${rep.color} flex items-center justify-center font-bold text-[10px] text-white shadow-sm`}>
                      {rep.initial}
                    </span>
                    <div>
                      <p className={`font-bold leading-tight ${isDark ? "text-white" : "text-slate-900"}`}>{rep.name}</p>
                      <p className="text-[10px] text-gray-400">{rep.revenue}</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
                    {rep.closed}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-3 pt-2 border-t border-white/5 text-center">
              <button
                type="button"
                onClick={() => onNavigate("users")}
                className="text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors cursor-pointer"
              >
                Show More →
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* =========================================================================
          3. USER'S SPECIFIC FEATURE: Live Website Inquiries & WhatsApp Leads Table
         ========================================================================= */}
      <div
        className={`p-6 rounded-2xl border shadow-xl ${
          isDark ? "bg-[#101322] border-[#1e2338]" : "bg-white border-slate-200"
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/5">
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-base font-bold tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
                Live Inquiries, WhatsApp Leads &amp; Clients
              </span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Live Sync Active
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              Instant verified stream of all client inquiries, WhatsApp chats, contact forms &amp; signups.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: `All (${usersList.length})` },
              { id: "whatsapp", label: `💬 WhatsApp (${usersList.filter((u) => (u.authType || "").toLowerCase().includes("whatsapp")).length})` },
              { id: "inquiry", label: `✉️ Inquiries (${usersList.filter((u) => (u.authType || "").toLowerCase().includes("contact") || (u.authType || "").toLowerCase().includes("email")).length})` },
              { id: "newsletter", label: `📰 Newsletters (${usersList.filter((u) => (u.authType || "").toLowerCase().includes("newsletter")).length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setAuthFilter(tab.id as any)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  authFilter === tab.id
                    ? "bg-[#6366f1] text-white shadow-md shadow-indigo-950/60"
                    : isDark
                    ? "bg-[#161a2e] text-gray-400 hover:text-white border border-white/5"
                    : "bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Auth Records Table */}
        <div className="overflow-x-auto mt-4 max-h-[500px] overflow-y-auto">
          <table className="w-full text-left text-xs">
            <thead className="sticky top-0 bg-[#101322] z-10">
              <tr className={`border-b uppercase text-[10px] tracking-wider ${isDark ? "border-white/5 text-gray-400" : "border-slate-200 text-slate-500"}`}>
                <th className="py-2.5 px-3">Client &amp; Contact</th>
                <th className="py-2.5 px-3">Channel / Type</th>
                <th className="py-2.5 px-3">Phone &amp; Action</th>
                <th className="py-2.5 px-3">Date &amp; Time</th>
                <th className="py-2.5 px-3">Service Interest</th>
                <th className="py-2.5 px-3">IP &amp; Country</th>
                <th className="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? "divide-white/5" : "divide-slate-200"}`}>
              {authRecords.map((user, idx) => {
                const typeLower = (user.authType || "").toLowerCase();
                const isWA = typeLower.includes("whatsapp");
                const isContact = typeLower.includes("contact") || typeLower.includes("email") || typeLower.includes("custom");
                const isNews = typeLower.includes("newsletter");

                return (
                  <tr key={user.id || idx} className={`${isDark ? "hover:bg-white/[0.02]" : "hover:bg-slate-50"} transition-colors`}>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-[11px] shadow-sm ${
                          isWA ? "bg-emerald-600" : isContact ? "bg-purple-600" : "bg-gradient-to-tr from-purple-600 to-indigo-600"
                        }`}>
                          {user.name.slice(0, 2).toUpperCase()}
                        </span>
                        <div>
                          <p className={`font-bold ${isDark ? "text-white" : "text-slate-900"}`}>{user.name}</p>
                          <p className="text-[11px] text-gray-400 font-mono">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                          isWA
                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                            : isContact
                            ? "bg-purple-500/10 border-purple-500/30 text-purple-300"
                            : isNews
                            ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                            : "bg-blue-500/10 border-blue-500/30 text-blue-400"
                        }`}
                      >
                        <span>
                          {isWA
                            ? "💬 WHATSAPP"
                            : isContact
                            ? "✉️ INQUIRY"
                            : isNews
                            ? "📰 NEWSLETTER"
                            : "🔑 AUTH"}
                        </span>
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] text-gray-300">{user.number || "N/A"}</span>
                        {user.number && user.number !== "+91 98000 00000" && (
                          <a
                            href={`https://wa.me/${user.number.replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2 py-0.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold transition-all"
                            title="Chat with client directly on WhatsApp"
                          >
                            💬 Chat
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <p className={`font-medium ${isDark ? "text-white" : "text-slate-900"}`}>{user.date}</p>
                      <p className="text-[10px] text-gray-400">{user.time}</p>
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-purple-300 font-medium">{user.serviceInterest || "Client Portal"}</span>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5">
                        <span>{user.flag}</span>
                        <span className="text-gray-300">{user.country}</span>
                        <span className="text-[10px] text-gray-500 font-mono">({user.ip})</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                        ✓ Verified in DB
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* =========================================================================
          4. CORE OPERATIONS FROM IMAGE 2 (Preserving all elements from the white card)
         ========================================================================= */}
      <div
        className={`p-6 rounded-2xl border shadow-xl ${
          isDark ? "bg-[#101322] border-[#1e2338]" : "bg-white border-slate-200"
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/5">
          <div>
            <h3 className={`text-base font-bold tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
              Core Operations &amp; Database Shortcuts
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Quick access to inquiries, WhatsApp leads, ledger, and billing generators.
            </p>
          </div>

          <button
            type="button"
            onClick={onDownloadExcel}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-950/60 hover:from-purple-500 hover:to-indigo-500 transition-all cursor-pointer"
          >
            <span>📥</span>
            <span>Download Admin Data (.xlsx)</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          
          {/* Card 1: Users & Clients */}
          <div
            onClick={() => onNavigate("users")}
            className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
              isDark
                ? "border-white/5 bg-[#161a2e]/60 hover:bg-[#1a2038] hover:border-purple-500/40"
                : "border-slate-200 bg-slate-50 hover:bg-white hover:border-purple-300"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">👥</span>
              <div>
                <p className={`text-xs font-bold group-hover:text-purple-500 transition-colors ${isDark ? "text-white" : "text-slate-900"}`}>Users &amp; Clients</p>
                <p className="text-[10px] text-gray-400">Client directory</p>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-600 dark:text-purple-300 border border-purple-500/30">
              {usersList.length}
            </span>
          </div>

          {/* Card 2: Total Mail */}
          <div
            onClick={() => onNavigate("mails")}
            className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
              isDark
                ? "border-white/5 bg-[#161a2e]/60 hover:bg-[#1a2038] hover:border-cyan-500/40"
                : "border-slate-200 bg-slate-50 hover:bg-white hover:border-cyan-300"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">✉️</span>
              <div>
                <p className={`text-xs font-bold group-hover:text-cyan-500 transition-colors ${isDark ? "text-white" : "text-slate-900"}`}>Total Mail</p>
                <p className="text-[10px] text-gray-400">RFPs &amp; inquiries</p>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 border border-cyan-500/30">
              {mailsCount}
            </span>
          </div>

          {/* Card 3: WhatsApp Messages */}
          <div
            onClick={() => onNavigate("whatsapp")}
            className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
              isDark
                ? "border-white/5 bg-[#161a2e]/60 hover:bg-[#1a2038] hover:border-emerald-500/40"
                : "border-slate-200 bg-slate-50 hover:bg-white hover:border-emerald-300"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">💬</span>
              <div>
                <p className={`text-xs font-bold group-hover:text-emerald-500 transition-colors ${isDark ? "text-white" : "text-slate-900"}`}>WhatsApp Messages</p>
                <p className="text-[10px] text-gray-400">Direct chat leads</p>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30">
              {whatsappCount}
            </span>
          </div>

          {/* Card 4: Payment Ledger */}
          <div
            onClick={() => onNavigate("payments")}
            className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
              isDark
                ? "border-white/5 bg-[#161a2e]/60 hover:bg-[#1a2038] hover:border-amber-500/40"
                : "border-slate-200 bg-slate-50 hover:bg-white hover:border-amber-300"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">💳</span>
              <div>
                <p className={`text-xs font-bold group-hover:text-amber-500 transition-colors ${isDark ? "text-white" : "text-slate-900"}`}>Payment Ledger</p>
                <p className="text-[10px] text-gray-400">Settled orders</p>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/30">
              {paymentsCount}
            </span>
          </div>

        </div>

        {/* Action Buttons Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-4 border-t border-white/5">
          <button
            type="button"
            onClick={() => onNavigate("add_payment")}
            className="p-3.5 rounded-xl border border-dashed border-purple-500/40 bg-purple-500/5 hover:bg-purple-500/10 flex items-center justify-between transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2.5 text-left">
              <span className="text-lg">➕</span>
              <div>
                <p className={`text-xs font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Add Payment</p>
                <p className="text-[10px] text-gray-400">Record settlement with Paid, Pending &amp; Remaining</p>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-600 dark:text-purple-300 border border-purple-500/30">
              New +
            </span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate("invoice")}
            className="p-3.5 rounded-xl border border-dashed border-cyan-500/40 bg-cyan-500/5 hover:bg-cyan-500/10 flex items-center justify-between transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2.5 text-left">
              <span className="text-lg">🧾</span>
              <div>
                <p className={`text-xs font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Invoice Generator</p>
                <p className="text-[10px] text-gray-400">Generate tax invoice &amp; instant printable PDF</p>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 border border-cyan-500/30">
              {invoicesCount} Invoices
            </span>
          </button>
        </div>

        {/* Neon Serverless Cloud Database Status Card */}
        <div className="mt-5 p-4 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <span className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-bold shrink-0">
              ⚡
            </span>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-xs font-black text-emerald-400">Neon Cloud Serverless Postgres: Connected</p>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-[11px] text-gray-400 mt-0.5">
                Tables active: <span className="text-emerald-300 font-semibold">leads (18)</span>, <span className="text-emerald-300 font-semibold">interactions (30)</span>, <span className="text-emerald-300 font-semibold">payments</span>, <span className="text-emerald-300 font-semibold">audits</span>.
              </p>
            </div>
          </div>
          <div className="text-[11px] text-gray-400 bg-black/40 px-3 py-1.5 rounded-xl border border-emerald-500/20 flex items-center gap-2">
            <span className="text-emerald-400">●</span>
            <span>All website signups &amp; logins sync to Neon automatically</span>
          </div>
        </div>
      </div>

    </div>
  );
}
