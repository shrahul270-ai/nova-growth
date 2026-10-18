// Google Analytics 4 (GA4) Analytics Utilities for Nova Growth

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-EEX0Q71HLR";

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
    _ga_initialized?: boolean;
    trackAnalyticsEvent?: (
      action: string,
      category?: string,
      label?: string,
      value?: number
    ) => void;
  }
}

// Track pageviews
export function trackPageView(url: string) {
  if (typeof window === "undefined" || !window.gtag) return;
  if (url.includes("/admin")) return; // Don't track admin views

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
}

// Track custom events (e.g. CTA clicks, WhatsApp conversations, audits, form leads)
export function trackAnalyticsEvent(
  action: string,
  category: string = "general",
  label: string = "",
  value?: number
) {
  if (typeof window === "undefined") return;

  // Don't record admin activity
  if (window.location.pathname.includes("/admin")) return;

  if (typeof window.gtag === "function") {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: typeof value === "number" ? value : undefined,
    });
  }
}
