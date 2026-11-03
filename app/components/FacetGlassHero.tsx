"use client";

import React, { useEffect, useRef } from "react";
import { ArrowDown, Sparkles } from "lucide-react";

export default function FacetGlassHero() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === "FACET_OPEN_STUDIO") {
        const el = document.getElementById("marketplace");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <section className="relative w-full h-[760px] sm:h-[820px] lg:h-[880px] bg-[#050507] overflow-hidden select-none">
      {/* 3D WebGL Iframe Embedding Standalone Facet Engine */}
      <iframe
        ref={iframeRef}
        src="/facet.html"
        title="Facet Designed in glass WebGL Hero"
        className="absolute inset-0 w-full h-full border-0 z-10"
        allow="accelerometer; autoplay; encrypted-media; gyroscope"
      />

      {/* Floating Badge Header Overlay */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[11px] font-medium text-slate-300 shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Interactive 3D Smoked Glass Studio &bull; Move mouse to tilt</span>
        </div>
      </div>

      {/* Bottom Hint to Scroll to Guest Post Database */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        <a
          href="#marketplace"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 hover:bg-black/80 border border-white/15 backdrop-blur-md text-xs font-medium text-slate-200 hover:text-white transition-all shadow-xl hover:scale-105"
        >
          <span>Explore 850+ Verified Guest Post Publications</span>
          <ArrowDown className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
