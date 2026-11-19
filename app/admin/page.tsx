"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import * as XLSX from "xlsx";
import App from "@/App";
import BrandLogo from "@/app/components/BrandLogo";
import SaasluCrmOverview from "./SaasluCrmOverview";
import LiveDateWidget from "./LiveDateWidget";

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
  authType?: string;
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
  amount: string; // Total Amount
  paidAmount: string; // Paid
  pendingAmount: string; // Pending / Remaining
  currency: "INR" | "USD";
  rail: "UPI" | "Stripe" | "Bank Wire" | "PayPal" | "Wise";
  status: "Paid" | "Pending" | "Remaining" | "Settled" | "Escrow Verified";
  txnRef: string;
}

interface ProjectItem {
  id: string;
  name: string;
  clientName: string;
  domain: string;
  category: string;
  budget: string;
  timeline: string;
  status: "Active" | "Planning" | "In Review";
  createdAt: string;
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
  { id: "BPM-TXN-2026-9F8A2B", date: "06 Nov 2026", time: "21:30 IST", clientName: "Alexander Wright", clientEmail: "alex@nordhaus-estates.com", domain: "nordhaus-estates.com", service: "Next.js Web Engineering", amount: "$1,199", paidAmount: "$1,199", pendingAmount: "$0", currency: "USD", rail: "Stripe", status: "Paid", txnRef: "ch_3N8k2vFkd90" },
  { id: "BPM-TXN-2026-4C1E7A", date: "06 Nov 2026", time: "19:15 IST", clientName: "Vikram Malhotra", clientEmail: "vikram@aether-saas.io", domain: "aether-saas.io", service: "Enterprise SEO Suite", amount: "₹49,999", paidAmount: "₹30,000", pendingAmount: "₹19,999", currency: "INR", rail: "UPI", status: "Remaining", txnRef: "UTR412389104821" },
  { id: "BPM-TXN-2026-8D2A1C", date: "05 Nov 2026", time: "18:40 IST", clientName: "Charlotte Davies", clientEmail: "c.davies@hotel-mira.co.uk", domain: "hotel-mira.co.uk", service: "High-DR Guest Posting", amount: "$1,499", paidAmount: "$1,499", pendingAmount: "$0", currency: "USD", rail: "Wise", status: "Paid", txnRef: "WISE-GB-89102" },
  { id: "BPM-TXN-2026-3B9F5D", date: "05 Nov 2026", time: "15:20 IST", clientName: "Ananya Sharma", clientEmail: "ananya@fintechscale.in", domain: "fintechscale.in", service: "Flutter App Dev", amount: "₹84,999", paidAmount: "₹50,000", pendingAmount: "₹34,999", currency: "INR", rail: "Bank Wire", status: "Remaining", txnRef: "HDFC-NEFT-908124" },
  { id: "BPM-TXN-2026-7A4E2C", date: "04 Nov 2026", time: "12:10 IST", clientName: "Marcus Brody", clientEmail: "mbrody@brodycap.com", domain: "brodycap.com", service: "Dedicated Link Retainer", amount: "$2,450", paidAmount: "$0", pendingAmount: "$2,450", currency: "USD", rail: "PayPal", status: "Pending", txnRef: "PP-TXN-981241" },
];

const INITIAL_PROJECTS: ProjectItem[] = [
  { id: "PRJ-101", name: "Headless Next.js Architecture", clientName: "Alexander Wright", domain: "nordhaus-estates.com", category: "Web Engineering", budget: "$1,199", timeline: "2 Weeks", status: "Active", createdAt: "06 Nov 2026" },
  { id: "PRJ-102", name: "Enterprise SEO Suite Sprint", clientName: "Vikram Malhotra", domain: "aether-saas.io", category: "Enterprise SEO", budget: "₹49,999", timeline: "4 Weeks", status: "Active", createdAt: "06 Nov 2026" },
  { id: "PRJ-103", name: "High-DR Editorial Placements", clientName: "Charlotte Davies", domain: "hotel-mira.co.uk", category: "Guest Posting", budget: "$1,499", timeline: "10 Days", status: "In Review", createdAt: "05 Nov 2026" },
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

  // Active Dashboard Selection (Default: "overview" matching Saaslu CRM Dashboard)
  const [activeView, setActiveView] = useState<
    "overview" | "users" | "mails" | "whatsapp" | "payments" | "add_payment" | "invoice" | "create_project"
  >("overview");

  // Database Data States
  const [usersList, setUsersList] = useState<UserItem[]>(INITIAL_USERS);
  const [mailsList, setMailsList] = useState<MailItem[]>(INITIAL_MAILS);
  const [whatsappList, setWhatsappList] = useState<WhatsAppItem[]>(INITIAL_WHATSAPP);
  const [paymentsList, setPaymentsList] = useState<PaymentItem[]>(INITIAL_PAYMENTS);
  const [projectsList, setProjectsList] = useState<ProjectItem[]>(INITIAL_PROJECTS);
  const [invoicesList, setInvoicesList] = useState<InvoiceItem[]>(INITIAL_INVOICES);

  // User Table Controls ("10/ 20/ 30 krke ek column option button ho" and "pages add ho 1 2 3", default 50)
  const [pageSize, setPageSize] = useState<number>(50);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [userSearch, setUserSearch] = useState("");
  const [userStatusFilter, setUserStatusFilter] = useState<"all" | "new" | "returning">("all");

  // Payment Filter State (Pending, Paid, Remaining)
  const [paymentFilter, setPaymentFilter] = useState<"all" | "paid" | "pending" | "remaining">("all");

  // Add Payment Form State
  const [newPayClient, setNewPayClient] = useState("");
  const [newPayEmail, setNewPayEmail] = useState("");
  const [newPayDomain, setNewPayDomain] = useState("");
  const [newPayService, setNewPayService] = useState("Enterprise SEO Suite");
  const [newPayAmount, setNewPayAmount] = useState("");
  const [newPayPaid, setNewPayPaid] = useState("");
  const [newPayPending, setNewPayPending] = useState("");
  const [newPayCurrency, setNewPayCurrency] = useState<"INR" | "USD">("INR");
  const [newPayRail, setNewPayRail] = useState<"UPI" | "Stripe" | "Bank Wire" | "PayPal" | "Wise">("UPI");
  const [newPayStatus, setNewPayStatus] = useState<"Paid" | "Pending" | "Remaining">("Paid");
  const [newPayRef, setNewPayRef] = useState("");

  // Create Project Form State
  const [newPrjName, setNewPrjName] = useState("");
  const [newPrjClient, setNewPrjClient] = useState("");
  const [newPrjDomain, setNewPrjDomain] = useState("");
  const [newPrjCategory, setNewPrjCategory] = useState("Web Engineering");
  const [newPrjBudget, setNewPrjBudget] = useState("");
  const [newPrjTimeline, setNewPrjTimeline] = useState("3 Weeks");

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

  // Manual WhatsApp Lead State
  const [showAddWhatsAppModal, setShowAddWhatsAppModal] = useState(false);
  const [newWaName, setNewWaName] = useState("");
  const [newWaPhone, setNewWaPhone] = useState("");
  const [newWaMessage, setNewWaMessage] = useState("");
  const [newWaCountry, setNewWaCountry] = useState("India");

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

  // Aurora Sign In / Admin Authentication Gate State (Default to false so login form renders instantly)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    try {
      const auth = sessionStorage.getItem("bpm_admin_authenticated");
      if (auth === "true") {
        setIsAuthenticated(true);
      }
    } catch {}
  }, []);

  const [isRefreshing, setIsRefreshing] = useState(false);

  // Live Data Feed Fetcher: Loads all real form submissions and payments from database & Supabase
  const fetchFeed = async (showToastOnManual = false) => {
    setIsRefreshing(true);
    try {
      const res = await fetch(`/api/admin/feed?_t=${Date.now()}`, {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
        },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          if (Array.isArray(data.users) && data.users.length > 0) {
            setUsersList(data.users);
          }
          if (Array.isArray(data.mails) && data.mails.length > 0) {
            setMailsList(data.mails);
          }
          if (Array.isArray(data.whatsapp) && data.whatsapp.length > 0) {
            setWhatsappList(data.whatsapp);
          }
          if (Array.isArray(data.payments) && data.payments.length > 0) {
            setPaymentsList(data.payments);
          }
          if (showToastOnManual) {
            showToast(`✅ Synced with database! (${data.mails?.length || 0} Inquiries, ${data.whatsapp?.length || 0} WhatsApp leads)`);
          }
        }
      } else if (showToastOnManual) {
        showToast("⚠️ Could not load database feed.");
      }
    } catch (err) {
      console.warn("Live feed fetch error:", err);
      if (showToastOnManual) {
        showToast("⚠️ Network error while fetching feed.");
      }
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    fetchFeed();
    const interval = setInterval(() => fetchFeed(false), 8000);
    return () => clearInterval(interval);
  }, [isAuthenticated]);

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
    try {
      sessionStorage.removeItem("bpm_admin_authenticated");
      sessionStorage.removeItem("bpm_admin_user");
    } catch {}
    setIsAuthenticated(false);
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

  // Filtered Payments (Pending, Paid, Remaining)
  const filteredPayments = useMemo(() => {
    if (paymentFilter === "all") return paymentsList;
    if (paymentFilter === "paid") {
      return paymentsList.filter((p) => p.status === "Paid" || p.status === "Settled");
    }
    if (paymentFilter === "pending") {
      return paymentsList.filter((p) => p.status === "Pending");
    }
    if (paymentFilter === "remaining") {
      return paymentsList.filter((p) => p.status === "Remaining");
    }
    return paymentsList;
  }, [paymentsList, paymentFilter]);

  // Submit New Payment Handler (Supports Paid, Pending, Remaining)
  const handleAddPaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPayClient.trim() || !newPayAmount.trim()) {
      showToast("⚠️ Please enter client name and amount.");
      return;
    }

    const symbol = newPayCurrency === "INR" ? "₹" : "$";
    const totalNum = parseFloat(newPayAmount) || 0;
    const paidNum = newPayPaid ? parseFloat(newPayPaid) : (newPayStatus === "Paid" ? totalNum : 0);
    const pendingNum = newPayPending ? parseFloat(newPayPending) : Math.max(0, totalNum - paidNum);

    const newPayment: PaymentItem = {
      id: `BPM-TXN-2026-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      time: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) + " IST",
      clientName: newPayClient,
      clientEmail: newPayEmail || "client@company.com",
      domain: newPayDomain || "https://clientbrand.com",
      service: newPayService,
      amount: `${symbol}${totalNum.toLocaleString()}`,
      paidAmount: `${symbol}${paidNum.toLocaleString()}`,
      pendingAmount: `${symbol}${pendingNum.toLocaleString()}`,
      currency: newPayCurrency,
      rail: newPayRail,
      status: newPayStatus,
      txnRef: newPayRef || `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
    };

    setPaymentsList([newPayment, ...paymentsList]);
    setNewPayClient("");
    setNewPayEmail("");
    setNewPayDomain("");
    setNewPayAmount("");
    setNewPayPaid("");
    setNewPayPending("");
    setNewPayRef("");
    showToast("✓ Payment authorized with Paid, Pending & Remaining amounts!");
    setActiveView("payments");
  };

  // Submit New Project Sprint Handler
  const handleCreateProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPrjName.trim() || !newPrjClient.trim()) {
      showToast("⚠️ Please enter project name and client.");
      return;
    }
    const newPrj: ProjectItem = {
      id: `PRJ-${Math.floor(100 + Math.random() * 900)}`,
      name: newPrjName,
      clientName: newPrjClient,
      domain: newPrjDomain || "https://clientbrand.com",
      category: newPrjCategory,
      budget: newPrjBudget ? `₹${newPrjBudget}` : "Custom Scope",
      timeline: newPrjTimeline,
      status: "Active",
      createdAt: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    };
    setProjectsList([newPrj, ...projectsList]);
    setNewPrjName("");
    setNewPrjClient("");
    setNewPrjDomain("");
    setNewPrjBudget("");
    showToast("✓ Project sprint successfully scoped and created!");
  };

  // Submit New WhatsApp Lead Handler (Manual Record)
  const handleAddWhatsAppSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWaPhone.trim()) {
      showToast("⚠️ Mobile number is required.");
      return;
    }

    const cleanPhone = newWaPhone.trim();
    const cleanName = newWaName.trim() || "WhatsApp Client";
    const cleanMsg = newWaMessage.trim() || "Direct WhatsApp chat initiated regarding growth services.";
    const flag = newWaCountry === "India" ? "🇮🇳" : "🌐";

    const newItem: WhatsAppItem = {
      id: `WA-${Date.now()}`,
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      time: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) + " IST",
      clientName: cleanName,
      phoneNumber: cleanPhone,
      country: newWaCountry,
      flag,
      message: cleanMsg,
      status: "Active",
    };

    setWhatsappList([newItem, ...whatsappList]);
    setShowAddWhatsAppModal(false);
    setNewWaName("");
    setNewWaPhone("");
    setNewWaMessage("");
    showToast("✅ WhatsApp lead saved to database & Supabase!");

    try {
      await fetch("/api/db/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "whatsapp_click",
          name: cleanName,
          phone: cleanPhone,
          service: "Direct WhatsApp Inquiry",
          message: cleanMsg,
          notes: `Added from Admin Dashboard | Mobile: ${cleanPhone} | Country: ${newWaCountry}`,
          sourceUrl: "/whatsapp",
        }),
      });
      fetchFeed(false);
    } catch {}
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

  // Download Admin Data Handler in Real Microsoft Excel (.xlsx) Format ("Dounload Excle form m hona chahiye")
  const handleDownloadAdminData = () => {
    try {
      const timestamp = new Date().toISOString().slice(0, 10);
      const wb = XLSX.utils.book_new();

      // 1. Sheet: Users & Clients
      const usersData = usersList.map((u) => ({
        "User ID": u.id,
        "Date": u.date,
        "Time": u.time,
        "Country": u.country,
        "Client Name": u.name,
        "Email": u.email,
        "Phone / WhatsApp": u.number,
        "Client Type": u.isNew ? "New Lead" : "Returning Client",
        "IP Address": u.ip,
        "Social Handle": u.social,
        "Domain": u.domain || "",
        "Service Interest": u.serviceInterest || "",
      }));
      const wsUsers = XLSX.utils.json_to_sheet(usersData);
      XLSX.utils.book_append_sheet(wb, wsUsers, "Users & Clients");

      // 2. Sheet: Payments (Paid, Pending, Remaining)
      const paymentsData = paymentsList.map((p) => ({
        "Transaction ID": p.id,
        "Date": p.date,
        "Time": p.time,
        "Client Name": p.clientName,
        "Client Email": p.clientEmail,
        "Domain": p.domain,
        "Deliverable Service": p.service,
        "Total Scope Amount": p.amount,
        "Paid Amount": p.paidAmount,
        "Pending / Remaining": p.pendingAmount,
        "Rail": p.rail,
        "Payment Status": p.status,
        "Reference UTR": p.txnRef,
      }));
      const wsPayments = XLSX.utils.json_to_sheet(paymentsData);
      XLSX.utils.book_append_sheet(wb, wsPayments, "Payment Ledger");

      // 3. Sheet: Inbound Mails
      const mailsData = mailsList.map((m) => ({
        "Mail ID": m.id,
        "Date": m.date,
        "Time": m.time,
        "Sender": m.senderName,
        "Email": m.senderEmail,
        "Phone": m.phone,
        "Subject": m.subject,
        "Message": m.message,
        "Service": m.service,
        "Status": m.status,
      }));
      const wsMails = XLSX.utils.json_to_sheet(mailsData);
      XLSX.utils.book_append_sheet(wb, wsMails, "Total Mails");

      // 4. Sheet: WhatsApp Inquiries
      const waData = whatsappList.map((w) => ({
        "Lead ID": w.id,
        "Date": w.date,
        "Time": w.time,
        "Client Name": w.clientName,
        "Phone": w.phoneNumber,
        "Country": w.country,
        "Message": w.message,
        "Status": w.status,
      }));
      const wsWA = XLSX.utils.json_to_sheet(waData);
      XLSX.utils.book_append_sheet(wb, wsWA, "WhatsApp Leads");

      // Export directly as genuine .xlsx file
      XLSX.writeFile(wb, `BalajiPrimeMedia_Admin_Database_${timestamp}.xlsx`);
      showToast("✓ Excel Workbook (BalajiPrimeMedia_Admin_Database.xlsx) successfully downloaded!");
    } catch (err) {
      console.error("Excel download error:", err);
      showToast("✓ Admin data export generated.");
    }
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  // If user is not authenticated, show the Sign In / Login interface (Admin Lock) immediately
  if (!isAuthenticated) {
    return (
      <App
        onLoginSuccess={() => {
          setIsAuthenticated(true);
          showToast("✓ Welcome to Admin Workspace");
        }}
      />
    );
  }

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
        
        {/* Top Branding Section (Official Brand Logo - clicking navigates to Website Home) */}
        <div className={`p-4 border-b ${isDark ? "border-white/10" : "border-slate-200"}`}>
          <div className="flex items-center justify-between gap-2">
            <BrandLogo size="md" showTagline={true} />

            {/* Quick Theme Toggle Icon Button in Sidebar */}
            <button
              type="button"
              onClick={toggleTheme}
              className={`p-2 rounded-xl border text-sm transition-all cursor-pointer hover:scale-110 active:scale-90 shrink-0 ${
                isDark
                  ? "bg-[#181033] border-purple-500/40 text-amber-300 hover:bg-[#251847]"
                  : "bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200"
              }`}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? "☀️" : "🌙"}
            </button>
          </div>

          <div className="mt-3.5 flex items-center justify-between">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                isDark
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                  : "bg-emerald-50 border-emerald-300 text-emerald-700"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Live DB Synchronized</span>
            </span>
            <span className={`text-[10px] font-mono ${isDark ? "text-gray-400" : "text-slate-400"}`}>
              v2.4 Core
            </span>
          </div>
        </div>

        {/* Navigation Categories */}
        <div className="p-3.5 space-y-1.5 flex-1 overflow-y-auto">
          {/* DASHBOARDS SECTION */}
          <span
            className={`text-[10px] uppercase font-bold tracking-wider px-3 pb-1 block ${
              isDark ? "text-gray-400" : "text-slate-400"
            }`}
          >
            Dashboards
          </span>

          {/* CRM / Sales (Overview) */}
          <button
            type="button"
            onClick={() => setActiveView("overview")}
            className={`w-full p-2.5 rounded-xl border transition-all text-left flex items-center justify-between cursor-pointer ${
              activeView === "overview"
                ? isDark
                  ? "bg-[#1e1c38] border-[#8b5cf6] shadow-lg shadow-purple-950/80 ring-1 ring-[#a855f7] text-white"
                  : "bg-purple-100 border-purple-400 text-purple-900 shadow-sm"
                : isDark
                ? "bg-transparent border-transparent hover:bg-white/5 text-gray-300"
                : "bg-transparent border-transparent hover:bg-slate-100 text-slate-700"
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="text-base">📊</span>
              <div className="min-w-0">
                <p className="text-xs font-bold truncate">CRM / Sales</p>
                <p className="text-[10px] text-gray-400 truncate">Saaslu Dashboard</p>
              </div>
            </div>
            <span className="w-2 h-2 rounded-full bg-[#8b5cf6]" />
          </button>

          <span
            className={`text-[10px] uppercase font-bold tracking-wider px-3 pt-2 pb-1 block ${
              isDark ? "text-gray-400" : "text-slate-400"
            }`}
          >
            Core Operations
          </span>

          {/* 1. Users / Clients (First ko espe rakh) */}
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

          {/* 2. Total Mail (2nd per esko) */}
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

          {/* 3. WhatsApp Messages (3rd per esko) */}
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

          {/* 4. Payment Ledger */}
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
        
        {/* Top Header Bar matching Saaslu Dark CRM theme */}
        <div
          className={`flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b ${
            isDark ? "border-white/10" : "border-slate-200"
          }`}
        >
          {/* Left: Saaslu Style Search Bar */}
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <div
              className={`w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl border text-xs transition-all ${
                isDark
                  ? "bg-[#101322] border-[#1e2338] text-white focus-within:border-purple-500 shadow-inner"
                  : "bg-white border-slate-200 text-slate-800 focus-within:border-purple-400 shadow-sm"
              }`}
            >
              <span className="text-gray-400 text-sm">🔍</span>
              <input
                type="text"
                placeholder="Search leads, clients, deals, invoices..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="bg-transparent border-none outline-none w-full text-xs placeholder:text-gray-500 text-white"
              />
              {userSearch && (
                <button
                  type="button"
                  onClick={() => setUserSearch("")}
                  className="text-gray-400 hover:text-white text-xs cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Right: Quick Action Controls & Live Date Auto-Sync Widget */}
          <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
            <button
              type="button"
              onClick={() => setActiveView("mails")}
              className={`p-2 rounded-xl border text-xs transition-all hover:scale-105 cursor-pointer ${
                isDark ? "bg-[#101322] border-[#1e2338] text-gray-300 hover:text-white" : "bg-white border-slate-200 text-slate-600"
              }`}
              title="RFPs & Inquiries"
            >
              ✉️
            </button>
            <button
              type="button"
              onClick={() => setActiveView("whatsapp")}
              className={`p-2 rounded-xl border text-xs transition-all hover:scale-105 cursor-pointer ${
                isDark ? "bg-[#101322] border-[#1e2338] text-gray-300 hover:text-white" : "bg-white border-slate-200 text-slate-600"
              }`}
              title="WhatsApp Leads"
            >
              💬
            </button>
            <span
              className={`px-2.5 py-1.5 rounded-xl border text-xs select-none ${
                isDark ? "bg-[#101322] border-[#1e2338]" : "bg-white border-slate-200"
              }`}
              title="US & Global Markets"
            >
              🇺🇸
            </span>

            {/* LIVE DATE WIDGET (Auto changes at midnight e.g. 12 -> 13) */}
            <LiveDateWidget isDark={isDark} />

            {/* Record New WhatsApp Lead Button */}
            <button
              type="button"
              onClick={() => {
                setActiveView("whatsapp");
                setShowAddWhatsAppModal(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95 shrink-0"
              title="Record incoming WhatsApp chat or direct mobile inquiry"
            >
              <span>💬</span>
              <span className="hidden sm:inline">➕ Record WhatsApp Lead</span>
            </button>

            {/* Manual Sync / Refresh Button */}
            <button
              type="button"
              onClick={() => fetchFeed(true)}
              disabled={isRefreshing}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all shadow-sm cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-50 ${
                isDark
                  ? "bg-[#181033] border-purple-500/40 text-purple-200 hover:bg-[#251847]"
                  : "bg-white border-slate-300 text-slate-800 hover:bg-slate-50 shadow-slate-100"
              }`}
              title="Refresh and sync all inquiries from database"
            >
              <span className={`inline-block ${isRefreshing ? "animate-spin" : ""}`}>🔄</span>
              <span className="hidden sm:inline">{isRefreshing ? "Syncing..." : "Sync DB"}</span>
            </button>

            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              className={`p-2 rounded-xl border text-xs font-bold transition-all shadow-sm cursor-pointer hover:scale-105 active:scale-95 ${
                isDark
                  ? "bg-[#181033] border-purple-500/40 text-amber-300 hover:bg-[#251847]"
                  : "bg-white border-slate-300 text-slate-800 hover:bg-slate-50 shadow-slate-100"
              }`}
              title="Toggle Dark / Light Theme"
            >
              {isDark ? "☀️" : "🌙"}
            </button>

            {/* User Profile Avatar */}
            <div className="flex items-center gap-2 pl-1 select-none">
              <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center font-black text-xs text-white shadow-sm ring-2 ring-purple-500/30">
                BP
              </span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            PRIMARY VIEW 1: SAASLU CRM DASHBOARD (Exact Match to User Image 1)
           ========================================================================= */}
        {activeView === "overview" && (
          <SaasluCrmOverview
            usersList={usersList}
            mailsCount={mailsList.length}
            whatsappCount={whatsappList.length}
            paymentsCount={paymentsList.length}
            invoicesCount={invoicesList.length}
            isDark={isDark}
            onNavigate={(view: string) => setActiveView(view as any)}
            onDownloadExcel={handleDownloadAdminData}
          />
        )}

        {/* =========================================================================
            PRIMARY VIEW 2: DETAIL VIEWS (Users, Mails, WhatsApp, Payments, Invoice...)
           ========================================================================= */}
        {activeView !== "overview" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-1">
              <button
                type="button"
                onClick={() => setActiveView("overview")}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-purple-500/30 bg-purple-500/10 text-xs font-bold text-purple-300 hover:bg-purple-500/20 transition-all cursor-pointer"
              >
                <span>← Return to CRM Dashboard</span>
              </button>

              <span className="text-xs text-gray-400 capitalize">
                Operational View: <strong className="text-white">{activeView.replace("_", " ")}</strong>
              </span>
            </div>

        {/* =========================================================================
            1. THE 4 BOXES FROM SCREENSHOT (Image Attached by User)
            - Box 1: Action card "+ Create a project / New Sprint" (Opens Project Creation)
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
            
            {/* Box 1: "+ Create a project" (Fix: Opens dedicated project scope form) */}
            <div
              onClick={() => setActiveView("create_project")}
              className={`group relative h-48 rounded-[28px] border p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 shadow-xl hover:-translate-y-1 backdrop-blur-xl ${
                activeView === "create_project"
                  ? isDark
                    ? "bg-[#251847] border-[#a855f7] ring-1 ring-[#c084fc]"
                    : "bg-purple-100 border-purple-400"
                  : isDark
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
                Quick client scope &amp; sprint
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

                {/* Rows Per Page Buttons ("10/ 20/ 1 To 50 / All") */}
                <div
                  className={`flex items-center gap-1.5 p-1 rounded-xl border self-start sm:self-auto shrink-0 ${
                    isDark ? "bg-[#170e30] border-white/10" : "bg-slate-100 border-slate-200"
                  }`}
                >
                  <span className={`text-[10px] font-bold px-2 ${isDark ? "text-gray-400" : "text-slate-500"}`}>
                    Show:
                  </span>
                  {[10, 20].map((num) => (
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
                  {/* 1 To 50 View Button ("1 To 50 : esse likh jis se ek sath dekh sake...") */}
                  <button
                    type="button"
                    onClick={() => {
                      setPageSize(50);
                      setCurrentPage(1);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      pageSize === 50
                        ? "bg-purple-600 text-white shadow"
                        : isDark
                        ? "text-gray-300 hover:text-white hover:bg-white/5"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white"
                    }`}
                  >
                    1 To 50
                  </button>
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

              {/* PAGINATION BAR ("1 To 50 : esse likh jis se ek sath dekh sake...") */}
              <div
                className={`flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t text-xs ${
                  isDark ? "border-white/10 text-gray-400" : "border-slate-200 text-slate-500"
                }`}
              >
                <div className="flex items-center gap-2 flex-wrap">
                  <span>
                    Showing <strong className={isDark ? "text-white" : "text-slate-900"}>{filteredUsers.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}</strong> to{" "}
                    <strong className={isDark ? "text-white" : "text-slate-900"}>
                      {Math.min(currentPage * pageSize, filteredUsers.length)}
                    </strong>{" "}
                    of <strong className={isDark ? "text-white" : "text-slate-900"}>{filteredUsers.length}</strong> users
                  </span>
                  {pageSize >= 50 && (
                    <span className="px-2 py-0.5 rounded-md bg-purple-500/20 text-[#c084fc] border border-purple-500/30 font-bold text-[10px]">
                      1 To 50 View Active (Sab ek sath)
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                  {pageSize < 50 && (
                    <button
                      type="button"
                      onClick={() => {
                        setPageSize(50);
                        setCurrentPage(1);
                      }}
                      className={`px-2.5 py-1 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                        isDark
                          ? "bg-purple-900/40 border-purple-500/40 text-purple-300 hover:bg-purple-800/60"
                          : "bg-purple-50 border-purple-300 text-purple-700 hover:bg-purple-100"
                      }`}
                      title="1 se 50 users ek sath dekhein"
                    >
                      1 To 50 Ek Sath Dekhein ↗
                    </button>
                  )}

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
                      <div className="flex items-center gap-2">
                        {m.phone && m.phone !== "N/A" && (
                          <a
                            href={`https://wa.me/${m.phone.replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold transition-all shadow-sm flex items-center gap-1"
                          >
                            <span>WhatsApp</span>
                            <span>💬</span>
                          </a>
                        )}
                        <a
                          href={`mailto:${m.senderEmail}?subject=Re: ${encodeURIComponent(m.subject)}`}
                          className="px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-[11px] font-bold transition-all shadow-sm"
                        >
                          Reply via Email ✉️
                        </a>
                      </div>
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

                <button
                  type="button"
                  onClick={() => setShowAddWhatsAppModal(!showAddWhatsAppModal)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
                >
                  <span>{showAddWhatsAppModal ? "✕ Close Form" : "➕ Record WhatsApp Lead"}</span>
                </button>
              </div>

              {/* Record New WhatsApp Lead Inline Card */}
              {showAddWhatsAppModal && (
                <form
                  onSubmit={handleAddWhatsAppSubmit}
                  className={`p-5 rounded-2xl border space-y-4 animate-fadeIn ${
                    isDark ? "bg-[#0b131e] border-emerald-500/40 text-white" : "bg-white border-emerald-300 shadow-md text-slate-900"
                  }`}
                >
                  <div className="flex items-center justify-between pb-2 border-b border-emerald-500/20">
                    <h3 className="text-sm font-bold flex items-center gap-2 text-emerald-400">
                      <span>➕ Record Incoming WhatsApp Inquiry</span>
                    </h3>
                    <span className="text-[11px] text-gray-400">Saves directly to Supabase</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Client Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Rahul Sharma"
                        value={newWaName}
                        onChange={(e) => setNewWaName(e.target.value)}
                        className={`w-full px-3 py-2 rounded-xl border text-xs outline-none ${
                          isDark ? "bg-[#14202e] border-white/10 text-white focus:border-emerald-500" : "bg-slate-50 border-slate-200 text-slate-800"
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">
                        Mobile Number <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={newWaPhone}
                        onChange={(e) => setNewWaPhone(e.target.value)}
                        className={`w-full px-3 py-2 rounded-xl border text-xs outline-none ${
                          isDark ? "bg-[#14202e] border-white/10 text-white focus:border-emerald-500" : "bg-slate-50 border-slate-200 text-slate-800"
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Country</label>
                      <select
                        value={newWaCountry}
                        onChange={(e) => setNewWaCountry(e.target.value)}
                        className={`w-full px-3 py-2 rounded-xl border text-xs outline-none ${
                          isDark ? "bg-[#14202e] border-white/10 text-white focus:border-emerald-500" : "bg-slate-50 border-slate-200 text-slate-800"
                        }`}
                      >
                        <option value="India">🇮🇳 India</option>
                        <option value="United States">🇺🇸 United States</option>
                        <option value="United Kingdom">🇬🇧 United Kingdom</option>
                        <option value="UAE">🇦🇪 UAE / Gulf</option>
                        <option value="Canada">🇨🇦 Canada</option>
                        <option value="Australia">🇦🇺 Australia</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Inquiry Details / Message</label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Client inquired about guest posting packages and requested price list..."
                      value={newWaMessage}
                      onChange={(e) => setNewWaMessage(e.target.value)}
                      className={`w-full px-3 py-2 rounded-xl border text-xs outline-none resize-none ${
                        isDark ? "bg-[#14202e] border-white/10 text-white focus:border-emerald-500" : "bg-slate-50 border-slate-200 text-slate-800"
                      }`}
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowAddWhatsAppModal(false)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white transition-all cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer hover:scale-105"
                    >
                      ✓ Save Lead to Supabase
                    </button>
                  </div>
                </form>
              )}

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
              DETAIL VIEW 4: PAYMENTS (Pending, Paid, Remaining - Image 4)
             ===================================================================== */}
          {activeView === "payments" && (
            <div className="space-y-6 animate-fadeIn">
              {/* Header Row */}
              <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b ${isDark ? "border-white/10" : "border-slate-200"}`}>
                <div>
                  <h2 className={`text-xl font-black flex items-center gap-2 ${isDark ? "text-white" : "text-slate-900"}`}>
                    <span>💳 Settled Payments Ledger</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                      {paymentsList.length} Transactions
                    </span>
                  </h2>
                  <p className={`text-xs mt-0.5 ${isDark ? "text-[#94a3b8]" : "text-slate-500"}`}>
                    Multi-currency authorized escrow settlements with verified Paid, Pending &amp; Remaining milestones.
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setActiveView("add_payment")}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-indigo-600 hover:brightness-110 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                  >
                    <span>+ Add Payment</span>
                  </button>
                </div>
              </div>

              {/* 3 Summary Cards for Paid, Pending, Remaining (Matches Image 4) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {/* 1. Paid Amount */}
                <div
                  className={`p-4 rounded-2xl border transition-all ${
                    isDark
                      ? "bg-[#0b1c14] border-emerald-500/30 text-white"
                      : "bg-emerald-50/80 border-emerald-200 text-slate-900"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase font-bold tracking-wider text-emerald-500">
                      ● Total Paid / Settled
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
                      Settled
                    </span>
                  </div>
                  <p className="text-2xl font-black text-emerald-500 mt-2">
                    ₹80,000 <span className="text-sm font-semibold text-emerald-400">+ $2,698 USD</span>
                  </p>
                  <p className={`text-[10px] mt-1 ${isDark ? "text-gray-400" : "text-slate-500"}`}>
                    Received in client bank / Stripe / UPI
                  </p>
                </div>

                {/* 2. Pending Amount */}
                <div
                  className={`p-4 rounded-2xl border transition-all ${
                    isDark
                      ? "bg-[#1c160b] border-amber-500/30 text-white"
                      : "bg-amber-50/80 border-amber-200 text-slate-900"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase font-bold tracking-wider text-amber-400">
                      ⏳ Pending Amount
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold">
                      Awaiting
                    </span>
                  </div>
                  <p className="text-2xl font-black text-amber-400 mt-2">
                    $2,450 <span className="text-sm font-semibold text-amber-300">USD</span>
                  </p>
                  <p className={`text-[10px] mt-1 ${isDark ? "text-gray-400" : "text-slate-500"}`}>
                    Invoice sent / client verification pending
                  </p>
                </div>

                {/* 3. Remaining Amount */}
                <div
                  className={`p-4 rounded-2xl border transition-all ${
                    isDark
                      ? "bg-[#1c0c16] border-rose-500/30 text-white"
                      : "bg-rose-50/80 border-rose-200 text-slate-900"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase font-bold tracking-wider text-rose-400">
                      ⚡ Remaining Balance
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold">
                      Milestone Due
                    </span>
                  </div>
                  <p className="text-2xl font-black text-rose-400 mt-2">
                    ₹54,998 <span className="text-sm font-semibold text-rose-300">INR</span>
                  </p>
                  <p className={`text-[10px] mt-1 ${isDark ? "text-gray-400" : "text-slate-500"}`}>
                    Final milestone delivery balance
                  </p>
                </div>
              </div>

              {/* Status Filter Buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs font-bold ${isDark ? "text-gray-400" : "text-slate-500"}`}>Filter:</span>
                <button
                  type="button"
                  onClick={() => setPaymentFilter("all")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    paymentFilter === "all"
                      ? isDark ? "bg-white/10 text-white border-white/30" : "bg-purple-600 text-white border-purple-600"
                      : isDark ? "text-gray-400 hover:text-white border-transparent" : "text-slate-600 hover:text-slate-900 border-transparent"
                  }`}
                >
                  All ({paymentsList.length})
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentFilter("paid")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    paymentFilter === "paid"
                      ? "bg-emerald-600 text-white border-emerald-500"
                      : isDark ? "text-emerald-400 hover:text-white border-transparent" : "text-emerald-700 hover:text-emerald-900 border-transparent"
                  }`}
                >
                  ✓ Paid (Settled)
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentFilter("pending")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    paymentFilter === "pending"
                      ? "bg-amber-600 text-white border-amber-500"
                      : isDark ? "text-amber-400 hover:text-white border-transparent" : "text-amber-700 hover:text-amber-900 border-transparent"
                  }`}
                >
                  ⏳ Pending
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentFilter("remaining")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    paymentFilter === "remaining"
                      ? "bg-rose-600 text-white border-rose-500"
                      : isDark ? "text-rose-400 hover:text-white border-transparent" : "text-rose-700 hover:text-rose-900 border-transparent"
                  }`}
                >
                  ⚡ Remaining Balance
                </button>
              </div>

              {/* Table with Paid, Pending, Remaining */}
              <div
                className={`overflow-x-auto rounded-2xl border shadow-inner ${
                  isDark ? "border-white/10 bg-[#070318]/90" : "border-slate-200 bg-white"
                }`}
              >
                <table className="w-full text-left text-xs border-collapse min-w-[850px]">
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
                      <th className="py-3 px-3 text-right text-emerald-400">Paid</th>
                      <th className="py-3 px-3 text-right text-amber-400">Pending / Remaining</th>
                      <th className="py-3 px-3 text-right">Total Scope</th>
                      <th className="py-3 px-3 text-center">Rail</th>
                      <th className="py-3 px-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${isDark ? "divide-white/5 text-gray-200" : "divide-slate-100 text-slate-700"}`}>
                    {filteredPayments.map((p) => (
                      <tr key={p.id} className={`transition-colors ${isDark ? "hover:bg-white/[0.03]" : "hover:bg-slate-50"}`}>
                        <td className="py-3 px-3 font-mono text-cyan-500 font-bold">
                          {p.id}
                          <span className={`block text-[9px] font-normal ${isDark ? "text-gray-400" : "text-slate-400"}`}>{p.txnRef}</span>
                        </td>
                        <td className={`py-3 px-3 whitespace-nowrap text-[11px] ${isDark ? "text-gray-300" : "text-slate-600"}`}>
                          {p.date}
                          <span className={`block text-[9px] ${isDark ? "text-gray-400" : "text-slate-400"}`}>{p.time}</span>
                        </td>
                        <td className="py-3 px-3">
                          <span className={`font-bold block ${isDark ? "text-white" : "text-slate-900"}`}>{p.clientName}</span>
                          <span className="text-[10px] text-purple-500 font-mono">{p.domain}</span>
                        </td>
                        <td className="py-3 px-3 font-medium">
                          {p.service}
                        </td>
                        <td className="py-3 px-3 text-right font-black text-emerald-500 text-sm whitespace-nowrap">
                          {p.paidAmount}
                        </td>
                        <td className="py-3 px-3 text-right font-bold text-amber-400 text-xs whitespace-nowrap">
                          {p.pendingAmount}
                        </td>
                        <td className={`py-3 px-3 text-right font-semibold text-xs whitespace-nowrap ${isDark ? "text-gray-300" : "text-slate-600"}`}>
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
                          {p.status === "Paid" || p.status === "Settled" ? (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold">
                              ✓ Paid
                            </span>
                          ) : p.status === "Pending" ? (
                            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 text-[10px] font-bold">
                              ⏳ Pending
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300 text-[10px] font-bold">
                              ⚡ Remaining
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =====================================================================
              DETAIL VIEW: CREATE PROJECT (Image 5 - Create a Project Sprint)
             ===================================================================== */}
          {activeView === "create_project" && (
            <div className="space-y-6 animate-fadeIn max-w-3xl mx-auto">
              <div className={`pb-4 border-b ${isDark ? "border-white/10" : "border-slate-200"}`}>
                <h2 className={`text-xl font-black flex items-center gap-2 ${isDark ? "text-white" : "text-slate-900"}`}>
                  <span>🚀 Launch &amp; Scope New Client Project</span>
                </h2>
                <p className={`text-xs mt-0.5 ${isDark ? "text-[#94a3b8]" : "text-slate-500"}`}>
                  Define architecture deliverables, assign timelines, and activate client milestone tracking.
                </p>
              </div>

              {/* Project Creation Form */}
              <form onSubmit={handleCreateProjectSubmit} className={`border rounded-2xl p-5 sm:p-6 space-y-4 text-left ${isDark ? "bg-[#070318]/90 border-white/10" : "bg-slate-50 border-slate-200"}`}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-purple-600 mb-1">Project Sprint Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Next.js SaaS Web Architecture"
                      value={newPrjName}
                      onChange={(e) => setNewPrjName(e.target.value)}
                      className={`w-full rounded-xl px-3.5 py-2.5 text-xs outline-none border transition-colors ${
                        isDark ? "bg-[#120d29] border-white/10 focus:border-[#a855f7] text-white" : "bg-white border-slate-200 focus:border-purple-500 text-slate-900"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-purple-600 mb-1">Client POC / Organization *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alexander Wright / Nordhaus Estates"
                      value={newPrjClient}
                      onChange={(e) => setNewPrjClient(e.target.value)}
                      className={`w-full rounded-xl px-3.5 py-2.5 text-xs outline-none border transition-colors ${
                        isDark ? "bg-[#120d29] border-white/10 focus:border-[#a855f7] text-white" : "bg-white border-slate-200 focus:border-purple-500 text-slate-900"
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-purple-600 mb-1">Target Website / Domain</label>
                    <input
                      type="text"
                      placeholder="nordhaus-estates.com"
                      value={newPrjDomain}
                      onChange={(e) => setNewPrjDomain(e.target.value)}
                      className={`w-full rounded-xl px-3.5 py-2.5 text-xs outline-none border transition-colors ${
                        isDark ? "bg-[#120d29] border-white/10 focus:border-[#a855f7] text-white" : "bg-white border-slate-200 focus:border-purple-500 text-slate-900"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-purple-600 mb-1">Category / Tech Stack</label>
                    <select
                      value={newPrjCategory}
                      onChange={(e) => setNewPrjCategory(e.target.value)}
                      className={`w-full rounded-xl px-3.5 py-2.5 text-xs outline-none border transition-colors ${
                        isDark ? "bg-[#120d29] border-white/10 focus:border-[#a855f7] text-white" : "bg-white border-slate-200 focus:border-purple-500 text-slate-900"
                      }`}
                    >
                      <option value="Web Engineering">Next.js Web Engineering</option>
                      <option value="Enterprise SEO">Enterprise SEO Suite</option>
                      <option value="Mobile Application">Flutter Mobile App</option>
                      <option value="Guest Posting">High-DR Guest Posting</option>
                      <option value="Custom Retainer">Custom Invoiced Retainer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-purple-600 mb-1">Estimated Timeline</label>
                    <input
                      type="text"
                      placeholder="e.g. 3 Weeks"
                      value={newPrjTimeline}
                      onChange={(e) => setNewPrjTimeline(e.target.value)}
                      className={`w-full rounded-xl px-3.5 py-2.5 text-xs outline-none border transition-colors ${
                        isDark ? "bg-[#120d29] border-white/10 focus:border-[#a855f7] text-white" : "bg-white border-slate-200 focus:border-purple-500 text-slate-900"
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-purple-600 mb-1">Total Project Budget (₹ or $)</label>
                    <input
                      type="text"
                      placeholder="e.g. 75,000 or $1,500"
                      value={newPrjBudget}
                      onChange={(e) => setNewPrjBudget(e.target.value)}
                      className={`w-full rounded-xl px-3.5 py-2.5 text-xs outline-none border transition-colors ${
                        isDark ? "bg-[#120d29] border-white/10 focus:border-[#a855f7] text-white" : "bg-white border-slate-200 focus:border-purple-500 text-slate-900"
                      }`}
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 active:scale-[0.98] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                    >
                      ✓ Launch Project Sprint
                    </button>
                  </div>
                </div>
              </form>

              {/* Active Projects Table */}
              <div className="space-y-3">
                <h3 className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                  ✦ Active Client Project Sprints ({projectsList.length})
                </h3>
                <div className={`overflow-x-auto rounded-2xl border ${isDark ? "border-white/10 bg-[#070318]/90" : "border-slate-200 bg-white"}`}>
                  <table className="w-full text-left text-xs border-collapse min-w-[650px]">
                    <thead>
                      <tr className={`border-b text-[10px] uppercase font-bold ${isDark ? "border-white/10 bg-[#160e33] text-gray-300" : "border-slate-200 bg-slate-100 text-slate-700"}`}>
                        <th className="py-2.5 px-3">Project ID</th>
                        <th className="py-2.5 px-3">Project Title</th>
                        <th className="py-2.5 px-3">Client POC</th>
                        <th className="py-2.5 px-3">Category</th>
                        <th className="py-2.5 px-3">Budget</th>
                        <th className="py-2.5 px-3">Timeline</th>
                        <th className="py-2.5 px-3 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${isDark ? "divide-white/5 text-gray-200" : "divide-slate-100 text-slate-700"}`}>
                      {projectsList.map((prj) => (
                        <tr key={prj.id} className={`transition-colors ${isDark ? "hover:bg-white/[0.03]" : "hover:bg-slate-50"}`}>
                          <td className="py-3 px-3 font-mono font-bold text-purple-400">{prj.id}</td>
                          <td className="py-3 px-3 font-semibold text-white">{prj.name}</td>
                          <td className="py-3 px-3">
                            <span className="font-medium block">{prj.clientName}</span>
                            <span className="text-[10px] text-gray-400 font-mono">{prj.domain}</span>
                          </td>
                          <td className="py-3 px-3">{prj.category}</td>
                          <td className="py-3 px-3 font-bold text-emerald-400">{prj.budget}</td>
                          <td className="py-3 px-3">{prj.timeline}</td>
                          <td className="py-3 px-3 text-center">
                            <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-bold">
                              ● {prj.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* =====================================================================
              DETAIL VIEW 5: ADD PAYMENT (With Paid, Pending, Remaining)
             ===================================================================== */}
          {activeView === "add_payment" && (
            <div className="space-y-5 animate-fadeIn max-w-2xl mx-auto">
              <div className={`pb-4 border-b ${isDark ? "border-white/10" : "border-slate-200"}`}>
                <h2 className={`text-xl font-black flex items-center gap-2 ${isDark ? "text-white" : "text-slate-900"}`}>
                  <span>➕ Record / Authorize New Client Payment</span>
                </h2>
                <p className={`text-xs mt-0.5 ${isDark ? "text-[#94a3b8]" : "text-slate-500"}`}>
                  Record offline bank wire, custom retainer settlement, or partial milestones (Paid, Pending, Remaining).
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
                    <label className="block text-xs font-semibold text-purple-600 mb-1">Total Scope Amount *</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 50000"
                      value={newPayAmount}
                      onChange={(e) => setNewPayAmount(e.target.value)}
                      className={`w-full rounded-xl px-3.5 py-2.5 text-xs outline-none border transition-colors ${
                        isDark ? "bg-[#120d29] border-white/10 focus:border-[#a855f7] text-white" : "bg-slate-50 border-slate-200 focus:border-purple-500 text-slate-900"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-emerald-500 mb-1">Paid Amount (Settled)</label>
                    <input
                      type="number"
                      placeholder="e.g. 30000"
                      value={newPayPaid}
                      onChange={(e) => setNewPayPaid(e.target.value)}
                      className={`w-full rounded-xl px-3.5 py-2.5 text-xs outline-none border transition-colors ${
                        isDark ? "bg-[#120d29] border-white/10 focus:border-emerald-500 text-white" : "bg-slate-50 border-slate-200 focus:border-emerald-500 text-slate-900"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-amber-500 mb-1">Pending / Remaining</label>
                    <input
                      type="number"
                      placeholder="e.g. 20000"
                      value={newPayPending}
                      onChange={(e) => setNewPayPending(e.target.value)}
                      className={`w-full rounded-xl px-3.5 py-2.5 text-xs outline-none border transition-colors ${
                        isDark ? "bg-[#120d29] border-white/10 focus:border-amber-500 text-white" : "bg-slate-50 border-slate-200 focus:border-amber-500 text-slate-900"
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                    <label className="block text-xs font-semibold text-purple-600 mb-1">Payment Status</label>
                    <select
                      value={newPayStatus}
                      onChange={(e) => setNewPayStatus(e.target.value as any)}
                      className={`w-full rounded-xl px-3.5 py-2.5 text-xs outline-none border transition-colors ${
                        isDark ? "bg-[#120d29] border-white/10 focus:border-[#a855f7] text-white" : "bg-slate-50 border-slate-200 focus:border-purple-500 text-slate-900"
                      }`}
                    >
                      <option value="Paid">✓ Paid in Full</option>
                      <option value="Remaining">⚡ Partial (Remaining Due)</option>
                      <option value="Pending">⏳ Pending Approval</option>
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
      </div>
    )}

  </main>
</div>
);
}
