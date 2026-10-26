"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { INITIAL_PUBLISHERS } from "../data/publishersData";

interface BuyerSession {
  email: string;
  phone: string;
}

export interface RealWebsiteSite {
  id?: string;
  domain: string;
  da: number;
  pa?: number;
  dr: number;
  traffic?: string;
  ahrefsTraffic?: string;
  semrushScore?: string | number;
  spamScore?: string | number;
  category?: string;
  niche?: string;
  linkType: "DoFollow" | "NoFollow" | "Contextual" | string;
  sampleLink?: string;
  sampleUrl?: string;
  country: string;
  countryFlag?: string;
  contentPlacementPrice?: number;
  price?: number;
  linkInsertPrice?: number;
  cbdContentPlacementPrice?: number;
  cbdContentCreationPlacementPrice?: number;
  cbdLinkInsertPrice?: number;
  adultContentPlacementPrice?: number;
  adultContentCreationPlacementPrice?: number;
  adultLinkInsertPrice?: number;
  indexable?: boolean | string;
  sponsored?: boolean | string;
  sponsoredTag?: boolean;
  logoUrl?: string;
  addedByAdmin?: boolean;
}

export default function BuyerDashboardPage() {
  const [buyerUser, setBuyerUser] = useState<BuyerSession | null>(null);
  const [, setAuthChecked] = useState(false);

  // Authentication Modal (if visitor visits dashboard without login)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isPendingDownload, setIsPendingDownload] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [authEmail, setAuthEmail] = useState("");
  const [authPhone, setAuthPhone] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);

  // FAST PAGINATED SITES STATE (Zero Memory Hang: Only 25 items in RAM)
  const [paginatedSites, setPaginatedSites] = useState<RealWebsiteSite[]>(() =>
    INITIAL_PUBLISHERS.slice(0, 25) as unknown as RealWebsiteSite[]
  );
  const [totalMatchingSites, setTotalMatchingSites] = useState<number>(32175);
  const [totalPages, setTotalPages] = useState<number>(Math.ceil(32175 / 25));
  const [directDownloadUrl, setDirectDownloadUrl] = useState<string>("/nova_growth_40000_guest_posts.xlsx");
  const [isLoadingDb, setIsLoadingDb] = useState(false);

  // Detailed Pricing Modal for a selected site
  const [pricingModalSite, setPricingModalSite] = useState<RealWebsiteSite | null>(null);

  // Search, Filters & Pagination
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLinkType, setSelectedLinkType] = useState("All");
  const [minDr, setMinDr] = useState("");
  const [sortField, setSortField] = useState<"dr" | "da" | "pa" | "price" | "domain">("dr");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Notification Toast
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  // Helper: Live Geolocation Tracker for Downloads & Logins
  const getClientLiveLocation = async () => {
    try {
      const navGeo = await new Promise<{ lat?: number; lon?: number }>((resolve) => {
        if (typeof window !== "undefined" && "geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
            () => resolve({}),
            { timeout: 2500 }
          );
        } else {
          resolve({});
        }
      });
      return {
        latitude: navGeo.lat,
        longitude: navGeo.lon,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        userAgent: typeof window !== "undefined" ? navigator.userAgent : "",
      };
    } catch {
      return {};
    }
  };

  // Check login session on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("nova_buyer_session");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.email) {
          setBuyerUser(parsed);
        } else {
          setIsAuthModalOpen(true);
        }
      } else {
        setIsAuthModalOpen(true);
      }
    } catch {
      setIsAuthModalOpen(true);
    }
    setAuthChecked(true);
  }, []);

  const fetchWebsites = useCallback(async () => {
    setIsLoadingDb(true);
    try {
      const query = new URLSearchParams({
        page: String(currentPage),
        pageSize: String(pageSize),
        search: search.trim(),
        category: selectedCategory,
        linkType: selectedLinkType,
        minDr: minDr,
        sortField: sortField,
        sortOrder: sortOrder,
      });

      const res = await fetch(`/api/db/custom-database?${query.toString()}`);
      if (!res.ok) throw new Error("Fetch failed");
      const data = await res.json();

      if (data.success) {
        if (Array.isArray(data.sites)) {
          setPaginatedSites(data.sites);
        }
        if (typeof data.total === "number") {
          setTotalMatchingSites(data.total);
          setTotalPages(Math.max(1, Math.ceil(data.total / pageSize)));
        }
        if (data.directDownloadUrl) {
          setDirectDownloadUrl(data.directDownloadUrl);
        }
      }
    } catch (err) {
      console.warn("Fast query error:", err);
    } finally {
      setIsLoadingDb(false);
    }
  }, [currentPage, pageSize, search, selectedCategory, selectedLinkType, minDr, sortField, sortOrder]);

  // Debounced auto-fetch on filter or search change (120ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchWebsites();
    }, 120);
    return () => clearTimeout(timer);
  }, [fetchWebsites]);

  const handleLogout = () => {
    try {
      localStorage.removeItem("nova_buyer_session");
    } catch {}
    setBuyerUser(null);
    window.location.href = "/guest-posting";
  };

  const handleInlineAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    const cleanEmail = authEmail.trim().toLowerCase();
    const cleanPhone = authPhone.trim();

    if (!cleanEmail) {
      setAuthError("Email address is required.");
      return;
    }
    if (authMode === "signup" && !cleanPhone) {
      setAuthError("Mobile / WhatsApp number is required.");
      return;
    }
    if (!authPassword) {
      setAuthError("Password is required.");
      return;
    }

    const userRecord: BuyerSession = {
      email: cleanEmail,
      phone: cleanPhone || "Not specified",
    };

    try {
      localStorage.setItem("nova_buyer_session", JSON.stringify(userRecord));
      setBuyerUser(userRecord);

      const clientGeo = await getClientLiveLocation();

      // 1. Record Lead in Database
      await fetch("/api/db/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: authMode === "login" ? "buyer_login" : "buyer_account_registration",
          name: cleanEmail.split("@")[0],
          email: cleanEmail,
          phone: cleanPhone || "Not provided",
          service: authMode === "login" ? "Database Access (User Login)" : "40,000+ Guest Post Database Access",
          message:
            authMode === "login"
              ? `User logged in with Login ID to view/export publisher database & live pricing. (Login ID: ${cleanEmail})`
              : `New buyer registered with Login ID to access 40,000+ database. (Login ID: ${cleanEmail})`,
          notes: `Login Mode: ${authMode.toUpperCase()} | Timestamp: ${new Date().toLocaleString()}`,
          clientGeo,
        }),
      });

      // 2. Also log real-time interaction for live location tracker & activity logs
      await fetch("/api/db/interactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "buyer_login",
          action: "login",
          name: cleanEmail.split("@")[0],
          email: cleanEmail,
          phone: cleanPhone || "",
          title: authMode === "login" ? `Database User Login: ${cleanEmail}` : `New Buyer Registered: ${cleanEmail}`,
          details: `User logged in to view 40,000+ publisher database directory & live pricing. Mode: ${authMode}.`,
          clientGeo,
        }),
      }).catch((e) => console.error("Interaction log error:", e));

      setIsAuthModalOpen(false);
      showToast(authMode === "login" ? `Welcome back, ${cleanEmail}!` : `Account created! Welcome, ${cleanEmail}!`);

      if (isPendingDownload) {
        setIsPendingDownload(false);
        executeDownload(userRecord);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Popular Categories for Fast Dropdown (Zero Lag: Avoids 2,000+ DOM option freeze)
  const POPULAR_CATEGORIES = [
    "All",
    "News and Media",
    "Technology",
    "SaaS & Tech",
    "Business & Startup",
    "Finance & Investment",
    "Crypto & Blockchain",
    "Digital Marketing & SEO",
    "E-Commerce & Retail",
    "Health & Medical",
    "Fitness & Sports",
    "Education & Careers",
    "Travel & Hospitality",
    "Fashion & Lifestyle",
    "Home & Real Estate",
    "Automotive",
    "Gaming & Entertainment",
    "Law & Legal",
    "Food & Beverage",
    "General",
  ];

  const categoriesList = POPULAR_CATEGORIES;
  const displayedSites = paginatedSites;
  const filteredAndSortedSites = paginatedSites;

  // Handle Order Post Click (Sends to WhatsApp 8000417058 & logs order to Admin CRM)
  const handleOrderPost = (site: RealWebsiteSite, selectedType?: string, selectedPrice?: number) => {
    const userEmail = buyerUser?.email || "Guest Visitor";
    const userPhone = buyerUser?.phone || "Not specified";
    const chosenPrice = selectedPrice ?? (site.contentPlacementPrice || site.price || 0);
    const chosenType = selectedType || "Standard Content Placement";

    // Build only rates that are active (> 0)
    const availableRates: string[] = [];
    if (site.contentPlacementPrice || site.price) {
      availableRates.push(`• Standard Content Placement: $${site.contentPlacementPrice || site.price} USD`);
    }
    if (site.linkInsertPrice && site.linkInsertPrice > 0) {
      availableRates.push(`• Link Insert Price: $${site.linkInsertPrice} USD`);
    }
    if (site.cbdContentPlacementPrice && site.cbdContentPlacementPrice > 0) {
      availableRates.push(`• CBD Content Placement: $${site.cbdContentPlacementPrice} USD`);
    }
    if (site.cbdContentCreationPlacementPrice && site.cbdContentCreationPlacementPrice > 0) {
      availableRates.push(`• CBD Creation & Placement: $${site.cbdContentCreationPlacementPrice} USD`);
    }
    if (site.cbdLinkInsertPrice && site.cbdLinkInsertPrice > 0) {
      availableRates.push(`• CBD Link Insert: $${site.cbdLinkInsertPrice} USD`);
    }
    if (site.adultContentPlacementPrice && site.adultContentPlacementPrice > 0) {
      availableRates.push(`• Adult Content Placement: $${site.adultContentPlacementPrice} USD`);
    }
    if (site.adultContentCreationPlacementPrice && site.adultContentCreationPlacementPrice > 0) {
      availableRates.push(`• Adult Creation & Placement: $${site.adultContentCreationPlacementPrice} USD`);
    }
    if (site.adultLinkInsertPrice && site.adultLinkInsertPrice > 0) {
      availableRates.push(`• Adult Link Insert: $${site.adultLinkInsertPrice} USD`);
    }

    const msg = [
      `*New Guest Post Order Inquiry - Nova Growth*`,
      ``,
      `*Website Domain:* ${site.domain}`,
      `*Service Required:* ${chosenType}`,
      `*Price:* $${chosenPrice} USD`,
      `*Niche Category:* ${site.category || site.niche || "General"}`,
      `*SEO Metrics:* Ahrefs DR ${site.dr} | Moz DA ${site.da} | Moz PA ${site.pa || "N/A"}`,
      `*Traffic:* ${site.traffic || site.ahrefsTraffic || "100,000+"}`,
      `*Semrush Score:* ${site.semrushScore ?? "N/A"} | *Spam Score:* ${site.spamScore ?? "1%"}`,
      `*Link Type:* ${site.linkType || "DoFollow"}`,
      `*Target Country:* ${site.country || "Global"}`,
      site.sampleLink ? `*Sample Post URL:* ${site.sampleLink}` : ``,
      availableRates.length > 0 ? `` : ``,
      availableRates.length > 0 ? `*Offered Packages:*` : ``,
      ...availableRates,
      ``,
      `*Buyer Contact Details:*`,
      `• Email: ${userEmail}`,
      `• Mobile / WhatsApp: ${userPhone}`,
      ``,
      `Please confirm placement availability, content guidelines, and payment invoice.`
    ].filter(Boolean).join("\n");

    // Track order event in database so Admin sees exact order details
    getClientLiveLocation().then((clientGeo) => {
      fetch("/api/db/interactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "guest_post_order",
          action: "whatsapp",
          name: userEmail.split("@")[0] || "Buyer",
          clientName: userEmail.split("@")[0] || "Buyer",
          email: userEmail,
          phone: userPhone,
          service: `Order (${chosenType}): ${site.domain} ($${chosenPrice} USD)`,
          domain: site.domain,
          title: `Guest Post Order: ${site.domain} ($${chosenPrice} USD)`,
          details: `User ordered ${chosenType} for ${site.domain} ($${chosenPrice} USD). Contact sent to WhatsApp 8000417058.`,
          sourcePage: "/buyer-dashboard",
          clientGeo,
        }),
      }).catch(() => {});

      fetch("/api/db/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "guest_post_order",
          name: userEmail.split("@")[0] || "Buyer",
          email: userEmail,
          phone: userPhone,
          service: `Order (${chosenType}): ${site.domain} ($${chosenPrice} USD)`,
          message: `Buyer placed order for ${site.domain} (${chosenType} - $${chosenPrice} USD). WhatsApp 8000417058.`,
          notes: `Domain: ${site.domain} | Price: $${chosenPrice} USD | Service: ${chosenType} | Category: ${site.category || site.niche} | DR: ${site.dr} | DA: ${site.da} | PA: ${site.pa || "N/A"}`,
          clientGeo,
        }),
      }).catch(() => {});
    });

    // Open WhatsApp directly with +91 8000417058
    const waUrl = `https://wa.me/918000417058?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, "_blank");
  };

  // Execute full 40,000+ Excel download & record user login ID in admin panel
  const executeDownload = (user: BuyerSession) => {
    // Track download lead in database so admin sees exact user who downloaded full 40,000 database
    getClientLiveLocation().then((clientGeo) => {
      // 1. Save directly into leads for admin panel CRM
      fetch("/api/db/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "database_download",
          name: user.email.split("@")[0] || "Buyer",
          email: user.email,
          phone: user.phone || "Not specified",
          service: "40,000+ Full Database Download (.xlsx)",
          message: `User entered Login ID (${user.email}) and downloaded the full 40,000+ publisher database (${totalMatchingSites.toLocaleString()} websites in XLSX format).`,
          notes: `Action: Full 40k Database Downloaded | Login ID: ${user.email} | Mobile: ${user.phone || "N/A"}`,
          clientGeo,
        }),
      }).catch((e) => console.error("Error logging download lead:", e));

      // 2. Also track in interactions table for live location map & activity feed
      fetch("/api/db/interactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "database_download",
          action: "download",
          name: user.email.split("@")[0] || "Buyer",
          email: user.email,
          phone: user.phone || "",
          title: `40,000+ Database Download: ${user.email}`,
          details: `User entered login credentials and downloaded full 40,000+ websites in Excel format.`,
          sourcePage: "/buyer-dashboard",
          clientGeo,
        }),
      }).catch(() => {});
    });

    // Secure authenticated download of full 40,000+ database (.xlsx) with rate limiting & anti-scraping
    try {
      const downloadUrl = `/api/download/database?email=${encodeURIComponent(user.email)}`;
      const downloadLink = document.createElement("a");
      downloadLink.href = downloadUrl;
      downloadLink.setAttribute("download", "nova_growth_40000_guest_posts.xlsx");
      downloadLink.target = "_blank";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      showToast(`✅ Securely downloading complete 40,000+ guest post database (.xlsx)!`);
    } catch (err) {
      console.error("Direct download error:", err);
      window.open(`/api/download/database?email=${encodeURIComponent(user.email)}`, "_blank");
    }
  };

  // Excel / CSV Download Handler with all 22 columns (Requires login so user is tracked)
  const handleDownloadExcel = () => {
    if (!buyerUser || !buyerUser.email) {
      setIsPendingDownload(true);
      setIsAuthModalOpen(true);
      showToast("🔐 Please enter your Login ID / Email to download the full 40,000+ database.");
      return;
    }
    executeDownload(buyerUser);
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-gray-100 flex flex-col font-sans">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-black font-extrabold px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom duration-200">
          <span>✅</span>
          <span>{toast}</span>
        </div>
      )}

      {/* TOP NAVIGATION / WORKSPACE HEADER */}
      <header className="border-b border-gray-800 bg-[#0b1220]/90 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-6 lg:px-10 py-3.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/guest-posting"
            className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors"
          >
            <span>←</span>
            <span className="hidden sm:inline">Back to Marketplace</span>
            <span className="sm:hidden">Back</span>
          </Link>
          <span className="text-gray-700">|</span>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h1 className="text-base sm:text-lg font-black text-white tracking-tight">
              Nova Growth Buyer Marketplace
            </h1>
          </div>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
          {/* Primary Download Excel Database Button */}
          <button
            type="button"
            onClick={handleDownloadExcel}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-black font-black text-xs shadow-lg shadow-emerald-500/20 transition-all hover:scale-102 active:scale-98 flex items-center gap-2 cursor-pointer"
          >
            <span>📥</span>
            <span className="hidden sm:inline">Download All 22-Col Database (.xlsx)</span>
            <span className="sm:hidden">Download (.xlsx)</span>
          </button>

          {buyerUser ? (
            <div className="flex items-center gap-2 pl-2 border-l border-gray-800">
              <div className="hidden md:flex flex-col text-right">
                <span className="text-xs font-bold text-white truncate max-w-[140px]">
                  {buyerUser.email}
                </span>
                <span className="text-[10px] text-emerald-400 font-medium">
                  {buyerUser.phone !== "Not specified" ? buyerUser.phone : "Active Member"}
                </span>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="px-2.5 py-1 text-xs text-gray-400 hover:text-white bg-gray-800/80 hover:bg-gray-700 rounded-lg cursor-pointer transition-colors"
                title="Log out of buyer session"
              >
                Log Out
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsAuthModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold cursor-pointer"
            >
              Sign In
            </button>
          )}
        </div>
      </header>

      {/* DASHBOARD HERO BANNER */}
      <div className="border-b border-gray-800 bg-gradient-to-b from-[#0e1726] to-[#070b14] px-4 sm:px-6 lg:px-10 py-7">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
              <span>⚡</span>
              <span>Direct Publisher Catalog & Live Rates</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Exclusive Publications Directory
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 max-w-2xl">
              Filter high-authority websites by Moz DA, Moz PA, Ahrefs DR, Semrush Score, Spam Score, and Country. Review real rates and order directly via WhatsApp or export the complete 22-column dataset.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-[#0b1220] border border-gray-800 p-3.5 rounded-2xl flex items-center gap-3 shadow-md">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl font-bold">
                🌐
              </div>
              <div>
                <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                  Live Sites
                </div>
                <div className="text-lg font-black text-white font-mono">
                  {isLoadingDb ? "..." : totalMatchingSites.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="bg-[#0b1220] border border-gray-800 p-3.5 rounded-2xl flex items-center gap-3 shadow-md">
              <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center text-xl font-bold">
                🎯
              </div>
              <div>
                <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                  Niches
                </div>
                <div className="text-lg font-black text-white font-mono">
                  {Math.max(1, categoriesList.length - 1)}
                </div>
              </div>
            </div>

            <div className="bg-[#0b1220] border border-gray-800 p-3.5 rounded-2xl flex items-center gap-3 shadow-md col-span-2 sm:col-span-1">
              <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center text-xl font-bold">
                📥
              </div>
              <div>
                <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                  Export 22 Cols
                </div>
                <button
                  type="button"
                  onClick={handleDownloadExcel}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 underline cursor-pointer text-left"
                >
                  Download .XLSX ↗
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-10 py-6 space-y-5">
        {/* FILTER & SEARCH BAR */}
        <div className="bg-[#0b1220] border border-gray-800 rounded-2xl p-4 shadow-xl space-y-3">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search websites by domain name, niche, category, or country..."
                className="w-full bg-[#070b14] border border-gray-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Dropdown */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 bg-[#070b14] border border-gray-700/80 rounded-xl px-3 py-1.5 text-xs">
                <span className="text-gray-400 text-[11px]">Niche:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer max-w-[150px] truncate"
                >
                  {categoriesList.map((cat) => (
                    <option key={cat} value={cat} className="bg-gray-900 text-white">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Link Type Filter */}
              <div className="flex items-center gap-1.5 bg-[#070b14] border border-gray-700/80 rounded-xl px-3 py-1.5 text-xs">
                <span className="text-gray-400 text-[11px]">Link:</span>
                <select
                  value={selectedLinkType}
                  onChange={(e) => {
                    setSelectedLinkType(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer"
                >
                  <option value="All" className="bg-gray-900 text-white">All Types</option>
                  <option value="DoFollow" className="bg-gray-900 text-white">DoFollow</option>
                  <option value="NoFollow" className="bg-gray-900 text-white">NoFollow</option>
                  <option value="Contextual" className="bg-gray-900 text-white">Contextual</option>
                </select>
              </div>

              {/* Min DR Filter */}
              <div className="flex items-center gap-1.5 bg-[#070b14] border border-gray-700/80 rounded-xl px-3 py-1.5 text-xs">
                <span className="text-gray-400 text-[11px]">Min DR:</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={minDr}
                  onChange={(e) => {
                    setMinDr(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="e.g. 50"
                  className="w-16 bg-transparent text-white font-semibold focus:outline-none text-xs"
                />
              </div>

              {/* Rows Per Page */}
              <div className="flex items-center gap-1.5 bg-[#070b14] border border-gray-700/80 rounded-xl px-3 py-1.5 text-xs">
                <span className="text-gray-400 text-[11px]">Show:</span>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer"
                >
                  <option value={25} className="bg-gray-900 text-white">25</option>
                  <option value={50} className="bg-gray-900 text-white">50</option>
                  <option value={100} className="bg-gray-900 text-white">100</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* WEBSITES DATA TABLE */}
        <div className="bg-[#0b1220] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse min-w-[1080px]">
              <thead>
                <tr className="bg-[#070b14] text-gray-400 font-bold uppercase text-[10px] tracking-wider border-b border-gray-800">
                  <th scope="col" className="py-3 px-3 w-10 text-center">#</th>
                  <th
                    scope="col"
                    className="py-3 px-4 cursor-pointer hover:text-white transition-colors min-w-[200px]"
                    onClick={() => {
                      if (sortField === "domain") setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                      else { setSortField("domain"); setSortOrder("asc"); }
                    }}
                  >
                    Website Domain {sortField === "domain" && (sortOrder === "asc" ? "▲" : "▼")}
                  </th>
                  <th scope="col" className="py-3 px-3">Category</th>
                  <th
                    scope="col"
                    className="py-3 px-2 text-center cursor-pointer hover:text-white transition-colors"
                    onClick={() => {
                      if (sortField === "da") setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                      else { setSortField("da"); setSortOrder("desc"); }
                    }}
                  >
                    DA {sortField === "da" && (sortOrder === "asc" ? "▲" : "▼")}
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-2 text-center cursor-pointer hover:text-white transition-colors"
                    onClick={() => {
                      if (sortField === "pa") setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                      else { setSortField("pa"); setSortOrder("desc"); }
                    }}
                  >
                    PA {sortField === "pa" && (sortOrder === "asc" ? "▲" : "▼")}
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-2 text-center cursor-pointer hover:text-white transition-colors"
                    onClick={() => {
                      if (sortField === "dr") setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                      else { setSortField("dr"); setSortOrder("desc"); }
                    }}
                  >
                    DR {sortField === "dr" && (sortOrder === "asc" ? "▲" : "▼")}
                  </th>
                  <th scope="col" className="py-3 px-3">Traffic</th>
                  <th scope="col" className="py-3 px-2 text-center">Semrush</th>
                  <th scope="col" className="py-3 px-2 text-center">Spam</th>
                  <th scope="col" className="py-3 px-3">Country</th>
                  <th scope="col" className="py-3 px-3">Link Type</th>
                  <th
                    scope="col"
                    className="py-3 px-3 cursor-pointer hover:text-white transition-colors"
                    onClick={() => {
                      if (sortField === "price") setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                      else { setSortField("price"); setSortOrder("asc"); }
                    }}
                  >
                    Pricing {sortField === "price" && (sortOrder === "asc" ? "▲" : "▼")}
                  </th>
                  <th scope="col" className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/80">
                {paginatedSites.length > 0 ? (
                  paginatedSites.map((site, idx) => {
                    const rowNumber = (currentPage - 1) * pageSize + idx + 1;
                    const standardPrice = site.contentPlacementPrice || site.price || 0;
                    const faviconUrl = site.logoUrl || `https://www.google.com/s2/favicons?domain=${site.domain}&sz=64`;
                    const hasSampleLink = Boolean(site.sampleLink || site.sampleUrl);
                    const sampleUrl = site.sampleLink || site.sampleUrl || "";

                    return (
                      <tr
                        key={site.id || site.domain + idx}
                        className="hover:bg-gray-800/30 transition-colors"
                      >
                        <td className="py-3 px-3 text-gray-500 text-[11px] font-mono text-center">
                          {rowNumber}
                        </td>
                        <td className="py-3 px-4 font-bold text-white">
                          <div className="flex items-center gap-2.5">
                            {/* Favicon Logo */}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={faviconUrl}
                              alt=""
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).style.display = "none";
                              }}
                              className="w-4 h-4 rounded-sm object-contain flex-shrink-0"
                            />
                            <div className="flex flex-col">
                              <span className="font-extrabold text-white text-xs">{site.domain}</span>
                              <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                                {hasSampleLink && (
                                  <a
                                    href={sampleUrl.startsWith("http") ? sampleUrl : `https://${sampleUrl}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[10px] text-blue-400 hover:text-blue-300 underline font-normal inline-flex items-center gap-0.5"
                                  >
                                    <span>🔗 Sample</span>
                                    <span>↗</span>
                                  </a>
                                )}
                                {site.indexable && (site.indexable === true || site.indexable === "Yes" || site.indexable === "true") && (
                                  <span className="px-1 py-0.2 rounded text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                                    Indexable
                                  </span>
                                )}
                                {site.sponsored && (site.sponsored === true || site.sponsored === "Yes" || site.sponsoredTag === true || site.sponsored === "true") && (
                                  <span className="px-1 py-0.2 rounded text-[9px] bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold">
                                    Sponsored
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-gray-300">
                          <span className="px-2.5 py-0.5 rounded-md bg-gray-800/80 border border-gray-700/60 text-[11px]">
                            {site.category || site.niche || "General"}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-center font-bold text-gray-200 font-mono">
                          {site.da}
                        </td>
                        <td className="py-3 px-2 text-center font-bold text-gray-300 font-mono">
                          {site.pa !== undefined && site.pa > 0 ? site.pa : "—"}
                        </td>
                        <td className="py-3 px-2 text-center font-extrabold text-amber-400 font-mono">
                          {site.dr}
                        </td>
                        <td className="py-3 px-3 font-mono text-emerald-400 font-bold text-[11px]">
                          {site.traffic || site.ahrefsTraffic || "100,000+"}
                        </td>
                        <td className="py-3 px-2 text-center font-mono text-cyan-400 font-semibold text-[11px]">
                          {site.semrushScore !== undefined && site.semrushScore !== "" && site.semrushScore !== "—" ? site.semrushScore : "—"}
                        </td>
                        <td className="py-3 px-2 text-center font-mono text-rose-300 text-[11px]">
                          {site.spamScore !== undefined && site.spamScore !== "" ? site.spamScore : "1%"}
                        </td>
                        <td className="py-3 px-3 text-gray-300">
                          <span className="inline-flex items-center gap-1.5">
                            <span>{site.countryFlag || "🌐"}</span>
                            <span>{site.country || "Worldwide"}</span>
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                            {site.linkType || "DoFollow"}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex flex-col">
                            {standardPrice > 0 ? (
                              <span className="font-black text-white font-mono text-xs">
                                ${standardPrice} <span className="text-[10px] text-gray-400 font-normal">USD</span>
                              </span>
                            ) : (
                              <span className="text-xs text-gray-400 font-mono font-medium">
                                Inquire for Price
                              </span>
                            )}
                            <button
                              type="button"
                              onClick={() => setPricingModalSite(site)}
                              className="text-[10px] text-amber-400 hover:text-amber-300 underline font-semibold mt-0.5 text-left cursor-pointer"
                            >
                              View All Rates ↗
                            </button>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => handleOrderPost(site)}
                            className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-black font-black text-[11px] shadow-sm transition-all inline-flex items-center gap-1 cursor-pointer"
                          >
                            <span>Order Post</span>
                            <span>↗</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={13} className="py-16 text-center text-gray-400">
                      <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center text-3xl mx-auto mb-3 shadow-lg">
                        🔍
                      </div>
                      <p className="font-extrabold text-white text-base">No Matching Publications Found</p>
                      <p className="text-xs text-gray-400 mt-1 max-w-md mx-auto">
                        Try resetting your search query, choosing a different category, or adjusting the DR filter.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setSearch("");
                          setSelectedCategory("All");
                          setSelectedLinkType("All");
                          setMinDr("");
                        }}
                        className="mt-4 px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-bold text-xs cursor-pointer border border-gray-700"
                      >
                        Reset All Filters
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* TABLE FOOTER & PAGINATION */}
          {displayedSites.length > 0 && (
            <div className="p-4 bg-[#070b14] border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
              <div>
                Showing <strong className="text-white">{totalMatchingSites > 0 ? (currentPage - 1) * pageSize + 1 : 0}</strong> to{" "}
                <strong className="text-white">{Math.min(currentPage * pageSize, totalMatchingSites)}</strong> of{" "}
                <strong className="text-emerald-400 font-mono">{totalMatchingSites.toLocaleString()}</strong> publications
              </div>

              {/* Pagination Controls */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-40 disabled:hover:bg-gray-800 text-white font-bold cursor-pointer transition-colors"
                >
                  Previous
                </button>
                <span className="text-xs px-2 text-gray-300">
                  Page <strong className="text-white">{currentPage}</strong> of <strong className="text-white">{totalPages}</strong>
                </span>
                <button
                  type="button"
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="px-3 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-40 disabled:hover:bg-gray-800 text-white font-bold cursor-pointer transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* DETAILED PRICING MODAL (Shows all Standard, CBD, Adult, Link Insertion rates) */}
      {pricingModalSite && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#0b1220] border border-gray-800 rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl space-y-5">
            <div className="flex items-start justify-between gap-4 border-b border-gray-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                    {pricingModalSite.domain}
                  </h3>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Ahrefs DR {pricingModalSite.dr} • Moz DA {pricingModalSite.da} • Moz PA {pricingModalSite.pa || "N/A"} • Traffic {pricingModalSite.traffic || pricingModalSite.ahrefsTraffic || "100,000+"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPricingModalSite(null)}
                className="w-8 h-8 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Rates Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto pr-1">
              {/* Standard Content Placement */}
              <div className="p-3.5 rounded-xl bg-[#070b14] border border-gray-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Content Placement</div>
                  <div className="text-[10px] text-gray-400">Standard Article Post</div>
                </div>
                <div className="flex items-center gap-2">
                  {pricingModalSite.contentPlacementPrice || pricingModalSite.price ? (
                    <>
                      <span className="text-sm font-black text-emerald-400 font-mono">
                        ${pricingModalSite.contentPlacementPrice || pricingModalSite.price}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          handleOrderPost(pricingModalSite, "Content Placement", pricingModalSite.contentPlacementPrice || pricingModalSite.price);
                          setPricingModalSite(null);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-[10px] font-black cursor-pointer"
                      >
                        Order
                      </button>
                    </>
                  ) : (
                    <span className="text-xs text-gray-500 font-mono font-medium">Not Offered (0)</span>
                  )}
                </div>
              </div>

              {/* Link Insert Price */}
              <div className="p-3.5 rounded-xl bg-[#070b14] border border-gray-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Link Insert Price</div>
                  <div className="text-[10px] text-gray-400">Existing Post Insertion</div>
                </div>
                <div className="flex items-center gap-2">
                  {pricingModalSite.linkInsertPrice && pricingModalSite.linkInsertPrice > 0 ? (
                    <>
                      <span className="text-sm font-black text-cyan-400 font-mono">
                        ${pricingModalSite.linkInsertPrice}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          handleOrderPost(pricingModalSite, "Link Insert", pricingModalSite.linkInsertPrice);
                          setPricingModalSite(null);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black text-[10px] font-black cursor-pointer"
                      >
                        Order
                      </button>
                    </>
                  ) : (
                    <span className="text-xs text-gray-500 font-mono font-medium">Not Offered (0)</span>
                  )}
                </div>
              </div>

              {/* CBD Content Placement */}
              <div className="p-3.5 rounded-xl bg-[#070b14] border border-gray-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">CBD Content Placement</div>
                  <div className="text-[10px] text-emerald-400">Cannabis / CBD Niche</div>
                </div>
                <div className="flex items-center gap-2">
                  {pricingModalSite.cbdContentPlacementPrice && pricingModalSite.cbdContentPlacementPrice > 0 ? (
                    <>
                      <span className="text-sm font-black text-amber-400 font-mono">
                        ${pricingModalSite.cbdContentPlacementPrice}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          handleOrderPost(pricingModalSite, "CBD Content Placement", pricingModalSite.cbdContentPlacementPrice);
                          setPricingModalSite(null);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-[10px] font-black cursor-pointer"
                      >
                        Order
                      </button>
                    </>
                  ) : (
                    <span className="text-xs text-gray-500 font-mono font-medium">Not Offered (0)</span>
                  )}
                </div>
              </div>

              {/* CBD Content Creation & Placement */}
              <div className="p-3.5 rounded-xl bg-[#070b14] border border-gray-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">CBD Creation & Placement</div>
                  <div className="text-[10px] text-emerald-400">Article Writing + Post</div>
                </div>
                <div className="flex items-center gap-2">
                  {pricingModalSite.cbdContentCreationPlacementPrice && pricingModalSite.cbdContentCreationPlacementPrice > 0 ? (
                    <>
                      <span className="text-sm font-black text-amber-400 font-mono">
                        ${pricingModalSite.cbdContentCreationPlacementPrice}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          handleOrderPost(pricingModalSite, "CBD Creation & Placement", pricingModalSite.cbdContentCreationPlacementPrice);
                          setPricingModalSite(null);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-[10px] font-black cursor-pointer"
                      >
                        Order
                      </button>
                    </>
                  ) : (
                    <span className="text-xs text-gray-500 font-mono font-medium">Not Offered (0)</span>
                  )}
                </div>
              </div>

              {/* CBD Link Insert Price */}
              <div className="p-3.5 rounded-xl bg-[#070b14] border border-gray-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">CBD Link Insert Price</div>
                  <div className="text-[10px] text-emerald-400">CBD Niche Edit</div>
                </div>
                <div className="flex items-center gap-2">
                  {pricingModalSite.cbdLinkInsertPrice && pricingModalSite.cbdLinkInsertPrice > 0 ? (
                    <>
                      <span className="text-sm font-black text-amber-400 font-mono">
                        ${pricingModalSite.cbdLinkInsertPrice}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          handleOrderPost(pricingModalSite, "CBD Link Insert", pricingModalSite.cbdLinkInsertPrice);
                          setPricingModalSite(null);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-[10px] font-black cursor-pointer"
                      >
                        Order
                      </button>
                    </>
                  ) : (
                    <span className="text-xs text-gray-500 font-mono font-medium">Not Offered (0)</span>
                  )}
                </div>
              </div>

              {/* Adult Content Placement */}
              <div className="p-3.5 rounded-xl bg-[#070b14] border border-gray-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Adult Content Placement</div>
                  <div className="text-[10px] text-rose-400">Adult / 18+ Niche</div>
                </div>
                <div className="flex items-center gap-2">
                  {pricingModalSite.adultContentPlacementPrice && pricingModalSite.adultContentPlacementPrice > 0 ? (
                    <>
                      <span className="text-sm font-black text-rose-400 font-mono">
                        ${pricingModalSite.adultContentPlacementPrice}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          handleOrderPost(pricingModalSite, "Adult Content Placement", pricingModalSite.adultContentPlacementPrice);
                          setPricingModalSite(null);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-rose-500 hover:bg-rose-400 text-white text-[10px] font-black cursor-pointer"
                      >
                        Order
                      </button>
                    </>
                  ) : (
                    <span className="text-xs text-gray-500 font-mono font-medium">Not Offered (0)</span>
                  )}
                </div>
              </div>

              {/* Adult Content Creation & Placement */}
              <div className="p-3.5 rounded-xl bg-[#070b14] border border-gray-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Adult Creation & Placement</div>
                  <div className="text-[10px] text-rose-400">Adult Writing + Post</div>
                </div>
                <div className="flex items-center gap-2">
                  {pricingModalSite.adultContentCreationPlacementPrice && pricingModalSite.adultContentCreationPlacementPrice > 0 ? (
                    <>
                      <span className="text-sm font-black text-rose-400 font-mono">
                        ${pricingModalSite.adultContentCreationPlacementPrice}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          handleOrderPost(pricingModalSite, "Adult Creation & Placement", pricingModalSite.adultContentCreationPlacementPrice);
                          setPricingModalSite(null);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-rose-500 hover:bg-rose-400 text-white text-[10px] font-black cursor-pointer"
                      >
                        Order
                      </button>
                    </>
                  ) : (
                    <span className="text-xs text-gray-500 font-mono font-medium">Not Offered (0)</span>
                  )}
                </div>
              </div>

              {/* Adult Link Insert Price */}
              <div className="p-3.5 rounded-xl bg-[#070b14] border border-gray-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Adult Link Insert Price</div>
                  <div className="text-[10px] text-rose-400">Adult Niche Edit</div>
                </div>
                <div className="flex items-center gap-2">
                  {pricingModalSite.adultLinkInsertPrice && pricingModalSite.adultLinkInsertPrice > 0 ? (
                    <>
                      <span className="text-sm font-black text-rose-400 font-mono">
                        ${pricingModalSite.adultLinkInsertPrice}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          handleOrderPost(pricingModalSite, "Adult Link Insert", pricingModalSite.adultLinkInsertPrice);
                          setPricingModalSite(null);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-rose-500 hover:bg-rose-400 text-white text-[10px] font-black cursor-pointer"
                      >
                        Order
                      </button>
                    </>
                  ) : (
                    <span className="text-xs text-gray-500 font-mono font-medium">Not Offered (0)</span>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center text-xs text-gray-400 border-t border-gray-800">
              <span>Orders route directly to WhatsApp: <strong className="text-white">+91 8000417058</strong></span>
              <button
                type="button"
                onClick={() => setPricingModalSite(null)}
                className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-bold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* INLINE AUTH MODAL (If unauthenticated visitor opens dashboard directly) */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#0b1220] border border-gray-800 rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-4">
            <div className="text-center space-y-1.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center text-2xl mx-auto shadow-md">
                🔐
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                {authMode === "signup" ? "Create Buyer Account" : "Buyer Sign In"}
              </h3>
              <p className="text-xs text-gray-400">
                Sign in with your Email and WhatsApp number to access the full publications directory and Excel database export.
              </p>
            </div>

            {/* Mode Switch Tabs */}
            <div className="grid grid-cols-2 p-1 bg-[#070b14] border border-gray-800 rounded-xl text-xs font-bold text-center">
              <button
                type="button"
                onClick={() => setAuthMode("login")}
                className={`py-2 rounded-lg transition-all cursor-pointer ${
                  authMode === "login"
                    ? "bg-amber-500 text-black shadow-md font-extrabold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setAuthMode("signup")}
                className={`py-2 rounded-lg transition-all cursor-pointer ${
                  authMode === "signup"
                    ? "bg-amber-500 text-black shadow-md font-extrabold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Create Account
              </button>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">
                ⚠️ {authError}
              </div>
            )}

            <form onSubmit={handleInlineAuthSubmit} className="space-y-3 pt-1">
              <div>
                <label className="text-[11px] text-gray-400 font-bold block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="yourname@company.com"
                  className="w-full bg-[#070b14] border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              {authMode === "signup" && (
                <div>
                  <label className="text-[11px] text-gray-400 font-bold block mb-1">
                    Mobile / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={authPhone}
                    onChange={(e) => setAuthPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#070b14] border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              )}

              <div>
                <label className="text-[11px] text-gray-400 font-bold block mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#070b14] border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 cursor-pointer mt-2"
              >
                {authMode === "signup" ? "Create Account & Unlock Database →" : "Sign In & Unlock Database →"}
              </button>
            </form>

            <div className="pt-2 text-center">
              <Link
                href="/guest-posting"
                className="text-xs text-gray-400 hover:text-white underline"
              >
                ← Return to Guest Posting page
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
