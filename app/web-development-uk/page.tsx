import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GlobalWebPricingMatrix from "../components/GlobalWebPricingMatrix";

export const metadata: Metadata = {
  title: "High-Performance Next.js Web Development UK | Balaji Prime Media",
  description:
    "Bespoke Next.js web development agency serving UK businesses in London, Manchester, and Birmingham. Sub-0.8s speed, GDPR compliance, and 95+ PageSpeed.",
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
      "name": "United Kingdom",
    },
    "description":
      "Next.js App Router engineering, custom UI/UX design, headless e-commerce, and UK GDPR-compliant web systems for British companies.",
  };

  const ukDeliverables = [
    {
      title: "Sub-Second Next.js App Router Engineering",
      desc: "Architected on React Server Components and edge computing deployed across London (LHR) nodes for sub-0.8s load times.",
      icon: "⚡",
    },
    {
      title: "UK GDPR & Cookie Consent Compliance",
      desc: "Built-in PECR and UK Data Protection Act 2018 compliance with cookie banner controls, zero unconsented tracker leaks, and privacy manifests.",
      icon: "🛡️",
    },
    {
      title: "Headless E-Commerce & British Payment Rails",
      desc: "Custom headless Shopify Plus or BigCommerce architectures integrated with Stripe UK, Apple Pay, Google Pay, and Klarna.",
      icon: "🛍️",
    },
    {
      title: "WCAG 2.1 AA Accessibility Standards",
      desc: "Full semantic HTML, keyboard navigability, high-contrast ratios, and screen-reader fidelity matching UK Equality Act digital mandates.",
      icon: "♿",
    },
    {
      title: "Conversion-Focused UI/UX Design System",
      desc: "Custom Figma prototypes tailored for British consumer aesthetics — minimalist, premium typography, and frictionless checkout funnels.",
      icon: "🎨",
    },
    {
      title: "Technical SEO & Schema Integration",
      desc: "Automated dynamic sitemaps, OpenGraph social cards, JSON-LD Organization/Product schemas, and zero crawl waste.",
      icon: "🔍",
    },
  ];

  const ukFaqs = [
    {
      q: "How do you coordinate with UK teams across time zones?",
      a: "Jaipur, India operates at UTC+5:30, which provides 4 to 5 hours of direct live working overlap every afternoon with London and Manchester (GMT / BST). We integrate into your Slack channels and run weekly sprint check-ins.",
    },
    {
      q: "Can we pay in British Pounds (GBP) with clean invoicing?",
      a: "Yes. All engagements are priced and invoiced in GBP (£) via Stripe, direct UK bank transfer (Sort Code / Account Number), or Wise Business with transparent milestone billing.",
    },
    {
      q: "What is your typical turnaround time for a bespoke Next.js website?",
      a: "A custom 5–10 page corporate website or high-converting SaaS landing site is typically engineered and delivered within 2 to 4 weeks. Complex headless e-commerce builds take 4 to 6 weeks.",
    },
    {
      q: "Do you provide ongoing maintenance and UK server support?",
      a: "Yes. We offer continuous technical maintenance retainers covering security audits, dependency updates, uptime monitoring, and dedicated developer sprint hours.",
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
              <span className="text-[#681fe4]">WEB DEVELOPMENT UK</span>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] bg-white/[0.04] border border-white/10 font-mono text-xs uppercase tracking-[0.2em] text-[#681fe4] mb-4">
            <span>🇬🇧 BESPOKE NEXT.JS ENGINEERING FOR UK ENTERPRISES</span>
          </div>

          <h1 className="font-bebas text-4xl sm:text-6xl md:text-7xl tracking-[0.14em] text-white uppercase leading-[0.95] mb-6">
            BESPOKE NEXT.JS &amp; E-COMMERCE <br />
            <span className="text-[#681fe4]">WEB DEVELOPMENT UK</span>
          </h1>

          <p className="font-satoshi text-neutral-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
            We craft sub-second web applications and headless e-commerce stores designed to convert British consumers. Built with Next.js App Router, TypeScript, and UK GDPR-compliant edge architectures.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center gap-2 bg-[#681fe4] hover:bg-[#5815cb] text-white font-bebas text-sm tracking-[0.16em] uppercase px-8 py-4 rounded-[4px] shadow-[0_10px_25px_rgba(104,31,228,0.35)] transition-all cursor-pointer"
            >
              <span>DISCUSS YOUR UK PROJECT (GMT HOURS) →</span>
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bebas text-sm tracking-[0.16em] uppercase px-7 py-4 rounded-[4px] transition-all cursor-pointer"
            >
              <span>EXPLORE CASE STUDIES</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 2: British Engineering Standards */}
      <section className="py-16 px-6 sm:px-12 max-w-[1320px] mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-bebas text-xs tracking-[0.24em] text-[#681fe4] uppercase block mb-1">
            ENGINEERING SPECIFICATIONS
          </span>
          <h2 className="font-bebas text-3xl sm:text-5xl tracking-[0.14em] text-white uppercase leading-none">
            ENGINEERED FOR THE UK DIGITAL ECONOMY
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2 font-mono">
            Every UK digital build adheres to strict speed, accessibility, and legal benchmarks:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ukDeliverables.map((item, idx) => (
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

      {/* Section 3: 4-Phase UK Web Sprint Process */}
      <section className="py-16 px-6 sm:px-12 bg-[#0c0617] border-y border-white/10 relative z-10">
        <div className="max-w-[1320px] mx-auto text-left">
          <div className="mb-10 text-center sm:text-left">
            <span className="font-bebas text-xs tracking-[0.24em] text-[#681fe4] uppercase block mb-1">
              DEVELOPMENT SPRINTS
            </span>
            <h2 className="font-bebas text-3xl sm:text-5xl tracking-[0.14em] text-white uppercase leading-none">
              OUR UK BESPOKE ENGINEERING SPRINT
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-[4px] bg-[#07030d] border border-white/10">
              <span className="text-[#681fe4] font-mono font-bold text-xs">SPRINT 01 // DISCOVERY</span>
              <h3 className="font-bebas text-xl text-white tracking-[0.1em] mt-2 mb-2">Technical Architecture &amp; Wireframes</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                User journey mapping, technical database schema, and high-fidelity Figma prototypes built for British customer flows.
              </p>
            </div>
            <div className="p-6 rounded-[4px] bg-[#07030d] border border-white/10">
              <span className="text-[#681fe4] font-mono font-bold text-xs">SPRINT 02 // FRONTEND</span>
              <h3 className="font-bebas text-xl text-white tracking-[0.1em] mt-2 mb-2">Next.js App Router Engineering</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                Modern modular TypeScript, Tailwind styling, smooth CSS micro-interactions, and server components.
              </p>
            </div>
            <div className="p-6 rounded-[4px] bg-[#07030d] border border-white/10">
              <span className="text-[#681fe4] font-mono font-bold text-xs">SPRINT 03 // INTEGRATION</span>
              <h3 className="font-bebas text-xl text-white tracking-[0.1em] mt-2 mb-2">APIs, Gateways &amp; CMS Connectors</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                Connecting Stripe UK, headless CMS (Sanity / Strapi / Shopify), CRM workflows, and automated email notifications.
              </p>
            </div>
            <div className="p-6 rounded-[4px] bg-[#07030d] border border-white/10">
              <span className="text-[#681fe4] font-mono font-bold text-xs">SPRINT 04 // QA &amp; LAUNCH</span>
              <h3 className="font-bebas text-xl text-white tracking-[0.1em] mt-2 mb-2">Core Web Vitals &amp; Handover</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                Full Lighthouse verification (95+ score), cross-browser browser testing, DNS setup, and Git repository handover.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Global Country-Wise Development Rates & Scope */}
      <div className="relative z-10">
        <GlobalWebPricingMatrix />
      </div>

      {/* Section 4: UK Client FAQs */}
      <section className="py-16 px-6 sm:px-12 max-w-[1320px] mx-auto relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="font-bebas text-xs tracking-[0.24em] text-[#681fe4] uppercase block mb-1">
              TRANSPARENCY &amp; DELIVERY
            </span>
            <h2 className="font-bebas text-3xl sm:text-5xl tracking-[0.14em] text-white uppercase leading-none">
              FREQUENTLY ASKED QUESTIONS (UK CLIENTS)
            </h2>
          </div>

          <div className="space-y-4">
            {ukFaqs.map((faq, idx) => (
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
            LAUNCH UK PROJECT
          </span>
          <h2 className="font-bebas text-3xl sm:text-5xl tracking-[0.14em] text-white uppercase mb-3 leading-none">
            START YOUR WEB PROJECT WITH BALAJI PRIME MEDIA
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto mb-8 font-normal leading-relaxed">
            Get a detailed timeline, architecture proposal, and transparent quote in GBP (£) within 12 hours.
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
