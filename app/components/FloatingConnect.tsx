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

  // 9 Social & Direct Connect Platforms in 3 neat lines (3 on top, 3 in middle, 3 on bottom)
  const connectItems = [
    // Line 1: WhatsApp, Telegram, Facebook
    {
      id: "whatsapp",
      label: "WhatsApp",
      href: `https://wa.me/${whatsappNumber}?text=Hi%20Balaji%20Prime%20Media,%20I%20want%20to%20discuss%20a%20project.`,
      bg: "bg-[#25D366] hover:bg-[#20ba59] shadow-[#25D366]/40",
      action: "whatsapp" as const,
      icon: (
        <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
          <path d="M12.04 2C6.527 2 2.05 6.477 2.05 11.99c0 1.954.563 3.778 1.536 5.32L2 22l4.832-1.53c1.482.88 3.208 1.39 5.208 1.39 5.513 0 9.99-4.477 9.99-9.99C22.03 6.477 17.553 2 12.04 2zm5.432 12.382c-.301-.15-1.782-.879-2.057-.979-.276-.1-.476-.15-.676.15-.2.301-.776.979-.951 1.18-.176.2-.351.226-.652.075-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.675-2.085-.176-.3-.019-.463.132-.612.136-.134.301-.351.451-.527.151-.176.201-.301.301-.501.1-.2.05-.376-.025-.526-.075-.15-.676-1.63-.926-2.233-.244-.588-.492-.508-.676-.517l-.576-.01c-.2 0-.526.075-.802.376-.276.301-1.052 1.028-1.052 2.507 0 1.48 1.077 2.908 1.228 3.109.15.2 2.119 3.235 5.132 4.538.717.31 1.277.495 1.713.633.72.228 1.375.196 1.893.119.578-.086 1.782-.727 2.032-1.429.25-.702.25-1.303.175-1.429-.075-.125-.276-.2-.577-.35z" />
        </svg>
      ),
    },
    {
      id: "telegram",
      label: "Telegram",
      href: "https://t.me/balajiprimemedia",
      bg: "bg-[#229ED9] hover:bg-[#1d8ec4] shadow-[#229ED9]/40",
      action: "other" as const,
      icon: (
        <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
        </svg>
      ),
    },
    {
      id: "facebook",
      label: "Facebook",
      href: "https://facebook.com",
      bg: "bg-[#1877F2] hover:bg-[#1464cc] shadow-[#1877F2]/40",
      action: "other" as const,
      icon: (
        <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },

    // Line 2: Instagram, Threads, LinkedIn
    {
      id: "instagram",
      label: "Instagram",
      href: "https://instagram.com",
      bg: "bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] shadow-[#dc2743]/40",
      action: "other" as const,
      icon: (
        <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      id: "threads",
      label: "Threads",
      href: "https://threads.net",
      bg: "bg-black hover:bg-neutral-900 border border-white/20 shadow-black/40",
      action: "other" as const,
      icon: (
        <svg className="w-5 h-5 fill-white" viewBox="0 0 192 192">
          <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.8228C81.4245 64.4079 89.6582 60.7443 97.222 60.7443C97.3069 60.7443 97.3917 60.7443 97.4766 60.745C112.551 60.8413 121.579 70.9209 122.951 89.7891C115.702 88.9481 107.561 88.9841 98.4414 89.9077C68.916 92.8967 52.5447 110.155 53.4776 132.842C54.4105 155.529 72.2471 169.593 96.657 169.593C116.666 169.593 131.795 160.054 138.859 143.149C144.996 156.495 156.983 163.666 172.903 163.666C186.297 163.666 195.965 157.069 200.706 144.722L185.733 138.995C182.981 146.166 177.839 149.666 172.903 149.666C163.097 149.666 157.07 142.721 154.947 129.083C159.083 122.476 161.737 114.774 162.771 106.185L147.284 104.316C146.477 111.026 144.409 117.027 141.077 122.259C136.216 109.845 136.721 98.9207 141.537 88.9883ZM122.656 123.645C118.069 133.091 108.723 138.455 96.5508 138.455C82.8837 138.455 70.3667 131.144 69.6087 112.709C68.9567 96.8834 81.3392 84.4539 99.8821 82.5768C107.502 81.8052 114.996 82.0163 122.096 83.1812C122.695 96.4808 122.882 109.972 122.656 123.645Z"/>
        </svg>
      ),
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://linkedin.com",
      bg: "bg-[#0A66C2] hover:bg-[#084e96] shadow-[#0A66C2]/40",
      action: "other" as const,
      icon: (
        <svg className="w-4.5 h-4.5 fill-white" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z" />
        </svg>
      ),
    },

    // Line 3: X (Twitter), YouTube, Email
    {
      id: "x",
      label: "X (Twitter)",
      href: "https://x.com",
      bg: "bg-black hover:bg-neutral-900 border border-white/20 shadow-black/40",
      action: "other" as const,
      icon: (
        <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      id: "youtube",
      label: "YouTube",
      href: "https://youtube.com",
      bg: "bg-[#FF0000] hover:bg-[#cc0000] shadow-[#FF0000]/40",
      action: "other" as const,
      icon: (
        <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      id: "email",
      label: "Email",
      href: `mailto:${agencyEmail}?subject=Direct%20Inquiry%20-%20Balaji%20Prime%20Media`,
      bg: "bg-[#EA4335] hover:bg-[#d33828] shadow-[#EA4335]/40",
      action: "email" as const,
      icon: (
        <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      ),
    },
  ];

  return (
    <div
      ref={containerRef}
      className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-[9999] select-none flex flex-col items-end"
    >
      {/* =========================================================================
          CLEAN 3x3 ICONS PANEL (3 on top, 3 in middle, 3 on bottom line)
         ========================================================================= */}
      <div
        className={`mb-3 p-3 rounded-2xl bg-[#0c0624]/95 border border-purple-500/40 shadow-[0_15px_45px_rgba(0,0,0,0.85)] backdrop-blur-xl transition-all duration-300 origin-bottom-right ${
          isOpen
            ? "scale-100 opacity-100 pointer-events-auto translate-y-0"
            : "scale-90 opacity-0 pointer-events-none translate-y-4"
        }`}
      >
        {/* Subtle Header */}
        <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-white/10 px-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#A068FF] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Connect With BPM
          </span>
          <span className="text-[9.5px] text-slate-400">9 Channels</span>
        </div>

        {/* 3 Columns x 3 Rows Clean Grid */}
        <div className="grid grid-cols-3 gap-2.5">
          {connectItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              target={item.id === "email" ? undefined : "_blank"}
              rel={item.id === "email" ? undefined : "noopener noreferrer"}
              onClick={() => handleInteraction(item.action, `${item.label} Clicked`, "Floating Connect")}
              aria-label={item.label}
              className={`relative flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95 group border border-white/20 shadow-md ${item.bg}`}
            >
              {item.icon}

              {/* Tooltip on hover */}
              <span className="absolute bottom-full mb-1.5 whitespace-nowrap bg-[#070319]/95 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none border border-white/10 z-10">
                {item.label}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* =========================================================================
          LUXURY PURPLE THEMED TRIGGER BUTTON (Orange Removed Completely)
         ========================================================================= */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#7c3aed] via-[#A068FF] to-[#6366f1] text-white font-black shadow-[0_8px_30px_rgba(160,104,255,0.7)] border-2 border-white/50 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer z-50 ${
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
            className="w-6 h-6 text-white stroke-[3]"
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
