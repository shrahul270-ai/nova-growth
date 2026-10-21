"use client";

import React, { useState } from "react";
import { trackInteraction } from "@/lib/tracker";

export default function FloatingConnect() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"menu" | "whatsapp_form" | "call_form">("menu");

  // Lead inputs
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientTopic, setClientTopic] = useState("High-Intent SEO Growth");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Agency contact details
  const whatsappNumber = "919694953370";
  const agencyEmail = "shrahul270@gmail.com";
  const meetOrCalendlyUrl = "https://calendly.com";

  const handleStartWhatsApp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientPhone.trim() && !clientName.trim()) return;

    setIsSubmitting(true);
    try {
      // 1. Save full client details to Leads database
      await fetch("/api/db/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "whatsapp_click",
          name: clientName || "WhatsApp Inquirer",
          phone: clientPhone,
          email: clientEmail,
          service: clientTopic,
          sourceUrl: typeof window !== "undefined" ? window.location.pathname : "/",
          message: `Client initiated WhatsApp chat regarding ${clientTopic}. Phone: ${clientPhone}`,
        }),
      });

      // 2. Save to Interactions database
      trackInteraction({
        action: "whatsapp",
        title: `WhatsApp Inquiry from ${clientName || clientPhone}`,
        clientIdentifier: clientPhone || clientEmail,
        details: `Client: ${clientName || "Anonymous"} | Phone: ${clientPhone} | Email: ${clientEmail || "N/A"}`,
      });
    } catch (err) {
      console.warn("Could not save WhatsApp lead:", err);
    }

    setIsSubmitting(false);
    setIsOpen(false);
    setMode("menu");

    // 3. Open WhatsApp with customized pre-filled message
    const msg = `Hi Nova Growth team, my name is ${encodeURIComponent(clientName || "there")}. I'm interested in ${encodeURIComponent(clientTopic)}. My Phone is ${encodeURIComponent(clientPhone)}${clientEmail ? `, Email: ${encodeURIComponent(clientEmail)}` : ""}.`;
    window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, "_blank");
  };

  const handleStartDirectWhatsApp = () => {
    trackInteraction({
      action: "whatsapp",
      title: "Direct WhatsApp Clicked (Skipped Form)",
      details: `WhatsApp Number: +${whatsappNumber}`,
    });
    setIsOpen(false);
    window.open(`https://wa.me/${whatsappNumber}?text=Hi%20Nova%20Growth,%20I%20want%20to%20discuss%20a%20project.`, "_blank");
  };

  const handleStartCall = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch("/api/db/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "video_call_click",
          name: clientName || "Strategy Call Inquirer",
          phone: clientPhone,
          email: clientEmail,
          service: clientTopic,
          sourceUrl: typeof window !== "undefined" ? window.location.pathname : "/",
          message: `Video call booking initiated for ${clientTopic}. Phone: ${clientPhone}`,
        }),
      });

      trackInteraction({
        action: "video_call",
        title: `Video Call Booking from ${clientName || clientPhone}`,
        clientIdentifier: clientPhone || clientEmail,
        details: `Client: ${clientName} | Phone: ${clientPhone} | Email: ${clientEmail}`,
        targetUrl: meetOrCalendlyUrl,
      });
    } catch {}

    setIsSubmitting(false);
    setIsOpen(false);
    setMode("menu");
    window.open(meetOrCalendlyUrl, "_blank");
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end select-none">
      {/* Pop-up Modal */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-2rem)] sm:w-88 max-w-sm bg-[#091427]/98 backdrop-blur-xl border border-amber-500/40 rounded-3xl p-4 sm:p-5 shadow-2xl shadow-black/90 animate-in fade-in slide-in-from-bottom-5 duration-300 text-white">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-gray-800">
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {mode === "menu" ? "Direct Concierge" : mode === "whatsapp_form" ? "WhatsApp Connect" : "Book Video Call"}
              </h4>
              <p className="text-[10px] text-gray-400">
                {mode === "menu" ? "Instant access to Nova Growth strategists" : "Share contact details to connect instantly"}
              </p>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                setMode("menu");
              }}
              className="text-gray-400 hover:text-white text-xs bg-gray-800/60 hover:bg-gray-800 w-6 h-6 rounded-full flex items-center justify-center transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* MODE 1: MAIN MENU */}
          {mode === "menu" && (
            <div className="flex flex-col gap-2.5 mt-4">
              {/* 1. WhatsApp Button (Opens contact capture) */}
              <button
                type="button"
                onClick={() => setMode("whatsapp_form")}
                className="group flex items-center justify-between p-3 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 hover:border-emerald-500/50 transition-all text-xs font-semibold text-emerald-400 text-left cursor-pointer w-full"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl group-hover:scale-110 transition-transform">💬</span>
                  <div className="text-left">
                    <div className="text-white text-xs font-bold">Chat on WhatsApp</div>
                    <div className="text-[10px] text-emerald-400/80">Instant reply under 5 mins</div>
                  </div>
                </div>
                <span className="text-xs group-hover:translate-x-1 transition-transform">→</span>
              </button>

              {/* 2. Video Calling / Strategy Session */}
              <button
                type="button"
                onClick={() => setMode("call_form")}
                className="group flex items-center justify-between p-3 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 hover:border-amber-500/50 transition-all text-xs font-semibold text-amber-400 text-left cursor-pointer w-full"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl group-hover:scale-110 transition-transform">📹</span>
                  <div className="text-left">
                    <div className="text-white text-xs font-bold">Book Video Call</div>
                    <div className="text-[10px] text-amber-400/80">15-Min Google Meet / Zoom</div>
                  </div>
                </div>
                <span className="text-xs group-hover:translate-x-1 transition-transform">→</span>
              </button>

              {/* 3. Direct Email */}
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(agencyEmail)}&su=${encodeURIComponent("Direct Agency Inquiry - Nova Growth")}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackInteraction({
                    action: "email",
                    title: "Floating Concierge Direct Email Clicked",
                    details: agencyEmail,
                  });
                }}
                className="group flex items-center justify-between p-3 rounded-2xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 hover:border-blue-500/50 transition-all text-xs font-semibold text-blue-400 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl group-hover:scale-110 transition-transform">✉️</span>
                  <div className="text-left">
                    <div className="text-white text-xs font-bold">Send Quick Email</div>
                    <div className="text-[10px] text-blue-400/80">Official Inquiry Desk</div>
                  </div>
                </div>
                <span className="text-xs group-hover:translate-x-1 transition-transform">→</span>
              </a>

              <div className="mt-2 text-center text-[10px] text-gray-500">
                ⚡ 100% Confidential • Time-Zone Aligned
              </div>
            </div>
          )}

          {/* MODE 2: WHATSAPP QUICK LEAD CAPTURE FORM */}
          {mode === "whatsapp_form" && (
            <form onSubmit={handleStartWhatsApp} className="mt-4 flex flex-col gap-3 text-left">
              <div>
                <label className="text-[11px] font-bold text-gray-300 block mb-1">Your Full Name *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-xl text-base sm:text-xs text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-300 block mb-1">Your WhatsApp / Phone Number *</label>
                <input
                  required
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-xl text-base sm:text-xs text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-300 block mb-1">Gmail / Email Address (Optional)</label>
                <input
                  type="email"
                  placeholder="name@gmail.com"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-xl text-base sm:text-xs text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-300 block mb-1">Service Needed</label>
                <select
                  value={clientTopic}
                  onChange={(e) => setClientTopic(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-xl text-base sm:text-xs text-white outline-none focus:border-amber-400"
                >
                  <option value="High-Intent SEO Growth">High-Intent SEO Growth</option>
                  <option value="Next.js Website Development">Next.js Website Development</option>
                  <option value="DR 50+ Editorial Guest Posts">DR 50+ Editorial Guest Posts</option>
                  <option value="Website Maintenance & Speed">Website Maintenance & Speed</option>
                  <option value="Custom Project Scope">Custom Project Scope</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-2.5 rounded-xl text-xs transition-all shadow-md shadow-emerald-600/30 cursor-pointer flex items-center justify-center gap-2 mt-1"
              >
                <span>💬 Start WhatsApp Chat Now →</span>
              </button>

              <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1">
                <button
                  type="button"
                  onClick={() => setMode("menu")}
                  className="hover:text-white underline cursor-pointer"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={handleStartDirectWhatsApp}
                  className="text-amber-400 hover:underline cursor-pointer"
                >
                  Skip &amp; Open WhatsApp directly →
                </button>
              </div>
            </form>
          )}

          {/* MODE 3: VIDEO CALL QUICK LEAD CAPTURE FORM */}
          {mode === "call_form" && (
            <form onSubmit={handleStartCall} className="mt-4 flex flex-col gap-3 text-left">
              <div>
                <label className="text-[11px] font-bold text-gray-300 block mb-1">Your Full Name *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Sarah Vance"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-xl text-base sm:text-xs text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-300 block mb-1">Your Corporate / Gmail Address *</label>
                <input
                  required
                  type="email"
                  placeholder="sarah@company.com"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-xl text-base sm:text-xs text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-300 block mb-1">Phone / WhatsApp Number *</label>
                <input
                  required
                  type="tel"
                  placeholder="+1 (555) 0192"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-xl text-base sm:text-xs text-white outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-500 hover:bg-amber-400 text-black font-extrabold py-2.5 rounded-xl text-xs transition-all shadow-md shadow-amber-500/20 cursor-pointer flex items-center justify-center gap-2 mt-1"
              >
                <span>📅 Schedule Video Session →</span>
              </button>

              <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1">
                <button
                  type="button"
                  onClick={() => setMode("menu")}
                  className="hover:text-white underline cursor-pointer"
                >
                  ← Back
                </button>
                <a
                  href={meetOrCalendlyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-amber-400 hover:underline cursor-pointer"
                >
                  Skip &amp; Open Calendar directly →
                </a>
              </div>
            </form>
          )}

        </div>
      )}

      {/* 3D Floating Action Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (isOpen) setMode("menu");
        }}
        className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 text-[#091427] font-black shadow-[0_10px_25px_rgba(245,158,11,0.45)] border-2 border-white/40 hover:scale-110 active:scale-95 transition-all duration-300 animate-bounce cursor-pointer"
        style={{
          animationDuration: "3s",
        }}
        aria-label="Contact Concierge"
      >
        <span className="absolute -inset-1 rounded-full bg-amber-400/40 animate-ping -z-10" />

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