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
    <footer className="relative bg-[#0D0D0D] text-[#ADADAD] font-shipcraft z-10 overflow-hidden border-t border-[#261E17]">
      {/* Ambient Warm Amber Glows */}
      <div
        aria-hidden="true"
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(240,162,76,0.12)_0%,transparent_70%)] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-[500px] h-[350px] bg-[radial-gradient(circle_at_bottom_left,rgba(240,162,76,0.15)_0%,transparent_70%)] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 w-[500px] h-[350px] bg-[radial-gradient(circle_at_bottom_right,rgba(240,162,76,0.15)_0%,transparent_70%)] pointer-events-none"
      />

      {/* Floating Free AI Audit Right Tab (Warm Amber Glass Style) */}
      <Link
        href="/audit"
        className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-gradient-to-b from-[#7A5832] to-[#2C241D] hover:from-[#8C663B] hover:to-[#362D24] text-white py-3.5 px-2 rounded-l-xl shadow-[0_0_24px_rgba(240,162,76,0.3)] items-center gap-1.5 transition-all text-xs font-black tracking-wider uppercase [writing-mode:vertical-rl] rotate-180 hover:px-2.5 cursor-pointer border-l border-t border-b border-[#F0A24C]/40"
        title="Analyze your website speed, ranking & SEO score for free"
      >
        <span className="rotate-90 text-[#F0A24C] text-sm">✦</span>
        <span>FREE AI AUDIT</span>
      </Link>

      {/* TOP CTA BAND: Tilted 3D Editor Panel Glowing Amber + Glossy Amber CTA */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-16 sm:pt-20 pb-16 lg:pb-24 border-b border-[#261E17]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left CTA Info */}
          <div className="lg:col-span-7 space-y-6 z-10 text-left">
            {/* Pill */}
            <div className="animate-shipcraft-pill inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1D1510] border border-[#F0A24C]/35 text-[#F0A24C] text-xs font-semibold tracking-wide shadow-sm">
              <span>✦</span>
              <span>Ship Your Idea</span>
            </div>

            {/* Headline */}
            <h2 className="animate-shipcraft-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08]">
              Your next app <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-100 to-[#F0A24C]">
                starts now.
              </span>
            </h2>

            {/* Description */}
            <p className="animate-shipcraft-desc text-sm sm:text-base text-[#ADADAD] max-w-xl leading-relaxed">
              Describe it, shape it in the canvas or code, ship it to the App Store, Play Store, or web. No install, no credit card.
            </p>

            {/* Glossy Amber-Glass CTA Button */}
            <div className="animate-shipcraft-cta pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/audit"
                className="amber-glass-button inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-white font-bold text-sm cursor-pointer"
              >
                <span>Get started now</span>
                <span className="text-base text-[#F0A24C]">→</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-semibold text-[#ADADAD] hover:text-white border border-[#261E17] hover:border-[#F0A24C]/40 bg-[#141210]/60 transition-colors"
              >
                <span>Schedule Strategy Call</span>
                <span className="text-xs">↗</span>
              </Link>
            </div>
          </div>

          {/* Right: Tilted 3D Editor Panel Bleeding Off Top-Right */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end animate-shipcraft-editor">
            <div className="relative w-full max-w-[520px] lg:max-w-none lg:-mr-12 group">
              {/* Amber rim glow behind editor panel */}
              <div 
                aria-hidden="true" 
                className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(240,162,76,0.3)_0%,transparent_70%)] filter blur-2xl pointer-events-none" 
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/footer/editor-panel.png"
                alt="Shipcraft 3D Editor Panel glowing amber"
                className="relative z-10 w-full h-auto object-contain filter drop-shadow-[0_12px_32px_rgba(240,162,76,0.35)] transform transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>
          </div>

        </div>
      </div>

      {/* MAIN FOOTER: 4-Column Grid */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-14 sm:pt-16 pb-12">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* COLUMN 1: Brand & Direct Contact (span 4) */}
          <div className="lg:col-span-4 space-y-4 text-left animate-shipcraft-col-1">
            {/* Brand Logo with Amber Sail Mark */}
            <Link href="/" className="inline-flex items-center gap-3 group">
              {/* Original Amber Sail Mark */}
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-b from-[#2C241D] to-[#14100D] border border-[#F0A24C]/40 flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_0_20px_rgba(240,162,76,0.25)] group-hover:border-[#F0A24C] transition-all group-hover:scale-105">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 3L19 18H12V3Z"
                    fill="url(#amber-sail-grad-1)"
                    stroke="#F0A24C"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 7L4 18H10V7Z"
                    fill="url(#amber-sail-grad-2)"
                    stroke="#E0A165"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 20H21"
                    stroke="#F0A24C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="amber-sail-grad-1" x1="12" y1="3" x2="19" y2="18" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FFB25E" />
                      <stop offset="1" stopColor="#A85A14" />
                    </linearGradient>
                    <linearGradient id="amber-sail-grad-2" x1="4" y1="7" x2="10" y2="18" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#F0A24C" stopOpacity="0.85" />
                      <stop offset="1" stopColor="#5A3418" stopOpacity="0.9" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <div className="flex flex-col">
                <span className="text-xl font-black text-white tracking-tight leading-none group-hover:text-amber-100 transition-colors">
                  shipcraft
                </span>
                <span className="text-[10px] font-semibold text-[#7D7D7D] uppercase tracking-widest mt-1">
                  Balaji Prime Media
                </span>
              </div>
            </Link>

            {/* Dark Pill with Amber Hairline */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1D1510] border border-[#F0A24C]/30 text-[#F0A24C] text-[11px] font-medium shadow-sm">
              <span className="text-[10px]">✦</span>
              <span>Full-Funnel Organic Growth Engine</span>
            </div>

            {/* Shipcraft Blurb */}
            <p className="text-[12.5px] leading-relaxed text-[#ADADAD]">
              Shipcraft keeps every surface in sync, so you never rebuild from scratch.
            </p>

            {/* Direct Contact Information */}
            <div className="pt-2">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#7D7D7D] mb-2.5">
                CONTACT INFORMATION
              </h4>
              <ul className="space-y-2 text-[12.5px] text-[#ADADAD]">
                <li className="flex items-center gap-2.5">
                  <span className="text-[#F0A24C] text-sm shrink-0">✉</span>
                  <a
                    href="mailto:shrahul270@gmail.com"
                    className="hover:text-[#F0A24C] text-[#ADADAD] transition-colors font-medium break-all"
                  >
                    shrahul270@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-[#E0A165] text-sm shrink-0">💬</span>
                  <a
                    href="https://wa.me/918000417058"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#F0A24C] text-[#ADADAD] transition-colors font-medium"
                  >
                    +91 80004 17058 (WhatsApp &amp; Direct)
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#F0A24C] text-sm shrink-0 mt-0.5">📍</span>
                  <span className="text-[#7D7D7D]">Serving US, UK, Australia, EU &amp; Worldwide Clients</span>
                </li>
              </ul>
            </div>
          </div>

          {/* COLUMN 2: PRODUCT (span 3) */}
          <div className="lg:col-span-3 space-y-4 text-left animate-shipcraft-col-2">
            <h4 className="text-[12px] font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F0A24C]" />
              Product
            </h4>
            <ul className="space-y-2.5 text-[13px] text-[#ADADAD]">
              <li>
                <Link
                  href="/audit"
                  className="hover:text-[#F0A24C] transition-colors flex items-center justify-between group py-0.5"
                >
                  <span>Preview</span>
                  <span className="text-[#717171] group-hover:text-[#F0A24C] text-xs transition-colors">→</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-[#F0A24C] transition-colors flex items-center justify-between group py-0.5"
                >
                  <span>Features</span>
                  <span className="text-[#717171] group-hover:text-[#F0A24C] text-xs transition-colors">→</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#F0A24C] transition-colors flex items-center justify-between group py-0.5"
                >
                  <span>How it works</span>
                  <span className="text-[#717171] group-hover:text-[#F0A24C] text-xs transition-colors">→</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/web-development-uk"
                  className="hover:text-[#F0A24C] transition-colors flex items-center justify-between group py-0.5"
                >
                  <span>Developers</span>
                  <span className="text-[#717171] group-hover:text-[#F0A24C] text-xs transition-colors">→</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/guest-posting"
                  className="hover:text-[#F0A24C] transition-colors flex items-center justify-between group py-0.5"
                >
                  <span>High-DA Guest Posting</span>
                  <span className="text-[#717171] group-hover:text-[#F0A24C] text-xs transition-colors">→</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/seo-services-usa"
                  className="hover:text-[#F0A24C] transition-colors flex items-center justify-between group py-0.5"
                >
                  <span>Organic SEO &amp; Link Building</span>
                  <span className="text-[#717171] group-hover:text-[#F0A24C] text-xs transition-colors">→</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: RESOURCES & COMPANY (span 2) */}
          <div className="lg:col-span-2 space-y-4 text-left animate-shipcraft-col-3">
            <h4 className="text-[12px] font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E0A165]" />
              Resources
            </h4>
            <ul className="space-y-2.5 text-[13px] text-[#ADADAD]">
              <li>
                <Link href="/blog" className="hover:text-[#F0A24C] transition-colors block py-0.5">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-[#F0A24C] transition-colors block py-0.5">
                  Documentation &amp; Cases
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#F0A24C] transition-colors block py-0.5">
                  Videos &amp; Company
                </Link>
              </li>
              <li>
                <a
                  href="https://www.google.com/preferences/source?q=balajiprimemedia.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F0A24C] transition-colors block py-0.5"
                >
                  Community
                </a>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#F0A24C] transition-colors block py-0.5">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-[#F0A24C] transition-colors block py-0.5">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#F0A24C] transition-colors block py-0.5">
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
                  className="hover:text-[#F0A24C] transition-colors text-left cursor-pointer flex items-center gap-1.5 py-0.5 text-xs text-[#7D7D7D]"
                >
                  <span>Cookie Preferences</span>
                  <span className="text-[11px] text-[#F0A24C]">🍪</span>
                </button>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: NEWSLETTER & PAYMENTS (span 3) */}
          <div className="lg:col-span-3 space-y-5 text-left animate-shipcraft-col-4">
            
            {/* Newsletter with Glass Field & Warm Metal Gradient Key */}
            <div>
              <h4 className="text-[12px] font-bold uppercase tracking-wider text-white mb-1">
                Subscribe to our newsletter
              </h4>
              <p className="text-[11.5px] text-[#7D7D7D] mb-2.5">
                Shipcraft keeps every surface in sync, so you never rebuild from scratch.
              </p>
              <form onSubmit={handleSubscribe} className="relative flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@shipcraft.example"
                  required
                  className="w-full pl-3.5 pr-12 py-2.5 text-xs rounded-xl bg-[#1D1510]/80 border border-[#F0A24C]/30 focus:border-[#F0A24C] focus:outline-none text-white placeholder-[#717171] shadow-inner transition-colors"
                />
                <button
                  type="submit"
                  disabled={loading}
                  aria-label="Subscribe to newsletter"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 warm-metal-button text-[#1D1510] font-bold w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <span className="text-xs">⋯</span>
                  ) : (
                    <span className="text-sm font-black leading-none">→</span>
                  )}
                </button>
              </form>
              {subscribed ? (
                <p className="text-[11px] text-[#F0A24C] font-semibold mt-1.5 flex items-center gap-1">
                  <span>✓ Subscribed to Nova Growth!</span>
                </p>
              ) : (
                <p className="text-[10px] text-[#717171] mt-1.5">
                  Unsubscribe anytime. Zero spam policy.
                </p>
              )}
            </div>

            {/* Instant Free SEO Audit Card in Amber Glass */}
            <div className="bg-[#1D1510]/70 border border-[#F0A24C]/30 rounded-xl p-3.5 space-y-2 shadow-[0_4px_20px_rgba(0,0,0,0.4)] backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-white uppercase tracking-wider flex items-center gap-1">
                  <span className="text-[#F0A24C]">⚡</span> Free Instant SEO Audit
                </span>
                <span className="text-[10px] bg-[#F0A24C]/15 text-[#F0A24C] border border-[#F0A24C]/30 font-bold px-1.5 py-0.5 rounded">
                  Live
                </span>
              </div>
              <p className="text-[11px] text-[#ADADAD]">
                Check your website speed, Core Web Vitals, and search visibility in 10 seconds.
              </p>
              <Link
                href="/audit"
                className="amber-glass-button block w-full text-center py-2 text-white rounded-lg text-[11px] font-bold cursor-pointer border border-[#F0A24C]/30"
              >
                Run Free Website Audit ↗
              </Link>
            </div>

          </div>

        </div>

        {/* BOTTOM STRIP: PAYMENT ACCEPTED & SOCIAL ICONS */}
        <div className="mt-12 pt-6 border-t border-[#261E17] flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* We Accept Payment Icons (Warm chip style) */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#7D7D7D]">
            <span className="font-bold text-[#ADADAD] text-xs mr-1">We accept:</span>
            <span className="px-2.5 py-1 bg-[#1D1510] rounded-md border border-[#F0A24C]/20 text-[11px] font-bold text-[#ADADAD]">
              stripe
            </span>
            <span className="px-2.5 py-1 bg-[#1D1510] rounded-md border border-[#F0A24C]/20 text-[11px] font-bold text-[#38bdf8]">
              PayPal
            </span>
            <span className="px-2.5 py-1 bg-[#1D1510] rounded-md border border-[#F0A24C]/20 text-[11px] font-bold text-[#38bdf8]">
              Wise
            </span>
            <span className="px-2.5 py-1 bg-[#1D1510] rounded-md border border-[#F0A24C]/20 text-[10px] font-bold text-[#ADADAD]">
              Wire Transfer
            </span>
            <span className="px-2.5 py-1 bg-[#1D1510] rounded-md border border-[#F0A24C]/20 text-[11px] font-black text-white italic">
              VISA
            </span>
            <span className="px-2.5 py-1 bg-[#1D1510] rounded-md border border-[#F0A24C]/20 flex items-center gap-0.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#eb001b] inline-block -mr-1" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#f79e1b] inline-block opacity-85" />
            </span>
            <span className="px-2.5 py-1 bg-[#1D1510] rounded-md border border-[#F0A24C]/20 text-[10px] font-black text-[#F0A24C]">
              UPI
            </span>
            <span className="px-2.5 py-1 bg-[#1D1510] rounded-md border border-[#F0A24C]/20 text-[10px] font-bold text-[#E0A165]">
              ACH Transfer
            </span>
          </div>

          {/* Social Outline Icons in Amber Tone #E0A165 */}
          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href="https://wa.me/918000417058"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-[#F0A24C]/25 bg-[#1D1510]/80 hover:border-[#F0A24C] hover:bg-[#F0A24C]/15 text-[#E0A165] hover:text-white flex items-center justify-center transition-all text-xs shadow-sm hover:shadow-[0_0_15px_rgba(240,162,76,0.3)]"
              aria-label="Direct WhatsApp Support"
              title="WhatsApp Nova Growth"
            >
              💬
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-[#F0A24C]/25 bg-[#1D1510]/80 hover:border-[#F0A24C] hover:bg-[#F0A24C]/15 text-[#E0A165] hover:text-white flex items-center justify-center transition-all text-xs font-bold shadow-sm hover:shadow-[0_0_15px_rgba(240,162,76,0.3)]"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              in
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-[#F0A24C]/25 bg-[#1D1510]/80 hover:border-[#F0A24C] hover:bg-[#F0A24C]/15 text-[#E0A165] hover:text-white flex items-center justify-center transition-all text-xs font-bold shadow-sm hover:shadow-[0_0_15px_rgba(240,162,76,0.3)]"
              aria-label="X Twitter"
              title="X"
            >
              <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-[#F0A24C]/25 bg-[#1D1510]/80 hover:border-[#F0A24C] hover:bg-[#F0A24C]/15 text-[#E0A165] hover:text-white flex items-center justify-center transition-all text-xs shadow-sm hover:shadow-[0_0_15px_rgba(240,162,76,0.3)]"
              aria-label="Instagram"
              title="Instagram"
            >
              <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-[#F0A24C]/25 bg-[#1D1510]/80 hover:border-[#F0A24C] hover:bg-[#F0A24C]/15 text-[#E0A165] hover:text-white flex items-center justify-center transition-all text-xs shadow-sm hover:shadow-[0_0_15px_rgba(240,162,76,0.3)]"
              aria-label="YouTube"
              title="YouTube"
            >
              <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            <a
              href="mailto:shrahul270@gmail.com"
              className="w-8 h-8 rounded-full border border-[#F0A24C]/25 bg-[#1D1510]/80 hover:border-[#F0A24C] hover:bg-[#F0A24C]/15 text-[#E0A165] hover:text-white flex items-center justify-center transition-all text-xs shadow-sm hover:shadow-[0_0_15px_rgba(240,162,76,0.3)]"
              aria-label="Direct Email"
              title="Email Nova Growth"
            >
              ✉
            </a>
          </div>

        </div>

      </div>

      {/* BOTTOM SECTION: TWO WHITE CARRARA MARBLE HANDS REACHING TOWARD EACH OTHER & GIANT WORDMARK */}
      <div className="relative pt-10 pb-0 overflow-hidden border-t border-[#1C1612]">
        
        {/* Subtle amber rim light halos behind the hands */}
        <div
          aria-hidden="true"
          className="absolute left-0 bottom-0 w-[420px] h-[260px] bg-[radial-gradient(circle_at_left_bottom,rgba(240,162,76,0.22)_0%,transparent_75%)] pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute right-0 bottom-0 w-[420px] h-[260px] bg-[radial-gradient(circle_at_right_bottom,rgba(240,162,76,0.22)_0%,transparent_75%)] pointer-events-none"
        />

        {/* Left Carrara Marble Hand Reaching In */}
        <div className="absolute left-0 bottom-10 sm:bottom-8 md:bottom-6 z-10 pointer-events-none w-[200px] sm:w-[280px] md:w-[340px] lg:w-[420px] select-none animate-hand-left">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/footer/marble-hand-left.png"
            alt="Carrara Marble Hand Left"
            className="w-full h-auto object-contain filter drop-shadow-[0_0_24px_rgba(240,162,76,0.35)] opacity-95 transition-all"
          />
        </div>

        {/* Right Carrara Marble Hand Reaching In */}
        <div className="absolute right-0 bottom-10 sm:bottom-8 md:bottom-6 z-10 pointer-events-none w-[200px] sm:w-[280px] md:w-[340px] lg:w-[420px] select-none flex justify-end animate-hand-right">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/footer/marble-hand-right.png"
            alt="Carrara Marble Hand Right"
            className="w-full h-auto object-contain filter drop-shadow-[0_0_24px_rgba(240,162,76,0.35)] opacity-95 transition-all"
          />
        </div>

        {/* Center Info: Tagline, Copyright, and Legal Policies (Cleanly between reaching hands) */}
        <div className="relative z-20 max-w-2xl mx-auto px-4 text-center space-y-2 pb-8 sm:pb-12">
          <p className="text-white font-bold text-sm sm:text-base tracking-tight">
            Build a real app, fast.
          </p>
          <p className="text-xs text-[#ADADAD]">
            &copy; 2026 Shipcraft. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-[#7D7D7D] pt-1">
            <Link href="/privacy-policy" className="hover:text-[#F0A24C] transition-colors">
              Privacy Policy
            </Link>
            <span className="text-[#5A3418]">•</span>
            <Link href="/terms" className="hover:text-[#F0A24C] transition-colors">
              Terms of Service
            </Link>
            <span className="text-[#5A3418]">•</span>
            <button
              type="button"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.dispatchEvent(new Event("open-cookie-settings"));
                }
              }}
              className="hover:text-[#F0A24C] text-[#7D7D7D] transition-colors cursor-pointer font-medium"
            >
              Cookie Settings
            </button>
          </div>
        </div>

        {/* Giant Thin Amber-Brown Wordmark Sinking Off The Bottom Edge */}
        <div
          aria-hidden="true"
          className="w-full overflow-hidden flex justify-center items-end select-none pointer-events-none -mb-6 sm:-mb-10 md:-mb-14 lg:-mb-16 pt-2"
        >
          <span className="sinking-wordmark font-thin uppercase text-5xl sm:text-7xl md:text-9xl lg:text-[130px] xl:text-[160px] leading-none whitespace-nowrap opacity-85 tracking-widest scale-y-110">
            SHIPCRAFT
          </span>
        </div>

      </div>
    </footer>
  );
}
