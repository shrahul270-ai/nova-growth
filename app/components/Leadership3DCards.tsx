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
    bio: "Publisher specialist managing direct relationships with 850+ vetted digital publications across Tier-1 US, UK, and global editorial networks.",
    avatarSrc: "/images/leadership/real-avatar-media.png",
    avatarAlt: "Media Relations Lead - Editorial Outreach & Digital PR",
  },
];

export default function Leadership3DCards() {
  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6 md:px-12 z-10 overflow-hidden bg-transparent text-white font-satoshi">
      {/* Background Subtle Grid Lines */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" 
        aria-hidden="true" 
      />
      
      {/* Top Violet Nebula Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-[radial-gradient(ellipse_at_top,rgba(104,31,228,0.18)_0%,transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center justify-center px-5 py-1.5 rounded-[2px] border border-white/10 bg-white/5 backdrop-blur-xl mb-4">
            <span className="text-xs font-bebas tracking-[0.24em] text-[#681fe4] uppercase">
              Leadership Team
            </span>
          </div>

          <h2 className="font-bebas text-3xl sm:text-5xl lg:text-6xl text-white tracking-[0.16em] uppercase leading-tight">
            MEET THE STRATEGISTS BEHIND{" "}
            <span className="text-[#681fe4]">BALAJI PRIME MEDIA</span>
          </h2>
        </div>

        {/* Leadership Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {TEAM_MEMBERS.map((member, idx) => (
            <div
              key={idx}
              className="relative rounded-[4px] p-8 bg-[#0c0818] border border-white/10 hover:border-[#681fe4] shadow-xl transition-all duration-300 flex flex-col items-center text-center justify-between"
            >
              {/* Avatar with Grayscale Filter */}
              <div className="w-24 h-24 rounded-full p-1 bg-white/5 border border-[#681fe4] mb-6 overflow-hidden shrink-0">
                <Image
                  src={member.avatarSrc}
                  alt={member.avatarAlt}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover rounded-full filter grayscale contrast-125"
                  priority
                />
              </div>

              {/* Name & Role */}
              <div className="mb-4">
                <h3 className="font-bebas text-2xl text-white tracking-[0.14em] uppercase leading-tight">
                  {member.name}
                </h3>
                <span className="font-bebas text-xs tracking-[0.18em] text-[#681fe4] uppercase block mt-1">
                  {member.role}
                </span>
              </div>

              {/* Bio */}
              <p className="text-xs text-neutral-300 leading-relaxed font-normal my-auto">
                {member.bio}
              </p>

              {/* LinkedIn / Profile Link */}
              <div className="mt-4 pt-3 border-t border-white/10 w-full flex items-center justify-center">
                <a
                  href="https://www.linkedin.com/company/balajiprimemedia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] font-bebas tracking-[0.14em] text-[#38bdf8] hover:text-white uppercase transition-colors"
                >
                  <span>Connect on LinkedIn</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
