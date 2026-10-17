import { NextRequest, NextResponse } from "next/server";
import { createInteraction, queryRecords, softDeleteRecord, permanentDeleteRecord, updateRecord, RecordStatus, ensureSupabaseSync } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    await ensureSupabaseSync();
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const sortOrder = (searchParams.get("sortOrder") as "desc" | "asc") || "desc";
    const showDeletedParam = searchParams.get("showDeleted");
    const showDeleted = showDeletedParam === "true" ? true : showDeletedParam === "all" ? undefined : false;
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

    return NextResponse.json({ success: true, ...result });
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
    const body = await req.json();

    const clientIp = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    const interaction = createInteraction({
      type: body.type || "whatsapp_click",
      action: body.action || "whatsapp",
      title: body.title || "Client Click / Interaction",
      name: body.name || "",
      phone: body.phone || "",
      email: body.email || "",
      details: body.details || "",
      clientIdentifier: body.clientIdentifier || "",
      sourcePage: body.sourcePage || "/",
      targetUrl: body.targetUrl || "",
      clientIp,
      userAgent,
      notes: body.notes || "",
    });


    return NextResponse.json({
      success: true,
      message: "Interaction tracked and stored in database",
      data: interaction,
    });
  } catch (error) {
    console.error("Error recording interaction:", error);
    return NextResponse.json(
      { success: false, error: "Failed to record interaction" },
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

    const updated = updateRecord("interactions", id, updates);

    if (!updated) {
      return NextResponse.json({ success: false, error: "Record not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating interaction:", error);
    return NextResponse.json({ success: false, error: "Failed to update interaction" }, { status: 500 });
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
      ? permanentDeleteRecord("interactions", id)
      : softDeleteRecord("interactions", id);

    if (!success) {
      return NextResponse.json({ success: false, error: "Record not found" }, { status: 404 });
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
