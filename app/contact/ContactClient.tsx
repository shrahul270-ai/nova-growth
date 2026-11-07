"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NextLayerContactHero from "../components/NextLayerContactHero";
import { trackInteraction } from "@/lib/tracker";
import { getClientLiveLocation } from "@/lib/geo";

export default function ContactClient() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [toast, setToast] = useState<string | null>(null);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  // Direct Contact Details
  const agencyEmail = "support@balajiprimemedia.in"; 
  const whatsappNumber = "+91 76908 68932";

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    showToast(`📋 Copied ${label} to clipboard!`);
    trackInteraction({
      action: label === "Phone" ? "phone" : "email",
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
    budget: "$2,500 - $5,000 / month",
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
          budget: formData.budget,
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
      // Fallback: still show success to user if offline
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

      {/* 1. Cinematic HLS Video Call-To-Action Header with Liquid Glassmorphism & Agency Details */}
      <NextLayerContactHero />

      {/* 2. Main Contact Section (Form & Cards) */}
      <section id="contact-form" className="relative py-12 sm:py-20 px-4 sm:px-6 md:px-12 z-10 max-w-7xl mx-auto scroll-mt-20">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left Column: Direct Info & Trust Badges */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            <div className="bg-[#0e0921]/90 rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl backdrop-blur-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-[11px] font-semibold text-purple-300 mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Global Partnership Protocol</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight">
                Why Global Brands Choose Balaji Prime Media
              </h2>
              <p className="text-xs text-gray-400 leading-relaxed mb-6 font-light">
                We eliminate the friction of offshore agency partnerships with strict SLAs, fluent communication, and time-zone aligned support.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-white/5 border border-white/5">
                  <div className="w-9 h-9 rounded-xl bg-purple-950 text-purple-300 border border-purple-500/30 flex items-center justify-center text-sm font-bold shrink-0">
                    ⚡
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">12-Hour Response Time SLA</h3>
                    <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">
                      All overseas emails and inquiries receive detailed replies within 12 business hours.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-white/5 border border-white/5">
                  <div className="w-9 h-9 rounded-xl bg-cyan-950 text-cyan-300 border border-cyan-500/30 flex items-center justify-center text-sm font-bold shrink-0">
                    🌍
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">Time-Zone Aligned Execution</h3>
                    <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">
                      Direct project management operating across US (EST/PST), UK (GMT), and UAE (GST) hours.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-white/5 border border-white/5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-500/30 flex items-center justify-center text-sm font-bold shrink-0">
                    🔒
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">Strict Mutual NDA Protection</h3>
                    <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">
                      Your business data, competitive metrics, and proprietary code remain 100% confidential.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Fast Connect Box */}
            <div className="bg-[#0e0921]/90 rounded-3xl p-6 sm:p-7 border border-white/10 shadow-xl backdrop-blur-xl space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span>Direct Contact Channels</span>
              </h3>

              {/* Direct Email */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-gray-300 py-1.5 gap-2 sm:gap-0 border-b border-white/5 pb-3">
                <div>
                  <span className="block text-gray-400 text-[10px]">Official Agency Email:</span>
                  <span className="font-semibold text-white text-xs">{agencyEmail}</span>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(agencyEmail, 'Email')}
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg border border-white/10 text-[10px] font-bold text-cyan-300 transition-colors cursor-pointer self-start sm:self-auto"
                >
                  {copiedItem === 'Email' ? '✓ Copied' : 'Copy 📋'}
                </button>
              </div>

              {/* Direct WhatsApp */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-gray-300 py-1.5 gap-2 sm:gap-0">
                <div>
                  <span className="block text-gray-400 text-[10px]">Direct WhatsApp:</span>
                  <span className="font-semibold text-white text-xs">{whatsappNumber}</span>
                </div>
                <div className="flex gap-1.5 shrink-0">
                  <a
                    href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=Hi%20Balaji%20Prime%20Media,%20I%20would%20like%20to%20discuss%20a%20digital%20marketing%20project.`}
                    onClick={() => trackInteraction({
                      action: "whatsapp",
                      title: "Direct WhatsApp Clicked",
                      details: whatsappNumber,
                      sourcePage: "/contact",
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[10px] font-bold transition-colors flex items-center gap-1 shadow-xs"
                  >
                    WhatsApp 💬
                  </a>

                  <button
                    type="button"
                    onClick={() => copyToClipboard(whatsappNumber, 'Phone')}
                    className="px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded-lg border border-white/10 text-[10px] font-bold text-white transition-colors cursor-pointer"
                  >
                    {copiedItem === 'Phone' ? '✓' : 'Copy 📋'}
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Proposal & Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#0e0921]/90 rounded-3xl p-8 sm:p-10 border border-white/10 shadow-2xl backdrop-blur-xl">
              {formState === "success" ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center text-2xl mx-auto mb-4 font-bold shadow-lg">
                    ✓
                  </div>
                  <h3 className="text-2xl font-black text-white">Proposal Request Received!</h3>
                  <p className="text-sm text-gray-300 max-w-md mx-auto mt-2 mb-6">
                    Thank you, {formData.name || "there"}. Our lead growth strategist is reviewing your requirements and will reach out to <span className="font-semibold text-cyan-300">{formData.email}</span> within 12 hours.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3 mt-4 mb-4">
                    {/* 1. WhatsApp Button */}
                    <a
                      href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=Hi%20Balaji%20Prime%20Media,%20I%20just%20submitted%20a%20project%20inquiry.%20Name:%20${encodeURIComponent(formData.name)},%20Email:%20${encodeURIComponent(formData.email)},%20Service:%20${encodeURIComponent(formData.service)},%20Budget:%20${encodeURIComponent(formData.budget)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-md transition-all cursor-pointer"
                    >
                      <span>Send to WhatsApp 💬</span>
                    </a>

                    {/* 2. Direct Gmail Web */}
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(agencyEmail)}&su=${encodeURIComponent(`New Project Inquiry from ${formData.name || "Client"}`)}&body=${encodeURIComponent(`Hi Balaji Prime Media Team,\n\nI have submitted an inquiry on your website:\n\nName: ${formData.name || "N/A"}\nEmail: ${formData.email || "N/A"}\nPhone: ${formData.phone || "N/A"}\nWebsite: ${formData.website || "N/A"}\nService: ${formData.service || "N/A"}\nBudget: ${formData.budget || "N/A"}\n\nMessage:\n${formData.message || "Looking forward to your proposal."}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackInteraction({
                        action: "email",
                        title: "Inquiry Sent via Gmail Web",
                        clientIdentifier: formData.email || formData.phone,
                        details: `Client: ${formData.name} | Service: ${formData.service}`,
                        sourcePage: "/contact",
                      })}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-md transition-all cursor-pointer"
                    >
                      <span>Send via Gmail ✉️</span>
                    </a>
                  </div>

                  <button
                    onClick={() => setFormState("idle")}
                    className="text-xs font-semibold text-gray-400 hover:text-white underline transition-colors cursor-pointer mt-4"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left font-body">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                      <label className="text-xs font-bold text-gray-300 block mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Sarah Jenkins"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#140e33] border border-white/10 text-white text-base sm:text-xs focus:border-purple-400 focus:ring-1 focus:ring-purple-400 outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-gray-300 block mb-1.5">
                        Corporate Email *
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="sarah@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#140e33] border border-white/10 text-white text-base sm:text-xs focus:border-purple-400 focus:ring-1 focus:ring-purple-400 outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-gray-300 block mb-1.5">
                        Phone / WhatsApp *
                      </label>
                      <input
                        required
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#140e33] border border-white/10 text-white text-base sm:text-xs focus:border-purple-400 focus:ring-1 focus:ring-purple-400 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-bold text-gray-300 block mb-1.5">
                        Company Website URL
                      </label>
                      <input
                        type="text"
                        placeholder="https://company.com"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#140e33] border border-white/10 text-white text-base sm:text-xs focus:border-purple-400 focus:ring-1 focus:ring-purple-400 outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-gray-300 block mb-1.5">
                        Your Primary Timezone *
                      </label>
                      <select
                        value={formData.timezone}
                        onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#140e33] border border-white/10 text-white text-xs focus:border-purple-400 focus:ring-1 focus:ring-purple-400 outline-none cursor-pointer"
                      >
                        <option value="US / Eastern (EST)">US / Eastern (EST)</option>
                        <option value="US / Pacific (PST)">US / Pacific (PST)</option>
                        <option value="UK / London (GMT)">UK / London (GMT)</option>
                        <option value="Europe / Berlin (CET)">Europe / Berlin (CET)</option>
                        <option value="Australia / Sydney (AEST)">Australia / Sydney (AEST)</option>
                        <option value="UAE / Dubai (GST)">UAE / Dubai (GST)</option>
                        <option value="India / IST">India / New Delhi (IST)</option>
                        <option value="Other">Other / Flexible</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-bold text-gray-300 block mb-1.5">
                        Target Service
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#140e33] border border-white/10 text-white text-xs focus:border-purple-400 focus:ring-1 focus:ring-purple-400 outline-none cursor-pointer"
                      >
                        <option value="Full-Funnel Organic Growth">Full-Funnel Organic Growth</option>
                        <option value="High-Intent SEO Optimization">High-Intent SEO Optimization</option>
                        <option value="Website Development (Next.js)">Website Development (Next.js)</option>
                        <option value="Off-Page Backlink Building">Off-Page Backlink Building</option>
                        <option value="Content Strategy & Writing">Content Strategy &amp; Writing</option>
                        <option value="Website Maintenance & Speed">Website Maintenance &amp; Speed</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-gray-300 block mb-1.5">
                        Monthly Budget in USD
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#140e33] border border-white/10 text-white text-xs focus:border-purple-400 focus:ring-1 focus:ring-purple-400 outline-none cursor-pointer"
                      >
                        <option value="$1,000 - $2,500 / month">$1,000 - $2,500 / month</option>
                        <option value="$2,500 - $5,000 / month">$2,500 - $5,000 / month</option>
                        <option value="$5,000 - $10,000+ / month">$5,000 - $10,000+ / month</option>
                        <option value="One-Time Web Development ($3,000+)">One-Time Web Dev ($3,000+)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-300 block mb-1.5">
                      Tell us about your goals or challenges
                    </label>
                    <textarea
                      rows={4}
                      placeholder="e.g. We want to increase our US organic search traffic and improve our core web vitals..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#140e33] border border-white/10 text-white text-xs focus:border-purple-400 focus:ring-1 focus:ring-purple-400 outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formState === "submitting"}
                    className="w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:brightness-110 text-white font-bold py-4 rounded-xl text-xs sm:text-sm transition-all shadow-lg shadow-purple-950/80 cursor-pointer"
                  >
                    {formState === "submitting" ? "Sending Request..." : "Request Growth Audit & Proposal →"}
                  </button>

                  <p className="text-[11px] text-center text-gray-400">
                    🔒 We value privacy. 100% confidential. Strict mutual NDA guaranteed.
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Footer (Unchanged as requested) */}
      <Footer />
    </div>
  );
}
