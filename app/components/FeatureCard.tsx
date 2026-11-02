"use client";

import React from "react";

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  delay?: number;
  onClick?: () => void;
  badge?: string;
}

export default function FeatureCard({
  title,
  description,
  icon,
  gradient,
  delay = 0,
  onClick,
  badge,
}: FeatureCardProps) {
  return (
    <div
      onClick={onClick}
      className="relative flex flex-col justify-start items-start w-full group mx-auto cursor-pointer"
      style={{
        animation: `cardFadeUp 0.8s ease-out ${delay}s both`,
      }}
    >
      {/* Glow Background (Crucial Requirement: absolute positioned div behind card with filter blur(45px)) */}
      <div
        className="absolute inset-0 w-full h-full opacity-60 rounded-[32px] md:rounded-[40px] pointer-events-none transition-opacity duration-500 group-hover:opacity-85 -z-0"
        style={{
          background: gradient,
          filter: "blur(45px)",
        }}
        aria-hidden="true"
      />

      {/* Foreground Card with Gradient Border (Crucial Requirement: 8px transparent border with background-clip) */}
      <div
        className="relative self-stretch w-full min-h-[220px] md:min-h-[240px] rounded-[32px] md:rounded-[40px] z-10 overflow-hidden transition-all duration-300 group-hover:-translate-y-1.5"
        style={{
          border: "8px solid transparent",
          background: `linear-gradient(#1A1A1C, #1A1A1C) padding-box, ${gradient} border-box`,
        }}
      >
        {/* Content Inner Layout: w-full h-full p-7 flex flex-col justify-between */}
        <div className="w-full h-full p-6 sm:p-7 flex flex-col justify-between">
          {/* Top row: Icon (size 32, strokeWidth 2.5, text-white/90) & Arrow */}
          <div className="flex items-center justify-between mb-4">
            <div className="text-white/90 transition-transform duration-300 group-hover:scale-110">
              {icon}
            </div>
            {badge ? (
              <span className="text-[10px] sm:text-[11px] font-bold text-white/80 bg-white/10 px-2.5 py-1 rounded-full border border-white/10 backdrop-blur-sm">
                {badge}
              </span>
            ) : (
              <span className="text-white/40 text-lg transition-transform duration-300 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            )}
          </div>

          {/* Titles & Descriptions */}
          <div>
            <h3 className="text-white font-medium text-lg sm:text-xl mb-2 sm:mb-2.5 tracking-tight group-hover:text-white transition-colors">
              {title}
            </h3>
            <p className="text-gray-400 text-[13.5px] sm:text-[14px] leading-[1.6] font-normal selection:bg-white/20">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
