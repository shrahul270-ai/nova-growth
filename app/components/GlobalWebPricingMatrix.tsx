"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Globe,
  Sparkles,
  CheckCircle2,
  Lightbulb,
  Scale,
  Rocket,
  Wrench,
  Target,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

interface GlobalWebPricingMatrixProps {
  onOpenConsultation?: (plan?: string) => void;
}

export default function GlobalWebPricingMatrix({
  onOpenConsultation,
}: GlobalWebPricingMatrixProps) {
  const [selectedCountry, setSelectedCountry] = useState<string>("All");

  const pricingData = [
    {
      country: "India",
      flag: "🇮🇳",
      basicWebsite: "₹5,000 – ₹15,000",
      ecommerceWebsite: "₹20,000 – ₹80,000",
      hourlyFee: "₹500 – ₹2,000",
      popular: false,
    },
    {
      country: "USA",
      flag: "🇺🇸",
      basicWebsite: "₹40,000 – ₹1,00,000",
      ecommerceWebsite: "₹1.5 Lakh – ₹5 Lakh",
      hourlyFee: "₹2,000 – ₹8,500",
      popular: true,
    },
    {
      country: "UK",
      flag: "🇬🇧",
      basicWebsite: "₹35,000 – ₹90,000",
      ecommerceWebsite: "₹1.2 Lakh – ₹4 Lakh",
      hourlyFee: "₹2,000 – ₹7,500",
      popular: true,
    },
    {
      country: "Canada",
      flag: "🇨🇦",
      basicWebsite: "₹35,000 – ₹85,000",
      ecommerceWebsite: "₹1 Lakh – ₹4 Lakh",
      hourlyFee: "₹1,800 – ₹6,500",
      popular: false,
    },
    {
      country: "Australia",
      flag: "🇦🇺",
      basicWebsite: "₹40,000 – ₹1,00,000",
      ecommerceWebsite: "₹1.5 Lakh – ₹5 Lakh",
      hourlyFee: "₹2,000 – ₹8,000",
      popular: false,
    },
    {
      country: "UAE",
      flag: "🇦🇪",
      basicWebsite: "₹25,000 – ₹75,000",
      ecommerceWebsite: "₹80,000 – ₹3 Lakh",
      hourlyFee: "₹1,500 – ₹5,000",
      popular: false,
    },
  ];

  const quickComparison = [
    { country: "India", flag: "🇮🇳", avgWebsite: "₹5k – ₹15k", avgEcommerce: "₹20k – ₹80k" },
    { country: "USA", flag: "🇺🇸", avgWebsite: "₹40k – ₹1L", avgEcommerce: "₹1.5L – ₹5L" },
    { country: "UK", flag: "🇬🇧", avgWebsite: "₹35k – ₹90k", avgEcommerce: "₹1.2L – ₹4L" },
    { country: "Canada", flag: "🇨🇦", avgWebsite: "₹35k – ₹85k", avgEcommerce: "₹1L – ₹4L" },
    { country: "Australia", flag: "🇦🇺", avgWebsite: "₹40k – ₹1L", avgEcommerce: "₹1.5L – ₹5L" },
    { country: "UAE", flag: "🇦🇪", avgWebsite: "₹25k – ₹75k", avgEcommerce: "₹80k – ₹3L" },
  ];

  const developmentTypes = [
    "Basic Website (Business / Portfolio)",
    "Login / Registration System",
    "Student Management System",
    "E-commerce Website",
    "Complete Business Software",
    "Custom Web Application",
  ];

  const keyPoints = [
    "India mein PHP development sabse economical option hai.",
    "Foreign clients ke liye same project ki higher pricing possible hai.",
    "Features, design, security aur experience ke hisaab se cost badh sakti hai.",
    "Regular maintenance aur support alag se charge hota hai.",
  ];

  const tipsForDevelopers = [
    "Modern technologies use karo (PHP 8+, Laravel).",
    "Good UI/UX design provide karo.",
    "Security aur performance par dhyan do.",
    "On-time delivery aur support do.",
  ];

  const goals = [
    "India ke clients ke liye PHP applications banana.",
    "USA, UK, Canada jaise countries se projects lena.",
    "Outsourcing business shuru karke global market me apni pehchan banana.",
  ];

  const filteredPricing =
    selectedCountry === "All"
      ? pricingData
      : pricingData.filter((item) => item.country === selectedCountry);

  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 md:px-12 z-10 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/60 border border-blue-500/30 text-xs font-semibold text-blue-300 mb-4 backdrop-blur-md">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>Global Market Comparison &amp; Scope</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Build Your Website / Web Application{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              Globally with PHP
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Country-wise approximate development costs, hourly rates, and outsourcing scope across major global markets.
          </p>
        </div>

        {/* 1. MAIN GLOBAL PRICING TABLE */}
        <div className="relative rounded-3xl overflow-hidden border border-blue-500/30 bg-gradient-to-b from-[#0c1029]/95 via-[#080b1c]/95 to-[#04060e]/95 backdrop-blur-xl shadow-2xl mb-12">
          {/* Ambient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-blue-500/10 blur-3xl pointer-events-none" />

          {/* Table Header Filter (Mobile / Desktop Quick Select) */}
          <div className="p-4 sm:p-6 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 bg-white/[0.02]">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Global Country-Wise Development Rates</span>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
              <button
                onClick={() => setSelectedCountry("All")}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  selectedCountry === "All"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
                    : "bg-white/5 text-slate-300 hover:bg-white/10"
                }`}
              >
                All Countries
              </button>
              {pricingData.map((p) => (
                <button
                  key={p.country}
                  onClick={() => setSelectedCountry(p.country)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                    selectedCountry === p.country
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
                      : "bg-white/5 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  <span>{p.flag}</span>
                  <span>{p.country}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[680px]">
              <thead>
                <tr className="border-b border-white/10 bg-blue-950/40 text-[13px] font-bold text-cyan-300 uppercase tracking-wider">
                  <th className="py-4 px-6">Country</th>
                  <th className="py-4 px-6">Basic Website (Approx.)</th>
                  <th className="py-4 px-6">E-commerce Website (Approx.)</th>
                  <th className="py-4 px-6">Hourly Fee (Approx.)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {filteredPricing.map((item, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-white/[0.04] transition-colors group"
                  >
                    <td className="py-4 px-6 font-bold text-white flex items-center gap-2.5">
                      <span className="text-xl">{item.flag}</span>
                      <span>{item.country}</span>
                      {item.popular && (
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                          High Demand
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 font-semibold text-slate-200">
                      <span className="text-emerald-400 font-bold">{item.basicWebsite}</span>
                    </td>
                    <td className="py-4 px-6 font-semibold text-slate-200">
                      <span className="text-amber-400 font-bold">{item.ecommerceWebsite}</span>
                    </td>
                    <td className="py-4 px-6 font-semibold text-slate-300">
                      <span className="text-cyan-300 font-bold">{item.hourlyFee}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. GRID OF DETAILED SCOPE, COMPARISON & OPPORTUNITY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Card 1: Popular Development Types */}
          <div className="rounded-2xl p-6 bg-gradient-to-b from-[#0f1738]/90 to-[#0a0e24]/90 border border-blue-500/25 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base mb-4 pb-2 border-b border-white/10">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>Popular Development Types</span>
              </div>
              <ul className="space-y-3">
                {developmentTypes.map((type, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                    <span>{type}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card 2: Key Points to Remember */}
          <div className="rounded-2xl p-6 bg-gradient-to-b from-[#131138]/90 to-[#0a0824]/90 border border-purple-500/25 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-amber-300 font-bold text-base mb-4 pb-2 border-b border-white/10">
                <Lightbulb className="w-5 h-5 text-amber-400" />
                <span>Key Points to Remember</span>
              </div>
              <ul className="space-y-3">
                {keyPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card 3: India vs Other Countries – Quick Comparison */}
          <div className="rounded-2xl p-6 bg-gradient-to-b from-[#0e172e]/90 to-[#060b17]/90 border border-cyan-500/25 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-cyan-300 font-bold text-base mb-4 pb-2 border-b border-white/10">
                <Scale className="w-5 h-5 text-cyan-400" />
                <span>India vs Other Countries – Quick Comparison</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="text-slate-400 border-b border-white/10 pb-1">
                      <th className="py-1.5">Country</th>
                      <th className="py-1.5">Avg. Website</th>
                      <th className="py-1.5">Avg. E-commerce</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {quickComparison.map((c, i) => (
                      <tr key={i} className="hover:bg-white/[0.02]">
                        <td className="py-1.5 font-bold text-white flex items-center gap-1.5">
                          <span>{c.flag}</span>
                          <span>{c.country}</span>
                        </td>
                        <td className="py-1.5 text-emerald-400 font-semibold">{c.avgWebsite}</td>
                        <td className="py-1.5 text-amber-400 font-semibold">{c.avgEcommerce}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Card 4: Business Opportunity */}
          <div className="rounded-2xl p-6 bg-gradient-to-b from-[#1c130d]/90 to-[#0e0a06]/90 border border-amber-500/30 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base mb-3 pb-2 border-b border-white/10">
                <Rocket className="w-5 h-5 text-amber-400" />
                <span>Business Opportunity</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                Agar aap Jaipur ya India se PHP development start karte hain, to foreign clients ke projects lekar achha profit kama sakte hain.
              </p>
              
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30">
                <div className="text-xs font-bold text-amber-300 mb-2 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Example Profit Model:</span>
                </div>
                <div className="space-y-1.5 text-xs text-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Indian Client Project :</span>
                    </span>
                    <span className="font-bold text-emerald-400">₹20,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>Foreign Client Project :</span>
                    </span>
                    <span className="font-bold text-amber-300">₹50,000 – ₹1,00,000 <span className="text-[10px] text-amber-400/80">(Possible)</span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 5: Tips for Developers */}
          <div className="rounded-2xl p-6 bg-gradient-to-b from-[#0f1f1d]/90 to-[#071211]/90 border border-emerald-500/25 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-base mb-4 pb-2 border-b border-white/10">
                <Wrench className="w-5 h-5 text-emerald-400" />
                <span>Tips for Developers</span>
              </div>
              <ul className="space-y-3">
                {tipsForDevelopers.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card 6: Your Goal */}
          <div className="rounded-2xl p-6 bg-gradient-to-b from-[#180f2e]/90 to-[#0c081a]/90 border border-purple-500/30 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center gap-2 text-purple-300 font-bold text-base mb-4 pb-2 border-b border-white/10">
                <Target className="w-5 h-5 text-purple-400" />
                <span>Your Goal</span>
              </div>
              <ol className="space-y-3">
                {goals.map((goal, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 font-bold text-xs shrink-0 border border-purple-500/40">
                      {i + 1}
                    </span>
                    <span>{goal}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Stamp Badge */}
            <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Global Vision</span>
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black text-xs shadow-md tracking-wider">
                Code Smart.. Grow Global..
              </span>
            </div>
          </div>
        </div>

        {/* CTA Bar */}
        <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-blue-900/40 via-purple-900/40 to-slate-900/40 border border-blue-500/30 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-lg sm:text-xl font-bold text-white">
              Ready to Build Your Website or Web Application?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Connect with Balaji Prime Media for high-speed PHP, Laravel &amp; Next.js engineering tailored for India and global markets.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {onOpenConsultation ? (
              <button
                onClick={() => onOpenConsultation("Website Development")}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-cyan-500/20 hover:scale-105 cursor-pointer flex items-center gap-2"
              >
                <span>Get Instant Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <Link
                href="/contact"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-cyan-500/20 hover:scale-105 cursor-pointer flex items-center gap-2"
              >
                <span>Get Instant Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
