import { NextRequest, NextResponse } from "next/server";
import {
  createInteraction,
  queryRecords,
  softDeleteRecord,
  permanentDeleteRecord,
  updateRecord,
  RecordStatus,
  ensureSupabaseSync,
} from "@/lib/db";
import {
  verifyAdminRequest,
  checkSubmissionRateLimit,
  sanitizeInput,
} from "@/lib/security";
import { extractGeoFromRequest, resolveIpGeolocation, resolveGeoForRequest } from "@/lib/geo";

export async function GET(req: NextRequest) {
  try {
    const auth = verifyAdminRequest(req);
    if (!auth.authenticated) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access: Admin authentication required" },
        { status: 401 }
      );
    }

    await ensureSupabaseSync();
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const sortOrder = (searchParams.get("sortOrder") as "desc" | "asc") || "desc";
    const showDeletedParam = searchParams.get("showDeleted");
    const showDeleted =
      showDeletedParam === "true" ? true : showDeletedParam === "all" ? undefined : false;
    const limit = parseInt(searchParams.get("limit") || "100", 10);
    const offset = parseInt(searchParams.get("offset") || "0", 10);

    const result = queryRecords({
      collection: "interactions",
      showDeleted,
      search,
      sortOrder,
      limit,
      offset,
    });

    // Auto-enrich records with live IP geolocation if missing city or marked generic
    const enrichedRecords = await Promise.all(
      (result.records || []).map(async (r: any) => {
        if (r.clientIp && (!r.city || r.city === "Unknown City" || !r.country || r.country === "Global")) {
          const geo = await resolveIpGeolocation(r.clientIp);
          if (geo.country) {
            return {
              ...r,
              country: geo.country,
              countryCode: geo.countryCode,
              countryFlag: geo.countryFlag,
              city: geo.city,
              region: geo.region,
              latitude: geo.latitude,
              longitude: geo.longitude,
              mapsUrl: geo.mapsUrl,
              locationSummary: geo.locationSummary,
              isp: geo.isp,
            };
          }
        }
        return r;
      })
    );

    return NextResponse.json({ success: true, ...result, records: enrichedRecords });
  } catch (error) {
    console.error("Error fetching interactions:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch interactions" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    if (!checkSubmissionRateLimit(clientIp)) {
      return NextResponse.json(
        { success: false, error: "Rate limit exceeded" },
        { status: 429 }
      );
    }

    const body = await req.json();

    // High precision live visitor geolocation (with IP lookup fallback)
    const geo = await resolveGeoForRequest(req, body.clientGeo);

    const interaction = await createInteraction({
      type: sanitizeInput(body.type || "whatsapp_click"),
      action: sanitizeInput(body.action || "whatsapp"),
      title: sanitizeInput(body.title || "Client Click / Interaction"),
      name: sanitizeInput(body.name || ""),
      phone: sanitizeInput(body.phone || ""),
      email: sanitizeInput(body.email || ""),
      details: sanitizeInput(body.details || ""),
      clientIdentifier: sanitizeInput(body.clientIdentifier || ""),
      sourcePage: sanitizeInput(body.sourcePage || "/"),
      clientIp: geo.clientIp || clientIp,
      userAgent,
      notes: sanitizeInput(body.notes || ""),
      // Live Geolocation Fields
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

    return NextResponse.json({
      success: true,
      message: "Interaction tracked successfully",
      data: interaction,
    });
  } catch (error) {
    console.error("Error saving interaction:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save interaction" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const auth = verifyAdminRequest(req);
    if (!auth.authenticated) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access: Admin authentication required" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { id, status, notes } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Record ID is required" }, { status: 400 });
    }

    const updates: Record<string, unknown> = {};
    if (status) updates.status = status as RecordStatus;
    if (notes !== undefined) updates.notes = sanitizeInput(notes);

    const updated = await updateRecord("interactions", id, updates);

    if (!updated) {
      return NextResponse.json({ success: false, error: "Interaction not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating interaction:", error);
    return NextResponse.json({ success: false, error: "Failed to update interaction" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const auth = verifyAdminRequest(req);
    if (!auth.authenticated) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access: Admin authentication required" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const permanent = searchParams.get("permanent") === "true";

    if (!id) {
      return NextResponse.json({ success: false, error: "Record ID is required" }, { status: 400 });
    }

    const success = permanent
      ? await permanentDeleteRecord("interactions", id)
      : await softDeleteRecord("interactions", id);

    if (!success) {
      return NextResponse.json({ success: false, error: "Interaction not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: permanent ? "Permanently deleted" : "Moved to trash (soft-deleted)",
    });
  } catch (error) {
    console.error("Error deleting interaction:", error);
    return NextResponse.json({ success: false, error: "Failed to delete interaction" }, { status: 500 });
  }
}
