"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Navbar from "./Navbar";
import { ChevronRight, ArrowUpRight } from "lucide-react";

interface PromptHeroProps {
  onOpenConsultation?: () => void;
}

const marqueeLogos = [
  { name: "Vortex", letter: "V" },
  { name: "Nimbus", letter: "N" },
  { name: "Prysma", letter: "P" },
  { name: "Cirrus", letter: "C" },
  { name: "Kynder", letter: "K" },
  { name: "Halcyn", letter: "H" },
];

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260729_102822_0e6c87e8-c141-4744-bf32-ad30db296371.mp4";

const PORTRAIT_URL =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260728_050334_5b076e26-0ce7-4898-b432-d764190e448f.png&w=1280&q=85";

export default function PromptHero({ onOpenConsultation }: PromptHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Ensure video autoplays smoothly on all browsers
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Retry playback on user interaction if browser policy requires
          const resume = () => {
            video.play();
            window.removeEventListener("touchstart", resume);
            window.removeEventListener("click", resume);
          };
          window.addEventListener("touchstart", resume, { once: true });
          window.addEventListener("click", resume, { once: true });
        });
      }
    }
  }, []);

  return (
    <div
      id="home"
      className="relative min-h-screen flex flex-col overflow-hidden bg-[#E9EEF3] text-[#154359] selection:bg-[#154359]/20 selection:text-[#154359]"
    >
      {/* 1. CINEMATIC VIDEO BACKGROUND OVER LIGHT GRAY-BLUE PALETTE (#E9EEF3) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Subtle dot matrix grid matching design plate */}
        <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
        
        {/* Ambient warm golden orb glow in corner */}
        <div className="absolute bottom-12 left-8 w-80 h-80 rounded-full bg-amber-400/15 blur-3xl pointer-events-none" />
        <div className="absolute top-24 right-10 w-96 h-96 rounded-full bg-sky-300/15 blur-3xl pointer-events-none" />

        <video
          ref={videoRef}
          playsInline
          muted
          autoPlay
          loop
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-75 sm:opacity-85 pointer-events-none"
        >
          <source src="/hero.mp4" type="video/mp4" />
          <source src={VIDEO_URL} type="video/mp4" />
        </video>

        {/* Soft edge gradient to blend seamlessly into #E9EEF3 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#E9EEF3]/30 via-transparent to-[#E9EEF3]/70 pointer-events-none" />
      </div>

      {/* 2. NAVBAR (Preserved intact with full logo and links, wrapped in high-contrast header bar) */}
      <div className="relative z-50 bg-[#091427]/95 backdrop-blur-md border-b border-white/10 shadow-sm">
        <Navbar activePage="home" />
      </div>

      {/* 3. HERO CONTENT WRAPPER */}
      <div className="relative z-10 flex-1 flex flex-col justify-between max-w-7xl mx-auto w-full px-5 sm:px-8 md:px-12 pt-16 sm:pt-20 pb-10 sm:pb-14">
        
        {/* Top Row: Service List (Left) + Intro Copy (Right) */}
        <div className="flex flex-col sm:row items-start justify-between gap-8 pt-2">
          
          {/* Left: Service List Chips */}
          <div className="flex flex-col gap-2.5">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-[#154359] font-medium flex items-center gap-2">
              <span className="text-[#185B7B] font-bold">/</span> AI AUTOMATION &amp; SEO
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-[#154359] font-medium flex items-center gap-2">
              <span className="text-[#185B7B] font-bold">/</span> HIGH-DR OUTREACH DOMINANCE
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-[#154359] font-medium flex items-center gap-2">
              <span className="text-[#185B7B] font-bold">/</span> NEXT.JS 15 WEB ENGINEERING
            </span>
          </div>

          {/* Right: Intro Paragraph */}
          <div className="max-w-xs sm:text-right">
            <p className="text-base sm:text-lg leading-relaxed text-[#154359]/85 font-light">
              We design search intelligence and automation that brings clarity, precision, and efficiency to the way your company scales.
            </p>
          </div>
        </div>

        {/* Bottom Row: Left Badges & Large Headline | Right Glass Contact Card */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 sm:gap-10 mt-12 sm:mt-18">
          
          {/* Left Column: Left-Accent Badge + H1 + CTAs */}
          <div className="max-w-2xl">
            {/* Left-Accent Badge */}
            <div className="inline-flex items-center gap-2 border-l-2 border-[#154359] bg-white/80 px-3.5 py-1.5 backdrop-blur-md font-mono text-[11px] uppercase tracking-[0.15em] text-[#154359] shadow-sm mb-5 rounded-r-[3px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>We Scale 100+ Global Businesses</span>
            </div>

            {/* H1 Headline: Balaji Prime Media */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.05] tracking-tight text-[#154359]">
              Balaji Prime <br />
              <span className="font-light italic text-[#185B7B]">Media</span>
            </h1>

            {/* Supporting Brand Subline */}
            <p className="mt-4 text-sm sm:text-base text-[#475569] max-w-lg leading-relaxed font-light">
              Balaji Prime Media empowers enterprise brands and overseas startups with white-hat search authority and exponential organic revenue acquisition.
            </p>

            {/* Single Schedule Button */}
            <div className="mt-7 flex items-center">
              <button
                type="button"
                onClick={onOpenConsultation}
                className="rounded-full bg-[#154359] text-white px-7 py-3.5 text-xs sm:text-sm font-semibold hover:bg-[#091427] transition-all flex items-center gap-2 shadow-lg cursor-pointer hover:scale-105 active:scale-95 group"
              >
                <span>Schedule a Consult</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: Frosted Card ("Talk with Leadership") */}
          <div
            onClick={onOpenConsultation}
            className="flex items-center gap-4 rounded-xl bg-white/85 p-3.5 backdrop-blur-md border border-slate-200/80 shadow-lg max-w-sm w-full sm:w-auto cursor-pointer hover:bg-white hover:shadow-xl transition-all hover:scale-[1.02]"
            title="Schedule Consultation with Leadership"
          >
            {/* Portrait Image */}
            <div className="relative h-24 w-20 rounded-lg overflow-hidden shrink-0 border border-slate-200 bg-slate-100">
              <Image
                src={PORTRAIT_URL}
                alt="Leadership Advisor, Balaji Prime Media"
                fill
                unoptimized
                className="object-cover"
              />
            </div>

            {/* Contact details */}
            <div className="flex flex-col gap-1 pr-2">
              <span className="text-sm font-semibold text-[#154359] tracking-tight">
                Talk with Leadership
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#185B7B] font-medium">
                Balaji Prime Media Advisory
              </span>
              <p className="text-[11.5px] text-[#475569] leading-tight my-0.5">
                Direct 1-on-1 organic growth strategy for high-intent queries.
              </p>
            </div>
          </div>

        </div>

        {/* Pinned Marquee at bottom */}
        <div className="mt-12 sm:mt-16 pt-5 border-t border-slate-300/60">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 overflow-hidden">
            <div className="text-xs font-mono tracking-[0.15em] uppercase text-[#154359]/70 whitespace-nowrap text-center md:text-left shrink-0">
              Trusted by 100+ Enterprise Brands Worldwide
            </div>

            <div className="flex-1 w-full overflow-hidden relative [mask-image:linear-gradient(to_right,transparent,#E9EEF3_10%,#E9EEF3_90%,transparent)]">
              <div className="animate-marquee-scroll flex items-center gap-16">
                {marqueeLogos.map((item, idx) => (
                  <div key={`m1-${idx}`} className="flex items-center gap-2.5 shrink-0 opacity-80 hover:opacity-100 transition-opacity">
                    <div className="w-6 h-6 rounded-md bg-white border border-slate-200 shadow-xs flex items-center justify-center text-[10px] font-bold text-[#154359]">
                      {item.letter}
                    </div>
                    <span className="text-sm font-medium text-[#154359] tracking-tight">
                      {item.name}
                    </span>
                  </div>
                ))}

                {marqueeLogos.map((item, idx) => (
                  <div key={`m2-${idx}`} className="flex items-center gap-2.5 shrink-0 opacity-80 hover:opacity-100 transition-opacity">
                    <div className="w-6 h-6 rounded-md bg-white border border-slate-200 shadow-xs flex items-center justify-center text-[10px] font-bold text-[#154359]">
                      {item.letter}
                    </div>
                    <span className="text-sm font-medium text-[#154359] tracking-tight">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
