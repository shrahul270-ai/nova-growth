"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { trackInteraction } from "@/lib/tracker";

interface Message {
  id: string;
  sender: "ai" | "user";
  text: string;
  timestamp: string;
  lang?: "en" | "hi";
}

const ENGLISH_PROMPTS = [
  "What services do you offer?",
  "Website Development ($699)",
  "SEO Optimization ($449/mo)",
  "40K+ Guest Posting Market",
  "Free Instant SEO Audit",
  "Client Case Studies",
];

const HINDI_PROMPTS = [
  "वेबसाइट डेवलपमेंट पैकेज ($699)",
  "एसईओ रैंकिंग पैकेज ($449/माह)",
  "40,000+ गेस्ट पोस्टिंग मार्केट",
  "फ्री वेबसाइट स्पीड व एसईओ ऑडिट",
  "प्राइसिंग और रेट कार्ड",
  "व्हाट्सएप पर बात करें",
];

const ENGLISH_WELCOME =
  "Hello! Welcome to Balaji Prime Media. I am your 24/7 Official Website AI Assistant. You can ask me anything about our Next.js development packages, SEO plans, 40,000+ publisher marketplace, pricing, and live client results. How can I help you explore today?";

const HINDI_WELCOME =
  "नमस्ते! बालाजी प्राइम मीडिया में आपका स्वागत है। मैं आपकी 24/7 आधिकारिक एआई वॉयस गाइड हूँ। आप हमारी वेबसाइट, नेक्स्ट.जेएस वेब डेवलपमेंट ($699), एसईओ पैकेज ($449/माह), 40,000+ पब्लिशर मार्केटप्लेस और प्राइसिंग के बारे में कुछ भी पूछ सकते हैं। आज मैं आपकी क्या सहायता करूँ?";

export default function AIVoiceWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"voice" | "chat">("voice");
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [inputText, setInputText] = useState("");
  const [micNotice, setMicNotice] = useState("");
  const [prompts, setPrompts] = useState<string[]>(ENGLISH_PROMPTS);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-init",
      sender: "ai",
      text: ENGLISH_WELCOME,
      timestamp: "Just now",
      lang: "en",
    },
  ]);

  const messagesRef = useRef<Message[]>(messages);
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const langRef = useRef<"en" | "hi">(lang);
  useEffect(() => {
    langRef.current = lang;
  }, [lang]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null);
  const accumulatedTranscriptRef = useRef<string>("");

  // Load language preference from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const savedLang = localStorage.getItem("bpm_ai_lang") as "en" | "hi" | null;
      if (savedLang === "hi") {
        setLang("hi");
        langRef.current = "hi";
        setPrompts(HINDI_PROMPTS);
        setMessages([
          {
            id: "welcome-hi",
            sender: "ai",
            text: HINDI_WELCOME,
            timestamp: "Just now",
            lang: "hi",
          },
        ]);
      }
    } catch {}
  }, []);

  // Preload speech synthesis voices
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const loadVoices = () => {
      try {
        window.speechSynthesis.getVoices();
      } catch {}
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  // Hide on admin portal
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  // Clean and synthesize speech in selected language
  const speakText = useCallback(
    (text: string, forceLang?: "en" | "hi") => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) {
        return;
      }

      if (isMuted) {
        return;
      }

      try {
        window.speechSynthesis.cancel();
        window.speechSynthesis.resume();

        // Convert prices and technical abbreviations into natural spoken speech
        const cleanSpeech = text
          .replace(/[*_#`~>]/g, "")
          .replace(/•/g, " ")
          .replace(/["'""'']/g, "")
          .replace(/[()]/g, " ")
          .replace(/https?:\/\/\S+/gi, "link")
          .replace(/\$([0-9,]+)\/माह/g, "$1 डॉलर प्रति माह")
          .replace(/\$([0-9,]+)\/mo\b/gi, "$1 डॉलर प्रति माह")
          .replace(/\$([0-9,]+)\/month\b/gi, "$1 डॉलर प्रति माह")
          .replace(/\$([0-9,]+)/g, "$1 डॉलर")
          .replace(/₹([0-9,]+)\/माह/g, "$1 रुपये प्रति माह")
          .replace(/₹([0-9,]+)\/mo\b/gi, "$1 रुपये प्रति माह")
          .replace(/₹([0-9,]+)/g, "$1 रुपये")
          .replace(/\/माह/g, " प्रति माह")
          .replace(/\/mo\b/gi, " per month")
          .replace(/\/month\b/gi, " per month")
          .replace(/24\/7/g, "चौबीसों घंटे")
          .replace(/नेक्स्ट\.जेएस/g, "नेक्स्ट जेएस")
          .replace(/Next\.js/g, "Next JS")
          .replace(/\s+/g, " ")
          .trim();

        if (!cleanSpeech) return;

        const utterance = new SpeechSynthesisUtterance(cleanSpeech);
        const currentLang = forceLang || langRef.current;

        const isHindi =
          currentLang === "hi" ||
          /[\u0900-\u097F]/.test(text) ||
          /\b(namaste|shukriya|dhanyawad|swagat|bataiye|karein|hain|hai)\b/i.test(text);

        utterance.lang = isHindi ? "hi-IN" : "en-GB";
        utterance.rate = isHindi ? 0.95 : 1.0;
        utterance.pitch = 1.0;

        const voices = window.speechSynthesis.getVoices();
        if (isHindi) {
          // Find genuine Hindi voice (Google हिन्दी, Microsoft Hemant, Kalpana, Lekha, Heera, etc.)
          const hiVoice =
            voices.find(
              (v) =>
                v.lang.toLowerCase() === "hi-in" ||
                v.lang.toLowerCase() === "hi_in" ||
                v.lang.toLowerCase().startsWith("hi")
            ) ||
            voices.find((v) => {
              const name = v.name.toLowerCase();
              return (
                name.includes("hindi") ||
                name.includes("हिन्दी") ||
                name.includes("hemant") ||
                name.includes("kalpana") ||
                name.includes("lekha") ||
                name.includes("heera") ||
                name.includes("neerja") ||
                name.includes("swara") ||
                name.includes("madhur")
              );
            });

          if (hiVoice) {
            utterance.voice = hiVoice;
            utterance.lang = hiVoice.lang;
          } else {
            // NEVER assign an English voice (en-IN) to Hindi text!
            // Setting utterance.lang = "hi-IN" directs browser's native text-to-speech to use its Hindi synthesizer
            utterance.lang = "hi-IN";
          }
        } else {
          const enVoice =
            voices.find(
              (v) =>
                (v.lang === "en-GB" || v.lang === "en_GB") &&
                (v.name.includes("Google") ||
                  v.name.includes("Natural") ||
                  v.name.includes("Female") ||
                  v.name.includes("Daniel"))
            ) ||
            voices.find(
              (v) =>
                v.lang.startsWith("en-US") ||
                v.lang.startsWith("en-IN") ||
                v.lang.startsWith("en")
            );
          if (enVoice) utterance.voice = enVoice;
        }

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        speechSynthRef.current = utterance;
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn("Speech synthesis notice:", err);
        setIsSpeaking(false);
      }
    },
    [isMuted]
  );

  // Stop currently playing speech
  const stopSpeaking = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }, []);

  // Send message to AI endpoint with full text & language parameter
  const handleUserMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      // Unlock speech synthesis context
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.resume();
      }

      setMicNotice("");

      // Track interaction
      trackInteraction({
        action: "other",
        title: "AI Voice Bot Query",
        details: trimmed,
      });

      // Add user message to UI
      const userMsg: Message = {
        id: String(Date.now()),
        sender: "user",
        text: trimmed,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        lang: langRef.current,
      };

      setMessages((prev) => [...prev, userMsg]);
      setInputText("");
      setTranscript("");
      accumulatedTranscriptRef.current = "";
      setIsThinking(true);

      try {
        const historySnapshot = messagesRef.current.slice(-4).map((m) => ({
          role: m.sender === "ai" ? "assistant" : "user",
          content: m.text,
        }));

        const res = await fetch("/api/ai/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: trimmed,
            lang: langRef.current,
            history: historySnapshot,
          }),
        });

        const data = await res.json();
        const fallbackText =
          langRef.current === "hi"
            ? "मैं बालाजी प्राइम मीडिया की एआई वॉयस गाइड हूँ। हमारी टीम वेबसाइट डेवलपमेंट, एसईओ और डिजिटल मार्केटिंग के लिए 24/7 उपलब्ध है। आप सीधे व्हाट्सएप (+91 76908 68932) पर संपर्क कर सकते हैं।"
            : "I am the official 24/7 AI Concierge for Balaji Prime Media. Our team is available 24/7 for custom Next.js development, SEO, and digital growth. You can reach us directly on WhatsApp (+91 76908 68932).";

        const aiReply = data?.reply || fallbackText;

        if (Array.isArray(data?.suggestedPrompts) && data.suggestedPrompts.length > 0) {
          setPrompts(data.suggestedPrompts);
        }

        const aiMsg: Message = {
          id: String(Date.now() + 1),
          sender: "ai",
          text: aiReply,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          lang: langRef.current,
        };

        setMessages((prev) => [...prev, aiMsg]);
        setIsThinking(false);

        // Speak full response in selected language
        speakText(aiReply, langRef.current);

        // Auto-capture lead if contact details detected
        const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(trimmed);
        const hasPhone = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4,}/.test(trimmed);
        if (hasEmail || hasPhone || data?.leadCaptured) {
          fetch("/api/db/leads", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              type: "ai_voice_bot",
              name: "AI Voice Inquirer",
              email: hasEmail
                ? trimmed.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)?.[0]
                : "",
              phone: hasPhone
                ? trimmed.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4,}/)?.[0]
                : "",
              service: "UK / Global SEO & Web Development Consultation",
              message: `User query through AI Voice Concierge (${langRef.current}): "${trimmed}"`,
              sourceUrl: typeof window !== "undefined" ? window.location.pathname : "/",
            }),
          }).catch(() => {});
        }
      } catch {
        setIsThinking(false);
        const fallbackReply =
          langRef.current === "hi"
            ? "बालाजी प्राइम मीडिया की सीनियर टीम 24/7 उपलब्ध है। आप सीधे व्हाट्सएप (+91 76908 68932) या ईमेल support@balajiprimemedia.in पर संपर्क कर सकते हैं।"
            : "Balaji Prime Media's senior leadership is available 24/7. You can connect with us directly on WhatsApp (+91 76908 68932) or email support@balajiprimemedia.in.";

        setMessages((prev) => [
          ...prev,
          {
            id: String(Date.now() + 2),
            sender: "ai",
            text: fallbackReply,
            timestamp: "Just now",
            lang: langRef.current,
          },
        ]);
        speakText(fallbackReply, langRef.current);
      }
    },
    [speakText]
  );

  // Start microphone listening with guaranteed permission and real-time capture
  const startListening = async () => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setMicNotice(
        langRef.current === "hi"
          ? "आपके ब्राउज़र में स्पीच रिकग्निशन उपलब्ध नहीं है। कृपया नीचे लिखकर पूछें।"
          : "Speech recognition is not supported in this browser. Please type your inquiry below."
      );
      return;
    }

    // Stop existing audio playback and clear old session
    stopSpeaking();
    setMicNotice("");
    setTranscript("");
    accumulatedTranscriptRef.current = "";

    // Prompt mic permission if needed
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach((t) => t.stop());
      } catch (err: any) {
        if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
          setMicNotice(
            langRef.current === "hi"
              ? "माइक की अनुमति (Microphone Permission) बंद है। कृपया ब्राउज़र सेटिंग्स में माइक चालू करें।"
              : "Microphone permission is blocked. Please allow microphone access in your browser."
          );
          setIsListening(false);
          return;
        }
      }
    }

    try {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {}
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = false; // Fast, reliable end detection without hanging
      recognition.interimResults = true;
      recognition.lang = langRef.current === "hi" ? "hi-IN" : "en-IN";
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        setMicNotice("");
      };

      recognition.onresult = (event: any) => {
        let fullInterim = "";
        let fullFinal = "";

        for (let i = 0; i < event.results.length; i++) {
          const res = event.results[i];
          if (res.isFinal) {
            fullFinal += res[0].transcript + " ";
          } else {
            fullInterim += res[0].transcript + " ";
          }
        }

        const currentText = (fullFinal + fullInterim).trim();
        if (currentText) {
          accumulatedTranscriptRef.current = currentText;
          setTranscript(currentText);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition notice:", event.error);
        if (event.error === "not-allowed" || event.error === "service-not-allowed") {
          setMicNotice(
            langRef.current === "hi"
              ? "माइक की अनुमति नहीं मिली। कृपया ब्राउज़र में माइक्रोफ़ोन चालू करें।"
              : "Microphone permission denied. Please allow microphone in browser settings."
          );
        } else if (event.error === "no-speech") {
          setMicNotice(
            langRef.current === "hi"
              ? "आवाज़ नहीं सुनाई दी। कृपया दोबारा माइक पर टैप करके बोलें।"
              : "No voice detected. Please tap the mic and try speaking again."
          );
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        const captured = accumulatedTranscriptRef.current.trim();
        if (captured) {
          accumulatedTranscriptRef.current = "";
          handleUserMessage(captured);
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (startErr) {
      console.warn("Failed to start speech recognition:", startErr);
      setIsListening(false);
    }
  };

  // Stop listening manually and send captured text immediately
  const stopListening = () => {
    setIsListening(false);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }
    const captured = accumulatedTranscriptRef.current.trim();
    if (captured) {
      accumulatedTranscriptRef.current = "";
      handleUserMessage(captured);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  // Switch Language (EN <-> HI): Instantly updates all cards, welcomes, prompts and speech
  const switchLanguage = (newLang: "en" | "hi") => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      window.speechSynthesis.resume();
    }
    stopSpeaking();

    if (isListening && recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {}
      setIsListening(false);
    }

    setMicNotice("");
    setLang(newLang);
    langRef.current = newLang;

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("bpm_ai_lang", newLang);
      } catch {}
    }

    if (newLang === "hi") {
      setPrompts(HINDI_PROMPTS);
      // Replace greeting completely with pure Hindi
      setMessages([
        {
          id: "welcome-hi",
          sender: "ai",
          text: HINDI_WELCOME,
          timestamp: "Just now",
          lang: "hi",
        },
      ]);
      speakText(HINDI_WELCOME, "hi");
    } else {
      setPrompts(ENGLISH_PROMPTS);
      // Replace greeting completely with English
      setMessages([
        {
          id: "welcome-en",
          sender: "ai",
          text: ENGLISH_WELCOME,
          timestamp: "Just now",
          lang: "en",
        },
      ]);
      speakText(ENGLISH_WELCOME, "en");
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    handleUserMessage(prompt);
  };

  const lastAiMessage = [...messages].reverse().find((m) => m.sender === "ai");
  const lastUserMessage = [...messages].reverse().find((m) => m.sender === "user");

  return (
    <>
      {/* =========================================================================
          1. FLOATING AI 3D SPHERE TRIGGER (Bottom-Left)
         ========================================================================= */}
      <div className="fixed bottom-5 left-5 sm:bottom-7 sm:left-7 z-[9990] select-none flex items-center gap-3">
        {/* Glowing 3D AI Sphere / Mic Button */}
        <button
          type="button"
          onClick={() => {
            if (!isOpen) {
              if (typeof window !== "undefined" && "speechSynthesis" in window) {
                window.speechSynthesis.resume();
              }
              setIsOpen(true);
              trackInteraction({
                action: "other",
                title: "AI Voice Bot Opened",
                details: "Trigger clicked on bottom-left",
              });
            } else {
              stopSpeaking();
              setIsOpen(false);
            }
          }}
          className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#7c3aed] via-[#A068FF] to-[#22d3ee] p-[2.5px] shadow-[0_8px_30px_rgba(160,104,255,0.7)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
          aria-label={isOpen ? "Close AI Voice Assistant" : "Talk to BPM AI"}
        >
          {/* Ambient Rotating Glowing AI Aura */}
          <span
            className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#A068FF] via-[#22d3ee] to-[#7c3aed] opacity-80 blur-sm group-hover:opacity-100 transition-opacity animate-spin"
            style={{ animationDuration: "5s" }}
          />

          {/* Inner Dark Glass AI Orb */}
          <div className="relative w-full h-full rounded-full bg-[#080216] flex items-center justify-center overflow-hidden border border-white/30">
            {/* Pulsing Core */}
            <span className="absolute inset-1.5 rounded-full bg-gradient-to-tr from-[#7c3aed]/50 to-[#22d3ee]/50 animate-pulse" />

            {/* Icon */}
            {isOpen ? (
              <svg
                className="w-6 h-6 text-white stroke-[3] relative z-10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <div className="relative z-10 flex flex-col items-center justify-center">
                <span className="text-[11px] leading-none mb-0.5 filter drop-shadow">✨</span>
                <svg
                  className="w-5 h-5 text-white fill-none stroke-current"
                  viewBox="0 0 24 24"
                  strokeWidth="2.2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 10v2a7 7 0 0 1-14 0v-2"
                  />
                  <line x1="12" y1="19" x2="12" y2="23" strokeLinecap="round" />
                  <line x1="8" y1="23" x2="16" y2="23" strokeLinecap="round" />
                </svg>
                {/* Audio Waves */}
                <div className="flex items-center gap-0.5 mt-0.5">
                  <span className="w-0.5 h-1.5 bg-[#22d3ee] rounded-full animate-pulse" />
                  <span className="w-0.5 h-2.5 bg-[#A068FF] rounded-full animate-pulse delay-75" />
                  <span className="w-0.5 h-1.5 bg-[#22d3ee] rounded-full animate-pulse delay-150" />
                </div>
              </div>
            )}
          </div>
        </button>

        {/* Floating Pill Label */}
        {!isOpen && (
          <div
            onClick={() => {
              if (typeof window !== "undefined" && "speechSynthesis" in window) {
                window.speechSynthesis.resume();
              }
              setIsOpen(true);
            }}
            className="hidden sm:flex items-center gap-2.5 bg-[#0a0420]/95 hover:bg-[#120738] text-white text-xs font-semibold px-4 py-2.5 rounded-full border border-purple-500/40 shadow-[0_4px_25px_rgba(160,104,255,0.4)] backdrop-blur-md cursor-pointer transition-all hover:scale-105 group"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22d3ee] opacity-80" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22d3ee]" />
            </span>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="tracking-wide text-white group-hover:text-[#A068FF] transition-colors font-bold text-[12px]">
                  {lang === "hi" ? "बीपीएम एआई वॉयस" : "BPM AI Voice"}
                </span>
                <span className="text-[9px] text-[#22d3ee] bg-[#22d3ee]/15 px-1.5 py-0.5 rounded font-extrabold uppercase border border-[#22d3ee]/30">
                  {lang === "hi" ? "हिंदी" : "English"}
                </span>
              </div>
              <span className="text-[10px] text-slate-300 font-normal">
                {lang === "hi"
                  ? "वेबसाइट व सेवाओं के बारे में बोलकर पूछें"
                  : "Tap to talk in English or Hindi"}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* =========================================================================
          2. LUXURY 3D AI VOICE & CHAT MODAL DIALOG
         ========================================================================= */}
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:left-7 z-[9995] flex items-end sm:items-center justify-center p-3 sm:p-0">
          {/* Backdrop on mobile */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm sm:hidden"
            onClick={() => {
              stopSpeaking();
              setIsOpen(false);
            }}
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-md bg-gradient-to-b from-[#130a38] via-[#0b0522] to-[#070319] border border-purple-500/40 rounded-3xl shadow-[0_20px_70px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[88vh] sm:h-[640px] z-10 animate-mark-fade-up">
            {/* Top Glow Bar */}
            <div className="h-1 w-full bg-gradient-to-r from-[#7c3aed] via-[#A068FF] to-[#22d3ee]" />

            {/* Header */}
            <div className="p-3.5 sm:p-4 flex items-center justify-between border-b border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-2.5">
                <div className="relative w-9 h-9 rounded-full bg-gradient-to-tr from-[#7c3aed] to-[#22d3ee] p-[1.5px] shadow-[0_0_15px_rgba(160,104,255,0.7)] flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-[#09041a] flex items-center justify-center">
                    <span className="text-sm">✨</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                    <span>
                      {lang === "hi" ? "बीपीएम एआई वॉयस असिस्टेंट" : "BPM AI Voice Concierge"}
                    </span>
                    <span className="text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold px-1.5 py-0.2 rounded-full">
                      {lang === "hi" ? "ऑनलाइन" : "Online"}
                    </span>
                  </h3>
                  <p className="text-[10.5px] text-slate-300">
                    {lang === "hi"
                      ? "आधिकारिक वेबसाइट व डिजिटल ग्रोथ गाइड"
                      : "Official Website & Agency Growth Guide"}
                  </p>
                </div>
              </div>

              {/* Language Switch & Audio Controls */}
              <div className="flex items-center gap-1.5">
                {/* Language Switch Button */}
                <button
                  type="button"
                  onClick={() => switchLanguage(lang === "en" ? "hi" : "en")}
                  className="px-2.5 py-1 rounded-xl bg-purple-500/20 hover:bg-purple-500/35 text-[11px] font-bold text-white transition-all flex items-center gap-1.5 border border-purple-400/40 shadow-sm cursor-pointer"
                  title="Switch Language / भाषा बदलें"
                >
                  <span className="text-xs">{lang === "en" ? "🇮🇳" : "🇬🇧"}</span>
                  <span>{lang === "en" ? "हिंदी में करें" : "English"}</span>
                </button>

                {/* Mute toggle button */}
                <button
                  type="button"
                  onClick={() => {
                    if (!isMuted && isSpeaking) {
                      stopSpeaking();
                    } else if (isMuted) {
                      if (typeof window !== "undefined" && "speechSynthesis" in window) {
                        window.speechSynthesis.resume();
                      }
                      if (lastAiMessage?.text) {
                        speakText(lastAiMessage.text, lang);
                      }
                    }
                    setIsMuted(!isMuted);
                  }}
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors text-xs cursor-pointer ${
                    isMuted
                      ? "bg-rose-500/25 text-rose-300 border border-rose-500/30"
                      : "bg-white/10 text-white hover:bg-white/20 border border-white/15"
                  }`}
                  title={isMuted ? "Unmute Voice / आवाज़ चालू करें" : "Mute Voice / म्यूट करें"}
                >
                  {isMuted ? "🔇" : "🔊"}
                </button>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => {
                    stopSpeaking();
                    setIsOpen(false);
                  }}
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors text-xs cursor-pointer border border-white/10"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Mode Switch Tabs: Voice Mode vs Chat Mode */}
            <div className="flex border-b border-white/10 bg-black/25 p-1">
              <button
                type="button"
                onClick={() => setMode("voice")}
                className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  mode === "voice"
                    ? "bg-[#A068FF] text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span>🎙️ {lang === "hi" ? "वॉयस मोड" : "Voice Mode"}</span>
                {isSpeaking && <span className="w-1.5 h-1.5 rounded-full bg-[#22d3ee] animate-ping" />}
              </button>

              <button
                type="button"
                onClick={() => setMode("chat")}
                className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  mode === "chat"
                    ? "bg-[#A068FF] text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span>💬 {lang === "hi" ? "चैट मोड" : "Chat Mode"}</span>
              </button>
            </div>

            {/* Dedicated Website Knowledge Banner */}
            <div className="bg-[#180a3c]/85 border-b border-purple-500/30 px-3.5 py-2 flex items-start gap-2 backdrop-blur-md">
              <span className="text-xs shrink-0 mt-0.5">⚡</span>
              <p className="text-[11px] text-purple-200 leading-snug">
                {lang === "hi"
                  ? "वेबसाइट डेवलपमेंट ($699), एसईओ पैकेज ($449/माह), 40,000+ गेस्ट पोस्टिंग व प्राइसिंग की पूरी जानकारी हिंदी में पूछें और सुनें।"
                  : "Ask anything about our Next.js web dev ($699), SEO ($449/mo), 40K+ marketplace, pricing, and audits."}
              </p>
            </div>

            {/* ===================================================================
                BODY: Mode = Voice (Audio-first with complete visible words)
               =================================================================== */}
            {mode === "voice" && (
              <div className="flex-1 flex flex-col justify-between p-4 sm:p-5 overflow-y-auto space-y-3">
                {/* Visual Audio Center */}
                <div className="flex flex-col items-center text-center">
                  <div className="space-y-0.5 mb-2">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#22d3ee]">
                      {lang === "hi" ? "🇮🇳 हिंदी वॉयस डेस्क" : "🇬🇧 Voice Concierge Desk"}
                    </p>
                    <p className="text-xs text-slate-300">
                      {lang === "hi"
                        ? "माइक पर टैप करके अपना सवाल बोलें"
                        : "Tap the microphone to speak your question"}
                    </p>
                  </div>

                  {/* 3D Audio Visualizer Button */}
                  <div className="relative my-2 flex items-center justify-center">
                    {(isListening || isSpeaking) && (
                      <>
                        <span className="absolute w-36 h-36 rounded-full border border-[#22d3ee]/40 animate-ping opacity-60 pointer-events-none" />
                        <span className="absolute w-32 h-32 rounded-full border border-[#A068FF]/50 animate-pulse opacity-75 pointer-events-none" />
                      </>
                    )}

                    <button
                      type="button"
                      onClick={toggleListening}
                      className={`relative w-24 h-24 rounded-full flex flex-col items-center justify-center transition-all duration-300 shadow-2xl cursor-pointer ${
                        isListening
                          ? "bg-gradient-to-tr from-rose-600 to-amber-500 scale-105 shadow-[0_0_40px_rgba(244,63,94,0.7)]"
                          : isSpeaking
                          ? "bg-gradient-to-tr from-[#7c3aed] to-[#22d3ee] scale-105 shadow-[0_0_40px_rgba(34,211,238,0.7)]"
                          : "bg-gradient-to-tr from-[#7c3aed] to-[#A068FF] hover:scale-105 shadow-[0_0_35px_rgba(160,104,255,0.5)]"
                      }`}
                      aria-label="Toggle Voice Input"
                    >
                      <div className="w-20 h-20 rounded-full bg-[#0a0520] flex flex-col items-center justify-center text-white border border-white/20">
                        <svg
                          className="w-7 h-7 fill-none stroke-current mb-0.5"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 10v2a7 7 0 0 1-14 0v-2"
                          />
                          <line x1="12" y1="19" x2="12" y2="23" strokeLinecap="round" />
                          <line x1="8" y1="23" x2="16" y2="23" strokeLinecap="round" />
                        </svg>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-300">
                          {isListening
                            ? lang === "hi"
                              ? "सुन रहा हूँ... बोलिए"
                              : "Listening..."
                            : isSpeaking
                            ? lang === "hi"
                              ? "उत्तर बोल रहा हूँ..."
                              : "Speaking..."
                            : lang === "hi"
                            ? "बोलने के लिए टैप करें"
                            : "Tap to Speak"}
                        </span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Mic Notice (Permissions / Voice Detection) */}
                {micNotice && (
                  <div className="w-full bg-rose-950/60 border border-rose-500/40 rounded-2xl p-2.5 text-xs text-center text-rose-200">
                    {micNotice}
                  </div>
                )}

                {/* Real-time Voice Caption / User Query Display */}
                {isListening && (
                  <div className="w-full bg-emerald-950/40 border border-emerald-500/40 rounded-2xl p-3 text-xs text-center text-emerald-200 animate-pulse">
                    <p className="font-semibold mb-1">
                      {lang === "hi" ? "🎙️ आपकी आवाज़ दर्ज हो रही है:" : "🎙️ Recording your voice:"}
                    </p>
                    <p className="text-white text-sm font-medium">
                      {transcript ? `"${transcript}"` : lang === "hi" ? "बोलिए, मैं सुन रहा हूँ..." : "Speak now, I am listening..."}
                    </p>
                    <button
                      type="button"
                      onClick={stopListening}
                      className="mt-2 text-[10px] bg-emerald-600/40 hover:bg-emerald-600 text-white px-3 py-1 rounded-full border border-emerald-400/40 cursor-pointer"
                    >
                      {lang === "hi" ? "✓ बोलना पूरा हुआ" : "✓ Finished Speaking"}
                    </button>
                  </div>
                )}

                {isThinking && (
                  <div className="w-full bg-amber-950/40 border border-amber-500/40 rounded-2xl p-3 text-xs text-center text-amber-200 animate-pulse">
                    <p className="font-bold flex items-center justify-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                      <span>{lang === "hi" ? "उत्तर तैयार हो रहा है..." : "Analyzing inquiry..."}</span>
                    </p>
                  </div>
                )}

                {/* Prominent Full Written Response Card (Ensuring NO Words Are Cut Off) */}
                {lastAiMessage && !isListening && (
                  <div className="w-full bg-white/[0.06] border border-purple-500/30 rounded-2xl p-3.5 sm:p-4 text-left shadow-lg">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#22d3ee] animate-pulse" />
                        <span className="text-[11px] font-bold text-[#d8b4fe] uppercase tracking-wider">
                          {lang === "hi" ? "✦ एआई का उत्तर (हिंदी में)" : "✦ BPM AI Response"}
                        </span>
                      </div>

                      {/* Replay / Stop Voice Button */}
                      <button
                        type="button"
                        onClick={() => {
                          if (isSpeaking) {
                            stopSpeaking();
                          } else {
                            speakText(lastAiMessage.text, lang);
                          }
                        }}
                        className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold flex items-center gap-1 border border-white/15 cursor-pointer transition-colors"
                        title={isSpeaking ? "Stop Voice" : "Listen / आवाज़ सुनें"}
                      >
                        <span>{isSpeaking ? "⏹️ रोकें" : "🔊 आवाज़ सुनें"}</span>
                      </button>
                    </div>

                    {/* Complete, fully visible written response */}
                    <div className="text-slate-100 text-xs sm:text-[13px] leading-relaxed whitespace-pre-wrap break-words max-h-48 overflow-y-auto pr-1">
                      {lastAiMessage.text}
                    </div>

                    {lastUserMessage && (
                      <div className="mt-3 pt-2 border-t border-white/5 text-[10.5px] text-slate-400 truncate">
                        <span className="text-purple-300 font-semibold">
                          {lang === "hi" ? "आपका सवाल: " : "Your query: "}
                        </span>
                        "{lastUserMessage.text}"
                      </div>
                    )}
                  </div>
                )}

                {/* Quick Topic Chips */}
                <div className="w-full pt-1 flex flex-wrap gap-1.5 justify-center">
                  {prompts.slice(0, 3).map((prompt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleQuickPrompt(prompt)}
                      className="text-[11px] bg-white/[0.07] hover:bg-white/20 text-slate-200 px-3 py-1.5 rounded-full border border-purple-500/30 transition-colors cursor-pointer text-left font-medium"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>

                {/* Quick text input row in Voice mode */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleUserMessage(inputText);
                  }}
                  className="w-full flex items-center gap-2 pt-1"
                >
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={
                      lang === "hi"
                        ? "यहाँ लिखकर भी पूछ सकते हैं (उदा. वेबसाइट का खर्चा)..."
                        : "Or type your inquiry here..."
                    }
                    className="flex-1 bg-white/[0.08] border border-white/20 focus:border-[#A068FF] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim()}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#A068FF] to-[#7c3aed] text-white text-xs font-bold disabled:opacity-40 cursor-pointer shadow-md"
                  >
                    {lang === "hi" ? "भेजें" : "Send"}
                  </button>
                </form>
              </div>
            )}

            {/* ===================================================================
                BODY: Mode = Chat (Threaded history with speech triggers)
               =================================================================== */}
            {mode === "chat" && (
              <div className="flex-1 flex flex-col justify-between overflow-hidden">
                {/* Scrollable Chat Area */}
                <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex flex-col ${
                        m.sender === "user" ? "items-end" : "items-start"
                      }`}
                    >
                      <div
                        className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-[13px] leading-relaxed shadow-sm whitespace-pre-wrap break-words ${
                          m.sender === "user"
                            ? "bg-gradient-to-r from-[#A068FF] to-[#7c3aed] text-white rounded-br-none"
                            : "bg-white/[0.08] border border-purple-500/30 text-slate-100 rounded-bl-none"
                        }`}
                      >
                        {m.text}
                      </div>

                      <div className="flex items-center gap-2 mt-1 px-1 text-[9.5px] text-slate-400">
                        <span>{m.timestamp}</span>
                        {m.sender === "ai" && (
                          <button
                            type="button"
                            onClick={() => {
                              if (isSpeaking) {
                                stopSpeaking();
                              } else {
                                speakText(m.text, lang);
                              }
                            }}
                            className="hover:text-cyan-300 font-semibold cursor-pointer flex items-center gap-0.5"
                            title="Listen to this message / आवाज़ सुनें"
                          >
                            <span>🔊</span>
                            <span>{lang === "hi" ? "आवाज़ सुनें" : "Listen"}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Thinking Indicator */}
                  {isThinking && (
                    <div className="flex items-center gap-2 bg-white/[0.07] border border-purple-500/30 rounded-2xl px-3.5 py-2 w-fit">
                      <span className="w-2 h-2 rounded-full bg-[#A068FF] animate-bounce" />
                      <span className="w-2 h-2 rounded-full bg-[#22d3ee] animate-bounce delay-100" />
                      <span className="w-2 h-2 rounded-full bg-[#A068FF] animate-bounce delay-200" />
                      <span className="text-[11px] text-purple-200 font-medium">
                        {lang === "hi" ? "उत्तर लिखा जा रहा है..." : "Generating response..."}
                      </span>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Dynamic Suggestion Pills */}
                <div className="px-3 py-1.5 flex gap-1.5 overflow-x-auto no-scrollbar border-t border-white/5 bg-black/15">
                  {prompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleQuickPrompt(prompt)}
                      className="whitespace-nowrap text-[10.5px] bg-white/[0.06] hover:bg-white/20 text-slate-200 px-3 py-1 rounded-full border border-purple-500/25 transition-colors cursor-pointer font-medium"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>

                {/* Chat Input Bar */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleUserMessage(inputText);
                  }}
                  className="p-3 border-t border-white/10 bg-white/[0.02] flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={
                      lang === "hi"
                        ? "अपना सवाल यहाँ लिखें या माइक से पूछें..."
                        : "Type your inquiry or website domain..."
                    }
                    className="flex-1 bg-white/[0.07] border border-white/20 focus:border-[#A068FF] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none transition-colors"
                  />

                  {/* Mic Button to speak directly into input */}
                  <button
                    type="button"
                    onClick={toggleListening}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                      isListening
                        ? "bg-rose-600 text-white animate-pulse"
                        : "bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white border border-white/10"
                    }`}
                    title={lang === "hi" ? "बोलकर पूछें" : "Speak your message"}
                  >
                    🎙️
                  </button>

                  {/* Send Button */}
                  <button
                    type="submit"
                    disabled={!inputText.trim()}
                    className="w-9 h-9 rounded-xl bg-gradient-to-r from-[#A068FF] to-[#7c3aed] text-white flex items-center justify-center disabled:opacity-40 transition-all hover:scale-105 cursor-pointer font-bold shadow-md"
                    aria-label="Send Message"
                  >
                    →
                  </button>
                </form>
              </div>
            )}

            {/* Bottom Escalation Strip (WhatsApp + Email Direct) */}
            <div className="p-2.5 bg-black/50 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-300 px-4">
              <span>{lang === "hi" ? "सीधी बातचीत चाहिए?" : "Need direct human expert?"}</span>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://wa.me/917690868932?text=Hi%20Balaji%20Prime%20Media,%20I%20am%20chatting%20with%20your%20AI%20and%20want%20to%20talk%20to%20a%20strategist."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline font-semibold flex items-center gap-1"
                >
                  व्हाट्सएप ↗
                </a>
                <span>•</span>
                <a
                  href="mailto:support@balajiprimemedia.in"
                  className="text-[#22d3ee] hover:underline font-semibold"
                >
                  ईमेल ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
