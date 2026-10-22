import { NextRequest, NextResponse } from "next/server";
import { createLead, queryRecords, updateRecord, softDeleteRecord, permanentDeleteRecord, RecordStatus, ensureSupabaseSync } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    await ensureSupabaseSync();
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "all";
    const sortOrder = (searchParams.get("sortOrder") as "desc" | "asc") || "desc";
    const showDeletedParam = searchParams.get("showDeleted");
    const showDeleted = showDeletedParam === "true" ? true : showDeletedParam === "all" ? undefined : false;
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
    const body = await req.json();

    const clientIp = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    if (!body.name && !body.email && !body.phone) {
      return NextResponse.json(
        { success: false, error: "At least a name, email, or phone number is required" },
        { status: 400 }
      );
    }

    const newLead = await createLead({
      type: body.type || "contact_form",
      name: body.name || "Anonymous Client",
      email: body.email || "",
      phone: body.phone || "",
      website: body.website || "",
      timezone: body.timezone || "US / Eastern (EST)",
      service: body.service || "General Inquiry",
      budget: body.budget || "",
      message: body.message || "",
      sourceUrl: body.sourceUrl || "/",
      clientIp,
      userAgent,
      notes: body.notes || "",
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
    const body = await req.json();
    const { id, status, notes } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Record ID is required" }, { status: 400 });
    }

    const updates: Record<string, unknown> = {};
    if (status) updates.status = status as RecordStatus;
    if (notes !== undefined) updates.notes = notes;

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
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const permanent = searchParams.get("permanent") === "true";

    if (!id) {
      return NextResponse.json({ success: false, error: "Record ID is required" }, { status: 400 });
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
