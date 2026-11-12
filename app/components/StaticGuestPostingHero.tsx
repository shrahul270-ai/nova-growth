"use client";

import React from "react";
import Link from "next/link";

export default function StaticGuestPostingHero() {
  return (
    <section className="relative w-full pt-32 sm:pt-40 pb-16 sm:pb-24 px-4 sm:px-6 md:px-12 text-center overflow-hidden bg-[#070318]">
      {/* Subtle Static Ambient Glows (No moving parts) */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(160, 104, 255, 0.28), transparent 70%), radial-gradient(circle at 15% 50%, rgba(99, 102, 241, 0.12), transparent 50%), radial-gradient(circle at 85% 60%, rgba(34, 211, 238, 0.1), transparent 50%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Modern Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-xs font-bold text-[#d8b4fe] mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          <span>40,000+ REAL PUBLISHER MARKETPLACE</span>
        </div>

        {/* Clean, Bold Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12] mb-6">
          High-Authority Editorial Links on{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d8b4fe] via-[#A068FF] to-[#22d3ee]">
            DR 50–90+ Publications
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed mb-8">
          Direct publisher relationships across 40,000+ vetted media outlets. 100% manual outreach, permanent contextual dofollow links, and zero private blog networks (PBNs).
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10">
          <a
            href="#guest-post-table"
            className="px-7 py-3 rounded-full bg-gradient-to-r from-[#A068FF] to-[#7c3aed] text-white font-bold text-xs sm:text-sm hover:brightness-110 shadow-lg shadow-purple-900/30 transition-all cursor-pointer"
          >
            Search Live Database ↓
          </a>
          <Link
            href="/contact"
            className="px-7 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm border border-white/15 transition-all cursor-pointer"
          >
            Request Custom Niche List
          </Link>
        </div>

        {/* 4 Static Trust Metrics */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-4 border-t border-purple-500/20">
          <div className="bg-white/[0.03] border border-purple-500/20 rounded-2xl p-4 text-center">
            <div className="text-2xl sm:text-3xl font-black text-cyan-300">40K+</div>
            <div className="text-[11px] font-semibold text-slate-400 mt-0.5">Vetted Sites</div>
          </div>
          <div className="bg-white/[0.03] border border-purple-500/20 rounded-2xl p-4 text-center">
            <div className="text-2xl sm:text-3xl font-black text-[#d8b4fe]">DR 50–92</div>
            <div className="text-[11px] font-semibold text-slate-400 mt-0.5">Authority Tiers</div>
          </div>
          <div className="bg-white/[0.03] border border-purple-500/20 rounded-2xl p-4 text-center">
            <div className="text-2xl sm:text-3xl font-black text-cyan-300">0%</div>
            <div className="text-[11px] font-semibold text-slate-400 mt-0.5">PBNs Guaranteed</div>
          </div>
          <div className="bg-white/[0.03] border border-purple-500/20 rounded-2xl p-4 text-center">
            <div className="text-2xl sm:text-3xl font-black text-[#d8b4fe]">48-Hour</div>
            <div className="text-[11px] font-semibold text-slate-400 mt-0.5">Avg Turnaround</div>
          </div>
        </div>
      </div>
    </section>
  );
}
