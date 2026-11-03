"use client";

import React from "react";

export default function LiquidGlassProjectsHero() {
  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("projects-grid");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden select-none bg-black">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260511_230229_7c9bc431-46cf-489a-948d-e8144d8eb5d4.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Hero content (bottom-left) */}
      <div className="absolute bottom-0 left-0 z-20 px-6 sm:px-12 pb-10 sm:pb-16 max-w-2xl">
        <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-medium leading-tight tracking-tight mb-4">
          Live Better, Feel Whole Every Day
        </h1>
        <p className="text-white/60 text-sm leading-relaxed mb-7 max-w-md font-normal">
          Take charge of how you feel with a companion built for your journey—build routines, follow
          your growth, and unlock tailored insights for a steadier, more vibrant life each day.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="#projects-grid"
            onClick={scrollToProjects}
            className="bg-white text-black text-sm sm:text-base font-medium px-6 sm:px-7 py-3 rounded-full hover:bg-white/90 transition-colors shadow-lg cursor-pointer"
          >
            Start Today
          </a>
          <a
            href="#projects-grid"
            onClick={scrollToProjects}
            className="liquid-glass text-white text-sm sm:text-base font-medium px-6 sm:px-7 py-3 rounded-full hover:bg-white/5 transition-colors cursor-pointer"
          >
            Discover How
          </a>
        </div>
      </div>
    </section>
  );
}
