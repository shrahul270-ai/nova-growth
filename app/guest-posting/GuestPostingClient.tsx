"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GuestPostMarketplace from "../components/GuestPostMarketplace";
import DesignProHero from "../components/DesignProHero";
import { Check, HelpCircle, ArrowRight } from "lucide-react";

interface FaqItem {
  id: number;
  category: "quality" | "approval" | "delivery" | "pricing";
  q: string;
  a: string;
}

const faqs: FaqItem[] = [
  {
    id: 1,
    category: "quality",
    q: "Are these links permanent?",
    a: "Yes. All placements are guaranteed for life. If any link drops, is altered, or loses Google indexation within 12 months, we replace it with an equal or higher DR publication completely free of charge.",
  },
  {
    id: 2,
    category: "approval",
    q: "Can I pre-approve the websites before publishing?",
    a: "Absolutely. We provide a curated shortlist matching your exact topical niche, domain metrics, and target audience. We only draft native content and secure publication after your explicit written approval.",
  },
  {
    id: 3,
    category: "quality",
    q: "Are these backlinks 100% Do-Follow & Indexed?",
    a: "Yes. Every placement is guaranteed 100% contextual Do-Follow, placed naturally inside native 1,000+ word editorial articles, and backed by our Google indexation warranty.",
  },
  {
    id: 4,
    category: "delivery",
    q: "How fast do guest post links go live?",
    a: "Most placements go live within 7 to 14 business days, depending on publication editorial calendars. You receive live URL confirmation and indexation tracking as soon as it goes live.",
  },
  {
    id: 5,
    category: "approval",
    q: "Can I choose my own anchor texts and target URLs?",
    a: "Yes, you have complete editorial control over anchor texts, branded variations, and target landing pages to align with your exact topical SEO ranking strategy.",
  },
  {
    id: 6,
    category: "quality",
    q: "What metrics do you guarantee for each publication?",
    a: "We guarantee minimum Ahrefs DR 50–90+, verified organic search traffic of 10,000+ monthly visits, clean backlink profiles with zero PBNs, and strict zero-spam editorial standards.",
  },
  {
    id: 7,
    category: "pricing",
    q: "Do you offer bulk discounts or custom monthly retainers?",
    a: "Yes! For agencies, aggregators, and enterprise brands purchasing 10+ placements per month, we offer dedicated volume discounts, priority editorial queues, and white-label client reports.",
  },
  {
    id: 8,
    category: "pricing",
    q: "Which payment methods are accepted for link building?",
    a: "We support Stripe, PayPal, Wise, Wire Transfer, VISA, Mastercard, UPI, and ACH direct bank transfers with automated invoice generation and tax compliance.",
  },
];

const categoryCards = [
  {
    key: "quality",
    title: "Link Quality & Warranty",
    articles: "32 Articles",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    key: "approval",
    title: "Editorial Rules & Approval",
    articles: "24 Articles",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    key: "delivery",
    title: "Turnaround & Speed",
    articles: "18 Articles",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    key: "pricing",
    title: "Pricing & Retainers",
    articles: "16 Articles",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
];

export default function GuestPostingClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Filter FAQs based on search query and category
  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      searchQuery.trim() === "" ||
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      !selectedCategory || faq.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-amber-500 selection:text-white font-sans antialiased">
      {/* 2-Tier White & Yellow-Golden Luxury Navbar */}
      <div className="relative z-40 bg-white">
        <Navbar activePage="guest-posting" />
      </div>

      {/* 1. On-Topic White & Yellow-Gold Hero Section (Fixes Issue 1) */}
      <DesignProHero />

      {/* 2. Curated Editorial Overview Banner (White & Yellow-Gold Theme) */}
      <section className="relative w-full py-12 sm:py-16 px-4 sm:px-6 md:px-12 text-center bg-[#fffdfa] border-b border-amber-200/80">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-800 mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            Curated White-Hat Editorial Links
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight mb-4">
            Authority Guest Posts on{" "}
            <span className="bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
              Real DR 50–90+ Publications
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed font-normal">
            Zero PBNs. Zero spam farms. Pure in-content editorial backlinks that drive topical authority, pass link juice, and survive every Google core update.
          </p>

          {/* Feature Pill Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-amber-200/70 shadow-xs">
              <div className="text-amber-600 font-black text-xl sm:text-2xl">100%</div>
              <div className="text-xs font-bold text-slate-900 mt-1">Do-Follow Guaranteed</div>
              <div className="text-xs text-slate-500 mt-0.5">Permanent in-content links</div>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-amber-200/70 shadow-xs">
              <div className="text-amber-600 font-black text-xl sm:text-2xl">DR 50–90+</div>
              <div className="text-xs font-bold text-slate-900 mt-1">Ahrefs Verified Authority</div>
              <div className="text-xs text-slate-500 mt-0.5">Strict quality benchmarks</div>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-amber-200/70 shadow-xs">
              <div className="text-amber-600 font-black text-xl sm:text-2xl">Real Traffic</div>
              <div className="text-xs font-bold text-slate-900 mt-1">Minimum 10k+ Monthly Visits</div>
              <div className="text-xs text-slate-500 mt-0.5">Verified organic searchers</div>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-amber-200/70 shadow-xs">
              <div className="text-amber-600 font-black text-xl sm:text-2xl">Editorial Native</div>
              <div className="text-xs font-bold text-slate-900 mt-1">Native In-House Writers</div>
              <div className="text-xs text-slate-500 mt-0.5">1,000+ words per article</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Advanced 40,000+ Publisher Inventory & Filtering Marketplace Section */}
      <GuestPostMarketplace />

      {/* 4. Packages / Pricing Tier (White & Yellow-Gold Theme) */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto border-t border-amber-200/60">
        <div className="text-center mb-12 sm:mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 block mb-2">
            Pricing Packages
          </span>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight">
            Transparent Link Building Tiers
          </h3>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl mx-auto leading-relaxed">
            All tiers include professional content drafting, manual outreach, and lifetime placement guarantee.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Starter Pack */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 flex flex-col justify-between shadow-sm hover:border-amber-300 hover:shadow-md transition-all">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Starter Pack</span>
              <div className="text-4xl font-black text-slate-950 mt-3 mb-1">$750</div>
              <p className="text-xs text-slate-600 mb-6 leading-relaxed">Perfect for niche websites and initial keyword tests</p>
              <ul className="space-y-3.5 text-xs text-slate-700">
                <li className="flex items-center gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                  <span><strong>3 Editorial Placements</strong></span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                  <span>Domain Rating <strong>DR 50–65+</strong></span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                  <span>1,000+ Word Native Articles</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                  <span>100% Do-Follow &amp; Indexed</span>
                </li>
              </ul>
            </div>
            <Link
              href="/contact-us"
              className="mt-8 block text-center py-3.5 rounded-full bg-white hover:bg-amber-50/50 text-slate-800 font-bold text-xs border border-slate-200 hover:border-amber-400 transition-all shadow-xs"
            >
              Order Starter Pack →
            </Link>
          </div>

          {/* Growth Pack (Featured) */}
          <div className="p-8 rounded-3xl bg-[#fffdfa] border-2 border-amber-500 shadow-xl shadow-amber-500/10 flex flex-col justify-between relative hover:shadow-2xl transition-all">
            <span className="absolute -top-3.5 right-6 px-3.5 py-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-black uppercase tracking-wider rounded-full shadow-xs">
              Most Popular
            </span>
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Authority Growth</span>
              <div className="text-4xl font-black text-slate-950 mt-3 mb-1">$1,650</div>
              <p className="text-xs text-slate-600 mb-6 leading-relaxed">Designed for scaleups competing in high-CPC niches</p>
              <ul className="space-y-3.5 text-xs text-slate-700">
                <li className="flex items-center gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                  <span><strong>7 Editorial Placements</strong></span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                  <span>Domain Rating <strong>DR 65–80+</strong></span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                  <span>1,200+ Word In-Depth Articles</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                  <span>Custom Anchor Text Strategy</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                  <span>Permanent Placement Warranty</span>
                </li>
              </ul>
            </div>
            <Link
              href="/contact-us"
              className="mt-8 block text-center py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-yellow-500 text-white font-extrabold text-xs transition-all shadow-md shadow-amber-900/15"
            >
              Order Growth Pack →
            </Link>
          </div>

          {/* Enterprise Pack */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 flex flex-col justify-between shadow-sm hover:border-amber-300 hover:shadow-md transition-all">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Enterprise Scale</span>
              <div className="text-4xl font-black text-slate-950 mt-3 mb-1">$3,500</div>
              <p className="text-xs text-slate-600 mb-6 leading-relaxed">Full authority takeover with tier-1 media mentions</p>
              <ul className="space-y-3.5 text-xs text-slate-700">
                <li className="flex items-center gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                  <span><strong>15 High-Authority Links</strong></span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                  <span>Domain Rating <strong>DR 75–90+</strong></span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                  <span>Forbes/TechCrunch Tier Outreach</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                  <span>Dedicated Outreach Strategist</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                  <span>Monthly Live Ranking Dashboard</span>
                </li>
              </ul>
            </div>
            <Link
              href="/contact-us"
              className="mt-8 block text-center py-3.5 rounded-full bg-white hover:bg-amber-50/50 text-slate-800 font-bold text-xs border border-slate-200 hover:border-amber-400 transition-all shadow-xs"
            >
              Custom Enterprise Brief →
            </Link>
          </div>
        </div>
      </section>

      {/* 5. LUXURY WHITE & YELLOW-GOLD FAQ SECTION */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 md:px-12 bg-[#fffdfa] text-slate-900 overflow-hidden border-t border-amber-200/80">
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Pill Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-bold tracking-widest uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>FAQ • Quick Answers</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-950 mb-4 leading-tight">
            Frequently Asked Questions
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed font-normal">
            Find answers to the most common questions about Balaji Prime Media&apos;s guest posting platforms, editorial rules, lifetime warranties, and link building deliverables.
          </p>

          {/* 4 Category Filter Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto mb-12 text-left">
            {categoryCards.map((card) => {
              const isSelected = selectedCategory === card.key;
              return (
                <button
                  type="button"
                  key={card.key}
                  onClick={() => setSelectedCategory(isSelected ? null : card.key)}
                  className={`group relative flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "border-amber-500 bg-amber-50/30 shadow-md ring-2 ring-amber-500/20"
                      : "bg-white border-slate-200 hover:border-amber-300 hover:bg-amber-50/20 shadow-xs"
                  }`}
                >
                  {/* Round Icon Disc */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                      isSelected
                        ? "bg-gradient-to-r from-amber-500 to-amber-600 border-amber-500 text-white shadow-xs"
                        : "bg-amber-50 border-amber-200 text-amber-700 group-hover:scale-105"
                    }`}
                  >
                    {card.icon}
                  </div>

                  {/* Card Info */}
                  <div className="flex flex-col">
                    <span className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-amber-600 transition-colors leading-tight">
                      {card.title}
                    </span>
                    <span className="text-xs text-slate-500 font-normal mt-1 flex items-center gap-2">
                      <span>{card.articles}</span>
                      {isSelected && (
                        <span className="text-xs text-amber-700 font-bold uppercase tracking-wider bg-amber-100 px-2 py-0.5 rounded-full">
                          Active Filter
                        </span>
                      )}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Filter Pill Alert */}
          {selectedCategory && (
            <div className="flex items-center justify-center gap-3 mb-8">
              <span className="text-xs text-slate-600">
                Showing questions for: <span className="text-slate-900 font-bold">{selectedCategory}</span>
              </span>
              <button
                type="button"
                onClick={() => setSelectedCategory(null)}
                className="text-xs text-amber-600 hover:text-amber-700 underline font-bold cursor-pointer"
              >
                View all questions
              </button>
            </div>
          )}

          {/* Accordion Rows */}
          <div className="max-w-3xl mx-auto space-y-3.5 text-left">
            {filteredFaqs.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl transition-all duration-200 border overflow-hidden ${
                    isOpen
                      ? "bg-amber-50/20 border-amber-500 shadow-sm"
                      : "bg-white border-slate-200 hover:border-amber-300"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full min-h-[64px] px-6 py-4.5 text-left flex items-center justify-between gap-4 cursor-pointer select-none"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`font-bold text-sm sm:text-base transition-colors leading-snug ${
                        isOpen ? "text-amber-700" : "text-slate-900"
                      }`}
                    >
                      {faq.q}
                    </span>

                    {/* Expand Indicator */}
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-mono font-bold transition-all ${
                        isOpen
                          ? "bg-amber-500 text-white rotate-180 shadow-xs"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-0 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      <p className="pt-3">{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
