"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [marketingEnabled, setMarketingEnabled] = useState(true);

  useEffect(() => {
    // Check if user has already made a choice
    const savedConsent = localStorage.getItem("nova_growth_cookie_consent");
    if (!savedConsent) {
      // Delay slightly for smooth appearance
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  // Listen for custom trigger to re-open cookie preferences from footer
  useEffect(() => {
    const handleOpenCookieSettings = () => {
      setIsVisible(true);
      setShowPreferences(true);
    };

    window.addEventListener("open-cookie-settings", handleOpenCookieSettings);
    return () => window.removeEventListener("open-cookie-settings", handleOpenCookieSettings);
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("nova_growth_cookie_consent", "accepted");
    localStorage.setItem("nova_growth_cookie_analytics", "true");
    localStorage.setItem("nova_growth_cookie_marketing", "true");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("nova_growth_cookie_consent", "declined");
    localStorage.setItem("nova_growth_cookie_analytics", "false");
    localStorage.setItem("nova_growth_cookie_marketing", "false");
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem("nova_growth_cookie_consent", "custom");
    localStorage.setItem("nova_growth_cookie_analytics", analyticsEnabled ? "true" : "false");
    localStorage.setItem("nova_growth_cookie_marketing", marketingEnabled ? "true" : "false");
    setIsVisible(false);
    setShowPreferences(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-50 transition-all duration-300">
      <div className="bg-[#0f172a] text-white p-5 rounded-2xl border border-gray-700/80 shadow-2xl backdrop-blur-xl">
        {!showPreferences ? (
          /* Main Consent View */
          <div className="space-y-3.5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">🍪</span>
                <div>
                  <h4 className="text-sm font-bold text-white tracking-tight">
                    We Value Your Privacy
                  </h4>
                  <span className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider">
                    Cookie &amp; Tracking Consent
                  </span>
                </div>
              </div>
              <button
                onClick={handleDecline}
                className="text-gray-400 hover:text-white text-base leading-none p-1 cursor-pointer"
                title="Dismiss"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed">
              Nova Growth uses essential cookies and analytics to ensure optimal site performance,
              measure campaign reach, and provide a personalized experience across our services.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-2 pt-1 text-xs">
              <button
                onClick={handleAcceptAll}
                className="w-full sm:flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-2 px-3 rounded-xl transition-all shadow-md cursor-pointer text-center"
              >
                Accept All
              </button>

              <button
                onClick={handleDecline}
                className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white font-semibold py-2 px-3 rounded-xl border border-gray-700 transition-colors cursor-pointer text-center"
              >
                Necessary Only
              </button>

              <button
                onClick={() => setShowPreferences(true)}
                className="text-[11px] text-gray-400 hover:text-blue-400 underline underline-offset-2 py-1 cursor-pointer"
              >
                Preferences
              </button>
            </div>
          </div>
        ) : (
          /* Custom Preferences View */
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <span>⚙</span> Cookie Preferences
              </h4>
              <button
                onClick={() => setShowPreferences(false)}
                className="text-xs text-gray-400 hover:text-white cursor-pointer"
              >
                Back
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              {/* Necessary */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-gray-800/60 border border-gray-700/50">
                <div>
                  <span className="font-semibold text-white block text-xs">Essential Cookies</span>
                  <span className="text-[10px] text-gray-400">Required for website navigation &amp; security</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold uppercase bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  Always Active
                </span>
              </div>

              {/* Analytics */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-gray-800/60 border border-gray-700/50">
                <div>
                  <span className="font-semibold text-white block text-xs">Analytics &amp; Performance</span>
                  <span className="text-[10px] text-gray-400">Google Analytics 4 visitor telemetry</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={analyticsEnabled}
                    onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-8 h-4 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-blue-600" />
                </label>
              </div>

              {/* Marketing */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-gray-800/60 border border-gray-700/50">
                <div>
                  <span className="font-semibold text-white block text-xs">Personalization &amp; Ads</span>
                  <span className="text-[10px] text-gray-400">Tailored case studies &amp; insights</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={marketingEnabled}
                    onChange={(e) => setMarketingEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-8 h-4 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-blue-600" />
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-1 text-xs">
              <button
                onClick={handleSavePreferences}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-3 rounded-xl transition-all cursor-pointer text-center"
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
