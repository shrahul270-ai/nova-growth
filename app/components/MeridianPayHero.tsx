"use client";

import React from "react";

export default function MeridianPayHero() {
  const scrollToPayment = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("payment-methods");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden bg-gradient-to-b from-[#08021a] via-[#050114] to-[#040112] select-none flex flex-col items-center justify-center text-white">
      {/* Ambient Radial Glowing Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#7c3aed]/25 via-[#A068FF]/20 to-[#22d3ee]/15 blur-[120px] pointer-events-none -z-0" />
      <div className="absolute -top-10 left-10 w-72 h-72 bg-[#6366f1]/20 blur-[100px] pointer-events-none -z-0" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-[#c026d3]/15 blur-[100px] pointer-events-none -z-0" />

      {/* Grid Pattern Background */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 md:px-8 text-center flex flex-col items-center">
        {/* Eyebrow Glass Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.1] border border-purple-500/30 backdrop-blur-md text-xs font-semibold text-purple-200 transition-all mb-6 shadow-[0_0_20px_rgba(160,104,255,0.25)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          <span className="tracking-wide uppercase text-[10.5px] sm:text-xs font-bold text-white">
            Bank-Grade 256-Bit SSL Escrow Portal
          </span>
          <span className="text-purple-400">•</span>
          <span className="text-[10.5px] text-emerald-300 font-bold">Instant GST / Tax Receipt</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.12] mb-5 max-w-4xl">
          Move Global Payments <br />
          <span className="bg-gradient-to-r from-white via-[#d8b4fe] to-[#22d3ee] bg-clip-text text-transparent">
            Forward with Complete Confidence
          </span>
        </h1>

        {/* Lede Paragraph */}
        <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
          Seamless multi-currency client settlement for brands and enterprises worldwide. Pay monthly growth retainers or custom invoices in{" "}
          <strong className="text-white font-semibold">INR (₹), USD ($), GBP (£), EUR (€), AUD (A$), CAD (C$)</strong>, or{" "}
          <strong className="text-white font-semibold">AED</strong> via UPI, Stripe, Bank Wire, Wise, or PayPal.
        </p>

        {/* Supported Currencies Pill Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-9 px-4 py-2 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
            Supported:
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-white bg-purple-500/20 px-2.5 py-1 rounded-lg border border-purple-400/30">
            🇮🇳 INR (₹)
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-200 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
            🇺🇸 USD ($)
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-200 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
            🇬🇧 GBP (£)
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-200 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
            🇪🇺 EUR (€)
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-200 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
            🇦🇺 AUD (A$)
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-200 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
            🇦🇪 AED (د.إ)
          </span>
        </div>

        {/* CTA Buttons Row */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#payment-methods"
            onClick={scrollToPayment}
            className="group inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#7c3aed] via-[#A068FF] to-[#6366f1] text-white font-bold text-sm tracking-wide shadow-[0_10px_35px_rgba(160,104,255,0.5)] hover:shadow-[0_15px_45px_rgba(160,104,255,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border border-white/20"
          >
            <span>Proceed to Payment</span>
            <span className="text-base group-hover:translate-x-1 transition-transform">💳 →</span>
          </a>

          <a
            href="https://wa.me/917690868932?text=Hi%20Balaji%20Prime%20Media,%20I%20have%20a%20question%20regarding%20an%20invoice/payment."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/15 text-white font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-md"
          >
            <span className="text-emerald-400">💬</span>
            <span>Accounts WhatsApp Desk</span>
          </a>
        </div>

        {/* 4 Feature Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-12 sm:mt-16 w-full max-w-4xl text-left">
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
            <span className="text-xl mb-1.5 block">🛡️</span>
            <h4 className="text-xs sm:text-sm font-bold text-white">Bank-Grade SSL</h4>
            <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
              256-bit encrypted escrow protection on all transactions.
            </p>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
            <span className="text-xl mb-1.5 block">⚡</span>
            <h4 className="text-xs sm:text-sm font-bold text-white">Instant UPI &amp; Cards</h4>
            <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
              Zero-friction checkout via UPI, Cards, Wire, Wise, or PayPal.
            </p>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
            <span className="text-xl mb-1.5 block">📄</span>
            <h4 className="text-xs sm:text-sm font-bold text-white">Official Tax Invoices</h4>
            <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
              Automated business tax receipts with GST &amp; breakdown.
            </p>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
            <span className="text-xl mb-1.5 block">🌐</span>
            <h4 className="text-xs sm:text-sm font-bold text-white">Mid-Market FX</h4>
            <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
              Real-time fair currency conversion with zero hidden fees.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
