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
    action: "whatsapp" | "video_call" | "phone" | "email" | "download" | "login" | "other",
    title: string,
    details: string
  ) => {
    trackInteraction({ action, title, details });
  };

  const buttonBase =
    "absolute flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full transition-all duration-300 ease-out cursor-pointer hover:scale-115 active:scale-95 group z-50 border-2 border-white/70 shadow-lg";

  return (
    <div
      ref={containerRef}
      className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-[9999] select-none flex items-center justify-center"
    >
      {/* 1. WhatsApp (Vertical Inner) */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=Hi%20Balaji%20Prime%20Media,%20I%20want%20to%20discuss%20a%20project.`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => handleInteraction("whatsapp", "Direct WhatsApp Clicked", `+${whatsappNumber}`)}
        aria-label="Chat on WhatsApp"
        className={`${buttonBase} bg-[#25D366] text-white shadow-[#25D366]/40`}
        style={{
          transform: isOpen ? "translate(0px, -70px) scale(1)" : "translate(0px, 0px) scale(0)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1) 0ms",
        }}
      >
        <span className="absolute right-full mr-2.5 whitespace-nowrap bg-[#091427]/95 text-white text-[10.5px] font-bold px-2 py-0.5 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-white/10">
          WhatsApp Us
        </span>
        <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      </a>

      {/* 2. Instagram (Vertical Outer) */}
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => handleInteraction("other", "Instagram Clicked", "Footer Connect Widget")}
        aria-label="Instagram"
        className={`${buttonBase} text-white shadow-[#dc2743]/40 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]`}
        style={{
          transform: isOpen ? "translate(0px, -134px) scale(1)" : "translate(0px, 0px) scale(0)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1) 30ms",
        }}
      >
        <span className="absolute right-full mr-2.5 whitespace-nowrap bg-[#091427]/95 text-white text-[10.5px] font-bold px-2 py-0.5 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-white/10">
          Instagram
        </span>
        <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      </a>

      {/* 3. Direct Phone Call (Upper Diagonal) */}
      <a
        href={`tel:+${whatsappNumber}`}
        onClick={() => handleInteraction("phone", "Direct Call Clicked", `+${whatsappNumber}`)}
        aria-label="Direct Phone Call"
        className={`${buttonBase} bg-[#0284c7] text-white shadow-[#0284c7]/40`}
        style={{
          transform: isOpen ? "translate(-50px, -116px) scale(1)" : "translate(0px, 0px) scale(0)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1) 50ms",
        }}
      >
        <span className="absolute right-full mr-2.5 whitespace-nowrap bg-[#091427]/95 text-white text-[10.5px] font-bold px-2 py-0.5 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-white/10">
          Call (+91 76908 68932)
        </span>
        <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
          <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
        </svg>
      </a>

      {/* 4. LinkedIn (Diagonal Inner) */}
      <a
        href="https://linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => handleInteraction("other", "LinkedIn Clicked", "Footer Connect Widget")}
        aria-label="LinkedIn"
        className={`${buttonBase} bg-[#0A66C2] text-white shadow-[#0A66C2]/40`}
        style={{
          transform: isOpen ? "translate(-52px, -52px) scale(1)" : "translate(0px, 0px) scale(0)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1) 70ms",
        }}
      >
        <span className="absolute right-full mr-2.5 whitespace-nowrap bg-[#091427]/95 text-white text-[10.5px] font-bold px-2 py-0.5 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-white/10">
          LinkedIn
        </span>
        <svg className="w-4.5 h-4.5 fill-white" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z" />
        </svg>
      </a>

      {/* 5. X / Twitter (Diagonal Outer) */}
      <a
        href="https://x.com"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => handleInteraction("other", "X Twitter Clicked", "Footer Connect Widget")}
        aria-label="X Twitter"
        className={`${buttonBase} bg-black text-white shadow-black/50 border-white/40`}
        style={{
          transform: isOpen ? "translate(-100px, -100px) scale(1)" : "translate(0px, 0px) scale(0)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1) 90ms",
        }}
      >
        <span className="absolute right-full mr-2.5 whitespace-nowrap bg-[#091427]/95 text-white text-[10.5px] font-bold px-2 py-0.5 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-white/10">
          X (Twitter)
        </span>
        <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>

      {/* 6. YouTube (Lower Diagonal) */}
      <a
        href="https://youtube.com"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => handleInteraction("other", "YouTube Clicked", "Footer Connect Widget")}
        aria-label="YouTube"
        className={`${buttonBase} bg-[#FF0000] text-white shadow-[#FF0000]/40`}
        style={{
          transform: isOpen ? "translate(-116px, -50px) scale(1)" : "translate(0px, 0px) scale(0)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1) 110ms",
        }}
      >
        <span className="absolute right-full mr-2.5 whitespace-nowrap bg-[#091427]/95 text-white text-[10.5px] font-bold px-2 py-0.5 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-white/10">
          YouTube
        </span>
        <svg className="w-4.5 h-4.5 fill-white" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      </a>

      {/* 7. Send Quick Email (Horizontal Inner) */}
      <a
        href={`mailto:${agencyEmail}?subject=Direct%20Inquiry%20-%20Balaji%20Prime%20Media`}
        onClick={() => handleInteraction("email", "Send Quick Email Clicked", agencyEmail)}
        aria-label="Send Quick Email"
        className={`${buttonBase} bg-[#EA4335] text-white shadow-[#EA4335]/40`}
        style={{
          transform: isOpen ? "translate(-70px, 0px) scale(1)" : "translate(0px, 0px) scale(0)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1) 130ms",
        }}
      >
        <span className="absolute bottom-full mb-2.5 whitespace-nowrap bg-[#091427]/95 text-white text-[10.5px] font-bold px-2 py-0.5 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-white/10">
          Send Email
        </span>
        <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      </a>

      {/* 3D Floating Action "Connect" / Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 text-[#091427] font-black shadow-[0_8px_26px_rgba(245,158,11,0.5)] border-2 border-white/70 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer z-50 ${
          !isOpen ? "animate-bounce" : ""
        }`}
        style={{
          animationDuration: "3s",
        }}
        aria-label={isOpen ? "Close contact options" : "Contact Concierge"}
      >
        {!isOpen && (
          <span className="absolute -inset-1 rounded-full bg-amber-400/40 animate-ping -z-10" />
        )}

        {isOpen ? (
          <svg
            className="w-6 h-6 text-[#091427] stroke-[3]"
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
            <span className="text-[9px] font-black tracking-wider uppercase text-[#091427] -mt-0.5">
              Connect
            </span>
          </div>
        )}
      </button>
    </div>
  );
}
