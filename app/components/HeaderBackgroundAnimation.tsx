"use client";

import React, { useEffect, useRef, useState } from "react";

interface HeaderBackgroundAnimationProps {
  variant?: "hero" | "subpage" | "dark";
  className?: string;
}

interface Sphere3D {
  baseX: number;
  baseY: number;
  baseZ: number;
  radius: number;
  speed: number;
  orbitRadiusX: number;
  orbitRadiusY: number;
  orbitPhase: number;
  colorType: "gold" | "sapphire" | "pearl" | "champagne";
}

export default function HeaderBackgroundAnimation({
  variant = "subpage",
  className = "",
}: HeaderBackgroundAnimationProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let isIntersecting = true;
    let isVisible = true;

    const isHero = variant === "hero";
    const isDark = variant === "dark";

    // Detect mobile/tablet for performance optimization
    let isMobile = false;

    // Set canvas dimensions - capped DPR prevents memory/fillrate choking on 4K/Retina
    const resizeCanvas = () => {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      width = rect.width || window.innerWidth;
      height = rect.height || 420;
      isMobile = width < 768;

      // Cap DPR: 1 on mobile/tablet, max 1.25 on desktop to eliminate GPU fillrate lag
      const maxDpr = isMobile ? 1 : 1.25;
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });

    // INTERSECTION OBSERVER: Pause animation completely when scrolled out of view!
    // This saves 100% CPU/GPU when user scrolls through the rest of the website.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isIntersecting = entry.isIntersecting;
          if (isIntersecting && isVisible) {
            lastTime = performance.now();
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Passive mouse tracking with dampening (throttled, no touch hijacking)
    const mouse = {
      targetX: 0,
      targetY: 0,
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return; // Skip mouse parallax calculations on touch devices
      const rect = container.getBoundingClientRect();
      const relativeX = e.clientX - rect.left - rect.width / 2;
      const relativeY = e.clientY - rect.top - rect.height / 2;
      mouse.targetX = relativeX * 0.0004;
      mouse.targetY = relativeY * 0.0004;
    };

    const handleMouseLeave = () => {
      mouse.targetX = 0;
      mouse.targetY = 0;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    // --- PRE-ALLOCATED SCENE OBJECTS (Zero GC allocations during render loop) ---

    // 1. 3D Spheres (Photorealistic with fast radial gradients, NO expensive blurs)
    const spheres: Sphere3D[] = isHero
      ? [
          {
            baseX: 190,
            baseY: -25,
            baseZ: -30,
            radius: isMobile ? 22 : 32,
            speed: 0.45,
            orbitRadiusX: 40,
            orbitRadiusY: 25,
            orbitPhase: 0,
            colorType: "gold",
          },
          {
            baseX: -190,
            baseY: 35,
            baseZ: 40,
            radius: isMobile ? 18 : 26,
            speed: 0.35,
            orbitRadiusX: 30,
            orbitRadiusY: 20,
            orbitPhase: 2.1,
            colorType: "sapphire",
          },
          {
            baseX: 270,
            baseY: 70,
            baseZ: 80,
            radius: isMobile ? 15 : 20,
            speed: 0.5,
            orbitRadiusX: 25,
            orbitRadiusY: 18,
            orbitPhase: 4.2,
            colorType: "champagne",
          },
          {
            baseX: -260,
            baseY: -50,
            baseZ: 60,
            radius: isMobile ? 16 : 22,
            speed: 0.3,
            orbitRadiusX: 35,
            orbitRadiusY: 18,
            orbitPhase: 1.2,
            colorType: "pearl",
          },
        ]
      : [
          {
            baseX: 160,
            baseY: -20,
            baseZ: -20,
            radius: isMobile ? 18 : 24,
            speed: 0.45,
            orbitRadiusX: 30,
            orbitRadiusY: 20,
            orbitPhase: 0,
            colorType: "gold",
          },
          {
            baseX: -160,
            baseY: 25,
            baseZ: 40,
            radius: isMobile ? 16 : 20,
            speed: 0.35,
            orbitRadiusX: 25,
            orbitRadiusY: 18,
            orbitPhase: 2.2,
            colorType: "sapphire",
          },
          {
            baseX: 220,
            baseY: 50,
            baseZ: 70,
            radius: isMobile ? 14 : 17,
            speed: 0.5,
            orbitRadiusX: 22,
            orbitRadiusY: 15,
            orbitPhase: 4.0,
            colorType: "champagne",
          },
        ];

    // 2. 3D Gyroscopic Rings Configuration
    const rings = isMobile
      ? [
          {
            radius: isHero ? 220 : 180,
            tiltX: 60 * (Math.PI / 180),
            tiltY: 25 * (Math.PI / 180),
            rotSpeed: 0.003,
            color: "rgba(217, 119, 6, 0.45)",
            satelliteColor: "#f59e0b",
            satelliteRadius: 4.5,
            satelliteSpeed: 0.5,
          },
        ]
      : [
          {
            radius: isHero ? 310 : 230,
            tiltX: 62 * (Math.PI / 180),
            tiltY: 24 * (Math.PI / 180),
            rotSpeed: 0.003,
            color: isDark ? "rgba(245, 158, 11, 0.45)" : "rgba(217, 119, 6, 0.42)",
            satelliteColor: "#f59e0b",
            satelliteRadius: 5,
            satelliteSpeed: 0.55,
          },
          {
            radius: isHero ? 210 : 160,
            tiltX: -54 * (Math.PI / 180),
            tiltY: -30 * (Math.PI / 180),
            rotSpeed: -0.0035,
            color: isDark ? "rgba(59, 130, 246, 0.4)" : "rgba(29, 78, 216, 0.35)",
            satelliteColor: "#60a5fa",
            satelliteRadius: 4,
            satelliteSpeed: -0.65,
          },
        ];

    // 3. Stardust Particles (Lightweight static array)
    const particleCount = isMobile ? 14 : isHero ? 28 : 20;
    const particles = new Float32Array(particleCount * 6); // [x, y, z, vx, vy, size]
    for (let i = 0; i < particleCount; i++) {
      const idx = i * 6;
      particles[idx] = (Math.random() - 0.5) * 900;
      particles[idx + 1] = (Math.random() - 0.5) * 450;
      particles[idx + 2] = (Math.random() - 0.5) * 300;
      particles[idx + 3] = (Math.random() - 0.5) * 0.25;
      particles[idx + 4] = (Math.random() - 0.5) * 0.25 - 0.06;
      particles[idx + 5] = Math.random() * 1.8 + 0.8;
    }

    // Fast 3D Projection Math (Inlined, zero heap allocation)
    const fov = 450;
    let projX = 0;
    let projY = 0;
    let projZ = 0;
    let projScale = 0;
    let projVisible = false;

    const fastProject = (
      x: number,
      y: number,
      z: number,
      cx: number,
      cy: number,
      rotX: number,
      rotY: number
    ) => {
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const x1 = x * cosY - z * sinY;
      const z1 = x * sinY + z * cosY;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const y2 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;

      const depth = fov + z2;
      if (depth <= 20) {
        projVisible = false;
        return;
      }

      projScale = fov / depth;
      projX = cx + x1 * projScale;
      projY = cy + y2 * projScale;
      projZ = z2;
      projVisible = true;
    };

    // Pre-allocated buffers for sphere rendering (prevents GC pauses)
    interface SphereRenderItem {
      screenX: number;
      screenY: number;
      radius: number;
      z: number;
      colorType: Sphere3D["colorType"];
      alpha: number;
    }

    const sphereRenderList: SphereRenderItem[] = spheres.map(() => ({
      screenX: 0,
      screenY: 0,
      radius: 0,
      z: 0,
      colorType: "gold",
      alpha: 1,
    }));

    // Draw high-performance photorealistic 3D sphere without ctx.filter or shadowBlur
    const drawFast3DSphere = (
      screenX: number,
      screenY: number,
      radius: number,
      colorType: Sphere3D["colorType"],
      alphaMultiplier: number
    ) => {
      if (radius < 1) return;

      const lightOffsetX = -radius * 0.35;
      const lightOffsetY = -radius * 0.35;
      const highlightX = screenX + lightOffsetX;
      const highlightY = screenY + lightOffsetY;

      // 1. Soft Ambient Depth Shadow (FAST radial gradient, NO blur filter)
      const shadowGrad = ctx.createRadialGradient(
        screenX,
        screenY + radius * 0.85,
        0,
        screenX,
        screenY + radius * 0.85,
        radius * 0.95
      );
      shadowGrad.addColorStop(0, `rgba(9, 20, 39, ${0.25 * alphaMultiplier})`);
      shadowGrad.addColorStop(1, "rgba(9, 20, 39, 0)");

      ctx.beginPath();
      ctx.ellipse(
        screenX,
        screenY + radius * 0.85,
        radius * 0.95,
        radius * 0.32,
        0,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = shadowGrad;
      ctx.fill();

      // 2. Realistic 3D Shaded Sphere Body
      const bodyGrad = ctx.createRadialGradient(
        highlightX,
        highlightY,
        Math.max(1, radius * 0.08),
        screenX,
        screenY,
        radius
      );

      if (colorType === "gold") {
        bodyGrad.addColorStop(0, `rgba(255, 255, 255, ${0.98 * alphaMultiplier})`);
        bodyGrad.addColorStop(0.2, `rgba(254, 240, 138, ${0.92 * alphaMultiplier})`);
        bodyGrad.addColorStop(0.5, `rgba(245, 158, 11, ${0.88 * alphaMultiplier})`);
        bodyGrad.addColorStop(0.85, `rgba(217, 119, 6, ${0.92 * alphaMultiplier})`);
        bodyGrad.addColorStop(1, `rgba(120, 53, 15, ${0.95 * alphaMultiplier})`);
      } else if (colorType === "sapphire") {
        bodyGrad.addColorStop(0, `rgba(255, 255, 255, ${0.98 * alphaMultiplier})`);
        bodyGrad.addColorStop(0.2, `rgba(191, 219, 254, ${0.92 * alphaMultiplier})`);
        bodyGrad.addColorStop(0.52, `rgba(59, 130, 246, ${0.88 * alphaMultiplier})`);
        bodyGrad.addColorStop(0.85, `rgba(29, 78, 216, ${0.92 * alphaMultiplier})`);
        bodyGrad.addColorStop(1, `rgba(15, 23, 42, ${0.96 * alphaMultiplier})`);
      } else if (colorType === "champagne") {
        bodyGrad.addColorStop(0, `rgba(255, 255, 255, ${0.98 * alphaMultiplier})`);
        bodyGrad.addColorStop(0.25, `rgba(253, 230, 138, ${0.92 * alphaMultiplier})`);
        bodyGrad.addColorStop(0.6, `rgba(217, 119, 6, ${0.85 * alphaMultiplier})`);
        bodyGrad.addColorStop(1, `rgba(146, 64, 14, ${0.92 * alphaMultiplier})`);
      } else {
        // Pearl
        bodyGrad.addColorStop(0, `rgba(255, 255, 255, ${0.98 * alphaMultiplier})`);
        bodyGrad.addColorStop(0.35, `rgba(241, 245, 249, ${0.88 * alphaMultiplier})`);
        bodyGrad.addColorStop(0.7, `rgba(203, 213, 225, ${0.82 * alphaMultiplier})`);
        bodyGrad.addColorStop(1, `rgba(100, 116, 139, ${0.9 * alphaMultiplier})`);
      }

      ctx.beginPath();
      ctx.arc(screenX, screenY, radius, 0, Math.PI * 2);
      ctx.fillStyle = bodyGrad;
      ctx.fill();

      // 3. Specular Glint Spot
      ctx.beginPath();
      ctx.arc(highlightX, highlightY, Math.max(1, radius * 0.2), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${0.92 * alphaMultiplier})`;
      ctx.fill();

      // 4. Subtle Outer Fresnel Rim Glow Ring
      ctx.beginPath();
      ctx.arc(screenX, screenY, radius, 0, Math.PI * 2);
      ctx.strokeStyle =
        colorType === "sapphire"
          ? `rgba(147, 197, 253, ${0.4 * alphaMultiplier})`
          : `rgba(254, 243, 199, ${0.4 * alphaMultiplier})`;
      ctx.lineWidth = Math.max(0.75, radius * 0.05);
      ctx.stroke();
    };

    // Tab visibility handling
    const handleVisibility = () => {
      isVisible = !document.hidden;
      if (isVisible && isIntersecting) {
        lastTime = performance.now();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    let lastTime = performance.now();
    let globalTime = 0;
    let cameraRotX = 0;
    let cameraRotY = 0;

    // 60 FPS Target Frame Interval (16.6ms) - prevents 120Hz/144Hz monitors from overtaxing GPU
    const frameInterval = isMobile ? 1000 / 45 : 1000 / 60;
    let lastRenderTimestamp = 0;

    // Main 60 FPS Loop
    const render = (now: number) => {
      animationFrameId = requestAnimationFrame(render);

      // Skip render if element is scrolled out of viewport or tab hidden
      if (!isIntersecting || !isVisible) return;

      const elapsed = now - lastRenderTimestamp;
      if (elapsed < frameInterval) return;

      lastRenderTimestamp = now - (elapsed % frameInterval);

      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      globalTime += dt;

      ctx.clearRect(0, 0, width, height);

      // Center of 3D projection
      const centerX = isHero && width >= 1024 ? width * 0.58 : width * 0.5;
      const centerY = height * 0.48;

      // Smooth idle breathing camera tilt + gentle mouse parallax
      const targetCamX = mouse.targetY + Math.sin(globalTime * 0.4) * 0.06;
      const targetCamY = mouse.targetX + Math.cos(globalTime * 0.3) * 0.09;

      cameraRotX += (targetCamX - cameraRotX) * 0.05;
      cameraRotY += (targetCamY - cameraRotY) * 0.05;

      // --- 1. RENDER 3D STARDUST PARTICLES (Fast single pass) ---
      ctx.fillStyle = isDark ? "rgba(245, 158, 11, 0.4)" : "rgba(217, 119, 6, 0.35)";
      ctx.beginPath();
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 6;
        particles[idx] += particles[idx + 3] * (dt * 60);
        particles[idx + 1] += particles[idx + 4] * (dt * 60);

        if (particles[idx] < -500) particles[idx] = 500;
        if (particles[idx] > 500) particles[idx] = -500;
        if (particles[idx + 1] < -250) particles[idx + 1] = 250;
        if (particles[idx + 1] > 250) particles[idx + 1] = -250;

        fastProject(
          particles[idx],
          particles[idx + 1],
          particles[idx + 2],
          centerX,
          centerY,
          cameraRotX,
          cameraRotY
        );

        if (projVisible) {
          const sz = Math.max(0.6, particles[idx + 5] * projScale);
          ctx.moveTo(projX + sz, projY);
          ctx.arc(projX, projY, sz, 0, Math.PI * 2);
        }
      }
      ctx.fill();

      // --- 2. RENDER 3D GYROSCOPIC RINGS & SATELLITES (Batched path drawing) ---
      const segments = isMobile ? 24 : 36;
      for (let r = 0; r < rings.length; r++) {
        const ring = rings[r];
        const ringAngle = globalTime * ring.rotSpeed * 60;
        const cosTX = Math.cos(ring.tiltX);
        const sinTX = Math.sin(ring.tiltX);

        ctx.beginPath();
        let first = true;

        for (let s = 0; s <= segments; s++) {
          const theta = (s / segments) * Math.PI * 2;
          const localX = Math.cos(theta) * ring.radius;
          const localZ = Math.sin(theta) * ring.radius;

          const y1 = -localZ * sinTX;
          const z1 = localZ * cosTX;

          const cosTY = Math.cos(ring.tiltY + ringAngle);
          const sinTY = Math.sin(ring.tiltY + ringAngle);
          const x2 = localX * cosTY - z1 * sinTY;
          const z2 = localX * sinTY + z1 * cosTY;

          fastProject(x2, y1, z2, centerX, centerY, cameraRotX, cameraRotY);

          if (projVisible) {
            if (first) {
              ctx.moveTo(projX, projY);
              first = false;
            } else {
              ctx.lineTo(projX, projY);
            }
          }
        }

        ctx.strokeStyle = ring.color;
        ctx.lineWidth = r === 0 ? 1.6 : 1.2;
        ctx.stroke();

        // Orbiting Satellite Pearl on this ring
        const satAngle = (globalTime * ring.satelliteSpeed) % (Math.PI * 2);
        const satLocalX = Math.cos(satAngle) * ring.radius;
        const satLocalZ = Math.sin(satAngle) * ring.radius;
        const satY1 = -satLocalZ * sinTX;
        const satZ1 = satLocalZ * cosTX;

        const cosTY = Math.cos(ring.tiltY + ringAngle);
        const sinTY = Math.sin(ring.tiltY + ringAngle);
        const satX2 = satLocalX * cosTY - satZ1 * sinTY;
        const satZ2 = satLocalX * sinTY + satZ1 * cosTY;

        fastProject(satX2, satY1, satZ2, centerX, centerY, cameraRotX, cameraRotY);

        if (projVisible) {
          const satR = Math.max(2, ring.satelliteRadius * projScale);
          ctx.beginPath();
          ctx.arc(projX, projY, satR, 0, Math.PI * 2);
          ctx.fillStyle = ring.satelliteColor;
          ctx.fill();

          // Delicate outer halo (fast stroke instead of expensive shadowBlur)
          ctx.beginPath();
          ctx.arc(projX, projY, satR + 2, 0, Math.PI * 2);
          ctx.strokeStyle = `${ring.satelliteColor}55`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      // --- 3. RENDER 3D SPHERES WITH ZERO-ALLOCATION DEPTH SORTING ---
      for (let i = 0; i < spheres.length; i++) {
        const s = spheres[i];
        const orbitAngle = globalTime * s.speed + s.orbitPhase;
        const curX = s.baseX + Math.cos(orbitAngle) * s.orbitRadiusX;
        const curY = s.baseY + Math.sin(orbitAngle * 1.2) * s.orbitRadiusY;
        const curZ = s.baseZ + Math.sin(orbitAngle) * (s.orbitRadiusX * 0.7);

        fastProject(curX, curY, curZ, centerX, centerY, cameraRotX, cameraRotY);

        const item = sphereRenderList[i];
        if (projVisible) {
          item.screenX = projX;
          item.screenY = projY;
          item.radius = s.radius * projScale;
          item.z = projZ;
          item.colorType = s.colorType;
          item.alpha = Math.max(0.4, Math.min(projScale * 1.15, 1));
        } else {
          item.radius = 0;
          item.z = -9999;
        }
      }

      // Fast in-place 4-element sort (Zero array creation)
      sphereRenderList.sort((a, b) => b.z - a.z);

      // Render spheres from back to front
      for (let i = 0; i < sphereRenderList.length; i++) {
        const item = sphereRenderList[i];
        if (item.radius > 0) {
          drawFast3DSphere(
            item.screenX,
            item.screenY,
            item.radius,
            item.colorType,
            item.alpha
          );
        }
      }
    };

    // Start 60 FPS animation loop
    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [variant]);

  const isDark = variant === "dark";
  const isHero = variant === "hero";

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none -z-0 ${className}`}
      aria-hidden="true"
    >
      {/* 1. Primary Ambient Aurora Beacon (Lightweight GPU Layer) */}
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 rounded-full blur-[60px] sm:blur-[90px] will-change-transform ${
          isHero
            ? "w-[550px] sm:w-[850px] h-[320px] sm:h-[460px] opacity-65"
            : isDark
            ? "w-[480px] sm:w-[720px] h-[280px] sm:h-[390px] opacity-60"
            : "w-[450px] sm:w-[680px] h-[260px] sm:h-[360px] opacity-60"
        }`}
        style={{
          background: isDark
            ? "radial-gradient(circle at 50% 35%, rgba(217, 119, 6, 0.28) 0%, rgba(245, 158, 11, 0.16) 40%, rgba(29, 78, 216, 0.12) 70%, transparent 85%)"
            : "radial-gradient(circle at 50% 35%, rgba(245, 158, 11, 0.22) 0%, rgba(217, 119, 6, 0.15) 40%, rgba(29, 78, 216, 0.08) 70%, transparent 85%)",
        }}
      />

      {/* 2. Secondary Ambient Glow Left */}
      <div
        className={`absolute rounded-full blur-[50px] sm:blur-[75px] will-change-transform ${
          isHero
            ? "-top-8 left-[10%] w-[260px] sm:w-[420px] h-[260px] sm:h-[420px] opacity-50"
            : "-top-4 left-[6%] w-[220px] sm:w-[320px] h-[220px] sm:h-[320px] opacity-40"
        }`}
        style={{
          background:
            "radial-gradient(circle, rgba(217, 119, 6, 0.22) 0%, rgba(245, 158, 11, 0.1) 50%, transparent 80%)",
        }}
      />

      {/* 3. Secondary Ambient Glow Right */}
      <div
        className={`absolute rounded-full blur-[55px] sm:blur-[80px] will-change-transform ${
          isHero
            ? "top-4 right-[8%] w-[280px] sm:w-[440px] h-[280px] sm:h-[440px] opacity-45"
            : "top-2 right-[5%] w-[240px] sm:w-[340px] h-[240px] sm:h-[340px] opacity-35"
        }`}
        style={{
          background:
            "radial-gradient(circle, rgba(29, 78, 216, 0.18) 0%, rgba(37, 99, 235, 0.1) 50%, transparent 80%)",
        }}
      />

      {/* 4. Ultra-Fast 60 FPS 3D Perspective Projection Canvas Engine */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block pointer-events-none"
      />

      {/* 5. Delicate Sparkling Star Glints (Lightweight CSS) */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-[20%] left-[18%] w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_8px_#fbbf24] animate-sparkle-1"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="absolute top-[36%] right-[22%] w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_10px_#f59e0b] animate-sparkle-2"
            style={{ animationDelay: "1.5s" }}
          />
          <div
            className="absolute top-[62%] left-[26%] w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa] animate-sparkle-1"
            style={{ animationDelay: "2.8s" }}
          />
        </div>
      )}

      {/* 6. Subtle Digital Matrix Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] sm:opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(#d97706 1px, transparent 1px), radial-gradient(#1d4ed8 1px, transparent 1px)",
          backgroundSize: "28px 28px, 56px 56px",
          backgroundPosition: "0 0, 14px 14px",
          maskImage:
            "radial-gradient(ellipse at 50% 35%, black 20%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 35%, black 20%, transparent 85%)",
        }}
      />
    </div>
  );
}
