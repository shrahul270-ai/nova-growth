"use client";

import React, { useState } from "react";
import Link from "next/link";

interface NavbarProps {
  activePage?: "home" | "about" | "services" | "projects" | "blog" | "contact";
}

export default function Navbar({ activePage = "home" }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/", key: "home" },
    { name: "About", href: "/about", key: "about" },
    { name: "Services", href: "/services", key: "services" },
    { name: "Projects", href: "/projects", key: "projects" },
    { name: "Blog", href: "/blog", key: "blog" },
    { name: "Contact", href: "/contact", key: "contact" },
  ];

  return (
    <header className="sticky top-0 z-50 glass-header px-6 py-4 md:px-12 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#059669] via-[#10b981] to-[#34d399] flex items-center justify-center shadow-sm shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <svg
              className="w-6 h-6 text-white"
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
          <div className="flex flex-col">
            <span className="text-[17px] font-extrabold tracking-tight text-[#0f172a] leading-none">
              NOVA GROWTH
            </span>
            <span className="text-[10px] font-medium tracking-wider text-[#64748b] uppercase mt-0.5">
              Digital Marketing Agency
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav
          className="hidden md:flex items-center gap-8 lg:gap-9 text-[14px] font-semibold text-[#4b5563]"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {
            const isActive = activePage === link.key;
            return (
              <Link
                key={link.key}
                href={link.href}
                className={`relative pb-1 transition-colors ${
                  isActive
                    ? "text-[#0d5c4d] font-bold"
                    : "hover:text-[#0d5c4d]"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#0d5c4d] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* CTA Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#0d5c4d] hover:bg-[#09473b] text-white text-[13.5px] font-semibold px-5 py-2.5 rounded-full shadow-sm shadow-[#0d5c4d]/20 transition-all hover:gap-3 cursor-pointer"
            aria-label="Contact Nova Growth Agency"
          >
            <span>Let&apos;s Talk</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>

          {/* Hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
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
        <div className="md:hidden pt-4 pb-3 border-t border-gray-100 mt-3 flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2 rounded-lg text-sm font-semibold ${
                activePage === link.key
                  ? "bg-emerald-50 text-[#0d5c4d]"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
