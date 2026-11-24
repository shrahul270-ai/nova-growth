import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { servicesData } from "../servicesData";
import GlobalWebPricingMatrix from "../../components/GlobalWebPricingMatrix";
import FlutterShowcaseView from "../../components/FlutterShowcaseView";
import PhpShowcaseView from "../../components/PhpShowcaseView";
import FaqAccordion from "../../components/FaqAccordion";
import {
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  HelpCircle,
  Cpu,
  CreditCard,
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
    <div className="relative min-h-screen bg-[#07030d] text-white overflow-hidden font-satoshi selection:bg-[#681fe4] selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Background Grid Pattern & Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(104,31,228,0.18),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-white-240 opacity-40 pointer-events-none" />

      {/* Top Navbar */}
      <div className="relative z-50">
        <Navbar activePage="services" />
      </div>

      {/* Breadcrumb Navigation in Sharp Mono */}
      <div className="relative z-10 max-w-[1320px] mx-auto px-6 sm:px-12 pt-28 sm:pt-36">
        <nav className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.14em] text-neutral-400">
          <Link href="/" className="hover:text-white transition-colors">
            HOME
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
          <Link href="/services" className="hover:text-white transition-colors">
            SERVICES
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
          <span className="text-[#681fe4] font-medium truncate max-w-xs">{service.shortTitle}</span>
        </nav>
      </div>

      {/* 1. HERO SECTION */}
      <section className="relative z-10 max-w-[1320px] mx-auto px-6 sm:px-12 pt-8 pb-14 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          <div className="lg:col-span-7">
            {/* Category badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] bg-white/[0.04] border border-white/10 font-mono text-xs uppercase tracking-[0.2em] text-[#681fe4] mb-5">
              <span className="w-2 h-2 rounded-[2px] bg-[#681fe4] animate-pulse" />
              <span>{service.category}</span>
            </div>

            <h1 className="font-bebas text-4xl sm:text-6xl md:text-7xl tracking-[0.14em] text-white uppercase leading-[0.95] mb-6">
              {service.headline}
            </h1>

            <p className="font-satoshi text-neutral-300 text-sm sm:text-base md:text-lg leading-relaxed mb-8 max-w-2xl font-normal">
              {service.tagline}
            </p>

            {/* Pricing & TAT Pill in Sharp 4px Box */}
            <div className="inline-flex flex-wrap items-center gap-4 p-3 rounded-[4px] bg-[#0c0818] border border-white/10 mb-2 font-mono">
              <div className="flex items-baseline gap-2 px-2">
                <span className="text-2xl font-bold text-white">{service.priceUSD}</span>
                <span className="text-xs text-neutral-400">({service.priceINR})</span>
                <span className="text-xs text-neutral-500 ml-1">/ {service.billingPeriod}</span>
              </div>
              <div className="h-5 w-px bg-white/20 hidden sm:block" />
              <div className="flex items-center gap-2 px-2 text-xs text-neutral-300">
                <Clock className="w-3.5 h-3.5 text-[#681fe4]" />
                <span>TAT: {service.tat}</span>
              </div>
            </div>
          </div>

          {/* Hero Featured Photo Card with Grayscale Filter */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-[4px] overflow-hidden border border-white/10 shadow-2xl group bg-black">
              <img
                src={service.heroImage}
                alt={service.name}
                className="w-full h-80 sm:h-96 object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07030d] via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-[4px] bg-[#0c0818]/90 border border-white/10 backdrop-blur-md">
                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-[0.14em] text-[#681fe4] mb-1">
                  <span>GUARANTEED STANDARD</span>
                  <span>100% VERIFIED</span>
                </div>
                <div className="text-white text-xs sm:text-sm font-medium">
                  Deployed by Senior Engineers &amp; SEO Specialists
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. STATS BAR: MEASURABLE IMPACT */}
      <section className="relative z-10 max-w-[1320px] mx-auto px-6 sm:px-12 pb-14 sm:pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {service.stats.map((stat, i) => (
            <div
              key={i}
              className="p-6 rounded-[4px] bg-[#0c0818] border border-white/10 hover:border-[#681fe4] transition-colors"
            >
              <div className="font-bebas text-3xl sm:text-5xl text-[#681fe4] tracking-[0.1em] mb-1 leading-none">
                {stat.value}
              </div>
              <div className="font-bebas text-base tracking-[0.14em] uppercase text-white mb-2">{stat.label}</div>
              <div className="text-xs text-neutral-400 font-normal leading-relaxed">{stat.detail}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. OVERVIEW & PROBLEM SOLVED */}
      <section className="relative z-10 max-w-[1320px] mx-auto px-6 sm:px-12 py-14 sm:py-20 border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          <div className="lg:col-span-6 bg-[#0c0818] border border-white/10 rounded-[4px] p-8 sm:p-10">
            <div className="flex items-center gap-2 text-[#681fe4] font-bebas text-xs tracking-[0.2em] uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>// STRATEGIC OVERVIEW</span>
            </div>
            <h3 className="font-bebas text-2xl sm:text-4xl tracking-[0.14em] text-white uppercase mb-4 leading-tight">
              WHY THIS SERVICE DRIVES DISPROPORTIONATE ROI
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed">
              {service.overview}
            </p>
          </div>

          <div className="lg:col-span-6 bg-[#0c0818] border border-white/10 rounded-[4px] p-8 sm:p-10">
            <div className="flex items-center gap-2 text-[#681fe4] font-bebas text-xs tracking-[0.2em] uppercase mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>// PROBLEM ARCHITECTURE</span>
            </div>
            <h3 className="font-bebas text-2xl sm:text-4xl tracking-[0.14em] text-white uppercase mb-4 leading-tight">
              ELIMINATING TECHNICAL BOTTLENECKS
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed">
              {service.problemSolved}
            </p>
          </div>

        </div>
      </section>

      {/* 4. DELIVERABLES & FEATURES */}
      <section className="relative z-10 max-w-[1320px] mx-auto px-6 sm:px-12 py-14 sm:py-20 border-t border-white/10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-bebas text-xs tracking-[0.24em] text-[#681fe4] uppercase block mb-1">
            // INCLUSIONS
          </span>
          <h2 className="font-bebas text-3xl sm:text-5xl tracking-[0.14em] text-white uppercase leading-none mb-3">
            COMPREHENSIVE DELIVERABLES &amp; SCOPE
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-normal">
            Complete transparency with zero hidden fees. Every deliverable is verified and tracked live.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-14">
          {service.deliverables.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3.5 p-5 rounded-[4px] bg-[#0c0818] border border-white/10 hover:border-white/20 transition-colors"
            >
              <CheckCircle2 className="w-4 h-4 text-[#681fe4] shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-neutral-200 font-normal leading-relaxed">{item}</span>
            </div>
          ))}
        </div>

        {/* 4 Key Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {service.features.map((feat, i) => (
            <div
              key={i}
              className="p-8 rounded-[4px] bg-[#0c0818] border border-white/10 shadow-lg"
            >
              <div className="text-3xl mb-4">{feat.icon}</div>
              <h3 className="font-bebas text-xl tracking-[0.14em] uppercase text-white mb-2">{feat.title}</h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-normal leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. 4-STEP PROCESS WORKFLOW */}
      <section className="relative z-10 max-w-[1320px] mx-auto px-6 sm:px-12 py-14 sm:py-20 border-t border-white/10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-bebas text-xs tracking-[0.24em] text-[#681fe4] uppercase block mb-1">
            // EXECUTION ROADMAP
          </span>
          <h3 className="font-bebas text-3xl sm:text-5xl tracking-[0.14em] text-white uppercase leading-none">
            OUR 4-STEP PROVEN EXECUTION PROCESS
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {service.process.map((p, i) => (
            <div
              key={i}
              className="relative p-8 rounded-[4px] bg-[#0c0818] border border-white/10 flex flex-col justify-between shadow-lg"
            >
              <div>
                <span className="font-bebas text-3xl text-[#681fe4] tracking-[0.14em] mb-2 block leading-none">
                  {p.step}
                </span>
                <h3 className="font-bebas text-xl tracking-[0.14em] uppercase text-white mb-2">{p.title}</h3>
                <p className="text-xs sm:text-sm text-neutral-400 font-normal leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GLOBAL COUNTRY-WISE PRICING & SCOPE MATRIX (Special for Website Development) */}
      {service.id === "website-development" && (
        <GlobalWebPricingMatrix />
      )}

      {/* DEDICATED FLUTTER APP DEVELOPMENT MATRIX & PRICING */}
      {service.id === "flutter-app-dev" && (
        <FlutterShowcaseView />
      )}

      {/* DEDICATED FULL-STACK PHP & LARAVEL MATRIX & PRICING */}
      {service.id === "full-stack-php-dev" && (
        <PhpShowcaseView />
      )}

      {/* 6. TECH STACK & TOOLS */}
      <section className="relative z-10 max-w-[1320px] mx-auto px-6 sm:px-12 py-10 border-t border-white/10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-[4px] bg-[#0c0818] border border-white/10">
          <div className="flex items-center gap-3">
            <Cpu className="w-5 h-5 text-[#681fe4]" />
            <div>
              <h3 className="font-bebas text-xl tracking-[0.14em] uppercase text-white">ENTERPRISE TOOLING &amp; STACK</h3>
              <p className="text-xs font-mono text-neutral-400">Industry-leading platforms powering this service</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
            {service.technologies.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-[2px] bg-white/[0.04] border border-white/10 text-xs font-mono text-neutral-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-14 sm:py-20 border-t border-white/10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-[#38bdf8] font-bebas text-xs tracking-[0.2em] uppercase mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span>// GOT QUESTIONS?</span>
          </div>
          <h2 className="font-bebas text-3xl sm:text-5xl tracking-[0.14em] text-white uppercase leading-none">
            FREQUENTLY ASKED QUESTIONS
          </h2>
        </div>

        <FaqAccordion items={service.faq} />
      </section>

      {/* 8. BOTTOM DIRECT ACTION BANNER */}
      <section className="relative z-10 max-w-[1320px] mx-auto px-6 sm:px-12 py-14">
        <div className="relative rounded-[4px] p-10 sm:p-14 overflow-hidden border border-white/10 bg-[#0c0818] text-center shadow-2xl">
          <span className="font-bebas text-xs tracking-[0.24em] text-[#681fe4] uppercase block mb-2">
            // INITIATE CAMPAIGN
          </span>
          <h3 className="font-bebas text-3xl sm:text-5xl tracking-[0.14em] text-white uppercase mb-3 leading-none">
            READY TO SCALE WITH {service.name}?
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 font-normal max-w-xl mx-auto mb-8 leading-relaxed">
            Speak directly with our technical lead. We analyze your website and provide a customized growth plan within 12 hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact-us"
              className="group inline-flex items-center justify-center gap-2 h-12 px-8 rounded-[4px] bg-[#681fe4] hover:bg-[#5815cb] text-white font-bebas text-sm tracking-[0.16em] uppercase transition-all shadow-[0_10px_25px_rgba(104,31,228,0.35)] cursor-pointer whitespace-nowrap"
            >
              <span>REQUEST CUSTOM PROPOSAL →</span>
            </Link>
            <Link
              href="/pay"
              className="group inline-flex items-center justify-center gap-2.5 h-12 px-8 rounded-[4px] bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white font-bebas text-sm tracking-[0.16em] uppercase transition-all cursor-pointer whitespace-nowrap"
            >
              <CreditCard className="w-4 h-4 text-[#681fe4]" />
              <span>CLIENT PAYMENT PORTAL 💳</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 9. EXPLORE OTHER SERVICES */}
      <section className="relative z-10 max-w-[1320px] mx-auto px-6 sm:px-12 py-14 border-t border-white/10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="font-bebas text-xs tracking-[0.2em] text-[#681fe4] uppercase block mb-1">
              // SERVICE DIRECTORY
            </span>
            <h3 className="font-bebas text-2xl sm:text-3xl tracking-[0.14em] uppercase text-white leading-none">
              OTHER CORE GROWTH SERVICES
            </h3>
          </div>
          <Link
            href="/services"
            className="font-bebas text-xs tracking-[0.14em] uppercase text-[#681fe4] hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>VIEW ALL SERVICES</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherServices.map((other) => (
            <Link
              key={other.id}
              href={`/services/${other.id}`}
              className="p-8 rounded-[4px] bg-[#0c0818] border border-white/10 hover:border-[#681fe4] transition-all hover:-translate-y-1 group flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-[10px] text-[#681fe4] uppercase tracking-wider block mb-1">{other.category}</span>
                <h3 className="font-bebas text-xl tracking-[0.14em] uppercase text-white mb-2 group-hover:text-[#681fe4] transition-colors">
                  {other.name}
                </h3>
                <p className="text-xs text-neutral-400 font-normal line-clamp-2 leading-relaxed">
                  {other.tagline}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-400">
                <span>VIEW FULL DETAILS</span>
                <span className="group-hover:translate-x-1 transition-transform text-[#681fe4]">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
