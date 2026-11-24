-- ==================================================================================
-- BALAJI PRIME MEDIA / NOVA GROWTH - ADMIN DATA TABLE SCHEMA FOR SUPABASE
-- Run this directly in your Supabase Dashboard:
-- 1. Go to: https://supabase.com/dashboard/project/kcabtdbzqczvzbzkdyjd/sql
-- 2. Click "New query"
-- 3. Paste this script and click "RUN"
-- ==================================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==================================================================================
-- 1. ADMIN DATA TABLE (Public.admin_data)
-- Stores dynamic admin configuration, dashboard metrics, settings, custom database
-- metadata, publisher overrides, notifications, and key-value JSONB payloads.
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

-- Comments for database documentation
COMMENT ON TABLE public.admin_data IS 'Stores dynamic admin settings, dashboard metadata, and JSON configurations';
COMMENT ON COLUMN public.admin_data.key IS 'Unique lookup key for configuration or dataset';
COMMENT ON COLUMN public.admin_data.data IS 'Structured JSONB document containing the actual admin data';

-- ==================================================================================
-- 2. ADMIN USERS TABLE (Public.admin_users)
-- Stores authorized admin accounts, role permissions, and access history.
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

COMMENT ON TABLE public.admin_users IS 'Stores administrator accounts and role permissions';

-- ==================================================================================
-- 3. HIGH-PERFORMANCE INDEXES
-- ==================================================================================
CREATE INDEX IF NOT EXISTS idx_admin_data_key ON public.admin_data (key);
CREATE INDEX IF NOT EXISTS idx_admin_data_category ON public.admin_data (category);
CREATE INDEX IF NOT EXISTS idx_admin_data_status ON public.admin_data (status);
CREATE INDEX IF NOT EXISTS idx_admin_data_created ON public.admin_data ("createdAt" DESC);
CREATE INDEX IF NOT EXISTS idx_admin_data_jsonb ON public.admin_data USING GIN (data);

CREATE INDEX IF NOT EXISTS idx_admin_users_email ON public.admin_users (email);
CREATE INDEX IF NOT EXISTS idx_admin_users_role ON public.admin_users (role);

-- ==================================================================================
-- 4. AUTOMATIC TIMESTAMP UPDATE TRIGGER
-- ==================================================================================
CREATE OR REPLACE FUNCTION public.set_admin_data_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_admin_data_updated_at ON public.admin_data;
CREATE TRIGGER trigger_admin_data_updated_at
BEFORE UPDATE ON public.admin_data
FOR EACH ROW
EXECUTE FUNCTION public.set_admin_data_updated_at();

DROP TRIGGER IF EXISTS trigger_admin_users_updated_at ON public.admin_users;
CREATE TRIGGER trigger_admin_users_updated_at
BEFORE UPDATE ON public.admin_users
FOR EACH ROW
EXECUTE FUNCTION public.set_admin_data_updated_at();

-- ==================================================================================
-- 5. ROW LEVEL SECURITY (RLS) & ACCESS POLICIES
-- Ensures admin data can be read/written by dashboard API routes using anon & service keys
-- ==================================================================================
ALTER TABLE public.admin_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    -- admin_data policies
    DROP POLICY IF EXISTS "Allow anon all on admin_data" ON public.admin_data;
    CREATE POLICY "Allow anon all on admin_data" ON public.admin_data FOR ALL USING (true) WITH CHECK (true);

    -- admin_users policies
    DROP POLICY IF EXISTS "Allow anon all on admin_users" ON public.admin_users;
    CREATE POLICY "Allow anon all on admin_users" ON public.admin_users FOR ALL USING (true) WITH CHECK (true);
END $$;

-- Grant permissions to standard Supabase roles
GRANT ALL ON TABLE public.admin_data TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.admin_users TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;

-- ==================================================================================
-- 6. ENABLE REALTIME SYNC
-- Allows the admin dashboard to receive real-time websocket updates on data changes
-- ==================================================================================
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' AND tablename = 'admin_data'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.admin_data;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        -- Publication already added or not supported on this tier
        NULL;
END $$;

-- ==================================================================================
-- 7. INITIAL SEED DATA (Default Admin Settings & Dashboard State)
-- ==================================================================================
INSERT INTO public.admin_data (key, category, title, description, data, author, status)
VALUES
(
    'site_settings',
    'settings',
    'Global Agency Settings',
    'Core business information, branding, support contacts, and default regional currency',
    '{
        "agencyName": "Balaji Prime Media",
        "brandSubtitle": "High-Authority Digital Growth & Architecture",
        "primaryEmail": "rahul@balajiprimemedia.in",
        "supportPhone": "+91 80004 17058",
        "whatsappNumber": "+91 80004 17058",
        "defaultCurrency": "USD",
        "secondaryCurrency": "INR",
        "invoicingTaxRate": 18,
        "isMaintenanceMode": false
    }'::jsonb,
    'admin@balajiprimemedia.in',
    'active'
),
(
    'dashboard_overview_metrics',
    'analytics',
    'Executive Dashboard Cache',
    'Cached monthly revenue targets, pipeline health, and top performance metrics',
    '{
        "monthlyTargetUSD": 140000,
        "currentRevenueUSD": 128450,
        "activeClientRetention": "98.4%",
        "targetCompletionPercent": 91.75,
        "averageTatDays": 4.2,
        "inventoryTotalDomains": 40850
    }'::jsonb,
    'admin@balajiprimemedia.in',
    'active'
),
(
    'admin_notifications',
    'system',
    'Admin Alert System',
    'Active administrative broadcast banners and system alerts',
    '{
        "activeBanners": [
            {
                "id": "notif-001",
                "title": "Database Engine Synchronized",
                "message": "All database operations are synchronizing live across Supabase and Neon Cloud.",
                "level": "success",
                "timestamp": "2026-11-23T12:00:00Z"
            }
        ]
    }'::jsonb,
    'admin@balajiprimemedia.in',
    'active'
)
ON CONFLICT (key) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    data = EXCLUDED.data,
    "updatedAt" = NOW();

-- Seed initial superadmin accounts
INSERT INTO public.admin_users (email, name, role, permissions, status)
VALUES
('admin@balajiprimemedia.in', 'System Admin', 'superadmin', '["all"]'::jsonb, 'active'),
('rahul@balajiprimemedia.in', 'Rahul Swami', 'superadmin', '["all"]'::jsonb, 'active'),
('shrahul270@gmail.com', 'Rahul (Dev)', 'superadmin', '["all"]'::jsonb, 'active'),
('admin@novagrowth.agency', 'Nova Growth Admin', 'superadmin', '["all"]'::jsonb, 'active')
ON CONFLICT (email) DO UPDATE SET
    name = EXCLUDED.name,
    role = EXCLUDED.role,
    status = EXCLUDED.status,
    "updatedAt" = NOW();
