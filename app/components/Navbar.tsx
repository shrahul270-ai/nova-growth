"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
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
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navContainerRef = useRef<HTMLElement | null>(null);

  // Close dropdown on click outside or Escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  const handleMouseEnter = (key: string) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setActiveDropdown(key);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  // Close mobile menu on resize to desktop (min-width: 1280px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
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

  const navLinks = [
    {
      name: "Guest Posting",
      href: "/guest-posting",
      key: "guest-posting",
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
    },
  ];

  return (
    <>
      {/* =========================================================================
          MODERN INDUSTRIAL ELEGANCE NAVBAR (Two-Tier Ink & Electric Violet)
         ========================================================================= */}
      <header className="sticky top-0 z-50 w-full bg-[#07030d]/90 backdrop-blur-md border-b border-white/10 transition-all font-satoshi">
        
        {/* Tier 1: Micro-utility Bar */}
        <div className="w-full bg-[#0c0617] border-b border-white/10 py-1.5 px-4 sm:px-8">
          <div className="max-w-[1360px] mx-auto flex items-center justify-between text-xs font-mono text-neutral-400">
            
            {/* Left: Global Support Signal */}
            <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar py-0.5">
              <div className="inline-flex items-center gap-2 text-white">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#681fe4] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#681fe4]" />
                </span>
                <span className="font-bebas text-xs tracking-[0.18em] text-white">LIVE SUPPORT //</span>
                <span className="text-neutral-400 text-[11px]">EST • GMT • AEST TIMING</span>
              </div>
            </div>

            {/* Right: Phone direct call + Payment link in sharp 4px style */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0 ml-auto">
              <a
                href="tel:+917690868932"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs text-neutral-300 hover:text-white transition-colors font-mono"
              >
                <span className="text-[#681fe4]">📞</span>
                <span>CALL: +91 76908 68932</span>
              </a>
              <span className="hidden sm:inline-block text-white/20">|</span>
              <Link
                href="/pay"
                className="group relative inline-flex items-center gap-1.5 px-3 py-1 rounded-[4px] text-xs font-bebas tracking-[0.14em] text-white bg-[#681fe4] hover:bg-[#5815cb] border border-[#681fe4] shadow-xs transition-all"
              >
                <span>CLIENT INVOICES</span>
                <span className="text-xs">💳</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Tier 2: Main Floating Navbar */}
        <div className="w-full px-3 sm:px-6 xl:px-8 py-2.5">
          <div className="max-w-[1360px] mx-auto flex items-center justify-between gap-2 xl:gap-6">
            
            {/* Minimalist Logo (Two Overlapping Circles) */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
              <div className="relative w-6 h-6 sm:w-7 sm:h-7 flex items-center shrink-0">
                <span className="w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full border border-white/90 block" />
                <span className="w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full bg-white block -ml-2 sm:-ml-2.5" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-bebas text-base sm:text-lg tracking-[0.16em] xl:tracking-[0.2em] text-white leading-none group-hover:text-[#681fe4] transition-colors">
                  BALAJI PRIME MEDIA
                </span>
                <span className="text-[8px] sm:text-[9px] font-bebas tracking-[0.2em] xl:tracking-[0.24em] text-white/50 uppercase leading-none mt-0.5">
                  SEO &amp; GROWTH ARCHITECTURE
                </span>
              </div>
            </Link>

            {/* Centered Desktop Navigation Links in Bebas Neue */}
            <nav
              ref={navContainerRef}
              className="hidden lg:flex items-center gap-0.5 xl:gap-1.5"
              aria-label="Primary"
            >
              {/* 1. Home */}
              <Link
                href="/"
                prefetch={false}
                onClick={() => setActiveDropdown(null)}
                className={`relative px-2 xl:px-2.5 2xl:px-3 py-1.5 rounded-[4px] font-bebas text-[13px] xl:text-[14px] 2xl:text-[15px] tracking-[0.08em] xl:tracking-[0.12em] transition-all whitespace-nowrap uppercase ${
                  activePage === "home"
                    ? "text-[#681fe4] font-semibold"
                    : "text-white/85 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>HOME</span>
              </Link>

              {/* 2 to 7: Guest Posting, Services, Projects, Blog, About Us, Contact Us */}
              {navLinks.map((link) => {
                const isActive = activePage === link.key;
                const isOpen = activeDropdown === link.key;
                const hasDropdown = Boolean(link.dropdown && link.dropdown.length > 0);

                return (
                  <div
                    key={link.key}
                    className="relative"
                    onMouseEnter={() => hasDropdown && handleMouseEnter(link.key)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={link.href}
                      prefetch={false}
                      onClick={() => setActiveDropdown(null)}
                      className={`relative px-2 xl:px-2.5 2xl:px-3 py-1.5 rounded-[4px] font-bebas text-[13px] xl:text-[14px] 2xl:text-[15px] tracking-[0.08em] xl:tracking-[0.12em] transition-all flex items-center gap-1 whitespace-nowrap uppercase ${
                        isActive
                          ? "text-[#681fe4] font-semibold"
                          : isOpen
                          ? "text-[#681fe4] bg-white/5"
                          : "text-white/85 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <span>{link.name}</span>
                      {hasDropdown && (
                        <svg
                          className={`w-2.5 h-2.5 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#681fe4]" : "text-neutral-500 group-hover:text-white"
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
                      )}
                    </Link>

                    {/* Dropdown Menu in Modern Industrial Aesthetic */}
                    {hasDropdown && (
                      <div
                        onMouseEnter={() => handleMouseEnter(link.key)}
                        onMouseLeave={handleMouseLeave}
                        className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 min-w-[285px] transition-all duration-200 ease-out ${
                          isOpen
                            ? "opacity-100 visible translate-y-0 pointer-events-auto"
                            : "opacity-0 invisible translate-y-2 pointer-events-none"
                        }`}
                      >
                        <div className="h-1.5 w-full" />
                        <div className="bg-[#0c0617] border border-white/10 rounded-[4px] p-2.5 shadow-2xl flex flex-col gap-1">
                          {link.dropdown!.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              prefetch={false}
                              onClick={() => setActiveDropdown(null)}
                              className="flex flex-col px-3 py-2 rounded-[2px] text-left hover:bg-white/5 transition-colors group/item"
                            >
                              <span className="font-bebas text-sm tracking-[0.14em] text-white group-hover/item:text-[#681fe4] transition-colors flex items-center justify-between">
                                <span>{subItem.name}</span>
                                <span className="text-neutral-500 group-hover/item:text-[#681fe4] text-xs transition-transform group-hover/item:translate-x-0.5">
                                  →
                                </span>
                              </span>
                              {subItem.desc && (
                                <span className="text-xs text-neutral-400 mt-0.5 leading-tight font-normal">
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

            {/* Right Action: Auth Buttons + Burger Menu */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setAuthModalMode("login");
                  setAuthModalOpen(true);
                }}
                className="font-bebas text-xs sm:text-sm tracking-[0.14em] text-white/80 hover:text-[#681fe4] px-2.5 sm:px-3 py-1.5 rounded-[4px] transition-all hover:bg-white/5 hidden sm:inline-flex items-center cursor-pointer"
              >
                <span>LOG IN</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setAuthModalMode("signup");
                  setAuthModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 py-1.5 sm:py-2 px-3.5 sm:px-4 rounded-[4px] font-bebas text-xs sm:text-sm tracking-[0.14em] text-white bg-[#681fe4] hover:bg-[#5815cb] shadow-sm hover:shadow-[#681fe4]/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
              >
                <span>GET STARTED</span>
                <span className="text-xs">→</span>
              </button>

              {/* Burger Button for Mobile */}
              <button
                type="button"
                id="burger"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-9 h-9 rounded-[4px] border border-white/20 bg-white/5 hover:bg-white/10 flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors shrink-0 z-50 ml-1"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                <span className={`w-4 h-0.5 bg-white transition-all ${mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
                <span className={`w-4 h-0.5 bg-white transition-all ${mobileMenuOpen ? "opacity-0" : ""}`} />
                <span className={`w-4 h-0.5 bg-white transition-all ${mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-[90px] bg-[#07030d] z-40 p-6 overflow-y-auto border-t border-white/10">
            <nav className="flex flex-col gap-3 text-left">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="font-bebas text-xl tracking-[0.18em] text-white py-2 border-b border-white/10 hover:text-[#681fe4]"
              >
                HOME
              </Link>
              {navLinks.map((link) => (
                <div key={link.key} className="border-b border-white/10 py-2">
                  <div className="flex items-center justify-between">
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-bebas text-xl tracking-[0.18em] text-white hover:text-[#681fe4] uppercase"
                    >
                      {link.name}
                    </Link>
                    {link.dropdown && (
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedMobileKey(expandedMobileKey === link.key ? null : link.key)
                        }
                        className="text-neutral-400 p-2 text-sm font-mono"
                      >
                        {expandedMobileKey === link.key ? "−" : "+"}
                      </button>
                    )}
                  </div>
                  {expandedMobileKey === link.key && link.dropdown && (
                    <div className="pl-4 pt-2 pb-1 space-y-2">
                      {link.dropdown.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block text-xs font-mono text-neutral-400 hover:text-[#681fe4] py-1"
                        >
                          → {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <Link
                  href="/pay"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 rounded-[4px] bg-[#681fe4] text-white font-bebas text-base tracking-[0.18em] text-center"
                >
                  CLIENT INVOICES &amp; PAY
                </Link>
                <a
                  href="tel:+917690868932"
                  className="w-full py-3 rounded-[4px] border border-white/20 text-white font-bebas text-base tracking-[0.18em] text-center"
                >
                  CALL ANYTIME (+91 76908 68932)
                </a>
              </div>
            </nav>
          </div>
        )}

      </header>

      {/* Auth Modal Container */}
      {authModalOpen && (
        <AuthModal
          isOpen={authModalOpen}
          initialMode={authModalMode}
          onClose={() => setAuthModalOpen(false)}
        />
      )}
    </>
  );
}
