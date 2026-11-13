"use client";

import React, { useState, useEffect } from "react";
import AuthModal from "./AuthModal";

export default function AutoLoginPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");

  useEffect(() => {
    // Only run on client browser
    if (typeof window === "undefined") return;

    // Check if user already has an active session
    const existingSession = localStorage.getItem("nova_buyer_session");
    const dismissedInSession = sessionStorage.getItem("bpm_login_popup_dismissed");

    // If user is not logged in and hasn't dismissed it in this browser tab session, show immediately
    if (!existingSession && !dismissedInSession) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("bpm_login_popup_dismissed", "true");
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
