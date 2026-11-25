import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CinematicIdentityHero from "../components/CinematicIdentityHero";
import Leadership3DCards from "../components/Leadership3DCards";
import OurPurpose3DSection from "../components/OurPurpose3DSection";
import OurPrinciples3DSection from "../components/OurPrinciples3DSection";

export const metadata: Metadata = {
  title: "About Us | Balaji Prime Media Global Digital Growth Agency",
  description:
    "Learn about Balaji Prime Media — our mission, high-authority media network, and how we combine engineering-grade web development with international search strategy.",
  alternates: {
    canonical: "https://balajiprimemedia.in/about-us",
  },
  openGraph: {
    title: "About Us | Balaji Prime Media Global Digital Growth Agency",
    description:
      "Learn about Balaji Prime Media — our mission, high-authority media network, and how we combine engineering-grade web development with international search strategy.",
    url: "https://balajiprimemedia.in/about-us",
    siteName: "Balaji Prime Media",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Balaji Prime Media Global Digital Growth Agency",
    description:
      "Learn about Balaji Prime Media — our mission, high-authority media network, and how we combine engineering-grade web development with international search strategy.",
  },
};

export default function AboutUsPage() {
  return (
    <div className="relative min-h-screen bg-[#07030d] text-white overflow-x-clip selection:bg-[#681fe4] selection:text-white font-satoshi bg-grid-white-240">
      {/* 100% Transparent Navbar Overlay */}
      <div className="absolute top-0 left-0 right-0 z-40 bg-transparent pointer-events-auto">
        <Navbar activePage="about" />
      </div>

      {/* Cinematic Identity Hero Header */}
      <CinematicIdentityHero />

      {/* Modern Industrial Our Purpose Section */}
      <OurPurpose3DSection />

      {/* Modern Industrial Our Core Principles Section */}
      <OurPrinciples3DSection />

      {/* Leadership Showcase */}
      <Leadership3DCards />

      {/* CTA Section */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 md:px-12 z-10 text-center">
        <div className="max-w-4xl mx-auto bg-[#0c0818] p-8 sm:p-14 rounded-[4px] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-white">
          <span className="font-bebas text-xs sm:text-sm tracking-[0.24em] text-[#681fe4] uppercase block mb-3">
            Accelerate Your Growth
          </span>
          <h2 className="font-bebas text-3xl sm:text-5xl lg:text-6xl text-white mb-4 tracking-[0.16em] uppercase leading-tight">
            READY TO ACCELERATE YOUR BRAND?
          </h2>
          <p className="font-satoshi text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto mb-8 leading-relaxed font-normal">
            Schedule a conversation with our growth team and discover how we can help you capture international market share.
          </p>
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 bg-[#681fe4] hover:bg-[#5815cb] text-white font-bebas text-sm sm:text-base tracking-[0.16em] uppercase px-8 py-4 rounded-[4px] shadow-[0_10px_25px_rgba(104,31,228,0.35)] transition-all cursor-pointer"
          >
            <span>TALK TO OUR STRATEGISTS</span>
            <span>→</span>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
