import { NextResponse } from "next/server";
import { readDatabase } from "@/lib/db";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export async function GET() {
  try {
    const db = readDatabase();
    let leads = [...(db.leads || [])];
    let payments = [...(db.payments || [])];

    // Also fetch from Supabase if configured
    if (isSupabaseConfigured && supabase) {
      try {
        const [sbLeads, sbPayments] = await Promise.all([
          supabase.from("leads").select("*").order("createdAt", { ascending: false }).limit(200),
          supabase.from("payments").select("*").order("createdAt", { ascending: false }).limit(200),
        ]);

        if (sbLeads.data && sbLeads.data.length > 0) {
          const leadIds = new Set(leads.map((l) => l.id));
          for (const item of sbLeads.data) {
            if (!leadIds.has(item.id)) {
              leads.push(item as any);
              leadIds.add(item.id);
            }
          }
        }

        if (sbPayments.data && sbPayments.data.length > 0) {
          const payIds = new Set(payments.map((p) => p.id));
          for (const item of sbPayments.data) {
            if (!payIds.has(item.id)) {
              payments.push(item as any);
              payIds.add(item.id);
            }
          }
        }
      } catch (sbErr) {
        console.warn("[Admin Feed] Supabase fetch error:", sbErr);
      }
    }

    // Sort newest first
    leads.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
    payments.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());

    // Map leads to Admin UserItem format
    const users = leads.map((l, idx) => {
      const created = new Date(l.createdAt || Date.now());
      const date = created.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
      const time = created.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) + " IST";
      
      // Parse country/city from notes or record
      let country = l.country || "India";
      let countryCode = l.countryCode || "IN";
      let flag = l.countryFlag || (countryCode === "IN" ? "🇮🇳" : "🌐");
      
      if (l.notes && l.notes.includes("Country: ")) {
        const match = l.notes.match(/Country:\s*([^|\]]+)/);
        if (match) country = match[1].trim();
      }

      return {
        id: l.id || `BPM-USR-${200 + idx}`,
        date,
        time,
        country,
        countryCode,
        flag,
        name: l.name || "Direct Client",
        email: l.email || "client@domain.com",
        number: l.phone || "+91 98000 00000",
        isNew: idx < 5,
        ip: l.clientIp || "127.0.0.1",
        social: l.email ? `@${l.email.split("@")[0]}` : "@client",
        socialType: "whatsapp" as const,
        domain: l.website ? l.website.replace(/^https?:\/\//, "") : "inquiry.com",
        serviceInterest: l.service || "Growth Strategy",
      };
    });

    // Map leads to Admin MailItem format
    const mails = leads.map((l, idx) => {
      const created = new Date(l.createdAt || Date.now());
      const date = created.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
      const time = created.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) + " IST";

      return {
        id: `MAIL-${String(idx + 1).padStart(3, "0")}`,
        date,
        time,
        senderName: l.name || "Direct Client",
        senderEmail: l.email || "client@domain.com",
        phone: l.phone || "N/A",
        subject: `Inquiry for ${l.service || "Growth Services"}`,
        message: l.message || "Submitted via Balaji Prime Media contact portal.",
        status: idx === 0 ? "Unread" as const : "Pending" as const,
        service: l.service || "Growth Strategy",
      };
    });

    // Map payments to Admin PaymentItem format
    const formattedPayments = payments.map((p, idx) => {
      const created = new Date(p.createdAt || Date.now());
      const date = created.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
      const time = created.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) + " IST";

      const currency = p.currency === "INR" ? "INR" : "USD";
      const symbol = currency === "INR" ? "₹" : "$";
      const totalAmount = typeof p.amount === "number" ? `${symbol}${p.amount.toLocaleString()}` : `${symbol}${p.amount}`;

      return {
        id: p.transactionId || `BPM-TXN-2026-${String(idx + 1).padStart(4, "0")}`,
        date,
        time,
        clientName: p.clientName || "BPM Client",
        clientEmail: p.clientEmail || "client@brand.com",
        domain: p.companyName || "clientbrand.com",
        service: p.planName || "Enterprise SEO Suite",
        amount: totalAmount,
        paidAmount: p.paymentStatus === "paid" ? totalAmount : `${symbol}0`,
        pendingAmount: p.paymentStatus === "paid" ? `${symbol}0` : totalAmount,
        currency: currency as "INR" | "USD",
        rail: (p.paymentMethod || "UPI") as any,
        status: p.paymentStatus === "paid" ? ("Paid" as const) : ("Pending" as const),
        txnRef: p.transactionId || `TXN-${p.id}`,
      };
    });

    return NextResponse.json({
      success: true,
      users,
      mails,
      payments: formattedPayments,
      totalLeads: leads.length,
      totalPayments: payments.length,
    });
  } catch (err: any) {
    console.error("Admin feed error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
