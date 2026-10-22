"use client";

import React, { useEffect } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { GA_MEASUREMENT_ID, trackPageView, trackAnalyticsEvent } from "@/lib/analytics";

export default function GoogleAnalytics() {
  const pathname = usePathname();

  // Expose global helper and track page transitions
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.trackAnalyticsEvent = trackAnalyticsEvent;
      if (pathname && !pathname.startsWith("/admin")) {
        trackPageView(pathname);
      }
    }
  }, [pathname]);

  // Set up automatic click and form listeners
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Find closest link or button
      const link = target.closest("a") as HTMLAnchorElement | null;
      const button = target.closest("button") as HTMLButtonElement | null;

      if (link) {
        const href = link.href || "";

        // WhatsApp
        if (href.includes("wa.me") || href.includes("whatsapp.com")) {
          trackAnalyticsEvent("whatsapp_click", "contact", href);
          return;
        }

        // Phone call
        if (href.startsWith("tel:")) {
          trackAnalyticsEvent("phone_call_click", "contact", href);
          return;
        }

        // Email
        if (href.startsWith("mailto:")) {
          trackAnalyticsEvent("email_click", "contact", href);
          return;
        }

        // Primary navigation or CTA links
        const linkText = (link.textContent || "").trim().slice(0, 40);
        if (
          link.classList.contains("btn-3d") ||
          link.dataset.track === "cta" ||
          href.includes("/contact") ||
          href.includes("/audit") ||
          href.includes("/pay") ||
          href.includes("/guest-posting")
        ) {
          trackAnalyticsEvent("cta_click", "navigation", `${linkText} -> ${href}`);
        }
      }

      if (button) {
        const btnText = (button.textContent || "").trim().slice(0, 40);
        if (btnText) {
          trackAnalyticsEvent("button_click", "interaction", btnText);
        }
      }
    };

    const handleSubmit = (e: Event) => {
      const form = e.target as HTMLFormElement | null;
      if (!form) return;

      const formId = form.id || form.getAttribute("name") || form.className || "generic_form";
      trackAnalyticsEvent("form_submit", "lead", formId.toString().slice(0, 40));
    };

    document.addEventListener("click", handleClick, { passive: true });
    document.addEventListener("submit", handleSubmit, { passive: true });

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("submit", handleSubmit);
    };
  }, []);

  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics with lazyOnload to prevent blocking initial load */}
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics-init"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              send_page_view: true
            });
          `,
        }}
      />
    </>
  );
}
