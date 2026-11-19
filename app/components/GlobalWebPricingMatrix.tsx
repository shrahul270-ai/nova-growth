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
    <section className="relative py-16 sm:py-24 px-6 sm:px-12 z-10 font-satoshi">
      <div className="max-w-[1320px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] bg-white/[0.04] border border-white/10 font-mono text-xs uppercase tracking-[0.2em] text-[#681fe4] mb-3">
            <Globe className="w-3.5 h-3.5 text-[#681fe4]" />
            <span>// GLOBAL MARKET COMPARISON &amp; SCOPE</span>
          </div>

          <h2 className="font-bebas text-3xl sm:text-5xl md:text-6xl tracking-[0.14em] text-white uppercase leading-none">
            BUILD YOUR WEB APPLICATION{" "}
            <span className="text-[#681fe4]">GLOBALLY WITH PHP</span>
          </h2>
          <p className="font-satoshi text-xs sm:text-sm text-neutral-400 mt-3 leading-relaxed font-normal">
            Country-wise approximate development costs, hourly rates, and outsourcing scope across major global markets.
          </p>
        </div>

        {/* 1. MAIN GLOBAL PRICING TABLE */}
        <div className="relative rounded-[4px] overflow-hidden border border-white/10 bg-[#0c0818] shadow-2xl mb-12">
          {/* Table Header Filter (Mobile / Desktop Quick Select) */}
          <div className="p-4 sm:p-6 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 bg-white/[0.02]">
            <div className="flex items-center gap-2 font-bebas text-base tracking-[0.14em] uppercase text-white">
              <span className="w-2 h-2 rounded-[2px] bg-[#681fe4] animate-pulse" />
              <span>GLOBAL COUNTRY-WISE DEVELOPMENT RATES</span>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
              <button
                onClick={() => setSelectedCountry("All")}
                className={`px-3 py-1.5 rounded-[4px] font-bebas tracking-[0.14em] uppercase transition-all cursor-pointer ${
                  selectedCountry === "All"
                    ? "bg-[#681fe4] text-white shadow-[0_4px_14px_rgba(104,31,228,0.35)]"
                    : "bg-white/[0.04] text-neutral-400 hover:text-white border border-white/10"
                }`}
              >
                ALL COUNTRIES
              </button>
              {pricingData.map((p) => (
                <button
                  key={p.country}
                  onClick={() => setSelectedCountry(p.country)}
                  className={`px-3 py-1.5 rounded-[4px] font-bebas tracking-[0.14em] uppercase transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    selectedCountry === p.country
                      ? "bg-[#681fe4] text-white shadow-[0_4px_14px_rgba(104,31,228,0.35)]"
                      : "bg-white/[0.04] text-neutral-400 hover:text-white border border-white/10"
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
                <tr className="border-b border-white/10 bg-white/[0.02] font-bebas text-sm text-[#681fe4] uppercase tracking-[0.14em]">
                  <th className="py-4 px-6">Country</th>
                  <th className="py-4 px-6">Basic Website (Approx.)</th>
                  <th className="py-4 px-6">E-commerce Website (Approx.)</th>
                  <th className="py-4 px-6">Hourly Fee (Approx.)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs font-mono">
                {filteredPricing.map((item, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="py-4 px-6 font-bold text-white flex items-center gap-2.5">
                      <span className="text-xl">{item.flag}</span>
                      <span className="font-bebas text-base tracking-[0.12em] uppercase">{item.country}</span>
                      {item.popular && (
                        <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-[2px] bg-[#681fe4]/20 text-[#681fe4] border border-[#681fe4]/40">
                          High Demand
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-neutral-200">
                      <span className="text-white font-mono">{item.basicWebsite}</span>
                    </td>
                    <td className="py-4 px-6 text-neutral-200">
                      <span className="text-white font-mono">{item.ecommerceWebsite}</span>
                    </td>
                    <td className="py-4 px-6 text-neutral-300">
                      <span className="text-[#681fe4] font-mono">{item.hourlyFee}</span>
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
          <div className="rounded-[4px] p-8 bg-[#0c0818] border border-white/10 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-white font-bebas text-lg tracking-[0.14em] uppercase mb-4 pb-3 border-b border-white/10">
                <Sparkles className="w-4 h-4 text-[#681fe4]" />
                <span>POPULAR DEVELOPMENT TYPES</span>
              </div>
              <ul className="space-y-3">
                {developmentTypes.map((type, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-neutral-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#681fe4] mt-0.5 shrink-0" />
                    <span>{type}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card 2: Key Points to Remember */}
          <div className="rounded-[4px] p-8 bg-[#0c0818] border border-white/10 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-white font-bebas text-lg tracking-[0.14em] uppercase mb-4 pb-3 border-b border-white/10">
                <Lightbulb className="w-4 h-4 text-[#681fe4]" />
                <span>KEY POINTS TO REMEMBER</span>
              </div>
              <ul className="space-y-3">
                {keyPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-neutral-300 leading-relaxed font-normal">
                    <span className="w-1.5 h-1.5 rounded-[2px] bg-[#681fe4] mt-1.5 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card 3: India vs Other Countries – Quick Comparison */}
          <div className="rounded-[4px] p-8 bg-[#0c0818] border border-white/10 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-white font-bebas text-lg tracking-[0.14em] uppercase mb-4 pb-3 border-b border-white/10">
                <Scale className="w-4 h-4 text-[#681fe4]" />
                <span>INDIA VS OTHER COUNTRIES</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left font-mono">
                  <thead>
                    <tr className="text-neutral-500 border-b border-white/10 pb-1 font-bebas uppercase tracking-[0.1em]">
                      <th className="py-2">Country</th>
                      <th className="py-2">Avg. Website</th>
                      <th className="py-2">Avg. E-com</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {quickComparison.map((c, i) => (
                      <tr key={i} className="hover:bg-white/[0.02]">
                        <td className="py-2 font-medium text-white flex items-center gap-1.5">
                          <span>{c.flag}</span>
                          <span>{c.country}</span>
                        </td>
                        <td className="py-2 text-neutral-300">{c.avgWebsite}</td>
                        <td className="py-2 text-[#681fe4]">{c.avgEcommerce}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Card 4: Business Opportunity */}
          <div className="rounded-[4px] p-8 bg-[#0c0818] border border-white/10 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-white font-bebas text-lg tracking-[0.14em] uppercase mb-3 pb-3 border-b border-white/10">
                <Rocket className="w-4 h-4 text-[#681fe4]" />
                <span>BUSINESS OPPORTUNITY</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4 font-normal">
                Agar aap Jaipur ya India se PHP development start karte hain, to foreign clients ke projects lekar achha profit kama sakte hain.
              </p>
              
              <div className="p-4 rounded-[4px] bg-white/[0.02] border border-white/10">
                <div className="text-xs font-mono text-neutral-300 mb-2 flex items-center gap-1.5 uppercase">
                  <TrendingUp className="w-3.5 h-3.5 text-[#681fe4]" />
                  <span>EXAMPLE PROFIT MODEL:</span>
                </div>
                <div className="space-y-1.5 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400">Indian Client Project:</span>
                    <span className="font-bold text-white">₹20,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400">Foreign Client Project:</span>
                    <span className="font-bold text-[#681fe4]">₹50,000 – ₹1,00,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 5: Tips for Developers */}
          <div className="rounded-[4px] p-8 bg-[#0c0818] border border-white/10 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-white font-bebas text-lg tracking-[0.14em] uppercase mb-4 pb-3 border-b border-white/10">
                <Wrench className="w-4 h-4 text-[#681fe4]" />
                <span>TIPS FOR DEVELOPERS</span>
              </div>
              <ul className="space-y-3">
                {tipsForDevelopers.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-neutral-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#681fe4] mt-0.5 shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card 6: Your Goal */}
          <div className="rounded-[4px] p-8 bg-[#0c0818] border border-white/10 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center gap-2 text-white font-bebas text-lg tracking-[0.14em] uppercase mb-4 pb-3 border-b border-white/10">
                <Target className="w-4 h-4 text-[#681fe4]" />
                <span>YOUR GOAL</span>
              </div>
              <ol className="space-y-3">
                {goals.map((goal, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-neutral-300 font-normal">
                    <span className="flex items-center justify-center w-5 h-5 rounded-[2px] bg-white/[0.04] text-[#681fe4] font-mono font-bold text-xs shrink-0 border border-white/10">
                      {i + 1}
                    </span>
                    <span>{goal}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Stamp Badge */}
            <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] font-mono text-neutral-500 uppercase">Global Vision</span>
              <span className="px-3 py-1 rounded-[2px] bg-[#681fe4] text-white font-bebas text-xs tracking-[0.14em] uppercase shadow-md">
                CODE SMART.. GROW GLOBAL..
              </span>
            </div>
          </div>
        </div>

        {/* CTA Bar */}
        <div className="rounded-[4px] p-8 sm:p-10 bg-[#0c0818] border border-white/10 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <span className="font-bebas text-xs tracking-[0.2em] text-[#681fe4] uppercase block mb-1">
              // ARCHITECTURE SPRINT
            </span>
            <h4 className="font-bebas text-2xl sm:text-3xl tracking-[0.14em] uppercase text-white leading-none">
              READY TO BUILD YOUR WEB APPLICATION?
            </h4>
            <p className="font-satoshi text-xs sm:text-sm text-neutral-400 mt-2 font-normal">
              Connect with Balaji Prime Media for high-speed PHP, Laravel &amp; Next.js engineering tailored for India and global markets.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {onOpenConsultation ? (
              <button
                onClick={() => onOpenConsultation("Website Development")}
                className="px-6 py-3.5 rounded-[4px] bg-[#681fe4] hover:bg-[#5815cb] text-white font-bebas text-sm tracking-[0.16em] uppercase transition-all shadow-[0_10px_25px_rgba(104,31,228,0.35)] cursor-pointer flex items-center gap-2"
              >
                <span>GET INSTANT QUOTE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <Link
                href="/contact-us"
                className="px-6 py-3.5 rounded-[4px] bg-[#681fe4] hover:bg-[#5815cb] text-white font-bebas text-sm tracking-[0.16em] uppercase transition-all shadow-[0_10px_25px_rgba(104,31,228,0.35)] cursor-pointer flex items-center gap-2"
              >
                <span>GET INSTANT QUOTE</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
