"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Action Menu popup */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-3xl shadow-2xl border border-[#d97706]/30 p-5 animate-fadeIn text-left">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-[#091427] text-[#d97706] border border-[#d97706]/40 flex items-center justify-center font-bold text-xs">
                  NG
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#d97706] border-2 border-white" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#091427] block">Nova Growth Team</span>
                <span className="text-[10px] text-[#d97706] font-semibold">● Online for Global Clients</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 text-sm font-bold p-1 cursor-pointer"
            >
              ✕
            </button>
          </div>

          <p className="text-xs text-[#54647c] leading-relaxed mb-4">
            Hi! Need quick answers or a custom quote for your website or SEO campaign?
          </p>

          <div className="flex flex-col gap-2">
            {/* WhatsApp direct chat */}
            <a
              href="https://wa.me/18005556682?text=Hi%20Nova%20Growth%20team,%20I%20would%20like%20to%20discuss%20a%20digital%20marketing%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2.5 rounded-2xl bg-amber-50 hover:bg-amber-100/80 transition-colors border border-amber-200/80 text-xs font-semibold text-[#091427]"
            >
              <span className="text-lg">💬</span>
              <div className="flex flex-col">
                <span className="font-bold">Chat on WhatsApp</span>
                <span className="text-[10px] text-[#d97706] font-medium">Instant reply (under 5 mins)</span>
              </div>
            </a>

            {/* Book Zoom Call */}
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors border border-gray-200/80 text-xs font-semibold text-[#091427]"
            >
              <span className="text-lg">📅</span>
              <div className="flex flex-col">
                <span className="font-bold">Book 15-Min Strategy Call</span>
                <span className="text-[10px] text-gray-500 font-normal">Time-zone aligned (Zoom / Meet)</span>
              </div>
            </Link>

            {/* Quick Email Inquiry */}
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors border border-gray-200/80 text-xs font-semibold text-[#091427]"
            >
              <span className="text-lg">✉️</span>
              <div className="flex flex-col">
                <span className="font-bold">Send Detailed Scope</span>
                <span className="text-[10px] text-gray-500 font-normal">Receive proposal within 12 hours</span>
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* Floating Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 bg-[#091427] hover:bg-[#0f213d] text-white border border-[#d97706]/60 px-5 py-3.5 rounded-full shadow-2xl shadow-[#091427]/40 transition-all hover:scale-105 cursor-pointer font-bold text-xs"
        aria-label="Open support options"
      >
        <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-ping" />
        <span>Talk to an Expert</span>
        <svg className="w-4 h-4 ml-0.5 text-[#f59e0b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>
    </div>
  );
}
