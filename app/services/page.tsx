"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeaderBackgroundAnimation from "../components/HeaderBackgroundAnimation";

const serviceList = [
  {
    id: "seo",
    icon: "🔍",
    badge: "Organic Growth",
    title: "SEO Optimization & Organic Growth",
    tagline: "Rank higher, capture high-intent searchers, and drive sustainable pipeline.",
    description:
      "We design data-driven SEO strategies tailored for competitive international markets like the US, UK, and Europe. From deep technical audits and semantic keyword mapping to on-page CRO, we help your business dominate Google.",
    deliverables: [
      "In-depth Technical SEO & Core Web Vitals audit",
      "High-intent commercial keyword clustering",
      "Competitor gap analysis & ranking roadmap",
      "Schema markup, rich snippet & metadata optimization",
      "Bi-weekly ranking reports & live Data Studio dashboard",
    ],
    timeline: "Ongoing Retainer (3 - 6 Months)",
    idealClients: "B2B SaaS, E-Commerce, High-Ticket Professional Services",
    startingFrom: "$899 / mo"
  },
  {
    id: "web-dev",
    icon: "</>",
    badge: "Web Experience",
    title: "Website Development & Modern CRO",
    tagline: "Modern, ultra-fast and responsive web apps built with Next.js & Tailwind CSS.",
    description:
      "Your website is your best salesperson. We craft pixel-perfect, lightning-fast digital experiences that turn foreign visitors into qualified leads. Optimized for maximum performance and 95+ Google PageSpeed scores.",
    deliverables: [
      "Custom responsive design & interactive animations",
      "Next.js App Router & server-side rendering for instant loading",
      "Conversion-focused landing pages & UX wireframing",
      "Headless CMS integration (Sanity, Strapi, WordPress)",
      "Cross-browser testing & international accessibility (WCAG)",
    ],
    timeline: "3 to 6 Weeks Turnaround",
    idealClients: "Modern Tech Startups, Venture-backed Brands, Rebranding Firms",
    startingFrom: "$2,400 One-time"
  },
  {
    id: "content",
    icon: "📄",
    badge: "Thought Leadership",
    title: "Content Writing & Strategy",
    tagline: "Powerful editorial content that connects, educates, and converts.",
    description:
      "Content created specifically for international audiences. We produce researched long-form articles, landing page copy, case studies, and lead magnets that establish your brand authority and rank organically.",
    deliverables: [
      "Audience persona research & topical authority maps",
      "SEO long-form articles (1,500 - 3,000 words)",
      "High-converting landing page copywriting",
      "Case studies & customer success stories",
      "Search-optimized lead magnets & whitepapers",
    ],
    timeline: "Weekly / Monthly Deliveries",
    idealClients: "Enterprise Blogs, FinTech, Legal, HealthTech",
    startingFrom: "$600 / mo"
  },
  {
    id: "email",
    icon: "✉️",
    badge: "Retention & CRM",
    title: "Email Marketing & Automation",
    tagline: "Build lasting customer relationships and maximize lifetime value (LTV).",
    description:
      "Turn cold subscribers into raving brand advocates. We build end-to-end email funnels, drip campaigns, automated abandoned cart flows, and personalized newsletters using Klaviyo, HubSpot, and ActiveCampaign.",
    deliverables: [
      "Automated welcome & nurture sequences",
      "Segmentation & behavioral trigger workflows",
      "A/B testing for subject lines & copy",
      "Deliverability & spam-score optimization",
      "Monthly campaign analytics & revenue attribution",
    ],
    timeline: "2 Weeks Setup + Ongoing Optimization",
    idealClients: "D2C Brands, Subscription Platforms, Course Creators",
    startingFrom: "$750 / mo"
  },
  {
    id: "backlinks",
    icon: "🔗",
    badge: "Domain Authority",
    title: "Off-Page Backlink Building & Digital PR",
    tagline: "Stronger domain authority through ethical, editorial outreach.",
    description:
      "No PBNs, no spam. We acquire contextual, high-DA backlinks from real editorial publications and industry-relevant websites. We build genuine authority that Google algorithms reward with top SERP positions.",
    deliverables: [
      "100% white-hat manual outreach campaigns",
      "Guest editorial placements on DA 50+ to DA 80+ sites",
      "Unlinked brand mention reclaiming",
      "Digital PR outreach & resource page placements",
      "Full transparent backlink reports with live URLs",
    ],
    timeline: "Monthly Editorial Cycles",
    idealClients: "Competitive Niches, Software Brands, Global Aggregators",
    startingFrom: "$950 / mo"
  },
  {
    id: "maintenance",
    icon: "⚙️",
    badge: "Security & Care",
    title: "Website Maintenance & Speed Optimization",
    tagline: "Keep your site secure, updated, and operating at peak performance 24/7.",
    description:
      "Websites require proactive upkeep. We handle cloud hosting monitoring, security patching, plugin updates, speed optimizations, and ongoing design tweaks so you can focus entirely on growing your business.",
    deliverables: [
      "24/7 uptime & automated cloud backups",
      "Security scanning & malware firewall protection",
      "Continuous Core Web Vitals speed monitoring",
      "On-demand monthly developer hours for new updates",
      "Time-zone aligned emergency support",
    ],
    timeline: "24/7 Continuous Upkeep",
    idealClients: "Any Business Requiring 99.99% Uptime",
    startingFrom: "$350 / mo"
  },
];

const packages = [
  {
    id: "starter",
    name: "Starter Growth",
    price: "$899",
    period: "/month",
    description: "Ideal for emerging brands and local businesses looking to establish solid organic presence.",
    features: [
      "Complete Technical SEO Setup",
      "Up to 15 Target Keywords",
      "2 High-Quality SEO Articles / Month",
      "3 High-DA Editorial Backlinks",
      "Monthly Performance Dashboard",
      "Timezone Aligned Email Support",
    ],
    popular: false,
  },
  {
    id: "scale",
    name: "Scale Accelerator",
    price: "$1,899",
    period: "/month",
    description: "Our most popular package for growing businesses targeting US, UK, and European markets.",
    features: [
      "Advanced SEO & CRO Roadmap",
      "Up to 35 Target Keywords",
      "5 Long-Form SEO Articles / Month",
      "8 Premium High-DA Backlinks",
      "Speed & Core Web Vitals Optimization",
      "Bi-Weekly Strategy Calls",
      "Dedicated Slack Channel",
    ],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise Domination",
    price: "$3,499",
    period: "/month",
    description: "Full-scale outsourced growth team for international SaaS, E-Commerce, and multi-location brands.",
    features: [
      "End-to-End Growth Strategy",
      "Unlimited Keyword Tracking",
      "10 Premium SEO Articles / Month",
      "15 Tier-1 Digital PR Backlinks",
      "Custom Next.js Feature Dev / Month",
      "Weekly Strategic Syncs",
      "24/7 Priority Support",
    ],
    popular: false,
  },
];

export default function ServicesPage() {
  const [activeModalService, setActiveModalService] = useState<typeof serviceList[0] | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModalService(null);
      }
    };
    if (activeModalService) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [activeModalService]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const scrollToPayment = (planName: string) => {
    showToast(`💼 Plan "${planName}" selected. Scrolling to Payment Portal...`);
    const el = document.getElementById("payment");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

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

      <Navbar activePage="services" />

      {/* Hero Header with Full-Width Animated Background */}
      <section className="relative w-full pt-10 pb-12 sm:pt-16 sm:pb-16 px-4 sm:px-6 md:px-12 text-center z-10 overflow-hidden">
        <HeaderBackgroundAnimation variant="subpage" />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-xs font-semibold text-[#091427] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#d97706]" />
            <span>Full-Funnel Growth Services</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#0f172a] tracking-tight leading-[1.1] mb-5 sm:mb-6">
            Digital Solutions Designed for <br className="hidden sm:inline" />
            <span className="text-gradient-navy-gold">Measurable Growth</span>
          </h1>
          <p className="text-sm sm:text-lg text-[#475569] leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
            From high-ranking international SEO and fast Next.js development to high-converting content and ethical link building, we offer end-to-end services built for overseas scaling.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-stretch sm:items-center gap-3 sm:gap-4">
          <Link
            href="/contact"
            className="btn-3d inline-flex items-center justify-center gap-2 bg-[#091427] hover:bg-[#0f213d] text-white text-xs sm:text-sm font-bold px-6 sm:px-7 py-3 sm:py-3.5 rounded-full shadow-lg shadow-[#091427]/25 transition-all cursor-pointer"
          >
            <span>Request Custom Proposal</span>
            <span>→</span>
          </Link>
          <Link
            href="/guest-posting"
            className="btn-gold-3d inline-flex items-center justify-center gap-2 bg-[#d97706] hover:bg-[#b45309] text-white text-xs sm:text-sm font-bold px-5 sm:px-7 py-3 sm:py-3.5 rounded-full shadow-lg shadow-[#d97706]/30 transition-all cursor-pointer"
          >
            <span>Guest Posting (DR 50-90+)</span>
            <span>⚡</span>
          </Link>
          <Link
            href="/pay"
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-amber-50 text-[#091427] border border-[#d97706]/40 text-xs sm:text-sm font-bold px-6 sm:px-7 py-3 sm:py-3.5 rounded-full shadow-sm transition-all cursor-pointer"
          >
            <span>Payment Portal</span>
            <span className="text-[#d97706]">💳</span>
          </Link>
        </div>
        </div>
      </section>

      {/* Detailed Services Grid */}
      <section className="relative py-8 sm:py-12 px-4 sm:px-6 md:px-12 z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {serviceList.map((service) => (
            <div
              key={service.id}
              onClick={() => {
                setActiveModalService(service);
                showToast(`📋 Opened scope overview for ${service.title}`);
              }}
              className="bg-white rounded-3xl p-5 sm:p-8 border border-gray-100 shadow-xs card-3d flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <span className="w-12 h-12 rounded-2xl bg-amber-50 text-[#d97706] border border-amber-200/60 flex items-center justify-center text-xl font-bold group-hover:scale-105 transition-transform">
                      {service.icon}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/80">
                      {service.badge}
                    </span>
                  </div>
                  <span className="text-gray-400 group-hover:text-[#d97706] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all font-bold text-lg">
                    ↗
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-[#0f172a] group-hover:text-[#091427] transition-colors mb-2">{service.title}</h2>
                <p className="text-sm font-medium text-[#d97706] mb-3">{service.tagline}</p>
                <p className="text-sm text-[#64748b] leading-relaxed mb-6">{service.description}</p>

                <div className="border-t border-gray-100 pt-5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                    What&apos;s Included:
                  </h3>
                  <ul className="space-y-2">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-700 font-medium">
                        <span className="text-[#d97706] font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs font-bold text-[#091427] group-hover:text-[#d97706] flex items-center gap-1.5 transition-colors">
                  <span>View full scope &amp; deliverables</span>
                  <span>→</span>
                </span>
                <span className="text-[11px] font-semibold text-[#d97706] bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/60">
                  From {service.startingFrom}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Packages in USD */}
      <section className="relative py-10 sm:py-14 px-4 sm:px-6 md:px-12 z-10 bg-white/60 border-y border-amber-100/70">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
            <span className="text-xs font-bold text-[#091427] uppercase tracking-wider">
              Transparent Global Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0f172a] tracking-tight mt-2 mb-3">
              Simple Monthly Retainers
            </h2>
            <p className="text-sm text-[#64748b]">
              No hidden fees, no long-term lockups. Cancel or upgrade anytime with multi-currency settlement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {packages.map((pkg, idx) => (
              <div
                key={idx}
                className={`rounded-3xl p-8 relative flex flex-col justify-between transition-all ${
                  pkg.popular
                    ? "bg-white border-2 border-[#091427] shadow-xl scale-[1.02]"
                    : "bg-white border border-gray-100 shadow-xs"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#091427] text-white text-[11px] font-bold px-4 py-1 rounded-full tracking-wide">
                    MOST POPULAR
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold text-[#0f172a]">{pkg.name}</h3>
                  <p className="text-xs text-gray-500 mt-1 mb-5">{pkg.description}</p>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-black text-[#0f172a]">{pkg.price}</span>
                    <span className="text-xs font-semibold text-gray-500">{pkg.period}</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2.5 text-xs text-gray-700">
                        <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-[10px] shrink-0">
                          ✓
                        </span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/pay?plan=${pkg.id}`}
                  className={`w-full text-center py-3.5 rounded-full text-xs font-bold transition-all cursor-pointer block ${
                    pkg.popular
                      ? "bg-[#091427] hover:bg-[#0f213d] text-white shadow-md shadow-[#091427]/20"
                      : "bg-amber-50 hover:bg-amber-100 text-[#091427] border border-amber-200/80"
                  }`}
                >
                  Choose ${pkg.name} &amp; Settle →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dedicated Client Payment & Invoicing Gateway Teaser */}
      <section className="relative py-16 px-6 md:px-12 z-10 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-[#091427] via-[#0f213d] to-[#1e293b] rounded-3xl p-8 md:p-12 border border-[#d97706]/35 shadow-2xl text-white flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#d97706] text-xs font-bold mb-3 border border-[#d97706]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] animate-ping" />
              <span>🔒 256-Bit SSL Bank-Grade Escrow Settlement</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
              Ready to Authorize a Retainer or Settle an Invoice?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Our dedicated global client payment portal supports domestic settlements in USD ($), GBP (£), EUR (€), AUD (A$), and AED (د.إ) via Stripe, Bank Wire/SWIFT, Wise, and PayPal with zero foreign transaction fees.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
            <Link
              href="/pay"
              className="inline-flex items-center justify-center gap-2 bg-[#d97706] hover:bg-[#b45309] text-white font-bold px-7 py-4 rounded-2xl text-xs sm:text-sm shadow-xl shadow-[#d97706]/30 transition-all text-center whitespace-nowrap cursor-pointer"
            >
              <span>Open Payment Portal</span>
              <span>💳 →</span>
            </Link>
            <Link
              href="/pay?mode=invoice"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-6 py-4 rounded-2xl text-xs sm:text-sm transition-all text-center whitespace-nowrap cursor-pointer"
            >
              <span>Pay Custom Invoice #</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative py-16 px-6 md:px-12 z-10 text-center">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#091427] via-[#0f213d] to-[#1e293b] p-10 rounded-3xl border border-[#d97706]/35 shadow-xl text-white">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
            Need a Tailored Strategy for Your Niche?
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto mb-6">
            We build custom hybrid packages combining Next.js development, content authority, and international SEO.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#d97706] hover:bg-[#b45309] text-white text-xs font-bold px-7 py-3.5 rounded-full shadow-lg shadow-[#d97706]/30 transition-all cursor-pointer"
          >
            <span>Book a Free 30-Min Strategy Call</span>
            <span>→</span>
          </Link>
        </div>
      </section>

      {/* Interactive Service Detail Scope Modal */}
      {activeModalService && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveModalService(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn overflow-y-auto"
        >
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-gray-100 relative text-left max-h-[85vh] overflow-y-auto my-auto">
            {/* Sticky Header with Prominent Close Button */}
            <div className="sticky -top-6 -mt-2 -mx-2 px-2 pt-2 pb-3 bg-white/95 backdrop-blur-md border-b border-gray-100 flex items-center justify-between mb-4 z-20">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-amber-50 text-[#d97706] border border-amber-200/60 flex items-center justify-center text-sm font-bold">
                  {activeModalService.icon}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/80">
                  {activeModalService.badge}
                </span>
              </div>
              <button
                onClick={() => setActiveModalService(null)}
                aria-label="Close modal"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-700 text-xs font-bold transition-all cursor-pointer border border-gray-200"
              >
                <span className="text-sm">✕</span>
                <span>Close</span>
              </button>
            </div>

            <h3 className="text-2xl font-black text-[#0f172a] tracking-tight leading-tight mb-1">
              {activeModalService.title}
            </h3>
            <p className="text-xs text-[#d97706] font-semibold mb-4">{activeModalService.tagline}</p>

            <p className="text-xs text-[#54647c] leading-relaxed mb-5">
              {activeModalService.description}
            </p>

            <div className="bg-[#f8fafd] p-4 rounded-2xl border border-gray-200/80 mb-5 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500 font-semibold">Typical Timeline:</span>
                <span className="font-bold text-[#091427]">{activeModalService.timeline}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-semibold">Ideal For:</span>
                <span className="font-bold text-[#091427]">{activeModalService.idealClients}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-semibold">Investment Tier:</span>
                <span className="font-bold text-[#d97706]">{activeModalService.startingFrom}</span>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Detailed Deliverables Checklist:</h4>
              <ul className="space-y-1.5 text-xs text-[#54647c]">
                {activeModalService.deliverables.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#d97706] font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
              <Link
                href="/contact"
                className="flex-1 bg-[#091427] hover:bg-[#0f213d] text-white font-bold py-3.5 px-6 rounded-2xl text-xs transition-all shadow-md shadow-[#091427]/25 text-center cursor-pointer"
              >
                Book Discovery Call for This Service →
              </Link>
              <button
                type="button"
                onClick={() => setActiveModalService(null)}
                className="px-5 py-3.5 rounded-2xl text-xs font-semibold text-gray-600 hover:bg-gray-100 border border-gray-200 transition-colors cursor-pointer text-center"
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
