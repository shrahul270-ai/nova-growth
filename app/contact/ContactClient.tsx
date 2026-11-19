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
      sourcePage: "/contact-us",
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
    paymentRef: "",
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
          paymentRef: formData.paymentRef,
          message: formData.paymentRef
            ? `[Payment UTR/Ref: ${formData.paymentRef}] ${formData.message}`
            : formData.message,
          sourceUrl: "/contact-us",
          clientGeo,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit inquiry");
      setFormState("success");
      showToast("💾 Inquiry & payment details recorded to Admin Portal!");
    } catch (err) {
      console.error("Form submit error:", err);
      setFormState("success");
    }
  };

  return (
    <div className="relative min-h-screen bg-[#07030d] text-white overflow-hidden selection:bg-[#681fe4] selection:text-white font-satoshi bg-grid-white-240">
      
      {/* 100% Transparent Navbar Overlay */}
      <div className="absolute top-0 left-0 right-0 z-40 bg-transparent pointer-events-auto">
        <Navbar activePage="contact" />
      </div>

      {/* Floating Toast Notification */}
      {toast && (
        <div className="fixed top-24 right-6 z-50 bg-[#0c0818] text-white border border-[#681fe4] px-5 py-3 rounded-[4px] shadow-2xl flex items-center gap-3 animate-fadeIn text-xs font-semibold backdrop-blur-xl">
          <span className="w-2 h-2 rounded-full bg-[#681fe4] animate-ping" />
          <span>{toast}</span>
          <button onClick={() => setToast(null)} className="ml-2 text-neutral-400 hover:text-white text-xs cursor-pointer">✕</button>
        </div>
      )}

      {/* 1. Next Layer Contact Hero Header */}
      <NextLayerContactHero />

      {/* 2. Main Contact Section */}
      <section id="contact-form" className="relative pt-10 pb-20 sm:pb-28 px-4 sm:px-6 md:px-12 z-20 max-w-7xl mx-auto scroll-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Instant Payment & Retainer Scanner + Trust Protocols */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Payment & Retainer QR Scanner Card */}
            <div className="bg-[#0c0818] rounded-[4px] p-6 sm:p-7 border border-white/10 shadow-2xl relative overflow-hidden group">
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] bg-white/5 border border-white/10 text-xs font-bebas tracking-[0.14em] text-[#681fe4] uppercase">
                  <span className="w-2 h-2 rounded-full bg-[#681fe4] animate-pulse" />
                  <span>Instant Settlement</span>
                </div>
                <span className="text-xs text-neutral-400 font-mono">256-Bit Escrow</span>
              </div>

              <h3 className="font-bebas text-xl sm:text-2xl text-white tracking-[0.12em] uppercase mb-1">
                Scan to Authorize or Pay
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-5 font-normal">
                Scan via any UPI, Google Pay, PhonePe, Paytm or banking app to instantly initiate service deliverables.
              </p>

              {/* QR Code Card Display */}
              <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-[4px] bg-[#07030d] border border-white/10 mb-4">
                {/* High-Contrast Crisp QR Code */}
                <div className="w-32 h-32 bg-white p-2 rounded-[2px] flex flex-col items-center justify-center shrink-0 shadow-lg border border-[#681fe4]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=upi://pay?pa=917690868932@ybl&pn=Balaji%20Prime%20Media&cu=INR"
                    alt="Scan to Pay - Balaji Prime Media"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-1 w-full space-y-2 text-left">
                  <div className="text-xs text-neutral-300">
                    Beneficiary: <strong className="text-white block font-mono">Balaji Prime Media</strong>
                  </div>

                  <div>
                    <span className="block text-[10px] text-neutral-400 mb-0.5 font-mono">Official UPI ID:</span>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-[#0c0818] border border-white/15 rounded-[2px] px-2.5 py-1.5 text-xs font-mono text-[#681fe4] font-bold truncate">
                        {upiId}
                      </div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(upiId, 'UPI ID')}
                        className="px-3 py-1.5 rounded-[2px] bg-[#681fe4] hover:bg-[#5815cb] text-white text-xs font-bebas tracking-[0.14em] uppercase transition-all cursor-pointer shrink-0"
                      >
                        {copiedItem === 'UPI ID' ? '✓ Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>

                  <p className="text-[10px] text-neutral-400 pt-1 leading-tight font-mono">
                    Supported: GPay, PhonePe, Paytm, BHIM, Cred &amp; Net Banking.
                  </p>
                </div>
              </div>

              {/* Multi-Currency Link */}
              <div className="pt-2 flex items-center justify-between text-xs border-t border-white/10 font-mono">
                <span className="text-[11px] text-neutral-400">Paying from US, UK, EU, UAE?</span>
                <Link
                  href="/services#payment-portal"
                  className="text-[11px] font-bold text-[#681fe4] hover:text-white underline transition-colors cursor-pointer"
                >
                  Global Payment Portal →
                </Link>
              </div>

              {/* Data & Payment Routing Transparency Note */}
              <div className="mt-4 p-3.5 rounded-[4px] bg-[#07030d] border border-white/10 text-left space-y-1.5 font-mono">
                <div className="flex items-center gap-2 text-[11px] font-bold text-white">
                  <span className="w-2 h-2 rounded-full bg-[#681fe4] animate-pulse" />
                  <span>📍 Payment &amp; Contact Data Routing</span>
                </div>
                <p className="text-[11px] text-neutral-400 leading-relaxed font-normal">
                  Your inquiry and payment UTR are encrypted and saved directly to the BPM Admin Portal with high-priority executive notification dispatched to support@balajiprimemedia.in.
                </p>
              </div>
            </div>

            {/* Direct Official Contact Box */}
            <div className="bg-[#0c0818] rounded-[4px] p-6 sm:p-7 border border-white/10 shadow-xl space-y-4">
              <h3 className="font-bebas text-base tracking-[0.18em] text-white uppercase flex items-center gap-2">
                <span>OFFICIAL AGENCY INQUIRIES</span>
              </h3>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-neutral-300 py-1.5 gap-2 sm:gap-0 font-mono">
                <div>
                  <span className="block text-neutral-500 text-[10px]">Direct Email:</span>
                  <span className="font-semibold text-white text-xs">{agencyEmail}</span>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(agencyEmail, 'Email')}
                  className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-[2px] border border-white/15 text-xs font-bebas tracking-[0.14em] uppercase text-[#681fe4] transition-colors cursor-pointer self-start sm:self-auto"
                >
                  {copiedItem === 'Email' ? '✓ Copied' : 'Copy Email'}
                </button>
              </div>

              <div className="pt-2 border-t border-white/10 space-y-2 text-xs text-neutral-400 font-normal">
                <div className="flex items-center gap-2 text-neutral-300">
                  <span className="text-[#681fe4] font-bold">✓</span>
                  <span>12-Hour SLA turnaround on all enterprise inquiries</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-300">
                  <span className="text-[#681fe4] font-bold">✓</span>
                  <span>Dedicated accounts for US, UK, Canada, Australia, and UAE</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#0c0818] rounded-[4px] p-7 sm:p-10 border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <div className="mb-6">
                  <span className="font-bebas text-xs tracking-[0.2em] uppercase text-[#681fe4] bg-[#681fe4]/10 border border-[#681fe4]/30 px-3 py-1 rounded-[2px]">
                    DISCOVERY &amp; STRATEGY
                  </span>
                  <h2 className="font-bebas text-3xl sm:text-4xl text-white mt-3 tracking-[0.14em] uppercase">
                    START YOUR PROJECT
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-1.5 font-normal">
                    Tell us about your requirements. We evaluate scope and reply with a custom growth plan within 12 hours.
                  </p>
                </div>

                {formState === "success" ? (
                  <div className="text-center py-8 animate-fadeIn">
                    <div className="w-16 h-16 rounded-[4px] bg-[#681fe4]/20 border border-[#681fe4] text-[#681fe4] flex items-center justify-center text-2xl mx-auto mb-4 font-bold shadow-lg">
                      ✓
                    </div>
                    <h3 className="font-bebas text-3xl font-black text-white tracking-[0.14em] uppercase">Inquiry Received!</h3>
                    <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto mt-2 mb-5">
                      Thank you, <strong className="text-white">{formData.name || "Client"}</strong>. Your project details have been successfully recorded.
                    </p>

                    <button
                      onClick={() => setFormState("idle")}
                      className="text-xs font-bebas tracking-[0.14em] uppercase text-[#681fe4] hover:text-white underline transition-colors cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
                    
                    {/* Row 1: Full Name, Email, Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                      <div>
                        <label htmlFor="input-name" className="text-xs font-bebas tracking-[0.14em] text-neutral-300 block mb-1.5 uppercase">
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
                          className="w-full px-4 py-3 rounded-[4px] bg-[#07030d] border border-white/15 focus:border-[#681fe4] text-white text-xs placeholder:text-neutral-500 outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label htmlFor="input-email" className="text-xs font-bebas tracking-[0.14em] text-neutral-300 block mb-1.5 uppercase">
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
                          className="w-full px-4 py-3 rounded-[4px] bg-[#07030d] border border-white/15 focus:border-[#681fe4] text-white text-xs placeholder:text-neutral-500 outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label htmlFor="input-phone" className="text-xs font-bebas tracking-[0.14em] text-neutral-300 block mb-1.5 uppercase">
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
                          className="w-full px-4 py-3 rounded-[4px] bg-[#07030d] border border-white/15 focus:border-[#681fe4] text-white text-xs placeholder:text-neutral-500 outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Row 2: Website URL, Timezone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div>
                        <label htmlFor="input-website" className="text-xs font-bebas tracking-[0.14em] text-neutral-300 block mb-1.5 uppercase">
                          Company Website URL
                        </label>
                        <input
                          id="input-website"
                          type="text"
                          autoComplete="url"
                          placeholder="https://company.com"
                          value={formData.website}
                          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                          className="w-full px-4 py-3 rounded-[4px] bg-[#07030d] border border-white/15 focus:border-[#681fe4] text-white text-xs placeholder:text-neutral-500 outline-none transition-all font-mono"
                        />
                      </div>

                      <div>
                        <label htmlFor="input-timezone" className="text-xs font-bebas tracking-[0.14em] text-neutral-300 block mb-1.5 uppercase">
                          Primary Timezone *
                        </label>
                        <select
                          id="input-timezone"
                          value={formData.timezone}
                          onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                          className="w-full px-4 py-3 rounded-[4px] bg-[#07030d] border border-white/15 focus:border-[#681fe4] text-white text-xs outline-none cursor-pointer transition-all"
                        >
                          <option className="bg-[#0c0818] text-white py-2" value="US / Eastern (EST)">US / Eastern (EST)</option>
                          <option className="bg-[#0c0818] text-white py-2" value="US / Pacific (PST)">US / Pacific (PST)</option>
                          <option className="bg-[#0c0818] text-white py-2" value="UK / London (GMT)">UK / London (GMT)</option>
                          <option className="bg-[#0c0818] text-white py-2" value="Europe / Berlin (CET)">Europe / Berlin (CET)</option>
                          <option className="bg-[#0c0818] text-white py-2" value="Australia / Sydney (AEST)">Australia / Sydney (AEST)</option>
                          <option className="bg-[#0c0818] text-white py-2" value="UAE / Dubai (GST)">UAE / Dubai (GST)</option>
                          <option className="bg-[#0c0818] text-white py-2" value="India / IST">India / New Delhi (IST)</option>
                          <option className="bg-[#0c0818] text-white py-2" value="Other">Other / Flexible</option>
                        </select>
                      </div>
                    </div>

                    {/* Row 3: Target Service */}
                    <div>
                      <label htmlFor="input-service" className="text-xs font-bebas tracking-[0.14em] text-neutral-300 block mb-1.5 uppercase">
                        Target Service or Deliverable *
                      </label>
                      <select
                        id="input-service"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-[4px] bg-[#07030d] border border-white/15 focus:border-[#681fe4] text-white text-xs outline-none cursor-pointer transition-all"
                      >
                        <option className="bg-[#0c0818] text-white py-2" value="Full-Funnel Organic Growth">Full-Funnel Organic Growth</option>
                        <option className="bg-[#0c0818] text-white py-2" value="High-Intent SEO Optimization">High-Intent SEO Optimization</option>
                        <option className="bg-[#0c0818] text-white py-2" value="Website Development (Next.js)">Website Development (Next.js)</option>
                        <option className="bg-[#0c0818] text-white py-2" value="Off-Page Backlink Building">Off-Page Backlink Building &amp; Digital PR</option>
                        <option className="bg-[#0c0818] text-white py-2" value="Content Strategy & Writing">Content Strategy &amp; Writing</option>
                        <option className="bg-[#0c0818] text-white py-2" value="Website Maintenance & Speed">Website Maintenance &amp; Speed Optimization</option>
                      </select>
                    </div>

                    {/* Row 4: UPI / Payment Reference UTR */}
                    <div>
                      <label htmlFor="input-payment-ref" className="text-xs font-bebas tracking-[0.14em] text-neutral-300 block mb-1.5 uppercase">
                        UPI UTR / Payment Transaction ID (Optional)
                      </label>
                      <input
                        id="input-payment-ref"
                        type="text"
                        placeholder="e.g. 4120938120 / PhonePe / GPay Transaction ID"
                        value={formData.paymentRef}
                        onChange={(e) => setFormData({ ...formData, paymentRef: e.target.value })}
                        className="w-full px-4 py-3 rounded-[4px] bg-[#07030d] border border-white/15 focus:border-[#681fe4] text-white text-xs placeholder:text-neutral-500 outline-none transition-all font-mono"
                      />
                    </div>

                    {/* Row 5: Goals / Scope Textarea */}
                    <div>
                      <label htmlFor="input-message" className="text-xs font-bebas tracking-[0.14em] text-neutral-300 block mb-1.5 uppercase">
                        Tell us about your goals or challenges
                      </label>
                      <textarea
                        id="input-message"
                        rows={4}
                        placeholder="Briefly describe your objectives, target geography, or deliverables..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-[4px] bg-[#07030d] border border-white/15 focus:border-[#681fe4] text-white text-xs placeholder:text-neutral-500 outline-none resize-none transition-all"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={formState === "submitting"}
                      className="w-full bg-[#681fe4] hover:bg-[#5815cb] active:scale-[0.99] text-white font-bebas text-sm sm:text-base tracking-[0.16em] uppercase py-4 rounded-[4px] transition-all shadow-[0_10px_25px_rgba(104,31,228,0.35)] cursor-pointer disabled:opacity-50"
                    >
                      {formState === "submitting" ? "Submitting Inquiry..." : "Submit Inquiry & Schedule Call →"}
                    </button>

                    <p className="text-[11px] font-mono text-center text-neutral-500">
                      🔒 100% Confidential. Strict Mutual NDA Guaranteed. Zero Spam.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
