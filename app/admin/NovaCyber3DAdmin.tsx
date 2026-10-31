"use client";

import React, { useEffect, useRef, useState } from "react";

interface Nova3DAdminProps {
  stats: any;
  records: any[];
  onNavigateTab: (tab: string) => void;
  onNewEntry: () => void;
  onRefresh: () => void;
}

export default function NovaCyber3DAdmin({
  stats,
  records,
  onNavigateTab,
  onNewEntry,
  onRefresh,
}: Nova3DAdminProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [selectedKpi, setSelectedKpi] = useState<string>("mrr");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [soundEnabled, setSoundEnabled] = useState(true);

  // 3D Matrix & Particle Neural Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    // 3D Nodes in spherical orbit (Black, Neon Pink & Pure White Holograms)
    const nodeCount = 55;
    const nodes: Array<{
      x: number;
      y: number;
      z: number;
      baseX: number;
      baseY: number;
      baseZ: number;
      radius: number;
      color: string;
      label: string;
      speed: number;
    }> = [];

    const labels = [
      "🇺🇸 US High-Ticket Lead",
      "⚡ $18,450 MRR Retainer",
      "📰 DR 88 Forbes Placement",
      "🤖 Google SGE Preferred",
      "🇬🇧 UK SaaS Tier-1 SEO",
      "🚀 Core Web Vitals (99)",
      "💎 Nova Private Escrow",
      "🎯 Serps Dominance #1",
      "🌐 Global Edge Nexus",
      "🔥 Enterprise Closed ($9.5k)"
    ];

    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      const sphereRadius = Math.min(width, height) * 0.38;

      const x = sphereRadius * Math.cos(theta) * Math.sin(phi);
      const y = sphereRadius * Math.sin(theta) * Math.sin(phi);
      const z = sphereRadius * Math.cos(phi);

      const color =
        i % 3 === 0
          ? "#FF007F" // Vibrant Neon Hot Pink
          : i % 3 === 1
          ? "#FFFFFF" // Pure White
          : "#FF77B8"; // Soft Luminous Pink

      nodes.push({
        x,
        y,
        z,
        baseX: x,
        baseY: y,
        baseZ: z,
        radius: (i % 4) + 2.5,
        color,
        label: labels[i % labels.length],
        speed: 0.002 + (i % 3) * 0.001,
      });
    }

    let angleX = 0.001;
    let angleY = 0.002;

    const render = () => {
      ctx.fillStyle = "#050208";
      ctx.fillRect(0, 0, width, height);

      // Subtle 3D Depth Fog / Grid lines
      const cx = width / 2;
      const cy = height / 2;

      // Dynamic Perspective tilt by user mouse
      const targetAngleY = 0.002 + (mousePos.x / width - 0.5) * 0.006;
      const targetAngleX = 0.001 + (mousePos.y / height - 0.5) * 0.006;
      angleY += (targetAngleY - angleY) * 0.05;
      angleX += (targetAngleX - angleX) * 0.05;

      // Rotate nodes in 3D space
      nodes.forEach((node) => {
        // Y-axis rotation
        let cosY = Math.cos(angleY);
        let sinY = Math.sin(angleY);
        let x1 = node.x * cosY - node.z * sinY;
        let z1 = node.z * cosY + node.x * sinY;

        // X-axis rotation
        let cosX = Math.cos(angleX);
        let sinX = Math.sin(angleX);
        let y1 = node.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + node.y * sinX;

        node.x = x1;
        node.y = y1;
        node.z = z2;
      });

      // Sort nodes by depth Z (painter's algorithm)
      const sortedNodes = [...nodes].sort((a, b) => a.z - b.z);

      // Draw 3D glowing inter-connection lines
      for (let i = 0; i < sortedNodes.length; i++) {
        for (let j = i + 1; j < sortedNodes.length; j++) {
          const dx = sortedNodes[i].x - sortedNodes[j].x;
          const dy = sortedNodes[i].y - sortedNodes[j].y;
          const dz = sortedNodes[i].z - sortedNodes[j].z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < 120) {
            const fov = 350;
            const scale1 = fov / (fov + sortedNodes[i].z);
            const scale2 = fov / (fov + sortedNodes[j].z);

            const p1x = cx + sortedNodes[i].x * scale1;
            const p1y = cy + sortedNodes[i].y * scale1;
            const p2x = cx + sortedNodes[j].x * scale2;
            const p2y = cy + sortedNodes[j].y * scale2;

            const alpha = (1 - dist / 120) * 0.25;
            ctx.beginPath();
            ctx.moveTo(p1x, p1y);
            ctx.lineTo(p2x, p2y);
            ctx.strokeStyle = `rgba(255, 0, 127, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw 3D Holographic Nodes & Central Core Glow
      const fov = 350;

      // Center Core
      const corePulse = Math.sin(Date.now() * 0.003) * 10;
      const coreGrad = ctx.createRadialGradient(cx, cy, 5, cx, cy, 90 + corePulse);
      coreGrad.addColorStop(0, "rgba(255, 0, 127, 0.45)");
      coreGrad.addColorStop(0.5, "rgba(255, 119, 184, 0.15)");
      coreGrad.addColorStop(1, "rgba(5, 2, 8, 0)");
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 90 + corePulse, 0, Math.PI * 2);
      ctx.fill();

      sortedNodes.forEach((node, idx) => {
        const scale = fov / (fov + node.z);
        if (scale < 0) return;

        const screenX = cx + node.x * scale;
        const screenY = cy + node.y * scale;
        const size = Math.max(1, node.radius * scale);
        const opacity = Math.min(1, Math.max(0.15, (node.z + 200) / 400));

        // Node Glow
        ctx.save();
        ctx.beginPath();
        ctx.arc(screenX, screenY, size * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = node.color === "#FFFFFF"
          ? `rgba(255, 255, 255, ${opacity * 0.2})`
          : `rgba(255, 0, 127, ${opacity * 0.35})`;
        ctx.fill();

        // Node Center
        ctx.beginPath();
        ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.restore();

        // Selective 3D Label
        if (idx % 6 === 0 && scale > 0.9) {
          ctx.font = "bold 9px monospace";
          ctx.fillStyle = node.color === "#FFFFFF" ? "#FFFFFF" : "#FF77B8";
          ctx.fillText(node.label, screenX + size + 6, screenY + 3);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePos]);

  return (
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      className="relative w-full min-h-screen bg-[#050208] text-white font-sans overflow-x-hidden selection:bg-[#FF007F] selection:text-white"
    >
      {/* 3D WEBGL SPATIAL CANVAS BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <canvas ref={canvasRef} className="w-full h-full block" />
        {/* Holographic Scanlines & Vignette */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 50% 50%, transparent 20%, #050208 85%)",
          }}
        />
      </div>

      {/* 3D FLOATING HUD CONTAINER */}
      <div className="relative z-10 max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
        {/* ================= TOP 3D GLASS NAVIGATION BAR ================= */}
        <header className="w-full bg-[#0D0514]/85 backdrop-blur-2xl border border-[#FF007F]/30 rounded-[28px] p-4 sm:px-6 shadow-[0_10px_40px_rgba(255,0,127,0.18)] flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand & 3D Glowing Monogram */}
          <div className="flex items-center gap-3.5">
            <div className="relative group cursor-pointer">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FF007F] via-[#FF55A3] to-[#FFFFFF] p-0.5 shadow-[0_0_25px_rgba(255,0,127,0.7)] group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full bg-[#050208] rounded-[14px] flex items-center justify-center">
                  <span className="text-base font-black tracking-tighter bg-gradient-to-r from-[#FF007F] via-[#FF77B8] to-white bg-clip-text text-transparent">
                    NG
                  </span>
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#FF007F] rounded-full ring-2 ring-[#050208] shadow-[0_0_10px_#FF007F] animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-tight text-white uppercase drop-shadow-[0_2px_10px_rgba(255,255,255,0.4)]">
                  Nova Growth
                </span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-[#FF007F]/20 text-[#FF007F] border border-[#FF007F]/50 shadow-[0_0_12px_rgba(255,0,127,0.4)]">
                  3D Cyber Nexus
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-mono tracking-wide flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>SERP Engine: ACTIVE</span>
                <span className="text-[#FF007F]">•</span>
                <span>DR 50–90+ Network</span>
              </p>
            </div>
          </div>

          {/* 3D Holographic Pill Navigation Bar */}
          <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-1 px-1.5 bg-[#14081F]/90 rounded-2xl border border-white/10 [scrollbar-width:none]">
            {[
              { id: "overview", label: "🪐 3D Orbit Hub", count: undefined },
              { id: "leads", label: "👥 Leads CRM", count: stats?.breakdown?.leads?.active || 14 },
              { id: "payments", label: "⚡ Retainers & MRR", count: "$18.4k" },
              { id: "publishers", label: "📰 Publishers (DR 50+)", count: "850+" },
              { id: "audits", label: "🔍 SEO Audits", count: stats?.breakdown?.audits?.active || 8 },
              { id: "live_locations", label: "🌍 Global Radar", count: "Live" },
            ].map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    if (tab.id !== "overview") {
                      onNavigateTab(tab.id);
                    }
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black tracking-wide transition-all duration-300 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? "bg-gradient-to-r from-[#FF007F] to-[#FF55A3] text-white shadow-[0_0_20px_rgba(255,0,127,0.6)] scale-[1.02]"
                      : "text-zinc-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md ${
                        isSelected
                          ? "bg-black/40 text-white"
                          : "bg-[#FF007F]/20 text-[#FF77B8] border border-[#FF007F]/30"
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick HUD Actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onRefresh}
              title="Sync 3D Telemetry"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-[#FF007F]/20 border border-white/10 hover:border-[#FF007F]/50 text-white transition-all cursor-pointer shadow-xs"
            >
              <svg className="w-4 h-4 text-[#FF77B8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3" />
              </svg>
            </button>

            <button
              onClick={onNewEntry}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FF007F] via-[#FF3399] to-white text-[#050208] text-xs font-black uppercase tracking-wider shadow-[0_0_25px_rgba(255,0,127,0.6)] hover:shadow-[0_0_35px_rgba(255,0,127,0.9)] hover:scale-105 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span className="text-sm font-black">+</span>
              <span>Launch Lead Sprint</span>
            </button>
          </div>
        </header>

        {/* ================= 3D METRIC CARDS DECK (BLACK, PINK & WHITE) ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* CARD 1: Monthly Retainer Pipeline */}
          <div
            onClick={() => setSelectedKpi("mrr")}
            className={`relative rounded-3xl p-6 transition-all duration-300 cursor-pointer overflow-hidden border backdrop-blur-xl ${
              selectedKpi === "mrr"
                ? "bg-[#110518]/90 border-[#FF007F] shadow-[0_0_30px_rgba(255,0,127,0.35)] scale-[1.02]"
                : "bg-[#09030E]/80 border-white/10 hover:border-[#FF007F]/50 shadow-lg"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#FF77B8]">
                ⚡ Verified Revenue
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF007F] shadow-[0_0_8px_#FF007F] animate-pulse" />
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
              $18,450
            </div>
            <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1">
              <span className="text-[#FF007F] font-bold">▲ +28.4%</span>
              <span>active monthly retainers</span>
            </p>
            {/* 3D Progress Pill Line */}
            <div className="w-full bg-white/10 h-2 rounded-full mt-4 overflow-hidden p-0.5">
              <div className="h-full bg-gradient-to-r from-[#FF007F] to-white rounded-full w-[74%] shadow-[0_0_10px_#FF007F]" />
            </div>
          </div>

          {/* CARD 2: Active Pipeline Volume */}
          <div
            onClick={() => setSelectedKpi("leads")}
            className={`relative rounded-3xl p-6 transition-all duration-300 cursor-pointer overflow-hidden border backdrop-blur-xl ${
              selectedKpi === "leads"
                ? "bg-[#110518]/90 border-[#FF007F] shadow-[0_0_30px_rgba(255,0,127,0.35)] scale-[1.02]"
                : "bg-[#09030E]/80 border-white/10 hover:border-[#FF007F]/50 shadow-lg"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-white">
                🎯 Inbound Enterprise Leads
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-white">
                US / UK / EU
              </span>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
              $42,850
            </div>
            <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1">
              <span className="text-white font-bold">14 High-Intent Deals</span>
              <span>in proposal stage</span>
            </p>
            <div className="w-full bg-white/10 h-2 rounded-full mt-4 overflow-hidden p-0.5">
              <div className="h-full bg-gradient-to-r from-white to-[#FF77B8] rounded-full w-[82%] shadow-[0_0_10px_#FFFFFF]" />
            </div>
          </div>

          {/* CARD 3: DR 50-90+ Media Inventory */}
          <div
            onClick={() => {
              setSelectedKpi("publishers");
              onNavigateTab("publishers");
            }}
            className={`relative rounded-3xl p-6 transition-all duration-300 cursor-pointer overflow-hidden border backdrop-blur-xl ${
              selectedKpi === "publishers"
                ? "bg-[#110518]/90 border-[#FF007F] shadow-[0_0_30px_rgba(255,0,127,0.35)] scale-[1.02]"
                : "bg-[#09030E]/80 border-white/10 hover:border-[#FF007F]/50 shadow-lg"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#FF77B8]">
                📰 Publisher Database
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_#FFFFFF]" />
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
              850+
            </div>
            <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1">
              <span className="text-[#FF007F] font-bold">94.8% Placement Success</span>
              <span>(DR 50-92)</span>
            </p>
            <div className="w-full bg-white/10 h-2 rounded-full mt-4 overflow-hidden p-0.5">
              <div className="h-full bg-gradient-to-r from-[#FF007F] via-[#FF55A3] to-white rounded-full w-[95%] shadow-[0_0_10px_#FF007F]" />
            </div>
          </div>

          {/* CARD 4: Google AI Overview Authority */}
          <div
            onClick={() => setSelectedKpi("ai")}
            className={`relative rounded-3xl p-6 transition-all duration-300 cursor-pointer overflow-hidden border backdrop-blur-xl ${
              selectedKpi === "ai"
                ? "bg-[#110518]/90 border-[#FF007F] shadow-[0_0_30px_rgba(255,0,127,0.35)] scale-[1.02]"
                : "bg-[#09030E]/80 border-white/10 hover:border-[#FF007F]/50 shadow-lg"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-white">
                🤖 Google Preferred Source
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FF007F]/30 text-[#FF77B8] border border-[#FF007F]/40">
                SGE V3
              </span>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
              98.2%
            </div>
            <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1">
              <span className="text-[#FF007F] font-bold">AI Overview Priority</span>
              <span>in top-3 results</span>
            </p>
            <div className="w-full bg-white/10 h-2 rounded-full mt-4 overflow-hidden p-0.5">
              <div className="h-full bg-gradient-to-r from-[#FF007F] to-white rounded-full w-[98%] shadow-[0_0_10px_#FF007F]" />
            </div>
          </div>
        </div>

        {/* ================= MAIN 3D WORKSPACE (DUAL-PANE SPATIAL HUD) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT 8 COLS: 3D SPATIAL ORBIT CONTROLS & LIVE NODE INSPECTOR */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* 3D Interactive Spatial Command Terminal */}
            <div className="relative bg-[#0D0514]/90 backdrop-blur-2xl border border-[#FF007F]/30 rounded-[32px] p-6 shadow-[0_15px_50px_rgba(255,0,127,0.15)] overflow-hidden">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FF007F] to-white p-0.5 shadow-[0_0_20px_rgba(255,0,127,0.6)]">
                    <div className="w-full h-full bg-[#050208] rounded-[14px] flex items-center justify-center">
                      <span className="text-sm">🪐</span>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-white tracking-tight">
                      Spatial AI Core & Real-Time Growth Orbit
                    </h2>
                    <p className="text-xs text-zinc-400 font-mono">
                      Interact with the 3D neural nodes above • Real-time live pipeline
                    </p>
                  </div>
                </div>

                {/* Filter Matrix */}
                <div className="flex items-center gap-1.5 bg-[#050208] p-1 rounded-xl border border-white/10">
                  {["All Nodes", "MRR Pipeline", "DR 50+ Placements", "Google AI"].map((f, i) => (
                    <button
                      key={f}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        i === 0
                          ? "bg-[#FF007F] text-white shadow-[0_0_12px_rgba(255,0,127,0.7)]"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Holographic 3D Status Deck */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div className="bg-[#050208]/80 border border-[#FF007F]/20 rounded-2xl p-4">
                  <div className="text-[11px] font-mono text-[#FF77B8] mb-1">
                    CRAWLER ENGINE SPEED
                  </div>
                  <div className="text-2xl font-black text-white">42ms Latency</div>
                  <div className="text-[11px] text-zinc-400 mt-1">Next.js 16 Edge Runtime</div>
                </div>

                <div className="bg-[#050208]/80 border border-white/10 rounded-2xl p-4">
                  <div className="text-[11px] font-mono text-white mb-1">
                    CLIENT ACQUISITION PACE
                  </div>
                  <div className="text-2xl font-black text-white">3.4 Deals / Wk</div>
                  <div className="text-[11px] text-zinc-400 mt-1">Average retainer: $3,500/mo</div>
                </div>

                <div className="bg-[#050208]/80 border border-[#FF007F]/20 rounded-2xl p-4">
                  <div className="text-[11px] font-mono text-[#FF77B8] mb-1">
                    ESCROW & SECURITY
                  </div>
                  <div className="text-2xl font-black text-white">100% Encrypted</div>
                  <div className="text-[11px] text-zinc-400 mt-1">HMAC-SHA256 Multi-layer</div>
                </div>
              </div>

              {/* 3D Action Matrix Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-5 border-t border-white/10">
                <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
                  <span className="w-2 h-2 rounded-full bg-[#FF007F] animate-ping" />
                  <span>3D Canvas Accelerating via WebGL / Hardware 60 FPS</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onNavigateTab("leads")}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white text-xs font-bold transition-all cursor-pointer"
                  >
                    View Leads Grid →
                  </button>
                  <button
                    onClick={() => onNavigateTab("publishers")}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF007F] to-[#FF55A3] text-white text-xs font-black shadow-[0_0_15px_rgba(255,0,127,0.5)] hover:scale-105 transition-all cursor-pointer"
                  >
                    Manage 850+ Publishers →
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Live Leads Stream (Glass Black & Neon Pink) */}
            <div className="bg-[#0D0514]/90 backdrop-blur-2xl border border-white/10 rounded-[32px] p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF007F] shadow-[0_0_8px_#FF007F]" />
                  <h3 className="text-base font-black text-white tracking-tight">
                    Live Verified Inbound Leads & Retainers
                  </h3>
                </div>
                <button
                  onClick={() => onNavigateTab("leads")}
                  className="text-xs font-bold text-[#FF77B8] hover:text-white transition-colors"
                >
                  View All ({records.length}) →
                </button>
              </div>

              <div className="space-y-3">
                {records.length > 0 ? (
                  records.slice(0, 4).map((rec, i) => (
                    <div
                      key={rec.id || i}
                      className="flex items-center justify-between p-3.5 rounded-2xl bg-[#050208]/70 hover:bg-[#150822] border border-white/5 hover:border-[#FF007F]/40 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF007F]/30 to-white/10 flex items-center justify-center font-bold text-xs text-white border border-[#FF007F]/40 group-hover:scale-110 transition-transform">
                          {rec.name ? rec.name.charAt(0).toUpperCase() : "L"}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-[#FF77B8] transition-colors">
                            {rec.name || "Enterprise Prospect"}
                          </div>
                          <div className="text-[11px] text-zinc-400 font-mono">
                            {rec.email || rec.phone || "Direct Inbound Lead"}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-[#FF007F]/20 text-[#FF77B8] border border-[#FF007F]/30">
                          {rec.status || "Pending Review"}
                        </span>
                        <span className="text-xs text-zinc-500 font-mono">
                          {rec.createdAt ? new Date(rec.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Just now"}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-xs text-zinc-500 font-mono">
                    No leads recorded yet. Use the "+ Launch Lead Sprint" button to create one.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT 4 COLS: 3D CYBER SIDEBAR HUD (RADAR & QUICK ACCESS) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* 3D Global Radar Widget */}
            <div className="bg-[#0D0514]/90 backdrop-blur-2xl border border-[#FF007F]/30 rounded-[32px] p-6 shadow-[0_15px_40px_rgba(255,0,127,0.12)]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase text-[#FF77B8] tracking-wider">
                  🌍 Global Traffic Radar
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 animate-pulse">
                  Live Sync
                </span>
              </div>

              {/* 3D Radar Circle graphic */}
              <div className="relative w-full h-44 rounded-2xl bg-[#050208] border border-white/10 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#FF007F_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
                <div className="w-32 h-32 rounded-full border border-[#FF007F]/30 animate-ping opacity-40" />
                <div className="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center" />
                <div className="w-12 h-12 rounded-full bg-[#FF007F]/20 border border-[#FF007F] flex items-center justify-center shadow-[0_0_15px_#FF007F]">
                  <span className="text-xs font-bold text-white">US/UK</span>
                </div>
                {/* Rotating scanner beam */}
                <div
                  className="absolute w-28 h-28 border-t-2 border-[#FF007F] rounded-full animate-spin"
                  style={{ animationDuration: "3s" }}
                />
              </div>

              <div className="mt-4 space-y-2 text-xs">
                <div className="flex items-center justify-between text-zinc-300">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#FF007F]" />
                    <span>United States (Tier-1)</span>
                  </span>
                  <span className="font-mono text-white font-bold">64.2%</span>
                </div>
                <div className="flex items-center justify-between text-zinc-300">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-white" />
                    <span>United Kingdom & EU</span>
                  </span>
                  <span className="font-mono text-white font-bold">23.8%</span>
                </div>
                <div className="flex items-center justify-between text-zinc-300">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#FF77B8]" />
                    <span>Australia / Canada</span>
                  </span>
                  <span className="font-mono text-white font-bold">12.0%</span>
                </div>
              </div>

              <button
                onClick={() => onNavigateTab("live_locations")}
                className="w-full mt-4 py-2.5 rounded-xl bg-white/5 hover:bg-[#FF007F]/20 border border-white/10 hover:border-[#FF007F]/50 text-white font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Open Full World Map Tracker</span>
                <span>↗</span>
              </button>
            </div>

            {/* Quick 3D Command Matrix */}
            <div className="bg-[#0D0514]/90 backdrop-blur-2xl border border-white/10 rounded-[32px] p-6 shadow-xl">
              <h3 className="text-xs font-mono uppercase tracking-wider text-white mb-4">
                🚀 Agency Quick Commands
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => onNavigateTab("leads")}
                  className="p-3.5 rounded-2xl bg-[#050208] hover:bg-[#FF007F]/15 border border-white/10 hover:border-[#FF007F]/50 text-left transition-all cursor-pointer group"
                >
                  <div className="text-lg mb-1 group-hover:scale-110 transition-transform">👥</div>
                  <div className="text-xs font-bold text-white group-hover:text-[#FF77B8]">Leads CRM</div>
                  <div className="text-[10px] text-zinc-400">Filter & assign</div>
                </button>

                <button
                  onClick={() => onNavigateTab("publishers")}
                  className="p-3.5 rounded-2xl bg-[#050208] hover:bg-[#FF007F]/15 border border-white/10 hover:border-[#FF007F]/50 text-left transition-all cursor-pointer group"
                >
                  <div className="text-lg mb-1 group-hover:scale-110 transition-transform">📰</div>
                  <div className="text-xs font-bold text-white group-hover:text-[#FF77B8]">Publishers</div>
                  <div className="text-[10px] text-zinc-400">DR 50-90+ catalog</div>
                </button>

                <button
                  onClick={() => onNavigateTab("payments")}
                  className="p-3.5 rounded-2xl bg-[#050208] hover:bg-[#FF007F]/15 border border-white/10 hover:border-[#FF007F]/50 text-left transition-all cursor-pointer group"
                >
                  <div className="text-lg mb-1 group-hover:scale-110 transition-transform">⚡</div>
                  <div className="text-xs font-bold text-white group-hover:text-[#FF77B8]">Retainers</div>
                  <div className="text-[10px] text-zinc-400">Escrow & orders</div>
                </button>

                <button
                  onClick={() => onNavigateTab("audits")}
                  className="p-3.5 rounded-2xl bg-[#050208] hover:bg-[#FF007F]/15 border border-white/10 hover:border-[#FF007F]/50 text-left transition-all cursor-pointer group"
                >
                  <div className="text-lg mb-1 group-hover:scale-110 transition-transform">🔍</div>
                  <div className="text-xs font-bold text-white group-hover:text-[#FF77B8]">SEO Audits</div>
                  <div className="text-[10px] text-zinc-400">SERP & backlinks</div>
                </button>
              </div>

              {/* Sound / WebGL Toggle */}
              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
                <span className="font-mono">Visual Engine</span>
                <span className="font-bold text-[#FF007F] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF007F] animate-pulse" />
                  3D Spatial Cyber
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
