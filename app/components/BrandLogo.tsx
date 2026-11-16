"use client";

import React from "react";
import Link from "next/link";

interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
}

export default function BrandLogo({
  className = "",
  size = "md",
  showTagline = true,
}: BrandLogoProps) {
  const iconDimensions =
    size === "sm" ? "w-8 h-8" : size === "lg" ? "w-12 h-12" : "w-10 h-10";
  const mainTextSize =
    size === "sm"
      ? "text-sm sm:text-base"
      : size === "lg"
      ? "text-xl sm:text-2xl"
      : "text-[15px] sm:text-[17px]";
  const subTextSize =
    size === "sm" ? "text-[8.5px]" : size === "lg" ? "text-[11px]" : "text-[9.5px]";

  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-3 transition-transform duration-200 select-none ${className}`}
      aria-label="Balaji Prime Media Home"
    >
      {/* 3D Modern Geometric Prism Crest */}
      <div className={`relative ${iconDimensions} shrink-0`}>
        {/* Ambient Pulsing Glow Aura */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-[#7c3aed] via-[#A068FF] to-[#22d3ee] opacity-70 blur-[7px] group-hover:opacity-100 transition-opacity duration-300" />

        {/* Outer Faceted Glass Hexagon */}
        <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-[#130733] via-[#09031c] to-[#04010d] p-[1.5px] border border-white/25 shadow-xl overflow-hidden flex items-center justify-center">
          {/* Inner Prismatic Gradient Backplate */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(160,104,255,0.45),transparent_70%)]" />

          {/* Official Current Logo Image with High-Definition Glow */}
          <img
            src="/images/bpm-complete-logo.png"
            alt="Balaji Prime Media"
            className="w-full h-full object-contain p-1 relative z-10 transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_0_14px_rgba(160,104,255,0.7)]"
          />
        </div>
      </div>

      {/* Typography: Balaji Prime Media */}
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`${mainTextSize} font-black tracking-tight text-white group-hover:text-[#f3e8ff] transition-colors`}
          >
            BALAJI PRIME
          </span>
        </div>

        {showTagline && (
          <div className="flex items-center gap-1.5 mt-1 leading-none">
            <span
              className={`${subTextSize} font-extrabold tracking-[0.28em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#c084fc] via-[#d8b4fe] to-[#22d3ee]`}
            >
              MEDIA
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#22d3ee] shadow-[0_0_8px_#22d3ee] animate-pulse" />
          </div>
        )}
      </div>
    </Link>
  );
}
