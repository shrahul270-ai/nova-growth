"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Smartphone,
  Zap,
  Palette,
  Code2,
  Headphones,
  CheckCircle2,
  Layers,
  ShieldCheck,
  Cpu,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  GraduationCap,
  HeartPulse,
  Newspaper,
  MessageSquare,
  Users,
} from "lucide-react";

interface FlutterShowcaseViewProps {
  onOpenConsultation?: (appType?: string) => void;
}

export default function FlutterShowcaseView({
  onOpenConsultation,
}: FlutterShowcaseViewProps) {
  const [activeTab, setActiveTab] = useState<"sideBySide" | "inr" | "usd">("sideBySide");
  const [selectedApp, setSelectedApp] = useState<string>("All");

  const indiaPricing = [
    { type: "Basic App (e.g. Calculator, Notes)", inr: "₹5,000 – ₹8,000", popular: false },
    { type: "Business App (e.g. Shop, Service)", inr: "₹8,000 – ₹15,000", popular: true },
    { type: "Social Media App", inr: "₹15,000 – ₹25,000", popular: false },
    { type: "E-Commerce App", inr: "₹15,000 – ₹30,000", popular: true },
    { type: "Learning / Education App", inr: "₹12,000 – ₹20,000", popular: false },
    { type: "Healthcare App", inr: "₹15,000 – ₹25,000", popular: false },
    { type: "News / Media App", inr: "₹10,000 – ₹18,000", popular: false },
    { type: "Custom App (Any Type)", inr: "₹20,000+", popular: true },
  ];

  const internationalPricing = [
    { type: "Basic App", usd: "$80 – $120", popular: false },
    { type: "Business App", usd: "$120 – $200", popular: true },
    { type: "Social Media App", usd: "$200 – $350", popular: false },
    { type: "E-Commerce App", usd: "$250 – $400", popular: true },
    { type: "Learning / Education App", usd: "$180 – $300", popular: false },
    { type: "Healthcare App", usd: "$200 – $350", popular: false },
    { type: "News / Media App", usd: "$150 – $250", popular: false },
    { type: "Custom App (Any Type)", usd: "$300+", popular: true },
  ];

  const whyChooseUs = [
    { title: "High Quality & Clean Code", desc: "Production-grade Dart architecture with modular state management (BLoC/Provider)." },
    { title: "On-Time Delivery", desc: "Strict milestone-based sprints with live TestFlight / APK test links every week." },
    { title: "Affordable Price", desc: "Direct agency pricing with zero bloated overheads — maximum ROI on development." },
    { title: "Post-Delivery Support", desc: "Dedicated warranty, bug fixing, and continuous App Store / Play Store maintenance." },
    { title: "Firebase & API Integration", desc: "Seamless cloud database, push notifications, auth, and custom backend APIs." },
    { title: "Fully Responsive App", desc: "Flawless rendering on iPhone, iPad, Android smartphones, foldables & web browsers." },
  ];

  const popularProjects = [
    {
      name: "E-Commerce App",
      icon: <ShoppingBag className="w-5 h-5 text-cyan-400" />,
      desc: "Product catalogs, cart, payment gateways (Razorpay, Stripe) & live order tracking.",
      badge: "Top Seller",
      gradient: "from-blue-600/30 to-cyan-600/20",
    },
    {
      name: "Education App",
      icon: <GraduationCap className="w-5 h-5 text-amber-400" />,
      desc: "Video streaming, interactive quizzes, certificates, student progress & PDF notes.",
      badge: "High Growth",
      gradient: "from-amber-600/30 to-orange-600/20",
    },
    {
      name: "Healthcare App",
      icon: <HeartPulse className="w-5 h-5 text-rose-400" />,
      desc: "Doctor appointments, tele-consultation video calls, e-prescriptions & health records.",
      badge: "HIPAA Compliant",
      gradient: "from-rose-600/30 to-pink-600/20",
    },
    {
      name: "News / Media App",
      icon: <Newspaper className="w-5 h-5 text-purple-400" />,
      desc: "Instant breaking news push notifications, category feeds, offline reading & dark mode.",
      badge: "Viral Traffic",
      gradient: "from-purple-600/30 to-indigo-600/20",
    },
    {
      name: "Chat & Social App",
      icon: <MessageSquare className="w-5 h-5 text-emerald-400" />,
      desc: "1-on-1 & group chat, real-time WebSockets, media sharing & voice/video calls.",
      badge: "Real-Time",
      gradient: "from-emerald-600/30 to-teal-600/20",
    },
    {
      name: "Admin Panel App",
      icon: <Users className="w-5 h-5 text-blue-400" />,
      desc: "Executive role-based control dashboard, user verification, revenue analytics & logs.",
      badge: "Enterprise",
      gradient: "from-blue-600/30 to-indigo-600/20",
    },
  ];

  const handleBookApp = (appName: string) => {
    if (onOpenConsultation) {
      onOpenConsultation(`Flutter App: ${appName}`);
    } else {
      const msg = encodeURIComponent(`Hi Balaji Prime Media, I want to build a Flutter ${appName}.`);
      window.open(`https://wa.me/917690868932?text=${msg}`, "_blank");
    }
  };

  return (
    <section className="relative py-14 sm:py-20 px-4 sm:px-6 md:px-12 z-10 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* 1. HERO BANNER */}
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 md:p-14 mb-14 border border-blue-500/30 bg-gradient-to-br from-[#0c1333] via-[#080d24] to-[#040612] shadow-2xl">
          {/* Ambient Lighting Orbs */}
          <div className="absolute top-0 right-0 w-[500px] h-[350px] bg-blue-500/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-cyan-500/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              {/* Flutter Official Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-400/40 text-xs font-bold text-cyan-300 mb-4 shadow-sm backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>Build Once, Run Everywhere • Android | iOS | Web</span>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1] mb-4">
                Flutter Project Development <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">
                  Turn Your Idea into a Powerful App
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mb-6">
                Single-codebase cross-platform mobile engineering engineered with Google&apos;s Flutter SDK. Get 60fps/120fps native performance on both iPhone and Android at 50% lower development cost.
              </p>

              {/* 4 Feature Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                  <Zap className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                  <span className="text-xs font-bold text-white block">Fast Performance</span>
                  <span className="text-[10px] text-slate-400">Native C++ Engine</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                  <Palette className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                  <span className="text-xs font-bold text-white block">Beautiful UI/UX</span>
                  <span className="text-[10px] text-slate-400">Material 3 &amp; iOS</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                  <Code2 className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                  <span className="text-xs font-bold text-white block">Clean Code</span>
                  <span className="text-[10px] text-slate-400">BLoC / Provider</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                  <Headphones className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                  <span className="text-xs font-bold text-white block">Ongoing Support</span>
                  <span className="text-[10px] text-slate-400">Store Updates</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleBookApp("New Project")}
                  className="px-7 py-3.5 rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-600 hover:brightness-110 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-xl shadow-cyan-500/25 transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Build My Flutter App Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="https://wa.me/917690868932?text=Hi%20Balaji%20Prime%20Media%2C%20I%20want%20a%20Flutter%20App%20estimate."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/20 text-white font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>💬 WhatsApp Fast Quote</span>
                </a>
              </div>
            </div>

            {/* Visual Phone Mockup Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm rounded-[36px] p-4 bg-gradient-to-b from-[#1b2554] via-[#0d1433] to-[#060919] border-2 border-cyan-400/40 shadow-[0_20px_60px_rgba(0,180,255,0.25)]">
                {/* Top Notch */}
                <div className="w-32 h-4 rounded-full bg-black/80 mx-auto mb-4 border border-white/10" />
                
                <div className="p-4 rounded-2xl bg-[#090e24] border border-blue-500/20 text-center mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 mx-auto flex items-center justify-center text-2xl text-white font-black shadow-lg shadow-cyan-500/30 mb-2">
                    ⚡
                  </div>
                  <h3 className="text-base font-bold text-white">Flutter Hybrid Engine</h3>
                  <p className="text-[11px] text-cyan-300 font-medium">1 Single Codebase • iOS + Android</p>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between text-xs">
                    <span className="text-slate-300">Target Platforms</span>
                    <span className="text-cyan-400 font-bold">Android, iOS, Web, macOS</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between text-xs">
                    <span className="text-slate-300">Rendering Frame Rate</span>
                    <span className="text-emerald-400 font-bold">60fps – 120fps (Zero Lag)</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between text-xs">
                    <span className="text-slate-300">Development Time</span>
                    <span className="text-amber-400 font-bold">50% Faster vs Native</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-blue-400/30 text-center">
                  <span className="text-[11px] font-semibold text-white">
                    Backed by Google • Powers Google Pay &amp; BMW
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. EDUCATIONAL GUIDE: FLUTTER KYA KAAM KARTA HAI? */}
        <div className="mb-14 p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#0f1738]/90 to-[#070b1c]/90 border border-blue-500/25 shadow-xl">
          <div className="flex items-center gap-2.5 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>Complete Architecture Guide</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
            Flutter Kya Kaam Karta Hai? (What is Flutter &amp; How It Works)
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8 max-w-4xl">
            Pehle agar aapko Android app aur iPhone app dono banwane hote the, toh aapko **do alag-alag developers hire karne padte the** (Android ke liye Kotlin/Java aur iPhone ke liye Swift). Isse kharcha do guna hota tha aur samay bhi double lagta tha. <br className="hidden sm:inline" />
            **Flutter Google dwara banaya gaya world-class open-source framework hai** jo is samasya ko hamesha ke liye khatam karta hai:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
              <span className="text-2xl block mb-2">🎯</span>
              <h4 className="text-base font-bold text-white mb-2">1 Codebase = Android + iOS</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Aapka pura application sirf ek hi baar code hota hai aur wahi code iPhone par bhi native app ki tarah chalta hai aur Android par bhi. Isse aapke **50% paise aur samay ki bachat** hoti hai.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
              <span className="text-2xl block mb-2">⚡</span>
              <h4 className="text-base font-bold text-white mb-2">Native Compiled Performance</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Flutter koi browser ya webview nahi hai. Ye directly phone ke hardware GPU par ARM machine code ke roop me run hota hai, jisse 60fps se 120fps tak bilkul smooth fluid animations milti hain.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
              <span className="text-2xl block mb-2">🔒</span>
              <h4 className="text-base font-bold text-white mb-2">Enterprise Security &amp; Firebase</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Google Cloud aur Firebase ke sath deep integration hota hai. Real-time push notifications, biometric fingerprint/face login, aur bank-grade payment encryption built-in hoti hai.
              </p>
            </div>
          </div>
        </div>

        {/* 3. DEDICATED PRICING TABLES (INDIA & INTERNATIONAL) */}
        <div className="mb-14">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Transparent Verified App Rates</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                Flutter App Development Pricing
              </h2>
            </div>

            {/* View Switcher */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#140F24] border border-[#2B2144]">
              <button
                type="button"
                onClick={() => setActiveTab("sideBySide")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "sideBySide"
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Side-by-Side
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("inr")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "inr"
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                🇮🇳 India (INR)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("usd")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "usd"
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                🌐 International (USD)
              </button>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Table 1: India Pricing (INR - Indian Rupees) */}
            {(activeTab === "sideBySide" || activeTab === "inr") && (
              <div className="rounded-3xl overflow-hidden border border-emerald-500/30 bg-gradient-to-b from-[#0b171c]/95 via-[#060e12]/95 to-[#030708]/95 backdrop-blur-xl shadow-xl">
                <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-emerald-950/30">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">🇮🇳</span>
                    <div>
                      <h3 className="text-lg font-black text-white">India Pricing</h3>
                      <span className="text-xs text-emerald-400 font-semibold">(INR - Indian Rupees)</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Economic Rates
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/[0.02] text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        <th className="py-3 px-5">App Category</th>
                        <th className="py-3 px-5 text-right">Approx. Cost</th>
                        <th className="py-3 px-5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-xs sm:text-sm">
                      {indiaPricing.map((item, i) => (
                        <tr key={i} className="hover:bg-white/[0.03] transition-colors">
                          <td className="py-3.5 px-5 font-semibold text-white flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>{item.type}</span>
                            {item.popular && (
                              <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                                Popular
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-5 text-right font-black text-emerald-400">
                            {item.inr}
                          </td>
                          <td className="py-3.5 px-5 text-right">
                            <button
                              onClick={() => handleBookApp(item.type)}
                              className="px-3 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-black font-bold text-xs transition-all cursor-pointer"
                            >
                              Book →
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Table 2: International Pricing (USD - US Dollars) */}
            {(activeTab === "sideBySide" || activeTab === "usd") && (
              <div className="rounded-3xl overflow-hidden border border-blue-500/30 bg-gradient-to-b from-[#0e1633]/95 via-[#080d24]/95 to-[#040612]/95 backdrop-blur-xl shadow-xl">
                <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-blue-950/40">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">🌐</span>
                    <div>
                      <h3 className="text-lg font-black text-white">International Pricing</h3>
                      <span className="text-xs text-cyan-300 font-semibold">(USD - US Dollars)</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    Worldwide Delivery
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/[0.02] text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        <th className="py-3 px-5">App Category</th>
                        <th className="py-3 px-5 text-right">Approx. Cost</th>
                        <th className="py-3 px-5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-xs sm:text-sm">
                      {internationalPricing.map((item, i) => (
                        <tr key={i} className="hover:bg-white/[0.03] transition-colors">
                          <td className="py-3.5 px-5 font-semibold text-white flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                            <span>{item.type}</span>
                            {item.popular && (
                              <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300">
                                In Demand
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-5 text-right font-black text-cyan-300">
                            {item.usd}
                          </td>
                          <td className="py-3.5 px-5 text-right">
                            <button
                              onClick={() => handleBookApp(item.type)}
                              className="px-3 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-400 text-cyan-300 hover:text-black font-bold text-xs transition-all cursor-pointer"
                            >
                              Book →
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 4. POPULAR FLUTTER PROJECTS & APP USE CASES */}
        <div className="mb-14">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              ✦ Popular Flutter Projects
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mt-1">
              What Can We Build For You in Flutter?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              From enterprise SaaS apps to high-converting commerce engines, we deliver complete end-to-end architectures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularProjects.map((p, idx) => (
              <div
                key={idx}
                className="rounded-2xl p-6 bg-gradient-to-b from-[#101736]/90 to-[#090e24]/90 border border-blue-500/25 shadow-xl hover:border-cyan-400/60 transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center">
                      {p.icon}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                      {p.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                    {p.name}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal mb-5">
                    {p.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-400">100% Custom Build</span>
                  <button
                    onClick={() => handleBookApp(p.name)}
                    className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Get Scope</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. WHY CHOOSE US? */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#0d1538]/90 to-[#070b1f]/90 border border-blue-500/25 shadow-xl mb-12">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span>⭐ Why Choose Balaji Prime Media for Flutter?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-8">
            Engineered for Stability, Security &amp; Store Approvals
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((w, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">{w.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6. BOTTOM CTA BAR */}
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-blue-900/50 via-cyan-900/40 to-indigo-900/50 border border-cyan-400/30 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-3 tracking-tight">
              Ready to Turn Your Idea into a 60fps Flutter App?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mb-8 leading-relaxed">
              Schedule a direct consultation with our Flutter technical lead. We provide wireframes, architecture roadmap, and milestone budget within 12 hours.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => handleBookApp("Direct Project Call")}
                className="px-8 py-3.5 rounded-full bg-white hover:bg-neutral-100 text-black font-bold text-xs sm:text-sm shadow-xl hover:scale-105 transition-all cursor-pointer"
              >
                Request Free Architecture Proposal →
              </button>
              <a
                href="https://wa.me/917690868932?text=Hi%20Balaji%20Prime%20Media%2C%20let%27s%20discuss%20my%20Flutter%20App%20project."
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
