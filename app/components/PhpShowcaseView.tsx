"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Server,
  Zap,
  ShieldCheck,
  Code2,
  Headphones,
  CheckCircle2,
  Database,
  Globe,
  ArrowRight,
  Sparkles,
  Cpu,
  Layers,
  Scale,
  Rocket,
  Wrench,
  Target,
  TrendingUp,
} from "lucide-react";

interface PhpShowcaseViewProps {
  onOpenConsultation?: (phpScope?: string) => void;
}

export default function PhpShowcaseView({
  onOpenConsultation,
}: PhpShowcaseViewProps) {
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
    { name: "Basic Website (Business / Portfolio)", desc: "High-speed business showcase & lead generation funnel." },
    { name: "Login / Registration System", desc: "Role-based authentication, password hashing & JWT security." },
    { name: "Student Management System", desc: "Attendance, fees, exams, grading & parent portal architecture." },
    { name: "E-commerce Website", desc: "Product catalog, multi-currency cart, payment gateways & orders." },
    { name: "Complete Business Software", desc: "Custom CRM, inventory tracking, invoice generation & audit logs." },
    { name: "Custom Web Application", desc: "Bespoke SaaS platform with custom database schemas & REST APIs." },
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

  const handleBook = (title: string) => {
    if (onOpenConsultation) {
      onOpenConsultation(`PHP Project: ${title}`);
    } else {
      const msg = encodeURIComponent(`Hi Balaji Prime Media, I am interested in Full-Stack PHP Development for: ${title}`);
      window.open(`https://wa.me/917690868932?text=${msg}`, "_blank");
    }
  };

  const filteredPricing =
    selectedCountry === "All"
      ? pricingData
      : pricingData.filter((item) => item.country === selectedCountry);

  return (
    <section className="relative py-14 sm:py-20 px-4 sm:px-6 md:px-12 z-10 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* 1. HERO BANNER */}
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 md:p-14 mb-14 border border-purple-500/30 bg-gradient-to-br from-[#12082b] via-[#09041a] to-[#04020d] shadow-2xl">
          {/* Ambient Lighting Orbs */}
          <div className="absolute top-0 right-0 w-[500px] h-[350px] bg-purple-500/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-indigo-500/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              {/* PHP Official Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/80 border border-purple-400/40 text-xs font-bold text-purple-300 mb-4 shadow-sm backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#A068FF] animate-ping" />
                <span>Build Your Website / Web Application Globally with PHP</span>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1] mb-4">
                Full Stack PHP Development <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-300">
                  Cost in India &amp; Other Countries
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mb-6">
                Enterprise PHP 8.3 &amp; Laravel backend architecture engineered with normalized MySQL/PostgreSQL databases, secure JWT/OAuth authentication, and sub-second execution speeds worldwide.
              </p>

              {/* 4 Feature Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                  <Zap className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                  <span className="text-xs font-bold text-white block">Fast Performance</span>
                  <span className="text-[10px] text-slate-400">PHP 8.3 JIT</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                  <Layers className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                  <span className="text-xs font-bold text-white block">Beautiful UI/UX</span>
                  <span className="text-[10px] text-slate-400">Tailwind + Blade</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                  <Code2 className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                  <span className="text-xs font-bold text-white block">Clean Code</span>
                  <span className="text-[10px] text-slate-400">Laravel MVC</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                  <Headphones className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                  <span className="text-xs font-bold text-white block">Ongoing Support</span>
                  <span className="text-[10px] text-slate-400">Server &amp; DB SLA</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleBook("Full Stack PHP Architecture")}
                  className="px-7 py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:brightness-110 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-xl shadow-purple-500/25 transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Start Your PHP Web Project</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="https://wa.me/917690868932?text=Hi%20Balaji%20Prime%20Media%2C%20I%20want%20a%20PHP%20Web%20Application%20estimate."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/20 text-white font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>💬 WhatsApp Fast Quote</span>
                </a>
              </div>
            </div>

            {/* Visual PHP Stack Code Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm rounded-[32px] p-5 bg-gradient-to-b from-[#1b123d] via-[#100926] to-[#070314] border-2 border-purple-400/40 shadow-[0_20px_60px_rgba(168,85,247,0.25)]">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500" />
                    <span className="w-3 h-3 rounded-full bg-amber-500" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-[11px] font-mono text-purple-300">server.php • Laravel 11</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#090518] border border-purple-500/20 text-center mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-600 mx-auto flex items-center justify-center text-2xl text-white font-black shadow-lg shadow-purple-500/30 mb-2 font-mono">
                    &lt;?php
                  </div>
                  <h3 className="text-base font-bold text-white">Full-Stack PHP Engine</h3>
                  <p className="text-[11px] text-purple-300 font-medium">Powers 77%+ of Global Web Applications</p>
                </div>

                <div className="space-y-2 mb-4 font-mono text-xs">
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                    <span className="text-slate-400">Framework</span>
                    <span className="text-purple-300 font-bold">Laravel MVC</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                    <span className="text-slate-400">Database Engine</span>
                    <span className="text-cyan-300 font-bold">MySQL / PostgreSQL</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                    <span className="text-slate-400">Security Layer</span>
                    <span className="text-emerald-400 font-bold">CSRF + Bcrypt + OAuth</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-gradient-to-r from-purple-600/30 to-blue-600/30 border border-purple-400/30 text-center">
                  <span className="text-[11px] font-semibold text-white">
                    Code Smart.. Grow Global..
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. WHAT IS FULL-STACK PHP & HOW IT WORKS */}
        <div className="mb-14 p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#11092e]/90 to-[#070317]/90 border border-purple-500/25 shadow-xl">
          <div className="flex items-center gap-2.5 text-purple-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Cpu className="w-4 h-4 text-purple-400" />
            <span>Complete Architecture Deep-Dive</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
            Full-Stack PHP Kya Kaam Karta Hai? (What is PHP &amp; Why It Powers the Web)
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8 max-w-4xl">
            PHP (Hypertext Preprocessor) duniya ki **sabse popular aur bharosemand server-side programming language** hai jo internet ki 77% websites ko power karti hai (jinme WordPress, Wikipedia, Slack, aur Canva shaamil hain). <br className="hidden sm:inline" />
            Full-Stack PHP me frontend, backend logic, aur relational database teeno ko ek sath seamlessly connect kiya jata hai:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
              <span className="text-2xl block mb-2">⚡</span>
              <h4 className="text-base font-bold text-white mb-2">Modern PHP 8+ &amp; JIT Speed</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Modern PHP 8+ me JIT (Just-In-Time) compiler aur OPcache shaamil hai, jisse dynamic web pages aur database queries milliseconds ke andar render hoti hain.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
              <span className="text-2xl block mb-2">🛡️</span>
              <h4 className="text-base font-bold text-white mb-2">Laravel MVC Architecture</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Model-View-Controller framework code ko maintainable banata hai. Built-in SQL injection prevention, CSRF tokens, aur secure session management deta hai.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
              <span className="text-2xl block mb-2">💰</span>
              <h4 className="text-base font-bold text-white mb-2">Highly Economical &amp; Scalable</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                PHP servers har hosting provider par saste daam me available hote hain. Zero expensive license fees, infinite horizontal scaling, aur easy maintenance.
              </p>
            </div>
          </div>
        </div>

        {/* 3. MAIN GLOBAL PRICING TABLE (COUNTRY-WISE) */}
        <div className="relative rounded-3xl overflow-hidden border border-purple-500/30 bg-gradient-to-b from-[#0f092b]/95 via-[#08041a]/95 to-[#04020f]/95 backdrop-blur-xl shadow-2xl mb-14">
          <div className="p-4 sm:p-6 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 bg-white/[0.02]">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span>Full Stack PHP Development Cost in India &amp; Other Countries</span>
            </div>

            {/* Country Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
              <button
                onClick={() => setSelectedCountry("All")}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  selectedCountry === "All"
                    ? "bg-purple-600 text-white shadow-md shadow-purple-500/30"
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
                      ? "bg-purple-600 text-white shadow-md shadow-purple-500/30"
                      : "bg-white/5 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  <span>{p.flag}</span>
                  <span>{p.country}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[680px]">
              <thead>
                <tr className="border-b border-white/10 bg-purple-950/40 text-[13px] font-bold text-purple-300 uppercase tracking-wider">
                  <th className="py-4 px-6">Country</th>
                  <th className="py-4 px-6">Basic Website (Approx.)</th>
                  <th className="py-4 px-6">E-commerce Website (Approx.)</th>
                  <th className="py-4 px-6">Hourly Fee (Approx.)</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {filteredPricing.map((item, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.04] transition-colors">
                    <td className="py-4 px-6 font-bold text-white flex items-center gap-2.5">
                      <span className="text-xl">{item.flag}</span>
                      <span>{item.country}</span>
                      {item.popular && (
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          High Demand
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 font-bold text-emerald-400">
                      {item.basicWebsite}
                    </td>
                    <td className="py-4 px-6 font-bold text-amber-400">
                      {item.ecommerceWebsite}
                    </td>
                    <td className="py-4 px-6 font-bold text-cyan-300">
                      {item.hourlyFee}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleBook(item.country)}
                        className="px-3.5 py-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600 text-purple-200 hover:text-white font-bold text-xs transition-all cursor-pointer"
                      >
                        Inquire →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. POPULAR DEVELOPMENT TYPES & CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {/* Card 1: Popular Development Types */}
          <div className="rounded-2xl p-6 bg-gradient-to-b from-[#140c33]/90 to-[#0a051d]/90 border border-purple-500/25 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base mb-4 pb-2 border-b border-white/10">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>Popular Development Types</span>
              </div>
              <ul className="space-y-3">
                {developmentTypes.map((type, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-white block">{type.name}</strong>
                      <span className="text-[11px] text-slate-400">{type.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card 2: Key Points to Remember */}
          <div className="rounded-2xl p-6 bg-gradient-to-b from-[#1a1138]/90 to-[#0c0824]/90 border border-purple-500/25 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-amber-300 font-bold text-base mb-4 pb-2 border-b border-white/10">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>Key Points to Remember</span>
              </div>
              <ul className="space-y-3.5">
                {keyPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 leading-relaxed">
                    <span className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card 3: India vs Other Countries – Quick Comparison */}
          <div className="rounded-2xl p-6 bg-gradient-to-b from-[#0f1733]/90 to-[#070c20]/90 border border-cyan-500/25 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-cyan-300 font-bold text-base mb-4 pb-2 border-b border-white/10">
                <Scale className="w-5 h-5 text-cyan-400" />
                <span>India vs Other Countries – Quick Comparison</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="text-slate-400 border-b border-white/10 pb-1">
                      <th className="py-2">Country</th>
                      <th className="py-2">Avg. Website</th>
                      <th className="py-2">Avg. E-commerce</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {quickComparison.map((c, i) => (
                      <tr key={i} className="hover:bg-white/[0.02]">
                        <td className="py-2 font-bold text-white flex items-center gap-1.5">
                          <span>{c.flag}</span>
                          <span>{c.country}</span>
                        </td>
                        <td className="py-2 text-emerald-400 font-bold">{c.avgWebsite}</td>
                        <td className="py-2 text-amber-400 font-bold">{c.avgEcommerce}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Card 4: Business Opportunity */}
          <div className="rounded-2xl p-6 bg-gradient-to-b from-[#21160b]/90 to-[#120b04]/90 border border-amber-500/30 shadow-xl flex flex-col justify-between">
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
          <div className="rounded-2xl p-6 bg-gradient-to-b from-[#0c1c1a]/90 to-[#061110]/90 border border-emerald-500/25 shadow-xl flex flex-col justify-between">
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
          <div className="rounded-2xl p-6 bg-gradient-to-b from-[#1a1033]/90 to-[#0d071d]/90 border border-purple-500/30 shadow-xl flex flex-col justify-between relative overflow-hidden">
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
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white font-black text-xs shadow-md tracking-wider">
                Code Smart.. Grow Global..
              </span>
            </div>
          </div>
        </div>

        {/* 5. BOTTOM DIRECT ACTION BANNER */}
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-purple-900/50 via-indigo-900/40 to-blue-900/50 border border-purple-400/30 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-3 tracking-tight">
              Ready to Build Your Full-Stack PHP Web Application?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mb-8 leading-relaxed">
              Connect with Balaji Prime Media for robust, scalable Laravel &amp; PHP engineering tailored for India, USA, UK, Canada, Australia, and UAE markets.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => handleBook("Consultation Call")}
                className="px-8 py-3.5 rounded-full bg-white hover:bg-neutral-100 text-black font-bold text-xs sm:text-sm shadow-xl hover:scale-105 transition-all cursor-pointer"
              >
                Request Free Architecture Proposal →
              </button>
              <a
                href="https://wa.me/917690868932?text=Hi%20Balaji%20Prime%20Media%2C%20let%27s%20discuss%20my%20PHP%20web%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-xs sm:text-sm transition-all cursor-pointer"
              >
                Chat on WhatsApp 💬
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
