// Universal Geolocation & Live Visitor Tracking Engine
// Detects Country, City, Region, Coordinates, IP, and Flag across Vercel, Proxies, and Client Browser

const COUNTRY_NAMES: Record<string, string> = {
  IN: "India",
  US: "United States",
  GB: "United Kingdom",
  CA: "Canada",
  AU: "Australia",
  AE: "United Arab Emirates",
  SG: "Singapore",
  DE: "Germany",
  FR: "France",
  IT: "Italy",
  ES: "Spain",
  NL: "Netherlands",
  PK: "Pakistan",
  BD: "Bangladesh",
  BR: "Brazil",
  ZA: "South Africa",
  NG: "Nigeria",
  PH: "Philippines",
  ID: "Indonesia",
  MY: "Malaysia",
  SA: "Saudi Arabia",
  QA: "Qatar",
  KW: "Kuwait",
  OM: "Oman",
  NZ: "New Zealand",
  IE: "Ireland",
  CH: "Switzerland",
  SE: "Sweden",
  NO: "Norway",
  DK: "Denmark",
  JP: "Japan",
  KR: "South Korea",
  CN: "China",
  RU: "Russia",
  TR: "Turkey",
  EG: "Egypt",
  MX: "Mexico",
  AR: "Argentina",
  CL: "Chile",
  CO: "Colombia",
};

export function getCountryFlag(countryCode?: string): string {
  if (!countryCode || countryCode.length !== 2) return "🌐";
  try {
    const code = countryCode.toUpperCase();
    return String.fromCodePoint(...[...code].map((c) => 127397 + c.charCodeAt(0)));
  } catch {
    return "🌐";
  }
}

export function getCountryName(countryCode?: string): string {
  if (!countryCode) return "Unknown Country";
  const code = countryCode.toUpperCase();
  if (COUNTRY_NAMES[code]) return COUNTRY_NAMES[code];
  try {
    const displayName = new Intl.DisplayNames(["en"], { type: "region" }).of(code);
    return displayName || code;
  } catch {
    return code;
  }
}

export interface GeolocationData {
  clientIp: string;
  country: string;
  countryCode: string;
  countryFlag: string;
  city: string;
  region: string;
  latitude?: string | number;
  longitude?: string | number;
  timezone?: string;
  mapsUrl?: string;
  locationSummary: string;
}

/**
 * Server-Side: Extract high-precision location from Vercel / Cloudflare headers and client fallback
 */
export function extractGeoFromRequest(req: Request, bodyGeo?: Partial<GeolocationData>): GeolocationData {
  const headers = req.headers;

  // 1. IP extraction
  const rawIp =
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    bodyGeo?.clientIp ||
    "127.0.0.1";
  
  const clientIp = rawIp.replace(/^::ffff:/, "");

  // 2. Vercel & Cloudflare Edge Geolocation Headers
  const vercelCountry = headers.get("x-vercel-ip-country") || headers.get("cf-ipcountry");
  const vercelRegion = headers.get("x-vercel-ip-country-region");
  const vercelCity = headers.get("x-vercel-ip-city");
  const vercelLat = headers.get("x-vercel-ip-latitude");
  const vercelLon = headers.get("x-vercel-ip-longitude");
  const vercelTimezone = headers.get("x-vercel-ip-timezone");

  // Determine Country Code
  const countryCode = (vercelCountry || bodyGeo?.countryCode || (clientIp === "127.0.0.1" ? "IN" : "US")).toUpperCase();
  const country = bodyGeo?.country && bodyGeo.country !== "Unknown Country" ? bodyGeo.country : getCountryName(countryCode);
  const countryFlag = getCountryFlag(countryCode);

  // Determine City & Region
  const city = decodeURIComponent(vercelCity || (bodyGeo?.city as string) || "Unknown City");
  const region = decodeURIComponent(vercelRegion || (bodyGeo?.region as string) || "Unknown Region");

  // Determine Coordinates
  const latitude = vercelLat || bodyGeo?.latitude || undefined;
  const longitude = vercelLon || bodyGeo?.longitude || undefined;
  const timezone = vercelTimezone || bodyGeo?.timezone || "UTC";

  // Google Maps link if coordinates available
  let mapsUrl = "";
  if (latitude && longitude && String(latitude) !== "0" && String(longitude) !== "0") {
    mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
  } else if (city !== "Unknown City" && country !== "Unknown Country") {
    mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${city}, ${country}`)}`;
  }

  // Concise location summary
  let locationSummary = "";
  if (city !== "Unknown City") {
    locationSummary = `${city}, ${country} ${countryFlag}`;
  } else if (country !== "Unknown Country") {
    locationSummary = `${country} ${countryFlag}`;
  } else {
    locationSummary = `IP: ${clientIp}`;
  }

  return {
    clientIp,
    country,
    countryCode,
    countryFlag,
    city,
    region,
    latitude,
    longitude,
    timezone,
    mapsUrl,
    locationSummary,
  };
}

/**
 * Client-Side: Fast, cached live visitor location detection in browser
 */
export async function getClientLiveLocation(): Promise<Partial<GeolocationData>> {
  if (typeof window === "undefined") return {};

  try {
    const cached = sessionStorage.getItem("nova_live_geo");
    if (cached) {
      return JSON.parse(cached);
    }
  } catch {}

  try {
    // Fast timeout of 1.2 seconds so it never lags user actions
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1200);

    const res = await fetch("https://ipapi.co/json/", { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const countryCode = data.country_code || data.country || "IN";
      const geo: Partial<GeolocationData> = {
        clientIp: data.ip || "",
        country: data.country_name || getCountryName(countryCode),
        countryCode,
        countryFlag: getCountryFlag(countryCode),
        city: data.city || "",
        region: data.region || "",
        latitude: data.latitude,
        longitude: data.longitude,
        timezone: data.timezone || "",
        mapsUrl: data.latitude && data.longitude ? `https://www.google.com/maps?q=${data.latitude},${data.longitude}` : "",
        locationSummary: `${data.city ? `${data.city}, ` : ""}${data.country_name || countryCode} ${getCountryFlag(countryCode)}`,
      };

      try {
        sessionStorage.setItem("nova_live_geo", JSON.stringify(geo));
      } catch {}

      return geo;
    }
  } catch {
    // If external service fails, return browser timezone fallback
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return { timezone: tz };
    } catch {}
  }

  return {};
}
