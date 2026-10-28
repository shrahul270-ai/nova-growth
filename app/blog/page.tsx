"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeaderBackgroundAnimation from "../components/HeaderBackgroundAnimation";
import { blogPosts } from "./blogData";

export default function BlogPage() {
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("" );
  const [toast, setToast] = useState<string | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState<string>("");
  const [newsletterSuccess, setNewsletterSuccess] = useState<boolean>(false);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSuccess(true);
    showToast("🎉 Successfully subscribed to Nova Growth Insights!");
  };

  const filteredPosts = blogPosts.filter((post) => {
    const matchesFilter = filter === "all" || post.categoryGroup === filter;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const featuredPost = filteredPosts[0] || blogPosts[0];
  const regularPosts = filteredPosts.slice(1);

  return (
    <div className="relative min-h-screen bg-[#f8fbf9] text-[#111827] overflow-hidden selection:bg-[#d97706] selection:text-white">
      <div className="curved-ribbon-left" aria-hidden="true" />
      <div className="curved-ribbon-right" aria-hidden="true" />

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-24 right-6 z-50 bg-[#091427] text-white border border-[#d97706]/60 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-fadeIn text-xs font-semibold backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-ping" />
          <span>{toast}</span>
          <button onClick={() => setToast(null)} className="ml-2 text-gray-400 hover:text-white text-xs cursor-pointer">✕</button>
        </div>
      )}

      <Navbar activePage="blog" />

      {/* Hero Header with Animated Background */}
      <section className="relative pt-10 pb-8 sm:pt-16 sm:pb-12 px-4 sm:px-6 md:px-12 text-center max-w-4xl mx-auto z-10 overflow-hidden">
        <HeaderBackgroundAnimation variant="subpage" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-xs font-semibold text-[#091427] mb-4 badge-3d">
            <span className="w-2 h-2 rounded-full bg-[#d97706]" />
            <span>Growth Marketing Insights &amp; SEO Strategy</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#0f172a] tracking-tight leading-[1.1] mb-5 sm:mb-6">
            Actionable Guides for <br className="hidden sm:inline" />
            <span className="text-gradient-navy-gold">Global Search Dominance</span>
          </h1>
          <p className="text-sm sm:text-lg text-[#475569] leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
            Data-backed playbooks, Core Web Vitals engineering, and high-DA link acquisition strategies curated for ambitious international brands.
          </p>
        </div>

        {/* Live Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
          <div className="relative w-full">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Search articles (e.g. Next.js, SEO, Backlinks)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 text-base sm:text-sm outline-none focus:border-[#d97706] focus:ring-1 focus:ring-[#d97706] bg-white shadow-xs"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {[
            { id: "all", label: "All Insights" },
            { id: "seo", label: "International SEO" },
            { id: "dev", label: "Next.js & Engineering" },
            { id: "marketing", label: "Email & Conversion" },
            { id: "ai", label: "Google AI & SGE" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setFilter(cat.id);
                showToast(`Filtered by ${cat.label}`);
              }}
              className={`px-3.5 sm:px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filter === cat.id
                  ? "bg-[#091427] text-white shadow-sm shadow-[#091427]/30"
                  : "bg-white text-gray-600 hover:text-[#091427] border border-gray-200/80 hover:bg-gray-50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Article */}
      {featuredPost && (
        <section className="relative py-6 px-4 sm:px-6 md:px-12 z-10 max-w-7xl mx-auto">
          <Link
            href={`/blog/${featuredPost.id}`}
            className="bg-white rounded-3xl p-5 sm:p-8 md:p-12 border border-gray-100 shadow-sm card-3d grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center cursor-pointer group block"
          >
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-amber-50 text-amber-800 text-xs font-bold px-3 py-1 rounded-full border border-amber-200/80">
                  {featuredPost.category}
                </span>
                <span className="text-xs text-gray-400 font-medium">{featuredPost.readTime}</span>
                <span className="text-xs text-gray-400 font-medium">• {featuredPost.date}</span>
                <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                  Featured
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight leading-snug mb-4 group-hover:text-[#091427] transition-colors cursor-pointer">
                {featuredPost.title}
              </h2>
              <p className="text-sm text-[#475569] leading-relaxed mb-6 font-normal">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#091427] text-[#d97706] border border-[#d97706]/30 font-bold text-xs flex items-center justify-center">
                    NG
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-[#0f172a] block">{featuredPost.author}</span>
                    <span className="text-gray-400">{featuredPost.authorRole}</span>
                  </div>
                </div>
                <span className="btn-gold-3d text-xs font-bold text-white bg-[#d97706] hover:bg-[#b45309] px-4 py-2 rounded-full flex items-center gap-1.5 transition-all">
                  <span>Read Full Article</span>
                  <span>→</span>
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 bg-gradient-to-tr from-amber-50 via-slate-50 to-blue-50/50 rounded-2xl h-64 flex flex-col items-center justify-center p-6 border border-amber-200/60 text-center">
              <span className="text-5xl mb-3">📈</span>
              <span className="text-sm font-bold text-slate-800">Organic Growth Blueprint</span>
              <span className="text-xs text-[#d97706] font-semibold mt-1">E-Commerce &amp; B2B Focus</span>
              {featuredPost.statBadge && (
                <div className="mt-3 px-3.5 py-1 bg-white rounded-full border border-amber-200 text-xs font-bold text-[#091427]">
                  {featuredPost.statBadge.value} {featuredPost.statBadge.label}
                </div>
              )}
            </div>
          </Link>
        </section>
      )}

      {/* Article Grid */}
      <section className="relative py-8 sm:py-12 px-4 sm:px-6 md:px-12 z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs card-3d flex flex-col justify-between cursor-pointer group animate-fadeIn block"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-amber-50 text-amber-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-amber-200/60">
                    {post.category}
                  </span>
                  <span className="text-[11px] text-gray-400 font-medium">{post.readTime}</span>
                </div>

                <h3 className="text-lg font-bold text-[#0f172a] tracking-tight mb-2.5 group-hover:text-[#091427] transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-[#64748b] leading-relaxed mb-6 font-normal">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-gray-700 font-bold block">{post.author}</span>
                  <span className="text-gray-400 text-[10px]">{post.date}</span>
                </div>
                <span className="text-[#d97706] font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>Read article</span>
                  <span>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="relative py-16 px-6 md:px-12 z-10 max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-[#091427] via-[#0f213d] to-[#1e293b] rounded-3xl p-8 sm:p-12 text-white text-center border border-[#d97706]/40 shadow-xl">
          <span className="text-xs font-bold text-[#d97706] uppercase tracking-wider block mb-2">
            Stay Ahead of Google Updates
          </span>
          <h2 className="text-2xl sm:text-3xl font-black mb-3">
            Get Bi-Weekly Digital Growth Breakdowns
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mb-6">
            Zero fluff. Just tested search optimization tactics, algorithm shifts, and high-converting Next.js frameworks delivered to your inbox.
          </p>

          {newsletterSuccess ? (
            <div className="bg-emerald-500/20 border border-emerald-400 text-emerald-200 py-3 px-6 rounded-2xl max-w-md mx-auto text-xs font-bold">
              ✓ You&apos;re subscribed! Look out for our upcoming search breakdown.
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                required
                type="email"
                placeholder="Enter your corporate email..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-2xl text-xs text-white bg-slate-900 border border-slate-700 focus:border-[#d97706] outline-none"
              />
              <button
                type="submit"
                className="btn-gold-3d bg-[#d97706] hover:bg-[#b45309] text-white text-xs font-bold px-6 py-3 rounded-2xl shadow-md transition-all cursor-pointer whitespace-nowrap"
              >
                Subscribe Free →
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
