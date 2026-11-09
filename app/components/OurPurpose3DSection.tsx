"use client";

import React from "react";
import Image from "next/image";

export default function OurPurpose3DSection() {
  return (
    <section 
      id="about-purpose" 
      className="relative py-12 sm:py-16 px-4 sm:px-6 md:px-12 z-10 max-w-7xl mx-auto"
    >
      {/* Outer Card with exact cosmic background & purple neon glass border */}
      <div 
        className="relative rounded-[36px] overflow-hidden border border-purple-500/30 shadow-[0_25px_70px_rgba(0,0,0,0.85),0_0_35px_rgba(168,85,247,0.18)] backdrop-blur-2xl p-6 sm:p-10 lg:p-12 text-white"
        style={{
          backgroundColor: "#070319",
          backgroundImage: "url('/images/cosmic-dot-bg.png')",
          backgroundRepeat: "repeat",
        }}
      >
        {/* Ambient Purple & Violet Glow Highlights */}
        <div 
          className="absolute -top-24 -right-24 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(168,85,247,0.22)_0%,transparent_70%)] pointer-events-none" 
          aria-hidden="true" 
        />
        <div 
          className="absolute -bottom-24 -left-24 w-[450px] h-[450px] bg-[radial-gradient(circle,rgba(139,92,246,0.18)_0%,transparent_70%)] pointer-events-none" 
          aria-hidden="true" 
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ================= LEFT COLUMN ================= */}
          <div className="lg:col-span-6 flex flex-col items-start">
            
            {/* 3D BPM App Icon Badge (Metallic Chrome & Purple Neon Glass) */}
            <div className="mb-6 relative group">
              <div className="relative w-24 h-24 rounded-[24px] p-1.5 bg-gradient-to-br from-white/30 via-purple-500/30 to-black/90 border border-purple-400/50 shadow-[0_12px_30px_rgba(0,0,0,0.8),0_0_25px_rgba(168,85,247,0.4),inset_0_1px_2px_rgba(255,255,255,0.7)] backdrop-blur-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/purpose/bpm-3d-app-icon-purple.png"
                  alt="BPM 3D Digital Growth Icon"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover rounded-[18px]"
                  priority
                />
              </div>
              {/* Soft purple underglow */}
              <div className="absolute -inset-1 rounded-[26px] bg-purple-500/20 blur-md -z-10" />
            </div>

            {/* Glowing Pill Badge: • OUR PURPOSE (Purple) */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/70 border border-purple-500/50 shadow-[0_0_16px_rgba(168,85,247,0.35)] backdrop-blur-md mb-5">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400 shadow-[0_0_10px_#c084fc] animate-pulse" />
              <span className="text-xs font-black uppercase tracking-[0.22em] text-purple-200">
                Our Purpose
              </span>
            </div>

            {/* Main Headline with purple highlighted "competitive" and curved swoop underline */}
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tight leading-[1.15] text-white mb-6">
              We help businesses win in the world&apos;s most{" "}
              <span className="relative inline-block text-purple-400">
                competitive
                {/* Curved hand-drawn swoop underline (Purple) */}
                <svg
                  className="absolute -bottom-2 left-0 w-full overflow-visible"
                  height="10"
                  viewBox="0 0 220 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 7C55 2 165 2 217 7"
                    stroke="#c084fc"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    className="drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]"
                  />
                </svg>
              </span>{" "}
              search markets.
            </h2>

            {/* Description Body Paragraphs */}
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 font-normal">
              Founded on the principle that digital marketing should be measurable, ethical, and high-ROI, Balaji Prime Media combines deep engineering discipline with data-driven outreach.
            </p>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
              We partner with forward-thinking founders and marketing teams who demand real business outcomes — qualified pipeline, organic revenue, and long-term brand growth.
            </p>

          </div>

          {/* ================= RIGHT COLUMN: 4 GLASS STAT CARDS ================= */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center">
            
            {/* 4 Floating 3D Frosted Glass Cards (2x2 Grid) */}
            <div className="relative z-10 w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              
              {/* Card 1: 850+ Vetted Media Outlets */}
              <div className="relative group p-5 rounded-2xl backdrop-blur-2xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/20 hover:border-purple-400/80 shadow-[0_12px_32px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.4),0_0_20px_rgba(168,85,247,0.2)] transition-all duration-300 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-400/60 p-2 shadow-[0_0_15px_rgba(168,85,247,0.5)] flex items-center justify-center shrink-0">
                  <Image
                    src="/images/purpose/icon-users-3d.png"
                    alt="850+ Vetted Media Outlets"
                    width={36}
                    height={36}
                    className="object-contain"
                  />
                </div>
                <div className="text-left">
                  <span className="text-2xl sm:text-3xl font-black text-white block leading-none">
                    850+
                  </span>
                  <span className="text-xs font-bold text-slate-100 block mt-1">
                    Vetted Media Outlets
                  </span>
                  <span className="text-[10.5px] text-purple-300/80 font-medium block">
                    DR 50–90+ Publications
                  </span>
                </div>
              </div>

              {/* Card 2: 100% Manual Outreach */}
              <div className="relative group p-5 rounded-2xl backdrop-blur-2xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/20 hover:border-purple-400/80 shadow-[0_12px_32px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.4),0_0_20px_rgba(168,85,247,0.2)] transition-all duration-300 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-400/60 p-2 shadow-[0_0_15px_rgba(168,85,247,0.5)] flex items-center justify-center shrink-0">
                  <Image
                    src="/images/purpose/icon-handshake-3d.png"
                    alt="100% Manual Outreach"
                    width={36}
                    height={36}
                    className="object-contain"
                  />
                </div>
                <div className="text-left">
                  <span className="text-2xl sm:text-3xl font-black text-white block leading-none">
                    100%
                  </span>
                  <span className="text-xs font-bold text-slate-100 block mt-1">
                    Manual Outreach
                  </span>
                  <span className="text-[10.5px] text-purple-300/80 font-medium block">
                    Zero PBNs or spam
                  </span>
                </div>
              </div>

              {/* Card 3: 7-14d Turnaround Time */}
              <div className="relative group p-5 rounded-2xl backdrop-blur-2xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/20 hover:border-purple-400/80 shadow-[0_12px_32px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.4),0_0_20px_rgba(168,85,247,0.2)] transition-all duration-300 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-400/60 p-2 shadow-[0_0_15px_rgba(168,85,247,0.5)] flex items-center justify-center shrink-0">
                  <Image
                    src="/images/purpose/icon-clock-3d.png"
                    alt="7-14d Turnaround Time"
                    width={36}
                    height={36}
                    className="object-contain"
                  />
                </div>
                <div className="text-left">
                  <span className="text-2xl sm:text-3xl font-black text-white block leading-none">
                    7–14d
                  </span>
                  <span className="text-xs font-bold text-slate-100 block mt-1">
                    Turnaround Time
                  </span>
                  <span className="text-[10.5px] text-purple-300/80 font-medium block">
                    Fast publication
                  </span>
                </div>
              </div>

              {/* Card 4: 95+ Target PageSpeed */}
              <div className="relative group p-5 rounded-2xl backdrop-blur-2xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/20 hover:border-purple-400/80 shadow-[0_12px_32px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.4),0_0_20px_rgba(168,85,247,0.2)] transition-all duration-300 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-400/60 p-2 shadow-[0_0_15px_rgba(168,85,247,0.5)] flex items-center justify-center shrink-0">
                  <Image
                    src="/images/purpose/icon-gauge-3d.png"
                    alt="95+ Target PageSpeed"
                    width={36}
                    height={36}
                    className="object-contain"
                  />
                </div>
                <div className="text-left">
                  <span className="text-2xl sm:text-3xl font-black text-white block leading-none">
                    95+
                  </span>
                  <span className="text-xs font-bold text-slate-100 block mt-1">
                    Target PageSpeed
                  </span>
                  <span className="text-[10.5px] text-purple-300/80 font-medium block">
                    Core Web Vitals Pass
                  </span>
                </div>
              </div>

            </div>

            {/* 3D Elevated Stepped Podium Base at bottom */}
            <div className="relative flex flex-col items-center w-full mt-8 pointer-events-none" aria-hidden="true">
              <div className="w-56 sm:w-72 h-6 rounded-[100%] border border-purple-400/70 bg-gradient-to-r from-purple-500/30 via-fuchsia-400/40 to-purple-500/30 shadow-[0_0_25px_rgba(168,85,247,0.85)] z-10" />
              <div className="w-60 sm:w-80 h-5 -mt-3 rounded-b-[100%] bg-gradient-to-b from-[#1e1438] via-[#0f0924] to-[#04020f] border-b border-purple-400/40 shadow-2xl z-0" />
              <div className="w-72 sm:w-96 h-8 -mt-3 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.4)_0%,rgba(139,92,246,0.2)_50%,transparent_75%)] blur-md" />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
