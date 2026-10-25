"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import * as XLSX from "xlsx";
import { INITIAL_PUBLISHERS } from "../data/publishersData";

interface BuyerSession {
  email: string;
  phone: string;
}

interface RealWebsiteSite {
  id?: string;
  domain: string;
  niche: string;
  country: string;
  countryFlag?: string;
  dr: number;
  da: number;
  ahrefsTraffic?: string;
  traffic?: string;
  linkType: "DoFollow" | "NoFollow" | "Contextual" | string;
  price: number;
  addedByAdmin?: boolean;
}

export default function BuyerDashboardPage() {
  const [buyerUser, setBuyerUser] = useState<BuyerSession | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  // Authentication Modal (if visitor visits dashboard without login)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [authEmail, setAuthEmail] = useState("");
  const [authPhone, setAuthPhone] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);

  // REAL WEBSITES DATA FROM SERVER (Synced from Admin)
  const [realWebsites, setRealWebsites] = useState<RealWebsiteSite[]>([]);
  const [directDownloadUrl, setDirectDownloadUrl] = useState<string>("");
  const [isLoadingDb, setIsLoadingDb] = useState(true);

  // Search, Filters & Pagination
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLinkType, setSelectedLinkType] = useState("All");
  const [minDr, setMinDr] = useState("");
  const [sortField, setSortField] = useState<"dr" | "da" | "price" | "domain">("dr");
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

  // Check login session & fetch server database source on mount
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

    fetchWebsites();
  }, []);

  const fetchWebsites = async () => {
    setIsLoadingDb(true);
    try {
      const res = await fetch("/api/db/custom-database");
      const data = await res.json();
      if (data.success) {
        setDirectDownloadUrl(data.directDownloadUrl || "");
        if (data.customSites && data.customSites.length > 0) {
          setRealWebsites(data.customSites);
        }
      }
    } catch (err) {
      console.error("Error fetching websites:", err);
    } finally {
      setIsLoadingDb(false);
    }
  };

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

      await fetch("/api/db/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "buyer_account_registration",
          name: cleanEmail.split("@")[0],
          email: cleanEmail,
          phone: cleanPhone,
          service: "40,000+ Guest Post Database Access",
          message: "Buyer signed in to Buyer Marketplace Dashboard.",
          clientGeo,
        }),
      });

      setIsAuthModalOpen(false);
      showToast(`Welcome back, ${cleanEmail}!`);
    } catch (err) {
      console.error(err);
    }
  };

  // Prioritize real websites synced by admin, otherwise use verified initial publishers
  const displayedSites: RealWebsiteSite[] = useMemo(() => {
    if (realWebsites.length > 0) return realWebsites;
    return INITIAL_PUBLISHERS as RealWebsiteSite[];
  }, [realWebsites]);

  // Extract unique categories from websites
  const categoriesList = useMemo(() => {
    const set = new Set<string>();
    displayedSites.forEach((s) => {
      if (s.niche) set.add(s.niche);
    });
    return ["All", ...Array.from(set).sort()];
  }, [displayedSites]);

  // Filtered & Sorted sites
  const filteredAndSortedSites = useMemo(() => {
    let result = [...displayedSites];

    // Search query
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (s) =>
          s.domain.toLowerCase().includes(q) ||
          s.niche.toLowerCase().includes(q) ||
          (s.country && s.country.toLowerCase().includes(q))
      );
    }

    // Category
    if (selectedCategory !== "All") {
      result = result.filter((s) => s.niche === selectedCategory);
    }

    // Link Type
    if (selectedLinkType !== "All") {
      result = result.filter((s) => s.linkType === selectedLinkType);
    }

    // Min DR
    if (minDr) {
      const num = parseInt(minDr, 10);
      if (!isNaN(num)) {
        result = result.filter((s) => s.dr >= num);
      }
    }

    // Sorting
    result.sort((a, b) => {
      let valA: any = a[sortField];
      let valB: any = b[sortField];
      if (typeof valA === "string") valA = valA.toLowerCase();
      if (typeof valB === "string") valB = valB.toLowerCase();
      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [displayedSites, search, selectedCategory, selectedLinkType, minDr, sortField, sortOrder]);

  // Paginated sites
  const totalPages = Math.ceil(filteredAndSortedSites.length / pageSize) || 1;
  const paginatedSites = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredAndSortedSites.slice(start, start + pageSize);
  }, [filteredAndSortedSites, currentPage, pageSize]);

  // Handle Order Post Click (Sends to WhatsApp 8000417058 & logs order to Admin CRM)
  const handleOrderPost = (site: RealWebsiteSite) => {
    const userEmail = buyerUser?.email || "Guest Visitor";
    const userPhone = buyerUser?.phone || "Not specified";

    const msg = [
      `*New Guest Post Order Inquiry - Nova Growth*`,
      ``,
      `*Website Domain:* ${site.domain}`,
      `*Wholesale Price:* $${site.price} USD`,
      `*Niche Category:* ${site.niche}`,
      `*Metrics:* Ahrefs DR ${site.dr} | Moz DA ${site.da}`,
      `*Organic Traffic:* ${site.ahrefsTraffic || site.traffic || "100,000+"}`,
      `*Link Type:* ${site.linkType || "DoFollow"}`,
      `*Target Country:* ${site.country || "Global"}`,
      ``,
      `*Buyer Contact Details:*`,
      `• Email: ${userEmail}`,
      `• Mobile / WhatsApp: ${userPhone}`,
      ``,
      `Please share the live URL requirements and payment invoice.`
    ].join("\n");

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
          service: `Guest Post Order: ${site.domain} ($${site.price} USD)`,
          domain: site.domain,
          title: `Guest Post Order: ${site.domain} ($${site.price} USD)`,
          details: `User clicked Order Post for ${site.domain} ($${site.price} USD). Contact sent to WhatsApp 8000417058.`,
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
          service: `Guest Post Order: ${site.domain} ($${site.price} USD)`,
          message: `Buyer ordered guest post for ${site.domain} ($${site.price} USD). Contacted WhatsApp 8000417058.`,
          notes: `Domain: ${site.domain} | Price: $${site.price} USD | Niche: ${site.niche} | DR: ${site.dr} | DA: ${site.da} | Link: ${site.linkType}`,
          clientGeo,
        }),
      }).catch(() => {});
    });

    // Open WhatsApp directly with 8000417058
    const waUrl = `https://wa.me/918000417058?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, "_blank");
  };

  // Excel / CSV Download Handler (Tracks live location & downloads XLSX)
  const handleDownloadExcel = () => {
    if (filteredAndSortedSites.length === 0) {
      showToast("❌ No websites found to export.");
      return;
    }

    // Track live download event with location in background
    getClientLiveLocation().then((clientGeo) => {
      fetch("/api/db/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "database_download",
          action: "download",
          email: buyerUser?.email || "Guest Buyer",
          phone: buyerUser?.phone || "",
          title: "Buyer Marketplace Database Downloaded (.xlsx)",
          details: `User downloaded ${filteredAndSortedSites.length} websites in Excel format.`,
          sourcePage: "/buyer-dashboard",
          clientGeo,
        }),
      }).catch(() => {});
    });

    // If direct Vercel Blob file link exists and is an xlsx file
    if (directDownloadUrl && (directDownloadUrl.endsWith(".xlsx") || directDownloadUrl.endsWith(".csv"))) {
      const a = document.createElement("a");
      a.href = directDownloadUrl;
      a.setAttribute("download", `nova_growth_guest_post_database_${Date.now()}.xlsx`);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showToast("Downloading verified database file...");
      return;
    }

    // Native XLSX workbook via SheetJS
    try {
      const exportRows = filteredAndSortedSites.map((s, idx) => ({
        "Serial No.": idx + 1,
        "Website Domain": s.domain,
        "Niche / Category": s.niche,
        "Ahrefs DR": s.dr,
        "Moz DA": s.da,
        "Traffic": s.ahrefsTraffic || s.traffic || "100,000+",
        "Country": s.country,
        "Link Type": s.linkType,
        "Wholesale Price ($ USD)": `$${s.price} USD`,
      }));

      const ws = XLSX.utils.json_to_sheet(exportRows);
      ws["!cols"] = [
        { wch: 10 },
        { wch: 32 },
        { wch: 25 },
        { wch: 12 },
        { wch: 12 },
        { wch: 18 },
        { wch: 20 },
        { wch: 14 },
        { wch: 20 },
      ];

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Guest Post Sites");
      XLSX.writeFile(wb, `nova_growth_guest_post_database_${Date.now()}.xlsx`);

      showToast(`✅ Successfully downloaded ${filteredAndSortedSites.length} websites in Excel (.xlsx)!`);
    } catch (err) {
      console.error("Excel generation error:", err);
    }
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
            <span>Back to Marketplace</span>
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
            <span>Download Database (.xlsx)</span>
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

      {/* HERO BANNER & STATS */}
      <div className="border-b border-gray-800/80 bg-gradient-to-b from-[#0e172a] via-[#09101f] to-[#070b14] px-4 sm:px-6 lg:px-10 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold mb-2">
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                ✓ Verified Live Publisher Network
              </span>
              <span>40,000+ Direct Editorial Links</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Premium Guest Posting Database
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-2 max-w-2xl leading-relaxed">
              Explore high-authority websites with verified DR, DA, organic traffic, and permanent DoFollow backlinks. 
              Search by niche, filter by domain metrics, or download the complete database in Excel format.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-[#0b1220] border border-gray-800 p-3.5 rounded-2xl flex items-center gap-3 shadow-md">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl font-bold">
                📊
              </div>
              <div>
                <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                  Available Sites
                </div>
                <div className="text-xl font-black text-white">
                  {displayedSites.length.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="bg-[#0b1220] border border-gray-800 p-3.5 rounded-2xl flex items-center gap-3 shadow-md">
              <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center text-xl font-bold">
                📥
              </div>
              <div>
                <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                  Full Spreadsheet
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
                placeholder="Search websites by domain name, niche, or country..."
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
                  className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer"
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
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#070b14] text-gray-400 font-bold uppercase text-[10px] tracking-wider border-b border-gray-800">
                  <th scope="col" className="py-3 px-4">#</th>
                  <th
                    scope="col"
                    className="py-3 px-4 cursor-pointer hover:text-white transition-colors"
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
                    className="py-3 px-3 cursor-pointer hover:text-white transition-colors"
                    onClick={() => {
                      if (sortField === "dr") setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                      else { setSortField("dr"); setSortOrder("desc"); }
                    }}
                  >
                    Ahrefs DR {sortField === "dr" && (sortOrder === "asc" ? "▲" : "▼")}
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-3 cursor-pointer hover:text-white transition-colors"
                    onClick={() => {
                      if (sortField === "da") setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                      else { setSortField("da"); setSortOrder("desc"); }
                    }}
                  >
                    Moz DA {sortField === "da" && (sortOrder === "asc" ? "▲" : "▼")}
                  </th>
                  <th scope="col" className="py-3 px-3">Traffic</th>
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
                    Wholesale Price {sortField === "price" && (sortOrder === "asc" ? "▲" : "▼")}
                  </th>
                  <th scope="col" className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/80">
                {paginatedSites.length > 0 ? (
                  paginatedSites.map((site, idx) => {
                    const rowNumber = (currentPage - 1) * pageSize + idx + 1;
                    return (
                      <tr
                        key={site.id || site.domain + idx}
                        className="hover:bg-gray-800/30 transition-colors"
                      >
                        <td className="py-3 px-4 text-gray-500 text-[11px] font-mono">
                          {rowNumber}
                        </td>
                        <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          <span>{site.domain}</span>
                        </td>
                        <td className="py-3 px-3 text-gray-300">
                          <span className="px-2.5 py-0.5 rounded-md bg-gray-800/80 border border-gray-700/60 text-[11px]">
                            {site.niche}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-extrabold text-amber-400">
                          {site.dr}
                        </td>
                        <td className="py-3 px-3 font-bold text-gray-300">
                          {site.da}
                        </td>
                        <td className="py-3 px-3 font-mono text-emerald-400 font-bold">
                          {site.ahrefsTraffic || site.traffic || "100,000+"}
                        </td>
                        <td className="py-3 px-3 text-gray-300">
                          <span className="inline-flex items-center gap-1.5">
                            <span>{site.countryFlag || "🌐"}</span>
                            <span>{site.country || "Global"}</span>
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                            {site.linkType || "DoFollow"}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-black text-white font-mono">
                          ${site.price} <span className="text-[10px] text-gray-400 font-normal">USD</span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => handleOrderPost(site)}
                            className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] shadow-sm transition-all inline-flex items-center gap-1 cursor-pointer"
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
                    <td colSpan={10} className="py-16 text-center text-gray-400">
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
                Showing <strong className="text-white">{filteredAndSortedSites.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}</strong> to{" "}
                <strong className="text-white">{Math.min(currentPage * pageSize, filteredAndSortedSites.length)}</strong> of{" "}
                <strong className="text-emerald-400 font-mono">{filteredAndSortedSites.length.toLocaleString()}</strong> publications
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
