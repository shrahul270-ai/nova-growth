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
  pulseSpeed: number;
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
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track mouse position for subtle interactive particle reaction
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 120,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    // Handle resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Brand Palette: Amber Gold, Deep Royal Sapphire, Champagne Light
    const colors = [
      "rgba(217, 119, 6,",   // Brand Gold/Amber #d97706
      "rgba(245, 158, 11,",  // Bright Amber #f59e0b
      "rgba(29, 78, 216,",   // Sapphire Navy #1d4ed8
      "rgba(37, 99, 235,",   // Bright Blue #2563eb
      "rgba(251, 191, 36,",  // Champagne Gold #fbbf24
    ];

    let particles: Particle[] = [];

    const initParticles = () => {
      // Scale particle count based on screen width (desktop: ~45, mobile: ~20)
      const count = Math.min(Math.floor((width * height) / 28000), 48);
      particles = [];

      for (let i = 0; i < count; i++) {
        const baseAlpha = Math.random() * 0.35 + 0.15;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45 - 0.15, // slight upward float
          size: Math.random() * 2.2 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: baseAlpha,
          baseAlpha: baseAlpha,
          pulseSpeed: Math.random() * 0.02 + 0.01,
        });
      }
    };

    initParticles();

    // Pause when tab not visible
    let isVisible = true;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        lastTime = performance.now();
        render(lastTime);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    let lastTime = performance.now();

    const render = (currentTime: number) => {
      if (!isVisible) return;

      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      ctx.clearRect(0, 0, width, height);

      // Render & update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx * (delta * 60);
        p.y += p.vy * (delta * 60);

        // Screen wrap
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Mouse gentle repulsion / illumination
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let targetAlpha = p.baseAlpha;
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          p.x -= (dx / dist) * force * 1.5;
          p.y -= (dy / dist) * force * 1.5;
          targetAlpha = Math.min(p.baseAlpha + force * 0.5, 0.9);
        }

        // Smooth pulse
        p.alpha += (targetAlpha - p.alpha) * 0.1;

        // Draw particle with soft glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${p.alpha})`;
        ctx.shadowColor = `${p.color} 0.6)`;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      // Draw subtle connecting constellation threads
      const maxDistance = 110;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.12 * Math.min(p1.alpha, p2.alpha);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(217, 119, 6, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
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
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] sm:w-[1000px] h-[440px] sm:h-[560px] rounded-full blur-[90px] sm:blur-[120px] opacity-65 animate-aurora-slow will-change-transform"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(217, 119, 6, 0.14) 0%, rgba(29, 78, 216, 0.1) 45%, rgba(9, 20, 39, 0.04) 75%, transparent 100%)",
        }}
      />

      {/* 2. Secondary Floating Warm Light Orbs */}
      <div
        className="absolute top-1/3 -left-24 w-[360px] sm:w-[500px] h-[360px] sm:h-[500px] rounded-full blur-[80px] sm:blur-[110px] opacity-50 animate-header-glow-1 will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(217, 119, 6, 0.12) 0%, rgba(245, 158, 11, 0.06) 50%, transparent 80%)",
        }}
      />

      <div
        className="absolute top-2/3 -right-24 w-[400px] sm:w-[550px] h-[400px] sm:h-[550px] rounded-full blur-[85px] sm:blur-[115px] opacity-45 animate-header-glow-2 will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(29, 78, 216, 0.1) 0%, rgba(217, 119, 6, 0.08) 60%, transparent 80%)",
        }}
      />

      {/* 3. Subtle Digital Tech Matrix Grid Texture */}
      <div
        className="absolute inset-0 opacity-[0.035] sm:opacity-[0.05]"
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

      {/* 4. Interactive Live Particle Constellation Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
