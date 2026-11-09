"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function CinematicIdentityHero() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="echo-hero relative w-full min-h-screen min-h-[100svh] overflow-hidden select-none bg-black text-white isolate flex flex-col justify-between">
      {/* Preconnect and Fonts: Sora (200,300,400) & JetBrains Mono (300,400,500) */}
      <link rel="preconnect" href="https://d8j0ntlcm91z4.cloudfront.net" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500&family=Sora:wght@200;300;400&display=swap"
      />

      <style jsx global>{`
        :root {
          --echo-bg: #000000;
          --echo-text: #ffffff;
          --echo-text-dim: rgba(255, 255, 255, 0.62);
          --echo-text-dimmer: rgba(255, 255, 255, 0.42);
          --echo-line: rgba(255, 255, 255, 0.14);
          --echo-line-strong: rgba(255, 255, 255, 0.26);
          --echo-fill-ghost: rgba(255, 255, 255, 0.05);
          --echo-fill-solid: rgba(255, 255, 255, 0.10);
          --echo-gutter: clamp(20px, 5vw, 100px);
          --echo-ease-premium: cubic-bezier(0.16, 1, 0.3, 1);
          --echo-font-display: "Sora", "Helvetica Neue", Helvetica, Arial, sans-serif;
          --echo-font-mono: "JetBrains Mono", ui-monospace, "SF Mono", monospace;
        }

        .echo-hero {
          min-height: 100vh;
          min-height: 100svh;
          font-family: var(--echo-font-display);
        }

        /* Dual Gradient Scrim Overlay on Video */
        .echo-scrim {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background: 
            linear-gradient(to right, transparent 0%, transparent 45%, rgba(0, 0, 0, 0.45) 72%, rgba(0, 0, 0, 0.72) 100%),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.55) 0%, transparent 22%, transparent 78%, rgba(0, 0, 0, 0.65) 100%);
        }

        @media (max-width: 720px) {
          .echo-scrim {
            background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.25) 30%, rgba(0, 0, 0, 0.75) 100%);
          }
        }

        /* Reduced Motion Fallback */
        @media (prefers-reduced-motion: reduce) {
          .echo-video {
            display: none !important;
          }
          .echo-media-fallback {
            background-image: url("https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260806_132328_5f9029c8-218f-4489-82b6-29ff2849920e.png");
            background-size: cover;
            background-position: center;
          }
          * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* Edge-to-Edge Media Layer */}
      <div className="echo-media-layer echo-media-fallback absolute inset-0 -z-10 bg-black overflow-hidden">
        <video
          className="echo-video w-full h-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260806_132328_5f9029c8-218f-4489-82b6-29ff2849920e.png"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260806_133255_956f653f-5d80-4b06-abd5-0f46c98b60fa.mp4"
            type="video/mp4"
          />
        </video>
        {/* Scrim Dual Gradient Overlay */}
        <div className="echo-scrim" />
      </div>

      {/* Row 1: Top spacing padding for the overlaid transparent Navbar */}
      <div className="w-full pt-[clamp(76px,10vh,100px)] pointer-events-none" />

      {/* Row 2: Right-aligned Signup Panel */}
      <div className="relative z-10 w-full flex-1 flex items-center justify-end max-md:justify-center px-[clamp(20px,5vw,100px)] py-6 sm:py-8 overflow-visible">
        <div className="w-[min(38vw,620px)] min-w-[340px] max-lg:w-[min(70vw,520px)] max-sm:w-full max-sm:min-w-0 flex flex-col items-start text-left">
          
          {/* 1) Chip: [ DIGITAL IDENTITY ] */}
          <div
            className="inline-block text-[clamp(11px,0.72vw,14px)] tracking-[0.2em] uppercase text-white bg-white/[0.09] px-[clamp(14px,1.1vw,20px)] py-[clamp(8px,0.7vw,12px)] leading-none rounded-none"
            style={{ fontFamily: 'var(--echo-font-mono)' }}
          >
            [ DIGITAL IDENTITY ]
          </div>

          {/* 2) H1: BALAJI PRIME MEDIA */}
          <h1
            className="text-[clamp(38px,4.8vw,90px)] font-[200] tracking-[0.03em] leading-[0.95] text-white mt-[clamp(18px,2.2vw,36px)] uppercase"
            style={{ fontFamily: 'var(--echo-font-display)' }}
          >
            Balaji Prime Media
          </h1>

          {/* 3) Tagline */}
          <p
            className="text-[clamp(11px,0.9vw,15px)] font-[300] tracking-[0.14em] uppercase text-white/60 mt-[clamp(10px,1vw,18px)] leading-[1.4]"
            style={{ fontFamily: 'var(--echo-font-mono)' }}
          >
            Your digital growth &amp; organic identity to the global network.
          </p>

          {/* 4) Form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="w-full mt-[clamp(24px,3vw,48px)] flex flex-col gap-[clamp(12px,1.1vw,16px)]"
          >
            {/* Email Field */}
            <div className="relative w-full">
              <label htmlFor="echo-email" className="sr-only">
                Email
              </label>
              <input
                id="echo-email"
                type="email"
                required
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  fontFamily: 'var(--echo-font-display)',
                  caretColor: '#ffffff',
                }}
                className="w-full bg-transparent rounded-none border-0 border-b border-white/[0.26] focus:border-white/[0.85] text-white text-[clamp(14px,0.9vw,17px)] font-[300] placeholder:text-white/60 focus:placeholder:text-white/40 pb-[clamp(10px,0.9vw,14px)] px-0.5 outline-none transition-colors duration-200"
              />
            </div>

            {/* Button 1: Proceed using email (.btn--ghost) */}
            <button
              type="submit"
              style={{ fontFamily: 'var(--echo-font-mono)' }}
              className="w-full rounded-none border-0 py-[clamp(14px,1.2vw,20px)] px-5 text-[clamp(11px,0.78vw,13px)] tracking-[0.22em] uppercase font-[400] bg-white/[0.05] hover:bg-white/[0.09] text-white/40 hover:text-white transition-all duration-250 cursor-pointer"
            >
              {submitted ? "Inquiry Sent ✓" : "Proceed using email"}
            </button>

            {/* Button 2: Access Client Portal (.btn--solid) */}
            <Link
              href="/admin"
              style={{ fontFamily: 'var(--echo-font-mono)' }}
              className="w-full text-center rounded-none border-0 py-[clamp(14px,1.2vw,20px)] px-5 text-[clamp(11px,0.78vw,13px)] tracking-[0.22em] uppercase font-[400] bg-white/[0.10] hover:bg-white/[0.17] text-white transition-all duration-250 cursor-pointer"
            >
              Access Client Portal
            </Link>
          </form>

          {/* 5) Referral Link (Centered under form) */}
          <Link
            href="/contact-us"
            style={{ fontFamily: 'var(--echo-font-mono)' }}
            className="self-center mt-[clamp(18px,1.8vw,32px)] text-[clamp(11px,0.74vw,13px)] font-[400] tracking-[0.18em] uppercase text-white hover:text-white/60 hover:underline underline-offset-4 transition-colors"
          >
            I&apos;ve got a client project scope →
          </Link>

        </div>
      </div>

      {/* Row 3: Legal Footer (Pinned to bottom) */}
      <footer
        className="relative z-10 w-full border-t border-white/[0.14] py-[clamp(16px,1.5vw,26px)] px-[clamp(20px,5vw,100px)] text-center"
      >
        <p
          className="text-[clamp(11.5px,0.8vw,15px)] font-[300] text-white/60 leading-[1.5] max-w-4xl mx-auto"
          style={{ fontFamily: 'var(--echo-font-display)' }}
        >
          Connecting with Balaji Prime Media signals that you accept our{" "}
          <Link
            href="/privacy-policy"
            className="text-white underline underline-offset-[3px] decoration-1 hover:text-white/60 transition-colors"
          >
            Privacy Notice
          </Link>{" "}
          and{" "}
          <Link
            href="/terms"
            className="text-white underline underline-offset-[3px] decoration-1 hover:text-white/60 transition-colors"
          >
            Service Contract
          </Link>
          .
        </p>
      </footer>
    </section>
  );
}
