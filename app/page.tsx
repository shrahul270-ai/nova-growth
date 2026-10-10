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

      <div className="relative min-h-screen bg-[#f8fbf9] text-[#111827] overflow-hidden selection:bg-[#059669] selection:text-white">
        {/* Soft Organic Iridescent Background Shapes */}
        <div className="curved-ribbon-left" aria-hidden="true" />
        <div className="curved-ribbon-right" aria-hidden="true" />
        <div className="curved-ribbon-mid-left" aria-hidden="true" />
        <div className="curved-ribbon-bottom" aria-hidden="true" />

        {/* 1. HEADER / NAVIGATION */}
        <Navbar activePage="home" />

        {/* 2. HERO SECTION */}
        <section id="home" className="relative pt-12 pb-20 md:pt-20 md:pb-32 px-6 md:px-12 z-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50/90 border border-emerald-200/80 text-[12.5px] font-semibold text-[#0d5c4d] mb-6 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                <span>Global Digital Marketing Agency</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[66px] font-black tracking-tight text-[#0f172a] leading-[1.08] mb-6">
                Grow Smarter. <br />
                <span className="text-gradient-emerald">Go Further.</span>
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-[#475569] leading-relaxed max-w-xl mb-9 font-normal">
                We help businesses strengthen their online presence through strategic SEO, modern website development, content marketing and performance-focused digital solutions.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-12">
                <button
                  onClick={() => setContactOpen(true)}
                  className="inline-flex items-center gap-2 bg-[#0d5c4d] hover:bg-[#08483b] text-white text-[14.5px] font-bold px-7 py-3.5 rounded-full shadow-lg shadow-[#0d5c4d]/25 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <span>Let&apos;s Grow Your Business</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>

                <a
                  href="#services"
                  className="inline-flex items-center justify-center text-[14.5px] font-semibold text-[#1e293b] px-6 py-3.5 rounded-full border border-gray-300/80 bg-white/70 hover:bg-white hover:border-gray-400 backdrop-blur-xs transition-all shadow-xs"
                >
                  Explore Our Services
                </a>
              </div>

              {/* 3 Trust Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-xl">
                <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-emerald-100/80 px-3.5 py-2.5 rounded-2xl shadow-xs">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm font-bold shrink-0">
                    📈
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[12.5px] font-bold text-[#0f172a] leading-tight">More Traffic</span>
                    <span className="text-[11px] text-[#64748b]">Higher Rankings</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-emerald-100/80 px-3.5 py-2.5 rounded-2xl shadow-xs">
                  <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center text-sm font-bold shrink-0">
                    👥
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[12.5px] font-bold text-[#0f172a] leading-tight">Better Engagement</span>
                    <span className="text-[11px] text-[#64748b]">Real Customers</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-emerald-100/80 px-3.5 py-2.5 rounded-2xl shadow-xs">
                  <div className="w-8 h-8 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center text-sm font-bold shrink-0">
                    🚀
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[12.5px] font-bold text-[#0f172a] leading-tight">Business Growth</span>
                    <span className="text-[11px] text-[#64748b]">Long Term Success</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Right Visual: 3D Holographic Sphere & Accents */}
            <div className="lg:col-span-5 relative flex items-center justify-center min-h-[420px] md:min-h-[500px]">
              
              {/* Handwritten Floating Annotation (Top Right) */}
              <div className="absolute top-2 right-4 md:right-8 z-20 flex flex-col items-center">
                <span className="handwriting text-2xl md:text-3xl font-bold text-[#334155] -rotate-6 tracking-wide">
                  Your Growth
                </span>
                <span className="handwriting text-2xl md:text-3xl font-bold text-[#334155] -rotate-6 tracking-wide">
                  Our Strategy
                </span>
                <svg className="w-10 h-10 text-[#64748b] -rotate-12 mt-1" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 10 C 25 15, 35 30, 30 42 M 30 42 L 24 35 M 30 42 L 36 38" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* 3D Glassmorphic Crystal Centerpiece */}
              <div className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] flex items-center justify-center animate-float-slow">
                
                {/* Iridescent Glow Rings */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-400/25 via-cyan-400/20 to-purple-400/25 blur-3xl animate-pulse-glow" />

                {/* Outer Metallic Torus Ring (Silver/Cyan reflective) */}
                <div className="absolute w-[290px] h-[290px] sm:w-[350px] sm:h-[350px] rounded-full border-[10px] sm:border-[14px] border-transparent bg-gradient-to-tr from-slate-200 via-white/80 to-teal-100/60 shadow-xl opacity-90 transform rotate-12"
                     style={{
                       backgroundClip: "padding-box",
                       boxShadow: "inset 0 0 25px rgba(255,255,255,0.9), 0 20px 40px rgba(16,185,129,0.15)"
                     }}
                />

                {/* Main 3D Sphere Glass Body */}
                <div className="relative w-[210px] h-[210px] sm:w-[260px] sm:h-[260px] rounded-full overflow-hidden shadow-2xl flex items-center justify-center border border-white/60"
                     style={{
                       background: "radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.9) 0%, rgba(167, 243, 208, 0.5) 30%, rgba(5, 150, 105, 0.75) 75%, rgba(6, 78, 59, 0.95) 100%)",
                       boxShadow: "inset -15px -15px 40px rgba(4, 120, 87, 0.8), inset 15px 15px 30px rgba(255, 255, 255, 0.8), 0 25px 50px rgba(5, 150, 105, 0.35)"
                     }}
                >
                  {/* Glass highlight reflections */}
                  <div className="absolute -top-10 -left-10 w-44 h-44 rounded-full bg-white/40 blur-md pointer-events-none" />

                  {/* Upward Luminous Arrow inside sphere */}
                  <div className="relative z-10 flex flex-col items-center">
                    <svg className="w-24 h-24 sm:w-28 sm:h-28 text-white filter drop-shadow-[0_8px_16px_rgba(255,255,255,0.85)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </div>
                </div>

                {/* Floating Satellite Glass Spheres */}
                {/* Purple orb */}
                <div className="absolute -bottom-2 -left-6 w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-lg border border-purple-200/50 animate-float-gentle"
                     style={{
                       background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(168,85,247,0.7) 45%, rgba(107,33,168,0.9) 100%)",
                       boxShadow: "0 10px 25px rgba(147, 51, 234, 0.35)"
                     }}
                />
                {/* Cyan soft orb */}
                <div className="absolute top-4 -left-4 w-9 h-9 sm:w-11 sm:h-11 rounded-full shadow-md border border-cyan-200/50 animate-pulse-glow"
                     style={{
                       background: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.9), rgba(56,189,248,0.7) 50%, rgba(14,116,144,0.9) 100%)",
                       boxShadow: "0 8px 20px rgba(6, 182, 212, 0.3)"
                     }}
                />
              </div>

              {/* Floating Stat Card (Right Bottom) */}
              <div className="absolute bottom-2 right-2 sm:right-6 z-20 bg-white/95 backdrop-blur-md border border-emerald-100 p-3.5 sm:p-4 rounded-2xl shadow-xl flex items-center gap-3.5 hover:scale-105 transition-transform">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xl sm:text-2xl font-black text-[#0f172a] leading-none">
                    300%
                  </span>
                  <span className="text-[11px] font-medium text-[#64748b] mt-1 leading-tight">
                    Average Growth <br /> for Our Clients
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
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[12.5px] font-semibold text-[#0d5c4d] mb-4">
                  <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                  <span>Our Services</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-black text-[#0f172a] tracking-tight leading-tight mb-5">
                  Digital Solutions <br />
                  for <span className="text-gradient-emerald">Real Growth</span>
                </h2>

                <p className="text-[15px] text-[#475569] leading-relaxed mb-8">
                  From SEO to web development, we offer end-to-end digital marketing services to help your business reach new heights.
                </p>

                <button
                  onClick={() => {
                    setSelectedService("All Services");
                    setContactOpen(true);
                  }}
                  className="inline-flex items-center gap-2 bg-[#0d5c4d] hover:bg-[#08483b] text-white text-[14px] font-bold px-6 py-3 rounded-full shadow-md shadow-[#0d5c4d]/20 transition-all hover:gap-3 cursor-pointer"
                >
                  <span>View All Services</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>

              {/* Right Column: 6 Cards in 2x3 Grid */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* 1. SEO Optimization */}
                <div 
                  onClick={() => {
                    setSelectedService("SEO Optimization");
                    setContactOpen(true);
                  }}
                  className="group bg-white p-6 rounded-2xl border border-gray-100 card-hover cursor-pointer relative flex flex-col justify-between min-h-[175px]"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg">
                      🔍
                    </div>
                    <span className="text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">
                      ↗
                    </span>
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold text-[#0f172a] mb-1.5 group-hover:text-[#0d5c4d] transition-colors">
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
                  className="group bg-white p-6 rounded-2xl border border-gray-100 card-hover cursor-pointer relative flex flex-col justify-between min-h-[175px]"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm font-bold font-mono">
                      &lt;/&gt;
                    </div>
                    <span className="text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">
                      ↗
                    </span>
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold text-[#0f172a] mb-1.5 group-hover:text-indigo-600 transition-colors">
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
                  className="group bg-white p-6 rounded-2xl border border-gray-100 card-hover cursor-pointer relative flex flex-col justify-between min-h-[175px]"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center text-lg">
                      📄
                    </div>
                    <span className="text-gray-400 group-hover:text-amber-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">
                      ↗
                    </span>
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold text-[#0f172a] mb-1.5 group-hover:text-amber-600 transition-colors">
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
                  className="group bg-white p-6 rounded-2xl border border-gray-100 card-hover cursor-pointer relative flex flex-col justify-between min-h-[175px]"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center text-lg">
                      ✉️
                    </div>
                    <span className="text-gray-400 group-hover:text-rose-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">
                      ↗
                    </span>
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold text-[#0f172a] mb-1.5 group-hover:text-rose-600 transition-colors">
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
                  className="group bg-white p-6 rounded-2xl border border-gray-100 card-hover cursor-pointer relative flex flex-col justify-between min-h-[175px]"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center text-lg">
                      🔗
                    </div>
                    <span className="text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">
                      ↗
                    </span>
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold text-[#0f172a] mb-1.5 group-hover:text-purple-600 transition-colors">
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
                  className="group bg-white p-6 rounded-2xl border border-gray-100 card-hover cursor-pointer relative flex flex-col justify-between min-h-[175px]"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center text-lg">
                      ⚙️
                    </div>
                    <span className="text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">
                      ↗
                    </span>
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold text-[#0f172a] mb-1.5 group-hover:text-teal-600 transition-colors">
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
        <section id="about" className="relative py-20 px-6 md:px-12 z-10 bg-white/40 border-y border-emerald-50">
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
              <div className="absolute top-8 left-2 sm:-left-2 z-20 bg-white/95 backdrop-blur-md border border-emerald-100 px-3.5 py-2 rounded-xl shadow-lg flex items-center gap-2 animate-float-gentle">
                <span className="text-emerald-600 font-bold text-xs">↗ 15%</span>
                <span className="text-[11px] text-[#64748b] font-medium">Conversions</span>
              </div>

              {/* Floating Metric 2 */}
              <div className="absolute bottom-16 left-0 sm:left-4 z-20 bg-white/95 backdrop-blur-md border border-emerald-100 px-3.5 py-2 rounded-xl shadow-lg flex items-center gap-2">
                <span className="text-teal-600 font-bold text-xs">↗ 20%</span>
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
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                      <span className="text-xs font-bold text-slate-800">Organic Growth Report</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium">Live Analytics</span>
                  </div>

                  {/* Chart bars & lines visual */}
                  <div className="grid grid-cols-6 gap-2 items-end h-24 mb-3 px-2">
                    <div className="bg-emerald-200 rounded-t h-[35%]" />
                    <div className="bg-emerald-300 rounded-t h-[50%]" />
                    <div className="bg-emerald-400 rounded-t h-[65%]" />
                    <div className="bg-emerald-500 rounded-t h-[80%]" />
                    <div className="bg-emerald-600 rounded-t h-[95%]" />
                    <div className="bg-[#0d5c4d] rounded-t h-[100%]" />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-600 font-semibold pt-1 border-t border-slate-100">
                    <span>Target: +150%</span>
                    <span className="text-emerald-700 font-bold">Achieved: +300%</span>
                  </div>
                </div>

                {/* Laptop Base */}
                <div className="w-[110%] -ml-[5%] h-3 bg-slate-800 rounded-b-xl mt-1 shadow-md" />
              </div>

              {/* Floating Highlight Badge: +245% Organic Traffic */}
              <div className="absolute -bottom-4 right-4 sm:right-8 z-20 bg-white/95 backdrop-blur-md border border-emerald-200 px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
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
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[12.5px] font-semibold text-[#0d5c4d] mb-4">
                <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                <span>About Nova Growth</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-[#0f172a] tracking-tight leading-tight mb-5">
                Your Trusted Partner <br />
                in <span className="text-gradient-emerald">Digital Success</span>
              </h2>

              <p className="text-[15.5px] text-[#475569] leading-relaxed mb-8">
                At Nova Growth, we combine creativity, technology and data to deliver results-driven digital marketing solutions. Our goal is simple — help your business grow, globally.
              </p>

              {/* 4 Feature Cards (2x2 Grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg shrink-0">
                    👥
                  </div>
                  <div>
                    <span className="text-[14px] font-bold text-[#0f172a] block">Expert Team</span>
                    <span className="text-[12px] text-[#64748b]">Skilled &amp; Experienced</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center text-lg shrink-0">
                    📊
                  </div>
                  <div>
                    <span className="text-[14px] font-bold text-[#0f172a] block">Data Driven</span>
                    <span className="text-[12px] text-[#64748b]">Strategy &amp; Analysis</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center text-lg shrink-0">
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
            <div className="bg-gradient-to-r from-emerald-50/90 via-teal-50/80 to-purple-50/70 border border-emerald-100/90 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
              
              {/* Badge text with hand-drawn arrow */}
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-lg md:text-xl font-extrabold text-[#0f172a] tracking-tight">
                  Our Impact in Numbers
                </span>
                <span className="handwriting text-2xl text-emerald-700">⤹</span>
              </div>

              {/* 4 Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-12 w-full lg:w-auto text-center lg:text-left">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight">150+</div>
                  <div className="text-xs font-semibold text-[#64748b] mt-0.5">Happy Clients</div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight">300+</div>
                  <div className="text-xs font-semibold text-[#64748b] mt-0.5">Projects Completed</div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight">98%</div>
                  <div className="text-xs font-semibold text-[#64748b] mt-0.5">Client Satisfaction</div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight">10+</div>
                  <div className="text-xs font-semibold text-[#64748b] mt-0.5">Countries Served</div>
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
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[12.5px] font-semibold text-[#0d5c4d] mb-4">
                  <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                  <span>Our Work</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-[#0f172a] tracking-tight">
                  Recent Projects
                </h2>
                <p className="text-[15px] text-[#475569] mt-2">
                  We&apos;ve helped businesses across industries achieve real results with our digital solutions.
                </p>
              </div>

              <button
                onClick={() => setContactOpen(true)}
                className="inline-flex items-center gap-2 bg-[#0d5c4d] hover:bg-[#08483b] text-white text-[13.5px] font-bold px-6 py-3 rounded-full shadow-md shadow-[#0d5c4d]/20 transition-all self-start md:self-auto cursor-pointer"
              >
                <span>View All Projects</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>

            {/* 3 Project Showcase Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Project 1: Fashion Brand Website */}
              <div className="group bg-white rounded-3xl border border-gray-100 p-4 card-hover overflow-hidden flex flex-col justify-between">
                <div className="relative bg-gradient-to-tr from-rose-50 to-amber-50 rounded-2xl h-56 flex items-center justify-center p-4 overflow-hidden mb-4 border border-rose-100/50">
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[11px] font-bold px-3 py-1 rounded-full text-[#0f172a] shadow-xs">
                    E-Commerce Website
                  </div>
                  {/* Visual mockup representation */}
                  <div className="w-40 h-44 bg-white rounded-xl shadow-md border border-gray-200 p-2 flex flex-col items-center justify-center text-center group-hover:scale-105 transition-transform">
                    <span className="text-3xl mb-1">👗</span>
                    <span className="text-xs font-bold text-slate-800">Luxe Fashion US</span>
                    <span className="text-[10px] text-emerald-600 font-semibold mt-1">+340% Sales</span>
                  </div>
                </div>

                <div className="flex items-center justify-between px-2 pt-1">
                  <div>
                    <h3 className="text-lg font-bold text-[#0f172a] group-hover:text-[#0d5c4d] transition-colors">
                      Fashion Brand Website
                    </h3>
                    <p className="text-[13px] text-[#64748b]">Web Development + SEO</p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-[#0d5c4d] group-hover:text-white transition-colors">
                    ↗
                  </div>
                </div>
              </div>

              {/* Project 2: Fitness App */}
              <div className="group bg-white rounded-3xl border border-gray-100 p-4 card-hover overflow-hidden flex flex-col justify-between">
                <div className="relative bg-gradient-to-tr from-purple-50 to-indigo-50 rounded-2xl h-56 flex items-center justify-center p-4 overflow-hidden mb-4 border border-purple-100/50">
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[11px] font-bold px-3 py-1 rounded-full text-[#0f172a] shadow-xs">
                    Mobile App
                  </div>
                  {/* Visual mockup representation */}
                  <div className="w-28 h-44 bg-slate-900 rounded-2xl shadow-md border-2 border-slate-700 p-2 flex flex-col items-center justify-center text-center text-white group-hover:scale-105 transition-transform">
                    <span className="text-3xl mb-1">⚡</span>
                    <span className="text-xs font-bold text-purple-300">PulseFit Pro</span>
                    <span className="text-[9px] text-emerald-400 font-medium mt-1">50K+ Downloads</span>
                  </div>
                </div>

                <div className="flex items-center justify-between px-2 pt-1">
                  <div>
                    <h3 className="text-lg font-bold text-[#0f172a] group-hover:text-[#0d5c4d] transition-colors">
                      Fitness App
                    </h3>
                    <p className="text-[13px] text-[#64748b]">UI/UX Design + Development</p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-purple-50 text-purple-700 flex items-center justify-center group-hover:bg-[#0d5c4d] group-hover:text-white transition-colors">
                    ↗
                  </div>
                </div>
              </div>

              {/* Project 3: Local Business Growth */}
              <div className="group bg-white rounded-3xl border border-gray-100 p-4 card-hover overflow-hidden flex flex-col justify-between">
                <div className="relative bg-gradient-to-tr from-teal-50 to-emerald-50 rounded-2xl h-56 flex items-center justify-center p-4 overflow-hidden mb-4 border border-emerald-100/50">
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[11px] font-bold px-3 py-1 rounded-full text-[#0f172a] shadow-xs">
                    SEO
                  </div>
                  {/* Visual mockup representation */}
                  <div className="w-44 h-36 bg-white rounded-xl shadow-md border border-gray-200 p-3 flex flex-col justify-center text-left group-hover:scale-105 transition-transform">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-800">Apex Dental UK</span>
                      <span className="text-emerald-600 text-xs font-bold">#1 Google</span>
                    </div>
                    <span className="text-[10px] text-slate-500">Local Area Map Rankings</span>
                    <div className="w-full bg-emerald-100 h-2 rounded-full mt-2 overflow-hidden">
                      <div className="bg-emerald-500 h-full w-[85%]" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between px-2 pt-1">
                  <div>
                    <h3 className="text-lg font-bold text-[#0f172a] group-hover:text-[#0d5c4d] transition-colors">
                      Local Business Growth
                    </h3>
                    <p className="text-[13px] text-[#64748b]">SEO + Content Marketing</p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center group-hover:bg-[#0d5c4d] group-hover:text-white transition-colors">
                    ↗
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* 7. HOW WE WORK (PROCESS SECTION) */}
        <section className="relative py-20 px-6 md:px-12 z-10 bg-white/50 border-t border-emerald-50">
          <div className="max-w-7xl mx-auto">
            
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[12.5px] font-semibold text-[#0d5c4d] mb-3">
                <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                <span>Our Process</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0f172a] tracking-tight">
                How We Work
              </h2>
              <p className="text-[15px] text-[#475569] mt-2">
                A simple, transparent process to turn your goals into measurable results.
              </p>
            </div>

            {/* 4 Process Steps in Horizontal Flow */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              
              {/* Step 1 */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between relative group hover:border-emerald-300 transition-colors">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg mb-4">
                    🔍
                  </div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[17px] font-bold text-[#0f172a]">01 Discover</span>
                    <span className="text-emerald-500 font-bold group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                  <p className="text-[13px] text-[#64748b] leading-relaxed">
                    Understanding your goals and target audience.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between relative group hover:border-teal-300 transition-colors">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center text-lg mb-4">
                    📋
                  </div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[17px] font-bold text-[#0f172a]">02 Strategize</span>
                    <span className="text-teal-500 font-bold group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                  <p className="text-[13px] text-[#64748b] leading-relaxed">
                    Creating a custom plan for your growth.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between relative group hover:border-purple-300 transition-colors">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-lg mb-4">
                    💻
                  </div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[17px] font-bold text-[#0f172a]">03 Execute</span>
                    <span className="text-purple-500 font-bold group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                  <p className="text-[13px] text-[#64748b] leading-relaxed">
                    Bringing the plan to life with expertise.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between relative group hover:border-emerald-300 transition-colors">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center text-lg mb-4">
                    🎯
                  </div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[17px] font-bold text-[#0f172a]">04 Optimize</span>
                  </div>
                  <p className="text-[13px] text-[#64748b] leading-relaxed">
                    Tracking, improving and scaling results.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* CLIENT TESTIMONIALS & REVIEWS SECTION */}
        <section className="relative py-20 px-6 md:px-12 z-10 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-[#0d5c4d] mb-3">
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
            <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-xs card-hover flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400 text-sm">★★★★★</div>
                  <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-100">
                    +340% Revenue
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] text-[#475569] leading-relaxed mb-6 italic">
                  &ldquo;Nova Growth completely transformed our organic pipeline. In 4 months, our US search traffic grew by 340%, and organic revenue eclipsed our paid Facebook ad spend. Outstanding communication across EST hours.&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center shrink-0">
                  DH
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0f172a]">David Henderson</h4>
                  <p className="text-[11px] text-[#64748b]">Founder &amp; CEO, Luxe Apparel (Los Angeles, USA 🇺🇸)</p>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-xs card-hover flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400 text-sm">★★★★★</div>
                  <span className="text-[10px] font-bold bg-teal-50 text-teal-700 px-2.5 py-1 rounded-full border border-teal-100">
                    #1 Google Map Pack
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] text-[#475569] leading-relaxed mb-6 italic">
                  &ldquo;Their local SEO strategy put us #1 across London for every high-value patient keyword. Inbound phone bookings jumped 280%. The weekly Slack updates and transparent Data Studio reporting are top notch.&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-800 font-black text-xs flex items-center justify-center shrink-0">
                  OT
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0f172a]">Oliver Thorne</h4>
                  <p className="text-[11px] text-[#64748b]">Marketing Director, Apex Dental Group (London, UK 🇬🇧)</p>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-xs card-hover flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400 text-sm">★★★★★</div>
                  <span className="text-[10px] font-bold bg-purple-50 text-purple-700 px-2.5 py-1 rounded-full border border-purple-100">
                    98 PageSpeed
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] text-[#475569] leading-relaxed mb-6 italic">
                  &ldquo;The Next.js rebuild cut our load time from 4.2s down to 0.8s. All Google Core Web Vitals are green (100/100). They think like genuine growth partners, not just developers. Demo bookings surged 420%.&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-800 font-black text-xs flex items-center justify-center shrink-0">
                  CM
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0f172a]">Chloe Martinez</h4>
                  <p className="text-[11px] text-[#64748b]">Co-Founder, CloudSync SaaS (Austin, USA 🇺🇸)</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 8. BOTTOM CALL-TO-ACTION BANNER */}
        <section id="contact" className="relative py-16 px-6 md:px-12 z-10">
          <div className="max-w-7xl mx-auto">
            <div className="relative rounded-3xl p-8 md:p-12 overflow-hidden border border-emerald-100/80 shadow-xl"
                 style={{
                   background: "linear-gradient(115deg, #e6f9f0 0%, #e0f2fe 45%, #ede9fe 100%)"
                 }}
            >
              
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left side text */}
                <div className="lg:col-span-5 text-left">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0f172a] tracking-tight leading-tight">
                    Ready to Take Your Business to the Next Level?
                  </h2>
                </div>

                {/* Middle CTA & description */}
                <div className="lg:col-span-4 flex flex-col items-start gap-4">
                  <p className="text-[14px] text-[#475569] leading-relaxed">
                    Get a free consultation and discover how Nova Growth can help you achieve your digital marketing goals.
                  </p>
                  <button
                    onClick={() => setContactOpen(true)}
                    className="inline-flex items-center gap-2 bg-[#0d5c4d] hover:bg-[#08483b] text-white text-[14px] font-bold px-7 py-3.5 rounded-full shadow-lg shadow-[#0d5c4d]/25 transition-all hover:gap-3 cursor-pointer"
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
                    <span className="handwriting text-2xl font-bold text-[#334155] -rotate-6">
                      Your Growth
                    </span>
                    <span className="handwriting text-2xl font-bold text-[#334155] -rotate-6">
                      Starts Here
                    </span>
                    <svg className="w-8 h-8 text-[#64748b] -rotate-12" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M10 10 C 25 15, 35 30, 30 42 M 30 42 L 24 35 M 30 42 L 36 38" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>

                  {/* Iridescent glass orb accent */}
                  <div className="w-20 h-20 rounded-full shadow-xl border border-white/80 animate-float-slow shrink-0"
                       style={{
                         background: "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.95), rgba(167,243,208,0.7) 45%, rgba(139,92,246,0.65) 85%, rgba(6,95,70,0.9) 100%)",
                         boxShadow: "0 15px 30px rgba(5,150,105,0.25)"
                       }}
                  />
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* 9. FOOTER */}
        <Footer />

        {/* INTERACTIVE LEAD / CONSULTATION MODAL */}
        {contactOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100 relative">
              
              {/* Close Button */}
              <button
                onClick={() => setContactOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                Global Client Inquiry
              </div>

              <h3 className="text-2xl font-black text-[#0f172a] tracking-tight">
                Get Your Free Growth Strategy
              </h3>
              <p className="text-sm text-[#64748b] mt-1 mb-6">
                Tell us about your business goals. We review client inquiries and reply within 12 hours.
              </p>

              {formStatus === "success" ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-2xl text-center">
                  <div className="text-4xl mb-2">🎉</div>
                  <h4 className="text-lg font-bold">Thank you! Request Received</h4>
                  <p className="text-xs text-emerald-700 mt-1">Our strategist will review your website and reach out via email shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Your Name</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. John Miller"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Business Email (Overseas / Company Email)</label>
                    <input
                      required
                      type="email"
                      placeholder="name@company.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Website URL or Niche</label>
                    <input
                      type="text"
                      placeholder="https://yourwebsite.com or Startup niche"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Target Service</label>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none bg-white"
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

                  <button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="w-full bg-[#0d5c4d] hover:bg-[#08483b] text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-md shadow-emerald-900/20 mt-2 cursor-pointer"
                  >
                    {formStatus === "submitting" ? "Sending Request..." : "Book Free Strategy Call →"}
                  </button>
                </form>
              )}

            </div>
          </div>
        )}

      </div>
    </>
  );
}
