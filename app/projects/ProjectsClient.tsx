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

  // The 6 clean showcase preview cards mapped 1:1 to case studies, straightened without overlapping clutter (Issue 3)
  const showcaseCards = [
    {
      id: "card-fashion",
      projectId: "fashion-brand",
      title: "Luxe Fashion US",
      subtitle: "Headless Next.js Storefront",
      tag: "E-Commerce & SEO",
      stat: "+340%",
      statLabel: "Organic Revenue",
      country: "Los Angeles, USA 🇺🇸",
      img: "/images/projects/fashion-brand.jpg",
      type: "image-card",
    },
    {
      id: "card-fitness",
      projectId: "fitness-app",
      title: "PulseFit Pro",
      subtitle: "60fps App Funnel & CRO",
      tag: "Mobile App & SaaS",
      stat: "50,000+",
      statLabel: "Active Downloads",
      country: "Austin, TX, USA 🇺🇸",
      type: "stat-card-white",
      points: ["One-tap Apple & Google Auth", "Sub-90s Onboarding Funnel", "4.9★ App Store Ranking"],
      highlight: "Top 10 App Store Rank",
    },
    {
      id: "card-local",
      projectId: "local-growth",
      title: "Apex Dental UK",
      subtitle: "London Geo-Routing & Maps",
      tag: "Local SEO 3-Pack",
      stat: "#1 Rank",
      statLabel: "Across 18 Boroughs",
      country: "London, UK 🇬🇧",
      img: "/images/projects/local-growth.jpg",
      type: "image-card",
    },
    {
      id: "card-saas",
      projectId: "saas-pipeline",
      title: "CloudSync Tech",
      subtitle: "Programmatic Pipeline Engine",
      tag: "Technical SEO & CRO",
      stat: "+420%",
      statLabel: "Demo Bookings Lift",
      country: "San Francisco, USA 🇺🇸",
      type: "stat-card-white",
      points: ["450+ Programmatic Pages", "DA 32 → 64 Authority Lift", "$180K/mo Organic Pipeline"],
      highlight: "B2B SaaS Growth Engine",
    },
    {
      id: "card-realestate",
      projectId: "dubai-real-estate",
      title: "Horizon Luxury",
      subtitle: "Dubai Multilingual Portal",
      tag: "Luxury Real Estate",
      stat: "$18.5M",
      statLabel: "Verified Inquiries",
      country: "Dubai, UAE 🇦🇪",
      img: "/images/projects/real-estate.jpg",
      type: "image-card",
    },
    {
      id: "card-fintech",
      projectId: "fintech-app",
      title: "VenturePay Global",
      subtitle: "Bank-Grade Remittance Platform",
      tag: "Fintech Platform",
      stat: "100K+",
      statLabel: "Monthly Active Users",
      country: "Toronto, Canada 🇨🇦",
      img: "/images/projects/fintech-app.jpg",
      type: "image-card",
    },
  ];

  return (
    <div className="relative min-h-screen bg-white text-slate-900 overflow-hidden selection:bg-amber-100 selection:text-amber-900 font-sans">
      
      {/* Background Subtle Warm Mesh & Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(217,119,6,0.04)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Floating Toast Notification */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-24 right-6 z-50 bg-white text-slate-900 border border-amber-300 px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-fadeIn text-xs font-semibold backdrop-blur-xl"
        >
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
          <span>{toast}</span>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="ml-2 text-slate-400 hover:text-slate-700 text-xs cursor-pointer p-0.5"
            aria-label="Close notification"
          >
            ✕
          </button>
        </div>
      )}

      {/* Sticky Global 2-Tier Navbar */}
      <Navbar activePage="projects" />

      {/* =========================================================================
          HERO SECTION (White & Yellow-Golden Luxury Theme, Strict Semantic H1)
         ========================================================================= */}
      <section
        id="projects-hero"
        className="relative w-full pt-12 sm:pt-16 pb-16 sm:pb-20 px-4 sm:px-6 md:px-12 text-center z-10 overflow-hidden bg-gradient-to-b from-[#fefbf6] via-white to-white"
      >
        {/* Soft Ambient Gold Glow */}
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[650px] sm:w-[950px] h-[450px] rounded-full pointer-events-none blur-[120px] opacity-25"
          style={{ background: "radial-gradient(circle, #f59e0b 0%, #d97706 40%, transparent 70%)" }}
          aria-hidden="true"
        />

        {/* Master Heading Block */}
        <div className="max-w-4xl mx-auto relative z-20 mb-12 sm:mb-16">
          
          {/* Micro-badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 text-xs font-bold mb-6 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="tracking-wide">Enterprise Growth &amp; Verified Case Studies</span>
          </div>

          {/* Issue 2 Fix: Semantic Top-Level H1 Heading */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-950 leading-[1.12] mb-5">
            Proven Digital Growth &amp;{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700">
              Verified Client Results
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed mb-8 px-4">
            Explore 6 comprehensive case studies showcasing compounding organic traffic, international search dominance, and high-converting headless Next.js web systems.
          </p>

          {/* Hero Action Buttons (Issue 1 Standardized Style) */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#case-studies-archive"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-600 hover:to-yellow-500 shadow-md shadow-amber-900/15 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>Explore All 6 Case Studies</span>
              <span className="text-xs">↓</span>
            </a>
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-slate-700 bg-white hover:bg-amber-50/60 border border-amber-200/80 shadow-xs hover:border-amber-300 transition-all cursor-pointer"
            >
              <span>Request Growth Audit</span>
              <span className="text-amber-600">→</span>
            </Link>
          </div>
        </div>

        {/* =====================================================================
            Issue 3 Fix: STRAIGHTENED SHOWCASE CARDS (No Overlapping Tilted Clutter)
           ===================================================================== */}
        <div className="max-w-6xl mx-auto mb-10">
          <div className="text-left mb-4 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Quick Client Switcher (Click Any Card to Preview)
            </span>
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">
              6 Verified Implementations
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {showcaseCards.map((card, idx) => {
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
                  className={`p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "bg-amber-50/90 border-amber-400 shadow-md shadow-amber-900/10 ring-2 ring-amber-400/40"
                      : "bg-white hover:bg-[#fffdfa] border-amber-200/70 hover:border-amber-300 shadow-xs"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-700 truncate">
                        {card.tag}
                      </span>
                      <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md shrink-0">
                        {card.stat}
                      </span>
                    </div>
                    {/* Issue 13 Fix: Semantic H3 Heading */}
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug truncate">
                      {card.title}
                    </h3>
                    {/* Issue 8 Fix: Body text at least 12px (text-xs) */}
                    <p className="text-xs text-slate-500 leading-tight mt-1 line-clamp-1">
                      {card.subtitle}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-amber-200/50 flex items-center justify-between">
                    <span className="text-xs text-slate-600 font-medium truncate">
                      {card.country}
                    </span>
                    <span
                      className={`text-xs font-bold transition-transform ${
                        isSelected ? "text-amber-600 translate-x-0.5" : "text-slate-400"
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
            FEATURED CASE STUDY BROWSER WINDOW SHOWCASE
           ===================================================================== */}
        <div className="relative max-w-5xl mx-auto text-left">
          <div className="w-full rounded-2xl border border-amber-200/80 bg-white shadow-xl shadow-amber-950/5 overflow-hidden">
            
            {/* macOS Browser Chrome Bar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-amber-200/60 bg-[#fdfaf5]">
              {/* Window Controls */}
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>

              {/* URL Address Bar */}
              <div className="flex-1 max-w-md mx-3">
                <div className="flex items-center justify-center gap-2 bg-white border border-amber-200/80 rounded-lg px-3 py-1.5 text-xs text-slate-700 shadow-2xs">
                  <span className="text-amber-600 text-xs">🔒</span>
                  <span className="truncate font-mono text-xs text-slate-800">
                    balajiprimemedia.in/projects/{activeProject.id}
                  </span>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="hidden sm:inline">Active Production Case</span>
              </div>
            </div>

            {/* Inner Browser Viewport Content */}
            <div className="p-4 sm:p-8 bg-[#fffdfa]">
              
              {/* Inner Website Nav */}
              <div className="flex items-center justify-between pb-4 border-b border-amber-200/60 mb-6">
                <div className="text-center w-full">
                  <span className="text-xs sm:text-sm tracking-[0.2em] font-bold text-amber-800 uppercase">
                    {activeProject.shortTitle.toUpperCase()} • {activeProject.country}
                  </span>
                </div>
              </div>

              {/* Inner Website Hero Banner with Real Project Image */}
              <div className="relative rounded-2xl overflow-hidden min-h-[260px] sm:min-h-[320px] flex items-center p-6 sm:p-10 shadow-sm border border-amber-200/60">
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
                  className="absolute inset-0 w-full h-full object-cover brightness-[0.75] contrast-[1.05]"
                />
                
                {/* Warm Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/50 to-transparent" />

                {/* Content Overlay */}
                <div className="relative z-10 max-w-md text-white">
                  {/* Issue 11 Fix: Text at least 12px (text-xs) */}
                  <span className="text-xs uppercase font-bold tracking-wider text-amber-300 block mb-2">
                    Verified Client Case Study • {activeProject.category}
                  </span>
                  
                  {/* Issue 13 Fix: Semantic H2 / H3 */}
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mb-4 text-white">
                    {activeProject.heroMetric}
                  </h2>
                  
                  {/* Primary CTA button linking to deep dive */}
                  <Link
                    href={`/projects/${activeProject.id}`}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-yellow-600 text-white font-sans text-xs sm:text-sm font-bold uppercase tracking-wider px-5 py-2.5 rounded-full shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Explore Full Case Study</span>
                    <span>→</span>
                  </Link>
                </div>

                {/* Floating Metric Callout on right side */}
                <div className="absolute right-4 bottom-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-amber-200/80 shadow-lg text-slate-900 text-right hidden sm:block">
                  <span className="text-2xl sm:text-3xl font-black block leading-none text-slate-950">
                    {activeProject.stat}
                  </span>
                  {/* Issue 10 Fix: Text at least 12px (text-xs) */}
                  <span className="text-xs text-slate-600 font-bold block mt-1">
                    {activeProject.statLabel}
                  </span>
                </div>
              </div>

              {/* ===============================================================
                  Issue 4 Fix: DE-DENSIFIED CORE METRICS & PROVEN OUTCOMES
                 =============================================================== */}
              <div className="pt-6 sm:pt-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Core Metrics &amp; Proven Outcomes
                  </h3>
                  {/* Issue 12 Fix: Text size at least 12px (text-xs sm:text-sm) */}
                  <Link
                    href={`/projects/${activeProject.id}`}
                    className="text-xs sm:text-sm text-amber-600 hover:text-amber-700 font-bold transition-colors inline-flex items-center gap-1"
                  >
                    <span>Read complete technical breakdown</span>
                    <span>→</span>
                  </Link>
                </div>

                {/* Generous spacing and clean padding for metrics cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {activeProject.metrics.map((m, mIdx) => (
                    <div
                      key={mIdx}
                      className="bg-white p-4 sm:p-5 rounded-xl border border-amber-200/80 shadow-xs text-left hover:border-amber-300 transition-all"
                    >
                      <span className="text-sm sm:text-base font-black text-slate-950 block leading-tight">
                        {m.value}
                      </span>
                      <span className="text-xs text-slate-600 block leading-snug mt-1 font-medium">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Quick Interactive Project Selector Strip below the browser */}
            <div className="px-4 sm:px-6 py-3.5 bg-[#fefbf6] border-t border-amber-200/60 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-slate-600 text-xs">
                Active Preview: <strong className="text-amber-700">{activeProject.title}</strong>
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
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeProjectIndex === idx
                        ? "bg-amber-500 text-white shadow-xs"
                        : "bg-white text-slate-700 border border-amber-200/70 hover:bg-amber-50"
                    }`}
                  >
                    {study.shortTitle}
                  </button>
                ))}
              </div>

              <Link
                href={`/projects/${activeProject.id}`}
                className="inline-flex items-center gap-1 text-amber-600 hover:text-amber-700 font-bold text-xs"
              >
                <span>Read Full Case Study</span>
                <span>→</span>
              </Link>
            </div>

          </div>
        </div>

      </section>

      {/* =========================================================================
          FULL ARCHIVE DIRECTORY (All 6 Case Studies in Luxury Bento Aesthetic)
         ========================================================================= */}
      <section
        id="case-studies-archive"
        className="relative py-16 sm:py-24 px-4 sm:px-6 md:px-12 z-10 max-w-7xl mx-auto"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-xs font-semibold text-amber-800 mb-3 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>Verified Client Archive</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight mb-3">
            All 6 Case Studies &amp; Client Results
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Click on any case study below to inspect full challenges, technical architecture, and verified return on investment.
          </p>

          {/* Issue 17 Fix: Adequate Spacing (mt-8 sm:mt-10 mb-8 sm:mb-10) for Category Filter Pills */}
          <div className="mt-8 sm:mt-10 mb-8 sm:mb-10 inline-flex flex-wrap justify-center p-1.5 bg-[#fefbf6] rounded-2xl border border-amber-200/80 shadow-xs gap-1.5">
            {[
              { id: "all", label: "All Projects (6)" },
              { id: "ecommerce", label: "E-Commerce (2)" },
              { id: "saas", label: "B2B SaaS (2)" },
              { id: "seo", label: "Local SEO (1)" },
              { id: "mobile", label: "Mobile Apps (1)" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setFilter(tab.id);
                  showToast(`Filter: ${tab.label}`);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filter === tab.id
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-950 hover:bg-white"
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
              className="bg-white hover:bg-[#fffdfa] rounded-2xl border border-amber-200/70 hover:border-amber-400/80 shadow-sm hover:shadow-xl hover:shadow-amber-900/10 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
            >
              <div>
                {/* 1. Cover Image with hover zoom (16:10 aspect ratio) */}
                <Link
                  href={`/projects/${study.id}`}
                  prefetch={false}
                  className="block relative aspect-[16/10] overflow-hidden bg-slate-100"
                >
                  <img
                    src={study.coverImage || "/images/projects/fashion-brand.jpg"}
                    alt={study.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  
                  {/* Floating Category Badge */}
                  <span className="absolute top-3.5 left-3.5 text-xs font-bold bg-white/95 text-amber-800 border border-amber-200 px-3 py-1 rounded-full shadow-xs backdrop-blur-sm">
                    {study.category}
                  </span>

                  {/* Floating Country Flag Badge */}
                  <span className="absolute top-3.5 right-3.5 text-xs bg-slate-900/80 text-white px-2.5 py-1 rounded-full border border-white/10 shadow-xs font-medium backdrop-blur-sm">
                    {study.country}
                  </span>

                  {/* Floating Bottom Metric Pill */}
                  <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3.5 py-1.5 rounded-xl border border-amber-200/80 flex items-center gap-2 shadow-md">
                    <span className="text-sm font-black text-amber-600 leading-none">
                      {study.stat}
                    </span>
                    <span className="text-xs text-slate-600 font-semibold leading-tight">
                      {study.statLabel}
                    </span>
                  </div>
                </Link>

                {/* 2. Content Details */}
                <div className="p-6">
                  {/* Badge & Timeline Meta */}
                  <div className="flex items-center gap-2 text-xs text-amber-700 mb-2.5 font-medium">
                    <span className="font-bold">{study.badge}</span>
                    <span>•</span>
                    <span className="text-slate-500">{study.timeline}</span>
                  </div>

                  {/* Issue 13 Fix: Semantic H3 Heading */}
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors leading-snug line-clamp-2 mb-2">
                    <Link href={`/projects/${study.id}`} prefetch={false} className="hover:underline">
                      {study.title}
                    </Link>
                  </h3>

                  {/* Client Info */}
                  <p className="text-xs text-slate-500 font-medium mb-3">
                    {study.client}
                  </p>

                  {/* Overview Excerpt */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5 line-clamp-3 font-normal">
                    {study.overview}
                  </p>

                  {/* Key Metrics Grid (3 cols) */}
                  <div className="grid grid-cols-3 gap-2 bg-[#fdfbf7] p-3 rounded-xl border border-amber-200/60 mb-5 text-center">
                    {study.metrics.slice(0, 3).map((m, mIdx) => (
                      <div key={mIdx}>
                        <span className="text-xs sm:text-sm font-black text-slate-950 block leading-tight">
                          {m.value}
                        </span>
                        <span className="text-xs text-slate-500 leading-tight block mt-0.5">
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
                        className="text-xs font-medium bg-amber-50 text-amber-900 px-2.5 py-1 rounded-lg border border-amber-200/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3. Card Footer Action (Issue 1 Standardized Button) */}
              <div className="px-6 pb-6 pt-0 mt-auto">
                <Link
                  href={`/projects/${study.id}`}
                  prefetch={false}
                  className="w-full inline-flex items-center justify-between px-4 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-yellow-600 shadow-xs hover:shadow-md transition-all cursor-pointer"
                >
                  <span>View Full Case Study</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* =========================================================================
          BOTTOM CTA BANNER (White & Yellow-Golden Luxury Style)
         ========================================================================= */}
      <section className="relative py-14 sm:py-20 px-4 sm:px-6 md:px-12 z-10 text-center">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#fffdf8] via-[#fef9ee] to-[#fffdf8] p-8 sm:p-12 rounded-3xl border border-amber-200/80 shadow-xl text-slate-900">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 mb-3">
            Want to See Similar Compounding Growth for Your Business?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto mb-6 leading-relaxed">
            Let our technical architects conduct an in-depth audit of your digital presence and provide an actionable growth blueprint.
          </p>
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-yellow-600 text-white text-xs sm:text-sm font-bold px-8 py-3.5 rounded-full shadow-md shadow-amber-900/15 hover:scale-105 transition-all cursor-pointer"
          >
            <span>Book Your Free Growth Audit</span>
            <span>→</span>
          </Link>
        </div>
      </section>

      {/* Global Clean Luxury Footer */}
      <Footer />
    </div>
  );
}
