"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import ClientProfileView from "./ClientProfileView";
import AnalyticsDashboardView from "./AnalyticsDashboardView";

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

  // Active View State (Nova Growth Agency CRM)
  const [activeTab, setActiveTab] = useState<
    | "dashboard"
    | "live_locations"
    | "payments"
    | "leads"
    | "interactions"
    | "audits"
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  // Fetch Current Records (Agency Leads, Orders, Inquiries, Audit Trail)
  const loadRecords = useCallback(async () => {
    if (!isAuthenticated) return;
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

      if (activeTab === "dashboard" || activeTab === "client_profile" || activeTab === "live_locations") {
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
      <div className="bg-[#0b1220] text-slate-300 text-[11px] font-mono py-1.5 px-3 sm:px-6 border-b border-slate-800 flex items-center justify-between overflow-x-auto [scrollbar-width:none]">
        <div className="flex items-center gap-4 sm:gap-5 shrink-0">
          <span className="flex items-center gap-1.5 text-blue-400 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span>SQ</span>
          </span>
          <span>Rank <strong className="text-white">67.7K</strong></span>
          <span>Traffic <strong className="text-white">280K+</strong></span>
          <span>L <strong className="text-white">0</strong></span>
          <span>LD <strong className="text-white">73.7K</strong></span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-slate-400 shrink-0">
          <span>Live Sync: Active</span>
          <span className="text-emerald-400 font-bold">● Nova Growth Workspace Mode</span>
        </div>
      </div>

      {/* MAIN HEADER NAVBAR */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-3 sm:px-6 py-2.5 sm:py-3">
        <div className="flex items-center justify-between gap-3">
          {/* Mobile Menu Hamburger Button + Logo */}
          <div className="flex items-center gap-2.5 sm:gap-6">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer flex items-center justify-center w-9 h-9 shrink-0 text-base"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>

            <Link href="/" className="flex items-center gap-2 sm:gap-2.5">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-black text-sm sm:text-base shadow-sm shrink-0">
                NG
              </div>
              <div className="leading-tight">
                <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight block">
                  Nova Growth
                </span>
                <span className="text-[9px] sm:text-[10px] text-blue-600 font-bold uppercase tracking-wider block">
                  Admin &amp; Buyer Hub
                </span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-4 text-xs font-bold text-slate-600">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`hover:text-blue-600 cursor-pointer ${activeTab === "dashboard" ? "text-blue-600 font-black" : ""}`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab("live_locations")}
                className={`hover:text-blue-600 cursor-pointer ${activeTab === "live_locations" ? "text-blue-600 font-black" : ""}`}
              >
                Live Locations
              </button>
              <button
                onClick={() => setActiveTab("payments")}
                className={`hover:text-blue-600 cursor-pointer ${activeTab === "payments" ? "text-blue-600 font-black" : ""}`}
              >
                Orders
              </button>
              <button
                onClick={() => setActiveTab("leads")}
                className={`hover:text-blue-600 cursor-pointer ${activeTab === "leads" ? "text-blue-600 font-black" : ""}`}
              >
                Leads
              </button>
              <Link href="/guest-posting" className="text-slate-400 hover:text-blue-600" target="_blank">
                Live Site ↗
              </Link>
            </nav>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-2.5 text-xs">
            <button
              onClick={() => setIsNewEntryOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl transition-all flex items-center gap-1 sm:gap-1.5 cursor-pointer shadow-sm text-xs whitespace-nowrap"
            >
              <span>+</span>
              <span className="hidden sm:inline">New Lead</span>
              <span className="sm:hidden">Lead</span>
            </button>

            <button
              onClick={handleLogout}
              className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1 text-xs whitespace-nowrap"
              title="Logout from admin session"
            >
              <span>🚪</span>
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* QUICK HORIZONTAL MOBILE TAB BAR (Only visible on mobile/tablet <lg) */}
      <div className="lg:hidden bg-white border-b border-slate-200 px-3 py-2 flex items-center gap-1.5 overflow-x-auto [scrollbar-width:none] shrink-0 text-xs">
        {[
          { id: "dashboard", label: "⏱️ Dashboard", count: undefined },
          { id: "live_locations", label: "📍 Live Map", count: undefined, highlight: true },
          { id: "payments", label: "🛒 Orders", count: partitionedStats.payments.total },
          { id: "leads", label: "👥 Leads", count: partitionedStats.leads.total },
          { id: "interactions", label: "💬 WhatsApp", count: partitionedStats.whatsapp.total },
          { id: "audits", label: "🔍 Audits", count: partitionedStats.audits.total },
          { id: "client_profile", label: "👤 Client 360°", count: undefined },
          { id: "analytics", label: "📊 Analytics", count: undefined },
          { id: "trash", label: "🗑️ Trash", count: partitionedStats.trash.total },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap cursor-pointer transition-all flex items-center gap-1.5 shrink-0 ${
                isActive
                  ? tab.highlight
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs"
                    : "bg-blue-600 text-white shadow-xs"
                  : tab.highlight
                  ? "bg-blue-50 text-blue-800 border border-blue-200"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`text-[10px] font-mono px-1 rounded ${
                    isActive ? "bg-white/20 text-white" : "bg-slate-200 text-slate-800"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* MOBILE SLIDE-OUT DRAWER OVERLAY */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-0 bottom-0 left-0 w-72 max-w-[85vw] bg-white border-r border-slate-200 shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-sm">
                  NG
                </div>
                <div>
                  <span className="font-black text-sm text-slate-900 block leading-tight">Admin Menu</span>
                  <span className="text-[10px] text-blue-600 font-bold uppercase">Nova Growth</span>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-200 text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Drawer Body Nav Items */}
            <div className="p-3 overflow-y-auto flex-1 space-y-4 text-xs font-semibold">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-2 mb-1.5">
                  Core Operations
                </span>
                <div className="space-y-1">
                  <button
                    onClick={() => { setActiveTab("dashboard"); setMobileMenuOpen(false); }}
                    className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center justify-between ${
                      activeTab === "dashboard" ? "bg-blue-50 text-blue-600 font-black" : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span>⏱️ Executive Dashboard</span>
                    <span className="text-slate-400">›</span>
                  </button>
                  <button
                    onClick={() => { setActiveTab("live_locations"); setMobileMenuOpen(false); }}
                    className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center justify-between ${
                      activeTab === "live_locations"
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black"
                        : "bg-blue-50/70 text-blue-900 border border-blue-200"
                    }`}
                  >
                    <span>📍 Live Location Tracker</span>
                    <span className="text-[9px] bg-emerald-400 text-black px-1.5 py-0.5 rounded font-black">LIVE</span>
                  </button>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-2 mb-1.5">
                  Client & Lead Management
                </span>
                <div className="space-y-1">
                  <button
                    onClick={() => { setActiveTab("payments"); setMobileMenuOpen(false); }}
                    className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center justify-between ${
                      activeTab === "payments" ? "bg-blue-50 text-blue-600 font-black" : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span>🛒 Orders & Placements</span>
                    <span className="text-blue-600 font-mono text-[11px] font-bold">{partitionedStats.payments.total}</span>
                  </button>
                  <button
                    onClick={() => { setActiveTab("leads"); setMobileMenuOpen(false); }}
                    className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center justify-between ${
                      activeTab === "leads" ? "bg-blue-50 text-blue-600 font-black" : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span>👥 CRM Leads & Users</span>
                    <span className="text-amber-600 font-mono text-[11px] font-bold">{partitionedStats.leads.total}</span>
                  </button>
                  <button
                    onClick={() => { setActiveTab("interactions"); setMobileMenuOpen(false); }}
                    className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center justify-between ${
                      activeTab === "interactions" ? "bg-blue-50 text-blue-600 font-black" : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span>💬 WhatsApp Clicks & Chats</span>
                    <span className="text-emerald-600 font-mono text-[11px] font-bold">{partitionedStats.whatsapp.total}</span>
                  </button>
                  <button
                    onClick={() => { setActiveTab("audits"); setMobileMenuOpen(false); }}
                    className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center justify-between ${
                      activeTab === "audits" ? "bg-blue-50 text-blue-600 font-black" : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span>🔍 SEO Audits</span>
                    <span className="text-purple-600 font-mono text-[11px] font-bold">{partitionedStats.audits.total}</span>
                  </button>
                  <button
                    onClick={() => { setActiveTab("client_profile"); setMobileMenuOpen(false); }}
                    className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center justify-between ${
                      activeTab === "client_profile" ? "bg-blue-50 text-blue-600 font-black" : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span>👤 Client 360° Dossier</span>
                    <span className="text-slate-400">›</span>
                  </button>
                  <button
                    onClick={() => { setActiveTab("analytics"); setMobileMenuOpen(false); }}
                    className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center justify-between ${
                      activeTab === "analytics" ? "bg-blue-50 text-blue-600 font-black" : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span>📊 Data Analytics</span>
                    <span className="text-slate-400">›</span>
                  </button>
                  <button
                    onClick={() => { setActiveTab("trash"); setMobileMenuOpen(false); }}
                    className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center justify-between ${
                      activeTab === "trash" ? "bg-rose-50 text-rose-700 font-black" : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span>🗑️ Trash Bin</span>
                    <span className="text-rose-600 font-mono text-[11px] font-bold">{partitionedStats.trash.total}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-3 border-t border-slate-200 bg-slate-50 space-y-2">
              <Link
                href="/guest-posting"
                target="_blank"
                className="w-full py-2 px-3 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-800 font-bold flex items-center justify-center gap-1.5 text-xs text-center"
              >
                <span>Live Marketplace Site ↗</span>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full py-2 px-3 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl font-bold flex items-center justify-center gap-1.5 text-xs cursor-pointer"
              >
                <span>🚪 Logout Admin</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DUAL SIDEBAR + MAIN WORKSPACE BODY */}
      <div className="flex flex-1 overflow-hidden">
        {/* 1. LEFT SLIM ICON RAIL */}
        <aside className="hidden xl:flex w-14 bg-white border-r border-slate-200 flex-col items-center py-4 gap-4 select-none shrink-0 text-slate-500">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`p-2 rounded-xl transition-colors cursor-pointer text-base ${activeTab === "dashboard" ? "bg-blue-50 text-blue-600 font-bold" : "hover:bg-slate-50 text-slate-500"}`}
            title="Dashboard Overview"
          >
            ⏱️
          </button>

          <button
            onClick={() => setActiveTab("live_locations")}
            className={`p-2 rounded-xl transition-colors cursor-pointer text-base ${activeTab === "live_locations" ? "bg-blue-50 text-blue-600 font-bold" : "hover:bg-slate-50 text-slate-500"}`}
            title="Live Location Tracker"
          >
            📍
          </button>

          <button
            onClick={() => setActiveTab("payments")}
            className={`p-2 rounded-xl transition-colors cursor-pointer text-base ${activeTab === "payments" ? "bg-blue-50 text-blue-600 font-bold" : "hover:bg-slate-50 text-slate-500"}`}
            title="Orders & Payments"
          >
            🛒
          </button>

          <button
            onClick={() => setActiveTab("leads")}
            className={`p-2 rounded-xl transition-colors cursor-pointer text-base ${activeTab === "leads" ? "bg-blue-50 text-blue-600 font-bold" : "hover:bg-slate-50 text-slate-500"}`}
            title="CRM Leads & Registered Users"
          >
            👥
          </button>

          <button
            onClick={() => setActiveTab("interactions")}
            className={`p-2 rounded-xl transition-colors cursor-pointer text-base ${activeTab === "interactions" ? "bg-blue-50 text-blue-600 font-bold" : "hover:bg-slate-50 text-slate-500"}`}
            title="WhatsApp & Inquiries"
          >
            💬
          </button>

          <button
            onClick={() => setActiveTab("audits")}
            className={`p-2 rounded-xl transition-colors cursor-pointer text-base ${activeTab === "audits" ? "bg-blue-50 text-blue-600 font-bold" : "hover:bg-slate-50 text-slate-500"}`}
            title="SEO Audit Requests"
          >
            🔍
          </button>

          <button
            onClick={() => setActiveTab("analytics")}
            className={`p-2 rounded-xl transition-colors cursor-pointer text-base ${activeTab === "analytics" ? "bg-blue-50 text-blue-600 font-bold" : "hover:bg-slate-50 text-slate-500"}`}
            title="Data Analytics"
          >
            📊
          </button>

          <button
            onClick={() => setActiveTab("trash")}
            className={`p-2 rounded-xl transition-colors cursor-pointer text-base mt-auto ${activeTab === "trash" ? "bg-rose-50 text-rose-600" : "hover:bg-rose-50 text-slate-400"}`}
            title="Trash Bin"
          >
            🗑️
          </button>
        </aside>

        {/* 2. EXPANDED SIDEBAR MENU */}
        <aside className="hidden lg:flex w-64 bg-white border-r border-slate-200 flex-col justify-between shrink-0 overflow-y-auto">
          <div className="p-3.5 space-y-5">
            {/* CORE OPERATIONS */}
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-2">
                Core Operations
              </div>
              <div className="space-y-1 text-xs">
                {/* Dashboard Overview */}
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
                    <span>Executive Dashboard</span>
                  </span>
                  <span className="text-xs">›</span>
                </button>

                {/* 📍 Live Location Tracker */}
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
              </div>
            </div>

            {/* ORDERS & REVENUE */}
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-2">
                Orders &amp; Placements
              </div>
              <div className="space-y-1 text-xs">
                {/* 🛒 Guest Post Orders */}
                <button
                  onClick={() => setActiveTab("payments")}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold transition-all cursor-pointer ${
                    activeTab === "payments"
                      ? "bg-[#ebf3ff] text-[#2563eb] font-bold shadow-xs"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>🛒</span>
                    <span>Guest Post Orders</span>
                  </span>
                  <span className="text-[11px] font-bold text-blue-600 font-mono">
                    {partitionedStats.payments.total}
                  </span>
                </button>
              </div>
            </div>

            {/* AGENCY CRM & CLIENT PIPELINE */}
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-2">
                Agency CRM &amp; Leads
              </div>
              <div className="space-y-1 text-xs">
                <button
                  onClick={() => setActiveTab("leads")}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                    activeTab === "leads"
                      ? "bg-[#ebf3ff] text-[#2563eb] font-bold"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>👥</span>
                    <span>Leads &amp; Users</span>
                  </span>
                  <span className="text-[11px] font-bold text-slate-500 font-mono">
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
                    <span>WhatsApp Chats</span>
                  </span>
                  <span className="text-[11px] font-bold text-emerald-600 font-mono">
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
                  <span className="text-[11px] font-bold text-purple-600 font-mono">
                    {partitionedStats.audits.total}
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
                  <span className="text-[11px] font-bold text-rose-600 font-mono">
                    {partitionedStats.trash.total}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* 3. MAIN WORKSPACE CONTENT */}
        <main className="flex-1 p-3 sm:p-5 lg:p-8 overflow-y-auto min-w-0 w-full">
          {/* Breadcrumb & Top Label */}
          <div className="mb-4 sm:mb-6">
            <div className="w-9 h-1 bg-emerald-500 rounded-full mb-1.5" />
            <span className="text-xs font-black text-blue-600 uppercase tracking-widest block mb-1">
              AGENCY OWNER WORKSPACE
            </span>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
              {activeTab === "dashboard"
                ? "Executive Operations & Leads Dashboard"
                : activeTab === "payments"
                ? "Guest Post Orders & Placements"
                : activeTab === "live_locations"
                ? "Real-Time Live Location Tracker"
                : activeTab === "leads"
                ? "Registered Buyers & Agency Leads"
                : "Agency Database & Inquiries"}
            </h1>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Private portal for website owner. Track orders, registered users, and live visitor locations.
            </p>
          </div>

          {/* PARTITIONED STAT OVERVIEW CARDS (Total | New as requested by user in Image 1) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3.5 mb-6 sm:mb-8">
            {/* Card 1: Total Orders / Inquiries */}
            <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-xs">
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
            <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-xs">
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
            <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-xs">
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
            <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-xs">
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
            <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-xs">
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
            <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-rose-200/80 shadow-xs">
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
          {activeTab === "client_profile" ? (
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

              {/* Table of all live locations (Desktop & Tablet) */}
              <div className="hidden md:block overflow-x-auto">
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
                              <span
                                className={`font-bold px-2 py-0.5 rounded-lg text-xs ${
                                  item.type === "buyer_login"
                                    ? "text-amber-900 bg-amber-100 border border-amber-300"
                                    : "text-indigo-700 bg-indigo-50 border border-indigo-200/80"
                                }`}
                              >
                                {item.type === "buyer_login"
                                  ? "🔑 Database User Login"
                                  : item.title || item.service || item.type || "Interaction"}
                              </span>
                              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                                {item.details || item.message || item.domain || "—"}
                              </p>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="font-bold text-slate-800 text-xs">
                                {item.name || item.clientName || "Visitor"}
                              </div>
                              {item.email && (
                                <div className="text-[11px] text-blue-600 font-mono font-semibold">
                                  <span className="text-[9px] text-slate-400 font-sans font-bold">ID: </span>
                                  {item.email}
                                </div>
                              )}
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

              {/* Mobile Card Feed for Live Locations (<md) */}
              <div className="md:hidden space-y-3">
                {records.filter((r) => r.country || r.city || r.clientIp).length > 0 ? (
                  records
                    .filter((r) => r.country || r.city || r.clientIp)
                    .map((item) => {
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

                      return (
                        <div key={item.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2.5 shadow-2xs">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">{item.countryFlag || "🌐"}</span>
                              <div>
                                <h4 className="font-bold text-slate-900 text-sm">
                                  {item.city && item.city !== "Unknown City" ? `${item.city}, ` : ""}
                                  {item.region ? `${item.region}, ` : ""}
                                  {item.country || "India"}
                                </h4>
                                <span className="text-[10px] font-mono text-slate-400">{formatDate(item.createdAt)}</span>
                              </div>
                            </div>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${item.type === "buyer_login" ? "bg-amber-100 text-amber-900" : "bg-blue-100 text-blue-900"}`}>
                              {item.type === "buyer_login" ? "🔑 Login" : item.service || item.type || "Action"}
                            </span>
                          </div>

                          <div className="bg-white rounded-xl p-3 border border-slate-200/80 space-y-1 text-xs">
                            <div className="font-bold text-slate-900">{item.name || item.clientName || "Visitor"}</div>
                            {item.email && <div className="text-[11px] text-blue-600 font-mono">✉️ {item.email}</div>}
                            {item.phone && <div className="text-[11px] text-emerald-600 font-mono">📞 {item.phone}</div>}
                            <div className="text-[10px] text-slate-400 font-mono pt-1 border-t border-slate-100">
                              IP: {item.clientIp || "Direct"} {item.isp ? `• ${item.isp}` : ""}
                            </div>
                          </div>

                          {mapUrl && (
                            <a
                              href={mapUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                            >
                              <span>🗺️ Open in Google Maps</span>
                              <span>↗</span>
                            </a>
                          )}
                        </div>
                      );
                    })
                ) : (
                  <div className="py-8 text-center text-slate-400">
                    <div className="text-3xl mb-1">📍</div>
                    <p className="font-bold text-slate-700 text-xs">Abhi tak koi live location track nahi hui hai</p>
                  </div>
                )}
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

                <div className="flex items-center flex-wrap gap-2 w-full sm:w-auto">
                  {/* Quick Filter: 40k Database Downloads & Users */}
                  <button
                    onClick={() => {
                      if (search.toLowerCase().includes("database") || search.toLowerCase().includes("download")) {
                        setSearch("");
                      } else {
                        setSearch("database");
                      }
                    }}
                    className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 cursor-pointer whitespace-nowrap shadow-xs ${
                      search.toLowerCase().includes("database") || search.toLowerCase().includes("download")
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-sm font-extrabold"
                        : "bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100"
                    }`}
                    title="Filter only users who logged in or downloaded the 40,000 sites database"
                  >
                    <span>📥</span>
                    <span>
                      {search.toLowerCase().includes("database") || search.toLowerCase().includes("download")
                        ? "Showing 40k Downloads ✕"
                        : "40k Data Downloads & Logins"}
                    </span>
                  </button>

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

              {/* Table (Desktop & Tablet) */}
              <div className="hidden md:block overflow-x-auto">
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
                              <div className="flex items-center flex-wrap gap-1.5 mb-1">
                                <span className="font-bold text-slate-900 text-sm">
                                  {clientName}
                                </span>
                                {(item.type === "database_download" || item.service?.toLowerCase().includes("download")) ? (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-100 text-emerald-950 border border-emerald-300 inline-flex items-center gap-1 shadow-2xs">
                                    <span>📥</span>
                                    <span>Downloaded 40k Database</span>
                                  </span>
                                ) : (item.type === "buyer_login" || item.type === "buyer_account_registration" || item.service?.toLowerCase().includes("database")) ? (
                                  <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300 inline-flex items-center gap-1 shadow-2xs">
                                    <span>🔑</span>
                                    <span>{item.type === "buyer_login" ? "User Login" : "Data Buyer"}</span>
                                  </span>
                                ) : null}
                              </div>
                              {clientEmail && (
                                <div className="text-xs text-blue-600 mb-0.5 flex items-center gap-1 font-mono">
                                  <span className="text-[10px] uppercase font-bold text-slate-400 font-sans">Login ID:</span>
                                  <a href={`mailto:${clientEmail}`} className="hover:underline font-bold">
                                    ✉️ {clientEmail}
                                  </a>
                                </div>
                              )}
                              {clientPhone && (
                                <div className="text-xs text-emerald-600 flex items-center gap-1">
                                  <span className="text-[10px] uppercase font-bold text-slate-400 font-sans">Phone:</span>
                                  <a
                                    href={`https://wa.me/${cleanPhone}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline font-mono"
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
                              <div className="flex items-center gap-1.5 mb-1">
                                {(item.type === "database_download" || item.service?.toLowerCase().includes("download")) ? (
                                  <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-emerald-100 text-emerald-950 border border-emerald-300 flex items-center gap-1">
                                    <span>📥</span>
                                    <span>40,000 Sites Database Download (.xlsx)</span>
                                  </span>
                                ) : (item.type === "buyer_login" || item.service?.toLowerCase().includes("database access")) ? (
                                  <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-amber-100 text-amber-900 border border-amber-300">
                                    📊 Database Access Login
                                  </span>
                                ) : (
                                  <span className="font-semibold text-slate-800">
                                    {item.service || item.type || "General Inquiry"}
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-600 max-w-md line-clamp-2">
                                {item.message || item.details || item.domain || "—"}
                              </p>
                              {item.notes && (
                                <div className="mt-1 text-[11px] text-amber-800 bg-amber-50 p-1.5 rounded-lg border border-amber-200">
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
              {/* Mobile Card Feed for CRM Leads & Orders (<md) */}
              <div className="md:hidden space-y-3">
                {loading ? (
                  <div className="p-8 text-center text-slate-400 font-semibold text-xs">
                    Loading records from secure database...
                  </div>
                ) : records.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 font-semibold text-xs">
                    No records found in this category.
                  </div>
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

                    return (
                      <div
                        key={item.id}
                        className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3 shadow-2xs"
                      >
                        {/* Card Header: Client Name, Date & Badges */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h4 className="font-bold text-slate-900 text-sm truncate">
                              {clientName}
                            </h4>
                            <span className="text-[10px] font-mono text-slate-400">
                              {formatDate(item.createdAt)}
                            </span>
                          </div>

                          <div className="flex flex-col items-end gap-1 shrink-0">
                            {(item.type === "database_download" || item.service?.toLowerCase().includes("download")) ? (
                              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-100 text-emerald-950 border border-emerald-300 inline-flex items-center gap-1 shadow-2xs">
                                <span>📥</span>
                                <span>40k Database</span>
                              </span>
                            ) : (item.type === "buyer_login" || item.type === "buyer_account_registration" || item.service?.toLowerCase().includes("database")) ? (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300 inline-flex items-center gap-1 shadow-2xs">
                                <span>🔑</span>
                                <span>{item.type === "buyer_login" ? "User Login" : "Data Buyer"}</span>
                              </span>
                            ) : null}
                          </div>
                        </div>

                        {/* Contact Details (Email + Phone) */}
                        <div className="bg-white rounded-xl p-3 border border-slate-200/80 space-y-2 text-xs">
                          {clientEmail && (
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[10px] font-bold text-slate-400 uppercase font-sans">Login ID:</span>
                              <a
                                href={`mailto:${clientEmail}`}
                                className="text-blue-600 font-mono font-bold truncate max-w-[200px] hover:underline"
                              >
                                ✉️ {clientEmail}
                              </a>
                            </div>
                          )}

                          {clientPhone && (
                            <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100">
                              <span className="text-[10px] font-bold text-slate-400 uppercase font-sans">Phone:</span>
                              <div className="flex items-center gap-2">
                                <a
                                  href={`tel:${cleanPhone}`}
                                  className="text-slate-700 font-mono text-[11px] hover:underline"
                                >
                                  📞 {clientPhone}
                                </a>
                                <a
                                  href={`https://wa.me/${cleanPhone}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-2 py-0.5 rounded-md bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[10px] flex items-center gap-1 shadow-2xs"
                                >
                                  <span>💬</span>
                                  <span>WhatsApp</span>
                                </a>
                              </div>
                            </div>
                          )}

                          {/* Live Location inside card */}
                          <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100">
                            <span className="text-[10px] font-bold text-slate-400 uppercase font-sans">Location:</span>
                            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-800">
                              <span>{item.countryFlag || "🌐"}</span>
                              <span className="truncate max-w-[160px]">
                                {item.city && item.city !== "Unknown City" ? `${item.city}, ` : ""}
                                {item.region ? `${item.region}, ` : ""}
                                {item.country || "India"}
                              </span>
                            </div>
                          </div>

                          {mapUrl && (
                            <a
                              href={mapUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full mt-1 py-1.5 px-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-[11px] flex items-center justify-center gap-1.5 border border-blue-200 transition-colors"
                            >
                              <span>📍 Open Exact Location in Google Maps</span>
                              <span>↗</span>
                            </a>
                          )}
                        </div>

                        {/* Service & Message Details */}
                        {(item.service || item.message || item.details) && (
                          <div className="text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-200/80">
                            {item.service && (
                              <div className="font-bold text-slate-800 mb-1">
                                {item.service}
                              </div>
                            )}
                            <p className="text-[11px] text-slate-500 line-clamp-2">
                              {item.message || item.details || "—"}
                            </p>
                          </div>
                        )}

                        {/* Status Select & Action Bar */}
                        <div className="flex items-center justify-between gap-2 pt-1">
                          <select
                            value={item.status || "new"}
                            onChange={(e) => handleUpdateStatus(item, e.target.value)}
                            disabled={Boolean(item.isDeleted)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold border cursor-pointer ${
                              item.status === "new"
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : item.status === "contacted"
                                ? "bg-amber-50 text-amber-700 border-amber-200"
                                : item.status === "in_progress"
                                ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                                : item.status === "completed"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : "bg-slate-100 text-slate-700 border-slate-200"
                            }`}
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="closed">Closed</option>
                          </select>

                          <div className="flex items-center gap-1.5">
                            {item.isDeleted ? (
                              <>
                                <button
                                  onClick={() => handleRestore(item)}
                                  className="px-2.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs cursor-pointer"
                                >
                                  ♻️ Restore
                                </button>
                                <button
                                  onClick={() => handlePermanentDelete(item)}
                                  className="px-2.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs cursor-pointer"
                                >
                                  Permanent
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => {
                                    setSelectedRecord(item);
                                    setEditingNotes(item.notes || "");
                                  }}
                                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                                >
                                  📝 Notes
                                </button>
                                <button
                                  onClick={() => handleSoftDelete(item)}
                                  className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 transition-colors cursor-pointer"
                                  title="Move to Trash"
                                >
                                  🗑️
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
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
