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
  isp?: string;
}

// In-Memory cache for resolved IPs
const ipCache = new Map<string, Partial<GeolocationData>>();

/**
 * High-accuracy IP Geolocation Resolver
 * Resolves any public IP (like 49.36.237.85 or 223.185.17.13) into exact Country, City, Region, Lat/Lon, and Map link
 */
export async function resolveIpGeolocation(ip?: string): Promise<Partial<GeolocationData>> {
  if (!ip || ip === "unknown") return {};
  const cleanIp = ip.replace(/^::ffff:/, "").trim();

  // Local dev fallback
  if (cleanIp === "127.0.0.1" || cleanIp === "::1" || cleanIp.startsWith("192.168.") || cleanIp.startsWith("10.")) {
    return {
      clientIp: cleanIp,
      country: "India",
      countryCode: "IN",
      countryFlag: "🇮🇳",
      city: "Jaipur",
      region: "Rajasthan",
      latitude: "26.9124",
      longitude: "75.7873",
      mapsUrl: "https://www.google.com/maps?q=26.9124,75.7873",
      locationSummary: "Jaipur, Rajasthan, India 🇮🇳",
    };
  }

  if (ipCache.has(cleanIp)) {
    return ipCache.get(cleanIp)!;
  }

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 2200);

    const res = await fetch(`http://ip-api.com/json/${cleanIp}?fields=status,country,countryCode,regionName,city,lat,lon,timezone,isp`, {
      signal: controller.signal,
    });
    clearTimeout(timer);

    if (res.ok) {
      const data = await res.json();
      if (data.status === "success") {
        const countryCode = data.countryCode || "IN";
        const country = data.country || getCountryName(countryCode);
        const countryFlag = getCountryFlag(countryCode);
        const city = data.city || "";
        const region = data.regionName || "";
        const latitude = data.lat;
        const longitude = data.lon;
        const mapsUrl = latitude && longitude ? `https://www.google.com/maps?q=${latitude},${longitude}` : "";
        const locationSummary = `${city ? `${city}, ` : ""}${region ? `${region}, ` : ""}${country} ${countryFlag}`;

        const resolved: Partial<GeolocationData> = {
          clientIp: cleanIp,
          country,
          countryCode,
          countryFlag,
          city,
          region,
          latitude,
          longitude,
          timezone: data.timezone,
          mapsUrl,
          locationSummary,
          isp: data.isp,
        };

        ipCache.set(cleanIp, resolved);
        return resolved;
      }
    }
  } catch (err) {
    console.warn(`[resolveIpGeolocation] Error resolving ${cleanIp}:`, err);
  }

  return {};
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
  const rawCountryCode = vercelCountry || bodyGeo?.countryCode || "";
  const countryCode = rawCountryCode ? rawCountryCode.toUpperCase() : (clientIp === "127.0.0.1" ? "IN" : "");
  const country = bodyGeo?.country && bodyGeo.country !== "Unknown Country" ? bodyGeo.country : (countryCode ? getCountryName(countryCode) : "India");
  const countryFlag = countryCode ? getCountryFlag(countryCode) : "🇮🇳";

  // Determine City & Region
  const city = decodeURIComponent(vercelCity || (bodyGeo?.city as string) || "");
  const region = decodeURIComponent(vercelRegion || (bodyGeo?.region as string) || "");

  // Determine Coordinates
  const latitude = vercelLat || bodyGeo?.latitude || undefined;
  const longitude = vercelLon || bodyGeo?.longitude || undefined;
  const timezone = vercelTimezone || bodyGeo?.timezone || "Asia/Kolkata";

  // Google Maps link
  let mapsUrl = "";
  if (latitude && longitude && String(latitude) !== "0" && String(longitude) !== "0") {
    mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
  } else if (city && country) {
    mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${city}, ${country}`)}`;
  } else if (clientIp && clientIp !== "127.0.0.1") {
    mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${country || "India"}`)}`;
  }

  // Location summary
  let locationSummary = "";
  if (city) {
    locationSummary = `${city}, ${country} ${countryFlag}`;
  } else if (country) {
    locationSummary = `${country} ${countryFlag}`;
  } else {
    locationSummary = `India 🇮🇳 (IP: ${clientIp})`;
  }

  return {
    clientIp,
    country,
    countryCode: countryCode || "IN",
    countryFlag,
    city: city || "Jaipur",
    region: region || "Rajasthan",
    latitude,
    longitude,
    timezone,
    mapsUrl,
    locationSummary,
  };
}

/**
 * Async Full Geolocation Resolver for incoming requests (with IP lookup fallback)
 */
export async function resolveGeoForRequest(req: Request, bodyGeo?: Partial<GeolocationData>): Promise<GeolocationData> {
  const syncGeo = extractGeoFromRequest(req, bodyGeo);

  // If city is default/unknown or IP lookup needed, resolve via IP
  if (syncGeo.clientIp && syncGeo.clientIp !== "127.0.0.1" && syncGeo.clientIp !== "::1") {
    const resolved = await resolveIpGeolocation(syncGeo.clientIp);
    if (resolved.country) {
      return {
        ...syncGeo,
        ...resolved,
        locationSummary: resolved.locationSummary || syncGeo.locationSummary,
        mapsUrl: resolved.mapsUrl || syncGeo.mapsUrl,
      } as GeolocationData;
    }
  }

  return syncGeo;
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
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500);

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
        isp: data.org,
      };

      try {
        sessionStorage.setItem("nova_live_geo", JSON.stringify(geo));
      } catch {}

      return geo;
    }
  } catch {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return { timezone: tz };
    } catch {}
  }

  return {};
}
