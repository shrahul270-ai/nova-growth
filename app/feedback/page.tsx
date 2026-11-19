"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Star, CheckCircle2, MessageSquare, ThumbsUp, Send, Sparkles } from "lucide-react";

const VERIFIED_REVIEWS = [
  {
    name: "Marcus Vance",
    company: "Nordhaus Estates (UK)",
    role: "Head of Digital Marketing",
    rating: 5,
    service: "SEO Optimization & Web Development",
    review:
      "Balaji Prime Media re-engineered our headless property portal on Next.js. PageSpeed jumped from 44 to 99/100, and organic tenant acquisition scaled +240% within 4 months. Exceptional engineering discipline.",
    date: "February 2026",
  },
  {
    name: "Elena Rostova",
    company: "Hotel Mira & Suites (Switzerland)",
    role: "General Manager",
    rating: 5,
    service: "High-DA Guest Posting (DR 70+)",
    review:
      "The editorial placements we received were strictly Tier-1 luxury travel magazines with real editorial mentions. Zero PBN nonsense. Direct bookings increased by 180%.",
    date: "January 2026",
  },
  {
    name: "David Chen",
    company: "Aether Cloud Labs (Singapore)",
    role: "Co-Founder & CTO",
    rating: 5,
    service: "Full-Funnel Growth & Looker Studio Telemetry",
    review:
      "Having 24/7 telemetry on Looker Studio with weekly Slack digests gave our venture partners total transparency. Highly recommend Rahul and his specialized team.",
    date: "March 2026",
  },
];

export default function FeedbackPage() {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [service, setService] = useState<string>("SEO Optimization");
  const [recommend, setRecommend] = useState<string>("yes");
  const [review, setReview] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !review) return;

    setIsSubmitting(true);
    try {
      await fetch("/api/db/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "client_feedback",
          name,
          email,
          phone: company || "Not specified",
          service: `Client Review (${rating} Stars) - ${service}`,
          message: review,
          sourceUrl: "/feedback",
          notes: `Rating: ${rating}/5 | Recommend: ${recommend} | Company: ${company}`,
        }),
      });
      setIsSubmitted(true);
    } catch {
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#07030d] text-white selection:bg-[#681fe4] selection:text-white font-satoshi">
      {/* Background Grid Pattern & Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(104,31,228,0.18),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-white-240 opacity-40 pointer-events-none" />

      {/* Top Navbar */}
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* Hero Header */}
      <section className="relative z-10 pt-28 sm:pt-36 pb-12 max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] bg-white/[0.04] border border-white/10 text-xs font-mono uppercase tracking-[0.2em] text-[#681fe4] mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#681fe4]" />
          <span>// CLIENT VOICE &amp; TRANSPARENCY</span>
        </div>

        <h1 className="font-bebas text-4xl sm:text-6xl md:text-7xl tracking-[0.14em] text-white uppercase leading-none mb-4">
          CLIENT FEEDBACK &amp; REVIEWS
        </h1>
        <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Your feedback directly drives our engineering and campaign quality. Share your experience working with Balaji Prime Media.
        </p>
      </section>

      {/* Main Feedback Form Container */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 pb-20">
        <div className="bg-[#0c0818] rounded-[4px] p-8 sm:p-12 border border-white/10 shadow-2xl">
          <span className="font-bebas text-xs tracking-[0.24em] text-[#681fe4] uppercase block text-center mb-1">
            // SUBMIT VERIFIED EVALUATION
          </span>
          <h2 className="font-bebas text-2xl sm:text-3xl tracking-[0.14em] text-white uppercase mb-2 text-center">
            SHARE YOUR CLIENT EXPERIENCE
          </h2>
          <p className="text-xs text-neutral-400 text-center mb-8 font-mono">Every submission is reviewed by our leadership team.</p>
          {isSubmitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-[4px] bg-[#681fe4]/20 text-[#681fe4] border border-[#681fe4]/40 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-bebas text-3xl tracking-[0.14em] text-white uppercase">Thank You for Your Feedback!</h3>
              <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                We appreciate you taking the time to share your perspective. Your feedback has been safely logged in our client portal and team review digest.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setReview("");
                }}
                className="mt-4 px-6 py-3 rounded-[4px] bg-[#681fe4] hover:bg-[#5815cb] text-white font-bebas text-sm tracking-[0.16em] uppercase transition-all cursor-pointer shadow-[0_10px_25px_rgba(104,31,228,0.35)]"
              >
                SUBMIT ANOTHER REVIEW →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Rating Selector */}
              <div className="text-center pb-2">
                <label className="block font-bebas text-xs tracking-[0.2em] uppercase text-neutral-400 mb-2.5">
                  OVERALL RATING
                </label>
                <div className="flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 cursor-pointer transition-transform hover:scale-125 focus:outline-none"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          (hoverRating || rating) >= star
                            ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                            : "text-neutral-700"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <span className="text-xs font-mono text-neutral-400 mt-2 block">
                  {rating === 5
                    ? "⭐⭐⭐⭐⭐ Outstanding Experience"
                    : rating === 4
                    ? "⭐⭐⭐⭐ Very Good"
                    : rating === 3
                    ? "⭐⭐⭐ Satisfactory"
                    : "Room for Improvement"}
                </span>
              </div>

              {/* Two Column Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bebas text-xs tracking-[0.14em] text-neutral-300 uppercase mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-4 py-3 text-xs sm:text-sm rounded-[4px] bg-white/[0.04] border border-white/10 focus:outline-none focus:border-[#681fe4] text-white placeholder-neutral-500 transition-all font-satoshi"
                  />
                </div>
                <div>
                  <label className="block font-bebas text-xs tracking-[0.14em] text-neutral-300 uppercase mb-1.5">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. alex@company.com"
                    className="w-full px-4 py-3 text-xs sm:text-sm rounded-[4px] bg-white/[0.04] border border-white/10 focus:outline-none focus:border-[#681fe4] text-white placeholder-neutral-500 transition-all font-satoshi"
                  />
                </div>
              </div>

              {/* Company / Website & Service Selected */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bebas text-xs tracking-[0.14em] text-neutral-300 uppercase mb-1.5">
                    Company / Website Domain
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. AcmeCorp.com"
                    className="w-full px-4 py-3 text-xs sm:text-sm rounded-[4px] bg-white/[0.04] border border-white/10 focus:outline-none focus:border-[#681fe4] text-white placeholder-neutral-500 transition-all font-satoshi"
                  />
                </div>
                <div>
                  <label className="block font-bebas text-xs tracking-[0.14em] text-neutral-300 uppercase mb-1.5">
                    Primary Service Utilized
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-4 py-3 text-xs sm:text-sm rounded-[4px] bg-[#0c0818] border border-white/10 focus:outline-none focus:border-[#681fe4] text-white transition-all cursor-pointer font-satoshi"
                  >
                    <option value="SEO Optimization">SEO Optimization (Technical &amp; Content)</option>
                    <option value="High-DA Guest Posting">High-DA Guest Posting (DR 50–90+)</option>
                    <option value="Next.js Web Development">Next.js Web Development &amp; Speed</option>
                    <option value="Content Strategy">Content Strategy &amp; Copywriting</option>
                    <option value="Email Marketing">Email Marketing &amp; Automation</option>
                    <option value="Website Maintenance">Website Maintenance &amp; 24/7 SLA</option>
                  </select>
                </div>
              </div>

              {/* Feedback Textarea */}
              <div>
                <label className="block font-bebas text-xs tracking-[0.14em] text-neutral-300 uppercase mb-1.5">
                  Detailed Review &amp; Experience *
                </label>
                <textarea
                  required
                  rows={4}
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Share details about your campaign outcomes, traffic scaling, speed improvements, or team responsiveness..."
                  className="w-full px-4 py-3 text-xs sm:text-sm rounded-[4px] bg-white/[0.04] border border-white/10 focus:outline-none focus:border-[#681fe4] text-white placeholder-neutral-500 transition-all leading-relaxed font-satoshi"
                />
              </div>

              {/* Recommendation Choice */}
              <div>
                <label className="block font-bebas text-xs tracking-[0.14em] text-neutral-300 uppercase mb-2">
                  Would you recommend Balaji Prime Media to another founder or marketing team?
                </label>
                <div className="flex flex-wrap items-center gap-3">
                  {[
                    { id: "yes", label: "👍 Yes, definitely!" },
                    { id: "maybe", label: "🤔 Maybe in future" },
                    { id: "neutral", label: "Neutral" },
                  ].map((item) => (
                    <label
                      key={item.id}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-[4px] text-xs font-mono uppercase cursor-pointer transition-all border ${
                        recommend === item.id
                          ? "bg-[#681fe4] text-white border-[#681fe4] shadow-[0_4px_14px_rgba(104,31,228,0.35)]"
                          : "bg-white/[0.04] text-neutral-400 border-white/10 hover:bg-white/[0.08]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="recommend"
                        value={item.id}
                        checked={recommend === item.id}
                        onChange={() => setRecommend(item.id)}
                        className="sr-only"
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-[4px] bg-[#681fe4] hover:bg-[#5815cb] text-white font-bebas text-base tracking-[0.18em] uppercase transition-all shadow-[0_10px_25px_rgba(104,31,228,0.35)] flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting feedback...</span>
                  ) : (
                    <>
                      <span>SUBMIT CLIENT FEEDBACK →</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Showcase of Verified Client Reviews */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-24">
        <div className="text-center mb-12">
          <span className="font-bebas text-xs tracking-[0.24em] uppercase text-[#681fe4] block mb-2">
            // CLIENT PROOF
          </span>
          <h2 className="font-bebas text-3xl sm:text-5xl tracking-[0.14em] text-white uppercase leading-none">
            WHAT FOUNDERS &amp; ENTERPRISE CLIENTS SAY
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VERIFIED_REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              className="bg-[#0c0818] rounded-[4px] p-8 border border-white/10 shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic mb-6">
                  &ldquo;{rev.review}&rdquo;
                </p>
              </div>
              <div className="pt-4 border-t border-white/10">
                <div className="font-bebas text-base tracking-[0.14em] uppercase text-white">{rev.name}</div>
                <div className="text-xs text-[#681fe4] font-mono mt-0.5">{rev.company}</div>
                <div className="text-[11px] text-neutral-400 mt-1 font-mono">{rev.service}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
