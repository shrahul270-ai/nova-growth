"use client";

import React from "react";

export default function NextLayerContactHero() {
  return (
    <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-20 px-6 md:px-16 lg:px-24 text-center overflow-hidden bg-[#020712] bg-grid-white-240 flex flex-col justify-center min-h-[460px] sm:min-h-[520px] border-b border-white/10 font-satoshi">
      {/* Subtle Sky Blue Ambient Radial Glow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.22)_0%,transparent_70%)]" />
        <div className="absolute top-10 right-10 w-96 h-96 bg-[#0284c7]/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto my-auto select-none">
        
        {/* Trust Badge Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-[2px] bg-white/5 border border-white/10 text-white/90 text-xs font-bebas tracking-[0.2em] uppercase mb-4 sm:mb-5 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#0ea5e9] animate-pulse" />
          <span>BALAJI PRIME MEDIA // DIRECT FOUNDER STRATEGY</span>
        </div>

        {/* Heading */}
        <h1 className="font-bebas text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase text-white tracking-[0.16em] leading-[0.92] max-w-4xl mx-auto mb-4">
          YOUR NEXT WEBSITE <span className="text-[#0ea5e9]">STARTS HERE</span>.
        </h1>

        {/* Subtext */}
        <p className="font-satoshi text-neutral-300 font-normal text-sm md:text-base max-w-xl mx-auto mb-6 leading-relaxed">
          Book a free strategy call. See what high-intent organic SEO, modern Next.js development, and AI-powered growth can do. No commitment, no pressure. Just compounding revenue.
        </p>

        {/* Trust Indicators */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-5 sm:gap-8 text-xs font-bebas tracking-[0.14em] text-neutral-400 uppercase">
          <div className="flex items-center gap-2">
            <span className="text-[#38bdf8]">⚡</span>
            <span>12-Hour SLA Response</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#38bdf8]">🌍</span>
            <span>US • UK • Canada • UAE • Australia</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#38bdf8]">🔒</span>
            <span>Mutual NDA Guaranteed</span>
          </div>
        </div>

      </div>
    </section>
  );
}
