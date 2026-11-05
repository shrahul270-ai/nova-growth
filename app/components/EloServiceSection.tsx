"use client";

import React from "react";
import Link from "next/link";

export interface EloServiceItem {
  id: string;
  name: string;
  outcome: string;
  monogram: "search" | "code" | "quill" | "mail" | "link" | "shield";
  statLeftValue: string;
  statLeftLabel: string;
  statRightValue: string;
  statRightLabel: string;
  photoUrl: string;
  photoAlt: string;
  gradient: string;
  targetService: string;
}

const ELO_SERVICES: EloServiceItem[] = [
  {
    id: "seo-optimization",
    name: "SEO Optimization",
    outcome: "Rank #1 on Google with data-driven search strategy",
    monogram: "search",
    statLeftValue: "+240%",
    statLeftLabel: "Website Visitors",
    statRightValue: "+180%",
    statRightLabel: "Direct Inquiries",
    photoUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    photoAlt: "SEO Optimization - Analytics Dashboard & Organic Traffic Growth Charts",
    gradient: "radial-gradient(130% 120% at 50% 0%, rgb(176, 64, 18) 0%, rgb(46, 13, 4) 100%)",
    targetService: "SEO Optimization (Global & Local)",
  },
  {
    id: "website-development",
    name: "Website Development",
    outcome: "Ultra-fast Next.js engineering with sub-second loads",
    monogram: "code",
    statLeftValue: "99/100",
    statLeftLabel: "PageSpeed Score",
    statRightValue: "<1.1s",
    statRightLabel: "Core Web Vitals",
    photoUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    photoAlt: "Website Development - Modern Web Developer Coding High-Speed Interface",
    gradient: "linear-gradient(145deg, rgb(236, 96, 28) 0%, rgb(250, 150, 56) 100%)",
    targetService: "Website Development (Next.js / Headless)",
  },
  {
    id: "content-writing",
    name: "Content Writing",
    outcome: "From invisible to fully booked through editorial copy",
    monogram: "quill",
    statLeftValue: "+362%",
    statLeftLabel: "Qualified Leads",
    statRightValue: "+75%",
    statRightLabel: "Online Bookings",
    photoUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80",
    photoAlt: "Content Writing & Strategy - Editorial Craftsmanship & Copywriting Desk",
    gradient: "radial-gradient(130% 120% at 50% 0%, rgb(132, 52, 22) 0%, rgb(24, 9, 5) 100%)",
    targetService: "Content Strategy & Copywriting",
  },
  {
    id: "email-marketing",
    name: "Email Marketing",
    outcome: "Automated retention & high-deliverability nurture sequences",
    monogram: "mail",
    statLeftValue: "42.8%",
    statLeftLabel: "Avg. Open Rate",
    statRightValue: "3.8x",
    statRightLabel: "Retention ROI",
    photoUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    photoAlt: "Email Marketing & Automation - Digital Communication & Nurture Campaigns",
    gradient: "linear-gradient(145deg, rgb(217, 80, 20) 0%, rgb(154, 40, 10) 100%)",
    targetService: "Email Marketing & Automation",
  },
  {
    id: "backlink-building",
    name: "Off Page Backlink Building",
    outcome: "High-authority ethical link building and digital PR",
    monogram: "link",
    statLeftValue: "DR 50–90+",
    statLeftLabel: "Editorial Sites",
    statRightValue: "100%",
    statRightLabel: "Manual Outreach",
    photoUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    photoAlt: "Off Page Backlink Building - Global High-Authority Publisher Network",
    gradient: "radial-gradient(130% 120% at 50% 0%, rgb(194, 65, 12) 0%, rgb(45, 15, 6) 100%)",
    targetService: "Guest Posting & DR 50+ Backlinks",
  },
  {
    id: "website-maintenance",
    name: "Website Maintenance",
    outcome: "Continuous 24/7 uptime monitoring & zero-downtime hardening",
    monogram: "shield",
    statLeftValue: "99.98%",
    statLeftLabel: "Uptime SLA",
    statRightValue: "24/7",
    statRightLabel: "Security Defense",
    photoUrl: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=800&q=80",
    photoAlt: "Website Maintenance & Security - Active Cyber Shield & System Hardening",
    gradient: "linear-gradient(145deg, rgb(234, 88, 12) 0%, rgb(180, 83, 9) 100%)",
    targetService: "Page Speed & Maintenance Fix",
  },
];

function renderMonogram(type: EloServiceItem["monogram"]) {
  switch (type) {
    case "search":
      return (
        <svg className="w-5 h-5 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
      );
    case "code":
      return (
        <svg className="w-5 h-5 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
        </svg>
      );
    case "quill":
      return (
        <svg className="w-5 h-5 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path d="M12 19l7-7 3 3-7 7-3-3z" />
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
          <path d="M2 2l7.586 7.586" />
          <circle cx="11" cy="11" r="2" />
        </svg>
      );
    case "mail":
      return (
        <svg className="w-5 h-5 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      );
    case "link":
      return (
        <svg className="w-5 h-5 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      );
    case "shield":
      return (
        <svg className="w-5 h-5 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    default:
      return null;
  }
}

interface EloServiceSectionProps {
  onSelectService?: (serviceName: string) => void;
}

export default function EloServiceSection({ onSelectService }: EloServiceSectionProps) {
  const headlineWords = [
    "How", "businesses", "achieved", "measurable", "results", "with", "Balaji", "Prime", "Media"
  ];

  return (
    <section
      id="services"
      className="relative py-16 sm:py-24 px-4 sm:px-6 md:px-12 z-10 bg-[#E9EEF3] text-[#154359] overflow-hidden font-['Lexend',sans-serif]"
    >
      {/* Subtle dot matrix grid matching design plate */}
      <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      {/* Background ambient lighting */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none -z-0"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-sky-400/10 rounded-full blur-[120px] pointer-events-none -z-0"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header: Centered Bold Headline & Two-Line Lead */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-slate-300/80 text-[12px] font-semibold text-amber-800 mb-5 backdrop-blur-md shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#ec601c] animate-pulse" />
            <span className="tracking-wide uppercase font-[500]">Measurable Results &amp; Services</span>
          </div>

          {/* Centered Headline with word spans for elegant staggered typography */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-[600] text-[#154359] tracking-tight leading-[1.15] mb-5">
            {headlineWords.map((word, i) => (
              <span key={i} className="inline-block mr-[0.28em] transition-transform duration-300 hover:text-[#ec601c]">
                {word}
              </span>
            ))}
          </h2>

          {/* Two-line lead in Lexend 300 */}
          <p className="text-[15px] sm:text-base md:text-[17px] font-[400] text-[#475569] leading-relaxed max-w-2xl mx-auto">
            Our clients come from very different industries, but the goal is always the same: measurable results.
            The projects below show the results that are actually possible.
          </p>
        </div>

        {/* 6 Tall Result Cards in 3-Column Responsive Grid (2-col on tablets, 1-col on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8 items-stretch">
          {ELO_SERVICES.map((card, idx) => (
            <Link
              key={card.id}
              href={`/services/${card.id}`}
              className="group relative rounded-[24px] sm:rounded-[28px] p-6 sm:p-7 flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-500 ease-out hover:-translate-y-2.5 shadow-2xl hover:shadow-[0_25px_60px_-15px_rgba(236,96,28,0.45)] border border-white/20 select-none min-h-[490px] sm:min-h-[520px]"
              style={{
                background: card.gradient,
              }}
            >
              {/* Subtle inner noise texture / border glow */}
              <div
                className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/30 pointer-events-none rounded-[inherit]"
                aria-hidden="true"
              />

              {/* CARD TOP ROW: Client Service Name + Monogram */}
              <div className="relative z-10 flex items-start justify-between gap-3 mb-4">
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-[600] text-white tracking-tight leading-snug">
                    {card.name}
                  </h3>
                  <p className="text-xs sm:text-[13px] font-[300] text-white/85 leading-snug mt-1">
                    {card.outcome}
                  </p>
                </div>

                {/* White Line Monogram Icon in Top Right */}
                <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110">
                  {renderMonogram(card.monogram)}
                </div>
              </div>

              {/* STATS ROW: Two big stats side by side, divided by a thin white rule */}
              <div className="relative z-10 my-4 py-4 border-y border-white/20 grid grid-cols-2 gap-3 items-center">
                <div className="pr-2">
                  <div className="text-2xl sm:text-3xl font-[600] text-white tracking-tight">
                    {card.statLeftValue}
                  </div>
                  <div className="text-[11px] sm:text-xs font-[300] text-white/80 mt-0.5 tracking-wide">
                    {card.statLeftLabel}
                  </div>
                </div>

                <div className="pl-3 border-l border-white/20">
                  <div className="text-2xl sm:text-3xl font-[600] text-white tracking-tight">
                    {card.statRightValue}
                  </div>
                  <div className="text-[11px] sm:text-xs font-[300] text-white/80 mt-0.5 tracking-wide">
                    {card.statRightLabel}
                  </div>
                </div>
              </div>

              {/* PHOTO SECTION: Lower Part Framed by Stacked Translucent "Paper" Layers */}
              <div className="relative z-10 mt-2 pt-4">
                {/* Translucent Stacked Paper Layer 1 (Bottom, tilted left) */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-3 -top-1 bottom-3 bg-white/10 backdrop-blur-md rounded-2xl -rotate-2 group-hover:-rotate-4 group-hover:-top-3 transition-transform duration-500 ease-out border border-white/20 shadow-xs"
                />

                {/* Translucent Stacked Paper Layer 2 (Middle, tilted right) */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-3 0 bottom-2 bg-white/20 backdrop-blur-md rounded-2xl rotate-2 group-hover:rotate-4 group-hover:-top-1 transition-transform duration-500 ease-out border border-white/30 shadow-md"
                />

                {/* Main Photo Container (Top Layer) */}
                <div className="relative z-10 w-full h-44 sm:h-48 rounded-2xl overflow-hidden shadow-2xl border border-white/40 group-hover:scale-[1.02] transition-transform duration-500 ease-out">
                  <img
                    src={card.photoUrl}
                    alt={card.photoAlt}
                    loading={idx < 3 ? "eager" : "lazy"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Subtle dark gradient overlay at base of photo */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

                  {/* "View Full Details" badge on hover */}
                  <div className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-md text-white text-[11px] font-[500] px-3 py-1 rounded-full border border-white/20 flex items-center gap-1 shadow-sm opacity-90 group-hover:opacity-100 group-hover:bg-black/80 transition-all">
                    <span>View Full Details</span>
                    <span className="text-xs group-hover:translate-x-0.5 transition-transform">→</span>
                  </div>
                </div>
              </div>

            </Link>
          ))}
        </div>

        {/* Button: A white pill with a soft border, "View more projects" / "View All Services", centred below */}
        <div className="mt-14 sm:mt-16 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white hover:bg-neutral-100 text-[#000] text-sm font-[600] transition-all duration-300 shadow-xl hover:shadow-2xl border border-neutral-300 hover:border-black cursor-pointer group hover:scale-[1.02]"
          >
            <span>View All Services &amp; Full Pricing</span>
            <svg
              className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}
