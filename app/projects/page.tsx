"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { caseStudiesData } from "./projectsData";

export default function ProjectsPage() {
  const [filter, setFilter] = useState<string>("all");
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const filteredStudies = filter === "all"
    ? caseStudiesData
    : caseStudiesData.filter((s) => s.categoryGroup === filter);

  return (
    <div className="relative min-h-screen bg-[#f8fbf9] text-[#111827] overflow-hidden">
      <div className="curved-ribbon-left" aria-hidden="true" />
      <div className="curved-ribbon-right" aria-hidden="true" />

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-24 right-6 z-50 bg-[#091427] text-white border border-[#d97706]/60 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-fadeIn text-xs font-semibold backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-ping" />
          <span>{toast}</span>
          <button onClick={() => setToast(null)} className="ml-2 text-gray-400 hover:text-white text-xs cursor-pointer">✕</button>
        </div>
      )}

      <Navbar activePage="projects" />

      {/* Hero Header */}
      <section className="relative pt-10 pb-8 sm:pt-16 sm:pb-12 px-4 sm:px-6 md:px-12 text-center max-w-4xl mx-auto z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-xs font-semibold text-[#091427] mb-4">
          <span className="w-2 h-2 rounded-full bg-[#d97706]" />
          <span>Verified Client Outcomes</span>
        </div>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#0f172a] tracking-tight leading-[1.1] mb-5 sm:mb-6">
          Case Studies &amp; <br className="hidden sm:inline" />
          <span className="text-gradient-navy-gold">Measurable Client Results</span>
        </h1>
        <p className="text-sm sm:text-lg text-[#475569] leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
          Explore how our high-intent SEO, modern Next.js development, and data-driven marketing deliver compounding revenue across global markets.
        </p>

        {/* Interactive Category Filter Pills */}
        <div className="inline-flex flex-wrap justify-center p-1.5 bg-white rounded-2xl border border-gray-200/80 shadow-xs gap-1 max-w-2xl mx-auto">
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
                showToast(`Filter: ${tab.label} selected`);
              }}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filter === tab.id
                  ? "bg-[#091427] text-white shadow-sm"
                  : "text-[#54647c] hover:text-[#091427] hover:bg-gray-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="relative py-6 sm:py-8 px-4 sm:px-6 md:px-12 z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStudies.map((study) => (
            <Link
              key={study.id}
              href={`/projects/${study.id}`}
              className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xs card-3d flex flex-col justify-between group cursor-pointer animate-fadeIn hover:border-[#d97706]/50 transition-all"
            >
              <div>
                {/* Visual Header Mockup */}
                <div
                  className={`relative bg-gradient-to-tr ${study.bgGradient} rounded-2xl h-52 flex flex-col items-center justify-center p-4 overflow-hidden mb-5 border border-gray-100`}
                >
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[10px] font-bold px-3 py-1 rounded-full text-[#0f172a] shadow-xs">
                    {study.category}
                  </div>
                  <div className="text-5xl mb-2 group-hover:scale-110 transition-transform">
                    {study.visual}
                  </div>
                  <div className="bg-white/95 px-3.5 py-1.5 rounded-xl shadow-sm text-center">
                    <span className="text-base font-black text-[#091427] block leading-none">
                      {study.stat}
                    </span>
                    <span className="text-[10px] text-gray-500 font-semibold">{study.statLabel}</span>
                  </div>
                </div>

                {/* Content */}
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-md">
                  {study.badge}
                </span>

                <h2 className="text-xl font-bold text-[#0f172a] mt-3 mb-1 group-hover:text-[#091427] transition-colors">
                  {study.title}
                </h2>
                <p className="text-xs text-gray-500 font-medium mb-3">{study.client}</p>
                <p className="text-xs text-[#64748b] leading-relaxed mb-5 line-clamp-3">{study.overview}</p>

                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-2 bg-gray-50/80 p-3 rounded-xl border border-gray-100 mb-5 text-center">
                  {study.metrics.slice(0, 3).map((m, mIdx) => (
                    <div key={mIdx}>
                      <span className="text-xs font-bold text-[#0f172a] block">{m.value}</span>
                      <span className="text-[9.5px] text-gray-500 leading-tight block">{m.label}</span>
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
                      className="text-[10px] font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="w-full inline-flex items-center justify-center gap-2 text-xs font-bold text-[#091427] bg-amber-50 group-hover:bg-[#091427] group-hover:text-white border border-amber-200/80 py-2.5 rounded-xl transition-all cursor-pointer">
                  <span>View Case Study Deep Dive</span>
                  <span>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative py-10 sm:py-14 px-4 sm:px-6 md:px-12 z-10 text-center">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#091427] via-[#0f213d] to-[#1e293b] p-10 rounded-3xl border border-[#d97706]/35 shadow-xl text-white">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
            Want to See Similar Growth for Your Business?
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto mb-6">
            Let us conduct an audit of your current digital presence and build an actionable growth roadmap.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#d97706] hover:bg-[#b45309] text-white text-xs font-bold px-7 py-3.5 rounded-full shadow-lg shadow-[#d97706]/30 transition-all cursor-pointer"
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

function studyCategoryBadge(cat: string) {
  return cat;
}
