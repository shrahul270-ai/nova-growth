"use client";

import React, { useEffect, useRef } from "react";
import Navbar from "./Navbar";

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

export default function PromptHero({ onOpenConsultation }: PromptHeroProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animId: number;
    let isRestarting = false;
    const fadeDuration = 0.5; // 0.5s fade-in at start, 0.5s fade-out at end

    const tick = () => {
      if (!video || isRestarting) return;

      const currentTime = video.currentTime;
      const duration = video.duration;

      if (duration && !isNaN(duration) && duration > 0) {
        if (currentTime < fadeDuration) {
          // 0.5s fade-in at start
          const alpha = Math.min(1, Math.max(0, currentTime / fadeDuration));
          video.style.opacity = alpha.toFixed(4);
        } else if (currentTime > duration - fadeDuration) {
          // 0.5s fade-out at end
          const timeLeft = Math.max(0, duration - currentTime);
          const alpha = Math.min(1, Math.max(0, timeLeft / fadeDuration));
          video.style.opacity = alpha.toFixed(4);
        } else {
          video.style.opacity = "1";
        }
      }

      animId = requestAnimationFrame(tick);
    };

    const handleEnded = () => {
      if (isRestarting) return;
      isRestarting = true;
      if (video) {
        video.style.opacity = "0";
      }
      setTimeout(() => {
        if (video) {
          video.currentTime = 0;
          video
            .play()
            .then(() => {
              isRestarting = false;
              animId = requestAnimationFrame(tick);
            })
            .catch(() => {
              isRestarting = false;
            });
        }
      }, 100);
    };

    video.addEventListener("ended", handleEnded);

    // Initial play attempt with muted autoplay support
    video
      .play()
      .then(() => {
        animId = requestAnimationFrame(tick);
      })
      .catch(() => {
        video.muted = true;
        video
          .play()
          .then(() => {
            animId = requestAnimationFrame(tick);
          })
          .catch(() => {});
      });

    return () => {
      cancelAnimationFrame(animId);
      if (video) {
        video.removeEventListener("ended", handleEnded);
      }
    };
  }, []);

  return (
    <div
      id="home"
      className="relative min-h-screen flex flex-col overflow-hidden select-none"
      style={{
        backgroundColor: "hsl(260, 87%, 3%)",
        color: "hsl(40, 6%, 95%)",
      }}
    >
      {/* Background Video (Index page wrapper) */}
      <video
        ref={videoRef}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_065045_c44942da-53c6-4804-b734-f9e07fc22e08.mp4"
        playsInline
        muted
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-none"
        style={{ opacity: 0 }}
      />

      {/* Blurred overlay shape (centered behind content) */}
      <div
        className="w-[984px] h-[527px] opacity-90 bg-gray-950 blur-[82px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        aria-hidden="true"
      />

      {/* Hero Content sits in relative z-10 div above, overflow-visible */}
      <div className="relative z-10 min-h-screen flex flex-col overflow-visible">
        {/* Navbar at top */}
        <Navbar activePage="home" />

        {/* Hero content vertically centered in remaining space via flex-1 */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8 py-10 sm:py-16">
          {/* Headline: Balaji Prime Media ("Balaji Prime " in plain off-white, "Media" in indigo->purple->amber gradient) */}
          <h1 className="font-general-sans text-[34px] sm:text-[52px] md:text-[68px] lg:text-[84px] xl:text-[96px] font-normal leading-[1.08] tracking-[-0.024em] max-w-5xl mx-auto">
            <span className="text-[hsl(40,6%,95%)]">Balaji Prime </span>
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(to left, #6366f1, #a855f7, #fcd34d)",
              }}
            >
              Media
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-base sm:text-lg leading-8 max-w-xl mt-[9px] opacity-80 font-normal"
            style={{ color: "hsl(40, 6%, 82%)" }}
          >
            The most powerful AI-driven digital growth &amp; SEO deployed <br className="hidden sm:inline" />
            for ambitious global brands in talent &amp; revenue acquisition.
          </p>

          {/* CTA: heroSecondary variant, px-[29px] py-[24px], mt-[25px] */}
          <button
            type="button"
            onClick={onOpenConsultation}
            className="heroSecondary px-[29px] py-[24px] mt-[25px] text-[15px] sm:text-base font-medium tracking-wide flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Schedule a Consult</span>
            <svg
              className="w-4 h-4 text-[hsl(40,6%,95%)] group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>

        {/* Logo marquee pinned to bottom of hero, pb-10 */}
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 pb-10">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 overflow-hidden">
            {/* Left side: static text in text-foreground/50 text-sm */}
            <div
              className="text-sm font-normal whitespace-nowrap text-center md:text-left shrink-0 leading-snug"
              style={{ color: "hsla(40, 6%, 95%, 0.5)" }}
            >
              Relied on by brands <br className="hidden sm:inline" /> across the
              globe
            </div>

            {/* Right side: infinite scrolling marquee with logos (duplicated for seamless loop) */}
            <div className="flex-1 w-full overflow-hidden relative [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div className="animate-marquee-scroll flex items-center gap-16">
                {/* 1st copy */}
                {marqueeLogos.map((item, idx) => (
                  <div key={`m1-${idx}`} className="flex items-center gap-3 shrink-0">
                    <div className="w-6 h-6 rounded-lg liquid-glass flex items-center justify-center text-[11px] font-bold text-[hsl(40,6%,95%)] shadow-inner">
                      {item.letter}
                    </div>
                    <span className="text-base font-semibold text-[hsl(40,6%,95%)] tracking-tight">
                      {item.name}
                    </span>
                  </div>
                ))}

                {/* 2nd duplicated copy for seamless loop */}
                {marqueeLogos.map((item, idx) => (
                  <div key={`m2-${idx}`} className="flex items-center gap-3 shrink-0">
                    <div className="w-6 h-6 rounded-lg liquid-glass flex items-center justify-center text-[11px] font-bold text-[hsl(40,6%,95%)] shadow-inner">
                      {item.letter}
                    </div>
                    <span className="text-base font-semibold text-[hsl(40,6%,95%)] tracking-tight">
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
