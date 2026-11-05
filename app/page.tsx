"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SeoAuditWidget from "./components/SeoAuditWidget";
import HeaderBackgroundAnimation from "./components/HeaderBackgroundAnimation";
import PromptHero from "./components/PromptHero";
import EloServiceSection from "./components/EloServiceSection";
import MotionCta3DOrb from "./components/MotionCta3DOrb";
import GlowRatingBento from "./components/GlowRatingBento";
import HowWeWork3D from "./components/HowWeWork3D";
import ScheduleConsultationModal from "./components/ScheduleConsultationModal";

export default function Home() {
  const [contactOpen, setContactOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("All Services / Full Growth Plan");
  const [toast, setToast] = useState<string | null>(null);
  const [activeBadge, setActiveBadge] = useState<string | null>(null);
  const [activeProcessStep, setActiveProcessStep] = useState<number>(0);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };



  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": "https://balajiprimemedia.in/#organization",
        "name": "Balaji Prime Media - Global Digital Marketing & SEO Agency",
        "url": "https://balajiprimemedia.in",
        "logo": "https://balajiprimemedia.in/logo.png",
        "image": "https://balajiprimemedia.in/og-image.jpg",
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
            "name": "How quickly can my website rank on Google with Balaji Prime Media?",
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
        {/* Soft Organic Iridescent Background Shapes (Animated via globals.css) */}
        <div className="curved-ribbon-left" aria-hidden="true" />
        <div className="curved-ribbon-right" aria-hidden="true" />
        <div className="curved-ribbon-mid-left" aria-hidden="true" />
        <div className="curved-ribbon-bottom" aria-hidden="true" />

        {/* 1. PROMPT FULL-SCREEN DARK HERO WITH BACKGROUND VIDEO, HEADLINE, SUBTITLE, CTA & MARQUEE */}
        <PromptHero onOpenConsultation={() => setContactOpen(true)} />

        {/* 3. MEASURABLE RESULTS & SERVICES SECTION (ELO ONE AESTHETIC TALL SUNSET CARDS) */}
        <EloServiceSection
          onSelectService={(serviceName) => {
            setSelectedService(serviceName);
            setContactOpen(true);
          }}
        />

        {/* INTERACTIVE INSTANT SEO AUDIT SECTION */}
        <section className="relative py-8 sm:py-12 px-4 sm:px-6 md:px-12 z-10 max-w-7xl mx-auto">
          <SeoAuditWidget />
        </section>

        {/* 4. ABOUT BALAJI PRIME MEDIA / TRUSTED PARTNER */}
        <section id="about" className="relative py-10 sm:py-14 px-4 sm:px-6 md:px-12 z-10 bg-white/40 border-y border-amber-100/60">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Left Column: Angled Laptop & Floating Analytics */}
            <div className="lg:col-span-6 relative flex items-center justify-center my-4 sm:my-0">
              
              {/* Handwritten Note Top */}
              <div className="absolute -top-7 left-2 sm:left-12 z-20 flex flex-col items-center">
                <span className="handwriting text-xl sm:text-2xl font-bold text-[#334155] -rotate-3">
                  Your Success
                </span>
                <span className="handwriting text-xl sm:text-2xl font-bold text-[#334155] -rotate-3">
                  Our Mission
                </span>
                <svg className="w-6 h-6 text-[#64748b] rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>

              {/* Floating Metric 1 */}
              <div className="absolute top-6 left-1 sm:top-8 sm:-left-2 z-20 bg-white/95 backdrop-blur-md border border-amber-200/60 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl shadow-lg flex items-center gap-1.5 sm:gap-2 animate-float-gentle text-xs">
                <span className="text-[#d97706] font-bold text-[11px] sm:text-xs">↗ 15%</span>
                <span className="text-[10px] sm:text-[11px] text-[#64748b] font-medium">Conversions</span>
              </div>

              {/* Floating Metric 2 */}
              <div className="absolute bottom-12 left-1 sm:bottom-16 sm:left-4 z-20 bg-white/95 backdrop-blur-md border border-amber-200/60 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl shadow-lg flex items-center gap-1.5 sm:gap-2 text-xs">
                <span className="text-[#d97706] font-bold text-[11px] sm:text-xs">↗ 20%</span>
                <span className="text-[10px] sm:text-[11px] text-[#64748b] font-medium">Click Through Rate</span>
              </div>

              {/* Laptop Body Mockup */}
              <div className="relative w-full max-w-[480px] bg-slate-900 rounded-t-2xl p-2.5 sm:p-3 shadow-2xl border-4 border-slate-700/80">
                {/* Screen bezel & top camera dot */}
                <div className="w-2 h-2 rounded-full bg-slate-600 mx-auto mb-2" />
                
                {/* Screen Dashboard Preview */}
                <div className="bg-slate-50 rounded-lg p-3 sm:p-4 border border-slate-200">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#d97706]" />
                      <span className="text-xs font-bold text-slate-800">Organic Growth Report</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium">Live Analytics</span>
                  </div>

                  {/* Chart bars & lines visual */}
                  <div className="grid grid-cols-6 gap-2 items-end h-20 sm:h-24 mb-3 px-2">
                    <div className="bg-amber-200 rounded-t h-[35%]" />
                    <div className="bg-amber-300 rounded-t h-[50%]" />
                    <div className="bg-amber-400 rounded-t h-[65%]" />
                    <div className="bg-amber-500 rounded-t h-[80%]" />
                    <div className="bg-[#d97706] rounded-t h-[95%]" />
                    <div className="bg-[#091427] rounded-t h-[100%]" />
                  </div>

                  <div className="flex items-center justify-between text-[10.5px] sm:text-[11px] text-slate-600 font-semibold pt-1 border-t border-slate-100">
                    <span>Target: +150%</span>
                    <span className="text-[#d97706] font-bold">Achieved: +300%</span>
                  </div>
                </div>

                {/* Laptop Base */}
                <div className="w-full sm:w-[104%] sm:-ml-[2%] h-3 bg-slate-800 rounded-b-xl mt-1 shadow-md" />
              </div>

              {/* Floating Highlight Badge: +245% Organic Traffic */}
              <div className="absolute -bottom-3 right-2 sm:-bottom-4 sm:right-8 z-20 bg-white/95 backdrop-blur-md border border-amber-200/80 px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl shadow-xl flex items-center gap-2 sm:gap-2.5">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-amber-100 text-[#d97706] flex items-center justify-center font-bold text-xs shrink-0">
                  📈
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs sm:text-sm font-extrabold text-[#0f172a] leading-none">+245%</span>
                  <span className="text-[9.5px] sm:text-[10.5px] font-medium text-[#64748b]">Organic Traffic</span>
                </div>
              </div>
            </div>

            {/* Right Column: About Content */}
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-[12.5px] font-semibold text-[#091427] mb-4">
                <span className="w-2 h-2 rounded-full bg-[#d97706]" />
                <span>About Balaji Prime Media</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-[#0f172a] tracking-tight leading-tight mb-5">
                Your Trusted Partner <br />
                in <span className="text-gradient-navy-gold">Digital Growth</span>
              </h2>

              <p className="text-[15.5px] text-[#475569] leading-relaxed mb-8">
                At Balaji Prime Media, we combine search intelligence, white-hat editorial outreach, and modern web engineering to deliver sustainable organic growth for overseas businesses.
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
        <section className="relative py-8 sm:py-10 px-4 sm:px-6 md:px-12 z-10">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-r from-[#091427] via-[#0f213d] to-[#1e293b] border border-[#d97706]/35 rounded-3xl p-5 sm:p-8 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 text-white">
              
              {/* Badge text with hand-drawn arrow */}
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-lg md:text-xl font-extrabold text-white tracking-tight">
                  Our Impact in Numbers
                </span>
                <span className="handwriting text-2xl text-[#d97706]">⤹</span>
              </div>

              {/* 4 Performance Standards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-12 w-full lg:w-auto text-center lg:text-left">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#d97706] tracking-tight">850+</div>
                  <div className="text-xs font-semibold text-slate-300 mt-0.5">Vetted DR 50–90+ Sites</div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#d97706] tracking-tight">100%</div>
                  <div className="text-xs font-semibold text-slate-300 mt-0.5">Manual White-Hat Outreach</div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#d97706] tracking-tight">7-14d</div>
                  <div className="text-xs font-semibold text-slate-300 mt-0.5">Guaranteed Placement TAT</div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#d97706] tracking-tight">95+</div>
                  <div className="text-xs font-semibold text-slate-300 mt-0.5">Target Core Web Vitals</div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 6. RECENT PROJECTS SECTION */}
        <section id="projects" className="relative py-10 sm:py-14 px-4 sm:px-6 md:px-12 z-10">
          <div className="max-w-7xl mx-auto">
            
            {/* Top row with heading & button */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-4">
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
              <Link
                href="/projects/fashion-brand"
                className="group bg-white rounded-3xl border border-gray-100 p-4 card-3d overflow-hidden flex flex-col justify-between cursor-pointer transition-all hover:border-[#d97706]/50"
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
              </Link>

              {/* Project 2: Fitness App */}
              <Link
                href="/projects/fitness-app"
                className="group bg-white rounded-3xl border border-gray-100 p-4 card-3d overflow-hidden flex flex-col justify-between cursor-pointer transition-all hover:border-[#d97706]/50"
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
              </Link>

              {/* Project 3: Local Business Growth */}
              <Link
                href="/projects/local-growth"
                className="group bg-white rounded-3xl border border-gray-100 p-4 card-3d overflow-hidden flex flex-col justify-between cursor-pointer transition-all hover:border-[#d97706]/50"
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
              </Link>

            </div>

          </div>
        </section>

        {/* 7. HOW WE WORK (3D CODE TRANSFORMATION PORTAL SECTION) */}
        <HowWeWork3D />

        {/* CLIENT TESTIMONIALS & REVIEWS SECTION: MOTIONSITES GLOW FEATURES BENTO GRID */}
        <GlowRatingBento
          onOpenConsultation={(service) => {
            setSelectedService(service || "SEO Optimization");
            setContactOpen(true);
          }}
        />

        {/* 8. BOTTOM CALL-TO-ACTION BANNER (3D MOTIONSITE UPGRADE) */}
        <section id="contact" className="relative py-14 sm:py-20 px-4 sm:px-6 md:px-12 z-10">
          <div className="max-w-7xl mx-auto">
            <div
              className="relative rounded-3xl p-7 sm:p-10 md:p-14 overflow-hidden border border-purple-500/25 shadow-2xl backdrop-blur-xl"
              style={{
                background: "linear-gradient(135deg, #07060D 0%, #110B22 50%, #170F2E 100%)",
                boxShadow:
                  "0 30px 70px -15px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(255, 255, 255, 0.15), 0 0 50px rgba(168, 85, 247, 0.15)",
              }}
            >
              {/* Volumetric ambient background glow */}
              <div
                aria-hidden="true"
                className="absolute top-0 right-0 w-[500px] h-[350px] bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.22)_0%,transparent_70%)] pointer-events-none"
              />
              <div
                aria-hidden="true"
                className="absolute bottom-0 left-1/4 w-[400px] h-[250px] bg-[radial-gradient(circle,rgba(99,102,241,0.18)_0%,transparent_75%)] pointer-events-none"
              />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                
                {/* Left side text (Preserved 100% Exactly) */}
                <div className="lg:col-span-5 text-left">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-black text-white tracking-tight leading-[1.15]">
                    Ready to Take Your Business to the Next Level?
                  </h2>
                </div>

                {/* Middle CTA & description (Preserved 100% Exactly) */}
                <div className="lg:col-span-4 flex flex-col items-start gap-4">
                  <p className="text-[14.5px] text-slate-300 leading-relaxed font-normal">
                    Get a free consultation and discover how Balaji Prime Media can help you achieve your digital marketing goals.
                  </p>
                  <button
                    onClick={() => setContactOpen(true)}
                    className="group relative inline-flex items-center gap-2.5 text-white text-[14.5px] font-bold px-8 py-4 rounded-full shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-all hover:scale-105 cursor-pointer overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(135deg, #f59e0b 0%, #d97706 60%, #b45309 100%)",
                      boxShadow:
                        "0 12px 28px -4px rgba(217, 119, 6, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.35)",
                    }}
                  >
                    <span>Book a Free Consultation</span>
                    <svg
                      className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                </div>

                {/* Right side: Handwritten note & Interactive 3D Motion Orb */}
                <div className="lg:col-span-3 flex items-center justify-center lg:justify-end gap-3 sm:gap-4">
                  <div className="flex flex-col items-end shrink-0">
                    <span className="handwriting text-2xl sm:text-[26px] font-bold text-[#fcd34d] -rotate-6 filter drop-shadow-[0_2px_8px_rgba(252,211,77,0.35)]">
                      Your Growth
                    </span>
                    <span className="handwriting text-2xl sm:text-[26px] font-bold text-[#fcd34d] -rotate-6 filter drop-shadow-[0_2px_8px_rgba(252,211,77,0.35)]">
                      Starts Here
                    </span>
                    <svg
                      className="w-8 h-8 text-[#fcd34d] -rotate-12 filter drop-shadow-[0_2px_6px_rgba(252,211,77,0.3)]"
                      viewBox="0 0 50 50"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path
                        d="M10 10 C 25 15, 35 30, 30 42 M 30 42 L 24 35 M 30 42 L 36 38"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  {/* Interactive 3D Motion Gyroscope Orb */}
                  <MotionCta3DOrb />
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* 9. FOOTER */}
        <Footer />

        {/* INTERACTIVE SCHEDULE CONSULTATION MODAL WITH CALENDAR & GLASS FORM */}
        <ScheduleConsultationModal
          isOpen={contactOpen}
          onClose={() => setContactOpen(false)}
          initialService={selectedService}
        />

      </div>
    </>
  );
}
