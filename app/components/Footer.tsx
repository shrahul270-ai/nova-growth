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
          service: "Weekly SEO & Guest Post Digest",
          sourceUrl: typeof window !== "undefined" ? window.location.pathname : "/",
          message: "User subscribed to newsletter via footer form.",
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
      {/* Floating Free AI Audit right vertical tab */}
      <Link
        href="/audit"
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-[#4f46e5] hover:bg-[#4338ca] text-white py-3 px-2 rounded-l-xl shadow-xl flex items-center gap-1.5 transition-all text-xs font-bold tracking-wider uppercase [writing-mode:vertical-rl] rotate-180 hover:px-2.5 cursor-pointer border-l border-t border-b border-white/20"
        title="Get Free Instant AI SEO Audit"
      >
        <span className="rotate-90 text-amber-300 text-sm">✦</span>
        <span>FREE AI AUDIT</span>
      </Link>

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* COLUMN 1: Brand & Contact Info (span 4) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#091427] via-[#1d4ed8] to-[#0ea5e9] flex items-center justify-center shadow-md">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 20L4 4L20 20L20 4" />
                </svg>
              </div>
              <span className="text-xl font-black text-[#0f172a] tracking-tight">
                NOVA <span className="text-[#2563eb]">GROWTH</span>
              </span>
            </Link>

            {/* Tagline Headline */}
            <h3 className="text-sm font-bold text-[#0f172a] tracking-tight pt-1">
              Top #1 SEO & Guest Post Agency
            </h3>

            {/* Description */}
            <p className="text-[12.5px] leading-relaxed text-[#64748b]">
              At Nova Growth Powered by Apex Web Cube LLC, we think about converting
              ideas into success through innovative solutions and cutting-edge
              technology. Our group is eager to deliver high-quality, result-driven
              services that empower businesses to reach their full potential. With a
              priority on trust, excellence, and collaboration, we help you build a
              stronger online presence and drive meaningful growth. Let&apos;s create
              something amazing together!
            </p>

            {/* CONTACT INFORMATION */}
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
                    className="hover:text-[#2563eb] transition-colors break-all"
                  >
                    shrahul270@gmail.com
                  </a>
                </li>
                {/* Phone 1 */}
                <li className="flex items-center gap-2.5">
                  <span className="text-[#2563eb] text-sm shrink-0">☎</span>
                  <a
                    href="tel:+919694953370"
                    className="hover:text-[#2563eb] transition-colors"
                  >
                    +91 96949 53370
                  </a>
                </li>
                {/* Phone 2 / USA Desk */}
                <li className="flex items-center gap-2.5">
                  <span className="text-[#2563eb] text-sm shrink-0">📞</span>
                  <a
                    href="tel:+18288000589"
                    className="hover:text-[#2563eb] transition-colors"
                  >
                    +1 828-800-0589
                  </a>
                </li>
                {/* Address */}
                <li className="flex items-start gap-2.5">
                  <span className="text-[#2563eb] text-sm shrink-0 mt-0.5">📍</span>
                  <span>USA - 30N Gould St, STE R, Sheridan, WY 82801</span>
                </li>
              </ul>
            </div>
          </div>

          {/* COLUMN 2: SOLUTIONS & SERVICES (span 2.5) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-[12px] font-extrabold uppercase tracking-wider text-[#0f172a]">
              SOLUTIONS & SERVICES
            </h4>
            <ul className="space-y-2.5 text-[13px] text-[#475569]">
              <li>
                <Link
                  href="/guest-posting"
                  className="hover:text-[#2563eb] transition-colors flex items-center justify-between group"
                >
                  <span>Marketplace</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/audit"
                  className="hover:text-[#2563eb] transition-colors flex items-center justify-between group"
                >
                  <span>Free Tools</span>
                  <span className="text-gray-400 group-hover:text-[#2563eb] text-xs">⌄</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#2563eb] transition-colors flex items-center justify-between group"
                >
                  <span>Website Submission</span>
                  <span className="text-gray-400 group-hover:text-[#2563eb] text-xs">⌄</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-[#2563eb] transition-colors flex items-center justify-between group"
                >
                  <span>Services</span>
                  <span className="text-gray-400 group-hover:text-[#2563eb] text-xs">⌄</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="hover:text-[#2563eb] transition-colors flex items-center justify-between group"
                >
                  <span>Categories</span>
                  <span className="text-gray-400 group-hover:text-[#2563eb] text-xs">⌄</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-[#2563eb] transition-colors flex items-center justify-between group"
                >
                  <span>Resources</span>
                  <span className="text-gray-400 group-hover:text-[#2563eb] text-xs">⌄</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: SUPPORT (span 2) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-[12px] font-extrabold uppercase tracking-wider text-[#0f172a]">
              SUPPORT
            </h4>
            <ul className="space-y-2.5 text-[13px] text-[#475569]">
              <li>
                <Link href="/about" className="hover:text-[#2563eb] transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#2563eb] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#2563eb] transition-colors">
                  Help
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#2563eb] transition-colors">
                  Feedback
                </Link>
              </li>
              <li>
                <a
                  href="https://calendly.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#2563eb] transition-colors"
                >
                  Schedule Meeting
                </a>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#2563eb] transition-colors flex items-center justify-between group"
                >
                  <span>Legal</span>
                  <span className="text-gray-400 group-hover:text-[#2563eb] text-xs">⌄</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: QUICK LINKS & NEWSLETTER & APPS (span 3.5) */}
          <div className="lg:col-span-3 space-y-5">
            {/* Quick Links */}
            <div>
              <h4 className="text-[12px] font-extrabold uppercase tracking-wider text-[#0f172a] mb-2.5">
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
                Get the latest updates, SEO tips, and exclusive offers.
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
                  className="w-full bg-[#3b82f6] hover:bg-[#2563eb] text-white font-semibold text-xs py-2 px-4 rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-70"
                >
                  {subscribed ? (
                    <span>✓ Subscribed Successfully!</span>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <span className="text-xs">✈</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* DOWNLOAD OUR APP */}
            <div>
              <h5 className="text-[10.5px] font-extrabold uppercase tracking-wider text-[#0f172a] mb-2">
                DOWNLOAD OUR APP
              </h5>
              <div className="flex items-center gap-2">
                {/* Google Play */}
                <a
                  href="https://play.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-black hover:bg-gray-800 text-white px-2.5 py-1.5 rounded-md text-[10px] transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5.3 0 .58.09.82.25l13.5 8.5c.53.33.85.92.85 1.55s-.32 1.22-.85 1.55l-13.5 8.5c-.24.16-.52.25-.82.25-.83 0-1.5-.67-1.5-1.5z" />
                  </svg>
                  <div className="text-left leading-tight">
                    <span className="block text-[7px] text-gray-400 uppercase">GET IT ON</span>
                    <span className="font-bold">Google Play</span>
                  </div>
                </a>

                {/* App Store */}
                <a
                  href="https://apple.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-black hover:bg-gray-800 text-white px-2.5 py-1.5 rounded-md text-[10px] transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-2 .6-2.64 1.35-.57.65-1.07 1.72-.94 2.74 1.01.08 2.03-.49 2.65-1.24z" />
                  </svg>
                  <div className="text-left leading-tight">
                    <span className="block text-[7px] text-gray-400 uppercase">Download on the</span>
                    <span className="font-bold">App Store</span>
                  </div>
                </a>
              </div>
            </div>

            {/* GET OUR EXTENSION */}
            <div>
              <h5 className="text-[10.5px] font-extrabold uppercase tracking-wider text-[#0f172a] mb-1.5">
                GET OUR EXTENSION
              </h5>
              <a
                href="https://chrome.google.com/webstore"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 p-1.5 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors bg-[#f8fafc]"
                title="Chrome Extension"
              >
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-xs">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="5" fill="#4285F4" />
                    <path d="M12 2a10 10 0 0 0-8.66 5l4.33 7.5A5 5 0 0 1 12 7h9.54A10 10 0 0 0 12 2z" fill="#EA4335" />
                    <path d="M2.68 9.5a10 10 0 0 0 0 5l4.33-7.5A5 5 0 0 1 12 7V2A10 10 0 0 0 2.68 9.5z" fill="#FBBC05" />
                    <path d="M12 17a5 5 0 0 1-4.33-2.5L3.34 22A10 10 0 0 0 21.66 17H12z" fill="#34A853" />
                  </svg>
                </div>
                <span className="text-[11px] font-semibold text-gray-700">Available in Chrome Web Store</span>
              </a>
            </div>

          </div>

        </div>

        {/* BOTTOM STRIP: PAYMENT LOGOS & SOCIAL ICONS */}
        <div className="mt-12 pt-6 border-t border-gray-200/80 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* We Accept Payment Icons */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs text-gray-500">
            <span className="font-semibold text-gray-700 text-xs mr-1">We accept:</span>
            {/* Razorpay badge */}
            <span className="px-2 py-0.5 bg-[#f1f5f9] rounded border border-gray-200 text-[11px] font-bold text-[#0c2340]">
              Razorpay
            </span>
            {/* PayPal */}
            <span className="px-2 py-0.5 bg-[#f1f5f9] rounded border border-gray-200 text-[11px] font-bold text-[#003087]">
              PayPal
            </span>
            {/* Stripe */}
            <span className="px-2 py-0.5 bg-[#f1f5f9] rounded border border-gray-200 text-[11px] font-bold text-[#635bff]">
              stripe
            </span>
            {/* VISA */}
            <span className="px-2 py-0.5 bg-[#f1f5f9] rounded border border-gray-200 text-[11px] font-black text-[#1a1f71] italic">
              VISA
            </span>
            {/* Mastercard circles */}
            <span className="px-2 py-0.5 bg-[#f1f5f9] rounded border border-gray-200 flex items-center gap-0.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#eb001b] inline-block -mr-1" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#f79e1b] inline-block opacity-85" />
            </span>
            {/* AMEX */}
            <span className="px-2 py-0.5 bg-[#f1f5f9] rounded border border-gray-200 text-[10px] font-black text-[#006fcf]">
              AMEX
            </span>
            {/* UPI */}
            <span className="px-2 py-0.5 bg-[#f1f5f9] rounded border border-gray-200 text-[10px] font-black text-[#5f259f]">
              UPI
            </span>
            {/* Bitcoin */}
            <span className="px-2 py-0.5 bg-[#f1f5f9] rounded border border-gray-200 text-[10px] font-bold text-[#f7931a] flex items-center gap-1">
              <span>₿</span> Bitcoin
            </span>
            {/* USDT / Tether */}
            <span className="px-2 py-0.5 bg-[#f1f5f9] rounded border border-gray-200 text-[10px] font-bold text-[#26a17b] flex items-center gap-0.5">
              <span>₮</span> USDT
            </span>
          </div>

          {/* Social Icons (Circular Buttons matching image) */}
          <div className="flex flex-wrap items-center gap-2">
            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-full border border-gray-300 hover:border-[#0a66c2] hover:bg-[#0a66c2] hover:text-white text-gray-600 flex items-center justify-center transition-all text-xs font-bold"
              aria-label="LinkedIn"
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
            >
              <svg className="w-3 h-3 fill-currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-full border border-gray-300 hover:border-[#ff0000] hover:bg-[#ff0000] hover:text-white text-gray-600 flex items-center justify-center transition-all text-xs"
              aria-label="YouTube"
            >
              ▶
            </a>
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-full border border-gray-300 hover:border-[#e4405f] hover:bg-[#e4405f] hover:text-white text-gray-600 flex items-center justify-center transition-all text-xs"
              aria-label="Instagram"
            >
              <svg className="w-3 h-3 fill-currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-full border border-gray-300 hover:border-[#1877f2] hover:bg-[#1877f2] hover:text-white text-gray-600 flex items-center justify-center transition-all text-xs font-bold"
              aria-label="Facebook"
            >
              f
            </a>
            {/* Pinterest */}
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-full border border-gray-300 hover:border-[#e60023] hover:bg-[#e60023] hover:text-white text-gray-600 flex items-center justify-center transition-all text-xs font-bold"
              aria-label="Pinterest"
            >
              P
            </a>
            {/* WhatsApp */}
            <a
              href="https://wa.me/919694953370"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-full border border-gray-300 hover:border-[#25d366] hover:bg-[#25d366] hover:text-white text-gray-600 flex items-center justify-center transition-all text-xs"
              aria-label="WhatsApp"
            >
              💬
            </a>
            {/* Telegram */}
            <a
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-full border border-gray-300 hover:border-[#229ed9] hover:bg-[#229ed9] hover:text-white text-gray-600 flex items-center justify-center transition-all text-xs"
              aria-label="Telegram"
            >
              ✈
            </a>
            {/* Trustpilot Review Star */}
            <a
              href="https://trustpilot.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-full border border-gray-300 hover:border-[#00b67a] hover:bg-[#00b67a] hover:text-white text-gray-600 flex items-center justify-center transition-all text-xs"
              aria-label="Trustpilot Reviews"
              title="Trustpilot Reviews"
            >
              ★
            </a>
          </div>
        </div>

        {/* Copyright notice */}
        <div className="mt-6 text-center text-xs text-gray-400">
          &copy; 2026 Nova Growth. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
