import { NextResponse } from "next/server";
import { getDatabaseStats, ensureSupabaseSync } from "@/lib/db";

export async function GET() {
  try {
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
