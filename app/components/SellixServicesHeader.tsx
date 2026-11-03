"use client";

import React from "react";
import Link from "next/link";

export default function SellixServicesHeader() {
  return (
    <section className="relative w-full min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] pt-28 sm:pt-36 pb-14 sm:pb-20 px-4 sm:px-6 flex flex-col items-center justify-center text-center overflow-hidden bg-[#07050E] select-none">
      {/* 1. Ambient Cosmic Background Glows */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[680px] lg:w-[900px] h-[340px] sm:h-[500px] rounded-full pointer-events-none -z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(168, 85, 247, 0.22) 0%, rgba(99, 102, 241, 0.15) 45%, transparent 70%)",
          filter: "blur(70px)",
        }}
        aria-hidden="true"
      />

      <div
        className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#07050E] via-[#07050E]/80 to-transparent pointer-events-none z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#09080E] to-transparent pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* 2. High-Performance Hardware-Accelerated Video Layer (Single Loop, Zero JS Overhead) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/82e7eb75-c65f-490a-99b5-f3d1cad54200.webp"
          className="w-full h-full object-cover object-center opacity-45 sm:opacity-55 brightness-90 contrast-110"
          aria-hidden="true"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260912_104036_bd6924f6-3c8e-417e-8465-6d03c8c2e9e6.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#07050E]/60 to-[#07050E]" />
      </div>

      {/* 3. Hero Content Container (Guaranteed 100% Visible & Rendered Instantly) */}
      <div className="relative z-20 w-full max-w-4xl mx-auto flex flex-col items-center">
        {/* Subtle Category Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.06] border border-[#a855f7]/30 text-[#c084fc] text-xs font-semibold mb-4 sm:mb-5 backdrop-blur-xs shadow-inner">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c084fc] animate-pulse" />
          <span>Full-Stack Agency Directory</span>
        </div>

        {/* Master Heading: Balaji Prime Media Services */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[68px] font-extrabold tracking-tight text-white leading-[1.12] max-w-3xl mx-auto drop-shadow-sm">
          <span>Balaji Prime </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#818cf8] via-[#c084fc] to-[#fcd34d]">
            Media Services
          </span>
        </h1>

        {/* Descriptive Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-white/85 max-w-2xl mx-auto mt-4 sm:mt-5 leading-relaxed font-normal px-2">
          Full-funnel digital growth, enterprise web engineering, high-DA backlink
          acquisitions, and algorithmic search optimization for ambitious global brands.
        </p>

        {/* Action CTAs: Tap-friendly & Responsive */}
        <div className="mt-7 sm:mt-9 flex flex-col min-[440px]:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md px-4">
          <a
            href="#services-grid"
            className="w-full min-[440px]:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white text-[#09080E] font-bold text-xs sm:text-sm hover:bg-slate-100 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-purple-950/60 cursor-pointer"
          >
            <span>Explore 12 Services</span>
            <svg
              className="w-3.5 h-3.5 text-black"
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
            className="w-full min-[440px]:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-white font-semibold text-xs sm:text-sm border border-white/20 hover:border-white/40 backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Book Strategy Call</span>
            <svg
              className="w-3.5 h-3.5 text-purple-300"
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
