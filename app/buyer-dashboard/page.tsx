"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import * as XLSX from "xlsx";
import { INITIAL_PUBLISHERS, PublisherSite } from "../data/publishersData";

interface BuyerSession {
  email: string;
  phone: string;
}

interface CustomSiteRow {
  id: string;
  domain: string;
  niche: string;
  country: string;
  countryFlag?: string;
  language?: string;
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

  // Database source from server (Vercel Blob / Excel / Custom)
  const [serverSites, setServerSites] = useState<CustomSiteRow[]>([]);
  const [vercelBlobUrl, setVercelBlobUrl] = useState<string>("");
  const [directDownloadUrl, setDirectDownloadUrl] = useState<string>("");
  const [dbSourceType, setDbSourceType] = useState<string>("default");
  const [dbUpdatedAt, setDbUpdatedAt] = useState<string>("");
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

  // Admin / Owner Database Management Modal State
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [inputBlobUrl, setInputBlobUrl] = useState("");
  const [inputDownloadUrl, setInputDownloadUrl] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatusMsg, setSyncStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Notification Toast
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
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

    fetchDatabaseSource();
  }, []);

  const fetchDatabaseSource = async () => {
    setIsLoadingDb(true);
    try {
      const res = await fetch("/api/db/custom-database");
      const data = await res.json();
      if (data.success) {
        setVercelBlobUrl(data.vercelBlobUrl || "");
        setInputBlobUrl(data.vercelBlobUrl || "");
        setDirectDownloadUrl(data.directDownloadUrl || "");
        setInputDownloadUrl(data.directDownloadUrl || "");
        setServerSites(data.customSites || []);
        setDbSourceType(data.sourceType || "default");
        setDbUpdatedAt(data.updatedAt || "");
      }
    } catch (err) {
      console.error("Error fetching database source:", err);
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

      await fetch("/api/db/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "buyer_account_registration",
          name: cleanEmail.split("@")[0],
          email: cleanEmail,
          phone: cleanPhone,
          service: "40,000+ Guest Post Database Access",
          message: "Buyer signed in/registered on Buyer Dashboard.",
        }),
      });

      setIsAuthModalOpen(false);
      showToast(`Welcome back, ${cleanEmail}! Database unlocked.`);
    } catch (err) {
      console.error(err);
    }
  };

  // Active sites to display: Server custom sites (uploaded/synced by user) OR fallback starter publishers
  const displayedSites: CustomSiteRow[] = useMemo(() => {
    if (serverSites && serverSites.length > 0) {
      return serverSites;
    }
    // Fallback starter dataset if user hasn't added custom data yet
    return INITIAL_PUBLISHERS.map((p) => ({
      id: p.id,
      domain: p.domain,
      niche: p.niche,
      country: p.country,
      countryFlag: p.countryFlag,
      language: p.language,
      dr: p.dr,
      da: p.da,
      ahrefsTraffic: p.ahrefsTraffic,
      traffic: p.ahrefsTraffic,
      linkType: p.linkType,
      price: p.price,
      addedByAdmin: false,
    }));
  }, [serverSites]);

  // Extract unique categories
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

  // Excel / CSV Download Handler
  const handleDownloadExcel = () => {
    // If the admin configured a direct Vercel Blob URL to an excel or csv file, download directly
    if (directDownloadUrl && (directDownloadUrl.endsWith(".xlsx") || directDownloadUrl.endsWith(".csv"))) {
      const a = document.createElement("a");
      a.href = directDownloadUrl;
      a.setAttribute("download", `nova_growth_guest_post_database_${Date.now()}.xlsx`);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showToast("Downloading your database directly from Vercel storage...");
      return;
    }

    // Otherwise generate native XLSX workbook via SheetJS
    try {
      const exportRows = filteredAndSortedSites.map((s, idx) => ({
        "Serial No.": idx + 1,
        "Publication Domain": s.domain,
        "Niche / Category": s.niche,
        "Ahrefs DR": s.dr,
        "Moz DA": s.da,
        "Traffic": s.ahrefsTraffic || s.traffic || "100,000+",
        "Country": s.country,
        "Link Type": s.linkType,
        "Wholesale Price ($ USD)": `$${s.price} USD`,
        "Placement Warranty": "100% DoFollow Contextual & Permanent Indexation",
      }));

      const ws = XLSX.utils.json_to_sheet(exportRows);

      // Auto-size column widths
      ws["!cols"] = [
        { wch: 10 },
        { wch: 32 },
        { wch: 25 },
        { wch: 12 },
        { wch: 12 },
        { wch: 18 },
        { wch: 20 },
        { wch: 14 },
        { wch: 22 },
        { wch: 45 },
      ];

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "40,000+ Guest Posts");
      XLSX.writeFile(wb, `nova_growth_40000_guest_posts_${Date.now()}.xlsx`);

      showToast(`Exported ${filteredAndSortedSites.length} websites into Excel (.xlsx) successfully!`);
    } catch (err) {
      console.error("Excel generation error:", err);
      // Fallback CSV with UTF-8 BOM
      const headers = ["Domain", "Niche", "DR", "DA", "Traffic", "Country", "Link Type", "Price (USD)"];
      const csvRows = filteredAndSortedSites.map((s) => [
        `"${s.domain}"`,
        `"${s.niche}"`,
        `"${s.dr}"`,
        `"${s.da}"`,
        `"${s.ahrefsTraffic || s.traffic}"`,
        `"${s.country}"`,
        `"${s.linkType}"`,
        `"$${s.price} USD"`,
      ]);
      const csv = "\uFEFF" + [headers.join(","), ...csvRows.map((r) => r.join(","))].join("\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.setAttribute("download", `nova_growth_database_${Date.now()}.csv`);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  // Sync Vercel Blob URL
  const handleSyncVercelBlob = async () => {
    if (!inputBlobUrl.trim()) {
      setSyncStatusMsg({ type: "error", text: "Please enter a valid Vercel Blob Storage URL." });
      return;
    }

    setIsSyncing(true);
    setSyncStatusMsg(null);

    try {
      const res = await fetch("/api/db/custom-database", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "sync_blob",
          vercelBlobUrl: inputBlobUrl.trim(),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSyncStatusMsg({
          type: "success",
          text: data.message || `Successfully synced! ${data.totalCount} sites loaded.`,
        });
        setVercelBlobUrl(inputBlobUrl.trim());
        setDirectDownloadUrl(inputBlobUrl.trim());
        if (data.customSites) {
          setServerSites(data.customSites);
        }
        showToast("Vercel Blob database synced and published to dashboard!");
      } else {
        setSyncStatusMsg({ type: "error", text: data.error || "Failed to sync Vercel Blob URL." });
      }
    } catch (err: any) {
      setSyncStatusMsg({ type: "error", text: err?.message || "Network error while syncing." });
    } finally {
      setIsSyncing(false);
    }
  };

  // Direct File Upload (Excel .xlsx / .csv)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsSyncing(true);
    setSyncStatusMsg(null);

    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const arrayBuffer = evt.target?.result as ArrayBuffer;
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const rawJsonRows: any[] = XLSX.utils.sheet_to_json(worksheet);

        if (!rawJsonRows || rawJsonRows.length === 0) {
          setSyncStatusMsg({ type: "error", text: "Uploaded file is empty or invalid." });
          setIsSyncing(false);
          return;
        }

        // Send to server to save and publish
        const res = await fetch("/api/db/custom-database", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customSites: rawJsonRows,
          }),
        });

        const data = await res.json();
        if (data.success) {
          setSyncStatusMsg({
            type: "success",
            text: `File uploaded successfully! ${data.totalCount} sites published to dashboard.`,
          });
          if (data.customSites) {
            setServerSites(data.customSites);
          }
          showToast(`Published ${data.totalCount} websites from ${file.name}!`);
        } else {
          setSyncStatusMsg({ type: "error", text: data.error || "Failed to save file data." });
        }
      } catch (err: any) {
        setSyncStatusMsg({ type: "error", text: `Error reading file: ${err.message}` });
      } finally {
        setIsSyncing(false);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  // Reset / Clear database
  const handleClearDatabase = async () => {
    if (!window.confirm("Are you sure you want to reset this custom database?")) return;
    setIsSyncing(true);
    try {
      const res = await fetch("/api/db/custom-database", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "clear" }),
      });
      const data = await res.json();
      if (data.success) {
        setServerSites([]);
        setVercelBlobUrl("");
        setInputBlobUrl("");
        setDirectDownloadUrl("");
        setInputDownloadUrl("");
        setSyncStatusMsg({ type: "success", text: "Database cleared." });
        showToast("Database cleared successfully.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSyncing(false);
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
              NovaGrowth Buyer Workspace
            </h1>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-400 border border-amber-500/30">
              Verified Access
            </span>
          </div>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
          {/* Owner Data Management Button */}
          <button
            type="button"
            onClick={() => {
              setSyncStatusMsg(null);
              setIsSyncModalOpen(true);
            }}
            className="px-3 py-1.5 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 border border-purple-500/30 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            title="Connect your Vercel Blob link or upload your Excel database"
          >
            <span>⚡</span>
            <span className="hidden sm:inline">Connect Vercel Blob / Upload Excel</span>
            <span className="sm:hidden">Database Sync</span>
          </button>

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
                <span className="text-[10px] text-gray-400">
                  {buyerUser.phone !== "Not specified" ? buyerUser.phone : "Buyer Member"}
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
      <div className="border-b border-gray-800/80 bg-gradient-to-b from-[#0e172a] via-[#09101f] to-[#070b14] px-4 sm:px-6 lg:px-10 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold mb-1">
              <span>🌟</span>
              <span>Full Publisher Inventory &amp; Direct Wholesale Placements</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Authority Guest Post Database
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-2xl">
              {serverSites.length > 0 ? (
                <>
                  Showing <strong className="text-emerald-400">{serverSites.length} websites</strong>{" "}
                  synced directly from your custom database source. Search, filter, and export into Excel anytime.
                </>
              ) : (
                <>
                  Full access unlocked. Search by domain, niche, DR, traffic, and export complete list in Microsoft Excel (.xlsx).
                </>
              )}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-[#0b1220] border border-gray-800 p-3 rounded-2xl flex items-center gap-3 shadow-md">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl font-bold">
                📊
              </div>
              <div>
                <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                  Total Publications
                </div>
                <div className="text-lg font-black text-white">
                  {filteredAndSortedSites.length.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="bg-[#0b1220] border border-gray-800 p-3 rounded-2xl flex items-center gap-3 shadow-md">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center text-xl font-bold">
                📥
              </div>
              <div>
                <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                  Database Export
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
                placeholder="Search publication by domain (e.g. tech, retail), niche, or country..."
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
                  <option value="All" className="bg-gray-900">All Types</option>
                  <option value="DoFollow" className="bg-gray-900">DoFollow</option>
                  <option value="NoFollow" className="bg-gray-900">NoFollow</option>
                  <option value="Contextual" className="bg-gray-900">Contextual</option>
                </select>
              </div>

              {/* Min DR Filter */}
              <div className="flex items-center gap-1.5 bg-[#070b14] border border-gray-700/80 rounded-xl px-3 py-1.5 text-xs">
                <span className="text-gray-400 text-[11px]">Min DR:</span>
                <input
                  type="number"
                  placeholder="e.g. 50"
                  value={minDr}
                  onChange={(e) => {
                    setMinDr(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-14 bg-transparent text-white font-semibold focus:outline-none"
                />
              </div>

              {/* Reset Filters */}
              {(search || selectedCategory !== "All" || selectedLinkType !== "All" || minDr) && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setSelectedCategory("All");
                    setSelectedLinkType("All");
                    setMinDr("");
                    setCurrentPage(1);
                  }}
                  className="text-xs text-amber-400 hover:text-amber-300 font-bold px-2 py-1 cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* DATA TABLE */}
        <div className="bg-[#0b1220] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs whitespace-nowrap">
              <thead className="bg-[#070b14] border-b border-gray-800 text-gray-400 uppercase text-[10px] tracking-wider font-bold">
                <tr>
                  <th scope="col" className="py-3 px-4">#</th>
                  <th
                    scope="col"
                    className="py-3 px-4 cursor-pointer hover:text-white transition-colors"
                    onClick={() => {
                      if (sortField === "domain") setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                      else { setSortField("domain"); setSortOrder("asc"); }
                    }}
                  >
                    Publication Domain {sortField === "domain" && (sortOrder === "asc" ? "▲" : "▼")}
                  </th>
                  <th scope="col" className="py-3 px-3">Niche Category</th>
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
                          <a
                            href={`https://wa.me/919999999999?text=Hi%20NovaGrowth%20Team%2C%20I%20would%20like%20to%20order%20a%20guest%20post%20on%20${encodeURIComponent(site.domain)}%20(DR%20${site.dr}%2C%20%24${site.price})`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/30 text-amber-400 border border-amber-500/30 text-[11px] font-bold transition-all cursor-pointer"
                          >
                            <span>Order</span>
                            <span>→</span>
                          </a>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={10} className="py-12 text-center text-gray-400">
                      <div className="text-3xl mb-2">🔍</div>
                      <p className="font-bold text-white text-sm">No websites found matching your filter criteria</p>
                      <p className="text-xs text-gray-500 mt-1">Try resetting filters or searching a different keyword</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* TABLE FOOTER & PAGINATION */}
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
        </div>

      </main>

      {/* OWNER/ADMIN SYNC MODAL: CONNECT VERCEL BLOB / UPLOAD EXCEL */}
      {isSyncModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#0b1220] border border-gray-800 rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">⚡</span>
                <div>
                  <h3 className="text-base font-black text-white">
                    Database Source &amp; Vercel Blob Sync
                  </h3>
                  <p className="text-[11px] text-gray-400">
                    Put your custom database from Vercel Storage or upload an Excel file.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsSyncModalOpen(false)}
                className="text-gray-400 hover:text-white text-base cursor-pointer"
              >
                ✕
              </button>
            </div>

            {syncStatusMsg && (
              <div
                className={`p-3 rounded-xl text-xs font-semibold ${
                  syncStatusMsg.type === "success"
                    ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400"
                    : "bg-rose-500/15 border border-rose-500/30 text-rose-400"
                }`}
              >
                {syncStatusMsg.text}
              </div>
            )}

            {/* Option 1: Paste Vercel Blob URL */}
            <div className="space-y-2 p-4 rounded-2xl bg-[#070b14] border border-gray-800/80">
              <label className="text-xs font-bold text-white flex items-center justify-between">
                <span>Option 1: Connect Vercel Blob Link</span>
                <span className="text-[10px] text-amber-400 font-normal">Auto-Fetches &amp; Syncs</span>
              </label>
              <p className="text-[11px] text-gray-400">
                Paste the public URL of your Excel or CSV file stored in Vercel Blob Storage:
              </p>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={inputBlobUrl}
                  onChange={(e) => setInputBlobUrl(e.target.value)}
                  placeholder="https://...public.blob.vercel-storage.com/.../database.xlsx"
                  className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400 font-mono"
                />
                <button
                  type="button"
                  disabled={isSyncing}
                  onClick={handleSyncVercelBlob}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl cursor-pointer transition-all shrink-0"
                >
                  {isSyncing ? "Syncing..." : "Sync Vercel Blob"}
                </button>
              </div>
            </div>

            {/* Option 2: Upload Excel (.xlsx) / CSV file directly */}
            <div className="space-y-2 p-4 rounded-2xl bg-[#070b14] border border-gray-800/80">
              <label className="text-xs font-bold text-white flex items-center justify-between">
                <span>Option 2: Direct File Upload (.xlsx / .xls / .csv)</span>
                <span className="text-[10px] text-emerald-400 font-normal">Instant Import</span>
              </label>
              <p className="text-[11px] text-gray-400">
                Choose an Excel spreadsheet from your computer to parse and populate into the dashboard:
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx, .xls, .csv"
                onChange={handleFileUpload}
                className="block w-full text-xs text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-gray-800 file:text-amber-400 hover:file:bg-gray-700 cursor-pointer"
              />
            </div>

            {/* Option 3: Reset / Clear */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={handleClearDatabase}
                disabled={isSyncing}
                className="text-xs text-rose-400 hover:text-rose-300 underline cursor-pointer"
              >
                Reset Custom Database
              </button>

              <button
                type="button"
                onClick={() => setIsSyncModalOpen(false)}
                className="px-4 py-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-white text-xs font-bold cursor-pointer"
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
                Sign in with your Email and WhatsApp number to access the full 40,000+ publications directory and Excel database export.
              </p>
            </div>

            {/* Mode Switch Tabs */}
            <div className="grid grid-cols-2 p-1 bg-[#070b14] border border-gray-800 rounded-xl text-xs font-bold text-center">
              <button
                type="button"
                onClick={() => {
                  setAuthMode("signup");
                  setAuthError(null);
                }}
                className={`py-2 rounded-lg cursor-pointer transition-all ${
                  authMode === "signup" ? "bg-amber-500 text-black shadow-sm" : "text-gray-400 hover:text-white"
                }`}
              >
                Register Account
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode("login");
                  setAuthError(null);
                }}
                className={`py-2 rounded-lg cursor-pointer transition-all ${
                  authMode === "login" ? "bg-amber-500 text-black shadow-sm" : "text-gray-400 hover:text-white"
                }`}
              >
                Sign In
              </button>
            </div>

            {authError && (
              <div className="p-2.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs text-center">
                {authError}
              </div>
            )}

            <form onSubmit={handleInlineAuthSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1">
                  Work / Personal Email *
                </label>
                <input
                  type="email"
                  required
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-[#070b14] border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1">
                  Mobile / WhatsApp Number {authMode === "signup" ? "*" : "(Optional)"}
                </label>
                <input
                  type="tel"
                  required={authMode === "signup"}
                  value={authPhone}
                  onChange={(e) => setAuthPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000 or WhatsApp"
                  className="w-full bg-[#070b14] border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1">
                  {authMode === "signup" ? "Create Password *" : "Password *"}
                </label>
                <input
                  type="password"
                  required
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#070b14] border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-black font-black py-3 rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 cursor-pointer transition-all"
              >
                {authMode === "signup" ? "Create Account & Unlock Database" : "Sign In & Unlock Database"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
