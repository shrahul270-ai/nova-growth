"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

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
          message: "User subscribed to Nova Growth newsletter via footer form.",
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
    <footer className="relative bg-[#ffffff] text-[#334155] border-t border-gray-200/90 font-sans z-10">
      {/* Floating Free AI Audit Right Tab (Quick conversion) */}
      <Link
        href="/audit"
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-gradient-to-b from-[#2563eb] to-[#1d4ed8] hover:from-[#1d4ed8] hover:to-[#1e40af] text-white py-3.5 px-2 rounded-l-xl shadow-2xl flex items-center gap-1.5 transition-all text-xs font-black tracking-wider uppercase [writing-mode:vertical-rl] rotate-180 hover:px-2.5 cursor-pointer border-l border-t border-b border-blue-400/30"
        title="Analyze your website speed, ranking & SEO score for free"
      >
        <span className="rotate-90 text-amber-300 text-sm">✦</span>
        <span>FREE AI AUDIT</span>
      </Link>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-14 pb-10">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* COLUMN 1: Nova Growth Brand & Direct Contact (span 4) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#091427] via-[#1d4ed8] to-[#0ea5e9] flex items-center justify-center shadow-md shadow-blue-500/10 group-hover:scale-105 transition-transform">
                <svg
                  className="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 20L4 4L20 20L20 4" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-[#0f172a] tracking-tight leading-none">
                  NOVA <span className="text-[#2563eb]">GROWTH</span>
                </span>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">
                  Digital Marketing &amp; SEO Agency
                </span>
              </div>
            </Link>

            {/* Agency Positioning Headline */}
            <h3 className="text-sm font-extrabold text-[#0f172a] tracking-tight pt-1">
              Top #1 SEO, Guest Post &amp; Digital Growth Agency
            </h3>

            {/* Accurate Agency Description */}
            <p className="text-[12.5px] leading-relaxed text-[#64748b]">
              Nova Growth is an elite growth agency helping US, UK &amp; global businesses
              scale organic search revenue. Through manual high-DA guest posting, technical
              Core Web Vitals optimization, and high-converting Next.js web engineering,
              we help ambitious brands outrank competition and drive real business ROI.
            </p>

            {/* Direct Contact Information */}
            <div className="pt-2">
              <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-[#0f172a] mb-2.5">
                CONTACT INFORMATION
              </h4>
              <ul className="space-y-2 text-[12.5px] text-[#475569]">
                {/* Email */}
                <li className="flex items-center gap-2.5">
                  <span className="text-[#2563eb] text-sm shrink-0">✉</span>
                  <a
                    href="mailto:shrahul270@gmail.com"
                    className="hover:text-[#2563eb] transition-colors font-medium break-all"
                  >
                    shrahul270@gmail.com
                  </a>
                </li>
                {/* WhatsApp & Call */}
                <li className="flex items-center gap-2.5">
                  <span className="text-[#2563eb] text-sm shrink-0">💬</span>
                  <a
                    href="https://wa.me/919694953370"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#2563eb] transition-colors font-medium"
                  >
                    +91 96949 53370 (WhatsApp &amp; Direct)
                  </a>
                </li>
                {/* Global Delivery Hub */}
                <li className="flex items-start gap-2.5">
                  <span className="text-[#2563eb] text-sm shrink-0 mt-0.5">📍</span>
                  <span>Serving US, UK, Australia, EU &amp; Worldwide Clients</span>
                </li>
              </ul>
            </div>
          </div>

          {/* COLUMN 2: SERVICES & SOLUTIONS (span 3) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-[12px] font-extrabold uppercase tracking-wider text-[#0f172a]">
              SOLUTIONS &amp; SERVICES
            </h4>
            <ul className="space-y-2.5 text-[13px] text-[#475569]">
              <li>
                <Link
                  href="/guest-posting"
                  className="hover:text-[#2563eb] transition-colors flex items-center justify-between group"
                >
                  <span>High-DA Guest Posting</span>
                  <span className="text-gray-400 group-hover:text-[#2563eb] text-xs">⌄</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-[#2563eb] transition-colors flex items-center justify-between group"
                >
                  <span>Organic Search Engine Optimization</span>
                  <span className="text-gray-400 group-hover:text-[#2563eb] text-xs">⌄</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/audit"
                  className="hover:text-[#2563eb] transition-colors flex items-center justify-between group"
                >
                  <span>Free Instant Website AI Audit</span>
                  <span className="text-gray-400 group-hover:text-[#2563eb] text-xs">⌄</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/web-development-uk"
                  className="hover:text-[#2563eb] transition-colors flex items-center justify-between group"
                >
                  <span>Next.js Web Development</span>
                  <span className="text-gray-400 group-hover:text-[#2563eb] text-xs">⌄</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/seo-services-usa"
                  className="hover:text-[#2563eb] transition-colors flex items-center justify-between group"
                >
                  <span>Local &amp; E-Commerce SEO</span>
                  <span className="text-gray-400 group-hover:text-[#2563eb] text-xs">⌄</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-[#2563eb] transition-colors flex items-center justify-between group"
                >
                  <span>High-ROI Link Building</span>
                  <span className="text-gray-400 group-hover:text-[#2563eb] text-xs">⌄</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: AGENCY & SUPPORT (span 2) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-[12px] font-extrabold uppercase tracking-wider text-[#0f172a]">
              SUPPORT &amp; PAGES
            </h4>
            <ul className="space-y-2.5 text-[13px] text-[#475569]">
              <li>
                <Link href="/about" className="hover:text-[#2563eb] transition-colors">
                  About Agency
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-[#2563eb] transition-colors">
                  Case Studies &amp; Results
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#2563eb] transition-colors">
                  Growth Playbooks &amp; Blog
                </Link>
              </li>
              <li>
                <Link href="/pay" className="hover:text-[#2563eb] transition-colors">
                  Pay Invoice / Retainer
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#2563eb] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a
                  href="https://calendly.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#2563eb] transition-colors flex items-center justify-between group"
                >
                  <span>Schedule Strategy Call</span>
                  <span className="text-gray-400 group-hover:text-[#2563eb] text-xs">↗</span>
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.dispatchEvent(new Event("open-cookie-settings"));
                    }
                  }}
                  className="hover:text-[#2563eb] transition-colors text-left cursor-pointer flex items-center gap-1.5"
                >
                  <span>Cookie Preferences</span>
                  <span className="text-[11px] text-amber-500">🍪</span>
                </button>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: QUICK PACKAGES & NEWSLETTER & AUDIT BANNER (span 3) */}
          <div className="lg:col-span-3 space-y-5">
            {/* Quick Packages */}
            <div>
              <h4 className="text-[12px] font-extrabold uppercase tracking-wider text-[#0f172a] mb-2">
                QUICK LINKS
              </h4>
              <ul className="space-y-1.5 text-[13px] text-[#475569]">
                <li>
                  <Link href="/guest-posting" className="hover:text-[#2563eb] transition-colors">
                    Guest Posting Packages
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-[#2563eb] transition-colors">
                    Link Building Packages
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-[12px] font-extrabold uppercase tracking-wider text-[#0f172a] mb-1">
                NEWSLETTER
              </h4>
              <p className="text-[11.5px] text-[#64748b] mb-2.5">
                Get weekly actionable SEO strategies, ranking tips, and high-DA link opportunities.
              </p>
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-[#3b82f6] text-gray-800 bg-[#f8fafc]"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold text-xs py-2 px-4 rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-70"
                >
                  {subscribed ? (
                    <span>✓ Subscribed to Nova Growth!</span>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <span className="text-xs">✈</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Instant Free SEO Audit Card */}
            <div className="bg-[#f8fafc] border border-blue-100 rounded-xl p-3 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold text-[#0f172a] uppercase tracking-wider">
                  ⚡ Free Instant SEO Audit
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                  Live
                </span>
              </div>
              <p className="text-[11px] text-[#64748b]">
                Check your website speed, Core Web Vitals, and search visibility in 10 seconds.
              </p>
              <Link
                href="/audit"
                className="inline-block w-full text-center py-1.5 bg-[#0f172a] hover:bg-gray-800 text-white rounded-lg text-[11px] font-bold transition-colors cursor-pointer"
              >
                Run Free Website Audit ↗
              </Link>
            </div>

          </div>

        </div>

        {/* BOTTOM STRIP: PAYMENT ACCEPTED & SOCIAL ICONS */}
        <div className="mt-12 pt-6 border-t border-gray-200/80 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* We Accept Payment Icons (Real Nova Growth Supported Methods) */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
            <span className="font-bold text-gray-700 text-xs mr-1">We accept:</span>
            {/* Stripe */}
            <span className="px-2 py-0.5 bg-[#f1f5f9] rounded border border-gray-200 text-[11px] font-bold text-[#635bff]">
              stripe
            </span>
            {/* PayPal */}
            <span className="px-2 py-0.5 bg-[#f1f5f9] rounded border border-gray-200 text-[11px] font-bold text-[#003087]">
              PayPal
            </span>
            {/* Wise */}
            <span className="px-2 py-0.5 bg-[#f1f5f9] rounded border border-gray-200 text-[11px] font-bold text-[#00b9ff]">
              Wise
            </span>
            {/* Wire Transfer */}
            <span className="px-2 py-0.5 bg-[#f1f5f9] rounded border border-gray-200 text-[10px] font-bold text-gray-700">
              Wire Transfer
            </span>
            {/* VISA */}
            <span className="px-2 py-0.5 bg-[#f1f5f9] rounded border border-gray-200 text-[11px] font-black text-[#1a1f71] italic">
              VISA
            </span>
            {/* Mastercard */}
            <span className="px-2 py-0.5 bg-[#f1f5f9] rounded border border-gray-200 flex items-center gap-0.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#eb001b] inline-block -mr-1" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#f79e1b] inline-block opacity-85" />
            </span>
            {/* UPI */}
            <span className="px-2 py-0.5 bg-[#f1f5f9] rounded border border-gray-200 text-[10px] font-black text-[#5f259f]">
              UPI
            </span>
            {/* Crypto / USDT */}
            <span className="px-2 py-0.5 bg-[#f1f5f9] rounded border border-gray-200 text-[10px] font-bold text-[#26a17b] flex items-center gap-0.5">
              <span>₮</span> USDT
            </span>
          </div>

          {/* Social Icons (Circular Buttons matching image style) */}
          <div className="flex flex-wrap items-center gap-2">
            {/* WhatsApp */}
            <a
              href="https://wa.me/919694953370"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-full border border-gray-300 hover:border-[#25d366] hover:bg-[#25d366] hover:text-white text-gray-600 flex items-center justify-center transition-all text-xs"
              aria-label="Direct WhatsApp Support"
              title="WhatsApp Nova Growth"
            >
              💬
            </a>
            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-full border border-gray-300 hover:border-[#0a66c2] hover:bg-[#0a66c2] hover:text-white text-gray-600 flex items-center justify-center transition-all text-xs font-bold"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              in
            </a>
            {/* X / Twitter */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-full border border-gray-300 hover:border-black hover:bg-black hover:text-white text-gray-600 flex items-center justify-center transition-all text-xs font-bold"
              aria-label="X Twitter"
              title="X"
            >
              <svg className="w-3 h-3 fill-currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-full border border-gray-300 hover:border-[#e4405f] hover:bg-[#e4405f] hover:text-white text-gray-600 flex items-center justify-center transition-all text-xs"
              aria-label="Instagram"
              title="Instagram"
            >
              <svg className="w-3 h-3 fill-currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            {/* Email Contact */}
            <a
              href="mailto:shrahul270@gmail.com"
              className="w-7 h-7 rounded-full border border-gray-300 hover:border-[#ea4335] hover:bg-[#ea4335] hover:text-white text-gray-600 flex items-center justify-center transition-all text-xs"
              aria-label="Direct Email"
              title="Email Nova Growth"
            >
              ✉
            </a>
          </div>
        </div>

        {/* Copyright notice & Privacy / Cookies */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400 border-t border-gray-100 pt-4">
          <span>&copy; 2026 Nova Growth. All rights reserved. Full-Funnel SEO &amp; Digital Growth Agency.</span>
          <div className="flex items-center gap-3 text-[11px]">
            <Link href="/about" className="hover:text-gray-600 transition-colors">
              Privacy &amp; Terms
            </Link>
            <span>•</span>
            <button
              type="button"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.dispatchEvent(new Event("open-cookie-settings"));
                }
              }}
              className="hover:text-blue-600 transition-colors cursor-pointer font-medium"
            >
              🍪 Cookie Settings
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
