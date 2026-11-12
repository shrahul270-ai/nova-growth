"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "signup";
}

export default function AuthModal({
  isOpen,
  onClose,
  initialMode = "login",
}: AuthModalProps) {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Sync mode with prop when opened
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setError(null);
      setSuccess(false);
    }
  }, [isOpen, initialMode]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scroll while modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

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
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    // Save login/signup event to database so admin receives it live
    fetch("/api/db/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: mode === "signup" ? "signup" : "login",
        name: mode === "signup" ? name.trim() : email.split("@")[0],
        email: email.trim().toLowerCase(),
        phone: phone.trim() || "+1 555-0199",
        service: mode === "signup" ? "Website User Registration (Sign Up)" : "Website User Sign In (Login)",
        message: `User ${mode === "signup" ? "created an account" : "logged in"} via website popup modal.`,
        sourceUrl: typeof window !== "undefined" ? window.location.pathname : "/",
      }),
    }).catch(() => {});

    setTimeout(() => {
      try {
        const session = {
          email: email.trim().toLowerCase(),
          name: mode === "signup" ? name.trim() : email.split("@")[0],
          phone: phone.trim() || "+1 555-0199",
          role: "buyer",
          loggedInAt: new Date().toISOString(),
        };
        localStorage.setItem("nova_buyer_session", JSON.stringify(session));
        setSuccess(true);
        setTimeout(() => {
          onClose();
          router.push("/buyer-dashboard");
        }, 750);
      } catch {
        setSuccess(true);
        onClose();
        router.push("/buyer-dashboard");
      } finally {
        setLoading(false);
      }
    }, 550);
  };

  const handleGoogleAuth = () => {
    setLoading(true);

    fetch("/api/db/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "google_login",
        name: "Google Authenticated Client",
        email: "client@balajiprimemedia.in",
        phone: "+91 76908 68932",
        service: "One-Tap Google Authentication",
        message: "User logged in using Google OAuth single sign-on.",
        sourceUrl: typeof window !== "undefined" ? window.location.pathname : "/",
      }),
    }).catch(() => {});

    setTimeout(() => {
      const session = {
        email: "client@balajiprimemedia.in",
        name: "Google Client",
        phone: "+91 76908 68932",
        role: "buyer",
        loggedInAt: new Date().toISOString(),
      };
      localStorage.setItem("nova_buyer_session", JSON.stringify(session));
      setSuccess(true);
      setTimeout(() => {
        onClose();
        router.push("/buyer-dashboard");
      }, 650);
    }, 500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Modal Card */}
      <div className="relative w-full max-w-md rounded-3xl bg-[#090422]/98 border border-purple-500/30 p-6 sm:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_50px_rgba(160,104,255,0.25)] backdrop-blur-2xl text-white">
        
        {/* Corner Cross Button (✕) - Direct Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-slate-300 hover:text-white flex items-center justify-center text-sm font-bold transition-all cursor-pointer z-10"
          aria-label="Close"
          title="Close modal"
        >
          ✕
        </button>

        {/* Brand Header */}
        <div className="text-center mb-5">
          <div className="inline-flex justify-center mb-2">
            <Image
              src="/images/bpm-complete-logo.png"
              alt="Balaji Prime Media"
              width={180}
              height={160}
              className="h-10 w-auto object-contain filter drop-shadow-[0_2px_14px_rgba(160,104,255,0.5)]"
            />
          </div>
          <p className="text-xs text-slate-400">
            {mode === "login"
              ? "Access your campaigns, publisher data & audits"
              : "Create your free Balaji Prime Media client account"}
          </p>
        </div>

        {/* Tab Toggle: Log in / Sign up */}
        <div className="flex items-center rounded-xl bg-white/[0.06] p-1 border border-white/10 mb-5">
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setError(null);
            }}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              mode === "login"
                ? "bg-[#A068FF] text-white shadow-md shadow-purple-950/60"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Log in
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("signup");
              setError(null);
            }}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              mode === "signup"
                ? "bg-[#A068FF] text-white shadow-md shadow-purple-950/60"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Sign up
          </button>
        </div>

        {/* Google One-Click Button */}
        <button
          type="button"
          onClick={handleGoogleAuth}
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

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase">
            <span className="bg-[#090422] px-2 text-slate-400">or with email</span>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === "signup" && (
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Full Name / Brand
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe or Acme Corp."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.06] border border-white/15 focus:border-[#A068FF] focus:outline-none text-white text-xs placeholder-slate-500 shadow-xs transition-colors"
              />
            </div>
          )}

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              Work / Business Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@company.com"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.06] border border-white/15 focus:border-[#A068FF] focus:outline-none text-white text-xs placeholder-slate-500 shadow-xs transition-colors"
            />
          </div>

          {mode === "signup" && (
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Phone / WhatsApp (Optional)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 0199 or +91 76908 68932"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.06] border border-white/15 focus:border-[#A068FF] focus:outline-none text-white text-xs placeholder-slate-500 shadow-xs transition-colors"
              />
            </div>
          )}

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="•••••••••••• (min 6 characters)"
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
              ✓ Success! Opening Client Dashboard...
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#A068FF] to-[#7c3aed] hover:from-[#8f52ff] hover:to-[#6d28d9] text-white text-xs font-bold transition-all shadow-md shadow-purple-950/60 cursor-pointer disabled:opacity-50 hover:scale-[1.01]"
          >
            {loading
              ? "Please wait..."
              : mode === "login"
              ? "Log in to Portal →"
              : "Create Account Free →"}
          </button>
        </form>

        {/* Footer switch prompt */}
        <div className="mt-4 pt-3 border-t border-white/10 text-center text-xs text-slate-400">
          {mode === "login" ? (
            <span>
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setMode("signup");
                  setError(null);
                }}
                className="text-[#d8b4fe] hover:text-white font-semibold transition-colors underline cursor-pointer"
              >
                Sign up
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setError(null);
                }}
                className="text-[#d8b4fe] hover:text-white font-semibold transition-colors underline cursor-pointer"
              >
                Log in
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
