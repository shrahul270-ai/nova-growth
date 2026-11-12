import React from "react";
import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PaymentSection from "../components/PaymentSection";
import StaticPayHero from "../components/StaticPayHero";

export const metadata: Metadata = {
  title: "Secure Client Payment Portal | Balaji Prime Media",
  description:
    "Settle invoices or authorize monthly marketing retainers securely via Stripe, Wire Transfer, Wise, or PayPal with 256-bit bank-grade encryption.",
  alternates: {
    canonical: "https://balajiprimemedia.in/pay",
  },
};

export default function PayPage() {
  return (
    <div className="relative min-h-screen bg-[#020816] text-white overflow-hidden">
      {/* 100% Transparent Navbar Overlay */}
      <div className="absolute top-0 left-0 right-0 z-40 bg-transparent pointer-events-auto">
        <Navbar activePage="pay" />
      </div>

      {/* 1. Static Luxury Hero Header (Clean, Non-moving) */}
      <StaticPayHero />

      {/* 2. Main Payment Section */}
      <main id="payment-methods" className="relative z-10 bg-[#f8fafd] text-[#111827] py-8 sm:py-12">
        <PaymentSection hideHeader />
      </main>

      <Footer />
    </div>
  );
}
