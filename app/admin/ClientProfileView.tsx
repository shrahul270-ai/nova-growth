"use client";

import React, { useState, useMemo } from "react";

export interface BaseItem {
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
  website?: string;
  service?: string;
  budget?: string;
  message?: string;
  sourceUrl?: string;
  action?: string;
  title?: string;
  details?: string;
  clientIdentifier?: string;
  domain?: string;
  url?: string;
  scores?: any;
  amount?: number | string;
  currency?: string;
  planName?: string;
  transactionId?: string;
  clientName?: string;
  clientEmail?: string;
  [key: string]: any;
}

interface ClientDossier {
  key: string;
  name: string;
  email: string;
  phone: string;
  website: string;
  status: string;
  firstSeen: string;
  lastActive: string;
  inquiries: BaseItem[];
  interactions: BaseItem[];
  audits: BaseItem[];
  payments: BaseItem[];
  notes: string[];
}

interface ClientProfileViewProps {
  records: BaseItem[];
  initialQuery?: string;
  formatDate: (date?: string) => string;
  copyToClipboard: (text: string, label: string) => void;
  onRefreshData?: () => void;
}

export default function ClientProfileView({
  records,
  initialQuery = "",
  formatDate,
  copyToClipboard,
  onRefreshData,
}: ClientProfileViewProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedKey, setSelectedKey] = useState<string>("");
  const [newNoteText, setNewNoteText] = useState("");
  const [savingNote, setSavingNote] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const showFeedback = (msg: string) => {
    setActionSuccess(msg);
    setTimeout(() => setActionSuccess(null), 3000);
  };

  // Extract and group records into distinct clients
  const clientsList = useMemo(() => {
    const map = new Map<string, ClientDossier>();

    const cleanStr = (s?: string) => (s ? s.trim().toLowerCase() : "");
    const cleanPhoneDigits = (p?: string) => (p ? p.replace(/[^0-9]/g, "") : "");

    // Helper to find or create a dossier
    const getOrCreate = (email?: string, phone?: string, fallbackName?: string): ClientDossier => {
      const e = cleanStr(email);
      const ph = cleanPhoneDigits(phone);
      
      let key = "";
      if (e && e.includes("@")) {
        key = `email:${e}`;
      } else if (ph && ph.length >= 7) {
        key = `phone:${ph.slice(-10)}`;
      } else if (fallbackName && cleanStr(fallbackName)) {
        key = `name:${cleanStr(fallbackName)}`;
      } else {
        key = `unknown:${Math.random().toString(36).substring(7)}`;
      }

      if (!map.has(key)) {
        map.set(key, {
          key,
          name: fallbackName || "Anonymous Client",
          email: email || "",
          phone: phone || "",
          website: "",
          status: "new",
          firstSeen: new Date().toISOString(),
          lastActive: "1970-01-01T00:00:00.000Z",
          inquiries: [],
          interactions: [],
          audits: [],
          payments: [],
          notes: [],
        });
      }
      return map.get(key)!;
    };

    records.forEach((r) => {
      // 1. Leads
      if (r.collection === "leads") {
        const client = getOrCreate(r.email, r.phone, r.name);
        client.inquiries.push(r);
        if (r.name && (!client.name || client.name === "Anonymous Client")) client.name = r.name;
        if (r.email && !client.email) client.email = r.email;
        if (r.phone && !client.phone) client.phone = r.phone;
        if (r.website && !client.website) client.website = r.website;
        if (r.status) client.status = r.status;
        if (r.notes && !client.notes.includes(r.notes)) client.notes.push(r.notes);
        if (new Date(r.createdAt).getTime() > new Date(client.lastActive).getTime()) client.lastActive = r.createdAt;
        if (new Date(r.createdAt).getTime() < new Date(client.firstSeen).getTime()) client.firstSeen = r.createdAt;
      }

      // 2. Interactions
      else if (r.collection === "interactions") {
        const client = getOrCreate(r.email, r.phone || r.clientIdentifier, r.name);
        client.interactions.push(r);
        if (r.name && (!client.name || client.name === "Anonymous Client")) client.name = r.name;
        if (r.email && !client.email) client.email = r.email;
        if (r.phone && !client.phone) client.phone = r.phone;
        if (new Date(r.createdAt).getTime() > new Date(client.lastActive).getTime()) client.lastActive = r.createdAt;
        if (new Date(r.createdAt).getTime() < new Date(client.firstSeen).getTime()) client.firstSeen = r.createdAt;
      }

      // 3. Audits
      else if (r.collection === "audits") {
        const client = getOrCreate(r.emailSubmitted, undefined, r.domain);
        client.audits.push(r);
        if (r.domain && !client.website) client.website = r.domain;
        if (new Date(r.createdAt).getTime() > new Date(client.lastActive).getTime()) client.lastActive = r.createdAt;
        if (new Date(r.createdAt).getTime() < new Date(client.firstSeen).getTime()) client.firstSeen = r.createdAt;
      }

      // 4. Payments
      else if (r.collection === "payments") {
        const client = getOrCreate(r.clientEmail, undefined, r.clientName);
        client.payments.push(r);
        if (r.clientName && (!client.name || client.name === "Anonymous Client")) client.name = r.clientName;
        if (r.clientEmail && !client.email) client.email = r.clientEmail;
        if (new Date(r.createdAt).getTime() > new Date(client.lastActive).getTime()) client.lastActive = r.createdAt;
        if (new Date(r.createdAt).getTime() < new Date(client.firstSeen).getTime()) client.firstSeen = r.createdAt;
      }
    });

    const list = Array.from(map.values());
    // Sort clients with latest activity first
    list.sort((a, b) => new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime());
    return list;
  }, [records]);

  // Filter clients based on search query
  const filteredClients = useMemo(() => {
    if (!searchQuery.trim()) return clientsList;
    const q = searchQuery.toLowerCase().trim();
    return clientsList.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.replace(/[^0-9]/g, "").includes(q.replace(/[^0-9]/g, "")) ||
        c.website.toLowerCase().includes(q)
    );
  }, [clientsList, searchQuery]);

  // Determine active client dossier
  const activeClient = useMemo(() => {
    if (selectedKey) {
      const found = clientsList.find((c) => c.key === selectedKey);
      if (found) return found;
    }
    if (filteredClients.length > 0) {
      return filteredClients[0];
    }
    return null;
  }, [clientsList, selectedKey, filteredClients]);

  // Handle adding an internal note for this client
  const handleAddClientNote = async () => {
    if (!activeClient || !newNoteText.trim()) return;
    setSavingNote(true);

    try {
      // Find the primary lead or interaction to attach note to
      const target = activeClient.inquiries[0] || activeClient.interactions[0];
      if (target) {
        const existingNotes = target.notes ? `${target.notes} | ` : "";
        const updatedNotes = `${existingNotes}[${new Date().toLocaleDateString()}] ${newNoteText.trim()}`;

        const res = await fetch(`/api/db/${target.collection}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: target.id, notes: updatedNotes }),
        });
        const data = await res.json();
        if (data.success) {
          activeClient.notes.push(`[${new Date().toLocaleDateString()}] ${newNoteText.trim()}`);
          setNewNoteText("");
          showFeedback("Note added to Client Portfolio!");
          if (onRefreshData) onRefreshData();
        }
      }
    } catch {
      showFeedback("Failed to save note");
    } finally {
      setSavingNote(false);
    }
  };

  // Generate clean WhatsApp link
  const cleanPhone = activeClient?.phone ? activeClient.phone.replace(/[^0-9]/g, "") : "";
  const whatsappUrl = cleanPhone
    ? `https://wa.me/${cleanPhone.startsWith("91") || cleanPhone.length > 10 ? cleanPhone : `91${cleanPhone}`}?text=Hello%20${encodeURIComponent(
        activeClient?.name || "there"
      )},%20reaching%20out%20from%20Nova%20Growth%20Agency%20regarding%20your%20inquiry.`
    : null;

  // Copy Complete Client Dossier Summary
  const handleCopySummary = () => {
    if (!activeClient) return;

    const summaryText = `
=========================================
NOVA GROWTH - CLIENT 360° DOSSIER
=========================================
Name: ${activeClient.name}
Email: ${activeClient.email || "N/A"}
Phone: ${activeClient.phone || "N/A"}
Website: ${activeClient.website || "N/A"}
Current Status: ${activeClient.status.toUpperCase()}
First Contact: ${formatDate(activeClient.firstSeen)}
Latest Activity: ${formatDate(activeClient.lastActive)}

--- ACTIVITY SUMMARY ---
Total Form Inquiries: ${activeClient.inquiries.length}
Total WhatsApp & Calls: ${activeClient.interactions.length}
Total SEO Audits: ${activeClient.audits.length}
Total Payments: ${activeClient.payments.length}

--- LATEST INQUIRY MESSAGE ---
${activeClient.inquiries[0]?.message || "No message logged"}

--- INTERNAL NOTES ---
${activeClient.notes.join("\n") || "No notes"}
=========================================
    `.trim();

    copyToClipboard(summaryText, "Complete Client Dossier");
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {actionSuccess && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-950 border border-emerald-500 text-emerald-300 px-4 py-2.5 rounded-xl shadow-xl text-xs font-bold animate-fadeIn">
          ✓ {actionSuccess}
        </div>
      )}

      {/* TOP SEARCH & DIRECTORY BAR */}
      <div className="bg-[#0b1220] p-4 sm:p-5 rounded-2xl border border-gray-800">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <span className="text-amber-400">🔍</span>
              <span>Client 360° Dossier &amp; Tracking Portal</span>
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Instant permanent profile: enter any client's email or phone to view their full lifetime inquiries, touches, audits, and payments.
            </p>
          </div>

          {/* Quick Client Search Input */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search by email, phone, or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-gray-900 border border-gray-700 focus:border-amber-400 rounded-xl text-xs text-white placeholder-gray-500 outline-none"
            />
            <span className="absolute left-3 top-3 text-gray-500 text-xs">🔎</span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* DETECTED CLIENT QUICK PILLS */}
        <div className="pt-3 border-t border-gray-800/80 flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
            Recent Clients ({clientsList.length}):
          </span>
          {clientsList.map((c) => {
            const isSelected = activeClient?.key === c.key;
            return (
              <button
                key={c.key}
                onClick={() => {
                  setSelectedKey(c.key);
                  setSearchQuery("");
                }}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
                    : "bg-gray-900/80 hover:bg-gray-800 text-gray-300 border border-gray-800"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                <span>{c.name || c.email || c.phone}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${isSelected ? "bg-black/20 text-black" : "bg-gray-800 text-gray-400"}`}>
                  {c.inquiries.length + c.interactions.length + c.audits.length + c.payments.length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ACTIVE CLIENT DOSSIER VIEW */}
      {activeClient ? (
        <div className="space-y-6">
          {/* 1. CLIENT HEADER PROFILE CARD */}
          <div className="bg-[#0b1220] rounded-3xl border border-gray-800 p-6 shadow-2xl relative overflow-hidden">
            {/* Top Amber Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
              {/* Left Identity Info */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 text-black font-black text-2xl flex items-center justify-center shadow-lg shadow-amber-500/20">
                  {activeClient.name ? activeClient.name.slice(0, 2).toUpperCase() : "CL"}
                </div>
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      {activeClient.name}
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-extrabold uppercase bg-emerald-950 text-emerald-400 border border-emerald-800/80">
                      Permanent Cloud Stored
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2 text-xs text-gray-300">
                    {activeClient.email && (
                      <div className="flex items-center gap-1.5">
                        <span className="text-gray-500">✉️</span>
                        <span className="font-mono text-white">{activeClient.email}</span>
                      </div>
                    )}

                    {activeClient.phone && (
                      <div className="flex items-center gap-1.5">
                        <span className="text-gray-500">📞</span>
                        <span className="font-mono text-emerald-400 font-bold">{activeClient.phone}</span>
                      </div>
                    )}

                    {activeClient.website && (
                      <div className="flex items-center gap-1.5">
                        <span className="text-gray-500">🌐</span>
                        <a
                          href={activeClient.website.startsWith("http") ? activeClient.website : `https://${activeClient.website}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-400 hover:underline"
                        >
                          {activeClient.website}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 text-xs w-full lg:w-auto">
                {whatsappUrl && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-4 py-2.5 rounded-xl transition-all shadow-md shadow-emerald-600/20 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>💬</span>
                    <span>Chat on WhatsApp</span>
                  </a>
                )}

                {activeClient.phone && (
                  <a
                    href={`tel:${cleanPhone || activeClient.phone}`}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>📞</span>
                    <span>Direct Call</span>
                  </a>
                )}

                {activeClient.email && (
                  <a
                    href={`mailto:${activeClient.email}?subject=Nova%20Growth%20Agency%20Update`}
                    className="bg-gray-800 hover:bg-gray-700 text-white font-bold px-3.5 py-2.5 rounded-xl border border-gray-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>✉️</span>
                    <span>Email</span>
                  </a>
                )}

                <button
                  onClick={handleCopySummary}
                  className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/40 font-bold px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                  title="Copy formatted client dossier summary to clipboard"
                >
                  <span>📋</span>
                  <span>Copy Dossier</span>
                </button>
              </div>
            </div>

            {/* Quick First Seen / Last Active Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-5 border-t border-gray-800 text-xs">
              <div>
                <span className="text-gray-500 block text-[11px] mb-1 font-semibold">First Contact Date</span>
                <span className="font-bold text-gray-300 font-mono">{formatDate(activeClient.firstSeen)}</span>
              </div>
              <div>
                <span className="text-gray-500 block text-[11px] mb-1 font-semibold">Latest Touchpoint</span>
                <span className="font-bold text-amber-400 font-mono">{formatDate(activeClient.lastActive)}</span>
              </div>
              <div>
                <span className="text-gray-500 block text-[11px] mb-1 font-semibold">Total Client Engagements</span>
                <span className="font-extrabold text-white text-sm">
                  {activeClient.inquiries.length + activeClient.interactions.length + activeClient.audits.length + activeClient.payments.length} Events
                </span>
              </div>
              <div>
                <span className="text-gray-500 block text-[11px] mb-1 font-semibold">Client Status</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-950 text-amber-400 border border-amber-800">
                  {activeClient.status || "New"}
                </span>
              </div>
            </div>
          </div>

          {/* 2. FOUR LIFETIME METRIC BOXES */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-[#0b1220] p-4 rounded-2xl border border-gray-800">
              <span className="text-[11px] font-bold text-gray-400 uppercase block mb-1">📨 Form Inquiries</span>
              <span className="text-2xl font-black text-amber-400">{activeClient.inquiries.length}</span>
              <span className="text-[10.5px] text-gray-500 block mt-1">Submitted briefs</span>
            </div>

            <div className="bg-[#0b1220] p-4 rounded-2xl border border-gray-800">
              <span className="text-[11px] font-bold text-gray-400 uppercase block mb-1">💬 WhatsApp &amp; Calls</span>
              <span className="text-2xl font-black text-emerald-400">{activeClient.interactions.length}</span>
              <span className="text-[10.5px] text-gray-500 block mt-1">Direct click touches</span>
            </div>

            <div className="bg-[#0b1220] p-4 rounded-2xl border border-gray-800">
              <span className="text-[11px] font-bold text-gray-400 uppercase block mb-1">📊 SEO Audits Run</span>
              <span className="text-2xl font-black text-blue-400">{activeClient.audits.length}</span>
              <span className="text-[10.5px] text-gray-500 block mt-1">Website diagnostics</span>
            </div>

            <div className="bg-[#0b1220] p-4 rounded-2xl border border-gray-800">
              <span className="text-[11px] font-bold text-gray-400 uppercase block mb-1">💳 Payments / Checkout</span>
              <span className="text-2xl font-black text-purple-400">{activeClient.payments.length}</span>
              <span className="text-[10.5px] text-gray-500 block mt-1">Invoices &amp; Retainers</span>
            </div>
          </div>

          {/* 3. INQUIRIES & BRIEFS SECTION */}
          <div className="bg-[#0b1220] rounded-2xl border border-gray-800 p-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span>📨</span>
                <span>Submitted Inquiries &amp; Project Briefs ({activeClient.inquiries.length})</span>
              </span>
            </h3>

            {activeClient.inquiries.length === 0 ? (
              <p className="text-xs text-gray-500 italic">No direct contact form submissions recorded for this client.</p>
            ) : (
              <div className="space-y-3">
                {activeClient.inquiries.map((inq) => (
                  <div key={inq.id} className="p-4 rounded-xl bg-gray-900/70 border border-gray-800 text-xs">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-extrabold text-[10px] uppercase">
                          {inq.service || "General Inquiry"}
                        </span>
                        {inq.budget && (
                          <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold text-[10px]">
                            💰 {inq.budget}
                          </span>
                        )}
                        <span className="text-gray-400 font-mono text-[10.5px]">Source: {inq.sourceUrl || "/"}</span>
                      </div>
                      <span className="text-gray-500 font-mono text-[11px]">{formatDate(inq.createdAt)}</span>
                    </div>

                    <p className="text-gray-200 leading-relaxed font-sans mt-2 bg-gray-950/60 p-3 rounded-lg border border-gray-800/80">
                      &quot;{inq.message || "No custom message provided"}&quot;
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 4. TOUCHPOINT INTERACTIONS SECTION */}
          <div className="bg-[#0b1220] rounded-2xl border border-gray-800 p-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <span>💬</span>
              <span>WhatsApp, Phone &amp; Touchpoint Clicks ({activeClient.interactions.length})</span>
            </h3>

            {activeClient.interactions.length === 0 ? (
              <p className="text-xs text-gray-500 italic">No interaction clicks logged yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activeClient.interactions.map((int) => (
                  <div key={int.id} className="p-3.5 rounded-xl bg-gray-900/60 border border-gray-800 text-xs flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            int.action === "whatsapp" ? "bg-emerald-400" : int.action === "phone" ? "bg-blue-400" : "bg-amber-400"
                          }`}
                        />
                        <span className="font-bold text-white">{int.title || int.action}</span>
                      </div>
                      <div className="text-[11px] text-gray-400 font-mono">
                        {int.details || int.clientIdentifier || int.sourcePage || "Direct website touch"}
                      </div>
                    </div>
                    <span className="text-[11px] text-gray-500 font-mono whitespace-nowrap">{formatDate(int.createdAt)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 5. SEO AUDITS BY THIS CLIENT */}
          {activeClient.audits.length > 0 && (
            <div className="bg-[#0b1220] rounded-2xl border border-gray-800 p-6">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <span>📊</span>
                <span>SEO Website Audits Executed ({activeClient.audits.length})</span>
              </h3>
              <div className="space-y-3">
                {activeClient.audits.map((aud) => (
                  <div key={aud.id} className="p-3.5 rounded-xl bg-gray-900/60 border border-gray-800 text-xs flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <a
                        href={aud.url || `https://${aud.domain}`}
                        target="_blank"
                        rel="noreferrer"
                        className="font-bold text-blue-400 hover:underline text-sm block"
                      >
                        {aud.domain || aud.url}
                      </a>
                      <div className="flex items-center gap-3 mt-1.5 text-[11px] text-gray-300">
                        <span>SEO Score: <strong className="text-amber-400">{aud.scores?.seo || "N/A"}/100</strong></span>
                        <span>Speed: <strong className="text-emerald-400">{aud.scores?.speed || "N/A"}/100</strong></span>
                        <span>Rank: <strong className="text-white">{aud.scores?.rankingPosition || "Page 1"}</strong></span>
                      </div>
                    </div>
                    <span className="text-gray-500 font-mono text-[11px]">{formatDate(aud.createdAt)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. INTERNAL CLIENT NOTES & TIMELINE */}
          <div className="bg-[#0b1220] rounded-2xl border border-gray-800 p-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
              <span>📝</span>
              <span>Internal Client Follow-up Notes &amp; Status</span>
            </h3>
            <p className="text-xs text-gray-400 mb-4">
              Private agency notes about this client. Stored permanently in your Supabase database.
            </p>

            {/* Note Input */}
            <div className="flex flex-col sm:flex-row gap-2 mb-4">
              <input
                type="text"
                placeholder="Add client follow-up note (e.g. Call scheduled for tomorrow 3 PM, agreed to start retainer...)"
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddClientNote()}
                className="flex-1 px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-xs text-white focus:border-amber-400 outline-none"
              />
              <button
                onClick={handleAddClientNote}
                disabled={savingNote || !newNoteText.trim()}
                className="bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-extrabold px-5 py-2.5 rounded-xl text-xs transition-all cursor-pointer whitespace-nowrap"
              >
                {savingNote ? "Saving..." : "Add Client Note +"}
              </button>
            </div>

            {/* Existing Notes List */}
            {activeClient.notes.length > 0 ? (
              <div className="space-y-2">
                {activeClient.notes.map((n, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-amber-950/20 border border-amber-900/40 text-xs text-amber-200/90 flex items-start gap-2">
                    <span className="text-amber-400 font-bold mt-0.5">•</span>
                    <span className="flex-1">{n}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-500 italic">No notes logged yet for this client.</p>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-[#0b1220] rounded-3xl border border-gray-800 p-12 text-center text-xs">
          <div className="text-4xl mb-3">🔍</div>
          <h4 className="text-base font-bold text-white mb-1">No Client Selected</h4>
          <p className="text-gray-400 max-w-sm mx-auto">
            Use the search box above to search for any client by email, phone, or name, or click on any client from the directory above.
          </p>
        </div>
      )}
    </div>
  );
}
