import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import VaultraAboutHeader from "../components/VaultraAboutHeader";
import Leadership3DCards from "../components/Leadership3DCards";
import OurPurpose3DSection from "../components/OurPurpose3DSection";
import OurPrinciples3DSection from "../components/OurPrinciples3DSection";

export const metadata: Metadata = {
  title: "About Us | Balaji Prime Media Global Digital Growth Agency",
  description:
    "Learn about Balaji Prime Media — our mission, high-authority media network, and how we combine engineering-grade web development with international search strategy.",
  alternates: {
    canonical: "https://balajiprimemedia.in/about",
  },
};




export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-[#f8fbf9] text-[#111827] overflow-hidden">
      <div className="curved-ribbon-left" aria-hidden="true" />
      <div className="curved-ribbon-right" aria-hidden="true" />

      {/* 100% Transparent Navbar Overlay */}
      <div className="absolute top-0 left-0 right-0 z-40 bg-transparent pointer-events-auto">
        <Navbar activePage="about" />
      </div>

      {/* Vaultra Glowing Dotted Particle Globe Hero Header */}
      <VaultraAboutHeader />

      {/* 3D Glassmorphism Our Purpose Section with Cosmic Background & Purple Accents */}
      <OurPurpose3DSection />

      {/* 3D Glassmorphism Our Core Principles Section with Purple Theme & Cosmic Texture */}
      <OurPrinciples3DSection />

      {/* 3D Glassmorphism Cyber-Podium Leadership Showcase */}
      <Leadership3DCards />

      {/* CTA */}
      <section className="relative py-12 sm:py-16 px-4 sm:px-6 md:px-12 z-10 text-center">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#091427] via-[#0f213d] to-[#1e293b] p-6 sm:p-10 rounded-3xl border border-[#d97706]/35 shadow-xl text-white">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
            Ready to Accelerate Your Brand?
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto mb-6">
            Schedule a conversation with our growth team and discover how we can help you capture international market share.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#d97706] hover:bg-[#b45309] text-white text-xs font-bold px-7 py-3.5 rounded-full shadow-lg shadow-[#d97706]/30 transition-all"
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
