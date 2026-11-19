"use client";

import React, { useState, useMemo } from "react";
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, Check, X, Sparkles } from "lucide-react";

interface ScheduleConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

const TIME_SLOTS = [
  "10:00 AM",
  "11:30 AM",
  "01:30 PM",
  "03:00 PM",
  "04:30 PM",
  "06:00 PM",
  "07:30 PM",
];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const DAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export default function ScheduleConsultationModal({
  isOpen,
  onClose,
  initialService = "All Services / Full Growth Plan",
}: ScheduleConsultationModalProps) {
  // Safe SSR initial dates (deterministic for prerendering)
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date("2026-11-06T00:00:00Z"));
  const [currentMonthDate, setCurrentMonthDate] = useState<Date>(() => new Date("2026-11-01T00:00:00Z"));
  const [todayDate, setTodayDate] = useState<Date>(() => new Date("2026-11-05T00:00:00Z"));
  const [selectedTime, setSelectedTime] = useState<string>("03:00 PM");

  // Client hydration effect to update dates to real local user time
  React.useEffect(() => {
    const now = new Date();
    const nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 1);
    if (nextDay.getDay() === 0) nextDay.setDate(nextDay.getDate() + 1);

    setTodayDate(now);
    setSelectedDate(nextDay);
    setCurrentMonthDate(new Date(nextDay.getFullYear(), nextDay.getMonth(), 1));
  }, []);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [service, setService] = useState(initialService);
  const [rememberMe, setRememberMe] = useState(true);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Sync initialService if changed
  React.useEffect(() => {
    if (initialService) setService(initialService);
  }, [initialService]);

  // Handle escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Calendar Calculations
  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();

  const daysInMonth = useMemo(() => {
    return new Date(year, month + 1, 0).getDate();
  }, [year, month]);

  const firstDayOfWeek = useMemo(() => {
    return new Date(year, month, 1).getDay();
  }, [year, month]);

  const prevMonth = () => {
    setCurrentMonthDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonthDate(new Date(year, month + 1, 1));
  };

  const isPast = (dayNumber: number) => {
    const checkDate = new Date(year, month, dayNumber, 23, 59, 59);
    return checkDate < todayDate;
  };

  const isSelected = (dayNumber: number) => {
    return (
      selectedDate.getFullYear() === year &&
      selectedDate.getMonth() === month &&
      selectedDate.getDate() === dayNumber
    );
  };

  const handleSelectDay = (dayNumber: number) => {
    if (isPast(dayNumber)) return;
    const newDate = new Date(year, month, dayNumber);
    setSelectedDate(newDate);
  };

  // Format formatted readable date
  const formattedSelectedDate = useMemo(() => {
    return selectedDate.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, [selectedDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/db/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "consultation_modal",
          name: name || "Strategy Call Inquirer",
          email,
          phone,
          website: website || "Not specified",
          service: service || "All Services",
          sourceUrl: typeof window !== "undefined" ? window.location.pathname : "/",
          message: `Scheduled Consultation: ${formattedSelectedDate} at ${selectedTime}. Focus: ${service}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit inquiry. Please try again.");
      }

      setFormStatus("success");
      setTimeout(() => {
        // Auto reset after 4s
      }, 4000);
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMessage(error.message || "An unexpected error occurred.");
      setFormStatus("idle");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md animate-fadeIn overflow-y-auto"
    >
      {/* Outer Card with Ambient Lavender & Gold Glow */}
      <div className="relative w-full max-w-4xl bg-[#0c0d15]/95 backdrop-blur-2xl border border-white/15 rounded-[26px] sm:rounded-[32px] shadow-[0_25px_80px_rgba(0,0,0,0.85)] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Ambient lighting effects inside modal */}
        <div
          aria-hidden="true"
          className="absolute -top-28 -left-20 w-80 h-80 rounded-full bg-violet-600/20 blur-[90px] pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute top-1/2 -right-20 w-80 h-80 rounded-full bg-amber-500/15 blur-[100px] pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-20 left-1/3 w-80 h-80 rounded-full bg-indigo-500/15 blur-[90px] pointer-events-none"
        />

        {/* Modal Top Bar */}
        <div className="relative px-5 sm:px-8 pt-5 sm:pt-6 pb-4 border-b border-white/10 flex items-center justify-between z-10 shrink-0">
          <div className="flex items-center gap-3">
            {/* Geometric Emblem (like Image 2 reference) */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500/30 to-amber-500/30 border border-white/20 flex items-center justify-center p-1.5 shadow-inner">
              <svg viewBox="0 0 40 40" className="w-full h-full text-white fill-current">
                <rect x="6" y="6" width="11" height="11" rx="2.5" className="fill-violet-300" />
                <rect x="23" y="6" width="11" height="11" rx="2.5" className="fill-amber-300" />
                <rect x="6" y="23" width="11" height="11" rx="2.5" className="fill-amber-300" />
                <rect x="23" y="23" width="11" height="11" rx="2.5" className="fill-violet-300" />
              </svg>
            </div>
            <div>
              <span className="text-[11px] font-bold tracking-wider text-amber-400 uppercase flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                Balaji Prime Media
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-tight">
                Schedule a Consultation
              </h2>
            </div>
          </div>

          {/* Close Pill Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="relative p-5 sm:p-8 overflow-y-auto z-10 flex-1">
          {formStatus === "success" ? (
            /* Success State */
            <div className="py-10 px-4 text-center max-w-md mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400/20 to-violet-500/30 border border-amber-400/40 text-amber-300 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/10">
                <Check className="w-8 h-8 stroke-[2.5]" />
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Consultation Reserved!
              </h3>
              <p className="text-sm text-slate-300 mt-2 mb-6 leading-relaxed">
                Thank you, <strong className="text-white">{name || "there"}</strong>. We have booked your strategy session for:
              </p>

              <div className="bg-white/[0.06] border border-white/15 rounded-2xl p-4 mb-6 text-left">
                <div className="flex items-center gap-2.5 text-amber-300 font-semibold text-sm mb-1">
                  <CalendarIcon className="w-4 h-4" />
                  <span>{formattedSelectedDate}</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-300 text-xs mb-2">
                  <Clock className="w-4 h-4 text-violet-400" />
                  <span>{selectedTime} (Confirmed)</span>
                </div>
                <div className="text-[11.5px] text-slate-400 border-t border-white/10 pt-2 mt-2">
                  A meeting link &amp; calendar invite will be delivered to <strong className="text-white">{email}</strong> within 1 hour.
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-3.5 px-6 rounded-full font-bold text-sm bg-white hover:bg-slate-100 text-slate-950 transition-all shadow-lg cursor-pointer"
              >
                Done &amp; Return to Website
              </button>
            </div>
          ) : (
            /* 2-Column Responsive Layout: Calendar (Left) + Glass Form (Right) */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              
              {/* COLUMN 1: INTERACTIVE CALENDAR & TIME SLOTS (5 cols) */}
              <div className="lg:col-span-5 bg-white/[0.03] border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col gap-4">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Select Meeting Date
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">Step 1 of 2</span>
                </div>

                {/* Month Navigator */}
                <div className="flex items-center justify-between px-1">
                  <h4 className="text-sm font-bold text-white tracking-wide">
                    {MONTH_NAMES[month]} {year}
                  </h4>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={prevMonth}
                      aria-label="Previous month"
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer border border-white/10"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={nextMonth}
                      aria-label="Next month"
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer border border-white/10"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Calendar Days Table */}
                <div>
                  {/* Weekday headers */}
                  <div className="grid grid-cols-7 gap-1 text-center mb-1.5">
                    {DAY_NAMES.map((d) => (
                      <span key={d} className="text-[11px] font-semibold text-slate-400 py-1">
                        {d}
                      </span>
                    ))}
                  </div>

                  {/* Day cells grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {/* Empty padding days */}
                    {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                      <div key={`empty-${i}`} className="h-8 w-8" />
                    ))}

                    {/* Active days */}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const dayNumber = i + 1;
                      const past = isPast(dayNumber);
                      const selected = isSelected(dayNumber);

                      return (
                        <button
                          key={dayNumber}
                          type="button"
                          disabled={past}
                          onClick={() => handleSelectDay(dayNumber)}
                          className={`h-8 w-8 rounded-lg text-xs font-medium flex items-center justify-center transition-all mx-auto cursor-pointer ${
                            selected
                              ? "bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/25 ring-2 ring-white/60"
                              : past
                              ? "text-slate-600 cursor-not-allowed opacity-40"
                              : "text-slate-200 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          {dayNumber}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Slot Picker */}
                <div className="pt-3 border-t border-white/10">
                  <div className="flex items-center gap-2 mb-2.5">
                    <Clock className="w-3.5 h-3.5 text-violet-400" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Available Time (IST / EST)
                    </span>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-3 gap-1.5">
                    {TIME_SLOTS.map((slot) => {
                      const isSlotActive = selectedTime === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTime(slot)}
                          className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold transition-all cursor-pointer text-center ${
                            isSlotActive
                              ? "bg-violet-600 text-white border border-violet-400 shadow-sm shadow-violet-500/30"
                              : "bg-white/[0.04] text-slate-300 hover:bg-white/10 hover:text-white border border-white/10"
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Selected Summary Pill */}
                <div className="bg-gradient-to-r from-violet-950/40 to-amber-950/30 border border-white/10 rounded-xl p-2.5 text-[11px] text-slate-300 flex items-center justify-between">
                  <span className="text-slate-400">Selected Slot:</span>
                  <span className="font-bold text-amber-300">
                    {formattedSelectedDate} • {selectedTime}
                  </span>
                </div>
              </div>

              {/* COLUMN 2: AESTHETIC GLASS FORM (7 cols) - Styled exactly to user reference */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="mb-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      Step into Growth!
                    </h3>
                    <p className="text-xs sm:text-[13px] text-slate-300/80 mt-1">
                      Fill in your details to secure this strategy call slot with our lead engineer.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="mb-4 p-3 rounded-xl bg-red-950/50 border border-red-500/50 text-red-200 text-xs">
                      {errorMessage}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                    {/* Name */}
                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1 cursor-pointer">
                        Full Name *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Rahul Sharma"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-white placeholder-slate-400/60 text-sm focus:border-amber-400 focus:bg-white/[0.08] focus:ring-1 focus:ring-amber-400/40 outline-none transition-all cursor-pointer"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1 cursor-pointer">
                        Work / Personal Email *
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="test@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-white placeholder-slate-400/60 text-sm focus:border-amber-400 focus:bg-white/[0.08] focus:ring-1 focus:ring-amber-400/40 outline-none transition-all cursor-pointer"
                      />
                    </div>

                    {/* Phone & Website (Side by side on larger screens) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-medium text-slate-300 block mb-1 cursor-pointer">
                          WhatsApp / Phone *
                        </label>
                        <input
                          required
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-white placeholder-slate-400/60 text-sm focus:border-amber-400 focus:bg-white/[0.08] focus:ring-1 focus:ring-amber-400/40 outline-none transition-all cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-slate-300 block mb-1 cursor-pointer">
                          Website or Brand URL
                        </label>
                        <input
                          type="text"
                          placeholder="https://yoursite.com"
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-white placeholder-slate-400/60 text-sm focus:border-amber-400 focus:bg-white/[0.08] focus:ring-1 focus:ring-amber-400/40 outline-none transition-all cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Target Service Select */}
                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1 cursor-pointer">
                        Primary Goal / Service Focus
                      </label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#141622] border border-white/15 text-white text-sm focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40 outline-none transition-all cursor-pointer"
                      >
                        <option value="All Services / Full Growth Plan">All Services / Full Growth Plan</option>
                        <option value="SEO Optimization (Global & Local)">SEO Optimization (Global & Local)</option>
                        <option value="Website Development (Next.js / Headless)">Website Development (Next.js / Headless)</option>
                        <option value="Guest Posting & DR 50+ Backlinks">Guest Posting & DR 50+ Backlinks</option>
                        <option value="Content Strategy & Copywriting">Content Strategy & Copywriting</option>
                        <option value="Email Marketing & Automation">Email Marketing & Automation</option>
                        <option value="Page Speed & Maintenance Fix">Page Speed & Maintenance Fix</option>
                      </select>
                    </div>

                    {/* Stay Signed in / Remember details Checkbox (Image 2 style) */}
                    <div className="flex items-center justify-between pt-1">
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="w-4 h-4 rounded accent-violet-600 bg-white/10 border-white/20 cursor-pointer"
                        />
                        <span className="text-xs text-slate-300">
                          Receive calendar reminder on WhatsApp
                        </span>
                      </label>

                      <span className="text-[11px] text-slate-400 hidden sm:inline">
                        100% Free Consultation
                      </span>
                    </div>

                    {/* Main Action Pill Button (Image 2 Sign In Button Style) */}
                    <button
                      type="submit"
                      disabled={formStatus === "submitting"}
                      className="w-full mt-2 py-3.5 px-6 rounded-full font-bold text-sm bg-white hover:bg-slate-100 text-slate-950 transition-all shadow-xl shadow-white/15 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] disabled:opacity-50"
                    >
                      {formStatus === "submitting" ? (
                        <>
                          <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                          <span>Booking Consultation...</span>
                        </>
                      ) : (
                        <>
                          <span>Confirm &amp; Schedule Call</span>
                          <span className="text-base">→</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
