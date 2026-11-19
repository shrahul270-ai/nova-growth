"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  baseAlpha: number;
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let isMobile = false;

    // Fast resize with capped DPR to prevent GPU memory bloat
    const handleResize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      isMobile = width < 768;

      // Cap DPR to 1 on mobile, 1.25 on desktop
      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 1.25);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      initParticles();
    };

    // Track mouse position with passive listener (desktop only)
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 100,
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    // Brand Palette: Amber Gold, Deep Royal Sapphire, Champagne Light
    const colors = [
      "rgba(217, 119, 6,",   // Brand Gold #d97706
      "rgba(245, 158, 11,",  // Bright Amber #f59e0b
      "rgba(29, 78, 216,",   // Sapphire Navy #1d4ed8
      "rgba(37, 99, 235,",   // Bright Blue #2563eb
      "rgba(251, 191, 36,",  // Champagne Gold #fbbf24
    ];

    let particles: Particle[] = [];

    const initParticles = () => {
      // Lightweight particle counts: mobile ~16, desktop ~28 (down from 48)
      const count = isMobile ? 16 : Math.min(Math.floor((width * height) / 38000), 28);
      particles = [];

      for (let i = 0; i < count; i++) {
        const baseAlpha = Math.random() * 0.3 + 0.12;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35 - 0.1,
          size: Math.random() * 1.8 + 0.9,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: baseAlpha,
          baseAlpha: baseAlpha,
        });
      }
    };

    handleResize();

    // Pause when tab not visible
    let isVisible = true;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        lastTime = performance.now();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    let lastTime = performance.now();
    let lastRenderTime = 0;
    const frameInterval = isMobile ? 1000 / 30 : 1000 / 60; // 30 FPS on mobile, 60 FPS on desktop

    const render = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(render);

      if (!isVisible) return;

      const elapsed = currentTime - lastRenderTime;
      if (elapsed < frameInterval) return;
      lastRenderTime = currentTime - (elapsed % frameInterval);

      const delta = Math.min((currentTime - lastTime) / 1000, 0.08);
      lastTime = currentTime;

      ctx.clearRect(0, 0, width, height);

      // 1. Move and draw particles (Fast single-pass without expensive shadowBlur)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx * (delta * 60);
        p.y += p.vy * (delta * 60);

        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Subtle mouse repulsion on desktop only
        if (!isMobile) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            p.x -= (dx / dist) * force * 1.2;
            p.y -= (dy / dist) * force * 1.2;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${p.alpha})`;
        ctx.fill();
      }

      // 2. Batched constellation lines (One single ctx.stroke() for all lines!)
      const maxDistance = isMobile ? 85 : 105;
      ctx.beginPath();
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistance * maxDistance) {
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
          }
        }
      }
      ctx.strokeStyle = "rgba(217, 119, 6, 0.07)";
      ctx.lineWidth = 0.75;
      ctx.stroke();
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden"
      aria-hidden="true"
    >
      {/* 1. Top Radiant Ambient Aurora Beacon (Header & Hero backdrop glow) */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[650px] sm:w-[950px] h-[380px] sm:h-[500px] rounded-full blur-[80px] sm:blur-[110px] opacity-60 will-change-transform"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(217, 119, 6, 0.12) 0%, rgba(29, 78, 216, 0.08) 45%, rgba(9, 20, 39, 0.03) 75%, transparent 100%)",
        }}
      />

      {/* 2. Secondary Floating Warm Light Orbs */}
      <div
        className="absolute top-1/3 -left-20 w-[300px] sm:w-[440px] h-[300px] sm:h-[440px] rounded-full blur-[70px] sm:blur-[95px] opacity-40 will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(217, 119, 6, 0.1) 0%, rgba(245, 158, 11, 0.05) 50%, transparent 80%)",
        }}
      />

      <div
        className="absolute top-2/3 -right-20 w-[340px] sm:w-[480px] h-[340px] sm:h-[480px] rounded-full blur-[75px] sm:blur-[100px] opacity-35 will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(29, 78, 216, 0.09) 0%, rgba(217, 119, 6, 0.06) 60%, transparent 80%)",
        }}
      />

      {/* 3. Subtle Digital Tech Matrix Grid Texture */}
      <div
        className="absolute inset-0 opacity-[0.03] sm:opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(9, 20, 39, 0.75) 1px, transparent 1px), radial-gradient(rgba(217, 119, 6, 0.6) 1px, transparent 1px)",
          backgroundSize: "32px 32px, 64px 64px",
          backgroundPosition: "0 0, 16px 16px",
          maskImage:
            "radial-gradient(ellipse at 50% 30%, black 20%, rgba(0,0,0,0.4) 60%, transparent 95%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 30%, black 20%, rgba(0,0,0,0.4) 60%, transparent 95%)",
        }}
      />

      {/* 4. Ultra-Smooth Live Particle Constellation Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
