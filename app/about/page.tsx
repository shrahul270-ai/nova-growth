import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "About Us | Nova Growth Global Digital Agency",
  description:
    "Learn about Nova Growth — our mission, global client footprint, and how we combine engineering-grade web development with international search strategy.",
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

const team = [
  {
    name: "Aiden Vance",
    role: "Head of Growth & SEO Strategy",
    bio: "Ex-SaaS growth marketer with 10+ years scaling organic acquisition channels across North America and Europe.",
    avatar: "👨‍💼",
  },
  {
    name: "Elena Rostova",
    role: "Principal Web Architect",
    bio: "Next.js & modern frontend specialist focused on headless e-commerce, web accessibility, and performance optimization.",
    avatar: "👩‍💻",
  },
  {
    name: "Marcus Sterling",
    role: "Director of Digital PR & Authority",
    bio: "Editorial strategist who has secured coverage on Forbes, TechCrunch, Inc., and leading industry publications.",
    avatar: "👨‍🔬",
  },
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-[#f8fbf9] text-[#111827] overflow-hidden">
      <div className="curved-ribbon-left" aria-hidden="true" />
      <div className="curved-ribbon-right" aria-hidden="true" />

      <Navbar activePage="about" />

      {/* Hero Header */}
      <section className="relative pt-16 pb-16 px-6 md:px-12 text-center max-w-4xl mx-auto z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-xs font-semibold text-[#091427] mb-4">
          <span className="w-2 h-2 rounded-full bg-[#d97706]" />
          <span>Our Story &amp; Mission</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0f172a] tracking-tight leading-[1.1] mb-6">
          Shaping the Future of <br />
          <span className="text-gradient-navy-gold">Global Digital Growth</span>
        </h1>
        <p className="text-base sm:text-lg text-[#475569] leading-relaxed max-w-2xl mx-auto mb-8">
          Nova Growth is a modern digital marketing and engineering agency. We bridge the gap between technical web craftsmanship and international organic search supremacy.
        </p>
      </section>

      {/* Mission & Vision Section */}
      <section className="relative py-12 px-6 md:px-12 z-10 max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl p-8 md:p-14 border border-gray-100 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200/80 px-3 py-1 rounded-full">
              Our Purpose
            </span>
            <h2 className="text-3xl font-black text-[#0f172a] tracking-tight mt-4 mb-4">
              We help businesses win in the world&apos;s most competitive search markets.
            </h2>
            <p className="text-sm text-[#475569] leading-relaxed mb-4">
              Founded on the principle that digital marketing should be measurable, ethical, and high-ROI, Nova Growth combines deep engineering discipline with creative storytelling.
            </p>
            <p className="text-sm text-[#475569] leading-relaxed">
              We partner with forward-thinking founders and marketing teams who demand real business outcomes — qualified pipeline, organic revenue, and long-term brand equity — not vanity impressions.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-amber-50/80 p-6 rounded-2xl border border-amber-200/70 text-center">
              <span className="text-3xl font-black text-[#091427] block">150+</span>
              <span className="text-xs font-bold text-gray-700 mt-1 block">Global Clients</span>
              <span className="text-[10px] text-gray-500">Across 10+ countries</span>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center">
              <span className="text-3xl font-black text-[#091427] block">300+</span>
              <span className="text-xs font-bold text-gray-700 mt-1 block">Projects Delivered</span>
              <span className="text-[10px] text-gray-500">On time &amp; on spec</span>
            </div>
            <div className="bg-blue-50/70 p-6 rounded-2xl border border-blue-200/60 text-center">
              <span className="text-3xl font-black text-[#1e40af] block">98%</span>
              <span className="text-xs font-bold text-gray-700 mt-1 block">Client Retention</span>
              <span className="text-[10px] text-gray-500">Year-over-year</span>
            </div>
            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200 text-center">
              <span className="text-3xl font-black text-[#d97706] block">300%</span>
              <span className="text-xs font-bold text-gray-700 mt-1 block">Average Organic ROI</span>
              <span className="text-[10px] text-gray-500">For our partners</span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="relative py-16 px-6 md:px-12 z-10 max-w-7xl mx-auto">
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

      {/* Leadership Team */}
      <section className="relative py-16 px-6 md:px-12 z-10 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#091427] uppercase tracking-wider">
            Leadership
          </span>
          <h2 className="text-3xl font-black text-[#0f172a] tracking-tight mt-2">
            Meet the Strategists Behind Nova Growth
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs card-3d text-center"
            >
              <div className="w-20 h-20 rounded-full bg-[#091427] text-[#d97706] border border-[#d97706]/30 flex items-center justify-center text-3xl mx-auto mb-4">
                {member.avatar}
              </div>
              <h3 className="text-lg font-bold text-[#0f172a]">{member.name}</h3>
              <span className="text-xs font-bold text-[#d97706] block mb-2">{member.role}</span>
              <p className="text-xs text-[#64748b] leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 px-6 md:px-12 z-10 text-center">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#091427] via-[#0f213d] to-[#1e293b] p-10 rounded-3xl border border-[#d97706]/35 shadow-xl text-white">
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
