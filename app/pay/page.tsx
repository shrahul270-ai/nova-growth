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

      <main className="pt-8 relative overflow-hidden">
        <HeaderBackgroundAnimation variant="subpage" />
        <div className="relative z-10">
          <PaymentSection />
        </div>
      </main>

      <Footer />
    </div>
  );
}
