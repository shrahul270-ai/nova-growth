"use client";

import React, { useEffect, useRef, useState } from "react";

interface NodeData {
  id: string;
  label: string;
  category: "core" | "client" | "publisher" | "revenue" | "performance" | "google";
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  value: string;
  subtext: string;
  metric: string;
  status: "active" | "optimal" | "pulsing";
  color: string;
  glowColor: string;
}

interface LinkData {
  source: string;
  target: string;
  flowSpeed: number;
  particles: { offset: number; speed: number }[];
}

interface AiEcosystemGraphProps {
  stats?: {
    totalLeads?: number;
    totalPayments?: number;
    totalAudits?: number;
    totalPublishers?: number;
    activeRevenue?: string;
  };
  onSelectNode?: (nodeId: string) => void;
}

export default function AiEcosystemGraph({ stats, onSelectNode }: AiEcosystemGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const [activeFilter, setActiveFilter] = useState<"all" | "revenue" | "leads" | "publishers">("all");
  const [isPaused, setIsPaused] = useState(false);

  // Nodes Definition (Tailored specifically for Nova Growth Digital Agency)
  const initialNodes: NodeData[] = [
    {
      id: "core",
      label: "Nova Growth Engine",
      category: "core",
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      radius: 42,
      value: "AI Nexus",
      subtext: "Agency Orchestrator",
      metric: "99.8% Efficiency",
      status: "optimal",
      color: "#f59e0b",
      glowColor: "rgba(245, 158, 11, 0.4)",
    },
    {
      id: "leads_us",
      label: "US Enterprise Inquiries",
      category: "client",
      x: -240,
      y: -140,
      vx: 0.1,
      vy: 0.05,
      radius: 30,
      value: `${stats?.totalLeads || 42} Leads`,
      subtext: "New York / California",
      metric: "Avg. Budget $3.5k+",
      status: "active",
      color: "#38bdf8",
      glowColor: "rgba(56, 189, 248, 0.35)",
    },
    {
      id: "leads_uk",
      label: "UK & European Brands",
      category: "client",
      x: -260,
      y: 110,
      vx: -0.08,
      vy: 0.06,
      radius: 28,
      value: "London / Berlin",
      subtext: "E-Com & B2B SaaS",
      metric: "EST / GMT Aligned",
      status: "active",
      color: "#60a5fa",
      glowColor: "rgba(96, 165, 250, 0.35)",
    },
    {
      id: "publishers",
      label: "Vetted DR 50–90+ Network",
      category: "publisher",
      x: 230,
      y: -130,
      vx: 0.06,
      vy: -0.05,
      radius: 32,
      value: "1,240+ Sites",
      subtext: "Editorial Placements",
      metric: "100% White-Hat",
      status: "optimal",
      color: "#10b981",
      glowColor: "rgba(16, 185, 129, 0.35)",
    },
    {
      id: "revenue",
      label: "Monthly Retainers & Escrow",
      category: "revenue",
      x: 250,
      y: 120,
      vx: -0.05,
      vy: -0.06,
      radius: 34,
      value: stats?.activeRevenue || "$18,450",
      subtext: "Stripe / Wire / Wise",
      metric: "Zero Chargebacks",
      status: "active",
      color: "#d97706",
      glowColor: "rgba(217, 119, 6, 0.4)",
    },
    {
      id: "google_ai",
      label: "Google AI & Preferred Sources",
      category: "google",
      x: 0,
      y: -210,
      vx: 0.05,
      vy: 0.02,
      radius: 26,
      value: "Preferred Badge",
      subtext: "Search Generative Priority",
      metric: "Live in AI Overviews",
      status: "pulsing",
      color: "#a855f7",
      glowColor: "rgba(168, 85, 247, 0.35)",
    },
    {
      id: "performance",
      label: "Next.js 16 Web Vitals",
      category: "performance",
      x: 0,
      y: 200,
      vx: -0.04,
      vy: 0.03,
      radius: 26,
      value: "0.68s LCP",
      subtext: "Speed & Indexing SLA",
      metric: "100/100 Core Vitals",
      status: "optimal",
      color: "#06b6d4",
      glowColor: "rgba(6, 182, 212, 0.35)",
    },
  ];

  const links: LinkData[] = [
    {
      source: "leads_us",
      target: "core",
      flowSpeed: 0.008,
      particles: [{ offset: 0.1, speed: 0.007 }, { offset: 0.6, speed: 0.007 }],
    },
    {
      source: "leads_uk",
      target: "core",
      flowSpeed: 0.006,
      particles: [{ offset: 0.3, speed: 0.006 }, { offset: 0.8, speed: 0.006 }],
    },
    {
      source: "core",
      target: "publishers",
      flowSpeed: 0.009,
      particles: [{ offset: 0.2, speed: 0.009 }, { offset: 0.7, speed: 0.009 }],
    },
    {
      source: "core",
      target: "revenue",
      flowSpeed: 0.007,
      particles: [{ offset: 0.4, speed: 0.007 }, { offset: 0.9, speed: 0.007 }],
    },
    {
      source: "google_ai",
      target: "core",
      flowSpeed: 0.005,
      particles: [{ offset: 0.25, speed: 0.005 }],
    },
    {
      source: "core",
      target: "performance",
      flowSpeed: 0.006,
      particles: [{ offset: 0.5, speed: 0.006 }],
    },
    {
      source: "publishers",
      target: "revenue",
      flowSpeed: 0.004,
      particles: [{ offset: 0.3, speed: 0.004 }],
    },
  ];

  const nodesRef = useRef<NodeData[]>(initialNodes);
  const mouseRef = useRef<{ x: number; y: number; isDown: boolean; draggedNode: NodeData | null }>({
    x: 0,
    y: 0,
    isDown: false,
    draggedNode: null,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width || 800;
      height = rect.height || 520;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // Initial center coordinates
    nodesRef.current.forEach((n) => {
      if (n.id === "core") {
        n.x = width * 0.5;
        n.y = height * 0.5;
      } else {
        const init = initialNodes.find((i) => i.id === n.id);
        n.x = width * 0.5 + (init?.x || 0);
        n.y = height * 0.5 + (init?.y || 0);
      }
    });

    let time = 0;

    const loop = () => {
      if (!isPaused) {
        time += 0.02;
        ctx.clearRect(0, 0, width, height);

        const cx = width * 0.5;
        const cy = height * 0.5;

        // 1. Draw Subtle Spatial Radar Grid Lines (Dribbble aesthetic)
        ctx.save();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, 140, 0, Math.PI * 2);
        ctx.arc(cx, cy, 260, 0, Math.PI * 2);
        ctx.stroke();

        // Crosshairs
        ctx.beginPath();
        ctx.moveTo(cx - 300, cy);
        ctx.lineTo(cx + 300, cy);
        ctx.moveTo(cx, cy - 250);
        ctx.lineTo(cx, cy + 250);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.025)";
        ctx.stroke();
        ctx.restore();

        // 2. Physics & Gentle Float Animation
        nodesRef.current.forEach((n) => {
          if (n.id !== "core" && mouseRef.current.draggedNode !== n) {
            n.x += Math.sin(time + n.radius) * 0.25;
            n.y += Math.cos(time + n.radius * 0.5) * 0.25;
          }
        });

        // 3. Draw Connecting Cyber Luminous Links & Flow Photons
        links.forEach((l) => {
          const s = nodesRef.current.find((n) => n.id === l.source);
          const t = nodesRef.current.find((n) => n.id === l.target);
          if (!s || !t) return;

          // Link Line Gradient
          const grad = ctx.createLinearGradient(s.x, s.y, t.x, t.y);
          grad.addColorStop(0, "rgba(56, 189, 248, 0.25)");
          grad.addColorStop(0.5, "rgba(245, 158, 11, 0.35)");
          grad.addColorStop(1, "rgba(16, 185, 129, 0.25)");

          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(t.x, t.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.8;
          ctx.stroke();

          // Flowing Light Photons
          l.particles.forEach((p) => {
            p.offset = (p.offset + p.speed) % 1;
            const px = s.x + (t.x - s.x) * p.offset;
            const py = s.y + (t.y - s.y) * p.offset;

            ctx.save();
            ctx.beginPath();
            ctx.arc(px, py, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = "#ffffff";
            ctx.shadowColor = "#38bdf8";
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.restore();
          });
        });

        // 4. Draw Nodes with Dribbble-Style Glassmorphism & Core Glow
        nodesRef.current.forEach((n) => {
          const isSelected = selectedNode?.id === n.id;

          ctx.save();

          // Outer Ambient Glow Aura
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius + (n.status === "pulsing" ? Math.sin(time * 3) * 4 + 8 : 6), 0, Math.PI * 2);
          ctx.fillStyle = n.glowColor;
          ctx.fill();

          // Node Body
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
          const bodyGrad = ctx.createRadialGradient(
            n.x - n.radius * 0.3,
            n.y - n.radius * 0.3,
            2,
            n.x,
            n.y,
            n.radius
          );
          bodyGrad.addColorStop(0, "#1e293b");
          bodyGrad.addColorStop(0.8, "#09101d");
          bodyGrad.addColorStop(1, "#030712");
          ctx.fillStyle = bodyGrad;
          ctx.fill();

          // Border Ring
          ctx.lineWidth = isSelected ? 2.5 : 1.5;
          ctx.strokeStyle = isSelected ? "#ffffff" : n.color;
          ctx.stroke();

          // Inner Active Pulse Dot
          ctx.beginPath();
          ctx.arc(n.x, n.y - n.radius * 0.35, 3, 0, Math.PI * 2);
          ctx.fillStyle = n.color;
          ctx.shadowColor = n.color;
          ctx.shadowBlur = 6;
          ctx.fill();

          // Node Value & Label Text
          ctx.fillStyle = "#ffffff";
          ctx.font = `bold ${n.id === "core" ? "12px" : "11px"} monospace`;
          ctx.textAlign = "center";
          ctx.fillText(n.value, n.x, n.y + 3);

          ctx.fillStyle = "#94a3b8";
          ctx.font = "9px sans-serif";
          ctx.fillText(n.label.slice(0, 16), n.x, n.y + n.radius + 14);

          ctx.restore();
        });
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    // Mouse Interaction Handlers
    const getPos = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handleMouseDown = (e: MouseEvent) => {
      const pos = getPos(e);
      const clicked = nodesRef.current.find((n) => {
        const dx = n.x - pos.x;
        const dy = n.y - pos.y;
        return Math.sqrt(dx * dx + dy * dy) <= n.radius + 5;
      });

      if (clicked) {
        mouseRef.current.isDown = true;
        mouseRef.current.draggedNode = clicked;
        setSelectedNode(clicked);
        if (onSelectNode) onSelectNode(clicked.id);
      } else {
        setSelectedNode(null);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const pos = getPos(e);
      if (mouseRef.current.isDown && mouseRef.current.draggedNode) {
        mouseRef.current.draggedNode.x = pos.x;
        mouseRef.current.draggedNode.y = pos.y;
      }
    };

    const handleMouseUp = () => {
      mouseRef.current.isDown = false;
      mouseRef.current.draggedNode = null;
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isPaused, onSelectNode, selectedNode]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[520px] rounded-3xl bg-[#040812] border border-gray-800/80 overflow-hidden shadow-2xl selection:bg-none"
    >
      {/* Background Cyber Ambient Radiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-amber-500/5 blur-[100px] pointer-events-none" />

      {/* Top Telemetry Header Bar inside the Graph */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-white font-bold">SPATIAL ECOSYSTEM GRAPH</span>
          <span className="text-gray-500">|</span>
          <span className="text-gray-400">7 Active Nodes Connected</span>
        </div>

        {/* View Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-md text-xs">
          {(["all", "revenue", "leads", "publishers"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1 rounded-xl font-bold uppercase text-[10px] tracking-wider transition-all cursor-pointer ${
                activeFilter === filter
                  ? "bg-amber-500 text-black shadow-xs"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {filter}
            </button>
          ))}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="px-2 py-1 text-gray-400 hover:text-white text-[10px] uppercase font-bold cursor-pointer"
            title={isPaused ? "Resume Animation" : "Pause Animation"}
          >
            {isPaused ? "▶" : "⏸"}
          </button>
        </div>
      </div>

      {/* HTML5 Canvas Engine */}
      <canvas ref={canvasRef} className="block w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating Selected Node Intelligence Inspector (Side Overlay Card) */}
      {selectedNode && (
        <div className="absolute bottom-4 left-4 z-20 max-w-xs p-4 rounded-2xl bg-[#09101d]/90 border border-white/10 backdrop-blur-xl shadow-2xl text-left animate-fadeIn">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span
              className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full"
              style={{ backgroundColor: `${selectedNode.color}25`, color: selectedNode.color }}
            >
              {selectedNode.category}
            </span>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-gray-400 hover:text-white text-xs cursor-pointer"
            >
              ✕
            </button>
          </div>
          <h4 className="text-sm font-black text-white">{selectedNode.label}</h4>
          <p className="text-xs text-gray-400 mt-1">{selectedNode.subtext}</p>
          <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
            <span className="text-gray-400">Metric:</span>
            <span className="font-mono font-bold text-amber-400">{selectedNode.metric}</span>
          </div>
        </div>
      )}

      {/* Bottom Hint */}
      <div className="absolute bottom-4 right-4 z-10 text-[10px] text-gray-500 font-mono pointer-events-none">
        Tip: Drag nodes to rearrange • Click node to inspect details
      </div>
    </div>
  );
}
