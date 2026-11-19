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
      className="group relative w-full h-full rounded-3xl p-6 sm:p-7 select-none flex flex-col justify-between bg-white border border-amber-200/80 hover:border-amber-400 shadow-sm hover:shadow-xl hover:shadow-amber-900/5 transition-all duration-300"
    >
      {/* Featured Ribbon */}
      {service.popular && (
        <div className="absolute top-0 right-6 -translate-y-0.5 z-20">
          <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-white font-extrabold text-xs uppercase tracking-wider px-3.5 py-1 rounded-b-xl shadow-xs border-x border-b border-amber-600/40 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>Popular</span>
          </span>
        </div>
      )}

      {/* Top Header Row */}
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-xs bg-amber-50 border border-amber-200/80 transition-transform duration-300 group-hover:scale-105 shrink-0">
              <span>{service.icon3D}</span>
            </div>

            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/80">
                {service.badge}
              </span>
              <span className="block text-xs text-slate-500 mt-0.5 font-semibold">
                {service.category}
              </span>
            </div>
          </div>

          {/* Turnaround Time (TAT) Badge */}
          <div className="text-right">
            <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">
              Turnaround
            </span>
            <span className="text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 px-2.5 py-0.5 rounded-lg inline-block mt-0.5">
              ⏱ {service.tat}
            </span>
          </div>
        </div>

        {/* Title & Tagline (Fixes Issue 9: Tagline text >= 12px) */}
        <h3 className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight leading-snug mb-2 group-hover:text-amber-700 transition-colors">
          {service.name}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5 font-normal">
          {service.tagline}
        </p>

        {/* Deliverables Checklist (Fixes Issue 10: Touch-friendly 'Full Scope' button with proper affordance) */}
        <div className="border-t border-slate-100 pt-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Core Deliverables:
            </h4>
            <button
              type="button"
              onClick={() => onViewScope(service)}
              className="px-3 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 font-bold text-xs border border-amber-200/80 transition-all cursor-pointer inline-flex items-center gap-1 shadow-2xs hover:scale-105 active:scale-95"
            >
              <span>Full Scope</span>
              <span>→</span>
            </button>
          </div>

          <ul className="space-y-2">
            {service.deliverables.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs text-slate-700 font-medium leading-tight group-hover:translate-x-0.5 transition-transform duration-300"
              >
                <span className="text-amber-600 font-bold shrink-0 mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Pricing & CTAs */}
      <div className="relative z-10 border-t border-slate-100 pt-5 mt-auto">
        {/* Price Output */}
        <div className="flex items-start justify-between gap-2 mb-5">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 uppercase tracking-wider">
              <span>{countryConfig.flag}</span>
              <span>
                {countryConfig.name} ({countryConfig.currency})
              </span>
            </div>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                {displayPrice}
              </span>
              {displaySuffix && (
                <span className="text-xs font-medium text-slate-500">
                  {displaySuffix}
                </span>
              )}
            </div>
            {inrReference && (
              <div className="inline-block mt-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                {inrReference}
              </div>
            )}
          </div>

          <div className="text-right shrink-0">
            <span className="text-xs text-amber-800 bg-amber-50 border border-amber-200/80 px-2.5 py-0.5 rounded-full font-bold">
              Verified Escrow
            </span>
          </div>
        </div>

        {/* Dedicated Hub Pages */}
        {service.id === "flutter-app-dev" && (
          <Link
            href="/services/flutter-app-dev"
            className="w-full mb-3 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-amber-50/50 hover:bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold transition-all shadow-2xs"
          >
            <span>📱 Open Dedicated Flutter Hub Page</span>
            <span>→</span>
          </Link>
        )}

        {service.id === "full-stack-php-dev" && (
          <Link
            href="/services/full-stack-php-dev"
            className="w-full mb-3 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-amber-50/50 hover:bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold transition-all shadow-2xs"
          >
            <span>🐘 Open Dedicated PHP Hub Page</span>
            <span>→</span>
          </Link>
        )}

        {/* Action CTAs (Fixes Issue 1: Standardized button styles) */}
        <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-2.5">
          {/* Primary CTA: WhatsApp Quote */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-yellow-500 text-white font-bold text-xs py-2.5 px-3 rounded-full shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer text-center w-full"
          >
            <span>Instant Quote</span>
            <span>💬</span>
          </a>

          {/* Secondary CTA: Book Strategy Call Modal */}
          <button
            type="button"
            onClick={() => onBookCall(service)}
            className="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-amber-50/50 text-slate-800 font-bold text-xs py-2.5 px-3 rounded-full border border-slate-200 hover:border-amber-400 shadow-2xs transition-all cursor-pointer text-center w-full"
          >
            <span>Strategy Call</span>
            <span>📅</span>
          </button>
        </div>
      </div>
    </div>
  );
}
