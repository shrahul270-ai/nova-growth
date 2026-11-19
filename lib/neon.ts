import { Pool, type PoolConfig } from "pg";
import dns from "dns";

const NEON_CONNECTION_STRING =
  process.env.DATABASE_URL ||
  process.env.NEON_DATABASE_URL ||
  "postgresql://neondb_owner:npg_yF6XDmWs2OYZ@ep-damp-wind-beoyl1fo-pooler.c-9.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

export const isNeonConfigured = Boolean(NEON_CONNECTION_STRING);

// Fallback DNS Resolver to bypass local ISP DNS blocks (resolves via Google/Cloudflare 8.8.8.8)
const fallbackResolver = new dns.Resolver();
fallbackResolver.setServers(["8.8.8.8", "1.1.1.1"]);

let poolInstance: Pool | null = null;
let tablesInitialized = false;

export async function getNeonPool(): Promise<Pool | null> {
  if (poolInstance) return poolInstance;
  if (!isNeonConfigured) return null;

  try {
    const url = new URL(NEON_CONNECTION_STRING);
    const host = url.hostname;
    const port = parseInt(url.port || "5432", 10);
    const user = decodeURIComponent(url.username);
    const password = decodeURIComponent(url.password);
    const database = url.pathname.replace(/^\//, "");

    // Resolve IP using Google DNS fallback to ensure 100% connection reliability
    let resolvedHost = host;
    try {
      const addresses = await new Promise<string[]>((resolve, reject) => {
        fallbackResolver.resolve4(host, (err, addrs) => {
          if (err) {
            // If hostname is CNAME like pooler, resolve c-9 host
            if (host.includes("-pooler.")) {
              const baseHost = host.split("-pooler.")[1] || "c-9.us-east-2.aws.neon.tech";
              fallbackResolver.resolve4(baseHost, (e2, a2) => (e2 ? reject(err) : resolve(a2)));
            } else {
              reject(err);
            }
          } else {
            resolve(addrs);
          }
        });
      });
      if (addresses && addresses.length > 0) {
        resolvedHost = addresses[0];
      }
    } catch (dnsErr) {
      console.warn("[Neon DNS Warning]: Using direct hostname", dnsErr);
    }

    const config: PoolConfig = {
      host: resolvedHost,
      port,
      user,
      password,
      database,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
      ssl: {
        rejectUnauthorized: false,
        servername: host,
      },
    };

    poolInstance = new Pool(config);
    return poolInstance;
  } catch (err) {
    console.error("[Neon Pool Init Error]:", err);
    return null;
  }
}

/**
 * Automatically creates all tables if they don't already exist in Neon Postgres
 */
export async function initNeonTables(): Promise<boolean> {
  if (tablesInitialized) return true;
  const pool = await getNeonPool();
  if (!pool) return false;

  try {
    const client = await pool.connect();
    try {
      // 1. Leads Table (stores contact forms, signups, logins, whatsapp leads)
      await client.query(`
        CREATE TABLE IF NOT EXISTS leads (
          id VARCHAR(255) PRIMARY KEY,
          collection VARCHAR(50) DEFAULT 'leads',
          type VARCHAR(100),
          name VARCHAR(255),
          email VARCHAR(255),
          phone VARCHAR(100),
          website VARCHAR(255),
          timezone VARCHAR(100),
          service VARCHAR(255),
          budget VARCHAR(100),
          message TEXT,
          status VARCHAR(50) DEFAULT 'new',
          "sourceUrl" TEXT,
          "clientIp" VARCHAR(100),
          "userAgent" TEXT,
          notes TEXT,
          "isDeleted" BOOLEAN DEFAULT FALSE,
          "createdAt" TIMESTAMPTZ DEFAULT NOW(),
          "updatedAt" TIMESTAMPTZ DEFAULT NOW()
        );
      `);

      // 2. Payments Table (stores orders, settlements, invoices)
      await client.query(`
        CREATE TABLE IF NOT EXISTS payments (
          id VARCHAR(255) PRIMARY KEY,
          collection VARCHAR(50) DEFAULT 'payments',
          "transactionId" VARCHAR(255),
          "clientName" VARCHAR(255),
          "clientEmail" VARCHAR(255),
          "companyName" VARCHAR(255),
          "planId" VARCHAR(100),
          "planName" VARCHAR(255),
          mode VARCHAR(100),
          "invoiceNumber" VARCHAR(255),
          currency VARCHAR(10) DEFAULT 'INR',
          amount VARCHAR(100),
          "paymentMethod" VARCHAR(100),
          "paymentStatus" VARCHAR(50) DEFAULT 'Paid',
          status VARCHAR(50) DEFAULT 'Paid',
          "clientIp" VARCHAR(100),
          "userAgent" TEXT,
          notes TEXT,
          "isDeleted" BOOLEAN DEFAULT FALSE,
          "createdAt" TIMESTAMPTZ DEFAULT NOW(),
          "updatedAt" TIMESTAMPTZ DEFAULT NOW()
        );
      `);

      // 3. Interactions Table (clicks, calls, chats)
      await client.query(`
        CREATE TABLE IF NOT EXISTS interactions (
          id VARCHAR(255) PRIMARY KEY,
          collection VARCHAR(50) DEFAULT 'interactions',
          action VARCHAR(100),
          title VARCHAR(255),
          name VARCHAR(255),
          phone VARCHAR(100),
          email VARCHAR(255),
          details TEXT,
          "clientIdentifier" VARCHAR(255),
          "sourcePage" TEXT,
          "targetUrl" TEXT,
          type VARCHAR(100),
          status VARCHAR(50),
          "clientIp" VARCHAR(100),
          "userAgent" TEXT,
          notes TEXT,
          "isDeleted" BOOLEAN DEFAULT FALSE,
          "createdAt" TIMESTAMPTZ DEFAULT NOW(),
          "updatedAt" TIMESTAMPTZ DEFAULT NOW()
        );
      `);

      // 4. Audits Table
      await client.query(`
        CREATE TABLE IF NOT EXISTS audits (
          id VARCHAR(255) PRIMARY KEY,
          collection VARCHAR(50) DEFAULT 'audits',
          type VARCHAR(100),
          domain VARCHAR(255),
          url TEXT,
          "emailSubmitted" VARCHAR(255),
          scores JSONB,
          metrics JSONB,
          status VARCHAR(50),
          "clientIp" VARCHAR(100),
          "userAgent" TEXT,
          notes TEXT,
          "isDeleted" BOOLEAN DEFAULT FALSE,
          "createdAt" TIMESTAMPTZ DEFAULT NOW(),
          "updatedAt" TIMESTAMPTZ DEFAULT NOW()
        );
      `);

      tablesInitialized = true;
      console.log("[Neon Postgres] ✓ All 4 database tables created and verified successfully!");
      return true;
    } finally {
      client.release();
    }
  } catch (err) {
    console.error("[Neon Postgres Init Error]:", err);
    return false;
  }
}

/**
 * Insert or update a lead in Neon Postgres
 */
export async function pushLeadToNeon(record: any): Promise<boolean> {
  const pool = await getNeonPool();
  if (!pool) return false;

  try {
    await initNeonTables();
    const query = `
      INSERT INTO leads (
        id, collection, type, name, email, phone, website, timezone,
        service, budget, message, status, "sourceUrl", "clientIp",
        "userAgent", notes, "isDeleted", "createdAt", "updatedAt"
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8,
        $9, $10, $11, $12, $13, $14,
        $15, $16, $17, $18, $19
      )
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        email = EXCLUDED.email,
        phone = EXCLUDED.phone,
        status = EXCLUDED.status,
        notes = EXCLUDED.notes,
        "updatedAt" = NOW();
    `;
    const values = [
      record.id || `LEAD-${Date.now()}`,
      record.collection || "leads",
      record.type || "contact_form",
      record.name || "Anonymous",
      record.email || "client@domain.com",
      record.phone || "",
      record.website || "",
      record.timezone || "IST",
      record.service || "Growth Strategy",
      record.budget || "",
      record.message || "",
      record.status || "new",
      record.sourceUrl || "",
      record.clientIp || "127.0.0.1",
      record.userAgent || "",
      record.notes || "",
      Boolean(record.isDeleted),
      record.createdAt ? new Date(record.createdAt).toISOString() : new Date().toISOString(),
      new Date().toISOString(),
    ];

    await pool.query(query, values);
    return true;
  } catch (err) {
    console.error("[Neon Postgres Push Error]:", err);
    return false;
  }
}

/**
 * Insert or update a payment in Neon Postgres
 */
export async function pushPaymentToNeon(record: any): Promise<boolean> {
  const pool = await getNeonPool();
  if (!pool) return false;

  try {
    await initNeonTables();
    const query = `
      INSERT INTO payments (
        id, collection, "transactionId", "clientName", "clientEmail",
        "companyName", "planId", "planName", mode, "invoiceNumber",
        currency, amount, "paymentMethod", "paymentStatus", status,
        "clientIp", "userAgent", notes, "isDeleted", "createdAt", "updatedAt"
      ) VALUES (
        $1, $2, $3, $4, $5,
        $6, $7, $8, $9, $10,
        $11, $12, $13, $14, $15,
        $16, $17, $18, $19, $20, $21
      )
      ON CONFLICT (id) DO UPDATE SET
        amount = EXCLUDED.amount,
        status = EXCLUDED.status,
        "paymentStatus" = EXCLUDED."paymentStatus",
        "updatedAt" = NOW();
    `;
    const values = [
      record.id || `PAY-${Date.now()}`,
      record.collection || "payments",
      record.transactionId || "",
      record.clientName || "",
      record.clientEmail || "",
      record.companyName || "",
      record.planId || "",
      record.planName || "",
      record.mode || "",
      record.invoiceNumber || "",
      record.currency || "INR",
      record.amount || "0",
      record.paymentMethod || "UPI",
      record.paymentStatus || "Paid",
      record.status || "Paid",
      record.clientIp || "127.0.0.1",
      record.userAgent || "",
      record.notes || "",
      Boolean(record.isDeleted),
      record.createdAt ? new Date(record.createdAt).toISOString() : new Date().toISOString(),
      new Date().toISOString(),
    ];

    await pool.query(query, values);
    return true;
  } catch (err) {
    console.error("[Neon Postgres Payment Error]:", err);
    return false;
  }
}

/**
 * Insert or update an interaction event in Neon Postgres
 */
export async function pushInteractionToNeon(record: any): Promise<boolean> {
  const pool = await getNeonPool();
  if (!pool) return false;

  try {
    await initNeonTables();
    const query = `
      INSERT INTO interactions (
        id, collection, action, title, name, phone, email, details,
        "clientIdentifier", "sourcePage", "targetUrl", type, status,
        "clientIp", "userAgent", notes, "isDeleted", "createdAt", "updatedAt"
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8,
        $9, $10, $11, $12, $13,
        $14, $15, $16, $17, $18, $19
      )
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        status = EXCLUDED.status,
        notes = EXCLUDED.notes,
        "updatedAt" = NOW();
    `;
    const values = [
      record.id || `INTR-${Date.now()}`,
      record.collection || "interactions",
      record.action || "login",
      record.title || "User Action",
      record.name || "",
      record.phone || "",
      record.email || "",
      record.details || "",
      record.clientIdentifier || "",
      record.sourcePage || "",
      record.targetUrl || "",
      record.type || "user_action",
      record.status || "completed",
      record.clientIp || "127.0.0.1",
      record.userAgent || "",
      record.notes || "",
      Boolean(record.isDeleted),
      record.createdAt ? new Date(record.createdAt).toISOString() : new Date().toISOString(),
      new Date().toISOString(),
    ];

    await pool.query(query, values);
    return true;
  } catch (err) {
    console.error("[Neon Postgres Interaction Error]:", err);
    return false;
  }
}

/**
 * Insert or update an audit in Neon Postgres
 */
export async function pushAuditToNeon(record: any): Promise<boolean> {
  const pool = await getNeonPool();
  if (!pool) return false;

  try {
    await initNeonTables();
    const query = `
      INSERT INTO audits (
        id, collection, type, domain, url, "emailSubmitted",
        scores, metrics, status, "clientIp", "userAgent",
        notes, "isDeleted", "createdAt", "updatedAt"
      ) VALUES (
        $1, $2, $3, $4, $5, $6,
        $7, $8, $9, $10, $11,
        $12, $13, $14, $15
      )
      ON CONFLICT (id) DO UPDATE SET
        status = EXCLUDED.status,
        scores = EXCLUDED.scores,
        metrics = EXCLUDED.metrics,
        "updatedAt" = NOW();
    `;
    const values = [
      record.id || `AUDIT-${Date.now()}`,
      record.collection || "audits",
      record.type || "seo_audit",
      record.domain || "",
      record.url || "",
      record.emailSubmitted || "",
      JSON.stringify(record.scores || {}),
      JSON.stringify(record.metrics || {}),
      record.status || "completed",
      record.clientIp || "127.0.0.1",
      record.userAgent || "",
      record.notes || "",
      Boolean(record.isDeleted),
      record.createdAt ? new Date(record.createdAt).toISOString() : new Date().toISOString(),
      new Date().toISOString(),
    ];

    await pool.query(query, values);
    return true;
  } catch (err) {
    console.error("[Neon Postgres Audit Error]:", err);
    return false;
  }
}

/**
 * Seed all local database records into Neon Postgres
 */
export async function seedAllLocalDataToNeon(): Promise<{ leads: number; payments: number; interactions: number; audits: number }> {
  const pool = await getNeonPool();
  if (!pool) return { leads: 0, payments: 0, interactions: 0, audits: 0 };

  let counts = { leads: 0, payments: 0, interactions: 0, audits: 0 };
  try {
    const fs = await import("fs");
    const path = await import("path");
    const filePath = path.join(process.cwd(), "data", "nova_db.json");
    if (!fs.existsSync(filePath)) return counts;

    const raw = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw);

    if (Array.isArray(data.leads)) {
      for (const lead of data.leads) {
        const ok = await pushLeadToNeon(lead);
        if (ok) counts.leads++;
      }
    }
    if (Array.isArray(data.payments)) {
      for (const p of data.payments) {
        const ok = await pushPaymentToNeon(p);
        if (ok) counts.payments++;
      }
    }
    if (Array.isArray(data.interactions)) {
      for (const i of data.interactions) {
        const ok = await pushInteractionToNeon(i);
        if (ok) counts.interactions++;
      }
    }
    if (Array.isArray(data.audits)) {
      for (const a of data.audits) {
        const ok = await pushAuditToNeon(a);
        if (ok) counts.audits++;
      }
    }
  } catch (e) {
    console.error("[Neon Seed Error]:", e);
  }
  return counts;
}

/**
 * Fetch all leads from Neon
 */
export async function fetchLeadsFromNeon(): Promise<any[]> {
  const pool = await getNeonPool();
  if (!pool) return [];

  try {
    await initNeonTables();
    const result = await pool.query(`SELECT * FROM leads ORDER BY "createdAt" DESC LIMIT 300`);
    return result.rows || [];
  } catch (err) {
    console.warn("[Neon Fetch Leads Error]:", err);
    return [];
  }
}

/**
 * Fetch all payments from Neon
 */
export async function fetchPaymentsFromNeon(): Promise<any[]> {
  const pool = await getNeonPool();
  if (!pool) return [];

  try {
    await initNeonTables();
    const result = await pool.query(`SELECT * FROM payments ORDER BY "createdAt" DESC LIMIT 300`);
    return result.rows || [];
  } catch (err) {
    console.warn("[Neon Fetch Payments Error]:", err);
    return [];
  }
}
