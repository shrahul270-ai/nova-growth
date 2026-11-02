"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GuestPostMarketplace from "../components/GuestPostMarketplace";
import HeaderBackgroundAnimation from "../components/HeaderBackgroundAnimation";

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
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    key: "approval",
    title: "Editorial Rules & Approval",
    articles: "24 Articles",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    key: "delivery",
    title: "Turnaround & Speed",
    articles: "18 Articles",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    key: "pricing",
    title: "Pricing & Retainers",
    articles: "16 Articles",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
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
    <div className="min-h-screen bg-[#070b14] text-white selection:bg-amber-500 selection:text-black">
      <Navbar activePage="guest-posting" />

      {/* 1. Hero Section with Full-Width Animated Header Background */}
      <section className="relative w-full pt-8 pb-10 sm:pt-14 sm:pb-12 px-4 sm:px-6 md:px-12 text-center overflow-hidden">
        <HeaderBackgroundAnimation variant="dark" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-400 mb-4 badge-3d">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Curated White-Hat Editorial Links
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] mb-4 sm:mb-5">
            Authority Guest Posts on <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">
              Real DR 50–90+ Publications
            </span>
          </h1>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed font-normal">
            Zero PBNs. Zero spam farms. Pure in-content editorial backlinks that drive topical authority, pass link juice, and survive every Google core update.
          </p>

          {/* Feature Pill Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
            <div className="p-3 sm:p-3.5 rounded-2xl bg-[#0b1220] border border-gray-800 card-3d">
              <div className="text-amber-400 font-bold text-base sm:text-lg">100%</div>
              <div className="text-[11px] sm:text-xs text-gray-400">Do-Follow Guaranteed</div>
            </div>
            <div className="p-3 sm:p-3.5 rounded-2xl bg-[#0b1220] border border-gray-800 card-3d">
              <div className="text-amber-400 font-bold text-base sm:text-lg">DR 50–90+</div>
              <div className="text-[11px] sm:text-xs text-gray-400">Ahrefs Verified Authority</div>
            </div>
            <div className="p-3 sm:p-3.5 rounded-2xl bg-[#0b1220] border border-gray-800 card-3d">
              <div className="text-amber-400 font-bold text-base sm:text-lg">Real Traffic</div>
              <div className="text-[11px] sm:text-xs text-gray-400">Minimum 10k+ Monthly Visits</div>
            </div>
            <div className="p-3 sm:p-3.5 rounded-2xl bg-[#0b1220] border border-gray-800 card-3d">
              <div className="text-amber-400 font-bold text-base sm:text-lg">Editorial Native</div>
              <div className="text-[11px] sm:text-xs text-gray-400">Handwritten by Native Writers</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Advanced 40,000+ Publisher Inventory & Filtering Marketplace Section */}
      <GuestPostMarketplace />

      {/* Packages / Pricing Tier */}
      <section className="py-10 sm:py-14 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto border-t border-gray-800/80">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-4xl font-black">Transparent Link Building Tiers</h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-1.5">All tiers include professional content drafting, manual outreach, and placement guarantee</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Starter Pack */}
          <div className="p-8 rounded-3xl bg-[#0b1220] border border-gray-800 flex flex-col justify-between card-3d">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase">Starter Pack</span>
              <div className="text-4xl font-black text-white mt-3 mb-1">$750</div>
              <p className="text-xs text-gray-500 mb-6">Perfect for niche websites and initial keyword tests</p>
              <ul className="space-y-3 text-xs text-gray-300">
                <li className="flex items-center gap-2">✓ <strong>3 Editorial Placements</strong></li>
                <li className="flex items-center gap-2">✓ Domain Rating <strong>DR 50–65+</strong></li>
                <li className="flex items-center gap-2">✓ 1,000+ Word Native Articles</li>
                <li className="flex items-center gap-2">✓ 100% Do-Follow &amp; Indexed</li>
              </ul>
            </div>
            <a href="/contact" className="btn-3d mt-8 block text-center py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-bold text-xs transition-colors">
              Order Starter Pack →
            </a>
          </div>

          {/* Growth Pack (Featured) */}
          <div className="p-8 rounded-3xl bg-[#0d1627] border-2 border-amber-500 shadow-xl shadow-amber-500/10 flex flex-col justify-between relative card-3d">
            <span className="absolute -top-3.5 right-6 px-3 py-1 bg-amber-500 text-black text-[10px] font-black uppercase rounded-full">
              Most Popular
            </span>
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase">Authority Growth</span>
              <div className="text-4xl font-black text-white mt-3 mb-1">$1,650</div>
              <p className="text-xs text-gray-400 mb-6">Designed for scaleups competing in high-CPC niches</p>
              <ul className="space-y-3 text-xs text-gray-300">
                <li className="flex items-center gap-2">✓ <strong>7 Editorial Placements</strong></li>
                <li className="flex items-center gap-2">✓ Domain Rating <strong>DR 65–80+</strong></li>
                <li className="flex items-center gap-2">✓ 1,200+ Word In-Depth Articles</li>
                <li className="flex items-center gap-2">✓ Custom Anchor Text Strategy</li>
                <li className="flex items-center gap-2">✓ Permanent Placement Warranty</li>
              </ul>
            </div>
            <a href="/contact" className="btn-gold-3d mt-8 block text-center py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-xs transition-all shadow-md">
              Order Growth Pack →
            </a>
          </div>

          {/* Enterprise Pack */}
          <div className="p-8 rounded-3xl bg-[#0b1220] border border-gray-800 flex flex-col justify-between card-3d">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase">Enterprise Scale</span>
              <div className="text-4xl font-black text-white mt-3 mb-1">$3,500</div>
              <p className="text-xs text-gray-500 mb-6">Full authority takeover with tier-1 media mentions</p>
              <ul className="space-y-3 text-xs text-gray-300">
                <li className="flex items-center gap-2">✓ <strong>15 High-Authority Links</strong></li>
                <li className="flex items-center gap-2">✓ Domain Rating <strong>DR 75–90+</strong></li>
                <li className="flex items-center gap-2">✓ Forbes/TechCrunch Tier Outreach</li>
                <li className="flex items-center gap-2">✓ Dedicated Outreach Strategist</li>
                <li className="flex items-center gap-2">✓ Monthly Live Ranking Dashboard</li>
              </ul>
            </div>
            <a href="/contact" className="btn-3d mt-8 block text-center py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-bold text-xs transition-colors">
              Custom Enterprise Brief →
            </a>
          </div>
        </div>
      </section>

      {/* ZENTRADE PREMIUM FAQ SECTION (With Website's Native Amber / Midnight Theme) */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 md:px-12 bg-[#090909] text-white overflow-hidden border-t border-[#221B14] font-['Figtree',sans-serif]">
        
        {/* Stepped Ambient Light Bars & Central Warm Glow */}
        <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-[500px] pointer-events-none select-none overflow-hidden z-0">
          {/* Central Radial Amber Glow */}
          <div className="absolute top-[90px] left-1/2 -translate-x-1/2 w-[740px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(217,119,6,0.14)_0%,rgba(9,9,9,0)_70%)] pointer-events-none" />

          {/* Top Faint Amber Light Spill */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#F0A24C]/40 to-transparent" />

          {/* Left Stepped Vertical Light Bars (5 stepped bars) */}
          <div className="hidden lg:flex absolute top-0 left-8 xl:left-24 gap-4 items-start opacity-70">
            <div className="w-16 h-[380px] bg-gradient-to-b from-[#7A4210]/40 via-[#3D2008]/20 to-transparent rounded-b-xl" />
            <div className="w-16 h-[310px] bg-gradient-to-b from-[#7A4210]/35 via-[#3D2008]/15 to-transparent rounded-b-xl" />
            <div className="w-16 h-[245px] bg-gradient-to-b from-[#7A4210]/30 via-[#3D2008]/10 to-transparent rounded-b-xl" />
            <div className="w-16 h-[180px] bg-gradient-to-b from-[#7A4210]/25 via-[#3D2008]/8 to-transparent rounded-b-xl" />
            <div className="w-16 h-[120px] bg-gradient-to-b from-[#7A4210]/20 to-transparent rounded-b-xl" />
          </div>

          {/* Right Stepped Vertical Light Bars (5 stepped bars) */}
          <div className="hidden lg:flex absolute top-0 right-8 xl:right-24 gap-4 items-start opacity-70">
            <div className="w-16 h-[120px] bg-gradient-to-b from-[#7A4210]/20 to-transparent rounded-b-xl" />
            <div className="w-16 h-[180px] bg-gradient-to-b from-[#7A4210]/25 via-[#3D2008]/8 to-transparent rounded-b-xl" />
            <div className="w-16 h-[245px] bg-gradient-to-b from-[#7A4210]/30 via-[#3D2008]/10 to-transparent rounded-b-xl" />
            <div className="w-16 h-[310px] bg-gradient-to-b from-[#7A4210]/35 via-[#3D2008]/15 to-transparent rounded-b-xl" />
            <div className="w-16 h-[380px] bg-gradient-to-b from-[#7A4210]/40 via-[#3D2008]/20 to-transparent rounded-b-xl" />
          </div>
        </div>

        {/* FAQ Centered Content Column (Max Width 1224px reference) */}
        <div className="relative z-10 max-w-[1224px] mx-auto text-center">
          
          {/* Tag: Green/Amber tinted glass pill */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1D1510]/80 border border-[#F0A24C]/40 text-[#F0A24C] text-xs font-bold tracking-widest uppercase mb-5 backdrop-blur-md shadow-[0_0_16px_rgba(240,162,76,0.2)]">
            <span className="w-2 h-2 rounded-full bg-[#F0A24C] animate-pulse" />
            <span>FAQ • Quick Answers</span>
          </div>

          {/* Big Bold Headline: Figtree 800 */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-[800] tracking-tight text-white mb-4 leading-[1.12]">
            Frequently Asked Questions
          </h2>

          {/* Lede: Two lines */}
          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto mb-7 leading-relaxed font-normal">
            Find answers to the most common questions about Balaji Prime Media&apos;s guest posting platforms, editorial rules, lifetime warranties, and link building deliverables.
          </p>

          {/* Action Button: White Community / Brief Button */}
          <div className="mb-14">
            <a
              href="/contact"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-[11px] bg-white text-[#0B2400] hover:bg-neutral-100 font-bold text-sm tracking-tight transition-all duration-200 hover:-translate-y-0.5 shadow-xl hover:shadow-[0_0_24px_rgba(255,255,255,0.4)]"
            >
              <span>Schedule Strategy Call</span>
              <span className="text-base">→</span>
            </a>
          </div>

          {/* Glass Search Bar: 74px tall, Lexend 300 font */}
          <div className="max-w-[880px] mx-auto mb-12">
            <div className="relative flex items-center h-[68px] sm:h-[74px] rounded-full bg-white/[0.04] backdrop-blur-[24px] border border-white/15 px-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)] focus-within:border-[#F0A24C] focus-within:ring-2 focus-within:ring-[#F0A24C]/30 transition-all">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-[#F0A24C] shrink-0 mr-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for your queries (e.g. Do-Follow, Indexing, Permanent, Pricing)..."
                className="w-full bg-transparent text-white placeholder-white/40 text-sm sm:text-base font-['Lexend',sans-serif] font-[300] outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-xs text-white/50 hover:text-white px-2 py-1 rounded bg-white/10"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* 4 Pill-Shaped Category Cards (2×2 Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 max-w-[1040px] mx-auto mb-14 text-left">
            {categoryCards.map((card) => {
              const isSelected = selectedCategory === card.key;
              return (
                <button
                  type="button"
                  key={card.key}
                  onClick={() => setSelectedCategory(isSelected ? null : card.key)}
                  className={`group relative flex items-center gap-4 sm:gap-5 p-4 sm:p-5 rounded-full bg-[#1B1B1B] border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "border-[#F0A24C] shadow-[0_0_24px_rgba(240,162,76,0.3)] bg-[#221c17]"
                      : "border-[#2F2F2F] hover:border-[#F0A24C]/60 hover:shadow-[0_0_20px_rgba(240,162,76,0.18)]"
                  }`}
                >
                  {/* Round Icon Disc */}
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                    isSelected
                      ? "bg-[#F0A24C] border-[#F0A24C] text-black shadow-md"
                      : "bg-[#232323] border-white/10 text-white group-hover:border-[#F0A24C]/40 group-hover:scale-105"
                  }`}>
                    {card.icon}
                  </div>

                  {/* Card Info */}
                  <div className="flex flex-col">
                    <span className="font-['Figtree',sans-serif] font-[500] text-sm sm:text-[17px] text-white group-hover:text-[#F0A24C] transition-colors leading-tight">
                      {card.title}
                    </span>
                    <span className="text-xs sm:text-[13.5px] text-white/60 font-normal mt-1 flex items-center gap-1.5">
                      <span>{card.articles}</span>
                      {isSelected && (
                        <span className="text-[10px] text-[#F0A24C] font-bold uppercase tracking-wider bg-[#F0A24C]/15 px-2 py-0.5 rounded-full">
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
          {(selectedCategory || searchQuery) && (
            <div className="flex items-center justify-center gap-3 mb-8">
              <span className="text-xs text-white/60">
                Showing results for {selectedCategory ? `category: ${selectedCategory}` : ""} {searchQuery ? `"${searchQuery}"` : ""}
              </span>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory(null);
                  setSearchQuery("");
                }}
                className="text-xs text-[#F0A24C] hover:underline font-semibold"
              >
                Reset filters
              </button>
            </div>
          )}

          {/* Accordion Rows: Smooth One-at-a-Time Expansion */}
          <div className="max-w-[1040px] mx-auto space-y-4 text-left">
            {filteredFaqs.length === 0 ? (
              <div className="p-12 rounded-3xl bg-[#131313] border border-[#2F2F2F] text-center space-y-3">
                <span className="text-3xl">🔍</span>
                <p className="text-base text-white/80 font-medium">No questions match your search.</p>
                <p className="text-xs text-white/50">Try different keywords like &quot;permanent&quot;, &quot;approval&quot;, or &quot;guarantee&quot;.</p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory(null);
                  }}
                  className="mt-3 px-4 py-2 rounded-xl bg-[#F0A24C] text-black font-bold text-xs"
                >
                  View All Questions
                </button>
              </div>
            ) : (
              filteredFaqs.map((faq) => {
                const isOpen = openFaq === faq.id;
                return (
                  <div
                    key={faq.id}
                    className={`rounded-[14px] sm:rounded-[18px] transition-all duration-300 border overflow-hidden ${
                      isOpen
                        ? "bg-[#161616] border-[#F0A24C]/50 shadow-[0_8px_24px_rgba(240,162,76,0.12)]"
                        : "bg-[#131313] border-[#2F2F2F] hover:border-white/20 hover:bg-[#181818]"
                    }`}
                  >
                    {/* Question Button (Min 82px tall equivalent) */}
                    <button
                      type="button"
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full min-h-[70px] sm:min-h-[82px] p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer select-none"
                      aria-expanded={isOpen}
                    >
                      <span
                        className={`font-['Figtree',sans-serif] font-[500] text-sm sm:text-lg transition-colors leading-snug ${
                          isOpen ? "text-[#F0A24C]" : "text-white"
                        }`}
                      >
                        {faq.q}
                      </span>

                      {/* Thin Circular Rotating Chevron */}
                      <span
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                          isOpen
                            ? "bg-[#F0A24C] text-[#0B2400] border-[#F0A24C] rotate-180 shadow-md"
                            : "bg-[#1E1E1E] text-white/70 border-white/10 group-hover:border-white/30"
                        }`}
                      >
                        <svg
                          className="w-4 h-4 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth="2.2"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </button>

                    {/* Smooth Accordion Body with Thin Rule */}
                    {isOpen && (
                      <div className="px-5 pb-6 sm:px-6 sm:pb-7 pt-0 border-t border-[#2F2F2F] animate-in fade-in duration-200">
                        <p className="pt-4 text-xs sm:text-[15px] text-white/80 leading-relaxed font-normal">
                          {faq.a}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

        </div>

      </section>

      <Footer />
    </div>
  );
}
