"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { ChevronDown, Search, HelpCircle, MessageSquare, ArrowRight, ShieldCheck, Zap } from "lucide-react";

interface FAQItem {
  id: string;
  category: "all" | "seo" | "guest-post" | "web-dev" | "pricing";
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: "faq-1",
    category: "seo",
    question: "How long does it typically take to see measurable SEO results?",
    answer: "For established websites, technical optimizations and Core Web Vitals fixes often reflect in Google Search Console within 2 to 4 weeks. High-intent keyword ranking movements and organic traffic scaling usually become prominent between months 2 and 4 as authority builds up through manual outreach.",
  },
  {
    id: "faq-2",
    category: "guest-post",
    question: "Are your guest posts and backlinks 100% white-hat and manual?",
    answer: "Yes, absolutely. We do not use Private Blog Networks (PBNs), automated link software, or link farms. Every single placement is negotiated through direct editorial outreach with verified webmasters and real editorial publications boasting Domain Rating (DR) 50 to 90+ and genuine organic traffic.",
  },
  {
    id: "faq-3",
    category: "seo",
    question: "Do you guarantee #1 rankings on Google?",
    answer: "No ethical agency can guarantee specific #1 positions because Google's algorithm evaluates hundreds of dynamic variables. However, we guarantee strict white-hat execution, vetted publisher quality, Core Web Vitals 95+ scores, and measurable quarterly organic pipeline growth.",
  },
  {
    id: "faq-4",
    category: "web-dev",
    question: "Why does Balaji Prime Media build on Next.js instead of WordPress?",
    answer: "Next.js offers headless server-side rendering, sub-second TTFB, built-in image optimization, and zero database-bloat vulnerabilities. WordPress sites frequently suffer from plugin bloat and slow server response times, which hurt Google Core Web Vitals scores.",
  },
  {
    id: "faq-5",
    category: "pricing",
    question: "What payment methods and currencies do you accept?",
    answer: "We support Stripe, PayPal, Wise, Direct International Wire Transfer (USD, EUR, GBP, AUD), VISA/Mastercard, and UPI for domestic clients. All invoices are provided electronically through our secure Client Portal.",
  },
  {
    id: "faq-6",
    category: "guest-post",
    question: "What is your typical turnaround time (TAT) for guest post placements?",
    answer: "Our standard turnaround time is 7 to 14 business days from article approval to live indexable publication on DR 50-90+ sites. Live links and permanent indexing verification are immediately synced to your reporting dashboard.",
  },
  {
    id: "faq-7",
    category: "pricing",
    question: "Are contracts locked in or can we cancel anytime?",
    answer: "We offer flexible month-to-month retainers for growing startups as well as custom 6-month enterprise growth agreements. There are no hidden exit fees or hostage clauses.",
  },
  {
    id: "faq-8",
    category: "web-dev",
    question: "Do you provide website maintenance and security hardening post-launch?",
    answer: "Yes. Our Website Maintenance service includes 24/7 uptime monitoring, weekly security audits, automated cloud backups, SSL renewals, and fast turnaround for critical bug fixes.",
  },
  {
    id: "faq-9",
    category: "seo",
    question: "How do you report progress and campaign metrics?",
    answer: "We provide 24/7 access to live interactive Google Looker Studio dashboards, automated weekly metric digests via Slack or Email, and bi-weekly growth strategy calls with your dedicated lead strategist.",
  },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({ "faq-1": true, "faq-2": true });

  const toggleItem = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredFaqs = FAQS.filter((item) => {
    return activeCategory === "all" || item.category === activeCategory;
  });

  return (
    <div className="relative min-h-screen bg-[#E9EEF3] text-[#154359] selection:bg-[#154359]/20 selection:text-[#154359]">
      {/* Background Matrix Dots */}
      <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      {/* Top Navbar */}
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* Hero Header */}
      <section className="relative z-10 pt-16 sm:pt-24 pb-12 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-slate-300 text-[11px] font-semibold uppercase tracking-wider text-[#185B7B] shadow-xs mb-4">
          <HelpCircle className="w-3.5 h-3.5 text-[#A068FF]" />
          <span>Knowledge &amp; Clarity</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#154359] mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-sm sm:text-base text-[#475569] max-w-2xl mx-auto leading-relaxed">
          Clear, direct answers about our white-hat search methodology, editorial outreach, Next.js engineering standards, pricing, and client reporting.
        </p>

        {/* Category Filter Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {[
            { id: "all", label: "All Questions" },
            { id: "seo", label: "SEO & Rankings" },
            { id: "guest-post", label: "Guest Posting & Outreach" },
            { id: "web-dev", label: "Next.js Web Dev" },
            { id: "pricing", label: "Pricing & Retainers" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-[#154359] text-white shadow-sm"
                  : "bg-white/80 text-[#475569] hover:bg-white border border-slate-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* FAQ Accordion List */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pb-20">
        <div className="space-y-3.5">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = !!openIds[faq.id];
              return (
                <div
                  key={faq.id}
                  className="bg-white/90 backdrop-blur-sm border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/60 transition-colors"
                  >
                    <span className="text-sm sm:text-base font-semibold text-[#154359] tracking-tight">
                      {faq.question}
                    </span>
                    <span
                      className={`w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0 transition-transform duration-200 text-[#154359] ${
                        isOpen ? "rotate-180 bg-[#154359] text-white" : ""
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-[#475569] leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-white/70 rounded-2xl border border-slate-200">
              <p className="text-sm text-[#475569]">No questions in this category.</p>
              <button
                onClick={() => {
                  setActiveCategory("all");
                }}
                className="mt-3 text-xs font-semibold text-[#185B7B] hover:underline cursor-pointer"
              >
                View all questions
              </button>
            </div>
          )}
        </div>

        {/* Quick CTA Card */}
        <div className="mt-14 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#185B7B] block mb-1">
              Have a specific question?
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-[#154359]">
              Talk directly with our lead growth strategist.
            </h3>
            <p className="text-xs sm:text-sm text-[#475569] mt-1">
              We respond to inquiries within 5 minutes on WhatsApp &amp; Email.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://wa.me/917690868932"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-[#25D366] text-white text-xs font-bold hover:bg-[#20ba59] transition-all shadow-xs flex items-center gap-1.5 cursor-pointer hover:scale-105"
            >
              <span>WhatsApp Direct</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
