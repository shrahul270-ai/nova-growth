"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Briefcase,
  Globe2,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  CheckCircle2,
  Clock,
  ChevronRight,
  Sparkles,
  PlusCircle,
  FileText,
  CreditCard,
  Search,
  ExternalLink,
  ShieldCheck,
  Zap,
} from "lucide-react";
import {
  LeadItem,
  PaymentItem,
  ProjectItem,
  AuditItem,
  ActivityItem,
  ServiceDetailItem,
} from "../types";

interface OverviewViewProps {
  leads: LeadItem[];
  payments: PaymentItem[];
  projects: ProjectItem[];
  audits: AuditItem[];
  timeline: ActivityItem[];
  services: ServiceDetailItem[];
  onNavigate: (view: any) => void;
  onOpenAddLeadModal: () => void;
  onOpenAddPaymentModal: () => void;
  onOpenCreateInvoiceModal: () => void;
  onOpenQuickAuditModal: () => void;
  currencyRegion: "USD" | "INR" | "GBP" | "AED";
}

export default function OverviewView({
  leads,
  payments,
  projects,
  audits,
  timeline,
  services,
  onNavigate,
  onOpenAddLeadModal,
  onOpenAddPaymentModal,
  onOpenCreateInvoiceModal,
  onOpenQuickAuditModal,
  currencyRegion,
}: OverviewViewProps) {
  // Interactive nodes state for monthly line chart
  const [activeMonthIndex, setActiveMonthIndex] = useState<number>(10); // Default to Nov (index 10)
  const [timeframe, setTimeframe] = useState<"12M" | "6M" | "30D">("12M");

  const monthlyData = [
    { month: "Jan", revenue: 42, target: 40, webDev: 24, seo: 18 },
    { month: "Feb", revenue: 56, target: 50, webDev: 32, seo: 24 },
    { month: "Mar", revenue: 68, target: 62, webDev: 40, seo: 28 },
    { month: "Apr", revenue: 74, target: 70, webDev: 45, seo: 29 },
    { month: "May", revenue: 89, target: 80, webDev: 52, seo: 37 },
    { month: "Jun", revenue: 95, target: 90, webDev: 58, seo: 37 },
    { month: "Jul", revenue: 104, target: 98, webDev: 62, seo: 42 },
    { month: "Aug", revenue: 112, target: 105, webDev: 68, seo: 44 },
    { month: "Sep", revenue: 118, target: 112, webDev: 71, seo: 47 },
    { month: "Oct", revenue: 122, target: 118, webDev: 74, seo: 48 },
    { month: "Nov", revenue: 128.45, target: 120, webDev: 78, seo: 50.45 },
    { month: "Dec", revenue: 140, target: 130, webDev: 85, seo: 55 },
  ];

  const currentMonthData = monthlyData[activeMonthIndex] || monthlyData[10];

  // Helper for generating smooth SVG sparkline path
  const makeSparklinePath = (points: number[], width = 220, height = 40): string => {
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;
    const padding = 4;
    const effH = height - padding * 2;

    const coords = points.map((val, idx) => {
      const x = (idx / (points.length - 1)) * width;
      const y = height - padding - ((val - min) / range) * effH;
      return { x, y };
    });

    let d = `M ${coords[0].x.toFixed(1)} ${coords[0].y.toFixed(1)}`;
    for (let i = 0; i < coords.length - 1; i++) {
      const p0 = coords[i === 0 ? 0 : i - 1];
      const p1 = coords[i];
      const p2 = coords[i + 1];
      const p3 = coords[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }
    return d;
  };

  // Sparkline data arrays (7-10 points each)
  const sparklineRevenue = [32, 45, 54, 68, 72, 89, 104, 118, 128];
  const sparklineLeads = [40, 52, 61, 80, 95, 110, 142, 178, 210];
  const sparklineProjects = [18, 20, 24, 26, 29, 31, 34, 36, 38];
  const sparklinePublishers = [12000, 18000, 24000, 31000, 35000, 38500, 40850];
  const sparklineConversion = [64, 67, 69, 71, 70, 73, 75, 76.8];

  // Top Performing Items
  const topServices = [
    {
      name: "Website Development & Next.js 16",
      category: "Web Engineering",
      score: "4.9",
      revenue: "$48.8K",
      avatar: "⚡",
      avatarBg: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
    },
    {
      name: "Off Page Backlink Building & PR",
      category: "High-DR Editorial Placements",
      score: "5.0",
      revenue: "$34.6K",
      avatar: "🔗",
      avatarBg: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    },
    {
      name: "Flutter Mobile & Web App Dev",
      category: "iOS & Android Engineering",
      score: "4.8",
      revenue: "$25.5K",
      avatar: "📱",
      avatarBg: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    },
    {
      name: "Enterprise Search Engine Optimization",
      category: "Organic Search Dominance",
      score: "4.9",
      revenue: "$19.5K",
      avatar: "🚀",
      avatarBg: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. Greeting Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-[-0.02em]">
              Welcome back, Rahul 👋
            </h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Ecosystem Active
            </span>
          </div>
          <p className="text-[13px] text-slate-500 dark:text-slate-400 mt-1 font-medium">
            Real-time command center for Nova Growth & Balaji Prime Media. All platform operations, leads, and finances centralized.
          </p>
        </div>

        {/* Quick Date and Primary Actions */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-white dark:bg-slate-800 border border-[#f1f5f9] dark:border-slate-700/60 text-[12px] font-bold text-slate-700 dark:text-slate-300 shadow-sm flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-indigo-500" />
            <span>November 2026 • Live Status</span>
          </div>

          <button
            onClick={onOpenAddLeadModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#4f46e5] text-white text-[13px] font-bold hover:bg-indigo-700 transition-all shadow-[0_10px_15px_-3px_rgba(79,70,229,0.35)] active:scale-95 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ New Lead</span>
          </button>
        </div>
      </div>

      {/* 2. KPI Grid (5-column grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {/* KPI 1: Total Revenue */}
        <div className="bg-white dark:bg-[#111827] p-6 rounded-[36px] border border-[#f1f5f9] dark:border-slate-800/80 shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.05)] hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <DollarSign className="w-5 h-5" />
              </div>
              <span className="inline-flex items-center gap-0.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
                <TrendingUp className="w-3 h-3" />
                +18.4%
              </span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400 select-none">
              TOTAL REVENUE
            </span>
            <div className="text-[28px] font-black text-slate-900 dark:text-white mt-1 tracking-tight">
              {currencyRegion === "INR" ? "₹94,50,000" : "$128,450"}
            </div>
            <span className="text-[11px] text-slate-400 font-medium">Accumulated Q4 Revenue</span>
          </div>

          {/* SVG Sparkline in Indigo */}
          <div className="mt-4 pt-2">
            <svg
              className="w-full h-10 overflow-visible"
              viewBox="0 0 220 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d={makeSparklinePath(sparklineRevenue, 220, 40)}
                stroke="#4f46e5"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* KPI 2: Qualified Leads */}
        <div className="bg-white dark:bg-[#111827] p-6 rounded-[36px] border border-[#f1f5f9] dark:border-slate-800/80 shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.05)] hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <span className="inline-flex items-center gap-0.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
                <TrendingUp className="w-3 h-3" />
                +24.1%
              </span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400 select-none">
              QUALIFIED LEADS
            </span>
            <div className="text-[28px] font-black text-slate-900 dark:text-white mt-1 tracking-tight">
              1,248
            </div>
            <span className="text-[11px] text-slate-400 font-medium">Inbound inquiries & forms</span>
          </div>

          {/* SVG Sparkline in Emerald */}
          <div className="mt-4 pt-2">
            <svg
              className="w-full h-10 overflow-visible"
              viewBox="0 0 220 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d={makeSparklinePath(sparklineLeads, 220, 40)}
                stroke="#10b981"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* KPI 3: Active Projects */}
        <div className="bg-white dark:bg-[#111827] p-6 rounded-[36px] border border-[#f1f5f9] dark:border-slate-800/80 shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.05)] hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </div>
              <span className="inline-flex items-center gap-0.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
                <Activity className="w-3 h-3" />
                38 Sprints
              </span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400 select-none">
              ACTIVE PROJECTS
            </span>
            <div className="text-[28px] font-black text-slate-900 dark:text-white mt-1 tracking-tight">
              38 Active
            </div>
            <span className="text-[11px] text-slate-400 font-medium">98.5% on-time milestone delivery</span>
          </div>

          {/* SVG Sparkline in Amber */}
          <div className="mt-4 pt-2">
            <svg
              className="w-full h-10 overflow-visible"
              viewBox="0 0 220 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d={makeSparklinePath(sparklineProjects, 220, 40)}
                stroke="#f59e0b"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* KPI 4: Verified Publishers */}
        <div className="bg-white dark:bg-[#111827] p-6 rounded-[36px] border border-[#f1f5f9] dark:border-slate-800/80 shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.05)] hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Globe2 className="w-5 h-5" />
              </div>
              <span className="inline-flex items-center gap-0.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
                <TrendingUp className="w-3 h-3" />
                +8.7%
              </span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400 select-none">
              PUBLISHERS (40K)
            </span>
            <div className="text-[28px] font-black text-slate-900 dark:text-white mt-1 tracking-tight">
              40,850
            </div>
            <span className="text-[11px] text-slate-400 font-medium">Verified sites DA 50–95+</span>
          </div>

          {/* SVG Sparkline in Blue */}
          <div className="mt-4 pt-2">
            <svg
              className="w-full h-10 overflow-visible"
              viewBox="0 0 220 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d={makeSparklinePath(sparklinePublishers, 220, 40)}
                stroke="#3b82f6"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* KPI 5: Conversion Rate */}
        <div className="bg-white dark:bg-[#111827] p-6 rounded-[36px] border border-[#f1f5f9] dark:border-slate-800/80 shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.05)] hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <span className="inline-flex items-center gap-0.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400">
                <TrendingUp className="w-3 h-3" />
                +5.2%
              </span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400 select-none">
              CONVERSION RATE
            </span>
            <div className="text-[28px] font-black text-slate-900 dark:text-white mt-1 tracking-tight">
              76.8%
            </div>
            <span className="text-[11px] text-slate-400 font-medium">Avg SEO Health Score: 94/100</span>
          </div>

          {/* SVG Sparkline in Rose */}
          <div className="mt-4 pt-2">
            <svg
              className="w-full h-10 overflow-visible"
              viewBox="0 0 220 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d={makeSparklinePath(sparklineConversion, 220, 40)}
                stroke="#f43f5e"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* 3. Main Analytics Area (12-column grid layout) */}
      <div className="space-y-6">
        {/* Top Row: (6-col) line chart | (3-col) donut chart | (3-col) top-performing items */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* (6-col) Line Chart for Monthly Trends with Interactive Nodes */}
          <div className="lg:col-span-6 bg-white dark:bg-[#111827] p-6 sm:p-8 rounded-[40px] border border-[#f1f5f9] dark:border-slate-800/80 shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.05)] flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Monthly Revenue & Delivery Trends
                  </h3>
                  <p className="text-[12px] text-slate-400 mt-0.5">
                    Hover over interactive nodes to view Web Development vs Backlinks & SEO breakdown
                  </p>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl self-start">
                  {(["12M", "6M", "30D"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTimeframe(t)}
                      className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all ${
                        timeframe === t
                          ? "bg-white dark:bg-[#111827] text-indigo-600 dark:text-indigo-400 shadow-sm"
                          : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Month Interactive Node Summary */}
              <div className="mt-4 flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-extrabold flex items-center justify-center text-sm">
                    {currentMonthData.month}
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                      Monthly Revenue ({currentMonthData.month} 2026)
                    </span>
                    <div className="text-lg font-black text-slate-900 dark:text-white">
                      ${currentMonthData.revenue}K USD
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-[12px] font-bold">
                  <div className="text-right">
                    <span className="text-slate-400 text-[10px] block">Web Dev</span>
                    <span className="text-indigo-600 dark:text-indigo-400">${currentMonthData.webDev}K</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 text-[10px] block">SEO & Backlinks</span>
                    <span className="text-emerald-600 dark:text-emerald-400">${currentMonthData.seo}K</span>
                  </div>
                </div>
              </div>

              {/* Interactive SVG Line Chart */}
              <div className="mt-6 relative h-56 w-full">
                <svg
                  className="w-full h-full overflow-visible"
                  viewBox="0 0 550 200"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="indigoGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="emeraldGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Grid lines */}
                  {[40, 80, 120, 160].map((y) => (
                    <line
                      key={y}
                      x1="0"
                      y1={y}
                      x2="550"
                      y2={y}
                      stroke="currentColor"
                      className="text-slate-100 dark:text-slate-800/80"
                      strokeDasharray="4 4"
                    />
                  ))}

                  {/* Area fill */}
                  <path
                    d={`M 0 200 L 0 ${200 - (monthlyData[0].revenue / 160) * 180} ${monthlyData
                      .map((d, i) => `L ${(i / (monthlyData.length - 1)) * 550} ${200 - (d.revenue / 160) * 180}`)
                      .join(" ")} L 550 200 Z`}
                    fill="url(#indigoGradient)"
                  />

                  {/* Main Trend Line (Indigo) */}
                  <path
                    d={`M 0 ${200 - (monthlyData[0].revenue / 160) * 180} ${monthlyData
                      .map((d, i) => `L ${(i / (monthlyData.length - 1)) * 550} ${200 - (d.revenue / 160) * 180}`)
                      .join(" ")}`}
                    fill="none"
                    stroke="#4f46e5"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Target Line (Emerald dotted) */}
                  <path
                    d={`M 0 ${200 - (monthlyData[0].target / 160) * 180} ${monthlyData
                      .map((d, i) => `L ${(i / (monthlyData.length - 1)) * 550} ${200 - (d.target / 160) * 180}`)
                      .join(" ")}`}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeDasharray="5 5"
                    strokeLinecap="round"
                  />

                  {/* Interactive Nodes */}
                  {monthlyData.map((d, i) => {
                    const cx = (i / (monthlyData.length - 1)) * 550;
                    const cy = 200 - (d.revenue / 160) * 180;
                    const isSelected = activeMonthIndex === i;

                    return (
                      <g key={d.month} className="cursor-pointer" onClick={() => setActiveMonthIndex(i)}>
                        {isSelected && (
                          <circle cx={cx} cy={cy} r="12" fill="#4f46e5" fillOpacity="0.2" className="animate-ping" />
                        )}
                        <circle
                          cx={cx}
                          cy={cy}
                          r={isSelected ? "6" : "4.5"}
                          fill={isSelected ? "#4f46e5" : "#ffffff"}
                          stroke="#4f46e5"
                          strokeWidth="2.5"
                          className="transition-all hover:scale-150"
                        />
                      </g>
                    );
                  })}
                </svg>

                {/* X-Axis Month Labels */}
                <div className="flex justify-between mt-2 pt-1 border-t border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400">
                  {monthlyData.map((d, i) => (
                    <button
                      key={d.month}
                      onClick={() => setActiveMonthIndex(i)}
                      className={`transition-colors hover:text-indigo-600 ${
                        activeMonthIndex === i ? "text-indigo-600 dark:text-indigo-400 font-extrabold" : ""
                      }`}
                    >
                      {d.month}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-[11px] text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4f46e5]" />
                  Actual Revenue 2026
                </span>
                <span className="flex items-center gap-1.5 font-bold text-slate-500">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                  Monthly Target
                </span>
              </div>
              <button
                onClick={() => onNavigate("finances")}
                className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                <span>Cash Flow Ledger</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* (3-col) Interactive Donut Chart for Distribution with Custom Legend */}
          <div className="lg:col-span-3 bg-white dark:bg-[#111827] p-6 sm:p-7 rounded-[40px] border border-[#f1f5f9] dark:border-slate-800/80 shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.05)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Service Distribution
                  </h3>
                  <span className="text-[11px] text-slate-400">Share of agency revenue</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
                  100%
                </span>
              </div>

              {/* Custom SVG Donut (Hole 70%, stroke 5px, centered total) */}
              <div className="relative w-48 h-48 mx-auto my-4 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                  {/* Background Track */}
                  <circle
                    cx="50"
                    cy="50"
                    r="35"
                    stroke="currentColor"
                    strokeWidth="5"
                    fill="none"
                    className="text-slate-100 dark:text-slate-800"
                  />
                  {/* Segment 1: Next.js (38%) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="35"
                    stroke="#4f46e5"
                    strokeWidth="5.5"
                    strokeDasharray="83.5 220"
                    strokeDashoffset="0"
                    fill="none"
                    strokeLinecap="round"
                  />
                  {/* Segment 2: Guest Post (27%) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="35"
                    stroke="#10b981"
                    strokeWidth="5.5"
                    strokeDasharray="59.3 220"
                    strokeDashoffset="-85"
                    fill="none"
                    strokeLinecap="round"
                  />
                  {/* Segment 3: Flutter (20%) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="35"
                    stroke="#f59e0b"
                    strokeWidth="5.5"
                    strokeDasharray="44 220"
                    strokeDashoffset="-146"
                    fill="none"
                    strokeLinecap="round"
                  />
                  {/* Segment 4: SEO Suite (15%) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="35"
                    stroke="#3b82f6"
                    strokeWidth="5.5"
                    strokeDasharray="33 220"
                    strokeDashoffset="-192"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>

                {/* Center Content: Large 3xl and small 'Total' label 10px uppercase */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400">
                    TOTAL
                  </span>
                  <span className="text-3xl font-black text-slate-900 dark:text-white leading-none my-0.5">
                    8
                  </span>
                  <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                    Services
                  </span>
                </div>
              </div>

              {/* Legend Below: Dot indicators, flex-between, font-size 11px, bold weights */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#4f46e5]" />
                    Next.js & Web Dev
                  </span>
                  <span className="font-extrabold text-slate-900 dark:text-white">38%</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                    High-DR Backlinks
                  </span>
                  <span className="font-extrabold text-slate-900 dark:text-white">27%</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
                    Flutter Mobile Apps
                  </span>
                  <span className="font-extrabold text-slate-900 dark:text-white">20%</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#3b82f6]" />
                    Enterprise SEO Suite
                  </span>
                  <span className="font-extrabold text-slate-900 dark:text-white">15%</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate("services")}
              className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-center text-[12px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center justify-center gap-1"
            >
              <span>View Full Services Catalog</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* (3-col) List of Top-Performing Items with Avatars and Star Ratings */}
          <div className="lg:col-span-3 bg-white dark:bg-[#111827] p-6 sm:p-7 rounded-[40px] border border-[#f1f5f9] dark:border-slate-800/80 shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.05)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Top Services
                  </h3>
                  <span className="text-[11px] text-slate-400">Client ratings & volume</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  4.95/5
                </span>
              </div>

              {/* List with Avatars & Star Ratings */}
              <div className="space-y-3.5 mt-4">
                {topServices.map((svc) => (
                  <div
                    key={svc.name}
                    className="p-3 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl ${svc.avatarBg} flex items-center justify-center shrink-0 text-base`}
                      >
                        {svc.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[12px] font-bold text-slate-900 dark:text-white truncate">
                          {svc.name}
                        </h4>
                        <div className="flex items-center justify-between mt-1 text-[11px]">
                          <span className="text-slate-400 font-medium">{svc.category}</span>
                          <span className="font-extrabold text-indigo-600 dark:text-indigo-400">
                            {svc.revenue}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <div className="flex text-amber-400 text-xs">
                            {"★".repeat(5)}
                          </div>
                          <span className="text-[10px] font-bold text-slate-500">
                            {svc.score}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onNavigate("projects")}
              className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-center text-[12px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center justify-center gap-1"
            >
              <span>View Projects & Clients</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Row: (4-col) vertical timeline | (5-col) vertical bar chart for revenue | (3-col) status summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* (4-col) Vertical Timeline for Recent Activity */}
          <div className="lg:col-span-4 bg-white dark:bg-[#111827] p-6 sm:p-7 rounded-[40px] border border-[#f1f5f9] dark:border-slate-800/80 shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.05)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Live Activity Stream
                  </h3>
                  <span className="text-[11px] text-slate-400">Real-time platform events</span>
                </div>
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
              </div>

              {/* Vertical Timeline */}
              <div className="relative pl-6 space-y-5 mt-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200 dark:before:bg-slate-800">
                {timeline.slice(0, 5).map((act) => (
                  <div key={act.id} className="relative group">
                    {/* Timeline Node Dot */}
                    <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-white dark:bg-[#111827] border-2 border-indigo-600 flex items-center justify-center group-hover:scale-125 transition-transform shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                    </div>

                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[12px] font-extrabold text-slate-900 dark:text-white">
                          {act.title}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {act.timestamp}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                        {act.description}
                      </p>
                      <div className="mt-1.5 flex items-center gap-2">
                        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {act.user}
                        </span>
                        <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400">
                          {act.statusBadge}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onNavigate("leads")}
              className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-center text-[12px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center justify-center gap-1"
            >
              <span>View Full Activity Log</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* (5-col) Vertical Bar Chart for Revenue with Large Currency Total */}
          <div className="lg:col-span-5 bg-white dark:bg-[#111827] p-6 sm:p-7 rounded-[40px] border border-[#f1f5f9] dark:border-slate-800/80 shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.05)] flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400 select-none">
                    Financial Tracking & Cash Flow
                  </span>
                  {/* Large Currency Total */}
                  <div className="text-3xl font-black text-slate-900 dark:text-white mt-1 tracking-tight">
                    $128,450{" "}
                    <span className="text-xs font-bold text-slate-400 tracking-normal">
                      | ₹94,50,000 INR
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                      <ArrowUpRight className="w-3 h-3" />
                      +28.4% Year-over-Year Growth
                    </span>
                  </div>
                </div>

                <button
                  onClick={onOpenCreateInvoiceModal}
                  className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 text-[11px] font-bold hover:bg-indigo-100 transition-colors"
                >
                  + Invoice
                </button>
              </div>

              {/* Vertical Bar Chart */}
              <div className="mt-6 flex items-end justify-between h-44 gap-2 pt-4 px-1">
                {[
                  { label: "Jun", val: 55, height: "45%" },
                  { label: "Jul", val: 68, height: "55%" },
                  { label: "Aug", val: 82, height: "68%" },
                  { label: "Sep", val: 94, height: "78%" },
                  { label: "Oct", val: 110, height: "88%" },
                  { label: "Nov", val: 128.4, height: "100%", current: true },
                ].map((bar) => (
                  <div
                    key={bar.label}
                    className="flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-pointer"
                  >
                    <span className="opacity-0 group-hover:opacity-100 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 transition-opacity">
                      ${bar.val}k
                    </span>
                    <div className="w-full max-w-[36px] bg-slate-100 dark:bg-slate-800 rounded-2xl h-full flex items-end p-1">
                      <div
                        style={{ height: bar.height }}
                        className={`w-full rounded-xl transition-all duration-500 ${
                          bar.current
                            ? "bg-gradient-to-t from-[#4f46e5] to-[#818cf8] shadow-[0_4px_12px_rgba(79,70,229,0.3)]"
                            : "bg-slate-300 dark:bg-slate-700 group-hover:bg-indigo-400"
                        }`}
                      />
                    </div>
                    <span
                      className={`text-[11px] font-bold ${
                        bar.current
                          ? "text-indigo-600 dark:text-indigo-400 font-black"
                          : "text-slate-400"
                      }`}
                    >
                      {bar.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
              <span className="text-slate-400 font-medium">92% settled via Stripe & UPI</span>
              <button
                onClick={() => onNavigate("finances")}
                className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                <span>Settlements Ledger</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* (3-col) Status Summary with Centered Donut & Percentage Breakdown */}
          <div className="lg:col-span-3 bg-white dark:bg-[#111827] p-6 sm:p-7 rounded-[40px] border border-[#f1f5f9] dark:border-slate-800/80 shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.05)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Project Deliverables
                  </h3>
                  <span className="text-[11px] text-slate-400">Tracking 38 active sprints</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>

              {/* Centered Mini Donut */}
              <div className="relative w-36 h-36 mx-auto my-3 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="36"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="none"
                    className="text-slate-100 dark:text-slate-800"
                  />
                  {/* Terminé 64% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="36"
                    stroke="#10b981"
                    strokeWidth="6.5"
                    strokeDasharray="144 226"
                    strokeDashoffset="0"
                    fill="none"
                    strokeLinecap="round"
                  />
                  {/* En cours 24% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="36"
                    stroke="#f59e0b"
                    strokeWidth="6.5"
                    strokeDasharray="54 226"
                    strokeDashoffset="-146"
                    fill="none"
                    strokeLinecap="round"
                  />
                  {/* En Révision 12% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="36"
                    stroke="#3b82f6"
                    strokeWidth="6.5"
                    strokeDasharray="27 226"
                    strokeDashoffset="-202"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-black text-slate-900 dark:text-white leading-none">
                    98.5%
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mt-1">
                    SLA Success
                  </span>
                </div>
              </div>

              {/* Percentage Breakdown List */}
              <div className="space-y-2 mt-3">
                <div>
                  <div className="flex justify-between text-[11px] font-bold mb-1">
                    <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Completed & Delivered
                    </span>
                    <span className="text-emerald-600">64% (24)</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: "64%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-bold mb-1">
                    <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      In Active Development
                    </span>
                    <span className="text-amber-600">24% (9)</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: "24%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-bold mb-1">
                    <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      Client Review & QA
                    </span>
                    <span className="text-blue-600">12% (5)</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: "12%" }} />
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate("projects")}
              className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-center text-[12px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center justify-center gap-1"
            >
              <span>Open Project Manager</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Bottom Utility Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left (8-col): Glassmorphism Promo Banner */}
        <div className="lg:col-span-8 relative overflow-hidden rounded-[48px] p-8 sm:p-12 bg-gradient-to-br from-[#4f46e5] to-[#3730a3] text-white shadow-2xl flex flex-col justify-between min-h-[300px]">
          {/* Subtle background circles for depth */}
          <div className="absolute -top-16 -left-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-indigo-900/40 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-lg">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-extrabold bg-white/20 backdrop-blur-md text-white border border-white/30 uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Digital Agency Acceleration 2026
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Manage your entire agency in one click without leaving your dashboard.
            </h2>
            <p className="text-[14px] text-indigo-100 font-medium mt-3 leading-relaxed">
              Check official pricing tables, verify world-class publishers, generate invoices, and follow up with WhatsApp leads instantly.
            </p>
          </div>

          <div className="relative z-10 mt-8 flex flex-wrap items-center gap-4">
            {/* White Primary CTA button with #4f46e5 text, rounded-2xl, heavy shadow */}
            <button
              onClick={onOpenAddLeadModal}
              className="px-6 py-3.5 rounded-2xl bg-white text-[#4f46e5] font-extrabold text-[13px] hover:bg-indigo-50 transition-all shadow-[0_20px_25px_-5px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <span>Qualify New Client</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate("services")}
              className="px-5 py-3.5 rounded-2xl bg-white/15 hover:bg-white/25 backdrop-blur-md text-white font-extrabold text-[13px] border border-white/20 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Explore Pricing Catalog</span>
            </button>
          </div>

          {/* Floating 'Glass' window tilted at 6 degrees using backdrop-filter blur(12px) and white/10 */}
          <div className="hidden md:flex flex-col justify-between absolute right-8 top-8 bottom-8 w-60 rounded-3xl bg-white/10 backdrop-blur-[12px] border border-white/20 p-5 rotate-6 shadow-2xl pointer-events-none transform hover:rotate-3 transition-transform duration-500">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-sm font-black">
                NG
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-400/30">
                Audit 98%
              </span>
            </div>

            <div className="my-auto space-y-2">
              <span className="text-[11px] font-bold text-white/80 uppercase tracking-widest block">
                Next.js 16 + Supabase
              </span>
              <div className="text-xl font-black text-white leading-tight">
                99.9% Uptime
              </div>
              <p className="text-[10px] text-indigo-100 font-medium">
                Optimized for Vercel Fluid Compute & Serverless DB.
              </p>
            </div>

            <div className="pt-3 border-t border-white/15 flex items-center justify-between text-[10px] font-bold text-white/90">
              <span>Enterprise SLA</span>
              <span>24/7 Monitoring</span>
            </div>
          </div>
        </div>

        {/* Right (4-col): 'Actions Rapides' Grid (2x2) */}
        <div className="lg:col-span-4 bg-white dark:bg-[#111827] p-6 sm:p-7 rounded-[40px] border border-[#f1f5f9] dark:border-slate-800/80 shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.05)] flex flex-col justify-between">
          <div className="pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
                Quick Actions
              </h3>
              <span className="text-[11px] text-slate-400">Operational shortcuts</span>
            </div>
            <Zap className="w-4 h-4 text-amber-500" />
          </div>

          {/* 2x2 Grid of Square Cards */}
          <div className="grid grid-cols-2 gap-3.5 my-4 flex-1">
            {/* Action 1: New Lead */}
            <button
              onClick={onOpenAddLeadModal}
              className="flex flex-col items-center justify-center p-4 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 hover:border-indigo-500 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/40 text-center transition-all group active:scale-95 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform mb-2">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-[12px] font-extrabold text-slate-900 dark:text-white leading-tight">
                New Lead
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5">Add Client</span>
            </button>

            {/* Action 2: Create Invoice */}
            <button
              onClick={onOpenCreateInvoiceModal}
              className="flex flex-col items-center justify-center p-4 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/40 text-center transition-all group active:scale-95 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform mb-2">
                <FileText className="w-6 h-6" />
              </div>
              <span className="text-[12px] font-extrabold text-slate-900 dark:text-white leading-tight">
                Create Invoice
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5">PDF Generator</span>
            </button>

            {/* Action 3: Record Payment */}
            <button
              onClick={onOpenAddPaymentModal}
              className="flex flex-col items-center justify-center p-4 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 hover:border-amber-500 hover:bg-amber-50/50 dark:hover:bg-amber-950/40 text-center transition-all group active:scale-95 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform mb-2">
                <CreditCard className="w-6 h-6" />
              </div>
              <span className="text-[12px] font-extrabold text-slate-900 dark:text-white leading-tight">
                Record Payment
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5">Paid & Pending</span>
            </button>

            {/* Action 4: Express SEO Audit */}
            <button
              onClick={onOpenQuickAuditModal}
              className="flex flex-col items-center justify-center p-4 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/40 text-center transition-all group active:scale-95 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform mb-2">
                <Search className="w-6 h-6" />
              </div>
              <span className="text-[12px] font-extrabold text-slate-900 dark:text-white leading-tight">
                Express Audit
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5">Scan Domain</span>
            </button>
          </div>

          <div className="pt-2 text-center text-[11px] text-slate-400">
            All actions sync live with Supabase & Neon cloud database.
          </div>
        </div>
      </div>
    </div>
  );
}
