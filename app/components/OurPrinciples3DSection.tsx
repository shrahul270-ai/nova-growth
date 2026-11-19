"use client";

import React from "react";
import Image from "next/image";

interface PrincipleCard {
  title: string;
  description: string;
  iconSrc: string;
  iconAlt: string;
}

const PRINCIPLES: PrincipleCard[] = [
  {
    title: "Data-Driven Engineering",
    description:
      "We do not guess. Every SEO campaign, code deployment, and content piece is backed by comprehensive search data, user intent metrics, and statistical significance.",
    iconSrc: "/images/principles/3d-laptop.png",
    iconAlt: "Data-Driven Engineering 3D Laptop with Chart",
  },
  {
    title: "Global Mindset & Reach",
    description:
      "Operating seamlessly across time zones, we help brands expand their footprint into Tier-1 English-speaking markets (US, UK, Canada, Australia) and the Middle East.",
    iconSrc: "/images/principles/3d-globe.png",
    iconAlt: "Global Mindset & Reach 3D Globe with Orbital Rings",
  },
  {
    title: "Uncompromising Performance",
    description:
      "We believe digital performance is a competitive advantage. Our web applications consistently score 95+ on Google PageSpeed Insights and pass all Core Web Vitals.",
    iconSrc: "/images/principles/3d-rocket.png",
    iconAlt: "Uncompromising Performance 3D Rocket",
  },
  {
    title: "Complete Transparency",
    description:
      "No vanity metrics. We provide live Data Studio dashboards, transparent weekly progress reports, and direct Slack communication with your lead strategist.",
    iconSrc: "/images/principles/3d-shield.png",
    iconAlt: "Complete Transparency 3D Shield with Checkmark",
  },
];

export default function OurPrinciples3DSection() {
  return (
    <section 
      id="about-principles" 
      className="relative py-12 sm:py-16 px-4 sm:px-6 md:px-12 z-10 max-w-7xl mx-auto"
    >
      {/* Outer Card with exact user-provided background & purple neon glass border */}
      <div 
        className="relative rounded-[36px] overflow-hidden border border-purple-500/30 shadow-[0_25px_70px_rgba(0,0,0,0.85),0_0_35px_rgba(168,85,247,0.18)] backdrop-blur-2xl p-6 sm:p-10 lg:p-12 text-white"
        style={{
          backgroundColor: "#120e28",
          backgroundImage: "url('/images/principles-purple-bg.png')",
          backgroundRepeat: "repeat",
        }}
      >
        {/* Ambient Purple/Violet Nebula Glow Highlights */}
        <div 
          className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(168,85,247,0.22)_0%,transparent_70%)] pointer-events-none" 
          aria-hidden="true" 
        />
        <div 
          className="absolute -bottom-32 -left-32 w-[550px] h-[550px] bg-[radial-gradient(circle,rgba(139,92,246,0.18)_0%,transparent_70%)] pointer-events-none" 
          aria-hidden="true" 
        />

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 relative z-10">
          
          {/* Glowing Pill Badge: • OUR CORE PRINCIPLES • (Purple) */}
          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-purple-950/70 border border-purple-500/50 shadow-[0_0_18px_rgba(168,85,247,0.35)] backdrop-blur-md mb-4">
            <span className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_#c084fc] animate-pulse" />
            <span className="text-xs font-black uppercase tracking-[0.25em] text-purple-200">
              Our Core Principles
            </span>
            <span className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_#c084fc] animate-pulse" />
          </div>

          {/* Heading with purple highlight and swoop underline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            How We Deliver{" "}
            <span className="relative inline-block text-purple-400">
              Consistent Excellence
              {/* Curved hand-drawn swoop underline (Purple) */}
              <svg
                className="absolute -bottom-2 left-0 w-full overflow-visible"
                height="12"
                viewBox="0 0 260 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 8C65 2 195 2 257 8"
                  stroke="#c084fc"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  className="drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]"
                />
              </svg>
            </span>
          </h2>
        </div>

        {/* 4 Floating 3D Frosted Glass Cards Grid (Buttons removed as requested) */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 items-stretch">
          {PRINCIPLES.map((card, idx) => (
            <div
              key={idx}
              className="relative group p-6 sm:p-7 rounded-[30px] backdrop-blur-2xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/20 hover:border-purple-400/80 shadow-[0_15px_40px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.45),0_0_24px_rgba(168,85,247,0.2)] transition-all duration-300 hover:-translate-y-2 flex flex-col justify-start"
            >
              {/* 3D Floating Icon with Glowing Pedestal/Backdrop */}
              <div className="relative w-24 h-22 mx-auto mb-4 flex items-center justify-center">
                <Image
                  src={card.iconSrc}
                  alt={card.iconAlt}
                  width={95}
                  height={85}
                  className="object-contain filter drop-shadow-[0_0_16px_rgba(168,85,247,0.6)] group-hover:scale-105 transition-transform duration-300"
                  priority
                />
              </div>

              {/* Specular Light Bar */}
              <div 
                className="w-16 h-[1px] bg-gradient-to-r from-transparent via-purple-300/60 to-transparent my-3 mx-auto" 
                aria-hidden="true" 
              />

              {/* Card Title */}
              <h3 className="text-lg font-bold text-white mb-2.5 text-center leading-snug">
                {card.title}
              </h3>

              {/* Card Description */}
              <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-normal text-center">
                {card.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
