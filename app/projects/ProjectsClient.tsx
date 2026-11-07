"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LiquidGlassProjectsHero from "../components/LiquidGlassProjectsHero";
import { caseStudiesData, CaseStudyData } from "./projectsData";

export default function ProjectsClient() {
  const [filter, setFilter] = useState<string>("all");
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const filteredStudies = filter === "all"
    ? caseStudiesData
    : caseStudiesData.filter((s) => s.categoryGroup === filter);

  const activeProject = caseStudiesData[activeProjectIndex] || caseStudiesData[0];

  // Specific visual showcase data for the 3D curved cards matching Image 2
  const showcaseCards = [
    {
      id: "card-ritual",
      projectId: "fashion-brand",
      title: "RITUAL REGIME",
      subtitle: "Luxury Botanical Skincare",
      tag: "E-Commerce",
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=85",
      type: "image-card",
      tilted: "-rotate-[22deg] -translate-x-32 sm:-translate-x-44 translate-y-8 scale-90",
      accent: "#a855f7",
    },
    {
      id: "card-model",
      projectId: "fashion-brand",
      title: "EDITORIAL EDIT",
      subtitle: "Haute Couture Spring",
      tag: "Fashion US",
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=85",
      type: "image-card",
      tilted: "-rotate-[13deg] -translate-x-16 sm:-translate-x-24 translate-y-3 scale-95",
      accent: "#ec4899",
    },
    {
      id: "card-checkouts",
      projectId: "fitness-app",
      title: "CHECKOUTS QUICK N SIMPLE",
      subtitle: "Spend via Apple Pay • Sub-1s Speed",
      tag: "CRO & Performance",
      type: "stat-card-white",
      stat: "+48% Lift",
      tilted: "-rotate-[6deg] -translate-x-4 sm:-translate-x-8 translate-y-0 scale-100",
      accent: "#ef4444",
    },
    {
      id: "card-collection",
      projectId: "dubai-real-estate",
      title: "COLLECTION EXCLUSIVE!",
      subtitle: "Off-Plan Beachfront Villas",
      tag: "Luxury Catalog",
      type: "pink-badge",
      stat: "$18.5M Pipe",
      tilted: "rotate-[6deg] translate-x-4 sm:translate-x-8 translate-y-0 scale-100",
      accent: "#f472b6",
    },
    {
      id: "card-product",
      projectId: "local-growth",
      title: "ORGANIC HYDRATION",
      subtitle: "100% Verified Local Authority",
      tag: "Local SEO 3-Pack",
      img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=500&q=85",
      type: "image-card",
      tilted: "rotate-[13deg] translate-x-16 sm:translate-x-24 translate-y-3 scale-95",
      accent: "#06b6d4",
    },
    {
      id: "card-ships",
      projectId: "fintech-app",
      title: "SHIPS GRATIS +",
      subtitle: "Multi-Currency Escrow",
      tag: "Bank-Grade Platform",
      img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=500&q=85",
      type: "purple-gradient",
      stat: "100K+ MAU",
      tilted: "rotate-[22deg] translate-x-32 sm:translate-x-44 translate-y-8 scale-90",
      accent: "#8b5cf6",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#040308] text-white overflow-hidden">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-24 right-6 z-50 bg-[#091427] text-white border border-cyan-500/60 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-fadeIn text-xs font-semibold backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>{toast}</span>
          <button onClick={() => setToast(null)} className="ml-2 text-gray-400 hover:text-white text-xs cursor-pointer">✕</button>
        </div>
      )}

      {/* 100% Transparent Navbar Overlay */}
      <div className="absolute top-0 left-0 right-0 z-40 bg-transparent pointer-events-auto">
        <Navbar activePage="projects" />
      </div>

      {/* Full-Screen Liquid Glass Looping Background Video Hero */}
      <LiquidGlassProjectsHero />

      {/* =========================================================================
          STREAMLINE THE SHOP PROCESS — 3D CURVED CASE STUDY SHOWCASE (Image 2 Design)
          - Deep dark space background with ambient radial stars
          - "⚡ Professionals at store startup" cyan badge
          - "STREAMLINE THE SHOP PROCESS" bold master typography
          - Glowing "See prices / Explore Case Studies" button
          - 3D perspective curved card fan
          - Centerpiece dark browser mockup window showing live interactive project
          - Clickable into case study detail pages (/projects/[slug])
          - NO WhatsApp floating button
         ========================================================================= */}
      <section
        id="projects-grid"
        className="relative w-full pt-20 sm:pt-28 pb-20 px-4 sm:px-6 md:px-12 text-center z-10 overflow-hidden bg-[#040308]"
      >
        {/* Ambient Cosmic Lights & Starlight Dust */}
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] sm:w-[1000px] h-[500px] rounded-full pointer-events-none blur-[120px] opacity-25"
          style={{ background: "radial-gradient(circle, #22d3ee 0%, #a855f7 40%, transparent 70%)" }}
          aria-hidden="true"
        />

        {/* Top Header Block matching Image 2 */}
        <div className="max-w-4xl mx-auto relative z-20 mb-10 sm:mb-14">
          
          {/* Cyan Glowing Pill: "⚡ Professionals at store startup" */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#071322]/90 border border-cyan-400/50 text-cyan-300 text-xs font-semibold mb-6 shadow-[0_0_20px_rgba(34,211,238,0.35)] backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="tracking-wide">⚡ Professionals at store startup</span>
          </div>

          {/* Master Heading matching Image 2 */}
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-[1.08] mb-5 drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
            STREAMLINE THE SHOP<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
              PROCESS
            </span>
          </h2>

          {/* Subtitle matching Image 2 */}
          <p className="text-xs sm:text-sm md:text-base text-gray-300 max-w-2xl mx-auto font-normal leading-relaxed mb-8 px-4">
            Restructuring store systems / E-commerce orchestrated with checkouts, performance, a sustainable expansion.
          </p>

          {/* Glowing Cyan Button: "See prices" / "Explore Case Studies" */}
          <div className="flex justify-center">
            <a
              href="#case-studies-archive"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full text-xs sm:text-sm font-bold text-cyan-200 bg-gradient-to-r from-cyan-950/80 via-[#0a233a] to-cyan-950/80 border border-cyan-400/70 shadow-[0_0_25px_rgba(34,211,238,0.4),inset_0_1px_2px_rgba(255,255,255,0.4)] hover:shadow-[0_0_35px_rgba(34,211,238,0.7)] hover:border-cyan-300 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              See prices &amp; case studies
            </a>
          </div>
        </div>

        {/* =====================================================================
            3D PERSPECTIVE CAROUSEL & BROWSER WINDOW SHOWCASE
           ===================================================================== */}
        <div className="relative max-w-6xl mx-auto pt-6 pb-12 sm:pb-16 flex flex-col items-center">
          
          {/* Background 3D Fan-out Cards Array (Angled in space like Image 2) */}
          <div className="relative w-full flex items-center justify-center -mb-32 sm:-mb-44 z-10 pointer-events-none select-none">
            <div className="relative w-full max-w-5xl h-64 sm:h-80 flex items-center justify-center overflow-visible">
              
              {showcaseCards.map((card, idx) => (
                <div
                  key={card.id}
                  onClick={() => {
                    const foundIdx = caseStudiesData.findIndex((s) => s.id === card.projectId);
                    if (foundIdx !== -1) setActiveProjectIndex(foundIdx);
                  }}
                  className={`absolute w-36 sm:w-52 h-48 sm:h-72 rounded-2xl sm:rounded-3xl border border-white/15 overflow-hidden shadow-2xl transition-all duration-500 pointer-events-auto cursor-pointer hover:scale-105 hover:z-30 hover:border-cyan-400 ${card.tilted}`}
                  style={{
                    backgroundColor: "#0d091b",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.8)",
                  }}
                >
                  {card.type === "image-card" && card.img && (
                    <div className="relative w-full h-full">
                      <img
                        src={card.img}
                        alt={card.title}
                        className="w-full h-full object-cover brightness-75 contrast-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 text-left">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-cyan-300 block">
                          {card.tag}
                        </span>
                        <h4 className="text-xs sm:text-sm font-black text-white leading-tight uppercase">
                          {card.title}
                        </h4>
                      </div>
                    </div>
                  )}

                  {card.type === "stat-card-white" && (
                    <div className="w-full h-full bg-[#fbf9f5] text-[#0f0e13] p-4 flex flex-col justify-between text-left">
                      <div>
                        <span className="text-[9px] font-extrabold uppercase tracking-wider text-rose-600 block mb-1">
                          {card.tag}
                        </span>
                        <h4 className="text-xs sm:text-sm font-black uppercase text-rose-600 leading-tight">
                          CHECKOUTS<br />QUICK N SIMPLE
                        </h4>
                        <ul className="text-[10px] text-gray-600 mt-2 space-y-1 font-medium">
                          <li>• Spend via Apple Pay</li>
                          <li>• Sub-1s page load</li>
                          <li>• Zero friction form</li>
                        </ul>
                      </div>
                      <div className="bg-rose-50 border border-rose-200/80 px-2 py-1 rounded-lg">
                        <span className="text-xs font-black text-rose-600">{card.stat}</span>
                      </div>
                    </div>
                  )}

                  {card.type === "pink-badge" && (
                    <div className="w-full h-full bg-gradient-to-b from-[#fce7f3] to-[#f472b6] text-[#831843] p-4 flex flex-col justify-between text-left">
                      <div>
                        <span className="text-[9px] font-extrabold uppercase tracking-wider text-pink-900 block mb-1">
                          {card.tag}
                        </span>
                        <h4 className="text-xs sm:text-sm font-black uppercase text-pink-900 leading-tight">
                          COLLECTION<br />EXCLUSIVE!
                        </h4>
                        <p className="text-[10px] text-pink-800 mt-2 font-medium">
                          Off-plan luxury villas with 3D tours
                        </p>
                      </div>
                      <div className="bg-white/80 backdrop-blur-xs px-2.5 py-1 rounded-lg">
                        <span className="text-xs font-black text-pink-900">{card.stat}</span>
                      </div>
                    </div>
                  )}

                  {card.type === "purple-gradient" && (
                    <div className="w-full h-full bg-gradient-to-b from-[#6366f1] via-[#7c3aed] to-[#4338ca] text-white p-4 flex flex-col justify-between text-left">
                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-purple-200 block mb-1">
                          {card.tag}
                        </span>
                        <h4 className="text-sm sm:text-base font-black uppercase tracking-tight text-white leading-tight">
                          SHIPS<br />GRATIS +
                        </h4>
                        <p className="text-[10px] text-purple-200 mt-2 font-light">
                          Bank-grade cross-border remittance
                        </p>
                      </div>
                      <div className="bg-black/30 backdrop-blur-xs px-2.5 py-1 rounded-lg">
                        <span className="text-xs font-black text-white">{card.stat}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}

            </div>
          </div>

          {/* ===================================================================
              CENTERPIECE BROWSER WINDOW MOCKUP (Exact Foreground from Image 2)
              - Window dots: Red, Amber, Green
              - Search bar in center: "🔍 Shop Focused - Skin Care"
              - Clean luxury storefront hero banner: "GLOW SKIN CARE"
              - "Let your beauty be sacred." with "EXPLORE TODAY" button
              - Bottom "Best reviewed" row
              - Direct Link to /projects/${activeProject.id}
             =================================================================== */}
          <div className="relative z-20 w-full max-w-4xl rounded-2xl sm:rounded-3xl border border-white/20 bg-[#0e091d]/95 backdrop-blur-2xl shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden text-left">
            
            {/* Browser Window Header Chrome Bar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10 bg-[#080514]/90">
              
              {/* Window Controls (Red, Amber, Green) */}
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ef4444]" />
                <span className="w-3 h-3 rounded-full bg-[#eab308]" />
                <span className="w-3 h-3 rounded-full bg-[#22c55e]" />
              </div>

              {/* Center Address / Search Bar */}
              <div className="flex-1 max-w-md mx-3">
                <div className="flex items-center justify-center gap-2 bg-[#17102e] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-gray-300">
                  <span className="text-gray-400 text-[11px]">🔍</span>
                  <span className="truncate font-mono text-[11px] text-gray-200">
                    balajiprimemedia.in/projects/{activeProject.id}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 text-gray-400 text-xs">
                <span className="hover:text-white cursor-pointer">⬆</span>
                <span className="hover:text-white cursor-pointer">+</span>
                <span className="hover:text-white cursor-pointer">⚙</span>
              </div>
            </div>

            {/* Inner Browser Viewport Content — Showcase Website */}
            <div className="p-4 sm:p-8 bg-[#fdfaf5] text-[#1a1714]">
              
              {/* Inner Website Nav */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-6">
                <div className="text-center w-full">
                  <span className="text-base sm:text-lg font-serif tracking-[0.25em] font-bold text-stone-900 uppercase">
                    GLOW SKIN CARE • {activeProject.shortTitle.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Inner Website Hero Banner with Cosmetics/Product Image */}
              <div className="relative rounded-2xl overflow-hidden min-h-[220px] sm:min-h-[280px] flex items-center p-6 sm:p-10 shadow-inner">
                {/* Product Banner Background */}
                <img
                  src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=85"
                  alt="Glow Skin Care"
                  className="absolute inset-0 w-full h-full object-cover brightness-[0.92] contrast-[1.05]"
                />
                
                {/* Soft warm vignette */}
                <div className="absolute inset-0 bg-gradient-to-r from-stone-900/60 via-stone-900/30 to-transparent" />

                {/* Content Overlay */}
                <div className="relative z-10 max-w-sm text-white">
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-amber-200 block mb-2">
                    JUST ADDED • VERIFIED CLIENT OUTCOME
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-serif font-light leading-tight mb-4">
                    Let your beauty<br />be sacred.
                  </h3>
                  
                  {/* Primary CTA button linking to this exact case study deep dive */}
                  <Link
                    href={`/projects/${activeProject.id}`}
                    className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white font-sans text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-lg shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Explore Today</span>
                    <span>→</span>
                  </Link>
                </div>

                {/* Floating Metric Callout on right side */}
                <div className="absolute right-4 bottom-4 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-stone-200 shadow-lg text-stone-900 text-right hidden sm:block">
                  <span className="text-xl font-black block leading-none text-[#091427]">
                    {activeProject.stat}
                  </span>
                  <span className="text-[10px] text-stone-600 font-semibold">
                    {activeProject.statLabel}
                  </span>
                </div>
              </div>

              {/* Bottom "Best reviewed" row inside the browser */}
              <div className="pt-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-serif font-bold text-stone-800 uppercase tracking-wider">
                    Best reviewed deliverables &amp; impact
                  </span>
                  <Link
                    href={`/projects/${activeProject.id}`}
                    className="text-[10px] text-stone-500 hover:text-stone-900 font-medium underline"
                  >
                    See study metrics →
                  </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {activeProject.metrics.map((m, mIdx) => (
                    <div
                      key={mIdx}
                      className="bg-white p-3 rounded-xl border border-stone-200/90 shadow-2xs text-left"
                    >
                      <span className="text-xs sm:text-sm font-bold text-stone-900 block leading-tight">
                        {m.value}
                      </span>
                      <span className="text-[10px] text-stone-500 block leading-tight mt-0.5">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Quick Interactive Project Selector Strip below the browser */}
            <div className="px-4 sm:px-6 py-3.5 bg-[#0a0618] border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-gray-400 text-[11px]">
                Showing: <strong className="text-cyan-300">{activeProject.title}</strong>
              </span>

              <div className="flex items-center gap-1.5">
                {caseStudiesData.map((study, idx) => (
                  <button
                    key={study.id}
                    onClick={() => setActiveProjectIndex(idx)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeProjectIndex === idx
                        ? "bg-cyan-500 text-black shadow-md shadow-cyan-500/50"
                        : "bg-white/10 text-gray-300 hover:bg-white/20"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>

              <Link
                href={`/projects/${activeProject.id}`}
                className="inline-flex items-center gap-1.5 text-cyan-300 hover:text-cyan-200 font-bold text-[11px] underline"
              >
                <span>Read Full Case Study</span>
                <span>→</span>
              </Link>
            </div>

          </div>

        </div>

      </section>

      {/* =========================================================================
          FULL ARCHIVE DIRECTORY (All 6 Case Studies with Interactive Filters)
          - Every single case study can be opened directly
          - Luxury dark mode cards matching the Streamline theme
          - Retains all metrics, deliverables, tech stacks
         ========================================================================= */}
      <section
        id="case-studies-archive"
        className="relative py-14 sm:py-20 px-4 sm:px-6 md:px-12 z-10 max-w-7xl mx-auto"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181033] border border-purple-500/30 text-xs font-semibold text-purple-200 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#c084fc] animate-ping" />
            <span>Verified Client Archive</span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
            All 6 Case Studies &amp; Client Results
          </h3>
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto">
            Click on any case study below to inspect full challenges, technical architecture, and verified return on investment.
          </p>

          {/* Interactive Category Filter Pills */}
          <div className="inline-flex flex-wrap justify-center p-1.5 bg-[#0f0a24] rounded-2xl border border-white/10 shadow-inner gap-1 mt-6">
            {[
              { id: "all", label: "All Projects (6)" },
              { id: "ecommerce", label: "E-Commerce (2)" },
              { id: "saas", label: "B2B SaaS (2)" },
              { id: "seo", label: "Local SEO (1)" },
              { id: "mobile", label: "Mobile Apps (1)" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setFilter(tab.id);
                  showToast(`Filter: ${tab.label}`);
                }}
                className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filter === tab.id
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-950/80"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredStudies.map((study) => (
            <Link
              key={study.id}
              href={`/projects/${study.id}`}
              className="bg-[#0e0921]/90 rounded-3xl border border-white/10 p-6 shadow-xl flex flex-col justify-between group cursor-pointer transition-all duration-300 hover:border-purple-500/60 hover:-translate-y-1 backdrop-blur-xl"
            >
              <div>
                {/* Visual Header Mockup */}
                <div
                  className={`relative bg-gradient-to-tr ${study.bgGradient} rounded-2xl h-48 flex flex-col items-center justify-center p-4 overflow-hidden mb-5 border border-white/10`}
                >
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-[10px] font-bold px-3 py-1 rounded-full text-white shadow-xs">
                    {study.category}
                  </div>
                  <div className="text-5xl mb-2 group-hover:scale-110 transition-transform">
                    {study.visual}
                  </div>
                  <div className="bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/15 text-center shadow-lg">
                    <span className="text-base font-black text-cyan-300 block leading-none">
                      {study.stat}
                    </span>
                    <span className="text-[10px] text-gray-300 font-semibold">{study.statLabel}</span>
                  </div>
                </div>

                {/* Badge */}
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300 bg-purple-950/60 border border-purple-500/30 px-2.5 py-1 rounded-md">
                  {study.badge}
                </span>

                <h4 className="text-lg font-bold text-white mt-3 mb-1 group-hover:text-cyan-300 transition-colors">
                  {study.title}
                </h4>
                <p className="text-xs text-gray-400 font-medium mb-3">{study.client}</p>
                <p className="text-xs text-gray-300 leading-relaxed mb-5 line-clamp-3 font-light">
                  {study.overview}
                </p>

                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-2 bg-[#140d2f]/70 p-3 rounded-xl border border-white/5 mb-5 text-center">
                  {study.metrics.slice(0, 3).map((m, mIdx) => (
                    <div key={mIdx}>
                      <span className="text-xs font-bold text-cyan-300 block">{m.value}</span>
                      <span className="text-[9.5px] text-gray-400 leading-tight block">{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Chips & Action */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {study.tech.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-medium bg-white/5 text-gray-300 px-2 py-0.5 rounded-md border border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="w-full inline-flex items-center justify-center gap-2 text-xs font-bold text-white bg-gradient-to-r from-purple-700 to-indigo-700 group-hover:brightness-110 py-3 rounded-xl transition-all shadow-md">
                  <span>View Full Case Study</span>
                  <span>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="relative py-12 sm:py-16 px-4 sm:px-6 md:px-12 z-10 text-center">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#120a2e] via-[#1a113d] to-[#120a2e] p-8 sm:p-12 rounded-[32px] border border-purple-500/30 shadow-2xl text-white">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
            Want to See Similar Compounding Growth for Your Business?
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto mb-6 leading-relaxed">
            Let us conduct an audit of your current digital presence and build an actionable growth roadmap.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 text-white text-xs font-bold px-8 py-3.5 rounded-full shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
          >
            <span>Book Your Free Growth Audit</span>
            <span>→</span>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
