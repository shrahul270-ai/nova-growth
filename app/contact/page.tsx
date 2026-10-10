"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ContactPage() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    timezone: "US / Eastern (EST)",
    service: "Full-Funnel Organic Growth",
    budget: "$2,500 - $5,000 / month",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    setTimeout(() => {
      setFormState("success");
    }, 1000);
  };

  return (
    <div className="relative min-h-screen bg-[#f8fbf9] text-[#111827] overflow-hidden">
      <div className="curved-ribbon-left" aria-hidden="true" />
      <div className="curved-ribbon-right" aria-hidden="true" />

      <Navbar activePage="contact" />

      {/* Main Contact Section */}
      <section className="relative pt-16 pb-24 px-6 md:px-12 z-10 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-[#061c14] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            <span>Global Client Inquiries Welcome</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0f172a] tracking-tight leading-[1.1] mb-6">
            Let&apos;s Build Something <br />
            <span className="text-gradient-emerald">Extraordinary Together</span>
          </h1>
          <p className="text-base sm:text-lg text-[#475569] leading-relaxed max-w-2xl mx-auto">
            Whether you need international SEO dominance, modern Next.js development, or full-service growth marketing, we&apos;re here to help you scale.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Info & Trust Badges */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xs">
              <h2 className="text-xl font-bold text-[#0f172a] mb-3">
                Why Global Brands Choose Nova Growth
              </h2>
              <p className="text-xs text-[#64748b] leading-relaxed mb-6">
                We eliminate the friction of offshore agency partnerships with strict SLAs, fluent communication, and time-zone aligned support.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-sm font-bold shrink-0">
                    ⚡
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#0f172a]">12-Hour Response Time SLA</h3>
                    <p className="text-[11px] text-[#64748b] mt-0.5">
                      All overseas emails and requests receive detailed replies within 12 business hours.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center text-sm font-bold shrink-0">
                    🌍
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#0f172a]">Time-Zone Aligned Execution</h3>
                    <p className="text-[11px] text-[#64748b] mt-0.5">
                      Dedicated project managers operating across US (EST/PST), UK (GMT), and UAE (GST) hours.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center text-sm font-bold shrink-0">
                    🔒
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#0f172a]">Strict Mutual NDA Protection</h3>
                    <p className="text-[11px] text-[#64748b] mt-0.5">
                      Your business data, competitive metrics, and proprietary code remain 100% confidential.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center text-sm font-bold shrink-0">
                    💬
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#0f172a]">Direct Slack / Teams Channel</h3>
                    <p className="text-[11px] text-[#64748b] mt-0.5">
                      No bureaucratic ticket portals. Chat directly with your lead strategist and developer.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Contact Card */}
            <div className="bg-emerald-50/70 rounded-3xl p-6 border border-emerald-100 flex flex-col gap-3 text-xs">
              <span className="font-bold text-[#061c14] uppercase tracking-wider text-[11px]">
                Direct Contacts
              </span>
              <div className="flex items-center justify-between text-gray-700 py-1 border-b border-emerald-100/70">
                <span>Inquiries Email:</span>
                <span className="font-semibold text-[#0f172a]">hello@novagrowth.agency</span>
              </div>
              <div className="flex items-center justify-between text-gray-700 py-1 border-b border-emerald-100/70">
                <span>Global Support:</span>
                <span className="font-semibold text-[#0f172a]">+1 (800) 555-NOVA</span>
              </div>
              <div className="flex items-center justify-between text-gray-700 py-1">
                <span>Headquarters:</span>
                <span className="font-semibold text-[#0f172a]">Global Remote First</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Proposal & Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-xl">
              {formState === "success" ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl mx-auto mb-4">
                    ✓
                  </div>
                  <h3 className="text-2xl font-black text-[#0f172a]">Proposal Request Received!</h3>
                  <p className="text-sm text-[#64748b] max-w-md mx-auto mt-2 mb-6">
                    Thank you, {formData.name}. Our lead growth strategist is reviewing your website and will send a detailed analysis within 12 hours.
                  </p>
                  <button
                    onClick={() => setFormState("idle")}
                    className="bg-[#061c14] text-white text-xs font-bold px-6 py-2.5 rounded-full hover:bg-[#0a2e21] transition-all cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Sarah Jenkins"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1.5">
                        Corporate / Work Email *
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="sarah@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1.5">
                        Company Website URL
                      </label>
                      <input
                        type="text"
                        placeholder="https://company.com"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1.5">
                        Your Primary Timezone *
                      </label>
                      <select
                        value={formData.timezone}
                        onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none bg-white"
                      >
                        <option value="US / Eastern (EST)">US / Eastern (EST)</option>
                        <option value="US / Pacific (PST)">US / Pacific (PST)</option>
                        <option value="UK / London (GMT)">UK / London (GMT)</option>
                        <option value="Europe / Berlin (CET)">Europe / Berlin (CET)</option>
                        <option value="Australia / Sydney (AEST)">Australia / Sydney (AEST)</option>
                        <option value="UAE / Dubai (GST)">UAE / Dubai (GST)</option>
                        <option value="Other">Other / Flexible</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1.5">
                        Target Service
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none bg-white"
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
                      <label className="text-xs font-bold text-gray-700 block mb-1.5">
                        Monthly Budget in USD
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none bg-white"
                      >
                        <option value="$1,000 - $2,500 / month">$1,000 - $2,500 / month</option>
                        <option value="$2,500 - $5,000 / month">$2,500 - $5,000 / month</option>
                        <option value="$5,000 - $10,000+ / month">$5,000 - $10,000+ / month</option>
                        <option value="One-Time Web Development ($3,000+)">One-Time Web Dev ($3,000+)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1.5">
                      Tell us about your goals or challenges
                    </label>
                    <textarea
                      rows={4}
                      placeholder="e.g. We want to increase our US organic search traffic and improve our core web vitals..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formState === "submitting"}
                    className="w-full bg-[#061c14] hover:bg-[#0a2e21] text-white font-bold py-4 rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-emerald-900/20 cursor-pointer"
                  >
                    {formState === "submitting" ? "Sending Request..." : "Request Growth Audit & Proposal →"}
                  </button>

                  <p className="text-[11px] text-center text-gray-400">
                    We value privacy. 100% confidential. No spam, guaranteed.
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
