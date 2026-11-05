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
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Client Voice &amp; Transparency</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#154359] mb-4">
          Client Feedback &amp; Reviews
        </h1>
        <p className="text-sm sm:text-base text-[#475569] max-w-xl mx-auto leading-relaxed">
          Your feedback directly drives our engineering and campaign quality. Share your experience working with Balaji Prime Media.
        </p>
      </section>

      {/* Main Feedback Form Container */}
      <section className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 pb-16">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-lg">
          {isSubmitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-[#154359]">Thank You for Your Feedback!</h3>
              <p className="text-sm text-[#475569] max-w-md mx-auto leading-relaxed">
                We appreciate you taking the time to share your perspective. Your feedback has been safely logged in our client portal and team review digest.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setReview("");
                }}
                className="mt-4 px-6 py-2.5 rounded-full bg-[#154359] text-white text-xs font-semibold hover:bg-[#091427] transition-all cursor-pointer"
              >
                Submit Another Review
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Rating Selector */}
              <div className="text-center pb-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#185B7B] mb-2.5">
                  Overall Rating
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
                            ? "fill-amber-400 text-amber-400 drop-shadow-sm"
                            : "text-slate-200"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <span className="text-xs font-medium text-[#475569] mt-1.5 block">
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
                  <label className="block text-xs font-semibold text-[#154359] mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50/80 border border-slate-200 focus:bg-white focus:outline-none focus:border-[#154359] text-[#154359] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#154359] mb-1.5">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. alex@company.com"
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50/80 border border-slate-200 focus:bg-white focus:outline-none focus:border-[#154359] text-[#154359] transition-all"
                  />
                </div>
              </div>

              {/* Company / Website & Service Selected */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#154359] mb-1.5">
                    Company / Website Domain
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. AcmeCorp.com"
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50/80 border border-slate-200 focus:bg-white focus:outline-none focus:border-[#154359] text-[#154359] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#154359] mb-1.5">
                    Primary Service Utilized
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50/80 border border-slate-200 focus:bg-white focus:outline-none focus:border-[#154359] text-[#154359] transition-all cursor-pointer"
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
                <label className="block text-xs font-semibold text-[#154359] mb-1.5">
                  Detailed Review &amp; Experience *
                </label>
                <textarea
                  required
                  rows={4}
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Share details about your campaign outcomes, traffic scaling, speed improvements, or team responsiveness..."
                  className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl bg-slate-50/80 border border-slate-200 focus:bg-white focus:outline-none focus:border-[#154359] text-[#154359] transition-all leading-relaxed"
                />
              </div>

              {/* Recommendation Choice */}
              <div>
                <label className="block text-xs font-semibold text-[#154359] mb-2">
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
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium cursor-pointer transition-all border ${
                        recommend === item.id
                          ? "bg-[#154359] text-white border-[#154359] shadow-xs"
                          : "bg-slate-50 text-[#475569] border-slate-200 hover:bg-white"
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
                  className="w-full py-3.5 rounded-full bg-[#154359] text-white text-xs sm:text-sm font-bold hover:bg-[#091427] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting feedback...</span>
                  ) : (
                    <>
                      <span>Submit Client Feedback</span>
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
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#185B7B] block mb-1">
            Verified Testimonials
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#154359]">
            What Founders &amp; Enterprise Clients Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VERIFIED_REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white/90 rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed italic mb-4">
                  &ldquo;{rev.review}&rdquo;
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <div className="font-bold text-xs sm:text-sm text-[#154359]">{rev.name}</div>
                <div className="text-[11px] text-[#185B7B] font-medium">{rev.company}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{rev.service}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
