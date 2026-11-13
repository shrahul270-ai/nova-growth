"use client";

import React from "react";
import {
  Sparkles,
  Download,
  Wand2,
  BookOpen,
  ArrowRight,
  Menu,
  Plus,
} from "lucide-react";

function TwitterIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.65 1.65 0 0 0 1.66-1.66 1.66 1.66 0 0 0-3.32 0c0 .92.74 1.66 1.66 1.66m1.39 9.74v-8.37H5.07v8.37h2.78z" />
    </svg>
  );
}

function InstagramIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function LiquidGlassProjectsHero() {
  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("projects-grid");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-black font-poppins select-none">
      {/* User-Specified Luxury Wave Particle Header Background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <img
          src="/images/project-header-hero.jpg"
          alt="Balaji Prime Media Projects Header"
          className="w-full h-full object-cover object-center opacity-85 scale-105 filter brightness-110 contrast-125"
        />
        {/* Ambient Dark Gradients & Glow overlays for perfect text readability & cosmic polish */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(160,104,255,0.18)_0%,transparent_70%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Content Layer floats at z-10 */}
      <div className="relative z-10 flex min-h-screen w-full pt-20 lg:pt-0">
        
        {/* ================= LEFT PANEL (52% on desktop, 100% on mobile) ================= */}
        <div className="relative w-full lg:w-[52%] min-h-screen flex flex-col p-4 sm:p-6 lg:p-8">
          
          {/* Liquid Glass Strong Overlay Container */}
          <div className="liquid-glass-strong rounded-3xl w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 my-auto">
            
            {/* Top Bar inside Left Panel */}
            <div className="flex items-center justify-between w-full">
              {/* Logo + BPM Branding */}
              <div className="flex items-center gap-2.5">
                <img
                  src="/images/logo-original.png"
                  alt="Balaji Prime Media"
                  className="w-8 h-8 object-contain rounded-full bg-white/10 p-0.5"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
                <span className="font-semibold text-xl tracking-tight text-white">
                  Balaji Prime Media
                </span>
              </div>

              {/* Menu / Explore Button */}
              <button
                type="button"
                onClick={scrollToProjects}
                className="liquid-glass rounded-full px-4 py-2 flex items-center gap-2 text-white text-xs font-medium hover:scale-105 transition-transform cursor-pointer"
              >
                <span>Case Studies</span>
                <Menu className="w-3.5 h-3.5 text-white/80" />
              </button>
            </div>

            {/* Hero Center Content */}
            <div className="flex-1 flex flex-col items-center justify-center text-center py-8 my-auto">
              
              {/* Logo icon 80x80 */}
              <div className="w-20 h-20 rounded-full liquid-glass flex items-center justify-center mb-6 shadow-2xl">
                <img
                  src="/images/logo-original.png"
                  alt="Balaji Prime Media"
                  className="w-12 h-12 object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
                <Sparkles className="w-8 h-8 text-white/90" />
              </div>

              {/* H1 Heading: Website Related */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-[500] tracking-[-0.05em] text-white leading-[1.08] max-w-xl mb-7">
                Engineering the <br />
                <span className="font-serif-accent italic text-white/80">
                  future of digital growth
                </span>
              </h1>

              {/* CTA Button: "Explore Case Studies" */}
              <a
                href="#projects-grid"
                onClick={scrollToProjects}
                className="liquid-glass-strong rounded-full px-7 py-3 text-white text-sm font-medium hover:scale-105 active:scale-95 transition-transform flex items-center gap-3 shadow-2xl cursor-pointer mb-7"
              >
                <span>Explore Case Studies</span>
                <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
                  <Download className="w-3.5 h-3.5 text-white" />
                </span>
              </a>

              {/* Three Website-Related Category Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2.5">
                {["Organic Search SEO", "Next.js Engineering", "High-Authority PR"].map((pill) => (
                  <button
                    key={pill}
                    type="button"
                    onClick={scrollToProjects}
                    className="liquid-glass rounded-full px-4 py-2 text-xs text-white/80 hover:text-white hover:scale-105 transition-transform cursor-pointer"
                  >
                    {pill}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Quote Section: Agency Philosophy */}
            <div className="text-center pt-6">
              <div className="text-xs tracking-widest uppercase text-white/50 mb-2">
                MEASURABLE EXCELLENCE
              </div>
              <p className="text-sm sm:text-base text-white/90 font-light max-w-md mx-auto mb-3">
                &ldquo;We turn organic search into your most{" "}
                <span className="font-serif-accent italic text-white">compounding</span> revenue{" "}
                <span className="font-serif-accent italic text-white">asset</span>.&rdquo;
              </p>
              <div className="flex items-center justify-center gap-3">
                <span className="w-8 h-[1px] bg-white/20" />
                <span className="text-[10px] tracking-widest uppercase text-white/40">
                  BALAJI PRIME MEDIA
                </span>
                <span className="w-8 h-[1px] bg-white/20" />
              </div>
            </div>

          </div>
        </div>

        {/* ================= RIGHT PANEL (48% on desktop, hidden on mobile) ================= */}
        <div className="hidden lg:flex w-[48%] min-h-screen flex-col justify-between p-6 lg:p-8 relative">
          
          {/* Top Bar: Social Icons pill + Action buttons */}
          <div className="flex items-center justify-between w-full">
            {/* Social Icons Pill */}
            <div className="liquid-glass rounded-full px-4 py-2 flex items-center gap-3.5">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white/80 transition-colors"
                aria-label="Twitter"
              >
                <TwitterIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white/80 transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white/80 transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>
              <span className="w-px h-3 bg-white/20" />
              <button
                type="button"
                onClick={scrollToProjects}
                className="text-white hover:text-white/80 transition-colors"
                aria-label="Next"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Client Portal & Sparkles Actions */}
            <div className="flex items-center gap-2">
              <a
                href="/services"
                className="liquid-glass rounded-full px-5 py-2 text-xs font-medium text-white hover:scale-105 transition-transform cursor-pointer"
              >
                All Services
              </a>
              <button
                type="button"
                onClick={scrollToProjects}
                className="liquid-glass rounded-full w-9 h-9 flex items-center justify-center text-white hover:scale-105 transition-transform cursor-pointer"
                aria-label="Highlights"
              >
                <Sparkles className="w-4 h-4 text-white/90" />
              </button>
            </div>
          </div>

          {/* Floating Performance Ecosystem Card */}
          <div className="my-auto self-end mr-4">
            <div
              onClick={scrollToProjects}
              className="liquid-glass rounded-2xl w-60 p-4 shadow-xl hover:scale-105 transition-transform cursor-pointer"
            >
              <h4 className="text-sm font-medium text-white mb-1">
                Proven Growth Velocity
              </h4>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                Explore verified client wins delivering 3.8x ROI, sub-second loads, and #1 Google rankings.
              </p>
            </div>
          </div>

          {/* Bottom Feature Section: Outer liquid-glass container with rounded-[2.5rem] */}
          <div className="liquid-glass rounded-[2.5rem] p-5 flex flex-col gap-3.5 mt-auto shadow-2xl">
            
            {/* Two Side-by-Side Cards: SEO Engine & Case Studies */}
            <div className="grid grid-cols-2 gap-3.5">
              
              {/* Card 1: SEO Architecture */}
              <div
                onClick={scrollToProjects}
                className="liquid-glass rounded-3xl p-4 flex items-center gap-3 hover:scale-105 transition-transform cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Wand2 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h5 className="text-xs font-medium text-white">SEO Engine</h5>
                  <p className="text-[10px] text-white/50">Semantic authority</p>
                </div>
              </div>

              {/* Card 2: Growth Archive */}
              <div
                onClick={scrollToProjects}
                className="liquid-glass rounded-3xl p-4 flex items-center gap-3 hover:scale-105 transition-transform cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h5 className="text-xs font-medium text-white">Client Archive</h5>
                  <p className="text-[10px] text-white/50">Verified outcomes</p>
                </div>
              </div>

            </div>

            {/* Bottom Card: High-Impact Web Engineering */}
            <div
              onClick={scrollToProjects}
              className="liquid-glass rounded-3xl p-3.5 flex items-center justify-between gap-3 hover:scale-[1.02] transition-transform cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=300&q=80"
                  alt="Analytics and Web Engineering"
                  className="w-24 h-16 rounded-2xl object-cover shadow-md shrink-0"
                />
                <div>
                  <h5 className="text-sm font-medium text-white">
                    Full-Funnel Web &amp; Search Growth
                  </h5>
                  <p className="text-xs text-white/60 font-light line-clamp-1">
                    Bespoke Next.js apps engineered for sub-second speeds and commercial lead conversion.
                  </p>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0 hover:bg-white/20 transition-colors">
                <Plus className="w-4 h-4 text-white" />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
