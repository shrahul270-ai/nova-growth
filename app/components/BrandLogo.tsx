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
    size === "sm" ? "w-8 h-8" : size === "lg" ? "w-11 h-11" : "w-10 h-10";
  const mainTextSize =
    size === "sm"
      ? "text-sm sm:text-base"
      : size === "lg"
      ? "text-xl sm:text-2xl"
      : "text-[15px] sm:text-[17px]";
  const subTextSize =
    size === "sm" ? "text-[9px]" : size === "lg" ? "text-[11px]" : "text-[10px]";

  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-3 transition-transform duration-200 select-none ${className}`}
      aria-label="Balaji Prime Media Home"
    >
      {/* 3D Modern Geometric Prism Crest with Warm Golden Radiance */}
      <div className={`relative ${iconDimensions} shrink-0`}>
        {/* Ambient Pulsing Glow Aura */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-amber-500 via-yellow-500 to-amber-600 opacity-60 blur-[6px] group-hover:opacity-100 transition-opacity duration-300" />

        {/* Outer Faceted Glass Hexagon */}
        <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-[#091427] via-[#111f38] to-[#091427] p-[1.5px] border border-amber-300/40 shadow-md overflow-hidden flex items-center justify-center">
          <img
            src="/images/bpm-complete-logo.png"
            alt="Balaji Prime Media"
            className="w-full h-full object-contain p-1 relative z-10 transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_0_10px_rgba(245,158,11,0.6)]"
          />
        </div>
      </div>

      {/* Typography: Balaji Prime Media */}
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`${mainTextSize} font-black tracking-tight text-[#091427] group-hover:text-[#d97706] transition-colors`}
          >
            BALAJI PRIME
          </span>
        </div>

        {showTagline && (
          <div className="flex items-center gap-1.5 mt-1 leading-none">
            <span
              className={`${subTextSize} font-extrabold tracking-[0.25em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600`}
            >
              MEDIA
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_6px_#f59e0b] animate-pulse" />
          </div>
        )}
      </div>
    </Link>
  );
}
