import { NextRequest, NextResponse } from "next/server";
import { sanitizeInput } from "@/lib/security";

interface ChatHistoryItem {
  role: string;
  content: string;
}

// Check if user input is predominantly Hindi or Hinglish
function isHindiOrHinglish(text: string): boolean {
  // Check for Devanagari script
  if (/[\u0900-\u097F]/.test(text)) return true;

  // Check common Hindi / Hinglish keywords
  const hinglishTokens = [
    "kya", "kaise", "kitna", "kitne", "kitni", "batao", "bataiye", "bata",
    "chahiye", "hai", "ho", "hun", "hain", "karna", "kare", "karein", "karo",
    "bolo", "bol", "suno", "sun", "sunao", "namaste", "shukriya", "dhanyawad",
    "acha", "achha", "theek", "thik", "ha", "haan", "nahi", "matlab",
    "kaun", "kaha", "kahan", "kab", "kyu", "kyun", "paisa", "paise", "rupaye",
    "kharcha", "madad", "baat", "bhejo", "dekhna", "milega", "dost", "bhai",
    "yaar", "sir", "maam", "aap", "tum", "mera", "meri", "mere", "hamara",
    "kaam", "chal", "raha", "rahi", "bolo", "boliye", "kuch"
  ];

  const words = text.toLowerCase().split(/\s+/);
  return words.some((w) => hinglishTokens.includes(w));
}

// Conversational AI Engine for Balaji Prime Media
function generateDynamicResponse(userMessage: string, _history: ChatHistoryItem[]) {
  const query = userMessage.toLowerCase().trim();
  const isHindi = isHindiOrHinglish(query);

  // 1. Lead detail provided (email / phone)
  const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(userMessage);
  const hasPhone = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4,}/.test(userMessage);
  if (hasEmail || hasPhone) {
    if (isHindi) {
      return {
        reply: "Bahut shukriya! Maine aapki details save kar li hain. Balaji Prime Media ki senior SEO team aapse 2 ghante ke andar connect karegi. Aap chahein to WhatsApp (+91 76908 68932) par bhi turant message kar sakte hain.",
        suggestedPrompts: [
          "WhatsApp par baat karein (+91 76908 68932)",
          "Free SEO Audit karein",
          "Guest Posting Database dekhein"
        ],
        leadCaptured: true
      };
    }
    return {
      reply: "Thank you for sharing your contact details! I have securely recorded your inquiry. A senior growth strategist from Balaji Prime Media will review your requirements and reach out shortly. What is your website domain so we can prepare an initial audit?",
      suggestedPrompts: [
        "Schedule a Meeting Now",
        "Chat on WhatsApp Immediately"
      ],
      leadCaptured: true
    };
  }

  // 2. Testing speech / "Suno" / "Bolo" / "Can you hear me" / "Aawaz aa rahi hai"
  if (
    query.match(/\b(suno|sun rahe|sun rahi|awaz|aawaz|bol|bolo|boliye|can you hear|hear me|testing|test|are you there)\b/i)
  ) {
    if (isHindi) {
      return {
        reply: "Haan ji, main bilkul sun raha hoon! Kahiye, Balaji Prime Media aur hamare DR 50-90+ Guest Posting ya SEO services ke baare me aap kya jaan-na chahte hain?",
        suggestedPrompts: [
          "Aap kya services dete ho?",
          "Guest Posting pricing kya hai?",
          "WhatsApp par baat karni hai"
        ]
      };
    }
    return {
      reply: "Yes, I can hear you clearly! I am your Balaji Prime Media AI Concierge. How can I assist you with your digital growth or guest posting outreach today?",
      suggestedPrompts: [
        "Explore 40,000+ Guest Posting Sites",
        "What are your packages & pricing?",
        "Book a Strategy Meeting"
      ]
    };
  }

  // 3. Who are you / Identity / Tum kaun ho / Kya naam hai
  if (
    query.match(/\b(who are you|what is your name|who r u|tum kaun ho|aap kaun ho|kaun ho|kya naam hai|naam kya hai|kya ho tum)\b/i)
  ) {
    if (isHindi) {
      return {
        reply: "Main Balaji Prime Media ka official 24/7 AI Voice Concierge hoon. Balaji Prime Media ek global SEO aur digital growth agency hai jo UK, US aur worldwide businesses ko 40,000+ verified DR 50-90+ websites par guest posting aur technical web development provide karti hai.",
        suggestedPrompts: [
          "Aapki services kya kya hain?",
          "Guest posting ke rates batao",
          "Founder se meeting book karein"
        ]
      };
    }
    return {
      reply: "I am the official 24/7 AI Concierge for Balaji Prime Media. We are a global digital growth agency specializing in manual DR 50–90+ editorial outreach across 40,000+ indexed publications, Core Web Vitals engineering, and organic revenue scaling.",
      suggestedPrompts: [
        "What services do you provide?",
        "Explore Guest Posting Database",
        "Book Strategy Consultation"
      ]
    };
  }

  // 4. Greetings / Namaste / Hi / Hello / Kaise ho
  if (
    query.match(/^(hi|hello|hey|greetings|good morning|good afternoon|good evening|namaste|pranam|kaisa|kaise ho|kya haal)/i)
  ) {
    if (isHindi) {
      return {
        reply: "Namaste! Main bahut badhiya hoon, aap bataiye kaise hain? Balaji Prime Media me aapka swagat hai. Aaj main aapki website ranking, guest posting ya web development me kya madad kar sakta hoon?",
        suggestedPrompts: [
          "Guest Posting packages dekhna hai",
          "Website ka Free SEO Audit chahiye",
          "Services ki detail batao"
        ]
      };
    }
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

  // 5. What do you do / Services / Kya karte ho / Kaam kya hai
  if (
    query.match(/\b(services|service|kya karte ho|kya service|kya kaam|kaam kya|what do you do|what services|offerings)\b/i)
  ) {
    if (isHindi) {
      return {
        reply: "Hum 3 main services offer karte hain: 1) 40,000+ verified high-authority sites par genuine DR 50 se 90+ Guest Posting aur dofollow backlinks, 2) Technical SEO aur Google PageSpeed/Core Web Vitals optimization, aur 3) Superfast Next.js Website Development. Aapko kisme interest hai?",
        suggestedPrompts: [
          "Guest Posting details batao",
          "Website Speed & SEO Audit",
          "Direct WhatsApp par connect karein"
        ]
      };
    }
    return {
      reply: "We deliver 3 core solutions: 1) Manual Editorial Guest Posting across 40,000+ DR 50–90+ publications (Forbes, TechCrunch, etc.), 2) Technical SEO & Core Web Vitals optimization, and 3) Custom high-speed Next.js web development. Which service fits your current roadmap?",
      suggestedPrompts: [
        "Explore Guest Posting Database",
        "Run Free Website Audit",
        "Schedule Leadership Call"
      ]
    };
  }

  // 6. Pricing / Cost / Rates / Kitna paisa / Kitna charge
  if (
    query.match(/\b(price|pricing|cost|rate|rates|charge|charges|package|packages|budget|how much|kitna paisa|kitne paise|kitna charge|kharcha|fees)\b/i)
  ) {
    if (isHindi) {
      return {
        reply: "Humare guest post packages genuine DR 50-60 publications ke liye around $30-$50 se start hote hain, aur enterprise DR 70-90+ sites requirements ke hisaab se customized hain. Aapke specific niche aur domain ke liye best custom quote lene ke liye WhatsApp (+91 76908 68932) par message karein.",
        suggestedPrompts: [
          "WhatsApp par instant quote lein",
          "Guest Posting Marketplace dekhein",
          "Schedule Meeting"
        ]
      };
    }
    return {
      reply: "Our guest posting placements on genuine DR 50–90+ publications range from boutique packages starting around $30–$50 to comprehensive enterprise organic growth campaigns. We tailor every bundle to your niche and target keywords. Would you like a custom proposal for your domain?",
      suggestedPrompts: [
        "View Guest Posting Database",
        "Book a Strategy Meeting",
        "Free SEO Audit"
      ]
    };
  }

  // 7. Guest Posting & Backlinks & DR
  if (
    query.match(/\b(guest post|guest posting|backlink|backlinks|dr |dr50|dr70|dr90|da |domain rating|outreach|link building|dofollow|pbn)\b/i)
  ) {
    if (isHindi) {
      return {
        reply: "Balaji Prime Media ke paas 40,000+ verified sites ka direct inventory hai jisme DR 50 se lekar DR 92+ tak real publications shamil hain. Sabhi links 100% manual outreach se permanent contextual dofollow hote hain—zero PBNs aur zero spam! Aap website par /guest-posting page par pura database filter karke dekh sakte hain.",
        suggestedPrompts: [
          "40,000+ Database dekhein",
          "Sample sites ki list bhejo",
          "WhatsApp par direct list mangein"
        ]
      };
    }
    return {
      reply: "Balaji Prime Media provides manual outreach access to 40,000+ indexed sites ranging from DR 50 to DR 92+. Every placement includes permanent contextual dofollow links, editorial content review, and zero private blog networks (PBNs). Would you like to explore our real-time database or request a sample list?",
      suggestedPrompts: [
        "Explore 40,000+ Database",
        "What DR tiers are available?",
        "How fast are links published?"
      ]
    };
  }

  // 8. SEO Audit / Speed / Core Web Vitals
  if (
    query.match(/\b(audit|speed|core web vitals|next\.js|ranking|traffic|google rank|slow website|seo report)\b/i)
  ) {
    if (isHindi) {
      return {
        reply: "Humari website ke /audit page par aap sirf 10 seconds me apni website ka Free Instant SEO Audit kar sakte hain. Isme aapko PageSpeed, Core Web Vitals, organic ranking issues aur backlinks ka complete analysis turant mil jayega.",
        suggestedPrompts: [
          "Free Website Audit karein (/audit)",
          "Mere domain ka analysis chahiye",
          "WhatsApp par SEO audit mangein"
        ]
      };
    }
    return {
      reply: "We offer an instant, complimentary AI Website Audit that analyzes your Core Web Vitals, organic search visibility, and backlink profile in under 10 seconds. You can run it directly on our /audit page, or share your website domain here.",
      suggestedPrompts: [
        "Run Free Website Audit",
        "Audit my domain now",
        "Schedule Leadership Call"
      ]
    };
  }

  // 9. Meeting / Talk with Founder / Human / Call
  if (
    query.match(/\b(meeting|call|talk|schedule|founder|consultation|human|baat karni|phone par baat|zoom|google meet)\b/i)
  ) {
    if (isHindi) {
      return {
        reply: "Aap Balaji Prime Media ke senior leadership ke sath direct 1-on-1 strategy call hamare /schedule-meeting page par book kar sakte hain, ya turant WhatsApp (+91 76908 68932) par call/chat kar sakte hain. Aap kaunsa time prefer karenge?",
        suggestedPrompts: [
          "Meeting Book Karein (/schedule-meeting)",
          "WhatsApp par call karein",
          "Direct Email bhejein"
        ]
      };
    }
    return {
      reply: "You can schedule a direct 1-on-1 strategy consultation with Balaji Prime Media leadership on our /schedule-meeting page, or message us immediately on WhatsApp at +91 76908 68932. What day or time zone works best for you?",
      suggestedPrompts: [
        "Open Meeting Scheduler",
        "Chat on WhatsApp",
        "Send Quick Email"
      ]
    };
  }

  // 10. Contact / Phone / Email / WhatsApp
  if (
    query.match(/\b(contact|email|whatsapp|phone|number|mobile|support|sampark|kaha baat)\b/i)
  ) {
    if (isHindi) {
      return {
        reply: "Aap humse 24/7 in channels par contact kar sakte hain:\n• WhatsApp / Call: +91 76908 68932\n• Email: support@balajiprimemedia.in\n• Office: Jaipur, Rajasthan (Serving UK, US & Worldwide clients).",
        suggestedPrompts: [
          "WhatsApp par chat karein",
          "Email support@balajiprimemedia.in",
          "Meeting schedule karein"
        ]
      };
    }
    return {
      reply: "You can reach Balaji Prime Media instantly via WhatsApp or phone at +91 76908 68932, or email our advisory team at support@balajiprimemedia.in. We operate across UK, US, and APAC business hours.",
      suggestedPrompts: [
        "Chat on WhatsApp (+91 76908 68932)",
        "Email support@balajiprimemedia.in",
        "Book a Zoom Call"
      ]
    };
  }

  // 11. Payment methods / Payment gateway
  if (
    query.match(/\b(pay|payment|paypal|stripe|wise|wire transfer|upi|invoice|bank transfer)\b/i)
  ) {
    if (isHindi) {
      return {
        reply: "Hum international aur Indian sabhi payment options support karte hain: Stripe, PayPal, Wise, Direct Wire Transfer, aur UPI. Invoicing USD, GBP, EUR aur INR sabhi me available hai. Aap hamare /pay page par jaakar direct secure payment kar sakte hain.",
        suggestedPrompts: [
          "Payment page dekhein (/pay)",
          "PayPal / Wise details mangein",
          "WhatsApp par invoice mangein"
        ]
      };
    }
    return {
      reply: "We support secure global payments via Stripe, PayPal, Wise, Direct Wire Transfer, and UPI with multi-currency invoicing in USD, GBP, EUR, and INR. You can also visit our dedicated /pay page for immediate checkout.",
      suggestedPrompts: [
        "Visit /pay Page",
        "Request Wise / Wire Details",
        "Connect on WhatsApp"
      ]
    };
  }

  // 12. UK / US / International / Worldwide inquiries
  if (
    query.match(/\b(uk|united kingdom|london|us|usa|america|worldwide|australia|international|foreign|abroad)\b/i)
  ) {
    if (isHindi) {
      return {
        reply: "Haan ji! Hamare bohot saare enterprise clients United Kingdom (London, Manchester), USA aur Europe se hain. Hum international time zones me 24/7 kaam karte hain aur pure worldwide publications par outreach deliver karte hain.",
        suggestedPrompts: [
          "UK Publications list dekhein",
          "US High DR sites dekhein",
          "WhatsApp par discuss karein"
        ]
      };
    }
    return {
      reply: "We actively serve prominent clients across the UK (London, Manchester), the US, Australia, and Europe. All outreach is conducted directly with high-authority regional and global editorial publications. What industry or region are you targeting?",
      suggestedPrompts: [
        "SaaS & Tech Placements",
        "FinTech & Business Outlets",
        "Talk to Human Strategist"
      ]
    };
  }

  // 13. Guarantees / Safety / Google Updates / Indexing
  if (
    query.match(/\b(guarantee|safe|safety|google update|penalty|index|indexing|time|kitna time|duration)\b/i)
  ) {
    if (isHindi) {
      return {
        reply: "Hamare sabhi guest posts 100% white-hat aur manual outreach hote hain, isliye yeh Google algorithm updates aur penalties se bilkul safe hain. Articles 24 se 72 ghante ke andar publish ho jate hain aur fast indexing guarantee rehti hai.",
        suggestedPrompts: [
          "Case Studies dekhein",
          "Live Placements ke sample dekhein",
          "Senior Strategist se baat karein"
        ]
      };
    }
    return {
      reply: "All Balaji Prime Media link building is 100% white-hat editorial outreach, keeping your domain safe through all Google core algorithm updates. Placements are typically published within 24–72 hours with permanent dofollow tags and verified Google indexing.",
      suggestedPrompts: [
        "View Case Studies",
        "Sample Live Placements",
        "Speak with Growth Strategist"
      ]
    };
  }

  // 14. Conversational / Polite Acknowledgement
  if (query.match(/\b(ok|okay|theek hai|thik hai|shukriya|thanks|thank you|good|nice|badhiya|wah|great)\b/i)) {
    if (isHindi) {
      return {
        reply: "Bahut shukriya! Agar aapko guest posting, website audit ya custom package ke bare me koi bhi aur jankari chahiye, to main hamesha yahan hoon. Aap chahein to WhatsApp (+91 76908 68932) par bhi hume reach kar sakte hain.",
        suggestedPrompts: [
          "Guest Posting Database dekhein",
          "Free SEO Audit karein",
          "Meeting schedule karein"
        ]
      };
    }
    return {
      reply: "You're very welcome! If you need any assistance regarding guest posting lists, our free instant SEO audit, or custom growth plans, I'm always here to help.",
      suggestedPrompts: [
        "Explore 40,000+ Publications",
        "Run Free Website Audit",
        "Chat on WhatsApp"
      ]
    };
  }

  // 15. Intelligent contextual fallback (Never repeats the exact same sentence mindlessly)
  if (isHindi) {
    return {
      reply: `Main aapki baat samajh gaya. Aapne "${userMessage}" ke baare me pucha hai. Balaji Prime Media aapko 40,000+ High DR 50-90+ Guest Posting sites, Complete Technical SEO aur Fast Website Development provide karta hai. Kya aap hamari site list dekhna chahte hain ya WhatsApp (+91 76908 68932) par direct discuss karna pasand karenge?`,
      suggestedPrompts: [
        "Guest Posting list dekhein",
        "Pricing & Packages batao",
        "WhatsApp (+91 76908 68932) par connect karein",
        "Free SEO Audit karein"
      ]
    };
  }

  return {
    reply: `Regarding "${userMessage}": Balaji Prime Media specializes in manual DR 50–90+ editorial outreach across 40,000+ publications, high-performance SEO, and conversion-focused web engineering for worldwide businesses. Would you like to view our live publication list or speak directly with our senior team?`,
    suggestedPrompts: [
      "Explore 40,000+ Guest Posting Sites",
      "Free Website Audit",
      "Pricing & Packages",
      "Chat on WhatsApp (+91 76908 68932)"
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

    // Check optional Gemini API Key if user configured it
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
                  parts: [
                    {
                      text: `You are the official 24/7 AI Voice Concierge for Balaji Prime Media (BPM), a global digital growth and SEO agency serving UK, US, and worldwide clients.
Core offerings: 40,000+ verified DR 50-90+ editorial guest posting, Next.js technical SEO, Core Web Vitals optimization.
Contact: WhatsApp +91 76908 68932, Email: support@balajiprimemedia.in.
Instructions:
- If user speaks or asks in Hindi or Hinglish, answer warmly in natural Hinglish!
- If user asks in English, answer in polite UK/US English.
- Keep reply to 2-3 concise conversational sentences suitable for voice synthesis.
- Never repeat canned boilerplate; directly answer the user's question.

User query: "${message}"`
                    }
                  ],
                },
              ],
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 200,
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
        console.warn("Gemini API fallback to Local AI Engine:", geminiErr);
      }
    }

    // High-performance intelligent bilingual conversational engine
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
          "Main Balaji Prime Media ka AI Voice Concierge hoon. Hamari team 24/7 uplabdh hai. Aap direct WhatsApp (+91 76908 68932) ya email (support@balajiprimemedia.in) par connect kar sakte hain.",
      },
      { status: 500 }
    );
  }
}
