"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

export default function DesignProHero() {
  const handleScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("marketplace");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-screen min-h-[680px] overflow-hidden bg-black select-none flex flex-col justify-between">
      {/* Background Video (Layer 0) */}
      <video
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_105406_16f4600d-7a92-4292-b96e-b19156c7830a.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Content Container (Layer 10, max-w-7xl centered) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8 h-full flex flex-col justify-between pt-28 sm:pt-32 md:pt-36 pb-8 sm:pb-12 md:pb-14">
        {/* Top Section (Right-aligned badge) */}
        <div className="flex items-center justify-end w-full">
          <div className="px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/15 backdrop-blur-md">
            <p className="text-white/90 text-xs sm:text-sm font-medium">
              8000+ Talented Designers Launched !
            </p>
          </div>
        </div>

        {/* Hero Section (Center: Tag, Headline in Home Size, Subtitle Below, CTA) */}
        <div className="flex flex-col items-center text-center my-auto py-6 sm:py-10">
          {/* Small uppercase tag above heading */}
          <span className="text-white/80 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3 sm:mb-4">
            Seats for Next Program Opening Soon
          </span>

          {/* Main Heading (Matched to home page Balaji text size: 32px to 82px) */}
          <h1 className="font-sans font-medium tracking-tight leading-[1.08] text-[32px] sm:text-[46px] md:text-[58px] lg:text-[72px] xl:text-[82px] select-none text-center">
            <span className="text-white">Become </span>
            <span className="animate-shiny-text">Product Leader.</span>
          </h1>

          {/* Subtitle placed below Become Product Leader */}
          <p className="text-white/85 text-sm sm:text-base leading-relaxed max-w-md sm:max-w-xl mt-4 sm:mt-5 text-center font-normal">
            We deliver transformative programs that empower emerging product designers with
            cutting-edge expertise and vision to thrive globally.
          </p>

          {/* CTA Button */}
          <a
            href="#marketplace"
            onClick={handleScroll}
            className="group mt-7 sm:mt-8 inline-flex items-center gap-3 bg-black hover:bg-gray-900 text-white font-medium text-sm md:text-base px-6 md:px-8 py-3 md:py-4 rounded-full border border-white/20 hover:border-white/40 transition-all duration-300 shadow-2xl cursor-pointer"
          >
            <span>Apply for Next Enrollment</span>
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-white transition-transform duration-300 group-hover:translate-x-1.5" />
          </a>
        </div>

        {/* Empty bottom spacer for balanced flex distribution */}
        <div className="w-full hidden lg:block h-2" />
      </div>
    </section>
  );
}
