"use client";

import React, { useEffect, useRef, useState } from "react";

interface HeaderBackgroundAnimationProps {
  variant?: "hero" | "subpage" | "dark";
  className?: string;
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
    let isMobile = false;

    const isHero = variant === "hero";
    const isDark = variant === "dark";

    // Set canvas dimensions with capped DPR to maintain crispness and solid 60 FPS
    const resizeCanvas = () => {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      width = rect.width || window.innerWidth;
      height = rect.height || (isHero ? 560 : 380);
      isMobile = width < 768;

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

    // IntersectionObserver: pauses animation when scrolled away (0% CPU/GPU overhead)
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

    // Mouse tracking with smooth spring damping
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      active: false,
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      const rect = container.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / (rect.width || 1) - 0.5;
      const relY = (e.clientY - rect.top) / (rect.height || 1) - 0.5;
      mouse.targetX = relX * 2;
      mouse.targetY = relY * 2;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.targetX = 0;
      mouse.targetY = 0;
      mouse.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    const handleVisibility = () => {
      isVisible = !document.hidden;
      if (isVisible && isIntersecting) {
        lastTime = performance.now();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    // -------------------------------------------------------------
    // 3D "DYNAMIC GLOWING WAVES" ENGINE
    // Inspired by golden & cyan luminous particle undulating wave fields
    // -------------------------------------------------------------
    const cols = isMobile ? 65 : isHero ? 115 : 95;
    const rows = isMobile ? 32 : isHero ? 48 : 42;
    const totalPoints = cols * rows;

    // Pre-allocated typed arrays for zero GC allocations during animation loop
    const baseGridX = new Float32Array(totalPoints);
    const baseGridZ = new Float32Array(totalPoints);
    const pointCyanWeight = new Float32Array(totalPoints); // 0 = Pure Gold, 1 = Cyan Crest

    // Grid geometry sizing
    const gridSpanX = isHero ? 1900 : 1600;
    const gridSpanZ = isHero ? 1150 : 950;
    const stepX = gridSpanX / (cols - 1);
    const stepZ = gridSpanZ / (rows - 1);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const idx = r * cols + c;
        const x = (c - (cols - 1) * 0.5) * stepX;
        const z = r * stepZ - 120; // from foreground (-120) to deep distance

        baseGridX[idx] = x;
        baseGridZ[idx] = z;

        // Distinct dual-ridge signature as seen in reference image:
        // Upper wave crest has glowing cyan/frost-blue highlights,
        // while lower/main wave has warm golden honey/amber hues.
        const normalizedZ = r / (rows - 1);
        const waveDiagonal = Math.sin(x * 0.0028 + normalizedZ * 3.2);
        // Cyan crest concentrates along the higher back-mid ridge
        let cyan = Math.max(0, Math.min(1, (normalizedZ - 0.28) * 2.2 + waveDiagonal * 0.4));
        // Soften lower edge
        if (normalizedZ > 0.88) cyan *= 1 - (normalizedZ - 0.88) / 0.12;
        pointCyanWeight[idx] = cyan;
      }
    }

    // Pre-computed color bins for ultra-fast batched Canvas rendering
    // Eliminates thousands of ctx.fillStyle calls down to ~14 batch fills
    const colorBuckets = [
      // 0 - 4: Warm Gold / Amber Spectrum (Base to Peak)
      "rgba(146, 64, 14, 0.35)",  // Deep amber shadow
      "rgba(180, 83, 9, 0.55)",   // Warm bronze
      "rgba(217, 119, 6, 0.75)",  // Brand amber
      "rgba(245, 158, 11, 0.88)", // Bright gold
      "rgba(251, 191, 36, 0.95)", // Luminous champagne
      "rgba(254, 240, 138, 0.98)",// Gold peak crest glint

      // 6 - 10: Glowing Cyan / Electric Blue Spectrum (Crest ridge in reference image)
      "rgba(14, 116, 144, 0.45)", // Deep cyan
      "rgba(2, 132, 199, 0.65)",  // Electric sapphire
      "rgba(14, 165, 233, 0.82)", // Vibrant sky cyan
      "rgba(56, 189, 248, 0.92)", // Luminous cyan crest
      "rgba(125, 211, 252, 0.96)",// Radiant frost cyan
      "rgba(255, 255, 255, 0.98)",// Pure brilliant diamond crest highlight
    ];

    const numBuckets = colorBuckets.length;
    const bucketPaths: Path2D[] = Array.from({ length: numBuckets }, () => new Path2D());

    // 3D Camera & Projection Parameters
    const fov = 440;
    const baseCamY = isHero ? -130 : -110;
    const basePitch = 0.44; // ~25 degrees tilt downwards looking at the wave field
    const waveAmp = isHero ? (isMobile ? 38 : 62) : isMobile ? 28 : 46;

    let time = 0;
    let lastTime = performance.now();

    const render = (now: number) => {
      if (!isIntersecting || !isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      time += dt * 0.85;

      // Smooth mouse follow
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Camera orientation with subtle interactive parallax
      const camPitch = basePitch + mouse.y * 0.08;
      const camYaw = mouse.x * 0.12;
      const camY = baseCamY + mouse.y * 25;

      const cosPitch = Math.cos(camPitch);
      const sinPitch = Math.sin(camPitch);
      const cosYaw = Math.cos(camYaw);
      const sinYaw = Math.sin(camYaw);

      const cx = width * 0.5;
      const cy = height * (isHero ? 0.58 : 0.62);

      // Reset path batches
      for (let b = 0; b < numBuckets; b++) {
        bucketPaths[b] = new Path2D();
      }

      // Compute wave displacement and project all points
      for (let i = 0; i < totalPoints; i++) {
        const x = baseGridX[i];
        const z = baseGridZ[i];
        const cyan = pointCyanWeight[i];

        // Complex Multi-Harmonic Wave Equation:
        // Produces the majestic sinuous undulating terrain from the reference image
        const w1 = Math.sin(x * 0.0032 + time * 1.1 + z * 0.0024);
        const w2 = Math.cos(x * 0.0058 - z * 0.0042 + time * 1.35);
        const w3 = Math.sin((x * 0.008 + z * 0.006) - time * 0.85);
        const w4 = Math.sin(x * 0.0018 + z * 0.003 + time * 0.6);

        // Sweeping cross-ridge that creates the distinct dual/triple glowing crest lines
        const ridgeEnvelope = Math.sin(x * 0.0026 + (z / gridSpanZ) * 3.4 + time * 0.4);

        // Combined vertical displacement Y (upwards in canvas is negative Y)
        const elevation = (w1 * 0.48 + w2 * 0.34 + w3 * 0.18 + w4 * 0.22 + ridgeEnvelope * 0.32) * waveAmp;
        const y = elevation;

        // 3D Rotation (Yaw then Pitch)
        // 1. Yaw rotation around Y axis
        const xRot = x * cosYaw - z * sinYaw;
        const zRot = x * sinYaw + z * cosYaw;

        // 2. Pitch rotation around X axis (shifted by camera Y)
        const yCam = y - camY;
        const yRot = yCam * cosPitch - zRot * sinPitch;
        const depth = yCam * sinPitch + zRot * cosPitch;

        // Clip points too close or behind the camera
        if (depth < 40) continue;

        const scale = fov / (fov + depth);
        const projX = cx + xRot * scale;
        const projY = cy + yRot * scale;

        // Frustum cull points outside screen bounds
        if (projX < -40 || projX > width + 40 || projY < -40 || projY > height + 40) {
          continue;
        }

        // Particle size scaled by perspective depth
        // Foreground points are larger and crisp, distance points are delicate
        const depthRatio = Math.max(0, Math.min(1, 1 - (depth - 80) / (gridSpanZ + 200)));
        const pointSize = Math.max(0.65, (isMobile ? 1.8 : 2.6) * scale * (0.8 + depthRatio * 0.5));

        // Shading / Elevation Intensity calculation:
        // Crests receive luminous highlights and diamond sparkle
        const normElev = Math.max(0, Math.min(1, (elevation + waveAmp * 1.1) / (waveAmp * 2.2)));

        let bucketIdx: number;
        if (cyan > 0.48 && normElev > 0.45) {
          // Cyan Crest Highlight Range (Buckets 6 - 11)
          const cyanIntensity = (normElev - 0.45) / 0.55;
          if (cyanIntensity > 0.88) {
            bucketIdx = 11; // Brilliant diamond highlight
          } else if (cyanIntensity > 0.68) {
            bucketIdx = 10; // Frost cyan
          } else if (cyanIntensity > 0.45) {
            bucketIdx = 9;  // Sky cyan
          } else if (cyanIntensity > 0.22) {
            bucketIdx = 8;  // Electric cyan
          } else if (cyanIntensity > 0.08) {
            bucketIdx = 7;
          } else {
            bucketIdx = 6;
          }
        } else {
          // Warm Gold / Amber Terrain Range (Buckets 0 - 5)
          if (normElev > 0.85) {
            bucketIdx = 5; // Gold peak crest
          } else if (normElev > 0.68) {
            bucketIdx = 4; // Champagne
          } else if (normElev > 0.48) {
            bucketIdx = 3; // Bright gold
          } else if (normElev > 0.32) {
            bucketIdx = 2; // Brand amber
          } else if (normElev > 0.16) {
            bucketIdx = 1; // Warm bronze
          } else {
            bucketIdx = 0; // Deep shadow
          }
        }

        // Add circle to corresponding color bucket path
        const p = bucketPaths[bucketIdx];
        p.moveTo(projX + pointSize, projY);
        p.arc(projX, projY, pointSize, 0, Math.PI * 2);
      }

      // Draw all color buckets in unified batch passes (Ultra fast!)
      for (let b = 0; b < numBuckets; b++) {
        ctx.fillStyle = colorBuckets[b];
        ctx.fill(bucketPaths[b]);
      }

      animationFrameId = requestAnimationFrame(render);
    };

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
      {/* 1. Atmospheric Golden Dusk Radiant Glow (Matching image background) */}
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 rounded-full blur-[70px] sm:blur-[110px] will-change-transform pointer-events-none ${
          isHero
            ? "w-[650px] sm:w-[980px] h-[340px] sm:h-[480px] opacity-75"
            : isDark
            ? "w-[500px] sm:w-[780px] h-[280px] sm:h-[390px] opacity-65"
            : "w-[480px] sm:w-[720px] h-[260px] sm:h-[360px] opacity-65"
        }`}
        style={{
          background: isDark
            ? "radial-gradient(ellipse at 50% 35%, rgba(217, 119, 6, 0.32) 0%, rgba(245, 158, 11, 0.18) 40%, rgba(14, 165, 233, 0.12) 70%, transparent 85%)"
            : "radial-gradient(ellipse at 50% 30%, rgba(245, 158, 11, 0.28) 0%, rgba(217, 119, 6, 0.18) 42%, rgba(14, 165, 233, 0.08) 72%, transparent 85%)",
        }}
      />

      {/* 2. Soft Ambient Cyan Horizon Beacon (Highlights the cyan wave crests) */}
      <div
        className={`absolute rounded-full blur-[60px] sm:blur-[95px] will-change-transform pointer-events-none ${
          isHero
            ? "top-8 right-[15%] w-[320px] sm:w-[480px] h-[220px] sm:h-[320px] opacity-45"
            : "top-4 right-[10%] w-[260px] sm:w-[380px] h-[180px] sm:h-[260px] opacity-35"
        }`}
        style={{
          background:
            "radial-gradient(circle, rgba(14, 165, 233, 0.25) 0%, rgba(56, 189, 248, 0.12) 50%, transparent 80%)",
        }}
      />

      {/* 3. Deep Warm Honey/Amber Splay (Enhances golden body glow) */}
      <div
        className={`absolute rounded-full blur-[55px] sm:blur-[85px] will-change-transform pointer-events-none ${
          isHero
            ? "bottom-4 left-[12%] w-[300px] sm:w-[460px] h-[240px] sm:h-[340px] opacity-40"
            : "bottom-2 left-[8%] w-[240px] sm:w-[360px] h-[190px] sm:h-[270px] opacity-30"
        }`}
        style={{
          background:
            "radial-gradient(circle, rgba(217, 119, 6, 0.24) 0%, rgba(245, 158, 11, 0.12) 50%, transparent 80%)",
        }}
      />

      {/* 4. The 3D Dynamic Glowing Waves Canvas Engine */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block pointer-events-none"
      />

      {/* 5. Delicate Sparkling Star Glints (Crest Twinkles) */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-[28%] left-[22%] w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_10px_#fbbf24] animate-sparkle-1 opacity-80"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="absolute top-[38%] right-[28%] w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_12px_#38bdf8] animate-sparkle-2 opacity-90"
            style={{ animationDelay: "1.4s" }}
          />
          <div
            className="absolute top-[52%] left-[45%] w-1.5 h-1.5 rounded-full bg-amber-200 shadow-[0_0_8px_#fde68a] animate-sparkle-1 opacity-70"
            style={{ animationDelay: "2.6s" }}
          />
          <div
            className="absolute top-[32%] right-[16%] w-1.5 h-1.5 rounded-full bg-cyan-200 shadow-[0_0_8px_#a5f3fc] animate-sparkle-2 opacity-75"
            style={{ animationDelay: "3.5s" }}
          />
        </div>
      )}

      {/* 6. Smooth Fade Vignette at Top and Bottom for Seamless Content Integration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? "linear-gradient(to bottom, rgba(9, 20, 39, 0.4) 0%, transparent 22%, transparent 75%, rgba(9, 20, 39, 0.85) 100%)"
            : "linear-gradient(to bottom, rgba(248, 250, 253, 0.4) 0%, transparent 20%, transparent 75%, rgba(248, 250, 253, 0.9) 100%)",
        }}
      />
    </div>
  );
}
