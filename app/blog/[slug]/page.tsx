import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import FaqAccordion from "../../components/FaqAccordion";
import { blogPosts, BlogPost } from "../blogData";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.id === slug);

  if (!post) {
    return {
      title: "Article Not Found | Balaji Prime Media",
    };
  }

  return {
    title: `${post.title} | Balaji Prime Media`,
    description: post.excerpt,
    alternates: {
      canonical: `https://balajiprimemedia.in/blog/${post.id}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url:
            post.coverImage ||
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.id === slug);

  if (!post) {
    notFound();
  }

  const currentIndex = blogPosts.findIndex((p) => p.id === post.id);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;
  const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

  const postUrl = `https://balajiprimemedia.in/blog/${post.id}`;
  const encodedUrl = encodeURIComponent(postUrl);
  const encodedTitle = encodeURIComponent(post.title);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage || "https://balajiprimemedia.in/images/bpm-complete-logo.png",
    author: {
      "@type": "Person",
      name: post.author,
      jobTitle: post.authorRole,
    },
    publisher: {
      "@type": "Organization",
      name: "Balaji Prime Media",
      logo: {
        "@type": "ImageObject",
        url: "https://balajiprimemedia.in/images/bpm-complete-logo.png",
      },
    },
    datePublished: post.date,
  };

  return (
    <div className="relative min-h-screen bg-[#060112] text-white selection:bg-[#A068FF] selection:text-white overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Subtle Ambient Violet Radial Glows */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(160, 104, 255, 0.25), transparent 70%), radial-gradient(circle at 10% 40%, rgba(99, 102, 241, 0.15), transparent 50%), radial-gradient(circle at 90% 70%, rgba(168, 85, 247, 0.15), transparent 50%)",
        }}
        aria-hidden="true"
      />

      {/* 2-Tier Transparent Header */}
      <div className="relative z-40 bg-transparent">
        <Navbar activePage="blog" />
      </div>

      {/* Main Single Article Wrapper (mirroring girlmuseum.org single post structure) */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-20 sm:pb-28">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-6 font-medium"
        >
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span className="text-slate-600">/</span>
          <Link href="/blog" className="hover:text-white transition-colors">
            Blog
          </Link>
          <span className="text-slate-600">/</span>
          <span className="text-[#c084fc] font-semibold">{post.category}</span>
          <span className="text-slate-600">/</span>
          <span className="text-slate-300 truncate max-w-[200px] sm:max-w-xs">{post.title}</span>
        </nav>

        {/* 1. Article Header Meta Wrapper (mirroring girlmuseum.org .et_post_meta_wrapper) */}
        <header className="mb-8 text-left">
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="text-[11px] font-bold text-[#d8b4fe] bg-[#120733] border border-purple-500/40 px-3.5 py-1 rounded-full shadow-sm">
              {post.category}
            </span>
            {post.tag && (
              <span className="text-[11px] font-semibold text-[#A068FF] bg-purple-950/60 border border-purple-500/30 px-3 py-1 rounded-full">
                {post.tag}
              </span>
            )}
          </div>

          <h1 className="entry-title text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.2] mb-4">
            {post.title}
          </h1>

          {/* Post Meta Line (published date, author, reading time) */}
          <p className="post-meta flex flex-wrap items-center gap-2.5 text-xs sm:text-sm text-purple-300/80 font-medium pb-4 border-b border-purple-500/20">
            <span className="published text-white font-semibold">{post.date}</span>
            <span className="text-purple-400/40">|</span>
            <span>by <strong className="text-slate-200">{post.author}</strong></span>
            <span className="text-purple-400/40">|</span>
            <span>⏱ {post.readTime}</span>
            {post.statBadge && (
              <>
                <span className="text-purple-400/40">|</span>
                <span className="text-emerald-400 font-semibold">
                  {post.statBadge.value} {post.statBadge.label}
                </span>
              </>
            )}
          </p>
        </header>

        {/* 2. Large High-Resolution Cover Image (mirroring girlmuseum.org full-width featured image) */}
        <div className="overflow-hidden rounded-3xl border border-purple-500/25 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_35px_rgba(160,104,255,0.18)] aspect-[16/9] max-h-[480px] w-full mb-12 relative bg-[#090422]">
          <img
            src={
              post.coverImage ||
              "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
            }
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* 3. 2-Column Editorial Reading Layout (Article Body + Sticky Sidebar like girlmuseum.org) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Main Article Body (8 Columns) */}
          <article className="lg:col-span-8 text-left">
            {/* Excerpt Lead Paragraph */}
            <div className="p-6 rounded-2xl bg-[#0d0726]/90 border border-purple-500/25 mb-8 text-[16px] sm:text-[17px] text-purple-100/90 leading-relaxed italic">
              {post.excerpt}
            </div>

            {/* Sections & Headings */}
            <div className="space-y-10 text-slate-200">
              {post.sections.map((section, idx) => (
                <section key={idx} className="space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight pt-2 pb-2 border-b border-purple-500/15">
                    {section.heading}
                  </h2>

                  {section.paragraphs.map((p, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-[15.5px] sm:text-[16.5px] text-slate-300 leading-[1.8] font-normal"
                    >
                      {p}
                    </p>
                  ))}

                  {/* Editorial Key Quote */}
                  {section.keyQuote && (
                    <blockquote className="my-8 p-6 rounded-2xl bg-[#120733]/90 border-l-4 border-[#A068FF] text-purple-100 italic text-[16px] sm:text-[17px] leading-relaxed shadow-lg">
                      &ldquo;{section.keyQuote}&rdquo;
                    </blockquote>
                  )}
                </section>
              ))}
            </div>

            {/* Key Strategic Takeaways */}
            <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#120733] to-[#0a0320] border border-purple-500/35 shadow-[0_15px_40px_rgba(0,0,0,0.7)]">
              <div className="flex items-center gap-2.5 mb-5">
                <span className="text-2xl">💡</span>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Key Strategic Takeaways
                </h3>
              </div>
              <ul className="space-y-3.5">
                {post.takeaways.map((item, tIdx) => (
                  <li key={tIdx} className="flex items-start gap-3 text-sm sm:text-[15px] text-slate-200 leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-purple-500/20 text-[#A068FF] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border border-purple-500/40">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* FAQs if available */}
            {post.faqs && post.faqs.length > 0 && (
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-white mb-6 tracking-tight">
                  Frequently Asked Questions
                </h3>
                <FaqAccordion items={post.faqs} />
              </div>
            )}

            {/* Author Bio Box */}
            <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-[#0d0726]/80 border border-purple-500/25 flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-black text-xl flex items-center justify-center shrink-0 shadow-lg border border-purple-400/30">
                {post.author.slice(0, 1)}
              </div>
              <div className="text-center sm:text-left">
                <span className="text-xs uppercase tracking-wider text-[#A068FF] font-bold block mb-1">
                  About the Author
                </span>
                <h4 className="text-lg font-bold text-white mb-1">{post.author}</h4>
                <p className="text-xs text-purple-300/80 mb-2 font-medium">{post.authorRole}</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Specializing in full-funnel search architecture, DR 50-90+ backlink syndication, and high-velocity programmatic Next.js infrastructure for global enterprise brands.
                </p>
              </div>
            </div>

            {/* Next / Previous Article Navigation Links (mirroring girlmuseum.org nav-single) */}
            <div className="mt-12 pt-8 border-t border-purple-500/25 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              {prevPost ? (
                <Link
                  href={`/blog/${prevPost.id}`}
                  className="flex-1 p-4 rounded-2xl bg-[#0d0726]/60 hover:bg-[#120733] border border-purple-500/20 hover:border-purple-500/40 transition-colors text-left group"
                >
                  <span className="text-[11px] font-bold text-[#A068FF] block mb-1">
                    « Previous Article
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-white line-clamp-1">
                    {prevPost.title}
                  </span>
                </Link>
              ) : (
                <div className="flex-1" />
              )}

              {nextPost && (
                <Link
                  href={`/blog/${nextPost.id}`}
                  className="flex-1 p-4 rounded-2xl bg-[#0d0726]/60 hover:bg-[#120733] border border-purple-500/20 hover:border-purple-500/40 transition-colors text-right group"
                >
                  <span className="text-[11px] font-bold text-[#A068FF] block mb-1">
                    Next Article »
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-white line-clamp-1">
                    {nextPost.title}
                  </span>
                </Link>
              )}
            </div>
          </article>

          {/* Editorial Sticky Sidebar (4 Columns - like girlmuseum.org #sidebar) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28 self-start">
            {/* Widget 1: Free Audit / Call CTA */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#120733] to-[#090422] border border-purple-500/35 shadow-xl text-center">
              <span className="text-[11px] font-bold text-[#A068FF] uppercase tracking-wider block mb-2">
                Accelerate Growth
              </span>
              <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                Want this strategy for your website?
              </h3>
              <p className="text-xs text-slate-300 mb-5 leading-relaxed">
                Run an instant free domain audit or speak with our enterprise SEO and Next.js engineers.
              </p>
              <div className="flex flex-col gap-2.5">
                <Link
                  href="/audit"
                  className="w-full text-center py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#A068FF] to-[#7c3aed] hover:brightness-110 shadow-md transition-all"
                >
                  Run Free Website Audit →
                </Link>
                <Link
                  href="/schedule-meeting"
                  className="w-full text-center py-2 px-4 rounded-xl text-xs font-semibold text-slate-200 bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 transition-colors"
                >
                  Schedule Strategy Call
                </Link>
              </div>
            </div>

            {/* Widget 2: Social Share Buttons (mirroring girlmuseum.org sidebar shares) */}
            <div className="p-6 rounded-3xl bg-[#0d0726]/80 border border-purple-500/25 shadow-lg">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                Share this Article
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 text-xs text-slate-200 transition-colors"
                >
                  <span className="font-bold text-xs">𝕏</span>
                  <span>Share on X</span>
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-[#0077b5]/20 hover:bg-[#0077b5]/30 border border-[#0077b5]/40 text-xs text-sky-200 transition-colors"
                >
                  <span>in</span>
                  <span>LinkedIn</span>
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-[#1877f2]/20 hover:bg-[#1877f2]/30 border border-[#1877f2]/40 text-xs text-blue-200 transition-colors"
                >
                  <span>f</span>
                  <span>Facebook</span>
                </a>
                <a
                  href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-[#25d366]/20 hover:bg-[#25d366]/30 border border-[#25d366]/40 text-xs text-emerald-200 transition-colors"
                >
                  <span>💬</span>
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Widget 3: Related Field Insights */}
            <div className="p-6 rounded-3xl bg-[#0d0726]/80 border border-purple-500/25 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Recent Insights
                </h4>
                <Link href="/blog" className="text-[11px] font-semibold text-[#A068FF] hover:underline">
                  All →
                </Link>
              </div>

              <div className="flex flex-col gap-3.5">
                {relatedPosts.map((rPost) => (
                  <Link
                    key={rPost.id}
                    href={`/blog/${rPost.id}`}
                    className="flex items-start gap-3 p-2 rounded-xl hover:bg-white/[0.06] transition-colors group"
                  >
                    <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0 bg-slate-900 border border-purple-500/20">
                      <img
                        src={rPost.coverImage || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=200&q=80"}
                        alt={rPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] text-[#c084fc] font-semibold block mb-0.5">
                        {rPost.category}
                      </span>
                      <h5 className="text-xs font-medium text-slate-200 group-hover:text-white line-clamp-2 leading-snug">
                        {rPost.title}
                      </h5>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Widget 4: Topics / Categories */}
            <div className="p-6 rounded-3xl bg-[#0d0726]/80 border border-purple-500/25 shadow-lg">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                Topics &amp; Focus
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "International SEO",
                  "Next.js App Router",
                  "Guest Posting DR 50+",
                  "Topical Authority",
                  "Core Web Vitals",
                  "Google AI & SGE",
                  "Klaviyo Retention",
                ].map((tag) => (
                  <Link
                    key={tag}
                    href="/blog"
                    className="text-[11px] font-medium text-slate-300 bg-white/[0.05] hover:bg-purple-900/40 border border-purple-500/20 px-3 py-1 rounded-full transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
