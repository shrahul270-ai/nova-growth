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
      className="relative py-14 sm:py-20 px-4 sm:px-6 md:px-12 z-10 max-w-7xl mx-auto font-satoshi"
    >
      {/* Outer Card with Modern Industrial styling */}
      <div className="relative rounded-[4px] overflow-hidden border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.85)] bg-[#0c0818] p-6 sm:p-10 lg:p-14 text-white">
        {/* Ambient Violet Highlights */}
        <div 
          className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(104,31,228,0.18)_0%,transparent_70%)] pointer-events-none" 
          aria-hidden="true" 
        />
        <div 
          className="absolute -bottom-32 -left-32 w-[550px] h-[550px] bg-[radial-gradient(circle,rgba(34,0,144,0.18)_0%,transparent_70%)] pointer-events-none" 
          aria-hidden="true" 
        />

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 relative z-10">
          
          {/* Glowing Pill Badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-1.5 rounded-[2px] bg-white/5 border border-white/10 text-white text-xs font-bebas tracking-[0.2em] uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-[#681fe4] animate-pulse" />
            <span>OUR CORE PRINCIPLES // 03</span>
            <span className="w-2 h-2 rounded-full bg-[#681fe4] animate-pulse" />
          </div>

          {/* Heading */}
          <h2 className="font-bebas text-3xl sm:text-5xl lg:text-6xl text-white tracking-[0.16em] uppercase leading-tight">
            HOW WE DELIVER <span className="text-[#681fe4]">CONSISTENT EXCELLENCE</span>
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {PRINCIPLES.map((card, idx) => (
            <div
              key={idx}
              className="relative p-6 sm:p-7 rounded-[4px] bg-[#07030d] border border-white/10 hover:border-[#681fe4] transition-all flex flex-col justify-start"
            >
              {/* Icon */}
              <div className="relative w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Image
                  src={card.iconSrc}
                  alt={card.iconAlt}
                  width={80}
                  height={80}
                  className="object-contain filter grayscale"
                  priority
                />
              </div>

              {/* Specular Light Bar */}
              <div 
                className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#681fe4] to-transparent my-3 mx-auto" 
                aria-hidden="true" 
              />

              {/* Card Title */}
              <h3 className="font-bebas text-lg sm:text-xl text-white mb-2.5 text-center leading-snug tracking-[0.12em] uppercase">
                {card.title}
              </h3>

              {/* Card Description */}
              <p className="text-xs text-neutral-300 leading-relaxed font-normal text-center">
                {card.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
