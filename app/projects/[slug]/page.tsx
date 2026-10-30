import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import HeaderBackgroundAnimation from "../../components/HeaderBackgroundAnimation";
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
      title: "Case Study Not Found | Nova Growth",
    };
  }

  return {
    title: `${study.title} | Nova Growth Agency`,
    description: `${study.overview.slice(0, 155)}...`,
    alternates: {
      canonical: `https://nova-growth-six.vercel.app/projects/${study.id}`,
    },
    openGraph: {
      title: `${study.title} | Case Study`,
      description: study.overview,
      type: "article",
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
    "name": study.title,
    "headline": study.title,
    "description": study.overview,
    "author": {
      "@type": "Organization",
      "name": "Nova Growth Agency",
      "url": "https://nova-growth-six.vercel.app"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Nova Growth Agency",
      "url": "https://nova-growth-six.vercel.app"
    },
    "about": study.category,
    "spatialCoverage": study.country
  };

  return (
    <div className="relative min-h-screen bg-[#f8fbf9] text-[#111827] overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudyJsonLd) }}
      />

      <div className="curved-ribbon-left" aria-hidden="true" />
      <div className="curved-ribbon-right" aria-hidden="true" />

      <Navbar activePage="projects" />

      {/* Breadcrumb Navigation */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-10">
        <nav className="flex items-center gap-2 text-xs font-semibold text-gray-500">
          <Link href="/" className="hover:text-[#091427] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/projects" className="hover:text-[#091427] transition-colors">
            Case Studies
          </Link>
          <span>/</span>
          <span className="text-[#d97706] truncate max-w-xs">{study.shortTitle}</span>
        </nav>
      </div>

      {/* Case Study Hero */}
      <article className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-16">
        <header className="relative w-full p-6 sm:p-10 rounded-3xl overflow-hidden mb-8 border border-amber-200/40 shadow-xs bg-white/60 backdrop-blur-xs">
          <HeaderBackgroundAnimation variant="subpage" />
          <div className="relative z-10">
            {/* Badges Bar */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 text-[#091427] border border-amber-200/80 text-xs font-bold badge-3d">
                <span>🏆</span>
                <span>{study.category}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold">
                <span>📍</span>
                <span>{study.client}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-900 border border-blue-200/70 text-xs font-semibold">
                <span>⏱️</span>
                <span>{study.timeline}</span>
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl md:text-5xl font-black text-[#0f172a] tracking-tight leading-[1.15]">
              {study.title}
            </h1>
          </div>
        </header>

        {/* Executive Impact Callout */}
        <div className="bg-gradient-to-r from-[#091427] to-[#0f213d] text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-[#091427]/15 mb-10 card-3d border border-[#d97706]/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-ping" />
              Primary Growth Milestone
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white mt-1">
              {study.stat} <span className="text-amber-400 text-2xl sm:text-3xl font-bold">{study.statLabel}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl leading-relaxed">
              {study.heroMetric}
            </p>
          </div>
          <Link
            href="/contact"
            className="btn-gold-3d shrink-0 bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-lg shadow-[#d97706]/30 transition-all cursor-pointer text-center"
          >
            Get Similar Growth →
          </Link>
        </div>

        {/* 4 Key Metrics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {study.metrics.map((m, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs card-3d flex flex-col justify-between"
            >
              <div className="text-2xl sm:text-3xl font-black text-[#091427] mb-1">
                {m.value}
              </div>
              <div>
                <div className="text-xs font-bold text-[#0f172a]">{m.label}</div>
                <div className="text-[11px] text-[#64748b] mt-1">{m.detail}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Overview Box */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xs card-3d mb-10">
          <h2 className="text-xs font-black uppercase tracking-wider text-[#d97706] mb-3">
            Executive Summary
          </h2>
          <p className="text-base sm:text-lg text-[#334155] leading-relaxed">
            {study.overview}
          </p>
        </div>

        {/* The Challenge & The Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* Challenge Box */}
          <div className="bg-rose-50/60 rounded-3xl p-7 border border-rose-100 card-3d">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-900 text-xs font-bold mb-4">
              <span>⚠️</span>
              <span>The Bottleneck</span>
            </div>
            <h3 className="text-xl font-bold text-[#0f172a] mb-4">
              {study.challenge.heading}
            </h3>
            <ul className="space-y-3">
              {study.challenge.points.map((pt, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                  <span className="text-rose-500 font-bold shrink-0 mt-0.5">✕</span>
                  <span className="leading-relaxed">{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solution Box */}
          <div className="bg-amber-50/60 rounded-3xl p-7 border border-amber-100 card-3d">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-[#091427] text-xs font-bold mb-4">
              <span>⚡</span>
              <span>The Strategy</span>
            </div>
            <h3 className="text-xl font-bold text-[#0f172a] mb-2">
              {study.solution.heading}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed">
              {study.solution.description}
            </p>
            <ul className="space-y-3">
              {study.solution.keyPoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                  <span className="text-[#d97706] font-bold shrink-0 mt-0.5">✓</span>
                  <span className="leading-relaxed">{pt}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Full Deliverables & Tech Architecture */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xs card-3d mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="md:col-span-2">
              <h3 className="text-lg font-bold text-[#0f172a] mb-4 flex items-center gap-2">
                <span>📋</span>
                <span>Executed Project Deliverables</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {study.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 bg-slate-50 p-3.5 rounded-2xl border border-gray-100 text-xs font-medium text-slate-800">
                    <span className="text-[#d97706] font-bold">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t md:border-t-0 md:border-l border-gray-100 md:pl-8">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">
                Deployed Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {study.tech.map((t, idx) => (
                  <span
                    key={idx}
                    className="bg-[#091427] text-amber-300 px-3 py-1.5 rounded-xl font-mono text-xs font-semibold shadow-xs"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-6 p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs">
                <div className="font-bold text-[#091427] mb-1">Target Audience Region</div>
                <div className="text-gray-600">{study.country}</div>
              </div>
            </div>

          </div>
        </div>

        {/* Client Testimonial Card */}
        <div className="bg-[#f8fafd] rounded-3xl p-8 border border-gray-200/80 shadow-xs card-3d mb-14 relative overflow-hidden">
          <div className="text-5xl text-[#d97706]/20 font-serif absolute top-4 right-6 select-none">
            “
          </div>
          <div className="flex items-center gap-2 text-amber-500 text-sm mb-4">
            {"★★★★★".split("").map((star, i) => (
              <span key={i}>{star}</span>
            ))}
            <span className="text-xs font-bold text-gray-500 ml-2">Verified Client Review</span>
          </div>
          <p className="text-base sm:text-lg text-[#0f172a] font-medium italic leading-relaxed mb-6">
            &ldquo;{study.testimonial.quote}&rdquo;
          </p>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#091427] text-white flex items-center justify-center font-bold text-sm">
              {study.testimonial.author.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="text-sm font-bold text-[#0f172a]">{study.testimonial.author}</div>
              <div className="text-xs text-[#64748b]">{study.testimonial.role} • {study.testimonial.company}</div>
            </div>
          </div>
        </div>

        {/* Call to Action Banner */}
        <div className="bg-gradient-to-tr from-[#091427] via-[#0f213d] to-[#091427] rounded-3xl p-8 sm:p-12 text-center text-white card-3d border border-[#d97706]/40 mb-16 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold mb-4 border border-white/10">
              ⚡ Scalable Growth Model
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight mb-4">
              Ready to Achieve Similar Results for Your Business?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-8">
              We engineer custom digital marketing and web solutions tailored to overseas businesses. Let us audit your website and propose an aggressive roadmap to scale your organic revenue.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="btn-gold-3d bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-sm px-8 py-4 rounded-full shadow-xl shadow-[#d97706]/30 transition-all cursor-pointer"
              >
                Book Free Growth Consultation →
              </Link>
              <Link
                href="/projects"
                className="btn-3d bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-7 py-4 rounded-full border border-white/20 transition-all cursor-pointer"
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
              <h2 className="text-2xl font-black text-[#0f172a]">Explore More Case Studies</h2>
              <p className="text-xs text-gray-500 mt-1">See how other overseas companies scale with Nova Growth</p>
            </div>
            <Link
              href="/projects"
              className="text-xs font-bold text-[#091427] hover:text-[#d97706] flex items-center gap-1 transition-colors"
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
                className="group bg-white rounded-3xl border border-gray-100 p-5 card-3d flex flex-col justify-between transition-all hover:border-[#d97706]/50 cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/80">
                      {item.category}
                    </span>
                    <span className="text-2xl">{item.visual}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#0f172a] group-hover:text-[#091427] transition-colors mb-2">
                    {item.shortTitle}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-4">
                    {item.overview}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-black text-[#091427]">{item.stat} {item.statLabel}</span>
                  <span className="text-xs font-bold text-[#d97706] group-hover:translate-x-1 transition-transform">
                    Read Story →
                  </span>
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
