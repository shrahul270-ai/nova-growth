import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SeoAuditWidget from "../components/SeoAuditWidget";

export const metadata: Metadata = {
  title: "B2B & E-Commerce SEO Services USA | Balaji Prime Media",
  description:
    "Top-tier SEO agency tailored for US businesses. We help American startups, SaaS companies, and e-commerce brands dominate Google organic search with proven ROI.",
  alternates: {
    canonical: "https://balajiprimemedia.in/seo-services-usa",
  },
};

export default function SeoServicesUsaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "B2B & E-Commerce SEO Services USA",
    "serviceType": "Search Engine Optimization",
    "provider": {
      "@type": "Organization",
      "name": "Balaji Prime Media",
      "url": "https://balajiprimemedia.in",
    },
    "areaServed": {
      "@type": "Country",
      "name": "United States",
    },
    "description":
      "Enterprise SEO, technical optimization, Core Web Vitals, and authoritative link building for US companies.",
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
              <span className="text-[#681fe4]">SEO SERVICES USA</span>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] bg-white/[0.04] border border-white/10 font-mono text-xs uppercase tracking-[0.2em] text-[#681fe4] mb-4">
            <span>🇺🇸 SPECIALIZED FOR UNITED STATES BUSINESSES</span>
          </div>

          <h1 className="font-bebas text-4xl sm:text-6xl md:text-7xl tracking-[0.14em] text-white uppercase leading-[0.95] mb-6">
            HIGH-INTENT SEO SERVICES FOR <br />
            <span className="text-[#681fe4]">US BRANDS &amp; STARTUPS</span>
          </h1>

          <p className="font-satoshi text-neutral-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
            Tired of paying $10,000/mo to bloated US agencies with zero organic pipeline? We deliver high-velocity technical SEO, commercial keyword clustering, and editorial backlinks tailored for the American market.
          </p>

          <div className="flex justify-center">
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center gap-2 bg-[#681fe4] hover:bg-[#5815cb] text-white font-bebas text-sm tracking-[0.16em] uppercase px-8 py-4 rounded-[4px] shadow-[0_10px_25px_rgba(104,31,228,0.35)] transition-all cursor-pointer"
            >
              <span>BOOK US STRATEGY CALL (EST / PST) →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Instant Audit Widget section */}
      <section className="px-6 sm:px-12 py-10 max-w-[1320px] mx-auto relative z-10">
        <SeoAuditWidget />
      </section>

      {/* Why US Founders choose Balaji Prime Media */}
      <section className="py-16 px-6 sm:px-12 max-w-[1320px] mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-bebas text-xs tracking-[0.24em] text-[#681fe4] uppercase block mb-1">
            // MARKET ARCHITECTURE
          </span>
          <h2 className="font-bebas text-3xl sm:text-5xl tracking-[0.14em] text-white uppercase leading-none">
            BUILT FOR HOW US CUSTOMERS SEARCH
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2 font-mono">
            American buyers have distinct search intent patterns. Here is how we win for you:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0c0818] p-8 rounded-[4px] border border-white/10 shadow-lg flex flex-col justify-between">
            <div>
              <span className="text-3xl mb-4 block">🎯</span>
              <h3 className="font-bebas text-2xl tracking-[0.14em] text-white uppercase mb-2">Commercial Intent First</h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
                We don&apos;t chase useless informational traffic. We rank you for high-converting queries like &quot;best software for X&quot; or &quot;buy luxury X online&quot;.
              </p>
            </div>
          </div>

          <div className="bg-[#0c0818] p-8 rounded-[4px] border border-white/10 shadow-lg flex flex-col justify-between">
            <div>
              <span className="text-3xl mb-4 block">📰</span>
              <h3 className="font-bebas text-2xl tracking-[0.14em] text-white uppercase mb-2">Tier-1 US Publications</h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
                We acquire genuine editorial backlinks from reputable US media outlets, industry blogs, and podcasts that drive authority and referral buyers.
              </p>
            </div>
          </div>

          <div className="bg-[#0c0818] p-8 rounded-[4px] border border-white/10 shadow-lg flex flex-col justify-between">
            <div>
              <span className="text-3xl mb-4 block">🕒</span>
              <h3 className="font-bebas text-2xl tracking-[0.14em] text-white uppercase mb-2">EST / PST Aligned Hours</h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
                Work with dedicated US account managers who operate on your business hours with instant Slack accessibility and weekly Zoom catchups.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-20 px-6 sm:px-12 text-center max-w-[1320px] mx-auto relative z-10">
        <div className="bg-[#0c0818] p-10 sm:p-14 rounded-[4px] border border-white/10 shadow-2xl text-white">
          <span className="font-bebas text-xs tracking-[0.24em] text-[#681fe4] uppercase block mb-2">
            // INITIATE CAMPAIGN
          </span>
          <h2 className="font-bebas text-3xl sm:text-5xl tracking-[0.14em] text-white uppercase mb-3 leading-none">
            READY TO ACCELERATE YOUR US SEARCH FOOTPRINT?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto mb-8 font-normal leading-relaxed">
            Get a tailored proposal and competitive teardown for your target US market.
          </p>
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 bg-[#681fe4] hover:bg-[#5815cb] text-white font-bebas text-sm tracking-[0.16em] uppercase px-8 py-4 rounded-[4px] shadow-[0_10px_25px_rgba(104,31,228,0.35)] transition-all cursor-pointer"
          >
            <span>REQUEST US PROPOSAL →</span>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
