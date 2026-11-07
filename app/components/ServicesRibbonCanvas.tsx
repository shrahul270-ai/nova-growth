"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export interface RibbonServiceItem {
  id: string;
  name: string;
  caption: string;
  statLeft: string;
  statLeftLabel: string;
  statRight: string;
  statRightLabel: string;
  photoUrl: string;
  videoUrl?: string;
  aspect: number;
  targetUrl: string;
}

const DEFAULT_RIBBON_SERVICES: RibbonServiceItem[] = [
  {
    id: "seo-optimization",
    name: "SEO Optimization",
    caption: "SEO Optimization",
    statLeft: "+240%",
    statLeftLabel: "Visitors",
    statRight: "+180%",
    statRightLabel: "Inquiries",
    photoUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1280&q=80",
    videoUrl: "https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/living-portrait-hero.mp4",
    aspect: 1.745,
    targetUrl: "/services/seo-optimization",
  },
  {
    id: "website-development",
    name: "Website Development",
    caption: "Website Development",
    statLeft: "99/100",
    statLeftLabel: "PageSpeed",
    statRight: "<1.1s",
    statRightLabel: "Core Vitals",
    photoUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1280&q=80",
    videoUrl: "https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/mossline-hero.mp4",
    aspect: 1.700,
    targetUrl: "/services/website-development",
  },
  {
    id: "content-writing",
    name: "Content Writing",
    caption: "Content Writing",
    statLeft: "+362%",
    statLeftLabel: "Leads",
    statRight: "+75%",
    statRightLabel: "Bookings",
    photoUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1280&q=80",
    videoUrl: "https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/fernhollow.mp4",
    aspect: 1.735,
    targetUrl: "/services/content-writing",
  },
  {
    id: "email-marketing",
    name: "Email Marketing",
    caption: "Email Marketing",
    statLeft: "42.8%",
    statLeftLabel: "Open Rate",
    statRight: "3.8x",
    statRightLabel: "Retention ROI",
    photoUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1280&q=80",
    videoUrl: "https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/vell-lookbook.mp4",
    aspect: 1.837,
    targetUrl: "/services/email-marketing",
  },
  {
    id: "backlink-building",
    name: "Off Page Backlinks",
    caption: "Off Page Backlinks",
    statLeft: "DR 50–90+",
    statLeftLabel: "Editorial Sites",
    statRight: "100%",
    statRightLabel: "Manual Outreach",
    photoUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1280&q=80",
    videoUrl: "https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/vasari-vhs-hero.mp4",
    aspect: 1.526,
    targetUrl: "/services/backlink-building",
  },
  {
    id: "website-maintenance",
    name: "Website Maintenance",
    caption: "Website Maintenance",
    statLeft: "99.98%",
    statLeftLabel: "Uptime SLA",
    statRight: "24/7",
    statRightLabel: "Security Defense",
    photoUrl: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=1280&q=80",
    videoUrl: "https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/lumen-roof-hero.mp4",
    aspect: 1.658,
    targetUrl: "/services/website-maintenance",
  },
  {
    id: "flutter-app-dev",
    name: "Flutter App Dev",
    caption: "Flutter Mobile Apps",
    statLeft: "60 FPS",
    statLeftLabel: "iOS & Android",
    statRight: "₹84,999",
    statRightLabel: "Full Release",
    photoUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1280&q=80",
    videoUrl: "https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/designs/honey-bee-melli-landing.mp4",
    aspect: 1.330,
    targetUrl: "/services",
  },
  {
    id: "full-stack-php-dev",
    name: "Full-Stack PHP Dev",
    caption: "PHP & Laravel Web Dev",
    statLeft: "REST APIs",
    statLeftLabel: "Secure Panel",
    statRight: "₹49,999",
    statRightLabel: "Architecture",
    photoUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1280&q=80",
    videoUrl: "https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/found-spider.mp4",
    aspect: 1.610,
    targetUrl: "/services",
  },
];

interface ServicesRibbonCanvasProps {
  onSelectService?: (serviceName: string) => void;
  fullScreenLink?: boolean;
}

export default function ServicesRibbonCanvas({
  onSelectService,
  fullScreenLink = true,
}: ServicesRibbonCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeCaption, setActiveCaption] = useState<string>("SEO Optimization");

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let destroyed = false;
    let vw = container.clientWidth || window.innerWidth;
    let vh = container.clientHeight || 750;
    let isMobile = vw <= 649;
    let U = isMobile ? vw / 390 : vw / 1500;

    const fovDeg = 53.4;
    const fovRad = (fovDeg * Math.PI) / 180;
    const cameraDist = 41.18;
    const H = Math.tan(fovRad / 2) * cameraDist;
    let W = H * (vw / vh);
    let k = (2 * H) / vh;

    const camera = new THREE.PerspectiveCamera(fovDeg, vw / vh, 0.1, 2000);
    camera.position.set(0, 0, cameraDist);
    camera.lookAt(0, 0, 0);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(vw, vh);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    let refTarget = new THREE.WebGLRenderTarget(
      Math.floor(vw * 0.5 * Math.min(window.devicePixelRatio || 1, 2)),
      Math.floor(vh * 0.5 * Math.min(window.devicePixelRatio || 1, 2)),
      {
        colorSpace: THREE.SRGBColorSpace,
        depthBuffer: true,
        stencilBuffer: false,
      }
    );

    const mirrorCamera = camera.clone();

    let cardH = isMobile ? (vw - 40 * U) / 1.7 : Math.min(0.435 * vh, 550 * U);
    let floorY = -cardH * k * 0.5 - 0.06 * H;
    let floorRun = 6.0 * H;
    let floorNear = Math.min(cameraDist * (1.0 - Math.abs(floorY) / H) + 0.2 * H, cameraDist * 0.8);
    let mirrorCamY = 2 * (floorY - 0.07 * H) - camera.position.y;
    mirrorCamera.position.set(0, mirrorCamY, cameraDist);
    mirrorCamera.lookAt(0, mirrorCamY, 0);

    const cellSize = 0.22 * H;

    // Floor Mesh & Custom Shader
    const floorGeo = new THREE.PlaneGeometry(1, 1, 48, 24);
    floorGeo.rotateX(-Math.PI / 2);

    const floorMat = new THREE.ShaderMaterial({
      transparent: true,
      depthTest: false,
      depthWrite: false,
      side: THREE.DoubleSide,
      uniforms: {
        u_reflection: { value: refTarget.texture },
        u_repeat: { value: new THREE.Vector2(1, 1) },
        u_alpha: { value: 0.9 },
        u_sheetW: { value: W },
        u_leanA: { value: -0.12 * W },
        u_leanW: { value: W },
        u_runO: { value: floorRun },
        u_mirrorProj: { value: mirrorCamera.projectionMatrix },
        u_mirrorView: { value: mirrorCamera.matrixWorldInverse },
      },
      vertexShader: `
        uniform float u_leanA;
        uniform float u_leanW;
        uniform float u_runO;
        varying vec2 vUv;
        varying vec3 vWorldPos;
        varying float vFar;

        float rampFn(float s) {
          return s * (1.5 - 0.5 * s * s);
        }

        void main() {
          vUv = uv;
          vec4 wp = modelMatrix * vec4(position, 1.0);
          if (abs(u_leanW) > 0.001) {
            float s = clamp(wp.x / u_leanW, -1.0, 1.0);
            wp.z += u_leanA * rampFn(s);
          }
          vWorldPos = wp.xyz;
          vFar = -wp.z / u_runO;
          gl_Position = projectionMatrix * viewMatrix * wp;
        }
      `,
      fragmentShader: `
        uniform sampler2D u_reflection;
        uniform vec2 u_repeat;
        uniform float u_alpha;
        uniform float u_sheetW;
        uniform mat4 u_mirrorProj;
        uniform mat4 u_mirrorView;
        varying vec2 vUv;
        varying vec3 vWorldPos;
        varying float vFar;

        void main() {
          float fade = 1.0 - smoothstep(0.2, 0.95, vFar);
          float shadow = 1.0 - 0.55 * exp(-14.0 * abs(vFar));

          vec2 g = vec2(vUv.x * u_repeat.x, vFar * u_repeat.y);
          vec2 fw = 1.5 * fwidth(g);
          float lx = 1.0 - smoothstep(0.0, fw.x, abs(fract(g.x) - 0.5));
          float ly = 1.0 - smoothstep(0.0, fw.y, abs(fract(g.y) - 0.5));
          float line = max(lx, ly);

          vec3 col = vec3(0.0);
          col += line * 0.08 * fade * shadow;

          vec3 wp = vWorldPos;
          float lightX = -0.6 * u_sheetW;
          wp.x -= (wp.x - lightX) * 0.35 * abs(vFar);
          vec4 clipRef = u_mirrorProj * u_mirrorView * vec4(wp, 1.0);
          vec2 refUv = (clipRef.xy / clipRef.w) * 0.5 + 0.5;

          float edgeX = smoothstep(0.0, 0.1, refUv.x) * (1.0 - smoothstep(0.9, 1.0, refUv.x));
          float edgeY = smoothstep(0.0, 0.1, refUv.y) * (1.0 - smoothstep(0.9, 1.0, refUv.y));
          float edges = edgeX * edgeY;
          float weight = vFar >= 0.0 ? exp(-6.0 * vFar) : exp(2.2 * vFar);

          if (refUv.x >= 0.0 && refUv.x <= 1.0 && refUv.y >= 0.0 && refUv.y <= 1.0) {
            vec4 refCol = texture2D(u_reflection, refUv);
            col += refCol.rgb * line * 0.5 * weight * edges * fade;
          }

          float alpha = u_alpha * fade;
          if (alpha <= 0.001) discard;
          gl_FragColor = vec4(col, alpha);
        }
      `,
    });

    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.renderOrder = -1;
    scene.add(floorMesh);

    function updateFloorGeometry() {
      floorY = -cardH * k * 0.5 - 0.06 * H;
      floorRun = 6.0 * H;
      floorNear = Math.min(cameraDist * (1.0 - Math.abs(floorY) / H) + 0.2 * H, cameraDist * 0.8);
      const floorWidth = W * 2 * 4;
      const floorDepth = floorNear + floorRun;
      floorMesh.scale.set(floorWidth, 1, floorDepth);
      floorMesh.position.set(0, floorY, (floorNear - floorRun) / 2);

      floorMat.uniforms.u_repeat.value.set(floorWidth / cellSize, floorRun / cellSize);
      floorMat.uniforms.u_sheetW.value = W;
      floorMat.uniforms.u_leanA.value = -0.12 * W;
      floorMat.uniforms.u_leanW.value = W;
      floorMat.uniforms.u_runO.value = floorRun;

      mirrorCamY = 2 * (floorY - 0.07 * H) - camera.position.y;
      mirrorCamera.position.set(0, mirrorCamY, cameraDist);
      mirrorCamera.lookAt(0, mirrorCamY, 0);
      mirrorCamera.updateMatrixWorld();
      mirrorCamera.updateProjectionMatrix();

      floorMat.uniforms.u_mirrorProj.value = mirrorCamera.projectionMatrix;
      floorMat.uniforms.u_mirrorView.value = mirrorCamera.matrixWorldInverse;

      floorMesh.visible = !isMobile;
    }

    // Card Mesh & Shader
    const cardGeo = new THREE.PlaneGeometry(1, 1, 96, 24);

    const cardVertexShader = `
      uniform float u_sheetW;
      uniform float u_sheetD;
      uniform float u_sheetT;
      uniform float u_sheetC;
      uniform float u_sheetP;
      uniform float u_sheetV;
      uniform float u_leanA;
      uniform float u_leanW;
      uniform float u_diag;
      uniform float u_axis;
      uniform float u_dent;
      uniform float u_hover;
      uniform vec2 u_res;

      varying vec2 vUv;
      varying vec3 vWorldPos;
      varying vec3 vNormal;
      varying float vDepthDark;

      const float PI = 3.141592653589793;
      const float BANK = -0.16;
      const float REAR_Y = 0.1;
      const float REAR_Z = 0.2;
      const float VTWIST = 1.8;
      const float TAIL = 1.0;
      const float SHIFT = -0.2;

      float qFn(float wx) {
        return (wx / u_sheetW) * u_sheetT + SHIFT;
      }

      float shapeFn(float q) {
        return mix(1.0 - q * q, sin(PI * q), u_sheetC) * exp(-TAIL * q * q);
      }

      float shapeSlopeFn(float q) {
        float bowlP = -2.0 * q * (1.0 + TAIL * (1.0 - q * q));
        float essP = PI * cos(PI * q) - 2.0 * TAIL * q * sin(PI * q);
        return mix(bowlP, essP, u_sheetC) * exp(-q * q);
      }

      float zFn(float wx) {
        return -u_sheetD * shapeFn(qFn(wx));
      }

      float rollFn(float wx) {
        return (BANK * shapeSlopeFn(qFn(wx)) / PI) * u_sheetC;
      }

      float rampFn(float s) {
        return s * (1.5 - 0.5 * s * s);
      }

      float leanSlopeFn(float s) {
        float ms = min(abs(s), 1.0);
        return 1.5 * (1.0 - ms * ms);
      }

      void main() {
        vUv = uv;
        vec3 p = position;

        vec2 quv = 2.0 * uv - 1.0;
        float dome = (1.0 - quv.x * quv.x) * (1.0 - quv.y * quv.y);
        p.z -= u_hover * u_dent * u_res.y * dome;

        vec4 wp = modelMatrix * vec4(p, 1.0);

        if (u_axis > 0.5) {
          float tmp = wp.x;
          wp.x = wp.y;
          wp.y = tmp;
        }

        float wx = wp.x;
        float rollAngle = rollFn(wx);
        if (u_sheetV > 0.0) {
          rollAngle += VTWIST * u_sheetV * smoothstep(0.3, 0.9, abs(wx / u_sheetW)) * sign(wx / u_sheetW);
        }
        float cosA = cos(rollAngle);
        float sinA = sin(rollAngle);
        float newY = wp.y * cosA - wp.z * sinA;
        float newZ = wp.y * sinA + wp.z * cosA;
        wp.y = newY;
        wp.z = newZ;

        wp.z += zFn(wx);
        wp.y += u_diag * wx;

        if (u_sheetV > 0.0) {
          float m = 1.0 - smoothstep(-1.0, 0.3, wx / u_sheetW);
          wp.y += REAR_Y * u_sheetW * u_sheetV * m;
          wp.z += REAR_Z * u_sheetW * u_sheetV * m;
        }

        if (abs(u_leanW) > 0.001) {
          float s = clamp(wx / u_leanW, -1.0, 1.0);
          wp.z += u_leanA * rampFn(s);
        }

        if (u_axis > 0.5) {
          float tmp2 = wp.x;
          wp.x = wp.y;
          wp.y = tmp2;
        }

        vWorldPos = wp.xyz;

        float q = qFn(wx);
        float dzdx = -u_sheetD * shapeSlopeFn(q) * (u_sheetT / u_sheetW);
        if (abs(u_leanW) > 0.001) {
          float s = clamp(wx / u_leanW, -1.0, 1.0);
          dzdx += (u_leanA / u_leanW) * leanSlopeFn(s);
        }
        float dDomedx = -4.0 * quv.x * (1.0 - quv.y * quv.y) / max(u_res.x, 0.001);
        dzdx -= u_hover * u_dent * u_res.y * dDomedx;

        vec3 n = normalize(vec3(-dzdx, 0.0, 1.0));
        float nY = n.y * cosA - n.z * sinA;
        float nZ = n.y * sinA + n.z * cosA;
        n.y = nY;
        n.z = nZ;
        if (u_axis > 0.5) {
          float tmpN = n.x;
          n.x = n.y;
          n.y = tmpN;
        }
        vNormal = normalize((modelMatrix * vec4(n, 0.0)).xyz);

        if (u_sheetD > 0.001) {
          float dTerm = clamp((u_sheetD - zFn(wx)) / (2.0 * u_sheetD), 0.0, 1.0);
          vDepthDark = clamp(dTerm + u_hover * dome * 0.1, 0.0, 1.0);
        } else {
          vDepthDark = 0.0;
        }

        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `;

    const cardFragmentShader = `
      uniform sampler2D u_media;
      uniform sampler2D u_overlay;
      uniform vec4 u_crop;
      uniform float u_shade;
      uniform float u_shadeS;
      uniform float u_corner;
      uniform float u_aspect;
      uniform float u_alpha;
      uniform vec3 u_cameraPos;

      varying vec2 vUv;
      varying vec3 vWorldPos;
      varying vec3 vNormal;
      varying float vDepthDark;

      float sdRoundedBox(vec2 p, vec2 b, float r) {
        vec2 q = abs(p) - b + r;
        return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
      }

      void main() {
        vec2 mediaUv = u_crop.xy + vUv * u_crop.zw;
        vec4 mediaCol = texture2D(u_media, mediaUv);
        vec4 overCol = texture2D(u_overlay, vUv);
        vec3 rgb = mix(mediaCol.rgb, overCol.rgb, overCol.a);

        if (u_shade > 0.0) {
          float dFactor = u_shade * 0.8 * pow(vDepthDark, u_shadeS);
          rgb = mix(rgb, vec3(0.059), dFactor);
        }

        vec3 L = normalize(vec3(-0.4, 0.5, 1.0));
        vec3 N = normalize(vNormal);
        float diff = dot(N, L) * 0.5 + 0.5;
        rgb *= (1.0 - 0.12 * (1.0 - diff));

        vec3 V = normalize(u_cameraPos - vWorldPos);
        vec3 H = normalize(L + V);
        float spec = pow(max(dot(N, H), 0.0), 48.0) * 0.35;
        rgb += vec3(spec);

        vec2 p = (vUv - 0.5) * vec2(u_aspect, 1.0);
        vec2 halfSize = vec2(u_aspect, 1.0) * 0.5;
        float dist = sdRoundedBox(p, halfSize, u_corner);
        float cornerAlpha = 1.0 - smoothstep(-fwidth(dist), fwidth(dist), dist);

        float finalAlpha = cornerAlpha * u_alpha;
        if (finalAlpha <= 0.001) discard;

        gl_FragColor = vec4(rgb, finalAlpha);
      }
    `;

    const cards: any[] = [];
    const dummyTex = new THREE.DataTexture(new Uint8Array([15, 10, 30, 255]), 1, 1);
    dummyTex.needsUpdate = true;

    for (let i = 0; i < DEFAULT_RIBBON_SERVICES.length; i++) {
      const data = DEFAULT_RIBBON_SERVICES[i];
      const mat = new THREE.ShaderMaterial({
        transparent: true,
        depthTest: false,
        depthWrite: false,
        uniforms: {
          u_media: { value: dummyTex },
          u_overlay: { value: dummyTex },
          u_crop: { value: new THREE.Vector4(0, 0, 1, 1) },
          u_sheetW: { value: W },
          u_sheetD: { value: 0 },
          u_sheetT: { value: 1.15 },
          u_sheetC: { value: 1.0 },
          u_sheetP: { value: 1.0 },
          u_sheetV: { value: 0.0 },
          u_leanA: { value: -0.12 * W },
          u_leanW: { value: W },
          u_diag: { value: 0.03 },
          u_axis: { value: 0.0 },
          u_dent: { value: 0.035 },
          u_hover: { value: 0.0 },
          u_shade: { value: 1.0 },
          u_shadeS: { value: 1.0 },
          u_corner: { value: (20 * U) / cardH },
          u_aspect: { value: data.aspect },
          u_alpha: { value: 1.0 },
          u_cameraPos: { value: camera.position },
          u_res: { value: new THREE.Vector2(1, 1) },
        },
        vertexShader: cardVertexShader,
        fragmentShader: cardFragmentShader,
      });

      const mesh = new THREE.Mesh(cardGeo, mat);
      mesh.frustumCulled = false;
      mesh.renderOrder = 0;
      scene.add(mesh);

      cards.push({
        data,
        mesh,
        material: mat,
        video: null,
        videoTex: null,
        posterTex: null,
        overlayTex: null,
        mediaAspect: data.aspect,
        hoverVal: 0,
        alphaVal: 1.0,
        w: 0,
        h: 0,
        basePos: 0,
        currentPos: 0,
      });
    }

    // Overlay Drawing with Service Stats & Button
    function createOverlay(card: any) {
      const s = (2 * Math.min(window.devicePixelRatio || 1, 2)) / 1.5;
      const cvs = document.createElement("canvas");
      cvs.width = Math.max(1, Math.round(card.w * s));
      cvs.height = Math.max(1, Math.round(card.h * s));
      const ctx = cvs.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, cvs.width, cvs.height);

      // Gradient overlay at bottom
      const grad = ctx.createLinearGradient(0, cvs.height * 0.4, 0, cvs.height);
      grad.addColorStop(0, "rgba(0, 0, 0, 0)");
      grad.addColorStop(0.5, "rgba(5, 2, 18, 0.75)");
      grad.addColorStop(1, "rgba(3, 1, 12, 0.96)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, cvs.width, cvs.height);

      // Top badge with service stats
      const badgeX = (isMobile ? 12 : 20) * U * s;
      const badgeY = (isMobile ? 12 : 18) * U * s;

      // Stats Pills
      ctx.fillStyle = "rgba(0, 0, 0, 0.65)";
      ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
      ctx.lineWidth = 1 * s;

      const statBoxW = 120 * U * s;
      const statBoxH = 46 * U * s;

      ctx.beginPath();
      ctx.roundRect(badgeX, badgeY, statBoxW, statBoxH, 8 * s);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#ffffff";
      ctx.font = `700 ${(isMobile ? 15 : 17) * U * s}px "Inter Tight", sans-serif`;
      ctx.fillText(card.data.statLeft, badgeX + 10 * U * s, badgeY + 22 * U * s);

      ctx.fillStyle = "#94a3b8";
      ctx.font = `500 ${(isMobile ? 9 : 10) * U * s}px "Inter Tight", sans-serif`;
      ctx.fillText(card.data.statLeftLabel, badgeX + 10 * U * s, badgeY + 37 * U * s);

      // Service Title / Caption
      const fSize = (isMobile ? 18 : 22) * U * s;
      ctx.font = `700 ${fSize}px "Inter Tight", sans-serif`;
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
      ctx.shadowBlur = 12 * U * s;

      const leftInset = (isMobile ? 14 : 22) * U * s;
      const baselineY = cvs.height - (16 * U + 0.22 * fSize) * s;
      ctx.fillText(card.data.name, leftInset, baselineY);

      // Pill button
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;

      const pillRadius = 15 * U * s;
      const pillRight = (isMobile ? 12 : 22) * U * s;
      const pillBottom = 14 * U * s;
      const pillCX = cvs.width - pillRight - pillRadius;
      const pillCY = cvs.height - pillBottom - pillRadius;

      // Outer glow
      ctx.beginPath();
      ctx.arc(pillCX, pillCY, pillRadius + 2 * s, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(160, 104, 255, 0.4)";
      ctx.fill();

      // Pill body
      ctx.beginPath();
      ctx.arc(pillCX, pillCY, pillRadius, 0, Math.PI * 2);
      ctx.fillStyle = "#0c0822";
      ctx.fill();
      ctx.strokeStyle = "rgba(160, 104, 255, 0.7)";
      ctx.lineWidth = 1.5 * s;
      ctx.stroke();

      // Arrow
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1.8 * U * s;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      const a = 5 * U * s;
      ctx.beginPath();
      ctx.moveTo(pillCX - a, pillCY);
      ctx.lineTo(pillCX + a, pillCY);
      ctx.moveTo(pillCX + 0.2 * a, pillCY - 0.8 * a);
      ctx.lineTo(pillCX + a, pillCY);
      ctx.lineTo(pillCX + 0.2 * a, pillCY + 0.8 * a);
      ctx.stroke();

      if (card.overlayTex) card.overlayTex.dispose();
      card.overlayTex = new THREE.CanvasTexture(cvs);
      card.overlayTex.colorSpace = THREE.SRGBColorSpace;
      card.overlayTex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      card.overlayTex.needsUpdate = true;
      card.material.uniforms.u_overlay.value = card.overlayTex;
    }

    function updateCrop(card: any) {
      const ma = card.mediaAspect;
      const a = card.data.aspect;
      let sx = 1.0;
      let sy = 1.0;
      if (a > ma) {
        sy = ma / a;
        sx = 1.0;
      } else {
        sx = a / ma;
        sy = 1.0;
      }
      const ox = (1.0 - sx) / 2.0;
      const oy = (1.0 - sy) / 2.0;
      card.material.uniforms.u_crop.value.set(ox, oy, sx, sy);
    }

    // Media Setup
    cards.forEach((card) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = card.data.photoUrl;
      img.onload = () => {
        if (destroyed) return;
        if (img.naturalWidth && img.naturalHeight) {
          card.mediaAspect = img.naturalWidth / img.naturalHeight;
        }
        const tex = new THREE.Texture(img);
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
        tex.needsUpdate = true;
        card.posterTex = tex;
        card.material.uniforms.u_media.value = tex;
        updateCrop(card);
      };

      if (card.data.videoUrl) {
        const video = document.createElement("video");
        video.crossOrigin = "anonymous";
        video.muted = true;
        video.defaultMuted = true;
        video.loop = true;
        video.playsInline = true;
        video.setAttribute("playsinline", "");
        video.setAttribute("muted", "");
        video.preload = "auto";
        video.src = card.data.videoUrl;
        card.video = video;

        const onFrame = () => {
          if (destroyed) return;
          const vTex = new THREE.VideoTexture(video);
          vTex.colorSpace = THREE.SRGBColorSpace;
          vTex.anisotropy = renderer.capabilities.getMaxAnisotropy();
          card.videoTex = vTex;
          card.material.uniforms.u_media.value = vTex;
          updateCrop(card);
        };
        video.addEventListener("playing", onFrame, { once: true });
      }
    });

    // Virtual Scroll State
    let target = isMobile ? -0.177 * vh : 100;
    let current = target;
    let pending = 0;
    let loopL = 0;
    let lastWheelTime = 0;
    let lastWheelBurst = 0;

    function pushScroll(delta: number) {
      target += delta;
      if (!isMobile) {
        target = current + Math.tanh((target - current) / vw) * vw;
      }
    }

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return;
      let delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (e.deltaMode === 1) delta *= 16;
      else if (e.deltaMode === 2) delta *= vh;

      const now = performance.now();
      const dtWheel = now - lastWheelTime;
      if (dtWheel < 30) lastWheelBurst = now;
      const isBigFlick =
        Math.abs(delta) >= 40 &&
        dtWheel >= 30 &&
        now - lastWheelBurst >= 500;

      lastWheelTime = now;
      if (isBigFlick) {
        pending += delta * 1.25 * 2;
      } else {
        pushScroll(delta * 1.25);
      }
    };

    let touchY = 0;
    let lastTouchDelta = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchY = e.touches[0].clientY;
        lastTouchDelta = 0;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const y = e.touches[0].clientY;
        const dy = touchY - y;
        touchY = y;
        lastTouchDelta = dy;
        pushScroll(dy * 3.25);
      }
    };

    const handleTouchEnd = () => {
      if (Math.abs(lastTouchDelta) > 1) {
        pushScroll(lastTouchDelta * 35);
      }
    };

    // Keyboard support
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        pushScroll(120);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        pushScroll(-120);
      }
    };

    canvas.addEventListener("wheel", handleWheel, { passive: true });
    canvas.addEventListener("touchstart", handleTouchStart, { passive: true });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: true });
    canvas.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    // Pointer Hover
    const pointer = new THREE.Vector2(-9999, -9999);
    let hoveredCard: any = null;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const handlePointerLeave = () => {
      pointer.set(-9999, -9999);
    };

    const handleClick = () => {
      if (hoveredCard) {
        if (onSelectService) {
          onSelectService(hoveredCard.data.name);
        } else if (hoveredCard.data.targetUrl) {
          window.location.href = hoveredCard.data.targetUrl;
        }
      }
    };

    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerleave", handlePointerLeave);
    canvas.addEventListener("click", handleClick);

    // Layout
    function computeLayout() {
      if (!container || destroyed) return;
      vw = container.clientWidth || window.innerWidth;
      vh = container.clientHeight || 750;
      isMobile = vw <= 649;
      U = isMobile ? vw / 390 : vw / 1500;

      W = H * (vw / vh);
      k = (2 * H) / vh;

      camera.aspect = vw / vh;
      camera.updateProjectionMatrix();

      mirrorCamera.aspect = vw / vh;
      mirrorCamera.updateProjectionMatrix();

      renderer.setSize(vw, vh);
      refTarget.setSize(
        Math.floor(vw * 0.5 * Math.min(window.devicePixelRatio || 1, 2)),
        Math.floor(vh * 0.5 * Math.min(window.devicePixelRatio || 1, 2))
      );

      if (!isMobile) {
        cardH = Math.min(0.48 * vh, 550 * U);
        const gap = 12 * U;
        let runningSum = 0;
        for (let i = 0; i < cards.length; i++) {
          const c = cards[i];
          c.h = cardH;
          c.w = cardH * c.data.aspect;
          c.basePos = runningSum;
          runningSum += c.w + gap;

          c.mesh.scale.set(c.w * k, c.h * k, 1);
          c.material.uniforms.u_sheetW.value = W;
          c.material.uniforms.u_sheetT.value = 1.15;
          c.material.uniforms.u_sheetC.value = 1.0;
          c.material.uniforms.u_leanA.value = -0.12 * W;
          c.material.uniforms.u_leanW.value = W;
          c.material.uniforms.u_diag.value = 0.03;
          c.material.uniforms.u_axis.value = 0.0;
          c.material.uniforms.u_shade.value = 1.0;
          c.material.uniforms.u_shadeS.value = 1.0;
          c.material.uniforms.u_corner.value = (20 * U) / cardH;
          c.material.uniforms.u_res.value.set(c.w * k, c.h * k);

          createOverlay(c);
          updateCrop(c);
        }
        loopL = runningSum;
      } else {
        const cardW = vw - 40 * U;
        const gap = 20 * U;
        let runningSum = 0;
        for (let i = 0; i < cards.length; i++) {
          const c = cards[i];
          c.w = cardW;
          c.h = cardW / c.data.aspect;
          c.basePos = runningSum;
          runningSum += c.h + gap;

          c.mesh.scale.set(c.w * k, c.h * k, 1);
          c.material.uniforms.u_sheetW.value = H;
          c.material.uniforms.u_sheetT.value = 1.0;
          c.material.uniforms.u_sheetC.value = 0.0;
          c.material.uniforms.u_leanA.value = 0.0;
          c.material.uniforms.u_leanW.value = 0.0;
          c.material.uniforms.u_diag.value = 0.0;
          c.material.uniforms.u_axis.value = 1.0;
          c.material.uniforms.u_shade.value = 0.0;
          c.material.uniforms.u_shadeS.value = 0.6;
          c.material.uniforms.u_corner.value = (15 * U) / c.h;
          c.material.uniforms.u_res.value.set(c.w * k, c.h * k);

          createOverlay(c);
          updateCrop(c);
        }
        loopL = runningSum;
      }

      updateFloorGeometry();
    }

    computeLayout();

    window.addEventListener("resize", computeLayout);

    // Frame Loop
    let lastTime = performance.now();
    let animId = 0;

    const renderFrame = (now: number) => {
      if (destroyed) return;
      animId = requestAnimationFrame(renderFrame);

      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      if (Math.abs(pending) > 0.05) {
        const easeStep = pending * (1 - Math.pow(1 - 0.22, Math.min(dt * 60, 4)));
        pushScroll(easeStep);
        pending -= easeStep;
      } else if (pending !== 0) {
        pushScroll(pending);
        pending = 0;
      }

      const ratio = Math.min(dt * 60, 2);
      current += (target - current) * 0.1 * ratio;
      current = Math.round(current * 100) / 100;

      const N = isMobile ? 245 : 550;
      const t = Math.tanh((target - current) / N);
      const vel = t * Math.abs(t);
      const r = Math.min(1.0, Math.abs(vel));

      let sheetD = 0;
      let sheetV = 0;
      if (!isMobile) {
        sheetD = W * 0.2 * (1.0 + 1.1 * r);
        sheetV = r;
      } else {
        sheetD = H * 0.18 * 1.1 * r;
        sheetV = 0;
      }

      const wrapLeft = -(loopL - vw) / 2;
      const wrapTop = -(loopL - vh) / 2;

      let bestHovered: any = null;

      for (let i = 0; i < cards.length; i++) {
        const c = cards[i];

        if (!isMobile) {
          let x = c.basePos - current;
          x = ((((x - wrapLeft) % loopL) + loopL) % loopL) + wrapLeft;

          const y = (vh - c.h) / 2;
          const worldX = (x + c.w / 2 - vw / 2) * k;
          const worldY = -(y + c.h / 2 - vh / 2) * k;

          c.mesh.position.set(worldX, worldY, 0);

          if (c.video) {
            const onScreen = x + c.w > -0.5 * vw && x < 1.5 * vw;
            if (onScreen && c.video.paused) {
              c.video.play().catch(() => {});
            } else if (!onScreen && !c.video.paused) {
              c.video.pause();
            }
          }

          const screenXMin = (x / vw) * 2 - 1;
          const screenXMax = ((x + c.w) / vw) * 2 - 1;
          const screenYMin = -((y + c.h) / vh) * 2 + 1;
          const screenYMax = -(y / vh) * 2 + 1;

          if (
            pointer.x >= screenXMin &&
            pointer.x <= screenXMax &&
            pointer.y >= screenYMin &&
            pointer.y <= screenYMax
          ) {
            bestHovered = c;
          }
        } else {
          let y = c.basePos - current;
          y = ((((y - wrapTop) % loopL) + loopL) % loopL) + wrapTop;

          const x = (vw - c.w) / 2;
          const worldX = (x + c.w / 2 - vw / 2) * k;
          const worldY = -(y + c.h / 2 - vh / 2) * k;

          c.mesh.position.set(worldX, worldY, 0);

          if (c.video) {
            const onScreen = y + c.h > -0.5 * vh && y < 1.5 * vh;
            if (onScreen && c.video.paused) {
              c.video.play().catch(() => {});
            } else if (!onScreen && !c.video.paused) {
              c.video.pause();
            }
          }
        }

        const isThisHovered = bestHovered === c && !isMobile;
        const targetHover = isThisHovered ? 1.0 : 0.0;
        const easeSpeed = isThisHovered ? 1 - Math.exp(-8 * dt) : 1 - Math.exp(-6 * dt);
        c.hoverVal += (targetHover - c.hoverVal) * easeSpeed;
        c.material.uniforms.u_hover.value = c.hoverVal;

        c.material.uniforms.u_sheetD.value = sheetD;
        c.material.uniforms.u_sheetV.value = sheetV;
        c.material.uniforms.u_cameraPos.value = camera.position;
      }

      hoveredCard = bestHovered;
      canvas.style.cursor = hoveredCard ? "pointer" : "grab";
      if (hoveredCard && hoveredCard.data.name !== activeCaption) {
        setActiveCaption(hoveredCard.data.name);
      }

      // Reflection pass
      if (!isMobile) {
        floorMesh.visible = false;
        renderer.setRenderTarget(refTarget);
        renderer.clear();
        renderer.render(scene, mirrorCamera);
        renderer.setRenderTarget(null);
        floorMesh.visible = true;
      }

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(renderFrame);

    return () => {
      destroyed = true;
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", computeLayout);
      window.removeEventListener("keydown", handleKeyDown);
      canvas.removeEventListener("wheel", handleWheel);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
      canvas.removeEventListener("click", handleClick);
      cards.forEach((c) => {
        if (c.video) {
          c.video.pause();
          c.video.src = "";
        }
        if (c.overlayTex) c.overlayTex.dispose();
        if (c.posterTex) c.posterTex.dispose();
        if (c.videoTex) c.videoTex.dispose();
      });
      renderer.dispose();
      refTarget.dispose();
    };
  }, [onSelectService]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[620px] sm:h-[700px] md:h-[760px] bg-black rounded-3xl overflow-hidden border border-purple-500/30 shadow-2xl group select-none"
    >
      {/* 3D WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-grab active:cursor-grabbing"
      />

      {/* Top Left Indicator */}
      <div className="absolute top-5 left-5 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-medium text-white/90 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
        <span>3D WebGL Ribbon Stage</span>
      </div>

      {/* Top Right Controls */}
      <div className="absolute top-5 right-5 z-20 flex items-center gap-2">
        {fullScreenLink && (
          <a
            href="/services-ribbon.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-600/80 hover:bg-purple-600 text-white text-xs font-semibold backdrop-blur-md border border-purple-300/40 shadow-lg transition-transform hover:scale-105"
            title="Open Fullscreen 3D Portfolio Hero"
          >
            <span>Fullscreen 3D</span>
            <span>↗</span>
          </a>
        )}
      </div>

      {/* Bottom Center Hint */}
      <div className="absolute bottom-5 inset-x-0 z-20 flex justify-center pointer-events-none">
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs text-gray-300">
          <span>Scroll, swipe or drag ribbon to explore services</span>
          <span className="text-purple-400 font-bold">•</span>
          <span className="text-purple-300">Click card for details</span>
        </div>
      </div>

      {/* Phone Gradient Veil */}
      <div className="absolute inset-0 z-10 pointer-events-none md:hidden bg-gradient-to-b from-black/80 via-transparent to-black/80" />
    </div>
  );
}
