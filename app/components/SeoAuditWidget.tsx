"use client";

import React, { useState, useEffect, useRef } from "react";

interface AuditResult {
  domain: string;
  url: string;
  httpStatus: number;
  scores: {
    seo: number;
    speed: number;
    security: number;
    issuesCount: number;
  };
  metrics: {
    title: string;
    titleLength: number;
    metaDescription: string;
    metaDescLength: number;
    h1: string;
    h1Count: number;
    responseTimeMs: number;
    htmlSizeKb: number;
    schemaFound: boolean;
    schemaTypes: string[];
    imagesTotal: number;
    imagesWithoutAlt: number;
    isHttps: boolean;
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
  const [activeTab, setActiveTab] = useState<"issues" | "passed">("issues");
  const scanIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const scanSteps = [
    "Connecting to domain & checking SSL certificate...",
    "Measuring initial server response time & TTFB...",
    "Analyzing <title>, meta descriptions & H1 tags...",
    "Inspecting Schema JSON-LD & Open Graph markup...",
    "Auditing image alt tags & mobile viewport...",
    "Compiling accurate SEO audit results...",
  ];

  useEffect(() => {
    return () => {
      if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
    };
  }, []);

  const handleStartAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setStage("scanning");
    setScanStep(0);
    setErrorMessage(null);
    setAuditData(null);

    // Start animated progress steps
    scanIntervalRef.current = setInterval(() => {
      setScanStep((prev) => {
        if (prev < scanSteps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 600);

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await response.json();

      // Ensure animation shows at least a couple steps for great UX
      setTimeout(() => {
        if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
        if (!response.ok || data.error) {
          setErrorMessage(data.error || "Unable to audit this URL. Please check the address.");
          setStage("error");
        } else {
          setAuditData(data);
          setStage("results");
        }
      }, 1600);
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
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStage("success");
  };

  // Helper for score badge colors
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-600 bg-emerald-50 border-emerald-200";
    if (score >= 55) return "text-amber-600 bg-amber-50 border-amber-200";
    return "text-rose-600 bg-rose-50 border-rose-200";
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl border border-[#d97706]/30 shadow-xl p-6 sm:p-10 relative overflow-hidden text-left transition-all">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl -z-10 opacity-70 pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-slate-50 rounded-full blur-3xl -z-10 opacity-50 pointer-events-none" />

      {/* Header - shown on idle and scanning */}
      {(stage === "idle" || stage === "scanning") && (
        <div className="text-center max-w-xl mx-auto mb-8 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-[#091427] text-xs font-bold mb-3 border border-[#d97706]/30">
            <span className="text-[#d97706]">⚡</span>
            <span>Instant Global Performance Checker</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#091427] tracking-tight">
            Audit Your Website&apos;s SEO &amp; Speed in 30 Seconds
          </h2>
          <p className="text-xs sm:text-sm text-[#54647c] mt-2">
            Enter your live domain to get an authentic real-time analysis of meta tags, Core Web Vitals, Schema, and technical search issues.
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
          <div className="w-full bg-gray-100 h-2 rounded-full mt-5 overflow-hidden">
            <div
              className="bg-[#d97706] h-full transition-all duration-300"
              style={{ width: `${((scanStep + 1) / scanSteps.length) * 100}%` }}
            />
          </div>
          <button
            type="button"
            onClick={handleBackToAudit}
            className="mt-6 text-xs text-gray-400 hover:text-gray-700 font-semibold cursor-pointer transition-colors"
          >
            Cancel and enter different URL
          </button>
        </div>
      )}

      {/* STAGE: ERROR STATE WITH BACK BUTTON */}
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
            className="inline-flex items-center gap-2 bg-[#091427] hover:bg-[#0f213d] text-white font-bold px-6 py-3 rounded-2xl text-xs sm:text-sm shadow-md transition-all cursor-pointer"
          >
            <span>← Back &amp; Try Another URL</span>
          </button>
        </div>
      )}

      {/* STAGE 3: REAL RESULTS & EMAIL CAPTURE */}
      {stage === "results" && auditData && (
        <div className="animate-fadeIn">
          {/* Top Bar with Prominent Back Button & Domain Info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-gray-100 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Live Audit Complete
                </span>
                {auditData.metrics.isHttps && (
                  <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                    🔒 SSL Active
                  </span>
                )}
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#091427] tracking-tight">
                {auditData.domain}
              </h3>
              <p className="text-xs text-gray-500 truncate max-w-md mt-0.5">
                {auditData.metrics.title !== "Not set" ? auditData.metrics.title : auditData.url}
              </p>
            </div>

            {/* TOP BACK BUTTON */}
            <button
              onClick={handleBackToAudit}
              className="inline-flex items-center gap-2 self-start sm:self-center px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-amber-50 text-[#091427] hover:text-[#d97706] border border-gray-200 hover:border-[#d97706]/40 text-xs font-bold transition-all cursor-pointer shadow-xs group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              <span>Back / Audit Another Site</span>
            </button>
          </div>

          {/* Real Result Score Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {/* SEO Health */}
            <div className={`p-4 rounded-2xl border text-center ${getScoreColor(auditData.scores.seo)}`}>
              <span className="text-2xl sm:text-3xl font-black block">{auditData.scores.seo}/100</span>
              <span className="text-[11px] font-bold text-gray-700 mt-1 block">SEO Health</span>
              <span className="text-[10px] font-semibold block">
                {auditData.scores.seo >= 80 ? "Well Optimized" : auditData.scores.seo >= 55 ? "Needs Attention" : "Critical SEO Gaps"}
              </span>
            </div>

            {/* PageSpeed / TTFB */}
            <div className={`p-4 rounded-2xl border text-center ${getScoreColor(auditData.scores.speed)}`}>
              <span className="text-2xl sm:text-3xl font-black block">{auditData.scores.speed}/100</span>
              <span className="text-[11px] font-bold text-gray-700 mt-1 block">Response Speed</span>
              <span className="text-[10px] font-semibold block">
                {auditData.metrics.responseTimeMs}ms TTFB
              </span>
            </div>

            {/* SSL & Security */}
            <div className={`p-4 rounded-2xl border text-center ${getScoreColor(auditData.scores.security)}`}>
              <span className="text-2xl sm:text-3xl font-black block">{auditData.scores.security}/100</span>
              <span className="text-[11px] font-bold text-gray-700 mt-1 block">SSL &amp; Security</span>
              <span className="text-[10px] font-semibold block">
                {auditData.metrics.isHttps ? "HTTPS Protected" : "Insecure HTTP"}
              </span>
            </div>

            {/* Ranking Roadblocks */}
            <div className={`p-4 rounded-2xl border text-center ${auditData.scores.issuesCount > 3 ? "bg-purple-50/80 border-purple-200 text-purple-700" : "bg-emerald-50/80 border-emerald-200 text-emerald-700"}`}>
              <span className="text-2xl sm:text-3xl font-black block">{auditData.scores.issuesCount} Issues</span>
              <span className="text-[11px] font-bold text-gray-700 mt-1 block">Ranking Roadblocks</span>
              <span className="text-[10px] font-semibold block">
                {auditData.scores.issuesCount === 0 ? "All Standard Checks Passed" : "Actionable Fixes Found"}
              </span>
            </div>
          </div>

          {/* Quick Metrics Inspector Card */}
          <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/70 mb-6 text-xs space-y-2.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center justify-between">
              <span>On-Page Inspection Summary</span>
              <span>Payload: {auditData.metrics.htmlSizeKb} KB</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-700">
              <div className="bg-white p-3 rounded-xl border border-gray-100">
                <span className="text-[10px] font-bold text-gray-400 uppercase block mb-0.5">Title Tag ({auditData.metrics.titleLength} Chars)</span>
                <p className="font-semibold text-slate-800 line-clamp-2">
                  {auditData.metrics.title}
                </p>
              </div>

              <div className="bg-white p-3 rounded-xl border border-gray-100">
                <span className="text-[10px] font-bold text-gray-400 uppercase block mb-0.5">Meta Description ({auditData.metrics.metaDescLength} Chars)</span>
                <p className="font-semibold text-slate-800 line-clamp-2">
                  {auditData.metrics.metaDescription}
                </p>
              </div>

              <div className="bg-white p-3 rounded-xl border border-gray-100">
                <span className="text-[10px] font-bold text-gray-400 uppercase block mb-0.5">Main &lt;H1&gt; Tag ({auditData.metrics.h1Count} found)</span>
                <p className="font-semibold text-slate-800 line-clamp-2">
                  {auditData.metrics.h1}
                </p>
              </div>

              <div className="bg-white p-3 rounded-xl border border-gray-100">
                <span className="text-[10px] font-bold text-gray-400 uppercase block mb-0.5">Structured Schema &amp; Images</span>
                <p className="font-semibold text-slate-800">
                  Schema: {auditData.metrics.schemaFound ? auditData.metrics.schemaTypes.join(", ") : "None detected"} • Images without Alt: {auditData.metrics.imagesWithoutAlt}/{auditData.metrics.imagesTotal}
                </p>
              </div>
            </div>
          </div>

          {/* Issues vs Passed Tabs */}
          <div className="mb-6">
            <div className="flex items-center gap-2 border-b border-gray-200 mb-4">
              <button
                onClick={() => setActiveTab("issues")}
                className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 cursor-pointer ${
                  activeTab === "issues"
                    ? "border-[#d97706] text-[#091427]"
                    : "border-transparent text-gray-400 hover:text-gray-700"
                }`}
              >
                Detected Issues ({auditData.issues.length})
              </button>
              <button
                onClick={() => setActiveTab("passed")}
                className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 cursor-pointer ${
                  activeTab === "passed"
                    ? "border-emerald-600 text-emerald-700"
                    : "border-transparent text-gray-400 hover:text-gray-700"
                }`}
              >
                Passed Checks ({auditData.passes.length})
              </button>
            </div>

            {activeTab === "issues" && (
              <div className="space-y-2 text-xs">
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

            {activeTab === "passed" && (
              <div className="space-y-2 text-xs">
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
          <div className="bg-amber-50/70 p-6 rounded-2xl border border-amber-200 text-center max-w-xl mx-auto mb-4">
            <h4 className="text-base font-bold text-[#091427] mb-1">
              Want the Complete Technical Fix Checklist for {auditData.domain}?
            </h4>
            <p className="text-xs text-[#54647c] mb-4">
              Enter your work email and our SEO strategists will prepare an in-depth diagnosis with prioritized fixes.
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

          {/* BOTTOM BACK BUTTON */}
          <div className="text-center pt-2">
            <button
              onClick={handleBackToAudit}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#d97706] hover:text-[#b45309] hover:underline cursor-pointer"
            >
              <span>←</span>
              <span>Back to test another website</span>
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
            <span>← Audit Another Domain</span>
          </button>
        </div>
      )}
    </div>
  );
}
