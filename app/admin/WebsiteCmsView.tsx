"use client";

import React, { useState } from "react";

interface WebsiteCmsViewProps {
  isDark: boolean;
  totalLeads: number;
  totalUsers: number;
  onNavigate: (view: string) => void;
  onDownloadExcel: () => void;
}

export default function WebsiteCmsView({
  isDark,
  totalLeads,
  totalUsers,
  onNavigate,
  onDownloadExcel,
}: WebsiteCmsViewProps) {
  const [activeTab, setActiveTab] = useState<"pages" | "blogs" | "media" | "leads" | "database">("database");

  // Website Pages Inventory
  const pagesList = [
    { name: "Home Landing Page", slug: "/", status: "Live", lastModified: "Today, 11:20 PM", views: "14,890", seoScore: "98/100" },
    { name: "Projects / Work", slug: "/projects", status: "Live", lastModified: "12 Nov 2026", views: "6,210", seoScore: "95/100" },
    { name: "Services Suite", slug: "/services", status: "Live", lastModified: "12 Nov 2026", views: "8,450", seoScore: "96/100" },
    { name: "Blog / Insights", slug: "/blog", status: "Live", lastModified: "10 Nov 2026", views: "4,120", seoScore: "92/100" },
    { name: "About Nova Growth", slug: "/about", status: "Live", lastModified: "08 Nov 2026", views: "3,890", seoScore: "94/100" },
    { name: "Contact & RFP Portal", slug: "/contact", status: "Live", lastModified: "12 Nov 2026", views: "5,340", seoScore: "99/100" },
    { name: "Admin Suite", slug: "/admin", status: "Protected (Auth)", lastModified: "Just now", views: "Secure", seoScore: "N/A" },
  ];

  // Blog Posts Inventory
  const blogsList = [
    { title: "Enterprise Next.js Architecture for Sub-Second Performance", category: "Web Engineering", author: "Balaji Prime Team", date: "10 Nov 2026", reads: "1,240", status: "Published" },
    { title: "High-DR Guest Posting & Algorithmic Search Supremacy in 2026", category: "SEO & Growth", author: "Editorial Lead", date: "06 Nov 2026", reads: "2,890", status: "Published" },
    { title: "How Custom Mobile Apps Drive 4x Higher Retention for FinTechs", category: "Mobile Apps", author: "Engineering Team", date: "02 Nov 2026", reads: "980", status: "Published" },
  ];

  // Media Library Assets
  const mediaList = [
    { name: "contact-hero-3d.jpg", type: "Image / JPEG", size: "284 KB", path: "/images/contact-hero-3d.jpg", usage: "Contact Hero" },
    { name: "brand-logo.svg", type: "Vector / SVG", size: "12 KB", path: "/brand/logo.svg", usage: "Global Navbar & Footer" },
    { name: "hero-gradient-orb.png", type: "Image / PNG", size: "420 KB", path: "/images/hero-gradient-orb.png", usage: "Home Showcase" },
    { name: "enterprise-audit-report.pdf", type: "Document / PDF", size: "1.4 MB", path: "/docs/sample-audit.pdf", usage: "Client Download" },
  ];

  return (
    <div className="space-y-6 animate-fadeIn font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Website Management &amp; Database System
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/30">
              CMS Central
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            Complete database visibility for Client: Leads, Signups, Blogs, Pages, Media &amp; Database Records.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onDownloadExcel}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md hover:from-purple-500 hover:to-indigo-500 transition-all cursor-pointer"
          >
            📥 Export All DB Data (.xlsx)
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-white/5 pb-2 text-xs font-semibold overflow-x-auto">
        {[
          { id: "database", label: "🗄️ Database Records", badge: `${totalLeads + totalUsers}` },
          { id: "pages", label: "📄 Website Pages", badge: "7 Pages" },
          { id: "blogs", label: "✍️ Blogs & Articles", badge: "3 Posts" },
          { id: "media", label: "🖼️ Media Library", badge: "4 Assets" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === tab.id
                ? "bg-[#6366f1] text-white shadow-md shadow-indigo-950/60"
                : "bg-[#14182b] text-gray-400 hover:text-white border border-white/5"
            }`}
          >
            <span>{tab.label}</span>
            <span className="px-1.5 py-0.2 rounded-md text-[10px] font-bold bg-black/30 text-white/90">
              {tab.badge}
            </span>
          </button>
        ))}
      </div>

      {/* Content Panes */}
      {activeTab === "database" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl border border-white/5 bg-[#101322]">
              <p className="text-[11px] font-bold uppercase text-gray-400">Total Database Records</p>
              <p className="text-3xl font-black text-white mt-1">{totalLeads + totalUsers}</p>
              <p className="text-[11px] text-emerald-400 mt-2">✓ Supabase &amp; Local DB Synchronized</p>
            </div>
            <div className="p-5 rounded-2xl border border-white/5 bg-[#101322]">
              <p className="text-[11px] font-bold uppercase text-gray-400">Active Form Endpoints</p>
              <p className="text-3xl font-black text-white mt-1">4 API Routes</p>
              <p className="text-[11px] text-purple-300 mt-2">/api/db/leads, /contact, /auth, /checkout</p>
            </div>
            <div className="p-5 rounded-2xl border border-white/5 bg-[#101322]">
              <p className="text-[11px] font-bold uppercase text-gray-400">Data Integrity</p>
              <p className="text-3xl font-black text-white mt-1">100% SLA</p>
              <p className="text-[11px] text-cyan-300 mt-2">Automated Snapshot Backups</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-white/5 bg-[#101322] space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Database Management Quick Actions</h3>
              <span className="text-[10px] text-gray-400 font-mono">Managed for Client</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <button
                type="button"
                onClick={() => onNavigate("users")}
                className="p-3 rounded-xl border border-white/5 bg-[#161a2e] text-left hover:border-purple-500/40 transition-all cursor-pointer"
              >
                <p className="text-xs font-bold text-white">👥 View All Users &amp; Leads</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Filter, search, and manage leads</p>
              </button>
              <button
                type="button"
                onClick={() => onNavigate("payments")}
                className="p-3 rounded-xl border border-white/5 bg-[#161a2e] text-left hover:border-amber-500/40 transition-all cursor-pointer"
              >
                <p className="text-xs font-bold text-white">💳 View Payment Ledger</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Check Paid, Pending &amp; Remaining</p>
              </button>
              <button
                type="button"
                onClick={() => onNavigate("add_payment")}
                className="p-3 rounded-xl border border-white/5 bg-[#161a2e] text-left hover:border-emerald-500/40 transition-all cursor-pointer"
              >
                <p className="text-xs font-bold text-white">➕ Record New Settlement</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Add client transaction record</p>
              </button>
              <button
                type="button"
                onClick={() => onNavigate("invoice")}
                className="p-3 rounded-xl border border-white/5 bg-[#161a2e] text-left hover:border-cyan-500/40 transition-all cursor-pointer"
              >
                <p className="text-xs font-bold text-white">🧾 Create Tax Invoice</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Generate PDF invoice for client</p>
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "pages" && (
        <div className="p-5 rounded-2xl border border-white/5 bg-[#101322] overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/5 text-gray-400 uppercase text-[10px]">
                <th className="py-2.5 px-3">Page Name</th>
                <th className="py-2.5 px-3">Route / Slug</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Last Modified</th>
                <th className="py-2.5 px-3">Monthly Views</th>
                <th className="py-2.5 px-3 text-right">SEO Health</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {pagesList.map((p, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02]">
                  <td className="py-3 px-3 font-bold text-white">{p.name}</td>
                  <td className="py-3 px-3 font-mono text-purple-300">{p.slug}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-gray-400">{p.lastModified}</td>
                  <td className="py-3 px-3 font-semibold text-white">{p.views}</td>
                  <td className="py-3 px-3 text-right font-mono text-emerald-400 font-bold">{p.seoScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "blogs" && (
        <div className="p-5 rounded-2xl border border-white/5 bg-[#101322] overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/5 text-gray-400 uppercase text-[10px]">
                <th className="py-2.5 px-3">Article Title</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Author</th>
                <th className="py-2.5 px-3">Publish Date</th>
                <th className="py-2.5 px-3">Reads</th>
                <th className="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {blogsList.map((b, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02]">
                  <td className="py-3 px-3 font-bold text-white">{b.title}</td>
                  <td className="py-3 px-3 text-purple-300">{b.category}</td>
                  <td className="py-3 px-3 text-gray-300">{b.author}</td>
                  <td className="py-3 px-3 text-gray-400">{b.date}</td>
                  <td className="py-3 px-3 font-semibold text-white">{b.reads}</td>
                  <td className="py-3 px-3 text-right">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "media" && (
        <div className="p-5 rounded-2xl border border-white/5 bg-[#101322] overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/5 text-gray-400 uppercase text-[10px]">
                <th className="py-2.5 px-3">Asset File Name</th>
                <th className="py-2.5 px-3">MIME / Type</th>
                <th className="py-2.5 px-3">File Size</th>
                <th className="py-2.5 px-3">Public URL Path</th>
                <th className="py-2.5 px-3 text-right">Active Usage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mediaList.map((m, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02]">
                  <td className="py-3 px-3 font-bold text-white flex items-center gap-2">
                    <span>🖼️</span>
                    <span>{m.name}</span>
                  </td>
                  <td className="py-3 px-3 text-gray-400">{m.type}</td>
                  <td className="py-3 px-3 font-mono text-cyan-300">{m.size}</td>
                  <td className="py-3 px-3 font-mono text-purple-300">{m.path}</td>
                  <td className="py-3 px-3 text-right">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/30">
                      {m.usage}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
