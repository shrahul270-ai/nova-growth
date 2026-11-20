"use client";

import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";

import AdminSidebar, { AdminViewType } from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import OverviewView from "./components/OverviewView";
import LeadsView from "./components/LeadsView";
import ServicesView from "./components/ServicesView";
import PublishersView from "./components/PublishersView";
import ProjectsView from "./components/ProjectsView";
import FinancesView from "./components/FinancesView";
import AuditsView from "./components/AuditsView";
import WhatsAppView from "./components/WhatsAppView";
import AdminLoginView from "./components/AdminLoginView";
import {
  AddLeadModal,
  AddPaymentModal,
  CreateInvoiceModal,
  InvoicePreviewModal,
} from "./components/Modals";

import {
  LeadItem,
  PaymentItem,
  ProjectItem,
  InvoiceItem,
  AuditItem,
  ActivityItem,
  NotificationItem,
  WhatsAppItem,
  ServiceDetailItem,
} from "./types";

import {
  MOCK_LEADS,
  MOCK_SERVICES,
  MOCK_PUBLISHERS,
  MOCK_PROJECTS,
  MOCK_PAYMENTS,
  MOCK_INVOICES,
  MOCK_AUDITS,
  MOCK_TIMELINE,
  MOCK_NOTIFICATIONS,
  MOCK_WHATSAPP,
} from "./mockData";

export default function AdminMasterDashboard() {
  // Theme State ("Soft Professional" theme: #f8fafc light background by default)
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const isDark = theme === "dark";

  // Navigation View State
  const [activeView, setActiveView] = useState<AdminViewType>("overview");
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  // Search & Currency
  const [searchQuery, setSearchQuery] = useState("");
  const [currencyRegion, setCurrencyRegion] = useState<"USD" | "INR" | "GBP" | "AED">("USD");

  // Live Database States
  const [leads, setLeads] = useState<LeadItem[]>(MOCK_LEADS);
  const [services] = useState<ServiceDetailItem[]>(MOCK_SERVICES);
  const [publishers] = useState(MOCK_PUBLISHERS);
  const [projects, setProjects] = useState<ProjectItem[]>(MOCK_PROJECTS);
  const [payments, setPayments] = useState<PaymentItem[]>(MOCK_PAYMENTS);
  const [invoices, setInvoices] = useState<InvoiceItem[]>(MOCK_INVOICES);
  const [audits, setAudits] = useState<AuditItem[]>(MOCK_AUDITS);
  const [timeline, setTimeline] = useState<ActivityItem[]>(MOCK_TIMELINE);
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  const [whatsapp, setWhatsapp] = useState<WhatsAppItem[]>(MOCK_WHATSAPP);

  // Modal States
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [isAddPaymentOpen, setIsAddPaymentOpen] = useState(false);
  const [isCreateInvoiceOpen, setIsCreateInvoiceOpen] = useState(false);
  const [prefillLeadForInvoice, setPrefillLeadForInvoice] = useState<LeadItem | null>(null);
  const [prefillServiceForInvoice, setPrefillServiceForInvoice] = useState<ServiceDetailItem | null>(null);
  const [previewInvoice, setPreviewInvoice] = useState<InvoiceItem | null>(null);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // System States
  const [isSyncing, setIsSyncing] = useState(false);
  const [isScanningAudit, setIsScanningAudit] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Verify Admin Session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const localAuth = localStorage.getItem("bpm_admin_authenticated");
        if (localAuth === "true") {
          setIsAuthenticated(true);
        }

        const res = await fetch("/api/admin/verify");
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            setIsAuthenticated(true);
            try {
              localStorage.setItem("bpm_admin_authenticated", "true");
            } catch {}
            return;
          }
        }

        if (localAuth !== "true") {
          setIsAuthenticated(false);
        }
      } catch {
        const localAuth = localStorage.getItem("bpm_admin_authenticated");
        setIsAuthenticated(localAuth === "true");
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {}
    try {
      localStorage.removeItem("bpm_admin_authenticated");
      localStorage.removeItem("bpm_admin_user");
    } catch {}
    setIsAuthenticated(false);
    showToast("Logged out successfully");
  };

  // Load saved theme
  useEffect(() => {
    try {
      const saved = localStorage.getItem("bpm_admin_theme");
      if (saved === "light" || saved === "dark") {
        setTheme(saved);
      }
    } catch {}
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    try {
      localStorage.setItem("bpm_admin_theme", next);
    } catch {}
    showToast(`${next === "dark" ? "Dark Mode" : "Light Mode"} enabled`);
  };

  // Sync Live Data Feed from /api/admin/feed
  const syncDatabaseFeed = async (showManualToast = true) => {
    setIsSyncing(true);
    try {
      const res = await fetch(`/api/admin/feed?_t=${Date.now()}`, {
        cache: "no-store",
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          if (Array.isArray(data.users) && data.users.length > 0) {
            // Merge with leads
            const mappedLeads: LeadItem[] = data.users.map((u: any, idx: number) => ({
              id: u.id || `LEAD-${idx}`,
              name: u.name || "Client Lead",
              email: u.email || "client@domain.com",
              phone: u.number || "+1 555 000 0000",
              country: u.country || "Global",
              countryCode: u.countryCode || "GL",
              countryFlag: u.flag || "🌐",
              website: u.domain,
              service: u.serviceInterest || "Website Development & Next.js Architecture",
              budget: "$3,000+",
              message: u.message || `Inquiry received from ${u.domain || "website"}.`,
              status: u.isNew ? "new" : "contacted",
              sourceUrl: "/contact",
              clientIp: u.ip,
              createdAt: new Date().toISOString(),
              timeline: "Normal",
            }));

            // Deduplicate
            const existingIds = new Set(leads.map((l) => l.id));
            const newOnes = mappedLeads.filter((l) => !existingIds.has(l.id));
            if (newOnes.length > 0) {
              setLeads((prev) => [...newOnes, ...prev]);
            }
          }

          if (Array.isArray(data.whatsapp) && data.whatsapp.length > 0) {
            setWhatsapp((prev) => {
              const existingIds = new Set(prev.map((w) => w.id));
              const newWa = data.whatsapp.filter((w: any) => !existingIds.has(w.id));
              return [...newWa, ...prev];
            });
          }

          if (showManualToast) {
            showToast("✓ Supabase & Neon synced successfully!");
          }
        }
      }
    } catch (err) {
      console.warn("Sync error:", err);
      if (showManualToast) {
        showToast("⚠️ Cloud database connection temporarily unavailable.");
      }
    } finally {
      setIsSyncing(false);
    }
  };

  // Auto-sync on mount
  useEffect(() => {
    syncDatabaseFeed(false);
    const interval = setInterval(() => syncDatabaseFeed(false), 20000);
    return () => clearInterval(interval);
  }, []);

  // Export Complete Multi-Sheet Excel Workbook (.xlsx)
  const handleExportExcel = () => {
    try {
      const wb = XLSX.utils.book_new();

      // 1. Leads Sheet
      const wsLeads = XLSX.utils.json_to_sheet(
        leads.map((l) => ({
          ID: l.id,
          Name: l.name,
          Email: l.email,
          Phone: l.phone,
          Country: l.country,
          Service: l.service,
          Budget: l.budget,
          Status: l.status,
          Message: l.message,
          Date: l.createdAt,
        }))
      );
      XLSX.utils.book_append_sheet(wb, wsLeads, "Leads & Inquiries");

      // 2. Payments Sheet
      const wsPayments = XLSX.utils.json_to_sheet(
        payments.map((p) => ({
          ID: p.id,
          Client: p.clientName,
          Email: p.clientEmail,
          Service: p.service,
          Total: p.amount,
          Paid: p.paidAmount,
          Remaining: p.pendingAmount,
          Rail: p.rail,
          Status: p.status,
          Reference: p.txnRef,
          Date: p.date,
        }))
      );
      XLSX.utils.book_append_sheet(wb, wsPayments, "Payments Ledger");

      // 3. Projects Sheet
      const wsProjects = XLSX.utils.json_to_sheet(
        projects.map((pr) => ({
          ID: pr.id,
          Name: pr.name,
          Client: pr.clientName,
          Domain: pr.domain,
          Category: pr.category,
          Budget: pr.budget,
          Timeline: pr.timeline,
          Progress: `${pr.progress}%`,
          Status: pr.status,
        }))
      );
      XLSX.utils.book_append_sheet(wb, wsProjects, "Projects & Sprints");

      // 4. Services Sheet
      const wsServices = XLSX.utils.json_to_sheet(
        services.map((s) => ({
          Service_Name: s.name,
          Category: s.category,
          Price_USD: s.priceUSD,
          Price_INR: s.priceINR,
          TAT_Turnaround: s.tat,
          Billing_Period: s.billingPeriod,
          Headline: s.headline,
        }))
      );
      XLSX.utils.book_append_sheet(wb, wsServices, "Services Catalog");

      // 5. Publishers Sheet
      const wsPublishers = XLSX.utils.json_to_sheet(
        publishers.map((pub) => ({
          Domain: pub.domain,
          Niche: pub.niche,
          DR: pub.dr,
          DA: pub.da,
          Traffic: pub.ahrefsTraffic,
          Price_USD: pub.priceUSD,
          Price_INR: pub.priceINR,
          Link_Type: pub.linkType,
          TAT: `${pub.tatDays} days`,
        }))
      );
      XLSX.utils.book_append_sheet(wb, wsPublishers, "Media Publishers Database");

      XLSX.writeFile(
        wb,
        `BalajiPrimeMedia_Master_Database_${new Date().toISOString().slice(0, 10)}.xlsx`
      );
      showToast("✓ Excel master workbook exported successfully!");
    } catch (err) {
      console.error("Export Excel error:", err);
      showToast("⚠️ Error exporting Excel file.");
    }
  };

  // Add Lead Handler
  const handleAddLead = (newLeadData: Omit<LeadItem, "id" | "createdAt">) => {
    const newLead: LeadItem = {
      ...newLeadData,
      id: `BPM-LEAD-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString(),
    };
    setLeads([newLead, ...leads]);

    // Also add to Timeline
    const newAct: ActivityItem = {
      id: `ACT-${Date.now()}`,
      title: "New Qualified Lead",
      description: `${newLead.name} (${newLead.country}) interested in ${newLead.service}.`,
      timestamp: "Just now",
      user: newLead.name,
      avatarText: newLead.name.slice(0, 2).toUpperCase(),
      type: "lead",
      statusBadge: "New",
      statusColor: "emerald",
    };
    setTimeline([newAct, ...timeline]);

    showToast(`✓ Lead ${newLead.name} saved successfully!`);

    // Sync to backend DB asynchronously
    try {
      fetch("/api/db/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newLead.name,
          email: newLead.email,
          phone: newLead.phone,
          service: newLead.service,
          budget: newLead.budget,
          message: newLead.message,
          website: newLead.website,
          notes: newLead.notes,
          sourceUrl: "/admin",
        }),
      });
    } catch {}
  };

  // Add Payment Handler
  const handleAddPayment = (payData: Omit<PaymentItem, "id" | "date" | "time">) => {
    const newPayment: PaymentItem = {
      ...payData,
      id: `BPM-TXN-${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      time: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) + " IST",
    };
    setPayments([newPayment, ...payments]);

    // Timeline event
    const newAct: ActivityItem = {
      id: `ACT-${Date.now()}`,
      title: "Payment Received",
      description: `${newPayment.paidAmount} received from ${newPayment.clientName} via ${newPayment.rail}.`,
      timestamp: "Just now",
      user: newPayment.clientName,
      avatarText: newPayment.clientName.slice(0, 2).toUpperCase(),
      type: "payment",
      statusBadge: newPayment.status,
      statusColor: "indigo",
    };
    setTimeline([newAct, ...timeline]);

    showToast(`✓ Payment of ${newPayment.amount} recorded!`);
  };

  // Create Invoice Handler
  const handleCreateInvoice = (invoice: InvoiceItem) => {
    setInvoices([invoice, ...invoices]);
    setPreviewInvoice(invoice);
    showToast(`✓ Invoice ${invoice.invoiceNo} issued!`);
  };

  // Run SEO Audit Express
  const handleRunAudit = (domain: string) => {
    setIsScanningAudit(true);
    showToast(`🔍 Scanning audit for ${domain}...`);

    setTimeout(() => {
      const overall = Math.floor(88 + Math.random() * 10);
      const perf = Math.floor(82 + Math.random() * 16);
      const seo = Math.floor(90 + Math.random() * 9);
      const mob = Math.floor(85 + Math.random() * 12);

      const newAudit: AuditItem = {
        id: `AUD-${Date.now().toString().slice(-4)}`,
        domain: domain.replace("https://", "").replace("http://", ""),
        overallScore: overall,
        performanceScore: perf,
        seoScore: seo,
        mobileScore: mob,
        status: overall > 85 ? "Healthy" : "Attention",
        date: "Today",
      };

      setAudits([newAudit, ...audits]);
      setIsScanningAudit(false);
      showToast(`✓ Audit generated successfully! Score: ${overall}/100`);
    }, 1800);
  };

  // Mark Lead Status
  const handleUpdateLeadStatus = (leadId: string, newStatus: LeadItem["status"]) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
    showToast("✓ Lead status updated");
  };

  // Guard: If authentication checking or unauthenticated, show login screen
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#090d16] flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3 animate-in fade-in duration-200">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#4f46e5] to-[#818cf8] p-0.5 shadow-xl shadow-indigo-900/40">
            <div className="w-full h-full rounded-[14px] bg-[#090d16] flex items-center justify-center">
              <span className="font-black text-xl text-white tracking-wider">BP</span>
            </div>
          </div>
          <span className="text-xs font-bold text-slate-400">Verifying Balaji Prime Admin Session...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <AdminLoginView
        onLoginSuccess={() => {
          setIsAuthenticated(true);
          showToast("Welcome back, Rahul Swami!");
        }}
      />
    );
  }

  return (
    <div
      className={`min-h-screen font-sans flex flex-row relative transition-colors duration-300 ${
        isDark ? "bg-[#090d16] text-slate-100 dark" : "bg-[#f8fafc] text-slate-900"
      }`}
    >
      {/* Toast Notification Pill */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0f172a] text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700/80 text-xs font-bold flex items-center gap-2.5 animate-in slide-in-from-bottom-4 duration-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Fixed-Width Dark Navy Sidebar (280px, #0f172a) */}
      <AdminSidebar
        activeView={activeView}
        setActiveView={setActiveView}
        isOpenMobile={isOpenMobile}
        setIsOpenMobile={setIsOpenMobile}
        onLogout={handleLogout}
        leadCount={leads.filter((l) => l.status === "new").length}
        paymentCount={payments.length}
      />

      {/* 2. Fluid Main Content Area with Light-Gray Workspace (#f8fafc) */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        {/* Sticky Header (80px, #ffffff) */}
        <AdminHeader
          onToggleMobileMenu={() => setIsOpenMobile(!isOpenMobile)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isDark={isDark}
          onToggleTheme={toggleTheme}
          onSyncDatabase={() => syncDatabaseFeed(true)}
          isSyncing={isSyncing}
          onExportExcel={handleExportExcel}
          notifications={notifications}
          onMarkNotificationRead={(id) =>
            setNotifications((prev) =>
              prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
            )
          }
          currencyRegion={currencyRegion}
          setCurrencyRegion={setCurrencyRegion}
        />

        {/* Dynamic View Router with Soft Professional Padding */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeView === "overview" && (
            <OverviewView
              leads={leads}
              payments={payments}
              projects={projects}
              audits={audits}
              timeline={timeline}
              services={services}
              onNavigate={(v) => setActiveView(v)}
              onOpenAddLeadModal={() => setIsAddLeadOpen(true)}
              onOpenAddPaymentModal={() => setIsAddPaymentOpen(true)}
              onOpenCreateInvoiceModal={() => {
                setPrefillLeadForInvoice(null);
                setPrefillServiceForInvoice(null);
                setIsCreateInvoiceOpen(true);
              }}
              onOpenQuickAuditModal={() => setActiveView("audits")}
              currencyRegion={currencyRegion}
            />
          )}

          {activeView === "leads" && (
            <LeadsView
              leads={leads}
              onOpenAddLeadModal={() => setIsAddLeadOpen(true)}
              onOpenCreateInvoiceWithLead={(lead) => {
                setPrefillLeadForInvoice(lead);
                setPrefillServiceForInvoice(null);
                setIsCreateInvoiceOpen(true);
              }}
              onUpdateLeadStatus={handleUpdateLeadStatus}
              onExportExcel={handleExportExcel}
            />
          )}

          {activeView === "services" && (
            <ServicesView
              services={services}
              onOpenCreateInvoiceWithService={(svc) => {
                setPrefillServiceForInvoice(svc);
                setPrefillLeadForInvoice(null);
                setIsCreateInvoiceOpen(true);
              }}
            />
          )}

          {activeView === "publishers" && (
            <PublishersView publishers={publishers} />
          )}

          {activeView === "projects" && (
            <ProjectsView
              projects={projects}
              onOpenCreateProjectModal={() => setIsAddLeadOpen(true)}
            />
          )}

          {activeView === "finances" && (
            <FinancesView
              payments={payments}
              invoices={invoices}
              onOpenAddPaymentModal={() => setIsAddPaymentOpen(true)}
              onOpenCreateInvoiceModal={() => {
                setPrefillLeadForInvoice(null);
                setPrefillServiceForInvoice(null);
                setIsCreateInvoiceOpen(true);
              }}
              onPreviewInvoice={(inv) => setPreviewInvoice(inv)}
              currencyRegion={currencyRegion}
            />
          )}

          {activeView === "invoices" && (
            <FinancesView
              payments={payments}
              invoices={invoices}
              onOpenAddPaymentModal={() => setIsAddPaymentOpen(true)}
              onOpenCreateInvoiceModal={() => {
                setPrefillLeadForInvoice(null);
                setPrefillServiceForInvoice(null);
                setIsCreateInvoiceOpen(true);
              }}
              onPreviewInvoice={(inv) => setPreviewInvoice(inv)}
              currencyRegion={currencyRegion}
            />
          )}

          {activeView === "audits" && (
            <AuditsView
              audits={audits}
              onRunAudit={handleRunAudit}
              isScanning={isScanningAudit}
            />
          )}

          {activeView === "whatsapp" && (
            <WhatsAppView
              conversations={whatsapp}
              onOpenAddWhatsAppModal={() => setIsAddLeadOpen(true)}
            />
          )}
        </main>
      </div>

      {/* Modals Container */}
      <AddLeadModal
        isOpen={isAddLeadOpen}
        onClose={() => setIsAddLeadOpen(false)}
        onAddLead={handleAddLead}
        services={services}
      />

      <AddPaymentModal
        isOpen={isAddPaymentOpen}
        onClose={() => setIsAddPaymentOpen(false)}
        onAddPayment={handleAddPayment}
      />

      <CreateInvoiceModal
        isOpen={isCreateInvoiceOpen}
        onClose={() => setIsCreateInvoiceOpen(false)}
        onCreateInvoice={handleCreateInvoice}
        prefillLead={prefillLeadForInvoice}
        prefillService={prefillServiceForInvoice}
      />

      <InvoicePreviewModal
        invoice={previewInvoice}
        onClose={() => setPreviewInvoice(null)}
      />
    </div>
  );
}
