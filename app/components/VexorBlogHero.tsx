"use client";

import React from "react";

interface VexorBlogHeroProps {
  onSearch?: (query: string) => void;
  searchQuery?: string;
}

export default function VexorBlogHero({}: VexorBlogHeroProps) {
  const scrollToArticles = () => {
    const el = document.getElementById("articles-grid");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full min-h-[550px] lg:min-h-[620px] bg-[#07030d] text-white flex flex-col justify-end overflow-hidden selection:bg-[#681fe4] selection:text-white pt-32 pb-12">
      {/* Background Grid Pattern & Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(104,31,228,0.22),transparent_65%)] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-white-240 opacity-40 pointer-events-none" />

      {/* Hero Content Positioned with Modern Industrial Elegance */}
      <div className="relative z-10 w-full max-w-[1320px] mx-auto px-6 sm:px-12 flex flex-col justify-end items-start text-left">
        <div className="max-w-4xl space-y-6">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] bg-white/[0.04] border border-white/10 font-mono text-xs uppercase tracking-[0.2em] text-[#681fe4]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#681fe4] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#681fe4]" />
            </span>
            <span>BALAJI PRIME MEDIA // EDITORIAL DISPATCH</span>
            <span className="text-white/20">|</span>
            <span className="text-neutral-400">FIELD MANUALS</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-bebas text-5xl sm:text-7xl md:text-8xl tracking-[0.14em] text-white uppercase leading-[0.9]">
            THE GROWTH <br />
            <span className="text-[#681fe4]">JOURNAL.</span>
          </h1>

          {/* Subcopy */}
          <p className="font-satoshi text-neutral-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl font-normal">
            Actionable search engine optimization field manuals, international DR 50–90+ link engineering frameworks, and technical Core Web Vitals blueprints tested across 200+ partner brands.
          </p>

          {/* Quick Metrics / Quality Proof Tags */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs font-mono text-neutral-400">
            <span className="flex items-center gap-2">
              <span className="text-[#681fe4]">■</span> 200+ Growth Case Studies
            </span>
            <span className="flex items-center gap-2">
              <span className="text-[#681fe4]">■</span> Verified DR 50–90+ Outreach
            </span>
            <span className="flex items-center gap-2">
              <span className="text-[#681fe4]">■</span> Google Core Update Blueprints
            </span>
          </div>
        </div>
      </div>

      {/* Seamless Transition Border to Articles Section */}
      <div className="relative z-10 w-full max-w-[1320px] mx-auto px-6 sm:px-12 pt-8">
        <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs font-mono text-neutral-500">
          <span className="text-neutral-300 tracking-[0.2em] uppercase">// EDITORIAL ARCHIVE</span>
          <button
            onClick={scrollToArticles}
            className="text-[#681fe4] hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 uppercase font-mono"
          >
            <span>SCROLL DOWN TO READ</span>
            <span>↓</span>
          </button>
        </div>
      </div>
    </section>
  );
}
