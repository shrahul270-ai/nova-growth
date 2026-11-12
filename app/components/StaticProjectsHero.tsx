"use client";

import React from "react";
import Link from "next/link";

export default function StaticProjectsHero() {
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
          <span>VERIFIED CASE STUDIES &amp; PORTFOLIO</span>
        </div>

        {/* Clean, Bold Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12] mb-6">
          Documented Impact. Real{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d8b4fe] via-[#A068FF] to-[#22d3ee]">
            Organic Revenue Growth
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed mb-8">
          Explore how we engineer custom Next.js web applications, full-funnel search strategies, and high-authority link campaigns that scale market-leading brands.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10">
          <a
            href="#projects-grid"
            className="px-7 py-3 rounded-full bg-gradient-to-r from-[#A068FF] to-[#7c3aed] text-white font-bold text-xs sm:text-sm hover:brightness-110 shadow-lg shadow-purple-900/30 transition-all cursor-pointer"
          >
            Browse Stories Below ↓
          </a>
          <Link
            href="/contact"
            className="px-7 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm border border-white/15 transition-all cursor-pointer"
          >
            Get Custom Proposal
          </Link>
        </div>

        {/* Quick Highlights Bar */}
        <div className="w-full flex flex-wrap items-center justify-center gap-3 pt-6 border-t border-purple-500/20 text-xs font-medium text-slate-300">
          <span className="bg-white/[0.04] px-4 py-1.5 rounded-full border border-purple-500/20">
            ⚡ <strong className="text-white">+340%</strong> Avg Organic Lift
          </span>
          <span className="bg-white/[0.04] px-4 py-1.5 rounded-full border border-purple-500/20">
            🎯 <strong className="text-white">6-Month</strong> Target Execution
          </span>
          <span className="bg-white/[0.04] px-4 py-1.5 rounded-full border border-purple-500/20">
            🛡️ <strong className="text-white">100%</strong> White-Hat SEO
          </span>
        </div>
      </div>
    </section>
  );
}
