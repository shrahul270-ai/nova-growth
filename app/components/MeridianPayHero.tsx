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
    <section className="relative w-full pt-32 pb-16 sm:pt-40 sm:pb-24 overflow-hidden bg-[#07030d] bg-grid-white-240 select-none flex flex-col items-center justify-center text-white border-b border-white/10 font-satoshi">
      {/* Ambient Radial Violet Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(104,31,228,0.18)_0%,transparent_70%)] pointer-events-none -z-0" />
      <div className="absolute -top-10 left-10 w-72 h-72 bg-[#220090]/25 rounded-full blur-3xl pointer-events-none -z-0" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 md:px-8 text-center flex flex-col items-center">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-[2px] bg-white/5 border border-white/10 text-white text-xs font-bebas tracking-[0.2em] uppercase mb-6 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#681fe4] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#681fe4]"></span>
          </span>
          <span>BANK-GRADE 256-BIT SSL ESCROW PORTAL</span>
          <span className="text-[#681fe4]">•</span>
          <span className="text-[#681fe4]">INSTANT TAX RECEIPT</span>
        </div>

        {/* Headline */}
        <h1 className="font-bebas text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.16em] uppercase leading-[0.92] mb-5 max-w-4xl text-white">
          MOVE GLOBAL PAYMENTS <br />
          <span className="text-[#681fe4]">FORWARD WITH CONFIDENCE</span>
        </h1>

        {/* Lede Paragraph */}
        <p className="font-satoshi text-neutral-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
          Seamless multi-currency client settlement for brands and enterprises worldwide. Pay monthly growth retainers or custom invoices in{" "}
          <strong className="text-white font-semibold">INR (₹), USD ($), GBP (£), EUR (€), AUD (A$), CAD (C$)</strong>, or{" "}
          <strong className="text-white font-semibold">AED</strong> via UPI, Stripe, Bank Wire, Wise, or PayPal.
        </p>

        {/* Supported Currencies Pill Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-9 px-4 py-2 rounded-[4px] bg-[#0c0818] border border-white/10 font-mono">
          <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mr-1">
            Supported:
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-white bg-white/5 px-2.5 py-1 rounded-[2px] border border-white/10">
            🇮🇳 INR (₹)
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-neutral-300 bg-white/5 px-2.5 py-1 rounded-[2px] border border-white/10">
            🇺🇸 USD ($)
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-neutral-300 bg-white/5 px-2.5 py-1 rounded-[2px] border border-white/10">
            🇬🇧 GBP (£)
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-neutral-300 bg-white/5 px-2.5 py-1 rounded-[2px] border border-white/10">
            🇪🇺 EUR (€)
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-neutral-300 bg-white/5 px-2.5 py-1 rounded-[2px] border border-white/10">
            🇦🇺 AUD (A$)
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-neutral-300 bg-white/5 px-2.5 py-1 rounded-[2px] border border-white/10">
            🇦🇪 AED (د.إ)
          </span>
        </div>

        {/* CTA Buttons Row */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#payment-methods"
            onClick={scrollToPayment}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-[4px] bg-[#681fe4] hover:bg-[#5815cb] text-white font-bebas text-sm sm:text-base tracking-[0.16em] uppercase shadow-[0_10px_25px_rgba(104,31,228,0.35)] transition-all cursor-pointer"
          >
            <span>PROCEED TO PAYMENT</span>
            <span>💳 →</span>
          </a>

          <a
            href="https://wa.me/917690868932?text=Hi%20Balaji%20Prime%20Media,%20I%20have%20a%20question%20regarding%20an%20invoice/payment."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-[4px] bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bebas text-sm sm:text-base tracking-[0.16em] uppercase transition-all"
          >
            <span>INVOICE SUPPORT (WHATSAPP)</span>
          </a>
        </div>

      </div>
    </section>
  );
}
