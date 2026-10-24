import { NextRequest, NextResponse } from "next/server";
import { readDatabase, ensureSupabaseSync } from "@/lib/db";
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
    const { searchParams } = new URL(req.url);
    const format = searchParams.get("format") || "json";
    const collection = searchParams.get("collection") || "all";

    const db = readDatabase();

    if (format === "csv" || format === "excel") {
      let records: any[] = [];
      if (collection === "leads" || collection === "all") records.push(...db.leads);
      if (collection === "interactions" || collection === "all") records.push(...db.interactions);
      if (collection === "audits" || collection === "all") records.push(...db.audits);
      if (collection === "payments" || collection === "all") records.push(...db.payments);

      // Convert to flat CSV/Excel-compatible format
      const headers = [
        "ID",
        "Collection",
        "Type",
        "Status",
        "IsDeleted",
        "Created At",
        "Name/Title/Domain",
        "Email/Details",
        "Amount/Score",
      ];
      const rows = records.map((r) => {
        const id = r.id || "";
        const col = r.collection || "";
        const typ = r.type || "";
        const stat = r.status || "";
        const del = r.isDeleted ? "Yes" : "No";
        const date = r.createdAt || "";
        const primary = r.name || r.title || r.domain || r.clientName || "";
        const secondary = r.email || r.details || r.clientEmail || "";
        const value = r.amount
          ? `${r.currency || "USD"} ${r.amount}`
          : r.scores?.ranking
          ? `Score: ${r.scores.ranking}`
          : "";

        return [
          `"${id}"`,
          `"${col}"`,
          `"${typ}"`,
          `"${stat}"`,
          `"${del}"`,
          `"${date}"`,
          `"${String(primary).replace(/"/g, '""')}"`,
          `"${String(secondary).replace(/"/g, '""')}"`,
          `"${String(value).replace(/"/g, '""')}"`,
        ].join(",");
      });

      // Add UTF-8 BOM so Microsoft Excel correctly displays all characters & symbols
      const csvContent = "\uFEFF" + [headers.join(","), ...rows].join("\n");

      return new NextResponse(csvContent, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="nova_growth_${collection}_${Date.now()}.csv"`,
        },
      });
    }

    // Default JSON export
    const exportData = collection === "all" ? db : { [collection]: db[collection as keyof typeof db] };

    return new NextResponse(JSON.stringify(exportData, null, 2), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Disposition": `attachment; filename="nova_growth_db_${Date.now()}.json"`,
      },
    });
  } catch (error) {
    console.error("Error exporting database:", error);
    return NextResponse.json({ success: false, error: "Failed to export database" }, { status: 500 });
  }
}
