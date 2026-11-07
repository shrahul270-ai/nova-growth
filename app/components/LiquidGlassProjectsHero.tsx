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
      {/* Background Video: Full-screen autoplaying, looping, muted */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Content Layer floats at z-10 */}
      <div className="relative z-10 flex min-h-screen w-full pt-20 lg:pt-0">
        
        {/* ================= LEFT PANEL (52% on desktop, 100% on mobile) ================= */}
        <div className="relative w-full lg:w-[52%] min-h-screen flex flex-col p-4 sm:p-6 lg:p-8">
          
          {/* Liquid Glass Strong Overlay Container */}
          <div className="liquid-glass-strong rounded-3xl w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 my-auto">
            
            {/* Top Bar inside Left Panel */}
            <div className="flex items-center justify-between w-full">
              {/* Logo + bloom text */}
              <div className="flex items-center gap-2.5">
                <img
                  src="/images/logo-original.png"
                  alt="Bloom"
                  className="w-8 h-8 object-contain rounded-full bg-white/10 p-0.5"
                  onError={(e) => {
                    // Fallback to stylized circle icon if local image fails
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
                <span className="font-semibold text-2xl tracking-tighter text-white">
                  bloom
                </span>
              </div>

              {/* Menu Button */}
              <button
                type="button"
                onClick={scrollToProjects}
                className="liquid-glass rounded-full px-4 py-2 flex items-center gap-2 text-white text-xs font-medium hover:scale-105 transition-transform cursor-pointer"
              >
                <span>Menu</span>
                <Menu className="w-3.5 h-3.5 text-white/80" />
              </button>
            </div>

            {/* Hero Center Content */}
            <div className="flex-1 flex flex-col items-center justify-center text-center py-8 my-auto">
              
              {/* Logo icon 80x80 */}
              <div className="w-20 h-20 rounded-full liquid-glass flex items-center justify-center mb-6 shadow-2xl">
                <img
                  src="/images/logo-original.png"
                  alt="Bloom Icon"
                  className="w-12 h-12 object-contain"
                  onError={(e) => {
                    // Fallback floral/bloom SVG icon
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
                <Sparkles className="w-8 h-8 text-white/90" />
              </div>

              {/* H1 Heading: "Innovating the / spirit of bloom AI" */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-[500] tracking-[-0.05em] text-white leading-[1.08] max-w-xl mb-7">
                Innovating the <br />
                <span className="font-serif-accent italic text-white/80">
                  spirit of bloom AI
                </span>
              </h1>

              {/* CTA Button: "Explore Now" with Download icon */}
              <a
                href="#projects-grid"
                onClick={scrollToProjects}
                className="liquid-glass-strong rounded-full px-7 py-3 text-white text-sm font-medium hover:scale-105 active:scale-95 transition-transform flex items-center gap-3 shadow-2xl cursor-pointer mb-7"
              >
                <span>Explore Now</span>
                <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
                  <Download className="w-3.5 h-3.5 text-white" />
                </span>
              </a>

              {/* Three Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2.5">
                {["Artistic Gallery", "AI Generation", "3D Structures"].map((pill) => (
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

            {/* Bottom Quote Section */}
            <div className="text-center pt-6">
              <div className="text-xs tracking-widest uppercase text-white/50 mb-2">
                VISIONARY DESIGN
              </div>
              <p className="text-sm sm:text-base text-white/90 font-light max-w-md mx-auto mb-3">
                &ldquo;We imagined a{" "}
                <span className="font-serif-accent italic text-white">realm</span> with{" "}
                <span className="font-serif-accent italic text-white">no ending</span>.&rdquo;
              </p>
              <div className="flex items-center justify-center gap-3">
                <span className="w-8 h-[1px] bg-white/20" />
                <span className="text-[10px] tracking-widest uppercase text-white/40">
                  MARCUS AURELIO
                </span>
                <span className="w-8 h-[1px] bg-white/20" />
              </div>
            </div>

          </div>
        </div>

        {/* ================= RIGHT PANEL (48% on desktop, hidden on mobile) ================= */}
        <div className="hidden lg:flex w-[48%] min-h-screen flex-col justify-between p-6 lg:p-8 relative">
          
          {/* Top Bar: Social Icons pill + Account/Sparkles buttons */}
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

            {/* Account & Sparkles Actions */}
            <div className="flex items-center gap-2">
              <a
                href="#projects-grid"
                onClick={scrollToProjects}
                className="liquid-glass rounded-full px-5 py-2 text-xs font-medium text-white hover:scale-105 transition-transform cursor-pointer"
              >
                Account
              </a>
              <button
                type="button"
                onClick={scrollToProjects}
                className="liquid-glass rounded-full w-9 h-9 flex items-center justify-center text-white hover:scale-105 transition-transform cursor-pointer"
                aria-label="Feature Highlights"
              >
                <Sparkles className="w-4 h-4 text-white/90" />
              </button>
            </div>
          </div>

          {/* Floating Community Card (Middle area) */}
          <div className="my-auto self-end mr-4">
            <div className="liquid-glass rounded-2xl w-56 p-4 shadow-xl hover:scale-105 transition-transform cursor-pointer">
              <h4 className="text-sm font-medium text-white mb-1">
                Enter our ecosystem
              </h4>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                Join our collective of digital botanical designers and creators.
              </p>
            </div>
          </div>

          {/* Bottom Feature Section: Outer liquid-glass container with rounded-[2.5rem] */}
          <div className="liquid-glass rounded-[2.5rem] p-5 flex flex-col gap-3.5 mt-auto shadow-2xl">
            
            {/* Two Side-by-Side Cards: Processing & Growth Archive */}
            <div className="grid grid-cols-2 gap-3.5">
              
              {/* Card 1: Processing */}
              <div className="liquid-glass rounded-3xl p-4 flex items-center gap-3 hover:scale-105 transition-transform cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Wand2 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h5 className="text-xs font-medium text-white">Processing</h5>
                  <p className="text-[10px] text-white/50">Neural synthesis</p>
                </div>
              </div>

              {/* Card 2: Growth Archive */}
              <div className="liquid-glass rounded-3xl p-4 flex items-center gap-3 hover:scale-105 transition-transform cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h5 className="text-xs font-medium text-white">Growth Archive</h5>
                  <p className="text-[10px] text-white/50">Curated species</p>
                </div>
              </div>

            </div>

            {/* Bottom Card: Advanced Plant Sculpting */}
            <div className="liquid-glass rounded-3xl p-3.5 flex items-center justify-between gap-3 hover:scale-[1.02] transition-transform cursor-pointer">
              <div className="flex items-center gap-3.5">
                <img
                  src="https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=300&q=80"
                  alt="Floral Sculpting"
                  className="w-24 h-16 rounded-2xl object-cover shadow-md shrink-0"
                />
                <div>
                  <h5 className="text-sm font-medium text-white">
                    Advanced Plant Sculpting
                  </h5>
                  <p className="text-xs text-white/60 font-light line-clamp-1">
                    Sculpt organic forms through responsive AI growth engines.
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
