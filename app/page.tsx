"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Home() {
  // ============================================================
  // 1. STATE VARIABLES (Aap yahan se state modify kar sakte hain)
  // ============================================================
  // Google SERP Simulator state (After Nova vs Before Nova)
  const [serpView, setSerpView] = useState<"after" | "before">("after");

  // Service Category Filter state
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Audit Form state
  const [auditUrl, setAuditUrl] = useState("");
  const [auditEmail, setAuditEmail] = useState("");
  const [auditGoal, setAuditGoal] = useState("traffic");
  const [auditSuccess, setAuditSuccess] = useState(false);

  // FAQ Accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Form submit handler
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

  // Structured Data Schema for Google SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Nova Growth - Global SEO & Digital Growth Agency",
    "url": "https://novagrowth.agency",
    "description": "Dominate organic search and scale global revenue. Technical SEO, Next.js web development, and digital PR for overseas brands.",
    "areaServed": ["United States", "United Kingdom", "Canada", "Australia", "UAE"],
    "priceRange": "$$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "164"
    }
  };

  // ============================================================
  // 2. DATA LISTS (Aap text aur details yahan se change kar sakte hain)
  // ============================================================
  const services = [
    {
      category: "seo",
      badge: "Organic Search",
      title: "Commercial & Technical SEO",
      desc: "Target high-intent keywords that buyers actually search. We optimize crawl budget, schema markup, Core Web Vitals, and keyword architecture.",
      bullets: ["In-depth Keyword Mapping", "Technical Core Web Vitals Fixes", "On-Page Semantic Optimization"],
      metric: "+245% Avg. Organic Lift",
      featured: true,
    },
    {
      category: "dev",
      badge: "High Performance",
      title: "Next.js Web Development",
      desc: "Blazing fast, custom Next.js websites built for international conversion. Engineered for sub-0.8s load times and 98+ PageSpeed scores.",
      bullets: ["Headless Next.js & React 19", "Mobile-First UX Architecture", "Conversion-Focused UI"],
      metric: "< 0.8s Load Speed",
      featured: false,
    },
    {
      category: "seo",
      badge: "Authority",
      title: "Digital PR & Authority Backlinks",
      desc: "High Domain Authority (DA 50+) editorial placements on recognized publications. 100% white-hat manual outreach that moves Google.",
      bullets: ["Real High-DA Editorial Outreach", "Competitor Link Intersect", "Zero PBNs / Zero Spam"],
      metric: "DA 60+ Placements",
      featured: false,
    },
    {
      category: "cro",
      badge: "Conversion Rate",
      title: "Conversion Rate Optimization (CRO)",
      desc: "Turn passive website visitors into high-ticket consultation bookings. We test friction points, lead magnets, and user behavior flows.",
      bullets: ["A/B Split Testing", "Heatmap & User Session Analytics", "High-Converting Sales Funnels"],
      metric: "3.2x Booking Rate",
      featured: false,
    },
    {
      category: "marketing",
      badge: "Content Strategy",
      title: "Commercial Content Writing",
      desc: "Persuasive, SEO-engineered articles and landing page copy written specifically for North American and European executive audiences.",
      bullets: ["Top-of-Funnel Educational Posts", "Commercial Intent Product Guides", "Executive Thought Leadership"],
      metric: "Top 3 Ranking Rate",
      featured: false,
    },
    {
      category: "dev",
      badge: "Security & Uptime",
      title: "24/7 Managed Web Maintenance",
      desc: "Continuous security monitoring, daily automated backups, weekly performance audits, and instant technical troubleshooting.",
      bullets: ["99.9% Guaranteed Uptime", "Automated Cloud Backups", "Dedicated Tech Support"],
      metric: "99.9% Uptime",
      featured: false,
    },
  ];

  const filteredServices = activeCategory === "all" 
    ? services 
    : services.filter((s) => s.category === activeCategory);

  // Case Studies
  const caseStudies = [
    {
      client: "Meridian Health Group",
      country: "🇺🇸 United States (California)",
      category: "Healthcare & Clinic SEO",
      result: "+380%",
      resultSub: "Increase in Organic Inbound Patients",
      duration: "90 Days",
      summary: "Restructured local keyword architecture, optimized Google Business Profile, and built 42 contextual medical PR citations.",
      tags: ["Local SEO", "Next.js", "Technical Audit"],
    },
    {
      client: "Synthex Cloud Platform",
      country: "🇬🇧 United Kingdom (London)",
      category: "B2B SaaS Growth",
      result: "Rank #1",
      resultSub: "For 34 Commercial Enterprise Terms",
      duration: "120 Days",
      summary: "Outranked incumbent US competitors by producing authoritative comparison clusters and acquiring high-tier tech backlinks.",
      tags: ["SaaS SEO", "Digital PR", "Content Engine"],
    },
    {
      client: "Aura Home Living",
      country: "🇦🇪 UAE & GCC Market",
      category: "E-Commerce Web & Growth",
      result: "4.6x",
      resultSub: "Compounding Organic Revenue Return",
      duration: "6 Months",
      summary: "Migrated legacy slow shop to a headless Next.js frontend with sub-second page loads and optimized product schema.",
      tags: ["E-Commerce", "Core Web Vitals", "CRO"],
    },
  ];

  // Testimonials
  const testimonials = [
    {
      quote: "Nova Growth helped us dominate Google page 1 for our primary US software keywords in under 4 months. Inbound demo requests jumped 3x.",
      name: "David Vance",
      title: "VP of Growth, Synthex Cloud",
      country: "🇺🇸 United States",
      rating: "5.0",
    },
    {
      quote: "The Next.js rebuild cut our load time from 3.8s to 0.7s. Combined with their technical SEO sprints, our organic revenue has compounded month after month.",
      name: "Eleanor Wright",
      title: "Managing Director, Wright Media UK",
      country: "🇬🇧 United Kingdom",
      rating: "5.0",
    },
    {
      quote: "Zero fluff, 100% transparent weekly reporting. Their digital PR placements on real authority sites gave us an instant domain authority boost.",
      name: "Rashid Al-Khouri",
      title: "Chief Operating Officer, Aura Living",
      country: "🇦🇪 UAE",
      rating: "5.0",
    },
  ];

  // FAQs
  const faqs = [
    {
      q: "How does Nova Growth deliver results faster than traditional agencies?",
      a: "Traditional agencies waste months on generic slide decks. We begin execution in Week 1: fixing technical crawl errors, targeting low-competition commercial keywords, and acquiring high-authority digital PR links simultaneously.",
    },
    {
      q: "Do you specialize in overseas clients (US, UK, UAE, Australia)?",
      a: "Yes! Over 80% of our clients operate in the United States, United Kingdom, Canada, Australia, and UAE. Our team operates with flexible overlap in EST, GMT, and AEST time zones with weekly video reporting.",
    },
    {
      q: "What makes your Next.js web development different?",
      a: "We don't use bloated page builders or heavy WordPress themes. Every website we build is crafted on Next.js with clean TypeScript and Tailwind CSS, scoring 95+ on Google PageSpeed Insights and loading under 800 milliseconds.",
    },
    {
      q: "Are your backlink acquisition methods safe from Google penalties?",
      a: "100% white-hat. We strictly reject PBNs, automated spam links, and cheap directories. Every single link is placed on authentic, indexed websites with real organic traffic through manual editorial outreach.",
    },
    {
      q: "What are your payment and contract terms?",
      a: "We offer flexible sprint and monthly retainer agreements with zero long-term lock-in traps. You can pay securely in USD, GBP, or EUR via credit card, wire transfer, or Stripe through our dedicated payment portal.",
    },
  ];

  return (
    <>
      {/* Structured SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Main Container - Option 1: Clean Minimalist White & Navy Theme */}
      <div className="min-h-screen bg-white text-[#0f172a] font-sans selection:bg-[#3b49df] selection:text-white">
        
        {/* ========================================================= */}
        {/* NAVBAR (Existing navbar component)                        */}
        {/* ========================================================= */}
        <Navbar activePage="home" />

        {/* ========================================================= */}
        {/* 1. HERO SECTION: CLEAN MINIMALIST WHITE & NAVY            */}
        {/* ========================================================= */}
        <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 px-6 md:px-12 bg-white overflow-hidden border-b border-slate-100">
          
          {/* Subtle Clean Radial Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-b from-blue-50/50 via-slate-50/30 to-transparent blur-3xl pointer-events-none -z-10" />

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Left Column: Heading, Subtitle & CTAs */}
              <div className="lg:col-span-7 flex flex-col items-start text-left">
                
                {/* Announcement Pill Badge */}
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200/90 text-xs font-semibold text-slate-800 mb-6 shadow-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Elite SEO &amp; Digital Growth Agency</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-[#3b49df] font-bold">US &amp; UK Focus</span>
                </div>

                {/* Main Headline (Option 1 Style) */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-[1.08] mb-6">
                  Dominate Organic Search &amp; <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#091427] via-[#1d4ed8] to-[#d97706]">
                    Scale Global Revenue.
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mb-8 font-normal">
                  We engineer high-ranking SEO architectures, sub-second Next.js web applications, and authority digital PR to help international brands outrank rivals and capture high-intent commercial leads.
                </p>

                {/* Primary Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
                  <a
                    href="#audit-tool"
                    className="inline-flex items-center justify-center gap-2 bg-[#091427] hover:bg-[#0f213d] text-white text-sm font-bold px-7 py-3.5 rounded-full shadow-lg shadow-slate-900/10 transition-all hover:scale-[1.02] cursor-pointer"
                  >
                    <span>Claim Free SEO Audit</span>
                    <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>

                  <a
                    href="#case-studies"
                    className="inline-flex items-center justify-center text-sm font-semibold text-slate-800 px-6 py-3.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all shadow-xs"
                  >
                    View Verified Results
                  </a>
                </div>

                {/* Trust Points Metrics */}
                <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-100 w-full max-w-lg">
                  <div>
                    <div className="text-2xl font-black text-slate-900">160+</div>
                    <div className="text-xs text-slate-500 font-medium mt-0.5">Global Clients</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-[#d97706]">+340%</div>
                    <div className="text-xs text-slate-500 font-medium mt-0.5">Avg. Traffic Lift</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-emerald-600">99 / 100</div>
                    <div className="text-xs text-slate-500 font-medium mt-0.5">Core Web Vitals</div>
                  </div>
                </div>

              </div>

              {/* Right Column: Option 1 Visual Showcase (Google SERP Simulator Card) */}
              <div className="lg:col-span-5 relative">
                <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl shadow-slate-200/60 p-6 sm:p-7 relative">
                  
                  {/* Card Header with Before / After Nova Toggle */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                      <span className="text-xs font-bold text-slate-800 tracking-wide uppercase">Google Search Preview</span>
                    </div>

                    <div className="bg-slate-100 p-1 rounded-full flex items-center text-xs font-semibold">
                      <button
                        onClick={() => setSerpView("before")}
                        className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                          serpView === "before"
                            ? "bg-white text-slate-900 shadow-xs"
                            : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        Before Nova
                      </button>
                      <button
                        onClick={() => setSerpView("after")}
                        className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                          serpView === "after"
                            ? "bg-[#091427] text-white shadow-xs"
                            : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        After Nova 🚀
                      </button>
                    </div>
                  </div>

                  {/* Google Search Bar Mockup */}
                  <div className="bg-slate-50 border border-slate-200 rounded-full px-4 py-2.5 flex items-center gap-3 text-xs text-slate-700 mb-5">
                    <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span className="font-mono text-slate-600 truncate">best b2b enterprise software solutions usa</span>
                  </div>

                  {/* Dynamic Result Card based on state */}
                  {serpView === "after" ? (
                    <div className="bg-blue-50/30 border border-blue-200/70 rounded-2xl p-5 mb-5 transition-all">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Rank #1 • Featured Snippet
                        </span>
                        <span className="text-[11px] font-semibold text-slate-400">CTR: 34.8%</span>
                      </div>
                      <div className="text-xs text-slate-500 truncate mt-1">https://yourbrand.com/enterprise-solutions</div>
                      <h4 className="text-base sm:text-lg font-bold text-[#1d4ed8] hover:underline cursor-pointer leading-snug mt-1">
                        Enterprise Solutions That Scale: Rated #1 in North America
                      </h4>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        Discover why leading international organizations trust our scalable, secure platform. Sub-second performance, 99.9% uptime, and verified 3.4x ROI.
                      </p>
                      
                      {/* Sitelinks Box */}
                      <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-blue-100 text-xs">
                        <div className="bg-white p-2 rounded-lg border border-blue-100/80">
                          <span className="font-bold text-slate-800 block text-[11px]">Free Case Studies</span>
                          <span className="text-[10px] text-slate-500">Read verified results</span>
                        </div>
                        <div className="bg-white p-2 rounded-lg border border-blue-100/80">
                          <span className="font-bold text-slate-800 block text-[11px]">Schedule Strategy Call</span>
                          <span className="text-[10px] text-slate-500">15-min consultation</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-5 opacity-70 transition-all">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-bold text-rose-600 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full">
                          Page 4 • Position #38
                        </span>
                        <span className="text-[11px] font-semibold text-slate-400">CTR: &lt; 0.2%</span>
                      </div>
                      <div className="text-xs text-slate-400 truncate mt-1">https://yourbrand.com/home</div>
                      <h4 className="text-base font-medium text-slate-700 leading-snug mt-1">
                        Home Page - Company Name
                      </h4>
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                        Welcome to our company website. We provide services for our clients. Click here to learn more about what we do.
                      </p>
                      <div className="mt-3 text-[11px] text-rose-500 font-semibold">
                        ⚠️ High bounce rate (68%), no structured schema, missing commercial keywords.
                      </div>
                    </div>
                  )}

                  {/* Card Bottom: Core Web Vitals Indicator */}
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
                    <span className="flex items-center gap-1.5 font-medium text-slate-700">
                      <span className="text-amber-500">★ 4.9/5</span> on Clutch &amp; Trustpilot
                    </span>
                    <a href="#audit-tool" className="font-bold text-[#3b49df] hover:underline">
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
        <section className="py-8 bg-slate-50/80 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 shrink-0">
                Scaling Brands Across North America, UK &amp; Europe:
              </span>
              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-semibold text-slate-700">
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
        {/* 3. OPTION 1 BENTO SERVICES MATRIX                         */}
        {/* ========================================================= */}
        <section id="services" className="py-24 px-6 md:px-12 bg-white">
          <div className="max-w-7xl mx-auto">
            
            {/* Header with Filter Pills */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#3b49df] text-xs font-bold mb-3 border border-blue-100">
                  <span>Growth Capabilities</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                  High-Impact Services Built for Scale
                </h2>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { label: "All Services", key: "all" },
                  { label: "SEO & Rankings", key: "seo" },
                  { label: "Web Development", key: "dev" },
                  { label: "CRO & Sales", key: "cro" },
                  { label: "Content", key: "marketing" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveCategory(tab.key)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      activeCategory === tab.key
                        ? "bg-[#091427] text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 6 Clean White Service Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((srv, idx) => (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-[#3b49df]/50 hover:shadow-xl hover:shadow-slate-100 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-[11px] font-bold text-[#3b49df] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                        {srv.badge}
                      </span>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                        {srv.metric}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-2.5 group-hover:text-[#3b49df] transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                      {srv.desc}
                    </p>

                    <div className="space-y-2 mb-6 pt-4 border-t border-slate-100">
                      {srv.bullets.map((b, bIdx) => (
                        <div key={bIdx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                          <span className="text-emerald-500 font-bold">✓</span>
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-between text-xs font-bold text-slate-900 group-hover:text-[#3b49df] pt-4 border-t border-slate-100 transition-colors"
                  >
                    <span>Inquire for Custom Strategy</span>
                    <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </Link>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* 4. THE 4-PHASE GROWTH METHODOLOGY ROADMAP                 */}
        {/* ========================================================= */}
        <section className="py-20 px-6 md:px-12 bg-slate-50 border-y border-slate-100">
          <div className="max-w-7xl mx-auto">
            
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-[#3b49df]">
                Predictable Roadmap
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1 mb-3">
                How We Deliver Page-1 Dominance
              </h2>
              <p className="text-sm text-slate-600">
                A structured execution model designed to index faster, capture commercial buyer intent, and convert organic clicks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  phase: "01",
                  title: "Forensic Technical Audit",
                  desc: "We analyze crawl efficiency, keyword cannibalization, Google Search Console logs, and competitor link intersects.",
                },
                {
                  phase: "02",
                  title: "High-Intent Architecture",
                  desc: "We build dedicated commercial landing page clusters matching buyer intent queries with zero wasted traffic.",
                },
                {
                  phase: "03",
                  title: "Velocity Sprint Deployment",
                  desc: "On-page restructuring, Next.js Core Web Vitals optimization, and targeted high-DA PR placements go live.",
                },
                {
                  phase: "04",
                  title: "Compounding Growth",
                  desc: "Your rankings climb to top 3 positions, generating inbound consultation calls and measurable revenue 24/7.",
                },
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-7 rounded-2xl border border-slate-200/90 shadow-xs">
                  <span className="text-3xl font-black text-blue-500/80 font-mono block mb-3">
                    {item.phase}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* 5. VERIFIED CLIENT CASE STUDIES                           */}
        {/* ========================================================= */}
        <section id="case-studies" className="py-24 px-6 md:px-12 bg-white">
          <div className="max-w-7xl mx-auto">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#3b49df]">
                  Measurable Returns
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-1">
                  Client Case Studies
                </h2>
              </div>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#3b49df] hover:underline"
              >
                <span>View All 20+ Case Studies</span>
                <span>&rarr;</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {caseStudies.map((cs, idx) => (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-[#3b49df]/50 hover:shadow-xl hover:shadow-slate-100 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-4">
                      <span>{cs.category}</span>
                      <span className="text-[#3b49df] font-bold bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                        {cs.duration}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-1">{cs.client}</h3>
                    <div className="text-xs text-slate-500 mb-6 font-medium">{cs.country}</div>

                    {/* Result Highlight Box */}
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 mb-5">
                      <div className="text-3xl font-black text-[#3b49df]">{cs.result}</div>
                      <div className="text-xs font-semibold text-slate-800 mt-1">{cs.resultSub}</div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                      {cs.summary}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {cs.tags.map((t, tIdx) => (
                        <span key={tIdx} className="text-[10.5px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="/projects"
                    className="text-xs font-bold text-slate-900 hover:text-[#3b49df] pt-4 border-t border-slate-100 flex items-center justify-between transition-colors"
                  >
                    <span>Read Full Story Breakdown</span>
                    <span>↗</span>
                  </Link>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* 6. CLIENT TESTIMONIALS                                    */}
        {/* ========================================================= */}
        <section className="py-20 px-6 md:px-12 bg-slate-50/70 border-y border-slate-100">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-[#3b49df]">
                Overseas Feedback
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1 mb-3">
                Trusted by Founders Worldwide
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, idx) => (
                <div key={idx} className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-amber-500 font-bold text-sm">★★★★★</span>
                      <span className="text-xs text-slate-400 font-medium">{t.country}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic mb-6">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-100">
                    <div className="text-sm font-bold text-slate-900">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 7. INTERACTIVE FREE 20-POINT SEO AUDIT TOOL               */}
        {/* ========================================================= */}
        <section id="audit-tool" className="py-20 px-6 md:px-12 bg-white">
          <div className="max-w-5xl mx-auto bg-[#091427] rounded-3xl p-8 sm:p-14 text-white shadow-2xl relative overflow-hidden border border-slate-800">
            
            {/* Ambient Corner Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto text-center">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold mb-4">
                <span>🚀 Instant Audit • Zero Spam Promise</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
                Get Your Free 20-Point SEO &amp; Growth Audit
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8">
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
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-blue-400"
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
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-blue-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">Primary Growth Goal</label>
                    <select
                      value={auditGoal}
                      onChange={(e) => setAuditGoal(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-white/20 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-400 cursor-pointer"
                    >
                      <option value="traffic">Double Organic Google Traffic &amp; Rankings</option>
                      <option value="leads">Increase B2B Inbound Consultation Bookings</option>
                      <option value="redesign">Rebuild Website on Next.js for Sub-0.8s Speed</option>
                      <option value="pr">Build High-DA Contextual Backlinks</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-[#3b49df] hover:bg-[#2f3bc7] text-white font-bold text-sm transition-all shadow-lg shadow-blue-900/30 cursor-pointer mt-2"
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
        {/* 8. FREQUENTLY ASKED QUESTIONS (ACCORDION)                 */}
        {/* ========================================================= */}
        <section className="py-20 px-6 md:px-12 bg-slate-50 border-t border-slate-100">
          <div className="max-w-4xl mx-auto">
            
            <div className="text-center mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-[#3b49df]">
                Got Questions?
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1 mb-2">
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-slate-600">
                Transparent answers about our agency deliverables, overseas time zones, and guarantees.
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition-all"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full text-left px-6 py-4.5 font-bold text-base text-slate-900 flex items-center justify-between gap-4 cursor-pointer hover:text-[#3b49df] transition-colors"
                    >
                      <span>{faq.q}</span>
                      <span className="text-lg text-slate-400 font-mono shrink-0">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-50 pt-3">
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
        {/* 9. FINAL HIGH-CONVERTING CTA BANNER                       */}
        {/* ========================================================= */}
        <section className="py-20 px-6 md:px-12 bg-white">
          <div className="max-w-6xl mx-auto bg-gradient-to-tr from-[#091427] via-[#0f213d] to-[#1e40af] p-8 sm:p-14 rounded-3xl text-white text-center shadow-2xl relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-2">
                Ready To Scale Your Brand?
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                Stop Losing High-Intent Search Traffic To Competitors.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8">
                Join 160+ overseas companies scaling with Nova Growth. Book a free 15-minute introductory roadmap session today.
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="bg-[#3b49df] hover:bg-[#2f3bc7] text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-lg shadow-blue-900/40 transition-transform hover:scale-105"
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

        {/* Footer */}
        <Footer />

      </div>
    </>
  );
}
