"use client";

import React from "react";

export default function NextLayerContactHero() {
  return (
    <section className="relative pt-28 sm:pt-36 pb-12 sm:pb-16 px-6 md:px-16 lg:px-24 text-center overflow-hidden bg-black flex flex-col justify-center min-h-[460px] sm:min-h-[520px]">
      {/* 3D Liquid Chrome Ribbon Hero Background (User Specified Artwork) */}
      <div
        className="absolute inset-0 z-0 pointer-events-none bg-cover bg-center bg-no-repeat opacity-85 scale-[1.02]"
        style={{
          backgroundImage: `url("/images/contact-hero-3d.jpg")`,
        }}
        aria-hidden="true"
      />

      {/* Sophisticated Dual Scrim for Maximum Text Contrast & Seamless Header Integration */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(3, 1, 12, 0.45) 0%, rgba(3, 1, 12, 0.78) 60%, rgba(0, 0, 0, 0.95) 100%), linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, transparent 22%, transparent 75%, rgba(0,0,0,0.98) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Content Container (relative z-10) */}
      <div className="relative z-10 max-w-4xl mx-auto my-auto select-none">
        
        {/* Balaji Prime Media Trust Badge Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass-strong text-white/90 text-xs font-body font-medium mb-4 sm:mb-5 shadow-2xl backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Balaji Prime Media • Direct Founder Discovery &amp; Strategy</span>
        </div>

        {/* Heading: Instrument Serif italic */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading italic text-white tracking-tight leading-[0.95] max-w-3xl mx-auto mb-3.5 drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
          Your next website starts here.
        </h1>

        {/* Subtext: Barlow font-body */}
        <p className="text-white/70 font-body font-light text-sm md:text-base max-w-xl mx-auto mb-3 leading-relaxed">
          Book a free strategy call. See what high-intent organic SEO, modern Next.js development, and AI-powered growth can do. No commitment, no pressure. Just compounding revenue.
        </p>

        {/* Floating Trust Indicators (Agency Details) */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-5 sm:gap-8 text-xs font-body text-white/60">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">⚡</span>
            <span>12-Hour SLA Response</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-cyan-400">🌍</span>
            <span>US • UK • Canada • UAE • Australia</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-purple-400">🔒</span>
            <span>Mutual NDA Guaranteed</span>
          </div>
        </div>

      </div>
    </section>
  );
}
