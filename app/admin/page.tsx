"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface BaseItem {
  id: string;
  collection: "leads" | "interactions" | "audits" | "payments";
  type: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  deletedAt?: string | null;
  status: string;
  notes?: string;
  [key: string]: any;
}

interface StatsData {
  totalActive: number;
  totalDeleted: number;
  todayActivity: number;
  lastUpdated: string;
  breakdown: {
    leads: { active: number; deleted: number };
    interactions: { active: number; deleted: number; whatsapp: number; calls: number; emails: number };
    audits: { active: number; deleted: number };
    payments: { active: number; deleted: number };
  };
  recentActivities: Array<{
    id: string;
    timestamp: string;
    action: string;
    collection: string;
    summary: string;
  }>;
}

export default function AdminDatabasePage() {
  const [activeTab, setActiveTab] = useState<"leads" | "interactions" | "audits" | "payments" | "trash" | "logs">("leads");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc"); // desc = Newest first, asc = Oldest first
  const [records, setRecords] = useState<BaseItem[]>([]);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<BaseItem | null>(null);
  const [editingNotes, setEditingNotes] = useState("");
  const [isNewEntryOpen, setIsNewEntryOpen] = useState(false);

  // Form for Manual Entry
  const [manualForm, setManualForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Full-Funnel Organic Growth",
    message: "",
    notes: "Manual entry by agency admin",
  });

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  // Fetch Database Stats
  const loadStats = useCallback(async () => {
    try {
      const res = await fetch("/api/db/stats");
      const data = await res.json();
      if (data.success) {
        setStats(data);
      }
    } catch (err) {
      console.error("Error loading stats:", err);
    }
  }, []);

  // Fetch Current Records
  const loadRecords = useCallback(async () => {
    setLoading(true);
    try {
      let endpoint = "/api/db/leads";
      const isTrash = activeTab === "trash";

      if (isTrash) {
        // Query across all collections for deleted items
        const res = await fetch(`/api/db/leads?showDeleted=true&search=${encodeURIComponent(search)}&sortOrder=${sortOrder}`);
        const intRes = await fetch(`/api/db/interactions?showDeleted=true&search=${encodeURIComponent(search)}&sortOrder=${sortOrder}`);
        const audRes = await fetch(`/api/db/audits?showDeleted=true&search=${encodeURIComponent(search)}&sortOrder=${sortOrder}`);
        const payRes = await fetch(`/api/db/payments?showDeleted=true&search=${encodeURIComponent(search)}&sortOrder=${sortOrder}`);

        const [lData, iData, aData, pData] = await Promise.all([res.json(), intRes.json(), audRes.json(), payRes.json()]);

        const combined: BaseItem[] = [
          ...(lData.records || []),
          ...(iData.records || []),
          ...(aData.records || []),
          ...(pData.records || []),
        ];

        combined.sort((a, b) => {
          const tA = new Date(a.deletedAt || a.createdAt).getTime();
          const tB = new Date(b.deletedAt || b.createdAt).getTime();
          return sortOrder === "desc" ? tB - tA : tA - tB;
        });

        setRecords(combined);
        setLoading(false);
        return;
      }

      if (activeTab === "leads") endpoint = "/api/db/leads";
      if (activeTab === "interactions") endpoint = "/api/db/interactions";
      if (activeTab === "audits") endpoint = "/api/db/audits";
      if (activeTab === "payments") endpoint = "/api/db/payments";

      const url = `${endpoint}?showDeleted=false&search=${encodeURIComponent(search)}&status=${statusFilter}&sortOrder=${sortOrder}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setRecords(data.records || []);
      }
    } catch (err) {
      console.error("Error loading records:", err);
      showToast("❌ Failed to load records");
    } finally {
      setLoading(false);
    }
  }, [activeTab, search, statusFilter, sortOrder]);

  useEffect(() => {
    loadStats();
    loadRecords();
  }, [loadStats, loadRecords]);

  // Update Status
  const handleUpdateStatus = async (item: BaseItem, newStatus: string) => {
    try {
      const endpoint = `/api/db/${item.collection}`;
      const res = await fetch(endpoint, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`✓ Status updated to ${newStatus}`);
        loadRecords();
        loadStats();
      }
    } catch {
      showToast("❌ Failed to update status");
    }
  };

  // Save Notes
  const handleSaveNotes = async () => {
    if (!selectedRecord) return;
    try {
      const endpoint = `/api/db/${selectedRecord.collection}`;
      const res = await fetch(endpoint, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedRecord.id, notes: editingNotes }),
      });
      const data = await res.json();
      if (data.success) {
        showToast("✓ Notes saved");
        setSelectedRecord(null);
        loadRecords();
      }
    } catch {
      showToast("❌ Failed to save notes");
    }
  };

  // Soft Delete (Move to Trash)
  const handleSoftDelete = async (item: BaseItem) => {
    if (!confirm(`Move this item (${item.id}) to Trash? You can restore it later.`)) return;
    try {
      const endpoint = `/api/db/${item.collection}?id=${item.id}&permanent=false`;
      const res = await fetch(endpoint, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showToast("🗑️ Moved to Trash (Safely archived)");
        loadRecords();
        loadStats();
      }
    } catch {
      showToast("❌ Failed to move to trash");
    }
  };

  // Restore from Trash
  const handleRestore = async (item: BaseItem) => {
    try {
      const res = await fetch("/api/db/restore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collection: item.collection, id: item.id }),
      });
      const data = await res.json();
      if (data.success) {
        showToast("✓ Item restored back to active database!");
        loadRecords();
        loadStats();
      }
    } catch {
      showToast("❌ Failed to restore item");
    }
  };

  // Permanent Delete
  const handlePermanentDelete = async (item: BaseItem) => {
    if (!confirm(`⚠️ PERMANENTLY delete record ${item.id}? This cannot be undone.`)) return;
    try {
      const endpoint = `/api/db/${item.collection}?id=${item.id}&permanent=true`;
      const res = await fetch(endpoint, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showToast("✓ Permanently deleted");
        loadRecords();
        loadStats();
      }
    } catch {
      showToast("❌ Failed to delete record");
    }
  };

  // Handle Manual Entry Submit
  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/db/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "custom_work",
          name: manualForm.name,
          email: manualForm.email,
          phone: manualForm.phone,
          service: manualForm.service,
          message: manualForm.message,
          notes: manualForm.notes,
          sourceUrl: "/admin (Manual)",
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast("✓ Manual client record created successfully!");
        setIsNewEntryOpen(false);
        setManualForm({
          name: "",
          email: "",
          phone: "",
          service: "Full-Funnel Organic Growth",
          message: "",
          notes: "Manual entry by agency admin",
        });
        loadRecords();
        loadStats();
      }
    } catch {
      showToast("❌ Failed to create record");
    }
  };

  // Format Date Helper
  const formatDate = (isoString?: string) => {
    if (!isoString) return "N/A";
    const d = new Date(isoString);
    return d.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-white selection:bg-amber-500 selection:text-black">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-[#0b1220] border border-amber-500/60 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-fadeIn text-xs font-semibold backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span>{toast}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="border-b border-gray-800 bg-[#091427]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 text-black flex items-center justify-center font-black text-sm shadow-md">
                NG
              </div>
              <div>
                <span className="text-base font-black tracking-tight text-white block">Nova Growth</span>
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Database Hub</span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <button
              onClick={() => setIsNewEntryOpen(true)}
              className="bg-amber-500 hover:bg-amber-400 text-black font-extrabold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-md shadow-amber-500/20 cursor-pointer"
            >
              <span>+</span>
              <span>New Client Entry</span>
            </button>

            <a
              href={`/api/db/export?format=csv&collection=${activeTab === "trash" || activeTab === "logs" ? "all" : activeTab}`}
              download
              className="bg-gray-800 hover:bg-gray-700 text-white font-bold px-3.5 py-2 rounded-xl border border-gray-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>📥</span>
              <span>Export CSV</span>
            </a>

            <a
              href="/api/db/export?format=json&collection=all"
              download
              className="bg-gray-800 hover:bg-gray-700 text-white font-bold px-3.5 py-2 rounded-xl border border-gray-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>💾</span>
              <span>JSON Backup</span>
            </a>

            <Link
              href="/"
              className="text-gray-400 hover:text-white px-3 py-2 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors"
            >
              ← Back to Site
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* STATS OVERVIEW CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-[#0b1220] p-4 rounded-2xl border border-gray-800">
            <span className="text-[11px] text-gray-400 font-bold uppercase block mb-1">Active Leads</span>
            <span className="text-2xl font-black text-amber-400">{stats?.breakdown.leads.active || 0}</span>
            <span className="text-[10px] text-gray-500 block mt-1">Form Submissions</span>
          </div>

          <div className="bg-[#0b1220] p-4 rounded-2xl border border-gray-800">
            <span className="text-[11px] text-gray-400 font-bold uppercase block mb-1">WhatsApp Clicks</span>
            <span className="text-2xl font-black text-emerald-400">{stats?.breakdown.interactions.whatsapp || 0}</span>
            <span className="text-[10px] text-gray-500 block mt-1">Direct Inquiries</span>
          </div>

          <div className="bg-[#0b1220] p-4 rounded-2xl border border-gray-800">
            <span className="text-[11px] text-gray-400 font-bold uppercase block mb-1">Calls &amp; Meets</span>
            <span className="text-2xl font-black text-blue-400">{stats?.breakdown.interactions.calls || 0}</span>
            <span className="text-[10px] text-gray-500 block mt-1">Video / Phone</span>
          </div>

          <div className="bg-[#0b1220] p-4 rounded-2xl border border-gray-800">
            <span className="text-[11px] text-gray-400 font-bold uppercase block mb-1">SEO Audits</span>
            <span className="text-2xl font-black text-purple-400">{stats?.breakdown.audits.active || 0}</span>
            <span className="text-[10px] text-gray-500 block mt-1">Domains Tested</span>
          </div>

          <div className="bg-[#0b1220] p-4 rounded-2xl border border-gray-800">
            <span className="text-[11px] text-gray-400 font-bold uppercase block mb-1">Payments</span>
            <span className="text-2xl font-black text-teal-400">{stats?.breakdown.payments.active || 0}</span>
            <span className="text-[10px] text-gray-500 block mt-1">Checkouts &amp; Retainers</span>
          </div>

          <div className="bg-[#0b1220] p-4 rounded-2xl border border-rose-900/40">
            <span className="text-[11px] text-rose-400 font-bold uppercase block mb-1">🗑️ In Trash</span>
            <span className="text-2xl font-black text-rose-500">{stats?.totalDeleted || 0}</span>
            <span className="text-[10px] text-gray-500 block mt-1">Recoverable Data</span>
          </div>
        </div>

        {/* CONTROLS BAR: Tabs, Search, Sort & Status Filters */}
        <div className="bg-[#0b1220] p-4 rounded-2xl border border-gray-800 mb-6 flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Main Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full lg:w-auto">
            <button
              onClick={() => setActiveTab("leads")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "leads"
                  ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
                  : "bg-gray-900/60 text-gray-400 hover:text-white border border-gray-800"
              }`}
            >
              📋 Leads &amp; Forms ({stats?.breakdown.leads.active || 0})
            </button>

            <button
              onClick={() => setActiveTab("interactions")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "interactions"
                  ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
                  : "bg-gray-900/60 text-gray-400 hover:text-white border border-gray-800"
              }`}
            >
              💬 Calls &amp; Messages ({stats?.breakdown.interactions.active || 0})
            </button>

            <button
              onClick={() => setActiveTab("audits")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "audits"
                  ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
                  : "bg-gray-900/60 text-gray-400 hover:text-white border border-gray-800"
              }`}
            >
              🔍 Audits ({stats?.breakdown.audits.active || 0})
            </button>

            <button
              onClick={() => setActiveTab("payments")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "payments"
                  ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
                  : "bg-gray-900/60 text-gray-400 hover:text-white border border-gray-800"
              }`}
            >
              💳 Payments ({stats?.breakdown.payments.active || 0})
            </button>

            <button
              onClick={() => setActiveTab("trash")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "trash"
                  ? "bg-rose-600 text-white shadow-md shadow-rose-600/30"
                  : "bg-gray-900/60 text-rose-400 hover:text-white border border-rose-900/50"
              }`}
            >
              🗑️ Trash / Deleted ({stats?.totalDeleted || 0})
            </button>

            <button
              onClick={() => setActiveTab("logs")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "logs"
                  ? "bg-amber-500 text-black"
                  : "bg-gray-900/60 text-gray-400 hover:text-white border border-gray-800"
              }`}
            >
              📜 Audit Trail
            </button>
          </div>

          {/* Search & Sort Filters */}
          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <input
                type="text"
                placeholder="Search by name, email, website..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-gray-900/90 border border-gray-700 rounded-xl text-xs text-white placeholder-gray-500 focus:border-amber-400 focus:outline-none"
              />
              <span className="absolute left-3 top-2.5 text-gray-500 text-xs">🔍</span>
            </div>

            {/* Sort Order: New to Old / Old to New */}
            <button
              onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
              className="px-3 py-2 bg-gray-900 border border-gray-700 hover:border-gray-600 rounded-xl text-xs font-bold text-gray-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
              title="Toggle date sort"
            >
              <span>{sortOrder === "desc" ? "⬇️ Newest First" : "⬆️ Oldest First"}</span>
            </button>

            {/* Status Filter */}
            {activeTab !== "trash" && activeTab !== "logs" && (
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 bg-gray-900 border border-gray-700 rounded-xl text-xs text-gray-300 font-bold focus:outline-none cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="closed">Closed</option>
              </select>
            )}
          </div>
        </div>

        {/* MAIN DATA TABLE VIEW */}
        {activeTab === "logs" ? (
          /* AUDIT TRAIL LOGS VIEW */
          <div className="bg-[#0b1220] rounded-2xl border border-gray-800 p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span>📜</span>
              <span>Complete System Activity &amp; Audit Log</span>
            </h3>
            <p className="text-xs text-gray-400 mb-6">
              Every creation, status update, soft delete, and restore is permanently logged chronologically with timestamps.
            </p>

            <div className="space-y-3">
              {(stats?.recentActivities || []).map((log) => (
                <div key={log.id} className="p-3.5 rounded-xl bg-gray-900/60 border border-gray-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                        log.action === "create"
                          ? "bg-emerald-950 text-emerald-400 border border-emerald-800/60"
                          : log.action === "soft_delete"
                          ? "bg-rose-950 text-rose-400 border border-rose-800/60"
                          : log.action === "restore"
                          ? "bg-blue-950 text-blue-400 border border-blue-800/60"
                          : "bg-amber-950 text-amber-400 border border-amber-800/60"
                      }`}
                    >
                      {log.action}
                    </span>
                    <span className="font-semibold text-gray-200">{log.summary}</span>
                  </div>
                  <span className="text-[11px] text-gray-500 font-mono">{formatDate(log.timestamp)}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* STANDARD RECORDS TABLE */
          <div className="bg-[#0b1220] rounded-2xl border border-gray-800 overflow-hidden shadow-xl">
            {loading ? (
              <div className="py-20 text-center text-gray-400 text-xs font-semibold">
                <div className="w-8 h-8 rounded-full border-2 border-amber-400 border-t-transparent animate-spin mx-auto mb-3" />
                Loading database records...
              </div>
            ) : records.length === 0 ? (
              <div className="py-20 text-center text-gray-400 text-xs">
                <div className="text-3xl mb-2">📭</div>
                <p className="font-bold text-gray-300">No records found</p>
                <p className="text-gray-500 mt-1">
                  {search ? "No matching records found for your search query." : "As clients interact with your website, their data will appear here in real-time."}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#091427] text-gray-400 font-bold uppercase text-[10px] tracking-wider border-b border-gray-800">
                    <tr>
                      <th className="py-3.5 px-4">Date / Time</th>
                      <th className="py-3.5 px-4">Client / Identifier</th>
                      <th className="py-3.5 px-4">Type / Service</th>
                      <th className="py-3.5 px-4">Details / Message</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/60 text-gray-300">
                    {records.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-900/40 transition-colors">
                        {/* Date */}
                        <td className="py-3.5 px-4 whitespace-nowrap font-mono text-[11px] text-gray-400">
                          <div>{formatDate(item.createdAt)}</div>
                          {item.isDeleted && (
                            <span className="text-[10px] text-rose-400 font-bold">
                              Deleted: {formatDate(item.deletedAt || "")}
                            </span>
                          )}
                        </td>

                        {/* Client / Identifier */}
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-white text-[13px]">
                            {item.name || item.domain || item.clientName || item.title || "Anonymous"}
                          </div>
                          <div className="text-gray-400 text-[11px]">
                            {item.email || item.clientEmail || item.clientIdentifier || item.url || "—"}
                          </div>
                          {item.phone && <div className="text-amber-400 text-[10px]">📞 {item.phone}</div>}
                          {item.website && (
                            <a
                              href={item.website.startsWith("http") ? item.website : `https://${item.website}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-400 hover:underline text-[10px] block truncate max-w-[200px]"
                            >
                              🌐 {item.website}
                            </a>
                          )}
                        </td>

                        {/* Type / Service */}
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded-md bg-gray-800 border border-gray-700 text-gray-300 text-[10px] font-bold uppercase inline-block mb-1">
                            {item.type || item.collection}
                          </span>
                          <div className="text-gray-400 text-[11px] font-semibold">
                            {item.service || item.planName || item.action || item.scores?.rankingTier || "—"}
                          </div>
                          {item.budget && <div className="text-emerald-400 text-[10px]">💰 {item.budget}</div>}
                          {item.amount && (
                            <div className="text-emerald-400 font-bold text-xs">
                              {item.currency} {item.amount}
                            </div>
                          )}
                        </td>

                        {/* Details / Message */}
                        <td className="py-3.5 px-4 max-w-xs">
                          <p className="line-clamp-2 text-gray-300 text-[11.5px]">
                            {item.message || item.details || item.notes || (item.scores ? `Rank: ${item.scores.rankingPosition} (${item.scores.rankingTier})` : "—")}
                          </p>
                          {item.notes && (
                            <div className="text-[10px] text-amber-300/80 mt-1 italic">
                              📝 Note: {item.notes}
                            </div>
                          )}
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          {item.isDeleted ? (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-rose-950 text-rose-400 border border-rose-800/60">
                              🗑️ Deleted
                            </span>
                          ) : (
                            <select
                              value={item.status || "new"}
                              onChange={(e) => handleUpdateStatus(item, e.target.value)}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border cursor-pointer focus:outline-none ${
                                item.status === "completed"
                                  ? "bg-emerald-950/80 text-emerald-400 border-emerald-800"
                                  : item.status === "in_progress"
                                  ? "bg-blue-950/80 text-blue-400 border-blue-800"
                                  : item.status === "contacted"
                                  ? "bg-amber-950/80 text-amber-400 border-amber-800"
                                  : "bg-gray-900 text-gray-300 border-gray-700"
                              }`}
                            >
                              <option value="new">🟡 New</option>
                              <option value="contacted">🟠 Contacted</option>
                              <option value="in_progress">🔵 In Progress</option>
                              <option value="completed">🟢 Completed</option>
                              <option value="closed">⚪ Closed</option>
                            </select>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          {item.isDeleted ? (
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleRestore(item)}
                                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                                title="Restore item back to active database"
                              >
                                ↺ Restore
                              </button>
                              <button
                                onClick={() => handlePermanentDelete(item)}
                                className="px-2.5 py-1.5 bg-rose-900/60 hover:bg-rose-800 text-rose-300 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                                title="Delete forever"
                              >
                                ✕ Purge
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => {
                                  setSelectedRecord(item);
                                  setEditingNotes(item.notes || "");
                                }}
                                className="px-2.5 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                                title="Add/Edit admin notes"
                              >
                                📝 Notes
                              </button>

                              <button
                                onClick={() => handleSoftDelete(item)}
                                className="px-2.5 py-1.5 bg-gray-900 hover:bg-rose-950/60 text-gray-400 hover:text-rose-400 border border-gray-800 hover:border-rose-800 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                                title="Move to trash (Soft Delete)"
                              >
                                🗑️
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>

      {/* NOTES MODAL */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0b1220] border border-gray-800 rounded-3xl max-w-md w-full p-6 text-left shadow-2xl">
            <h4 className="text-base font-bold text-white mb-2">
              Add Notes for {selectedRecord.name || selectedRecord.domain || selectedRecord.id}
            </h4>
            <p className="text-xs text-gray-400 mb-4">
              Add internal client follow-up notes, call logs, or meeting decisions.
            </p>
            <textarea
              rows={4}
              value={editingNotes}
              onChange={(e) => setEditingNotes(e.target.value)}
              placeholder="e.g. Talked on phone, scheduled zoom meeting for Friday 3 PM..."
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs text-white focus:border-amber-400 outline-none resize-none mb-4"
            />
            <div className="flex items-center justify-end gap-2 text-xs">
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNotes}
                className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-black font-extrabold rounded-xl cursor-pointer"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MANUAL ENTRY MODAL */}
      {isNewEntryOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0b1220] border border-gray-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 text-left shadow-2xl my-8">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800 mb-5">
              <h4 className="text-lg font-black text-white flex items-center gap-2">
                <span>➕</span>
                <span>Add Client / Work Record Manually</span>
              </h4>
              <button
                onClick={() => setIsNewEntryOpen(false)}
                className="text-gray-400 hover:text-white text-xs p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleManualSubmit} className="flex flex-col gap-4 text-xs">
              <div>
                <label className="font-bold text-gray-300 block mb-1">Client Full Name *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. David Vance"
                  value={manualForm.name}
                  onChange={(e) => setManualForm({ ...manualForm, name: e.target.value })}
                  className="w-full p-3 bg-gray-900 border border-gray-700 rounded-xl text-white outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-gray-300 block mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="david@company.com"
                    value={manualForm.email}
                    onChange={(e) => setManualForm({ ...manualForm, email: e.target.value })}
                    className="w-full p-3 bg-gray-900 border border-gray-700 rounded-xl text-white outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-300 block mb-1">Phone / WhatsApp</label>
                  <input
                    type="text"
                    placeholder="+1 555-0192"
                    value={manualForm.phone}
                    onChange={(e) => setManualForm({ ...manualForm, phone: e.target.value })}
                    className="w-full p-3 bg-gray-900 border border-gray-700 rounded-xl text-white outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-300 block mb-1">Target Service</label>
                <select
                  value={manualForm.service}
                  onChange={(e) => setManualForm({ ...manualForm, service: e.target.value })}
                  className="w-full p-3 bg-gray-900 border border-gray-700 rounded-xl text-white outline-none focus:border-amber-400"
                >
                  <option value="Full-Funnel Organic Growth">Full-Funnel Organic Growth</option>
                  <option value="High-Intent SEO Optimization">High-Intent SEO Optimization</option>
                  <option value="Website Development (Next.js)">Website Development (Next.js)</option>
                  <option value="Off-Page Backlink Building">Off-Page Backlink Building</option>
                  <option value="Content Strategy & Writing">Content Strategy &amp; Writing</option>
                  <option value="Custom Project Work">Custom Project Work</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-gray-300 block mb-1">Scope / Project Requirements</label>
                <textarea
                  rows={3}
                  placeholder="Requirements, discussion details, or deliverables..."
                  value={manualForm.message}
                  onChange={(e) => setManualForm({ ...manualForm, message: e.target.value })}
                  className="w-full p-3 bg-gray-900 border border-gray-700 rounded-xl text-white outline-none focus:border-amber-400 resize-none"
                />
              </div>

              <div>
                <label className="font-bold text-gray-300 block mb-1">Admin Internal Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Client called from UK, quoted $3,000"
                  value={manualForm.notes}
                  onChange={(e) => setManualForm({ ...manualForm, notes: e.target.value })}
                  className="w-full p-3 bg-gray-900 border border-gray-700 rounded-xl text-white outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewEntryOpen(false)}
                  className="px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-extrabold rounded-xl transition-all cursor-pointer shadow-md shadow-amber-500/20"
                >
                  Save into Database →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
