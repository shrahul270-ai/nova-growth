"use client";

import React from "react";
import Image from "next/image";

export default function OurPurpose3DSection() {
  return (
    <section 
      id="about-purpose" 
      className="relative py-14 sm:py-20 px-4 sm:px-6 md:px-12 z-10 max-w-7xl mx-auto"
    >
      {/* Outer Card with Modern Industrial styling */}
      <div className="relative rounded-[4px] overflow-hidden border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.85)] bg-[#0c0818] p-6 sm:p-10 lg:p-14 text-white font-satoshi">
        {/* Ambient Violet Highlights */}
        <div 
          className="absolute -top-24 -right-24 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(104,31,228,0.18)_0%,transparent_70%)] pointer-events-none" 
          aria-hidden="true" 
        />
        <div 
          className="absolute -bottom-24 -left-24 w-[450px] h-[450px] bg-[radial-gradient(circle,rgba(34,0,144,0.18)_0%,transparent_70%)] pointer-events-none" 
          aria-hidden="true" 
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* ================= LEFT COLUMN ================= */}
          <div className="lg:col-span-6 flex flex-col items-start">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-[2px] bg-white/5 border border-white/10 text-white text-xs font-bebas tracking-[0.2em] uppercase mb-5">
              <span className="w-2 h-2 rounded-full bg-[#681fe4] animate-pulse" />
              <span>OUR PURPOSE // 02</span>
            </div>

            {/* Main Headline */}
            <h2 className="font-bebas text-3xl sm:text-5xl lg:text-6xl tracking-[0.16em] uppercase leading-[0.95] text-white mb-6">
              WE HELP BUSINESSES WIN IN THE WORLD&apos;S MOST{" "}
              <span className="text-[#681fe4]">COMPETITIVE</span> SEARCH MARKETS.
            </h2>

            {/* Description Body Paragraphs */}
            <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-4 font-normal font-satoshi">
              Founded on the principle that digital marketing should be measurable, ethical, and high-ROI, Balaji Prime Media combines deep engineering discipline with data-driven outreach.
            </p>
            <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed font-normal font-satoshi">
              We partner with forward-thinking founders and marketing teams who demand real business outcomes — qualified pipeline, organic revenue, and long-term brand growth.
            </p>

          </div>

          {/* ================= RIGHT COLUMN: 4 STAT CARDS ================= */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center">
            
            <div className="relative z-10 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Card 1: 850+ Vetted Media Outlets */}
              <div className="p-5 rounded-[4px] bg-[#07030d] border border-white/10 hover:border-[#681fe4] transition-all flex items-center gap-4">
                <div className="w-12 h-12 rounded-[4px] bg-white/5 border border-white/10 p-2 flex items-center justify-center shrink-0">
                  <Image
                    src="/images/purpose/icon-users-3d.png"
                    alt="850+ Vetted Media Outlets"
                    width={36}
                    height={36}
                    className="object-contain filter grayscale"
                  />
                </div>
                <div className="text-left">
                  <span className="font-bebas text-3xl text-white block leading-none tracking-[0.08em]">
                    850+
                  </span>
                  <span className="font-bebas text-xs tracking-[0.14em] text-white uppercase block mt-1">
                    Vetted Media Outlets
                  </span>
                  <span className="text-[10px] font-mono text-[#681fe4] block">
                    High-Trust Global Media
                  </span>
                </div>
              </div>

              {/* Card 2: 100% Manual Outreach */}
              <div className="p-5 rounded-[4px] bg-[#07030d] border border-white/10 hover:border-[#681fe4] transition-all flex items-center gap-4">
                <div className="w-12 h-12 rounded-[4px] bg-white/5 border border-white/10 p-2 flex items-center justify-center shrink-0">
                  <Image
                    src="/images/purpose/icon-handshake-3d.png"
                    alt="100% Manual Outreach"
                    width={36}
                    height={36}
                    className="object-contain filter grayscale"
                  />
                </div>
                <div className="text-left">
                  <span className="font-bebas text-3xl text-white block leading-none tracking-[0.08em]">
                    100%
                  </span>
                  <span className="font-bebas text-xs tracking-[0.14em] text-white uppercase block mt-1">
                    Manual Outreach
                  </span>
                  <span className="text-[10px] font-mono text-[#681fe4] block">
                    Zero PBNs or spam
                  </span>
                </div>
              </div>

              {/* Card 3: 7-14d Turnaround Time */}
              <div className="p-5 rounded-[4px] bg-[#07030d] border border-white/10 hover:border-[#681fe4] transition-all flex items-center gap-4">
                <div className="w-12 h-12 rounded-[4px] bg-white/5 border border-white/10 p-2 flex items-center justify-center shrink-0">
                  <Image
                    src="/images/purpose/icon-clock-3d.png"
                    alt="7-14d Turnaround Time"
                    width={36}
                    height={36}
                    className="object-contain filter grayscale"
                  />
                </div>
                <div className="text-left">
                  <span className="font-bebas text-3xl text-white block leading-none tracking-[0.08em]">
                    7–14d
                  </span>
                  <span className="font-bebas text-xs tracking-[0.14em] text-white uppercase block mt-1">
                    Turnaround Time
                  </span>
                  <span className="text-[10px] font-mono text-[#681fe4] block">
                    Fast publication
                  </span>
                </div>
              </div>

              {/* Card 4: 95+ Target PageSpeed */}
              <div className="p-5 rounded-[4px] bg-[#07030d] border border-white/10 hover:border-[#681fe4] transition-all flex items-center gap-4">
                <div className="w-12 h-12 rounded-[4px] bg-white/5 border border-white/10 p-2 flex items-center justify-center shrink-0">
                  <Image
                    src="/images/purpose/icon-gauge-3d.png"
                    alt="95+ Target PageSpeed"
                    width={36}
                    height={36}
                    className="object-contain filter grayscale"
                  />
                </div>
                <div className="text-left">
                  <span className="font-bebas text-3xl text-white block leading-none tracking-[0.08em]">
                    95+
                  </span>
                  <span className="font-bebas text-xs tracking-[0.14em] text-white uppercase block mt-1">
                    Target PageSpeed
                  </span>
                  <span className="text-[10px] font-mono text-[#681fe4] block">
                    Core Web Vitals Pass
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
