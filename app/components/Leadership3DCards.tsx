"use client";

import React from "react";
import Image from "next/image";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatarSrc: string;
  avatarAlt: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Rahul Sharma",
    role: "Founder & Lead Digital Strategist",
    bio: "Search specialist and founder of Balaji Prime Media with over 7 years executing technical SEO, high-DA editorial outreach, and international organic acquisition.",
    avatarSrc: "/images/leadership/real-avatar-rahul.png",
    avatarAlt: "Rahul Sharma - Founder & Lead Digital Strategist",
  },
  {
    name: "Engineering Team",
    role: "Full-Stack Web Architects",
    bio: "Next.js & modern frontend developers focused on ultra-fast headless architectures, Core Web Vitals optimization, and high-converting performance pipelines.",
    avatarSrc: "/images/leadership/real-avatar-engineering.png",
    avatarAlt: "Engineering Team - Full-Stack Web Architects",
  },
  {
    name: "Media Relations Lead",
    role: "Head of Editorial Outreach & Digital PR",
    bio: "Publisher specialist managing direct relationships with 850+ vetted DR 50–90+ digital publications across Tier-1 US, UK, and global editorial networks.",
    avatarSrc: "/images/leadership/real-avatar-media.png",
    avatarAlt: "Media Relations Lead - Editorial Outreach & Digital PR",
  },
];

export default function Leadership3DCards() {
  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6 md:px-12 z-10 overflow-hidden bg-transparent text-white">
      {/* Background Cosmic Starfield & Ambient Glows */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:32px_32px] opacity-35 pointer-events-none" 
        aria-hidden="true" 
      />
      
      {/* Top Purple/Violet Nebula Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.18)_0%,rgba(139,92,246,0.08)_50%,transparent_75%)] pointer-events-none"
        aria-hidden="true"
      />

      {/* Bottom Purple Floor Underglow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[350px] bg-[radial-gradient(ellipse_at_bottom,rgba(168,85,247,0.16)_0%,rgba(192,132,252,0.08)_40%,transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          {/* Glowing Pill Badge (Purple) */}
          <div className="inline-flex items-center justify-center px-7 py-2 rounded-full border border-purple-400/80 bg-[#12082b]/90 shadow-[0_0_22px_rgba(168,85,247,0.65),inset_0_0_12px_rgba(168,85,247,0.35)] backdrop-blur-xl mb-6">
            <span className="text-xs sm:text-sm font-black tracking-[0.28em] text-purple-200 uppercase">
              LEADERSHIP
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Meet the Strategists Behind{" "}
            <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-300 bg-clip-text text-transparent">
              Balaji Prime Media
            </span>
          </h2>
        </div>

        {/* 3D Glassmorphism Cards Grid - Perfectly Balanced Height (items-stretch) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8 items-stretch">
          {TEAM_MEMBERS.map((member, idx) => (
            <div
              key={idx}
              className="relative flex flex-col items-center group transition-transform duration-500 hover:-translate-y-2 h-full justify-between"
            >
              {/* Outer Card Glass Container (Exact Equal Height for all 3 cards) */}
              <div className="relative w-full max-w-[370px] min-h-[380px] sm:min-h-[400px] pt-14 pb-8 px-6 sm:px-7 rounded-[32px] backdrop-blur-2xl bg-gradient-to-b from-white/[0.12] via-white/[0.04] to-purple-500/[0.08] border border-purple-400/40 group-hover:border-purple-400/80 shadow-[0_12px_40px_rgba(0,0,0,0.6),0_0_28px_rgba(168,85,247,0.22),inset_0_1px_2px_rgba(255,255,255,0.45)] transition-all duration-500 flex flex-col items-center text-center justify-between flex-1">
                
                {/* 3D Circular Avatar (Clean Professional Portrait with Luxury Purple Neon Halo - ZERO Red) */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-20">
                  <div className="relative w-24 h-24 sm:w-[104px] sm:h-[104px] rounded-full p-[3px] bg-gradient-to-b from-purple-400 via-fuchsia-400 to-indigo-600 shadow-[0_0_25px_rgba(168,85,247,0.85),inset_0_0_15px_rgba(168,85,247,0.5)] transition-all duration-500 group-hover:shadow-[0_0_35px_rgba(168,85,247,1),inset_0_0_20px_rgba(168,85,247,0.7)] group-hover:scale-105">
                    {/* Inner glowing halo ring */}
                    <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-b from-[#1c0d38] via-[#120726] to-[#060210] flex items-center justify-center border border-purple-300/40">
                      <Image
                        src={member.avatarSrc}
                        alt={member.avatarAlt}
                        width={104}
                        height={104}
                        className="w-full h-full object-cover"
                        priority
                      />
                    </div>
                  </div>
                </div>

                {/* Top content wrapper */}
                <div className="w-full flex flex-col items-center">
                  {/* Specular Light Reflection Bar at Top of Glass */}
                  <div 
                    className="w-2/3 h-[1px] bg-gradient-to-r from-transparent via-purple-300/70 to-transparent mt-2 mb-4" 
                    aria-hidden="true" 
                  />

                  {/* Member Name */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                    {member.name}
                  </h3>

                  {/* Subtitle / Role (Amber Gold) */}
                  <span className="text-xs sm:text-sm font-semibold text-[#f59e0b] block mt-1.5 mb-4 tracking-wide min-h-[36px] flex items-center justify-center">
                    {member.role}
                  </span>
                </div>

                {/* Description Bio (Equalized line length and proportion) */}
                <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-normal px-1 my-auto">
                  {member.bio}
                </p>

                {/* Subtle Inner Glass Floor Reflection */}
                <div 
                  className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mt-4" 
                  aria-hidden="true" 
                />
              </div>

              {/* 3D Illuminated Podium Pedestal directly under the card (Purple Neon - Equal horizontal baseline) */}
              <div className="relative flex flex-col items-center w-full mt-[-8px] pointer-events-none" aria-hidden="true">
                
                {/* Stepped Top Neon Purple Disc */}
                <div className="w-[240px] sm:w-[270px] h-7 rounded-[100%] border-[1.5px] border-purple-300 bg-gradient-to-r from-purple-500/40 via-fuchsia-400/60 to-purple-500/40 shadow-[0_0_24px_rgba(168,85,247,0.85)] z-10" />

                {/* Metallic Cylinder Body */}
                <div className="w-[250px] sm:w-[280px] h-6 -mt-3.5 rounded-b-[100%] bg-gradient-to-b from-[#1a0e38] via-[#0d0720] to-[#04010d] border-b border-purple-400/50 shadow-2xl z-0" />

                {/* Bottom Neon Violet Glowing Rim */}
                <div className="w-[265px] sm:w-[295px] h-7 -mt-3.5 rounded-[100%] border border-purple-400/80 bg-purple-500/15 shadow-[0_0_32px_rgba(168,85,247,0.8)]" />

                {/* Floor Radial Glow & Soft Ambient Reflection */}
                <div className="w-[300px] sm:w-[330px] h-9 -mt-3.5 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.45)_0%,rgba(139,92,246,0.25)_45%,transparent_75%)] blur-md" />
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
