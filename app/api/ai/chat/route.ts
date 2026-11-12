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
    "kaam", "chal", "raha", "rahi", "kuch", "dikhao", "dikha", "dikhayein", "ka",
    "kripya", "namaskar", "shubh"
  ];

  const words = text.toLowerCase().split(/\s+/);
  return words.some((w) => hinglishTokens.includes(w));
}

// Intelligent, Specialized Context Engine for Balaji Prime Media
function generateDynamicResponse(
  userMessage: string,
  _history: ChatHistoryItem[],
  preferredLang?: "en" | "hi"
) {
  const query = userMessage.toLowerCase().trim();
  const isHindi = preferredLang === "hi" || (preferredLang !== "en" && isHindiOrHinglish(query));

  // 1. Contact / Lead Info Provided (Email or Phone Number)
  const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(userMessage);
  const hasPhone = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4,}/.test(userMessage);
  if (hasEmail || hasPhone) {
    if (isHindi) {
      return {
        reply: "बहुत-बहुत धन्यवाद! मैंने आपकी संपर्क जानकारी सुरक्षित रूप से दर्ज कर ली है। बालाजी प्राइम मीडिया की सीनियर टीम 2 घंटे के भीतर आपसे संपर्क करेगी। त्वरित बातचीत के लिए आप सीधे व्हाट्सएप (+91 76908 68932) पर भी संदेश भेज सकते हैं।",
        suggestedPrompts: [
          "व्हाट्सएप (+91 76908 68932) पर चैट करें",
          "सेवाएं और प्राइसिंग देखें",
          "फ्री वेबसाइट ऑडिट करें"
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
    query.match(/\b(suno|sun rahe|sun rahi|awaz|aawaz|bol|bolo|boliye|can you hear|hear me|testing|test|सुनो|बोलो|आवाज़|आवाज)\b/i)
  ) {
    if (isHindi) {
      return {
        reply: "हाँ जी, मैं आपकी आवाज़ बिल्कुल साफ सुन रहा हूँ! कहिए, बालाजी प्राइम मीडिया की सेवाओं जैसे वेबसाइट डेवलपमेंट, एसईओ, कंटेंट राइटिंग या डिजिटल मार्केटिंग में आपको किस विषय में जानकारी चाहिए?",
        suggestedPrompts: [
          "वेबसाइट डेवलपमेंट के बारे में बताएं",
          "एसईओ रैंकिंग पैकेज ($449/माह)",
          "प्राइसिंग और रेट कार्ड"
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
    query.match(/\b(audit|speed audit|speed test|free audit|check website|analyze website|pagespeed|ऑडिट|स्पीड)\b/i)
  ) {
    if (isHindi) {
      return {
        reply: "आप हमारी वेबसाइट के /audit पेज पर जाकर अपनी वेबसाइट का निःशुल्क (Free) एआई स्पीड और एसईओ ऑडिट सिर्फ 10 सेकंड में कर सकते हैं। इसमें आपको गूगल पेज-स्पीड, कोर वेब वाइटल्स और सर्च रैंकिंग की संपूर्ण रिपोर्ट प्राप्त होगी।",
        suggestedPrompts: [
          "फ्री वेबसाइट ऑडिट करें (/audit)",
          "मेरा डोमेन चेक करें",
          "व्हाट्सएप पर रिपोर्ट मांगें"
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

  // 4. Website Maintenance, Security & Bug Fixes
  if (
    query.match(/\b(maintenance|security|bug|bugs|fix|fixing|updates|slow website|hacked|backup|sla|monthly maintenance|support plan|मेंटेनेंस|सुरक्षा)\b/i)
  ) {
    if (isHindi) {
      return {
        reply: "हम 24/7 वेबसाइट मेंटेनेंस, सुरक्षा अपडेट्स, दैनिक बैकअप, स्पीड मॉनिटरिंग और तुरंत बग फिक्स प्रदान करते हैं ताकि आपकी वेबसाइट सदैव सुरक्षित और लाइव रहे। मासिक मेंटेनेंस प्लान $149 (₹9,999/माह) से शुरू होता है।",
        suggestedPrompts: [
          "वेबसाइट मेंटेनेंस ($149/माह)",
          "वेबसाइट स्पीड और सुरक्षा ऑडिट",
          "व्हाट्सएप पर तुरंत सहायता लें"
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
    query.match(/\b(content|writing|article|articles|blog|blogs|copywriting|writer|editorial|scripts|sales copy|कंटेंट|आर्टिकल|ब्लॉग)\b/i)
  ) {
    if (isHindi) {
      return {
        reply: "हम उच्च-रूपांतरण वाले एसईओ आर्टिकल्स, ब्लॉग पोस्ट्स और वेबसाइट सेल्स कॉपी लिखते हैं जो सर्च इंजन रैंकिंग और वास्तविक ग्राहकों दोनों के लिए अनुकूलित होते हैं। कंटेंट राइटिंग पैकेज $119 (₹7,999) से शुरू होते हैं। आपको किस विषय या इंडस्ट्री के लिए कंटेंट चाहिए?",
        suggestedPrompts: [
          "कंटेंट राइटिंग पैकेज ($119)",
          "एसईओ ब्लॉग रणनीति समझें",
          "कंटेंट सैंपल्स देखें",
          "व्हाट्सएप पर विषय साझा करें"
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
    query.match(/\b(email marketing|automation|drip|newsletter|crm|klaviyo|mailchimp|leads nurturing|ईमेल)\b/i)
  ) {
    if (isHindi) {
      return {
        reply: "हमारी ईमेल मार्केटिंग सेवा में ऑटोमेटेड वेलकम ड्रिप्स, कस्टमर रिटेंशन फ्लो, न्यूज़लेटर कैंपेन और सीआरएम इंटीग्रेशन शामिल हैं जो लीड्स को नियमित ग्राहकों में बदलते हैं। पैकेज $269 (₹18,999) से शुरू होते हैं।",
        suggestedPrompts: [
          "ईमेल ऑटोमेशन ($269)",
          "कैंपेन फ्लो रणनीति",
          "व्हाट्सएप पर बात करें"
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
    query.match(/\b(guest post|guest posting|backlink|backlinks|link building|dofollow|da |dr |domain rating|outreach|pbn|गेस्ट पोस्ट|बैकलिंक)\b/i)
  ) {
    if (isHindi) {
      return {
        reply: "हम प्रामाणिक उच्च-अधिकार वाली वेबसाइट्स (DR 50 से DR 90+) पर 100% मैनुअल आउटरीच के माध्यम से स्थायी डू-फॉलो गेस्ट पोस्ट्स प्रदान करते हैं—शून्य पीबीएन और शून्य स्पैम नेटवर्क। प्लेसमेंट दरें $30 से शुरू होती हैं। आप /guest-posting पेज पर हमारा लाइव डेटाबेस देख सकते हैं।",
        suggestedPrompts: [
          "गेस्ट पोस्टिंग डेटाबेस देखें (/guest-posting)",
          "DR 50–90+ प्राइसिंग और टियर्स",
          "व्हाट्सएप पर वेरीफाइड लिस्ट मांगें"
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
    query.match(/\b(project|projects|portfolio|case study|case studies|samples|previous work|kaam dikhao|प्रोजेक्ट|पोर्टफोलियो|काम)\b/i)
  ) {
    if (isHindi) {
      return {
        reply: "हमने ई-कॉमर्स ब्रांड्स, सास (SaaS) प्लेटफॉर्म्स, फिटनेस ऐप्स और टेक स्टार्टअप्स के लिए हाई-परफॉर्मिंग वेबसाइट्स और एसईओ कैंपेन सफलतापूर्वक डिलीवर किए हैं। आप हमारे /projects और /work पेज पर जाकर पूरे केस स्टडीज और परिणाम देख सकते हैं।",
        suggestedPrompts: [
          "प्रोजेक्ट्स और केस स्टडीज देखें (/projects)",
          "वर्क पोर्टफोलियो देखें (/work)",
          "व्हाट्सएप पर लाइव डेमो देखें"
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
    query.match(/\b(website|web dev|web development|next\.js|nextjs|react|frontend|backend|coding|redesign|landing page|e-commerce|ecommerce|shopify|wordpress|app development|ui\/ux|design|वेबसाइट|डिज़ाइन)\b/i)
  ) {
    if (isHindi) {
      return {
        reply: "हम आधुनिक और अल्ट्रा-फास्ट नेक्स्ट.जेएस (Next.js) और रिएक्ट वेबसाइट्स बनाते हैं जिनका गूगल पेज-स्पीड स्कोर 95+ और लोडिंग टाइम 1 सेकंड से कम होता है। हमारे पैकेज कस्टम रिस्पॉन्सिव डिज़ाइन, एसईओ-फ्रेंडली आर्किटेक्चर और सीएमएस के साथ $699 (₹49,999) से शुरू होते हैं। आपको किस प्रकार की वेबसाइट बनवानी है?",
        suggestedPrompts: [
          "वेबसाइट डेवलपमेंट पैकेज ($699)",
          "नेक्स्ट.जेएस और वर्डप्रेस में अंतर",
          "लाइव प्रोजेक्ट्स और पोर्टफोलियो",
          "व्हाट्सएप पर वेबसाइट डिस्कस करें"
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
    query.match(/\b(seo|search engine|ranking|rank|keywords|traffic|organic traffic|serp|google rank|on-page|technical seo|indexing|google search console|search visibility|एसईओ|रैंकिंग|ट्रैफिक)\b/i)
  ) {
    if (isHindi) {
      return {
        reply: "हमारी संपूर्ण एसईओ सेवा में टेक्निकल क्रॉल ऑडिट, कमर्शियल कीवर्ड रिसर्च, ऑन-पेज ऑप्टिमाइजेशन, कोर वेब वाइटल्स सुधार और पारदर्शी मासिक रैंकिंग रिपोर्ट्स शामिल हैं। हमारा मासिक एसईओ प्लान $449 (₹29,999/माह) से शुरू होता है। आपकी वेबसाइट का डोमेन नाम क्या है?",
        suggestedPrompts: [
          "मासिक एसईओ प्लान ($449/माह)",
          "फ्री एआई एसईओ ऑडिट (/audit)",
          "कीवर्ड रिसर्च कैसे होती है?",
          "व्हाट्सएप पर एसईओ टीम से बात करें"
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
    query.match(/\b(price|pricing|cost|rates|charges|package|packages|budget|how much|kitna paisa|kitne paise|kitna charge|kharcha|fees|rate card|प्राइस|कीमत|खर्चा|रेट|पैसा|पैसे)\b/i)
  ) {
    if (isHindi) {
      return {
        reply: "हमारे पारदर्शी एजेंसी पैकेज इस प्रकार हैं:\n• नेक्स्ट.जेएस वेबसाइट डेवलपमेंट: $699 (₹49,999)\n• संपूर्ण एसईओ ऑप्टिमाइजेशन: $449/माह (₹29,999)\n• प्रोफेशनल कंटेंट राइटिंग: $119 (₹7,999)\n• ईमेल मार्केटिंग ऑटोमेशन: $269 (₹18,999)\n• 24/7 वेबसाइट मेंटेनेंस: $149/माह (₹9,999)\nआप किस सेवा के लिए विस्तृत प्रस्ताव चाहते हैं?",
        suggestedPrompts: [
          "वेबसाइट डेवलपमेंट कोट ($699)",
          "एसईओ मासिक प्लान ($449)",
          "व्हाट्सएप पर कस्टम कोट लें (+91 76908 68932)"
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
    query.match(/\b(meeting|call|schedule|consultation|talk|founder|zoom|google meet|baat karni|phone par baat|मीटिंग|कॉल|बात)\b/i)
  ) {
    if (isHindi) {
      return {
        reply: "आप बालाजी प्राइम मीडिया के सीनियर रणनीतिकार के साथ 1-on-1 मीटिंग हमारे /schedule-meeting पेज पर बुक कर सकते हैं, या तुरंत व्हाट्सएप (+91 76908 68932) पर कॉल या मैसेज कर सकते हैं। आपके लिए कौन सा समय सबसे अच्छा रहेगा?",
        suggestedPrompts: [
          "मीटिंग बुक करें (/schedule-meeting)",
          "व्हाट्सएप पर सीधे संपर्क करें",
          "ईमेल support@balajiprimemedia.in"
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
    query.match(/\b(uk|united kingdom|london|manchester|us|usa|america|worldwide|australia|international|foreign|विदेश|ग्लोबल)\b/i)
  ) {
    if (isHindi) {
      return {
        reply: "जी हाँ! हम यूके, यूएस और दुनिया भर के ग्राहकों के लिए समर्पित सेवाएं प्रदान करते हैं, जैसे यूके वेब डेवलपमेंट (/web-development-uk) और यूएस एंटरप्राइज एसईओ (/seo-services-usa)। हम अंतरराष्ट्रीय टाइम ज़ोन में कार्य करते हैं और GBP, USD और EUR में बिलिंग उपलब्ध है।",
        suggestedPrompts: [
          "यूके वेब डेवलपमेंट देखें (/web-development-uk)",
          "यूएसए एसईओ सर्विसेज देखें (/seo-services-usa)",
          "व्हाट्सएप पर अंतरराष्ट्रीय प्रोजेक्ट डिस्कस करें"
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
    query.match(/\b(contact|email|whatsapp|phone|number|mobile|address|office|location|kaha hai|kaha par|संपर्क|पता|फोन|नंबर|ईमेल)\b/i)
  ) {
    if (isHindi) {
      return {
        reply: "बालाजी प्राइम मीडिया की संपर्क जानकारी:\n• व्हाट्सएप एवं फोन: +91 76908 68932 (24/7 उपलब्ध)\n• ईमेल: support@balajiprimemedia.in\n• हेडक्वार्टर: जयपुर, राजस्थान (यूके, यूएस और वैश्विक सेवाएं).\nआप हमारे /contact पेज पर जाकर भी संपर्क फॉर्म भर सकते हैं।",
        suggestedPrompts: [
          "व्हाट्सएप (+91 76908 68932) पर चैट करें",
          "ईमेल भेजें",
          "संपर्क पेज देखें (/contact)"
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
    query.match(/\b(pay|payment|paypal|stripe|wise|wire transfer|upi|bank transfer|invoice|invoicing|पेमेंट|भुगतान)\b/i)
  ) {
    if (isHindi) {
      return {
        reply: "हम सभी प्रमुख अंतरराष्ट्रीय और घरेलू भुगतान माध्यम स्वीकार करते हैं: स्ट्राइप (Stripe), पेपाल (PayPal), वाइज (Wise), डायरेक्ट बैंक वायर और यूपीआई (UPI)। आप हमारे /pay पेज पर जाकर सीधा सुरक्षित ऑनलाइन भुगतान भी कर सकते हैं।",
        suggestedPrompts: [
          "पेमेंट पेज देखें (/pay)",
          "व्हाट्सएप पर इनवॉइस मांगें",
          "बिलिंग टीम से बात करें"
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
    query.match(/\b(who are you|who r u|tum kaun ho|aap kaun ho|kaun ho|kya naam hai|naam kya hai|kya ho tum|तुम कौन हो|आप कौन हैं|नाम क्या है)\b/i)
  ) {
    if (isHindi) {
      return {
        reply: "मैं बालाजी प्राइम मीडिया की 24/7 आधिकारिक एआई वॉयस गाइड हूँ। बालाजी प्राइम मीडिया एक प्रीमियम डिजिटल ग्रोथ एजेंसी है जो यूके, यूएस और वैश्विक व्यवसायों को कस्टम नेक्स्ट.जेएस वेब डेवलपमेंट, फुल-फनल एसईओ, कंटेंट राइटिंग और डिजिटल मार्केटिंग समाधान प्रदान करती है।",
        suggestedPrompts: [
          "आपकी मुख्य सेवाएं क्या हैं?",
          "प्राइसिंग और पैकेज बताएं",
          "फाउंडर से मीटिंग बुक करें"
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
    query.match(/^(hi|hello|hey|namaste|pranam|kaisa|kaise ho|kya haal|good morning|good afternoon|good evening|नमस्ते|प्रणाम|हाय|हैलो)/i)
  ) {
    if (isHindi) {
      return {
        reply: "नमस्ते! बालाजी प्राइम मीडिया में आपका स्वागत है। मैं आपकी 24/7 एआई वॉयस गाइड हूँ। आज मैं आपकी वेबसाइट डेवलपमेंट, एसईओ, कंटेंट राइटिंग या डिजिटल मार्केटिंग में किस प्रकार सहायता कर सकती हूँ?",
        suggestedPrompts: [
          "वेबसाइट डेवलपमेंट पैकेज ($699)",
          "एसईओ रैंकिंग पैकेज ($449/माह)",
          "प्राइसिंग और रेट्स बताएं"
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
    query.match(/\b(ok|okay|theek hai|thik hai|shukriya|thanks|thank you|good|nice|badhiya|wah|great|धन्यवाद|शुक्रिया|ठीक है|बढ़िया)\b/i)
  ) {
    if (isHindi) {
      return {
        reply: "बहुत-बहुत धन्यवाद! यदि आपको हमारी किसी भी सेवा या प्रोजेक्ट के बारे में और कोई जानकारी चाहिए, तो कृपया अवश्य बताएं। मैं सदैव आपकी सहायता के लिए उपस्थित हूँ।",
        suggestedPrompts: [
          "सेवाएं और प्राइसिंग देखें",
          "फ्री वेबसाइट ऑडिट करें",
          "व्हाट्सएप पर बात करें"
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
      reply: `मैंने आपके सवाल "${userMessage}" को समझ लिया है। बालाजी प्राइम मीडिया कस्टम नेक्स्ट.जेएस वेब डेवलपमेंट, एसईओ ऑप्टिमाइजेशन, कंटेंट राइटिंग और डिजिटल ग्रोथ सेवाएं प्रदान करती है। क्या आप अपने प्रोजेक्ट के बारे में विस्तार से बताना चाहेंगे?`,
      suggestedPrompts: [
        "वेबसाइट डेवलपमेंट ($699)",
        "एसईओ रैंकिंग पैकेज ($449/माह)",
        "व्हाट्सएप (+91 76908 68932) पर बात करें",
        "फ्री वेबसाइट स्पीड व एसईओ ऑडिट"
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
    const preferredLang: "en" | "hi" | undefined =
      body.lang === "hi" ? "hi" : body.lang === "en" ? "en" : undefined;

    if (!message) {
      return NextResponse.json(
        { success: false, error: "Message content is required" },
        { status: 400 }
      );
    }

    const isHindiTarget =
      preferredLang === "hi" || (preferredLang !== "en" && isHindiOrHinglish(message));

    // Optional Gemini API Key integration if available in environment
    const geminiKey = process.env.GEMINI_API_KEY;
    if (geminiKey) {
      try {
        const languageInstruction = isHindiTarget
          ? "CRITICAL LANGUAGE REQUIREMENT: You MUST answer entirely in polite, natural, authentic Hindi using Devanagari script (हिन्दी). Do not use Latin/Roman script. Write complete words without any truncation or abbreviations. Keep reply to 2-4 concise, complete sentences suitable for speech synthesis."
          : "CRITICAL LANGUAGE REQUIREMENT: Answer in professional, polite UK/US English. Write complete sentences without truncation. Keep reply to 2-3 concise sentences suitable for speech synthesis.";

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
- ${languageInstruction}
- Ensure words are fully written and never cut off.

User query: "${message}"`
                    }
                  ],
                },
              ],
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 800,
              },
            }),
          }
        );
        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const generatedText =
            geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (generatedText) {
            const hindiPrompts = [
              "वेबसाइट डेवलपमेंट ($699)",
              "एसईओ रैंकिंग पैकेज ($449/माह)",
              "फ्री वेबसाइट स्पीड ऑडिट",
              "व्हाट्सएप पर बात करें"
            ];
            const englishPrompts = [
              "Website Development ($699)",
              "SEO Optimization ($449/mo)",
              "Free Website Audit",
              "Chat on WhatsApp"
            ];

            return NextResponse.json({
              success: true,
              reply: generatedText.trim(),
              suggestedPrompts: isHindiTarget ? hindiPrompts : englishPrompts,
            });
          }
        }
      } catch (geminiErr) {
        console.warn("Gemini fallback to Local Engine:", geminiErr);
      }
    }

    // Precise, Multi-Service Local Conversational Engine
    const response = generateDynamicResponse(message, history, preferredLang);

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
          "नमस्ते! मैं बालाजी प्राइम मीडिया की एआई वॉयस गाइड हूँ। हमारी टीम वेबसाइट डेवलपमेंट, एसईओ और डिजिटल मार्केटिंग के लिए 24/7 उपलब्ध है। आप सीधे व्हाट्सएप (+91 76908 68932) पर संपर्क कर सकते हैं।",
      },
      { status: 500 }
    );
  }
}
