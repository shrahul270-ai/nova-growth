// Client-side helper to record interactions into the database in the background

export interface TrackInteractionInput {
  action: "whatsapp" | "video_call" | "phone" | "email" | "download" | "login" | "other";
  title: string;
  details?: string;
  clientIdentifier?: string;
  sourcePage?: string;
  targetUrl?: string;
}

import { trackAnalyticsEvent } from "./analytics";

export function trackInteraction(input: TrackInteractionInput): void {
  try {
    // 1. Send event to Google Analytics 4
    trackAnalyticsEvent(
      `${input.action}_click`,
      "conversion",
      input.title || input.details || input.action
    );

    // 2. Attach cached live geolocation if available
    let clientGeo: any = undefined;
    if (typeof window !== "undefined") {
      try {
        const cached = sessionStorage.getItem("nova_live_geo");
        if (cached) clientGeo = JSON.parse(cached);
      } catch {}
    }

    // 3. Persist to internal database
    const payload = {
      type: `${input.action}_click`,
      action: input.action,
      title: input.title,
      details: input.details || "",
      clientIdentifier: input.clientIdentifier || "",
      sourcePage: input.sourcePage || (typeof window !== "undefined" ? window.location.pathname : "/"),
      targetUrl: input.targetUrl || "",
      clientGeo,
    };

    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
      navigator.sendBeacon("/api/db/interactions", blob);
    } else {
      fetch("/api/db/interactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch((err) => console.warn("Failed to record interaction:", err));
    }
  } catch (err) {
    console.warn("trackInteraction error:", err);
  }
}
