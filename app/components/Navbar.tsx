"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface NavbarProps {
  activePage?: "home" | "about" | "services" | "guest-posting" | "projects" | "blog" | "contact" | "pay";
  onJoinClick?: () => void;
}

export default function Navbar({ activePage = "home", onJoinClick }: NavbarProps) {
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
    { name: "Services", href: "/services", key: "services", hasChevron: true },
    { name: "Guest Posting", href: "/guest-posting", key: "guest-posting", badge: "DR 50+" },
    { name: "Projects", href: "/projects", key: "projects" },
    { name: "SEO Audit", href: "/audit", key: "audit", badge: "Free" },
    { name: "Blog", href: "/blog", key: "blog" },
    { name: "About", href: "/about", key: "about" },
    { name: "Contact", href: "/contact", key: "contact" },
  ];

  return (
    <>
      {/* =========================================================================
          NAVBAR: Full width, py-5 px-8, flex row with justify-between
          Below navbar: 1px divider line with gradient from-transparent via-foreground/20 to-transparent
         ========================================================================= */}
      <header className="w-full relative z-40 bg-transparent">
        <div className="w-full py-4 sm:py-5 px-5 sm:px-8 flex items-center justify-between gap-4">
          
          {/* LEFT: Logo Image (height ~34px) */}
          <Link
            href="/"
            className="flex items-center group shrink-0"
            aria-label="Balaji Prime Media Home"
          >
            <Image
              src="/images/bpm-complete-logo.png"
              alt="Balaji Prime Media"
              width={200}
              height={180}
              priority
              className="h-9 sm:h-10 w-auto object-contain transition-transform group-hover:scale-105 filter drop-shadow-[0_2px_12px_rgba(160,104,255,0.4)]"
            />
          </Link>

          {/* CENTER: Nav items with hover transition */}
          <nav
            className="hidden lg:flex items-center gap-6 xl:gap-8"
            aria-label="Primary Navigation"
          >
            <Link
              href="/"
              prefetch={false}
              className={`text-[14px] font-medium transition-colors hover:text-white ${
                activePage === "home"
                  ? "text-white font-semibold"
                  : "text-[hsl(40,6%,95%)]/90"
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
                  className={`text-[14px] font-medium transition-colors hover:text-white flex items-center gap-1.5 ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-[hsl(40,6%,95%)]/90"
                  }`}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="text-[9px] font-bold bg-[#A068FF]/20 text-[#d8b4fe] border border-purple-500/40 px-1.5 py-0.5 rounded-full">
                      {link.badge}
                    </span>
                  )}
                  {link.hasChevron && (
                    <svg
                      className="w-3.5 h-3.5 opacity-60"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT: Quick Pay + Action CTA Button (rounded-full px-5 py-2.5) */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/pay"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 px-3 py-1.5 rounded-full transition-colors"
            >
              <span>Pay</span>
              <span className="text-[10px]">💳</span>
            </Link>

            <button
              type="button"
              onClick={onJoinClick}
              className="inline-flex items-center justify-center rounded-full px-5 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-[13.5px] font-semibold text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(160,104,255,0.4)] cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #A068FF 0%, #7928CA 60%, #4F46E5 100%)",
              }}
            >
              <span>Start Project</span>
            </button>

            {/* Minimal Mobile Burger */}
            <button
              type="button"
              id="burger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-full border border-white/15 bg-white/5 flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors"
              aria-label="Toggle menu"
            >
              <span className={`w-4 h-[1.5px] bg-white transition-transform ${mobileMenuOpen ? "rotate-45 translate-y-[3px]" : ""}`} />
              <span className={`w-4 h-[1.5px] bg-white transition-transform ${mobileMenuOpen ? "-rotate-45 -translate-y-[2.5px]" : ""}`} />
            </button>
          </div>
        </div>

        {/* BELOW NAVBAR: 1px divider line with gradient from-transparent via-foreground/20 to-transparent, offset mt-[3px] */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[hsl(40,6%,95%)]/20 to-transparent mt-[3px]" />
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <nav className="fixed inset-0 bg-[#070319]/98 backdrop-blur-3xl z-50 flex flex-col justify-between p-6 lg:hidden animate-fadeIn">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <Image
              src="/images/bpm-complete-logo.png"
              alt="Balaji Prime Media"
              width={160}
              height={140}
              className="h-9 w-auto object-contain"
            />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center text-sm font-bold"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col gap-2 py-4">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 text-base font-semibold text-white"
            >
              Home
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 text-base font-semibold text-slate-300 hover:text-white flex items-center justify-between"
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="text-[10px] font-bold bg-purple-900/50 text-purple-200 px-2 py-0.5 rounded-full">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onJoinClick?.();
              }}
              className="w-full h-11 rounded-full text-white font-bold text-sm bg-gradient-to-r from-[#A068FF] to-[#7928CA]"
            >
              Start Project
            </button>
            <Link
              href="/pay"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full h-10 rounded-full border border-white/15 bg-white/5 text-white text-xs font-semibold flex items-center justify-center"
            >
              Client Pay 💳
            </Link>
          </div>
        </nav>
      )}
    </>
  );
}
