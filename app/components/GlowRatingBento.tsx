"use client";

import React, { useState, useRef, MouseEvent } from "react";
import {
  Star,
  Globe,
  Eye,
  Activity,
  Zap,
  TrendingUp,
  Gauge,
  Sparkles,
  ShieldCheck,
  Check,
  Copy,
  ArrowUpRight,
  ChevronDown,
  Terminal,
} from "lucide-react";

interface GlowRatingBentoProps {
  onOpenConsultation?: (service?: string) => void;
}

// Interactive 3D Tilt Card with dynamic specular glare & perspective
function Card3D({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -9;
    const rotateY = ((x - centerX) / centerX) * 9;

    setRotate({ x: rotateX, y: rotateY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.18,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
    setIsHovered(false);
  };

  return (
    <div
      style={{ perspective: "1000px" }}
      className="h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <div
        ref={cardRef}
        style={{
          transform: isHovered
            ? `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateZ(14px)`
            : "rotateX(0deg) rotateY(0deg) translateZ(0px)",
          transition: isHovered
            ? "transform 0.15s ease-out"
            : "transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)",
          transformStyle: "preserve-3d",
        }}
        className={`relative h-full rounded-[28px] p-[1px] transition-shadow duration-500 ${
          isHovered
            ? "shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95),0_0_45px_rgba(56,189,248,0.22)]"
            : "shadow-[0_15px_35px_-10px_rgba(0,0,0,0.85)]"
        } ${className}`}
      >
        {/* Subtle gradient border */}
        <div
          className="absolute inset-0 rounded-[28px] transition-opacity duration-500 pointer-events-none"
          style={{
            background: isHovered
              ? "linear-gradient(135deg, rgba(255,255,255,0.28) 0%, rgba(56,189,248,0.35) 50%, rgba(168,85,247,0.25) 100%)"
              : "linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.02) 100%)",
          }}
        />

        {/* Inner Card Container */}
        <div className="relative h-full w-full rounded-[27px] bg-[#05070E] overflow-hidden flex flex-col justify-between border border-white/[0.06]">
          {/* Dynamic Specular Glare Reflection */}
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-30"
            style={{
              opacity: glare.opacity,
              background: `radial-gradient(circle 380px at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.25), transparent 70%)`,
            }}
          />

          {children}
        </div>
      </div>
    </div>
  );
}

export default function GlowRatingBento({ onOpenConsultation }: GlowRatingBentoProps) {
  const [filter, setFilter] = useState<"all" | "usa" | "uk">("all");
  const [activeCodeTab, setActiveCodeTab] = useState<"growth" | "vitals" | "schema">("growth");
  const [copiedCode, setCopiedCode] = useState(false);
  const [showCodeHUD, setShowCodeHUD] = useState(false);

  const codeSnippets = {
    growth: `// next.config.ts - Turbocharged High-Intent Organic Pipeline
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  headers: async () => [
    {
      source: "/:all*(svg|jpg|png|webp|avif)",
      headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
    },
  ],
};

export default nextConfig;`,
    vitals: `// lib/performance.ts - Google Core Web Vitals (Target: 100/100)
export function reportCoreWebVitals(metric: any) {
  // Real-world performance results:
  // LCP: 0.8s (Baseline 4.2s -> 10x faster)
  // FID: 8ms  (Industry best < 100ms)
  // CLS: 0.00 (Zero layout shifts)
  if (metric.label === "web-vital") {
    navigator.sendBeacon("/api/analytics/vitals", JSON.stringify(metric));
  }
}`,
    schema: `// SEO Schema - 5-Star Verified Aggregate Rating
{
  "@context": "https://schema.org",
  "@type": "AggregateRating",
  "ratingValue": "4.9",
  "reviewCount": "158",
  "bestRating": "5",
  "itemReviewed": {
    "@type": "Service",
    "name": "High-Intent SEO & Next.js Development",
    "provider": "Balaji Prime Media"
  }
}`,
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippets[activeCodeTab]);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section className="relative w-full bg-[#03050c] text-white py-16 sm:py-24 overflow-hidden border-y border-white/[0.08]">
      {/* INLINE CSS KEYFRAME ANIMATIONS FOR ULTRA-SMOOTH 60FPS MOVING 3D ELEMENTS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes floatSlow1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(0.5deg); }
        }
        @keyframes floatSlow2 {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-6px) scale(1.02); }
        }
        @keyframes floatSlow3 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        @keyframes atmosphericPulse {
          0%, 100% { transform: scale(1) translateY(0px); opacity: 0.9; }
          50% { transform: scale(1.06) translateY(-4px); opacity: 1; }
        }
        @keyframes auroralGaze {
          0% { filter: hue-rotate(0deg) brightness(1); }
          50% { filter: hue-rotate(25deg) brightness(1.2); }
          100% { filter: hue-rotate(0deg) brightness(1); }
        }
        @keyframes radarSweep {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes planetFloat {
          0%, 100% { transform: scale(1) translateY(0px); }
          50% { transform: scale(1.03) translateY(-4px); }
        }
        @keyframes orbitDrift1 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(-4px, -6px) scale(1.04); }
          66% { transform: translate(4px, -3px) scale(0.97); }
        }
        @keyframes orbitDrift2 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(5px, 4px) scale(0.98); }
          66% { transform: translate(-3px, -5px) scale(1.03); }
        }
        @keyframes orbitDrift3 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(0px, -6px) scale(1.04); }
        }
        @keyframes moltenNebula {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes scanLaser {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes pulseGlowRing {
          0%, 100% { box-shadow: 0 0 15px rgba(251,146,60,0.3); }
          50% { box-shadow: 0 0 30px rgba(251,146,60,0.7); }
        }
        @keyframes ecgPulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          15% { transform: scale(1.25); opacity: 1; }
          30% { transform: scale(1); opacity: 0.8; }
          45% { transform: scale(1.15); opacity: 0.95; }
        }
        @keyframes stardustFloat {
          0% { transform: translateY(0px) opacity(0.3); }
          50% { opacity: 0.8; }
          100% { transform: translateY(-40px) opacity(0); }
        }
      `}} />

      {/* Deep Space Ambient Glow Backdrops */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[950px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.12)_0%,rgba(99,102,241,0.08)_45%,transparent_75%)] blur-3xl -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-10 w-[600px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.11)_0%,transparent_70%)] blur-3xl -z-10"
        aria-hidden="true"
      />

      {/* Subtle Space Particle Dots Pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* SECTION HEADER (EXACT DETAILS PRESERVED) */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-xs font-semibold text-amber-200 mb-4 backdrop-blur-md shadow-[0_0_20px_rgba(251,191,36,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>⭐️ Verified Pilot Case Studies &amp; Client Feedback</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Trusted by Ambitious Global Founders
          </h2>
          <p className="text-[15px] sm:text-base text-slate-400 mt-3 max-w-2xl mx-auto leading-relaxed">
            See how our high-intent SEO and Next.js development deliver real organic revenue across the US, UK, and Europe.
          </p>

          {/* Region Filter Buttons */}
          <div className="inline-flex items-center gap-1.5 p-1 mt-6 rounded-full bg-[#0a0f1d]/90 border border-white/10 backdrop-blur-xl shadow-lg">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                filter === "all"
                  ? "bg-white text-slate-950 shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              All Case Studies
            </button>
            <button
              onClick={() => setFilter("usa")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                filter === "usa"
                  ? "bg-white text-slate-950 shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              USA Founders 🇺🇸
            </button>
            <button
              onClick={() => setFilter("uk")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                filter === "uk"
                  ? "bg-white text-slate-950 shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              UK Founders 🇬🇧
            </button>
          </div>
        </div>

        {/* 3D TESTIMONIAL CARDS WITH ANIMATED MOVING INTERNAL 3D ELEMENTS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {/* ================================================================ */}
          {/* CARD 1: DAVID HENDERSON (+340% REVENUE) */}
          {/* MOVING 3D: LIVING ATMOSPHERIC HORIZON, FLOATING PILLS, STARDUST */}
          {/* ================================================================ */}
          <div
            className={`transition-all duration-300 h-full ${
              filter === "uk" ? "opacity-30 scale-[0.98] pointer-events-none" : "opacity-100 scale-100"
            }`}
          >
            <Card3D className="h-full">
              <div className="relative flex flex-col justify-between h-full p-6 sm:p-7 overflow-hidden min-h-[590px]">
                {/* TOP HEADER ROW: ANIMATED ROTATING GLOBE ICON & REGION PILLS */}
                <div className="relative z-20 flex items-center justify-between">
                  <div className="w-8 h-8 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-slate-300 backdrop-blur-md group-hover:border-cyan-400/40 transition-colors">
                    <Globe className="w-4 h-4 text-slate-300 animate-[spin_20s_linear_infinite]" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-medium text-slate-300 bg-white/[0.06] border border-white/10 px-2.5 py-1 rounded-full backdrop-blur-md hover:border-cyan-400/40 transition-colors">
                      us-east-1
                    </span>
                    <span className="text-[11px] font-mono font-medium text-slate-300 bg-white/[0.06] border border-white/10 px-2.5 py-1 rounded-full backdrop-blur-md hover:border-cyan-400/40 transition-colors">
                      eu-west-2
                    </span>
                  </div>
                </div>

                {/* 3D CENTERPIECE: LIVING PLANETARY ATMOSPHERE WITH ACTIVE MOVING HORIZON */}
                <div className="relative my-7 py-8 flex flex-col items-center justify-center">
                  <div className="relative w-full h-48 sm:h-52 overflow-hidden rounded-2xl flex items-center justify-center">
                    {/* Deep Cosmic Background with shifting atmospheric auroral light */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: "radial-gradient(circle at 50% 120%, #0284c7 0%, #1e1b4b 45%, #05070e 85%)",
                        animation: "auroralGaze 12s ease-in-out infinite",
                      }}
                    />

                    {/* Animated Pulsing Planet Horizon Arc */}
                    <div
                      className="absolute -bottom-24 w-[160%] h-56 rounded-[100%] pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(ellipse at 50% 0%, #38bdf8 0%, #0284c7 35%, #0f766e 70%, transparent 100%)",
                        boxShadow:
                          "0 -18px 45px rgba(56, 189, 248, 0.55), 0 -4px 15px rgba(255, 255, 255, 0.7)",
                        filter: "blur(1px)",
                        animation: "atmosphericPulse 6s ease-in-out infinite",
                      }}
                    />

                    {/* Floating Atmospheric Wave 2 (Secondary Shimmer Layer) */}
                    <div
                      className="absolute -bottom-20 w-[140%] h-48 rounded-[100%] pointer-events-none opacity-40"
                      style={{
                        background:
                          "radial-gradient(ellipse at 50% 0%, #a855f7 0%, #06b6d4 50%, transparent 80%)",
                        animation: "atmosphericPulse 8s ease-in-out infinite reverse",
                      }}
                    />

                    {/* Floating Ambient Stardust Particles */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      <span
                        className="absolute w-1 h-1 rounded-full bg-cyan-200/80"
                        style={{ left: "25%", bottom: "25%", animation: "stardustFloat 4s ease-in-out infinite" }}
                      />
                      <span
                        className="absolute w-1.5 h-1.5 rounded-full bg-white/70"
                        style={{ left: "70%", bottom: "35%", animation: "stardustFloat 5s ease-in-out infinite 1s" }}
                      />
                      <span
                        className="absolute w-1 h-1 rounded-full bg-cyan-300/80"
                        style={{ left: "50%", bottom: "15%", animation: "stardustFloat 4.5s ease-in-out infinite 2s" }}
                      />
                    </div>

                    {/* Center Floating Glass Pill: Streaming Live (CONTINUOUS LEVITATING FLOAT) */}
                    <div
                      className="relative z-10 flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/75 border border-white/20 backdrop-blur-xl shadow-[0_0_25px_rgba(56,189,248,0.4)]"
                      style={{ animation: "floatSlow1 4.5s ease-in-out infinite" }}
                    >
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                      </span>
                      <span className="text-xs font-mono font-semibold text-slate-100 tracking-wide">
                        Streaming live
                      </span>
                    </div>

                    {/* Lower Floating Metric Pill (SUBTLE LEVITATING MOTION) */}
                    <div
                      className="absolute bottom-3 left-3 z-10"
                      style={{ animation: "floatSlow3 5s ease-in-out infinite 0.6s" }}
                    >
                      <span className="text-[10px] font-mono text-cyan-200 bg-cyan-950/75 border border-cyan-400/35 px-2.5 py-0.5 rounded-full backdrop-blur-md shadow-md">
                        +23 regions
                      </span>
                    </div>

                    {/* Growth Revenue Badge (FLOATING + GLOW PULSE) */}
                    <div
                      className="absolute top-3 right-3 z-10"
                      style={{ animation: "floatSlow2 4s ease-in-out infinite 1s" }}
                    >
                      <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-500/20 border border-amber-400/40 px-2.5 py-0.5 rounded-full backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.35)]">
                        <TrendingUp className="w-3 h-3 inline mr-1 text-amber-400" />
                        +340% Revenue
                      </span>
                    </div>
                  </div>
                </div>

                {/* BOTTOM EDITORIAL CONTENT & EXACT TESTIMONIAL DETAILS */}
                <div className="relative z-20 space-y-4 pt-2">
                  <h3 className="font-serif text-xl sm:text-2xl text-slate-100 font-normal tracking-tight leading-snug">
                    The real-time engine for planetary-scale data.
                  </h3>

                  {/* Star Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 text-amber-400 fill-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]"
                      />
                    ))}
                    <span className="ml-1.5 text-[11px] font-mono font-semibold text-amber-300/90">
                      5.0 Verified Review
                    </span>
                  </div>

                  {/* Exact Testimonial Quote */}
                  <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed italic border-l-2 border-cyan-500/40 pl-3">
                    &ldquo;Balaji Prime Media completely transformed our organic pipeline. In 4 months, our US search traffic grew significantly, and organic revenue eclipsed our paid Facebook ad spend. Outstanding communication across EST hours.&rdquo;
                  </p>

                  {/* Exact Client Details */}
                  <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-950 to-slate-900 text-cyan-400 border border-cyan-400/40 font-bold text-xs flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(56,189,248,0.25)]">
                      DH
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white tracking-wide">David Henderson</h4>
                      <p className="text-[11px] text-slate-400">Founder &amp; CEO, Luxe Apparel (Los Angeles, USA 🇺🇸)</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card3D>
          </div>

          {/* ================================================================ */}
          {/* CARD 2: OLIVER THORNE (#1 GOOGLE MAP PACK) */}
          {/* MOVING 3D: ROTATING 360 RADAR BEAM, ROTATING ORBITS, DRIFTING SATELLITES */}
          {/* ================================================================ */}
          <div
            className={`transition-all duration-300 h-full ${
              filter === "usa" ? "opacity-30 scale-[0.98] pointer-events-none" : "opacity-100 scale-100"
            }`}
          >
            <Card3D className="h-full">
              <div className="relative flex flex-col justify-between h-full p-6 sm:p-7 overflow-hidden min-h-[590px]">
                {/* TOP HEADER ROW: EYE ICON & BRAND TAG */}
                <div className="relative z-20 flex items-center justify-between">
                  <div className="w-8 h-8 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-slate-300 backdrop-blur-md">
                    <Eye className="w-4 h-4 text-slate-300" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-cyan-300/80 bg-cyan-950/40 border border-cyan-400/20 px-2.5 py-1 rounded-full backdrop-blur-md">
                      vela.io
                    </span>
                    <span className="text-[11px] font-mono font-bold text-emerald-300 bg-emerald-500/15 border border-emerald-400/40 px-2.5 py-1 rounded-full backdrop-blur-md shadow-[0_0_12px_rgba(16,185,129,0.25)]">
                      #1 Google Map Pack
                    </span>
                  </div>
                </div>

                {/* 3D CENTERPIECE: CELESTIAL SPHERE WITH RADAR SWEEP & MOVING SATELLITES */}
                <div className="relative my-7 py-6 flex items-center justify-center">
                  <div className="relative w-56 h-56 sm:w-60 sm:h-60 flex items-center justify-center">
                    {/* Concentric Dashed Orbital Ring 1 (CONTINUOUS SLOW ROTATION) */}
                    <div
                      className="absolute inset-0 rounded-full border border-dashed border-white/20 pointer-events-none"
                      style={{
                        transform: "rotateX(68deg) rotateY(15deg)",
                        animation: "spin 35s linear infinite",
                      }}
                    />

                    {/* Concentric Dashed Orbital Ring 2 (COUNTER-ROTATION) */}
                    <div
                      className="absolute w-64 h-64 -inset-2 rounded-full border border-dashed border-cyan-400/25 pointer-events-none"
                      style={{
                        transform: "rotateX(74deg) rotateY(-20deg)",
                        animation: "spin 25s linear infinite reverse",
                      }}
                    />

                    {/* 360-DEGREE ROTATING RADAR OBSERVABILITY SWEEP BEAM */}
                    <div
                      className="absolute w-44 h-44 rounded-full pointer-events-none z-15 overflow-hidden"
                      style={{
                        animation: "radarSweep 6s linear infinite",
                      }}
                    >
                      <div
                        className="w-full h-full"
                        style={{
                          background:
                            "conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(16,185,129,0.18) 350deg, rgba(52,211,153,0.5) 360deg)",
                        }}
                      />
                    </div>

                    {/* 3D ILLUMINATED PLANET SPHERE (SMOOTH FLOATING BREATHING MOTION) */}
                    <div
                      className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full z-10 transition-transform duration-700"
                      style={{
                        background:
                          "radial-gradient(circle at 35% 32%, #10b981 0%, #059669 22%, #047857 45%, #064e3b 70%, #022c22 92%, #011812 100%)",
                        boxShadow:
                          "inset -15px -15px 30px rgba(0, 0, 0, 0.9), inset 8px 8px 18px rgba(110, 231, 183, 0.65), 0 0 50px rgba(16, 185, 129, 0.4)",
                        animation: "planetFloat 6s ease-in-out infinite",
                      }}
                    >
                      {/* Atmospheric Surface Sheen */}
                      <div
                        className="absolute inset-0 rounded-full opacity-60"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, rgba(0,0,0,0.8) 100%)",
                        }}
                      />
                    </div>

                    {/* MOVING ORBITAL SATELLITE METRIC PILL 1 (TOP RIGHT ORBIT DRIFT) */}
                    <div
                      className="absolute top-2 right-0 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/85 border border-white/20 backdrop-blur-xl shadow-lg"
                      style={{ animation: "orbitDrift1 5s ease-in-out infinite" }}
                    >
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                      </span>
                      <span className="text-[10px] font-mono text-slate-100">
                        41 ms &bull; p99
                      </span>
                    </div>

                    {/* MOVING ORBITAL SATELLITE METRIC PILL 2 (LEFT MID ORBIT DRIFT) */}
                    <div
                      className="absolute top-1/2 -left-2 -translate-y-1/2 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/85 border border-white/20 backdrop-blur-xl shadow-lg"
                      style={{ animation: "orbitDrift2 6s ease-in-out infinite 0.8s" }}
                    >
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                      </span>
                      <span className="text-[10px] font-mono text-slate-100">
                        0.00 % err
                      </span>
                    </div>

                    {/* MOVING ORBITAL SATELLITE METRIC PILL 3 (BOTTOM CENTER ORBIT DRIFT) */}
                    <div
                      className="absolute -bottom-1 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/85 border border-white/20 backdrop-blur-xl shadow-lg"
                      style={{ animation: "orbitDrift3 4.5s ease-in-out infinite 1.4s" }}
                    >
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400 shadow-[0_0_8px_#60a5fa]" />
                      </span>
                      <span className="text-[10px] font-mono text-slate-100">
                        123 K req/s
                      </span>
                    </div>
                  </div>
                </div>

                {/* BOTTOM EDITORIAL CONTENT & EXACT TESTIMONIAL DETAILS */}
                <div className="relative z-20 space-y-4 pt-2">
                  <h3 className="font-serif text-xl sm:text-2xl text-slate-100 font-normal tracking-tight leading-snug">
                    Real-time observability across every service you run.
                  </h3>

                  {/* Star Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 text-amber-400 fill-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]"
                      />
                    ))}
                    <span className="ml-1.5 text-[11px] font-mono font-semibold text-amber-300/90">
                      5.0 Verified Review
                    </span>
                  </div>

                  {/* Exact Testimonial Quote */}
                  <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed italic border-l-2 border-emerald-500/40 pl-3">
                    &ldquo;Their local SEO strategy put us #1 across London for every high-value patient keyword. Inbound phone bookings jumped 280%. The weekly Slack updates and transparent Data Studio reporting are top notch.&rdquo;
                  </p>

                  {/* Exact Client Details */}
                  <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-950 to-slate-900 text-emerald-400 border border-emerald-400/40 font-bold text-xs flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(16,185,129,0.25)]">
                      OT
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white tracking-wide">Oliver Thorne</h4>
                      <p className="text-[11px] text-slate-400">Marketing Director, Apex Dental Group (London, UK 🇬🇧)</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card3D>
          </div>

          {/* ================================================================ */}
          {/* CARD 3: CHLOE MARTINEZ (98 PAGESPEED) */}
          {/* MOVING 3D: FLUID MOLTEN NEBULA WAVE, ACTIVE SCANNING LASERS, PULSE */}
          {/* ================================================================ */}
          <div
            className={`transition-all duration-300 h-full ${
              filter === "uk" ? "opacity-30 scale-[0.98] pointer-events-none" : "opacity-100 scale-100"
            }`}
          >
            <Card3D className="h-full">
              <div className="relative flex flex-col justify-between h-full p-6 sm:p-7 overflow-hidden min-h-[590px]">
                {/* TOP HEADER ROW: PULSING ACTIVITY ICON & SPEED BADGE */}
                <div className="relative z-20 flex items-center justify-between">
                  <div className="w-8 h-8 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-slate-300 backdrop-blur-md">
                    <Activity
                      className="w-4 h-4 text-orange-400"
                      style={{ animation: "ecgPulse 2.5s ease-in-out infinite" }}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-purple-300/80 bg-purple-950/40 border border-purple-400/20 px-2.5 py-1 rounded-full backdrop-blur-md">
                      CloudSync SaaS
                    </span>
                    <span className="text-[11px] font-mono font-bold text-amber-300 bg-amber-500/15 border border-amber-400/40 px-2.5 py-1 rounded-full backdrop-blur-md shadow-[0_0_12px_rgba(245,158,11,0.25)]">
                      <Gauge className="w-3 h-3 inline mr-1 text-amber-400" />
                      98 PageSpeed
                    </span>
                  </div>
                </div>

                {/* 3D CENTERPIECE: FLUID MOLTEN NEBULA BAND & ACTIVE TELEMETRY SCANNERS */}
                <div className="relative my-7 py-7 flex flex-col items-center justify-center">
                  <div className="relative w-full py-7 px-3 rounded-2xl overflow-hidden flex flex-col gap-3 justify-center">
                    {/* Continuous Fluid Molten Chromatic Nebula Wave */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(90deg, #1e1b4b 0%, #312e81 20%, #4338ca 40%, #7c2d12 65%, #ea580c 85%, #f97316 100%, #1e1b4b 120%)",
                        backgroundSize: "200% 200%",
                        animation: "moltenNebula 8s ease infinite",
                        opacity: 0.95,
                        filter: "blur(0.5px)",
                      }}
                    />

                    {/* Volumetric Radial Ambient Pulsing Glow behind Nebula */}
                    <div
                      className="absolute -inset-4 opacity-50 blur-xl pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(circle at 80% 50%, #f97316 0%, #6366f1 50%, transparent 80%)",
                        animation: "pulseGlowRing 4s ease-in-out infinite",
                      }}
                    />

                    {/* Floating Glass Telemetry Bar 1: Retraining model with active laser scan */}
                    <div className="relative z-10 overflow-hidden flex items-center justify-between px-3.5 py-2 rounded-xl bg-black/45 border border-white/15 backdrop-blur-xl">
                      {/* Active Horizontal Scanning Laser Beam */}
                      <div
                        className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-orange-400/30 to-transparent pointer-events-none"
                        style={{ animation: "scanLaser 3s ease-in-out infinite" }}
                      />

                      <div className="flex items-center gap-2 text-xs font-mono text-slate-100">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-400 shadow-[0_0_8px_#fb923c]" />
                        </span>
                        <span>Retraining model</span>
                      </div>
                      <span className="text-[11px] font-mono text-purple-200 bg-purple-900/70 border border-purple-400/40 px-2 py-0.5 rounded-md shadow-sm">
                        working
                      </span>
                    </div>

                    {/* Floating Glass Telemetry Bar 2: Anomaly guard with active radar laser */}
                    <div className="relative z-10 overflow-hidden flex items-center justify-between px-3.5 py-2 rounded-xl bg-black/45 border border-white/15 backdrop-blur-xl">
                      {/* Active Horizontal Scanning Laser Beam */}
                      <div
                        className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent pointer-events-none"
                        style={{ animation: "scanLaser 3.5s ease-in-out infinite 1.2s" }}
                      />

                      <div className="flex items-center gap-2 text-xs font-mono text-slate-100">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                        </span>
                        <span>Anomaly guard</span>
                      </div>
                      <span className="text-[11px] font-mono text-emerald-200 bg-emerald-950/70 border border-emerald-400/40 px-2 py-0.5 rounded-md shadow-sm">
                        done
                      </span>
                    </div>

                    {/* Floating Mini Chips: Google Core Web Vitals */}
                    <div className="relative z-10 grid grid-cols-3 gap-1 pt-0.5 text-center font-mono text-[9px]">
                      <div className="bg-black/55 border border-white/15 text-emerald-300 py-1 rounded shadow-sm hover:border-emerald-400/50 transition-colors">
                        LCP: 0.8s
                      </div>
                      <div className="bg-black/55 border border-white/15 text-emerald-300 py-1 rounded shadow-sm hover:border-emerald-400/50 transition-colors">
                        FID: 8ms
                      </div>
                      <div className="bg-black/55 border border-white/15 text-emerald-300 py-1 rounded shadow-sm hover:border-emerald-400/50 transition-colors">
                        CLS: 0.00
                      </div>
                    </div>
                  </div>
                </div>

                {/* BOTTOM EDITORIAL CONTENT & EXACT TESTIMONIAL DETAILS */}
                <div className="relative z-20 space-y-4 pt-2">
                  <h3 className="font-serif text-3xl sm:text-4xl text-slate-100 font-bold tracking-tight">
                    Adaptive.
                  </h3>

                  {/* Star Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 text-amber-400 fill-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]"
                      />
                    ))}
                    <span className="ml-1.5 text-[11px] font-mono font-semibold text-amber-300/90">
                      5.0 Verified Review
                    </span>
                  </div>

                  {/* Exact Testimonial Quote */}
                  <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed italic border-l-2 border-orange-500/40 pl-3">
                    &ldquo;The Next.js rebuild cut our load time from 4.2s down to 0.8s. All Google Core Web Vitals are green (100/100). They think like genuine growth partners, not just developers. Demo bookings surged 420%.&rdquo;
                  </p>

                  {/* Exact Client Details */}
                  <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-950 to-slate-900 text-amber-400 border border-amber-400/40 font-bold text-xs flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(245,158,11,0.25)]">
                      CM
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white tracking-wide">Chloe Martinez</h4>
                      <p className="text-[11px] text-slate-400">Co-Founder, CloudSync SaaS (Austin, USA 🇺🇸)</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card3D>
          </div>
        </div>

        {/* EXPANDABLE VERIFIED PILOT CONSENSUS & CODE ENGINE (ALL FUNCTIONALITY PRESERVED) */}
        <div className="mt-10 sm:mt-12 rounded-3xl bg-[#060812]/90 border border-white/10 p-5 sm:p-7 backdrop-blur-2xl shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-300">
                <Terminal className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Verified Pilot Consensus Engine</span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/15 border border-emerald-400/30 px-2 py-0.5 rounded-full">
                    158 Verified Reviews
                  </span>
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Next.js 15 production architecture with 100% white-hat organic schema
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowCodeHUD(!showCodeHUD)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 transition-colors"
              >
                <span>{showCodeHUD ? "Hide Code Engine" : "Inspect Code Snippets"}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${
                    showCodeHUD ? "rotate-180" : ""
                  }`}
                />
              </button>

              <button
                onClick={() => onOpenConsultation?.("Next.js & SEO Audit")}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.35)] transition-all cursor-pointer group/btn"
              >
                <span>Schedule Free Strategy Call</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </button>
            </div>
          </div>

          {/* Collapsible Code Inspector */}
          {showCodeHUD && (
            <div className="mt-5 pt-5 border-t border-white/10 space-y-3 animate-in fade-in duration-300">
              {/* Tabs & Copy */}
              <div className="flex items-center justify-between pb-2">
                <div className="flex items-center gap-1.5 bg-black/50 p-1 rounded-lg border border-white/5">
                  <button
                    onClick={() => setActiveCodeTab("growth")}
                    className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                      activeCodeTab === "growth"
                        ? "bg-purple-600/40 text-purple-200 border border-purple-500/40"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    growth.config.ts
                  </button>
                  <button
                    onClick={() => setActiveCodeTab("vitals")}
                    className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                      activeCodeTab === "vitals"
                        ? "bg-cyan-600/40 text-cyan-200 border border-cyan-500/40"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    vitals.ts
                  </button>
                  <button
                    onClick={() => setActiveCodeTab("schema")}
                    className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                      activeCodeTab === "schema"
                        ? "bg-amber-600/40 text-amber-200 border border-amber-500/40"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    schema.json
                  </button>
                </div>

                <button
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-mono text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                  title="Copy code"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code Block */}
              <div className="rounded-xl bg-black/80 border border-white/10 p-4 font-mono text-xs overflow-x-auto text-slate-300">
                <pre className="leading-relaxed">
                  <code>{codeSnippets[activeCodeTab]}</code>
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
