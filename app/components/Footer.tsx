"use client";

import React, { useState } from "react";
import Link from "next/link";

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
    <footer className="bg-[#07030d] text-white font-satoshi z-10 overflow-hidden border-t border-white/10">
      
      {/* =====================================================================
          TIER 1: Massive 'Let's Work Together' & Brand Identification
         ===================================================================== */}
      <div className="max-w-[1320px] mx-auto px-6 sm:px-12 py-16 sm:py-20 border-b border-white/10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 text-left">
          <div>
            <div className="flex items-center gap-3.5 mb-6">
              <div className="relative w-8 h-8 flex items-center shrink-0">
                <span className="w-6 h-6 rounded-full border border-white/90 block" />
                <span className="w-6 h-6 rounded-full bg-white block -ml-3" />
              </div>
              <span className="font-bebas text-2xl tracking-[0.2em] text-white">
                BALAJI PRIME MEDIA
              </span>
            </div>

            <span className="font-bebas text-xs sm:text-sm tracking-[0.24em] text-white/50 uppercase block mb-2">
              // INITIATE COMMERCIAL PARTNERSHIP
            </span>
            <a
              href={emailInquiryHref}
              className="font-bebas text-3xl sm:text-5xl md:text-6xl tracking-[0.14em] text-[#681fe4] hover:text-white transition-colors block uppercase leading-none"
            >
              LET&apos;S WORK TOGETHER →
            </a>
            <span className="text-neutral-400 text-xs sm:text-sm block mt-2 font-mono">
              support@balajiprimemedia.in • Direct Client Inquiries (+91 76908 68932)
            </span>
          </div>

          {/* Social Channels in Sharp 4px Boxes */}
          <div className="flex items-center gap-3">
            {[
              { name: "WhatsApp", href: "https://wa.me/917690868932", label: "WA" },
              { name: "Telegram", href: "https://t.me/balajiprimemedia", label: "TG" },
              { name: "LinkedIn", href: "https://linkedin.com", label: "LI" },
              { name: "Twitter", href: "https://twitter.com", label: "X" },
            ].map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-[4px] border border-white/10 hover:border-[#681fe4] hover:bg-[#681fe4] flex items-center justify-center font-bebas text-sm tracking-[0.12em] text-white transition-all cursor-pointer"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* =====================================================================
          TIER 2: 4-Column Grid with User's Exact NAVIGATION & SUPPORT & MORE
         ===================================================================== */}
      <div className="max-w-[1320px] mx-auto px-6 sm:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-left">
          
          {/* Col 1: About & Location */}
          <div className="space-y-3">
            <span className="font-bebas text-sm tracking-[0.24em] text-[#681fe4] uppercase block">
              01 // AGENCY IDENTITY
            </span>
            <p className="text-neutral-400 text-xs leading-relaxed font-normal">
              Balaji Prime Media is an engineering-first growth agency architecting organic search revenue dominance for US, UK, and European brands through verified editorial media and high-speed Next.js systems.
            </p>
            <div className="pt-2 text-[11px] text-white/50 font-mono">
              GLOBAL TIMING // EST • GMT • AEST
            </div>
            <div className="text-xs text-neutral-400 pt-1">
              📍 Jaipur, India &amp; Global Operations
            </div>
            <div className="pt-2 text-xs text-neutral-300 flex items-center gap-2 font-mono">
              <span className="text-[#681fe4]">✉️</span>
              <a
                href="mailto:support@balajiprimemedia.in"
                className="hover:text-[#681fe4] transition-colors"
              >
                support@balajiprimemedia.in
              </a>
            </div>
          </div>

          {/* Col 2: NAVIGATION (Website-consistent Modern Industrial Color Pattern) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-[2px] bg-[#681fe4]" />
              <span className="font-bebas text-sm tracking-[0.24em] text-[#681fe4] uppercase block">
                02 // NAVIGATION
              </span>
            </div>
            <ul className="space-y-3 text-sm text-neutral-300 font-satoshi">
              <li>
                <Link
                  href="/"
                  className="group flex items-center justify-between hover:text-[#681fe4] transition-colors"
                >
                  <span>Home</span>
                  <span className="text-neutral-500 group-hover:text-[#681fe4] group-hover:translate-x-1 transition-all text-xs">
                    →
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/guest-posting"
                  className="group flex items-center justify-between hover:text-[#681fe4] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span>Guest Posting</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#681fe4]/30 text-[#d8b4fe] border border-[#681fe4]/50 font-mono">
                      DR 50+
                    </span>
                  </span>
                  <span className="text-neutral-500 group-hover:text-[#681fe4] group-hover:translate-x-1 transition-all text-xs">
                    →
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="group flex items-center justify-between hover:text-[#681fe4] transition-colors"
                >
                  <span>Services</span>
                  <span className="text-neutral-500 group-hover:text-[#681fe4] group-hover:translate-x-1 transition-all text-xs">
                    →
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="group flex items-center justify-between hover:text-[#681fe4] transition-colors"
                >
                  <span>Projects</span>
                  <span className="text-neutral-500 group-hover:text-[#681fe4] group-hover:translate-x-1 transition-all text-xs">
                    →
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="group flex items-center justify-between hover:text-[#681fe4] transition-colors"
                >
                  <span>Blog</span>
                  <span className="text-neutral-500 group-hover:text-[#681fe4] group-hover:translate-x-1 transition-all text-xs">
                    →
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className="group flex items-center justify-between hover:text-[#681fe4] transition-colors"
                >
                  <span>About Us</span>
                  <span className="text-neutral-500 group-hover:text-[#681fe4] group-hover:translate-x-1 transition-all text-xs">
                    →
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="group flex items-center justify-between hover:text-[#681fe4] transition-colors"
                >
                  <span>Contact Us</span>
                  <span className="text-neutral-500 group-hover:text-[#681fe4] group-hover:translate-x-1 transition-all text-xs">
                    →
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/pay"
                  className="group flex items-center justify-between hover:text-[#681fe4] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span>Payment</span>
                    <span>💳</span>
                  </span>
                  <span className="text-neutral-500 group-hover:text-[#681fe4] group-hover:translate-x-1 transition-all text-xs">
                    →
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: SUPPORT & MORE (Website-consistent Modern Industrial Color Pattern) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-[2px] bg-[#681fe4]" />
              <span className="font-bebas text-sm tracking-[0.24em] text-[#681fe4] uppercase block">
                03 // SUPPORT &amp; MORE
              </span>
            </div>
            <ul className="space-y-3 text-sm text-neutral-300 font-satoshi">
              <li>
                <Link
                  href="/faq"
                  className="group flex items-center justify-between hover:text-[#681fe4] transition-colors"
                >
                  <span>FAQ</span>
                  <span className="text-neutral-500 group-hover:text-[#681fe4] group-hover:translate-x-1 transition-all text-xs">
                    →
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/feedback"
                  className="group flex items-center justify-between hover:text-[#681fe4] transition-colors"
                >
                  <span>Feedback</span>
                  <span className="text-neutral-500 group-hover:text-[#681fe4] group-hover:translate-x-1 transition-all text-xs">
                    →
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/schedule-meeting"
                  className="group flex items-center justify-between text-[#c4b5fd] hover:text-white font-medium transition-colors"
                >
                  <span>Schedule Meeting</span>
                  <span>🗓️</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/help-center"
                  className="group flex items-center justify-between hover:text-[#681fe4] transition-colors"
                >
                  <span>Help Center</span>
                  <span className="text-neutral-500 group-hover:text-[#681fe4] group-hover:translate-x-1 transition-all text-xs">
                    →
                  </span>
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@balajiprimemedia.in"
                  className="group flex items-center justify-between hover:text-[#681fe4] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span>Direct Email</span>
                    <span className="text-xs">✉️</span>
                  </span>
                  <span className="text-neutral-500 group-hover:text-[#681fe4] group-hover:translate-x-1 transition-all text-xs font-mono">
                    support@balajiprimemedia.in →
                  </span>
                </a>
              </li>

              {/* Subtle Horizontal Divider line */}
              <li className="pt-2 border-t border-white/10" />

              <li>
                <Link
                  href="/privacy-policy"
                  className="block text-neutral-400 hover:text-white transition-colors text-xs sm:text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="block text-neutral-400 hover:text-white transition-colors text-xs sm:text-sm"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/sitemap.xml"
                  target="_blank"
                  className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors text-xs sm:text-sm"
                >
                  <span>Sitemap</span>
                  <span>🗺️</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter Subscription Box */}
          <div className="space-y-4">
            <span className="font-bebas text-sm tracking-[0.24em] text-[#681fe4] uppercase block">
              04 // INTELLIGENCE BRIEF
            </span>
            <p className="text-neutral-400 text-xs leading-relaxed font-normal">
              Receive our monthly confidential briefing on Google algorithmic shifts, Core Web Vitals changes, and high-impact SEO tactics.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2 pt-1">
              <div className="flex items-center gap-2">
                {/* Bottom-border-only input */}
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER WORK EMAIL"
                  required
                  className="w-full bg-transparent border-b border-white/20 text-white placeholder-white/40 focus:border-[#681fe4] outline-none text-xs py-2 font-bebas tracking-[0.14em] transition-colors"
                />
                {/* Violet send icon */}
                <button
                  type="submit"
                  disabled={loading}
                  aria-label="Subscribe to intelligence brief"
                  className="w-10 h-10 bg-[#681fe4] hover:bg-[#5815cb] text-white rounded-[4px] flex items-center justify-center shrink-0 transition-colors shadow-xs cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <span className="text-xs">⋯</span>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  )}
                </button>
              </div>
              {subscribed ? (
                <p className="text-xs font-bebas tracking-[0.12em] text-[#681fe4]">
                  ✓ SUBSCRIBED TO INTELLIGENCE BRIEFING!
                </p>
              ) : (
                <p className="text-[11px] text-neutral-500 font-mono">
                  Zero spam. Direct advisory from founders.
                </p>
              )}
            </form>
          </div>

        </div>

        {/* BOTTOM ROW: PAYMENT ACCEPTED, LEGAL LINKS & COPYRIGHT */}
        <div className="pt-12 mt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-bebas tracking-[0.18em] text-neutral-500">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-white/60">ACCEPTED INVOICE METHODS:</span>
            <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded-[2px] text-white/80">STRIPE</span>
            <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded-[2px] text-white/80">PAYPAL</span>
            <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded-[2px] text-white/80">WISE / WIRE</span>
            <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded-[2px] text-white/80">UPI / ACH</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              PRIVACY POLICY
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              TERMS OF SERVICE
            </Link>
            <Link href="/sitemap.xml" className="hover:text-white transition-colors">
              SITEMAP
            </Link>
          </div>
        </div>

        <div className="mt-4 text-center sm:text-left text-[11px] font-mono text-neutral-600">
          © 2026 BALAJI PRIME MEDIA. ALL RIGHTS RESERVED. GLOBAL SEO &amp; DIGITAL GROWTH ARCHITECTURE.
        </div>

        {/* =====================================================================
            TIER 3: Giant Outlined Brand Wordmark ("balaji prime media")
            Chopskip-style hollow brand-violet outline footer element
           ===================================================================== */}
        <div className="pt-10 sm:pt-14 pb-3 sm:pb-5 overflow-hidden flex items-center justify-center select-none">
          <span
            className="footer-mega-wordmark cursor-default"
            aria-label="balaji prime media"
            style={{
              fontFamily: "'Bricolage Grotesque', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(34px, 8.8vw, 155px)",
              lineHeight: 0.88,
              letterSpacing: "-0.04em",
              color: "transparent",
              WebkitTextFillColor: "transparent",
              WebkitTextStroke: "2.2px #b886ff",
              filter: "drop-shadow(0 0 24px rgba(168, 85, 247, 0.55))",
              display: "inline-block",
              whiteSpace: "nowrap",
            }}
          >
            balaji prime media
          </span>
        </div>

        {/* BOTTOM METADATA BAR */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-neutral-500">
          <div>
            © 2026 BALAJI PRIME MEDIA. Made with ❤️ in Jaipur &amp; Global Operations.
          </div>
          <div className="flex items-center gap-3 text-neutral-400">
            <span className="flex items-center gap-1.5 text-neutral-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b886ff] animate-pulse" />
              CLIENT INTAKE ACTIVE
            </span>
            <span>•</span>
            <span className="text-neutral-500">GLOBAL SEO ARCHITECTURE</span>
          </div>
        </div>

      </div>

    </footer>
  );
}
