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

  const handleWhatsAppClick = () => {
    trackInteraction({
      action: "whatsapp",
      title: "Direct WhatsApp Clicked",
      details: `WhatsApp Number: +${whatsappNumber}`,
    });
  };

  const handleEmailClick = () => {
    trackInteraction({
      action: "email",
      title: "Send Quick Email Clicked",
      details: agencyEmail,
    });
  };

  const buttonBase =
    "absolute flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full transition-all duration-300 ease-out cursor-pointer hover:scale-110 active:scale-95 group z-50";

  return (
    <div
      ref={containerRef}
      className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-[9999] select-none flex items-center justify-center"
    >
      {/* 1. WhatsApp Button (Top) */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=Hi%20Balaji%20Prime%20Media,%20I%20want%20to%20discuss%20a%20project.`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleWhatsAppClick}
        aria-label="Chat on WhatsApp"
        className={`${buttonBase} bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.5)] border-2 border-white/60`}
        style={{
          transform: isOpen
            ? "translate(0px, -70px) scale(1)"
            : "translate(0px, 0px) scale(0)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Tooltip */}
        <span className="absolute right-full mr-3 whitespace-nowrap bg-[#091427]/95 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-white/10">
          WhatsApp Us
        </span>
        <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      </a>

      {/* 2. Send Quick Email Button (Left) */}
      <a
        href={`mailto:${agencyEmail}?subject=Direct%20Inquiry%20-%20Balaji%20Prime%20Media`}
        onClick={handleEmailClick}
        aria-label="Send Quick Email"
        className={`${buttonBase} bg-[#EA4335] text-white shadow-[0_8px_24px_rgba(234,67,53,0.5)] border-2 border-white/60`}
        style={{
          transform: isOpen
            ? "translate(-70px, 0px) scale(1)"
            : "translate(0px, 0px) scale(0)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Tooltip */}
        <span className="absolute bottom-full mb-3 whitespace-nowrap bg-[#091427]/95 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-white/10">
          Send Quick Email
        </span>
        <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-white" viewBox="0 0 24 24">
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
