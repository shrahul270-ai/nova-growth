"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";

export default function VesperAboutHeader() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Entrance animation fallback: ensure .is-in is added if animations finish or fail
    const root = rootRef.current;
    if (!root) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.querySelectorAll(".appear, .hero-photo, .badge-star, h1 em").forEach((el) => {
        el.classList.add("is-in");
      });
      return;
    }

    const appearEls = root.querySelectorAll<HTMLElement>(".appear, .hero-photo");
    appearEls.forEach((el) => {
      el.addEventListener(
        "animationend",
        () => {
          el.classList.add("is-in");
        },
        { once: true }
      );
    });

    // Two rAFs check
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        appearEls.forEach((el) => {
          if (typeof el.getAnimations === "function") {
            const anims = el.getAnimations();
            if (!anims || anims.length === 0) {
              el.classList.add("is-in");
            }
          }
        });
      });
    });
  }, []);

  return (
    <section ref={rootRef} className="vesper-header-root relative w-full overflow-hidden select-none bg-[#000000] text-white">
      {/* Import Instrument Serif italic & Inter if not present */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900&family=Instrument+Serif:ital@1&display=swap"
      />

      <style jsx global>{`
        .vesper-header-root {
          --bg: #000000;
          --text: #ffffff;
          --muted: #9a9a9a;
          --stat: #d8d8d8;
          --border: rgba(255, 255, 255, 0.16);
          --border-soft: rgba(255, 255, 255, 0.12);

          --logo: 15.5px;
          --logo-mark: 22px;
          --nav: 14px;
          --nav-h: 40px;
          --btn: 13.5px;
          --btn-h: 40px;
          --hero-btn-h: 42px;
          --h1: 48px;
          --lede: 15.5px;
          --badge: 12.5px;
          --stat-size: 13.5px;
          --header-y: 22px;
          --header-x: 40px;
          --stats-x: 72px;
          --stats-y: 36px;
          --hero-gap: 85px;
          --copy-max: 860px;
          --lede-max: 470px;

          background: #000000 !important;
          color: #ffffff;
          font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
          min-height: 100svh;
          padding-top: clamp(75px, 11vh, 100px);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        /* Responsive Breakpoints & Tokens */
        @media (min-width: 1600px) {
          .vesper-header-root {
            --h1: 64px;
            --lede: 18px;
            --badge: 13.5px;
            --stat-size: 15px;
            --stats-x: 96px;
            --stats-y: 44px;
            --hero-btn-h: 48px;
            --btn: 15px;
            --copy-max: 980px;
            --lede-max: 540px;
          }
          .vesper-badge { margin-bottom: 26px !important; }
          .vesper-lede { margin-top: 22px !important; }
          .vesper-actions { margin-top: 30px !important; gap: 12px !important; }
        }

        @media (min-width: 1920px) {
          .vesper-header-root {
            --h1: 76px;
            --lede: 20px;
            --badge: 14.5px;
            --stat-size: 16px;
            --stats-x: 120px;
            --stats-y: 52px;
            --hero-btn-h: 52px;
            --btn: 16px;
            --copy-max: 1120px;
            --lede-max: 620px;
          }
        }

        @media (min-width: 2560px) {
          .vesper-header-root {
            --h1: 88px;
            --lede: 22px;
            --stats-x: 160px;
            --copy-max: 1280px;
            --lede-max: 680px;
          }
        }

        @media (min-width: 1280px) and (max-width: 1599px) {
          .vesper-header-root {
            --h1: 54px;
            --lede: 16px;
            --stats-x: 80px;
            --copy-max: 900px;
          }
        }

        @media (min-width: 901px) and (max-width: 1279px) {
          .vesper-header-root {
            --btn: 13px;
            --hero-btn-h: 40px;
            --h1: 42px;
            --lede: 15px;
            --badge: 12px;
            --stat-size: 12.5px;
            --stats-x: 36px;
            --stats-y: 28px;
            --hero-gap: 64px;
            --copy-max: 760px;
            --lede-max: 440px;
          }
          .vesper-badge { margin-bottom: 16px !important; }
          .vesper-lede { margin-top: 14px !important; }
          .vesper-actions { margin-top: 20px !important; }
        }

        @media (max-width: 900px) {
          .vesper-header-root {
            --btn: 15px;
            --hero-btn-h: 48px;
            --h1: 36px;
            --lede: 16.5px;
            --badge: 13.5px;
            --stat-size: 15px;
            --stats-x: 20px;
            --stats-y: 28px;
            --hero-gap: 36px;
            min-height: auto;
          }
          .vesper-stats {
            flex-direction: column !important;
            align-items: center !important;
            gap: 16px !important;
            white-space: normal !important;
          }
          .vesper-hero {
            padding: 24px 20px 48px !important;
          }
        }

        @media (max-width: 560px) {
          .vesper-header-root {
            --h1: 34px;
            --lede: 16px;
          }
          .vesper-actions {
            flex-direction: column !important;
            width: 100% !important;
          }
          .vesper-actions .btn {
            width: 100% !important;
          }
        }

        /* 1. Hero Video Background (100% opacity no overlay) */
        .hero-photo {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
          opacity: 1;
          pointer-events: none;
        }

        /* 2. Grain Layer */
        .grain {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          opacity: 0.18;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }

        /* Hero Content Container (bottom-centered, NOT vertically centered) */
        .vesper-hero {
          position: relative;
          z-index: 5;
          flex: 1 1 auto;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: 30px 24px var(--hero-gap);
          min-height: 0;
        }

        .vesper-hero-copy {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: var(--copy-max);
          width: 100%;
        }

        /* Badge */
        .vesper-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 22px;
          padding: 9px 15px;
          border: 0;
          border-radius: 5px;
          background: linear-gradient(90deg, #7d7d7d 0%, #2a2a2a 52%, #0a0a0a 100%);
          color: #f2f2f2;
          font-size: var(--badge);
          font-weight: 400;
          letter-spacing: -0.01em;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
        }

        .badge-star {
          filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.45));
          display: block;
        }

        /* Headline */
        .vesper-h1 {
          font-family: "Inter", sans-serif;
          font-weight: 500;
          font-size: var(--h1);
          letter-spacing: -0.045em;
          line-height: 1.12;
          color: #ffffff;
          margin: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .headline-line {
          display: block;
          overflow: hidden;
          padding: 0.06em 0.15em 0.14em;
        }

        .vesper-h1 em {
          font-family: "Instrument Serif", "Times New Roman", Times, serif;
          font-style: italic;
          font-weight: 400;
          font-size: 1.08em;
          letter-spacing: -0.03em;
          color: #9a9a9a;
          display: inline-block;
        }

        /* Lede */
        .vesper-lede {
          max-width: var(--lede-max);
          margin-top: 18px;
          color: #9a9a9a;
          font-size: var(--lede);
          font-weight: 400;
          line-height: 1.55;
          letter-spacing: -0.015em;
          text-align: center;
        }

        /* Actions */
        .vesper-actions {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 26px;
        }

        /* Shared Button Language */
        .btn {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: var(--hero-btn-h);
          padding: 0 18px;
          border-radius: 6px;
          font-size: var(--btn);
          font-weight: 500;
          letter-spacing: -0.02em;
          line-height: 1;
          white-space: nowrap;
          cursor: pointer;
          transition: background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease, color 0.35s ease, filter 0.35s ease;
        }

        .btn::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(115deg, transparent 20%, rgba(255, 255, 255, 0.45) 48%, transparent 76%);
          transform: translateX(-130%);
          transition: transform 0.65s ease;
        }
        .btn:hover::after {
          transform: translateX(130%);
        }

        /* Solid Button */
        .btn-solid {
          background: linear-gradient(180deg, #ffffff 0%, #e7e7e7 48%, #cfcfcf 100%);
          color: #111;
          border: 1px solid #fff;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.95);
        }
        .btn-solid:hover {
          background: linear-gradient(180deg, #ffffff 0%, #f3f6ff 42%, #d5def2 100%);
          border-color: #f2f6ff;
          box-shadow: inset 0 1px 0 #fff, 0 0 26px rgba(186, 208, 255, 0.4), 0 8px 18px rgba(255, 255, 255, 0.14);
        }

        /* Hero Ghost Button */
        .btn-ghost {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(0, 0, 0, 0.5) 46%, rgba(150, 170, 200, 0.1));
          color: #fff;
          border: 1px solid rgba(198, 198, 198, 0.55);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        .btn-ghost:hover {
          background: linear-gradient(135deg, rgba(210, 225, 255, 0.18), rgba(0, 0, 0, 0.35) 48%, rgba(180, 195, 220, 0.16));
          border-color: rgba(220, 230, 255, 0.8);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.22), 0 0 24px rgba(170, 200, 255, 0.28);
        }

        /* Stats Footer */
        .vesper-stats {
          position: relative;
          z-index: 5;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          padding: 0 var(--stats-x) var(--stats-y);
          padding-bottom: max(var(--stats-y), env(safe-area-inset-bottom));
          color: var(--stat);
        }

        .stat {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          font-size: var(--stat-size);
          letter-spacing: -0.015em;
          white-space: nowrap;
        }

        .stat-icon {
          flex-shrink: 0;
          color: #e8e8e8;
        }

        /* Entrance Animations (exact) */
        .appear {
          opacity: 1;
          animation-duration: 1.05s;
          animation-fill-mode: both;
          animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
          animation-delay: var(--d, 0.08s);
        }

        @keyframes in-pop {
          0% { opacity: 0; transform: scale(0.9); }
          70% { opacity: 1; transform: scale(1.03); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes in-star {
          0% { transform: scale(0.2) rotate(-50deg); opacity: 0; }
          65% { transform: scale(1.2) rotate(8deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes in-mask {
          0% { opacity: 0; transform: translateY(40%); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes in-em {
          0% { opacity: 0.35; filter: blur(4px); }
          100% { opacity: 1; filter: blur(0px); }
        }
        @keyframes in-soft {
          0% { opacity: 0; transform: translateY(14px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes in-btn {
          0% { opacity: 0; transform: translateY(18px) scale(0.94); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes in-side {
          0% { opacity: 0; transform: translateX(22px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes in-stat {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .appear--pop { animation-name: in-pop; }
        .appear--mask { animation-name: in-mask; }
        .appear--soft { animation-name: in-soft; }
        .appear--btn { animation-name: in-btn; }
        .appear--side { animation-name: in-side; }
        .appear--stat { animation-name: in-stat; }

        .badge-star {
          animation: in-star 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.28s both;
        }
        .vesper-h1 em {
          animation: in-em 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.72s both;
        }

        /* Resting state when animation finishes */
        .is-in {
          animation: none !important;
          opacity: 1 !important;
          transform: none !important;
          clip-path: none !important;
          filter: none !important;
        }

        @media (prefers-reduced-motion: reduce) {
          .appear, .hero-photo, .vesper-h1 em, .badge-star {
            transition: none !important;
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
            clip-path: none !important;
            filter: none !important;
          }
        }
      `}</style>

      {/* Hero Video Background (100% opacity no overlay) */}
      <video
        className="hero-photo"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260818_072341_50851634-bbc3-4c33-9acc-7647d4db44aa.mp4"
      />

      {/* Subtle Grain Overlay at top layer */}
      <div className="grain" aria-hidden="true" />

      {/* Main Hero Copy (bottom-centered, NOT vertically centered) */}
      <main className="vesper-hero" id="top">
        <div className="vesper-hero-copy">
          {/* Badge */}
          <div className="vesper-badge appear appear--pop" style={{ "--d": "0.22s" } as React.CSSProperties}>
            <svg className="badge-star" width="18" height="20" viewBox="0 0 24 24" fill="white" aria-hidden="true">
              <path d="M12 2.6C12.55 2.6 12.88 3.15 13.08 4.7c.62 4.7 1.52 5.6 6.22 6.22 1.55.2 2.1.53 2.1 1.08s-.55.88-2.1 1.08c-4.7.62-5.6 1.52-6.22 6.22-.2 1.55-.53 2.1-1.08 2.1s-.88-.55-1.08-2.1c-.62-4.7-1.52-5.6-6.22-6.22C3.15 12.88 2.6 12.55 2.6 12s.55-.88 2.1-1.08c4.7-.62 5.6-1.52 6.22-6.22C11.12 3.15 11.45 2.6 12 2.6Z" />
            </svg>
            <span>Operational AI Infrastructure</span>
          </div>

          {/* H1 Two Masked Lines */}
          <h1 className="vesper-h1">
            <span className="headline-line">
              <span className="headline-text appear appear--mask inline-block" style={{ "--d": "0.42s" } as React.CSSProperties}>
                Train <em>AI agents</em> on your
              </span>
            </span>
            <span className="headline-line">
              <span className="headline-text appear appear--mask inline-block" style={{ "--d": "0.62s" } as React.CSSProperties}>
                workflows in minutes.
              </span>
            </span>
          </h1>

          {/* Lede */}
          <p
            className="vesper-lede appear appear--soft"
            style={{ "--d": "0.82s", animationDuration: "1.25s" } as React.CSSProperties}
          >
            Deploy adaptive AI agents that learn, execute, and scale operational tasks across your business.
          </p>

          {/* Hero Actions */}
          <div className="vesper-actions">
            <Link
              href="/contact"
              className="btn btn-solid appear appear--btn"
              style={{ "--d": "0.96s" } as React.CSSProperties}
            >
              <span>Start for Free</span>
            </Link>

            <a
              href="#demo"
              className="btn btn-ghost appear appear--side"
              style={{ "--d": "1.10s" } as React.CSSProperties}
            >
              <span>See it in action</span>
            </a>
          </div>
        </div>
      </main>

      {/* Stats Footer */}
      <footer className="vesper-stats">
        {/* Stat 1: Dual-pill / workflow icon */}
        <div className="stat appear appear--stat" style={{ "--d": "1.12s" } as React.CSSProperties}>
          <svg className="stat-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <defs>
              <linearGradient id="pillGradL" x1="3" y1="2" x2="14" y2="22" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#ffffff" stopOpacity="0.38" />
                <stop offset="1" stopColor="#3a3a3a" stopOpacity="0.62" />
              </linearGradient>
              <linearGradient id="pillGradR" x1="3" y1="2" x2="14" y2="22" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#3a3a3a" stopOpacity="0.38" />
                <stop offset="1" stopColor="#ffffff" stopOpacity="0.62" />
              </linearGradient>
            </defs>
            <rect x="3.4" y="2.6" width="7.2" height="18.8" rx="3.6" fill="url(#pillGradL)" />
            <rect x="13.4" y="2.6" width="7.2" height="18.8" rx="3.6" fill="url(#pillGradR)" />
            <rect x="9.2" y="10.9" width="5.6" height="2.2" rx="1.1" fill="#4a4a4a" />
          </svg>
          <span>4.2M+ workflows automated</span>
        </div>

        {/* Stat 2: Download tile */}
        <div className="stat appear appear--stat" style={{ "--d": "1.28s" } as React.CSSProperties}>
          <svg className="stat-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="2.4" y="2.4" width="19.2" height="19.2" rx="6.2" fill="#ffffff" />
            <path d="M12 7.1v7.4" stroke="#111" strokeWidth="1.85" strokeLinecap="round" />
            <path d="M8.15 12.35L12 16.2l3.85-3.85" stroke="#111" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>92% reduction in manual operations</span>
        </div>

        {/* Stat 3: Three avatars */}
        <div className="stat appear appear--stat" style={{ "--d": "1.44s" } as React.CSSProperties}>
          <svg className="stat-icon-wide" width="38" height="21" viewBox="0 0 40 22" fill="none" aria-hidden="true">
            {/* Avatar 1: Dark circle with pale face */}
            <circle cx="10.2" cy="11" r="9.2" fill="#2b2b2b" />
            <polygon points="7.2,6.5 8.2,3.2 10.5,6.2" fill="#2b2b2b" />
            <polygon points="13.2,6.5 12.2,3.2 9.9,6.2" fill="#2b2b2b" />
            <ellipse cx="10.2" cy="12.1" rx="4.15" ry="3.7" fill="#f4f4f4" />
            <circle cx="8.9" cy="11.8" r="0.7" fill="#1a1a1a" />
            <circle cx="11.5" cy="11.8" r="0.7" fill="#1a1a1a" />

            {/* Avatar 2: White circle with black eyes & smile */}
            <circle cx="20.2" cy="11" r="9.2" fill="#ffffff" />
            <circle cx="18.5" cy="10" r="1.7" fill="#111111" />
            <circle cx="21.9" cy="10" r="1.7" fill="#111111" />
            <ellipse cx="20.2" cy="12.2" rx="1.1" ry="0.8" fill="#111111" />
            <path d="M18.8 14.1c.9.8 1.9.8 2.8 0" stroke="#111111" strokeWidth="1.2" strokeLinecap="round" fill="none" />

            {/* Avatar 3: Orange circle with white 'e' */}
            <circle cx="30.2" cy="11" r="9.2" fill="#f26b1d" />
            <text x="30.2" y="15.1" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="12.5" fill="#ffffff" textAnchor="middle">
              e
            </text>
          </svg>
          <span>180+ operational teams onboarded</span>
        </div>
      </footer>
    </section>
  );
}
