"use client";

import React, { useRef, useState, MouseEvent } from "react";

export interface AgencyService {
  id: string;
  name: string;
  tagline: string;
  category: "Development" | "Optimization" | "Marketing & Content" | "Support";
  priceINR: string;
  priceUSD: string;
  pricingSuffixINR: string;
  pricingSuffixUSD: string;
  numericINR: number;
  numericUSD: number;
  tat: string;
  deliverablesSummary: string;
  deliverables: string[];
  gradient: string;
  accentColor: string;
  icon3D: string;
  badge: string;
  popular?: boolean;
}

interface ThreeDServiceCardProps {
  service: AgencyService;
  currency: "INR" | "USD";
  onBookCall: (service: AgencyService) => void;
  onViewScope: (service: AgencyService) => void;
}

export default function ThreeDServiceCard({
  service,
  currency,
  onBookCall,
  onViewScope,
}: ThreeDServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle natural tilt (-6deg to 6deg)
    const rotX = ((y - centerY) / centerY) * -5;
    const rotY = ((x - centerX) / centerX) * 5;

    setRotateX(rotX);
    setRotateY(rotY);

    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.2,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Balaji Prime Media, I am interested in ${service.name}.`
  );
  const whatsappUrl = `https://wa.me/918000417058?text=${whatsappMessage}`;

  const currentPrice = currency === "INR" ? service.priceINR : service.priceUSD;
  const currentSuffix =
    currency === "INR" ? service.pricingSuffixINR : service.pricingSuffixUSD;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-service-id={service.id}
      data-price-inr={service.priceINR}
      data-price-usd={service.priceUSD}
      className="relative w-full h-full select-none"
    >
      {/* Ambient Radial Hover Halo (Footer Indigo/Purple Hue) */}
      <div
        className="absolute -inset-1 rounded-[32px] pointer-events-none transition-opacity duration-500 blur-xl -z-10"
        style={{
          background: "radial-gradient(circle, rgba(168,85,247,0.3) 0%, rgba(99,102,241,0.15) 60%, transparent 80%)",
          opacity: isHovered ? 0.8 : 0,
        }}
        aria-hidden="true"
      />

      {/* Main Luxury Glass Card */}
      <div
        style={{
          transform: isHovered
            ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`
            : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)",
          transition: isHovered ? "transform 0.1s ease-out" : "transform 0.4s ease-out",
          background: "linear-gradient(180deg, rgba(20, 16, 32, 0.85) 0%, rgba(12, 10, 20, 0.95) 100%)",
          boxShadow: isHovered
            ? "0 20px 40px -15px rgba(0, 0, 0, 0.8), 0 0 25px 1px rgba(168, 85, 247, 0.2)"
            : "0 10px 30px -10px rgba(0, 0, 0, 0.6)",
        }}
        className="relative w-full h-full rounded-[26px] p-6 sm:p-7 flex flex-col justify-between border border-[#2B2144] hover:border-[#a855f7]/60 overflow-hidden transition-all duration-300 backdrop-blur-2xl"
      >
        {/* Subtle Light Glare Layer */}
        <div
          className="absolute inset-0 pointer-events-none rounded-[26px] transition-opacity duration-300 z-30"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, ${glarePos.opacity}) 0%, transparent 60%)`,
          }}
          aria-hidden="true"
        />

        {/* Popular Ribbon if applicable */}
        {service.popular && (
          <div className="absolute top-0 right-6 -translate-y-0.5 z-20">
            <span className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-b-xl shadow-lg shadow-purple-950/80 border-x border-b border-[#c084fc]/40">
              ✦ Featured
            </span>
          </div>
        )}

        {/* Card Header & Content */}
        <div>
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              {/* Floating Icon Container with Footer-matched Indigo/Purple Gradient */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-md border border-[#a855f7]/30 transition-transform duration-300 group-hover:scale-105 shrink-0"
                style={{
                  background: "linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(168, 85, 247, 0.15) 100%)",
                  boxShadow: "inset 0 1px 1px rgba(255,255,255,0.2), 0 4px 12px rgba(0,0,0,0.5)",
                }}
              >
                <span>{service.icon3D}</span>
              </div>

              <div>
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#c084fc] bg-[#1E1638] px-2.5 py-0.5 rounded-full border border-[#a855f7]/30">
                  {service.badge}
                </span>
                <span className="block text-[11px] text-[#94a3b8] mt-0.5">
                  {service.category}
                </span>
              </div>
            </div>

            {/* Turnaround Time (TAT) Badge in Dark Luxury Pill */}
            <div className="text-right">
              <span className="text-[10px] font-medium text-[#7D7D7D] block uppercase tracking-wider">
                Turnaround
              </span>
              <span className="text-xs font-semibold text-[#e2e8f0] bg-[#161126] border border-[#2B2144] px-2.5 py-0.5 rounded-lg inline-block mt-0.5">
                ⏱ {service.tat}
              </span>
            </div>
          </div>

          {/* Title & Tagline */}
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug mb-2 group-hover:text-purple-100 transition-colors">
            {service.name}
          </h3>
          <p className="text-xs sm:text-[13px] text-[#ADADAD] leading-relaxed mb-5 font-normal">
            {service.tagline}
          </p>

          {/* Deliverables Checklist */}
          <div className="border-t border-[#231A33] pt-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#7D7D7D]">
                Core Deliverables:
              </h4>
              <button
                type="button"
                onClick={() => onViewScope(service)}
                className="text-[11px] font-semibold text-[#c084fc] hover:text-[#e9d5ff] transition-colors cursor-pointer"
              >
                Full Scope →
              </button>
            </div>

            <ul className="space-y-2">
              {service.deliverables.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-xs text-[#cbd5e1] font-normal leading-tight"
                >
                  <span className="text-[#a855f7] font-bold shrink-0 mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pricing & CTAs */}
        <div className="border-t border-[#231A33] pt-5 mt-auto">
          {/* Price Output */}
          <div className="flex items-baseline justify-between mb-5">
            <div>
              <span className="text-[10px] font-medium text-[#7D7D7D] uppercase tracking-wider block">
                Standard Pricing ({currency})
              </span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {currentPrice}
                </span>
                <span className="text-xs font-normal text-[#94a3b8]">
                  {currentSuffix}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-[#a855f7] bg-[#1E1638] border border-[#a855f7]/30 px-2.5 py-0.5 rounded-full font-medium">
                Verified Escrow
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* Primary CTA: WhatsApp Quote */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#6366f1] via-[#7c3aed] to-[#a855f7] hover:brightness-110 active:scale-95 text-white font-semibold text-xs py-3 px-3 rounded-xl shadow-[0_4px_16px_rgba(124,58,237,0.35)] transition-all cursor-pointer text-center"
            >
              <span>Instant Quote</span>
              <span className="group-hover:translate-x-0.5 transition-transform text-xs">💬</span>
            </a>

            {/* Secondary CTA: Book Strategy Call Modal */}
            <button
              type="button"
              onClick={() => onBookCall(service)}
              className="inline-flex items-center justify-center gap-1 bg-[#161126] hover:bg-[#201838] active:scale-95 text-white font-semibold text-xs py-3 px-3 rounded-xl border border-[#2B2144] hover:border-[#a855f7]/40 transition-all cursor-pointer text-center"
            >
              <span>Strategy Call</span>
              <span>📅</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
