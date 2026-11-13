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
    const savedTheme = localStorage.getItem("bpm_theme") as "dark" | "light" | null;
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
      window.dispatchEvent(
        new CustomEvent("bpm-theme-changed", { detail: { theme: nextTheme } })
      );
    }
  };

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle Theme"
        className={`w-9 h-9 rounded-full flex items-center justify-center border border-white/20 bg-white/10 text-white transition-all opacity-80 ${className}`}
      >
        <span className="text-sm">🌙</span>
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
            : "bg-white/[0.08] border-purple-500/30 text-slate-200 hover:bg-white/[0.15] hover:text-white"
        } ${className}`}
      >
        <span className="text-sm">{isLight ? "☀️" : "🌙"}</span>
        <span>{isLight ? "Light Mode" : "Dark Mode"}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
      className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
        isLight
          ? "bg-amber-100 hover:bg-amber-200 border border-amber-300 text-amber-900 shadow-sm"
          : "bg-white/[0.08] hover:bg-white/[0.18] border border-purple-400/30 text-white shadow-[0_0_12px_rgba(160,104,255,0.25)]"
      } ${className}`}
      aria-label={isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
    >
      {isLight ? (
        <svg
          className="w-4 h-4 text-amber-600 transition-transform duration-300 rotate-0 hover:rotate-45"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg
          className="w-4 h-4 text-cyan-300 transition-transform duration-300 -rotate-12 hover:rotate-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
