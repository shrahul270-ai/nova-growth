import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
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
      title: "Article Not Found | Nova Growth",
    };
  }

  return {
    title: `${post.title} | Nova Growth Agency`,
    description: post.excerpt,
    alternates: {
      canonical: `https://nova-growth-six.vercel.app/blog/${post.id}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.id === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "author": {
      "@type": "Person",
      "name": post.author,
      "jobTitle": post.authorRole,
    },
    "publisher": {
      "@type": "Organization",
      "name": "Nova Growth",
      "logo": {
        "@type": "ImageObject",
        "url": "https://nova-growth-six.vercel.app/logo.png",
      },
    },
    "datePublished": post.date,
  };

  return (
    <div className="relative min-h-screen bg-[#f8fbf9] text-[#111827] overflow-hidden selection:bg-[#d97706] selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <div className="curved-ribbon-left" aria-hidden="true" />
      <div className="curved-ribbon-right" aria-hidden="true" />

      <Navbar activePage="blog" />

      {/* Main Article Container */}
      <main className="relative pt-12 pb-24 px-6 md:px-12 z-10 max-w-5xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#64748b] mb-8 font-medium">
          <Link href="/" className="hover:text-[#091427] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-[#091427] transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-[#091427] font-semibold truncate max-w-xs sm:max-w-md">{post.category}</span>
        </nav>

        {/* Article Header */}
        <header className="mb-12 text-left">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="bg-amber-50 text-amber-900 border border-amber-200/80 text-xs font-bold px-3 py-1 rounded-full badge-3d">
              {post.category}
            </span>
            <span className="text-xs font-semibold text-[#64748b]">
              ⏱ {post.readTime}
            </span>
            <span className="text-xs text-[#64748b]">• {post.date}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0f172a] tracking-tight leading-[1.15] mb-6">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-[#475569] leading-relaxed mb-8 max-w-3xl font-normal">
            {post.excerpt}
          </p>

          {/* Author & Stat Badge Bar */}
          <div className="flex flex-wrap items-center justify-between gap-6 py-5 px-6 rounded-3xl bg-white border border-[#d97706]/20 shadow-xs card-3d">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#091427] text-[#d97706] border border-[#d97706]/30 font-bold text-sm flex items-center justify-center shrink-0 shadow-sm">
                NG
              </div>
              <div>
                <span className="text-sm font-bold text-[#0f172a] block">{post.author}</span>
                <span className="text-xs text-[#64748b]">{post.authorRole}</span>
              </div>
            </div>

            {post.statBadge && (
              <div className="flex items-center gap-3 bg-amber-50 px-4 py-2 rounded-2xl border border-amber-200/80">
                <span className="text-xl font-black text-[#091427]">{post.statBadge.value}</span>
                <span className="text-[11px] font-bold text-[#d97706] leading-tight">
                  {post.statBadge.label}
                </span>
              </div>
            )}
          </div>
        </header>

        {/* Article Body Sections */}
        <article className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-sm card-3d text-left mb-12">
          <div className="space-y-10 text-[#334155] leading-relaxed">
            {post.sections.map((section, idx) => (
              <section key={idx} className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight pt-2">
                  {section.heading}
                </h2>

                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-sm sm:text-base leading-relaxed text-[#475569]">
                    {p}
                  </p>
                ))}

                {section.keyQuote && (
                  <div className="my-6 p-5 sm:p-6 rounded-2xl bg-amber-50/70 border-l-4 border-[#d97706] text-[#091427] italic font-medium text-sm sm:text-base shadow-xs">
                    &ldquo;{section.keyQuote}&rdquo;
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Key Strategic Takeaways */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#091427] text-white border border-[#d97706]/40 shadow-xl">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="text-xl">💡</span>
                <h3 className="text-lg font-bold text-white tracking-tight">Key Strategic Takeaways</h3>
              </div>
              <ul className="space-y-3">
                {post.takeaways.map((item, tIdx) => (
                  <li key={tIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-[#f59e0b] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* FAQs if present */}
          {post.faqs && post.faqs.length > 0 && (
            <div className="mt-10 pt-8 border-t border-gray-100">
              <h3 className="text-xl font-bold text-[#0f172a] mb-5">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {post.faqs.map((faq, fIdx) => (
                  <div key={fIdx} className="p-5 rounded-2xl bg-[#f8fafd] border border-gray-200/80">
                    <h4 className="text-sm font-bold text-[#091427] mb-2">{faq.question}</h4>
                    <p className="text-xs sm:text-sm text-[#54647c] leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Growth Consultation Callout */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#091427] via-[#0f213d] to-[#1e293b] border border-[#d97706]/40 shadow-xl text-white text-center mb-16">
          <span className="text-xs font-bold text-[#d97706] uppercase tracking-wider block mb-2">
            Accelerate Your Pipeline
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white mb-3 tracking-tight">
            Want us to implement this strategy for your brand?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mb-6 leading-relaxed">
            Schedule a free 15-minute growth diagnosis with our technical SEO and web development leads.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="btn-gold-3d inline-flex items-center gap-2 bg-[#d97706] hover:bg-[#b45309] text-white text-xs sm:text-sm font-bold px-7 py-3.5 rounded-full shadow-lg transition-all cursor-pointer"
            >
              <span>Book Growth Consultation</span>
              <span>→</span>
            </Link>
            <Link
              href="/services"
              className="btn-3d inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold px-6 py-3.5 rounded-full border border-white/20 transition-all cursor-pointer"
            >
              <span>Explore All Services</span>
            </Link>
          </div>
        </div>

        {/* Related Articles Section */}
        <section className="text-left">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold text-[#d97706] uppercase tracking-wider block">More Insights</span>
              <h3 className="text-2xl font-black text-[#0f172a]">Related Growth Articles</h3>
            </div>
            <Link
              href="/blog"
              className="text-xs font-bold text-[#091427] hover:text-[#d97706] transition-colors"
            >
              View All Articles →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((rPost) => (
              <Link
                key={rPost.id}
                href={`/blog/${rPost.id}`}
                className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs card-3d flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/60">
                      {rPost.category}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">{rPost.readTime}</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#0f172a] group-hover:text-[#091427] transition-colors line-clamp-2 mb-2">
                    {rPost.title}
                  </h4>
                  <p className="text-xs text-[#64748b] line-clamp-2 leading-relaxed">
                    {rPost.excerpt}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-gray-400 text-[11px]">{rPost.date}</span>
                  <span className="text-[#d97706] font-bold group-hover:translate-x-1 transition-transform">
                    Read →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
