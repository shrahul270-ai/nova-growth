export interface LeadItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  countryCode: string;
  countryFlag: string;
  website?: string;
  service: string;
  budget?: string;
  message: string;
  status: "new" | "contacted" | "converted" | "closed";
  sourceUrl?: string;
  clientIp?: string;
  createdAt: string;
  timeline?: string;
  notes?: string;
}

export interface ServiceDetailItem {
  id: string;
  name: string;
  shortTitle: string;
  headline: string;
  tagline: string;
  category: string;
  priceINR: string;
  priceUSD: string;
  billingPeriod: string;
  tat: string;
  deliverables: string[];
  features: { title: string; desc: string; icon: string }[];
  stats: { value: string; label: string; detail: string }[];
}

export interface PublisherSiteItem {
  id: string;
  domain: string;
  niche: string;
  language: string;
  country: string;
  countryFlag: string;
  dr: number;
  da: number;
  ahrefsTraffic: string;
  linkType: string;
  priceUSD: number;
  priceINR: number;
  tatDays: number;
  indexable: boolean;
  sponsoredTag: boolean;
  sampleUrl?: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  clientName: string;
  domain: string;
  category: string;
  budget: string;
  timeline: string;
  progress: number;
  status: "Active" | "Planning" | "In Review" | "Completed";
  createdAt: string;
}

export interface PaymentItem {
  id: string;
  date: string;
  time: string;
  clientName: string;
  clientEmail: string;
  domain: string;
  service: string;
  amount: string;
  paidAmount: string;
  pendingAmount: string;
  currency: "USD" | "INR";
  rail: "UPI" | "Stripe" | "Bank Wire" | "PayPal" | "Wise";
  status: "Paid" | "Pending" | "Remaining" | "Settled";
  txnRef: string;
}

export interface InvoiceItem {
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
  currency: "USD" | "INR";
  status: "Paid" | "Pending" | "Sent";
}

export interface AuditItem {
  id: string;
  domain: string;
  url?: string;
  emailSubmitted?: string;
  overallScore: number;
  performanceScore: number;
  seoScore: number;
  mobileScore: number;
  status: "Healthy" | "Attention" | "Critical";
  date: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  user: string;
  avatarText: string;
  type: "lead" | "payment" | "project" | "audit" | "whatsapp";
  statusBadge: string;
  statusColor: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  unread: boolean;
  type: "lead" | "payment" | "audit" | "system";
}

export interface WhatsAppItem {
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
