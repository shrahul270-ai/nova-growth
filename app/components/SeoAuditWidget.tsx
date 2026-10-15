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
  metrics: {
    title: string;
    titleLength: number;
    metaDescription: string;
    metaDescLength: number;
    h1: string;
    h1Count: number;
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
  const [email, setEmail] = useState("");
  const [stage, setStage] = useState<"idle" | "scanning" | "results" | "error" | "success">("idle");
  const [scanStep, setScanStep] = useState(0);
  const [auditData, setAuditData] = useState<AuditResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"ranking" | "issues" | "passed">("ranking");
  const scanIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const widgetTopRef = useRef<HTMLDivElement | null>(null);

  const scanSteps = [
    "Connecting to live server & verifying SSL certificate...",
    "Measuring real TTFB response latency & server speed...",
    "Analyzing <title>, meta descriptions & H1/H2 semantic tags...",
    "Checking robots.txt, XML sitemap & technical indexing...",
    "Inspecting Schema JSON-LD & Open Graph rich snippet data...",
    "Calculating genuine Google SERP ranking position & score...",
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
    setActiveTab("ranking");

    scanIntervalRef.current = setInterval(() => {
      setScanStep((prev) => {
        if (prev < scanSteps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 550);

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await response.json();

      setTimeout(() => {
        if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
        if (!response.ok || data.error) {
          setErrorMessage(data.error || "Unable to audit this URL. Please verify that the domain is online.");
          setStage("error");
        } else {
          setAuditData(data);
          setStage("results");
          setTimeout(() => scrollToTop(), 100);
        }
      }, 1400);
    } catch {
      if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
      setErrorMessage("Could not reach the audit server. Please check your internet connection.");
      setStage("error");
    }
  };

  const handleBackToAudit = () => {
    if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
    setStage("idle");
    setErrorMessage(null);
    setTimeout(() => scrollToTop(), 50);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    if (auditData?.auditId) {
      try {
        await fetch("/api/audit", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ auditId: auditData.auditId, email }),
        });
      } catch (err) {
        console.warn("Could not save email to audit record:", err);
      }
    }
    setStage("success");
    setTimeout(() => scrollToTop(), 50);
  };


  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-700 bg-emerald-50/80 border-emerald-200";
    if (score >= 60) return "text-amber-700 bg-amber-50/80 border-amber-200";
    return "text-rose-700 bg-rose-50/80 border-rose-200";
  };

  const getRankingCardColor = (position: string) => {
    if (position.includes("#1 - #3") || position.includes("#4 - #10")) {
      return "text-emerald-800 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-300";
    }
    if (position.includes("#11 - #20")) {
      return "text-amber-800 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-300";
    }
    return "text-purple-800 bg-gradient-to-br from-purple-50 to-slate-50 border-purple-200";
  };

  return (
    <div
      ref={widgetTopRef}
      className="w-full max-w-4xl mx-auto bg-white rounded-3xl border border-[#d97706]/30 shadow-xl p-5 sm:p-9 relative overflow-hidden text-left transition-all"
    >
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-amber-50/80 rounded-full blur-3xl -z-10 opacity-70 pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-slate-50 rounded-full blur-3xl -z-10 opacity-60 pointer-events-none" />

      {/* HEADER - shown on idle and scanning */}
      {(stage === "idle" || stage === "scanning") && (
        <div className="text-center max-w-xl mx-auto mb-8 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-[#091427] text-xs font-bold mb-3 border border-[#d97706]/30">
            <span className="text-[#d97706]">⚡</span>
            <span>Instant Global Performance &amp; Ranking Checker</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#091427] tracking-tight">
            Audit Your Website&apos;s SEO, Speed &amp; Ranking in 30 Seconds
          </h2>
          <p className="text-xs sm:text-sm text-[#54647c] mt-2">
            Enter your live domain to inspect real-time meta tags, Google SERP ranking position, TTFB speed, and indexing health.
          </p>
        </div>
      )}

      {/* STAGE 1: URL INPUT */}
      {stage === "idle" && (
        <form onSubmit={handleStartAudit} className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto animate-fadeIn">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🌐</span>
            <input
              required
              type="text"
              placeholder="e.g. yourcompany.com or https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 text-xs sm:text-sm outline-none focus:border-[#d97706] focus:ring-1 focus:ring-[#d97706] transition-all bg-white"
            />
          </div>
          <button
            type="submit"
            className="bg-[#091427] hover:bg-[#0f213d] text-white border border-[#d97706]/40 font-bold px-7 py-3.5 rounded-2xl text-xs sm:text-sm shadow-md transition-all cursor-pointer whitespace-nowrap inline-flex items-center justify-center gap-2"
          >
            <span>Run Free Audit</span>
            <span>→</span>
          </button>
        </form>
      )}

      {/* STAGE 2: LIVE SCANNING */}
      {stage === "scanning" && (
        <div className="py-8 text-center max-w-md mx-auto animate-fadeIn">
          <div className="w-14 h-14 rounded-full border-4 border-amber-100 border-t-[#091427] animate-spin mx-auto mb-5" />
          <h4 className="text-sm font-bold text-[#091427] mb-1">
            Auditing {url.replace(/^https?:\/\//, "").replace(/\/.*$/, "")}
          </h4>
          <p className="text-xs text-[#d97706] font-semibold animate-pulse">
            {scanSteps[scanStep]}
          </p>
          <div className="w-full bg-gray-100 h-2.5 rounded-full mt-5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-500 to-[#091427] h-full transition-all duration-300"
              style={{ width: `${((scanStep + 1) / scanSteps.length) * 100}%` }}
            />
          </div>
          <button
            type="button"
            onClick={handleBackToAudit}
            className="mt-6 text-xs text-gray-500 hover:text-gray-800 font-semibold cursor-pointer transition-colors inline-flex items-center gap-1.5"
          >
            <span>← Cancel &amp; enter different URL</span>
          </button>
        </div>
      )}

      {/* STAGE: ERROR STATE WITH PROMINENT BACK BUTTON */}
      {stage === "error" && (
        <div className="py-8 text-center max-w-lg mx-auto animate-fadeIn">
          <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center text-2xl mx-auto mb-4">
            ⚠️
          </div>
          <h3 className="text-lg font-bold text-[#091427] mb-2">Unable to Complete Audit</h3>
          <p className="text-xs sm:text-sm text-gray-600 mb-6 leading-relaxed">
            {errorMessage || "We couldn't analyze that URL. Please verify that the website is online and accessible."}
          </p>

          <button
            onClick={handleBackToAudit}
            className="inline-flex items-center gap-2 bg-[#091427] hover:bg-[#0f213d] text-white font-bold px-7 py-3 rounded-2xl text-xs sm:text-sm shadow-md transition-all cursor-pointer"
          >
            <span>← Back &amp; Test Another Website</span>
          </button>
        </div>
      )}

      {/* STAGE 3: REAL RESULTS WITH PROMINENT TOP BACK BAR */}
      {stage === "results" && auditData && (
        <div className="animate-fadeIn">
          {/* ============================================================ */}
          {/* PROMINENT TOP ACTION & BACK NAVIGATION BAR                    */}
          {/* ============================================================ */}
          <div className="flex flex-wrap items-center justify-between bg-slate-900 text-white px-4 py-3 rounded-2xl mb-6 shadow-md gap-3">
            <button
              onClick={handleBackToAudit}
              className="inline-flex items-center gap-2 bg-[#d97706] hover:bg-[#b45309] text-white text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer shadow-sm group"
            >
              <span className="group-hover:-translate-x-1 transition-transform font-black">←</span>
              <span>Back / Test New Website</span>
            </button>

            <div className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300 hidden sm:inline">Audited Domain:</span>
              <span className="font-bold text-amber-400">{auditData.domain}</span>
            </div>

            <button
              onClick={() => handleStartAudit()}
              className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white font-semibold transition-colors cursor-pointer px-2.5 py-1.5 rounded-lg hover:bg-slate-800"
            >
              <span>🔄</span>
              <span className="hidden sm:inline">Re-run Audit</span>
            </button>
          </div>

          {/* Domain Title Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-6 border-b border-gray-100 gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Live Audit Verified
                </span>
                {auditData.metrics.isHttps ? (
                  <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                    🔒 SSL HTTPS
                  </span>
                ) : (
                  <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">
                    ⚠️ Insecure HTTP
                  </span>
                )}
                <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                  Server: {auditData.metrics.serverHeader}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#091427] tracking-tight">
                {auditData.domain}
              </h3>
              <p className="text-xs text-gray-500 truncate max-w-xl mt-0.5">
                {auditData.metrics.title !== "Not set" ? auditData.metrics.title : auditData.url}
              </p>
            </div>
          </div>

          {/* ============================================================ */}
          {/* 4 TOP SCORE CARDS (CARD 4 SHOWS RANKING, NOT ISSUES!)        */}
          {/* ============================================================ */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {/* 1. SEO Health */}
            <div className={`p-4 rounded-2xl border text-center ${getScoreColor(auditData.scores.seo)}`}>
              <span className="text-2xl sm:text-3xl font-black block">{auditData.scores.seo}/100</span>
              <span className="text-[11px] font-bold text-gray-700 mt-1 block">SEO Health</span>
              <span className="text-[10px] font-semibold block">
                {auditData.scores.seo >= 80 ? "Well Optimized" : auditData.scores.seo >= 60 ? "Moderate Gaps" : "Needs Overhaul"}
              </span>
            </div>

            {/* 2. PageSpeed / TTFB */}
            <div className={`p-4 rounded-2xl border text-center ${getScoreColor(auditData.scores.speed)}`}>
              <span className="text-2xl sm:text-3xl font-black block">{auditData.scores.speed}/100</span>
              <span className="text-[11px] font-bold text-gray-700 mt-1 block">Response Speed</span>
              <span className="text-[10px] font-semibold block">
                {auditData.metrics.responseTimeMs}ms TTFB
              </span>
            </div>

            {/* 3. SSL & Security */}
            <div className={`p-4 rounded-2xl border text-center ${getScoreColor(auditData.scores.security)}`}>
              <span className="text-2xl sm:text-3xl font-black block">{auditData.scores.security}/100</span>
              <span className="text-[11px] font-bold text-gray-700 mt-1 block">SSL &amp; Security</span>
              <span className="text-[10px] font-semibold block">
                {auditData.metrics.isHttps ? "Protected HTTPS" : "Insecure HTTP"}
              </span>
            </div>

            {/* 4. GOOGLE RANKING (SHOWS REAL RANKING POSITION, NOT ISSUES!) */}
            <div className={`p-4 rounded-2xl border text-center relative overflow-hidden shadow-xs ${getRankingCardColor(auditData.scores.rankingPosition)}`}>
              <div className="absolute top-1 right-2">
                <span className="text-xs">🏆</span>
              </div>
              <span className="text-xl sm:text-2xl font-black block tracking-tight">
                {auditData.scores.rankingPosition}
              </span>
              <span className="text-[11px] font-bold text-gray-800 mt-1 block">
                Google Ranking
              </span>
              <span className="text-[10px] font-bold block opacity-90 truncate">
                {auditData.scores.rankingTier}
              </span>
            </div>
          </div>

          {/* ============================================================ */}
          {/* REAL ON-PAGE METRICS INSPECTION GRID                         */}
          {/* ============================================================ */}
          <div className="bg-slate-50/90 rounded-2xl p-4 border border-slate-200 mb-6 text-xs space-y-2.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center justify-between">
              <span>Authentic On-Page Extraction</span>
              <span>Payload: {auditData.metrics.htmlSizeKb} KB</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 text-slate-700">
              <div className="bg-white p-2.5 rounded-xl border border-gray-100">
                <span className="text-[10px] font-bold text-gray-400 uppercase block mb-0.5">Content Depth</span>
                <p className="font-bold text-slate-800 text-sm">
                  {auditData.metrics.wordCount.toLocaleString()} <span className="text-xs font-medium text-slate-500">Words</span>
                </p>
                <span className="text-[10px] text-gray-500">
                  {auditData.metrics.wordCount > 600 ? "✓ High depth" : "Thin content"}
                </span>
              </div>

              <div className="bg-white p-2.5 rounded-xl border border-gray-100">
                <span className="text-[10px] font-bold text-gray-400 uppercase block mb-0.5">Headings Setup</span>
                <p className="font-bold text-slate-800 text-sm">
                  {auditData.metrics.h1Count} H1 <span className="text-xs font-normal text-slate-400">•</span> {auditData.metrics.h2Count} H2
                </p>
                <span className="text-[10px] text-gray-500">
                  {auditData.metrics.h3Count} H3 subheadings
                </span>
              </div>

              <div className="bg-white p-2.5 rounded-xl border border-gray-100">
                <span className="text-[10px] font-bold text-gray-400 uppercase block mb-0.5">Indexing Files</span>
                <p className="font-bold text-slate-800 text-xs truncate">
                  Robots: {auditData.metrics.hasRobotsTxt ? "✓ Active" : "✗ Missing"}
                </p>
                <span className="text-[10px] text-gray-500">
                  Sitemap: {auditData.metrics.hasSitemap ? "✓ Found" : "✗ Missing"}
                </span>
              </div>

              <div className="bg-white p-2.5 rounded-xl border border-gray-100">
                <span className="text-[10px] font-bold text-gray-400 uppercase block mb-0.5">Internal Links &amp; Images</span>
                <p className="font-bold text-slate-800 text-xs">
                  {auditData.metrics.internalLinksCount} Links <span className="text-xs font-normal text-slate-400">•</span> {auditData.metrics.imagesTotal} Imgs
                </p>
                <span className="text-[10px] text-gray-500">
                  {auditData.metrics.imagesWithoutAlt === 0 ? "✓ All images have alt" : `${auditData.metrics.imagesWithoutAlt} missing alt`}
                </span>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* NAVIGATION TABS: RANKING vs ISSUES vs PASSED                 */}
          {/* ============================================================ */}
          <div className="mb-6">
            <div className="flex items-center gap-2 border-b border-gray-200 mb-4 overflow-x-auto">
              <button
                onClick={() => setActiveTab("ranking")}
                className={`pb-2.5 px-3.5 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === "ranking"
                    ? "border-[#d97706] text-[#091427]"
                    : "border-transparent text-gray-400 hover:text-gray-700"
                }`}
              >
                <span>🏆</span>
                <span>Google Ranking &amp; SERP ({auditData.scores.rankingPosition})</span>
              </button>

              <button
                onClick={() => setActiveTab("issues")}
                className={`pb-2.5 px-3.5 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === "issues"
                    ? "border-rose-600 text-rose-700"
                    : "border-transparent text-gray-400 hover:text-gray-700"
                }`}
              >
                <span>⚠️</span>
                <span>Detected Issues ({auditData.issues.length})</span>
              </button>

              <button
                onClick={() => setActiveTab("passed")}
                className={`pb-2.5 px-3.5 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === "passed"
                    ? "border-emerald-600 text-emerald-700"
                    : "border-transparent text-gray-400 hover:text-gray-700"
                }`}
              >
                <span>✓</span>
                <span>Passed Standards ({auditData.passes.length})</span>
              </button>
            </div>

            {/* TAB 1: RANKING & SERP ANALYSIS */}
            {activeTab === "ranking" && (
              <div className="space-y-4 text-xs animate-fadeIn">
                {/* Ranking Overview Box */}
                <div className="bg-gradient-to-r from-slate-900 to-[#0f213d] text-white p-5 rounded-2xl border border-amber-500/30">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <div>
                      <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                        Search Engine Placement Diagnosis
                      </span>
                      <h4 className="text-lg sm:text-xl font-black text-white">
                        {auditData.rankingDetails.estimatedPosition} • {auditData.rankingDetails.tier}
                      </h4>
                    </div>
                    <div className="bg-amber-400/20 border border-amber-400/50 text-amber-300 px-3 py-1 rounded-full text-xs font-bold self-start sm:self-auto">
                      Overall Rank Score: {auditData.scores.ranking}/100
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {auditData.rankingDetails.summary}
                  </p>
                </div>

                {/* Live Google Search SERP Snippet Preview */}
                <div className="bg-white p-4 rounded-2xl border border-gray-200">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                    Live Google Search Result Preview
                  </span>
                  <div className="bg-[#f8f9fa] p-3.5 rounded-xl border border-gray-100 max-w-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center text-[9px] font-bold text-blue-600">
                        G
                      </div>
                      <span className="text-[11px] text-slate-600 truncate">{auditData.domain}</span>
                    </div>
                    <h5 className="text-sm font-semibold text-[#1a0dab] hover:underline cursor-pointer line-clamp-1">
                      {auditData.rankingDetails.serpSnippet.title}
                    </h5>
                    <p className="text-xs text-[#4d5156] mt-1 line-clamp-2 leading-relaxed">
                      {auditData.rankingDetails.serpSnippet.description}
                    </p>
                  </div>
                </div>

                {/* Ranking Strengths vs Opportunities */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Strengths */}
                  <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200">
                    <h5 className="font-bold text-emerald-900 mb-2.5 flex items-center gap-1.5">
                      <span>✓</span>
                      <span>Ranking Strengths</span>
                    </h5>
                    <ul className="space-y-1.5 text-emerald-800">
                      {auditData.rankingDetails.strengths.map((str, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-emerald-600 font-bold">•</span>
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Opportunities */}
                  <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200">
                    <h5 className="font-bold text-amber-900 mb-2.5 flex items-center gap-1.5">
                      <span>🚀</span>
                      <span>Fast-Track to Top #1-3 Rank</span>
                    </h5>
                    <ul className="space-y-1.5 text-amber-900">
                      {auditData.rankingDetails.opportunities.map((opp, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-amber-600 font-bold">•</span>
                          <span>{opp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: DETECTED ISSUES */}
            {activeTab === "issues" && (
              <div className="space-y-2 text-xs animate-fadeIn">
                {auditData.issues.length === 0 ? (
                  <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-emerald-800 font-semibold text-center">
                    ✓ Outstanding! No critical issues were detected on this page.
                  </div>
                ) : (
                  auditData.issues.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100 hover:border-gray-200 transition-colors"
                    >
                      <div className="flex items-center gap-2 pr-2">
                        <span className={item.impact === "High" ? "text-rose-500" : item.impact === "Medium" ? "text-amber-500" : "text-blue-500"}>
                          {item.impact === "High" ? "⚠️" : item.impact === "Medium" ? "⚡" : "ℹ️"}
                        </span>
                        <span className="font-medium text-slate-800">{item.text}</span>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded shrink-0 ${
                          item.impact === "High"
                            ? "bg-rose-100 text-rose-700"
                            : item.impact === "Medium"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {item.impact} Impact
                      </span>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* TAB 3: PASSED CHECKS */}
            {activeTab === "passed" && (
              <div className="space-y-2 text-xs animate-fadeIn">
                {auditData.passes.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/50 border border-emerald-100"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span className="font-medium text-slate-800">{item.text}</span>
                    </div>
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded shrink-0">
                      Passed
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Email Capture for Full PDF */}
          <div className="bg-amber-50/70 p-6 rounded-2xl border border-amber-200 text-center max-w-xl mx-auto mb-5">
            <h4 className="text-base font-bold text-[#091427] mb-1">
              Want the Complete Step-by-Step Fix Blueprint for {auditData.domain}?
            </h4>
            <p className="text-xs text-[#54647c] mb-4">
              Enter your work email and our senior SEO strategists will prepare an in-depth diagnosis to elevate your ranking to Top 3.
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
                className="bg-[#091427] hover:bg-[#0f213d] text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-colors cursor-pointer whitespace-nowrap"
              >
                Send Full Audit →
              </button>
            </form>
          </div>

          {/* ============================================================ */}
          {/* PROMINENT BOTTOM BACK BUTTON                                 */}
          {/* ============================================================ */}
          <div className="text-center pt-2">
            <button
              onClick={handleBackToAudit}
              className="inline-flex items-center gap-2 bg-gray-100 hover:bg-amber-50 text-[#091427] hover:text-[#d97706] border border-gray-200 hover:border-[#d97706]/40 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs group"
            >
              <span className="group-hover:-translate-x-1 transition-transform font-bold">←</span>
              <span>Back &amp; Audit Another Website</span>
            </button>
          </div>
        </div>
      )}

      {/* STAGE 4: SUCCESS WITH BACK BUTTON */}
      {stage === "success" && (
        <div className="text-center py-8 animate-fadeIn">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl mx-auto mb-3 font-bold">
            ✓
          </div>
          <h3 className="text-xl font-bold text-[#091427]">Audit Report Dispatched to {email}</h3>
          <p className="text-xs text-[#54647c] max-w-md mx-auto mt-1 mb-6">
            Our strategist has queued your custom website review. Check your inbox shortly.
          </p>
          <button
            onClick={() => {
              setStage("idle");
              setUrl("");
              setEmail("");
              setAuditData(null);
            }}
            className="inline-flex items-center gap-2 bg-[#091427] hover:bg-[#0f213d] text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
          >
            <span>← Back to Audit Another Website</span>
          </button>
        </div>
      )}
    </div>
  );
}
