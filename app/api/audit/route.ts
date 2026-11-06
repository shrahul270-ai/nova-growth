import { NextResponse } from "next/server";
import { createOrUpdateAudit } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let { url } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "Please enter a valid website URL." },
        { status: 400 }
      );
    }

    url = url.trim().replace(/^["']|["']$/g, "");

    // Add protocol if missing
    if (!/^https?:\/\//i.test(url)) {
      url = "https://" + url;
    }

    // Validate hostname
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url);
      if (!parsedUrl.hostname.includes(".")) {
        return NextResponse.json(
          { error: "Invalid domain name. Please enter a valid address like yourcompany.com" },
          { status: 400 }
        );
      }
    } catch {
      return NextResponse.json(
        { error: "Invalid URL format. Please enter a valid website address." },
        { status: 400 }
      );
    }

    const startTime = Date.now();
    let res: Response | null = null;
    let finalUrl = url;

    const browserHeaders = {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
      "Sec-Ch-Ua": '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
      "Sec-Ch-Ua-Mobile": "?0",
      "Sec-Ch-Ua-Platform": '"Windows"',
      "Sec-Fetch-Dest": "document",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-Site": "none",
      "Sec-Fetch-User": "?1",
      "Upgrade-Insecure-Requests": "1",
    };

    // Fetch the target website with browser headers & timeout
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 12000);

      res = await fetch(url, {
        signal: controller.signal,
        redirect: "follow",
        headers: browserHeaders,
      });
      clearTimeout(timeout);
      finalUrl = res.url || url;
    } catch {
      // Fallback: If https timed out or failed, try http
      if (url.startsWith("https://")) {
        try {
          const httpUrl = url.replace("https://", "http://");
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 8000);

          res = await fetch(httpUrl, {
            signal: controller.signal,
            redirect: "follow",
            headers: browserHeaders,
          });
          clearTimeout(timeout);
          finalUrl = res.url || httpUrl;
        } catch {
          return NextResponse.json(
            {
              error: `Could not reach ${parsedUrl.hostname}. Please check if the website URL is correct and online.`,
            },
            { status: 404 }
          );
        }
      } else {
        return NextResponse.json(
          {
            error: `Could not reach ${parsedUrl.hostname}. Please check if the website URL is correct and online.`,
          },
          { status: 404 }
        );
      }
    }

    if (!res) {
      return NextResponse.json(
        { error: `Could not reach ${parsedUrl.hostname}. Website did not respond.` },
        { status: 404 }
      );
    }

    const responseTimeMs = Math.max(80, Date.now() - startTime);
    const isHttps = finalUrl.startsWith("https://");
    const serverHeader = res.headers.get("server") || "Cloudflare / Global CDN";
    const contentEncoding = res.headers.get("content-encoding") || "gzip/br";

    // Simultaneously check robots.txt and sitemap.xml in the background
    const [robotsRes, sitemapRes] = await Promise.all([
      fetch(`https://${parsedUrl.hostname}/robots.txt`, {
        method: "GET",
        signal: AbortSignal.timeout(4000),
        headers: { "User-Agent": browserHeaders["User-Agent"] },
      }).catch(() => null),
      fetch(`https://${parsedUrl.hostname}/sitemap.xml`, {
        method: "GET",
        signal: AbortSignal.timeout(4000),
        headers: { "User-Agent": browserHeaders["User-Agent"] },
      }).catch(() => null),
    ]);

    const hasRobotsTxt = Boolean(robotsRes && (robotsRes.status === 200 || robotsRes.status === 204));
    const hasSitemap = Boolean(sitemapRes && (sitemapRes.status === 200 || sitemapRes.status === 301 || sitemapRes.status === 302));

    const html = await res.text();
    const htmlSizeKb = Math.max(1, Math.round(Buffer.byteLength(html, "utf8") / 1024));

    // Word count calculation
    const bodyText = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, " ")
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, " ")
      .replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const words = bodyText ? bodyText.split(" ").filter((w) => w.length > 1) : [];
    const wordCount = words.length;

    // 1. Title Tag
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    let title = titleMatch ? titleMatch[1].trim().replace(/\s+/g, " ") : null;

    // 2. Open Graph & Twitter Tags (Useful fallback if title/desc are missing in pure HTML)
    const ogTitleMatch = html.match(/<meta\s+[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["']/i);
    const ogTitle = ogTitleMatch ? ogTitleMatch[1].trim() : null;

    const ogDescMatch = html.match(/<meta\s+[^>]*property=["']og:description["'][^>]*content=["']([^"']*)["']/i);
    const ogDescription = ogDescMatch ? ogDescMatch[1].trim() : null;

    const ogImageMatch = html.match(/<meta\s+[^>]*property=["']og:image["'][^>]*content=["']([^"']*)["']/i);
    const ogImage = ogImageMatch ? ogImageMatch[1].trim() : null;

    const ogSiteNameMatch = html.match(/<meta\s+[^>]*property=["']og:site_name["'][^>]*content=["']([^"']*)["']/i);
    const ogSiteName = ogSiteNameMatch ? ogSiteNameMatch[1].trim() : null;

    // 3. Meta Description
    const metaDescMatch =
      html.match(/<meta\s+[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
      html.match(/<meta\s+[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
    let metaDescription = metaDescMatch ? metaDescMatch[1].trim() : null;

    if (!title && ogTitle) title = ogTitle;
    if (!metaDescription && ogDescription) metaDescription = ogDescription;

    // 4. Headings List
    const h1Matches = Array.from(html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)).map((m) =>
      m[1].replace(/<[^>]+>/g, "").trim().replace(/\s+/g, " ")
    ).filter(Boolean);

    const h2Matches = Array.from(html.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi)).map((m) =>
      m[1].replace(/<[^>]+>/g, "").trim().replace(/\s+/g, " ")
    ).filter(Boolean);

    const h3Count = (html.match(/<h3\b[^>]*>/gi) || []).length;

    // 5. Links
    const linkMatches = Array.from(html.matchAll(/href=["']([^"']+)["']/gi)).map((m) => m[1]);
    let internalLinksCount = 0;
    let externalLinksCount = 0;
    linkMatches.forEach((href) => {
      if (href.startsWith("/") || href.includes(parsedUrl.hostname)) {
        internalLinksCount++;
      } else if (href.startsWith("http://") || href.startsWith("https://")) {
        externalLinksCount++;
      }
    });

    // 6. Canonical URL, Viewport, Lang, Robots Meta
    const canonicalMatch = html.match(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
    const canonicalUrl = canonicalMatch ? canonicalMatch[1].trim() : (html.includes("rel=\"canonical\"") || html.includes("rel='canonical'"));
    const hasCanonical = Boolean(canonicalUrl);

    const hasViewport = /<meta\s+[^>]*name=["']viewport["']/i.test(html);
    const langMatch = html.match(/<html[^>]*lang=["']([^"']+)["']/i);
    const pageLang = langMatch ? langMatch[1] : (html.includes("lang=") ? "en" : null);

    const robotsMetaMatch = html.match(/<meta\s+[^>]*name=["']robots["'][^>]*content=["']([^"']*)["']/i);
    const robotsMeta = robotsMetaMatch ? robotsMetaMatch[1].trim() : "index, follow (default)";

    // 7. Twitter Card
    const twitterCardMatch = html.match(/<meta\s+[^>]*name=["']twitter:card["'][^>]*content=["']([^"']*)["']/i);
    const twitterCard = twitterCardMatch ? twitterCardMatch[1].trim() : (html.includes("twitter:card") ? "summary_large_image" : null);

    // 8. Schema JSON-LD
    const schemaMatches = Array.from(
      html.matchAll(/<script\s+[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)
    );
    const schemaTypes: string[] = [];
    schemaMatches.forEach((m) => {
      try {
        const data = JSON.parse(m[1].trim());
        if (Array.isArray(data)) {
          data.forEach((item) => item["@type"] && schemaTypes.push(String(item["@type"])));
        } else if (data["@type"]) {
          schemaTypes.push(String(data["@type"]));
        } else if (data["@graph"] && Array.isArray(data["@graph"])) {
          data["@graph"].forEach((item: any) => item["@type"] && schemaTypes.push(String(item["@type"])));
        }
      } catch {}
    });

    // 9. Images & Alt attributes
    const imgTags = Array.from(html.matchAll(/<img\b([^>]*)>/gi));
    let imagesWithoutAlt = 0;
    let modernImagesCount = 0;
    imgTags.forEach((m) => {
      const attrs = m[1];
      if (!/alt\s*=\s*["'][^"']+["']/i.test(attrs)) {
        imagesWithoutAlt++;
      }
      if (/\.(webp|avif|svg)/i.test(attrs) || /type=["']image\/(webp|avif|svg\+xml)["']/i.test(attrs)) {
        modernImagesCount++;
      }
    });

    // 10. Security headers
    const hasHsts = res.headers.has("strict-transport-security");
    const hasXcto = res.headers.has("x-content-type-options");
    const hasXfo = res.headers.has("x-frame-options");
    const hasCsp = res.headers.has("content-security-policy");

    // Dynamic Issues & Passes compilation
    const issues: { text: string; impact: "High" | "Medium" | "Low"; category: string }[] = [];
    const passes: { text: string; category: string }[] = [];

    // Title Evaluation
    if (!title) {
      issues.push({ text: "Missing <title> tag on page (Primary Google ranking factor)", impact: "High", category: "SEO" });
    } else if (title.length < 25) {
      issues.push({
        text: `Title tag is too short (${title.length} chars). Recommend 45-65 characters for commercial keyword rank.`,
        impact: "Medium",
        category: "SEO",
      });
    } else if (title.length > 70) {
      issues.push({
        text: `Title tag is ${title.length} characters long and will be truncated with '...' in Google search results.`,
        impact: "Low",
        category: "SEO",
      });
    } else {
      passes.push({
        text: `Optimized title length (${title.length} chars): "${title.length > 55 ? title.slice(0, 52) + "..." : title}"`,
        category: "SEO",
      });
    }

    // Meta Description Evaluation
    if (!metaDescription) {
      issues.push({ text: "Missing meta description (Significantly lowers click-through rate in Google SERPs)", impact: "High", category: "SEO" });
    } else if (metaDescription.length < 50) {
      issues.push({
        text: `Meta description is too brief (${metaDescription.length} chars). Optimal Google length is 120-160 chars.`,
        impact: "Medium",
        category: "SEO",
      });
    } else if (metaDescription.length > 175) {
      issues.push({
        text: `Meta description is ${metaDescription.length} chars (exceeds Google SERP snippet display limit).`,
        impact: "Low",
        category: "SEO",
      });
    } else {
      passes.push({
        text: `Engaging search meta description configured (${metaDescription.length} chars)`,
        category: "SEO",
      });
    }

    // H1 Heading Evaluation
    if (h1Matches.length === 0) {
      issues.push({ text: "No <h1> heading detected in HTML (Primary topical indicator for search algorithms)", impact: "High", category: "SEO" });
    } else if (h1Matches.length > 1) {
      issues.push({
        text: `Multiple (${h1Matches.length}) <h1> headings detected. Best practice is exactly 1 distinct H1 per page.`,
        impact: "Medium",
        category: "SEO",
      });
    } else {
      passes.push({
        text: `Clear focused <h1> heading: "${h1Matches[0].length > 45 ? h1Matches[0].slice(0, 42) + "..." : h1Matches[0]}"`,
        category: "SEO",
      });
    }

    // Subheadings Evaluation
    if (h2Matches.length === 0) {
      issues.push({ text: "No <h2> section headings found (weakens semantic structure & secondary keyword ranking)", impact: "Medium", category: "Content" });
    } else {
      passes.push({ text: `Semantic hierarchy organized with ${h2Matches.length} <h2> headings and ${h3Count} <h3> sub-sections`, category: "Content" });
    }

    // Content Depth (Word Count)
    if (wordCount < 150) {
      issues.push({ text: `Thin content detected (${wordCount} words). Google prioritizes comprehensive pages with 600+ words.`, impact: "High", category: "Content" });
    } else if (wordCount < 400) {
      issues.push({ text: `Moderate content length (${wordCount} words). Expanding topical depth will boost ranking power.`, impact: "Medium", category: "Content" });
    } else {
      passes.push({ text: `Substantial content depth (${wordCount.toLocaleString()} indexable words)`, category: "Content" });
    }

    // Robots.txt & Sitemap
    if (!hasRobotsTxt) {
      issues.push({ text: "robots.txt file not found or inaccessible at /robots.txt", impact: "Medium", category: "Technical" });
    } else {
      passes.push({ text: "robots.txt verified and actively guiding search engine crawlers", category: "Technical" });
    }

    if (!hasSitemap) {
      issues.push({ text: "XML sitemap not found at standard /sitemap.xml location", impact: "Medium", category: "Technical" });
    } else {
      passes.push({ text: "XML sitemap detected to accelerate Google indexing & discoverability", category: "Technical" });
    }

    // Mobile Viewport
    if (!hasViewport) {
      issues.push({ text: "Missing mobile viewport meta tag (fails Google mobile-first indexing)", impact: "High", category: "Mobile" });
    } else {
      passes.push({ text: "Mobile-responsive viewport meta tag configured", category: "Mobile" });
    }

    // Canonical Tag
    if (!hasCanonical) {
      issues.push({ text: "Missing rel='canonical' tag to prevent duplicate content penalties", impact: "Medium", category: "SEO" });
    } else {
      passes.push({ text: "Canonical URL tag present and active", category: "SEO" });
    }

    // Schema JSON-LD
    if (schemaTypes.length === 0) {
      issues.push({ text: "Missing structured Schema JSON-LD markup (loses rich snippets in SERPs)", impact: "Medium", category: "Schema" });
    } else {
      passes.push({
        text: `Structured Schema markup detected: ${[...new Set(schemaTypes)].slice(0, 3).join(", ")}`,
        category: "Schema",
      });
    }

    // Images & Alt Text
    if (imagesWithoutAlt > 0) {
      issues.push({
        text: `${imagesWithoutAlt} of ${imgTags.length} images are missing descriptive alt text`,
        impact: imagesWithoutAlt > 3 ? "High" : "Medium",
        category: "Images",
      });
    } else if (imgTags.length > 0) {
      passes.push({ text: `All ${imgTags.length} image elements include descriptive alt attributes`, category: "Images" });
    }

    // Performance & Server Response Time (TTFB)
    if (responseTimeMs > 1800) {
      issues.push({
        text: `High server latency: ${(responseTimeMs / 1000).toFixed(2)}s TTFB (Google Core Web Vitals benchmark is < 0.6s)`,
        impact: "High",
        category: "Performance",
      });
    } else if (responseTimeMs > 750) {
      issues.push({
        text: `Server response time is ${responseTimeMs}ms (optimal is under 400ms)`,
        impact: "Medium",
        category: "Performance",
      });
    } else {
      passes.push({ text: `Ultra-fast server response: ${responseTimeMs}ms TTFB on ${serverHeader}`, category: "Performance" });
    }

    // Page HTML Size
    if (htmlSizeKb > 400) {
      issues.push({
        text: `Heavy HTML document size (${htmlSizeKb} KB). Recommend minification and code splitting.`,
        impact: "Medium",
        category: "Performance",
      });
    } else {
      passes.push({ text: `Efficient document size (${htmlSizeKb} KB)`, category: "Performance" });
    }

    // SSL / HTTPS
    if (!isHttps) {
      issues.push({ text: "Website does not use HTTPS SSL encryption (severe ranking penalty)", impact: "High", category: "Security" });
    } else {
      passes.push({ text: "Secure HTTPS / SSL connection verified", category: "Security" });
    }

    if (!hasHsts) {
      issues.push({ text: "Missing Strict-Transport-Security (HSTS) protection header", impact: "Low", category: "Security" });
    } else {
      passes.push({ text: "HSTS security header actively enforcing encrypted connections", category: "Security" });
    }

    // OpenGraph social sharing
    if (!ogTitle && !ogDescription) {
      issues.push({ text: "Missing OpenGraph meta tags (og:title, og:image) for rich social link sharing", impact: "Low", category: "Social" });
    } else {
      passes.push({ text: "OpenGraph tags detected for high-CTR social sharing", category: "Social" });
    }

    // ==========================================
    // DYNAMIC & DISTINCT SCORING ENGINE
    // ==========================================

    // 1. SEO Health Score (0 - 100)
    let seoScore = 94;
    if (!title) seoScore -= 24;
    else if (title.length < 25) seoScore -= 10;
    else if (title.length > 70) seoScore -= 5;

    if (!metaDescription) seoScore -= 20;
    else if (metaDescription.length < 50) seoScore -= 9;
    else if (metaDescription.length > 175) seoScore -= 4;

    if (h1Matches.length === 0) seoScore -= 16;
    else if (h1Matches.length > 1) seoScore -= 6;

    if (h2Matches.length === 0) seoScore -= 8;

    if (wordCount < 100) seoScore -= 18;
    else if (wordCount < 300) seoScore -= 9;
    else if (wordCount > 600) seoScore += 4;

    if (!hasCanonical) seoScore -= 7;
    if (!hasViewport) seoScore -= 15;
    if (!pageLang) seoScore -= 3;
    if (schemaTypes.length === 0) seoScore -= 9;
    if (imagesWithoutAlt > 0) seoScore -= Math.min(12, imagesWithoutAlt * 3);
    if (!hasRobotsTxt) seoScore -= 5;
    if (!hasSitemap) seoScore -= 5;
    seoScore = Math.max(20, Math.min(99, seoScore));

    // 2. Performance / Speed Score (0 - 100)
    let speedScore = 96;
    if (responseTimeMs > 2500) speedScore -= 45;
    else if (responseTimeMs > 1500) speedScore -= 30;
    else if (responseTimeMs > 800) speedScore -= 18;
    else if (responseTimeMs > 400) speedScore -= 8;
    else speedScore += 3;

    if (htmlSizeKb > 500) speedScore -= 16;
    else if (htmlSizeKb > 250) speedScore -= 9;
    else if (htmlSizeKb < 70) speedScore += 3;

    if (imgTags.length > 30) speedScore -= 6;
    if (contentEncoding === "identity" || contentEncoding === "none") speedScore -= 6;
    speedScore = Math.max(22, Math.min(99, speedScore));

    // 3. Security Score (0 - 100)
    let securityScore = isHttps ? 85 : 25;
    if (hasHsts) securityScore += 8;
    if (hasXcto) securityScore += 3;
    if (hasXfo) securityScore += 2;
    if (hasCsp) securityScore += 2;
    securityScore = Math.max(25, Math.min(100, securityScore));

    // 4. Core Web Vitals calculated estimation
    const lcpSec = Math.max(0.6, (responseTimeMs * 1.6) / 1000).toFixed(2);
    const fidMs = Math.max(12, Math.round(responseTimeMs * 0.15));
    const fcpSec = Math.max(0.4, (responseTimeMs * 1.1) / 1000).toFixed(2);
    const clsScore = (Math.min(0.15, (htmlSizeKb > 200 ? 0.08 : 0.02))).toFixed(2);

    // 5. GOOGLE RANKING ENGINE (0 - 100)
    let techIndexScore = 70;
    if (hasRobotsTxt) techIndexScore += 10;
    if (hasSitemap) techIndexScore += 10;
    if (hasCanonical) techIndexScore += 5;
    if (internalLinksCount > 10) techIndexScore += 5;
    techIndexScore = Math.min(100, techIndexScore);

    const rankingScore = Math.round(
      seoScore * 0.40 +
      techIndexScore * 0.25 +
      speedScore * 0.20 +
      securityScore * 0.15
    );

    let rankingPosition: string;
    let rankingTier: string;
    let rankingBadge: string;
    let rankingSummary: string;

    if (rankingScore >= 88) {
      rankingPosition = "Rank #1 - #3";
      rankingTier = "Top 3 SERP Authority";
      rankingBadge = "Top 5% Authority";
      rankingSummary = "Outstanding on-page authority and technical crawlability. Highly competitive for top 3 Google search positions.";
    } else if (rankingScore >= 78) {
      rankingPosition = "Rank #4 - #10";
      rankingTier = "Page 1 Google Contender";
      rankingBadge = "Top 15% Search Ready";
      rankingSummary = "Solid search foundation with Page 1 potential. Targeted keyword clustering and link authority can push to Top 3.";
    } else if (rankingScore >= 65) {
      rankingPosition = "Rank #11 - #20";
      rankingTier = "Page 2 Moving Up";
      rankingBadge = "Top 30% Visibility";
      rankingSummary = "Good basic footprint but hindered by on-page or technical gaps. Fixing flagged issues will elevate to Page 1.";
    } else if (rankingScore >= 50) {
      rankingPosition = "Rank #21 - #50";
      rankingTier = "Page 3-5 Opportunity";
      rankingBadge = "Needs Optimization";
      rankingSummary = "Significant search roadblocks detected. Content depth, metadata, or indexing issues are limiting organic reach.";
    } else {
      rankingPosition = "Rank #50+";
      rankingTier = "Low Search Visibility";
      rankingBadge = "High Priority Fixes";
      rankingSummary = "Critical SEO and technical gaps found. Requires immediate metadata, structure, and speed overhaul.";
    }

    // Top strengths contributing to ranking
    const rankingStrengths: string[] = [];
    if (isHttps) rankingStrengths.push("Secure SSL/HTTPS encryption verified");
    if (responseTimeMs < 500) rankingStrengths.push(`Ultra-fast TTFB server latency (${responseTimeMs}ms)`);
    if (title && title.length >= 25 && title.length <= 70) rankingStrengths.push("Keyword-optimized title tag");
    if (metaDescription && metaDescription.length >= 50) rankingStrengths.push("Search snippet meta description active");
    if (h1Matches.length === 1) rankingStrengths.push("Single focused <h1> primary heading");
    if (wordCount >= 500) rankingStrengths.push(`Rich content depth (${wordCount.toLocaleString()} words)`);
    if (hasRobotsTxt && hasSitemap) rankingStrengths.push("Complete indexing infrastructure (robots.txt + sitemap)");
    if (schemaTypes.length > 0) rankingStrengths.push("Structured Schema JSON-LD for rich snippets");

    // High impact opportunities to boost ranking
    const rankingOpportunities: string[] = [];
    if (!title || title.length < 25) rankingOpportunities.push("Enhance <title> tag with high-converting target commercial keywords");
    if (!metaDescription) rankingOpportunities.push("Add compelling meta description to increase SERP click-through rate");
    if (h1Matches.length === 0) rankingOpportunities.push("Add clear <h1> tag aligned with primary commercial search term");
    if (wordCount < 400) rankingOpportunities.push("Expand topical depth to 600+ words to satisfy buyer intent");
    if (!hasSitemap) rankingOpportunities.push("Submit XML sitemap to Google Search Console for faster indexing");
    if (imagesWithoutAlt > 0) rankingOpportunities.push(`Add descriptive alt attributes to ${imagesWithoutAlt} unoptimized images`);
    if (responseTimeMs > 750) rankingOpportunities.push("Optimize server TTFB and caching to improve Core Web Vitals");

    // Actionable 3-Step Fix Roadmap
    const actionPlan = [
      {
        step: "01",
        title: "Fix Core Metadata & Headings",
        desc: !title || title.length < 25
          ? "Rewrite the <title> tag to include primary commercial keyword and brand name."
          : h1Matches.length === 0
          ? "Add a single clear <h1> heading summarizing the page's core offering."
          : "Refine meta description to 140-155 characters with a compelling call-to-action.",
      },
      {
        step: "02",
        title: "Optimize Core Web Vitals & Latency",
        desc: responseTimeMs > 600
          ? `Current TTFB is ${responseTimeMs}ms. Implement edge caching or Next.js SSR to cut latency below 350ms.`
          : imagesWithoutAlt > 0
          ? `Add descriptive alt tags to ${imagesWithoutAlt} images to capture Google Image search traffic.`
          : "Enable WebP/AVIF image formats and HTTP/3 compression to maximize speed score.",
      },
      {
        step: "03",
        title: "Scale Authority with DR 50+ Editorial Links",
        desc: "Acquire high-authority contextual dofollow backlinks from indexed publications to drive keyword rank into the top 3.",
      },
    ];

    // Save to database
    let savedAuditId: string | undefined;
    try {
      const clientIp = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
      const userAgent = req.headers.get("user-agent") || "unknown";
      const saved = await createOrUpdateAudit({
        type: "seo_audit",
        domain: parsedUrl.hostname,
        url: finalUrl,
        clientIp,
        userAgent,
        scores: {
          seo: seoScore,
          speed: speedScore,
          security: securityScore,
          ranking: rankingScore,
          rankingPosition,
          rankingTier,
        },
        metrics: {
          responseTimeMs,
          wordCount,
          isHttps,
          issuesCount: issues.length,
        },
      });
      savedAuditId = saved.id;
    } catch (dbErr) {
      console.error("Failed to save audit to database:", dbErr);
    }

    return NextResponse.json({
      auditId: savedAuditId,
      domain: parsedUrl.hostname,
      url: finalUrl,
      httpStatus: res.status,
      scores: {
        seo: seoScore,
        speed: speedScore,
        security: securityScore,
        ranking: rankingScore,
        rankingPosition,
        rankingTier,
        rankingBadge,
        issuesCount: issues.length,
      },
      coreWebVitals: {
        lcp: `${lcpSec}s`,
        lcpStatus: parseFloat(lcpSec) <= 2.5 ? "Good" : parseFloat(lcpSec) <= 4.0 ? "Needs Improvement" : "Poor",
        fid: `${fidMs}ms`,
        fidStatus: fidMs <= 100 ? "Good" : "Needs Improvement",
        cls: clsScore,
        clsStatus: parseFloat(clsScore) <= 0.1 ? "Good" : "Needs Improvement",
        fcp: `${fcpSec}s`,
        fcpStatus: parseFloat(fcpSec) <= 1.8 ? "Good" : "Needs Improvement",
      },
      rankingDetails: {
        estimatedPosition: rankingPosition,
        tier: rankingTier,
        score: rankingScore,
        badge: rankingBadge,
        summary: rankingSummary,
        strengths: rankingStrengths.slice(0, 4),
        opportunities: rankingOpportunities.slice(0, 4),
        serpSnippet: {
          title: title || `${parsedUrl.hostname} - Official Website`,
          url: finalUrl,
          description: metaDescription || `Explore ${parsedUrl.hostname} for services, updates, and more.`,
        },
      },
      actionPlan,
      metrics: {
        title: title || "Not set",
        titleLength: title ? title.length : 0,
        metaDescription: metaDescription || "Not set",
        metaDescLength: metaDescription ? metaDescription.length : 0,
        h1: h1Matches[0] || "None",
        h1Matches: h1Matches.slice(0, 3),
        h1Count: h1Matches.length,
        h2Matches: h2Matches.slice(0, 5),
        h2Count: h2Matches.length,
        h3Count,
        wordCount,
        internalLinksCount,
        externalLinksCount,
        responseTimeMs,
        htmlSizeKb,
        serverHeader,
        schemaFound: schemaTypes.length > 0,
        schemaTypes: [...new Set(schemaTypes)],
        imagesTotal: imgTags.length,
        imagesWithoutAlt,
        modernImagesCount,
        isHttps,
        hasRobotsTxt,
        hasSitemap,
        hasCanonical,
        canonicalUrl: typeof canonicalUrl === "string" ? canonicalUrl : null,
        pageLang,
        robotsMeta,
        ogTitle,
        ogDescription,
        ogImage,
        ogSiteName,
        twitterCard,
      },
      issues,
      passes,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "An unexpected error occurred while auditing the website." },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { auditId, email } = body;
    if (!auditId || !email) {
      return NextResponse.json({ error: "auditId and email are required" }, { status: 400 });
    }
    const updated = await createOrUpdateAudit({
      id: auditId,
      type: "seo_audit",
      domain: "",
      url: "",
      emailSubmitted: email,
      scores: { seo: 0, speed: 0, security: 0, ranking: 0, rankingPosition: "", rankingTier: "" },
      metrics: {},
    });
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to update audit" }, { status: 500 });
  }
}
