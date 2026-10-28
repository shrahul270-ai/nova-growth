"use client";

import React, { useEffect, useRef, useState } from "react";

interface HeaderBackgroundAnimationProps {
  variant?: "hero" | "subpage" | "dark";
  className?: string;
}

// 3D Point Interface
interface Point3D {
  x: number;
  y: number;
  z: number;
}

// 3D Sphere Definition
interface Sphere3D {
  baseX: number;
  baseY: number;
  baseZ: number;
  radius: number;
  speed: number;
  orbitRadiusX: number;
  orbitRadiusY: number;
  orbitPhase: number;
  colorType: "gold" | "sapphire" | "pearl" | "champagne" | "cyan";
}

// 3D Stardust Particle
interface StardustParticle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  color: string;
  alpha: number;
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

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const isHero = variant === "hero";
    const isDark = variant === "dark";

    // Set canvas dimensions with high-DPI scaling
    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width || window.innerWidth;
      height = rect.height || 420;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });

    // Interactive mouse / touch parallax tracking
    const mouse = {
      targetX: 0,
      targetY: 0,
      currentX: 0,
      currentY: 0,
      isActive: false,
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const relativeX = e.clientX - rect.left - rect.width / 2;
      const relativeY = e.clientY - rect.top - rect.height / 2;
      mouse.targetX = relativeX * 0.0006;
      mouse.targetY = relativeY * 0.0006;
      mouse.isActive = true;
    };

    const handleMouseLeave = () => {
      mouse.targetX = 0;
      mouse.targetY = 0;
      mouse.isActive = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const relativeX = touch.clientX - rect.left - rect.width / 2;
        const relativeY = touch.clientY - rect.top - rect.height / 2;
        mouse.targetX = relativeX * 0.0004;
        mouse.targetY = relativeY * 0.0004;
        mouse.isActive = true;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    // --- 3D SCENE OBJECTS CONFIGURATION ---

    // 1. Floating 3D Spheres with Realistic Multi-Stop Light Reflection
    const spheres: Sphere3D[] = isHero
      ? [
          {
            baseX: 180,
            baseY: -30,
            baseZ: -40,
            radius: 34,
            speed: 0.45,
            orbitRadiusX: 45,
            orbitRadiusY: 30,
            orbitPhase: 0,
            colorType: "gold",
          },
          {
            baseX: -190,
            baseY: 40,
            baseZ: 60,
            radius: 28,
            speed: 0.35,
            orbitRadiusX: 35,
            orbitRadiusY: 25,
            orbitPhase: 2.1,
            colorType: "sapphire",
          },
          {
            baseX: 280,
            baseY: 80,
            baseZ: 110,
            radius: 22,
            speed: 0.5,
            orbitRadiusX: 30,
            orbitRadiusY: 20,
            orbitPhase: 4.2,
            colorType: "champagne",
          },
          {
            baseX: -320,
            baseY: -60,
            baseZ: 80,
            radius: 24,
            speed: 0.3,
            orbitRadiusX: 40,
            orbitRadiusY: 22,
            orbitPhase: 1.2,
            colorType: "pearl",
          },
          {
            baseX: 60,
            baseY: -110,
            baseZ: -80,
            radius: 19,
            speed: 0.6,
            orbitRadiusX: 25,
            orbitRadiusY: 18,
            orbitPhase: 3.5,
            colorType: "cyan",
          },
          {
            baseX: -80,
            baseY: 120,
            baseZ: 40,
            radius: 16,
            speed: 0.4,
            orbitRadiusX: 20,
            orbitRadiusY: 15,
            orbitPhase: 5.1,
            colorType: "gold",
          },
        ]
      : [
          {
            baseX: 160,
            baseY: -20,
            baseZ: -30,
            radius: 26,
            speed: 0.45,
            orbitRadiusX: 35,
            orbitRadiusY: 25,
            orbitPhase: 0,
            colorType: "gold",
          },
          {
            baseX: -160,
            baseY: 30,
            baseZ: 50,
            radius: 22,
            speed: 0.35,
            orbitRadiusX: 30,
            orbitRadiusY: 20,
            orbitPhase: 2.2,
            colorType: "sapphire",
          },
          {
            baseX: 240,
            baseY: 60,
            baseZ: 90,
            radius: 18,
            speed: 0.5,
            orbitRadiusX: 25,
            orbitRadiusY: 18,
            orbitPhase: 4.0,
            colorType: "champagne",
          },
          {
            baseX: -240,
            baseY: -50,
            baseZ: 70,
            radius: 20,
            speed: 0.3,
            orbitRadiusX: 30,
            orbitRadiusY: 18,
            orbitPhase: 1.5,
            colorType: "pearl",
          },
          {
            baseX: 40,
            baseY: -80,
            baseZ: -60,
            radius: 15,
            speed: 0.6,
            orbitRadiusX: 20,
            orbitRadiusY: 14,
            orbitPhase: 3.2,
            colorType: "cyan",
          },
        ];

    // 2. 3D Gyroscopic Orbital Rings Definitions
    const rings = [
      {
        radius: isHero ? 340 : 260,
        tiltX: 62 * (Math.PI / 180),
        tiltY: 24 * (Math.PI / 180),
        rotSpeed: 0.003,
        primaryColor: isDark ? "rgba(245, 158, 11, 0.45)" : "rgba(217, 119, 6, 0.4)",
        glowColor: "rgba(217, 119, 6, 0.25)",
        satelliteColor: "#f59e0b",
        satelliteRadius: 5.5,
        satelliteSpeed: 0.6,
      },
      {
        radius: isHero ? 240 : 180,
        tiltX: -54 * (Math.PI / 180),
        tiltY: -32 * (Math.PI / 180),
        rotSpeed: -0.004,
        primaryColor: isDark ? "rgba(59, 130, 246, 0.45)" : "rgba(29, 78, 216, 0.35)",
        glowColor: "rgba(37, 99, 235, 0.2)",
        satelliteColor: "#60a5fa",
        satelliteRadius: 4.5,
        satelliteSpeed: -0.75,
      },
      {
        radius: isHero ? 420 : 320,
        tiltX: 40 * (Math.PI / 180),
        tiltY: 55 * (Math.PI / 180),
        rotSpeed: 0.002,
        primaryColor: "rgba(251, 191, 36, 0.3)",
        glowColor: "rgba(245, 158, 11, 0.15)",
        satelliteColor: "#fbbf24",
        satelliteRadius: 4,
        satelliteSpeed: 0.45,
      },
    ];

    // 3. 3D Geodesic Crystal (Icosahedron vertices)
    const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
    const rawIcoVertices: Point3D[] = [
      { x: -1, y: phi, z: 0 },
      { x: 1, y: phi, z: 0 },
      { x: -1, y: -phi, z: 0 },
      { x: 1, y: -phi, z: 0 },
      { x: 0, y: -1, z: phi },
      { x: 0, y: 1, z: phi },
      { x: 0, y: -1, z: -phi },
      { x: 0, y: 1, z: -phi },
      { x: phi, y: 0, z: -1 },
      { x: phi, y: 0, z: 1 },
      { x: -phi, y: 0, z: -1 },
      { x: -phi, y: 0, z: 1 },
    ];

    // Normalize and scale icosahedron
    const crystalScale = isHero ? 60 : 45;
    const crystalVertices: Point3D[] = rawIcoVertices.map((v) => {
      const len = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
      return {
        x: (v.x / len) * crystalScale,
        y: (v.y / len) * crystalScale,
        z: (v.z / len) * crystalScale,
      };
    });

    // Compute edges between pairs where distance is ~ golden ratio
    const crystalEdges: [number, number][] = [];
    for (let i = 0; i < crystalVertices.length; i++) {
      for (let j = i + 1; j < crystalVertices.length; j++) {
        const dx = crystalVertices[i].x - crystalVertices[j].x;
        const dy = crystalVertices[i].y - crystalVertices[j].y;
        const dz = crystalVertices[i].z - crystalVertices[j].z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (Math.abs(dist - (2 / Math.sqrt(1 + phi * phi)) * crystalScale) < 5) {
          crystalEdges.push([i, j]);
        }
      }
    }

    // 4. 3D Stardust Particle Volume
    const particleCount = isHero ? 48 : 34;
    const particles: StardustParticle[] = [];
    const colors = [
      "rgba(245, 158, 11,",
      "rgba(217, 119, 6,",
      "rgba(59, 130, 246,",
      "rgba(251, 191, 36,",
      "rgba(147, 197, 253,",
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 1100,
        y: (Math.random() - 0.5) * 550,
        z: (Math.random() - 0.5) * 500,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35 - 0.08,
        vz: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 2.2 + 0.9,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.45 + 0.2,
      });
    }

    // 3D Math Projection Helper
    const fov = 460;
    const project3D = (
      p: Point3D,
      cx: number,
      cy: number,
      rotX: number,
      rotY: number
    ): { x: number; y: number; z: number; scale: number; visible: boolean } => {
      // 1. Rotate around Y axis (Yaw)
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const x1 = p.x * cosY - p.z * sinY;
      const z1 = p.x * sinY + p.z * cosY;

      // 2. Rotate around X axis (Pitch)
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const y2 = p.y * cosX - z1 * sinX;
      const z2 = p.y * sinX + z1 * cosX;

      const depth = fov + z2;
      if (depth <= 20) {
        return { x: 0, y: 0, z: z2, scale: 0, visible: false };
      }

      const scale = fov / depth;
      return {
        x: cx + x1 * scale,
        y: cy + y2 * scale,
        z: z2,
        scale,
        visible: true,
      };
    };

    // Render 3D Sphere with Realistic Specular Highlight & Volumetric Shading
    const draw3DSphere = (
      screenX: number,
      screenY: number,
      radius: number,
      colorType: Sphere3D["colorType"],
      alphaMultiplier: number
    ) => {
      if (radius <= 0.5) return;

      // Realistic light source offset (coming from top-left, matching hero 3D centerpiece)
      const lightOffsetX = -radius * 0.35;
      const lightOffsetY = -radius * 0.35;
      const highlightX = screenX + lightOffsetX;
      const highlightY = screenY + lightOffsetY;

      // 1. Soft Ambient Depth Drop-Shadow
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(
        screenX,
        screenY + radius * 0.9,
        radius * 0.85,
        radius * 0.28,
        0,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = `rgba(9, 20, 39, ${0.18 * alphaMultiplier})`;
      ctx.filter = `blur(${Math.max(4, radius * 0.25)}px)`;
      ctx.fill();
      ctx.restore();

      // 2. Main 3D Shaded Sphere
      const grad = ctx.createRadialGradient(
        highlightX,
        highlightY,
        Math.max(1, radius * 0.08),
        screenX,
        screenY,
        radius
      );

      if (colorType === "gold") {
        grad.addColorStop(0, `rgba(255, 255, 255, ${0.95 * alphaMultiplier})`);
        grad.addColorStop(0.18, `rgba(254, 240, 138, ${0.9 * alphaMultiplier})`);
        grad.addColorStop(0.45, `rgba(245, 158, 11, ${0.85 * alphaMultiplier})`);
        grad.addColorStop(0.8, `rgba(217, 119, 6, ${0.88 * alphaMultiplier})`);
        grad.addColorStop(1, `rgba(120, 53, 15, ${0.92 * alphaMultiplier})`);
      } else if (colorType === "sapphire") {
        grad.addColorStop(0, `rgba(255, 255, 255, ${0.95 * alphaMultiplier})`);
        grad.addColorStop(0.2, `rgba(191, 219, 254, ${0.9 * alphaMultiplier})`);
        grad.addColorStop(0.5, `rgba(59, 130, 246, ${0.85 * alphaMultiplier})`);
        grad.addColorStop(0.82, `rgba(29, 78, 216, ${0.9 * alphaMultiplier})`);
        grad.addColorStop(1, `rgba(15, 23, 42, ${0.95 * alphaMultiplier})`);
      } else if (colorType === "champagne") {
        grad.addColorStop(0, `rgba(255, 255, 255, ${0.98 * alphaMultiplier})`);
        grad.addColorStop(0.25, `rgba(253, 230, 138, ${0.9 * alphaMultiplier})`);
        grad.addColorStop(0.6, `rgba(217, 119, 6, ${0.75 * alphaMultiplier})`);
        grad.addColorStop(0.88, `rgba(180, 83, 9, ${0.85 * alphaMultiplier})`);
        grad.addColorStop(1, `rgba(69, 26, 3, ${0.9 * alphaMultiplier})`);
      } else if (colorType === "cyan") {
        grad.addColorStop(0, `rgba(255, 255, 255, ${0.95 * alphaMultiplier})`);
        grad.addColorStop(0.25, `rgba(165, 243, 252, ${0.85 * alphaMultiplier})`);
        grad.addColorStop(0.6, `rgba(6, 182, 212, ${0.8 * alphaMultiplier})`);
        grad.addColorStop(0.85, `rgba(14, 116, 144, ${0.85 * alphaMultiplier})`);
        grad.addColorStop(1, `rgba(8, 51, 68, ${0.9 * alphaMultiplier})`);
      } else {
        // Pearl / Iridescent Opal
        grad.addColorStop(0, `rgba(255, 255, 255, ${0.95 * alphaMultiplier})`);
        grad.addColorStop(0.3, `rgba(241, 245, 249, ${0.85 * alphaMultiplier})`);
        grad.addColorStop(0.65, `rgba(203, 213, 225, ${0.75 * alphaMultiplier})`);
        grad.addColorStop(0.85, `rgba(148, 163, 184, ${0.8 * alphaMultiplier})`);
        grad.addColorStop(1, `rgba(71, 85, 105, ${0.85 * alphaMultiplier})`);
      }

      ctx.save();
      ctx.beginPath();
      ctx.arc(screenX, screenY, radius, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.shadowColor =
        colorType === "sapphire"
          ? "rgba(59, 130, 246, 0.4)"
          : "rgba(245, 158, 11, 0.4)";
      ctx.shadowBlur = radius * 0.45;
      ctx.fill();
      ctx.shadowBlur = 0;

      // 3. Crisp Specular Glint Spot
      ctx.beginPath();
      ctx.arc(
        highlightX,
        highlightY,
        Math.max(1.2, radius * 0.22),
        0,
        Math.PI * 2
      );
      ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * alphaMultiplier})`;
      ctx.fill();

      // 4. Subtle Outer Fresnel Rim Glow Ring
      ctx.beginPath();
      ctx.arc(screenX, screenY, radius, 0, Math.PI * 2);
      ctx.strokeStyle =
        colorType === "sapphire"
          ? `rgba(147, 197, 253, ${0.45 * alphaMultiplier})`
          : `rgba(254, 243, 199, ${0.45 * alphaMultiplier})`;
      ctx.lineWidth = Math.max(0.75, radius * 0.05);
      ctx.stroke();

      ctx.restore();
    };

    // Animation Timing & Lifecycle
    let isVisible = true;
    const handleVisibility = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    let lastTime = performance.now();
    let globalTime = 0;
    let cameraRotX = 0;
    let cameraRotY = 0;

    // Render loop
    const render = (now: number) => {
      if (!isVisible) return;

      const dt = Math.min((now - lastTime) / 1000, 0.08);
      lastTime = now;
      globalTime += dt;

      ctx.clearRect(0, 0, width, height);

      // Center of 3D projection
      // For Hero variant on desktop, bias center slightly to the right to frame the 3D visual hub
      const centerX =
        isHero && width >= 1024 ? width * 0.58 : width * 0.5;
      const centerY = height * 0.48;

      // Smooth camera interpolation with gentle idle sinusoidal breathing + mouse parallax
      const targetCamX =
        mouse.targetY + Math.sin(globalTime * 0.45) * 0.08;
      const targetCamY =
        mouse.targetX + Math.cos(globalTime * 0.35) * 0.12;

      cameraRotX += (targetCamX - cameraRotX) * 0.05;
      cameraRotY += (targetCamY - cameraRotY) * 0.05;

      // --- 1. RENDER 3D STARDUST PARTICLE FIELD ---
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx * (dt * 60);
        p.y += p.vy * (dt * 60);
        p.z += p.vz * (dt * 60);

        // Bounding wrap
        if (p.x < -600) p.x = 600;
        if (p.x > 600) p.x = -600;
        if (p.y < -300) p.y = 300;
        if (p.y > 300) p.y = -300;
        if (p.z < -250) p.z = 250;
        if (p.z > 250) p.z = -250;

        const proj = project3D(p, centerX, centerY, cameraRotX, cameraRotY);
        if (proj.visible) {
          const depthAlpha = Math.max(
            0.05,
            Math.min(p.alpha * proj.scale * 1.2, 0.85)
          );
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, Math.max(0.6, p.size * proj.scale), 0, Math.PI * 2);
          ctx.fillStyle = `${p.color} ${depthAlpha})`;
          ctx.fill();
        }
      }

      // --- 2. RENDER 3D GEODESIC CRYSTAL MESH (Background floating technical polyhedron) ---
      const crystalCenter: Point3D = {
        x: isHero ? 220 : 150,
        y: -40 + Math.sin(globalTime * 0.6) * 15,
        z: 40 + Math.cos(globalTime * 0.5) * 20,
      };

      const crystalSpinY = globalTime * 0.35;
      const crystalSpinX = globalTime * 0.25;

      const projectedCrystalVerts = crystalVertices.map((v) => {
        // Rotate locally
        const cosY = Math.cos(crystalSpinY);
        const sinY = Math.sin(crystalSpinY);
        const x1 = v.x * cosY - v.z * sinY;
        const z1 = v.x * sinY + v.z * cosY;

        const cosX = Math.cos(crystalSpinX);
        const sinX = Math.sin(crystalSpinX);
        const y2 = v.y * cosX - z1 * sinX;
        const z2 = v.y * sinX + z1 * cosX;

        return project3D(
          {
            x: crystalCenter.x + x1,
            y: crystalCenter.y + y2,
            z: crystalCenter.z + z2,
          },
          centerX,
          centerY,
          cameraRotX,
          cameraRotY
        );
      });

      // Draw crystal wireframe edges with glowing gradient
      ctx.save();
      for (let i = 0; i < crystalEdges.length; i++) {
        const [idx1, idx2] = crystalEdges[i];
        const p1 = projectedCrystalVerts[idx1];
        const p2 = projectedCrystalVerts[idx2];

        if (p1.visible && p2.visible) {
          const avgScale = (p1.scale + p2.scale) * 0.5;
          const edgeAlpha = Math.max(0.08, Math.min(0.28 * avgScale, 0.45));
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(217, 119, 6, ${edgeAlpha})`;
          ctx.lineWidth = Math.max(0.6, 1.2 * avgScale);
          ctx.stroke();
        }
      }

      // Glowing nodes at crystal vertices
      for (let i = 0; i < projectedCrystalVerts.length; i++) {
        const p = projectedCrystalVerts[i];
        if (p.visible) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(1, 2.2 * p.scale), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(245, 158, 11, ${0.45 * p.scale})`;
          ctx.fill();
        }
      }
      ctx.restore();

      // --- 3. RENDER 3D GYROSCOPIC ORBITAL RINGS & SATELLITES ---
      rings.forEach((ring, ringIdx) => {
        const ringAngle = globalTime * ring.rotSpeed * 60;
        const segments = 64;
        const ringPoints: { proj: ReturnType<typeof project3D>; angle: number }[] = [];

        // Sample 3D points along the ring circumference
        for (let s = 0; s <= segments; s++) {
          const theta = (s / segments) * Math.PI * 2;
          // Local ring circle in XZ plane
          const localX = Math.cos(theta) * ring.radius;
          const localZ = Math.sin(theta) * ring.radius;
          const localY = 0;

          // Apply ring tilt around X and Y
          const cosTX = Math.cos(ring.tiltX);
          const sinTX = Math.sin(ring.tiltX);
          const y1 = localY * cosTX - localZ * sinTX;
          const z1 = localY * sinTX + localZ * cosTX;

          const cosTY = Math.cos(ring.tiltY + ringAngle);
          const sinTY = Math.sin(ring.tiltY + ringAngle);
          const x2 = localX * cosTY - z1 * sinTY;
          const z2 = localX * sinTY + z1 * cosTY;

          const proj = project3D(
            { x: x2, y: y1, z: z2 },
            centerX,
            centerY,
            cameraRotX,
            cameraRotY
          );
          ringPoints.push({ proj, angle: theta });
        }

        // Draw ring segments with depth fade (foreground brighter, background softer)
        for (let s = 0; s < segments; s++) {
          const pt1 = ringPoints[s];
          const pt2 = ringPoints[s + 1];

          if (pt1.proj.visible && pt2.proj.visible) {
            const avgZ = (pt1.proj.z + pt2.proj.z) * 0.5;
            // z ranges from roughly -250 (front) to +250 (back)
            const depthFactor = Math.max(
              0.15,
              Math.min(1 - avgZ / (fov * 0.9), 1.2)
            );

            ctx.beginPath();
            ctx.moveTo(pt1.proj.x, pt1.proj.y);
            ctx.lineTo(pt2.proj.x, pt2.proj.y);
            ctx.strokeStyle = ring.primaryColor;
            ctx.lineWidth = Math.max(0.6, (ringIdx === 0 ? 2.2 : 1.5) * depthFactor);
            ctx.stroke();
          }
        }

        // Orbiting Satellite Pearl on this ring
        const satAngle = (globalTime * ring.satelliteSpeed) % (Math.PI * 2);
        const satLocalX = Math.cos(satAngle) * ring.radius;
        const satLocalZ = Math.sin(satAngle) * ring.radius;

        const cosTX = Math.cos(ring.tiltX);
        const sinTX = Math.sin(ring.tiltX);
        const satY1 = -satLocalZ * sinTX;
        const satZ1 = satLocalZ * cosTX;

        const cosTY = Math.cos(ring.tiltY + ringAngle);
        const sinTY = Math.sin(ring.tiltY + ringAngle);
        const satX2 = satLocalX * cosTY - satZ1 * sinTY;
        const satZ2 = satLocalX * sinTY + satZ1 * cosTY;

        const satProj = project3D(
          { x: satX2, y: satY1, z: satZ2 },
          centerX,
          centerY,
          cameraRotX,
          cameraRotY
        );

        if (satProj.visible) {
          const satRadius = Math.max(2, ring.satelliteRadius * satProj.scale);
          ctx.save();
          ctx.beginPath();
          ctx.arc(satProj.x, satProj.y, satRadius, 0, Math.PI * 2);
          ctx.fillStyle = ring.satelliteColor;
          ctx.shadowColor = ring.satelliteColor;
          ctx.shadowBlur = satRadius * 2.2;
          ctx.fill();
          ctx.restore();
        }
      });

      // --- 4. RENDER 3D SPHERES WITH Z-DEPTH SORTING ---
      // Compute 3D position of each sphere
      const sphereDrawList = spheres.map((s) => {
        const orbitAngle = globalTime * s.speed + s.orbitPhase;
        const curX = s.baseX + Math.cos(orbitAngle) * s.orbitRadiusX;
        const curY = s.baseY + Math.sin(orbitAngle * 1.2) * s.orbitRadiusY;
        const curZ = s.baseZ + Math.sin(orbitAngle) * (s.orbitRadiusX * 0.7);

        const proj = project3D(
          { x: curX, y: curY, z: curZ },
          centerX,
          centerY,
          cameraRotX,
          cameraRotY
        );

        return {
          proj,
          sphere: s,
          z: proj.z,
          screenRadius: s.radius * proj.scale,
        };
      });

      // Sort from back to front (+Z to -Z)
      sphereDrawList.sort((a, b) => b.z - a.z);

      // Render sorted 3D spheres
      sphereDrawList.forEach(({ proj, sphere, screenRadius }) => {
        if (proj.visible) {
          const alphaMult = Math.max(0.35, Math.min(proj.scale * 1.15, 1));
          draw3DSphere(
            proj.x,
            proj.y,
            screenRadius,
            sphere.colorType,
            alphaMult
          );
        }
      });

      // Connective 3D filaments between close spheres
      for (let i = 0; i < sphereDrawList.length; i++) {
        for (let j = i + 1; j < sphereDrawList.length; j++) {
          const s1 = sphereDrawList[i];
          const s2 = sphereDrawList[j];
          if (s1.proj.visible && s2.proj.visible) {
            const dx = s1.proj.x - s2.proj.x;
            const dy = s1.proj.y - s2.proj.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 180) {
              const lineAlpha = (1 - dist / 180) * 0.18;
              ctx.beginPath();
              ctx.moveTo(s1.proj.x, s1.proj.y);
              ctx.lineTo(s2.proj.x, s2.proj.y);
              ctx.strokeStyle = `rgba(217, 119, 6, ${lineAlpha})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    if (!prefersReducedMotion) {
      animationFrameId = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
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
      {/* 1. Primary Radiant Aurora Beacon (Center Warm Golden & Sapphire Glow) */}
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 rounded-full blur-[85px] sm:blur-[120px] will-change-transform ${
          isHero
            ? "w-[650px] sm:w-[980px] h-[400px] sm:h-[580px] opacity-75"
            : isDark
            ? "w-[600px] sm:w-[860px] h-[350px] sm:h-[490px] opacity-65"
            : "w-[550px] sm:w-[820px] h-[320px] sm:h-[460px] opacity-70"
        }`}
        style={{
          background: isDark
            ? "radial-gradient(circle at 50% 35%, rgba(217, 119, 6, 0.32) 0%, rgba(245, 158, 11, 0.18) 40%, rgba(29, 78, 216, 0.15) 70%, transparent 85%)"
            : "radial-gradient(circle at 50% 35%, rgba(245, 158, 11, 0.25) 0%, rgba(217, 119, 6, 0.18) 40%, rgba(29, 78, 216, 0.1) 70%, transparent 85%)",
          animation: "auroraPulseSlow 9s ease-in-out infinite alternate",
        }}
      />

      {/* 2. Floating Amber Gold Light Beacon (Left) */}
      <div
        className={`absolute rounded-full blur-[65px] sm:blur-[95px] will-change-transform ${
          isHero
            ? "-top-10 left-[8%] w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] opacity-60"
            : "-top-6 left-[5%] w-[260px] sm:w-[390px] h-[260px] sm:h-[390px] opacity-50"
        }`}
        style={{
          background:
            "radial-gradient(circle, rgba(217, 119, 6, 0.26) 0%, rgba(245, 158, 11, 0.14) 50%, transparent 80%)",
          animation: "ribbonFloat1 15s ease-in-out infinite alternate",
        }}
      />

      {/* 3. Floating Sapphire Royal Blue Light Beacon (Right) */}
      <div
        className={`absolute rounded-full blur-[70px] sm:blur-[100px] will-change-transform ${
          isHero
            ? "top-6 right-[6%] w-[340px] sm:w-[520px] h-[340px] sm:h-[520px] opacity-55"
            : "top-2 right-[4%] w-[280px] sm:w-[420px] h-[280px] sm:h-[420px] opacity-45"
        }`}
        style={{
          background:
            "radial-gradient(circle, rgba(29, 78, 216, 0.2) 0%, rgba(37, 99, 235, 0.12) 50%, rgba(217, 119, 6, 0.08) 75%, transparent 85%)",
          animation: "ribbonFloat2 17s ease-in-out infinite alternate",
        }}
      />

      {/* 4. Interactive Live 3D Perspective Projection Canvas Engine */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block pointer-events-none"
      />

      {/* 5. 3D CSS Depth Accents & Sparkling Star Glints */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Glint Star 1 */}
          <div
            className="absolute top-[18%] left-[16%] w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_12px_#fbbf24] animate-sparkle-1"
            style={{ animationDelay: "0s" }}
          />
          {/* Glint Star 2 */}
          <div
            className="absolute top-[34%] right-[19%] w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_14px_#f59e0b] animate-sparkle-2"
            style={{ animationDelay: "1.4s" }}
          />
          {/* Glint Star 3 */}
          <div
            className="absolute top-[58%] left-[24%] w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_10px_#60a5fa] animate-sparkle-1"
            style={{ animationDelay: "2.7s" }}
          />
          {/* Glint Star 4 */}
          <div
            className="absolute top-[68%] right-[22%] w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_12px_#f59e0b] animate-sparkle-3"
            style={{ animationDelay: "0.8s" }}
          />
        </div>
      )}

      {/* 6. Subtle Digital Matrix Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.035] sm:opacity-[0.05]"
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
