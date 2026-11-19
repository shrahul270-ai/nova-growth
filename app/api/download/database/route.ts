import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { checkDownloadRateLimit, detectMaliciousPattern, sanitizeInput } from "@/lib/security";
import { resolveGeoForRequest } from "@/lib/geo";
import { createLead, createInteraction } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const emailParam = searchParams.get("email") || "";
    const cleanEmail = sanitizeInput(emailParam).trim().toLowerCase();

    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    const userAgent = req.headers.get("user-agent") || "unknown";

    // 1. Attack / Malicious Pattern Inspection
    if (detectMaliciousPattern(cleanEmail) || detectMaliciousPattern(userAgent)) {
      return NextResponse.json(
        { success: false, error: "Access Denied: Suspicious activity detected." },
        { status: 403 }
      );
    }

    // 2. Authentication Requirement: User must provide their registered login email
    if (!cleanEmail || !cleanEmail.includes("@")) {
      return NextResponse.json(
        {
          success: false,
          error: "Authentication required: Please enter your valid registered Login ID to download the database.",
        },
        { status: 401 }
      );
    }

    // 3. Rate Limiting Protection (Anti-Scraping / Anti-Bot)
    const rateCheck = checkDownloadRateLimit(`${clientIp}:${cleanEmail}`);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Download rate limit reached for security. Please wait ${rateCheck.resetMinutes} minute(s) before downloading again.`,
        },
        { status: 429 }
      );
    }

    // 4. Locate file on secure server storage
    const filePath = path.join(process.cwd(), "public", "nova_growth_40000_guest_posts.xlsx");
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { success: false, error: "Database file temporarily unavailable on server." },
        { status: 404 }
      );
    }

    // 5. Track download lead in CRM (background async)
    resolveGeoForRequest(req).then((geo) => {
      createLead({
        type: "database_download",
        name: cleanEmail.split("@")[0],
        email: cleanEmail,
        phone: "Verified Download",
        service: "40,000+ Full Database Download (.xlsx)",
        message: `User downloaded full 40,000+ guest post database (.xlsx). IP: ${clientIp} | Location: ${geo.locationSummary || "Global"}`,
        notes: `Secure Stream Download | Rate Limit Remaining: ${rateCheck.remaining} | Browser: ${userAgent.slice(0, 80)}`,
        clientIp,
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
      }).catch(() => {});

      createInteraction({
        type: "database_download",
        action: "download",
        name: cleanEmail.split("@")[0],
        email: cleanEmail,
        phone: "",
        title: `Secure 40,000+ Download: ${cleanEmail}`,
        details: `Verified download session initiated. Client IP: ${clientIp}`,
        clientIp,
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
      }).catch(() => {});
    }).catch(() => {});

    // 6. Secure Binary Stream Response
    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": 'attachment; filename="nova_growth_40000_guest_posts.xlsx"',
        "Content-Length": String(fileBuffer.length),
        "Cache-Control": "private, no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error: any) {
    console.error("[Secure Download Error]:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred during secure download." },
      { status: 500 }
    );
  }
}
