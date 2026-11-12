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
    <section className="relative w-full h-screen min-h-[700px] overflow-hidden bg-[#020816] select-none flex flex-col items-center justify-center text-white">
      {/* Static Luxury Poster Background Plate (No moving video) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-bottom opacity-85"
          style={{
            backgroundImage: `url("https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/19548534-c502-431f-904d-24d31b17c471.jpg")`,
          }}
          aria-hidden="true"
        />
        {/* Top feather gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(2,8,22,1) 0%, rgba(2,8,22,0.65) 10%, rgba(2,8,22,0.2) 20%, rgba(2,8,22,0) 30%, rgba(2,8,22,0) 100%)",
          }}
        />
      </div>

      {/* Main Stage (Layer 10, Centered) */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 md:px-8 text-center flex flex-col items-center pt-20 sm:pt-24">
        {/* Eyebrow Glass Pill */}
        <a
          href="#payment-methods"
          onClick={scrollToPayment}
          className="inline-flex items-center px-3.5 py-1.5 bg-[rgba(51,52,74,0.6)] hover:bg-[rgba(66,66,96,0.66)] backdrop-blur-[14px] text-xs font-mono tracking-wider text-white transition-colors mb-6 cursor-pointer"
        >
          <span className="w-[9.3px] h-[11.1px] bg-[#c9ccd4] inline-block mr-3" />
          <span className="tracking-[0.6px] uppercase font-bold text-[11px] sm:text-[12px]">
            BANK-GRADE ESCROW &amp; CLIENT SETTLEMENT*
          </span>
          <svg
            className="w-[11px] h-[10.5px] ml-3 text-white"
            viewBox="0 0 11 10.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="square"
            strokeLinejoin="miter"
          >
            <path d="M1 0.9l4.2 4.35L1 9.6" />
            <path d="M6.2 0.9l4.2 4.35L6.2 9.6" />
          </svg>
        </a>

        {/* Headline */}
        <h1 className="text-[#f6f8fc] text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight leading-[1.08] mb-4">
          Move payments forward together
        </h1>

        {/* Lede Paragraph */}
        <p className="text-[#cfd3e0] text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
          Smart reports from global teams using Balaji Prime Media to manage spending, settle
          invoices, and stay in control as they grow. Accounts stay secure, orderly, and dependable.
        </p>

        {/* CTA Buttons Row */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {/* b1: Glass Button */}
          <a
            href="#payment-methods"
            onClick={scrollToPayment}
            className="inline-flex items-center justify-center h-[51.2px] px-7 bg-[rgba(45,56,92,0.85)] hover:bg-[rgba(58,72,114,0.9)] backdrop-blur-[14px] text-white font-mono font-bold text-[13px] tracking-[0.4px] transition-all cursor-pointer shadow-lg"
          >
            <span>SETTLE INVOICE NOW</span>
          </a>

          {/* b2: Red-Orange Button */}
          <a
            href="#payment-methods"
            onClick={scrollToPayment}
            className="inline-flex items-center justify-center h-[51.2px] px-6 bg-[#f93f28] hover:brightness-105 text-[#331200] font-mono font-bold text-[13px] tracking-[0.4px] transition-all cursor-pointer shadow-lg"
          >
            {/* Leading Icon */}
            <svg
              className="w-3 h-3 mr-3 text-[#331200]"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.05"
            >
              <circle cx="2.3" cy="2.3" r="1.75" />
              <circle cx="9.7" cy="2.3" r="1.75" />
              <circle cx="2.3" cy="9.7" r="1.75" />
              <circle cx="9.7" cy="9.7" r="1.75" />
              <path d="M3.6 3.9L8.4 8.1" />
            </svg>
            <span>DISCUSS A PLAN</span>
          </a>
        </div>
      </div>
    </section>
  );
}
