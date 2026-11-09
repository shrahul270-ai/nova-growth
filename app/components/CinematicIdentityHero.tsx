"use client";

import React from "react";
import Link from "next/link";

export default function CinematicIdentityHero() {
  return (
    <section className="echo-hero relative w-full min-h-screen min-h-[100svh] overflow-hidden select-none bg-gradient-to-b from-[#0a0522] via-[#070319] to-[#040112] text-white isolate flex flex-col justify-between">
      {/* Preconnect and Fonts: Sora & JetBrains Mono */}
      <link rel="preconnect" href="https://d8j0ntlcm91z4.cloudfront.net" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500&family=Sora:wght@200;300;400;600;700&display=swap"
      />

      <style jsx global>{`
        :root {
          --echo-font-display: "Sora", system-ui, -apple-system, sans-serif;
          --echo-font-mono: "JetBrains Mono", ui-monospace, "SF Mono", monospace;
        }

        .echo-hero {
          min-height: 100vh;
          min-height: 100svh;
          font-family: var(--echo-font-display);
        }

        /* Dual Gradient Scrim Overlay on Video - Blending into Footer Dark Purple Palette */
        .echo-scrim {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background: 
            linear-gradient(to right, transparent 0%, transparent 40%, rgba(7, 3, 25, 0.55) 68%, rgba(10, 5, 34, 0.95) 100%),
            linear-gradient(to bottom, rgba(10, 5, 34, 0.65) 0%, transparent 25%, transparent 75%, rgba(7, 3, 25, 0.9) 100%);
        }

        @media (max-width: 720px) {
          .echo-scrim {
            background: linear-gradient(to bottom, rgba(10, 5, 34, 0.6) 0%, rgba(7, 3, 25, 0.4) 30%, rgba(4, 1, 18, 0.95) 100%);
          }
        }

        /* Reduced Motion Fallback */
        @media (prefers-reduced-motion: reduce) {
          .echo-video {
            display: none !important;
          }
          .echo-media-fallback {
            background-image: url("https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260806_132328_5f9029c8-218f-4489-82b6-29ff2849920e.png");
            background-size: cover;
            background-position: center;
          }
        }
      `}</style>

      {/* Edge-to-Edge Media Layer with Footer Background Tone */}
      <div className="echo-media-layer echo-media-fallback absolute inset-0 -z-10 bg-gradient-to-b from-[#0a0522] via-[#070319] to-[#040112] overflow-hidden">
        <video
          className="echo-video w-full h-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260806_132328_5f9029c8-218f-4489-82b6-29ff2849920e.png"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260806_133255_956f653f-5d80-4b06-abd5-0f46c98b60fa.mp4"
            type="video/mp4"
          />
        </video>
        {/* Scrim Dual Gradient Overlay */}
        <div className="echo-scrim" />
      </div>

      {/* Ambient Cosmic Purple & Violet Circular Glows (matching footer and image) */}
      <div 
        className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(168,85,247,0.18)_0%,rgba(139,92,246,0.08)_45%,transparent_70%)] pointer-events-none -z-5 blur-2xl" 
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(139,92,246,0.15)_0%,transparent_65%)] pointer-events-none -z-5 blur-2xl" 
        aria-hidden="true" 
      />

      {/* Row 1: Top spacing for overlaid transparent Navbar */}
      <div className="w-full pt-[clamp(76px,10vh,100px)] pointer-events-none" />

      {/* Row 2: Right-aligned Identity Showcase */}
      <div className="relative z-10 w-full flex-1 flex items-center justify-end max-md:justify-center px-[clamp(20px,5vw,100px)] py-6 sm:py-10 overflow-visible">
        <div className="w-[min(42vw,680px)] min-w-[340px] max-lg:w-[min(75vw,560px)] max-sm:w-full max-sm:min-w-0 flex flex-col items-start text-left">
          
          {/* 1) Glowing Chip: [ DIGITAL IDENTITY ] */}
          <div
            className="inline-flex items-center gap-2 text-[clamp(11px,0.72vw,13px)] tracking-[0.22em] uppercase text-purple-200 bg-purple-950/70 border border-purple-500/40 px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.3)] backdrop-blur-md"
            style={{ fontFamily: 'var(--echo-font-mono)' }}
          >
            <span className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_#c084fc] animate-pulse" />
            <span>Digital Identity</span>
          </div>

          {/* 2) H1: Balaji Prime Media (Exact Multi-color gradient as requested) */}
          <h1
            className="text-[clamp(42px,5.4vw,88px)] font-bold tracking-tight leading-[1.05] mt-5 sm:mt-6"
            style={{ fontFamily: 'var(--echo-font-display)' }}
          >
            <span className="text-white">Balaji </span>
            <span className="text-[#fbbf24]">P</span>
            <span className="bg-gradient-to-r from-[#fb7185] via-[#e879f9] to-[#c084fc] bg-clip-text text-transparent">rime </span>
            <span className="bg-gradient-to-r from-[#a855f7] via-[#818cf8] to-[#93c5fd] bg-clip-text text-transparent">Media</span>
          </h1>

          {/* 3) Exact Subtitle from the provided image */}
          <p
            className="text-[clamp(14px,1.1vw,18px)] font-normal text-slate-300 mt-3 sm:mt-4 leading-relaxed max-w-xl"
            style={{ fontFamily: 'var(--echo-font-display)' }}
          >
            The most powerful AI ever deployed in organic search &amp; digital growth
          </p>

          {/* 4) Clean Action CTAs (Email input completely removed) */}
          <div className="w-full mt-7 sm:mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:brightness-110 active:scale-[0.98] text-white text-xs sm:text-sm font-bold py-3.5 px-7 rounded-full shadow-[0_0_24px_rgba(168,85,247,0.5)] transition-all cursor-pointer"
            >
              <span>Talk to Our Strategists</span>
              <span>→</span>
            </Link>
            <Link
              href="/admin"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 active:scale-[0.98] text-white/90 hover:text-white border border-purple-400/30 hover:border-purple-400/60 text-xs sm:text-sm font-semibold py-3.5 px-6 rounded-full backdrop-blur-md transition-all cursor-pointer"
            >
              <span>Access Client Portal</span>
            </Link>
          </div>

          {/* 5) Direct Strategy Session Link */}
          <Link
            href="/schedule-meeting"
            className="mt-5 text-xs sm:text-[13px] font-medium tracking-wide text-purple-300/80 hover:text-purple-200 hover:underline underline-offset-4 transition-colors flex items-center gap-1.5"
          >
            <span>⚡ Book an Instant Strategy Call with Leadership</span>
            <span>→</span>
          </Link>

        </div>
      </div>

      {/* Row 3: Legal Footer (Pinned to bottom with Footer border & style) */}
      <footer
        className="relative z-10 w-full border-t border-purple-500/20 py-4 px-[clamp(20px,5vw,100px)] text-center bg-black/20 backdrop-blur-sm"
      >
        <p
          className="text-xs sm:text-[13px] font-normal text-slate-400 leading-relaxed max-w-4xl mx-auto"
          style={{ fontFamily: 'var(--echo-font-display)' }}
        >
          Connecting with Balaji Prime Media signals that you accept our{" "}
          <Link
            href="/privacy-policy"
            className="text-purple-300 underline underline-offset-[3px] decoration-purple-400/50 hover:text-white transition-colors"
          >
            Privacy Notice
          </Link>{" "}
          and{" "}
          <Link
            href="/terms"
            className="text-purple-300 underline underline-offset-[3px] decoration-purple-400/50 hover:text-white transition-colors"
          >
            Service Contract
          </Link>
          .
        </p>
      </footer>
    </section>
  );
}
