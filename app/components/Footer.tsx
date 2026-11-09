"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  // Pre-formatted direct email link with client details template
  const emailInquiryHref =
    "mailto:support@balajiprimemedia.in?subject=" +
    encodeURIComponent("New Inquiry - Balaji Prime Media") +
    "&body=" +
    encodeURIComponent(
      "Hello Balaji Prime Media,\n\nClient Details:\n• Full Name: \n• Business Email: \n• Phone / WhatsApp: \n• Website Domain: \n• Service Interested: \n• Estimated Budget: \n\nMessage / Requirements:\n"
    );

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setLoading(true);
    try {
      await fetch("/api/db/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "newsletter",
          email: email,
          name: "Newsletter Subscriber",
          service: "Weekly SEO & Digital Growth Insights",
          sourceUrl: typeof window !== "undefined" ? window.location.pathname : "/",
          message: "User subscribed to Balaji Prime Media newsletter via footer form.",
        }),
      });
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    } catch {
      setSubscribed(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#0a0522] via-[#070319] to-[#040112] text-white font-shipcraft z-10 overflow-hidden border-t border-purple-500/20">
      {/* Subtle glowing violet dot matrix grid */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(160,104,255,0.12)_1px,transparent_1px)] [background-size:24px_24px] opacity-70 pointer-events-none" />

      {/* Ambient luxury violet, indigo & purple aurora glows */}
      <div
        aria-hidden="true"
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(160,104,255,0.16)_0%,transparent_70%)] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-40 left-0 w-[500px] h-[350px] bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.14)_0%,transparent_70%)] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-40 right-0 w-[500px] h-[350px] bg-[radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.16)_0%,transparent_70%)] pointer-events-none"
      />

      {/* Floating Free AI Audit Right Tab */}
      <Link
        href="/audit"
        className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-40 text-white py-3.5 px-2 rounded-l-xl shadow-[0_0_24px_rgba(160,104,255,0.4)] items-center gap-1.5 transition-all text-xs font-black tracking-wider uppercase [writing-mode:vertical-rl] rotate-180 hover:px-2.5 cursor-pointer border-l border-t border-b border-[#a855f7]/50"
        style={{
          background: "linear-gradient(to bottom, #7c3aed, #4f46e5)",
        }}
        title="Analyze your website speed, ranking & SEO score for free"
      >
        <span className="rotate-90 text-[#fcd34d] text-sm">✦</span>
        <span>FREE AI AUDIT</span>
      </Link>

      {/* MAIN FOOTER: 4-Column Grid */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-14 sm:pt-16 pb-12">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* COLUMN 1: Brand & Direct Contact (span 4) */}
          <div className="lg:col-span-4 space-y-4 text-left animate-shipcraft-col-1">
            {/* Brand Logo */}
            <Link href="/" className="inline-flex items-center group">
              <Image
                src="/images/bpm-complete-logo.png"
                alt="BPM - Digital Growth & SEO Agency"
                width={240}
                height={225}
                className="h-16 sm:h-20 w-auto object-contain group-hover:scale-105 transition-transform duration-300 filter drop-shadow-[0_4px_24px_rgba(160,104,255,0.5)]"
              />
            </Link>

            {/* Pill with Media Gradient Border */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-slate-200 text-[11px] font-medium shadow-xs backdrop-blur-xs">
              <span className="text-[10px] text-[#A068FF]">✦</span>
              <span>Full-Funnel Organic Growth Engine</span>
            </div>

            {/* Agency Positioning & Blurb */}
            <p className="text-[12.5px] leading-relaxed text-slate-300">
              Balaji Prime Media is a specialized digital growth agency helping US, UK &amp; global businesses scale organic search revenue through manual DR 50–90+ editorial outreach, technical Core Web Vitals optimization, and high-converting Next.js web engineering.
            </p>

            {/* Direct Contact Information */}
            <div className="pt-2">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-white mb-2.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A068FF]" />
                CONTACT INFORMATION
              </h4>
              <ul className="space-y-2 text-[12.5px] text-slate-300">
                <li className="flex items-center gap-2.5">
                  <span className="text-[#EA4335] text-xs shrink-0">
                    <svg className="w-3.5 h-3.5 fill-currentColor inline-block" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </span>
                  <a
                    href={emailInquiryHref}
                    className="hover:text-white text-slate-300 transition-colors font-medium break-all"
                    title="Send inquiry with formatted project details"
                  >
                    support@balajiprimemedia.in
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-[#25D366] text-xs shrink-0">
                    <svg className="w-3.5 h-3.5 fill-currentColor inline-block" viewBox="0 0 24 24">
                      <path d="M12.04 2C6.527 2 2.05 6.477 2.05 11.99c0 1.954.563 3.778 1.536 5.32L2 22l4.832-1.53c1.482.88 3.208 1.39 5.208 1.39 5.513 0 9.99-4.477 9.99-9.99C22.03 6.477 17.553 2 12.04 2z" />
                    </svg>
                  </span>
                  <a
                    href="https://wa.me/917690868932"
                    target="_blank"
                    rel="opener"
                    className="hover:text-white text-slate-300 transition-colors font-medium"
                  >
                    +91 76908 68932 (WhatsApp &amp; Direct)
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#A068FF] text-xs shrink-0 mt-0.5">📍</span>
                  <span className="text-slate-400">Serving US, UK, Australia, EU &amp; Worldwide Clients</span>
                </li>
              </ul>
            </div>
          </div>

          {/* COLUMN 2: NAVBAR PAGES (span 3) */}
          <div className="lg:col-span-3 space-y-4 text-left animate-shipcraft-col-2">
            <h4 className="text-[12px] font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A068FF]" />
              Navigation
            </h4>
            <ul className="space-y-2 text-[13px] text-slate-300">
              <li>
                <Link
                  href="/"
                  className="hover:text-white transition-colors flex items-center justify-between group py-0.5"
                >
                  <span>Home</span>
                  <span className="text-slate-500 group-hover:text-[#A068FF] text-xs transition-colors">→</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/guest-posting"
                  className="hover:text-white transition-colors flex items-center justify-between group py-0.5"
                >
                  <span className="flex items-center gap-1.5">
                    <span>Guest Posting</span>
                    <span className="text-[9.5px] font-bold bg-[#A068FF]/20 text-[#d8b4fe] border border-[#A068FF]/30 px-1.5 py-0.2 rounded-full">
                      DR 50+
                    </span>
                  </span>
                  <span className="text-slate-500 group-hover:text-[#A068FF] text-xs transition-colors">→</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-white transition-colors flex items-center justify-between group py-0.5"
                >
                  <span>Services</span>
                  <span className="text-slate-500 group-hover:text-[#A068FF] text-xs transition-colors">→</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="hover:text-white transition-colors flex items-center justify-between group py-0.5"
                >
                  <span>Projects &amp; Case Studies</span>
                  <span className="text-slate-500 group-hover:text-[#A068FF] text-xs transition-colors">→</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-white transition-colors flex items-center justify-between group py-0.5"
                >
                  <span>Blogs &amp; Insights</span>
                  <span className="text-slate-500 group-hover:text-[#A068FF] text-xs transition-colors">→</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors flex items-center justify-between group py-0.5"
                >
                  <span>About Us</span>
                  <span className="text-slate-500 group-hover:text-[#A068FF] text-xs transition-colors">→</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="hover:text-white transition-colors flex items-center justify-between group py-0.5"
                >
                  <span>Contact Us</span>
                  <span className="text-slate-500 group-hover:text-[#A068FF] text-xs transition-colors">→</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/pay"
                  className="hover:text-white transition-colors flex items-center justify-between group py-0.5"
                >
                  <span className="flex items-center gap-1.5 font-medium text-[#c4b5fd]">
                    <span>Payment</span>
                    <span className="text-xs">💳</span>
                  </span>
                  <span className="text-slate-500 group-hover:text-[#A068FF] text-xs transition-colors">→</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: SUPPORT & INTERACTIVE PAGES (span 2) */}
          <div className="lg:col-span-2 space-y-4 text-left animate-shipcraft-col-3">
            <h4 className="text-[12px] font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A068FF]" />
              Support &amp; More
            </h4>
            <ul className="space-y-2 text-[13px] text-slate-300">
              <li>
                <Link
                  href="/faq"
                  className="hover:text-white transition-colors flex items-center justify-between group py-0.5 font-medium"
                >
                  <span>FAQ</span>
                  <span className="text-slate-500 group-hover:text-[#A068FF] text-xs transition-colors">→</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/feedback"
                  className="hover:text-white transition-colors flex items-center justify-between group py-0.5 font-medium"
                >
                  <span>Feedback</span>
                  <span className="text-slate-500 group-hover:text-[#A068FF] text-xs transition-colors">→</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/schedule-meeting"
                  className="hover:text-amber-300 transition-colors flex items-center justify-between group py-0.5 font-medium text-amber-400"
                >
                  <span>Schedule Meeting</span>
                  <span className="text-xs">📅</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/help-center"
                  className="hover:text-white transition-colors flex items-center justify-between group py-0.5 font-medium"
                >
                  <span>Help Center</span>
                  <span className="text-slate-500 group-hover:text-[#A068FF] text-xs transition-colors">→</span>
                </Link>
              </li>
              <li className="pt-1 border-t border-white/10">
                <Link href="/privacy-policy" className="hover:text-white transition-colors block py-0.5 text-xs text-slate-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors block py-0.5 text-xs text-slate-400">
                  Terms of Service
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.dispatchEvent(new Event("open-cookie-settings"));
                    }
                  }}
                  className="hover:text-white transition-colors text-left cursor-pointer flex items-center gap-1.5 py-0.5 text-xs text-slate-400"
                >
                  <span>Cookie Preferences</span>
                  <span className="text-[11px] text-amber-400">🍪</span>
                </button>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: NEWSLETTER & FREE AUDIT (span 3) */}
          <div className="lg:col-span-3 space-y-5 text-left animate-shipcraft-col-4">
            {/* Newsletter */}
            <div>
              <h4 className="text-[12px] font-bold uppercase tracking-wider text-white mb-1">
                Subscribe to our newsletter
              </h4>
              <p className="text-[11.5px] text-slate-300 mb-2.5">
                Shipcraft keeps every surface in sync, so you never rebuild from scratch.
              </p>
              <form onSubmit={handleSubscribe} className="relative flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@shipcraft.example"
                  required
                  className="w-full pl-3.5 pr-12 py-2.5 text-xs rounded-xl bg-white/[0.06] border border-white/15 focus:border-[#A068FF] focus:outline-none text-white placeholder-slate-400 shadow-xs transition-colors"
                />
                <button
                  type="submit"
                  disabled={loading}
                  aria-label="Subscribe to newsletter"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 text-white font-bold w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer disabled:opacity-50 transition-all bg-[#A068FF] hover:bg-[#8b46ff] shadow-sm hover:scale-105"
                >
                  {loading ? (
                    <span className="text-xs">⋯</span>
                  ) : (
                    <span className="text-sm font-black leading-none text-white">→</span>
                  )}
                </button>
              </form>
              {subscribed ? (
                <p className="text-[11px] text-emerald-400 font-semibold mt-1.5 flex items-center gap-1">
                  <span>✓ Subscribed to Balaji Prime Media!</span>
                </p>
              ) : (
                <p className="text-[10px] text-slate-400 mt-1.5">
                  Unsubscribe anytime. Zero spam policy.
                </p>
              )}
            </div>

            {/* Instant Free SEO Audit Card */}
            <div className="bg-white/[0.04] border border-white/10 rounded-xl p-3.5 space-y-2 shadow-sm backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-white uppercase tracking-wider flex items-center gap-1">
                  <span className="text-amber-400">⚡</span> Free Instant SEO Audit
                </span>
                <span className="text-[10px] bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-bold px-1.5 py-0.5 rounded">
                  Live
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Check your website speed, Core Web Vitals, and search visibility in 10 seconds.
              </p>
              <Link
                href="/audit"
                className="block w-full text-center py-2 rounded-lg text-[11px] font-bold cursor-pointer transition-all bg-gradient-to-r from-[#A068FF] to-[#7c3aed] hover:from-[#8f52ff] hover:to-[#6d28d9] text-white shadow-xs"
              >
                Run Free Website Audit ↗
              </Link>
            </div>
          </div>
        </div>

        {/* BOTTOM STRIP: PAYMENT ACCEPTED & SOCIAL ICONS */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* We Accept Payment Icons */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
            <span className="font-bold text-white text-xs mr-1">We accept:</span>
            <span className="px-2.5 py-1 bg-white/[0.06] rounded-md border border-white/10 text-[11px] font-bold text-slate-200 shadow-xs">
              stripe
            </span>
            <span className="px-2.5 py-1 bg-white/[0.06] rounded-md border border-white/10 text-[11px] font-bold text-[#38bdf8] shadow-xs">
              PayPal
            </span>
            <span className="px-2.5 py-1 bg-white/[0.06] rounded-md border border-white/10 text-[11px] font-bold text-[#38bdf8] shadow-xs">
              Wise
            </span>
            <span className="px-2.5 py-1 bg-white/[0.06] rounded-md border border-white/10 text-[10px] font-bold text-slate-300 shadow-xs">
              Wire Transfer
            </span>
            <span className="px-2.5 py-1 bg-white/[0.06] rounded-md border border-white/10 text-[11px] font-black text-white italic shadow-xs">
              VISA
            </span>
            <span className="px-2.5 py-1 bg-white/[0.06] rounded-md border border-white/10 flex items-center gap-0.5 shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#eb001b] inline-block -mr-1" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#f79e1b] inline-block opacity-85" />
            </span>
            <span className="px-2.5 py-1 bg-white/[0.06] rounded-md border border-white/10 text-[10px] font-black text-[#c084fc] shadow-xs">
              UPI
            </span>
            <span className="px-2.5 py-1 bg-white/[0.06] rounded-md border border-white/10 text-[10px] font-bold text-[#93c5fd] shadow-xs">
              ACH Transfer
            </span>
          </div>

          {/* Social Outline Icons with Real Official Brand Colors */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* WhatsApp */}
            <a
              href="https://wa.me/917690868932"
              target="_blank"
              rel="opener"
              className="w-8 h-8 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center transition-all shadow-sm hover:scale-110"
              aria-label="Direct WhatsApp Support"
              title="WhatsApp Balaji Prime Media (+91 76908 68932)"
            >
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <path d="M12.04 2C6.527 2 2.05 6.477 2.05 11.99c0 1.954.563 3.778 1.536 5.32L2 22l4.832-1.53c1.482.88 3.208 1.39 5.208 1.39 5.513 0 9.99-4.477 9.99-9.99C22.03 6.477 17.553 2 12.04 2zm5.432 12.382c-.301-.15-1.782-.879-2.057-.979-.276-.1-.476-.15-.676.15-.2.301-.776.979-.951 1.18-.176.2-.351.226-.652.075-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.675-2.085-.176-.3-.019-.463.132-.612.136-.134.301-.351.451-.527.151-.176.201-.301.301-.501.1-.2.05-.376-.025-.526-.075-.15-.676-1.63-.926-2.233-.244-.588-.492-.508-.676-.517l-.576-.01c-.2 0-.526.075-.802.376-.276.301-1.052 1.028-1.052 2.507 0 1.48 1.077 2.908 1.228 3.109.15.2 2.119 3.235 5.132 4.538.717.31 1.277.495 1.713.633.72.228 1.375.196 1.893.119.578-.086 1.782-.727 2.032-1.429.25-.702.25-1.303.175-1.429-.075-.125-.276-.2-.577-.35z" />
              </svg>
            </a>

            {/* Telegram */}
            <a
              href="https://t.me/balajiprimemedia"
              target="_blank"
              rel="opener"
              className="w-8 h-8 rounded-full bg-[#229ED9] hover:bg-[#1d8ec4] text-white flex items-center justify-center transition-all shadow-sm hover:scale-110"
              aria-label="Telegram"
              title="Telegram Channel"
            >
              <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="opener"
              className="w-8 h-8 rounded-full bg-[#1877F2] hover:bg-[#1464cc] text-white flex items-center justify-center transition-all shadow-sm hover:scale-110"
              aria-label="Facebook"
              title="Facebook"
            >
              <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="opener"
              className="w-8 h-8 rounded-full bg-[#0A66C2] hover:bg-[#084e96] text-white flex items-center justify-center transition-all shadow-sm hover:scale-110"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z" />
              </svg>
            </a>

            {/* X (Twitter) */}
            <a
              href="https://x.com"
              target="_blank"
              rel="opener"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all shadow-sm hover:scale-110 border border-white/15"
              aria-label="X Twitter"
              title="X (Twitter)"
            >
              <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* Threads */}
            <a
              href="https://threads.net"
              target="_blank"
              rel="opener"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all shadow-sm hover:scale-110 border border-white/15"
              aria-label="Threads"
              title="Threads"
            >
              <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 192 192">
                <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.8228C81.4245 64.4079 89.6582 60.7443 97.222 60.7443C97.3069 60.7443 97.3917 60.7443 97.4766 60.745C112.551 60.8413 121.579 70.9209 122.951 89.7891C115.702 88.9481 107.561 88.9841 98.4414 89.9077C68.916 92.8967 52.5447 110.155 53.4776 132.842C54.4105 155.529 72.2471 169.593 96.657 169.593C116.666 169.593 131.795 160.054 138.859 143.149C144.996 156.495 156.983 163.666 172.903 163.666C186.297 163.666 195.965 157.069 200.706 144.722L185.733 138.995C182.981 146.166 177.839 149.666 172.903 149.666C163.097 149.666 157.07 142.721 154.947 129.083C159.083 122.476 161.737 114.774 162.771 106.185L147.284 104.316C146.477 111.026 144.409 117.027 141.077 122.259C136.216 109.845 136.721 98.9207 141.537 88.9883ZM122.656 123.645C118.069 133.091 108.723 138.455 96.5508 138.455C82.8837 138.455 70.3667 131.144 69.6087 112.709C68.9567 96.8834 81.3392 84.4539 99.8821 82.5768C107.502 81.8052 114.996 82.0163 122.096 83.1812C122.695 96.4808 122.882 109.972 122.656 123.645Z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="opener"
              className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center transition-all shadow-sm hover:scale-110"
              aria-label="Instagram"
              title="Instagram"
            >
              <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="opener"
              className="w-8 h-8 rounded-full bg-[#FF0000] hover:bg-[#cc0000] text-white flex items-center justify-center transition-all shadow-sm hover:scale-110"
              aria-label="YouTube"
              title="YouTube"
            >
              <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>

            {/* Direct Email */}
            <a
              href={emailInquiryHref}
              className="w-8 h-8 rounded-full bg-[#EA4335] hover:bg-[#d33828] text-white flex items-center justify-center transition-all shadow-sm hover:scale-110"
              aria-label="Direct Email"
              title="Email Balaji Prime Media with Project Inquiry (support@balajiprimemedia.in)"
            >
              <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: TWO WHITE CARRARA MARBLE HANDS REACHING TOWARD EACH OTHER & GIANT WORDMARK */}
      {/* Seamless transition with NO separate black box or harsh line */}
      <div className="relative pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-12 md:pb-16 overflow-hidden border-t border-white/10 min-h-[300px] sm:min-h-[360px] md:min-h-[420px] flex flex-col justify-end bg-transparent">
        {/* Subtle rim light halos behind the hands */}
        <div
          aria-hidden="true"
          className="absolute left-0 bottom-0 w-[420px] h-[260px] bg-[radial-gradient(circle_at_left_bottom,rgba(160,104,255,0.14)_0%,transparent_75%)] pointer-events-none z-0"
        />
        <div
          aria-hidden="true"
          className="absolute right-0 bottom-0 w-[420px] h-[260px] bg-[radial-gradient(circle_at_right_bottom,rgba(168,85,247,0.16)_0%,transparent_75%)] pointer-events-none z-0"
        />

        {/* Wordmark - Placed high at top-4 sm:top-6 md:top-8, completely clear above the hands with refined smaller text size */}
        <div
          aria-hidden="true"
          className="absolute top-4 sm:top-6 md:top-8 inset-x-0 flex items-center justify-center select-none pointer-events-none z-25 overflow-hidden px-4"
        >
          <span
            className="neon-outline-wordmark font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-none whitespace-nowrap tracking-wide select-none opacity-100 drop-shadow-[0_0_25px_rgba(184,134,255,0.7)]"
            style={{
              fontFamily: "var(--font-urbanist), var(--font-inter), sans-serif",
            }}
          >
            Balaji Prime
          </span>
        </div>

        {/* Left Carrara Marble Hand Reaching In - (z-20) */}
        <div className="absolute left-0 bottom-0 z-20 pointer-events-none w-[100px] sm:w-[190px] md:w-[260px] lg:w-[310px] select-none animate-hand-left opacity-60 sm:opacity-90">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/footer/marble-hand-left.png"
            alt="Carrara Marble Hand Left"
            className="w-full h-auto object-contain filter drop-shadow-[0_0_24px_rgba(160,104,255,0.25)] transition-all"
          />
        </div>

        {/* Right Carrara Marble Hand Reaching In - (z-20) */}
        <div className="absolute right-0 bottom-0 z-20 pointer-events-none w-[100px] sm:w-[190px] md:w-[260px] lg:w-[310px] select-none flex justify-end animate-hand-right opacity-60 sm:opacity-90">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/footer/marble-hand-right.png"
            alt="Carrara Marble Hand Right"
            className="w-full h-auto object-contain filter drop-shadow-[0_0_24px_rgba(160,104,255,0.25)] transition-all"
          />
        </div>

        {/* Center Info: Tagline, Copyright, and Legal Policies (Cleanly between reaching hands) - z-30 */}
        <div className="relative z-30 max-w-2xl mx-auto px-4 text-center space-y-2 py-4">
          <p className="text-white font-bold text-sm sm:text-base tracking-tight drop-shadow-sm">
            Build a real agency-grade brand, fast.
          </p>
          <p className="text-xs text-slate-400">
            &copy; 2026 Balaji Prime Media. All rights reserved. Full-Funnel SEO &amp; Digital Growth Agency.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-400 pt-1">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="text-slate-600">•</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <span className="text-slate-600">•</span>
            <button
              type="button"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.dispatchEvent(new Event("open-cookie-settings"));
                }
              }}
              className="hover:text-white text-slate-400 transition-colors cursor-pointer font-medium"
            >
              Cookie Settings
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
