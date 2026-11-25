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
          service: "Weekly SEO & Search Insights",
          sourceUrl: typeof window !== "undefined" ? window.location.pathname : "/",
          message: "User subscribed to newsletter via footer.",
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
    <footer className="bg-[#07030d] text-white font-satoshi border-t border-white/10 overflow-hidden">
      {/* Main Footer Container */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-8 lg:px-12 pt-12 sm:pt-16 pb-10">
        
        {/* Top Header Bar: Brand + Direct Consultation Call-to-Action */}
        <div className="pb-10 sm:pb-12 border-b border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5 mb-2 group">
              <div className="relative w-6 h-6 flex items-center shrink-0">
                <span className="w-5 h-5 rounded-full border border-white/90 block" />
                <span className="w-5 h-5 rounded-full bg-white block -ml-2.5" />
              </div>
              <span className="font-bebas text-2xl tracking-[0.16em] text-white group-hover:text-[#38bdf8] transition-colors">
                BALAJI PRIME MEDIA
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-lg leading-relaxed font-normal">
              Premier SEO agency and Next.js web development company in Jaipur, engineering high-impact organic search growth and white-hat digital PR for global brands.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/schedule-meeting"
              className="px-5 py-2.5 rounded-[4px] bg-[#681fe4] hover:bg-[#5815cb] text-white font-bebas text-xs sm:text-sm tracking-[0.14em] uppercase transition-all shadow-[0_4px_14px_rgba(104,31,228,0.3)] inline-flex items-center gap-2"
            >
              <span>Schedule Strategy Call</span>
              <span>→</span>
            </Link>
            <a
              href="https://wa.me/917690868932"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-[4px] border border-white/20 hover:border-white/40 hover:bg-white/5 text-white font-bebas text-xs sm:text-sm tracking-[0.14em] uppercase transition-all inline-flex items-center gap-2"
            >
              <span>WhatsApp Direct</span>
              <span>💬</span>
            </a>
          </div>
        </div>

        {/* 4-Column Navigation Grid - Matches Navbar & Site Architecture */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 py-10 sm:py-12 border-b border-white/10 text-left">
          
          {/* Column 1: Main Navigation (Navbar Pages) */}
          <div className="space-y-3.5">
            <span className="font-bebas text-xs sm:text-sm tracking-[0.2em] text-[#38bdf8] uppercase block">
              Navigation
            </span>
            <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-300">
              <li>
                <Link href="/" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>Home</span>
                  <span className="text-neutral-600 text-xs">01</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>Services</span>
                  <span className="text-neutral-600 text-xs">02</span>
                </Link>
              </li>
              <li>
                <Link href="/guest-posting" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>Guest Posting &amp; Digital PR</span>
                  <span className="text-neutral-600 text-xs">03</span>
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>Projects &amp; Case Studies</span>
                  <span className="text-neutral-600 text-xs">04</span>
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>Blog &amp; Search Insights</span>
                  <span className="text-neutral-600 text-xs">05</span>
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>About Us</span>
                  <span className="text-neutral-600 text-xs">06</span>
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>Contact Us</span>
                  <span className="text-neutral-600 text-xs">07</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Key Growth Services */}
          <div className="space-y-3.5">
            <span className="font-bebas text-xs sm:text-sm tracking-[0.2em] text-[#38bdf8] uppercase block">
              Core Services
            </span>
            <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-300">
              <li>
                <Link href="/services/seo-optimization" className="hover:text-[#38bdf8] transition-colors block">
                  Technical SEO Optimization
                </Link>
              </li>
              <li>
                <Link href="/services/website-development" className="hover:text-[#38bdf8] transition-colors block">
                  Next.js Web Development
                </Link>
              </li>
              <li>
                <Link href="/services/backlink-building" className="hover:text-[#38bdf8] transition-colors block">
                  Digital PR &amp; Media Outreach
                </Link>
              </li>
              <li>
                <Link href="/seo-services-usa" className="hover:text-[#38bdf8] transition-colors block">
                  SEO Services USA
                </Link>
              </li>
              <li>
                <Link href="/web-development-uk" className="hover:text-[#38bdf8] transition-colors block">
                  Web Development UK
                </Link>
              </li>
              <li>
                <Link href="/services/email-marketing" className="hover:text-[#38bdf8] transition-colors block">
                  Email Marketing &amp; Retention
                </Link>
              </li>
              <li>
                <Link href="/services/website-maintenance" className="hover:text-[#38bdf8] transition-colors block">
                  Website Maintenance &amp; SLAs
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources & Tools from Navigation */}
          <div className="space-y-3.5">
            <span className="font-bebas text-xs sm:text-sm tracking-[0.2em] text-[#38bdf8] uppercase block">
              Resources &amp; Tools
            </span>
            <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-300">
              <li>
                <Link href="/audit" className="hover:text-[#38bdf8] transition-colors flex items-center justify-between">
                  <span>Free SEO Audit Tool</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#681fe4]/20 text-[#a855f7] font-mono">Instant</span>
                </Link>
              </li>
              <li>
                <Link href="/schedule-meeting" className="hover:text-[#38bdf8] transition-colors block">
                  Schedule Strategy Meeting
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#38bdf8] transition-colors block">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/help-center" className="hover:text-[#38bdf8] transition-colors block">
                  Client Help Center
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="hover:text-[#38bdf8] transition-colors block">
                  Client Reviews &amp; Feedback
                </Link>
              </li>
              <li>
                <Link href="/pay" className="hover:text-[#38bdf8] transition-colors flex items-center justify-between">
                  <span>Client Invoices &amp; Pay</span>
                  <span className="text-xs">💳</span>
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" target="_blank" className="hover:text-[#38bdf8] transition-colors flex items-center gap-1.5 text-neutral-400">
                  <span>XML Sitemap</span>
                  <span className="text-xs">↗</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Clean Location & Direct Contact */}
          <div className="space-y-3.5">
            <span className="font-bebas text-xs sm:text-sm tracking-[0.2em] text-[#38bdf8] uppercase block">
              Headquarters
            </span>
            <div className="space-y-3 text-xs sm:text-sm text-neutral-300">
              <div>
                <span className="text-neutral-400 block text-xs">Office Location:</span>
                <p className="text-white font-medium mt-0.5">
                  Jaipur, Rajasthan 302017, India
                </p>
                <a
                  href="https://maps.google.com/?q=14/82,+Malviya+Nagar,+Jaipur,+Rajasthan+302017"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#38bdf8] hover:underline text-xs inline-flex items-center gap-1 mt-1 font-mono"
                >
                  <span>View on Google Maps</span>
                  <span>↗</span>
                </a>
              </div>

              <div className="pt-2 border-t border-white/10 space-y-1.5">
                <div>
                  <span className="text-neutral-400 block text-xs">Direct Email:</span>
                  <a href="mailto:support@balajiprimemedia.in" className="text-white hover:text-[#38bdf8] transition-colors font-mono text-xs">
                    support@balajiprimemedia.in
                  </a>
                </div>
                <div>
                  <span className="text-neutral-400 block text-xs">Phone / WhatsApp:</span>
                  <a href="tel:+917690868932" className="text-white hover:text-[#38bdf8] transition-colors font-mono text-xs">
                    +91 76908 68932
                  </a>
                </div>
              </div>

              {/* Social Channels in Clean Sharp Buttons */}
              <div className="pt-3">
                <span className="text-neutral-400 block text-xs mb-2">Connect With Us:</span>
                <div className="flex items-center gap-2">
                  {[
                    { name: "LinkedIn", href: "https://www.linkedin.com/company/balajiprimemedia", label: "LI" },
                    { name: "Twitter/X", href: "https://x.com/balajiprimemedia", label: "X" },
                    { name: "Telegram", href: "https://t.me/balajiprimemedia", label: "TG" },
                    { name: "WhatsApp", href: "https://wa.me/917690868932", label: "WA" },
                  ].map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-[4px] border border-white/15 hover:border-[#38bdf8] hover:bg-[#38bdf8]/10 flex items-center justify-center font-bebas text-xs text-neutral-300 hover:text-white transition-all"
                      title={s.name}
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Newsletter Subscription Bar */}
        <div className="py-6 sm:py-8 border-b border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="font-bebas text-xs tracking-[0.18em] text-[#38bdf8] uppercase block">
              Search Intelligence Newsletter
            </span>
            <p className="text-xs text-neutral-400 mt-0.5">
              Actionable briefings on Google core algorithm updates, technical SEO benchmarks, and digital PR.
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full md:w-auto min-w-[280px] sm:min-w-[340px]">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter work email"
              required
              className="w-full bg-white/5 border border-white/20 rounded-[4px] px-3.5 py-2 text-white placeholder-neutral-500 focus:border-[#38bdf8] outline-none text-xs transition-colors"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-[#681fe4] hover:bg-[#5815cb] text-white rounded-[4px] font-bebas text-xs tracking-[0.14em] uppercase transition-colors shrink-0 disabled:opacity-50"
            >
              {loading ? "..." : subscribed ? "Subscribed!" : "Subscribe"}
            </button>
          </form>
        </div>

        {/* Bottom Bar: Legal Links & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 font-satoshi">
          <p>© 2026 Balaji Prime Media. All rights reserved.</p>
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/sitemap.xml" target="_blank" className="hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
