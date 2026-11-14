import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { servicesData } from "../servicesData";
import GlobalWebPricingMatrix from "../../components/GlobalWebPricingMatrix";
import {
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  HelpCircle,
  Cpu,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData.find((s) => s.id === slug);

  if (!service) {
    return {
      title: "Service Not Found | Balaji Prime Media",
    };
  }

  return {
    title: `${service.name} | Balaji Prime Media`,
    description: `${service.headline} - ${service.tagline.slice(0, 150)}...`,
    alternates: {
      canonical: `https://balajiprimemedia.in/services/${service.id}`,
    },
    openGraph: {
      title: `${service.name} | Balaji Prime Media`,
      description: service.headline,
      type: "website",
      images: [
        {
          url: service.heroImage,
          width: 1200,
          height: 630,
          alt: service.name,
        },
      ],
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.id === slug);

  if (!service) {
    notFound();
  }

  const otherServices = servicesData.filter((s) => s.id !== service.id).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.headline,
    "provider": {
      "@type": "Organization",
      "name": "Balaji Prime Media",
      "url": "https://balajiprimemedia.in",
    },
    "serviceType": service.category,
    "offers": {
      "@type": "Offer",
      "price": service.priceUSD.replace("$", ""),
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
    },
  };

  return (
    <div className="relative min-h-screen bg-[#090a0f] text-white overflow-hidden font-['Lexend',sans-serif]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Ambient background glows */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[#A068FF]/15 rounded-full blur-[140px] pointer-events-none -z-0"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#22d3ee]/10 rounded-full blur-[120px] pointer-events-none -z-0"
        aria-hidden="true"
      />

      <Navbar activePage="services" />

      {/* Breadcrumb Navigation */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-8 sm:pt-10">
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400">
          <Link href="/" className="hover:text-[#c084fc] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/services" className="hover:text-[#c084fc] transition-colors">
            Services
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#c084fc] font-bold truncate max-w-xs">{service.shortTitle}</span>
        </nav>
      </div>

      {/* 1. HERO SECTION */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-8 pb-14 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-7">
            {/* Category badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-xs font-semibold text-[#c084fc] mb-5 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#A068FF] animate-pulse" />
              <span>{service.category}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[600] tracking-tight leading-[1.12] mb-5 text-white">
              {service.headline}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-[300] leading-relaxed mb-8 max-w-2xl">
              {service.tagline}
            </p>

            {/* Pricing & TAT Pill */}
            <div className="inline-flex flex-wrap items-center gap-3 sm:gap-4 p-2.5 sm:p-3 rounded-2xl bg-white/[0.04] border border-white/15 backdrop-blur-md mb-2">
              <div className="flex items-baseline gap-1.5 px-3">
                <span className="text-xl sm:text-2xl font-bold text-[#22d3ee]">{service.priceUSD}</span>
                <span className="text-xs text-slate-400 font-medium">({service.priceINR})</span>
                <span className="text-xs text-slate-400 font-medium ml-1">/ {service.billingPeriod}</span>
              </div>
              <div className="h-5 w-px bg-white/20 hidden sm:block" />
              <div className="flex items-center gap-1.5 px-3 text-xs text-slate-300 font-medium">
                <Clock className="w-3.5 h-3.5 text-[#22d3ee]" />
                <span>TAT: {service.tat}</span>
              </div>
            </div>
          </div>

          {/* Hero Featured Photo Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl group">
              <img
                src={service.heroImage}
                alt={service.name}
                className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/15">
                <div className="flex items-center justify-between text-xs font-semibold text-[#22d3ee] mb-1">
                  <span>Guaranteed Execution Standard</span>
                  <span>100% Verified</span>
                </div>
                <div className="text-white text-sm font-medium">
                  Deployed by Senior Engineers &amp; SEO Specialists
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. STATS BAR: MEASURABLE IMPACT */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pb-14 sm:pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {service.stats.map((stat, i) => (
            <div
              key={i}
              className="p-5 sm:p-6 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md hover:border-purple-500/50 transition-colors"
            >
              <div className="text-3xl sm:text-4xl font-[600] text-[#c084fc] tracking-tight mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-[500] text-white mb-1.5">{stat.label}</div>
              <div className="text-xs font-[300] text-slate-400 leading-snug">{stat.detail}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. OVERVIEW & PROBLEM SOLVED */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 sm:py-16 border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          <div className="lg:col-span-6 bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-8">
            <div className="flex items-center gap-2.5 text-[#A068FF] text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-4 h-4" />
              <span>Service Strategic Overview</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-[600] text-white tracking-tight mb-4">
              Why This Service Drives Disproportionate ROI
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-[300] leading-relaxed">
              {service.overview}
            </p>
          </div>

          <div className="lg:col-span-6 bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-8">
            <div className="flex items-center gap-2.5 text-[#22d3ee] text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>The Industry Problem We Solve</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-[600] text-white tracking-tight mb-4">
              Eliminating Technical Bottlenecks
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-[300] leading-relaxed">
              {service.problemSolved}
            </p>
          </div>

        </div>
      </section>

      {/* 4. DELIVERABLES & FEATURES */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 sm:py-16 border-t border-white/10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#A068FF] tracking-wider uppercase">
            What&apos;s Included In Every Package
          </span>
          <h2 className="text-3xl sm:text-4xl font-[600] text-white tracking-tight mt-2 mb-3">
            Comprehensive Deliverables &amp; Scope
          </h2>
          <p className="text-sm text-slate-300 font-[300]">
            Complete transparency with zero hidden fees. Every deliverable is verified and tracked live.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-14">
          {service.deliverables.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3.5 p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors"
            >
              <CheckCircle2 className="w-5 h-5 text-[#22d3ee] shrink-0 mt-0.5" />
              <span className="text-sm text-slate-200 font-[300] leading-relaxed">{item}</span>
            </div>
          ))}
        </div>

        {/* 4 Key Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {service.features.map((feat, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10"
            >
              <div className="text-3xl mb-3">{feat.icon}</div>
              <h3 className="text-lg font-[600] text-white mb-2">{feat.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 font-[300] leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. 4-STEP PROCESS WORKFLOW */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 sm:py-16 border-t border-white/10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#A068FF] tracking-wider uppercase">
            Execution Roadmap
          </span>
          <h2 className="text-3xl sm:text-4xl font-[600] text-white tracking-tight mt-2 mb-3">
            Our 4-Step Proven Execution Process
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {service.process.map((p, i) => (
            <div
              key={i}
              className="relative p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between"
            >
              <div>
                <span className="text-2xl font-[700] text-[#c084fc] mb-3 block">
                  {p.step}
                </span>
                <h3 className="text-lg font-[600] text-white mb-2">{p.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 font-[300] leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. GLOBAL COUNTRY-WISE PRICING & SCOPE MATRIX (Special for Website Development) */}
      {service.id === "website-development" && (
        <GlobalWebPricingMatrix />
      )}

      {/* 6. TECH STACK & TOOLS */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-10 border-t border-white/10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10">
          <div className="flex items-center gap-3">
            <Cpu className="w-6 h-6 text-[#22d3ee]" />
            <div>
              <h3 className="text-base font-bold text-white">Enterprise Tooling &amp; Stack</h3>
              <p className="text-xs text-slate-400">Industry-leading platforms powering this service</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
            {service.technologies.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-white font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 border-t border-white/10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-[#A068FF] text-xs font-bold uppercase tracking-wider mb-2">
            <HelpCircle className="w-4 h-4" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-[600] text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {service.faq.map((item, i) => (
            <div
              key={i}
              className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10"
            >
              <h3 className="text-base font-[600] text-white mb-2">{item.q}</h3>
              <p className="text-sm text-slate-300 font-[300] leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. BOTTOM DIRECT ACTION BANNER */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12">
        <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden border border-purple-500/30 bg-gradient-to-r from-[#170936] via-[#0f0624] to-[#070318] text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-[600] text-white mb-3 tracking-tight">
            Ready to Scale with {service.name}?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-[300] max-w-xl mx-auto mb-8">
            Speak directly with our technical lead. We analyze your website and provide a customized growth plan within 12 hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-full bg-white hover:bg-neutral-100 text-black font-[600] text-sm transition-all shadow-xl hover:scale-105 cursor-pointer"
            >
              Request Custom Proposal →
            </Link>
            <Link
              href="/pay"
              className="px-8 py-3.5 rounded-full bg-white/[0.1] hover:bg-white/[0.15] border border-white/20 text-white font-[500] text-sm transition-all cursor-pointer"
            >
              Client Payment Portal 💳
            </Link>
          </div>
        </div>
      </section>

      {/* 9. EXPLORE OTHER SERVICES */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 border-t border-white/10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-[#A068FF] uppercase tracking-wider">Explore More</span>
            <h2 className="text-2xl font-[600] text-white">Other Core Growth Services</h2>
          </div>
          <Link
            href="/services"
            className="text-xs sm:text-sm font-semibold text-[#c084fc] hover:text-[#A068FF] flex items-center gap-1"
          >
            <span>View All 6 Services</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherServices.map((other) => (
            <Link
              key={other.id}
              href={`/services/${other.id}`}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-purple-500/50 transition-all hover:-translate-y-1 group flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-bold text-[#c084fc] uppercase">{other.category}</span>
                <h3 className="text-lg font-[600] text-white mt-1 mb-2 group-hover:text-[#c084fc] transition-colors">
                  {other.name}
                </h3>
                <p className="text-xs text-slate-300 font-[300] line-clamp-2 leading-relaxed">
                  {other.tagline}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-medium text-slate-400">
                <span>View Full Details</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
