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

// Marketeam Header Logo
const LOGO_URL =
  "https://polo-pecan-73837341.figma.site/_assets/v11/17ae538989a509947a8de3892c644664895e69b1.png";

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

// Full text for typewriter heading
const HEADLINE_TEXT =
  "Unlock Top Marketing Talent You Thought Was Out of Reach -- Now Just One Click Away!";
const BLACK_CHAR_LIMIT = 67; // First 67 chars in #000000, rest in #ffffff

// Custom CountUp Hook
function useCountUp(target: number = 20, durationMs: number = 2000, delayMs: number = 1200) {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const timer = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / durationMs, 1);
        // easeOutCubic
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
  // Typewriter state
  const [typedLength, setTypedLength] = useState<number>(0);
  const [typingComplete, setTypingComplete] = useState<boolean>(false);
  const specialistCount = useCountUp(20, 2000, 1200);

  // Typewriter logic: 35ms per char, starts after 400ms delay
  useEffect(() => {
    let currentIdx = 0;
    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        currentIdx++;
        setTypedLength(currentIdx);
        if (currentIdx >= HEADLINE_TEXT.length) {
          clearInterval(interval);
          setTypingComplete(true);
        }
      }, 35);

      return () => clearInterval(interval);
    }, 400);

    return () => clearTimeout(startTimeout);
  }, []);

  const blackSegment = HEADLINE_TEXT.slice(0, Math.min(typedLength, BLACK_CHAR_LIMIT));
  const whiteSegment =
    typedLength > BLACK_CHAR_LIMIT
      ? HEADLINE_TEXT.slice(BLACK_CHAR_LIMIT, typedLength)
      : "";

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
          1. NAVBAR (User's Official BPM Navbar & Logo with Log In + Join Now buttons)
         ========================================================================= */}
      <div className="relative z-50 w-full animate-mark-fade-down">
        <Navbar activePage="home" onJoinClick={onOpenConsultation} />
      </div>

      {/* =========================================================================
          2. HERO MAIN CONTENT: Left Column (Headline & CTAs) | Right Column (Orbits)
         ========================================================================= */}
      <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-12 lg:px-16 pt-6 sm:pt-10 pb-12 flex-1 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 relative z-20">
        
        {/* HERO LEFT (flex: 0 1 600px, padding-top: 40px) */}
        <div className="w-full lg:max-w-[620px] lg:flex-[0_1_600px] lg:pt-10 flex flex-col items-start animate-mark-fade-up">
          {/* TYPEWRITER HEADLINE: Urbanist 64px, weight 600, line-height 64px, letter-spacing -1.5px */}
          <h1
            className="font-urbanist text-[34px] sm:text-[46px] lg:text-[64px] font-semibold leading-[1.08] lg:leading-[64px] tracking-[-1.5px] min-h-[160px] sm:min-h-[190px] lg:min-h-[260px]"
          >
            <span className="text-black">{blackSegment}</span>
            <span className="text-white">{whiteSegment}</span>
            {/* Blinking Purple Cursor during/after typing */}
            <span className="inline-block w-1 h-[0.85em] bg-[#A068FF] ml-1 align-baseline animate-pulse" />
          </h1>

          {/* Action Row: Start Project Button + David Cursor */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-6 relative w-full">
            {/* START PROJECT BUTTON (Appears with delay 3.2s) */}
            <div
              className={`btn-border-wrap transition-opacity duration-700 ${
                typingComplete ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              style={{
                transitionDelay: "3200ms",
              }}
            >
              <button
                type="button"
                onClick={onOpenConsultation}
                className="marketeam-start-btn"
              >
                <span>Start Project</span>
                {/* 18x18 Right-Arrow Chevron SVG */}
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

            {/* CURSOR ELEMENT: Purple Pointer Arrow + "David" Pill Badge (Delay 3.6s) */}
            <div
              className={`inline-flex items-center gap-1.5 transition-all duration-700 ${
                typingComplete ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{
                transitionDelay: "3600ms",
              }}
            >
              {/* Purple pointer arrow filled #A068FF */}
              <svg
                className="w-5 h-5 -rotate-45 drop-shadow-[0_2px_8px_rgba(160,104,255,0.8)]"
                viewBox="0 0 24 24"
                fill="#A068FF"
              >
                <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
              </svg>

              {/* David pill badge */}
              <div className="bg-[#A068FF] text-white text-[15px] sm:text-[16px] font-medium px-4 py-2 rounded-[20px] shadow-[0_4px_16px_rgba(160,104,255,0.5)]">
                David
              </div>
            </div>
          </div>

          {/* =========================================================================
              CRITICAL: TALK WITH LEADERSHIP FROSTED CARD ("and ye mat hatana")
              Preserved in full fidelity with user portrait and interactive click
             ========================================================================= */}
          <div
            onClick={onOpenConsultation}
            className="mt-8 sm:mt-10 flex items-center gap-3.5 sm:gap-4 rounded-2xl bg-white/10 p-3 sm:p-3.5 backdrop-blur-xl border border-white/20 hover:border-[#A068FF]/70 shadow-2xl max-w-sm w-full cursor-pointer hover:bg-white/15 transition-all hover:scale-[1.02] active:scale-[0.99] group"
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
                animationDelay: "1.4s",
              }}
            >
              <div className="marketeam-counter-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://polo-pecan-73837341.figma.site/_assets/v11/c76d8a0b99676de31c014344bfaf75bad090758d.png"
                  alt="Specialist"
                  className="w-[58px] h-[58px] rounded-full object-cover shadow-[0_0_20px_rgba(160,104,255,0.7)] border border-purple-300/40"
                />
              </div>
            </div>

            {/* Avatar 7: at 95deg, 399px radius, 88px, square border-radius 24px, orange glow */}
            <div
              className="absolute top-1/2 left-1/2 avatar-flyin pointer-events-auto"
              style={{
                transform: "translate(-50%, -50%) rotate(95deg) translate(399px) rotate(-95deg)",
                animationDelay: "1.9s",
              }}
            >
              <div className="marketeam-counter-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://polo-pecan-73837341.figma.site/_assets/v11/7b1b5f039de7b54cc9913e96c1923c3b15a157fa.png"
                  alt="Specialist"
                  className="w-[88px] h-[88px] rounded-[24px] object-cover shadow-[0_0_24px_rgba(255,140,0,0.7)] border border-amber-300/40"
                />
              </div>
            </div>

            {/* Avatar 8: at 220deg, 399px radius, 88px, square border-radius 24px, pink glow */}
            <div
              className="absolute top-1/2 left-1/2 avatar-flyin pointer-events-auto"
              style={{
                transform: "translate(-50%, -50%) rotate(220deg) translate(399px) rotate(-220deg)",
                animationDelay: "2.1s",
              }}
            >
              <div className="marketeam-counter-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://polo-pecan-73837341.figma.site/_assets/v11/9ae171d8895199349755c43fbff00e122221a027.png"
                  alt="Specialist"
                  className="w-[88px] h-[88px] rounded-[24px] object-cover shadow-[0_0_24px_rgba(255,105,180,0.7)] border border-pink-300/40"
                />
              </div>
            </div>

            {/* Avatar 9: at 320deg, 399px radius, 58px, round, purple glow */}
            <div
              className="absolute top-1/2 left-1/2 avatar-flyin pointer-events-auto"
              style={{
                transform: "translate(-50%, -50%) rotate(320deg) translate(399px) rotate(-320deg)",
                animationDelay: "2.3s",
              }}
            >
              <div className="marketeam-counter-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://polo-pecan-73837341.figma.site/_assets/v11/926c9eb7b4bc1df846fa0e39f0b0dc3fefd80671.png"
                  alt="Specialist"
                  className="w-[58px] h-[58px] rounded-full object-cover shadow-[0_0_20px_rgba(160,104,255,0.7)] border border-purple-300/40"
                />
              </div>
            </div>
          </div>

          {/* ORBIT 3 (649px diameter, spins right 50s) */}
          <div
            className="orbit-circle-base marketeam-orbit-3 w-[649px] h-[649px]"
            style={{ pointerEvents: "none" }}
          >
            <div className="orbit-gradient-border" />

            {/* Avatar 5: at 130deg, 325px radius, 88px, round, pink glow */}
            <div
              className="absolute top-1/2 left-1/2 avatar-flyin pointer-events-auto"
              style={{
                transform: "translate(-50%, -50%) rotate(130deg) translate(325px) rotate(-130deg)",
                animationDelay: "1.6s",
              }}
            >
              <div className="marketeam-counter-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://polo-pecan-73837341.figma.site/_assets/v11/018736aa5d0275c4ce56cfebaf2ae3007d81ca1e.png"
                  alt="Specialist"
                  className="w-[88px] h-[88px] rounded-full object-cover shadow-[0_0_24px_rgba(255,105,180,0.7)] border border-pink-300/40"
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

            {/* Avatar 2: at 60deg, 251px radius, 58px, round, yellow glow */}
            <div
              className="absolute top-1/2 left-1/2 avatar-flyin pointer-events-auto"
              style={{
                transform: "translate(-50%, -50%) rotate(60deg) translate(251px) rotate(-60deg)",
                animationDelay: "0.8s",
              }}
            >
              <div className="marketeam-counter-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://polo-pecan-73837341.figma.site/_assets/v11/ca755f7f93c1126fb8bdbf99ab364a33aa9ab272.png"
                  alt="Specialist"
                  className="w-[58px] h-[58px] rounded-full object-cover shadow-[0_0_20px_rgba(255,214,0,0.7)] border border-yellow-300/40"
                />
              </div>
            </div>

            {/* Avatar 3: at 180deg, 251px radius, 78px, round, pink glow */}
            <div
              className="absolute top-1/2 left-1/2 avatar-flyin pointer-events-auto"
              style={{
                transform: "translate(-50%, -50%) rotate(180deg) translate(251px) rotate(-180deg)",
                animationDelay: "1.1s",
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
