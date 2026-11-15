"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import BrandLogo from "./BrandLogo";

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
    <footer className="relative bg-gradient-to-b from-[#0a0522] via-[#070319] to-[#040112] text-white font-sans z-10 overflow-hidden border-t border-purple-500/20">
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

      {/* Floating Free AI Audit Right Tab (Luxury Cyber Glass Redesign) */}
      <Link
        href="/audit"
        className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-40 text-white py-4 px-2.5 rounded-l-2xl shadow-[0_4px_28px_rgba(160,104,255,0.45)] hover:shadow-[0_4px_35px_rgba(34,211,238,0.7)] items-center gap-2 transition-all duration-300 text-[11px] font-bold tracking-[0.18em] uppercase [writing-mode:vertical-rl] rotate-180 hover:-translate-x-1.5 cursor-pointer border-l-2 border-l-[#A068FF] hover:border-l-cyan-400 border-t border-b border-white/20 bg-gradient-to-b from-[#140833]/95 via-[#0b031e]/95 to-[#04010e]/95 backdrop-blur-xl group select-none"
        title="Analyze your website speed, ranking & SEO score for free"
      >
        {/* Live Status Beacon */}
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
        </span>

        {/* 3D Geometric AI Sparkle Glyph */}
        <svg
          className="w-3.5 h-3.5 text-cyan-300 group-hover:text-cyan-200 transition-transform duration-300 group-hover:scale-125 rotate-90 shrink-0 filter drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
        </svg>

        {/* Clean Glowing Typography */}
        <span className="bg-clip-text text-transparent bg-gradient-to-t from-white via-purple-100 to-cyan-200 group-hover:from-white group-hover:to-white transition-colors drop-shadow-[0_0_10px_rgba(160,104,255,0.5)]">
          FREE AI AUDIT
        </span>
      </Link>

      {/* MAIN FOOTER: 4-Column Grid */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-14 sm:pt-16 pb-12">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* COLUMN 1: Brand & Direct Contact (span 4) */}
          <div className="lg:col-span-4 space-y-4 text-left animate-bpm-col-1">
            {/* Brand Logo */}
            <div className="mb-2">
              <BrandLogo size="lg" />
            </div>

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
                    onClick={(e) => {
                      e.preventDefault();
                      if (typeof window !== "undefined") {
                        window.dispatchEvent(new CustomEvent("open-connect-modal", { detail: { channel: "email" } }));
                      }
                    }}
                    className="hover:text-white text-slate-300 transition-colors font-medium break-all cursor-pointer"
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
                    onClick={(e) => {
                      e.preventDefault();
                      if (typeof window !== "undefined") {
                        window.dispatchEvent(new CustomEvent("open-connect-modal", { detail: { channel: "whatsapp" } }));
                      }
                    }}
                    className="hover:text-white text-slate-300 transition-colors font-medium cursor-pointer"
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
          <div className="lg:col-span-3 space-y-4 text-left animate-bpm-col-2">
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
                  <span>Projects</span>
                  <span className="text-slate-500 group-hover:text-[#A068FF] text-xs transition-colors">→</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-white transition-colors flex items-center justify-between group py-0.5"
                >
                  <span>Blog</span>
                  <span className="text-slate-500 group-hover:text-[#A068FF] text-xs transition-colors">→</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
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
          <div className="lg:col-span-2 space-y-4 text-left animate-bpm-col-3">
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
                <Link
                  href="/sitemap.xml"
                  className="hover:text-white transition-colors flex items-center gap-1.5 py-0.5 text-xs text-slate-400 group"
                >
                  <span>Sitemap</span>
                  <span className="text-[11px] text-[#A068FF] group-hover:translate-x-0.5 transition-transform">🗺️</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: NEWSLETTER & FREE AUDIT (span 3) */}
          <div className="lg:col-span-3 space-y-5 text-left animate-bpm-col-4">
            {/* Newsletter */}
            <div>
              <h4 className="text-[12px] font-bold uppercase tracking-wider text-white mb-1">
                Subscribe to our newsletter
              </h4>
              <p className="text-[11.5px] text-slate-300 mb-2.5">
                Weekly organic growth blueprints, SEO teardowns, and algorithm updates directly to your inbox.
              </p>
              <form onSubmit={handleSubscribe} className="relative flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="founder@company.com"
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
          {/* We Accept Payment Icons (Clickable to /pay) */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
            <span className="font-bold text-white text-xs mr-1">We accept:</span>
            <Link
              href="/pay?method=Stripe"
              title="Pay securely via Stripe"
              className="px-2.5 py-1 bg-white/[0.06] hover:bg-white/[0.15] rounded-md border border-white/10 hover:border-purple-400/50 text-[11px] font-bold text-slate-200 shadow-xs hover:scale-105 transition-all cursor-pointer"
            >
              stripe
            </Link>
            <Link
              href="/pay?method=PayPal"
              title="Pay securely via PayPal"
              className="px-2.5 py-1 bg-white/[0.06] hover:bg-white/[0.15] rounded-md border border-white/10 hover:border-sky-400/50 text-[11px] font-bold text-[#38bdf8] shadow-xs hover:scale-105 transition-all cursor-pointer"
            >
              PayPal
            </Link>
            <Link
              href="/pay?method=Wise"
              title="Pay securely via Wise"
              className="px-2.5 py-1 bg-white/[0.06] hover:bg-white/[0.15] rounded-md border border-white/10 hover:border-cyan-400/50 text-[11px] font-bold text-[#38bdf8] shadow-xs hover:scale-105 transition-all cursor-pointer"
            >
              Wise
            </Link>
            <Link
              href="/pay?method=Bank+Wire"
              title="Pay via International Wire Transfer"
              className="px-2.5 py-1 bg-white/[0.06] hover:bg-white/[0.15] rounded-md border border-white/10 hover:border-slate-300/50 text-[10px] font-bold text-slate-300 shadow-xs hover:scale-105 transition-all cursor-pointer"
            >
              Wire Transfer
            </Link>
            <Link
              href="/pay?method=Stripe"
              title="Pay with VISA"
              className="px-2.5 py-1 bg-white/[0.06] hover:bg-white/[0.15] rounded-md border border-white/10 hover:border-blue-400/50 text-[11px] font-black text-white italic shadow-xs hover:scale-105 transition-all cursor-pointer"
            >
              VISA
            </Link>
            <Link
              href="/pay?method=Stripe"
              title="Pay with Mastercard"
              className="px-2.5 py-1 bg-white/[0.06] hover:bg-white/[0.15] rounded-md border border-white/10 hover:border-amber-400/50 flex items-center gap-0.5 shadow-xs hover:scale-105 transition-all cursor-pointer"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#eb001b] inline-block -mr-1" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#f79e1b] inline-block opacity-85" />
            </Link>
            <Link
              href="/pay?method=UPI"
              title="Pay with Instant UPI / QR"
              className="px-2.5 py-1 bg-white/[0.06] hover:bg-white/[0.15] rounded-md border border-white/10 hover:border-purple-400/50 text-[10px] font-black text-[#c084fc] shadow-xs hover:scale-105 transition-all cursor-pointer"
            >
              UPI
            </Link>
            <Link
              href="/pay?method=Bank+Wire"
              title="Pay via ACH Bank Transfer"
              className="px-2.5 py-1 bg-white/[0.06] hover:bg-white/[0.15] rounded-md border border-white/10 hover:border-blue-400/50 text-[10px] font-bold text-[#93c5fd] shadow-xs hover:scale-105 transition-all cursor-pointer"
            >
              ACH Transfer
            </Link>
          </div>

          {/* Social Outline Icons with Real Official Brand Colors */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* WhatsApp */}
            <a
              href="https://wa.me/917690868932"
              target="_blank"
              rel="opener"
              onClick={(e) => {
                e.preventDefault();
                if (typeof window !== "undefined") {
                  window.dispatchEvent(new CustomEvent("open-connect-modal", { detail: { channel: "whatsapp" } }));
                }
              }}
              className="w-8 h-8 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center transition-all shadow-sm hover:scale-110 cursor-pointer"
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
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-[#229ED9] hover:bg-[#1d8ec4] text-white flex items-center justify-center transition-all shadow-sm hover:scale-110"
              aria-label="Telegram"
              title="Telegram Channel"
            >
              <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
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
      <div className="relative pt-12 sm:pt-16 md:pt-20 pb-12 sm:pb-16 md:pb-20 overflow-hidden border-t border-white/10 flex flex-col justify-end items-center bg-transparent min-h-[280px] sm:min-h-[340px] md:min-h-[400px]">
        {/* Subtle rim light halos behind the hands */}
        <div
          aria-hidden="true"
          className="absolute left-0 bottom-0 w-[420px] h-[260px] bg-[radial-gradient(circle_at_left_bottom,rgba(160,104,255,0.14)_0%,transparent_75%)] pointer-events-none z-0"
        />
        <div
          aria-hidden="true"
          className="absolute right-0 bottom-0 w-[420px] h-[260px] bg-[radial-gradient(circle_at_right_bottom,rgba(168,85,247,0.16)_0%,transparent_75%)] pointer-events-none z-0"
        />

        {/* Left Carrara Marble Hand Reaching In - (z-20) */}
        <div className="absolute left-0 bottom-0 z-20 pointer-events-none w-[110px] sm:w-[200px] md:w-[280px] lg:w-[330px] select-none animate-hand-left opacity-70 sm:opacity-95">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/footer/marble-hand-left.png"
            alt="Carrara Marble Hand Left"
            className="w-full h-auto object-contain filter drop-shadow-[0_0_24px_rgba(160,104,255,0.25)] transition-all"
          />
        </div>

        {/* Right Carrara Marble Hand Reaching In - (z-20) */}
        <div className="absolute right-0 bottom-0 z-20 pointer-events-none w-[110px] sm:w-[200px] md:w-[280px] lg:w-[330px] select-none flex justify-end animate-hand-right opacity-70 sm:opacity-95">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/footer/marble-hand-right.png"
            alt="Carrara Marble Hand Right"
            className="w-full h-auto object-contain filter drop-shadow-[0_0_24px_rgba(160,104,255,0.25)] transition-all"
          />
        </div>

        {/* Giant Wordmark - Elevated above hands */}
        <div
          aria-hidden="true"
          className="relative z-25 w-full flex items-center justify-center select-none pointer-events-none px-4 mb-3 sm:mb-4 md:mb-5"
        >
          <span
            className="neon-outline-wordmark font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[7.5rem] leading-none whitespace-nowrap tracking-tight select-none opacity-100 drop-shadow-[0_0_35px_rgba(184,134,255,0.8)]"
            style={{
              fontFamily: "var(--font-urbanist), var(--font-inter), sans-serif",
            }}
          >
            balajiprimemedia.in
          </span>
        </div>

        {/* Center Info: Tagline, Copyright, and Legal Policies (Elevated cleanly above the reaching hands) - z-30 */}
        <div className="relative z-30 max-w-2xl mx-auto px-4 text-center space-y-2.5 py-2 mb-6 sm:mb-8 md:mb-10">
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
            <Link href="/sitemap.xml" className="hover:text-white text-slate-400 transition-colors font-medium">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
