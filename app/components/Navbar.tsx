"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface NavbarProps {
  activePage?: "home" | "about" | "services" | "guest-posting" | "projects" | "blog" | "contact" | "pay";
}

export default function Navbar({ activePage = "home" }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll progress meter (imperative hairline at top)
  useEffect(() => {
    const handleScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0) {
        const progress = Math.min(Math.max(window.pageYOffset / max, 0), 1);
        setScrollProgress(progress);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
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
    { name: "Home", href: "/", key: "home" },
    { name: "About", href: "/about", key: "about" },
    { name: "Services", href: "/services", key: "services" },
    { name: "Guest Posting", href: "/guest-posting", key: "guest-posting", badge: "DR 50+" },
    { name: "Projects", href: "/projects", key: "projects" },
    { name: "Pay", href: "/pay", key: "pay" },
    { name: "Blog", href: "/blog", key: "blog" },
    { name: "Contact", href: "/contact", key: "contact" },
  ];

  return (
    <>
      {/* Cast & Render Editorial Chrome Header (Single-Tier Floating Studio Header) */}
      <header className="cr-chrome relative">
        {/* Scroll Progress Hairline Meter (.meter) */}
        <i
          className="cr-meter"
          style={{ transform: `scaleX(${scrollProgress})` }}
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-3 sm:gap-6">
          
          {/* User's Original Official Brand Logo (Preserved 100%) */}
          <Link
            href="/"
            className="flex items-center gap-2.5 sm:gap-3 group shrink-0 min-w-0"
            aria-label="Balaji Prime Media Home"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-[#091427] via-[#1d4ed8] to-[#d97706] flex items-center justify-center shadow-md shadow-[#091427]/30 group-hover:scale-105 group-hover:-translate-y-0.5 transition-all duration-300 border border-[#d97706]/40 relative overflow-hidden shrink-0">
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-white filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
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
            <div className="flex flex-col text-left">
              <span className="text-[13.5px] sm:text-[16px] font-black tracking-tight text-[#0d0c0b] leading-none whitespace-nowrap">
                BALAJI PRIME MEDIA
              </span>
              <span className="text-[8px] sm:text-[9.5px] font-bold tracking-widest text-[#d97706] uppercase mt-0.5 sm:mt-1 whitespace-nowrap">
                Digital Growth &amp; SEO Agency
              </span>
            </div>
          </Link>

          {/* Cast & Render Desktop Navigation (.nav) */}
          <nav
            className="hidden lg:flex cr-nav items-center"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const isActive = activePage === link.key;
              return (
                <Link
                  key={link.key}
                  href={link.href}
                  prefetch={false}
                  className={isActive ? "active" : ""}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="ml-1 text-[9.5px] font-semibold bg-[#0d0c0b]/8 text-[#0d0c0b] px-1.5 py-0.5 rounded-full tracking-wide">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTAs: Live Support Pill + Cast & Render .pill */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
            {/* Live Global Support Badge (Integrated Seamlessly) */}
            <div
              className="hidden 2xl:flex items-center gap-1.5 text-[11px] font-medium text-[#0d0c0b]/65 border border-[#0d0c0b]/10 bg-[#0d0c0b]/4 px-2.5 py-1.5 rounded-full whitespace-nowrap"
              title="Global Support: EST • GMT • AEST"
            >
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-600" />
              </span>
              <span>Live Support · EST · GMT · AEST</span>
            </div>

            {/* DR 50+ Secondary Ghost Pill */}
            <Link
              href="/guest-posting"
              className="hidden sm:inline-flex cr-pill-ghost gap-1.5"
              title="High DR 50+ Editorial Backlinks"
            >
              <span className="text-[#0d0c0b]/60 text-xs">●</span>
              <span>DR 50+</span>
            </Link>

            {/* Prompt's Signature Dark Pill Button (.pill) */}
            <Link
              href="/contact"
              className="cr-pill"
              aria-label="Start a brief with Balaji Prime Media"
            >
              Start a brief
            </Link>

            {/* Clean Minimal Mobile Burger (<=1024px) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-[38px] h-[38px] rounded-full border border-[#0d0c0b]/15 bg-[#0d0c0b]/5 hover:bg-[#0d0c0b]/10 flex flex-col items-center justify-center gap-[4.5px] cursor-pointer transition-colors shrink-0 z-50"
              aria-controls="mobile-nav"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <span
                className={`w-3.5 h-[1.5px] bg-[#0d0c0b] rounded-full transition-transform duration-250 ease-out ${
                  mobileMenuOpen ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`w-3.5 h-[1.5px] bg-[#0d0c0b] rounded-full transition-opacity duration-200 ease-out ${
                  mobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`w-3.5 h-[1.5px] bg-[#0d0c0b] rounded-full transition-transform duration-250 ease-out ${
                  mobileMenuOpen ? "-translate-y-[6px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer in Cast & Render Style */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav"
            className="fixed inset-x-0 top-[72px] bottom-0 bg-[#f2f0ec]/98 backdrop-blur-2xl border-t border-[#0d0c0b]/10 p-6 z-50 flex flex-col justify-between overflow-y-auto lg:hidden animate-fadeIn"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = activePage === link.key;
                return (
                  <Link
                    key={link.key}
                    href={link.href}
                    prefetch={false}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-[15px] font-medium transition-colors ${
                      isActive
                        ? "bg-[#0d0c0b] text-white"
                        : "text-[#0d0c0b] hover:bg-[#0d0c0b]/5"
                    }`}
                  >
                    <span>{link.name}</span>
                    {link.badge && (
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-[#0d0c0b]/10 text-[#0d0c0b]"
                        }`}
                      >
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Mobile CTAs */}
            <div className="pt-4 border-t border-[#0d0c0b]/10 flex flex-col gap-3 mt-4 mb-6">
              <Link
                href="/pay"
                onClick={() => setMobileMenuOpen(false)}
                className="cr-pill-ghost w-full !h-[44px] !justify-between !px-4 !text-[14px]"
              >
                <span className="font-medium text-[#0d0c0b]">Client Payment Portal</span>
                <span>💳</span>
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="cr-pill w-full !h-[46px] !text-[14px]"
              >
                Start a brief →
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
