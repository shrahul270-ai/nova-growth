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

      // Subtle violet ambient ring
      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.42;

      const grad = ctx.createRadialGradient(cx, cy, radius * 0.7, cx, cy, radius * 1.2);
      grad.addColorStop(0, "rgba(104, 31, 228, 0.12)");
      grad.addColorStop(0.6, "rgba(34, 0, 144, 0.05)");
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
    <section className="relative w-full min-h-[600px] pt-32 pb-16 sm:pt-40 sm:pb-24 px-4 sm:px-6 md:px-12 flex flex-col items-center justify-center text-center overflow-hidden bg-[#07030d] bg-grid-white-240 border-b border-white/10 select-none">
      
      {/* Canvas Ambient Glow */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Floating Global Network Badges (Modern Industrial Elegance) */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden hidden sm:block">
        {GLOBAL_COUNTRIES.map((country) => (
          <div
            key={country.code}
            className={`absolute ${country.pos} flex items-center gap-2 px-3 py-1.5 rounded-[4px] bg-[#0c0818]/90 border border-white/10 shadow-lg backdrop-blur-md transition-all`}
          >
            <span className="text-base">{country.flag}</span>
            <div className="flex flex-col text-left">
              <span className="text-[11px] font-bebas tracking-[0.14em] text-white uppercase leading-tight">
                {country.name}
              </span>
              <span className="text-[10px] text-[#681fe4] font-mono leading-tight">
                {country.city}
              </span>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-[#681fe4] animate-pulse ml-0.5" />
          </div>
        ))}
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
        {/* Category Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[4px] bg-white/5 border border-white/10 text-white/90 text-xs font-bebas tracking-[0.2em] uppercase mb-5 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#681fe4] animate-pulse" />
          <span>GLOBAL CROSS-BORDER DIGITAL SERVICES DIRECTORY</span>
        </div>

        {/* Master Heading */}
        <h1 className="font-bebas text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.16em] uppercase text-white leading-[0.92] max-w-4xl mx-auto mb-4">
          BALAJI PRIME{" "}
          <span className="text-[#681fe4]">
            MEDIA SERVICES
          </span>
        </h1>

        {/* Descriptive Subtitle */}
        <p className="font-satoshi text-sm sm:text-base md:text-lg text-neutral-300 max-w-2xl mx-auto mt-2 leading-relaxed font-normal px-2">
          Full-funnel digital growth, enterprise web engineering, high-DA editorial link building, and algorithmic search optimization serving clients across the US, UK, Europe, Australia, and worldwide.
        </p>

        {/* Dual Primary Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-md px-2">
          <a
            href="#services-grid"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-bebas text-sm sm:text-base tracking-[0.16em] px-7 py-3.5 rounded-[4px] bg-[#681fe4] hover:bg-[#5815cb] text-white shadow-[0_10px_25px_rgba(104,31,228,0.35)] transition-all cursor-pointer whitespace-nowrap uppercase"
          >
            <span>EXPLORE SERVICES DIRECTORY</span>
            <ArrowDown className="w-4 h-4" />
          </a>

          <a
            href="#payment-portal"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-bebas text-sm sm:text-base tracking-[0.16em] px-6 py-3.5 rounded-[4px] bg-white/5 hover:bg-white/10 text-white border border-white/15 transition-all cursor-pointer whitespace-nowrap uppercase"
          >
            <CreditCard className="w-4 h-4 text-[#681fe4]" />
            <span>CLIENT PAYMENT PORTAL</span>
          </a>
        </div>

        {/* Trust Badges */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs font-bebas tracking-[0.14em] text-neutral-400 uppercase">
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#681fe4]" />
            <span>Escrow Milestone Protection</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#681fe4]" />
            <span>Multi-Currency Domestic Settlements</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#681fe4]" />
            <span>Guaranteed Production Deliverables</span>
          </span>
        </div>
      </div>
    </section>
  );
}
