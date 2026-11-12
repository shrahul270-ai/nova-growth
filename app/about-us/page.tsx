import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StaticAboutHero from "../components/StaticAboutHero";
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
    <div className="relative min-h-screen bg-gradient-to-b from-[#0a0522] via-[#070319] to-[#040112] text-white overflow-x-clip selection:bg-purple-600 selection:text-white">
      {/* 100% Transparent Navbar Overlay */}
      <div className="absolute top-0 left-0 right-0 z-40 bg-transparent pointer-events-auto">
        <Navbar activePage="about" />
      </div>

      {/* Static Luxury Hero Header (Clean, Non-moving) */}
      <StaticAboutHero />

      {/* 3D Glassmorphism Our Purpose Section with Cosmic Background & Purple Accents */}
      <OurPurpose3DSection />

      {/* 3D Glassmorphism Our Core Principles Section with Purple Theme & Cosmic Texture */}
      <OurPrinciples3DSection />

      {/* 3D Glassmorphism Cyber-Podium Leadership Showcase (Purple Theme) */}
      <Leadership3DCards />

      {/* CTA (Purple Luxury Glassmorphic) */}
      <section className="relative py-14 sm:py-20 px-4 sm:px-6 md:px-12 z-10 text-center">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#12082b] via-[#1a0c3b] to-[#12082b] p-8 sm:p-12 rounded-3xl border border-purple-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(168,85,247,0.15)] text-white backdrop-blur-xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-3 tracking-tight">
            Ready to Accelerate Your Brand?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mb-6 leading-relaxed">
            Schedule a conversation with our growth team and discover how we can help you capture international market share.
          </p>
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:brightness-110 active:scale-[0.98] text-white text-xs sm:text-sm font-bold px-8 py-4 rounded-full shadow-lg shadow-purple-950/80 transition-all cursor-pointer"
          >
            <span>Talk to Our Strategists</span>
            <span>→</span>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
