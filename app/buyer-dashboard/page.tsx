"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { INITIAL_PUBLISHERS, PublisherSite } from "../data/publishersData";

interface CustomBuyerSite {
  id: string;
  domain: string;
  niche: string;
  country: string;
  countryFlag: string;
  dr: number;
  da: number;
  traffic: string;
  linkType: "DoFollow" | "NoFollow" | "Contextual";
  price: number;
  notes?: string;
  createdAt: string;
}

export default function BuyerDashboardPage() {
  const [buyerUser, setBuyerUser] = useState<{ email: string; phone: string } | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  // Custom sites added by the buyer (User requested: "sites ka data me khudh dalungi tum mat dalna")
  const [customSites, setCustomSites] = useState<CustomBuyerSite[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  // Add site form state
  const [domain, setDomain] = useState("");
  const [niche, setNiche] = useState("SaaS & Tech");
  const [country, setCountry] = useState("United States (USA)");
  const [countryFlag, setCountryFlag] = useState("🇺🇸");
  const [dr, setDr] = useState("70");
  const [da, setDa] = useState("65");
  const [traffic, setTraffic] = useState("100,000+");
  const [linkType, setLinkType] = useState<"DoFollow" | "NoFollow" | "Contextual">("DoFollow");
  const [price, setPrice] = useState("150");
  const [notes, setNotes] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  // Check login session & load buyer's custom sites on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("nova_buyer_session");
      if (storedUser) {
        setBuyerUser(JSON.parse(storedUser));
      }

      const storedSites = localStorage.getItem("nova_buyer_custom_sites");
      if (storedSites) {
        setCustomSites(JSON.parse(storedSites));
      }
    } catch {}
    setAuthChecked(true);
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem("nova_buyer_session");
    } catch {}
    setBuyerUser(null);
    window.location.href = "/guest-posting";
  };

  // Download complete 40,000+ guest post database in Excel/CSV
  const handleDownloadFullDatabase = () => {
    const headers = [
      "Publication Domain",
      "Category / Niche",
      "Ahrefs DR",
      "Moz DA",
      "Traffic",
      "Country",
      "Link Type",
      "Price (USD)",
      "Status",
    ];

    // Combine any custom sites added by buyer with the network publishers
    const allExportSites = [
      ...customSites.map((s) => ({
        domain: s.domain,
        niche: s.niche,
        dr: s.dr,
        da: s.da,
        ahrefsTraffic: s.traffic,
        country: s.country,
        linkType: s.linkType,
        price: s.price,
      })),
      ...INITIAL_PUBLISHERS,
    ];

    const rows = allExportSites.map((s) => [
      `"${s.domain}"`,
      `"${s.niche}"`,
      `"${s.dr}"`,
      `"${s.da}"`,
      `"${s.ahrefsTraffic}"`,
      `"${s.country}"`,
      `"${s.linkType}"`,
      `"$${s.price} USD"`,
      `"Verified & Active"`,
    ]);

    const csvContent =
      "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.setAttribute("download", `nova_growth_full_database_40000_${Date.now()}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("✓ Full 40,000+ Excel Database downloaded successfully!");
  };

  // Add new website submitted by buyer
  const handleAddSiteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanDomain = domain.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
    if (!cleanDomain) {
      showToast("❌ Please enter a valid website domain");
      return;
    }

    const newSite: CustomBuyerSite = {
      id: `custom-buyer-${Date.now()}`,
      domain: cleanDomain,
      niche,
      country,
      countryFlag,
      dr: parseInt(dr, 10) || 50,
      da: parseInt(da, 10) || 50,
      traffic: traffic || "50,000+",
      linkType,
      price: parseInt(price, 10) || 100,
      notes,
      createdAt: new Date().toISOString(),
    };

    const updated = [newSite, ...customSites];
    setCustomSites(updated);
    try {
      localStorage.setItem("nova_buyer_custom_sites", JSON.stringify(updated));
    } catch {}

    setIsAddModalOpen(false);
    showToast(`✓ ${cleanDomain} added to your personal dashboard!`);

    // Reset Form
    setDomain("");
    setNotes("");
  };

  const handleDeleteSite = (id: string, domainName: string) => {
    if (confirm(`Remove ${domainName} from your dashboard?`)) {
      const updated = customSites.filter((s) => s.id !== id);
      setCustomSites(updated);
      try {
        localStorage.setItem("nova_buyer_custom_sites", JSON.stringify(updated));
      } catch {}
      showToast(`✓ ${domainName} removed.`);
    }
  };

  const filteredCustomSites = useMemo(() => {
    if (!search.trim()) return customSites;
    const q = search.toLowerCase().trim();
    return customSites.filter(
      (s) =>
        s.domain.toLowerCase().includes(q) ||
        s.niche.toLowerCase().includes(q) ||
        s.country.toLowerCase().includes(q)
    );
  }, [customSites, search]);

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6 text-slate-500 font-bold text-xs">
        Loading Buyer Workspace...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white font-bold text-xs px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 animate-in fade-in duration-200">
          {toast}
        </div>
      )}

      {/* Top Header Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-6 py-3.5 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-black text-base shadow-sm">
                NG
              </div>
              <div className="leading-tight">
                <span className="text-base font-black text-slate-900 tracking-tight block">
                  Nova Growth
                </span>
                <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">
                  Buyer Workspace
                </span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-4 text-xs font-bold text-slate-600">
              <Link href="/guest-posting" className="hover:text-blue-600 transition-colors">
                ← 40,000+ Marketplace
              </Link>
              <span className="text-slate-300">|</span>
              <span className="text-blue-600 font-extrabold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>My Dashboard</span>
              </span>
            </nav>
          </div>

          <div className="flex items-center gap-3 text-xs">
            {/* Download Full Database Button */}
            <button
              onClick={handleDownloadFullDatabase}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-black px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 cursor-pointer transition-all hover:scale-102"
              title="Download full 40,000+ guest post database in Excel format"
            >
              <span>📥</span>
              <span>Download Database (.xlsx)</span>
            </button>

            {/* Add Website Entry */}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-[#4a3aff] hover:bg-[#3d2ee0] text-white font-bold px-3.5 py-2 rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <span>+</span>
              <span>Add Website Entry</span>
            </button>

            {buyerUser && (
              <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 font-bold text-[11px]">
                <span>👤</span>
                <span className="truncate max-w-[150px]">{buyerUser.email}</span>
              </div>
            )}

            <button
              onClick={handleLogout}
              className="bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 font-bold px-3 py-2 rounded-xl transition-colors cursor-pointer"
            >
              Log Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="max-w-7xl mx-auto w-full p-6 lg:p-8 space-y-6">
        {/* Workspace Breadcrumb & Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="w-9 h-1 bg-emerald-500 rounded-full mb-1.5" />
            <span className="text-xs font-black text-blue-600 uppercase tracking-widest block mb-0.5">
              PRIVATE BUYER PORTAL
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Buyer Dashboard &amp; Website Inventory
            </h1>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Manage your custom publisher sites, download verified publications in Excel, and track wholesale orders.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/guest-posting"
              className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-xs shadow-xs transition-all flex items-center gap-2"
            >
              <span>🌐</span>
              <span>Browse 40,000+ Marketplace</span>
            </Link>
          </div>
        </div>

        {/* Overview Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
              Network Publishers
            </span>
            <span className="text-2xl font-black text-slate-900">40,000+</span>
            <span className="text-[10px] text-emerald-600 block mt-1 font-semibold">
              ✓ Full Database Unlocked
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
              My Added Sites
            </span>
            <span className="text-2xl font-black text-blue-600">{customSites.length}</span>
            <span className="text-[10px] text-slate-400 block mt-1">
              Custom Publisher Entries
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
              Buyer Account
            </span>
            <span className="text-sm font-black text-slate-900 truncate block mt-1">
              {buyerUser?.email || "Verified Member"}
            </span>
            <span className="text-[10px] text-emerald-600 block mt-1 font-semibold">
              Wholesale Link Pricing
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
                Excel Export
              </span>
              <span className="text-xs font-bold text-slate-700 block">
                Instant .xlsx / .csv
              </span>
            </div>
            <button
              onClick={handleDownloadFullDatabase}
              className="text-xs font-black text-emerald-600 hover:text-emerald-700 underline text-left mt-1 cursor-pointer"
            >
              Download Full File →
            </button>
          </div>
        </div>

        {/* CUSTOM SITES MANAGEMENT SECTION */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span>📑</span>
                <span>My Custom Website Entries</span>
                <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-bold text-xs">
                  {customSites.length}
                </span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Add and manage your own publisher websites here. Data is saved privately to your dashboard.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-[#4a3aff] hover:bg-[#3d2ee0] text-white font-bold px-4 py-2 rounded-xl text-xs shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>+</span>
                <span>Add Website Entry</span>
              </button>
            </div>
          </div>

          {/* Search bar for custom sites */}
          {customSites.length > 0 && (
            <div className="relative max-w-sm">
              <input
                type="text"
                placeholder="Search your custom sites..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none"
              />
              <span className="absolute left-3 top-2.5 text-slate-400 text-xs">🔍</span>
            </div>
          )}

          {/* Custom Sites Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                  <th className="py-3 px-4">Domain</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3 text-center">DR</th>
                  <th className="py-3 px-3 text-center">DA</th>
                  <th className="py-3 px-3">Traffic</th>
                  <th className="py-3 px-3">Country</th>
                  <th className="py-3 px-3">Link Type</th>
                  <th className="py-3 px-3">Price</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {customSites.length === 0 ? (
                  /* EMPTY STATE - NO PREFILLED SITES (User requested: "sites ka data me khudh dalungi") */
                  <tr>
                    <td colSpan={9} className="py-14 text-center">
                      <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl mx-auto mb-3 shadow-xs">
                        ✍️
                      </div>
                      <h3 className="text-base font-black text-slate-900 mb-1">
                        No Custom Websites Added Yet
                      </h3>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4 leading-relaxed">
                        Your custom sites dashboard is ready. Click the button below to add your own websites, metrics, and pricing.
                      </p>
                      <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="bg-[#4a3aff] hover:bg-[#3d2ee0] text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-sm cursor-pointer inline-flex items-center gap-1.5"
                      >
                        <span>+</span>
                        <span>Add Your First Website</span>
                      </button>
                    </td>
                  </tr>
                ) : filteredCustomSites.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-8 text-center text-slate-400">
                      No custom websites matched your search filter.
                    </td>
                  </tr>
                ) : (
                  filteredCustomSites.map((site) => (
                    <tr key={site.id} className="hover:bg-blue-50/40 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-500" />
                          <span>{site.domain}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-[11px] font-medium text-slate-700">
                          {site.niche}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-center font-bold text-emerald-600">
                        {site.dr}
                      </td>
                      <td className="py-3.5 px-3 text-center font-bold text-slate-700">
                        {site.da}
                      </td>
                      <td className="py-3.5 px-3 font-semibold text-slate-700">
                        {site.traffic}
                      </td>
                      <td className="py-3.5 px-3 font-medium text-slate-700">
                        <span>{site.countryFlag} {site.country}</span>
                      </td>
                      <td className="py-3.5 px-3 font-bold text-emerald-600">
                        ✓ {site.linkType}
                      </td>
                      <td className="py-3.5 px-3 font-black text-slate-900 text-sm">
                        ${site.price} USD
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleDeleteSite(site.id, site.domain)}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Delete entry"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* ADD WEBSITE MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                  <span>🌐</span>
                  <span>Add Website Entry to Dashboard</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Enter the publication details. It will be stored in your private buyer dashboard.
                </p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold flex items-center justify-center text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSiteSubmit} className="p-6 space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Website Domain *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. forbes-media.com"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Niche Category</label>
                  <select
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium"
                  >
                    <option value="SaaS & Tech">SaaS &amp; Tech</option>
                    <option value="AI & Machine Learning">AI &amp; Machine Learning</option>
                    <option value="Business & Startup">Business &amp; Startup</option>
                    <option value="Finance & Investment">Finance &amp; Investment</option>
                    <option value="Digital Marketing & SEO">Digital Marketing &amp; SEO</option>
                    <option value="Health & Medical">Health &amp; Medical</option>
                    <option value="Travel & Hospitality">Travel &amp; Hospitality</option>
                    <option value="E-Commerce & Retail">E-Commerce &amp; Retail</option>
                    <option value="General">General</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target Country</label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="e.g. United States (USA)"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Ahrefs DR</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={dr}
                    onChange={(e) => setDr(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Moz DA</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={da}
                    onChange={(e) => setDa(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Price ($ USD)</label>
                  <input
                    type="number"
                    min="1"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-center font-black text-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Monthly Traffic</label>
                  <input
                    type="text"
                    value={traffic}
                    onChange={(e) => setTraffic(e.target.value)}
                    placeholder="e.g. 150,000+"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Link Type</label>
                  <select
                    value={linkType}
                    onChange={(e) => setLinkType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium"
                  >
                    <option value="DoFollow">DoFollow</option>
                    <option value="NoFollow">NoFollow</option>
                    <option value="Contextual">Contextual</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Private Notes (Optional)</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Outreach contact, direct editor email..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#4a3aff] hover:bg-[#3d2ee0] text-white font-bold shadow-xs cursor-pointer"
                >
                  Save Website Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
