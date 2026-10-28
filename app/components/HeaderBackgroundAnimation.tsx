"use client";

import React, { useEffect, useState } from "react";

interface HeaderBackgroundAnimationProps {
  variant?: "hero" | "subpage" | "dark";
}

export default function HeaderBackgroundAnimation({
  variant = "subpage",
}: HeaderBackgroundAnimationProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = variant === "dark";
  const isHero = variant === "hero";

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-0"
      aria-hidden="true"
    >
      {/* 1. Primary Radiant Aurora Beacon (Center Warm Golden Glow) */}
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 rounded-full blur-[80px] sm:blur-[110px] will-change-transform ${
          isHero
            ? "w-[650px] sm:w-[950px] h-[400px] sm:h-[550px] opacity-75"
            : isDark
            ? "w-[600px] sm:w-[850px] h-[350px] sm:h-[480px] opacity-60"
            : "w-[550px] sm:w-[800px] h-[320px] sm:h-[450px] opacity-65"
        }`}
        style={{
          background: isDark
            ? "radial-gradient(circle at 50% 35%, rgba(217, 119, 6, 0.28) 0%, rgba(245, 158, 11, 0.16) 40%, rgba(29, 78, 216, 0.12) 70%, transparent 85%)"
            : "radial-gradient(circle at 50% 35%, rgba(245, 158, 11, 0.22) 0%, rgba(217, 119, 6, 0.16) 40%, rgba(29, 78, 216, 0.08) 70%, transparent 85%)",
          animation: "auroraPulseSlow 8s ease-in-out infinite alternate",
        }}
      />

      {/* 2. Floating Amber Gold Glow Orb (Left-Center) */}
      <div
        className={`absolute rounded-full blur-[60px] sm:blur-[85px] will-change-transform ${
          isHero
            ? "-top-10 left-[8%] w-[320px] sm:w-[480px] h-[320px] sm:h-[480px] opacity-60"
            : "-top-6 left-[5%] w-[260px] sm:w-[380px] h-[260px] sm:h-[380px] opacity-50"
        }`}
        style={{
          background:
            "radial-gradient(circle, rgba(217, 119, 6, 0.24) 0%, rgba(245, 158, 11, 0.12) 50%, transparent 80%)",
          animation: "ribbonFloat1 14s ease-in-out infinite alternate",
        }}
      />

      {/* 3. Floating Sapphire Royal Blue Glow Orb (Right-Center) */}
      <div
        className={`absolute rounded-full blur-[65px] sm:blur-[90px] will-change-transform ${
          isHero
            ? "top-6 right-[6%] w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] opacity-55"
            : "top-2 right-[4%] w-[280px] sm:w-[400px] h-[280px] sm:h-[400px] opacity-45"
        }`}
        style={{
          background:
            "radial-gradient(circle, rgba(29, 78, 216, 0.18) 0%, rgba(37, 99, 235, 0.1) 50%, rgba(217, 119, 6, 0.08) 75%, transparent 85%)",
          animation: "ribbonFloat2 16s ease-in-out infinite alternate",
        }}
      />

      {/* 4. Elegant Glowing Floating Rings / Halos */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[750px] h-[220px] sm:h-[320px] rounded-[100%] border border-amber-500/15 pointer-events-none"
        style={{
          boxShadow: "0 0 45px rgba(217, 119, 6, 0.08)",
          transform: "translate(-50%, -50%) rotate(-6deg)",
          animation: "ringFloat 18s ease-in-out infinite alternate",
        }}
      />

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[580px] h-[160px] sm:h-[240px] rounded-[100%] border border-blue-500/15 pointer-events-none"
        style={{
          boxShadow: "0 0 35px rgba(29, 78, 216, 0.06)",
          transform: "translate(-50%, -50%) rotate(8deg)",
          animation: "ringFloatCounter 20s ease-in-out infinite alternate",
        }}
      />

      {/* 5. Animated Flowing Wave Ribbons (SVG Waves with Glowing Gradients) */}
      <svg
        className="absolute top-0 left-0 w-full h-full opacity-40 sm:opacity-55"
        viewBox="0 0 1440 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="headerGoldWave" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d97706" stopOpacity="0" />
            <stop offset="35%" stopColor="#f59e0b" stopOpacity="0.45" />
            <stop offset="65%" stopColor="#d97706" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="headerBlueWave" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0" />
            <stop offset="40%" stopColor="#2563eb" stopOpacity="0.35" />
            <stop offset="70%" stopColor="#f59e0b" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Wave 1 */}
        <path
          d="M-100 120 C 300 240, 600 40, 1000 160 C 1200 220, 1400 100, 1600 140"
          stroke="url(#headerGoldWave)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          className="animate-wave-flow-1"
        />

        {/* Wave 2 */}
        <path
          d="M-100 200 C 250 80, 650 260, 1100 110 C 1300 60, 1450 180, 1600 130"
          stroke="url(#headerBlueWave)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          className="animate-wave-flow-2"
        />
      </svg>

      {/* 6. Animated Floating Stardust & Sparkle Dots */}
      {mounted && (
        <div className="absolute inset-0">
          {/* Sparkle 1 */}
          <div
            className="absolute top-[18%] left-[15%] w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_10px_#f59e0b] animate-sparkle-1"
            style={{ animationDelay: "0s" }}
          />
          {/* Sparkle 2 */}
          <div
            className="absolute top-[32%] right-[18%] w-2.5 h-2.5 rounded-full bg-amber-300 shadow-[0_0_12px_#fbbf24] animate-sparkle-2"
            style={{ animationDelay: "1.5s" }}
          />
          {/* Sparkle 3 */}
          <div
            className="absolute top-[55%] left-[22%] w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_#3b82f6] animate-sparkle-1"
            style={{ animationDelay: "2.8s" }}
          />
          {/* Sparkle 4 */}
          <div
            className="absolute top-[68%] right-[25%] w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_10px_#f59e0b] animate-sparkle-3"
            style={{ animationDelay: "0.8s" }}
          />
          {/* Sparkle 5 (Center-top star) */}
          <div
            className="absolute top-[12%] left-[52%] w-2.5 h-2.5 rounded-full bg-amber-200 shadow-[0_0_14px_#f59e0b] animate-sparkle-2"
            style={{ animationDelay: "3.2s" }}
          />
          {/* Sparkle 6 */}
          <div
            className="absolute top-[45%] left-[8%] w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#d97706] animate-sparkle-3"
            style={{ animationDelay: "4.1s" }}
          />
          {/* Sparkle 7 */}
          <div
            className="absolute top-[28%] right-[8%] w-2 h-2 rounded-full bg-blue-300 shadow-[0_0_10px_#60a5fa] animate-sparkle-1"
            style={{ animationDelay: "2.2s" }}
          />
        </div>
      )}

      {/* 7. Subtle Tech Grid Matrix Accent */}
      <div
        className="absolute inset-0 opacity-[0.035] sm:opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(#d97706 1px, transparent 1px), radial-gradient(#1d4ed8 1px, transparent 1px)",
          backgroundSize: "28px 28px, 56px 56px",
          backgroundPosition: "0 0, 14px 14px",
          maskImage:
            "radial-gradient(ellipse at 50% 30%, black 20%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 30%, black 20%, transparent 80%)",
        }}
      />
    </div>
  );
}
