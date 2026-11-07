"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SeoAuditWidget from "./components/SeoAuditWidget";
import HeaderBackgroundAnimation from "./components/HeaderBackgroundAnimation";
import PromptHero from "./components/PromptHero";
import EloServiceSection from "./components/EloServiceSection";
import MotionCta3DOrb from "./components/MotionCta3DOrb";
import GlowRatingBento from "./components/GlowRatingBento";
import ClientGrowthAtlas from "./components/ClientGrowthAtlas";
import AboutFoundersSection from "./components/AboutFoundersSection";
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

  // Clean #contact hash if present so the home page URL stays clean: balajiprimemedia.in
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#contact") {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, []);



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

      <div className="relative min-h-screen bg-[#060216] text-white overflow-hidden selection:bg-[#A068FF] selection:text-white font-inter">
        {/* Subtle glowing violet dot matrix grid matching the footer */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(160,104,255,0.08)_1px,transparent_1px)] [background-size:24px_24px] opacity-70 pointer-events-none" />

        {/* Ambient luxury violet aurora glows */}
        <div
          aria-hidden="true"
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(160,104,255,0.12)_0%,transparent_70%)] pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute top-2/3 right-0 w-[600px] h-[400px] bg-[radial-gradient(circle,rgba(99,102,241,0.12)_0%,transparent_70%)] pointer-events-none"
        />

        {/* Floating Interactive Toast Notification */}
        {toast && (
          <div className="fixed top-24 right-6 z-50 bg-[#0c0624] text-white border border-purple-500/50 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-fadeIn text-xs font-semibold backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#A068FF] animate-ping" />
            <span>{toast}</span>
            <button onClick={() => setToast(null)} className="ml-2 text-gray-400 hover:text-white text-xs cursor-pointer">✕</button>
          </div>
        )}

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

        {/* 4. ABOUT FOUNDERS / BALAJI PRIME MEDIA LEADERSHIP */}
        <AboutFoundersSection />

        {/* 6. RECENT PROJECTS SECTION (Luxury Obsidian & Violet Aesthetic) */}
        <section id="projects" className="relative py-16 sm:py-24 px-4 sm:px-6 md:px-12 z-10 border-t border-purple-500/20">
          <div className="max-w-7xl mx-auto">
            
            {/* Top row with heading & button */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-[12px] font-semibold text-purple-300 mb-4 backdrop-blur-md shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#A068FF] animate-pulse" />
                  <span>Our Featured Work</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                  Recent Projects
                </h2>
                <p className="text-[15px] sm:text-base text-slate-300 mt-2.5 leading-relaxed">
                  We&apos;ve helped businesses across the US, UK, and worldwide achieve undeniable results with high-intent SEO and Next.js engineering.
                </p>
              </div>

              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-white text-[13.5px] font-bold px-6 py-3 rounded-full transition-all self-start md:self-auto cursor-pointer shadow-[0_0_20px_rgba(160,104,255,0.4)] hover:shadow-[0_0_30px_rgba(160,104,255,0.7)] hover:scale-105 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #A068FF 0%, #7928CA 60%, #4F46E5 100%)",
                }}
              >
                <span>View All Projects</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>

            {/* 3 Interactive Project Showcase Cards in Dark Obsidian Luxury */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              
              {/* Project 1: Fashion Brand Website */}
              <Link
                href="/projects/fashion-brand"
                className="group bg-gradient-to-b from-[#0f092e]/90 to-[#08041c]/90 rounded-3xl border border-purple-500/25 p-5 overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-300 hover:border-purple-500/60 hover:shadow-[0_20px_50px_rgba(160,104,255,0.25)] hover:-translate-y-1.5 backdrop-blur-xl"
              >
                <div>
                  <div className="relative rounded-2xl h-60 overflow-hidden mb-5 border border-purple-500/20 group-hover:border-purple-500/50 transition-colors">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=85"
                      alt="Luxe Fashion US"
                      className="absolute inset-0 w-full h-full object-cover brightness-[0.72] contrast-105 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08041c] via-[#08041c]/40 to-transparent" />
                    
                    <div className="absolute top-3.5 left-3.5 bg-black/70 backdrop-blur-md text-[11px] font-bold px-3 py-1 rounded-full text-purple-200 border border-purple-500/30 shadow-xs">
                      E-Commerce Website
                    </div>
                    <div className="absolute top-3.5 right-3.5 bg-black/60 backdrop-blur-md text-[11px] font-semibold px-2.5 py-1 rounded-full text-gray-200 border border-white/10">
                      🇺🇸 Los Angeles
                    </div>

                    <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-end justify-between">
                      <div className="bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-purple-500/30">
                        <span className="text-[10px] text-gray-400 font-medium block">Verified Outcome</span>
                        <span className="text-sm font-black text-emerald-400">+340% Sales Growth</span>
                      </div>
                    </div>
                  </div>

                  <div className="px-1">
                    <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                      Luxe Fashion US
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      Headless Next.js storefront &amp; collection page SEO delivering $1.4M incremental revenue.
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between px-1">
                  <div className="flex gap-1.5">
                    <span className="text-[10px] font-medium bg-white/5 text-gray-300 px-2 py-0.5 rounded-md">Next.js</span>
                    <span className="text-[10px] font-medium bg-white/5 text-gray-300 px-2 py-0.5 rounded-md">Shopify</span>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-purple-950/70 text-purple-300 border border-purple-500/30 flex items-center justify-center group-hover:bg-[#A068FF] group-hover:text-white transition-all shadow-xs">
                    ↗
                  </div>
                </div>
              </Link>

              {/* Project 2: Fitness App */}
              <Link
                href="/projects/fitness-app"
                className="group bg-gradient-to-b from-[#0f092e]/90 to-[#08041c]/90 rounded-3xl border border-purple-500/25 p-5 overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-300 hover:border-purple-500/60 hover:shadow-[0_20px_50px_rgba(160,104,255,0.25)] hover:-translate-y-1.5 backdrop-blur-xl"
              >
                <div>
                  <div className="relative rounded-2xl h-60 overflow-hidden mb-5 border border-purple-500/20 group-hover:border-purple-500/50 transition-colors">
                    <img
                      src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=85"
                      alt="PulseFit Pro"
                      className="absolute inset-0 w-full h-full object-cover brightness-[0.72] contrast-105 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08041c] via-[#08041c]/40 to-transparent" />
                    
                    <div className="absolute top-3.5 left-3.5 bg-black/70 backdrop-blur-md text-[11px] font-bold px-3 py-1 rounded-full text-purple-200 border border-purple-500/30 shadow-xs">
                      Mobile &amp; Web Platform
                    </div>
                    <div className="absolute top-3.5 right-3.5 bg-black/60 backdrop-blur-md text-[11px] font-semibold px-2.5 py-1 rounded-full text-gray-200 border border-white/10">
                      🇺🇸 Austin, TX
                    </div>

                    <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-end justify-between">
                      <div className="bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-purple-500/30">
                        <span className="text-[10px] text-gray-400 font-medium block">App Store Ranking</span>
                        <span className="text-sm font-black text-amber-400">50K+ Active Users</span>
                      </div>
                    </div>
                  </div>

                  <div className="px-1">
                    <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                      PulseFit Pro
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      Sub-90s onboarding funnel with 60fps micro-interactions and Stripe subscription billing.
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between px-1">
                  <div className="flex gap-1.5">
                    <span className="text-[10px] font-medium bg-white/5 text-gray-300 px-2 py-0.5 rounded-md">React Native</span>
                    <span className="text-[10px] font-medium bg-white/5 text-gray-300 px-2 py-0.5 rounded-md">Stripe</span>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-purple-950/70 text-purple-300 border border-purple-500/30 flex items-center justify-center group-hover:bg-[#A068FF] group-hover:text-white transition-all shadow-xs">
                    ↗
                  </div>
                </div>
              </Link>

              {/* Project 3: Local Business Growth */}
              <Link
                href="/projects/local-growth"
                className="group bg-gradient-to-b from-[#0f092e]/90 to-[#08041c]/90 rounded-3xl border border-purple-500/25 p-5 overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-300 hover:border-purple-500/60 hover:shadow-[0_20px_50px_rgba(160,104,255,0.25)] hover:-translate-y-1.5 backdrop-blur-xl"
              >
                <div>
                  <div className="relative rounded-2xl h-60 overflow-hidden mb-5 border border-purple-500/20 group-hover:border-purple-500/50 transition-colors">
                    <img
                      src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=85"
                      alt="Apex Dental UK"
                      className="absolute inset-0 w-full h-full object-cover brightness-[0.72] contrast-105 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08041c] via-[#08041c]/40 to-transparent" />
                    
                    <div className="absolute top-3.5 left-3.5 bg-black/70 backdrop-blur-md text-[11px] font-bold px-3 py-1 rounded-full text-purple-200 border border-purple-500/30 shadow-xs">
                      Enterprise SEO &amp; Maps
                    </div>
                    <div className="absolute top-3.5 right-3.5 bg-black/60 backdrop-blur-md text-[11px] font-semibold px-2.5 py-1 rounded-full text-gray-200 border border-white/10">
                      🇬🇧 London, UK
                    </div>

                    <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-end justify-between">
                      <div className="bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-purple-500/30">
                        <span className="text-[10px] text-gray-400 font-medium block">Google Maps Rank</span>
                        <span className="text-sm font-black text-cyan-300">#1 Across 18 Boroughs</span>
                      </div>
                    </div>
                  </div>

                  <div className="px-1">
                    <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                      Apex Dental UK
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      Hyper-local citation architecture &amp; automated SMS reviews ranking in central London.
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between px-1">
                  <div className="flex gap-1.5">
                    <span className="text-[10px] font-medium bg-white/5 text-gray-300 px-2 py-0.5 rounded-md">Local SEO</span>
                    <span className="text-[10px] font-medium bg-white/5 text-gray-300 px-2 py-0.5 rounded-md">Schema</span>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-purple-950/70 text-purple-300 border border-purple-500/30 flex items-center justify-center group-hover:bg-[#A068FF] group-hover:text-white transition-all shadow-xs">
                    ↗
                  </div>
                </div>
              </Link>

            </div>

          </div>
        </section>

        {/* 7. ENTERPRISE CLIENT GROWTH ATLAS / SHOWCASE ANALYZER */}
        <ClientGrowthAtlas />

        {/* CLIENT TESTIMONIALS & REVIEWS SECTION: MOTIONSITES GLOW FEATURES BENTO GRID */}
        <GlowRatingBento
          onOpenConsultation={(service) => {
            setSelectedService(service || "SEO Optimization");
            setContactOpen(true);
          }}
        />

        {/* 8. BOTTOM CALL-TO-ACTION BANNER (3D MOTIONSITE UPGRADE) */}
        <section id="cta" className="relative py-14 sm:py-20 px-4 sm:px-6 md:px-12 z-10">
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
                    className="group relative inline-flex items-center gap-2.5 text-white text-[14.5px] font-bold px-8 py-4 rounded-full shadow-xl shadow-purple-500/25 hover:shadow-purple-500/50 transition-all hover:scale-105 cursor-pointer overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(135deg, #A068FF 0%, #7928CA 60%, #4F46E5 100%)",
                      boxShadow:
                        "0 12px 30px -4px rgba(160, 104, 255, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.35)",
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
