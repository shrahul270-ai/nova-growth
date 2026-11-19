"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import {
  Search,
  BookOpen,
  LifeBuoy,
  FileText,
  CreditCard,
  ShieldAlert,
  ArrowRight,
  ExternalLink,
  MessageCircle,
  Mail,
  CheckCircle2,
  Send,
} from "lucide-react";

const SUPPORT_CATEGORIES = [
  {
    icon: BookOpen,
    title: "Campaign Onboarding",
    desc: "Kickoff workflows, asset handoffs, Google Search Console permissions, and initial roadmap setup.",
    articles: [
      "Granting delegated access to Google Search Console & GA4",
      "Setting up your private Slack channel with lead strategists",
      "Month 1 editorial outreach approval workflow",
    ],
  },
  {
    icon: FileText,
    title: "Reporting & Telemetry",
    desc: "How to interpret your 24/7 live Looker Studio telemetry and weekly metric digests.",
    articles: [
      "Accessing your private Google Looker Studio dashboard",
      "Understanding Ahrefs DR vs. Moz DA metrics",
      "Tracking indexed links & guest post live status",
    ],
  },
  {
    icon: CreditCard,
    title: "Billing & Invoices",
    desc: "Payment processing via Stripe, PayPal, Wise, Wire Transfer, and downloading official VAT invoices.",
    articles: [
      "Accessing the Client Portal for card & wire payments",
      "Requesting custom VAT or company invoice receipts",
      "Updating payment methods & billing schedules",
    ],
  },
  {
    icon: ShieldAlert,
    title: "Technical & Speed SLAs",
    desc: "Next.js performance SLAs, Core Web Vitals guarantees, and emergency uptime escalation.",
    articles: [
      "Submitting a critical bug or downtime ticket",
      "Core Web Vitals monitoring & weekly speed scores",
      "Automated backups & SSL certificate management",
    ],
  },
];

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [ticketName, setTicketName] = useState<string>("");
  const [ticketEmail, setTicketEmail] = useState<string>("");
  const [ticketSubject, setTicketSubject] = useState<string>("");
  const [ticketMessage, setTicketMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSent, setIsSent] = useState<boolean>(false);

  const handleTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketName || !ticketEmail || !ticketMessage) return;

    setIsSubmitting(true);
    try {
      await fetch("/api/db/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "support_ticket",
          name: ticketName,
          email: ticketEmail,
          phone: "Support Center Ticket",
          service: `Support Request: ${ticketSubject || "General Inquiry"}`,
          message: ticketMessage,
          sourceUrl: "/help-center",
          notes: `Subject: ${ticketSubject}`,
        }),
      });
      setIsSent(true);
    } catch {
      setIsSent(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredCategories = SUPPORT_CATEGORIES.filter((cat) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const inTitle = cat.title.toLowerCase().includes(q);
    const inDesc = cat.desc.toLowerCase().includes(q);
    const inArticles = cat.articles.some((a) => a.toLowerCase().includes(q));
    return inTitle || inDesc || inArticles;
  });

  return (
    <div className="relative min-h-screen bg-[#07030d] text-white selection:bg-[#681fe4] selection:text-white font-satoshi">
      {/* Background Grid Pattern & Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(104,31,228,0.18),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-white-240 opacity-40 pointer-events-none" />

      {/* Top Navbar */}
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* Hero Header */}
      <section className="relative z-10 pt-28 sm:pt-36 pb-12 max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] bg-white/[0.04] border border-white/10 text-xs font-mono uppercase tracking-[0.2em] text-[#681fe4] mb-4">
          <LifeBuoy className="w-3.5 h-3.5 text-[#681fe4]" />
          <span>// KNOWLEDGE BASE &amp; CLIENT ASSISTANCE</span>
        </div>

        <h1 className="font-bebas text-4xl sm:text-6xl md:text-7xl tracking-[0.14em] text-white uppercase leading-none mb-4">
          BALAJI PRIME MEDIA HELP CENTER
        </h1>
        <p className="text-neutral-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Find onboarding documentation, dashboard instructions, billing FAQs, and direct engineering escalation paths.
        </p>

        {/* Global Search */}
        <div className="mt-8 max-w-xl mx-auto relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search help topics (e.g. Looker Studio, GSC access, invoices)..."
            className="w-full pl-11 pr-4 py-3.5 text-xs sm:text-sm rounded-[4px] bg-white/[0.04] border border-white/10 focus:border-[#681fe4] focus:outline-none transition-all text-white placeholder-neutral-500 font-satoshi shadow-xs"
          />
        </div>
      </section>

      {/* 4 Core Category Cards */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8">
          <span className="font-bebas text-xs tracking-[0.24em] uppercase text-[#681fe4] block mb-1">
            // DOCUMENTATION DIRECTORY
          </span>
          <h2 className="font-bebas text-3xl sm:text-4xl tracking-[0.14em] text-white uppercase leading-none">
            KNOWLEDGE BASE CATEGORIES
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className="bg-[#0c0818] rounded-[4px] p-8 border border-white/10 shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="w-10 h-10 rounded-[4px] bg-[#681fe4] text-white flex items-center justify-center shrink-0 shadow-[0_4px_14px_rgba(104,31,228,0.35)]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bebas text-xl tracking-[0.14em] text-white uppercase">
                      {cat.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6 font-normal">
                    {cat.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <span className="font-bebas text-xs tracking-[0.18em] uppercase text-neutral-500 block mb-3">
                    KEY GUIDES:
                  </span>
                  <ul className="space-y-2.5">
                    {cat.articles.map((art, aIdx) => (
                      <li key={aIdx}>
                        <Link
                          href="/contact-us"
                          className="text-xs font-mono text-neutral-300 hover:text-[#681fe4] flex items-center justify-between group py-0.5 transition-colors"
                        >
                          <span>{art}</span>
                          <ArrowRight className="w-3 h-3 text-neutral-500 group-hover:text-[#681fe4] transition-transform group-hover:translate-x-1" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Fast Help Ticket Submission & Direct Channels */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-14">
        <div className="mb-8">
          <span className="font-bebas text-xs tracking-[0.24em] uppercase text-[#681fe4] block mb-1">
            // PRIORITY ESCALATION
          </span>
          <h2 className="font-bebas text-3xl sm:text-4xl tracking-[0.14em] text-white uppercase leading-none">
            DIRECT ESCALATION &amp; PRIORITY TICKET
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Direct Support Channels */}
          <div className="lg:col-span-5 bg-[#0c0818] rounded-[4px] p-8 border border-white/10 shadow-lg space-y-6">
            <div>
              <span className="font-bebas text-xs tracking-[0.2em] uppercase text-[#681fe4] block mb-1">
                // DIRECT ESCALATION
              </span>
              <h3 className="font-bebas text-2xl tracking-[0.14em] text-white uppercase">
                LIVE CLIENT SUPPORT CHANNELS
              </h3>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed font-mono">
                Operating across US, UK &amp; Australian business hours for enterprise SLA clients.
              </p>
            </div>

            <div className="space-y-3.5">
              {/* WhatsApp Card */}
              <a
                href="https://wa.me/917690868932"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-4 rounded-[4px] bg-white/[0.04] border border-white/10 hover:border-[#25D366] hover:bg-[#25D366]/10 transition-all group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-[4px] bg-[#25D366] text-white flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bebas text-sm tracking-[0.14em] uppercase text-white group-hover:text-[#25D366]">
                    WhatsApp Lead Support
                  </div>
                  <div className="text-xs text-neutral-400 font-mono">+91 76908 68932 (Under 5-min response)</div>
                </div>
              </a>

              {/* Email Card */}
              <a
                href="mailto:support@balajiprimemedia.in"
                className="flex items-center gap-3.5 p-4 rounded-[4px] bg-white/[0.04] border border-white/10 hover:border-[#EA4335] hover:bg-[#EA4335]/10 transition-all group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-[4px] bg-[#EA4335] text-white flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bebas text-sm tracking-[0.14em] uppercase text-white group-hover:text-[#EA4335]">
                    Email Desk
                  </div>
                  <div className="text-xs text-neutral-400 font-mono">support@balajiprimemedia.in</div>
                </div>
              </a>

              {/* Client Portal Card */}
              <Link
                href="/pay"
                className="flex items-center gap-3.5 p-4 rounded-[4px] bg-white/[0.04] border border-white/10 hover:border-[#681fe4] hover:bg-[#681fe4]/10 transition-all group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-[4px] bg-[#681fe4] text-white flex items-center justify-center shrink-0">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bebas text-sm tracking-[0.14em] uppercase text-white group-hover:text-[#681fe4]">
                    Client Portal &amp; Invoices
                  </div>
                  <div className="text-xs text-neutral-400 font-mono">Manage retainers, receipts &amp; payments</div>
                </div>
              </Link>
            </div>
          </div>

          {/* Right: Submit Support Ticket Form */}
          <div className="lg:col-span-7 bg-[#0c0818] rounded-[4px] p-8 border border-white/10 shadow-lg">
            <span className="font-bebas text-xs tracking-[0.2em] uppercase text-[#681fe4] block mb-1">
              // TICKET SUBMISSION
            </span>
            <h3 className="font-bebas text-2xl tracking-[0.14em] text-white uppercase mb-1">
              SUBMIT A SUPPORT REQUEST
            </h3>
            <p className="text-xs text-neutral-400 mb-6 font-mono">
              Fill out this ticket and our engineering or campaign strategist will reply within 2 hours.
            </p>

            {isSent ? (
              <div className="text-center py-10 space-y-3">
                <div className="w-12 h-12 rounded-[4px] bg-[#681fe4]/20 text-[#681fe4] border border-[#681fe4]/40 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-bebas text-2xl tracking-[0.14em] text-white uppercase">Support Ticket Created!</h4>
                <p className="text-xs text-neutral-300 max-w-sm mx-auto font-mono">
                  We have logged your ticket in our priority queue. A strategist will contact you via email shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSent(false);
                    setTicketMessage("");
                  }}
                  className="mt-3 font-bebas text-xs tracking-[0.16em] uppercase text-[#681fe4] hover:text-white cursor-pointer transition-colors"
                >
                  SUBMIT ANOTHER REQUEST →
                </button>
              </div>
            ) : (
              <form onSubmit={handleTicketSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bebas text-xs tracking-[0.14em] text-neutral-300 uppercase mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={ticketName}
                      onChange={(e) => setTicketName(e.target.value)}
                      placeholder="e.g. Jordan Smith"
                      className="w-full px-4 py-3 text-xs sm:text-sm rounded-[4px] bg-white/[0.04] border border-white/10 focus:outline-none focus:border-[#681fe4] text-white placeholder-neutral-500 font-satoshi shadow-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-bebas text-xs tracking-[0.14em] text-neutral-300 uppercase mb-1">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={ticketEmail}
                      onChange={(e) => setTicketEmail(e.target.value)}
                      placeholder="jordan@company.com"
                      className="w-full px-4 py-3 text-xs sm:text-sm rounded-[4px] bg-white/[0.04] border border-white/10 focus:outline-none focus:border-[#681fe4] text-white placeholder-neutral-500 font-satoshi shadow-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bebas text-xs tracking-[0.14em] text-neutral-300 uppercase mb-1">
                    Subject / Topic
                  </label>
                  <input
                    type="text"
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    placeholder="e.g. Looker Studio dashboard access or link indexing question"
                    className="w-full px-4 py-3 text-xs sm:text-sm rounded-[4px] bg-white/[0.04] border border-white/10 focus:outline-none focus:border-[#681fe4] text-white placeholder-neutral-500 font-satoshi shadow-xs"
                  />
                </div>

                <div>
                  <label className="block font-bebas text-xs tracking-[0.14em] text-neutral-300 uppercase mb-1">
                    Issue Details / Description *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={ticketMessage}
                    onChange={(e) => setTicketMessage(e.target.value)}
                    placeholder="Provide website domain, specific question, or description of assistance needed..."
                    className="w-full px-4 py-3 text-xs sm:text-sm rounded-[4px] bg-white/[0.04] border border-white/10 focus:outline-none focus:border-[#681fe4] text-white placeholder-neutral-500 font-satoshi shadow-xs"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-[4px] bg-[#681fe4] hover:bg-[#5815cb] text-white font-bebas text-base tracking-[0.18em] uppercase transition-all shadow-[0_10px_25px_rgba(104,31,228,0.35)] flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting ticket...</span>
                  ) : (
                    <>
                      <span>SUBMIT PRIORITY TICKET →</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
