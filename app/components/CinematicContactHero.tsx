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
          href="https://t.me/balajiprimemedia"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Telegram"
          className="liquid-glass rounded-full p-3.5 sm:p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all cursor-pointer shadow-lg"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
          </svg>
        </a>
        <a
          href="https://wa.me/917690868932"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="liquid-glass rounded-full p-3.5 sm:p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all cursor-pointer shadow-lg"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12.04 2C6.527 2 2.05 6.477 2.05 11.99c0 1.954.563 3.778 1.536 5.32L2 22l4.832-1.53c1.482.88 3.208 1.39 5.208 1.39 5.513 0 9.99-4.477 9.99-9.99C22.03 6.477 17.553 2 12.04 2zm5.432 12.382c-.301-.15-1.782-.879-2.057-.979-.276-.1-.476-.15-.676.15-.2.301-.776.979-.951 1.18-.176.2-.351.226-.652.075-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.675-2.085-.176-.3-.019-.463.132-.612.136-.134.301-.351.451-.527.151-.176.201-.301.301-.501.1-.2.05-.376-.025-.526-.075-.15-.676-1.63-.926-2.233-.244-.588-.492-.508-.676-.517l-.576-.01c-.2 0-.526.075-.802.376-.276.301-1.052 1.028-1.052 2.507 0 1.48 1.077 2.908 1.228 3.109.15.2 2.119 3.235 5.132 4.538.717.31 1.277.495 1.713.633.72.228 1.375.196 1.893.119.578-.086 1.782-.727 2.032-1.429.25-.702.25-1.303.175-1.429-.075-.125-.276-.2-.577-.35z" />
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
