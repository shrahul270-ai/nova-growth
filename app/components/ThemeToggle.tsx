"use client";

import React, { useState, useEffect } from "react";

interface ThemeToggleProps {
  className?: string;
  variant?: "navbar" | "admin" | "minimal";
}

export default function ThemeToggle({
  className = "",
  variant = "navbar",
}: ThemeToggleProps) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = (localStorage.getItem("bpm_theme") ||
      localStorage.getItem("bpm_admin_theme")) as "dark" | "light" | null;
    const initialTheme = savedTheme || "dark";
    setTheme(initialTheme);
    applyTheme(initialTheme);

    const handleThemeEvent = (e: any) => {
      if (e.detail?.theme) {
        setTheme(e.detail.theme);
      }
    };
    window.addEventListener("bpm-theme-changed", handleThemeEvent);
    return () => window.removeEventListener("bpm-theme-changed", handleThemeEvent);
  }, []);

  const applyTheme = (newTheme: "dark" | "light") => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const body = document.body;

    if (newTheme === "light") {
      root.classList.add("light-theme", "light");
      root.classList.remove("dark");
      body.classList.add("light-theme", "light");
      body.classList.remove("dark");
    } else {
      root.classList.remove("light-theme", "light");
      root.classList.add("dark");
      body.classList.remove("light-theme", "light");
      body.classList.add("dark");
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    applyTheme(nextTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("bpm_theme", nextTheme);
      localStorage.setItem("bpm_admin_theme", nextTheme);
      window.dispatchEvent(
        new CustomEvent("bpm-theme-changed", { detail: { theme: nextTheme } })
      );
    }
  };

  // SSR / Unmounted Fallback (Clean Dark Theme Button)
  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle Theme"
        className={`w-9 h-9 rounded-xl border border-purple-500/40 bg-[#181033] text-amber-300 text-sm font-bold flex items-center justify-center transition-all shrink-0 select-none ${className}`}
      >
        <span className="text-sm select-none pointer-events-none">☀️</span>
      </button>
    );
  }

  const isLight = theme === "light";

  if (variant === "admin") {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        title={isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer shadow-sm ${
          isLight
            ? "bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200"
            : "bg-[#181033] border-purple-500/40 text-amber-300 hover:bg-[#251847]"
        } ${className}`}
      >
        <span className="text-sm">{isLight ? "🌙" : "☀️"}</span>
        <span>{isLight ? "Dark Mode" : "Light Mode"}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
      className={`theme-toggle-btn w-9 h-9 rounded-xl border text-sm font-bold flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-sm shrink-0 select-none ${
        isLight
          ? "bg-[#f1f5f9] border-slate-300 text-slate-800 hover:bg-slate-200 shadow-slate-200"
          : "bg-[#181033] border-purple-500/40 text-amber-300 hover:bg-[#251847] shadow-[0_0_12px_rgba(160,104,255,0.25)]"
      } ${className}`}
      aria-label={isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
    >
      <span className="text-sm select-none pointer-events-none">
        {isLight ? "🌙" : "☀️"}
      </span>
    </button>
  );
}
