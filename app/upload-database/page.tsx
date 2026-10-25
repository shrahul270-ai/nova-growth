"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import * as XLSX from "xlsx";

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
}

export default function PrivateUploadDatabasePage() {
  const [realSites, setRealSites] = useState<RealWebsiteSite[]>([]);
  const [vercelBlobUrl, setVercelBlobUrl] = useState("");
  const [inputBlobUrl, setInputBlobUrl] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [activeTab, setActiveTab] = useState<"upload_file" | "vercel_link" | "add_single">("upload_file");

  // Single Site Form State
  const [domain, setDomain] = useState("");
  const [niche, setNiche] = useState("SaaS & Tech");
  const [dr, setDr] = useState("70");
  const [da, setDa] = useState("65");
  const [traffic, setTraffic] = useState("100,000+");
  const [country, setCountry] = useState("United States (USA)");
  const [linkType, setLinkType] = useState("DoFollow");
  const [price, setPrice] = useState("150");

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

  // 1. Upload Excel / CSV directly from computer
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
            text: `✅ Success! ${data.totalCount} real websites imported from "${file.name}"! These are now live on the buyer dashboard.`,
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

  // 3. Add Single Website
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
        niche,
        dr: parseInt(dr, 10) || 60,
        da: parseInt(da, 10) || 55,
        traffic,
        country,
        linkType,
        price: parseInt(price, 10) || 120,
      };

      const res = await fetch("/api/db/custom-database", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "add_single", site: newSite }),
      });

      const data = await res.json();
      if (data.success) {
        setStatusMsg({ type: "success", text: `✅ "${cleanDomain}" added successfully!` });
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
              Confidential Owner Portal • Input your client data here directly without sharing with anyone
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
      <main className="max-w-5xl w-full mx-auto p-6 sm:p-10 space-y-6 flex-1">
        {/* Status Alert Notification */}
        {statusMsg && (
          <div
            className={`p-4 rounded-2xl text-xs font-bold border ${
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
              Vercel Blob Storage Link
            </span>
            <div className="text-xs font-mono text-gray-300 truncate mt-1">
              {vercelBlobUrl ? vercelBlobUrl : "No Blob URL linked yet"}
            </div>
            <span className="text-[10px] text-gray-500 block mt-1">
              {vercelBlobUrl ? "Direct download enabled" : "Using spreadsheet rows"}
            </span>
          </div>

          <div className="p-4 bg-[#0b1220] border border-gray-800 rounded-2xl flex flex-col justify-between">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
              Reset Options
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
                Select any method below. Your data is saved directly to your site database.
              </p>
            </div>

            {/* Method Tabs */}
            <div className="flex gap-2 p-1 bg-[#070b14] border border-gray-800 rounded-xl text-xs font-bold">
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
              <button
                type="button"
                onClick={() => setActiveTab("add_single")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === "add_single"
                    ? "bg-purple-600 text-white font-black shadow-md"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                ➕ Add One-By-One
              </button>
            </div>
          </div>

          {/* METHOD 1: UPLOAD EXCEL / CSV FILE DIRECTLY */}
          {activeTab === "upload_file" && (
            <div className="space-y-4 p-5 rounded-2xl bg-[#070b14] border border-purple-500/30 animate-in fade-in duration-150">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>📁</span>
                  <span>Upload Your Real Spreadsheet File (.xlsx, .xls, .csv):</span>
                </h3>
                <p className="text-xs text-gray-400">
                  Select your client’s real website spreadsheet directly from your computer. Domain, DR, DA, Traffic, Category, Price columns are automatically detected and imported.
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

          {/* METHOD 2: PASTE VERCEL BLOB STORAGE URL */}
          {activeTab === "vercel_link" && (
            <div className="space-y-4 p-5 rounded-2xl bg-[#070b14] border border-purple-500/30 animate-in fade-in duration-150">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>🔗</span>
                  <span>Paste Your Vercel Blob URL:</span>
                </h3>
                <p className="text-xs text-gray-400">
                  Paste the public URL of the Excel file you uploaded to Vercel Storage (Blob). Only you see this screen.
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

          {/* METHOD 3: ADD WEBSITES ONE-BY-ONE VIA FORM */}
          {activeTab === "add_single" && (
            <form onSubmit={handleAddSingleSubmit} className="space-y-4 p-5 rounded-2xl bg-[#070b14] border border-purple-500/30 animate-in fade-in duration-150">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>➕</span>
                  <span>Add Website One-By-One:</span>
                </h3>
                <p className="text-xs text-gray-400">
                  Fill in the details for a single website and click "Save Website".
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                <div>
                  <label className="text-[10px] text-gray-400 uppercase font-bold block mb-1">
                    Website Domain *
                  </label>
                  <input
                    type="text"
                    required
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="example.com"
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-gray-400 uppercase font-bold block mb-1">
                    Niche / Category
                  </label>
                  <input
                    type="text"
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    placeholder="SaaS & Tech, Finance, Health"
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-gray-400 uppercase font-bold block mb-1">
                    Ahrefs DR
                  </label>
                  <input
                    type="number"
                    value={dr}
                    onChange={(e) => setDr(e.target.value)}
                    placeholder="70"
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-gray-400 uppercase font-bold block mb-1">
                    Moz DA
                  </label>
                  <input
                    type="number"
                    value={da}
                    onChange={(e) => setDa(e.target.value)}
                    placeholder="65"
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-gray-400 uppercase font-bold block mb-1">
                    Monthly Traffic
                  </label>
                  <input
                    type="text"
                    value={traffic}
                    onChange={(e) => setTraffic(e.target.value)}
                    placeholder="150,000+"
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-gray-400 uppercase font-bold block mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="United States (USA)"
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-gray-400 uppercase font-bold block mb-1">
                    Link Type
                  </label>
                  <select
                    value={linkType}
                    onChange={(e) => setLinkType(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                  >
                    <option value="DoFollow">DoFollow</option>
                    <option value="NoFollow">NoFollow</option>
                    <option value="Contextual">Contextual</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-gray-400 uppercase font-bold block mb-1">
                    Wholesale Price ($ USD)
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="120"
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isSyncing}
                  className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs cursor-pointer shadow-md transition-all"
                >
                  {isSyncing ? "Saving..." : "+ Save Website"}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* CURRENTLY SAVED REAL WEBSITES TABLE */}
        {realSites.length > 0 && (
          <div className="bg-[#0b1220] border border-gray-800 rounded-3xl overflow-hidden shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-white">
                Currently Live Real Websites ({realSites.length})
              </h3>
              <span className="text-xs text-gray-400">
                These websites are currently visible on the Buyer Dashboard.
              </span>
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
                    <th className="py-2.5 px-3">Traffic</th>
                    <th className="py-2.5 px-3">Price</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/80">
                  {realSites.slice(0, 50).map((site, idx) => (
                    <tr key={site.id || site.domain + idx} className="hover:bg-gray-800/30">
                      <td className="py-2.5 px-3 text-gray-500 font-mono text-[11px]">{idx + 1}</td>
                      <td className="py-2.5 px-3 font-bold text-white">{site.domain}</td>
                      <td className="py-2.5 px-3 text-gray-300">{site.niche}</td>
                      <td className="py-2.5 px-3 text-amber-400 font-bold">{site.dr}</td>
                      <td className="py-2.5 px-3 text-gray-300">{site.da}</td>
                      <td className="py-2.5 px-3 text-emerald-400 font-mono">{site.traffic || site.ahrefsTraffic || "—"}</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-white">${site.price}</td>
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
              {realSites.length > 50 && (
                <div className="p-3 text-center text-xs text-gray-500">
                  Showing first 50 of {realSites.length} websites... All are active and live!
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
