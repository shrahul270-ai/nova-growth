"use client";

import React, { useState } from "react";
import Link from "next/link";

interface NavbarProps {
  activePage?: "home" | "about" | "services" | "guest-posting" | "projects" | "blog" | "contact" | "pay";
}

export default function Navbar({ activePage = "home" }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      {/* 3D Global Timezone & Presence Ribbon */}
      <div className="bg-[#091427] text-white text-[10.5px] sm:text-[11px] font-medium py-1.5 px-3 sm:px-6 border-b border-[#d97706]/30 shadow-xs relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-y-1 gap-x-3">
          <div className="flex items-center gap-1.5 sm:gap-2 truncate">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="text-slate-300 truncate">
              Global Support • <span className="text-[#f59e0b] font-bold">EST</span> • <span className="text-[#f59e0b] font-bold">GMT</span> • <span className="text-[#f59e0b] font-bold">AEST</span>
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 text-slate-300 shrink-0 text-[10px] sm:text-[11px]">
            <span className="hidden sm:inline">✨ White-Hat SEO</span>
            <Link href="/pay" className="text-amber-400 hover:underline font-semibold flex items-center gap-1">
              <span>Client Portal</span>
              <span>💳</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 3D Glassmorphic Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-[#d97706]/20 px-3 sm:px-6 lg:px-6 xl:px-10 2xl:px-12 py-2.5 sm:py-3.5 transition-all shadow-[0_4px_20px_-2px_rgba(9,20,39,0.06)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-3 lg:gap-4 xl:gap-8">
          
          {/* 3D Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0 min-w-0">
            <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-[#091427] via-[#1d4ed8] to-[#d97706] flex items-center justify-center shadow-md shadow-[#091427]/30 group-hover:scale-105 group-hover:-translate-y-0.5 transition-all duration-300 border border-[#d97706]/40 relative overflow-hidden shrink-0">
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <svg
                className="w-4 h-4 sm:w-6 sm:h-6 text-white filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
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
              <span className="text-[13.5px] sm:text-[17px] font-black tracking-tight text-[#091427] leading-none whitespace-nowrap">
                NOVA GROWTH
              </span>
              <span className="text-[8px] sm:text-[9.5px] font-bold tracking-widest text-[#d97706] uppercase mt-0.5 sm:mt-1 whitespace-nowrap">
                Digital Marketing Agency
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Always in 1 clean single row on all desktop screens */}
          <nav
            className="hidden lg:flex items-center gap-2.5 lg:gap-3.5 xl:gap-5.5 2xl:gap-7 text-[12.5px] lg:text-[13px] xl:text-[13.5px] font-semibold text-[#54647c] whitespace-nowrap"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const isActive = activePage === link.key;
              return (
                <Link
                  key={link.key}
                  href={link.href}
                  prefetch={false}
                  className={`relative py-1 transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                    isActive
                      ? "text-[#091427] font-bold"
                      : "hover:text-[#091427] hover:-translate-y-0.5"
                  }`}
                >
                  <span className="whitespace-nowrap">{link.name}</span>
                  {link.badge && (
                    <span className="text-[9px] font-black bg-amber-500/15 text-amber-900 border border-amber-500/30 px-1.5 py-0.5 rounded-md whitespace-nowrap shrink-0">
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#d97706] rounded-full shadow-xs" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* 3D Action CTAs - Responsive without header squeeze */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* DR 50+ Ticket Pill Button - Hidden on small mobile to avoid header overflow, visible from sm up */}
            <Link
              href="/guest-posting"
              className="hidden sm:inline-flex items-center gap-1.5 bg-amber-50/90 hover:bg-amber-100 text-[#091427] border border-amber-300/80 text-[11px] sm:text-xs font-bold px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full transition-all hover:scale-102 cursor-pointer shadow-xs whitespace-nowrap shrink-0"
              title="High DR 50+ Guest Posting"
            >
              <svg
                className="w-3.5 h-3.5 text-gray-800"
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

            {/* Let's Talk CTA Button */}
            <Link
              href="/contact"
              className="btn-3d inline-flex items-center gap-1 sm:gap-2 bg-[#091427] hover:bg-[#0f213d] text-white border border-[#d97706]/50 text-xs sm:text-[13px] font-bold px-3 sm:px-5 py-1.5 sm:py-2 rounded-full transition-all hover:gap-2 cursor-pointer shadow-sm whitespace-nowrap shrink-0"
              aria-label="Contact Nova Growth Agency"
            >
              <span>Let&apos;s Talk</span>
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 text-[#d97706]"
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

            {/* Hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 rounded-xl text-gray-700 hover:bg-gray-100 focus:outline-none border border-gray-200 cursor-pointer shrink-0"
              aria-label="Toggle menu"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden pt-4 pb-3 border-t border-gray-100 mt-3 flex flex-col gap-2 animate-fadeIn">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                prefetch={false}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold ${
                  activePage === link.key
                    ? "bg-[#091427] text-white shadow-xs"
                    : "text-gray-700 hover:bg-gray-50 border border-transparent"
                }`}
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="text-[10px] font-black bg-amber-500/20 text-[#d97706] px-2 py-0.5 rounded-md">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}

            <div className="pt-2 border-t border-gray-100 flex flex-col gap-2 mt-1">
              <Link
                href="/pay"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-50 text-[#091427] border border-amber-200"
              >
                <span>Client Payment Portal</span>
                <span>💳</span>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
