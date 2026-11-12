"use client";

import React, { useState, useRef, useEffect } from "react";
import Hls from "hls.js";

interface VexorBlogHeroProps {
  onSearch?: (query: string) => void;
  searchQuery?: string;
}

export default function VexorBlogHero({}: VexorBlogHeroProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Setup HLS video streaming with graceful MP4 fallback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const hlsSrc = "https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8";
    const mp4Fallback = "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/f6f4ec49-d5dd-4893-8eb4-fa0f932aceaf.mp4";

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 60,
      });
      hls.loadSource(hlsSrc);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
        setVideoLoaded(true);
      });
      hls.on(Hls.Events.ERROR, () => {
        // Fallback to MP4 on HLS network issue
        if (!video.src) {
          video.src = mp4Fallback;
          video.play().catch(() => {});
        }
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Native Apple HLS (Safari iOS/macOS)
      video.src = hlsSrc;
      video.addEventListener("loadedmetadata", () => {
        video.play().catch(() => {});
        setVideoLoaded(true);
      });
    } else {
      video.src = mp4Fallback;
      video.play().catch(() => {});
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, []);

  const scrollToArticles = () => {
    const el = document.getElementById("articles-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-screen min-h-[700px] lg:min-h-[800px] bg-black text-white flex flex-col justify-end overflow-hidden selection:bg-[#A068FF] selection:text-white">
      {/* =========================================================================
          FULL-SCREEN HLS VIDEO BACKGROUND
         ========================================================================= */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/03c58212-3a59-4c80-b19d-30d05a174563.webp"
        className={`absolute inset-0 w-full h-full object-cover z-0 pointer-events-none scale-[1.03] transition-opacity duration-1000 ${
          videoLoaded ? "opacity-90" : "opacity-75"
        }`}
      />

      {/* Top Glassmorphic Vignette (Comfortable backdrop for floating Navbar) */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-44 z-[1] pointer-events-none bg-gradient-to-b from-black/85 via-black/40 to-transparent"
      />

      {/* Bottom-Left Ambient Vignette (Ensures Bottom-Left Hero Content is Crystal Clear) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at bottom left, rgba(7,3,25,0.92) 0%, rgba(10,5,34,0.75) 45%, rgba(0,0,0,0.35) 75%, transparent 100%),
            linear-gradient(to top, #070319 0%, rgba(7,3,25,0.7) 25%, transparent 60%)
          `,
        }}
      />

      {/* Subtle Purple Aurora Glow on the Left */}
      <div
        aria-hidden="true"
        className="absolute bottom-12 left-0 w-[600px] h-[400px] bg-[radial-gradient(circle_at_bottom_left,rgba(160,104,255,0.2)_0%,transparent_70%)] pointer-events-none z-[2]"
      />

      {/* =========================================================================
          HERO CONTENT POSITIONED IN BOTTOM-LEFT CORNER
         ========================================================================= */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pb-10 sm:pb-14 lg:pb-16 flex flex-col justify-end items-start text-left">
        <div className="max-w-3xl space-y-4 sm:space-y-5">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-purple-400/35 backdrop-blur-md shadow-lg shadow-purple-950/40">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#d8b4fe]">
              Balaji Prime Media // Editorial Dispatch
            </span>
            <span className="text-white/20">|</span>
            <span className="text-[10.5px] font-medium text-slate-300">Live Field Manuals</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
            The Growth <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-white via-purple-100 to-[#A068FF] bg-clip-text text-transparent">
              Journal.
            </span>
          </h1>

          {/* Subcopy */}
          <p className="text-sm sm:text-base md:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl drop-shadow-md">
            Actionable search engine optimization field manuals, international DR 50–90+ link engineering frameworks, and technical Core Web Vitals blueprints tested across 200+ partner brands.
          </p>

          {/* Quick Metrics / Quality Proof Tags */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-[11px] sm:text-xs text-slate-300 font-medium">
            <span className="flex items-center gap-1.5">
              <span className="text-[#A068FF]">●</span> 200+ Growth Case Studies
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-[#A068FF]">●</span> Verified DR 50–90+ Outreach
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-[#A068FF]">●</span> Google Core Update Blueprints
            </span>
          </div>
        </div>
      </div>

      {/* Seamless Transition Border to Articles Section */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pb-3">
        <div className="flex items-center justify-between border-t border-white/10 pt-3 text-[11px] text-slate-400">
          <span className="font-semibold text-white tracking-widest text-[11px]">BPM // EDITORIAL ARCHIVE</span>
          <button
            onClick={scrollToArticles}
            className="text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>Scroll down to read</span>
            <span>↓</span>
          </button>
        </div>
      </div>
    </section>
  );
}
