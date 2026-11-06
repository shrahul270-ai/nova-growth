"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackInteraction } from "@/lib/tracker";

export default function FloatingConnect() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Hide FloatingConnect completely on admin pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  // Agency contact details
  const whatsappNumber = "917690868932";
  const agencyEmail = "support@balajiprimemedia.in";

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleInteraction = (
    action: "whatsapp" | "email" | "other",
    title: string,
    details: string
  ) => {
    trackInteraction({ action, title, details });
  };

  const buttonBase =
    "absolute flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full transition-all duration-300 ease-out cursor-pointer hover:scale-110 active:scale-95 group z-50 shadow-2xl border-2 border-white/70";

  return (
    <div
      ref={containerRef}
      className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-[9999] select-none flex items-center justify-center"
    >
      {/* =========================================================================
          RADIAL CLOCKWISE EXPANDING CONTACT BUTTONS (Only WhatsApp, Telegram, Email)
          Arc opens in clockwise order from Left (9 o'clock) -> Top-Left (10:30) -> Top (12 o'clock)
         ========================================================================= */}

      {/* 1. WHATSAPP (Top / 12 o'clock) */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=Hi%20Balaji%20Prime%20Media,%20I%20want%20to%20discuss%20a%20project.`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          handleInteraction("whatsapp", "WhatsApp Direct Click", `+${whatsappNumber}`)
        }
        aria-label="Chat on WhatsApp"
        className={`${buttonBase} bg-[#25D366] text-white shadow-[0_8px_25px_rgba(37,211,102,0.6)]`}
        style={{
          transform: isOpen
            ? "translate(0px, -78px) scale(1)"
            : "translate(0px, 0px) scale(0)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "all 0.32s cubic-bezier(0.34, 1.56, 0.64, 1)",
          transitionDelay: isOpen ? "100ms" : "0ms",
        }}
      >
        {/* Tooltip */}
        <span className="absolute right-full mr-3 whitespace-nowrap bg-[#070319]/95 text-white text-[11px] font-bold px-3 py-1 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-white/15 backdrop-blur-md">
          WhatsApp Us
        </span>
        <svg className="w-6 h-6 fill-white drop-shadow-sm" viewBox="0 0 24 24">
          <path d="M12.04 2C6.527 2 2.05 6.477 2.05 11.99c0 1.954.563 3.778 1.536 5.32L2 22l4.832-1.53c1.482.88 3.208 1.39 5.208 1.39 5.513 0 9.99-4.477 9.99-9.99C22.03 6.477 17.553 2 12.04 2zm5.432 12.382c-.301-.15-1.782-.879-2.057-.979-.276-.1-.476-.15-.676.15-.2.301-.776.979-.951 1.18-.176.2-.351.226-.652.075-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.675-2.085-.176-.3-.019-.463.132-.612.136-.134.301-.351.451-.527.151-.176.201-.301.301-.501.1-.2.05-.376-.025-.526-.075-.15-.676-1.63-.926-2.233-.244-.588-.492-.508-.676-.517l-.576-.01c-.2 0-.526.075-.802.376-.276.301-1.052 1.028-1.052 2.507 0 1.48 1.077 2.908 1.228 3.109.15.2 2.119 3.235 5.132 4.538.717.31 1.277.495 1.713.633.72.228 1.375.196 1.893.119.578-.086 1.782-.727 2.032-1.429.25-.702.25-1.303.175-1.429-.075-.125-.276-.2-.577-.35z" />
        </svg>
      </a>

      {/* 2. TELEGRAM (Top-Left / ~10:30 o'clock) */}
      <a
        href="https://t.me/balajiprimemedia"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          handleInteraction("other", "Telegram Click", "@balajiprimemedia")
        }
        aria-label="Connect on Telegram"
        className={`${buttonBase} bg-[#229ED9] text-white shadow-[0_8px_25px_rgba(34,158,217,0.6)]`}
        style={{
          transform: isOpen
            ? "translate(-58px, -58px) scale(1)"
            : "translate(0px, 0px) scale(0)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "all 0.32s cubic-bezier(0.34, 1.56, 0.64, 1)",
          transitionDelay: isOpen ? "50ms" : "0ms",
        }}
      >
        {/* Tooltip */}
        <span className="absolute bottom-full mb-3 whitespace-nowrap bg-[#070319]/95 text-white text-[11px] font-bold px-3 py-1 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-white/15 backdrop-blur-md">
          Telegram Us
        </span>
        <svg className="w-6 h-6 fill-white drop-shadow-sm" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
        </svg>
      </a>

      {/* 3. EMAIL / MAIL (Left / 9 o'clock) */}
      <a
        href={`mailto:${agencyEmail}?subject=Direct%20Inquiry%20-%20Balaji%20Prime%20Media`}
        onClick={() =>
          handleInteraction("email", "Send Email Click", agencyEmail)
        }
        aria-label="Send Direct Email"
        className={`${buttonBase} bg-[#EA4335] text-white shadow-[0_8px_25px_rgba(234,67,53,0.6)]`}
        style={{
          transform: isOpen
            ? "translate(-78px, 0px) scale(1)"
            : "translate(0px, 0px) scale(0)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "all 0.32s cubic-bezier(0.34, 1.56, 0.64, 1)",
          transitionDelay: isOpen ? "0ms" : "0ms",
        }}
      >
        {/* Tooltip */}
        <span className="absolute right-full mr-3 whitespace-nowrap bg-[#070319]/95 text-white text-[11px] font-bold px-3 py-1 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-white/15 backdrop-blur-md">
          Send Email
        </span>
        <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-white drop-shadow-sm" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      </a>

      {/* =========================================================================
          MAIN FLOATING TRIGGER BUTTON ("⚡ CONNECT")
         ========================================================================= */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#7c3aed] via-[#A068FF] to-[#6366f1] text-white font-black shadow-[0_8px_30px_rgba(160,104,255,0.7)] border-2 border-white/60 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer z-50 ${
          !isOpen ? "animate-pulse" : ""
        }`}
        style={{
          animationDuration: "3s",
        }}
        aria-label={isOpen ? "Close contact options" : "Connect with Balaji Prime Media"}
      >
        {!isOpen && (
          <span className="absolute -inset-1 rounded-full bg-[#A068FF]/50 animate-ping -z-10" />
        )}

        {isOpen ? (
          <svg
            className="w-6 h-6 text-white stroke-[3] transition-transform duration-300 rotate-90"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <div className="flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xl drop-shadow-md">⚡</span>
            <span className="text-[9px] font-black tracking-wider uppercase text-white -mt-0.5">
              Connect
            </span>
          </div>
        )}
      </button>
    </div>
  );
}
