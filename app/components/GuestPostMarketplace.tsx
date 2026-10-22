"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";

export interface PublisherSite {
  id: string;
  domain: string;
  niche: string;
  language: string;
  country: string;
  countryFlag: string;
  dr: number;
  da: number;
  ahrefsTraffic: string;
  semrushTraffic: string;
  linkType: "DoFollow" | "NoFollow" | "Contextual";
  price: number;
  tatDays: number;
  indexable: boolean;
  sponsoredTag: boolean;
  isTopSelling?: boolean;
  isNewlyAdded?: boolean;
  sampleUrl?: string;
}

// Initial high-quality starter inventory (Ready to be populated with 40,000+ sites)
const initialPublishers: PublisherSite[] = [
  {
    id: "pub-01",
    domain: "techbeacon-daily.com",
    niche: "SaaS & Tech",
    language: "English",
    country: "USA",
    countryFlag: "🇺🇸",
    dr: 84,
    da: 79,
    ahrefsTraffic: "340,000+",
    semrushTraffic: "410,000+",
    linkType: "DoFollow",
    price: 320,
    tatDays: 2,
    indexable: true,
    sponsoredTag: false,
    isTopSelling: true,
  },
  {
    id: "pub-02",
    domain: "venturepulse-media.io",
    niche: "Business & Startup",
    language: "English",
    country: "USA",
    countryFlag: "🇺🇸",
    dr: 78,
    da: 74,
    ahrefsTraffic: "195,000+",
    semrushTraffic: "230,000+",
    linkType: "DoFollow",
    price: 280,
    tatDays: 3,
    indexable: true,
    sponsoredTag: false,
    isNewlyAdded: true,
  },
  {
    id: "pub-03",
    domain: "globalfinwire.co.uk",
    niche: "Finance & Crypto",
    language: "English",
    country: "UK",
    countryFlag: "🇬🇧",
    dr: 88,
    da: 82,
    ahrefsTraffic: "620,000+",
    semrushTraffic: "740,000+",
    linkType: "DoFollow",
    price: 490,
    tatDays: 4,
    indexable: true,
    sponsoredTag: false,
    isTopSelling: true,
  },
  {
    id: "pub-04",
    domain: "retailchronicle-trends.com",
    niche: "E-Commerce",
    language: "English",
    country: "USA",
    countryFlag: "🇺🇸",
    dr: 76,
    da: 71,
    ahrefsTraffic: "145,000+",
    semrushTraffic: "180,000+",
    linkType: "DoFollow",
    price: 240,
    tatDays: 2,
    indexable: true,
    sponsoredTag: false,
  },
  {
    id: "pub-05",
    domain: "healthpulse-journal.org",
    niche: "Health & Medical",
    language: "English",
    country: "Canada",
    countryFlag: "🇨🇦",
    dr: 72,
    da: 68,
    ahrefsTraffic: "110,000+",
    semrushTraffic: "135,000+",
    linkType: "DoFollow",
    price: 210,
    tatDays: 3,
    indexable: true,
    sponsoredTag: false,
  },
  {
    id: "pub-06",
    domain: "martech-insider.net",
    niche: "Digital Marketing",
    language: "English",
    country: "USA",
    countryFlag: "🇺🇸",
    dr: 81,
    da: 77,
    ahrefsTraffic: "280,000+",
    semrushTraffic: "310,000+",
    linkType: "DoFollow",
    price: 310,
    tatDays: 2,
    indexable: true,
    sponsoredTag: false,
    isTopSelling: true,
  },
  {
    id: "pub-07",
    domain: "australianbiz-herald.com.au",
    niche: "Business & Startup",
    language: "English",
    country: "Australia",
    countryFlag: "🇦🇺",
    dr: 75,
    da: 70,
    ahrefsTraffic: "130,000+",
    semrushTraffic: "160,000+",
    linkType: "DoFollow",
    price: 260,
    tatDays: 3,
    indexable: true,
    sponsoredTag: false,
    isNewlyAdded: true,
  },
  {
    id: "pub-08",
    domain: "cryptoledger-daily.com",
    niche: "Finance & Crypto",
    language: "English",
    country: "USA",
    countryFlag: "🇺🇸",
    dr: 79,
    da: 73,
    ahrefsTraffic: "220,000+",
    semrushTraffic: "270,000+",
    linkType: "DoFollow",
    price: 350,
    tatDays: 2,
    indexable: true,
    sponsoredTag: false,
  },
  {
    id: "pub-09",
    domain: "clouddevops-review.io",
    niche: "SaaS & Tech",
    language: "English",
    country: "Germany",
    countryFlag: "🇩🇪",
    dr: 86,
    da: 80,
    ahrefsTraffic: "490,000+",
    semrushTraffic: "530,000+",
    linkType: "DoFollow",
    price: 420,
    tatDays: 3,
    indexable: true,
    sponsoredTag: false,
  },
  {
    id: "pub-10",
    domain: "urbanliving-lifestyle.com",
    niche: "Lifestyle & Travel",
    language: "English",
    country: "USA",
    countryFlag: "🇺🇸",
    dr: 69,
    da: 65,
    ahrefsTraffic: "92,000+",
    semrushTraffic: "115,000+",
    linkType: "DoFollow",
    price: 180,
    tatDays: 2,
    indexable: true,
    sponsoredTag: false,
  },
];

export default function GuestPostMarketplace() {
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [selectedLinkType, setSelectedLinkType] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState("All");
  
  // Numerical ranges
  const [minDa, setMinDa] = useState<string>("");
  const [maxDa, setMaxDa] = useState<string>("");
  const [minDr, setMinDr] = useState<string>("");
  const [maxDr, setMaxDr] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [maxTat, setMaxTat] = useState<string>("");

  // Quick preset filters
  const [quickFilter, setQuickFilter] = useState<"all" | "top_selling" | "newly_added" | "high_dr">("all");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(true);

  // Bulk Search Modal State
  const [isBulkSearchOpen, setIsBulkSearchOpen] = useState(false);
  const [bulkInput, setBulkInput] = useState("");

  // Order / Inquiry Modal State
  const [selectedSiteForOrder, setSelectedSiteForOrder] = useState<PublisherSite | null>(null);

  // Categories list
  const categories = [
    "All",
    "SaaS & Tech",
    "Business & Startup",
    "Finance & Crypto",
    "E-Commerce",
    "Health & Medical",
    "Digital Marketing",
    "Lifestyle & Travel",
  ];

  const countries = ["All", "USA", "UK", "Canada", "Australia", "Germany"];
  const languages = ["All", "English", "Spanish", "German", "French"];
  const linkTypes = ["All", "DoFollow", "NoFollow", "Contextual"];

  // Filter logic
  const filteredSites = useMemo(() => {
    return initialPublishers.filter((site) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesDomain = site.domain.toLowerCase().includes(q);
        const matchesNiche = site.niche.toLowerCase().includes(q);
        if (!matchesDomain && !matchesNiche) return false;
      }

      // Quick filter
      if (quickFilter === "top_selling" && !site.isTopSelling) return false;
      if (quickFilter === "newly_added" && !site.isNewlyAdded) return false;
      if (quickFilter === "high_dr" && site.dr < 80) return false;

      // Category
      if (selectedCategory !== "All" && site.niche !== selectedCategory) return false;

      // Language
      if (selectedLanguage !== "All" && site.language !== selectedLanguage) return false;

      // Link Type
      if (selectedLinkType !== "All" && site.linkType !== selectedLinkType) return false;

      // Country
      if (selectedCountry !== "All" && site.country !== selectedCountry) return false;

      // DA bounds
      if (minDa && site.da < Number(minDa)) return false;
      if (maxDa && site.da > Number(maxDa)) return false;

      // DR bounds
      if (minDr && site.dr < Number(minDr)) return false;
      if (maxDr && site.dr > Number(maxDr)) return false;

      // Price bounds
      if (minPrice && site.price < Number(minPrice)) return false;
      if (maxPrice && site.price > Number(maxPrice)) return false;

      // TAT
      if (maxTat && site.tatDays > Number(maxTat)) return false;

      return true;
    });
  }, [
    searchQuery,
    quickFilter,
    selectedCategory,
    selectedLanguage,
    selectedLinkType,
    selectedCountry,
    minDa,
    maxDa,
    minDr,
    maxDr,
    minPrice,
    maxPrice,
    maxTat,
  ]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedLanguage("All");
    setSelectedLinkType("All");
    setSelectedCountry("All");
    setMinDa("");
    setMaxDa("");
    setMinDr("");
    setMaxDr("");
    setMinPrice("");
    setMaxPrice("");
    setMaxTat("");
    setQuickFilter("all");
  };

  const handleApplyBulkSearch = () => {
    if (!bulkInput.trim()) return;
    const lines = bulkInput
      .split(/[\n,]+/)
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
    if (lines.length > 0) {
      setSearchQuery(lines[0]);
    }
    setIsBulkSearchOpen(false);
  };

  return (
    <section id="marketplace" className="py-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-t border-gray-800/80">
      
      {/* SECTION HEADER WITH STATS */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-blue-400 mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Live Marketplace Inventory
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
            <span>40,000+ Verified Publisher Websites</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-2xl">
            Filter high-authority publications by Moz DA, Ahrefs DR, real organic traffic, niche, and country.
            100% white-hat contextual placements with indexation warranty.
          </p>
        </div>

        {/* Live inventory badge */}
        <div className="flex items-center gap-2 text-xs bg-[#0b1220] border border-gray-800 py-2 px-4 rounded-xl shadow-xs self-start md:self-auto">
          <span className="text-gray-400">Showing:</span>
          <span className="font-extrabold text-amber-400">{filteredSites.length}</span>
          <span className="text-gray-500">of 40,000+ Active Sites</span>
        </div>
      </div>

      {/* FILTER CONTROL PANEL (Unique Modern Dark Glassmorphism) */}
      <div className="bg-[#0b1220]/90 border border-gray-800/90 rounded-2xl p-5 shadow-2xl backdrop-blur-xl mb-8">
        
        {/* Top Search & Primary Action Row */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 pb-5 border-b border-gray-800/80">
          {/* Main Keyword / Domain Search Input */}
          <div className="relative flex-1">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search from 40,000+ websites by domain, niche or keyword..."
              className="w-full bg-[#070b14] border border-gray-700/80 rounded-xl pl-10 pr-4 py-2.5 text-base sm:text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setIsBulkSearchOpen(true)}
              className="px-3.5 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-bold text-xs border border-gray-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Bulk check multiple domains"
            >
              <span>📋</span>
              <span>Bulk Search</span>
            </button>

            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`px-3.5 py-2.5 rounded-xl font-bold text-xs border transition-colors flex items-center gap-1.5 cursor-pointer ${
                showAdvancedFilters
                  ? "bg-blue-600/20 border-blue-500/50 text-blue-300"
                  : "bg-gray-800 hover:bg-gray-700 border-gray-700 text-gray-300"
              }`}
            >
              <span>⚙</span>
              <span>{showAdvancedFilters ? "Hide Filters" : "Filter Options"}</span>
            </button>

            <button
              onClick={handleResetFilters}
              className="px-3.5 py-2.5 rounded-xl bg-gray-800/80 hover:bg-red-950/40 text-gray-400 hover:text-red-300 font-semibold text-xs border border-gray-800 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* EXPANDABLE MULTI-CRITERIA FILTERS GRID */}
        {showAdvancedFilters && (
          <div className="pt-5 space-y-4">
            {/* Row 1: Dropdown Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 text-xs">
              
              {/* Category / Niche */}
              <div>
                <label className="block text-gray-400 text-[11px] font-semibold mb-1">
                  Category / Niche
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-[#070b14] border border-gray-700 rounded-xl px-2.5 py-2 text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  {categories.map((c) => (
                    <option key={c} value={c} className="bg-[#070b14]">
                      {c === "All" ? "All Categories" : c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Target Country */}
              <div>
                <label className="block text-gray-400 text-[11px] font-semibold mb-1">
                  Target Country
                </label>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full bg-[#070b14] border border-gray-700 rounded-xl px-2.5 py-2 text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  {countries.map((ct) => (
                    <option key={ct} value={ct} className="bg-[#070b14]">
                      {ct === "All" ? "All Countries" : ct}
                    </option>
                  ))}
                </select>
              </div>

              {/* Link Type */}
              <div>
                <label className="block text-gray-400 text-[11px] font-semibold mb-1">
                  Link Attribute
                </label>
                <select
                  value={selectedLinkType}
                  onChange={(e) => setSelectedLinkType(e.target.value)}
                  className="w-full bg-[#070b14] border border-gray-700 rounded-xl px-2.5 py-2 text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  {linkTypes.map((lt) => (
                    <option key={lt} value={lt} className="bg-[#070b14]">
                      {lt === "All" ? "All Link Types" : lt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Language */}
              <div>
                <label className="block text-gray-400 text-[11px] font-semibold mb-1">
                  Language
                </label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full bg-[#070b14] border border-gray-700 rounded-xl px-2.5 py-2 text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  {languages.map((l) => (
                    <option key={l} value={l} className="bg-[#070b14]">
                      {l === "All" ? "All Languages" : l}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 2: Metric Ranges (Ahrefs DR, Moz DA, Price, TAT) */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 text-xs pt-1">
              {/* DR Min / Max */}
              <div>
                <label className="block text-gray-400 text-[11px] font-semibold mb-1">
                  Ahrefs DR Range
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minDr}
                    onChange={(e) => setMinDr(e.target.value)}
                    className="w-1/2 bg-[#070b14] border border-gray-700 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxDr}
                    onChange={(e) => setMaxDr(e.target.value)}
                    className="w-1/2 bg-[#070b14] border border-gray-700 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* DA Min / Max */}
              <div>
                <label className="block text-gray-400 text-[11px] font-semibold mb-1">
                  Moz DA Range
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minDa}
                    onChange={(e) => setMinDa(e.target.value)}
                    className="w-1/2 bg-[#070b14] border border-gray-700 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxDa}
                    onChange={(e) => setMaxDa(e.target.value)}
                    className="w-1/2 bg-[#070b14] border border-gray-700 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Price Min / Max */}
              <div>
                <label className="block text-gray-400 text-[11px] font-semibold mb-1">
                  Price ($ USD)
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    placeholder="Min $"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-1/2 bg-[#070b14] border border-gray-700 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    placeholder="Max $"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-1/2 bg-[#070b14] border border-gray-700 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Turnaround Time (Days) */}
              <div>
                <label className="block text-gray-400 text-[11px] font-semibold mb-1">
                  Max TAT (Days)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 3 Days"
                  value={maxTat}
                  onChange={(e) => setMaxTat(e.target.value)}
                  className="w-full bg-[#070b14] border border-gray-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Quick Segment Filter Badges */}
            <div className="pt-3 flex flex-wrap items-center gap-2 border-t border-gray-800/60">
              <span className="text-[11px] text-gray-400 font-bold mr-1">Quick Filters:</span>
              
              <button
                onClick={() => setQuickFilter("all")}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  quickFilter === "all"
                    ? "bg-amber-500 text-black shadow-xs font-bold"
                    : "bg-gray-800/80 hover:bg-gray-700 text-gray-300"
                }`}
              >
                All Publishers
              </button>

              <button
                onClick={() => setQuickFilter("top_selling")}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                  quickFilter === "top_selling"
                    ? "bg-amber-500 text-black shadow-xs font-bold"
                    : "bg-gray-800/80 hover:bg-gray-700 text-gray-300"
                }`}
              >
                <span>🔥</span> Top Selling
              </button>

              <button
                onClick={() => setQuickFilter("newly_added")}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                  quickFilter === "newly_added"
                    ? "bg-amber-500 text-black shadow-xs font-bold"
                    : "bg-gray-800/80 hover:bg-gray-700 text-gray-300"
                }`}
              >
                <span>✨</span> Newly Added
              </button>

              <button
                onClick={() => setQuickFilter("high_dr")}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                  quickFilter === "high_dr"
                    ? "bg-amber-500 text-black shadow-xs font-bold"
                    : "bg-gray-800/80 hover:bg-gray-700 text-gray-300"
                }`}
              >
                <span>⭐</span> DR 80+ Authority
              </button>
            </div>
          </div>
        )}
      </div>

      {/* MARKETPLACE INVENTORY CONTAINER */}
      <div className="bg-[#0b1220] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
        
        {/* Mobile Cards View (Visible on small screens < md) */}
        <div className="block md:hidden divide-y divide-gray-800/80 p-3">
          {filteredSites.length > 0 ? (
            filteredSites.map((site) => (
              <div key={`m-${site.id}`} className="py-4 first:pt-1 last:pb-1 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                      <span className="font-bold text-white text-sm break-all">{site.domain}</span>
                      {site.isTopSelling && (
                        <span className="text-[9px] bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold px-1.5 py-0.5 rounded">
                          Popular
                        </span>
                      )}
                      {site.isNewlyAdded && (
                        <span className="text-[9px] bg-blue-500/10 text-blue-400 border border-blue-500/30 font-bold px-1.5 py-0.5 rounded">
                          New
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-400">
                      <span className="px-2 py-0.5 rounded bg-gray-800 text-[11px] text-gray-300">
                        {site.niche}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <span>{site.countryFlag}</span>
                        <span>{site.country}</span>
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-black text-amber-400 text-lg block leading-none">
                      ${site.price}
                    </span>
                    <span className="text-[10px] text-gray-400">{site.tatDays}d delivery</span>
                  </div>
                </div>

                {/* 3 Metric Pills on Mobile */}
                <div className="grid grid-cols-3 gap-2 bg-[#070b14] p-2.5 rounded-xl border border-gray-800 text-center">
                  <div>
                    <span className="text-[10px] text-gray-500 block">Ahrefs DR</span>
                    <span className="text-emerald-400 font-extrabold text-sm">{site.dr}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 block">Moz DA</span>
                    <span className="text-gray-300 font-bold text-sm">{site.da}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 block">Traffic</span>
                    <span className="text-white font-bold text-xs truncate block">{site.ahrefsTraffic}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 pt-1">
                  <span className="text-emerald-400 text-xs font-semibold">
                    ✓ {site.linkType}
                  </span>
                  <button
                    onClick={() => setSelectedSiteForOrder(site)}
                    className="flex-1 max-w-[140px] py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-xs shadow-md shadow-amber-500/10 cursor-pointer text-center"
                  >
                    Order Link →
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-10 text-center text-gray-500">
              <div className="text-3xl mb-2">🔍</div>
              <p className="font-semibold text-white text-sm">No websites found</p>
              <button
                onClick={handleResetFilters}
                className="mt-3 px-4 py-1.5 bg-gray-800 text-amber-400 text-xs font-bold rounded-xl"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Desktop Table View (Visible on md and up) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[850px]">
            <thead>
              <tr className="bg-[#0e172a] text-gray-400 text-[11px] font-extrabold uppercase tracking-wider border-b border-gray-800">
                <th className="py-3.5 px-4">Publisher Domain</th>
                <th className="py-3.5 px-3">Category</th>
                <th className="py-3.5 px-3">Ahrefs DR</th>
                <th className="py-3.5 px-3">Moz DA</th>
                <th className="py-3.5 px-3">Monthly Traffic</th>
                <th className="py-3.5 px-3">Geo</th>
                <th className="py-3.5 px-3">Type</th>
                <th className="py-3.5 px-3">TAT</th>
                <th className="py-3.5 px-3">Placement Price</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 text-xs text-gray-300">
              {filteredSites.length > 0 ? (
                filteredSites.map((site) => (
                  <tr
                    key={site.id}
                    className="hover:bg-gray-800/40 transition-colors group"
                  >
                    {/* Domain & Badge */}
                    <td className="py-3.5 px-4 font-semibold text-white">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span className="group-hover:text-amber-400 transition-colors">{site.domain}</span>
                        {site.isTopSelling && (
                          <span className="text-[9px] bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold px-1.5 py-0.5 rounded">
                            Popular
                          </span>
                        )}
                        {site.isNewlyAdded && (
                          <span className="text-[9px] bg-blue-500/10 text-blue-400 border border-blue-500/30 font-bold px-1.5 py-0.5 rounded">
                            New
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-3">
                      <span className="px-2 py-0.5 rounded-md bg-gray-800 text-[11px] font-medium text-gray-300">
                        {site.niche}
                      </span>
                    </td>

                    {/* Ahrefs DR */}
                    <td className="py-3.5 px-3">
                      <span className="font-extrabold text-emerald-400 text-sm">
                        {site.dr}
                      </span>
                    </td>

                    {/* Moz DA */}
                    <td className="py-3.5 px-3">
                      <span className="font-bold text-gray-300">
                        {site.da}
                      </span>
                    </td>

                    {/* Organic Traffic */}
                    <td className="py-3.5 px-3">
                      <div className="font-bold text-white text-xs">
                        {site.ahrefsTraffic}
                      </div>
                      <span className="text-[9px] text-gray-500">Ahrefs verified</span>
                    </td>

                    {/* Country Geo */}
                    <td className="py-3.5 px-3">
                      <span className="inline-flex items-center gap-1 font-semibold">
                        <span>{site.countryFlag}</span>
                        <span>{site.country}</span>
                      </span>
                    </td>

                    {/* Link Type */}
                    <td className="py-3.5 px-3">
                      <span className="text-emerald-400 font-bold text-[11px]">
                        ✓ {site.linkType}
                      </span>
                    </td>

                    {/* Turnaround Time */}
                    <td className="py-3.5 px-3 text-gray-400 font-medium">
                      {site.tatDays} Days
                    </td>

                    {/* Price */}
                    <td className="py-3.5 px-3">
                      <span className="font-black text-amber-400 text-sm">
                        ${site.price}
                      </span>
                    </td>

                    {/* Action Button */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedSiteForOrder(site)}
                        className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-xs shadow-md shadow-amber-500/10 cursor-pointer transition-all"
                      >
                        Order Link →
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-gray-500">
                    <div className="text-3xl mb-2">🔍</div>
                    <p className="font-semibold text-white">No websites matched your exact filter criteria</p>
                    <p className="text-xs text-gray-400 mt-1">Try resetting filters or searching with different terms</p>
                    <button
                      onClick={handleResetFilters}
                      className="mt-3 px-4 py-1.5 bg-gray-800 hover:bg-gray-700 text-amber-400 text-xs font-bold rounded-xl cursor-pointer"
                    >
                      Reset All Filters
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Bar of Table: Bulk Inquiries & Pagination note */}
        <div className="p-4 bg-[#070b14] border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <div>
            Showing <strong className="text-white">{filteredSites.length}</strong> publishers matching your criteria.
          </div>
          <div className="flex items-center gap-3">
            <span>Need a custom publisher not in this list?</span>
            <Link
              href="/contact"
              className="text-amber-400 hover:text-amber-300 font-bold underline underline-offset-2"
            >
              Request Custom Manual Outreach ↗
            </Link>
          </div>
        </div>
      </div>

      {/* BULK SEARCH MODAL */}
      {isBulkSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b1220] border border-gray-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>📋</span> Bulk Domain Inventory Search
              </h3>
              <button
                onClick={() => setIsBulkSearchOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-gray-400">
              Paste up to 50 domains or keywords (one per line) to check availability in Nova Growth&apos;s 40,000+ publisher database.
            </p>
            <textarea
              rows={6}
              value={bulkInput}
              onChange={(e) => setBulkInput(e.target.value)}
              placeholder="forbes.com&#10;techcrunch.com&#10;businessinsider.com"
              className="w-full bg-[#070b14] border border-gray-700 rounded-xl p-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-amber-500 font-mono"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsBulkSearchOpen(false)}
                className="px-4 py-2 rounded-xl bg-gray-800 text-gray-300 hover:text-white text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyBulkSearch}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-extrabold cursor-pointer"
              >
                Check Inventory Availability
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ORDER / PLACEMENT INQUIRY MODAL */}
      {selectedSiteForOrder && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b1220] border border-gray-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Placement Booking</span>
                <h3 className="text-base font-black text-white">{selectedSiteForOrder.domain}</h3>
              </div>
              <button
                onClick={() => setSelectedSiteForOrder(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-3 bg-[#070b14] rounded-xl border border-gray-800/80 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Ahrefs DR:</span>
                <span className="font-bold text-emerald-400">{selectedSiteForOrder.dr}+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Monthly Traffic:</span>
                <span className="font-bold text-white">{selectedSiteForOrder.ahrefsTraffic}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Turnaround Time:</span>
                <span className="font-bold text-white">{selectedSiteForOrder.tatDays} Days</span>
              </div>
              <div className="flex justify-between border-t border-gray-800 pt-2">
                <span className="text-gray-300 font-bold">Editorial Placement Fee:</span>
                <span className="font-black text-amber-400 text-base">${selectedSiteForOrder.price}</span>
              </div>
            </div>

            <p className="text-xs text-gray-400">
              Includes native 1,000+ word content drafting, do-follow in-content link injection, and permanent placement guarantee.
            </p>

            <div className="space-y-2 pt-2">
              <a
                href={`https://wa.me/918000417058?text=${encodeURIComponent(
                  `Hi Nova Growth! I want to order a guest post on ${selectedSiteForOrder.domain} (DR ${selectedSiteForOrder.dr}, Price: $${selectedSiteForOrder.price}). Please send payment details.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block text-center py-2.5 rounded-xl bg-[#25d366] hover:bg-[#22bf5b] text-black font-extrabold text-xs shadow-md transition-all cursor-pointer"
              >
                Instant Order via WhatsApp 💬
              </a>

              <Link
                href={`/pay?plan=starter&domain=${encodeURIComponent(selectedSiteForOrder.domain)}&amount=${selectedSiteForOrder.price}`}
                className="w-full block text-center py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs shadow-md transition-all cursor-pointer"
              >
                Pay &amp; Authorize Placement (${selectedSiteForOrder.price}) →
              </Link>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
