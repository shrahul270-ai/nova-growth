"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";

const GLOBAL_COUNTRIES = [
  { code: "US", name: "United States", flag: "🇺🇸", city: "New York • SF", pos: "top-[14%] left-[4%] sm:left-[8%]" },
  { code: "UK", name: "United Kingdom", flag: "🇬🇧", city: "London", pos: "top-[18%] right-[4%] sm:right-[10%]" },
  { code: "CA", name: "Canada", flag: "🇨🇦", city: "Toronto • Vancouver", pos: "bottom-[24%] left-[4%] sm:left-[8%]" },
  { code: "EU", name: "Germany & EU", flag: "🇪🇺", city: "Berlin • Zurich", pos: "bottom-[20%] right-[4%] sm:right-[10%]" },
  { code: "AU", name: "Australia", flag: "🇦🇺", city: "Sydney • Melbourne", pos: "top-[46%] left-[2%] sm:left-[5%]" },
  { code: "AE", name: "UAE & Gulf", flag: "🇦🇪", city: "Dubai • Abu Dhabi", pos: "top-[44%] right-[2%] sm:right-[6%]" },
  { code: "IN", name: "India HQ", flag: "🇮🇳", city: "Global Delivery", pos: "bottom-[6%] left-1/2 -translate-x-1/2" },
];

// Major global hubs for 3D globe pins & flight/data connection paths
const GLOBE_HUBS = [
  { name: "India HQ", lat: 21.0, lon: 78.0, color: "#fcd34d", isHQ: true },
  { name: "USA (NY)", lat: 40.7, lon: -74.0, color: "#22d3ee" },
  { name: "USA (SF)", lat: 37.7, lon: -122.4, color: "#22d3ee" },
  { name: "UK (London)", lat: 51.5, lon: -0.1, color: "#a855f7" },
  { name: "Germany", lat: 52.5, lon: 13.4, color: "#a855f7" },
  { name: "UAE (Dubai)", lat: 25.2, lon: 55.3, color: "#38bdf8" },
  { name: "Australia", lat: -33.8, lon: 151.2, color: "#34d399" },
  { name: "Canada", lat: 43.6, lon: -79.3, color: "#22d3ee" },
];

export default function SellixServicesHeader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let rotation = 0;

    // Handle high-DPI crisp rendering
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Continental particle cloud coordinates (lat, lon)
    const continentPoints: [number, number][] = [];
    const addCluster = (centerLat: number, centerLon: number, count: number, spreadLat: number, spreadLon: number) => {
      for (let i = 0; i < count; i++) {
        continentPoints.push([
          centerLat + (Math.random() - 0.5) * spreadLat,
          centerLon + (Math.random() - 0.5) * spreadLon,
        ]);
      }
    };

    // Populate continents
    addCluster(40, -100, 75, 25, 45); // North America
    addCluster(52, 10, 65, 20, 35);   // Europe
    addCluster(22, 79, 65, 22, 28);   // India / South Asia
    addCluster(35, 105, 70, 25, 40);  // East Asia
    addCluster(24, 45, 40, 18, 25);   // Middle East
    addCluster(-25, 135, 45, 18, 30); // Australia
    addCluster(5, 20, 50, 35, 30);    // Africa
    addCluster(-15, -60, 55, 35, 25); // South America

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.44;

      rotation += 0.004;

      // 1. Earth Atmosphere Glow
      const glowGrad = ctx.createRadialGradient(cx, cy, radius * 0.75, cx, cy, radius * 1.35);
      glowGrad.addColorStop(0, "rgba(168, 85, 247, 0.4)");
      glowGrad.addColorStop(0.5, "rgba(34, 211, 238, 0.2)");
      glowGrad.addColorStop(1, "transparent");
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // 2. Earth Sphere Body (Deep Cosmic Navy / Violet)
      const bodyGrad = ctx.createRadialGradient(cx - radius * 0.3, cy - radius * 0.3, radius * 0.1, cx, cy, radius);
      bodyGrad.addColorStop(0, "#191038");
      bodyGrad.addColorStop(0.7, "#0c0720");
      bodyGrad.addColorStop(1, "#050212");
      ctx.fillStyle = bodyGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      // Earth Outer Ring
      ctx.strokeStyle = "rgba(168, 85, 247, 0.75)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // 3. 3D Projector Helper
      const project = (latDeg: number, lonDeg: number) => {
        const lat = (latDeg * Math.PI) / 180;
        const lon = ((lonDeg + (rotation * 180) / Math.PI) * Math.PI) / 180;
        const x = radius * Math.cos(lat) * Math.sin(lon);
        const y = -radius * Math.sin(lat);
        const z = radius * Math.cos(lat) * Math.cos(lon);
        return {
          x: cx + x,
          y: cy + y,
          z,
          visible: z > 0,
        };
      };

      // 4. Latitude Rings
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        let first = true;
        for (let lon = 0; lon <= 360; lon += 8) {
          const p = project(lat, lon);
          if (p.visible) {
            if (first) {
              ctx.moveTo(p.x, p.y);
              first = false;
            } else {
              ctx.lineTo(p.x, p.y);
            }
          } else {
            first = true;
          }
        }
        ctx.strokeStyle = "rgba(99, 102, 241, 0.22)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // 5. Longitude Meridians
      for (let lon = 0; lon < 360; lon += 45) {
        ctx.beginPath();
        let first = true;
        for (let lat = -90; lat <= 90; lat += 5) {
          const p = project(lat, lon);
          if (p.visible) {
            if (first) {
              ctx.moveTo(p.x, p.y);
              first = false;
            } else {
              ctx.lineTo(p.x, p.y);
            }
          } else {
            first = true;
          }
        }
        ctx.strokeStyle = "rgba(168, 85, 247, 0.2)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // 6. Continental Landmass Particles
      for (let i = 0; i < continentPoints.length; i++) {
        const [lat, lon] = continentPoints[i];
        const p = project(lat, lon);
        if (p.visible) {
          const alpha = (p.z / radius) * 0.85;
          ctx.fillStyle = `rgba(34, 211, 238, ${alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 7. Global Hub Nodes & Connecting Flight Arcs
      const hq = GLOBE_HUBS[0];
      const pHQ = project(hq.lat, hq.lon);

      GLOBE_HUBS.forEach((hub) => {
        const p = project(hub.lat, hub.lon);
        if (p.visible) {
          const alpha = p.z / radius;

          // Draw connection arc from HQ to this country
          if (!hub.isHQ && pHQ.visible) {
            ctx.beginPath();
            ctx.moveTo(pHQ.x, pHQ.y);
            // Quadratic curve control point lifted outward in space
            const midX = (pHQ.x + p.x) / 2;
            const midY = (pHQ.y + p.y) / 2 - radius * 0.22;
            ctx.quadraticCurveTo(midX, midY, p.x, p.y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${alpha * 0.65})`;
            ctx.lineWidth = 1.4;
            ctx.setLineDash([4, 4]);
            ctx.stroke();
            ctx.setLineDash([]);
          }

          // Pulsing halo
          ctx.beginPath();
          ctx.arc(p.x, p.y, hub.isHQ ? 6.5 : 4.5, 0, Math.PI * 2);
          ctx.fillStyle = hub.color;
          ctx.shadowColor = hub.color;
          ctx.shadowBlur = 12;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Outer pulse ring
          ctx.beginPath();
          ctx.arc(p.x, p.y, hub.isHQ ? 11 : 8, 0, Math.PI * 2);
          ctx.strokeStyle = hub.color;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="relative w-full min-h-[620px] sm:min-h-[680px] lg:min-h-[760px] pt-28 sm:pt-36 pb-20 sm:pb-28 px-4 sm:px-6 flex flex-col items-center justify-center text-center overflow-hidden bg-[#060314] select-none">
      
      {/* User-Specified Luxury Chrome Ribbon Wave Header Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <img
          src="/images/service-header-hero.jpg"
          alt="Balaji Prime Media Services Header"
          className="w-full h-full object-cover object-center opacity-65 scale-105 filter brightness-105 contrast-125"
        />
        {/* Ambient Cosmic & Neon Glows */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060314]/90 via-[#060314]/55 to-[#060314]/95" />
        <div
          className="absolute inset-0 opacity-40 mix-blend-screen"
          style={{
            background: "radial-gradient(circle at 50% 40%, rgba(249, 115, 22, 0.25) 0%, rgba(160, 104, 255, 0.2) 45%, transparent 75%)",
          }}
          aria-hidden="true"
        />
        {/* Vignettes for smooth seamless page blending */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#060314] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#060314] to-transparent" />
      </div>

      {/* =========================================================================
          2. FLOATING GLOBAL COUNTRY NETWORK BADGES AROUND THE EARTH
         ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden hidden sm:block">
        {GLOBAL_COUNTRIES.map((country, idx) => (
          <div
            key={country.code}
            className={`absolute ${country.pos} flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0a0520]/85 border border-purple-500/40 backdrop-blur-md shadow-[0_4px_25px_rgba(160,104,255,0.35)] animate-pulse`}
            style={{
              animationDuration: `${3.5 + (idx % 3)}s`,
              animationDelay: `${idx * 0.4}s`,
            }}
          >
            <span className="text-sm">{country.flag}</span>
            <div className="flex flex-col text-left">
              <span className="text-[11px] font-bold text-white leading-tight">
                {country.name}
              </span>
              <span className="text-[9px] text-[#22d3ee] font-mono leading-tight">
                {country.city}
              </span>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          </div>
        ))}
      </div>

      {/* =========================================================================
          3. HERO CONTENT CONTAINER (relative z-10 on top of the glowing earth)
         ========================================================================= */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
        {/* Category Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-purple-500/50 text-purple-200 text-xs font-semibold mb-5 backdrop-blur-md shadow-lg shadow-purple-950/60">
          <span className="w-2 h-2 rounded-full bg-[#22d3ee] animate-pulse" />
          <span>🌍 Global Cross-Border Digital Services Directory</span>
        </div>

        {/* Master Heading */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[68px] font-extrabold tracking-tight text-white leading-[1.12] max-w-3xl mx-auto drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
          <span>Balaji Prime </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#22d3ee] via-[#A068FF] to-[#fcd34d]">
            Media Services
          </span>
        </h1>

        {/* Descriptive Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-slate-200 max-w-2xl mx-auto mt-4 sm:mt-5 leading-relaxed font-normal px-2 drop-shadow-md">
          Full-funnel digital growth, enterprise web engineering, high-DA backlink
          acquisitions, and algorithmic search optimization serving clients across the US, UK, Europe, Australia, and worldwide.
        </p>

        {/* Action CTAs */}
        <div className="mt-8 sm:mt-10 flex flex-col min-[440px]:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md px-4">
          <a
            href="#services-grid"
            className="group w-full min-[440px]:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-white/[0.12] hover:bg-white/[0.22] text-white font-semibold text-xs sm:text-sm border border-purple-500/50 hover:border-cyan-400/80 backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all hover:shadow-[0_0_25px_rgba(34,211,238,0.35)] cursor-pointer"
          >
            <span>Explore 12 Services</span>
            <svg
              className="w-3.5 h-3.5 text-cyan-300 group-hover:translate-x-0.5 transition-transform"
              viewBox="0 0 12 10"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M0.8 5h10M7.1 1.4 10.9 5l-3.8 3.6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          <a
            href="#payment-portal"
            className="group w-full min-[440px]:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-white font-semibold text-xs sm:text-sm shadow-xl shadow-purple-950/80 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #A068FF 0%, #7928CA 60%, #4F46E5 100%)",
            }}
          >
            <span>Client Payment Portal 💳</span>
            <svg
              className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 transition-transform"
              viewBox="0 0 12 10"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M0.8 5h10M7.1 1.4 10.9 5l-3.8 3.6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
