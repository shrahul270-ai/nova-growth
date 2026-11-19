import { NextRequest, NextResponse } from "next/server";
import {
  queryRecords,
  softDeleteRecord,
  permanentDeleteRecord,
  updateRecord,
  RecordStatus,
  ensureSupabaseSync,
} from "@/lib/db";
import { verifyAdminRequest, sanitizeInput } from "@/lib/security";

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
      collection: "audits",
      showDeleted,
      search,
      sortOrder,
      limit,
      offset,
    });

    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    console.error("Error fetching audits:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch audits" },
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
    const { id, status, notes, emailSubmitted } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Record ID is required" }, { status: 400 });
    }

    const updates: Record<string, unknown> = {};
    if (status) updates.status = status as RecordStatus;
    if (notes !== undefined) updates.notes = sanitizeInput(notes);
    if (emailSubmitted) updates.emailSubmitted = sanitizeInput(emailSubmitted);

    const updated = await updateRecord("audits", id, updates);

    if (!updated) {
      return NextResponse.json({ success: false, error: "Audit record not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating audit:", error);
    return NextResponse.json({ success: false, error: "Failed to update audit" }, { status: 500 });
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
      ? await permanentDeleteRecord("audits", id)
      : await softDeleteRecord("audits", id);

    if (!success) {
      return NextResponse.json({ success: false, error: "Audit record not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: permanent ? "Permanently deleted" : "Moved to trash (soft-deleted)",
    });
  } catch (error) {
    console.error("Error deleting audit:", error);
    return NextResponse.json({ success: false, error: "Failed to delete audit" }, { status: 500 });
  }
}
