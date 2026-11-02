"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Clock,
  CheckCircle2,
  Calendar,
  Layers,
  Search,
  ChevronRight,
} from "lucide-react";

interface PhaseCard {
  step: string;
  phaseNum: string;
  title: string;
  tagline: string;
  quote: string;
  deliverableTitle: string;
  deliverablesDesc: string;
  timeframe: string;
  timeframeDetail: string;
  teamOrGuarantees: string[];
  teamCategory: string;
  badge: { left: string; right: string };
  meta: string;
  cardBg: string;
  accentColor: string;
  codeLines: string[];
}

const phases: PhaseCard[] = [
  {
    step: "01",
    phaseNum: "Phase 01",
    title: "Discover",
    tagline: "Technical Audit & Competitor Gap",
    quote: "Deep technical diagnostics that identify high-intent market gaps before writing a single line of code.",
    deliverableTitle: "Technical & Competitor Diagnosis",
    deliverablesDesc: "We crawl your entire website with enterprise tooling to spot crawl traps, canonical conflicts, schema errors, and slow assets.",
    timeframe: "Days 1 - 7 (Week 1)",
    timeframeDetail: "Comprehensive 15-page diagnostic report delivered via Notion + Loom video walkthrough for your leadership team.",
    teamCategory: "Team Allocation",
    teamOrGuarantees: [
      "Lead Technical SEO Architect",
      "Senior Next.js Frontend Engineer",
      "Slack Channel Standup Access",
    ],
    badge: { left: "-18,214", right: "85% less" },
    meta: "Sprint • 7 Days",
    cardBg: "linear-gradient(135deg, #090e1c 0%, #111a33 50%, #1e2947 100%)",
    accentColor: "#38bdf8",
    codeLines: [
      "<!-- audit: crawl_complete -->",
      "<pipeline phase=\"01_discover\">",
      "  <h1>Technical Discovery</h1>",
      "  <p>Competitor gap identified across US & UK.</p>",
      "  <p>Zero crawl traps. Schema verified.</p>",
      "  <h2>Deliverables</h2>",
      "  <ol>",
      "    <li>15-page Notion diagnostic report</li>",
      "    <li>Executive Loom video walkthrough</li>",
      "    <li>Assigned Technical SEO Architect</li>",
      "  </ol>",
      "</pipeline>",
    ],
  },
  {
    step: "02",
    phaseNum: "Phase 02",
    title: "Strategize",
    tagline: "The 90-Day Organic Roadmap",
    quote: "Commercial keyword clustering tailored to high-buyer-intent queries across North America and Europe.",
    deliverableTitle: "The 90-Day Organic Roadmap",
    deliverablesDesc: "Commercial keyword clustering based on buyer intent in North America and Europe, plus UX conversion wireframing.",
    timeframe: "Days 8 - 14 (Week 2)",
    timeframeDetail: "Complete keyword matrix with search volumes, difficulty scores, and targeted page mapping approved by client.",
    teamCategory: "Strategic Outputs",
    teamOrGuarantees: [
      "Content Calendar (3 Months)",
      "Digital PR Target Publications",
      "High-Intent Geo-Landing Blueprints",
    ],
    badge: { left: "-24,581", right: "88% less" },
    meta: "Sprint • 7 Days",
    cardBg: "linear-gradient(135deg, #130a21 0%, #201138 50%, #351a5c 100%)",
    accentColor: "#c084fc",
    codeLines: [
      "<!-- roadmap: 90_day_organic -->",
      "<strategy phase=\"02_strategize\">",
      "  <h1>90-Day Blueprint</h1>",
      "  <p>High-buyer-intent keywords mapped to high-intent pages.</p>",
      "  <h2>Outputs</h2>",
      "  <ol>",
      "    <li>Content calendar for 3 months</li>",
      "    <li>Tier-1 Digital PR media targets</li>",
      "    <li>High-intent geo-landing blueprints</li>",
      "  </ol>",
      "</strategy>",
    ],
  },
  {
    step: "03",
    phaseNum: "Phase 03",
    title: "Execute",
    tagline: "Next.js Speed & Schema Sprint",
    quote: "Sub-second Next.js architecture and authoritative editorial placements built for compounding conversion.",
    deliverableTitle: "Engineering & Content Sprint",
    deliverablesDesc: "Live code deployment on Next.js, image optimization, schema injection, and high-DA editorial guest placements.",
    timeframe: "Weeks 3 to 8",
    timeframeDetail: "Staging review links provided for approval before zero-downtime production deployment.",
    teamCategory: "Quality Guarantees",
    teamOrGuarantees: [
      "95+ Google PageSpeed Score",
      "100% White-Hat Editorial Links",
      "Strict Git Version Control",
    ],
    badge: { left: "-32,490", right: "92% less" },
    meta: "Sprint • 6 Weeks",
    cardBg: "linear-gradient(135deg, #1c0a06 0%, #3b1406 45%, #7c2d12 85%, #ea580c 100%)",
    accentColor: "#fb923c",
    codeLines: [
      "<!-- speed: nextjs_15_turbo -->",
      "<engineering phase=\"03_execute\">",
      "  <h1>Speed & Authority Sprint</h1>",
      "  <p>Load time cut from 4.2s to 0.8s instant.</p>",
      "  <h2>Guarantees</h2>",
      "  <ol>",
      "    <li>95+ Google PageSpeed score</li>",
      "    <li>100% white-hat editorial backlinks</li>",
      "    <li>Strict Git version control & zero downtime</li>",
      "  </ol>",
      "</engineering>",
    ],
  },
  {
    step: "04",
    phaseNum: "Phase 04",
    title: "Optimize",
    tagline: "Compounding Scale & Live Observability",
    quote: "Continuous SERP position tracking, CRO testing, and 24/7 Looker Studio dashboard telemetry.",
    deliverableTitle: "Revenue Scaling & Tracking",
    deliverablesDesc: "Continuous SERP position tracking, conversion rate A/B tests, and algorithmic protection for Google search updates.",
    timeframe: "Month 3 Onward",
    timeframeDetail: "Real-time interactive Google Looker Studio dashboard accessible 24/7 with zero waiting for monthly reports.",
    teamCategory: "Reporting Cadence",
    teamOrGuarantees: [
      "Weekly Slack Metric Digest",
      "Bi-Weekly Zoom Growth Call",
      "24/7 Live Data Studio Access",
    ],
    badge: { left: "-41,800", right: "94% less" },
    meta: "Cadence • Compounding",
    cardBg: "linear-gradient(135deg, #021814 0%, #06382e 50%, #0a5244 100%)",
    accentColor: "#34d399",
    codeLines: [
      "<!-- telemetry: live_observability -->",
      "<scaling phase=\"04_optimize\">",
      "  <h1>Compounding Growth</h1>",
      "  <p>Real-time SERP tracking & algorithmic protection.</p>",
      "  <h2>Cadence</h2>",
      "  <ol>",
      "    <li>Weekly Slack metric digest</li>",
      "    <li>Bi-weekly executive growth calls</li>",
      "    <li>24/7 live Google Looker Studio access</li>",
      "  </ol>",
      "</scaling>",
    ],
  },
];

export default function HowWeWork3D() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Auto-play sliding pages
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % phases.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const current = phases[activeIndex];
  const next = phases[(activeIndex + 1) % phases.length];
  const prevIndex = (activeIndex - 1 + phases.length) % phases.length;

  const handlePrev = () => setActiveIndex(prevIndex);
  const handleNext = () => setActiveIndex((activeIndex + 1) % phases.length);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) handleNext();
    if (diff < -40) handlePrev();
    touchStartX.current = null;
  };

  return (
    <section
      id="how-we-work"
      className="relative py-14 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 z-10 bg-[#f8fafd] border-t border-slate-200/80 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Dynamic Keyframes for exact MotionSites orange laser beam & particle embers */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes beamGlowMotion {
          0%, 100% {
            box-shadow: 0 0 16px #f97316, 0 0 35px rgba(249, 115, 22, 0.75), 0 0 60px rgba(251, 146, 60, 0.4);
            opacity: 0.95;
          }
          50% {
            box-shadow: 0 0 25px #ea580c, 0 0 50px rgba(249, 115, 22, 1), 0 0 85px rgba(251, 146, 60, 0.65);
            opacity: 1;
          }
        }
        @keyframes emberShower {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 0.95;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: translate(var(--ember-x, 28px), var(--ember-y, -15px)) scale(0.2);
            opacity: 0;
          }
        }
        @keyframes pageSlideIn {
          0% {
            transform: translateX(120px) scale(0.96);
            opacity: 0.2;
          }
          100% {
            transform: translateX(0px) scale(1);
            opacity: 1;
          }
        }
        @keyframes codeFadeIn {
          0% {
            opacity: 0.25;
            transform: translateY(6px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}} />

      <div className="max-w-7xl mx-auto">
        {/* ================================================================ */}
        {/* OUTER ROUNDED FRAME MATCHING MOTIONSITES AI DISTILL COMPARISON */}
        {/* ================================================================ */}
        <div className="relative rounded-[32px] sm:rounded-[40px] bg-[#f2f4f8] border border-slate-300/80 p-6 sm:p-10 md:p-14 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] overflow-hidden">
          
          {/* TOP HEADER ROW MATCHING MOTIONSITES AI LAYOUT */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-10 sm:mb-14">
            
            {/* Top Left: Circular Nav Arrow + Badge + Editorial Serif Headline */}
            <div className="flex items-start gap-4 sm:gap-5">
              <button
                onClick={handlePrev}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#111827] text-white flex items-center justify-center shrink-0 shadow-md hover:bg-slate-800 transition-transform active:scale-95"
                title="Previous Slide"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-500 font-bold block">
                  AI &amp; SEO PIPELINE READABILITY
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#0f172a] font-normal tracking-tight leading-[1.1]">
                  Built for founders.<br />
                  <span className="italic font-normal text-slate-700">Read by machines.</span>
                </h2>
              </div>
            </div>

            {/* Top Right: Description + Orange CTA Button */}
            <div className="max-w-md space-y-4 lg:text-left">
              <p className="text-xs sm:text-[13.5px] text-slate-600 leading-relaxed">
                Balaji Prime Media engineers your high-intent SEO and Next.js pipeline at the edge, converting organic search traffic into measurable revenue without changing a pixel of your brand integrity.
              </p>

              <div className="flex items-center gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold shadow-[0_0_20px_rgba(249,115,22,0.35)] hover:from-orange-600 hover:to-amber-600 transition-all cursor-pointer"
                >
                  <span>Explore Process</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                {/* Step indicator pills */}
                <div className="flex items-center gap-1.5 bg-white/70 border border-slate-300/80 px-3 py-1.5 rounded-full shadow-xs">
                  {phases.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={`h-2 rounded-full transition-all ${
                        activeIndex === i ? "w-6 bg-orange-500" : "w-2 bg-slate-300 hover:bg-slate-400"
                      }`}
                      title={`Go to Phase 0${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* ================================================================ */}
          {/* THE 3D SLIDING COMPARISON STAGE: CODE (LEFT) | ORANGE LINE (CENTER) | 3D CARD (RIGHT) */}
          {/* ================================================================ */}
          <div className="relative w-full rounded-3xl bg-[#e9ecf2] border border-slate-300/70 p-4 sm:p-6 md:p-8 overflow-hidden min-h-[520px] flex items-center shadow-inner">
            
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative">
              
              {/* ------------------------------------------------------------ */}
              {/* LEFT SIDE: CLEAN CODE & STREAM REPRESENTATION */}
              {/* ------------------------------------------------------------ */}
              <div
                key={`code-${activeIndex}`}
                className="lg:col-span-5 flex flex-col justify-center space-y-4 py-2 font-mono text-xs text-slate-500 select-none"
                style={{ animation: "codeFadeIn 0.5s ease-out" }}
              >
                {/* Meta comments */}
                <div className="space-y-0.5 text-[11px] text-slate-400 opacity-75">
                  <p>&lt;!-- distill: 6,380 tokens --&gt;</p>
                  <p>&lt;!-- original: 98,432 tokens --&gt;</p>
                  <p>&lt;!-- bpm.in/cases/organic-pipeline --&gt;</p>
                </div>

                {/* Clean semantic HTML code as shown in the video */}
                <div className="space-y-1.5 text-slate-700 text-xs sm:text-[13px] leading-relaxed pl-1">
                  {current.codeLines.map((line, idx) => (
                    <p
                      key={idx}
                      className={
                        line.startsWith("<h1") || line.startsWith("<pipeline") || line.startsWith("<engineering")
                          ? "text-slate-900 font-semibold"
                          : line.startsWith("  <li>")
                          ? "text-slate-800 pl-4"
                          : "text-slate-600 pl-2"
                      }
                    >
                      {line}
                    </p>
                  ))}
                </div>

                {/* Left Side Quick Phase Summary Pill */}
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-orange-600 bg-orange-500/10 border border-orange-500/25 px-3 py-1 rounded-full">
                    <span>Active Output:</span>
                    <span className="text-slate-900">{current.deliverableTitle}</span>
                  </span>
                </div>
              </div>

              {/* ------------------------------------------------------------ */}
              {/* CENTER: VERTICAL GLOWING ORANGE LINE WITH DUAL BADGE & EMBERS */}
              {/* ------------------------------------------------------------ */}
              <div className="hidden lg:flex lg:col-span-2 flex-col items-center justify-center relative h-full min-h-[460px]">
                
                {/* Top Dual Pill Badge: Exactly as in Video (-24,581 | 85% less) */}
                <div className="absolute -top-4 z-40 flex flex-col items-center">
                  <span className="text-[10px] font-mono text-slate-500 font-semibold mb-1">
                    Token reduction
                  </span>
                  <div className="flex items-center rounded-full shadow-[0_0_25px_rgba(249,115,22,0.6)]">
                    <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-mono font-black text-[11px] px-3.5 py-1 rounded-l-full">
                      {current.badge.left}
                    </span>
                    <span className="bg-orange-100 text-orange-700 font-mono font-bold text-[11px] px-3 py-1 rounded-r-full border border-orange-300/80">
                      {current.badge.right}
                    </span>
                  </div>
                </div>

                {/* The Glowing Neon Orange Laser Beam */}
                <div
                  className="relative w-1.5 h-full rounded-full bg-gradient-to-b from-orange-400 via-orange-500 to-amber-500"
                  style={{
                    animation: "beamGlowMotion 2.5s ease-in-out infinite",
                  }}
                />

                {/* Shower of Dynamic Sparkling Particle Embers Spraying to the Right */}
                <div className="absolute inset-y-0 left-1/2 w-32 pointer-events-none overflow-hidden">
                  {[
                    { top: "10%", size: 3, x: 26, y: -12, delay: "0s" },
                    { top: "18%", size: 2, x: 38, y: -8, delay: "0.3s" },
                    { top: "26%", size: 4, x: 44, y: 10, delay: "0.7s" },
                    { top: "34%", size: 2.5, x: 32, y: -14, delay: "1.1s" },
                    { top: "42%", size: 3.5, x: 50, y: 6, delay: "0.2s" },
                    { top: "50%", size: 2, x: 28, y: -18, delay: "0.5s" },
                    { top: "58%", size: 4, x: 46, y: 12, delay: "0.9s" },
                    { top: "66%", size: 3, x: 36, y: -10, delay: "1.3s" },
                    { top: "74%", size: 2.5, x: 42, y: 8, delay: "0.4s" },
                    { top: "82%", size: 3, x: 30, y: -16, delay: "0.8s" },
                    { top: "90%", size: 2, x: 40, y: 14, delay: "1.2s" },
                  ].map((ember, i) => (
                    <span
                      key={i}
                      className="absolute rounded-full bg-orange-400 shadow-[0_0_8px_#f97316]"
                      style={
                        {
                          top: ember.top,
                          left: "4px",
                          width: `${ember.size}px`,
                          height: `${ember.size}px`,
                          "--ember-x": `${ember.x}px`,
                          "--ember-y": `${ember.y}px`,
                          animation: `emberShower 1.8s ease-out infinite ${ember.delay}`,
                        } as React.CSSProperties
                      }
                    />
                  ))}
                </div>
              </div>

              {/* ------------------------------------------------------------ */}
              {/* RIGHT SIDE: 3D SLIDING PAGE CARDS (EXACT VISUALS FROM VIDEO) */}
              {/* ------------------------------------------------------------ */}
              <div className="lg:col-span-5 relative flex items-center justify-start overflow-visible py-4">
                
                {/* Active Work Page Card Sliding In From Right */}
                <div
                  key={`card-${activeIndex}`}
                  className="relative w-full max-w-[420px] rounded-[26px] p-6 sm:p-7 text-white shadow-[0_25px_60px_-10px_rgba(0,0,0,0.65)] overflow-hidden flex flex-col justify-between min-h-[460px] border border-white/10"
                  style={{
                    background: current.cardBg,
                    animation: "pageSlideIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  {/* Atmospheric Glow Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                  {/* Card Nav Header Matching Video: Brand + PRODUCTS, VISION, ABOUT */}
                  <div className="relative z-10 flex items-center justify-between text-xs pb-3 border-b border-white/15">
                    <span className="font-bold tracking-wider text-white">
                      BPM &bull; {current.phaseNum}
                    </span>

                    <div className="flex items-center gap-2 text-[10px] font-mono text-slate-300">
                      <span className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 transition-colors">
                        AUDIT
                      </span>
                      <span className="px-2 py-0.5 rounded bg-white/20 text-white font-bold">
                        ROADMAP
                      </span>
                      <span className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 transition-colors">
                        SCALE
                      </span>
                    </div>
                  </div>

                  {/* Mid Section: Step Number, Title & Exact Editorial Quote */}
                  <div className="relative z-10 my-auto py-6 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-orange-400 bg-orange-500/20 px-2.5 py-0.5 rounded-full border border-orange-400/30">
                        {current.step} {current.title}
                      </span>
                      <span className="text-xs font-mono text-slate-300">
                        {current.timeframe}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal leading-snug tracking-tight">
                      &ldquo;{current.quote}&rdquo;
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed pt-1">
                      {current.deliverablesDesc}
                    </p>
                  </div>

                  {/* Card Bottom: Checklist + Manifesto / Metadata Footer */}
                  <div className="relative z-10 pt-4 border-t border-white/15 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-[11px] font-medium">{current.teamOrGuarantees[0]}</span>
                    </div>

                    <span className="text-[11px] font-mono text-slate-400">
                      {current.meta}
                    </span>
                  </div>
                </div>

                {/* Peek of the Next Queued Card on the Far Right (Exact styling as Kessler in video!) */}
                <div
                  onClick={handleNext}
                  className="hidden xl:block absolute -right-28 top-6 bottom-6 w-32 rounded-r-3xl p-5 text-white/50 overflow-hidden cursor-pointer hover:opacity-90 transition-opacity border-y border-r border-white/10 shadow-2xl"
                  style={{
                    background: next.cardBg,
                    filter: "brightness(0.7) blur(0.5px)",
                  }}
                  title={`Next: ${next.title}`}
                >
                  <div className="h-full flex flex-col justify-between">
                    <span className="text-xs font-bold text-white/60">
                      {next.phaseNum}
                    </span>
                    <h4 className="font-serif text-lg text-white font-normal leading-tight">
                      {next.title}.
                    </h4>
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* BOTTOM STEP CONTROLS & TIMEFRAME WORKBENCH */}
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-slate-300/60 text-xs">
            <div className="flex items-center gap-3">
              <span className="text-slate-500 font-mono">Select Phase:</span>
              <div className="flex flex-wrap items-center gap-2">
                {phases.map((p, i) => (
                  <button
                    key={p.step}
                    onClick={() => setActiveIndex(i)}
                    className={`px-3 py-1 rounded-full font-bold transition-all ${
                      activeIndex === i
                        ? "bg-[#111827] text-white shadow-sm"
                        : "bg-white text-slate-600 hover:text-slate-900 border border-slate-300/80"
                    }`}
                  >
                    {p.step} {p.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-500 font-mono text-[11px]">
              <span>Auto-sliding</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>(Hover to pause slide)</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
