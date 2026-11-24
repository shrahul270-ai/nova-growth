"use client";

import React from "react";
import Link from "next/link";
import { ArrowDown, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function DesignProHero() {
  const handleScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("marketplace");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full min-h-[640px] pt-32 pb-16 sm:pt-40 sm:pb-24 px-4 sm:px-6 lg:px-8 bg-[#07030d] bg-grid-white-240 text-white border-b border-white/10 overflow-hidden flex flex-col justify-center">
      {/* Subtle Violet Ambient Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(104,31,228,0.18)_0%,transparent_70%)]" />
        <div className="absolute top-10 right-10 w-96 h-96 bg-[#220090]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#681fe4]/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full text-center flex flex-col items-center">
        {/* Top Trust Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-[4px] bg-white/5 border border-white/10 text-xs font-bebas tracking-[0.2em] text-white/90 mb-6 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#681fe4] animate-pulse" />
          <span>VETTED EDITORIAL MEDIA // HIGH-AUTHORITY DIGITAL PR NETWORK</span>
        </div>

        {/* Category Pill */}
        <span className="font-bebas text-xs sm:text-sm tracking-[0.24em] text-[#681fe4] uppercase block mb-3">
          WHITE-HAT DIGITAL PR &amp; EDITORIAL OUTREACH PLATFORM
        </span>

        {/* Primary Page Heading (H1) */}
        <h1 className="font-bebas text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-[0.16em] uppercase leading-[0.92] max-w-5xl mx-auto mb-6">
          ELEVATE BRAND AUTHORITY WITH{" "}
          <span className="text-[#681fe4]">HIGH-IMPACT DIGITAL PR</span>.
        </h1>

        {/* Subtitle */}
        <p className="font-satoshi text-neutral-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10 font-normal">
          Secure genuine editorial features, expert brand mentions, and thought-leadership articles on vetted high-trust media outlets. 100% manual outreach strictly adhering to Google Search Essentials.
        </p>

        {/* Dual Primary Call-to-Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-14">
          <a
            href="#marketplace"
            onClick={handleScroll}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 font-bebas text-sm sm:text-base tracking-[0.16em] px-8 py-4 rounded-[4px] bg-[#681fe4] hover:bg-[#5815cb] text-white shadow-[0_10px_25px_rgba(104,31,228,0.35)] transition-all cursor-pointer uppercase"
          >
            <span>EXPLORE 850+ CURATED MEDIA SITES</span>
            <ArrowDown className="w-4 h-4" />
          </a>

          <Link
            href="/contact-us"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 font-bebas text-sm sm:text-base tracking-[0.16em] px-7 py-4 rounded-[4px] bg-white/5 hover:bg-white/10 text-white border border-white/15 transition-all uppercase"
          >
            <ShieldCheck className="w-4 h-4 text-[#681fe4]" />
            <span>REQUEST CUSTOM OUTREACH BRIEF</span>
          </Link>
        </div>

        {/* Trust & Guarantee Highlights Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4 max-w-4xl w-full text-left font-satoshi">
          <div className="p-4 sm:p-5 rounded-[4px] bg-[#0c0818] border border-white/10 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#681fe4] shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-bebas tracking-[0.14em] text-white uppercase">Editorial Outreach</div>
              <div className="text-xs text-neutral-400 mt-0.5">Manual journalist pitches</div>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-[4px] bg-[#0c0818] border border-white/10 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#681fe4] shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-bebas tracking-[0.14em] text-white uppercase">Verified Media</div>
              <div className="text-xs text-neutral-400 mt-0.5">High authority publications</div>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-[4px] bg-[#0c0818] border border-white/10 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#681fe4] shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-bebas tracking-[0.14em] text-white uppercase">Real Audiences</div>
              <div className="text-xs text-neutral-400 mt-0.5">Verified organic readership</div>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-[4px] bg-[#0c0818] border border-white/10 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#681fe4] shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-bebas tracking-[0.14em] text-white uppercase">Google Compliant</div>
              <div className="text-xs text-neutral-400 mt-0.5">Strict Search Essentials safety</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
