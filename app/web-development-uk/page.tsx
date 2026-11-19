import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GlobalWebPricingMatrix from "../components/GlobalWebPricingMatrix";

export const metadata: Metadata = {
  title: "High-Performance Web Development UK | Balaji Prime Media",
  description:
    "Bespoke web development agency serving UK businesses in London, Manchester, and Birmingham. Ultra-fast Next.js apps, headless Shopify, and 95+ PageSpeed scores.",
  alternates: {
    canonical: "https://balajiprimemedia.in/web-development-uk",
  },
};

export default function WebDevelopmentUkPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "High-Performance Web Development UK",
    "serviceType": "Web Development",
    "provider": {
      "@type": "Organization",
      "name": "Balaji Prime Media",
      "url": "https://balajiprimemedia.in",
    },
    "areaServed": {
      "@type": "Country",
      "name": "United Kingdom",
    },
    "description":
      "Next.js web development, custom UI/UX design, and headless e-commerce for British companies.",
  };

  return (
    <div className="relative min-h-screen bg-[#07030d] text-white selection:bg-[#681fe4] selection:text-white font-satoshi overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Background Grid Pattern & Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(104,31,228,0.18),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-white-240 opacity-40 pointer-events-none" />

      {/* Top Navbar */}
      <div className="relative z-50">
        <Navbar activePage="services" />
      </div>

      {/* Hero Header */}
      <section className="relative w-full pt-28 sm:pt-36 pb-14 px-6 sm:px-12 text-center z-10 overflow-hidden max-w-[1320px] mx-auto">
        <div className="max-w-4xl mx-auto relative z-10">
          {/* Top Breadcrumb Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 text-xs font-mono uppercase tracking-[0.14em]">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors bg-white/[0.04] border border-white/10 px-3.5 py-1.5 rounded-[2px]"
            >
              <span>←</span>
              <span>BACK TO HOME</span>
            </Link>
            <div className="text-neutral-500">
              <Link href="/" className="hover:text-white transition-colors">HOME</Link> /{" "}
              <Link href="/services" className="hover:text-white transition-colors">SERVICES</Link> /{" "}
              <span className="text-[#681fe4]">WEB DEVELOPMENT UK</span>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] bg-white/[0.04] border border-white/10 font-mono text-xs uppercase tracking-[0.2em] text-[#681fe4] mb-4">
            <span>🇬🇧 TAILORED FOR UK BUSINESSES &amp; SCALEUPS</span>
          </div>

          <h1 className="font-bebas text-4xl sm:text-6xl md:text-7xl tracking-[0.14em] text-white uppercase leading-[0.95] mb-6">
            BESPOKE NEXT.JS &amp; E-COMMERCE <br />
            <span className="text-[#681fe4]">WEB DEVELOPMENT UK</span>
          </h1>

          <p className="font-satoshi text-neutral-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
            We craft lightning-fast web applications and e-commerce stores designed to convert British consumers. Built with Next.js, TypeScript, and modern headless architectures.
          </p>

          <div className="flex justify-center">
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center gap-2 bg-[#681fe4] hover:bg-[#5815cb] text-white font-bebas text-sm tracking-[0.16em] uppercase px-8 py-4 rounded-[4px] shadow-[0_10px_25px_rgba(104,31,228,0.35)] transition-all cursor-pointer"
            >
              <span>DISCUSS YOUR UK PROJECT (GMT HOURS) →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* UK Benefits Grid */}
      <section className="py-16 px-6 sm:px-12 max-w-[1320px] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0c0818] p-8 rounded-[4px] border border-white/10 shadow-lg flex flex-col justify-between">
            <div>
              <span className="text-3xl mb-4 block">⚡</span>
              <h3 className="font-bebas text-2xl tracking-[0.14em] text-white uppercase mb-2">95+ PageSpeed Guaranteed</h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
                Google rewards speed. Every UK website we deploy passes Core Web Vitals with sub-second loading speeds across mobile and desktop.
              </p>
            </div>
          </div>

          <div className="bg-[#0c0818] p-8 rounded-[4px] border border-white/10 shadow-lg flex flex-col justify-between">
            <div>
              <span className="text-3xl mb-4 block">🛡️</span>
              <h3 className="font-bebas text-2xl tracking-[0.14em] text-white uppercase mb-2">GDPR &amp; UK Compliance</h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
                Built-in cookie consent architecture, privacy compliance, and high accessibility standards (WCAG 2.1 AA) required in the UK and European Union.
              </p>
            </div>
          </div>

          <div className="bg-[#0c0818] p-8 rounded-[4px] border border-white/10 shadow-lg flex flex-col justify-between">
            <div>
              <span className="text-3xl mb-4 block">💷</span>
              <h3 className="font-bebas text-2xl tracking-[0.14em] text-white uppercase mb-2">Transparent GBP Pricing</h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
                No hidden fees, currency conversion surprises, or bloated London studio overheads. Fixed-price milestone sprints that deliver on time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Global Country-Wise Development Rates & Scope */}
      <div className="relative z-10">
        <GlobalWebPricingMatrix />
      </div>

      {/* CTA */}
      <section className="py-20 px-6 sm:px-12 text-center max-w-[1320px] mx-auto relative z-10">
        <div className="bg-[#0c0818] p-10 sm:p-14 rounded-[4px] border border-white/10 shadow-2xl text-white">
          <span className="font-bebas text-xs tracking-[0.24em] text-[#681fe4] uppercase block mb-2">
            // LAUNCH ENGAGEMENT
          </span>
          <h2 className="font-bebas text-3xl sm:text-5xl tracking-[0.14em] text-white uppercase mb-3 leading-none">
            START YOUR WEB PROJECT WITH BALAJI PRIME MEDIA
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto mb-8 font-normal leading-relaxed">
            Get a detailed timeline, architecture proposal, and transparent quote within 12 hours.
          </p>
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 bg-[#681fe4] hover:bg-[#5815cb] text-white font-bebas text-sm tracking-[0.16em] uppercase px-8 py-4 rounded-[4px] shadow-[0_10px_25px_rgba(104,31,228,0.35)] transition-all cursor-pointer"
          >
            <span>REQUEST FREE UK QUOTE →</span>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
