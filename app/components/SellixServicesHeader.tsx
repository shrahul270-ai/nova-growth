"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function SellixServicesHeader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const [animState, setAnimState] = useState<"initial" | "go" | "clean">("initial");

  // Entrance animation controller
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAnimState("clean");
      return;
    }

    setAnimState("initial");

    const start = () => {
      setAnimState("go");
    };

    const bootTimer = setTimeout(start, 900);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(start, start);
    } else {
      start();
    }

    const cleanTimer = setTimeout(() => {
      setAnimState("clean");
    }, 2600);

    return () => {
      clearTimeout(bootTimer);
      clearTimeout(cleanTimer);
    };
  }, []);

  // Background video seamless cross-fading loop controller
  useEffect(() => {
    const videoA = videoARef.current;
    const videoB = videoBRef.current;
    if (!videoA || !videoB) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      videoA.removeAttribute("autoplay");
      videoA.pause();
      videoB.pause();
      try {
        videoA.currentTime = 0;
      } catch (e) {}
      return;
    }

    const FADE = 0.9;
    let cur = videoA;
    let nxt = videoB;
    let swapping = false;

    const play = (v: HTMLVideoElement) => {
      const p = v.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => {});
      }
    };

    play(videoA);

    const tick = () => {
      if (swapping || !cur.duration) return;
      if (cur.duration - cur.currentTime > FADE) return;

      swapping = true;
      const out = cur;
      nxt.currentTime = 0;
      play(nxt);

      nxt.classList.add("is-active");
      out.classList.remove("is-active");

      // Swap pointers
      const temp = cur;
      cur = nxt;
      nxt = temp;

      setTimeout(() => {
        out.pause();
        try {
          out.currentTime = 0;
        } catch (e) {}
        swapping = false;
      }, FADE * 1000 + 100);
    };

    videoA.addEventListener("timeupdate", tick);
    videoB.addEventListener("timeupdate", tick);

    return () => {
      videoA.removeEventListener("timeupdate", tick);
      videoB.removeEventListener("timeupdate", tick);
    };
  }, []);

  const animClass =
    animState === "clean"
      ? ""
      : animState === "go"
      ? "sellix-anim sellix-go"
      : "sellix-anim";

  return (
    <section ref={rootRef} className={`sellix-hero-root ${animClass} relative w-full overflow-hidden select-none bg-black text-white`}>
      {/* Plus Jakarta Sans weights 300, 400, 500, 600, 800 */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;800&display=swap"
      />

      <style jsx global>{`
        .sellix-hero-root {
          --u: min(calc(100vw / 1280), calc(100dvh / 760));

          --ink: #ffffff;
          --ink-muted: #ededed;
          --panel: #181818;
          --white-btn: #fdfdfd;
          --btn-ink: #050505;
          --glass-fill: rgba(0, 0, 0, 0.78);
          --glass-line: rgba(255, 255, 255, 0.09);

          --dx: 8.5;
          --dy: 13.1;

          --e-reveal: cubic-bezier(0.16, 1, 0.3, 1);
          --e-soft: cubic-bezier(0.25, 0.8, 0.3, 1);

          font-family: 'Plus Jakarta Sans', 'PJS', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: geometricPrecision;
          color: var(--ink);
          background: #000;
          min-height: 100svh;
          padding-top: clamp(65px, 10vh, 90px);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        @supports not (height: 100dvh) {
          .sellix-hero-root {
            --u: min(calc(100vw / 1280), calc(100vh / 760));
          }
        }

        /* Video Background Stage (1280:800 bleed box) */
        .sellix-bg {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: max(100vw, calc(100dvh * 1.6));
          height: max(62.5vw, 100dvh);
          background-color: #000;
          pointer-events: none;
          z-index: 0;
        }
        @supports not (height: 100dvh) {
          .sellix-bg {
            width: max(100vw, calc(100vh * 1.6));
            height: max(62.5vw, 100vh);
          }
        }

        .sellix-bg-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 51% 8%;
          display: block;
          background-color: #000;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.9s linear;
        }
        .sellix-bg-video.is-active {
          opacity: 1;
        }

        /* Hero Content */
        .sellix-hero-inner {
          position: relative;
          z-index: 2;
          width: max-content;
          text-align: center;
          transform: translate(calc(var(--dx) * var(--u)), calc(var(--dy) * var(--u)));
        }

        .sellix-h1 {
          margin: 0;
          font-weight: 500;
          font-size: calc(89 * var(--u));
          line-height: calc(90 * var(--u));
          letter-spacing: calc(-1 * var(--u));
          color: var(--ink);
        }

        .sellix-ln {
          display: block;
        }
        .sellix-ln-i {
          display: block;
          white-space: nowrap;
        }

        .sellix-sub {
          margin: calc(16.1 * var(--u)) 0 0;
          font-weight: 300;
          font-size: calc(17.4 * var(--u));
          line-height: calc(27 * var(--u));
          letter-spacing: calc(-0.30 * var(--u));
          color: #f6f6f6;
        }

        .sellix-ctas {
          margin-top: calc(21.8 * var(--u));
          display: flex;
          align-items: center;
          justify-content: center;
          transform: translateX(calc(-0.75 * var(--u)));
          gap: calc(7 * var(--u));
        }

        /* Buttons */
        .sellix-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-family: inherit;
          text-decoration: none;
          white-space: nowrap;
          border: 0;
          cursor: pointer;
        }

        .sellix-btn-lg {
          height: calc(39 * var(--u));
          border-radius: calc(19.5 * var(--u));
          font-size: calc(13.3 * var(--u));
          font-weight: 500;
          letter-spacing: calc(-0.3 * var(--u));
          gap: calc(9 * var(--u));
        }

        .sellix-btn-primary {
          background: var(--white-btn);
          color: var(--btn-ink);
          padding-left: calc(18.2 * var(--u));
          padding-right: calc(19.2 * var(--u));
          transition: background 0.18s ease, transform 0.18s ease;
        }
        .sellix-btn-primary:hover {
          background: #ffffff;
        }

        .sellix-btn-ghost {
          background: var(--glass-fill);
          color: #d9d9d9;
          padding: 0 calc(17.4 * var(--u));
          border: 1px solid var(--glass-line);
          -webkit-backdrop-filter: blur(2px);
          backdrop-filter: blur(2px);
          transition: background 0.18s ease, border-color 0.18s ease;
        }
        .sellix-btn-ghost:hover {
          background: rgba(0, 0, 0, 0.66);
          border-color: rgba(255, 255, 255, 0.16);
        }

        .sellix-arw {
          flex: 0 0 auto;
          display: block;
          width: calc(13 * var(--u));
          height: calc(10.8 * var(--u));
        }

        /* Focus styles */
        .sellix-btn:focus-visible {
          outline: 2px solid #a78bfa;
          outline-offset: 3px;
          border-radius: 99px;
        }

        /* Entrance Animations */
        @keyframes lineRise {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes subIn {
          from {
            opacity: 0;
            transform: translateY(calc(14 * var(--u)));
            filter: blur(4px);
          }
          to {
            opacity: 1;
            transform: none;
            filter: blur(0);
          }
        }
        @keyframes subInFlat {
          from {
            opacity: 0;
            transform: translateY(calc(12 * var(--u)));
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        @keyframes pillIn {
          from {
            opacity: 0;
            transform: translateY(calc(8 * var(--u))) scale(0.972);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }

        .sellix-anim .sellix-ln {
          overflow: hidden;
          padding-top: 0.26em;
          margin-top: -0.26em;
        }
        .sellix-anim .sellix-ln-i {
          transform: translateY(100%);
          will-change: transform;
        }
        .sellix-anim .sellix-sub,
        .sellix-anim .sellix-ctas .sellix-btn {
          opacity: 0;
          will-change: transform, opacity;
        }

        .sellix-anim.sellix-go .sellix-ln-i {
          animation: lineRise 1.05s var(--e-reveal) both;
        }
        .sellix-anim.sellix-go .sellix-ln:nth-child(1) .sellix-ln-i {
          animation-delay: 0.12s;
        }
        .sellix-anim.sellix-go .sellix-ln:nth-child(2) .sellix-ln-i {
          animation-delay: 0.22s;
        }
        .sellix-anim.sellix-go .sellix-sub {
          animation: subIn 0.85s var(--e-reveal) 0.58s both;
        }
        .sellix-anim.sellix-go .sellix-btn-primary {
          animation: pillIn 0.70s var(--e-reveal) 0.90s both;
        }
        .sellix-anim.sellix-go .sellix-btn-ghost {
          animation: pillIn 0.70s var(--e-reveal) 0.97s both;
        }

        /* TABLET BREAKPOINT (max-width: 1160px) */
        @media (max-width: 1160px) {
          .sellix-hero-root {
            --u: min(
              max(0.9px, min(calc(100vw / 1280), calc(100dvh / 760))),
              calc((100vw - 72px) / 575),
              calc(100dvh / 620)
            );
          }
          .sellix-hero-inner {
            max-width: calc(100vw - 48px);
          }
          .sellix-sub {
            font-size: max(16px, calc(17.4 * var(--u)));
            line-height: max(25px, calc(27 * var(--u)));
          }
          .sellix-ctas {
            margin-top: max(26px, calc(21.8 * var(--u)));
            gap: max(10px, calc(7 * var(--u)));
          }
          .sellix-btn-lg {
            height: max(44px, calc(39 * var(--u)));
            border-radius: max(22px, calc(19.5 * var(--u)));
            font-size: max(15px, calc(13.3 * var(--u)));
            gap: max(10px, calc(9 * var(--u)));
          }
          .sellix-btn-primary {
            padding-left: max(21px, calc(18.2 * var(--u)));
            padding-right: max(22px, calc(19.2 * var(--u)));
          }
          .sellix-btn-ghost {
            padding-left: max(20px, calc(17.4 * var(--u)));
            padding-right: max(21px, calc(18.4 * var(--u)));
          }
          .sellix-arw {
            width: max(14px, calc(13 * var(--u)));
            height: max(11.6px, calc(10.8 * var(--u)));
          }
        }

        /* MOBILE BREAKPOINT (max-width: 768px) */
        @media (max-width: 768px) {
          .sellix-hero-root {
            --u: 1px;
            min-height: 560px;
            padding: 110px 16px 40px 16px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .sellix-hero-inner {
            position: relative;
            left: 0;
            right: 0;
            top: auto;
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 0 12px;
            transform: none;
            text-align: center;
          }
          .sellix-h1 {
            font-size: clamp(34px, 8.5vw, 56px);
            line-height: 1.08;
            letter-spacing: -0.02em;
          }
          .sellix-ln-i {
            white-space: normal;
          }
          .sellix-sub {
            margin-top: 14px;
            font-size: clamp(14px, 3.8vw, 16px);
            line-height: 1.6;
            letter-spacing: 0;
            max-width: 48ch;
            margin-left: auto;
            margin-right: auto;
          }
          .sellix-sub br {
            display: none;
          }
          .sellix-ctas {
            margin-top: 22px;
            gap: 12px;
            transform: none;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
          }
          .sellix-btn-lg {
            height: 48px;
            border-radius: 24px;
            font-size: 14.5px;
            gap: 9px;
            padding-left: 22px;
            padding-right: 22px;
          }
          .sellix-arw {
            width: 13px;
            height: 11px;
          }

          .sellix-anim.sellix-go .sellix-sub {
            animation-name: subInFlat;
          }
          .sellix-anim.sellix-go .sellix-ln-i {
            animation-duration: 0.92s;
          }
          .sellix-anim.sellix-go .sellix-btn-primary {
            animation-delay: 0.84s;
          }
          .sellix-anim.sellix-go .sellix-btn-ghost {
            animation-delay: 0.90s;
          }
        }

        /* NARROW PHONES (max-width: 440px) */
        @media (max-width: 440px) {
          .sellix-ctas {
            flex-direction: column;
            width: 100%;
            align-items: center;
          }
          .sellix-btn-lg {
            width: 100%;
            max-width: 290px;
            justify-content: center;
          }
        }

        /* SHORT LANDSCAPE (max-width: 552px) and (max-height: 460px) */
        @media (max-width: 552px) and (max-height: 460px) {
          .sellix-h1 {
            font-size: min(44px, calc((100vw - 44px) / 6.9));
          }
          .sellix-sub {
            margin-top: 12px;
            font-size: 15px;
            line-height: 1.5;
          }
          .sellix-ctas {
            margin-top: 18px;
          }
        }

        /* Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
          .sellix-anim .sellix-ln {
            overflow: visible;
            padding-top: 0;
            margin-top: 0;
          }
          .sellix-anim .sellix-ln-i {
            transform: none !important;
          }
          .sellix-anim .sellix-sub,
          .sellix-anim .sellix-ctas .sellix-btn {
            opacity: 1 !important;
          }
          * {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>

      {/* Cross-Fading Dual Looping Videos */}
      <div
        className="sellix-bg"
        role="img"
        aria-label="Stylised globe of Earth rendered as a purple dot matrix against a starfield, slowly rotating"
      >
        <video
          ref={videoARef}
          className="sellix-bg-video is-active"
          id="bgVideoA"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          poster="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/82e7eb75-c65f-490a-99b5-f3d1cad54200.webp"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260912_104036_bd6924f6-3c8e-417e-8465-6d03c8c2e9e6.mp4"
            type="video/mp4"
          />
        </video>

        <video
          ref={videoBRef}
          className="sellix-bg-video"
          id="bgVideoB"
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          poster="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/82e7eb75-c65f-490a-99b5-f3d1cad54200.webp"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260912_104036_bd6924f6-3c8e-417e-8465-6d03c8c2e9e6.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Hero Inner */}
      <div className="sellix-hero-inner">
        <h1 className="sellix-h1">
          <span className="sellix-ln">
            <span className="sellix-ln-i">Balaji Prime</span>
          </span>
          <span className="sellix-ln">
            <span className="sellix-ln-i">Media Services</span>
          </span>
        </h1>

        <p className="sellix-sub">
          Full-funnel digital growth, enterprise web engineering, high-DA backlink
          <br />
          acquisitions, and algorithmic search optimization for ambitious global brands.
        </p>

        <div className="sellix-ctas">
          <a href="#services-grid" className="sellix-btn sellix-btn-lg sellix-btn-primary">
            <span>Explore 12 Services</span>
            <svg className="sellix-arw" viewBox="0 0 12 10" fill="none" aria-hidden="true">
              <path
                d="M0.8 5h10M7.1 1.4 10.9 5l-3.8 3.6"
                stroke="currentColor"
                strokeWidth="1.35"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          <Link href="/contact" className="sellix-btn sellix-btn-lg sellix-btn-ghost">
            <span>Book Strategy Call</span>
            <svg className="sellix-arw" viewBox="0 0 12 10" fill="none" aria-hidden="true">
              <path
                d="M0.8 5h10M7.1 1.4 10.9 5l-3.8 3.6"
                stroke="currentColor"
                strokeWidth="1.35"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
