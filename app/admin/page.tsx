"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";

// =========================================================================
// TYPES & DATA STRUCTURES
// =========================================================================

interface UserItem {
  id: string;
  date: string;
  time: string;
  country: string;
  countryCode: string;
  flag: string;
  name: string;
  email: string;
  number: string;
  isNew: boolean;
  ip: string;
  social: string;
  socialType: "linkedin" | "twitter" | "instagram" | "whatsapp";
  domain?: string;
  serviceInterest?: string;
}

interface MailItem {
  id: string;
  date: string;
  time: string;
  senderName: string;
  senderEmail: string;
  phone: string;
  subject: string;
  message: string;
  status: "Unread" | "Replied" | "Pending";
  service: string;
}

interface WhatsAppItem {
  id: string;
  date: string;
  time: string;
  clientName: string;
  phoneNumber: string;
  country: string;
  flag: string;
  message: string;
  status: "Active" | "Converted" | "Follow-up";
}

interface PaymentItem {
  id: string;
  date: string;
  time: string;
  clientName: string;
  clientEmail: string;
  domain: string;
  service: string;
  amount: string;
  currency: "INR" | "USD";
  rail: "UPI" | "Stripe" | "Bank Wire" | "PayPal" | "Wise";
  status: "Settled" | "Escrow Verified" | "Processing";
  txnRef: string;
}

interface InvoiceItem {
  id: string;
  invoiceNo: string;
  date: string;
  dueDate: string;
  clientName: string;
  clientEmail: string;
  clientDomain: string;
  clientAddress: string;
  serviceName: string;
  rate: number;
  qty: number;
  taxPercent: number;
  currency: "INR" | "USD";
  status: "Paid" | "Pending" | "Sent";
}

// Initial realistic database of clients/users
const INITIAL_USERS: UserItem[] = [
  { id: "BPM-USR-101", date: "06 Nov 2026", time: "22:45 IST", country: "United States", countryCode: "US", flag: "🇺🇸", name: "Alexander Wright", email: "alex@nordhaus-estates.com", number: "+1 (415) 890-2341", isNew: true, ip: "142.250.190.46", social: "@alex_wright_arch", socialType: "linkedin", domain: "nordhaus-estates.com", serviceInterest: "Next.js Web Engineering" },
  { id: "BPM-USR-102", date: "06 Nov 2026", time: "21:18 IST", country: "United Kingdom", countryCode: "GB", flag: "🇬🇧", name: "Charlotte Davies", email: "c.davies@hotel-mira.co.uk", number: "+44 20 7946 0912", isNew: false, ip: "185.199.108.153", social: "@charlotte_davies", socialType: "linkedin", domain: "hotel-mira.co.uk", serviceInterest: "High-DR Guest Posting" },
  { id: "BPM-USR-103", date: "06 Nov 2026", time: "20:05 IST", country: "India", countryCode: "IN", flag: "🇮🇳", name: "Vikram Malhotra", email: "vikram@aether-saas.io", number: "+91 98201 44521", isNew: true, ip: "49.36.128.91", social: "@vikram_malhotra", socialType: "twitter", domain: "aether-saas.io", serviceInterest: "Enterprise SEO Suite" },
  { id: "BPM-USR-104", date: "06 Nov 2026", time: "19:30 IST", country: "Canada", countryCode: "CA", flag: "🇨🇦", name: "Dr. Evelyn Reed", email: "evelyn@studio-bellavita.ca", number: "+1 (604) 555-0188", isNew: false, ip: "192.206.151.131", social: "@studiobellavita", socialType: "instagram", domain: "studio-bellavita.ca", serviceInterest: "Flutter App Dev" },
  { id: "BPM-USR-105", date: "06 Nov 2026", time: "18:42 IST", country: "Germany", countryCode: "DE", flag: "🇩🇪", name: "Maximilian Weber", email: "m.weber@berlinfintech.de", number: "+49 30 1234567", isNew: true, ip: "185.86.151.11", social: "@maxweber_fin", socialType: "linkedin", domain: "berlinfintech.de", serviceInterest: "Full-Stack Laravel" },
  { id: "BPM-USR-106", date: "06 Nov 2026", time: "17:15 IST", country: "Australia", countryCode: "AU", flag: "🇦🇺", name: "Liam O'Connor", email: "liam@sydneydigital.com.au", number: "+61 2 9876 5432", isNew: false, ip: "139.130.4.5", social: "@liam_oconnor_au", socialType: "twitter", domain: "sydneydigital.com.au", serviceInterest: "High-DR Backlinks" },
  { id: "BPM-USR-107", date: "06 Nov 2026", time: "16:50 IST", country: "United Arab Emirates", countryCode: "AE", flag: "🇦🇪", name: "Tariq Al-Mansoor", email: "tariq@gulfproperties.ae", number: "+971 4 321 0000", isNew: true, ip: "94.200.22.8", social: "@tariq_dubai", socialType: "whatsapp", domain: "gulfproperties.ae", serviceInterest: "Enterprise SEO Suite" },
  { id: "BPM-USR-108", date: "06 Nov 2026", time: "15:20 IST", country: "India", countryCode: "IN", flag: "🇮🇳", name: "Ananya Sharma", email: "ananya@fintechscale.in", number: "+91 97112 33445", isNew: false, ip: "103.21.124.9", social: "@ananya_sharma", socialType: "linkedin", domain: "fintechscale.in", serviceInterest: "Flutter App Dev" },
  { id: "BPM-USR-109", date: "06 Nov 2026", time: "14:10 IST", country: "United States", countryCode: "US", flag: "🇺🇸", name: "Marcus Brody", email: "mbrody@brodycap.com", number: "+1 (212) 555-8711", isNew: true, ip: "64.233.160.1", social: "@brodycap", socialType: "twitter", domain: "brodycap.com", serviceInterest: "Next.js Web Engineering" },
  { id: "BPM-USR-110", date: "06 Nov 2026", time: "13:05 IST", country: "Singapore", countryCode: "SG", flag: "🇸🇬", name: "Mei-Ling Chen", email: "mei@singaporeventures.sg", number: "+65 6789 0123", isNew: false, ip: "202.166.192.1", social: "@meiling_sg", socialType: "linkedin", domain: "singaporeventures.sg", serviceInterest: "SEO & Growth Retainer" },
  { id: "BPM-USR-111", date: "05 Nov 2026", time: "22:15 IST", country: "France", countryCode: "FR", flag: "🇫🇷", name: "Antoine Laurent", email: "a.laurent@pariscreative.fr", number: "+33 1 42 68 55 00", isNew: true, ip: "195.154.122.9", social: "@antoine_paris", socialType: "instagram", domain: "pariscreative.fr", serviceInterest: "WordPress to Next.js" },
  { id: "BPM-USR-112", date: "05 Nov 2026", time: "21:00 IST", country: "United States", countryCode: "US", flag: "🇺🇸", name: "Sophia Martinez", email: "sophia@austinbiotech.io", number: "+1 (512) 555-9082", isNew: true, ip: "104.16.248.249", social: "@sophiam_bio", socialType: "linkedin", domain: "austinbiotech.io", serviceInterest: "Enterprise SEO Suite" },
  { id: "BPM-USR-113", date: "05 Nov 2026", time: "19:40 IST", country: "United Kingdom", countryCode: "GB", flag: "🇬🇧", name: "Oliver Hughes", email: "oliver@manchestergrowth.co.uk", number: "+44 161 496 0192", isNew: false, ip: "82.165.197.1", social: "@oliverhughes", socialType: "twitter", domain: "manchestergrowth.co.uk", serviceInterest: "High-DR Backlinks" },
  { id: "BPM-USR-114", date: "05 Nov 2026", time: "18:12 IST", country: "India", countryCode: "IN", flag: "🇮🇳", name: "Rohan Varma", email: "rohan@hyperlocal.co.in", number: "+91 99887 66554", isNew: true, ip: "115.112.98.5", social: "@rohan_hyper", socialType: "whatsapp", domain: "hyperlocal.co.in", serviceInterest: "E-Commerce SEO" },
  { id: "BPM-USR-115", date: "05 Nov 2026", time: "16:25 IST", country: "Netherlands", countryCode: "NL", flag: "🇳🇱", name: "Daan van Dijk", email: "daan@amsterdamsaas.nl", number: "+31 20 794 8888", isNew: false, ip: "145.220.21.3", social: "@daan_vandijk", socialType: "linkedin", domain: "amsterdamsaas.nl", serviceInterest: "Technical Site Audit" },
  { id: "BPM-USR-116", date: "05 Nov 2026", time: "14:50 IST", country: "Japan", countryCode: "JP", flag: "🇯🇵", name: "Kenji Sato", email: "kenji@tokyoglobal.jp", number: "+81 3 5555 0143", isNew: true, ip: "133.242.18.1", social: "@kenji_tokyo", socialType: "twitter", domain: "tokyoglobal.jp", serviceInterest: "Global SEO Expansion" },
  { id: "BPM-USR-117", date: "05 Nov 2026", time: "12:30 IST", country: "Switzerland", countryCode: "CH", flag: "🇨🇭", name: "Elena Rossi", email: "elena@zurichwealth.ch", number: "+41 44 211 5500", isNew: false, ip: "193.134.25.7", social: "@elena_zurich", socialType: "linkedin", domain: "zurichwealth.ch", serviceInterest: "Enterprise Retainer" },
  { id: "BPM-USR-118", date: "04 Nov 2026", time: "23:10 IST", country: "United States", countryCode: "US", flag: "🇺🇸", name: "David Kim", email: "david@seattletech.com", number: "+1 (206) 555-7721", isNew: true, ip: "205.251.242.103", social: "@dkim_sea", socialType: "linkedin", domain: "seattletech.com", serviceInterest: "Flutter App Dev" },
  { id: "BPM-USR-119", date: "04 Nov 2026", time: "20:45 IST", country: "India", countryCode: "IN", flag: "🇮🇳", name: "Pooja Hegde", email: "pooja@delhib2b.in", number: "+91 98101 22334", isNew: false, ip: "122.161.45.10", social: "@pooja_hegde_b2b", socialType: "linkedin", domain: "delhib2b.in", serviceInterest: "Email Marketing" },
  { id: "BPM-USR-120", date: "04 Nov 2026", time: "18:00 IST", country: "Australia", countryCode: "AU", flag: "🇦🇺", name: "Chloe Taylor", email: "chloe@melbournedesign.com.au", number: "+61 3 9999 8888", isNew: true, ip: "1.120.0.1", social: "@chloetaylor_au", socialType: "instagram", domain: "melbournedesign.com.au", serviceInterest: "Next.js Web Engineering" },
  { id: "BPM-USR-121", date: "04 Nov 2026", time: "15:20 IST", country: "Ireland", countryCode: "IE", flag: "🇮🇪", name: "Sean Murphy", email: "sean@dublinscale.ie", number: "+353 1 496 0000", isNew: false, ip: "89.100.12.4", social: "@sean_dublin", socialType: "twitter", domain: "dublinscale.ie", serviceInterest: "High-DR Backlinks" },
  { id: "BPM-USR-122", date: "04 Nov 2026", time: "11:45 IST", country: "United States", countryCode: "US", flag: "🇺🇸", name: "Brandon Cole", email: "b.cole@miamimedia.co", number: "+1 (305) 555-3419", isNew: true, ip: "172.56.21.9", social: "@brandon_miami", socialType: "instagram", domain: "miamimedia.co", serviceInterest: "Enterprise SEO Suite" },
];

const INITIAL_MAILS: MailItem[] = [
  { id: "MAIL-001", date: "06 Nov 2026", time: "22:30 IST", senderName: "Alexander Wright", senderEmail: "alex@nordhaus-estates.com", phone: "+1 (415) 890-2341", subject: "Inquiry regarding Headless Next.js Architecture for Showroom", message: "Hi Balaji Prime Media, we need our architecture modernized with sub-second page loads and custom CMS.", status: "Unread", service: "Next.js Web Engineering" },
  { id: "MAIL-002", date: "06 Nov 2026", time: "20:15 IST", senderName: "Charlotte Davies", senderEmail: "c.davies@hotel-mira.co.uk", phone: "+44 20 7946 0912", subject: "Guest Posting & High-DR Backlink Allocation for UK Luxury Brand", message: "We would like to book a monthly retainer of 10 Forbes/TechCrunch tier editorial links.", status: "Replied", service: "High-DR Guest Posting" },
  { id: "MAIL-003", date: "06 Nov 2026", time: "17:40 IST", senderName: "Vikram Malhotra", senderEmail: "vikram@aether-saas.io", phone: "+91 98201 44521", subject: "Enterprise SEO Suite for B2B Cloud Platform", message: "Seeking algorithmic search audit and programmatic keyword dominance across US & APAC markets.", status: "Unread", service: "Enterprise SEO Suite" },
  { id: "MAIL-004", date: "05 Nov 2026", time: "16:20 IST", senderName: "Tariq Al-Mansoor", senderEmail: "tariq@gulfproperties.ae", phone: "+971 4 321 0000", subject: "Custom Real Estate Portal Development & SEO", message: "Looking for a bilingual English/Arabic platform with instant WhatsApp leads integration.", status: "Pending", service: "Full-Stack Laravel / PHP" },
  { id: "MAIL-005", date: "05 Nov 2026", time: "12:10 IST", senderName: "Maximilian Weber", senderEmail: "m.weber@berlinfintech.de", phone: "+49 30 1234567", subject: "Payment confirmation for DA 60+ Placement Sprint", message: "Wire transfer initialized via Wise. Kindly confirm receipt and send VAT tax invoice.", status: "Replied", service: "Backlink Acquisition" },
];

const INITIAL_WHATSAPP: WhatsAppItem[] = [
  { id: "WA-001", date: "06 Nov 2026", time: "22:10 IST", clientName: "Alexander Wright", phoneNumber: "+14158902341", country: "United States", flag: "🇺🇸", message: "Hi Balaji Prime Media, I just submitted the form. Can we schedule a brief video sync tomorrow?", status: "Active" },
  { id: "WA-002", date: "06 Nov 2026", time: "19:45 IST", clientName: "Rohan Varma", phoneNumber: "+919988766554", country: "India", flag: "🇮🇳", message: "Sir, guest posting platform list me Forbes aur Outlook magazine available hai kya?", status: "Converted" },
  { id: "WA-003", date: "06 Nov 2026", time: "18:05 IST", clientName: "Tariq Al-Mansoor", phoneNumber: "+97143210000", country: "UAE", flag: "🇦🇪", message: "Salam brother, we need immediate backlink boost for Dubai real estate expo next week.", status: "Active" },
  { id: "WA-004", date: "05 Nov 2026", time: "14:30 IST", clientName: "Liam O'Connor", phoneNumber: "+61298765432", country: "Australia", flag: "🇦🇺", message: "Payment processed via Stripe for the SEO audit. Looking forward to the strategy document.", status: "Follow-up" },
  { id: "WA-005", date: "05 Nov 2026", time: "11:20 IST", clientName: "Dr. Evelyn Reed", phoneNumber: "+16045550188", country: "Canada", flag: "🇨🇦", message: "Our medical clinic app is almost ready for App Store submission. Thank you for the quick turnaround!", status: "Converted" },
];

const INITIAL_PAYMENTS: PaymentItem[] = [
  { id: "BPM-TXN-2026-9F8A2B", date: "06 Nov 2026", time: "21:30 IST", clientName: "Alexander Wright", clientEmail: "alex@nordhaus-estates.com", domain: "nordhaus-estates.com", service: "Next.js Web Engineering", amount: "$1,199", currency: "USD", rail: "Stripe", status: "Settled", txnRef: "ch_3N8k2vFkd90" },
  { id: "BPM-TXN-2026-4C1E7A", date: "06 Nov 2026", time: "19:15 IST", clientName: "Vikram Malhotra", clientEmail: "vikram@aether-saas.io", domain: "aether-saas.io", service: "Enterprise SEO Suite", amount: "₹49,999", currency: "INR", rail: "UPI", status: "Escrow Verified", txnRef: "UTR412389104821" },
  { id: "BPM-TXN-2026-8D2A1C", date: "05 Nov 2026", time: "18:40 IST", clientName: "Charlotte Davies", clientEmail: "c.davies@hotel-mira.co.uk", domain: "hotel-mira.co.uk", service: "High-DR Guest Posting", amount: "$1,499", currency: "USD", rail: "Wise", status: "Settled", txnRef: "WISE-GB-89102" },
  { id: "BPM-TXN-2026-3B9F5D", date: "05 Nov 2026", time: "15:20 IST", clientName: "Ananya Sharma", clientEmail: "ananya@fintechscale.in", domain: "fintechscale.in", service: "Flutter App Dev", amount: "₹84,999", currency: "INR", rail: "Bank Wire", status: "Settled", txnRef: "HDFC-NEFT-908124" },
  { id: "BPM-TXN-2026-7A4E2C", date: "04 Nov 2026", time: "12:10 IST", clientName: "Marcus Brody", clientEmail: "mbrody@brodycap.com", domain: "brodycap.com", service: "Dedicated Link Retainer", amount: "$2,450", currency: "USD", rail: "PayPal", status: "Escrow Verified", txnRef: "PP-TXN-981241" },
];

const INITIAL_INVOICES: InvoiceItem[] = [
  { id: "INV-001", invoiceNo: "BPM-INV-2026-001", date: "06 Nov 2026", dueDate: "20 Nov 2026", clientName: "Nordhaus Estates Ltd", clientEmail: "alex@nordhaus-estates.com", clientDomain: "https://nordhaus-estates.com", clientAddress: "450 Sutter St, San Francisco, CA 94108, USA", serviceName: "Next.js Full-Stack Web Engineering", rate: 1199, qty: 1, taxPercent: 0, currency: "USD", status: "Paid" },
  { id: "INV-002", invoiceNo: "BPM-INV-2026-002", date: "06 Nov 2026", dueDate: "15 Nov 2026", clientName: "Aether Cloud Systems", clientEmail: "vikram@aether-saas.io", clientDomain: "https://aether-saas.io", clientAddress: "B-404, Cyber City, Gurugram, HR 122002, India", serviceName: "Enterprise Algorithmic SEO Growth Suite", rate: 49999, qty: 1, taxPercent: 18, currency: "INR", status: "Paid" },
  { id: "INV-003", invoiceNo: "BPM-INV-2026-003", date: "05 Nov 2026", dueDate: "19 Nov 2026", clientName: "Hotel Mira Alpine", clientEmail: "c.davies@hotel-mira.co.uk", clientDomain: "https://hotel-mira.co.uk", clientAddress: "12 Piccadilly Circus, London W1J 9HP, UK", serviceName: "High-DR Editorial Placements (DA 60+)", rate: 1499, qty: 1, taxPercent: 0, currency: "USD", status: "Paid" },
  { id: "INV-004", invoiceNo: "BPM-INV-2026-004", date: "04 Nov 2026", dueDate: "18 Nov 2026", clientName: "Studio Bella Vita Medical", clientEmail: "evelyn@studio-bellavita.ca", clientDomain: "https://studio-bellavita.ca", clientAddress: "789 Robson St, Vancouver, BC V6Z 1A1, Canada", serviceName: "Flutter iOS & Android Mobile Application", rate: 84999, qty: 1, taxPercent: 18, currency: "INR", status: "Paid" },
];

export default function AdminDatabasePage() {
  // Theme State ("color dark se light krne ka bhi option rakho dark and light wala")
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const isDark = theme === "dark";

  // Active Dashboard Selection ("or jab in par click kre to dashboard ke bagal me inki details aaye")
  const [activeView, setActiveView] = useState<"users" | "mails" | "whatsapp" | "payments" | "add_payment" | "invoice">("users");

  // Database Data States
  const [usersList, setUsersList] = useState<UserItem[]>(INITIAL_USERS);
  const [mailsList, setMailsList] = useState<MailItem[]>(INITIAL_MAILS);
  const [whatsappList, setWhatsappList] = useState<WhatsAppItem[]>(INITIAL_WHATSAPP);
  const [paymentsList, setPaymentsList] = useState<PaymentItem[]>(INITIAL_PAYMENTS);
  const [invoicesList, setInvoicesList] = useState<InvoiceItem[]>(INITIAL_INVOICES);

  // User Table Controls ("10/ 20/ 30 krke ek column option button ho" and "pages add ho 1 2 3")
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [userSearch, setUserSearch] = useState("");
  const [userStatusFilter, setUserStatusFilter] = useState<"all" | "new" | "returning">("all");

  // Add Payment Form State
  const [newPayClient, setNewPayClient] = useState("");
  const [newPayEmail, setNewPayEmail] = useState("");
  const [newPayDomain, setNewPayDomain] = useState("");
  const [newPayService, setNewPayService] = useState("Enterprise SEO Suite");
  const [newPayAmount, setNewPayAmount] = useState("");
  const [newPayCurrency, setNewPayCurrency] = useState<"INR" | "USD">("INR");
  const [newPayRail, setNewPayRail] = useState<"UPI" | "Stripe" | "Bank Wire" | "PayPal" | "Wise">("UPI");
  const [newPayRef, setNewPayRef] = useState("");

  // Invoice Generator State
  const [invClientName, setInvClientName] = useState("");
  const [invClientEmail, setInvClientEmail] = useState("");
  const [invClientDomain, setInvClientDomain] = useState("");
  const [invClientAddress, setInvClientAddress] = useState("");
  const [invServiceName, setInvServiceName] = useState("High-DR Guest Posting & Editorial Retainer");
  const [invRate, setInvRate] = useState("49999");
  const [invQty, setInvQty] = useState("1");
  const [invTax, setInvTax] = useState("18");
  const [invCurrency, setInvCurrency] = useState<"INR" | "USD">("INR");
  const [selectedInvoicePreview, setSelectedInvoicePreview] = useState<InvoiceItem | null>(null);

  // Audio Equalizer Playing State for Box 3
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [currentDateStr, setCurrentDateStr] = useState("Live Status");

  // Load saved theme from localStorage
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("bpm_admin_theme");
      if (savedTheme === "light" || savedTheme === "dark") {
        setTheme(savedTheme);
      }
    } catch {}

    setCurrentDateStr(
      new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })
    );
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    try {
      localStorage.setItem("bpm_admin_theme", nextTheme);
    } catch {}
    showToast(`Switched to ${nextTheme === "light" ? "☀️ Light Mode" : "🌙 Dark Mode"}`);
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {}
    showToast("Logged out securely.");
  };

  // Filtered & Paginated Users
  const filteredUsers = useMemo(() => {
    return usersList.filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
        u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
        u.id.toLowerCase().includes(userSearch.toLowerCase()) ||
        u.country.toLowerCase().includes(userSearch.toLowerCase()) ||
        u.ip.includes(userSearch);

      const matchesStatus =
        userStatusFilter === "all"
          ? true
          : userStatusFilter === "new"
          ? u.isNew
          : !u.isNew;

      return matchesSearch && matchesStatus;
    });
  }, [usersList, userSearch, userStatusFilter]);

  const totalPages = Math.ceil(filteredUsers.length / pageSize) || 1;
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredUsers.slice(start, start + pageSize);
  }, [filteredUsers, currentPage, pageSize]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  // Submit New Payment Handler
  const handleAddPaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPayClient.trim() || !newPayAmount.trim()) {
      showToast("⚠️ Please enter client name and amount.");
      return;
    }

    const newPayment: PaymentItem = {
      id: `BPM-TXN-2026-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      time: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) + " IST",
      clientName: newPayClient,
      clientEmail: newPayEmail || "client@company.com",
      domain: newPayDomain || "https://clientbrand.com",
      service: newPayService,
      amount: `${newPayCurrency === "INR" ? "₹" : "$"}${newPayAmount}`,
      currency: newPayCurrency,
      rail: newPayRail,
      status: "Settled",
      txnRef: newPayRef || `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
    };

    setPaymentsList([newPayment, ...paymentsList]);
    setNewPayClient("");
    setNewPayEmail("");
    setNewPayDomain("");
    setNewPayAmount("");
    setNewPayRef("");
    showToast("✓ Payment authorized & recorded to ledger!");
    setActiveView("payments");
  };

  // Create Invoice Submit Handler
  const handleCreateInvoiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invClientName.trim() || !invRate.trim()) {
      showToast("⚠️ Please enter client name and rate.");
      return;
    }

    const newInv: InvoiceItem = {
      id: `INV-${Date.now().toString().slice(-4)}`,
      invoiceNo: `BPM-INV-2026-${String(invoicesList.length + 1).padStart(3, "0")}`,
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      dueDate: new Date(Date.now() + 14 * 86400000).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      clientName: invClientName,
      clientEmail: invClientEmail || "billing@client.com",
      clientDomain: invClientDomain || "https://clientbrand.com",
      clientAddress: invClientAddress || "Global Headquarters",
      serviceName: invServiceName,
      rate: parseFloat(invRate) || 0,
      qty: parseInt(invQty) || 1,
      taxPercent: parseFloat(invTax) || 0,
      currency: invCurrency,
      status: "Paid",
    };

    setInvoicesList([newInv, ...invoicesList]);
    setSelectedInvoicePreview(newInv);
    showToast(`✓ Invoice ${newInv.invoiceNo} successfully generated!`);
  };

  // Download Admin Data Handler ("and admin me ek download option bhi ho for download admin data")
  const handleDownloadAdminData = () => {
    const timestamp = new Date().toISOString().slice(0, 10);
    const headers = [
      "User ID",
      "Date",
      "Time",
      "Country",
      "Name",
      "Email",
      "Number",
      "Status",
      "IP Address",
      "Social Media Account",
      "Domain",
      "Service Interest",
    ];

    const rows = usersList.map((u) => [
      u.id,
      u.date,
      u.time,
      u.country,
      `"${u.name.replace(/"/g, '""')}"`,
      u.email,
      `"${u.number}"`,
      u.isNew ? "New" : "Returning",
      u.ip,
      `"${u.social}"`,
      `"${u.domain || ""}"`,
      `"${u.serviceInterest || ""}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `BalajiPrimeMedia_Admin_Users_${timestamp}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("✓ Admin User Directory CSV successfully downloaded!");
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  return (
    <div
      className={`min-h-screen font-sans flex flex-col lg:flex-row relative transition-colors duration-300 ${
        isDark
          ? "bg-[#050212] text-white selection:bg-purple-600 selection:text-white"
          : "bg-[#f8fafc] text-slate-800 selection:bg-purple-600 selection:text-white"
      }`}
    >
      
      {/* Toast Alert */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-fadeIn text-xs font-semibold backdrop-blur-md border ${
            isDark
              ? "bg-[#161129] border-purple-500/60 text-white"
              : "bg-white border-purple-300 text-slate-900 shadow-purple-100"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>{toast}</span>
        </div>
      )}

      {/* Background Starry or Soft Canvas */}
      {isDark ? (
        <div className="fixed inset-0 pointer-events-none z-0">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `radial-gradient(1px 1px at 20px 30px, #ffffff, rgba(0,0,0,0)),
                                radial-gradient(1px 1px at 40px 70px, rgba(255,255,255,0.7), rgba(0,0,0,0)),
                                radial-gradient(1.5px 1.5px at 90px 40px, #c084fc, rgba(0,0,0,0)),
                                radial-gradient(1px 1px at 160px 120px, #22d3ee, rgba(0,0,0,0)),
                                radial-gradient(1.5px 1.5px at 230px 190px, #ffffff, rgba(0,0,0,0)),
                                radial-gradient(1px 1px at 300px 80px, #a855f7, rgba(0,0,0,0))`,
              backgroundSize: "320px 320px",
            }}
          />
          <div
            className="absolute top-0 left-1/3 w-[600px] h-[400px] rounded-full blur-[140px] opacity-25"
            style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)" }}
          />
          <div
            className="absolute top-1/2 right-10 w-[500px] h-[400px] rounded-full blur-[140px] opacity-20"
            style={{ background: "radial-gradient(circle, #22d3ee 0%, transparent 70%)" }}
          />
        </div>
      ) : (
        <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-100/30 via-slate-50 to-slate-100 opacity-90" />
      )}

      {/* =========================================================================
          FULL-HEIGHT LEFT SIDEBAR ("puri left me dashbord wala bana ho uppar niche tak")
         ========================================================================= */}
      <aside
        className={`w-full lg:w-72 xl:w-80 shrink-0 lg:min-h-screen border-b lg:border-b-0 lg:border-r flex flex-col justify-between z-30 lg:sticky lg:top-0 lg:h-screen overflow-y-auto transition-colors duration-300 ${
          isDark
            ? "border-white/10 bg-[#070318]/95 backdrop-blur-2xl"
            : "border-slate-200 bg-white/95 backdrop-blur-2xl shadow-lg"
        }`}
      >
        
        {/* Top Branding Section */}
        <div className={`p-6 border-b ${isDark ? "border-white/10" : "border-slate-200"}`}>
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#6366f1] via-[#7c3aed] to-[#a855f7] flex items-center justify-center font-black text-base text-white shadow-lg shadow-purple-950/40 group-hover:scale-105 transition-transform">
                B
              </span>
              <div className="flex flex-col text-left">
                <span
                  className={`text-sm font-black tracking-tight leading-none group-hover:text-[#7c3aed] transition-colors ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  Balaji Prime Media
                </span>
                <span className="text-[10px] text-cyan-500 font-mono leading-tight mt-1">
                  Admin Command Suite
                </span>
              </div>
            </Link>

            {/* Quick Theme Toggle Icon Button in Sidebar */}
            <button
              type="button"
              onClick={toggleTheme}
              className={`p-2 rounded-xl border text-sm transition-all cursor-pointer hover:scale-110 active:scale-90 ${
                isDark
                  ? "bg-[#181033] border-purple-500/40 text-amber-300 hover:bg-[#251847]"
                  : "bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200"
              }`}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? "☀️" : "🌙"}
            </button>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                isDark
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                  : "bg-emerald-50 border-emerald-300 text-emerald-700"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span>Live Synchronized</span>
            </span>
            <span className={`text-[10px] font-mono ${isDark ? "text-gray-400" : "text-slate-400"}`}>
              v2.4 Core
            </span>
          </div>
        </div>

        {/* Navigation Categories ("dashbard me total mail and whatsapp meaage and user and payment and payemt add and invoice") */}
        <div className="p-4 space-y-1.5 flex-1">
          <span
            className={`text-[10px] uppercase font-bold tracking-wider px-3 pb-1 block ${
              isDark ? "text-gray-400" : "text-slate-400"
            }`}
          >
            Core Operations
          </span>

          {/* 1. Total Mail */}
          <button
            type="button"
            onClick={() => setActiveView("mails")}
            className={`w-full p-3 rounded-2xl border transition-all text-left flex items-center justify-between cursor-pointer ${
              activeView === "mails"
                ? isDark
                  ? "bg-[#251847] border-[#a855f7] shadow-lg shadow-purple-950/80 ring-1 ring-[#c084fc]"
                  : "bg-purple-100/80 border-purple-400 text-purple-900 shadow-sm"
                : isDark
                ? "bg-[#100b24]/50 border-white/5 hover:bg-[#1a133b] hover:border-white/15 text-gray-300"
                : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700"
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-lg">✉️</span>
              <div className="min-w-0">
                <p className={`text-xs font-bold truncate ${isDark ? "text-white" : "text-slate-900"}`}>
                  Total Mail
                </p>
                <p className={`text-[10px] truncate ${isDark ? "text-[#94a3b8]" : "text-slate-500"}`}>
                  RFPs &amp; inquiries
                </p>
              </div>
            </div>
            <span
              className={`px-2.5 py-0.5 rounded-full border text-[11px] font-bold ${
                isDark
                  ? "bg-cyan-500/15 border-cyan-500/30 text-cyan-300"
                  : "bg-cyan-50 border-cyan-300 text-cyan-700"
              }`}
            >
              {mailsList.length}
            </span>
          </button>

          {/* 2. WhatsApp Messages */}
          <button
            type="button"
            onClick={() => setActiveView("whatsapp")}
            className={`w-full p-3 rounded-2xl border transition-all text-left flex items-center justify-between cursor-pointer ${
              activeView === "whatsapp"
                ? isDark
                  ? "bg-[#251847] border-[#a855f7] shadow-lg shadow-purple-950/80 ring-1 ring-[#c084fc]"
                  : "bg-purple-100/80 border-purple-400 text-purple-900 shadow-sm"
                : isDark
                ? "bg-[#100b24]/50 border-white/5 hover:bg-[#1a133b] hover:border-white/15 text-gray-300"
                : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700"
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-lg">💬</span>
              <div className="min-w-0">
                <p className={`text-xs font-bold truncate ${isDark ? "text-white" : "text-slate-900"}`}>
                  WhatsApp Messages
                </p>
                <p className={`text-[10px] truncate ${isDark ? "text-[#94a3b8]" : "text-slate-500"}`}>
                  Direct chat leads
                </p>
              </div>
            </div>
            <span
              className={`px-2.5 py-0.5 rounded-full border text-[11px] font-bold ${
                isDark
                  ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
                  : "bg-emerald-50 border-emerald-300 text-emerald-700"
              }`}
            >
              {whatsappList.length}
            </span>
          </button>

          {/* 3. Users / Clients */}
          <button
            type="button"
            onClick={() => setActiveView("users")}
            className={`w-full p-3 rounded-2xl border transition-all text-left flex items-center justify-between cursor-pointer ${
              activeView === "users"
                ? isDark
                  ? "bg-[#251847] border-[#a855f7] shadow-lg shadow-purple-950/80 ring-1 ring-[#c084fc]"
                  : "bg-purple-100/80 border-purple-400 text-purple-900 shadow-sm"
                : isDark
                ? "bg-[#100b24]/50 border-white/5 hover:bg-[#1a133b] hover:border-white/15 text-gray-300"
                : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700"
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-lg">👥</span>
              <div className="min-w-0">
                <p className={`text-xs font-bold truncate ${isDark ? "text-white" : "text-slate-900"}`}>
                  Users &amp; Clients
                </p>
                <p className={`text-[10px] truncate ${isDark ? "text-[#94a3b8]" : "text-slate-500"}`}>
                  Client directory
                </p>
              </div>
            </div>
            <span
              className={`px-2.5 py-0.5 rounded-full border text-[11px] font-bold ${
                isDark
                  ? "bg-purple-500/20 border-purple-500/30 text-[#c084fc]"
                  : "bg-purple-50 border-purple-300 text-purple-700"
              }`}
            >
              {usersList.length}
            </span>
          </button>

          {/* 4. Payment */}
          <button
            type="button"
            onClick={() => setActiveView("payments")}
            className={`w-full p-3 rounded-2xl border transition-all text-left flex items-center justify-between cursor-pointer ${
              activeView === "payments"
                ? isDark
                  ? "bg-[#251847] border-[#a855f7] shadow-lg shadow-purple-950/80 ring-1 ring-[#c084fc]"
                  : "bg-purple-100/80 border-purple-400 text-purple-900 shadow-sm"
                : isDark
                ? "bg-[#100b24]/50 border-white/5 hover:bg-[#1a133b] hover:border-white/15 text-gray-300"
                : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700"
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-lg">💳</span>
              <div className="min-w-0">
                <p className={`text-xs font-bold truncate ${isDark ? "text-white" : "text-slate-900"}`}>
                  Payment Ledger
                </p>
                <p className={`text-[10px] truncate ${isDark ? "text-[#94a3b8]" : "text-slate-500"}`}>
                  Settled orders
                </p>
              </div>
            </div>
            <span
              className={`px-2.5 py-0.5 rounded-full border text-[11px] font-bold ${
                isDark
                  ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
                  : "bg-emerald-50 border-emerald-300 text-emerald-700"
              }`}
            >
              {paymentsList.length}
            </span>
          </button>

          <span
            className={`text-[10px] uppercase font-bold tracking-wider px-3 pt-3 pb-1 block ${
              isDark ? "text-gray-400" : "text-slate-400"
            }`}
          >
            Actions &amp; Billing
          </span>

          {/* 5. Add Payment */}
          <button
            type="button"
            onClick={() => setActiveView("add_payment")}
            className={`w-full p-3 rounded-2xl border transition-all text-left flex items-center justify-between cursor-pointer ${
              activeView === "add_payment"
                ? isDark
                  ? "bg-[#251847] border-[#a855f7] shadow-lg shadow-purple-950/80 ring-1 ring-[#c084fc]"
                  : "bg-purple-100/80 border-purple-400 text-purple-900 shadow-sm"
                : isDark
                ? "bg-[#100b24]/50 border-white/5 hover:bg-[#1a133b] hover:border-white/15 text-gray-300"
                : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700"
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-lg">➕</span>
              <div className="min-w-0">
                <p className={`text-xs font-bold truncate ${isDark ? "text-white" : "text-slate-900"}`}>
                  Add Payment
                </p>
                <p className={`text-[10px] truncate ${isDark ? "text-[#94a3b8]" : "text-slate-500"}`}>
                  Record settlement
                </p>
              </div>
            </div>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                isDark
                  ? "bg-purple-950/60 border-purple-500/30 text-[#c084fc]"
                  : "bg-purple-100 border-purple-300 text-purple-700"
              }`}
            >
              New +
            </span>
          </button>

          {/* 6. Invoice */}
          <button
            type="button"
            onClick={() => setActiveView("invoice")}
            className={`w-full p-3 rounded-2xl border transition-all text-left flex items-center justify-between cursor-pointer ${
              activeView === "invoice"
                ? isDark
                  ? "bg-[#251847] border-[#a855f7] shadow-lg shadow-purple-950/80 ring-1 ring-[#c084fc]"
                  : "bg-purple-100/80 border-purple-400 text-purple-900 shadow-sm"
                : isDark
                ? "bg-[#100b24]/50 border-white/5 hover:bg-[#1a133b] hover:border-white/15 text-gray-300"
                : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700"
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-lg">🧾</span>
              <div className="min-w-0">
                <p className={`text-xs font-bold truncate ${isDark ? "text-white" : "text-slate-900"}`}>
                  Invoice Generator
                </p>
                <p className={`text-[10px] truncate ${isDark ? "text-[#94a3b8]" : "text-slate-500"}`}>
                  Tax invoice &amp; PDF
                </p>
              </div>
            </div>
            <span
              className={`px-2 py-0.5 rounded-full border text-[10px] font-bold ${
                isDark
                  ? "bg-amber-500/15 border-amber-500/30 text-amber-300"
                  : "bg-amber-50 border-amber-300 text-amber-700"
              }`}
            >
              {invoicesList.length}
            </span>
          </button>
        </div>

        {/* Bottom Sidebar Footer Controls */}
        <div className={`p-4 border-t space-y-2.5 ${isDark ? "border-white/10" : "border-slate-200"}`}>
          {/* Download Admin Data Button */}
          <button
            type="button"
            onClick={handleDownloadAdminData}
            className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all shadow-md cursor-pointer hover:scale-[1.02] active:scale-[0.98] ${
              isDark
                ? "bg-gradient-to-r from-purple-900/70 to-indigo-900/70 hover:from-purple-800 border-[#a855f7]/40 text-white"
                : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 border-purple-500 text-white shadow-purple-200"
            }`}
          >
            <span>📥</span>
            <span>Download Admin Data</span>
          </button>

          <div className="flex items-center justify-between pt-1 text-xs">
            <Link
              href="/services"
              className={`transition-colors ${isDark ? "text-gray-400 hover:text-white" : "text-slate-500 hover:text-slate-900 font-medium"}`}
            >
              Public Services ↗
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className={`font-semibold cursor-pointer ${isDark ? "text-red-400 hover:text-red-300" : "text-red-600 hover:text-red-700"}`}
            >
              Logout ⎋
            </button>
          </div>
        </div>
      </aside>

      {/* =========================================================================
          RIGHT MAIN WORKSPACE (4 Boxes at top, followed by the clicked item's details)
         ========================================================================= */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 space-y-8 overflow-y-auto relative z-10">
        
        {/* Top Header Bar with Theme Switcher */}
        <div
          className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b ${
            isDark ? "border-white/10" : "border-slate-200"
          }`}
        >
          <div>
            <h1 className={`text-xl sm:text-2xl font-black flex items-center gap-2 ${isDark ? "text-white" : "text-slate-900"}`}>
              <span>Balaji Prime Media</span>
              <span className={isDark ? "text-gray-500 font-normal" : "text-slate-400 font-normal"}>/</span>
              <span className="text-[#7c3aed] capitalize">
                {activeView === "users" && "User Directory"}
                {activeView === "mails" && "Total Mail"}
                {activeView === "whatsapp" && "WhatsApp Inquiries"}
                {activeView === "payments" && "Payment Ledger"}
                {activeView === "add_payment" && "Add Payment"}
                {activeView === "invoice" && "Invoice Generator"}
              </span>
            </h1>
            <p className={`text-xs mt-0.5 ${isDark ? "text-[#94a3b8]" : "text-slate-500"}`}>
              Live database records, multi-currency escrow ledger, and active client sprint metrics.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            {/* Live Theme Switcher Button */}
            <button
              type="button"
              onClick={toggleTheme}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-sm cursor-pointer hover:scale-105 active:scale-95 ${
                isDark
                  ? "bg-[#181033] border-purple-500/40 text-amber-300 hover:bg-[#251847]"
                  : "bg-white border-slate-300 text-slate-800 hover:bg-slate-50 shadow-slate-100"
              }`}
              title="Toggle Dark / Light Theme"
            >
              <span>{isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}</span>
            </button>

            <span
              className={`text-xs font-mono px-3 py-1.5 rounded-xl border ${
                isDark
                  ? "bg-[#140e2b] border-white/10 text-gray-400"
                  : "bg-white border-slate-200 text-slate-600 shadow-sm"
              }`}
            >
              📅 {currentDateStr}
            </span>
          </div>
        </div>

        {/* =========================================================================
            1. THE 4 BOXES FROM SCREENSHOT (Image Attached by User)
            - Box 1: Action card "+ Create a room / New Project Sprint"
            - Box 2: "Subscription Growth Experiments" (Sprint Retrospective + avatars)
            - Box 3: "Weekly Insights" (Dynamic sound/metrics equalizer waveform bars + play)
            - Box 4: "Global Client Settlements & Escrow"
           ========================================================================= */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <span
              className={`text-xs uppercase tracking-wider font-bold flex items-center gap-1.5 ${
                isDark ? "text-[#94a3b8]" : "text-slate-500"
              }`}
            >
              <span>✦</span>
              <span>Command Radar Overview</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            
            {/* Box 1: "+ Create a room / Add Client Project" (Matches Image Box 1) */}
            <div
              onClick={() => setActiveView("add_payment")}
              className={`group relative h-48 rounded-[28px] border p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 shadow-xl hover:-translate-y-1 backdrop-blur-xl ${
                isDark
                  ? "bg-[#0c091d]/80 hover:bg-[#150f2e]/90 border-white/10 hover:border-[#a855f7]/60"
                  : "bg-white hover:bg-slate-50 border-slate-200 hover:border-purple-300 shadow-slate-200/60"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full border flex items-center justify-center text-2xl font-light transition-all mb-3 group-hover:scale-110 ${
                  isDark
                    ? "bg-white/5 group-hover:bg-[#a855f7]/20 border-white/10 group-hover:border-[#a855f7]/50 text-gray-200 group-hover:text-white"
                    : "bg-purple-50 group-hover:bg-purple-100 border-purple-200 text-purple-700"
                }`}
              >
                +
              </div>
              <h3 className={`text-sm font-bold tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
                Create a project
              </h3>
              <p className={`text-[11px] mt-0.5 ${isDark ? "text-[#94a3b8]" : "text-slate-500"}`}>
                Quick client scope &amp; escrow
              </p>
            </div>

            {/* Box 2: "Subscription Growth Experiments" (Matches Image Box 2) */}
            <div
              onClick={() => setActiveView("users")}
              className={`relative h-48 rounded-[28px] border p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 shadow-xl hover:-translate-y-1 backdrop-blur-xl group ${
                isDark
                  ? "bg-[#0c091d]/80 border-white/10 hover:border-[#a855f7]/60"
                  : "bg-white border-slate-200 hover:border-purple-300 shadow-slate-200/60"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className={`text-sm font-bold leading-snug ${isDark ? "text-white" : "text-slate-900"}`}>
                    Subscription Growth<br />Experiments
                  </h3>
                  <p className={`text-[11px] mt-1 ${isDark ? "text-[#94a3b8]" : "text-slate-500"}`}>
                    Sprint Retrospective
                  </p>
                </div>
                <span className="text-gray-400 group-hover:text-[#fcd34d] transition-colors text-xs">✦</span>
              </div>

              <div className="flex items-center justify-between pt-2">
                {/* Team / Client Avatars Stack */}
                <div className="flex items-center -space-x-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 border-2 border-slate-800 flex items-center justify-center text-[10px] font-bold text-white">
                    AW
                  </div>
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 border-2 border-slate-800 flex items-center justify-center text-[10px] font-bold text-white">
                    CD
                  </div>
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-400 to-pink-500 border-2 border-slate-800 flex items-center justify-center text-[10px] font-bold text-white">
                    VM
                  </div>
                </div>

                {/* Badge Number (Matches "9" in image) */}
                <span
                  className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold ${
                    isDark
                      ? "bg-white/10 border-white/10 text-white"
                      : "bg-slate-100 border-slate-200 text-slate-800"
                  }`}
                >
                  9
                </span>
              </div>
            </div>

            {/* Box 3: "Weekly Insights" with Equalizer Waveform & Play Button (Matches Image Box 3) */}
            <div
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className={`relative h-48 rounded-[28px] border p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 shadow-xl hover:-translate-y-1 backdrop-blur-xl group ${
                isDark
                  ? "bg-[#0c091d]/80 border-white/10 hover:border-[#a855f7]/60"
                  : "bg-white border-slate-200 hover:border-purple-300 shadow-slate-200/60"
              }`}
            >
              <div>
                <h3 className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                  Weekly Insights
                </h3>
                
                {/* Dynamic Waveform Audio Equalizer Bars */}
                <div className="flex items-end gap-[3px] h-10 mt-3 pt-1">
                  {[45, 60, 80, 50, 95, 70, 85, 40, 90, 65, 80, 55, 100, 75, 45, 60, 85, 90, 70, 50, 80, 60, 75, 90, 65, 50].map((height, i) => {
                    const isBlue = i < 14;
                    return (
                      <span
                        key={i}
                        className={`flex-1 rounded-full transition-all duration-300 ${
                          isBlue
                            ? "bg-[#3b82f6]"
                            : isDark
                            ? "bg-white"
                            : "bg-slate-300"
                        }`}
                        style={{
                          height: isPlayingAudio ? `${Math.max(20, Math.round(height * Math.random()))}%` : `${height}%`,
                        }}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center -space-x-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 border-2 border-slate-800 flex items-center justify-center text-[10px] font-bold text-white">
                    ER
                  </div>
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 border-2 border-slate-800 flex items-center justify-center text-[10px] font-bold text-white">
                    MW
                  </div>
                </div>

                {/* Circular Play Button */}
                <button
                  type="button"
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-black shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer ${
                    isDark
                      ? "bg-white hover:bg-gray-100 text-black"
                      : "bg-slate-900 hover:bg-slate-800 text-white"
                  }`}
                  aria-label="Play Weekly Insights"
                >
                  {isPlayingAudio ? "❚❚" : "▶"}
                </button>
              </div>
            </div>

            {/* Box 4: Global Client Settlements & Escrow */}
            <div
              onClick={() => setActiveView("payments")}
              className={`relative h-48 rounded-[28px] border p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 shadow-xl hover:-translate-y-1 backdrop-blur-xl group ${
                isDark
                  ? "bg-[#0c091d]/80 border-white/10 hover:border-[#a855f7]/60"
                  : "bg-white border-slate-200 hover:border-purple-300 shadow-slate-200/60"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                    Global Settlements
                  </h3>
                  <p className="text-[11px] text-cyan-600 font-mono mt-0.5">Escrow Verified Ledger</p>
                </div>
                <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-300">
                  ● 100% SLA
                </span>
              </div>

              <div className="space-y-1">
                <span
                  className={`text-2xl font-black ${
                    isDark
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-[#c084fc]"
                      : "text-emerald-600"
                  }`}
                >
                  ₹2,69,997
                </span>
                <span className={`text-[10px] block ${isDark ? "text-gray-400" : "text-slate-500"}`}>
                  + $5,148 USD settled this sprint
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span>🇺🇸</span>
                <span>🇬🇧</span>
                <span>🇮🇳</span>
                <span>🇦🇺</span>
                <span>🇦🇪</span>
                <span className={`text-[10px] ml-auto font-bold ${isDark ? "text-gray-400" : "text-slate-500"}`}>
                  12 Clients
                </span>
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================================
            2. DETAILS PANEL (Right side of the full-height left dashboard)
           ========================================================================= */}
        <section
          className={`border rounded-[32px] p-5 sm:p-7 shadow-2xl backdrop-blur-xl min-h-[550px] relative overflow-hidden transition-colors duration-300 ${
            isDark
              ? "bg-[#0d0920]/90 border-white/10"
              : "bg-white border-slate-200 shadow-slate-200/50"
          }`}
        >
          
          {/* Ambient Glow */}
          {isDark && (
            <div
              className="absolute -top-24 -right-24 w-64 h-64 rounded-full pointer-events-none blur-3xl opacity-20"
              style={{ background: "radial-gradient(circle, #a855f7, transparent)" }}
            />
          )}

          {/* =====================================================================
              DETAIL VIEW 1: USERS ("user id , date, time, country, name, email,
              number, new , ip addres , social media account")
              + Pagination ("10/ 20/ 30 krke ek column option button ho")
              + Pages ("pages me aage badane ka option ho matalb pages add ho 1 2 3")
             ===================================================================== */}
          {activeView === "users" && (
            <div className="space-y-5 animate-fadeIn">
              
              {/* Header Row */}
              <div
                className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b ${
                  isDark ? "border-white/10" : "border-slate-200"
                }`}
              >
                <div>
                  <h2 className={`text-xl font-black flex items-center gap-2 ${isDark ? "text-white" : "text-slate-900"}`}>
                    <span>👥 Client &amp; User Directory</span>
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-normal border ${
                        isDark
                          ? "bg-purple-500/20 text-[#c084fc] border-purple-500/30"
                          : "bg-purple-50 text-purple-700 border-purple-200"
                      }`}
                    >
                      {filteredUsers.length} Recorded
                    </span>
                  </h2>
                  <p className={`text-xs mt-0.5 ${isDark ? "text-[#94a3b8]" : "text-slate-500"}`}>
                    Full client audit identities, geographical IP attribution, and verified contact points.
                  </p>
                </div>

                {/* Rows Per Page Buttons ("10/ 20/ 30 krke ek column option button ho") */}
                <div
                  className={`flex items-center gap-1.5 p-1 rounded-xl border self-start sm:self-auto shrink-0 ${
                    isDark ? "bg-[#170e30] border-white/10" : "bg-slate-100 border-slate-200"
                  }`}
                >
                  <span className={`text-[10px] font-bold px-2 ${isDark ? "text-gray-400" : "text-slate-500"}`}>
                    Show:
                  </span>
                  {[10, 20, 30].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => {
                        setPageSize(num);
                        setCurrentPage(1);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        pageSize === num
                          ? "bg-purple-600 text-white shadow"
                          : isDark
                          ? "text-gray-300 hover:text-white hover:bg-white/5"
                          : "text-slate-600 hover:text-slate-900 hover:bg-white"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setPageSize(usersList.length);
                      setCurrentPage(1);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      pageSize === usersList.length
                        ? "bg-purple-600 text-white shadow"
                        : isDark
                        ? "text-gray-300 hover:text-white hover:bg-white/5"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white"
                    }`}
                  >
                    All
                  </button>
                </div>
              </div>

              {/* Filter and Search Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-72">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">🔍</span>
                  <input
                    type="text"
                    placeholder="Search ID, name, email, IP, country..."
                    value={userSearch}
                    onChange={(e) => {
                      setUserSearch(e.target.value);
                      setCurrentPage(1);
                    }}
                    className={`w-full rounded-xl pl-8 pr-3 py-2 text-xs outline-none border transition-colors ${
                      isDark
                        ? "bg-[#120d29] border-white/10 focus:border-[#a855f7] text-white placeholder-gray-500"
                        : "bg-slate-50 border-slate-200 focus:border-purple-500 text-slate-900 placeholder-slate-400"
                    }`}
                  />
                  {userSearch && (
                    <button
                      onClick={() => setUserSearch("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs cursor-pointer"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setUserStatusFilter("all")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                      userStatusFilter === "all"
                        ? isDark
                          ? "bg-white/10 text-white border-white/20"
                          : "bg-purple-100 text-purple-900 border-purple-300 font-bold"
                        : isDark
                        ? "text-gray-400 hover:text-white border-transparent"
                        : "text-slate-600 hover:text-slate-900 border-transparent"
                    }`}
                  >
                    All
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserStatusFilter("new")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                      userStatusFilter === "new"
                        ? "bg-emerald-500 text-white border-emerald-600 font-bold"
                        : isDark
                        ? "text-gray-400 hover:text-white border-transparent"
                        : "text-slate-600 hover:text-slate-900 border-transparent"
                    }`}
                  >
                    ✨ New Only
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserStatusFilter("returning")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                      userStatusFilter === "returning"
                        ? "bg-blue-600 text-white border-blue-700 font-bold"
                        : isDark
                        ? "text-gray-400 hover:text-white border-transparent"
                        : "text-slate-600 hover:text-slate-900 border-transparent"
                    }`}
                  >
                    🔄 Returning
                  </button>
                </div>
              </div>

              {/* THE 10-COLUMN USER TABLE (Exact columns requested) */}
              <div
                className={`overflow-x-auto rounded-2xl border shadow-inner ${
                  isDark ? "border-white/10 bg-[#070318]/90" : "border-slate-200 bg-white"
                }`}
              >
                <table className="w-full text-left text-xs border-collapse min-w-[950px]">
                  <thead>
                    <tr
                      className={`border-b uppercase text-[10px] tracking-wider font-bold ${
                        isDark
                          ? "border-white/10 bg-[#160e33]/90 text-gray-300"
                          : "border-slate-200 bg-slate-100 text-slate-700"
                      }`}
                    >
                      <th className="py-3 px-3 text-center">User ID</th>
                      <th className="py-3 px-3">Date</th>
                      <th className="py-3 px-3">Time</th>
                      <th className="py-3 px-3">Country</th>
                      <th className="py-3 px-3">Name</th>
                      <th className="py-3 px-3">Email</th>
                      <th className="py-3 px-3">Number</th>
                      <th className="py-3 px-3 text-center">New / Ret</th>
                      <th className="py-3 px-3 font-mono">IP Address</th>
                      <th className="py-3 px-3">Social Media</th>
                    </tr>
                  </thead>
                  <tbody
                    className={`divide-y ${
                      isDark ? "divide-white/5 text-gray-200" : "divide-slate-100 text-slate-700"
                    }`}
                  >
                    {paginatedUsers.length === 0 ? (
                      <tr>
                        <td colSpan={10} className="py-10 text-center text-gray-400">
                          No clients or users found matching &quot;{userSearch}&quot;
                        </td>
                      </tr>
                    ) : (
                      paginatedUsers.map((u) => (
                        <tr
                          key={u.id}
                          className={`transition-colors ${
                            isDark ? "hover:bg-white/[0.03]" : "hover:bg-slate-50"
                          }`}
                        >
                          {/* 1. User ID */}
                          <td className="py-3 px-3 text-center font-mono font-bold text-cyan-600">
                            {u.id}
                          </td>

                          {/* 2. Date */}
                          <td className="py-3 px-3 whitespace-nowrap">
                            {u.date}
                          </td>

                          {/* 3. Time */}
                          <td className={`py-3 px-3 whitespace-nowrap font-mono text-[11px] ${isDark ? "text-gray-400" : "text-slate-500"}`}>
                            {u.time}
                          </td>

                          {/* 4. Country */}
                          <td className="py-3 px-3 whitespace-nowrap">
                            <span className="mr-1.5 text-sm">{u.flag}</span>
                            <span className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>{u.country}</span>
                          </td>

                          {/* 5. Name */}
                          <td className={`py-3 px-3 whitespace-nowrap font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                            {u.name}
                          </td>

                          {/* 6. Email */}
                          <td className="py-3 px-3 whitespace-nowrap text-purple-600">
                            <a href={`mailto:${u.email}`} className="hover:underline">
                              {u.email}
                            </a>
                          </td>

                          {/* 7. Number */}
                          <td className="py-3 px-3 whitespace-nowrap font-mono">
                            <a href={`tel:${u.number.replace(/\s+/g, "")}`} className="hover:text-emerald-500">
                              {u.number}
                            </a>
                          </td>

                          {/* 8. New */}
                          <td className="py-3 px-3 text-center whitespace-nowrap">
                            {u.isNew ? (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold">
                                ✨ New
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-300 text-[10px] font-semibold">
                                🔄 Returning
                              </span>
                            )}
                          </td>

                          {/* 9. IP Address */}
                          <td className={`py-3 px-3 whitespace-nowrap font-mono text-[11px] ${isDark ? "text-gray-400" : "text-slate-500"}`}>
                            {u.ip}
                          </td>

                          {/* 10. Social Media Account */}
                          <td className="py-3 px-3 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] font-medium ${
                                isDark
                                  ? "bg-[#181033] border-white/10 text-[#c084fc]"
                                  : "bg-purple-50 border-purple-200 text-purple-700"
                              }`}
                            >
                              {u.socialType === "linkedin" && "💼"}
                              {u.socialType === "twitter" && "🐦"}
                              {u.socialType === "instagram" && "📸"}
                              {u.socialType === "whatsapp" && "💬"}
                              <span>{u.social}</span>
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* PAGINATION BAR ("pages me aage badane ka option ho matalb pages add ho 1 2 3 aise krke") */}
              <div
                className={`flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t text-xs ${
                  isDark ? "border-white/10 text-gray-400" : "border-slate-200 text-slate-500"
                }`}
              >
                <span>
                  Showing <strong className={isDark ? "text-white" : "text-slate-900"}>{(currentPage - 1) * pageSize + 1}</strong> to{" "}
                  <strong className={isDark ? "text-white" : "text-slate-900"}>
                    {Math.min(currentPage * pageSize, filteredUsers.length)}
                  </strong>{" "}
                  of <strong className={isDark ? "text-white" : "text-slate-900"}>{filteredUsers.length}</strong> users
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    disabled={currentPage <= 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className={`px-3 py-1.5 rounded-lg border disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all font-semibold ${
                      isDark
                        ? "bg-[#170e30] border-white/10 hover:bg-[#251747] text-white"
                        : "bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-700"
                    }`}
                  >
                    ← Prev
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNo) => (
                    <button
                      key={pageNo}
                      type="button"
                      onClick={() => setCurrentPage(pageNo)}
                      className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        currentPage === pageNo
                          ? "bg-purple-600 text-white shadow-md shadow-purple-950/80 ring-1 ring-[#c084fc]"
                          : isDark
                          ? "bg-[#170e30] text-gray-300 hover:text-white border-white/10 hover:bg-[#251747]"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200"
                      }`}
                    >
                      {pageNo}
                    </button>
                  ))}

                  <button
                    type="button"
                    disabled={currentPage >= totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className={`px-3 py-1.5 rounded-lg border disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all font-semibold ${
                      isDark
                        ? "bg-[#170e30] border-white/10 hover:bg-[#251747] text-white"
                        : "bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-700"
                    }`}
                  >
                    Next →
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* =====================================================================
              DETAIL VIEW 2: TOTAL MAIL (Inquiries & Audits)
             ===================================================================== */}
          {activeView === "mails" && (
            <div className="space-y-5 animate-fadeIn">
              <div className={`flex items-center justify-between pb-4 border-b ${isDark ? "border-white/10" : "border-slate-200"}`}>
                <div>
                  <h2 className={`text-xl font-black flex items-center gap-2 ${isDark ? "text-white" : "text-slate-900"}`}>
                    <span>✉️ Inbound Email &amp; Form Messages</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 font-bold border border-cyan-300">
                      {mailsList.length} Messages
                    </span>
                  </h2>
                  <p className={`text-xs mt-0.5 ${isDark ? "text-[#94a3b8]" : "text-slate-500"}`}>
                    Customer RFPs, technical audit submissions, and project inquiries.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {mailsList.map((m) => (
                  <div
                    key={m.id}
                    className={`p-4 rounded-2xl border transition-all text-left space-y-2 ${
                      isDark
                        ? "bg-[#070318]/90 border-white/10 hover:border-[#a855f7]/50"
                        : "bg-slate-50/80 border-slate-200 hover:border-purple-300"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold text-sm ${isDark ? "text-white" : "text-slate-900"}`}>{m.senderName}</span>
                        <span className="text-xs text-cyan-600">({m.senderEmail})</span>
                        <span className={`text-[10px] font-mono ${isDark ? "text-gray-400" : "text-slate-400"}`}>[{m.phone}]</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                            m.status === "Unread"
                              ? "bg-amber-100 text-amber-800 border border-amber-300"
                              : "bg-emerald-100 text-emerald-800 border border-emerald-300"
                          }`}
                        >
                          {m.status}
                        </span>
                        <span className={`text-[11px] font-mono ${isDark ? "text-gray-400" : "text-slate-400"}`}>{m.date} • {m.time}</span>
                      </div>
                    </div>

                    <div className={`p-3 rounded-xl border space-y-1 ${isDark ? "bg-[#120d29] border-white/5 text-gray-300" : "bg-white border-slate-200 text-slate-700 shadow-sm"}`}>
                      <p className="text-xs font-bold text-purple-700">Subject: {m.subject}</p>
                      <p className="text-xs leading-relaxed">{m.message}</p>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className={`text-[11px] ${isDark ? "text-gray-400" : "text-slate-500"}`}>
                        Tagged Deliverable: <strong className={isDark ? "text-white" : "text-slate-800"}>{m.service}</strong>
                      </span>
                      <a
                        href={`mailto:${m.senderEmail}?subject=Re: ${encodeURIComponent(m.subject)}`}
                        className="px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-[11px] font-bold transition-all shadow-sm"
                      >
                        Reply via Email ✉️
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =====================================================================
              DETAIL VIEW 3: WHATSAPP MESSAGES
             ===================================================================== */}
          {activeView === "whatsapp" && (
            <div className="space-y-5 animate-fadeIn">
              <div className={`flex items-center justify-between pb-4 border-b ${isDark ? "border-white/10" : "border-slate-200"}`}>
                <div>
                  <h2 className={`text-xl font-black flex items-center gap-2 ${isDark ? "text-white" : "text-slate-900"}`}>
                    <span>💬 WhatsApp Client Conversations</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                      {whatsappList.length} Active Leads
                    </span>
                  </h2>
                  <p className={`text-xs mt-0.5 ${isDark ? "text-[#94a3b8]" : "text-slate-500"}`}>
                    Direct WhatsApp chat clicks, initial inquiries, and instant client follow-ups.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {whatsappList.map((wa) => (
                  <div
                    key={wa.id}
                    className={`p-4 rounded-2xl border transition-all text-left space-y-2.5 ${
                      isDark
                        ? "bg-[#070318]/90 border-white/10 hover:border-emerald-500/50"
                        : "bg-slate-50/80 border-slate-200 hover:border-emerald-400"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{wa.flag}</span>
                        <span className={`font-bold text-sm ${isDark ? "text-white" : "text-slate-900"}`}>{wa.clientName}</span>
                        <span className="text-xs font-mono text-emerald-600">({wa.phoneNumber})</span>
                      </div>
                      <span className={`text-[11px] font-mono ${isDark ? "text-gray-400" : "text-slate-400"}`}>{wa.date} • {wa.time}</span>
                    </div>

                    <div className={`p-3 rounded-xl border text-xs ${isDark ? "bg-[#0e1620] border-emerald-900/40 text-gray-200" : "bg-white border-emerald-200 text-slate-800 shadow-sm"}`}>
                      &quot;{wa.message}&quot;
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className={`text-[10px] uppercase font-bold ${isDark ? "text-gray-400" : "text-slate-500"}`}>
                        Country: {wa.country} • Status: <strong className="text-emerald-600">{wa.status}</strong>
                      </span>
                      <a
                        href={`https://wa.me/${wa.phoneNumber.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-sm"
                      >
                        <span>Open in WhatsApp</span>
                        <span>💬</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =====================================================================
              DETAIL VIEW 4: PAYMENTS
             ===================================================================== */}
          {activeView === "payments" && (
            <div className="space-y-5 animate-fadeIn">
              <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b ${isDark ? "border-white/10" : "border-slate-200"}`}>
                <div>
                  <h2 className={`text-xl font-black flex items-center gap-2 ${isDark ? "text-white" : "text-slate-900"}`}>
                    <span>💳 Settled Payments Ledger</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                      {paymentsList.length} Transactions
                    </span>
                  </h2>
                  <p className={`text-xs mt-0.5 ${isDark ? "text-[#94a3b8]" : "text-slate-500"}`}>
                    Multi-currency authorized escrow settlements via UPI, Stripe, HDFC Bank, PayPal &amp; Wise.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveView("add_payment")}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-indigo-600 hover:brightness-110 text-white text-xs font-bold transition-all shadow-md cursor-pointer self-start sm:self-auto"
                >
                  <span>+ Add Payment</span>
                </button>
              </div>

              <div
                className={`overflow-x-auto rounded-2xl border shadow-inner ${
                  isDark ? "border-white/10 bg-[#070318]/90" : "border-slate-200 bg-white"
                }`}
              >
                <table className="w-full text-left text-xs border-collapse min-w-[700px]">
                  <thead>
                    <tr
                      className={`border-b uppercase text-[10px] tracking-wider font-bold ${
                        isDark ? "border-white/10 bg-[#160e33]/90 text-gray-300" : "border-slate-200 bg-slate-100 text-slate-700"
                      }`}
                    >
                      <th className="py-3 px-3">Transaction ID</th>
                      <th className="py-3 px-3">Date</th>
                      <th className="py-3 px-3">Client &amp; Domain</th>
                      <th className="py-3 px-3">Deliverable Service</th>
                      <th className="py-3 px-3 text-right">Settled Amount</th>
                      <th className="py-3 px-3 text-center">Rail</th>
                      <th className="py-3 px-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${isDark ? "divide-white/5 text-gray-200" : "divide-slate-100 text-slate-700"}`}>
                    {paymentsList.map((p) => (
                      <tr key={p.id} className={`transition-colors ${isDark ? "hover:bg-white/[0.03]" : "hover:bg-slate-50"}`}>
                        <td className="py-3 px-3 font-mono text-cyan-600 font-bold">
                          {p.id}
                          <span className={`block text-[9px] font-normal ${isDark ? "text-gray-400" : "text-slate-400"}`}>{p.txnRef}</span>
                        </td>
                        <td className={`py-3 px-3 whitespace-nowrap text-[11px] ${isDark ? "text-gray-300" : "text-slate-600"}`}>
                          {p.date}
                          <span className={`block text-[9px] ${isDark ? "text-gray-400" : "text-slate-400"}`}>{p.time}</span>
                        </td>
                        <td className="py-3 px-3">
                          <span className={`font-bold block ${isDark ? "text-white" : "text-slate-900"}`}>{p.clientName}</span>
                          <span className="text-[10px] text-purple-600 font-mono">{p.domain}</span>
                        </td>
                        <td className="py-3 px-3">
                          {p.service}
                        </td>
                        <td className="py-3 px-3 text-right font-black text-emerald-600 text-sm whitespace-nowrap">
                          {p.amount}
                        </td>
                        <td className="py-3 px-3 text-center whitespace-nowrap">
                          <span
                            className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${
                              isDark ? "bg-[#181033] border-white/10 text-white" : "bg-slate-100 border-slate-200 text-slate-800"
                            }`}
                          >
                            {p.rail}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold">
                            ✓ {p.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =====================================================================
              DETAIL VIEW 5: ADD PAYMENT
             ===================================================================== */}
          {activeView === "add_payment" && (
            <div className="space-y-5 animate-fadeIn max-w-2xl mx-auto">
              <div className={`pb-4 border-b ${isDark ? "border-white/10" : "border-slate-200"}`}>
                <h2 className={`text-xl font-black flex items-center gap-2 ${isDark ? "text-white" : "text-slate-900"}`}>
                  <span>➕ Record / Authorize New Client Payment</span>
                </h2>
                <p className={`text-xs mt-0.5 ${isDark ? "text-[#94a3b8]" : "text-slate-500"}`}>
                  Record offline bank wire, custom retainer settlement, or direct client receipt.
                </p>
              </div>

              <form onSubmit={handleAddPaymentSubmit} className="space-y-4 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-purple-600 mb-1">Client Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe / Global Brand Ltd"
                      value={newPayClient}
                      onChange={(e) => setNewPayClient(e.target.value)}
                      className={`w-full rounded-xl px-3.5 py-2.5 text-xs outline-none border transition-colors ${
                        isDark ? "bg-[#120d29] border-white/10 focus:border-[#a855f7] text-white" : "bg-slate-50 border-slate-200 focus:border-purple-500 text-slate-900"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-purple-600 mb-1">Work Email</label>
                    <input
                      type="email"
                      placeholder="client@domain.com"
                      value={newPayEmail}
                      onChange={(e) => setNewPayEmail(e.target.value)}
                      className={`w-full rounded-xl px-3.5 py-2.5 text-xs outline-none border transition-colors ${
                        isDark ? "bg-[#120d29] border-white/10 focus:border-[#a855f7] text-white" : "bg-slate-50 border-slate-200 focus:border-purple-500 text-slate-900"
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-purple-600 mb-1">Target Domain URL</label>
                    <input
                      type="text"
                      placeholder="https://clientwebsite.com"
                      value={newPayDomain}
                      onChange={(e) => setNewPayDomain(e.target.value)}
                      className={`w-full rounded-xl px-3.5 py-2.5 text-xs outline-none border transition-colors ${
                        isDark ? "bg-[#120d29] border-white/10 focus:border-[#a855f7] text-white" : "bg-slate-50 border-slate-200 focus:border-purple-500 text-slate-900"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-purple-600 mb-1">Authorized Service Package</label>
                    <select
                      value={newPayService}
                      onChange={(e) => setNewPayService(e.target.value)}
                      className={`w-full rounded-xl px-3.5 py-2.5 text-xs outline-none border transition-colors ${
                        isDark ? "bg-[#120d29] border-white/10 focus:border-[#a855f7] text-white" : "bg-slate-50 border-slate-200 focus:border-purple-500 text-slate-900"
                      }`}
                    >
                      <option value="Enterprise SEO Suite">Enterprise SEO Suite</option>
                      <option value="Next.js Web Engineering">Next.js Web Engineering</option>
                      <option value="Flutter App Dev">Flutter App Dev</option>
                      <option value="High-DR Guest Posting">High-DR Guest Posting</option>
                      <option value="Full-Stack Laravel / PHP">Full-Stack Laravel / PHP</option>
                      <option value="Custom Invoiced Retainer">Custom Invoiced Retainer</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-purple-600 mb-1">Amount *</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 49999 or 950"
                      value={newPayAmount}
                      onChange={(e) => setNewPayAmount(e.target.value)}
                      className={`w-full rounded-xl px-3.5 py-2.5 text-xs outline-none border transition-colors ${
                        isDark ? "bg-[#120d29] border-white/10 focus:border-[#a855f7] text-white" : "bg-slate-50 border-slate-200 focus:border-purple-500 text-slate-900"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-purple-600 mb-1">Currency</label>
                    <select
                      value={newPayCurrency}
                      onChange={(e) => setNewPayCurrency(e.target.value as any)}
                      className={`w-full rounded-xl px-3.5 py-2.5 text-xs outline-none border transition-colors ${
                        isDark ? "bg-[#120d29] border-white/10 focus:border-[#a855f7] text-white" : "bg-slate-50 border-slate-200 focus:border-purple-500 text-slate-900"
                      }`}
                    >
                      <option value="INR">₹ INR (India)</option>
                      <option value="USD">$ USD (Global)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-purple-600 mb-1">Payment Rail</label>
                    <select
                      value={newPayRail}
                      onChange={(e) => setNewPayRail(e.target.value as any)}
                      className={`w-full rounded-xl px-3.5 py-2.5 text-xs outline-none border transition-colors ${
                        isDark ? "bg-[#120d29] border-white/10 focus:border-[#a855f7] text-white" : "bg-slate-50 border-slate-200 focus:border-purple-500 text-slate-900"
                      }`}
                    >
                      <option value="UPI">⚡ UPI / QR</option>
                      <option value="Stripe">💳 Stripe Card</option>
                      <option value="Bank Wire">🏦 Bank Wire / HDFC</option>
                      <option value="PayPal">🅿️ PayPal</option>
                      <option value="Wise">🌍 Wise</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={`block text-xs font-semibold mb-1 ${isDark ? "text-gray-400" : "text-slate-500"}`}>
                    Bank UTR / Transaction Reference (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. UTR4120938120 or Wire #90214"
                    value={newPayRef}
                    onChange={(e) => setNewPayRef(e.target.value)}
                    className={`w-full rounded-xl px-3.5 py-2.5 text-xs outline-none border transition-colors ${
                      isDark ? "bg-[#120d29] border-white/10 focus:border-[#a855f7] text-white" : "bg-slate-50 border-slate-200 focus:border-purple-500 text-slate-900"
                    }`}
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-[#6366f1] to-[#a855f7] hover:brightness-110 active:scale-[0.98] text-white text-xs font-bold transition-all shadow-xl shadow-purple-950/40 cursor-pointer"
                  >
                    Authorize &amp; Record Payment ✓
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* =====================================================================
              DETAIL VIEW 6: INVOICE GENERATOR
             ===================================================================== */}
          {activeView === "invoice" && (
            <div className="space-y-6 animate-fadeIn">
              <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b ${isDark ? "border-white/10" : "border-slate-200"}`}>
                <div>
                  <h2 className={`text-xl font-black flex items-center gap-2 ${isDark ? "text-white" : "text-slate-900"}`}>
                    <span>🧾 Enterprise Tax Invoice Generator</span>
                  </h2>
                  <p className={`text-xs mt-0.5 ${isDark ? "text-[#94a3b8]" : "text-slate-500"}`}>
                    Generate official GST / VAT compliant invoices for domestic and global clients.
                  </p>
                </div>

                {selectedInvoicePreview && (
                  <button
                    type="button"
                    onClick={handlePrintInvoice}
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all cursor-pointer shadow-md self-start sm:self-auto"
                  >
                    🖨️ Print / Save PDF
                  </button>
                )}
              </div>

              {/* Invoice Form */}
              <form
                onSubmit={handleCreateInvoiceSubmit}
                className={`border rounded-2xl p-5 space-y-4 text-left ${
                  isDark ? "bg-[#070318]/90 border-white/10" : "bg-slate-50 border-slate-200"
                }`}
              >
                <h3 className={`text-sm font-bold flex items-center gap-1.5 ${isDark ? "text-white" : "text-slate-900"}`}>
                  <span>✦ Invoice Parameters</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-purple-600 mb-1">Client Legal Name / Entity *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Nordhaus Architecture Ltd"
                      value={invClientName}
                      onChange={(e) => setInvClientName(e.target.value)}
                      className={`w-full rounded-xl px-3.5 py-2.5 text-xs outline-none border transition-colors ${
                        isDark ? "bg-[#120d29] border-white/10 focus:border-[#a855f7] text-white" : "bg-white border-slate-200 focus:border-purple-500 text-slate-900"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-purple-600 mb-1">Billing Work Email</label>
                    <input
                      type="email"
                      placeholder="accounts@nordhaus.com"
                      value={invClientEmail}
                      onChange={(e) => setInvClientEmail(e.target.value)}
                      className={`w-full rounded-xl px-3.5 py-2.5 text-xs outline-none border transition-colors ${
                        isDark ? "bg-[#120d29] border-white/10 focus:border-[#a855f7] text-white" : "bg-white border-slate-200 focus:border-purple-500 text-slate-900"
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-purple-600 mb-1">Target Domain</label>
                    <input
                      type="text"
                      placeholder="https://nordhaus-estates.com"
                      value={invClientDomain}
                      onChange={(e) => setInvClientDomain(e.target.value)}
                      className={`w-full rounded-xl px-3.5 py-2.5 text-xs outline-none border transition-colors ${
                        isDark ? "bg-[#120d29] border-white/10 focus:border-[#a855f7] text-white" : "bg-white border-slate-200 focus:border-purple-500 text-slate-900"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-purple-600 mb-1">Client Physical Address</label>
                    <input
                      type="text"
                      placeholder="450 Sutter St, San Francisco, CA, USA"
                      value={invClientAddress}
                      onChange={(e) => setInvClientAddress(e.target.value)}
                      className={`w-full rounded-xl px-3.5 py-2.5 text-xs outline-none border transition-colors ${
                        isDark ? "bg-[#120d29] border-white/10 focus:border-[#a855f7] text-white" : "bg-white border-slate-200 focus:border-purple-500 text-slate-900"
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-purple-600 mb-1">Deliverable Description</label>
                    <input
                      type="text"
                      value={invServiceName}
                      onChange={(e) => setInvServiceName(e.target.value)}
                      className={`w-full rounded-xl px-3.5 py-2.5 text-xs outline-none border transition-colors ${
                        isDark ? "bg-[#120d29] border-white/10 focus:border-[#a855f7] text-white" : "bg-white border-slate-200 focus:border-purple-500 text-slate-900"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-purple-600 mb-1">Rate ({invCurrency}) *</label>
                    <input
                      type="number"
                      required
                      value={invRate}
                      onChange={(e) => setInvRate(e.target.value)}
                      className={`w-full rounded-xl px-3.5 py-2.5 text-xs outline-none border transition-colors ${
                        isDark ? "bg-[#120d29] border-white/10 focus:border-[#a855f7] text-white" : "bg-white border-slate-200 focus:border-purple-500 text-slate-900"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-purple-600 mb-1">Currency</label>
                    <select
                      value={invCurrency}
                      onChange={(e) => setInvCurrency(e.target.value as any)}
                      className={`w-full rounded-xl px-3.5 py-2.5 text-xs outline-none border transition-colors ${
                        isDark ? "bg-[#120d29] border-white/10 focus:border-[#a855f7] text-white" : "bg-white border-slate-200 focus:border-purple-500 text-slate-900"
                      }`}
                    >
                      <option value="INR">₹ INR</option>
                      <option value="USD">$ USD</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#a855f7] hover:brightness-110 text-white text-xs font-bold transition-all shadow-lg cursor-pointer"
                  >
                    Generate Official Invoice 🧾 →
                  </button>
                </div>
              </form>

              {/* Printable Invoice Preview */}
              {selectedInvoicePreview && (
                <div className="p-6 sm:p-8 rounded-2xl bg-white text-gray-900 shadow-2xl border border-gray-200 text-left space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-gray-200">
                    <div>
                      <h3 className="text-xl font-black text-purple-900 tracking-tight">
                        BALAJI PRIME MEDIA
                      </h3>
                      <p className="text-xs text-gray-600 mt-0.5">
                        Enterprise Digital Growth &amp; Technology Escrow
                      </p>
                      <p className="text-[11px] text-gray-500 font-mono mt-1">
                        GSTIN: 07AABCB1234D1ZP • CIN: U72900DL2025PTC123456
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-black text-gray-900 block font-mono">
                        {selectedInvoicePreview.invoiceNo}
                      </span>
                      <span className="text-xs text-gray-600 block">Date: {selectedInvoicePreview.date}</span>
                      <span className="text-xs text-emerald-700 font-bold block">Status: PAID (Escrow Settled)</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Billed To:</span>
                      <strong className="text-sm text-gray-900 block">{selectedInvoicePreview.clientName}</strong>
                      <span className="text-gray-600 block">{selectedInvoicePreview.clientEmail}</span>
                      <span className="text-purple-700 font-mono block">{selectedInvoicePreview.clientDomain}</span>
                      <span className="text-gray-500 block text-[11px] mt-0.5">{selectedInvoicePreview.clientAddress}</span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Payment Coordinates:</span>
                      <span className="text-gray-700 block font-semibold">HDFC Bank Limited</span>
                      <span className="text-gray-600 font-mono block">A/C: 50200084920491</span>
                      <span className="text-gray-600 font-mono block">IFSC: HDFC0001842</span>
                      <span className="text-gray-600 font-mono block">SWIFT: HDFCINBB</span>
                    </div>
                  </div>

                  {/* Invoice Items Table */}
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-gray-300 bg-gray-50 text-gray-600 uppercase text-[10px] font-bold">
                        <th className="py-2.5 px-3">Item Description</th>
                        <th className="py-2.5 px-3 text-center">Qty</th>
                        <th className="py-2.5 px-3 text-right">Rate</th>
                        <th className="py-2.5 px-3 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="py-3 px-3 font-medium text-gray-900">
                          {selectedInvoicePreview.serviceName}
                        </td>
                        <td className="py-3 px-3 text-center text-gray-700">{selectedInvoicePreview.qty}</td>
                        <td className="py-3 px-3 text-right font-mono text-gray-800">
                          {selectedInvoicePreview.currency === "INR" ? "₹" : "$"}{selectedInvoicePreview.rate.toLocaleString()}
                        </td>
                        <td className="py-3 px-3 text-right font-bold font-mono text-gray-900">
                          {selectedInvoicePreview.currency === "INR" ? "₹" : "$"}{(selectedInvoicePreview.rate * selectedInvoicePreview.qty).toLocaleString()}
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  {/* Total Summary */}
                  <div className="flex justify-end pt-4 border-t border-gray-200">
                    <div className="w-64 space-y-1.5 text-xs">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal:</span>
                        <span className="font-mono">
                          {selectedInvoicePreview.currency === "INR" ? "₹" : "$"}{(selectedInvoicePreview.rate * selectedInvoicePreview.qty).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Tax ({selectedInvoicePreview.taxPercent}%):</span>
                        <span className="font-mono">
                          {selectedInvoicePreview.currency === "INR" ? "₹" : "$"}
                          {((selectedInvoicePreview.rate * selectedInvoicePreview.qty * selectedInvoicePreview.taxPercent) / 100).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm font-black text-gray-900 pt-2 border-t border-gray-300">
                        <span>Grand Total:</span>
                        <span className="font-mono text-purple-900 text-base">
                          {selectedInvoicePreview.currency === "INR" ? "₹" : "$"}
                          {(
                            selectedInvoicePreview.rate * selectedInvoicePreview.qty +
                            (selectedInvoicePreview.rate * selectedInvoicePreview.qty * selectedInvoicePreview.taxPercent) / 100
                          ).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        </section>

      </main>
    </div>
  );
}
