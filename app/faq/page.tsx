"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { Plus, Minus, HelpCircle, ArrowRight } from "lucide-react";

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
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredFaqs = FAQS.filter((item) => {
    return activeCategory === "all" || item.category === activeCategory;
  });

  return (
    <div className="relative min-h-screen bg-[#07030d] text-white selection:bg-[#681fe4] selection:text-white font-satoshi bg-grid-white-240">
      {/* Top Navbar */}
      <div className="relative z-50 bg-[#07030d]/90 backdrop-blur-md">
        <Navbar />
      </div>

      {/* Hero Header */}
      <section className="relative z-10 pt-32 sm:pt-40 pb-16 max-w-5xl mx-auto px-4 sm:px-6 text-center border-b border-white/10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[2px] bg-white/5 border border-white/10 text-xs font-bebas tracking-[0.2em] uppercase text-[#681fe4] mb-4">
          <HelpCircle className="w-3.5 h-3.5 text-[#681fe4]" />
          <span>KNOWLEDGE &amp; CLARITY // FAQ</span>
        </div>

        <h1 className="font-bebas text-4xl sm:text-6xl md:text-7xl tracking-[0.16em] uppercase text-white mb-4 leading-none">
          FREQUENTLY ASKED <span className="text-[#681fe4]">QUESTIONS</span>
        </h1>
        <p className="font-satoshi text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed font-normal">
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
              className={`px-4 py-2 rounded-[4px] text-xs font-bebas tracking-[0.14em] uppercase transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-[#681fe4] text-white shadow-[0_4px_14px_rgba(104,31,228,0.35)]"
                  : "bg-white/5 text-neutral-300 hover:text-white border border-white/10 hover:bg-white/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* FAQ Accordion List */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="font-bebas text-2xl sm:text-3xl text-white tracking-[0.16em] uppercase mb-8 text-center sm:text-left">
          AGENCY SEARCH &amp; DEVELOPMENT FAQS
        </h2>
        <div className="space-y-3.5">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = !!openIds[faq.id];
              return (
                <div
                  key={faq.id}
                  className="bg-[#0c0818] border border-white/10 rounded-[4px] shadow-lg overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                  >
                    <span className="text-sm sm:text-base font-semibold text-white tracking-tight">
                      {faq.question}
                    </span>
                    <span
                      className={`w-7 h-7 rounded-[2px] flex items-center justify-center shrink-0 border transition-all duration-300 ${
                        isOpen
                          ? "bg-[#681fe4] text-white border-[#681fe4] rotate-180"
                          : "bg-white/5 text-neutral-400 border-white/10 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                      )}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-white/5 font-normal">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-[#0c0818] rounded-[4px] border border-white/10">
              <p className="text-sm text-neutral-400 font-satoshi">No questions in this category.</p>
              <button
                onClick={() => {
                  setActiveCategory("all");
                }}
                className="mt-3 text-xs font-bebas tracking-[0.14em] uppercase text-[#681fe4] hover:underline cursor-pointer"
              >
                View all questions
              </button>
            </div>
          )}
        </div>

        {/* Quick CTA Card */}
        <div className="mt-14 bg-[#0c0818] rounded-[4px] p-6 sm:p-8 border border-white/10 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <span className="font-bebas text-xs tracking-[0.2em] uppercase text-[#681fe4] block mb-1">
              HAVE A SPECIFIC QUESTION?
            </span>
            <h3 className="font-bebas text-xl sm:text-2xl text-white tracking-[0.12em] uppercase">
              Talk directly with our lead growth strategist.
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 font-normal font-satoshi">
              We respond to inquiries within 5 minutes on WhatsApp &amp; Email.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://wa.me/917690868932"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-[4px] bg-[#681fe4] hover:bg-[#5815cb] text-white text-xs font-bebas tracking-[0.16em] uppercase transition-all shadow-[0_4px_14px_rgba(104,31,228,0.3)] flex items-center gap-2 cursor-pointer"
            >
              <span>WHATSAPP DIRECT</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
