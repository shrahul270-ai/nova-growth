import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SeoAuditWidget from "../components/SeoAuditWidget";
import HeaderBackgroundAnimation from "../components/HeaderBackgroundAnimation";

export const metadata: Metadata = {
  title: "Free Instant Website SEO, Speed & Ranking Audit | Balaji Prime Media",
  description:
    "Analyze any website's SEO health, Google SERP ranking potential, TTFB speed, and indexing status in 30 seconds for free.",
  alternates: {
    canonical: "https://balajiprimemedia.in/audit",
  },
  openGraph: {
    title: "Free Instant Website SEO, Speed & Ranking Audit | Balaji Prime Media",
    description:
      "Analyze any website's SEO health, Google SERP ranking potential, TTFB speed, and indexing status in 30 seconds for free.",
    url: "https://balajiprimemedia.in/audit",
    siteName: "Balaji Prime Media",
    locale: "en_US",
    type: "website",
  },
};

export default function AuditPage() {
  return (
    <div className="relative min-h-screen bg-[#070319] text-white overflow-hidden">
      <Navbar activePage="services" />

      {/* 1. Full-Width Dedicated Header Banner with 3D Glowing Wave Animation */}
      <section className="relative w-full pt-10 pb-12 sm:pt-14 sm:pb-16 px-4 sm:px-6 md:px-12 z-10 overflow-hidden">
        <HeaderBackgroundAnimation variant="subpage" />
        <div className="max-w-4xl mx-auto relative z-10">
          {/* Top Back Navigation Bar */}
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white transition-colors group bg-white/10 hover:bg-white/15 border border-white/20 px-3.5 py-1.5 rounded-full shadow-sm cursor-pointer"
            >
              <span className="group-hover:-translate-x-1 transition-transform font-black">←</span>
              <span>Back to Home</span>
            </Link>
            <div className="text-[11px] text-slate-400">
              <Link href="/" className="hover:underline text-slate-300">Home</Link> / <span className="text-[#A068FF] font-semibold">Free SEO Audit</span>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-xs font-bold text-[#22d3ee] mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Real-Time Technical &amp; On-Page Audit</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Instant Website &amp; <br />
              <span className="bg-gradient-to-r from-[#A068FF] via-[#c084fc] to-[#22d3ee] bg-clip-text text-transparent">
                SEO Health Diagnostic
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2.5 max-w-xl mx-auto">
              Scan page speed, metadata, Core Web Vitals, and indexing health in seconds.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Tool Section */}
      <main className="relative py-6 sm:py-10 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto z-10">
        {/* Audit Tool Section */}
        <div className="my-4">
          <SeoAuditWidget />
        </div>

        {/* Feature Highlights (Luxury Dark Purple Theme) */}
        <div className="max-w-4xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-b from-[#130a38]/80 to-[#0c0624]/90 p-6 rounded-3xl border border-purple-500/30 shadow-xl backdrop-blur-md">
            <span className="text-2xl mb-2 block">🏆</span>
            <h3 className="text-sm font-bold text-white mb-1">Google Ranking Forecast</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Calculates your live SERP placement tier based on on-page depth, schema structured data, and technical indexing signals.
            </p>
          </div>

          <div className="bg-gradient-to-b from-[#130a38]/80 to-[#0c0624]/90 p-6 rounded-3xl border border-purple-500/30 shadow-xl backdrop-blur-md">
            <span className="text-2xl mb-2 block">⚡</span>
            <h3 className="text-sm font-bold text-white mb-1">Live Server Latency (TTFB)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Measures real millisecond Time to First Byte across global infrastructure to identify server and hosting bottlenecks.
            </p>
          </div>

          <div className="bg-gradient-to-b from-[#130a38]/80 to-[#0c0624]/90 p-6 rounded-3xl border border-purple-500/30 shadow-xl backdrop-blur-md">
            <span className="text-2xl mb-2 block">🔍</span>
            <h3 className="text-sm font-bold text-white mb-1">Technical Crawlability</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Live checks for robots.txt files, XML sitemaps, canonical tags, and mobile-friendly responsive viewports.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
