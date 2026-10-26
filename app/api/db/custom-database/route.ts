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
      if (val === undefined || val === null || val === "") return defaultNum;
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
    const rawPa = parseNum(getVal(["pa", "moz pa", "moz_pa", "page authority"], 40), 40);

    const rawTraffic = String(getVal(["traffic", "ahrefs traffic", "monthly traffic", "organic traffic", "visits", "semrush traffic"], "50,000+"));
    const rawSemrushScore = String(getVal(["semrush score", "semrush_score", "semrush", "authority score", "as"], "—"));
    const rawSpamScore = String(getVal(["spam score", "spam_score", "spam", "ss"], "1%"));
    const rawCategory = String(getVal(["category", "niche", "industry", "topic"], "General"));
    const rawLinkType = String(getVal(["link type", "linktype", "link_type", "type"], "DoFollow"));
    const rawSampleLink = String(getVal(["sample link", "sample_link", "sample url", "sample_url", "sample", "example", "live link"], ""));
    const rawCountry = String(getVal(["country", "geo", "location", "target country"], "Worldwide"));

    // Standard Pricing
    const rawContentPlacementPrice = parseNum(getVal(["content placement price", "content_placement_price", "placement price", "guest post price", "price", "cost", "rate", "usd"], 150), 150);
    const rawLinkInsertPrice = parseNum(getVal(["link insert price", "link_insert_price", "link insertion price", "link insertion", "link insert"], Math.round(rawContentPlacementPrice * 0.7)), Math.round(rawContentPlacementPrice * 0.7));

    // CBD Pricing
    const rawCbdPlacementPrice = parseNum(getVal(["cbd content placement price", "cbd_content_placement_price", "cbd placement price", "cbd price"], Math.round(rawContentPlacementPrice * 1.3)), Math.round(rawContentPlacementPrice * 1.3));
    const rawCbdCreationPlacementPrice = parseNum(getVal(["cbd content creation & placement price", "cbd content creation and placement price", "cbd_content_creation_placement_price", "cbd content creation placement"], Math.round(rawCbdPlacementPrice + 40)), Math.round(rawCbdPlacementPrice + 40));
    const rawCbdLinkInsertPrice = parseNum(getVal(["cbd link insert price", "cbd_link_insert_price", "cbd link insertion price", "cbd link insert"], Math.round(rawLinkInsertPrice * 1.25)), Math.round(rawLinkInsertPrice * 1.25));

    // Adult Pricing
    const rawAdultPlacementPrice = parseNum(getVal(["adult content placement price", "adult_content_placement_price", "adult placement price", "adult price"], Math.round(rawContentPlacementPrice * 1.5)), Math.round(rawContentPlacementPrice * 1.5));
    const rawAdultCreationPlacementPrice = parseNum(getVal(["adult content creation & placement price", "adult content creation and placement price", "adult_content_creation_placement_price", "adult content creation placement"], Math.round(rawAdultPlacementPrice + 45)), Math.round(rawAdultPlacementPrice + 45));
    const rawAdultLinkInsertPrice = parseNum(getVal(["adult link insert price", "adult_link_insert_price", "adult link insertion price", "adult link insert"], Math.round(rawLinkInsertPrice * 1.4)), Math.round(rawLinkInsertPrice * 1.4));

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
    else if (cLower.includes("germany")) flag = "🇩🇪";
    else if (cLower.includes("france")) flag = "🇫🇷";

    return {
      id: `custom-pub-${idx + 1}-${Date.now().toString(36)}`,
      domain: rawDomain,
      da: Math.min(100, Math.max(1, rawDa)),
      pa: Math.min(100, Math.max(1, rawPa)),
      dr: Math.min(100, Math.max(1, rawDr)),
      traffic: rawTraffic.includes("+") || rawTraffic.includes(",") || rawTraffic.toLowerCase().includes("traffic") ? rawTraffic : `${Number(rawTraffic).toLocaleString()}+`,
      ahrefsTraffic: rawTraffic,
      semrushScore: rawSemrushScore,
      spamScore: rawSpamScore.includes("%") ? rawSpamScore : `${rawSpamScore}%`,
      category: rawCategory,
      niche: rawCategory,
      linkType: rawLinkType.toLowerCase().includes("no") ? "NoFollow" : rawLinkType.toLowerCase().includes("context") ? "Contextual" : "DoFollow",
      sampleLink: rawSampleLink.startsWith("http") ? rawSampleLink : (rawSampleLink ? `https://${rawSampleLink}` : ""),
      country: rawCountry,
      countryFlag: flag,
      language: "English",
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
      sponsoredTag: isSponsored,
      logoUrl: resolvedLogo,
      tatDays: 2,
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
