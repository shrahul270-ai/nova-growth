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
    <div className="relative min-h-screen bg-gradient-to-b from-[#0a0522] via-[#070319] to-[#040112] text-white selection:bg-[#A068FF] selection:text-white">
      {/* Background Matrix Dots */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(160,104,255,0.12)_1px,transparent_1px)] [background-size:24px_24px] opacity-70 pointer-events-none" />

      {/* Top Navbar */}
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* Hero Header */}
      <section className="relative z-10 pt-20 sm:pt-28 pb-12 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-purple-500/30 text-[11px] font-semibold uppercase tracking-wider text-purple-300 shadow-xs mb-4">
          <LifeBuoy className="w-3.5 h-3.5 text-cyan-400" />
          <span>Knowledge Base &amp; Client Assistance</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
          Balaji Prime Media Help Center
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Find onboarding documentation, dashboard instructions, billing FAQs, and direct engineering escalation paths.
        </p>

        {/* Global Search */}
        <div className="mt-8 max-w-xl mx-auto relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search help topics (e.g. Looker Studio, GSC access, invoices)..."
            className="w-full pl-11 pr-4 py-3.5 text-xs sm:text-sm rounded-full bg-white/[0.06] border border-white/15 focus:border-[#A068FF] focus:outline-none transition-all text-white placeholder-slate-400 shadow-sm"
          />
        </div>
      </section>

      {/* 4 Core Category Cards */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-8 text-center sm:text-left">
          Knowledge Base Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className="bg-[#0c0727]/90 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-purple-500/25 shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#A068FF] to-[#38bdf8] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {cat.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {cat.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Key Guides:
                  </span>
                  <ul className="space-y-2">
                    {cat.articles.map((art, aIdx) => (
                      <li key={aIdx}>
                        <Link
                          href="/contact"
                          className="text-xs text-cyan-300 hover:text-white hover:underline flex items-center justify-between group py-0.5"
                        >
                          <span>{art}</span>
                          <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-cyan-300 transition-transform group-hover:translate-x-0.5" />
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
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-8 text-center sm:text-left">
          Direct Escalation &amp; Priority Ticket
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Direct Support Channels */}
          <div className="lg:col-span-5 bg-[#0c0727]/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-purple-500/25 shadow-lg space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#A068FF] block mb-1">
                Direct Escalation
              </span>
              <h3 className="text-xl font-bold text-white">
                Live Client Support Channels
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Operating across US, UK &amp; Australian business hours for enterprise SLA clients.
              </p>
            </div>

            <div className="space-y-3.5">
              {/* WhatsApp Card */}
              <a
                href="https://wa.me/917690868932"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 hover:bg-[#25D366]/15 hover:border-[#25D366]/40 transition-all group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-[#25D366]">
                    WhatsApp Lead Support
                  </div>
                  <div className="text-[11px] text-slate-400">+91 76908 68932 (Under 5-min response)</div>
                </div>
              </a>

              {/* Email Card */}
              <a
                href="mailto:support@balajiprimemedia.in"
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 hover:bg-sky-500/15 hover:border-sky-500/40 transition-all group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-[#EA4335] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-sky-300">
                    Email Desk
                  </div>
                  <div className="text-[11px] text-slate-400">support@balajiprimemedia.in</div>
                </div>
              </a>

              {/* Client Portal Card */}
              <Link
                href="/pay"
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 hover:bg-purple-500/15 hover:border-purple-500/40 transition-all group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#A068FF] to-[#38bdf8] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-purple-300">
                    Client Portal &amp; Invoices
                  </div>
                  <div className="text-[11px] text-slate-400">Manage retainers, receipts &amp; payments</div>
                </div>
              </Link>
            </div>
          </div>

          {/* Right: Submit Support Ticket Form */}
          <div className="lg:col-span-7 bg-[#0c0727]/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-purple-500/25 shadow-lg">
            <h3 className="text-lg font-bold text-white mb-1">
              Submit a Support Request
            </h3>
            <p className="text-xs text-slate-400 mb-5">
              Fill out this ticket and our engineering or campaign strategist will reply within 2 hours.
            </p>

            {isSent ? (
              <div className="text-center py-10 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white">Support Ticket Created!</h4>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  We have logged your ticket in our priority queue. A strategist will contact you via email shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSent(false);
                    setTicketMessage("");
                  }}
                  className="mt-2 text-xs font-semibold text-[#A068FF] hover:underline cursor-pointer"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleTicketSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={ticketName}
                      onChange={(e) => setTicketName(e.target.value)}
                      placeholder="e.g. Jordan Smith"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-white/[0.06] border border-white/15 focus:outline-none focus:border-[#A068FF] text-white placeholder-slate-400 shadow-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={ticketEmail}
                      onChange={(e) => setTicketEmail(e.target.value)}
                      placeholder="jordan@company.com"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-white/[0.06] border border-white/15 focus:outline-none focus:border-[#A068FF] text-white placeholder-slate-400 shadow-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Subject / Topic
                  </label>
                  <input
                    type="text"
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    placeholder="e.g. Looker Studio dashboard access or link indexing question"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-white/[0.06] border border-white/15 focus:outline-none focus:border-[#A068FF] text-white placeholder-slate-400 shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Issue Details / Description *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={ticketMessage}
                    onChange={(e) => setTicketMessage(e.target.value)}
                    placeholder="Provide website domain, specific question, or description of assistance needed..."
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-white/[0.06] border border-white/15 focus:outline-none focus:border-[#A068FF] text-white placeholder-slate-400 shadow-xs"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#A068FF] to-[#7c3aed] hover:from-[#8f52ff] hover:to-[#6d28d9] text-white text-xs sm:text-sm font-bold transition-all shadow-lg shadow-purple-950/60 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting ticket...</span>
                  ) : (
                    <>
                      <span>Submit Priority Ticket</span>
                      <Send className="w-3.5 h-3.5" />
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
