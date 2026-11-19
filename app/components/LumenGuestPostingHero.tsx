"use client";

import React from "react";

interface ConnectorLineProps {
  x1: string;
  y1: string;
  x2: string;
  y2: string;
  delay: number;
}

function ConnectorLine({ x1, y1, x2, y2, delay }: ConnectorLineProps) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none anim-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

const verticalPositions = ["12.6%", "37.5%", "61.9%", "86.2%"];
const horizontalPositions = ["32.7%", "71.4%"];

export default function LumenGuestPostingHero() {
  const scrollToMarketplace = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("marketplace");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-[88vh] min-h-[660px] md:h-[92vh] md:min-h-[720px] lg:h-[94vh] lg:min-h-[760px] overflow-hidden bg-black select-none border-b border-white/[0.08]">
      {/* Layer 0: Full-Bleed CloudFront Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover anim-fade-in pointer-events-none"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260813_115057_94c3699b-0fd1-4124-bcf3-3626bb8c1f77.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Content Layer (No outer padding) */}
      <div className="relative z-10 w-full h-full">
        {/* Main Heading */}
        <h1
          className="font-graphik text-white font-normal leading-[1em] absolute anim-fade-up text-[32px] sm:text-[48px] md:text-[68px] top-[140px] sm:top-[160px] md:top-[178px] left-5 md:left-[35px] max-w-[300px] sm:max-w-[420px] md:max-w-[554px]"
          style={{ animationDelay: "400ms" }}
        >
          Editorial Authority. Luminous Rankings.
        </h1>

        {/* Grid Lines + Plus Intersections */}
        {/* 4 Vertical Lines */}
        {verticalPositions.map((left, i) => (
          <div
            key={`v-${i}`}
            className="absolute top-0 h-full w-px bg-white/[0.04] anim-grid-v pointer-events-none"
            style={{ left, animationDelay: `${600 + i * 100}ms` }}
          />
        ))}

        {/* 2 Horizontal Lines */}
        {horizontalPositions.map((top, i) => (
          <div
            key={`h-${i}`}
            className="absolute left-0 w-full h-px bg-white/[0.04] anim-grid-h pointer-events-none"
            style={{ top, animationDelay: `${800 + i * 150}ms` }}
          />
        ))}

        {/* 8 Plus Marks at all intersections */}
        {horizontalPositions.map((top, hi) =>
          verticalPositions.map((left, vi) => (
            <div
              key={`plus-${hi}-${vi}`}
              className="absolute anim-scale-in pointer-events-none"
              style={{
                top,
                left,
                animationDelay: `${1000 + (hi * 4 + vi) * 80}ms`,
              }}
            >
              <span className="absolute w-[10px] h-px bg-white/70 -translate-x-1/2 -translate-y-1/2" />
              <span className="absolute w-px h-[10px] bg-white/70 -translate-x-1/2 -translate-y-1/2" />
            </div>
          ))
        )}

        {/* Central Nodes (3 squares + 3 labels + 6 connector lines) - Hidden below md */}
        <div className="absolute inset-0 pointer-events-none hidden md:block">
          {/* Connector Lines */}
          {/* Node 1 Connectors */}
          <ConnectorLine x1="38%" y1="14%" x2="52%" y2="14%" delay={1200} />
          <ConnectorLine x1="52%" y1="14%" x2="60%" y2="27%" delay={1400} />

          {/* Node 2 Connectors */}
          <ConnectorLine x1="32%" y1="58%" x2="20%" y2="74%" delay={1500} />
          <ConnectorLine x1="20%" y1="74%" x2="6%" y2="74%" delay={1700} />

          {/* Node 3 Connectors */}
          <ConnectorLine x1="78%" y1="53%" x2="63%" y2="53%" delay={1800} />
          <ConnectorLine x1="63%" y1="53%" x2="50%" y2="63%" delay={2000} />

          {/* Squares (No padding, no content) */}
          <div
            className="absolute top-[27%] left-[60%] w-[80px] h-[80px] lg:w-[100px] lg:h-[100px] border border-white/80 anim-scale-in"
            style={{ animationDelay: "1500ms" }}
          />
          <div
            className="absolute top-[58%] left-[32%] w-[80px] h-[80px] lg:w-[100px] lg:h-[100px] border border-white/80 anim-scale-in"
            style={{ animationDelay: "1800ms" }}
          />
          <div
            className="absolute top-[63%] left-[50%] w-[80px] h-[80px] lg:w-[100px] lg:h-[100px] border border-white/80 anim-scale-in"
            style={{ animationDelay: "2100ms" }}
          />

          {/* Label Groups */}
          {/* Node 1 Label */}
          <div
            className="absolute top-[11%] left-[26%] anim-slide-left pointer-events-auto"
            style={{ animationDelay: "1100ms" }}
          >
            <span className="font-manrope text-white text-[13px] leading-[15.6px] whitespace-nowrap font-medium">
              [ CORE_PUBLICATIONS ]
            </span>
            <p className="font-manrope text-white/50 text-[11px] leading-[14px] mt-[4px] max-w-[160px]">
              Neural catalog indexing 850+ vetted DR 50–90+ media houses.
            </p>
          </div>

          {/* Node 2 Label */}
          <div
            className="absolute top-[76%] left-[3%] anim-slide-left pointer-events-auto"
            style={{ animationDelay: "1400ms" }}
          >
            <span className="font-manrope text-white text-[13px] leading-[15.6px] whitespace-nowrap font-medium">
              [ CONTEXTUAL_EQUITY ]
            </span>
            <p className="font-manrope text-white/50 text-[11px] leading-[14px] mt-[4px] max-w-[160px]">
              100% do-follow in-content links passing pure algorithmic trust.
            </p>
          </div>

          {/* Node 3 Label */}
          <div
            className="absolute top-[50%] left-[78%] anim-slide-right pointer-events-auto"
            style={{ animationDelay: "1700ms" }}
          >
            <span className="font-manrope text-white text-[13px] leading-[15.6px] whitespace-nowrap font-medium">
              [ INDEXATION_WARRANTY ]
            </span>
            <p className="font-manrope text-white/50 text-[11px] leading-[14px] mt-[4px] max-w-[180px]">
              Lifetime permanent placement backed by 12-month link warranty.
            </p>
          </div>
        </div>

        {/* Bottom Row (Inset 20px / 35px, flex items-end justify-between) */}
        <div className="absolute bottom-5 md:bottom-[35px] left-5 md:left-[35px] right-5 md:right-[35px] flex flex-col md:flex-row items-start md:items-end justify-between gap-5 md:gap-0 z-20">
          {/* Left CTA Button */}
          <a
            href="#marketplace"
            onClick={scrollToMarketplace}
            className="bg-[#AFDDFF] px-[16px] md:px-[20px] py-[10px] md:py-[12px] flex items-center gap-[10px] hover:bg-[#c8e8ff] transition-colors anim-fade-up inline-flex cursor-pointer"
            style={{ animationDelay: "900ms" }}
          >
            <span className="text-black text-[16px] leading-none">&#10022;</span>
            <span className="font-manrope text-black text-[12px] md:text-[13px] leading-[15.6px] uppercase tracking-wide font-medium">
              Explore 850+ Publications
            </span>
          </a>

          {/* Right Info Card */}
          <div
            className="relative max-w-[280px] hidden sm:block anim-slide-right"
            style={{ animationDelay: "1100ms" }}
          >
            {/* Badge above card */}
            <div className="font-manrope text-black text-[13px] leading-[15.6px] bg-[#AFDDFF] px-[6px] py-[2px] inline-block mb-[10px] font-medium">
              NOT JUST LINKS — AN ECOSYSTEM
            </div>

            {/* Card Body */}
            <div className="relative p-[20px]">
              {/* Chamfered SVG Border Polygon (30x30 chamfer at bottom-left corner) */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 280 168"
                preserveAspectRatio="none"
              >
                <polygon
                  points="0.5,0.5 279.5,0.5 279.5,167.5 30,167.5 0.5,137.5"
                  fill="rgba(0,0,0,0.55)"
                  stroke="#AFDDFF"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              {/* Card Paragraph */}
              <p className="relative font-manrope text-white text-[13px] leading-[18px] mb-[18px]">
                Navigate algorithmic search updates with verified DR 50–90+ publications that bring
                compounding organic authority to your brand.
              </p>

              {/* Card Link */}
              <div
                onClick={scrollToMarketplace}
                className="relative font-manrope text-[#AFDDFF] text-[13px] leading-[15.6px] cursor-pointer hover:underline font-medium"
              >
                VIEW_EDITORIAL_DATABASE
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
