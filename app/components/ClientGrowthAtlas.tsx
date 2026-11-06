"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface ClientCase {
  id: string;
  no: string;
  category: string;
  name: string;
  domain: string;
  industry: string;
  urlDisplay: string;
  image: string;
  scale: string;
  tags: string[];
  lede: string;
  era: {
    start: string;
    mid: string;
    peak: string;
    markerPos: number; // percentage 0-100
    label: string;
  };
  traits: [string, string, string][];
  haunt: string;
  caption: string;
  closeup: string;
  lensPos: string;
  stats: {
    highlight: string;
    label: string;
    metric2: string;
    metric2Label: string;
  };
  feature: [string, string];
}

const CLIENT_CASES: ClientCase[] = [
  {
    id: "nordhaus",
    no: "BPM-001",
    category: "Real Estate & Architecture",
    name: "Nordhaus Estates",
    domain: "nordhaus-estates.com",
    industry: "Luxury Architecture & Showrooms",
    urlDisplay: "https://nordhaus-estates.com",
    image:
      "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/d469e4d7-94ba-4457-ad51-b589766069f0.webp",
    scale: "1:1 Viewport • Next.js 15 SSR",
    tags: ["+663% Inbound Leads", "Next.js Architecture", "High-DR Backlinks", "DA 64 Scaled"],
    lede:
      "A high-end European architectural showroom struggling with invisible local rankings and sub-second page performance. Balaji Prime Media engineered a full headless Next.js digital experience paired with 45+ vetted editorial placements in international design publications.",
    era: {
      start: "M1: Full SEO Audit",
      mid: "M3: Content Clustering",
      peak: "M6: #1 SERP Dominance",
      markerPos: 84,
      label: "Month 6 • +663% Conversion Surge",
    },
    traits: [
      ["t-wing", "PageSpeed Score", "99 / 100 Mobile"],
      ["t-ruler", "Organic Traffic", "184,000 / month (+320%)"],
      ["t-time", "Qualified Leads", "+663% Inbound Inquiries"],
      ["t-diet", "Key Commercial Terms", "82 in Top 3 Google Ranks"],
      ["t-range", "Core Geographies", "Munich, Zurich, Vienna"],
    ],
    haunt: "High-net-worth real estate buyers across DACH & Scandinavian territories.",
    caption: "From local showroom to Europe's top digital property experience.",
    closeup: "Interactive 3D blueprint explorer with instant lead-booking integration.",
    lensPos: "45% 35%",
    stats: {
      highlight: "+663%",
      label: "Online Inbound Leads",
      metric2: "+32%",
      metric2Label: "Organic Traffic Growth",
    },
    feature: [
      "Leads multiplied 6.6x.",
      "Custom architectural interactive showroom built on Next.js 15 and ranked #1 on Google.",
    ],
  },
  {
    id: "hotel-mira",
    no: "BPM-002",
    category: "Alpine Luxury & Hospitality",
    name: "Hotel Mira",
    domain: "hotelmira-alps.ch",
    industry: "Chalet Hotel & Wellness",
    urlDisplay: "https://hotelmira-alps.ch/suites",
    image:
      "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/c42a7f3d-d802-4377-8cc6-9c209cdfad5f.webp",
    scale: "Custom Direct Booking Engine",
    tags: ["+240% Visitors", "Direct Bookings", "Local Map Pack #1", "No OTA Commission"],
    lede:
      "An alpine chalet boutique hotel paying exorbitant 22% OTA commissions to Booking.com and Expedia. Balaji Prime Media restructured their digital ecosystem, optimized multi-language schema, and executed high-authority travel editorial backlinks, enabling 70% direct guest acquisition.",
    era: {
      start: "Phase 1: OTA Audit",
      mid: "Phase 2: Speed Optimization",
      peak: "Phase 3: Direct Inquiries",
      markerPos: 76,
      label: "Month 4 • +180% Direct Reservations",
    },
    traits: [
      ["t-wing", "Direct Bookings", "+180% Direct Inquiries"],
      ["t-ruler", "Organic Visitors", "+240% Monthly Traffic"],
      ["t-time", "Commission Saved", "€145,000+ in Year 1"],
      ["t-diet", "Local 3-Pack Rank", "#1 for Luxury Alpine Chalet"],
      ["t-range", "Target Languages", "English, German, French, Italian"],
    ],
    haunt: "Discerning luxury travelers searching for authentic boutique retreats.",
    caption: "Glowing chalets at sunset, powered by commission-free direct reservations.",
    closeup: "One-click interactive room availability engine integrated with live calendar.",
    lensPos: "65% 40%",
    stats: {
      highlight: "+240%",
      label: "Website Visitors",
      metric2: "+180%",
      metric2Label: "Direct Inquiries",
    },
    feature: [
      "Zero reliance on OTAs.",
      "Boutique hotel transformed into a high-converting direct guest magnet.",
    ],
  },
  {
    id: "belle-peau",
    no: "BPM-003",
    category: "Medical Aesthetics & Spa",
    name: "Studio Belle Peau",
    domain: "bellepeau-medspa.com",
    industry: "Candle-lit Spa & Dermatology",
    urlDisplay: "https://bellepeau-medspa.com",
    image:
      "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/e791074d-795e-4b42-ad94-a6b113ecb72d.webp",
    scale: "HIPAA Compliant Client Portal",
    tags: ["+362% Qualified Leads", "Fully Booked", "Google Map Dominance", "SEO Outreach"],
    lede:
      "A luxury clinical aesthetic studio that opened right before an algorithmic search disruption. Balaji Prime Media crafted a tailored local entity authority blueprint, securing tier-1 lifestyle backlinks and implementing automated treatment booking flows.",
    era: {
      start: "Week 2: Keyword Blueprint",
      mid: "Week 6: Medical Backlinks",
      peak: "Week 12: Waitlist Reached",
      markerPos: 92,
      label: "Month 3 • 100% Calendar Capacity",
    },
    traits: [
      ["t-wing", "Lead Quality", "+362% Pre-Qualified Consults"],
      ["t-ruler", "Online Bookings", "+75% Automated Checkout"],
      ["t-time", "Booking Lead Time", "Zero wait, fully booked 6 wks out"],
      ["t-diet", "Average Ticket Size", "+42% Higher Package Sales"],
      ["t-range", "Client Retention", "78% Repeat Visit Rate"],
    ],
    haunt: "Affluent local professionals seeking high-touch medical spa treatments.",
    caption: "From zero digital footprint to 6-week client waiting lists.",
    closeup: "Interactive treatment selector with live real-time doctor availability.",
    lensPos: "30% 50%",
    stats: {
      highlight: "+362%",
      label: "Qualified Leads",
      metric2: "+75%",
      metric2Label: "Online Bookings",
    },
    feature: [
      "From invisible to fully booked.",
      "Tier-1 lifestyle editorial outreach that keeps spa appointment books overflowed.",
    ],
  },
  {
    id: "aether-cloud",
    no: "BPM-004",
    category: "Enterprise B2B SaaS",
    name: "Aether Cloud Analytics",
    domain: "aethercloud.io",
    industry: "Cloud Infrastructure Observability",
    urlDisplay: "https://aethercloud.io/enterprise",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    scale: "Multi-Region Edge Architecture",
    tags: ["$4.2M Pipeline", "Technical SEO", "B2B Lead Flow", "SOC2 Compliant"],
    lede:
      "A fast-growing DevSecOps SaaS platform needing enterprise organic pipeline for series B funding. Balaji Prime Media engineered 120+ programmatic comparison pages, high-authority developer documentation SEO, and high-impact whitepaper distribution.",
    era: {
      start: "Q1: Architecture Audit",
      mid: "Q2: Programmatic Pages",
      peak: "Q3: Pipeline Expansion",
      markerPos: 88,
      label: "Q3 • $4.2M Inbound Sales Pipeline",
    },
    traits: [
      ["t-wing", "Sales Pipeline", "$4.2M Verified Inbound"],
      ["t-ruler", "Developer Signups", "24,000 Free Tier Accounts"],
      ["t-time", "Crawl Budget", "99.8% Indexation Velocity"],
      ["t-diet", "Key Commercial Queries", "Rank #1 for 48 Dev terms"],
      ["t-range", "Global Scale", "US, UK, Germany, Singapore"],
    ],
    haunt: "CTOs and VP Engineering looking for next-generation cloud infrastructure.",
    caption: "Engineering commercial authority that closed multi-million dollar contracts.",
    closeup: "Interactive live telemetry sandbox preview with zero latency.",
    lensPos: "50% 50%",
    stats: {
      highlight: "$4.2M",
      label: "Inbound Pipeline",
      metric2: "24,000+",
      metric2Label: "Developer Signups",
    },
    feature: [
      "Dominating developer search.",
      "High-intent programmatic SEO that drives Fortune 500 sales demo calls.",
    ],
  },
];

export default function ClientGrowthAtlas() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [isDusk, setIsDusk] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isLeaving, setIsLeaving] = useState<boolean>(false);
  const [isCloseup, setIsCloseup] = useState<boolean>(false);

  const activeClient = CLIENT_CASES[activeIdx];

  const handleSelectTab = (idx: number) => {
    if (idx === activeIdx) return;
    setIsLeaving(true);
    setTimeout(() => {
      setActiveIdx(idx);
      setIsLeaving(false);
      setRotationAngle(0);
      setZoomLevel(1);
      setIsCloseup(false);
    }, 200);
  };

  const handleRotate = (deg: number) => {
    setRotationAngle((prev) => prev + deg);
  };

  return (
    <section
      id="growth-analyzer"
      className="relative w-full overflow-hidden transition-colors duration-600"
      style={{
        backgroundColor: isDusk ? "#17120d" : "#ebe1cd",
        color: isDusk ? "#f1e7d6" : "#241c14",
        fontFamily: "'Instrument Sans', 'Segoe UI', system-ui, sans-serif",
      }}
    >
      {/* SVG Icon Sprite */}
      <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
        <symbol id="i-home" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M4 11.5 12 5l8 6.5V20h-5.5v-5h-5v5H4z" />
        </symbol>
        <symbol id="i-star" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="m12 3.8 2.5 5.3 5.7.7-4.2 4 1.1 5.7-5.1-2.8-5.1 2.8L8 13.8l-4.2-4 5.7-.7z" />
        </symbol>
        <symbol id="i-claw" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 20c-1.5-3-1-7 1.5-10.5M12 20c-3.5-1.5-6-5-6.5-9.5M12 20c3.5-1.5 6-5 6.5-9.5M13.5 9.5 15 4M5.5 10.5 3.5 6M18.5 10.5 20.5 6" />
        </symbol>
        <symbol id="i-plus" viewBox="0 0 24 24">
          <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" d="m15.5 15.5 4.5 4.5M10.5 8v5M8 10.5h5" />
        </symbol>
        <symbol id="i-search" viewBox="0 0 24 24">
          <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" d="m15.5 15.5 4.5 4.5" />
        </symbol>
        <symbol id="i-expand" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5" />
        </symbol>
        <symbol id="i-sun" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="3.8" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M5.6 18.4l1.6-1.6M16.8 7.2l1.6-1.6" />
        </symbol>
        <symbol id="i-ccw" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M5 12a7 7 0 1 0 2.3-5.2L5 9M5 4.5V9h4.5" />
        </symbol>
        <symbol id="i-cw" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M19 12a7 7 0 1 1-2.3-5.2L19 9M19 4.5V9h-4.5" />
        </symbol>
        <symbol id="i-arrow" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M4 12h15M14 7l5 5-5 5" />
        </symbol>
        <symbol id="i-chev" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="m9 5 7 7-7 7" />
        </symbol>
        <symbol id="t-wing" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 8c4-3 9-3 12 0 2-1.5 4-1.5 6 0-1 4-4 6.5-8 6.5-5 0-8.5-2.5-10-6.5zM8 11.5l3 3M12 10.5l2.5 3.5" />
        </symbol>
        <symbol id="t-ruler" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="m3.5 15.5 12-12 5 5-12 12zM7.5 11.5l2 2M10.5 8.5l2 2M13.5 5.5l2 2" />
        </symbol>
        <symbol id="t-time" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M7 3h10M7 21h10M8 3c0 4 4 5.5 4 9s-4 5-4 9M16 3c0 4-4 5.5-4 9s4 5 4 9" />
        </symbol>
        <symbol id="t-diet" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 12c3-4 7-5 11-3.5 2 .7 3.5 2 5 3.5-1.5 1.5-3 2.8-5 3.5C10 17 6 16 3 12zM19 12l2.5-2.5v5zM8 11.5h.01" />
        </symbol>
        <symbol id="t-range" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" d="M3.5 12h17M12 3.5c2.5 2.5 3.5 5.3 3.5 8.5s-1 6-3.5 8.5c-2.5-2.5-3.5-5.3-3.5-8.5s1-6 3.5-8.5z" />
        </symbol>
      </svg>

      {/* Main Container */}
      <div className="relative min-h-screen py-10 sm:py-16 px-4 sm:px-8 max-w-[1560px] mx-auto flex flex-col justify-center">
        
        {/* Section Header Top Tag */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-6 border-b border-[var(--line)]"
          style={{ borderColor: isDusk ? "#3d3225" : "#d6c9ae" }}
        >
          <div>
            <span
              className="inline-block text-[10.5px] font-mono tracking-[0.2em] uppercase font-bold px-2.5 py-1 rounded-[3px] mb-2"
              style={{
                backgroundColor: isDusk ? "#3b2415" : "#f3dfcd",
                color: isDusk ? "#e08a4f" : "#b4532a",
              }}
            >
              Enterprise Growth Analyzer • Field Guide Vol. I
            </span>
            <h2
              className="text-2xl sm:text-4xl font-serif font-light tracking-tight"
              style={{
                fontFamily: "'Fraunces', 'Iowan Old Style', Georgia, serif",
                color: isDusk ? "#f1e7d6" : "#241c14",
              }}
            >
              Client Results &amp; Website Showcase
            </h2>
          </div>

          {/* Quick Sun Toggle on Top Bar */}
          <div className="mt-4 sm:mt-0 flex items-center gap-3">
            <span className="text-xs font-mono text-muted" style={{ color: isDusk ? "#a89880" : "#7a6b58" }}>
              Lighting: {isDusk ? "Dusk Mode" : "Daylight Mode"}
            </span>
            <button
              onClick={() => setIsDusk(!isDusk)}
              className="w-9 h-9 rounded-[3px] border flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-105"
              style={{
                backgroundColor: isDusk ? "#211a13" : "#f8f2e6",
                borderColor: isDusk ? "#e08a4f" : "#b4532a",
                color: isDusk ? "#e08a4f" : "#b4532a",
              }}
              title="Toggle Day/Dusk Lighting"
              aria-label="Toggle Lighting Mode"
            >
              <svg className="w-5 h-5"><use href="#i-sun" /></svg>
            </button>
          </div>
        </div>

        {/* 3-Column Museum Plate Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* 4.1 LEFT SIDEBAR (Atlas Sections & Categories) */}
          <aside
            className="lg:col-span-3 flex flex-col p-5 rounded-[3px] border h-full justify-between"
            style={{
              backgroundColor: isDusk ? "#211a13" : "#f8f2e6",
              borderColor: isDusk ? "#3d3225" : "#d6c9ae",
            }}
          >
            <div>
              <div className="mb-5">
                <span
                  className="block text-xl font-serif tracking-tight"
                  style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                >
                  Growth Atlas
                </span>
                <span
                  className="block text-[9.5px] font-mono tracking-[0.18em] uppercase mt-1"
                  style={{ color: isDusk ? "#a89880" : "#7a6b58" }}
                >
                  Client Portfolio • Index
                </span>
              </div>

              {/* Navigation List */}
              <ul className="grid gap-1.5 text-[13.5px]">
                <li
                  className="flex items-center justify-between px-3 py-2 rounded-[3px] font-medium transition-all"
                  style={{
                    backgroundColor: isDusk ? "#3b2415" : "#f3dfcd",
                    color: isDusk ? "#e08a4f" : "#b4532a",
                    boxShadow: `inset 3px 0 0 ${isDusk ? "#e08a4f" : "#b4532a"}`,
                  }}
                >
                  <span className="flex items-center gap-2.5">
                    <svg className="w-4 h-4"><use href="#i-star" /></svg>
                    <span>Featured Clients</span>
                  </span>
                  <span className="text-[10px] font-mono">4 Case Studies</span>
                </li>

                <li
                  className="flex items-center justify-between px-3 py-2 rounded-[3px] text-muted hover:bg-black/5 transition-all cursor-pointer"
                  style={{ color: isDusk ? "#a89880" : "#7a6b58" }}
                  onClick={() => handleSelectTab(0)}
                >
                  <span className="flex items-center gap-2.5">
                    <svg className="w-4 h-4"><use href="#i-home" /></svg>
                    <span>Real Estate</span>
                  </span>
                  <span className="text-[10px] font-mono">+663% Leads</span>
                </li>

                <li
                  className="flex items-center justify-between px-3 py-2 rounded-[3px] text-muted hover:bg-black/5 transition-all cursor-pointer"
                  style={{ color: isDusk ? "#a89880" : "#7a6b58" }}
                  onClick={() => handleSelectTab(1)}
                >
                  <span className="flex items-center gap-2.5">
                    <svg className="w-4 h-4"><use href="#i-claw" /></svg>
                    <span>Alpine Chalets</span>
                  </span>
                  <span className="text-[10px] font-mono">+240% Direct</span>
                </li>

                <li
                  className="flex items-center justify-between px-3 py-2 rounded-[3px] text-muted hover:bg-black/5 transition-all cursor-pointer"
                  style={{ color: isDusk ? "#a89880" : "#7a6b58" }}
                  onClick={() => handleSelectTab(2)}
                >
                  <span className="flex items-center gap-2.5">
                    <svg className="w-4 h-4"><use href="#t-wing" /></svg>
                    <span>Medical Aesthetic Spa</span>
                  </span>
                  <span className="text-[10px] font-mono">Waitlisted</span>
                </li>

                <li
                  className="flex items-center justify-between px-3 py-2 rounded-[3px] text-muted hover:bg-black/5 transition-all cursor-pointer"
                  style={{ color: isDusk ? "#a89880" : "#7a6b58" }}
                  onClick={() => handleSelectTab(3)}
                >
                  <span className="flex items-center gap-2.5">
                    <svg className="w-4 h-4"><use href="#t-ruler" /></svg>
                    <span>B2B Cloud SaaS</span>
                  </span>
                  <span className="text-[10px] font-mono">$4.2M Pipe</span>
                </li>
              </ul>
            </div>

            {/* Bottom Pinned Feature Card */}
            <div
              className="mt-6 p-4 rounded-[3px] border relative"
              style={{
                backgroundColor: isDusk ? "#17120d" : "#ebe1cd",
                borderColor: isDusk ? "#3d3225" : "#d6c9ae",
                borderLeft: `3px solid ${isDusk ? "#e08a4f" : "#b4532a"}`,
              }}
            >
              <span
                className="block text-[9.5px] font-mono uppercase tracking-[0.2em] font-medium"
                style={{ color: isDusk ? "#a89880" : "#7a6b58" }}
              >
                Active Specimen
              </span>

              <div className="relative w-full h-24 my-2.5 rounded-[2px] overflow-hidden border border-[var(--line)]">
                <Image
                  src={activeClient.image}
                  alt={activeClient.name}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>

              <h4
                className="font-serif text-[17px] font-normal leading-tight"
                style={{ fontFamily: "'Fraunces', Georgia, serif" }}
              >
                {activeClient.name}
              </h4>

              <p
                className="text-[12px] leading-relaxed mt-1"
                style={{ color: isDusk ? "#a89880" : "#7a6b58" }}
              >
                {activeClient.feature[1]}
              </p>

              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 mt-3 text-[12px] font-medium underline underline-offset-3 hover:opacity-80 transition-opacity"
              >
                <span>Book your growth roadmap</span>
                <svg className="w-3.5 h-3.5"><use href="#i-arrow" /></svg>
              </Link>
            </div>
          </aside>

          {/* 4.2 CENTRE: SPECIMEN STAGE & INTERACTIVE WEBSITE ANALYZER */}
          <main className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Tabs Row at Top */}
            <div className="flex gap-2 overflow-x-auto pb-1" role="tablist">
              {CLIENT_CASES.map((item, idx) => {
                const isSelected = idx === activeIdx;
                return (
                  <button
                    key={item.id}
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => handleSelectTab(idx)}
                    className="relative flex-1 min-w-[110px] p-2.5 text-center rounded-[3px] border transition-all cursor-pointer text-left"
                    style={{
                      backgroundColor: isDusk ? "#211a13" : "#f8f2e6",
                      borderColor: isSelected
                        ? (isDusk ? "#f1e7d6" : "#241c14")
                        : (isDusk ? "#3d3225" : "#d6c9ae"),
                      transform: isSelected ? "translateY(-2px)" : "none",
                    }}
                  >
                    <span
                      className="block text-[9px] font-mono"
                      style={{ color: isDusk ? "#a89880" : "#7a6b58" }}
                    >
                      {item.no}
                    </span>
                    <b
                      className="block font-serif text-[13.5px] truncate mt-0.5"
                      style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                    >
                      {item.name}
                    </b>
                    <span
                      className="block text-[10.5px] italic font-serif truncate"
                      style={{ color: isDusk ? "#a89880" : "#7a6b58" }}
                    >
                      {item.category.split("&")[0]}
                    </span>

                    {/* Active Bottom Bar */}
                    {isSelected && (
                      <span
                        className="absolute bottom-0 left-0 right-0 h-[2px]"
                        style={{ backgroundColor: isDusk ? "#e08a4f" : "#b4532a" }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Stage Frame (Museum Plate with Corner Brackets & Website Preview) */}
            <div
              className={`relative w-full h-[460px] sm:h-[500px] rounded-[3px] border overflow-hidden p-4 flex flex-col justify-between transition-all duration-300 ${
                isExpanded ? "scale-[1.02] shadow-2xl z-30" : ""
              }`}
              style={{
                backgroundColor: isDusk ? "#211a13" : "#f8f2e6",
                borderColor: isDusk ? "#3d3225" : "#d6c9ae",
              }}
            >
              {/* Corner Specimen Brackets (Museum Plate Archival Look) */}
              <div className="absolute inset-2 pointer-events-none z-10">
                <span className="absolute top-0 left-0 w-3.5 h-3.5 border-t border-l" style={{ borderColor: isDusk ? "#3d3225" : "#d6c9ae" }} />
                <span className="absolute top-0 right-0 w-3.5 h-3.5 border-t border-r" style={{ borderColor: isDusk ? "#3d3225" : "#d6c9ae" }} />
                <span className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b border-l" style={{ borderColor: isDusk ? "#3d3225" : "#d6c9ae" }} />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b border-r" style={{ borderColor: isDusk ? "#3d3225" : "#d6c9ae" }} />
              </div>

              {/* Top Hint & Scale */}
              <div className="flex items-center justify-between text-[10px] font-mono z-20"
                style={{ color: isDusk ? "#a89880" : "#7a6b58" }}
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>CLIENT SPECIMEN • LIVE AUDIT TELEMETRY</span>
                </div>
                <span>DRAG TO INSPECT • SCALE {zoomLevel}X</span>
              </div>

              {/* Central Website Analyzer Device Frame */}
              <div
                className="relative my-auto w-full max-w-[480px] mx-auto rounded-lg border shadow-xl overflow-hidden transition-all duration-500 group"
                style={{
                  backgroundColor: isDusk ? "#17120d" : "#ebe1cd",
                  borderColor: isDusk ? "#3d3225" : "#d6c9ae",
                  transform: `scale(${zoomLevel}) rotate(${rotationAngle}deg)`,
                  transformOrigin: "center center",
                }}
              >
                {/* Browser Mockup Chrome Header */}
                <div
                  className="flex items-center justify-between px-3 py-2 border-b"
                  style={{
                    backgroundColor: isDusk ? "#211a13" : "#f8f2e6",
                    borderColor: isDusk ? "#3d3225" : "#d6c9ae",
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                  </div>

                  {/* Browser URL Input */}
                  <div
                    className="flex items-center gap-2 px-3 py-1 rounded-[3px] text-[11px] font-mono border"
                    style={{
                      backgroundColor: isDusk ? "#17120d" : "#ebe1cd",
                      borderColor: isDusk ? "#3d3225" : "#d6c9ae",
                      color: isDusk ? "#f1e7d6" : "#241c14",
                    }}
                  >
                    <span className="text-emerald-500 font-bold">🔒</span>
                    <span className="truncate max-w-[180px]">{activeClient.urlDisplay}</span>
                  </div>

                  <span className="text-[10px] font-mono text-muted">200 OK</span>
                </div>

                {/* Website Preview Image with Animated Overlay */}
                <div className="relative w-full h-[220px] sm:h-[240px] bg-slate-900 overflow-hidden">
                  <Image
                    src={activeClient.image}
                    alt={activeClient.name}
                    fill
                    unoptimized
                    className={`object-cover transition-transform duration-700 ${
                      isCloseup ? "scale-125" : "scale-100 group-hover:scale-105"
                    }`}
                  />

                  {/* Live Floating Metric Badges on Device */}
                  <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-md border border-white/20 text-white px-2.5 py-1 rounded-[3px] text-[11px] font-mono flex items-center gap-2 shadow-lg">
                    <span className="text-amber-400 font-bold">{activeClient.stats.highlight}</span>
                    <span className="text-[10px] text-gray-300">{activeClient.stats.label}</span>
                  </div>

                  <div className="absolute bottom-3 right-3 bg-black/85 backdrop-blur-md border border-white/20 text-white px-2.5 py-1 rounded-[3px] text-[11px] font-mono flex items-center gap-2 shadow-lg">
                    <span className="text-emerald-400 font-bold">{activeClient.stats.metric2}</span>
                    <span className="text-[10px] text-gray-300">{activeClient.stats.metric2Label}</span>
                  </div>
                </div>

                {/* Bottom Status bar */}
                <div
                  className="px-3 py-1.5 flex items-center justify-between text-[10px] font-mono border-t"
                  style={{
                    backgroundColor: isDusk ? "#211a13" : "#f8f2e6",
                    borderColor: isDusk ? "#3d3225" : "#d6c9ae",
                    color: isDusk ? "#a89880" : "#7a6b58",
                  }}
                >
                  <span>Architecture: Next.js 15 SSR</span>
                  <span className="text-emerald-600 font-semibold">Core Web Vitals: 99/100</span>
                </div>
              </div>

              {/* Stage Interactive Tool Rail (Left vertical toolbar) */}
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
                <button
                  onClick={() => setZoomLevel((z) => Math.min(1.4, Number((z + 0.15).toFixed(2))))}
                  className="w-8 h-8 rounded-[3px] border flex items-center justify-center transition-all cursor-pointer shadow-xs hover:border-[var(--accent)]"
                  style={{
                    backgroundColor: isDusk ? "#17120d" : "#ebe1cd",
                    borderColor: isDusk ? "#3d3225" : "#d6c9ae",
                  }}
                  title="Zoom In"
                >
                  <svg className="w-4 h-4"><use href="#i-plus" /></svg>
                </button>

                <button
                  onClick={() => setZoomLevel((z) => Math.max(0.8, Number((z - 0.15).toFixed(2))))}
                  className="w-8 h-8 rounded-[3px] border flex items-center justify-center transition-all cursor-pointer shadow-xs hover:border-[var(--accent)]"
                  style={{
                    backgroundColor: isDusk ? "#17120d" : "#ebe1cd",
                    borderColor: isDusk ? "#3d3225" : "#d6c9ae",
                  }}
                  title="Zoom Out"
                >
                  <svg className="w-4 h-4"><use href="#i-search" /></svg>
                </button>

                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="w-8 h-8 rounded-[3px] border flex items-center justify-center transition-all cursor-pointer shadow-xs hover:border-[var(--accent)]"
                  style={{
                    backgroundColor: isDusk ? "#17120d" : "#ebe1cd",
                    borderColor: isDusk ? "#3d3225" : "#d6c9ae",
                  }}
                  title="Expand View"
                >
                  <svg className="w-4 h-4"><use href="#i-expand" /></svg>
                </button>
              </div>

              {/* Bottom Turn Controls */}
              <div className="flex items-center justify-between z-20 pt-2 border-t"
                style={{ borderColor: isDusk ? "#3d3225" : "#d6c9ae" }}
              >
                {/* Scale Bar */}
                <div className="text-[10px] font-mono" style={{ color: isDusk ? "#a89880" : "#7a6b58" }}>
                  <div className="w-16 h-1 border-b border-l border-r mb-0.5" style={{ borderColor: isDusk ? "#a89880" : "#7a6b58" }} />
                  <span>{activeClient.scale}</span>
                </div>

                {/* 360 Turn Buttons */}
                <div
                  className="flex items-center gap-1 p-1 rounded-[3px] border text-[11px] font-mono shadow-xs"
                  style={{
                    backgroundColor: isDusk ? "#17120d" : "#ebe1cd",
                    borderColor: isDusk ? "#3d3225" : "#d6c9ae",
                  }}
                >
                  <button
                    onClick={() => handleRotate(-10)}
                    className="px-2 py-0.5 hover:bg-black/10 rounded-[2px] transition-colors cursor-pointer"
                    title="Turn Left"
                  >
                    <svg className="w-3.5 h-3.5"><use href="#i-ccw" /></svg>
                  </button>
                  <button
                    onClick={() => setRotationAngle(0)}
                    className="px-2 py-0.5 hover:bg-black/10 rounded-[2px] transition-colors cursor-pointer font-bold"
                  >
                    360°
                  </button>
                  <button
                    onClick={() => handleRotate(10)}
                    className="px-2 py-0.5 hover:bg-black/10 rounded-[2px] transition-colors cursor-pointer"
                    title="Turn Right"
                  >
                    <svg className="w-3.5 h-3.5"><use href="#i-cw" /></svg>
                  </button>
                </div>

                <div className="text-[10px] font-mono" style={{ color: isDusk ? "#a89880" : "#7a6b58" }}>
                  <span>REF: {activeClient.no}</span>
                </div>
              </div>

            </div>

            {/* Stage Caption */}
            <p
              className="text-center font-serif italic text-[15px] sm:text-[17px] font-light leading-snug"
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                color: isDusk ? "#f1e7d6" : "#241c14",
              }}
            >
              &ldquo;{activeClient.caption}&rdquo;
            </p>
          </main>

          {/* 4.3 RIGHT: CATALOGUE CARD (Museum Plate Rule with Full Case Study Details) */}
          <article
            className={`lg:col-span-4 p-6 sm:p-7 rounded-[3px] border flex flex-col justify-between transition-opacity duration-300 ${
              isLeaving ? "opacity-20 translate-y-1" : "opacity-100 translate-y-0"
            }`}
            style={{
              backgroundColor: isDusk ? "#211a13" : "#f8f2e6",
              borderColor: isDusk ? "#3d3225" : "#d6c9ae",
              boxShadow: isDusk
                ? "inset 0 0 0 4px #211a13, inset 0 0 0 5px #3d3225"
                : "inset 0 0 0 4px #f8f2e6, inset 0 0 0 5px #d6c9ae",
            }}
          >
            <div>
              {/* Row 0: Eyebrow */}
              <div
                className="text-[10px] font-mono uppercase tracking-[0.18em]"
                style={{ color: isDusk ? "#a89880" : "#7a6b58" }}
              >
                {activeClient.category} • Specimen {activeClient.no}
              </div>

              {/* Row 1: Client Name & Industry */}
              <h1
                className="font-serif text-3xl sm:text-4xl font-light tracking-tight leading-[0.98] mt-2"
                style={{ fontFamily: "'Fraunces', Georgia, serif" }}
              >
                {activeClient.name}
              </h1>
              <span
                className="block font-serif italic text-[13px] mt-1.5"
                style={{ color: isDusk ? "#a89880" : "#7a6b58" }}
              >
                {activeClient.industry}
              </span>

              {/* Row 2: Tags */}
              <div className="flex flex-wrap gap-1.5 mt-3.5">
                {activeClient.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10.5px] font-mono px-2 py-0.5 rounded-[2px] border"
                    style={{
                      backgroundColor: isDusk ? "#17120d" : "#ebe1cd",
                      borderColor: isDusk ? "#3d3225" : "#d6c9ae",
                      color: isDusk ? "#e08a4f" : "#b4532a",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Row 3: Lede */}
              <p
                className="text-[13px] leading-relaxed mt-4"
                style={{ color: isDusk ? "#f1e7d6" : "#241c14" }}
              >
                {activeClient.lede}
              </p>

              {/* Row 4: Era / Performance Timeline */}
              <div className="mt-4 pt-3 border-t" style={{ borderColor: isDusk ? "#3d3225" : "#d6c9ae" }}>
                <span
                  className="block text-[9.5px] font-mono uppercase tracking-[0.16em] mb-1.5"
                  style={{ color: isDusk ? "#a89880" : "#7a6b58" }}
                >
                  Growth Velocity Timeline
                </span>
                
                {/* 3-segment progress bar */}
                <div
                  className="relative w-full h-1.5 rounded-[2px] grid grid-cols-3 gap-1"
                  style={{ backgroundColor: isDusk ? "#17120d" : "#ebe1cd" }}
                >
                  <span className="h-full rounded-[1px] bg-emerald-500/80" />
                  <span className="h-full rounded-[1px] bg-emerald-500/80" />
                  <span className="h-full rounded-[1px]" style={{ backgroundColor: isDusk ? "#e08a4f" : "#b4532a" }} />
                </div>

                <div
                  className="flex items-center justify-between text-[9px] font-mono uppercase mt-2 tracking-wider"
                  style={{ color: isDusk ? "#a89880" : "#7a6b58" }}
                >
                  <span>{activeClient.era.start}</span>
                  <span className="text-center font-bold" style={{ color: isDusk ? "#e08a4f" : "#b4532a" }}>
                    {activeClient.era.label}
                  </span>
                  <span>{activeClient.era.peak}</span>
                </div>
              </div>

              {/* Row 5: Field Notes Header */}
              <h3
                className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold mt-5 pt-3 border-t"
                style={{
                  borderColor: isDusk ? "#3d3225" : "#d6c9ae",
                  color: isDusk ? "#a89880" : "#7a6b58",
                }}
              >
                Verified Field Metrics
              </h3>

              {/* Row 6: Traits list with dotted leaders */}
              <dl className="grid gap-2 mt-2 text-[12.5px]">
                {activeClient.traits.map(([icon, label, value], trIdx) => (
                  <div key={trIdx} className="flex items-baseline gap-2">
                    <svg className="w-3.5 h-3.5 shrink-0 opacity-70"><use href={`#${icon}`} /></svg>
                    <dt className="shrink-0" style={{ color: isDusk ? "#a89880" : "#7a6b58" }}>
                      {label}
                    </dt>
                    <span className="flex-1 border-b border-dotted" style={{ borderColor: isDusk ? "#3d3225" : "#d6c9ae" }} />
                    <dd className="shrink-0 font-medium font-mono text-[11.5px]">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              {/* Row 7: Haunts */}
              <div className="mt-4 pt-3 border-t" style={{ borderColor: isDusk ? "#3d3225" : "#d6c9ae" }}>
                <span
                  className="block text-[9.5px] font-mono uppercase tracking-[0.16em] mb-1"
                  style={{ color: isDusk ? "#a89880" : "#7a6b58" }}
                >
                  Core Target Territory
                </span>
                <p className="text-[12px] leading-snug" style={{ color: isDusk ? "#f1e7d6" : "#241c14" }}>
                  {activeClient.haunt}
                </p>
              </div>
            </div>

            {/* Row 9: Close-up Detail Lens Button & CTA */}
            <div className="mt-5 pt-4 border-t" style={{ borderColor: isDusk ? "#3d3225" : "#d6c9ae" }}>
              <button
                onClick={() => setIsCloseup(!isCloseup)}
                className="w-full grid grid-cols-[56px_1fr_20px] gap-3 p-2.5 rounded-[3px] border text-left items-center transition-all cursor-pointer hover:border-[var(--accent)]"
                style={{
                  backgroundColor: isCloseup
                    ? (isDusk ? "#3b2415" : "#f3dfcd")
                    : (isDusk ? "#17120d" : "#ebe1cd"),
                  borderColor: isDusk ? "#3d3225" : "#d6c9ae",
                }}
              >
                {/* Lens thumbnail */}
                <div className="relative w-14 h-14 rounded-[2px] overflow-hidden border border-[var(--line)]">
                  <Image
                    src={activeClient.image}
                    alt={activeClient.name}
                    fill
                    unoptimized
                    className="object-cover scale-150"
                  />
                </div>

                <div>
                  <b className="block font-serif text-[14px] leading-tight">
                    {isCloseup ? "Reset Lens View" : "Examine Close-up UI"}
                  </b>
                  <small
                    className="block text-[11px] leading-tight mt-0.5"
                    style={{ color: isDusk ? "#a89880" : "#7a6b58" }}
                  >
                    {activeClient.closeup}
                  </small>
                </div>

                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isCloseup ? "rotate-90" : ""
                  }`}
                >
                  <use href="#i-chev" />
                </svg>
              </button>

              <Link
                href="/schedule-meeting"
                className="mt-3 w-full py-2.5 px-4 rounded-[3px] text-center font-mono text-[12px] uppercase tracking-wider font-semibold block transition-all shadow-xs"
                style={{
                  backgroundColor: isDusk ? "#e08a4f" : "#b4532a",
                  color: isDusk ? "#17120d" : "#ffffff",
                }}
              >
                Replicate These Results for Your Brand →
              </Link>
            </div>
          </article>

        </div>

      </div>
    </section>
  );
}
