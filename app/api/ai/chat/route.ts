import { NextRequest, NextResponse } from "next/server";
import { sanitizeInput } from "@/lib/security";

interface ChatHistoryItem {
  role: string;
  content: string;
}

// Check if user input is in Hindi or Hinglish
function isHindiOrHinglish(text: string): boolean {
  if (/[\u0900-\u097F]/.test(text)) return true;

  const hinglishTokens = [
    "kya", "kaise", "kitna", "kitne", "kitni", "batao", "bataiye", "bata",
    "chahiye", "hai", "ho", "hun", "hain", "karna", "kare", "karein", "karo",
    "bolo", "bol", "suno", "sun", "sunao", "namaste", "shukriya", "dhanyawad",
    "acha", "achha", "theek", "thik", "ha", "haan", "nahi", "matlab",
    "kaun", "kaha", "kahan", "kab", "kyu", "kyun", "paisa", "paise", "rupaye",
    "kharcha", "madad", "baat", "bhejo", "dekhna", "milega", "dost", "bhai",
    "yaar", "sir", "maam", "aap", "tum", "mera", "meri", "mere", "hamara",
    "kaam", "chal", "raha", "rahi", "kuch", "dikhao", "dikha", "dikhayein", "ka"
  ];

  const words = text.toLowerCase().split(/\s+/);
  return words.some((w) => hinglishTokens.includes(w));
}

// Intelligent, Specialized Context Engine for Balaji Prime Media
function generateDynamicResponse(userMessage: string, _history: ChatHistoryItem[]) {
  const query = userMessage.toLowerCase().trim();
  const isHindi = isHindiOrHinglish(query);

  // 1. Contact / Lead Info Provided (Email or Phone Number)
  const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(userMessage);
  const hasPhone = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4,}/.test(userMessage);
  if (hasEmail || hasPhone) {
    if (isHindi) {
      return {
        reply: "Bahut shukriya! Maine aapki contact details save kar li hain. Balaji Prime Media ki senior team 2 ghante ke andar aapse sampark karegi. Aap chahein to turant WhatsApp (+91 76908 68932) par bhi message bhej sakte hain.",
        suggestedPrompts: [
          "WhatsApp (+91 76908 68932) par chat karein",
          "Services & Pricing dekhein",
          "Free Website Audit karein"
        ],
        leadCaptured: true
      };
    }
    return {
      reply: "Thank you for sharing your contact details! I have securely recorded your inquiry. A senior growth strategist from Balaji Prime Media will review your requirements and reach out within 2 hours. What is your website domain or project scope?",
      suggestedPrompts: [
        "Chat on WhatsApp Immediately",
        "Explore Services & Pricing",
        "Schedule Strategy Meeting"
      ],
      leadCaptured: true
    };
  }

  // 2. Testing speech / "Suno" / "Bolo" / "Can you hear me"
  if (
    query.match(/\b(suno|sun rahe|sun rahi|awaz|aawaz|bol|bolo|boliye|can you hear|hear me|testing|test)\b/i)
  ) {
    if (isHindi) {
      return {
        reply: "Haan ji, main bilkul sun raha hoon! Kahiye, Balaji Prime Media ki services (SEO, Website Development, Content, ya Digital Marketing) me aapko kis cheez me madad chahiye?",
        suggestedPrompts: [
          "Website Development ke baare me batao",
          "SEO Optimization packages",
          "Pricing & Rates batao"
        ]
      };
    }
    return {
      reply: "Yes, I can hear you loud and clear! I'm your Balaji Prime Media AI Concierge. How can I assist you with your web development, SEO, or digital marketing project?",
      suggestedPrompts: [
        "Website Development Services",
        "SEO Optimization Programs",
        "Pricing & Packages"
      ]
    };
  }

  // 3. Free SEO / Website Speed Audit
  if (
    query.match(/\b(audit|speed audit|speed test|free audit|check website|analyze website|pagespeed)\b/i)
  ) {
    if (isHindi) {
      return {
        reply: "Aap hamari website ke /audit page par jakar apni website ka Free AI Instant SEO & Speed Audit sirf 10 seconds me kar sakte hain. Isme Google PageSpeed, Core Web Vitals aur search ranking issues ka complete detailed score milta hai.",
        suggestedPrompts: [
          "Free AI Website Audit karein (/audit)",
          "Mera domain check karo",
          "WhatsApp par audit report mangein"
        ]
      };
    }
    return {
      reply: "You can run a complimentary AI-powered SEO and Speed Audit on our /audit page in under 10 seconds. It evaluates your Core Web Vitals, mobile responsiveness, and technical ranking health.",
      suggestedPrompts: [
        "Run Free Website Audit (/audit)",
        "Schedule Leadership Call",
        "Chat with SEO Engineer"
      ]
    };
  }

  // 4. Website Maintenance, Security & Bug Fixes (Check BEFORE generic "website")
  if (
    query.match(/\b(maintenance|security|bug|bugs|fix|fixing|updates|slow website|hacked|backup|sla|monthly maintenance|support plan)\b/i)
  ) {
    if (isHindi) {
      return {
        reply: "Hum 24/7 website maintenance, security updates, daily backups, speed monitoring aur urgent bug fixes provide karte hain taaki aapki website hamesha 100% live aur safe rahe. Maintenance retainer $149 (₹9,999/month) se shuru hota hai.",
        suggestedPrompts: [
          "Maintenance Retainer ($149/mo)",
          "Website Speed & Security Audit",
          "WhatsApp par urgent support lein"
        ]
      };
    }
    return {
      reply: "Our Website Maintenance & Security SLA includes 24/7 uptime monitoring, security patches, performance optimization, daily backups, and prompt bug fixes. Monthly support retainers start at $149 (₹9,999/month).",
      suggestedPrompts: [
        "Website Support Pricing ($149/mo)",
        "Request Emergency Bug Fix",
        "Contact Support Team"
      ]
    };
  }

  // 5. Content Writing / Copywriting / Blogs / Articles
  if (
    query.match(/\b(content|writing|article|articles|blog|blogs|copywriting|writer|editorial|scripts|sales copy)\b/i)
  ) {
    if (isHindi) {
      return {
        reply: "Hum high-converting SEO articles, blog posts aur website sales copy likhte hain jo search engines aur real readers dono ke liye optimized hoti hain. Content writing packages $119 (₹7,999) se shuru hote hain. Aapko kis topic ya industry ke liye content chahiye?",
        suggestedPrompts: [
          "Content Writing Pricing ($119)",
          "SEO Blog Strategy samjhein",
          "Samples dekhein",
          "WhatsApp par topic discuss karein"
        ]
      };
    }
    return {
      reply: "We craft authoritative, high-converting SEO content, thought leadership blogs, and commercial sales copy designed to capture top Google rankings and engage buyers. Content packages start at $119 (₹7,999). What niche or industry is your project in?",
      suggestedPrompts: [
        "Content Writing Pricing ($119)",
        "Review Content Samples",
        "Discuss Scope on WhatsApp"
      ]
    };
  }

  // 6. Email Marketing & Revenue Automation
  if (
    query.match(/\b(email marketing|automation|drip|newsletter|crm|klaviyo|mailchimp|leads nurturing)\b/i)
  ) {
    if (isHindi) {
      return {
        reply: "Hamari Email Marketing service me automated welcome drips, customer retention flows, newsletter campaigns aur CRM integration shamil hain jo leads ko paying customers me badalti hain. Packages $269 (₹18,999) se shuru hote hain.",
        suggestedPrompts: [
          "Email Automation Pricing ($269)",
          "Flows & Campaigns Strategy",
          "WhatsApp par baat karein"
        ]
      };
    }
    return {
      reply: "We design automated email sequences, retention drip campaigns, and CRM workflows that turn dormant leads into paying customers. Email marketing automation packages start at $269 (₹18,999). What platform do you currently use for email?",
      suggestedPrompts: [
        "Email Marketing Pricing ($269)",
        "Automation Architecture",
        "Book a Strategy Consultation"
      ]
    };
  }

  // 7. Guest Posting & Backlinks (ONLY when explicitly requested!)
  if (
    query.match(/\b(guest post|guest posting|backlink|backlinks|link building|dofollow|da |dr |domain rating|outreach|pbn)\b/i)
  ) {
    if (isHindi) {
      return {
        reply: "Hum genuine high-authority websites (DR 50 se DR 90+) par 100% manual outreach se permanent contextual dofollow guest posts provide karte hain—zero PBNs aur zero spam networks. Pricing vetted sites ke mutabiq $30 se shuru hoti hai. Aap hamare /guest-posting page par real-time database dekh sakte hain.",
        suggestedPrompts: [
          "Guest Posting Database dekhein (/guest-posting)",
          "DR 50–90+ Pricing & Tiers",
          "WhatsApp par sample list mangein"
        ]
      };
    }
    return {
      reply: "We provide genuine manual editorial guest posting across vetted DR 50 to DR 90+ publications with permanent contextual dofollow links, full editorial review, and zero private blog networks. Placements start from $30 depending on authority and niche. You can inspect our database at /guest-posting.",
      suggestedPrompts: [
        "Explore Guest Posting Database",
        "What DR tiers are available?",
        "Request Verified Site List"
      ]
    };
  }

  // 8. Projects / Case Studies / Portfolio / Past Work
  if (
    query.match(/\b(project|projects|portfolio|case study|case studies|samples|previous work|kaam dikhao)\b/i)
  ) {
    if (isHindi) {
      return {
        reply: "Humne E-Commerce brands, SaaS platforms, Fitness apps aur Tech startups ke liye high-performing websites aur SEO campaigns deliver kiye hain. Aap hamari website ke /projects ya /work page par jaakar complete case studies aur results dekh sakte hain.",
        suggestedPrompts: [
          "Projects & Case Studies dekhein (/projects)",
          "Work Portfolio dekhein (/work)",
          "WhatsApp par direct demo dekhein"
        ]
      };
    }
    return {
      reply: "We have delivered high-converting Next.js architectures and 3x organic traffic campaigns for e-commerce, SaaS, fashion, and technology brands. You can explore our verified case studies on our /projects and /work pages.",
      suggestedPrompts: [
        "View Recent Case Studies (/projects)",
        "Explore Work Portfolio (/work)",
        "Schedule Strategy Consultation"
      ]
    };
  }

  // 9. Website Development / Next.js / Web Design / App
  if (
    query.match(/\b(website|web dev|web development|next\.js|nextjs|react|frontend|backend|coding|redesign|landing page|e-commerce|ecommerce|shopify|wordpress|app development|ui\/ux|design)\b/i)
  ) {
    if (isHindi) {
      return {
        reply: "Hum modern, ultra-fast Next.js aur React websites banate hain jinka Google PageSpeed score 95+ aur loading time sub-second hota hai. Hamare packages custom responsive design, SEO-friendly architecture aur CMS ke sath $699 (₹49,999) se shuru hote hain. Aapko kis tarah ki website banwani hai?",
        suggestedPrompts: [
          "Website Development Pricing ($699)",
          "Next.js vs WordPress me kya fark hai?",
          "Live Projects & Portfolio dekhein",
          "WhatsApp par website discuss karein"
        ]
      };
    }
    return {
      reply: "We build ultra-fast, conversion-optimized Next.js and React web applications with 99+ Google PageSpeed scores, sub-second TTFB, and bespoke responsive UI/UX. Our full-stack web development packages start at $699 (₹49,999). What type of website or platform are you planning to build?",
      suggestedPrompts: [
        "Website Development Details ($699)",
        "View Past Projects & Work",
        "Free Website Speed Audit",
        "Discuss on WhatsApp (+91 76908 68932)"
      ]
    };
  }

  // 10. Search Engine Optimization (SEO) / Google Ranking / Keywords / Traffic
  if (
    query.match(/\b(seo|search engine|ranking|rank|keywords|traffic|organic traffic|serp|google rank|on-page|technical seo|indexing|google search console|search visibility)\b/i)
  ) {
    if (isHindi) {
      return {
        reply: "Hamari Comprehensive SEO service me Full Technical Crawl Audit, commercial keyword research, on-page optimization, Core Web Vitals remediation aur transparent monthly ranking reports shamil hain. Hamara ongoing monthly SEO retainer $449 (₹29,999/month) se shuru hota hai. Aapki website ka link kya hai?",
        suggestedPrompts: [
          "Monthly SEO Retainer ($449/mo)",
          "Free AI SEO Audit karein (/audit)",
          "Keywords research kaise hoti hai?",
          "WhatsApp par SEO team se baat karein"
        ]
      };
    }
    return {
      reply: "Our precision SEO practice combines technical crawl optimization, semantic keyword mapping, and Core Web Vitals tuning to capture high-intent transactional search traffic. Monthly ongoing SEO retainers start at $449 (₹29,999/month). What is your website domain so we can run an initial analysis?",
      suggestedPrompts: [
        "SEO Optimization Details ($449/mo)",
        "Run Free Instant Website Audit",
        "Book a Strategy Meeting",
        "Chat with SEO Lead on WhatsApp"
      ]
    };
  }

  // 11. Pricing / Cost / Rates across all services
  if (
    query.match(/\b(price|pricing|cost|rates|charges|package|packages|budget|how much|kitna paisa|kitne paise|kitna charge|kharcha|fees|rate card)\b/i)
  ) {
    if (isHindi) {
      return {
        reply: "Hamare transparent agency packages is prakaar hain:\n• SEO Optimization: $449/mo (₹29,999)\n• Custom Website Development (Next.js): $699 (₹49,999)\n• Content Writing: $119 (₹7,999)\n• Email Marketing: $269 (₹18,999)\n• Website Maintenance: $149/mo (₹9,999)\nAapko kis service ke liye custom proposal chahiye?",
        suggestedPrompts: [
          "Website Development Quote ($699)",
          "SEO Optimization Retainer ($449)",
          "WhatsApp par custom quote lein (+91 76908 68932)"
        ]
      };
    }
    return {
      reply: "Here is an overview of our transparent agency packages:\n• Full-Funnel SEO Optimization: $449/mo (₹29,999)\n• Custom Next.js Web Development: $699 (₹49,999)\n• Professional Content Writing: $119 (₹7,999)\n• Email Marketing Automation: $269 (₹18,999)\n• 24/7 Website Maintenance: $149/mo (₹9,999)\nWhich service would you like a detailed proposal for?",
      suggestedPrompts: [
        "Web Development Proposal",
        "SEO Monthly Retainer",
        "Get Custom Quote on WhatsApp"
      ]
    };
  }

  // 12. Meeting / Strategy Call / Founder / Talk with team
  if (
    query.match(/\b(meeting|call|schedule|consultation|talk|founder|zoom|google meet|baat karni|phone par baat)\b/i)
  ) {
    if (isHindi) {
      return {
        reply: "Aap hamare senior strategist ke sath direct 1-on-1 strategy call /schedule-meeting page par book kar sakte hain, ya turant WhatsApp (+91 76908 68932) par call/chat kar sakte hain. Kaunsa time aapko suit karega?",
        suggestedPrompts: [
          "Meeting Book Karein (/schedule-meeting)",
          "WhatsApp par direct message karein",
          "Email support@balajiprimemedia.in"
        ]
      };
    }
    return {
      reply: "You can book a direct 1-on-1 strategy consultation with Balaji Prime Media leadership on our /schedule-meeting page, or connect with us immediately via WhatsApp at +91 76908 68932. What day works best for you?",
      suggestedPrompts: [
        "Book a Strategy Meeting (/schedule-meeting)",
        "Message on WhatsApp (+91 76908 68932)",
        "Email Senior Team"
      ]
    };
  }

  // 13. UK / US / Global Services (UK Web Development / USA SEO)
  if (
    query.match(/\b(uk|united kingdom|london|manchester|us|usa|america|worldwide|australia|international|foreign)\b/i)
  ) {
    if (isHindi) {
      return {
        reply: "Ji haan! Hum UK, US aur global clients ke liye dedicated services dete hain jaise UK Web Development (/web-development-uk) aur US Enterprise SEO (/seo-services-usa). Hum international time zones me operate karte hain aur GBP, USD aur EUR me billing provide karte hain.",
        suggestedPrompts: [
          "UK Web Development dekhein (/web-development-uk)",
          "USA SEO Services dekhein (/seo-services-usa)",
          "International Clients ke sath discussion karein"
        ]
      };
    }
    return {
      reply: "We actively serve enterprise clients across the UK, USA, Australia, and Europe with dedicated timezone support. Explore our dedicated UK Web Development solutions (/web-development-uk) and USA SEO Growth programs (/seo-services-usa) with seamless multi-currency invoicing in GBP, USD, and EUR.",
      suggestedPrompts: [
        "Explore UK Web Development",
        "Explore USA SEO Services",
        "Schedule Strategy Meeting"
      ]
    };
  }

  // 14. Contact details / Office location / WhatsApp / Email
  if (
    query.match(/\b(contact|email|whatsapp|phone|number|mobile|address|office|location|kaha hai|kaha par)\b/i)
  ) {
    if (isHindi) {
      return {
        reply: "Balaji Prime Media ki contact details:\n• WhatsApp & Phone: +91 76908 68932 (24/7)\n• Email: support@balajiprimemedia.in\n• Office: Jaipur, Rajasthan (Serving UK, US & Worldwide clients).\nAap hamare /contact page par bhi form bhar sakte hain.",
        suggestedPrompts: [
          "WhatsApp (+91 76908 68932) par chat karein",
          "Email bhejein",
          "Contact Page dekhein (/contact)"
        ]
      };
    }
    return {
      reply: "You can reach Balaji Prime Media 24/7:\n• WhatsApp & Phone: +91 76908 68932\n• Email: support@balajiprimemedia.in\n• Headquarters: Jaipur, Rajasthan (Operating across UK, US, and APAC time zones).\nOr visit our /contact page.",
      suggestedPrompts: [
        "Chat on WhatsApp (+91 76908 68932)",
        "Email support@balajiprimemedia.in",
        "Visit Contact Page"
      ]
    };
  }

  // 15. Payment Methods / Billing
  if (
    query.match(/\b(pay|payment|paypal|stripe|wise|wire transfer|upi|bank transfer|invoice|invoicing)\b/i)
  ) {
    if (isHindi) {
      return {
        reply: "Hum sabhi international aur domestic payment modes accept karte hain: Stripe, PayPal, Wise, Direct Bank Wire Transfer, aur UPI. Aap hamare /pay page par jaakar direct checkout bhi kar sakte hain.",
        suggestedPrompts: [
          "Payment Page dekhein (/pay)",
          "WhatsApp par invoice mangein",
          "Meeting schedule karein"
        ]
      };
    }
    return {
      reply: "We support secure international payments through Stripe, PayPal, Wise, Wire Transfer, and UPI with invoicing in USD, GBP, EUR, and INR. You can also make a payment directly on our /pay page.",
      suggestedPrompts: [
        "Go to /pay Page",
        "Request Invoice on WhatsApp",
        "Talk to Billing Team"
      ]
    };
  }

  // 16. Identity / Who are you / Tum kaun ho
  if (
    query.match(/\b(who are you|who r u|tum kaun ho|aap kaun ho|kaun ho|kya naam hai|naam kya hai|kya ho tum)\b/i)
  ) {
    if (isHindi) {
      return {
        reply: "Main Balaji Prime Media ka 24/7 AI Voice Concierge hoon. Balaji Prime Media ek full-service digital growth agency hai jo UK, US aur worldwide clients ko Custom Next.js Web Development, SEO, Content Writing aur Digital Marketing solutions deti hai.",
        suggestedPrompts: [
          "Aapki services kya kya hain?",
          "Pricing & Packages batao",
          "Founder se meeting book karein"
        ]
      };
    }
    return {
      reply: "I am the official 24/7 AI Concierge for Balaji Prime Media. We are a full-service digital growth agency providing custom Next.js web development, full-funnel SEO, content strategy, and digital marketing to UK, US, and international businesses.",
      suggestedPrompts: [
        "What services do you offer?",
        "Explore Pricing & Packages",
        "Schedule Strategy Meeting"
      ]
    };
  }

  // 17. Greetings / Namaste / Hi / Hello
  if (
    query.match(/^(hi|hello|hey|namaste|pranam|kaisa|kaise ho|kya haal|good morning|good afternoon|good evening)/i)
  ) {
    if (isHindi) {
      return {
        reply: "Namaste! Balaji Prime Media me aapka swagat hai. Main aapka AI Voice Assistant hoon. Aaj main aapki website development, SEO, content writing ya digital marketing me kis tarah madad kar sakta hoon?",
        suggestedPrompts: [
          "Website Development ke baare me batao",
          "SEO Packages dekhein",
          "Pricing & Rates kya hain?"
        ]
      };
    }
    return {
      reply: "Hello! Welcome to Balaji Prime Media. I am your 24/7 AI Concierge. We help UK, US, and worldwide brands scale with custom Next.js web engineering, full-funnel SEO, and digital marketing. How can I assist you today?",
      suggestedPrompts: [
        "Website Development Services",
        "SEO Growth Programs",
        "Pricing & Packages"
      ]
    };
  }

  // 18. Polite / Acknowledgement (Ok, Thanks, Good, etc.)
  if (
    query.match(/\b(ok|okay|theek hai|thik hai|shukriya|thanks|thank you|good|nice|badhiya|wah|great)\b/i)
  ) {
    if (isHindi) {
      return {
        reply: "Bahut shukriya! Agar aapko hamari kisi bhi service ya project ke baare me koi aur jankari chahiye, to zaroor batayein. Main hamesha yahan aapki madad ke liye hoon.",
        suggestedPrompts: [
          "Services & Pricing dekhein",
          "Free AI Website Audit karein",
          "WhatsApp par baat karein"
        ]
      };
    }
    return {
      reply: "You're very welcome! If you have any further questions about our web development, SEO strategies, or project pricing, feel free to ask anytime.",
      suggestedPrompts: [
        "Explore Services & Pricing",
        "Run Free Website Audit",
        "Connect on WhatsApp"
      ]
    };
  }

  // 19. Context-Aware Natural Fallback (DOES NOT mention guest posting unless asked)
  if (isHindi) {
    return {
      reply: `Main aapke sawal "${userMessage}" ko samajh gaya. Balaji Prime Media ek full-service digital agency hai jo Custom Next.js Web Development, SEO Optimization, Content Writing aur Digital Marketing provide karti hai. Aap is project ke baare me kya specifics jaan-na chahte hain?`,
      suggestedPrompts: [
        "Website Development Details ($699)",
        "SEO Optimization Retainer ($449/mo)",
        "WhatsApp (+91 76908 68932) par discuss karein",
        "Free SEO & Speed Audit karein"
      ]
    };
  }

  return {
    reply: `Regarding "${userMessage}": Balaji Prime Media provides custom Next.js web development, technical & semantic SEO, content marketing, and digital growth services for businesses in the UK, US, and globally. Would you like to discuss your project scope or see our packages?`,
    suggestedPrompts: [
      "Custom Web Development ($699)",
      "SEO Growth Retainer ($449/mo)",
      "Free Instant Website Audit",
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

    // Optional Gemini API Key integration if available in environment
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
                      text: `You are the official 24/7 AI Voice Concierge for Balaji Prime Media (BPM), a full-service digital agency.
Our core services:
1. Custom Next.js / React Website Development ($699 / ₹49,999)
2. Search Engine Optimization (SEO) ($449 / ₹29,999/mo)
3. Content Writing & Copywriting ($119 / ₹7,999)
4. Email Marketing & Revenue Automation ($269 / ₹18,999)
5. Website Maintenance & 24/7 Support ($149 / ₹9,999/mo)
6. Off-Page Link Building & Guest Posting ($279 / ₹19,999)
Contact: WhatsApp & Phone: +91 76908 68932, Email: support@balajiprimemedia.in.

CRITICAL RULES:
- ONLY talk about guest posting if the user specifically asked for guest posts or backlinks! NEVER force or mention 40,000 guest posting if the user is asking about websites, development, SEO, content, speed, pricing, or general inquiries.
- Directly and accurately answer what the user asked.
- If user speaks Hindi/Hinglish, reply warmly in natural Hinglish!
- If user speaks English, reply in polite UK/US English.
- Keep reply to 2-3 concise sentences suitable for voice speech synthesis.

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
                "Website Development ($699)",
                "SEO Optimization ($449/mo)",
                "Free Website Audit",
                "Chat on WhatsApp"
              ],
            });
          }
        }
      } catch (geminiErr) {
        console.warn("Gemini fallback to Local Engine:", geminiErr);
      }
    }

    // Precise, Multi-Service Local Conversational Engine
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
          "Main Balaji Prime Media ka AI Voice Concierge hoon. Hamari team Website Development, SEO aur Digital Marketing ke liye 24/7 uplabdh hai. Aap direct WhatsApp (+91 76908 68932) par connect kar sakte hain.",
      },
      { status: 500 }
    );
  }
}
