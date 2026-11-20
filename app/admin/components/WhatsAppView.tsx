"use client";

import React, { useState } from "react";
import {
  MessageSquare,
  Phone,
  Copy,
  Check,
  ExternalLink,
  Plus,
  Send,
  Sparkles,
} from "lucide-react";
import { WhatsAppItem } from "../types";

interface WhatsAppViewProps {
  conversations: WhatsAppItem[];
  onOpenAddWhatsAppModal: () => void;
}

export default function WhatsAppView({
  conversations,
  onOpenAddWhatsAppModal,
}: WhatsAppViewProps) {
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null);

  const templates = [
    {
      id: "quote",
      title: "Standard Service Proposal & Quote",
      text: "Hello! Thank you for reaching out to Balaji Prime Media. Here is our detailed service proposal. Would you like to schedule a quick 10-minute call to align on scope and delivery timelines?",
    },
    {
      id: "meeting",
      title: "Discovery Call Invitation",
      text: "Hello! We would be delighted to host a quick video session via Google Meet to review your project architecture and plan the sprint deliverables. Are you available tomorrow at 11:00 AM or 3:00 PM?",
    },
    {
      id: "bank",
      title: "Payment & Onboarding (50% Milestone)",
      text: "Here are the payment details to initiate your project: We accept bank wire, Stripe, and UPI (ID: balajiprimemedia@icici). Upon receipt, your dedicated Notion workspace & Slack channel will be activated.",
    },
  ];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTemplate(id);
    setTimeout(() => setCopiedTemplate(null), 2500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              WhatsApp Messaging Hub
            </h1>
            <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              {conversations.length} Active Conversations
            </span>
          </div>
          <p className="text-[13px] text-slate-500 dark:text-slate-400 mt-1">
            Manage direct WhatsApp client inquiries initiated from your website&apos;s floating chat widget.
          </p>
        </div>

        <button
          onClick={onOpenAddWhatsAppModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-600 text-white font-bold text-[13px] hover:bg-emerald-700 transition-all shadow-md active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add Manual Chat</span>
        </button>
      </div>

      {/* Quick Response Templates Row */}
      <div className="p-6 rounded-[36px] bg-white dark:bg-[#111827] border border-[#f1f5f9] dark:border-slate-800/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
              Quick WhatsApp Response Templates
            </h3>
          </div>
          <span className="text-[11px] text-slate-400">1-click to copy</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {templates.map((tpl) => (
            <div
              key={tpl.id}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-extrabold text-slate-900 dark:text-white block mb-1">
                  {tpl.title}
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {tpl.text}
                </p>
              </div>

              <button
                onClick={() => handleCopy(tpl.text, tpl.id)}
                className="mt-3 py-1.5 px-3 rounded-xl bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-600 font-bold text-[11px] hover:bg-slate-100 flex items-center justify-center gap-1.5 transition-colors"
              >
                {copiedTemplate === tpl.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Copied to clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copy Template</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Conversations List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {conversations.map((conv) => (
          <div
            key={conv.id}
            className="p-6 rounded-[36px] bg-white dark:bg-[#111827] border border-[#f1f5f9] dark:border-slate-800/80 shadow-sm flex flex-col justify-between group hover:shadow-lg transition-all"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center text-xl">
                    {conv.flag}
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                      {conv.clientName}
                    </h4>
                    <span className="text-[11px] text-slate-400">
                      {conv.phoneNumber} • {conv.country}
                    </span>
                  </div>
                </div>

                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    conv.status === "Converted"
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                      : "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300"
                  }`}
                >
                  {conv.status}
                </span>
              </div>

              <div className="my-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 text-[12px] text-slate-700 dark:text-slate-300 italic border border-slate-100 dark:border-slate-800 leading-relaxed">
                &ldquo;{conv.message}&rdquo;
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">
                {conv.date} • {conv.time}
              </span>

              <a
                href={`https://wa.me/${conv.phoneNumber.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm active:scale-95"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Open WhatsApp Web</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}