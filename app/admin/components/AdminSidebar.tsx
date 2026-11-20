"use client";

import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  DollarSign,
  Globe2,
  Search,
  MessageSquare,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Layers,
  LogOut,
  ShieldCheck,
  X,
} from "lucide-react";

export type AdminViewType =
  | "overview"
  | "leads"
  | "services"
  | "publishers"
  | "projects"
  | "finances"
  | "invoices"
  | "audits"
  | "whatsapp";

interface AdminSidebarProps {
  activeView: AdminViewType;
  setActiveView: (view: AdminViewType) => void;
  isOpenMobile: boolean;
  setIsOpenMobile: (open: boolean) => void;
  onLogout?: () => void;
  leadCount?: number;
  paymentCount?: number;
}

export default function AdminSidebar({
  activeView,
  setActiveView,
  isOpenMobile,
  setIsOpenMobile,
  onLogout,
  leadCount = 8,
  paymentCount = 5,
}: AdminSidebarProps) {
  const navSections = [
    {
      group: "DASHBOARD",
      items: [
        {
          id: "overview" as AdminViewType,
          label: "Overview",
          icon: LayoutDashboard,
          badge: "Live",
          badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
        },
      ],
    },
    {
      group: "MANAGEMENT & LEADS",
      items: [
        {
          id: "leads" as AdminViewType,
          label: "Inbound Leads",
          icon: Users,
          badge: leadCount > 0 ? `${leadCount}` : undefined,
          badgeColor: "bg-indigo-500/30 text-indigo-300 border-indigo-500/40",
        },
        {
          id: "whatsapp" as AdminViewType,
          label: "WhatsApp Messages",
          icon: MessageSquare,
          badge: "Direct",
          badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
        },
      ],
    },
    {
      group: "SERVICES & DELIVERABLES",
      items: [
        {
          id: "services" as AdminViewType,
          label: "Services Catalog",
          icon: Layers,
          badge: "8 Services",
          badgeColor: "bg-slate-800 text-slate-300 border-slate-700",
        },
        {
          id: "publishers" as AdminViewType,
          label: "Publishers (40k)",
          icon: Globe2,
          badge: "DA 90+",
          badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
        },
        {
          id: "projects" as AdminViewType,
          label: "Projects & Sprints",
          icon: Briefcase,
          badge: "6 Active",
          badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
        },
      ],
    },
    {
      group: "FINANCES & BILLING",
      items: [
        {
          id: "finances" as AdminViewType,
          label: "Payments & Cash Flow",
          icon: DollarSign,
          badge: paymentCount > 0 ? `${paymentCount} Paid` : undefined,
          badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
        },
        {
          id: "invoices" as AdminViewType,
          label: "Invoice Generator",
          icon: FileText,
          badge: "PDF",
          badgeColor: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
        },
      ],
    },
    {
      group: "TOOLS & AUDITS",
      items: [
        {
          id: "audits" as AdminViewType,
          label: "SEO Site Audits",
          icon: Search,
          badge: "96%",
          badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
        },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={() => setIsOpenMobile(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container: 280px fixed width, #0f172a */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-[280px] bg-[#0f172a] text-slate-300 flex flex-col justify-between border-r border-[#1e293b] shadow-2xl transition-transform duration-300 lg:static lg:translate-x-0 ${
          isOpenMobile ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Top Section: Brand & Logo */}
        <div className="flex flex-col flex-1 overflow-y-auto custom-scrollbar">
          {/* Brand Header */}
          <div className="h-20 px-6 flex items-center justify-between border-b border-[#1e293b]/80 shrink-0">
            <Link
              href="/"
              className="flex items-center gap-3 group select-none"
              title="Return to public site"
            >
              {/* 40x40px rounded-xl box logo */}
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-[#4f46e5] to-[#3730a3] p-[2px] shadow-lg shadow-indigo-900/40 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <div className="w-full h-full rounded-[10px] bg-[#0f172a] flex items-center justify-center overflow-hidden">
                  <span className="font-extrabold text-white text-base tracking-tight">NG</span>
                </div>
                {/* Live pulsing online dot */}
                <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-[#0f172a]" />
                </span>
              </div>

              {/* Brand Title */}
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-[15px] font-extrabold text-white tracking-tight">
                    Nova Growth
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#4f46e5]/20 text-[#818cf8] border border-[#4f46e5]/40 uppercase">
                    Admin
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium tracking-wide">
                  Balaji Prime Media Command
                </span>
              </div>
            </Link>

            {/* Mobile Close Button */}
            <button
              onClick={() => setIsOpenMobile(false)}
              className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Groups */}
          <nav className="p-4 space-y-6">
            {navSections.map((section) => (
              <div key={section.group} className="space-y-1">
                {/* Group Uppercase Label */}
                <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400 select-none">
                  {section.group}
                </div>

                {/* Items */}
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeView === item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveView(item.id);
                          setIsOpenMobile(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-[13px] font-semibold transition-all duration-300 group ${
                          isActive
                            ? "bg-[#4f46e5] text-white shadow-[0_10px_15px_-3px_rgba(79,70,229,0.4)] scale-[1.01]"
                            : "text-slate-400 hover:text-white hover:bg-[#1e293b]/60"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon
                            className={`w-4 h-4 transition-colors ${
                              isActive
                                ? "text-white"
                                : "text-slate-400 group-hover:text-indigo-400"
                            }`}
                          />
                          <span>{item.label}</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {item.badge && (
                            <span
                              className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${
                                isActive
                                  ? "bg-white/20 text-white border-white/30"
                                  : item.badgeColor
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                          <ChevronRight
                            className={`w-3.5 h-3.5 transition-transform duration-200 ${
                              isActive
                                ? "text-white translate-x-0.5"
                                : "text-slate-600 group-hover:text-slate-400"
                            }`}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom Section: Specialized 'Help' card (#1e293b with border) */}
        <div className="p-4 border-t border-[#1e293b]/80 space-y-3 shrink-0">
          <div className="p-4 rounded-2xl bg-[#1e293b] border border-slate-700/60 shadow-lg relative overflow-hidden group">
            {/* Ambient subtle glow */}
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl pointer-events-none" />

            <div className="flex items-start gap-3 relative z-10">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0 text-indigo-400">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[12px] font-bold text-white tracking-tight">
                  Help & Support Center
                </h4>
                <p className="text-[11px] text-slate-400 leading-snug mt-0.5 line-clamp-2">
                  Need assistance with cloud database sync, leads, or billing?
                </p>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-700/50 flex items-center justify-between text-[11px]">
              <Link
                href="/contact"
                target="_blank"
                className="font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
              >
                <span>Help Desk</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
              <span className="text-[10px] text-slate-400 font-medium">24/7 SLA</span>
            </div>
          </div>

          {/* Quick Site Link & Sign Out */}
          <div className="flex items-center justify-between px-1 text-[11px] text-slate-400">
            <Link
              href="/"
              target="_blank"
              className="hover:text-white flex items-center gap-1 transition-colors"
            >
              <Globe2 className="w-3.5 h-3.5 text-slate-400" />
              <span>View Website</span>
            </Link>

            {onLogout && (
              <button
                onClick={onLogout}
                className="hover:text-rose-400 flex items-center gap-1 transition-colors font-medium"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
