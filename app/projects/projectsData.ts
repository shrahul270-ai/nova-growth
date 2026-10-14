export interface CaseStudyMetric {
  label: string;
  value: string;
  detail: string;
}

export interface CaseStudyData {
  id: string;
  title: string;
  shortTitle: string;
  category: string;
  categoryGroup: "ecommerce" | "mobile" | "seo" | "saas";
  badge: string;
  client: string;
  country: string;
  timeline: string;
  stat: string;
  statLabel: string;
  heroMetric: string;
  visual: string;
  bgGradient: string;
  overview: string;
  challenge: {
    heading: string;
    points: string[];
  };
  solution: {
    heading: string;
    description: string;
    keyPoints: string[];
  };
  metrics: CaseStudyMetric[];
  deliverables: string[];
  tech: string[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
    company: string;
  };
}

export const caseStudiesData: CaseStudyData[] = [
  {
    id: "fashion-brand",
    title: "Luxe Fashion US - Headless E-Commerce & Organic SEO Scaling",
    shortTitle: "Fashion Brand Website",
    category: "E-Commerce & International SEO",
    categoryGroup: "ecommerce",
    badge: "Web Development + SEO",
    client: "Luxe Fashion Apparel (Los Angeles, USA 🇺🇸)",
    country: "United States 🇺🇸",
    timeline: "10 Weeks Build & Optimization",
    stat: "+340%",
    statLabel: "Organic Revenue Increase",
    heroMetric: "$1.4M Incremental ARR in 6 Months",
    visual: "👗",
    bgGradient: "from-rose-50 to-amber-50",
    overview:
      "Luxe Fashion is a fast-growing premium apparel brand based in California. Operating on a bloated monolithic CMS, they struggled with high customer acquisition costs on paid social and sub-optimal mobile conversion rates. Nova Growth re-engineered their entire digital presence with a headless Next.js frontend and an aggressive collection page SEO taxonomy.",
    challenge: {
      heading: "The Challenge: Bloated Architecture & Skyrocketing Ad Costs",
      points: [
        "Monolithic legacy theme was taking over 4.5 seconds to load on mobile devices across 4G/5G networks, resulting in an estimated 48% checkout abandonment.",
        "Over-reliance on paid Meta and TikTok ads caused CAC to increase by 55%, eroding net margins as ad prices climbed.",
        "Faceted navigation and filter URLs created over 12,000 duplicate thin pages that cannibalized organic Google rankings.",
        "Zero structured Schema data or breadcrumb hierarchy for Google Rich Product Cards."
      ]
    },
    solution: {
      heading: "The Strategy: Headless Speed & Topical Collection Clustering",
      description:
        "We migrated Luxe Fashion to a modern composable commerce stack: a sub-second Next.js App Router frontend connected to Shopify Storefront GraphQL, backed by semantic collection clustering.",
      keyPoints: [
        "Built custom Next.js edge-cached storefront achieving 99/100 Core Web Vitals score.",
        "Engineered server-side faceted filters that maintain static canonical search URLs without spawning duplicate pages.",
        "Injected automated Product, Offer, and AggregateRating JSON-LD schema across 1,800 SKUs.",
        "Deployed automated abandoned checkout flows via Klaviyo to re-engage overseas buyers."
      ]
    },
    metrics: [
      { label: "Mobile Page Load Time", value: "0.8s", detail: "Down from 4.6 seconds previously" },
      { label: "Google PageSpeed Score", value: "99/100", detail: "Passed all Core Web Vitals in Search Console" },
      { label: "Organic Revenue Increase", value: "+340%", detail: "Over $1.4M organic pipeline generated" },
      { label: "Mobile Checkout Lift", value: "+48%", detail: "Direct increase in buyer conversion rate" }
    ],
    deliverables: [
      "Custom Headless Next.js App Router storefront architecture",
      "Shopify Storefront GraphQL high-speed API integration",
      "Automated Product & Offer JSON-LD schema markup",
      "Collection topical clustering & high-intent buyer keyword mapping",
      "Klaviyo automated behavioral email sequences",
      "Multi-currency international geo-targeting routing"
    ],
    tech: ["Next.js App Router", "Shopify Storefront API", "Tailwind CSS", "TypeScript", "Klaviyo", "Vercel Edge"],
    testimonial: {
      quote:
        "Nova Growth transformed our entire business model. We went from burning tens of thousands every month on Facebook ads to generating 6-figure organic revenue predictably from Google search. Their team understands the US e-commerce market inside out.",
      author: "Brianna Montgomery",
      role: "VP of E-Commerce & Growth",
      company: "Luxe Fashion Apparel, Los Angeles"
    }
  },
  {
    id: "fitness-app",
    title: "PulseFit Pro - Global Cross-Platform App & SaaS Conversion Engine",
    shortTitle: "Fitness App",
    category: "Mobile App & SaaS CRO",
    categoryGroup: "mobile",
    badge: "UI/UX Design + Development",
    client: "Pulse Technologies (Austin, USA 🇺🇸)",
    country: "United States & UK 🇺🇸 🇬🇧",
    timeline: "8 Weeks UX & Cross-Platform Launch",
    stat: "50,000+",
    statLabel: "Active Paid Downloads",
    heroMetric: "Top 10 App Store Fitness Ranking",
    visual: "⚡",
    bgGradient: "from-slate-900 to-[#091427]",
    overview:
      "Pulse Technologies engineered an intelligent AI-driven workout tracker but needed a world-class user interface, high-converting onboarding funnel, and global App Store Optimization (ASO) to compete with category leaders like Nike Training and Strava.",
    challenge: {
      heading: "The Challenge: Low Retention & High Funnel Drop-off",
      points: [
        "First-time onboarding drop-off exceeded 62% due to a lengthy, friction-heavy signup process.",
        "Lack of cohesive design language and micro-interactions made the app feel dated compared to Silicon Valley competitors.",
        "Zero international organic visibility on iOS App Store and Google Play for commercial queries.",
        "Inability to accept localized currencies and Apple Pay in key overseas target markets."
      ]
    },
    solution: {
      heading: "The Solution: Gamified Micro-Interactions & Streamlined CRO",
      description:
        "Nova Growth completely redesigned the user onboarding experience into a 3-step interactive questionnaire, paired with smooth 60fps animations and localized App Store Optimization.",
      keyPoints: [
        "Crafted custom dark-mode aesthetic with amber glow micro-interactions using React Native and Reanimated.",
        "Reduced signup friction to under 90 seconds with one-tap Apple / Google Authentication.",
        "Implemented ASO keyword clusters targeting fitness seekers across the US, UK, Canada, and Australia.",
        "Integrated multi-tier Stripe subscription billing with localized currency conversion."
      ]
    },
    metrics: [
      { label: "Total Paid Downloads", value: "50,000+", detail: "Surpassed launch goal by 210%" },
      { label: "Day 30 Retention Rate", value: "68%", detail: "Industry benchmark is 24%" },
      { label: "App Store User Rating", value: "4.9 ★", detail: "Across 4,200+ verified customer reviews" },
      { label: "Daily Active Users", value: "18,500+", detail: "Compounding month-over-month engagement" }
    ],
    deliverables: [
      "End-to-end UI/UX wireframes, prototypes & design system in Figma",
      "Cross-platform iOS and Android production release",
      "App Store & Google Play organic ASO keyword optimization",
      "Stripe multi-currency subscription and recurring billing integration",
      "Interactive onboarding funnel with dynamic personalization",
      "Real-time event tracking and mixpanel user journey attribution"
    ],
    tech: ["React Native", "TypeScript", "Tailwind CSS", "Node.js", "Firebase", "Stripe Billing"],
    testimonial: {
      quote:
        "The level of craft Nova Growth brought to PulseFit Pro is exceptional. Their team doesn't just write code; they understand product psychology and conversion funnels. The app shot up into the App Store top charts within weeks.",
      author: "Marcus Sterling",
      role: "Co-Founder & Chief Product Officer",
      company: "Pulse Technologies, Austin"
    }
  },
  {
    id: "local-growth",
    title: "Apex Dental UK - Multi-Location Local SEO & Map Pack Dominance",
    shortTitle: "Local Business Growth",
    category: "Local SEO & Inbound Leads",
    categoryGroup: "seo",
    badge: "SEO + Content Marketing",
    client: "Apex Health & Dental Group (London, UK 🇬🇧)",
    country: "United Kingdom 🇬🇧",
    timeline: "Ongoing Growth Retainer (Month 5)",
    stat: "#1 Rank",
    statLabel: "Across 18 London Boroughs",
    heroMetric: "280% Surge in Private Consultations",
    visual: "📍",
    bgGradient: "from-amber-50 to-slate-50",
    overview:
      "Apex Health & Dental operates clinics across Central and Greater London. Despite having high-tier surgical facilities, potential patients were choosing competing clinics simply because Apex did not appear in Google's local 3-Pack or on neighborhood map searches.",
    challenge: {
      heading: "The Challenge: Inconsistent Local Citations & Zero Map Visibility",
      points: [
        "Inconsistent NAP (Name, Address, Phone) citations across 40+ UK directories caused Google algorithm distrust.",
        "Competitors dominated high-ticket queries like 'invisalign london' and 'emergency dentist marylebone'.",
        "Patients had to call manually during office hours with no live automated appointment booking.",
        "Only 14 outdated Google reviews, while rival clinics boasted hundreds of active 5-star testimonials."
      ]
    },
    solution: {
      heading: "The Strategy: Hyper-Local Geo-Routing & Automated Review Engine",
      description:
        "We executed a systematic Local SEO blueprint: full citation normalization, dedicated neighborhood landing pages, and an automated SMS review generation flow for verified patients.",
      keyPoints: [
        "Audited and synchronized 65+ tier-1 UK medical directories and Google Business Profiles.",
        "Engineered programmatic neighborhood landing pages with local Schema markup and clinic directions.",
        "Launched SMS review funnel that gathered 180+ verified 5-star Google reviews in 60 days.",
        "Positioned practice in the Google Maps 3-Pack for 18 competitive postal districts."
      ]
    },
    metrics: [
      { label: "Google Map Pack Position", value: "Top 3", detail: "Ranked in 18 high-income London boroughs" },
      { label: "Inbound Consultation Calls", value: "+280%", detail: "Over 450 verified patient inquiries monthly" },
      { label: "Monthly Organic Visitors", value: "45,000+", detail: "Targeted UK searchers seeking dental care" },
      { label: "Patient Booking ROI", value: "7.4x", detail: "Revenue generated versus retainer spend" }
    ],
    deliverables: [
      "Google Business Profile multi-location audit and citation cleanup",
      "Hyper-local neighborhood page routing across Central & Greater London",
      "MedicalBusiness and LocalBusiness schema structured data injection",
      "Automated SMS review generation funnel for verified patients",
      "High-authority British medical directory link outreach",
      "Call rail conversion tracking & real-time revenue dashboard"
    ],
    tech: ["Local SEO Schema", "Google Business Profile API", "Ahrefs", "Semrush", "Next.js", "CallRail"],
    testimonial: {
      quote:
        "Our phone rings continuously every day with private patient inquiries. Nova Growth took us from page 3 to the number 1 spot on Google Maps across London. Their transparency and results are unmatched.",
      author: "Dr. Alistair Finch",
      role: "Clinical Director",
      company: "Apex Dental Group, London"
    }
  },
  {
    id: "saas-pipeline",
    title: "CloudSync Technologies - Technical SEO & Programmatic Pipeline Engine",
    shortTitle: "B2B SaaS Growth",
    category: "Technical SEO & CRO",
    categoryGroup: "saas",
    badge: "Technical SEO + CRO",
    client: "CloudSync Technologies (San Francisco, USA 🇺🇸)",
    country: "United States 🇺🇸",
    timeline: "12 Weeks Re-Architecture",
    stat: "+420%",
    statLabel: "Qualified Demo Bookings",
    heroMetric: "$180,000+ Monthly Organic Pipeline",
    visual: "☁️",
    bgGradient: "from-blue-50/50 to-amber-50/50",
    overview:
      "CloudSync is a venture-backed B2B SaaS startup providing automated data pipeline integrations. While their software was revolutionary, their website was suffering from JavaScript rendering issues and low domain authority, yielding almost zero organic search demos.",
    challenge: {
      heading: "The Challenge: Client-Side Rendering Traps & High Ad Burn",
      points: [
        "Heavy client-side React SPA prevented search engine crawlers from indexing dynamic integration pages.",
        "Organic inbound pipeline was less than 5% of total revenue, forcing over-reliance on expensive LinkedIn outbound.",
        "Zero presence for high-intent long-tail keywords like '[Software A] to [Software B] sync'.",
        "Slow Largest Contentful Paint (LCP) of 3.8s caused high bounce rates on product pages."
      ]
    },
    solution: {
      heading: "The Solution: Server-Rendered Programmatic Directory & High-DR Backlinks",
      description:
        "We re-platformed their documentation and marketing website to Next.js App Router, programmatically generating 450+ integration landing pages with high-tier editorial backlink outreach.",
      keyPoints: [
        "Generated 450+ static programmatic landing pages comparing specific software connectors.",
        "Secured editorial backlinks on DA 60+ technology blogs and industry publications.",
        "Added interactive pricing and ROI calculator widgets that increased demo form submissions by 64%.",
        "Passed Google Core Web Vitals with 100% green ratings across desktop and mobile."
      ]
    },
    metrics: [
      { label: "Organic Monthly ARR", value: "$180K+", detail: "Predictable pipeline from non-brand search" },
      { label: "Demo Bookings Lift", value: "+420%", detail: "Enterprise decision-makers requesting software trials" },
      { label: "Domain Authority Growth", value: "DA 32 → 64", detail: "Over 80 high-tier editorial backlinks secured" },
      { label: "Indexed Landing Pages", value: "450+", detail: "Ranking for over 2,400 commercial long-tail terms" }
    ],
    deliverables: [
      "Programmatic SEO directory indexing 450+ tool integrations",
      "Next.js App Router server-side architecture for sub-second TTFB",
      "High-authority editorial guest posting on DR 60+ tech publications",
      "Interactive B2B ROI calculator with HubSpot CRM sync",
      "Technical Core Web Vitals remediation bringing LCP down to 1.1s",
      "Full-funnel Looker Studio attribution tracking"
    ],
    tech: ["Next.js App Router", "TypeScript", "Sanity Headless CMS", "HubSpot API", "Vercel", "Ahrefs"],
    testimonial: {
      quote:
        "Nova Growth built our organic customer acquisition flywheel from scratch. Our sales team now opens their calendar to qualified enterprise demos every morning, all coming organically from Google.",
      author: "David Chen",
      role: "VP of Growth & Marketing",
      company: "CloudSync Technologies, San Francisco"
    }
  },
  {
    id: "dubai-real-estate",
    title: "Horizon Luxury Properties - Multilingual Portal for Overseas Investors",
    shortTitle: "Real Estate Portal",
    category: "Real Estate Portal & Paid Search",
    categoryGroup: "ecommerce",
    badge: "Web Design + Paid Strategy",
    client: "Horizon Real Estate (Dubai, UAE 🇦🇪)",
    country: "United Arab Emirates 🇦🇪",
    timeline: "7 Weeks Design & Launch",
    stat: "$18.5M",
    statLabel: "Verified Sales Inquiries",
    heroMetric: "4.2% Lead-to-Inquiry Conversion Rate",
    visual: "🏢",
    bgGradient: "from-amber-50/80 to-slate-50",
    overview:
      "Horizon Luxury Properties is a premier Dubai real estate firm catering to foreign property investors from the UK, Europe, and India. They required an ultra-fast, prestige multilingual portal to showcase off-plan luxury penthouses and beachfront villas.",
    challenge: {
      heading: "The Challenge: High Bounce Rate on Foreign Traffic",
      points: [
        "Heavy uncompressed 3D tour assets caused bounce rates to exceed 58% on mobile devices from overseas visitors.",
        "No dedicated multilingual Arabic and English dual-slug architecture for international SEO indexing.",
        "Inquiries were getting lost in generic email inboxes with delayed response times.",
        "Ad spend in competitive European markets was yielding unqualified casual browsers rather than accredited investors."
      ]
    },
    solution: {
      heading: "The Solution: Composable 3D Virtual Tours & Direct WhatsApp Lead Routing",
      description:
        "We built a luxury-tier web portal with lazy-loaded 3D virtual floor plans, instant currency conversion, and direct qualified WhatsApp routing.",
      keyPoints: [
        "Lazy-loaded high-resolution image and 3D architectural assets, slashing initial load time to 1.2s.",
        "Implemented instant WhatsApp API integration with automatic language detection and CRM tagging.",
        "Deployed high-intent search campaigns targeting British and European expatriates looking for tax-free investments.",
        "Configured dual-language hreflang tags for Arabic and English Google search indexation."
      ]
    },
    metrics: [
      { label: "Verified Sales Inquiries", value: "$18.5M", detail: "Total pipeline value of verified off-plan buyer leads" },
      { label: "Lead Conversion Rate", value: "4.2%", detail: "More than double the industry average of 1.8%" },
      { label: "Average Session Duration", value: "4m 12s", detail: "Deep buyer engagement across property listings" },
      { label: "Mobile Bounce Rate", value: "24%", detail: "Down from 58% on the previous website" }
    ],
    deliverables: [
      "Multilingual Arabic & English high-speed property catalog",
      "Interactive 3D virtual tour embed with lazy loading & edge caching",
      "Direct WhatsApp lead qualification integration with CRM sync",
      "Ultra-targeted Google search ads targeting UK and European investors",
      "Dynamic currency switcher (AED, USD, GBP, EUR)",
      "High-net-worth investor lead capture landing pages"
    ],
    tech: ["React", "Next.js", "Tailwind CSS", "Mapbox GL", "WhatsApp Business API", "Google Ads"],
    testimonial: {
      quote:
        "International property buyers demand absolute elegance and instant speed. Nova Growth delivered a website that represents the prestige of Dubai luxury real estate and consistently brings us multi-million-dollar foreign transactions.",
      author: "Tariq Mansoor",
      role: "Managing Director",
      company: "Horizon Real Estate, Dubai"
    }
  },
  {
    id: "fintech-app",
    title: "VenturePay Global - Bank-Grade Cross-Border Financial Platform",
    shortTitle: "Fintech Platform",
    category: "Fintech Platform & Product Design",
    categoryGroup: "saas",
    badge: "Product Design & Web App",
    client: "VenturePay Financial (Toronto, Canada 🇨🇦)",
    country: "Canada & Global 🇨🇦 🌐",
    timeline: "14 Weeks Full Engineering",
    stat: "100K+",
    statLabel: "Monthly Active Users",
    heroMetric: "54% Organic Non-Brand Search Share",
    visual: "💳",
    bgGradient: "from-slate-900 to-[#091427]",
    overview:
      "VenturePay is a global cross-border remittance and multi-currency business account platform. Competing with established fintech unicorns like Wise and Revolut, VenturePay needed bank-grade trust, sub-2-minute onboarding, and high-ranking organic authority for money transfer keywords.",
    challenge: {
      heading: "The Challenge: Regulatory Compliance & Consumer Trust",
      points: [
        "Complex KYC (Know Your Customer) compliance caused a 40% drop-off in user verification.",
        "Fintech requires institutional trust; any UI glitch or sluggish loading immediately scared off corporate treasurers.",
        "Extreme competition on paid Google Ads ($45+ CPC for remittance keywords) made paid-only acquisition unsustainable.",
        "Strict PCI-DSS and SOC2 compliance required airtight frontend security and zero third-party leakages."
      ]
    },
    solution: {
      heading: "The Solution: Bank-Grade Security & High-Intent Currency Calculators",
      description:
        "Nova Growth designed and engineered a streamlined 2-minute KYC verification flow, coupled with live programmatic exchange rate widgets that dominate high-volume search queries.",
      keyPoints: [
        "Built interactive real-time currency conversion widgets that update with live interbank exchange rates.",
        "Engineered accessible, bank-grade encrypted signup flows that reduced KYC drop-off by 55%.",
        "Ranked for thousands of high-volume international money transfer queries organically.",
        "Achieved 100% passed Core Web Vitals with zero client-side hydration delays."
      ]
    },
    metrics: [
      { label: "Monthly Active Users", value: "100,000+", detail: "Rapidly scaling global customer base" },
      { label: "Organic Search Share", value: "54%", detail: "Over half of all new accounts join through organic search" },
      { label: "KYC Onboarding Time", value: "< 2 Mins", detail: "Frictionless identity verification flow" },
      { label: "Security Compliance", value: "SOC2 & PCI", detail: "Bank-grade encrypted frontend architecture" }
    ],
    deliverables: [
      "Bank-grade SSL encrypted user onboarding and KYC flow",
      "Live exchange rate calculation widget with interbank feed",
      "High-intent keyword positioning for 'cross-border remit' queries",
      "Full design system in Figma with WCAG AAA accessibility compliance",
      "SOC2 & PCI-DSS frontend security validation",
      "Multi-region edge hosting with instant sub-100ms global latency"
    ],
    tech: ["Next.js App Router", "TypeScript", "Tailwind CSS", "PostgreSQL", "Stripe Connect", "Cloudflare Workers"],
    testimonial: {
      quote:
        "In the fintech industry, trust is everything. Nova Growth engineered a platform that looks and feels as secure and fast as the world's biggest digital banks. Their SEO strategy cut our customer acquisition cost in half.",
      author: "Elena Rostova",
      role: "Head of Product & Growth",
      company: "VenturePay Financial, Toronto"
    }
  }
];

export function getCaseStudyById(id: string): CaseStudyData | undefined {
  return caseStudiesData.find((study) => study.id === id);
}
