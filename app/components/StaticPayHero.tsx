"use client";

import React from "react";

export default function StaticPayHero() {
  return (
    <section className="relative w-full pt-32 sm:pt-40 pb-12 sm:pb-16 px-4 sm:px-6 md:px-12 text-center overflow-hidden bg-[#070318]">
      {/* Subtle Static Ambient Glows (No moving parts) */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(160, 104, 255, 0.28), transparent 70%), radial-gradient(circle at 15% 50%, rgba(99, 102, 241, 0.12), transparent 50%), radial-gradient(circle at 85% 60%, rgba(34, 211, 238, 0.1), transparent 50%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Modern Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-xs font-bold text-[#d8b4fe] mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          <span>ENCRYPTED CLIENT CHECKOUT &amp; INVOICING</span>
        </div>

        {/* Clean, Bold Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12] mb-6">
          Secure Global Payments &amp;{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d8b4fe] via-[#A068FF] to-[#22d3ee]">
            Multi-Currency Settlement
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed mb-6">
          Instant settlement supporting Stripe, PayPal, Wise, Wire Transfer, and UPI with multi-currency invoicing in USD, GBP, EUR, and INR.
        </p>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-semibold text-slate-300">
          <span className="bg-white/[0.04] px-3.5 py-1.5 rounded-full border border-purple-500/20">
            🔒 256-Bit SSL Encrypted
          </span>
          <span className="bg-white/[0.04] px-3.5 py-1.5 rounded-full border border-purple-500/20">
            🧾 Official GST &amp; Tax Invoices
          </span>
          <span className="bg-white/[0.04] px-3.5 py-1.5 rounded-full border border-purple-500/20">
            ⚡ Instant Receipt Delivery
          </span>
        </div>
      </div>
    </section>
  );
}
