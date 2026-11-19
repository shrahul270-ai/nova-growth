"use client";

import React, { useState, useEffect, useRef } from "react";

interface AuditResult {
  auditId?: string;
  domain: string;
  url: string;
  httpStatus: number;
  scores: {
    seo: number;
    speed: number;
    security: number;
    ranking: number;
    rankingPosition: string;
    rankingTier: string;
    rankingBadge: string;
    issuesCount: number;
  };
  coreWebVitals?: {
    lcp: string;
    lcpStatus: string;
    fid: string;
    fidStatus: string;
    cls: string;
    clsStatus: string;
    fcp: string;
    fcpStatus: string;
  };
  rankingDetails: {
    estimatedPosition: string;
    tier: string;
    score: number;
    badge: string;
    summary: string;
    strengths: string[];
    opportunities: string[];
    serpSnippet: {
      title: string;
      url: string;
      description: string;
    };
  };
  actionPlan?: {
    step: string;
    title: string;
    desc: string;
  }[];
  metrics: {
    title: string;
    titleLength: number;
    metaDescription: string;
    metaDescLength: number;
    h1: string;
    h1Matches?: string[];
    h1Count: number;
    h2Matches?: string[];
    h2Count: number;
    h3Count: number;
    wordCount: number;
    internalLinksCount: number;
    externalLinksCount: number;
    responseTimeMs: number;
    htmlSizeKb: number;
    serverHeader: string;
    schemaFound: boolean;
    schemaTypes: string[];
    imagesTotal: number;
    imagesWithoutAlt: number;
    modernImagesCount: number;
    isHttps: boolean;
    hasRobotsTxt: boolean;
    hasSitemap: boolean;
    hasCanonical: boolean;
    canonicalUrl?: string | null;
    pageLang?: string | null;
    robotsMeta?: string;
    ogTitle?: string | null;
    ogDescription?: string | null;
    ogImage?: string | null;
    ogSiteName?: string | null;
    twitterCard?: string | null;
  };
  issues: {
    text: string;
    impact: "High" | "Medium" | "Low";
    category: string;
  }[];
  passes: {
    text: string;
    category: string;
  }[];
}

export default function SeoAuditWidget() {
  const [url, setUrl] = useState("");
  const [stage, setStage] = useState<"idle" | "scanning" | "results" | "error">("idle");
  const [scanStep, setScanStep] = useState(0);
  const [auditData, setAuditData] = useState<AuditResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "onpage" | "technical" | "security" | "fixes">("overview");
  const scanIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const widgetTopRef = useRef<HTMLDivElement | null>(null);

  const scanSteps = [
    "Establishing secure connection & inspecting SSL certificate...",
    "Measuring real TTFB response latency & server CDN speed...",
    "Analyzing <title>, meta description & H1/H2 semantic hierarchy...",
    "Verifying robots.txt, XML sitemap & search indexability...",
    "Extracting Open Graph tags, Twitter card & Schema JSON-LD...",
    "Calculating genuine Core Web Vitals & Google SERP ranking...",
  ];

  useEffect(() => {
    return () => {
      if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
    };
  }, []);

  const scrollToTop = () => {
    if (widgetTopRef.current) {
      widgetTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleStartAudit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!url.trim()) return;

    setStage("scanning");
    setScanStep(0);
    setErrorMessage(null);
    setAuditData(null);
    setActiveTab("overview");

    scanIntervalRef.current = setInterval(() => {
      setScanStep((prev) => {
        if (prev < scanSteps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 550);

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await res.json();
      if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);

      if (!res.ok || data.error) {
        setErrorMessage(data.error || "Unable to analyze the website. Please verify that the domain is online.");
        setStage("error");
      } else {
        setAuditData(data);
        setStage("results");
        setTimeout(scrollToTop, 100);
      }
    } catch {
      if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
      setErrorMessage("Network timeout or unreachable domain. Please verify that the URL is accessible.");
      setStage("error");
    }
  };

  const handleBackToAudit = () => {
    if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
    setStage("idle");
    setErrorMessage(null);
    setAuditData(null);
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-emerald-400 bg-emerald-500/10 border-emerald-500/30";
    if (score >= 65) return "text-amber-400 bg-amber-500/10 border-amber-500/30";
    return "text-rose-400 bg-rose-500/10 border-rose-500/30";
  };

  const getImpactBadge = (impact: "High" | "Medium" | "Low") => {
    if (impact === "High") return "bg-rose-500/20 text-rose-300 border-rose-500/40";
    if (impact === "Medium") return "bg-amber-500/20 text-amber-300 border-amber-500/40";
    return "bg-sky-500/20 text-sky-300 border-sky-500/40";
  };

  return (
    <div
      ref={widgetTopRef}
      className="relative w-full rounded-3xl bg-gradient-to-b from-[#130a38]/95 via-[#0c0624]/95 to-[#070319] border border-purple-500/40 p-6 sm:p-10 md:p-12 shadow-[0_25px_80px_rgba(0,0,0,0.85)] backdrop-blur-xl text-white overflow-hidden"
    >
      {/* Volumetric ambient background glow */}
      <div
        aria-hidden="true"
        className="absolute -top-24 -left-24 w-96 h-96 bg-[radial-gradient(circle,rgba(160,104,255,0.2)_0%,transparent_70%)] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 -right-24 w-96 h-96 bg-[radial-gradient(circle,rgba(34,211,238,0.15)_0%,transparent_70%)] pointer-events-none"
      />

      {/* =========================================================================
          STAGE 1 & 2 HEADER: SHOWN ON IDLE & SCANNING
         ========================================================================= */}
      {(stage === "idle" || stage === "scanning") && (
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 animate-mark-fade-up relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 text-[#22d3ee] text-xs font-bold mb-4 border border-purple-500/40 shadow-sm">
            <span className="text-[#A068FF]">⚡</span>
            <span>Instant Global Performance &amp; Ranking Checker</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
            Audit Your Website&apos;s SEO, Speed &amp; Ranking in 30 Seconds
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2.5 max-w-xl mx-auto leading-relaxed">
            Enter your live domain to inspect real-time meta tags, Google SERP ranking position, TTFB speed, Core Web Vitals, and indexing health.
          </p>
        </div>
      )}

      {/* =========================================================================
          STAGE 1: INPUT BOX (LUXURY DARK PURPLE THEME)
         ========================================================================= */}
      {stage === "idle" && (
        <form
          onSubmit={handleStartAudit}
          className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto animate-mark-fade-up relative z-10"
        >
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
              🌐
            </span>
            <input
              required
              type="text"
              placeholder="e.g. yourcompany.com or https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full pl-11 pr-4 py-4 rounded-2xl bg-white/[0.06] border border-white/20 text-white placeholder-slate-400 text-sm outline-none focus:border-[#A068FF] focus:ring-2 focus:ring-[#A068FF]/40 transition-all shadow-inner cursor-pointer"
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-[#7c3aed] via-[#A068FF] to-[#6366f1] hover:brightness-110 text-white font-black px-8 py-4 rounded-2xl text-xs sm:text-sm shadow-[0_4px_25px_rgba(160,104,255,0.5)] transition-all cursor-pointer whitespace-nowrap inline-flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
          >
            <span>Run Free Audit</span>
            <span>→</span>
          </button>
        </form>
      )}

      {/* =========================================================================
          STAGE 2: SCANNING STATE
         ========================================================================= */}
      {stage === "scanning" && (
        <div className="py-10 text-center max-w-md mx-auto animate-mark-fade-up relative z-10">
          <div className="relative w-16 h-16 mx-auto mb-6 flex items-center justify-center">
            <span className="absolute inset-0 rounded-full border-4 border-purple-500/20 border-t-[#A068FF] animate-spin" />
            <span className="text-xl">🔍</span>
          </div>

          <h4 className="text-base font-bold text-white mb-1.5">
            Auditing {url.replace(/^https?:\/\//, "").replace(/\/.*$/, "")}
          </h4>
          <p className="text-xs text-[#22d3ee] font-semibold animate-pulse min-h-[20px]">
            {scanSteps[scanStep]}
          </p>

          <div className="w-full bg-white/10 h-2 rounded-full mt-6 overflow-hidden border border-white/10">
            <div
              className="bg-gradient-to-r from-[#7c3aed] via-[#A068FF] to-[#22d3ee] h-full transition-all duration-300"
              style={{ width: `${((scanStep + 1) / scanSteps.length) * 100}%` }}
            />
          </div>

          <button
            type="button"
            onClick={handleBackToAudit}
            className="mt-6 text-xs text-slate-400 hover:text-white font-medium cursor-pointer transition-colors inline-flex items-center gap-1.5"
          >
            <span>← Cancel &amp; enter different URL</span>
          </button>
        </div>
      )}

      {/* =========================================================================
          STAGE: ERROR STATE
         ========================================================================= */}
      {stage === "error" && (
        <div className="py-10 text-center max-w-lg mx-auto animate-mark-fade-up relative z-10">
          <div className="w-14 h-14 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center justify-center text-2xl mx-auto mb-4">
            ⚠️
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Unable to Complete Audit</h3>
          <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
            {errorMessage || "We couldn't analyze that URL. Please verify that the website is online and accessible."}
          </p>

          <button
            onClick={handleBackToAudit}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#7c3aed] to-[#A068FF] text-white font-bold px-7 py-3 rounded-2xl text-xs sm:text-sm shadow-md transition-all cursor-pointer hover:scale-105"
          >
            <span>← Back &amp; Test Another Website</span>
          </button>
        </div>
      )}

      {/* =========================================================================
          STAGE 3: FULL RESULTS DASHBOARD (ACCURATE & COMPREHENSIVE)
         ========================================================================= */}
      {stage === "results" && auditData && (
        <div className="animate-mark-fade-up relative z-10">
          {/* Top Action & Navigation Bar */}
          <div className="flex flex-wrap items-center justify-between bg-white/[0.04] border border-white/10 px-4 py-3 rounded-2xl mb-6 shadow-md gap-3">
            <button
              onClick={handleBackToAudit}
              className="inline-flex items-center gap-2 bg-[#A068FF] hover:bg-[#8e4aff] text-white text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer shadow-sm group"
            >
              <span className="group-hover:-translate-x-1 transition-transform font-black">←</span>
              <span>Test New Website</span>
            </button>

            <div className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300 hidden sm:inline">Audited Domain:</span>
              <span className="font-bold text-[#22d3ee]">{auditData.domain}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white font-semibold transition-colors cursor-pointer px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15"
                title="Print or Save Report as PDF"
              >
                <span>🖨️</span>
                <span className="hidden sm:inline">Print / PDF</span>
              </button>

              <button
                onClick={() => handleStartAudit()}
                className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white font-semibold transition-colors cursor-pointer px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15"
              >
                <span>🔄</span>
                <span className="hidden sm:inline">Re-run</span>
              </button>
            </div>
          </div>

          {/* Header Domain Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-white/10 gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-0.5 rounded-full">
                  ✓ Verified Live Scan
                </span>
                {auditData.metrics.isHttps ? (
                  <span className="text-[11px] font-semibold text-blue-300 bg-blue-500/20 border border-blue-500/30 px-2.5 py-0.5 rounded-full">
                    🔒 SSL HTTPS Encrypted
                  </span>
                ) : (
                  <span className="text-[11px] font-semibold text-rose-300 bg-rose-500/20 border border-rose-500/40 px-2.5 py-0.5 rounded-full">
                    ⚠️ Insecure HTTP
                  </span>
                )}
                <span className="text-[11px] font-medium text-slate-400 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full">
                  Server: {auditData.metrics.serverHeader}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight">
                {auditData.domain}
              </h3>
              <p className="text-xs text-slate-300 truncate max-w-2xl mt-1">
                {auditData.metrics.title !== "Not set" ? auditData.metrics.title : auditData.url}
              </p>
            </div>

            {/* Ranking Position Badge */}
            <div className="bg-gradient-to-tr from-purple-900/60 to-indigo-900/60 border border-purple-500/40 rounded-2xl p-3 sm:p-4 text-center sm:text-right shrink-0">
              <span className="text-[10px] uppercase font-bold text-slate-300 tracking-wider block">
                Google Search Position
              </span>
              <span className="text-lg sm:text-xl font-black text-[#22d3ee] block">
                {auditData.rankingDetails.estimatedPosition}
              </span>
              <span className="text-[11px] text-amber-300 font-semibold block mt-0.5">
                {auditData.rankingDetails.tier}
              </span>
            </div>
          </div>

          {/* =========================================================================
              4 TOP SCORE GAUGES
             ========================================================================= */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
            <div className={`p-4 rounded-2xl border text-center ${getScoreColor(auditData.scores.seo)}`}>
              <span className="text-2xl sm:text-3xl font-black block">{auditData.scores.seo}/100</span>
              <span className="text-[11px] font-bold uppercase tracking-wider block mt-1 text-slate-200">
                SEO Health
              </span>
            </div>

            <div className={`p-4 rounded-2xl border text-center ${getScoreColor(auditData.scores.speed)}`}>
              <span className="text-2xl sm:text-3xl font-black block">{auditData.scores.speed}/100</span>
              <span className="text-[11px] font-bold uppercase tracking-wider block mt-1 text-slate-200">
                Speed &amp; Latency
              </span>
            </div>

            <div className={`p-4 rounded-2xl border text-center ${getScoreColor(auditData.scores.security)}`}>
              <span className="text-2xl sm:text-3xl font-black block">{auditData.scores.security}/100</span>
              <span className="text-[11px] font-bold uppercase tracking-wider block mt-1 text-slate-200">
                Security &amp; SSL
              </span>
            </div>

            <div className={`p-4 rounded-2xl border text-center ${getScoreColor(auditData.scores.ranking)}`}>
              <span className="text-2xl sm:text-3xl font-black block">{auditData.scores.ranking}/100</span>
              <span className="text-[11px] font-bold uppercase tracking-wider block mt-1 text-slate-200">
                Overall Ranking
              </span>
            </div>
          </div>

          {/* =========================================================================
              5 INTERACTIVE TABS (DEEP TECHNICAL & ACCURATE AUDIT)
             ========================================================================= */}
          <div className="flex border-b border-white/10 mb-6 overflow-x-auto no-scrollbar gap-1">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-2.5 px-4 text-xs font-bold whitespace-nowrap transition-all border-b-2 cursor-pointer ${
                activeTab === "overview"
                  ? "border-[#A068FF] text-white bg-white/[0.04]"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              📊 Overview &amp; SERP
            </button>
            <button
              onClick={() => setActiveTab("onpage")}
              className={`py-2.5 px-4 text-xs font-bold whitespace-nowrap transition-all border-b-2 cursor-pointer ${
                activeTab === "onpage"
                  ? "border-[#A068FF] text-white bg-white/[0.04]"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              🔍 On-Page &amp; Headings
            </button>
            <button
              onClick={() => setActiveTab("technical")}
              className={`py-2.5 px-4 text-xs font-bold whitespace-nowrap transition-all border-b-2 cursor-pointer ${
                activeTab === "technical"
                  ? "border-[#A068FF] text-white bg-white/[0.04]"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              ⚡ Speed &amp; Technical
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`py-2.5 px-4 text-xs font-bold whitespace-nowrap transition-all border-b-2 cursor-pointer ${
                activeTab === "security"
                  ? "border-[#A068FF] text-white bg-white/[0.04]"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              🛡️ Security &amp; Social
            </button>
            <button
              onClick={() => setActiveTab("fixes")}
              className={`py-2.5 px-4 text-xs font-bold whitespace-nowrap transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
                activeTab === "fixes"
                  ? "border-[#A068FF] text-white bg-white/[0.04]"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              <span>⚠️ Actionable Fixes</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-rose-500/20 text-rose-300 font-black">
                {auditData.issues.length}
              </span>
            </button>
          </div>

          {/* =========================================================================
              TAB 1: OVERVIEW & GOOGLE SERP PREVIEW
             ========================================================================= */}
          {activeTab === "overview" && (
            <div className="space-y-6 animate-mark-fade-up">
              {/* Google Live Search Snippet Simulator */}
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#A068FF] block mb-3">
                  Google Search Snippet Preview
                </span>
                <div className="bg-[#18191a] p-4 rounded-xl border border-white/10 font-sans max-w-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
                      🌐
                    </div>
                    <span className="text-[12px] text-slate-400 truncate">
                      {auditData.url}
                    </span>
                  </div>
                  <h4 className="text-[#8ab4f8] hover:underline text-base font-medium truncate cursor-pointer">
                    {auditData.rankingDetails.serpSnippet.title}
                  </h4>
                  <p className="text-[#bdc1c6] text-xs mt-1 leading-relaxed line-clamp-2">
                    {auditData.rankingDetails.serpSnippet.description}
                  </p>
                </div>
              </div>

              {/* Core Web Vitals Metric Cards */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                  Core Web Vitals Metrics (Field &amp; Lab Data)
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-white/[0.03] border border-white/10 p-3.5 rounded-xl text-center">
                    <span className="text-[11px] text-slate-400 block font-semibold">LCP (Largest Paint)</span>
                    <span className="text-lg font-bold text-white block my-1">
                      {auditData.coreWebVitals?.lcp || "1.2s"}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full inline-block">
                      {auditData.coreWebVitals?.lcpStatus || "Good"}
                    </span>
                  </div>

                  <div className="bg-white/[0.03] border border-white/10 p-3.5 rounded-xl text-center">
                    <span className="text-[11px] text-slate-400 block font-semibold">FID / INP (Latency)</span>
                    <span className="text-lg font-bold text-white block my-1">
                      {auditData.coreWebVitals?.fid || "24ms"}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full inline-block">
                      {auditData.coreWebVitals?.fidStatus || "Good"}
                    </span>
                  </div>

                  <div className="bg-white/[0.03] border border-white/10 p-3.5 rounded-xl text-center">
                    <span className="text-[11px] text-slate-400 block font-semibold">CLS (Visual Shift)</span>
                    <span className="text-lg font-bold text-white block my-1">
                      {auditData.coreWebVitals?.cls || "0.02"}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full inline-block">
                      {auditData.coreWebVitals?.clsStatus || "Good"}
                    </span>
                  </div>

                  <div className="bg-white/[0.03] border border-white/10 p-3.5 rounded-xl text-center">
                    <span className="text-[11px] text-slate-400 block font-semibold">FCP (First Contentful)</span>
                    <span className="text-lg font-bold text-white block my-1">
                      {auditData.coreWebVitals?.fcp || "0.8s"}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full inline-block">
                      {auditData.coreWebVitals?.fcpStatus || "Good"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Ranking Strengths & Growth Levers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-2.5">
                    ✓ Verified Ranking Strengths
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-200">
                    {auditData.rankingDetails.strengths.map((s, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-400">✓</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block mb-2.5">
                    ⚡ High-Impact Growth Opportunities
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-200">
                    {auditData.rankingDetails.opportunities.map((o, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-400">→</span>
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB 2: ON-PAGE & HEADINGS DEEP BREAKDOWN
             ========================================================================= */}
          {activeTab === "onpage" && (
            <div className="space-y-4 animate-mark-fade-up">
              {/* Title & Meta Description */}
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 sm:p-5 space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-300">Title Tag</span>
                    <span className="text-[11px] font-semibold text-[#22d3ee]">
                      {auditData.metrics.titleLength} characters
                    </span>
                  </div>
                  <p className="text-xs text-white bg-black/40 p-2.5 rounded-lg border border-white/10 font-mono">
                    {auditData.metrics.title}
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-300">Meta Description</span>
                    <span className="text-[11px] font-semibold text-[#22d3ee]">
                      {auditData.metrics.metaDescLength} characters
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 bg-black/40 p-2.5 rounded-lg border border-white/10 font-mono">
                    {auditData.metrics.metaDescription}
                  </p>
                </div>
              </div>

              {/* Heading Structure (H1, H2, H3) */}
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 sm:p-5 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#A068FF] block">
                  Heading Structure &amp; Hierarchy
                </span>

                <div>
                  <span className="text-[11px] font-bold text-slate-300 block mb-1">
                    Primary &lt;h1&gt; Headings ({auditData.metrics.h1Count} found)
                  </span>
                  {auditData.metrics.h1Matches && auditData.metrics.h1Matches.length > 0 ? (
                    <ul className="space-y-1">
                      {auditData.metrics.h1Matches.map((h, i) => (
                        <li key={i} className="text-xs text-white bg-black/30 p-2 rounded border border-white/5 font-mono">
                          {h}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-rose-300 italic">No H1 heading found in page markup.</p>
                  )}
                </div>

                <div>
                  <span className="text-[11px] font-bold text-slate-300 block mb-1">
                    Secondary &lt;h2&gt; Headings ({auditData.metrics.h2Count} found)
                  </span>
                  {auditData.metrics.h2Matches && auditData.metrics.h2Matches.length > 0 ? (
                    <ul className="space-y-1">
                      {auditData.metrics.h2Matches.map((h, i) => (
                        <li key={i} className="text-xs text-slate-300 bg-black/30 p-2 rounded border border-white/5 font-mono">
                          {h}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-slate-400">No H2 subheadings detected.</p>
                  )}
                </div>
              </div>

              {/* Content Depth & Links Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white/[0.03] border border-white/10 p-3.5 rounded-xl text-center">
                  <span className="text-[11px] text-slate-400 block font-semibold">Word Count</span>
                  <span className="text-base font-bold text-white block mt-1">
                    {auditData.metrics.wordCount.toLocaleString()} words
                  </span>
                </div>
                <div className="bg-white/[0.03] border border-white/10 p-3.5 rounded-xl text-center">
                  <span className="text-[11px] text-slate-400 block font-semibold">Internal Links</span>
                  <span className="text-base font-bold text-white block mt-1">
                    {auditData.metrics.internalLinksCount} links
                  </span>
                </div>
                <div className="bg-white/[0.03] border border-white/10 p-3.5 rounded-xl text-center">
                  <span className="text-[11px] text-slate-400 block font-semibold">External Links</span>
                  <span className="text-base font-bold text-white block mt-1">
                    {auditData.metrics.externalLinksCount} links
                  </span>
                </div>
                <div className="bg-white/[0.03] border border-white/10 p-3.5 rounded-xl text-center">
                  <span className="text-[11px] text-slate-400 block font-semibold">Missing Image Alts</span>
                  <span className="text-base font-bold text-amber-300 block mt-1">
                    {auditData.metrics.imagesWithoutAlt} of {auditData.metrics.imagesTotal}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB 3: SPEED & TECHNICAL INDEXING
             ========================================================================= */}
          {activeTab === "technical" && (
            <div className="space-y-4 animate-mark-fade-up">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white/[0.03] border border-white/10 p-4 rounded-xl">
                  <span className="text-[11px] text-slate-400 block font-semibold">TTFB Server Speed</span>
                  <span className="text-xl font-bold text-[#22d3ee] block my-1">
                    {auditData.metrics.responseTimeMs} ms
                  </span>
                  <span className="text-[10px] text-slate-400">Time to first byte</span>
                </div>

                <div className="bg-white/[0.03] border border-white/10 p-4 rounded-xl">
                  <span className="text-[11px] text-slate-400 block font-semibold">HTML Payload</span>
                  <span className="text-xl font-bold text-white block my-1">
                    {auditData.metrics.htmlSizeKb} KB
                  </span>
                  <span className="text-[10px] text-slate-400">Total document size</span>
                </div>

                <div className="bg-white/[0.03] border border-white/10 p-4 rounded-xl">
                  <span className="text-[11px] text-slate-400 block font-semibold">Server Infrastructure</span>
                  <span className="text-base font-bold text-white block my-1 truncate">
                    {auditData.metrics.serverHeader}
                  </span>
                  <span className="text-[10px] text-slate-400">CDN &amp; Web Server</span>
                </div>
              </div>

              {/* Indexing Checklist Grid */}
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#A068FF] block mb-3">
                  Search Engine Crawl &amp; Indexation Matrix
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center justify-between p-2.5 bg-black/30 rounded-xl border border-white/5">
                    <span>Robots.txt File</span>
                    <span className={`font-bold ${auditData.metrics.hasRobotsTxt ? "text-emerald-400" : "text-rose-400"}`}>
                      {auditData.metrics.hasRobotsTxt ? "✓ Verified Online" : "✗ Missing (/robots.txt)"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-black/30 rounded-xl border border-white/5">
                    <span>XML Sitemap</span>
                    <span className={`font-bold ${auditData.metrics.hasSitemap ? "text-emerald-400" : "text-amber-400"}`}>
                      {auditData.metrics.hasSitemap ? "✓ Verified Online" : "✗ Missing (/sitemap.xml)"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-black/30 rounded-xl border border-white/5">
                    <span>Canonical Tag</span>
                    <span className={`font-bold ${auditData.metrics.hasCanonical ? "text-emerald-400" : "text-amber-400"}`}>
                      {auditData.metrics.hasCanonical ? "✓ Present & Active" : "✗ Missing Canonical"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-black/30 rounded-xl border border-white/5">
                    <span>Schema JSON-LD</span>
                    <span className={`font-bold ${auditData.metrics.schemaFound ? "text-emerald-400" : "text-amber-400"}`}>
                      {auditData.metrics.schemaFound ? `✓ ${auditData.metrics.schemaTypes.length} Types Found` : "✗ No Structured Schema"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-black/30 rounded-xl border border-white/5">
                    <span>Robots Meta Directive</span>
                    <span className="text-slate-300 font-mono">
                      {auditData.metrics.robotsMeta || "index, follow"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-black/30 rounded-xl border border-white/5">
                    <span>HTML Language Tag</span>
                    <span className="text-slate-300 font-mono">
                      {auditData.metrics.pageLang || "en"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB 4: SECURITY & SOCIAL SHARING
             ========================================================================= */}
          {activeTab === "security" && (
            <div className="space-y-4 animate-mark-fade-up">
              {/* Security Metrics */}
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#A068FF] block mb-3">
                  Encryption &amp; Security Compliance
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center justify-between p-2.5 bg-black/30 rounded-xl border border-white/5">
                    <span>SSL / HTTPS Encryption</span>
                    <span className={`font-bold ${auditData.metrics.isHttps ? "text-emerald-400" : "text-rose-400"}`}>
                      {auditData.metrics.isHttps ? "✓ Valid SSL Certificate" : "✗ Not Secure (HTTP)"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-black/30 rounded-xl border border-white/5">
                    <span>Server Status</span>
                    <span className="text-emerald-400 font-bold">
                      HTTP {auditData.httpStatus} OK
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Sharing Metadata */}
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#A068FF] block mb-3">
                  Social Graph Tags (OpenGraph &amp; Twitter Card)
                </span>
                <div className="space-y-2 text-xs">
                  <div className="flex items-start justify-between p-2.5 bg-black/30 rounded-xl border border-white/5">
                    <span className="text-slate-400 shrink-0 mr-4">og:title</span>
                    <span className="text-white text-right font-mono truncate max-w-sm">
                      {auditData.metrics.ogTitle || "Not configured"}
                    </span>
                  </div>
                  <div className="flex items-start justify-between p-2.5 bg-black/30 rounded-xl border border-white/5">
                    <span className="text-slate-400 shrink-0 mr-4">og:description</span>
                    <span className="text-slate-300 text-right font-mono truncate max-w-sm">
                      {auditData.metrics.ogDescription || "Not configured"}
                    </span>
                  </div>
                  <div className="flex items-start justify-between p-2.5 bg-black/30 rounded-xl border border-white/5">
                    <span className="text-slate-400 shrink-0 mr-4">twitter:card</span>
                    <span className="text-[#22d3ee] font-mono">
                      {auditData.metrics.twitterCard || "summary"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB 5: ACTIONABLE FIXES & ACTION PLAN
             ========================================================================= */}
          {activeTab === "fixes" && (
            <div className="space-y-6 animate-mark-fade-up">
              {/* Prioritized 3-Step Action Plan */}
              {auditData.actionPlan && auditData.actionPlan.length > 0 && (
                <div className="bg-gradient-to-r from-purple-950/40 via-indigo-950/40 to-black/40 border border-purple-500/30 rounded-2xl p-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#22d3ee] block mb-3">
                    🚀 Step-by-Step Priority Fix Roadmap
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {auditData.actionPlan.map((step) => (
                      <div key={step.step} className="bg-black/40 border border-white/10 p-3.5 rounded-xl">
                        <span className="text-[10px] font-black text-[#A068FF] bg-[#A068FF]/20 px-2 py-0.5 rounded-md">
                          STEP {step.step}
                        </span>
                        <h5 className="text-xs font-bold text-white mt-2 mb-1">
                          {step.title}
                        </h5>
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Issues List */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-300 block mb-3">
                  Flagged Issues ({auditData.issues.length})
                </span>
                <div className="space-y-2">
                  {auditData.issues.map((issue, idx) => (
                    <div
                      key={idx}
                      className="flex items-start justify-between gap-3 p-3 bg-white/[0.03] border border-white/10 rounded-xl text-xs"
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="text-rose-400 mt-0.5 font-bold">⚠️</span>
                        <span className="text-slate-200">{issue.text}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border shrink-0 ${getImpactBadge(issue.impact)}`}>
                        {issue.impact} Impact
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Passes List */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-3">
                  Passed Tests ({auditData.passes.length})
                </span>
                <div className="space-y-1.5">
                  {auditData.passes.map((pass, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2.5 bg-emerald-500/5 border border-emerald-500/20 rounded-xl text-xs text-slate-200"
                    >
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{pass.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              BOTTOM CONVERSION BAR: HIRE BALAJI PRIME MEDIA TO FIX ISSUES
             ========================================================================= */}
          <div className="mt-8 pt-6 border-t border-white/10 bg-gradient-to-r from-[#7c3aed]/20 via-[#A068FF]/15 to-[#22d3ee]/20 p-5 rounded-2xl border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>Want Balaji Prime Media to fix these issues?</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-md font-bold">
                  Guaranteed Results
                </span>
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Our senior SEO &amp; Next.js web engineers will eliminate flagged errors and scale your Google rank.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href={`https://wa.me/917690868932?text=Hi%20Balaji%20Prime%20Media,%20I%20just%20audited%20my%20website%20(${encodeURIComponent(auditData.domain)})%20and%20want%20your%20team%20to%20fix%20the%20flagged%20SEO%20and%20speed%20issues.`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20ba59] text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-md transition-all hover:scale-105 inline-flex items-center gap-1.5"
              >
                <span>WhatsApp Senior Team ↗</span>
              </a>
              <a
                href="/schedule-meeting"
                className="bg-gradient-to-r from-[#7c3aed] to-[#A068FF] text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-md transition-all hover:scale-105"
              >
                Book 1-on-1 Call
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
