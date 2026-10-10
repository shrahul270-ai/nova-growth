"use client";

import React, { useState } from "react";

export default function SeoAuditWidget() {
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [stage, setStage] = useState<"idle" | "scanning" | "results" | "success">("idle");
  const [scanStep, setScanStep] = useState(0);

  const scanSteps = [
    "Checking SSL certificate & HTTPS security...",
    "Measuring Core Web Vitals (LCP, FID, CLS)...",
    "Analyzing on-page title tags, H1s & schema...",
    "Auditing backlink authority & toxic links...",
    "Calculating global organic growth score...",
  ];

  const handleStartAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setStage("scanning");
    setScanStep(0);

    const interval = setInterval(() => {
      setScanStep((prev) => {
        if (prev >= scanSteps.length - 1) {
          clearInterval(interval);
          setStage("results");
          return prev;
        }
        return prev + 1;
      });
    }, 700);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStage("success");
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl border border-[#d97706]/30 shadow-xl p-6 sm:p-10 relative overflow-hidden text-left">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl -z-10 opacity-70 pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-[#091427] text-xs font-bold mb-3 border border-[#d97706]/30">
          <span className="text-[#d97706]">⚡</span>
          <span>Instant Global Performance Checker</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#091427] tracking-tight">
          Audit Your Website&apos;s SEO &amp; Speed in 30 Seconds
        </h2>
        <p className="text-xs sm:text-sm text-[#54647c] mt-2">
          Discover why your site isn&apos;t ranking on Google and what technical fixes will drive immediate international traffic.
        </p>
      </div>

      {/* STAGE 1: URL INPUT */}
      {stage === "idle" && (
        <form onSubmit={handleStartAudit} className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🌐</span>
            <input
              required
              type="text"
              placeholder="e.g. yourcompany.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 text-xs sm:text-sm outline-none focus:border-[#d97706] focus:ring-1 focus:ring-[#d97706]"
            />
          </div>
          <button
            type="submit"
            className="bg-[#091427] hover:bg-[#0f213d] text-white border border-[#d97706]/40 font-bold px-7 py-3.5 rounded-2xl text-xs sm:text-sm shadow-md transition-all cursor-pointer whitespace-nowrap"
          >
            Run Free Audit →
          </button>
        </form>
      )}

      {/* STAGE 2: LIVE SCANNING SIMULATION */}
      {stage === "scanning" && (
        <div className="py-8 text-center max-w-md mx-auto">
          <div className="w-14 h-14 rounded-full border-4 border-amber-100 border-t-[#091427] animate-spin mx-auto mb-5" />
          <h4 className="text-sm font-bold text-[#091427] mb-1">
            Auditing {url.replace(/^https?:\/\//, "")}
          </h4>
          <p className="text-xs text-[#d97706] font-semibold animate-pulse">
            {scanSteps[scanStep]}
          </p>
          <div className="w-full bg-gray-100 h-2 rounded-full mt-5 overflow-hidden">
            <div
              className="bg-[#d97706] h-full transition-all duration-500"
              style={{ width: `${((scanStep + 1) / scanSteps.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* STAGE 3: INTERACTIVE REPORT RESULTS & EMAIL CAPTURE */}
      {stage === "results" && (
        <div className="animate-fadeIn">
          {/* Result Score Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            <div className="bg-amber-50/80 border border-amber-200 p-4 rounded-2xl text-center">
              <span className="text-2xl font-black text-amber-700 block">64/100</span>
              <span className="text-[11px] font-bold text-gray-700 mt-1 block">SEO Health</span>
              <span className="text-[9px] text-amber-600 font-semibold">Needs Attention</span>
            </div>

            <div className="bg-rose-50/80 border border-rose-200 p-4 rounded-2xl text-center">
              <span className="text-2xl font-black text-rose-700 block">48/100</span>
              <span className="text-[11px] font-bold text-gray-700 mt-1 block">PageSpeed</span>
              <span className="text-[9px] text-rose-600 font-semibold">Slow Mobile Load</span>
            </div>

            <div className="bg-blue-50/80 border border-blue-200 p-4 rounded-2xl text-center">
              <span className="text-2xl font-black text-blue-700 block">92/100</span>
              <span className="text-[11px] font-bold text-gray-700 mt-1 block">SSL &amp; Security</span>
              <span className="text-[9px] text-blue-600 font-semibold">Protected</span>
            </div>

            <div className="bg-purple-50/80 border border-purple-200 p-4 rounded-2xl text-center">
              <span className="text-2xl font-black text-purple-700 block">12 Issues</span>
              <span className="text-[11px] font-bold text-gray-700 mt-1 block">Ranking Roadblocks</span>
              <span className="text-[9px] text-purple-600 font-semibold">Quick Fixes Available</span>
            </div>
          </div>

          {/* Detailed Teaser List */}
          <div className="bg-gray-50/90 rounded-2xl p-4 border border-gray-100 mb-8 space-y-2 text-xs">
            <div className="flex items-center justify-between text-rose-700">
              <span className="font-semibold">⚠️ Missing Structured Schema (Organization &amp; Service JSON-LD)</span>
              <span className="text-[10px] font-bold bg-rose-100 px-2 py-0.5 rounded">High Impact</span>
            </div>
            <div className="flex items-center justify-between text-amber-700">
              <span className="font-semibold">⚠️ Core Web Vitals LCP delay: 3.8s (Google benchmark is &lt; 2.5s)</span>
              <span className="text-[10px] font-bold bg-amber-100 px-2 py-0.5 rounded">Medium Impact</span>
            </div>
            <div className="flex items-center justify-between text-emerald-700">
              <span className="font-semibold">✓ Mobile viewport responsive viewport configured</span>
              <span className="text-[10px] font-bold bg-emerald-100 px-2 py-0.5 rounded">Passed</span>
            </div>
          </div>

          {/* Email Capture for Full PDF */}
          <div className="bg-amber-50/60 p-6 rounded-2xl border border-amber-200 text-center max-w-xl mx-auto">
            <h4 className="text-base font-bold text-[#091427] mb-1">
              Want the Full 15-Page Technical PDF Audit &amp; Fix Checklist?
            </h4>
            <p className="text-xs text-[#54647c] mb-4">
              Enter your work email and our strategist will send the complete diagnosis with code-level instructions.
            </p>

            <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                required
                type="email"
                placeholder="your.email@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-xs outline-none bg-white focus:border-[#d97706]"
              />
              <button
                type="submit"
                className="bg-[#091427] hover:bg-[#0f213d] text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
              >
                Send Me The Audit →
              </button>
            </form>
          </div>
        </div>
      )}

      {/* STAGE 4: SUCCESS */}
      {stage === "success" && (
        <div className="text-center py-8">
          <div className="w-12 h-12 rounded-full bg-amber-100 text-[#d97706] flex items-center justify-center text-xl mx-auto mb-3">
            ✓
          </div>
          <h3 className="text-xl font-bold text-[#091427]">Audit Dispatched to {email}</h3>
          <p className="text-xs text-[#54647c] max-w-md mx-auto mt-1 mb-6">
            Check your inbox in 2 to 3 minutes for your complete technical website review.
          </p>
          <button
            onClick={() => {
              setStage("idle");
              setUrl("");
              setEmail("");
            }}
            className="text-xs font-bold text-[#d97706] hover:underline cursor-pointer"
          >
            Audit another domain ↺
          </button>
        </div>
      )}
    </div>
  );
}
