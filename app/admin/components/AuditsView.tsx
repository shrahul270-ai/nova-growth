"use client";

import React, { useState } from "react";
import {
  Search,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Globe,
  Sparkles,
  ArrowUpRight,
  Shield,
  Smartphone,
  Gauge,
} from "lucide-react";
import { AuditItem } from "../types";

interface AuditsViewProps {
  audits: AuditItem[];
  onRunAudit: (domain: string) => void;
  isScanning: boolean;
}

export default function AuditsView({
  audits,
  onRunAudit,
  isScanning,
}: AuditsViewProps) {
  const [scanDomain, setScanDomain] = useState("");

  const handleScanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scanDomain.trim()) return;
    onRunAudit(scanDomain.trim());
    setScanDomain("");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              SEO Audits & Technical Website Diagnostics
            </h1>
            <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              Global Score 94/100
            </span>
          </div>
          <p className="text-[13px] text-slate-500 dark:text-slate-400 mt-1">
            Algorithmic analysis of Core Web Vitals, Schema.org markup, TTFB response times, and mobile usability.
          </p>
        </div>
      </div>

      {/* Live Domain Scanner Input */}
      <div className="p-6 rounded-[36px] bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-500/30 text-indigo-300 border border-indigo-400/30 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Real-Time Scanner
          </span>
          <h3 className="text-xl font-extrabold tracking-tight">
            Run an Express SEO Audit on Any Domain
          </h3>
          <p className="text-xs text-indigo-200 mt-1">
            Instantly generate a comprehensive technical report to present to prospects and close enterprise contracts.
          </p>

          <form onSubmit={handleScanSubmit} className="mt-4 flex flex-col sm:flex-row gap-2 max-w-lg">
            <div className="relative flex-1">
              <Globe className="w-4 h-4 text-indigo-300 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={scanDomain}
                onChange={(e) => setScanDomain(e.target.value)}
                placeholder="e.g. client-website.com"
                className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-md rounded-2xl text-sm text-white placeholder-indigo-300/60 border border-white/20 focus:border-indigo-400 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={isScanning}
              className="px-6 py-3 rounded-2xl bg-white text-indigo-900 font-extrabold text-sm hover:bg-indigo-50 transition-all shadow-lg active:scale-95 disabled:opacity-50"
            >
              {isScanning ? "Scanning Domain..." : "Launch Audit"}
            </button>
          </form>
        </div>
      </div>

      {/* Audits History Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {audits.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-[36px] bg-white dark:bg-[#111827] border border-[#f1f5f9] dark:border-slate-800/80 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center font-extrabold text-xs">
                    🌐
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                      {item.domain}
                    </h4>
                    <span className="text-[11px] text-slate-400">{item.date}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-2xl font-black text-slate-900 dark:text-white">
                    {item.overallScore}
                  </span>
                  <span className="text-xs text-slate-400 font-bold">/100</span>
                </div>
              </div>

              {/* 3 Metric Gauges */}
              <div className="grid grid-cols-3 gap-2 my-5 text-center">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
                  <Gauge className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
                  <span className="text-lg font-black text-slate-900 dark:text-white block">
                    {item.performanceScore}%
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Speed</span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
                  <Zap className="w-4 h-4 text-indigo-500 mx-auto mb-1" />
                  <span className="text-lg font-black text-slate-900 dark:text-white block">
                    {item.seoScore}%
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-400">On-Page SEO</span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
                  <Smartphone className="w-4 h-4 text-amber-500 mx-auto mb-1" />
                  <span className="text-lg font-black text-slate-900 dark:text-white block">
                    {item.mobileScore}%
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Mobile UX</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Indexed on Google & Bing
              </span>
              <a
                href={item.url || `https://${item.domain}`}
                target="_blank"
                rel="noreferrer"
                className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center gap-1"
              >
                <span>Visit Website</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}