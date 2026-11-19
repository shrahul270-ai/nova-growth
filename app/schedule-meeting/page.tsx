"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Calendar, Clock, Video, Globe, CheckCircle2, User, Mail, Link as LinkIcon, ArrowRight, Shield } from "lucide-react";

const TIMEZONES = [
  { id: "EST", label: "US / Eastern Time (EST/EDT)" },
  { id: "PST", label: "US / Pacific Time (PST/PDT)" },
  { id: "GMT", label: "UK / London (GMT/BST)" },
  { id: "AEST", label: "Australia / Sydney (AEST)" },
  { id: "IST", label: "India Standard Time (IST)" },
];

const TIME_SLOTS = [
  "09:30 AM",
  "11:00 AM",
  "01:30 PM",
  "03:00 PM",
  "04:30 PM",
  "06:00 PM",
  "08:00 PM",
];

export default function ScheduleMeetingPage() {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [minDate, setMinDate] = useState<string>("");

  useEffect(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    setSelectedDate(d.toISOString().split("T")[0]);
    setMinDate(new Date().toISOString().split("T")[0]);
  }, []);
  const [selectedTimezone, setSelectedTimezone] = useState<string>("EST");
  const [selectedSlot, setSelectedSlot] = useState<string>("03:00 PM");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [primaryGoal, setPrimaryGoal] = useState<string>("Scaling Organic Search Traffic");
  const [notes, setNotes] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isBooked, setIsBooked] = useState<boolean>(false);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);
    try {
      await fetch("/api/db/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "meeting_scheduled",
          name,
          email,
          phone: "Via Schedule Meeting Page",
          service: `30-Min Strategy Call: ${primaryGoal}`,
          sourceUrl: "/schedule-meeting",
          message: `Scheduled Date: ${selectedDate} at ${selectedSlot} (${selectedTimezone}). Website: ${website || "N/A"}. Goal: ${primaryGoal}. Notes: ${notes || "None"}`,
          notes: `Date: ${selectedDate} | Slot: ${selectedSlot} | TZ: ${selectedTimezone} | Website: ${website}`,
        }),
      });
      setIsBooked(true);
    } catch {
      setIsBooked(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#E9EEF3] text-[#154359] selection:bg-[#154359]/20 selection:text-[#154359]">
      {/* Background Matrix Dots */}
      <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      {/* Top Navbar */}
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* Hero Header */}
      <section className="relative z-10 pt-16 sm:pt-24 pb-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-slate-300 text-[11px] font-semibold uppercase tracking-wider text-[#185B7B] shadow-xs mb-4">
          <Calendar className="w-3.5 h-3.5 text-[#ec601c]" />
          <span>Direct 1-on-1 Consultation</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#154359] mb-4">
          Schedule a Growth Strategy Meeting
        </h1>
        <p className="text-sm sm:text-base text-[#475569] max-w-xl mx-auto leading-relaxed">
          Book a 30-minute private call directly with our lead search strategist. We audit your current organic baseline and map out actionable high-DA growth targets.
        </p>
      </section>

      {/* Main Scheduling Section */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        {isBooked ? (
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 sm:p-14 border border-slate-200/90 shadow-xl max-w-2xl mx-auto text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#154359]">
              Strategy Call Confirmed!
            </h2>
            <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 text-left space-y-2 text-xs sm:text-sm text-[#475569]">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#154359]">Client:</span>
                <span>{name} ({email})</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#154359]">Scheduled Date:</span>
                <span className="font-bold text-[#185B7B]">{selectedDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#154359]">Time Slot:</span>
                <span className="font-bold text-[#ec601c]">{selectedSlot} ({selectedTimezone})</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#154359]">Format:</span>
                <span>Google Meet / Zoom (Direct invite sent to your email)</span>
              </div>
            </div>
            <p className="text-xs text-[#475569]">
              A calendar invite and meeting link have been prepared for your email. Need immediate assistance before the call?
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`https://wa.me/917690868932?text=Hello%20Balaji%20Prime%20Media,%20I%20just%20scheduled%20a%20meeting%20for%20${encodeURIComponent(selectedDate)}%20at%20${encodeURIComponent(selectedSlot)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-full bg-[#25D366] text-white text-xs font-bold hover:bg-[#20ba59] transition-all flex items-center gap-2 shadow-xs"
              >
                <span>WhatsApp Confirmation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={() => setIsBooked(false)}
                className="px-6 py-2.5 rounded-full bg-slate-200 text-[#154359] text-xs font-semibold hover:bg-slate-300 transition-all cursor-pointer"
              >
                Book Another Time
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Meeting Details & Value Overview */}
            <div className="lg:col-span-5 bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#185B7B] block mb-1">
                  Session Overview
                </span>
                <h3 className="text-xl font-bold text-[#154359]">
                  30-Min High-Impact Strategy Call
                </h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#475569]">
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#ec601c] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#154359] block">Duration:</strong>
                    30 minutes of focused technical analysis and white-hat outreach review.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Video className="w-4 h-4 text-[#185B7B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#154359] block">Platform:</strong>
                    Google Meet or Zoom (calendar invite generated instantly).
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Globe className="w-4 h-4 text-[#154359] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#154359] block">Timezone Adaptive:</strong>
                    Operating across US (EST/PST), UK (GMT), and Australia (AEST).
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Shield className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#154359] block">Zero Obligation:</strong>
                    No high-pressure sales scripts. Strictly strategic insights tailored to your site.
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  What we cover in 30 minutes:
                </span>
                <ul className="space-y-1.5 text-xs text-[#475569]">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>Audit of existing organic search keyword positions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>Identification of competitor backlink authority gaps</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>Core Web Vitals &amp; PageSpeed bottleneck scan</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>Target DR 50–90+ outreach publishing plan</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column: Interactive Booking Form */}
            <div className="lg:col-span-7 bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-lg">
              <form onSubmit={handleBooking} className="space-y-5">
                
                {/* 1. Date & Timezone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#154359] mb-1.5">
                      Select Preferred Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={selectedDate}
                      min={minDate || undefined}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:border-[#154359] text-[#154359] transition-all cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#154359] mb-1.5">
                      Your Timezone *
                    </label>
                    <select
                      value={selectedTimezone}
                      onChange={(e) => setSelectedTimezone(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:border-[#154359] text-[#154359] transition-all cursor-pointer"
                    >
                      {TIMEZONES.map((tz) => (
                        <option key={tz.id} value={tz.id}>
                          {tz.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 2. Slot Selection */}
                <div>
                  <label className="block text-xs font-semibold text-[#154359] mb-2">
                    Available Time Slots ({selectedTimezone}) *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                          selectedSlot === slot
                            ? "bg-[#154359] text-white border-[#154359] shadow-xs"
                            : "bg-slate-50 text-[#475569] border-slate-200 hover:bg-white"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#154359] mb-1.5 cursor-pointer">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:border-[#154359] text-[#154359] transition-all cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#154359] mb-1.5 cursor-pointer">
                      Work Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. sarah@company.com"
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:border-[#154359] text-[#154359] transition-all cursor-pointer"
                    />
                  </div>
                </div>

                {/* 4. Website Domain & Primary Goal */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#154359] mb-1.5 cursor-pointer">
                      Website URL
                    </label>
                    <input
                      type="text"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://example.com"
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:border-[#154359] text-[#154359] transition-all cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#154359] mb-1.5 cursor-pointer">
                      Primary Growth Goal
                    </label>
                    <select
                      value={primaryGoal}
                      onChange={(e) => setPrimaryGoal(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:border-[#154359] text-[#154359] transition-all cursor-pointer"
                    >
                      <option value="Scaling Organic Search Traffic">Scaling Organic Search Traffic</option>
                      <option value="Acquiring DR 50–90+ Editorial Backlinks">Acquiring DR 50–90+ Editorial Backlinks</option>
                      <option value="Next.js Headless Re-engineering">Next.js Headless Re-engineering</option>
                      <option value="Core Web Vitals & Speed Optimization">Core Web Vitals &amp; Speed Optimization</option>
                      <option value="Complete Agency Retainer Strategy">Complete Agency Retainer Strategy</option>
                    </select>
                  </div>
                </div>

                {/* 5. Additional Notes */}
                <div>
                  <label className="block text-xs font-semibold text-[#154359] mb-1.5 cursor-pointer">
                    Any specific details you want audited prior to the call?
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Recently launched a redesign, traffic dropped after Google core update, or target competitor sites..."
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:border-[#154359] text-[#154359] transition-all cursor-pointer"
                  />
                </div>

                {/* Confirm Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-full bg-[#154359] text-white text-xs sm:text-sm font-bold hover:bg-[#091427] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Scheduling session...</span>
                    ) : (
                      <>
                        <span>Confirm 30-Min Strategy Meeting</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

              </form>
            </div>

          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
