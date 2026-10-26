import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import os from "os";
import * as XLSX from "xlsx";

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

// Parse raw spreadsheet rows into normalized publisher sites with all 22 attributes
function normalizeSpreadsheetRows(rows: any[]): any[] {
  return rows.map((row, idx) => {
    // Find matching keys case-insensitively with flexible space/underscore support
    const getVal = (possibleKeys: string[], defaultVal: any = ""): any => {
      const rowKeys = Object.keys(row);
      for (const pk of possibleKeys) {
        const cleanPk = pk.toLowerCase().replace(/[^a-z0-9]/g, "");
        const found = rowKeys.find((rk) => {
          const cleanRk = rk.toLowerCase().replace(/[^a-z0-9]/g, "");
          return cleanRk === cleanPk;
        });
        if (found !== undefined && row[found] !== undefined && row[found] !== null && String(row[found]).trim() !== "") {
          return row[found];
        }
      }
      return defaultVal;
    };

    const parseNum = (val: any, defaultNum: number = 0): number => {
      if (val === undefined || val === null || val === "" || String(val).trim() === "") return defaultNum;
      const cleaned = String(val).replace(/[^0-9.]/g, "");
      const num = parseFloat(cleaned);
      return isNaN(num) ? defaultNum : Math.round(num);
    };

    const rawDomain = String(getVal(["domain", "website", "publication", "site", "url"], `site-${idx + 1}.com`))
      .replace(/^https?:\/\//i, "")
      .replace(/\/.*$/, "")
      .trim();

    const rawDr = parseNum(getVal(["dr", "ahrefs dr", "ahrefs_dr", "domain rating"], 50), 50);
    const rawDa = parseNum(getVal(["da", "moz da", "moz_da", "domain authority"], 45), 45);
    const rawPa = parseNum(getVal(["pa", "moz pa", "moz_pa", "page authority"], 0), 0);

    const rawTraffic = String(getVal(["traffic", "ahrefs traffic", "monthly traffic", "organic traffic", "visits", "semrush traffic"], "100,000+"));
    const rawSemrushScore = String(getVal(["semrush score", "semrush_score", "semrush", "authority score", "as"], "—"));
    const rawSpamScore = String(getVal(["spam score", "spam_score", "spam", "ss"], "1%"));
    const rawCategory = String(getVal(["category", "niche", "industry", "topic"], "General"));
    const rawLinkType = String(getVal(["link type", "linktype", "link_type", "type"], "DoFollow"));
    const rawSampleLink = String(getVal(["sample link", "sample_link", "sample url", "sample_url", "sample", "example", "live link"], ""));
    const rawCountry = String(getVal(["country", "geo", "location", "target country"], "Worldwide"));

    // Standard Pricing (Defaults to 0 if not provided by user)
    const rawContentPlacementPrice = parseNum(getVal(["content placement price", "content_placement_price", "placement price", "guest post price", "price", "cost", "rate", "usd"], 0), 0);
    const rawLinkInsertPrice = parseNum(getVal(["link insert price", "link_insert_price", "link insertion price", "link insertion", "link insert"], 0), 0);

    // CBD Pricing (Strictly defaults to 0! NO fake multipliers!)
    const rawCbdPlacementPrice = parseNum(getVal(["cbd content placement price", "cbd_content_placement_price", "cbd placement price", "cbd price"], 0), 0);
    const rawCbdCreationPlacementPrice = parseNum(getVal(["cbd content creation & placement price", "cbd content creation and placement price", "cbd_content_creation_placement_price", "cbd content creation placement"], 0), 0);
    const rawCbdLinkInsertPrice = parseNum(getVal(["cbd link insert price", "cbd_link_insert_price", "cbd link insertion price", "cbd link insert"], 0), 0);

    // Adult Pricing (Strictly defaults to 0! NO fake multipliers!)
    const rawAdultPlacementPrice = parseNum(getVal(["adult content placement price", "adult_content_placement_price", "adult placement price", "adult price"], 0), 0);
    const rawAdultCreationPlacementPrice = parseNum(getVal(["adult content creation & placement price", "adult content creation and placement price", "adult_content_creation_placement_price", "adult content creation placement"], 0), 0);
    const rawAdultLinkInsertPrice = parseNum(getVal(["adult link insert price", "adult_link_insert_price", "adult link insertion price", "adult link insert"], 0), 0);

    // Indexable & Sponsored
    const indexableVal = String(getVal(["indexable", "google indexable", "indexed", "index"], "Yes"));
    const isIndexable = !indexableVal.toLowerCase().includes("no") && !indexableVal.toLowerCase().includes("false");

    const sponsoredVal = String(getVal(["sponsored", "sponsored tag", "is sponsored", "sponsored_tag"], "No"));
    const isSponsored = sponsoredVal.toLowerCase().includes("yes") || sponsoredVal.toLowerCase().includes("true");

    // Logo / Favicon URL
    const rawLogoUrl = String(getVal(["logo_url", "logo url", "logo", "image", "icon", "favicon"], ""));
    const resolvedLogo = rawLogoUrl.trim() ? rawLogoUrl.trim() : `https://www.google.com/s2/favicons?domain=${rawDomain}&sz=128`;

    let flag = "🌐";
    const cLower = rawCountry.toLowerCase();
    if (cLower.includes("us") || cLower.includes("united states") || cLower.includes("america")) flag = "🇺🇸";
    else if (cLower.includes("uk") || cLower.includes("united kingdom") || cLower.includes("britain")) flag = "🇬🇧";
    else if (cLower.includes("canada")) flag = "🇨🇦";
    else if (cLower.includes("australia")) flag = "🇦🇺";
    else if (cLower.includes("india")) flag = "🇮🇳";

    return {
      id: `real-site-${Date.now()}-${idx}-${Math.random().toString(36).slice(2, 6)}`,
      domain: rawDomain,
      da: rawDa,
      pa: rawPa,
      dr: rawDr,
      traffic: rawTraffic,
      ahrefsTraffic: rawTraffic,
      semrushScore: rawSemrushScore,
      spamScore: rawSpamScore,
      category: rawCategory,
      niche: rawCategory,
      linkType: rawLinkType,
      sampleLink: rawSampleLink,
      country: rawCountry,
      countryFlag: flag,
      contentPlacementPrice: rawContentPlacementPrice,
      price: rawContentPlacementPrice,
      linkInsertPrice: rawLinkInsertPrice,
      cbdContentPlacementPrice: rawCbdPlacementPrice,
      cbdContentCreationPlacementPrice: rawCbdCreationPlacementPrice,
      cbdLinkInsertPrice: rawCbdLinkInsertPrice,
      adultContentPlacementPrice: rawAdultPlacementPrice,
      adultContentCreationPlacementPrice: rawAdultCreationPlacementPrice,
      adultLinkInsertPrice: rawAdultLinkInsertPrice,
      indexable: isIndexable,
      sponsored: isSponsored,
      logoUrl: resolvedLogo,
      addedByAdmin: true,
    };
  });
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
