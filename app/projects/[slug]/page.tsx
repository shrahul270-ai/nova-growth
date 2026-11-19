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
    <div className="relative min-h-screen bg-[#07030d] text-white selection:bg-[#681fe4] selection:text-white font-satoshi antialiased overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudyJsonLd) }}
      />

      {/* 240px x 240px White Gridlines at 4.5% Opacity */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-grid-white-240" aria-hidden="true" />

      {/* Modern Industrial Header */}
      <div className="relative z-40">
        <Navbar activePage="projects" />
      </div>

      {/* Breadcrumb Navigation */}
      <div className="relative z-10 max-w-[1320px] mx-auto px-6 sm:px-12 pt-8 sm:pt-12 text-left">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-400"
        >
          <Link href="/" className="hover:text-white transition-colors">
            HOME
          </Link>
          <span className="text-white/20">/</span>
          <Link href="/projects" className="hover:text-white transition-colors">
            CASE STUDIES
          </Link>
          <span className="text-white/20">/</span>
          <span className="text-[#681fe4] font-bold truncate max-w-xs">{study.shortTitle.toUpperCase()}</span>
        </nav>
      </div>

      {/* Case Study Content */}
      <article className="relative z-10 max-w-[1320px] mx-auto px-6 sm:px-12 pt-8 pb-24 sm:pb-32">
        {/* Header Section */}
        <header className="mb-10 text-left">
          {/* Badges Bar */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="font-bebas text-xs tracking-[0.18em] text-[#681fe4] bg-white/5 border border-white/10 px-3.5 py-1 rounded-[2px] shadow-2xs">
              🏆 {study.category.toUpperCase()}
            </span>
            <span className="font-mono text-xs text-neutral-300 bg-white/5 border border-white/10 px-3 py-1 rounded-[2px]">
              📍 {study.client}
            </span>
            <span className="font-mono text-xs text-neutral-400 bg-white/5 border border-white/10 px-3 py-1 rounded-[2px]">
              ⏱️ {study.timeline}
            </span>
          </div>

          {/* Title in Bebas Neue */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bebas tracking-[0.06em] text-white leading-[0.95] mb-6 uppercase">
            {study.title}
          </h1>
        </header>

        {/* Featured Cover Image (100% Grayscale) */}
        {study.coverImage && (
          <div className="overflow-hidden rounded-[4px] border border-white/10 shadow-2xl aspect-[16/9] max-h-[500px] w-full mb-12 relative bg-black">
            <img
              src={study.coverImage}
              alt={study.title}
              className="w-full h-full object-cover filter grayscale contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07030d] via-transparent to-transparent pointer-events-none" />
          </div>
        )}

        {/* Executive Impact Callout */}
        <div className="bg-[#0c0617] text-white rounded-[4px] p-8 sm:p-12 shadow-2xl mb-12 border border-white/10 relative overflow-hidden text-left">
          <div
            className="absolute top-0 right-0 w-[40%] h-full bg-[#220090] clip-diagonal-split pointer-events-none opacity-50"
            aria-hidden="true"
          />
          <div className="relative z-10">
            <div className="font-bebas text-xs tracking-[0.24em] text-[#681fe4] mb-2 flex items-center gap-2 uppercase">
              <span className="w-2 h-2 rounded-full bg-[#681fe4] animate-ping" />
              PRIMARY COMMERCIAL MILESTONE
            </div>
            <div className="text-4xl sm:text-6xl font-bebas tracking-[0.06em] text-white mt-1 uppercase">
              {study.stat}{" "}
              <span className="text-[#681fe4] text-3xl sm:text-5xl">
                {study.statLabel}
              </span>
            </div>
            <p className="text-sm sm:text-base text-neutral-300 mt-3 max-w-2xl leading-relaxed font-normal">
              {study.heroMetric}
            </p>
          </div>
        </div>

        {/* 4 Key Metrics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12 text-left">
          {study.metrics.map((m, idx) => (
            <div
              key={idx}
              className="bg-[#0c0617] rounded-[4px] p-6 border border-white/10 shadow-xs flex flex-col justify-between hover:border-[#681fe4]/60 transition-all"
            >
              <div className="font-bebas text-3xl sm:text-4xl tracking-[0.06em] text-[#681fe4] mb-1">
                {m.value}
              </div>
              <div>
                <div className="font-bebas text-sm tracking-[0.14em] text-white uppercase">{m.label}</div>
                <div className="text-xs font-mono text-neutral-400 mt-1">{m.detail}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Overview Box */}
        <div className="bg-[#0c0617] rounded-[4px] p-8 sm:p-10 border border-white/10 shadow-xs mb-12 text-left">
          <span className="font-bebas text-xs sm:text-sm tracking-[0.24em] text-[#681fe4] uppercase block mb-3">
            // EXECUTIVE SUMMARY
          </span>
          <p className="text-base sm:text-lg text-neutral-200 leading-[2rem] font-normal">
            {study.overview}
          </p>
        </div>

        {/* The Challenge & The Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 text-left">
          {/* Challenge Box */}
          <div className="bg-[#0c0617] rounded-[4px] p-8 border border-white/10 shadow-xs">
            <span className="font-bebas text-xs tracking-[0.24em] text-rose-400 uppercase block mb-3">
              // THE BOTTLENECK
            </span>
            <h3 className="font-bebas text-2xl sm:text-3xl tracking-[0.08em] text-white mb-4 uppercase">
              {study.challenge.heading}
            </h3>
            <ul className="space-y-3.5">
              {study.challenge.points.map((pt, i) => (
                <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300">
                  <span className="text-rose-400 font-bold shrink-0 mt-0.5 font-mono">✕</span>
                  <span className="leading-relaxed">{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solution Box */}
          <div className="bg-[#0c0617] rounded-[4px] p-8 border border-white/10 shadow-xs">
            <span className="font-bebas text-xs tracking-[0.24em] text-[#681fe4] uppercase block mb-3">
              // THE STRATEGY
            </span>
            <h3 className="font-bebas text-2xl sm:text-3xl tracking-[0.08em] text-white mb-3 uppercase">
              {study.solution.heading}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 mb-4 leading-relaxed font-normal">
              {study.solution.description}
            </p>
            <ul className="space-y-3.5">
              {study.solution.keyPoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300">
                  <span className="text-[#681fe4] font-bold shrink-0 mt-0.5 font-mono">✓</span>
                  <span className="leading-relaxed">{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Full Deliverables & Tech Architecture */}
        <div className="bg-[#0c0617] rounded-[4px] p-8 sm:p-10 border border-white/10 shadow-xs mb-12 text-left">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <span className="font-bebas text-xs sm:text-sm tracking-[0.24em] text-[#681fe4] uppercase block mb-3">
                // DELIVERABLES MATRIX
              </span>
              <h3 className="font-bebas text-2xl sm:text-3xl tracking-[0.08em] text-white mb-5 uppercase">
                EXECUTED PROJECT DELIVERABLES
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {study.deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 bg-white/[0.03] p-4 rounded-[2px] border border-white/5 text-xs font-mono text-neutral-300"
                  >
                    <span className="text-[#681fe4] font-bold">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t md:border-t-0 md:border-l border-white/10 md:pl-8">
              <span className="font-bebas text-xs sm:text-sm tracking-[0.24em] text-white/70 uppercase block mb-3">
                DEPLOYED STACK
              </span>
              <div className="flex flex-wrap gap-2">
                {study.tech.map((t, idx) => (
                  <span
                    key={idx}
                    className="bg-white/5 text-neutral-300 border border-white/10 px-3 py-1.5 rounded-[2px] font-mono text-xs shadow-2xs"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-6 p-4 rounded-[2px] bg-white/[0.03] border border-white/10 text-xs font-mono">
                <div className="text-white/50 mb-1">TARGET MARKET //</div>
                <div className="text-white font-bold">{study.country}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Client Testimonial Card */}
        <div className="bg-[#0c0617] rounded-[4px] p-8 sm:p-12 border border-white/10 shadow-xl mb-14 text-left relative overflow-hidden">
          <div className="flex items-center gap-1.5 text-[#681fe4] text-base mb-4 font-mono">
            {"★★★★★".split("").map((star, i) => (
              <span key={i}>{star}</span>
            ))}
            <span className="font-bebas text-xs tracking-[0.18em] text-neutral-400 ml-3 uppercase">
              VERIFIED CLIENT REVIEW
            </span>
          </div>
          <p className="text-base sm:text-xl text-neutral-200 font-normal italic leading-[2rem] mb-6">
            &ldquo;{study.testimonial.quote}&rdquo;
          </p>
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-[4px] bg-[#681fe4] text-white flex items-center justify-center font-bebas text-base">
              {study.testimonial.author.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="font-bebas text-lg tracking-[0.1em] text-white uppercase">{study.testimonial.author}</div>
              <div className="text-xs font-mono text-neutral-400">
                {study.testimonial.role} • {study.testimonial.company}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Banner */}
        <div className="bg-[#0c0617] rounded-[4px] p-8 sm:p-14 text-center text-white border border-white/10 shadow-2xl mb-16 relative overflow-hidden">
          <div
            className="absolute top-0 right-0 w-[45%] h-full bg-[#220090] clip-diagonal-split pointer-events-none opacity-60"
            aria-hidden="true"
          />
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="font-bebas text-xs sm:text-sm tracking-[0.24em] text-[#681fe4] uppercase block mb-2">
              // SPRINT CAPACITY AVAILABLE
            </span>
            <h2 className="text-3xl sm:text-5xl font-bebas tracking-[0.06em] uppercase mb-4 text-white">
              READY TO ACHIEVE SIMILAR RESULTS FOR YOUR BUSINESS?
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-8">
              We engineer custom digital marketing, technical SEO, and Next.js platforms tailored to high-growth brands. Let us audit your website and propose an actionable roadmap.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact-us"
                className="bg-[#681fe4] hover:bg-[#5815cb] text-white font-bebas text-base tracking-[0.18em] px-8 py-4 rounded-[4px] shadow-lg transition-all cursor-pointer"
              >
                BOOK FREE GROWTH CONSULTATION →
              </Link>
              <Link
                href="/projects"
                className="bg-transparent hover:bg-white/5 text-white font-bebas text-base tracking-[0.18em] px-7 py-4 rounded-[4px] border border-white/20 transition-all cursor-pointer"
              >
                BROWSE ALL CASE STUDIES
              </Link>
            </div>
          </div>
        </div>

        {/* Related Case Studies Grid */}
        <div className="text-left">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-4xl font-bebas tracking-[0.06em] text-white uppercase">
                EXPLORE MORE CASE STUDIES
              </h2>
              <p className="text-xs font-mono text-neutral-400 mt-1">
                See how other companies scale organic search with Balaji Prime Media
              </p>
            </div>
            <Link
              href="/projects"
              className="font-bebas text-xs sm:text-sm tracking-[0.18em] text-[#681fe4] hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>VIEW ALL</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherStudies.map((item) => (
              <Link
                key={item.id}
                href={`/projects/${item.id}`}
                className="group bg-[#0c0617] rounded-[4px] border border-white/10 overflow-hidden flex flex-col justify-between transition-all hover:border-[#681fe4]/60 cursor-pointer"
              >
                {item.coverImage && (
                  <div className="aspect-[16/10] w-full overflow-hidden bg-black">
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="font-bebas text-[11px] tracking-[0.18em] text-[#681fe4] bg-white/5 px-2.5 py-0.5 rounded-[2px] border border-white/10 inline-block mb-2">
                      {item.category.toUpperCase()}
                    </span>
                    <h3 className="font-bebas text-xl tracking-[0.1em] text-white group-hover:text-[#681fe4] transition-colors mb-2 uppercase">
                      {item.shortTitle}
                    </h3>
                    <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed mb-4">
                      {item.overview}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono mt-auto">
                    <span className="font-bold text-[#681fe4]">
                      {item.stat} {item.statLabel}
                    </span>
                    <span className="text-white group-hover:translate-x-1 transition-transform">
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
