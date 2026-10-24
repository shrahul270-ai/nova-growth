import { NextRequest, NextResponse } from "next/server";
import { restoreRecord } from "@/lib/db";
import { verifyAdminRequest } from "@/lib/security";

export async function POST(req: NextRequest) {
  try {
    const auth = verifyAdminRequest(req);
    if (!auth.authenticated) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access: Admin authentication required" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { collection, id } = body;

    if (!collection || !id) {
      return NextResponse.json(
        { success: false, error: "collection and record id are required" },
        { status: 400 }
      );
    }

    if (!["leads", "interactions", "audits", "payments"].includes(collection)) {
      return NextResponse.json(
        { success: false, error: "Invalid collection specified" },
        { status: 400 }
      );
    }

    const success = await restoreRecord(collection, id);

    if (!success) {
      return NextResponse.json(
        { success: false, error: "Record not found or could not be restored" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Record successfully restored from Trash back to active data",
    });
  } catch (error) {
    console.error("Error restoring record:", error);
    return NextResponse.json(
      { success: false, error: "Failed to restore record" },
      { status: 500 }
    );
  }
}
