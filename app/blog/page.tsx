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
    categoryGroup: "seo",
    author: "Growth Strategy Team",
    date: "Oct 2026",
    readTime: "7 min read",
    tag: "Case Study",
    featured: true,
    fullContent: [
      "For international e-commerce founders targeting the US and UK markets, paid advertising costs (CAC) have climbed over 42% year-over-year. Relying entirely on Meta and Google Ads creates razor-thin margins that vanish when budgets halt.",
      "The highest-leverage growth engine in 2025 is topical collection SEO. By restructuring flat product taxonomies into semantic keyword clusters and serving server-rendered Next.js pages with sub-second TTFB, organic search indexation jumps by 400%.",
      "Key execution pillar: Ensure every category page features custom buyer guides, automated Product & AggregateRating schema, and zero empty faceted navigation crawl traps."
    ],
    takeaways: [
      "Drop TTFB below 150ms using edge-cached Next.js App Router",
      "Inject automated Schema JSON-LD for rich product snippet stars",
      "Build high-intent comparison matrices ('Brand A vs Brand B')"
    ]
  },
  {
    id: "nextjs-vs-wordpress",
    title: "Why Modern Next.js Outperforms Traditional WordPress for Google Core Web Vitals",
    excerpt:
      "Comparing TTFB, Largest Contentful Paint (LCP), and Cumulative Layout Shift (CLS) across enterprise platforms and why Google algorithms favor server-rendered frameworks.",
    category: "Web Development",
    categoryGroup: "dev",
    author: "Engineering Lead",
    date: "Sep 2026",
    readTime: "5 min read",
    tag: "Technical SEO",
    featured: false,
    fullContent: [
      "Google's 2024 Core Web Vitals update made page speed and layout stability direct ranking factors. Traditional monolithic CMS platforms like standard WordPress load dozens of bloated plugin scripts, causing LCP delays of 3.8s+ on mobile.",
      "By transitioning to Next.js with React Server Components (RSC), heavy JavaScript execution is handled on the server, sending zero-bundle pure HTML to foreign visitors on mobile networks.",
      "The result is a consistent 98+ PageSpeed Insights score, lower bounce rates, and preferential Google ranking in competitive English-speaking markets."
    ],
    takeaways: [
      "Eliminate client-side plugin bloat via server components",
      "Preload fonts and critical hero assets for zero layout shift (CLS < 0.05)",
      "Deploy on edge networks near US/European end users"
    ]
  },
  {
    id: "international-link-building",
    title: "The 2025 High-DA Link Building Playbook: Manual Outreach vs. Automated PBNs",
    excerpt:
      "Why foreign enterprises are abandoning automated backlink tools in favor of targeted digital PR, journalist source queries, and authoritative niche publications.",
    category: "Off-Page SEO",
    categoryGroup: "seo",
    author: "Link Building Specialist",
    date: "Sep 2026",
    readTime: "6 min read",
    tag: "Authority Growth",
    featured: false,
    fullContent: [
      "Google's algorithmic spam updates have aggressively penalized artificial link networks (PBNs) and automated reciprocal guest post schemes.",
      "Sustainable domain authority (DA) now demands genuine editorial citations. Our team focuses on data-driven PR campaigns, proprietary industry surveys, and reactive commentary for journalists in the US and UK.",
      "One contextual placement in a Forbes, TechCrunch, or niche trade journal transfers 50x more authority than hundreds of low-tier directory backlinks."
    ],
    takeaways: [
      "Prioritize contextual editorial backlinks from DA 50+ sites",
      "Publish original proprietary data that industry bloggers cite",
      "Reclaim unlinked brand mentions across international press"
    ]
  },
  {
    id: "google-maps-local-seo",
    title: "Dominating Google Maps in the US & UK: The Complete Local SEO Blueprint",
    excerpt:
      "How multi-location service providers rank in the top 3 Google Map pack using local citation clustering and high-velocity customer review velocity.",
    category: "Local SEO",
    categoryGroup: "seo",
    author: "Local Search Lead",
    date: "Aug 2026",
    readTime: "4 min read",
    tag: "Local Growth",
    featured: false,
    fullContent: [
      "For high-ticket local practices like dental clinics, law firms, and private healthcare, over 65% of all inbound calls originate directly from the Google 3-Pack Maps preview.",
      "Dominating these rankings requires consistent NAP (Name, Address, Phone) citation parity across local directories and active geotagged review velocity.",
      "Combined with localized landing pages targeting specific neighborhoods, businesses reliably achieve #1 positions within 60 to 90 days."
    ],
    takeaways: [
      "Ensure 100% NAP consistency across top 30 local directories",
      "Embed local schema markup with geographic coordinate tags",
      "Implement automated review follow-ups post customer service"
    ]
  },
  {
    id: "shopify-email-automation",
    title: "5 Klaviyo Automation Flows That Generate 30% of Total Store Revenue on Autopilot",
    excerpt:
      "From high-converting abandoned checkout sequences to predictive post-purchase replenishment triggers, here are the proven email workflows.",
    category: "Email Marketing",
    categoryGroup: "marketing",
    author: "Lifecycle Marketer",
    date: "Aug 2026",
    readTime: "8 min read",
    tag: "Retention",
    featured: false,
    fullContent: [
      "Acquiring foreign customers via search is only half the battle; maximizing lifetime value (LTV) through automated email sequences is where enterprise profitability is forged.",
      "We analyze consumer browsing behaviors to deploy dynamic multi-step Klaviyo workflows: Welcome series, high-intent browse abandonment, abandoned cart recovery, and post-purchase replenishment reminders.",
      "These automated funnels operate 24/7 without recurring ad costs, contributing between 28% and 38% of total e-commerce monthly revenue."
    ],
    takeaways: [
      "Trigger browse abandonment within 2 hours of site exit",
      "Segment buyers by average order value (AOV) for VIP perks",
      "A/B test plain-text personal founder emails vs heavy HTML graphics"
    ]
  },
  {
    id: "ai-search-overviews",
    title: "Optimizing for Google AI Overviews & Search Generative Experience (SGE)",
    excerpt:
      "How to format structured data, concise definitions, and authoritative citations so your brand is cited as the primary source in Google's AI answers.",
    category: "Search Strategy",
    categoryGroup: "ai",
    author: "SEO Director",
    date: "Jul 2026",
    readTime: "6 min read",
    tag: "AI & Search",
    featured: false,
    fullContent: [
      "Google AI Overviews now answer complex multi-step queries at the very top of search engine result pages (SERPs).",
      "To be cited as the AI summary source, content must be formatted with clear informational answers, bulleted summary blocks, and backed by verifiable author expertise (E-E-A-T).",
      "Sites that adapt early gain massive authority badges and direct referral traffic from Google's generative answers."
    ],
    takeaways: [
      "Provide direct 40-word definition answers under H2 headers",
      "Publish structured comparison tables that AI models can scrape",
      "Strengthen verified author schema and editorial credentials"
    ]
  },
];

export default function BlogPage() {
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeArticle, setActiveArticle] = useState<typeof blogPosts[0] | null>(null);
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
    <div className="relative min-h-screen bg-[#f8fbf9] text-[#111827] overflow-hidden">
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

      {/* Hero Header */}
      <section className="relative pt-16 pb-12 px-6 md:px-12 text-center max-w-4xl mx-auto z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-xs font-semibold text-[#091427] mb-4">
          <span className="w-2 h-2 rounded-full bg-[#d97706]" />
          <span>Nova Growth Insights &amp; Research</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0f172a] tracking-tight leading-[1.1] mb-6">
          Insights for <br />
          <span className="text-gradient-navy-gold">High-Growth Companies</span>
        </h1>
        <p className="text-base sm:text-lg text-[#475569] leading-relaxed max-w-2xl mx-auto mb-8">
          Actionable tactics on international SEO, Next.js web architecture, and organic customer acquisition strategies that work in today&apos;s Google ecosystem.
        </p>

        {/* Search Bar & Filter Chips */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-2xl mx-auto mb-4">
          <div className="relative w-full sm:flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔎</span>
            <input
              type="text"
              placeholder="Search articles by keyword (e.g. Next.js, SEO, Klaviyo)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 text-xs sm:text-sm bg-white outline-none focus:border-[#d97706] shadow-xs"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="inline-flex flex-wrap justify-center p-1.5 bg-white rounded-2xl border border-gray-200/80 shadow-xs gap-1 max-w-2xl mx-auto">
          {[
            { id: "all", label: "All Topics" },
            { id: "seo", label: "SEO Strategy" },
            { id: "dev", label: "Next.js Web Dev" },
            { id: "marketing", label: "Email & Retention" },
            { id: "ai", label: "Google AI & SGE" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setFilter(cat.id);
                showToast(`Topic: ${cat.label} selected`);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filter === cat.id
                  ? "bg-[#091427] text-white shadow-sm"
                  : "text-[#54647c] hover:text-[#091427] hover:bg-gray-50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Article */}
      {featuredPost && (
        <section className="relative py-6 px-6 md:px-12 z-10 max-w-7xl mx-auto">
          <div
            onClick={() => {
              setActiveArticle(featuredPost);
              showToast(`Opened: ${featuredPost.title}`);
            }}
            className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm card-hover grid grid-cols-1 lg:grid-cols-12 gap-8 items-center cursor-pointer group"
          >
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-amber-50 text-amber-800 text-xs font-bold px-3 py-1 rounded-full border border-amber-200/80">
                  {featuredPost.category}
                </span>
                <span className="text-xs text-gray-400 font-medium">{featuredPost.readTime}</span>
                <span className="text-xs text-gray-400 font-medium">• {featuredPost.date}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight leading-snug mb-4 group-hover:text-[#091427] transition-colors cursor-pointer">
                {featuredPost.title}
              </h2>
              <p className="text-sm text-[#475569] leading-relaxed mb-6">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#091427] text-[#d97706] border border-[#d97706]/30 font-bold text-xs flex items-center justify-center">
                    NG
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-[#0f172a] block">{featuredPost.author}</span>
                    <span className="text-gray-400">Nova Growth Research</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#091427] group-hover:text-[#d97706] flex items-center gap-1 transition-colors">
                  <span>Read Full Article</span>
                  <span>→</span>
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 bg-gradient-to-tr from-amber-50 via-slate-50 to-blue-50/50 rounded-2xl h-64 flex flex-col items-center justify-center p-6 border border-amber-200/60 text-center">
              <span className="text-5xl mb-3">📈</span>
              <span className="text-sm font-bold text-slate-800">Organic Growth Blueprint</span>
              <span className="text-xs text-[#d97706] font-semibold mt-1">E-Commerce &amp; B2B Focus</span>
            </div>
          </div>
        </section>
      )}

      {/* Article Grid */}
      <section className="relative py-12 px-6 md:px-12 z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => {
                setActiveArticle(post);
                showToast(`Opened: ${post.title}`);
              }}
              className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs card-hover flex flex-col justify-between cursor-pointer group animate-fadeIn"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-amber-50 text-amber-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-amber-200/60">
                    {post.category}
                  </span>
                  <span className="text-[11px] text-gray-400 font-medium">{post.readTime}</span>
                </div>

                <h3 className="text-lg font-bold text-[#0f172a] tracking-tight mb-2.5 group-hover:text-[#091427] transition-colors cursor-pointer leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-[#64748b] leading-relaxed mb-6">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-gray-500 font-medium">{post.author}</span>
                <span className="text-[#d97706] font-bold group-hover:underline cursor-pointer flex items-center gap-1">
                  <span>Read article</span>
                  <span>→</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Interactive Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-100 relative text-left max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center text-sm font-bold cursor-pointer"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-3">
              <span className="bg-amber-50 text-amber-800 text-xs font-bold px-3 py-1 rounded-full border border-amber-200/80">
                {activeArticle.category}
              </span>
              <span className="text-xs text-gray-400">• {activeArticle.readTime}</span>
              <span className="text-xs text-gray-400">• Published {activeArticle.date}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight leading-snug mb-3">
              {activeArticle.title}
            </h3>

            <div className="flex items-center gap-3 pb-5 mb-6 border-b border-gray-100">
              <div className="w-10 h-10 rounded-full bg-[#091427] text-[#d97706] border border-[#d97706]/30 font-bold text-xs flex items-center justify-center">
                NG
              </div>
              <div className="text-xs">
                <span className="font-bold text-[#0f172a] block">{activeArticle.author}</span>
                <span className="text-gray-500">Nova Growth Strategist Review</span>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#475569] leading-relaxed mb-6">
              {activeArticle.fullContent.map((para, pIdx) => (
                <p key={pIdx}>{para}</p>
              ))}
            </div>

            {/* Key Takeaways Box */}
            <div className="bg-[#f8fafd] p-5 rounded-2xl border border-[#d97706]/30 mb-6 text-xs">
              <h4 className="font-bold text-[#091427] uppercase tracking-wider mb-2.5">
                ⚡ Key Strategic Takeaways for Your Brand:
              </h4>
              <ul className="space-y-2">
                {activeArticle.takeaways.map((item, tIdx) => (
                  <li key={tIdx} className="flex items-start gap-2 text-[#0f172a] font-medium">
                    <span className="text-[#d97706] font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
              <Link
                href="/contact"
                className="flex-1 bg-[#091427] hover:bg-[#0f213d] text-white font-bold py-3.5 px-6 rounded-2xl text-xs transition-all shadow-md shadow-[#091427]/25 text-center cursor-pointer"
              >
                Hire Nova Growth to Implement This →
              </Link>
              <button
                onClick={() => setActiveArticle(null)}
                className="px-5 py-3.5 rounded-2xl text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Newsletter Signup */}
      <section className="relative py-16 px-6 md:px-12 z-10 max-w-4xl mx-auto text-center">
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-amber-200/60 shadow-sm">
          <span className="text-xs font-bold text-[#091427] uppercase tracking-wider">
            Stay Ahead of Google Updates
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight mt-2 mb-3">
            Join 3,500+ Founders &amp; Marketing Leaders
          </h2>
          <p className="text-xs sm:text-sm text-[#64748b] max-w-md mx-auto mb-6">
            Get our bi-weekly breakdown of international SEO experiments, Core Web Vitals changes, and algorithmic shifts.
          </p>

          {newsletterSuccess ? (
            <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl text-center max-w-md mx-auto animate-fadeIn">
              <div className="text-2xl mb-1">🎉</div>
              <h4 className="text-sm font-bold text-[#091427]">You&apos;re Subscribed!</h4>
              <p className="text-xs text-[#54647c] mt-1 mb-3">
                Check your inbox for our 2025 International Growth Checklist.
              </p>
              <button
                onClick={() => {
                  showToast("📥 Simulated PDF Checklist download started!");
                }}
                className="bg-[#091427] hover:bg-[#0f213d] text-white text-xs font-bold px-5 py-2.5 rounded-xl cursor-pointer"
              >
                Download SEO Checklist PDF 📄
              </button>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                required
                type="email"
                placeholder="Enter your business email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-full border border-gray-200 text-xs outline-none focus:border-[#d97706]"
              />
              <button
                type="submit"
                className="bg-[#091427] hover:bg-[#0f213d] text-white text-xs font-bold px-6 py-3 rounded-full transition-colors cursor-pointer"
              >
                Subscribe Free
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
