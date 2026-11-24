import { NextRequest, NextResponse } from "next/server";
import {
  fetchAdminDataByKey,
  fetchAllAdminData,
  upsertAdminData,
  deleteAdminData,
} from "@/lib/db";
import { verifyAdminRequest } from "@/lib/security";

/**
 * GET /api/admin/data
 * Query parameters:
 *  - key: Fetch single entry by key (e.g. ?key=site_settings)
 *  - category: Filter by category (e.g. ?category=settings)
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get("key");
    const category = searchParams.get("category");

    if (key) {
      const record = await fetchAdminDataByKey(key);
      if (!record) {
        return NextResponse.json(
          { success: false, error: `Admin data record with key "${key}" not found` },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, record });
    }

    const records = await fetchAllAdminData(category || undefined);
    return NextResponse.json({
      success: true,
      count: records.length,
      records,
    });
  } catch (err: any) {
    console.error("[API Admin Data GET Error]:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to fetch admin data" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/data
 * Upsert admin data entry. Requires admin authentication.
 * Body: { key, data, category?, title?, description?, status? }
 */
export async function POST(req: NextRequest) {
  try {
    // 1. Verify admin authorization
    const auth = verifyAdminRequest(req);
    if (!auth.authenticated) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Admin session required" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { key, data, category, title, description, status, metadata } = body;

    if (!key || typeof key !== "string" || !key.trim()) {
      return NextResponse.json(
        { success: false, error: "Field 'key' is required and must be a non-empty string" },
        { status: 400 }
      );
    }

    if (data === undefined || data === null) {
      return NextResponse.json(
        { success: false, error: "Field 'data' is required" },
        { status: 400 }
      );
    }

    const result = await upsertAdminData({
      key: key.trim(),
      data: typeof data === "object" ? data : { value: data },
      category: category || "general",
      title: title || key.trim(),
      description: description || "",
      author: auth.email || "admin@balajiprimemedia.in",
      status: status || "active",
      metadata: metadata || {},
    });

    if (!result) {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to persist admin data into Supabase. Ensure table 'admin_data' has been created.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Admin data for key "${key}" saved successfully`,
      record: result,
    });
  } catch (err: any) {
    console.error("[API Admin Data POST Error]:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to save admin data" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/data
 * Soft-delete or permanent delete by key. Requires admin authentication.
 * Query or body: ?key=...&permanent=true
 */
export async function DELETE(req: NextRequest) {
  try {
    const auth = verifyAdminRequest(req);
    if (!auth.authenticated) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Admin session required" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    let key = searchParams.get("key");
    const permanent = searchParams.get("permanent") === "true";

    if (!key) {
      try {
        const body = await req.json();
        key = body.key;
      } catch {}
    }

    if (!key) {
      return NextResponse.json(
        { success: false, error: "Parameter 'key' is required" },
        { status: 400 }
      );
    }

    const deleted = await deleteAdminData(key, permanent);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: `Failed to delete admin data with key "${key}"` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Admin data "${key}" deleted successfully`,
    });
  } catch (err: any) {
    console.error("[API Admin Data DELETE Error]:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to delete admin data" },
      { status: 500 }
    );
  }
}
