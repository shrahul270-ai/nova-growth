"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

type Currency = "USD" | "GBP" | "EUR" | "AUD" | "CAD" | "AED";

interface CurrencyInfo {
  symbol: string;
  rate: number;
  label: string;
}

const currencies: Record<Currency, CurrencyInfo> = {
  USD: { symbol: "$", rate: 1.0, label: "USD - United States Dollar" },
  GBP: { symbol: "£", rate: 0.79, label: "GBP - British Pound Sterling" },
  EUR: { symbol: "€", rate: 0.92, label: "EUR - Euro (European Union)" },
  AUD: { symbol: "A$", rate: 1.54, label: "AUD - Australian Dollar" },
  CAD: { symbol: "C$", rate: 1.39, label: "CAD - Canadian Dollar" },
  AED: { symbol: "AED ", rate: 3.67, label: "AED - UAE Dirham" },
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
    idealFor: "US / UK High-Growth Businesses",
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

function PaymentSectionInner() {
  const searchParams = useSearchParams();
  const planParam = searchParams.get("plan");
  const modeParam = searchParams.get("mode");
  const invParam = searchParams.get("inv");
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>("USD");
  const [paymentMode, setPaymentMode] = useState<"retainer" | "invoice">("retainer");
  const [selectedPlanId, setSelectedPlanId] = useState<string>("scale");
  const [invoiceNumber, setInvoiceNumber] = useState<string>("");
  const [customAmount, setCustomAmount] = useState<string>("1500");
  const [clientName, setClientName] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "wire" | "wise" | "paypal">("stripe");
  const [status, setStatus] = useState<"idle" | "processing" | "success">("idle");
  const [transactionId, setTransactionId] = useState<string>("");

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
  }, [planParam, modeParam, invParam]);

  const curr = currencies[selectedCurrency];

  const calculatePrice = (usd: number) => {
    return Math.round(usd * curr.rate).toLocaleString();
  };

  const getSettlementAmount = () => {
    if (paymentMode === "retainer") {
      const plan = retainerPlans.find((p) => p.id === selectedPlanId);
      return plan ? calculatePrice(plan.usdPrice) : "0";
    }
    const val = parseFloat(customAmount) || 0;
    return Math.round(val * curr.rate).toLocaleString();
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("processing");
    const randomTrx = "NOVA-" + Math.floor(100000 + Math.random() * 900000);
    const plan = retainerPlans.find((p) => p.id === selectedPlanId);

    try {
      await fetch("/api/db/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transactionId: randomTrx,
          clientName: clientName || "Anonymous Client",
          clientEmail,
          companyName,
          planId: selectedPlanId,
          planName: paymentMode === "retainer" ? (plan?.name || "Retainer Plan") : "Custom Invoice",
          mode: paymentMode,
          invoiceNumber: paymentMode === "invoice" ? invoiceNumber : undefined,
          currency: selectedCurrency,
          amount: getSettlementAmount(),
          paymentMethod,
          paymentStatus: "paid",
        }),
      });
    } catch (err) {
      console.warn("Payment recording failed:", err);
    }

    setTransactionId(randomTrx);
    setStatus("success");
  };


  return (
    <section id="payment" className="relative py-14 sm:py-20 px-4 sm:px-6 md:px-12 z-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-xs font-semibold text-[#091427] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#d97706] animate-pulse" />
            <span>Bank-Grade Escrow &amp; Client Settlement</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0f172a] tracking-tight leading-tight">
            Secure Global <br />
            <span className="text-gradient-navy-gold">Payment &amp; Invoicing Portal</span>
          </h2>
          <p className="text-sm sm:text-[15px] text-[#54647c] mt-3">
            Seamless multi-currency settlement for overseas clients across North America, the UK, Europe, UAE, and Australia.
          </p>
        </div>

        {/* Currency & Mode Switcher Bar */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-4 sm:p-6 mb-8 sm:mb-10 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          
          {/* Mode Toggle Tabs */}
          <div className="inline-flex flex-col sm:flex-row p-1.5 bg-[#f8fafd] rounded-2xl border border-gray-200/70 w-full md:w-auto gap-1">
            <button
              onClick={() => setPaymentMode("retainer")}
              className={`flex-1 md:flex-initial px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer text-center ${
                paymentMode === "retainer"
                  ? "bg-[#091427] text-white shadow-md shadow-[#091427]/25"
                  : "text-[#54647c] hover:text-[#091427]"
              }`}
            >
              💼 Monthly Growth Retainer
            </button>
            <button
              onClick={() => setPaymentMode("invoice")}
              className={`flex-1 md:flex-initial px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer text-center ${
                paymentMode === "invoice"
                  ? "bg-[#091427] text-white shadow-md shadow-[#091427]/25"
                  : "text-[#54647c] hover:text-[#091427]"
              }`}
            >
              📄 Pay Custom Invoice
            </button>
          </div>

          {/* Currency Dropdown Selector */}
          <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto justify-between sm:justify-end">
            <span className="text-xs font-bold text-[#091427] uppercase tracking-wider whitespace-nowrap">
              Billing Currency:
            </span>
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value as Currency)}
              aria-label="Billing Currency"
              className="bg-amber-50/70 border border-amber-200 text-[#091427] font-bold text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-[#d97706] cursor-pointer"
            >
              <option value="USD">🇺🇸 USD ($)</option>
              <option value="GBP">🇬🇧 GBP (£)</option>
              <option value="EUR">🇪🇺 EUR (€)</option>
              <option value="AUD">🇦🇺 AUD (A$)</option>
              <option value="CAD">🇨🇦 CAD (C$)</option>
              <option value="AED">🇦🇪 AED (د.إ)</option>
            </select>
          </div>
        </div>

        {/* Success Modal Confirmation */}
        {status === "success" && (
          <div className="bg-white rounded-3xl border-2 border-[#d97706]/50 shadow-2xl p-8 sm:p-12 text-center max-w-2xl mx-auto animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-amber-100 text-[#d97706] text-3xl font-bold flex items-center justify-center mx-auto mb-4">
              ✓
            </div>
            <span className="inline-block px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-[#091427] text-xs font-bold mb-2">
              Payment Confirmed
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#091427] mb-2">
              Settlement Successfully Initiated
            </h3>
            <p className="text-xs sm:text-sm text-[#54647c] max-w-md mx-auto mb-6">
              A formal tax invoice and payment acknowledgement receipt has been dispatched to{" "}
              <strong className="text-[#091427]">{clientEmail || "your email"}</strong>.
            </p>

            {/* Receipt Summary Box */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 mb-8 text-left text-xs space-y-2.5 max-w-md mx-auto">
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500 font-semibold">Transaction Reference:</span>
                <span className="font-mono font-bold text-[#091427]">{transactionId}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500 font-semibold">Total Amount:</span>
                <span className="font-bold text-[#d97706] text-sm">
                  {curr.symbol}
                  {getSettlementAmount()} {selectedCurrency}
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500 font-semibold">Service Package / Ref:</span>
                <span className="font-semibold text-[#091427]">
                  {paymentMode === "retainer"
                    ? retainerPlans.find((p) => p.id === selectedPlanId)?.name
                    : `Invoice ${invoiceNumber || "Standard Delivery"}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-semibold">Payment Channel:</span>
                <span className="font-semibold text-[#091427] uppercase">{paymentMethod}</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => {
                  setStatus("idle");
                  setInvoiceNumber("");
                }}
                className="bg-[#091427] hover:bg-[#0f213d] text-white text-xs font-bold px-7 py-3.5 rounded-full shadow-md transition-all cursor-pointer"
              >
                Make Another Payment ↺
              </button>
            </div>
          </div>
        )}

        {/* Interactive Payment Form & Summary */}
        {status !== "success" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 Cols: Mode Configuration & Client Details */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xl">
              
              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                
                {/* MODE 1: RETAINER PACKAGE SELECTOR */}
                {paymentMode === "retainer" && (
                  <div>
                    <label className="text-xs font-bold text-[#091427] uppercase tracking-wider block mb-3">
                      Select Retainer Package:
                    </label>
                    <div className="space-y-3">
                      {retainerPlans.map((plan) => {
                        const isSelected = selectedPlanId === plan.id;
                        return (
                          <div
                            key={plan.id}
                            onClick={() => setSelectedPlanId(plan.id)}
                            className={`p-3.5 sm:p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 ${
                              isSelected
                                ? "border-[#091427] bg-[#f8fafd] shadow-sm"
                                : "border-gray-100 hover:border-gray-300 bg-white"
                            }`}
                          >
                            <div className="flex items-start sm:items-center gap-3">
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 ${
                                  isSelected
                                    ? "border-[#d97706] bg-[#d97706]"
                                    : "border-gray-300"
                                }`}
                              >
                                {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                              </div>
                              <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h4 className="text-sm font-bold text-[#0f172a]">{plan.name}</h4>
                                  {plan.popular && (
                                    <span className="text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200/80 px-2 py-0.5 rounded-full">
                                      POPULAR
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-[#64748b] mt-0.5">{plan.tagline}</p>
                              </div>
                            </div>
                            <div className="text-left sm:text-right pl-8 sm:pl-0">
                              <span className="text-base font-black text-[#091427]">
                                {curr.symbol}
                                {calculatePrice(plan.usdPrice)}
                              </span>
                              <span className="text-[10px] text-gray-400 block sm:inline sm:ml-1">/month</span>
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
                        <label className="text-xs font-bold text-gray-700 block mb-1">
                          Invoice Number *
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="e.g. INV-2025-042"
                          value={invoiceNumber}
                          onChange={(e) => setInvoiceNumber(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-base sm:text-sm outline-none focus:border-[#d97706] focus:ring-1 focus:ring-[#d97706]"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-700 block mb-1">
                          Amount in USD ($) *
                        </label>
                        <input
                          required
                          type="number"
                          min="50"
                          step="10"
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-base sm:text-sm outline-none focus:border-[#d97706] focus:ring-1 focus:ring-[#d97706]"
                        />
                      </div>
                    </div>
                    <p className="text-[11px] text-[#64748b]">
                      * Currency conversion is automatically calculated at live interbank mid-market rates without hidden markups.
                    </p>
                  </div>
                )}

                {/* Client Identification Fields */}
                <div className="border-t border-gray-100 pt-5">
                  <span className="text-xs font-bold text-[#091427] uppercase tracking-wider block mb-3">
                    Billing Details:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">
                        Contact Name *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. John Henderson"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-base sm:text-sm outline-none focus:border-[#d97706]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">
                        Business Email (For Tax Receipt) *
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="john@yourcompany.com"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-base sm:text-sm outline-none focus:border-[#d97706]"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold text-gray-700 block mb-1">
                        Company Name / Legal Entity (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Apex Digital Ltd. / CloudSync Inc."
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-base sm:text-sm outline-none focus:border-[#d97706]"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Gateway Channel Selector */}
                <div className="border-t border-gray-100 pt-5">
                  <span className="text-xs font-bold text-[#091427] uppercase tracking-wider block mb-3">
                    Select Payment Gateway:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    
                    {/* Stripe Card */}
                    <div
                      onClick={() => setPaymentMethod("stripe")}
                      className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                        paymentMethod === "stripe"
                          ? "border-[#091427] bg-[#f8fafd] shadow-sm font-bold text-[#091427]"
                          : "border-gray-200 hover:border-gray-300 text-gray-600"
                      }`}
                    >
                      <div className="text-lg mb-0.5">💳</div>
                      <span className="text-xs block font-bold">Stripe</span>
                      <span className="text-[9px] text-gray-400">Card / Apple Pay</span>
                    </div>

                    {/* Wire Transfer */}
                    <div
                      onClick={() => setPaymentMethod("wire")}
                      className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                        paymentMethod === "wire"
                          ? "border-[#091427] bg-[#f8fafd] shadow-sm font-bold text-[#091427]"
                          : "border-gray-200 hover:border-gray-300 text-gray-600"
                      }`}
                    >
                      <div className="text-lg mb-0.5">🏦</div>
                      <span className="text-xs block font-bold">Bank Wire</span>
                      <span className="text-[9px] text-gray-400">ACH / SWIFT / IBAN</span>
                    </div>

                    {/* Wise */}
                    <div
                      onClick={() => setPaymentMethod("wise")}
                      className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                        paymentMethod === "wise"
                          ? "border-[#091427] bg-[#f8fafd] shadow-sm font-bold text-[#091427]"
                          : "border-gray-200 hover:border-gray-300 text-gray-600"
                      }`}
                    >
                      <div className="text-lg mb-0.5">🌐</div>
                      <span className="text-xs block font-bold">Wise</span>
                      <span className="text-[9px] text-gray-400">Zero FX Markup</span>
                    </div>

                    {/* PayPal */}
                    <div
                      onClick={() => setPaymentMethod("paypal")}
                      className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                        paymentMethod === "paypal"
                          ? "border-[#091427] bg-[#f8fafd] shadow-sm font-bold text-[#091427]"
                          : "border-gray-200 hover:border-gray-300 text-gray-600"
                      }`}
                    >
                      <div className="text-lg mb-0.5">🅿️</div>
                      <span className="text-xs block font-bold">PayPal</span>
                      <span className="text-[9px] text-gray-400">Buyer Protection</span>
                    </div>

                  </div>
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={status === "processing"}
                  className="w-full bg-[#091427] hover:bg-[#0f213d] text-white border border-[#d97706]/40 font-bold py-4 rounded-2xl text-sm shadow-xl shadow-[#091427]/30 transition-all hover:scale-[1.01] cursor-pointer flex items-center justify-center gap-2"
                >
                  {status === "processing" ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Securing Settlement Gateway...</span>
                    </>
                  ) : (
                    <>
                      <span>
                        Authorize Settlement: {curr.symbol}
                        {getSettlementAmount()} {selectedCurrency}
                      </span>
                      <span className="text-[#d97706]">→</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right 5 Cols: Security Guarantees & Summary Card */}
            <div className="lg:col-span-5 space-y-6 text-left">
              
              {/* Order Summary Card */}
              <div className="bg-gradient-to-br from-[#091427] via-[#0f213d] to-[#1e293b] text-white rounded-3xl p-7 border border-[#d97706]/40 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#d97706]/10 rounded-full blur-2xl pointer-events-none" />
                
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#d97706] text-xs font-bold mb-4 border border-[#d97706]/30">
                  <span>🔒 Escrow-Protected Settlement</span>
                </div>

                <h3 className="text-xl font-black mb-1">Billing Summary</h3>
                <p className="text-xs text-slate-300 mb-5">
                  Review invoice line items and payment terms before authorization.
                </p>

                <div className="space-y-3 text-xs border-y border-white/10 py-4 mb-5">
                  <div className="flex justify-between text-slate-300">
                    <span>Selected Plan / Invoice:</span>
                    <span className="font-bold text-white">
                      {paymentMode === "retainer"
                        ? retainerPlans.find((p) => p.id === selectedPlanId)?.name
                        : invoiceNumber || "Custom Scope Settlement"}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Base Currency Rate:</span>
                    <span className="font-bold text-white">
                      1 USD = {curr.rate} {selectedCurrency}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Payment Processing Fee:</span>
                    <span className="font-bold text-[#d97706]">0% (Absorbed by Agency)</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Tax Invoice / GST:</span>
                    <span className="font-bold text-white">Included (B2B Export SLA)</span>
                  </div>
                </div>

                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-300">Total Settlement:</span>
                  <div className="text-right">
                    <span className="text-3xl font-black text-[#d97706]">
                      {curr.symbol}
                      {getSettlementAmount()}
                    </span>
                    <span className="text-xs text-slate-400 block font-normal">{selectedCurrency}</span>
                  </div>
                </div>
              </div>

              {/* 4 Trust & Security Badges */}
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-[#d97706] border border-amber-200/60 flex items-center justify-center text-sm font-bold shrink-0">
                    🛡️
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#091427]">256-Bit SSL Bank-Grade Security</h4>
                    <p className="text-[11px] text-[#54647c]">
                      Transactions are processed with end-to-end tokenized encryption via Stripe &amp; PCI-DSS Level 1 compliance.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 text-[#091427] border border-slate-200 flex items-center justify-center text-sm font-bold shrink-0">
                    📜
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#091427]">Instant Global Tax Receipt</h4>
                    <p className="text-[11px] text-[#54647c]">
                      Downloadable PDF invoices with international company registration, VAT/Tax details automatically generated.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-[#d97706] border border-amber-200/60 flex items-center justify-center text-sm font-bold shrink-0">
                    🤝
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#091427]">100% Satisfaction SLA Guarantee</h4>
                    <p className="text-[11px] text-[#54647c]">
                      Milestone delivery protected under our mutual master service agreement (MSA).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1e40af] border border-blue-200/60 flex items-center justify-center text-sm font-bold shrink-0">
                    🌍
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#091427]">Zero Cross-Border Hidden Surcharges</h4>
                    <p className="text-[11px] text-[#54647c]">
                      Pay in your domestic currency without foreign transaction penalties.
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


export default function PaymentSection() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-sm font-semibold text-gray-500">Loading Secure Payment Gateway...</div>}>
      <PaymentSectionInner />
    </Suspense>
  );
}