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
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "14/82, Malviya Nagar",
        "addressLocality": "Jaipur",
        "addressRegion": "Rajasthan",
        "postalCode": "302017",
        "addressCountry": "IN",
      },
    },
    "areaServed": {
      "@type": "Country",
      "name": "United States",
    },
    "description":
      "Enterprise SEO, commercial keyword clustering, technical optimization, Core Web Vitals, and authoritative digital PR for US companies.",
  };

  const usDeliverables = [
    {
      title: "Commercial Intent Keyword Clusters",
      desc: "Target high-converting American buyers searching for bottom-funnel comparison, alternative, and purchase queries.",
      icon: "🎯",
    },
    {
      title: "Tier-1 US Digital PR & Media Outreach",
      desc: "Earn high-trust brand citations, editorial features, and podcast appearances across authoritative US media outlets.",
      icon: "📰",
    },
    {
      title: "Google AI Search Overviews (SGE) Readiness",
      desc: "Structure content taxonomies to be directly cited in Google Generative AI Search Overviews and Gemini answers.",
      icon: "🤖",
    },
    {
      title: "US Multi-State & Metro Geotargeting",
      desc: "Architect programmatic local search hubs across key US metropolitan areas: New York, California, Texas, Florida, and Illinois.",
      icon: "🗺️",
    },
    {
      title: "Sub-Second US Edge Architecture",
      desc: "Deploy edge-rendered schemas and static assets across North American CDN nodes for sub-0.8s Core Web Vitals.",
      icon: "⚡",
    },
    {
      title: "Revenue & Pipeline Attribution",
      desc: "Connect organic rankings directly to HubSpot, Salesforce, or Stripe to measure exact ARR and customer lifetime value.",
      icon: "📈",
    },
  ];

  const usFaqs = [
    {
      q: "How does Balaji Prime Media coordinate across US time zones?",
      a: "Our senior strategists work with dedicated EST and PST schedule overlap. We offer direct Slack access during your working hours, bi-weekly Zoom strategy sessions, and real-time live performance dashboards.",
    },
    {
      q: "Can we pay in USD with standard US enterprise invoicing?",
      a: "Yes. All contracts and invoices are processed in USD via Stripe, direct ACH bank transfer, or international wire. We provide standard US W-8BEN-E tax documentation and enterprise confidentiality NDAs.",
    },
    {
      q: "How long before we see measurable organic pipeline in the US market?",
      a: "Technical crawl fixes, schema implementation, and low-competition commercial keywords typically yield ranking movement within 4 to 8 weeks. Compounding organic revenue scale is generally achieved within 3 to 6 months.",
    },
    {
      q: "Do you specialize in US B2B SaaS or E-Commerce?",
      a: "Both. We have deep expertise scaling headless Shopify e-commerce stores (collection clustering, SKU schemas) and B2B SaaS platforms (programmatic comparison hubs, buyer intent queries, and product-led SEO).",
    },
  ];

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
            <span>🇺🇸 TAILORED FOR UNITED STATES ENTERPRISES</span>
          </div>

          <h1 className="font-bebas text-4xl sm:text-6xl md:text-7xl tracking-[0.14em] text-white uppercase leading-[0.95] mb-6">
            HIGH-INTENT SEO SERVICES FOR <br />
            <span className="text-[#681fe4]">US BRANDS &amp; STARTUPS</span>
          </h1>

          <p className="font-satoshi text-neutral-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
            Tired of paying $10,000/mo to bloated US agencies with zero organic pipeline? We deliver high-velocity technical SEO, commercial keyword clustering, and verified digital PR tailored for the American market.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center gap-2 bg-[#681fe4] hover:bg-[#5815cb] text-white font-bebas text-sm tracking-[0.16em] uppercase px-8 py-4 rounded-[4px] shadow-[0_10px_25px_rgba(104,31,228,0.35)] transition-all cursor-pointer"
            >
              <span>BOOK US STRATEGY CALL (EST / PST) →</span>
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bebas text-sm tracking-[0.16em] uppercase px-7 py-4 rounded-[4px] transition-all cursor-pointer"
            >
              <span>VIEW US CASE STUDIES</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Instant Audit Widget section */}
      <section className="px-6 sm:px-12 py-10 max-w-[1320px] mx-auto relative z-10">
        <SeoAuditWidget />
      </section>

      {/* Section 2: Built For How US Customers Search */}
      <section className="py-16 px-6 sm:px-12 max-w-[1320px] mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-bebas text-xs tracking-[0.24em] text-[#681fe4] uppercase block mb-1">
            MARKET ARCHITECTURE
          </span>
          <h2 className="font-bebas text-3xl sm:text-5xl tracking-[0.14em] text-white uppercase leading-none">
            BUILT FOR HOW US BUYERS SEARCH
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2 font-mono">
            American buyers have distinct search intent patterns. Here is how we build your organic moat:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {usDeliverables.map((item, idx) => (
            <div key={idx} className="bg-[#0c0818] p-7 rounded-[4px] border border-white/10 shadow-lg flex flex-col justify-between hover:border-[#681fe4]/40 transition-colors">
              <div>
                <span className="text-3xl mb-4 block">{item.icon}</span>
                <h3 className="font-bebas text-xl sm:text-2xl tracking-[0.12em] text-white uppercase mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: 4-Phase US SEO Execution Sprint */}
      <section className="py-16 px-6 sm:px-12 bg-[#0c0617] border-y border-white/10 relative z-10">
        <div className="max-w-[1320px] mx-auto text-left">
          <div className="mb-10 text-center sm:text-left">
            <span className="font-bebas text-xs tracking-[0.24em] text-[#681fe4] uppercase block mb-1">
              EXECUTION ROADMAP
            </span>
            <h2 className="font-bebas text-3xl sm:text-5xl tracking-[0.14em] text-white uppercase leading-none">
              4-PHASE US SEO SPRINT METHODOLOGY
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-[4px] bg-[#07030d] border border-white/10">
              <span className="text-[#681fe4] font-mono font-bold text-xs">PHASE 01 // WEEKS 1–2</span>
              <h3 className="font-bebas text-xl text-white tracking-[0.1em] mt-2 mb-2">Technical &amp; Crawl Budget Audit</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                Eliminate 404s, redirect chains, orphan URLs, and optimize server-side rendering for American search crawlers.
              </p>
            </div>
            <div className="p-6 rounded-[4px] bg-[#07030d] border border-white/10">
              <span className="text-[#681fe4] font-mono font-bold text-xs">PHASE 02 // WEEKS 3–4</span>
              <h3 className="font-bebas text-xl text-white tracking-[0.1em] mt-2 mb-2">Commercial Intent Topical Maps</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                Cluster bottom-funnel comparison keywords, product taxonomies, and high-converting transactional queries.
              </p>
            </div>
            <div className="p-6 rounded-[4px] bg-[#07030d] border border-white/10">
              <span className="text-[#681fe4] font-mono font-bold text-xs">PHASE 03 // WEEKS 5–8</span>
              <h3 className="font-bebas text-xl text-white tracking-[0.1em] mt-2 mb-2">Digital PR &amp; Media Features</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                Manual outreach securing genuine brand mentions, thought leadership, and editorial features on vetted US media.
              </p>
            </div>
            <div className="p-6 rounded-[4px] bg-[#07030d] border border-white/10">
              <span className="text-[#681fe4] font-mono font-bold text-xs">PHASE 04 // MONTH 3+</span>
              <h3 className="font-bebas text-xl text-white tracking-[0.1em] mt-2 mb-2">Revenue Scaling &amp; Attribution</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                Monitor organic customer conversions, A/B test snippet CTR, and expand topical authority across new categories.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Localized US FAQs */}
      <section className="py-16 px-6 sm:px-12 max-w-[1320px] mx-auto relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="font-bebas text-xs tracking-[0.24em] text-[#681fe4] uppercase block mb-1">
              TRANSPARENCY &amp; OPERATIONS
            </span>
            <h2 className="font-bebas text-3xl sm:text-5xl tracking-[0.14em] text-white uppercase leading-none">
              FREQUENTLY ASKED QUESTIONS (US CLIENTS)
            </h2>
          </div>

          <div className="space-y-4">
            {usFaqs.map((faq, idx) => (
              <div key={idx} className="p-6 rounded-[4px] bg-[#0c0818] border border-white/10">
                <h3 className="font-bebas text-lg sm:text-xl text-white tracking-[0.08em] mb-2">
                  {faq.q}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-20 px-6 sm:px-12 text-center max-w-[1320px] mx-auto relative z-10">
        <div className="bg-[#0c0818] p-10 sm:p-14 rounded-[4px] border border-white/10 shadow-2xl text-white">
          <span className="font-bebas text-xs tracking-[0.24em] text-[#681fe4] uppercase block mb-2">
            INITIATE US ENGAGEMENT
          </span>
          <h2 className="font-bebas text-3xl sm:text-5xl tracking-[0.14em] text-white uppercase mb-3 leading-none">
            READY TO ACCELERATE YOUR US SEARCH FOOTPRINT?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto mb-8 font-normal leading-relaxed">
            Get a tailored proposal and competitive teardown for your target US market with zero lock-in contracts.
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
