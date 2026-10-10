import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Projects & Case Studies | Proven Growth Results",
  description:
    "Explore our featured projects and client case studies across E-Commerce, Mobile Apps, Local Business SEO, and SaaS Web Development.",
};

const caseStudies = [
  {
    id: "fashion-brand",
    category: "E-Commerce Website",
    badge: "Web Development + SEO",
    title: "Fashion Brand Website",
    client: "Luxe Fashion Inc. (Los Angeles, USA)",
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
  },
  {
    id: "fitness-app",
    category: "Mobile App",
    badge: "UI/UX Design + Development",
    title: "PulseFit Pro Mobile App",
    client: "Pulse Technologies (Austin, USA)",
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
    bgGradient: "from-purple-50 to-indigo-50",
  },
  {
    id: "local-growth",
    category: "SEO",
    badge: "Local SEO + Content Marketing",
    title: "Local Business Growth",
    client: "Apex Health & Dental Group (London, UK)",
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
  },
  {
    id: "saas-pipeline",
    category: "B2B SaaS",
    badge: "Technical SEO + CRO",
    title: "CloudSync SaaS Growth",
    client: "CloudSync Technologies (San Francisco, USA)",
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
  },
  {
    id: "dubai-real-estate",
    category: "Real Estate Portal",
    badge: "Web Design + Paid Strategy",
    title: "Horizon Luxury Properties",
    client: "Horizon Real Estate (Dubai, UAE)",
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
  },
  {
    id: "fintech-app",
    category: "Fintech Platform",
    badge: "Product Design & Web App",
    title: "VenturePay Global",
    client: "VenturePay Financial (Toronto, Canada)",
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
    bgGradient: "from-violet-50 to-purple-50",
  },
];

export default function ProjectsPage() {
  return (
    <div className="relative min-h-screen bg-[#f8fbf9] text-[#111827] overflow-hidden">
      <div className="curved-ribbon-left" aria-hidden="true" />
      <div className="curved-ribbon-right" aria-hidden="true" />

      <Navbar activePage="projects" />

      {/* Hero Header */}
      <section className="relative pt-16 pb-12 px-6 md:px-12 text-center max-w-4xl mx-auto z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-xs font-semibold text-[#091427] mb-4">
          <span className="w-2 h-2 rounded-full bg-[#d97706]" />
          <span>Proven Client Case Studies</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0f172a] tracking-tight leading-[1.1] mb-6">
          Real Results for <br />
          <span className="text-gradient-navy-gold">Ambitious Global Brands</span>
        </h1>
        <p className="text-base sm:text-lg text-[#475569] leading-relaxed max-w-2xl mx-auto mb-8">
          Browse our recent client collaborations across the US, UK, Canada, and UAE. From e-commerce scaling to top-ranking SEO campaigns, we turn business goals into measurable revenue.
        </p>
      </section>

      {/* Case Studies Grid */}
      <section className="relative py-8 px-6 md:px-12 z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study) => (
            <div
              key={study.id}
              className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xs card-hover flex flex-col justify-between group"
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

              {/* Tech Stack Chips & Link */}
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

                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 text-xs font-bold text-[#091427] bg-amber-50 hover:bg-amber-100 border border-amber-200/80 py-2.5 rounded-xl transition-colors"
                >
                  <span>Discuss Similar Project</span>
                  <span>→</span>
                </Link>
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
            className="inline-flex items-center gap-2 bg-[#d97706] hover:bg-[#b45309] text-white text-xs font-bold px-7 py-3.5 rounded-full shadow-lg shadow-[#d97706]/30 transition-all"
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
