import React from "react";
import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PaymentSection from "../components/PaymentSection";
import HeaderBackgroundAnimation from "../components/HeaderBackgroundAnimation";

export const metadata: Metadata = {
  title: "Secure Client Payment Portal | Nova Growth",
  description:
    "Settle invoices or authorize monthly marketing retainers securely via Stripe, Wire Transfer, Wise, or PayPal with 256-bit bank-grade encryption.",
};

export default function PayPage() {
  return (
    <div className="relative min-h-screen bg-[#f8fafd] text-[#111827] overflow-hidden">
      <div className="curved-ribbon-left" aria-hidden="true" />
      <div className="curved-ribbon-right" aria-hidden="true" />

      <Navbar activePage="pay" />

      {/* 1. Full-Width Dedicated Header Banner with 3D Glowing Wave Animation */}
      <section className="relative w-full pt-10 pb-12 sm:pt-16 sm:pb-16 px-4 sm:px-6 md:px-12 z-10 overflow-hidden text-center">
        <HeaderBackgroundAnimation variant="subpage" />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-xs font-semibold text-[#091427] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#d97706] animate-pulse" />
            <span>Bank-Grade Escrow &amp; Client Settlement</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0f172a] tracking-tight leading-tight">
            Secure Global <br />
            <span className="text-gradient-navy-gold">Payment &amp; Invoicing Portal</span>
          </h1>
          <p className="text-sm sm:text-[15px] text-[#54647c] mt-3 max-w-2xl mx-auto">
            Seamless multi-currency settlement for overseas clients across North America, the UK, Europe, UAE, and Australia.
          </p>
        </div>
      </section>

      {/* 2. Main Payment Section */}
      <main className="relative z-10">
        <PaymentSection hideHeader />
      </main>

      <Footer />
    </div>
  );
}
