"use client";

import React from "react";

export default function StaticContactHero() {
  return (
    <section className="relative w-full pt-32 sm:pt-40 pb-12 sm:pb-16 px-4 sm:px-6 md:px-12 text-center overflow-hidden bg-[#070318]">
      {/* Subtle Static Ambient Glows (No moving parts) */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(160, 104, 255, 0.28), transparent 70%), radial-gradient(circle at 15% 50%, rgba(99, 102, 241, 0.12), transparent 50%), radial-gradient(circle at 85% 60%, rgba(34, 211, 238, 0.1), transparent 50%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Modern Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-xs font-bold text-[#d8b4fe] mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          <span>DIRECT LEADERSHIP &amp; STRATEGY ACCESS</span>
        </div>

        {/* Clean, Bold Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12] mb-6">
          Let&apos;s Engineer Your Next{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d8b4fe] via-[#A068FF] to-[#22d3ee]">
            Digital Growth Leap
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed mb-6">
          Connect directly with Balaji Prime Media leadership. We review your requirements and provide an actionable technical proposal and roadmap within 24 hours.
        </p>

        {/* Quick Contact Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-slate-300">
          <a
            href="https://wa.me/917690868932?text=Hello%20Balaji%20Prime%20Media,%20I%20would%20like%20to%20discuss%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-950/70 transition-all cursor-pointer"
          >
            <span>💬</span>
            <span>WhatsApp: +91 76908 68932</span>
          </a>
          <a
            href="mailto:support@balajiprimemedia.in"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-950/70 transition-all cursor-pointer"
          >
            <span>✉️</span>
            <span>support@balajiprimemedia.in</span>
          </a>
          <span className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 text-slate-300">
            <span>⏱️</span>
            <span>&lt; 2-Hour Response Time</span>
          </span>
        </div>
      </div>
    </section>
  );
}
