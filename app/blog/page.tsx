"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const blogPosts = [
  {
    id: "ecommerce-seo-scaling",
    title: "How US E-Commerce Brands Scale Organic Revenue by 300% Without Increasing Ad Spend",
    excerpt:
      "A deep dive into collection page internal linking, long-tail product queries, and Core Web Vitals optimization that drove 340% organic revenue lift.",
    category: "E-Commerce SEO",
    author: "Growth Strategy Team",
    date: "Oct 2026",
    readTime: "7 min read",
    tag: "Case Study",
    featured: true,
  },
  {
    id: "nextjs-vs-wordpress",
    title: "Why Modern Next.js Outperforms Traditional WordPress for Google Core Web Vitals",
    excerpt:
      "Comparing TTFB, Largest Contentful Paint (LCP), and Cumulative Layout Shift (CLS) across enterprise platforms and why Google algorithms favor server-rendered frameworks.",
    category: "Web Development",
    author: "Engineering Lead",
    date: "Sep 2026",
    readTime: "5 min read",
    tag: "Technical SEO",
    featured: false,
  },
  {
    id: "international-link-building",
    title: "The 2025 High-DA Link Building Playbook: Manual Outreach vs. Automated PBNs",
    excerpt:
      "Why foreign enterprises are abandoning automated backlink tools in favor of targeted digital PR, journalist source queries, and authoritative niche publications.",
    category: "Off-Page SEO",
    author: "Link Building Specialist",
    date: "Sep 2026",
    readTime: "6 min read",
    tag: "Authority Growth",
    featured: false,
  },
  {
    id: "google-maps-local-seo",
    title: "Dominating Google Maps in the US & UK: The Complete Local SEO Blueprint",
    excerpt:
      "How multi-location service providers rank in the top 3 Google Map pack using local citation clustering and high-velocity customer review velocity.",
    category: "Local SEO",
    author: "Local Search Lead",
    date: "Aug 2026",
    readTime: "4 min read",
    tag: "Local Growth",
    featured: false,
  },
  {
    id: "shopify-email-automation",
    title: "5 Klaviyo Automation Flows That Generate 30% of Total Store Revenue on Autopilot",
    excerpt:
      "From high-converting abandoned checkout sequences to predictive post-purchase replenishment triggers, here are the proven email workflows.",
    category: "Email Marketing",
    author: "Lifecycle Marketer",
    date: "Aug 2026",
    readTime: "8 min read",
    tag: "Retention",
    featured: false,
  },
  {
    id: "ai-search-overviews",
    title: "Optimizing for Google AI Overviews & Search Generative Experience (SGE)",
    excerpt:
      "How to format structured data, concise definitions, and authoritative citations so your brand is cited as the primary source in Google's AI answers.",
    category: "Search Strategy",
    author: "SEO Director",
    date: "Jul 2026",
    readTime: "6 min read",
    tag: "AI & Search",
    featured: false,
  },
];

export default function BlogPage() {
  const featuredPost = blogPosts[0];
  const regularPosts = blogPosts.slice(1);

  return (
    <div className="relative min-h-screen bg-[#f8fbf9] text-[#111827] overflow-hidden">
      <div className="curved-ribbon-left" aria-hidden="true" />
      <div className="curved-ribbon-right" aria-hidden="true" />

      <Navbar activePage="blog" />

      {/* Hero Header */}
      <section className="relative pt-16 pb-12 px-6 md:px-12 text-center max-w-4xl mx-auto z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-[#061c14] mb-4">
          <span className="w-2 h-2 rounded-full bg-[#10b981]" />
          <span>Nova Growth Insights</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0f172a] tracking-tight leading-[1.1] mb-6">
          Insights for <br />
          <span className="text-gradient-emerald">High-Growth Companies</span>
        </h1>
        <p className="text-base sm:text-lg text-[#475569] leading-relaxed max-w-2xl mx-auto mb-6">
          Actionable tactics on international SEO, Next.js web architecture, and organic customer acquisition strategies that work in today&apos;s Google ecosystem.
        </p>
      </section>

      {/* Featured Article */}
      <section className="relative py-6 px-6 md:px-12 z-10 max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm card-hover grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
                {featuredPost.category}
              </span>
              <span className="text-xs text-gray-400 font-medium">{featuredPost.readTime}</span>
              <span className="text-xs text-gray-400 font-medium">• {featuredPost.date}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight leading-snug mb-4 hover:text-[#061c14] transition-colors cursor-pointer">
              {featuredPost.title}
            </h2>
            <p className="text-sm text-[#475569] leading-relaxed mb-6">
              {featuredPost.excerpt}
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                NG
              </div>
              <div className="text-xs">
                <span className="font-bold text-[#0f172a] block">{featuredPost.author}</span>
                <span className="text-gray-400">Nova Growth Research</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-tr from-emerald-100 via-teal-50 to-indigo-100 rounded-2xl h-64 flex flex-col items-center justify-center p-6 border border-emerald-100 text-center">
            <span className="text-5xl mb-3">📈</span>
            <span className="text-sm font-bold text-slate-800">Organic Growth Blueprint</span>
            <span className="text-xs text-emerald-700 font-semibold mt-1">E-Commerce &amp; B2B Focus</span>
          </div>
        </div>
      </section>

      {/* Article Grid */}
      <section className="relative py-12 px-6 md:px-12 z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs card-hover flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-emerald-50 text-emerald-700 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-[11px] text-gray-400 font-medium">{post.readTime}</span>
                </div>

                <h3 className="text-lg font-bold text-[#0f172a] tracking-tight mb-2.5 hover:text-[#061c14] transition-colors cursor-pointer leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-[#64748b] leading-relaxed mb-6">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-gray-500 font-medium">{post.author}</span>
                <span className="text-emerald-700 font-bold hover:underline cursor-pointer">
                  Read article →
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="relative py-16 px-6 md:px-12 z-10 max-w-4xl mx-auto text-center">
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-emerald-100 shadow-sm">
          <span className="text-xs font-bold text-[#061c14] uppercase tracking-wider">
            Stay Ahead of Google Updates
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight mt-2 mb-3">
            Join 3,500+ Founders &amp; Marketing Leaders
          </h2>
          <p className="text-xs sm:text-sm text-[#64748b] max-w-md mx-auto mb-6">
            Get our bi-weekly breakdown of international SEO experiments, Core Web Vitals changes, and algorithmic shifts.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you for subscribing to Nova Growth Insights!");
            }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              required
              type="email"
              placeholder="Enter your business email"
              className="flex-1 px-4 py-3 rounded-full border border-gray-200 text-xs outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              className="bg-[#061c14] hover:bg-[#0a2e21] text-white text-xs font-bold px-6 py-3 rounded-full transition-colors cursor-pointer"
            >
              Subscribe Free
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
