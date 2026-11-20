"use client";

import React, { useState, useMemo } from "react";
import {
  Globe2,
  Search,
  Filter,
  ExternalLink,
  Copy,
  Check,
  TrendingUp,
  Star,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { PublisherSiteItem } from "../types";

interface PublishersViewProps {
  publishers: PublisherSiteItem[];
}

export default function PublishersView({ publishers }: PublishersViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNiche, setSelectedNiche] = useState<string>("all");
  const [minDr, setMinDr] = useState<number>(0);
  const [copiedDomain, setCopiedDomain] = useState<string | null>(null);

  const niches = [
    { id: "all", label: "All Niches" },
    { id: "tech", label: "Technology & Software" },
    { id: "business", label: "Business & Finance" },
    { id: "marketing", label: "Marketing & SaaS" },
  ];

  const filteredPublishers = useMemo(() => {
    return publishers.filter((pub) => {
      const matchesSearch =
        pub.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.niche.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.country.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDr = pub.dr >= minDr;
      const matchesNiche =
        selectedNiche === "all" ||
        pub.niche.toLowerCase().includes(selectedNiche.toLowerCase());

      return matchesSearch && matchesDr && matchesNiche;
    });
  }, [publishers, searchTerm, selectedNiche, minDr]);

  const handleCopy = (domain: string) => {
    navigator.clipboard.writeText(domain);
    setCopiedDomain(domain);
    setTimeout(() => setCopiedDomain(null), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Publishers Database & Backlink Inventory
            </h1>
            <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
              40,850 Verified Domains
            </span>
          </div>
          <p className="text-[13px] text-slate-500 dark:text-slate-400 mt-1">
            Browse DR, DA, Ahrefs Organic Traffic, and official editorial placement rates across our verified media inventory.
          </p>
        </div>

        {/* Quick Metrics */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 shadow-sm">
            Average DR: <span className="text-indigo-600 font-extrabold">89.4</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 shadow-sm">
            100% DoFollow
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="p-4 rounded-3xl bg-white dark:bg-[#111827] border border-[#f1f5f9] dark:border-slate-800/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search domain (e.g. forbes.com)..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-[13px] text-slate-900 dark:text-white placeholder-slate-400 border border-transparent focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* DR Minimum Filter */}
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <span>Minimum DR:</span>
            <div className="flex gap-1">
              {[0, 85, 90].map((val) => (
                <button
                  key={val}
                  onClick={() => setMinDr(val)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    minDr === val
                      ? "bg-[#4f46e5] text-white"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  {val === 0 ? "All" : `${val}+`}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Publishers Table */}
      <div className="bg-white dark:bg-[#111827] rounded-[36px] border border-[#f1f5f9] dark:border-slate-800/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-slate-50/70 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 text-[10px] uppercase font-extrabold tracking-wider text-slate-400">
              <tr>
                <th className="py-4 px-6">Publisher Domain</th>
                <th className="py-4 px-6">Niche / Category</th>
                <th className="py-4 px-6 text-center">DR / DA</th>
                <th className="py-4 px-6">Ahrefs Traffic</th>
                <th className="py-4 px-6">Placement Rate</th>
                <th className="py-4 px-6">Link Type & TAT</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredPublishers.map((pub) => (
                <tr
                  key={pub.id}
                  className="hover:bg-slate-50/70 dark:hover:bg-slate-800/30 transition-colors group"
                >
                  {/* Domain */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 flex items-center justify-center font-black text-xs text-indigo-600 dark:text-indigo-400">
                        {pub.domain.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                          <span>{pub.domain}</span>
                          <span className="text-xs">{pub.countryFlag}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 block">
                          Language: {pub.language}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Niche */}
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 rounded-xl text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {pub.niche}
                    </span>
                  </td>

                  {/* DR / DA Badges */}
                  <td className="py-4 px-6 text-center">
                    <div className="inline-flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-lg text-xs font-black bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800">
                        DR {pub.dr}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-lg text-xs font-black bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800">
                        DA {pub.da}
                      </span>
                    </div>
                  </td>

                  {/* Traffic */}
                  <td className="py-4 px-6">
                    <div className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{pub.ahrefsTraffic}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">Monthly Ahrefs Visitors</span>
                  </td>

                  {/* Pricing Dual */}
                  <td className="py-4 px-6">
                    <div className="font-black text-slate-900 dark:text-white">
                      ${pub.priceUSD} USD
                    </div>
                    <span className="text-[11px] font-bold text-emerald-600 block mt-0.5">
                      ₹{pub.priceINR.toLocaleString()} INR
                    </span>
                  </td>

                  {/* Link type & TAT */}
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                      <CheckCircle2 className="w-3 h-3" />
                      {pub.linkType}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      TAT: {pub.tatDays} days
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleCopy(pub.domain)}
                        title="Copy domain name"
                        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 transition-colors"
                      >
                        {copiedDomain === pub.domain ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>

                      {pub.sampleUrl && (
                        <a
                          href={pub.sampleUrl}
                          target="_blank"
                          rel="noreferrer"
                          title="View live sample article"
                          className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 text-indigo-600 dark:text-indigo-400 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
