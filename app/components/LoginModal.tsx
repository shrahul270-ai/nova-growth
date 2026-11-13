"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Lock, Mail, Phone, User, Eye, EyeOff, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (user: { email: string; phone?: string; name?: string }) => void;
  initialMode?: "login" | "signup" | "forgot";
}

export default function LoginModal({
  isOpen,
  onClose,
  onSuccess,
  initialMode = "login",
}: LoginModalProps) {
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<"login" | "signup" | "forgot">(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Ensure hydration before rendering portal to document.body
  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock background scroll while modal is active
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.trim();
    const cleanName = name.trim();

    if (!cleanEmail) {
      setError("Please enter your email address.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (mode === "signup") {
      if (!cleanPhone) {
        setError("Please enter your phone or WhatsApp number.");
        return;
      }
      if (!password || password.length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
      }
    }

    if (mode === "login" && !password) {
      setError("Please enter your password.");
      return;
    }

    if (mode === "forgot" && (!newPassword || newPassword.length < 6)) {
      setError("Please choose a new password (min. 6 characters).");
      return;
    }

    setIsLoading(true);

    try {
      // 1. Gather browser info & live geolocation
      const clientGeo = await new Promise<Record<string, unknown>>((resolve) => {
        if (typeof window !== "undefined" && "geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            (pos) =>
              resolve({
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
              }),
            () => resolve({ timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }),
            { timeout: 2000 }
          );
        } else {
          resolve({});
        }
      });

      const effectivePassword = mode === "forgot" ? newPassword : password;
      const effectiveName = cleanName || cleanEmail.split("@")[0];

      // 2. Save lead & credentials to Database (/api/db/leads)
      const leadPayload = {
        type:
          mode === "login"
            ? "buyer_login"
            : mode === "signup"
            ? "buyer_account_registration"
            : "buyer_password_reset",
        name: effectiveName,
        email: cleanEmail,
        phone: cleanPhone || "Not specified",
        service: "Buyer Account Login & Database Access",
        message:
          mode === "login"
            ? `User Logged In successfully. Email: ${cleanEmail}`
            : mode === "signup"
            ? `New Buyer Account Registered. Email: ${cleanEmail} | Phone: ${cleanPhone}`
            : `User requested password reset and updated credentials. Email: ${cleanEmail}`,
        notes: `Mode: ${mode.toUpperCase()} | Password: ${effectivePassword} | Time: ${new Date().toLocaleString()}`,
        sourceUrl: typeof window !== "undefined" ? window.location.pathname : "/",
        clientGeo,
      };

      const res = await fetch("/api/db/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadPayload),
      });

      if (!res.ok) {
        throw new Error("Server could not save authentication record.");
      }

      // 3. Log real-time interaction for live tracking (/api/db/interactions)
      await fetch("/api/db/interactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "buyer_login",
          action: "login",
          name: effectiveName,
          email: cleanEmail,
          phone: cleanPhone || "",
          title:
            mode === "login"
              ? `User Login: ${cleanEmail}`
              : mode === "signup"
              ? `New Account Created: ${cleanEmail}`
              : `Password Reset: ${cleanEmail}`,
          details: `User authenticated into Balaji Prime Media platform. Mode: ${mode}.`,
          clientGeo,
        }),
      }).catch(() => {});

      // 4. Save session locally
      const userSession = {
        email: cleanEmail,
        phone: cleanPhone,
        name: effectiveName,
        loggedInAt: new Date().toISOString(),
      };
      localStorage.setItem("nova_buyer_session", JSON.stringify(userSession));
      window.dispatchEvent(new Event("buyer-session-changed"));

      // 5. Success state
      if (mode === "forgot") {
        setSuccessMsg("Password reset successfully! You are now logged in.");
      } else if (mode === "signup") {
        setSuccessMsg("Account created successfully! Welcome to Balaji Prime Media.");
      } else {
        setSuccessMsg("Login successful! Welcome back.");
      }

      if (onSuccess) {
        onSuccess(userSession);
      }

      setTimeout(() => {
        onClose();
        // User stays on current page, no redirect to marketplace
      }, 1000);
    } catch (err: any) {
      setError(err?.message || "An error occurred while signing in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Render modal in React Portal at document.body level so no parent transform can misplace it!
  return createPortal(
    <div
      className="fixed inset-0 z-[999999] overflow-y-auto bg-black/80 backdrop-blur-md animate-fadeIn"
      style={{
        margin: 0,
        padding: 0,
      }}
      onClick={onClose}
    >
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        {/* Modal Card */}
        <div
          className="relative w-full max-w-md my-auto rounded-3xl bg-[#091427] border border-[#A068FF]/35 p-6 sm:p-8 shadow-[0_25px_70px_-15px_rgba(160,104,255,0.45)] text-white overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Ambient Glows */}
          <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-[#A068FF]/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-[#38bdf8]/15 blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#A068FF] to-[#38bdf8] text-white shadow-lg mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white font-urbanist">
              {mode === "login" && "Sign In to Your Account"}
              {mode === "signup" && "Create Buyer Account"}
              {mode === "forgot" && "Reset Your Password"}
            </h2>
            <p className="text-xs text-gray-400 mt-1 font-inter">
              {mode === "login" && "Access 40,000+ guest posting websites, live metrics & orders."}
              {mode === "signup" && "Join top brands & scale with high-DR publisher outreach."}
              {mode === "forgot" && "Enter your registered email and choose a new password."}
            </p>
          </div>

          {/* Tab Toggle (Log In vs Sign Up) */}
          {mode !== "forgot" && (
            <div className="flex rounded-full bg-white/5 p-1 mb-6 border border-white/10">
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setError(null);
                }}
                className={`flex-1 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  mode === "login"
                    ? "bg-[#A068FF] text-white shadow-md"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Log In
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("signup");
                  setError(null);
                }}
                className={`flex-1 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  mode === "signup"
                    ? "bg-[#A068FF] text-white shadow-md"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Create Account
              </button>
            </div>
          )}

          {/* Feedback Messages */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field (Sign Up Only) */}
            {mode === "signup" && (
              <div>
                <label className="block text-[11px] font-semibold text-gray-300 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#A068FF] transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Email Address */}
            <div>
              <label className="block text-[11px] font-semibold text-gray-300 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#A068FF] transition-colors"
                />
              </div>
            </div>

            {/* Phone (Sign Up Only) */}
            {mode === "signup" && (
              <div>
                <label className="block text-[11px] font-semibold text-gray-300 uppercase tracking-wider mb-1">
                  WhatsApp / Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#A068FF] transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Password (Login & Sign Up) */}
            {mode !== "forgot" && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-semibold text-gray-300 uppercase tracking-wider">
                    Password
                  </label>
                  {mode === "login" && (
                    <button
                      type="button"
                      onClick={() => {
                        setMode("forgot");
                        setError(null);
                      }}
                      className="text-[11px] text-[#A068FF] hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-10 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#A068FF] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* New Password (Forgot Password Mode) */}
            {mode === "forgot" && (
              <div>
                <label className="block text-[11px] font-semibold text-gray-300 uppercase tracking-wider mb-1">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min. 6 characters"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-10 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#A068FF] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 rounded-full bg-gradient-to-r from-[#A068FF] to-[#7c3aed] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-950/60 hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>
                    {mode === "login" && "Log In"}
                    {mode === "signup" && "Create Account"}
                    {mode === "forgot" && "Reset Password & Log In"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-5 pt-4 border-t border-white/10 text-center text-xs text-gray-400">
            {mode === "forgot" ? (
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setError(null);
                }}
                className="text-[#A068FF] hover:underline font-medium cursor-pointer"
              >
                ← Back to Log In
              </button>
            ) : mode === "login" ? (
              <p>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("signup");
                    setError(null);
                  }}
                  className="text-[#A068FF] hover:underline font-semibold cursor-pointer"
                >
                  Sign Up Now
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("login");
                    setError(null);
                  }}
                  className="text-[#A068FF] hover:underline font-semibold cursor-pointer"
                >
                  Log In
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
