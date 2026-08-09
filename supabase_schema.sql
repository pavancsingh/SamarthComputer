-- ============================================================
-- SAMARTH COMPUTERS KHANDALA - COMPLETE SUPABASE POSTGRESQL SCHEMA
-- Ready to run in Supabase SQL Editor (https://app.supabase.com)
-- ============================================================

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. INQUIRIES & LEADS TABLE
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name TEXT NOT NULL,
    mobile TEXT NOT NULL,
    course_id TEXT,
    service_id TEXT,
    issue_type TEXT,
    type TEXT DEFAULT 'course',
    batch_timing TEXT,
    status TEXT DEFAULT 'New Lead',
    details JSONB
);

-- 2. COURSES TABLE
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    subtitle_mr TEXT,
    subtitle_en TEXT,
    category TEXT DEFAULT 'govt',
    tag TEXT DEFAULT 'न्यू',
    duration_mr TEXT,
    duration_en TEXT,
    fee_mr TEXT,
    fee_en TEXT,
    certification_mr TEXT,
    certification_en TEXT,
    eligibility_mr TEXT,
    eligibility_en TEXT,
    overview_mr TEXT,
    overview_en TEXT,
    modules_mr JSONB DEFAULT '[]'::jsonb,
    modules_en JSONB DEFAULT '[]'::jsonb,
    careers_mr JSONB DEFAULT '[]'::jsonb,
    careers_en JSONB DEFAULT '[]'::jsonb,
    image_url TEXT,
    is_primary BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0
);

-- Ensure optional columns exist if table was previously created
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS is_primary BOOLEAN DEFAULT false;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;


-- 3. CSC SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.csc_services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    slug TEXT UNIQUE NOT NULL,
    title_mr TEXT NOT NULL,
    title_en TEXT NOT NULL,
    category TEXT DEFAULT 'identity',
    badge TEXT DEFAULT 'शासकीय सेवा',
    timeline_mr TEXT,
    timeline_en TEXT,
    deadline_mr TEXT,
    deadline_en TEXT,
    status TEXT DEFAULT 'Open',
    official_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    govt_fee_mr TEXT,
    govt_fee_en TEXT,
    overview_mr TEXT,
    overview_en TEXT,
    required_docs_mr JSONB DEFAULT '[]'::jsonb,
    required_docs_en JSONB DEFAULT '[]'::jsonb,
    steps_mr JSONB DEFAULT '[]'::jsonb,
    steps_en JSONB DEFAULT '[]'::jsonb,
    image_url TEXT
);

-- Ensure optional columns exist if table was previously created
ALTER TABLE public.csc_services ADD COLUMN IF NOT EXISTS deadline_mr TEXT;
ALTER TABLE public.csc_services ADD COLUMN IF NOT EXISTS deadline_en TEXT;
ALTER TABLE public.csc_services ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'Open';
ALTER TABLE public.csc_services ADD COLUMN IF NOT EXISTS official_url TEXT;
ALTER TABLE public.csc_services ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;
ALTER TABLE public.csc_services ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;


-- 4. GOVT SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.govt_services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    slug TEXT UNIQUE NOT NULL,
    title_mr TEXT NOT NULL,
    title_en TEXT NOT NULL,
    category TEXT DEFAULT 'revenue',
    badge TEXT DEFAULT 'शासकीय योजना',
    timeline_mr TEXT,
    timeline_en TEXT,
    govt_fee_mr TEXT,
    govt_fee_en TEXT,
    overview_mr TEXT,
    overview_en TEXT,
    required_docs_mr JSONB DEFAULT '[]'::jsonb,
    required_docs_en JSONB DEFAULT '[]'::jsonb,
    steps_mr JSONB DEFAULT '[]'::jsonb,
    steps_en JSONB DEFAULT '[]'::jsonb,
    image_url TEXT
);

-- 5. FACULTIES & STAFF TABLE
CREATE TABLE IF NOT EXISTS public.faculties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name TEXT NOT NULL,
    role_mr TEXT,
    role_en TEXT,
    exp_mr TEXT,
    exp_en TEXT,
    spec_mr TEXT,
    spec_en TEXT,
    badge TEXT DEFAULT 'Faculty',
    image_url TEXT
);

-- 6. SITE GALLERY TABLE
CREATE TABLE IF NOT EXISTS public.site_gallery (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    title_mr TEXT,
    title_en TEXT,
    desc_mr TEXT,
    desc_en TEXT,
    category TEXT DEFAULT 'Campus',
    image_url TEXT NOT NULL
);

-- 7. SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.site_settings (
    id TEXT PRIMARY KEY DEFAULT 'main_settings',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    logo_url TEXT,
    hero_bg_url TEXT,
    hero_title_mr TEXT,
    hero_title_en TEXT
);

-- 8. BATCH TIMETABLE TABLE
CREATE TABLE IF NOT EXISTS public.batches (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    category TEXT,
    time TEXT,
    course_en TEXT,
    course_mr TEXT,
    status_en TEXT,
    status_mr TEXT,
    seats_en TEXT,
    seats_mr TEXT
);

-- 9. NEWS & ANNOUNCEMENTS TABLE
CREATE TABLE IF NOT EXISTS public.news (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    title_en TEXT,
    title_mr TEXT,
    category_en TEXT,
    category_mr TEXT,
    date_str TEXT,
    desc_en TEXT,
    desc_mr TEXT
);

-- 10. STUDENT CERTIFICATES TABLE (for verification portal)
CREATE TABLE IF NOT EXISTS public.certificates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    reg_no TEXT UNIQUE NOT NULL,
    student_name_en TEXT NOT NULL,
    student_name_mr TEXT,
    course_name TEXT NOT NULL,
    issue_date TEXT,
    grade TEXT,
    center_code TEXT DEFAULT 'ALC 13210399',
    authority TEXT DEFAULT 'MKCL Authorized',
    certificate_url TEXT
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.csc_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.govt_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faculties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Allow Public Read Access
CREATE POLICY "Public Read Inquiries" ON public.inquiries FOR SELECT USING (true);
CREATE POLICY "Public Insert Inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public All Courses" ON public.courses FOR ALL USING (true);
CREATE POLICY "Public All CSC" ON public.csc_services FOR ALL USING (true);
CREATE POLICY "Public All Govt" ON public.govt_services FOR ALL USING (true);
CREATE POLICY "Public All Faculty" ON public.faculties FOR ALL USING (true);
CREATE POLICY "Public All Gallery" ON public.site_gallery FOR ALL USING (true);
CREATE POLICY "Public All Settings" ON public.site_settings FOR ALL USING (true);
CREATE POLICY "Public All Batches" ON public.batches FOR ALL USING (true);
CREATE POLICY "Public All News" ON public.news FOR ALL USING (true);
CREATE POLICY "Public Read Certificates" ON public.certificates FOR SELECT USING (true);
CREATE POLICY "Public Insert Certificates" ON public.certificates FOR INSERT WITH CHECK (true);

-- ============================================================
-- SUPABASE STORAGE BUCKET SETUP ('samarth-media')
-- ============================================================
INSERT INTO storage.buckets (id, name, public) 
VALUES ('samarth-media', 'samarth-media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Media Storage Access" ON storage.objects
FOR ALL USING (bucket_id = 'samarth-media');
