"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GuestPostMarketplace from "../components/GuestPostMarketplace";

const faqs = [
  {
    q: "Are these links permanent?",
    a: "Yes. All placements are guaranteed for life. If any link drops within 12 months, we replace it with equal or higher DR publication for free.",
  },
  {
    q: "Can I pre-approve the websites before publishing?",
    a: "Absolutely. We provide a curated shortlist matching your topical niche. We only draft and place after your explicit approval.",
  },
  {
    q: "Are these backlinks 100% Do-Follow & Indexed?",
    a: "Yes. Every placement is guaranteed 100% contextual Do-Follow, placed naturally inside native 1,000+ word articles, and covered by our Google indexation warranty.",
  },
  {
    q: "How fast do guest post links go live?",
    a: "Most placements go live within 7 to 14 business days, depending on publication editorial calendars. You receive live URL confirmation as soon as it is indexed.",
  },
  {
    q: "Can I choose my own anchor texts and target URLs?",
    a: "Yes, you have complete editorial control over anchor texts and target landing pages to align with your exact SEO ranking strategy.",
  },
];

export default function GuestPostingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-white selection:bg-amber-500 selection:text-black">
      <Navbar activePage="guest-posting" />

      {/* 1. Hero Section */}
      <section className="relative pt-6 pb-8 sm:pt-12 sm:pb-10 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto text-center">
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

      {/* FAQ Dropdown Accordion Section */}
      <section className="py-10 sm:py-12 px-4 sm:px-6 md:px-12 max-w-4xl mx-auto border-t border-gray-800/80">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[11px] font-bold text-amber-400 mb-2">
            <span>❓</span> Quick Answers
          </div>
          <h2 className="text-xl sm:text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
          <p className="text-xs text-gray-400 mt-1">Click on any question to view the answer</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className={`rounded-2xl transition-all duration-200 border overflow-hidden ${
                  isOpen
                    ? "bg-[#0c1424] border-amber-500/50 shadow-lg shadow-amber-500/5"
                    : "bg-[#0b1220] border-gray-800 hover:border-gray-700 hover:bg-[#0e1628]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer select-none"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`font-bold text-xs sm:text-sm transition-colors ${
                      isOpen ? "text-amber-400" : "text-white"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <span
                    className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-200 ${
                      isOpen
                        ? "bg-amber-500 text-black border-amber-400 rotate-180"
                        : "bg-gray-800/80 text-gray-400 border-gray-700"
                    }`}
                  >
                    <svg
                      className="w-3.5 h-3.5 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-gray-800/60 animate-in fade-in duration-150">
                    <p className="pt-3">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}
