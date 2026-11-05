"use client";

import React from "react";
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
    value: "15000+",
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
      className="relative min-h-screen py-20 sm:py-28 px-6 sm:px-10 bg-[#F0F5F7] flex flex-col justify-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full relative z-20">
        
        {/* Top row -- heading + description (side by side on desktop) */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-20 text-[#154359]">
          
          {/* Left side -- Section heading */}
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#154359]/20 text-[12px] font-semibold text-[#154359] mb-4 uppercase tracking-wider shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#185B7B] animate-pulse" />
              <span>Agency Founders &amp; Leadership</span>
            </div>
            <h2 className="font-firs text-[36px] sm:text-[48px] lg:text-[54px] font-semibold uppercase tracking-tight leading-[0.95] text-[#154359]">
              About <br /> the founders
            </h2>
          </div>

          {/* Right side -- Description block */}
          <div className="flex flex-col max-w-xl text-[17px] sm:text-[18px] leading-[1.5] text-[#154359]">
            <p>
              Balaji Prime Media was founded with a singular conviction: real organic search dominance is built through deep data intelligence, technical engineering, and high-tier editorial relationships.
            </p>
            <p className="mt-4">
              Our founders&apos; mission is to empower global brands, fast-growing startups, and enterprise clients to achieve measurable ROI and undisputed visibility across search engines worldwide.
            </p>
            <div>
              <a
                href="#contact"
                className="group inline-flex items-center gap-4 mt-6 text-[14px] font-medium text-[#154359]"
              >
                <span>Balaji Prime Media roadmap</span>
                <span
                  className="flex items-center justify-center w-8 h-8 border border-[#154359] transition-transform group-hover:-translate-y-0.5 bg-white/50"
                  style={{
                    clipPath:
                      "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
                  }}
                >
                  <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* INTEGRATED "YOUR SUCCESS OUR MISSION" LAPTOP & FEATURE METRICS (Restyled in #F0F5F7 & #154359 Palette) */}
        <div className="mt-14 mb-10 bg-white/70 backdrop-blur-md rounded-3xl border border-[#154359]/15 p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Col: The Exact Laptop Mockup + Handwritten Note + Badges */}
            <div className="lg:col-span-6 relative flex items-center justify-center pt-8 pb-4">
              
              {/* Handwritten Note Top */}
              <div className="absolute -top-3 left-4 sm:left-12 z-20 flex flex-col items-center">
                <span className="handwriting text-xl sm:text-2xl font-bold text-[#154359] -rotate-3">
                  Your Success
                </span>
                <span className="handwriting text-xl sm:text-2xl font-bold text-[#185B7B] -rotate-3">
                  Our Mission
                </span>
                <svg
                  className="w-6 h-6 text-[#154359]/70 rotate-45"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>

              {/* Floating Metric 1 */}
              <div className="absolute top-8 -left-2 sm:left-2 z-20 bg-white/95 backdrop-blur-md border border-[#154359]/20 px-3.5 py-2 rounded-xl shadow-md flex items-center gap-2 text-xs">
                <span className="text-[#185B7B] font-bold text-xs">↗ 15%</span>
                <span className="text-[11px] text-[#154359]/80 font-medium">Conversions</span>
              </div>

              {/* Floating Metric 2 */}
              <div className="absolute bottom-10 -left-2 sm:left-4 z-20 bg-white/95 backdrop-blur-md border border-[#154359]/20 px-3.5 py-2 rounded-xl shadow-md flex items-center gap-2 text-xs">
                <span className="text-[#185B7B] font-bold text-xs">↗ 20%</span>
                <span className="text-[11px] text-[#154359]/80 font-medium">Click Through Rate</span>
              </div>

              {/* Laptop Body Mockup */}
              <div className="relative w-full max-w-[460px] bg-[#102d3d] rounded-t-2xl p-2.5 sm:p-3 shadow-2xl border-4 border-[#154359]">
                {/* Screen bezel & top camera dot */}
                <div className="w-2 h-2 rounded-full bg-[#1e485e] mx-auto mb-2" />
                
                {/* Screen Dashboard Preview */}
                <div className="bg-[#F0F5F7] rounded-lg p-3 sm:p-4 border border-[#154359]/15">
                  <div className="flex items-center justify-between border-b border-[#154359]/15 pb-2 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#185B7B]" />
                      <span className="text-xs font-bold text-[#154359]">Organic Growth Report</span>
                    </div>
                    <span className="text-[10px] text-[#154359]/70 font-semibold uppercase tracking-wider">Live Analytics</span>
                  </div>

                  {/* Chart bars & lines visual in teal/blue gradient */}
                  <div className="grid grid-cols-6 gap-2 items-end h-20 sm:h-24 mb-3 px-2">
                    <div className="bg-[#4BBDF0]/40 rounded-t h-[35%]" />
                    <div className="bg-[#4BBDF0]/60 rounded-t h-[50%]" />
                    <div className="bg-[#4BBDF0]/80 rounded-t h-[65%]" />
                    <div className="bg-[#185B7B]/80 rounded-t h-[80%]" />
                    <div className="bg-[#185B7B] rounded-t h-[95%]" />
                    <div className="bg-[#154359] rounded-t h-[100%]" />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#154359]/80 font-semibold pt-1 border-t border-[#154359]/10">
                    <span>Target: +150%</span>
                    <span className="text-[#185B7B] font-extrabold">Achieved: +300%</span>
                  </div>
                </div>

                {/* Laptop Base */}
                <div className="w-full sm:w-[104%] sm:-ml-[2%] h-3 bg-[#0d222e] rounded-b-xl mt-1 shadow-md" />
              </div>

              {/* Floating Highlight Badge: +245% Organic Traffic */}
              <div className="absolute -bottom-2 right-2 sm:right-6 z-20 bg-white/95 backdrop-blur-md border border-[#154359]/20 px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#F0F5F7] text-[#185B7B] border border-[#154359]/20 flex items-center justify-center font-bold text-xs shrink-0">
                  📈
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs sm:text-sm font-extrabold text-[#154359] leading-none">+245%</span>
                  <span className="text-[10.5px] font-semibold text-[#154359]/70">Organic Traffic</span>
                </div>
              </div>

            </div>

            {/* Right Col: 4 Agency Pillars (Restyled in #F0F5F7 palette) */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <h3 className="font-firs text-2xl sm:text-3xl font-semibold uppercase text-[#154359] tracking-tight mb-2">
                Engineered for <br className="hidden sm:inline" /> Measurable Authority
              </h3>
              <p className="text-[15px] text-[#154359]/80 leading-relaxed mb-6">
                We combine deep technical audit intelligence, high-tier editorial publishing, and sustainable content architecture to elevate your enterprise into an industry powerhouse.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="bg-white/90 p-3.5 rounded-xl border border-[#154359]/15 shadow-2xs flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#F0F5F7] text-[#185B7B] flex items-center justify-center text-base shrink-0 border border-[#154359]/10">
                    👥
                  </div>
                  <div>
                    <span className="text-[13.5px] font-bold text-[#154359] block">Expert Team</span>
                    <span className="text-[11.5px] text-[#154359]/70">Skilled &amp; Experienced</span>
                  </div>
                </div>

                <div className="bg-white/90 p-3.5 rounded-xl border border-[#154359]/15 shadow-2xs flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#F0F5F7] text-[#185B7B] flex items-center justify-center text-base shrink-0 border border-[#154359]/10">
                    📊
                  </div>
                  <div>
                    <span className="text-[13.5px] font-bold text-[#154359] block">Data Driven</span>
                    <span className="text-[11.5px] text-[#154359]/70">Strategy &amp; Analysis</span>
                  </div>
                </div>

                <div className="bg-white/90 p-3.5 rounded-xl border border-[#154359]/15 shadow-2xs flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#F0F5F7] text-[#185B7B] flex items-center justify-center text-base shrink-0 border border-[#154359]/10">
                    📋
                  </div>
                  <div>
                    <span className="text-[13.5px] font-bold text-[#154359] block">Transparent</span>
                    <span className="text-[11.5px] text-[#154359]/70">Weekly Reporting</span>
                  </div>
                </div>

                <div className="bg-white/90 p-3.5 rounded-xl border border-[#154359]/15 shadow-2xs flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#F0F5F7] text-[#185B7B] flex items-center justify-center text-base shrink-0 border border-[#154359]/10">
                    🌐
                  </div>
                  <div>
                    <span className="text-[13.5px] font-bold text-[#154359] block">Global</span>
                    <span className="text-[11.5px] text-[#154359]/70">Client Support 24/7</span>
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
              className={`relative w-full h-[280px] sm:h-[340px] ${
                card.offset ? "lg:mt-24" : ""
              }`}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
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
                {/* Subtle readable overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(240, 245, 247, 0.95) 0%, rgba(240, 245, 247, 0.72) 48%, rgba(240, 245, 247, 0.15) 100%)",
                  }}
                />

                {/* Text overlay inside each card */}
                <div className={`absolute ${card.positionClass} max-w-[66%] z-10`}>
                  <div
                    className="font-firs font-semibold uppercase leading-none text-[36px] sm:text-[52px]"
                    style={{
                      background: "linear-gradient(294deg, #185B7B 20%, #4BBDF0)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    {card.value}
                  </div>
                  <p className="mt-3 text-[14px] leading-[1.4] text-[#154359] font-medium">
                    {card.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Bottom fade overlay */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 sm:h-56 z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(240, 245, 247, 0) 0%, rgba(240, 245, 247, 0.7) 60%, #F0F5F7 100%)",
        }}
      />
    </section>
  );
}
