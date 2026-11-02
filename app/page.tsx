"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SeoAuditWidget from "./components/SeoAuditWidget";
import HeaderBackgroundAnimation from "./components/HeaderBackgroundAnimation";
import PromptHero from "./components/PromptHero";
import FeatureCard from "./components/FeatureCard";
import MotionCta3DOrb from "./components/MotionCta3DOrb";
import GlowRatingBento from "./components/GlowRatingBento";
import { Search, Code2, FileText, Mail, Link2, Settings } from "lucide-react";

export default function Home() {
  const [contactOpen, setContactOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [selectedService, setSelectedService] = useState<string>("All Services");
  const [toast, setToast] = useState<string | null>(null);
  const [activeBadge, setActiveBadge] = useState<string | null>(null);
  const [activeProcessStep, setActiveProcessStep] = useState<number>(0);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setContactOpen(false);
      }
    };
    if (contactOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [contactOpen]);

  const [modalName, setModalName] = useState("");
  const [modalEmail, setModalEmail] = useState("");
  const [modalPhone, setModalPhone] = useState("");
  const [modalWebsite, setModalWebsite] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");

    try {
      await fetch("/api/db/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "consultation_modal",
          name: modalName || "Strategy Call Inquirer",
          email: modalEmail,
          phone: modalPhone,
          website: modalWebsite,
          service: selectedService,
          sourceUrl: "/",
          message: `Consultation requested for ${selectedService}`,
        }),
      });
      setFormStatus("success");
      showToast("💾 Strategy call request saved to database!");
      setTimeout(() => {
        setContactOpen(false);
        setFormStatus("idle");
        setModalName("");
        setModalEmail("");
        setModalPhone("");
        setModalWebsite("");
      }, 2000);
    } catch (err) {
      console.error("Consultation submit error:", err);
      setFormStatus("success");
      setTimeout(() => {
        setContactOpen(false);
        setFormStatus("idle");
      }, 2000);
    }
  };



  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": "https://balajiprimemedia.in/#organization",
        "name": "Balaji Prime Media - Global Digital Marketing & SEO Agency",
        "url": "https://balajiprimemedia.in",
        "logo": "https://balajiprimemedia.in/logo.png",
        "image": "https://balajiprimemedia.in/og-image.jpg",
        "description": "Global digital marketing agency helping overseas businesses scale through high-ranking SEO, modern web development, and performance digital solutions.",
        "priceRange": "$$$",
        "areaServed": [
          { "@type": "Country", "name": "United States" },
          { "@type": "Country", "name": "United Kingdom" },
          { "@type": "Country", "name": "Canada" },
          { "@type": "Country", "name": "Australia" },
          { "@type": "Country", "name": "United Arab Emirates" },
          { "@type": "Country", "name": "Germany" }
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "158"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Digital Marketing & SEO Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "SEO Optimization & Organic Growth",
                "description": "Rank higher, get found, drive high-intent organic traffic for global businesses."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Website Development & Next.js Design",
                "description": "Modern, ultra-fast and responsive web development optimized for international conversion."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Content Writing & Strategy",
                "description": "Engaging, SEO-optimized copy tailored for US, UK, and European audiences."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Email Marketing & Automation",
                "description": "Nurture leads and boost lifetime customer loyalty through automated workflows."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Off Page Backlink Building",
                "description": "High-authority ethical link building and digital PR to boost domain authority."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Website Maintenance & Speed Optimization",
                "description": "Keep your web apps secure, updated, and scoring 95+ on Google PageSpeed Insights."
              }
            }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How quickly can my website rank on Google with Balaji Prime Media?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Using our strategic high-intent low-competition keyword strategy and technical SEO foundations, initial keyword rankings typically begin indexing within 3 to 6 weeks, with major organic traffic growth compounding within 90 days."
            }
          },
          {
            "@type": "Question",
            "name": "Do you work with international clients outside India?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, over 80% of our clients are located in the United States, United Kingdom, Canada, Australia, and UAE with seamless communication in EST, GMT, and AEST time zones."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      {/* Structured SEO Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="relative min-h-screen bg-[#f8fbf9] text-[#111827] overflow-hidden selection:bg-[#d97706] selection:text-white">
        {/* Floating Interactive Toast Notification */}
        {toast && (
          <div className="fixed top-24 right-6 z-50 bg-[#091427] text-white border border-[#d97706]/60 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-fadeIn text-xs font-semibold backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-ping" />
            <span>{toast}</span>
            <button onClick={() => setToast(null)} className="ml-2 text-gray-400 hover:text-white text-xs cursor-pointer">✕</button>
          </div>
        )}
        {/* Soft Organic Iridescent Background Shapes (Animated via globals.css) */}
        <div className="curved-ribbon-left" aria-hidden="true" />
        <div className="curved-ribbon-right" aria-hidden="true" />
        <div className="curved-ribbon-mid-left" aria-hidden="true" />
        <div className="curved-ribbon-bottom" aria-hidden="true" />

        {/* 1. PROMPT FULL-SCREEN DARK HERO WITH BACKGROUND VIDEO, HEADLINE, SUBTITLE, CTA & MARQUEE */}
        <PromptHero onOpenConsultation={() => setContactOpen(true)} />

        {/* 3. DIGITAL SOLUTIONS FOR REAL GROWTH (GLOWING FEATURE CARDS SECTION) */}
        <section id="services" className="relative py-14 sm:py-24 px-4 sm:px-6 md:px-12 z-10 bg-[#0A0A0B] text-white overflow-hidden">
          {/* Subtle Ambient Background Gradient Glow */}
          <div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-950/20 rounded-full blur-[120px] pointer-events-none -z-0"
            aria-hidden="true"
          />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* Left Column Description */}
              <div className="lg:col-span-4 flex flex-col items-start static lg:sticky lg:top-32">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-[12.5px] font-semibold text-amber-300 mb-4 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-[#d97706] animate-pulse" />
                  <span>Our Services</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15] mb-5">
                  Digital Solutions <br />
                  for <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-amber-400 to-[#d97706]">Real Growth</span>
                </h2>

                <p className="text-[15px] sm:text-[16px] text-gray-400 leading-relaxed mb-8">
                  From SEO to web development, we offer end-to-end digital marketing services to help your business reach new heights.
                </p>

                <Link
                  href="/services"
                  className="heroSecondary px-7 py-3.5 rounded-full text-[14px] font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all cursor-pointer shadow-lg shadow-black/40"
                >
                  <span>View All Services</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>

              {/* Right Column: 6 Glowing Feature Cards in 2-Column Responsive Grid */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7">
                
                {/* 1. SEO Optimization */}
                <FeatureCard
                  title="SEO Optimization"
                  description="Rank higher, get found, drive organic traffic."
                  icon={<Search size={32} strokeWidth={2.5} />}
                  gradient="linear-gradient(137deg, #FF3D77 0%, #FFB1CE 45%, #FF9D3C 100%)"
                  delay={0.1}
                  onClick={() => {
                    setSelectedService("SEO Optimization");
                    setContactOpen(true);
                  }}
                />

                {/* 2. Website Development */}
                <FeatureCard
                  title="Website Development"
                  description="Modern, fast & responsive websites for your brand."
                  icon={<Code2 size={32} strokeWidth={2.5} />}
                  gradient="linear-gradient(137deg, #FFFFFF 0%, #7DD3FC 45%, #06B6D4 100%)"
                  delay={0.2}
                  onClick={() => {
                    setSelectedService("Website Development");
                    setContactOpen(true);
                  }}
                />

                {/* 3. Content Writing */}
                <FeatureCard
                  title="Content Writing"
                  description="Powerful content that connects and converts."
                  icon={<FileText size={32} strokeWidth={2.5} />}
                  gradient="linear-gradient(137deg, #4361EE 0%, #E0AEFF 45%, #F72585 100%)"
                  delay={0.3}
                  onClick={() => {
                    setSelectedService("Content Writing");
                    setContactOpen(true);
                  }}
                />

                {/* 4. Email Marketing */}
                <FeatureCard
                  title="Email Marketing"
                  description="Build relationships, boost customer loyalty."
                  icon={<Mail size={32} strokeWidth={2.5} />}
                  gradient="linear-gradient(137deg, #10B981 0%, #6EE7B7 45%, #059669 100%)"
                  delay={0.4}
                  onClick={() => {
                    setSelectedService("Email Marketing");
                    setContactOpen(true);
                  }}
                />

                {/* 5. Off Page Backlink Building */}
                <FeatureCard
                  title="Off Page Backlink Building"
                  description="Stronger authority, better rankings."
                  icon={<Link2 size={32} strokeWidth={2.5} />}
                  gradient="linear-gradient(137deg, #8B5CF6 0%, #C084FC 45%, #EC4899 100%)"
                  delay={0.5}
                  onClick={() => {
                    setSelectedService("Off Page Backlink Building");
                    setContactOpen(true);
                  }}
                />

                {/* 6. Website Maintenance */}
                <FeatureCard
                  title="Website Maintenance"
                  description="Keep your site secure, updated & running smoothly."
                  icon={<Settings size={32} strokeWidth={2.5} />}
                  gradient="linear-gradient(137deg, #F59E0B 0%, #FBBF24 45%, #EF4444 100%)"
                  delay={0.6}
                  onClick={() => {
                    setSelectedService("Website Maintenance");
                    setContactOpen(true);
                  }}
                />

              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE INSTANT SEO AUDIT SECTION */}
        <section className="relative py-8 sm:py-12 px-4 sm:px-6 md:px-12 z-10 max-w-7xl mx-auto">
          <SeoAuditWidget />
        </section>

        {/* 4. ABOUT NOVA GROWTH / TRUSTED PARTNER */}
        <section id="about" className="relative py-10 sm:py-14 px-4 sm:px-6 md:px-12 z-10 bg-white/40 border-y border-amber-100/60">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Left Column: Angled Laptop & Floating Analytics */}
            <div className="lg:col-span-6 relative flex items-center justify-center my-4 sm:my-0">
              
              {/* Handwritten Note Top */}
              <div className="absolute -top-7 left-2 sm:left-12 z-20 flex flex-col items-center">
                <span className="handwriting text-xl sm:text-2xl font-bold text-[#334155] -rotate-3">
                  Your Success
                </span>
                <span className="handwriting text-xl sm:text-2xl font-bold text-[#334155] -rotate-3">
                  Our Mission
                </span>
                <svg className="w-6 h-6 text-[#64748b] rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>

              {/* Floating Metric 1 */}
              <div className="absolute top-6 left-1 sm:top-8 sm:-left-2 z-20 bg-white/95 backdrop-blur-md border border-amber-200/60 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl shadow-lg flex items-center gap-1.5 sm:gap-2 animate-float-gentle text-xs">
                <span className="text-[#d97706] font-bold text-[11px] sm:text-xs">↗ 15%</span>
                <span className="text-[10px] sm:text-[11px] text-[#64748b] font-medium">Conversions</span>
              </div>

              {/* Floating Metric 2 */}
              <div className="absolute bottom-12 left-1 sm:bottom-16 sm:left-4 z-20 bg-white/95 backdrop-blur-md border border-amber-200/60 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl shadow-lg flex items-center gap-1.5 sm:gap-2 text-xs">
                <span className="text-[#d97706] font-bold text-[11px] sm:text-xs">↗ 20%</span>
                <span className="text-[10px] sm:text-[11px] text-[#64748b] font-medium">Click Through Rate</span>
              </div>

              {/* Laptop Body Mockup */}
              <div className="relative w-full max-w-[480px] bg-slate-900 rounded-t-2xl p-2.5 sm:p-3 shadow-2xl border-4 border-slate-700/80">
                {/* Screen bezel & top camera dot */}
                <div className="w-2 h-2 rounded-full bg-slate-600 mx-auto mb-2" />
                
                {/* Screen Dashboard Preview */}
                <div className="bg-slate-50 rounded-lg p-3 sm:p-4 border border-slate-200">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#d97706]" />
                      <span className="text-xs font-bold text-slate-800">Organic Growth Report</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium">Live Analytics</span>
                  </div>

                  {/* Chart bars & lines visual */}
                  <div className="grid grid-cols-6 gap-2 items-end h-20 sm:h-24 mb-3 px-2">
                    <div className="bg-amber-200 rounded-t h-[35%]" />
                    <div className="bg-amber-300 rounded-t h-[50%]" />
                    <div className="bg-amber-400 rounded-t h-[65%]" />
                    <div className="bg-amber-500 rounded-t h-[80%]" />
                    <div className="bg-[#d97706] rounded-t h-[95%]" />
                    <div className="bg-[#091427] rounded-t h-[100%]" />
                  </div>

                  <div className="flex items-center justify-between text-[10.5px] sm:text-[11px] text-slate-600 font-semibold pt-1 border-t border-slate-100">
                    <span>Target: +150%</span>
                    <span className="text-[#d97706] font-bold">Achieved: +300%</span>
                  </div>
                </div>

                {/* Laptop Base */}
                <div className="w-full sm:w-[104%] sm:-ml-[2%] h-3 bg-slate-800 rounded-b-xl mt-1 shadow-md" />
              </div>

              {/* Floating Highlight Badge: +245% Organic Traffic */}
              <div className="absolute -bottom-3 right-2 sm:-bottom-4 sm:right-8 z-20 bg-white/95 backdrop-blur-md border border-amber-200/80 px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl shadow-xl flex items-center gap-2 sm:gap-2.5">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-amber-100 text-[#d97706] flex items-center justify-center font-bold text-xs shrink-0">
                  📈
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs sm:text-sm font-extrabold text-[#0f172a] leading-none">+245%</span>
                  <span className="text-[9.5px] sm:text-[10.5px] font-medium text-[#64748b]">Organic Traffic</span>
                </div>
              </div>
            </div>

            {/* Right Column: About Content */}
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-[12.5px] font-semibold text-[#091427] mb-4">
                <span className="w-2 h-2 rounded-full bg-[#d97706]" />
                <span>About Balaji Prime Media</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-[#0f172a] tracking-tight leading-tight mb-5">
                Your Trusted Partner <br />
                in <span className="text-gradient-navy-gold">Digital Growth</span>
              </h2>

              <p className="text-[15.5px] text-[#475569] leading-relaxed mb-8">
                At Balaji Prime Media, we combine search intelligence, white-hat editorial outreach, and modern web engineering to deliver sustainable organic growth for overseas businesses.
              </p>

              {/* 4 Feature Cards (2x2 Grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#d97706] flex items-center justify-center text-lg shrink-0">
                    👥
                  </div>
                  <div>
                    <span className="text-[14px] font-bold text-[#0f172a] block">Expert Team</span>
                    <span className="text-[12px] text-[#64748b]">Skilled &amp; Experienced</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#091427] flex items-center justify-center text-lg shrink-0">
                    📊
                  </div>
                  <div>
                    <span className="text-[14px] font-bold text-[#0f172a] block">Data Driven</span>
                    <span className="text-[12px] text-[#64748b]">Strategy &amp; Analysis</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#d97706] flex items-center justify-center text-lg shrink-0">
                    📋
                  </div>
                  <div>
                    <span className="text-[14px] font-bold text-[#0f172a] block">Transparent</span>
                    <span className="text-[12px] text-[#64748b]">Weekly Reporting</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-lg shrink-0">
                    🌐
                  </div>
                  <div>
                    <span className="text-[14px] font-bold text-[#0f172a] block">Global</span>
                    <span className="text-[12px] text-[#64748b]">Client Support 24/7</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* 5. STATS BAR: OUR IMPACT IN NUMBERS */}
        <section className="relative py-8 sm:py-10 px-4 sm:px-6 md:px-12 z-10">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-r from-[#091427] via-[#0f213d] to-[#1e293b] border border-[#d97706]/35 rounded-3xl p-5 sm:p-8 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 text-white">
              
              {/* Badge text with hand-drawn arrow */}
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-lg md:text-xl font-extrabold text-white tracking-tight">
                  Our Impact in Numbers
                </span>
                <span className="handwriting text-2xl text-[#d97706]">⤹</span>
              </div>

              {/* 4 Performance Standards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-12 w-full lg:w-auto text-center lg:text-left">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#d97706] tracking-tight">850+</div>
                  <div className="text-xs font-semibold text-slate-300 mt-0.5">Vetted DR 50–90+ Sites</div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#d97706] tracking-tight">100%</div>
                  <div className="text-xs font-semibold text-slate-300 mt-0.5">Manual White-Hat Outreach</div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#d97706] tracking-tight">7-14d</div>
                  <div className="text-xs font-semibold text-slate-300 mt-0.5">Guaranteed Placement TAT</div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#d97706] tracking-tight">95+</div>
                  <div className="text-xs font-semibold text-slate-300 mt-0.5">Target Core Web Vitals</div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 6. RECENT PROJECTS SECTION */}
        <section id="projects" className="relative py-10 sm:py-14 px-4 sm:px-6 md:px-12 z-10">
          <div className="max-w-7xl mx-auto">
            
            {/* Top row with heading & button */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-4">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-[12.5px] font-semibold text-[#091427] mb-4">
                  <span className="w-2 h-2 rounded-full bg-[#d97706]" />
                  <span>Our Work</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-[#0f172a] tracking-tight">
                  Recent Projects
                </h2>
                <p className="text-[15px] text-[#475569] mt-2">
                  We&apos;ve helped businesses across industries achieve real results with our digital solutions.
                </p>
              </div>

              <Link
                href="/projects"
                className="btn-3d inline-flex items-center gap-2 bg-[#091427] hover:bg-[#0f213d] text-white text-[13.5px] font-bold px-6 py-3 rounded-full transition-all self-start md:self-auto cursor-pointer"
              >
                <span>View All Projects</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>

            {/* 3 Interactive Project Showcase Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Project 1: Fashion Brand Website */}
              <Link
                href="/projects/fashion-brand"
                className="group bg-white rounded-3xl border border-gray-100 p-4 card-3d overflow-hidden flex flex-col justify-between cursor-pointer transition-all hover:border-[#d97706]/50"
              >
                <div className="relative bg-gradient-to-tr from-rose-50 to-amber-50 rounded-2xl h-56 flex items-center justify-center p-4 overflow-hidden mb-4 border border-rose-100/50">
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[11px] font-bold px-3 py-1 rounded-full text-[#0f172a] shadow-xs">
                    E-Commerce Website
                  </div>
                  <div className="w-40 h-44 bg-white rounded-xl shadow-md border border-gray-200 p-2 flex flex-col items-center justify-center text-center group-hover:scale-105 transition-transform">
                    <span className="text-3xl mb-1">👗</span>
                    <span className="text-xs font-bold text-slate-800">Luxe Fashion US</span>
                    <span className="text-[10px] text-[#d97706] font-semibold mt-1">+340% Sales</span>
                  </div>
                </div>

                <div className="flex items-center justify-between px-2 pt-1">
                  <div>
                    <h3 className="text-lg font-bold text-[#0f172a] group-hover:text-[#091427] transition-colors">
                      Fashion Brand Website
                    </h3>
                    <p className="text-[13px] text-[#64748b]">Web Development + SEO</p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-amber-50 text-[#d97706] flex items-center justify-center group-hover:bg-[#091427] group-hover:text-white transition-colors">
                    ↗
                  </div>
                </div>
              </Link>

              {/* Project 2: Fitness App */}
              <Link
                href="/projects/fitness-app"
                className="group bg-white rounded-3xl border border-gray-100 p-4 card-3d overflow-hidden flex flex-col justify-between cursor-pointer transition-all hover:border-[#d97706]/50"
              >
                <div className="relative bg-gradient-to-tr from-slate-900 via-[#0f213d] to-[#091427] rounded-2xl h-56 flex items-center justify-center p-4 overflow-hidden mb-4 border border-[#d97706]/30">
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[11px] font-bold px-3 py-1 rounded-full text-[#0f172a] shadow-xs">
                    Mobile App
                  </div>
                  <div className="w-28 h-44 bg-slate-950 rounded-2xl shadow-md border-2 border-[#d97706]/40 p-2 flex flex-col items-center justify-center text-center text-white group-hover:scale-105 transition-transform">
                    <span className="text-3xl mb-1">⚡</span>
                    <span className="text-xs font-bold text-[#f59e0b]">PulseFit Pro</span>
                    <span className="text-[9px] text-amber-200 font-medium mt-1">50K+ Downloads</span>
                  </div>
                </div>

                <div className="flex items-center justify-between px-2 pt-1">
                  <div>
                    <h3 className="text-lg font-bold text-[#0f172a] group-hover:text-[#091427] transition-colors">
                      Fitness App
                    </h3>
                    <p className="text-[13px] text-[#64748b]">UI/UX Design + Development</p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-slate-100 text-[#091427] flex items-center justify-center group-hover:bg-[#091427] group-hover:text-white transition-colors">
                    ↗
                  </div>
                </div>
              </Link>

              {/* Project 3: Local Business Growth */}
              <Link
                href="/projects/local-growth"
                className="group bg-white rounded-3xl border border-gray-100 p-4 card-3d overflow-hidden flex flex-col justify-between cursor-pointer transition-all hover:border-[#d97706]/50"
              >
                <div className="relative bg-gradient-to-tr from-amber-50/80 to-slate-50 rounded-2xl h-56 flex items-center justify-center p-4 overflow-hidden mb-4 border border-amber-200/40">
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[11px] font-bold px-3 py-1 rounded-full text-[#0f172a] shadow-xs">
                    SEO
                  </div>
                  <div className="w-44 h-36 bg-white rounded-xl shadow-md border border-gray-200 p-3 flex flex-col justify-center text-left group-hover:scale-105 transition-transform">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-800">Apex Dental UK</span>
                      <span className="text-[#d97706] text-xs font-bold">#1 Google</span>
                    </div>
                    <span className="text-[10px] text-slate-500">Local Area Map Rankings</span>
                    <div className="w-full bg-amber-100 h-2 rounded-full mt-2 overflow-hidden">
                      <div className="bg-[#d97706] h-full w-[85%]" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between px-2 pt-1">
                  <div>
                    <h3 className="text-lg font-bold text-[#0f172a] group-hover:text-[#091427] transition-colors">
                      Local Business Growth
                    </h3>
                    <p className="text-[13px] text-[#64748b]">SEO + Content Marketing</p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-amber-50 text-[#d97706] flex items-center justify-center group-hover:bg-[#091427] group-hover:text-white transition-colors">
                    ↗
                  </div>
                </div>
              </Link>

            </div>

          </div>
        </section>

        {/* 7. HOW WE WORK (PROCESS SECTION) */}
        <section className="relative py-10 sm:py-14 px-4 sm:px-6 md:px-12 z-10 bg-white/50 border-t border-amber-100/60">
          <div className="max-w-7xl mx-auto">
            
            <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-[12.5px] font-semibold text-[#091427] mb-3">
                <span className="w-2 h-2 rounded-full bg-[#d97706]" />
                <span>Our Process</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0f172a] tracking-tight">
                How We Work
              </h2>
              <p className="text-[15px] text-[#475569] mt-2">
                A simple, transparent process to turn your goals into measurable results.
              </p>
            </div>

            {/* 4 Interactive Process Steps in Horizontal Flow */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative mb-8">
              
              {/* Step 1 */}
              <div
                onClick={() => {
                  setActiveProcessStep(0);
                  showToast('🔍 Step 1: Discover & Competitive Audit activated');
                }}
                className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  activeProcessStep === 0
                    ? 'bg-[#091427] text-white border-[#d97706] shadow-xl scale-[1.02]'
                    : 'bg-white hover:border-[#d97706]/50 text-gray-800 shadow-xs border-gray-100'
                }`}
              >
                <div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-4 ${
                    activeProcessStep === 0 ? 'bg-amber-400/20 text-[#f59e0b]' : 'bg-amber-50 text-[#d97706]'
                  }`}>
                    🔍
                  </div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[17px] font-bold ${activeProcessStep === 0 ? 'text-white' : 'text-[#0f172a]'}`}>01 Discover</span>
                    <span className="text-[#d97706] font-bold">→</span>
                  </div>
                  <p className={`text-[13px] leading-relaxed ${activeProcessStep === 0 ? 'text-slate-300' : 'text-[#64748b]'}`}>
                    Deep Technical audit &amp; international competitor gap mapping.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div
                onClick={() => {
                  setActiveProcessStep(1);
                  showToast('📋 Step 2: Strategize & Roadmap activated');
                }}
                className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  activeProcessStep === 1
                    ? 'bg-[#091427] text-white border-[#d97706] shadow-xl scale-[1.02]'
                    : 'bg-white hover:border-[#d97706]/50 text-gray-800 shadow-xs border-gray-100'
                }`}
              >
                <div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-4 ${
                    activeProcessStep === 1 ? 'bg-amber-400/20 text-[#f59e0b]' : 'bg-slate-100 text-[#091427]'
                  }`}>
                    📋
                  </div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[17px] font-bold ${activeProcessStep === 1 ? 'text-white' : 'text-[#0f172a]'}`}>02 Strategize</span>
                    <span className="text-[#d97706] font-bold">→</span>
                  </div>
                  <p className={`text-[13px] leading-relaxed ${activeProcessStep === 1 ? 'text-slate-300' : 'text-[#64748b]'}`}>
                    Creating a custom low-competition keyword &amp; UX roadmap.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div
                onClick={() => {
                  setActiveProcessStep(2);
                  showToast('💻 Step 3: Execute & Code Optimization activated');
                }}
                className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  activeProcessStep === 2
                    ? 'bg-[#091427] text-white border-[#d97706] shadow-xl scale-[1.02]'
                    : 'bg-white hover:border-[#d97706]/50 text-gray-800 shadow-xs border-gray-100'
                }`}
              >
                <div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-4 ${
                    activeProcessStep === 2 ? 'bg-amber-400/20 text-[#f59e0b]' : 'bg-amber-50 text-[#d97706]'
                  }`}>
                    💻
                  </div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[17px] font-bold ${activeProcessStep === 2 ? 'text-white' : 'text-[#0f172a]'}`}>03 Execute</span>
                    <span className="text-[#d97706] font-bold">→</span>
                  </div>
                  <p className={`text-[13px] leading-relaxed ${activeProcessStep === 2 ? 'text-slate-300' : 'text-[#64748b]'}`}>
                    Next.js speed rebuild, schema deployment &amp; editorial link building.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div
                onClick={() => {
                  setActiveProcessStep(3);
                  showToast('🎯 Step 4: Continuous Optimization activated');
                }}
                className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  activeProcessStep === 3
                    ? 'bg-[#091427] text-white border-[#d97706] shadow-xl scale-[1.02]'
                    : 'bg-white hover:border-[#d97706]/50 text-gray-800 shadow-xs border-gray-100'
                }`}
              >
                <div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-4 ${
                    activeProcessStep === 3 ? 'bg-amber-400/20 text-[#f59e0b]' : 'bg-slate-100 text-[#091427]'
                  }`}>
                    🎯
                  </div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[17px] font-bold ${activeProcessStep === 3 ? 'text-white' : 'text-[#0f172a]'}`}>04 Optimize</span>
                  </div>
                  <p className={`text-[13px] leading-relaxed ${activeProcessStep === 3 ? 'text-slate-300' : 'text-[#64748b]'}`}>
                    Bi-weekly ranking syncs, live Looker dashboards &amp; CRO testing.
                  </p>
                </div>
              </div>

            </div>

            {/* Interactive Step Detailed Workbench */}
            <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 border border-[#d97706]/30 shadow-lg text-left animate-fadeIn">
              {activeProcessStep === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <span className="text-[11px] font-bold text-[#d97706] uppercase tracking-wider block mb-1">Phase Deliverables</span>
                    <h4 className="text-base font-bold text-[#091427] mb-2">Technical &amp; Competitor Diagnosis</h4>
                    <p className="text-xs text-[#54647c] leading-relaxed">
                      We crawl your entire website with enterprise tooling to spot crawl traps, canonical conflicts, schema errors, and slow assets.
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#d97706] uppercase tracking-wider block mb-1">Timeframe</span>
                    <h4 className="text-base font-bold text-[#091427] mb-2">Days 1 - 7 (Week 1)</h4>
                    <p className="text-xs text-[#54647c] leading-relaxed">
                      Comprehensive 15-page diagnostic report delivered via Notion + Loom video walkthrough for your leadership team.
                    </p>
                  </div>
                  <div className="bg-[#f8fafd] p-4 rounded-2xl border border-gray-200/80">
                    <span className="text-[11px] font-bold text-gray-700 block mb-2">Team Allocation:</span>
                    <ul className="text-xs space-y-1.5 text-[#54647c]">
                      <li>✓ Lead Technical SEO Architect</li>
                      <li>✓ Senior Next.js Frontend Engineer</li>
                      <li>✓ Slack Channel Standup Access</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeProcessStep === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <span className="text-[11px] font-bold text-[#d97706] uppercase tracking-wider block mb-1">Phase Deliverables</span>
                    <h4 className="text-base font-bold text-[#091427] mb-2">The 90-Day Organic Roadmap</h4>
                    <p className="text-xs text-[#54647c] leading-relaxed">
                      Commercial keyword clustering based on buyer intent in North America and Europe, plus UX conversion wireframing.
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#d97706] uppercase tracking-wider block mb-1">Timeframe</span>
                    <h4 className="text-base font-bold text-[#091427] mb-2">Days 8 - 14 (Week 2)</h4>
                    <p className="text-xs text-[#54647c] leading-relaxed">
                      Complete keyword matrix with search volumes, difficulty scores, and targeted page mapping approved by client.
                    </p>
                  </div>
                  <div className="bg-[#f8fafd] p-4 rounded-2xl border border-gray-200/80">
                    <span className="text-[11px] font-bold text-gray-700 block mb-2">Strategic Outputs:</span>
                    <ul className="text-xs space-y-1.5 text-[#54647c]">
                      <li>✓ Content Calendar (3 Months)</li>
                      <li>✓ Digital PR Target Publications</li>
                      <li>✓ High-Intent Geo-Landing Blueprints</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeProcessStep === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <span className="text-[11px] font-bold text-[#d97706] uppercase tracking-wider block mb-1">Phase Deliverables</span>
                    <h4 className="text-base font-bold text-[#091427] mb-2">Engineering &amp; Content Sprint</h4>
                    <p className="text-xs text-[#54647c] leading-relaxed">
                      Live code deployment on Next.js, image optimization, schema injection, and high-DA editorial guest placements.
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#d97706] uppercase tracking-wider block mb-1">Timeframe</span>
                    <h4 className="text-base font-bold text-[#091427] mb-2">Weeks 3 to 8</h4>
                    <p className="text-xs text-[#54647c] leading-relaxed">
                      Staging review links provided for approval before zero-downtime production deployment.
                    </p>
                  </div>
                  <div className="bg-[#f8fafd] p-4 rounded-2xl border border-gray-200/80">
                    <span className="text-[11px] font-bold text-gray-700 block mb-2">Quality Guarantees:</span>
                    <ul className="text-xs space-y-1.5 text-[#54647c]">
                      <li>✓ 95+ Google PageSpeed Score</li>
                      <li>✓ 100% White-Hat Editorial Links</li>
                      <li>✓ Strict Git Version Control</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeProcessStep === 3 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <span className="text-[11px] font-bold text-[#d97706] uppercase tracking-wider block mb-1">Phase Deliverables</span>
                    <h4 className="text-base font-bold text-[#091427] mb-2">Revenue Scaling &amp; Tracking</h4>
                    <p className="text-xs text-[#54647c] leading-relaxed">
                      Continuous SERP position tracking, conversion rate A/B tests, and algorithmic protection for Google search updates.
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#d97706] uppercase tracking-wider block mb-1">Timeframe</span>
                    <h4 className="text-base font-bold text-[#091427] mb-2">Month 3 Onward (Compounding)</h4>
                    <p className="text-xs text-[#54647c] leading-relaxed">
                      Real-time interactive Google Looker Studio dashboard accessible 24/7 with zero waiting for monthly reports.
                    </p>
                  </div>
                  <div className="bg-[#f8fafd] p-4 rounded-2xl border border-gray-200/80">
                    <span className="text-[11px] font-bold text-gray-700 block mb-2">Reporting Cadence:</span>
                    <ul className="text-xs space-y-1.5 text-[#54647c]">
                      <li>✓ Weekly Slack Metric Digest</li>
                      <li>✓ Bi-Weekly Zoom Growth Call</li>
                      <li>✓ 24/7 Live Data Studio Access</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

          </div>
        </section>

        {/* CLIENT TESTIMONIALS & REVIEWS SECTION: MOTIONSITES GLOW FEATURES BENTO GRID */}
        <GlowRatingBento
          onOpenConsultation={(service) => {
            setSelectedService(service || "SEO Optimization");
            setContactOpen(true);
          }}
        />

        {/* 8. BOTTOM CALL-TO-ACTION BANNER (3D MOTIONSITE UPGRADE) */}
        <section id="contact" className="relative py-14 sm:py-20 px-4 sm:px-6 md:px-12 z-10">
          <div className="max-w-7xl mx-auto">
            <div
              className="relative rounded-3xl p-7 sm:p-10 md:p-14 overflow-hidden border border-purple-500/25 shadow-2xl backdrop-blur-xl"
              style={{
                background: "linear-gradient(135deg, #07060D 0%, #110B22 50%, #170F2E 100%)",
                boxShadow:
                  "0 30px 70px -15px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(255, 255, 255, 0.15), 0 0 50px rgba(168, 85, 247, 0.15)",
              }}
            >
              {/* Volumetric ambient background glow */}
              <div
                aria-hidden="true"
                className="absolute top-0 right-0 w-[500px] h-[350px] bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.22)_0%,transparent_70%)] pointer-events-none"
              />
              <div
                aria-hidden="true"
                className="absolute bottom-0 left-1/4 w-[400px] h-[250px] bg-[radial-gradient(circle,rgba(99,102,241,0.18)_0%,transparent_75%)] pointer-events-none"
              />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                
                {/* Left side text (Preserved 100% Exactly) */}
                <div className="lg:col-span-5 text-left">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-black text-white tracking-tight leading-[1.15]">
                    Ready to Take Your Business to the Next Level?
                  </h2>
                </div>

                {/* Middle CTA & description (Preserved 100% Exactly) */}
                <div className="lg:col-span-4 flex flex-col items-start gap-4">
                  <p className="text-[14.5px] text-slate-300 leading-relaxed font-normal">
                    Get a free consultation and discover how Balaji Prime Media can help you achieve your digital marketing goals.
                  </p>
                  <button
                    onClick={() => setContactOpen(true)}
                    className="group relative inline-flex items-center gap-2.5 text-white text-[14.5px] font-bold px-8 py-4 rounded-full shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-all hover:scale-105 cursor-pointer overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(135deg, #f59e0b 0%, #d97706 60%, #b45309 100%)",
                      boxShadow:
                        "0 12px 28px -4px rgba(217, 119, 6, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.35)",
                    }}
                  >
                    <span>Book a Free Consultation</span>
                    <svg
                      className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                </div>

                {/* Right side: Handwritten note & Interactive 3D Motion Orb */}
                <div className="lg:col-span-3 flex items-center justify-center lg:justify-end gap-3 sm:gap-4">
                  <div className="flex flex-col items-end shrink-0">
                    <span className="handwriting text-2xl sm:text-[26px] font-bold text-[#fcd34d] -rotate-6 filter drop-shadow-[0_2px_8px_rgba(252,211,77,0.35)]">
                      Your Growth
                    </span>
                    <span className="handwriting text-2xl sm:text-[26px] font-bold text-[#fcd34d] -rotate-6 filter drop-shadow-[0_2px_8px_rgba(252,211,77,0.35)]">
                      Starts Here
                    </span>
                    <svg
                      className="w-8 h-8 text-[#fcd34d] -rotate-12 filter drop-shadow-[0_2px_6px_rgba(252,211,77,0.3)]"
                      viewBox="0 0 50 50"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path
                        d="M10 10 C 25 15, 35 30, 30 42 M 30 42 L 24 35 M 30 42 L 36 38"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  {/* Interactive 3D Motion Gyroscope Orb */}
                  <MotionCta3DOrb />
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* 9. FOOTER */}
        <Footer />

        {/* INTERACTIVE LEAD / CONSULTATION MODAL */}
        {contactOpen && (
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) setContactOpen(false);
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn overflow-y-auto"
          >
            <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-8 shadow-2xl border border-gray-100 relative max-h-[90vh] overflow-y-auto my-auto">
              
              {/* Sticky Top Header with Clear Close Button */}
              <div className="sticky -top-5 -mt-2 -mx-2 px-2 pt-2 pb-3 bg-white/95 backdrop-blur-md border-b border-gray-100 flex items-center justify-between mb-4 z-20">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-[#091427] border border-amber-200/80 text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d97706] animate-ping" />
                  <span>Global Client Inquiry</span>
                </div>
                <button
                  onClick={() => setContactOpen(false)}
                  aria-label="Close modal"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-700 text-xs font-bold transition-all cursor-pointer border border-gray-200 shadow-xs"
                >
                  <span className="text-sm">✕</span>
                  <span>Close</span>
                </button>
              </div>

              <h3 className="text-2xl font-black text-[#0f172a] tracking-tight">
                Get Your Free Growth Strategy
              </h3>
              <p className="text-xs sm:text-sm text-[#64748b] mt-1 mb-5">
                Tell us about your business goals. We review client inquiries and reply within 12 hours.
              </p>

              {formStatus === "success" ? (
                <div className="bg-amber-50 border border-amber-200 text-[#091427] p-6 rounded-2xl text-center">
                  <div className="text-4xl mb-2">🎉</div>
                  <h4 className="text-lg font-bold">Thank you! Request Received</h4>
                  <p className="text-xs text-[#54647c] mt-1 mb-4">Our strategist will review your website and reach out via email shortly.</p>
                  <button
                    onClick={() => {
                      setContactOpen(false);
                      setFormStatus("idle");
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#091427] text-white text-xs font-bold hover:bg-[#0f213d] transition-colors"
                  >
                    Done &amp; Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 text-left">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Your Name</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. John Miller"
                      value={modalName}
                      onChange={(e) => setModalName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-base sm:text-sm focus:border-[#d97706] focus:ring-1 focus:ring-[#d97706] outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Corporate / Work Email (Gmail) *</label>
                    <input
                      required
                      type="email"
                      placeholder="name@company.com"
                      value={modalEmail}
                      onChange={(e) => setModalEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-base sm:text-sm focus:border-[#d97706] focus:ring-1 focus:ring-[#d97706] outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Phone / WhatsApp Number *</label>
                    <input
                      required
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={modalPhone}
                      onChange={(e) => setModalPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-base sm:text-sm focus:border-[#d97706] focus:ring-1 focus:ring-[#d97706] outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Website URL or Niche</label>
                    <input
                      type="text"
                      placeholder="https://yourwebsite.com or Startup niche"
                      value={modalWebsite}
                      onChange={(e) => setModalWebsite(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-base sm:text-sm focus:border-[#d97706] focus:ring-1 focus:ring-[#d97706] outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Target Service</label>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-base sm:text-sm focus:border-[#d97706] focus:ring-1 focus:ring-[#d97706] outline-none bg-white"
                    >
                      <option value="All Services">All Services / Full Growth Plan</option>
                      <option value="SEO Optimization">SEO Optimization (High Intent)</option>
                      <option value="Website Development">Website Development (Next.js / Shopify)</option>
                      <option value="Content Writing">Content Writing &amp; Strategy</option>
                      <option value="Email Marketing">Email Marketing &amp; Automation</option>
                      <option value="Off Page Backlink Building">Off Page Backlink Building</option>
                      <option value="Website Maintenance">Website Maintenance &amp; Speed Fix</option>
                    </select>
                  </div>

                  <div className="pt-2 flex flex-col gap-2">
                    <button
                      type="submit"
                      disabled={formStatus === "submitting"}
                      className="w-full bg-[#091427] hover:bg-[#0f213d] text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-md shadow-[#091427]/20 cursor-pointer"
                    >
                      {formStatus === "submitting" ? "Sending Request..." : "Book Free Strategy Call →"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setContactOpen(false)}
                      className="w-full py-2.5 text-center text-xs font-bold text-gray-500 hover:text-gray-800 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer"
                    >
                      ✕ Cancel / Keep Browsing
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>
        )}

      </div>
    </>
  );
}
