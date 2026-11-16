"use client";

import React, { useState, useEffect } from "react";
import {
  Star,
  Sparkles,
  TrendingUp,
  Gauge,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

interface GlowRatingBentoProps {
  onOpenConsultation?: (service?: string) => void;
}

// 7-row LED dot bitmap glyphs matching MotionSites AI specification
const GLYPHS: Record<string, string[]> = {
  "0": ["01110","10001","10011","10101","11001","10001","01110"],
  "1": ["010","110","010","010","010","010","111"],
  "2": ["01110","10001","00001","00010","00100","01000","11111"],
  "3": ["11110","00001","00001","01110","00001","00001","11110"],
  "4": ["00010","00110","01010","10010","11111","00010","00010"],
  "5": ["11111","10000","10000","11110","00001","00001","11110"],
  "6": ["01110","10000","10000","11110","10001","10001","01110"],
  "7": ["11111","00001","00010","00100","01000","01000","01000"],
  "8": ["01110","10001","10001","01110","10001","10001","01110"],
  "9": ["01110","10001","10001","01111","00001","00001","01110"],
  ".": ["0","0","0","0","0","0","1"],
  "+": ["00000","00100","00100","11111","00100","00100","00000"],
  "#": ["01010","01010","11111","01010","11111","01010","01010"],
  "%": ["11001","11010","00100","01000","01011","10011","00000"],
  "I": ["111","010","010","010","010","010","111"],
  "a": ["00000","00000","01110","00001","01111","10001","01111"],
  "e": ["00000","00000","01110","10001","11111","10000","01110"],
  "g": ["00000","00000","01111","10001","01111","00001","01110"],
  "i": ["1","0","1","1","1","1","1"],
  "l": ["10","10","10","10","10","10","01"],
  "n": ["00000","00000","11110","10001","10001","10001","10001"],
  "t": ["010","010","111","010","010","010","001"],
  "r": ["00000","00000","10110","11001","10000","10000","10000"],
};

function DotNumberSVG({
  text,
  pitchX = 5,
  dotRadius = 1.6,
}: {
  text: string;
  pitchX?: number;
  dotRadius?: number;
}) {
  const pitchY = 4;
  const gap = 1;
  let currentX = 0;
  const circles: { cx: number; cy: number; r: number }[] = [];

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const rows = GLYPHS[char];
    if (!rows) continue;

    const charWidth = rows[0].length;
    for (let r = 0; r < 7; r++) {
      const rowStr = rows[r];
      for (let c = 0; c < rowStr.length; c++) {
        if (rowStr[c] === "1") {
          const cx = currentX + c * pitchX + 1.55;
          const cy = r * pitchY + 1.55;
          circles.push({ cx, cy, r: dotRadius });
        }
      }
    }
    currentX += charWidth * pitchX + gap;
  }

  return (
    <svg
      viewBox={`0 0 ${currentX} 28`}
      fill="currentColor"
      className="w-full h-auto max-h-[38px] overflow-visible drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
      aria-label={text}
    >
      {circles.map((c, idx) => (
        <circle key={idx} cx={c.cx.toFixed(2)} cy={c.cy.toFixed(2)} r={c.r} />
      ))}
    </svg>
  );
}

export default function GlowRatingBento({ onOpenConsultation }: GlowRatingBentoProps) {
  const [filter, setFilter] = useState<"all" | "usa" | "uk">("all");

  // Generate ticks for Card 1 SVG gauge
  const gaugeTicks: { x1: number; y1: number; x2: number; y2: number; sw: number }[] = [];
  for (let i = 0; i <= 22; i++) {
    const angle = ((190 + i * 5) * Math.PI) / 180;
    const outer = 142;
    const inner = i % 5 === 0 ? 129 : 133;
    gaugeTicks.push({
      x1: 163 + outer * Math.cos(angle),
      y1: 163 + outer * Math.sin(angle),
      x2: 163 + inner * Math.cos(angle),
      y2: 163 + inner * Math.sin(angle),
      sw: i % 5 === 0 ? 1.5 : 1,
    });
  }

  return (
    <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 md:px-12 z-10 overflow-hidden bg-[#060216] text-white border-t border-purple-500/20">
      {/* Subtle glowing violet dot matrix grid */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(160,104,255,0.1)_1px,transparent_1px)] [background-size:24px_24px] opacity-70 pointer-events-none" />

      {/* Dynamic Keyframes for MotionSites AI Glass Sheen and Radar Beam */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes radarSweepBeam {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes glassSheenFloat {
          0%, 100% { opacity: 0.8; transform: translateY(0px); }
          50% { opacity: 1; transform: translateY(-4px); }
        }
        .motionsite-card {
          aspect-ratio: 429 / 554;
          border: 1px solid rgba(255,255,255,0.36);
          border-radius: 17px;
          background-origin: border-box;
          box-shadow: 0 4px 12px rgba(50,28,39,0.22), inset 0 1px 0 rgba(255,255,255,0.24);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .motionsite-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 14px 30px rgba(50,28,39,0.28), inset 0 1px 0 rgba(255,255,255,0.4);
        }
      `}} />

      {/* SVG FILTERS DEFINITIONS */}
      <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
        <defs>
          <filter id="msCardNoise">
            <feTurbulence type="fractalNoise" baseFrequency=".54" numOctaves="3" seed="27" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncR type="linear" slope="1.8" intercept="-.25" />
              <feFuncG type="linear" slope="1.8" intercept="-.25" />
              <feFuncB type="linear" slope="1.8" intercept="-.25" />
              <feFuncA type="table" tableValues="0 .52" />
            </feComponentTransfer>
          </filter>
          <filter id="msRadarSoft"><feGaussianBlur stdDeviation="1.35" /></filter>
          <filter id="msRadarHalo"><feGaussianBlur stdDeviation="5.2" /></filter>
          <filter id="msGaugeBlur"><feGaussianBlur stdDeviation="11" /></filter>
          <filter id="msTileSoft"><feGaussianBlur stdDeviation="3.4" /></filter>
          <filter id="msGroutSoft"><feGaussianBlur stdDeviation="6.5" /></filter>
          <filter id="msPanelNoiseF">
            <feTurbulence type="fractalNoise" baseFrequency=".54" numOctaves="3" seed="13" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="table" tableValues="0 .45" />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* SECTION HEADER (EXACT DETAILS PRESERVED) */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-xs font-semibold text-purple-300 mb-4 backdrop-blur-md shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#c084fc]" />
            <span>⭐️ Verified Pilot Case Studies &amp; Client Feedback</span>
          </div>

          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Trusted by Ambitious Global Founders
          </h3>

          <p className="text-[15px] sm:text-base text-slate-300 mt-3 max-w-2xl mx-auto leading-relaxed">
            See how our high-intent SEO and Next.js development deliver real organic revenue across the US, UK, and Europe.
          </p>

          {/* Region Filter Buttons */}
          <div className="inline-flex items-center gap-1.5 p-1 mt-6 rounded-full bg-white/[0.06] border border-purple-500/30 shadow-md backdrop-blur-md">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                filter === "all"
                  ? "bg-gradient-to-r from-[#A068FF] to-[#7928CA] text-white shadow-[0_0_15px_rgba(160,104,255,0.4)]"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              All Case Studies
            </button>
            <button
              onClick={() => setFilter("usa")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                filter === "usa"
                  ? "bg-gradient-to-r from-[#A068FF] to-[#7928CA] text-white shadow-[0_0_15px_rgba(160,104,255,0.4)]"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              USA Founders 🇺🇸
            </button>
            <button
              onClick={() => setFilter("uk")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                filter === "uk"
                  ? "bg-gradient-to-r from-[#A068FF] to-[#7928CA] text-white shadow-[0_0_15px_rgba(160,104,255,0.4)]"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              UK Founders 🇬🇧
            </button>
          </div>
        </div>

        {/* ================================================================ */}
        {/* 3 REDESIGNED CLIENT TESTIMONIAL CARDS (Luxury Obsidian & Violet) */}
        {/* ================================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch justify-center max-w-[1360px] mx-auto">
          
          {/* ============================================================== */}
          {/* CARD 1: DAVID HENDERSON (E-Commerce Revenue Growth) */}
          {/* ============================================================== */}
          <div
            className={`transition-all duration-300 flex ${
              filter === "uk" ? "opacity-30 scale-[0.98] pointer-events-none" : "opacity-100 scale-100"
            }`}
          >
            <article
              className="group relative w-full rounded-3xl overflow-hidden flex flex-col justify-between p-6 sm:p-7 text-white select-none border border-rose-500/30 hover:border-rose-400/70 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(244,63,94,0.25)] backdrop-blur-2xl"
              style={{
                background: "linear-gradient(165deg, #170826 0%, #0d0419 50%, #06010e 100%)",
              }}
            >
              {/* Subtle Ambient Radial Backlight */}
              <div
                aria-hidden="true"
                className="absolute -top-16 -right-16 w-48 h-48 bg-rose-500/20 rounded-full blur-3xl pointer-events-none group-hover:bg-rose-500/30 transition-all"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-16 -left-16 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-500/30 transition-all"
              />

              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-rose-400 to-purple-500" />

              {/* Card Top Title: Client Result */}
              <div className="relative z-10 space-y-1 mb-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-[11px] font-bold text-rose-300 uppercase tracking-wider mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                  <span>E-Commerce Search Scaled</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white leading-snug">
                  +340% Revenue <span className="text-rose-400">&bull;</span> Organic Growth
                </h3>
              </div>

              {/* Metric Hero Row: Big Glowing Metric + Gauge Indicator */}
              <div className="relative z-10 my-4 p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md flex flex-col items-center justify-center text-center">
                <div className="flex items-baseline justify-center gap-1.5">
                  <span className="text-4xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-white to-purple-300 drop-shadow-[0_0_20px_rgba(244,63,94,0.4)]">
                    +340%
                  </span>
                  <span className="text-sm sm:text-base font-bold text-rose-300 uppercase tracking-wider">
                    Revenue
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-300 font-medium">
                  <span className="text-emerald-400 font-bold">↗ $1.4M ARR</span>
                  <span className="text-slate-500">•</span>
                  <span>Eclipsed Paid Ads Spend</span>
                </div>
              </div>

              {/* Testimonial Quote & Verified Rating */}
              <div className="relative z-10 space-y-4 pt-2">
                {/* 5-Star Rating */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-300 fill-amber-300 drop-shadow-[0_0_8px_rgba(252,211,77,0.5)]" />
                    ))}
                    <span className="text-xs font-mono text-amber-200 ml-1.5 font-bold">
                      5.0
                    </span>
                  </div>
                  <span className="text-[10.5px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    ✓ Verified Client
                  </span>
                </div>

                {/* Verbatim Quote */}
                <p className="text-[13px] text-slate-200 leading-relaxed italic">
                  &ldquo;Balaji Prime Media completely transformed our organic pipeline. In 4 months, our US search traffic grew significantly, and organic revenue eclipsed our paid Facebook ad spend.&rdquo;
                </p>

                {/* Client Profile */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500/30 to-purple-500/30 text-white font-black text-xs flex items-center justify-center border border-rose-400/40 shadow-inner shrink-0">
                      DH
                    </div>
                    <div className="text-left">
                      <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">David Henderson</h4>
                      <p className="text-[11px] text-slate-400">Founder &amp; CEO, Luxe Apparel (Los Angeles, USA 🇺🇸)</p>
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenConsultation?.("SEO Strategy Call")}
                    className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 text-xs font-semibold transition-all cursor-pointer shrink-0"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </article>
          </div>

          {/* ============================================================== */}
          {/* CARD 2: OLIVER THORNE (Local SEO London Authority) */}
          {/* ============================================================== */}
          <div
            className={`transition-all duration-300 flex ${
              filter === "usa" ? "opacity-30 scale-[0.98] pointer-events-none" : "opacity-100 scale-100"
            }`}
          >
            <article
              className="group relative w-full rounded-3xl overflow-hidden flex flex-col justify-between p-6 sm:p-7 text-white select-none border border-purple-500/40 hover:border-purple-400/80 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(168,85,247,0.3)] backdrop-blur-2xl"
              style={{
                background: "linear-gradient(165deg, #180938 0%, #0e0524 50%, #070214 100%)",
              }}
            >
              {/* Ambient Radial Backlight */}
              <div
                aria-hidden="true"
                className="absolute -top-16 -right-16 w-48 h-48 bg-purple-500/25 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-500/35 transition-all"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-16 -left-16 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/30 transition-all"
              />

              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-cyan-400" />

              {/* Card Top Title: Client Result */}
              <div className="relative z-10 space-y-1 mb-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-[11px] font-bold text-purple-200 uppercase tracking-wider mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                  <span>#1 Google Map Pack Authority</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white leading-snug">
                  +280% Phone Bookings <span className="text-purple-400">&bull;</span> Local SEO
                </h3>
              </div>

              {/* Metric Hero Row */}
              <div className="relative z-10 my-4 p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md flex flex-col items-center justify-center text-center">
                <div className="flex items-baseline justify-center gap-1.5">
                  <span className="text-4xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-cyan-300 drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                    +280%
                  </span>
                  <span className="text-sm sm:text-base font-bold text-purple-300 uppercase tracking-wider">
                    Calls
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-300 font-medium">
                  <span className="text-cyan-400 font-bold">📍 18 London Boroughs</span>
                  <span className="text-slate-500">•</span>
                  <span>Zero Paid Ads Needed</span>
                </div>
              </div>

              {/* Testimonial Quote & Verified Rating */}
              <div className="relative z-10 space-y-4 pt-2">
                {/* 5-Star Rating */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-300 fill-amber-300 drop-shadow-[0_0_8px_rgba(252,211,77,0.5)]" />
                    ))}
                    <span className="text-xs font-mono text-amber-200 ml-1.5 font-bold">
                      5.0
                    </span>
                  </div>
                  <span className="text-[10.5px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    ✓ Verified Client
                  </span>
                </div>

                {/* Verbatim Quote */}
                <p className="text-[13px] text-slate-200 leading-relaxed italic">
                  &ldquo;Their local SEO strategy put us #1 across London for every high-value patient keyword. Inbound phone bookings jumped 280%. The weekly Slack updates and transparent Data Studio reporting are top notch.&rdquo;
                </p>

                {/* Client Profile */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/30 to-indigo-500/30 text-white font-black text-xs flex items-center justify-center border border-purple-400/40 shadow-inner shrink-0">
                      OT
                    </div>
                    <div className="text-left">
                      <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">Oliver Thorne</h4>
                      <p className="text-[11px] text-slate-400">Marketing Director, Apex Dental (London, UK 🇬🇧)</p>
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenConsultation?.("Local SEO Call")}
                    className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 text-xs font-semibold transition-all cursor-pointer shrink-0"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </article>
          </div>

          {/* ============================================================== */}
          {/* CARD 3: CHLOE MARTINEZ (Next.js Speed & Conversion) */}
          {/* ============================================================== */}
          <div
            className={`transition-all duration-300 flex ${
              filter === "uk" ? "opacity-30 scale-[0.98] pointer-events-none" : "opacity-100 scale-100"
            }`}
          >
            <article
              className="group relative w-full rounded-3xl overflow-hidden flex flex-col justify-between p-6 sm:p-7 text-white select-none border border-cyan-500/35 hover:border-cyan-400/75 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(6,182,212,0.25)] backdrop-blur-2xl"
              style={{
                background: "linear-gradient(165deg, #09172e 0%, #050e1f 50%, #020712 100%)",
              }}
            >
              {/* Ambient Radial Backlight */}
              <div
                aria-hidden="true"
                className="absolute -top-16 -right-16 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/30 transition-all"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-16 -left-16 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/30 transition-all"
              />

              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-emerald-400" />

              {/* Card Top Title: Client Result */}
              <div className="relative z-10 space-y-1 mb-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/35 text-[11px] font-bold text-cyan-200 uppercase tracking-wider mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span>42% Bounce Reduction &bull; Next.js 15</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white leading-snug">
                  98/100 PageSpeed <span className="text-cyan-400">&bull;</span> Conversion Boost
                </h3>
              </div>

              {/* Metric Hero Row */}
              <div className="relative z-10 my-4 p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md flex flex-col items-center justify-center text-center">
                <div className="flex items-baseline justify-center gap-1.5">
                  <span className="text-4xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-emerald-300 drop-shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                    98/100
                  </span>
                  <span className="text-sm sm:text-base font-bold text-cyan-300 uppercase tracking-wider">
                    PageSpeed
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-300 font-medium">
                  <span className="text-emerald-400 font-bold">⚡ 0.8s LCP</span>
                  <span className="text-slate-500">•</span>
                  <span>100% Core Web Vitals Pass</span>
                </div>
              </div>

              {/* Testimonial Quote & Verified Rating */}
              <div className="relative z-10 space-y-4 pt-2">
                {/* 5-Star Rating */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-300 fill-amber-300 drop-shadow-[0_0_8px_rgba(252,211,77,0.5)]" />
                    ))}
                    <span className="text-xs font-mono text-amber-200 ml-1.5 font-bold">
                      5.0
                    </span>
                  </div>
                  <span className="text-[10.5px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    ✓ Verified Client
                  </span>
                </div>

                {/* Verbatim Quote */}
                <p className="text-[13px] text-slate-200 leading-relaxed italic">
                  &ldquo;The Next.js rebuild cut our load time from 4.2s down to 0.8s. All Google Core Web Vitals are green (100/100). They think like genuine growth partners, not just developers. Demo bookings surged 420%.&rdquo;
                </p>

                {/* Client Profile */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/30 to-emerald-500/30 text-white font-black text-xs flex items-center justify-center border border-cyan-400/40 shadow-inner shrink-0">
                      CM
                    </div>
                    <div className="text-left">
                      <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">Chloe Martinez</h4>
                      <p className="text-[11px] text-slate-400">Co-Founder, CloudSync SaaS (Austin, USA 🇺🇸)</p>
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenConsultation?.("Performance Rebuild Call")}
                    className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 text-xs font-semibold transition-all cursor-pointer shrink-0"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </article>
          </div>

        </div>
      </div>
    </section>
  );
}
