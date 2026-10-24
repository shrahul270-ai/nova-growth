import { NextRequest, NextResponse } from "next/server";
import { getDatabaseStats, ensureSupabaseSync } from "@/lib/db";
import { verifyAdminRequest } from "@/lib/security";

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
    const stats = getDatabaseStats();
    return NextResponse.json({ success: true, ...stats });
  } catch (error) {
    console.error("Error retrieving database stats:", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve database stats" },
      { status: 500 }
    );
  }
}
