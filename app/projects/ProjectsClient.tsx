"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { caseStudiesData } from "./projectsData";

export default function ProjectsClient() {
  const [filter, setFilter] = useState<string>("all");
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const filteredStudies =
    filter === "all"
      ? caseStudiesData
      : caseStudiesData.filter((s) => s.categoryGroup === filter);

  const activeProject = caseStudiesData[activeProjectIndex] || caseStudiesData[0];

  // The 6 clean showcase preview cards mapped 1:1 to case studies in Modern Industrial Elegance
  const showcaseCards = [
    {
      id: "card-fashion",
      projectId: "fashion-brand",
      title: "LUXE FASHION US",
      subtitle: "Headless Next.js Storefront",
      tag: "E-COMMERCE & SEO",
      stat: "+340%",
      statLabel: "Organic Revenue",
      country: "LOS ANGELES, USA",
      img: "/images/projects/fashion-brand.jpg",
    },
    {
      id: "card-fitness",
      projectId: "fitness-app",
      title: "PULSEFIT PRO",
      subtitle: "60fps App Funnel & CRO",
      tag: "MOBILE APP & SAAS",
      stat: "50,000+",
      statLabel: "Active Downloads",
      country: "AUSTIN, TX, USA",
      img: "/images/projects/fitness-app.jpg",
    },
    {
      id: "card-local",
      projectId: "local-growth",
      title: "APEX DENTAL UK",
      subtitle: "London Geo-Routing & Maps",
      tag: "LOCAL SEO 3-PACK",
      stat: "#1 RANK",
      statLabel: "Across 18 Boroughs",
      country: "LONDON, UK",
      img: "/images/projects/local-growth.jpg",
    },
    {
      id: "card-saas",
      projectId: "saas-pipeline",
      title: "CLOUDSYNC TECH",
      subtitle: "Programmatic Pipeline Engine",
      tag: "TECHNICAL SEO & CRO",
      stat: "+420%",
      statLabel: "Demo Bookings Lift",
      country: "SAN FRANCISCO, USA",
      img: "/images/projects/saas-analytics.jpg",
    },
    {
      id: "card-realestate",
      projectId: "dubai-real-estate",
      title: "HORIZON LUXURY",
      subtitle: "Dubai Multilingual Portal",
      tag: "LUXURY REAL ESTATE",
      stat: "$18.5M",
      statLabel: "Verified Inquiries",
      country: "DUBAI, UAE",
      img: "/images/projects/real-estate.jpg",
    },
    {
      id: "card-fintech",
      projectId: "fintech-app",
      title: "VENTUREPAY GLOBAL",
      subtitle: "Bank-Grade Remittance Platform",
      tag: "FINTECH PLATFORM",
      stat: "100K+",
      statLabel: "Monthly Active Users",
      country: "TORONTO, CANADA",
      img: "/images/projects/fintech-app.jpg",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#07030d] text-white selection:bg-[#681fe4] selection:text-white font-satoshi antialiased overflow-x-hidden">
      
      {/* 240px x 240px White Gridlines at 4.5% Opacity */}
      <div className="absolute inset-0 bg-grid-white-240 pointer-events-none" />

      {/* Floating Toast Notification */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-24 right-6 z-50 bg-[#0c0617] text-white border border-[#681fe4] px-5 py-3 rounded-[4px] shadow-2xl flex items-center gap-3 animate-fadeIn text-xs font-mono backdrop-blur-xl"
        >
          <span className="w-2 h-2 rounded-full bg-[#681fe4] animate-ping" />
          <span>{toast}</span>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="ml-2 text-neutral-400 hover:text-white text-xs cursor-pointer p-0.5"
            aria-label="Close notification"
          >
            ✕
          </button>
        </div>
      )}

      {/* Modern Industrial Header */}
      <Navbar activePage="projects" />

      {/* =========================================================================
          HERO SECTION (Modern Industrial Elegance)
         ========================================================================= */}
      <section
        id="projects-hero"
        className="relative w-full pt-16 sm:pt-24 pb-20 px-6 sm:px-12 text-center z-10 overflow-hidden border-b border-white/10"
      >
        {/* Radial Purple Glow in Top Center */}
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full pointer-events-none blur-[140px] opacity-25"
          style={{ background: "radial-gradient(circle, #681fe4 0%, #220090 50%, transparent 75%)" }}
          aria-hidden="true"
        />

        {/* Master Heading Block */}
        <div className="max-w-5xl mx-auto relative z-20 mb-16 text-left sm:text-center">
          
          {/* Micro-badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-[4px] bg-white/5 border border-white/10 text-[#681fe4] text-xs font-bebas tracking-[0.24em] mb-6 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#681fe4] animate-pulse" />
            <span>Verified Commercial Case Studies &amp; Outcomes</span>
          </div>

          {/* Bebas Neue All-Caps Display H1 Heading */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bebas tracking-[0.05em] text-white leading-[0.92] uppercase mb-6 drop-shadow-md">
            PROVEN DIGITAL GROWTH &amp; <br />
            <span className="text-[#681fe4]">VERIFIED CLIENT RESULTS.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-neutral-300 max-w-2xl mx-auto font-normal leading-[2rem] mb-10">
            Explore 6 comprehensive case studies showcasing compounding organic search traffic, international search dominance, and high-converting headless Next.js web applications across US, UK &amp; GCC brands.
          </p>

          {/* Sharp 4px Action Buttons */}
          <div className="flex flex-wrap items-center justify-start sm:justify-center gap-4">
            <a
              href="#case-studies-archive"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-[4px] bg-[#681fe4] hover:bg-[#5815cb] text-white font-bebas text-base sm:text-lg tracking-[0.18em] shadow-[0_10px_25px_rgba(104,31,228,0.35)] transition-all cursor-pointer"
            >
              <span>EXPLORE ALL 6 CASE STUDIES</span>
              <span>↓</span>
            </a>
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-[4px] bg-transparent hover:bg-white/5 border border-white/20 text-white font-bebas text-base sm:text-lg tracking-[0.18em] transition-all cursor-pointer"
            >
              <span>REQUEST GROWTH AUDIT →</span>
            </Link>
          </div>
        </div>

        {/* Quick Client Switcher Cards */}
        <div className="max-w-[1320px] mx-auto mb-14 text-left">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-bebas text-xs sm:text-sm tracking-[0.24em] text-white/60 uppercase">
              Quick Client Switcher (Click Any Card To Preview)
            </span>
            <span className="font-mono text-xs text-neutral-500 hidden sm:inline">
              6 VERIFIED DEPLOYMENTS
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {showcaseCards.map((card) => {
              const isSelected = activeProject.id === card.projectId;
              return (
                <div
                  key={card.id}
                  onClick={() => {
                    const foundIdx = caseStudiesData.findIndex((s) => s.id === card.projectId);
                    if (foundIdx !== -1) {
                      setActiveProjectIndex(foundIdx);
                      showToast(`Previewing: ${card.title}`);
                    }
                  }}
                  className={`p-4 rounded-[4px] border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "bg-[#681fe4]/15 border-[#681fe4] shadow-lg shadow-[#681fe4]/20"
                      : "bg-[#0c0617] hover:bg-white/5 border-white/10 hover:border-white/25"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-2">
                      <span className="font-bebas text-[11px] tracking-[0.18em] text-[#681fe4] truncate">
                        {card.tag}
                      </span>
                      <span className="font-bebas text-xs tracking-[0.12em] text-white bg-white/10 px-1.5 py-0.5 rounded-[2px] shrink-0">
                        {card.stat}
                      </span>
                    </div>
                    <h3 className="font-bebas text-base tracking-[0.12em] text-white leading-tight truncate">
                      {card.title}
                    </h3>
                    <p className="text-xs text-neutral-400 leading-tight mt-1 line-clamp-1">
                      {card.subtitle}
                    </p>
                  </div>

                  <div className="mt-4 pt-2.5 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-neutral-400 truncate">
                      {card.country}
                    </span>
                    <span
                      className={`font-bold text-xs transition-transform ${
                        isSelected ? "text-[#681fe4] translate-x-1" : "text-neutral-500"
                      }`}
                    >
                      →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =====================================================================
            FEATURED BROWSER WINDOW SHOWCASE
           ===================================================================== */}
        <div className="relative max-w-5xl mx-auto text-left">
          <div className="w-full rounded-[4px] border border-white/10 bg-[#0c0617] shadow-2xl overflow-hidden">
            
            {/* macOS Browser Chrome Bar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10 bg-[#07030d]">
              {/* Window Controls */}
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500" />
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>

              {/* URL Address Bar */}
              <div className="flex-1 max-w-md mx-3">
                <div className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 rounded-[2px] px-3 py-1 text-xs text-neutral-300 font-mono">
                  <span className="text-[#681fe4]">🔒</span>
                  <span className="truncate">balajiprimemedia.in/projects/{activeProject.id}</span>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="hidden sm:inline">LIVE CLIENT SYSTEM</span>
              </div>
            </div>

            {/* Inner Browser Viewport Content */}
            <div className="p-6 sm:p-10 bg-[#07030d]">
              
              {/* Inner Website Nav */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="text-center w-full">
                  <span className="font-bebas text-sm sm:text-base tracking-[0.24em] text-white/80 uppercase">
                    {activeProject.shortTitle.toUpperCase()} // {activeProject.country}
                  </span>
                </div>
              </div>

              {/* Inner Website Hero Banner with 100% Grayscale Image */}
              <div className="relative rounded-[4px] overflow-hidden min-h-[260px] sm:min-h-[340px] flex items-center p-6 sm:p-10 border border-white/10">
                <img
                  src={
                    activeProject.id === "fashion-brand"
                      ? "/images/projects/fashion-brand.jpg"
                      : activeProject.id === "fitness-app"
                      ? "/images/projects/fitness-app.jpg"
                      : activeProject.id === "local-growth"
                      ? "/images/projects/local-growth.jpg"
                      : activeProject.id === "saas-pipeline"
                      ? "/images/projects/saas-analytics.jpg"
                      : activeProject.id === "dubai-real-estate"
                      ? "/images/projects/real-estate.jpg"
                      : "/images/projects/fintech-app.jpg"
                  }
                  alt={activeProject.title}
                  className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125"
                />
                
                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#07030d] via-[#07030d]/70 to-transparent" />

                {/* Content Overlay */}
                <div className="relative z-10 max-w-md text-white">
                  <span className="font-bebas text-xs tracking-[0.24em] text-[#681fe4] uppercase block mb-2">
                    Verified Case Study • {activeProject.category}
                  </span>
                  
                  <h2 className="font-bebas text-3xl sm:text-4xl md:text-5xl tracking-[0.06em] leading-tight mb-4 text-white uppercase">
                    {activeProject.heroMetric}
                  </h2>
                  
                  {/* Primary CTA button linking to deep dive */}
                  <Link
                    href={`/projects/${activeProject.id}`}
                    className="inline-flex items-center gap-2 bg-[#681fe4] hover:bg-[#5815cb] text-white font-bebas text-sm tracking-[0.18em] uppercase px-6 py-3 rounded-[4px] shadow-lg transition-all cursor-pointer"
                  >
                    <span>EXPLORE FULL CASE STUDY</span>
                    <span>→</span>
                  </Link>
                </div>

                {/* Floating Metric Callout on right side */}
                <div className="absolute right-4 bottom-4 bg-[#0c0617]/95 backdrop-blur-md p-5 rounded-[4px] border border-white/15 shadow-2xl text-white text-right hidden sm:block">
                  <span className="font-bebas text-3xl sm:text-4xl tracking-[0.06em] text-[#681fe4] block leading-none">
                    {activeProject.stat}
                  </span>
                  <span className="font-bebas text-xs tracking-[0.18em] text-neutral-300 block mt-1 uppercase">
                    {activeProject.statLabel}
                  </span>
                </div>
              </div>

              {/* Core Metrics & Proven Outcomes */}
              <div className="pt-8 sm:pt-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <h3 className="font-bebas text-sm sm:text-base tracking-[0.24em] text-white uppercase">
                    Core Metrics &amp; Proven Outcomes
                  </h3>
                  <Link
                    href={`/projects/${activeProject.id}`}
                    className="font-bebas text-xs sm:text-sm tracking-[0.18em] text-[#681fe4] hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    <span>READ COMPLETE TECHNICAL BREAKDOWN</span>
                    <span>→</span>
                  </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {activeProject.metrics.map((m, mIdx) => (
                    <div
                      key={mIdx}
                      className="bg-[#0c0617] p-5 rounded-[4px] border border-white/10 text-left hover:border-[#681fe4]/60 transition-all"
                    >
                      <span className="font-bebas text-2xl sm:text-3xl tracking-[0.06em] text-[#681fe4] block leading-tight">
                        {m.value}
                      </span>
                      <span className="text-xs text-neutral-300 block leading-snug mt-1 font-medium">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Quick Interactive Project Selector Strip below the browser */}
            <div className="px-4 sm:px-6 py-4 bg-[#07030d] border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <span className="text-neutral-400">
                ACTIVE PREVIEW: <strong className="text-white font-bold">{activeProject.title}</strong>
              </span>

              <div className="flex items-center gap-1.5 flex-wrap">
                {caseStudiesData.map((study, idx) => (
                  <button
                    key={study.id}
                    type="button"
                    onClick={() => {
                      setActiveProjectIndex(idx);
                      showToast(`Switched to: ${study.shortTitle}`);
                    }}
                    className={`px-3 py-1 rounded-[2px] font-bebas text-xs tracking-[0.14em] transition-all cursor-pointer ${
                      activeProjectIndex === idx
                        ? "bg-[#681fe4] text-white shadow-xs"
                        : "bg-white/5 text-neutral-300 border border-white/10 hover:bg-white/10"
                    }`}
                  >
                    {study.shortTitle.toUpperCase()}
                  </button>
                ))}
              </div>

              <Link
                href={`/projects/${activeProject.id}`}
                className="inline-flex items-center gap-1 text-[#681fe4] hover:text-white font-bebas tracking-[0.14em] text-xs"
              >
                <span>READ FULL CASE STUDY →</span>
              </Link>
            </div>

          </div>
        </div>

      </section>

      {/* =========================================================================
          FULL ARCHIVE DIRECTORY (All 6 Case Studies)
         ========================================================================= */}
      <section
        id="case-studies-archive"
        className="relative py-20 sm:py-28 px-6 sm:px-12 z-10 max-w-[1320px] mx-auto text-left"
      >
        <div className="mb-12">
          <span className="font-bebas text-xs sm:text-sm tracking-[0.24em] text-[#681fe4] uppercase block mb-2">
            Client Archive
          </span>
          <h2 className="text-3xl sm:text-5xl font-bebas tracking-[0.06em] text-white uppercase leading-none mb-3">
            ALL 6 CASE STUDIES &amp; COMMERCIAL RESULTS
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl leading-relaxed">
            Click on any case study below to inspect full challenges, technical architecture, and verified return on investment.
          </p>

          {/* Category Filter Buttons in Underlined Bebas Neue Style */}
          <div className="mt-8 flex flex-wrap items-center gap-6 sm:gap-8 pb-3 border-b border-white/10">
            {[
              { id: "all", label: "ALL PROJECTS (6)" },
              { id: "ecommerce", label: "E-COMMERCE (2)" },
              { id: "saas", label: "B2B SAAS (2)" },
              { id: "seo", label: "LOCAL SEO (1)" },
              { id: "mobile", label: "MOBILE APPS (1)" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setFilter(tab.id);
                  showToast(`Filter: ${tab.label}`);
                }}
                className={`font-bebas text-base sm:text-lg tracking-[0.18em] transition-all cursor-pointer pb-1 ${
                  filter === tab.id
                    ? "text-[#681fe4] border-b-2 border-[#681fe4]"
                    : "text-neutral-400 hover:text-white border-b-2 border-transparent"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Luxury Editorial Case Study Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStudies.map((study) => (
            <article
              key={study.id}
              className="bg-[#0c0617] hover:bg-white/[0.03] rounded-[4px] border border-white/10 hover:border-[#681fe4]/60 shadow-xl transition-all duration-300 flex flex-col justify-between group overflow-hidden"
            >
              <div>
                {/* 1. Cover Image with hover zoom (16:10 aspect ratio, grayscale) */}
                <Link
                  href={`/projects/${study.id}`}
                  prefetch={false}
                  className="block relative aspect-[16/10] overflow-hidden bg-black"
                >
                  <img
                    src={study.coverImage || "/images/projects/fashion-brand.jpg"}
                    alt={study.title}
                    className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0617] via-transparent to-transparent pointer-events-none" />
                  
                  {/* Floating Category Badge */}
                  <span className="absolute top-3.5 left-3.5 font-bebas text-xs tracking-[0.18em] bg-[#07030d]/90 text-[#681fe4] border border-white/10 px-3 py-1 rounded-[2px] shadow-xs">
                    {study.category.toUpperCase()}
                  </span>

                  {/* Floating Country Flag Badge */}
                  <span className="absolute top-3.5 right-3.5 font-mono text-xs bg-black/80 text-white px-2.5 py-1 rounded-[2px] border border-white/10 shadow-xs font-medium">
                    {study.country}
                  </span>

                  {/* Floating Bottom Metric Pill */}
                  <div className="absolute bottom-3 left-3 bg-[#07030d]/95 px-3.5 py-1.5 rounded-[2px] border border-white/15 flex items-center gap-2 shadow-md">
                    <span className="font-bebas text-base tracking-[0.08em] text-[#681fe4] leading-none">
                      {study.stat}
                    </span>
                    <span className="text-[11px] font-mono text-neutral-300 leading-tight">
                      {study.statLabel}
                    </span>
                  </div>
                </Link>

                {/* 2. Content Details */}
                <div className="p-6 sm:p-7">
                  {/* Badge & Timeline Meta */}
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-2.5">
                    <span className="text-[#681fe4] font-semibold">{study.badge}</span>
                    <span>•</span>
                    <span>{study.timeline}</span>
                  </div>

                  {/* Semantic H3 Heading */}
                  <h3 className="font-bebas text-xl sm:text-2xl tracking-[0.1em] text-white group-hover:text-[#681fe4] transition-colors leading-tight line-clamp-2 mb-2 uppercase">
                    <Link href={`/projects/${study.id}`} prefetch={false} className="hover:underline">
                      {study.title}
                    </Link>
                  </h3>

                  {/* Client Info */}
                  <p className="text-xs font-mono text-neutral-400 mb-3">
                    {study.client}
                  </p>

                  {/* Overview Excerpt */}
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-5 line-clamp-3 font-normal">
                    {study.overview}
                  </p>

                  {/* Key Metrics Grid (3 cols) */}
                  <div className="grid grid-cols-3 gap-2 bg-white/[0.03] p-3 rounded-[2px] border border-white/5 mb-5 text-center">
                    {study.metrics.slice(0, 3).map((m, mIdx) => (
                      <div key={mIdx}>
                        <span className="font-bebas text-lg tracking-[0.06em] text-[#681fe4] block leading-tight">
                          {m.value}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-400 leading-tight block mt-0.5">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {study.tech.slice(0, 4).map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono bg-white/5 text-neutral-300 px-2.5 py-1 rounded-[2px] border border-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3. Card Footer Action */}
              <div className="px-6 sm:px-7 pb-6 pt-0 mt-auto">
                <Link
                  href={`/projects/${study.id}`}
                  prefetch={false}
                  className="w-full inline-flex items-center justify-between px-5 py-3 rounded-[4px] font-bebas text-sm tracking-[0.18em] text-white bg-[#681fe4] hover:bg-[#5815cb] shadow-xs transition-all cursor-pointer"
                >
                  <span>VIEW FULL CASE STUDY</span>
                  <span className="group-hover:translate-x-1.5 transition-transform">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* =========================================================================
          BOTTOM CTA BANNER (Diagonal Split Aesthetic)
         ========================================================================= */}
      <section className="relative py-20 px-6 sm:px-12 z-10 text-center">
        <div className="max-w-4xl mx-auto bg-[#0c0617] p-8 sm:p-14 rounded-[4px] border border-white/10 shadow-2xl relative overflow-hidden">
          <div
            className="absolute top-0 right-0 w-[40%] h-full bg-[#220090] clip-diagonal-split pointer-events-none opacity-60"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="font-bebas text-xs sm:text-sm tracking-[0.24em] text-[#681fe4] uppercase block mb-2">
              Compounding Growth Blueprint
            </span>
            <h2 className="text-3xl sm:text-5xl font-bebas tracking-[0.06em] text-white uppercase leading-none mb-4">
              WANT TO SEE SIMILAR REVENUE EXPANSION FOR YOUR BRAND?
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto mb-8 leading-relaxed font-normal">
              Let our senior technical architects conduct an in-depth audit of your digital presence and provide an actionable growth blueprint.
            </p>
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 bg-[#681fe4] hover:bg-[#5815cb] text-white font-bebas text-base tracking-[0.18em] px-8 py-4 rounded-[4px] shadow-lg shadow-[#681fe4]/30 hover:scale-[1.02] transition-all cursor-pointer"
            >
              <span>BOOK YOUR FREE GROWTH AUDIT →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Global Two-Tier Modern Industrial Footer */}
      <Footer />
    </div>
  );
}
