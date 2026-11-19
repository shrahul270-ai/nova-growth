"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Home() {
  // State for Case Study Selection Tabs (Fixes Issue 18: full tab state management)
  const [activeCaseIdx, setActiveCaseIdx] = useState<number>(0);

  // State for SERP Simulator (Before vs After)
  const [serpView, setSerpView] = useState<"after" | "before">("after");

  // State for Service Filter
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // State for Audit Form
  const [auditUrl, setAuditUrl] = useState("");
  const [auditEmail, setAuditEmail] = useState("");
  const [auditGoal, setAuditGoal] = useState("traffic");
  const [auditSuccess, setAuditSuccess] = useState(false);

  // State for FAQ Accordion
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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
    name: "Balaji Prime Media - SEO & Digital Growth Agency",
    url: "https://balajiprimemedia.in",
    description: "Scale organic search revenue with high-impact SEO, DR 50-90+ editorial guest posting, and sub-second Next.js web applications.",
    areaServed: ["United States", "United Kingdom", "Canada", "Australia", "UAE"],
    priceRange: "$$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "164",
    },
  };

  // Case Studies (Enlarged with rich data for Issue 18)
  const caseStudies = [
    {
      caseId: "CASE #01",
      client: "Nordhaus Estates",
      industry: "Luxury Architecture & Real Estate",
      country: "🇺🇸 United States (New York)",
      result: "+240%",
      resultSub: "Increase in Direct Inbound Bookings",
      duration: "90 Days",
      summary: "Restructured regional keyword clusters, achieved #1 Google rankings for high-intent luxury buyer queries, and built 38 high-DA contextual backlinks.",
      tags: ["Local SEO", "High-DA Backlinks", "Next.js Architecture"],
      highlight: "$1.4M Pipeline Generated",
    },
    {
      caseId: "CASE #02",
      client: "Synthex Cloud Platform",
      industry: "B2B SaaS & Enterprise Tech",
      country: "🇬🇧 United Kingdom (London)",
      result: "Rank #1",
      resultSub: "For 34 Commercial Enterprise Terms",
      duration: "120 Days",
      summary: "Outranked incumbent US competitors by producing authoritative comparison clusters, optimizing Core Web Vitals, and acquiring high-tier tech backlinks.",
      tags: ["SaaS SEO", "Digital PR", "Content Engine"],
      highlight: "3.8x Demo Requests",
    },
    {
      caseId: "CASE #03",
      client: "Aura Home Living",
      industry: "E-Commerce & High-Ticket D2C",
      country: "🇦🇪 UAE & GCC Market",
      result: "4.6x ROI",
      resultSub: "Compounding Organic Revenue Return",
      duration: "6 Months",
      summary: "Migrated legacy slow shop to a headless Next.js frontend with sub-second page loads and optimized product schema markup for international search.",
      tags: ["E-Commerce", "Core Web Vitals", "CRO Funnels"],
      highlight: "+312% Organic Sales",
    },
    {
      caseId: "CASE #04",
      client: "Meridian Medical Group",
      industry: "Healthcare & Specialized Clinics",
      country: "🇺🇸 United States (California)",
      result: "+380%",
      resultSub: "New Patient Consultation Requests",
      duration: "90 Days",
      summary: "Optimized Google Business Profiles across 14 locations and placed verified medical authority guest posts in leading wellness publications.",
      tags: ["Healthcare SEO", "Editorial PR", "Citation Audit"],
      highlight: "Page 1 for 42 Terms",
    },
  ];

  // Services Matrix
  const services = [
    {
      category: "seo",
      badge: "Organic Search",
      title: "Commercial & Technical SEO",
      desc: "Target high-intent keywords that buyers actually search. We optimize crawl budget, schema markup, Core Web Vitals, and keyword architecture.",
      bullets: ["In-depth Keyword Mapping", "Core Web Vitals & Speed Fixes", "On-Page Semantic Optimization"],
      metric: "+245% Avg. Organic Lift",
    },
    {
      category: "seo",
      badge: "Authority",
      title: "Guest Posting & Digital PR (DR 50–90+)",
      desc: "High Domain Rating editorial placements on recognized publications. 100% white-hat manual outreach on verified websites with real traffic.",
      bullets: ["Real High-DA Editorial Outreach", "Competitor Link Intersect", "Zero PBNs / Zero Spam Guarantee"],
      metric: "DR 60+ Guaranteed",
    },
    {
      category: "dev",
      badge: "High Performance",
      title: "Next.js Web Engineering",
      desc: "Blazing fast, custom Next.js websites built for overseas conversion. Optimized for sub-0.8s load times and 98+ Google PageSpeed scores.",
      bullets: ["Headless Next.js & React 19", "Mobile-First UX Architecture", "Conversion-Focused Lead Funnels"],
      metric: "< 0.8s Load Speed",
    },
    {
      category: "cro",
      badge: "Conversion Rate",
      title: "Conversion Rate Optimization (CRO)",
      desc: "Turn passive website visitors into paying clients. We test friction points, lead magnets, copy clarity, and user behavior flows.",
      bullets: ["A/B Split Testing Protocols", "Heatmap & User Session Analytics", "High-Converting Sales Funnels"],
      metric: "3.2x Booking Rate",
    },
    {
      category: "marketing",
      badge: "Content Strategy",
      title: "Commercial Content Engine",
      desc: "Persuasive, SEO-engineered articles and landing page copy written specifically for North American and European executive audiences.",
      bullets: ["Commercial Intent Product Guides", "Topical Authority Clusters", "Executive Thought Leadership"],
      metric: "Top 3 Ranking Rate",
    },
    {
      category: "dev",
      badge: "Security & Uptime",
      title: "24/7 Managed Web Maintenance",
      desc: "Continuous security monitoring, daily automated backups, weekly performance audits, and instant technical troubleshooting.",
      bullets: ["99.9% Guaranteed Uptime", "Automated Cloud Backups", "Dedicated Senior Tech Support"],
      metric: "99.9% Uptime",
    },
  ];

  const filteredServices = activeCategory === "all"
    ? services
    : services.filter((s) => s.category === activeCategory);

  // FAQs
  const faqs = [
    {
      q: "How does Balaji Prime Media deliver results faster than traditional agencies?",
      a: "Traditional agencies waste months on generic slide decks. We begin execution in Week 1: fixing technical crawl errors, targeting low-competition commercial keywords, and acquiring high-authority digital PR links simultaneously.",
    },
    {
      q: "Do you specialize in overseas clients (US, UK, UAE, Australia)?",
      a: "Yes! Over 80% of our clients operate in the United States, United Kingdom, Canada, Australia, and UAE. Our team operates with flexible overlap across EST, GMT, and AEST time zones with weekly video reporting.",
    },
    {
      q: "What makes your Next.js web development different?",
      a: "We don't use bloated WordPress themes or sluggish page builders. Every website we build is crafted on Next.js with clean TypeScript and Tailwind CSS, scoring 95+ on Google PageSpeed Insights and loading under 800 milliseconds.",
    },
    {
      q: "Are your guest posting & backlink methods safe from Google penalties?",
      a: "100% white-hat. We strictly reject PBNs, automated spam links, and cheap directories. Every single link is placed on authentic, indexed websites with real organic traffic through manual editorial outreach.",
    },
    {
      q: "What are your payment and contract terms?",
      a: "We offer flexible sprint and monthly retainer agreements with zero long-term lock-in traps. You can pay securely in USD, GBP, or EUR via Stripe, PayPal, wire transfer, or UPI through our dedicated client portal.",
    },
  ];

  return (
    <>
      {/* Structured SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Main Container - Clean White & Yellow-Golden Luxury Theme */}
      <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-amber-500 selection:text-white">
        
        {/* Redesigned 2-Tier White & Yellow-Golden Header */}
        <Navbar activePage="home" />

        {/* ========================================================= */}
        {/* 1. HERO SECTION (Fixes Issue 3: Single Primary Focus)    */}
        {/* ========================================================= */}
        <section id="home" className="relative pt-12 pb-20 md:pt-20 md:pb-28 px-6 md:px-12 bg-white overflow-hidden border-b border-amber-200/60">
          
          {/* Subtle Warm Golden Ambient Glow */}
          <div
            aria-hidden="true"
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.09)_0%,rgba(254,243,199,0.18)_40%,transparent_70%)] pointer-events-none -z-10"
          />

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Left Column: Heading, Value Proposition & Clear Primary Action */}
              <div className="lg:col-span-7 flex flex-col items-start text-left">
                
                {/* Announcement Pill Badge */}
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-300/80 text-xs font-bold text-amber-950 mb-6 shadow-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                  <span>Global SEO, Guest Posting &amp; Web Engineering</span>
                  <span className="text-amber-400">•</span>
                  <span className="text-[#d97706] font-bold">US &amp; UK Focus</span>
                </div>

                {/* Primary Headline */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-950 leading-[1.08] mb-6">
                  Scale Your Organic Traffic &amp; <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600">
                    Dominate Search Revenue.
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mb-8 font-normal">
                  Balaji Prime Media combines high-authority DR 50–90+ editorial outreach, technical SEO architectures, and custom Next.js web applications to turn search queries into predictable commercial pipeline.
                </p>

                {/* Fix Issue 3: 'Scale Your Traffic' is the unambiguous, high-contrast PRIMARY CTA */}
                <div className="flex flex-wrap items-center gap-4 mb-6 w-full sm:w-auto">
                  <a
                    href="#audit-tool"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-600 hover:to-yellow-500 shadow-lg shadow-amber-900/20 hover:scale-[1.02] transition-all cursor-pointer"
                  >
                    <span>Scale Your Traffic Free</span>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>

                  {/* Standardized Secondary Action (Fixes Issue 15) */}
                  <a
                    href="#case-studies"
                    className="inline-flex items-center justify-center px-6 py-4 rounded-full text-sm font-bold text-slate-800 bg-white hover:bg-amber-50/60 border border-amber-300/80 transition-all shadow-xs"
                  >
                    Explore Case Studies
                  </a>
                </div>

                {/* Fix Issue 3, 8 & 9: Subordinated Leadership Advisory text with readable >=12px font */}
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-600 mb-8 pt-2">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" aria-hidden="true" />
                  <span className="font-semibold text-slate-900">Direct Founder Advisory:</span>
                  <a
                    href="#contact"
                    className="text-[#d97706] font-bold underline underline-offset-4 hover:text-[#b45309] transition-colors"
                  >
                    Talk with Leadership ↗
                  </a>
                </div>

                {/* Trust Points Metrics */}
                <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200/80 w-full max-w-lg">
                  <div>
                    <div className="text-2xl font-black text-slate-950">160+</div>
                    <div className="text-xs text-slate-600 font-medium mt-0.5">Global Brands</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-[#d97706]">+340%</div>
                    <div className="text-xs text-slate-600 font-medium mt-0.5">Avg. Traffic Lift</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-emerald-600">99 / 100</div>
                    <div className="text-xs text-slate-600 font-medium mt-0.5">Core Web Vitals</div>
                  </div>
                </div>

              </div>

              {/* Right Column: Interactive SERP & Rank Simulator */}
              <div className="lg:col-span-5 relative">
                <div className="bg-white rounded-3xl border border-amber-200 shadow-xl shadow-amber-950/5 p-6 sm:p-7 relative">
                  
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                      <span className="text-xs font-bold text-slate-900 tracking-wider uppercase">Google Search Preview</span>
                    </div>

                    <div className="bg-slate-100 p-1 rounded-full flex items-center text-xs font-semibold">
                      <button
                        type="button"
                        onClick={() => setSerpView("before")}
                        className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                          serpView === "before"
                            ? "bg-white text-slate-900 shadow-xs font-bold"
                            : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        Before BPM
                      </button>
                      <button
                        type="button"
                        onClick={() => setSerpView("after")}
                        className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                          serpView === "after"
                            ? "bg-[#091427] text-white shadow-xs font-bold"
                            : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        After BPM 🚀
                      </button>
                    </div>
                  </div>

                  <div className="bg-[#fefbf6] border border-amber-200/70 rounded-full px-4 py-2.5 flex items-center gap-3 text-xs text-slate-700 mb-5">
                    <span className="text-amber-500">🔍</span>
                    <span className="font-mono text-slate-700 truncate font-medium">best b2b enterprise software solutions usa</span>
                  </div>

                  {serpView === "after" ? (
                    <div className="bg-amber-50/40 border border-amber-200/80 rounded-2xl p-5 mb-5 transition-all">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Rank #1 • Featured Snippet
                        </span>
                        <span className="text-xs font-bold text-slate-500">CTR: 34.8%</span>
                      </div>
                      <div className="text-xs text-slate-500 truncate mt-1">https://balajiprimemedia.in/enterprise-growth</div>
                      <h4 className="text-base sm:text-lg font-bold text-[#1d4ed8] hover:underline cursor-pointer leading-snug mt-1">
                        Enterprise Growth That Scales: Rated #1 in North America
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
                        Discover why leading international organizations trust Balaji Prime Media. Sub-second performance, verified DR 50–90+ digital PR, and 3.4x ROI.
                      </p>
                      
                      <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-amber-200/60 text-xs">
                        <div className="bg-white p-2.5 rounded-xl border border-amber-200/70">
                          <span className="font-bold text-slate-900 block text-xs">Free Case Studies</span>
                          <span className="text-xs text-slate-500">Verified commercial ROI</span>
                        </div>
                        <div className="bg-white p-2.5 rounded-xl border border-amber-200/70">
                          <span className="font-bold text-slate-900 block text-xs">Schedule Strategy Call</span>
                          <span className="text-xs text-slate-500">1-on-1 consultation</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-5 opacity-75 transition-all">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-rose-700 bg-rose-100 border border-rose-200 px-2.5 py-0.5 rounded-full">
                          Page 4 • Position #38
                        </span>
                        <span className="text-xs font-semibold text-slate-400">CTR: &lt; 0.2%</span>
                      </div>
                      <div className="text-xs text-slate-400 truncate mt-1">https://yourbrand.com/home</div>
                      <h4 className="text-base font-medium text-slate-700 leading-snug mt-1">
                        Home Page - Company Name
                      </h4>
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                        Welcome to our company website. We provide digital services. Click here to learn more about what we do.
                      </p>
                      <div className="mt-3 text-xs text-rose-600 font-semibold">
                        ⚠️ High bounce rate (68%), no structured schema, missing commercial keywords.
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-slate-600 pt-3 border-t border-slate-100">
                    <span className="flex items-center gap-1.5 font-semibold text-slate-800">
                      <span className="text-amber-500">★ 4.9/5</span> on Clutch &amp; Trustpilot
                    </span>
                    <a href="#audit-tool" className="font-bold text-[#d97706] hover:underline">
                      Audit Your Website &rarr;
                    </a>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 2. RECOGNIZED BY & SERVING INDUSTRIES STRIP               */}
        {/* ========================================================= */}
        <section className="py-8 bg-[#fdfbf7] border-b border-amber-200/50">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 shrink-0">
                Scaling Global Brands Across North America &amp; Europe:
              </span>
              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-bold text-slate-800">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500" /> B2B SaaS &amp; Tech
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" /> E-Commerce &amp; D2C
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Healthcare &amp; Clinics
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500" /> Legal &amp; Financial
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-500" /> Real Estate
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 3. CORE SERVICES MATRIX                                   */}
        {/* ========================================================= */}
        <section id="services" className="py-24 px-6 md:px-12 bg-white">
          <div className="max-w-7xl mx-auto">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 text-[#d97706] text-xs font-bold mb-3 border border-amber-200">
                  <span>Growth Capabilities</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight">
                  High-Impact Services Built for Scale
                </h2>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { label: "All Services", key: "all" },
                  { label: "SEO & Rankings", key: "seo" },
                  { label: "Web Engineering", key: "dev" },
                  { label: "CRO & Sales", key: "cro" },
                  { label: "Content", key: "marketing" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveCategory(tab.key)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      activeCategory === tab.key
                        ? "bg-[#091427] text-white shadow-xs"
                        : "bg-slate-100 text-slate-700 hover:bg-amber-50 hover:text-[#d97706]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 6 Clean White Cards with Golden Accents */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((srv, idx) => (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-amber-400 hover:shadow-xl hover:shadow-amber-950/5 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-xs font-bold text-amber-900 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                        {srv.badge}
                      </span>
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                        {srv.metric}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-950 mb-2.5 group-hover:text-[#d97706] transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                      {srv.desc}
                    </p>

                    <div className="space-y-2 mb-6 pt-4 border-t border-slate-100">
                      {srv.bullets.map((b, bIdx) => (
                        <div key={bIdx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                          <span className="text-amber-500 font-bold">✓</span>
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Standardized View Action (Fixes Issue 15) */}
                  <Link
                    href="/services"
                    className="inline-flex items-center justify-between text-xs font-bold text-slate-900 group-hover:text-[#d97706] pt-4 border-t border-slate-100 transition-colors"
                  >
                    <span>Inquire for Custom Strategy</span>
                    <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </Link>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. CASE STUDIES (Fixes Issue 18: Enlarged, Accessible Selection Tabs)     */}
        {/* ========================================================================= */}
        <section id="case-studies" className="py-24 px-6 md:px-12 bg-[#fffdfa] border-y border-amber-200/60">
          <div className="max-w-7xl mx-auto">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#d97706]">
                  Measurable Returns
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight mt-1">
                  Proven Client Case Studies
                </h2>
              </div>

              {/* Standardized View All Link (Fixes Issue 15) */}
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#d97706] hover:text-[#b45309] hover:gap-3 transition-all"
              >
                <span>View All 20+ Case Studies</span>
                <span>&rarr;</span>
              </Link>
            </div>

            {/* Fix Issue 18: Four Large, Well-Padded, Highly Affordant Tab Buttons (CASE #01 - #04) */}
            <div
              role="tablist"
              aria-label="Case study categories"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
            >
              {caseStudies.map((cs, idx) => {
                const isSelected = activeCaseIdx === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    role="tab"
                    id={`case-tab-${idx}`}
                    aria-selected={isSelected}
                    aria-controls={`case-panel-${idx}`}
                    onClick={() => setActiveCaseIdx(idx)}
                    className={`group relative p-5 sm:p-6 rounded-2xl text-left transition-all duration-200 cursor-pointer border flex flex-col justify-between min-h-[120px] shadow-xs ${
                      isSelected
                        ? "bg-white border-[#d97706] ring-2 ring-amber-400/30 shadow-md"
                        : "bg-white/80 hover:bg-white border-slate-200 hover:border-amber-300"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <span className={`text-xs font-mono font-bold uppercase tracking-wider ${
                        isSelected ? "text-[#d97706]" : "text-slate-500 group-hover:text-amber-600"
                      }`}>
                        {cs.caseId}
                      </span>
                      {/* Fix Issue 12: metric text-xs font-bold */}
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full">
                        {cs.result}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#d97706] transition-colors leading-snug">
                        {cs.client}
                      </h4>
                      {/* Fix Issue 11: category text-xs text-slate-500 */}
                      <p className="text-xs text-slate-500 mt-1 truncate">
                        {cs.industry}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Expanded Detail View for Selected Case Study */}
            <div
              id={`case-panel-${activeCaseIdx}`}
              role="tabpanel"
              aria-labelledby={`case-tab-${activeCaseIdx}`}
              className="bg-white rounded-3xl p-8 sm:p-12 border border-amber-200/90 shadow-xl shadow-amber-950/5 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-bold text-amber-900 bg-amber-100 border border-amber-300 px-3 py-1 rounded-full">
                    {caseStudies[activeCaseIdx].duration} Sprint
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {caseStudies[activeCaseIdx].country}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-slate-950">
                  {caseStudies[activeCaseIdx].client} — {caseStudies[activeCaseIdx].industry}
                </h3>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {caseStudies[activeCaseIdx].summary}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {caseStudies[activeCaseIdx].tags.map((t, tIdx) => (
                    <span key={tIdx} className="text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-md">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 bg-gradient-to-br from-amber-500 via-amber-600 to-yellow-600 rounded-2xl p-8 text-white shadow-lg flex flex-col justify-between min-h-[220px]">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-100">Verified Impact</span>
                  <div className="text-4xl sm:text-5xl font-black text-white mt-2 mb-1">
                    {caseStudies[activeCaseIdx].result}
                  </div>
                  <div className="text-sm font-semibold text-amber-100">
                    {caseStudies[activeCaseIdx].resultSub}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/20 mt-4 flex items-center justify-between text-xs text-amber-100 font-bold">
                  <span>{caseStudies[activeCaseIdx].highlight}</span>
                  <Link href="/projects" className="underline hover:text-white">
                    Full Case Breakdown &rarr;
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. ABOUT THE FOUNDERS (Fixes Issue 17: Cohesive, Balanced Grid Layout)   */}
        {/* ========================================================================= */}
        <section id="about" className="py-24 px-6 md:px-12 bg-white">
          <div className="max-w-7xl mx-auto">
            
            {/* Fix Issue 17: Aligned 2-column header replacing the unbalanced left-skewed title */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 border-b border-slate-100 pb-10">
              <div className="lg:col-span-5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#d97706] mb-2 block">
                  Agency Leadership
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight">
                  About the Founders
                </h2>
              </div>
              <div className="lg:col-span-7">
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  Balaji Prime Media was founded on a simple principle: eliminate agency fluff, vanity metrics, and algorithmic guesswork. We combine engineering-grade Next.js web architecture with high-DA manual editorial outreach to build sustainable, compounding organic pipeline.
                </p>
              </div>
            </div>

            {/* Founders Highlights (Fixes Issue 10: text-xs/sm readable copy) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#fefbf6] p-8 rounded-3xl border border-amber-200/70 shadow-xs">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-lg mb-5 border border-amber-300/60">
                  🎯
                </div>
                <h3 className="text-lg font-bold text-slate-950 mb-2">Technical Mastery</h3>
                <span className="text-xs text-slate-600 block mb-3 font-semibold">Skilled &amp; Experienced</span>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Deep technical roots across Core Web Vitals, serverless edge compute, and advanced crawl-budget optimization for multi-million page platforms.
                </p>
              </div>

              <div className="bg-[#fefbf6] p-8 rounded-3xl border border-amber-200/70 shadow-xs">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-lg mb-5 border border-amber-300/60">
                  🌐
                </div>
                <h3 className="text-lg font-bold text-slate-950 mb-2">Global Media Network</h3>
                <span className="text-xs text-slate-600 block mb-3 font-semibold">Direct Publisher Relationships</span>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Direct relationships with 850+ vetted editors and journalists across North America, the UK, Europe, and Asia for genuine high-DA placements.
                </p>
              </div>

              <div className="bg-[#fefbf6] p-8 rounded-3xl border border-amber-200/70 shadow-xs">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-lg mb-5 border border-amber-300/60">
                  📈
                </div>
                <h3 className="text-lg font-bold text-slate-950 mb-2">Data-Backed ROI</h3>
                <span className="text-xs text-slate-600 block mb-3 font-semibold">Weekly Transparent Reporting</span>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  No vanity impressions. We track rankings, organic traffic conversion, and qualified inbound sales pipeline with live dashboard access.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* 6. INTERACTIVE 20-POINT SEO AUDIT TOOL                   */}
        {/* ========================================================= */}
        <section id="audit-tool" className="py-20 px-6 md:px-12 bg-white">
          <div className="max-w-5xl mx-auto bg-[#091427] rounded-3xl p-8 sm:p-14 text-white shadow-2xl relative overflow-hidden border border-amber-300/20">
            
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto text-center">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-bold mb-4">
                <span>⚡ Instant Audit • 100% Free &amp; Confidential</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
                Request Your 20-Point SEO &amp; Growth Audit
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-8">
                Enter your website URL. Our senior growth engineers will inspect keyword rankings, page speed bottlenecks, and backlink gaps — sending a customized action plan within 24 hours.
              </p>

              {auditSuccess ? (
                <div className="bg-emerald-500/20 border border-emerald-400/40 p-6 rounded-2xl text-emerald-200 font-semibold animate-fadeIn">
                  🎉 Audit request received! We are analyzing your website now. Check your inbox within 24 hours for your tailored PDF report and video breakdown.
                </div>
              ) : (
                <form onSubmit={handleAuditSubmit} className="space-y-4 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1.5">Website URL</label>
                      <input
                        type="url"
                        placeholder="https://yourbrand.com"
                        required
                        value={auditUrl}
                        onChange={(e) => setAuditUrl(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1.5">Work Email Address</label>
                      <input
                        type="email"
                        placeholder="name@company.com"
                        required
                        value={auditEmail}
                        onChange={(e) => setAuditEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">Primary Growth Goal</label>
                    <select
                      value={auditGoal}
                      onChange={(e) => setAuditGoal(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-white/20 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400 cursor-pointer"
                    >
                      <option value="traffic">Double Organic Google Traffic &amp; Rankings</option>
                      <option value="leads">Increase B2B Inbound Consultation Bookings</option>
                      <option value="guest-posting">Acquire High-DR (50–90+) Editorial Backlinks</option>
                      <option value="redesign">Rebuild Website on Next.js for Sub-0.8s Speed</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-yellow-500 text-white font-bold text-sm transition-all shadow-lg shadow-amber-900/30 cursor-pointer mt-2"
                  >
                    Generate My Free 20-Point Audit Report &rarr;
                  </button>
                </form>
              )}

              <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-xs text-slate-400">
                <span>✓ 100% Free Consultation</span>
                <span>✓ Zero Sales Pressure</span>
                <span>✓ NDA Protected</span>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 7. FREQUENTLY ASKED QUESTIONS                             */}
        {/* ========================================================= */}
        <section className="py-20 px-6 md:px-12 bg-[#fffdfa] border-t border-amber-200/60">
          <div className="max-w-4xl mx-auto">
            
            <div className="text-center mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-[#d97706]">
                Got Questions?
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight mt-1 mb-2">
                Frequently Asked Questions
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Transparent answers about our agency deliverables, overseas time zones, and guarantees.
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-amber-200/80 overflow-hidden shadow-xs transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full text-left px-6 py-4.5 font-bold text-base text-slate-950 flex items-center justify-between gap-4 cursor-pointer hover:text-[#d97706] transition-colors"
                    >
                      <span>{faq.q}</span>
                      <span className="text-lg text-amber-500 font-mono shrink-0">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* 8. FINAL HIGH-CONVERTING CTA BANNER                       */}
        {/* ========================================================= */}
        <section id="contact" className="py-20 px-6 md:px-12 bg-white">
          <div className="max-w-6xl mx-auto bg-gradient-to-tr from-[#091427] via-[#111f38] to-[#091427] p-8 sm:p-14 rounded-3xl text-white text-center shadow-2xl relative overflow-hidden border border-amber-300/30">
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-2">
                Ready To Scale Your Brand?
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                Stop Losing High-Intent Search Traffic To Competitors.
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-8">
                Join 160+ overseas companies scaling with Balaji Prime Media. Book a free 15-minute introductory roadmap session today.
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/contact-us"
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-yellow-500 text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-lg shadow-amber-900/40 transition-transform hover:scale-105"
                >
                  Book 15-Min Strategy Call
                </Link>
                <Link
                  href="/pay"
                  className="bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-7 py-3.5 rounded-full border border-white/20 transition-all"
                >
                  Client Invoicing &amp; Portal
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer (Marble hands removed, small text fixed, white & golden theme) */}
        <Footer />

      </div>
    </>
  );
}
