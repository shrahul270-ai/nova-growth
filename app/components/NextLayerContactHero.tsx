"use client";

import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

export default function NextLayerContactHero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const src = "https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8";

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });
      hls.loadSource(src);
      hls.attachMedia(video);
      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    }
  }, []);

  return (
    <section className="relative pt-28 sm:pt-36 pb-10 sm:pb-14 px-6 md:px-16 lg:px-24 text-center overflow-hidden bg-black flex flex-col justify-center">
      {/* Background HLS Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-80 pointer-events-none"
      />

      {/* Top fade (120px tall, black -> transparent) */}
      <div
        className="absolute top-0 left-0 right-0 z-[1] pointer-events-none"
        style={{
          height: "120px",
          background: "linear-gradient(to bottom, black 0%, rgba(0,0,0,0.85) 45%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Bottom fade (80px tall, transparent -> black) */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[1] pointer-events-none"
        style={{
          height: "80px",
          background: "linear-gradient(to top, #000 0%, rgba(0,0,0,0.7) 50%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Content Container (relative z-10) */}
      <div className="relative z-10 max-w-4xl mx-auto my-auto select-none">
        
        {/* Balaji Prime Media Trust Badge Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass-strong text-white/90 text-xs font-body font-medium mb-4 sm:mb-5 shadow-2xl backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Balaji Prime Media • Direct Founder Discovery &amp; Strategy</span>
        </div>

        {/* Heading: Instrument Serif italic */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading italic text-white tracking-tight leading-[0.95] max-w-3xl mx-auto mb-3.5 drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
          Your next website starts here.
        </h1>

        {/* Subtext: Barlow font-body */}
        <p className="text-white/70 font-body font-light text-sm md:text-base max-w-xl mx-auto mb-3 leading-relaxed">
          Book a free strategy call. See what high-intent organic SEO, modern Next.js development, and AI-powered growth can do. No commitment, no pressure. Just compounding revenue.
        </p>

        {/* Floating Trust Indicators (Agency Details) */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-5 sm:gap-8 text-xs font-body text-white/60">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">⚡</span>
            <span>12-Hour SLA Response</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-cyan-400">🌍</span>
            <span>US • UK • Canada • UAE • Australia</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-purple-400">🔒</span>
            <span>Mutual NDA Guaranteed</span>
          </div>
        </div>

      </div>
    </section>
  );
}
