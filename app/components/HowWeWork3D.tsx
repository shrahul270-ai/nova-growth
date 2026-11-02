"use client";

import React, { useState, useEffect } from "react";
import {
  Clock,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  TrendingUp,
  FileCheck,
  Layers,
  Calendar,
  Users,
} from "lucide-react";

interface StepData {
  step: string;
  num: string;
  title: string;
  subtitle: string;
  deliverablesTitle: string;
  deliverablesDesc: string;
  timeframe: string;
  timeframeDesc: string;
  categoryTitle: string;
  categoryItems: string[];
  metricBadge: { left: string; right: string };
  icon: string;
}

const stepsData: StepData[] = [
  {
    step: "01",
    num: "Phase 01",
    title: "Discover",
    subtitle: "Deep Technical audit & international competitor gap mapping.",
    deliverablesTitle: "Technical & Competitor Diagnosis",
    deliverablesDesc:
      "We crawl your entire website with enterprise tooling to spot crawl traps, canonical conflicts, schema errors, and slow assets.",
    timeframe: "Days 1 - 7 (Week 1)",
    timeframeDesc:
      "Comprehensive 15-page diagnostic report delivered via Notion + Loom video walkthrough for your leadership team.",
    categoryTitle: "Team Allocation",
    categoryItems: [
      "Lead Technical SEO Architect",
      "Senior Next.js Frontend Engineer",
      "Slack Channel Standup Access",
    ],
    metricBadge: { left: "Step 01", right: "Days 1 - 7" },
    icon: "🔍",
  },
  {
    step: "02",
    num: "Phase 02",
    title: "Strategize",
    subtitle: "Creating a custom low-competition keyword & UX roadmap.",
    deliverablesTitle: "The 90-Day Organic Roadmap",
    deliverablesDesc:
      "Commercial keyword clustering based on buyer intent in North America and Europe, plus UX conversion wireframing.",
    timeframe: "Days 8 - 14 (Week 2)",
    timeframeDesc:
      "Complete keyword matrix with search volumes, difficulty scores, and targeted page mapping approved by client.",
    categoryTitle: "Strategic Outputs",
    categoryItems: [
      "Content Calendar (3 Months)",
      "Digital PR Target Publications",
      "High-Intent Geo-Landing Blueprints",
    ],
    metricBadge: { left: "Step 02", right: "Days 8 - 14" },
    icon: "📋",
  },
  {
    step: "03",
    num: "Phase 03",
    title: "Execute",
    subtitle: "Next.js speed rebuild, schema deployment & editorial link building.",
    deliverablesTitle: "Engineering & Content Sprint",
    deliverablesDesc:
      "Live code deployment on Next.js, image optimization, schema injection, and high-DA editorial guest placements.",
    timeframe: "Weeks 3 to 8",
    timeframeDesc:
      "Staging review links provided for approval before zero-downtime production deployment.",
    categoryTitle: "Quality Guarantees",
    categoryItems: [
      "95+ Google PageSpeed Score",
      "100% White-Hat Editorial Links",
      "Strict Git Version Control",
    ],
    metricBadge: { left: "Step 03", right: "Weeks 3 - 8" },
    icon: "💻",
  },
  {
    step: "04",
    num: "Phase 04",
    title: "Optimize",
    subtitle: "Bi-weekly ranking syncs, live Looker dashboards & CRO testing.",
    deliverablesTitle: "Revenue Scaling & Tracking",
    deliverablesDesc:
      "Continuous SERP position tracking, conversion rate A/B tests, and algorithmic protection for Google search updates.",
    timeframe: "Month 3 Onward (Compounding)",
    timeframeDesc:
      "Real-time interactive Google Looker Studio dashboard accessible 24/7 with zero waiting for monthly reports.",
    categoryTitle: "Reporting Cadence",
    categoryItems: [
      "Weekly Slack Metric Digest",
      "Bi-Weekly Zoom Growth Call",
      "24/7 Live Data Studio Access",
    ],
    metricBadge: { left: "Step 04", right: "Month 3 Onward" },
    icon: "🎯",
  },
];

export default function HowWeWork3D() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-cycle through steps smoothly unless hovered
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % stepsData.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const current = stepsData[activeStep];
  const nextStepIndex = (activeStep + 1) % stepsData.length;
  const nextStep = stepsData[nextStepIndex];

  return (
    <section
      id="how-we-work"
      className="relative w-full bg-[#03050c] text-white py-16 sm:py-24 overflow-hidden border-t border-white/[0.08]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Dynamic Keyframes for Particle Spark Embers and Orange Laser Beam */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes laserGlow {
          0%, 100% { opacity: 0.9; filter: drop-shadow(0 0 16px rgba(249, 115, 22, 0.9)) drop-shadow(0 0 35px rgba(249, 115, 22, 0.5)); }
          50% { opacity: 1; filter: drop-shadow(0 0 25px rgba(249, 115, 22, 1)) drop-shadow(0 0 50px rgba(251, 146, 60, 0.7)); }
        }
        @keyframes slideInFromRight {
          from { transform: translateX(90px); opacity: 0.15; }
          to { transform: translateX(0px); opacity: 1; }
        }
        @keyframes fadeInScale {
          from { transform: scale(0.97); opacity: 0.2; }
          to { transform: scale(1); opacity: 1; }
        }
      `}} />

      {/* Ambient Radial Background Glows */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.12)_0%,rgba(99,102,241,0.06)_45%,transparent_75%)] blur-3xl -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* SECTION HEADER (EXACT DETAILS PRESERVED) */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-400/30 text-[12.5px] font-semibold text-orange-200 mb-3 backdrop-blur-md shadow-[0_0_20px_rgba(249,115,22,0.2)]">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            <span>Our Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            How We Work
          </h2>
          <p className="text-[15px] sm:text-base text-slate-400 mt-3 leading-relaxed">
            A simple, transparent process to turn your goals into measurable results.
          </p>

          {/* Interactive Step Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-7">
            {stepsData.map((s, idx) => (
              <button
                key={s.step}
                onClick={() => setActiveStep(idx)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                  activeStep === idx
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-[0_0_25px_rgba(249,115,22,0.5)] scale-105"
                    : "bg-[#0d111d] text-slate-400 hover:text-white border border-white/10 hover:border-orange-500/40"
                }`}
              >
                <span>{s.icon}</span>
                <span>{s.step} {s.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ================================================================ */}
        {/* 3D WORK SLIDER PORTAL: RIGHT SIDE WORK SLIDES INTO ORANGE LINE */}
        {/* ================================================================ */}
        <div className="relative rounded-3xl bg-[#060813]/95 border border-white/10 overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.9)] p-5 sm:p-7 md:p-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative min-h-[460px]">
            
            {/* ------------------------------------------------------------ */}
            {/* LEFT SIDE: PHASE DELIVERABLES & DETAILED SCOPE (NO CODE) */}
            {/* ------------------------------------------------------------ */}
            <div
              key={`left-${activeStep}`}
              className="lg:col-span-5 flex flex-col justify-between space-y-5 py-2"
              style={{ animation: "fadeInScale 0.4s ease-out" }}
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-orange-400 animate-ping" />
                  <span className="text-[11px] font-mono font-bold text-orange-400 uppercase tracking-widest">
                    Phase Deliverables &amp; Scope
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight mb-3">
                  {current.deliverablesTitle}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  {current.deliverablesDesc}
                </p>
              </div>

              {/* Execution Window Card */}
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4 space-y-2 backdrop-blur-md">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-200 font-bold">
                    <Calendar className="w-4 h-4 text-orange-400" />
                    <span>Timeframe:</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-orange-300 bg-orange-500/15 border border-orange-400/30 px-2.5 py-0.5 rounded-full">
                    {current.timeframe}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {current.timeframeDesc}
                </p>
              </div>

              {/* Step indicator pills */}
              <div className="flex items-center gap-2 pt-2 border-t border-white/10 text-xs font-mono text-slate-400">
                <span className="text-orange-400 font-bold">Current Phase:</span>
                <span className="text-white font-medium">
                  {current.step} &bull; {current.title}
                </span>
              </div>
            </div>

            {/* ------------------------------------------------------------ */}
            {/* CENTER: THE LUMINOUS GLOWING ORANGE LINE & SPARK EMBER PORTAL */}
            {/* ------------------------------------------------------------ */}
            <div className="hidden lg:flex lg:col-span-2 flex-col items-center justify-center relative h-full min-h-[440px]">
              
              {/* Top Dual Pill Badge (Matching image: Left Solid Orange, Right Frosted) */}
              <div className="absolute -top-3 z-30 flex items-center shadow-[0_0_25px_rgba(249,115,22,0.6)]">
                <span className="bg-orange-500 text-slate-950 font-black text-[11px] font-mono px-3 py-1 rounded-l-full">
                  {current.metricBadge.left}
                </span>
                <span className="bg-slate-900/90 text-orange-200 border border-orange-500/30 font-semibold text-[11px] font-mono px-3 py-1 rounded-r-full backdrop-blur-md">
                  {current.metricBadge.right}
                </span>
              </div>

              {/* The Vertical Orange Glowing Line */}
              <div
                className="relative w-2 h-full rounded-full"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(249,115,22,0.2) 0%, #f97316 20%, #fb923c 50%, #f97316 80%, rgba(249,115,22,0.2) 100%)",
                  boxShadow:
                    "0 0 20px #f97316, 0 0 40px #fb923c, 0 0 60px rgba(249, 115, 22, 0.85)",
                  animation: "laserGlow 3s ease-in-out infinite",
                }}
              />

              {/* Volumetric Radial Glow Band behind the line */}
              <div className="absolute inset-y-4 w-12 bg-gradient-to-r from-transparent via-orange-500/25 to-transparent blur-md pointer-events-none" />

              {/* Dynamic Sparkling Particle Embers exploding along the orange line */}
              <div className="absolute inset-y-0 w-32 pointer-events-none overflow-hidden flex items-center justify-center">
                {[
                  { top: "12%", left: "15%", size: 3, delay: "0s" },
                  { top: "24%", left: "65%", size: 2, delay: "0.4s" },
                  { top: "36%", left: "20%", size: 4, delay: "0.8s" },
                  { top: "48%", left: "75%", size: 3, delay: "1.2s" },
                  { top: "60%", left: "30%", size: 2, delay: "0.2s" },
                  { top: "72%", left: "80%", size: 4, delay: "0.6s" },
                  { top: "84%", left: "25%", size: 3, delay: "1.0s" },
                ].map((spark, i) => (
                  <span
                    key={i}
                    className="absolute rounded-full bg-orange-300 shadow-[0_0_8px_#f97316] animate-ping"
                    style={{
                      top: spark.top,
                      left: spark.left,
                      width: `${spark.size}px`,
                      height: `${spark.size}px`,
                      animationDuration: "2s",
                      animationDelay: spark.delay,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* ------------------------------------------------------------ */}
            {/* RIGHT SIDE: WORK CARD SLIDING IN FROM RIGHT INTO THE LINE */}
            {/* ------------------------------------------------------------ */}
            <div className="lg:col-span-5 relative flex flex-col justify-between space-y-4">
              
              {/* Work Card with smooth sliding animation */}
              <div
                key={`right-${activeStep}`}
                className="relative rounded-2xl bg-gradient-to-br from-[#0c1224] to-[#080d19] border border-orange-500/35 p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden"
                style={{ animation: "slideInFromRight 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}
              >
                {/* Subtle ambient orange glow on the edge pointing to the laser line */}
                <div className="absolute -left-10 inset-y-0 w-20 bg-orange-500/20 blur-xl pointer-events-none" />

                {/* Card Header: Icon + Step Title */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-400/30 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(249,115,22,0.3)]">
                      {current.icon}
                    </div>
                    <div>
                      <span className="text-[11px] font-mono font-bold text-orange-400 tracking-wider">
                        {current.num}
                      </span>
                      <h4 className="text-xl font-black text-white">
                        {current.title}
                      </h4>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-300 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                    <Clock className="w-3.5 h-3.5 text-orange-400" />
                    <span>{current.timeframe}</span>
                  </span>
                </div>

                {/* Subtitle / Objective */}
                <p className="text-sm text-slate-200 font-medium leading-relaxed mb-5">
                  {current.subtitle}
                </p>

                {/* Scope Category Items (Team Allocation / Guarantees / Cadence) */}
                <div className="bg-black/50 rounded-xl p-4 border border-white/10 space-y-2">
                  <span className="text-[11px] font-mono uppercase text-orange-400 font-bold block">
                    {current.categoryTitle}
                  </span>
                  <ul className="text-xs space-y-2 text-slate-200">
                    {current.categoryItems.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Slide indicator motion label */}
                <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5 text-orange-300">
                    <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                    <span>← Work sliding into orange threshold</span>
                  </span>
                  <span className="text-slate-500 hidden sm:inline">
                    Auto-playing (hover to pause)
                  </span>
                </div>
              </div>

              {/* Next Queued Step Bar at the Bottom */}
              <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-slate-500">Next phase:</span>
                  <span className="font-bold text-slate-200">
                    {nextStep.step} {nextStep.title} ({nextStep.timeframe})
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveStep((prev) => (prev - 1 + stepsData.length) % stepsData.length)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
                    title="Previous Phase"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setActiveStep((prev) => (prev + 1) % stepsData.length)}
                    className="p-1.5 rounded-lg bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 border border-orange-400/30 transition-colors"
                    title="Next Phase"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
