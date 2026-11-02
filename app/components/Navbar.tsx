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
      {/* Vesper.ai High-Precision Global Support Ribbon */}
      <div className="bg-[#000000] text-white text-[10.5px] sm:text-[11px] font-medium py-1.5 px-4 sm:px-6 border-b border-white/10 shadow-sm relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-y-1 gap-x-3 relative z-10">
          <div className="flex items-center gap-2 truncate">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-[#a1a1aa] truncate tracking-tight">
              Global Support • <span className="text-[#f59e0b] font-semibold">EST</span> •{" "}
              <span className="text-[#f59e0b] font-semibold">GMT</span> •{" "}
              <span className="text-[#f59e0b] font-semibold">AEST</span>
            </span>
          </div>
          <div className="flex items-center gap-3 text-[#a1a1aa] shrink-0 text-[10px] sm:text-[11px]">
            <span className="hidden sm:inline text-white/70">✨ White-Hat SEO</span>
            <Link
              href="/pay"
              className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 transition-colors"
            >
              <span>Client Portal</span>
              <span>💳</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Vesper.ai 3-Column Luxury Pure Black Header */}
      <header className="sticky top-0 z-40 bg-[#050505]/95 backdrop-blur-2xl border-b border-white/10 px-4 sm:px-6 lg:px-8 py-3 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-4">
          
          {/* Left: Brand Logo & Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-2.5 sm:gap-3 group shrink-0 justify-self-start"
            aria-label="Balaji Prime Media Home"
          >
            {/* Liquid-metal logo emblem */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-[#090909] via-[#222222] to-[#454545] border border-white/20 flex items-center justify-center shadow-lg shadow-black/80 group-hover:border-white/50 group-hover:scale-105 transition-all duration-300 relative overflow-hidden shrink-0">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-white filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
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
              <span className="text-[14.5px] sm:text-[16px] font-extrabold tracking-tight text-white leading-none whitespace-nowrap">
                BALAJI PRIME MEDIA
              </span>
              <span className="text-[8px] sm:text-[9px] font-bold tracking-[0.16em] text-[#f59e0b] uppercase mt-1 whitespace-nowrap">
                Digital Growth &amp; SEO Agency
              </span>
            </div>
          </Link>

          {/* Center: Vesper Liquid-Metal Nav Pills */}
          <nav
            id="site-nav"
            className="hidden lg:flex items-center gap-1.5 xl:gap-2 justify-self-center"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const isActive = activePage === link.key;
              return (
                <Link
                  key={link.key}
                  href={link.href}
                  prefetch={false}
                  className={`vesper-nav-pill ${isActive ? "active" : ""}`}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="ml-1.5 text-[9px] font-black bg-amber-400/20 text-amber-300 border border-amber-400/40 px-1.5 py-0.5 rounded tracking-wide">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Vesper Liquid-Glass Buttons & Mobile Burger */}
          <div className="flex items-center gap-2 sm:gap-2.5 justify-self-end shrink-0">
            {/* Ghost Pill Button - DR 50+ */}
            <Link
              href="/guest-posting"
              className="hidden sm:inline-flex vesper-btn-ghost gap-1.5"
              title="High DR 50+ Guest Posting"
            >
              <svg
                className="w-3.5 h-3.5 text-amber-400 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                <line x1="7" y1="7" x2="7.01" y2="7" />
              </svg>
              <span>DR 50+</span>
            </Link>

            {/* Solid Liquid-Glass Action Button - Let's Talk */}
            <Link
              href="/contact"
              className="vesper-btn-solid gap-1.5"
              aria-label="Contact Balaji Prime Media"
            >
              <span>Let&apos;s Talk</span>
              <svg
                className="w-3.5 h-3.5 text-black shrink-0 transition-transform group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>

            {/* Vesper 42x42 Mobile Burger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-[42px] h-[42px] rounded-[6px] border border-white/15 bg-[#080808]/70 hover:bg-white/10 hover:border-white/30 flex flex-col items-center justify-center gap-[5px] cursor-pointer transition-colors shrink-0 z-50"
              aria-controls="mobile-nav"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <span
                className={`w-4 h-[1.5px] bg-white rounded-xs transition-transform duration-250 ease-out ${
                  mobileMenuOpen ? "translate-y-[6.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`w-4 h-[1.5px] bg-white rounded-xs transition-opacity duration-200 ease-out ${
                  mobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`w-4 h-[1.5px] bg-white rounded-xs transition-transform duration-250 ease-out ${
                  mobileMenuOpen ? "-translate-y-[6.5px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Full-screen / Frosted Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav"
            className="fixed inset-x-0 top-[96px] bottom-0 bg-[#050505]/95 backdrop-blur-2xl border-t border-white/10 p-5 z-50 flex flex-col justify-between overflow-y-auto lg:hidden animate-fadeIn"
          >
            <div className="flex flex-col gap-2.5">
              {navLinks.map((link) => {
                const isActive = activePage === link.key;
                return (
                  <Link
                    key={link.key}
                    href={link.href}
                    prefetch={false}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`vesper-nav-pill w-full !h-[48px] !justify-between !px-4 !text-[14px] ${
                      isActive ? "active" : ""
                    }`}
                  >
                    <span className="font-semibold">{link.name}</span>
                    {link.badge && (
                      <span className="text-[10px] font-black bg-amber-400/20 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Footer CTAs */}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-3 mt-4 mb-6">
              <Link
                href="/pay"
                onClick={() => setMobileMenuOpen(false)}
                className="vesper-nav-pill w-full !h-[48px] !justify-between !px-4 !text-[14px] !border-amber-400/40 !bg-gradient-to-r !from-[#1a140a] !to-[#2b1f0f]"
              >
                <span className="text-amber-400 font-bold">Client Payment Portal</span>
                <span>💳</span>
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="vesper-btn-solid w-full !h-[48px] !text-[14px]"
              >
                <span>Let&apos;s Talk</span>
                <span className="ml-1">→</span>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
