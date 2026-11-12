"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    // Save login event to database so admin receives it live
    fetch("/api/db/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "login",
        name: email.split("@")[0],
        email: email.trim().toLowerCase(),
        phone: "+1 555-0199",
        service: "Direct Website Sign In",
        message: "User logged into client account via /login page.",
        sourceUrl: "/login",
      }),
    }).catch(() => {});

    setTimeout(() => {
      try {
        const session = {
          email: email.trim().toLowerCase(),
          name: email.split("@")[0],
          phone: "+1 555-0199",
          role: "buyer",
          loggedInAt: new Date().toISOString(),
        };
        localStorage.setItem("nova_buyer_session", JSON.stringify(session));
        setSuccess(true);
        setTimeout(() => {
          router.push("/buyer-dashboard");
        }, 800);
      } catch {
        setSuccess(true);
        router.push("/buyer-dashboard");
      } finally {
        setLoading(false);
      }
    }, 600);
  };

  const handleGoogleLogin = () => {
    setLoading(true);

    // Save login event to database so admin receives it live
    fetch("/api/db/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "login",
        name: email.split("@")[0],
        email: email.trim().toLowerCase(),
        phone: "+1 555-0199",
        service: "Direct Website Sign In",
        message: "User logged into client account via /login page.",
        sourceUrl: "/login",
      }),
    }).catch(() => {});

    setTimeout(() => {
      const session = {
        email: "client@balajiprimemedia.in",
        name: "Google User",
        phone: "+91 76908 68932",
        role: "buyer",
        loggedInAt: new Date().toISOString(),
      };
      localStorage.setItem("nova_buyer_session", JSON.stringify(session));
      setSuccess(true);
      setTimeout(() => {
        router.push("/buyer-dashboard");
      }, 700);
    }, 600);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0a0522] via-[#070319] to-[#040112] text-white flex flex-col justify-between overflow-hidden selection:bg-[#A068FF] selection:text-white">
      {/* Subtle glowing violet dot matrix grid */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(160,104,255,0.12)_1px,transparent_1px)] [background-size:24px_24px] opacity-70 pointer-events-none" />

      {/* Luxury purple aurora glows */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(160,104,255,0.18)_0%,transparent_70%)] pointer-events-none"
      />

      {/* Top Header */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center group">
          <Image
            src="/images/bpm-complete-logo.png"
            alt="Balaji Prime Media"
            width={200}
            height={180}
            priority
            className="h-10 sm:h-12 w-auto object-contain group-hover:scale-105 transition-transform filter drop-shadow-[0_2px_14px_rgba(160,104,255,0.45)]"
          />
        </Link>
      </header>

      {/* Auth Card Container */}
      <main className="relative z-10 w-full max-w-md mx-auto px-4 py-8 my-auto">
        <div className="relative rounded-3xl bg-black/50 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 shadow-[0_20px_70px_rgba(0,0,0,0.8),0_0_40px_rgba(160,104,255,0.2)]">
          {/* Corner Cross Button (✕) */}
          <Link
            href="/"
            className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-slate-300 hover:text-white flex items-center justify-center text-sm font-bold transition-all cursor-pointer z-10"
            aria-label="Close"
            title="Close"
          >
            ✕
          </Link>
          {/* Top Pill */}
          <div className="flex justify-center mb-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.06] border border-purple-500/30 text-[11px] font-semibold text-[#d8b4fe]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Secure Client Portal</span>
            </div>
          </div>

          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Welcome Back
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Log in to manage your guest posts, campaigns &amp; audits
            </p>
          </div>

          {/* Google Sign-in */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl bg-white/[0.07] hover:bg-white/[0.13] border border-white/15 text-white text-xs font-semibold flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-sm disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
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
            <span>Continue with Google</span>
          </button>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase">
              <span className="bg-[#070319] px-2 text-slate-400">or continue with email</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1.5">
                Work / Business Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.06] border border-white/15 focus:border-[#A068FF] focus:outline-none text-white text-xs placeholder-slate-500 shadow-xs transition-colors"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-semibold text-slate-300">Password</label>
                <Link
                  href="/contact-us"
                  className="text-[10px] text-[#c4b5fd] hover:text-white transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.06] border border-white/15 focus:border-[#A068FF] focus:outline-none text-white text-xs placeholder-slate-500 shadow-xs transition-colors"
              />
            </div>

            {error && (
              <p className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/30 rounded-lg p-2 text-center">
                {error}
              </p>
            )}

            {success && (
              <p className="text-xs text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 rounded-lg p-2 text-center font-semibold">
                ✓ Login successful! Redirecting to Client Dashboard...
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#A068FF] to-[#7c3aed] hover:from-[#8f52ff] hover:to-[#6d28d9] text-white text-xs font-bold transition-all shadow-md shadow-purple-950/60 cursor-pointer disabled:opacity-50 hover:scale-[1.01]"
            >
              {loading ? "Authenticating..." : "Log in to Portal →"}
            </button>
          </form>

          {/* Switch to Sign up */}
          <div className="mt-6 pt-4 border-t border-white/10 text-center text-xs text-slate-400">
            <span>Don&apos;t have an account? </span>
            <Link
              href="/signup"
              className="text-[#d8b4fe] hover:text-white font-semibold transition-colors underline underline-offset-2"
            >
              Sign up free
            </Link>
          </div>
        </div>
      </main>

      {/* Simple Footer Note */}
      <footer className="relative z-10 w-full text-center py-4 text-[11px] text-slate-400">
        &copy; 2026 Balaji Prime Media. All rights reserved.
      </footer>
    </div>
  );
}
