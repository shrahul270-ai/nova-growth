"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Globe } from "lucide-react";

export default function CinematicContactHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);
  const fadingOutRef = useRef<boolean>(false);
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const fadeTo = (targetOpacity: number, duration: number = 500, onComplete?: () => void) => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    const video = videoRef.current;
    if (!video) return;

    const startOpacity = parseFloat(video.style.opacity || "0");
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentOpacity = startOpacity + (targetOpacity - startOpacity) * progress;
      if (video) {
        video.style.opacity = currentOpacity.toString();
      }
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        rafRef.current = null;
        if (onComplete) onComplete();
      }
    };
    rafRef.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.style.opacity = "0";

    const handlePlay = () => {
      fadingOutRef.current = false;
      fadeTo(1, 500);
    };

    const handleTimeUpdate = () => {
      if (!video.duration || fadingOutRef.current) return;
      const timeLeft = video.duration - video.currentTime;
      if (timeLeft <= 0.55) {
        fadingOutRef.current = true;
        fadeTo(0, 500);
      }
    };

    const handleEnded = () => {
      if (video) video.style.opacity = "0";
      setTimeout(() => {
        if (!video) return;
        video.currentTime = 0;
        const p = video.play();
        if (p && typeof p.catch === "function") {
          p.catch(() => {});
        }
        fadingOutRef.current = false;
        fadeTo(1, 500);
      }, 100);
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    const initialPlay = video.play();
    if (initialPlay && typeof initialPlay.catch === "function") {
      initialPlay.catch(() => {});
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("contact-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setSubscribed(true);
    const formInput = document.getElementById("email") as HTMLInputElement | null;
    if (formInput) {
      formInput.value = emailInput;
    }
    const el = document.getElementById("contact-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full min-h-screen h-screen overflow-hidden bg-black select-none flex flex-col justify-between">
      {/* Full-Screen Looping Background Video (Shifted down by 17%) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover translate-y-[17%]"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4"
          autoPlay
          muted
          loop={false}
          playsInline
        />
      </div>

      {/* Top Spacer to balance transparent navbar */}
      <div className="relative z-10 w-full h-24 sm:h-28" />

      {/* Hero Content Area (-translate-y-[20%]) */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-8 text-center -translate-y-[8%] sm:-translate-y-[14%] md:-translate-y-[20%] max-w-4xl mx-auto">
        {/* Main Heading in Instrument Serif */}
        <h1
          className="text-5xl md:text-6xl lg:text-7xl text-white mb-6 md:mb-8 tracking-tight whitespace-nowrap select-none font-normal"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Built for the curious
        </h1>

        {/* Action Container */}
        <div className="max-w-xl w-full space-y-5 mx-auto">
          {/* Email Input Bar */}
          <form
            onSubmit={handleEmailSubmit}
            className="liquid-glass rounded-full pl-6 pr-2 py-2 flex items-center gap-3 w-full shadow-2xl"
          >
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder={subscribed ? "✓ Forwarding to discovery form..." : "Enter your email for growth audit"}
              className="bg-transparent border-none outline-none text-white placeholder:text-white/40 text-sm sm:text-base flex-1 min-w-0"
              required
            />
            <button
              type="submit"
              aria-label="Submit email"
              className="bg-white rounded-full p-3 text-black hover:bg-white/90 transition-all cursor-pointer shrink-0"
            >
              <ArrowRight size={20} />
            </button>
          </form>

          {/* Subtitle Text */}
          <p className="text-white/80 text-xs sm:text-sm leading-relaxed px-4 font-normal">
            Stay updated with the latest search insights and organic growth strategies. Initiate your dedicated
            discovery session or book an international campaign consultation today.
          </p>

          {/* Manifesto / Discovery Button */}
          <div>
            <a
              href="#contact-form"
              onClick={scrollToForm}
              className="liquid-glass rounded-full px-8 py-3 text-white text-xs sm:text-sm font-medium hover:bg-white/5 transition-colors cursor-pointer inline-flex items-center gap-2 shadow-lg"
            >
              <span>Schedule Discovery Session</span>
            </a>
          </div>
        </div>
      </div>

      {/* Social Icons Footer */}
      <div className="relative z-10 flex justify-center gap-4 pb-8 sm:pb-12">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="liquid-glass rounded-full p-3.5 sm:p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all cursor-pointer shadow-lg"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
          </svg>
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
          className="liquid-glass rounded-full p-3.5 sm:p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all cursor-pointer shadow-lg"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
          </svg>
        </a>
        <a
          href="https://balajiprimemedia.in"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Official Website"
          className="liquid-glass rounded-full p-3.5 sm:p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all cursor-pointer shadow-lg"
        >
          <Globe size={20} />
        </a>
      </div>
    </section>
  );
}
