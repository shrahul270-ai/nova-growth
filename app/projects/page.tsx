"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const caseStudies = [
  {
    id: "fashion-brand",
    categoryGroup: "ecommerce",
    category: "E-Commerce Website",
    badge: "Web Development + SEO",
    title: "Fashion Brand Website",
    client: "Luxe Fashion Inc. (Los Angeles, USA 🇺🇸)",
    stat: "+340%",
    statLabel: "Organic Revenue Increase",
    description:
      "A complete headless storefront redesign combined with an aggressive collection page SEO strategy that catapulted organic search impressions and increased checkout conversions by 48%.",
    metrics: [
      { label: "Page Load Time", value: "0.8s" },
      { label: "Google PageSpeed", value: "98/100" },
      { label: "Transactions", value: "12,400+" },
    ],
    tech: ["Next.js", "Shopify Storefront API", "Tailwind CSS", "Klaviyo"],
    visual: "👗",
    bgGradient: "from-rose-50 to-amber-50",
    fullDeliverables: [
      "Custom headless Next.js frontend with sub-second page transitions",
      "Shopify Storefront GraphQL integration with live inventory sync",
      "Automated collection schema structured data & rich snippets",
      "Klaviyo abandoned checkout automated email marketing flows"
    ],
    resultsSummary: "Organic revenue reached $1.4M in 6 months, overtaking paid acquisition channels."
  },
  {
    id: "fitness-app",
    categoryGroup: "mobile",
    category: "Mobile App",
    badge: "UI/UX Design + Development",
    title: "PulseFit Pro Mobile App",
    client: "Pulse Technologies (Austin, USA 🇺🇸)",
    stat: "50,000+",
    statLabel: "Active Downloads",
    description:
      "End-to-end design and cross-platform mobile app development with intelligent workout tracking, interactive animations, and localized onboarding flows for foreign fitness enthusiasts.",
    metrics: [
      { label: "App Store Rating", value: "4.9 ★" },
      { label: "Retention Rate", value: "68%" },
      { label: "Daily Active Users", value: "18,500+" },
    ],
    tech: ["React Native", "TypeScript", "Node.js", "Firebase"],
    visual: "⚡",
    bgGradient: "from-slate-900 to-[#091427]",
    fullDeliverables: [
      "Cross-platform iOS and Android production release",
      "Micro-animations and tactile haptic feedback design",
      "Multi-currency in-app subscription billing via Stripe",
      "App Store & Google Play organic ASO keyword optimization"
    ],
    resultsSummary: "Achieved Top 10 Fitness ranking across the US and UK app stores."
  },
  {
    id: "local-growth",
    categoryGroup: "seo",
    category: "SEO",
    badge: "Local SEO + Content Marketing",
    title: "Local Business Growth",
    client: "Apex Health & Dental Group (London, UK 🇬🇧)",
    stat: "#1 Rank",
    statLabel: "On High-Intent Google Maps",
    description:
      "Targeted multi-location Local SEO, Google Business Profile optimization, and local citation architecture that drove a surge of phone inquiries and pre-booked appointments.",
    metrics: [
      { label: "Map Pack Ranking", value: "Top 3 in 18 Areas" },
      { label: "Inbound Phone Calls", value: "+280%" },
      { label: "Organic Visitors", value: "45K/mo" },
    ],
    tech: ["Local Schema", "GBP Optimization", "Content Clusters", "Ahrefs"],
    visual: "📍",
    bgGradient: "from-amber-50 to-slate-50",
    fullDeliverables: [
      "Google Business Profile multi-location audit and citation cleanup",
      "Hyper-local neighborhood page routing across Central & Greater London",
      "Local schema injection with review markup",
      "Automated SMS review generation funnel for verified patients"
    ],
    resultsSummary: "Private patient consultation bookings jumped by 280% in the first 90 days."
  },
  {
    id: "saas-pipeline",
    categoryGroup: "saas",
    category: "B2B SaaS",
    badge: "Technical SEO + CRO",
    title: "CloudSync SaaS Growth",
    client: "CloudSync Technologies (San Francisco, USA 🇺🇸)",
    stat: "+420%",
    statLabel: "Qualified Demo Bookings",
    description:
      "Restructured technical website architecture, removed duplicate parameter indexing, and built a programmatically generated integration directory that ranks for over 2,000 high-value long-tail keywords.",
    metrics: [
      { label: "Monthly Organic ARR", value: "$180K+" },
      { label: "Domain Authority", value: "DA 32 → DA 64" },
      { label: "Indexed Landing Pages", value: "450+" },
    ],
    tech: ["Next.js App Router", "Sanity CMS", "Programmatic SEO", "Vercel"],
    visual: "☁️",
    bgGradient: "from-blue-50/50 to-amber-50/50",
    fullDeliverables: [
      "Programmatic SEO directory indexing 450+ tool integrations",
      "Core Web Vitals remediation bringing LCP down to 1.1s",
      "High-authority editorial link outreach on DA 60+ tech publications",
      "Full-funnel Looker Studio attribution tracking"
    ],
    resultsSummary: "Demo pipeline generated over $180,000 monthly recurring revenue organically."
  },
  {
    id: "dubai-real-estate",
    categoryGroup: "ecommerce",
    category: "Real Estate Portal",
    badge: "Web Design + Paid Strategy",
    title: "Horizon Luxury Properties",
    client: "Horizon Real Estate (Dubai, UAE 🇦🇪)",
    stat: "$18.5M",
    statLabel: "Property Sales Inquiries",
    description:
      "A luxury multilingual web portal with interactive floor plans, ultra-fast virtual tour loading, and performance marketing funnels targeting high-net-worth foreign property buyers.",
    metrics: [
      { label: "Inquiry Conversion", value: "4.2%" },
      { label: "Mobile Bounce Rate", value: "24%" },
      { label: "Average Session Duration", value: "4m 12s" },
    ],
    tech: ["React", "Tailwind CSS", "Mapbox", "Meta Ads"],
    visual: "🏢",
    bgGradient: "from-amber-50/80 to-slate-50",
    fullDeliverables: [
      "Multilingual Arabic & English high-speed property catalog",
      "Interactive 3D virtual tour embed with lazy loading",
      "Direct WhatsApp lead qualification integration",
      "Ultra-targeted Google search ads targeting UK and European investors"
    ],
    resultsSummary: "Facilitated over $18.5M in verified off-plan property sales inquiries."
  },
  {
    id: "fintech-app",
    categoryGroup: "saas",
    category: "Fintech Platform",
    badge: "Product Design & Web App",
    title: "VenturePay Global",
    client: "VenturePay Financial (Toronto, Canada 🇨🇦)",
    stat: "100K+",
    statLabel: "Monthly Active Users",
    description:
      "Re-engineered consumer finance web portal with bank-grade encryption, instant currency exchange calculator, and search engine authority targeting cross-border money transfer keywords.",
    metrics: [
      { label: "User Onboarding Time", value: "< 2 mins" },
      { label: "Core Web Vitals", value: "100% Passed" },
      { label: "Organic Search Share", value: "54%" },
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    visual: "💳",
    bgGradient: "from-slate-900 to-[#091427]",
    fullDeliverables: [
      "Bank-grade SSL encrypted user onboarding and KYC flow",
      "Live exchange rate calculation widget with interbank feed",
      "Security compliance validation (SOC2 & PCI-DSS standards)",
      "High-intent keyword positioning for 'cross-border remit' queries"
    ],
    resultsSummary: "Organic search share surpassed 54% of all new user onboarding."
  },
];

export default function ProjectsPage() {
  const [filter, setFilter] = useState<string>("all");
  const [activeStudy, setActiveStudy] = useState<typeof caseStudies[0] | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveStudy(null);
      }
    };
    if (activeStudy) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [activeStudy]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const filteredStudies = filter === "all"
    ? caseStudies
    : caseStudies.filter((s) => s.categoryGroup === filter);

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
      <section className="relative pt-16 pb-12 px-6 md:px-12 text-center max-w-4xl mx-auto z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-xs font-semibold text-[#091427] mb-4">
          <span className="w-2 h-2 rounded-full bg-[#d97706]" />
          <span>Verified Client Outcomes</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0f172a] tracking-tight leading-[1.1] mb-6">
          Case Studies &amp; <br />
          <span className="text-gradient-navy-gold">Measurable Client Results</span>
        </h1>
        <p className="text-base sm:text-lg text-[#475569] leading-relaxed max-w-2xl mx-auto mb-8">
          Explore how our high-intent SEO, modern Next.js development, and data-driven marketing deliver compounding revenue across global markets.
        </p>

        {/* Interactive Category Filter Pills */}
        <div className="inline-flex flex-wrap justify-center p-1.5 bg-white rounded-2xl border border-gray-200/80 shadow-xs gap-1 max-w-2xl mx-auto">
          {[
            { id: "all", label: "All Projects (6)" },
            { id: "ecommerce", label: "E-Commerce & Portals (2)" },
            { id: "saas", label: "B2B SaaS & Fintech (2)" },
            { id: "seo", label: "Local SEO & Clinics (1)" },
            { id: "mobile", label: "Mobile Apps (1)" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setFilter(tab.id);
                showToast(`Filter: ${tab.label} selected`);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
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
      <section className="relative py-8 px-6 md:px-12 z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStudies.map((study) => (
            <div
              key={study.id}
              onClick={() => {
                setActiveStudy(study);
                showToast(`Opened full breakdown for ${study.title}`);
              }}
              className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xs card-3d flex flex-col justify-between group cursor-pointer animate-fadeIn"
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
                <p className="text-xs text-[#64748b] leading-relaxed mb-5">{study.description}</p>

                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-2 bg-gray-50/80 p-3 rounded-xl border border-gray-100 mb-5 text-center">
                  {study.metrics.map((m, mIdx) => (
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

                <button
                  type="button"
                  className="w-full inline-flex items-center justify-center gap-2 text-xs font-bold text-[#091427] bg-amber-50 hover:bg-amber-100 border border-amber-200/80 py-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  <span>View Case Study Deep Dive</span>
                  <span>↗</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative py-20 px-6 md:px-12 z-10 text-center">
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

      {/* Interactive Case Study Detail Modal */}
      {activeStudy && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveStudy(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn overflow-y-auto"
        >
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-gray-100 relative text-left max-h-[85vh] overflow-y-auto my-auto">
            {/* Sticky Header with Prominent Close Button */}
            <div className="sticky -top-6 -mt-2 -mx-2 px-2 pt-2 pb-3 bg-white/95 backdrop-blur-md border-b border-gray-100 flex items-center justify-between mb-4 z-20">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-[#091427] text-xs font-semibold border border-amber-200/80">
                <span className="text-[#d97706]">🏆</span>
                <span>{studyCategoryBadge(activeStudy.category)}</span>
              </div>
              <button
                onClick={() => setActiveStudy(null)}
                aria-label="Close modal"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-700 text-xs font-bold transition-all cursor-pointer border border-gray-200"
              >
                <span className="text-sm">✕</span>
                <span>Close</span>
              </button>
            </div>

            <h3 className="text-2xl font-black text-[#0f172a] tracking-tight leading-tight mb-1">
              {activeStudy.title}
            </h3>
            <p className="text-xs text-[#d97706] font-bold mb-4">{activeStudy.client}</p>

            <div className="bg-[#f8fafd] p-4 rounded-2xl border border-gray-200/80 mb-5">
              <div className="text-[11px] font-semibold text-gray-500 uppercase">Primary Growth Stat:</div>
              <div className="text-2xl font-black text-[#091427] mt-0.5">{activeStudy.stat} {activeStudy.statLabel}</div>
              <div className="text-xs text-[#54647c] mt-1">{activeStudy.resultsSummary}</div>
            </div>

            <div className="space-y-4 text-xs text-[#54647c] mb-6">
              <div>
                <h4 className="font-bold text-[#091427] mb-1">The Strategy &amp; Problem:</h4>
                <p className="leading-relaxed">{activeStudy.description}</p>
              </div>

              <div>
                <h4 className="font-bold text-[#091427] mb-2">Executed Deliverables:</h4>
                <ul className="space-y-1.5">
                  {activeStudy.fullDeliverables.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-[#0f172a]">
                      <span className="text-[#d97706] font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-[#091427] mb-2">Deployed Architecture:</h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeStudy.tech.map((t, idx) => (
                    <span key={idx} className="bg-slate-100 text-[#091427] px-2.5 py-1 rounded-lg font-mono text-[11px] font-semibold">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
              <Link
                href="/contact"
                className="flex-1 bg-[#091427] hover:bg-[#0f213d] text-white font-bold py-3.5 px-6 rounded-2xl text-xs transition-all shadow-md shadow-[#091427]/25 text-center cursor-pointer"
              >
                Start Similar Project With Nova Growth →
              </Link>
              <button
                type="button"
                onClick={() => setActiveStudy(null)}
                className="px-5 py-3.5 rounded-2xl text-xs font-semibold text-gray-600 hover:bg-gray-100 border border-gray-200 transition-colors cursor-pointer"
              >
                ✕ Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

function studyCategoryBadge(cat: string) {
  return cat;
}
