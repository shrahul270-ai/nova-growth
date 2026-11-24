-- ==================================================================================
-- BALAJI PRIME MEDIA / NOVA GROWTH - FULL SUPABASE ADMIN TABLES SCHEMA
-- Run this script directly in the Supabase SQL Editor:
-- Dashboard -> SQL Editor -> New query -> Paste and click "RUN"
-- ==================================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==================================================================================
-- 1. LEADS / INQUIRIES / CONTACT SUBMISSIONS TABLE
-- ==================================================================================
CREATE TABLE IF NOT EXISTS public.leads (
    id TEXT PRIMARY KEY,
    collection TEXT DEFAULT 'leads',
    type TEXT DEFAULT 'contact_form',
    name TEXT,
    email TEXT,
    phone TEXT,
    website TEXT,
    timezone TEXT DEFAULT 'UTC',
    service TEXT,
    budget TEXT,
    message TEXT,
    status TEXT DEFAULT 'new',
    "sourceUrl" TEXT,
    "clientIp" TEXT,
    "userAgent" TEXT,
    notes TEXT,
    country TEXT,
    "countryCode" TEXT,
    "countryFlag" TEXT,
    city TEXT,
    region TEXT,
    latitude NUMERIC,
    longitude NUMERIC,
    "mapsUrl" TEXT,
    "locationSummary" TEXT,
    "isDeleted" BOOLEAN DEFAULT false,
    "deletedAt" TIMESTAMPTZ,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- ==================================================================================
-- 2. PAYMENTS & TRANSACTIONS TABLE
-- ==================================================================================
CREATE TABLE IF NOT EXISTS public.payments (
    id TEXT PRIMARY KEY,
    collection TEXT DEFAULT 'payments',
    "transactionId" TEXT,
    "clientName" TEXT,
    "clientEmail" TEXT,
    "companyName" TEXT,
    "planId" TEXT,
    "planName" TEXT,
    mode TEXT,
    "invoiceNumber" TEXT,
    currency TEXT DEFAULT 'USD',
    amount NUMERIC,
    "paymentMethod" TEXT,
    "paymentStatus" TEXT DEFAULT 'pending',
    status TEXT DEFAULT 'pending',
    "clientIp" TEXT,
    "userAgent" TEXT,
    notes TEXT,
    "isDeleted" BOOLEAN DEFAULT false,
    "deletedAt" TIMESTAMPTZ,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- ==================================================================================
-- 3. PROJECTS & SPRINTS TABLE (Admin Project Scope & Tracking)
-- ==================================================================================
CREATE TABLE IF NOT EXISTS public.projects (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    domain TEXT,
    category TEXT DEFAULT 'Web Engineering',
    budget TEXT,
    timeline TEXT,
    status TEXT DEFAULT 'Active',
    "isDeleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- ==================================================================================
-- 4. INVOICES & BILLING GENERATOR TABLE
-- ==================================================================================
CREATE TABLE IF NOT EXISTS public.invoices (
    id TEXT PRIMARY KEY,
    "invoiceNo" TEXT UNIQUE NOT NULL,
    date TEXT NOT NULL,
    "dueDate" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientEmail" TEXT NOT NULL,
    "clientDomain" TEXT,
    "clientAddress" TEXT,
    "serviceName" TEXT NOT NULL,
    rate NUMERIC DEFAULT 0,
    qty NUMERIC DEFAULT 1,
    "taxPercent" NUMERIC DEFAULT 18,
    currency TEXT DEFAULT 'INR',
    status TEXT DEFAULT 'Paid',
    "isDeleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- ==================================================================================
-- 5. INTERACTIONS / WHATSAPP / CALLS TABLE
-- ==================================================================================
CREATE TABLE IF NOT EXISTS public.interactions (
    id TEXT PRIMARY KEY,
    collection TEXT DEFAULT 'interactions',
    action TEXT,
    title TEXT,
    name TEXT,
    phone TEXT,
    email TEXT,
    details TEXT,
    "clientIdentifier" TEXT,
    "sourcePage" TEXT,
    "targetUrl" TEXT,
    type TEXT,
    status TEXT DEFAULT 'new',
    country TEXT,
    "countryCode" TEXT,
    "countryFlag" TEXT,
    city TEXT,
    region TEXT,
    "clientIp" TEXT,
    "userAgent" TEXT,
    notes TEXT,
    "isDeleted" BOOLEAN DEFAULT false,
    "deletedAt" TIMESTAMPTZ,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- ==================================================================================
-- 6. AUDITS TABLE (SEO & Technical Site Audits)
-- ==================================================================================
CREATE TABLE IF NOT EXISTS public.audits (
    id TEXT PRIMARY KEY,
    collection TEXT DEFAULT 'audits',
    type TEXT DEFAULT 'seo_audit',
    domain TEXT NOT NULL,
    url TEXT,
    "emailSubmitted" TEXT,
    scores JSONB,
    metrics JSONB,
    status TEXT DEFAULT 'new',
    "clientIp" TEXT,
    "userAgent" TEXT,
    notes TEXT,
    "isDeleted" BOOLEAN DEFAULT false,
    "deletedAt" TIMESTAMPTZ,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- ==================================================================================
-- 7. ACTIVITY LOGS / AUDIT TRAILS TABLE
-- ==================================================================================
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id TEXT PRIMARY KEY,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    action TEXT,
    collection TEXT,
    "recordId" TEXT,
    summary TEXT,
    metadata JSONB
);

-- ==================================================================================
-- 8. ADMIN DATA TABLE (General Admin Config, Settings, Metrics, and Dynamic Payloads)
-- ==================================================================================
CREATE TABLE IF NOT EXISTS public.admin_data (
    id TEXT PRIMARY KEY DEFAULT ('data_' || replace(gen_random_uuid()::text, '-', '')),
    key TEXT UNIQUE NOT NULL,                          -- Unique identifier (e.g. 'site_settings', 'pricing_tiers')
    category TEXT DEFAULT 'general',                  -- Grouping: 'settings', 'finances', 'publishers', 'crm', 'system'
    title TEXT,                                       -- Human readable label (e.g. 'Global Site Configuration')
    description TEXT,                                 -- Description or notes about this admin data entry
    data JSONB NOT NULL DEFAULT '{}'::jsonb,          -- Flexible structured JSON payload
    author TEXT DEFAULT 'admin@balajiprimemedia.in',  -- Admin email or username who modified
    status TEXT DEFAULT 'active',                     -- 'active', 'draft', 'archived'
    metadata JSONB DEFAULT '{}'::jsonb,               -- Extra technical metadata (IP, userAgent, etc.)
    "isDeleted" BOOLEAN DEFAULT false,                -- Soft delete flag
    "deletedAt" TIMESTAMPTZ,                          -- Timestamp when soft-deleted
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),            -- Creation timestamp
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()             -- Last updated timestamp
);

-- ==================================================================================
-- 9. ADMIN USERS TABLE (Admin Accounts, Roles & Access Control)
-- ==================================================================================
CREATE TABLE IF NOT EXISTS public.admin_users (
    id TEXT PRIMARY KEY DEFAULT ('admin_' || replace(gen_random_uuid()::text, '-', '')),
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    role TEXT DEFAULT 'admin',                        -- 'superadmin', 'admin', 'editor', 'viewer'
    permissions JSONB DEFAULT '["all"]'::jsonb,       -- List of allowed admin modules
    status TEXT DEFAULT 'active',                     -- 'active', 'suspended', 'invited'
    "lastLoginAt" TIMESTAMPTZ,
    "clientIp" TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    "isDeleted" BOOLEAN DEFAULT false,
    "deletedAt" TIMESTAMPTZ,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for Admin Data & Admin Users
CREATE INDEX IF NOT EXISTS idx_admin_data_key ON public.admin_data (key);
CREATE INDEX IF NOT EXISTS idx_admin_data_category ON public.admin_data (category);
CREATE INDEX IF NOT EXISTS idx_admin_data_status ON public.admin_data (status);
CREATE INDEX IF NOT EXISTS idx_admin_data_jsonb ON public.admin_data USING GIN (data);
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON public.admin_users (email);

-- ==================================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Allows read and write for the website and admin dashboard via anon/service keys
-- ==================================================================================
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Allow public read & insert for anon role so contact forms & admin feed work seamlessly
DO $$
BEGIN
    DROP POLICY IF EXISTS "Allow anon all on leads" ON public.leads;
    CREATE POLICY "Allow anon all on leads" ON public.leads FOR ALL USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Allow anon all on payments" ON public.payments;
    CREATE POLICY "Allow anon all on payments" ON public.payments FOR ALL USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Allow anon all on projects" ON public.projects;
    CREATE POLICY "Allow anon all on projects" ON public.projects FOR ALL USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Allow anon all on invoices" ON public.invoices;
    CREATE POLICY "Allow anon all on invoices" ON public.invoices FOR ALL USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Allow anon all on interactions" ON public.interactions;
    CREATE POLICY "Allow anon all on interactions" ON public.interactions FOR ALL USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Allow anon all on audits" ON public.audits;
    CREATE POLICY "Allow anon all on audits" ON public.audits FOR ALL USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Allow anon all on activity_logs" ON public.activity_logs;
    CREATE POLICY "Allow anon all on activity_logs" ON public.activity_logs FOR ALL USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Allow anon all on admin_data" ON public.admin_data;
    CREATE POLICY "Allow anon all on admin_data" ON public.admin_data FOR ALL USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Allow anon all on admin_users" ON public.admin_users;
    CREATE POLICY "Allow anon all on admin_users" ON public.admin_users FOR ALL USING (true) WITH CHECK (true);
END $$;

-- Grant Permissions to anon, authenticated, and service_role
GRANT ALL ON TABLE public.leads TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.payments TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.projects TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.invoices TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.interactions TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.audits TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.activity_logs TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.admin_data TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.admin_users TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;

-- Enable Realtime broadcasting on all critical tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.leads;
ALTER PUBLICATION supabase_realtime ADD TABLE public.payments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.interactions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.admin_data;
