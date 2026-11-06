"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface NavbarProps {
  activePage?: "home" | "about" | "services" | "guest-posting" | "projects" | "blog" | "contact" | "pay";
  onJoinClick?: () => void;
}

export default function Navbar({ activePage = "home" }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll to enhance glass blur & elevation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    { name: "Services", href: "/services", key: "services" },
    { name: "Guest Posting", href: "/guest-posting", key: "guest-posting", badge: "DR 50–90+" },
    { name: "Projects", href: "/projects", key: "projects" },
    { name: "SEO Audit", href: "/audit", key: "audit", badge: "Free" },
    { name: "Blog", href: "/blog", key: "blog" },
    { name: "About", href: "/about", key: "about" },
    { name: "Contact", href: "/contact", key: "contact" },
  ];

  return (
    <>
      {/* =========================================================================
          2-TIER LUXURY FLOATING NAVBAR (User's Exact 2-Tier Architecture)
         ========================================================================= */}
      <header className="sticky top-0 z-50 w-full transition-all duration-300">
        
        {/* Tier 1: Micro-utility Bar (London, New York Live Time & Verified Global Signals) */}
        <div className="w-full bg-black/40 backdrop-blur-md border-b border-purple-500/15 py-1.5 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] font-medium text-slate-300">
            
            {/* Left: Global Presence & Time Zones for UK/US Clients */}
            <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar py-0.5">
              <div className="inline-flex items-center gap-1.5 text-slate-300 font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-white font-semibold">Global Studio:</span>
                <span className="hidden sm:inline text-slate-300">London (GMT) • New York (EST) • Dubai (GST)</span>
                <span className="sm:hidden text-slate-300">UK · US · Worldwide</span>
              </div>
              <span className="hidden md:inline text-purple-400/40">|</span>
              <span className="hidden md:inline text-purple-300/90 font-mono text-[10.5px]">
                ✦ 15,000+ Verified Placements
              </span>
            </div>

            {/* Right: Quick Payment & Direct Priority Line */}
            <div className="flex items-center gap-3 shrink-0 ml-auto">
              <Link
                href="/pay"
                className="inline-flex items-center gap-1.5 text-slate-200 hover:text-white transition-colors bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 px-2.5 py-0.5 rounded-full text-[11px] font-medium shadow-xs"
              >
                <span>Client Pay</span>
                <span className="text-[10px]">💳</span>
              </Link>

              <a
                href="https://wa.me/917690868932?text=Hello%20Balaji%20Prime%20Media%2C%20I%20am%20interested%20in%20scaling%20our%20international%20SEO%20and%20web%20growth."
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
              >
                <span>WhatsApp VIP</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Tier 2: Main Floating Glass Pill Navbar */}
        <div className="w-full px-3 sm:px-6 lg:px-8 pt-2.5 pb-2">
          <div
            className={`max-w-7xl mx-auto rounded-full transition-all duration-300 px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4 border ${
              scrolled
                ? "bg-[#090422]/95 backdrop-blur-2xl border-purple-500/40 shadow-[0_15px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(160,104,255,0.2)]"
                : "bg-gradient-to-r from-[#0c062a]/85 via-[#110838]/85 to-[#0c062a]/85 backdrop-blur-2xl border-purple-500/25 shadow-[0_12px_40px_rgba(0,0,0,0.65),0_0_20px_rgba(160,104,255,0.12)]"
            }`}
          >
            {/* Official Brand Logo */}
            <Link
              href="/"
              className="flex items-center group shrink-0"
              aria-label="Balaji Prime Media Home"
            >
              <div className="relative">
                <Image
                  src="/images/bpm-complete-logo.png"
                  alt="Balaji Prime Media - Global SEO & Digital Growth Agency"
                  width={210}
                  height={190}
                  priority
                  className="h-11 sm:h-13 md:h-14 w-auto object-contain transition-all duration-300 group-hover:scale-105 filter drop-shadow-[0_2px_16px_rgba(160,104,255,0.45)]"
                />
              </div>
            </Link>

            {/* Centered Desktop Navigation Links */}
            <nav
              className="hidden lg:flex items-center gap-1 xl:gap-2"
              aria-label="Primary"
            >
              <Link
                href="/"
                prefetch={false}
                className={`relative px-3.5 py-1.5 rounded-full text-[13.5px] font-semibold transition-all duration-200 ${
                  activePage === "home"
                    ? "text-white bg-white/[0.12] shadow-[0_0_15px_rgba(160,104,255,0.3)] border border-purple-400/30"
                    : "text-slate-300 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                <span>Home</span>
              </Link>

              {navLinks.map((link) => {
                const isActive = activePage === link.key;
                return (
                  <Link
                    key={link.key}
                    href={link.href}
                    prefetch={false}
                    className={`relative px-3 py-1.5 rounded-full text-[13.5px] font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                      isActive
                        ? "text-white bg-white/[0.12] shadow-[0_0_15px_rgba(160,104,255,0.3)] border border-purple-400/30"
                        : "text-slate-300 hover:text-white hover:bg-white/[0.06]"
                    }`}
                  >
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className="text-[9.5px] font-bold bg-gradient-to-r from-purple-500/25 to-indigo-500/25 text-[#c084fc] border border-purple-500/40 px-2 py-0.5 rounded-full tracking-wide">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Button: "Get Started" linking to /guest-posting */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              <Link
                href="/guest-posting"
                className="group relative inline-flex items-center justify-center px-5 sm:px-7 py-2.5 rounded-full text-[13px] sm:text-[14px] font-bold text-white transition-all duration-300 hover:scale-[1.04] active:scale-[0.98] cursor-pointer shadow-[0_0_24px_rgba(160,104,255,0.5)] hover:shadow-[0_0_36px_rgba(160,104,255,0.8)]"
                style={{
                  background: "linear-gradient(135deg, #A068FF 0%, #7928CA 60%, #4F46E5 100%)",
                }}
              >
                <span>Get Started</span>
              </Link>

              {/* Minimalist 2-Bar Luxury Burger Button for Mobile */}
              <button
                type="button"
                id="burger"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-[42px] h-[42px] rounded-full border border-purple-500/30 bg-white/[0.06] hover:bg-white/[0.12] flex flex-col items-center justify-center gap-[5px] cursor-pointer transition-colors shrink-0 z-50 shadow-sm"
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

      {/* Mobile Full-Screen Overlay Navigation Drawer */}
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
                className="h-11 w-auto object-contain filter drop-shadow-[0_2px_14px_rgba(160,104,255,0.45)]"
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

          {/* Navigation Links */}
          <div className="flex flex-col gap-2 py-4">
            <p className="text-[10px] font-bold tracking-widest text-[#A068FF] uppercase mb-1">
              Global Navigation
            </p>
            <Link
              href="/"
              prefetch={false}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between py-3 px-3.5 rounded-2xl text-[16.5px] font-semibold transition-colors ${
                activePage === "home"
                  ? "bg-purple-950/60 text-white border border-purple-500/30"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <span>Home</span>
              <span className="text-white/40 text-sm">→</span>
            </Link>
            {navLinks.map((link) => {
              const isActive = activePage === link.key;
              return (
                <Link
                  key={link.key}
                  href={link.href}
                  prefetch={false}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between py-3 px-3.5 rounded-2xl text-[16.5px] font-semibold transition-colors ${
                    isActive
                      ? "bg-purple-950/60 text-white border border-purple-500/30"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className="text-[10px] font-bold bg-[#1E1638] text-[#c084fc] border border-purple-500/30 px-2 py-0.5 rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-white/40 text-sm">→</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Footer CTAs */}
          <div className="pt-4 border-t border-purple-500/20 flex flex-col gap-3">
            <Link
              href="/guest-posting"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full h-12 rounded-full text-white font-bold text-sm flex items-center justify-center shadow-lg shadow-purple-950/80 transition-all cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #A068FF 0%, #7928CA 100%)",
              }}
            >
              <span>Get Started</span>
            </Link>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/pay"
                onClick={() => setMobileMenuOpen(false)}
                className="h-11 rounded-full bg-white/[0.06] border border-white/15 text-white font-semibold text-xs flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <span>Client Pay 💳</span>
              </Link>
              <Link
                href="/audit"
                onClick={() => setMobileMenuOpen(false)}
                className="h-11 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-200 font-semibold text-xs flex items-center justify-center hover:bg-purple-900/50 transition-colors"
              >
                <span>Free SEO Audit ⚡</span>
              </Link>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}
