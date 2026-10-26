// Shared Normalization Helper for Publisher Spreadsheets (Runs both in Browser and Node.js)

export interface NormalizedSite {
  id: string;
  domain: string;
  da: number;
  pa: number;
  dr: number;
  traffic: string;
  ahrefsTraffic?: string;
  semrushScore: string | number;
  spamScore: string | number;
  category: string;
  niche: string;
  linkType: "DoFollow" | "NoFollow" | "Contextual" | string;
  sampleLink: string;
  country: string;
  countryFlag: string;
  contentPlacementPrice: number;
  price: number;
  linkInsertPrice: number;
  cbdContentPlacementPrice: number;
  cbdContentCreationPlacementPrice: number;
  cbdLinkInsertPrice: number;
  adultContentPlacementPrice: number;
  adultContentCreationPlacementPrice: number;
  adultLinkInsertPrice: number;
  indexable: boolean;
  sponsored: boolean;
  logoUrl: string;
  addedByAdmin?: boolean;
}

export function normalizeSpreadsheetRows(rows: any[]): NormalizedSite[] {
  if (!Array.isArray(rows)) return [];

  return rows.map((row, idx) => {
    // Find matching keys case-insensitively with flexible space/underscore support
    const getVal = (possibleKeys: string[], defaultVal: any = ""): any => {
      if (!row || typeof row !== "object") return defaultVal;
      const rowKeys = Object.keys(row);
      for (const pk of possibleKeys) {
        const cleanPk = pk.toLowerCase().replace(/[^a-z0-9]/g, "");
        const found = rowKeys.find((rk) => {
          const cleanRk = rk.toLowerCase().replace(/[^a-z0-9]/g, "");
          return cleanRk === cleanPk;
        });
        if (
          found !== undefined &&
          row[found] !== undefined &&
          row[found] !== null &&
          String(row[found]).trim() !== ""
        ) {
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

    const rawTraffic = String(
      getVal(["traffic", "ahrefs traffic", "monthly traffic", "organic traffic", "visits", "semrush traffic"], "100,000+")
    );
    const rawSemrushScore = String(getVal(["semrush score", "semrush_score", "semrush", "authority score", "as"], "—"));
    const rawSpamScore = String(getVal(["spam score", "spam_score", "spam", "ss"], "1%"));
    const rawCategory = String(getVal(["category", "niche", "industry", "topic"], "General"));
    const rawLinkType = String(getVal(["link type", "linktype", "link_type", "type"], "DoFollow"));
    const rawSampleLink = String(getVal(["sample link", "sample_link", "sample url", "sample_url", "sample", "example", "live link"], ""));
    const rawCountry = String(getVal(["country", "geo", "location", "target country"], "Worldwide"));

    // Standard Pricing (Defaults to 0 if not provided)
    const rawContentPlacementPrice = parseNum(
      getVal(["content placement price", "content_placement_price", "placement price", "guest post price", "price", "cost", "rate", "usd"], 0),
      0
    );
    const rawLinkInsertPrice = parseNum(
      getVal(["link insert price", "link_insert_price", "link insertion price", "link insertion", "link insert"], 0),
      0
    );

    // CBD Pricing (Strictly defaults to 0! NO fake multipliers!)
    const rawCbdPlacementPrice = parseNum(
      getVal(["cbd content placement price", "cbd_content_placement_price", "cbd placement price", "cbd price"], 0),
      0
    );
    const rawCbdCreationPlacementPrice = parseNum(
      getVal(["cbd content creation & placement price", "cbd content creation and placement price", "cbd_content_creation_placement_price", "cbd content creation placement"], 0),
      0
    );
    const rawCbdLinkInsertPrice = parseNum(
      getVal(["cbd link insert price", "cbd_link_insert_price", "cbd link insertion price", "cbd link insert"], 0),
      0
    );

    // Adult Pricing (Strictly defaults to 0! NO fake multipliers!)
    const rawAdultPlacementPrice = parseNum(
      getVal(["adult content placement price", "adult_content_placement_price", "adult placement price", "adult price"], 0),
      0
    );
    const rawAdultCreationPlacementPrice = parseNum(
      getVal(["adult content creation & placement price", "adult content creation and placement price", "adult_content_creation_placement_price", "adult content creation placement"], 0),
      0
    );
    const rawAdultLinkInsertPrice = parseNum(
      getVal(["adult link insert price", "adult_link_insert_price", "adult link insertion price", "adult link insert"], 0),
      0
    );

    // Indexable & Sponsored
    const indexableVal = String(getVal(["indexable", "google indexable", "indexed", "index"], "Yes"));
    const isIndexable = !indexableVal.toLowerCase().includes("no") && !indexableVal.toLowerCase().includes("false");

    const sponsoredVal = String(getVal(["sponsored", "sponsored tag", "is sponsored", "sponsored_tag"], "No"));
    const isSponsored = sponsoredVal.toLowerCase().includes("yes") || sponsoredVal.toLowerCase().includes("true");

    // Logo / Favicon URL
    const rawLogoUrl = String(getVal(["logo_url", "logo url", "logo", "image", "icon", "favicon"], ""));
    const resolvedLogo = rawLogoUrl.trim()
      ? rawLogoUrl.trim()
      : `https://www.google.com/s2/favicons?domain=${rawDomain}&sz=128`;

    let flag = "🌐";
    const cLower = rawCountry.toLowerCase();
    if (cLower.includes("us") || cLower.includes("united states") || cLower.includes("america")) flag = "🇺🇸";
    else if (cLower.includes("uk") || cLower.includes("united kingdom") || cLower.includes("britain")) flag = "🇬🇧";
    else if (cLower.includes("canada")) flag = "🇨🇦";
    else if (cLower.includes("australia")) flag = "🇦🇺";
    else if (cLower.includes("india")) flag = "🇮🇳";

    return {
      id: `site-${Date.now()}-${idx}-${Math.random().toString(36).slice(2, 6)}`,
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
