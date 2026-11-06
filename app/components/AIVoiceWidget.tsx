"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackInteraction } from "@/lib/tracker";

interface Message {
  id: string;
  sender: "ai" | "user";
  text: string;
  timestamp: string;
}

export default function AIVoiceWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"voice" | "chat">("voice");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "Hello! Welcome to Balaji Prime Media. I am your 24/7 AI Concierge. We help UK, US, and worldwide brands scale organic revenue through manual DR 50–90+ editorial outreach and technical Next.js engineering. How may I assist your business today?",
      timestamp: "Just now",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Hide on admin portal
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  // Setup Web Speech Recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = "en-GB"; // UK & International English

        recognition.onstart = () => {
          setIsListening(true);
        };

        recognition.onresult = (event: any) => {
          let currentTranscript = "";
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            currentTranscript += event.results[i][0].transcript;
          }
          setTranscript(currentTranscript);
          if (event.results[0].isFinal) {
            handleUserMessage(currentTranscript);
          }
        };

        recognition.onerror = (event: any) => {
          console.warn("Speech recognition error:", event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  // Text-to-Speech synthesis
  const speakText = (text: string) => {
    if (isMuted || typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-GB";
      utterance.rate = 1.0;
      utterance.pitch = 1.05;

      // Select high-quality British/International voice if available
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(
        (v) =>
          (v.lang === "en-GB" || v.lang === "en_GB") &&
          (v.name.includes("Google") || v.name.includes("Natural") || v.name.includes("Female") || v.name.includes("Daniel"))
      ) || voices.find((v) => v.lang.startsWith("en"));

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      speechSynthRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn("Speech synthesis error:", err);
      setIsSpeaking(false);
    }
  };

  const toggleListening = () => {
    if (isSpeaking) {
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
    }

    if (isListening) {
      try {
        recognitionRef.current?.stop();
      } catch {}
      setIsListening(false);
    } else {
      setTranscript("");
      try {
        recognitionRef.current?.start();
      } catch (err) {
        console.warn("Error starting speech recognition:", err);
      }
    }
  };

  // Send message to AI endpoint
  const handleUserMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

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
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setTranscript("");
    setIsThinking(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: messages.slice(-4).map((m) => ({
            role: m.sender === "ai" ? "assistant" : "user",
            content: m.text,
          })),
        }),
      });

      const data = await res.json();
      const aiReply =
        data?.reply ||
        "I am here to assist you with our DR 50–90+ guest posting outreach and SEO roadmap. You can reach our senior team 24/7 on WhatsApp at +91 76908 68932.";

      const aiMsg: Message = {
        id: String(Date.now() + 1),
        sender: "ai",
        text: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsThinking(false);

      // Auto-speak reply if in voice mode or not muted
      speakText(aiReply);

      // If user shared contact, auto-save to database leads
      const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(trimmed);
      const hasPhone = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4,}/.test(trimmed);
      if (hasEmail || hasPhone || data?.leadCaptured) {
        fetch("/api/db/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "ai_voice_bot",
            name: "Worldwide AI Inquirer",
            email: hasEmail ? trimmed.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)?.[0] : "",
            phone: hasPhone ? trimmed.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4,}/)?.[0] : "",
            service: "UK / Global SEO & Guest Posting Consultation",
            message: `User message through AI Concierge: "${trimmed}"`,
            sourceUrl: typeof window !== "undefined" ? window.location.pathname : "/",
          }),
        }).catch(() => {});
      }
    } catch {
      setIsThinking(false);
      const fallbackReply =
        "Our editorial outreach team is standing by. You can message us immediately on WhatsApp at +91 76908 68932 or email support@balajiprimemedia.in.";
      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 2),
          sender: "ai",
          text: fallbackReply,
          timestamp: "Just now",
        },
      ]);
      speakText(fallbackReply);
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    handleUserMessage(prompt);
  };

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
            setIsOpen(!isOpen);
            if (!isOpen) {
              trackInteraction({
                action: "other",
                title: "AI Voice Bot Opened",
                details: "Trigger clicked on bottom-left",
              });
            } else {
              window.speechSynthesis?.cancel();
              setIsSpeaking(false);
            }
          }}
          className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#7c3aed] via-[#A068FF] to-[#22d3ee] p-[2.5px] shadow-[0_8px_30px_rgba(160,104,255,0.6)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
          aria-label={isOpen ? "Close AI Voice Assistant" : "Talk to BPM AI"}
        >
          {/* Ambient Rotating Conic Glow */}
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#A068FF] via-[#22d3ee] to-[#7c3aed] opacity-75 blur-sm group-hover:opacity-100 transition-opacity animate-spin" style={{ animationDuration: "6s" }} />

          {/* Inner Dark Glass Orb */}
          <div className="relative w-full h-full rounded-full bg-[#09041a] flex items-center justify-center overflow-hidden border border-white/20">
            {/* Pulsing Core */}
            <span className="absolute inset-2 rounded-full bg-gradient-to-tr from-[#7c3aed]/40 to-[#22d3ee]/40 animate-pulse" />

            {/* Icon: When open show X, when closed show 3D Mic & Audio waves */}
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
                {/* 3D Mic Icon with Soundwaves */}
                <svg className="w-6 h-6 text-white fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="23" strokeLinecap="round" />
                  <line x1="8" y1="23" x2="16" y2="23" strokeLinecap="round" />
                </svg>
                {/* Mini audio indicator bars */}
                <div className="flex items-center gap-0.5 mt-0.5">
                  <span className="w-0.5 h-1.5 bg-[#22d3ee] rounded-full animate-pulse" />
                  <span className="w-0.5 h-2.5 bg-[#A068FF] rounded-full animate-pulse delay-75" />
                  <span className="w-0.5 h-1.5 bg-[#22d3ee] rounded-full animate-pulse delay-150" />
                </div>
              </div>
            )}
          </div>
        </button>

        {/* Floating Pill Label ("Talk to BPM AI" with Online Dot) */}
        {!isOpen && (
          <div
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-2 bg-[#0d0727]/90 hover:bg-[#150a3a] text-white text-xs font-semibold px-3.5 py-2 rounded-full border border-purple-500/30 shadow-xl backdrop-blur-md cursor-pointer transition-all hover:scale-105 group"
          >
            {/* Live Green Online Dot */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="tracking-wide group-hover:text-[#A068FF] transition-colors">
              Talk to BPM AI
            </span>
            <span className="text-[10px] text-[#22d3ee] bg-[#22d3ee]/10 px-1.5 py-0.2 rounded-md font-bold uppercase">
              24/7 Global
            </span>
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
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-md bg-gradient-to-b from-[#130a38] via-[#0b0522] to-[#070319] border border-purple-500/40 rounded-3xl shadow-[0_20px_70px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[85vh] sm:h-[620px] z-10 animate-mark-fade-up">
            {/* Top Atmospheric Glow Bar */}
            <div className="h-1 w-full bg-gradient-to-r from-[#7c3aed] via-[#A068FF] to-[#22d3ee]" />

            {/* Header */}
            <div className="p-4 sm:p-5 flex items-center justify-between border-b border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                {/* Mini Glowing Orb */}
                <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-[#7c3aed] to-[#22d3ee] p-[1.5px] shadow-[0_0_15px_rgba(160,104,255,0.7)] flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-[#09041a] flex items-center justify-center">
                    <span className="text-base">🎙️</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
                    <span>BPM AI Voice Concierge</span>
                    <span className="text-[9.5px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold px-1.5 py-0.2 rounded-full">
                      Live
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-300">
                    UK, US &amp; Global Client Advisory
                  </p>
                </div>
              </div>

              {/* Mode Toggle & Close Button */}
              <div className="flex items-center gap-1.5">
                {/* Mute toggle button */}
                <button
                  type="button"
                  onClick={() => {
                    if (!isMuted && isSpeaking) {
                      window.speechSynthesis?.cancel();
                      setIsSpeaking(false);
                    }
                    setIsMuted(!isMuted);
                  }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors text-xs ${
                    isMuted ? "bg-red-500/20 text-red-300" : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                  title={isMuted ? "Unmute Voice" : "Mute Voice"}
                >
                  {isMuted ? "🔇" : "🔊"}
                </button>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => {
                    window.speechSynthesis?.cancel();
                    setIsSpeaking(false);
                    setIsOpen(false);
                  }}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors text-sm"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Mode Switch Tabs: Voice Mode vs Chat Mode */}
            <div className="flex border-b border-white/10 bg-black/20 p-1">
              <button
                type="button"
                onClick={() => setMode("voice")}
                className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  mode === "voice"
                    ? "bg-[#A068FF] text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span>🎙️ Voice Mode</span>
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
                <span>💬 Chat Mode</span>
              </button>
            </div>

            {/* BODY: Mode = Voice */}
            {mode === "voice" && (
              <div className="flex-1 flex flex-col items-center justify-between p-6 text-center overflow-y-auto">
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#22d3ee]">
                    Interactive Voice Conversation
                  </p>
                  <p className="text-[13px] text-slate-300">
                    Ask about UK/US outreach, DR 50–90+ sites, or pricing.
                  </p>
                </div>

                {/* 3D Reactive Audio Sphere Visualizer */}
                <div className="relative my-8 flex items-center justify-center">
                  {/* Outer soundwave rings */}
                  {(isListening || isSpeaking) && (
                    <>
                      <span className="absolute w-44 h-44 rounded-full border border-[#22d3ee]/30 animate-ping opacity-60 pointer-events-none" />
                      <span className="absolute w-36 h-36 rounded-full border border-[#A068FF]/50 animate-pulse opacity-75 pointer-events-none" />
                    </>
                  )}

                  {/* Main Interactive Mic Orb */}
                  <button
                    type="button"
                    onClick={toggleListening}
                    className={`relative w-28 h-28 rounded-full flex flex-col items-center justify-center transition-all duration-300 shadow-2xl cursor-pointer ${
                      isListening
                        ? "bg-gradient-to-tr from-rose-600 to-amber-500 scale-105 shadow-[0_0_40px_rgba(244,63,94,0.7)]"
                        : isSpeaking
                        ? "bg-gradient-to-tr from-[#7c3aed] to-[#22d3ee] scale-105 shadow-[0_0_40px_rgba(34,211,238,0.7)]"
                        : "bg-gradient-to-tr from-[#7c3aed] to-[#A068FF] hover:scale-105 shadow-[0_0_35px_rgba(160,104,255,0.5)]"
                    }`}
                  >
                    <div className="w-24 h-24 rounded-full bg-[#0a0520] flex flex-col items-center justify-center text-white border border-white/20">
                      <svg
                        className="w-8 h-8 fill-none stroke-current mb-1"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 10v2a7 7 0 0 1-14 0v-2" />
                        <line x1="12" y1="19" x2="12" y2="23" strokeLinecap="round" />
                        <line x1="8" y1="23" x2="16" y2="23" strokeLinecap="round" />
                      </svg>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
                        {isListening ? "Listening..." : isSpeaking ? "Speaking..." : "Tap to Speak"}
                      </span>
                    </div>
                  </button>
                </div>

                {/* Real-time Voice Caption Box */}
                <div className="w-full bg-white/[0.05] border border-white/10 rounded-2xl p-3.5 min-h-[64px] flex items-center justify-center text-xs text-slate-200">
                  {isListening && transcript && (
                    <p className="text-white font-medium italic">"{transcript}"</p>
                  )}
                  {isListening && !transcript && (
                    <p className="text-emerald-300 animate-pulse font-medium">Listening to your voice... Speak now</p>
                  )}
                  {isSpeaking && (
                    <p className="text-[#22d3ee] font-medium flex items-center gap-1.5">
                      <span>✦ BPM AI is answering...</span>
                    </p>
                  )}
                  {isThinking && (
                    <p className="text-amber-300 animate-pulse font-medium">Analyzing agency database...</p>
                  )}
                  {!isListening && !isSpeaking && !isThinking && (
                    <p className="text-slate-400">
                      Tap the microphone above to start talking, or switch to Chat Mode below.
                    </p>
                  )}
                </div>

                {/* Quick Voice Prompt Chips */}
                <div className="w-full pt-4 flex flex-wrap gap-1.5 justify-center">
                  <button
                    type="button"
                    onClick={() => handleQuickPrompt("What are your guest posting packages?")}
                    className="text-[11px] bg-white/[0.06] hover:bg-white/10 text-slate-300 hover:text-white px-2.5 py-1 rounded-full border border-white/10 transition-colors"
                  >
                    Pricing &amp; DR Tiers
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickPrompt("Tell me about UK and US guest posting")}
                    className="text-[11px] bg-white/[0.06] hover:bg-white/10 text-slate-300 hover:text-white px-2.5 py-1 rounded-full border border-white/10 transition-colors"
                  >
                    UK &amp; US Placements
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickPrompt("How do I book a meeting with leadership?")}
                    className="text-[11px] bg-white/[0.06] hover:bg-white/10 text-slate-300 hover:text-white px-2.5 py-1 rounded-full border border-white/10 transition-colors"
                  >
                    Book a Strategy Call
                  </button>
                </div>
              </div>
            )}

            {/* BODY: Mode = Chat */}
            {mode === "chat" && (
              <div className="flex-1 flex flex-col justify-between overflow-hidden">
                {/* Scrollable Chat Area */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex flex-col ${
                        m.sender === "user" ? "items-end" : "items-start"
                      }`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-[13px] leading-relaxed shadow-sm ${
                          m.sender === "user"
                            ? "bg-[#A068FF] text-white rounded-br-none"
                            : "bg-white/[0.07] border border-white/10 text-slate-200 rounded-bl-none"
                        }`}
                      >
                        {m.text}
                      </div>
                      <span className="text-[9.5px] text-slate-500 mt-1 px-1">
                        {m.timestamp}
                      </span>
                    </div>
                  ))}

                  {/* Thinking Indicator */}
                  {isThinking && (
                    <div className="flex items-center gap-1.5 bg-white/[0.05] border border-white/10 rounded-2xl px-3 py-2 w-24">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A068FF] animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22d3ee] animate-bounce delay-100" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A068FF] animate-bounce delay-200" />
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Suggestion Pills */}
                <div className="px-3 py-1.5 flex gap-1.5 overflow-x-auto no-scrollbar border-t border-white/5 bg-black/10">
                  <button
                    type="button"
                    onClick={() => handleQuickPrompt("What are your guest posting DR tiers?")}
                    className="whitespace-nowrap text-[10.5px] bg-white/[0.05] hover:bg-white/10 text-slate-300 hover:text-white px-2.5 py-1 rounded-full border border-white/10 transition-colors"
                  >
                    DR 50–90+ List
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickPrompt("Can you run a free SEO audit on my website?")}
                    className="whitespace-nowrap text-[10.5px] bg-white/[0.05] hover:bg-white/10 text-slate-300 hover:text-white px-2.5 py-1 rounded-full border border-white/10 transition-colors"
                  >
                    Free SEO Audit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickPrompt("I want to discuss our budget with your team")}
                    className="whitespace-nowrap text-[10.5px] bg-white/[0.05] hover:bg-white/10 text-slate-300 hover:text-white px-2.5 py-1 rounded-full border border-white/10 transition-colors"
                  >
                    Talk with Leadership
                  </button>
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
                    placeholder="Type your inquiry or website domain..."
                    className="flex-1 bg-white/[0.06] border border-white/15 focus:border-[#A068FF] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none transition-colors"
                  />

                  {/* Mic Button to speak directly into input */}
                  <button
                    type="button"
                    onClick={toggleListening}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                      isListening
                        ? "bg-rose-600 text-white animate-pulse"
                        : "bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white"
                    }`}
                    title="Speak into message"
                  >
                    🎙️
                  </button>

                  {/* Send Button */}
                  <button
                    type="submit"
                    disabled={!inputText.trim()}
                    className="w-9 h-9 rounded-xl bg-gradient-to-r from-[#A068FF] to-[#7c3aed] text-white flex items-center justify-center disabled:opacity-40 transition-all hover:scale-105 cursor-pointer font-bold"
                    aria-label="Send Message"
                  >
                    →
                  </button>
                </form>
              </div>
            )}

            {/* Bottom Escalation Strip (WhatsApp + Call Direct) */}
            <div className="p-2.5 bg-black/40 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400 px-4">
              <span>Need human assistance immediately?</span>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://wa.me/917690868932?text=Hi%20Balaji%20Prime%20Media,%20I%20am%20chatting%20with%20your%20AI%20and%20want%20to%20talk%20to%20a%20strategist."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline font-semibold flex items-center gap-1"
                >
                  WhatsApp ↗
                </a>
                <span>•</span>
                <a
                  href="mailto:support@balajiprimemedia.in"
                  className="text-[#22d3ee] hover:underline font-semibold"
                >
                  Email ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
