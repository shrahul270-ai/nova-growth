"use client";

import React, { useState, useMemo, useEffect } from "react";
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
}

export default function PublisherSitesManager({
  onNotify,
  isAddModalOpen,
  setIsAddModalOpen,
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
  const [price, setPrice] = useState("250");
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
    "Travels",
    "Technology",
    "General",
    "Business",
    "Digital Marketing",
    "Education",
    "Casino",
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

  // Filtered & Sorted Sites
  const filteredSites = useMemo(() => {
    return allSites.filter((site) => {
      if (search.trim()) {
        const q = search.toLowerCase().trim();
        const matchesDomain = site.domain.toLowerCase().includes(q);
        const matchesNiche = site.niche.toLowerCase().includes(q);
        const matchesCountry = site.country.toLowerCase().includes(q);
        if (!matchesDomain && !matchesNiche && !matchesCountry) return false;
      }
      if (selectedCategory !== "all" && site.niche.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
      if (selectedCountry !== "all" && !site.country.toLowerCase().includes(selectedCountry.toLowerCase())) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      let diff = 0;
      if (sortField === "dr") diff = b.dr - a.dr;
      if (sortField === "da") diff = b.da - a.da;
      if (sortField === "price") diff = b.price - a.price;
      if (sortField === "domain") diff = a.domain.localeCompare(b.domain);
      return sortOrder === "desc" ? diff : -diff;
    });
  }, [allSites, search, selectedCategory, selectedCountry, sortField, sortOrder]);

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
      price: parseInt(price, 10) || 200,
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
    setPrice("250");
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

  return (
    <div className="space-y-6">
      {/* TOP HEADER CARDS (Vefogix / Modern Buyer Marketplace Style) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Total Sites */}
        <div className="bg-[#0b1220] p-4 rounded-2xl border border-gray-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Total Publishers</span>
            <span className="text-2xl font-black text-white">{allSites.length}</span>
            <span className="text-[10px] text-emerald-400 block mt-0.5">Active in Marketplace</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center text-lg">
            🌐
          </div>
        </div>

        {/* Custom Admin Added Sites */}
        <div className="bg-[#0b1220] p-4 rounded-2xl border border-amber-500/30 flex items-center justify-between shadow-sm shadow-amber-500/10">
          <div>
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">Admin Added Sites</span>
            <span className="text-2xl font-black text-amber-400">{customSites.length}</span>
            <span className="text-[10px] text-gray-400 block mt-0.5">Custom Inventory</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center text-lg">
            ⭐
          </div>
        </div>

        {/* Top Selling / Premium */}
        <div className="bg-[#0b1220] p-4 rounded-2xl border border-gray-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Top Selling Sites</span>
            <span className="text-2xl font-black text-emerald-400">{allSites.filter((s) => s.isTopSelling).length}</span>
            <span className="text-[10px] text-gray-500 block mt-0.5">High Demand</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-lg">
            🔥
          </div>
        </div>

        {/* Average Price */}
        <div className="bg-[#0b1220] p-4 rounded-2xl border border-gray-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Avg Placement</span>
            <span className="text-2xl font-black text-purple-400">
              ${Math.round(allSites.reduce((acc, s) => acc + s.price, 0) / (allSites.length || 1))}
            </span>
            <span className="text-[10px] text-gray-500 block mt-0.5">Per Guest Post</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center text-lg">
            💰
          </div>
        </div>
      </div>

      {/* ACTION BAR: Search, Filter, Sort & Add Website Button */}
      <div className="bg-[#0b1220] p-4 rounded-2xl border border-gray-800 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search publishers by domain, niche or country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-gray-900 border border-gray-700 rounded-xl text-xs text-white placeholder-gray-500 focus:border-amber-400 focus:outline-none"
          />
          <span className="absolute left-3 top-2.5 text-gray-500 text-xs">🔍</span>
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-white text-xs"
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
            className="px-3 py-2 bg-gray-900 border border-gray-700 rounded-xl text-xs text-gray-300 font-bold focus:outline-none cursor-pointer"
          >
            <option value="all">All Categories ({categories.length})</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* Sort Field */}
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value as any)}
            className="px-3 py-2 bg-gray-900 border border-gray-700 rounded-xl text-xs text-gray-300 font-bold focus:outline-none cursor-pointer"
          >
            <option value="dr">Sort by Ahrefs DR</option>
            <option value="da">Sort by Moz DA</option>
            <option value="price">Sort by Price</option>
            <option value="domain">Sort by Domain Name</option>
          </select>

          <button
            onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
            className="px-3 py-2 bg-gray-900 border border-gray-700 hover:border-gray-600 rounded-xl text-xs font-bold text-gray-300 transition-colors cursor-pointer"
          >
            {sortOrder === "desc" ? "⬇️ High to Low" : "⬆️ Low to High"}
          </button>

          {/* + Add Website Button */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold px-4 py-2 rounded-xl text-xs transition-all flex items-center gap-1.5 shadow-md shadow-amber-500/20 cursor-pointer"
          >
            <span>+</span>
            <span>Add New Website</span>
          </button>
        </div>
      </div>

      {/* PUBLISHER SITES INVENTORY TABLE */}
      <div className="bg-[#0b1220] rounded-2xl border border-gray-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-[#070b14] border-b border-gray-800 text-gray-400 uppercase text-[10px] tracking-wider font-bold">
              <tr>
                <th className="py-3.5 px-4">Publisher Domain</th>
                <th className="py-3.5 px-3">Category / Niche</th>
                <th className="py-3.5 px-3 text-center">Ahrefs DR</th>
                <th className="py-3.5 px-3 text-center">Moz DA</th>
                <th className="py-3.5 px-3">Monthly Traffic</th>
                <th className="py-3.5 px-3">Target Geo</th>
                <th className="py-3.5 px-3">Link Type</th>
                <th className="py-3.5 px-3">Price</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {filteredSites.length > 0 ? (
                filteredSites.map((site) => (
                  <tr key={site.id} className="hover:bg-gray-800/40 transition-colors group">
                    {/* Domain & Badge */}
                    <td className="py-3.5 px-4 font-semibold text-white">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span className="group-hover:text-amber-400 transition-colors">{site.domain}</span>
                        {site.addedByAdmin && (
                          <span className="text-[9px] bg-purple-500/20 text-purple-300 border border-purple-500/30 font-black px-1.5 py-0.2 rounded">
                            Custom
                          </span>
                        )}
                        {site.isTopSelling && (
                          <span className="text-[9px] bg-amber-500/15 text-amber-400 border border-amber-500/30 font-bold px-1.5 py-0.2 rounded">
                            Popular
                          </span>
                        )}
                        {site.isNewlyAdded && (
                          <span className="text-[9px] bg-blue-500/15 text-blue-400 border border-blue-500/30 font-bold px-1.5 py-0.2 rounded">
                            New
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-3">
                      <span className="px-2 py-0.5 rounded-md bg-gray-800/80 text-[11px] font-medium text-gray-300">
                        {site.niche}
                      </span>
                    </td>

                    {/* Ahrefs DR */}
                    <td className="py-3.5 px-3 text-center">
                      <span className="font-extrabold text-emerald-400 text-sm">
                        {site.dr}
                      </span>
                    </td>

                    {/* Moz DA */}
                    <td className="py-3.5 px-3 text-center">
                      <span className="font-bold text-gray-300">
                        {site.da}
                      </span>
                    </td>

                    {/* Monthly Traffic */}
                    <td className="py-3.5 px-3 font-semibold text-gray-200">
                      {site.ahrefsTraffic}
                    </td>

                    {/* Country Geo */}
                    <td className="py-3.5 px-3">
                      <span className="inline-flex items-center gap-1 font-semibold text-gray-300">
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

                    {/* Price */}
                    <td className="py-3.5 px-3">
                      <span className="font-black text-amber-400 text-sm">
                        ${site.price}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={`https://${site.domain}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-[11px] font-bold"
                          title="Open domain"
                        >
                          Visit ↗
                        </a>
                        {site.addedByAdmin && (
                          <button
                            onClick={() => handleDeleteCustomSite(site.id, site.domain)}
                            className="px-2.5 py-1 rounded-lg bg-rose-950/80 hover:bg-rose-900 text-rose-300 text-[11px] font-bold cursor-pointer"
                            title="Delete this site"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-gray-500">
                    <p className="text-sm font-bold text-white">No publisher websites matched your search</p>
                    <button
                      onClick={() => {
                        setSearch("");
                        setSelectedCategory("all");
                        setSelectedCountry("all");
                      }}
                      className="mt-2 text-xs text-amber-400 underline font-bold"
                    >
                      Clear Search &amp; Filters
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info bar */}
        <div className="p-3.5 bg-[#070b14] border-t border-gray-800 flex items-center justify-between text-xs text-gray-400">
          <span>
            Showing <strong className="text-white">{filteredSites.length}</strong> of {allSites.length} publisher sites.
          </span>
          <span>
            All changes auto-sync to Guest Posting Marketplace.
          </span>
        </div>
      </div>

      {/* ADD NEW WEBSITE MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#0b1220] border border-gray-800 rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-800/80 pb-3">
              <div>
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                  Marketplace Inventory
                </span>
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <span>🌐</span> Add New Publisher Website
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-white cursor-pointer text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSiteSubmit} className="space-y-4 text-xs">
              {/* Domain Input */}
              <div>
                <label className="block text-gray-300 font-bold mb-1">
                  Website Domain (e.g. techcrunch.com) *
                </label>
                <input
                  required
                  type="text"
                  placeholder="domain-name.com"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-amber-400 focus:outline-none"
                />
              </div>

              {/* Niche & Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-bold mb-1">
                    Niche / Category *
                  </label>
                  <select
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-xl text-white focus:border-amber-400 focus:outline-none cursor-pointer"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 font-bold mb-1">
                    Target Country *
                  </label>
                  <select
                    value={country}
                    onChange={(e) => handleCountryChange(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-xl text-white focus:border-amber-400 focus:outline-none cursor-pointer"
                  >
                    {Object.keys(countryFlagsMap).map((c) => (
                      <option key={c} value={c}>
                        {countryFlagsMap[c]} {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Language & Link Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-bold mb-1">
                    Language
                  </label>
                  <input
                    type="text"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    placeholder="English"
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-xl text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-bold mb-1">
                    Link Attribute
                  </label>
                  <select
                    value={linkType}
                    onChange={(e) => setLinkType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-xl text-white focus:border-amber-400 focus:outline-none cursor-pointer"
                  >
                    <option value="DoFollow">DoFollow</option>
                    <option value="NoFollow">NoFollow</option>
                    <option value="Contextual">Contextual</option>
                  </select>
                </div>
              </div>

              {/* Ahrefs DR, Moz DA, Traffic, Price */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-gray-300 font-bold mb-1">
                    Ahrefs DR
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={dr}
                    onChange={(e) => setDr(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-xl text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-bold mb-1">
                    Moz DA
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={da}
                    onChange={(e) => setDa(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-xl text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-bold mb-1">
                    Traffic
                  </label>
                  <input
                    type="text"
                    value={traffic}
                    onChange={(e) => setTraffic(e.target.value)}
                    placeholder="200,000+"
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-xl text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-bold mb-1">
                    Price ($ USD) *
                  </label>
                  <input
                    required
                    type="number"
                    min="10"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="250"
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-xl text-white font-bold text-amber-400 focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Badges Checkboxes */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-gray-300">
                  <input
                    type="checkbox"
                    checked={isTopSelling}
                    onChange={(e) => setIsTopSelling(e.target.checked)}
                    className="accent-amber-500 rounded cursor-pointer"
                  />
                  <span>Mark as Popular / Top Selling</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-gray-300">
                  <input
                    type="checkbox"
                    checked={isNewlyAdded}
                    onChange={(e) => setIsNewlyAdded(e.target.checked)}
                    className="accent-blue-500 rounded cursor-pointer"
                  />
                  <span>Mark as Newly Added</span>
                </label>
              </div>

              {/* Form Buttons */}
              <div className="flex justify-end gap-2.5 pt-3 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold shadow-md shadow-amber-500/20 cursor-pointer"
                >
                  Save &amp; Publish Site →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
