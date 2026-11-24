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
      <div className="max-w-[1320px] mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20 border-b border-white/10">
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

            <span className="font-bebas text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.24em] text-white/50 uppercase block mb-2">
              // INITIATE COMMERCIAL PARTNERSHIP
            </span>
            <a
              href={emailInquiryHref}
              className="font-bebas text-2xl xs:text-3xl sm:text-5xl md:text-6xl tracking-[0.08em] sm:tracking-[0.14em] text-[#0ea5e9] hover:text-white transition-colors block uppercase leading-none break-words"
            >
              LET&apos;S WORK TOGETHER →
            </a>
            <div className="text-neutral-400 text-xs sm:text-sm mt-2 font-mono flex flex-wrap gap-x-2 gap-y-1">
              <a href="mailto:support@balajiprimemedia.in" className="hover:text-white transition-colors">support@balajiprimemedia.in</a>
              <span>•</span>
              <a href="tel:+917690868932" className="hover:text-white transition-colors">Direct Client Inquiries (+91 76908 68932)</a>
            </div>
          </div>

          {/* Social Channels in Sharp 4px Boxes */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
            {[
              { name: "WhatsApp", href: "https://wa.me/917690868932", label: "WA" },
              { name: "Telegram", href: "https://t.me/balajiprimemedia", label: "TG" },
              { name: "LinkedIn", href: "https://www.linkedin.com/company/balajiprimemedia", label: "LI" },
              { name: "Twitter", href: "https://x.com/balajiprimemedia", label: "X" },
            ].map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-[4px] border border-white/10 hover:border-[#0ea5e9] hover:bg-[#0284c7] flex items-center justify-center font-bebas text-xs sm:text-sm tracking-[0.12em] text-white transition-all cursor-pointer"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* =====================================================================
          TIER 2: 4-Column Grid with Deep Internal Links & Local NAP Signals
         ===================================================================== */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 text-left">
          
          {/* Col 1: About, Complete Local NAP & Google Business Profile */}
          <div className="space-y-3.5">
            <span className="font-bebas text-sm tracking-[0.24em] text-[#38bdf8] uppercase block">
              01 // AGENCY &amp; HEADQUARTERS
            </span>
            <p className="text-neutral-400 text-xs leading-relaxed font-normal">
              Balaji Prime Media is an engineering-first growth agency architecting organic search dominance for US, UK, and global brands through verified editorial media and high-speed Next.js systems.
            </p>
            
            <div className="pt-2 space-y-2 text-xs border-t border-white/10">
              <div className="text-neutral-300 flex items-start gap-2">
                <span className="text-[#38bdf8] shrink-0 mt-0.5">📍</span>
                <div>
                  <strong className="text-white block font-medium">Headquarters Address:</strong>
                  <span className="text-neutral-400 leading-snug block">14/82, Malviya Nagar, Jaipur, Rajasthan 302017, India</span>
                  <a
                    href="https://maps.google.com/?q=14/82,+Malviya+Nagar,+Jaipur,+Rajasthan+302017"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#38bdf8] hover:underline font-mono text-[11px] inline-block mt-1"
                  >
                    View on Google Maps →
                  </a>
                </div>
              </div>

              <div className="text-neutral-300 flex items-center gap-2 font-mono text-[11px]">
                <span className="text-[#38bdf8]">📞</span>
                <a href="tel:+917690868932" className="hover:text-white transition-colors">
                  +91 76908 68932
                </a>
              </div>

              <div className="text-neutral-300 flex items-center gap-2 font-mono text-[11px]">
                <span className="text-[#38bdf8]">✉️</span>
                <a href="mailto:support@balajiprimemedia.in" className="hover:text-white transition-colors">
                  support@balajiprimemedia.in
                </a>
              </div>

              <div className="pt-1 text-[11px] text-white/50 font-mono">
                HOURS: MON–SAT 9:00 AM – 8:00 PM IST
              </div>
              <div className="text-[11px] text-[#38bdf8]/80 font-mono">
                GLOBAL OPS // EST • GMT • AEST
              </div>
            </div>
          </div>

          {/* Col 2: CORE GROWTH SERVICES (Includes previously orphaned /services/ URLs) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-[2px] bg-[#0ea5e9]" />
              <span className="font-bebas text-sm tracking-[0.24em] text-[#38bdf8] uppercase block">
                02 // CORE SERVICES
              </span>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-300 font-satoshi">
              <li>
                <Link
                  href="/services/seo-optimization"
                  className="group flex items-center justify-between hover:text-[#38bdf8] transition-colors"
                >
                  <span>Technical SEO Optimization</span>
                  <span className="text-neutral-500 group-hover:text-[#38bdf8] group-hover:translate-x-1 transition-all text-xs">→</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services/website-development"
                  className="group flex items-center justify-between hover:text-[#38bdf8] transition-colors"
                >
                  <span>Next.js Web Engineering</span>
                  <span className="text-neutral-500 group-hover:text-[#38bdf8] group-hover:translate-x-1 transition-all text-xs">→</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services/backlink-building"
                  className="group flex items-center justify-between hover:text-[#38bdf8] transition-colors"
                >
                  <span>Digital PR &amp; Media Outreach</span>
                  <span className="text-neutral-500 group-hover:text-[#38bdf8] group-hover:translate-x-1 transition-all text-xs">→</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services/email-marketing"
                  className="group flex items-center justify-between hover:text-[#38bdf8] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span>Email Marketing &amp; Retention</span>
                    <span className="px-1.5 py-0.2 rounded text-[10px] bg-[#0ea5e9]/20 text-[#7dd3fc]">ROI</span>
                  </span>
                  <span className="text-neutral-500 group-hover:text-[#38bdf8] group-hover:translate-x-1 transition-all text-xs">→</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services/website-maintenance"
                  className="group flex items-center justify-between hover:text-[#38bdf8] transition-colors"
                >
                  <span>Website Maintenance &amp; SLA</span>
                  <span className="text-neutral-500 group-hover:text-[#38bdf8] group-hover:translate-x-1 transition-all text-xs">→</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services/full-stack-php-dev"
                  className="group flex items-center justify-between hover:text-[#38bdf8] transition-colors"
                >
                  <span>Full Stack PHP &amp; Laravel</span>
                  <span className="text-neutral-500 group-hover:text-[#38bdf8] group-hover:translate-x-1 transition-all text-xs">→</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services/flutter-app-dev"
                  className="group flex items-center justify-between hover:text-[#38bdf8] transition-colors"
                >
                  <span>Flutter Mobile &amp; Web Apps</span>
                  <span className="text-neutral-500 group-hover:text-[#38bdf8] group-hover:translate-x-1 transition-all text-xs">→</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services/content-writing"
                  className="group flex items-center justify-between hover:text-[#38bdf8] transition-colors"
                >
                  <span>Search Content Strategy</span>
                  <span className="text-neutral-500 group-hover:text-[#38bdf8] group-hover:translate-x-1 transition-all text-xs">→</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="group flex items-center justify-between text-[#38bdf8] hover:text-white font-medium transition-colors pt-1"
                >
                  <span>View All Services Matrix →</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: REGIONAL HUBS & FEATURED PROJECTS (Fixes /seo-services-usa, /web-development-uk, /projects/fintech-app) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-[2px] bg-[#0ea5e9]" />
              <span className="font-bebas text-sm tracking-[0.24em] text-[#38bdf8] uppercase block">
                03 // REGIONAL HUBS &amp; WORK
              </span>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-300 font-satoshi">
              <li>
                <Link
                  href="/seo-services-usa"
                  className="group flex items-center justify-between hover:text-[#38bdf8] transition-colors font-medium text-white"
                >
                  <span className="flex items-center gap-1.5">
                    <span>🇺🇸 SEO Services USA</span>
                  </span>
                  <span className="text-[#38bdf8] text-xs">Hub →</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/web-development-uk"
                  className="group flex items-center justify-between hover:text-[#38bdf8] transition-colors font-medium text-white"
                >
                  <span className="flex items-center gap-1.5">
                    <span>🇬🇧 Web Development UK</span>
                  </span>
                  <span className="text-[#38bdf8] text-xs">Hub →</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/guest-posting"
                  className="group flex items-center justify-between hover:text-[#38bdf8] transition-colors"
                >
                  <span>Editorial Media Outreach</span>
                  <span className="text-neutral-500 group-hover:text-[#38bdf8] group-hover:translate-x-1 transition-all text-xs">→</span>
                </Link>
              </li>
              <li className="pt-1 border-t border-white/10" />
              <li>
                <Link
                  href="/projects/fintech-app"
                  className="group flex items-center justify-between hover:text-[#38bdf8] transition-colors"
                >
                  <span>Fintech Platform Architecture</span>
                  <span className="text-neutral-500 group-hover:text-[#38bdf8] group-hover:translate-x-1 transition-all text-xs">→</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/projects/fashion-brand"
                  className="group flex items-center justify-between hover:text-[#38bdf8] transition-colors"
                >
                  <span>Luxe Fashion US Headless</span>
                  <span className="text-neutral-500 group-hover:text-[#38bdf8] group-hover:translate-x-1 transition-all text-xs">→</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/projects/saas-pipeline"
                  className="group flex items-center justify-between hover:text-[#38bdf8] transition-colors"
                >
                  <span>CloudSync B2B Search Engine</span>
                  <span className="text-neutral-500 group-hover:text-[#38bdf8] group-hover:translate-x-1 transition-all text-xs">→</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/projects/local-growth"
                  className="group flex items-center justify-between hover:text-[#38bdf8] transition-colors"
                >
                  <span>Apex Dental UK Local Citations</span>
                  <span className="text-neutral-500 group-hover:text-[#38bdf8] group-hover:translate-x-1 transition-all text-xs">→</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="group flex items-center justify-between text-[#38bdf8] hover:text-white font-medium transition-colors pt-1"
                >
                  <span>View All Case Studies →</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: EDITORIAL INSIGHTS & SUPPORT (Fixes /blog/google-maps-local-seo) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-[2px] bg-[#0ea5e9]" />
              <span className="font-bebas text-sm tracking-[0.24em] text-[#38bdf8] uppercase block">
                04 // INSIGHTS &amp; SUPPORT
              </span>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-300 font-satoshi">
              <li>
                <Link
                  href="/blog/google-maps-local-seo"
                  className="group flex items-center justify-between hover:text-[#38bdf8] transition-colors"
                >
                  <span>Google Maps &amp; Local SEO</span>
                  <span className="text-neutral-500 group-hover:text-[#38bdf8] group-hover:translate-x-1 transition-all text-xs">→</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/nextjs-vs-wordpress"
                  className="group flex items-center justify-between hover:text-[#38bdf8] transition-colors"
                >
                  <span>Next.js vs WordPress Architecture</span>
                  <span className="text-neutral-500 group-hover:text-[#38bdf8] group-hover:translate-x-1 transition-all text-xs">→</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/ecommerce-seo-scaling"
                  className="group flex items-center justify-between hover:text-[#38bdf8] transition-colors"
                >
                  <span>E-Commerce SEO Scaling</span>
                  <span className="text-neutral-500 group-hover:text-[#38bdf8] group-hover:translate-x-1 transition-all text-xs">→</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="group flex items-center justify-between hover:text-[#38bdf8] transition-colors"
                >
                  <span>Frequently Asked Questions</span>
                  <span className="text-neutral-500 group-hover:text-[#38bdf8] group-hover:translate-x-1 transition-all text-xs">→</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/schedule-meeting"
                  className="group flex items-center justify-between text-[#7dd3fc] hover:text-white font-medium transition-colors"
                >
                  <span>Schedule Strategy Meeting</span>
                  <span>🗓️</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className="group flex items-center justify-between hover:text-[#38bdf8] transition-colors"
                >
                  <span>About Our Founders</span>
                  <span className="text-neutral-500 group-hover:text-[#38bdf8] group-hover:translate-x-1 transition-all text-xs">→</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="group flex items-center justify-between hover:text-[#38bdf8] transition-colors"
                >
                  <span>Contact Our Team</span>
                  <span className="text-neutral-500 group-hover:text-[#38bdf8] group-hover:translate-x-1 transition-all text-xs">→</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/sitemap.xml"
                  target="_blank"
                  className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors text-xs pt-1"
                >
                  <span>XML Sitemap</span>
                  <span>🗺️</span>
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* NEWSLETTER ROW: Clean, Modern Newsletter Bar */}
        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 bg-white/[0.02] p-6 rounded-[4px] border border-white/5">
          <div className="text-left max-w-xl">
            <span className="font-bebas text-xs tracking-[0.2em] text-[#38bdf8] uppercase block mb-1">
              SEARCH INTELLIGENCE BRIEF
            </span>
            <h4 className="font-bebas text-xl text-white tracking-[0.08em] uppercase">
              CONFIDENTIAL MONTHLY ALGORITHMIC BRIEFING
            </h4>
            <p className="text-xs text-neutral-400 mt-1">
              Zero spam. Direct advisory on Google core updates, technical Core Web Vitals changes, and organic search tactics.
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full md:w-auto min-w-[280px] sm:min-w-[340px]">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ENTER WORK EMAIL"
              required
              className="w-full bg-white/5 border border-white/20 rounded-[4px] px-3.5 py-2.5 text-white placeholder-white/40 focus:border-[#38bdf8] outline-none text-xs font-bebas tracking-[0.14em] transition-colors"
            />
            <button
              type="submit"
              disabled={loading}
              aria-label="Subscribe to intelligence brief"
              className="px-5 py-2.5 bg-[#0284c7] hover:bg-[#0369a1] text-white rounded-[4px] font-bebas text-xs tracking-[0.14em] flex items-center justify-center shrink-0 transition-colors shadow-xs cursor-pointer disabled:opacity-50"
            >
              {loading ? "SENDING..." : "SUBSCRIBE"}
            </button>
          </form>
        </div>

        {/* BOTTOM ROW: PAYMENT ACCEPTED, LEGAL LINKS & COPYRIGHT */}
        <div className="pt-8 sm:pt-12 mt-8 sm:mt-12 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6 text-xs font-bebas tracking-[0.14em] sm:tracking-[0.18em] text-neutral-500">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-white/60">ACCEPTED INVOICE METHODS:</span>
            <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded-[2px] text-white/80">STRIPE</span>
            <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded-[2px] text-white/80">PAYPAL</span>
            <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded-[2px] text-white/80">WISE / WIRE</span>
            <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded-[2px] text-white/80">UPI / ACH</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
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
            Chopskip-style hollow brand-violet outline footer element (100% fluid vector)
           ===================================================================== */}
        <div className="pt-8 sm:pt-14 pb-3 sm:pb-5 overflow-hidden flex items-center justify-center select-none w-full max-w-[1320px] mx-auto px-2">
          <svg
            viewBox="0 0 1020 120"
            className="w-full h-auto max-h-[140px] select-none pointer-events-none"
            aria-label="balaji prime media"
          >
            <text
              x="50%"
              y="78%"
              textAnchor="middle"
              fontFamily="'Bricolage Grotesque', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
              fontWeight="800"
              fontSize="102"
              letterSpacing="-0.04em"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2.4"
              style={{
                filter: "drop-shadow(0 0 25px rgba(56, 189, 248, 0.65))",
              }}
            >
              balaji prime media
            </text>
          </svg>
        </div>

        {/* BOTTOM METADATA BAR */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3 text-[11px] font-mono text-neutral-500 text-center sm:text-left">
          <div>
            © 2026 BALAJI PRIME MEDIA. Made with ❤️ in Jaipur &amp; Global Operations.
          </div>
          <div className="flex items-center gap-2.5 sm:gap-3 text-neutral-400 flex-wrap justify-center sm:justify-end">
            <span className="flex items-center gap-1.5 text-neutral-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse" />
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
