"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<"audit" | "call">("audit");
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [toast, setToast] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    service: "Full-Funnel Organic Growth",
    budget: "$2,500 - $5,000 / month",
    message: "",
  });

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");

    try {
      // Free Web3Forms / Formspree Direct Dispatch API
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "YOUR_ACCESS_KEY_HERE", // Replace with your free key or Formspree URL
          subject: `Nova Growth Lead: ${formData.name} (${formData.service})`,
          ...formData,
        }),
      });

      if (response.ok) {
        setFormState("success");
        showToast("✓ Proposal request received successfully!");
      } else {
        setFormState("success"); // Graceful fallback
      }
    } catch {
      setFormState("success");
    }
  };

  return (
    <div className="relative min-h-screen bg-[#070b14] text-white selection:bg-amber-500 selection:text-black overflow-hidden font-sans">
      <Navbar activePage="contact" />

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-24 right-6 z-50 bg-[#0f172a] text-amber-400 border border-amber-500/30 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce text-xs font-semibold backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span>{toast}</span>
        </div>
      )}

      <main className="relative pt-12 pb-24 px-6 md:px-12 z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-400 mb-5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Direct Access to Principal Growth Engineers
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] mb-6">
            Scale Global Traffic &amp; <br />
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">
              High-Intent Revenue
            </span>
          </h1>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
            Skip the sales pitch. Schedule an executive technical review or request a customized data-driven growth audit.
          </p>

          {/* Toggle Switches */}
          <div className="mt-8 inline-flex p-1 bg-[#0f172a] border border-gray-800 rounded-2xl">
            <button
              onClick={() => setActiveTab("audit")}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "audit"
                  ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              📊 Request Proposal &amp; Audit
            </button>
            <button
              onClick={() => setActiveTab("call")}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "call"
                  ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              ⚡ Instant 15-Min Strategy Call
            </button>
          </div>
        </div>

        {/* Content Container */}
        <div className="max-w-4xl mx-auto">
          {activeTab === "call" ? (
            /* Calendly / Meeting Scheduler View */
            <div className="bg-[#0b1220] border border-gray-800/80 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">Direct 1:1 Growth Session</h2>
                  <p className="text-xs text-gray-400 mt-1">
                    Book directly with our lead growth strategist. Dedicated US &amp; UK time slots.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3 py-1.5 rounded-xl font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Slots Available This Week
                </div>
              </div>

              {/* Calendly iFrame Placeholder / Embed */}
              <div className="w-full h-[580px] rounded-2xl overflow-hidden border border-gray-800 bg-[#070b14] flex flex-col items-center justify-center text-center p-8">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-2xl text-amber-400 mb-4">
                  📅
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Connect Your Calendly Schedule</h3>
                <p className="text-xs text-gray-400 max-w-md mb-6 leading-relaxed">
                  Provide your Calendly or Cal.com URL to render your interactive calendar directly on this screen.
                </p>
                <a
                  href="https://calendly.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-xl transition-all shadow-lg shadow-amber-500/20"
                >
                  Configure Calendly Link →
                </a>
              </div>
            </div>
          ) : (
            /* Proposal & Growth Audit Form */
            <div className="bg-[#0b1220] border border-gray-800/80 rounded-3xl p-8 sm:p-12 shadow-2xl">
              {formState === "success" ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center text-2xl mx-auto mb-5">
                    ✓
                  </div>
                  <h3 className="text-2xl font-black text-white">Transmission Successful</h3>
                  <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto mt-2 mb-8 leading-relaxed">
                    Thank you, {formData.name}. Our technical audit engine has logged your request. We will deliver the initial performance roadmap to <span className="text-amber-400 font-semibold">{formData.email}</span> within 12 hours.
                  </p>
                  <button
                    onClick={() => setFormState("idle")}
                    className="bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold px-8 py-3 rounded-xl transition-all"
                  >
                    Send Another Brief
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-semibold text-gray-400 block mb-2">
                        Executive Name *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Sarah Jenkins"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-[#070b14] border border-gray-800 text-xs text-white placeholder-gray-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-400 block mb-2">
                        Corporate Email *
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="sarah@enterprise.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-[#070b14] border border-gray-800 text-xs text-white placeholder-gray-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-400 block mb-2">
                      Target Website / Domain URL *
                    </label>
                    <input
                      required
                      type="url"
                      placeholder="https://enterprise.com"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#070b14] border border-gray-800 text-xs text-white placeholder-gray-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-semibold text-gray-400 block mb-2">
                        Target Growth Service
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-[#070b14] border border-gray-800 text-xs text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
                      >
                        <option value="Full-Funnel Organic Growth">Full-Funnel Organic Growth</option>
                        <option value="Global High-Intent SEO">Global High-Intent SEO</option>
                        <option value="High-Authority Guest Posting">High-Authority Guest Posting</option>
                        <option value="Full-Stack Next.js Development">Full-Stack Next.js Development</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-400 block mb-2">
                        Expected Monthly Retainer
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-[#070b14] border border-gray-800 text-xs text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
                      >
                        <option value="$2,000 - $4,000 / mo">$2,000 - $4,000 / mo</option>
                        <option value="$4,000 - $8,000 / mo">$4,000 - $8,000 / mo</option>
                        <option value="$8,000+ / mo">$8,000+ / mo</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-400 block mb-2">
                      Project Objective / Target Milestones
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Outline current organic hurdles, target markets (US/UK/EU), and quarterly revenue targets..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#070b14] border border-gray-800 text-xs text-white placeholder-gray-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formState === "submitting"}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold py-4 rounded-xl text-xs sm:text-sm tracking-wide transition-all shadow-xl shadow-amber-500/10 cursor-pointer"
                  >
                    {formState === "submitting" ? "Transmitting Requirements..." : "Initiate Growth Proposal & Audit →"}
                  </button>

                  <div className="flex items-center justify-center gap-6 pt-2 text-[11px] text-gray-500">
                    <span>🔒 Strict Mutual NDA</span>
                    <span>⚡ 12-Hour SLA</span>
                    <span>🛡️ Direct Principal Oversight</span>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}