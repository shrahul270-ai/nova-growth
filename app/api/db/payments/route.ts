import { NextRequest, NextResponse } from "next/server";
import { createPayment, queryRecords, softDeleteRecord, permanentDeleteRecord, updateRecord, RecordStatus, ensureSupabaseSync } from "@/lib/db";

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
    const body = await req.json();

    const clientIp = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    const payment = createPayment({
      type: "payment_checkout",
      transactionId: body.transactionId || `NOVA-${Math.floor(100000 + Math.random() * 900000)}`,
      clientName: body.clientName || "Anonymous Client",
      clientEmail: body.clientEmail || "",
      companyName: body.companyName || "",
      planId: body.planId || "",
      planName: body.planName || "",
      mode: body.mode || "retainer",
      invoiceNumber: body.invoiceNumber || "",
      currency: body.currency || "USD",
      amount: body.amount || 0,
      paymentMethod: body.paymentMethod || "stripe",
      paymentStatus: body.paymentStatus || "paid",
      clientIp,
      userAgent,
      notes: body.notes || "",
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
    const body = await req.json();
    const { id, status, notes, paymentStatus } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Record ID is required" }, { status: 400 });
    }

    const updates: Record<string, unknown> = {};
    if (status) updates.status = status as RecordStatus;
    if (notes !== undefined) updates.notes = notes;
    if (paymentStatus) updates.paymentStatus = paymentStatus;

    const updated = updateRecord("payments", id, updates);

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
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const permanent = searchParams.get("permanent") === "true";

    if (!id) {
      return NextResponse.json({ success: false, error: "Record ID is required" }, { status: 400 });
    }

    const success = permanent 
      ? permanentDeleteRecord("payments", id)
      : softDeleteRecord("payments", id);

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
