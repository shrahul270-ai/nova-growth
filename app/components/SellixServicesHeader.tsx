"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const GLOBAL_COUNTRIES = [
  { code: "US", name: "United States", flag: "🇺🇸", city: "New York • SF", pos: "top-[16%] left-[6%] sm:left-[10%]" },
  { code: "UK", name: "United Kingdom", flag: "🇬🇧", city: "London", pos: "top-[22%] right-[8%] sm:right-[14%]" },
  { code: "CA", name: "Canada", flag: "🇨🇦", city: "Toronto • Vancouver", pos: "bottom-[28%] left-[8%] sm:left-[12%]" },
  { code: "EU", name: "Germany & EU", flag: "🇪🇺", city: "Berlin • Zurich", pos: "bottom-[22%] right-[6%] sm:right-[12%]" },
  { code: "AU", name: "Australia", flag: "🇦🇺", city: "Sydney • Melbourne", pos: "top-[48%] left-[4%] sm:left-[6%]" },
  { code: "AE", name: "UAE & Gulf", flag: "🇦🇪", city: "Dubai • Abu Dhabi", pos: "top-[46%] right-[4%] sm:right-[8%]" },
  { code: "IN", name: "India HQ", flag: "🇮🇳", city: "Global Delivery", pos: "bottom-[10%] left-1/2 -translate-x-1/2" },
];

export default function SellixServicesHeader() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => setVideoLoaded(true);
    video.addEventListener("canplay", handleCanPlay);
    if (video.readyState >= 3) {
      setVideoLoaded(true);
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
    <section className="relative w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 flex flex-col items-center justify-center text-center overflow-hidden bg-[#04020e] select-none">
      
      {/* =========================================================================
          1. 3D ROTATING EARTH BACKGROUND SHOWING ALL GLOBAL COUNTRIES
         ========================================================================= */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        
        {/* Globe Still Fallback Image */}
        <img
          src="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/f1631235-0a76-464d-8f1d-2c4b48a997d5.jpg"
          alt="Global Earth network showing all international countries"
          className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.88] contrast-[1.12]"
        />

        {/* Looping 3D Particle Earth Video (Shows spinning Earth with glowing continents & latitude paths) */}
        <video
          ref={videoRef}
          src="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/e71aea27-a808-4ae3-8231-a469d49285d4.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
            videoLoaded ? "opacity-95" : "opacity-0"
          }`}
          style={{ mixBlendMode: "screen" }}
        />

        {/* Volumetric Atmospheric Lens Glows (Electric Violet, Cyan & Deep Indigo) */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] rounded-full pointer-events-none opacity-60 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(160, 104, 255, 0.4) 0%, rgba(34, 211, 238, 0.25) 40%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        {/* Dark Vignettes for Maximum Text Legibility with clear Earth visibility */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#04020e]/75 via-[#04020e]/35 to-[#04020e]/90 pointer-events-none z-10"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-radial from-transparent via-[#04020e]/25 to-[#04020e]/90 pointer-events-none z-10"
          aria-hidden="true"
        />
      </div>

      {/* =========================================================================
          2. FLOATING GLOBAL COUNTRY NETWORK BADGES AROUND THE EARTH
         ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none z-15 overflow-hidden hidden sm:block">
        {GLOBAL_COUNTRIES.map((country, idx) => (
          <div
            key={country.code}
            className={`absolute ${country.pos} flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0a0520]/80 border border-purple-500/30 backdrop-blur-md shadow-[0_4px_20px_rgba(160,104,255,0.25)] animate-pulse`}
            style={{
              animationDuration: `${3.5 + (idx % 3)}s`,
              animationDelay: `${idx * 0.4}s`,
            }}
          >
            <span className="text-sm">{country.flag}</span>
            <div className="flex flex-col text-left">
              <span className="text-[11px] font-bold text-white leading-tight">
                {country.name}
              </span>
              <span className="text-[9px] text-[#22d3ee] font-mono leading-tight">
                {country.city}
              </span>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          </div>
        ))}
      </div>

      {/* =========================================================================
          3. HERO CONTENT CONTAINER
         ========================================================================= */}
      <div className="relative z-20 w-full max-w-4xl mx-auto flex flex-col items-center">
        {/* Subtle Category Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.08] border border-purple-500/40 text-purple-200 text-xs font-semibold mb-5 backdrop-blur-md shadow-lg shadow-purple-950/50">
          <span className="w-2 h-2 rounded-full bg-[#22d3ee] animate-pulse" />
          <span>🌍 Global Cross-Border Digital Services Directory</span>
        </div>

        {/* Master Heading */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[68px] font-extrabold tracking-tight text-white leading-[1.12] max-w-3xl mx-auto drop-shadow-sm">
          <span>Balaji Prime </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#22d3ee] via-[#A068FF] to-[#fcd34d]">
            Media Services
          </span>
        </h1>

        {/* Descriptive Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-slate-200 max-w-2xl mx-auto mt-4 sm:mt-5 leading-relaxed font-normal px-2">
          Full-funnel digital growth, enterprise web engineering, high-DA backlink
          acquisitions, and algorithmic search optimization serving clients across the US, UK, Europe, Australia, and worldwide.
        </p>

        {/* Action CTAs */}
        <div className="mt-8 sm:mt-10 flex flex-col min-[440px]:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md px-4">
          <a
            href="#services-grid"
            className="group w-full min-[440px]:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-white/[0.1] hover:bg-white/[0.18] text-white font-semibold text-xs sm:text-sm border border-purple-500/40 hover:border-cyan-400/60 backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all hover:shadow-[0_0_25px_rgba(34,211,238,0.35)] cursor-pointer"
          >
            <span>Explore 12 Services</span>
            <svg
              className="w-3.5 h-3.5 text-cyan-300 group-hover:translate-x-0.5 transition-transform"
              viewBox="0 0 12 10"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M0.8 5h10M7.1 1.4 10.9 5l-3.8 3.6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          <Link
            href="/contact"
            className="group w-full min-[440px]:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-white font-semibold text-xs sm:text-sm shadow-xl shadow-purple-950/80 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #A068FF 0%, #7928CA 60%, #4F46E5 100%)",
            }}
          >
            <span>Book Strategy Call</span>
            <svg
              className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 transition-transform"
              viewBox="0 0 12 10"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M0.8 5h10M7.1 1.4 10.9 5l-3.8 3.6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
