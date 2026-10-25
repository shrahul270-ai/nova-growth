"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import * as XLSX from "xlsx";
import { getClientLiveLocation } from "@/lib/geo";

interface BuyerSession {
  email: string;
  phone: string;
}

export interface RealWebsiteSite {
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

  // REAL WEBSITES DATA FROM SERVER (No dummy/sample sites!)
  const [realWebsites, setRealWebsites] = useState<RealWebsiteSite[]>([]);
  const [vercelBlobUrl, setVercelBlobUrl] = useState<string>("");
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

  // Active Tool / Add Section View
  const [activeAddMethod, setActiveAddMethod] = useState<"none" | "excel_file" | "vercel_link" | "single_site" | "bulk_paste">("none");

  // Vercel Link Input
  const [inputBlobUrl, setInputBlobUrl] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatusMsg, setSyncStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Single Site Form State
  const [singleDomain, setSingleDomain] = useState("");
  const [singleNiche, setSingleNiche] = useState("SaaS & Tech");
  const [singleDr, setSingleDr] = useState("65");
  const [singleDa, setSingleDa] = useState("60");
  const [singleTraffic, setSingleTraffic] = useState("100,000+");
  const [singleCountry, setSingleCountry] = useState("United States (USA)");
  const [singleLinkType, setSingleLinkType] = useState("DoFollow");
  const [singlePrice, setSinglePrice] = useState("150");

  // Bulk Paste State
  const [bulkText, setBulkText] = useState("");

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

    fetchRealWebsites();
  }, []);

  const fetchRealWebsites = async () => {
    setIsLoadingDb(true);
    try {
      const res = await fetch("/api/db/custom-database");
      const data = await res.json();
      if (data.success) {
        setVercelBlobUrl(data.vercelBlobUrl || "");
        setInputBlobUrl(data.vercelBlobUrl || "");
        setDirectDownloadUrl(data.directDownloadUrl || "");
        setRealWebsites(data.customSites || []);
      }
    } catch (err) {
      console.error("Error fetching real websites:", err);
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
          service: "Real Guest Post Database Access",
          message: "Buyer signed in/registered on Buyer Dashboard.",
          clientGeo,
        }),
      });

      setIsAuthModalOpen(false);
      showToast(`Welcome back, ${cleanEmail}!`);
    } catch (err) {
      console.error(err);
    }
  };

  // ONLY show REAL websites added by the user (no dummy sites!)
  const displayedSites: RealWebsiteSite[] = realWebsites;

  // Extract unique categories from real websites
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

  // Excel / CSV Download Handler (Exports ONLY the real websites & tracks live location)
  const handleDownloadExcel = () => {
    if (filteredAndSortedSites.length === 0) {
      showToast("❌ Pehle apni real websites add karein taaki Excel download ho sake.");
      return;
    }

    // Track live download event with location
    getClientLiveLocation().then((clientGeo) => {
      fetch("/api/db/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "database_download",
          action: "download",
          email: buyerUser?.email || "Guest Visitor",
          phone: buyerUser?.phone || "",
          title: "Buyer Dashboard Database Downloaded (.xlsx)",
          details: `User downloaded ${filteredAndSortedSites.length} websites in Excel.`,
          sourcePage: "/buyer-dashboard",
          clientGeo,
        }),
      }).catch(() => {});
    });

    // If direct Vercel Blob file link exists
    if (directDownloadUrl && (directDownloadUrl.endsWith(".xlsx") || directDownloadUrl.endsWith(".csv"))) {
      const a = document.createElement("a");
      a.href = directDownloadUrl;
      a.setAttribute("download", `real_websites_database_${Date.now()}.xlsx`);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showToast("Downloading your database directly from Vercel storage...");
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
        "Price ($ USD)": `$${s.price} USD`,
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
      XLSX.utils.book_append_sheet(wb, ws, "Real Websites");
      XLSX.writeFile(wb, `nova_growth_real_websites_${Date.now()}.xlsx`);

      showToast(`Exported ${filteredAndSortedSites.length} real websites into Excel (.xlsx)!`);
    } catch (err) {
      console.error("Excel generation error:", err);
    }
  };

  // Method 1: Direct File Upload (Excel .xlsx / .csv)
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
          setSyncStatusMsg({ type: "error", text: "Excel file empty hai ya format valid nahi hai." });
          setIsSyncing(false);
          return;
        }

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
            text: `✅ ${data.totalCount} real websites successfully import ho gayi hain!`,
          });
          if (data.customSites) {
            setRealWebsites(data.customSites);
          }
          setActiveAddMethod("none");
          showToast(`✅ ${data.totalCount} real websites add ho gayi hain!`);
        } else {
          setSyncStatusMsg({ type: "error", text: data.error || "File save karne me error aaya." });
        }
      } catch (err: any) {
        setSyncStatusMsg({ type: "error", text: `File error: ${err.message}` });
      } finally {
        setIsSyncing(false);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  // Method 2: Sync Vercel Blob URL
  const handleSyncVercelBlob = async () => {
    if (!inputBlobUrl.trim()) {
      setSyncStatusMsg({ type: "error", text: "Vercel Blob Storage ka URL dalein." });
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
          text: data.message || `✅ Successfully synced! ${data.totalCount} websites add ho gayi.`,
        });
        setVercelBlobUrl(inputBlobUrl.trim());
        setDirectDownloadUrl(inputBlobUrl.trim());
        if (data.customSites) {
          setRealWebsites(data.customSites);
        }
        setActiveAddMethod("none");
        showToast("✅ Vercel storage se real websites sync ho gayi!");
      } else {
        setSyncStatusMsg({ type: "error", text: data.error || "Vercel link sync nahi ho paya." });
      }
    } catch (err: any) {
      setSyncStatusMsg({ type: "error", text: err?.message || "Network error" });
    } finally {
      setIsSyncing(false);
    }
  };

  // Method 3: Add Single Website
  const handleAddSingleSite = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanDomain = singleDomain.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
    if (!cleanDomain) {
      alert("Please enter domain name");
      return;
    }

    setIsSyncing(true);
    try {
      const newSite = {
        domain: cleanDomain,
        niche: singleNiche,
        dr: parseInt(singleDr, 10) || 50,
        da: parseInt(singleDa, 10) || 45,
        traffic: singleTraffic,
        country: singleCountry,
        linkType: singleLinkType,
        price: parseInt(singlePrice, 10) || 100,
      };

      const res = await fetch("/api/db/custom-database", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "add_single",
          site: newSite,
        }),
      });

      const data = await res.json();
      if (data.success) {
        if (data.customSites) {
          setRealWebsites(data.customSites);
        }
        setSingleDomain("");
        setActiveAddMethod("none");
        showToast(`✅ ${cleanDomain} successfully add ho gayi!`);
      } else {
        alert(data.error || "Failed to add website");
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setIsSyncing(false);
    }
  };

  // Method 4: Bulk Paste Domains
  const handleBulkPasteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const lines = bulkText
      .split(/[\n,]+/)
      .map((s) => s.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, ""))
      .filter((s) => s && s.includes("."));

    if (lines.length === 0) {
      alert("Please paste valid domain names (e.g. yoursite.com)");
      return;
    }

    const sitesToAdd = lines.map((dom, i) => ({
      domain: dom,
      niche: "General",
      dr: 60,
      da: 55,
      traffic: "50,000+",
      country: "United States (USA)",
      linkType: "DoFollow",
      price: 150,
    }));

    setIsSyncing(true);
    try {
      const existing = realWebsites || [];
      const combined = [...sitesToAdd, ...existing];

      const res = await fetch("/api/db/custom-database", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customSites: combined,
        }),
      });

      const data = await res.json();
      if (data.success) {
        if (data.customSites) {
          setRealWebsites(data.customSites);
        }
        setBulkText("");
        setActiveAddMethod("none");
        showToast(`✅ ${lines.length} domains successfully add ho gaye!`);
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setIsSyncing(false);
    }
  };

  // Delete Single Site
  const handleDeleteSite = async (siteId: string, domainName: string) => {
    if (!window.confirm(`Kya aap ${domainName} ko delete karna chahte hain?`)) return;
    try {
      const res = await fetch("/api/db/custom-database", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "delete_single",
          siteId,
          domain: domainName,
        }),
      });
      const data = await res.json();
      if (data.success && data.customSites) {
        setRealWebsites(data.customSites);
        showToast(`✓ ${domainName} deleted.`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Reset / Clear database
  const handleClearDatabase = async () => {
    if (!window.confirm("Kya aap saari websites delete karke fresh start karna chahte hain?")) return;
    setIsSyncing(true);
    try {
      const res = await fetch("/api/db/custom-database", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "clear" }),
      });
      const data = await res.json();
      if (data.success) {
        setRealWebsites([]);
        setVercelBlobUrl("");
        setInputBlobUrl("");
        setDirectDownloadUrl("");
        showToast("Database clear kar di gayi hai.");
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
              NovaGrowth Real Websites Dashboard
            </h1>
          </div>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
          {/* Add Real Website CTA button */}
          <button
            type="button"
            onClick={() => setActiveAddMethod(activeAddMethod === "none" ? "excel_file" : "none")}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>➕</span>
            <span>Add / Upload Real Websites</span>
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
                  {buyerUser.phone !== "Not specified" ? buyerUser.phone : "Verified Member"}
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
              <span>🌐</span>
              <span>Aapka Real Website Inventory &amp; Live Database</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Real Websites Manager
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-2xl">
              {realWebsites.length > 0 ? (
                <>
                  Aapke dwara add ki gayi <strong className="text-emerald-400 font-bold">{realWebsites.length} Real Websites</strong> live hain. 
                  Yaha se aap Excel download kar sakti hain ya aur websites add kar sakti hain.
                </>
              ) : (
                <>
                  Abhi tak koi real website add nahi hui hai. Neeche diye gaye options se apni Excel file upload karein ya Vercel link paste karein.
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
                  Total Real Sites
                </div>
                <div className="text-lg font-black text-white">
                  {realWebsites.length.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="bg-[#0b1220] border border-gray-800 p-3 rounded-2xl flex items-center gap-3 shadow-md">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center text-xl font-bold">
                📥
              </div>
              <div>
                <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                  Excel Export
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

      {/* DEDICATED TOOL: ADD YOUR REAL WEBSITES DATA (FRONT & CENTER) */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-10 pt-6">
        <div className="bg-gradient-to-r from-purple-950/40 via-indigo-950/30 to-[#0b1220] border-2 border-purple-500/30 rounded-3xl p-5 shadow-2xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-3">
            <div>
              <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <span>⚡</span>
                <span>Apna Real Websites Data Yaha Add Karein</span>
              </h3>
              <p className="text-xs text-gray-400">
                Apni real websites ko website par live karne ke liye 4 me se koi bhi option chunein:
              </p>
            </div>

            {realWebsites.length > 0 && (
              <button
                type="button"
                onClick={handleClearDatabase}
                className="text-xs text-rose-400 hover:text-rose-300 underline self-start cursor-pointer"
              >
                Clear All Websites &amp; Re-upload
              </button>
            )}
          </div>

          {/* 4 Method Selection Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
            <button
              type="button"
              onClick={() => setActiveAddMethod("excel_file")}
              className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                activeAddMethod === "excel_file"
                  ? "bg-purple-600/30 border-purple-400 text-white shadow-lg shadow-purple-500/10 font-bold"
                  : "bg-gray-900/80 hover:bg-gray-800/80 border-gray-800 text-gray-300"
              }`}
            >
              <div className="text-xl mb-1">📁</div>
              <div className="text-xs font-bold">1. Upload Excel / CSV</div>
              <div className="text-[10px] text-gray-400">Computer se file chunein</div>
            </button>

            <button
              type="button"
              onClick={() => setActiveAddMethod("vercel_link")}
              className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                activeAddMethod === "vercel_link"
                  ? "bg-purple-600/30 border-purple-400 text-white shadow-lg shadow-purple-500/10 font-bold"
                  : "bg-gray-900/80 hover:bg-gray-800/80 border-gray-800 text-gray-300"
              }`}
            >
              <div className="text-xl mb-1">🔗</div>
              <div className="text-xs font-bold">2. Vercel Blob Link</div>
              <div className="text-[10px] text-gray-400">Vercel Storage URL paste karein</div>
            </button>

            <button
              type="button"
              onClick={() => setActiveAddMethod("single_site")}
              className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                activeAddMethod === "single_site"
                  ? "bg-purple-600/30 border-purple-400 text-white shadow-lg shadow-purple-500/10 font-bold"
                  : "bg-gray-900/80 hover:bg-gray-800/80 border-gray-800 text-gray-300"
              }`}
            >
              <div className="text-xl mb-1">➕</div>
              <div className="text-xs font-bold">3. Add Single Site</div>
              <div className="text-[10px] text-gray-400">Ek-ek karke website add karein</div>
            </button>

            <button
              type="button"
              onClick={() => setActiveAddMethod("bulk_paste")}
              className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                activeAddMethod === "bulk_paste"
                  ? "bg-purple-600/30 border-purple-400 text-white shadow-lg shadow-purple-500/10 font-bold"
                  : "bg-gray-900/80 hover:bg-gray-800/80 border-gray-800 text-gray-300"
              }`}
            >
              <div className="text-xl mb-1">📋</div>
              <div className="text-xs font-bold">4. Paste Domains List</div>
              <div className="text-[10px] text-gray-400">List copy-paste karein</div>
            </button>
          </div>

          {/* Form 1: Upload Excel/CSV */}
          {activeAddMethod === "excel_file" && (
            <div className="p-4 rounded-2xl bg-[#070b14] border border-purple-500/30 space-y-3 animate-in fade-in duration-150">
              <label className="text-xs font-bold text-white flex items-center justify-between">
                <span>📁 Apni Real Websites ki Excel (.xlsx / .csv) File Upload Karein:</span>
                <span className="text-[10px] text-emerald-400">Instant Import (All Columns Auto-Detected)</span>
              </label>
              <p className="text-[11px] text-gray-400">
                Aapki Excel file me Domain, Traffic, DR, DA, Niche, Country, Price ke columns automatically detect ho jayenge:
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx, .xls, .csv"
                onChange={handleFileUpload}
                className="block w-full text-xs text-gray-300 file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-gradient-to-r file:from-purple-600 file:to-indigo-600 file:text-white hover:file:from-purple-500 hover:file:to-indigo-500 cursor-pointer pt-1"
              />
              {isSyncing && <div className="text-xs text-purple-400 font-bold">Processing Excel file... kripya wait karein.</div>}
            </div>
          )}

          {/* Form 2: Vercel Blob URL */}
          {activeAddMethod === "vercel_link" && (
            <div className="p-4 rounded-2xl bg-[#070b14] border border-purple-500/30 space-y-3 animate-in fade-in duration-150">
              <label className="text-xs font-bold text-white block">
                🔗 Vercel Storage Link Paste Karein:
              </label>
              <p className="text-[11px] text-gray-400">
                Jo file aapne Vercel Blob me rakhi hai, uska public URL yaha dalein:
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="url"
                  value={inputBlobUrl}
                  onChange={(e) => setInputBlobUrl(e.target.value)}
                  placeholder="https://...public.blob.vercel-storage.com/.../database.xlsx"
                  className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-3 py-2.5 text-xs text-white font-mono focus:border-purple-400 focus:outline-none"
                />
                <button
                  type="button"
                  disabled={isSyncing}
                  onClick={handleSyncVercelBlob}
                  className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl cursor-pointer shrink-0 transition-all"
                >
                  {isSyncing ? "Syncing..." : "Sync & Publish"}
                </button>
              </div>
            </div>
          )}

          {/* Form 3: Add Single Website */}
          {activeAddMethod === "single_site" && (
            <form onSubmit={handleAddSingleSite} className="p-4 rounded-2xl bg-[#070b14] border border-purple-500/30 space-y-3 animate-in fade-in duration-150">
              <div className="text-xs font-bold text-white mb-2">➕ Add Real Website Details:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <label className="text-[10px] text-gray-400 uppercase font-bold block mb-1">Domain *</label>
                  <input
                    type="text"
                    required
                    value={singleDomain}
                    onChange={(e) => setSingleDomain(e.target.value)}
                    placeholder="mywebsite.com"
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 uppercase font-bold block mb-1">Category / Niche</label>
                  <input
                    type="text"
                    value={singleNiche}
                    onChange={(e) => setSingleNiche(e.target.value)}
                    placeholder="Tech, Health, Finance..."
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 uppercase font-bold block mb-1">Ahrefs DR</label>
                  <input
                    type="number"
                    value={singleDr}
                    onChange={(e) => setSingleDr(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 uppercase font-bold block mb-1">Moz DA</label>
                  <input
                    type="number"
                    value={singleDa}
                    onChange={(e) => setSingleDa(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 uppercase font-bold block mb-1">Traffic</label>
                  <input
                    type="text"
                    value={singleTraffic}
                    onChange={(e) => setSingleTraffic(e.target.value)}
                    placeholder="100,000+"
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 uppercase font-bold block mb-1">Country</label>
                  <input
                    type="text"
                    value={singleCountry}
                    onChange={(e) => setSingleCountry(e.target.value)}
                    placeholder="USA, UK, India..."
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 uppercase font-bold block mb-1">Link Type</label>
                  <select
                    value={singleLinkType}
                    onChange={(e) => setSingleLinkType(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                  >
                    <option value="DoFollow">DoFollow</option>
                    <option value="NoFollow">NoFollow</option>
                    <option value="Contextual">Contextual</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 uppercase font-bold block mb-1">Price ($ USD)</label>
                  <input
                    type="number"
                    value={singlePrice}
                    onChange={(e) => setSinglePrice(e.target.value)}
                    placeholder="150"
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isSyncing}
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs cursor-pointer shadow-md"
                >
                  {isSyncing ? "Adding..." : "Save Website to Dashboard"}
                </button>
              </div>
            </form>
          )}

          {/* Form 4: Bulk Paste Domains */}
          {activeAddMethod === "bulk_paste" && (
            <form onSubmit={handleBulkPasteSubmit} className="p-4 rounded-2xl bg-[#070b14] border border-purple-500/30 space-y-3 animate-in fade-in duration-150">
              <label className="text-xs font-bold text-white block">
                📋 Paste Real Website Domains List (Separated by new line or commas):
              </label>
              <textarea
                rows={4}
                value={bulkText}
                onChange={(e) => setBulkText(e.target.value)}
                placeholder="techbeacon-daily.com&#10;venturepulse-media.io&#10;mysite.com&#10;anothersite.org"
                className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-xs text-white font-mono focus:border-purple-400 focus:outline-none"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSyncing}
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs cursor-pointer shadow-md"
                >
                  {isSyncing ? "Saving..." : "Add All Domains"}
                </button>
              </div>
            </form>
          )}
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
                placeholder="Search real websites by domain name, niche, or country..."
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

        {/* DATA TABLE (ONLY REAL WEBSITES) */}
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
                        <td className="py-3 px-4 text-right space-x-2">
                          <button
                            type="button"
                            onClick={() => handleDeleteSite(site.id, site.domain)}
                            className="px-2 py-1 rounded bg-rose-500/15 hover:bg-rose-500/30 text-rose-400 border border-rose-500/30 text-[11px] cursor-pointer"
                            title="Delete this website"
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={10} className="py-16 text-center text-gray-400">
                      <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center text-3xl mx-auto mb-3 shadow-lg">
                        📂
                      </div>
                      <p className="font-extrabold text-white text-base">Aapki Real Websites List Abhi Empty Hai</p>
                      <p className="text-xs text-gray-400 mt-1 max-w-md mx-auto">
                        Humne isme koi bhi fake ya dummy data nahi daala hai. Apni real websites dikhane ke liye upar diye gaye options se Excel file upload karein ya Vercel link paste karein.
                      </p>
                      <div className="mt-4 flex items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={() => setActiveAddMethod("excel_file")}
                          className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs cursor-pointer shadow-md"
                        >
                          📁 Upload Real Excel File
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveAddMethod("vercel_link")}
                          className="px-5 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-bold text-xs cursor-pointer border border-gray-700"
                        >
                          🔗 Paste Vercel Link
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* TABLE FOOTER & PAGINATION */}
          {realWebsites.length > 0 && (
            <div className="p-4 bg-[#070b14] border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
              <div>
                Showing <strong className="text-white">{filteredAndSortedSites.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}</strong> to{" "}
                <strong className="text-white">{Math.min(currentPage * pageSize, filteredAndSortedSites.length)}</strong> of{" "}
                <strong className="text-emerald-400 font-mono">{filteredAndSortedSites.length.toLocaleString()}</strong> real publications
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
