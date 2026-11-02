"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function VaultraAboutHeader() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return;
    }

    const handleCanPlay = () => {
      setVideoReady(true);
    };

    video.addEventListener("canplay", handleCanPlay);
    if (video.readyState >= 3) {
      setVideoReady(true);
    }

    const p = video.play();
    if (p && typeof p.catch === "function") {
      p.catch(() => {});
    }

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, []);

  return (
    <section className="vaultra-hero-root relative w-full overflow-hidden select-none bg-black text-white">
      {/* Fonts: Inter Display & Poppins */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600&display=swap"
      />

      <style jsx global>{`
        .vaultra-hero-root {
          min-height: 100svh;
          background: #000000;
          color: #ffffff;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding-top: clamp(80px, 12vh, 120px);
          padding-bottom: 40px;
          overflow: hidden;
        }

        /* GLOBE STAGE (rising from bottom with rim glows) */
        .globe-stage {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          overflow: hidden;
        }

        .globe-plate {
          position: absolute;
          bottom: -15%;
          left: 50%;
          transform: translateX(-50%);
          width: max(100vw, calc(100svh * 1.55));
          max-width: 1720px;
          aspect-ratio: 1672 / 941;
          mask-image: radial-gradient(ellipse 70% 60% at 50% 65%, #000 60%, transparent 100%),
                      linear-gradient(180deg, transparent 0%, #000 20%, #000 100%);
          -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 65%, #000 60%, transparent 100%),
                              linear-gradient(180deg, transparent 0%, #000 20%, #000 100%);
        }

        @media (max-width: 768px) {
          .globe-plate {
            bottom: -5%;
            width: max(130vw, 650px);
            mask-image: linear-gradient(180deg, transparent 5%, #000 30%, #000 100%);
            -webkit-mask-image: linear-gradient(180deg, transparent 5%, #000 30%, #000 100%);
          }
        }

        .globe-still {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center bottom;
          opacity: 1;
        }

        .globe-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center bottom;
          opacity: 0;
          transition: opacity 1.2s ease-in-out;
        }
        .globe-video.is-active {
          opacity: 1;
        }

        /* Radial Rim Glows */
        .globe-glow-overlay {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          height: 55%;
          background: radial-gradient(ellipse 65% 50% at 50% 90%, rgba(225, 29, 72, 0.22) 0%, rgba(59, 130, 246, 0.22) 45%, rgba(168, 85, 247, 0.18) 75%, transparent 100%);
          pointer-events: none;
          mix-blend-mode: screen;
          filter: blur(28px);
        }

        /* Thin Light Lines & Glass Coin Chips */
        .ambient-lines {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 2;
        }

        .glass-chip {
          position: absolute;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2);
          font-size: 11.5px;
          font-weight: 500;
          letter-spacing: -0.01em;
          color: rgba(255, 255, 255, 0.92);
          animation: floatChip 6s ease-in-out infinite alternate;
        }

        @keyframes floatChip {
          0% { transform: translateY(0px) rotate(0deg); }
          100% { transform: translateY(-8px) rotate(1deg); }
        }

        /* HERO CONTENT */
        .vaultra-hero-content {
          position: relative;
          z-index: 10;
          max-width: 940px;
          margin: 0 auto;
          text-align: center;
          padding: 0 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Glass Pill Badge */
        .vaultra-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 7px 16px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.25);
          font-size: 12.5px;
          font-weight: 500;
          letter-spacing: -0.01em;
          color: #f5f5f5;
          margin-bottom: 22px;
          transition: border-color 0.3s ease, background 0.3s ease;
        }
        .vaultra-pill:hover {
          border-color: rgba(255, 255, 255, 0.3);
          background: rgba(255, 255, 255, 0.09);
        }

        /* Headline: Inter Display 300 with pink-to-lilac gradient */
        .vaultra-h1 {
          font-family: 'Inter', sans-serif;
          font-weight: 300;
          font-size: clamp(34px, 5.4vw, 68px);
          line-height: 1.14;
          letter-spacing: -0.035em;
          margin: 0 0 18px 0;
          color: #ffffff;
        }

        .gradient-span {
          background: linear-gradient(90deg, #ffb3cb 0%, #ffffff 22%, #ffffff 78%, #e0c8ff 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline;
        }

        /* Subtitle */
        .vaultra-sub {
          max-width: 680px;
          font-size: clamp(14px, 1.45vw, 17px);
          font-weight: 400;
          line-height: 1.6;
          color: #c9c9c9;
          margin: 0 0 30px 0;
          letter-spacing: -0.01em;
        }

        /* CTAs */
        .vaultra-ctas {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .btn-white-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #ffffff;
          color: #050505;
          font-size: 14px;
          font-weight: 500;
          padding: 13px 26px;
          border-radius: 999px;
          text-decoration: none;
          box-shadow: 0 0 24px rgba(255, 255, 255, 0.25), 0 8px 18px rgba(0, 0, 0, 0.4);
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }
        .btn-white-pill:hover {
          transform: translateY(-2px);
          background: #f8f8f8;
          box-shadow: 0 0 32px rgba(255, 255, 255, 0.4), 0 12px 24px rgba(0, 0, 0, 0.5);
        }

        .btn-glass-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.06);
          color: #ededed;
          font-size: 14px;
          font-weight: 500;
          padding: 13px 24px;
          border-radius: 999px;
          text-decoration: none;
          border: 1px solid rgba(255, 255, 255, 0.16);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .btn-glass-pill:hover {
          border-color: rgba(255, 255, 255, 0.35);
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
        }

        /* Bottom Scroll Hint */
        .scroll-hint {
          position: absolute;
          bottom: 22px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          color: rgba(255, 255, 255, 0.45);
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          pointer-events: none;
        }
        .mouse-icon {
          width: 18px;
          height: 28px;
          border: 1.5px solid rgba(255, 255, 255, 0.35);
          border-radius: 12px;
          position: relative;
        }
        .mouse-wheel {
          width: 2.5px;
          height: 5px;
          background: rgba(255, 255, 255, 0.7);
          border-radius: 2px;
          position: absolute;
          top: 5px;
          left: 50%;
          transform: translateX(-50%);
          animation: mouseScroll 1.8s infinite;
        }
        @keyframes mouseScroll {
          0% { transform: translate(-50%, 0); opacity: 1; }
          100% { transform: translate(-50%, 8px); opacity: 0; }
        }

        /* 1.6s Staggered Entrance Animations */
        @keyframes vFadeRise {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .v-anim-1 { animation: vFadeRise 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both; }
        .v-anim-2 { animation: vFadeRise 1.3s cubic-bezier(0.16, 1, 0.3, 1) 0.32s both; }
        .v-anim-3 { animation: vFadeRise 1.3s cubic-bezier(0.16, 1, 0.3, 1) 0.50s both; }
        .v-anim-4 { animation: vFadeRise 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.68s both; }
        .v-anim-5 { animation: vFadeRise 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.85s both; }

        @media (prefers-reduced-motion: reduce) {
          .v-anim-1, .v-anim-2, .v-anim-3, .v-anim-4, .v-anim-5, .glass-chip {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
          .globe-video {
            display: none !important;
          }
        }
      `}</style>

      {/* AMBIENT LIGHT LINES & GLASS COIN / BADGE CHIPS */}
      <div className="ambient-lines" aria-hidden="true">
        {/* Left top chip: SEO Growth */}
        <div className="glass-chip v-anim-5 hidden sm:inline-flex" style={{ top: "28%", left: "7%", animationDelay: "0s" }}>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>+340% Traffic</span>
        </div>

        {/* Right top chip: PageSpeed */}
        <div className="glass-chip v-anim-5 hidden md:inline-flex" style={{ top: "34%", right: "8%", animationDelay: "1.2s" }}>
          <span className="text-amber-400">⚡</span>
          <span>98 PageSpeed</span>
        </div>

        {/* Left bottom chip: Tier-1 Markets */}
        <div className="glass-chip v-anim-5 hidden lg:inline-flex" style={{ bottom: "24%", left: "12%", animationDelay: "2.4s" }}>
          <span>🌐</span>
          <span>US · UK · Europe</span>
        </div>

        {/* Right bottom chip: #1 Rank */}
        <div className="glass-chip v-anim-5 hidden lg:inline-flex" style={{ bottom: "28%", right: "13%", animationDelay: "3.6s" }}>
          <span className="text-purple-400">📈</span>
          <span>#1 Map Pack</span>
        </div>
      </div>

      {/* GLOBE STAGE WITH DUAL STILL + LOOPING VIDEO */}
      <div
        className="globe-stage"
        role="img"
        aria-label="Huge dotted particle globe rising from the bottom with latitude rings and red, blue, magenta rim glows slowly spinning"
      >
        <div className="globe-plate">
          {/* Globe Still Image */}
          <img
            className="globe-still"
            src="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/f1631235-0a76-464d-8f1d-2c4b48a997d5.jpg"
            alt="Vaultra glowing particle globe"
            loading="eager"
          />

          {/* Globe Looping Video */}
          <video
            ref={videoRef}
            className={`globe-video ${videoReady ? "is-active" : ""}`}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            src="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/e71aea27-a808-4ae3-8231-a469d49285d4.mp4"
          />
        </div>

        {/* Rim Glow Overlay */}
        <div className="globe-glow-overlay" />
      </div>

      {/* HERO CONTENT CONTAINER */}
      <div className="vaultra-hero-content">
        {/* Glass Badge */}
        <div className="vaultra-pill v-anim-1">
          <span className="text-amber-400">⚡</span>
          <span>Revolutionizing Global Digital Growth</span>
        </div>

        {/* Headline with Soft Pink-to-Lilac Gradient */}
        <h1 className="vaultra-h1 v-anim-2">
          <span className="gradient-span">Innovative Digital Growth Solutions</span>
          <br />
          <span className="gradient-span">For Any Global Search Challenge</span>
        </h1>

        {/* Subtitle keeping Balaji Prime Media details */}
        <p className="vaultra-sub v-anim-3">
          We don&apos;t just focus on clicks — we engineer your entire organic acquisition ecosystem,
          from data-driven technical SEO and ultra-fast Next.js development to international media outreach.
        </p>

        {/* CTAs */}
        <div className="vaultra-ctas v-anim-4">
          <Link href="/contact" className="btn-white-pill">
            <span>Talk to Our Strategists</span>
            <span>→</span>
          </Link>
          <a href="#about-purpose" className="btn-glass-pill">
            <span>Explore Our Story</span>
          </a>
        </div>
      </div>

      {/* Mouse Scroll Hint */}
      <div className="scroll-hint v-anim-5">
        <div className="mouse-icon">
          <div className="mouse-wheel" />
        </div>
        <span>Scroll to Explore</span>
      </div>
    </section>
  );
}
