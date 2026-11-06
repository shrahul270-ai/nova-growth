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

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Trusted by Ambitious Global Founders
          </h2>

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
        {/* 3 MOTIONSITES GLASS METRIC CARDS (RIGID 429x554 UNITS) */}
        {/* ================================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-center justify-center max-w-[1360px] mx-auto">
          
          {/* ============================================================== */}
          {/* CARD 1: DAVID HENDERSON (CARD--SPEED WITH CLOUDFRONT VIDEO + GAUGE) */}
          {/* ============================================================== */}
          <div
            className={`transition-all duration-300 ${
              filter === "uk" ? "opacity-30 scale-[0.98] pointer-events-none" : "opacity-100 scale-100"
            }`}
          >
            <article
              className="motionsite-card relative overflow-hidden flex flex-col justify-between p-6 sm:p-7 text-white select-none"
              style={{
                background: `radial-gradient(ellipse 34% 24% at 50% 2%, rgba(255,220,211,.10) 0%, transparent 76%),
                             radial-gradient(ellipse 44% 34% at 106% 20%, rgba(255,222,211,.10) 0%, transparent 74%),
                             linear-gradient(180deg, #bd4468 0%, #ad355b 38%, #a63b50 72%, #8c1320 100%)`,
              }}
            >
              {/* Mandatory Looping CloudFront Video */}
              <video
                className="absolute inset-0 w-full h-full object-fill z-0 pointer-events-none"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden="true"
                poster="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/167977c6-8539-46b1-9a15-8dba566f50b8.png"
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_130045_1a612b69-4854-4b34-8043-ccb91f2c60af.mp4"
              />

              {/* Grain Texture */}
              <svg className="absolute inset-0 w-full h-full opacity-50 mix-blend-soft-light z-1 pointer-events-none" viewBox="0 0 429 554" preserveAspectRatio="none">
                <rect width="100%" height="100%" filter="url(#msCardNoise)" />
              </svg>

              {/* Card Top Title: Service + Category */}
              <div className="relative z-10 text-center space-y-1">
                <h3 className="text-base sm:text-lg font-semibold tracking-tight text-white leading-snug drop-shadow-sm">
                  Inference Speed &bull; Organic Pipeline<br />
                  <span className="text-xs font-normal text-white/80">AI Response Latency</span>
                </h3>
              </div>

              {/* Exact SVG Gauge Overlay */}
              <div className="absolute inset-x-0 top-[26%] h-[40%] flex items-center justify-center pointer-events-none z-2">
                <svg className="w-[84%] h-[84%] overflow-visible" viewBox="0 0 326 326">
                  <defs>
                    <linearGradient id="gArc1" x1="7" y1="136" x2="312" y2="109" gradientUnits="userSpaceOnUse">
                      <stop offset="0" stopColor="#ff9ab7" stopOpacity=".06" />
                      <stop offset="0.08" stopColor="#ff8caf" stopOpacity=".44" />
                      <stop offset="0.34" stopColor="#ff6796" stopOpacity=".94" />
                      <stop offset="0.58" stopColor="#ff6796" stopOpacity="1" />
                      <stop offset="0.82" stopColor="#ffe7ed" stopOpacity=".74" />
                      <stop offset="0.94" stopColor="#fff8fa" stopOpacity=".28" />
                      <stop offset="1" stopColor="#fff" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="gShadow1" x1="11" y1="136" x2="308" y2="110" gradientUnits="userSpaceOnUse">
                      <stop offset="0" stopColor="#6e1639" stopOpacity=".04" />
                      <stop offset="0.09" stopColor="#6e1639" stopOpacity=".17" />
                      <stop offset="0.52" stopColor="#72163d" stopOpacity=".18" />
                      <stop offset="0.78" stopColor="#7b1a43" stopOpacity=".1" />
                      <stop offset="1" stopColor="#7b1a43" stopOpacity="0" />
                    </linearGradient>
                    <radialGradient id="rBeam1" cx="163" cy="163" r="145" gradientUnits="userSpaceOnUse">
                      <stop offset="0.3" stopColor="#650f35" stopOpacity="0" />
                      <stop offset="0.45" stopColor="#650f35" stopOpacity=".025" />
                      <stop offset="0.7" stopColor="#650f35" stopOpacity=".065" />
                      <stop offset="0.9" stopColor="#650f35" stopOpacity=".08" />
                      <stop offset="1" stopColor="#650f35" stopOpacity=".05" />
                    </radialGradient>
                    <linearGradient id="rBeamEdge1" x1="238" y1="33" x2="190.5" y2="115.4" gradientUnits="userSpaceOnUse">
                      <stop offset="0" stopColor="#ffe7ef" stopOpacity=".19" />
                      <stop offset="0.48" stopColor="#ffd1df" stopOpacity=".11" />
                      <stop offset="0.82" stopColor="#ffc6d7" stopOpacity=".045" />
                      <stop offset="1" stopColor="#ffc6d7" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  <path d="M11.34 136.26A154 154 0 0 1 307.71 110.33" fill="none" strokeWidth="3.2" strokeLinecap="round" stroke="url(#gShadow1)" />
                  <path d="M6.91 135.48A158.5 158.5 0 0 1 311.94 108.79" fill="none" strokeWidth="2.2" strokeLinecap="round" stroke="url(#gArc1)" />
                  <path d="M19.22 137.65A146 146 0 0 1 236 36.56" fill="none" strokeWidth="1.15" stroke="rgba(255,166,194,.31)" />
                  <path d="M238 33.1A150 150 0 0 1 277.9 66.6L199.8 119.5A55 55 0 0 0 190.5 115.4Z" fill="#6a1238" opacity=".022" filter="url(#msRadarHalo)" />
                  <path d="M238 33.1A150 150 0 0 1 277.9 66.6L199.8 119.5A55 55 0 0 0 190.5 115.4Z" fill="url(#rBeam1)" filter="url(#msRadarSoft)" />
                  <path d="M238 33.1L190.5 115.4" stroke="url(#rBeamEdge1)" strokeWidth="1.25" strokeLinecap="round" filter="url(#msRadarSoft)" />
                  
                  {gaugeTicks.map((t, idx) => (
                    <line key={idx} x1={t.x1.toFixed(2)} y1={t.y1.toFixed(2)} x2={t.x2.toFixed(2)} y2={t.y2.toFixed(2)} stroke="rgba(255,188,210,.34)" strokeWidth={t.sw} strokeLinecap="round" />
                  ))}
                </svg>
              </div>

              {/* Metric Row: LED Dot Number + Unit */}
              <div className="relative z-10 flex items-baseline justify-center gap-1.5 my-auto pt-6">
                <div className="w-[110px]">
                  <DotNumberSVG text="+340" dotRadius={1.7} pitchX={5} />
                </div>
                <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  % Revenue
                </span>
              </div>

              {/* Exact Testimonial Details */}
              <div className="relative z-10 space-y-3 pt-2">
                {/* 5-Star Rating */}
                <div className="flex items-center justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-amber-300 fill-amber-300 drop-shadow-sm" />
                  ))}
                  <span className="text-[11px] font-mono text-amber-200 ml-1 font-bold">
                    5.0 Verified
                  </span>
                </div>

                {/* Verbatim Quote */}
                <p className="text-xs text-white/90 text-center leading-relaxed italic line-clamp-3 px-2">
                  &ldquo;Balaji Prime Media completely transformed our organic pipeline. In 4 months, our US search traffic grew significantly, and organic revenue eclipsed our paid Facebook ad spend.&rdquo;
                </p>

                {/* Client Profile */}
                <div className="flex items-center justify-between pt-3 border-t border-white/20">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-white/20 text-white font-bold text-xs flex items-center justify-center border border-white/30 shrink-0">
                      DH
                    </div>
                    <div className="text-left">
                      <h4 className="text-xs font-bold text-white leading-tight">David Henderson</h4>
                      <p className="text-[10px] text-white/70">Founder &amp; CEO, Luxe Apparel (Los Angeles, USA 🇺🇸)</p>
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenConsultation?.("SEO Strategy Call")}
                    className="px-3.5 py-1.5 rounded-full bg-white text-[#2d2d2d] text-xs font-semibold shadow-md hover:bg-white/90 transition-all cursor-pointer shrink-0"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </article>
          </div>

          {/* ============================================================== */}
          {/* CARD 2: OLIVER THORNE (CARD--CONTEXT WITH CLOUDFRONT VIDEO + TILE WINDOW) */}
          {/* ============================================================== */}
          <div
            className={`transition-all duration-300 ${
              filter === "usa" ? "opacity-30 scale-[0.98] pointer-events-none" : "opacity-100 scale-100"
            }`}
          >
            <article
              className="motionsite-card relative overflow-hidden flex flex-col justify-between p-6 sm:p-7 text-white select-none"
              style={{
                background: `radial-gradient(ellipse 118% 66% at 48% -8%, rgba(221,232,255,.065), transparent 74%),
                             linear-gradient(164deg, #c9b5e1 0%, #ad80ca 29%, #9d4f72 64%, #793246 100%)`,
              }}
            >
              {/* Mandatory Looping CloudFront Video */}
              <video
                className="absolute inset-0 w-full h-full object-fill z-0 pointer-events-none"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden="true"
                poster="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/0446d1d5-e65e-4db5-8090-3e30d09afc43.png"
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_130054_dd005674-d693-4d81-80a5-357f7f10b3a3.mp4"
              />

              <svg className="absolute inset-0 w-full h-full opacity-60 mix-blend-soft-light z-1 pointer-events-none" viewBox="0 0 429 554" preserveAspectRatio="none">
                <rect width="100%" height="100%" filter="url(#msCardNoise)" />
              </svg>

              {/* Context Tile Backdrop */}
              <div className="absolute inset-0 z-1 pointer-events-none opacity-80">
                <svg className="w-full h-full" viewBox="0 0 429 554" preserveAspectRatio="none">
                  <rect x="-24" y="22" width="106" height="149" rx="15" fill="#d5c2ff" opacity=".22" filter="url(#msTileSoft)" />
                  <rect x="88" y="22" width="247" height="150" rx="15" fill="#e0bdff" opacity=".26" filter="url(#msTileSoft)" />
                  <rect x="346" y="22" width="111" height="147" rx="15" fill="#f9c6d0" opacity=".26" filter="url(#msTileSoft)" />
                  <rect x="-24" y="177" width="108" height="174" rx="15" fill="#d5c2ff" opacity=".18" filter="url(#msTileSoft)" />
                  <rect x="88" y="177" width="247" height="174" rx="15" fill="#e858b8" opacity=".28" filter="url(#msTileSoft)" />
                  <rect x="344" y="175" width="113" height="176" rx="15" fill="#e6459c" opacity=".46" filter="url(#msTileSoft)" />
                </svg>
              </div>

              {/* Card Top Title */}
              <div className="relative z-10 text-center space-y-1">
                <h3 className="text-base sm:text-lg font-semibold tracking-tight text-white leading-snug drop-shadow-sm">
                  Context Window &bull; Local SEO<br />
                  <span className="text-xs font-normal text-white/80">#1 Google Map Pack Authority</span>
                </h3>
              </div>

              {/* Frosted Glass Window Panel */}
              <div className="absolute inset-x-[18%] top-[30%] h-[24%] rounded-2xl bg-white/20 border border-white/30 backdrop-blur-md shadow-lg z-2 pointer-events-none p-3 flex flex-col justify-between">
                <div className="w-[30%] h-1.5 rounded-full bg-white/70"></div>
                <div className="w-full h-5 rounded-lg bg-gradient-to-r from-white/70 via-pink-200/80 to-purple-300/80"></div>
                <div className="w-[85%] h-1.5 rounded-full bg-white/70"></div>
              </div>

              {/* Metric Row: LED Dot Number + Unit */}
              <div className="relative z-10 flex items-baseline justify-center gap-1.5 my-auto pt-6">
                <div className="w-[85px]">
                  <DotNumberSVG text="280" dotRadius={1.7} pitchX={5} />
                </div>
                <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  % Calls
                </span>
              </div>

              {/* Exact Testimonial Details */}
              <div className="relative z-10 space-y-3 pt-2">
                {/* 5-Star Rating */}
                <div className="flex items-center justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-amber-300 fill-amber-300 drop-shadow-sm" />
                  ))}
                  <span className="text-[11px] font-mono text-amber-200 ml-1 font-bold">
                    5.0 Verified
                  </span>
                </div>

                {/* Verbatim Quote */}
                <p className="text-xs text-white/90 text-center leading-relaxed italic line-clamp-3 px-2">
                  &ldquo;Their local SEO strategy put us #1 across London for every high-value patient keyword. Inbound phone bookings jumped 280%. The weekly Slack updates and transparent Data Studio reporting are top notch.&rdquo;
                </p>

                {/* Client Profile */}
                <div className="flex items-center justify-between pt-3 border-t border-white/20">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-white/20 text-white font-bold text-xs flex items-center justify-center border border-white/30 shrink-0">
                      OT
                    </div>
                    <div className="text-left">
                      <h4 className="text-xs font-bold text-white leading-tight">Oliver Thorne</h4>
                      <p className="text-[10px] text-white/70">Marketing Director, Apex Dental (London, UK 🇬🇧)</p>
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenConsultation?.("Local SEO Call")}
                    className="px-3.5 py-1.5 rounded-full bg-white text-[#2d2d2d] text-xs font-semibold shadow-md hover:bg-white/90 transition-all cursor-pointer shrink-0"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </article>
          </div>

          {/* ============================================================== */}
          {/* CARD 3: CHLOE MARTINEZ (CARD--CONNECTIONS WITH CLOUDFRONT VIDEO + MAP) */}
          {/* ============================================================== */}
          <div
            className={`transition-all duration-300 ${
              filter === "uk" ? "opacity-30 scale-[0.98] pointer-events-none" : "opacity-100 scale-100"
            }`}
          >
            <article
              className="motionsite-card relative overflow-hidden flex flex-col justify-between p-6 sm:p-7 text-white select-none"
              style={{
                background: `radial-gradient(ellipse 54% 14% at 56% 0%, rgba(255,206,190,.16), transparent 76%),
                             linear-gradient(177deg, #d84736 0%, #dd523c 24%, #e8703d 52%, #de5641 78%, #d34239 100%)`,
              }}
            >
              {/* Mandatory Looping CloudFront Video */}
              <video
                className="absolute inset-0 w-full h-full object-fill z-0 pointer-events-none"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden="true"
                poster="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/da8d0242-4dee-4f6d-813f-a5887e86ad77.png"
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_130103_7550f407-f14b-40a6-9616-7a26d7a8bd9f.mp4"
              />

              <svg className="absolute inset-0 w-full h-full opacity-55 mix-blend-soft-light z-1 pointer-events-none" viewBox="0 0 429 554" preserveAspectRatio="none">
                <rect width="100%" height="100%" filter="url(#msCardNoise)" />
              </svg>

              {/* Connections Circuit Map Overlay */}
              <div className="absolute inset-x-0 top-[22%] h-[40%] z-2 pointer-events-none opacity-80">
                <svg className="w-full h-full" viewBox="0 0 429 238" preserveAspectRatio="none">
                  <path d="M0 5H128c27 0 36 7 39 26 2 16 9 22 24 22h106c16 0 23-8 25-25 2-16 10-23 31-23h76" fill="none" stroke="#fff" strokeWidth="1" strokeOpacity=".25" />
                  <path d="M0 117h46c15 0 22 8 26 25 5 23 12 31 31 31h174c18 0 25-8 30-31 4-17 11-25 26-25h96" fill="none" stroke="#fff" strokeWidth="1" strokeOpacity=".35" />
                  <path d="M0 61h95c14 0 22-6 27-20 4-13 12-20 27-20h115c15 0 23 6 27 20 5 14 13 20 28 20h110" fill="none" stroke="#fff8dd" strokeWidth="1.15" strokeOpacity=".6" />
                  <path d="M0 117h88c15 0 22-8 25-25 4-24 12-31 31-31h129c20 0 27 7 31 31 3 17 10 25 26 25h99" fill="none" stroke="#fff8dd" strokeWidth="1.15" strokeOpacity=".94" />
                  <circle cx="45" cy="117" r="6" fill="#fff" />
                  <circle cx="133" cy="61" r="6" fill="#fff4a7" />
                  <circle cx="189" cy="61" r="6" fill="#fff1a4" />
                  <circle cx="319" cy="61" r="6" fill="#fff4a6" />
                  <circle cx="319" cy="117" r="6" fill="#fff2a0" />
                </svg>
              </div>

              {/* Card Top Title */}
              <div className="relative z-10 text-center space-y-1">
                <h3 className="text-base sm:text-lg font-semibold tracking-tight text-white leading-snug drop-shadow-sm">
                  Intelligent Connections &bull; Speed<br />
                  <span className="text-xs font-normal text-white/80">Cross-Source Context &bull; Next.js 15</span>
                </h3>
              </div>

              {/* Metric Row: LED Dot Number + Unit */}
              <div className="relative z-10 flex items-baseline justify-center gap-1.5 my-auto pt-6">
                <div className="w-[65px]">
                  <DotNumberSVG text="98" dotRadius={1.7} pitchX={5} />
                </div>
                <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  PageSpeed
                </span>
              </div>

              {/* Exact Testimonial Details */}
              <div className="relative z-10 space-y-3 pt-2">
                {/* 5-Star Rating */}
                <div className="flex items-center justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-amber-300 fill-amber-300 drop-shadow-sm" />
                  ))}
                  <span className="text-[11px] font-mono text-amber-200 ml-1 font-bold">
                    5.0 Verified
                  </span>
                </div>

                {/* Verbatim Quote */}
                <p className="text-xs text-white/90 text-center leading-relaxed italic line-clamp-3 px-2">
                  &ldquo;The Next.js rebuild cut our load time from 4.2s down to 0.8s. All Google Core Web Vitals are green (100/100). They think like genuine growth partners, not just developers. Demo bookings surged 420%.&rdquo;
                </p>

                {/* Client Profile */}
                <div className="flex items-center justify-between pt-3 border-t border-white/20">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-white/20 text-white font-bold text-xs flex items-center justify-center border border-white/30 shrink-0">
                      CM
                    </div>
                    <div className="text-left">
                      <h4 className="text-xs font-bold text-white leading-tight">Chloe Martinez</h4>
                      <p className="text-[10px] text-white/70">Co-Founder, CloudSync SaaS (Austin, USA 🇺🇸)</p>
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenConsultation?.("Performance Rebuild Call")}
                    className="px-3.5 py-1.5 rounded-full bg-white text-[#2d2d2d] text-xs font-semibold shadow-md hover:bg-white/90 transition-all cursor-pointer shrink-0"
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
