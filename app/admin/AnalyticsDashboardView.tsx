"use client";

import React, { useState } from "react";
import { GA_MEASUREMENT_ID, trackAnalyticsEvent } from "@/lib/analytics";

interface AnalyticsDashboardViewProps {
  stats: any;
}

export default function AnalyticsDashboardView({ stats }: AnalyticsDashboardViewProps) {
  const [testSent, setTestSent] = useState(false);

  const totalLeads = stats?.breakdown?.leads?.active || 0;
  const whatsappClicks = stats?.breakdown?.interactions?.whatsapp || 0;
  const callsMeets = stats?.breakdown?.interactions?.calls || 0;
  const auditsRun = stats?.breakdown?.audits?.active || 0;
  const paymentsCount = stats?.breakdown?.payments?.active || 0;
  const totalConversions = totalLeads + whatsappClicks + callsMeets + auditsRun + paymentsCount;

  const handleTestEvent = () => {
    trackAnalyticsEvent("admin_test_event", "diagnostic", "Admin triggered test tracking");
    setTestSent(true);
    setTimeout(() => setTestSent(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* HEADER HERO */}
      <div className="bg-gradient-to-r from-[#0b1220] via-[#0f172a] to-[#091427] border border-gray-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 px-3 py-1 rounded-full text-xs font-bold mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Google Analytics 4 &amp; Sitemap Active</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Data Analytics &amp; Search Engine Performance
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm mt-1 max-w-2xl">
              Real-time website traffic intelligence, event tracking conversions, and Google Search Console sitemap indexing status for Nova Growth.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://analytics.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-500 hover:bg-amber-400 text-black font-extrabold px-4 py-2.5 rounded-xl text-xs transition-all flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              <span>📊</span>
              <span>Open Google Analytics ↗</span>
            </a>
            <a
              href="https://search.google.com/search-console"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 hover:bg-gray-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs border border-gray-700 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>🔍</span>
              <span>Google Search Console ↗</span>
            </a>
          </div>
        </div>
      </div>

      {/* TWO PRIMARY STATUS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* GA4 INTEGRATION CARD */}
        <div className="bg-[#0b1220] border border-gray-800 rounded-2xl p-6 relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-xl">
                📈
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Google Analytics 4 (GA4)</h3>
                <span className="text-[11px] text-gray-400">Client-Side + Server-Side Tracking</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
              ● Connected
            </span>
          </div>

          <div className="space-y-3 mb-5 text-xs">
            <div className="flex justify-between items-center py-2 border-b border-gray-800/80">
              <span className="text-gray-400">Measurement ID:</span>
              <code className="bg-gray-900 px-2 py-0.5 rounded text-amber-400 font-mono font-bold">
                {GA_MEASUREMENT_ID}
              </code>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-800/80">
              <span className="text-gray-400">Script Strategy:</span>
              <span className="text-slate-300 font-medium">next/script (afterInteractive)</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-800/80">
              <span className="text-gray-400">Admin Isolation:</span>
              <span className="text-emerald-400 font-medium">✓ /admin filtered out</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-400">Automated Conversion Events:</span>
              <span className="text-slate-300 font-medium">WhatsApp, Calls, Emails, CTAs, Audits</span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={handleTestEvent}
              className="text-xs bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-white px-3 py-1.5 rounded-lg border border-gray-700 transition cursor-pointer flex items-center gap-1.5"
            >
              <span>🧪</span>
              <span>Test GA4 Event Fire</span>
            </button>
            {testSent && (
              <span className="text-[11px] text-emerald-400 font-semibold animate-pulse">
                ✓ Event dispatched to dataLayer
              </span>
            )}
          </div>
        </div>

        {/* SITEMAP & SEARCH CONSOLE CARD */}
        <div className="bg-[#0b1220] border border-gray-800 rounded-2xl p-6 relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-xl">
                🗺️
              </div>
              <div>
                <h3 className="text-base font-bold text-white">XML Sitemap &amp; Robots</h3>
                <span className="text-[11px] text-gray-400">Search Engine Crawler Directives</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-950 text-blue-400 border border-blue-800">
              ● Dynamic XML
            </span>
          </div>

          <div className="space-y-3 mb-5 text-xs">
            <div className="flex justify-between items-center py-2 border-b border-gray-800/80">
              <span className="text-gray-400">Sitemap Endpoint:</span>
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:underline font-mono"
              >
                /sitemap.xml ↗
              </a>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-800/80">
              <span className="text-gray-400">Robots.txt Directive:</span>
              <a
                href="/robots.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:underline font-mono"
              >
                /robots.txt ↗
              </a>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-800/80">
              <span className="text-gray-400">Total Indexed URLs:</span>
              <span className="text-slate-200 font-bold">23 Pages (Core + 6 Case Studies + 6 Articles)</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-400">Google Site Verification:</span>
              <code className="bg-gray-900 px-2 py-0.5 rounded text-emerald-400 font-mono text-[11px]">
                eeg9kD9YKp...FrrU (Active)
              </code>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-white px-3 py-1.5 rounded-lg border border-gray-700 transition cursor-pointer flex items-center gap-1.5"
            >
              <span>📄</span>
              <span>Inspect Live Sitemap.xml</span>
            </a>
          </div>
        </div>
      </div>

      {/* CONVERSION FUNNEL METRICS */}
      <div className="bg-[#0b1220] border border-gray-800 rounded-2xl p-6">
        <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
          <span>🎯</span>
          <span>Lead &amp; Conversion Attribution Funnel</span>
        </h3>
        <p className="text-xs text-gray-400 mb-6">
          Aggregated conversion points tracked across the agency platform.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          <div className="bg-gray-900/60 p-4 rounded-xl border border-gray-800">
            <span className="text-[10px] text-gray-400 uppercase font-bold block mb-1">WhatsApp Leads</span>
            <div className="text-2xl font-black text-emerald-400">{whatsappClicks}</div>
            <span className="text-[10px] text-gray-500">Fastest closing channel</span>
          </div>

          <div className="bg-gray-900/60 p-4 rounded-xl border border-gray-800">
            <span className="text-[10px] text-gray-400 uppercase font-bold block mb-1">Calls &amp; Meets</span>
            <div className="text-2xl font-black text-blue-400">{callsMeets}</div>
            <span className="text-[10px] text-gray-500">Calendly &amp; Direct</span>
          </div>

          <div className="bg-gray-900/60 p-4 rounded-xl border border-gray-800">
            <span className="text-[10px] text-gray-400 uppercase font-bold block mb-1">SEO Audits</span>
            <div className="text-2xl font-black text-purple-400">{auditsRun}</div>
            <span className="text-[10px] text-gray-500">Domain analysis tool</span>
          </div>

          <div className="bg-gray-900/60 p-4 rounded-xl border border-gray-800">
            <span className="text-[10px] text-gray-400 uppercase font-bold block mb-1">Contact Forms</span>
            <div className="text-2xl font-black text-amber-400">{totalLeads}</div>
            <span className="text-[10px] text-gray-500">Inbound project inquiries</span>
          </div>

          <div className="bg-gray-900/60 p-4 rounded-xl border border-gray-800">
            <span className="text-[10px] text-gray-400 uppercase font-bold block mb-1">Total Conversions</span>
            <div className="text-2xl font-black text-white">{totalConversions}</div>
            <span className="text-[10px] text-emerald-400 font-semibold">100% Tracked</span>
          </div>
        </div>
      </div>
    </div>
  );
}
