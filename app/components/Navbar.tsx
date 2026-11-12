"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import AuthModal from "./AuthModal";

interface NavbarProps {
  activePage?: "home" | "about" | "services" | "guest-posting" | "projects" | "blog" | "contact" | "pay";
  onJoinClick?: () => void;
}

export default function Navbar({ activePage = "home" }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<"login" | "signup">("login");
  const [expandedMobileKey, setExpandedMobileKey] = useState<string | null>(null);

  // Close mobile menu on resize to desktop (min-width: 1024px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Exact page names matching each page route with dropdown submenus (like girlmuseum.org)
  const navLinks = [
    {
      name: "Guest Posting",
      href: "/guest-posting",
      key: "guest-posting",
      badge: "DR 50+",
      dropdown: [
        { name: "All Guest Post Inventory", href: "/guest-posting", desc: "Browse 30,000+ verified publishers" },
        { name: "Tech & SaaS Authority", href: "/guest-posting", desc: "DR 60-90+ industry authority media" },
        { name: "Editorial Outreach", href: "/guest-posting", desc: "Manual, white-hat journalist outreach" },
        { name: "Instant Domain SEO Audit", href: "/audit", desc: "Check domain metrics & DA score" },
      ],
    },
    {
      name: "Services",
      href: "/services",
      key: "services",
      dropdown: [
        { name: "Enterprise SEO Suite", href: "/services/seo-optimization", desc: "Technical, on-page & semantic SEO" },
        { name: "Next.js Web Engineering", href: "/services/website-development", desc: "Sub-second TTFB & Core Web Vitals" },
        { name: "US & Global SEO Growth", href: "/seo-services-usa", desc: "International market dominance" },
        { name: "UK Web Development", href: "/web-development-uk", desc: "Bespoke high-converting Next.js systems" },
        { name: "Free Instant Website Audit", href: "/audit", desc: "Analyze page speed, ranks & health" },
      ],
    },
    {
      name: "Projects",
      href: "/projects",
      key: "projects",
      dropdown: [
        { name: "All Case Studies & Work", href: "/projects", desc: "Verified commercial growth results" },
        { name: "E-Commerce Fashion (+340%)", href: "/projects/fashion-brand", desc: "DTC organic revenue scaling" },
        { name: "SaaS Fitness App Scaling", href: "/projects/fitness-app", desc: "High-intent organic acquisition" },
      ],
    },
    {
      name: "Blog",
      href: "/blog",
      key: "blog",
      dropdown: [
        { name: "All Growth Insights", href: "/blog", desc: "Read 200+ field-tested guides" },
        { name: "International SEO", href: "/blog", desc: "Topical clustering & core updates" },
        { name: "Next.js & Engineering", href: "/blog", desc: "Core Web Vitals & edge speed" },
        { name: "Email Marketing & Flows", href: "/blog", desc: "Klaviyo retention & LTV growth" },
        { name: "Google AI & SGE Search", href: "/blog", desc: "AI Overviews optimization" },
      ],
    },
    {
      name: "About Us",
      href: "/about-us",
      key: "about",
      dropdown: [
        { name: "Our Story & Vision", href: "/about-us", desc: "Balaji Prime Media mission & team" },
        { name: "Frequently Asked Questions", href: "/faq", desc: "Direct answers to client questions" },
        { name: "Client Help Center", href: "/help-center", desc: "Guides, tutorials & support" },
        { name: "Client Reviews & Feedback", href: "/feedback", desc: "Verified testimonials & ratings" },
        { name: "Schedule a Strategy Call", href: "/schedule-meeting", desc: "1-on-1 consultation with strategists" },
      ],
    },
    {
      name: "Contact Us",
      href: "/contact-us",
      key: "contact",
      dropdown: [
        { name: "Send Project Inquiry", href: "/contact-us", desc: "Custom proposal within 24 hours" },
        { name: "WhatsApp Direct Support", href: "https://wa.me/917690868932", desc: "Instant chat (+91 76908 68932)" },
        { name: "Telegram Channel", href: "https://t.me/balajiprimemedia", desc: "Daily market updates" },
        { name: "Direct Email Inquiry", href: "mailto:support@balajiprimemedia.in", desc: "support@balajiprimemedia.in" },
      ],
    },
  ];

  return (
    <>
      {/* =========================================================================
          2-TIER TRANSPARENT NAVBAR (Tightly Connected & Slightly Lowered)
         ========================================================================= */}
      <header className="sticky top-0 z-50 w-full bg-transparent pt-1 sm:pt-2 transition-all duration-300">
        
        {/* Tier 1: Top Micro-utility Bar (Tightly attached to Tier 2) */}
        <div className="w-full bg-transparent border-b border-white/10 py-1 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] font-medium text-slate-300">
            
            {/* Left: Global Support Signal */}
            <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar py-0.5">
              <div className="inline-flex items-center gap-1.5 text-slate-300 font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-white font-semibold">Live Support ·</span>
                <span className="text-slate-300">EST • GMT • AEST</span>
              </div>
            </div>

            {/* Right: Payment link only */}
            <div className="flex items-center gap-3 shrink-0 ml-auto">
              <Link
                href="/pay"
                className="inline-flex items-center gap-1.5 text-slate-200 hover:text-white transition-colors bg-white/[0.08] hover:bg-white/[0.16] border border-white/15 px-3 py-0.5 rounded-full text-[11px] font-semibold shadow-xs"
              >
                <span>Payment</span>
                <span className="text-[11px]">💳</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Tier 2: Main Transparent Floating Navbar (Immediately below Tier 1 with no empty gap) */}
        <div className="w-full px-3 sm:px-6 lg:px-8 pt-1 pb-1">
          <div className="max-w-7xl mx-auto rounded-full transition-all duration-300 px-4 sm:px-6 py-2 flex items-center justify-between gap-4 border border-white/10 bg-black/30 backdrop-blur-md shadow-lg shadow-black/25">
            
            {/* Official Brand Logo */}
            <Link
              href="/"
              className="flex items-center group shrink-0"
              aria-label="Balaji Prime Media Home"
            >
              <div className="relative">
                <Image
                  src="/images/bpm-complete-logo.png"
                  alt="Balaji Prime Media"
                  width={210}
                  height={190}
                  priority
                  className="h-10 sm:h-12 w-auto object-contain transition-all duration-300 group-hover:scale-105 filter drop-shadow-[0_2px_14px_rgba(160,104,255,0.45)]"
                />
              </div>
            </Link>

            {/* Centered Desktop Navigation Links (Exact order from user image) */}
            <nav
              className="hidden lg:flex items-center gap-1 xl:gap-2"
              aria-label="Primary"
            >
              {/* 1. Home */}
              <Link
                href="/"
                prefetch={false}
                className={`relative px-3.5 py-1.5 rounded-full text-[13.5px] font-semibold transition-all duration-200 ${
                  activePage === "home"
                    ? "text-white bg-white/[0.14] border border-purple-400/40 shadow-[0_0_15px_rgba(160,104,255,0.3)]"
                    : "text-slate-300 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                <span>Home</span>
              </Link>

              {/* 2 to 7: Guest Posting, Services, Projects, Blog, About Us, Contact Us (with Dropdowns) */}
              {navLinks.map((link) => {
                const isActive = activePage === link.key;
                return (
                  <div key={link.key} className="relative group/dropdown">
                    <Link
                      href={link.href}
                      prefetch={false}
                      className={`relative px-3 py-1.5 rounded-full text-[13.5px] font-semibold transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap ${
                        isActive
                          ? "text-white bg-white/[0.14] border border-purple-400/40 shadow-[0_0_15px_rgba(160,104,255,0.3)]"
                          : "text-slate-300 hover:text-white hover:bg-white/[0.06]"
                      }`}
                    >
                      <span>{link.name}</span>
                      {link.badge && (
                        <span className="text-[9.5px] font-bold bg-[#A068FF]/20 text-[#d8b4fe] border border-purple-500/40 px-2 py-0.5 rounded-full tracking-wide">
                          {link.badge}
                        </span>
                      )}
                      {link.dropdown && (
                        <svg
                          className="w-2.5 h-2.5 text-slate-400 group-hover/dropdown:text-white group-hover/dropdown:rotate-180 transition-transform duration-200"
                          viewBox="0 0 10 6"
                          fill="currentColor"
                        >
                          <path
                            d="M1 1l4 4 4-4"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </Link>

                    {/* Glassmorphic Dropdown Menu (like girlmuseum.org) */}
                    {link.dropdown && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 min-w-[270px] opacity-0 invisible translate-y-1 group-hover/dropdown:opacity-100 group-hover/dropdown:visible group-hover/dropdown:translate-y-0 transition-all duration-200 ease-out pointer-events-none group-hover/dropdown:pointer-events-auto">
                        <div className="bg-[#090422]/98 border border-purple-500/30 backdrop-blur-2xl rounded-2xl p-2 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(160,104,255,0.25)] flex flex-col gap-0.5">
                          {link.dropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              prefetch={false}
                              className="flex flex-col px-3 py-2 rounded-xl text-left hover:bg-white/[0.08] transition-colors group/item"
                            >
                              <span className="text-[12.5px] font-semibold text-slate-200 group-hover/item:text-[#A068FF] transition-colors flex items-center justify-between">
                                <span>{subItem.name}</span>
                                <span className="text-slate-500 group-hover/item:text-[#A068FF] text-xs transition-transform group-hover/item:translate-x-0.5">
                                  →
                                </span>
                              </span>
                              {subItem.desc && (
                                <span className="text-[10.5px] text-slate-400 mt-0.5 leading-tight">
                                  {subItem.desc}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Right Action Buttons: "Log in" and "Sign up" Popup Triggers */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setAuthModalMode("login");
                  setAuthModalOpen(true);
                }}
                className="text-[13px] font-semibold text-slate-200 hover:text-white px-3 py-1.5 rounded-full transition-all hover:bg-white/[0.08] hidden sm:inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Log in</span>
              </button>

              <div className="btn-border-wrap shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setAuthModalMode("signup");
                    setAuthModalOpen(true);
                  }}
                  className="marketeam-start-btn !py-1.5 !px-3.5 sm:!px-4 !text-[12.5px] sm:!text-[13px] cursor-pointer shadow-[0_0_20px_rgba(160,104,255,0.45)] hover:shadow-[0_0_30px_rgba(160,104,255,0.7)] flex items-center gap-1.5"
                >
                  <span>Sign up</span>
                  <svg
                    className="w-3.5 h-3.5 text-white shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              {/* Minimalist 2-Bar Burger Button for Mobile */}
              <button
                type="button"
                id="burger"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-[40px] h-[40px] rounded-full border border-white/20 bg-white/[0.06] hover:bg-white/[0.14] flex flex-col items-center justify-center gap-[5px] cursor-pointer transition-colors shrink-0 z-50 shadow-sm"
                aria-controls="menu"
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                <i
                  className={`w-4 h-[1.5px] bg-white rounded-full transition-transform duration-300 ease-out ${
                    mobileMenuOpen ? "translate-y-[3px] rotate-45" : ""
                  }`}
                />
                <i
                  className={`w-4 h-[1.5px] bg-white rounded-full transition-transform duration-300 ease-out ${
                    mobileMenuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay Navigation Drawer (Exact Order as requested) */}
      {mobileMenuOpen && (
        <nav
          id="menu"
          className="fixed inset-0 bg-[#070319]/98 backdrop-blur-3xl z-50 flex flex-col justify-between overflow-y-auto lg:hidden p-6 animate-fadeIn border-l border-purple-500/20"
        >
          {/* Top Bar inside Drawer */}
          <div className="flex items-center justify-between pb-5 border-b border-purple-500/20">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center"
            >
              <Image
                src="/images/bpm-complete-logo.png"
                alt="Balaji Prime Media"
                width={170}
                height={155}
                className="h-10 w-auto object-contain filter drop-shadow-[0_2px_14px_rgba(160,104,255,0.45)]"
              />
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center text-lg font-bold border border-white/15 hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          {/* Mobile Auth Buttons: Log in & Sign up (Triggers Popup Modal) */}
          <div className="grid grid-cols-2 gap-2.5 pt-3 pb-2 border-b border-purple-500/20">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setAuthModalMode("login");
                setAuthModalOpen(true);
              }}
              className="text-center py-2.5 px-3 rounded-xl text-[13.5px] font-semibold text-slate-200 bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 transition-colors cursor-pointer"
            >
              Log in
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setAuthModalMode("signup");
                setAuthModalOpen(true);
              }}
              className="text-center py-2.5 px-3 rounded-xl text-[13.5px] font-bold text-white bg-gradient-to-r from-[#A068FF] to-[#7c3aed] hover:brightness-110 shadow-sm transition-all cursor-pointer"
            >
              Sign up
            </button>
          </div>

          {/* Navigation Links: Home, Guest Posting, Services, Projects, Blog, About Us, Contact Us, Payment */}
          <div className="flex flex-col gap-1.5 py-4">
            <p className="text-[10px] font-bold tracking-widest text-[#A068FF] uppercase mb-1">
              Navigation
            </p>

            {/* 1. Home */}
            <Link
              href="/"
              prefetch={false}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between py-2.5 px-3.5 rounded-xl text-[16px] font-semibold transition-colors ${
                activePage === "home"
                  ? "bg-purple-950/60 text-white border border-purple-500/30"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <span>Home</span>
              <span className="text-white/40 text-sm">→</span>
            </Link>

            {/* 2 to 7. Exact Links with Dropdown Accordion (like girlmuseum.org) */}
            {navLinks.map((link) => {
              const isActive = activePage === link.key;
              const isExpanded = expandedMobileKey === link.key;
              return (
                <div key={link.key} className="flex flex-col">
                  <div
                    className={`flex items-center justify-between py-2.5 px-3.5 rounded-xl text-[16px] font-semibold transition-colors ${
                      isActive
                        ? "bg-purple-950/60 text-white border border-purple-500/30"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Link
                      href={link.href}
                      prefetch={false}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 flex-1"
                    >
                      <span>{link.name}</span>
                      {link.badge && (
                        <span className="text-[10px] font-bold bg-[#1E1638] text-[#c084fc] border border-purple-500/30 px-2 py-0.5 rounded-full">
                          {link.badge}
                        </span>
                      )}
                    </Link>
                    {link.dropdown ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedMobileKey(isExpanded ? null : link.key);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors ml-2"
                        aria-label={`Toggle ${link.name} submenu`}
                      >
                        <svg
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            isExpanded ? "rotate-180 text-[#A068FF]" : ""
                          }`}
                          viewBox="0 0 10 6"
                          fill="currentColor"
                        >
                          <path
                            d="M1 1l4 4 4-4"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    ) : (
                      <span className="text-white/40 text-sm">→</span>
                    )}
                  </div>

                  {/* Dropdown items for mobile */}
                  {link.dropdown && isExpanded && (
                    <div className="pl-4 pr-1 py-1 flex flex-col gap-1 border-l-2 border-purple-500/30 ml-3.5 my-1">
                      {link.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          prefetch={false}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex flex-col py-1.5 px-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          <span className="text-[13.5px] font-medium text-slate-200 flex items-center justify-between">
                            <span>{subItem.name}</span>
                            <span className="text-xs text-purple-400">→</span>
                          </span>
                          {subItem.desc && (
                            <span className="text-[11px] text-slate-400 mt-0.5 leading-tight">
                              {subItem.desc}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* 8. Payment 💳 */}
            <Link
              href="/pay"
              prefetch={false}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2.5 px-3.5 rounded-xl text-[16px] font-semibold text-[#c084fc] hover:text-white hover:bg-white/5 transition-colors"
            >
              <span>Payment 💳</span>
              <span className="text-white/40 text-sm">→</span>
            </Link>
          </div>

          {/* Mobile Footer CTA */}
          <div className="pt-4 border-t border-purple-500/20 flex flex-col gap-3">
            <div className="btn-border-wrap w-full">
              <Link
                href="/guest-posting"
                onClick={() => setMobileMenuOpen(false)}
                className="marketeam-start-btn w-full justify-center !py-3 !text-sm cursor-pointer shadow-lg shadow-purple-950/80"
              >
                <span>Get Started</span>
                <svg
                  className="w-4 h-4 text-white shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </nav>
      )}
      {/* Global Interactive Auth Popup Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
      />
    </>
  );
}
