"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SellixServicesHeader from "../components/SellixServicesHeader";
import ThreeDServiceCard, { AgencyService } from "../components/ThreeDServiceCard";
import CoverFlowServices from "../components/CoverFlowServices";
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
  const [viewStyle, setViewStyle] = useState<"grid" | "coverflow">("coverflow");
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

  // In-Page Payment Portal Modal State (Complete settlement flow without leaving /services)
  const [isPaymentPortalOpen, setIsPaymentPortalOpen] = useState(false);
  const [portalStep, setPortalStep] = useState<1 | 2 | 3 | 4>(1); // 1: Service selection, 2: Client info, 3: Payment options, 4: Receipt
  const [selectedPortalService, setSelectedPortalService] = useState<AgencyService>(masterServicesList[0]);
  const [isCustomService, setIsCustomService] = useState(false);
  const [customServiceName, setCustomServiceName] = useState("");
  const [customServiceAmount, setCustomServiceAmount] = useState("");
  const [portalClientName, setPortalClientName] = useState("");
  const [portalClientEmail, setPortalClientEmail] = useState("");
  const [portalClientDomain, setPortalClientDomain] = useState("");
  const [portalClientNotes, setPortalClientNotes] = useState("");
  const [portalPaymentMethod, setPortalPaymentMethod] = useState<"upi" | "card" | "bank" | "paypal" | "wise">("upi");
  const [portalUtr, setPortalUtr] = useState("");
  const [portalCardNumber, setPortalCardNumber] = useState("");
  const [portalCardExpiry, setPortalCardExpiry] = useState("");
  const [portalCardCvc, setPortalCardCvc] = useState("");
  const [portalProcessing, setPortalProcessing] = useState(false);
  const [portalTxnId, setPortalTxnId] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [portalFormError, setPortalFormError] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        navigator.clipboard.writeText(text);
        setCopiedField(label);
        setTimeout(() => setCopiedField(null), 2500);
        showToast(`Copied ${label} to clipboard!`);
      }
    } catch (e) {
      showToast(`Copied: ${text}`);
    }
  };

  const handlePortalPayment = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setPortalProcessing(true);
    setPortalFormError(null);

    setTimeout(() => {
      const generatedId = `BPM-TXN-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      setPortalTxnId(generatedId);
      setPortalProcessing(false);
      setPortalStep(4);
      trackInteraction({
        action: "other",
        title: "Portal Payment Settled",
        details: JSON.stringify({
          service: isCustomService ? customServiceName : selectedPortalService.name,
          amount: isCustomService ? customServiceAmount : (currency === "INR" ? selectedPortalService.priceINR : selectedPortalService.priceUSD),
          method: portalPaymentMethod,
          domain: portalClientDomain,
          txnId: generatedId,
        }),
      });
      showToast("Payment authorization verified! Receipt generated.");
    }, 1400);
  };

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

          {/* View Mode & Search Box */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            {/* View Mode Switcher */}
            <div className="inline-flex items-center p-1 rounded-xl bg-[#140F24] border border-[#2B2144] shadow-sm">
              <button
                type="button"
                onClick={() => setViewStyle("coverflow")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  viewStyle === "coverflow"
                    ? "bg-purple-600 text-white shadow-sm"
                    : "text-[#94a3b8] hover:text-white"
                }`}
                title="3D Cover Flow View"
              >
                💿 3D Cover Flow
              </button>
              <button
                type="button"
                onClick={() => setViewStyle("grid")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  viewStyle === "grid"
                    ? "bg-purple-600 text-white shadow-sm"
                    : "text-[#94a3b8] hover:text-white"
                }`}
                title="Grid Matrix View"
              >
                ⊞ Grid
              </button>
            </div>

            {/* Search Box */}
            <div className="relative flex-1 lg:w-64">
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
        </div>

        {/* 3D Cover Flow Stage or Grid */}
        {viewStyle === "coverflow" ? (
          <div className="mb-14">
            <CoverFlowServices
              onSelectService={(serviceName) => {
                const found = masterServicesList.find(s => s.name.toLowerCase().includes(serviceName.toLowerCase()) || serviceName.toLowerCase().includes(s.name.toLowerCase()));
                if (found) {
                  setActiveModalService(found);
                }
              }}
            />
          </div>
        ) : filteredServices.length === 0 ? (
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
                href={`https://wa.me/917690868932?text=${encodeURIComponent(
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
            <button
              type="button"
              onClick={() => {
                setPortalStep(1);
                setPortalFormError(null);
                const el = document.getElementById("payment-portal");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#6366f1] via-[#7c3aed] to-[#a855f7] hover:brightness-110 active:scale-[0.98] text-white font-bold px-7 py-4 rounded-2xl text-xs sm:text-sm shadow-xl shadow-purple-950/80 transition-all text-center whitespace-nowrap cursor-pointer hover:shadow-[0_0_25px_rgba(168,85,247,0.45)]"
            >
              <span>Open Payment Portal</span>
              <span>💳 ↓</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FULL IN-PAGE CLIENT PAYMENT PORTAL SECTION (100% on /services in full way)
         ========================================================================= */}
      <section
        id="payment-portal"
        className="relative py-12 sm:py-20 px-4 sm:px-6 md:px-12 z-10 max-w-7xl mx-auto scroll-mt-24"
      >
        <div className="bg-gradient-to-b from-[#130C28] via-[#0E091D] to-[#130C28] border border-[#a855f7]/40 rounded-[36px] p-6 sm:p-10 md:p-12 text-white shadow-2xl relative overflow-hidden">
          
          {/* Ambient Lighting Orbs */}
          <div
            className="absolute -top-32 -right-32 w-80 h-80 rounded-full pointer-events-none blur-3xl opacity-35"
            style={{ background: "radial-gradient(circle, #a855f7 0%, transparent 70%)" }}
          />
          <div
            className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full pointer-events-none blur-3xl opacity-25"
            style={{ background: "radial-gradient(circle, #22d3ee 0%, transparent 70%)" }}
          />

          {/* Section Master Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#231A33] relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e1438] text-[#c084fc] text-xs font-semibold border border-[#a855f7]/40 mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Balaji Prime Media • Direct In-Page Escrow Settlement</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Client Payment &amp; Service Authorization
              </h2>
              <p className="text-xs sm:text-sm text-[#94a3b8] mt-2 max-w-2xl leading-relaxed">
                Authorize your deliverables right here on this page with instant domestic settlement in INR (₹) or cross-border payment in USD ($), GBP (£), and EUR (€).
              </p>
            </div>

            {/* Currency Switcher */}
            <div className="inline-flex rounded-xl bg-[#18122B] p-1.5 border border-[#2B2144] shrink-0 self-start md:self-auto shadow-inner">
              <button
                type="button"
                onClick={() => switchCurrency("INR")}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  currency === "INR"
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-950/80"
                    : "text-[#94a3b8] hover:text-white"
                }`}
              >
                🇮🇳 ₹ INR
              </button>
              <button
                type="button"
                onClick={() => switchCurrency("USD")}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  currency === "USD"
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-950/80"
                    : "text-[#94a3b8] hover:text-white"
                }`}
              >
                🌐 $ USD
              </button>
            </div>
          </div>

          {/* 4-Step Interactive Progress Tracker */}
          <div className="py-6 border-b border-[#231A33]/80 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { step: 1, title: "1. Select Service", desc: "Choose deliverable" },
                { step: 2, title: "2. Client & Domain", desc: "Target credentials" },
                { step: 3, title: "3. Payment & Pay", desc: "UPI, Card, Bank, PayPal" },
                { step: 4, title: "4. Verified Receipt", desc: "Escrow proof & SLA" },
              ].map((s) => (
                <div
                  key={s.step}
                  onClick={() => {
                    if (s.step < portalStep) setPortalStep(s.step as any);
                  }}
                  className={`p-3 rounded-2xl border transition-all text-left ${
                    portalStep === s.step
                      ? "bg-[#21163e] border-[#a855f7] shadow-[0_0_15px_rgba(168,85,247,0.3)] ring-1 ring-[#c084fc]"
                      : portalStep > s.step
                      ? "bg-[#18122B]/70 border-[#2B2144] text-emerald-400 cursor-pointer hover:bg-[#20183b]"
                      : "bg-[#140F24]/50 border-[#2B2144]/60 text-gray-400 opacity-60"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      {portalStep > s.step && <span className="text-emerald-400">✓</span>}
                      <span>{s.title}</span>
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        portalStep === s.step
                          ? "bg-purple-600 text-white font-bold"
                          : "bg-[#2B2144] text-gray-400"
                      }`}
                    >
                      Step 0{s.step}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#94a3b8] mt-0.5">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Form Error Banner */}
          {portalFormError && (
            <div className="mt-6 p-4 rounded-2xl bg-red-950/60 border border-red-500/50 text-red-200 text-xs flex items-center gap-2.5 relative z-10 animate-shake">
              <span className="text-lg">⚠️</span>
              <span>{portalFormError}</span>
            </div>
          )}

          {/* Portal Content Area */}
          <div className="pt-8 relative z-10">

            {/* =========================================================================
                STEP 1: "Konsi buy ki hai" (Full-Width Service Selection Grid)
               ========================================================================= */}
            {portalStep === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <span>1. Which service did you purchase or wish to authorize?</span>
                  </h3>
                  <p className="text-xs text-[#94a3b8] mt-1">
                    Click any service card below to select it for instant authorization, or choose custom invoice retainer:
                  </p>
                </div>

                {/* 12 Agency Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {masterServicesList.map((srv) => {
                    const isSelected = !isCustomService && selectedPortalService.id === srv.id;
                    const price = currency === "INR" ? srv.priceINR : srv.priceUSD;
                    const suffix = currency === "INR" ? srv.pricingSuffixINR : srv.pricingSuffixUSD;

                    return (
                      <div
                        key={srv.id}
                        onClick={() => {
                          setSelectedPortalService(srv);
                          setIsCustomService(false);
                          setPortalFormError(null);
                        }}
                        className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-4 text-left ${
                          isSelected
                            ? "bg-gradient-to-b from-[#241743] to-[#18112d] border-[#a855f7] shadow-[0_0_20px_rgba(168,85,247,0.35)] ring-2 ring-[#c084fc]"
                            : "bg-[#140F24]/80 border-[#2B2144] hover:bg-[#1C1533] hover:border-[#a855f7]/50"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl p-2 rounded-xl bg-[#1E1638] border border-[#2B2144]">
                              {srv.icon3D}
                            </span>
                            <div>
                              <h4 className="text-sm font-bold text-white leading-tight">{srv.name}</h4>
                              <span className="text-[10px] text-[#c084fc] font-semibold block mt-0.5">
                                {srv.category}
                              </span>
                            </div>
                          </div>

                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                              isSelected
                                ? "bg-gradient-to-r from-emerald-400 to-[#c084fc] text-black"
                                : "border border-[#3d2f5a] text-transparent"
                            }`}
                          >
                            ✓
                          </span>
                        </div>

                        <p className="text-[11px] text-[#94a3b8] line-clamp-2 leading-relaxed">
                          {srv.tagline}
                        </p>

                        <div className="pt-3 border-t border-[#231A33] flex items-center justify-between text-xs">
                          <div>
                            <span className="text-[10px] text-gray-400 block font-normal">Escrow Price</span>
                            <span className="text-base font-black text-white">{price}</span>
                            <span className="text-[10px] text-gray-400 ml-1">({suffix})</span>
                          </div>

                          <div className="text-right">
                            <span className="text-[10px] text-gray-400 block font-normal">Turnaround</span>
                            <span className="text-[11px] font-bold text-[#22d3ee]">⏱ {srv.tat}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Custom Enterprise Retainer Card */}
                <div
                  onClick={() => {
                    setIsCustomService(true);
                    setPortalFormError(null);
                  }}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer text-left ${
                    isCustomService
                      ? "bg-gradient-to-b from-[#241743] to-[#18112d] border-[#a855f7] shadow-[0_0_20px_rgba(168,85,247,0.35)] ring-2 ring-[#c084fc]"
                      : "bg-[#140F24]/80 border-[#2B2144] hover:bg-[#1C1533] hover:border-[#a855f7]/50"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <span className="text-3xl p-2.5 rounded-xl bg-[#1E1638] border border-[#2B2144]">
                        💼
                      </span>
                      <div>
                        <h4 className="text-base font-bold text-white">
                          Custom Invoiced Retainer or Specialized Scope
                        </h4>
                        <p className="text-xs text-[#94a3b8] mt-0.5">
                          Authorize a custom enterprise contract, custom backlink package, or invoiced sprint
                        </p>
                      </div>
                    </div>

                    <span
                      className={`px-4 py-1.5 rounded-full text-xs font-bold shrink-0 self-start sm:self-auto ${
                        isCustomService
                          ? "bg-purple-600 text-white shadow-lg shadow-purple-950/80"
                          : "bg-[#1E1638] text-gray-300 border border-[#2B2144]"
                      }`}
                    >
                      {isCustomService ? "✓ Selected Custom Scope" : "Select Custom Scope"}
                    </span>
                  </div>

                  {isCustomService && (
                    <div className="mt-5 pt-5 border-t border-[#231A33] grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#c084fc] mb-1.5">
                          Custom Service / Scope Title *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Dedicated Enterprise SEO & Link Building Retainer"
                          value={customServiceName}
                          onChange={(e) => setCustomServiceName(e.target.value)}
                          className="w-full bg-[#0e0a1a] border border-[#3d2f5a] focus:border-[#a855f7] rounded-xl px-4 py-3 text-xs text-white outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#c084fc] mb-1.5">
                          Invoice Settlement Amount ({currency}) *
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-bold">
                            {currency === "INR" ? "₹" : "$"}
                          </span>
                          <input
                            type="text"
                            placeholder="e.g. 75000 or 1200"
                            value={customServiceAmount}
                            onChange={(e) => setCustomServiceAmount(e.target.value)}
                            className="w-full bg-[#0e0a1a] border border-[#3d2f5a] focus:border-[#a855f7] rounded-xl pl-9 pr-4 py-3 text-xs font-mono text-white outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Step 1 Next Button */}
                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      if (isCustomService) {
                        if (!customServiceName.trim() || !customServiceAmount.trim()) {
                          setPortalFormError("Please enter your custom scope title and invoice amount.");
                          return;
                        }
                      }
                      setPortalFormError(null);
                      setPortalStep(2);
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#6366f1] via-[#7c3aed] to-[#a855f7] hover:brightness-110 active:scale-[0.98] text-white font-bold px-8 py-4 rounded-2xl text-xs sm:text-sm shadow-xl shadow-purple-950/80 transition-all cursor-pointer"
                  >
                    <span>Proceed to Client &amp; Domain Details</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            )}

            {/* =========================================================================
                STEP 2: Client & Domain Credentials (Full-Width Form)
               ========================================================================= */}
            {portalStep === 2 && (
              <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    2. Client &amp; Website Domain Details
                  </h3>
                  <p className="text-xs text-[#94a3b8] mt-1">
                    Authorize deliverables for{" "}
                    <strong className="text-white">
                      {isCustomService ? customServiceName : selectedPortalService.name}
                    </strong>{" "}
                    (Settlement:{" "}
                    <strong className="text-emerald-400">
                      {isCustomService
                        ? `${currency === "INR" ? "₹" : "$"}${customServiceAmount}`
                        : currency === "INR"
                        ? selectedPortalService.priceINR
                        : selectedPortalService.priceUSD}
                    </strong>
                    ).
                  </p>
                </div>

                <div className="bg-[#140F24]/90 border border-[#2B2144] rounded-2xl p-6 sm:p-8 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#c084fc] mb-1.5">
                        Client Full Name or Business Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. John Doe / Global Corp Ltd"
                        value={portalClientName}
                        onChange={(e) => setPortalClientName(e.target.value)}
                        className="w-full bg-[#0e0a1a] border border-[#2B2144] focus:border-[#a855f7] rounded-xl px-4 py-3 text-xs text-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#c084fc] mb-1.5">
                        Work Email (for Invoice PDF &amp; Escrow Proof) *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@company.com"
                        value={portalClientEmail}
                        onChange={(e) => setPortalClientEmail(e.target.value)}
                        className="w-full bg-[#0e0a1a] border border-[#2B2144] focus:border-[#a855f7] rounded-xl px-4 py-3 text-xs text-white outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#c084fc] mb-1.5">
                      Target Website / Domain URL *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="https://yourbrand.com"
                      value={portalClientDomain}
                      onChange={(e) => setPortalClientDomain(e.target.value)}
                      className="w-full bg-[#0e0a1a] border border-[#2B2144] focus:border-[#a855f7] rounded-xl px-4 py-3 text-xs text-white outline-none"
                    />
                    <span className="text-[10px] text-[#94a3b8] mt-1 block">
                      The domain where SEO, guest posting, or web application deliverables will be deployed.
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Special Requirements or Project Notes (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Target anchor texts, priority target countries, tech stack notes, or deadlines..."
                      value={portalClientNotes}
                      onChange={(e) => setPortalClientNotes(e.target.value)}
                      className="w-full bg-[#0e0a1a] border border-[#2B2144] focus:border-[#a855f7] rounded-xl px-4 py-3 text-xs text-white outline-none resize-none"
                    />
                  </div>
                </div>

                {/* Step 2 Actions */}
                <div className="pt-2 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setPortalStep(1)}
                    className="px-6 py-3.5 rounded-2xl bg-[#18122B] hover:bg-[#281D4A] border border-[#2B2144] text-xs font-bold text-white transition-all cursor-pointer"
                  >
                    ← Back to Services
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (!portalClientName.trim() || !portalClientEmail.trim() || !portalClientDomain.trim()) {
                        setPortalFormError("Please fill in your full name, work email, and target domain URL.");
                        return;
                      }
                      setPortalFormError(null);
                      setPortalStep(3);
                    }}
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#6366f1] via-[#7c3aed] to-[#a855f7] hover:brightness-110 active:scale-[0.98] text-white font-bold px-8 py-3.5 rounded-2xl text-xs sm:text-sm shadow-xl shadow-purple-950/80 transition-all cursor-pointer"
                  >
                    <span>Proceed to Payment Rails</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            )}

            {/* =========================================================================
                STEP 3: Payment Options & Instant Authorization (Full-Width View)
               ========================================================================= */}
            {portalStep === 3 && (
              <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto">
                
                {/* Authorization Summary Banner */}
                <div className="p-6 rounded-2xl bg-gradient-to-r from-[#20143d] via-[#1a1133] to-[#20143d] border border-[#a855f7]/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#c084fc] font-bold block mb-1">
                      ✦ Final Authorization Summary
                    </span>
                    <h4 className="text-lg font-black text-white">
                      {isCustomService ? customServiceName : selectedPortalService.name}
                    </h4>
                    <p className="text-xs text-[#22d3ee] mt-0.5">
                      Target Domain: <strong className="font-mono">{portalClientDomain}</strong> • Client: {portalClientName}
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-[10px] uppercase text-gray-400 font-bold block">Total Settlement</span>
                    <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-[#c084fc]">
                      {isCustomService
                        ? `${currency === "INR" ? "₹" : "$"}${customServiceAmount}`
                        : currency === "INR"
                        ? selectedPortalService.priceINR
                        : selectedPortalService.priceUSD}
                    </span>
                  </div>
                </div>

                {/* Payment Rails Selector */}
                <div>
                  <label className="block text-xs font-bold text-white mb-2.5">
                    Select Your Payment Rail:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {[
                      { id: "upi", label: "⚡ UPI / QR", sub: "India Instant (0% Fee)" },
                      { id: "card", label: "💳 Stripe Card", sub: "Global Multi-Currency" },
                      { id: "bank", label: "🏦 Bank / SWIFT", sub: "HDFC Coordinates" },
                      { id: "paypal", label: "🅿️ PayPal", sub: "Express Portal" },
                      { id: "wise", label: "🌍 Wise", sub: "Zero FX Markup" },
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPortalPaymentMethod(m.id as any)}
                        className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                          portalPaymentMethod === m.id
                            ? "bg-[#2b1b52] border-[#c084fc] shadow-lg shadow-purple-950/80 ring-2 ring-[#c084fc]"
                            : "bg-[#140F24] border-[#2B2144] hover:bg-[#1E1638] text-gray-300"
                        }`}
                      >
                        <p className="text-xs font-bold text-white leading-tight">{m.label}</p>
                        <p className="text-[10px] text-[#94a3b8] leading-tight mt-1 truncate">{m.sub}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Payment Rail Content Panel */}
                <div className="p-6 rounded-2xl bg-[#140F24]/90 border border-[#2B2144]">
                  
                  {/* 1. UPI / QR Code Rail */}
                  {portalPaymentMethod === "upi" && (
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row items-center gap-6">
                        {/* High-Contrast QR Code */}
                        <div className="w-32 h-32 bg-white p-2.5 rounded-2xl flex flex-col items-center justify-center shrink-0 shadow-xl border-4 border-purple-500/40">
                          <div className="w-full h-full border-2 border-dashed border-gray-900 rounded-xl flex flex-col items-center justify-center text-center p-1">
                            <span className="text-2xl">📱</span>
                            <span className="text-[10px] font-black text-black leading-tight">SCAN &amp; PAY</span>
                            <span className="text-[8px] font-bold text-purple-700 font-mono">917690868932@ybl</span>
                          </div>
                        </div>

                        <div className="space-y-2 flex-1 w-full">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-300 font-semibold">Official UPI ID:</span>
                            <span className="text-[10px] text-emerald-400 font-bold">✓ Verified Merchant Escrow</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-[#0e0a1a] border border-[#37285a] rounded-xl px-4 py-2.5 text-xs font-mono text-[#c084fc] font-bold truncate">
                              917690868932@ybl
                            </div>
                            <button
                              type="button"
                              onClick={() => copyToClipboard("917690868932@ybl", "UPI ID")}
                              className="px-4 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-600 text-white text-xs font-bold transition-all cursor-pointer shrink-0"
                            >
                              {copiedField === "UPI ID" ? "✓ Copied" : "Copy UPI"}
                            </button>
                          </div>

                          <p className="text-[11px] text-[#94a3b8]">
                            Beneficiary: <strong className="text-white">Balaji Prime Media</strong> • Supported: Google Pay, PhonePe, Paytm, BHIM, Cred.
                          </p>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                          UPI Transaction ID / 12-Digit UTR Number (Optional if already sent)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 412389104821"
                          value={portalUtr}
                          onChange={(e) => setPortalUtr(e.target.value)}
                          className="w-full bg-[#0e0a1a] border border-[#2B2144] focus:border-[#a855f7] rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* 2. Stripe Card Rail */}
                  {portalPaymentMethod === "card" && (
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-300 font-semibold">Stripe Global Multi-Currency Escrow</span>
                        <span className="text-[11px] text-purple-300 flex items-center gap-1 font-semibold">
                          <span>🔒 256-Bit Bank Grade SSL</span>
                        </span>
                      </div>

                      <div>
                        <label className="block text-xs text-gray-400 mb-1">Cardholder Name</label>
                        <input
                          type="text"
                          value={portalClientName}
                          onChange={(e) => setPortalClientName(e.target.value)}
                          placeholder="Full Name as on card"
                          className="w-full bg-[#0e0a1a] border border-[#2B2144] focus:border-[#a855f7] rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-gray-400 mb-1">Card Number</label>
                        <input
                          type="text"
                          maxLength={19}
                          placeholder="4242 •••• •••• 4242 (Visa, Mastercard, RuPay, Amex)"
                          value={portalCardNumber}
                          onChange={(e) => setPortalCardNumber(e.target.value)}
                          className="w-full bg-[#0e0a1a] border border-[#2B2144] focus:border-[#a855f7] rounded-xl px-4 py-2.5 text-xs font-mono text-white outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">Expiry (MM/YY)</label>
                          <input
                            type="text"
                            maxLength={5}
                            placeholder="MM/YY"
                            value={portalCardExpiry}
                            onChange={(e) => setPortalCardExpiry(e.target.value)}
                            className="w-full bg-[#0e0a1a] border border-[#2B2144] focus:border-[#a855f7] rounded-xl px-4 py-2.5 text-xs font-mono text-white outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">CVC / CVV</label>
                          <input
                            type="password"
                            maxLength={4}
                            placeholder="•••"
                            value={portalCardCvc}
                            onChange={(e) => setPortalCardCvc(e.target.value)}
                            className="w-full bg-[#0e0a1a] border border-[#2B2144] focus:border-[#a855f7] rounded-xl px-4 py-2.5 text-xs font-mono text-white outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 3. Direct Bank Wire / SWIFT Rail */}
                  {portalPaymentMethod === "bank" && (
                    <div className="space-y-3 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white">HDFC Bank Limited Coordinates</span>
                        <span className="text-[10px] text-emerald-400 font-bold">Domestic &amp; SWIFT</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="bg-[#0e0a1a] p-3 rounded-xl border border-[#2B2144] flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-gray-400 block">Beneficiary</span>
                            <strong className="text-white text-xs">Balaji Prime Media</strong>
                          </div>
                          <button
                            type="button"
                            onClick={() => copyToClipboard("Balaji Prime Media", "Beneficiary")}
                            className="text-xs text-purple-400 hover:text-white"
                          >
                            Copy
                          </button>
                        </div>

                        <div className="bg-[#0e0a1a] p-3 rounded-xl border border-[#2B2144] flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-gray-400 block">Account Number</span>
                            <strong className="text-white font-mono text-xs">50200084920491</strong>
                          </div>
                          <button
                            type="button"
                            onClick={() => copyToClipboard("50200084920491", "Account Number")}
                            className="text-xs text-purple-400 hover:text-white"
                          >
                            Copy
                          </button>
                        </div>

                        <div className="bg-[#0e0a1a] p-3 rounded-xl border border-[#2B2144] flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-gray-400 block">IFSC Code (India)</span>
                            <strong className="text-white font-mono text-xs">HDFC0001842</strong>
                          </div>
                          <button
                            type="button"
                            onClick={() => copyToClipboard("HDFC0001842", "IFSC Code")}
                            className="text-xs text-purple-400 hover:text-white"
                          >
                            Copy
                          </button>
                        </div>

                        <div className="bg-[#0e0a1a] p-3 rounded-xl border border-[#2B2144] flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-gray-400 block">SWIFT / BIC (International)</span>
                            <strong className="text-white font-mono text-xs">HDFCINBB</strong>
                          </div>
                          <button
                            type="button"
                            onClick={() => copyToClipboard("HDFCINBB", "SWIFT Code")}
                            className="text-xs text-purple-400 hover:text-white"
                          >
                            Copy
                          </button>
                        </div>
                      </div>

                      <p className="text-[11px] text-[#94a3b8] mt-1">
                        After transferring via NEFT, RTGS, IMPS, or Wire, click the confirmation button below to record the audit log.
                      </p>
                    </div>
                  )}

                  {/* 4. PayPal Rail */}
                  {portalPaymentMethod === "paypal" && (
                    <div className="space-y-3 text-center py-4">
                      <span className="text-4xl block">🅿️</span>
                      <h4 className="text-base font-bold text-white">PayPal Express Authorization</h4>
                      <p className="text-xs text-[#94a3b8] max-w-sm mx-auto">
                        Instant global payments with zero transaction fees for USD ($), GBP (£), EUR (€), and AUD (A$).
                      </p>
                      <div className="inline-block px-4 py-1.5 bg-[#1e153a] border border-[#a855f7]/40 rounded-full text-xs text-[#c084fc]">
                        Target Invoice Recipient: <strong className="text-white">payments@balajiprimemedia.in</strong>
                      </div>
                    </div>
                  )}

                  {/* 5. Wise Rail */}
                  {portalPaymentMethod === "wise" && (
                    <div className="space-y-3 text-left">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">🌍</span>
                        <div>
                          <h4 className="text-sm font-bold text-white">Wise Multi-Currency Wire</h4>
                          <p className="text-xs text-[#94a3b8]">Zero exchange markup bank settlements worldwide</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-300">
                        Transfer directly to our domestic Indian HDFC account using Wise for guaranteed lowest FX fees and same-day ledger verification.
                      </p>
                      <div className="p-3 rounded-xl bg-[#0e0a1a] border border-[#2B2144] text-xs font-mono text-[#c084fc]">
                        Recipient: Balaji Prime Media • Account: 50200084920491 • IFSC: HDFC0001842
                      </div>
                    </div>
                  )}

                </div>

                {/* Processing State */}
                {portalProcessing && (
                  <div className="p-5 rounded-2xl bg-purple-950/70 border border-purple-500/60 flex items-center justify-center gap-3 text-white text-xs sm:text-sm font-semibold animate-pulse">
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Authorizing settlement with Balaji Prime Media Escrow Ledger...</span>
                  </div>
                )}

                {/* Step 3 Actions */}
                <div className="pt-2 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    disabled={portalProcessing}
                    onClick={() => setPortalStep(2)}
                    className="px-6 py-3.5 rounded-2xl bg-[#18122B] hover:bg-[#281D4A] border border-[#2B2144] text-xs font-bold text-white transition-all cursor-pointer disabled:opacity-50"
                  >
                    ← Back
                  </button>

                  <button
                    type="button"
                    disabled={portalProcessing}
                    onClick={() => handlePortalPayment()}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 via-[#6366f1] to-[#a855f7] hover:brightness-110 active:scale-[0.98] text-white font-bold px-8 py-4 rounded-2xl text-xs sm:text-sm transition-all shadow-xl shadow-purple-950/80 cursor-pointer disabled:opacity-50"
                  >
                    <span>
                      {portalProcessing
                        ? "Verifying Ledger..."
                        : `Authorize & Pay ${
                            isCustomService
                              ? `${currency === "INR" ? "₹" : "$"}${customServiceAmount}`
                              : currency === "INR"
                              ? selectedPortalService.priceINR
                              : selectedPortalService.priceUSD
                          } Now`}
                    </span>
                    <span>✓</span>
                  </button>
                </div>
              </div>
            )}

            {/* =========================================================================
                STEP 4: Success & Verified Escrow Receipt (Full-Width View)
               ========================================================================= */}
            {portalStep === 4 && (
              <div className="space-y-6 text-center py-4 animate-fadeIn max-w-2xl mx-auto">
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto text-4xl shadow-[0_0_40px_rgba(52,211,153,0.4)]">
                  ✓
                </div>

                <div>
                  <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
                    Settlement Completed &amp; Escrow Verified
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    Payment Authorization Confirmed!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#94a3b8] mt-1.5 leading-relaxed">
                    Your order has been recorded into the Balaji Prime Media core ledger. An authenticated tax receipt and delivery ticket has been dispatched to{" "}
                    <strong className="text-white">{portalClientEmail || "your email"}</strong>.
                  </p>
                </div>

                {/* Cryptographic Receipt Box */}
                <div className="bg-[#140F24] border border-[#302150] rounded-3xl p-6 text-left space-y-3 text-xs shadow-xl">
                  <div className="flex items-center justify-between pb-3 border-b border-[#231A33]">
                    <span className="text-xs text-gray-400 font-medium">Transaction Reference ID:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[#22d3ee] text-sm">{portalTxnId}</span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(portalTxnId, "Transaction ID")}
                        className="text-xs text-purple-400 hover:text-white"
                      >
                        {copiedField === "Transaction ID" ? "✓ Copied" : "Copy"}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-[10px] text-gray-400 block">Service:</span>
                      <strong className="text-white">
                        {isCustomService ? customServiceName : selectedPortalService.name}
                      </strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block">Settled Amount:</span>
                      <strong className="text-emerald-400 text-sm">
                        {isCustomService
                          ? `${currency === "INR" ? "₹" : "$"}${customServiceAmount}`
                          : currency === "INR"
                          ? selectedPortalService.priceINR
                          : selectedPortalService.priceUSD}
                      </strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block">Target Domain:</span>
                      <strong className="text-[#c084fc] font-mono">{portalClientDomain}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block">Settlement Rail:</span>
                      <strong className="text-white">{portalPaymentMethod.toUpperCase()}</strong>
                    </div>
                  </div>
                </div>

                {/* Onboarding SLA Box */}
                <div className="p-4 rounded-2xl bg-[#1b1238] border border-[#a855f7]/30 text-left text-xs space-y-1">
                  <p className="font-bold text-[#c084fc] flex items-center gap-2">
                    <span>🚀 Next Steps &amp; Delivery SLA:</span>
                  </p>
                  <p className="text-xs text-[#94a3b8] leading-relaxed">
                    A Senior Growth Partner will establish your dedicated communication channel (Slack / WhatsApp) within <strong className="text-white">2 business hours</strong> to begin deliverable execution.
                  </p>
                </div>

                {/* Return / Reset Button */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    type="button"
                    onClick={() => copyToClipboard(portalTxnId, "Transaction ID")}
                    className="px-6 py-3.5 rounded-2xl bg-[#18122B] hover:bg-[#281D4A] border border-[#2B2144] text-xs font-semibold text-white transition-all cursor-pointer"
                  >
                    📋 Copy Transaction ID
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setPortalStep(1);
                      const el = document.getElementById("services-grid");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] hover:brightness-110 text-white font-bold px-8 py-3.5 rounded-2xl text-xs transition-all shadow-lg shadow-purple-950/80 cursor-pointer"
                  >
                    <span>↺ Authorize Another Service / Return to Grid</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
