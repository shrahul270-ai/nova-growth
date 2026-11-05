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
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Smooth scroll-scrubbing effect
  useEffect(() => {
    let animId: number;
    let targetTime = 0;
    let currentTime = 0;

    const handleScroll = () => {
      const video = videoRef.current;
      if (!video || !video.duration) return;

      const scrollY = window.scrollY;
      const scrubRange = Math.max(1, window.innerHeight * 1.6);
      const progress = Math.min(1, Math.max(0, scrollY / scrubRange));

      targetTime = progress * (video.duration - 0.05);

      // If user scrolls past 20px, pause autoplay to let scroll control the playback
      if (scrollY > 20 && !video.paused) {
        video.pause();
      }
    };

    const updateFrame = () => {
      const video = videoRef.current;
      if (video && video.duration && window.scrollY > 20) {
        currentTime += (targetTime - currentTime) * 0.14;
        if (Math.abs(video.currentTime - currentTime) > 0.03) {
          video.currentTime = currentTime;
        }
      }
      animId = requestAnimationFrame(updateFrame);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    animId = requestAnimationFrame(updateFrame);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      id="home"
      className="relative min-h-screen flex flex-col overflow-hidden bg-[#0a0a0a] text-white selection:bg-white/20 selection:text-white"
    >
      {/* 1. CINEMATIC SCROLL-SCRUBBED VIDEO BACKGROUND (Fixed full-bleed layer) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Soft dark underlay */}
        <div className="absolute inset-0 bg-[#0a0a0a]" />

        <video
          ref={videoRef}
          src={VIDEO_URL}
          playsInline
          muted
          autoPlay
          loop
          preload="auto"
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            isVideoLoaded ? "opacity-75 sm:opacity-85" : "opacity-0"
          }`}
        />

        {/* Cinematic Vignette & Soft Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-[#0a0a0a]/90 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(10,10,10,0.7)_100%)] pointer-events-none" />
      </div>

      {/* 2. NAVBAR (Kept intact with full logo and active links) */}
      <div className="relative z-50">
        <Navbar activePage="home" />
      </div>

      {/* 3. HERO CONTENT WRAPPER */}
      <div className="relative z-10 flex-1 flex flex-col justify-between max-w-7xl mx-auto w-full px-5 sm:px-8 md:px-12 pt-28 sm:pt-32 pb-10 sm:pb-14">
        
        {/* Top Row: Service List (Left) + Intro Copy (Right) */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-8 pt-4">
          
          {/* Left: Service List Chips */}
          <div className="flex flex-col gap-2.5">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-white/90 drop-shadow-md flex items-center gap-2">
              <span className="text-white/40">/</span> AI AUTOMATION &amp; SEO
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-white/90 drop-shadow-md flex items-center gap-2">
              <span className="text-white/40">/</span> HIGH-DR OUTREACH DOMINANCE
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-white/90 drop-shadow-md flex items-center gap-2">
              <span className="text-white/40">/</span> NEXT.JS 15 WEB ENGINEERING
            </span>
          </div>

          {/* Right: Intro Paragraph */}
          <div className="max-w-xs sm:text-right">
            <p className="text-base sm:text-lg leading-relaxed text-white drop-shadow-md font-light">
              We design search intelligence and automation that brings clarity, precision, and efficiency to the way your company scales.
            </p>
          </div>
        </div>

        {/* Bottom Row: Left Badges & Large Headline | Right Glass Contact Card */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 sm:gap-10 mt-16 sm:mt-24">
          
          {/* Left Column: Left-Accent Badge + H1 + CTAs */}
          <div className="max-w-2xl">
            {/* Left-Accent Badge */}
            <div className="inline-flex items-center gap-2 border-l-2 border-white bg-white/15 px-3.5 py-1.5 backdrop-blur-md font-mono text-[11px] uppercase tracking-[0.15em] text-white drop-shadow-sm mb-5 rounded-r-[3px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>We Scale 100+ Global Businesses</span>
            </div>

            {/* H1 Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.05] tracking-tight text-white drop-shadow-lg">
              Clear. Precise. <br />
              <span className="font-light italic text-white/95">Automated.</span>
            </h1>

            {/* Supporting Brand Subline */}
            <p className="mt-4 text-sm sm:text-base text-white/80 max-w-lg leading-relaxed drop-shadow-md font-light">
              Balaji Prime Media empowers enterprise brands and overseas startups with white-hat search authority and exponential organic revenue acquisition.
            </p>

            {/* Action Buttons */}
            <div className="mt-7 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={onOpenConsultation}
                className="rounded-full bg-white text-black px-6 py-3 text-xs sm:text-sm font-semibold hover:bg-white/90 transition-all flex items-center gap-2 shadow-lg cursor-pointer hover:scale-105 active:scale-95"
              >
                <span>Schedule Strategy Call</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <a
                href="#services"
                className="rounded-full border border-white/25 bg-white/10 backdrop-blur-md text-white px-5 py-3 text-xs sm:text-sm font-medium hover:bg-white/20 transition-all flex items-center gap-1.5 shadow-sm"
              >
                <span>Explore Solutions</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>
          </div>

          {/* Right Column: Glass Contact Card ("Talk with Leadership") */}
          <div className="flex items-center gap-4 rounded-xl bg-white/15 p-3.5 backdrop-blur-md border border-white/15 shadow-2xl max-w-sm w-full sm:w-auto">
            {/* Portrait Image */}
            <div className="relative h-24 w-20 rounded-lg overflow-hidden shrink-0 border border-white/20 bg-black/40">
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
              <span className="text-sm font-semibold text-white tracking-tight">
                Talk with Leadership
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/60">
                Balaji Prime Media Advisory
              </span>
              <p className="text-[11.5px] text-white/75 leading-tight my-0.5">
                Direct 1-on-1 organic growth strategy for high-intent queries.
              </p>

              <button
                type="button"
                onClick={onOpenConsultation}
                className="inline-flex items-center justify-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-black hover:bg-white/90 transition-all mt-1 w-fit cursor-pointer shadow-xs hover:scale-105"
              >
                <span>Book 15-min call</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Pinned Marquee at bottom */}
        <div className="mt-14 sm:mt-18 pt-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 overflow-hidden">
            <div className="text-xs font-mono tracking-[0.15em] uppercase text-white/50 whitespace-nowrap text-center md:text-left shrink-0">
              Trusted by 100+ Enterprise Brands Worldwide
            </div>

            <div className="flex-1 w-full overflow-hidden relative [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div className="animate-marquee-scroll flex items-center gap-16">
                {marqueeLogos.map((item, idx) => (
                  <div key={`m1-${idx}`} className="flex items-center gap-2.5 shrink-0 opacity-80 hover:opacity-100 transition-opacity">
                    <div className="w-6 h-6 rounded-md bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center text-[10px] font-bold text-white">
                      {item.letter}
                    </div>
                    <span className="text-sm font-medium text-white tracking-tight">
                      {item.name}
                    </span>
                  </div>
                ))}

                {marqueeLogos.map((item, idx) => (
                  <div key={`m2-${idx}`} className="flex items-center gap-2.5 shrink-0 opacity-80 hover:opacity-100 transition-opacity">
                    <div className="w-6 h-6 rounded-md bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center text-[10px] font-bold text-white">
                      {item.letter}
                    </div>
                    <span className="text-sm font-medium text-white tracking-tight">
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
