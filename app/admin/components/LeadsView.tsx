"use client";

import React, { useState, useMemo } from "react";
import {
  Users,
  Search,
  Filter,
  Download,
  Plus,
  Phone,
  Mail,
  ExternalLink,
  MessageSquare,
  Globe,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  DollarSign,
  ChevronRight,
  MapPin,
  Sparkles,
} from "lucide-react";
import { LeadItem } from "../types";

interface LeadsViewProps {
  leads: LeadItem[];
  onOpenAddLeadModal: () => void;
  onOpenCreateInvoiceWithLead: (lead: LeadItem) => void;
  onUpdateLeadStatus: (leadId: string, newStatus: LeadItem["status"]) => void;
  onExportExcel: () => void;
}

export default function LeadsView({
  leads,
  onOpenAddLeadModal,
  onOpenCreateInvoiceWithLead,
  onUpdateLeadStatus,
  onExportExcel,
}: LeadsViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | LeadItem["status"]>("all");
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone.includes(searchTerm) ||
        lead.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (lead.website && lead.website.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [leads, searchTerm, statusFilter]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Inbound Leads & Client Inquiries
            </h1>
            <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
              {leads.length} Registered
            </span>
          </div>
          <p className="text-[13px] text-slate-500 dark:text-slate-400 mt-1">
            All contact submissions, consultation bookings, and quote inquiries across your website.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onExportExcel}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 font-bold text-[12px] hover:bg-emerald-100 transition-all active:scale-95"
          >
            <Download className="w-4 h-4 text-emerald-600" />
            <span>Export Excel (.xlsx)</span>
          </button>

          <button
            onClick={onOpenAddLeadModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#4f46e5] text-white font-bold text-[13px] hover:bg-indigo-700 transition-all shadow-[0_10px_15px_-3px_rgba(79,70,229,0.35)] active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Lead</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-3xl bg-white dark:bg-[#111827] border border-[#f1f5f9] dark:border-slate-800/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search name, email, phone, country..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-[13px] text-slate-900 dark:text-white placeholder-slate-400 border border-transparent focus:border-indigo-500 focus:outline-none"
          />
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {[
            { id: "all", label: "All", count: leads.length },
            { id: "new", label: "New", count: leads.filter((l) => l.status === "new").length },
            { id: "contacted", label: "Contacted", count: leads.filter((l) => l.status === "contacted").length },
            { id: "converted", label: "Converted", count: leads.filter((l) => l.status === "converted").length },
            { id: "closed", label: "Closed", count: leads.filter((l) => l.status === "closed").length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-[12px] font-bold whitespace-nowrap transition-all ${
                statusFilter === tab.id
                  ? "bg-[#4f46e5] text-white shadow-sm"
                  : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table / Cards */}
      <div className="bg-white dark:bg-[#111827] rounded-[36px] border border-[#f1f5f9] dark:border-slate-800/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-slate-50/70 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 text-[10px] uppercase font-extrabold tracking-wider text-slate-400">
              <tr>
                <th className="py-4 px-6">Client / Prospect</th>
                <th className="py-4 px-6">Requested Service</th>
                <th className="py-4 px-6">Budget & Timeline</th>
                <th className="py-4 px-6">Country & Source</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Quick Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredLeads.map((lead) => (
                <tr
                  key={lead.id}
                  className="hover:bg-slate-50/70 dark:hover:bg-slate-800/30 transition-colors cursor-pointer group"
                  onClick={() => setSelectedLead(lead)}
                >
                  {/* Client Info */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-extrabold flex items-center justify-center shrink-0 text-sm">
                        {lead.countryFlag}
                      </div>
                      <div className="min-w-0">
                        <div className="font-extrabold text-slate-900 dark:text-white truncate flex items-center gap-2">
                          <span>{lead.name}</span>
                          {lead.status === "new" && (
                            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                          <span>{lead.email}</span>
                          <span>•</span>
                          <span>{lead.phone}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Service */}
                  <td className="py-4 px-6">
                    <span className="inline-block px-2.5 py-1 rounded-xl text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                      {lead.service}
                    </span>
                    {lead.website && (
                      <a
                        href={lead.website.startsWith("http") ? lead.website : `https://${lead.website}`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-[11px] text-indigo-500 hover:underline flex items-center gap-1 mt-1 font-medium"
                      >
                        <Globe className="w-3 h-3" />
                        <span className="truncate max-w-[160px]">{lead.website.replace("https://", "")}</span>
                      </a>
                    )}
                  </td>

                  {/* Budget & Timeline */}
                  <td className="py-4 px-6">
                    <div className="font-extrabold text-slate-900 dark:text-white">
                      {lead.budget || "Custom Quote"}
                    </div>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      Timeline: {lead.timeline || "Normal"}
                    </span>
                  </td>

                  {/* Location & Source */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-bold text-[12px]">
                      <span>{lead.countryFlag}</span>
                      <span>{lead.country}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      Source: {lead.sourceUrl || "Landing Page"}
                    </span>
                  </td>

                  {/* Status Dropdown */}
                  <td className="py-4 px-6" onClick={(e) => e.stopPropagation()}>
                    <select
                      value={lead.status}
                      onChange={(e) => onUpdateLeadStatus(lead.id, e.target.value as any)}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-extrabold border focus:outline-none transition-colors cursor-pointer ${
                        lead.status === "new"
                          ? "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800"
                          : lead.status === "contacted"
                          ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800"
                          : lead.status === "converted"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800"
                          : "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400"
                      }`}
                    >
                      <option value="new">New Lead</option>
                      <option value="contacted">Contacted</option>
                      <option value="converted">Converted (Client)</option>
                      <option value="closed">Archived / Closed</option>
                    </select>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-2">
                      {/* WhatsApp Call / Chat */}
                      <a
                        href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                          `Hello ${lead.name}, thank you for contacting Balaji Prime Media regarding "${lead.service}". Would you like to schedule a quick 10-minute sync?`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        title="Chat on WhatsApp"
                        className="p-2 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-400 transition-colors"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </a>

                      {/* Mail */}
                      <a
                        href={`mailto:${lead.email}?subject=${encodeURIComponent(
                          `Proposal from Balaji Prime Media - ${lead.service}`
                        )}`}
                        title="Send Email"
                        className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                      </a>

                      {/* Generate Invoice with client info */}
                      <button
                        onClick={() => onOpenCreateInvoiceWithLead(lead)}
                        title="Create Invoice for this client"
                        className="p-2 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:text-indigo-400 transition-colors"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Client Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#111827] w-full max-w-xl rounded-[36px] border border-slate-100 dark:border-slate-800 shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-2xl flex items-center justify-center">
                  {selectedLead.countryFlag}
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                    {selectedLead.name}
                  </h3>
                  <span className="text-xs text-slate-400">
                    ID: {selectedLead.id} • Submitted on{" "}
                    {new Date(selectedLead.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 my-6 text-[13px]">
              <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Email</span>
                  <a href={`mailto:${selectedLead.email}`} className="font-bold text-indigo-600 hover:underline">
                    {selectedLead.email}
                  </a>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Phone</span>
                  <a href={`tel:${selectedLead.phone}`} className="font-bold text-slate-900 dark:text-white">
                    {selectedLead.phone}
                  </a>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Service</span>
                  <span className="font-bold text-slate-900 dark:text-white">{selectedLead.service}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Estimated Budget</span>
                  <span className="font-bold text-emerald-600">{selectedLead.budget || "Custom Scope"}</span>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase text-slate-400 block mb-1">
                  Client Project Scope & Message:
                </span>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  {selectedLead.message}
                </div>
              </div>

              {selectedLead.notes && (
                <div>
                  <span className="text-[11px] font-bold uppercase text-indigo-500 block mb-1">
                    Internal Admin Notes:
                  </span>
                  <div className="p-3 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 text-indigo-900 dark:text-indigo-200 text-xs">
                    {selectedLead.notes}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 rounded-xl text-slate-500 font-bold text-xs"
              >
                Close
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    onOpenCreateInvoiceWithLead(selectedLead);
                    setSelectedLead(null);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#4f46e5] text-white font-bold text-xs flex items-center gap-2 hover:bg-indigo-700"
                >
                  <FileText className="w-4 h-4" />
                  <span>Invoice this Client</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
