"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export interface CoverFlowItem {
  id: string;
  name: string;
  shortTitle: string;
  category: string;
  tagline: string;
  statLeft: string;
  statLeftLabel: string;
  statRight: string;
  statRightLabel: string;
  priceINR: string;
  priceUSD: string;
  tat: string;
  coverImage: string;
  glowRgb: string;
  initial: string;
  deliverables: { title: string; desc: string }[];
}

export const COVER_FLOW_SERVICES: CoverFlowItem[] = [
  {
    id: "seo-optimization",
    name: "Search Engine Optimization (SEO)",
    shortTitle: "SEO Optimization",
    category: "Organic Search Dominance",
    tagline: "Rank #1 on Google with semantic topic authority & technical excellence.",
    statLeft: "+240%",
    statLeftLabel: "Organic Traffic",
    statRight: "+180%",
    statRightLabel: "Direct Leads",
    priceINR: "₹29,999",
    priceUSD: "$449",
    tat: "Monthly Retainer",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    glowRgb: "160, 104, 255",
    initial: "S",
    deliverables: [
      { title: "Technical Crawl Inspection", desc: "Core Web Vitals & JS rendering diagnostics" },
      { title: "Commercial Keyword Clusters", desc: "High-intent transactional keyword roadmap" },
      { title: "On-Page Semantic Schema", desc: "JSON-LD structured data & internal link graphs" },
      { title: "Bi-Weekly Rank Tracking", desc: "100% white-hat Google guideline compliance" },
    ],
  },
  {
    id: "website-development",
    name: "Modern Website Development",
    shortTitle: "Next.js Web Dev",
    category: "High-Performance Engineering",
    tagline: "Ultra-fast Next.js engineering with sub-second loads and headless CMS.",
    statLeft: "99/100",
    statLeftLabel: "PageSpeed Score",
    statRight: "<1.1s",
    statRightLabel: "Core Web Vitals",
    priceINR: "₹49,999",
    priceUSD: "$699",
    tat: "3–4 Weeks",
    coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    glowRgb: "56, 189, 248",
    initial: "W",
    deliverables: [
      { title: "Next.js Server-Side App", desc: "Zero-CLS fluid layout with TypeScript" },
      { title: "Tailwind UI Micro-Interactions", desc: "Sleek obsidian aesthetics & dark mode" },
      { title: "Headless CMS Integration", desc: "Sanity / Supabase dynamic database sync" },
      { title: "Global CDN Deployment", desc: "Cloudflare Edge caching & HTTPS hardening" },
    ],
  },
  {
    id: "content-writing",
    name: "Editorial Content Writing",
    shortTitle: "Content Strategy",
    category: "Brand Authority & Copywriting",
    tagline: "From invisible to fully booked through human-crafted editorial copy.",
    statLeft: "+362%",
    statLeftLabel: "Qualified Leads",
    statRight: "+75%",
    statRightLabel: "Online Bookings",
    priceINR: "₹18,999",
    priceUSD: "$269",
    tat: "5–7 Days",
    coverImage: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
    glowRgb: "217, 70, 239",
    initial: "C",
    deliverables: [
      { title: "High-Intent SEO Articles", desc: "2,000+ word researched topical deep-dives" },
      { title: "High-Converting Landing Pages", desc: "Direct-response copywriting with crisp CTAs" },
      { title: "100% Human-Written Protocol", desc: "Copyscape verified zero-AI hallucination" },
      { title: "SurferSEO Optimization", desc: "Semantic keyword frequency & entity density" },
    ],
  },
  {
    id: "email-marketing",
    name: "Email Marketing & Automation",
    shortTitle: "Email Automation",
    category: "Customer Lifecycle & Retention",
    tagline: "Automated retention sequences & enterprise SPF/DKIM authentication.",
    statLeft: "42.8%",
    statLeftLabel: "Avg Open Rate",
    statRight: "3.8x",
    statRightLabel: "Retention ROI",
    priceINR: "₹18,999",
    priceUSD: "$269",
    tat: "7–10 Days",
    coverImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    glowRgb: "20, 184, 166",
    initial: "E",
    deliverables: [
      { title: "Drip Automation Funnels", desc: "Welcome, cart recovery & re-engagement" },
      { title: "DKIM / SPF / DMARC Setup", desc: "100% inbox delivery & domain reputation" },
      { title: "Responsive HTML Templates", desc: "Dark mode optimized email layouts" },
      { title: "A/B Subject Line Testing", desc: "Open-rate maximization & list health cleaning" },
    ],
  },
  {
    id: "backlink-building",
    name: "Off-Page Backlink Building",
    shortTitle: "Authority Backlinks",
    category: "Digital PR & Outreach",
    tagline: "High-authority ethical link building and digital PR for real domain trust.",
    statLeft: "DR 50–90+",
    statLeftLabel: "Editorial Sites",
    statRight: "100%",
    statRightLabel: "Manual Outreach",
    priceINR: "₹24,999",
    priceUSD: "$349",
    tat: "Monthly Retainer",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    glowRgb: "168, 85, 247",
    initial: "B",
    deliverables: [
      { title: "Tier-1 Guest Publications", desc: "Articles placed on verified DR 60+ domains" },
      { title: "100% Do-Follow In-Content Links", desc: "Natural anchor text distribution" },
      { title: "Strict Anti-PBN Guarantee", desc: "No private blog networks, pure manual PR" },
      { title: "Permanent Indexation Guarantee", desc: "Lifetime warranty on all earned placements" },
    ],
  },
  {
    id: "website-maintenance",
    name: "Website Maintenance & Defense",
    shortTitle: "Site Maintenance",
    category: "DevOps & Zero-Downtime Support",
    tagline: "Continuous 24/7 uptime monitoring & proactive vulnerability hardening.",
    statLeft: "99.98%",
    statLeftLabel: "Uptime SLA",
    statRight: "24/7",
    statRightLabel: "Security Defense",
    priceINR: "₹9,999",
    priceUSD: "$149",
    tat: "Ongoing Monthly",
    coverImage: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=1200&q=80",
    glowRgb: "99, 102, 241",
    initial: "M",
    deliverables: [
      { title: "Hourly Automated Cloud Backups", desc: "Off-site AWS S3 disaster recovery snapshots" },
      { title: "Malware & Firewall Hardening", desc: "Real-time threat blocking & brute-force defense" },
      { title: "Plugin & Core Patching", desc: "Staging environment QA before live updates" },
      { title: "Database Optimization", desc: "Query indexing & speed cache purging" },
    ],
  },
  {
    id: "flutter-app-dev",
    name: "Flutter Mobile App Development",
    shortTitle: "Flutter Mobile App",
    category: "Cross-Platform iOS & Android",
    tagline: "Single-codebase mobile applications engineered for fluid 60fps performance.",
    statLeft: "60 FPS",
    statLeftLabel: "Fluid Performance",
    statRight: "Dual Store",
    statRightLabel: "iOS & Android",
    priceINR: "₹84,999",
    priceUSD: "$1,199",
    tat: "4–6 Weeks",
    coverImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
    glowRgb: "79, 70, 229",
    initial: "F",
    deliverables: [
      { title: "Native Experience on Both OS", desc: "Single Dart codebase for App Store & Play Store" },
      { title: "Firebase & Custom REST APIs", desc: "Real-time sync, push notifications & auth" },
      { title: "In-App Purchases & Payments", desc: "Stripe, Razorpay & Apple In-App subscriptions" },
      { title: "Bi-Weekly TestFlight Builds", desc: "Continuous testing on real physical devices" },
    ],
  },
  {
    id: "full-stack-php-dev",
    name: "Full-Stack PHP Web Development",
    shortTitle: "PHP & Laravel",
    category: "Custom Web Architectures",
    tagline: "Custom Laravel and robust PHP architectures with relational databases.",
    statLeft: "REST APIs",
    statLeftLabel: "Custom Endpoints",
    statRight: "MySQL",
    statRightLabel: "Optimized Schema",
    priceINR: "₹49,999",
    priceUSD: "$699",
    tat: "3–5 Weeks",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    glowRgb: "129, 140, 248",
    initial: "P",
    deliverables: [
      { title: "Laravel MVC Architecture", desc: "Clean, maintainable, object-oriented code" },
      { title: "Normalized MySQL Database", desc: "Foreign keys, indexes, and fast queries" },
      { title: "Role-Based Admin Panel", desc: "Secure permissions, audit logs & CSV export" },
      { title: "Webhook & API Integrations", desc: "Payment gateways, CRMs, and email services" },
    ],
  },
  {
    id: "generative-engine-opt",
    name: "Generative Engine Optimization (GEO)",
    shortTitle: "GEO (AI Search)",
    category: "LLM Search & AI Citations",
    tagline: "Position your brand as the primary cited authority inside ChatGPT, Perplexity & Gemini.",
    statLeft: "100%",
    statLeftLabel: "Entity Citations",
    statRight: "LLM",
    statRightLabel: "Knowledge Graph",
    priceINR: "₹34,999",
    priceUSD: "$499",
    tat: "2–3 Weeks",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    glowRgb: "192, 132, 252",
    initial: "G",
    deliverables: [
      { title: "Semantic Entity Modeling", desc: "Knowledge graph structure for AI ingestion" },
      { title: "Citation Optimization", desc: "Rank in ChatGPT Search & Perplexity answers" },
      { title: "Authoritative Data Hooks", desc: "Context window formatting for LLM summaries" },
      { title: "AI Visibility Reports", desc: "Track query presence across top AI engines" },
    ],
  },
  {
    id: "answer-engine-opt",
    name: "Answer Engine Optimization (AEO)",
    shortTitle: "AEO (Snippet #0)",
    category: "Position Zero & Voice Search",
    tagline: "Win Google Featured Snippets (Position Zero), voice search, and People-Also-Ask clusters.",
    statLeft: "Pos 0",
    statLeftLabel: "Target Snippets",
    statRight: "Schema",
    statRightLabel: "JSON-LD Graph",
    priceINR: "₹24,999",
    priceUSD: "$349",
    tat: "10–14 Days",
    coverImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    glowRgb: "244, 114, 182",
    initial: "A",
    deliverables: [
      { title: "Conversational Query Structuring", desc: "Direct answer formatting for snippet algorithms" },
      { title: "FAQ & HowTo JSON-LD Markup", desc: "Rich snippet code verified via Google Rich Results" },
      { title: "Voice Search Phrasing", desc: "Natural language optimization for Siri & Assistant" },
      { title: "Snippet Stealing Roadmap", desc: "Identify competitor snippets and outrank them" },
    ],
  },
  {
    id: "technical-seo-audit",
    name: "Technical SEO & Speed Fix",
    shortTitle: "Technical SEO",
    category: "Diagnostics & Remediation",
    tagline: "Zero crawl errors, JavaScript rendering audits & sub-second Core Web Vitals.",
    statLeft: "0",
    statLeftLabel: "Crawl Errors",
    statRight: "<1.2s",
    statRightLabel: "Largest Contentful Paint",
    priceINR: "₹19,999",
    priceUSD: "$299",
    tat: "7–10 Days",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    glowRgb: "56, 189, 248",
    initial: "T",
    deliverables: [
      { title: "Deep Log File Analysis", desc: "Discover how Googlebot spends crawl budget" },
      { title: "Render-Blocking Resource Removal", desc: "Defer unused JS/CSS for 90+ mobile scores" },
      { title: "Canonical & Redirect Loop Fixes", desc: "Clean up index bloat and orphan URLs" },
      { title: "Robots.txt & Sitemap Rebuild", desc: "Flawless instruction architecture for search bots" },
    ],
  },
  {
    id: "conversion-rate-optimization",
    name: "Conversion Rate Optimization (CRO)",
    shortTitle: "Conversion CRO",
    category: "Growth & Sales Velocity",
    tagline: "A/B testing, heatmap user behavior analysis, and frictionless high-velocity sales funnels.",
    statLeft: "+84%",
    statLeftLabel: "Conversion Lift",
    statRight: "3.2x",
    statRightLabel: "Customer LTV",
    priceINR: "₹29,999",
    priceUSD: "$449",
    tat: "Ongoing Retainer",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    glowRgb: "251, 146, 60",
    initial: "O",
    deliverables: [
      { title: "Heatmap & Session Replay Audits", desc: "Detect where users bounce or hesitate" },
      { title: "Scientific A/B Split Testing", desc: "Statistically significant variant benchmarking" },
      { title: "Form & Checkout Streamlining", desc: "Cut drop-offs by simplifying input friction" },
      { title: "Micro-Copy & Social Proof Tuning", desc: "Trust badges, guarantees & urgency triggers" },
    ],
  },
  {
    id: "wordpress-website-dev",
    name: "WordPress Website Development",
    shortTitle: "WordPress Dev",
    category: "Speed & Custom Design",
    tagline: "Bespoke Elementor & Gutenberg custom digital experiences tuned for conversion.",
    statLeft: "<1.8s",
    statLeftLabel: "Page Load Speed",
    statRight: "100%",
    statRightLabel: "Mobile Responsive",
    priceINR: "₹24,999",
    priceUSD: "$349",
    tat: "7–10 Days",
    coverImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    glowRgb: "96, 165, 250",
    initial: "D",
    deliverables: [
      { title: "Custom Gutenberg / Elementor", desc: "Tailored to your exact corporate brand identity" },
      { title: "Core Web Vitals Speed Tuning", desc: "Redis caching, WebP conversion & CDN setup" },
      { title: "Dynamic CRM Lead Forms", desc: "Instant email and WhatsApp inquiry notifications" },
      { title: "Complete On-Page SEO Base", desc: "Yoast / RankMath setup with schema markup" },
    ],
  },
  {
    id: "seo-services-usa",
    name: "Local & Multi-Location SEO",
    shortTitle: "Local SEO Growth",
    category: "Geo-Targeted Visibility",
    tagline: "Dominant Google Business Profile rankings and multi-location search presence.",
    statLeft: "#1",
    statLeftLabel: "Local 3-Pack",
    statRight: "+210%",
    statRightLabel: "Phone Calls",
    priceINR: "₹19,999",
    priceUSD: "$299",
    tat: "Monthly Retainer",
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    glowRgb: "74, 222, 128",
    initial: "L",
    deliverables: [
      { title: "Google Business Profile Tuning", desc: "Categories, geotagged photos & weekly posts" },
      { title: "Local Citation Building (NAP)", desc: "Consistent Name-Address-Phone on 80+ directories" },
      { title: "Review Velocity Campaigns", desc: "Automated review acquisition & positive feedback" },
      { title: "Geo-Grid Rank Tracking", desc: "Mile-by-mile ranking heatmaps across your city" },
    ],
  },
  {
    id: "guest-posting",
    name: "High-DR Guest Posting Networks",
    shortTitle: "Guest Posting",
    category: "Publisher Placements",
    tagline: "Curated verified publisher placements on genuine authority media domains.",
    statLeft: "DR 60–92",
    statLeftLabel: "Average Authority",
    statRight: "100%",
    statRightLabel: "Editorial Approval",
    priceINR: "₹14,999",
    priceUSD: "$219",
    tat: "5–7 Days",
    coverImage: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80",
    glowRgb: "232, 121, 249",
    initial: "H",
    deliverables: [
      { title: "Real Editorial Outlets", desc: "Manual pitching to real webmasters with traffic" },
      { title: "Native Editorial Integration", desc: "Contextual mentions that Google rewards" },
      { title: "Dofollow Link Guarantee", desc: "Permanent do-follow links that pass PageRank" },
      { title: "Replacement Guarantee", desc: "Free replacement if any link drops within 365 days" },
    ],
  },
  {
    id: "about",
    name: "Brand Digital PR & Authority",
    shortTitle: "Digital PR",
    category: "Reputation & Brand Visibility",
    tagline: "Syndicated press releases & tier-1 editorial publication features.",
    statLeft: "Tier 1",
    statLeftLabel: "Media Reach",
    statRight: "Instant",
    statRightLabel: "Brand Trust",
    priceINR: "₹39,999",
    priceUSD: "$599",
    tat: "2–3 Weeks",
    coverImage: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1200&q=80",
    glowRgb: "248, 113, 113",
    initial: "R",
    deliverables: [
      { title: "Press Release Crafting", desc: "Journalist-ready AP-style brand storytelling" },
      { title: "Syndicated Wire Distribution", desc: "Guaranteed publication on 150+ news sites" },
      { title: "Executive Thought Leadership", desc: "Founder quotes and authoritative industry commentary" },
      { title: "Full Coverage Clipping Book", desc: "White-label PDF report of all live features" },
    ],
  },
];

interface CoverFlowServicesProps {
  onSelectService?: (serviceName: string) => void;
}

export default function CoverFlowServices({ onSelectService }: CoverFlowServicesProps) {
  const router = useRouter();
  const flowRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<number>(0);
  const [target, setTarget] = useState<number>(0);
  const [flipped, setFlipped] = useState<number | null>(null);
  const [flipK, setFlipK] = useState<number>(0);
  const [highlightRow, setHighlightRow] = useState<number>(0);
  const [coverWidth, setCoverWidth] = useState<number>(380);

  const targetRef = useRef<number>(0);
  const posRef = useRef<number>(0);
  const flippedRef = useRef<number | null>(null);
  const flipKRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const startPosRef = useRef<number>(0);
  const lastXRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);
  const movedRef = useRef<boolean>(false);
  const clickedCoverRef = useRef<number | null>(null);

  targetRef.current = target;
  posRef.current = pos;
  flippedRef.current = flipped;
  flipKRef.current = flipK;

  // Window resize to calculate cover width W
  useEffect(() => {
    const updateSize = () => {
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const W = Math.round(Math.min(vh * 0.36, vw * 0.34, 420));
      setCoverWidth(Math.max(260, W));
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Animation Frame loop for exponential ease-out
  useEffect(() => {
    let animId: number;
    let lastT = performance.now();

    const loop = (now: number) => {
      const dt = Math.min((now - lastT) / 1000, 0.05);
      lastT = now;

      // Follow target with quick ease-out: pos += (target - pos) * (1 - e^(-dt * 13))
      if (!isDraggingRef.current) {
        const cur = posRef.current;
        const tgt = targetRef.current;
        const diff = tgt - cur;
        if (Math.abs(diff) > 0.0005) {
          const next = cur + diff * (1 - Math.exp(-dt * 13));
          setPos(next);
        } else if (cur !== tgt) {
          setPos(tgt);
        }
      }

      // Flip progress animation
      if (flippedRef.current !== null && flipKRef.current < 1) {
        const nextK = Math.min(1, flipKRef.current + dt / 0.62);
        setFlipK(nextK);
      } else if (flippedRef.current === null && flipKRef.current > 0) {
        const nextK = Math.max(0, flipKRef.current - dt / 0.45);
        setFlipK(nextK);
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Wheel input: 60px moves target by 1 cover
  useEffect(() => {
    const el = flowRef.current;
    if (!el) return;

    let accumDelta = 0;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      accumDelta += delta;
      if (Math.abs(accumDelta) >= 60) {
        const step = Math.sign(accumDelta);
        setTarget((prev) => {
          const next = Math.max(0, Math.min(COVER_FLOW_SERVICES.length - 1, prev + step));
          return next;
        });
        accumDelta = 0;
        if (flippedRef.current !== null) {
          setFlipped(null);
        }
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  // Pointer drag & click handling
  const handlePointerDown = (e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    startPosRef.current = posRef.current;
    lastXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
    movedRef.current = false;

    // Check which cover was clicked
    const coverEl = (e.target as HTMLElement).closest("[data-cover-index]");
    if (coverEl) {
      clickedCoverRef.current = parseInt(coverEl.getAttribute("data-cover-index") || "0", 10);
    } else {
      clickedCoverRef.current = null;
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - startXRef.current;
    if (Math.abs(dx) > 4) {
      movedRef.current = true;
    }

    const now = performance.now();
    const dt = Math.max(1, now - lastTimeRef.current);
    velocityRef.current = (e.clientX - lastXRef.current) / dt;
    lastXRef.current = e.clientX;
    lastTimeRef.current = now;

    if (movedRef.current) {
      const STEP = 0.2;
      const W = coverWidth;
      const newPos = Math.max(
        -0.4,
        Math.min(
          COVER_FLOW_SERVICES.length - 0.6,
          startPosRef.current - dx / (W * STEP * 2.2)
        )
      );
      setPos(newPos);
      if (flippedRef.current !== null) {
        setFlipped(null);
      }
    }
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    if (movedRef.current) {
      // Fling release with velocity
      const v = velocityRef.current;
      const targetPos = Math.round(posRef.current - v * 40);
      setTarget(Math.max(0, Math.min(COVER_FLOW_SERVICES.length - 1, targetPos)));
    } else if (clickedCoverRef.current !== null) {
      // Clean click on a cover
      const clickedIdx = clickedCoverRef.current;
      const centerIdx = Math.round(targetRef.current);

      if (clickedIdx !== centerIdx) {
        // Clicking a side cover slides it to center
        setTarget(clickedIdx);
        if (flippedRef.current !== null) {
          setFlipped(null);
        }
      } else {
        // Clicking the centre cover: navigate directly to full detail page!
        const svc = COVER_FLOW_SERVICES[clickedIdx];
        if (onSelectService) {
          onSelectService(svc.name);
        } else {
          router.push(`/services/${svc.id}`);
        }
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setTarget((prev) => Math.min(COVER_FLOW_SERVICES.length - 1, prev + 1));
        setFlipped(null);
      } else if (e.key === "ArrowLeft") {
        setTarget((prev) => Math.max(0, prev - 1));
        setFlipped(null);
      } else if (e.key === "Enter") {
        const centerIdx = Math.round(targetRef.current);
        const svc = COVER_FLOW_SERVICES[centerIdx];
        if (onSelectService) {
          onSelectService(svc.name);
        } else {
          router.push(`/services/${svc.id}`);
        }
      } else if (e.key === "Escape") {
        setFlipped(null);
      } else if (flippedRef.current !== null) {
        if (e.key === "ArrowDown") {
          setHighlightRow((prev) => Math.min(3, prev + 1));
        } else if (e.key === "ArrowUp") {
          setHighlightRow((prev) => Math.max(0, prev - 1));
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [router, onSelectService]);

  const centerIndex = Math.max(0, Math.min(COVER_FLOW_SERVICES.length - 1, Math.round(pos)));
  const currentService = COVER_FLOW_SERVICES[centerIndex] || COVER_FLOW_SERVICES[0];

  // A-Z jump list
  const azLetters = ["#", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")];

  const handleLetterClick = (letter: string) => {
    setFlipped(null);
    if (letter === "#") {
      setTarget(0);
      return;
    }
    const idx = COVER_FLOW_SERVICES.findIndex(
      (s) => s.name.toUpperCase().startsWith(letter) || s.shortTitle.toUpperCase().startsWith(letter)
    );
    if (idx !== -1) {
      setTarget(idx);
    }
  };

  // EaseInOutQuad for flip
  const easeInOutQuad = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

  return (
    <div
      className="relative w-full h-[660px] sm:h-[720px] md:h-[780px] bg-[#050506] text-[#f4f4f5] overflow-hidden select-none font-sans rounded-3xl border border-white/10 shadow-2xl"
      style={
        {
          "--bg": "#050506",
          "--ink": "#f4f4f5",
          "--mute": "#8a8a90",
          "--glow": currentService.glowRgb,
          "--w": `${coverWidth}px`,
        } as React.CSSProperties
      }
    >
      {/* Dynamic Ambient Glow tinted by active service */}
      <div
        className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 w-[120vmin] h-[80vmin] pointer-events-none transition-all duration-1000 ease-out -z-0"
        style={{
          background: `radial-gradient(closest-side, rgba(var(--glow), 0.35), rgba(var(--glow), 0.08) 55%, transparent)`,
        }}
      />

      {/* Top Bar / Category Navigation */}
      <div className="relative z-20 flex items-center justify-between px-6 sm:px-10 pt-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#A068FF] animate-pulse" />
            <span className="text-[11px] font-semibold tracking-widest uppercase text-white/90">
              Cover Flow Services
            </span>
          </div>
          <span className="text-xs text-[#8a8a90] hidden sm:inline">
            Click any service to view full details
          </span>
        </div>

        {/* Action Pills */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              if (flipped === centerIndex) {
                setFlipped(null);
              } else {
                setFlipped(centerIndex);
              }
            }}
            className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-medium text-white border border-white/25 backdrop-blur-md transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
          >
            <span>{flipped === centerIndex ? "Close Scope ↺" : "Flip to Scope 🔄"}</span>
          </button>
          <Link
            href={`/services/${currentService.id}`}
            className="px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-purple-950/60 border border-purple-400/40 transition-all hover:scale-105 flex items-center gap-1.5"
          >
            <span>View Full Page</span>
            <span>→</span>
          </Link>
        </div>
      </div>

      {/* 3D Cover Flow Stage */}
      <div
        ref={flowRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="absolute inset-x-0 top-[10vh] h-[52vh] sm:h-[55vh] z-10 cursor-grab active:cursor-grabbing touch-none"
        style={{
          perspective: `${coverWidth * 3.4}px`,
          perspectiveOrigin: "50% 42%",
        }}
      >
        {COVER_FLOW_SERVICES.map((item, i) => {
          const d = i - pos;
          const a = Math.abs(d);
          const s = Math.sign(d);
          const ANG = 72;
          const GAP = 0.62;
          const STEP = 0.2;
          const DEPTH = 0.42;

          if (a > 9) return null;

          let x = 0;
          let rot = 0;
          let z = 0;

          if (a < 1) {
            x = d * GAP * coverWidth;
            rot = -d * ANG;
            z = -a * DEPTH * coverWidth;
          } else {
            x = s * (GAP + (a - 1) * STEP) * coverWidth;
            rot = -s * ANG;
            z = -DEPTH * coverWidth;
          }

          const isFlipped = flipped === i;
          let extraRot = 0;
          let extraZ = 0;
          if (isFlipped || (flippedRef.current === i && flipK > 0)) {
            const e = easeInOutQuad(flipK);
            extraRot = e * 180;
            extraZ = Math.sin(Math.min(1, flipK * 1.4) * (Math.PI / 2)) * 0.55 * coverWidth;
          }

          const zIndex = isFlipped ? 999 : 500 - Math.round(a * 10);

          return (
            <div
              key={item.id}
              data-cover-index={i}
              className="absolute left-1/2 top-1/2 transition-shadow duration-300"
              style={{
                width: `${coverWidth}px`,
                height: `${coverWidth}px`,
                marginLeft: `-${coverWidth / 2}px`,
                marginTop: `-${coverWidth / 2}px`,
                transformStyle: "preserve-3d",
                zIndex,
                transform: `translate3d(${x}px, 0, ${z + extraZ}px) rotateY(${rot + extraRot}deg)`,
              }}
            >
              {/* Front Face: Service Photo + Overlay Content */}
              <div
                className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl border border-white/10 group cursor-pointer"
                style={{
                  backfaceVisibility: "hidden",
                  background: "#0c0822",
                }}
              >
                <img
                  src={item.coverImage}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading={Math.abs(i - centerIndex) <= 2 ? "eager" : "lazy"}
                  draggable={false}
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/10 pointer-events-none" />

                {/* Service Stats Pill at Top Left */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/20 shadow-md">
                  <span className="text-sm font-bold text-white">{item.statLeft}</span>
                  <span className="text-[10px] text-gray-300 uppercase tracking-wider">
                    {item.statLeftLabel}
                  </span>
                </div>

                {/* Price Pill at Top Right */}
                <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-xl bg-purple-950/80 backdrop-blur-md border border-purple-500/40 text-[11px] font-bold text-purple-200 shadow-md">
                  {item.priceINR}
                </div>

                {/* Service Title and Category at Bottom */}
                <div className="absolute bottom-4 inset-x-4 z-10">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-purple-400 block mb-0.5">
                    {item.category}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug drop-shadow-md">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-300 mt-1 line-clamp-1">
                    {item.tagline}
                  </p>

                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/15">
                    <span className="text-[11px] text-purple-300 font-medium flex items-center gap-1">
                      <span>Click to open details</span>
                      <span>→</span>
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {item.tat}
                    </span>
                  </div>
                </div>
              </div>

              {/* Floor Mirror Reflection fading down */}
              {!isFlipped && (
                <div
                  className="absolute top-full left-0 w-full h-full mt-1.5 rounded-2xl overflow-hidden pointer-events-none"
                  style={{
                    transform: "scaleY(-1)",
                    transformOrigin: "50% 50%",
                    opacity: 0.38,
                    WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.85), transparent 55%)",
                    maskImage: "linear-gradient(to top, rgba(0,0,0,0.85), transparent 55%)",
                  }}
                >
                  <img
                    src={item.coverImage}
                    alt=""
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>
              )}

              {/* Back Face: Tracklist / Deliverables Card (Flipped view) */}
              <div
                className="absolute left-1/2 top-1/2 rounded-2xl overflow-hidden shadow-2xl bg-[#fbfbfc] text-[#222]"
                style={{
                  width: `${coverWidth * 1.45}px`,
                  height: `${coverWidth * 1.05}px`,
                  marginLeft: `-${(coverWidth * 1.45) / 2}px`,
                  marginTop: `-${(coverWidth * 1.05) / 2}px`,
                  transform: "rotateY(180deg) scale(1.05)",
                  backfaceVisibility: "hidden",
                  display: isFlipped || (flippedRef.current === i && flipK > 0) ? "block" : "none",
                }}
              >
                {/* Glossy Header Bar */}
                <div
                  className="px-5 py-3.5 flex items-center justify-between border-b border-[#7489a1]"
                  style={{
                    background: "linear-gradient(#cdd8e4, #a7b8cb 50%, #97abc1 51%, #adbed0)",
                  }}
                >
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-white drop-shadow-[0_-1px_0_rgba(40,60,90,0.55)]">
                      {item.name}
                    </h4>
                    <p className="text-xs text-[#41505f] font-medium">{item.category}</p>
                  </div>
                  <Link
                    href={`/services/${item.id}`}
                    className="px-3 py-1 rounded-full bg-white/90 hover:bg-white text-xs font-bold text-[#1f2937] shadow-sm transition-all"
                  >
                    Open Page ↗
                  </Link>
                </div>

                {/* Deliverables Rows */}
                <ul className="p-3 divide-y divide-[#e3e5e8]">
                  {item.deliverables.map((d, dIdx) => {
                    const isHi = dIdx === highlightRow;
                    return (
                      <li
                        key={dIdx}
                        onClick={() => {
                          setHighlightRow(dIdx);
                          router.push(`/services/${item.id}`);
                        }}
                        className={`px-3.5 py-2.5 rounded-lg flex items-center justify-between text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                          isHi
                            ? "text-white shadow-md"
                            : "text-[#333] hover:bg-black/5"
                        }`}
                        style={
                          isHi
                            ? {
                                background:
                                  "linear-gradient(#6aa8f7, #3a7fe6 50%, #2a6fd9 51%, #3178df)",
                                textShadow: "0 -1px 0 rgba(0,0,60,0.35)",
                              }
                            : {}
                        }
                      >
                        <span className="flex-1 pr-2 truncate">{d.title}</span>
                        <span className={`text-[11px] ${isHi ? "text-blue-100" : "text-[#777]"}`}>
                          {d.desc}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                {/* Bottom Bar in Flipped Card */}
                <div className="px-5 py-2.5 bg-gray-100 border-t border-gray-200 flex items-center justify-between text-xs">
                  <span className="text-gray-600">
                    Pricing: <strong>{item.priceINR}</strong> ({item.priceUSD})
                  </span>
                  <button
                    type="button"
                    onClick={() => setFlipped(null)}
                    className="text-blue-600 hover:text-blue-800 font-bold cursor-pointer"
                  >
                    Flip Back ↺
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Letter Box Indicator under centre cover */}
      {flipped === null && (
        <div
          className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center rounded-xl bg-gradient-to-b from-white to-[#e9e9ec] shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_6px_18px_rgba(0,0,0,0.45)] border border-white/60 pointer-events-none transition-all duration-300 z-20"
          style={{
            top: `calc(10vh + 26vh + ${coverWidth / 2}px + ${coverWidth * 0.12}px)`,
            width: `${Math.round(coverWidth * 0.14)}px`,
            height: `${Math.round(coverWidth * 0.14)}px`,
          }}
        >
          <span
            className="font-bold text-black"
            style={{ fontSize: `${Math.round(coverWidth * 0.09)}px` }}
          >
            {currentService.initial}
          </span>
        </div>
      )}

      {/* Now-Showing Active Service Details Bar */}
      <div
        className="absolute left-1/2 -translate-x-1/2 z-20 w-[90%] max-w-[540px] text-center"
        style={{
          top: `calc(10vh + 26vh + ${coverWidth / 2}px + ${coverWidth * 0.28}px)`,
        }}
      >
        <Link
          href={`/services/${currentService.id}`}
          className="group inline-block text-center hover:opacity-95 transition-opacity"
        >
          <h3 className="text-lg sm:text-2xl font-bold text-white tracking-tight flex items-center justify-center gap-2 group-hover:text-purple-300 transition-colors">
            <span>{currentService.name}</span>
            <span className="text-sm text-purple-400 group-hover:translate-x-1 transition-transform">
              →
            </span>
          </h3>
          <p className="text-xs sm:text-sm text-[#8a8a90] mt-0.5">
            {currentService.category} • {currentService.statLeft} {currentService.statLeftLabel}
          </p>
        </Link>

        {/* Progress & Quick Actions */}
        <div className="mt-3 flex items-center justify-center gap-4">
          <Link
            href={`/services/${currentService.id}`}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-semibold shadow-xl shadow-purple-950/80 border border-purple-400/40 transition-all hover:scale-105 cursor-pointer inline-flex items-center gap-2"
          >
            <span>Open Full Detail Page</span>
            <span className="text-sm">→</span>
          </Link>
          <button
            type="button"
            onClick={() => {
              if (onSelectService) {
                onSelectService(currentService.name);
              } else {
                router.push(`/services/${currentService.id}`);
              }
            }}
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-medium border border-white/20 backdrop-blur-md transition-all cursor-pointer"
          >
            Instant Inquiry
          </button>
        </div>
      </div>

      {/* A–Z Letter Index Bar */}
      <div className="absolute bottom-5 inset-x-0 z-20 flex justify-center px-4">
        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl bg-black/60 border border-white/15 backdrop-blur-xl shadow-2xl max-w-2xl">
          {azLetters.map((char) => {
            const hasService =
              char === "#" ||
              COVER_FLOW_SERVICES.some(
                (s) =>
                  s.name.toUpperCase().startsWith(char) ||
                  s.shortTitle.toUpperCase().startsWith(char)
              );
            const isCurrent =
              currentService.initial.toUpperCase() === char ||
              (char === "#" && centerIndex === 0);

            return (
              <button
                key={char}
                type="button"
                disabled={!hasService}
                onClick={() => handleLetterClick(char)}
                className={`w-6 h-6 sm:w-7 sm:h-7 rounded-md text-[10px] sm:text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                  isCurrent
                    ? "bg-purple-600 text-white border border-purple-300 shadow-md scale-110"
                    : hasService
                    ? "text-gray-200 hover:bg-white/15 hover:text-white"
                    : "text-gray-600 opacity-30 cursor-not-allowed"
                }`}
              >
                {char}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Right Hint */}
      <div className="absolute bottom-6 right-6 z-20 hidden md:block text-right pointer-events-none text-[11px] text-[#8a8a90] leading-relaxed">
        <div>Scroll, drag or ← → to browse</div>
        <div className="text-purple-300 font-medium">Click center card for full details</div>
      </div>
    </div>
  );
}
