import { NextRequest, NextResponse } from "next/server";
import {
  createLead,
  queryRecords,
  updateRecord,
  softDeleteRecord,
  permanentDeleteRecord,
  RecordStatus,
  ensureSupabaseSync,
} from "@/lib/db";
import {
  verifyAdminRequest,
  checkSubmissionRateLimit,
  sanitizeInput,
} from "@/lib/security";

export async function GET(req: NextRequest) {
  try {
    // Security check: Must be authenticated admin
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
    const status = searchParams.get("status") || "all";
    const sortOrder = (searchParams.get("sortOrder") as "desc" | "asc") || "desc";
    const showDeletedParam = searchParams.get("showDeleted");
    const showDeleted =
      showDeletedParam === "true" ? true : showDeletedParam === "all" ? undefined : false;
    const limit = parseInt(searchParams.get("limit") || "100", 10);
    const offset = parseInt(searchParams.get("offset") || "0", 10);

    const result = queryRecords({
      collection: "leads",
      showDeleted,
      search,
      status,
      sortOrder,
      limit,
      offset,
    });

    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    console.error("Error fetching leads:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch leads" },
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

    // Anti-DDoS Rate Limit: Max 15 per minute per IP
    if (!checkSubmissionRateLimit(clientIp)) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many submission requests. Please wait a moment before trying again.",
        },
        { status: 429 }
      );
    }

    const body = await req.json();

    if (!body.name && !body.email && !body.phone) {
      return NextResponse.json(
        { success: false, error: "At least a name, email, or phone number is required" },
        { status: 400 }
      );
    }

    // Sanitize user inputs against XSS/script injection
    const newLead = await createLead({
      type: sanitizeInput(body.type || "contact_form"),
      name: sanitizeInput(body.name || "Anonymous Client"),
      email: sanitizeInput(body.email || ""),
      phone: sanitizeInput(body.phone || ""),
      website: sanitizeInput(body.website || ""),
      timezone: sanitizeInput(body.timezone || "US / Eastern (EST)"),
      service: sanitizeInput(body.service || "General Inquiry"),
      budget: sanitizeInput(body.budget || ""),
      message: sanitizeInput(body.message || ""),
      sourceUrl: sanitizeInput(body.sourceUrl || "/"),
      clientIp,
      userAgent,
      notes: sanitizeInput(body.notes || ""),
    });

    return NextResponse.json({
      success: true,
      message: "Lead saved to database successfully",
      data: newLead,
    });
  } catch (error) {
    console.error("Error saving lead:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save lead to database" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    // Security check: Must be authenticated admin
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
      return NextResponse.json(
        { success: false, error: "Record ID is required" },
        { status: 400 }
      );
    }

    const updates: Record<string, unknown> = {};
    if (status) updates.status = status as RecordStatus;
    if (notes !== undefined) updates.notes = sanitizeInput(notes);

    const updated = await updateRecord("leads", id, updates);

    if (!updated) {
      return NextResponse.json({ success: false, error: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating lead:", error);
    return NextResponse.json({ success: false, error: "Failed to update lead" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    // Security check: Must be authenticated admin
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
      return NextResponse.json(
        { success: false, error: "Record ID is required" },
        { status: 400 }
      );
    }

    const success = permanent
      ? await permanentDeleteRecord("leads", id)
      : await softDeleteRecord("leads", id);

    if (!success) {
      return NextResponse.json({ success: false, error: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: permanent ? "Permanently deleted" : "Moved to trash (soft-deleted)",
    });
  } catch (error) {
    console.error("Error deleting lead:", error);
    return NextResponse.json({ success: false, error: "Failed to delete lead" }, { status: 500 });
  }
}
