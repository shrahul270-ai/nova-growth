"use client";

import React, { useRef, useState, MouseEvent } from "react";
import Link from "next/link";

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

    // Calculate rotation (-10deg to 10deg)
    const rotX = ((y - centerY) / centerY) * -9;
    const rotY = ((x - centerX) / centerX) * 9;

    setRotateX(rotX);
    setRotateY(rotY);

    // Glare position in percent
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.35,
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
      className="relative w-full h-full perspective-[1200px] select-none"
    >
      {/* 3D Atmospheric Background Glow */}
      <div
        className="absolute -inset-1 rounded-[34px] pointer-events-none transition-opacity duration-700 blur-2xl -z-10"
        style={{
          background: service.gradient,
          opacity: isHovered ? 0.65 : 0.22,
        }}
        aria-hidden="true"
      />

      {/* 3D Transform Container */}
      <div
        style={{
          transform: isHovered
            ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(12px)`
            : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)",
          transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
          background: `linear-gradient(145deg, rgba(20, 20, 24, 0.94) 0%, rgba(10, 10, 14, 0.98) 100%)`,
          boxShadow: isHovered
            ? "0 30px 60px -12px rgba(0, 0, 0, 0.75), 0 0 30px 2px rgba(245, 158, 11, 0.15)"
            : "0 15px 35px -10px rgba(0, 0, 0, 0.5)",
        }}
        className="relative w-full h-full rounded-[28px] p-6 sm:p-7 flex flex-col justify-between border border-white/10 hover:border-white/25 overflow-hidden transition-all duration-300 backdrop-blur-xl"
      >
        {/* Dynamic Light Glare Overlay */}
        <div
          className="absolute inset-0 pointer-events-none rounded-[28px] transition-opacity duration-300 z-30"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, ${glarePos.opacity}) 0%, transparent 60%)`,
          }}
          aria-hidden="true"
        />

        {/* Popular Ribbon if applicable */}
        {service.popular && (
          <div className="absolute top-0 right-7 -translate-y-1 z-20">
            <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-[#091427] font-black text-[10px] uppercase tracking-wider px-3 py-1 rounded-b-xl shadow-md border-x border-b border-amber-300">
              ★ High Demand
            </span>
          </div>
        )}

        {/* Top Header Row */}
        <div>
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              {/* 3D Floating Icon Sphere */}
              <div
                className="w-13 h-13 rounded-2xl flex items-center justify-center text-2xl shadow-lg border border-white/15 transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 100%)",
                  boxShadow: "inset 0 1px 1px rgba(255,255,255,0.25), 0 8px 16px rgba(0,0,0,0.4)",
                }}
              >
                <span>{service.icon3D}</span>
              </div>

              <div>
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                  {service.badge}
                </span>
                <span className="block text-[11px] text-gray-400 mt-0.5">
                  {service.category}
                </span>
              </div>
            </div>

            {/* Turnaround Time (TAT) Badge */}
            <div className="text-right">
              <span className="text-[10px] font-semibold text-gray-400 block uppercase tracking-wider">
                Turnaround
              </span>
              <span className="text-xs font-bold text-white bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg inline-block mt-0.5">
                ⏱ {service.tat}
              </span>
            </div>
          </div>

          {/* Card Title & Tagline */}
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug mb-2 hover:text-amber-300 transition-colors">
            {service.name}
          </h3>
          <p className="text-xs sm:text-[13px] text-gray-300 leading-relaxed mb-5 font-normal">
            {service.tagline}
          </p>

          {/* Deliverables Checklist */}
          <div className="border-t border-white/10 pt-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                Core Deliverables:
              </h4>
              <button
                type="button"
                onClick={() => onViewScope(service)}
                className="text-[11px] font-semibold text-amber-400 hover:text-amber-300 underline cursor-pointer"
              >
                Full Scope →
              </button>
            </div>

            <ul className="space-y-2">
              {service.deliverables.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-xs text-gray-300 font-normal leading-tight"
                >
                  <span className="text-amber-400 font-bold shrink-0 mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section: Dual Pricing & CTAs */}
        <div className="border-t border-white/10 pt-5 mt-auto">
          {/* Price Output */}
          <div className="flex items-baseline justify-between mb-5">
            <div>
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block">
                Standard Pricing ({currency})
              </span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {currentPrice}
                </span>
                <span className="text-xs font-medium text-gray-400">
                  {currentSuffix}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded-full font-semibold">
                Guaranteed Delivery
              </span>
            </div>
          </div>

          {/* Action CTAs (Primary & Secondary) */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* Primary CTA: WhatsApp Instant Quote */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#091427] font-bold text-xs py-3 px-3 rounded-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_4px_12px_rgba(245,158,11,0.3)] transition-all cursor-pointer text-center"
            >
              <span>Instant Quote</span>
              <span className="group-hover:translate-x-0.5 transition-transform text-sm">💬</span>
            </a>

            {/* Secondary CTA: Book Strategy Call Modal */}
            <button
              type="button"
              onClick={() => onBookCall(service)}
              className="inline-flex items-center justify-center gap-1 bg-white/10 hover:bg-white/20 active:scale-95 text-white font-semibold text-xs py-3 px-3 rounded-xl border border-white/15 hover:border-white/30 transition-all cursor-pointer text-center"
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
