"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./Navbar";

interface PromptHeroProps {
  onOpenConsultation?: () => void;
}

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_065045_c44942da-53c6-4804-b734-f9e07fc22e08.mp4";

// Logos for infinite marquee
const MARQUEE_LOGOS = [
  { name: "Vortex", letter: "V", color: "from-indigo-500 to-purple-500" },
  { name: "Nimbus", letter: "N", color: "from-sky-500 to-blue-500" },
  { name: "Prysma", letter: "P", color: "from-purple-500 to-pink-500" },
  { name: "Cirrus", letter: "C", color: "from-amber-400 to-rose-500" },
  { name: "Kynder", letter: "K", color: "from-emerald-400 to-teal-500" },
  { name: "Halcyn", letter: "H", color: "from-violet-500 to-indigo-500" },
];

export default function PromptHero({ onOpenConsultation }: PromptHeroProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoOpacity, setVideoOpacity] = useState<number>(0);

  // Custom JS-controlled fade loop: 0.5s fade-in at start, 0.5s fade-out at end
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animId: number;
    const FADE_DURATION = 0.5; // seconds

    const updateFade = () => {
      if (!video) return;
      const currentTime = video.currentTime;
      const duration = video.duration || 10;

      if (currentTime < FADE_DURATION) {
        // Fade in
        const op = Math.min(1, currentTime / FADE_DURATION);
        setVideoOpacity(op);
      } else if (currentTime > duration - FADE_DURATION) {
        // Fade out
        const op = Math.max(0, (duration - currentTime) / FADE_DURATION);
        setVideoOpacity(op);
      } else {
        setVideoOpacity(1);
      }

      if (!video.paused && !video.ended) {
        animId = requestAnimationFrame(updateFade);
      }
    };

    const handlePlay = () => {
      animId = requestAnimationFrame(updateFade);
    };

    const handleEnded = () => {
      setVideoOpacity(0);
      setTimeout(() => {
        if (video) {
          video.currentTime = 0;
          video.play().catch(() => {});
        }
      }, 100);
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("timeupdate", updateFade);
    video.addEventListener("ended", handleEnded);

    // Initial play attempt
    video.play().catch(() => {});

    return () => {
      cancelAnimationFrame(animId);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("timeupdate", updateFade);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <div
      id="home"
      className="relative w-full min-h-screen overflow-hidden flex flex-col justify-between select-none"
      style={{
        backgroundColor: "hsl(260, 87%, 3%)",
        color: "hsl(40, 6%, 95%)",
      }}
    >
      {/* =========================================================================
          BACKGROUND VIDEO (Layer 0, absolute inset-0, JS controlled opacity)
         ========================================================================= */}
      <video
        ref={videoRef}
        src={VIDEO_URL}
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-100"
        style={{ opacity: videoOpacity }}
      />

      {/* =========================================================================
          BLURRED OVERLAY SHAPE (Layer 1, centered behind content, w-[984px] h-[527px])
         ========================================================================= */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[984px] max-w-[95vw] h-[527px] opacity-90 bg-gray-950 blur-[82px] pointer-events-none z-0"
      />

      {/* =========================================================================
          1. NAVBAR (Layer 20, Full width, py-5 px-8, Divider with gradient)
         ========================================================================= */}
      <div className="relative z-30 w-full">
        <Navbar activePage="home" onJoinClick={onOpenConsultation} />
      </div>

      {/* =========================================================================
          2. HERO CONTENT (Layer 10, vertically centered in remaining space via flex-1)
         ========================================================================= */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8 py-10 sm:py-14 my-auto overflow-visible">
        
        {/* Main Giant Headline: "Power AI" text-[220px], General Sans */}
        <h1
          className="font-normal tracking-[-0.024em] leading-[1.02] text-[75px] sm:text-[130px] md:text-[175px] lg:text-[220px] select-none"
          style={{ fontFamily: "'General Sans', system-ui, sans-serif" }}
        >
          <span style={{ color: "hsl(40, 6%, 95%)" }}>Power </span>
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(to left, #6366f1, #a855f7, #fcd34d)",
              WebkitBackgroundClip: "text",
            }}
          >
            AI
          </span>
        </h1>

        {/* Subtitle: "The most powerful AI ever deployed in talent acquisition" */}
        <p
          className="text-base sm:text-lg leading-8 max-w-md sm:max-w-lg mt-[9px] text-center"
          style={{
            color: "hsl(40, 6%, 82%)",
            opacity: 0.85,
          }}
        >
          The most powerful AI ever deployed in organic search &amp; talent acquisition
        </p>

        {/* =========================================================================
            USER REQUESTED ACTION ROW:
            1. "Start Project >" button + "< Balaji Prime Media" cursor (from Image 1)
           ========================================================================= */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-5 relative z-20">
          
          {/* Start Project Button */}
          <div className="btn-border-wrap shrink-0">
            <button
              type="button"
              onClick={onOpenConsultation}
              className="marketeam-start-btn cursor-pointer shadow-[0_0_24px_rgba(160,104,255,0.45)] hover:shadow-[0_0_35px_rgba(160,104,255,0.7)]"
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

          {/* Purple pointer arrow + Balaji Prime Media Cursor Badge */}
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
        </div>

        {/* =========================================================================
            USER REQUESTED: TALK WITH LEADERSHIP FROSTED CARD (from Image 2)
           ========================================================================= */}
        <div
          onClick={onOpenConsultation}
          className="mt-8 flex items-center gap-3.5 sm:gap-4 rounded-2xl bg-white/[0.08] p-3 sm:p-3.5 backdrop-blur-xl border border-white/20 hover:border-[#A068FF]/70 shadow-2xl max-w-sm w-full cursor-pointer hover:bg-white/[0.14] transition-all hover:scale-[1.02] active:scale-[0.99] text-left group"
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
          {/* Card Thumbnail Graphic */}
          <div className="relative h-16 w-16 rounded-xl overflow-hidden shrink-0 border border-white/30 bg-[#070319]/80 shadow-md flex items-center justify-center p-1">
            <Image
              src="/images/leadership-card-source.png"
              alt="Balaji Prime Media Leadership"
              width={64}
              height={64}
              unoptimized
              className="object-cover w-full h-full rounded-lg group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Verbatim Content from user's image */}
          <div className="flex flex-col gap-1 pr-1 font-inter">
            <span className="text-[14.5px] sm:text-[15.5px] font-bold text-white tracking-tight group-hover:text-[#A068FF] transition-colors">
              Talk with Leadership
            </span>
            <span className="font-mono text-[9.5px] sm:text-[10px] uppercase tracking-[0.14em] text-[#38bdf8] font-bold">
              BALAJI PRIME MEDIA ADVISORY
            </span>
            <p className="text-[11px] sm:text-[11.5px] text-gray-300 leading-tight my-0.5">
              Direct 1-on-1 organic growth strategy for high-intent queries.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. LOGO MARQUEE (Pinned to bottom of hero, pb-10, max-w-5xl mx-auto)
         ========================================================================= */}
      <div className="relative z-20 w-full pb-8 sm:pb-10 pt-4 border-t border-white/10 backdrop-blur-sm bg-black/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-12">
          
          {/* Left Side: Static Text */}
          <div className="text-left shrink-0">
            <p
              className="text-xs sm:text-sm font-medium leading-tight whitespace-nowrap"
              style={{ color: "hsla(40, 6%, 95%, 0.55)" }}
            >
              Relied on by brands <br className="hidden sm:inline" /> across the globe
            </p>
          </div>

          {/* Right Side: Infinite Scrolling Marquee with Liquid-Glass Logos */}
          <div className="flex-1 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
            <div className="flex items-center gap-12 sm:gap-16 w-max animate-marquee">
              {/* Duplicate array twice for seamless continuous loop */}
              {[...MARQUEE_LOGOS, ...MARQUEE_LOGOS, ...MARQUEE_LOGOS, ...MARQUEE_LOGOS].map(
                (item, idx) => (
                  <div
                    key={`marquee-${idx}`}
                    className="flex items-center gap-3 shrink-0 opacity-80 hover:opacity-100 transition-opacity"
                  >
                    {/* Liquid-Glass 24x24 Rounded-lg Icon */}
                    <div className="liquid-glass w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs text-white shadow-xs">
                      <span className={`bg-gradient-to-tr ${item.color} bg-clip-text text-transparent font-extrabold`}>
                        {item.letter}
                      </span>
                    </div>

                    {/* Brand Name in text-base font-semibold */}
                    <span
                      className="text-sm sm:text-base font-semibold tracking-tight"
                      style={{ color: "hsl(40, 6%, 95%)" }}
                    >
                      {item.name}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Keyframe animation for marquee */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 20s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
