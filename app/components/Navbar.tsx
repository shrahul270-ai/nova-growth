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
      {/* Top Global Support Ribbon in Cast & Render Editorial Tone */}
      <div className="bg-[#ebe8e2] text-[#0d0c0b] text-[10.5px] sm:text-[11px] font-medium py-1.5 px-4 sm:px-6 border-b border-[#0d0c0b]/10 relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-y-1 gap-x-3 relative z-10">
          <div className="flex items-center gap-2 truncate">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
            </span>
            <span className="text-[#0d0c0b]/70 truncate tracking-tight">
              Global Support • <span className="text-[#0d0c0b] font-semibold">EST</span> •{" "}
              <span className="text-[#0d0c0b] font-semibold">GMT</span> •{" "}
              <span className="text-[#0d0c0b] font-semibold">AEST</span>
            </span>
          </div>
          <div className="flex items-center gap-3 text-[#0d0c0b]/70 shrink-0 text-[10px] sm:text-[11px]">
            <span className="hidden sm:inline">✨ White-Hat SEO</span>
            <Link
              href="/pay"
              className="text-[#0d0c0b] hover:opacity-75 font-semibold flex items-center gap-1 transition-opacity underline decoration-[#0d0c0b]/30"
            >
              <span>Client Portal</span>
              <span>💳</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Cast & Render Editorial Chrome Header */}
      <header className="cr-chrome relative">
        {/* Scroll Progress Hairline Meter */}
        <i
          className="cr-meter"
          style={{ transform: `scaleX(${scrollProgress})` }}
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-3 sm:gap-4">
          
          {/* Brand Mark with Cast & Render Star Mark */}
          <Link
            href="/"
            className="cr-mark group"
            aria-label="Balaji Prime Media — 3D & Digital Growth Studio"
          >
            <span className="cr-mark-star group-hover:rotate-45 transition-transform duration-300" aria-hidden="true">
              &#10037;
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-semibold text-[15px] sm:text-[16px] tracking-[-0.015em] text-[#0d0c0b]">
                Balaji Prime Media
              </span>
              <span className="hidden xl:inline text-[11px] text-[#0d0c0b]/50 tracking-normal font-normal">
                · Growth Studio
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden lg:flex cr-nav"
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

          {/* Right Action CTAs & Mobile Burger */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* DR 50+ Secondary Ghost Pill */}
            <Link
              href="/guest-posting"
              className="hidden sm:inline-flex cr-pill-ghost gap-1.5"
              title="High DR 50+ Editorial Backlinks"
            >
              <span className="text-[#0d0c0b]/60 text-xs">●</span>
              <span>DR 50+</span>
            </Link>

            {/* Signature Dark Pill - Start a brief / Contact */}
            <Link
              href="/contact"
              className="cr-pill"
              aria-label="Start a brief with Balaji Prime Media"
            >
              Start a brief
            </Link>

            {/* Clean Mobile Burger Button */}
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

        {/* Mobile Navigation Drawer in Editorial Style */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav"
            className="fixed inset-x-0 top-[90px] bottom-0 bg-[#f2f0ec]/98 backdrop-blur-2xl border-t border-[#0d0c0b]/10 p-6 z-50 flex flex-col justify-between overflow-y-auto lg:hidden animate-fadeIn"
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
