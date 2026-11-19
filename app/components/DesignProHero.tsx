"use client";

import React from "react";
import Link from "next/link";
import { ArrowDown, FileSpreadsheet, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function DesignProHero() {
  const handleScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("marketplace");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full min-h-[640px] pt-32 pb-16 sm:pt-36 sm:pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#fdfbf7] via-[#fffdfa] to-white border-b border-amber-200/80 overflow-hidden flex flex-col justify-center">
      {/* Subtle Warm Luxury Amber Ambient Glow */}
      <div
        className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[680px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.12)_0%,rgba(255,255,255,0)_70%)]" />
        <div className="absolute top-10 right-10 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-yellow-200/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full text-center flex flex-col items-center">
        {/* Top Trust Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-800 mb-6 backdrop-blur-md shadow-xs">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span>Vetted DR 50–90+ Publications • Live 2026 Inventory</span>
        </div>

        {/* Category Pill */}
        <span className="text-xs font-bold uppercase tracking-widest text-amber-600 block mb-3">
          Editorial Guest Posting &amp; Authority Backlinks Marketplace
        </span>

        {/* Primary Page Heading (H1 - Directly Aligned to Page Topic, Resolving Issue 1) */}
        <h1 className="font-sans font-black tracking-tight leading-[1.12] text-3xl sm:text-5xl md:text-6xl text-slate-950 max-w-4xl mx-auto mb-6">
          Scale Your Organic Rankings With{" "}
          <span className="bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
            High-Authority Guest Posts
          </span>
          .
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
          Secure permanent, contextual in-content backlinks on vetted DR 50–90+ media outlets. Verified Ahrefs organic traffic, zero PBNs, handwritten native articles, and guaranteed Google indexation.
        </p>

        {/* Dual Primary Call-to-Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-12">
          <a
            href="#marketplace"
            onClick={handleScroll}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 font-bold text-sm px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-yellow-500 text-white shadow-lg shadow-amber-900/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Explore 40,000+ Sites Inventory</span>
            <ArrowDown className="w-4 h-4" />
          </a>

          <Link
            href="/contact-us"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-bold text-sm px-7 py-4 rounded-full bg-white hover:bg-amber-50/50 text-slate-800 border border-slate-200 hover:border-amber-400 shadow-sm transition-all"
          >
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>Request Custom Outreach Brief</span>
          </Link>
        </div>

        {/* Trust & Guarantee Highlights Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4 max-w-4xl w-full text-left">
          <div className="p-4 rounded-2xl bg-white border border-amber-200/70 shadow-xs flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-bold text-slate-900">100% Do-Follow</div>
              <div className="text-xs text-slate-500 mt-0.5">Contextual editorial links</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-amber-200/70 shadow-xs flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-bold text-slate-900">DR 50–90+</div>
              <div className="text-xs text-slate-500 mt-0.5">Ahrefs verified authority</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-amber-200/70 shadow-xs flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-bold text-slate-900">Real Traffic</div>
              <div className="text-xs text-slate-500 mt-0.5">Minimum 10k+ monthly visits</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-amber-200/70 shadow-xs flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-bold text-slate-900">Lifetime Warranty</div>
              <div className="text-xs text-slate-500 mt-0.5">Free replacement guarantee</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
