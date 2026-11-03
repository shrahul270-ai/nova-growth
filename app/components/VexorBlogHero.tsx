"use client";

import React, { useState, useRef, useEffect } from "react";

interface VexorBlogHeroProps {
  onSearch?: (query: string) => void;
  searchQuery?: string;
}

export default function VexorBlogHero({ onSearch, searchQuery }: VexorBlogHeroProps) {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && videoRef.current.readyState >= 3) {
      setVideoLoaded(true);
    }
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
  };

  const scrollToArticles = () => {
    const el = document.getElementById("articles-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full min-h-[92vh] lg:min-h-screen bg-black text-white flex flex-col justify-between overflow-hidden selection:bg-[#F0605A] selection:text-white">
      {/* Top spacer to ensure transparent navbar has comfortable breathing room */}
      <div className="w-full h-24 sm:h-28 lg:h-32" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-auto py-6">
        {/* Framed CTA Card */}
        <div className="relative mx-auto rounded-[24px] p-[1.5px] bg-gradient-to-br from-[rgba(244,118,104,0.7)] via-[rgba(244,118,104,0.35)] to-[rgba(244,118,104,0.18)] shadow-[0_20px_70px_-15px_rgba(240,96,90,0.3)]">
          <div className="relative rounded-[22.5px] overflow-hidden bg-black p-8 sm:p-12 lg:p-16 min-h-[440px] sm:min-h-[480px] flex flex-col items-center justify-center text-center">
            
            {/* Background Still Plate */}
            <div
              className="absolute inset-0 pointer-events-none bg-cover bg-right-bottom z-0 opacity-80"
              style={{
                backgroundImage: `url('https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/03c58212-3a59-4c80-b19d-30d05a174563.webp')`,
                backgroundPosition: "right bottom",
                backgroundSize: "cover",
              }}
            />

            {/* Slowly Swirling Coral & Crimson Smoke Loop Video */}
            <video
              ref={videoRef}
              src="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/f6f4ec49-d5dd-4893-8eb4-fa0f932aceaf.mp4"
              autoPlay
              muted
              loop
              playsInline
              onLoadedData={() => setVideoLoaded(true)}
              className={`absolute inset-0 w-full h-full object-cover object-right-bottom pointer-events-none z-0 transition-opacity duration-1000 ${
                videoLoaded ? "opacity-80" : "opacity-0"
              }`}
            />

            {/* Dark Gradient Overlay for optimal copy contrast on the left & top */}
            <div
              className="absolute inset-0 pointer-events-none z-[1]"
              style={{
                background: `radial-gradient(ellipse at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.85) 85%, #000000 100%),
                             linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)`,
              }}
            />

            {/* Content Layer */}
            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-[#FF8A73]/40 backdrop-blur-md mb-6">
                <span className="w-2 h-2 rounded-full bg-[#FF8A73] animate-pulse" />
                <span className="text-[11px] font-semibold tracking-wider uppercase text-[#FF8A73]">
                  Balaji Prime Media // Editorial Dispatch
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-semibold tracking-tight text-white leading-[1.12] mb-4">
                The Balaji Prime Media <br className="hidden sm:inline" />
                Growth Journal
              </h1>

              {/* Subcopy */}
              <p className="text-[#c4c4c7] text-sm sm:text-base lg:text-[17px] font-normal leading-relaxed max-w-xl mb-8">
                Join 2,500+ founders, marketers &amp; SEO directors receiving weekly data-backed organic strategies, high-DA link blueprints, and algorithmic updates.
              </p>

              {/* Waitlist / Newsletter Form */}
              {isSubscribed ? (
                <div className="w-full max-w-md p-4 rounded-full bg-white/[0.08] border border-[#FF8A73]/60 backdrop-blur-md text-[#FF8A73] text-sm font-medium flex items-center justify-center gap-2 shadow-lg animate-fadeIn">
                  <span>✓</span>
                  <span>Welcome aboard! You&apos;ll receive our next SEO teardown this Thursday.</span>
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="w-full max-w-[490px] flex items-center bg-black/90 border border-white/15 focus-within:border-[#FF8A73]/80 rounded-full p-1.5 transition-all shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email to join the waitlist"
                    className="w-full bg-transparent text-white text-xs sm:text-sm pl-4 pr-2 py-2 outline-none placeholder-[#808081]"
                  />
                  <button
                    type="submit"
                    className="shrink-0 bg-gradient-to-r from-[#FF8A73] to-[#F0605A] hover:brightness-110 active:scale-95 text-white font-medium text-xs sm:text-sm px-5 sm:px-6 py-2.5 rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_4px_16px_rgba(240,96,90,0.35)] transition-all cursor-pointer whitespace-nowrap"
                  >
                    Get Free Access
                  </button>
                </form>
              )}

              {/* Quick Features Row */}
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-6 text-[11px] sm:text-xs text-[#808081]">
                <span className="flex items-center gap-1.5">
                  <span className="text-[#FF8A73]">●</span> 200+ Growth Case Studies
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-[#FF8A73]">●</span> Verified DR 50-90+ Data
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-[#FF8A73]">●</span> No Spam, Zero Fluff
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Strip / Transition to Blog Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-5 text-xs text-[#808081]">
          {/* Left mark */}
          <div className="flex items-center gap-3">
            <span className="font-semibold text-white tracking-widest text-[13px]">BPM // INSIGHTS</span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="hidden sm:inline">Curated search engineering, high-intent guest blogging &amp; organic authority.</span>
          </div>

          {/* Right link / Action */}
          <button
            onClick={scrollToArticles}
            className="group flex items-center gap-2 text-white/80 hover:text-white transition-colors cursor-pointer text-xs font-medium"
          >
            <span>Explore Latest Articles</span>
            <span className="group-hover:translate-y-0.5 transition-transform text-[#FF8A73]">↓</span>
          </button>
        </div>
      </div>
    </section>
  );
}
