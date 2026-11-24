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
      className="group relative w-full h-full rounded-[4px] p-6 sm:p-7 select-none flex flex-col justify-between bg-[#0c0818] border border-white/10 hover:border-[#681fe4]/60 shadow-lg hover:shadow-[0_10px_30px_rgba(104,31,228,0.15)] transition-all duration-300 font-satoshi"
    >
      {/* Featured Ribbon */}
      {service.popular && (
        <div className="absolute top-0 right-6 -translate-y-0.5 z-20">
          <span className="bg-[#681fe4] text-white font-bebas text-xs uppercase tracking-[0.18em] px-3.5 py-1 rounded-b-[2px] shadow-sm flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>POPULAR</span>
          </span>
        </div>
      )}

      {/* Top Header Row */}
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-[4px] flex items-center justify-center text-xl shadow-xs bg-white/5 border border-white/10 group-hover:border-[#681fe4] transition-all shrink-0">
              <span>{service.icon3D}</span>
            </div>

            <div>
              <span className="inline-block text-[11px] font-bebas tracking-[0.16em] uppercase text-[#681fe4] bg-[#681fe4]/10 px-2.5 py-0.5 rounded-[2px] border border-[#681fe4]/30">
                {service.badge}
              </span>
              <span className="block text-[11px] text-neutral-400 mt-0.5 font-mono">
                {service.category}
              </span>
            </div>
          </div>

          {/* Turnaround Time (TAT) Badge */}
          <div className="text-right">
            <span className="text-[10px] font-mono text-neutral-400 block uppercase">
              TAT
            </span>
            <span className="text-[11px] font-mono font-bold text-white bg-white/5 border border-white/10 px-2 py-0.5 rounded-[2px] inline-block mt-0.5">
              ⏱ {service.tat}
            </span>
          </div>
        </div>

        {/* Title & Tagline */}
        <h3 className="font-bebas text-xl sm:text-2xl text-white tracking-[0.14em] uppercase leading-tight mb-2 group-hover:text-[#681fe4] transition-colors">
          {service.name}
        </h3>
        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-5 font-normal">
          {service.tagline}
        </p>

        {/* Deliverables Checklist */}
        <div className="border-t border-white/10 pt-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-bebas text-xs tracking-[0.18em] text-neutral-400 uppercase">
              CORE DELIVERABLES:
            </h4>
            <button
              type="button"
              onClick={() => onViewScope(service)}
              className="px-2.5 py-0.5 rounded-[2px] bg-white/5 hover:bg-[#681fe4] text-white font-bebas text-xs tracking-[0.14em] border border-white/15 transition-all cursor-pointer inline-flex items-center gap-1 uppercase"
            >
              <span>FULL SCOPE</span>
              <span>→</span>
            </button>
          </div>

          <ul className="space-y-2">
            {service.deliverables.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-xs text-neutral-300 font-normal leading-tight"
              >
                <span className="text-[#681fe4] font-bold shrink-0 mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Pricing & CTAs */}
      <div className="relative z-10 border-t border-white/10 pt-5 mt-auto">
        {/* Price Output */}
        <div className="flex items-start justify-between gap-2 mb-5">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bebas tracking-[0.14em] text-[#681fe4] uppercase">
              <span>{countryConfig.flag}</span>
              <span>
                {countryConfig.name} ({countryConfig.currency})
              </span>
            </div>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="font-bebas text-2xl sm:text-3xl text-white tracking-[0.08em]">
                {displayPrice}
              </span>
              {displaySuffix && (
                <span className="text-xs text-neutral-400 font-mono">
                  {displaySuffix}
                </span>
              )}
            </div>
            {inrReference && (
              <div className="inline-block mt-1 text-[11px] font-mono text-[#681fe4] bg-[#681fe4]/10 border border-[#681fe4]/30 px-2 py-0.5 rounded-[2px]">
                {inrReference}
              </div>
            )}
          </div>

          <div className="text-right shrink-0">
            <span className="text-[10px] text-white/80 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-[2px] font-mono uppercase">
              Verified Escrow
            </span>
          </div>
        </div>

        {/* Dedicated Hub / Service Detail Link */}
        {(() => {
          const serviceSlugMap: Record<string, string> = {
            "starter-business-web": "website-development",
            "ecommerce-website-dev": "website-development",
            "custom-web-application": "website-development",
            "flutter-mobile-app": "flutter-app-dev",
            "flutter-app-dev": "flutter-app-dev",
            "fullstack-php-dev": "full-stack-php-dev",
            "full-stack-php-dev": "full-stack-php-dev",
            "full-funnel-seo": "seo-optimization",
            "seo-optimization": "seo-optimization",
            "monthly-link-building": "backlink-building",
            "backlink-building": "backlink-building",
            "content-strategy-writing": "content-writing",
            "content-writing": "content-writing",
            "email-revenue-automation": "email-marketing",
            "email-marketing": "email-marketing",
            "annual-site-maintenance": "website-maintenance",
            "website-maintenance": "website-maintenance",
          };
          const targetSlug = serviceSlugMap[service.id] || "website-development";
          return (
            <Link
              href={`/services/${targetSlug}`}
              className="w-full mb-3 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-[4px] bg-white/5 hover:bg-[#681fe4]/20 border border-white/15 hover:border-[#681fe4]/50 text-white font-bebas text-xs tracking-[0.14em] transition-all uppercase"
            >
              <span>VIEW FULL SERVICE SPECIFICATIONS &amp; SCOPE</span>
              <span>→</span>
            </Link>
          );
        })()}

        {/* Action CTAs */}
        <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-2.5">
          {/* Primary CTA: WhatsApp Quote */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 bg-[#681fe4] hover:bg-[#5815cb] text-white font-bebas text-xs sm:text-sm tracking-[0.14em] py-2.5 px-3 rounded-[4px] shadow-[0_4px_14px_rgba(104,31,228,0.3)] transition-all cursor-pointer text-center w-full uppercase"
          >
            <span>INSTANT QUOTE</span>
            <span>💬</span>
          </a>

          {/* Secondary CTA: Book Strategy Call Modal */}
          <button
            type="button"
            onClick={() => onBookCall(service)}
            className="inline-flex items-center justify-center gap-1.5 bg-white/5 hover:bg-white/10 text-white font-bebas text-xs sm:text-sm tracking-[0.14em] py-2.5 px-3 rounded-[4px] border border-white/15 transition-all cursor-pointer text-center w-full uppercase"
          >
            <span>STRATEGY CALL</span>
            <span>📅</span>
          </button>
        </div>
      </div>
    </div>
  );
}
