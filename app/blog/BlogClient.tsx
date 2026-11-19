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
    <div className="relative min-h-screen bg-[#07030d] text-white selection:bg-[#681fe4] selection:text-white font-satoshi overflow-hidden">
      {/* Background Grid Pattern & Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(104,31,228,0.18),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-white-240 opacity-40 pointer-events-none" />

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-24 right-6 z-50 bg-[#0c0818] text-white border border-[#681fe4]/50 px-5 py-3 rounded-[4px] shadow-[0_10px_35px_rgba(104,31,228,0.4)] flex items-center gap-3 text-xs font-mono uppercase tracking-[0.14em] backdrop-blur-xl">
          <span className="w-2 h-2 rounded-full bg-[#681fe4] animate-ping" />
          <span>{toast}</span>
          <button
            onClick={() => setToast(null)}
            className="ml-2 text-neutral-400 hover:text-white text-xs cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Top Navbar */}
      <div className="relative z-50">
        <Navbar activePage="blog" />
      </div>

      {/* Vexor Blog Hero Header */}
      <VexorBlogHero
        onSearch={(q) => {
          setSearchQuery(q);
          setCurrentPage(1);
        }}
        searchQuery={searchQuery}
      />

      {/* Blog Articles Section */}
      <section
        id="articles-grid"
        className="relative z-10 max-w-[1320px] mx-auto px-6 sm:px-12 py-16"
      >
        {/* Category Filters & Live Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12 pb-8 border-b border-white/10">
          {/* Category Filter Pills in Sharp 4px Geometry */}
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
                  className={`px-4 py-2 rounded-[4px] font-bebas text-xs tracking-[0.16em] uppercase transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-[#681fe4] text-white shadow-[0_4px_14px_rgba(104,31,228,0.35)] border border-[#681fe4]"
                      : "bg-[#0c0818] text-neutral-400 hover:text-white border border-white/10 hover:border-white/20"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Input Box */}
          <div className="relative w-full md:w-80">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 text-xs">
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
              className="w-full pl-9 pr-8 py-2.5 rounded-[4px] text-xs text-white bg-[#0c0818] border border-white/10 focus:border-[#681fe4] focus:outline-none placeholder:text-neutral-500 font-satoshi transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* 3-Column Blog Grid with Grayscale Treatment */}
        {paginatedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedPosts.map((post) => (
              <article
                key={post.id}
                className="group bg-[#0c0818] hover:bg-[#100b22] border border-white/10 hover:border-[#681fe4]/50 rounded-[4px] overflow-hidden shadow-lg hover:shadow-[0_20px_40px_rgba(104,31,228,0.2)] transition-all duration-300 flex flex-col justify-between"
              >
                {/* 1. Cover Image with Grayscale Filter */}
                <Link
                  href={`/blog/${post.id}`}
                  prefetch={false}
                  className="block overflow-hidden relative aspect-[16/10] bg-black"
                >
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 text-[10px] font-mono uppercase tracking-[0.14em] bg-[#07030d]/90 text-[#681fe4] border border-white/10 px-2.5 py-1 rounded-[2px] shadow-sm">
                    {post.category}
                  </span>
                </Link>

                {/* 2. Content Body */}
                <div className="p-6 flex flex-col flex-1">
                  {/* Meta info: Date & Reading time */}
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-3">
                    <time dateTime={post.isoDate}>{post.date}</time>
                    <span>•</span>
                    <span>{post.readTime}</span>
                    {post.tag && (
                      <>
                        <span>•</span>
                        <span className="text-[#681fe4]">{post.tag}</span>
                      </>
                    )}
                  </div>

                  {/* Title in Bebas Neue */}
                  <h2 className="font-bebas text-2xl tracking-[0.14em] uppercase text-white group-hover:text-[#681fe4] transition-colors leading-tight line-clamp-2 mb-3">
                    <Link href={`/blog/${post.id}`} prefetch={false} className="hover:underline">
                      {post.title}
                    </Link>
                  </h2>

                  {/* Excerpt */}
                  <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed mb-6 font-normal">
                    {post.excerpt}
                  </p>

                  {/* 3. Card Footer */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs mt-auto">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-[2px] bg-[#681fe4] text-white font-bebas text-xs flex items-center justify-center">
                        {post.author.slice(0, 1)}
                      </div>
                      <span className="text-neutral-300 text-xs font-mono">{post.author}</span>
                    </div>

                    <Link
                      href={`/blog/${post.id}`}
                      prefetch={false}
                      className="font-bebas text-xs tracking-[0.16em] uppercase text-[#681fe4] group-hover:text-white flex items-center gap-1.5 transition-colors"
                    >
                      <span>READ MORE</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-[#0c0818] rounded-[4px] border border-white/10 p-8">
            <span className="text-4xl block mb-3">🔍</span>
            <h3 className="font-bebas text-2xl tracking-[0.14em] uppercase text-white mb-2">No matching articles found</h3>
            <p className="text-xs text-neutral-400 mb-6 font-mono">
              Try searching for different keywords or reset your category filter.
            </p>
            <button
              onClick={() => {
                setFilter("all");
                setSearchQuery("");
                setCurrentPage(1);
              }}
              className="px-6 py-3 rounded-[4px] bg-[#681fe4] hover:bg-[#5815cb] text-white font-bebas text-xs tracking-[0.16em] uppercase transition-colors"
            >
              RESET FILTERS →
            </button>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-14 pt-8 border-t border-white/10">
            <button
              type="button"
              disabled={activePageNum === 1}
              onClick={() => handlePageChange(activePageNum - 1)}
              className={`px-4 py-2.5 rounded-[4px] font-bebas text-xs tracking-[0.14em] uppercase transition-all flex items-center gap-1.5 ${
                activePageNum === 1
                  ? "opacity-40 cursor-not-allowed text-neutral-600 border border-white/5"
                  : "bg-[#0c0818] text-white hover:bg-[#681fe4] border border-white/10 cursor-pointer"
              }`}
            >
              <span>«</span>
              <span>NEWER ENTRIES</span>
            </button>

            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                const isActive = pageNum === activePageNum;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-9 h-9 rounded-[4px] font-bebas text-xs tracking-[0.1em] transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#681fe4] text-white shadow-[0_4px_14px_rgba(104,31,228,0.35)] border border-[#681fe4]"
                        : "bg-[#0c0818] text-neutral-400 hover:text-white border border-white/10"
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
              className={`px-4 py-2.5 rounded-[4px] font-bebas text-xs tracking-[0.14em] uppercase transition-all flex items-center gap-1.5 ${
                activePageNum === totalPages
                  ? "opacity-40 cursor-not-allowed text-neutral-600 border border-white/5"
                  : "bg-[#0c0818] text-white hover:bg-[#681fe4] border border-white/10 cursor-pointer"
              }`}
            >
              <span>OLDER ENTRIES</span>
              <span>»</span>
            </button>
          </div>
        )}
      </section>

      {/* Newsletter Signup */}
      <section className="relative py-20 px-6 sm:px-12 z-10 max-w-[1320px] mx-auto">
        <div className="bg-[#0c0818] rounded-[4px] p-8 sm:p-14 text-white text-center border border-white/10 shadow-2xl">
          <span className="font-bebas text-xs tracking-[0.24em] text-[#681fe4] uppercase block mb-2">
            // INTEL BRIEFING
          </span>
          <h2 className="font-bebas text-3xl sm:text-5xl tracking-[0.14em] mb-3 text-white uppercase leading-none">
            GET BI-WEEKLY DIGITAL GROWTH BREAKDOWNS
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto mb-8 font-normal leading-relaxed">
            Zero fluff. Real search optimization tactics, DR 50-90+ backlink strategies, and high-converting Next.js engineering delivered to your inbox.
          </p>

          {newsletterSuccess ? (
            <div className="bg-[#681fe4]/20 border border-[#681fe4]/40 text-white py-3 px-6 rounded-[4px] max-w-md mx-auto font-bebas text-xs tracking-[0.14em] uppercase">
              ✓ You&apos;re subscribed! Look out for our upcoming search breakdown.
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                required
                type="email"
                placeholder="ENTER WORK EMAIL"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-[4px] text-xs text-white bg-white/[0.04] border border-white/10 focus:border-[#681fe4] outline-none font-bebas tracking-[0.14em]"
              />
              <button
                type="submit"
                className="bg-[#681fe4] hover:bg-[#5815cb] text-white font-bebas text-xs tracking-[0.16em] uppercase px-6 py-3 rounded-[4px] shadow-[0_10px_25px_rgba(104,31,228,0.35)] transition-all cursor-pointer whitespace-nowrap"
              >
                SUBSCRIBE FREE →
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
