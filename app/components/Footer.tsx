"use client";

import React, { useState } from "react";
import Link from "next/link";
import BrandLogo from "./BrandLogo";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

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
    <footer className="relative bg-gradient-to-b from-[#fdfbf7] via-[#fffdfa] to-white text-slate-800 font-sans z-10 overflow-hidden border-t border-amber-200/80">
      {/* Subtle ambient golden radial glows */}
      <div
        aria-hidden="true"
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.08)_0%,transparent_70%)] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-40 left-0 w-[500px] h-[350px] bg-[radial-gradient(circle_at_bottom_left,rgba(217,119,6,0.06)_0%,transparent_70%)] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-40 right-0 w-[500px] h-[350px] bg-[radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.08)_0%,transparent_70%)] pointer-events-none"
      />

      {/* MAIN FOOTER: 4-Column Grid */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* COLUMN 1: Brand & Direct Contact (span 4) */}
          <div className="lg:col-span-4 space-y-4 text-left">
            <div className="mb-2">
              <BrandLogo size="lg" />
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>Full-Funnel Organic Growth Engine</span>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed text-slate-600 font-normal">
              Balaji Prime Media is a specialized digital growth agency helping US, UK &amp; global businesses scale organic search revenue through manual DR 50–90+ editorial outreach, technical Core Web Vitals optimization, and high-converting Next.js web engineering.
            </p>

            {/* Direct Contact Information */}
            <div className="pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d97706]" />
                CONTACT INFORMATION
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                <li className="flex items-center gap-2.5">
                  <span className="text-[#EA4335] text-xs shrink-0">
                    <svg className="w-4 h-4 fill-currentColor inline-block" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </span>
                  <a
                    href={emailInquiryHref}
                    className="hover:text-[#d97706] text-slate-700 transition-colors font-medium break-all cursor-pointer"
                    title="Send inquiry with formatted project details"
                  >
                    support@balajiprimemedia.in
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-[#25D366] text-xs shrink-0">
                    <svg className="w-4 h-4 fill-currentColor inline-block" viewBox="0 0 24 24">
                      <path d="M12.04 2C6.527 2 2.05 6.477 2.05 11.99c0 1.954.563 3.778 1.536 5.32L2 22l4.832-1.53c1.482.88 3.208 1.39 5.208 1.39 5.513 0 9.99-4.477 9.99-9.99C22.03 6.477 17.553 2 12.04 2z" />
                    </svg>
                  </span>
                  <a
                    href="https://wa.me/917690868932"
                    target="_blank"
                    rel="opener"
                    className="hover:text-[#d97706] text-slate-700 transition-colors font-medium cursor-pointer"
                  >
                    +91 76908 68932 (WhatsApp &amp; Direct)
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#d97706] text-xs shrink-0 mt-0.5">📍</span>
                  <span className="text-slate-500">Serving US, UK, Australia, EU &amp; Worldwide Clients</span>
                </li>
              </ul>
            </div>
          </div>

          {/* COLUMN 2: NAVBAR PAGES (span 3) */}
          <div className="lg:col-span-3 space-y-4 text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d97706]" />
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li>
                <Link href="/" className="hover:text-[#d97706] transition-colors flex items-center justify-between group py-0.5 font-medium">
                  <span>Home</span>
                  <span className="text-slate-400 group-hover:text-[#d97706] text-xs transition-colors">→</span>
                </Link>
              </li>
              <li>
                <Link href="/guest-posting" className="hover:text-[#d97706] transition-colors flex items-center justify-between group py-0.5 font-medium">
                  <span className="flex items-center gap-1.5">
                    <span>Guest Posting</span>
                    <span className="text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded-full">
                      DR 50+
                    </span>
                  </span>
                  <span className="text-slate-400 group-hover:text-[#d97706] text-xs transition-colors">→</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#d97706] transition-colors flex items-center justify-between group py-0.5 font-medium">
                  <span>Services</span>
                  <span className="text-slate-400 group-hover:text-[#d97706] text-xs transition-colors">→</span>
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-[#d97706] transition-colors flex items-center justify-between group py-0.5 font-medium">
                  <span>Projects</span>
                  <span className="text-slate-400 group-hover:text-[#d97706] text-xs transition-colors">→</span>
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#d97706] transition-colors flex items-center justify-between group py-0.5 font-medium">
                  <span>Blog</span>
                  <span className="text-slate-400 group-hover:text-[#d97706] text-xs transition-colors">→</span>
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-[#d97706] transition-colors flex items-center justify-between group py-0.5 font-medium">
                  <span>About Us</span>
                  <span className="text-slate-400 group-hover:text-[#d97706] text-xs transition-colors">→</span>
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-[#d97706] transition-colors flex items-center justify-between group py-0.5 font-medium">
                  <span>Contact Us</span>
                  <span className="text-slate-400 group-hover:text-[#d97706] text-xs transition-colors">→</span>
                </Link>
              </li>
              <li>
                <Link href="/pay" className="hover:text-[#d97706] transition-colors flex items-center justify-between group py-0.5 font-medium">
                  <span className="flex items-center gap-1.5 font-semibold text-amber-700">
                    <span>Client Invoices</span>
                    <span className="text-xs">💳</span>
                  </span>
                  <span className="text-slate-400 group-hover:text-[#d97706] text-xs transition-colors">→</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: SUPPORT & LEGAL (span 2) */}
          <div className="lg:col-span-2 space-y-4 text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d97706]" />
              Support &amp; Policies
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li>
                <Link href="/faq" className="hover:text-[#d97706] transition-colors flex items-center justify-between group py-0.5 font-medium">
                  <span>FAQ</span>
                  <span className="text-slate-400 group-hover:text-[#d97706] text-xs transition-colors">→</span>
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="hover:text-[#d97706] transition-colors flex items-center justify-between group py-0.5 font-medium">
                  <span>Feedback</span>
                  <span className="text-slate-400 group-hover:text-[#d97706] text-xs transition-colors">→</span>
                </Link>
              </li>
              <li>
                <Link href="/schedule-meeting" className="hover:text-amber-700 transition-colors flex items-center justify-between group py-0.5 font-semibold text-amber-600">
                  <span>Schedule Meeting</span>
                  <span className="text-xs">📅</span>
                </Link>
              </li>
              <li>
                <Link href="/help-center" className="hover:text-[#d97706] transition-colors flex items-center justify-between group py-0.5 font-medium">
                  <span>Help Center</span>
                  <span className="text-slate-400 group-hover:text-[#d97706] text-xs transition-colors">→</span>
                </Link>
              </li>
              <li className="pt-2 border-t border-slate-200">
                <Link href="/privacy-policy" className="hover:text-[#d97706] transition-colors block py-0.5 text-xs text-slate-500">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#d97706] transition-colors block py-0.5 text-xs text-slate-500">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="hover:text-[#d97706] transition-colors flex items-center gap-1.5 py-0.5 text-xs text-slate-500">
                  <span>Sitemap</span>
                  <span className="text-xs">🗺️</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: NEWSLETTER & FREE AUDIT (span 3) */}
          <div className="lg:col-span-3 space-y-5 text-left">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1">
                Subscribe to our newsletter
              </h4>
              <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                Weekly organic growth blueprints, SEO teardowns, and algorithm updates directly to your inbox.
              </p>
              <form onSubmit={handleSubscribe} className="relative flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="founder@company.com"
                  required
                  className="w-full pl-3.5 pr-12 py-2.5 text-xs sm:text-sm rounded-xl bg-white border border-slate-300 focus:border-[#d97706] focus:outline-none text-slate-900 placeholder-slate-400 shadow-xs transition-colors"
                />
                <button
                  type="submit"
                  disabled={loading}
                  aria-label="Subscribe to newsletter"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 text-white font-bold w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer disabled:opacity-50 transition-all bg-[#d97706] hover:bg-[#b45309] shadow-sm hover:scale-105"
                >
                  {loading ? (
                    <span className="text-xs">⋯</span>
                  ) : (
                    <span className="text-sm font-black leading-none text-white">→</span>
                  )}
                </button>
              </form>
              {subscribed ? (
                <p className="text-xs text-emerald-600 font-semibold mt-2 flex items-center gap-1">
                  <span>✓ Subscribed to Balaji Prime Media!</span>
                </p>
              ) : (
                <p className="text-xs text-slate-500 mt-2">
                  Unsubscribe anytime. Zero spam policy.
                </p>
              )}
            </div>

            {/* Instant Free SEO Audit Card */}
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 space-y-2 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="text-amber-500">⚡</span> Free Instant SEO Audit
                </span>
                <span className="text-xs bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold px-2 py-0.5 rounded-full">
                  Live
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Check your website speed, Core Web Vitals, and search visibility in 10 seconds.
              </p>
              <Link
                href="/audit"
                className="block w-full text-center py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold cursor-pointer transition-all bg-gradient-to-r from-[#d97706] to-[#f59e0b] hover:from-[#b45309] hover:to-[#d97706] text-white shadow-xs"
              >
                Run Free Website Audit ↗
              </Link>
            </div>
          </div>

        </div>

        {/* BOTTOM STRIP: PAYMENT ACCEPTED & SOCIAL ICONS */}
        <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
            <span className="font-bold text-slate-900 text-xs mr-1">We accept:</span>
            <Link
              href="/pay?method=Stripe"
              title="Pay securely via Stripe"
              className="px-2.5 py-1 bg-white hover:bg-slate-50 rounded-md border border-slate-200 hover:border-amber-400 text-xs font-bold text-slate-800 shadow-xs hover:scale-105 transition-all cursor-pointer"
            >
              Stripe
            </Link>
            <Link
              href="/pay?method=PayPal"
              title="Pay securely via PayPal"
              className="px-2.5 py-1 bg-white hover:bg-slate-50 rounded-md border border-slate-200 hover:border-amber-400 text-xs font-bold text-blue-600 shadow-xs hover:scale-105 transition-all cursor-pointer"
            >
              PayPal
            </Link>
            <Link
              href="/pay?method=Wise"
              title="Pay securely via Wise"
              className="px-2.5 py-1 bg-white hover:bg-slate-50 rounded-md border border-slate-200 hover:border-amber-400 text-xs font-bold text-emerald-600 shadow-xs hover:scale-105 transition-all cursor-pointer"
            >
              Wise
            </Link>
            <Link
              href="/pay?method=Bank+Wire"
              title="Pay via International Wire Transfer"
              className="px-2.5 py-1 bg-white hover:bg-slate-50 rounded-md border border-slate-200 hover:border-amber-400 text-xs font-bold text-slate-700 shadow-xs hover:scale-105 transition-all cursor-pointer"
            >
              Wire Transfer
            </Link>
            <Link
              href="/pay?method=UPI"
              title="Pay with Instant UPI / QR"
              className="px-2.5 py-1 bg-white hover:bg-slate-50 rounded-md border border-slate-200 hover:border-amber-400 text-xs font-bold text-amber-700 shadow-xs hover:scale-105 transition-all cursor-pointer"
            >
              UPI
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href="https://wa.me/917690868932"
              target="_blank"
              rel="opener"
              className="w-8 h-8 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center transition-all shadow-xs hover:scale-110 cursor-pointer"
              aria-label="Direct WhatsApp Support"
              title="WhatsApp Balaji Prime Media (+91 76908 68932)"
            >
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <path d="M12.04 2C6.527 2 2.05 6.477 2.05 11.99c0 1.954.563 3.778 1.536 5.32L2 22l4.832-1.53c1.482.88 3.208 1.39 5.208 1.39 5.513 0 9.99-4.477 9.99-9.99C22.03 6.477 17.553 2 12.04 2zm5.432 12.382c-.301-.15-1.782-.879-2.057-.979-.276-.1-.476-.15-.676.15-.2.301-.776.979-.951 1.18-.176.2-.351.226-.652.075-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.675-2.085-.176-.3-.019-.463.132-.612.136-.134.301-.351.451-.527.151-.176.201-.301.301-.501.1-.2.05-.376-.025-.526-.075-.15-.676-1.63-.926-2.233-.244-.588-.492-.508-.676-.517l-.576-.01c-.2 0-.526.075-.802.376-.276.301-1.052 1.028-1.052 2.507 0 1.48 1.077 2.908 1.228 3.109.15.2 2.119 3.235 5.132 4.538.717.31 1.277.495 1.713.633.72.228 1.375.196 1.893.119.578-.086 1.782-.727 2.032-1.429.25-.702.25-1.303.175-1.429-.075-.125-.276-.2-.577-.35z" />
              </svg>
            </a>
            <a
              href="https://t.me/balajiprimemedia"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-[#229ED9] hover:bg-[#1d8ec4] text-white flex items-center justify-center transition-all shadow-xs hover:scale-110"
              aria-label="Telegram"
              title="Telegram Channel"
            >
              <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
              </svg>
            </a>
            <a
              href={emailInquiryHref}
              className="w-8 h-8 rounded-full bg-[#EA4335] hover:bg-[#d33828] text-white flex items-center justify-center transition-all shadow-xs hover:scale-110"
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

      {/* BOTTOM SECTION: ELEGANT GOLDEN WORDMARK & CLEAN COPYRIGHT (NO HANDS) */}
      <div className="relative pt-12 pb-12 overflow-hidden border-t border-amber-200/60 bg-gradient-to-b from-[#fefbf6] to-white flex flex-col justify-center items-center">
        {/* Soft Golden Ambient Glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.06)_0%,transparent_70%)] pointer-events-none"
        />

        {/* Clean Golden Wordmark (Without distracting marble hands) */}
        <div
          aria-hidden="true"
          className="relative z-10 w-full flex items-center justify-center select-none pointer-events-none px-4 mb-4"
        >
          <span className="font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-none whitespace-nowrap tracking-tight select-none text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 drop-shadow-xs">
            balajiprimemedia.in
          </span>
        </div>

        {/* Center Info: Tagline, Copyright, and Legal Policies */}
        <div className="relative z-10 max-w-2xl mx-auto px-4 text-center space-y-2">
          <p className="text-slate-800 font-bold text-sm sm:text-base tracking-tight">
            Build a real agency-grade brand, fast.
          </p>
          <p className="text-xs text-slate-500">
            &copy; 2026 Balaji Prime Media. All rights reserved. Full-Funnel SEO &amp; Digital Growth Agency.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 pt-1">
            <Link href="/privacy-policy" className="hover:text-[#d97706] transition-colors">
              Privacy Policy
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/terms" className="hover:text-[#d97706] transition-colors">
              Terms of Service
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/sitemap.xml" className="hover:text-[#d97706] transition-colors font-medium">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
