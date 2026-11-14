"use client";

import React, { useState } from "react";
import Link from "next/link";

export type CountryCode = "IN" | "US" | "GB" | "CA" | "AU" | "AE";

export interface CountryInfo {
  code: CountryCode;
  name: string;
  flag: string;
  currency: string;
  symbol: string;
  rateFromUSD: number;
}

export const COUNTRIES_CONFIG: Record<CountryCode, CountryInfo> = {
  IN: { code: "IN", name: "India", flag: "🇮🇳", currency: "INR", symbol: "₹", rateFromUSD: 87 },
  US: { code: "US", name: "USA", flag: "🇺🇸", currency: "USD", symbol: "$", rateFromUSD: 1 },
  GB: { code: "GB", name: "UK", flag: "🇬🇧", currency: "GBP", symbol: "£", rateFromUSD: 0.79 },
  CA: { code: "CA", name: "Canada", flag: "🇨🇦", currency: "CAD", symbol: "C$", rateFromUSD: 1.38 },
  AU: { code: "AU", name: "Australia", flag: "🇦🇺", currency: "AUD", symbol: "A$", rateFromUSD: 1.54 },
  AE: { code: "AE", name: "UAE", flag: "🇦🇪", currency: "AED", symbol: "AED ", rateFromUSD: 3.67 },
};

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
  countryPricing?: Partial<
    Record<
      CountryCode,
      {
        price: string;
        suffix?: string;
        inrEquivalent?: string;
      }
    >
  >;
}

interface ThreeDServiceCardProps {
  service: AgencyService;
  currency?: "INR" | "USD" | string;
  country?: CountryCode;
  onBookCall: (service: AgencyService) => void;
  onViewScope: (service: AgencyService) => void;
  index?: number;
}

export default function ThreeDServiceCard({
  service,
  currency = "USD",
  country = "US",
  onBookCall,
  onViewScope,
  index = 0,
}: ThreeDServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const countryConfig = COUNTRIES_CONFIG[country] || COUNTRIES_CONFIG.US;
  const customPricing = service.countryPricing?.[country];

  let displayPrice = "";
  let displaySuffix = "";
  let inrReference = customPricing?.inrEquivalent;

  if (customPricing?.price) {
    displayPrice = customPricing.price;
    displaySuffix = customPricing.suffix || service.pricingSuffixUSD;
  } else {
    if (country === "IN") {
      displayPrice = service.priceINR;
      displaySuffix = service.pricingSuffixINR;
    } else if (country === "US") {
      displayPrice = service.priceUSD;
      displaySuffix = service.pricingSuffixUSD;
    } else {
      const converted = Math.round(service.numericUSD * countryConfig.rateFromUSD);
      displayPrice = `${countryConfig.symbol}${converted.toLocaleString()}`;
      displaySuffix = service.pricingSuffixUSD;
      inrReference = `Approx. ${service.priceINR}`;
    }
  }

  const whatsappMessage = encodeURIComponent(
    `Hi Balaji Prime Media, I am interested in ${service.name} (${displayPrice} ${countryConfig.name}).`
  );
  const whatsappUrl = `https://wa.me/917690868932?text=${whatsappMessage}`;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-service-id={service.id}
      data-country={country}
      className="group relative w-full h-full rounded-[26px] p-[1.5px] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_-12px_rgba(168,85,247,0.3)] select-none flex flex-col bg-[#161127] border border-[#2B2144]/80 hover:border-[#a855f7]/60"
    >
      {/* Subtle Glow on Desktop Hover */}
      <div
        className="hidden lg:block absolute inset-[-100%] rounded-[26px] pointer-events-none transition-opacity duration-500 group-hover:animate-spin-slow -z-10"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, 
            transparent 0%, 
            rgba(99, 102, 241, 0.15) 20%, 
            rgba(168, 85, 247, 0.85) 45%, 
            rgba(216, 180, 254, 0.95) 50%, 
            rgba(168, 85, 247, 0.85) 55%, 
            rgba(99, 102, 241, 0.15) 80%, 
            transparent 100%)`,
          opacity: isHovered ? 0.9 : 0,
        }}
        aria-hidden="true"
      />

      {/* Main Luxury Card Inner Canvas */}
      <div className="relative w-full h-full rounded-[24.5px] bg-[#0D091A] p-6 sm:p-7 flex flex-col justify-between overflow-hidden">
        {/* Ambient Light Orb inside the card */}
        <div
          className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-2xl pointer-events-none transition-opacity duration-300 opacity-20 group-hover:opacity-40"
          style={{
            background: service.gradient,
          }}
          aria-hidden="true"
        />

        {/* Featured Ribbon */}
        {service.popular && (
          <div className="absolute top-0 right-6 -translate-y-0.5 z-20">
            <span className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-b-xl shadow-lg shadow-purple-950/80 border-x border-b border-[#c084fc]/40 flex items-center gap-1">
              <span className="text-[10px] animate-ping inline-block w-1 h-1 rounded-full bg-white mr-0.5" />
              <span>✦ Popular</span>
            </span>
          </div>
        )}

        {/* Top Header Row */}
        <div className="relative z-10">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-md border border-[#a855f7]/30 transition-transform duration-300 group-hover:scale-105 shrink-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(168, 85, 247, 0.2) 100%)",
                  boxShadow:
                    "inset 0 1px 1px rgba(255,255,255,0.25), 0 8px 16px rgba(0,0,0,0.5)",
                }}
              >
                <span>{service.icon3D}</span>
              </div>

              <div>
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#c084fc] bg-[#1E1638] px-2.5 py-0.5 rounded-full border border-[#a855f7]/30">
                  {service.badge}
                </span>
                <span className="block text-[11px] text-[#94a3b8] mt-0.5 font-medium">
                  {service.category}
                </span>
              </div>
            </div>

            {/* Turnaround Time (TAT) Badge */}
            <div className="text-right">
              <span className="text-[10px] font-medium text-[#7D7D7D] block uppercase tracking-wider">
                Turnaround
              </span>
              <span className="text-xs font-semibold text-[#e2e8f0] bg-[#18122B] border border-[#2B2144] px-2.5 py-0.5 rounded-lg inline-block mt-0.5">
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
                  className="flex items-start gap-2.5 text-xs text-[#cbd5e1] font-normal leading-tight group-hover:translate-x-0.5 transition-transform duration-300"
                >
                  <span className="text-[#a855f7] font-bold shrink-0 mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pricing & CTAs */}
        <div className="relative z-10 border-t border-[#231A33] pt-5 mt-auto">
          {/* Price Output */}
          <div className="flex items-start justify-between gap-2 mb-5">
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-semibold text-[#a855f7] uppercase tracking-wider">
                <span>{countryConfig.flag}</span>
                <span>
                  {countryConfig.name} ({countryConfig.currency})
                </span>
              </div>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-xl sm:text-2xl lg:text-[26px] font-black text-white tracking-tight">
                  {displayPrice}
                </span>
                {displaySuffix && (
                  <span className="text-xs font-normal text-[#94a3b8]">
                    {displaySuffix}
                  </span>
                )}
              </div>
              {inrReference && (
                <div className="inline-block mt-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                  {inrReference}
                </div>
              )}
            </div>

            <div className="text-right shrink-0">
              <span className="text-[10px] text-[#c084fc] bg-[#1E1638] border border-[#a855f7]/30 px-2.5 py-0.5 rounded-full font-medium">
                Verified Escrow
              </span>
            </div>
          </div>

          {/* Dedicated Page Link for Flutter Service */}
          {service.id === "flutter-app-dev" && (
            <Link
              href="/services/flutter-app-dev"
              className="w-full mb-3 inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-indigo-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-400/40 text-cyan-300 hover:text-white text-xs font-bold transition-all shadow-md group/hub"
            >
              <span>📱 Open Dedicated Flutter Hub Page</span>
              <span className="group-hover/hub:translate-x-1 transition-transform">→</span>
            </Link>
          )}

          {/* Action CTAs */}
          <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-2.5">
            {/* Primary CTA: WhatsApp Quote */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn relative inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#6366f1] via-[#7c3aed] to-[#a855f7] hover:brightness-110 active:scale-95 text-white font-semibold text-xs py-3 px-3 rounded-xl shadow-[0_4px_16px_rgba(124,58,237,0.35)] transition-all cursor-pointer text-center overflow-hidden w-full"
            >
              <span className="relative z-10 whitespace-nowrap">Instant Quote</span>
              <span className="relative z-10 group-hover/btn:translate-x-0.5 transition-transform text-xs">💬</span>
            </a>

            {/* Secondary CTA: Book Strategy Call Modal */}
            <button
              type="button"
              onClick={() => onBookCall(service)}
              className="inline-flex items-center justify-center gap-1 bg-[#18122B] hover:bg-[#251A40] active:scale-95 text-white font-semibold text-xs py-3 px-3 rounded-xl border border-[#2B2144] hover:border-[#a855f7]/40 transition-all cursor-pointer text-center w-full whitespace-nowrap"
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
