"use client";

import React from "react";

interface StaticBlogHeroProps {
  searchQuery?: string;
  onSearch?: (query: string) => void;
}

export default function StaticBlogHero({
  searchQuery = "",
  onSearch,
}: StaticBlogHeroProps) {
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
          <span>GROWTH PLAYBOOKS &amp; ENGINEERING INSIGHTS</span>
        </div>

        {/* Clean, Bold Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12] mb-6">
          Actionable Intelligence on SEO &amp;{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d8b4fe] via-[#A068FF] to-[#22d3ee]">
            Next.js Architecture
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed mb-8">
          Deep-dive analyses, architectural teardowns, and algorithm breakdowns authored by Balaji Prime Media&apos;s technical search leadership.
        </p>

        {/* Search Input Bar */}
        <div className="w-full max-w-xl relative">
          <div className="relative flex items-center">
            <span className="absolute left-4 text-slate-400 text-sm">🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearch?.(e.target.value)}
              placeholder="Search articles on SEO, Next.js, speed, link building..."
              className="w-full bg-white/[0.06] border border-purple-500/30 focus:border-[#A068FF] rounded-full pl-11 pr-5 py-3.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearch?.("")}
                className="absolute right-4 text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
