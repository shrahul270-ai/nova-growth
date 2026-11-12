"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import VexorBlogHero from "../components/VexorBlogHero";
import { blogPosts } from "./blogData";

export default function BlogClient() {
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [toast, setToast] = useState<string | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState<string>("");
  const [newsletterSuccess, setNewsletterSuccess] = useState<boolean>(false);

  const postsPerPage = 6;

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSuccess(true);
    showToast("🎉 Subscribed to Balaji Prime Media Insights!");
  };

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesFilter = filter === "all" || post.categoryGroup === filter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q) ||
        post.author.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [filter, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / postsPerPage));
  const activePageNum = Math.min(currentPage, totalPages);
  const paginatedPosts = useMemo(() => {
    const start = (activePageNum - 1) * postsPerPage;
    return filteredPosts.slice(start, start + postsPerPage);
  }, [filteredPosts, activePageNum, postsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const target = document.getElementById("articles-grid");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#060112] text-white selection:bg-[#A068FF] selection:text-white overflow-hidden">
      {/* Subtle Ambient Radial Glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(160, 104, 255, 0.25), transparent 70%), radial-gradient(circle at 10% 40%, rgba(99, 102, 241, 0.15), transparent 50%), radial-gradient(circle at 90% 70%, rgba(168, 85, 247, 0.15), transparent 50%)",
        }}
        aria-hidden="true"
      />

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-24 right-6 z-50 bg-[#0d0726]/95 text-white border border-purple-500/50 px-5 py-3 rounded-2xl shadow-[0_10px_35px_rgba(160,104,255,0.4)] flex items-center gap-3 animate-fadeIn text-xs font-semibold backdrop-blur-xl">
          <span className="w-2 h-2 rounded-full bg-[#A068FF] animate-ping" />
          <span>{toast}</span>
          <button
            onClick={() => setToast(null)}
            className="ml-2 text-slate-400 hover:text-white text-xs cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* 100% Transparent Glassmorphic Navbar Overlay */}
      <div className="absolute top-0 left-0 right-0 z-40 bg-transparent pointer-events-auto">
        <Navbar activePage="blog" />
      </div>

      {/* Vexor Blog Hero Header (Clean, Static) */}
      <VexorBlogHero
        onSearch={(q) => {
          setSearchQuery(q);
          setCurrentPage(1);
        }}
        searchQuery={searchQuery}
      />

      {/* Blog Articles Section (Mirrored from girlmuseum.org/blog clean card grid) */}
      <section
        id="articles-grid"
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
      >
        {/* Category Filters & Live Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10 pb-6 border-b border-purple-500/20">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "All Insights" },
              { id: "seo", label: "International SEO" },
              { id: "dev", label: "Next.js & Engineering" },
              { id: "marketing", label: "Email & Retention" },
              { id: "ai", label: "Google AI & SGE" },
            ].map((cat) => {
              const isSelected = filter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setFilter(cat.id);
                    setCurrentPage(1);
                    showToast(`Filtered by ${cat.label}`);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(160,104,255,0.45)] border border-purple-400/50"
                      : "bg-[#0d0726]/70 text-slate-300 hover:text-white border border-purple-500/20 hover:border-purple-500/40 hover:bg-white/[0.05]"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Input Box */}
          <div className="relative w-full md:w-72">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-9 py-2 rounded-full text-xs text-white bg-[#0d0726]/80 border border-purple-500/25 focus:border-[#A068FF] focus:outline-none focus:ring-1 focus:ring-[#A068FF] placeholder:text-slate-400 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* 3-Column Blog Grid (like girlmuseum.org/blog) */}
        {paginatedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedPosts.map((post) => (
              <article
                key={post.id}
                className="group bg-[#0d0726]/80 hover:bg-[#130a38]/90 border border-purple-500/20 hover:border-[#A068FF]/60 rounded-3xl overflow-hidden backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(160,104,255,0.22)] transition-all duration-300 flex flex-col justify-between"
              >
                {/* 1. Cover Image (aspect 16:10 like girlmuseum.org et_pb_image_container) */}
                <Link
                  href={`/blog/${post.id}`}
                  prefetch={false}
                  className="block overflow-hidden relative aspect-[16/10] bg-slate-900/60"
                >
                  <img
                    src={
                      post.coverImage ||
                      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
                    }
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <span className="absolute top-3.5 left-3.5 text-[11px] font-bold bg-[#090422]/90 text-[#d8b4fe] border border-purple-500/40 px-3 py-1 rounded-full backdrop-blur-md shadow-lg">
                    {post.category}
                  </span>
                </Link>

                {/* 2. Content Body */}
                <div className="p-6 flex flex-col flex-1">
                  {/* Meta info: Date & Reading time (like girlmuseum post-meta) */}
                  <div className="flex items-center gap-2 text-[12px] text-purple-300/70 mb-3 font-medium">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                    {post.tag && (
                      <>
                        <span>•</span>
                        <span className="text-[#A068FF]">{post.tag}</span>
                      </>
                    )}
                  </div>

                  {/* Title (like girlmuseum entry-title) */}
                  <h2 className="text-xl font-bold text-white group-hover:text-[#A068FF] transition-colors leading-snug line-clamp-2 mb-3">
                    <Link href={`/blog/${post.id}`} prefetch={false} className="hover:underline">
                      {post.title}
                    </Link>
                  </h2>

                  {/* Excerpt (like girlmuseum post-content) */}
                  <p className="text-[13.5px] text-slate-300/80 line-clamp-3 leading-relaxed mb-6 font-normal">
                    {post.excerpt}
                  </p>

                  {/* 3. Card Footer: Author & read more link (mirroring girlmuseum.org read more ») */}
                  <div className="pt-4 border-t border-purple-500/15 flex items-center justify-between text-xs mt-auto">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-bold text-[11px] flex items-center justify-center shadow-md border border-purple-400/30">
                        {post.author.slice(0, 1)}
                      </div>
                      <span className="text-slate-300 text-xs font-medium">{post.author}</span>
                    </div>

                    <Link
                      href={`/blog/${post.id}`}
                      prefetch={false}
                      className="text-[#c084fc] group-hover:text-white font-semibold flex items-center gap-1.5 transition-colors text-xs"
                    >
                      <span>read more</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-[#0d0726]/40 rounded-3xl border border-purple-500/20 p-8">
            <span className="text-4xl block mb-3">🔍</span>
            <h3 className="text-xl font-bold text-white mb-2">No matching articles found</h3>
            <p className="text-xs text-slate-400 mb-6">
              Try searching for different keywords or reset your category filter.
            </p>
            <button
              onClick={() => {
                setFilter("all");
                setSearchQuery("");
                setCurrentPage(1);
              }}
              className="px-5 py-2 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Pagination Controls (mirroring girlmuseum.org « Newer Entries / Older Entries ») */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-12 pt-8 border-t border-purple-500/20">
            <button
              type="button"
              disabled={activePageNum === 1}
              onClick={() => handlePageChange(activePageNum - 1)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activePageNum === 1
                  ? "opacity-40 cursor-not-allowed text-slate-500 border border-transparent"
                  : "bg-[#0d0726] text-white hover:bg-purple-900/40 border border-purple-500/30 cursor-pointer"
              }`}
            >
              <span>«</span>
              <span>Newer Entries</span>
            </button>

            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                const isActive = pageNum === activePageNum;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? "bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(160,104,255,0.4)] border border-purple-400/50"
                        : "bg-[#0d0726] text-slate-300 hover:text-white border border-purple-500/20 hover:border-purple-500/40"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              disabled={activePageNum === totalPages}
              onClick={() => handlePageChange(activePageNum + 1)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activePageNum === totalPages
                  ? "opacity-40 cursor-not-allowed text-slate-500 border border-transparent"
                  : "bg-[#0d0726] text-white hover:bg-purple-900/40 border border-purple-500/30 cursor-pointer"
              }`}
            >
              <span>Older Entries</span>
              <span>»</span>
            </button>
          </div>
        )}
      </section>

      {/* Newsletter Signup in Balaji Prime Luxury Violet Theme */}
      <section className="relative py-16 px-6 md:px-12 z-10 max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-[#0d0726] via-[#150a38] to-[#0d0726] rounded-3xl p-8 sm:p-12 text-white text-center border border-purple-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(160,104,255,0.15)]">
          <span className="text-xs font-bold text-[#A068FF] uppercase tracking-wider block mb-2">
            Stay Ahead of Google Algorithm Updates
          </span>
          <h2 className="text-2xl sm:text-3xl font-black mb-3 text-white">
            Get Bi-Weekly Digital Growth Breakdowns
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mb-6">
            Zero fluff. Real search optimization tactics, DR 50-90+ backlink strategies, and high-converting Next.js engineering delivered to your inbox.
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
                className="flex-1 px-4 py-3 rounded-2xl text-xs text-white bg-[#060112] border border-purple-500/30 focus:border-[#A068FF] outline-none"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold px-6 py-3 rounded-2xl shadow-[0_0_20px_rgba(160,104,255,0.4)] transition-all cursor-pointer whitespace-nowrap"
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
