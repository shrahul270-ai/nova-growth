import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { caseStudiesData } from "../projectsData";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return caseStudiesData.map((study) => ({
    slug: study.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudiesData.find((s) => s.id === slug);

  if (!study) {
    return {
      title: "Case Study Not Found | Balaji Prime Media",
    };
  }

  return {
    title: `${study.title} | Balaji Prime Media`,
    description: `${study.overview.slice(0, 155)}...`,
    alternates: {
      canonical: `https://balajiprimemedia.in/projects/${study.id}`,
    },
    openGraph: {
      title: `${study.title} | Case Study`,
      description: study.overview,
      type: "article",
      images: [
        {
          url: study.coverImage || "/images/projects/fashion-brand.jpg",
          width: 1200,
          height: 630,
          alt: study.title,
        },
      ],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const study = caseStudiesData.find((s) => s.id === slug);

  if (!study) {
    notFound();
  }

  const otherStudies = caseStudiesData.filter((s) => s.id !== study.id).slice(0, 3);

  const caseStudyJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: study.title,
    headline: study.title,
    description: study.overview,
    image: study.coverImage || "https://balajiprimemedia.in/images/bpm-complete-logo.png",
    author: {
      "@type": "Organization",
      name: "Balaji Prime Media",
      url: "https://balajiprimemedia.in",
    },
    publisher: {
      "@type": "Organization",
      name: "Balaji Prime Media",
      url: "https://balajiprimemedia.in",
    },
    about: study.category,
    spatialCoverage: study.country,
  };

  return (
    <div className="relative min-h-screen bg-white text-slate-900 selection:bg-amber-100 selection:text-amber-900 overflow-hidden font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudyJsonLd) }}
      />

      {/* Subtle Ambient Warm Mesh Glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-40 bg-[radial-gradient(rgba(217,119,6,0.04)_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true"
      />

      {/* Sticky Global 2-Tier Header */}
      <div className="relative z-40">
        <Navbar activePage="projects" />
      </div>

      {/* Breadcrumb Navigation */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500"
        >
          <Link href="/" className="hover:text-amber-700 transition-colors">
            Home
          </Link>
          <span className="text-slate-400">/</span>
          <Link href="/projects" className="hover:text-amber-700 transition-colors">
            Case Studies
          </Link>
          <span className="text-slate-400">/</span>
          <span className="text-amber-700 font-bold truncate max-w-xs">{study.shortTitle}</span>
        </nav>
      </div>

      {/* Case Study Content */}
      <article className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-20 sm:pb-28">
        {/* Header Section */}
        <header className="mb-8 text-left">
          {/* Badges Bar */}
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200/80 px-3.5 py-1 rounded-full shadow-2xs">
              🏆 {study.category}
            </span>
            <span className="text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 px-3 py-1 rounded-full">
              📍 {study.client}
            </span>
            <span className="text-xs font-semibold text-amber-700 bg-amber-100/70 border border-amber-300/60 px-3 py-1 rounded-full">
              ⏱️ {study.timeline}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-[1.18] mb-6">
            {study.title}
          </h1>
        </header>

        {/* Featured Cover Image */}
        {study.coverImage && (
          <div className="overflow-hidden rounded-2xl border border-amber-200/80 shadow-md aspect-[16/9] max-h-[460px] w-full mb-10 relative bg-slate-100">
            <img
              src={study.coverImage}
              alt={study.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Executive Impact Callout */}
        <div className="bg-gradient-to-br from-[#fffdf8] via-[#fef9ee] to-[#fffdf8] text-slate-900 rounded-2xl p-6 sm:p-8 shadow-md mb-10 border border-amber-200/90">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            Primary Growth Milestone
          </div>
          <div className="text-3xl sm:text-4xl font-black text-slate-950 mt-1">
            {study.stat}{" "}
            <span className="text-amber-600 text-2xl sm:text-3xl font-bold">
              {study.statLabel}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 mt-2 max-w-2xl leading-relaxed">
            {study.heroMetric}
          </p>
        </div>

        {/* 4 Key Metrics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {study.metrics.map((m, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-5 border border-amber-200/80 shadow-xs flex flex-col justify-between hover:border-amber-300 transition-all"
            >
              <div className="text-2xl sm:text-3xl font-black text-slate-950 mb-1">
                {m.value}
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-slate-900">{m.label}</div>
                <div className="text-xs text-slate-500 mt-1">{m.detail}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Overview Box */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-amber-200/80 shadow-xs mb-10">
          <h2 className="text-xs font-black uppercase tracking-wider text-amber-700 mb-3">
            Executive Summary
          </h2>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
            {study.overview}
          </p>
        </div>

        {/* The Challenge & The Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Challenge Box */}
          <div className="bg-rose-50/50 rounded-2xl p-6 sm:p-7 border border-rose-200/80 shadow-xs">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold mb-4 border border-rose-200">
              <span>⚠️</span>
              <span>The Bottleneck</span>
            </div>
            <h3 className="text-xl font-bold text-slate-950 mb-4">
              {study.challenge.heading}
            </h3>
            <ul className="space-y-3">
              {study.challenge.points.map((pt, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <span className="text-rose-500 font-bold shrink-0 mt-0.5">✕</span>
                  <span className="leading-relaxed">{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solution Box */}
          <div className="bg-amber-50/50 rounded-2xl p-6 sm:p-7 border border-amber-200/80 shadow-xs">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold mb-4 border border-amber-200">
              <span>⚡</span>
              <span>The Strategy</span>
            </div>
            <h3 className="text-xl font-bold text-slate-950 mb-2">
              {study.solution.heading}
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 mb-4 leading-relaxed">
              {study.solution.description}
            </p>
            <ul className="space-y-3">
              {study.solution.keyPoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <span className="text-emerald-600 font-bold shrink-0 mt-0.5">✓</span>
                  <span className="leading-relaxed">{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Full Deliverables & Tech Architecture */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-amber-200/80 shadow-xs mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-base sm:text-lg font-bold text-slate-950 mb-4 flex items-center gap-2">
                <span>📋</span>
                <span>Executed Project Deliverables</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {study.deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 bg-[#fffdfa] p-3.5 rounded-xl border border-amber-200/60 text-xs font-medium text-slate-800"
                  >
                    <span className="text-amber-600 font-bold">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t md:border-t-0 md:border-l border-amber-200/60 md:pl-8">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-800 mb-4">
                Deployed Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {study.tech.map((t, idx) => (
                  <span
                    key={idx}
                    className="bg-amber-50 text-amber-900 border border-amber-200 px-3 py-1.5 rounded-xl font-mono text-xs font-semibold shadow-2xs"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-6 p-4 rounded-xl bg-[#fffdfa] border border-amber-200/60 text-xs">
                <div className="font-bold text-slate-900 mb-1">Target Market</div>
                <div className="text-slate-600">{study.country}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Client Testimonial Card */}
        <div className="bg-gradient-to-br from-[#fffdf8] via-[#fef9ee] to-[#fffdf8] rounded-2xl p-6 sm:p-8 border border-amber-200/90 shadow-md mb-12 relative overflow-hidden">
          <div className="flex items-center gap-2 text-amber-500 text-sm mb-4">
            {"★★★★★".split("").map((star, i) => (
              <span key={i}>{star}</span>
            ))}
            <span className="text-xs font-bold text-amber-800 ml-2">Verified Client Review</span>
          </div>
          <p className="text-base sm:text-lg text-slate-800 font-medium italic leading-relaxed mb-6">
            &ldquo;{study.testimonial.quote}&rdquo;
          </p>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-600 text-white flex items-center justify-center font-bold text-sm shadow-xs border border-amber-300">
              {study.testimonial.author.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="text-sm font-bold text-slate-950">{study.testimonial.author}</div>
              <div className="text-xs text-slate-600">
                {study.testimonial.role} • {study.testimonial.company}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Banner */}
        <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 rounded-3xl p-8 sm:p-12 text-center text-white shadow-xl mb-14">
          <div className="max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold mb-4 border border-white/20">
              ⚡ Scalable Growth Model
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight mb-4 text-white">
              Ready to Achieve Similar Results for Your Business?
            </h2>
            <p className="text-xs sm:text-sm text-amber-50 leading-relaxed mb-8">
              We engineer custom digital marketing, technical SEO, and Next.js platforms tailored to high-growth brands. Let us audit your website and propose an actionable roadmap.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact-us"
                className="bg-white hover:bg-amber-50 text-slate-950 font-bold text-sm px-8 py-3.5 rounded-full shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                Book Free Growth Consultation →
              </Link>
              <Link
                href="/projects"
                className="bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-7 py-3.5 rounded-full border border-white/30 transition-all cursor-pointer"
              >
                Browse All Case Studies
              </Link>
            </div>
          </div>
        </div>

        {/* Related Case Studies Grid */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-slate-950">Explore More Case Studies</h2>
              <p className="text-xs text-slate-500 mt-1">
                See how other companies scale organic search with Balaji Prime Media
              </p>
            </div>
            <Link
              href="/projects"
              className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 transition-colors"
            >
              <span>View all</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherStudies.map((item) => (
              <Link
                key={item.id}
                href={`/projects/${item.id}`}
                className="group bg-white hover:bg-[#fffdfa] rounded-2xl border border-amber-200/70 overflow-hidden flex flex-col justify-between transition-all hover:border-amber-400 hover:shadow-md cursor-pointer"
              >
                {item.coverImage && (
                  <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/60 inline-block mb-2">
                      {item.category}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors mb-2">
                      {item.shortTitle}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                      {item.overview}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-amber-200/50 flex items-center justify-between text-xs mt-auto">
                    <span className="font-bold text-amber-600">
                      {item.stat} {item.statLabel}
                    </span>
                    <span className="text-amber-700 font-semibold group-hover:translate-x-1 transition-transform">
                      Read Story →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
