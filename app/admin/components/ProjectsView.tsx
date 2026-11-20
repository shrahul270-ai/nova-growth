"use client";

import React, { useState } from "react";
import {
  Briefcase,
  Search,
  Plus,
  Clock,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  FileText,
} from "lucide-react";
import { ProjectItem } from "../types";

interface ProjectsViewProps {
  projects: ProjectItem[];
  onOpenCreateProjectModal: () => void;
}

export default function ProjectsView({
  projects,
  onOpenCreateProjectModal,
}: ProjectsViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Client Projects & Active Sprints
            </h1>
            <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
              {projects.length} Tracked Sprints
            </span>
          </div>
          <p className="text-[13px] text-slate-500 dark:text-slate-400 mt-1">
            Real-time delivery milestones, project scopes, client domains, and sprint completion statuses.
          </p>
        </div>

        <button
          onClick={onOpenCreateProjectModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#4f46e5] text-white font-bold text-[13px] hover:bg-indigo-700 transition-all shadow-[0_10px_15px_-3px_rgba(79,70,229,0.35)] active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>+ New Sprint</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-3xl bg-white dark:bg-[#111827] border border-[#f1f5f9] dark:border-slate-800/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search project, client, domain..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-[13px] text-slate-900 dark:text-white placeholder-slate-400 border border-transparent focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
          {["all", "Active", "In Review", "Planning", "Completed"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-[12px] font-bold transition-all ${
                statusFilter === st
                  ? "bg-[#4f46e5] text-white"
                  : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
              }`}
            >
              {st === "all" ? "All Sprints" : st}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((prj) => (
          <div
            key={prj.id}
            className="bg-white dark:bg-[#111827] rounded-[36px] border border-[#f1f5f9] dark:border-slate-800/80 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              {/* Category and Status Badge */}
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  {prj.category}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                    prj.status === "Active"
                      ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400"
                      : prj.status === "In Review"
                      ? "bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400"
                      : prj.status === "Completed"
                      ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400"
                      : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                  }`}
                >
                  {prj.status}
                </span>
              </div>

              {/* Title & Client */}
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white mt-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {prj.name}
              </h3>
              <p className="text-[12px] text-slate-400 mt-0.5">
                Client: <strong className="text-slate-700 dark:text-slate-300">{prj.clientName}</strong>
              </p>

              {/* Domain */}
              {prj.domain && (
                <a
                  href={`https://${prj.domain.replace("https://", "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 text-[11px] font-bold text-indigo-500 hover:underline flex items-center gap-1"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>{prj.domain}</span>
                </a>
              )}

              {/* Progress Bar */}
              <div className="my-4">
                <div className="flex justify-between text-[11px] font-bold mb-1.5">
                  <span className="text-slate-400">Sprint Progress</span>
                  <span className="text-indigo-600 dark:text-indigo-400">{prj.progress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    style={{ width: `${prj.progress}%` }}
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all duration-500"
                  />
                </div>
              </div>

              {/* Budget & Timeline info */}
              <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 text-[12px]">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Scope Budget</span>
                  <span className="font-black text-slate-900 dark:text-white">{prj.budget}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Timeline</span>
                  <span className="font-bold text-amber-600 dark:text-amber-400">{prj.timeline}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Created: {prj.createdAt}</span>
              <span className="font-extrabold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer">
                Scope Breakdown →
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
