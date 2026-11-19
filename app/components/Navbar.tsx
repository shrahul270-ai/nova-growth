"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import AuthModal from "./AuthModal";
import BrandLogo from "./BrandLogo";

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
          2-TIER LUXURY WHITE & YELLOW-GOLDEN NAVBAR
         ========================================================================= */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-amber-200/60 shadow-xs transition-all duration-300">
        
        {/* Tier 1: Top Micro-utility Bar */}
        <div className="w-full bg-[#fefbf6] border-b border-amber-200/50 py-1.5 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-medium text-slate-600">
            
            {/* Left: Global Support Signal */}
            <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar py-0.5">
              <div className="inline-flex items-center gap-2 text-slate-700 font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-slate-900 font-bold">Live Support ·</span>
                <span className="text-slate-600">EST • GMT • AEST</span>
              </div>
            </div>

            {/* Right: Payment link in golden pill style */}
            <div className="flex items-center gap-3 shrink-0 ml-auto">
              <Link
                href="/pay"
                className="group relative inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-600 hover:to-yellow-500 border border-amber-300/60 shadow-xs hover:shadow-md hover:scale-105 transition-all duration-300"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                </span>
                <span>Client Invoices</span>
                <span className="text-xs group-hover:scale-110 transition-transform">💳</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Tier 2: Main Floating Navbar */}
        <div className="w-full px-4 sm:px-6 lg:px-8 py-2.5">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            
            {/* Official Brand Logo */}
            <BrandLogo size="md" />

            {/* Centered Desktop Navigation Links */}
            <nav
              ref={navContainerRef}
              className="hidden lg:flex items-center gap-1 xl:gap-2"
              aria-label="Primary"
            >
              {/* 1. Home */}
              <Link
                href="/"
                prefetch={false}
                onClick={() => setActiveDropdown(null)}
                className={`relative px-3.5 py-1.5 rounded-full text-[13.5px] font-bold transition-all duration-200 ${
                  activePage === "home"
                    ? "text-[#d97706] bg-amber-50 border border-amber-300/80 shadow-xs"
                    : "text-slate-700 hover:text-[#d97706] hover:bg-amber-50/50"
                }`}
              >
                <span>Home</span>
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
                    <div className="flex items-center">
                      <Link
                        href={link.href}
                        prefetch={false}
                        onClick={() => setActiveDropdown(null)}
                        className={`relative pl-3.5 ${hasDropdown ? "pr-1.5" : "pr-3.5"} py-1.5 rounded-full text-[13.5px] font-semibold transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap ${
                          isActive
                            ? "text-[#d97706] bg-amber-50 border border-amber-300/80 shadow-xs font-bold"
                            : isOpen
                            ? "text-[#d97706] bg-amber-50/80"
                            : "text-slate-700 hover:text-[#d97706] hover:bg-amber-50/50"
                        }`}
                      >
                        <span>{link.name}</span>
                        {link.badge && (
                          <span className="text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded-full tracking-wide">
                            {link.badge}
                          </span>
                        )}
                      </Link>

                      {hasDropdown && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
                            setActiveDropdown(isOpen ? null : link.key);
                          }}
                          className={`p-1.5 mr-1 rounded-full text-slate-500 hover:text-[#d97706] hover:bg-amber-50 transition-all cursor-pointer ${
                            isOpen ? "text-[#d97706] bg-amber-50" : ""
                          }`}
                          aria-expanded={isOpen}
                          aria-label={`Toggle ${link.name} menu`}
                        >
                          <svg
                            className={`w-3 h-3 transition-transform duration-200 ${
                              isOpen ? "rotate-180 text-[#d97706]" : ""
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
                      )}
                    </div>

                    {/* Dropdown Menu */}
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
                        <div className="bg-white border border-amber-200/90 rounded-2xl p-2.5 shadow-xl shadow-amber-950/10 flex flex-col gap-1">
                          {link.dropdown!.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              prefetch={false}
                              onClick={() => setActiveDropdown(null)}
                              className="flex flex-col px-3.5 py-2.5 rounded-xl text-left hover:bg-amber-50/70 transition-colors group/item"
                            >
                              <span className="text-[13px] font-bold text-slate-800 group-hover/item:text-[#d97706] transition-colors flex items-center justify-between">
                                <span>{subItem.name}</span>
                                <span className="text-slate-400 group-hover/item:text-[#d97706] text-xs transition-transform group-hover/item:translate-x-0.5">
                                  →
                                </span>
                              </span>
                              {subItem.desc && (
                                <span className="text-xs text-slate-500 mt-0.5 leading-tight">
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

            {/* Right Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setAuthModalMode("login");
                  setAuthModalOpen(true);
                }}
                className="text-xs sm:text-sm font-bold text-slate-700 hover:text-[#d97706] px-3.5 py-2 rounded-full transition-all hover:bg-amber-50/70 hidden sm:inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Log in</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setAuthModalMode("signup");
                  setAuthModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 py-2 px-4 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-yellow-600 shadow-md shadow-amber-900/15 hover:scale-105 transition-all cursor-pointer"
              >
                <span>Get Started</span>
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

              {/* Burger Button for Mobile */}
              <button
                type="button"
                id="burger"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-10 h-10 rounded-full border border-amber-300/80 bg-amber-50/60 hover:bg-amber-100 flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors shrink-0 z-50 shadow-xs"
                aria-controls="menu"
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                <i
                  className={`w-4 h-[2px] bg-slate-800 rounded-full transition-transform duration-300 ease-out ${
                    mobileMenuOpen ? "translate-y-[3px] rotate-45" : ""
                  }`}
                />
                <i
                  className={`w-4 h-[2px] bg-slate-800 rounded-full transition-transform duration-300 ease-out ${
                    mobileMenuOpen ? "-translate-y-[3px] -rotate-45" : ""
                  }`}
                />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <nav
          id="menu"
          className="fixed inset-0 bg-white/98 backdrop-blur-3xl z-50 flex flex-col justify-between overflow-y-auto lg:hidden p-6 animate-fadeIn border-l border-amber-200"
        >
          <div className="flex items-center justify-between pb-5 border-b border-amber-200">
            <div onClick={() => setMobileMenuOpen(false)}>
              <BrandLogo size="md" />
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="w-10 h-10 rounded-full bg-amber-50 text-slate-800 flex items-center justify-center text-lg font-bold border border-amber-200 hover:bg-amber-100 transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          {/* Mobile Auth Buttons */}
          <div className="grid grid-cols-2 gap-2.5 pt-3 pb-2 border-b border-amber-200">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setAuthModalMode("login");
                setAuthModalOpen(true);
              }}
              className="text-center py-2.5 px-3 rounded-xl text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
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
              className="text-center py-2.5 px-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 shadow-sm transition-all cursor-pointer"
            >
              Sign up
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-1.5 py-4">
            <p className="text-xs font-bold tracking-widest text-[#d97706] uppercase mb-1">
              Navigation
            </p>

            <Link
              href="/"
              prefetch={false}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between py-2.5 px-3.5 rounded-xl text-sm font-bold transition-colors ${
                activePage === "home"
                  ? "bg-amber-100 text-amber-900 border border-amber-300"
                  : "text-slate-700 hover:bg-amber-50"
              }`}
            >
              <span>Home</span>
              <span className="text-slate-400 text-sm">→</span>
            </Link>

            {navLinks.map((link) => {
              const isActive = activePage === link.key;
              const isExpanded = expandedMobileKey === link.key;
              return (
                <div key={link.key} className="flex flex-col">
                  <div
                    className={`flex items-center justify-between py-2.5 px-3.5 rounded-xl text-sm font-bold transition-colors ${
                      isActive
                        ? "bg-amber-100 text-amber-900 border border-amber-300"
                        : "text-slate-700 hover:bg-amber-50"
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
                        <span className="text-[10px] font-bold bg-amber-200 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-full">
                          {link.badge}
                        </span>
                      )}
                    </Link>
                    {link.dropdown ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setExpandedMobileKey(isExpanded ? null : link.key);
                        }}
                        className={`p-2 rounded-lg transition-colors ml-2 cursor-pointer ${
                          isExpanded ? "text-[#d97706] bg-amber-100" : "text-slate-500 hover:bg-amber-50"
                        }`}
                        aria-label={`Toggle ${link.name} submenu`}
                      >
                        <svg
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            isExpanded ? "rotate-180 text-[#d97706]" : ""
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
                      <span className="text-slate-400 text-sm">→</span>
                    )}
                  </div>

                  {link.dropdown && isExpanded && (
                    <div className="pl-4 pr-1 py-1 flex flex-col gap-1 border-l-2 border-amber-300 ml-3.5 my-1">
                      {link.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          prefetch={false}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex flex-col py-1.5 px-2.5 rounded-lg text-slate-700 hover:bg-amber-50 transition-colors"
                        >
                          <span className="text-xs font-semibold text-slate-800 flex items-center justify-between">
                            <span>{subItem.name}</span>
                            <span className="text-xs text-[#d97706]">→</span>
                          </span>
                          {subItem.desc && (
                            <span className="text-[11px] text-slate-500 mt-0.5 leading-tight">
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

            <Link
              href="/pay"
              prefetch={false}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2.5 px-3.5 rounded-xl text-sm font-bold text-amber-700 hover:bg-amber-50 transition-colors"
            >
              <span>Client Invoices 💳</span>
              <span className="text-slate-400 text-sm">→</span>
            </Link>
          </div>

          <div className="pt-4 border-t border-amber-200 flex flex-col gap-3">
            <Link
              href="/contact-us"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 text-sm font-bold text-white bg-gradient-to-r from-amber-500 to-amber-600 rounded-full shadow-md"
            >
              Book Strategy Consultation &rarr;
            </Link>
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
