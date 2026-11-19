"use client";

import React, { useState } from "react";

export default function MotionCta3DOrb() {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 32; // -16 to +16 deg
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -32;
    setRotate({ x: y, y: x });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center shrink-0 cursor-pointer select-none group"
      style={{
        perspective: "900px",
      }}
    >
      {/* Dynamic 3D Floating & Interactive Perspective Container */}
      <div
        className="relative w-full h-full flex items-center justify-center transition-transform duration-300 ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(${isHovered ? 1.08 : 1})`,
        }}
      >
        {/* Volumetric Radial Glow Halo */}
        <div
          className="absolute inset-1 rounded-full blur-2xl opacity-75 pointer-events-none transition-opacity duration-500 group-hover:opacity-100 animate-pulse-glow"
          style={{
            background:
              "radial-gradient(circle, rgba(168,85,247,0.7) 0%, rgba(99,102,241,0.5) 45%, rgba(252,211,77,0.35) 80%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        {/* Outer 3D Gyroscope Ring 1 (Tilted & Continuously Rotating) */}
        <div
          className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-purple-400/40 pointer-events-none"
          style={{
            transformStyle: "preserve-3d",
            animation: "orbitSpin1 9s linear infinite",
            boxShadow:
              "0 0 16px rgba(168,85,247,0.45), inset 0 0 10px rgba(168,85,247,0.25)",
          }}
        >
          {/* Glowing Amber Satellite Node on Ring 1 */}
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#fcd34d] shadow-[0_0_12px_#fcd34d]" />
        </div>

        {/* Inner 3D Gyroscope Ring 2 (Counter-Tilted & Reverse Rotating) */}
        <div
          className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-indigo-400/40 pointer-events-none"
          style={{
            transformStyle: "preserve-3d",
            animation: "orbitSpin2 7s linear infinite",
            boxShadow:
              "0 0 14px rgba(99,102,241,0.4), inset 0 0 8px rgba(99,102,241,0.2)",
          }}
        >
          {/* Glowing Purple Satellite Node on Ring 2 */}
          <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#a855f7] shadow-[0_0_12px_#a855f7]" />
        </div>

        {/* Central 3D Volumetric Metallic Sphere */}
        <div
          className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shadow-2xl transition-all duration-500"
          style={{
            background:
              "radial-gradient(circle at 32% 28%, #ffffff 0%, #fcd34d 18%, #f59e0b 36%, #9333ea 68%, #4f46e5 88%, #090e1a 100%)",
            boxShadow:
              "inset -10px -10px 24px rgba(9, 14, 26, 0.95), inset 6px 6px 14px rgba(255, 255, 255, 0.9), 0 20px 40px -8px rgba(168, 85, 247, 0.55), 0 0 32px rgba(252, 211, 77, 0.35)",
          }}
        >
          {/* High-Gloss Specular Glare */}
          <div
            className="absolute top-2 left-2.5 w-7 h-4 rounded-full bg-white/75 blur-[1px] rotate-[-28deg] pointer-events-none"
            aria-hidden="true"
          />
          {/* Secondary Iridescent Rim Reflection */}
          <div
            className="absolute bottom-1 right-2.5 w-8 h-4 rounded-full bg-purple-400/50 blur-[2px] pointer-events-none"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}
