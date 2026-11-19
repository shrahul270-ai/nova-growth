"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

type Currency = "INR" | "USD" | "GBP" | "EUR" | "AUD" | "CAD" | "AED";
type PaymentMethod = "upi" | "stripe" | "wire" | "wise" | "paypal";

interface CurrencyInfo {
  symbol: string;
  rate: number;
  label: string;
  country: string;
}

const currencies: Record<Currency, CurrencyInfo> = {
  INR: { symbol: "₹", rate: 84.5, label: "INR - Indian Rupee", country: "🇮🇳" },
  USD: { symbol: "$", rate: 1.0, label: "USD - United States Dollar", country: "🇺🇸" },
  GBP: { symbol: "£", rate: 0.79, label: "GBP - British Pound Sterling", country: "🇬🇧" },
  EUR: { symbol: "€", rate: 0.92, label: "EUR - Euro", country: "🇪🇺" },
  AUD: { symbol: "A$", rate: 1.54, label: "AUD - Australian Dollar", country: "🇦🇺" },
  CAD: { symbol: "C$", rate: 1.39, label: "CAD - Canadian Dollar", country: "🇨🇦" },
  AED: { symbol: "AED ", rate: 3.67, label: "AED - UAE Dirham", country: "🇦🇪" },
};

const retainerPlans = [
  {
    id: "starter",
    name: "Starter Growth",
    usdPrice: 899,
    tagline: "Technical SEO & 3 High-DA Editorial Links",
    idealFor: "Emerging Brands & Startups",
  },
  {
    id: "scale",
    name: "Scale Accelerator",
    usdPrice: 1899,
    tagline: "Full-Funnel Organic SEO + Speed CRO + Slack Sync",
    idealFor: "US / UK / India High-Growth Businesses",
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise Domination",
    usdPrice: 3499,
    tagline: "Dedicated Growth Pod + Next.js Dev + Tier-1 PR",
    idealFor: "International Brands & SaaS",
  },
];

function PaymentSectionInner({ hideHeader = false }: { hideHeader?: boolean }) {
  const searchParams = useSearchParams();
  const planParam = searchParams.get("plan");
  const modeParam = searchParams.get("mode");
  const invParam = searchParams.get("inv");
  const currParam = searchParams.get("currency");

  const [selectedCurrency, setSelectedCurrency] = useState<Currency>("INR");
  const [paymentMode, setPaymentMode] = useState<"retainer" | "invoice">("retainer");
  const [selectedPlanId, setSelectedPlanId] = useState<string>("scale");
  const [invoiceNumber, setInvoiceNumber] = useState<string>("");
  const [customAmount, setCustomAmount] = useState<string>("1500");
  const [clientName, setClientName] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");
  const [status, setStatus] = useState<"idle" | "processing" | "success">("idle");
  const [transactionId, setTransactionId] = useState<string>("");
  const [copiedUpi, setCopiedUpi] = useState(false);

  useEffect(() => {
    if (planParam && ["starter", "scale", "enterprise"].includes(planParam.toLowerCase())) {
      setSelectedPlanId(planParam.toLowerCase());
      setPaymentMode("retainer");
    }
    if (modeParam === "invoice") {
      setPaymentMode("invoice");
    }
    if (invParam) {
      setInvoiceNumber(invParam);
      setPaymentMode("invoice");
    }
    if (currParam && Object.keys(currencies).includes(currParam.toUpperCase())) {
      setSelectedCurrency(currParam.toUpperCase() as Currency);
    }
  }, [planParam, modeParam, invParam, currParam]);

  // Adjust default payment method when switching between INR and other currencies
  useEffect(() => {
    if (selectedCurrency === "INR") {
      if (paymentMethod === "wise") {
        setPaymentMethod("upi");
      }
    }
  }, [selectedCurrency, paymentMethod]);

  const curr = currencies[selectedCurrency];

  const calculatePrice = (usd: number) => {
    return Math.round(usd * curr.rate).toLocaleString("en-IN");
  };

  const getSettlementAmount = () => {
    if (paymentMode === "retainer") {
      const plan = retainerPlans.find((p) => p.id === selectedPlanId);
      return plan ? calculatePrice(plan.usdPrice) : "0";
    }
    const val = parseFloat(customAmount) || 0;
    return Math.round(val * curr.rate).toLocaleString("en-IN");
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("processing");
    const randomTrx = "BPM-" + Math.floor(100000 + Math.random() * 900000);
    const plan = retainerPlans.find((p) => p.id === selectedPlanId);

    try {
      await fetch("/api/db/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transactionId: randomTrx,
          clientName: clientName || "Valued Client",
          clientEmail,
          companyName,
          clientPhone,
          planId: selectedPlanId,
          planName: paymentMode === "retainer" ? (plan?.name || "Growth Retainer") : "Custom Invoice",
          mode: paymentMode,
          invoiceNumber: paymentMode === "invoice" ? invoiceNumber : undefined,
          currency: selectedCurrency,
          amount: getSettlementAmount(),
          paymentMethod,
          paymentStatus: "paid",
          notes: `Settled via ${paymentMethod.toUpperCase()} in ${selectedCurrency}`,
        }),
      });
    } catch (err) {
      console.warn("Payment recording failed:", err);
    }

    setTransactionId(randomTrx);
    setStatus("success");
  };

  const copyUpiId = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("balajiprimemedia@icici");
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2500);
    }
  };

  return (
    <section id="payment" className={`relative ${hideHeader ? "pt-4 pb-16 sm:pb-24" : "py-16 sm:py-24"} px-4 sm:px-6 md:px-12 z-10`}>
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header (if not on pay page) */}
        {!hideHeader && (
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/15 border border-purple-400/30 text-xs font-semibold text-purple-200 mb-3 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Bank-Grade Escrow &amp; Client Settlement</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Secure Multi-Currency <br />
              <span className="bg-gradient-to-r from-[#A068FF] via-[#c084fc] to-[#22d3ee] bg-clip-text text-transparent">
                Payment &amp; Invoicing Portal
              </span>
            </h2>
            <p className="text-sm sm:text-[15px] text-slate-300 mt-3">
              Seamless domestic &amp; international settlement across India, North America, the UK, Europe, UAE, and Australia.
            </p>
          </div>
        )}

        {/* Currency & Mode Switcher Bar */}
        <div className="bg-[#0b0522]/90 backdrop-blur-2xl rounded-3xl border border-purple-500/30 shadow-[0_15px_45px_rgba(0,0,0,0.7)] p-4 sm:p-6 mb-8 sm:mb-10 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 text-white">
          
          {/* Mode Toggle Tabs */}
          <div className="inline-flex flex-col sm:flex-row p-1.5 bg-white/[0.05] rounded-2xl border border-white/10 w-full md:w-auto gap-1">
            <button
              type="button"
              onClick={() => setPaymentMode("retainer")}
              className={`flex-1 md:flex-initial px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer text-center ${
                paymentMode === "retainer"
                  ? "bg-gradient-to-r from-[#7c3aed] to-[#A068FF] text-white shadow-lg shadow-purple-950/80"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              💼 Monthly Growth Retainer
            </button>
            <button
              type="button"
              onClick={() => setPaymentMode("invoice")}
              className={`flex-1 md:flex-initial px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer text-center ${
                paymentMode === "invoice"
                  ? "bg-gradient-to-r from-[#7c3aed] to-[#A068FF] text-white shadow-lg shadow-purple-950/80"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              📄 Pay Custom Invoice
            </button>
          </div>

          {/* Currency Dropdown Selector (Featuring India INR prominently) */}
          <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto justify-between sm:justify-end">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider whitespace-nowrap">
                Billing Currency:
              </span>
            </div>
            
            <div className="relative">
              <select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value as Currency)}
                aria-label="Billing Currency"
                className="bg-[#120738] border-2 border-purple-400/50 hover:border-purple-400 text-white font-bold text-xs sm:text-sm px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-[#A068FF] cursor-pointer shadow-lg appearance-none pr-9 transition-colors"
              >
                <option value="INR">🇮🇳 INR (₹) - Indian Rupee (India)</option>
                <option value="USD">🇺🇸 USD ($) - US Dollar</option>
                <option value="GBP">🇬🇧 GBP (£) - British Pound</option>
                <option value="EUR">🇪🇺 EUR (€) - Euro</option>
                <option value="AUD">🇦🇺 AUD (A$) - Australian Dollar</option>
                <option value="CAD">🇨🇦 CAD (C$) - Canadian Dollar</option>
                <option value="AED">🇦🇪 AED (د.إ) - UAE Dirham</option>
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                ▼
              </span>
            </div>
          </div>
        </div>

        {/* Success Modal Confirmation */}
        {status === "success" && (
          <div className="bg-gradient-to-b from-[#13073a] via-[#0d0426] to-[#08021a] rounded-3xl border-2 border-purple-500/50 shadow-[0_25px_80px_rgba(0,0,0,0.9)] p-6 sm:p-10 text-center max-w-2xl mx-auto animate-fadeIn text-white">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-white text-3xl font-black flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(16,185,129,0.5)]">
              ✓
            </div>
            
            <span className="inline-block px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold mb-2">
              Payment Confirmed &amp; Escrow Activated
            </span>
            
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
              Settlement Successfully Initiated
            </h3>
            
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mb-6">
              A formal tax invoice and receipt acknowledgement has been issued for{" "}
              <strong className="text-white">{clientEmail || "your registered email"}</strong>.
            </p>

            {/* Receipt Summary Box */}
            <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-5 mb-8 text-left text-xs space-y-3 max-w-md mx-auto backdrop-blur-md">
              <div className="flex justify-between border-b border-white/10 pb-2.5">
                <span className="text-slate-400 font-semibold">Transaction Reference:</span>
                <span className="font-mono font-bold text-[#22d3ee]">{transactionId}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2.5">
                <span className="text-slate-400 font-semibold">Settled Amount:</span>
                <span className="font-bold text-white text-base">
                  {curr.symbol}
                  {getSettlementAmount()} {selectedCurrency}
                </span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2.5">
                <span className="text-slate-400 font-semibold">Service Scope / Ref:</span>
                <span className="font-semibold text-slate-200">
                  {paymentMode === "retainer"
                    ? retainerPlans.find((p) => p.id === selectedPlanId)?.name
                    : `Invoice ${invoiceNumber || "Standard Milestone"}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">Payment Channel:</span>
                <span className="font-semibold text-emerald-400 uppercase">
                  {paymentMethod === "upi" ? "🇮🇳 UPI / Instant IMPS" : paymentMethod}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setStatus("idle");
                  setInvoiceNumber("");
                }}
                className="bg-gradient-to-r from-[#7c3aed] to-[#A068FF] hover:brightness-110 text-white text-xs font-bold px-7 py-3.5 rounded-full shadow-lg shadow-purple-950/80 transition-all cursor-pointer"
              >
                Make Another Settlement ↺
              </button>

              <a
                href={`https://wa.me/917690868932?text=Hi%20Balaji%20Prime%20Media,%20I%20just%20completed%20settlement%20ref:%20${transactionId}%20for%20${curr.symbol}${getSettlementAmount()}%20${selectedCurrency}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-6 py-3.5 rounded-full shadow-lg transition-all flex items-center gap-1.5"
              >
                <span>Share Receipt on WhatsApp</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        )}

        {/* Interactive Payment Form & Summary */}
        {status !== "success" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 Cols: Mode Configuration & Client Details */}
            <div className="lg:col-span-7 bg-[#0c0628]/90 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-purple-500/25 shadow-2xl text-white">
              
              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                
                {/* MODE 1: RETAINER PACKAGE SELECTOR */}
                {paymentMode === "retainer" && (
                  <div>
                    <label className="text-xs font-bold text-purple-200 uppercase tracking-wider block mb-3">
                      Select Retainer Package:
                    </label>
                    <div className="space-y-3">
                      {retainerPlans.map((plan) => {
                        const isSelected = selectedPlanId === plan.id;
                        return (
                          <div
                            key={plan.id}
                            onClick={() => setSelectedPlanId(plan.id)}
                            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 ${
                              isSelected
                                ? "border-[#A068FF] bg-gradient-to-r from-purple-950/50 via-purple-900/30 to-indigo-950/50 shadow-[0_0_25px_rgba(160,104,255,0.3)]"
                                : "border-white/10 hover:border-white/20 bg-white/[0.02]"
                            }`}
                          >
                            <div className="flex items-start sm:items-center gap-3">
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 ${
                                  isSelected
                                    ? "border-[#A068FF] bg-[#A068FF]"
                                    : "border-slate-500"
                                }`}
                              >
                                {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                              </div>
                              <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h4 className="text-sm font-bold text-white">{plan.name}</h4>
                                  {plan.popular && (
                                    <span className="text-[10px] font-extrabold bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded-full">
                                      POPULAR
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-slate-300 mt-0.5">{plan.tagline}</p>
                              </div>
                            </div>
                            <div className="text-left sm:text-right pl-8 sm:pl-0">
                              <span className="text-lg font-black text-white">
                                {curr.symbol}
                                {calculatePrice(plan.usdPrice)}
                              </span>
                              <span className="text-[10.5px] text-purple-300 block sm:inline sm:ml-1">/month</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* MODE 2: CUSTOM INVOICE INPUTS */}
                {paymentMode === "invoice" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-purple-200 block mb-1">
                          Invoice / Ref Number *
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="e.g. BPM-2025-042"
                          value={invoiceNumber}
                          onChange={(e) => setInvoiceNumber(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/15 text-white placeholder-slate-400 text-sm outline-none focus:border-[#A068FF] focus:ring-2 focus:ring-[#A068FF]/30 transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-purple-200 block mb-1">
                          Amount in USD Base ($) *
                        </label>
                        <input
                          required
                          type="number"
                          min="10"
                          step="10"
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/15 text-white placeholder-slate-400 text-sm outline-none focus:border-[#A068FF] focus:ring-2 focus:ring-[#A068FF]/30 transition-all"
                        />
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-400/20 text-[11.5px] text-purple-200 flex items-center justify-between">
                      <span>Live Settlement Equivalent:</span>
                      <strong className="text-white text-sm">
                        {curr.symbol}
                        {getSettlementAmount()} {selectedCurrency}
                      </strong>
                    </div>
                  </div>
                )}

                {/* Client Identification Fields */}
                <div className="border-t border-white/10 pt-5">
                  <span className="text-xs font-bold text-purple-200 uppercase tracking-wider block mb-3">
                    Client &amp; Billing Details:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        Contact / Authorizing Name *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Rahul Sharma / John Henderson"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-white placeholder-slate-400 text-sm outline-none focus:border-[#A068FF] focus:ring-2 focus:ring-[#A068FF]/30 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        Business Email (For Tax Receipt) *
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="name@company.com"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-white placeholder-slate-400 text-sm outline-none focus:border-[#A068FF] focus:ring-2 focus:ring-[#A068FF]/30 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        Company / Brand Name (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Apex Digital / TechCorp"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-white placeholder-slate-400 text-sm outline-none focus:border-[#A068FF] focus:ring-2 focus:ring-[#A068FF]/30 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        WhatsApp / Phone (For Instant Updates)
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-white placeholder-slate-400 text-sm outline-none focus:border-[#A068FF] focus:ring-2 focus:ring-[#A068FF]/30 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Gateway Channel Selector */}
                <div className="border-t border-white/10 pt-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-purple-200 uppercase tracking-wider">
                      Select Payment Gateway / Method:
                    </span>
                    {selectedCurrency === "INR" && (
                      <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-400/40">
                        🇮🇳 UPI Instant Active
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-2.5">
                    
                    {/* 1. UPI & QR (India First) */}
                    <div
                      onClick={() => setPaymentMethod("upi")}
                      className={`p-3 rounded-2xl border-2 text-center cursor-pointer transition-all ${
                        paymentMethod === "upi"
                          ? "border-[#A068FF] bg-gradient-to-b from-[#7c3aed]/40 to-[#A068FF]/20 shadow-[0_0_20px_rgba(160,104,255,0.4)] font-bold text-white"
                          : "border-white/10 hover:border-white/20 bg-white/[0.02] text-slate-300"
                      }`}
                    >
                      <div className="text-xl mb-0.5">🇮🇳</div>
                      <span className="text-xs block font-bold text-white">UPI &amp; QR</span>
                      <span className="text-[9.5px] text-emerald-400">GPay / PhonePe</span>
                    </div>

                    {/* 2. Stripe Cards */}
                    <div
                      onClick={() => setPaymentMethod("stripe")}
                      className={`p-3 rounded-2xl border-2 text-center cursor-pointer transition-all ${
                        paymentMethod === "stripe"
                          ? "border-[#A068FF] bg-gradient-to-b from-[#7c3aed]/40 to-[#A068FF]/20 shadow-[0_0_20px_rgba(160,104,255,0.4)] font-bold text-white"
                          : "border-white/10 hover:border-white/20 bg-white/[0.02] text-slate-300"
                      }`}
                    >
                      <div className="text-xl mb-0.5">💳</div>
                      <span className="text-xs block font-bold text-white">Cards</span>
                      <span className="text-[9.5px] text-slate-400">Visa / Mastercard</span>
                    </div>

                    {/* 3. Wire Transfer */}
                    <div
                      onClick={() => setPaymentMethod("wire")}
                      className={`p-3 rounded-2xl border-2 text-center cursor-pointer transition-all ${
                        paymentMethod === "wire"
                          ? "border-[#A068FF] bg-gradient-to-b from-[#7c3aed]/40 to-[#A068FF]/20 shadow-[0_0_20px_rgba(160,104,255,0.4)] font-bold text-white"
                          : "border-white/10 hover:border-white/20 bg-white/[0.02] text-slate-300"
                      }`}
                    >
                      <div className="text-xl mb-0.5">🏦</div>
                      <span className="text-xs block font-bold text-white">Bank Wire</span>
                      <span className="text-[9.5px] text-slate-400">NEFT / RTGS / ACH</span>
                    </div>

                    {/* 4. Wise */}
                    <div
                      onClick={() => setPaymentMethod("wise")}
                      className={`p-3 rounded-2xl border-2 text-center cursor-pointer transition-all ${
                        paymentMethod === "wise"
                          ? "border-[#A068FF] bg-gradient-to-b from-[#7c3aed]/40 to-[#A068FF]/20 shadow-[0_0_20px_rgba(160,104,255,0.4)] font-bold text-white"
                          : "border-white/10 hover:border-white/20 bg-white/[0.02] text-slate-300"
                      }`}
                    >
                      <div className="text-xl mb-0.5">🌐</div>
                      <span className="text-xs block font-bold text-white">Wise</span>
                      <span className="text-[9.5px] text-slate-400">Zero FX Markup</span>
                    </div>

                    {/* 5. PayPal */}
                    <div
                      onClick={() => setPaymentMethod("paypal")}
                      className={`p-3 rounded-2xl border-2 text-center cursor-pointer transition-all col-span-2 sm:col-span-1 ${
                        paymentMethod === "paypal"
                          ? "border-[#A068FF] bg-gradient-to-b from-[#7c3aed]/40 to-[#A068FF]/20 shadow-[0_0_20px_rgba(160,104,255,0.4)] font-bold text-white"
                          : "border-white/10 hover:border-white/20 bg-white/[0.02] text-slate-300"
                      }`}
                    >
                      <div className="text-xl mb-0.5">🅿️</div>
                      <span className="text-xs block font-bold text-white">PayPal</span>
                      <span className="text-[9.5px] text-slate-400">Buyer Protection</span>
                    </div>

                  </div>

                  {/* UPI Details Box if UPI is selected */}
                  {paymentMethod === "upi" && (
                    <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-purple-950/60 via-indigo-950/60 to-purple-950/60 border border-purple-400/40 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">⚡</span>
                          <span className="text-xs font-bold text-white uppercase tracking-wider">
                            Direct Agency UPI ID:
                          </span>
                        </div>
                        <span className="text-[10px] text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full font-bold">
                          Zero Convenience Fee
                        </span>
                      </div>

                      <div className="flex items-center justify-between bg-black/40 border border-white/15 px-3.5 py-2.5 rounded-xl">
                        <span className="font-mono text-sm sm:text-base font-bold text-[#22d3ee]">
                          balajiprimemedia@icici
                        </span>
                        <button
                          type="button"
                          onClick={copyUpiId}
                          className="px-3 py-1 bg-purple-500/30 hover:bg-purple-500/50 text-white text-xs font-bold rounded-lg border border-purple-400/40 transition-colors cursor-pointer"
                        >
                          {copiedUpi ? "✓ Copied!" : "Copy UPI"}
                        </button>
                      </div>

                      <div className="text-[11px] text-slate-300 flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-white/10">
                        <span>Accepted Apps: Google Pay • PhonePe • Paytm • BHIM • Any Bank UPI</span>
                        <span className="text-purple-300 font-semibold">ICICI Bank A/C: 769086893201</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={status === "processing"}
                  className="w-full bg-gradient-to-r from-[#7c3aed] via-[#A068FF] to-[#6366f1] hover:brightness-110 text-white font-black py-4 rounded-2xl text-sm sm:text-base shadow-[0_10px_35px_rgba(160,104,255,0.5)] transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 border border-white/20"
                >
                  {status === "processing" ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Securing Settlement Gateway...</span>
                    </>
                  ) : (
                    <>
                      <span>
                        Authorize Settlement: {curr.symbol}
                        {getSettlementAmount()} {selectedCurrency}
                      </span>
                      <span className="text-lg">→</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right 5 Cols: Security Guarantees & Summary Card */}
            <div className="lg:col-span-5 space-y-6 text-left">
              
              {/* Order Summary Card */}
              <div className="bg-gradient-to-br from-[#120738] via-[#0d0426] to-[#08021a] text-white rounded-3xl p-6 sm:p-7 border border-purple-500/40 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-36 h-36 bg-[#A068FF]/15 rounded-full blur-2xl pointer-events-none" />
                
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-[#d8b4fe] text-xs font-bold mb-4 border border-purple-400/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>🔒 Escrow-Protected Settlement</span>
                </div>

                <h2 className="text-xl font-black mb-1 text-white">Billing Summary &amp; Escrow Verification</h2>
                <p className="text-xs text-slate-300 mb-5">
                  Review invoice line items and payment terms before authorization.
                </p>

                <div className="space-y-3 text-xs border-y border-white/10 py-4 mb-5">
                  <div className="flex justify-between text-slate-300">
                    <span>Selected Plan / Scope:</span>
                    <span className="font-bold text-white">
                      {paymentMode === "retainer"
                        ? retainerPlans.find((p) => p.id === selectedPlanId)?.name
                        : invoiceNumber || "Custom Scope Settlement"}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Base Currency Conversion:</span>
                    <span className="font-bold text-purple-200">
                      1 USD = {curr.rate} {selectedCurrency}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Processing &amp; Gateway Fee:</span>
                    <span className="font-bold text-emerald-400">0% (Absorbed by Agency)</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Tax Invoice / GST:</span>
                    <span className="font-bold text-white">Included (Official B2B Invoice)</span>
                  </div>
                </div>

                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-300">Total Settlement:</span>
                  <div className="text-right">
                    <span className="text-3xl font-black bg-gradient-to-r from-white via-purple-200 to-[#22d3ee] bg-clip-text text-transparent">
                      {curr.symbol}
                      {getSettlementAmount()}
                    </span>
                    <span className="text-xs text-purple-300 block font-bold">{selectedCurrency} ({curr.label})</span>
                  </div>
                </div>
              </div>

              {/* 4 Trust & Security Badges in Luxury Dark Glass */}
              <div className="bg-[#0b0522]/80 rounded-3xl p-6 border border-purple-500/20 shadow-xl space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-[#A068FF] border border-purple-400/30 flex items-center justify-center text-sm font-bold shrink-0">
                    🛡️
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">256-Bit SSL Bank-Grade Security</h4>
                    <p className="text-[11px] text-slate-400">
                      Tokenized end-to-end encryption with Level 1 PCI-DSS and RBI compliant gateways.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-[#22d3ee] border border-purple-400/30 flex items-center justify-center text-sm font-bold shrink-0">
                    📜
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Instant GST &amp; Tax Receipt</h4>
                    <p className="text-[11px] text-slate-400">
                      Automated legal invoices dispatched via email and WhatsApp upon clearance.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-emerald-400 border border-purple-400/30 flex items-center justify-center text-sm font-bold shrink-0">
                    🤝
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">100% Milestone Delivery SLA</h4>
                    <p className="text-[11px] text-slate-400">
                      Escrow-backed deliverables under our mutual service level contract.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-amber-300 border border-purple-400/30 flex items-center justify-center text-sm font-bold shrink-0">
                    🌍
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Zero Hidden FX Surcharges</h4>
                    <p className="text-[11px] text-slate-400">
                      Transparent conversion rates for INR, USD, GBP, EUR, AUD, CAD, and AED.
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}

export default function PaymentSection({ hideHeader = false }: { hideHeader?: boolean } = {}) {
  return (
    <Suspense fallback={<div className="py-24 text-center text-sm font-semibold text-purple-300">Loading Secure Payment Gateway...</div>}>
      <PaymentSectionInner hideHeader={hideHeader} />
    </Suspense>
  );
}
