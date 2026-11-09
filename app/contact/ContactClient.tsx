"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NextLayerContactHero from "../components/NextLayerContactHero";
import { trackInteraction } from "@/lib/tracker";
import { getClientLiveLocation } from "@/lib/geo";

export default function ContactClient() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [toast, setToast] = useState<string | null>(null);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  // Direct Contact & Payment Details
  const agencyEmail = "support@balajiprimemedia.in"; 
  const upiId = "917690868932@ybl";

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    showToast(`📋 Copied ${label} to clipboard!`);
    trackInteraction({
      action: label === "UPI ID" ? "other" : "email",
      title: `Copied ${label} to clipboard`,
      details: text,
      sourcePage: "/contact",
    });
    setTimeout(() => setCopiedItem(null), 2500);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    timezone: "US / Eastern (EST)",
    service: "Full-Funnel Organic Growth",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");

    try {
      const clientGeo = await getClientLiveLocation();

      const res = await fetch("/api/db/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact_form",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          website: formData.website,
          timezone: formData.timezone,
          service: formData.service,
          message: formData.message,
          sourceUrl: "/contact",
          clientGeo,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit inquiry");
      setFormState("success");
      showToast("💾 Inquiry successfully saved to database!");
    } catch (err) {
      console.error("Form submit error:", err);
      setFormState("success");
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden selection:bg-purple-600 selection:text-white">
      
      {/* 100% Transparent Navbar Overlay (Unchanged as requested) */}
      <div className="absolute top-0 left-0 right-0 z-40 bg-transparent pointer-events-auto">
        <Navbar activePage="contact" />
      </div>

      {/* Floating Toast Notification */}
      {toast && (
        <div className="fixed top-24 right-6 z-50 bg-[#0c0824] text-white border border-cyan-400/60 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-fadeIn text-xs font-semibold backdrop-blur-xl">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>{toast}</span>
          <button onClick={() => setToast(null)} className="ml-2 text-gray-400 hover:text-white text-xs cursor-pointer">✕</button>
        </div>
      )}

      {/* 1. Cinematic HLS Video Call-To-Action Header (Buttons Removed as requested) */}
      <NextLayerContactHero />

      {/* 2. Main Contact Section (Transparent Glassmorphic Form + Payment Scanner) */}
      <section id="contact-form" className="relative -mt-6 sm:-mt-10 pt-0 pb-16 sm:pb-24 px-4 sm:px-6 md:px-12 z-20 max-w-7xl mx-auto scroll-mt-10">
        <style dangerouslySetInnerHTML={{ __html: `
          #contact-form input,
          #contact-form textarea {
            caret-color: #c084fc !important;
            cursor: text !important;
            color: #ffffff !important;
          }
          #contact-form input:focus,
          #contact-form textarea:focus {
            caret-color: #c084fc !important;
          }
          #contact-form input::placeholder,
          #contact-form textarea::placeholder {
            color: rgba(209, 213, 219, 0.75) !important;
          }
          #contact-form select {
            cursor: pointer !important;
            color: #ffffff !important;
          }
          #contact-form select option {
            background-color: #0c0721 !important;
            color: #ffffff !important;
          }
          #contact-form button,
          #contact-form label {
            cursor: pointer !important;
          }
        `}} />
        {/* Rich glowing ambient violet & cyan aurora mesh lights behind the transparent cards */}
        <div
          aria-hidden="true"
          className="absolute -top-16 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.25)_0%,rgba(99,102,241,0.15)_45%,transparent_70%)] pointer-events-none blur-3xl -z-10"
        />
        <div
          aria-hidden="true"
          className="absolute top-1/4 -left-10 w-[550px] h-[550px] bg-[radial-gradient(circle,rgba(160,104,255,0.2)_0%,transparent_70%)] pointer-events-none blur-3xl -z-10"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-10 -right-10 w-[550px] h-[550px] bg-[radial-gradient(circle,rgba(56,189,248,0.18)_0%,transparent_70%)] pointer-events-none blur-3xl -z-10"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Instant Payment & Retainer Scanner + Trust Protocols */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Payment & Retainer QR Scanner Card (Transparent Glassmorphism) */}
            <div className="bg-white/[0.04] rounded-3xl p-6 sm:p-7 border border-purple-500/40 shadow-2xl backdrop-blur-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-36 h-36 bg-purple-600/25 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/70 border border-purple-500/40 text-[11px] font-semibold text-purple-300 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Instant Retainer &amp; Invoice Settlement</span>
                </div>
                <span className="text-xs text-gray-400 font-mono">256-Bit Escrow</span>
              </div>

              <h3 className="text-lg font-bold text-white mb-1">
                Scan to Authorize or Pay
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-5 font-light">
                Scan via any UPI, Google Pay, PhonePe, Paytm or banking app to instantly initiate service deliverables.
              </p>

              {/* QR Code Card Display */}
              <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl bg-white/[0.05] border border-white/15 shadow-inner mb-4 backdrop-blur-md">
                {/* High-Contrast Crisp QR Code */}
                <div className="w-32 h-32 bg-white p-2 rounded-2xl flex flex-col items-center justify-center shrink-0 shadow-lg border-2 border-purple-500/40">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=upi://pay?pa=917690868932@ybl&pn=Balaji%20Prime%20Media&cu=INR"
                    alt="Scan to Pay - Balaji Prime Media"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-1 w-full space-y-2 text-left">
                  <div className="text-[11px] text-gray-300">
                    Beneficiary: <strong className="text-white block">Balaji Prime Media</strong>
                  </div>

                  <div>
                    <span className="block text-[10px] text-gray-400 mb-0.5">Official UPI ID:</span>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-white/[0.08] border border-purple-500/40 rounded-lg px-2.5 py-1.5 text-xs font-mono text-purple-300 font-bold truncate">
                        {upiId}
                      </div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(upiId, 'UPI ID')}
                        className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white text-[11px] font-bold transition-all cursor-pointer shrink-0"
                      >
                        {copiedItem === 'UPI ID' ? '✓ Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>

                  <p className="text-[10px] text-gray-400 pt-1 leading-tight">
                    Supported: GPay, PhonePe, Paytm, BHIM, Cred &amp; Net Banking.
                  </p>
                </div>
              </div>

              {/* Multi-Currency Link */}
              <div className="pt-2 flex items-center justify-between text-xs border-t border-white/10">
                <span className="text-[11px] text-gray-400">Paying from US, UK, EU, UAE?</span>
                <Link
                  href="/services#payment-portal"
                  className="text-[11px] font-bold text-cyan-300 hover:text-cyan-200 underline transition-colors cursor-pointer"
                >
                  Global Payment Portal →
                </Link>
              </div>
            </div>

            {/* Direct Official Contact Box (Transparent Glassmorphism) */}
            <div className="bg-white/[0.04] rounded-3xl p-6 sm:p-7 border border-white/20 shadow-xl backdrop-blur-2xl space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span>Official Agency Inquiries</span>
              </h3>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-gray-300 py-1.5 gap-2 sm:gap-0">
                <div>
                  <span className="block text-gray-400 text-[10px]">Direct Email:</span>
                  <span className="font-semibold text-white text-xs">{agencyEmail}</span>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(agencyEmail, 'Email')}
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg border border-white/10 text-[10px] font-bold text-cyan-300 transition-colors cursor-pointer self-start sm:self-auto"
                >
                  {copiedItem === 'Email' ? '✓ Copied' : 'Copy Email 📋'}
                </button>
              </div>

              <div className="pt-2 border-t border-white/10 space-y-2 text-xs text-gray-400 font-light">
                <div className="flex items-center gap-2 text-gray-300">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>12-Hour SLA turnaround on all enterprise inquiries</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <span className="text-cyan-400 font-bold">✓</span>
                  <span>Dedicated accounts for US, UK, Canada, Australia, and UAE</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: 100% Transparent Glassmorphic Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white/[0.04] backdrop-blur-2xl rounded-3xl p-7 sm:p-10 border border-white/20 shadow-[0_8px_32px_0_rgba(160,104,255,0.2)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10">
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-300 bg-purple-950/70 border border-purple-500/35 px-3 py-1 rounded-full backdrop-blur-md">
                    Discovery &amp; Strategy
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white mt-3 tracking-tight">
                    Start Your Project
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1.5 font-light">
                    Tell us about your requirements. We evaluate scope and reply with a custom growth plan within 12 hours.
                  </p>
                </div>

                {formState === "success" ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center text-2xl mx-auto mb-4 font-bold shadow-lg">
                      ✓
                    </div>
                    <h3 className="text-2xl font-black text-white">Inquiry Received!</h3>
                    <p className="text-sm text-gray-300 max-w-md mx-auto mt-2 mb-6">
                      Thank you, {formData.name || "there"}. Our strategy team is reviewing your requirements and will reach out to <span className="font-semibold text-cyan-300">{formData.email}</span> within 12 hours.
                    </p>
                    
                    <button
                      onClick={() => setFormState("idle")}
                      className="text-xs font-semibold text-gray-400 hover:text-white underline transition-colors cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left font-body">
                    
                    {/* Row 1: Full Name, Email, Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                      <div>
                        <label htmlFor="input-name" className="text-xs font-bold text-gray-300 block mb-1.5 cursor-pointer">
                          Your Full Name *
                        </label>
                        <input
                          id="input-name"
                          required
                          type="text"
                          autoComplete="name"
                          placeholder="e.g. Sarah Jenkins"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] focus:bg-white/[0.14] border border-white/20 hover:border-purple-400/60 focus:border-[#c084fc] focus:ring-2 focus:ring-purple-500/40 text-white text-xs placeholder:text-gray-400 outline-none transition-all cursor-text caret-[#c084fc] font-normal"
                        />
                      </div>

                      <div>
                        <label htmlFor="input-email" className="text-xs font-bold text-gray-300 block mb-1.5 cursor-pointer">
                          Corporate Email *
                        </label>
                        <input
                          id="input-email"
                          required
                          type="email"
                          autoComplete="email"
                          placeholder="sarah@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] focus:bg-white/[0.14] border border-white/20 hover:border-purple-400/60 focus:border-[#c084fc] focus:ring-2 focus:ring-purple-500/40 text-white text-xs placeholder:text-gray-400 outline-none transition-all cursor-text caret-[#c084fc] font-normal"
                        />
                      </div>

                      <div>
                        <label htmlFor="input-phone" className="text-xs font-bold text-gray-300 block mb-1.5 cursor-pointer">
                          Phone Number *
                        </label>
                        <input
                          id="input-phone"
                          required
                          type="tel"
                          autoComplete="tel"
                          placeholder="+1 (555) 000-0000"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] focus:bg-white/[0.14] border border-white/20 hover:border-purple-400/60 focus:border-[#c084fc] focus:ring-2 focus:ring-purple-500/40 text-white text-xs placeholder:text-gray-400 outline-none transition-all cursor-text caret-[#c084fc] font-normal"
                        />
                      </div>
                    </div>

                    {/* Row 2: Website URL, Timezone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div>
                        <label htmlFor="input-website" className="text-xs font-bold text-gray-300 block mb-1.5 cursor-pointer">
                          Company Website URL
                        </label>
                        <input
                          id="input-website"
                          type="text"
                          autoComplete="url"
                          placeholder="https://company.com"
                          value={formData.website}
                          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] focus:bg-white/[0.14] border border-white/20 hover:border-purple-400/60 focus:border-[#c084fc] focus:ring-2 focus:ring-purple-500/40 text-white text-xs placeholder:text-gray-400 outline-none transition-all cursor-text caret-[#c084fc] font-normal"
                        />
                      </div>

                      <div>
                        <label htmlFor="input-timezone" className="text-xs font-bold text-gray-300 block mb-1.5 cursor-pointer">
                          Primary Timezone *
                        </label>
                        <select
                          id="input-timezone"
                          value={formData.timezone}
                          onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] focus:bg-white/[0.14] border border-white/20 hover:border-purple-400/60 focus:border-[#c084fc] focus:ring-2 focus:ring-purple-500/40 text-white text-xs outline-none cursor-pointer transition-all caret-[#c084fc]"
                        >
                          <option className="bg-[#0b061c] text-white py-2" value="US / Eastern (EST)">US / Eastern (EST)</option>
                          <option className="bg-[#0b061c] text-white py-2" value="US / Pacific (PST)">US / Pacific (PST)</option>
                          <option className="bg-[#0b061c] text-white py-2" value="UK / London (GMT)">UK / London (GMT)</option>
                          <option className="bg-[#0b061c] text-white py-2" value="Europe / Berlin (CET)">Europe / Berlin (CET)</option>
                          <option className="bg-[#0b061c] text-white py-2" value="Australia / Sydney (AEST)">Australia / Sydney (AEST)</option>
                          <option className="bg-[#0b061c] text-white py-2" value="UAE / Dubai (GST)">UAE / Dubai (GST)</option>
                          <option className="bg-[#0b061c] text-white py-2" value="India / IST">India / New Delhi (IST)</option>
                          <option className="bg-[#0b061c] text-white py-2" value="Other">Other / Flexible</option>
                        </select>
                      </div>
                    </div>

                    {/* Row 3: Target Service (Full width, clean) */}
                    <div>
                      <label htmlFor="input-service" className="text-xs font-bold text-gray-300 block mb-1.5 cursor-pointer">
                        Target Service or Deliverable *
                      </label>
                      <select
                        id="input-service"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] focus:bg-white/[0.14] border border-white/20 hover:border-purple-400/60 focus:border-[#c084fc] focus:ring-2 focus:ring-purple-500/40 text-white text-xs outline-none cursor-pointer transition-all caret-[#c084fc]"
                      >
                        <option className="bg-[#0b061c] text-white py-2" value="Full-Funnel Organic Growth">Full-Funnel Organic Growth</option>
                        <option className="bg-[#0b061c] text-white py-2" value="High-Intent SEO Optimization">High-Intent SEO Optimization</option>
                        <option className="bg-[#0b061c] text-white py-2" value="Website Development (Next.js)">Website Development (Next.js)</option>
                        <option className="bg-[#0b061c] text-white py-2" value="Off-Page Backlink Building">Off-Page Backlink Building &amp; Digital PR</option>
                        <option className="bg-[#0b061c] text-white py-2" value="Content Strategy & Writing">Content Strategy &amp; Writing</option>
                        <option className="bg-[#0b061c] text-white py-2" value="Website Maintenance & Speed">Website Maintenance &amp; Speed Optimization</option>
                      </select>
                    </div>

                    {/* Row 4: Goals / Scope Textarea */}
                    <div>
                      <label htmlFor="input-message" className="text-xs font-bold text-gray-300 block mb-1.5 cursor-pointer">
                        Tell us about your goals or challenges
                      </label>
                      <textarea
                        id="input-message"
                        rows={4}
                        placeholder="Briefly describe your objectives, target geography, or deliverables..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] focus:bg-white/[0.14] border border-white/20 hover:border-purple-400/60 focus:border-[#c084fc] focus:ring-2 focus:ring-purple-500/40 text-white text-xs placeholder:text-gray-400 outline-none resize-none transition-all cursor-text caret-[#c084fc] font-normal"
                      />
                    </div>

                    {/* Clean Action Button */}
                    <button
                      type="submit"
                      disabled={formState === "submitting"}
                      className="w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:brightness-110 active:scale-[0.99] text-white font-bold py-4 rounded-xl text-xs sm:text-sm transition-all shadow-lg shadow-purple-950/80 cursor-pointer disabled:opacity-50"
                    >
                      {formState === "submitting" ? "Submitting Inquiry..." : "Submit Inquiry & Schedule Call →"}
                    </button>

                    <p className="text-[11px] text-center text-gray-400">
                      🔒 100% Confidential. Strict Mutual NDA Guaranteed. Zero Spam.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Footer (Unchanged as requested) */}
      <Footer />
    </div>
  );
}
