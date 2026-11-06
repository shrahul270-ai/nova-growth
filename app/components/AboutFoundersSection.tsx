"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface StatCardData {
  value: string;
  text: string;
  image: string;
  offset: boolean;
  clipPath: string;
  positionClass: string;
}

const STAT_CARDS: StatCardData[] = [
  {
    value: "7+ years",
    text: "Balaji Prime Media has served global markets, guiding enterprise ventures and their SEO journeys",
    image:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260514_154203_6c6f94dc-a07e-4ba5-8688-106f01ccd2c8.png&w=1280&q=85",
    offset: false,
    clipPath:
      "polygon(64px 0, calc(100% - 14px) 0, calc(100% - 4px) 4px, 100% 14px, 100% calc(100% - 14px), calc(100% - 4px) calc(100% - 4px), calc(100% - 14px) 100%, 14px 100%, 4px calc(100% - 4px), 0 calc(100% - 14px), 0 64px)",
    positionClass: "left-6 right-6 bottom-6",
  },
  {
    value: "15,000+",
    text: "High-authority editorial placements & campaigns moved through our verified growth pipeline",
    image:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260514_154151_45c62c60-3bcc-4f21-8f9d-03722ebb5df8.png&w=1280&q=85",
    offset: true,
    clipPath:
      "polygon(0 14px, 4px 4px, 14px 0, calc(100% - 64px) 0, 100% 64px, 100% calc(100% - 14px), calc(100% - 4px) calc(100% - 4px), calc(100% - 14px) 100%, 64px 100%, 0 calc(100% - 64px))",
    positionClass: "left-6 bottom-20",
  },
  {
    value: "120+",
    text: "Enterprise clients and agency partners accelerated globally with measurable organic ROI",
    image:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260514_152238_24ec8db4-d728-4739-bb30-e985533e9637.png&w=1280&q=85",
    offset: false,
    clipPath:
      "polygon(0 14px, 4px 4px, 14px 0, calc(100% - 64px) 0, 100% 64px, 100% calc(100% - 64px), calc(100% - 64px) 100%, 14px 100%, 4px calc(100% - 4px), 0 calc(100% - 14px))",
    positionClass: "left-6 right-28 bottom-6",
  },
];

export default function AboutFoundersSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen py-20 sm:py-28 px-6 sm:px-10 bg-[#08041d] text-white flex flex-col justify-center overflow-hidden border-t border-purple-500/20 font-inter"
    >
      {/* Subtle glowing violet dot matrix grid */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(160,104,255,0.12)_1px,transparent_1px)] [background-size:24px_24px] opacity-70 pointer-events-none" />

      {/* Ambient luxury violet & purple aurora glows */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(160,104,255,0.16)_0%,transparent_70%)] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-10 left-10 w-[500px] h-[400px] bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.14)_0%,transparent_70%)] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto w-full relative z-20">
        
        {/* Top row -- heading + description (side by side on desktop) */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-20">
          
          {/* Left side -- Section heading */}
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-[12px] font-semibold text-purple-300 mb-4 uppercase tracking-wider shadow-xs backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#A068FF] animate-pulse" />
              <span>Agency Founders &amp; Leadership</span>
            </div>
            <h2 className="font-urbanist text-[36px] sm:text-[48px] lg:text-[54px] font-bold uppercase tracking-tight leading-[0.98] text-white">
              About <br /> the founders
            </h2>
          </div>

          {/* Right side -- Description block */}
          <div className="flex flex-col max-w-xl text-[16.5px] sm:text-[17.5px] leading-relaxed text-slate-300">
            <p>
              Balaji Prime Media was founded with a singular conviction: real organic search dominance is built through deep data intelligence, technical engineering, and high-tier editorial relationships.
            </p>
            <p className="mt-4">
              Our founders&apos; mission is to empower global brands, fast-growing startups, and enterprise clients to achieve measurable ROI and undisputed visibility across search engines worldwide.
            </p>
            <div>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3.5 mt-6 text-[14.5px] font-semibold text-[#c084fc] hover:text-white transition-colors"
              >
                <span>Balaji Prime Media roadmap</span>
                <span
                  className="flex items-center justify-center w-8 h-8 rounded-lg border border-purple-500/40 bg-purple-950/50 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5 text-[#c084fc] group-hover:text-white shadow-xs"
                >
                  <ArrowUpRight className="w-4 h-4" strokeWidth={2.2} />
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* INTEGRATED "YOUR SUCCESS OUR MISSION" LAPTOP & FEATURE METRICS (Luxury Dark Glassmorphic Design) */}
        <div className="mt-14 mb-10 bg-gradient-to-b from-[#0f092e]/85 to-[#09041f]/85 backdrop-blur-2xl rounded-3xl border border-purple-500/25 p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Col: The Exact Laptop Mockup + Handwritten Note + Badges */}
            <div className="lg:col-span-6 relative flex items-center justify-center pt-8 pb-4">
              
              {/* Handwritten Note Top */}
              <div className="absolute -top-3 left-4 sm:left-12 z-20 flex flex-col items-center">
                <span className="handwriting text-xl sm:text-2xl font-bold text-[#fcd34d] -rotate-3 filter drop-shadow-[0_2px_8px_rgba(252,211,77,0.35)]">
                  Your Success
                </span>
                <span className="handwriting text-xl sm:text-2xl font-bold text-[#fcd34d] -rotate-3 filter drop-shadow-[0_2px_8px_rgba(252,211,77,0.35)]">
                  Our Mission
                </span>
                <svg
                  className="w-6 h-6 text-[#fcd34d]/80 rotate-45"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>

              {/* Floating Metric 1 */}
              <div className="absolute top-8 -left-2 sm:left-2 z-20 bg-[#130a38]/95 backdrop-blur-md border border-purple-500/30 px-3.5 py-2 rounded-xl shadow-xl flex items-center gap-2 text-xs">
                <span className="text-[#34d399] font-bold text-xs">↗ +15%</span>
                <span className="text-[11px] text-slate-300 font-medium">Conversions</span>
              </div>

              {/* Floating Metric 2 */}
              <div className="absolute bottom-10 -left-2 sm:left-4 z-20 bg-[#130a38]/95 backdrop-blur-md border border-purple-500/30 px-3.5 py-2 rounded-xl shadow-xl flex items-center gap-2 text-xs">
                <span className="text-[#38bdf8] font-bold text-xs">↗ +20%</span>
                <span className="text-[11px] text-slate-300 font-medium">Click Through Rate</span>
              </div>

              {/* Laptop Body Mockup */}
              <div className="relative w-full max-w-[460px] bg-[#12082b] rounded-t-2xl p-2.5 sm:p-3 shadow-2xl border-4 border-purple-500/30">
                {/* Screen bezel & top camera dot */}
                <div className="w-2 h-2 rounded-full bg-purple-400/40 mx-auto mb-2" />
                
                {/* Screen Dashboard Preview */}
                <div className="bg-[#09041a] rounded-lg p-3 sm:p-4 border border-purple-500/20">
                  <div className="flex items-center justify-between border-b border-purple-500/20 pb-2 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#A068FF] animate-pulse" />
                      <span className="text-xs font-bold text-white">Organic Growth Report</span>
                    </div>
                    <span className="text-[10px] text-purple-300 font-semibold uppercase tracking-wider">Live Analytics</span>
                  </div>

                  {/* Chart bars & lines visual in purple/cyan glow gradient */}
                  <div className="grid grid-cols-6 gap-2 items-end h-20 sm:h-24 mb-3 px-2">
                    <div className="bg-purple-500/30 rounded-t h-[35%]" />
                    <div className="bg-purple-500/50 rounded-t h-[50%]" />
                    <div className="bg-purple-500/70 rounded-t h-[65%]" />
                    <div className="bg-[#A068FF]/80 rounded-t h-[80%]" />
                    <div className="bg-[#A068FF] rounded-t h-[95%]" />
                    <div className="bg-gradient-to-t from-[#A068FF] to-[#38bdf8] rounded-t h-[100%] shadow-[0_0_12px_rgba(56,189,248,0.5)]" />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-300 font-semibold pt-1 border-t border-purple-500/20">
                    <span>Target: +150%</span>
                    <span className="text-[#38bdf8] font-extrabold">Achieved: +300%</span>
                  </div>
                </div>

                {/* Laptop Base */}
                <div className="w-full sm:w-[104%] sm:-ml-[2%] h-3 bg-[#080315] rounded-b-xl mt-1 shadow-md border-t border-white/10" />
              </div>

              {/* Floating Highlight Badge: +245% Organic Traffic */}
              <div className="absolute -bottom-2 right-2 sm:right-6 z-20 bg-[#130a38]/95 backdrop-blur-md border border-purple-500/40 px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-purple-950 text-[#c084fc] border border-purple-500/30 flex items-center justify-center font-bold text-sm shrink-0">
                  📈
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs sm:text-sm font-extrabold text-white leading-none">+245%</span>
                  <span className="text-[10.5px] font-semibold text-purple-300">Organic Traffic</span>
                </div>
              </div>

            </div>

            {/* Right Col: 4 Agency Pillars (Luxury Obsidian Cards) */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <h3 className="font-urbanist text-2xl sm:text-3xl font-bold uppercase text-white tracking-tight mb-2">
                Engineered for <br className="hidden sm:inline" /> Measurable Authority
              </h3>
              <p className="text-[15px] text-slate-300 leading-relaxed mb-6">
                We combine deep technical audit intelligence, high-tier editorial publishing, and sustainable content architecture to elevate your enterprise into an industry powerhouse.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="bg-[#130a38]/70 p-3.5 rounded-2xl border border-purple-500/20 shadow-sm flex items-center gap-3 hover:border-purple-500/50 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-purple-950/70 text-[#c084fc] flex items-center justify-center text-base shrink-0 border border-purple-500/30">
                    👥
                  </div>
                  <div>
                    <span className="text-[13.5px] font-bold text-white block">Expert Team</span>
                    <span className="text-[11.5px] text-slate-400">Skilled &amp; Experienced</span>
                  </div>
                </div>

                <div className="bg-[#130a38]/70 p-3.5 rounded-2xl border border-purple-500/20 shadow-sm flex items-center gap-3 hover:border-purple-500/50 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-purple-950/70 text-[#c084fc] flex items-center justify-center text-base shrink-0 border border-purple-500/30">
                    📊
                  </div>
                  <div>
                    <span className="text-[13.5px] font-bold text-white block">Data Driven</span>
                    <span className="text-[11.5px] text-slate-400">Strategy &amp; Analysis</span>
                  </div>
                </div>

                <div className="bg-[#130a38]/70 p-3.5 rounded-2xl border border-purple-500/20 shadow-sm flex items-center gap-3 hover:border-purple-500/50 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-purple-950/70 text-[#c084fc] flex items-center justify-center text-base shrink-0 border border-purple-500/30">
                    📋
                  </div>
                  <div>
                    <span className="text-[13.5px] font-bold text-white block">Transparent</span>
                    <span className="text-[11.5px] text-slate-400">Weekly Reporting</span>
                  </div>
                </div>

                <div className="bg-[#130a38]/70 p-3.5 rounded-2xl border border-purple-500/20 shadow-sm flex items-center gap-3 hover:border-purple-500/50 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-purple-950/70 text-[#c084fc] flex items-center justify-center text-base shrink-0 border border-purple-500/30">
                    🌐
                  </div>
                  <div>
                    <span className="text-[13.5px] font-bold text-white block">Global</span>
                    <span className="text-[11.5px] text-slate-400">Client Support 24/7</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Stats cards grid (below the heading row) */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {STAT_CARDS.map((card, idx) => (
            <div
              key={idx}
              className={`relative w-full h-[280px] sm:h-[340px] rounded-2xl transition-all duration-300 hover:scale-[1.02] ${
                card.offset ? "lg:mt-24" : ""
              }`}
              style={{
                backgroundColor: "rgba(160, 104, 255, 0.25)",
                padding: "1.5px",
                clipPath: card.clipPath,
              }}
            >
              <div
                className="relative w-full h-full overflow-hidden bg-cover bg-center"
                style={{
                  backgroundImage: `url(${card.image})`,
                  mixBlendMode: "normal",
                  clipPath: card.clipPath,
                }}
              >
                {/* Subtle readable dark overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(7, 3, 25, 0.96) 0%, rgba(7, 3, 25, 0.75) 50%, rgba(7, 3, 25, 0.25) 100%)",
                  }}
                />

                {/* Text overlay inside each card */}
                <div className={`absolute ${card.positionClass} max-w-[70%] z-10`}>
                  <div
                    className="font-urbanist font-extrabold uppercase leading-none text-[36px] sm:text-[52px]"
                    style={{
                      background: "linear-gradient(135deg, #A068FF 0%, #c084fc 50%, #38bdf8 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    {card.value}
                  </div>
                  <p className="mt-3 text-[14px] leading-relaxed text-slate-200 font-medium">
                    {card.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
