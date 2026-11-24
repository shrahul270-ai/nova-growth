"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import SearchableSelect from "./SearchableSelect";
import { getCustomPublishers } from "../data/publishersData";
import { getClientLiveLocation } from "@/lib/geo";

export interface PublisherSite {
  id: string;
  domain: string;
  niche: string;
  language: string;
  country: string;
  countryFlag: string;
  dr: number;
  da: number;
  ahrefsTraffic: string;
  semrushTraffic: string;
  linkType: "DoFollow" | "NoFollow" | "Contextual";
  price: number;
  tatDays: number;
  indexable: boolean;
  sponsoredTag: boolean;
  isTopSelling?: boolean;
  isNewlyAdded?: boolean;
  sampleUrl?: string;
}

// Initial high-quality starter inventory populated across all requested categories & foreign countries
const initialPublishers: PublisherSite[] = [
  {
    id: "pub-01",
    domain: "techbeacon-daily.com",
    niche: "SaaS & Tech",
    language: "English",
    country: "USA",
    countryFlag: "🇺🇸",
    dr: 84,
    da: 79,
    ahrefsTraffic: "340,000+",
    semrushTraffic: "410,000+",
    linkType: "DoFollow",
    price: 320,
    tatDays: 2,
    indexable: true,
    sponsoredTag: false,
    isTopSelling: true,
  },
  {
    id: "pub-02",
    domain: "venturepulse-media.io",
    niche: "Business & Startup",
    language: "English",
    country: "USA",
    countryFlag: "🇺🇸",
    dr: 78,
    da: 74,
    ahrefsTraffic: "195,000+",
    semrushTraffic: "230,000+",
    linkType: "DoFollow",
    price: 280,
    tatDays: 3,
    indexable: true,
    sponsoredTag: false,
    isNewlyAdded: true,
  },
  {
    id: "pub-03",
    domain: "globalfinwire.co.uk",
    niche: "Finance & Investment",
    language: "English",
    country: "UK",
    countryFlag: "🇬🇧",
    dr: 88,
    da: 82,
    ahrefsTraffic: "620,000+",
    semrushTraffic: "740,000+",
    linkType: "DoFollow",
    price: 490,
    tatDays: 4,
    indexable: true,
    sponsoredTag: false,
    isTopSelling: true,
  },
  {
    id: "pub-04",
    domain: "retailchronicle-trends.com",
    niche: "E-Commerce & Retail",
    language: "English",
    country: "USA",
    countryFlag: "🇺🇸",
    dr: 76,
    da: 71,
    ahrefsTraffic: "145,000+",
    semrushTraffic: "180,000+",
    linkType: "DoFollow",
    price: 240,
    tatDays: 2,
    indexable: true,
    sponsoredTag: false,
  },
  {
    id: "pub-05",
    domain: "healthpulse-journal.org",
    niche: "Health & Medical",
    language: "English",
    country: "Canada",
    countryFlag: "🇨🇦",
    dr: 72,
    da: 68,
    ahrefsTraffic: "110,000+",
    semrushTraffic: "135,000+",
    linkType: "DoFollow",
    price: 210,
    tatDays: 3,
    indexable: true,
    sponsoredTag: false,
  },
  {
    id: "pub-06",
    domain: "martech-insider.net",
    niche: "Digital Marketing & SEO",
    language: "English",
    country: "USA",
    countryFlag: "🇺🇸",
    dr: 81,
    da: 77,
    ahrefsTraffic: "280,000+",
    semrushTraffic: "310,000+",
    linkType: "DoFollow",
    price: 310,
    tatDays: 2,
    indexable: true,
    sponsoredTag: false,
    isTopSelling: true,
  },
  {
    id: "pub-07",
    domain: "neuraledge-ai.io",
    niche: "AI & Machine Learning",
    language: "English",
    country: "USA",
    countryFlag: "🇺🇸",
    dr: 85,
    da: 79,
    ahrefsTraffic: "420,000+",
    semrushTraffic: "460,000+",
    linkType: "DoFollow",
    price: 360,
    tatDays: 2,
    indexable: true,
    sponsoredTag: false,
    isTopSelling: true,
  },
  {
    id: "pub-08",
    domain: "cryptoledger-daily.com",
    niche: "Cryptocurrency & Blockchain",
    language: "English",
    country: "Singapore",
    countryFlag: "🇸🇬",
    dr: 79,
    da: 73,
    ahrefsTraffic: "220,000+",
    semrushTraffic: "270,000+",
    linkType: "DoFollow",
    price: 350,
    tatDays: 2,
    indexable: true,
    sponsoredTag: false,
  },
  {
    id: "pub-09",
    domain: "highroller-casino-insider.com",
    niche: "Casino",
    language: "English",
    country: "UK",
    countryFlag: "🇬🇧",
    dr: 80,
    da: 75,
    ahrefsTraffic: "310,000+",
    semrushTraffic: "350,000+",
    linkType: "DoFollow",
    price: 450,
    tatDays: 3,
    indexable: true,
    sponsoredTag: false,
    isTopSelling: true,
  },
  {
    id: "pub-10",
    domain: "clouddevops-review.io",
    niche: "Technology",
    language: "English",
    country: "Germany",
    countryFlag: "🇩🇪",
    dr: 86,
    da: 80,
    ahrefsTraffic: "490,000+",
    semrushTraffic: "530,000+",
    linkType: "DoFollow",
    price: 420,
    tatDays: 3,
    indexable: true,
    sponsoredTag: false,
  },
  {
    id: "pub-11",
    domain: "realtyinsight-journal.com",
    niche: "Home & Real Estate",
    language: "English",
    country: "UAE",
    countryFlag: "🇦🇪",
    dr: 74,
    da: 69,
    ahrefsTraffic: "160,000+",
    semrushTraffic: "185,000+",
    linkType: "DoFollow",
    price: 260,
    tatDays: 3,
    indexable: true,
    sponsoredTag: false,
  },
  {
    id: "pub-12",
    domain: "homecraft-improvement.net",
    niche: "Home Improvement",
    language: "English",
    country: "USA",
    countryFlag: "🇺🇸",
    dr: 71,
    da: 66,
    ahrefsTraffic: "125,000+",
    semrushTraffic: "140,000+",
    linkType: "DoFollow",
    price: 220,
    tatDays: 2,
    indexable: true,
    sponsoredTag: false,
  },
  {
    id: "pub-13",
    domain: "gamersarena-hub.gg",
    niche: "Gaming & Esports",
    language: "English",
    country: "Japan",
    countryFlag: "🇯🇵",
    dr: 82,
    da: 76,
    ahrefsTraffic: "580,000+",
    semrushTraffic: "620,000+",
    linkType: "DoFollow",
    price: 330,
    tatDays: 2,
    indexable: true,
    sponsoredTag: false,
    isNewlyAdded: true,
  },
  {
    id: "pub-14",
    domain: "travelwanderer-global.com",
    niche: "Travel & Hospitality",
    language: "English",
    country: "Australia",
    countryFlag: "🇦🇺",
    dr: 77,
    da: 72,
    ahrefsTraffic: "210,000+",
    semrushTraffic: "250,000+",
    linkType: "DoFollow",
    price: 290,
    tatDays: 3,
    indexable: true,
    sponsoredTag: false,
  },
  {
    id: "pub-15",
    domain: "globetrekker-travels.com",
    niche: "Travels",
    language: "English",
    country: "Spain",
    countryFlag: "🇪🇸",
    dr: 73,
    da: 69,
    ahrefsTraffic: "140,000+",
    semrushTraffic: "170,000+",
    linkType: "DoFollow",
    price: 240,
    tatDays: 2,
    indexable: true,
    sponsoredTag: false,
  },
  {
    id: "pub-16",
    domain: "proautomotive-mag.com",
    niche: "Automotive",
    language: "English",
    country: "Germany",
    countryFlag: "🇩🇪",
    dr: 78,
    da: 73,
    ahrefsTraffic: "230,000+",
    semrushTraffic: "260,000+",
    linkType: "DoFollow",
    price: 280,
    tatDays: 3,
    indexable: true,
    sponsoredTag: false,
  },
  {
    id: "pub-17",
    domain: "agrigrowth-trends.org",
    niche: "Agriculture",
    language: "English",
    country: "Netherlands",
    countryFlag: "🇳🇱",
    dr: 68,
    da: 64,
    ahrefsTraffic: "85,000+",
    semrushTraffic: "95,000+",
    linkType: "DoFollow",
    price: 190,
    tatDays: 2,
    indexable: true,
    sponsoredTag: false,
  },
  {
    id: "pub-18",
    domain: "edulearn-careers.edu",
    niche: "Education & Careers",
    language: "English",
    country: "USA",
    countryFlag: "🇺🇸",
    dr: 85,
    da: 81,
    ahrefsTraffic: "510,000+",
    semrushTraffic: "590,000+",
    linkType: "DoFollow",
    price: 390,
    tatDays: 3,
    indexable: true,
    sponsoredTag: false,
    isTopSelling: true,
  },
  {
    id: "pub-19",
    domain: "edupath-learning.org",
    niche: "Education",
    language: "English",
    country: "UK",
    countryFlag: "🇬🇧",
    dr: 75,
    da: 70,
    ahrefsTraffic: "170,000+",
    semrushTraffic: "200,000+",
    linkType: "DoFollow",
    price: 250,
    tatDays: 2,
    indexable: true,
    sponsoredTag: false,
  },
  {
    id: "pub-20",
    domain: "stylevogue-fashion.com",
    niche: "Fashion & Beauty",
    language: "English",
    country: "France",
    countryFlag: "🇫🇷",
    dr: 79,
    da: 74,
    ahrefsTraffic: "290,000+",
    semrushTraffic: "340,000+",
    linkType: "DoFollow",
    price: 310,
    tatDays: 3,
    indexable: true,
    sponsoredTag: false,
  },
  {
    id: "pub-21",
    domain: "gourmetbites-culinary.com",
    niche: "Food & Beverage",
    language: "English",
    country: "Italy",
    countryFlag: "🇮🇹",
    dr: 76,
    da: 71,
    ahrefsTraffic: "180,000+",
    semrushTraffic: "215,000+",
    linkType: "DoFollow",
    price: 250,
    tatDays: 2,
    indexable: true,
    sponsoredTag: false,
  },
  {
    id: "pub-22",
    domain: "sportssphere-weekly.com",
    niche: "Sports & Outdoors",
    language: "English",
    country: "USA",
    countryFlag: "🇺🇸",
    dr: 81,
    da: 77,
    ahrefsTraffic: "440,000+",
    semrushTraffic: "490,000+",
    linkType: "DoFollow",
    price: 340,
    tatDays: 2,
    indexable: true,
    sponsoredTag: false,
  },
  {
    id: "pub-23",
    domain: "jurislex-legal.com",
    niche: "Legal & Law",
    language: "English",
    country: "Switzerland",
    countryFlag: "🇨🇭",
    dr: 83,
    da: 78,
    ahrefsTraffic: "260,000+",
    semrushTraffic: "310,000+",
    linkType: "DoFollow",
    price: 380,
    tatDays: 3,
    indexable: true,
    sponsoredTag: false,
  },
  {
    id: "pub-24",
    domain: "sciencediscovery-daily.org",
    niche: "Science & Research",
    language: "English",
    country: "Sweden",
    countryFlag: "🇸🇪",
    dr: 87,
    da: 82,
    ahrefsTraffic: "610,000+",
    semrushTraffic: "680,000+",
    linkType: "DoFollow",
    price: 430,
    tatDays: 4,
    indexable: true,
    sponsoredTag: false,
  },
  {
    id: "pub-25",
    domain: "ecohaven-sustainable.org",
    niche: "Environment & Sustainability",
    language: "English",
    country: "Norway",
    countryFlag: "🇳🇴",
    dr: 74,
    da: 70,
    ahrefsTraffic: "135,000+",
    semrushTraffic: "155,000+",
    linkType: "DoFollow",
    price: 230,
    tatDays: 2,
    indexable: true,
    sponsoredTag: false,
  },
  {
    id: "pub-26",
    domain: "familymatters-parenting.com",
    niche: "Family & Parenting",
    language: "English",
    country: "Denmark",
    countryFlag: "🇩🇰",
    dr: 72,
    da: 67,
    ahrefsTraffic: "115,000+",
    semrushTraffic: "130,000+",
    linkType: "DoFollow",
    price: 200,
    tatDays: 2,
    indexable: true,
    sponsoredTag: false,
  },
  {
    id: "pub-27",
    domain: "furryfriends-petcare.com",
    niche: "Pets & Animals",
    language: "English",
    country: "Ireland",
    countryFlag: "🇮🇪",
    dr: 70,
    da: 65,
    ahrefsTraffic: "98,000+",
    semrushTraffic: "120,000+",
    linkType: "DoFollow",
    price: 195,
    tatDays: 2,
    indexable: true,
    sponsoredTag: false,
  },
  {
    id: "pub-28",
    domain: "industriallogistics-wire.com",
    niche: "Industrial & Manufacturing",
    language: "English",
    country: "Germany",
    countryFlag: "🇩🇪",
    dr: 75,
    da: 71,
    ahrefsTraffic: "150,000+",
    semrushTraffic: "175,000+",
    linkType: "DoFollow",
    price: 270,
    tatDays: 3,
    indexable: true,
    sponsoredTag: false,
  },
  {
    id: "pub-29",
    domain: "creativecanvas-art.com",
    niche: "Art, Design & Photography",
    language: "English",
    country: "France",
    countryFlag: "🇫🇷",
    dr: 73,
    da: 68,
    ahrefsTraffic: "130,000+",
    semrushTraffic: "145,000+",
    linkType: "DoFollow",
    price: 220,
    tatDays: 2,
    indexable: true,
    sponsoredTag: false,
  },
  {
    id: "pub-30",
    domain: "cinemagaze-media.com",
    niche: "Entertainment & Media",
    language: "English",
    country: "USA",
    countryFlag: "🇺🇸",
    dr: 80,
    da: 75,
    ahrefsTraffic: "370,000+",
    semrushTraffic: "420,000+",
    linkType: "DoFollow",
    price: 320,
    tatDays: 2,
    indexable: true,
    sponsoredTag: false,
  },
  {
    id: "pub-31",
    domain: "globalvox-news.org",
    niche: "News & Politics",
    language: "English",
    country: "UK",
    countryFlag: "🇬🇧",
    dr: 86,
    da: 81,
    ahrefsTraffic: "720,000+",
    semrushTraffic: "850,000+",
    linkType: "DoFollow",
    price: 460,
    tatDays: 3,
    indexable: true,
    sponsoredTag: false,
    isTopSelling: true,
  },
  {
    id: "pub-32",
    domain: "generalwire-daily.com",
    niche: "General",
    language: "English",
    country: "USA",
    countryFlag: "🇺🇸",
    dr: 75,
    da: 70,
    ahrefsTraffic: "190,000+",
    semrushTraffic: "210,000+",
    linkType: "DoFollow",
    price: 240,
    tatDays: 2,
    indexable: true,
    sponsoredTag: false,
  },
  {
    id: "pub-33",
    domain: "australianbiz-herald.com.au",
    niche: "Business",
    language: "English",
    country: "Australia",
    countryFlag: "🇦🇺",
    dr: 75,
    da: 70,
    ahrefsTraffic: "130,000+",
    semrushTraffic: "160,000+",
    linkType: "DoFollow",
    price: 260,
    tatDays: 3,
    indexable: true,
    sponsoredTag: false,
    isNewlyAdded: true,
  },
  {
    id: "pub-34",
    domain: "latinamerica-trends.br",
    niche: "Business & Startup",
    language: "Portuguese",
    country: "Brazil",
    countryFlag: "🇧🇷",
    dr: 76,
    da: 72,
    ahrefsTraffic: "230,000+",
    semrushTraffic: "260,000+",
    linkType: "DoFollow",
    price: 260,
    tatDays: 2,
    indexable: true,
    sponsoredTag: false,
  },
  {
    id: "pub-35",
    domain: "urbanliving-lifestyle.com",
    niche: "Lifestyle & Relationships",
    language: "English",
    country: "USA",
    countryFlag: "🇺🇸",
    dr: 69,
    da: 65,
    ahrefsTraffic: "92,000+",
    semrushTraffic: "115,000+",
    linkType: "DoFollow",
    price: 180,
    tatDays: 2,
    indexable: true,
    sponsoredTag: false,
  },
];

const BULK_SEARCH_LIMIT = 60;

export default function GuestPostMarketplace() {
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLanguage, setSelectedLanguage] = useState("All Languages");
  const [selectedLinkType, setSelectedLinkType] = useState("All Link Types");
  const [selectedCountry, setSelectedCountry] = useState("All Countries");

  // Numerical ranges (TAT removed per instruction)
  const [minDa, setMinDa] = useState<string>("");
  const [maxDa, setMaxDa] = useState<string>("");
  const [minDr, setMinDr] = useState<string>("");
  const [maxDr, setMaxDr] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  // Quick preset filters
  const [quickFilter, setQuickFilter] = useState<"all" | "top_selling" | "newly_added" | "high_dr">("all");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(true);

  // Bulk Search Modal State
  const [isBulkSearchOpen, setIsBulkSearchOpen] = useState(false);
  const [bulkInput, setBulkInput] = useState("");
  const [bulkSearchTerms, setBulkSearchTerms] = useState<string[]>([]);

  // Order / Inquiry Modal State
  const [selectedSiteForOrder, setSelectedSiteForOrder] = useState<PublisherSite | null>(null);

  // Buyer Account Authentication State (Email + Phone + Password)
  interface BuyerUser {
    email: string;
    phone: string;
  }
  const [buyerUser, setBuyerUser] = useState<BuyerUser | null>(null);
  const [isBuyerLoggedIn, setIsBuyerLoggedIn] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signup" | "login">("signup");
  const [authEmail, setAuthEmail] = useState("");
  const [authPhone, setAuthPhone] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmittingAuth, setIsSubmittingAuth] = useState(false);

  // Check buyer session on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("nova_buyer_session");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.email) {
          setBuyerUser(parsed);
          setIsBuyerLoggedIn(true);
        }
      }
    } catch {}
  }, []);

  const handleBuyerLogout = () => {
    try {
      localStorage.removeItem("nova_buyer_session");
    } catch {}
    setBuyerUser(null);
    setIsBuyerLoggedIn(false);
  };

  // Custom publishers added via Admin panel or Custom Database
  const [customPublishers, setCustomPublishers] = useState<PublisherSite[]>([]);

  useEffect(() => {
    const syncCustom = async () => {
      try {
        const res = await fetch("/api/db/custom-database");
        const data = await res.json();
        if (data.success && Array.isArray(data.customSites) && data.customSites.length > 0) {
          setCustomPublishers(data.customSites);
          return;
        }
      } catch {}

      try {
        const customs = getCustomPublishers();
        if (customs && customs.length > 0) {
          setCustomPublishers(customs as unknown as PublisherSite[]);
        }
      } catch {}
    };
    syncCustom();
    window.addEventListener("publishers-updated", syncCustom);
    return () => window.removeEventListener("publishers-updated", syncCustom);
  }, []);

  // Combined Marketplace publishers: Prioritize user's real websites if added (Strict 30-item showcase)
  const allPublishers: PublisherSite[] = useMemo(() => {
    if (customPublishers.length > 0) {
      return customPublishers.slice(0, 30);
    }
    return initialPublishers.slice(0, 30);
  }, [customPublishers]);

  // Download 40,000+ guest post database in Excel format (Secure stream)
  const handleDownloadDatabase = () => {
    try {
      if (!isBuyerLoggedIn || !buyerUser?.email) {
        setAuthMode("signup");
        setIsAuthModalOpen(true);
        return;
      }
      const a = document.createElement("a");
      a.href = `/api/download/database?email=${encodeURIComponent(buyerUser.email)}`;
      a.download = `nova_growth_40000_guest_posts_${Date.now()}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    } catch {}
  };

  const handleDownloadDatabaseClick = () => {
    if (!isBuyerLoggedIn) {
      setAuthMode("signup");
      setIsAuthModalOpen(true);
      return;
    }
    // When logged in, navigate immediately to the Buyer Dashboard where the full database and download live!
    window.location.href = "/buyer-dashboard";
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    const cleanEmail = authEmail.trim().toLowerCase();
    const cleanPhone = authPhone.trim();

    if (!cleanEmail) {
      setAuthError("Email address is required.");
      return;
    }
    if (authMode === "signup" && !cleanPhone) {
      setAuthError("Mobile / WhatsApp number is required.");
      return;
    }
    if (!authPassword) {
      setAuthError("Password is required.");
      return;
    }

    setIsSubmittingAuth(true);

    const userRecord: BuyerUser = {
      email: cleanEmail,
      phone: cleanPhone || "Not specified",
    };

    try {
      localStorage.setItem("nova_buyer_session", JSON.stringify(userRecord));
      setBuyerUser(userRecord);
      setIsBuyerLoggedIn(true);

      const clientGeo = await getClientLiveLocation();

      // Save lead to database as high-intent 40,000 database download user
      await fetch("/api/db/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "database_download",
          name: cleanEmail.split("@")[0],
          email: cleanEmail,
          phone: cleanPhone || "Not specified",
          service: "40,000+ Full Database Download Request",
          message:
            authMode === "login"
              ? `User entered Login ID (${cleanEmail}) to download the complete 40,000+ guest post database.`
              : `New buyer registered with Login ID (${cleanEmail}) to unlock and download 40,000+ guest post database.`,
          notes: `Action: 40k Database Download Request | Auth: ${authMode.toUpperCase()} | Phone: ${cleanPhone || "N/A"}`,
          clientGeo,
        }),
      });

      // Also track in interactions table for live location tracker & activity stream
      await fetch("/api/db/interactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "database_download",
          action: "download",
          name: cleanEmail.split("@")[0],
          email: cleanEmail,
          phone: cleanPhone || "",
          title: `40,000+ Database Download Requested: ${cleanEmail}`,
          details: `User authenticated to download 40,000+ sites dataset. Mode: ${authMode}.`,
          clientGeo,
        }),
      }).catch(() => {});

      setIsAuthModalOpen(false);
      setAuthEmail("");
      setAuthPhone("");
      setAuthPassword("");

      // Redirect immediately to the full Buyer Dashboard!
      window.location.href = "/buyer-dashboard";
    } catch (err) {
      console.error("Auth submit error:", err);
    } finally {
      setIsSubmittingAuth(false);
    }
  };

  // All requested categories
  const categories = [
    "All Categories",
    "SaaS & Tech",
    "AI & Machine Learning",
    "Business & Startup",
    "Finance & Investment",
    "Cryptocurrency & Blockchain",
    "E-Commerce & Retail",
    "Digital Marketing & SEO",
    "Health & Medical",
    "Lifestyle & Relationships",
    "Travel & Hospitality",
    "Education & Careers",
    "Fashion & Beauty",
    "Home & Real Estate",
    "Food & Beverage",
    "Automotive",
    "Gaming & Esports",
    "Entertainment & Media",
    "News & Politics",
    "Sports & Outdoors",
    "Legal & Law",
    "Science & Research",
    "Environment & Sustainability",
    "Family & Parenting",
    "Pets & Animals",
    "Industrial & Manufacturing",
    "Art, Design & Photography",
    "Agriculture",
    "Home Improvement",
    "Travels",
    "Technology",
    "General",
    "Business",
    "Digital Marketing",
    "Education",
    "Casino",
  ];

  // Comprehensive international & foreign countries worldwide
  const countries = [
    "All Countries",
    "United States (USA)",
    "United Kingdom (UK)",
    "Canada",
    "Australia",
    "Germany",
    "France",
    "Netherlands",
    "Switzerland",
    "Sweden",
    "Norway",
    "Denmark",
    "Ireland",
    "Spain",
    "Italy",
    "Singapore",
    "United Arab Emirates (UAE)",
    "Saudi Arabia",
    "Japan",
    "South Korea",
    "New Zealand",
    "Brazil",
    "Mexico",
    "South Africa",
    "Poland",
    "Austria",
    "Belgium",
    "Portugal",
    "Finland",
    "Israel",
    "Turkey",
    "Argentina",
    "Chile",
    "Colombia",
    "Malaysia",
    "Thailand",
    "Indonesia",
    "Philippines",
    "India",
    "Global / International",
  ];

  const languages = [
    "All Languages",
    "English",
    "Spanish",
    "German",
    "French",
    "Italian",
    "Portuguese",
    "Hindi",
    "Arabic",
    "Japanese",
  ];

  const linkTypes = ["All Link Types", "DoFollow", "NoFollow", "Contextual"];

  // Parse bulk input lines for counter & limit display
  const parsedBulkLines = useMemo(() => {
    return bulkInput
      .split(/[\n,]+/)
      .map((s) => s.trim())
      .filter(Boolean);
  }, [bulkInput]);

  const isOverBulkLimit = parsedBulkLines.length > BULK_SEARCH_LIMIT;

  // Filter logic
  const filteredSites = useMemo(() => {
    return allPublishers.filter((site) => {
      // 1. Bulk search filter
      if (bulkSearchTerms.length > 0) {
        const matchesBulk = bulkSearchTerms.some((term) => {
          const lowerDomain = site.domain.toLowerCase();
          const lowerNiche = site.niche.toLowerCase();
          return (
            lowerDomain.includes(term) ||
            term.includes(lowerDomain) ||
            lowerNiche.includes(term)
          );
        });
        if (!matchesBulk) return false;
      }

      // 2. Keyword/Domain search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesDomain = site.domain.toLowerCase().includes(q);
        const matchesNiche = site.niche.toLowerCase().includes(q);
        if (!matchesDomain && !matchesNiche) return false;
      }

      // 3. Quick preset filter
      if (quickFilter === "top_selling" && !site.isTopSelling) return false;
      if (quickFilter === "newly_added" && !site.isNewlyAdded) return false;
      if (quickFilter === "high_dr" && site.dr < 80) return false;

      // 4. Category
      if (selectedCategory !== "All Categories" && selectedCategory !== "All") {
        const sel = selectedCategory.toLowerCase();
        const niche = site.niche.toLowerCase();
        if (niche !== sel && !niche.includes(sel) && !sel.includes(niche)) {
          return false;
        }
      }

      // 5. Language
      if (
        selectedLanguage !== "All Languages" &&
        selectedLanguage !== "All" &&
        site.language !== selectedLanguage
      ) {
        return false;
      }

      // 6. Link Type
      if (
        selectedLinkType !== "All Link Types" &&
        selectedLinkType !== "All" &&
        site.linkType !== selectedLinkType
      ) {
        return false;
      }

      // 7. Country (flexible foreign country matching)
      if (
        selectedCountry !== "All Countries" &&
        selectedCountry !== "All"
      ) {
        const sel = selectedCountry.toLowerCase();
        const c = site.country.toLowerCase();
        const isMatch =
          sel.includes(c) ||
          c.includes(sel) ||
          (c === "usa" && sel.includes("united states")) ||
          (c === "uk" && sel.includes("united kingdom")) ||
          (c === "uae" && sel.includes("united arab emirates"));
        if (!isMatch) return false;
      }

      // 8. DA bounds
      if (minDa && site.da < Number(minDa)) return false;
      if (maxDa && site.da > Number(maxDa)) return false;

      // 9. DR bounds
      if (minDr && site.dr < Number(minDr)) return false;
      if (maxDr && site.dr > Number(maxDr)) return false;

      // 10. Price bounds
      if (minPrice && site.price < Number(minPrice)) return false;
      if (maxPrice && site.price > Number(maxPrice)) return false;

      return true;
    });
  }, [
    allPublishers,
    bulkSearchTerms,
    searchQuery,
    quickFilter,
    selectedCategory,
    selectedLanguage,
    selectedLinkType,
    selectedCountry,
    minDa,
    maxDa,
    minDr,
    maxDr,
    minPrice,
    maxPrice,
  ]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setBulkSearchTerms([]);
    setBulkInput("");
    setSelectedCategory("All Categories");
    setSelectedLanguage("All Languages");
    setSelectedLinkType("All Link Types");
    setSelectedCountry("All Countries");
    setMinDa("");
    setMaxDa("");
    setMinDr("");
    setMaxDr("");
    setMinPrice("");
    setMaxPrice("");
    setQuickFilter("all");
  };

  const handleApplyBulkSearch = () => {
    if (parsedBulkLines.length === 0) return;
    const terms = parsedBulkLines
      .slice(0, BULK_SEARCH_LIMIT)
      .map((s) => s.toLowerCase());
    setBulkSearchTerms(terms);
    setIsBulkSearchOpen(false);
  };

  // Active filter count for badge
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchQuery) count++;
    if (selectedCategory !== "All Categories") count++;
    if (selectedCountry !== "All Countries") count++;
    if (selectedLinkType !== "All Link Types") count++;
    if (selectedLanguage !== "All Languages") count++;
    if (minDr || maxDr) count++;
    if (minDa || maxDa) count++;
    if (minPrice || maxPrice) count++;
    if (bulkSearchTerms.length > 0) count++;
    if (quickFilter !== "all") count++;
    return count;
  }, [
    searchQuery,
    selectedCategory,
    selectedCountry,
    selectedLinkType,
    selectedLanguage,
    minDr,
    maxDr,
    minDa,
    maxDa,
    minPrice,
    maxPrice,
    bulkSearchTerms,
    quickFilter,
  ]);

  return (
    <section id="marketplace" className="py-10 sm:py-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto font-sans">
      
      {/* SECTION HEADER WITH STATS */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-800 mb-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live Marketplace Inventory
          </div>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight flex items-center gap-3">
            <span>1,500+ Verified Publisher Websites</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 max-w-2xl leading-relaxed">
            Filter high-authority media outlets by Moz DA, Ahrefs DR, real organic traffic, niche, and country.
            100% white-hat editorial placements adhering to Google Search Essentials.
          </p>
        </div>

        {/* Live inventory badge & 1,500+ Database Download Action */}
        <div className="flex items-center gap-3 flex-wrap self-start md:self-auto">
          {/* Download Complete Database Button */}
          <button
            type="button"
            onClick={handleDownloadDatabaseClick}
            className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-md shadow-emerald-700/20 cursor-pointer transition-all hover:scale-102 active:scale-98"
            title="Download full 1,500+ guest post database in Excel (.xlsx / .csv)"
          >
            <span className="text-sm">📥</span>
            <span>Download Database (.xlsx)</span>
          </button>

          <div className="flex items-center gap-2 text-xs bg-white border border-slate-200 py-2 px-3.5 rounded-xl shadow-xs">
            <span className="text-slate-500">Showing:</span>
            <span className="font-extrabold text-amber-600">
              {isBuyerLoggedIn ? filteredSites.length : Math.min(filteredSites.length, 6)}
            </span>
            <span className="text-slate-500">of 1,500+ Active Sites</span>
          </div>
        </div>
      </div>

      {/* BUYER AUTHENTICATED WELCOME BANNER (Fixes Issue 14: Aligned cleanly with filter card) */}
      {isBuyerLoggedIn && (
        <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/80 border border-emerald-300 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-xs text-emerald-950">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
            <span className="font-bold text-slate-900">
              Buyer Account Active: <strong className="text-emerald-700 font-extrabold">{buyerUser?.email || "Buyer"}</strong>
            </span>
            <span className="hidden md:inline text-slate-600">• Full 1,500+ Directory &amp; Direct Export Unlocked</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/buyer-dashboard"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-yellow-500 text-white font-bold transition-all shadow-xs flex items-center gap-1.5"
            >
              <span>🚀</span>
              <span>Open Buyer Dashboard</span>
            </Link>
            <button
              onClick={handleBuyerLogout}
              className="text-slate-500 hover:text-slate-800 underline text-xs cursor-pointer font-medium"
            >
              Log Out
            </button>
          </div>
        </div>
      )}

      {/* DISTINCTIVE BESPOKE CATEGORY & FILTER CONTAINER (White & Yellow-Gold Theme) */}
      <div className="relative rounded-3xl bg-white border border-amber-200/80 p-5 sm:p-6 shadow-md shadow-amber-900/5 mb-6">
        
        {/* Subtle Warm Amber Line Top */}
        <div className="absolute inset-x-8 -top-px h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent pointer-events-none" />

        {/* Top Search & Primary Action Row */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          {/* Main Keyword / Domain Search Input */}
          <div className="relative flex-1">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search from 1,500+ verified websites by domain, niche or keyword..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20 transition-all font-medium"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setIsBulkSearchOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
              title="Bulk check multiple domains (up to 60)"
            >
              <span>📋</span>
              <span>Bulk Search</span>
              {bulkSearchTerms.length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-white text-xs font-black">
                  {bulkSearchTerms.length}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs border transition-all flex items-center gap-1.5 cursor-pointer ${
                showAdvancedFilters
                  ? "bg-amber-500/10 border-amber-500 text-amber-800"
                  : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
              }`}
            >
              <span>⚙</span>
              <span>{showAdvancedFilters ? "Hide Filters" : "Filter Options"}</span>
              {activeFiltersCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-amber-500" />
              )}
            </button>

            <button
              type="button"
              onClick={handleResetFilters}
              className="px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-rose-50 text-slate-500 hover:text-rose-600 font-semibold text-xs border border-slate-200 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* BULK SEARCH ACTIVE CHIP INDICATOR */}
        {bulkSearchTerms.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-2 py-2 px-3.5 my-3 bg-amber-50 border border-amber-200 rounded-xl text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-bold text-amber-800 flex items-center gap-1">
                <span>📋</span> Bulk Search Active ({bulkSearchTerms.length} / {BULK_SEARCH_LIMIT} domains):
              </span>
              {bulkSearchTerms.slice(0, 4).map((t, i) => (
                <span key={i} className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-xs text-slate-700 font-mono">
                  {t}
                </span>
              ))}
              {bulkSearchTerms.length > 4 && (
                <span className="text-xs text-slate-500 font-semibold">
                  +{bulkSearchTerms.length - 4} more
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={() => {
                setBulkSearchTerms([]);
                setBulkInput("");
              }}
              className="text-rose-600 hover:text-rose-700 font-bold text-xs underline cursor-pointer"
            >
              Clear Bulk Search ✕
            </button>
          </div>
        )}

        {/* EXPANDABLE MULTI-CRITERIA FILTERS GRID (Tightened Spacing & Clean Modern Card Layout) */}
        {showAdvancedFilters && (
          <div className="pt-4 space-y-3.5 border-t border-slate-100 mt-3">
            
            {/* Row 1: Direct Typeable Searchable Comboboxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 text-xs">
              
              {/* Category / Niche (Directly typeable in box) */}
              <SearchableSelect
                label="Category / Niche"
                value={selectedCategory}
                options={categories}
                onChange={setSelectedCategory}
                placeholder="All Categories"
              />

              {/* Target Country (Comprehensive Foreign Countries) */}
              <SearchableSelect
                label="Target Country"
                value={selectedCountry}
                options={countries}
                onChange={setSelectedCountry}
                placeholder="All Countries"
              />

              {/* Link Attribute */}
              <SearchableSelect
                label="Link Attribute"
                value={selectedLinkType}
                options={linkTypes}
                onChange={setSelectedLinkType}
                placeholder="All Link Types"
              />

              {/* Language */}
              <SearchableSelect
                label="Language"
                value={selectedLanguage}
                options={languages}
                onChange={setSelectedLanguage}
                placeholder="All Languages"
              />
            </div>

            {/* Row 2: Metric Ranges (Ahrefs DR, Moz DA, Price) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
              {/* DR Min / Max */}
              <div>
                <label className="block text-slate-700 text-xs font-bold mb-1.5">
                  Ahrefs DR Range
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minDr}
                    onChange={(e) => setMinDr(e.target.value)}
                    className="w-1/2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500 transition-colors"
                  />
                  <span className="text-slate-400 font-bold">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxDr}
                    onChange={(e) => setMaxDr(e.target.value)}
                    className="w-1/2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              {/* DA Min / Max */}
              <div>
                <label className="block text-slate-700 text-xs font-bold mb-1.5">
                  Moz DA Range
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minDa}
                    onChange={(e) => setMinDa(e.target.value)}
                    className="w-1/2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500 transition-colors"
                  />
                  <span className="text-slate-400 font-bold">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxDa}
                    onChange={(e) => setMaxDa(e.target.value)}
                    className="w-1/2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              {/* Price Min / Max */}
              <div>
                <label className="block text-slate-700 text-xs font-bold mb-1.5">
                  Price ($ USD)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min $"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-1/2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500 transition-colors"
                  />
                  <span className="text-slate-400 font-bold">-</span>
                  <input
                    type="number"
                    placeholder="Max $"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-1/2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Quick Segment Filter Badges */}
            <div className="pt-3 flex flex-wrap items-center gap-2 border-t border-slate-100">
              <span className="text-xs text-slate-500 font-bold mr-1">Quick Filters:</span>
              
              <button
                type="button"
                onClick={() => setQuickFilter("all")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  quickFilter === "all"
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-xs font-bold"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                All Publishers
              </button>

              <button
                type="button"
                onClick={() => setQuickFilter("top_selling")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                  quickFilter === "top_selling"
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-xs font-bold"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                <span>🔥</span> Top Selling
              </button>

              <button
                type="button"
                onClick={() => setQuickFilter("newly_added")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                  quickFilter === "newly_added"
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-xs font-bold"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                <span>✨</span> Newly Added
              </button>

              <button
                type="button"
                onClick={() => setQuickFilter("high_dr")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                  quickFilter === "high_dr"
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-xs font-bold"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                <span>⭐</span> DR 80+ Authority
              </button>
            </div>

          </div>
        )}

      </div>

      {/* PUBLISHER INVENTORY TABLE (Fixes Issue 4: Generous row height & zebra striping; Fixes Issue 8: Text sizes >= 12px) */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-lg shadow-amber-900/5">
        <div className="overflow-x-auto [scrollbar-width:thin] [scrollbar-color:#d97706_transparent]">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-[#fdfbf7] border-b border-amber-200/70 text-slate-700 uppercase text-xs tracking-wider font-bold">
              <tr>
                <th scope="col" className="py-4 px-5">Publication Domain</th>
                <th scope="col" className="py-4 px-4">Niche Category</th>
                <th scope="col" className="py-4 px-4">Ahrefs DR</th>
                <th scope="col" className="py-4 px-4">Moz DA</th>
                <th scope="col" className="py-4 px-4">Traffic</th>
                <th scope="col" className="py-4 px-4">Target Geo</th>
                <th scope="col" className="py-4 px-4">Link Type</th>
                <th scope="col" className="py-4 px-4">Placement Price</th>
                <th scope="col" className="py-4 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSites.length > 0 ? (
                (isBuyerLoggedIn ? filteredSites : filteredSites.slice(0, 6)).map((site) => (
                  <tr
                    key={site.id}
                    className="hover:bg-amber-50/50 even:bg-slate-50/40 transition-colors group"
                  >
                    {/* Domain & Badge */}
                    <td className="py-4.5 px-5 font-bold text-slate-900 text-sm">
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                        <span className="group-hover:text-amber-600 transition-colors">{site.domain}</span>
                        {site.isTopSelling && (
                          <span className="text-xs bg-amber-500/15 text-amber-700 border border-amber-500/30 font-bold px-2 py-0.5 rounded-full">
                            Popular
                          </span>
                        )}
                        {site.isNewlyAdded && (
                          <span className="text-xs bg-blue-500/15 text-blue-700 border border-blue-500/30 font-bold px-2 py-0.5 rounded-full">
                            New
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Category (Fixes Issue 8: upgraded from 11px to text-xs) */}
                    <td className="py-4.5 px-4">
                      <span className="px-2.5 py-1 rounded-md bg-amber-50/80 border border-amber-200/70 text-xs font-semibold text-amber-900">
                        {site.niche}
                      </span>
                    </td>

                    {/* Ahrefs DR */}
                    <td className="py-4.5 px-4">
                      <span className="font-black text-emerald-700 text-sm">
                        {site.dr}
                      </span>
                    </td>

                    {/* Moz DA */}
                    <td className="py-4.5 px-4">
                      <span className="font-bold text-slate-700 text-sm">
                        {site.da}
                      </span>
                    </td>

                    {/* Organic Traffic (Fixes Issue 8: subtitle upgraded from 9px to text-xs) */}
                    <td className="py-4.5 px-4">
                      <div className="font-bold text-slate-900 text-xs">
                        {site.ahrefsTraffic}
                      </div>
                      <span className="text-xs text-slate-500 font-medium">Ahrefs verified</span>
                    </td>

                    {/* Country Geo */}
                    <td className="py-4.5 px-4">
                      <span className="inline-flex items-center gap-1.5 font-semibold text-xs text-slate-800">
                        <span>{site.countryFlag}</span>
                        <span>{site.country}</span>
                      </span>
                    </td>

                    {/* Link Type */}
                    <td className="py-4.5 px-4">
                      <span className="text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-bold text-xs">
                        ✓ {site.linkType}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-4.5 px-4">
                      <span className="font-black text-amber-600 text-base">
                        ${site.price}
                      </span>
                    </td>

                    {/* Action Button */}
                    <td className="py-4.5 px-5 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedSiteForOrder(site)}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-yellow-500 text-white font-bold text-xs shadow-xs cursor-pointer transition-all hover:scale-105 active:scale-95"
                      >
                        Order Link →
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-500">
                    <div className="text-3xl mb-2">🔍</div>
                    <p className="font-bold text-slate-900 text-base">No websites matched your exact filter criteria</p>
                    <p className="text-xs text-slate-500 mt-1">Try resetting filters or searching with different terms</p>
                    <button
                      type="button"
                      onClick={handleResetFilters}
                      className="mt-4 px-5 py-2 bg-slate-100 hover:bg-slate-200 text-amber-700 text-xs font-bold rounded-xl cursor-pointer border border-slate-200"
                    >
                      Reset All Filters
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* LOCKED CALLOUT BANNER (Shown when visitor is not logged in) */}
        {!isBuyerLoggedIn && (
          <div className="relative py-12 px-6 text-center bg-gradient-to-b from-[#fdfbf7] via-[#fffdfa] to-white border-t border-amber-200/80">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600 flex items-center justify-center text-2xl mx-auto mb-4 shadow-sm">
              🔒
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight mb-2">
              Unlock All 1,500+ Authority Publications &amp; Excel Download
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto mb-7 leading-relaxed">
              Create a free Buyer account with your Email and WhatsApp number to unlock complete publication names, direct editorial rates, and instant Excel database export.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                type="button"
                onClick={() => {
                  setAuthMode("signup");
                  setIsAuthModalOpen(true);
                }}
                className="w-full sm:w-auto bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-extrabold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider shadow-lg shadow-amber-900/15 cursor-pointer inline-flex items-center justify-center gap-2 transition-all hover:scale-102"
              >
                <span>✨</span>
                <span>Register Free to Unlock All &amp; Download</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setAuthMode("login");
                  setIsAuthModalOpen(true);
                }}
                className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-800 font-bold px-6 py-3.5 rounded-full text-xs border border-slate-200 hover:border-amber-400 cursor-pointer transition-all shadow-xs"
              >
                Already registered? Log In
              </button>
            </div>
          </div>
        )}

        {/* Footer Bar of Table: Bulk Inquiries & Pagination note */}
        <div className="p-4 sm:p-5 bg-[#fdfbf7] border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              Showing <strong className="text-slate-950 font-mono">{isBuyerLoggedIn ? filteredSites.length : Math.min(filteredSites.length, 6)}</strong> of{" "}
              <strong className="text-amber-700 font-mono">{filteredSites.length}</strong> verified publications
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span>Need a custom publisher not in this list?</span>
            <Link
              href="/contact-us"
              className="text-amber-600 hover:text-amber-700 font-bold underline underline-offset-4 transition-colors"
            >
              Request Custom Manual Outreach ↗
            </Link>
          </div>
        </div>
      </div>

      {/* BULK SEARCH MODAL (Limit 60 domains) */}
      {isBulkSearchOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white border border-amber-200/80 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>📋</span> Bulk Domain Inventory Search
              </h3>
              <button
                type="button"
                onClick={() => setIsBulkSearchOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-slate-600 leading-relaxed">
                Paste up to <strong className="text-amber-700 font-bold">{BULK_SEARCH_LIMIT} domains or keywords</strong> (one per line or comma-separated) to check availability in Balaji Prime Media&apos;s database.
              </p>
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-slate-500">Limit: Max {BULK_SEARCH_LIMIT} domains</span>
                <span
                  className={`font-mono font-bold ${
                    isOverBulkLimit
                      ? "text-rose-600"
                      : parsedBulkLines.length > 0
                      ? "text-amber-600"
                      : "text-slate-400"
                  }`}
                >
                  {parsedBulkLines.length} / {BULK_SEARCH_LIMIT} items {isOverBulkLimit ? "(Limit exceeded)" : ""}
                </span>
              </div>
            </div>

            <textarea
              rows={6}
              value={bulkInput}
              onChange={(e) => setBulkInput(e.target.value)}
              placeholder={`techbeacon-daily.com\nventurepulse-media.io\nhighroller-casino-insider.com\nAI & Machine Learning\nDoFollow`}
              className={`w-full bg-slate-50 border ${
                isOverBulkLimit
                  ? "border-rose-400 focus:border-rose-500"
                  : "border-slate-200 focus:border-amber-500"
              } rounded-2xl p-3.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white font-mono transition-colors leading-relaxed`}
            />

            {isOverBulkLimit && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                <span>⚠️</span>
                <span>
                  Maximum limit is {BULK_SEARCH_LIMIT} domains. Only the first {BULK_SEARCH_LIMIT} domains will be searched.
                </span>
              </div>
            )}

            <div className="flex items-center justify-between pt-1">
              {bulkInput && (
                <button
                  type="button"
                  onClick={() => setBulkInput("")}
                  className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer"
                >
                  Clear Text
                </button>
              )}
              <div className="flex justify-end gap-2 ml-auto">
                <button
                  type="button"
                  onClick={() => setIsBulkSearchOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleApplyBulkSearch}
                  disabled={parsedBulkLines.length === 0}
                  className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    parsedBulkLines.length === 0
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-yellow-500 text-white shadow-md shadow-amber-900/15"
                  }`}
                >
                  Check Availability ({Math.min(parsedBulkLines.length, BULK_SEARCH_LIMIT)})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ORDER / PLACEMENT INQUIRY MODAL */}
      {selectedSiteForOrder && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white border border-amber-200/80 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-amber-700 font-bold uppercase tracking-wider">Placement Booking</span>
                <h3 className="text-lg font-black text-slate-950">{selectedSiteForOrder.domain}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSiteForOrder(null)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-600">Ahrefs DR:</span>
                <span className="font-bold text-emerald-700">{selectedSiteForOrder.dr}+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Monthly Traffic:</span>
                <span className="font-bold text-slate-950">{selectedSiteForOrder.ahrefsTraffic}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Link Attribute:</span>
                <span className="font-bold text-emerald-700">✓ {selectedSiteForOrder.linkType}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2.5">
                <span className="text-slate-900 font-bold">Editorial Placement Fee:</span>
                <span className="font-black text-amber-600 text-lg">${selectedSiteForOrder.price}</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Includes native 1,000+ word editorial content drafting, journalist outreach review, and full Google Search Essentials policy compliance.
            </p>

            <div className="space-y-2.5 pt-1">
              <a
                href={`https://wa.me/917690868932?text=${encodeURIComponent(
                  `Hi Balaji Prime Media! I want to order a guest post on ${selectedSiteForOrder.domain} (DR ${selectedSiteForOrder.dr}, Price: $${selectedSiteForOrder.price}). Please send payment details.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block text-center py-3 rounded-full bg-[#25d366] hover:bg-[#22bf5b] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                Instant Order via WhatsApp 💬
              </a>

              <Link
                href={`/pay?plan=starter&domain=${encodeURIComponent(selectedSiteForOrder.domain)}&amount=${selectedSiteForOrder.price}`}
                className="w-full block text-center py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-yellow-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                Pay &amp; Authorize Placement (${selectedSiteForOrder.price}) →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* BUYER AUTHENTICATION MODAL (Email + Mobile + Password Creation) */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white border border-amber-200/80 rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Modal Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 text-white flex items-center justify-center text-lg font-black shadow-xs">
                  📥
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-950 tracking-tight">
                    {authMode === "signup" ? "Create Free Buyer Account" : "Buyer Login"}
                  </h3>
                  <span className="text-xs text-amber-600 font-bold uppercase tracking-wider block">
                    Unlock 1,500+ Database
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAuthModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Toggle Tabs: Register vs Login */}
            <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl border border-slate-200 mb-4 text-xs font-bold">
              <button
                type="button"
                onClick={() => {
                  setAuthMode("signup");
                  setAuthError(null);
                }}
                className={`py-2 rounded-lg transition-all cursor-pointer ${
                  authMode === "signup"
                    ? "bg-white text-slate-950 shadow-xs font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Create Account (New)
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode("login");
                  setAuthError(null);
                }}
                className={`py-2 rounded-lg transition-all cursor-pointer ${
                  authMode === "login"
                    ? "bg-white text-slate-950 shadow-xs font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Sign In (Existing)
              </button>
            </div>

            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              {authMode === "signup"
                ? "Register your email and mobile number to immediately unlock all 1,500+ publisher sites and download the complete Excel database."
                : "Sign in with your email and password to access the full publisher directory and your buyer workspace."}
            </p>

            {authError && (
              <div className="p-3 mb-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                ⚠️ {authError}
              </div>
            )}

            {/* Auth Form */}
            <form onSubmit={handleAuthSubmit} className="space-y-3.5 text-xs text-left">
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-amber-500"
                />
              </div>

              {authMode === "signup" && (
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Mobile / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 555-0192 or +91 9876543210"
                    value={authPhone}
                    onChange={(e) => setAuthPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-amber-500"
                  />
                  <span className="text-xs text-slate-500 mt-1 block">
                    Used to send you order updates and wholesale pricing alerts.
                  </span>
                </div>
              )}

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  {authMode === "signup" ? "Create Password *" : "Password *"}
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmittingAuth}
                className="w-full py-3 bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-full transition-all shadow-md shadow-amber-900/15 cursor-pointer pt-2 mt-2 flex items-center justify-center gap-1.5"
              >
                <span>{isSubmittingAuth ? "Unlocking Database..." : "Unlock & Download Excel Database →"}</span>
              </button>
            </form>

            <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 text-center">
              <span>🔒 100% Privacy Guaranteed. Zero spam. Direct editorial media rates.</span>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
