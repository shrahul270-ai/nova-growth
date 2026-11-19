"use client";

import React from "react";
import Link from "next/link";

export default function CinematicIdentityHero() {
  return (
    <section className="relative w-full min-h-screen min-h-[100svh] overflow-hidden select-none bg-[#07030d] bg-grid-white-240 text-white isolate flex flex-col justify-between">
      {/* Subtle Violet Ambient Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[750px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(104,31,228,0.18)_0%,transparent_70%)]" />
        <div className="absolute top-10 right-10 w-96 h-96 bg-[#220090]/25 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Row 1: Top spacing padding for overlaid transparent Navbar */}
      <div className="w-full pt-[clamp(80px,12vh,120px)] pointer-events-none" />

      {/* Row 2: Right-aligned Identity Panel */}
      <div className="relative z-10 w-full flex-1 flex items-center justify-end max-md:justify-center px-[clamp(20px,5vw,100px)] py-6 sm:py-8 overflow-visible">
        <div className="w-[min(48vw,720px)] min-w-[340px] max-lg:w-[min(80vw,580px)] max-sm:w-full max-sm:min-w-0 flex flex-col items-start text-left">
          
          {/* 1) Chip: [ DIGITAL IDENTITY ] */}
          <div className="inline-block text-xs font-bebas tracking-[0.24em] uppercase text-white bg-white/5 border border-white/10 px-4 py-2 leading-none rounded-[2px]">
            [ DIGITAL IDENTITY // 01 ]
          </div>

          {/* 2) H1: BALAJI PRIME MEDIA */}
          <h1 className="font-bebas text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.16em] leading-[0.9] text-white mt-6 uppercase">
            BALAJI PRIME <span className="text-[#681fe4]">MEDIA</span>
          </h1>

          {/* 3) Tagline */}
          <p className="font-satoshi text-neutral-300 text-sm sm:text-base md:text-lg leading-relaxed mt-4 max-w-xl font-normal">
            Your digital growth &amp; organic identity to the global network. Engineering-grade search architecture and high-authority verified media placements.
          </p>

          {/* Quick Stats Pill */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-[2px] bg-[#0c0818] border border-white/10 text-xs font-mono text-neutral-300">
              <span className="text-[#681fe4] font-bold">DR 50–90+</span> VERIFIED NETWORK
            </div>
            <div className="px-3.5 py-1.5 rounded-[2px] bg-[#0c0818] border border-white/10 text-xs font-mono text-neutral-300">
              <span className="text-[#681fe4] font-bold">7+ YEARS</span> SEARCH MASTERY
            </div>
          </div>

        </div>
      </div>

      {/* Row 3: Legal Notice Pinned to bottom */}
      <footer className="relative z-10 w-full border-t border-white/10 py-4 px-[clamp(20px,5vw,100px)] text-center font-satoshi">
        <p className="text-xs text-neutral-400 leading-relaxed max-w-4xl mx-auto font-normal">
          Connecting with Balaji Prime Media signals that you accept our{" "}
          <Link
            href="/privacy-policy"
            className="text-white underline underline-offset-4 hover:text-[#681fe4] transition-colors"
          >
            Privacy Notice
          </Link>{" "}
          and{" "}
          <Link
            href="/terms"
            className="text-white underline underline-offset-4 hover:text-[#681fe4] transition-colors"
          >
            Service Contract
          </Link>
          .
        </p>
      </footer>
    </section>
  );
}
