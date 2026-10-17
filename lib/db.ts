import fs from "fs";
import path from "path";
import { supabase, isSupabaseConfigured } from "./supabase";

// Supabase background sync helpers
async function pushToSupabase(collection: string, record: any) {
  if (!isSupabaseConfigured || !supabase) return;
  try {
    const { error } = await supabase.from(collection).upsert(record);
    if (error) console.error(`[Supabase Error] Push to ${collection}:`, error.message);
  } catch (err) {
    console.error(`[Supabase Exception] ${collection}:`, err);
  }
}

async function updateInSupabase(collection: string, id: string, updates: Record<string, unknown>) {
  if (!isSupabaseConfigured || !supabase) return;
  try {
    const { error } = await supabase.from(collection).update(updates).eq("id", id);
    if (error) console.error(`[Supabase Error] Update in ${collection}:`, error.message);
  } catch (err) {
    console.error(`[Supabase Exception] ${collection}:`, err);
  }
}

async function deleteFromSupabase(collection: string, id: string) {
  if (!isSupabaseConfigured || !supabase) return;
  try {
    const { error } = await supabase.from(collection).delete().eq("id", id);
    if (error) console.error(`[Supabase Error] Delete from ${collection}:`, error.message);
  } catch (err) {
    console.error(`[Supabase Exception] ${collection}:`, err);
  }
}

async function logToSupabase(log: ActivityLog) {
  if (!isSupabaseConfigured || !supabase) return;
  try {
    const { error } = await supabase.from("activity_logs").insert(log);
    if (error) console.error("[Supabase Error] Activity log:", error.message);
  } catch (err) {
    console.error("[Supabase Exception] Activity log:", err);
  }
}

// Types for all database records
export type RecordType = 
  | "contact_form" 
  | "consultation_modal" 
  | "whatsapp_click" 
  | "video_call_click" 
  | "phone_call" 
  | "email_click" 
  | "seo_audit" 
  | "payment_checkout"
  | "custom_work";

export type RecordStatus = "new" | "contacted" | "in_progress" | "completed" | "closed";

export interface BaseRecord {
  id: string;
  collection: "leads" | "interactions" | "audits" | "payments";
  type: RecordType;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  deletedAt?: string | null;
  clientIp?: string;
  userAgent?: string;
  notes?: string;
}

export interface LeadRecord extends BaseRecord {
  collection: "leads";
  name: string;
  email: string;
  phone?: string;
  website?: string;
  timezone?: string;
  service?: string;
  budget?: string;
  message?: string;
  sourceUrl?: string;
  status: RecordStatus;
}

export interface InteractionRecord extends BaseRecord {
  collection: "interactions";
  action: "whatsapp" | "video_call" | "phone" | "email" | "other";
  title: string;
  name?: string;
  phone?: string;
  email?: string;
  details?: string;
  clientIdentifier?: string; // e.g. Phone number or email if known
  sourcePage?: string;
  targetUrl?: string;
  status: RecordStatus;
}


export interface AuditRecord extends BaseRecord {
  collection: "audits";
  domain: string;
  url: string;
  emailSubmitted?: string;
  scores: {
    seo: number;
    speed: number;
    security: number;
    ranking: number;
    rankingPosition: string;
    rankingTier: string;
  };
  metrics: {
    responseTimeMs?: number;
    wordCount?: number;
    isHttps?: boolean;
    issuesCount?: number;
  };
  status: RecordStatus;
}

export interface PaymentRecord extends BaseRecord {
  collection: "payments";
  transactionId: string;
  clientName: string;
  clientEmail: string;
  companyName?: string;
  planId?: string;
  planName?: string;
  mode: "retainer" | "invoice";
  invoiceNumber?: string;
  currency: string;
  amount: number | string;
  paymentMethod: "stripe" | "wire" | "wise" | "paypal" | string;
  paymentStatus: "paid" | "processing" | "pending" | "failed";
  status: RecordStatus;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  action: "create" | "update" | "soft_delete" | "restore" | "permanent_delete";
  collection: string;
  recordId: string;
  summary: string;
  metadata?: Record<string, unknown>;
}

export interface DatabaseSchema {
  version: string;
  lastUpdated: string;
  leads: LeadRecord[];
  interactions: InteractionRecord[];
  audits: AuditRecord[];
  payments: PaymentRecord[];
  activityLogs: ActivityLog[];
}

// Data Directory and File Paths
const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "nova_db.json");
const BACKUP_FILE = path.join(DATA_DIR, "nova_db.backup.json");

const initialDatabase: DatabaseSchema = {
  version: "1.0.0",
  lastUpdated: new Date().toISOString(),
  leads: [],
  interactions: [],
  audits: [],
  payments: [],
  activityLogs: [],
};

// Helper: Ensure Data Directory and File exist
function ensureDatabase(): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(initialDatabase, null, 2), "utf-8");
    }
  } catch (err) {
    console.error("Error initializing Nova Growth database:", err);
  }
}

// Helper: Read Database safely
export function readDatabase(): DatabaseSchema {
  ensureDatabase();
  try {
    const raw = fs.readFileSync(DB_FILE, "utf-8");
    const data = JSON.parse(raw) as DatabaseSchema;
    // Guarantee all arrays exist
    return {
      version: data.version || "1.0.0",
      lastUpdated: data.lastUpdated || new Date().toISOString(),
      leads: Array.isArray(data.leads) ? data.leads : [],
      interactions: Array.isArray(data.interactions) ? data.interactions : [],
      audits: Array.isArray(data.audits) ? data.audits : [],
      payments: Array.isArray(data.payments) ? data.payments : [],
      activityLogs: Array.isArray(data.activityLogs) ? data.activityLogs : [],
    };
  } catch (err) {
    console.error("Error reading database, restoring backup if available:", err);
    if (fs.existsSync(BACKUP_FILE)) {
      try {
        const backupRaw = fs.readFileSync(BACKUP_FILE, "utf-8");
        return JSON.parse(backupRaw) as DatabaseSchema;
      } catch (backupErr) {
        console.error("Backup also unreadable:", backupErr);
      }
    }
    return initialDatabase;
  }
}

// Helper: Write Database safely with atomic-like backup
export function writeDatabase(data: DatabaseSchema): boolean {
  ensureDatabase();
  try {
    data.lastUpdated = new Date().toISOString();
    const serialized = JSON.stringify(data, null, 2);
    // Write backup first if main file exists
    if (fs.existsSync(DB_FILE)) {
      fs.copyFileSync(DB_FILE, BACKUP_FILE);
    }
    fs.writeFileSync(DB_FILE, serialized, "utf-8");
    return true;
  } catch (err) {
    console.error("Error writing to database:", err);
    return false;
  }
}

// Helper: Generate unique ID
export function generateId(prefix: string = "rec"): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `${prefix}_${timestamp}_${randomStr}`;
}

// Helper: Log Activity
export function logActivity(
  db: DatabaseSchema,
  action: ActivityLog["action"],
  collection: string,
  recordId: string,
  summary: string,
  metadata?: Record<string, unknown>
): void {
  const log: ActivityLog = {
    id: generateId("log"),
    timestamp: new Date().toISOString(),
    action,
    collection,
    recordId,
    summary,
    metadata,
  };
  db.activityLogs.unshift(log); // newest first
  // Keep last 1000 logs
  if (db.activityLogs.length > 1000) {
    db.activityLogs = db.activityLogs.slice(0, 1000);
  }
  logToSupabase(log);
}

// ==========================================
// CRUD OPERATIONS
// ==========================================

// 1. Create Lead
export function createLead(
  input: Omit<LeadRecord, "id" | "collection" | "createdAt" | "updatedAt" | "isDeleted" | "status"> & {
    status?: RecordStatus;
  }
): LeadRecord {
  const db = readDatabase();
  const now = new Date().toISOString();
  const record: LeadRecord = {
    ...input,
    id: generateId("lead"),
    collection: "leads",
    status: input.status || "new",
    createdAt: now,
    updatedAt: now,
    isDeleted: false,
    deletedAt: null,
  };

  db.leads.unshift(record); // newest first
  logActivity(
    db, 
    "create", 
    "leads", 
    record.id, 
    `New inquiry received from ${record.name || record.email || "Unknown"}`
  );
  writeDatabase(db);
  pushToSupabase("leads", record);
  return record;
}

// 2. Create Interaction (Calling, WhatsApp, Meeting, Direct Click)
export function createInteraction(
  input: Omit<InteractionRecord, "id" | "collection" | "createdAt" | "updatedAt" | "isDeleted" | "status"> & {
    status?: RecordStatus;
  }
): InteractionRecord {
  const db = readDatabase();
  const now = new Date().toISOString();

  // Auto-detect phone from details or clientIdentifier
  let phone = input.phone || "";
  if (!phone && input.clientIdentifier && /[0-9]{7,}/.test(input.clientIdentifier.replace(/[^0-9]/g, ""))) {
    phone = input.clientIdentifier;
  }
  if (!phone && input.details && /[0-9]{7,}/.test(input.details.replace(/[^0-9]/g, ""))) {
    phone = input.details;
  }

  // Auto-detect email from details or clientIdentifier
  let email = input.email || "";
  if (!email && input.clientIdentifier && input.clientIdentifier.includes("@")) {
    email = input.clientIdentifier;
  }
  if (!email && input.details && input.details.includes("@")) {
    email = input.details;
  }

  const record: InteractionRecord = {
    ...input,
    phone: phone || input.phone,
    email: email || input.email,
    id: generateId("intr"),
    collection: "interactions",
    status: input.status || "new",
    createdAt: now,
    updatedAt: now,
    isDeleted: false,
    deletedAt: null,
  };

  db.interactions.unshift(record);

  logActivity(
    db, 
    "create", 
    "interactions", 
    record.id, 
    `Client interaction recorded: ${record.title} (${record.action})`
  );
  writeDatabase(db);
  pushToSupabase("interactions", record);
  return record;
}

// 3. Create or Update SEO Audit Record
export function createOrUpdateAudit(
  input: Omit<AuditRecord, "id" | "collection" | "createdAt" | "updatedAt" | "isDeleted" | "status"> & {
    id?: string;
    status?: RecordStatus;
  }
): AuditRecord {
  const db = readDatabase();
  const now = new Date().toISOString();

  // If ID given or domain already audited recently and update requested
  if (input.id) {
    const existingIndex = db.audits.findIndex((a) => a.id === input.id);
    if (existingIndex !== -1) {
      db.audits[existingIndex] = {
        ...db.audits[existingIndex],
        ...input,
        updatedAt: now,
      };
      logActivity(
        db,
        "update",
        "audits",
        input.id,
        `Audit record updated for ${input.domain}`
      );
      writeDatabase(db);
      pushToSupabase("audits", db.audits[existingIndex]);
      return db.audits[existingIndex];
    }
  }

  const record: AuditRecord = {
    ...input,
    id: generateId("audit"),
    collection: "audits",
    status: input.status || "new",
    createdAt: now,
    updatedAt: now,
    isDeleted: false,
    deletedAt: null,
  };

  db.audits.unshift(record);
  logActivity(
    db,
    "create",
    "audits",
    record.id,
    `SEO Audit performed for domain ${record.domain}`
  );
  writeDatabase(db);
  pushToSupabase("audits", record);
  return record;
}

// 4. Create Payment / Retainer Checkout Record
export function createPayment(
  input: Omit<PaymentRecord, "id" | "collection" | "createdAt" | "updatedAt" | "isDeleted" | "status"> & {
    status?: RecordStatus;
  }
): PaymentRecord {
  const db = readDatabase();
  const now = new Date().toISOString();
  const record: PaymentRecord = {
    ...input,
    id: generateId("pay"),
    collection: "payments",
    status: input.status || "new",
    createdAt: now,
    updatedAt: now,
    isDeleted: false,
    deletedAt: null,
  };

  db.payments.unshift(record);
  logActivity(
    db,
    "create",
    "payments",
    record.id,
    `Payment checkout recorded: ${record.currency} ${record.amount} by ${record.clientName || record.clientEmail}`
  );
  writeDatabase(db);
  pushToSupabase("payments", record);
  return record;
}

// 5. Update any record
export function updateRecord(
  collection: "leads" | "interactions" | "audits" | "payments",
  id: string,
  updates: Record<string, unknown>
): BaseRecord | null {
  const db = readDatabase();
  const now = new Date().toISOString();
  const list = db[collection] as unknown as BaseRecord[];
  const idx = list.findIndex((item) => item.id === id);

  if (idx === -1) return null;

  list[idx] = {
    ...list[idx],
    ...updates,
    updatedAt: now,
  };

  logActivity(
    db,
    "update",
    collection,
    id,
    `Updated record ${id} in ${collection}`,
    updates
  );
  writeDatabase(db);
  updateInSupabase(collection, id, updates);
  return list[idx];
}

// 6. Soft Delete (Moves to Trash, keeps all data safe!)
export function softDeleteRecord(
  collection: "leads" | "interactions" | "audits" | "payments",
  id: string
): boolean {
  const db = readDatabase();
  const list = db[collection] as unknown as BaseRecord[];
  const idx = list.findIndex((item) => item.id === id);

  if (idx === -1) return false;

  list[idx].isDeleted = true;
  list[idx].deletedAt = new Date().toISOString();
  list[idx].updatedAt = new Date().toISOString();

  logActivity(
    db,
    "soft_delete",
    collection,
    id,
    `Record ${id} moved to Trash (Soft Deleted)`
  );
  const ok = writeDatabase(db);
  updateInSupabase(collection, id, {
    isDeleted: true,
    deletedAt: list[idx].deletedAt,
    updatedAt: list[idx].updatedAt,
  });
  return ok;
}

// 7. Restore from Trash (Recovers deleted data!)
export function restoreRecord(
  collection: "leads" | "interactions" | "audits" | "payments",
  id: string
): boolean {
  const db = readDatabase();
  const list = db[collection] as unknown as BaseRecord[];
  const idx = list.findIndex((item) => item.id === id);

  if (idx === -1) return false;

  list[idx].isDeleted = false;
  list[idx].deletedAt = null;
  list[idx].updatedAt = new Date().toISOString();

  logActivity(
    db,
    "restore",
    collection,
    id,
    `Record ${id} restored from Trash back to Active`
  );
  const ok = writeDatabase(db);
  updateInSupabase(collection, id, {
    isDeleted: false,
    deletedAt: null,
    updatedAt: list[idx].updatedAt,
  });
  return ok;
}

// 8. Permanent Delete (Purge from database only if user explicitly wants)
export function permanentDeleteRecord(
  collection: "leads" | "interactions" | "audits" | "payments",
  id: string
): boolean {
  const db = readDatabase();
  const list = db[collection] as unknown as BaseRecord[];
  const idx = list.findIndex((item) => item.id === id);

  if (idx === -1) return false;

  const [removed] = list.splice(idx, 1);

  logActivity(
    db,
    "permanent_delete",
    collection,
    id,
    `Record ${id} permanently deleted from ${collection}`
  );
  const ok = writeDatabase(db);
  deleteFromSupabase(collection, id);
  return ok;
}

// Global throttle for Supabase sync
let lastSupabaseFetchTime = 0;

export async function ensureSupabaseSync(force: boolean = false): Promise<void> {
  if (!isSupabaseConfigured || !supabase) return;
  const now = Date.now();
  if (!force && now - lastSupabaseFetchTime < 10000) return;
  lastSupabaseFetchTime = now;

  try {
    const [leadsRes, intRes, audRes, payRes] = await Promise.all([
      supabase.from("leads").select("*"),
      supabase.from("interactions").select("*"),
      supabase.from("audits").select("*"),
      supabase.from("payments").select("*"),
    ]);

    const db = readDatabase();
    let changed = false;

    if (leadsRes.data && Array.isArray(leadsRes.data)) {
      const existingMap = new Map(db.leads.map((l) => [l.id, l]));
      for (const item of leadsRes.data as LeadRecord[]) {
        if (!existingMap.has(item.id)) {
          db.leads.push(item);
          changed = true;
        } else {
          const existing = existingMap.get(item.id)!;
          if (new Date(item.updatedAt || item.createdAt).getTime() > new Date(existing.updatedAt || existing.createdAt).getTime()) {
            Object.assign(existing, item);
            changed = true;
          }
        }
      }
    }

    if (intRes.data && Array.isArray(intRes.data)) {
      const existingMap = new Map(db.interactions.map((i) => [i.id, i]));
      for (const item of intRes.data as InteractionRecord[]) {
        if (!existingMap.has(item.id)) {
          db.interactions.push(item);
          changed = true;
        } else {
          const existing = existingMap.get(item.id)!;
          if (new Date(item.updatedAt || item.createdAt).getTime() > new Date(existing.updatedAt || existing.createdAt).getTime()) {
            Object.assign(existing, item);
            changed = true;
          }
        }
      }
    }

    if (audRes.data && Array.isArray(audRes.data)) {
      const existingMap = new Map(db.audits.map((a) => [a.id, a]));
      for (const item of audRes.data as AuditRecord[]) {
        if (!existingMap.has(item.id)) {
          db.audits.push(item);
          changed = true;
        } else {
          const existing = existingMap.get(item.id)!;
          if (new Date(item.updatedAt || item.createdAt).getTime() > new Date(existing.updatedAt || existing.createdAt).getTime()) {
            Object.assign(existing, item);
            changed = true;
          }
        }
      }
    }

    if (payRes.data && Array.isArray(payRes.data)) {
      const existingMap = new Map(db.payments.map((p) => [p.id, p]));
      for (const item of payRes.data as PaymentRecord[]) {
        if (!existingMap.has(item.id)) {
          db.payments.push(item);
          changed = true;
        } else {
          const existing = existingMap.get(item.id)!;
          if (new Date(item.updatedAt || item.createdAt).getTime() > new Date(existing.updatedAt || existing.createdAt).getTime()) {
            Object.assign(existing, item);
            changed = true;
          }
        }
      }
    }

    if (changed) {
      writeDatabase(db);
    }
  } catch (err) {
    console.warn("Supabase sync warning:", err);
  }
}

// 9. Query & Filter Records (From Newest to Oldest or Oldest to Newest)
export interface QueryOptions {
  collection?: "all" | "leads" | "interactions" | "audits" | "payments";
  showDeleted?: boolean; // false = active only, true = deleted only, "all" = both
  search?: string;
  status?: string;
  type?: string;
  sortOrder?: "desc" | "asc"; // desc = new to old, asc = old to new
  limit?: number;
  offset?: number;
}

export function queryRecords(options: QueryOptions = {}) {
  const db = readDatabase();
  const {
    collection = "all",
    showDeleted = false,
    search = "",
    status,
    type,
    sortOrder = "desc",
    limit = 100,
    offset = 0,
  } = options;

  let all: BaseRecord[] = [];

  if (collection === "all" || collection === "leads") all = all.concat(db.leads);
  if (collection === "all" || collection === "interactions") all = all.concat(db.interactions);
  if (collection === "all" || collection === "audits") all = all.concat(db.audits);
  if (collection === "all" || collection === "payments") all = all.concat(db.payments);

  // Filter deleted
  if (showDeleted === true) {
    all = all.filter((r) => r.isDeleted === true);
  } else if (showDeleted === false) {
    all = all.filter((r) => r.isDeleted !== true);
  }

  // Filter status
  if (status && status !== "all") {
    all = all.filter((r) => (r as LeadRecord).status === status);
  }

  // Filter type
  if (type && type !== "all") {
    all = all.filter((r) => r.type === type);
  }

  // Filter search
  if (search.trim()) {
    const q = search.toLowerCase().trim();
    all = all.filter((r) => {
      const serialized = JSON.stringify(r).toLowerCase();
      return serialized.includes(q);
    });
  }

  // Sort: Newest to Oldest (default) or Oldest to Newest
  all.sort((a, b) => {
    const timeA = new Date(a.createdAt).getTime();
    const timeB = new Date(b.createdAt).getTime();
    return sortOrder === "desc" ? timeB - timeA : timeA - timeB;
  });

  const total = all.length;
  const paginated = all.slice(offset, offset + limit);

  return {
    records: paginated,
    total,
    limit,
    offset,
    sortOrder,
  };
}

// 10. Database Statistics Summary
export function getDatabaseStats() {
  const db = readDatabase();

  const countActive = (items: BaseRecord[]) => items.filter((i) => !i.isDeleted).length;
  const countDeleted = (items: BaseRecord[]) => items.filter((i) => i.isDeleted).length;

  const todayStr = new Date().toISOString().slice(0, 10);
  const isToday = (dateIso: string) => dateIso.startsWith(todayStr);

  const allRecords: BaseRecord[] = [
    ...db.leads,
    ...db.interactions,
    ...db.audits,
    ...db.payments,
  ];

  const todayCount = allRecords.filter((r) => isToday(r.createdAt)).length;

  return {
    totalActive: countActive(allRecords),
    totalDeleted: countDeleted(allRecords),
    todayActivity: todayCount,
    lastUpdated: db.lastUpdated,
    breakdown: {
      leads: {
        active: countActive(db.leads),
        deleted: countDeleted(db.leads),
      },
      interactions: {
        active: countActive(db.interactions),
        deleted: countDeleted(db.interactions),
        whatsapp: db.interactions.filter((i) => !i.isDeleted && i.action === "whatsapp").length,
        calls: db.interactions.filter((i) => !i.isDeleted && (i.action === "phone" || i.action === "video_call")).length,
        emails: db.interactions.filter((i) => !i.isDeleted && i.action === "email").length,
      },
      audits: {
        active: countActive(db.audits),
        deleted: countDeleted(db.audits),
      },
      payments: {
        active: countActive(db.payments),
        deleted: countDeleted(db.payments),
      },
    },
    recentActivities: db.activityLogs.slice(0, 30),
  };
}
