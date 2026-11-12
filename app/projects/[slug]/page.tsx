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
          url:
            study.coverImage ||
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
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
    <div className="relative min-h-screen bg-[#060112] text-white selection:bg-[#A068FF] selection:text-white overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudyJsonLd) }}
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
        <Navbar activePage="projects" />
      </div>

      {/* Breadcrumb Navigation */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400"
        >
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span className="text-slate-600">/</span>
          <Link href="/projects" className="hover:text-white transition-colors">
            Case Studies
          </Link>
          <span className="text-slate-600">/</span>
          <span className="text-[#c084fc] truncate max-w-xs">{study.shortTitle}</span>
        </nav>
      </div>

      {/* Case Study Content */}
      <article className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-20 sm:pb-28">
        {/* Header Section */}
        <header className="mb-8 text-left">
          {/* Badges Bar */}
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="text-[11px] font-bold text-[#d8b4fe] bg-[#120733] border border-purple-500/40 px-3.5 py-1 rounded-full shadow-sm">
              🏆 {study.category}
            </span>
            <span className="text-[11px] font-semibold text-slate-200 bg-white/[0.06] border border-white/10 px-3 py-1 rounded-full">
              📍 {study.client}
            </span>
            <span className="text-[11px] font-semibold text-[#A068FF] bg-purple-950/60 border border-purple-500/30 px-3 py-1 rounded-full">
              ⏱️ {study.timeline}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.18] mb-6">
            {study.title}
          </h1>
        </header>

        {/* Featured Cover Image */}
        {study.coverImage && (
          <div className="overflow-hidden rounded-3xl border border-purple-500/25 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_35px_rgba(160,104,255,0.18)] aspect-[16/9] max-h-[460px] w-full mb-10 relative bg-[#090422]">
            <img
              src={study.coverImage}
              alt={study.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Executive Impact Callout */}
        <div className="bg-gradient-to-r from-[#120733] via-[#160a3d] to-[#0d0524] text-white rounded-3xl p-6 sm:p-8 shadow-xl mb-10 border border-purple-500/35 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#A068FF] mb-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#A068FF] animate-ping" />
              Primary Growth Milestone
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white mt-1">
              {study.stat}{" "}
              <span className="text-cyan-300 text-2xl sm:text-3xl font-bold">
                {study.statLabel}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl leading-relaxed">
              {study.heroMetric}
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 bg-gradient-to-r from-[#A068FF] to-[#7c3aed] hover:brightness-110 text-white font-bold text-xs sm:text-sm px-7 py-3.5 rounded-full shadow-lg transition-all cursor-pointer text-center whitespace-nowrap"
          >
            Get Similar Growth →
          </Link>
        </div>

        {/* 4 Key Metrics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {study.metrics.map((m, idx) => (
            <div
              key={idx}
              className="bg-[#0d0726]/85 rounded-2xl p-5 border border-purple-500/25 shadow-md flex flex-col justify-between"
            >
              <div className="text-2xl sm:text-3xl font-black text-cyan-300 mb-1">
                {m.value}
              </div>
              <div>
                <div className="text-xs font-bold text-white">{m.label}</div>
                <div className="text-[11px] text-slate-400 mt-1">{m.detail}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Overview Box */}
        <div className="bg-[#0d0726]/80 rounded-3xl p-8 border border-purple-500/25 shadow-md mb-10">
          <h2 className="text-xs font-black uppercase tracking-wider text-[#A068FF] mb-3">
            Executive Summary
          </h2>
          <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
            {study.overview}
          </p>
        </div>

        {/* The Challenge & The Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Challenge Box */}
          <div className="bg-[#180a1c]/80 rounded-3xl p-7 border border-rose-500/30 shadow-md">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 text-rose-300 text-xs font-bold mb-4 border border-rose-500/30">
              <span>⚠️</span>
              <span>The Bottleneck</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">
              {study.challenge.heading}
            </h3>
            <ul className="space-y-3">
              {study.challenge.points.map((pt, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <span className="text-rose-400 font-bold shrink-0 mt-0.5">✕</span>
                  <span className="leading-relaxed">{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solution Box */}
          <div className="bg-[#0c1a24]/80 rounded-3xl p-7 border border-cyan-500/30 shadow-md">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 text-cyan-300 text-xs font-bold mb-4 border border-cyan-500/30">
              <span>⚡</span>
              <span>The Strategy</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              {study.solution.heading}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
              {study.solution.description}
            </p>
            <ul className="space-y-3">
              {study.solution.keyPoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <span className="text-cyan-400 font-bold shrink-0 mt-0.5">✓</span>
                  <span className="leading-relaxed">{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Full Deliverables & Tech Architecture */}
        <div className="bg-[#0d0726]/80 rounded-3xl p-8 border border-purple-500/25 shadow-md mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span>📋</span>
                <span>Executed Project Deliverables</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {study.deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 bg-white/[0.04] p-3.5 rounded-2xl border border-white/5 text-xs font-medium text-slate-200"
                  >
                    <span className="text-[#A068FF] font-bold">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t md:border-t-0 md:border-l border-purple-500/20 md:pl-8">
              <h3 className="text-sm font-bold uppercase tracking-wider text-purple-300 mb-4">
                Deployed Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {study.tech.map((t, idx) => (
                  <span
                    key={idx}
                    className="bg-[#120733] text-[#d8b4fe] border border-purple-500/30 px-3 py-1.5 rounded-xl font-mono text-xs font-semibold shadow-xs"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-6 p-4 rounded-2xl bg-white/[0.04] border border-purple-500/20 text-xs">
                <div className="font-bold text-white mb-1">Target Market</div>
                <div className="text-slate-300">{study.country}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Client Testimonial Card */}
        <div className="bg-gradient-to-br from-[#120733] to-[#0a0320] rounded-3xl p-8 border border-purple-500/35 shadow-xl mb-12 relative overflow-hidden">
          <div className="flex items-center gap-2 text-amber-400 text-sm mb-4">
            {"★★★★★".split("").map((star, i) => (
              <span key={i}>{star}</span>
            ))}
            <span className="text-xs font-bold text-purple-200 ml-2">Verified Client Review</span>
          </div>
          <p className="text-base sm:text-lg text-slate-100 font-medium italic leading-relaxed mb-6">
            &ldquo;{study.testimonial.quote}&rdquo;
          </p>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-md border border-purple-400/30">
              {study.testimonial.author.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="text-sm font-bold text-white">{study.testimonial.author}</div>
              <div className="text-xs text-purple-300/80">
                {study.testimonial.role} • {study.testimonial.company}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Banner */}
        <div className="bg-gradient-to-r from-[#120733] via-[#190d45] to-[#120733] rounded-3xl p-8 sm:p-12 text-center text-white border border-purple-500/35 mb-14 shadow-2xl">
          <div className="max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#c084fc] text-xs font-semibold mb-4 border border-white/10">
              ⚡ Scalable Growth Model
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight mb-4">
              Ready to Achieve Similar Results for Your Business?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-8">
              We engineer custom digital marketing, technical SEO, and Next.js platforms tailored to high-growth brands. Let us audit your website and propose an actionable roadmap.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="bg-gradient-to-r from-[#A068FF] to-[#7c3aed] hover:brightness-110 text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-lg transition-all cursor-pointer"
              >
                Book Free Growth Consultation →
              </Link>
              <Link
                href="/projects"
                className="bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-7 py-3.5 rounded-full border border-white/20 transition-all cursor-pointer"
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
              <h2 className="text-2xl font-black text-white">Explore More Case Studies</h2>
              <p className="text-xs text-slate-400 mt-1">
                See how other companies scale organic search with Balaji Prime Media
              </p>
            </div>
            <Link
              href="/projects"
              className="text-xs font-bold text-[#c084fc] hover:text-white flex items-center gap-1 transition-colors"
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
                className="group bg-[#0d0726]/80 rounded-3xl border border-purple-500/20 overflow-hidden flex flex-col justify-between transition-all hover:border-[#A068FF]/50 hover:shadow-[0_10px_30px_rgba(160,104,255,0.18)] cursor-pointer"
              >
                {item.coverImage && (
                  <div className="aspect-[16/10] w-full overflow-hidden bg-slate-900">
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#d8b4fe] bg-[#120733] px-2.5 py-0.5 rounded-full border border-purple-500/30 inline-block mb-2">
                      {item.category}
                    </span>
                    <h3 className="text-base font-bold text-white group-hover:text-[#A068FF] transition-colors mb-2">
                      {item.shortTitle}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                      {item.overview}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-purple-500/15 flex items-center justify-between text-xs mt-auto">
                    <span className="font-bold text-cyan-300">
                      {item.stat} {item.statLabel}
                    </span>
                    <span className="text-[#c084fc] font-semibold group-hover:translate-x-1 transition-transform">
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
