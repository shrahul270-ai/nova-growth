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



export default function PromptHero({ onOpenConsultation }: PromptHeroProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoOpacity, setVideoOpacity] = useState<number>(0);
  const [shouldLoadVideo, setShouldLoadVideo] = useState<boolean>(false);

  // Defer heavy background video on desktop only (>=768px); use CSS ambient glow on mobile for 95+ PageSpeed
  useEffect(() => {
    const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;
    const isSaveData =
      typeof navigator !== "undefined" && (navigator as any).connection?.saveData;

    if (isDesktop && !isSaveData) {
      const timer = setTimeout(() => {
        setShouldLoadVideo(true);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, []);

  // Custom JS-controlled fade loop: 0.5s fade-in at start, 0.5s fade-out at end
  useEffect(() => {
    if (!shouldLoadVideo) return;
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

    video.play().catch(() => {});

    return () => {
      cancelAnimationFrame(animId);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("timeupdate", updateFade);
      video.removeEventListener("ended", handleEnded);
    };
  }, [shouldLoadVideo]);

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
          BACKGROUND VIDEO (Lightweight: Deferred on desktop, ambient CSS glow on mobile)
         ========================================================================= */}
      {shouldLoadVideo ? (
        <video
          ref={videoRef}
          src={VIDEO_URL}
          autoPlay
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-300"
          style={{ opacity: videoOpacity }}
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(160,104,255,0.2),transparent_70%)] pointer-events-none"
        />
      )}

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
        
        {/* Eyebrow Brand Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs sm:text-sm font-medium mb-5 backdrop-blur-md shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#A068FF] animate-pulse" />
          <span>Balaji Prime Media</span>
          <span className="text-purple-400/40">•</span>
          <span className="text-slate-300">Global Digital Growth Agency</span>
        </div>

        {/* Main Service-Driven Headline (H1 for SEO) */}
        <h1
          className="font-bold tracking-[-0.024em] leading-[1.12] text-[32px] sm:text-[46px] md:text-[56px] lg:text-[68px] xl:text-[76px] select-none text-center max-w-5xl"
          style={{ fontFamily: "'General Sans', system-ui, sans-serif" }}
        >
          <span style={{ color: "hsl(40, 6%, 95%)" }}>
            SEO, Guest Posting &amp;{" "}
          </span>
          <br className="hidden sm:inline" />
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(to right, #6366f1, #a855f7, #fcd34d)",
              WebkitBackgroundClip: "text",
            }}
          >
            Web Development Agency
          </span>
        </h1>

        {/* Subtitle with core services and overseas focus */}
        <p
          className="text-sm sm:text-base leading-relaxed max-w-md sm:max-w-2xl mt-4 text-center"
          style={{
            color: "hsl(40, 6%, 82%)",
            opacity: 0.9,
          }}
        >
          Scale your organic traffic, high-DA backlink authority, and conversion-ready Next.js web platforms for US, UK, and global markets.
        </p>

        {/* =========================================================================
            USER REQUESTED ACTION ROW:
            1. "Scale Your Traffic >" button (links to /guest-posting) + "< Balaji Prime Media" cursor
           ========================================================================= */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-5 relative z-20">
          
          {/* Scale Your Traffic Button (Links to /guest-posting) */}
          <div className="btn-border-wrap shrink-0">
            <Link
              href="/guest-posting"
              className="marketeam-start-btn cursor-pointer shadow-[0_0_24px_rgba(160,104,255,0.45)] hover:shadow-[0_0_35px_rgba(160,104,255,0.7)]"
            >
              <span>Scale Your Traffic</span>
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
            </Link>
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

    </div>
  );
}
