import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SeoAuditWidget from "../components/SeoAuditWidget";

export const metadata: Metadata = {
  title: "B2B & E-Commerce SEO Services USA | Nova Growth Agency",
  description:
    "Top-tier SEO agency tailored for US businesses. We help American startups, SaaS companies, and e-commerce brands dominate Google organic search with proven ROI.",
};

export default function SeoServicesUsaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "B2B & E-Commerce SEO Services USA",
    "serviceType": "Search Engine Optimization",
    "provider": {
      "@type": "Organization",
      "name": "Nova Growth Global Agency",
      "url": "https://novagrowth.agency"
    },
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "description": "Enterprise SEO, technical optimization, Core Web Vitals, and authoritative link building for US companies."
  };

  return (
    <div className="relative min-h-screen bg-[#f8fbf9] text-[#111827] overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar activePage="services" />

      {/* Hero Header */}
      <section className="relative pt-16 pb-14 px-6 md:px-12 text-center max-w-4xl mx-auto z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-xs font-semibold text-[#091427] mb-4">
          <span>🇺🇸 Specialized for United States Businesses</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0f172a] tracking-tight leading-[1.1] mb-6">
          High-Intent SEO Services for <br />
          <span className="text-gradient-navy-gold">US Brands &amp; Startups</span>
        </h1>
        <p className="text-base sm:text-lg text-[#475569] leading-relaxed max-w-2xl mx-auto mb-8">
          Tired of paying $10,000/mo to bloated US agencies with zero organic pipeline? We deliver high-velocity technical SEO, commercial keyword clustering, and editorial backlinks tailored for the American market.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#091427] hover:bg-[#0f213d] text-white text-xs sm:text-sm font-bold px-7 py-3.5 rounded-full shadow-lg transition-all"
          >
            <span>Book US Strategy Call (EST / PST)</span>
            <span>→</span>
          </Link>
        </div>
      </section>

      {/* Instant Audit Widget section */}
      <section className="px-6 md:px-12 py-6 max-w-7xl mx-auto">
        <SeoAuditWidget />
      </section>

      {/* Why US Founders choose Nova Growth */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl font-black text-[#0f172a] tracking-tight">
            Built for How US Customers Search
          </h2>
          <p className="text-sm text-[#64748b] mt-2">
            American buyers have distinct search intent patterns. Here is how we win for you:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-xs card-hover">
            <span className="text-3xl mb-3 block">🎯</span>
            <h3 className="text-lg font-bold text-[#0f172a] mb-2">Commercial Intent First</h3>
            <p className="text-xs text-[#64748b] leading-relaxed">
              We don&apos;t chase useless informational traffic. We rank you for high-converting queries like &quot;best software for X&quot; or &quot;buy luxury X online&quot;.
            </p>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-xs card-hover">
            <span className="text-3xl mb-3 block">📰</span>
            <h3 className="text-lg font-bold text-[#0f172a] mb-2">Tier-1 US Publications</h3>
            <p className="text-xs text-[#64748b] leading-relaxed">
              We acquire genuine editorial backlinks from reputable US media outlets, industry blogs, and podcasts that drive authority and referral buyers.
            </p>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-xs card-hover">
            <span className="text-3xl mb-3 block">🕒</span>
            <h3 className="text-lg font-bold text-[#0f172a] mb-2">EST / PST Aligned Hours</h3>
            <p className="text-xs text-[#64748b] leading-relaxed">
              Work with dedicated US account managers who operate on your business hours with instant Slack accessibility and weekly Zoom catchups.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 md:px-12 text-center max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-[#091427] via-[#0f213d] to-[#1e293b] p-10 rounded-3xl border border-[#d97706]/35 shadow-xl text-white">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
            Ready to Accelerate Your US Search Footprint?
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto mb-6">
            Get a tailored proposal and competitive teardown for your target US market.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#d97706] hover:bg-[#b45309] text-white text-xs font-bold px-7 py-3.5 rounded-full shadow-lg shadow-[#d97706]/30 transition-all"
          >
            <span>Request US Proposal →</span>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
