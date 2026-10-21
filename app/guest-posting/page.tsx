"use client";

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GuestPostMarketplace from "../components/GuestPostMarketplace";

export default function GuestPostingPage() {
  return (
    <div className="min-h-screen bg-[#070b14] text-white selection:bg-amber-500 selection:text-black">
      <Navbar activePage="guest-posting" />

      {/* 1. Hero Section */}
      <section className="relative pt-20 pb-16 px-6 md:px-12 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-400 mb-6 badge-3d">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          Curated White-Hat Editorial Links
        </div>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.1] mb-6">
          Authority Guest Posts on <br />
          <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">
            Real DR 50–90+ Publications
          </span>
        </h1>
        <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Zero PBNs. Zero spam farms. Pure in-content editorial backlinks that drive topical authority, pass link juice, and survive every Google core update.
        </p>

        {/* Feature Pill Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="p-4 rounded-2xl bg-[#0b1220] border border-gray-800 card-3d">
            <div className="text-amber-400 font-bold text-lg">100%</div>
            <div className="text-xs text-gray-400">Do-Follow Guaranteed</div>
          </div>
          <div className="p-4 rounded-2xl bg-[#0b1220] border border-gray-800 card-3d">
            <div className="text-amber-400 font-bold text-lg">DR 50–90+</div>
            <div className="text-xs text-gray-400">Ahrefs Verified Authority</div>
          </div>
          <div className="p-4 rounded-2xl bg-[#0b1220] border border-gray-800 card-3d">
            <div className="text-amber-400 font-bold text-lg">Real Traffic</div>
            <div className="text-xs text-gray-400">Minimum 10k+ Monthly Visits</div>
          </div>
          <div className="p-4 rounded-2xl bg-[#0b1220] border border-gray-800 card-3d">
            <div className="text-amber-400 font-bold text-lg">Editorial Native</div>
            <div className="text-xs text-gray-400">Handwritten by Native Writers</div>
          </div>
        </div>
      </section>

      {/* 2. Advanced 40,000+ Publisher Inventory & Filtering Marketplace Section */}
      <GuestPostMarketplace />

      {/* Packages / Pricing Tier */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-gray-800/80">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-black">Transparent Link Building Tiers</h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-2">All tiers include professional content drafting, manual outreach, and placement guarantee</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

      {/* FAQ Accordion Section */}
      <section className="py-16 px-6 md:px-12 max-w-4xl mx-auto border-t border-gray-800/80">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
        <div className="space-y-4 text-xs sm:text-sm">
          <div className="p-5 rounded-2xl bg-[#0b1220] border border-gray-800 card-3d">
            <h3 className="font-bold text-white mb-2">Are these links permanent?</h3>
            <p className="text-gray-400 leading-relaxed">Yes. All placements are guaranteed for life. If any link drops within 12 months, we replace it with equal or higher DR for free.</p>
          </div>
          <div className="p-5 rounded-2xl bg-[#0b1220] border border-gray-800 card-3d">
            <h3 className="font-bold text-white mb-2">Can I pre-approve the websites before publishing?</h3>
            <p className="text-gray-400 leading-relaxed">Absolutely. We provide a curated shortlist matching your topical niche. We only draft and place after your explicit approval.</p>
          </div>
          <div className="p-5 rounded-2xl bg-[#0b1220] border border-gray-800 card-3d">
            <h3 className="font-bold text-white mb-2">What is the average turnaround time (TAT)?</h3>
            <p className="text-gray-400 leading-relaxed">Most placements go live within 7 to 14 business days, depending on publication editorial calendars.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}