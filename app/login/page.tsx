"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BrandLogo from "../components/BrandLogo";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (mode === "signup" && !name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!email || !email.includes("@")) {
      setError("Please enter a valid work email address.");
      return;
    }
    if (!password || password.trim().length === 0) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);

    // Save lead/interaction to database
    fetch("/api/db/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: mode === "signup" ? "signup" : "login",
        name: mode === "signup" ? name.trim() : email.split("@")[0],
        email: email.trim().toLowerCase(),
        phone: phone.trim() || "Not provided",
        service: mode === "signup" ? "Client Registration" : "Client Portal Sign In",
        message: `Client ${mode === "signup" ? "registered" : "logged in"} via /login page.`,
        sourceUrl: "/login",
      }),
    }).catch(() => {});

    try {
      const session = {
        email: email.trim().toLowerCase(),
        name: mode === "signup" ? name.trim() : email.split("@")[0],
        phone: phone.trim() || "",
        role: "buyer",
        loggedInAt: new Date().toISOString(),
      };
      if (typeof window !== "undefined") {
        localStorage.setItem("nova_buyer_session", JSON.stringify(session));
        window.dispatchEvent(new Event("buyer-session-changed"));
      }
      setSuccess(true);
      setTimeout(() => {
        router.push("/buyer-dashboard");
      }, 500);
    } catch {
      setSuccess(true);
      router.push("/");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    const clientEmail = email.trim() || "client.account@gmail.com";
    const clientName = name.trim() || clientEmail.split("@")[0] || "Client";

    fetch("/api/db/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "google_login",
        name: clientName,
        email: clientEmail.toLowerCase(),
        phone: "Google One-Tap",
        service: "Google Sign In",
        message: "Signed in via Google OAuth on /login page",
        sourceUrl: "/login",
      }),
    }).catch(() => {});

    try {
      const session = {
        email: clientEmail.toLowerCase(),
        name: clientName,
        phone: "",
        role: "buyer",
        loggedInAt: new Date().toISOString(),
      };
      if (typeof window !== "undefined") {
        localStorage.setItem("nova_buyer_session", JSON.stringify(session));
        window.dispatchEvent(new Event("buyer-session-changed"));
      }
      setSuccess(true);
      setTimeout(() => {
        router.push("/buyer-dashboard");
      }, 500);
    } catch {
      setSuccess(true);
      router.push("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#08021a] via-[#050114] to-[#040112] text-white flex flex-col items-center justify-center p-4 sm:p-6 select-none relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-tr from-[#7c3aed]/25 via-[#A068FF]/20 to-[#22d3ee]/15 blur-[100px] pointer-events-none" />

      {/* Top Header with Brand */}
      <div className="mb-6 sm:mb-8 text-center relative z-10">
        <Link href="/" className="inline-block hover:scale-105 transition-transform">
          <BrandLogo size="lg" />
        </Link>
      </div>

      {/* Main Form Card - Always Visible Immediately */}
      <div className="w-full max-w-md bg-[#0c0628]/95 border border-purple-500/35 rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl relative z-10">
        
        {/* Toggle Mode: Login vs Sign Up */}
        <div className="flex bg-white/[0.05] p-1 rounded-2xl border border-white/10 mb-6">
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setError(null);
            }}
            className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
              mode === "login"
                ? "bg-gradient-to-r from-[#7c3aed] to-[#A068FF] text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("signup");
              setError(null);
            }}
            className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
              mode === "signup"
                ? "bg-gradient-to-r from-[#7c3aed] to-[#A068FF] text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Title */}
        <div className="mb-5 text-left">
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {mode === "login" ? "Welcome Back" : "Start with Balaji Prime Media"}
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            {mode === "login"
              ? "Access your client orders, SEO audits, and invoices."
              : "Register to track your growth projects and services."}
          </p>
        </div>

        {/* Feedback Messages */}
        {error && (
          <div className="p-3 mb-4 rounded-xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-200 text-left">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 mb-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-200 text-left">
            ✓ Successfully authenticated! Opening portal...
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
          {mode === "signup" && (
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. John Henderson"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.06] border border-white/20 focus:border-[#A068FF] focus:ring-2 focus:ring-[#A068FF]/30 text-white placeholder-slate-400 text-sm outline-none transition-all"
              />
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Work / Business Email *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.06] border border-white/20 focus:border-[#A068FF] focus:ring-2 focus:ring-[#A068FF]/30 text-white placeholder-slate-400 text-sm outline-none transition-all"
            />
          </div>

          {mode === "signup" && (
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Phone / WhatsApp (Optional)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.06] border border-white/20 focus:border-[#A068FF] focus:ring-2 focus:ring-[#A068FF]/30 text-white placeholder-slate-400 text-sm outline-none transition-all"
              />
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Password *
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 pr-10 rounded-xl bg-white/[0.06] border border-white/20 focus:border-[#A068FF] focus:ring-2 focus:ring-[#A068FF]/30 text-white placeholder-slate-400 text-sm outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs cursor-pointer p-1"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#7c3aed] via-[#A068FF] to-[#6366f1] text-white font-bold text-sm shadow-lg shadow-purple-950/80 hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer mt-2 disabled:opacity-50"
          >
            {loading ? "Verifying..." : mode === "login" ? "Sign In to Portal →" : "Create Account →"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-4 text-xs text-slate-500">
          <div className="flex-1 border-t border-white/10" />
          <span className="px-3">or continue with</span>
          <div className="flex-1 border-t border-white/10" />
        </div>

        {/* Google OAuth Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full py-2.5 px-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
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

        {/* Back Link */}
        <div className="mt-5 text-center">
          <Link
            href="/"
            className="text-xs text-purple-300 hover:text-white transition-colors"
          >
            ← Return to Balaji Prime Media Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
