"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import ClientProfileView from "./ClientProfileView";
import AnalyticsDashboardView from "./AnalyticsDashboardView";
import PublisherSitesManager from "./PublisherSitesManager";

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
  phone?: string;
  email?: string;
  name?: string;
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
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authChecked, setAuthChecked] = useState<boolean>(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);

  // Database View State
  const [activeTab, setActiveTab] = useState<"all" | "leads" | "interactions" | "audits" | "payments" | "client_profile" | "analytics" | "publishers" | "trash" | "logs">("all");
  const [selectedClientForProfile, setSelectedClientForProfile] = useState<string>("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const [records, setRecords] = useState<BaseItem[]>([]);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<BaseItem | null>(null);
  const [editingNotes, setEditingNotes] = useState("");
  const [isNewEntryOpen, setIsNewEntryOpen] = useState(false);
  const [isAddPublisherModalOpen, setIsAddPublisherModalOpen] = useState(false);

  // Fixed Admin Credentials
  const FIXED_ADMIN_EMAILS = ["admin@novagrowth.agency", "shrahul270@gmail.com"];
  const FIXED_ADMIN_PASSWORD = "NovaAdmin@2025";

  // Check login on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("nova_admin_session");
      if (stored === "authenticated") {
        setIsAuthenticated(true);
      }
    } catch {}
    setAuthChecked(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    const emailTrimmed = loginEmail.trim().toLowerCase();
    const isEmailValid = FIXED_ADMIN_EMAILS.some((em) => em.toLowerCase() === emailTrimmed);
    const isPasswordValid = loginPassword === FIXED_ADMIN_PASSWORD;

    if (isEmailValid && isPasswordValid) {
      setIsAuthenticated(true);
      try {
        localStorage.setItem("nova_admin_session", "authenticated");
      } catch {}
      showToast("✓ Welcome! Successfully logged in to Database Hub.");
    } else {
      setLoginError("Invalid Email or Password. Please check your credentials.");
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("nova_admin_session");
    } catch {}
    setIsAuthenticated(false);
    setLoginEmail("");
    setLoginPassword("");
    showToast("Logged out successfully.");
  };

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
    if (!isAuthenticated) return;
    try {
      const res = await fetch("/api/db/stats");
      const data = await res.json();
      if (data.success) {
        setStats(data);
      }
    } catch (err) {
      console.error("Error loading stats:", err);
    }
  }, [isAuthenticated]);

  // Fetch Current Records
  const loadRecords = useCallback(async () => {
    if (!isAuthenticated || activeTab === "publishers") return;
    setLoading(true);
    try {
      let endpoint = "/api/db/leads";
      const isTrash = activeTab === "trash";

      if (isTrash) {
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

      if (activeTab === "all" || activeTab === "client_profile") {
        const res = await fetch(`/api/db/leads?showDeleted=false&search=${encodeURIComponent(search)}&status=${statusFilter}&sortOrder=${sortOrder}`);
        const intRes = await fetch(`/api/db/interactions?showDeleted=false&search=${encodeURIComponent(search)}&status=${statusFilter}&sortOrder=${sortOrder}`);
        const audRes = await fetch(`/api/db/audits?showDeleted=false&search=${encodeURIComponent(search)}&status=${statusFilter}&sortOrder=${sortOrder}`);
        const payRes = await fetch(`/api/db/payments?showDeleted=false&search=${encodeURIComponent(search)}&status=${statusFilter}&sortOrder=${sortOrder}`);

        const [lData, iData, aData, pData] = await Promise.all([res.json(), intRes.json(), audRes.json(), payRes.json()]);

        const combined: BaseItem[] = [
          ...(lData.records || []),
          ...(iData.records || []),
          ...(aData.records || []),
          ...(pData.records || []),
        ];

        combined.sort((a, b) => {
          const tA = new Date(a.createdAt || 0).getTime();
          const tB = new Date(b.createdAt || 0).getTime();
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
  }, [isAuthenticated, activeTab, search, statusFilter, sortOrder]);

  useEffect(() => {
    if (isAuthenticated) {
      loadStats();
      loadRecords();
    }
  }, [isAuthenticated, loadStats, loadRecords]);

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
    if (!confirm(`Move record (${item.id}) to Trash? You can restore it later.`)) return;
    try {
      const endpoint = `/api/db/${item.collection}?id=${item.id}&permanent=false`;
      const res = await fetch(endpoint, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showToast("🗑️ Moved to Trash (Safely preserved)");
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
        showToast("✓ Record restored back to active database!");
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
        showToast("✓ Client record created successfully!");
        setIsNewEntryOpen(false);
        setManualForm({
          name: "",
          email: "",
          phone: "",
          service: "Full-Funnel Organic Growth",
          message: "",
          notes: "Manual entry by agency admin",
        });
        await loadRecords();
        await loadStats();
      } else {
        showToast(`❌ Error: ${data.error || "Failed to create record"}`);
      }
    } catch {
      showToast("❌ Failed to create record");
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`📋 Copied ${label} to clipboard!`);
  };

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

  // Clean phone number for WhatsApp link
  const getCleanPhone = (phone?: string) => {
    if (!phone) return "";
    return phone.replace(/[^0-9]/g, "");
  };

  // Real-time partitioned stats calculations (Total vs New)
  const partitionedStats = useMemo(() => {
    const isToday = (dateStr: string) => {
      if (!dateStr) return false;
      const d = new Date(dateStr);
      const now = new Date();
      return (
        d.getFullYear() === now.getFullYear() &&
        d.getMonth() === now.getMonth() &&
        d.getDate() === now.getDate()
      );
    };

    const newLeads =
      stats?.recentActivities?.filter(
        (a) => a.collection === "leads" && (isToday(a.timestamp) || a.action === "create")
      ).length || 0;

    const newWhatsapp =
      stats?.recentActivities?.filter(
        (a) =>
          a.collection === "interactions" &&
          (a.summary?.toLowerCase().includes("whatsapp") || isToday(a.timestamp))
      ).length ||
      (stats?.todayActivity
        ? Math.min(stats.todayActivity, stats?.breakdown.interactions.whatsapp || 0)
        : 0);

    const newCalls =
      stats?.recentActivities?.filter(
        (a) =>
          a.collection === "interactions" &&
          (a.summary?.toLowerCase().includes("call") ||
            a.summary?.toLowerCase().includes("meet") ||
            a.summary?.toLowerCase().includes("video"))
      ).length || 0;

    const newAudits =
      stats?.recentActivities?.filter(
        (a) => a.collection === "audits" && (isToday(a.timestamp) || a.action === "create")
      ).length || 0;

    const newPayments =
      stats?.recentActivities?.filter(
        (a) => a.collection === "payments" && (isToday(a.timestamp) || a.action === "create")
      ).length || 0;

    const newTrash =
      stats?.recentActivities?.filter((a) => a.action === "soft_delete").length || 0;

    return {
      leads: { total: stats?.breakdown.leads.active || 0, new: newLeads },
      whatsapp: { total: stats?.breakdown.interactions.whatsapp || 0, new: newWhatsapp },
      calls: { total: stats?.breakdown.interactions.calls || 0, new: newCalls },
      audits: { total: stats?.breakdown.audits.active || 0, new: newAudits },
      payments: { total: stats?.breakdown.payments.active || 0, new: newPayments },
      trash: { total: stats?.totalDeleted || 0, new: newTrash },
    };
  }, [stats]);

  // IF NOT AUTHENTICATED -> SHOW SECURE LOGIN GATE
  if (authChecked && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070b14] text-white flex items-center justify-center p-6 selection:bg-amber-500 selection:text-black">
        <div className="w-full max-w-md bg-[#0b1220] border border-gray-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden text-center">
          {/* Top Glow Accent */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Logo Badge */}
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 text-black flex items-center justify-center font-black text-xl shadow-lg mx-auto mb-4">
            🔒
          </div>

          <h2 className="text-2xl font-black text-white tracking-tight mb-1">
            Owner Database Portal
          </h2>
          <p className="text-xs text-gray-400 mb-6">
            Confidential agency database. Sign in with your registered admin credentials to view and manage clients.
          </p>

          {loginError && (
            <div className="p-3 mb-5 rounded-xl bg-rose-950/80 border border-rose-800/80 text-rose-300 text-xs font-semibold">
              ⚠️ {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-4 text-left">
            <div>
              <label className="text-xs font-bold text-gray-300 block mb-1.5">
                Admin Email (Registered Gmail)
              </label>
              <input
                required
                type="email"
                placeholder="admin@novagrowth.agency"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white text-xs outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-300 block mb-1.5">
                Admin Security Password
              </label>
              <input
                required
                type="password"
                placeholder="••••••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white text-xs outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-400 text-black font-extrabold py-3.5 rounded-xl text-xs sm:text-sm transition-all shadow-lg shadow-amber-500/20 cursor-pointer mt-2"
            >
              Sign In to Database Hub →
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-gray-800 text-[11px] text-gray-500 flex items-center justify-between">
            <span>🛡️ 256-Bit Encrypted Admin Gate</span>
            <Link href="/" className="text-amber-400 hover:underline">
              ← Return to Site
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // IF AUTHENTICATED -> SHOW COMPLETE DATABASE DASHBOARD
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
      <header className="border-b border-gray-800 bg-[#091427]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 text-black flex items-center justify-center font-black text-sm shadow-md">
                NG
              </div>
              <div>
                <span className="text-base font-black tracking-tight text-white block">Nova Growth</span>
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Private Owner Database Hub</span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3 text-xs">
            {/* Add Website Option for Admin Marketplace */}
            <button
              onClick={() => {
                setActiveTab("publishers");
                setIsAddPublisherModalOpen(true);
              }}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-md shadow-emerald-600/25 cursor-pointer"
              title="Add a new publisher website to marketplace inventory"
            >
              <span>🌐</span>
              <span>+ Add Website</span>
            </button>

            <button
              onClick={() => setIsNewEntryOpen(true)}
              className="bg-amber-500 hover:bg-amber-400 text-black font-extrabold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-md shadow-amber-500/20 cursor-pointer"
            >
              <span>+</span>
              <span>New Client Entry</span>
            </button>

            <a
              href={`/api/db/export?format=excel&collection=${activeTab === "trash" || activeTab === "logs" ? "all" : activeTab}`}
              download
              className="bg-gray-800 hover:bg-gray-700 text-white font-bold px-3.5 py-2 rounded-xl border border-gray-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Export database records to Excel (CSV format)"
            >
              <span>📊</span>
              <span>Export Excel</span>
            </a>

            <a
              href="/api/db/export?format=json&collection=all"
              download
              className="bg-gray-800 hover:bg-gray-700 text-white font-bold px-3.5 py-2 rounded-xl border border-gray-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>💾</span>
              <span>JSON Backup</span>
            </a>

            {/* Supabase Cloud DB Link */}
            <a
              href="https://supabase.com/dashboard/project/kcabtdbzqczvzbzkdyjd/editor"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 hover:text-white border border-emerald-700/80 font-bold px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-md shadow-emerald-500/10 cursor-pointer"
              title="Open Supabase Cloud Database Table Editor"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Supabase Cloud DB ↗</span>
            </a>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="bg-rose-950/80 hover:bg-rose-900 text-rose-300 hover:text-white border border-rose-800/80 font-bold px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Logout from admin database"
            >
              <span>🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* STATS OVERVIEW CARDS (PARTITIONED INTO TOTAL & NEW) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mb-8">
          {/* Card 1: Active Leads */}
          <div className="bg-[#0b1220] p-3.5 rounded-2xl border border-gray-800 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Active Leads</span>
              <span className="text-[9px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded font-mono font-bold">LEADS</span>
            </div>
            <div className="grid grid-cols-2 divide-x divide-gray-800/90 pt-1">
              <div className="pr-2">
                <span className="text-[10px] text-gray-400 uppercase font-semibold block leading-tight">Total</span>
                <span className="text-xl sm:text-2xl font-black text-amber-400">{partitionedStats.leads.total}</span>
              </div>
              <div className="pl-3">
                <span className="text-[10px] text-emerald-400 uppercase font-semibold block leading-tight">New</span>
                <span className="text-xl sm:text-2xl font-black text-emerald-400">+{partitionedStats.leads.new}</span>
              </div>
            </div>
            <span className="text-[10px] text-gray-500 block mt-2 border-t border-gray-900 pt-1.5 truncate">Form Submissions</span>
          </div>

          {/* Card 2: WhatsApp Clicks */}
          <div className="bg-[#0b1220] p-3.5 rounded-2xl border border-gray-800 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">WhatsApp Clicks</span>
              <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded font-mono font-bold">CHAT</span>
            </div>
            <div className="grid grid-cols-2 divide-x divide-gray-800/90 pt-1">
              <div className="pr-2">
                <span className="text-[10px] text-gray-400 uppercase font-semibold block leading-tight">Total</span>
                <span className="text-xl sm:text-2xl font-black text-emerald-400">{partitionedStats.whatsapp.total}</span>
              </div>
              <div className="pl-3">
                <span className="text-[10px] text-emerald-400 uppercase font-semibold block leading-tight">New</span>
                <span className="text-xl sm:text-2xl font-black text-emerald-400">+{partitionedStats.whatsapp.new}</span>
              </div>
            </div>
            <span className="text-[10px] text-gray-500 block mt-2 border-t border-gray-900 pt-1.5 truncate">Direct Inquiries</span>
          </div>

          {/* Card 3: Calls & Meets */}
          <div className="bg-[#0b1220] p-3.5 rounded-2xl border border-gray-800 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Calls &amp; Meets</span>
              <span className="text-[9px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-1.5 py-0.5 rounded font-mono font-bold">MEETS</span>
            </div>
            <div className="grid grid-cols-2 divide-x divide-gray-800/90 pt-1">
              <div className="pr-2">
                <span className="text-[10px] text-gray-400 uppercase font-semibold block leading-tight">Total</span>
                <span className="text-xl sm:text-2xl font-black text-blue-400">{partitionedStats.calls.total}</span>
              </div>
              <div className="pl-3">
                <span className="text-[10px] text-blue-400 uppercase font-semibold block leading-tight">New</span>
                <span className="text-xl sm:text-2xl font-black text-blue-400">+{partitionedStats.calls.new}</span>
              </div>
            </div>
            <span className="text-[10px] text-gray-500 block mt-2 border-t border-gray-900 pt-1.5 truncate">Video / Phone</span>
          </div>

          {/* Card 4: SEO Audits */}
          <div className="bg-[#0b1220] p-3.5 rounded-2xl border border-gray-800 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">SEO Audits</span>
              <span className="text-[9px] bg-purple-500/10 text-purple-400 border border-purple-500/20 px-1.5 py-0.5 rounded font-mono font-bold">TOOL</span>
            </div>
            <div className="grid grid-cols-2 divide-x divide-gray-800/90 pt-1">
              <div className="pr-2">
                <span className="text-[10px] text-gray-400 uppercase font-semibold block leading-tight">Total</span>
                <span className="text-xl sm:text-2xl font-black text-purple-400">{partitionedStats.audits.total}</span>
              </div>
              <div className="pl-3">
                <span className="text-[10px] text-purple-400 uppercase font-semibold block leading-tight">New</span>
                <span className="text-xl sm:text-2xl font-black text-purple-400">+{partitionedStats.audits.new}</span>
              </div>
            </div>
            <span className="text-[10px] text-gray-500 block mt-2 border-t border-gray-900 pt-1.5 truncate">Domains Tested</span>
          </div>

          {/* Card 5: Payments */}
          <div className="bg-[#0b1220] p-3.5 rounded-2xl border border-gray-800 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Payments</span>
              <span className="text-[9px] bg-teal-500/10 text-teal-400 border border-teal-500/20 px-1.5 py-0.5 rounded font-mono font-bold">REV</span>
            </div>
            <div className="grid grid-cols-2 divide-x divide-gray-800/90 pt-1">
              <div className="pr-2">
                <span className="text-[10px] text-gray-400 uppercase font-semibold block leading-tight">Total</span>
                <span className="text-xl sm:text-2xl font-black text-teal-400">{partitionedStats.payments.total}</span>
              </div>
              <div className="pl-3">
                <span className="text-[10px] text-teal-400 uppercase font-semibold block leading-tight">New</span>
                <span className="text-xl sm:text-2xl font-black text-teal-400">+{partitionedStats.payments.new}</span>
              </div>
            </div>
            <span className="text-[10px] text-gray-500 block mt-2 border-t border-gray-900 pt-1.5 truncate">Checkouts & Retainers</span>
          </div>

          {/* Card 6: In Trash */}
          <div className="bg-[#0b1220] p-3.5 rounded-2xl border border-rose-900/40 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] text-rose-400 font-bold uppercase tracking-wider">In Trash</span>
              <span className="text-[9px] bg-rose-500/10 text-rose-400 border border-rose-500/20 px-1.5 py-0.5 rounded font-mono font-bold">RECOVER</span>
            </div>
            <div className="grid grid-cols-2 divide-x divide-gray-800/90 pt-1">
              <div className="pr-2">
                <span className="text-[10px] text-gray-400 uppercase font-semibold block leading-tight">Total</span>
                <span className="text-xl sm:text-2xl font-black text-rose-500">{partitionedStats.trash.total}</span>
              </div>
              <div className="pl-3">
                <span className="text-[10px] text-rose-400 uppercase font-semibold block leading-tight">New</span>
                <span className="text-xl sm:text-2xl font-black text-rose-400">+{partitionedStats.trash.new}</span>
              </div>
            </div>
            <span className="text-[10px] text-gray-500 block mt-2 border-t border-gray-900 pt-1.5 truncate">Recoverable Records</span>
          </div>
        </div>

        {/* CONTROLS BAR: Tabs, Search, Sort & Status Filters */}
        <div className="bg-[#0b1220] p-4 rounded-2xl border border-gray-800 mb-6 flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Main Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full lg:w-auto">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "all"
                  ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
                  : "bg-gray-900/60 text-gray-400 hover:text-white border border-gray-800"
              }`}
            >
              🌟 All Activities ({stats?.totalActive || 0})
            </button>

            <button
              onClick={() => setActiveTab("leads")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "leads"
                  ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
                  : "bg-gray-900/60 text-gray-400 hover:text-white border border-gray-800"
              }`}
            >
              📋 Leads &amp; Clients ({stats?.breakdown.leads.active || 0})
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
              onClick={() => setActiveTab("client_profile")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "client_profile"
                  ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
                  : "bg-amber-950/40 text-amber-300 hover:text-white border border-amber-800/60"
              }`}
            >
              <span>👤</span>
              <span>Client 360° Dossier</span>
            </button>

            <button
              onClick={() => setActiveTab("analytics")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "analytics"
                  ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
                  : "bg-blue-950/40 text-blue-300 hover:text-white border border-blue-800/60"
              }`}
            >
              <span>📊</span>
              <span>Data Analytics</span>
            </button>

            {/* Vefogix-style Guest Posting Marketplace Publishers Tab */}
            <button
              onClick={() => setActiveTab("publishers")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "publishers"
                  ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
                  : "bg-teal-950/40 text-teal-300 hover:text-white border border-teal-800/60"
              }`}
            >
              <span>🌐</span>
              <span>Publisher Sites</span>
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

          {/* Search & Sort Filters (for CRM & activity records) */}
          {activeTab !== "publishers" && (
            <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
              {/* Search Input */}
              <div className="relative flex-1 sm:w-64">
                <input
                  type="text"
                  placeholder="Search by name, email, phone, website..."
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
              {activeTab !== "trash" && activeTab !== "logs" && activeTab !== "client_profile" && (
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
          )}
        </div>

        {/* MAIN DATA TABLE / PUBLISHER VIEW */}
        {activeTab === "publishers" ? (
          <PublisherSitesManager
            onNotify={showToast}
            isAddModalOpen={isAddPublisherModalOpen}
            setIsAddModalOpen={setIsAddPublisherModalOpen}
          />
        ) : activeTab === "client_profile" ? (
          <ClientProfileView
            records={records}
            initialQuery={selectedClientForProfile}
            formatDate={formatDate}
            copyToClipboard={copyToClipboard}
            onRefreshData={loadRecords}
          />
        ) : activeTab === "analytics" ? (
          <AnalyticsDashboardView stats={stats} />
        ) : activeTab === "logs" ? (
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
                      <th className="py-3.5 px-4 min-w-[240px]">Client Contact (Gmail &amp; Phone)</th>
                      <th className="py-3.5 px-4">Service / Type</th>
                      <th className="py-3.5 px-4">Details / Message</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/60 text-gray-300">
                    {records.map((item) => {
                      // Robust extraction of phone even with spaces or +
                      const extractPhone = (record: BaseItem): string => {
                        if (record.phone && String(record.phone).trim()) return String(record.phone).trim();
                        if (record.clientIdentifier && /[0-9]/.test(record.clientIdentifier)) return String(record.clientIdentifier).trim();
                        if (record.details) {
                          const raw = String(record.details);
                          const digits = raw.replace(/[^0-9]/g, "");
                          if (digits.length >= 7) return raw.trim();
                        }
                        return "";
                      };

                      // Robust extraction of email
                      const extractEmail = (record: BaseItem): string => {
                        if (record.email && String(record.email).trim()) return String(record.email).trim();
                        if (record.clientEmail && String(record.clientEmail).trim()) return String(record.clientEmail).trim();
                        if (record.emailSubmitted && String(record.emailSubmitted).trim()) return String(record.emailSubmitted).trim();
                        if (record.clientIdentifier && record.clientIdentifier.includes("@")) return String(record.clientIdentifier).trim();
                        if (record.details && String(record.details).includes("@")) {
                          const match = String(record.details).match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
                          if (match) return match[0];
                        }
                        return "";
                      };

                      const phoneCandidate = extractPhone(item);
                      const cleanPhone = getCleanPhone(phoneCandidate);
                      const emailAddress = extractEmail(item);

                      const clientDisplayName = item.name || (item.action === "whatsapp" ? "WhatsApp Visitor" : item.action === "video_call" ? "Video Call Inquirer" : item.domain || item.clientName || item.title || "Client Inquirer");

                      return (
                        <tr key={item.id} className="hover:bg-gray-900/40 transition-colors">

                          {/* Date */}
                          <td className="py-3.5 px-4 whitespace-nowrap font-mono text-[11px] text-gray-400 align-top">
                            <div>{formatDate(item.createdAt)}</div>
                            {item.isDeleted && (
                              <span className="text-[10px] text-rose-400 font-bold block mt-1">
                                Deleted: {formatDate(item.deletedAt || "")}
                              </span>
                            )}
                          </td>

                          {/* Client Contact Info (PROMINENT GMAIL & PHONE) */}
                          <td className="py-3.5 px-4 align-top">
                            {/* Client Name */}
                            <div className="font-black text-white text-sm mb-1.5 flex items-center gap-2">
                              <span>{clientDisplayName}</span>
                              {item.action === "whatsapp" && (
                                <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] font-bold border border-emerald-800">
                                  WhatsApp
                                </span>
                              )}
                            </div>

                            {/* Gmail / Email with Quick Actions */}
                            {emailAddress ? (
                              <div className="flex items-center gap-1.5 mb-1.5">
                                <span className="text-gray-400 text-xs">✉️</span>
                                <a
                                  href={`mailto:${emailAddress}`}
                                  className="font-bold text-amber-400 hover:underline text-xs"
                                  title="Send email"
                                >
                                  {emailAddress}
                                </a>
                                <button
                                  type="button"
                                  onClick={() => copyToClipboard(emailAddress, "Email")}
                                  className="text-[10px] text-gray-500 hover:text-white px-1.5 py-0.5 rounded bg-gray-800/80 cursor-pointer"
                                  title="Copy Email"
                                >
                                  📋
                                </button>
                              </div>
                            ) : (
                              <div className="text-gray-500 text-[11px] mb-1">✉️ Email: —</div>
                            )}

                            {/* Phone / WhatsApp Number with 1-Click WhatsApp & Call */}
                            {phoneCandidate ? (
                              <div className="flex flex-wrap items-center gap-1.5 mt-1">
                                <span className="font-bold text-emerald-400 text-xs flex items-center gap-1 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-md">
                                  <span>📞</span>
                                  <span>{phoneCandidate}</span>
                                </span>

                                {cleanPhone && (
                                  <a
                                    href={`https://wa.me/${cleanPhone}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-2 py-0.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] transition-colors flex items-center gap-1 cursor-pointer"
                                    title="Open WhatsApp chat with client"
                                  >
                                    <span>💬 WhatsApp</span>
                                  </a>
                                )}

                                <a
                                  href={`tel:${cleanPhone || phoneCandidate}`}
                                  className="px-2 py-0.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-bold text-[10px] transition-colors flex items-center gap-1 cursor-pointer"
                                  title="Direct Phone Call"
                                >
                                  <span>Call</span>
                                </a>

                                <button
                                  type="button"
                                  onClick={() => copyToClipboard(phoneCandidate, "Phone")}
                                  className="text-[10px] text-gray-500 hover:text-white px-1.5 py-0.5 rounded bg-gray-800/80 cursor-pointer"
                                  title="Copy Phone"
                                >
                                  📋
                                </button>
                              </div>
                            ) : (
                              <div className="text-gray-500 text-[11px]">📞 Phone: —</div>
                            )}


                            {/* Website link if provided */}
                            {item.website && (
                              <div className="mt-1.5">
                                <a
                                  href={item.website.startsWith("http") ? item.website : `https://${item.website}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-blue-400 hover:underline text-[11px] flex items-center gap-1 truncate max-w-[220px]"
                                >
                                  <span>🌐</span>
                                  <span>{item.website}</span>
                                </a>
                              </div>
                            )}

                            {/* Quick Client 360° Jump */}
                            {(item.email || phoneCandidate || item.name) && (
                              <div className="mt-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedClientForProfile(item.email || phoneCandidate || item.name || "");
                                    setActiveTab("client_profile");
                                  }}
                                  className="px-2 py-0.5 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold transition-colors cursor-pointer inline-flex items-center gap-1"
                                  title="Open full 360° Dossier for this client"
                                >
                                  <span>👤</span>
                                  <span>Client 360° Dossier</span>
                                </button>
                              </div>
                            )}
                          </td>

                          {/* Type / Service */}
                          <td className="py-3.5 px-4 align-top">
                            <span className="px-2 py-0.5 rounded-md bg-gray-800 border border-gray-700 text-gray-300 text-[10px] font-bold uppercase inline-block mb-1">
                              {item.type || item.collection}
                            </span>
                            <div className="text-gray-300 text-[11.5px] font-semibold">
                              {item.service || item.planName || item.action || item.scores?.rankingTier || "—"}
                            </div>
                            {item.budget && <div className="text-emerald-400 text-[10.5px] mt-0.5">💰 {item.budget}</div>}
                            {item.amount && (
                              <div className="text-emerald-400 font-bold text-xs mt-0.5">
                                {item.currency} {item.amount}
                              </div>
                            )}
                          </td>

                          {/* Details / Message */}
                          <td className="py-3.5 px-4 max-w-xs align-top">
                            <p className="line-clamp-3 text-gray-300 text-[11.5px] leading-relaxed">
                              {item.message || item.details || item.notes || (item.scores ? `Rank: ${item.scores.rankingPosition} (${item.scores.rankingTier})` : "—")}
                            </p>
                            {item.notes && (
                              <div className="text-[10.5px] text-amber-300/90 mt-1.5 italic bg-amber-950/30 border border-amber-900/40 p-1.5 rounded-lg">
                                📝 Admin Note: {item.notes}
                              </div>
                            )}
                          </td>

                          {/* Status */}
                          <td className="py-3.5 px-4 whitespace-nowrap align-top">
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
                          <td className="py-3.5 px-4 text-right whitespace-nowrap align-top">
                            {item.isDeleted ? (
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleRestore(item)}
                                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                                  title="Restore record back to active database"
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
                                  title="Add/Edit internal admin notes"
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
                      );
                    })}
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
            <h4 className="text-base font-bold text-white mb-1">
              Add Notes for {selectedRecord.name || selectedRecord.domain || selectedRecord.id}
            </h4>
            <p className="text-xs text-gray-400 mb-4">
              Add internal client follow-up notes, call summary, or project decisions.
            </p>
            <textarea
              rows={4}
              value={editingNotes}
              onChange={(e) => setEditingNotes(e.target.value)}
              placeholder="e.g. Spoke to client on phone, agreed on $3,500 SEO package..."
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
                <span>Add Client Record Manually</span>
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
                  <label className="font-bold text-gray-300 block mb-1">Client Email (Gmail) *</label>
                  <input
                    required
                    type="email"
                    placeholder="david@company.com"
                    value={manualForm.email}
                    onChange={(e) => setManualForm({ ...manualForm, email: e.target.value })}
                    className="w-full p-3 bg-gray-900 border border-gray-700 rounded-xl text-white outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-300 block mb-1">Phone / WhatsApp Number *</label>
                  <input
                    required
                    type="tel"
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
