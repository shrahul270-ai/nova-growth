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

  const postUrl = `https://balajiprimemedia.in/blog/${post.id}`;
  const fullImageUrl = `https://balajiprimemedia.in${post.coverImage}`;
  const publishedIso = new Date(post.isoDate).toISOString();

  return {
    title: `${post.title} | Balaji Prime Media`,
    description: post.excerpt,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      siteName: "Balaji Prime Media",
      locale: "en_US",
      type: "article",
      publishedTime: publishedIso,
      modifiedTime: publishedIso,
      authors: [post.author],
      section: post.category,
      tags: [post.tag, post.category, "SEO", "Digital Growth"],
      images: [
        {
          url: fullImageUrl,
          secureUrl: fullImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      site: "@balajiprimemedia",
      creator: "@balajiprimemedia",
      images: [
        {
          url: fullImageUrl,
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
  const fullImageUrl = `https://balajiprimemedia.in${post.coverImage}`;
  const publishedIso = new Date(post.isoDate).toISOString();
  const encodedUrl = encodeURIComponent(postUrl);
  const encodedTitle = encodeURIComponent(post.title);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    headline: post.title,
    description: post.excerpt,
    image: [fullImageUrl],
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
    datePublished: publishedIso,
    dateModified: publishedIso,
  };

  return (
    <div className="relative min-h-screen bg-[#07030d] text-white selection:bg-[#681fe4] selection:text-white font-satoshi overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Background Grid Pattern & Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(104,31,228,0.18),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-white-240 opacity-40 pointer-events-none" />

      {/* Top Navbar */}
      <div className="relative z-50">
        <Navbar activePage="blog" />
      </div>

      {/* Main Single Article Wrapper */}
      <main className="relative z-10 max-w-[1320px] mx-auto px-6 sm:px-12 pt-28 sm:pt-36 pb-20 sm:pb-28">
        {/* Breadcrumb Navigation in Sharp Mono Style */}
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-[0.14em] text-neutral-400 mb-8"
        >
          <Link href="/" className="hover:text-white transition-colors">
            HOME
          </Link>
          <span className="text-neutral-600">/</span>
          <Link href="/blog" className="hover:text-white transition-colors">
            BLOG
          </Link>
          <span className="text-neutral-600">/</span>
          <span className="text-[#681fe4]">{post.category}</span>
          <span className="text-neutral-600">/</span>
          <span className="text-neutral-300 truncate max-w-[200px] sm:max-w-xs">{post.title}</span>
        </nav>

        {/* 1. Article Header Meta Wrapper */}
        <header className="mb-10 text-left">
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="text-xs font-mono uppercase tracking-[0.16em] text-[#681fe4] bg-white/[0.04] border border-white/10 px-3 py-1 rounded-[2px]">
              {post.category}
            </span>
            {post.tag && (
              <span className="text-xs font-mono uppercase tracking-[0.16em] text-neutral-400 bg-white/[0.02] border border-white/10 px-3 py-1 rounded-[2px]">
                {post.tag}
              </span>
            )}
          </div>

          <h1 className="entry-title font-bebas text-4xl sm:text-6xl md:text-7xl tracking-[0.14em] text-white uppercase leading-[0.95] mb-6">
            {post.title}
          </h1>

          {/* Post Meta Line */}
          <p className="post-meta flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-400 pb-6 border-b border-white/10">
            <time dateTime={post.isoDate} className="published text-white">
              {post.date}
            </time>
            <span className="text-neutral-600">|</span>
            <span>BY <strong className="text-neutral-200 uppercase">{post.author}</strong></span>
            <span className="text-neutral-600">|</span>
            <span>⏱ {post.readTime}</span>
            {post.statBadge && (
              <>
                <span className="text-neutral-600">|</span>
                <span className="text-[#681fe4]">
                  {post.statBadge.value} {post.statBadge.label}
                </span>
              </>
            )}
          </p>
        </header>

        {/* 2. Large High-Resolution Cover Image with Grayscale Filter */}
        <div className="overflow-hidden rounded-[4px] border border-white/10 shadow-2xl aspect-[16/9] max-h-[500px] w-full mb-14 relative bg-black">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
          />
        </div>

        {/* 3. 2-Column Editorial Reading Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Main Article Body (8 Columns) */}
          <article className="lg:col-span-8 text-left">
            {/* Excerpt Lead Paragraph */}
            <div className="p-8 rounded-[4px] bg-[#0c0818] border border-white/10 mb-10 text-base sm:text-lg text-neutral-200 leading-relaxed italic">
              {post.excerpt}
            </div>

            {/* Sections & Headings */}
            <div className="space-y-12 text-neutral-300">
              {post.sections.map((section, idx) => (
                <section key={idx} className="space-y-4">
                  <h2 className="font-bebas text-2xl sm:text-4xl tracking-[0.14em] text-white uppercase pt-4 pb-3 border-b border-white/10 leading-none">
                    {section.heading}
                  </h2>

                  {section.paragraphs.map((p, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-sm sm:text-base text-neutral-300 leading-[1.8] font-normal"
                    >
                      {p}
                    </p>
                  ))}

                  {/* Editorial Key Quote */}
                  {section.keyQuote && (
                    <blockquote className="my-8 p-6 sm:p-8 rounded-[4px] bg-[#0c0818] border-l-4 border-[#681fe4] text-neutral-100 italic text-base sm:text-lg leading-relaxed shadow-lg">
                      &ldquo;{section.keyQuote}&rdquo;
                    </blockquote>
                  )}
                </section>
              ))}
            </div>

            {/* Key Strategic Takeaways */}
            <div className="mt-14 p-8 sm:p-10 rounded-[4px] bg-[#0c0818] border border-white/10 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-bebas text-xs tracking-[0.2em] uppercase text-[#681fe4]">
                  // STRATEGIC RECAP
                </span>
              </div>
              <h3 className="font-bebas text-2xl sm:text-3xl tracking-[0.14em] text-white uppercase mb-6 leading-none">
                KEY STRATEGIC TAKEAWAYS
              </h3>
              <ul className="space-y-4">
                {post.takeaways.map((item, tIdx) => (
                  <li key={tIdx} className="flex items-start gap-3.5 text-sm text-neutral-200 leading-relaxed">
                    <span className="w-5 h-5 rounded-[2px] bg-[#681fe4]/20 text-[#681fe4] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border border-[#681fe4]/40 font-mono">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* FAQs if available */}
            {post.faqs && post.faqs.length > 0 && (
              <div className="mt-14">
                <span className="font-bebas text-xs tracking-[0.2em] uppercase text-[#38bdf8] block mb-2">
                  // INQUIRIES &amp; CLARIFICATIONS
                </span>
                <h3 className="font-bebas text-2xl sm:text-4xl tracking-[0.14em] text-white uppercase mb-6 leading-none">
                  FREQUENTLY ASKED QUESTIONS
                </h3>
                <FaqAccordion items={post.faqs} />
              </div>
            )}

            {/* Author Bio Box */}
            <div className="mt-14 p-8 rounded-[4px] bg-[#0c0818] border border-white/10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="w-16 h-16 rounded-[4px] bg-[#681fe4] text-white font-bebas text-2xl flex items-center justify-center shrink-0 shadow-lg">
                {post.author.slice(0, 1)}
              </div>
              <div className="text-center sm:text-left">
                <span className="font-bebas text-xs uppercase tracking-[0.2em] text-[#681fe4] block mb-1">
                  // ABOUT THE STRATEGIST
                </span>
                <h4 className="font-bebas text-2xl tracking-[0.14em] uppercase text-white mb-1">{post.author}</h4>
                <p className="text-xs font-mono text-neutral-400 mb-3">{post.authorRole}</p>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Specializing in full-funnel search architecture, DR 50-90+ backlink syndication, and high-velocity programmatic Next.js infrastructure for global enterprise brands.
                </p>
              </div>
            </div>

            {/* Next / Previous Article Navigation Links */}
            <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              {prevPost ? (
                <Link
                  href={`/blog/${prevPost.id}`}
                  className="flex-1 p-5 rounded-[4px] bg-[#0c0818] hover:bg-[#100b22] border border-white/10 hover:border-[#681fe4] transition-colors text-left group"
                >
                  <span className="font-bebas text-xs tracking-[0.16em] uppercase text-[#681fe4] block mb-1">
                    « PREVIOUS ARTICLE
                  </span>
                  <span className="font-bebas text-lg tracking-[0.1em] uppercase text-neutral-200 group-hover:text-white line-clamp-1">
                    {prevPost.title}
                  </span>
                </Link>
              ) : (
                <div className="flex-1" />
              )}

              {nextPost && (
                <Link
                  href={`/blog/${nextPost.id}`}
                  className="flex-1 p-5 rounded-[4px] bg-[#0c0818] hover:bg-[#100b22] border border-white/10 hover:border-[#681fe4] transition-colors text-right group"
                >
                  <span className="font-bebas text-xs tracking-[0.16em] uppercase text-[#681fe4] block mb-1">
                    NEXT ARTICLE »
                  </span>
                  <span className="font-bebas text-lg tracking-[0.1em] uppercase text-neutral-200 group-hover:text-white line-clamp-1">
                    {nextPost.title}
                  </span>
                </Link>
              )}
            </div>
          </article>

          {/* Editorial Sticky Sidebar (4 Columns) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28 self-start">
            {/* Widget 1: Free Audit / Call CTA */}
            <div className="p-8 rounded-[4px] bg-[#0c0818] border border-white/10 shadow-xl text-center">
              <span className="font-bebas text-xs tracking-[0.2em] uppercase text-[#681fe4] block mb-2">
                // ACCELERATE GROWTH
              </span>
              <h3 className="font-bebas text-2xl tracking-[0.14em] text-white uppercase mb-2 leading-tight">
                WANT THIS STRATEGY FOR YOUR SITE?
              </h3>
              <p className="text-xs text-neutral-400 mb-6 leading-relaxed font-normal">
                Run an instant free domain audit or speak with our enterprise SEO and Next.js engineers.
              </p>
              <div className="flex flex-col gap-3">
                <Link
                  href="/audit"
                  className="w-full text-center py-3 px-4 rounded-[4px] font-bebas text-xs tracking-[0.16em] uppercase text-white bg-[#681fe4] hover:bg-[#5815cb] shadow-[0_10px_25px_rgba(104,31,228,0.35)] transition-all"
                >
                  RUN FREE WEBSITE AUDIT →
                </Link>
                <Link
                  href="/schedule-meeting"
                  className="w-full text-center py-2.5 px-4 rounded-[4px] font-bebas text-xs tracking-[0.14em] uppercase text-neutral-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors"
                >
                  SCHEDULE STRATEGY CALL 📅
                </Link>
              </div>
            </div>

            {/* Widget 2: Social Share Buttons */}
            <div className="p-6 rounded-[4px] bg-[#0c0818] border border-white/10 shadow-lg">
              <h4 className="font-bebas text-sm tracking-[0.18em] uppercase text-neutral-400 mb-3">
                SHARE THIS ARTICLE
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-[4px] bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs text-neutral-300 transition-colors font-mono"
                >
                  <span className="font-bold text-xs">𝕏</span>
                  <span>Twitter/X</span>
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-[4px] bg-[#0077b5]/15 hover:bg-[#0077b5]/25 border border-[#0077b5]/40 text-xs text-sky-200 transition-colors font-mono"
                >
                  <span>in</span>
                  <span>LinkedIn</span>
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-[4px] bg-[#1877f2]/15 hover:bg-[#1877f2]/25 border border-[#1877f2]/40 text-xs text-blue-200 transition-colors font-mono"
                >
                  <span>f</span>
                  <span>Facebook</span>
                </a>
                <a
                  href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-[4px] bg-[#25d366]/15 hover:bg-[#25d366]/25 border border-[#25d366]/40 text-xs text-emerald-200 transition-colors font-mono"
                >
                  <span>💬</span>
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Widget 3: Related Field Insights */}
            <div className="p-6 rounded-[4px] bg-[#0c0818] border border-white/10 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bebas text-sm tracking-[0.18em] uppercase text-neutral-400">
                  RECENT INSIGHTS
                </h4>
                <Link href="/blog" className="font-bebas text-xs tracking-[0.14em] uppercase text-[#681fe4] hover:underline">
                  ALL →
                </Link>
              </div>

              <div className="flex flex-col gap-3">
                {relatedPosts.map((rPost) => (
                  <Link
                    key={rPost.id}
                    href={`/blog/${rPost.id}`}
                    className="flex items-start gap-3 p-2 rounded-[4px] hover:bg-white/[0.04] transition-colors group"
                  >
                    <div className="w-16 h-12 rounded-[2px] overflow-hidden shrink-0 bg-black border border-white/10">
                      <img
                        src={rPost.coverImage}
                        alt={rPost.title}
                        className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] text-[#681fe4] font-mono uppercase block mb-0.5">
                        {rPost.category}
                      </span>
                      <h5 className="font-bebas text-base tracking-[0.1em] uppercase text-neutral-200 group-hover:text-white line-clamp-2 leading-tight">
                        {rPost.title}
                      </h5>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Widget 4: Topics / Categories */}
            <div className="p-6 rounded-[4px] bg-[#0c0818] border border-white/10 shadow-lg">
              <h4 className="font-bebas text-sm tracking-[0.18em] uppercase text-neutral-400 mb-3">
                TOPICS &amp; FOCUS
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "International SEO", href: "/seo-services-usa" },
                  { label: "Next.js App Router", href: "/web-development-uk" },
                  { label: "Guest Posting DR 50+", href: "/guest-posting" },
                  { label: "Technical SEO", href: "/services/seo-optimization" },
                  { label: "Core Web Vitals Audit", href: "/audit" },
                  { label: "Email Retention Workflows", href: "/services/email-marketing" },
                  { label: "Authority Backlinks", href: "/services/backlink-building" },
                  { label: "Content Strategy", href: "/services/content-writing" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="font-bebas text-xs tracking-[0.14em] uppercase text-neutral-300 bg-white/[0.04] hover:bg-[#681fe4] border border-white/10 px-3 py-1 rounded-[2px] transition-colors"
                  >
                    {item.label}
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
