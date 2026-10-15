import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SeoAuditWidget from "../components/SeoAuditWidget";

export const metadata: Metadata = {
  title: "Free Instant Website SEO, Speed & Ranking Audit | Nova Growth",
  description:
    "Analyze any website's SEO health, Google SERP ranking potential, TTFB speed, and indexing status in 30 seconds for free.",
};

export default function AuditPage() {
  return (
    <div className="relative min-h-screen bg-[#f8fbf9] text-[#111827] overflow-hidden">
      <Navbar activePage="services" />

      <main className="relative pt-8 pb-16 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto z-10">
        {/* Top Back Navigation Bar */}
        <div className="flex items-center justify-between max-w-4xl mx-auto mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-[#d97706] transition-colors group bg-white border border-gray-200 px-3.5 py-1.5 rounded-full shadow-2xs"
          >
            <span className="group-hover:-translate-x-1 transition-transform font-black">←</span>
            <span>Back to Home</span>
          </Link>
          <div className="text-[11px] text-gray-400">
            <Link href="/" className="hover:underline">Home</Link> / <span className="text-[#091427] font-semibold">Free SEO Audit</span>
          </div>
        </div>

        {/* Audit Tool Section */}
        <div className="my-4">
          <SeoAuditWidget />
        </div>

        {/* Feature Highlights */}
        <div className="max-w-4xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs">
            <span className="text-2xl mb-2 block">🏆</span>
            <h3 className="text-sm font-bold text-[#091427] mb-1">Google Ranking Forecast</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Calculates your live SERP placement tier based on on-page depth, schema structured data, and technical indexing signals.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs">
            <span className="text-2xl mb-2 block">⚡</span>
            <h3 className="text-sm font-bold text-[#091427] mb-1">Live Server Latency (TTFB)</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Measures real millisecond Time to First Byte across global infrastructure to identify server and hosting bottlenecks.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs">
            <span className="text-2xl mb-2 block">🔍</span>
            <h3 className="text-sm font-bold text-[#091427] mb-1">Technical Crawlability</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Live checks for robots.txt files, XML sitemaps, canonical tags, and mobile-friendly responsive viewports.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
