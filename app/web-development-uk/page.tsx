import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "High-Performance Web Development UK | Next.js & Shopify Agency",
  description:
    "Bespoke web development agency serving UK businesses in London, Manchester, and Birmingham. Ultra-fast Next.js apps, headless Shopify, and 95+ PageSpeed scores.",
};

export default function WebDevelopmentUkPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "High-Performance Web Development UK",
    "serviceType": "Web Development",
    "provider": {
      "@type": "Organization",
      "name": "Nova Growth Agency",
      "url": "https://novagrowth.agency"
    },
    "areaServed": {
      "@type": "Country",
      "name": "United Kingdom"
    },
    "description": "Next.js web development, custom UI/UX design, and headless e-commerce for British companies."
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
          <span>🇬🇧 Tailored for UK Businesses &amp; Scaleups</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0f172a] tracking-tight leading-[1.1] mb-6">
          Bespoke Next.js &amp; E-Commerce <br />
          <span className="text-gradient-navy-gold">Web Development UK</span>
        </h1>
        <p className="text-base sm:text-lg text-[#475569] leading-relaxed max-w-2xl mx-auto mb-8">
          We craft lightning-fast web applications and e-commerce stores designed to convert British consumers. Built with Next.js, TypeScript, and modern headless architectures.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#091427] hover:bg-[#0f213d] text-white text-xs sm:text-sm font-bold px-7 py-3.5 rounded-full shadow-lg transition-all"
          >
            <span>Discuss Your UK Project (GMT Hours)</span>
            <span>→</span>
          </Link>
        </div>
      </section>

      {/* UK Benefits Grid */}
      <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-xs card-hover">
            <span className="text-3xl mb-3 block">⚡</span>
            <h3 className="text-lg font-bold text-[#0f172a] mb-2">95+ PageSpeed Guaranteed</h3>
            <p className="text-xs text-[#64748b] leading-relaxed">
              Google rewards speed. Every UK website we deploy passes Core Web Vitals with sub-second loading speeds across mobile and desktop.
            </p>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-xs card-hover">
            <span className="text-3xl mb-3 block">🛡️</span>
            <h3 className="text-lg font-bold text-[#0f172a] mb-2">GDPR &amp; UK Compliance</h3>
            <p className="text-xs text-[#64748b] leading-relaxed">
              Built-in cookie consent architecture, privacy compliance, and high accessibility standards (WCAG 2.1 AA) required in the UK and European Union.
            </p>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-xs card-hover">
            <span className="text-3xl mb-3 block">💷</span>
            <h3 className="text-lg font-bold text-[#0f172a] mb-2">Transparent GBP Pricing</h3>
            <p className="text-xs text-[#64748b] leading-relaxed">
              No hidden fees, currency conversion surprises, or bloated London studio overheads. Fixed-price milestone sprints that deliver on time.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 md:px-12 text-center max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-[#091427] via-[#0f213d] to-[#1e293b] p-10 rounded-3xl border border-[#d97706]/35 shadow-xl text-white">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
            Start Your Web Project With Nova Growth
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto mb-6">
            Get a detailed timeline, architecture proposal, and transparent quote within 12 hours.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#d97706] hover:bg-[#b45309] text-white text-xs font-bold px-7 py-3.5 rounded-full shadow-lg shadow-[#d97706]/30 transition-all"
          >
            <span>Request Free UK Quote →</span>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
