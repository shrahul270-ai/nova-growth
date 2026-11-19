"use client";

import React, { useState, useEffect } from "react";

interface LiveDateWidgetProps {
  isDark?: boolean;
}

export default function LiveDateWidget({ isDark = true }: LiveDateWidgetProps) {
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    setMounted(true);
    // Real-time interval that ticks every second.
    // When midnight passes (23:59:59 -> 00:00:00), getDate() automatically flips
    // e.g. from 12 to 13 without needing any page reload.
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="h-10 w-44 rounded-xl bg-white/5 animate-pulse" />
    );
  }

  const dayNumber = currentTime.getDate(); // e.g. 12, tomorrow 13
  const dayName = currentTime.toLocaleDateString("en-US", { weekday: "short" }); // e.g. "Thu"
  const fullDayName = currentTime.toLocaleDateString("en-US", { weekday: "long" }); // e.g. "Thursday"
  const monthName = currentTime.toLocaleDateString("en-US", { month: "short" }); // e.g. "Nov"
  const year = currentTime.getFullYear();
  const timeString = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return (
    <div
      className={`flex items-center gap-2.5 px-3 py-1.5 rounded-2xl border transition-all shadow-md select-none ${
        isDark
          ? "bg-[#12162a]/90 border-[#272f4e] text-white hover:border-purple-500/50 shadow-purple-950/40"
          : "bg-white border-slate-200 text-slate-800 shadow-slate-100 hover:border-purple-300"
      }`}
      title={`Live Date Auto-Sync Active: Automatically rolls over from day ${dayNumber} to ${dayNumber + 1} at midnight!`}
    >
      {/* Dynamic Date Box (Highlighted Day Number) */}
      <div className="flex flex-col items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-[#6366f1] via-[#7c3aed] to-[#a855f7] text-white font-black shadow-md shadow-purple-950/50">
        <span className="text-[9px] uppercase tracking-wider font-semibold opacity-90 leading-none">
          {monthName}
        </span>
        <span className="text-base font-black leading-tight mt-0.5">
          {dayNumber}
        </span>
      </div>

      {/* Date & Live Ticking Clock Details */}
      <div className="flex flex-col text-left leading-tight min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold tracking-tight truncate">
            {dayName}, {dayNumber} {monthName} {year}
          </span>
          <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full text-[9px] font-extrabold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            Live
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-mono mt-0.5">
          <span className="text-purple-300 font-semibold">{timeString}</span>
          <span>•</span>
          <span className="text-emerald-400 text-[9px]">Midnight 12➔13 Auto</span>
        </div>
      </div>
    </div>
  );
}
