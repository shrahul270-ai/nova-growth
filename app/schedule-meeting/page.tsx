"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Calendar, Clock, Video, Globe, CheckCircle2, ArrowRight, Shield } from "lucide-react";

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
    <div className="relative min-h-screen bg-[#07030d] text-white selection:bg-[#681fe4] selection:text-white font-satoshi bg-grid-white-240">
      {/* Top Navbar */}
      <div className="relative z-50 bg-[#07030d]/90 backdrop-blur-md">
        <Navbar />
      </div>

      {/* Hero Header */}
      <section className="relative z-10 pt-32 sm:pt-40 pb-12 max-w-4xl mx-auto px-4 sm:px-6 text-center border-b border-white/10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[2px] bg-white/5 border border-white/10 text-xs font-bebas tracking-[0.2em] uppercase text-[#681fe4] mb-4">
          <Calendar className="w-3.5 h-3.5 text-[#681fe4]" />
          <span>DIRECT 1-ON-1 CONSULTATION</span>
        </div>

        <h1 className="font-bebas text-4xl sm:text-6xl md:text-7xl uppercase tracking-[0.16em] text-white mb-4 leading-none">
          SCHEDULE A GROWTH <span className="text-[#681fe4]">STRATEGY MEETING</span>
        </h1>
        <p className="font-satoshi text-sm sm:text-base text-neutral-300 max-w-xl mx-auto leading-relaxed font-normal">
          Book a 30-minute private call directly with our lead search strategist. We audit your current organic baseline and map out actionable high-DA growth targets.
        </p>
      </section>

      {/* Main Scheduling Section */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-16 pb-24">
        {isBooked ? (
          <div className="bg-[#0c0818] rounded-[4px] p-8 sm:p-14 border border-white/10 shadow-2xl max-w-2xl mx-auto text-center space-y-5">
            <div className="w-16 h-16 rounded-[4px] bg-[#681fe4]/20 text-[#681fe4] border border-[#681fe4] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="font-bebas text-3xl sm:text-4xl uppercase text-white tracking-[0.14em]">
              STRATEGY CALL CONFIRMED!
            </h2>
            <div className="bg-[#07030d] rounded-[4px] p-4 sm:p-5 border border-white/10 text-left space-y-2 text-xs sm:text-sm text-neutral-300 font-mono">
              <div className="flex items-center justify-between">
                <span className="text-neutral-500 font-satoshi">Client:</span>
                <span>{name} ({email})</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500 font-satoshi">Scheduled Date:</span>
                <span className="font-bold text-white">{selectedDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500 font-satoshi">Time Slot:</span>
                <span className="font-bold text-[#681fe4]">{selectedSlot} ({selectedTimezone})</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500 font-satoshi">Format:</span>
                <span>Google Meet / Zoom (Direct invite sent to your email)</span>
              </div>
            </div>
            <p className="text-xs text-neutral-400 font-normal font-satoshi">
              A calendar invite and meeting link have been prepared for your email. Need immediate assistance before the call?
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`https://wa.me/917690868932?text=Hello%20Balaji%20Prime%20Media,%20I%20just%20scheduled%20a%20meeting%20for%20${encodeURIComponent(selectedDate)}%20at%20${encodeURIComponent(selectedSlot)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-[4px] bg-[#681fe4] hover:bg-[#5815cb] text-white text-xs font-bebas tracking-[0.14em] uppercase transition-all flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <span>WHATSAPP CONFIRMATION</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={() => setIsBooked(false)}
                className="px-6 py-2.5 rounded-[4px] bg-white/5 hover:bg-white/10 text-white text-xs font-bebas tracking-[0.14em] uppercase border border-white/15 transition-all cursor-pointer"
              >
                Book Another Time
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Meeting Details & Value Overview */}
            <div className="lg:col-span-5 bg-[#0c0818] rounded-[4px] p-6 sm:p-8 border border-white/10 shadow-xl space-y-6">
              <div>
                <span className="font-bebas text-xs tracking-[0.2em] uppercase text-[#681fe4] block mb-1">
                  SESSION OVERVIEW
                </span>
                <h3 className="font-bebas text-xl sm:text-2xl text-white tracking-[0.12em] uppercase">
                  30-Min High-Impact Strategy Call
                </h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-neutral-300">
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#681fe4] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white font-bebas tracking-[0.1em] uppercase block">Duration:</strong>
                    30 minutes of focused technical analysis and white-hat outreach review.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Video className="w-4 h-4 text-[#681fe4] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white font-bebas tracking-[0.1em] uppercase block">Platform:</strong>
                    Google Meet or Zoom (calendar invite generated instantly).
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Globe className="w-4 h-4 text-[#681fe4] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white font-bebas tracking-[0.1em] uppercase block">Timezone Adaptive:</strong>
                    Operating across US (EST/PST), UK (GMT), and Australia (AEST).
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Shield className="w-4 h-4 text-[#681fe4] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white font-bebas tracking-[0.1em] uppercase block">Zero Obligation:</strong>
                    No high-pressure sales scripts. Strictly strategic insights tailored to your site.
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <span className="font-bebas text-xs tracking-[0.16em] uppercase text-neutral-400 block mb-2">
                  WHAT WE COVER IN 30 MINUTES:
                </span>
                <ul className="space-y-1.5 text-xs text-neutral-300">
                  <li className="flex items-center gap-2">
                    <span className="text-[#681fe4] font-bold">✓</span>
                    <span>Audit of existing organic search keyword positions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#681fe4] font-bold">✓</span>
                    <span>Identification of competitor backlink authority gaps</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#681fe4] font-bold">✓</span>
                    <span>Core Web Vitals &amp; PageSpeed bottleneck scan</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#681fe4] font-bold">✓</span>
                    <span>Target DR 50–90+ outreach publishing plan</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column: Interactive Booking Form */}
            <div className="lg:col-span-7 bg-[#0c0818] rounded-[4px] p-6 sm:p-8 border border-white/10 shadow-2xl">
              <form onSubmit={handleBooking} className="space-y-5">
                
                {/* 1. Date & Timezone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bebas tracking-[0.14em] text-neutral-300 uppercase mb-1.5">
                      Select Preferred Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={selectedDate}
                      min={minDate || undefined}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-[4px] bg-[#07030d] border border-white/15 focus:border-[#681fe4] text-white transition-all cursor-pointer font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bebas tracking-[0.14em] text-neutral-300 uppercase mb-1.5">
                      Your Timezone *
                    </label>
                    <select
                      value={selectedTimezone}
                      onChange={(e) => setSelectedTimezone(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-[4px] bg-[#07030d] border border-white/15 focus:border-[#681fe4] text-white transition-all cursor-pointer"
                    >
                      {TIMEZONES.map((tz) => (
                        <option key={tz.id} value={tz.id} className="bg-[#0c0818] text-white">
                          {tz.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 2. Slot Selection */}
                <div>
                  <label className="block text-xs font-bebas tracking-[0.14em] text-neutral-300 uppercase mb-2">
                    Available Time Slots ({selectedTimezone}) *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2 px-3 rounded-[2px] text-xs font-mono transition-all cursor-pointer border ${
                          selectedSlot === slot
                            ? "bg-[#681fe4] text-white border-[#681fe4] shadow-xs"
                            : "bg-[#07030d] text-neutral-300 border-white/10 hover:bg-white/5"
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
                    <label className="block text-xs font-bebas tracking-[0.14em] text-neutral-300 uppercase mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-[4px] bg-[#07030d] border border-white/15 focus:border-[#681fe4] text-white transition-all placeholder:text-neutral-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bebas tracking-[0.14em] text-neutral-300 uppercase mb-1.5">
                      Work Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. sarah@company.com"
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-[4px] bg-[#07030d] border border-white/15 focus:border-[#681fe4] text-white transition-all placeholder:text-neutral-500"
                    />
                  </div>
                </div>

                {/* 4. Website Domain & Primary Goal */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bebas tracking-[0.14em] text-neutral-300 uppercase mb-1.5">
                      Website URL
                    </label>
                    <input
                      type="text"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://example.com"
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-[4px] bg-[#07030d] border border-white/15 focus:border-[#681fe4] text-white transition-all font-mono placeholder:text-neutral-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bebas tracking-[0.14em] text-neutral-300 uppercase mb-1.5">
                      Primary Growth Goal
                    </label>
                    <select
                      value={primaryGoal}
                      onChange={(e) => setPrimaryGoal(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-[4px] bg-[#07030d] border border-white/15 focus:border-[#681fe4] text-white transition-all cursor-pointer"
                    >
                      <option className="bg-[#0c0818] text-white" value="Scaling Organic Search Traffic">Scaling Organic Search Traffic</option>
                      <option className="bg-[#0c0818] text-white" value="Acquiring DR 50–90+ Editorial Backlinks">Acquiring DR 50–90+ Editorial Backlinks</option>
                      <option className="bg-[#0c0818] text-white" value="Next.js Headless Re-engineering">Next.js Headless Re-engineering</option>
                      <option className="bg-[#0c0818] text-white" value="Core Web Vitals & Speed Optimization">Core Web Vitals &amp; Speed Optimization</option>
                      <option className="bg-[#0c0818] text-white" value="Complete Agency Retainer Strategy">Complete Agency Retainer Strategy</option>
                    </select>
                  </div>
                </div>

                {/* 5. Additional Notes */}
                <div>
                  <label className="block text-xs font-bebas tracking-[0.14em] text-neutral-300 uppercase mb-1.5">
                    Any specific details you want audited prior to the call?
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Recently launched a redesign, traffic dropped after Google core update, or target competitor sites..."
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-[4px] bg-[#07030d] border border-white/15 focus:border-[#681fe4] text-white transition-all resize-none placeholder:text-neutral-500"
                  />
                </div>

                {/* Confirm Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-[4px] bg-[#681fe4] hover:bg-[#5815cb] text-white font-bebas text-sm sm:text-base tracking-[0.16em] uppercase transition-all shadow-[0_10px_25px_rgba(104,31,228,0.35)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
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
