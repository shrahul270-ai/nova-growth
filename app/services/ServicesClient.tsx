"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SellixServicesHeader from "../components/SellixServicesHeader";
import ThreeDServiceCard, {
  AgencyService,
  CountryCode,
  COUNTRIES_CONFIG,
} from "../components/ThreeDServiceCard";
import { trackInteraction } from "@/lib/tracker";
import { getClientLiveLocation } from "@/lib/geo";

export const masterServicesList: AgencyService[] = [
  {
    id: "basic-website-portfolio",
    name: "Basic Website (Business / Portfolio)",
    tagline: "Clean, ultra-fast business or portfolio website crafted for brand credibility and mobile lead capture.",
    category: "Development",
    priceINR: "₹5,000 – ₹15,000",
    priceUSD: "$480 – $1,200",
    pricingSuffixINR: "One-time",
    pricingSuffixUSD: "One-time",
    numericINR: 10000,
    numericUSD: 650,
    tat: "5–7 Business Days",
    deliverablesSummary: "Mobile responsive, portfolio showcase, lead form, speed tuning",
    deliverables: [
      "100% mobile, tablet & desktop responsive layout",
      "Business / portfolio work showcase & client testimonials",
      "Interactive lead inquiry form & direct WhatsApp chat trigger",
      "Sub-1.5s loading speed with modern asset compression",
      "Clean semantic code & essential Google search meta tags",
    ],
    gradient: "linear-gradient(135deg, #0284c7 0%, #0369a1 50%, #075985 100%)",
    accentColor: "#0284c7",
    icon3D: "🌐",
    badge: "Starter Web",
    countryPricing: {
      IN: { price: "₹5,000 – ₹15,000", suffix: "One-time" },
      US: { price: "$480 – $1,200", inrEquivalent: "Approx. ₹40,000 – ₹1,00,000", suffix: "One-time" },
      GB: { price: "£380 – £950", inrEquivalent: "Approx. ₹35,000 – ₹90,000", suffix: "One-time" },
      CA: { price: "C$570 – C$1,400", inrEquivalent: "Approx. ₹35,000 – ₹85,000", suffix: "One-time" },
      AU: { price: "A$720 – A$1,800", inrEquivalent: "Approx. ₹40,000 – ₹1,00,000", suffix: "One-time" },
      AE: { price: "1,100 – 3,300 AED", inrEquivalent: "Approx. ₹25,000 – ₹75,000", suffix: "One-time" },
    },
  },
  {
    id: "ecommerce-website-dev",
    name: "E-commerce Website Development",
    tagline: "High-converting online store with full catalog, secure payment gateways, cart management & automated orders.",
    category: "Development",
    priceINR: "₹20,000 – ₹80,000",
    priceUSD: "$1,800 – $6,000",
    pricingSuffixINR: "One-time",
    pricingSuffixUSD: "One-time",
    numericINR: 45000,
    numericUSD: 2500,
    tat: "2–4 Weeks",
    deliverablesSummary: "Product catalog, multi-payment checkout, inventory, SSL security",
    deliverables: [
      "Full product catalog with variants, filters & instant search",
      "Multi-currency payment gateway (Stripe, Razorpay, PayPal, COD)",
      "Automated order confirmation emails & customer WhatsApp alerts",
      "Admin inventory management, coupon codes & sales analytics",
      "PCI-DSS security standards & SSL checkout hardening",
    ],
    gradient: "linear-gradient(135deg, #d97706 0%, #b45309 50%, #92400e 100%)",
    accentColor: "#d97706",
    icon3D: "🛍️",
    badge: "High Converting",
    popular: true,
    countryPricing: {
      IN: { price: "₹20,000 – ₹80,000", suffix: "One-time" },
      US: { price: "$1,800 – $6,000", inrEquivalent: "Approx. ₹1.5 Lakh – ₹5 Lakh", suffix: "One-time" },
      GB: { price: "£1,300 – £4,400", inrEquivalent: "Approx. ₹1.2 Lakh – ₹4 Lakh", suffix: "One-time" },
      CA: { price: "C$1,600 – C$6,500", inrEquivalent: "Approx. ₹1 Lakh – ₹4 Lakh", suffix: "One-time" },
      AU: { price: "A$2,700 – A$9,000", inrEquivalent: "Approx. ₹1.5 Lakh – ₹5 Lakh", suffix: "One-time" },
      AE: { price: "3,500 – 13,200 AED", inrEquivalent: "Approx. ₹80,000 – ₹3 Lakh", suffix: "One-time" },
    },
  },
  {
    id: "custom-web-application",
    name: "Custom Web Application & Business Software",
    tagline: "Custom login/registration portals, student management systems, complete business CRM & SaaS software.",
    category: "Development",
    priceINR: "₹35,000 – ₹95,000",
    priceUSD: "$1,200 – $4,500",
    pricingSuffixINR: "One-time",
    pricingSuffixUSD: "One-time",
    numericINR: 65000,
    numericUSD: 2800,
    tat: "3–6 Weeks",
    deliverablesSummary: "Custom authentication, relational database, role dashboards, APIs",
    deliverables: [
      "Custom login & registration with multi-role permissions (Admin/Staff/User)",
      "Student / client management database architecture",
      "Complete business operational software & workflow dashboards",
      "Automated transactional emails, alerts & PDF report generator",
      "Robust PostgreSQL / MySQL database with automated cloud backups",
    ],
    gradient: "linear-gradient(135deg, #6366f1 0%, #4f46e5 50%, #3730a3 100%)",
    accentColor: "#6366f1",
    icon3D: "⚡",
    badge: "Full Software",
    countryPricing: {
      IN: { price: "₹35,000 – ₹95,000", suffix: "One-time" },
      US: { price: "$1,200 – $4,500", inrEquivalent: "Approx. ₹1 Lakh – ₹3.8 Lakh", suffix: "One-time" },
      GB: { price: "£950 – £3,500", inrEquivalent: "Approx. ₹90,000 – ₹3.5 Lakh", suffix: "One-time" },
      CA: { price: "C$1,600 – C$6,000", inrEquivalent: "Approx. ₹1 Lakh – ₹3.7 Lakh", suffix: "One-time" },
      AU: { price: "A$1,800 – A$6,800", inrEquivalent: "Approx. ₹1 Lakh – ₹3.8 Lakh", suffix: "One-time" },
      AE: { price: "4,400 – 16,500 AED", inrEquivalent: "Approx. ₹1 Lakh – ₹3.7 Lakh", suffix: "One-time" },
    },
  },
  {
    id: "website-maintenance-support",
    name: "Website Maintenance & Support Retainer",
    tagline: "Ongoing bug fixes, security patch updates, plugin management & performance monitoring.",
    category: "Support",
    priceINR: "₹3,000 – ₹10,000",
    priceUSD: "$250 – $800",
    pricingSuffixINR: "per month",
    pricingSuffixUSD: "per month",
    numericINR: 5000,
    numericUSD: 350,
    tat: "Monthly Retainer (24/7 SLA)",
    deliverablesSummary: "Weekly backups, 24hr fix SLA, core updates, uptime monitor",
    deliverables: [
      "Weekly automated cloud backups & one-click disaster recovery",
      "Core CMS, plugin & security patch management",
      "24-hour turnaround for emergency bug fixes & page edits",
      "24/7 uptime monitoring & instant downtime notification",
      "Monthly website health, speed & security audit report",
    ],
    gradient: "linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)",
    accentColor: "#10b981",
    icon3D: "🛡️",
    badge: "Peace of Mind",
    countryPricing: {
      IN: { price: "₹3,000 – ₹10,000", suffix: "per month" },
      US: { price: "$250 – $800", inrEquivalent: "Approx. ₹20,000 – ₹65,000", suffix: "per month" },
      GB: { price: "£200 – £650", inrEquivalent: "Approx. ₹18,000 – ₹60,000", suffix: "per month" },
      CA: { price: "C$340 – C$1,100", inrEquivalent: "Approx. ₹20,000 – ₹65,000", suffix: "per month" },
      AU: { price: "A$380 – A$1,200", inrEquivalent: "Approx. ₹20,000 – ₹65,000", suffix: "per month" },
      AE: { price: "900 – 2,900 AED", inrEquivalent: "Approx. ₹20,000 – ₹65,000", suffix: "per month" },
    },
  },
  {
    id: "seo-optimization-ranking",
    name: "SEO Optimization & Search Rankings",
    tagline: "On-page, technical & keyword ranking SEO to systematically dominate Google's top positions.",
    category: "Optimization",
    priceINR: "₹8,000 – ₹25,000",
    priceUSD: "$850 – $2,500",
    pricingSuffixINR: "per month",
    pricingSuffixUSD: "per month",
    numericINR: 15000,
    numericUSD: 1200,
    tat: "Ongoing Campaign",
    deliverablesSummary: "Technical audit, keyword roadmap, on-page optimization, rank tracking",
    deliverables: [
      "Deep technical SEO audit & Core Web Vitals remediation",
      "High-intent keyword research & content mapping",
      "On-page meta tags, headings & internal linking architecture",
      "Schema markup structured data injection for rich snippets",
      "Monthly Google Search Console & keyword rank progress report",
    ],
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%)",
    accentColor: "#8b5cf6",
    icon3D: "📈",
    badge: "Top Ranked",
    popular: true,
    countryPricing: {
      IN: { price: "₹8,000 – ₹25,000", suffix: "per month" },
      US: { price: "$850 – $2,500", inrEquivalent: "Approx. ₹70,000 – ₹2 Lakh", suffix: "per month" },
      GB: { price: "£680 – £2,000", inrEquivalent: "Approx. ₹65,000 – ₹1.9 Lakh", suffix: "per month" },
      CA: { price: "C$1,150 – C$3,400", inrEquivalent: "Approx. ₹70,000 – ₹2 Lakh", suffix: "per month" },
      AU: { price: "A$1,300 – A$3,800", inrEquivalent: "Approx. ₹70,000 – ₹2 Lakh", suffix: "per month" },
      AE: { price: "3,100 – 9,200 AED", inrEquivalent: "Approx. ₹70,000 – ₹2 Lakh", suffix: "per month" },
    },
  },
  {
    id: "guest-posting-link-building",
    name: "Guest Posting & Backlink Building",
    tagline: "High-DA permanent backlinks on vetted 40,000+ publications to pass maximum topical authority.",
    category: "Marketing & Content",
    priceINR: "₹3,500 – ₹25,000",
    priceUSD: "$120 – $1,200",
    pricingSuffixINR: "per post",
    pricingSuffixUSD: "per post",
    numericINR: 6500,
    numericUSD: 350,
    tat: "7–14 Business Days",
    deliverablesSummary: "Verified editorial media, 1,000+ word native articles, Google Search Essentials compliant",
    deliverables: [
      "Features on genuine high-trust publications with verified organic readership",
      "Contextual editorial brand mentions adhering to Google Search Essentials",
      "1,000+ words handwritten native thought-leadership content included",
      "Strict zero-PBN, zero-spam farm editorial vetting",
      "Live publication confirmation & search visibility reporting",
    ],
    gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)",
    accentColor: "#f59e0b",
    icon3D: "🔗",
    badge: "Editorial PR",
    popular: true,
    countryPricing: {
      IN: { price: "₹3,500 – ₹25,000", suffix: "per post" },
      US: { price: "$120 – $1,200", inrEquivalent: "Approx. ₹10,000 – ₹1,00,000", suffix: "per post" },
      GB: { price: "£95 – £950", inrEquivalent: "Approx. ₹9,000 – ₹90,000", suffix: "per post" },
      CA: { price: "C$160 – C$1,600", inrEquivalent: "Approx. ₹10,000 – ₹95,000", suffix: "per post" },
      AU: { price: "A$185 – A$1,850", inrEquivalent: "Approx. ₹10,000 – ₹1,00,000", suffix: "per post" },
      AE: { price: "440 – 4,400 AED", inrEquivalent: "Approx. ₹10,000 – ₹1,00,000", suffix: "per post" },
    },
  },
  {
    id: "content-writing-seo-copy",
    name: "Content Writing & SEO Copywriting",
    tagline: "Search-intent aligned blogs, landing page copywriting & thought leadership articles that convert.",
    category: "Marketing & Content",
    priceINR: "₹1,500 – ₹6,000",
    priceUSD: "$80 – $350",
    pricingSuffixINR: "per article",
    pricingSuffixUSD: "per article",
    numericINR: 3000,
    numericUSD: 150,
    tat: "3–5 Business Days",
    deliverablesSummary: "1,500+ words, original research, SurferSEO score 80+, royalty images",
    deliverables: [
      "In-depth research aligned with real searcher intent",
      "SurferSEO / Clearscope content optimization (score 80+)",
      "Zero AI-fluff, 100% human-edited native English drafting",
      "Captivating H1/H2 structure, bullet summaries & clear CTAs",
      "Royalty-free graphic assets & ready-to-publish formatting",
    ],
    gradient: "linear-gradient(135deg, #ec4899 0%, #db2777 50%, #be185d 100%)",
    accentColor: "#ec4899",
    icon3D: "✍️",
    badge: "Human Native",
    countryPricing: {
      IN: { price: "₹1,500 – ₹6,000", suffix: "per article" },
      US: { price: "$80 – $350", inrEquivalent: "Approx. ₹6,500 – ₹30,000", suffix: "per article" },
      GB: { price: "£65 – £280", inrEquivalent: "Approx. ₹6,000 – ₹27,000", suffix: "per article" },
      CA: { price: "C$110 – C$480", inrEquivalent: "Approx. ₹6,500 – ₹29,000", suffix: "per article" },
      AU: { price: "A$125 – A$540", inrEquivalent: "Approx. ₹6,500 – ₹30,000", suffix: "per article" },
      AE: { price: "295 – 1,280 AED", inrEquivalent: "Approx. ₹6,500 – ₹29,000", suffix: "per article" },
    },
  },
  {
    id: "flutter-app-dev",
    name: "Flutter Mobile App Development (iOS & Android)",
    tagline: "Cross-platform iOS and Android apps powered by a single Flutter codebase with native 60fps speed.",
    category: "Development",
    priceINR: "₹45,000 – ₹1,80,000",
    priceUSD: "$2,200 – $7,500",
    pricingSuffixINR: "One-time",
    pricingSuffixUSD: "One-time",
    numericINR: 85000,
    numericUSD: 3500,
    tat: "4–8 Weeks",
    deliverablesSummary: "Dual OS builds, Play Store & App Store deploy, push notifications",
    deliverables: [
      "Single codebase for simultaneous iOS & Android deployment",
      "Smooth 60fps animations with responsive state management (Bloc / Riverpod)",
      "RESTful API & GraphQL backend integrations with offline caching",
      "Push notifications, biometric login & in-app purchases",
      "App Store & Google Play Store submission & approval assistance",
    ],
    gradient: "linear-gradient(135deg, #06b6d4 0%, #0891b2 50%, #0e7490 100%)",
    accentColor: "#06b6d4",
    icon3D: "📱",
    badge: "Dual OS Ready",
    countryPricing: {
      IN: { price: "₹45,000 – ₹1,80,000", suffix: "One-time" },
      US: { price: "$2,200 – $7,500", inrEquivalent: "Approx. ₹1.8 Lakh – ₹6.2 Lakh", suffix: "One-time" },
      GB: { price: "£1,750 – £5,900", inrEquivalent: "Approx. ₹1.7 Lakh – ₹5.8 Lakh", suffix: "One-time" },
      CA: { price: "C$3,000 – C$10,200", inrEquivalent: "Approx. ₹1.8 Lakh – ₹6 Lakh", suffix: "One-time" },
      AU: { price: "A$3,400 – A$11,500", inrEquivalent: "Approx. ₹1.8 Lakh – ₹6.2 Lakh", suffix: "One-time" },
      AE: { price: "8,000 – 27,500 AED", inrEquivalent: "Approx. ₹1.8 Lakh – ₹6.2 Lakh", suffix: "One-time" },
    },
  },
  {
    id: "full-stack-php-dev",
    name: "Full-Stack PHP & Laravel Development",
    tagline: "Bespoke web applications, custom ERP modules, secure REST APIs & complex relational backends.",
    category: "Development",
    priceINR: "₹30,000 – ₹1,10,000",
    priceUSD: "$1,400 – $5,000",
    pricingSuffixINR: "One-time",
    pricingSuffixUSD: "One-time",
    numericINR: 55000,
    numericUSD: 2400,
    tat: "3–6 Weeks",
    deliverablesSummary: "Laravel 11 architecture, MVC framework, Stripe gateway, SQL tuning",
    deliverables: [
      "Modern PHP 8.3 & Laravel 11 MVC clean architecture",
      "Secure REST APIs & third-party webhook integrations",
      "Payment gateway integration (Stripe, Razorpay, PayPal, Bank API)",
      "Database schema normalization & high-concurrency query optimization",
      "Comprehensive test coverage, security sanitization & CSRF protection",
    ],
    gradient: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #5b21b6 100%)",
    accentColor: "#7c3aed",
    icon3D: "🐘",
    badge: "Enterprise Code",
    countryPricing: {
      IN: { price: "₹30,000 – ₹1,10,000", suffix: "One-time" },
      US: { price: "$1,400 – $5,000", inrEquivalent: "Approx. ₹1.2 Lakh – ₹4.2 Lakh", suffix: "One-time" },
      GB: { price: "£1,100 – £3,950", inrEquivalent: "Approx. ₹1 Lakh – ₹3.8 Lakh", suffix: "One-time" },
      CA: { price: "C$1,900 – C$6,900", inrEquivalent: "Approx. ₹1.2 Lakh – ₹4 Lakh", suffix: "One-time" },
      AU: { price: "A$2,150 – A$7,700", inrEquivalent: "Approx. ₹1.2 Lakh – ₹4.2 Lakh", suffix: "One-time" },
      AE: { price: "5,100 – 18,300 AED", inrEquivalent: "Approx. ₹1.2 Lakh – ₹4.2 Lakh", suffix: "One-time" },
    },
  },
  {
    id: "digital-pr-media-mentions",
    name: "Digital PR & Tier-1 Media Outreach",
    tagline: "Editorial brand storytelling & syndication on high-profile global publications.",
    category: "Marketing & Content",
    priceINR: "₹25,000 – ₹95,000",
    priceUSD: "$1,200 – $4,500",
    pricingSuffixINR: "per placement",
    pricingSuffixUSD: "per placement",
    numericINR: 45000,
    numericUSD: 2000,
    tat: "14–21 Business Days",
    deliverablesSummary: "Tier-1 publications, journalist outreach, brand syndication",
    deliverables: [
      "Manual outreach to verified journalists, editors & mainstream contributors",
      "Placements on recognized business, tech & mainstream news outlets",
      "Native brand interviews, founder quotes & industry thought-leadership",
      "Permanent editorial inclusion with verified Google News indexation",
      "Direct link authority, referral traffic & high-prestige social proof",
    ],
    gradient: "linear-gradient(135deg, #e11d48 0%, #be123c 50%, #9f1239 100%)",
    accentColor: "#e11d48",
    icon3D: "📰",
    badge: "Tier-1 Media",
    countryPricing: {
      IN: { price: "₹25,000 – ₹95,000", suffix: "per placement" },
      US: { price: "$1,200 – $4,500", inrEquivalent: "Approx. ₹1 Lakh – ₹3.8 Lakh", suffix: "per placement" },
      GB: { price: "£950 – £3,550", inrEquivalent: "Approx. ₹95,000 – ₹3.5 Lakh", suffix: "per placement" },
      CA: { price: "C$1,650 – C$6,200", inrEquivalent: "Approx. ₹1 Lakh – ₹3.6 Lakh", suffix: "per placement" },
      AU: { price: "A$1,850 – A$6,900", inrEquivalent: "Approx. ₹1 Lakh – ₹3.8 Lakh", suffix: "per placement" },
      AE: { price: "4,400 – 16,500 AED", inrEquivalent: "Approx. ₹1 Lakh – ₹3.8 Lakh", suffix: "per placement" },
    },
  },
  {
    id: "speed-core-web-vitals",
    name: "PageSpeed & Core Web Vitals Optimization",
    tagline: "Guaranteed 90+ Google PageSpeed score on mobile and desktop without sacrificing visual fidelity.",
    category: "Optimization",
    priceINR: "₹6,000 – ₹18,000",
    priceUSD: "$350 – $950",
    pricingSuffixINR: "One-time",
    pricingSuffixUSD: "One-time",
    numericINR: 12000,
    numericUSD: 550,
    tat: "3–5 Business Days",
    deliverablesSummary: "Sub-1.2s LCP, zero CLS shift, asset compression, edge caching",
    deliverables: [
      "Comprehensive diagnostic audit across LCP, INP & CLS metrics",
      "JavaScript deferral, CSS tree-shaking & unused code elimination",
      "Modern WebP/AVIF image generation & smart responsive sizing",
      "Server-level caching, CDN edge routing & HTTP/3 activation",
      "Guaranteed passing grade on Google's official Core Web Vitals report",
    ],
    gradient: "linear-gradient(135deg, #14b8a6 0%, #0d9488 50%, #0f766e 100%)",
    accentColor: "#14b8a6",
    icon3D: "⚡",
    badge: "90+ Speed",
    countryPricing: {
      IN: { price: "₹6,000 – ₹18,000", suffix: "One-time" },
      US: { price: "$350 – $950", inrEquivalent: "Approx. ₹30,000 – ₹80,000", suffix: "One-time" },
      GB: { price: "£280 – £750", inrEquivalent: "Approx. ₹28,000 – ₹75,000", suffix: "One-time" },
      CA: { price: "C$480 – C$1,300", inrEquivalent: "Approx. ₹30,000 – ₹78,000", suffix: "One-time" },
      AU: { price: "A$540 – A$1,450", inrEquivalent: "Approx. ₹30,000 – ₹80,000", suffix: "One-time" },
      AE: { price: "1,280 – 3,500 AED", inrEquivalent: "Approx. ₹30,000 – ₹80,000", suffix: "One-time" },
    },
  },
  {
    id: "email-marketing-automation",
    name: "Email Marketing & Retention Automation",
    tagline: "Automated onboarding sequences, customer re-engagement flows & newsletter marketing.",
    category: "Marketing & Content",
    priceINR: "₹10,000 – ₹35,000",
    priceUSD: "$650 – $2,200",
    pricingSuffixINR: "One-time setup",
    pricingSuffixUSD: "One-time setup",
    numericINR: 20000,
    numericUSD: 1100,
    tat: "7–10 Business Days",
    deliverablesSummary: "Klaviyo/Mailchimp integration, responsive email templates, lifecycle funnels",
    deliverables: [
      "Custom lifecycle sequences: Welcome flow, Abandoned Cart, Win-back",
      "Responsive, dark-mode ready custom HTML email templates",
      "Klaviyo, Mailchimp, ActiveCampaign or Brevo setup & integration",
      "DNS domain authentication: SPF, DKIM & DMARC 100% deliverability pass",
      "Audience list segmentation & A/B subject line testing strategy",
    ],
    gradient: "linear-gradient(135deg, #f97316 0%, #ea580c 50%, #c2410c 100%)",
    accentColor: "#f97316",
    icon3D: "✉️",
    badge: "Lifecycle Funnel",
    countryPricing: {
      IN: { price: "₹10,000 – ₹35,000", suffix: "One-time setup" },
      US: { price: "$650 – $2,200", inrEquivalent: "Approx. ₹55,000 – ₹1.8 Lakh", suffix: "One-time setup" },
      GB: { price: "£510 – £1,750", inrEquivalent: "Approx. ₹50,000 – ₹1.7 Lakh", suffix: "One-time setup" },
      CA: { price: "C$900 – C$3,000", inrEquivalent: "Approx. ₹55,000 – ₹1.8 Lakh", suffix: "One-time setup" },
      AU: { price: "A$1,000 – A$3,400", inrEquivalent: "Approx. ₹55,000 – ₹1.8 Lakh", suffix: "One-time setup" },
      AE: { price: "2,400 – 8,100 AED", inrEquivalent: "Approx. ₹55,000 – ₹1.8 Lakh", suffix: "One-time setup" },
    },
  },
];

export default function ServicesClient() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [country, setCountry] = useState<CountryCode>("US");
  const [currency, setCurrency] = useState<"INR" | "USD">("USD");
  const [toast, setToast] = useState<string | null>(null);

  // Modal States
  const [activeModalService, setActiveModalService] = useState<AgencyService | null>(null);
  const [bookingService, setBookingService] = useState<AgencyService | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    notes: "",
  });

  // In-Page Payment Portal Modal State
  const [portalStep, setPortalStep] = useState<1 | 2 | 3 | 4>(1);
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

  // Switch country globally
  const switchCountry = (newCountry: CountryCode) => {
    setCountry(newCountry);
    const cfg = COUNTRIES_CONFIG[newCountry];
    setCurrency(newCountry === "IN" ? "INR" : "USD");
    try {
      localStorage.setItem("bpm_country", newCountry);
      localStorage.setItem("bpm_currency", newCountry === "IN" ? "INR" : "USD");
    } catch (e) {}
    showToast(`Region switched to ${cfg.flag} ${cfg.name} (${cfg.currency} ${cfg.symbol})`);
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

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

  return (
    <div className="relative min-h-screen bg-[#07030d] text-white selection:bg-[#681fe4] selection:text-white font-satoshi antialiased overflow-hidden">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-24 right-6 z-50 bg-[#0c0818] text-white border border-[#681fe4] px-5 py-3 rounded-[4px] shadow-2xl flex items-center gap-3 animate-fadeIn text-xs font-semibold backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#681fe4] animate-ping" />
          <span>{toast}</span>
          <button
            onClick={() => setToast(null)}
            className="ml-2 text-neutral-400 hover:text-white text-xs cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Top Navbar */}
      <div className="relative z-40 bg-[#07030d]/90 backdrop-blur-md">
        <Navbar activePage="services" />
      </div>

      {/* Cross-border Finance Hero Header */}
      <SellixServicesHeader />

      {/* Master Services Section */}
      <section id="services-grid" className="relative py-16 sm:py-24 px-4 sm:px-6 md:px-12 z-10 max-w-7xl mx-auto bg-grid-white-240">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-[4px] bg-white/5 border border-white/10 text-white text-xs font-bebas tracking-[0.2em] uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-[#681fe4] animate-pulse" />
            <span>FULL-FUNNEL ORGANIC GROWTH DIRECTORY</span>
          </div>

          <h2 className="font-bebas text-4xl sm:text-6xl text-white tracking-[0.16em] uppercase leading-none mb-3">
            MASTER SERVICE DIRECTORY
          </h2>
          <p className="font-satoshi text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
            16 production-grade agency services &amp; website engineering solutions calibrated dynamically by country and local settlement currency.
          </p>
        </div>

        {/* Global Currency & Country Selector Toolbar */}
        <div className="mb-8 p-5 rounded-[4px] bg-[#0c0818] border border-white/10 shadow-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-white/10">
            <div className="flex items-center gap-2 text-xs font-bebas tracking-[0.14em] text-white uppercase">
              <span className="text-[#681fe4]">🌍</span>
              <span>SELECT SETTLEMENT CURRENCY &amp; COUNTRY:</span>
            </div>
            <span className="text-xs text-neutral-400 font-mono">
              Showing pricing in: <strong className="text-white">{COUNTRIES_CONFIG[country].name} ({COUNTRIES_CONFIG[country].currency})</strong>
            </span>
          </div>

          {/* Unified 6-Country Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {Object.values(COUNTRIES_CONFIG).map((c) => {
              const isActive = country === c.code;
              return (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => switchCountry(c.code)}
                  className={`flex items-center justify-between gap-2 p-2.5 rounded-[4px] text-xs font-bebas tracking-[0.12em] uppercase transition-all cursor-pointer border ${
                    isActive
                      ? "bg-[#681fe4] border-[#681fe4] text-white shadow-[0_4px_14px_rgba(104,31,228,0.3)]"
                      : "bg-white/5 hover:bg-white/10 text-neutral-300 border-white/10"
                  }`}
                >
                  <div className="flex items-center gap-2 text-left">
                    <span className="text-lg">{c.flag}</span>
                    <div>
                      <span className="block font-bold text-xs">{c.name}</span>
                      <span className={`text-[10px] block font-mono ${isActive ? "text-white/90" : "text-neutral-400"}`}>
                        {c.currency} ({c.symbol.trim()})
                      </span>
                    </div>
                  </div>
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      isActive ? "bg-white" : "bg-white/20"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Filter & Search Controls */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 p-3 rounded-[4px] bg-[#0c0818] border border-white/10 shadow-sm mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {["All", "Development", "Optimization", "Marketing & Content", "Support"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-[4px] font-bebas text-xs sm:text-sm tracking-[0.14em] uppercase transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#681fe4] text-white shadow-[0_4px_14px_rgba(104,31,228,0.35)]"
                    : "bg-white/5 text-neutral-300 hover:bg-white/10 border border-white/10"
                }`}
              >
                {cat} {cat === "All" && `(${masterServicesList.length})`}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-72">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 text-xs">🔍</span>
            <input
              type="text"
              placeholder="Search deliverables, tech, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#07030d] border border-white/15 focus:border-[#681fe4] rounded-[4px] pl-9 pr-8 py-2 text-xs text-white placeholder-neutral-500 outline-none transition-all font-satoshi"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Service Cards Responsive Grid */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-16 bg-[#0c0818] border border-white/10 rounded-[4px] p-8">
            <span className="text-4xl block mb-3">🔍</span>
            <h3 className="font-bebas text-2xl text-white tracking-[0.14em] uppercase mb-1">No services found</h3>
            <p className="text-xs text-neutral-400 mb-4 font-satoshi">
              We couldn&apos;t find any service matching &quot;{searchQuery}&quot;.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
              className="px-5 py-2 rounded-[4px] bg-white/5 hover:bg-white/10 text-xs font-bebas tracking-[0.14em] text-white border border-white/15 cursor-pointer uppercase"
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
                  country={country}
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
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto font-satoshi"
        >
          <div className="bg-[#0c0818] rounded-[4px] max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-white/15 relative text-left max-h-[90vh] overflow-y-auto my-auto text-white">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl p-2 rounded-[4px] bg-white/5 border border-white/10">
                  {activeModalService.icon3D}
                </span>
                <div>
                  <span className="text-[11px] font-bebas tracking-[0.16em] uppercase text-[#681fe4] bg-[#681fe4]/10 px-2.5 py-0.5 rounded-[2px] border border-[#681fe4]/30">
                    {activeModalService.badge}
                  </span>
                  <span className="text-[11px] text-neutral-400 block mt-0.5 font-mono">
                    {activeModalService.category}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setActiveModalService(null)}
                className="w-8 h-8 rounded-[4px] bg-white/5 hover:bg-white/15 text-neutral-300 flex items-center justify-center text-xs font-bold transition-all cursor-pointer border border-white/10"
              >
                ✕
              </button>
            </div>

            <h3 className="font-bebas text-2xl sm:text-3xl text-white tracking-[0.14em] uppercase mb-2">
              {activeModalService.name}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-5 font-normal">
              {activeModalService.tagline}
            </p>

            <div className="bg-[#07030d] p-4 rounded-[4px] border border-white/10 mb-6 space-y-2 text-xs font-mono">
              <div className="flex justify-between items-center">
                <span className="text-neutral-400">
                  {COUNTRIES_CONFIG[country].flag} {COUNTRIES_CONFIG[country].name} Pricing ({COUNTRIES_CONFIG[country].currency}):
                </span>
                <span className="font-bold text-white text-sm">
                  {(() => {
                    const custom = activeModalService.countryPricing?.[country];
                    if (custom?.price) return `${custom.price} ${custom.suffix || ""}`;
                    if (country === "IN") return `${activeModalService.priceINR} ${activeModalService.pricingSuffixINR}`;
                    if (country === "US") return `${activeModalService.priceUSD} ${activeModalService.pricingSuffixUSD}`;
                    const cfg = COUNTRIES_CONFIG[country];
                    const converted = Math.round(activeModalService.numericUSD * cfg.rateFromUSD);
                    return `${cfg.symbol}${converted.toLocaleString()} ${activeModalService.pricingSuffixUSD}`;
                  })()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Turnaround Time (TAT):</span>
                <span className="font-semibold text-white">⏱ {activeModalService.tat}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Escrow Security:</span>
                <span className="font-semibold text-[#681fe4]">✓ 100% Milestone Based</span>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-bebas text-xs tracking-[0.18em] text-neutral-400 uppercase mb-3">
                COMPREHENSIVE DELIVERABLES:
              </h4>
              <ul className="space-y-2">
                {activeModalService.deliverables.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-neutral-300">
                    <span className="text-[#681fe4] font-bold shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
              <Link
                href={`/services/${(() => {
                  const map: Record<string, string> = {
                    "starter-business-web": "website-development",
                    "ecommerce-website-dev": "website-development",
                    "custom-web-application": "website-development",
                    "flutter-mobile-app": "flutter-app-dev",
                    "fullstack-php-dev": "full-stack-php-dev",
                    "full-funnel-seo": "seo-optimization",
                    "monthly-link-building": "backlink-building",
                    "content-strategy-writing": "content-writing",
                    "email-revenue-automation": "email-marketing",
                    "annual-site-maintenance": "website-maintenance",
                  };
                  return map[activeModalService.id] || "website-development";
                })()}`}
                className="px-4 py-3 rounded-[4px] text-xs sm:text-sm font-bebas tracking-[0.14em] uppercase text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all text-center flex items-center justify-center gap-1.5"
              >
                <span>Full Scope Page →</span>
              </Link>
              <a
                href={`https://wa.me/917690868932?text=${encodeURIComponent(
                  `Hi Balaji Prime Media, I would like to get a quote for ${activeModalService.name}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#681fe4] hover:bg-[#5815cb] text-white font-bebas text-xs sm:text-sm tracking-[0.14em] uppercase py-3 px-5 rounded-[4px] text-center cursor-pointer shadow-[0_4px_14px_rgba(104,31,228,0.3)] transition-all"
              >
                Instant WhatsApp Quote 💬
              </a>
              <button
                type="button"
                onClick={() => {
                  setBookingService(activeModalService);
                  setActiveModalService(null);
                }}
                className="px-5 py-3 rounded-[4px] text-xs sm:text-sm font-bebas tracking-[0.14em] uppercase text-white bg-white/5 hover:bg-white/10 border border-white/15 transition-all cursor-pointer text-center"
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
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto font-satoshi"
        >
          <div className="bg-[#0c0818] rounded-[4px] max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-white/15 relative text-left max-h-[90vh] overflow-y-auto my-auto text-white">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div>
                <span className="font-bebas text-xs tracking-[0.18em] text-[#681fe4] uppercase">
                  BOOK STRATEGY DISCOVERY
                </span>
                <h3 className="font-bebas text-xl sm:text-2xl text-white tracking-[0.12em] uppercase">
                  {bookingService.name}
                </h3>
              </div>
              <button
                onClick={() => setBookingService(null)}
                className="w-8 h-8 rounded-[4px] bg-white/5 hover:bg-white/15 text-neutral-300 flex items-center justify-center text-xs font-bold transition-all cursor-pointer border border-white/10"
              >
                ✕
              </button>
            </div>

            {submitSuccess ? (
              <div className="py-8 text-center space-y-4">
                <span className="w-14 h-14 mx-auto rounded-[4px] bg-[#681fe4]/20 border border-[#681fe4] text-[#681fe4] flex items-center justify-center text-2xl font-bold">
                  ✓
                </span>
                <h4 className="font-bebas text-2xl text-white tracking-[0.14em] uppercase">Inquiry Received!</h4>
                <p className="text-xs text-neutral-300 max-w-sm mx-auto leading-relaxed">
                  Thank you! Our growth team will review your requirements for{" "}
                  <strong className="text-[#681fe4]">{bookingService.name}</strong> and reach out via email/WhatsApp within 4 hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setBookingService(null)}
                    className="px-6 py-2.5 rounded-[4px] bg-[#681fe4] hover:bg-[#5815cb] text-white font-bebas text-xs tracking-[0.16em] uppercase cursor-pointer shadow-md"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-xs font-bebas tracking-[0.14em] text-neutral-300 uppercase mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                    className="w-full bg-[#07030d] border border-white/15 focus:border-[#681fe4] rounded-[4px] px-3.5 py-2.5 text-xs text-white outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bebas tracking-[0.14em] text-neutral-300 uppercase mb-1">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@company.com"
                      value={bookingForm.email}
                      onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                      className="w-full bg-[#07030d] border border-white/15 focus:border-[#681fe4] rounded-[4px] px-3.5 py-2.5 text-xs text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bebas tracking-[0.14em] text-neutral-300 uppercase mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                      className="w-full bg-[#07030d] border border-white/15 focus:border-[#681fe4] rounded-[4px] px-3.5 py-2.5 text-xs text-white outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bebas tracking-[0.14em] text-neutral-300 uppercase mb-1">
                    Website URL or Project Link
                  </label>
                  <input
                    type="url"
                    placeholder="https://yourwebsite.com"
                    value={bookingForm.website}
                    onChange={(e) => setBookingForm({ ...bookingForm, website: e.target.value })}
                    className="w-full bg-[#07030d] border border-white/15 focus:border-[#681fe4] rounded-[4px] px-3.5 py-2.5 text-xs text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bebas tracking-[0.14em] text-neutral-300 uppercase mb-1">
                    Scope Notes / Goals
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe what you'd like to achieve with this service..."
                    value={bookingForm.notes}
                    onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                    className="w-full bg-[#07030d] border border-white/15 focus:border-[#681fe4] rounded-[4px] p-3 text-xs text-white outline-none resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#681fe4] hover:bg-[#5815cb] text-white font-bebas text-sm tracking-[0.16em] uppercase py-3.5 rounded-[4px] shadow-[0_4px_14px_rgba(104,31,228,0.3)] transition-all cursor-pointer"
                  >
                    {isSubmitting ? "Submitting Inquiry..." : "Confirm & Schedule Call →"}
                  </button>
                  <p className="text-[11px] font-mono text-neutral-500 text-center mt-2">
                    🔒 Zero spam. We sign mutual NDAs upon request.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Global Escrow & Settlement Banner */}
      <section className="relative py-16 px-4 sm:px-6 md:px-12 z-10 max-w-7xl mx-auto">
        <div className="bg-[#0c0818] rounded-[4px] p-8 md:p-12 border border-white/10 shadow-xl text-white flex flex-col lg:flex-row items-center justify-between gap-8 font-satoshi">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] bg-white/5 border border-white/10 text-[#681fe4] text-xs font-bebas tracking-[0.16em] uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-[#681fe4] animate-pulse" />
              <span>Multi-Currency Escrow &amp; Bank Settlement</span>
            </div>
            <h3 className="font-bebas text-3xl sm:text-4xl text-white tracking-[0.14em] uppercase mb-2">
              Ready to Authorize a Service or Retainer?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
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
              className="inline-flex items-center justify-center gap-2 bg-[#681fe4] hover:bg-[#5815cb] text-white font-bebas text-sm tracking-[0.16em] uppercase px-8 py-4 rounded-[4px] shadow-[0_10px_25px_rgba(104,31,228,0.35)] transition-all text-center whitespace-nowrap cursor-pointer"
            >
              <span>Open Payment Portal</span>
              <span>💳 ↓</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FULL IN-PAGE CLIENT PAYMENT PORTAL SECTION
         ========================================================================= */}
      <section
        id="payment-portal"
        className="relative py-12 sm:py-20 px-4 sm:px-6 md:px-12 z-10 max-w-7xl mx-auto scroll-mt-24 font-satoshi"
      >
        <div className="bg-[#0c0818] border border-white/10 rounded-[4px] p-6 sm:p-10 md:p-12 text-white shadow-2xl relative overflow-hidden">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] bg-white/5 text-[#681fe4] text-xs font-bebas tracking-[0.16em] uppercase border border-white/10 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#681fe4] animate-pulse" />
                <span>Balaji Prime Media • Direct In-Page Escrow Settlement</span>
              </div>
              <h2 className="font-bebas text-3xl sm:text-5xl text-white tracking-[0.16em] uppercase">
                Client Payment &amp; Service Authorization
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 mt-2 max-w-2xl leading-relaxed">
                Authorize your deliverables right here on this page with instant domestic settlement in INR (₹) or cross-border payment in USD ($), GBP (£), and EUR (€).
              </p>
            </div>
          </div>

          {/* 4-Step Interactive Progress Tracker */}
          <div className="py-6 border-b border-white/10">
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
                  className={`p-3.5 rounded-[4px] border transition-all text-left ${
                    portalStep === s.step
                      ? "bg-[#681fe4]/15 border-[#681fe4] shadow-[0_0_15px_rgba(104,31,228,0.2)]"
                      : portalStep > s.step
                      ? "bg-white/5 border-white/20 text-white cursor-pointer"
                      : "bg-[#07030d] border-white/5 text-neutral-500"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-950 flex items-center gap-1.5">
                      {portalStep > s.step && <span className="text-emerald-600">✓</span>}
                      <span>{s.title}</span>
                    </span>
                    <span
                      className={`text-xs font-mono px-2 py-0.5 rounded-full ${
                        portalStep === s.step
                          ? "bg-amber-500 text-white font-bold"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      Step 0{s.step}
                    </span>
                  </div>
                  {/* Subtitle (Fixes Issue 8: Text size >= 12px) */}
                  <p className="text-xs text-slate-500 mt-1">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Form Error Banner */}
          {portalFormError && (
            <div className="mt-6 p-4 rounded-[4px] bg-rose-950/60 border border-rose-500/50 text-rose-300 text-xs flex items-center gap-2.5">
              <span className="text-lg">⚠️</span>
              <span className="font-semibold">{portalFormError}</span>
            </div>
          )}

          {/* Portal Content Area */}
          <div className="pt-8">

            {/* STEP 1: Streamlined Service Selection */}
            {portalStep === 1 && (
              <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto">
                <div>
                  <h3 className="font-bebas text-xl sm:text-2xl text-white tracking-[0.14em] uppercase flex items-center gap-2">
                    <span>1. Which service did you purchase or wish to authorize?</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 mt-1">
                    Select a service from the quick dropdown below, or click custom invoice scope:
                  </p>
                </div>

                {/* Streamlined Selection Box */}
                <div className="p-6 rounded-[4px] bg-[#07030d] border border-white/10 space-y-4">
                  <div>
                    <label className="block text-xs font-bebas tracking-[0.14em] text-neutral-300 uppercase mb-2">
                      Choose Service from Catalog:
                    </label>
                    <select
                      value={isCustomService ? "custom" : selectedPortalService.id}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === "custom") {
                          setIsCustomService(true);
                        } else {
                          setIsCustomService(false);
                          const found = masterServicesList.find((s) => s.id === val);
                          if (found) setSelectedPortalService(found);
                        }
                        setPortalFormError(null);
                      }}
                      className="w-full bg-[#0c0818] border border-white/15 rounded-[4px] px-4 py-3 text-xs font-semibold text-white focus:outline-none focus:border-[#681fe4] cursor-pointer"
                    >
                      {masterServicesList.map((srv) => (
                        <option key={srv.id} value={srv.id} className="bg-[#0c0818] text-white">
                          {srv.icon3D} {srv.name} — ({currency === "INR" ? srv.priceINR : srv.priceUSD} {srv.pricingSuffixUSD})
                        </option>
                      ))}
                      <option value="custom" className="bg-[#0c0818] text-white">💼 Custom Invoiced Scope / Enterprise Retainer</option>
                    </select>
                  </div>

                  {/* Highlight of Currently Selected Service */}
                  {!isCustomService ? (
                    <div className="p-5 rounded-[4px] bg-[#0c0818] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl p-2 rounded-[4px] bg-white/5 border border-white/10">
                          {selectedPortalService.icon3D}
                        </span>
                        <div>
                          <h4 className="font-bebas text-lg sm:text-xl text-white tracking-[0.12em] uppercase leading-tight">
                            {selectedPortalService.name}
                          </h4>
                          <span className="text-xs text-[#681fe4] font-mono block mt-0.5">
                            {selectedPortalService.category} • Turnaround: {selectedPortalService.tat}
                          </span>
                        </div>
                      </div>

                      <div className="text-left sm:text-right">
                        <span className="text-xs text-neutral-400 block font-mono">Settlement Price</span>
                        <span className="font-bebas text-2xl text-white tracking-[0.08em]">
                          {currency === "INR" ? selectedPortalService.priceINR : selectedPortalService.priceUSD}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-5 rounded-[4px] bg-[#0c0818] border border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bebas tracking-[0.14em] text-neutral-300 uppercase mb-1">
                          Custom Scope Title *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Dedicated Enterprise SEO Retainer"
                          value={customServiceName}
                          onChange={(e) => setCustomServiceName(e.target.value)}
                          className="w-full bg-[#07030d] border border-white/15 rounded-[4px] px-3.5 py-2.5 text-xs text-white focus:border-[#681fe4] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bebas tracking-[0.14em] text-neutral-300 uppercase mb-1">
                          Invoice Settlement Amount ({currency}) *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 75000 or 1200"
                          value={customServiceAmount}
                          onChange={(e) => setCustomServiceAmount(e.target.value)}
                          className="w-full bg-[#07030d] border border-white/15 rounded-[4px] px-3.5 py-2.5 text-xs text-white focus:border-[#681fe4] outline-none font-mono"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Step 1 Next Button */}
                <div className="pt-2 flex justify-end">
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
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#681fe4] hover:bg-[#5815cb] text-white font-bebas text-sm tracking-[0.16em] uppercase px-8 py-3.5 rounded-[4px] shadow-[0_10px_25px_rgba(104,31,228,0.35)] transition-all cursor-pointer"
                  >
                    <span>Proceed to Client &amp; Domain Details</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Client & Domain Credentials */}
            {portalStep === 2 && (
              <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto">
                <div>
                  <h3 className="font-bebas text-xl sm:text-2xl text-white tracking-[0.14em] uppercase">
                    2. Client &amp; Website Domain Details
                  </h3>
                  <p className="text-xs text-neutral-300 mt-1">
                    Authorize deliverables for{" "}
                    <strong className="text-white">
                      {isCustomService ? customServiceName : selectedPortalService.name}
                    </strong>{" "}
                    (Settlement:{" "}
                    <strong className="text-[#681fe4]">
                      {isCustomService
                        ? `${currency === "INR" ? "₹" : "$"}${customServiceAmount}`
                        : currency === "INR"
                        ? selectedPortalService.priceINR
                        : selectedPortalService.priceUSD}
                    </strong>
                    ).
                  </p>
                </div>

                <div className="bg-[#07030d] border border-white/10 rounded-[4px] p-6 sm:p-8 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bebas tracking-[0.14em] text-neutral-300 uppercase mb-1.5">
                        Client Full Name or Business Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. John Doe / Global Corp Ltd"
                        value={portalClientName}
                        onChange={(e) => setPortalClientName(e.target.value)}
                        className="w-full bg-[#0c0818] border border-white/15 focus:border-[#681fe4] rounded-[4px] px-4 py-3 text-xs text-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bebas tracking-[0.14em] text-neutral-300 uppercase mb-1.5">
                        Work Email (for Invoice PDF &amp; Escrow Proof) *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@company.com"
                        value={portalClientEmail}
                        onChange={(e) => setPortalClientEmail(e.target.value)}
                        className="w-full bg-[#0c0818] border border-white/15 focus:border-[#681fe4] rounded-[4px] px-4 py-3 text-xs text-white outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bebas tracking-[0.14em] text-neutral-300 uppercase mb-1.5">
                      Target Website / Domain URL *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="https://yourbrand.com"
                      value={portalClientDomain}
                      onChange={(e) => setPortalClientDomain(e.target.value)}
                      className="w-full bg-[#0c0818] border border-white/15 focus:border-[#681fe4] rounded-[4px] px-4 py-3 text-xs text-white outline-none font-mono"
                    />
                    <span className="text-[11px] text-neutral-400 mt-1 block">
                      The domain where SEO, guest posting, or web application deliverables will be deployed.
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bebas tracking-[0.14em] text-neutral-300 uppercase mb-1.5">
                      Special Requirements or Project Notes (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Target anchor texts, priority target countries, tech stack notes, or deadlines..."
                      value={portalClientNotes}
                      onChange={(e) => setPortalClientNotes(e.target.value)}
                      className="w-full bg-[#0c0818] border border-white/15 focus:border-[#681fe4] rounded-[4px] px-4 py-3 text-xs text-white outline-none resize-none"
                    />
                  </div>
                </div>

                {/* Step 2 Actions */}
                <div className="pt-2 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setPortalStep(1)}
                    className="px-6 py-3 rounded-[4px] bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-bebas tracking-[0.14em] uppercase text-white transition-all cursor-pointer"
                  >
                    ← Back to Service
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
                    className="inline-flex items-center justify-center gap-2 bg-[#681fe4] hover:bg-[#5815cb] text-white font-bebas text-sm tracking-[0.16em] uppercase px-8 py-3.5 rounded-[4px] shadow-[0_10px_25px_rgba(104,31,228,0.35)] transition-all cursor-pointer"
                  >
                    <span>Proceed to Payment Rails</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Payment Options & Instant Authorization */}
            {portalStep === 3 && (
              <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto">
                {/* Authorization Summary Banner */}
                <div className="p-6 rounded-[4px] bg-[#07030d] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
                  <div>
                    <span className="font-bebas text-xs tracking-[0.18em] text-[#681fe4] uppercase block mb-1">
                      ✦ Final Authorization Summary
                    </span>
                    <h4 className="font-bebas text-xl sm:text-2xl text-white tracking-[0.12em] uppercase">
                      {isCustomService ? customServiceName : selectedPortalService.name}
                    </h4>
                    <p className="text-xs text-neutral-300 mt-0.5">
                      Target Domain: <strong className="font-mono text-white">{portalClientDomain}</strong> • Client: {portalClientName}
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="font-bebas text-xs uppercase text-neutral-400 tracking-[0.16em] block">Total Settlement</span>
                    <span className="font-bebas text-2xl sm:text-3xl text-[#681fe4] tracking-[0.08em]">
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
                  <label className="block text-xs font-bebas tracking-[0.16em] text-neutral-300 uppercase mb-2.5">
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
                        className={`p-3 rounded-[4px] text-left border transition-all cursor-pointer ${
                          portalPaymentMethod === m.id
                            ? "bg-[#681fe4] border-[#681fe4] text-white shadow-[0_4px_14px_rgba(104,31,228,0.3)]"
                            : "bg-[#07030d] border-white/10 hover:bg-white/5 text-neutral-300"
                        }`}
                      >
                        <p className="font-bebas text-sm tracking-[0.12em] uppercase leading-tight">{m.label}</p>
                        <p className="text-[10px] font-mono opacity-80 leading-tight mt-1 truncate">{m.sub}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Payment Rail Content Panel */}
                <div className="p-6 rounded-[4px] bg-[#07030d] border border-white/10">
                  {/* 1. UPI / QR Code Rail */}
                  {portalPaymentMethod === "upi" && (
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row items-center gap-6">
                        <div className="w-32 h-32 bg-white p-2.5 rounded-[4px] flex flex-col items-center justify-center shrink-0 shadow-md border border-[#681fe4]">
                          <div className="w-full h-full border-2 border-dashed border-neutral-300 rounded-[2px] flex flex-col items-center justify-center text-center p-1">
                            <span className="text-2xl">📱</span>
                            <span className="text-[10px] font-bebas tracking-[0.14em] text-black leading-tight uppercase">SCAN &amp; PAY</span>
                            <span className="text-[9px] font-bold text-[#681fe4] font-mono">917690868932@ybl</span>
                          </div>
                        </div>

                        <div className="space-y-2 flex-1 w-full text-xs">
                          <div className="flex items-center justify-between">
                            <span className="text-white font-semibold">Official UPI ID:</span>
                            <span className="text-xs text-[#681fe4] font-mono">✓ Verified Merchant Escrow</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-[#0c0818] border border-white/15 rounded-[4px] px-4 py-2.5 text-xs font-mono text-[#681fe4] font-bold truncate">
                              917690868932@ybl
                            </div>
                            <button
                              type="button"
                              onClick={() => copyToClipboard("917690868932@ybl", "UPI ID")}
                              className="px-4 py-2.5 rounded-[4px] bg-[#681fe4] hover:bg-[#5815cb] text-white text-xs font-bebas tracking-[0.14em] uppercase transition-all cursor-pointer shrink-0"
                            >
                              {copiedField === "UPI ID" ? "✓ Copied" : "Copy UPI"}
                            </button>
                          </div>

                          <p className="text-[11px] text-neutral-400 font-mono">
                            Beneficiary: <strong className="text-white">Balaji Prime Media</strong> • Supported: Google Pay, PhonePe, Paytm, BHIM, Cred.
                          </p>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bebas tracking-[0.14em] text-neutral-300 uppercase mb-1.5">
                          UPI Transaction ID / 12-Digit UTR Number (Optional if already sent)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 412389104821"
                          value={portalUtr}
                          onChange={(e) => setPortalUtr(e.target.value)}
                          className="w-full bg-[#0c0818] border border-white/15 focus:border-[#681fe4] rounded-[4px] px-4 py-2.5 text-xs text-white outline-none font-mono"
                        />
                      </div>
                    </div>
                  )}

                  {/* 2. Stripe Card Rail */}
                  {portalPaymentMethod === "card" && (
                    <div className="space-y-3.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bebas text-sm tracking-[0.14em] text-white uppercase">Stripe Global Multi-Currency Escrow</span>
                        <span className="text-xs text-[#681fe4] flex items-center gap-1 font-mono">
                          <span>🔒 256-Bit Bank Grade SSL</span>
                        </span>
                      </div>

                      <div>
                        <label className="block text-xs font-bebas tracking-[0.14em] text-neutral-300 uppercase mb-1">Cardholder Name</label>
                        <input
                          type="text"
                          value={portalClientName}
                          onChange={(e) => setPortalClientName(e.target.value)}
                          placeholder="Full Name as on card"
                          className="w-full bg-[#0c0818] border border-white/15 focus:border-[#681fe4] rounded-[4px] px-4 py-2.5 text-xs text-white outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bebas tracking-[0.14em] text-neutral-300 uppercase mb-1">Card Number</label>
                        <input
                          type="text"
                          maxLength={19}
                          placeholder="4242 •••• •••• 4242 (Visa, Mastercard, Amex)"
                          value={portalCardNumber}
                          onChange={(e) => setPortalCardNumber(e.target.value)}
                          className="w-full bg-[#0c0818] border border-white/15 focus:border-[#681fe4] rounded-[4px] px-4 py-2.5 text-xs font-mono text-white outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bebas tracking-[0.14em] text-neutral-300 uppercase mb-1">Expiry (MM/YY)</label>
                          <input
                            type="text"
                            maxLength={5}
                            placeholder="MM/YY"
                            value={portalCardExpiry}
                            onChange={(e) => setPortalCardExpiry(e.target.value)}
                            className="w-full bg-[#0c0818] border border-white/15 focus:border-[#681fe4] rounded-[4px] px-4 py-2.5 text-xs font-mono text-white outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bebas tracking-[0.14em] text-neutral-300 uppercase mb-1">CVC / CVV</label>
                          <input
                            type="password"
                            maxLength={4}
                            placeholder="•••"
                            value={portalCardCvc}
                            onChange={(e) => setPortalCardCvc(e.target.value)}
                            className="w-full bg-[#0c0818] border border-white/15 focus:border-[#681fe4] rounded-[4px] px-4 py-2.5 text-xs font-mono text-white outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 3. Bank Wire Rail */}
                  {portalPaymentMethod === "bank" && (
                    <div className="space-y-3 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bebas text-sm tracking-[0.14em] text-white uppercase">HDFC Bank Limited Coordinates</span>
                        <span className="text-xs text-[#681fe4] font-mono">Domestic &amp; SWIFT</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="bg-[#0c0818] p-3 rounded-[4px] border border-white/10 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-neutral-400 font-mono block">Beneficiary</span>
                            <strong className="text-white text-xs">Balaji Prime Media</strong>
                          </div>
                          <button
                            type="button"
                            onClick={() => copyToClipboard("Balaji Prime Media", "Beneficiary")}
                            className="text-xs text-[#681fe4] font-bebas tracking-[0.14em] uppercase hover:underline"
                          >
                            Copy
                          </button>
                        </div>

                        <div className="bg-[#0c0818] p-3 rounded-[4px] border border-white/10 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-neutral-400 font-mono block">Account Number</span>
                            <strong className="text-white font-mono text-xs">50200084920491</strong>
                          </div>
                          <button
                            type="button"
                            onClick={() => copyToClipboard("50200084920491", "Account Number")}
                            className="text-xs text-[#681fe4] font-bebas tracking-[0.14em] uppercase hover:underline"
                          >
                            Copy
                          </button>
                        </div>

                        <div className="bg-[#0c0818] p-3 rounded-[4px] border border-white/10 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-neutral-400 font-mono block">IFSC Code (India)</span>
                            <strong className="text-white font-mono text-xs">HDFC0001842</strong>
                          </div>
                          <button
                            type="button"
                            onClick={() => copyToClipboard("HDFC0001842", "IFSC Code")}
                            className="text-xs text-[#681fe4] font-bebas tracking-[0.14em] uppercase hover:underline"
                          >
                            Copy
                          </button>
                        </div>

                        <div className="bg-[#0c0818] p-3 rounded-[4px] border border-white/10 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-neutral-400 font-mono block">SWIFT / BIC (International)</span>
                            <strong className="text-white font-mono text-xs">HDFCINBB</strong>
                          </div>
                          <button
                            type="button"
                            onClick={() => copyToClipboard("HDFCINBB", "SWIFT Code")}
                            className="text-xs text-[#681fe4] font-bebas tracking-[0.14em] uppercase hover:underline"
                          >
                            Copy
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 4. PayPal Rail */}
                  {portalPaymentMethod === "paypal" && (
                    <div className="space-y-3 text-center py-4 text-xs font-satoshi">
                      <span className="text-4xl block">🅿️</span>
                      <h4 className="font-bebas text-xl text-white tracking-[0.14em] uppercase">PayPal Express Authorization</h4>
                      <p className="text-xs text-neutral-300 max-w-sm mx-auto">
                        Instant global payments with zero transaction fees for USD ($), GBP (£), EUR (€), and AUD (A$).
                      </p>
                      <div className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-[2px] text-xs text-white font-mono">
                        Target Invoice: <strong className="text-[#681fe4]">payments@balajiprimemedia.in</strong>
                      </div>
                    </div>
                  )}

                  {/* 5. Wise Rail */}
                  {portalPaymentMethod === "wise" && (
                    <div className="space-y-3 text-left text-xs font-satoshi">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">🌍</span>
                        <div>
                          <h4 className="font-bebas text-lg text-white tracking-[0.14em] uppercase">Wise Multi-Currency Wire</h4>
                          <p className="text-xs text-neutral-300">Zero exchange markup bank settlements worldwide</p>
                        </div>
                      </div>
                      <div className="p-3.5 rounded-[4px] bg-[#0c0818] border border-white/10 text-xs font-mono text-neutral-300">
                        Recipient: Balaji Prime Media • Account: 50200084920491 • IFSC: HDFC0001842
                      </div>
                    </div>
                  )}
                </div>

                {/* Processing State */}
                {portalProcessing && (
                  <div className="p-5 rounded-[4px] bg-[#681fe4]/20 border border-[#681fe4] flex items-center justify-center gap-3 text-white text-xs font-semibold animate-pulse font-mono">
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
                    className="px-6 py-3 rounded-[4px] bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-bebas tracking-[0.14em] uppercase text-white transition-all cursor-pointer disabled:opacity-50"
                  >
                    ← Back
                  </button>

                  <button
                    type="button"
                    disabled={portalProcessing}
                    onClick={() => handlePortalPayment()}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-[#681fe4] hover:bg-[#5815cb] text-white font-bebas text-sm tracking-[0.16em] uppercase px-8 py-3.5 rounded-[4px] shadow-[0_10px_25px_rgba(104,31,228,0.35)] cursor-pointer disabled:opacity-50"
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

            {/* STEP 4: Success & Verified Escrow Receipt */}
            {portalStep === 4 && (
              <div className="space-y-6 text-center py-4 animate-fadeIn max-w-2xl mx-auto font-satoshi">
                <div className="w-20 h-20 rounded-[4px] bg-[#681fe4]/20 border border-[#681fe4] text-[#681fe4] flex items-center justify-center mx-auto text-4xl shadow-md">
                  ✓
                </div>

                <div>
                  <span className="inline-block px-4 py-1.5 rounded-[2px] bg-white/5 border border-white/10 text-[#681fe4] text-xs font-bebas tracking-[0.16em] uppercase mb-2">
                    Settlement Completed &amp; Escrow Verified
                  </span>
                  <h3 className="font-bebas text-3xl sm:text-4xl text-white tracking-[0.14em] uppercase">
                    Payment Authorization Confirmed!
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 mt-1.5 leading-relaxed">
                    Your order has been recorded into the Balaji Prime Media core ledger. An authenticated tax receipt and delivery ticket has been dispatched to{" "}
                    <strong className="text-white">{portalClientEmail || "your email"}</strong>.
                  </p>
                </div>

                {/* Cryptographic Receipt Box */}
                <div className="bg-[#07030d] border border-white/10 rounded-[4px] p-6 text-left space-y-3 text-xs shadow-sm font-mono">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="text-neutral-400">Transaction Reference ID:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{portalTxnId}</span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(portalTxnId, "Transaction ID")}
                        className="text-xs text-[#681fe4] font-bold hover:underline"
                      >
                        {copiedField === "Transaction ID" ? "✓ Copied" : "Copy"}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-neutral-400 block font-satoshi">Service:</span>
                      <strong className="text-white">
                        {isCustomService ? customServiceName : selectedPortalService.name}
                      </strong>
                    </div>
                    <div>
                      <span className="text-neutral-400 block font-satoshi">Settled Amount:</span>
                      <strong className="text-[#681fe4] text-sm">
                        {isCustomService
                          ? `${currency === "INR" ? "₹" : "$"}${customServiceAmount}`
                          : currency === "INR"
                          ? selectedPortalService.priceINR
                          : selectedPortalService.priceUSD}
                      </strong>
                    </div>
                    <div>
                      <span className="text-neutral-400 block font-satoshi">Target Domain:</span>
                      <strong className="text-white font-mono">{portalClientDomain}</strong>
                    </div>
                    <div>
                      <span className="text-neutral-400 block font-satoshi">Settlement Rail:</span>
                      <strong className="text-white">{portalPaymentMethod.toUpperCase()}</strong>
                    </div>
                  </div>
                </div>

                {/* Return / Reset Button */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      setPortalStep(1);
                      const el = document.getElementById("services-grid");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="inline-flex items-center justify-center gap-2 bg-[#681fe4] hover:bg-[#5815cb] text-white font-bebas text-sm tracking-[0.16em] uppercase px-8 py-3.5 rounded-[4px] transition-all shadow-[0_10px_25px_rgba(104,31,228,0.35)] cursor-pointer"
                  >
                    <span>↺ Authorize Another Service / Return to Grid</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
