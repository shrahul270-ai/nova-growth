import { NextRequest, NextResponse } from "next/server";
import {
  createPayment,
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
      collection: "payments",
      showDeleted,
      search,
      sortOrder,
      limit,
      offset,
    });

    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    console.error("Error fetching payments:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch payments" },
      { status: 500 }
    );
  }
}

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
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    const payment = await createPayment({
      type: "payment_checkout",
      transactionId: sanitizeInput(
        body.transactionId || `NOVA-${Math.floor(100000 + Math.random() * 900000)}`
      ),
      clientName: sanitizeInput(body.clientName || "Anonymous Client"),
      clientEmail: sanitizeInput(body.clientEmail || ""),
      companyName: sanitizeInput(body.companyName || ""),
      planId: sanitizeInput(body.planId || ""),
      planName: sanitizeInput(body.planName || ""),
      mode: sanitizeInput(body.mode || "retainer"),
      invoiceNumber: sanitizeInput(body.invoiceNumber || ""),
      currency: sanitizeInput(body.currency || "USD"),
      amount: Number(body.amount) || 0,
      paymentMethod: sanitizeInput(body.paymentMethod || "stripe"),
      paymentStatus: sanitizeInput(body.paymentStatus || "paid"),
      clientIp,
      userAgent,
      notes: sanitizeInput(body.notes || ""),
    });

    return NextResponse.json({
      success: true,
      message: "Payment transaction saved to database",
      data: payment,
    });
  } catch (error) {
    console.error("Error recording payment:", error);
    return NextResponse.json(
      { success: false, error: "Failed to record payment" },
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
    const { id, status, notes, paymentStatus } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Record ID is required" }, { status: 400 });
    }

    const updates: Record<string, unknown> = {};
    if (status) updates.status = status as RecordStatus;
    if (notes !== undefined) updates.notes = sanitizeInput(notes);
    if (paymentStatus) updates.paymentStatus = sanitizeInput(paymentStatus);

    const updated = await updateRecord("payments", id, updates);

    if (!updated) {
      return NextResponse.json({ success: false, error: "Payment record not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating payment:", error);
    return NextResponse.json({ success: false, error: "Failed to update payment" }, { status: 500 });
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
      ? await permanentDeleteRecord("payments", id)
      : await softDeleteRecord("payments", id);

    if (!success) {
      return NextResponse.json({ success: false, error: "Payment record not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: permanent ? "Permanently deleted" : "Moved to trash (soft-deleted)",
    });
  } catch (error) {
    console.error("Error deleting payment:", error);
    return NextResponse.json({ success: false, error: "Failed to delete payment" }, { status: 500 });
  }
}
