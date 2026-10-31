"use client";

import React, { useState, useEffect } from "react";
import Script from "next/script";

interface GooglePreferredSourceButtonProps {
  variant?: "banner" | "compact" | "card";
  domain?: string;
  className?: string;
}

export default function GooglePreferredSourceButton({
  variant = "banner",
  domain = "nova-growth-six.vercel.app",
  className = "",
}: GooglePreferredSourceButtonProps) {
  const [showInfo, setShowInfo] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const googleDeepLink = `https://www.google.com/preferences/source?q=${encodeURIComponent(domain)}`;

  useEffect(() => {
    // If the Google publisher script was already loaded globally
    if (typeof window !== "undefined" && (window as unknown as { GooglePublisher?: unknown }).GooglePublisher) {
      setScriptLoaded(true);
    }
  }, []);

  // Variant 1: Compact Pill Button (for headers, author bios, nav)
  if (variant === "compact") {
    return (
      <div className={`inline-flex items-center gap-2 ${className}`}>
        <Script
          src="https://news.google.com/swg/js/v1/publisher.js"
          strategy="afterInteractive"
          onLoad={() => setScriptLoaded(true)}
        />
        {/* Official Google Container */}
        <div
          {...{ "google-add-preferred-source-btn": "" }}
          data-theme="light"
          data-lang="en"
          className="inline-block"
        />

        {/* Fallback & Direct Action Link */}
        <a
          href={googleDeepLink}
          target="_blank"
          rel="noopener noreferrer"
          title="Add Nova Growth as a Preferred Source on Google"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-[#091427] text-xs font-bold transition-all shadow-2xs hover:shadow-xs group cursor-pointer"
        >
          {/* Google 4-Color 'G' Icon */}
          <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span className="font-semibold text-slate-800 group-hover:text-black">
            Follow on Google
          </span>
          <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded-full border border-amber-300">
            ★ Preferred
          </span>
        </a>
      </div>
    );
  }

  // Variant 2: Full-Featured High-Converting Banner Callout
  return (
    <div
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#091427] via-[#0d1e38] to-[#070b14] border border-[#d97706]/40 p-6 sm:p-8 text-white shadow-xl ${className}`}
    >
      <Script
        src="https://news.google.com/swg/js/v1/publisher.js"
        strategy="afterInteractive"
        onLoad={() => setScriptLoaded(true)}
      />

      {/* Decorative Golden & Cyan Ambient Spotlights */}
      <div
        className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#f59e0b]/15 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-[#38bdf8]/15 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        {/* Left Info Column */}
        <div className="space-y-2 max-w-xl text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-[#d97706]/40 text-xs font-bold text-amber-400">
            {/* Google 4-Color 'G' Icon */}
            <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Google Preferred Source</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            See Nova Growth First in <span className="text-[#f59e0b]">Google AI &amp; Search</span>
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            Add Nova Growth as your <strong>Preferred Source</strong> on Google. Whenever you search for SEO, Next.js, or growth strategies, Google will prioritize our playbooks with an official &ldquo;Preferred&rdquo; badge in Google Search &amp; AI Overviews.
          </p>
        </div>

        {/* Right Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full sm:w-auto">
          
          {/* Official Google Container element (Rendered dynamically by Google script) */}
          <div
            {...{ "google-add-preferred-source-btn": "" }}
            data-theme="dark"
            data-lang="en"
            className="inline-block"
          />

          {/* Deep link direct 1-click fallback button */}
          <a
            href={googleDeepLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold-3d inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#d97706] to-[#f59e0b] hover:from-[#b45309] hover:to-[#d97706] text-[#091427] font-black text-xs sm:text-sm shadow-lg shadow-[#d97706]/30 transition-all cursor-pointer whitespace-nowrap"
          >
            {/* Google 4-Color 'G' Icon */}
            <span className="p-1 rounded-full bg-white shadow-xs">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            </span>
            <span>+ Add as Preferred Source</span>
          </a>

          {/* Quick Info Modal Toggle */}
          <button
            type="button"
            onClick={() => setShowInfo(!showInfo)}
            className="px-3.5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-slate-300 text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
            title="How does Google Preferred Source work?"
          >
            <span>ℹ️</span>
            <span className="hidden sm:inline">Guide</span>
          </button>
        </div>

      </div>

      {/* Expandable Explanation Guide */}
      {showInfo && (
        <div className="mt-6 pt-5 border-t border-slate-700/60 text-left text-xs text-slate-300 space-y-3 animate-fadeIn">
          <div className="font-bold text-amber-300 uppercase tracking-wider text-[11px]">
            ⚡ How Google&apos;s Official Preferred Sources Feature Works:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="font-bold text-white block mb-1">1. Click Button</span>
              <span>Google opens a quick 1-click confirmation overlay linked directly to your Google Account.</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="font-bold text-white block mb-1">2. AI Overviews Boost</span>
              <span>Google AI answers prioritize quotes, stats, and tactical advice from Nova Growth.</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="font-bold text-white block mb-1">3. Official Badge</span>
              <span>Our articles appear with a &ldquo;Preferred&rdquo; badge in Google Top Stories and Search.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
