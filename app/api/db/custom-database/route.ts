import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import * as XLSX from "xlsx";

const DATA_DIR = path.join(process.cwd(), "data");
const CUSTOM_DB_FILE = path.join(DATA_DIR, "custom_database_source.json");

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
  try {
    // 1. Check if user placed an Excel/CSV file directly in the local data/ folder
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
            return {
              vercelBlobUrl: "",
              directDownloadUrl: "",
              customSites: parsed,
              updatedAt: new Date().toISOString(),
              sourceType: "file_upload",
            };
          }
        } catch (e) {
          console.error("Local file read error:", e);
        }
      }
    }

    // 2. Check saved JSON file
    if (fs.existsSync(CUSTOM_DB_FILE)) {
      const raw = fs.readFileSync(CUSTOM_DB_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      memoryCustomDb = parsed;
      return parsed;
    }
  } catch (err) {
    console.error("[custom-database] read error:", err);
  }
  return memoryCustomDb;
}

function saveCustomDatabase(data: CustomDatabaseRecord): void {
  try {
    memoryCustomDb = data;
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(CUSTOM_DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("[custom-database] save error (in-memory cached):", err);
  }
}

// Parse raw spreadsheet rows into normalized publisher sites
function normalizeSpreadsheetRows(rows: any[]): any[] {
  return rows.map((row, idx) => {
    // Find matching keys case-insensitively
    const getVal = (possibleKeys: string[], defaultVal: any = ""): any => {
      const rowKeys = Object.keys(row);
      for (const pk of possibleKeys) {
        const found = rowKeys.find((rk) => rk.toLowerCase().trim() === pk.toLowerCase().trim());
        if (found !== undefined && row[found] !== undefined && row[found] !== null && String(row[found]).trim() !== "") {
          return row[found];
        }
      }
      return defaultVal;
    };

    const rawDomain = String(getVal(["domain", "website", "publication", "site", "url"], `site-${idx + 1}.com`))
      .replace(/^https?:\/\//i, "")
      .replace(/\/.*$/, "")
      .trim();

    const rawDr = parseInt(String(getVal(["dr", "ahrefs dr", "ahrefs_dr", "domain rating"], 50)), 10);
    const rawDa = parseInt(String(getVal(["da", "moz da", "moz_da", "domain authority"], 45)), 10);
    const rawPrice = parseInt(String(getVal(["price", "cost", "usd", "price (usd)", "rate"], 150)).replace(/[^0-9]/g, ""), 10);
    const rawTraffic = String(getVal(["traffic", "ahrefs traffic", "monthly traffic", "organic traffic", "visits"], "50,000+"));
    const rawNiche = String(getVal(["niche", "category", "industry", "topic"], "General"));
    const rawCountry = String(getVal(["country", "geo", "location", "target country"], "United States (USA)"));
    const rawLinkType = String(getVal(["link type", "linktype", "link_type", "type"], "DoFollow"));

    return {
      id: `custom-pub-${idx + 1}-${Date.now().toString(36)}`,
      domain: rawDomain,
      niche: rawNiche,
      language: "English",
      country: rawCountry,
      countryFlag: rawCountry.includes("UK") ? "🇬🇧" : rawCountry.includes("Canada") ? "🇨🇦" : rawCountry.includes("India") ? "🇮🇳" : "🇺🇸",
      dr: isNaN(rawDr) ? 50 : Math.min(100, Math.max(1, rawDr)),
      da: isNaN(rawDa) ? 45 : Math.min(100, Math.max(1, rawDa)),
      ahrefsTraffic: rawTraffic.includes("+") || rawTraffic.includes(",") ? rawTraffic : `${Number(rawTraffic).toLocaleString()}+`,
      linkType: rawLinkType.toLowerCase().includes("no") ? "NoFollow" : "DoFollow",
      price: isNaN(rawPrice) || rawPrice <= 0 ? 150 : rawPrice,
      tatDays: 2,
      indexable: true,
      sponsoredTag: false,
      addedByAdmin: true,
    };
  }).filter((s) => s.domain && s.domain !== "site-1.com" || rows.length <= 1);
}

export async function GET() {
  try {
    const data = readCustomDatabase();
    return NextResponse.json({
      success: true,
      vercelBlobUrl: data.vercelBlobUrl,
      directDownloadUrl: data.directDownloadUrl || data.vercelBlobUrl,
      customSites: data.customSites || [],
      totalCount: (data.customSites || []).length,
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

    // Action: Add a single website
    if (action === "add_single" && body.site) {
      const singleNormalized = normalizeSpreadsheetRows([body.site])[0];
      if (!singleNormalized) {
        return NextResponse.json({ success: false, error: "Invalid website data" }, { status: 400 });
      }
      const existing = current.customSites || [];
      const updatedSites = [singleNormalized, ...existing.filter((s) => s.domain !== singleNormalized.domain)];
      const updatedData: CustomDatabaseRecord = {
        ...current,
        customSites: updatedSites,
        updatedAt: new Date().toISOString(),
      };
      saveCustomDatabase(updatedData);
      return NextResponse.json({
        success: true,
        message: `Successfully added ${singleNormalized.domain}!`,
        customSites: updatedSites,
        totalCount: updatedSites.length,
      });
    }

    // Action: Delete a single website
    if (action === "delete_single" && (body.siteId || body.domain)) {
      const existing = current.customSites || [];
      const updatedSites = existing.filter(
        (s) => s.id !== body.siteId && s.domain !== body.domain
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

    // Action 2: Sync from Vercel Blob URL
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
        console.warn("[sync_blob error]: Could not parse file content, will use direct download link:", fetchErr.message);
        // Even if parsing fails (e.g. CORS or encrypted), we still save the Vercel Blob link as direct download!
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

    // Action 3: Direct Upload / Save Custom Sites Array
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

    // Action 4: Just save Vercel Blob / Download link
    if (vercelBlobUrl || directDownloadUrl) {
      const cleanUrl = String(vercelBlobUrl || directDownloadUrl).trim();
      const updatedData: CustomDatabaseRecord = {
        vercelBlobUrl: cleanUrl,
        directDownloadUrl: cleanUrl,
        customSites: current.customSites || [],
        updatedAt: new Date().toISOString(),
        sourceType: "blob_url",
      };

      saveCustomDatabase(updatedData);

      return NextResponse.json({
        success: true,
        message: "Vercel Blob link saved successfully!",
        vercelBlobUrl: cleanUrl,
        directDownloadUrl: cleanUrl,
        totalCount: updatedData.customSites.length,
      });
    }

    return NextResponse.json(
      { success: false, error: "Invalid payload: Provide vercelBlobUrl or customSites" },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("[custom-database POST error]:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to save database source" },
      { status: 500 }
    );
  }
}
