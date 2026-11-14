import { NextResponse } from "next/server";
import { readDatabase } from "@/lib/db";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { fetchLeadsFromNeon, fetchPaymentsFromNeon, isNeonConfigured } from "@/lib/neon";

// Helper with strict timeout so slow external DBs never hang the admin panel
function withTimeout<T>(promise: Promise<T>, timeoutMs: number, fallback: T): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((resolve) => setTimeout(() => resolve(fallback), timeoutMs)),
  ]);
}

export async function GET() {
  try {
    const db = readDatabase();
    let leads = [...(db.leads || [])];
    let payments = [...(db.payments || [])];
    let interactions = [...(db.interactions || [])];

    // 1. Fetch from Neon Postgres Cloud Database (with 1.5s strict timeout)
    if (isNeonConfigured) {
      try {
        const [nLeads, nPayments] = await Promise.all([
          withTimeout(fetchLeadsFromNeon(), 1500, []),
          withTimeout(fetchPaymentsFromNeon(), 1500, []),
        ]);

        if (nLeads && nLeads.length > 0) {
          const leadIds = new Set(leads.map((l) => l.id));
          for (const item of nLeads) {
            if (!leadIds.has(item.id)) {
              leads.push(item as any);
              leadIds.add(item.id);
            }
          }
        }

        if (nPayments && nPayments.length > 0) {
          const payIds = new Set(payments.map((p) => p.id));
          for (const item of nPayments) {
            if (!payIds.has(item.id)) {
              payments.push(item as any);
              payIds.add(item.id);
            }
          }
        }
      } catch (neonErr) {
        console.warn("[Admin Feed] Neon fetch error:", neonErr);
      }
    }

    // 2. Fetch from Supabase (Persistent cloud database)
    if (isSupabaseConfigured && supabase) {
      try {
        const [sbLeads, sbPayments, sbInteractions] = await Promise.all([
          withTimeout(
            Promise.resolve(
              supabase.from("leads").select("*").order("createdAt", { ascending: false }).limit(250)
            ) as Promise<any>,
            3000,
            { data: null }
          ),
          withTimeout(
            Promise.resolve(
              supabase.from("payments").select("*").order("createdAt", { ascending: false }).limit(250)
            ) as Promise<any>,
            3000,
            { data: null }
          ),
          withTimeout(
            Promise.resolve(
              supabase.from("interactions").select("*").order("createdAt", { ascending: false }).limit(250)
            ) as Promise<any>,
            3000,
            { data: null }
          ),
        ]);

        if (Array.isArray(sbLeads?.data) && sbLeads.data.length > 0) {
          const leadIds = new Set(leads.map((l) => l.id));
          for (const item of sbLeads.data) {
            if (!leadIds.has(item.id)) {
              leads.push(item as any);
              leadIds.add(item.id);
            }
          }
        }

        if (Array.isArray(sbPayments?.data) && sbPayments.data.length > 0) {
          const payIds = new Set(payments.map((p) => p.id));
          for (const item of sbPayments.data) {
            if (!payIds.has(item.id)) {
              payments.push(item as any);
              payIds.add(item.id);
            }
          }
        }

        if (Array.isArray(sbInteractions?.data) && sbInteractions.data.length > 0) {
          const intIds = new Set(interactions.map((i) => i.id));
          for (const item of sbInteractions.data) {
            if (!intIds.has(item.id)) {
              interactions.push(item as any);
              intIds.add(item.id);
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
    interactions.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());

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
        authType: l.type || "contact_form",
      };
    });

    // Map all client inquiries to Admin MailItem format
    // Prioritizes true contact forms, quote requests, and consultation bookings
    const mails = leads.map((l, idx) => {
      const created = new Date(l.createdAt || Date.now());
      const date = created.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
      const time = created.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) + " IST";

      const isActualContact =
        l.type === "contact_form" ||
        l.type === "consultation_modal" ||
        l.type === "custom_work";

      const isWhatsApp = l.type === "whatsapp_click" || (l.notes && l.notes.toLowerCase().includes("whatsapp"));

      return {
        id: l.id ? `MAIL-${l.id}` : `MAIL-${String(idx + 1).padStart(3, "0")}`,
        date,
        time,
        senderName: l.name || (isWhatsApp ? "WhatsApp Client" : "Direct Client"),
        senderEmail: l.email || (isWhatsApp ? `WhatsApp: ${l.phone}` : "client@domain.com"),
        phone: l.phone || "N/A",
        subject: isWhatsApp
          ? `💬 WhatsApp Lead: ${l.service || "Growth Services"}`
          : isActualContact
          ? `Inquiry for ${l.service || "Growth Services"}`
          : `${l.service || "Customer Request"}`,
        message: l.message || (isWhatsApp ? `WhatsApp inquiry received for ${l.service || "Growth Services"}.` : "Submitted via Balaji Prime Media portal."),
        status: idx < 3 ? ("Unread" as const) : ("Pending" as const),
        service: l.service || "Growth Strategy",
      };
    });

    // Map WhatsApp interactions and WhatsApp leads into Dedicated WhatsApp list
    const whatsapp: any[] = [];
    const waPhoneSet = new Set<string>();

    for (const l of leads) {
      if (l.type === "whatsapp_click" || (l.notes && l.notes.toLowerCase().includes("whatsapp"))) {
        const created = new Date(l.createdAt || Date.now());
        const date = created.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
        const time = created.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) + " IST";
        const key = `${l.phone}_${date}`;
        if (!waPhoneSet.has(key)) {
          waPhoneSet.add(key);
          whatsapp.push({
            id: `WA-${l.id}`,
            date,
            time,
            clientName: l.name || "WhatsApp Client",
            phoneNumber: l.phone || "+91 80004 17058",
            country: l.country || "India",
            flag: l.countryFlag || "🇮🇳",
            message: l.message || "Direct WhatsApp inquiry initiated.",
            status: "Active" as const,
          });
        }
      }
    }

    for (const it of interactions) {
      const isWA =
        (it.title && it.title.toLowerCase().includes("whatsapp")) ||
        (it.action && it.action.toLowerCase().includes("whatsapp")) ||
        (it.details && it.details.toLowerCase().includes("whatsapp"));

      if (isWA) {
        const created = new Date(it.createdAt || Date.now());
        const date = created.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
        const time = created.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) + " IST";
        const phone = it.phone || it.clientIdentifier || "+91 80004 17058";
        const key = `${phone}_${date}`;
        if (!waPhoneSet.has(key)) {
          waPhoneSet.add(key);
          whatsapp.push({
            id: `WA-${it.id}`,
            date,
            time,
            clientName: it.name || "WhatsApp Client",
            phoneNumber: phone,
            country: it.country || "India",
            flag: it.countryFlag || "🇮🇳",
            message: it.details || it.title || "WhatsApp conversation opened",
            status: "Active" as const,
          });
        }
      }
    }

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
      whatsapp,
      payments: formattedPayments,
      totalLeads: leads.length,
      totalPayments: payments.length,
      totalInteractions: interactions.length,
    });
  } catch (err: any) {
    console.error("Admin feed error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
