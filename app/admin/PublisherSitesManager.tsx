"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import * as XLSX from "xlsx";
import {
  PublisherSite,
  INITIAL_PUBLISHERS,
  getCustomPublishers,
  saveCustomPublisher,
  deleteCustomPublisher,
} from "../data/publishersData";

interface PublisherSitesManagerProps {
  onNotify: (msg: string) => void;
  isAddModalOpen: boolean;
  setIsAddModalOpen: (open: boolean) => void;
  activePreset?: string;
  onSelectSiteForOrder?: (site: PublisherSite) => void;
}

export default function PublisherSitesManager({
  onNotify,
  isAddModalOpen,
  setIsAddModalOpen,
  activePreset = "all",
  onSelectSiteForOrder,
}: PublisherSitesManagerProps) {
  const [customSites, setCustomSites] = useState<PublisherSite[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [sortField, setSortField] = useState<"dr" | "da" | "price" | "domain">("dr");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Form State for Adding New Site
  const [domain, setDomain] = useState("");
  const [niche, setNiche] = useState("SaaS & Tech");
  const [country, setCountry] = useState("United States (USA)");
  const [countryFlag, setCountryFlag] = useState("🇺🇸");
  const [language, setLanguage] = useState("English");
  const [dr, setDr] = useState("75");
  const [da, setDa] = useState("70");
  const [traffic, setTraffic] = useState("150,000+");
  const [linkType, setLinkType] = useState<"DoFollow" | "NoFollow" | "Contextual">("DoFollow");
  const [price, setPrice] = useState("29");
  const [isTopSelling, setIsTopSelling] = useState(false);
  const [isNewlyAdded, setIsNewlyAdded] = useState(true);

  // Sync custom sites on mount & when storage updates
  const refreshCustomSites = () => {
    setCustomSites(getCustomPublishers());
  };

  useEffect(() => {
    refreshCustomSites();
    const handler = () => refreshCustomSites();
    window.addEventListener("publishers-updated", handler);
    return () => window.removeEventListener("publishers-updated", handler);
  }, []);

  // Combined sites list
  const allSites: PublisherSite[] = useMemo(() => {
    return [...customSites, ...INITIAL_PUBLISHERS];
  }, [customSites]);

  // Categories list
  const categories = [
    "SaaS & Tech",
    "AI & Machine Learning",
    "Business & Startup",
    "Finance & Investment",
    "Cryptocurrency & Blockchain",
    "E-Commerce & Retail",
    "Digital Marketing & SEO",
    "Health & Medical",
    "Lifestyle & Relationships",
    "Travel & Hospitality",
    "Education & Careers",
    "Fashion & Beauty",
    "Home & Real Estate",
    "Food & Beverage",
    "Automotive",
    "Gaming & Esports",
    "Entertainment & Media",
    "News & Politics",
    "Sports & Outdoors",
    "Legal & Law",
    "Science & Research",
    "Environment & Sustainability",
    "Family & Parenting",
    "Pets & Animals",
    "Industrial & Manufacturing",
    "Art, Design & Photography",
    "Agriculture",
    "Home Improvement",
    "General",
  ];

  const countryFlagsMap: Record<string, string> = {
    "United States (USA)": "🇺🇸",
    "United Kingdom (UK)": "🇬🇧",
    "Canada": "🇨🇦",
    "Australia": "🇦🇺",
    "Germany": "🇩🇪",
    "France": "🇫🇷",
    "Netherlands": "🇳🇱",
    "Switzerland": "🇨🇭",
    "Sweden": "🇸🇪",
    "Norway": "🇳🇴",
    "Denmark": "🇩🇰",
    "Ireland": "🇮🇪",
    "Spain": "🇪🇸",
    "Italy": "🇮🇹",
    "Singapore": "🇸🇬",
    "United Arab Emirates (UAE)": "🇦🇪",
    "Japan": "🇯🇵",
    "South Korea": "🇰🇷",
    "Brazil": "🇧🇷",
    "India": "🇮🇳",
    "Global / International": "🌐",
  };

  // Filtered & Sorted Sites based on Active Sidebar Preset & User Inputs
  const filteredSites = useMemo(() => {
    return allSites
      .filter((site) => {
        // Preset filtering matching marketplace sidebar
        if (activePreset === "premium" && site.dr < 75 && !site.isTopSelling) return false;
        if (activePreset === "iplay" && !site.niche.toLowerCase().includes("gaming") && !site.niche.toLowerCase().includes("entertainment")) return false;
        if (activePreset === "top_selling" && !site.isTopSelling) return false;
        if (activePreset === "trusted" && (site.da < 65 || site.dr < 70)) return false;
        if (activePreset === "verified" && !site.indexable) return false;
        if (activePreset === "link_insertion" && site.linkType !== "DoFollow") return false;
        if (activePreset === "favorites" && !site.isTopSelling && !site.addedByAdmin) return false;
        if (activePreset === "forbidden" || activePreset === "blacklisted") return false;

        // Search filter
        if (search.trim()) {
          const q = search.toLowerCase().trim();
          const matchesDomain = site.domain.toLowerCase().includes(q);
          const matchesNiche = site.niche.toLowerCase().includes(q);
          const matchesCountry = site.country.toLowerCase().includes(q);
          if (!matchesDomain && !matchesNiche && !matchesCountry) return false;
        }

        // Category filter
        if (selectedCategory !== "all" && site.niche.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }

        // Country filter
        if (selectedCountry !== "all" && !site.country.toLowerCase().includes(selectedCountry.toLowerCase())) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        let diff = 0;
        if (sortField === "dr") diff = b.dr - a.dr;
        if (sortField === "da") diff = b.da - a.da;
        if (sortField === "price") diff = b.price - a.price;
        if (sortField === "domain") diff = a.domain.localeCompare(b.domain);
        return sortOrder === "desc" ? diff : -diff;
      });
  }, [allSites, activePreset, search, selectedCategory, selectedCountry, sortField, sortOrder]);

  const handleCountryChange = (c: string) => {
    setCountry(c);
    setCountryFlag(countryFlagsMap[c] || "🌐");
  };

  const handleAddSiteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanDomain = domain.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
    if (!cleanDomain) {
      onNotify("❌ Please enter a valid website domain");
      return;
    }

    const newSite: PublisherSite = {
      id: `pub-custom-${Date.now()}`,
      domain: cleanDomain,
      niche,
      country,
      countryFlag,
      language,
      dr: parseInt(dr, 10) || 60,
      da: parseInt(da, 10) || 55,
      ahrefsTraffic: traffic || "100,000+",
      linkType,
      price: parseInt(price, 10) || 29,
      tatDays: 2,
      indexable: true,
      sponsoredTag: false,
      isTopSelling,
      isNewlyAdded,
      addedByAdmin: true,
      createdAt: new Date().toISOString(),
    };

    saveCustomPublisher(newSite);
    refreshCustomSites();
    setIsAddModalOpen(false);
    onNotify(`✓ ${cleanDomain} added successfully to Guest Posting Marketplace!`);

    // Reset Form
    setDomain("");
    setPrice("29");
    setDr("75");
    setDa("70");
  };

  const handleDeleteCustomSite = (id: string, domainName: string) => {
    if (confirm(`Are you sure you want to delete ${domainName} from the marketplace?`)) {
      deleteCustomPublisher(id);
      refreshCustomSites();
      onNotify(`✓ ${domainName} removed from marketplace.`);
    }
  };

  // Vercel Blob & Excel Upload Sync State
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [inputBlobUrl, setInputBlobUrl] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatusMsg, setSyncStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSyncVercelBlob = async () => {
    if (!inputBlobUrl.trim()) {
      setSyncStatusMsg({ type: "error", text: "Please enter a valid Vercel Blob URL" });
      return;
    }
    setIsSyncing(true);
    setSyncStatusMsg(null);
    try {
      const res = await fetch("/api/db/custom-database", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "sync_blob", vercelBlobUrl: inputBlobUrl.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setSyncStatusMsg({
          type: "success",
          text: data.message || `Successfully synced! ${data.totalCount} sites loaded.`,
        });
        onNotify(`✓ Vercel Blob database synced! ${data.totalCount} sites active.`);
      } else {
        setSyncStatusMsg({ type: "error", text: data.error || "Failed to sync Vercel Blob URL." });
      }
    } catch (err: any) {
      setSyncStatusMsg({ type: "error", text: err?.message || "Sync error" });
    } finally {
      setIsSyncing(false);
    }
  };

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

        const res = await fetch("/api/db/custom-database", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ customSites: rawJsonRows }),
        });

        const data = await res.json();
        if (data.success) {
          setSyncStatusMsg({
            type: "success",
            text: `File uploaded successfully! ${data.totalCount} sites published to buyer dashboard.`,
          });
          onNotify(`✓ ${data.totalCount} websites published from ${file.name}!`);
        } else {
          setSyncStatusMsg({ type: "error", text: data.error || "Failed to save file." });
        }
      } catch (err: any) {
        setSyncStatusMsg({ type: "error", text: `Error reading file: ${err.message}` });
      } finally {
        setIsSyncing(false);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="space-y-6">
      {/* MARKETPLACE INVENTORY HEADER */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl font-black text-slate-900 tracking-tight">
              {filteredSites.length > 0 ? "123,042+" : "0"} Websites
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
              Live Marketplace
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Browse trusted publishers with high DR, DA, organic traffic and DoFollow links.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              setSyncStatusMsg(null);
              setIsSyncModalOpen(true);
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-md shadow-purple-500/20 flex items-center gap-1.5 cursor-pointer"
          >
            <span>⚡</span>
            <span>Sync Vercel Blob / Excel</span>
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#4a3aff] hover:bg-[#3d2ee0] text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-md shadow-indigo-500/20 flex items-center gap-1.5 cursor-pointer"
          >
            <span>+</span>
            <span>Add New Website</span>
          </button>
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search websites by domain, niche or country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:outline-none transition-all"
          />
          <span className="absolute left-3 top-3 text-slate-400 text-xs">🔍</span>
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 text-xs font-bold"
            >
              ✕
            </button>
          )}
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-semibold focus:outline-none cursor-pointer"
          >
            <option value="all">All Categories ({categories.length})</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* Country Filter */}
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-semibold focus:outline-none cursor-pointer"
          >
            <option value="all">All Countries</option>
            {Object.keys(countryFlagsMap).map((c) => (
              <option key={c} value={c}>
                {countryFlagsMap[c]} {c}
              </option>
            ))}
          </select>

          {/* Sort By Field */}
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value as any)}
            className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-semibold focus:outline-none cursor-pointer"
          >
            <option value="dr">Sort by DR</option>
            <option value="da">Sort by DA</option>
            <option value="price">Sort by Price</option>
            <option value="domain">Sort by Domain</option>
          </select>

          {/* Sort Order Toggle */}
          <button
            onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
            className="px-3 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 cursor-pointer"
          >
            {sortOrder === "desc" ? "High to Low ⬇" : "Low to High ⬆"}
          </button>
        </div>
      </div>

      {/* PUBLISHER SITES TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                <th className="py-3 px-4">Website</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3 text-center">DR</th>
                <th className="py-3 px-3 text-center">DA</th>
                <th className="py-3 px-3">Traffic</th>
                <th className="py-3 px-3">Country</th>
                <th className="py-3 px-3">Link Type</th>
                <th className="py-3 px-3">Price</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSites.length > 0 ? (
                filteredSites.map((site) => (
                  <tr key={site.id} className="hover:bg-blue-50/40 transition-colors group">
                    {/* Website Domain */}
                    <td className="py-3.5 px-4 font-semibold text-slate-800">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {site.domain}
                        </span>
                        {site.addedByAdmin && (
                          <span className="text-[9px] bg-purple-50 text-purple-700 border border-purple-200 font-bold px-1.5 py-0.5 rounded">
                            Custom
                          </span>
                        )}
                        {site.isTopSelling && (
                          <span className="text-[9px] bg-amber-50 text-amber-700 border border-amber-200 font-bold px-1.5 py-0.5 rounded">
                            Popular
                          </span>
                        )}
                        {site.isNewlyAdded && (
                          <span className="text-[9px] bg-blue-50 text-blue-700 border border-blue-200 font-bold px-1.5 py-0.5 rounded">
                            New
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-3">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-[11px] font-medium text-slate-700">
                        {site.niche}
                      </span>
                    </td>

                    {/* Ahrefs DR */}
                    <td className="py-3.5 px-3 text-center">
                      <span className="font-extrabold text-emerald-600 text-sm">
                        {site.dr}
                      </span>
                    </td>

                    {/* Moz DA */}
                    <td className="py-3.5 px-3 text-center">
                      <span className="font-bold text-slate-700">
                        {site.da}
                      </span>
                    </td>

                    {/* Monthly Traffic */}
                    <td className="py-3.5 px-3 font-semibold text-slate-600">
                      {site.ahrefsTraffic}
                    </td>

                    {/* Country Geo */}
                    <td className="py-3.5 px-3">
                      <span className="inline-flex items-center gap-1 font-medium text-slate-700">
                        <span>{site.countryFlag}</span>
                        <span>{site.country}</span>
                      </span>
                    </td>

                    {/* Link Type */}
                    <td className="py-3.5 px-3">
                      <span className="text-emerald-700 font-bold text-[11px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                        ✓ {site.linkType}
                      </span>
                    </td>

                    {/* Price (e.g. 29 USD) */}
                    <td className="py-3.5 px-3">
                      <span className="font-black text-slate-900 text-sm">
                        ${site.price} USD
                      </span>
                    </td>

                    {/* Action Button ("Buy USD" Button) */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            if (onSelectSiteForOrder) {
                              onSelectSiteForOrder(site);
                            } else {
                              onNotify(`Order initiated for ${site.domain} ($${site.price} USD)`);
                            }
                          }}
                          className="bg-[#4a3aff] hover:bg-[#3d2ee0] text-white font-extrabold px-3.5 py-1.5 rounded-xl text-xs transition-all shadow-sm cursor-pointer flex items-center gap-1"
                        >
                          <span>Buy</span>
                          <span>{site.price} USD</span>
                        </button>

                        {site.addedByAdmin && (
                          <button
                            onClick={() => handleDeleteCustomSite(site.id, site.domain)}
                            className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Delete custom site"
                          >
                            🗑️
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400">
                    <p className="text-sm font-bold text-slate-700 mb-1">No publisher websites matched your search</p>
                    <p className="text-xs text-slate-500">Try adjusting your filters or add a new site.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD NEW WEBSITE MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                  <span>🌐</span>
                  <span>Add New Publisher Website</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Publish a new site directly to the marketplace and admin inventory.
                </p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold flex items-center justify-center text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleAddSiteSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Website Domain Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. techcrunch-media.com"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Niche / Category
                  </label>
                  <select
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-medium focus:outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Country Geo
                  </label>
                  <select
                    value={country}
                    onChange={(e) => handleCountryChange(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-medium focus:outline-none"
                  >
                    {Object.keys(countryFlagsMap).map((c) => (
                      <option key={c} value={c}>
                        {countryFlagsMap[c]} {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Ahrefs DR (0-100)</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={dr}
                    onChange={(e) => setDr(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none font-bold text-center"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Moz DA (0-100)</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={da}
                    onChange={(e) => setDa(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none font-bold text-center"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Guest Post Price ($ USD)</label>
                  <input
                    type="number"
                    min="1"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-blue-700 font-black text-center"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Monthly Traffic</label>
                  <input
                    type="text"
                    value={traffic}
                    onChange={(e) => setTraffic(e.target.value)}
                    placeholder="e.g. 250,000+"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Link Type</label>
                  <select
                    value={linkType}
                    onChange={(e) => setLinkType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-medium focus:outline-none"
                  >
                    <option value="DoFollow">DoFollow</option>
                    <option value="NoFollow">NoFollow</option>
                    <option value="Contextual">Contextual</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isTopSelling}
                    onChange={(e) => setIsTopSelling(e.target.checked)}
                    className="rounded accent-blue-600"
                  />
                  <span>Mark as Popular / Top Selling</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isNewlyAdded}
                    onChange={(e) => setIsNewlyAdded(e.target.checked)}
                    className="rounded accent-blue-600"
                  />
                  <span>Mark as Newly Added</span>
                </label>
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#4a3aff] hover:bg-[#3d2ee0] text-white text-xs font-bold shadow-md shadow-indigo-500/20 cursor-pointer"
                >
                  Save &amp; Publish Website
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VERCEL BLOB / EXCEL SYNC MODAL */}
      {isSyncModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">⚡</span>
                <h3 className="text-base font-black text-slate-900">
                  Connect Vercel Blob / Upload Excel
                </h3>
              </div>
              <button
                onClick={() => setIsSyncModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            {syncStatusMsg && (
              <div
                className={`p-3 rounded-xl text-xs font-bold ${
                  syncStatusMsg.type === "success"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-rose-50 text-rose-700 border border-rose-200"
                }`}
              >
                {syncStatusMsg.text}
              </div>
            )}

            {/* Vercel Blob URL input */}
            <div className="space-y-1.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <label className="text-xs font-bold text-slate-800 block">
                Option 1: Paste Vercel Blob Storage URL
              </label>
              <p className="text-[11px] text-slate-500">
                Paste the public URL of your Excel or CSV file from Vercel Blob Storage:
              </p>
              <div className="flex gap-2 pt-1">
                <input
                  type="url"
                  value={inputBlobUrl}
                  onChange={(e) => setInputBlobUrl(e.target.value)}
                  placeholder="https://...public.blob.vercel-storage.com/.../database.xlsx"
                  className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-mono focus:border-purple-500 focus:outline-none"
                />
                <button
                  type="button"
                  disabled={isSyncing}
                  onClick={handleSyncVercelBlob}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shrink-0"
                >
                  {isSyncing ? "Syncing..." : "Sync"}
                </button>
              </div>
            </div>

            {/* Direct File Upload */}
            <div className="space-y-1.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <label className="text-xs font-bold text-slate-800 block">
                Option 2: Direct Excel (.xlsx) / CSV File Upload
              </label>
              <p className="text-[11px] text-slate-500">
                Upload a spreadsheet directly from your computer to populate the buyer dashboard:
              </p>
              <input
                type="file"
                accept=".xlsx, .xls, .csv"
                onChange={handleFileUpload}
                className="block w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer pt-1"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setIsSyncModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
