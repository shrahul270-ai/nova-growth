"use client";

import React, { useState } from "react";
import Link from "next/link";

interface NovaBentoAdminViewProps {
  stats: {
    totalLeads?: number;
    totalPayments?: number;
    totalAudits?: number;
    recentActivities?: Array<any>;
  } | null;
  onSelectTab: (tab: any) => void;
  onNewEntry: () => void;
  activeSubTab?: string;
}

export default function NovaBentoAdminView({
  stats,
  onSelectTab,
  onNewEntry,
}: NovaBentoAdminViewProps) {
  const [selectedSubTab, setSelectedSubTab] = useState<string>("Overview");
  const [chartYear, setChartYear] = useState<string>("2026");
  const [activeDockItem, setActiveDockItem] = useState<string>("nexus");
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(4); // default 4th is 1 Jul / today

  // Capsule chart weekly performance data (matching screenshot layout)
  const chartDays = [
    { label: "27 Oct", opsHeight: 88, transferHeight: 48, opsVal: "88%", transferVal: "48%" },
    { label: "28 Oct", opsHeight: 62, transferHeight: 28, opsVal: "62%", transferVal: "28%" },
    { label: "29 Oct", opsHeight: 75, transferHeight: 22, opsVal: "75%", transferVal: "22%" },
    { label: "30 Oct", opsHeight: 0, transferHeight: 0, isBlank: true },
    { label: "31 Oct", opsHeight: 92, transferHeight: 44, opsVal: "92%", transferVal: "44%", isHighlighted: true, badgeTop: "67%", badgeBottom: "32%" },
    { label: "1 Nov", opsHeight: 0, transferHeight: 0, isBlank: true },
    { label: "2 Nov", opsHeight: 70, transferHeight: 52, opsVal: "70%", transferVal: "52%" },
    { label: "3 Nov", opsHeight: 58, transferHeight: 24, opsVal: "58%", transferVal: "24%" },
  ];

  const subNavTabs = [
    { id: "Overview", label: "Agency Overview", tabTarget: "dashboard" },
    { id: "Leads", label: "Client Leads", tabTarget: "leads" },
    { id: "Retainers", label: "Orders & Payments", tabTarget: "payments" },
    { id: "Publishers", label: "Publishers (DR 50+)", tabTarget: "publishers" },
    { id: "Audits", label: "SEO Audits", tabTarget: "audits" },
    { id: "Locations", label: "Live Geolocation", tabTarget: "live_locations" },
    { id: "AiGraph", label: "AI Ecosystem (Canvas)", tabTarget: "ai_graph" },
    { id: "Variables", label: "Database Export", tabTarget: "logs" },
  ];

  const handleSubTabClick = (tabId: string, tabTarget: string) => {
    setSelectedSubTab(tabId);
    if (tabTarget !== "dashboard") {
      onSelectTab(tabTarget);
    }
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-5 items-start">
      {/* ----------------- LEFT DARK DOCK BAR (Exact Pill Design) ----------------- */}
      <aside className="w-full lg:w-16 bg-[#111215] text-white rounded-[26px] py-4 px-2.5 flex lg:flex-col items-center justify-between shrink-0 shadow-xl shadow-black/10 border border-white/5">
        {/* Top Logo / Sunburst Trigger */}
        <div className="flex lg:flex-col items-center gap-3">
          <button
            onClick={() => {
              setActiveDockItem("home");
              setSelectedSubTab("Overview");
            }}
            title="Nova Growth Core"
            className="w-10 h-10 rounded-[18px] bg-[#1d1f24] hover:bg-[#272a31] flex items-center justify-center text-white transition-all shadow-inner group"
          >
            <svg
              className="w-5 h-5 text-white group-hover:scale-110 transition-transform"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
            </svg>
          </button>

          {/* Primary Nav Icons */}
          <div className="flex lg:flex-col items-center gap-1.5 mt-2">
            {/* Home */}
            <button
              onClick={() => {
                setActiveDockItem("home");
                setSelectedSubTab("Overview");
              }}
              title="Overview"
              className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all ${
                activeDockItem === "home"
                  ? "bg-[#252830] text-white"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </button>

            {/* Share / Flow */}
            <button
              onClick={() => {
                setActiveDockItem("leads");
                onSelectTab("leads");
              }}
              title="Client Pipeline & Leads"
              className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all ${
                activeDockItem === "leads"
                  ? "bg-[#252830] text-white"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
            </button>

            {/* Cloud / AI Nexus (Active in Screenshot) */}
            <button
              onClick={() => {
                setActiveDockItem("nexus");
                onSelectTab("ai_graph");
              }}
              title="AI Spatial Nexus"
              className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all ${
                activeDockItem === "nexus"
                  ? "bg-[#282a32] text-white shadow-sm ring-1 ring-white/10"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
              </svg>
            </button>

            {/* Link / Publishers */}
            <button
              onClick={() => {
                setActiveDockItem("publishers");
                onSelectTab("publishers");
              }}
              title="Publisher Media Network"
              className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all ${
                activeDockItem === "publishers"
                  ? "bg-[#252830] text-white"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </button>

            {/* Globe / Geolocation */}
            <button
              onClick={() => {
                setActiveDockItem("globe");
                onSelectTab("live_locations");
              }}
              title="Global Live Traffic"
              className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all ${
                activeDockItem === "globe"
                  ? "bg-[#252830] text-white"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </button>

            {/* 3 Dots */}
            <button
              onClick={() => onSelectTab("payments")}
              title="Retainers & Invoices"
              className="w-9 h-9 rounded-2xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
                <circle cx="5" cy="12" r="1" />
              </svg>
            </button>
          </div>
        </div>

        {/* Bottom Utility Icons & Avatar */}
        <div className="flex lg:flex-col items-center gap-2 mt-4 lg:mt-6">
          <button
            onClick={() => onSelectTab("audits")}
            title="SEO Documentation & Audits"
            className="w-9 h-9 rounded-2xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          </button>

          <button
            onClick={onNewEntry}
            title="Launch Growth Sprint"
            className="w-9 h-9 rounded-2xl flex items-center justify-center text-slate-400 hover:text-[#DCF842] hover:bg-white/5 transition-all"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
              <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
            </svg>
          </button>

          {/* User Profile Avatar with Online Badge */}
          <div className="relative mt-1 cursor-pointer" title="Nova Growth Admin (Online)">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-600 via-indigo-600 to-sky-400 flex items-center justify-center text-white font-black text-xs ring-2 ring-white/10">
              NG
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#DCF842] ring-2 ring-[#111215]" />
          </div>
        </div>
      </aside>

      {/* ----------------- MAIN BENTO WORKSPACE AREA ----------------- */}
      <main className="flex-1 w-full min-w-0">
        {/* Top Header Row (Matching Exact Typography & Badges) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          {/* Managing Your Agency & Growth Engine Title */}
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-[38px] font-black tracking-tight text-slate-900 leading-[1.15]">
              Managing{" "}
              <span className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 text-slate-700 text-xs sm:text-sm mx-1 align-middle border border-slate-200/80 shadow-xs">
                ✹
              </span>{" "}
              Your Agency
              <br />
              and{" "}
              <span className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#DCF842] text-black text-xs sm:text-sm mx-1 align-middle shadow-xs">
                ✦
              </span>{" "}
              Growth Engine
            </h1>
          </div>

          {/* Right Header Action Buttons */}
          <div className="flex items-center gap-2.5 self-start md:self-center">
            {/* Settings Gear Button */}
            <button
              onClick={() => onSelectTab("logs")}
              title="System Settings & Logs"
              className="w-10 h-10 rounded-full bg-[#EEF0EE] hover:bg-[#E2E5E2] flex items-center justify-center text-slate-700 transition shadow-xs cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </button>

            {/* Black Pill Button: + Create a New Campaign */}
            <button
              onClick={onNewEntry}
              className="bg-[#111215] hover:bg-[#222429] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <span>+</span>
              <span>Create a New Campaign</span>
            </button>
          </div>
        </div>

        {/* Sub-Nav Pill Chips Row (Exact Screenshot Scrollable Pill Strip) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-6 no-scrollbar">
          {subNavTabs.map((tab) => {
            const isActive = selectedSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleSubTabClick(tab.id, tab.tabTarget)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#111215] text-white shadow-xs"
                    : "bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ----------------- 2-COLUMN MASTER GRID (Left Bento + Right Sidebar) ----------------- */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
          {/* LEFT 9 COLUMNS: Top 3 Cards + Large Statistics Chart */}
          <div className="xl:col-span-9 flex flex-col gap-5">
            {/* Top 3 Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* CARD 1: Operations (White Card) */}
              <div className="bg-white rounded-[28px] p-6 border border-[#E9ECE9] shadow-xs flex flex-col justify-between">
                <div>
                  {/* Header Row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="3" />
                          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                        </svg>
                      </div>
                      <span className="text-xs font-bold text-slate-800 tracking-tight">Operations</span>
                    </div>

                    <button
                      onClick={() => onSelectTab("leads")}
                      className="text-slate-400 hover:text-slate-800"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="5" r="1.5" />
                        <circle cx="12" cy="12" r="1.5" />
                        <circle cx="12" cy="19" r="1.5" />
                      </svg>
                    </button>
                  </div>

                  {/* Big Number & Percentage Pill */}
                  <div className="flex items-baseline gap-2 mb-5">
                    <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                      780
                    </span>
                    <span className="text-xs text-slate-400 font-medium">/ 1000</span>
                    <span className="ml-auto inline-flex items-center gap-1 text-[11px] font-bold text-slate-800 bg-[#E8F88A] px-2 py-0.5 rounded-full">
                      <span>82%</span>
                      <span>⟳</span>
                    </span>
                  </div>
                </div>

                {/* Vertical Capsule Indicator Row (8 solid black, 2 dashed gray) */}
                <div className="flex items-center justify-between gap-1.5 pt-2">
                  {[...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-9 w-3.5 sm:w-4 rounded-full transition-all ${
                        i < 8
                          ? "bg-[#111215]"
                          : "border border-dashed border-slate-300 bg-transparent"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* CARD 2: Data Transfer / Retainers (Lime Card #DCF842) */}
              <div className="bg-[#DCF842] rounded-[28px] p-6 shadow-xs flex flex-col justify-between text-slate-900">
                <div>
                  {/* Header Row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-black/10 flex items-center justify-center text-slate-900">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="17 1 21 5 17 9" />
                          <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                          <polyline points="7 23 3 19 7 15" />
                          <path d="M21 13v2a4 4 0 0 1-4 4H3" />
                        </svg>
                      </div>
                      <span className="text-xs font-black tracking-tight text-slate-900">Data Transfer</span>
                    </div>

                    <button
                      onClick={() => onSelectTab("payments")}
                      className="text-slate-800/60 hover:text-slate-900"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="5" r="1.5" />
                        <circle cx="12" cy="12" r="1.5" />
                        <circle cx="12" cy="19" r="1.5" />
                      </svg>
                    </button>
                  </div>

                  {/* Big Number & Percentage Pill */}
                  <div className="flex items-baseline gap-2 mb-5">
                    <span className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
                      163
                    </span>
                    <span className="text-xs text-slate-800/70 font-semibold">/ 512.0 MB</span>
                    <span className="ml-auto inline-flex items-center gap-1 text-[11px] font-bold text-slate-900 bg-white/80 px-2 py-0.5 rounded-full shadow-xs">
                      <span>68%</span>
                      <span>⟳</span>
                    </span>
                  </div>
                </div>

                {/* Vertical Capsule Indicator Row (6 solid black, 4 dashed border) */}
                <div className="flex items-center justify-between gap-1.5 pt-2">
                  {[...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-9 w-3.5 sm:w-4 rounded-full transition-all ${
                        i < 6
                          ? "bg-[#111215]"
                          : "border border-dashed border-black/30 bg-transparent"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* CARD 3: Promo / AI Automation (Obsidian Black Card with 3D Face) */}
              <div className="bg-[#111215] text-white rounded-[28px] p-6 relative overflow-hidden shadow-lg flex flex-col justify-between min-h-[190px]">
                {/* 3D AI Cyborg Face Graphic Overlay */}
                <div className="absolute right-0 top-0 bottom-0 w-36 pointer-events-none opacity-85 overflow-hidden flex items-center justify-end">
                  <div className="relative w-32 h-44 mr-[-10px]">
                    {/* Glowing AI Cybernetic Visor & Hologram Silhouette */}
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#111215]/20 to-[#111215] z-10" />
                    <img
                      src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80"
                      alt="AI Neural Engine"
                      className="w-full h-full object-cover object-center rounded-r-[28px] brightness-90 contrast-125"
                    />
                  </div>
                </div>

                <div className="relative z-10 pr-20">
                  <h3 className="text-base sm:text-lg font-bold leading-snug tracking-tight text-white">
                    Take Your <span className="inline-block text-[#DCF842]">↗</span>
                    <br />
                    Automation
                    <br />
                    to the Next
                    <br />
                    Level
                  </h3>
                </div>

                <div className="relative z-10 pt-4">
                  <button
                    onClick={() => onSelectTab("ai_graph")}
                    className="bg-white hover:bg-slate-100 text-[#111215] text-xs font-bold px-4 py-2 rounded-full inline-flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <span>Upgrade</span>
                    <span className="text-[10px]">▷</span>
                  </button>
                </div>
              </div>
            </div>

            {/* LARGE CARD: Statistics with Custom Capsule Slider Bar Chart */}
            <div className="bg-white rounded-[28px] p-6 sm:p-7 border border-[#E9ECE9] shadow-xs">
              {/* Header of Statistics */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-6">
                  {/* Title */}
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-800">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                      </svg>
                    </div>
                    <span className="text-sm font-black text-slate-900 tracking-tight">Statistics</span>
                  </div>

                  {/* Legend Bullets */}
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#111215]" />
                      <span>Operations</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#DCF842] ring-1 ring-slate-300" />
                      <span>Data transfer</span>
                    </div>
                  </div>
                </div>

                {/* Year Dropdown Pill */}
                <div className="flex items-center self-start sm:self-auto">
                  <div className="relative">
                    <select
                      value={chartYear}
                      onChange={(e) => setChartYear(e.target.value)}
                      className="appearance-none bg-transparent border border-slate-200 hover:border-slate-300 rounded-full text-xs font-bold px-3 py-1 pr-7 text-slate-800 cursor-pointer focus:outline-none"
                    >
                      <option value="2026">2026</option>
                      <option value="2025">2025</option>
                      <option value="7days">Last 7 Days</option>
                    </select>
                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[10px]">
                      ⌄
                    </span>
                  </div>
                </div>
              </div>

              {/* Chart Body with Horizontal Grid Lines and Capsule Pillars */}
              <div className="relative w-full pt-6 pb-2">
                {/* Horizontal Dotted Lines & Y-Axis Labels */}
                <div className="absolute inset-x-0 top-6 bottom-10 flex flex-col justify-between pointer-events-none text-[11px] text-slate-300 font-mono">
                  {[1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1].map((val) => (
                    <div key={val} className="flex items-center gap-3 w-full">
                      <span className="w-5 text-right select-none">{val.toFixed(1)}</span>
                      <div className="flex-1 border-b border-dashed border-slate-100" />
                    </div>
                  ))}
                </div>

                {/* 8 Column Bars Container */}
                <div className="relative z-10 ml-8 grid grid-cols-8 gap-2 sm:gap-4 h-[220px] items-end">
                  {chartDays.map((col, idx) => {
                    if (col.isBlank) {
                      return (
                        <div key={idx} className="flex flex-col items-center justify-end h-full">
                          <div className="w-8 sm:w-10 h-0" />
                          <span className="text-[11px] font-semibold text-slate-300 mt-3 block select-none">
                            {col.label}
                          </span>
                        </div>
                      );
                    }

                    const isHovered = hoveredBarIndex === idx;

                    return (
                      <div
                        key={idx}
                        onMouseEnter={() => setHoveredBarIndex(idx)}
                        className="relative flex flex-col items-center justify-end h-full group cursor-pointer"
                      >
                        {/* Highlight Vertical Dashed Pillar on Col 4 (1 Jul / 31 Oct) */}
                        {col.isHighlighted && (
                          <div className="absolute inset-y-0 w-10 sm:w-12 border-x border-dashed border-slate-300/80 rounded-3xl pointer-events-none bg-slate-50/40" />
                        )}

                        {/* Floating Badges for Highlighted Day */}
                        {col.isHighlighted && (
                          <>
                            {/* Top Badge (Black Pill) */}
                            <div className="absolute -top-1 z-20 bg-[#111215] text-white font-bold text-[10px] px-1.5 py-0.5 rounded-full shadow-md">
                              {col.badgeTop}
                            </div>
                            {/* Bottom Badge (Lime Pill) */}
                            <div className="absolute top-[82px] z-20 bg-[#DCF842] text-slate-900 font-black text-[10px] px-1.5 py-0.5 rounded-full shadow-xs">
                              {col.badgeBottom}
                            </div>
                          </>
                        )}

                        {/* Master Dark Capsule Pillar Bar */}
                        <div
                          style={{ height: `${col.opsHeight}%` }}
                          className={`w-8 sm:w-10 bg-[#18191C] rounded-full relative overflow-hidden flex flex-col justify-end p-1 transition-all duration-300 ${
                            isHovered ? "ring-2 ring-slate-400 scale-[1.02]" : ""
                          }`}
                        >
                          {/* White Indicator Dot in Top Half */}
                          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/80" />

                          {/* Lime Inner Capsule Slider */}
                          <div
                            style={{ height: `${(col.transferHeight / col.opsHeight) * 100}%` }}
                            className="w-full bg-[#DCF842] rounded-full relative transition-all duration-300 flex items-start justify-center pt-1.5"
                          >
                            {/* Dark Indicator Dot on the Lime Slider */}
                            <div className="w-1.5 h-1.5 rounded-full bg-[#111215]" />
                          </div>
                        </div>

                        {/* Day Label Underneath */}
                        <span
                          className={`text-[11px] mt-3 font-semibold transition-colors ${
                            col.isHighlighted
                              ? "text-slate-950 font-black"
                              : "text-slate-400 group-hover:text-slate-700"
                          }`}
                        >
                          {col.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT 3 COLUMNS: Community, Academy + 4 Resource Cards */}
          <div className="xl:col-span-3 flex flex-col gap-4">
            {/* Top 2 Squircle Buttons (Community & Academy) */}
            <div className="grid grid-cols-2 gap-3">
              {/* Community Button */}
              <button
                onClick={() => onSelectTab("leads")}
                className="bg-[#EEF1EE] hover:bg-[#E5EAE5] rounded-[22px] p-4 flex flex-col items-center justify-center gap-2 transition cursor-pointer text-slate-800 shadow-xs group"
              >
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-700 group-hover:scale-105 transition-transform shadow-xs">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <span className="text-xs font-bold tracking-tight">Community</span>
              </button>

              {/* Academy Button */}
              <button
                onClick={() => onSelectTab("audits")}
                className="bg-[#EEF1EE] hover:bg-[#E5EAE5] rounded-[22px] p-4 flex flex-col items-center justify-center gap-2 transition cursor-pointer text-slate-800 shadow-xs group"
              >
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-700 group-hover:scale-105 transition-transform shadow-xs">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>
                </div>
                <span className="text-xs font-bold tracking-tight">Academy</span>
              </button>
            </div>

            {/* Stack of 4 Action Link Cards */}
            <div className="flex flex-col gap-3">
              {/* CARD 1: Help Center */}
              <div
                onClick={() => onSelectTab("logs")}
                className="bg-[#F7F9F7] hover:bg-white hover:shadow-md border border-[#E9ECE9] rounded-[22px] p-4 flex items-start justify-between cursor-pointer transition-all group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-slate-200/60 flex items-center justify-center text-slate-700 text-xs font-black shrink-0">
                    ?
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                      Help Center
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-tight mt-0.5 line-clamp-1">
                      Explore our detailed documentation...
                    </p>
                  </div>
                </div>
                <span className="text-slate-400 group-hover:text-slate-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-xs font-bold">
                  ↗
                </span>
              </div>

              {/* CARD 2: Partner Directory */}
              <div
                onClick={() => onSelectTab("publishers")}
                className="bg-[#F7F9F7] hover:bg-white hover:shadow-md border border-[#E9ECE9] rounded-[22px] p-4 flex items-start justify-between cursor-pointer transition-all group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-slate-200/60 flex items-center justify-center text-slate-700 shrink-0">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                      Partner Directory
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-tight mt-0.5 line-clamp-1">
                      Find the perfect partner to suppor...
                    </p>
                  </div>
                </div>
                <span className="text-slate-400 group-hover:text-slate-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-xs font-bold">
                  ↗
                </span>
              </div>

              {/* CARD 3: Blog / Retainers */}
              <div
                onClick={() => onSelectTab("payments")}
                className="bg-[#F7F9F7] hover:bg-white hover:shadow-md border border-[#E9ECE9] rounded-[22px] p-4 flex items-start justify-between cursor-pointer transition-all group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-slate-200/60 flex items-center justify-center text-slate-700 shrink-0">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <line x1="2" y1="10" x2="22" y2="10" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                      Blog & Retainers
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-tight mt-0.5 line-clamp-1">
                      Access popular guides & stories ab...
                    </p>
                  </div>
                </div>
                <span className="text-slate-400 group-hover:text-slate-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-xs font-bold">
                  ↗
                </span>
              </div>

              {/* CARD 4: Use Cases / Audits */}
              <div
                onClick={() => onSelectTab("audits")}
                className="bg-[#F7F9F7] hover:bg-white hover:shadow-md border border-[#E9ECE9] rounded-[22px] p-4 flex items-start justify-between cursor-pointer transition-all group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-slate-200/60 flex items-center justify-center text-slate-700 shrink-0">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="20" x2="18" y2="10" />
                      <line x1="12" y1="20" x2="12" y2="4" />
                      <line x1="6" y1="20" x2="6" y2="14" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                      Use Cases & SERP
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-tight mt-0.5 line-clamp-1">
                      Get inspired by all the ways you ca...
                    </p>
                  </div>
                </div>
                <span className="text-slate-400 group-hover:text-slate-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-xs font-bold">
                  ↗
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
