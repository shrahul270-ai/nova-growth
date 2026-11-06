import { NextRequest, NextResponse } from "next/server";
import { sanitizeInput } from "@/lib/security";

// Knowledge Base for Balaji Prime Media (BPM)
const BPM_KNOWLEDGE = `
You are the official 24/7 AI Voice & Chat Concierge for Balaji Prime Media (BPM).
Balaji Prime Media is a premium Global SEO & Digital Growth Agency serving US, UK, Australia, EU & Worldwide enterprise clients.

CORE SERVICES:
1. Editorial Guest Posting & Link Building:
   - Access to 40,000+ verified websites with DR 50 to DR 90+ (including Forbes, TechCrunch, Entrepreneur, HubSpot, Decrypt, Yahoo Finance).
   - 100% manual outreach, zero PBNs, zero spam networks, permanent contextual dofollow backlinks with fast indexation.
   - Niche coverage: SaaS, FinTech, Crypto/Web3, E-commerce, Health, AI/Tech, Legal, Real Estate, and more.
2. Technical SEO & Core Web Vitals Engineering:
   - Ultra-fast Next.js architecture, sub-second TTFB, 99/100 Google PageSpeed scores, zero CLS.
3. Content Marketing & Organic Revenue Scaling:
   - High-intent commercial query targeting, SERP rank #1 strategies.
4. Direct Leadership Strategy Consultation:
   - 1-on-1 calls with agency leadership to review domain metrics, competitors, and growth roadmap.

DIRECT CONTACT & LINKS:
- Direct WhatsApp & Phone: +91 76908 68932 (available 24/7 for UK/US/AU/EU hours)
- Official Email: support@balajiprimemedia.in
- Free Instant SEO Audit Tool: /audit
- 40,000+ Guest Posting Marketplace: /guest-posting
- Book Strategy Meeting: /schedule-meeting

YOUR PERSONALITY & TONE:
- Sophisticated, professional, highly polite, welcoming to UK, US, and international business leaders.
- Keep answers concise, clear, and direct (2 to 4 sentences ideal for voice talking).
- Always offer helpful next steps (e.g. sharing our DR 50+ list, running a free audit, or connecting with our team).
- If the user provides their name, email, website, or phone, acknowledge warmly and note that our senior strategist will follow up immediately.
`;

function generateDynamicResponse(userMessage: string, history: Array<{ role: string; content: string }>) {
  const query = userMessage.toLowerCase().trim();

  // 1. Pricing / Cost inquiries
  if (query.includes("price") || query.includes("cost") || query.includes("how much") || query.includes("rate") || query.includes("package") || query.includes("budget")) {
    return {
      reply: "Our guest posting placements on genuine DR 50–90+ publications range from boutique packages starting around $300 to comprehensive enterprise organic growth campaigns. We tailor every bundle to your niche and target keywords. Would you like me to share our live inventory, or shall we arrange a custom proposal for your domain?",
      suggestedPrompts: [
        "View Guest Posting Database",
        "Book a Strategy Meeting",
        "Free SEO Audit"
      ]
    };
  }

  // 2. UK / US / Global Services
  if (query.includes("uk") || query.includes("united kingdom") || query.includes("london") || query.includes("us") || query.includes("worldwide") || query.includes("australia") || query.includes("international")) {
    return {
      reply: "We actively serve prominent clients across the UK (London, Manchester), the US, Australia, and Europe. All outreach is conducted directly with high-authority regional and global editorial publications, ensuring full compliance with Google search guidelines. What industry or region are you targeting?",
      suggestedPrompts: [
        "SaaS & Tech Placements",
        "FinTech & Business Outlets",
        "Talk to Human Strategist"
      ]
    };
  }

  // 3. Guest Posting & Backlinks
  if (query.includes("guest post") || query.includes("backlink") || query.includes("dr ") || query.includes("domain rating") || query.includes("outreach") || query.includes("link building") || query.includes("da ")) {
    return {
      reply: "Balaji Prime Media provides manual outreach access to 40,000+ indexed sites ranging from DR 50 to DR 92+. Every placement includes permanent contextual dofollow links, editorial content review, and zero private blog networks (PBNs). Would you like to explore our real-time database or request a sample list?",
      suggestedPrompts: [
        "Explore 40,000+ Database",
        "What DR tiers are available?",
        "How fast are links published?"
      ]
    };
  }

  // 4. Free SEO Audit / Speed / Next.js
  if (query.includes("audit") || query.includes("speed") || query.includes("core web vitals") || query.includes("next.js") || query.includes("ranking") || query.includes("traffic")) {
    return {
      reply: "We offer an instant, complimentary AI Website Audit that analyzes your Core Web Vitals, organic search visibility, and backlink profile in under 10 seconds. You can run it directly on our /audit page, or share your website domain here and our engineers will inspect it for you.",
      suggestedPrompts: [
        "Run Free Website Audit",
        "Audit my domain now",
        "Schedule Leadership Call"
      ]
    };
  }

  // 5. Booking a meeting / Talk with human / Leadership
  if (query.includes("meeting") || query.includes("call") || query.includes("talk") || query.includes("schedule") || query.includes("founder") || query.includes("consultation") || query.includes("human")) {
    return {
      reply: "You can schedule a direct 1-on-1 strategy consultation with Balaji Prime Media leadership on our /schedule-meeting page, or message us immediately on WhatsApp at +91 76908 68932. What day or time zone works best for you?",
      suggestedPrompts: [
        "Open Meeting Scheduler",
        "Chat on WhatsApp",
        "Send Quick Email"
      ]
    };
  }

  // 6. Contact / Email / WhatsApp details
  if (query.includes("contact") || query.includes("email") || query.includes("whatsapp") || query.includes("phone") || query.includes("support")) {
    return {
      reply: "You can reach Balaji Prime Media instantly via WhatsApp or phone at +91 76908 68932, or email our advisory team at support@balajiprimemedia.in. We operate across UK, US, and APAC business hours.",
      suggestedPrompts: [
        "Chat on WhatsApp (+91 76908 68932)",
        "Email support@balajiprimemedia.in",
        "Book a Zoom Call"
      ]
    };
  }

  // 7. Greetings
  if (query.match(/^(hi|hello|hey|good morning|good afternoon|good evening|namaste|hola|hallo)/i)) {
    return {
      reply: "Hello! Welcome to Balaji Prime Media. I am your 24/7 AI Concierge. We assist UK, US, and global brands in scaling organic search traffic with manual DR 50–90+ editorial outreach and technical web engineering. How may I assist your business today?",
      suggestedPrompts: [
        "What services do you offer?",
        "Explore Guest Posting Database",
        "Free Website Audit",
        "Pricing & Packages"
      ]
    };
  }

  // 8. Lead detail provided (email / phone / domain)
  const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(userMessage);
  const hasPhone = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4,}/.test(userMessage);
  if (hasEmail || hasPhone) {
    return {
      reply: "Thank you for sharing your contact details! I have securely recorded your inquiry. A senior growth strategist from Balaji Prime Media will review your requirements and reach out within 2 hours. What is your website domain so we can prepare an initial audit?",
      suggestedPrompts: [
        "Schedule a Meeting Now",
        "Chat on WhatsApp Immediately"
      ],
      leadCaptured: true
    };
  }

  // Default consultative response
  return {
    reply: "Balaji Prime Media specializes in manual DR 50–90+ editorial guest posting, technical SEO, and conversion-focused web engineering for international enterprises. Would you like a custom proposal, a free website audit, or to discuss your growth strategy directly with our leadership team?",
    suggestedPrompts: [
      "Guest Posting on DR 50–90+ sites",
      "Free Website Audit",
      "Pricing & Packages",
      "Schedule Strategy Meeting"
    ]
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message = sanitizeInput(body.message || "").trim();
    const history = Array.isArray(body.history) ? body.history : [];

    if (!message) {
      return NextResponse.json(
        { success: false, error: "Message content is required" },
        { status: 400 }
      );
    }

    // Optional Gemini API key integration if configured
    const geminiKey = process.env.GEMINI_API_KEY;
    if (geminiKey) {
      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [{ text: `${BPM_KNOWLEDGE}\n\nClient inquiry: "${message}"` }],
                },
              ],
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 250,
              },
            }),
          }
        );
        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const generatedText =
            geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (generatedText) {
            return NextResponse.json({
              success: true,
              reply: generatedText.trim(),
              suggestedPrompts: [
                "Explore 40,000+ Guest Posting Sites",
                "Free Website Audit",
                "Schedule a Call with Leadership",
              ],
            });
          }
        }
      } catch (geminiErr) {
        console.warn("Gemini API fallback to Heuristic Engine:", geminiErr);
      }
    }

    // Reliable Dynamic Conversational Heuristic AI Engine
    const response = generateDynamicResponse(message, history);

    return NextResponse.json({
      success: true,
      ...response,
    });
  } catch (error) {
    console.error("AI Chat Route Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process AI response",
        reply:
          "I am ready to help you with our DR 50–90+ guest posting network and SEO growth strategy. Please reach us directly at support@balajiprimemedia.in or WhatsApp +91 76908 68932.",
      },
      { status: 500 }
    );
  }
}
