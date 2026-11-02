"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface NavbarProps {
  activePage?: "home" | "about" | "services" | "guest-posting" | "projects" | "blog" | "contact" | "pay";
}

export default function Navbar({ activePage = "home" }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      {/* 2-Tier Transparent Header */}
      <header className="w-full relative z-30 bg-transparent">
        
        {/* Tier 1: Top Transparent Utility Bar (Left empty, Right has Live Support & Portal) */}
        <div className="w-full flex items-center justify-between px-4 sm:px-8 pt-3 pb-1 text-xs">
          {/* Left: Empty as requested */}
          <div className="hidden sm:block" />

          {/* Right: Live Support + Portal Link */}
          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            {/* Live Global Support Signal */}
            <div
              className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[hsl(40,6%,82%)]/90 border border-white/10 bg-white/[0.04] px-2.5 py-1 rounded-full whitespace-nowrap backdrop-blur-xs"
              title="Global Support: EST • GMT • AEST"
            >
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
              </span>
              <span>Live Support · EST · GMT · AEST</span>
            </div>

            {/* Client Portal Link */}
            <Link
              href="/pay"
              className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-[hsl(40,6%,82%)] hover:text-white transition-colors border border-white/10 bg-white/[0.04] px-2.5 py-1 rounded-full whitespace-nowrap hover:border-white/25"
            >
              <span>Portal</span>
              <span className="text-[11px]">💳</span>
            </Link>
          </div>
        </div>

        {/* Tier 2: Main Bottom Transparent Navbar (Brand Logo, Center Links, Right CTA) */}
        <div className="w-full flex items-center justify-between gap-4 sm:gap-6 px-4 sm:px-8 py-3 sm:py-3.5">
          
          {/* User's Original Official Brand Logo & Name */}
          <Link
            href="/"
            className="flex items-center gap-2.5 sm:gap-3 group shrink-0 min-w-0"
            aria-label="Balaji Prime Media Home"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-[#091427] via-[#1d4ed8] to-[#d97706] flex items-center justify-center shadow-lg shadow-black/60 group-hover:scale-105 group-hover:-translate-y-0.5 transition-all duration-300 border border-[#d97706]/40 relative overflow-hidden shrink-0">
              <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity" />
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-white filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
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
              <span className="text-[14px] sm:text-[16.5px] font-extrabold tracking-tight text-[hsl(40,6%,95%)] leading-none whitespace-nowrap">
                BALAJI PRIME MEDIA
              </span>
              <span className="text-[8px] sm:text-[9.5px] font-bold tracking-[0.16em] text-[#d97706] uppercase mt-0.5 sm:mt-1 whitespace-nowrap">
                Digital Growth &amp; SEO Agency
              </span>
            </div>
          </Link>

          {/* Centered Desktop Navigation Links with text-foreground/90 and hover transition */}
          <nav
            className="hidden lg:flex items-center gap-6 xl:gap-8"
            aria-label="Primary"
          >
            <Link
              href="/"
              prefetch={false}
              className={`text-[14px] font-medium transition-colors hover:text-[hsl(40,6%,95%)] ${
                activePage === "home" ? "text-[hsl(40,6%,95%)] font-semibold" : "text-[hsl(40,6%,95%)]/75"
              }`}
            >
              Home
            </Link>
            {navLinks.map((link) => {
              const isActive = activePage === link.key;
              return (
                <Link
                  key={link.key}
                  href={link.href}
                  prefetch={false}
                  className={`text-[14px] font-medium transition-colors hover:text-[hsl(40,6%,95%)] flex items-center gap-1 ${
                    isActive ? "text-[hsl(40,6%,95%)] font-semibold" : "text-[hsl(40,6%,95%)]/75"
                  }`}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="text-[9.5px] font-bold bg-white/10 text-amber-300 border border-white/15 px-1.5 py-0.5 rounded-full tracking-wide">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Area: ONLY "Get Started" CTA (Live Support & Portal removed from here) */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="heroSecondary text-[13.5px] font-medium rounded-full px-5 py-2 transition-all shadow-sm"
              aria-label="Get Started with Balaji Prime Media"
            >
              <span>Get Started</span>
            </Link>

            {/* Minimalist 2-Bar Burger Button for Mobile */}
            <button
              type="button"
              id="burger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-[40px] h-[40px] rounded-full border border-white/15 bg-white/5 hover:bg-white/10 flex flex-col items-center justify-center gap-[5px] cursor-pointer transition-colors shrink-0 z-50"
              aria-controls="menu"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <i
                className={`w-4 h-[1.5px] bg-[#fafafa] rounded-full transition-transform duration-300 ease-out ${
                  mobileMenuOpen ? "translate-y-[3px] rotate-45" : ""
                }`}
              />
              <i
                className={`w-4 h-[1.5px] bg-[#fafafa] rounded-full transition-transform duration-300 ease-out ${
                  mobileMenuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* 1px divider line with gradient from-transparent via-foreground/20 to-transparent */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[hsl(40,6%,95%)]/15 to-transparent mt-[1px]" />
      </header>

        {/* Mobile Dark Full-screen Overlay Menu */}
        {mobileMenuOpen && (
          <nav
            id="menu"
            className="fixed inset-x-0 top-[65px] bottom-0 bg-[#050505]/98 backdrop-blur-2xl border-t border-white/10 p-6 z-50 flex flex-col justify-between overflow-y-auto lg:hidden animate-fadeIn"
          >
            <div className="flex flex-col gap-3">
              <p className="text-[11px] font-semibold tracking-widest text-[#a7a6a6] uppercase mb-1">
                Menu
              </p>
              <Link
                href="/"
                prefetch={false}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between py-3 text-[19px] font-medium border-b border-white/5 transition-colors ${
                  activePage === "home" ? "text-white font-semibold" : "text-[#b6b5b5] hover:text-white"
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
                    className={`flex items-center justify-between py-3 text-[19px] font-medium border-b border-white/5 transition-colors ${
                      isActive ? "text-white font-semibold" : "text-[#b6b5b5] hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{link.name}</span>
                      {link.badge && (
                        <span className="text-[10px] font-bold bg-white/10 text-amber-300 border border-white/15 px-2 py-0.5 rounded-full">
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
            <div className="pt-6 border-t border-white/10 flex flex-col gap-3 mt-6 mb-6">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="cinematic-pill w-full !h-[50px] !text-[15px]"
              >
                <span>Get Started</span>
              </Link>
              <Link
                href="/pay"
                onClick={() => setMobileMenuOpen(false)}
                className="cinematic-ghost w-full !h-[48px] !text-[14px]"
              >
                <span>Client Payment Portal 💳</span>
              </Link>
            </div>
          </nav>
        )}
    </>
  );
}
