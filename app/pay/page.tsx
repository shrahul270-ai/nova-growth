import React from "react";
import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PaymentSection from "../components/PaymentSection";
import MeridianPayHero from "../components/MeridianPayHero";

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

      {/* 1. Meridian Pay Hero Header (Clean, Static) */}
      <MeridianPayHero />

      {/* 2. Main Payment Section */}
      <main id="payment-methods" className="relative z-10 bg-gradient-to-b from-[#070319] to-[#040112] text-white py-12 sm:py-16 border-t border-purple-500/20">
        <PaymentSection hideHeader />
      </main>

      <Footer />
    </div>
  );
}
