"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import LoginModal from "./LoginModal";

interface NavbarProps {
  activePage?: "home" | "about" | "services" | "guest-posting" | "projects" | "blog" | "contact" | "pay";
  onJoinClick?: () => void;
}

export default function Navbar({ activePage = "home" }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [buyerUser, setBuyerUser] = useState<{ email: string; name?: string } | null>(null);

  // Sync buyer session on mount & when changed
  useEffect(() => {
    const checkUser = () => {
      try {
        const stored = localStorage.getItem("nova_buyer_session");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && parsed.email) {
            setBuyerUser(parsed);
            return;
          }
        }
        setBuyerUser(null);
      } catch {
        setBuyerUser(null);
      }
    };

    checkUser();
    window.addEventListener("buyer-session-changed", checkUser);
    return () => window.removeEventListener("buyer-session-changed", checkUser);
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
    { name: "Guest Posting", href: "/guest-posting", key: "guest-posting", badge: "DR 50+" },
    { name: "Services", href: "/services", key: "services" },
    { name: "Projects", href: "/projects", key: "projects" },
    { name: "Blogs", href: "/blog", key: "blog" },
    { name: "About Us", href: "/about", key: "about" },
    { name: "Contact Us", href: "/contact", key: "contact" },
  ];

  return (
    <>
      {/* 2-Tier Transparent Header */}
      <header className="w-full relative z-30 bg-transparent">
        
        {/* Tier 1: Top Transparent Utility Bar (Left empty, Right has Live Support & Payment) */}
        <div className="w-full flex items-center justify-between px-3 sm:px-8 pt-2.5 sm:pt-3 pb-1 text-xs">
          {/* Left: Empty as requested */}
          <div className="hidden sm:block" />

          {/* Right: Live Support + Payment Link */}
          <div className="flex items-center gap-2 sm:gap-4 ml-auto">
            {/* Live Global Support Signal */}
            <div
              className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-[#154359] border border-[#154359]/20 bg-white/60 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full whitespace-nowrap backdrop-blur-xs shadow-2xs"
              title="Global Support: EST • GMT • AEST"
            >
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-600" />
              </span>
              <span className="hidden sm:inline">Live Support · EST · GMT · AEST</span>
              <span className="sm:hidden">Live Support</span>
            </div>

            {/* Payment Link */}
            <Link
              href="/pay"
              className="inline-flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-[12.5px] font-semibold text-[#154359] hover:text-[#091427] transition-colors border border-[#154359]/20 bg-white/60 hover:bg-white px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full whitespace-nowrap shadow-2xs"
            >
              <span>Payment</span>
              <span className="text-[10px] sm:text-[11px]">💳</span>
            </Link>
          </div>
        </div>

        {/* Tier 2: Main Bottom Transparent Navbar (Brand Logo, Center Links, Right CTA) */}
        <div className="w-full flex items-center justify-between gap-3 sm:gap-6 px-3 sm:px-8 py-2.5 sm:py-3.5">
          
          {/* User's Official Brand Logo - Big Single Logo Image (BPM & Tagline in Logo itself) */}
          <Link
            href="/"
            className="flex items-center group shrink-0"
            aria-label="Balaji Prime Media Home"
          >
            <Image
              src="/images/bpm-complete-logo.png"
              alt="BPM - Digital Growth & SEO Agency"
              width={220}
              height={205}
              priority
              className="h-14 sm:h-17 md:h-20 w-auto object-contain group-hover:scale-105 transition-transform duration-300 filter drop-shadow-[0_4px_22px_rgba(251,191,36,0.5)]"
            />
          </Link>

          {/* Centered Desktop Navigation Links with text-[#154359] */}
          <nav
            className="hidden lg:flex items-center gap-6 xl:gap-8 bg-white/50 backdrop-blur-md px-6 py-2 rounded-full border border-[#154359]/15 shadow-2xs"
            aria-label="Primary"
          >
            <Link
              href="/"
              prefetch={false}
              className={`text-[14px] font-semibold transition-colors hover:text-[#091427] ${
                activePage === "home" ? "text-[#154359] font-bold underline underline-offset-4 decoration-2 decoration-[#185B7B]" : "text-[#154359]/80"
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
                  className={`text-[14px] font-semibold transition-colors hover:text-[#091427] flex items-center gap-1 ${
                    isActive ? "text-[#154359] font-bold underline underline-offset-4 decoration-2 decoration-[#185B7B]" : "text-[#154359]/80"
                  }`}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="text-[9.5px] font-bold bg-amber-100 text-amber-900 border border-amber-300 px-1.5 py-0.5 rounded-full tracking-wide">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Area: Log In Modal Trigger + Join Now (links to /guest-posting) */}
          <div className="flex items-center gap-4 sm:gap-6 shrink-0">
            {buyerUser ? (
              <Link
                href="/buyer-dashboard"
                className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold text-white/95 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 px-3.5 py-1.5 rounded-full backdrop-blur-sm transition-all"
                title="Open Buyer Dashboard"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{buyerUser.name || buyerUser.email.split("@")[0]}</span>
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => setIsLoginModalOpen(true)}
                className="marketeam-login-link text-white/95 hover:text-[#A068FF] text-[15px] font-medium hidden sm:inline-block transition-colors cursor-pointer bg-transparent border-none p-0"
                aria-label="Open Login Modal"
              >
                Log In
              </button>
            )}

            {/* Join Now with Rotating Conic-Gradient Border -> Navigates to /guest-posting */}
            <div className="btn-border-wrap">
              <Link
                href="/guest-posting"
                className="marketeam-join-btn text-decoration-none"
                aria-label="Join Now - Guest Posting"
              >
                Join Now
              </Link>
            </div>

            {/* Minimalist 2-Bar Burger Button for Mobile */}
            <button
              type="button"
              id="burger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-[40px] h-[40px] rounded-full border border-[#154359]/20 bg-white/60 hover:bg-white flex flex-col items-center justify-center gap-[5px] cursor-pointer transition-colors shrink-0 z-50 shadow-2xs"
              aria-controls="menu"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <i
                className={`w-4 h-[1.5px] bg-[#154359] rounded-full transition-transform duration-300 ease-out ${
                  mobileMenuOpen ? "translate-y-[3px] rotate-45" : ""
                }`}
              />
              <i
                className={`w-4 h-[1.5px] bg-[#154359] rounded-full transition-transform duration-300 ease-out ${
                  mobileMenuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* 1px divider line with gradient from-transparent via-[#154359]/20 to-transparent */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#154359]/20 to-transparent mt-[1px]" />
      </header>

        {/* Mobile Full-Screen Overlay Navigation Drawer */}
        {mobileMenuOpen && (
          <nav
            id="menu"
            className="fixed inset-0 bg-[#07050E]/98 backdrop-blur-3xl z-50 flex flex-col justify-between overflow-y-auto lg:hidden p-6 animate-fadeIn"
          >
            {/* Top Bar inside Drawer */}
            <div className="flex items-center justify-between pb-5 border-b border-white/10">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center"
              >
                <Image
                  src="/images/bpm-complete-logo.png"
                  alt="BPM - Digital Growth & SEO Agency"
                  width={160}
                  height={150}
                  className="h-13 w-auto object-contain filter drop-shadow-[0_2px_12px_rgba(251,191,36,0.4)]"
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
              <p className="text-[10px] font-bold tracking-widest text-[#a855f7] uppercase mb-1">
                Navigation
              </p>
              <Link
                href="/"
                prefetch={false}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between py-3 px-3 rounded-xl text-[17px] font-semibold transition-colors ${
                  activePage === "home" ? "bg-white/10 text-white" : "text-[#cbd5e1] hover:text-white hover:bg-white/5"
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
                    className={`flex items-center justify-between py-3 px-3 rounded-xl text-[17px] font-semibold transition-colors ${
                      isActive ? "bg-white/10 text-white" : "text-[#cbd5e1] hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{link.name}</span>
                      {link.badge && (
                        <span className="text-[10px] font-bold bg-[#1E1638] text-[#c084fc] border border-[#a855f7]/30 px-2 py-0.5 rounded-full">
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
            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <Link
                href="/guest-posting"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full h-12 rounded-full bg-black text-white border border-[#A068FF] font-bold text-sm flex items-center justify-center shadow-lg shadow-purple-950/80 hover:bg-[#A068FF] transition-colors"
              >
                <span>Join Now</span>
              </Link>
              {buyerUser ? (
                <Link
                  href="/buyer-dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full h-11 rounded-full bg-white/10 border border-white/20 text-white font-semibold text-sm flex items-center justify-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Dashboard ({buyerUser.email.split("@")[0]})</span>
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsLoginModalOpen(true);
                  }}
                  className="w-full h-11 rounded-full bg-white/5 border border-white/15 text-white font-semibold text-sm flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <span>Log In</span>
                </button>
              )}
              <Link
                href="/pay"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full h-11 rounded-full bg-white/5 border border-white/15 text-white font-semibold text-sm flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <span>Payment 💳</span>
              </Link>
            </div>
          </nav>
        )}

      {/* Global Interactive Login / Signup / Forgot Password Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={(user) => {
          setBuyerUser(user);
        }}
      />
    </>
  );
}
