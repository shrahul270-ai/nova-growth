"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./Navbar";

interface PromptHeroProps {
  onOpenConsultation?: () => void;
}

// Background Image
const BG_IMAGE_URL =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_111401_56af5012-2263-45d3-849a-8688084d7c2a.png&w=1280&q=85";

// User's Leadership Portrait Image (Preserved from user request & uploaded image)
const PORTRAIT_URL =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260728_050334_5b076e26-0ce7-4898-b432-d764190e448f.png&w=1280&q=85";

// Partner Logos for Ticker
const TICKER_LOGOS = [
  "https://polo-pecan-73837341.figma.site/_assets/v11/1e7b0e6fcc016cd28aec5c68990118b8c54c35a5.svg",
  "https://polo-pecan-73837341.figma.site/_assets/v11/3eac03c183db2ae080d910159211c14843398b61.svg",
  "https://polo-pecan-73837341.figma.site/_assets/v11/17705a4c0023a0e5a99154dfb10582adbbf4260b.svg",
  "https://polo-pecan-73837341.figma.site/_assets/v11/0e5f442b09dc5c248e3e60d40a65505fb1887228.svg",
  "https://polo-pecan-73837341.figma.site/_assets/v11/63f99030ceb459e3c9ab9e429cfa2353491d3816.svg",
];

// Custom CountUp Hook
function useCountUp(target: number = 20, durationMs: number = 2000, delayMs: number = 600) {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const timer = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / durationMs, 1);
        const easeVal = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(easeVal * target));

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(step);
        }
      };
      animationFrameId = requestAnimationFrame(step);
    }, delayMs);

    return () => {
      clearTimeout(timer);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [target, durationMs, delayMs]);

  return count;
}

export default function PromptHero({ onOpenConsultation }: PromptHeroProps) {
  const specialistCount = useCountUp(20, 2000, 600);

  return (
    <div
      id="home"
      className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-[#060218] text-white font-inter"
      style={{
        backgroundImage: `url("${BG_IMAGE_URL}")`,
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* =========================================================================
          1. NAVBAR (World-Class Floating Glass Navbar for UK, US & Worldwide Clients)
         ========================================================================= */}
      <div className="relative z-50 w-full animate-mark-fade-down">
        <Navbar activePage="home" onJoinClick={onOpenConsultation} />
      </div>

      {/* =========================================================================
          2. HERO MAIN CONTENT: Left Column (World-Class Agency Headline) | Right Column (Orbits)
         ========================================================================= */}
      <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-12 lg:px-16 pt-4 sm:pt-8 pb-12 flex-1 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 relative z-20">
        
        {/* HERO LEFT COLUMN */}
        <div className="w-full lg:max-w-[700px] lg:flex-[0_1_700px] lg:pt-6 flex flex-col items-start animate-mark-fade-up">
          
          {/* Top International Credibility Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-purple-500/30 text-purple-200 text-xs font-semibold mb-6 backdrop-blur-md shadow-xs">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Trusted by Fast-Growing Brands in USA, UK &amp; Europe</span>
            <span className="text-purple-400">✦</span>
          </div>

          {/* WORLD-CLASS AUTHORITY HEADLINE (Designed for US & UK Enterprise Buyers) */}
          <h1 className="font-urbanist text-[38px] sm:text-[52px] lg:text-[68px] font-extrabold leading-[1.05] tracking-[-1.5px] text-left">
            <span className="text-white drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)] block">
              Scale Your Organic
            </span>
            <span className="bg-gradient-to-r from-[#A068FF] via-[#d8b4fe] to-[#38bdf8] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(160,104,255,0.7)] block">
              Revenue Globally.
            </span>
          </h1>

          {/* HIGH-CONVERTING SUBTITLE */}
          <p className="mt-5 text-[16px] sm:text-[18px] text-slate-300 leading-relaxed max-w-xl text-left font-normal">
            Balaji Prime Media engineers enterprise SEO campaigns, manual DR 50–90+ editorial outreach, and sub-second Next.js web applications that convert high-intent global search traffic into paying customers.
          </p>

          {/* Action Row: Start Project Button + Balaji Prime Media Cursor + Free Audit */}
          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4 relative w-full overflow-visible">
            {/* START PROJECT BUTTON */}
            <div className="btn-border-wrap shrink-0">
              <button
                type="button"
                onClick={onOpenConsultation}
                className="marketeam-start-btn cursor-pointer"
              >
                <span>Start Project</span>
                <svg
                  className="w-[18px] h-[18px] text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* CURSOR ELEMENT: Purple Pointer Arrow + "Balaji Prime Media" Pill Badge */}
            <div className="shrink-0 inline-flex items-center gap-1.5 whitespace-nowrap">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 -rotate-45 drop-shadow-[0_2px_8px_rgba(160,104,255,0.8)] shrink-0"
                viewBox="0 0 24 24"
                fill="#A068FF"
              >
                <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
              </svg>

              <div className="bg-[#A068FF] text-white text-[13px] sm:text-[14px] font-semibold px-3.5 py-1.5 rounded-[20px] shadow-[0_4px_16px_rgba(160,104,255,0.5)] tracking-wide whitespace-nowrap select-none">
                Balaji Prime Media
              </div>
            </div>

            {/* Free SEO Audit Secondary Link */}
            <Link
              href="/audit"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 px-3.5 py-2 rounded-full transition-all backdrop-blur-md"
            >
              <span>Instant SEO Audit</span>
              <span className="text-[#fcd34d]">⚡</span>
            </Link>
          </div>

          {/* =========================================================================
              CRITICAL: TALK WITH LEADERSHIP FROSTED CARD (Preserved 100% with portrait)
             ========================================================================= */}
          <div
            onClick={onOpenConsultation}
            className="mt-8 flex items-center gap-3.5 sm:gap-4 rounded-2xl bg-white/10 p-3 sm:p-3.5 backdrop-blur-xl border border-white/20 hover:border-[#A068FF]/70 shadow-2xl max-w-sm w-full cursor-pointer hover:bg-white/15 transition-all hover:scale-[1.02] active:scale-[0.99] group"
            title="Schedule Direct Strategy Consultation with Leadership"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onOpenConsultation?.();
              }
            }}
          >
            {/* Portrait Image from user uploaded photo */}
            <div className="relative h-20 w-16 sm:h-22 sm:w-20 rounded-xl overflow-hidden shrink-0 border border-white/30 bg-[#070319]/80 shadow-md">
              <Image
                src={PORTRAIT_URL}
                alt="Leadership Advisor - Balaji Prime Media"
                fill
                unoptimized
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Verbatim Content from user's image */}
            <div className="flex flex-col gap-1 pr-1 font-inter">
              <span className="text-[14px] sm:text-[15px] font-bold text-white tracking-tight group-hover:text-[#A068FF] transition-colors">
                Talk with Leadership
              </span>
              <span className="font-mono text-[9.5px] sm:text-[10px] uppercase tracking-[0.14em] text-[#38bdf8] font-semibold">
                BALAJI PRIME MEDIA ADVISORY
              </span>
              <p className="text-[11px] sm:text-[11.5px] text-gray-300 leading-tight my-0.5">
                Direct 1-on-1 organic growth strategy for high-intent queries.
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================================
            HERO RIGHT -- 4 CONCENTRIC ROTATING ORBITS VISUALIZATION (720x720)
           ========================================================================= */}
        <div className="relative w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] md:w-[620px] md:h-[620px] lg:w-[720px] lg:h-[720px] shrink-0 flex items-center justify-center animate-mark-scale-in origin-center scale-[0.45] sm:scale-[0.7] md:scale-[0.85] lg:scale-100 transition-transform">
          
          {/* ORBIT 4 (Outermost: 797px diameter, spins left 60s) */}
          <div
            className="orbit-circle-base marketeam-orbit-4 w-[797px] h-[797px]"
            style={{ pointerEvents: "none" }}
          >
            <div className="orbit-gradient-border" />

            {/* Avatar 6: at 30deg, 399px radius, 58px, purple glow */}
            <div
              className="absolute top-1/2 left-1/2 avatar-flyin pointer-events-auto"
              style={{
                transform: "translate(-50%, -50%) rotate(30deg) translate(399px) rotate(-30deg)",
                animationDelay: "2.1s",
              }}
            >
              <div className="marketeam-counter-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://polo-pecan-73837341.figma.site/_assets/v11/0b368c812d4d9bbbf84e4f4453b5fae6c6bbf451.png"
                  alt="Specialist"
                  className="w-[58px] h-[58px] rounded-full object-cover shadow-[0_0_20px_rgba(160,104,255,0.7)] border border-purple-300/40"
                />
              </div>
            </div>

            {/* Avatar 5: at 210deg, 399px radius, 58px, cyan glow */}
            <div
              className="absolute top-1/2 left-1/2 avatar-flyin pointer-events-auto"
              style={{
                transform: "translate(-50%, -50%) rotate(210deg) translate(399px) rotate(-210deg)",
                animationDelay: "1.7s",
              }}
            >
              <div className="marketeam-counter-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://polo-pecan-73837341.figma.site/_assets/v11/d4ad9b3c582531a787355cbe8309df73950bce08.png"
                  alt="Specialist"
                  className="w-[58px] h-[58px] rounded-full object-cover shadow-[0_0_20px_rgba(0,255,255,0.7)] border border-cyan-300/40"
                />
              </div>
            </div>
          </div>

          {/* ORBIT 3 (627px diameter, spins right 50s) */}
          <div
            className="orbit-circle-base marketeam-orbit-3 w-[627px] h-[627px]"
            style={{ pointerEvents: "none" }}
          >
            <div className="orbit-gradient-border" />

            {/* Avatar 3: at 90deg, 314px radius, 58px, yellow glow */}
            <div
              className="absolute top-1/2 left-1/2 avatar-flyin pointer-events-auto"
              style={{
                transform: "translate(-50%, -50%) rotate(90deg) translate(314px) rotate(-90deg)",
                animationDelay: "1.1s",
              }}
            >
              <div className="marketeam-counter-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://polo-pecan-73837341.figma.site/_assets/v11/faea9787ff9e47aa1f31f9fc069a7c36a88bdf21.png"
                  alt="Specialist"
                  className="w-[58px] h-[58px] rounded-full object-cover shadow-[0_0_20px_rgba(255,215,0,0.7)] border border-amber-300/40"
                />
              </div>
            </div>

            {/* Avatar 2: at 180deg, 314px radius, 58px, square border-radius 20px, purple glow */}
            <div
              className="absolute top-1/2 left-1/2 avatar-flyin pointer-events-auto"
              style={{
                transform: "translate(-50%, -50%) rotate(180deg) translate(314px) rotate(-180deg)",
                animationDelay: "0.9s",
              }}
            >
              <div className="marketeam-counter-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://polo-pecan-73837341.figma.site/_assets/v11/ce4ef8d4aa485df5832a82d02951e73708a3d606.png"
                  alt="Specialist"
                  className="w-[58px] h-[58px] rounded-[20px] object-cover shadow-[0_0_20px_rgba(160,104,255,0.7)] border border-purple-300/40"
                />
              </div>
            </div>
          </div>

          {/* ORBIT 2 (501px diameter, spins right 40s) */}
          <div
            className="orbit-circle-base marketeam-orbit-2 w-[501px] h-[501px]"
            style={{ pointerEvents: "none" }}
          >
            <div className="orbit-gradient-border" />

            {/* Large Avatar 7: at 60deg, 251px radius, 78px, pink glow */}
            <div
              className="absolute top-1/2 left-1/2 avatar-flyin pointer-events-auto"
              style={{
                transform: "translate(-50%, -50%) rotate(60deg) translate(251px) rotate(-60deg)",
                animationDelay: "1.5s",
              }}
            >
              <div className="marketeam-counter-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://polo-pecan-73837341.figma.site/_assets/v11/dc01064c7093dcc32674876ee3cf5e41c4a485c6.png"
                  alt="Specialist"
                  className="w-[78px] h-[78px] rounded-full object-cover shadow-[0_0_20px_rgba(255,105,180,0.7)] border border-pink-300/40"
                />
              </div>
            </div>

            {/* Avatar 4: at 300deg, 251px radius, 58px, square border-radius 20px, blue glow */}
            <div
              className="absolute top-1/2 left-1/2 avatar-flyin pointer-events-auto"
              style={{
                transform: "translate(-50%, -50%) rotate(300deg) translate(251px) rotate(-300deg)",
                animationDelay: "1.3s",
              }}
            >
              <div className="marketeam-counter-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://polo-pecan-73837341.figma.site/_assets/v11/d5470a58b02388336141575048720f19a50de832.png"
                  alt="Specialist"
                  className="w-[58px] h-[58px] rounded-[20px] object-cover shadow-[0_0_20px_rgba(0,191,255,0.7)] border border-sky-300/40"
                />
              </div>
            </div>
          </div>

          {/* ORBIT 1 (Innermost: 353px diameter, spins left 30s) */}
          <div
            className="orbit-circle-base marketeam-orbit-1 w-[353px] h-[353px]"
            style={{ pointerEvents: "none" }}
          >
            <div className="orbit-gradient-border" />

            {/* Center Circle Content: Animated "20k+" Count-Up and "Specialists" */}
            <div className="absolute inset-0 flex flex-col items-center justify-center marketeam-counter-1 select-none pointer-events-auto">
              <span className="font-urbanist text-[64px] font-medium text-white tracking-tight leading-none drop-shadow-[0_4px_16px_rgba(160,104,255,0.6)]">
                {specialistCount}k+
              </span>
              <span className="font-urbanist text-[16px] font-semibold text-gray-200 mt-1 uppercase tracking-wider">
                Specialists
              </span>
            </div>

            {/* Avatar 1: at 270deg, 177px radius, 58px, square border-radius 20px, purple glow */}
            <div
              className="absolute top-1/2 left-1/2 avatar-flyin pointer-events-auto"
              style={{
                transform: "translate(-50%, -50%) rotate(270deg) translate(177px) rotate(-270deg)",
                animationDelay: "0.6s",
              }}
            >
              <div className="marketeam-counter-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://polo-pecan-73837341.figma.site/_assets/v11/aa51718fb3af3637e6d666b6543fc27a175fada6.png"
                  alt="Specialist"
                  className="w-[58px] h-[58px] rounded-[20px] object-cover shadow-[0_0_20px_rgba(160,104,255,0.7)] border border-purple-300/40"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. LOGO TICKER STRIP (Bottom, 64px gap, 20s infinite scroll, fade masks)
         ========================================================================= */}
      <div className="w-full py-8 border-t border-white/10 backdrop-blur-md bg-black/25 relative z-20">
        <div className="ticker-mask-strip max-w-[1920px] mx-auto px-6">
          <div className="ticker-track-strip">
            {/* Repeat 4 times for seamless infinite loop */}
            {[...Array(4)].map((_, setIdx) => (
              <React.Fragment key={`ticker-set-${setIdx}`}>
                {TICKER_LOGOS.map((logoUrl, logoIdx) => (
                  <div
                    key={`logo-${setIdx}-${logoIdx}`}
                    className="w-[137px] h-[40px] shrink-0 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={logoUrl}
                      alt="Partner brand"
                      className="w-[137px] h-[40px] object-contain filter invert opacity-90"
                    />
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
