"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

export interface FaqItemType {
  q?: string;
  a?: string;
  question?: string;
  answer?: string;
}

interface FaqAccordionProps {
  items: FaqItemType[];
  accentColor?: string;
  className?: string;
}

export default function FaqAccordion({ items, accentColor = "#c084fc", className = "" }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className={`space-y-3.5 ${className}`}>
      {items.map((item, idx) => {
        const question = item.q || item.question || "";
        const answer = item.a || item.answer || "";
        const isOpen = openIndex === idx;

        return (
          <div
            key={idx}
            className={`rounded-2xl transition-all duration-300 border overflow-hidden backdrop-blur-xl ${
              isOpen
                ? "bg-[#120a2e]/90 border-purple-500/40 shadow-[0_8px_30px_rgba(168,85,247,0.15)]"
                : "bg-white/[0.03] border-white/10 hover:border-white/25 hover:bg-white/[0.05]"
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer select-none transition-colors"
              aria-expanded={isOpen}
            >
              <span
                className={`text-sm sm:text-base font-semibold leading-snug transition-colors ${
                  isOpen ? "text-white" : "text-slate-200"
                }`}
              >
                {question}
              </span>

              {/* + / - Icon with 360/90deg smooth rotate transition */}
              <span
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                  isOpen
                    ? "bg-[#A068FF] text-white border-[#c084fc] rotate-180 shadow-[0_0_15px_rgba(160,104,255,0.4)]"
                    : "bg-white/5 text-slate-300 border-white/15 hover:border-purple-400/50 hover:text-white"
                }`}
                aria-hidden="true"
              >
                {isOpen ? (
                  <Minus className="w-4 h-4 stroke-[2.5]" />
                ) : (
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                )}
              </span>
            </button>

            {/* Answer Drawer */}
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-300 font-[300] leading-relaxed border-t border-white/10">
                  {answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
