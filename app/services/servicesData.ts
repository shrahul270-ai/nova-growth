export interface ServiceDetail {
  id: string;
  name: string;
  shortTitle: string;
  headline: string;
  tagline: string;
  category: string;
  heroImage: string;
  priceINR: string;
  priceUSD: string;
  billingPeriod: string;
  tat: string;
  stats: { value: string; label: string; detail: string }[];
  overview: string;
  problemSolved: string;
  deliverables: string[];
  features: { title: string; desc: string; icon: string }[];
  process: { step: string; title: string; desc: string }[];
  faq: { q: string; a: string }[];
  technologies: string[];
}

export const servicesData: ServiceDetail[] = [
  {
    id: "flutter-app-dev",
    name: "Flutter Mobile & Web App Development",
    shortTitle: "Flutter App Development",
    headline: "Build Once, Run Everywhere — Turn Your Idea into a Powerful 60fps Mobile App",
    tagline: "Single-codebase cross-platform mobile engineering engineered with Google's Flutter SDK for iOS, Android, and Web.",
    category: "Mobile & Cross-Platform Development",
    heroImage: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80",
    priceINR: "₹8,000 – ₹25,000+",
    priceUSD: "$120 – $350+",
    billingPeriod: "milestone sprint",
    tat: "2–4 Weeks",
    stats: [
      { value: "60–120fps", label: "Frame Rate", detail: "Hardware-accelerated native GPU rendering with zero frame drops" },
      { value: "50%", label: "Cost Savings", detail: "1 single codebase powers both Apple iOS and Google Android" },
      { value: "2x", label: "Time-to-Market", detail: "Fast development & instant hot reload for rapid user testing" },
      { value: "100%", label: "Store Approval", detail: "Full compliance with Apple App Store and Google Play guidelines" },
    ],
    overview:
      "Flutter is Google's flagship open-source framework for building natively compiled, multi-platform applications from a single codebase. Instead of maintaining two separate codebases in Kotlin and Swift, our Flutter practice builds unified, fluid applications that deploy across iOS, Android, Web, and desktop. With a high-performance C++ rendering engine, reactive framework architecture, and built-in Material 3 and Cupertino widgets, we deliver pixel-perfect digital experiences.",
    problemSolved:
      "Traditional native development requires hiring separate iOS and Android teams, doubling engineering costs, desynchronizing feature releases, and introducing platform-specific bugs. Hybrid webviews feel sluggish and unresponsive. Flutter solves this by rendering directly to native machine code via Skia/Impeller, giving you 100% native performance at half the maintenance cost.",
    deliverables: [
      "Cross-platform iOS and Android production codebase (Dart & Flutter)",
      "Pixel-perfect responsive UI matching Material 3 and Cupertino guidelines",
      "Firebase backend integration: Authentication, Firestore & Cloud Messaging",
      "Custom RESTful / GraphQL API client architecture and local caching",
      "Biometric security, push notifications & background synchronization",
      "Automated CI/CD test builds via TestFlight and Google Play Internal Testing",
      "Complete deployment support to Apple App Store and Google Play Store",
    ],
    features: [
      {
        title: "Single Codebase Architecture",
        desc: "Write once, run seamlessly on both iPhone and Android smartphones with unified business logic.",
        icon: "📱",
      },
      {
        title: "Native C++ Canvas Rendering",
        desc: "Compiled directly to ARM64 native machine code with zero bridge latency and smooth 120Hz support.",
        icon: "⚡",
      },
      {
        title: "Cloud & Firebase Ecosystem",
        desc: "Push notifications, real-time sync, crash reporting, and serverless cloud functions integration.",
        icon: "☁️",
      },
      {
        title: "Store Approval Guarantee",
        desc: "Strict compliance with App Store Review Guidelines and Google Play Developer Program Policies.",
        icon: "🛡️",
      },
    ],
    process: [
      { step: "01", title: "Product Blueprint & Wireframing", desc: "User journey mapping, interactive Figma prototype, and technical architecture specifications." },
      { step: "02", title: "Flutter Core Engineering", desc: "Building modular UI widgets, BLoC/Provider state management, and offline-first database sync." },
      { step: "03", title: "API & Gateway Integration", desc: "Connecting payment gateways, push notification servers, analytics, and authentication." },
      { step: "04", title: "QA & App Store Release", desc: "Cross-device testing on 20+ real iOS & Android phones, TestFlight beta, and public store launch." },
    ],
    faq: [
      {
        q: "Why choose Flutter over React Native or Native Java/Swift?",
        a: "Flutter delivers superior UI consistency because it owns every pixel on the canvas using its high-speed Skia/Impeller engine rather than bridging to native OEM widgets. It also compiles to native ARM machine code, resulting in faster startup times and smoother 60fps animations.",
      },
      {
        q: "Will the app feel native to iPhone users?",
        a: "Yes! Flutter provides the Cupertino widget library, which perfectly mimics iOS navigation, momentum scrolling, haptic feedback, and modal popups. Most users cannot distinguish a well-crafted Flutter app from pure Swift.",
      },
      {
        q: "Do you assist with publishing on Google Play and Apple App Store?",
        a: "Absolutely. We configure certificates, provisioning profiles, privacy manifests, store metadata, screenshots, and manage the entire submission and review process until your app is live.",
      },
    ],
    technologies: ["Flutter 3.x", "Dart", "Firebase", "BLoC Pattern", "REST APIs", "App Store Connect", "Google Play Console"],
  },
  {
    id: "full-stack-php-dev",
    name: "Full Stack PHP Web & Application Development",
    shortTitle: "Full-Stack PHP Development",
    headline: "Build Your Website / Web Application Globally with PHP & Laravel",
    tagline: "Custom Laravel and robust PHP architectures with scalable relational MySQL/Postgres databases, secure admin dashboards, and global API integrations.",
    category: "Full-Stack & Backend Engineering",
    heroImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    priceINR: "₹5,000 – ₹80,000+",
    priceUSD: "$80 – $1,200+",
    billingPeriod: "milestone sprint",
    tat: "2–4 Weeks",
    stats: [
      { value: "77%+", label: "Web Market Share", detail: "Powers WordPress, Wikipedia, Canva, and top global enterprise backends" },
      { value: "PHP 8.3", label: "Modern Standard", detail: "JIT compilation, strict typing & OPcache for sub-second server responses" },
      { value: "Zero Vulnerability", label: "Security Hardened", detail: "Built-in PDO parameterized queries, CSRF tokens & bcrypt password hashing" },
      { value: "100%", label: "Source Ownership", detail: "Full Git repository handover with clean MVC architecture and zero vendor lock-in" },
    ],
    overview:
      "Our Full-Stack PHP practice provides battle-tested, high-performance web applications built on Laravel and modern PHP 8.3. From scalable relational database architecture (MySQL, PostgreSQL) to intuitive custom admin control panels, student management portals, and multi-currency e-commerce backends, we engineer reliable digital systems. Every codebase is mathematically structured for speed, maximum security against SQL injection, and effortless integration with third-party payment gateways and REST APIs.",
    problemSolved:
      "Many businesses rely on fragile, sluggish plugins or chaotic spaghetti code that crashes under high traffic or gets hacked through SQL vulnerabilities. We build clean, modular Laravel MVC applications with normalized databases, automated backups, and bank-grade security protocols so your business runs smoothly 24/7.",
    deliverables: [
      "Custom PHP 8.3 / Laravel MVC scalable backend architecture",
      "Normalized MySQL or PostgreSQL database schema with indexing",
      "Secure custom role-based admin dashboard with analytics & user management",
      "High-speed modern responsive frontend interface (Tailwind / Blade / React)",
      "Comprehensive RESTful API construction, webhooks & third-party integrations",
      "Payment gateway integration (Stripe, Razorpay, PayPal, Bank Wire)",
      "Automated server deployment, SSL certificate hardening & database backup scripts",
    ],
    features: [
      {
        title: "Modern PHP 8+ & JIT Speed",
        desc: "Equipped with OPcache and JIT compiler for lightning-fast database queries and page execution.",
        icon: "⚡",
      },
      {
        title: "Robust Laravel MVC Framework",
        desc: "Structured Model-View-Controller architecture ensuring clean separation of concerns and maintainability.",
        icon: "🏛️",
      },
      {
        title: "Enterprise Relational Database",
        desc: "Optimized relational MySQL/Postgres tables with foreign keys, transactional integrity, and indexing.",
        icon: "🗄️",
      },
      {
        title: "Bank-Grade Cyber Security",
        desc: "Protected against OWASP Top 10 vulnerabilities: SQL injection, XSS, CSRF, and broken access control.",
        icon: "🛡️",
      },
    ],
    process: [
      { step: "01", title: "Database & Funnel Architecture", desc: "Entity-Relationship diagram (ERD), schema normalization, and role permission mapping." },
      { step: "02", title: "MVC Core Engineering", desc: "Writing models, controllers, Eloquent ORM relations, and secure API endpoints." },
      { step: "03", title: "UI Integration & Admin Panel", desc: "Connecting responsive blade/client views, data visualization charts, and export filters." },
      { step: "04", title: "Load Testing & Live Deployment", desc: "Stress testing database queries, SSL configuration, and production server setup." },
    ],
    faq: [
      {
        q: "Why is PHP still the best choice for web applications?",
        a: "PHP powers over 77% of all websites worldwide. Modern PHP 8.x with JIT compiler delivers remarkable speed, virtually universal hosting support, unmatched stability, and the world's largest developer ecosystem.",
      },
      {
        q: "Do you build custom admin dashboards?",
        a: "Yes! Every business application includes a tailor-made admin panel where you can manage users, view sales/revenue graphs, export CSV reports, and configure system settings with zero technical knowledge.",
      },
      {
        q: "Can this scale as our business grows?",
        a: "Absolutely. Laravel is used by enterprise corporations handling millions of requests daily. Our code is built with queue workers (Redis), caching layers, and database sharding capability.",
      },
    ],
    technologies: ["PHP 8.3", "Laravel 11", "MySQL", "PostgreSQL", "Tailwind CSS", "Redis", "REST APIs", "Docker"],
  },
  {
    id: "seo-optimization",
    name: "Search Engine Optimization (SEO)",
    shortTitle: "SEO Optimization",
    headline: "Dominate Google Rankings with Precision Technical & Semantic SEO",
    tagline: "Comprehensive technical audits, semantic keyword mapping, and full-funnel search dominance to capture high-intent buyers.",
    category: "Organic Growth & Search Engine Marketing",
    heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    priceINR: "₹29,999",
    priceUSD: "$449",
    billingPeriod: "per month",
    tat: "Ongoing Monthly Retainer",
    stats: [
      { value: "+240%", label: "Organic Visitors", detail: "Average surge in high-intent organic traffic within 90 days" },
      { value: "+180%", label: "Direct Inquiries", detail: "Qualified leads generated directly from commercial keywords" },
      { value: "DR 50+", label: "Target Domain Authority", detail: "Steady upward compounding of organic trust and search visibility" },
      { value: "100%", label: "White-Hat Protocol", detail: "Strict compliance with Google Helpful Content & Core Algorithm guidelines" },
    ],
    overview:
      "Our SEO practice is built on technical excellence, rigorous search intent research, and topical authority clustering. We don't just chase vanity volume—we focus exclusively on transactional and commercial keywords that drive qualified demo requests, consultation calls, and closed revenue. From JavaScript rendering diagnostics to internal anchor graphs, our engineers ensure every crawl by Google results in higher indexation and sustainable ranking gains.",
    problemSolved:
      "Most businesses suffer from indexing errors, duplicate content, bloated scripts, and targeting low-intent keywords that bring visitors who never convert. We eliminate technical friction, clean up toxic links, re-align content with what buyers actually type, and turn search into your #1 customer acquisition channel.",
    deliverables: [
      "Full technical crawl inspection & Core Web Vitals remediation",
      "High-intent commercial & transactional keyword clustering roadmap",
      "Competitor gap analysis identifying low-competition ranking opportunities",
      "Semantic on-page metadata, schema markup (JSON-LD) & internal link architecture",
      "Search Console indexing verification & crawl budget optimization",
      "Google Business Profile & local geographic citation alignment",
      "Bi-weekly keyword tracking & transparent monthly performance dashboard",
    ],
    features: [
      {
        title: "Topical Authority Silos",
        desc: "We construct interlinked topic clusters that signal unequivocal subject mastery to Google algorithms.",
        icon: "🎯",
      },
      {
        title: "Technical Core Web Vitals Tuning",
        desc: "Sub-second LCP, minimal CLS, and instant INP scores to satisfy Google's technical ranking signals.",
        icon: "⚡",
      },
      {
        title: "Commercial Intent Prioritization",
        desc: "Focusing 80% of our efforts on bottom-of-funnel keywords searched by buyers ready to sign agreements.",
        icon: "📈",
      },
      {
        title: "Zero-Penalty Algorithm Safety",
        desc: "Ethical strategies that survive and thrive across Google Core, Helpful Content, and Spam updates.",
        icon: "🛡️",
      },
    ],
    process: [
      { step: "01", title: "Comprehensive Audit", desc: "Full 150-point technical crawl, link profile review, and competitor search footprint breakdown." },
      { step: "02", title: "Keyword & Entity Architecture", desc: "Mapping commercial search terms into semantic silos with distinct target landing pages." },
      { step: "03", title: "On-Page & Speed Execution", desc: "Rewriting title tags, heading hierarchies, schema markup, and optimizing JavaScript execution." },
      { step: "04", title: "Compounding Growth & Reporting", desc: "Bi-weekly ranking monitoring, continuous CTR optimization, and weekly status synchronization." },
    ],
    faq: [
      {
        q: "How soon can we expect to see ranking improvements?",
        a: "Initial technical corrections and low-competition keyword movements typically reflect in Search Console within 3 to 6 weeks. Major organic traffic compounding and tier-1 keyword dominance occur within 60 to 90 days.",
      },
      {
        q: "Do you guarantee #1 rankings?",
        a: "No ethical agency can guarantee a specific spot because Google owns the algorithm. However, our proven data-driven framework has achieved top 3 positions for over 85% of targeted primary commercial queries across 200+ projects.",
      },
      {
        q: "What access do you need to get started?",
        a: "We require Google Search Console and Google Analytics access, along with CMS or codebase access to implement technical recommendations directly.",
      },
    ],
    technologies: ["Google Search Console", "Ahrefs Enterprise", "Semrush", "Screaming Frog", "SurferSEO", "PageSpeed Insights"],
  },
  {
    id: "website-development",
    name: "Website Development & Next.js Architecture",
    shortTitle: "Website Development",
    headline: "Ultra-Fast Modern Web Applications Built for Maximum Conversion",
    tagline: "Next.js, Tailwind CSS, and headless architectures engineered for sub-second speeds, intuitive UX, and enterprise reliability.",
    category: "Full-Stack & Frontend Engineering",
    heroImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    priceINR: "₹49,999",
    priceUSD: "$699",
    billingPeriod: "one-time project",
    tat: "3–4 Weeks",
    stats: [
      { value: "99/100", label: "PageSpeed Score", detail: "Near-perfect Google Lighthouse score on mobile & desktop" },
      { value: "<1.1s", label: "Core Web Vitals", detail: "Blazing sub-second interactive page load speed worldwide" },
      { value: "3.2x", label: "Avg Conversion Rate", detail: "Substantial increase in client lead form submissions & sales" },
      { value: "100%", label: "Responsive & Accessible", detail: "Flawless rendering on iPhone, iPad, Android, and 4K displays" },
    ],
    overview:
      "We build modern, high-performance web applications using the latest Next.js 16 App Router, React, Tailwind CSS, and headless CMS integrations. Gone are the days of slow, bloated WordPress templates that load in 6 seconds and leak customers. Our custom-engineered web experiences are feather-light, mathematically structured for conversion, and deploy instantly on global edge networks with automatic HTTPS, image optimization, and CDN caching.",
    problemSolved:
      "Legacy website builders like Wix, Squarespace, and unoptimized WordPress themes load dozens of unnecessary scripts that destroy your Google rankings and cause over 50% of mobile visitors to bounce before the page loads. We engineer clean, hand-coded Next.js codebases that load instantaneously and keep visitors engaged.",
    deliverables: [
      "Custom responsive Next.js frontend with modern micro-interactions",
      "Tailwind CSS aesthetic dark/light design customized to your brand identity",
      "Sub-second asset compression, modern WebP/AVIF images & font optimization",
      "Interactive lead capture forms, calendar integration & payment gateways",
      "Complete technical SEO foundations: canonicals, sitemaps & OpenGraph metadata",
      "Automated Vercel / AWS cloud deployment with instant global CDN caching",
      "Full source code ownership on GitHub with zero vendor lock-in",
    ],
    features: [
      {
        title: "Next.js App Router & SSR",
        desc: "Blazing fast server-side rendering for instant page transitions and maximum search engine discoverability.",
        icon: "⚡",
      },
      {
        title: "Conversion-Focused UI/UX",
        desc: "Designed using behavioral psychology, high-contrast CTAs, and friction-free user flows.",
        icon: "🎨",
      },
      {
        title: "Edge CDN & Zero Server Lag",
        desc: "Hosted on globally distributed edge networks ensuring overseas users in the US, UK, and EU experience instant speeds.",
        icon: "🌐",
      },
      {
        title: "Enterprise Security Hardening",
        desc: "Equipped with strict Content-Security-Policies, CSRF protection, and zero vulnerable third-party plugins.",
        icon: "🔒",
      },
    ],
    process: [
      { step: "01", title: "Architecture & Wireframing", desc: "Defining user journeys, conversion funnels, and component hierarchy before writing code." },
      { step: "02", title: "Modern Design & UI Polish", desc: "Crafting modern glassmorphic, typography-rich layouts matching your brand aesthetics." },
      { step: "03", title: "Next.js Code Engineering", desc: "Building modular React components, API integrations, and sub-second asset loaders." },
      { step: "04", title: "QA Testing & Global Launch", desc: "Cross-device responsiveness QA, 95+ PageSpeed audit, and continuous Vercel production deployment." },
    ],
    faq: [
      {
        q: "Why do you recommend Next.js over traditional WordPress?",
        a: "Next.js delivers unmatched loading speeds (<1s vs 4-6s on WP), impossible-to-hack static generation, zero plugin vulnerabilities, and superior SEO ranking advantages via Server Components.",
      },
      {
        q: "Will I be able to update content myself?",
        a: "Yes. We integrate headless CMS solutions (such as Sanity, Contentful, or direct markdown/database panels) so your marketing team can publish blogs and change text without touching code.",
      },
      {
        q: "Do you provide hosting setup?",
        a: "Yes! We configure your domain, DNS, SSL certificates, and CI/CD automated deployment pipelines on Vercel or AWS, completely hands-free.",
      },
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel Edge", "Node.js", "Lucide Icons"],
  },
  {
    id: "content-writing",
    name: "Professional Content Writing & Strategy",
    shortTitle: "Content Writing",
    headline: "High-Intent Editorial Content That Ranks on Google & Converts Buyers",
    tagline: "Human-crafted, semantic thought leadership and conversion copywriting tailored for overseas US, UK, and European audiences.",
    category: "Content Marketing & Editorial Strategy",
    heroImage: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
    priceINR: "₹7,999",
    priceUSD: "$119",
    billingPeriod: "per package",
    tat: "3–5 Business Days",
    stats: [
      { value: "+362%", label: "Qualified Inbound Leads", detail: "Surge in organic consultation bookings driven by topic authority articles" },
      { value: "+75%", label: "Online Conversions", detail: "Measurable lift in conversion rates from persuasive landing page copy" },
      { value: "100%", label: "Human-Written & Verified", detail: "Copyscape verified, editorial-reviewed, zero robotic AI hallucinations" },
      { value: "4.8m", label: "Avg Time on Page", detail: "High reader dwell time boosting algorithmic search engagement scores" },
    ],
    overview:
      "Search engines and discerning clients can spot cheap AI-generated fluff in seconds. Our editorial team crafts meticulously researched, authoritative content that answers real customer questions, establishes industry authority, and gently guides readers into your conversion funnel. Every piece is built with semantic entities, high-value statistics, and native English idioms tailored for North American and European executive audiences.",
    problemSolved:
      "Most content marketing fails because it is either boring generic filler that no one reads, or keyword-stuffed garbage that gets penalized by Google's Helpful Content updates. We solve this by interviewing subject-matter experts, structuring clear takeaways, and crafting copy that both humans love reading and Google loves ranking.",
    deliverables: [
      "Comprehensive topical keyword research & search intent mapping",
      "Long-form thought leadership articles (1,500 – 3,500 words)",
      "High-converting landing page copy & value proposition messaging",
      "Editorial proofreading, formatting & Copyscape plagiarism verification",
      "SurferSEO / Clearscope semantic entity density optimization",
      "Custom meta titles, descriptions & OpenGraph teaser copy included",
    ],
    features: [
      {
        title: "Native English Editorial Standards",
        desc: "Nuanced, articulate prose specifically written for senior US, UK, Canadian, and Australian decision-makers.",
        icon: "✍️",
      },
      {
        title: "Semantic NLP Entity Integration",
        desc: "Incorporating secondary entities and NLP terms that search engines use to assess topical completeness.",
        icon: "🧠",
      },
      {
        title: "Conversion Copywriting Mechanics",
        desc: "Using the PAS (Problem-Agitate-Solution) and AIDA frameworks to guide readers to click your CTA.",
        icon: "🎯",
      },
      {
        title: "Fact-Checked & Citable Research",
        desc: "Every claim backed by credible primary sources, government data, and industry whitepapers.",
        icon: "📚",
      },
    ],
    process: [
      { step: "01", title: "Target Audience & Intent Brief", desc: "Understanding customer pain points, competitor gaps, and the exact business goal of the copy." },
      { step: "02", title: "Outline & Semantic Modeling", desc: "Constructing detailed heading outlines with semantic keywords and supporting data points." },
      { step: "03", title: "Drafting & Editorial Polish", desc: "Writing engaging, authoritative prose with rigorous fact-checking and native flow." },
      { step: "04", title: "On-Page SEO Formatting", desc: "Delivering ready-to-publish content formatted with H2/H3 tags, bold callouts, and meta tags." },
    ],
    faq: [
      {
        q: "Is your content generated using automated AI tools?",
        a: "No. While we use AI for research and keyword data analysis, all content is written, structured, and polished by seasoned human copywriters to ensure genuine depth, emotional resonance, and algorithmic safety.",
      },
      {
        q: "What industries do you specialize in?",
        a: "We specialize in B2B SaaS, Professional Services, Real Estate, Technology, E-commerce, Health & Wellness, and Global Legal/Consulting sectors.",
      },
      {
        q: "Are revisions included?",
        a: "Yes. Every content package includes up to 2 rounds of revisions to guarantee the tone, terminology, and messaging align 100% with your brand voice.",
      },
    ],
    technologies: ["SurferSEO", "Clearscope", "Grammarly Premium", "Copyscape Enterprise", "Ahrefs Content Explorer"],
  },
  {
    id: "email-marketing",
    name: "Email Marketing & Revenue Automation",
    shortTitle: "Email Marketing",
    headline: "Turn Cold Leads into Lifelong Customers with Automated Lifecycle Sequences",
    tagline: "Automated retention workflows, segmentation, and enterprise SPF/DKIM/DMARC domain authentication that lands in the primary inbox.",
    category: "Retention & CRM Automation",
    heroImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    priceINR: "₹18,999",
    priceUSD: "$269",
    billingPeriod: "one-time setup",
    tat: "7–12 Business Days",
    stats: [
      { value: "42.8%", label: "Average Open Rate", detail: "Industry-leading primary inbox placement avoiding spam & promo tabs" },
      { value: "3.8x", label: "Retention ROI", detail: "Compounded revenue generated per subscriber through automated funnels" },
      { value: "0.02%", label: "Bounce Rate", detail: "Rigorous list hygiene and DNS authentication ensuring pristine sender reputation" },
      { value: "100%", label: "Automated Workflows", detail: "Hands-off welcome, cart recovery, and VIP nurture series operating 24/7" },
    ],
    overview:
      "Email marketing continues to generate the highest ROI of any digital channel ($36 for every $1 spent). We build end-to-end email revenue engines: from setting up ironclad technical domain authentication (SPF, DKIM, DMARC, BIMI) so your emails bypass spam filters, to writing irresistible subject lines and designing responsive, high-converting newsletter templates.",
    problemSolved:
      "Most businesses blast generic newsletters from domains that have missing DNS records, landing straight into Gmail's Spam or Promotions folder. We fix your sender reputation, segment your list by customer behavior, and deploy automated sequences that make sales while you sleep.",
    deliverables: [
      "Complete DNS domain authentication: SPF, DKIM, DMARC & BIMI configuration",
      "High-converting 5-part automated Welcome & Onboarding sequence",
      "Behavioral Abandoned Cart & Incomplete Checkout recovery funnels",
      "Post-purchase customer retention & VIP re-engagement workflows",
      "Custom responsive HTML email templates styled to your brand identity",
      "Audience list cleaning, invalid email scrubbing & spam trap removal",
      "A/B split testing strategy for open rate & click-through optimization",
    ],
    features: [
      {
        title: "Primary Inbox Deliverability",
        desc: "Technical DNS record configuration ensuring your emails never end up in Gmail or Outlook junk folders.",
        icon: "📬",
      },
      {
        title: "Behavioral Automation Triggers",
        desc: "Emails send automatically based on exact customer actions: clicks, purchases, or inactivity.",
        icon: "⚡",
      },
      {
        title: "Persuasive Copywriting",
        desc: "Concise, curiosity-driven subject lines and conversational body copy that converts readers into buyers.",
        icon: "✍️",
      },
      {
        title: "Advanced Segmentation",
        desc: "Separating high-value clients from cold subscribers for hyper-targeted, relevant messaging.",
        icon: "📊",
      },
    ],
    process: [
      { step: "01", title: "DNS & Sender Audit", desc: "Inspecting MX records, blacklists, sender score, and configuring SPF, DKIM, and DMARC." },
      { step: "02", title: "Lifecycle Strategy & Mapping", desc: "Designing visual automation flowcharts for customer journeys from sign-up to repeat purchase." },
      { step: "03", title: "Copywriting & Template Build", desc: "Writing persuasive email copy and building feather-light responsive email templates." },
      { step: "04", title: "Testing, Warmup & Activation", desc: "Running inbox rendering tests across mobile and desktop clients, then launching automated flows." },
    ],
    faq: [
      {
        q: "What email platforms do you support?",
        a: "We work with Klaviyo, Mailchimp, ActiveCampaign, HubSpot, ConvertKit, Brevo, and custom transactional SMTP relays like Resend and Amazon SES.",
      },
      {
        q: "Will this help if our emails are currently going to Spam?",
        a: "Yes! A major part of our setup is technical domain remediation: aligning your DMARC policies, cleaning your subscriber list, and gradually warming up your sending IP to restore trust with Google and Microsoft.",
      },
      {
        q: "Do you write the email copy as well?",
        a: "Yes. All copy, subject lines, preview text, and call-to-actions are custom written by our senior copywriters as part of the package.",
      },
    ],
    technologies: ["Klaviyo", "Mailchimp", "ActiveCampaign", "Resend", "Amazon SES", "MXToolbox", "BIMI"],
  },
  {
    id: "backlink-building",
    name: "Off Page Backlink Building & Digital PR",
    shortTitle: "Backlink Building",
    headline: "High-Authority Editorial Placements on DR 50–90+ Verified Publications",
    tagline: "Manual white-hat blogger outreach securing permanent, contextual do-follow placements on real websites with genuine traffic.",
    category: "Link Building & Digital PR",
    heroImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    priceINR: "₹19,999",
    priceUSD: "$279",
    billingPeriod: "per campaign",
    tat: "2–3 Weeks per campaign",
    stats: [
      { value: "DR 50–90+", label: "Vetted Authority Sites", detail: "Strict quality thresholds on Ahrefs Domain Rating with zero PBNs" },
      { value: "100%", label: "Manual Editorial Outreach", detail: "Real relationships with webmasters, journalists, and editors" },
      { value: "0% Penalty", label: "Algorithmic Safety", detail: "Clean contextual anchors integrated naturally into relevant industry articles" },
      { value: "Lifetime", label: "Placement Guarantee", detail: "Free replacement guarantee if a link is ever dropped by the publisher" },
    ],
    overview:
      "Backlinks remain one of Google's top 3 ranking factors, but low-quality spam links can trigger severe algorithmic penalties. Our digital PR and guest outreach team maintains direct relationships with over 850+ vetted editors and site owners across North America, Europe, and Asia. We secure permanent, contextual do-follow links inside original editorial content on websites that receive tens of thousands of organic visitors every month.",
    problemSolved:
      "Cheap link vendors sell worthless links on Private Blog Networks (PBNs) or spammy link farms that Google easily detects and penalizes. We protect your business by only earning links from legitimate, traffic-verified publications with natural anchor text distribution.",
    deliverables: [
      "100% manual outreach to verified niche-specific web properties (DR 50–85+)",
      "Contextual do-follow links embedded inside native 1,000+ word editorial articles",
      "Organic traffic verification via Semrush & Ahrefs before pitch approval",
      "Permanent indexing guarantee with Google Cache verification",
      "Natural anchor text ratio calculation (brand, exact match, generic balance)",
      "Transparent live delivery spreadsheet with live URL proof and metrics",
      "Lifetime link replacement policy if any publisher modifies content",
    ],
    features: [
      {
        title: "Zero PBNs or Link Farms",
        desc: "Every target site is an independently owned web property with real active readers and organic rankings.",
        icon: "💎",
      },
      {
        title: "Contextual In-Content Placements",
        desc: "Your link is placed naturally inside the main body of a high-value article, not hidden in footers or author bios.",
        icon: "🔗",
      },
      {
        title: "Traffic-Verified Publishing",
        desc: "We reject any site with under 1,000 monthly organic visitors or with suspicious spam score spikes.",
        icon: "🛡️",
      },
      {
        title: "Guaranteed Turnaround Time",
        desc: "Placements delivered and indexed within 7 to 14 business days with complete transparency.",
        icon: "⏱️",
      },
    ],
    process: [
      { step: "01", title: "Domain & Anchor Strategy", desc: "Analyzing your current backlink profile and mapping which target URLs need authority." },
      { step: "02", title: "Publisher Matching & Pitch", desc: "Selecting high-DR matching sites from our network and pitching customized editorial topics." },
      { step: "03", title: "Content Creation & Link Embed", desc: "Writing comprehensive articles with seamless contextual integration of your brand link." },
      { step: "04", title: "Publication & Index Verification", desc: "Confirming live link placement, checking do-follow attribute, and ensuring Google indexing." },
    ],
    faq: [
      {
        q: "Are these backlinks permanent?",
        a: "Yes. All placements are negotiated for the lifetime of the article. Furthermore, we offer a 1-year free replacement guarantee in the rare event a site changes management.",
      },
      {
        q: "Can I approve the websites before publishing?",
        a: "Absolutely. We provide a curated list of relevant target domains with their Ahrefs DR, organic traffic, and sample articles for your approval prior to pitching.",
      },
      {
        q: "Will these links trigger Google penalties?",
        a: "No. Because every placement is manual, contextually relevant, and published on genuine websites with real traffic, our link building conforms strictly to white-hat editorial standards.",
      },
    ],
    technologies: ["Ahrefs Link Explorer", "Semrush Authority Score", "Moz Link Explorer", "Hunter.io", "Google Cache Checker"],
  },
  {
    id: "website-maintenance",
    name: "Website Maintenance & 24/7 Security Support",
    shortTitle: "Website Maintenance",
    headline: "Proactive Zero-Downtime Maintenance, Cloud Backups & Cyber Defense",
    tagline: "Proactive hardening, automated cloud backups, 24/7 real-time uptime monitoring, and dedicated developer hours for continuous enhancements.",
    category: "Technical Support & Security SLA",
    heroImage: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=1200&q=80",
    priceINR: "₹9,999",
    priceUSD: "$149",
    billingPeriod: "per month",
    tat: "Ongoing Monthly Retainer",
    stats: [
      { value: "99.98%", label: "Uptime SLA", detail: "Guaranteed high-availability infrastructure with instant failover monitoring" },
      { value: "24/7", label: "Real-Time Defense", detail: "Continuous WAF firewall inspection blocking bot scrapers & brute force exploits" },
      { value: "<15m", label: "Incident Response", detail: "Rapid developer remediation for urgent bugs, form glitches, or outages" },
      { value: "Daily", label: "Automated Cloud Backups", detail: "Encrypted off-site snapshots with one-click restore capabilities" },
    ],
    overview:
      "Your website is your company's most valuable commercial asset. Without proactive maintenance, software becomes obsolete, security vulnerabilities emerge, forms silently stop submitting, and loading speeds deteriorate. Our engineering team acts as your dedicated technical department—handling daily backups, security patching, uptime alerts, and monthly speed tuning so you can focus entirely on running your business.",
    problemSolved:
      "Most business owners only discover their website is broken or hacked when an angry customer calls. We prevent downtime before it occurs with 24/7 automated synthetic monitoring, proactive vulnerability patching, and immediate developer intervention.",
    deliverables: [
      "24/7 real-time uptime monitoring with instant 60-second incident alerts",
      "Automated daily encrypted cloud backups stored across geographically separated servers",
      "Weekly core software, framework, and security patch updates in staging first",
      "Continuous WAF firewall rules blocking brute-force attacks and vulnerability probes",
      "Core Web Vitals monthly audit ensuring sub-second speeds remain consistent",
      "Dedicated developer hours every month for content updates, new pages, and tweaks",
      "Monthly executive technical health report detailing security scans and traffic health",
    ],
    features: [
      {
        title: "Proactive Vulnerability Patching",
        desc: "We test updates in an isolated staging branch before pushing to production to ensure zero broken layouts.",
        icon: "🛡️",
      },
      {
        title: "Disaster Recovery in Minutes",
        desc: "Full automated point-in-time snapshots allowing full site restoration in under 10 minutes if needed.",
        icon: "🔄",
      },
      {
        title: "Form & Checkout Assurance",
        desc: "Automated test scripts verifying that your contact forms, checkout buttons, and APIs function 24/7.",
        icon: "🧪",
      },
      {
        title: "Dedicated Developer Support",
        desc: "Direct access to our senior engineering team via WhatsApp, Slack, or priority email ticketing.",
        icon: "👨‍💻",
      },
    ],
    process: [
      { step: "01", title: "Security & Speed Benchmark", desc: "Full baseline vulnerability scan, plugin audit, and performance profiling of your existing site." },
      { step: "02", title: "Backup & Firewall Setup", desc: "Configuring automated encrypted cloud backups and enforcing strict WAF security headers." },
      { step: "03", title: "24/7 Synthetic Monitoring", desc: "Setting up 60-second ping monitors across global nodes to detect any latency spikes or downtime." },
      { step: "04", title: "Ongoing Maintenance & Dev Work", desc: "Executing weekly updates, optimizing database performance, and implementing your requested changes." },
    ],
    faq: [
      {
        q: "What happens if our website goes down?",
        a: "Our synthetic monitors alert our on-call engineers within 60 seconds. We immediately diagnose the server error, resolve DNS/hosting issues, or restore the latest backup to bring you back online in minutes.",
      },
      {
        q: "Can we use our monthly developer hours for new features?",
        a: "Yes! Your included monthly developer hours can be used for new banner designs, publishing blog posts, adding testimonials, editing pricing tables, or adding new landing pages.",
      },
      {
        q: "Do you support custom codebases as well as CMS sites?",
        a: "Yes. We maintain Next.js, React, Node.js, Laravel/PHP, Shopify, Webflow, and custom WordPress architectures.",
      },
    ],
    technologies: ["Cloudflare Enterprise", "UptimeRobot", "Sentry Error Tracking", "AWS S3 Backups", "GitHub CI/CD", "Vercel Analytics"],
  },
];
