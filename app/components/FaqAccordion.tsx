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

export default function FaqAccordion({ items, accentColor = "#38bdf8", className = "" }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className={`space-y-3 sm:space-y-4 ${className}`}>
      {items.map((item, idx) => {
        const question = item.q || item.question || "";
        const answer = item.a || item.answer || "";
        const isOpen = openIndex === idx;

        return (
          <div
            key={idx}
            className="border border-white/10 rounded-[4px] bg-white/[0.02] overflow-hidden transition-all hover:border-[#38bdf8]/30"
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              className="w-full text-left p-4 sm:p-6 font-bebas text-base sm:text-lg lg:text-xl tracking-[0.08em] sm:tracking-[0.12em] text-white flex items-center justify-between gap-3 sm:gap-4 cursor-pointer hover:text-[#38bdf8] transition-colors"
              aria-expanded={isOpen}
            >
              <span
                className={`pr-2 transition-colors ${
                  isOpen ? "text-[#38bdf8]" : "text-white"
                }`}
              >
                {question}
              </span>

              {/* + / − Indicator matching Homepage FAQ */}
              <span className="text-lg sm:text-xl text-[#38bdf8] shrink-0 font-mono font-bold">
                {isOpen ? "−" : "+"}
              </span>
            </button>

            {/* Answer Drawer */}
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-4 pb-4 sm:px-6 sm:pb-6 text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed border-t border-white/5 pt-3 sm:pt-4 font-satoshi">
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
