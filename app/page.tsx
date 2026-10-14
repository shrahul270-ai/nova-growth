"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SeoAuditWidget from "./components/SeoAuditWidget";

export default function Home() {
  const [contactOpen, setContactOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [selectedService, setSelectedService] = useState<string>("All Services");
  const [toast, setToast] = useState<string | null>(null);
  const [activeBadge, setActiveBadge] = useState<string | null>(null);
  const [activeProcessStep, setActiveProcessStep] = useState<number>(0);
  const [activeProjectModal, setActiveProjectModal] = useState<{
    title: string;
    category: string;
    metric: string;
    client: string;
    description: string;
    deliverables: string[];
    timeline: string;
    impact: string;
  } | null>(null);
  const [reviewFilter, setReviewFilter] = useState<"all" | "usa" | "uk">("all");

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setContactOpen(false);
        setActiveProjectModal(null);
      }
    };
    if (contactOpen || activeProjectModal) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [contactOpen, activeProjectModal]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");
    setTimeout(() => {
      setFormStatus("success");
      setTimeout(() => {
        setContactOpen(false);
        setFormStatus("idle");
      }, 2000);
    }, 900);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": "https://novagrowth.agency/#organization",
        "name": "Nova Growth - Global Digital Marketing Agency",
        "url": "https://novagrowth.agency",
        "logo": "https://novagrowth.agency/logo.png",
        "image": "https://novagrowth.agency/og-image.jpg",
        "description": "Global digital marketing agency helping overseas businesses scale through high-ranking SEO, modern web development, and performance digital solutions.",
        "priceRange": "$$$",
        "areaServed": [
          { "@type": "Country", "name": "United States" },
          { "@type": "Country", "name": "United Kingdom" },
          { "@type": "Country", "name": "Canada" },
          { "@type": "Country", "name": "Australia" },
          { "@type": "Country", "name": "United Arab Emirates" },
          { "@type": "Country", "name": "Germany" }
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "158"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Digital Marketing & SEO Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "SEO Optimization & Organic Growth",
                "description": "Rank higher, get found, drive high-intent organic traffic for global businesses."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Website Development & Next.js Design",
                "description": "Modern, ultra-fast and responsive web development optimized for international conversion."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Content Writing & Strategy",
                "description": "Engaging, SEO-optimized copy tailored for US, UK, and European audiences."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Email Marketing & Automation",
                "description": "Nurture leads and boost lifetime customer loyalty through automated workflows."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Off Page Backlink Building",
                "description": "High-authority ethical link building and digital PR to boost domain authority."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Website Maintenance & Speed Optimization",
                "description": "Keep your web apps secure, updated, and scoring 95+ on Google PageSpeed Insights."
              }
            }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How quickly can my website rank on Google with Nova Growth?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Using our strategic high-intent low-competition keyword strategy and technical SEO foundations, initial keyword rankings typically begin indexing within 3 to 6 weeks, with major organic traffic growth compounding within 90 days."
            }
          },
          {
            "@type": "Question",
            "name": "Do you work with international clients outside India?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, over 80% of our clients are located in the United States, United Kingdom, Canada, Australia, and UAE with seamless communication in EST, GMT, and AEST time zones."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      {/* Structured SEO Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="relative min-h-screen bg-[#f8fbf9] text-[#111827] overflow-hidden selection:bg-[#d97706] selection:text-white">
        {/* Floating Interactive Toast Notification */}
        {toast && (
          <div className="fixed top-24 right-6 z-50 bg-[#091427] text-white border border-[#d97706]/60 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-fadeIn text-xs font-semibold backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-ping" />
            <span>{toast}</span>
            <button onClick={() => setToast(null)} className="ml-2 text-gray-400 hover:text-white text-xs cursor-pointer">✕</button>
          </div>
        )}
        {/* Soft Organic Iridescent Background Shapes */}
        <div className="curved-ribbon-left" aria-hidden="true" />
        <div className="curved-ribbon-right" aria-hidden="true" />
        <div className="curved-ribbon-mid-left" aria-hidden="true" />
        <div className="curved-ribbon-bottom" aria-hidden="true" />

        {/* 1. HEADER / NAVIGATION */}
        <Navbar activePage="home" />

        {/* 2. HERO SECTION */}
        <section id="home" className="relative pt-10 pb-20 md:pt-16 md:pb-28 px-6 md:px-12 z-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50/90 border border-[#d97706]/40 text-xs font-bold text-[#091427] mb-6 shadow-xs badge-3d">
                <span className="w-2 h-2 rounded-full bg-[#d97706] animate-pulse" />
                <span>🌍 Premier Growth Agency for US, UK &amp; Global Brands</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[62px] font-black tracking-tight text-[#0f172a] leading-[1.08] mb-6">
                Scale Your Organic Revenue <br />
                <span className="text-gradient-navy-gold">Across Global Markets.</span>
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-[#475569] leading-relaxed max-w-xl mb-8 font-normal">
                We help overseas founders and marketing teams dominate Google search through high-intent SEO, modern Next.js development, and real DR 50–90+ editorial backlinks that compound pipeline 24/7.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <button
                  onClick={() => setContactOpen(true)}
                  className="btn-3d inline-flex items-center gap-2 bg-[#091427] hover:bg-[#0f213d] text-white border border-[#d97706]/40 text-sm font-bold px-7 py-3.5 rounded-full transition-all cursor-pointer"
                >
                  <span>Book Strategy Call (EST / GMT)</span>
                  <svg className="w-4 h-4 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>

                <Link
                  href="/guest-posting"
                  className="btn-gold-3d inline-flex items-center gap-2 bg-[#d97706] hover:bg-[#b45309] text-white text-sm font-bold px-6 py-3.5 rounded-full transition-all cursor-pointer"
                >
                  <span>Explore Guest Posts (DR 50+)</span>
                  <span>⚡</span>
                </Link>

                <a
                  href="#services"
                  className="inline-flex items-center justify-center text-xs sm:text-sm font-semibold text-[#091427] px-5 py-3 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-all shadow-xs"
                >
                  View All Services ↓
                </a>
              </div>

              {/* International Client Footprint Strip */}
              <div className="w-full max-w-xl p-4 rounded-2xl bg-white/80 border border-gray-200/80 shadow-xs backdrop-blur-sm">
                <div className="flex items-center justify-between text-xs font-bold text-[#091427] mb-2">
                  <span>Trusted by Overseas Clients:</span>
                  <span className="text-[#d97706] font-semibold text-[11px]">Timezone Aligned (EST • GMT)</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-gray-700">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 border border-gray-200 flex items-center gap-1.5">
                    <span>🇺🇸</span><span>United States</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 border border-gray-200 flex items-center gap-1.5">
                    <span>🇬🇧</span><span>United Kingdom</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 border border-gray-200 flex items-center gap-1.5">
                    <span>🇨🇦</span><span>Canada</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 border border-gray-200 flex items-center gap-1.5">
                    <span>🇦🇺</span><span>Australia</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 border border-gray-200 flex items-center gap-1.5">
                    <span>🇦🇪</span><span>UAE</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Hero Right Visual: 3D Holographic Growth Hub */}
            <div className="lg:col-span-5 relative flex items-center justify-center min-h-[460px] md:min-h-[540px] perspective-1000">
              
              {/* Floating 3D Badge 1: US Traffic (Top Left) */}
              <div className="absolute -top-4 -left-4 sm:left-0 z-30 bg-white/95 backdrop-blur-md border border-[#d97706]/40 p-3.5 rounded-2xl shadow-xl card-3d animate-float-slow text-left max-w-[210px]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-gray-500 uppercase">US Google Traffic</span>
                  <span className="text-xs">📈</span>
                </div>
                <div className="text-xl font-black text-[#0f172a] leading-tight">+340% Lift</div>
                <div className="text-[10px] text-[#d97706] font-bold mt-0.5">#1 Organic Rank</div>
                <div className="w-full bg-amber-100 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-[#d97706] h-full w-[85%]" />
                </div>
              </div>

              {/* Floating 3D Badge 2: Core Web Vitals (Top Right) */}
              <div className="absolute top-8 -right-2 sm:right-2 z-30 bg-[#091427] text-white border border-[#d97706]/40 p-3.5 rounded-2xl shadow-xl card-3d animate-float-gentle text-left">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-bold text-slate-300 uppercase">Core Web Vitals</span>
                </div>
                <div className="text-lg font-black text-white">99/100 Passed</div>
                <span className="text-[10px] text-emerald-400 font-semibold block mt-0.5">&lt; 0.8s Next.js TTFB</span>
              </div>

              {/* 3D Glassmorphic Crystal Centerpiece */}
              <div className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] flex items-center justify-center animate-float-slow">
                
                {/* Iridescent Glow Rings */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#1d4ed8]/20 via-[#d97706]/25 to-[#091427]/20 blur-3xl animate-pulse-glow" />

                {/* Outer Metallic Torus Ring (Brushed Champagne Gold) */}
                <div className="absolute w-[290px] h-[290px] sm:w-[350px] sm:h-[350px] rounded-full border-[10px] sm:border-[14px] border-transparent bg-gradient-to-tr from-[#d97706]/50 via-[#f8fafd] to-[#b45309]/70 shadow-2xl opacity-95 transform rotate-12"
                     style={{
                       backgroundClip: "padding-box",
                       boxShadow: "inset 0 0 25px rgba(254,243,199,0.95), 0 20px 45px rgba(9,20,39,0.2)"
                     }}
                />

                {/* Main 3D Sphere Glass Body */}
                <div className="relative w-[210px] h-[210px] sm:w-[260px] sm:h-[260px] rounded-full overflow-hidden shadow-2xl flex items-center justify-center border border-[#d97706]/40"
                     style={{
                       background: "radial-gradient(circle at 35% 30%, rgba(248, 250, 253, 0.95) 0%, rgba(30, 64, 175, 0.75) 35%, rgba(9, 20, 39, 0.95) 80%, rgba(5, 11, 22, 1) 100%)",
                       boxShadow: "inset -15px -15px 40px rgba(5, 11, 22, 0.9), inset 15px 15px 30px rgba(248, 250, 253, 0.8), 0 25px 50px rgba(9, 20, 39, 0.35)"
                     }}
                >
                  {/* Glass highlight reflections */}
                  <div className="absolute -top-10 -left-10 w-44 h-44 rounded-full bg-white/30 blur-md pointer-events-none" />

                  {/* Upward Luminous Arrow inside sphere */}
                  <div className="relative z-10 flex flex-col items-center">
                    <svg className="w-24 h-24 sm:w-28 sm:h-28 text-[#fdfbf7] filter drop-shadow-[0_8px_16px_rgba(217,119,6,0.8)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </div>
                </div>

                {/* Floating Satellite Glass Spheres */}
                <div className="absolute -bottom-2 -left-6 w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-lg border border-[#d97706]/60 animate-float-gentle"
                     style={{
                       background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(245,158,11,0.85) 45%, rgba(180,83,9,0.95) 100%)",
                       boxShadow: "0 10px 25px rgba(217, 119, 6, 0.35)"
                     }}
                />
                <div className="absolute top-4 -left-4 w-9 h-9 sm:w-11 sm:h-11 rounded-full shadow-md border border-blue-300/40 animate-pulse-glow"
                     style={{
                       background: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.9), rgba(30,64,175,0.8) 50%, rgba(9,20,39,0.95) 100%)",
                       boxShadow: "0 8px 20px rgba(9, 20, 39, 0.3)"
                     }}
                />
              </div>

              {/* Floating 3D Badge 3: DR 86+ Editorial Backlink (Bottom Left) */}
              <div className="absolute -bottom-2 left-2 z-30 bg-white/95 backdrop-blur-md border border-[#d97706]/40 p-3 rounded-2xl shadow-xl card-3d text-left">
                <span className="text-[10px] font-bold text-gray-500 uppercase block">Editorial Link Building</span>
                <span className="text-sm font-black text-[#091427]">DR 86+ High-DA Verified</span>
                <span className="text-[10px] text-emerald-600 font-bold block">✓ 100% Do-Follow Indexed</span>
              </div>

              {/* Floating 3D Badge 4: Client ROI (Bottom Right) */}
              <div className="absolute bottom-4 right-2 sm:right-6 z-30 bg-white/95 backdrop-blur-md border border-amber-200/80 p-3.5 sm:p-4 rounded-2xl shadow-xl flex items-center gap-3.5 hover:scale-105 transition-transform card-3d">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#d97706] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xl sm:text-2xl font-black text-[#0f172a] leading-none">
                    300%
                  </span>
                  <span className="text-[11px] font-medium text-[#64748b] mt-1 leading-tight">
                    Average Organic ROI <br /> for Overseas Clients
                  </span>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* 3. DIGITAL SOLUTIONS FOR REAL GROWTH (SERVICES SECTION) */}
        <section id="services" className="relative py-20 px-6 md:px-12 z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Column Description */}
              <div className="lg:col-span-4 flex flex-col items-start sticky top-28">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-[12.5px] font-semibold text-[#091427] mb-4">
                  <span className="w-2 h-2 rounded-full bg-[#d97706]" />
                  <span>Our Services</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-black text-[#0f172a] tracking-tight leading-tight mb-5">
                  Digital Solutions <br />
                  for <span className="text-gradient-navy-gold">Real Growth</span>
                </h2>

                <p className="text-[15px] text-[#475569] leading-relaxed mb-8">
                  From SEO to web development, we offer end-to-end digital marketing services to help your business reach new heights.
                </p>

                <Link
                  href="/services"
                  className="btn-3d inline-flex items-center gap-2 bg-[#091427] hover:bg-[#0f213d] text-white text-[14px] font-bold px-6 py-3 rounded-full transition-all hover:gap-3 cursor-pointer"
                >
                  <span>View All Services</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>

              {/* Right Column: 6 Cards in 2x3 Grid */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* 1. SEO Optimization */}
                <div 
                  onClick={() => {
                    setSelectedService("SEO Optimization");
                    setContactOpen(true);
                  }}
                  className="group bg-white p-6 rounded-2xl border border-gray-100 card-3d cursor-pointer relative flex flex-col justify-between min-h-[175px]"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-full bg-amber-50 text-[#d97706] flex items-center justify-center text-lg">
                      🔍
                    </div>
                    <span className="text-gray-400 group-hover:text-[#d97706] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">
                      ↗
                    </span>
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold text-[#0f172a] mb-1.5 group-hover:text-[#091427] transition-colors">
                      SEO Optimization
                    </h3>
                    <p className="text-[13.5px] text-[#64748b] leading-relaxed">
                      Rank higher, get found, drive organic traffic.
                    </p>
                  </div>
                </div>

                {/* 2. Website Development */}
                <div 
                  onClick={() => {
                    setSelectedService("Website Development");
                    setContactOpen(true);
                  }}
                  className="group bg-white p-6 rounded-2xl border border-gray-100 card-3d cursor-pointer relative flex flex-col justify-between min-h-[175px]"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-full bg-slate-900 text-[#d97706] border border-[#d97706]/30 flex items-center justify-center text-sm font-bold font-mono">
                      &lt;/&gt;
                    </div>
                    <span className="text-gray-400 group-hover:text-[#d97706] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">
                      ↗
                    </span>
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold text-[#0f172a] mb-1.5 group-hover:text-[#091427] transition-colors">
                      Website Development
                    </h3>
                    <p className="text-[13.5px] text-[#64748b] leading-relaxed">
                      Modern, fast &amp; responsive websites for your brand.
                    </p>
                  </div>
                </div>

                {/* 3. Content Writing */}
                <div 
                  onClick={() => {
                    setSelectedService("Content Writing");
                    setContactOpen(true);
                  }}
                  className="group bg-white p-6 rounded-2xl border border-gray-100 card-3d cursor-pointer relative flex flex-col justify-between min-h-[175px]"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-full bg-amber-50 text-[#d97706] border border-amber-200/50 flex items-center justify-center text-lg">
                      📄
                    </div>
                    <span className="text-gray-400 group-hover:text-[#d97706] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">
                      ↗
                    </span>
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold text-[#0f172a] mb-1.5 group-hover:text-[#091427] transition-colors">
                      Content Writing
                    </h3>
                    <p className="text-[13.5px] text-[#64748b] leading-relaxed">
                      Powerful content that connects and converts.
                    </p>
                  </div>
                </div>

                {/* 4. Email Marketing */}
                <div 
                  onClick={() => {
                    setSelectedService("Email Marketing");
                    setContactOpen(true);
                  }}
                  className="group bg-white p-6 rounded-2xl border border-gray-100 card-3d cursor-pointer relative flex flex-col justify-between min-h-[175px]"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-full bg-blue-50 text-[#1e40af] border border-blue-200/60 flex items-center justify-center text-lg">
                      ✉️
                    </div>
                    <span className="text-gray-400 group-hover:text-[#d97706] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">
                      ↗
                    </span>
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold text-[#0f172a] mb-1.5 group-hover:text-[#091427] transition-colors">
                      Email Marketing
                    </h3>
                    <p className="text-[13.5px] text-[#64748b] leading-relaxed">
                      Build relationships, boost customer loyalty.
                    </p>
                  </div>
                </div>

                {/* 5. Off Page Backlink Building */}
                <div 
                  onClick={() => {
                    setSelectedService("Off Page Backlink Building");
                    setContactOpen(true);
                  }}
                  className="group bg-white p-6 rounded-2xl border border-gray-100 card-3d cursor-pointer relative flex flex-col justify-between min-h-[175px]"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-full bg-amber-50 text-[#d97706] border border-amber-200/50 flex items-center justify-center text-lg">
                      🔗
                    </div>
                    <span className="text-gray-400 group-hover:text-[#d97706] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">
                      ↗
                    </span>
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold text-[#0f172a] mb-1.5 group-hover:text-[#091427] transition-colors">
                      Off Page Backlink Building
                    </h3>
                    <p className="text-[13.5px] text-[#64748b] leading-relaxed">
                      Stronger authority, better rankings.
                    </p>
                  </div>
                </div>

                {/* 6. Website Maintenance */}
                <div 
                  onClick={() => {
                    setSelectedService("Website Maintenance");
                    setContactOpen(true);
                  }}
                  className="group bg-white p-6 rounded-2xl border border-gray-100 card-3d cursor-pointer relative flex flex-col justify-between min-h-[175px]"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-full bg-slate-900 text-[#d97706] border border-[#d97706]/30 flex items-center justify-center text-lg">
                      ⚙️
                    </div>
                    <span className="text-gray-400 group-hover:text-[#d97706] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">
                      ↗
                    </span>
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold text-[#0f172a] mb-1.5 group-hover:text-[#091427] transition-colors">
                      Website Maintenance
                    </h3>
                    <p className="text-[13.5px] text-[#64748b] leading-relaxed">
                      Keep your site secure, updated &amp; running smoothly.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE INSTANT SEO AUDIT SECTION */}
        <section className="relative py-12 px-6 md:px-12 z-10 max-w-7xl mx-auto">
          <SeoAuditWidget />
        </section>

        {/* 4. ABOUT NOVA GROWTH / TRUSTED PARTNER */}
        <section id="about" className="relative py-20 px-6 md:px-12 z-10 bg-white/40 border-y border-amber-100/60">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Angled Laptop & Floating Analytics */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              
              {/* Handwritten Note Top */}
              <div className="absolute -top-6 left-12 z-20 hidden sm:flex flex-col items-center">
                <span className="handwriting text-2xl font-bold text-[#334155] -rotate-3">
                  Your Success
                </span>
                <span className="handwriting text-2xl font-bold text-[#334155] -rotate-3">
                  Our Mission
                </span>
                <svg className="w-6 h-6 text-[#64748b] rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>

              {/* Floating Metric 1 */}
              <div className="absolute top-8 left-2 sm:-left-2 z-20 bg-white/95 backdrop-blur-md border border-amber-200/60 px-3.5 py-2 rounded-xl shadow-lg flex items-center gap-2 animate-float-gentle">
                <span className="text-[#d97706] font-bold text-xs">↗ 15%</span>
                <span className="text-[11px] text-[#64748b] font-medium">Conversions</span>
              </div>

              {/* Floating Metric 2 */}
              <div className="absolute bottom-16 left-0 sm:left-4 z-20 bg-white/95 backdrop-blur-md border border-amber-200/60 px-3.5 py-2 rounded-xl shadow-lg flex items-center gap-2">
                <span className="text-[#d97706] font-bold text-xs">↗ 20%</span>
                <span className="text-[11px] text-[#64748b] font-medium">Click Through Rate</span>
              </div>

              {/* Laptop Body Mockup */}
              <div className="relative w-full max-w-[480px] bg-slate-900 rounded-t-2xl p-3 shadow-2xl border-4 border-slate-700/80">
                {/* Screen bezel & top camera dot */}
                <div className="w-2 h-2 rounded-full bg-slate-600 mx-auto mb-2" />
                
                {/* Screen Dashboard Preview */}
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#d97706]" />
                      <span className="text-xs font-bold text-slate-800">Organic Growth Report</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium">Live Analytics</span>
                  </div>

                  {/* Chart bars & lines visual */}
                  <div className="grid grid-cols-6 gap-2 items-end h-24 mb-3 px-2">
                    <div className="bg-amber-200 rounded-t h-[35%]" />
                    <div className="bg-amber-300 rounded-t h-[50%]" />
                    <div className="bg-amber-400 rounded-t h-[65%]" />
                    <div className="bg-amber-500 rounded-t h-[80%]" />
                    <div className="bg-[#d97706] rounded-t h-[95%]" />
                    <div className="bg-[#091427] rounded-t h-[100%]" />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-600 font-semibold pt-1 border-t border-slate-100">
                    <span>Target: +150%</span>
                    <span className="text-[#d97706] font-bold">Achieved: +300%</span>
                  </div>
                </div>

                {/* Laptop Base */}
                <div className="w-[110%] -ml-[5%] h-3 bg-slate-800 rounded-b-xl mt-1 shadow-md" />
              </div>

              {/* Floating Highlight Badge: +245% Organic Traffic */}
              <div className="absolute -bottom-4 right-4 sm:right-8 z-20 bg-white/95 backdrop-blur-md border border-amber-200/80 px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-amber-100 text-[#d97706] flex items-center justify-center font-bold text-xs">
                  📈
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-extrabold text-[#0f172a] leading-none">+245%</span>
                  <span className="text-[10.5px] font-medium text-[#64748b]">Organic Traffic</span>
                </div>
              </div>
            </div>

            {/* Right Column: About Content */}
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-[12.5px] font-semibold text-[#091427] mb-4">
                <span className="w-2 h-2 rounded-full bg-[#d97706]" />
                <span>About Nova Growth</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-[#0f172a] tracking-tight leading-tight mb-5">
                Your Trusted Partner <br />
                in <span className="text-gradient-navy-gold">Digital Success</span>
              </h2>

              <p className="text-[15.5px] text-[#475569] leading-relaxed mb-8">
                At Nova Growth, we combine creativity, technology and data to deliver results-driven digital marketing solutions. Our goal is simple — help your business grow, globally.
              </p>

              {/* 4 Feature Cards (2x2 Grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#d97706] flex items-center justify-center text-lg shrink-0">
                    👥
                  </div>
                  <div>
                    <span className="text-[14px] font-bold text-[#0f172a] block">Expert Team</span>
                    <span className="text-[12px] text-[#64748b]">Skilled &amp; Experienced</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#091427] flex items-center justify-center text-lg shrink-0">
                    📊
                  </div>
                  <div>
                    <span className="text-[14px] font-bold text-[#0f172a] block">Data Driven</span>
                    <span className="text-[12px] text-[#64748b]">Strategy &amp; Analysis</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#d97706] flex items-center justify-center text-lg shrink-0">
                    📋
                  </div>
                  <div>
                    <span className="text-[14px] font-bold text-[#0f172a] block">Transparent</span>
                    <span className="text-[12px] text-[#64748b]">Weekly Reporting</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-lg shrink-0">
                    🌐
                  </div>
                  <div>
                    <span className="text-[14px] font-bold text-[#0f172a] block">Global</span>
                    <span className="text-[12px] text-[#64748b]">Client Support 24/7</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* 5. STATS BAR: OUR IMPACT IN NUMBERS */}
        <section className="relative py-10 px-6 md:px-12 z-10">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-r from-[#091427] via-[#0f213d] to-[#1e293b] border border-[#d97706]/35 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8 text-white">
              
              {/* Badge text with hand-drawn arrow */}
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-lg md:text-xl font-extrabold text-white tracking-tight">
                  Our Impact in Numbers
                </span>
                <span className="handwriting text-2xl text-[#d97706]">⤹</span>
              </div>

              {/* 4 Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-12 w-full lg:w-auto text-center lg:text-left">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#d97706] tracking-tight">150+</div>
                  <div className="text-xs font-semibold text-slate-300 mt-0.5">Happy Clients</div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#d97706] tracking-tight">300+</div>
                  <div className="text-xs font-semibold text-slate-300 mt-0.5">Projects Completed</div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#d97706] tracking-tight">98%</div>
                  <div className="text-xs font-semibold text-slate-300 mt-0.5">Client Satisfaction</div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#d97706] tracking-tight">10+</div>
                  <div className="text-xs font-semibold text-slate-300 mt-0.5">Countries Served</div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 6. RECENT PROJECTS SECTION */}
        <section id="projects" className="relative py-20 px-6 md:px-12 z-10">
          <div className="max-w-7xl mx-auto">
            
            {/* Top row with heading & button */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-[12.5px] font-semibold text-[#091427] mb-4">
                  <span className="w-2 h-2 rounded-full bg-[#d97706]" />
                  <span>Our Work</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-[#0f172a] tracking-tight">
                  Recent Projects
                </h2>
                <p className="text-[15px] text-[#475569] mt-2">
                  We&apos;ve helped businesses across industries achieve real results with our digital solutions.
                </p>
              </div>

              <Link
                href="/projects"
                className="btn-3d inline-flex items-center gap-2 bg-[#091427] hover:bg-[#0f213d] text-white text-[13.5px] font-bold px-6 py-3 rounded-full transition-all self-start md:self-auto cursor-pointer"
              >
                <span>View All Projects</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>

            {/* 3 Interactive Project Showcase Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Project 1: Fashion Brand Website */}
              <div
                onClick={() => {
                  setActiveProjectModal({
                    title: "Luxe Fashion US - Headless E-Commerce & SEO",
                    category: "E-Commerce & International SEO",
                    metric: "+340% Organic Revenue",
                    client: "Luxe Fashion Apparel (Los Angeles, USA 🇺🇸)",
                    description: "Replatformed from slow monolithic WordPress to headless Next.js App Router with Shopify backend, cutting TTFB to 120ms and securing #1 rankings for high-intent apparel keywords.",
                    deliverables: [
                      "Headless Next.js storefront architecture",
                      "Sub-second Core Web Vitals (99/100 Mobile Speed)",
                      "Schema Product & Offer JSON-LD configuration",
                      "Automated currency & geo-targeted international routing"
                    ],
                    timeline: "10 Weeks Deployment",
                    impact: "$1.4M ARR incremental organic pipeline in 6 months."
                  });
                  showToast('👗 Opened Luxe Fashion US Case Study');
                }}
                className="group bg-white rounded-3xl border border-gray-100 p-4 card-3d overflow-hidden flex flex-col justify-between cursor-pointer"
              >
                <div className="relative bg-gradient-to-tr from-rose-50 to-amber-50 rounded-2xl h-56 flex items-center justify-center p-4 overflow-hidden mb-4 border border-rose-100/50">
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[11px] font-bold px-3 py-1 rounded-full text-[#0f172a] shadow-xs">
                    E-Commerce Website
                  </div>
                  <div className="w-40 h-44 bg-white rounded-xl shadow-md border border-gray-200 p-2 flex flex-col items-center justify-center text-center group-hover:scale-105 transition-transform">
                    <span className="text-3xl mb-1">👗</span>
                    <span className="text-xs font-bold text-slate-800">Luxe Fashion US</span>
                    <span className="text-[10px] text-[#d97706] font-semibold mt-1">+340% Sales</span>
                  </div>
                </div>

                <div className="flex items-center justify-between px-2 pt-1">
                  <div>
                    <h3 className="text-lg font-bold text-[#0f172a] group-hover:text-[#091427] transition-colors">
                      Fashion Brand Website
                    </h3>
                    <p className="text-[13px] text-[#64748b]">Web Development + SEO</p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-amber-50 text-[#d97706] flex items-center justify-center group-hover:bg-[#091427] group-hover:text-white transition-colors">
                    ↗
                  </div>
                </div>
              </div>

              {/* Project 2: Fitness App */}
              <div
                onClick={() => {
                  setActiveProjectModal({
                    title: "PulseFit Pro - High-Growth Mobile SaaS",
                    category: "Mobile App & SaaS CRO",
                    metric: "50,000+ Active Subscriptions",
                    client: "PulseFit Fitness Tech (London, UK 🇬🇧)",
                    description: "Built the conversion landing architecture and app store SEO (ASO) driving 50k+ app installs across Europe and the US with an organic CAC 60% lower than industry average.",
                    deliverables: [
                      "Full-funnel web-to-app onboarding journey",
                      "High-converting micro-interactions & Lottie animations",
                      "Interactive membership tier checkout simulator",
                      "Global multi-currency checkout & Apple Pay setup"
                    ],
                    timeline: "6 Weeks Build & Launch",
                    impact: "Featured in App Store top 10 fitness category."
                  });
                  showToast('⚡ Opened PulseFit Pro Case Study');
                }}
                className="group bg-white rounded-3xl border border-gray-100 p-4 card-3d overflow-hidden flex flex-col justify-between cursor-pointer"
              >
                <div className="relative bg-gradient-to-tr from-slate-900 via-[#0f213d] to-[#091427] rounded-2xl h-56 flex items-center justify-center p-4 overflow-hidden mb-4 border border-[#d97706]/30">
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[11px] font-bold px-3 py-1 rounded-full text-[#0f172a] shadow-xs">
                    Mobile App
                  </div>
                  <div className="w-28 h-44 bg-slate-950 rounded-2xl shadow-md border-2 border-[#d97706]/40 p-2 flex flex-col items-center justify-center text-center text-white group-hover:scale-105 transition-transform">
                    <span className="text-3xl mb-1">⚡</span>
                    <span className="text-xs font-bold text-[#f59e0b]">PulseFit Pro</span>
                    <span className="text-[9px] text-amber-200 font-medium mt-1">50K+ Downloads</span>
                  </div>
                </div>

                <div className="flex items-center justify-between px-2 pt-1">
                  <div>
                    <h3 className="text-lg font-bold text-[#0f172a] group-hover:text-[#091427] transition-colors">
                      Fitness App
                    </h3>
                    <p className="text-[13px] text-[#64748b]">UI/UX Design + Development</p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-slate-100 text-[#091427] flex items-center justify-center group-hover:bg-[#091427] group-hover:text-white transition-colors">
                    ↗
                  </div>
                </div>
              </div>

              {/* Project 3: Local Business Growth */}
              <div
                onClick={() => {
                  setActiveProjectModal({
                    title: "Apex Dental UK - Local London Map Pack Dominance",
                    category: "Local SEO & High-Ticket Inbound Leads",
                    metric: "#1 Rank across 18 London Boroughs",
                    client: "Apex Dental Group (London, UK 🇬🇧)",
                    description: "Engineered programmatic localized geo-landing pages and ethical high-DA digital PR citations, lifting private patient consultation calls by 280% in 90 days.",
                    deliverables: [
                      "Google Business Profile (GBP) multi-location optimization",
                      "25+ Tier-1 UK Medical & Local directory citations",
                      "Programmatic localized neighborhood routing",
                      "Automated review collection & reputation funnel"
                    ],
                    timeline: "Ongoing Retainer (Month 4)",
                    impact: "280% increase in high-ticket patient bookings."
                  });
                  showToast('🦷 Opened Apex Dental UK Case Study');
                }}
                className="group bg-white rounded-3xl border border-gray-100 p-4 card-3d overflow-hidden flex flex-col justify-between cursor-pointer"
              >
                <div className="relative bg-gradient-to-tr from-amber-50/80 to-slate-50 rounded-2xl h-56 flex items-center justify-center p-4 overflow-hidden mb-4 border border-amber-200/40">
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[11px] font-bold px-3 py-1 rounded-full text-[#0f172a] shadow-xs">
                    SEO
                  </div>
                  <div className="w-44 h-36 bg-white rounded-xl shadow-md border border-gray-200 p-3 flex flex-col justify-center text-left group-hover:scale-105 transition-transform">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-800">Apex Dental UK</span>
                      <span className="text-[#d97706] text-xs font-bold">#1 Google</span>
                    </div>
                    <span className="text-[10px] text-slate-500">Local Area Map Rankings</span>
                    <div className="w-full bg-amber-100 h-2 rounded-full mt-2 overflow-hidden">
                      <div className="bg-[#d97706] h-full w-[85%]" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between px-2 pt-1">
                  <div>
                    <h3 className="text-lg font-bold text-[#0f172a] group-hover:text-[#091427] transition-colors">
                      Local Business Growth
                    </h3>
                    <p className="text-[13px] text-[#64748b]">SEO + Content Marketing</p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-amber-50 text-[#d97706] flex items-center justify-center group-hover:bg-[#091427] group-hover:text-white transition-colors">
                    ↗
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* 7. HOW WE WORK (PROCESS SECTION) */}
        <section className="relative py-20 px-6 md:px-12 z-10 bg-white/50 border-t border-amber-100/60">
          <div className="max-w-7xl mx-auto">
            
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-[12.5px] font-semibold text-[#091427] mb-3">
                <span className="w-2 h-2 rounded-full bg-[#d97706]" />
                <span>Our Process</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0f172a] tracking-tight">
                How We Work
              </h2>
              <p className="text-[15px] text-[#475569] mt-2">
                A simple, transparent process to turn your goals into measurable results.
              </p>
            </div>

            {/* 4 Interactive Process Steps in Horizontal Flow */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative mb-8">
              
              {/* Step 1 */}
              <div
                onClick={() => {
                  setActiveProcessStep(0);
                  showToast('🔍 Step 1: Discover & Competitive Audit activated');
                }}
                className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  activeProcessStep === 0
                    ? 'bg-[#091427] text-white border-[#d97706] shadow-xl scale-[1.02]'
                    : 'bg-white hover:border-[#d97706]/50 text-gray-800 shadow-xs border-gray-100'
                }`}
              >
                <div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-4 ${
                    activeProcessStep === 0 ? 'bg-amber-400/20 text-[#f59e0b]' : 'bg-amber-50 text-[#d97706]'
                  }`}>
                    🔍
                  </div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[17px] font-bold ${activeProcessStep === 0 ? 'text-white' : 'text-[#0f172a]'}`}>01 Discover</span>
                    <span className="text-[#d97706] font-bold">→</span>
                  </div>
                  <p className={`text-[13px] leading-relaxed ${activeProcessStep === 0 ? 'text-slate-300' : 'text-[#64748b]'}`}>
                    Deep Technical audit &amp; international competitor gap mapping.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div
                onClick={() => {
                  setActiveProcessStep(1);
                  showToast('📋 Step 2: Strategize & Roadmap activated');
                }}
                className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  activeProcessStep === 1
                    ? 'bg-[#091427] text-white border-[#d97706] shadow-xl scale-[1.02]'
                    : 'bg-white hover:border-[#d97706]/50 text-gray-800 shadow-xs border-gray-100'
                }`}
              >
                <div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-4 ${
                    activeProcessStep === 1 ? 'bg-amber-400/20 text-[#f59e0b]' : 'bg-slate-100 text-[#091427]'
                  }`}>
                    📋
                  </div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[17px] font-bold ${activeProcessStep === 1 ? 'text-white' : 'text-[#0f172a]'}`}>02 Strategize</span>
                    <span className="text-[#d97706] font-bold">→</span>
                  </div>
                  <p className={`text-[13px] leading-relaxed ${activeProcessStep === 1 ? 'text-slate-300' : 'text-[#64748b]'}`}>
                    Creating a custom low-competition keyword &amp; UX roadmap.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div
                onClick={() => {
                  setActiveProcessStep(2);
                  showToast('💻 Step 3: Execute & Code Optimization activated');
                }}
                className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  activeProcessStep === 2
                    ? 'bg-[#091427] text-white border-[#d97706] shadow-xl scale-[1.02]'
                    : 'bg-white hover:border-[#d97706]/50 text-gray-800 shadow-xs border-gray-100'
                }`}
              >
                <div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-4 ${
                    activeProcessStep === 2 ? 'bg-amber-400/20 text-[#f59e0b]' : 'bg-amber-50 text-[#d97706]'
                  }`}>
                    💻
                  </div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[17px] font-bold ${activeProcessStep === 2 ? 'text-white' : 'text-[#0f172a]'}`}>03 Execute</span>
                    <span className="text-[#d97706] font-bold">→</span>
                  </div>
                  <p className={`text-[13px] leading-relaxed ${activeProcessStep === 2 ? 'text-slate-300' : 'text-[#64748b]'}`}>
                    Next.js speed rebuild, schema deployment &amp; editorial link building.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div
                onClick={() => {
                  setActiveProcessStep(3);
                  showToast('🎯 Step 4: Continuous Optimization activated');
                }}
                className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  activeProcessStep === 3
                    ? 'bg-[#091427] text-white border-[#d97706] shadow-xl scale-[1.02]'
                    : 'bg-white hover:border-[#d97706]/50 text-gray-800 shadow-xs border-gray-100'
                }`}
              >
                <div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-4 ${
                    activeProcessStep === 3 ? 'bg-amber-400/20 text-[#f59e0b]' : 'bg-slate-100 text-[#091427]'
                  }`}>
                    🎯
                  </div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[17px] font-bold ${activeProcessStep === 3 ? 'text-white' : 'text-[#0f172a]'}`}>04 Optimize</span>
                  </div>
                  <p className={`text-[13px] leading-relaxed ${activeProcessStep === 3 ? 'text-slate-300' : 'text-[#64748b]'}`}>
                    Bi-weekly ranking syncs, live Looker dashboards &amp; CRO testing.
                  </p>
                </div>
              </div>

            </div>

            {/* Interactive Step Detailed Workbench */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#d97706]/30 shadow-lg text-left animate-fadeIn">
              {activeProcessStep === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <span className="text-[11px] font-bold text-[#d97706] uppercase tracking-wider block mb-1">Phase Deliverables</span>
                    <h4 className="text-base font-bold text-[#091427] mb-2">Technical &amp; Competitor Diagnosis</h4>
                    <p className="text-xs text-[#54647c] leading-relaxed">
                      We crawl your entire website with enterprise tooling to spot crawl traps, canonical conflicts, schema errors, and slow assets.
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#d97706] uppercase tracking-wider block mb-1">Timeframe</span>
                    <h4 className="text-base font-bold text-[#091427] mb-2">Days 1 - 7 (Week 1)</h4>
                    <p className="text-xs text-[#54647c] leading-relaxed">
                      Comprehensive 15-page diagnostic report delivered via Notion + Loom video walkthrough for your leadership team.
                    </p>
                  </div>
                  <div className="bg-[#f8fafd] p-4 rounded-2xl border border-gray-200/80">
                    <span className="text-[11px] font-bold text-gray-700 block mb-2">Team Allocation:</span>
                    <ul className="text-xs space-y-1.5 text-[#54647c]">
                      <li>✓ Lead Technical SEO Architect</li>
                      <li>✓ Senior Next.js Frontend Engineer</li>
                      <li>✓ Slack Channel Standup Access</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeProcessStep === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <span className="text-[11px] font-bold text-[#d97706] uppercase tracking-wider block mb-1">Phase Deliverables</span>
                    <h4 className="text-base font-bold text-[#091427] mb-2">The 90-Day Organic Roadmap</h4>
                    <p className="text-xs text-[#54647c] leading-relaxed">
                      Commercial keyword clustering based on buyer intent in North America and Europe, plus UX conversion wireframing.
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#d97706] uppercase tracking-wider block mb-1">Timeframe</span>
                    <h4 className="text-base font-bold text-[#091427] mb-2">Days 8 - 14 (Week 2)</h4>
                    <p className="text-xs text-[#54647c] leading-relaxed">
                      Complete keyword matrix with search volumes, difficulty scores, and targeted page mapping approved by client.
                    </p>
                  </div>
                  <div className="bg-[#f8fafd] p-4 rounded-2xl border border-gray-200/80">
                    <span className="text-[11px] font-bold text-gray-700 block mb-2">Strategic Outputs:</span>
                    <ul className="text-xs space-y-1.5 text-[#54647c]">
                      <li>✓ Content Calendar (3 Months)</li>
                      <li>✓ Digital PR Target Publications</li>
                      <li>✓ High-Intent Geo-Landing Blueprints</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeProcessStep === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <span className="text-[11px] font-bold text-[#d97706] uppercase tracking-wider block mb-1">Phase Deliverables</span>
                    <h4 className="text-base font-bold text-[#091427] mb-2">Engineering &amp; Content Sprint</h4>
                    <p className="text-xs text-[#54647c] leading-relaxed">
                      Live code deployment on Next.js, image optimization, schema injection, and high-DA editorial guest placements.
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#d97706] uppercase tracking-wider block mb-1">Timeframe</span>
                    <h4 className="text-base font-bold text-[#091427] mb-2">Weeks 3 to 8</h4>
                    <p className="text-xs text-[#54647c] leading-relaxed">
                      Staging review links provided for approval before zero-downtime production deployment.
                    </p>
                  </div>
                  <div className="bg-[#f8fafd] p-4 rounded-2xl border border-gray-200/80">
                    <span className="text-[11px] font-bold text-gray-700 block mb-2">Quality Guarantees:</span>
                    <ul className="text-xs space-y-1.5 text-[#54647c]">
                      <li>✓ 95+ Google PageSpeed Score</li>
                      <li>✓ 100% White-Hat Editorial Links</li>
                      <li>✓ Strict Git Version Control</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeProcessStep === 3 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <span className="text-[11px] font-bold text-[#d97706] uppercase tracking-wider block mb-1">Phase Deliverables</span>
                    <h4 className="text-base font-bold text-[#091427] mb-2">Revenue Scaling &amp; Tracking</h4>
                    <p className="text-xs text-[#54647c] leading-relaxed">
                      Continuous SERP position tracking, conversion rate A/B tests, and algorithmic protection for Google search updates.
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#d97706] uppercase tracking-wider block mb-1">Timeframe</span>
                    <h4 className="text-base font-bold text-[#091427] mb-2">Month 3 Onward (Compounding)</h4>
                    <p className="text-xs text-[#54647c] leading-relaxed">
                      Real-time interactive Google Looker Studio dashboard accessible 24/7 with zero waiting for monthly reports.
                    </p>
                  </div>
                  <div className="bg-[#f8fafd] p-4 rounded-2xl border border-gray-200/80">
                    <span className="text-[11px] font-bold text-gray-700 block mb-2">Reporting Cadence:</span>
                    <ul className="text-xs space-y-1.5 text-[#54647c]">
                      <li>✓ Weekly Slack Metric Digest</li>
                      <li>✓ Bi-Weekly Zoom Growth Call</li>
                      <li>✓ 24/7 Live Data Studio Access</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

          </div>
        </section>

        {/* CLIENT TESTIMONIALS & REVIEWS SECTION */}
        <section className="relative py-20 px-6 md:px-12 z-10 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-xs font-semibold text-[#091427] mb-3">
              <span>⭐️ 4.9/5 Rating on Clutch &amp; Google Reviews</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0f172a] tracking-tight">
              Trusted by Ambitious Global Founders
            </h2>
            <p className="text-[15px] text-[#475569] mt-2">
              See how our high-intent SEO and Next.js development deliver real organic revenue across the US, UK, and Europe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Review 1 */}
            {(reviewFilter === 'all' || reviewFilter === 'usa') && (
              <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-xs card-hover flex flex-col justify-between animate-fadeIn">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex text-amber-400 text-sm">★★★★★</div>
                    <span className="text-[10px] font-bold bg-amber-50 text-amber-800 px-2.5 py-1 rounded-full border border-amber-200">
                      +340% Revenue
                    </span>
                  </div>
                  <p className="text-xs sm:text-[13px] text-[#475569] leading-relaxed mb-6 italic">
                    &ldquo;Nova Growth completely transformed our organic pipeline. In 4 months, our US search traffic grew by 340%, and organic revenue eclipsed our paid Facebook ad spend. Outstanding communication across EST hours.&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-[#091427] text-[#d97706] border border-[#d97706]/30 font-black text-xs flex items-center justify-center shrink-0">
                    DH
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0f172a]">David Henderson</h4>
                    <p className="text-[11px] text-[#64748b]">Founder &amp; CEO, Luxe Apparel (Los Angeles, USA 🇺🇸)</p>
                  </div>
                </div>
              </div>
            )}

            {/* Review 2 */}
            {(reviewFilter === 'all' || reviewFilter === 'uk') && (
              <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-xs card-hover flex flex-col justify-between animate-fadeIn">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex text-amber-400 text-sm">★★★★★</div>
                    <span className="text-[10px] font-bold bg-slate-100 text-[#091427] px-2.5 py-1 rounded-full border border-slate-200">
                      #1 Google Map Pack
                    </span>
                  </div>
                  <p className="text-xs sm:text-[13px] text-[#475569] leading-relaxed mb-6 italic">
                    &ldquo;Their local SEO strategy put us #1 across London for every high-value patient keyword. Inbound phone bookings jumped 280%. The weekly Slack updates and transparent Data Studio reporting are top notch.&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-[#091427] text-[#d97706] border border-[#d97706]/30 font-black text-xs flex items-center justify-center shrink-0">
                    OT
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0f172a]">Oliver Thorne</h4>
                    <p className="text-[11px] text-[#64748b]">Marketing Director, Apex Dental Group (London, UK 🇬🇧)</p>
                  </div>
                </div>
              </div>
            )}

            {/* Review 3 */}
            {(reviewFilter === 'all' || reviewFilter === 'usa') && (
              <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-xs card-hover flex flex-col justify-between animate-fadeIn">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex text-amber-400 text-sm">★★★★★</div>
                    <span className="text-[10px] font-bold bg-amber-50 text-amber-800 px-2.5 py-1 rounded-full border border-amber-200">
                      98 PageSpeed
                    </span>
                  </div>
                  <p className="text-xs sm:text-[13px] text-[#475569] leading-relaxed mb-6 italic">
                    &ldquo;The Next.js rebuild cut our load time from 4.2s down to 0.8s. All Google Core Web Vitals are green (100/100). They think like genuine growth partners, not just developers. Demo bookings surged 420%.&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-[#091427] text-[#d97706] border border-[#d97706]/30 font-black text-xs flex items-center justify-center shrink-0">
                    CM
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0f172a]">Chloe Martinez</h4>
                    <p className="text-[11px] text-[#64748b]">Co-Founder, CloudSync SaaS (Austin, USA 🇺🇸)</p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </section>

        {/* 8. BOTTOM CALL-TO-ACTION BANNER */}
        <section id="contact" className="relative py-16 px-6 md:px-12 z-10">
          <div className="max-w-7xl mx-auto">
            <div className="relative rounded-3xl p-8 md:p-12 overflow-hidden border border-[#d97706]/40 shadow-2xl"
                 style={{
                   background: "linear-gradient(135deg, #091427 0%, #0f213d 50%, #1e293b 100%)"
                 }}
            >
              
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left side text */}
                <div className="lg:col-span-5 text-left">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
                    Ready to Take Your Business to the Next Level?
                  </h2>
                </div>

                {/* Middle CTA & description */}
                <div className="lg:col-span-4 flex flex-col items-start gap-4">
                  <p className="text-[14px] text-slate-300 leading-relaxed">
                    Get a free consultation and discover how Nova Growth can help you achieve your digital marketing goals.
                  </p>
                  <button
                    onClick={() => setContactOpen(true)}
                    className="inline-flex items-center gap-2 bg-[#d97706] hover:bg-[#b45309] text-white text-[14px] font-bold px-7 py-3.5 rounded-full shadow-xl shadow-[#d97706]/30 transition-all hover:gap-3 cursor-pointer"
                  >
                    <span>Book a Free Consultation</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>

                {/* Right side handwritten note & 3D orb */}
                <div className="lg:col-span-3 flex items-center justify-center lg:justify-end gap-3">
                  <div className="flex flex-col items-end">
                    <span className="handwriting text-2xl font-bold text-[#d97706] -rotate-6">
                      Your Growth
                    </span>
                    <span className="handwriting text-2xl font-bold text-[#d97706] -rotate-6">
                      Starts Here
                    </span>
                    <svg className="w-8 h-8 text-[#d97706] -rotate-12" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M10 10 C 25 15, 35 30, 30 42 M 30 42 L 24 35 M 30 42 L 36 38" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>

                  {/* Iridescent glass orb accent */}
                  <div className="w-20 h-20 rounded-full shadow-xl border border-white/80 animate-float-slow shrink-0"
                       style={{
                         background: "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.95), rgba(251,191,36,0.7) 45%, rgba(30,64,175,0.65) 85%, rgba(9,20,39,0.9) 100%)",
                         boxShadow: "0 15px 30px rgba(217,119,6,0.25)"
                       }}
                  />
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* 9. FOOTER */}
        <Footer />

        {/* INTERACTIVE CASE STUDY DEEP DIVE MODAL */}
        {activeProjectModal && (
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) setActiveProjectModal(null);
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn overflow-y-auto"
          >
            <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-gray-100 relative text-left max-h-[85vh] overflow-y-auto my-auto">
              {/* Sticky Header with Prominent Close Button */}
              <div className="sticky -top-6 -mt-2 -mx-2 px-2 pt-2 pb-3 bg-white/95 backdrop-blur-md border-b border-gray-100 flex items-center justify-between mb-4 z-20">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-[#091427] text-xs font-semibold border border-amber-200/80">
                  <span className="text-[#d97706]">🏆</span>
                  <span>{activeProjectModal.category}</span>
                </div>
                <button
                  onClick={() => setActiveProjectModal(null)}
                  aria-label="Close modal"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-700 text-xs font-bold transition-all cursor-pointer border border-gray-200"
                >
                  <span className="text-sm">✕</span>
                  <span>Close</span>
                </button>
              </div>

              <h3 className="text-2xl font-black text-[#0f172a] tracking-tight leading-tight mb-1">
                {activeProjectModal.title}
              </h3>
              <p className="text-xs text-[#d97706] font-bold mb-4">{activeProjectModal.client}</p>

              <div className="bg-[#f8fafd] p-4 rounded-2xl border border-gray-200/80 mb-5">
                <div className="text-[11px] font-semibold text-gray-500 uppercase">Primary Milestone Result:</div>
                <div className="text-xl font-black text-[#091427] mt-0.5">{activeProjectModal.metric}</div>
                <div className="text-xs text-[#54647c] mt-1">{activeProjectModal.impact}</div>
              </div>

              <div className="space-y-4 text-xs text-[#54647c] mb-6">
                <div>
                  <h4 className="font-bold text-[#091427] mb-1">Challenge &amp; Architecture:</h4>
                  <p className="leading-relaxed">{activeProjectModal.description}</p>
                </div>

                <div>
                  <h4 className="font-bold text-[#091427] mb-1.5">Executed Deliverables:</h4>
                  <ul className="space-y-1.5">
                    {activeProjectModal.deliverables.map((d, dIdx) => (
                      <li key={dIdx} className="flex items-center gap-2 text-[#0f172a] font-medium">
                        <span className="text-[#d97706] font-bold">✓</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                <button
                  onClick={() => {
                    setSelectedService(activeProjectModal.category);
                    setActiveProjectModal(null);
                    setContactOpen(true);
                  }}
                  className="flex-1 bg-[#091427] hover:bg-[#0f213d] text-white font-bold py-3.5 px-6 rounded-2xl text-xs transition-all shadow-md shadow-[#091427]/25 text-center cursor-pointer"
                >
                  Request Similar Strategy for Your Site →
                </button>
                <button
                  onClick={() => setActiveProjectModal(null)}
                  className="px-5 py-3.5 rounded-2xl text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  ✕ Close Window
                </button>
              </div>
            </div>
          </div>
        )}

        {/* INTERACTIVE LEAD / CONSULTATION MODAL */}
        {contactOpen && (
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) setContactOpen(false);
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn overflow-y-auto"
          >
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100 relative max-h-[85vh] overflow-y-auto my-auto">
              
              {/* Sticky Top Header with Clear Close Button */}
              <div className="sticky -top-6 -mt-2 -mx-2 px-2 pt-2 pb-3 bg-white/95 backdrop-blur-md border-b border-gray-100 flex items-center justify-between mb-4 z-20">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-[#091427] border border-amber-200/80 text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d97706] animate-ping" />
                  <span>Global Client Inquiry</span>
                </div>
                <button
                  onClick={() => setContactOpen(false)}
                  aria-label="Close modal"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-700 text-xs font-bold transition-all cursor-pointer border border-gray-200 shadow-xs"
                >
                  <span className="text-sm">✕</span>
                  <span>Close</span>
                </button>
              </div>

              <h3 className="text-2xl font-black text-[#0f172a] tracking-tight">
                Get Your Free Growth Strategy
              </h3>
              <p className="text-xs sm:text-sm text-[#64748b] mt-1 mb-5">
                Tell us about your business goals. We review client inquiries and reply within 12 hours.
              </p>

              {formStatus === "success" ? (
                <div className="bg-amber-50 border border-amber-200 text-[#091427] p-6 rounded-2xl text-center">
                  <div className="text-4xl mb-2">🎉</div>
                  <h4 className="text-lg font-bold">Thank you! Request Received</h4>
                  <p className="text-xs text-[#54647c] mt-1 mb-4">Our strategist will review your website and reach out via email shortly.</p>
                  <button
                    onClick={() => {
                      setContactOpen(false);
                      setFormStatus("idle");
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#091427] text-white text-xs font-bold hover:bg-[#0f213d] transition-colors"
                  >
                    Done &amp; Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 text-left">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Your Name</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. John Miller"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#d97706] focus:ring-1 focus:ring-[#d97706] outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Business Email (Overseas / Company Email)</label>
                    <input
                      required
                      type="email"
                      placeholder="name@company.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#d97706] focus:ring-1 focus:ring-[#d97706] outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Website URL or Niche</label>
                    <input
                      type="text"
                      placeholder="https://yourwebsite.com or Startup niche"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#d97706] focus:ring-1 focus:ring-[#d97706] outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Target Service</label>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#d97706] focus:ring-1 focus:ring-[#d97706] outline-none bg-white"
                    >
                      <option value="All Services">All Services / Full Growth Plan</option>
                      <option value="SEO Optimization">SEO Optimization (High Intent)</option>
                      <option value="Website Development">Website Development (Next.js / Shopify)</option>
                      <option value="Content Writing">Content Writing &amp; Strategy</option>
                      <option value="Email Marketing">Email Marketing &amp; Automation</option>
                      <option value="Off Page Backlink Building">Off Page Backlink Building</option>
                      <option value="Website Maintenance">Website Maintenance &amp; Speed Fix</option>
                    </select>
                  </div>

                  <div className="pt-2 flex flex-col gap-2">
                    <button
                      type="submit"
                      disabled={formStatus === "submitting"}
                      className="w-full bg-[#091427] hover:bg-[#0f213d] text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-md shadow-[#091427]/20 cursor-pointer"
                    >
                      {formStatus === "submitting" ? "Sending Request..." : "Book Free Strategy Call →"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setContactOpen(false)}
                      className="w-full py-2.5 text-center text-xs font-bold text-gray-500 hover:text-gray-800 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer"
                    >
                      ✕ Cancel / Keep Browsing
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>
        )}

      </div>
    </>
  );
}
