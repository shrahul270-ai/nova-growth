import { NextResponse } from "next/server";

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

    // Fetch the target website with browser headers & timeout
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 11000);

      res = await fetch(url, {
        signal: controller.signal,
        redirect: "follow",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
        },
      });
      clearTimeout(timeout);
      finalUrl = res.url || url;
    } catch {
      // Fallback: If https timed out or failed, try http
      if (url.startsWith("https://")) {
        try {
          const httpUrl = url.replace("https://", "http://");
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 7000);

          res = await fetch(httpUrl, {
            signal: controller.signal,
            redirect: "follow",
            headers: {
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
            },
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

    const responseTimeMs = Date.now() - startTime;
    const isHttps = finalUrl.startsWith("https://");
    const serverHeader = res.headers.get("server") || "Standard Web Server";
    const contentEncoding = res.headers.get("content-encoding") || "identity";

    // Simultaneously check robots.txt and sitemap.xml in the background
    const [robotsRes, sitemapRes] = await Promise.all([
      fetch(`https://${parsedUrl.hostname}/robots.txt`, {
        method: "HEAD",
        signal: AbortSignal.timeout(3500),
        headers: { "User-Agent": "Mozilla/5.0 (compatible; NovaGrowthBot/1.0)" },
      }).catch(() => null),
      fetch(`https://${parsedUrl.hostname}/sitemap.xml`, {
        method: "HEAD",
        signal: AbortSignal.timeout(3500),
        headers: { "User-Agent": "Mozilla/5.0 (compatible; NovaGrowthBot/1.0)" },
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

    // 1. Title
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim().replace(/\s+/g, " ") : null;

    // 2. Meta description
    const metaDescMatch =
      html.match(/<meta\s+[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
      html.match(/<meta\s+[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
    const metaDescription = metaDescMatch ? metaDescMatch[1].trim() : null;

    // 3. Headings
    const h1Matches = Array.from(html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)).map((m) =>
      m[1].replace(/<[^>]+>/g, "").trim().replace(/\s+/g, " ")
    );
    const h2Count = (html.match(/<h2\b[^>]*>/gi) || []).length;
    const h3Count = (html.match(/<h3\b[^>]*>/gi) || []).length;

    // 4. Links
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

    // 5. Mobile Viewport & Canonical
    const hasCanonical = /<link\s+[^>]*rel=["']canonical["']/i.test(html);
    const hasViewport = /<meta\s+[^>]*name=["']viewport["']/i.test(html);
    const hasLang = /<html[^>]*lang=["'][^"']+["']/i.test(html);

    // 6. Open Graph & Twitter tags
    const hasOgTitle = /<meta\s+[^>]*property=["']og:title["']/i.test(html);
    const hasOgImage = /<meta\s+[^>]*property=["']og:image["']/i.test(html);
    const hasOgDesc = /<meta\s+[^>]*property=["']og:description["']/i.test(html);
    const hasTwitterCard = /<meta\s+[^>]*name=["']twitter:card["']/i.test(html);

    // 7. Schema JSON-LD
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

    // 8. Images & Alt attributes
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

    // 9. Security headers
    const hasHsts = res.headers.has("strict-transport-security");
    const hasXcto = res.headers.has("x-content-type-options");
    const hasXfo = res.headers.has("x-frame-options");
    const hasCsp = res.headers.has("content-security-policy");

    // Dynamic, distinctive Issues & Passes compilation
    const issues: { text: string; impact: "High" | "Medium" | "Low"; category: string }[] = [];
    const passes: { text: string; category: string }[] = [];

    // Title Evaluation
    if (!title) {
      issues.push({ text: "Missing <title> tag on page (Critical for search engine ranking)", impact: "High", category: "SEO" });
    } else if (title.length < 25) {
      issues.push({
        text: `Title tag is too short (${title.length} chars). Recommend 40-60 characters for target keywords.`,
        impact: "Medium",
        category: "SEO",
      });
    } else if (title.length > 70) {
      issues.push({
        text: `Title tag is ${title.length} characters long and will be truncated in Google search results.`,
        impact: "Low",
        category: "SEO",
      });
    } else {
      passes.push({
        text: `Optimized title length (${title.length} chars): "${title.length > 48 ? title.slice(0, 45) + "..." : title}"`,
        category: "SEO",
      });
    }

    // Meta Description Evaluation
    if (!metaDescription) {
      issues.push({ text: "Missing meta description (lowers click-through rate in Google SERPs)", impact: "High", category: "SEO" });
    } else if (metaDescription.length < 50) {
      issues.push({
        text: `Meta description is too brief (${metaDescription.length} chars). Optimal length is 120-160 chars.`,
        impact: "Medium",
        category: "SEO",
      });
    } else if (metaDescription.length > 175) {
      issues.push({
        text: `Meta description is ${metaDescription.length} chars (exceeds Google snippet limit).`,
        impact: "Low",
        category: "SEO",
      });
    } else {
      passes.push({
        text: `Engaging meta description found (${metaDescription.length} chars)`,
        category: "SEO",
      });
    }

    // H1 Heading Evaluation
    if (h1Matches.length === 0) {
      issues.push({ text: "No <h1> heading found on page (primary Google topic relevance indicator)", impact: "High", category: "SEO" });
    } else if (h1Matches.length > 1) {
      issues.push({
        text: `Multiple (${h1Matches.length}) <h1> headings detected (recommended: exactly 1 distinct H1 per page)`,
        impact: "Medium",
        category: "SEO",
      });
    } else {
      passes.push({
        text: `Clear primary <h1> heading: "${h1Matches[0].length > 40 ? h1Matches[0].slice(0, 37) + "..." : h1Matches[0]}"`,
        category: "SEO",
      });
    }

    // Subheadings Evaluation
    if (h2Count === 0) {
      issues.push({ text: "No <h2> section headings found (hurts semantic content structure & secondary keywords)", impact: "Medium", category: "Content" });
    } else {
      passes.push({ text: `Semantic hierarchy organized with ${h2Count} <h2> headings and ${h3Count} <h3> sub-sections`, category: "Content" });
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
      passes.push({ text: "robots.txt file verified and actively guiding search engine bots", category: "Technical" });
    }

    if (!hasSitemap) {
      issues.push({ text: "XML sitemap not found at standard /sitemap.xml location", impact: "Medium", category: "Technical" });
    } else {
      passes.push({ text: "XML sitemap detected to accelerate Google indexing", category: "Technical" });
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
        text: `High server latency: ${(responseTimeMs / 1000).toFixed(2)}s TTFB (Google benchmark is < 0.6s)`,
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
      passes.push({ text: `Fast server response time: ${responseTimeMs}ms TTFB on ${serverHeader}`, category: "Performance" });
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

    // ==========================================
    // DYNAMIC & DISTINCT SCORING ENGINE
    // ==========================================

    // 1. SEO Health Score (0 - 100)
    let seoScore = 92;
    if (!title) seoScore -= 24;
    else if (title.length < 25) seoScore -= 10;
    else if (title.length > 70) seoScore -= 5;

    if (!metaDescription) seoScore -= 20;
    else if (metaDescription.length < 50) seoScore -= 9;
    else if (metaDescription.length > 175) seoScore -= 4;

    if (h1Matches.length === 0) seoScore -= 16;
    else if (h1Matches.length > 1) seoScore -= 6;

    if (h2Count === 0) seoScore -= 8;

    if (wordCount < 100) seoScore -= 18;
    else if (wordCount < 300) seoScore -= 9;
    else if (wordCount > 600) seoScore += 4;

    if (!hasCanonical) seoScore -= 7;
    if (!hasViewport) seoScore -= 15;
    if (!hasLang) seoScore -= 3;
    if (schemaTypes.length === 0) seoScore -= 9;
    if (imagesWithoutAlt > 0) seoScore -= Math.min(12, imagesWithoutAlt * 3);
    if (!hasRobotsTxt) seoScore -= 5;
    if (!hasSitemap) seoScore -= 5;
    seoScore = Math.max(18, Math.min(99, seoScore));

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
    let securityScore = isHttps ? 80 : 25;
    if (hasHsts) securityScore += 10;
    if (hasXcto) securityScore += 4;
    if (hasXfo) securityScore += 3;
    if (hasCsp) securityScore += 3;
    securityScore = Math.max(25, Math.min(100, securityScore));

    // 4. GOOGLE RANKING ENGINE (0 - 100)
    // Multi-pillar ranking calculation
    let techIndexScore = 65;
    if (hasRobotsTxt) techIndexScore += 12;
    if (hasSitemap) techIndexScore += 12;
    if (hasCanonical) techIndexScore += 6;
    if (internalLinksCount > 15) techIndexScore += 5;
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
      rankingSummary = "Outstanding on-page authority and technical crawlability. Highly competitive for top 3 Google positions.";
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
    if (responseTimeMs < 500) rankingStrengths.push(`Ultra-fast TTFB server speed (${responseTimeMs}ms)`);
    if (title && title.length >= 25 && title.length <= 70) rankingStrengths.push("Keyword-optimized title tag");
    if (metaDescription && metaDescription.length >= 50) rankingStrengths.push("Search snippet meta description active");
    if (h1Matches.length === 1) rankingStrengths.push("Single focused <h1> primary heading");
    if (wordCount >= 500) rankingStrengths.push(`Rich content depth (${wordCount.toLocaleString()} words)`);
    if (hasRobotsTxt && hasSitemap) rankingStrengths.push("Complete indexing infrastructure (robots.txt + sitemap)");
    if (schemaTypes.length > 0) rankingStrengths.push("Structured Schema JSON-LD for rich snippets");

    // High impact opportunities to boost ranking
    const rankingOpportunities: string[] = [];
    if (!title || title.length < 25) rankingOpportunities.push("Enhance <title> tag with high-converting target keywords");
    if (!metaDescription) rankingOpportunities.push("Add compelling meta description to increase SERP click-through rate");
    if (h1Matches.length === 0) rankingOpportunities.push("Add clear <h1> tag aligned with primary commercial search term");
    if (wordCount < 400) rankingOpportunities.push("Expand topical depth to 600+ words to answer user search intent");
    if (!hasSitemap) rankingOpportunities.push("Submit XML sitemap to Google Search Console for faster indexing");
    if (imagesWithoutAlt > 0) rankingOpportunities.push(`Add keyword alt attributes to ${imagesWithoutAlt} unoptimized images`);
    if (responseTimeMs > 750) rankingOpportunities.push("Optimize server TTFB and caching to improve Core Web Vitals");

    return NextResponse.json({
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
      metrics: {
        title: title || "Not set",
        titleLength: title ? title.length : 0,
        metaDescription: metaDescription || "Not set",
        metaDescLength: metaDescription ? metaDescription.length : 0,
        h1: h1Matches[0] || "None",
        h1Count: h1Matches.length,
        h2Count,
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
