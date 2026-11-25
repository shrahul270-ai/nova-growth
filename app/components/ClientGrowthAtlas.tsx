"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface ClientCase {
  id: string;
  code: string;
  name: string;
  domain: string;
  liveUrl: string;
  industry: string;
  location: string;
  image: string;
  tags: { text: string; color: string }[];
  overview: string;
  challenge: string;
  solution: string;
  techStack: string[];
  metrics: {
    value: string;
    label: string;
    sub: string;
    color: string;
  }[];
}

const CLIENT_CASES: ClientCase[] = [
  {
    id: "nordhaus",
    code: "CASE #01",
    name: "Nordhaus Estates",
    domain: "nordhaus-estates.com",
    liveUrl: "https://nordhaus-estates.com",
    industry: "Luxury Architecture & Real Estate",
    location: "Munich, Zurich & Vienna (DACH Region)",
    image:
      "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/d469e4d7-94ba-4457-ad51-b589766069f0.webp",
    tags: [
      { text: "+663% Inbound Leads", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40" },
      { text: "Next.js 15 Architecture", color: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40" },
      { text: "High-DR Backlinks", color: "bg-purple-500/20 text-purple-300 border-purple-500/40" },
      { text: "DA 64 Scaled", color: "bg-amber-500/20 text-amber-300 border-amber-500/40" },
    ],
    overview:
      "A premier European luxury architectural showroom needing international visibility across Germany, Austria, and Switzerland.",
    challenge:
      "Suffered from slow 4.6s legacy WordPress page speed, poor mobile indexing, and zero rank for high-intent German & English commercial terms.",
    solution:
      "Engineered an ultra-fast headless Next.js digital experience with multi-currency dynamic quoting and 45+ high-authority editorial placements in verified design publications.",
    techStack: ["Next.js 15 SSR", "Tailwind CSS", "Headless CMS", "Google SERP Optimization"],
    metrics: [
      { value: "+663%", label: "Inbound Client Leads", sub: "Month 6 vs baseline", color: "text-emerald-400" },
      { value: "99 / 100", label: "Lighthouse Mobile Score", sub: "Passed Core Web Vitals", color: "text-cyan-400" },
      { value: "184,000", label: "Monthly Organic Visits", sub: "+320% traffic surge", color: "text-purple-400" },
      { value: "82 Terms", label: "Google Top 3 Positions", sub: "High commercial intent", color: "text-amber-400" },
    ],
  },
  {
    id: "hotel-mira",
    code: "CASE #02",
    name: "Hotel Mira Zermatt",
    domain: "hotelmira-alps.ch",
    liveUrl: "https://hotelmira-alps.ch",
    industry: "Alpine Luxury Hotel & Spa",
    location: "Swiss Alps & International Guests",
    image:
      "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/c42a7f3d-d802-4377-8cc6-9c209cdfad5f.webp",
    tags: [
      { text: "+240% Direct Bookings", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40" },
      { text: "Zero OTA Commission", color: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40" },
      { text: "#1 Local Map Pack", color: "bg-amber-500/20 text-amber-300 border-amber-500/40" },
      { text: "Multilingual SEO", color: "bg-purple-500/20 text-purple-300 border-purple-500/40" },
    ],
    overview:
      "A boutique chalet resort paying heavy 22% OTA commissions to Booking.com, seeking direct bookings from UK, US, and EU affluent travelers.",
    challenge:
      "High dependency on middleman booking channels, weak direct organic conversions, and slow photo-heavy suite galleries.",
    solution:
      "Delivered a lightning-fast Next.js direct booking portal, localized SEO in English, German, and French, with schema-rich room rich snippets.",
    techStack: ["Next.js 15", "Edge Caching", "Stripe Checkout", "Multilingual Schema"],
    metrics: [
      { value: "+240%", label: "Direct Guest Bookings", sub: "70% commission savings", color: "text-emerald-400" },
      { value: "0.4s", label: "Instant Page Load", sub: "Sub-second CDN latency", color: "text-cyan-400" },
      { value: "11,200+", label: "Direct Monthly Inquiries", sub: "Zero commission leads", color: "text-purple-400" },
      { value: "DA 58", label: "Domain Authority", sub: "+31 points in 7 months", color: "text-amber-400" },
    ],
  },
  {
    id: "studio-bella",
    code: "CASE #03",
    name: "Studio Bella Medical",
    domain: "studiobella-aesthetics.co.uk",
    liveUrl: "https://studiobella-aesthetics.co.uk",
    industry: "High-End Medical Aesthetic Clinic",
    location: "London (Mayfair) & Manchester, UK",
    image:
      "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/76508d4b-ba8c-4f7f-85ff-8d59cc909241.webp",
    tags: [
      { text: "4-Week Patient Waitlist", color: "bg-purple-500/20 text-purple-300 border-purple-500/40" },
      { text: "London Top 3 SERP", color: "bg-amber-500/20 text-amber-300 border-amber-500/40" },
      { text: "HIPAA / GDPR Compliant", color: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40" },
      { text: "+410% Private Consults", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40" },
    ],
    overview:
      "Harley Street standard aesthetic clinic needing high-intent patient acquisition for non-invasive cosmetic and dermatological treatments.",
    challenge:
      "Intense UK competition in private cosmetic healthcare with paid Google Ads CPC reaching over £28 per click.",
    solution:
      "Ranked #1 for competitive UK cosmetic queries through medical-reviewed E-E-A-T content hubs, physician author schema, and NHS-trusted backlinks.",
    techStack: ["Next.js App Router", "Sanity CMS", "Framer Motion", "E-E-A-T Medical SEO"],
    metrics: [
      { value: "+410%", label: "Private Consults Booked", sub: "4-week clinic waitlist", color: "text-purple-400" },
      { value: "£28k/mo", label: "Ad Spend Saved", sub: "Replaced with pure SEO", color: "text-emerald-400" },
      { value: "#1 Rank", label: "Top London Queries", sub: "14 core treatments in Top 3", color: "text-cyan-400" },
      { value: "98%", label: "Patient Booking UX", sub: "Mobile conversion rate", color: "text-amber-400" },
    ],
  },
  {
    id: "aether-cloud",
    code: "CASE #04",
    name: "Aether Cloud Platform",
    domain: "aethercloud-systems.io",
    liveUrl: "https://aethercloud-systems.io",
    industry: "Enterprise B2B Cloud & Security SaaS",
    location: "Austin, Texas & San Francisco, USA",
    image:
      "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/f52e5d79-2423-4558-a579-2ef429b6e6f4.webp",
    tags: [
      { text: "$4.2M Enterprise Pipeline", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40" },
      { text: "Global US SERP Dominance", color: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40" },
      { text: "Programmatic Tech SEO", color: "bg-purple-500/20 text-purple-300 border-purple-500/40" },
      { text: "SOC2 Type II Ready", color: "bg-amber-500/20 text-amber-300 border-amber-500/40" },
    ],
    overview:
      "Fast-growing B2B cybersecurity SaaS requiring qualified CTO and VP Engineering demo signups across North American enterprises.",
    challenge:
      "Technical jargon without search volume mapping; zero organic ranking against incumbents like Palo Alto Networks and Datadog.",
    solution:
      "Constructed programmatic comparison hubs, deployed technical documentation SEO, and earned high-tier backlinks from TechCrunch, HackerNews, and Forbes.",
    techStack: ["Next.js Enterprise", "TypeScript", "MDX Docs Engine", "Programmatic SEO"],
    metrics: [
      { value: "$4.2M", label: "Sales Pipeline Sourced", sub: "Direct SEO attribution", color: "text-emerald-400" },
      { value: "340+", label: "Enterprise Demos", sub: "Quarterly qualified bookings", color: "text-cyan-400" },
      { value: "+580%", label: "Organic Search Growth", sub: "US developer traffic", color: "text-purple-400" },
      { value: "DA 71", label: "Authority Score", sub: "Top 1% tech industry profile", color: "text-amber-400" },
    ],
  },
];

export default function ClientGrowthAtlas() {
  const [activeTab, setActiveTab] = useState(0);
  const client = CLIENT_CASES[activeTab];

  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 md:px-12 z-10 border-t border-purple-500/20 bg-gradient-to-b from-[#09041a] via-[#060216] to-[#0a0520] text-white">
      {/* Background Volumetric Violet Glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(160,104,255,0.12)_0%,transparent_70%)] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/70 border border-purple-500/30 text-[12px] font-semibold text-purple-300 mb-3 backdrop-blur-md shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#22d3ee] animate-pulse" />
              <span>Verified Global Portfolio</span>
            </div>
            <h3 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Client Results &amp; Website Showcase
            </h3>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Real international websites engineered by Balaji Prime Media with verifiable organic traffic, top Google SERP rankings, and measurable revenue growth.
            </p>
          </div>

          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 text-white text-[13px] font-bold px-5 py-2.5 rounded-full transition-all self-start md:self-auto cursor-pointer shadow-[0_0_20px_rgba(160,104,255,0.4)] hover:shadow-[0_0_30px_rgba(160,104,255,0.7)] hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #A068FF 0%, #7928CA 60%, #4F46E5 100%)",
            }}
          >
            <span>Start Your Growth Plan →</span>
          </Link>
        </div>

        {/* Client Selection Navigation Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
          {CLIENT_CASES.map((item, index) => {
            const isActive = activeTab === index;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(index)}
                className={`group relative p-4 sm:p-5 rounded-2xl text-left transition-all duration-300 cursor-pointer overflow-hidden border flex flex-col justify-between ${
                  isActive
                    ? "bg-gradient-to-b from-[#1f114a] via-[#140a33] to-[#0d0524] border-[#A068FF] shadow-[0_12px_35px_rgba(160,104,255,0.4)] scale-[1.02]"
                    : "bg-[#0b0521]/80 hover:bg-[#150a38]/70 border-purple-500/20 hover:border-purple-500/40 text-slate-400 hover:text-white"
                }`}
              >
                {/* Active Top Glow Line */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#22d3ee] to-[#A068FF]" />
                )}

                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#d8b4fe] bg-purple-950/80 px-2 py-0.5 rounded-md border border-purple-500/30">
                    {item.code}
                  </span>
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      isActive
                        ? "bg-emerald-400 shadow-[0_0_10px_#34d399] animate-pulse"
                        : "bg-white/20"
                    }`}
                  />
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-purple-200 transition-colors truncate">
                  {item.name}
                </h4>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">
                  {item.industry}
                </p>
                <div className="mt-2.5 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-400">
                    {item.tags[0].text}
                  </span>
                  <span className="text-[10px] text-purple-300 font-medium opacity-70 group-hover:opacity-100 transition-opacity">
                    View Case ↗
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Interactive Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left Column: Live Website Mockup & Cybernetic Browser Frame (7 Cols) */}
          <div className="lg:col-span-7 bg-gradient-to-b from-[#11072d]/95 via-[#0b041f]/95 to-[#070216] rounded-3xl border border-purple-500/30 p-4 sm:p-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_35px_rgba(160,104,255,0.15)] backdrop-blur-2xl flex flex-col">
            
            {/* Realistic High-End Browser Window Chrome */}
            <div className="bg-[#070214] rounded-2xl border border-white/15 overflow-hidden shadow-2xl relative">
              
              {/* Browser Address Bar Header */}
              <div className="flex items-center justify-between px-3.5 sm:px-5 py-3 bg-gradient-to-r from-white/[0.06] via-white/[0.03] to-white/[0.06] border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
                  <span className="w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                </div>

                {/* Safe URL Pill with Live SSL Shield */}
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-black/60 border border-purple-500/30 text-[11.5px] text-slate-300 font-mono shadow-inner max-w-[280px] sm:max-w-md truncate">
                  <span className="text-emerald-400 text-xs">🔒</span>
                  <span className="text-purple-400/70 font-semibold">https://</span>
                  <span className="text-white font-bold">{client.domain}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10.5px] text-emerald-300 font-bold bg-emerald-500/20 px-2.5 py-1 rounded-full border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                    ● 200 OK
                  </span>
                </div>
              </div>

              {/* Live Website Preview Graphic with Floating Metric Badges */}
              <div className="relative w-full h-[300px] sm:h-[400px] md:h-[450px] overflow-hidden group">
                <Image
                  src={client.image}
                  alt={`${client.name} live website screenshot`}
                  fill
                  unoptimized
                  className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                />

                {/* Ambient dark gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070214] via-transparent to-black/25 pointer-events-none" />

                {/* Floating Metric Pill 1 (Top Left) */}
                <div className="absolute top-4 left-4 bg-[#0a031e]/90 backdrop-blur-xl border border-emerald-500/50 rounded-2xl px-3.5 py-2 shadow-[0_10px_25px_rgba(0,0,0,0.8),0_0_20px_rgba(16,185,129,0.3)] flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
                  <span className="text-xs sm:text-[13px] font-black text-white">{client.tags[0].text}</span>
                </div>

                {/* Floating Metric Pill 2 (Bottom Right) */}
                <div className="absolute bottom-4 right-4 bg-[#0a031e]/90 backdrop-blur-xl border border-cyan-500/50 rounded-2xl px-3.5 py-2 shadow-[0_10px_25px_rgba(0,0,0,0.8),0_0_20px_rgba(6,182,212,0.3)] flex items-center gap-2">
                  <span className="text-cyan-400 text-sm">⚡</span>
                  <span className="text-xs sm:text-[13px] font-black text-cyan-300">{client.tags[1].text}</span>
                </div>
              </div>
            </div>

            {/* Quick Tech Badges Row */}
            <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mr-1">
                  Engineered Stack:
                </span>
                {client.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-semibold px-3 py-1 rounded-lg bg-purple-950/60 border border-purple-500/30 text-purple-200 shadow-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="text-[11px] text-slate-300 font-medium flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-lg border border-white/10">
                <span>📍 Target Market:</span>
                <span className="text-white font-bold">{client.location}</span>
              </div>
            </div>
          </div>

          {/* Right Column: In-Depth Client Case Details & Verifiable Metrics (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-5">
            
            {/* Overview & Story Card */}
            <div className="bg-gradient-to-b from-[#11072d]/95 to-[#0b041f]/95 rounded-3xl border border-purple-500/30 p-6 sm:p-7 shadow-xl backdrop-blur-2xl">
              <div className="flex items-center justify-between mb-3.5">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#d8b4fe] bg-purple-950/80 px-2.5 py-1 rounded-md border border-purple-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A068FF]" />
                  {client.industry}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {client.domain}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {client.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2.5 leading-relaxed font-normal">
                {client.overview}
              </p>

              {/* Redesigned Luxury Challenge & Solution Blocks */}
              <div className="mt-5 space-y-3.5 pt-4 border-t border-white/10">
                {/* The Challenge Block */}
                <div className="bg-gradient-to-br from-rose-950/35 via-[#180824]/70 to-[#0e0419]/90 border border-rose-500/30 rounded-2xl p-4 shadow-[0_8px_25px_rgba(244,63,94,0.12)]">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-rose-300 uppercase tracking-wider bg-rose-500/20 border border-rose-500/40 px-2.5 py-0.5 rounded-full shadow-xs">
                      <span>⚠️</span>
                      <span>The Challenge</span>
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-normal">
                    {client.challenge}
                  </p>
                </div>

                {/* Balaji Prime Media Solution Block */}
                <div className="bg-gradient-to-br from-emerald-950/40 via-[#0a1e17]/70 to-[#0e0524]/90 border border-emerald-500/40 rounded-2xl p-4 shadow-[0_8px_30px_rgba(16,185,129,0.18)]">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-300 uppercase tracking-wider bg-emerald-500/25 border border-emerald-500/50 px-2.5 py-0.5 rounded-full shadow-xs">
                      <span>🚀</span>
                      <span>Balaji Prime Media Solution</span>
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-normal">
                    {client.solution}
                  </p>
                </div>
              </div>
            </div>

            {/* Verifiable Key Performance Metrics (4 Bento Stat Cards) */}
            <div className="grid grid-cols-2 gap-3 sm:gap-3.5">
              {client.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="group relative bg-gradient-to-b from-[#120833]/90 to-[#0a031f]/90 rounded-2xl border border-purple-500/30 hover:border-[#A068FF]/60 p-4 shadow-lg backdrop-blur-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-2xl sm:text-[26px] font-black ${metric.color} tracking-tight drop-shadow-sm`}>
                      {metric.value}
                    </span>
                    <span className="text-[10px] text-purple-400/60 font-mono">
                      ↗
                    </span>
                  </div>
                  <span className="text-xs font-bold text-white mt-2 leading-snug">
                    {metric.label}
                  </span>
                  <span className="text-[10.5px] text-slate-400 mt-1 font-medium">
                    {metric.sub}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom Action Strip */}
            <div className="bg-gradient-to-r from-[#1c0f45] via-[#140a33] to-[#0e0524] rounded-2xl border border-purple-500/40 p-4 sm:p-5 flex items-center justify-between gap-3 shadow-xl">
              <div>
                <p className="text-xs sm:text-sm font-bold text-white">
                  Want identical growth for your domain?
                </p>
                <p className="text-[11px] text-purple-200 mt-0.5">
                  Sub-second Next.js engineering + Tier-1 editorial SEO.
                </p>
              </div>

              <Link
                href="/contact-us"
                className="shrink-0 bg-gradient-to-r from-[#A068FF] to-[#7928CA] hover:from-[#b07eff] hover:to-[#8b35e0] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-[0_0_20px_rgba(160,104,255,0.4)] hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
              >
                Book Strategy →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
