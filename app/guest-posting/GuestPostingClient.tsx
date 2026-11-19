"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GuestPostMarketplace from "../components/GuestPostMarketplace";
import DesignProHero from "../components/DesignProHero";

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
    <div className="min-h-screen bg-[#07030d] text-white selection:bg-[#681fe4] selection:text-white font-satoshi antialiased">
      {/* Modern Industrial Fixed Navbar */}
      <Navbar activePage="guest-posting" />

      {/* 1. On-Topic Industrial Hero Section */}
      <DesignProHero />

      {/* 2. Curated Editorial Overview Banner (Modern Industrial Elegance) */}
      <section className="relative w-full py-16 sm:py-20 px-4 sm:px-6 md:px-12 text-center bg-[#07030d] border-b border-white/10 bg-grid-white-240">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-[4px] bg-white/5 border border-white/10 text-xs font-bebas tracking-[0.2em] text-[#681fe4] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#681fe4] animate-pulse" />
            <span>CURATED WHITE-HAT EDITORIAL LINKS</span>
          </div>

          <h2 className="font-bebas text-3xl sm:text-5xl md:text-6xl text-white tracking-[0.16em] uppercase leading-none mb-4">
            AUTHORITY GUEST POSTS ON{" "}
            <span className="text-[#681fe4]">
              REAL DR 50–90+ PUBLICATIONS
            </span>
          </h2>
          <p className="font-satoshi text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Zero PBNs. Zero spam farms. Pure in-content editorial backlinks that drive topical authority, pass link juice, and survive every Google core update.
          </p>

          {/* Feature Pill Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-4 sm:p-5 rounded-[4px] bg-[#0c0818] border border-white/10">
              <div className="text-[#681fe4] font-bebas text-2xl sm:text-3xl tracking-[0.1em]">100%</div>
              <div className="text-xs font-bebas tracking-[0.14em] text-white uppercase mt-1">Do-Follow Guaranteed</div>
              <div className="text-xs text-neutral-400 mt-0.5 font-satoshi">Permanent in-content links</div>
            </div>
            <div className="p-4 sm:p-5 rounded-[4px] bg-[#0c0818] border border-white/10">
              <div className="text-[#681fe4] font-bebas text-2xl sm:text-3xl tracking-[0.1em]">DR 50–90+</div>
              <div className="text-xs font-bebas tracking-[0.14em] text-white uppercase mt-1">Ahrefs Verified Authority</div>
              <div className="text-xs text-neutral-400 mt-0.5 font-satoshi">Strict quality benchmarks</div>
            </div>
            <div className="p-4 sm:p-5 rounded-[4px] bg-[#0c0818] border border-white/10">
              <div className="text-[#681fe4] font-bebas text-2xl sm:text-3xl tracking-[0.1em]">Real Traffic</div>
              <div className="text-xs font-bebas tracking-[0.14em] text-white uppercase mt-1">Minimum 10k+ Monthly Visits</div>
              <div className="text-xs text-neutral-400 mt-0.5 font-satoshi">Verified organic searchers</div>
            </div>
            <div className="p-4 sm:p-5 rounded-[4px] bg-[#0c0818] border border-white/10">
              <div className="text-[#681fe4] font-bebas text-2xl sm:text-3xl tracking-[0.1em]">Editorial Native</div>
              <div className="text-xs font-bebas tracking-[0.14em] text-white uppercase mt-1">Native In-House Writers</div>
              <div className="text-xs text-neutral-400 mt-0.5 font-satoshi">1,000+ words per article</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Advanced 40,000+ Publisher Inventory & Filtering Marketplace Section */}
      <GuestPostMarketplace />

      {/* 4. Packages / Pricing Tier (Modern Industrial Elegance) */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10">
        <div className="text-center mb-14 sm:mb-16">
          <span className="font-bebas text-xs sm:text-sm tracking-[0.24em] text-[#681fe4] uppercase block mb-2">
            // PRICING TIERS
          </span>
          <h3 className="font-bebas text-3xl sm:text-5xl md:text-6xl text-white tracking-[0.16em] uppercase">
            TRANSPARENT LINK BUILDING TIERS
          </h3>
          <p className="font-satoshi text-neutral-300 text-sm sm:text-base mt-2 max-w-xl mx-auto leading-relaxed">
            All tiers include professional content drafting, manual outreach, and lifetime placement guarantee.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Starter Pack */}
          <div className="p-8 rounded-[4px] bg-[#0c0818] border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all">
            <div>
              <span className="font-bebas text-xs tracking-[0.2em] text-neutral-400 uppercase">Starter Pack</span>
              <div className="font-bebas text-4xl sm:text-5xl tracking-[0.08em] text-white mt-3 mb-1">$750</div>
              <p className="font-satoshi text-xs text-neutral-400 mb-6 leading-relaxed">Perfect for niche websites and initial keyword tests</p>
              <ul className="space-y-3.5 text-xs text-neutral-300 font-satoshi">
                <li className="flex items-center gap-2.5">
                  <span className="w-4 h-4 rounded-[2px] bg-[#681fe4]/20 text-[#681fe4] flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                  <span><strong className="text-white">3 Editorial Placements</strong></span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-4 h-4 rounded-[2px] bg-[#681fe4]/20 text-[#681fe4] flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                  <span>Domain Rating <strong className="text-white">DR 50–65+</strong></span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-4 h-4 rounded-[2px] bg-[#681fe4]/20 text-[#681fe4] flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                  <span>1,000+ Word Native Articles</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-4 h-4 rounded-[2px] bg-[#681fe4]/20 text-[#681fe4] flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                  <span>100% Do-Follow &amp; Indexed</span>
                </li>
              </ul>
            </div>
            <Link
              href="/contact-us"
              className="mt-8 block text-center py-3.5 rounded-[4px] bg-white/5 hover:bg-white/10 text-white font-bebas text-sm tracking-[0.16em] border border-white/15 transition-all uppercase"
            >
              ORDER STARTER PACK →
            </Link>
          </div>

          {/* Growth Pack (Featured) */}
          <div className="p-8 rounded-[4px] bg-[#0c0818] border-2 border-[#681fe4] shadow-[0_10px_35px_rgba(104,31,228,0.25)] flex flex-col justify-between relative transition-all">
            <span className="absolute -top-3.5 right-6 px-3 py-0.5 bg-[#681fe4] text-white text-[11px] font-bebas tracking-[0.2em] uppercase rounded-[2px]">
              MOST POPULAR
            </span>
            <div>
              <span className="font-bebas text-xs tracking-[0.2em] text-[#681fe4] uppercase">Authority Growth</span>
              <div className="font-bebas text-4xl sm:text-5xl tracking-[0.08em] text-white mt-3 mb-1">$1,650</div>
              <p className="font-satoshi text-xs text-neutral-400 mb-6 leading-relaxed">Designed for scaleups competing in high-CPC niches</p>
              <ul className="space-y-3.5 text-xs text-neutral-300 font-satoshi">
                <li className="flex items-center gap-2.5">
                  <span className="w-4 h-4 rounded-[2px] bg-[#681fe4] text-white flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                  <span><strong className="text-white">7 Editorial Placements</strong></span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-4 h-4 rounded-[2px] bg-[#681fe4] text-white flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                  <span>Domain Rating <strong className="text-white">DR 65–80+</strong></span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-4 h-4 rounded-[2px] bg-[#681fe4] text-white flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                  <span>1,200+ Word In-Depth Articles</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-4 h-4 rounded-[2px] bg-[#681fe4] text-white flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                  <span>Custom Anchor Text Strategy</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-4 h-4 rounded-[2px] bg-[#681fe4] text-white flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                  <span>Permanent Placement Warranty</span>
                </li>
              </ul>
            </div>
            <Link
              href="/contact-us"
              className="mt-8 block text-center py-3.5 rounded-[4px] bg-[#681fe4] hover:bg-[#5815cb] text-white font-bebas text-sm tracking-[0.16em] transition-all shadow-[0_10px_25px_rgba(104,31,228,0.35)] uppercase"
            >
              ORDER GROWTH PACK →
            </Link>
          </div>

          {/* Enterprise Pack */}
          <div className="p-8 rounded-[4px] bg-[#0c0818] border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all">
            <div>
              <span className="font-bebas text-xs tracking-[0.2em] text-neutral-400 uppercase">Enterprise Scale</span>
              <div className="font-bebas text-4xl sm:text-5xl tracking-[0.08em] text-white mt-3 mb-1">$3,500</div>
              <p className="font-satoshi text-xs text-neutral-400 mb-6 leading-relaxed">Full authority takeover with tier-1 media mentions</p>
              <ul className="space-y-3.5 text-xs text-neutral-300 font-satoshi">
                <li className="flex items-center gap-2.5">
                  <span className="w-4 h-4 rounded-[2px] bg-[#681fe4]/20 text-[#681fe4] flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                  <span><strong className="text-white">15 High-Authority Links</strong></span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-4 h-4 rounded-[2px] bg-[#681fe4]/20 text-[#681fe4] flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                  <span>Domain Rating <strong className="text-white">DR 75–90+</strong></span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-4 h-4 rounded-[2px] bg-[#681fe4]/20 text-[#681fe4] flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                  <span>Forbes/TechCrunch Tier Outreach</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-4 h-4 rounded-[2px] bg-[#681fe4]/20 text-[#681fe4] flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                  <span>Dedicated Outreach Strategist</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-4 h-4 rounded-[2px] bg-[#681fe4]/20 text-[#681fe4] flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                  <span>Monthly Live Ranking Dashboard</span>
                </li>
              </ul>
            </div>
            <Link
              href="/contact-us"
              className="mt-8 block text-center py-3.5 rounded-[4px] bg-white/5 hover:bg-white/10 text-white font-bebas text-sm tracking-[0.16em] border border-white/15 transition-all uppercase"
            >
              CUSTOM ENTERPRISE BRIEF →
            </Link>
          </div>
        </div>
      </section>

      {/* 5. FAQ SECTION (Modern Industrial Elegance) */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 md:px-12 bg-[#07030d] text-white overflow-hidden border-t border-white/10 bg-grid-white-240">
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Pill Tag */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-[4px] bg-white/5 border border-white/10 text-[#681fe4] text-xs font-bebas tracking-[0.2em] uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-[#681fe4] animate-pulse" />
            <span>FAQ // QUICK ANSWERS</span>
          </div>

          <h2 className="font-bebas text-3xl sm:text-5xl md:text-6xl text-white tracking-[0.16em] uppercase mb-4 leading-none">
            FREQUENTLY ASKED QUESTIONS
          </h2>

          <p className="font-satoshi text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto mb-12 leading-relaxed font-normal">
            Find answers to the most common questions about Balaji Prime Media&apos;s guest posting platforms, editorial rules, lifetime warranties, and link building deliverables.
          </p>

          {/* 4 Category Filter Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto mb-12 text-left font-satoshi">
            {categoryCards.map((card) => {
              const isSelected = selectedCategory === card.key;
              return (
                <button
                  type="button"
                  key={card.key}
                  onClick={() => setSelectedCategory(isSelected ? null : card.key)}
                  className={`group relative flex items-center gap-4 p-4 rounded-[4px] border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "border-[#681fe4] bg-[#681fe4]/10 shadow-[0_0_20px_rgba(104,31,228,0.2)]"
                      : "bg-[#0c0818] border-white/10 hover:border-white/25"
                  }`}
                >
                  {/* Icon Box */}
                  <div
                    className={`w-11 h-11 rounded-[4px] flex items-center justify-center shrink-0 border transition-all ${
                      isSelected
                        ? "bg-[#681fe4] border-[#681fe4] text-white"
                        : "bg-white/5 border-white/10 text-[#681fe4]"
                    }`}
                  >
                    {card.icon}
                  </div>

                  {/* Card Info */}
                  <div className="flex flex-col">
                    <span className="font-bebas text-base sm:text-lg tracking-[0.14em] text-white group-hover:text-[#681fe4] transition-colors leading-tight uppercase">
                      {card.title}
                    </span>
                    <span className="text-xs text-neutral-400 font-normal mt-0.5 flex items-center gap-2">
                      <span>{card.articles}</span>
                      {isSelected && (
                        <span className="text-[10px] text-white font-bebas tracking-[0.16em] uppercase bg-[#681fe4] px-2 py-0.5 rounded-[2px]">
                          ACTIVE FILTER
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
            <div className="flex items-center justify-center gap-3 mb-8 text-xs font-mono">
              <span className="text-neutral-400">
                FILTER: <span className="text-white uppercase font-bold">{selectedCategory}</span>
              </span>
              <button
                type="button"
                onClick={() => setSelectedCategory(null)}
                className="text-[#681fe4] hover:text-white underline cursor-pointer"
              >
                Clear Filter
              </button>
            </div>
          )}

          {/* Accordion Rows */}
          <div className="max-w-3xl mx-auto space-y-3.5 text-left font-satoshi">
            {filteredFaqs.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-[4px] transition-all duration-200 border overflow-hidden ${
                    isOpen
                      ? "bg-[#0c0818] border-[#681fe4]"
                      : "bg-[#0c0818] border-white/10 hover:border-white/20"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full min-h-[60px] px-6 py-4.5 text-left flex items-center justify-between gap-4 cursor-pointer select-none"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`font-semibold text-sm sm:text-base transition-colors leading-snug ${
                        isOpen ? "text-[#681fe4]" : "text-white"
                      }`}
                    >
                      {faq.q}
                    </span>

                    {/* Expand Indicator */}
                    <span
                      className={`w-7 h-7 rounded-[2px] flex items-center justify-center shrink-0 text-sm font-mono font-bold transition-all ${
                        isOpen
                          ? "bg-[#681fe4] text-white"
                          : "bg-white/5 text-neutral-400"
                      }`}
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-0 border-t border-white/5 text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
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
