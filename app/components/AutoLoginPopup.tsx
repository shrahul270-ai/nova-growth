"use client";

import React, { useState, useEffect } from "react";
import AuthModal from "./AuthModal";

export default function AutoLoginPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check URL parameters for explicit login/signup triggers (e.g. /?auth=login or /?login=true)
    const urlParams = new URLSearchParams(window.location.search);
    const hasAuthParam = urlParams.get("auth") || urlParams.get("login");

    if (hasAuthParam === "signup") {
      setMode("signup");
      setIsOpen(true);
      return;
    }

    if (hasAuthParam !== null) {
      setMode("login");
      setIsOpen(true);
      return;
    }

    // Auto-popup for visitors without an active authenticated session
    const existingSession = localStorage.getItem("nova_buyer_session");
    if (!existingSession) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Listen for global custom events to open auth popup from any button or component across the app
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleOpenAuth = (e: Event) => {
      const customEvent = e as CustomEvent<{ mode?: "login" | "signup" }>;
      const targetMode = customEvent?.detail?.mode === "signup" ? "signup" : "login";
      setMode(targetMode);
      setIsOpen(true);
    };

    window.addEventListener("open-auth-modal", handleOpenAuth as EventListener);
    return () => {
      window.removeEventListener("open-auth-modal", handleOpenAuth as EventListener);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    if (typeof window !== "undefined") {
      // Clean query parameter if URL has login or auth
      if (window.location.search.includes("auth=") || window.location.search.includes("login")) {
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  };

  return (
    <AuthModal
      isOpen={isOpen}
      onClose={handleClose}
      initialMode={mode}
    />
  );
}
