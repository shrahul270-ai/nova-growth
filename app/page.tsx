"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Home() {
  // Hero slide state for Next/Prev white box navigation
  const [heroSlideIdx, setHeroSlideIdx] = useState<number>(0);

  // Work showcase category filter
  const [workFilter, setWorkFilter] = useState<string>("ALL");

  // State for 20-Point SEO Audit Form
  const [auditUrl, setAuditUrl] = useState("");
  const [auditEmail, setAuditEmail] = useState("");
  const [auditGoal, setAuditGoal] = useState("traffic");
  const [auditSuccess, setAuditSuccess] = useState(false);

  // State for FAQ Accordion
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Hero interactive outcome slides
  const heroSlides = [
    {
      title: "LUXE FASHION US",
      metric: "HEADLESS NEXT.JS",
      descriptor: "E-COMMERCE CATALOG PERFORMANCE",
      country: "LOS ANGELES, USA",
      industry: "HEADLESS NEXT.JS COMMERCE",
    },
    {
      title: "SYNTHEX CLOUD",
      metric: "TOPICAL CLUSTERS",
      descriptor: "SEMANTIC KEYWORD ARCHITECTURE",
      country: "LONDON, UNITED KINGDOM",
      industry: "ENTERPRISE B2B SAAS",
    },
    {
      title: "APEX DENTAL UK",
      metric: "LOCAL CITATIONS",
      descriptor: "MULTI-LOCATION CLINIC SEARCH",
      country: "LONDON, UK",
      industry: "HIGH-TICKET LOCAL SEO",
    },
    {
      title: "CLOUDSYNC TECH",
      metric: "PROGRAMMATIC SEO",
      descriptor: "HIGH-INTENT COMPARISON ENGINE",
      country: "SAN FRANCISCO, USA",
      industry: "TECHNICAL PROGRAMMATIC SEO",
    },
    {
      title: "HORIZON LUXURY",
      metric: "MULTILINGUAL WEB",
      descriptor: "CROSS-BORDER GCC PROPERTY PORTAL",
      country: "DUBAI, UAE",
      industry: "MULTILINGUAL REAL ESTATE",
    },
    {
      title: "VENTUREPAY GLOBAL",
      metric: "FINTECH FRONTEND",
      descriptor: "EDGE-RENDERED USER ARCHITECTURE",
      country: "TORONTO, CANADA",
      industry: "BANK-GRADE FINTECH PLATFORM",
    },
  ];

  // Work Showcase Bento Items
  const workItems = [
    {
      id: "fashion-brand",
      title: "LUXE FASHION US",
      category: "NEXT.JS WEB",
      categoryGroup: "NEXT.JS WEB",
      metric: "HEADLESS COMMERCE",
      desc: "Re-engineered monolithic shop into a headless Next.js frontend with sub-0.8s load time and 1,800 SKU schema clusters.",
      image: "/images/projects/fashion-brand.jpg",
      span: "lg:col-span-2 lg:row-span-2",
      height: "min-h-[380px] sm:min-h-[460px] lg:min-h-[500px]",
    },
    {
      id: "saas-pipeline",
      title: "CLOUDSYNC TECH",
      category: "TECHNICAL SEO",
      categoryGroup: "TECHNICAL SEO",
      metric: "PROGRAMMATIC SEO",
      desc: "Programmatic search engine deployment with structured comparison clusters outranking legacy SaaS competitors.",
      image: "/images/projects/saas-analytics.jpg",
      span: "lg:col-span-1 lg:row-span-1",
      height: "min-h-[260px] sm:min-h-[280px]",
    },
    {
      id: "fitness-app",
      title: "PULSEFIT PRO",
      category: "NEXT.JS WEB",
      categoryGroup: "NEXT.JS WEB",
      metric: "APP CONVERSION FUNNEL",
      desc: "High-converting web-to-app conversion funnel with Apple/Google one-tap onboarding.",
      image: "/images/projects/fitness-app.jpg",
      span: "lg:col-span-1 lg:row-span-1",
      height: "min-h-[260px] sm:min-h-[280px]",
    },
    {
      id: "local-growth",
      title: "APEX DENTAL UK",
      category: "GUEST POSTING",
      categoryGroup: "GUEST POSTING",
      metric: "LOCAL PR OUTREACH",
      desc: "Optimized 18 London practice locations with healthcare authority PR guest posts and localized citation clusters.",
      image: "/images/projects/local-growth.jpg",
      span: "lg:col-span-1 lg:row-span-1",
      height: "min-h-[260px] sm:min-h-[280px]",
    },
    {
      id: "dubai-real-estate",
      title: "HORIZON LUXURY",
      category: "TECHNICAL SEO",
      categoryGroup: "TECHNICAL SEO",
      metric: "MULTILINGUAL SEARCH",
      desc: "Multilingual Arabic-English property portal with sub-second page performance across the GCC.",
      image: "/images/projects/real-estate.jpg",
      span: "lg:col-span-1 lg:row-span-1",
      height: "min-h-[260px] sm:min-h-[280px]",
    },
  ];

  const filteredWork =
    workFilter === "ALL"
      ? workItems
      : workItems.filter((item) => item.categoryGroup === workFilter);

  // Handle Free Audit Submit
  const handleAuditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!auditUrl || !auditEmail) return;
    setAuditSuccess(true);
    setTimeout(() => {
      setAuditUrl("");
      setAuditEmail("");
      setAuditSuccess(false);
    }, 4500);
  };

  // Structured SEO JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Balaji Prime Media - Global SEO & Digital Growth Agency",
    url: "https://balajiprimemedia.in",
    description:
      "Modern industrial elegance: Scale organic search revenue with high-impact SEO, DR 50-90+ editorial guest posting, and sub-second Next.js web applications.",
    areaServed: ["United States", "United Kingdom", "Canada", "Australia", "UAE"],
    priceRange: "$$$",
    telephone: "+917690868932",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "164",
    },
  };

  // Structured FAQ JSON-LD for Google Rich Results
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "HOW DOES BALAJI PRIME MEDIA DELIVER RESULTS FASTER THAN TRADITIONAL AGENCIES?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Traditional agencies waste months on generic slide decks. We begin execution in Week 1: fixing technical crawl errors, targeting low-competition commercial keywords, and acquiring high-authority digital PR links simultaneously through direct relationships with vetted editorial publishers.",
        },
      },
      {
        "@type": "Question",
        name: "DO YOU SPECIALIZE IN OVERSEAS MARKETS (US, UK, UAE, AUSTRALIA)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Over 80% of our portfolio clients operate in the United States, United Kingdom, Canada, Australia, and UAE. Our team operates with flexible overlap across EST, GMT, and AEST time zones with weekly video reporting and live performance dashboards.",
        },
      },
      {
        "@type": "Question",
        name: "WHAT MAKES YOUR NEXT.JS WEB ENGINEERING DIFFERENT?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We do not use bloated WordPress themes or slow page builders. Every digital asset we engineer is built on Next.js with clean TypeScript and Tailwind CSS, scoring 98+ on Google PageSpeed Insights and loading under 800 milliseconds worldwide.",
        },
      },
      {
        "@type": "Question",
        name: "ARE YOUR GUEST POSTING & BACKLINK METHODS SAFE FROM GOOGLE PENALTIES?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "100% white-hat. We strictly reject PBNs, automated link schemes, and cheap directories. Every single placement is secured on authentic, indexed publications with verified organic traffic through manual editorial outreach.",
        },
      },
      {
        "@type": "Question",
        name: "WHAT ARE YOUR PAYMENT AND CONTRACT TERMS?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We offer agile sprint agreements and monthly retainers with zero long-term lock-in traps. You can pay securely in USD, GBP, or EUR via Stripe, wire transfer, PayPal, or crypto through our client portal.",
        },
      },
    ],
  };

  // FAQs
  const faqs = [
    {
      q: "HOW DOES BALAJI PRIME MEDIA DELIVER RESULTS FASTER THAN TRADITIONAL AGENCIES?",
      a: "Traditional agencies waste months on generic slide decks. We begin execution in Week 1: fixing technical crawl errors, targeting low-competition commercial keywords, and acquiring high-authority digital PR links simultaneously through direct relationships with vetted editorial publishers.",
    },
    {
      q: "DO YOU SPECIALIZE IN OVERSEAS MARKETS (US, UK, UAE, AUSTRALIA)?",
      a: "Yes. Over 80% of our portfolio clients operate in the United States, United Kingdom, Canada, Australia, and UAE. Our team operates with flexible overlap across EST, GMT, and AEST time zones with weekly video reporting and live performance dashboards.",
    },
    {
      q: "WHAT MAKES YOUR NEXT.JS WEB ENGINEERING DIFFERENT?",
      a: "We do not use bloated WordPress themes or slow page builders. Every digital asset we engineer is built on Next.js with clean TypeScript and Tailwind CSS, scoring 98+ on Google PageSpeed Insights and loading under 800 milliseconds worldwide.",
    },
    {
      q: "ARE YOUR GUEST POSTING & BACKLINK METHODS SAFE FROM GOOGLE PENALTIES?",
      a: "100% white-hat. We strictly reject PBNs, automated link schemes, and cheap directories. Every single placement is secured on authentic, indexed publications with verified organic traffic through manual editorial outreach.",
    },
    {
      q: "WHAT ARE YOUR PAYMENT AND CONTRACT TERMS?",
      a: "We offer agile sprint agreements and monthly retainers with zero long-term lock-in traps. You can pay securely in USD, GBP, or EUR via Stripe, wire transfer, PayPal, or crypto through our client portal.",
    },
  ];

  return (
    <>
      {/* Structured SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Main Container - Modern Industrial Elegance */}
      <div className="min-h-screen bg-[#07030d] text-white font-satoshi selection:bg-[#681fe4] selection:text-white antialiased overflow-x-hidden w-full max-w-full">
        
        {/* =========================================================================
            1. MODERN INDUSTRIAL FIXED NAVBAR (Same as Guest Posting)
           ========================================================================= */}
        <Navbar activePage="home" />

        {/* =========================================================================
            2. HERO SECTION
            - Min-height: 900px
            - Background: Grayscale image with #07030d overlay
            - 240px white gridline pattern (rgba(255,255,255,.045))
            - Top-right: Large diagonal #681fe4 shape using clip-path: polygon(20% 0, 100% 0, 100% 100%, 48% 100%)
            - 45-degree rotated accent square (radius: 1.5rem)
            - Center: Tagline with 0.24em tracking, massive 118px display heading in Bebas Neue (leading 0.86)
            - Bottom-right: White box 'Next/Prev' navigation with internal arrows
           ========================================================================= */}
        <section className="relative min-h-[800px] sm:min-h-[920px] lg:min-h-[980px] bg-[#07030d] flex flex-col justify-center overflow-hidden pt-24 sm:pt-28 pb-16 sm:pb-20 px-4 sm:px-8 lg:px-12 border-b border-white/10">
          
          {/* Grayscale Background Image with #07030d Overlay */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <img
              src="/images/projects/fashion-brand.jpg"
              alt="Balaji Prime Media performance analytics and organic search growth dashboard showing technical SEO benchmarks"
              className="w-full h-full object-cover filter grayscale contrast-125 opacity-15"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07030d] via-[#07030d]/80 to-[#07030d]/60" />
          </div>

          {/* 240px x 240px White Gridline Pattern at 4.5% Opacity */}
          <div className="absolute inset-0 bg-grid-white-240 pointer-events-none z-0" />

          {/* Top-Right Large Diagonal #681fe4 Shape (clip-path: polygon(20% 0, 100% 0, 100% 100%, 48% 100%)) */}
          <div
            className="absolute top-0 right-0 w-[300px] sm:w-[580px] lg:w-[720px] h-[360px] sm:h-[620px] bg-[#681fe4] clip-hero-accent opacity-90 pointer-events-none z-0 shadow-2xl max-w-full"
            aria-hidden="true"
          />

          {/* Radial Contour Glow in Top Right */}
          <div
            className="absolute top-0 right-0 w-[320px] sm:w-[600px] h-[320px] sm:h-[600px] rounded-full pointer-events-none z-0 blur-[100px] sm:blur-[120px] opacity-25"
            style={{ background: "radial-gradient(circle, #681fe4 0%, #220090 60%, transparent 80%)" }}
            aria-hidden="true"
          />

          {/* Spec Decoration: 45-degree Rotated Square with rounded corners (radius: 1.5rem) */}
          <div
            className="absolute top-16 right-16 sm:right-32 w-28 sm:w-36 h-28 sm:h-36 rotate-45 rounded-[1.5rem] bg-[#681fe4]/30 border border-white/20 shadow-2xl backdrop-blur-md pointer-events-none z-0 hidden md:block"
            aria-hidden="true"
          />

          {/* Center Content Container (Max width: 1320px) */}
          <div className="relative z-10 max-w-[1320px] mx-auto w-full text-left my-auto">
            
            {/* Small Tagline with Responsive Tracking */}
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 max-w-full">
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#681fe4] rounded-[2px] shrink-0" />
              <span className="font-bebas text-[10px] xs:text-[11px] sm:text-xs md:text-sm tracking-[0.1em] sm:tracking-[0.24em] text-[#681fe4] uppercase bg-white/5 border border-white/10 px-2.5 sm:px-3 py-1 rounded-[4px] backdrop-blur-sm break-words max-w-full">
                // ENTERPRISE SEARCH ARCHITECTURE &amp; EDITORIAL PR
              </span>
            </div>

            {/* Massive Display Heading with Responsive Clamp & Tight Leading */}
            <h1 className="text-[30px] xs:text-[40px] sm:text-[60px] md:text-[80px] lg:text-[100px] xl:text-[108px] font-bebas leading-[0.92] sm:leading-[0.86] tracking-[0.02em] sm:tracking-[0.04em] uppercase text-white max-w-5xl mb-5 sm:mb-7 drop-shadow-md break-words">
              SEO, Next.js Web Development &amp; Guest Posting Agency
            </h1>

            {/* Premium Body Font ('Satoshi') with 2rem Leading */}
            <p className="text-neutral-300 text-xs sm:text-base md:text-lg lg:text-xl max-w-2xl leading-[1.6rem] sm:leading-[2rem] font-normal mb-7 sm:mb-10">
              Balaji Prime Media engineers compounding organic search performance through vetted editorial PR placements, edge-rendered Next.js web applications, and Google Search Essentials-compliant semantic topical authority.
            </p>

            {/* Sharp 4px Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-10 sm:mb-16 w-full sm:w-auto">
              {/* Primary CTA: Sharp 4px radius, #681fe4 with matching shadow */}
              <a
                href="#audit-tool"
                className="inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-8 py-3.5 sm:py-4 rounded-[4px] bg-[#681fe4] hover:bg-[#5815cb] text-white font-bebas text-sm sm:text-lg tracking-[0.12em] sm:tracking-[0.18em] shadow-[0_10px_25px_rgba(104,31,228,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer text-center"
              >
                <span>START FREE GROWTH AUDIT</span>
                <span>→</span>
              </a>

              {/* Secondary CTA: Sharp 4px radius, white/10 border */}
              <a
                href="#work"
                className="inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-8 py-3.5 sm:py-4 rounded-[4px] bg-transparent hover:bg-white/5 border border-white/20 text-white font-bebas text-sm sm:text-lg tracking-[0.12em] sm:tracking-[0.18em] hover:border-white/40 transition-all cursor-pointer text-center"
              >
                <span>EXPLORE CASE STUDIES</span>
              </a>
            </div>

            {/* Bottom Row: Trust Points + Bottom-Right White Box 'Next/Prev' Navigation */}
            <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 sm:gap-8 w-full max-w-full">
              
              {/* Trust Badges */}
              <div className="w-full md:w-auto grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 lg:gap-10">
                <div>
                  <span className="font-bebas text-xl sm:text-3xl lg:text-4xl tracking-[0.06em] text-white block leading-none">
                    1,000+
                  </span>
                  <span className="text-[9px] sm:text-[11px] font-bebas tracking-[0.14em] sm:tracking-[0.24em] text-white/50 block mt-1 uppercase">
                    VETTED EDITORIAL MEDIA
                  </span>
                </div>
                <div>
                  <span className="font-bebas text-xl sm:text-3xl lg:text-4xl tracking-[0.06em] text-[#681fe4] block leading-none">
                    &lt; 0.8S
                  </span>
                  <span className="text-[9px] sm:text-[11px] font-bebas tracking-[0.14em] sm:tracking-[0.24em] text-white/50 block mt-1 uppercase">
                    SUB-SECOND NEXT.JS TTFB
                  </span>
                </div>
                <div>
                  <span className="font-bebas text-xl sm:text-3xl lg:text-4xl tracking-[0.06em] text-white block leading-none">
                    100%
                  </span>
                  <span className="text-[9px] sm:text-[11px] font-bebas tracking-[0.14em] sm:tracking-[0.24em] text-white/50 block mt-1 uppercase">
                    WHITE-HAT MANUAL OUTREACH
                  </span>
                </div>
                <div>
                  <span className="font-bebas text-xl sm:text-3xl lg:text-4xl tracking-[0.06em] text-[#681fe4] block leading-none">
                    24/7
                  </span>
                  <span className="text-[9px] sm:text-[11px] font-bebas tracking-[0.14em] sm:tracking-[0.24em] text-white/50 block mt-1 uppercase">
                    TECHNICAL CLIENT SUPPORT
                  </span>
                </div>
              </div>

              {/* Spec Component: Bottom-Right White Box 'Next/Prev' Navigation with Internal Arrows */}
              <div className="w-full md:w-auto bg-white text-[#07030d] p-3 sm:p-5 rounded-[4px] shadow-2xl flex flex-col xs:flex-row items-start xs:items-center justify-between sm:justify-start gap-3 sm:gap-6 border border-white/20 shrink-0">
                <div className="flex flex-col text-left">
                  <span className="font-bebas text-[9px] sm:text-[11px] tracking-[0.16em] sm:tracking-[0.24em] text-neutral-500 uppercase leading-none">
                    PROJECT ARCHITECTURE (0{heroSlideIdx + 1} / 0{heroSlides.length})
                  </span>
                  <span className="font-bebas text-sm sm:text-lg lg:text-xl tracking-[0.08em] sm:tracking-[0.12em] text-[#07030d] leading-tight mt-1 break-words">
                    {heroSlides[heroSlideIdx].title} • {heroSlides[heroSlideIdx].metric}
                  </span>
                  <span className="text-[9px] sm:text-[11px] text-neutral-600 font-medium leading-none mt-0.5">
                    {heroSlides[heroSlideIdx].country}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 self-end xs:self-auto">
                  <button
                    type="button"
                    onClick={() =>
                      setHeroSlideIdx((prev) => (prev > 0 ? prev - 1 : heroSlides.length - 1))
                    }
                    className="w-8 h-8 sm:w-10 sm:h-10 border border-neutral-300 hover:border-[#681fe4] hover:bg-[#681fe4] hover:text-white rounded-[4px] flex items-center justify-center transition-all cursor-pointer font-bold text-xs sm:text-base"
                    aria-label="Previous case study"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setHeroSlideIdx((prev) => (prev < heroSlides.length - 1 ? prev + 1 : 0))
                    }
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-[#07030d] hover:bg-[#681fe4] text-white rounded-[4px] flex items-center justify-center transition-all cursor-pointer font-bold text-xs sm:text-base shadow-xs"
                    aria-label="Next case study"
                  >
                    →
                  </button>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* =========================================================================
            3. SERVICE GRID (Dark Mode Section #07030d)
            - 4-column layout separated by 1px white/10 vertical borders
            - 60px Violet icon box (#681fe4)
            - '01' serial number in tracking text
            - Title in 32px Bebas Neue with <br> breaks
            - Bottom arrow icon
            - Subtle radial purple glow (rgba(104,31,228,.10))
           ========================================================================= */}
        <section id="services" className="relative py-16 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-12 bg-[#07030d] overflow-hidden border-b border-white/10">
          
          {/* Subtle Radial Purple Glow Background */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] pointer-events-none blur-[140px] opacity-20"
            style={{ background: "radial-gradient(circle, #681fe4 0%, #220090 50%, transparent 75%)" }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-[1320px] mx-auto">
            
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-6 text-left">
              <div>
                <span className="font-bebas text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.24em] text-[#681fe4] uppercase block mb-2">
                  // CORE GROWTH DISCIPLINES
                </span>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bebas tracking-[0.04em] sm:tracking-[0.06em] text-white uppercase leading-none">
                  HIGH-IMPACT CAPABILITIES ARCHITECTURE
                </h2>
              </div>
              <Link
                href="/services"
                className="font-bebas text-xs sm:text-sm lg:text-base tracking-[0.14em] sm:tracking-[0.18em] text-white hover:text-[#681fe4] inline-flex items-center gap-2 transition-colors border-b border-white/20 pb-1 self-start md:self-auto"
              >
                <span>VIEW COMPLETE SERVICES MATRIX</span>
                <span>→</span>
              </Link>
            </div>

            {/* 4-Column Layout with 1px white/10 Vertical Borders */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-white/10 md:border-l">
              
              {/* Column 01 */}
              <div className="border-r border-b border-white/10 p-6 sm:p-8 lg:p-10 flex flex-col justify-between text-left group hover:bg-white/[0.02] transition-colors relative">
                <div>
                  {/* 60px Violet Icon Box */}
                  <div className="w-[50px] sm:w-[60px] h-[50px] sm:h-[60px] bg-[#681fe4] rounded-[4px] flex items-center justify-center text-white mb-5 sm:mb-6 shadow-lg shadow-[#681fe4]/30 group-hover:scale-105 transition-transform">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  {/* Serial Number in Tracking Text */}
                  <span className="font-bebas text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.24em] text-white/40 block mb-2 sm:mb-3">
                    01 // DOMAIN AUTHORITY
                  </span>
                  {/* Title in Responsive Bebas Neue */}
                  <h3 className="font-bebas text-[24px] sm:text-[28px] lg:text-[30px] xl:text-[32px] tracking-[0.1em] sm:tracking-[0.16em] text-white leading-tight mb-3 sm:mb-4 group-hover:text-[#681fe4] transition-colors">
                    EDITORIAL GUEST POSTS &amp;<br className="hidden sm:inline" /> AUTHORITY BACKLINKS
                  </h3>
                  <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                    Secure real contextual backlinks across 30,000+ verified DR 50–90+ publishers. 100% white-hat manual editorial outreach with zero PBNs.
                  </p>
                </div>
                {/* Bottom Arrow */}
                <Link
                  href="/guest-posting"
                  className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bebas tracking-[0.18em] text-white/60 group-hover:text-[#681fe4] transition-colors"
                >
                  <span>BROWSE INVENTORY</span>
                  <span className="text-lg group-hover:translate-x-1.5 transition-transform">→</span>
                </Link>
              </div>

              {/* Column 02 */}
              <div className="border-r border-b border-white/10 p-6 sm:p-8 lg:p-10 flex flex-col justify-between text-left group hover:bg-white/[0.02] transition-colors relative">
                <div>
                  <div className="w-[50px] sm:w-[60px] h-[50px] sm:h-[60px] bg-[#681fe4] rounded-[4px] flex items-center justify-center text-white mb-5 sm:mb-6 shadow-lg shadow-[#681fe4]/30 group-hover:scale-105 transition-transform">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <span className="font-bebas text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.24em] text-white/40 block mb-2 sm:mb-3">
                    02 // SEARCH ARCHITECTURE
                  </span>
                  <h3 className="font-bebas text-[24px] sm:text-[28px] lg:text-[30px] xl:text-[32px] tracking-[0.1em] sm:tracking-[0.16em] text-white leading-tight mb-3 sm:mb-4 group-hover:text-[#681fe4] transition-colors">
                    ENTERPRISE TECHNICAL SEO &amp;<br className="hidden sm:inline" /> SEMANTIC CLUSTERING
                  </h3>
                  <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                    Target high-intent commercial keywords. We eliminate crawl budget waste, architect JSON-LD schemas, and safeguard Google core update visibility.
                  </p>
                </div>
                <Link
                  href="/services/seo-optimization"
                  className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bebas tracking-[0.18em] text-white/60 group-hover:text-[#681fe4] transition-colors"
                >
                  <span>TECHNICAL AUDIT</span>
                  <span className="text-lg group-hover:translate-x-1.5 transition-transform">→</span>
                </Link>
              </div>

              {/* Column 03 */}
              <div className="border-r border-b border-white/10 p-6 sm:p-8 lg:p-10 flex flex-col justify-between text-left group hover:bg-white/[0.02] transition-colors relative">
                <div>
                  <div className="w-[50px] sm:w-[60px] h-[50px] sm:h-[60px] bg-[#681fe4] rounded-[4px] flex items-center justify-center text-white mb-5 sm:mb-6 shadow-lg shadow-[#681fe4]/30 group-hover:scale-105 transition-transform">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <span className="font-bebas text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.24em] text-white/40 block mb-2 sm:mb-3">
                    03 // EDGE COMPUTING
                  </span>
                  <h3 className="font-bebas text-[24px] sm:text-[28px] lg:text-[30px] xl:text-[32px] tracking-[0.1em] sm:tracking-[0.16em] text-white leading-tight mb-3 sm:mb-4 group-hover:text-[#681fe4] transition-colors">
                    HEADLESS NEXT.JS WEB<br className="hidden sm:inline" /> ENGINEERING &amp; CWV
                  </h3>
                  <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                    Sub-0.8s load times and 99/100 Core Web Vitals on Next.js App Router. Custom digital platforms engineered for conversion across US &amp; European markets.
                  </p>
                </div>
                <Link
                  href="/services/website-development"
                  className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bebas tracking-[0.18em] text-white/60 group-hover:text-[#681fe4] transition-colors"
                >
                  <span>ENGINEERING SPECS</span>
                  <span className="text-lg group-hover:translate-x-1.5 transition-transform">→</span>
                </Link>
              </div>

              {/* Column 04 */}
              <div className="border-r border-b border-white/10 p-6 sm:p-8 lg:p-10 flex flex-col justify-between text-left group hover:bg-white/[0.02] transition-colors relative">
                <div>
                  <div className="w-[50px] sm:w-[60px] h-[50px] sm:h-[60px] bg-[#681fe4] rounded-[4px] flex items-center justify-center text-white mb-5 sm:mb-6 shadow-lg shadow-[#681fe4]/30 group-hover:scale-105 transition-transform">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <span className="font-bebas text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.24em] text-white/40 block mb-2 sm:mb-3">
                    04 // REVENUE MULTIPLIER
                  </span>
                  <h3 className="font-bebas text-[24px] sm:text-[28px] lg:text-[30px] xl:text-[32px] tracking-[0.1em] sm:tracking-[0.16em] text-white leading-tight mb-3 sm:mb-4 group-hover:text-[#681fe4] transition-colors">
                    CONVERSION RATE FUNNELS &amp;<br className="hidden sm:inline" /> REVENUE ARCHITECTURE
                  </h3>
                  <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                    Transform incoming organic visitors into qualified enterprise pipeline. A/B split checkout flows, behavioral heatmaps, and frictionless retention.
                  </p>
                </div>
                <Link
                  href="/contact-us"
                  className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bebas tracking-[0.18em] text-white/60 group-hover:text-[#681fe4] transition-colors"
                >
                  <span>SCHEDULE SPRINT</span>
                  <span className="text-lg group-hover:translate-x-1.5 transition-transform">→</span>
                </Link>
              </div>

            </div>

          </div>
        </section>

        {/* =========================================================================
            4. SPECIAL COMPONENT: PROGRESSIVE SKILL BARS
            - Labeled data visualization bar with distinct dark label badge
            - Percentage value inside a small black (#07030d) rectangle box at top right
            - Bar: 6px height, background #F5F5F5 (or white/10), progress fill #681fe4
           ========================================================================= */}
        <section className="py-14 sm:py-20 px-4 sm:px-8 lg:px-12 bg-[#0c0617] border-b border-white/10 overflow-hidden">
          <div className="max-w-[1320px] mx-auto text-left">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center mb-8 sm:mb-12">
              <div className="lg:col-span-5">
                <span className="font-bebas text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.24em] text-[#681fe4] uppercase block mb-2">
                  // PERFORMANCE METRICS &amp; SLA BENCHMARKS
                </span>
                <h3 className="text-2xl sm:text-4xl lg:text-5xl font-bebas tracking-[0.04em] sm:tracking-[0.06em] text-white uppercase leading-none">
                  MEASURED EXECUTION STANDARDS
                </h3>
              </div>
              <div className="lg:col-span-7">
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed font-normal">
                  Every deployment at Balaji Prime Media is rigorously verified against automated technical SLAs. We enforce sub-second Core Web Vitals, 100% indexed backlink validation, and zero algorithm penalty tolerance.
                </p>
              </div>
            </div>

            {/* 4 Progressive Skill Bars */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              
              {/* Skill Bar 01 */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bebas text-xs sm:text-sm lg:text-base tracking-[0.1em] sm:tracking-[0.18em] text-white uppercase">
                    HIGH-DA (DR 50–90+) EDITORIAL OUTREACH ACCURACY
                  </span>
                  {/* Percentage in small black #07030d box */}
                  <span className="bg-[#07030d] border border-white/20 text-[#681fe4] font-bebas text-xs sm:text-sm tracking-[0.12em] px-2 sm:px-2.5 py-0.5 rounded-[2px] shadow-xs shrink-0">
                    98%
                  </span>
                </div>
                {/* Bar: 6px height, bg #F5F5F5 / white-10, progress #681fe4 */}
                <div className="h-[6px] w-full bg-white/10 rounded-[2px] overflow-hidden">
                  <div className="h-full bg-[#681fe4] rounded-[2px]" style={{ width: "98%" }} />
                </div>
              </div>

              {/* Skill Bar 02 */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bebas text-xs sm:text-sm lg:text-base tracking-[0.1em] sm:tracking-[0.18em] text-white uppercase">
                    NEXT.JS APP ROUTER CORE WEB VITALS (SUB-0.8S TTFB)
                  </span>
                  <span className="bg-[#07030d] border border-white/20 text-[#681fe4] font-bebas text-xs sm:text-sm tracking-[0.12em] px-2 sm:px-2.5 py-0.5 rounded-[2px] shadow-xs shrink-0">
                    99%
                  </span>
                </div>
                <div className="h-[6px] w-full bg-white/10 rounded-[2px] overflow-hidden">
                  <div className="h-full bg-[#681fe4] rounded-[2px]" style={{ width: "99%" }} />
                </div>
              </div>

              {/* Skill Bar 03 */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bebas text-xs sm:text-sm lg:text-base tracking-[0.1em] sm:tracking-[0.18em] text-white uppercase">
                    COMMERCIAL KEYWORDS TOP-10 GOOGLE SERP RETENTION
                  </span>
                  <span className="bg-[#07030d] border border-white/20 text-[#681fe4] font-bebas text-xs sm:text-sm tracking-[0.12em] px-2 sm:px-2.5 py-0.5 rounded-[2px] shadow-xs shrink-0">
                    94%
                  </span>
                </div>
                <div className="h-[6px] w-full bg-white/10 rounded-[2px] overflow-hidden">
                  <div className="h-full bg-[#681fe4] rounded-[2px]" style={{ width: "94%" }} />
                </div>
              </div>

              {/* Skill Bar 04 */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bebas text-xs sm:text-sm lg:text-base tracking-[0.1em] sm:tracking-[0.18em] text-white uppercase">
                    TECHNICAL CRAWL HEALTH &amp; STRUCTURED SCHEMA FIDELITY
                  </span>
                  <span className="bg-[#07030d] border border-white/20 text-[#681fe4] font-bebas text-xs sm:text-sm tracking-[0.12em] px-2 sm:px-2.5 py-0.5 rounded-[2px] shadow-xs shrink-0">
                    97%
                  </span>
                </div>
                <div className="h-[6px] w-full bg-white/10 rounded-[2px] overflow-hidden">
                  <div className="h-full bg-[#681fe4] rounded-[2px]" style={{ width: "97%" }} />
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* =========================================================================
            5. WORK SHOWCASE (Light/White Background Shift, Bento-Style Masonry Grid)
            - Bento-style masonry grid: 4 columns, variable row spans (center image 2x2)
            - 24px gaps between images
            - All images strictly 100% grayscale (filter: grayscale(1))
            - 1px borders (#EEEEEE) and large soft shadows (shadow-xl shadow-neutral-100)
            - Category filters (ALL, GUEST POSTING, WEB SYSTEMS, TECHNICAL SEO) in underlined 'Bebas Neue'
           ========================================================================= */}
        <section id="work" className="py-16 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-12 bg-white text-[#07030d] border-b border-neutral-200 overflow-hidden">
          <div className="max-w-[1320px] mx-auto text-left">
            
            {/* Header Block with Underlined Category Filters */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 sm:mb-16 gap-6">
              <div>
                <span className="font-bebas text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.24em] text-[#681fe4] uppercase block mb-2">
                  // PROVEN ENTERPRISE RESULTS
                </span>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bebas tracking-[0.04em] sm:tracking-[0.06em] text-[#07030d] uppercase leading-none">
                  SELECTED WORK SHOWCASE
                </h2>
              </div>

              {/* Category Filters in Underlined 'Bebas Neue' Typography */}
              <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-8 gap-y-2 pt-2">
                {["ALL", "GUEST POSTING", "NEXT.JS WEB", "TECHNICAL SEO"].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setWorkFilter(cat)}
                    className={`font-bebas text-sm sm:text-lg tracking-[0.14em] sm:tracking-[0.18em] transition-all cursor-pointer pb-1 ${
                      workFilter === cat
                        ? "text-[#681fe4] border-b-2 border-[#681fe4]"
                        : "text-neutral-500 hover:text-[#07030d] border-b-2 border-transparent"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Bento-Style Masonry Grid with 24px Gaps */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredWork.map((item) => (
                <div
                  key={item.id}
                  className={`${item.span} ${item.height} relative rounded-[4px] border border-[#EEEEEE] overflow-hidden shadow-xl shadow-neutral-100 group flex flex-col justify-between p-5 sm:p-7 lg:p-8 bg-[#07030d] text-white`}
                >
                  {/* 100% Grayscale Image with Dark Ink Vignette */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07030d] via-[#07030d]/60 to-[#07030d]/30 pointer-events-none" />

                  {/* Top: Category Tag + Metric */}
                  <div className="relative z-10 flex items-start justify-between gap-2 sm:gap-3 flex-wrap">
                    <span className="font-bebas text-[11px] sm:text-xs tracking-[0.18em] sm:tracking-[0.24em] bg-white/10 text-white border border-white/20 px-2.5 sm:px-3 py-1 rounded-[2px] backdrop-blur-md">
                      {item.category}
                    </span>
                    <span className="font-bebas text-xs sm:text-base tracking-[0.1em] sm:tracking-[0.12em] bg-[#681fe4] text-white px-2.5 sm:px-3 py-1 rounded-[2px] shadow-xs">
                      {item.metric}
                    </span>
                  </div>

                  {/* Bottom: Title, Description, and Link */}
                  <div className="relative z-10">
                    <h3 className="font-bebas text-xl sm:text-2xl lg:text-3xl tracking-[0.08em] sm:tracking-[0.12em] text-white uppercase leading-tight mb-2">
                      {item.title}
                    </h3>
                    <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-2">
                      {item.desc}
                    </p>
                    <Link
                      href={`/projects/${item.id}`}
                      className="font-bebas text-xs sm:text-sm tracking-[0.14em] sm:tracking-[0.18em] text-[#681fe4] hover:text-white inline-flex items-center gap-1.5 transition-colors"
                    >
                      <span>VIEW CASE BREAKDOWN</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Archive Link */}
            <div className="mt-8 sm:mt-12 text-center">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-[4px] bg-[#07030d] hover:bg-[#681fe4] text-white font-bebas text-sm sm:text-base tracking-[0.14em] sm:tracking-[0.18em] transition-all cursor-pointer shadow-lg w-full sm:w-auto text-center"
              >
                <span>EXPLORE ALL 6 EXPANDED CASE STUDIES</span>
                <span>→</span>
              </Link>
            </div>

          </div>
        </section>

        {/* =========================================================================
            6. STATISTICS BAR
            - High-contrast #681fe4 background
            - 2 columns on mobile/tablet, 4 columns on desktop
            - Circular badge with icon
            - Responsive numeric value in Bebas Neue
            - Small sub-text descriptor with tracking
           ========================================================================= */}
        <section className="bg-[#681fe4] text-white py-12 sm:py-16 px-4 sm:px-8 lg:px-12 border-y border-white/20 overflow-hidden">
          <div className="max-w-[1320px] mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4">
              
              {/* Stat 01 */}
              <div className="p-4 sm:p-6 lg:p-8 border-r border-b lg:border-b-0 border-white/10 flex flex-col items-center sm:items-start text-center sm:text-left">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/15 flex items-center justify-center text-lg sm:text-xl text-white mb-3 sm:mb-4 shadow-xs">
                  📰
                </div>
                <span className="font-bebas text-3xl sm:text-4xl lg:text-[48px] tracking-[0.04em] sm:tracking-[0.06em] text-white leading-none block mb-1">
                  30,000+
                </span>
                <span className="font-bebas text-[10px] sm:text-xs tracking-[0.14em] sm:tracking-[0.24em] text-white/80 uppercase">
                  VERIFIED EDITORIAL PARTNERS
                </span>
              </div>

              {/* Stat 02 */}
              <div className="p-4 sm:p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col items-center sm:items-start text-center sm:text-left">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/15 flex items-center justify-center text-lg sm:text-xl text-white mb-3 sm:mb-4 shadow-xs">
                  📈
                </div>
                <span className="font-bebas text-3xl sm:text-4xl lg:text-[48px] tracking-[0.04em] sm:tracking-[0.06em] text-white leading-none block mb-1">
                  +340%
                </span>
                <span className="font-bebas text-[10px] sm:text-xs tracking-[0.14em] sm:tracking-[0.24em] text-white/80 uppercase">
                  AVERAGE ORGANIC REVENUE LIFT
                </span>
              </div>

              {/* Stat 03 */}
              <div className="p-4 sm:p-6 lg:p-8 border-r lg:border-r border-white/10 flex flex-col items-center sm:items-start text-center sm:text-left">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/15 flex items-center justify-center text-lg sm:text-xl text-white mb-3 sm:mb-4 shadow-xs">
                  💼
                </div>
                <span className="font-bebas text-3xl sm:text-4xl lg:text-[48px] tracking-[0.04em] sm:tracking-[0.06em] text-white leading-none block mb-1">
                  $18.5M+
                </span>
                <span className="font-bebas text-[10px] sm:text-xs tracking-[0.14em] sm:tracking-[0.24em] text-white/80 uppercase">
                  CLIENT SALES PIPELINE GENERATED
                </span>
              </div>

              {/* Stat 04 */}
              <div className="p-4 sm:p-6 lg:p-8 flex flex-col items-center sm:items-start text-center sm:text-left">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/15 flex items-center justify-center text-lg sm:text-xl text-white mb-3 sm:mb-4 shadow-xs">
                  ⚡
                </div>
                <span className="font-bebas text-3xl sm:text-4xl lg:text-[48px] tracking-[0.04em] sm:tracking-[0.06em] text-white leading-none block mb-1">
                  99.4%
                </span>
                <span className="font-bebas text-[10px] sm:text-xs tracking-[0.14em] sm:tracking-[0.24em] text-white/80 uppercase">
                  CLIENT RETENTION RATE
                </span>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            7. SPECIAL COMPONENT: DIAGONAL FEATURE BLOCK
            - Relative container with a banner
            - 33% width right-side overlay with clip-path in #220090
            - 45-degree rotated purple square partially peeking out from the top edge
           ========================================================================= */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 bg-[#07030d] relative overflow-hidden">
          <div className="max-w-[1320px] mx-auto relative rounded-[4px] border border-white/10 bg-[#0c0617] overflow-hidden p-6 sm:p-10 lg:p-16 text-left">
            
            {/* 33% Width Right-Side Overlay in #220090 with clip-path: polygon(36% 0, 100% 0, 100% 100%, 0 100%) */}
            <div
              className="absolute top-0 right-0 w-full sm:w-[50%] lg:w-[38%] h-full bg-[#220090] clip-diagonal-split pointer-events-none z-0 opacity-80"
              aria-hidden="true"
            />

            {/* 45-Degree Rotated Purple Square partially peeking out from top edge */}
            <div
              className="absolute -top-10 right-12 sm:right-24 w-24 h-24 rotate-45 rounded-[1.5rem] bg-[#681fe4] shadow-2xl pointer-events-none z-10 border border-white/20 hidden sm:block"
              aria-hidden="true"
            />

            <div className="relative z-10 max-w-2xl">
              <span className="font-bebas text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.24em] text-[#681fe4] uppercase block mb-3">
                // EXECUTIVE ADVISORY &amp; DIRECT ACCOUNTABILITY
              </span>
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bebas tracking-[0.04em] sm:tracking-[0.06em] text-white uppercase leading-[0.92] mb-5 sm:mb-6">
                TIRED OF AGENCY FLUFF? WE DELIVER REAL COMMERCIAL REVENUE.
              </h2>
              <p className="text-neutral-300 text-xs sm:text-base leading-relaxed mb-6 sm:mb-8 font-normal">
                No junior account managers, no vanity impressions, and no algorithmic guesswork. You collaborate directly with senior technical architects who inspect your search codebase, negotiate high-DA editorial placements, and sprint weekly toward measurable revenue goals.
              </p>
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <Link
                  href="/contact-us"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-[4px] bg-[#681fe4] hover:bg-[#5815cb] text-white font-bebas text-sm sm:text-base tracking-[0.12em] sm:tracking-[0.18em] shadow-[0_10px_25px_rgba(104,31,228,0.35)] transition-all cursor-pointer text-center"
                >
                  <span>SCHEDULE STRATEGY CONSULTATION</span>
                  <span>→</span>
                </Link>
                <Link
                  href="/about-us"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-[4px] border border-white/20 hover:border-white/40 text-white font-bebas text-sm sm:text-base tracking-[0.12em] sm:tracking-[0.18em] transition-all cursor-pointer text-center"
                >
                  <span>ABOUT OUR FOUNDERS</span>
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================================
            8. INTERACTIVE 20-POINT SEO & GROWTH AUDIT MODULE
            - High-converting interactive audit tool
            - #07030d ink background, 240px white gridline pattern, sharp 4px input fields
           ========================================================================= */}
        <section id="audit-tool" className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 bg-[#0c0617] border-y border-white/10 relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            
            <span className="font-bebas text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.24em] text-[#681fe4] uppercase block mb-2">
              // INSTANT DIAGNOSTIC ENGINE
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bebas tracking-[0.04em] sm:tracking-[0.06em] text-white uppercase leading-none mb-3 sm:mb-4">
              REQUEST YOUR 20-POINT SEO &amp; ARCHITECTURE AUDIT
            </h2>
            <p className="text-neutral-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed mb-8 sm:mb-10">
              Enter your website URL. Our senior growth engineers will analyze your crawl budget, Core Web Vitals, competitor backlink intersects, and commercial keyword gaps — delivered within 24 hours.
            </p>

            {auditSuccess ? (
              <div className="bg-[#681fe4]/20 border border-[#681fe4] p-5 sm:p-6 rounded-[4px] text-white font-bebas text-base sm:text-lg tracking-[0.1em] sm:tracking-[0.12em] animate-fadeIn">
                ✓ AUDIT REQUEST RECEIVED. CHECK YOUR INBOX WITHIN 24 HOURS FOR YOUR TAILORED ARCHITECTURE REPORT.
              </div>
            ) : (
              <form onSubmit={handleAuditSubmit} className="space-y-4 text-left max-w-2xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bebas text-xs tracking-[0.18em] text-neutral-300 block mb-1.5 uppercase">
                      WEBSITE URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://yourbrand.com"
                      required
                      value={auditUrl}
                      onChange={(e) => setAuditUrl(e.target.value)}
                      className="w-full px-4 py-3 sm:py-3.5 rounded-[4px] bg-white/5 border border-white/20 text-white placeholder-neutral-500 text-xs sm:text-sm focus:outline-none focus:border-[#681fe4] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-bebas text-xs tracking-[0.18em] text-neutral-300 block mb-1.5 uppercase">
                      WORK EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      placeholder="executive@company.com"
                      required
                      value={auditEmail}
                      onChange={(e) => setAuditEmail(e.target.value)}
                      className="w-full px-4 py-3 sm:py-3.5 rounded-[4px] bg-white/5 border border-white/20 text-white placeholder-neutral-500 text-xs sm:text-sm focus:outline-none focus:border-[#681fe4] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bebas text-xs tracking-[0.18em] text-neutral-300 block mb-1.5 uppercase">
                    PRIMARY GROWTH OBJECTIVE
                  </label>
                  <select
                    value={auditGoal}
                    onChange={(e) => setAuditGoal(e.target.value)}
                    className="w-full px-4 py-3 sm:py-3.5 rounded-[4px] bg-[#07030d] border border-white/20 text-white text-xs sm:text-sm focus:outline-none focus:border-[#681fe4] transition-colors cursor-pointer"
                  >
                    <option value="traffic">Double Organic Google Traffic &amp; Rankings</option>
                    <option value="leads">Increase B2B Inbound Consultation Bookings</option>
                    <option value="guest-posting">Acquire High-DR (50–90+) Editorial Backlinks</option>
                    <option value="redesign">Rebuild Website on Next.js for Sub-0.8s Speed</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 sm:py-4 px-3 sm:px-6 rounded-[4px] bg-[#681fe4] hover:bg-[#5815cb] text-white font-bebas text-sm sm:text-base lg:text-lg tracking-[0.1em] sm:tracking-[0.18em] transition-all shadow-[0_10px_25px_rgba(104,31,228,0.35)] cursor-pointer mt-2 text-center leading-tight"
                >
                  GENERATE FREE 20-POINT AUDIT REPORT →
                </button>
              </form>
            )}

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6 sm:mt-8 text-[11px] sm:text-xs font-bebas tracking-[0.14em] sm:tracking-[0.18em] text-neutral-400">
              <span>✓ 100% FREE STRATEGY AUDIT</span>
              <span>✓ ZERO SALES PRESSURE</span>
              <span>✓ NDA PROTECTED DATA</span>
            </div>

          </div>
        </section>

        {/* =========================================================================
            9. FREQUENTLY ASKED QUESTIONS (Bebas Neue Display Headings)
           ========================================================================= */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 bg-[#07030d] overflow-hidden">
          <div className="max-w-4xl mx-auto text-left">
            
            <div className="mb-10 sm:mb-14">
              <span className="font-bebas text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.24em] text-[#38bdf8] uppercase block mb-2">
                // CLARITY &amp; ACCOUNTABILITY
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bebas tracking-[0.04em] sm:tracking-[0.06em] text-white uppercase leading-none">
                FREQUENTLY ASKED QUESTIONS
              </h2>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="border border-white/10 rounded-[4px] bg-white/[0.02] overflow-hidden transition-all hover:border-[#38bdf8]/30"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full text-left p-4 sm:p-6 font-bebas text-base sm:text-lg lg:text-xl tracking-[0.08em] sm:tracking-[0.12em] text-white flex items-center justify-between gap-3 sm:gap-4 cursor-pointer hover:text-[#38bdf8] transition-colors"
                    >
                      <span className="pr-2">{faq.q}</span>
                      <span className="text-lg sm:text-xl text-[#38bdf8] shrink-0 font-mono font-bold">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 sm:px-6 sm:pb-6 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-white/5 pt-3 sm:pt-4 font-normal">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* =========================================================================
            10. MODERN INDUSTRIAL FOOTER (Same as Guest Posting)
           ========================================================================= */}
        <Footer />

      </div>
    </>
  );
}
