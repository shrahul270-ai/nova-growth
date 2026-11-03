"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SellixServicesHeader from "../components/SellixServicesHeader";
import ThreeDServiceCard, { AgencyService } from "../components/ThreeDServiceCard";
import { trackInteraction } from "@/lib/tracker";
import { getClientLiveLocation } from "@/lib/geo";

export const masterServicesList: AgencyService[] = [
  {
    id: "flutter-app-dev",
    name: "Flutter App Development",
    tagline: "Cross-platform iOS & Android mobile apps engineered for fluid 60fps performance and cloud synchronization.",
    category: "Development",
    priceINR: "₹84,999",
    priceUSD: "$1,199",
    pricingSuffixINR: "One-time",
    pricingSuffixUSD: "One-time",
    numericINR: 84999,
    numericUSD: 1199,
    tat: "4–6 Weeks",
    deliverablesSummary: "iOS/Android app, Firebase, API integration, Store release",
    deliverables: [
      "Android & iOS single-codebase architecture",
      "Native-feel UI/UX design & micro-interactions",
      "Firebase backend & custom RESTful API integration",
      "Full Google Play Store & Apple App Store deployment",
      "Bi-weekly test builds via TestFlight & direct APKs",
    ],
    gradient: "linear-gradient(135deg, #4338ca 0%, #6366f1 50%, #a855f7 100%)",
    accentColor: "#6366f1",
    icon3D: "📱",
    badge: "Cross-Platform",
  },
  {
    id: "full-stack-php-dev",
    name: "Full-Stack PHP Web Development",
    tagline: "Custom Laravel and robust PHP architectures with scalable relational databases and secure admin panels.",
    category: "Development",
    priceINR: "₹49,999",
    priceUSD: "$699",
    pricingSuffixINR: "One-time",
    pricingSuffixUSD: "One-time",
    numericINR: 49999,
    numericUSD: 699,
    tat: "3–5 Weeks",
    deliverablesSummary: "Laravel/PHP, MySQL, secure admin dashboard, REST APIs",
    deliverables: [
      "Custom PHP / Laravel MVC scalable architecture",
      "Normalized MySQL database schema & indexing",
      "Secure custom role-based admin dashboard",
      "High-speed modern responsive frontend interface",
      "Comprehensive RESTful API construction & webhooks",
    ],
    gradient: "linear-gradient(135deg, #3730a3 0%, #4f46e5 50%, #9333ea 100%)",
    accentColor: "#4f46e5",
    icon3D: "⚡",
    badge: "Enterprise Backend",
  },
  {
    id: "wordpress-website-dev",
    name: "WordPress Website Development",
    tagline: "High-converting, bespoke WordPress digital experiences optimized for sub-second speeds and organic lead capture.",
    category: "Development",
    priceINR: "₹24,999",
    priceUSD: "$349",
    pricingSuffixINR: "One-time",
    pricingSuffixUSD: "One-time",
    numericINR: 24999,
    numericUSD: 349,
    tat: "7–10 Business Days",
    deliverablesSummary: "Elementor/Gutenberg custom design, speed tuning, forms",
    deliverables: [
      "Bespoke layout with Elementor Pro or native Gutenberg",
      "100% mobile responsiveness & cross-browser QA",
      "Core Web Vitals speed tuning (<1.8s page loads)",
      "Dynamic lead generation forms & CRM sync",
      "Complete on-page SEO foundation & schema integration",
    ],
    gradient: "linear-gradient(135deg, #1e1b4b 0%, #4338ca 50%, #7e22ce 100%)",
    accentColor: "#4338ca",
    icon3D: "🌐",
    badge: "High Speed CRO",
  },
  {
    id: "wp-maintenance-security",
    name: "WordPress Maintenance & Security Support",
    tagline: "Proactive 24/7 hardening, automated cloud backups, uptime monitoring, and zero-downtime maintenance.",
    category: "Support",
    priceINR: "₹9,999",
    priceUSD: "$149",
    pricingSuffixINR: "/month",
    pricingSuffixUSD: "/month",
    numericINR: 9999,
    numericUSD: 149,
    tat: "Ongoing Monthly Retainer",
    deliverablesSummary: "Weekly updates, cloud backups, malware audits, uptime",
    deliverables: [
      "Scheduled weekly core, theme, and plugin updates",
      "Automated off-site cloud backups with instant rollback",
      "Continuous malware scanning & WAF firewall hardening",
      "24/7 real-time uptime monitoring & incident alerts",
      "Monthly dedicated developer hours for custom site updates",
    ],
    gradient: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #475569 100%)",
    accentColor: "#64748b",
    icon3D: "🛡️",
    badge: "24/7 Shield",
  },
  {
    id: "seo-optimization",
    name: "Search Engine Optimization (SEO)",
    tagline: "Comprehensive technical audits, semantic keyword mapping, and full-funnel search dominance on Google.",
    category: "Optimization",
    priceINR: "₹29,999",
    priceUSD: "$449",
    pricingSuffixINR: "/month",
    pricingSuffixUSD: "/month",
    numericINR: 29999,
    numericUSD: 449,
    tat: "Ongoing Monthly Retainer",
    deliverablesSummary: "Technical SEO, on-page optimization, rank tracking",
    deliverables: [
      "In-depth technical SEO crawl & Core Web Vitals audit",
      "High-intent commercial keyword clustering & siloing",
      "Competitor gap analysis & ranking roadmap",
      "Semantic on-page metadata & internal link hierarchy",
      "Detailed monthly performance & ranking tracking reports",
    ],
    gradient: "linear-gradient(135deg, #312e81 0%, #4f46e5 50%, #7c3aed 100%)",
    accentColor: "#7c3aed",
    icon3D: "📈",
    badge: "Growth Engine",
    popular: true,
  },
  {
    id: "generative-engine-opt",
    name: "Generative Engine Optimization (GEO)",
    tagline: "Position your brand as the primary cited authority inside ChatGPT Search, Perplexity AI, Google Gemini & AI Overviews.",
    category: "Optimization",
    priceINR: "₹34,999",
    priceUSD: "$499",
    pricingSuffixINR: "One-time",
    pricingSuffixUSD: "One-time",
    numericINR: 34999,
    numericUSD: 499,
    tat: "2–3 Weeks",
    deliverablesSummary: "Structured for ChatGPT, Perplexity, Gemini, AI Overviews",
    deliverables: [
      "Content restructuring & semantic entity modeling for LLMs",
      "Knowledge graph establishment & Wikipedia entity citations",
      "Optimization for ChatGPT Search, Perplexity & Google Gemini",
      "LLM context window optimization & authoritative data hooks",
      "AI engine query visibility & brand citation report",
    ],
    gradient: "linear-gradient(135deg, #581c87 0%, #7c3aed 50%, #c084fc 100%)",
    accentColor: "#a855f7",
    icon3D: "🤖",
    badge: "AI Search Era",
    popular: true,
  },
  {
    id: "answer-engine-opt",
    name: "Answer Engine Optimization (AEO)",
    tagline: "Win Google Featured Snippets (Position Zero), voice search queries, and conversational People-Also-Ask clusters.",
    category: "Optimization",
    priceINR: "₹24,999",
    priceUSD: "$349",
    pricingSuffixINR: "One-time",
    pricingSuffixUSD: "One-time",
    numericINR: 24999,
    numericUSD: 349,
    tat: "10–14 Business Days",
    deliverablesSummary: "FAQ/Schema markup, voice search setup, snippet targets",
    deliverables: [
      "Comprehensive JSON-LD FAQ, HowTo & Organization markup",
      "Conversational query phrasing for direct answer engines",
      "Voice search readiness for Siri, Google Assistant & Alexa",
      "Algorithmic structure targeting Google Position Zero snippets",
      "PAA (People Also Ask) cluster capturing & deployment",
    ],
    gradient: "linear-gradient(135deg, #4c1d95 0%, #6d28d9 50%, #a855f7 100%)",
    accentColor: "#6d28d9",
    icon3D: "🎯",
    badge: "Position Zero",
  },
  {
    id: "guest-posting-outreach",
    name: "Guest Posting & High-DA Outreach",
    tagline: "Manual editorial blogger outreach securing permanent, contextual do-follow placements on verified high-DR sites.",
    category: "Marketing & Content",
    priceINR: "₹19,999",
    priceUSD: "$279",
    pricingSuffixINR: "/campaign",
    pricingSuffixUSD: "/campaign",
    numericINR: 19999,
    numericUSD: 279,
    tat: "2–3 Weeks per campaign",
    deliverablesSummary: "Authentic niche sites, contextual do-follow links, indexed",
    deliverables: [
      "100% manual outreach to verified niche-specific web properties",
      "Contextual do-follow links embedded inside native editorial content",
      "Permanent indexing guarantee with lifetime link replacement",
      "Strict quality benchmarks: DR 50+ to 85+, real organic traffic",
      "Transparent live delivery spreadsheet with Google Cache checks",
    ],
    gradient: "linear-gradient(135deg, #1e1b4b 0%, #3730a3 50%, #6366f1 100%)",
    accentColor: "#6366f1",
    icon3D: "📰",
    badge: "Do-Follow Index",
  },
  {
    id: "off-page-authority-links",
    name: "Off-Page SEO & Authority Backlinks",
    tagline: "Multi-tiered natural authority building designed to lift domain rating without triggering algorithmic penalties.",
    category: "Optimization",
    priceINR: "₹27,999",
    priceUSD: "$399",
    pricingSuffixINR: "/month",
    pricingSuffixUSD: "/month",
    numericINR: 27999,
    numericUSD: 399,
    tat: "Ongoing Monthly Retainer",
    deliverablesSummary: "Tiered authority backlinks, anchor diversification",
    deliverables: [
      "Multi-tier natural authority link acquisition strategy",
      "High-trust profile, foundation, and editorial citations",
      "Branded, partial-match, and URL anchor text balance",
      "100% white-hat algorithmic safety protocol",
      "Spam score auditing & toxic backlink disavowal monitoring",
    ],
    gradient: "linear-gradient(135deg, #312e81 0%, #4338ca 50%, #818cf8 100%)",
    accentColor: "#4338ca",
    icon3D: "🔗",
    badge: "Tier-1 Authority",
  },
  {
    id: "social-media-handling",
    name: "Social Media Handling & Growth",
    tagline: "Strategic editorial calendars, viral short-form reel scripts, custom feed graphics, and daily community management.",
    category: "Marketing & Content",
    priceINR: "₹21,999",
    priceUSD: "$299",
    pricingSuffixINR: "/month",
    pricingSuffixUSD: "/month",
    numericINR: 21999,
    numericUSD: 299,
    tat: "Ongoing Monthly Retainer",
    deliverablesSummary: "Monthly creatives, captions, reel scripts, engagement",
    deliverables: [
      "Monthly content calendar with 20+ custom feed creatives",
      "Conversion-driven copywriting & hashtag cluster research",
      "Short-form viral reel & TikTok / YouTube Shorts scripts",
      "Daily community engagement, comment reply & DM monitoring",
      "Monthly follower growth, reach & conversion analytics report",
    ],
    gradient: "linear-gradient(135deg, #581c87 0%, #7e22ce 50%, #c084fc 100%)",
    accentColor: "#a855f7",
    icon3D: "✨",
    badge: "Viral Reach",
  },
  {
    id: "professional-content-writing",
    name: "Professional Content Writing",
    tagline: "High-search-intent blog posts, landing page copy, and whitepapers crafted by humans for readers and search engines.",
    category: "Marketing & Content",
    priceINR: "₹7,999",
    priceUSD: "$119",
    pricingSuffixINR: "/package",
    pricingSuffixUSD: "/package",
    numericINR: 7999,
    numericUSD: 119,
    tat: "3–5 Business Days",
    deliverablesSummary: "SEO articles, landing page copy, plagiarism-free",
    deliverables: [
      "High-search-intent blog articles (1,500 - 3,000 words)",
      "High-converting landing page & sales funnel copywriting",
      "Enterprise case studies, whitepapers & downloadable guides",
      "100% human-written, editor-reviewed & Copyscape verified",
      "On-page SurferSEO / Clearscope keyword density tuning",
    ],
    gradient: "linear-gradient(135deg, #1e1b4b 0%, #2e1065 50%, #6b21a8 100%)",
    accentColor: "#6b21a8",
    icon3D: "✍️",
    badge: "Human Verified",
  },
  {
    id: "email-marketing-automation",
    name: "Email Marketing & Automation",
    tagline: "Automated drip sequences, retention funnels, and enterprise SPF/DKIM/DMARC domain authentication.",
    category: "Marketing & Content",
    priceINR: "₹18,999",
    priceUSD: "$269",
    pricingSuffixINR: "One-time",
    pricingSuffixUSD: "One-time",
    numericINR: 18999,
    numericUSD: 269,
    tat: "7–12 Business Days",
    deliverablesSummary: "Nurture sequences, responsive design, DKIM/SPF setup",
    deliverables: [
      "High-converting automated welcome, nurture & cart recovery flows",
      "Responsive custom HTML & drag-and-drop newsletter templates",
      "Complete DNS domain authentication (SPF, DKIM, DMARC, BIMI)",
      "Customer lifecycle segmentation & behavioral triggers",
      "A/B split testing for subject lines & monthly revenue tracking",
    ],
    gradient: "linear-gradient(135deg, #3b0764 0%, #581c87 50%, #9333ea 100%)",
    accentColor: "#7e22ce",
    icon3D: "💌",
    badge: "Inbox Retention",
  },
];

export default function ServicesClient() {
  const [currency, setCurrency] = useState<"INR" | "USD">("USD");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeModalService, setActiveModalService] = useState<AgencyService | null>(null);
  const [bookingService, setBookingService] = useState<AgencyService | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Lead Booking Form State
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    budget: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Initialize Currency via Geo-IP check and localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("bpm_currency");
      if (saved === "INR" || saved === "USD") {
        setCurrency(saved);
        return;
      }

      // Geo-IP detection fallback
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      if (
        timeZone.includes("Calcutta") ||
        timeZone.includes("Kolkata") ||
        timeZone.includes("India")
      ) {
        setCurrency("INR");
        localStorage.setItem("bpm_currency", "INR");
      } else {
        setCurrency("USD");
        localStorage.setItem("bpm_currency", "USD");
      }
    } catch (e) {
      setCurrency("USD");
    }
  }, []);

  const switchCurrency = (newCurrency: "INR" | "USD") => {
    setCurrency(newCurrency);
    try {
      localStorage.setItem("bpm_currency", newCurrency);
    } catch (e) {}
    showToast(`Currency switched to ${newCurrency === "INR" ? "Indian Rupee (₹)" : "US Dollar ($)"}`);
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  // Keyboard close for modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModalService(null);
        setBookingService(null);
      }
    };
    if (activeModalService || bookingService) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [activeModalService, bookingService]);

  // Filter & Search
  const filteredServices = masterServicesList.filter((s) => {
    const matchesCategory =
      activeCategory === "All" || s.category === activeCategory;
    const matchesQuery =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.deliverables.some((d) => d.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingService) return;
    setIsSubmitting(true);

    try {
      const clientGeo = await getClientLiveLocation();
      await fetch("/api/db/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "service_strategy_call",
          serviceId: bookingService.id,
          serviceName: bookingService.name,
          currency,
          price: currency === "INR" ? bookingService.priceINR : bookingService.priceUSD,
          formData: bookingForm,
          clientGeo,
        }),
      });

      trackInteraction({
        action: "email",
        title: `Service Strategy Call: ${bookingService.name}`,
        details: bookingForm.email,
        sourcePage: "/services",
      });

      setSubmitSuccess(true);
      showToast("🎉 Strategy call inquiry submitted! We will respond within 4 hours.");
    } catch (err) {
      setSubmitSuccess(true);
      showToast("🎉 Inquiry recorded successfully!");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Build JSON-LD Schema
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Balaji Prime Media Agency Services Directory",
    "description": "Master directory of 12 full-stack digital growth, web development, and search optimization services.",
    "itemListElement": masterServicesList.map((service, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Service",
        "name": service.name,
        "description": service.tagline,
        "provider": {
          "@type": "Organization",
          "name": "Balaji Prime Media",
          "url": "https://balajiprimemedia.in",
        },
        "offers": {
          "@type": "Offer",
          "priceCurrency": currency,
          "price": currency === "INR" ? service.numericINR : service.numericUSD,
          "availability": "https://schema.org/InStock",
        },
      },
    })),
  };

  return (
    <div className="relative min-h-screen bg-[#09080E] text-[#ADADAD] selection:bg-[#7c3aed] selection:text-white overflow-hidden">
      {/* Background Ambient Glows (Matching Footer Colors: Purple, Indigo & Violet) */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.12)_0%,transparent_70%)] pointer-events-none -z-0"
      />
      <div
        aria-hidden="true"
        className="absolute top-2/3 left-0 w-[600px] h-[400px] bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.14)_0%,transparent_70%)] pointer-events-none -z-0"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-1/4 right-0 w-[600px] h-[400px] bg-[radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.14)_0%,transparent_70%)] pointer-events-none -z-0"
      />

      {/* Structured Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-24 right-6 z-50 bg-[#161126] text-white border border-[#a855f7]/60 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-fadeIn text-xs font-semibold backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#c084fc] animate-ping" />
          <span>{toast}</span>
          <button
            onClick={() => setToast(null)}
            className="ml-2 text-gray-400 hover:text-white text-xs cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* 100% Transparent Navbar Overlay */}
      <div className="absolute top-0 left-0 right-0 z-40 bg-transparent pointer-events-auto">
        <Navbar activePage="services" />
      </div>

      {/* Sellix Cross-border Finance Rotating Globe Hero Header */}
      <SellixServicesHeader />

      {/* Master Services Section */}
      <section id="services-grid" className="relative py-14 sm:py-20 px-4 sm:px-6 md:px-12 z-10 max-w-7xl mx-auto">
        
        {/* Section Header with Sticky Currency Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-8 border-b border-[#231A33]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#18122B]/90 border border-[#a855f7]/35 text-[#c084fc] text-[11px] font-medium shadow-sm backdrop-blur-xs mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c084fc] animate-pulse" />
              <span>Full-Funnel Organic Growth Directory</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Master Service Directory
            </h2>
            <p className="text-xs sm:text-sm text-[#ADADAD] max-w-2xl mt-2.5 leading-relaxed">
              12 production-grade agency services with structured deliverables, verified turnaround timelines, and dual-currency settlements.
            </p>
          </div>

          {/* Sticky Dual-Currency Switcher Pill (Matching Footer Violet Theme) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 self-start md:self-end">
            <span className="text-xs font-semibold text-[#7D7D7D] uppercase tracking-wider">
              Settlement Currency:
            </span>
            <div className="inline-flex items-center p-1 rounded-2xl bg-[#140F24] border border-[#2B2144] shadow-xl backdrop-blur-xl">
              <button
                type="button"
                onClick={() => switchCurrency("INR")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  currency === "INR"
                    ? "bg-gradient-to-r from-[#6366f1] via-[#7c3aed] to-[#a855f7] text-white shadow-lg shadow-purple-950/80"
                    : "text-[#94a3b8] hover:text-white"
                }`}
              >
                <span>🇮🇳 ₹ INR</span>
              </button>

              <button
                type="button"
                onClick={() => switchCurrency("USD")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  currency === "USD"
                    ? "bg-gradient-to-r from-[#6366f1] via-[#7c3aed] to-[#a855f7] text-white shadow-lg shadow-purple-950/80"
                    : "text-[#94a3b8] hover:text-white"
                }`}
              >
                <span>🌐 $ USD</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live Filter & Search Controls */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            {["All", "Development", "Optimization", "Marketing & Content", "Support"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-bold shadow-md shadow-purple-950/60 border border-[#c084fc]/30"
                    : "bg-[#140F24] text-[#94a3b8] hover:text-white hover:bg-[#1E1638] border border-[#2B2144]"
                }`}
              >
                {cat} {cat === "All" && `(${masterServicesList.length})`}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-72">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7D7D7D] text-xs">🔍</span>
            <input
              type="text"
              placeholder="Search deliverables, tech, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#140F24] border border-[#2B2144] focus:border-[#a855f7]/60 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-[#7D7D7D] outline-none transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* 3D Service Cards Responsive Grid */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-16 bg-[#140F24]/60 border border-[#2B2144] rounded-3xl p-8">
            <span className="text-4xl block mb-3">🔍</span>
            <h3 className="text-xl font-bold text-white mb-1">No services found</h3>
            <p className="text-xs text-[#94a3b8] mb-4">
              We couldn&apos;t find any service matching &quot;{searchQuery}&quot;.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
              className="px-4 py-2 rounded-xl bg-[#1E1638] hover:bg-[#281D4A] text-xs font-semibold text-white border border-[#a855f7]/30 transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div key={activeCategory} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {filteredServices.map((service, idx) => (
              <div key={service.id} className="h-full flex">
                <ThreeDServiceCard
                  service={service}
                  currency={currency}
                  index={idx}
                  onBookCall={(svc) => {
                    setBookingService(svc);
                    setSubmitSuccess(false);
                  }}
                  onViewScope={(svc) => setActiveModalService(svc)}
                />
              </div>
            ))}
          </div>
        )}

        {/* Master Pricing & Delivery Matrix Table */}
        <div className="mt-20 pt-12 border-t border-[#231A33]">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#18122B]/90 border border-[#a855f7]/35 text-[#c084fc] text-[11px] font-medium shadow-sm backdrop-blur-xs mb-3">
              <span className="text-[10px] text-[#fcd34d]">✦</span>
              <span>Master Pricing &amp; Delivery Matrix</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              All 12 Agency Services at a Glance
            </h3>
            <p className="text-xs sm:text-sm text-[#ADADAD] mt-2 leading-relaxed">
              Standardized deliverables, transparent pricing in {currency === "INR" ? "INR (₹)" : "USD ($)"}, and guaranteed turnaround times.
            </p>
          </div>

          {/* Swipe indicator for mobile users */}
          <div className="flex items-center justify-end md:hidden text-[11px] text-[#94a3b8] mb-2.5 gap-1.5 px-2">
            <span>Scroll table horizontally</span>
            <span className="text-[#c084fc] animate-pulse">⇄</span>
          </div>

          <div className="overflow-x-auto rounded-2xl sm:rounded-3xl border border-[#2B2144] bg-[#110D1D]/90 backdrop-blur-2xl shadow-2xl -mx-2 sm:mx-0">
            <table className="w-full text-left text-xs border-collapse min-w-[640px] sm:min-w-[720px]">
              <thead>
                <tr className="border-b border-[#2B2144] bg-[#18122B] text-[#94a3b8] uppercase text-[11px] tracking-wider">
                  <th className="py-4 px-4 font-bold text-center w-14">#</th>
                  <th className="py-4 px-5 font-bold">Service Name</th>
                  <th className="py-4 px-5 font-bold hidden md:table-cell">Deliverables Summary</th>
                  <th className="py-4 px-5 font-bold text-right">Price ({currency})</th>
                  <th className="py-4 px-5 font-bold text-center">Turnaround (TAT)</th>
                  <th className="py-4 px-5 font-bold text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#231A33] text-[#cbd5e1]">
                {masterServicesList.map((svc, index) => (
                  <tr key={svc.id} className="hover:bg-[#1C1533]/50 transition-colors">
                    <td className="py-4 px-4 font-mono text-center text-[#c084fc] font-bold">
                      {String(index + 1).padStart(2, "0")}
                    </td>
                    <td className="py-4 px-5">
                      <div className="font-bold text-white text-sm flex items-center gap-2">
                        <span>{svc.icon3D}</span>
                        <span>{svc.name}</span>
                      </div>
                      <div className="text-[11px] text-[#94a3b8] block md:hidden mt-1">
                        {svc.deliverablesSummary}
                      </div>
                    </td>
                    <td className="py-4 px-5 hidden md:table-cell text-[#ADADAD]">
                      {svc.deliverablesSummary}
                    </td>
                    <td className="py-4 px-5 text-right font-bold text-white text-sm whitespace-nowrap">
                      <span className="text-white">
                        {currency === "INR" ? svc.priceINR : svc.priceUSD}
                      </span>
                      <span className="text-[10px] text-[#94a3b8] block font-normal">
                        {currency === "INR" ? svc.pricingSuffixINR : svc.pricingSuffixUSD}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-center whitespace-nowrap">
                      <span className="inline-block px-2.5 py-1 rounded-lg bg-[#18122B] border border-[#2B2144] text-[11px] font-medium text-gray-200">
                        ⏱ {svc.tat}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-center whitespace-nowrap">
                      <a
                        href={`https://wa.me/918000417058?text=${encodeURIComponent(
                          `Hi Balaji Prime Media, I am interested in ${svc.name}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#a855f7] hover:brightness-110 text-white font-semibold text-[11px] transition-all cursor-pointer shadow-sm"
                      >
                        Quote 💬
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Full Scope & Deliverables Modal */}
      {activeModalService && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveModalService(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto"
        >
          <div className="bg-[#120E22] rounded-[22px] sm:rounded-[28px] max-w-xl w-full p-4.5 sm:p-8 shadow-2xl border border-[#2B2144] relative text-left max-h-[90vh] overflow-y-auto my-auto text-white">
            <div className="flex items-center justify-between pb-4 border-b border-[#231A33] mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{activeModalService.icon3D}</span>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#c084fc] bg-[#1E1638] px-2.5 py-0.5 rounded-full border border-[#a855f7]/30">
                    {activeModalService.badge}
                  </span>
                  <span className="text-xs text-[#94a3b8] block mt-0.5">
                    {activeModalService.category}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setActiveModalService(null)}
                className="w-8 h-8 rounded-full bg-[#18122B] hover:bg-[#281D4A] text-white flex items-center justify-center text-xs font-bold transition-all cursor-pointer border border-[#2B2144]"
              >
                ✕
              </button>
            </div>

            <h3 className="text-2xl font-bold tracking-tight mb-2">
              {activeModalService.name}
            </h3>
            <p className="text-xs text-[#ADADAD] leading-relaxed mb-5">
              {activeModalService.tagline}
            </p>

            <div className="bg-[#09080E] p-4 rounded-2xl border border-[#2B2144] mb-6 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#94a3b8]">Standard Pricing ({currency}):</span>
                <span className="font-bold text-white text-sm">
                  {currency === "INR" ? activeModalService.priceINR : activeModalService.priceUSD}{" "}
                  {currency === "INR" ? activeModalService.pricingSuffixINR : activeModalService.pricingSuffixUSD}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94a3b8]">Turnaround Time (TAT):</span>
                <span className="font-semibold text-white">⏱ {activeModalService.tat}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94a3b8]">Escrow Security:</span>
                <span className="font-semibold text-[#c084fc]">✓ 100% Milestone Based</span>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#7D7D7D] mb-3">
                Comprehensive Deliverables:
              </h4>
              <ul className="space-y-2">
                {activeModalService.deliverables.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-[#cbd5e1]">
                    <span className="text-[#a855f7] font-bold shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#231A33]">
              <a
                href={`https://wa.me/918000417058?text=${encodeURIComponent(
                  `Hi Balaji Prime Media, I would like to get a quote for ${activeModalService.name}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gradient-to-r from-[#6366f1] via-[#7c3aed] to-[#a855f7] hover:brightness-110 text-white font-semibold py-3 px-5 rounded-xl text-xs text-center cursor-pointer shadow-md"
              >
                Instant WhatsApp Quote 💬
              </a>
              <button
                type="button"
                onClick={() => {
                  setBookingService(activeModalService);
                  setActiveModalService(null);
                }}
                className="px-5 py-3 rounded-xl text-xs font-semibold text-white bg-[#18122B] hover:bg-[#281D4A] border border-[#2B2144] transition-all cursor-pointer text-center"
              >
                Book Strategy Call 📅
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Book Strategy Call Lead Intake Modal */}
      {bookingService && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setBookingService(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto"
        >
          <div className="bg-[#120E22] rounded-[22px] sm:rounded-[28px] max-w-lg w-full p-4.5 sm:p-8 shadow-2xl border border-[#2B2144] relative text-left max-h-[90vh] overflow-y-auto my-auto text-white">
            <div className="flex items-center justify-between pb-3 border-b border-[#231A33] mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#c084fc]">
                  Book Strategy Discovery
                </span>
                <h3 className="text-lg font-bold text-white">
                  {bookingService.name}
                </h3>
              </div>
              <button
                onClick={() => setBookingService(null)}
                className="w-8 h-8 rounded-full bg-[#18122B] hover:bg-[#281D4A] text-white flex items-center justify-center text-xs font-bold transition-all cursor-pointer border border-[#2B2144]"
              >
                ✕
              </button>
            </div>

            {submitSuccess ? (
              <div className="py-8 text-center space-y-4">
                <span className="w-14 h-14 mx-auto rounded-full bg-[#a855f7]/20 text-[#c084fc] border border-[#a855f7]/40 flex items-center justify-center text-2xl font-bold">
                  ✓
                </span>
                <h4 className="text-xl font-bold text-white">Inquiry Received!</h4>
                <p className="text-xs text-[#ADADAD] max-w-sm mx-auto leading-relaxed">
                  Thank you! Our growth team will review your requirements for{" "}
                  <strong className="text-[#c084fc]">{bookingService.name}</strong> and reach out via email/WhatsApp within 4 hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setBookingService(null)}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#a855f7] hover:brightness-110 text-white font-bold text-xs cursor-pointer shadow-md"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-semibold text-[#94a3b8] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                    className="w-full bg-[#18122B] border border-[#2B2144] focus:border-[#a855f7] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#94a3b8] mb-1">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@company.com"
                      value={bookingForm.email}
                      onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                      className="w-full bg-[#18122B] border border-[#2B2144] focus:border-[#a855f7] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#94a3b8] mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                      className="w-full bg-[#18122B] border border-[#2B2144] focus:border-[#a855f7] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#94a3b8] mb-1">
                    Website URL or Project Link
                  </label>
                  <input
                    type="url"
                    placeholder="https://yourwebsite.com"
                    value={bookingForm.website}
                    onChange={(e) => setBookingForm({ ...bookingForm, website: e.target.value })}
                    className="w-full bg-[#18122B] border border-[#2B2144] focus:border-[#a855f7] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#94a3b8] mb-1">
                    Scope Notes / Goals
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe what you'd like to achieve with this service..."
                    value={bookingForm.notes}
                    onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                    className="w-full bg-[#18122B] border border-[#2B2144] focus:border-[#a855f7] rounded-xl p-3 text-xs text-white outline-none resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#6366f1] via-[#7c3aed] to-[#a855f7] hover:brightness-110 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl text-xs transition-all shadow-lg shadow-purple-950/80 cursor-pointer"
                  >
                    {isSubmitting ? "Submitting Inquiry..." : "Confirm & Schedule Call →"}
                  </button>
                  <p className="text-[10px] text-[#7D7D7D] text-center mt-2">
                    🔒 Zero spam. We sign mutual NDAs upon request.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Global Escrow & Settlement Banner (Matching Footer Luxury Indigo Theme) */}
      <section className="relative py-16 px-6 md:px-12 z-10 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-[#140F24] via-[#1B1433] to-[#140F24] rounded-[32px] p-8 md:p-12 border border-[#a855f7]/30 shadow-2xl text-white flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E1638] text-[#c084fc] text-xs font-semibold mb-3 border border-[#a855f7]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7] animate-ping" />
              <span>Multi-Currency Escrow &amp; Bank Settlement</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
              Ready to Authorize a Service or Retainer?
            </h3>
            <p className="text-xs sm:text-sm text-[#ADADAD] leading-relaxed">
              Our dedicated global client payment portal supports domestic settlements in INR (₹), USD ($), GBP (£), EUR (€), AUD (A$), and AED (د.إ) via Stripe, Bank Wire/SWIFT, Wise, UPI, and PayPal with zero foreign transaction fees.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
            <Link
              href="/pay"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#6366f1] via-[#7c3aed] to-[#a855f7] hover:brightness-110 text-white font-bold px-7 py-4 rounded-2xl text-xs sm:text-sm shadow-xl shadow-purple-950/80 transition-all text-center whitespace-nowrap cursor-pointer"
            >
              <span>Open Payment Portal</span>
              <span>💳 →</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[#18122B] hover:bg-[#281D4A] text-white border border-[#2B2144] font-semibold px-6 py-4 rounded-2xl text-xs sm:text-sm transition-all text-center whitespace-nowrap cursor-pointer"
            >
              <span>Custom Enterprise RFP</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
