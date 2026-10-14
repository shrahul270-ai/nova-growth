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

    url = url.trim();

    // Remove any accidental leading/trailing spaces, quotes, or trailing slashes for cleaner processing
    url = url.replace(/^["']|["']$/g, "");

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
    let res: Response;
    let finalUrl = url;

    // Fetch the target website with realistic browser headers & timeout
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 12000);

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
          const timeout = setTimeout(() => controller.abort(), 8000);

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

    const responseTimeMs = Date.now() - startTime;
    const isHttps = finalUrl.startsWith("https://");
    const html = await res.text();
    const htmlSizeKb = Math.round(Buffer.byteLength(html, "utf8") / 1024);

    // 1. Title
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim().replace(/\s+/g, " ") : null;

    // 2. Meta description
    const metaDescMatch =
      html.match(/<meta\s+[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
      html.match(/<meta\s+[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
    const metaDescription = metaDescMatch ? metaDescMatch[1].trim() : null;

    // 3. H1 Headings
    const h1Matches = Array.from(html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)).map((m) =>
      m[1].replace(/<[^>]+>/g, "").trim().replace(/\s+/g, " ")
    );

    // 4. Mobile Viewport & Canonical
    const hasCanonical = /<link\s+[^>]*rel=["']canonical["']/i.test(html);
    const hasViewport = /<meta\s+[^>]*name=["']viewport["']/i.test(html);

    // 5. Open Graph tags
    const hasOgTitle = /<meta\s+[^>]*property=["']og:title["']/i.test(html);
    const hasOgImage = /<meta\s+[^>]*property=["']og:image["']/i.test(html);
    const hasOgDesc = /<meta\s+[^>]*property=["']og:description["']/i.test(html);

    // 6. Schema JSON-LD
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

    // 7. Images & Alt attributes
    const imgTags = Array.from(html.matchAll(/<img\b([^>]*)>/gi));
    let imagesWithoutAlt = 0;
    imgTags.forEach((m) => {
      const attrs = m[1];
      if (!/alt\s*=\s*["'][^"']+["']/i.test(attrs)) {
        imagesWithoutAlt++;
      }
    });

    // 8. Security headers
    const hasHsts = res.headers.has("strict-transport-security");
    const hasXcto = res.headers.has("x-content-type-options");
    const hasXfo = res.headers.has("x-frame-options");
    const hasCsp = res.headers.has("content-security-policy");

    // Issues and Passes aggregation
    const issues: { text: string; impact: "High" | "Medium" | "Low"; category: string }[] = [];
    const passes: { text: string; category: string }[] = [];

    // Evaluate Title
    if (!title) {
      issues.push({ text: "Missing <title> tag on page", impact: "High", category: "SEO" });
    } else if (title.length < 20) {
      issues.push({
        text: `<title> tag is too short (${title.length} chars, recommended: 40-60)`,
        impact: "Medium",
        category: "SEO",
      });
    } else if (title.length > 70) {
      issues.push({
        text: `<title> tag is too long (${title.length} chars, may truncate in Google SERPs)`,
        impact: "Low",
        category: "SEO",
      });
    } else {
      passes.push({
        text: `Optimized title tag (${title.length} chars): "${title.length > 50 ? title.slice(0, 47) + "..." : title}"`,
        category: "SEO",
      });
    }

    // Evaluate Meta Description
    if (!metaDescription) {
      issues.push({ text: "Missing meta description tag for search snippets", impact: "High", category: "SEO" });
    } else if (metaDescription.length < 50) {
      issues.push({
        text: `Meta description is too short (${metaDescription.length} chars, recommended: 120-160)`,
        impact: "Medium",
        category: "SEO",
      });
    } else if (metaDescription.length > 170) {
      issues.push({
        text: `Meta description exceeds recommended length (${metaDescription.length} chars)`,
        impact: "Low",
        category: "SEO",
      });
    } else {
      passes.push({
        text: `Meta description configured (${metaDescription.length} chars)`,
        category: "SEO",
      });
    }

    // Evaluate H1
    if (h1Matches.length === 0) {
      issues.push({ text: "No <h1> heading tag found (vital for Google keyword relevance)", impact: "High", category: "SEO" });
    } else if (h1Matches.length > 1) {
      issues.push({
        text: `Multiple (${h1Matches.length}) <h1> headings found (best practice: exactly 1 per page)`,
        impact: "Medium",
        category: "SEO",
      });
    } else {
      passes.push({
        text: `Single main <h1> heading detected: "${h1Matches[0].length > 45 ? h1Matches[0].slice(0, 42) + "..." : h1Matches[0]}"`,
        category: "SEO",
      });
    }

    // Evaluate Mobile Viewport
    if (!hasViewport) {
      issues.push({ text: "Missing mobile viewport meta tag (fails mobile-first indexing)", impact: "High", category: "Mobile" });
    } else {
      passes.push({ text: "Mobile responsive viewport meta tag configured", category: "Mobile" });
    }

    // Evaluate Canonical
    if (!hasCanonical) {
      issues.push({ text: "Missing canonical URL link tag to avoid duplicate content penalty", impact: "Medium", category: "SEO" });
    } else {
      passes.push({ text: "Canonical URL tag present", category: "SEO" });
    }

    // Evaluate Schema Markup
    if (schemaTypes.length === 0) {
      issues.push({ text: "Missing structured Schema JSON-LD markup (Organization, WebSite, etc.)", impact: "High", category: "Schema" });
    } else {
      passes.push({
        text: `Structured Schema markup detected (${[...new Set(schemaTypes)].slice(0, 3).join(", ")})`,
        category: "Schema",
      });
    }

    // Evaluate Open Graph
    if (!hasOgTitle || !hasOgImage) {
      issues.push({ text: "Missing Open Graph social preview tags (og:title, og:image)", impact: "Medium", category: "Social" });
    } else {
      passes.push({ text: "Open Graph social sharing metadata configured", category: "Social" });
    }

    // Evaluate Images
    if (imagesWithoutAlt > 0) {
      issues.push({
        text: `${imagesWithoutAlt} image${imagesWithoutAlt > 1 ? "s" : ""} missing alt text (hurts image search ranking & accessibility)`,
        impact: imagesWithoutAlt > 3 ? "High" : "Medium",
        category: "Images",
      });
    } else if (imgTags.length > 0) {
      passes.push({ text: `All ${imgTags.length} images have descriptive alt attributes`, category: "Images" });
    }

    // Evaluate Server Speed
    if (responseTimeMs > 1800) {
      issues.push({
        text: `Slow Server Response Time: ${(responseTimeMs / 1000).toFixed(2)}s (Google benchmark is < 0.8s)`,
        impact: "High",
        category: "Performance",
      });
    } else if (responseTimeMs > 800) {
      issues.push({
        text: `Server response time is ${(responseTimeMs / 1000).toFixed(2)}s (optimal is < 0.5s)`,
        impact: "Medium",
        category: "Performance",
      });
    } else {
      passes.push({ text: `Fast server response: ${responseTimeMs}ms TTFB`, category: "Performance" });
    }

    // Evaluate Security & SSL
    if (!isHttps) {
      issues.push({ text: "Website does not enforce HTTPS SSL encryption", impact: "High", category: "Security" });
    } else {
      passes.push({ text: "SSL / HTTPS connection active & verified", category: "Security" });
    }

    if (!hasHsts) {
      issues.push({ text: "Missing Strict-Transport-Security (HSTS) header", impact: "Low", category: "Security" });
    } else {
      passes.push({ text: "HSTS secure transport header enabled", category: "Security" });
    }

    // Compute Scores
    // 1. SEO Score
    let seoScore = 95;
    if (!title) seoScore -= 20;
    else if (title.length < 20 || title.length > 70) seoScore -= 8;
    if (!metaDescription) seoScore -= 18;
    else if (metaDescription.length < 50 || metaDescription.length > 170) seoScore -= 7;
    if (h1Matches.length === 0) seoScore -= 15;
    else if (h1Matches.length > 1) seoScore -= 7;
    if (!hasCanonical) seoScore -= 10;
    if (schemaTypes.length === 0) seoScore -= 12;
    if (!hasOgTitle) seoScore -= 8;
    if (imagesWithoutAlt > 0) seoScore -= Math.min(15, imagesWithoutAlt * 3);
    seoScore = Math.max(25, Math.min(99, seoScore));

    // 2. Speed Score
    let speedScore = 98;
    if (responseTimeMs > 2500) speedScore = Math.max(30, 60 - Math.round((responseTimeMs - 2500) / 100));
    else if (responseTimeMs > 1500) speedScore = Math.max(50, 75 - Math.round((responseTimeMs - 1500) / 50));
    else if (responseTimeMs > 800) speedScore = Math.max(65, 88 - Math.round((responseTimeMs - 800) / 40));
    else if (responseTimeMs > 400) speedScore = Math.max(82, 95 - Math.round((responseTimeMs - 400) / 30));
    else speedScore = Math.min(99, 94 + Math.round((400 - responseTimeMs) / 80));

    if (htmlSizeKb > 500) speedScore -= 10;
    else if (htmlSizeKb > 250) speedScore -= 5;
    speedScore = Math.max(25, Math.min(99, speedScore));

    // 3. Security Score
    let securityScore = isHttps ? 85 : 30;
    if (hasHsts) securityScore += 8;
    if (hasXcto) securityScore += 4;
    if (hasXfo || hasCsp) securityScore += 3;
    securityScore = Math.min(100, securityScore);

    return NextResponse.json({
      domain: parsedUrl.hostname,
      url: finalUrl,
      httpStatus: res.status,
      scores: {
        seo: seoScore,
        speed: speedScore,
        security: securityScore,
        issuesCount: issues.length,
      },
      metrics: {
        title: title || "Not set",
        titleLength: title ? title.length : 0,
        metaDescription: metaDescription || "Not set",
        metaDescLength: metaDescription ? metaDescription.length : 0,
        h1: h1Matches[0] || "None",
        h1Count: h1Matches.length,
        responseTimeMs,
        htmlSizeKb,
        schemaFound: schemaTypes.length > 0,
        schemaTypes: [...new Set(schemaTypes)],
        imagesTotal: imgTags.length,
        imagesWithoutAlt,
        isHttps,
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
