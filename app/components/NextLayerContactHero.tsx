"use client";

import React from "react";
import Link from "next/link";

export default function NextLayerContactHero() {
  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("contact-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-screen min-h-[720px] overflow-hidden bg-[#050505] select-none flex flex-col justify-between font-manrope">
      {/* Background Plate & Video */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover object-center"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260808_112712_da9d53df-6d27-4b12-bdf6-aa9dc2622bdf.mp4"
          autoPlay
          muted
          loop
          playsInline
        />

        {/* Bottom Fade Gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, 
              rgba(5,5,5,0) 65%, 
              rgba(5,5,5,0.3) 76%, 
              rgba(5,5,5,0.65) 83%, 
              rgba(5,5,5,0.85) 89%, 
              rgba(5,5,5,0.96) 95%, 
              #050505 100%)`,
          }}
        />

        {/* Side Letterbox Gradient (Subtle Edge Vignette) */}
        <div
          className="absolute inset-0 pointer-events-none hidden md:block"
          style={{
            background: `linear-gradient(to right, 
              rgba(5,5,5,0.8) 0%, 
              rgba(5,5,5,0.3) 12%, 
              transparent 25%, 
              transparent 75%, 
              rgba(5,5,5,0.3) 88%, 
              rgba(5,5,5,0.8) 100%)`,
          }}
        />
      </div>

      {/* Top Spacer to balance transparent navbar */}
      <div className="relative z-10 w-full h-24 sm:h-28" />

      {/* Hero Content (Left-Anchored Desktop, Responsive Column) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-8 md:px-12 my-auto">
        <div className="max-w-2xl text-left">
          {/* Main Headline */}
          <h1 className="text-[#fafafa] font-normal tracking-tight text-4xl sm:text-6xl md:text-7xl lg:text-[76px] leading-[1.08] mb-5 sm:mb-6">
            <span className="block">The Next Layer</span>
            <span className="block">of Intelligence</span>
          </h1>

          {/* Subcopy */}
          <p className="text-[#a7a6a6] font-normal text-base sm:text-lg md:text-[19px] leading-relaxed max-w-xl mb-8 sm:mb-9">
            <span className="block">
              A unified digital infrastructure platform to help teams build,
            </span>
            <span className="block">
              rank, and scale high-authority search presence with confidence.
            </span>
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-5 sm:gap-7">
            {/* White Pill CTA */}
            <a
              href="#contact-form"
              onClick={scrollToForm}
              className="inline-flex items-center justify-center bg-white text-[#050505] font-semibold text-sm sm:text-base px-8 py-3.5 rounded-full hover:bg-white/90 hover:scale-[1.02] transition-all shadow-2xl cursor-pointer"
            >
              <span>Schedule Discovery Call</span>
            </a>

            {/* Ghost Link */}
            <Link
              href="/projects"
              className="text-white hover:text-[#a7a6a6] font-medium text-sm sm:text-base transition-colors cursor-pointer"
            >
              View Architecture &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Partner Logos Strip */}
      <div className="relative z-10 w-full px-5 sm:px-8 pb-8 sm:pb-10 pt-4">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-[#8b8a8a] opacity-75">
          {/* Logo 1 */}
          <div className="flex items-center gap-2.5">
            <svg className="w-5 h-5 text-[#8b8a8a]" viewBox="0 0 30 31" fill="currentColor">
              <path d="M15 2C7.82 2 2 7.82 2 15s5.82 13 13 13 13-5.82 13-13S22.18 2 15 2zm0 18c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
            </svg>
            <span className="font-bold tracking-tight text-sm text-[#8b8a8a]">logoipsum</span>
          </div>

          {/* Logo 2 */}
          <div className="flex items-center gap-2.5">
            <svg className="w-5 h-5 text-[#8b8a8a]" viewBox="0 0 25 30" fill="currentColor">
              <path d="M12.5 2C6.7 2 2 6.7 2 12.5S6.7 23 12.5 23 23 18.3 23 12.5 18.3 2 12.5 2zm0 14c-1.9 0-3.5-1.6-3.5-3.5S10.6 9 12.5 9s3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z" />
            </svg>
            <span className="font-bold tracking-tight text-sm text-[#8b8a8a]">
              logoipsum<span className="inline-block w-1.5 h-1.5 rounded-full bg-[#8b8a8a] ml-0.5" />
            </span>
          </div>

          {/* Logo 3 */}
          <div className="flex items-center gap-2.5">
            <svg className="w-5 h-5 text-[#8b8a8a]" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="14" cy="14" r="10" />
              <path d="M14 4a10 10 0 0 1 0 20" />
            </svg>
            <span className="font-bold tracking-tight text-sm text-[#8b8a8a]">logoipsum</span>
          </div>

          {/* Logo 4 */}
          <div className="flex items-center gap-2.5">
            <svg className="w-5 h-5 text-[#8b8a8a]" viewBox="0 0 28 25.5" fill="currentColor">
              <path d="M14 2L2 22h24L14 2zm0 6l7 12H7l7-12z" />
            </svg>
            <span className="font-bold tracking-tight text-sm text-[#8b8a8a]">logoipsum</span>
          </div>
        </div>
      </div>
    </section>
  );
}
