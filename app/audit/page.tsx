import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SeoAuditWidget from "../components/SeoAuditWidget";

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
    <div className="relative min-h-screen bg-[#07030d] text-white overflow-hidden font-satoshi bg-grid-white-240">
      <Navbar activePage="services" />

      {/* 1. Header Banner */}
      <section className="relative w-full pt-32 pb-14 sm:pt-40 sm:pb-20 px-4 sm:px-6 md:px-12 z-10 overflow-hidden border-b border-white/10">
        <div className="max-w-4xl mx-auto relative z-10">
          {/* Top Back Navigation Bar */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-bebas tracking-[0.16em] uppercase text-neutral-300 hover:text-white transition-colors bg-white/5 hover:bg-white/10 border border-white/15 px-3.5 py-1.5 rounded-[2px] cursor-pointer"
            >
              <span>← Back to Home</span>
            </Link>
            <div className="text-[11px] font-mono text-neutral-400">
              <Link href="/" className="hover:underline text-neutral-300">Home</Link> / <span className="text-[#681fe4] font-semibold">Free SEO Audit</span>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[2px] bg-white/5 border border-white/10 text-xs font-bebas tracking-[0.2em] text-[#681fe4] uppercase mb-4">
              <span className="w-2 h-2 rounded-full bg-[#681fe4] animate-pulse" />
              <span>Real-Time Technical &amp; On-Page Audit</span>
            </div>
            <h1 className="font-bebas text-4xl sm:text-6xl md:text-7xl text-white tracking-[0.16em] uppercase leading-[0.95]">
              INSTANT WEBSITE &amp; <br />
              <span className="text-[#681fe4]">SEO HEALTH DIAGNOSTIC</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 mt-4 max-w-xl mx-auto leading-relaxed font-normal">
              Scan page speed, metadata, Core Web Vitals, and indexing health in seconds.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Tool Section */}
      <main className="relative py-12 sm:py-16 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto z-10">
        {/* Audit Tool Section */}
        <div className="my-4">
          <SeoAuditWidget />
        </div>

        {/* Feature Highlights */}
        <div className="max-w-4xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0c0818] p-6 rounded-[4px] border border-white/10 shadow-xl">
            <span className="text-2xl mb-2 block">🏆</span>
            <h3 className="font-bebas text-lg text-white tracking-[0.12em] uppercase mb-1">Google Ranking Forecast</h3>
            <p className="text-xs text-neutral-300 leading-relaxed font-normal">
              Calculates your live SERP placement tier based on on-page depth, schema structured data, and technical indexing signals.
            </p>
          </div>

          <div className="bg-[#0c0818] p-6 rounded-[4px] border border-white/10 shadow-xl">
            <span className="text-2xl mb-2 block">⚡</span>
            <h3 className="font-bebas text-lg text-white tracking-[0.12em] uppercase mb-1">Live Server Latency (TTFB)</h3>
            <p className="text-xs text-neutral-300 leading-relaxed font-normal">
              Measures real millisecond Time to First Byte across global infrastructure to identify server and hosting bottlenecks.
            </p>
          </div>

          <div className="bg-[#0c0818] p-6 rounded-[4px] border border-white/10 shadow-xl">
            <span className="text-2xl mb-2 block">🔍</span>
            <h3 className="font-bebas text-lg text-white tracking-[0.12em] uppercase mb-1">Technical Crawlability</h3>
            <p className="text-xs text-neutral-300 leading-relaxed font-normal">
              Live checks for robots.txt files, XML sitemaps, canonical tags, and mobile-friendly responsive viewports.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
