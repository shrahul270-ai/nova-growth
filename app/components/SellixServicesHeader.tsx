"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function SellixServicesHeader() {
  return (
    <section className="relative w-full min-h-[540px] sm:min-h-[600px] lg:min-h-[660px] pt-28 sm:pt-36 pb-14 sm:pb-20 px-4 sm:px-6 flex flex-col items-center justify-center text-center overflow-hidden bg-[#060B18] select-none">
      {/* ========================================================================= */}
      {/* 1. CINEMATIC 3D BACKGROUND (16:9 Realistic Visual with Slow Camera Drift) */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        {/* Cinematic Backdrop Image with subtle continuous camera drift */}
        <div
          className="relative w-full h-full will-change-transform"
          style={{
            animation: "cinematicDrift 28s ease-in-out infinite alternate",
          }}
        >
          <Image
            src="/images/services-hero-cinematic.jpg"
            alt="Cinematic 3D Service Constellation with glowing glass holo icons in modern agency environment"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-105 brightness-[0.78] contrast-[1.12]"
          />
        </div>

        {/* Cinematic Lens Flare & Volumetric Lighting Highlights (Deep Navy, Teal & Warm Amber) */}
        <div
          className="absolute -top-24 right-1/4 w-[420px] sm:w-[650px] h-[420px] sm:h-[650px] rounded-full pointer-events-none opacity-40 blur-[90px]"
          style={{
            background:
              "radial-gradient(circle, rgba(0, 240, 255, 0.3) 0%, rgba(14, 165, 233, 0.18) 40%, transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-10 right-10 w-[300px] sm:w-[480px] h-[300px] sm:h-[480px] rounded-full pointer-events-none opacity-30 blur-[80px]"
          style={{
            background:
              "radial-gradient(circle, rgba(245, 158, 11, 0.35) 0%, rgba(217, 119, 6, 0.15) 45%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        {/* Negative Space Vignette: Left & Center darkening for flawless text legibility */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#060B18]/95 via-[#060B18]/75 to-transparent pointer-events-none z-10"
          aria-hidden="true"
        />
        <div
          className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#060B18] via-[#060B18]/80 to-transparent pointer-events-none z-10"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#09080E] to-transparent pointer-events-none z-10"
          aria-hidden="true"
        />
      </div>

      {/* ========================================================================= */}
      {/* 2. SUBTLE PULSING CYBERNETIC DATA PARTICLES & GLOWING PATHWAYS OVERLAY   */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none z-15 overflow-hidden">
        {/* Soft floating cyan & amber light trails in center-right */}
        <div className="hidden md:block absolute right-[15%] top-[28%] w-2 h-2 rounded-full bg-[#00f0ff] shadow-[0_0_14px_#00f0ff] animate-ping" />
        <div className="hidden md:block absolute right-[28%] top-[42%] w-1.5 h-1.5 rounded-full bg-[#f59e0b] shadow-[0_0_12px_#f59e0b] animate-pulse" />
        <div className="hidden lg:block absolute right-[22%] top-[60%] w-2 h-2 rounded-full bg-[#38bdf8] shadow-[0_0_16px_#38bdf8] animate-ping" style={{ animationDuration: "3s" }} />
      </div>

      {/* ========================================================================= */}
      {/* 3. HERO CONTENT CONTAINER (EXACT HEADLINE, SUBTITLE & CTAS PRESERVED)      */}
      {/* ========================================================================= */}
      <div className="relative z-20 w-full max-w-4xl mx-auto flex flex-col items-center">
        {/* Subtle Category Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.06] border border-[#38bdf8]/35 text-[#38bdf8] text-xs font-semibold mb-4 sm:mb-5 backdrop-blur-xs shadow-inner">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse" />
          <span>Full-Stack Agency Directory</span>
        </div>

        {/* Master Heading: Balaji Prime Media Services (Untouched) */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[68px] font-extrabold tracking-tight text-white leading-[1.12] max-w-3xl mx-auto drop-shadow-sm">
          <span>Balaji Prime </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#38bdf8] via-[#a855f7] to-[#fcd34d]">
            Media Services
          </span>
        </h1>

        {/* Descriptive Subtitle (Untouched) */}
        <p className="text-sm sm:text-base md:text-lg text-white/85 max-w-2xl mx-auto mt-4 sm:mt-5 leading-relaxed font-normal px-2">
          Full-funnel digital growth, enterprise web engineering, high-DA backlink
          acquisitions, and algorithmic search optimization for ambitious global brands.
        </p>

        {/* Action CTAs: Tap-friendly & Responsive (Untouched) */}
        <div className="mt-7 sm:mt-9 flex flex-col min-[440px]:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md px-4">
          <a
            href="#services-grid"
            className="w-full min-[440px]:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white text-[#060B18] font-bold text-xs sm:text-sm hover:bg-slate-100 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-cyan-950/60 cursor-pointer"
          >
            <span>Explore 12 Services</span>
            <svg
              className="w-3.5 h-3.5 text-black"
              viewBox="0 0 12 10"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M0.8 5h10M7.1 1.4 10.9 5l-3.8 3.6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          <Link
            href="/contact"
            className="w-full min-[440px]:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-white font-semibold text-xs sm:text-sm border border-white/20 hover:border-white/40 backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Book Strategy Call</span>
            <svg
              className="w-3.5 h-3.5 text-cyan-300"
              viewBox="0 0 12 10"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M0.8 5h10M7.1 1.4 10.9 5l-3.8 3.6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* Cinematic drift keyframes */}
      <style jsx global>{`
        @keyframes cinematicDrift {
          0% {
            transform: scale(1) translate(0%, 0%);
          }
          50% {
            transform: scale(1.04) translate(-1.2%, -0.8%);
          }
          100% {
            transform: scale(1) translate(0%, 0%);
          }
        }
      `}</style>
    </section>
  );
}
