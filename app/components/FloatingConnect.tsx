"use client";

import React, { useState } from "react";

export default function FloatingConnect() {
  const [isOpen, setIsOpen] = useState(false);

  // Aapki contact details
  const whatsappNumber = "919694953370"; // Country code ke saath bina '+' ke
  const agencyEmail = "shrahul270@gmail.com";
  const meetOrCalendlyUrl = "https://calendly.com"; // Ya Google Meet link

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end select-none">
      {/* Pop-up Modal / Menu */}
      {isOpen && (
        <div className="mb-4 w-72 sm:w-80 bg-[#091427]/95 backdrop-blur-xl border border-amber-500/30 rounded-3xl p-5 shadow-2xl shadow-black/80 animate-in fade-in slide-in-from-bottom-5 duration-300 text-white">
          <div className="flex items-center justify-between pb-3 border-b border-gray-800">
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Direct Concierge
              </h4>
              <p className="text-[10px] text-gray-400">Instant access to Nova Growth team</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white text-xs bg-gray-800/60 hover:bg-gray-800 w-6 h-6 rounded-full flex items-center justify-center transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col gap-2.5 mt-4">
            {/* 1. WhatsApp Button */}
            <a
              href={`https://wa.me/${whatsappNumber}?text=Hi%20Nova%20Growth,%20I%20want%20to%20discuss%20a%20project.`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-3 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 hover:border-emerald-500/50 transition-all text-xs font-semibold text-emerald-400"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg group-hover:scale-110 transition-transform">💬</span>
                <div className="text-left">
                  <div className="text-white text-xs font-bold">Chat on WhatsApp</div>
                  <div className="text-[10px] text-emerald-400/80">Average reply: 5 mins</div>
                </div>
              </div>
              <span className="text-xs group-hover:translate-x-1 transition-transform">→</span>
            </a>

            {/* 2. Video Calling / Strategy Session */}
            <a
              href={meetOrCalendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-3 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 hover:border-amber-500/50 transition-all text-xs font-semibold text-amber-400"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg group-hover:scale-110 transition-transform">📹</span>
                <div className="text-left">
                  <div className="text-white text-xs font-bold">Book Video Call</div>
                  <div className="text-[10px] text-amber-400/80">15-Min Google Meet / Zoom</div>
                </div>
              </div>
              <span className="text-xs group-hover:translate-x-1 transition-transform">→</span>
            </a>

            {/* 3. Direct Email */}
            <a
              href={`mailto:${agencyEmail}`}
              className="group flex items-center justify-between p-3 rounded-2xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 hover:border-blue-500/50 transition-all text-xs font-semibold text-blue-400"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg group-hover:scale-110 transition-transform">✉️</span>
                <div className="text-left">
                  <div className="text-white text-xs font-bold">Send Quick Email</div>
                  <div className="text-[10px] text-blue-400/80">Official Inquiry Desk</div>
                </div>
              </div>
              <span className="text-xs group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>

          <div className="mt-3 text-center text-[10px] text-gray-500">
            ⚡ 100% Confidential • Time-Zone Aligned
          </div>
        </div>
      )}

      {/* 3D Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 text-[#091427] font-black shadow-[0_10px_25px_rgba(245,158,11,0.45)] border-2 border-white/40 hover:scale-110 active:scale-95 transition-all duration-300 animate-bounce cursor-pointer"
        style={{
          animationDuration: "3s",
        }}
        aria-label="Contact Concierge"
      >
        {/* Glow Ping Ring */}
        <span className="absolute -inset-1 rounded-full bg-amber-400/40 animate-ping -z-10" />

        {/* 3D Depth Icon / State Indicator */}
        {isOpen ? (
          <span className="text-xl font-black">✕</span>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <span className="text-xl drop-shadow-md">⚡</span>
            <span className="text-[9px] font-extrabold tracking-tighter uppercase -mt-0.5">Connect</span>
          </div>
        )}
      </button>
    </div>
  );
}