"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Menu,
  Bell,
  MessageSquare,
  Sun,
  Moon,
  ChevronDown,
  RefreshCw,
  Download,
  Check,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  X,
} from "lucide-react";
import { NotificationItem } from "../types";

interface AdminHeaderProps {
  onToggleMobileMenu: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onSyncDatabase: () => void;
  isSyncing: boolean;
  onExportExcel: () => void;
  notifications: NotificationItem[];
  onMarkNotificationRead: (id: string) => void;
  currencyRegion: "USD" | "INR" | "GBP" | "AED";
  setCurrencyRegion: (region: "USD" | "INR" | "GBP" | "AED") => void;
  onNavigateToWhatsApp?: () => void;
  activeViewTitle?: string;
}

export default function AdminHeader({
  onToggleMobileMenu,
  searchQuery,
  setSearchQuery,
  isDark,
  onToggleTheme,
  onSyncDatabase,
  isSyncing,
  onExportExcel,
  notifications,
  onMarkNotificationRead,
  currencyRegion,
  setCurrencyRegion,
  onNavigateToWhatsApp,
  activeViewTitle = "Overview",
}: AdminHeaderProps) {
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showRegionMenu, setShowRegionMenu] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const regionRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  // Close popovers on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifMenu(false);
      }
      if (regionRef.current && !regionRef.current.contains(event.target as Node)) {
        setShowRegionMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const regions: { key: "USD" | "INR" | "GBP" | "AED"; label: string; flag: string; symbol: string }[] = [
    { key: "USD", label: "US Dollar ($)", flag: "🇺🇸", symbol: "$" },
    { key: "INR", label: "Indian Rupee (₹)", flag: "🇮🇳", symbol: "₹" },
    { key: "GBP", label: "British Pound (£)", flag: "🇬🇧", symbol: "£" },
    { key: "AED", label: "UAE Dirham (AED)", flag: "🇦🇪", symbol: "AED" },
  ];

  const currentRegionObj = regions.find((r) => r.key === currencyRegion) || regions[0];

  return (
    <header className="sticky top-0 z-30 h-16 sm:h-20 bg-white dark:bg-[#0b0f19]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/90 px-3 sm:px-6 lg:px-8 flex items-center justify-between transition-colors duration-200">
      {/* Left Side: Mobile Menu Button & Search Bar */}
      <div className="flex items-center gap-2 sm:gap-4 flex-1 max-w-[540px]">
        {/* Menu Toggle Button */}
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 sm:p-2.5 rounded-2xl text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/70 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shrink-0 active:scale-95"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search Bar */}
        <div className="relative w-full max-w-[320px] sm:max-w-[400px]">
          <div className="absolute inset-y-0 left-0 pl-3 sm:pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search leads, services, invoices..."
            className="w-full pl-9 sm:pl-10 pr-8 py-2 sm:py-2.5 bg-slate-100 dark:bg-slate-850/90 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-[12px] sm:text-[13px] rounded-2xl border border-slate-200/80 dark:border-slate-700/80 focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Right Side: Quick Tools, Icon Group, Region Selector, Profile */}
      <div className="flex items-center gap-2 sm:gap-3.5">
        {/* Quick Sync Button */}
        <button
          onClick={onSyncDatabase}
          disabled={isSyncing}
          title="Sync with Supabase & Neon cloud database"
          className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-2xl text-[12px] font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200/60 dark:border-slate-700 active:scale-95"
        >
          <RefreshCw
            className={`w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 ${
              isSyncing ? "animate-spin" : ""
            }`}
          />
          <span>{isSyncing ? "Syncing..." : "Sync DB"}</span>
        </button>

        {/* Export to Excel (.xlsx) */}
        <button
          onClick={onExportExcel}
          title="Export all database tables into Microsoft Excel (.xlsx)"
          className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl text-[12px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-all active:scale-95"
        >
          <Download className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Export Excel</span>
        </button>

        {/* Divider */}
        <div className="hidden sm:block w-[1px] h-6 bg-slate-200 dark:bg-slate-800 mx-1" />

        {/* Icon Group */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {/* Notifications with red dot badge */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifMenu(!showNotifMenu)}
              className="relative p-2 sm:p-2.5 rounded-2xl text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-[#0f172a] animate-pulse" />
              )}
            </button>

            {/* Notifications Dropdown Panel */}
            {showNotifMenu && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-3xl bg-white dark:bg-[#111827] border border-slate-100 dark:border-slate-800 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-extrabold text-slate-900 dark:text-white">
                      Notifications
                    </span>
                    {unreadCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">Real-time</span>
                </div>

                <div className="mt-3 space-y-2 max-h-[320px] overflow-y-auto custom-scrollbar">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => onMarkNotificationRead(notif.id)}
                      className={`p-3 rounded-2xl transition-all cursor-pointer flex items-start gap-3 border ${
                        notif.unread
                          ? "bg-indigo-50/60 dark:bg-indigo-950/30 border-indigo-100 dark:border-indigo-900/50"
                          : "bg-slate-50/50 dark:bg-slate-800/40 border-transparent hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 text-xs">
                        {notif.type === "lead" && "👤"}
                        {notif.type === "payment" && "💰"}
                        {notif.type === "audit" && "🔍"}
                        {notif.type === "system" && "⚡"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h5 className="text-[12px] font-bold text-slate-900 dark:text-white truncate">
                            {notif.title}
                          </h5>
                          <span className="text-[10px] text-slate-400 shrink-0 ml-2">
                            {notif.time}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug mt-0.5 line-clamp-2">
                          {notif.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Messages Icon */}
          <button
            onClick={onNavigateToWhatsApp}
            title="Inbound Messages & WhatsApp Hub"
            className="relative p-2 sm:p-2.5 rounded-2xl text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            aria-label="Messages"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#0f172a]" />
          </button>

          {/* Dark / Light Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 sm:p-2.5 rounded-2xl text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            aria-label="Toggle theme"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400 transition-transform hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600 transition-transform hover:-rotate-12" />
            )}
          </button>
        </div>

        {/* Language & Currency Selector with Flag Icon */}
        <div className="relative" ref={regionRef}>
          <button
            onClick={() => setShowRegionMenu(!showRegionMenu)}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-[12px] font-bold"
          >
            <span className="text-base leading-none">{currentRegionObj.flag}</span>
            <span className="hidden sm:inline">{currentRegionObj.key}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showRegionMenu && (
            <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200/80 dark:border-slate-800 shadow-xl p-2 z-50">
              {regions.map((reg) => (
                <button
                  key={reg.key}
                  onClick={() => {
                    setCurrencyRegion(reg.key);
                    setShowRegionMenu(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-[12px] font-bold transition-colors ${
                    currencyRegion === reg.key
                      ? "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{reg.flag}</span>
                    <span>{reg.label}</span>
                  </div>
                  {currencyRegion === reg.key && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Profile Component: Avatar + Name + Role */}
        <div className="flex items-center gap-3 pl-1 sm:pl-2">
          {/* Avatar with gradient & online dot */}
          <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#4f46e5] to-[#818cf8] p-0.5 shadow-md shrink-0">
            <div className="w-full h-full rounded-[14px] bg-[#0f172a] flex items-center justify-center overflow-hidden">
              <span className="text-xs font-black text-white tracking-wider">RS</span>
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#0f172a]" />
          </div>

          {/* Name & Role */}
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-[13px] font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Rahul Swami
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Super Admin • Balaji Prime
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
