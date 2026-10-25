import { NextRequest, NextResponse } from "next/server";
import { createInteraction, createLead } from "@/lib/db";
import { extractGeoFromRequest, resolveGeoForRequest } from "@/lib/geo";
import { sanitizeInput } from "@/lib/security";

export async function POST(req: NextRequest) {
  try {
    const userAgent = req.headers.get("user-agent") || "unknown";
    const body = await req.json();

    // High precision live geolocation (with IP lookup fallback)
    const geo = await resolveGeoForRequest(req, body.clientGeo);

    const eventType = body.type || "database_download";
    const action = body.action || "download";
    const email = sanitizeInput(body.email || "");
    const phone = sanitizeInput(body.phone || "");
    const title = sanitizeInput(body.title || "Guest Post Database Downloaded");
    const details = sanitizeInput(body.details || "Buyer downloaded full database in Excel");

    // 1. Log interaction
    const interaction = await createInteraction({
      type: eventType,
      action: action,
      title: title,
      name: email ? email.split("@")[0] : "Guest Buyer",
      email: email,
      phone: phone,
      details: `${details} • Location: ${geo.locationSummary}`,
      clientIdentifier: email || phone || geo.clientIp,
      sourcePage: sanitizeInput(body.sourcePage || "/buyer-dashboard"),
      clientIp: geo.clientIp,
      userAgent,
      country: geo.country,
      countryCode: geo.countryCode,
      countryFlag: geo.countryFlag,
      city: geo.city,
      region: geo.region,
      latitude: geo.latitude,
      longitude: geo.longitude,
      timezone: geo.timezone,
      mapsUrl: geo.mapsUrl,
      locationSummary: geo.locationSummary,
    });

    // 2. If it's a download or registration and user provided email/phone, also log as high-intent lead
    if (eventType === "database_download" && (email || phone)) {
      await createLead({
        type: "database_download",
        name: email ? email.split("@")[0] : "Buyer Downloader",
        email: email,
        phone: phone,
        service: "40,000+ Database Download",
        message: `Excel Database downloaded from ${geo.locationSummary}`,
        notes: `Downloaded Excel database. Live Location: ${geo.locationSummary}. Google Maps: ${geo.mapsUrl || "N/A"}`,
        clientIp: geo.clientIp,
        userAgent,
        country: geo.country,
        countryCode: geo.countryCode,
        countryFlag: geo.countryFlag,
        city: geo.city,
        region: geo.region,
        latitude: geo.latitude,
        longitude: geo.longitude,
        timezone: geo.timezone,
        mapsUrl: geo.mapsUrl,
        locationSummary: geo.locationSummary,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Event tracked with live geolocation",
      geo: {
        country: geo.country,
        city: geo.city,
        flag: geo.countryFlag,
        ip: geo.clientIp,
      },
      data: interaction,
    });
  } catch (err: any) {
    console.error("[track error]:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to track event" },
      { status: 500 }
    );
  }
}
