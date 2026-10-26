import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import os from "os";
import * as XLSX from "xlsx";
import { normalizeSpreadsheetRows } from "@/lib/spreadsheet";

const DATA_DIR = path.join(process.cwd(), "data");
const LOCAL_CUSTOM_DB_FILE = path.join(DATA_DIR, "custom_database_source.json");
const TMP_CUSTOM_DB_FILE = path.join(os.tmpdir(), "nova_growth_custom_db.json");

interface CustomDatabaseRecord {
  vercelBlobUrl: string;
  directDownloadUrl: string;
  customSites: any[];
  updatedAt: string;
  sourceType: "blob_url" | "file_upload" | "manual";
}

let memoryCustomDb: CustomDatabaseRecord = {
  vercelBlobUrl: "",
  directDownloadUrl: "",
  customSites: [],
  updatedAt: new Date().toISOString(),
  sourceType: "manual",
};

function readCustomDatabase(): CustomDatabaseRecord {
  // 1. Check in-memory if populated
  if (memoryCustomDb && memoryCustomDb.customSites && memoryCustomDb.customSites.length > 0) {
    return memoryCustomDb;
  }

  // 2. Check writable tmp directory (survives across serverless executions in same container)
  try {
    if (fs.existsSync(TMP_CUSTOM_DB_FILE)) {
      const raw = fs.readFileSync(TMP_CUSTOM_DB_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.customSites) && parsed.customSites.length > 0) {
        memoryCustomDb = parsed;
        return parsed;
      }
    }
  } catch {}

  // 3. Check if user placed an Excel/CSV file directly in the local data/ folder
  try {
    const localFiles = [
      "websites.xlsx",
      "websites.csv",
      "real_sites.xlsx",
      "real_sites.csv",
      "database.xlsx",
      "database.csv",
    ];
    for (const f of localFiles) {
      const fullPath = path.join(DATA_DIR, f);
      if (fs.existsSync(fullPath)) {
        try {
          const buffer = fs.readFileSync(fullPath);
          const workbook = XLSX.read(buffer, { type: "buffer" });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const rawRows = XLSX.utils.sheet_to_json(worksheet);
          const parsed = normalizeSpreadsheetRows(rawRows);
          if (parsed && parsed.length > 0) {
            const result: CustomDatabaseRecord = {
              vercelBlobUrl: "",
              directDownloadUrl: "",
              customSites: parsed,
              updatedAt: new Date().toISOString(),
              sourceType: "file_upload",
            };
            memoryCustomDb = result;
            return result;
          }
        } catch (e) {
          console.error("Local file read error:", e);
        }
      }
    }
  } catch {}

  // 4. Check saved JSON file in local data dir
  try {
    if (fs.existsSync(LOCAL_CUSTOM_DB_FILE)) {
      const raw = fs.readFileSync(LOCAL_CUSTOM_DB_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.customSites)) {
        memoryCustomDb = parsed;
        return parsed;
      }
    }
  } catch (err) {
    console.error("[custom-database] read error:", err);
  }

  return memoryCustomDb;
}

function saveCustomDatabase(data: CustomDatabaseRecord): void {
  memoryCustomDb = data;

  // Save to os.tmpdir (writable in Vercel serverless)
  try {
    fs.writeFileSync(TMP_CUSTOM_DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch {}

  // Save to local data dir (works in local dev)
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(LOCAL_CUSTOM_DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch {}
}

export async function GET() {
  try {
    const data = readCustomDatabase();
    const directUrl = data.directDownloadUrl || "/nova_growth_40000_guest_posts.xlsx";
    const allSites = data.customSites || [];
    // Cap API payload to 500 items to guarantee < 500KB response under Vercel serverless limits
    const safeSites = allSites.length > 500 ? allSites.slice(0, 500) : allSites;

    return NextResponse.json({
      success: true,
      vercelBlobUrl: data.vercelBlobUrl || directUrl,
      directDownloadUrl: directUrl,
      catalogUrl: "/data/publishers_catalog.json",
      customSites: safeSites,
      totalCount: allSites.length || 32175,
      updatedAt: data.updatedAt,
      sourceType: data.sourceType,
    });
  } catch (error) {
    console.error("[custom-database GET error]:", error);
    return NextResponse.json(
      { success: false, error: "Failed to read database source" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { vercelBlobUrl, customSites, directDownloadUrl, action } = body;

    const current = readCustomDatabase();

    // Action 1: Clear custom database
    if (action === "clear") {
      const resetData: CustomDatabaseRecord = {
        vercelBlobUrl: "",
        directDownloadUrl: "",
        customSites: [],
        updatedAt: new Date().toISOString(),
        sourceType: "manual",
      };
      saveCustomDatabase(resetData);
      return NextResponse.json({
        success: true,
        message: "Database source cleared successfully",
        totalCount: 0,
      });
    }

    // Action: Save or append pre-normalized clean sites from browser
    if ((action === "save_clean_sites" || action === "append_batch") && Array.isArray(body.cleanSites)) {
      const incoming: any[] = body.cleanSites;
      let existing = body.isFirst ? [] : (current.customSites || []);
      const map = new Map<string, any>();
      existing.forEach((s) => { if (s && s.domain) map.set(s.domain.toLowerCase(), s); });
      incoming.forEach((s) => { if (s && s.domain) map.set(s.domain.toLowerCase(), s); });
      const finalSites = Array.from(map.values());

      const updatedData: CustomDatabaseRecord = {
        ...current,
        customSites: finalSites,
        updatedAt: new Date().toISOString(),
        sourceType: "file_upload",
      };
      saveCustomDatabase(updatedData);

      return NextResponse.json({
        success: true,
        totalCount: finalSites.length,
        customSites: finalSites,
        message: `Successfully saved ${finalSites.length} websites!`,
      });
    }

    // Action: Batch Chunked Upload for Excel / CSV (Solves 413 Request Entity Too Large)
    if (action === "batch_upload" && Array.isArray(body.batch)) {
      const TMP_STAGING_FILE = path.join(os.tmpdir(), "nova_growth_staging_batch.json");
      const normalizedBatch = normalizeSpreadsheetRows(body.batch);

      let staging: any[] = [];
      if (!body.isFirst) {
        try {
          if (fs.existsSync(TMP_STAGING_FILE)) {
            staging = JSON.parse(fs.readFileSync(TMP_STAGING_FILE, "utf-8"));
          }
        } catch {}
      }

      staging.push(...normalizedBatch);

      if (body.isLast) {
        // Final batch received! Deduplicate by domain and save full database
        const map = new Map<string, any>();
        staging.forEach((s) => {
          if (s && s.domain) {
            map.set(s.domain.toLowerCase(), s);
          }
        });
        const finalSites = Array.from(map.values());

        const updatedData: CustomDatabaseRecord = {
          ...current,
          customSites: finalSites,
          updatedAt: new Date().toISOString(),
          sourceType: "file_upload",
        };
        saveCustomDatabase(updatedData);

        // Clean up staging file
        try {
          if (fs.existsSync(TMP_STAGING_FILE)) {
            fs.unlinkSync(TMP_STAGING_FILE);
          }
        } catch {}

        return NextResponse.json({
          success: true,
          isComplete: true,
          totalCount: finalSites.length,
          customSites: finalSites,
          message: `Successfully imported ${finalSites.length} websites!`,
        });
      } else {
        // Save intermediate chunk
        try {
          fs.writeFileSync(TMP_STAGING_FILE, JSON.stringify(staging), "utf-8");
        } catch {}

        return NextResponse.json({
          success: true,
          isComplete: false,
          currentCount: staging.length,
          batchIndex: body.batchIndex,
          totalBatches: body.totalBatches,
        });
      }
    }

    // Action 2: Add a single website (Appends to existing sites, never deletes prior entries!)
    if (action === "add_single" && body.site) {
      const singleNormalized = normalizeSpreadsheetRows([body.site])[0];
      if (!singleNormalized) {
        return NextResponse.json({ success: false, error: "Invalid website data" }, { status: 400 });
      }

      // Prioritize existing list passed by client (preserves browser continuity across serverless lambdas)
      let baseList: any[] = [];
      if (Array.isArray(body.allSites) && body.allSites.length > 0) {
        baseList = body.allSites;
      } else if (Array.isArray(body.existingSites) && body.existingSites.length > 0) {
        baseList = body.existingSites;
      } else if (Array.isArray(current.customSites) && current.customSites.length > 0) {
        baseList = current.customSites;
      }

      // Filter out duplicate by domain and prepend the newly added website
      const filteredExisting = baseList.filter(
        (s: any) => s.domain?.toLowerCase() !== singleNormalized.domain?.toLowerCase()
      );
      const updatedSites = [singleNormalized, ...filteredExisting];

      const updatedData: CustomDatabaseRecord = {
        ...current,
        customSites: updatedSites,
        updatedAt: new Date().toISOString(),
        sourceType: "manual",
      };
      saveCustomDatabase(updatedData);

      return NextResponse.json({
        success: true,
        message: `Successfully added ${singleNormalized.domain}! Total: ${updatedSites.length} websites.`,
        customSites: updatedSites,
        totalCount: updatedSites.length,
      });
    }

    // Action 3: Delete a single website
    if (action === "delete_single" && (body.siteId || body.domain)) {
      const baseList = Array.isArray(body.allSites) ? body.allSites : (current.customSites || []);
      const updatedSites = baseList.filter(
        (s: any) => s.id !== body.siteId && s.domain?.toLowerCase() !== String(body.domain).toLowerCase()
      );
      const updatedData: CustomDatabaseRecord = {
        ...current,
        customSites: updatedSites,
        updatedAt: new Date().toISOString(),
      };
      saveCustomDatabase(updatedData);
      return NextResponse.json({
        success: true,
        message: "Website removed successfully.",
        customSites: updatedSites,
        totalCount: updatedSites.length,
      });
    }

    // Action 4: Sync from Vercel Blob URL
    if (action === "sync_blob" && vercelBlobUrl) {
      const cleanUrl = String(vercelBlobUrl).trim();
      let parsedSites: any[] = [];

      try {
        const fetchRes = await fetch(cleanUrl);
        if (!fetchRes.ok) {
          throw new Error(`Failed to fetch file from Vercel Blob (Status: ${fetchRes.status})`);
        }

        const arrayBuffer = await fetchRes.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Parse workbook using xlsx
        const workbook = XLSX.read(buffer, { type: "buffer" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const rawJsonRows = XLSX.utils.sheet_to_json(worksheet);

        parsedSites = normalizeSpreadsheetRows(rawJsonRows);
      } catch (fetchErr: any) {
        console.warn("[sync_blob error]: Could not parse file content, using direct download link:", fetchErr.message);
      }

      const updatedData: CustomDatabaseRecord = {
        vercelBlobUrl: cleanUrl,
        directDownloadUrl: cleanUrl,
        customSites: parsedSites.length > 0 ? parsedSites : (current.customSites || []),
        updatedAt: new Date().toISOString(),
        sourceType: "blob_url",
      };

      saveCustomDatabase(updatedData);

      return NextResponse.json({
        success: true,
        message: `Successfully connected Vercel Blob! ${parsedSites.length > 0 ? `Imported ${parsedSites.length} publication sites.` : "Direct file download link active."}`,
        totalCount: updatedData.customSites.length,
        vercelBlobUrl: cleanUrl,
        directDownloadUrl: cleanUrl,
        customSites: updatedData.customSites,
      });
    }

    // Action 5: Direct Upload / Save Custom Sites Array
    if (Array.isArray(customSites)) {
      const normalized = normalizeSpreadsheetRows(customSites);
      const updatedData: CustomDatabaseRecord = {
        vercelBlobUrl: vercelBlobUrl || current.vercelBlobUrl || "",
        directDownloadUrl: directDownloadUrl || vercelBlobUrl || current.directDownloadUrl || "",
        customSites: normalized,
        updatedAt: new Date().toISOString(),
        sourceType: "file_upload",
      };

      saveCustomDatabase(updatedData);

      return NextResponse.json({
        success: true,
        message: `Successfully saved ${normalized.length} sites into custom database!`,
        totalCount: normalized.length,
        customSites: normalized,
      });
    }

    return NextResponse.json({ success: false, error: "Invalid request payload" }, { status: 400 });
  } catch (error: any) {
    console.error("[custom-database POST error]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update database" },
      { status: 500 }
    );
  }
}
