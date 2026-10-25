"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import ClientProfileView from "./ClientProfileView";
import AnalyticsDashboardView from "./AnalyticsDashboardView";
import PublisherSitesManager from "./PublisherSitesManager";
import { PublisherSite } from "../data/publishersData";

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
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active View State (Nova Growth Sidebar Selection)
  const [activeTab, setActiveTab] = useState<
    | "dashboard"
    | "live_locations"
    | "publishers_all"
    | "publishers_premium"
    | "publishers_iplay"
    | "publishers_trusted"
    | "publishers_verified"
    | "publishers_forbidden"
    | "publishers_link_insertion"
    | "publishers_top_selling"
    | "publishers_favorites"
    | "publishers_blacklisted"
    | "leads"
    | "interactions"
    | "audits"
    | "payments"
    | "client_profile"
    | "analytics"
    | "trash"
    | "logs"
  >("dashboard");

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
  const [isGuestPostMenuOpen, setIsGuestPostMenuOpen] = useState(true);
  const [isCrmMenuOpen, setIsCrmMenuOpen] = useState(true);

  // Verify server-side session cookie on mount
  useEffect(() => {
    const checkServerSession = async () => {
      try {
        const res = await fetch("/api/admin/verify");
        const data = await res.json();
        if (data.authenticated) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      } finally {
        setAuthChecked(true);
      }
    };
    checkServerSession();
  }, []);

  // Secure Server-Side Login with Brute-Force Rate Limiting
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        showToast("✓ Security verified! Logged in to Admin Workspace.");
        setLoginEmail("");
        setLoginPassword("");
      } else {
        setLoginError(data.error || "Invalid Email or Password. Access denied.");
      }
    } catch {
      setLoginError("Network security error. Please check your connection.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Secure Server-Side Logout (Destroys HTTP-only session cookie)
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {}
    setIsAuthenticated(false);
    setLoginEmail("");
    setLoginPassword("");
    showToast("Logged out securely.");
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

  // Fetch Current Records (when on CRM tabs)
  const isPublisherTab = activeTab === "dashboard" || activeTab.startsWith("publishers_");

  const loadRecords = useCallback(async () => {
    if (!isAuthenticated || isPublisherTab) return;
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

      if (activeTab === "client_profile" || activeTab === "live_locations") {
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
  }, [isAuthenticated, activeTab, isPublisherTab, search, statusFilter, sortOrder]);

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
        body: JSON.stringify({ id: item.id, collection: item.collection }),
      });
      const data = await res.json();
      if (data.success) {
        showToast("✓ Restored successfully");
        loadRecords();
        loadStats();
      }
    } catch {
      showToast("❌ Failed to restore");
    }
  };

  // Permanent Delete
  const handlePermanentDelete = async (item: BaseItem) => {
    if (!confirm(`⚠️ PERMANENTLY delete record (${item.id})? This CANNOT be undone!`)) return;
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
      showToast("❌ Failed to delete");
    }
  };

  // Submit Manual Record
  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/db/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...manualForm,
          type: "manual_entry",
          status: "new",
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast("✓ Client record successfully saved to database!");
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
      } else {
        showToast(`❌ Error: ${data.error || "Failed to save"}`);
      }
    } catch {
      showToast("❌ Network error saving client entry");
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`✓ Copied ${label} to clipboard`);
  };

  const formatDate = (isoString?: string) => {
    if (!isoString) return "—";
    const d = new Date(isoString);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getCleanPhone = (phone?: string) => {
    if (!phone) return "";
    return phone.replace(/[^0-9]/g, "");
  };

  // Partitioned Stats: Total vs New (as drawn in red lines on user's Image 1)
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

  // Map activeTab to PublisherSitesManager preset
  const publisherPreset = useMemo(() => {
    if (activeTab === "publishers_premium") return "premium";
    if (activeTab === "publishers_iplay") return "iplay";
    if (activeTab === "publishers_trusted") return "trusted";
    if (activeTab === "publishers_verified") return "verified";
    if (activeTab === "publishers_forbidden") return "forbidden";
    if (activeTab === "publishers_link_insertion") return "link_insertion";
    if (activeTab === "publishers_top_selling") return "top_selling";
    if (activeTab === "publishers_favorites") return "favorites";
    if (activeTab === "publishers_blacklisted") return "blacklisted";
    return "all";
  }, [activeTab]);

  // IF NOT AUTHENTICATED -> SHOW SECURE LOGIN GATE
  if (authChecked && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex items-center justify-center p-6 selection:bg-blue-600 selection:text-white">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 shadow-xl relative overflow-hidden text-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-black text-xl shadow-lg mx-auto mb-4">
            🔒
          </div>

          <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-1">
            Owner &amp; Admin Workspace
          </h2>
          <p className="text-xs text-slate-500 mb-6 font-medium">
            Sign in with registered admin credentials to manage marketplace websites, buyer orders, and leads.
          </p>

          {loginError && (
            <div className="p-3 mb-5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
              ⚠️ {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-4 text-left">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Admin Email Address
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="admin@novagrowth.agency"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className={`w-full py-3 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-indigo-500/20 cursor-pointer mt-2 ${
                isLoggingIn
                  ? "bg-indigo-400 cursor-not-allowed opacity-75"
                  : "bg-[#4a3aff] hover:bg-[#3d2ee0]"
              }`}
            >
              {isLoggingIn ? "Verifying Credentials..." : "Sign In to Admin Workspace →"}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Agency Owner Portal</span>
            <Link href="/" className="text-blue-600 font-bold hover:underline">
              ← Return to Main Site
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* TOAST ALERT NOTIFICATION */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white font-bold text-xs px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 animate-in fade-in slide-in-from-top-4 duration-200">
          {toast}
        </div>
      )}

      {/* TOP TICKER BAR (Rank 67.7K, Traffic 280K+, L 0, LD 73.7K) */}
      <div className="bg-[#0b1220] text-slate-300 text-[11px] font-mono py-1.5 px-6 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1.5 text-blue-400 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span>SQ</span>
          </span>
          <span>Rank <strong className="text-white">67.7K</strong></span>
          <span>Traffic <strong className="text-white">280K+</strong></span>
          <span>L <strong className="text-white">0</strong></span>
          <span>LD <strong className="text-white">73.7K</strong></span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-slate-400">
          <span>Live Sync: Active</span>
          <span className="text-emerald-400 font-bold">● Nova Growth Workspace Mode</span>
        </div>
      </div>

      {/* MAIN HEADER NAVBAR */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Dropdown menus */}
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
                  Admin &amp; Buyer Hub
                </span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-4 text-xs font-bold text-slate-600">
              <button
                onClick={() => setActiveTab("dashboard")}
                className="hover:text-blue-600 flex items-center gap-1 cursor-pointer"
              >
                <span>Tools</span>
                <span className="text-[10px]">⌵</span>
              </button>
              <button
                onClick={() => setActiveTab("publishers_all")}
                className="hover:text-blue-600 flex items-center gap-1 cursor-pointer"
              >
                <span>Marketplace</span>
                <span className="text-[10px]">⌵</span>
              </button>
              <Link href="/guest-posting" className="hover:text-blue-600" target="_blank">
                Live Storefront ↗
              </Link>
            </nav>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 text-xs">
            <button
              onClick={() => setIsAddPublisherModalOpen(true)}
              className="bg-[#4a3aff] hover:bg-[#3d2ee0] text-white font-bold px-3.5 py-2 rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <span>+</span>
              <span>Add Website</span>
            </button>

            <button
              onClick={() => setIsNewEntryOpen(true)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>+</span>
              <span>New Lead</span>
            </button>

            <button
              onClick={handleLogout}
              className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold px-3 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1"
              title="Logout from admin session"
            >
              <span>🚪</span>
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* DUAL SIDEBAR + MAIN WORKSPACE BODY */}
      <div className="flex flex-1 overflow-hidden">
        {/* 1. LEFT SLIM ICON RAIL */}
        <aside className="w-14 bg-white border-r border-slate-200 flex flex-col items-center py-4 gap-4 select-none shrink-0 text-slate-500">
          <button
            onClick={() => setIsGuestPostMenuOpen(!isGuestPostMenuOpen)}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-800 text-xs font-bold transition-colors cursor-pointer"
            title="Toggle Sidebar"
          >
            «
          </button>

          {/* Folder */}
          <button
            onClick={() => setActiveTab("dashboard")}
            className="p-2 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer text-base"
            title="Projects & Workspaces"
          >
            📁
          </button>

          {/* Document / Publisher Sheets (Highlighted active icon from screenshot) */}
          <button
            onClick={() => setActiveTab("publishers_all")}
            className="p-2 rounded-xl bg-blue-50 text-blue-600 border-l-4 border-blue-600 transition-colors cursor-pointer text-base shadow-xs"
            title="Guest Post Marketplace"
          >
            📄
          </button>

          {/* Chat / Messages */}
          <button
            onClick={() => setActiveTab("interactions")}
            className="p-2 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer text-base"
            title="WhatsApp & Inquiries"
          >
            💬
          </button>

          {/* Cart / Orders */}
          <button
            onClick={() => setActiveTab("payments")}
            className="p-2 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer text-base"
            title="Orders & Payments"
          >
            🛒
          </button>

          {/* Gift / Promotions */}
          <button
            onClick={() => setActiveTab("publishers_top_selling")}
            className="p-2 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer text-base"
            title="Top Selling & Promotions"
          >
            🎁
          </button>

          {/* Office / Building */}
          <button
            onClick={() => setActiveTab("leads")}
            className="p-2 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer text-base"
            title="CRM Leads & Clients"
          >
            🏢
          </button>

          {/* Tools / Settings */}
          <button
            onClick={() => setActiveTab("analytics")}
            className="p-2 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer text-base"
            title="Data Analytics"
          >
            🔧
          </button>

          {/* Support / Help */}
          <button
            onClick={() => showToast("Support channel: admin@novagrowth.agency")}
            className="p-2 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer text-base mt-auto"
            title="Customer Support"
          >
            🎧
          </button>
        </aside>

        {/* 2. EXPANDED SIDEBAR MENU */}
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 overflow-y-auto">
          <div className="p-3.5 space-y-4">
            {/* GUEST POST SITES ACCORDION */}
            <div>
              <button
                onClick={() => setIsGuestPostMenuOpen(!isGuestPostMenuOpen)}
                className="w-full flex items-center justify-between text-xs font-bold text-slate-700 hover:text-blue-600 p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <span>📑</span>
                  <span>Guest Post Sites</span>
                </span>
                <span className="text-[10px] text-slate-400">
                  {isGuestPostMenuOpen ? "▼" : "▶"}
                </span>
              </button>

              {isGuestPostMenuOpen && (
                <div className="mt-1 space-y-1 pl-1 text-xs">
                  {/* Dashboard */}
                  <button
                    onClick={() => setActiveTab("dashboard")}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-bold transition-all cursor-pointer ${
                      activeTab === "dashboard"
                        ? "bg-[#ebf3ff] text-[#2563eb] shadow-xs"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>⏱️</span>
                      <span>Dashboard</span>
                    </span>
                    <span className="text-xs">›</span>
                  </button>

                  {/* 📍 Live Location Tracker (High-Visibility Direct Tab) */}
                  <button
                    onClick={() => setActiveTab("live_locations")}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold transition-all cursor-pointer ${
                      activeTab === "live_locations"
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20"
                        : "bg-blue-50/80 hover:bg-blue-100 text-blue-900 border border-blue-200"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span>📍 Live Location Tracker</span>
                    </span>
                    <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-emerald-400 text-black">
                      LIVE
                    </span>
                  </button>

                  {/* All Publisher Sites */}
                  <button
                    onClick={() => setActiveTab("publishers_all")}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                      activeTab === "publishers_all"
                        ? "bg-[#ebf3ff] text-[#2563eb] font-bold"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>📄</span>
                      <span>All Publisher Sites</span>
                    </span>
                  </button>

                  {/* 👑 Premium Sites (Warm yellow pill badge from screenshot) */}
                  <button
                    onClick={() => setActiveTab("publishers_premium")}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-bold transition-all cursor-pointer ${
                      activeTab === "publishers_premium"
                        ? "bg-[#fef3c7] text-[#92400e] border border-amber-300"
                        : "bg-[#fffbeb] text-[#b45309] border border-[#fde68a] hover:bg-[#fef3c7]"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>👑</span>
                      <span>Premium Sites</span>
                    </span>
                  </button>

                  {/* 🎮 iPlay Sites (Warm orange pill badge from screenshot) */}
                  <button
                    onClick={() => setActiveTab("publishers_iplay")}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-bold transition-all cursor-pointer ${
                      activeTab === "publishers_iplay"
                        ? "bg-[#ffedd5] text-[#9a3412] border border-orange-300"
                        : "bg-[#fff7ed] text-[#c2410c] border border-[#fed7aa] hover:bg-[#ffedd5]"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>🎮</span>
                      <span>iPlay Sites</span>
                    </span>
                  </button>

                  {/* Trusted Sites */}
                  <button
                    onClick={() => setActiveTab("publishers_trusted")}
                    className={`w-full flex items-center px-3 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                      activeTab === "publishers_trusted"
                        ? "bg-[#ebf3ff] text-[#2563eb] font-bold"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>🛡️</span>
                      <span>Trusted Sites</span>
                    </span>
                  </button>

                  {/* Verified Sites */}
                  <button
                    onClick={() => setActiveTab("publishers_verified")}
                    className={`w-full flex items-center px-3 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                      activeTab === "publishers_verified"
                        ? "bg-[#ebf3ff] text-[#2563eb] font-bold"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>✅</span>
                      <span>Verified Sites</span>
                    </span>
                  </button>

                  {/* Forbidden Sites */}
                  <button
                    onClick={() => setActiveTab("publishers_forbidden")}
                    className={`w-full flex items-center px-3 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                      activeTab === "publishers_forbidden"
                        ? "bg-[#ebf3ff] text-[#2563eb] font-bold"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>🚫</span>
                      <span>Forbidden Sites</span>
                    </span>
                  </button>

                  {/* Link Insertion Sites */}
                  <button
                    onClick={() => setActiveTab("publishers_link_insertion")}
                    className={`w-full flex items-center px-3 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                      activeTab === "publishers_link_insertion"
                        ? "bg-[#ebf3ff] text-[#2563eb] font-bold"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>🔗</span>
                      <span>Link Insertion Sites</span>
                    </span>
                  </button>

                  {/* Top Selling */}
                  <button
                    onClick={() => setActiveTab("publishers_top_selling")}
                    className={`w-full flex items-center px-3 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                      activeTab === "publishers_top_selling"
                        ? "bg-[#ebf3ff] text-[#2563eb] font-bold"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>🏷️</span>
                      <span>Top Selling</span>
                    </span>
                  </button>

                  {/* Favourite Sites */}
                  <button
                    onClick={() => setActiveTab("publishers_favorites")}
                    className={`w-full flex items-center px-3 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                      activeTab === "publishers_favorites"
                        ? "bg-[#ebf3ff] text-[#2563eb] font-bold"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>🤍</span>
                      <span>Favourite Sites</span>
                    </span>
                  </button>

                  {/* Blacklisted Sites */}
                  <button
                    onClick={() => setActiveTab("publishers_blacklisted")}
                    className={`w-full flex items-center px-3 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                      activeTab === "publishers_blacklisted"
                        ? "bg-[#ebf3ff] text-[#2563eb] font-bold"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>⛔</span>
                      <span>Blacklisted Sites</span>
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* AGENCY CRM & DATABASE ACCORDION */}
            <div>
              <button
                onClick={() => setIsCrmMenuOpen(!isCrmMenuOpen)}
                className="w-full flex items-center justify-between text-xs font-bold text-slate-700 hover:text-blue-600 p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <span>🏢</span>
                  <span>CRM &amp; Inquiries</span>
                </span>
                <span className="text-[10px] text-slate-400">
                  {isCrmMenuOpen ? "▼" : "▶"}
                </span>
              </button>

              {isCrmMenuOpen && (
                <div className="mt-1 space-y-1 pl-1 text-xs">
                  <button
                    onClick={() => setActiveTab("leads")}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                      activeTab === "leads"
                        ? "bg-[#ebf3ff] text-[#2563eb] font-bold"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>📋</span>
                      <span>Leads &amp; Clients</span>
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">
                      {partitionedStats.leads.total}
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveTab("interactions")}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                      activeTab === "interactions"
                        ? "bg-[#ebf3ff] text-[#2563eb] font-bold"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>💬</span>
                      <span>WhatsApp &amp; Calls</span>
                    </span>
                    <span className="text-[11px] font-bold text-emerald-600">
                      {partitionedStats.whatsapp.total}
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveTab("audits")}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                      activeTab === "audits"
                        ? "bg-[#ebf3ff] text-[#2563eb] font-bold"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>🔍</span>
                      <span>SEO Audits</span>
                    </span>
                    <span className="text-[11px] font-bold text-purple-600">
                      {partitionedStats.audits.total}
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveTab("payments")}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                      activeTab === "payments"
                        ? "bg-[#ebf3ff] text-[#2563eb] font-bold"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>💳</span>
                      <span>Orders &amp; Payments</span>
                    </span>
                    <span className="text-[11px] font-bold text-blue-600">
                      {partitionedStats.payments.total}
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveTab("client_profile")}
                    className={`w-full flex items-center px-3 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                      activeTab === "client_profile"
                        ? "bg-[#ebf3ff] text-[#2563eb] font-bold"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>👤</span>
                      <span>Client 360° Dossier</span>
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveTab("analytics")}
                    className={`w-full flex items-center px-3 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                      activeTab === "analytics"
                        ? "bg-[#ebf3ff] text-[#2563eb] font-bold"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>📊</span>
                      <span>Data Analytics</span>
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveTab("trash")}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                      activeTab === "trash"
                        ? "bg-rose-50 text-rose-700 font-bold"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>🗑️</span>
                      <span>Trash Bin</span>
                    </span>
                    <span className="text-[11px] font-bold text-rose-600">
                      {partitionedStats.trash.total}
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* BOTTOM SPONSORED PROMO BOX */}
          <div className="p-3 m-3 bg-blue-50/50 border border-blue-100 rounded-2xl">
            <div className="flex items-center justify-between mb-2">
              <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold text-[9px] uppercase tracking-wider">
                SPONSORED
              </span>
              <span className="text-slate-400 text-xs">↗</span>
            </div>
            <p className="text-xs font-bold text-slate-800 leading-snug mb-1">
              Professional SEO Website Content Writing Services
            </p>
            <div className="flex items-center gap-1 text-[11px] text-amber-500 font-bold mb-3">
              <span>★ 5.0</span>
              <span className="text-slate-400 font-normal">(23)</span>
            </div>
            <button
              onClick={() => setIsAddPublisherModalOpen(true)}
              className="w-full py-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              + Add New Website
            </button>
          </div>
        </aside>

        {/* 3. MAIN WORKSPACE CONTENT */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {/* Breadcrumb & Top Label */}
          <div className="mb-6">
            <div className="w-9 h-1 bg-emerald-500 rounded-full mb-1.5" />
            <span className="text-xs font-black text-blue-600 uppercase tracking-widest block mb-1">
              BUYER &amp; ADMIN WORKSPACE
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {activeTab === "dashboard"
                ? "Buyer & Admin Dashboard"
                : activeTab.startsWith("publishers_")
                ? "Guest Post Marketplace Directory"
                : "Agency Database & Inquiries"}
            </h1>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Welcome back, Administrator. Real-time marketplace control and CRM pipeline.
            </p>
          </div>

          {/* PARTITIONED STAT OVERVIEW CARDS (Total | New as requested by user in Image 1) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mb-8">
            {/* Card 1: Total Orders / Inquiries */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
                Total Orders
              </span>
              <div className="grid grid-cols-2 divide-x divide-slate-100 pt-1">
                <div className="pr-2">
                  <span className="text-[9px] text-slate-400 uppercase font-semibold block">Total</span>
                  <span className="text-xl sm:text-2xl font-black text-slate-900">
                    {partitionedStats.payments.total}
                  </span>
                </div>
                <div className="pl-3">
                  <span className="text-[9px] text-blue-600 uppercase font-semibold block">New</span>
                  <span className="text-xl sm:text-2xl font-black text-blue-600">
                    +{partitionedStats.payments.new}
                  </span>
                </div>
              </div>
              <span className="text-[10px] text-slate-400 block mt-2 border-t border-slate-100 pt-1">
                Client Checkouts
              </span>
            </div>

            {/* Card 2: Active Leads */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
                Active Leads
              </span>
              <div className="grid grid-cols-2 divide-x divide-slate-100 pt-1">
                <div className="pr-2">
                  <span className="text-[9px] text-slate-400 uppercase font-semibold block">Total</span>
                  <span className="text-xl sm:text-2xl font-black text-amber-500">
                    {partitionedStats.leads.total}
                  </span>
                </div>
                <div className="pl-3">
                  <span className="text-[9px] text-emerald-600 uppercase font-semibold block">New</span>
                  <span className="text-xl sm:text-2xl font-black text-emerald-600">
                    +{partitionedStats.leads.new}
                  </span>
                </div>
              </div>
              <span className="text-[10px] text-slate-400 block mt-2 border-t border-slate-100 pt-1">
                Form Submissions
              </span>
            </div>

            {/* Card 3: WhatsApp Inquiries */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
                WhatsApp Clicks
              </span>
              <div className="grid grid-cols-2 divide-x divide-slate-100 pt-1">
                <div className="pr-2">
                  <span className="text-[9px] text-slate-400 uppercase font-semibold block">Total</span>
                  <span className="text-xl sm:text-2xl font-black text-emerald-600">
                    {partitionedStats.whatsapp.total}
                  </span>
                </div>
                <div className="pl-3">
                  <span className="text-[9px] text-emerald-600 uppercase font-semibold block">New</span>
                  <span className="text-xl sm:text-2xl font-black text-emerald-600">
                    +{partitionedStats.whatsapp.new}
                  </span>
                </div>
              </div>
              <span className="text-[10px] text-slate-400 block mt-2 border-t border-slate-100 pt-1">
                Direct Chat
              </span>
            </div>

            {/* Card 4: Calls & Meets */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
                Calls &amp; Meets
              </span>
              <div className="grid grid-cols-2 divide-x divide-slate-100 pt-1">
                <div className="pr-2">
                  <span className="text-[9px] text-slate-400 uppercase font-semibold block">Total</span>
                  <span className="text-xl sm:text-2xl font-black text-indigo-600">
                    {partitionedStats.calls.total}
                  </span>
                </div>
                <div className="pl-3">
                  <span className="text-[9px] text-indigo-600 uppercase font-semibold block">New</span>
                  <span className="text-xl sm:text-2xl font-black text-indigo-600">
                    +{partitionedStats.calls.new}
                  </span>
                </div>
              </div>
              <span className="text-[10px] text-slate-400 block mt-2 border-t border-slate-100 pt-1">
                Scheduled Meets
              </span>
            </div>

            {/* Card 5: SEO Audits */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
                SEO Audits
              </span>
              <div className="grid grid-cols-2 divide-x divide-slate-100 pt-1">
                <div className="pr-2">
                  <span className="text-[9px] text-slate-400 uppercase font-semibold block">Total</span>
                  <span className="text-xl sm:text-2xl font-black text-purple-600">
                    {partitionedStats.audits.total}
                  </span>
                </div>
                <div className="pl-3">
                  <span className="text-[9px] text-purple-600 uppercase font-semibold block">New</span>
                  <span className="text-xl sm:text-2xl font-black text-purple-600">
                    +{partitionedStats.audits.new}
                  </span>
                </div>
              </div>
              <span className="text-[10px] text-slate-400 block mt-2 border-t border-slate-100 pt-1">
                Domains Tested
              </span>
            </div>

            {/* Card 6: In Trash */}
            <div className="bg-white p-4 rounded-2xl border border-rose-200/80 shadow-xs">
              <span className="text-[10px] text-rose-500 font-bold uppercase tracking-wider block mb-1">
                In Trash
              </span>
              <div className="grid grid-cols-2 divide-x divide-slate-100 pt-1">
                <div className="pr-2">
                  <span className="text-[9px] text-slate-400 uppercase font-semibold block">Total</span>
                  <span className="text-xl sm:text-2xl font-black text-rose-600">
                    {partitionedStats.trash.total}
                  </span>
                </div>
                <div className="pl-3">
                  <span className="text-[9px] text-rose-500 uppercase font-semibold block">New</span>
                  <span className="text-xl sm:text-2xl font-black text-rose-500">
                    +{partitionedStats.trash.new}
                  </span>
                </div>
              </div>
              <span className="text-[10px] text-slate-400 block mt-2 border-t border-slate-100 pt-1">
                Recoverable Records
              </span>
            </div>
          </div>

          {/* 📍 LIVE LOCATION TRACKER PROMINENT OVERVIEW BANNER (High-Visibility on Admin) */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-2xl shadow-inner">
                📍
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm sm:text-base font-black tracking-tight">Real-Time Visitor Live Location Tracker</h4>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-400 text-black animate-pulse">LIVE TRACKING</span>
                </div>
                <p className="text-xs text-blue-200 mt-0.5">
                  Database download karne wale, login karne wale aur contact karne wale sabhi visitors ki Live Country, City, IP aur Google Map location track ho rahi hai.
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveTab("live_locations")}
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-blue-950 font-black text-xs transition-all shadow-md cursor-pointer shrink-0 hover:scale-102 active:scale-98"
            >
              Open Live Location Tracker (Map View) →
            </button>
          </div>

          {/* DYNAMIC CONTENT VIEW */}
          {isPublisherTab ? (
            /* PUBLISHER SITES MANAGEMENT VIEW */
            <PublisherSitesManager
              onNotify={showToast}
              isAddModalOpen={isAddPublisherModalOpen}
              setIsAddModalOpen={setIsAddPublisherModalOpen}
              activePreset={publisherPreset}
              onSelectSiteForOrder={(site: PublisherSite) => {
                showToast(`✓ Order for ${site.domain} opened ($${site.price} USD)`);
              }}
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
            <AnalyticsDashboardView stats={stats} records={records} />
          ) : activeTab === "live_locations" ? (
            /* DEDICATED FULL-SCREEN LIVE LOCATION TRACKER VIEW */
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">
                      📍 Real-Time Live Location Tracker
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500">
                    Real-time Country, City, IP address, and Google Maps location for everyone who downloads the database, creates an account, or contacts you.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-xs flex items-center gap-1.5">
                    <span>📡</span>
                    <span>{records.filter((r) => r.country || r.city || r.clientIp).length} Tracked Actions</span>
                  </span>
                </div>
              </div>

              {/* Table of all live locations */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-600 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                      <th className="py-3 px-4">Time</th>
                      <th className="py-3 px-4">Live Location (Country &amp; City)</th>
                      <th className="py-3 px-4">Action Done</th>
                      <th className="py-3 px-4">User Contact / IP</th>
                      <th className="py-3 px-4 text-right">Google Maps</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {records.filter((r) => r.country || r.city || r.clientIp).length > 0 ? (
                      records
                        .filter((r) => r.country || r.city || r.clientIp)
                        .map((item) => (
                          <tr key={item.id} className="hover:bg-blue-50/40 transition-colors">
                            <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                              {formatDate(item.createdAt)}
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                                <span className="text-lg">{item.countryFlag || "🌐"}</span>
                                <span>
                                  {item.city && item.city !== "Unknown City" ? `${item.city}, ` : ""}
                                  {item.region ? `${item.region}, ` : ""}
                                  {item.country || "India"}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-[10px] text-slate-400 font-mono">
                                  IP: {item.clientIp || "Direct Connection"}
                                </span>
                                {item.isp && (
                                  <span className="text-[10px] text-indigo-600 bg-indigo-50 px-1.5 py-0.2 rounded font-medium">
                                    {item.isp}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="font-bold text-indigo-700 bg-indigo-50 border border-indigo-200/80 px-2 py-0.5 rounded-lg text-xs">
                                {item.title || item.service || item.type || "Interaction"}
                              </span>
                              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                                {item.details || item.message || item.domain || "—"}
                              </p>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="font-bold text-slate-800 text-xs">
                                {item.name || item.clientName || "Visitor"}
                              </div>
                              {item.email && <div className="text-[11px] text-blue-600 font-mono">{item.email}</div>}
                              {item.phone && <div className="text-[11px] text-emerald-600 font-mono">{item.phone}</div>}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              {(() => {
                                const mapUrl =
                                  item.mapsUrl ||
                                  (item.latitude && item.longitude
                                    ? `https://www.google.com/maps?q=${item.latitude},${item.longitude}`
                                    : item.city && item.country
                                    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${item.city}, ${item.country}`)}`
                                    : item.country && item.country !== "Global"
                                    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.country)}`
                                    : item.clientIp
                                    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.clientIp)}`
                                    : null);

                                return mapUrl ? (
                                  <a
                                    href={mapUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all"
                                  >
                                    <span>🗺️ Open Map</span>
                                    <span>↗</span>
                                  </a>
                                ) : (
                                  <span className="text-slate-400 text-[11px]">—</span>
                                );
                              })()}
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-slate-400">
                          <div className="text-3xl mb-2">📍</div>
                          <p className="font-bold text-slate-700">Abhi tak koi live location track nahi hui hai</p>
                          <p className="text-xs text-slate-400 mt-1">Jaise hi koi user download karega ya login karega, uski live country aur map yaha dikhega.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : activeTab === "logs" ? (
            /* AUDIT TRAIL LOGS VIEW */
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span>📜</span>
                <span>Complete System Activity &amp; Audit Trail</span>
              </h3>
              <p className="text-xs text-slate-500 mb-6 font-medium">
                Every client action, status change, soft delete, and restore is permanently logged chronologically with timestamps.
              </p>

              <div className="space-y-3">
                {(stats?.recentActivities || []).map((log) => (
                  <div
                    key={log.id}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                          log.action === "create"
                            ? "bg-emerald-100 text-emerald-800"
                            : log.action === "soft_delete"
                            ? "bg-rose-100 text-rose-800"
                            : log.action === "restore"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {log.action}
                      </span>
                      <span className="font-semibold text-slate-800">{log.summary}</span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      {formatDate(log.timestamp)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* CRM DATA TABLE VIEW (Leads, WhatsApp, Audits, Payments, Trash) */
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
              {/* Filter & Search Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative flex-1 w-full">
                  <input
                    type="text"
                    placeholder="Search by client name, email, phone, notes..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:outline-none"
                  />
                  <span className="absolute left-3 top-3 text-slate-400 text-xs">🔍</span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-semibold focus:outline-none cursor-pointer"
                  >
                    <option value="all">All Statuses</option>
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="closed">Closed</option>
                  </select>

                  <button
                    onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
                    className="px-3 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 cursor-pointer"
                  >
                    {sortOrder === "desc" ? "Newest First ⬇" : "Oldest First ⬆"}
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Client Contact</th>
                      <th className="py-3 px-4">Live Location</th>
                      <th className="py-3 px-4">Service &amp; Details</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {loading ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-slate-400 font-semibold">
                          Loading records from secure database...
                        </td>
                      </tr>
                    ) : records.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-slate-400 font-semibold">
                          No records found in this category.
                        </td>
                      </tr>
                    ) : (
                      records.map((item) => {
                        const clientName =
                          item.name ||
                          item.clientName ||
                          item.domain ||
                          (item.action === "whatsapp" ? "WhatsApp Visitor" : "Agency Inquirer");
                        const clientPhone = item.phone || item.clientIdentifier || "";
                        const cleanPhone = getCleanPhone(clientPhone);
                        const clientEmail = item.email || item.clientEmail || "";

                        return (
                          <tr key={item.id} className="hover:bg-blue-50/40 transition-colors">
                            {/* Date */}
                            <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500 align-top whitespace-nowrap">
                              {formatDate(item.createdAt)}
                            </td>

                            {/* Contact */}
                            <td className="py-3.5 px-4 align-top">
                              <div className="font-bold text-slate-900 text-sm mb-1">
                                {clientName}
                              </div>
                              {clientEmail && (
                                <div className="text-xs text-blue-600 mb-0.5">
                                  <a href={`mailto:${clientEmail}`} className="hover:underline">
                                    ✉️ {clientEmail}
                                  </a>
                                </div>
                              )}
                              {clientPhone && (
                                <div className="text-xs text-emerald-600">
                                  <a
                                    href={`https://wa.me/${cleanPhone}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline"
                                  >
                                    💬 {clientPhone}
                                  </a>
                                </div>
                              )}
                            </td>

                            {/* Live Location */}
                            <td className="py-3.5 px-4 align-top">
                              <div className="flex items-center gap-1.5 font-bold text-slate-800 text-xs">
                                <span>{item.countryFlag || "🌐"}</span>
                                <span>
                                  {item.city && item.city !== "Unknown City" ? `${item.city}, ` : ""}
                                  {item.region ? `${item.region}, ` : ""}
                                  {item.country || "India"}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 mt-0.5">
                                {item.clientIp && (
                                  <span className="text-[10px] text-slate-400 font-mono">
                                    IP: {item.clientIp}
                                  </span>
                                )}
                                {item.isp && (
                                  <span className="text-[10px] text-indigo-600 bg-indigo-50 px-1 rounded font-medium">
                                    {item.isp}
                                  </span>
                                )}
                              </div>
                              {(() => {
                                const mapUrl =
                                  item.mapsUrl ||
                                  (item.latitude && item.longitude
                                    ? `https://www.google.com/maps?q=${item.latitude},${item.longitude}`
                                    : item.city && item.country
                                    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${item.city}, ${item.country}`)}`
                                    : item.country && item.country !== "Global"
                                    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.country)}`
                                    : item.clientIp
                                    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.clientIp)}`
                                    : null);

                                return mapUrl ? (
                                  <a
                                    href={mapUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-600 hover:text-blue-800 hover:underline mt-1"
                                    title="View exact live location on Google Maps"
                                  >
                                    <span>📍 View Map ↗</span>
                                  </a>
                                ) : null;
                              })()}
                            </td>

                            {/* Service & Details */}
                            <td className="py-3.5 px-4 align-top">
                              <span className="font-semibold text-slate-800 block mb-0.5">
                                {item.service || item.type || "General Inquiry"}
                              </span>
                              <p className="text-[11px] text-slate-500 max-w-md line-clamp-2">
                                {item.message || item.details || item.domain || "—"}
                              </p>
                              {item.notes && (
                                <div className="mt-1 text-[11px] text-amber-700 bg-amber-50 p-1 rounded border border-amber-200">
                                  📝 {item.notes}
                                </div>
                              )}
                            </td>

                            {/* Status */}
                            <td className="py-3.5 px-4 align-top">
                              {item.isDeleted ? (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
                                  Deleted
                                </span>
                              ) : (
                                <select
                                  value={item.status || "new"}
                                  onChange={(e) => handleUpdateStatus(item, e.target.value)}
                                  className="px-2 py-1 rounded-lg text-xs font-bold border border-slate-200 bg-slate-50 cursor-pointer"
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
                            <td className="py-3.5 px-4 text-right align-top whitespace-nowrap">
                              <div className="flex items-center justify-end gap-1.5">
                                {item.isDeleted ? (
                                  <>
                                    <button
                                      onClick={() => handleRestore(item)}
                                      className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer"
                                    >
                                      Restore
                                    </button>
                                    <button
                                      onClick={() => handlePermanentDelete(item)}
                                      className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs cursor-pointer"
                                    >
                                      Purge
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      onClick={() => {
                                        setSelectedRecord(item);
                                        setEditingNotes(item.notes || "");
                                      }}
                                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                                    >
                                      Notes
                                    </button>
                                    <button
                                      onClick={() => handleSoftDelete(item)}
                                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                                      title="Move to Trash"
                                    >
                                      🗑️
                                    </button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* NOTES MODAL */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 text-left shadow-2xl">
            <h4 className="text-base font-bold text-slate-900 mb-1">
              Internal Notes for {selectedRecord.name || selectedRecord.domain || selectedRecord.id}
            </h4>
            <p className="text-xs text-slate-500 mb-3">
              Add follow-up notes, call summaries, or private customer records.
            </p>

            {/* Live Visitor Location Info Badge */}
            {(selectedRecord.country || selectedRecord.city || selectedRecord.clientIp) && (
              <div className="p-3 mb-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-700 flex items-center gap-1.5">
                    <span>{selectedRecord.countryFlag || "📍"}</span>
                    <span>{selectedRecord.city && selectedRecord.city !== "Unknown City" ? `${selectedRecord.city}, ` : ""}{selectedRecord.country || "Global"}</span>
                  </span>
                  {selectedRecord.mapsUrl && (
                    <a
                      href={selectedRecord.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 font-bold underline text-[11px]"
                    >
                      Open Google Maps ↗
                    </a>
                  )}
                </div>
                {selectedRecord.clientIp && (
                  <div className="text-[10px] text-slate-500 font-mono">
                    Client IP: <strong className="text-slate-800">{selectedRecord.clientIp}</strong>
                    {selectedRecord.timezone ? ` • Timezone: ${selectedRecord.timezone}` : ""}
                  </div>
                )}
              </div>
            )}
            <textarea
              rows={4}
              value={editingNotes}
              onChange={(e) => setEditingNotes(e.target.value)}
              placeholder="e.g. Spoke on WhatsApp, interested in $2,000 package..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-blue-500 outline-none resize-none mb-4"
            />
            <div className="flex items-center justify-end gap-2 text-xs">
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNotes}
                className="px-5 py-2 bg-[#4a3aff] hover:bg-[#3d2ee0] text-white font-bold rounded-xl cursor-pointer"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MANUAL ENTRY MODAL */}
      {isNewEntryOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 text-left shadow-2xl my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-5">
              <h4 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <span>➕</span>
                <span>Add Client Record Manually</span>
              </h4>
              <button
                onClick={() => setIsNewEntryOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-xs p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleManualSubmit} className="flex flex-col gap-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Client Full Name *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. David Vance"
                  value={manualForm.name}
                  onChange={(e) => setManualForm({ ...manualForm, name: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 outline-none focus:bg-white focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Client Email *</label>
                  <input
                    required
                    type="email"
                    placeholder="david@company.com"
                    value={manualForm.email}
                    onChange={(e) => setManualForm({ ...manualForm, email: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 outline-none focus:bg-white focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Phone / WhatsApp *</label>
                  <input
                    required
                    type="tel"
                    placeholder="+1 555-0192"
                    value={manualForm.phone}
                    onChange={(e) => setManualForm({ ...manualForm, phone: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 outline-none focus:bg-white focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Target Service</label>
                <select
                  value={manualForm.service}
                  onChange={(e) => setManualForm({ ...manualForm, service: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 outline-none focus:border-blue-500"
                >
                  <option value="Full-Funnel Organic Growth">Full-Funnel Organic Growth</option>
                  <option value="High-Intent SEO Optimization">High-Intent SEO Optimization</option>
                  <option value="Website Development (Next.js)">Website Development (Next.js)</option>
                  <option value="Off-Page Backlink Building">Off-Page Backlink Building</option>
                  <option value="Content Strategy & Writing">Content Strategy &amp; Writing</option>
                  <option value="Guest Post Placement">Guest Post Placement</option>
                  <option value="Custom Project Work">Custom Project Work</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Scope / Requirements</label>
                <textarea
                  rows={3}
                  placeholder="Requirements, discussion details, or deliverables..."
                  value={manualForm.message}
                  onChange={(e) => setManualForm({ ...manualForm, message: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 outline-none focus:bg-white focus:border-blue-500 resize-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Admin Internal Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Client called from UK, quoted $3,000"
                  value={manualForm.notes}
                  onChange={(e) => setManualForm({ ...manualForm, notes: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 outline-none focus:bg-white focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewEntryOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#4a3aff] hover:bg-[#3d2ee0] text-white font-extrabold rounded-xl transition-all cursor-pointer shadow-md shadow-indigo-500/20"
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
