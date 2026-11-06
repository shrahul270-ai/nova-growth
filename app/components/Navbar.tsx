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

  // Exact page names and order from user specification (Image 1)
  const navLinks = [
    { name: "Guest Posting", href: "/guest-posting", key: "guest-posting", badge: "DR 50+" },
    { name: "Services", href: "/services", key: "services" },
    { name: "Projects & Case Studies", href: "/projects", key: "projects" },
    { name: "Blogs & Insights", href: "/blog", key: "blog" },
    { name: "About Us", href: "/about", key: "about" },
    { name: "Contact Us", href: "/contact", key: "contact" },
  ];

  return (
    <>
      {/* =========================================================================
          2-TIER TRANSPARENT NAVBAR (User's Exact Specification)
         ========================================================================= */}
      <header className="sticky top-0 z-50 w-full bg-transparent transition-all duration-300">
        
        {/* Tier 1: Top Micro-utility Bar (Transparent, WhatsApp removed, Payment added) */}
        <div className="w-full bg-transparent border-b border-white/10 py-1.5 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-[11.5px] font-medium text-slate-300">
            
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

            {/* Right: Payment link only (WhatsApp VIP completely removed as requested) */}
            <div className="flex items-center gap-3 shrink-0 ml-auto">
              <Link
                href="/pay"
                className="inline-flex items-center gap-1.5 text-slate-200 hover:text-white transition-colors bg-white/[0.08] hover:bg-white/[0.16] border border-white/15 px-3 py-0.5 rounded-full text-[11.5px] font-semibold shadow-xs"
              >
                <span>Payment</span>
                <span className="text-[11px]">💳</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Tier 2: Main Transparent Floating Navbar */}
        <div className="w-full px-3 sm:px-6 lg:px-8 pt-2 pb-2">
          <div className="max-w-7xl mx-auto rounded-full transition-all duration-300 px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4 border border-white/10 bg-black/25 backdrop-blur-md shadow-lg shadow-black/20">
            
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

              {/* 2 to 7: Guest Posting, Services, Projects & Case Studies, Blogs & Insights, About Us, Contact Us */}
              {navLinks.map((link) => {
                const isActive = activePage === link.key;
                return (
                  <Link
                    key={link.key}
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
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Button: "Get Started" linking to /guest-posting */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              <Link
                href="/guest-posting"
                className="group relative inline-flex items-center justify-center px-5 sm:px-6 py-2.5 rounded-full text-[13px] sm:text-[13.5px] font-bold text-white transition-all duration-300 hover:scale-[1.04] active:scale-[0.98] cursor-pointer shadow-[0_0_24px_rgba(160,104,255,0.5)] hover:shadow-[0_0_36px_rgba(160,104,255,0.8)]"
                style={{
                  background: "linear-gradient(135deg, #A068FF 0%, #7928CA 60%, #4F46E5 100%)",
                }}
              >
                <span>Get Started</span>
              </Link>

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

          {/* Navigation Links in Exact Order: Home, Guest Posting, Services, Projects & Case Studies, Blogs & Insights, About Us, Contact Us, Payment */}
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

            {/* 2 to 7. Exact Links */}
            {navLinks.map((link) => {
              const isActive = activePage === link.key;
              return (
                <Link
                  key={link.key}
                  href={link.href}
                  prefetch={false}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between py-2.5 px-3.5 rounded-xl text-[16px] font-semibold transition-colors ${
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
          </div>
        </nav>
      )}
    </>
  );
}
