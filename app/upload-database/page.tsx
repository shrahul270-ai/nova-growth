"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import * as XLSX from "xlsx";

export interface RealWebsiteSite {
  id?: string;
  domain: string;
  da: number;
  pa: number;
  dr: number;
  traffic: string;
  ahrefsTraffic?: string;
  semrushScore: string | number;
  spamScore: string | number;
  category: string;
  niche?: string;
  linkType: "DoFollow" | "NoFollow" | "Contextual" | string;
  sampleLink: string;
  country: string;
  countryFlag?: string;
  contentPlacementPrice: number;
  price: number;
  linkInsertPrice: number;
  cbdContentPlacementPrice: number;
  cbdContentCreationPlacementPrice: number;
  cbdLinkInsertPrice: number;
  adultContentPlacementPrice: number;
  adultContentCreationPlacementPrice: number;
  adultLinkInsertPrice: number;
  indexable: boolean | string;
  sponsored: boolean | string;
  logoUrl: string;
}

export default function PrivateUploadDatabasePage() {
  const [realSites, setRealSites] = useState<RealWebsiteSite[]>([]);
  const [vercelBlobUrl, setVercelBlobUrl] = useState("");
  const [inputBlobUrl, setInputBlobUrl] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [activeTab, setActiveTab] = useState<"add_single" | "upload_file" | "vercel_link">("add_single");

  // Comprehensive 22-Field Single Site Form State
  const [domain, setDomain] = useState("");
  const [da, setDa] = useState("90");
  const [pa, setPa] = useState("45");
  const [dr, setDr] = useState("92");
  const [traffic, setTraffic] = useState("Semrush Traffic - 2,398,250");
  const [semrushScore, setSemrushScore] = useState("85");
  const [spamScore, setSpamScore] = useState("1%");
  const [category, setCategory] = useState("News and Media");
  const [linkType, setLinkType] = useState<"DoFollow" | "NoFollow" | "Contextual">("NoFollow");
  const [sampleLink, setSampleLink] = useState("");
  const [country, setCountry] = useState("Worldwide");

  // Standard Pricing
  const [contentPlacementPrice, setContentPlacementPrice] = useState("150");
  const [linkInsertPrice, setLinkInsertPrice] = useState("100");

  // CBD Pricing
  const [cbdContentPlacementPrice, setCbdContentPlacementPrice] = useState("200");
  const [cbdContentCreationPlacementPrice, setCbdContentCreationPlacementPrice] = useState("250");
  const [cbdLinkInsertPrice, setCbdLinkInsertPrice] = useState("150");

  // Adult Pricing
  const [adultContentPlacementPrice, setAdultContentPlacementPrice] = useState("300");
  const [adultContentCreationPlacementPrice, setAdultContentCreationPlacementPrice] = useState("350");
  const [adultLinkInsertPrice, setAdultLinkInsertPrice] = useState("200");

  // Indexable & Sponsored
  const [indexable, setIndexable] = useState<"Yes" | "No">("Yes");
  const [sponsored, setSponsored] = useState<"No" | "Yes">("No");

  // Logo URL
  const [logoUrl, setLogoUrl] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Load current saved database on mount
  const loadDatabase = async () => {
    try {
      const res = await fetch("/api/db/custom-database");
      const data = await res.json();
      if (data.success) {
        setVercelBlobUrl(data.vercelBlobUrl || "");
        setInputBlobUrl(data.vercelBlobUrl || "");
        setRealSites(data.customSites || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadDatabase();
  }, []);

  // 1. Upload Excel / CSV directly from computer (All 22 columns supported)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsSyncing(true);
    setStatusMsg(null);

    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const arrayBuffer = evt.target?.result as ArrayBuffer;
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const rawJsonRows: any[] = XLSX.utils.sheet_to_json(worksheet);

        if (!rawJsonRows || rawJsonRows.length === 0) {
          setStatusMsg({ type: "error", text: "Selected file is empty or invalid format." });
          setIsSyncing(false);
          return;
        }

        const res = await fetch("/api/db/custom-database", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ customSites: rawJsonRows }),
        });

        const data = await res.json();
        if (data.success) {
          setStatusMsg({
            type: "success",
            text: `✅ Success! ${data.totalCount} real websites imported from "${file.name}" with all 22 attributes! These are now live on the buyer dashboard.`,
          });
          loadDatabase();
        } else {
          setStatusMsg({ type: "error", text: data.error || "Failed to save spreadsheet data." });
        }
      } catch (err: any) {
        setStatusMsg({ type: "error", text: `Error reading file: ${err.message}` });
      } finally {
        setIsSyncing(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    };

    reader.readAsArrayBuffer(file);
  };

  // 2. Connect Vercel Blob URL directly on own screen
  const handleSyncVercelBlob = async () => {
    if (!inputBlobUrl.trim()) {
      setStatusMsg({ type: "error", text: "Please enter your Vercel Blob Storage URL." });
      return;
    }

    setIsSyncing(true);
    setStatusMsg(null);

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
        setStatusMsg({
          type: "success",
          text: `✅ Vercel Blob connected! ${data.totalCount} websites are now live for users to download.`,
        });
        loadDatabase();
      } else {
        setStatusMsg({ type: "error", text: data.error || "Failed to sync Vercel Blob URL." });
      }
    } catch (err: any) {
      setStatusMsg({ type: "error", text: err?.message || "Sync failed" });
    } finally {
      setIsSyncing(false);
    }
  };

  // 3. Add Single Website with all 22 Fields
  const handleAddSingleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanDomain = domain.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
    if (!cleanDomain) {
      alert("Please enter a valid website domain");
      return;
    }

    setIsSyncing(true);
    setStatusMsg(null);

    try {
      const newSite = {
        domain: cleanDomain,
        da: parseInt(da, 10) || 50,
        pa: parseInt(pa, 10) || 40,
        dr: parseInt(dr, 10) || 60,
        traffic: traffic.trim() || "100,000+",
        semrushScore: semrushScore.trim() || "—",
        spamScore: spamScore.trim() || "1%",
        category: category.trim() || "General",
        niche: category.trim() || "General",
        linkType,
        sampleLink: sampleLink.trim(),
        country: country.trim() || "Worldwide",
        contentPlacementPrice: parseInt(contentPlacementPrice, 10) || 150,
        price: parseInt(contentPlacementPrice, 10) || 150,
        linkInsertPrice: parseInt(linkInsertPrice, 10) || 100,
        cbdContentPlacementPrice: parseInt(cbdContentPlacementPrice, 10) || 200,
        cbdContentCreationPlacementPrice: parseInt(cbdContentCreationPlacementPrice, 10) || 250,
        cbdLinkInsertPrice: parseInt(cbdLinkInsertPrice, 10) || 150,
        adultContentPlacementPrice: parseInt(adultContentPlacementPrice, 10) || 300,
        adultContentCreationPlacementPrice: parseInt(adultContentCreationPlacementPrice, 10) || 350,
        adultLinkInsertPrice: parseInt(adultLinkInsertPrice, 10) || 200,
        indexable: indexable === "Yes",
        sponsored: sponsored === "Yes",
        logoUrl: logoUrl.trim() || `https://www.google.com/s2/favicons?domain=${cleanDomain}&sz=128`,
      };

      const res = await fetch("/api/db/custom-database", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "add_single", site: newSite }),
      });

      const data = await res.json();
      if (data.success) {
        setStatusMsg({ type: "success", text: `✅ "${cleanDomain}" added successfully with all 22 attributes!` });
        setDomain("");
        loadDatabase();
      } else {
        setStatusMsg({ type: "error", text: data.error || "Could not save website" });
      }
    } catch (err: any) {
      setStatusMsg({ type: "error", text: err.message });
    } finally {
      setIsSyncing(false);
    }
  };

  // Delete a site
  const handleDeleteSite = async (siteId: string, domainName: string) => {
    if (!window.confirm(`Delete ${domainName} from live inventory?`)) return;
    try {
      const res = await fetch("/api/db/custom-database", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete_single", siteId, domain: domainName }),
      });
      const data = await res.json();
      if (data.success) {
        loadDatabase();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Clear all
  const handleClearAll = async () => {
    if (!window.confirm("Are you sure you want to delete all websites and start fresh?")) return;
    try {
      await fetch("/api/db/custom-database", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "clear" }),
      });
      setStatusMsg({ type: "success", text: "Database cleared." });
      loadDatabase();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-gray-100 flex flex-col font-sans selection:bg-purple-600 selection:text-white">
      {/* Top Header */}
      <header className="border-b border-gray-800 bg-[#0b1220] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
          <div>
            <h1 className="text-base sm:text-lg font-black text-white tracking-tight">
              Private Real Websites Database Manager
            </h1>
            <span className="text-[11px] text-gray-400 font-medium">
              Confidential Owner Portal • Input your 22-attribute client data directly here
            </span>
          </div>
        </div>

        <Link
          href="/buyer-dashboard"
          target="_blank"
          className="text-xs bg-gray-800 hover:bg-gray-700 text-emerald-400 font-bold px-3.5 py-2 rounded-xl transition-colors"
        >
          View Live Buyer Dashboard ↗
        </Link>
      </header>

      {/* Main Form Container */}
      <main className="max-w-6xl w-full mx-auto p-4 sm:p-8 space-y-6 flex-1">
        {/* Status Alert Notification */}
        {statusMsg && (
          <div
            className={`p-4 rounded-2xl text-xs font-bold border animate-in fade-in duration-150 ${
              statusMsg.type === "success"
                ? "bg-emerald-950/60 border-emerald-500/40 text-emerald-300"
                : "bg-rose-950/60 border-rose-500/40 text-rose-300"
            }`}
          >
            {statusMsg.text}
          </div>
        )}

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-[#0b1220] border border-gray-800 rounded-2xl">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
              Live Real Websites
            </span>
            <div className="text-2xl font-black text-white">
              {realSites.length.toLocaleString()}
            </div>
            <span className="text-[10px] text-emerald-400 block mt-1">
              Active on Buyer Dashboard
            </span>
          </div>

          <div className="p-4 bg-[#0b1220] border border-gray-800 rounded-2xl">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
              Supported Attributes
            </span>
            <div className="text-2xl font-black text-purple-400">
              22 Fields
            </div>
            <span className="text-[10px] text-gray-400 block mt-1">
              DA, PA, DR, Traffic, Semrush, CBD, Adult, Spam, etc.
            </span>
          </div>

          <div className="p-4 bg-[#0b1220] border border-gray-800 rounded-2xl flex flex-col justify-between">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
              Database Reset
            </span>
            <button
              type="button"
              onClick={handleClearAll}
              disabled={realSites.length === 0 && !vercelBlobUrl}
              className="text-xs text-rose-400 hover:text-rose-300 underline font-semibold disabled:opacity-30 cursor-pointer self-start"
            >
              Clear All Websites &amp; Reset
            </button>
          </div>
        </div>

        {/* 3 Input Methods Card */}
        <div className="bg-[#0b1220] border border-gray-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-4">
            <div>
              <h2 className="text-lg font-black text-white">
                Choose How You Want To Add Your Real Websites
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Add single site with all 22 fields, or upload an entire spreadsheet with these column names.
              </p>
            </div>

            {/* Method Tabs */}
            <div className="flex gap-2 p-1 bg-[#070b14] border border-gray-800 rounded-xl text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveTab("add_single")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === "add_single"
                    ? "bg-purple-600 text-white font-black shadow-md"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                ➕ Add One-By-One (22 Fields)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("upload_file")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === "upload_file"
                    ? "bg-purple-600 text-white font-black shadow-md"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                📁 Upload Excel / CSV
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("vercel_link")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === "vercel_link"
                    ? "bg-purple-600 text-white font-black shadow-md"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                🔗 Paste Vercel Link
              </button>
            </div>
          </div>

          {/* METHOD 1: FULL 22-FIELD ADD SINGLE WEBSITE FORM */}
          {activeTab === "add_single" && (
            <form onSubmit={handleAddSingleSubmit} className="space-y-6 animate-in fade-in duration-150">
              {/* SECTION A: GENERAL & SEO METRICS */}
              <div className="p-5 rounded-2xl bg-[#070b14] border border-gray-800 space-y-4">
                <div className="flex items-center gap-2 border-b border-gray-800 pb-2.5">
                  <span className="text-base">🌐</span>
                  <h3 className="text-xs font-black uppercase tracking-wider text-purple-400">
                    1. Core Website &amp; SEO Metrics
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
                  <div>
                    <label className="text-[11px] text-gray-300 font-bold block mb-1">
                      Website Domain *
                    </label>
                    <input
                      type="text"
                      required
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      placeholder="globenewswire.com"
                      className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-300 font-bold block mb-1">
                      Niche / Category
                    </label>
                    <input
                      type="text"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="News and Media, Tech, Finance"
                      className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-300 font-bold block mb-1">
                      Ahrefs DR
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={dr}
                      onChange={(e) => setDr(e.target.value)}
                      placeholder="92"
                      className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-300 font-bold block mb-1">
                      Moz DA
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={da}
                      onChange={(e) => setDa(e.target.value)}
                      placeholder="90"
                      className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-300 font-bold block mb-1">
                      Moz PA (Page Authority)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={pa}
                      onChange={(e) => setPa(e.target.value)}
                      placeholder="45"
                      className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-300 font-bold block mb-1">
                      Monthly Traffic
                    </label>
                    <input
                      type="text"
                      value={traffic}
                      onChange={(e) => setTraffic(e.target.value)}
                      placeholder="Semrush Traffic - 2,398,250"
                      className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-300 font-bold block mb-1">
                      Semrush Score
                    </label>
                    <input
                      type="text"
                      value={semrushScore}
                      onChange={(e) => setSemrushScore(e.target.value)}
                      placeholder="85"
                      className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-300 font-bold block mb-1">
                      Spam Score
                    </label>
                    <input
                      type="text"
                      value={spamScore}
                      onChange={(e) => setSpamScore(e.target.value)}
                      placeholder="1%"
                      className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-300 font-bold block mb-1">
                      Target Country
                    </label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="Worldwide, USA, UK"
                      className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-300 font-bold block mb-1">
                      Link Type
                    </label>
                    <select
                      value={linkType}
                      onChange={(e) => setLinkType(e.target.value as any)}
                      className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-400 cursor-pointer"
                    >
                      <option value="NoFollow">NoFollow</option>
                      <option value="DoFollow">DoFollow</option>
                      <option value="Contextual">Contextual</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION B: LINKS, INDEXING & LOGO */}
              <div className="p-5 rounded-2xl bg-[#070b14] border border-gray-800 space-y-4">
                <div className="flex items-center gap-2 border-b border-gray-800 pb-2.5">
                  <span className="text-base">🔗</span>
                  <h3 className="text-xs font-black uppercase tracking-wider text-emerald-400">
                    2. Verification, Attributes &amp; Logo
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
                  <div className="md:col-span-2">
                    <label className="text-[11px] text-gray-300 font-bold block mb-1">
                      Sample Link / Live Post URL
                    </label>
                    <input
                      type="url"
                      value={sampleLink}
                      onChange={(e) => setSampleLink(e.target.value)}
                      placeholder="https://globenewswire.com/news-release/..."
                      className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-300 font-bold block mb-1">
                      Indexable in Google
                    </label>
                    <select
                      value={indexable}
                      onChange={(e) => setIndexable(e.target.value as any)}
                      className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-400 cursor-pointer"
                    >
                      <option value="Yes">Yes (Google Indexable)</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-300 font-bold block mb-1">
                      Sponsored Tag
                    </label>
                    <select
                      value={sponsored}
                      onChange={(e) => setSponsored(e.target.value as any)}
                      className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-400 cursor-pointer"
                    >
                      <option value="No">No (Clean Editorial)</option>
                      <option value="Yes">Yes (Marked Sponsored)</option>
                    </select>
                  </div>

                  <div className="md:col-span-4">
                    <label className="text-[11px] text-gray-300 font-bold block mb-1">
                      Logo URL (Optional, auto-generated if left empty)
                    </label>
                    <input
                      type="url"
                      value={logoUrl}
                      onChange={(e) => setLogoUrl(e.target.value)}
                      placeholder="https://...logo.png"
                      className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-400 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION C: STANDARD PRICING ($ USD) */}
              <div className="p-5 rounded-2xl bg-[#070b14] border border-gray-800 space-y-4">
                <div className="flex items-center gap-2 border-b border-gray-800 pb-2.5">
                  <span className="text-base">💵</span>
                  <h3 className="text-xs font-black uppercase tracking-wider text-amber-400">
                    3. Standard Guest Post &amp; Link Insert Pricing ($ USD)
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] text-gray-300 font-bold block mb-1">
                      Content Placement Price ($ USD) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-400 text-xs font-bold">$</span>
                      <input
                        type="number"
                        required
                        value={contentPlacementPrice}
                        onChange={(e) => setContentPlacementPrice(e.target.value)}
                        placeholder="150"
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl pl-7 pr-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-400 font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-300 font-bold block mb-1">
                      Link Insert Price ($ USD)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-400 text-xs font-bold">$</span>
                      <input
                        type="number"
                        value={linkInsertPrice}
                        onChange={(e) => setLinkInsertPrice(e.target.value)}
                        placeholder="100"
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl pl-7 pr-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-400 font-bold"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION D: CBD & CANNABIS PRICING ($ USD) */}
              <div className="p-5 rounded-2xl bg-[#070b14] border border-gray-800 space-y-4">
                <div className="flex items-center gap-2 border-b border-gray-800 pb-2.5">
                  <span className="text-base">🌿</span>
                  <h3 className="text-xs font-black uppercase tracking-wider text-emerald-400">
                    4. CBD &amp; Cannabis Content Pricing ($ USD)
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[11px] text-gray-300 font-bold block mb-1">
                      CBD Content Placement Price ($)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-400 text-xs font-bold">$</span>
                      <input
                        type="number"
                        value={cbdContentPlacementPrice}
                        onChange={(e) => setCbdContentPlacementPrice(e.target.value)}
                        placeholder="200"
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl pl-7 pr-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-300 font-bold block mb-1">
                      CBD Content Creation &amp; Placement Price ($)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-400 text-xs font-bold">$</span>
                      <input
                        type="number"
                        value={cbdContentCreationPlacementPrice}
                        onChange={(e) => setCbdContentCreationPlacementPrice(e.target.value)}
                        placeholder="250"
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl pl-7 pr-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-300 font-bold block mb-1">
                      CBD Link Insert Price ($)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-400 text-xs font-bold">$</span>
                      <input
                        type="number"
                        value={cbdLinkInsertPrice}
                        onChange={(e) => setCbdLinkInsertPrice(e.target.value)}
                        placeholder="150"
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl pl-7 pr-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION E: ADULT / CASINO PRICING ($ USD) */}
              <div className="p-5 rounded-2xl bg-[#070b14] border border-gray-800 space-y-4">
                <div className="flex items-center gap-2 border-b border-gray-800 pb-2.5">
                  <span className="text-base">🔞</span>
                  <h3 className="text-xs font-black uppercase tracking-wider text-rose-400">
                    5. Adult &amp; Casino Content Pricing ($ USD)
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[11px] text-gray-300 font-bold block mb-1">
                      Adult Content Placement Price ($)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-400 text-xs font-bold">$</span>
                      <input
                        type="number"
                        value={adultContentPlacementPrice}
                        onChange={(e) => setAdultContentPlacementPrice(e.target.value)}
                        placeholder="300"
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl pl-7 pr-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-300 font-bold block mb-1">
                      Adult Content Creation &amp; Placement Price ($)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-400 text-xs font-bold">$</span>
                      <input
                        type="number"
                        value={adultContentCreationPlacementPrice}
                        onChange={(e) => setAdultContentCreationPlacementPrice(e.target.value)}
                        placeholder="350"
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl pl-7 pr-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-300 font-bold block mb-1">
                      Adult Link Insert Price ($)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-400 text-xs font-bold">$</span>
                      <input
                        type="number"
                        value={adultLinkInsertPrice}
                        onChange={(e) => setAdultLinkInsertPrice(e.target.value)}
                        placeholder="200"
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl pl-7 pr-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isSyncing}
                  className="px-8 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs uppercase tracking-wider cursor-pointer shadow-xl shadow-purple-500/25 transition-all hover:scale-102 active:scale-98"
                >
                  {isSyncing ? "Saving Website..." : "+ Save Website with 22 Attributes"}
                </button>
              </div>
            </form>
          )}

          {/* METHOD 2: UPLOAD EXCEL / CSV FILE DIRECTLY */}
          {activeTab === "upload_file" && (
            <div className="space-y-4 p-5 rounded-2xl bg-[#070b14] border border-purple-500/30 animate-in fade-in duration-150">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>📁</span>
                  <span>Upload Your Spreadsheet File (.xlsx, .xls, .csv):</span>
                </h3>
                <p className="text-xs text-gray-400">
                  Select your client’s real website spreadsheet. All 22 columns (Domain, DA, PA, DR, Traffic, Semrush, Spam, Category, Link Type, Sample Link, Country, Content Placement Price, Link Insert Price, CBD Pricing, Adult Pricing, Indexable, Sponsored, Logo URL) are automatically recognized!
                </p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx, .xls, .csv"
                onChange={handleFileUpload}
                className="block w-full text-xs text-gray-300 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-gradient-to-r file:from-purple-600 file:to-indigo-600 file:text-white hover:file:from-purple-500 hover:file:to-indigo-500 cursor-pointer pt-2"
              />

              {isSyncing && (
                <div className="text-xs text-purple-400 font-bold animate-pulse">
                  Importing your spreadsheet... Please wait.
                </div>
              )}
            </div>
          )}

          {/* METHOD 3: PASTE VERCEL BLOB STORAGE URL */}
          {activeTab === "vercel_link" && (
            <div className="space-y-4 p-5 rounded-2xl bg-[#070b14] border border-purple-500/30 animate-in fade-in duration-150">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>🔗</span>
                  <span>Paste Your Vercel Blob URL:</span>
                </h3>
                <p className="text-xs text-gray-400">
                  Paste the public URL of the Excel file you uploaded to Vercel Storage (Blob). All 22 columns will be extracted.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <input
                  type="url"
                  value={inputBlobUrl}
                  onChange={(e) => setInputBlobUrl(e.target.value)}
                  placeholder="https://...public.blob.vercel-storage.com/.../your-database.xlsx"
                  className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:border-purple-400 focus:outline-none"
                />
                <button
                  type="button"
                  disabled={isSyncing}
                  onClick={handleSyncVercelBlob}
                  className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl cursor-pointer shrink-0 transition-all shadow-md shadow-purple-500/20"
                >
                  {isSyncing ? "Connecting..." : "Connect & Save"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* CURRENTLY SAVED REAL WEBSITES TABLE */}
        {realSites.length > 0 && (
          <div className="bg-[#0b1220] border border-gray-800 rounded-3xl overflow-hidden shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-white">
                  Currently Live Real Websites ({realSites.length})
                </h3>
                <span className="text-xs text-gray-400">
                  Showing all 22 attributes for each site. These websites are live on the Buyer Dashboard.
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#070b14] text-gray-400 font-bold uppercase text-[10px] tracking-wider border-b border-gray-800">
                    <th className="py-2.5 px-3">#</th>
                    <th className="py-2.5 px-3">Domain</th>
                    <th className="py-2.5 px-3">Niche</th>
                    <th className="py-2.5 px-3">DR</th>
                    <th className="py-2.5 px-3">DA</th>
                    <th className="py-2.5 px-3">PA</th>
                    <th className="py-2.5 px-3">Traffic</th>
                    <th className="py-2.5 px-3">Semrush</th>
                    <th className="py-2.5 px-3">Spam</th>
                    <th className="py-2.5 px-3">Link</th>
                    <th className="py-2.5 px-3">Placement $</th>
                    <th className="py-2.5 px-3">Link Insert $</th>
                    <th className="py-2.5 px-3">CBD $</th>
                    <th className="py-2.5 px-3">Adult $</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/80">
                  {realSites.map((site, idx) => (
                    <tr key={site.id || site.domain + idx} className="hover:bg-gray-800/30 transition-colors">
                      <td className="py-2.5 px-3 text-gray-500 font-mono text-[11px]">{idx + 1}</td>
                      <td className="py-2.5 px-3 font-bold text-white flex items-center gap-1.5">
                        {site.logoUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={site.logoUrl}
                            alt=""
                            className="w-4 h-4 rounded-sm object-contain"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = "none";
                            }}
                          />
                        ) : null}
                        <span>{site.domain}</span>
                      </td>
                      <td className="py-2.5 px-3 text-gray-300">{site.category || site.niche}</td>
                      <td className="py-2.5 px-3 text-amber-400 font-bold">{site.dr}</td>
                      <td className="py-2.5 px-3 text-gray-300 font-bold">{site.da}</td>
                      <td className="py-2.5 px-3 text-gray-400">{site.pa || "—"}</td>
                      <td className="py-2.5 px-3 text-emerald-400 font-mono font-bold text-[11px]">{site.traffic || site.ahrefsTraffic || "—"}</td>
                      <td className="py-2.5 px-3 text-blue-400 font-mono">{site.semrushScore || "—"}</td>
                      <td className="py-2.5 px-3 text-rose-400 font-mono">{site.spamScore || "1%"}</td>
                      <td className="py-2.5 px-3">
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          {site.linkType || "DoFollow"}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-mono font-bold text-white">${site.contentPlacementPrice || site.price}</td>
                      <td className="py-2.5 px-3 font-mono text-gray-300">${site.linkInsertPrice || "—"}</td>
                      <td className="py-2.5 px-3 font-mono text-emerald-400">${site.cbdContentPlacementPrice || "—"}</td>
                      <td className="py-2.5 px-3 font-mono text-rose-400">${site.adultContentPlacementPrice || "—"}</td>
                      <td className="py-2.5 px-3 text-right">
                        <button
                          type="button"
                          onClick={() => handleDeleteSite(site.id || "", site.domain)}
                          className="text-rose-400 hover:text-rose-300 text-xs cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
