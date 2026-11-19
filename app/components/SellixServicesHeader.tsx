"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowDown, CreditCard, CheckCircle2 } from "lucide-react";

const GLOBAL_COUNTRIES = [
  { code: "US", name: "United States", flag: "🇺🇸", city: "New York • SF", pos: "top-[14%] left-[4%] sm:left-[8%]" },
  { code: "UK", name: "United Kingdom", flag: "🇬🇧", city: "London", pos: "top-[18%] right-[4%] sm:right-[10%]" },
  { code: "CA", name: "Canada", flag: "🇨🇦", city: "Toronto • Vancouver", pos: "bottom-[24%] left-[4%] sm:left-[8%]" },
  { code: "EU", name: "Germany & EU", flag: "🇪🇺", city: "Berlin • Zurich", pos: "bottom-[20%] right-[4%] sm:right-[10%]" },
  { code: "AU", name: "Australia", flag: "🇦🇺", city: "Sydney • Melbourne", pos: "top-[46%] left-[2%] sm:left-[5%]" },
  { code: "AE", name: "UAE & Gulf", flag: "🇦🇪", city: "Dubai • Abu Dhabi", pos: "top-[44%] right-[2%] sm:right-[6%]" },
  { code: "IN", name: "India HQ", flag: "🇮🇳", city: "Global Delivery", pos: "bottom-[6%] left-1/2 -translate-x-1/2" },
];

export default function SellixServicesHeader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let rotation = 0;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);
      rotation += 0.003;

      // Subtle warm amber ambient ring
      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.42;

      const grad = ctx.createRadialGradient(cx, cy, radius * 0.7, cx, cy, radius * 1.2);
      grad.addColorStop(0, "rgba(245, 158, 11, 0.08)");
      grad.addColorStop(0.6, "rgba(251, 191, 36, 0.04)");
      grad.addColorStop(1, "transparent");

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.2, 0, Math.PI * 2);
      ctx.fill();

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="relative w-full min-h-[600px] pt-32 pb-16 sm:pt-36 sm:pb-20 px-4 sm:px-6 md:px-12 flex flex-col items-center justify-center text-center overflow-hidden bg-gradient-to-b from-[#fdfbf7] via-[#fffdfa] to-white border-b border-amber-200/80 select-none">
      
      {/* Canvas Ambient Glow */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Floating Global Network Badges (Luxury White & Gold) */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden hidden sm:block">
        {GLOBAL_COUNTRIES.map((country, idx) => (
          <div
            key={country.code}
            className={`absolute ${country.pos} flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-amber-200/80 shadow-md shadow-amber-900/5 backdrop-blur-md transition-all`}
          >
            <span className="text-base">{country.flag}</span>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 leading-tight">
                {country.name}
              </span>
              <span className="text-xs text-amber-600 font-semibold leading-tight">
                {country.city}
              </span>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
          </div>
        ))}
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
        {/* Category Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-bold uppercase tracking-wider mb-5 backdrop-blur-md shadow-xs">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span>Global Cross-Border Digital Services Directory</span>
        </div>

        {/* Master Heading */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-950 leading-[1.12] max-w-3xl mx-auto mb-4">
          Balaji Prime{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600">
            Media Services
          </span>
        </h1>

        {/* Descriptive Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto mt-2 leading-relaxed font-normal px-2">
          Full-funnel digital growth, enterprise web engineering, high-DA editorial link building, and algorithmic search optimization serving clients across the US, UK, Europe, Australia, and worldwide.
        </p>

        {/* Dual Primary Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-md px-2">
          <a
            href="#services-grid"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-bold text-sm px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-yellow-500 text-white shadow-lg shadow-amber-900/15 hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          >
            <span>Explore Services Directory</span>
            <ArrowDown className="w-4 h-4" />
          </a>

          <a
            href="#payment-portal"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-bold text-sm px-6 py-3.5 rounded-full bg-white hover:bg-amber-50/50 text-slate-800 border border-slate-200 hover:border-amber-400 shadow-sm transition-all cursor-pointer whitespace-nowrap"
          >
            <CreditCard className="w-4 h-4 text-amber-600" />
            <span>Client Payment Portal</span>
          </a>
        </div>

        {/* Trust Badges */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-600">
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Escrow Milestone Protection</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Multi-Currency Domestic Settlements</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Guaranteed Production Deliverables</span>
          </span>
        </div>
      </div>
    </section>
  );
}
