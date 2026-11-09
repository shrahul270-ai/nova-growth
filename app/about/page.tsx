import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import VaultraAboutHeader from "../components/VaultraAboutHeader";
import Leadership3DCards from "../components/Leadership3DCards";

export const metadata: Metadata = {
  title: "About Us | Balaji Prime Media Global Digital Growth Agency",
  description:
    "Learn about Balaji Prime Media — our mission, high-authority media network, and how we combine engineering-grade web development with international search strategy.",
  alternates: {
    canonical: "https://balajiprimemedia.in/about",
  },
};

const pillars = [
  {
    icon: "📈",
    title: "Data-Driven Engineering",
    description:
      "We do not guess. Every SEO campaign, code deployment, and content piece is backed by comprehensive search data, user intent metrics, and statistical significance.",
  },
  {
    icon: "🌍",
    title: "Global Mindset & Reach",
    description:
      "Operating seamlessly across time zones, we help brands expand their footprint into Tier-1 English-speaking markets (US, UK, Canada, Australia) and the Middle East.",
  },
  {
    icon: "⚡",
    title: "Uncompromising Performance",
    description:
      "We believe digital performance is a competitive advantage. Our web applications consistently score 95+ on Google PageSpeed Insights and pass all Core Web Vitals.",
  },
  {
    icon: "🤝",
    title: "Complete Transparency",
    description:
      "No vanity metrics. We provide live Data Studio dashboards, transparent weekly progress reports, and direct Slack communication with your lead strategist.",
  },
];


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

      {/* Mission & Vision Section */}
      <section id="about-purpose" className="relative py-6 sm:py-10 px-4 sm:px-6 md:px-12 z-10 max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-100 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          <div>
            <div className="mb-5 inline-block p-3 sm:p-4 rounded-2xl bg-[#080d1a] border border-amber-500/25 shadow-md">
              <Image
                src="/images/bpm-complete-logo.png"
                alt="BPM - Digital Growth & SEO Agency"
                width={260}
                height={240}
                className="h-16 sm:h-20 w-auto object-contain"
              />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200/80 px-3 py-1 rounded-full">
                Our Purpose
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight mt-4 mb-4">
              We help businesses win in the world&apos;s most competitive search markets.
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mb-4">
              Founded on the principle that digital marketing should be measurable, ethical, and high-ROI, Balaji Prime Media combines deep engineering discipline with data-driven outreach.
            </p>
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
              We partner with forward-thinking founders and marketing teams who demand real business outcomes — qualified pipeline, organic revenue, and long-term brand equity — not vanity impressions.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-amber-50/80 p-4 sm:p-6 rounded-2xl border border-amber-200/70 text-center">
              <span className="text-2xl sm:text-3xl font-black text-[#091427] block">850+</span>
              <span className="text-xs font-bold text-gray-700 mt-1 block">Vetted Media Outlets</span>
              <span className="text-[10px] text-gray-500">DR 50–90+ Publications</span>
            </div>
            <div className="bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200 text-center">
              <span className="text-2xl sm:text-3xl font-black text-[#091427] block">100%</span>
              <span className="text-xs font-bold text-gray-700 mt-1 block">Manual Outreach</span>
              <span className="text-[10px] text-gray-500">Zero PBNs or spam</span>
            </div>
            <div className="bg-blue-50/70 p-4 sm:p-6 rounded-2xl border border-blue-200/60 text-center">
              <span className="text-2xl sm:text-3xl font-black text-[#1e40af] block">7-14d</span>
              <span className="text-xs font-bold text-gray-700 mt-1 block">Turnaround Time</span>
              <span className="text-[10px] text-gray-500">Fast publication</span>
            </div>
            <div className="bg-amber-50 p-4 sm:p-6 rounded-2xl border border-amber-200 text-center">
              <span className="text-2xl sm:text-3xl font-black text-[#d97706] block">95+</span>
              <span className="text-xs font-bold text-gray-700 mt-1 block">Target PageSpeed</span>
              <span className="text-[10px] text-gray-500">Core Web Vitals Pass</span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="relative py-12 sm:py-16 px-4 sm:px-6 md:px-12 z-10 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#091427] uppercase tracking-wider">
            Our Core Principles
          </span>
          <h2 className="text-3xl font-black text-[#0f172a] tracking-tight mt-2">
            How We Deliver Consistent Excellence
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs card-3d flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#d97706] border border-amber-200/60 flex items-center justify-center text-xl mb-4">
                  {pillar.icon}
                </div>
                <h3 className="text-lg font-bold text-[#0f172a] mb-2">{pillar.title}</h3>
                <p className="text-xs text-[#64748b] leading-relaxed">{pillar.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

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
