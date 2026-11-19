import React from "react";
import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PaymentSection from "../components/PaymentSection";
import MeridianPayHero from "../components/MeridianPayHero";

export const metadata: Metadata = {
  title: "Secure Client Payment Portal | Balaji Prime Media",
  description:
    "Settle invoices or authorize monthly marketing retainers securely in INR, USD, GBP, EUR, AUD, CAD, or AED via UPI, Stripe, Wire Transfer, Wise, or PayPal with 256-bit bank-grade encryption.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  alternates: {
    canonical: "https://balajiprimemedia.in/pay",
  },
};

export default function PayPage() {
  return (
    <div className="relative min-h-screen bg-[#07030d] text-white overflow-hidden font-satoshi bg-grid-white-240">
      {/* 100% Transparent Navbar Overlay */}
      <div className="absolute top-0 left-0 right-0 z-40 bg-transparent pointer-events-auto">
        <Navbar activePage="pay" />
      </div>

      {/* 1. Meridian Pay Hero Header */}
      <MeridianPayHero />

      {/* 2. Main Payment Section */}
      <main id="payment-methods" className="relative z-10 bg-[#07030d] text-white py-14 sm:py-20 border-t border-white/10">
        <PaymentSection hideHeader />
      </main>

      <Footer />
    </div>
  );
}
