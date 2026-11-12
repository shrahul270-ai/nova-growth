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

          {/* Precision SVG Brand Monogram Symbol */}
          <svg
            className="w-[62%] h-[62%] relative z-10 text-white transition-transform duration-300 group-hover:scale-110"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Ambient Back Glow */}
            <path
              d="M20 3L35 11.5V28.5L20 37L5 28.5V11.5L20 3Z"
              stroke="url(#bpm_grad_border)"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {/* Bold Stylized Stylus / Apex "B" Peak */}
            <path
              d="M14 11H23C26.3137 11 29 13.6863 29 17C29 19.3486 27.6534 21.3789 25.708 22.3784C27.098 23.4795 28 25.1843 28 27.1C28 30.3585 25.3585 33 22.1 33H14V11Z"
              fill="url(#bpm_grad_fill)"
            />
            {/* Inner Futuristic Cutout Geometric Angles */}
            <path
              d="M18 15H22C23.1046 15 24 15.8954 24 17C24 18.1046 23.1046 19 22 19H18V15Z"
              fill="#060214"
            />
            <path
              d="M18 23H21.5C22.8807 23 24 24.1193 24 25.5C24 26.8807 22.8807 28 21.5 28H18V23Z"
              fill="#060214"
            />
            {/* Cyber Cyan Accent Ray */}
            <path
              d="M20 5L32 12V28L20 35"
              stroke="url(#bpm_cyan_ray)"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <defs>
              <linearGradient
                id="bpm_grad_border"
                x1="5"
                y1="3"
                x2="35"
                y2="37"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#A068FF" />
                <stop offset="0.5" stopColor="#7c3aed" />
                <stop offset="1" stopColor="#22d3ee" />
              </linearGradient>
              <linearGradient
                id="bpm_grad_fill"
                x1="14"
                y1="11"
                x2="29"
                y2="33"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FFFFFF" />
                <stop offset="0.6" stopColor="#E9D5FF" />
                <stop offset="1" stopColor="#c084fc" />
              </linearGradient>
              <linearGradient
                id="bpm_cyan_ray"
                x1="20"
                y1="5"
                x2="32"
                y2="35"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#22d3ee" />
                <stop offset="1" stopColor="#06b6d4" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
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
