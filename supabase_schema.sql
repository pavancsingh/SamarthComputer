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
    type TEXT DEFAULT 'course_admission',
    batch_timing TEXT,
    status TEXT DEFAULT 'New Lead',
    details JSONB DEFAULT '{}'::jsonb
);

-- Ensure optional columns exist if inquiries table was previously created
ALTER TABLE public.inquiries ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'course_admission';
ALTER TABLE public.inquiries ADD COLUMN IF NOT EXISTS batch_timing TEXT;
ALTER TABLE public.inquiries ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'New Lead';
ALTER TABLE public.inquiries ADD COLUMN IF NOT EXISTS details JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.inquiries ADD COLUMN IF NOT EXISTS course_id TEXT;
ALTER TABLE public.inquiries ADD COLUMN IF NOT EXISTS service_id TEXT;
ALTER TABLE public.inquiries ADD COLUMN IF NOT EXISTS issue_type TEXT;


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
    practical_skills_mr JSONB DEFAULT '[]'::jsonb,
    practical_skills_en JSONB DEFAULT '[]'::jsonb,
    image_url TEXT,
    is_primary BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0
);

-- Ensure optional columns exist if table was previously created
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS is_primary BOOLEAN DEFAULT false;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS practical_skills_mr JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS practical_skills_en JSONB DEFAULT '[]'::jsonb;


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
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
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
ALTER TABLE public.csc_services ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
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
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0
);

-- Ensure optional columns exist
ALTER TABLE public.govt_services ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
ALTER TABLE public.govt_services ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

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
    hero_title_en TEXT,
    hero_subtitle_mr TEXT,
    hero_subtitle_en TEXT,
    hero_badge_mr TEXT,
    hero_badge_en TEXT,
    hero_cta_text_mr TEXT,
    hero_cta_text_en TEXT,
    hero_cta_dest TEXT,
    contact_phone TEXT,
    contact_whatsapp TEXT,
    contact_email TEXT,
    contact_address_mr TEXT,
    contact_address_en TEXT,
    contact_hours_mr TEXT,
    contact_hours_en TEXT,
    contact_map_url TEXT,
    call_cta_phone TEXT,
    call_cta_text_mr TEXT,
    call_cta_text_en TEXT,
    about_heading_mr TEXT,
    about_heading_en TEXT,
    about_desc_mr TEXT,
    about_desc_en TEXT,
    about_image_url TEXT,
    about_mission_mr TEXT,
    about_mission_en TEXT,
    about_vision_mr TEXT,
    about_vision_en TEXT,
    about_values JSONB DEFAULT '[]'::jsonb,
    about_timeline JSONB DEFAULT '[]'::jsonb,
    home_sections JSONB DEFAULT '{}'::jsonb,
    why_choose_us JSONB DEFAULT '[]'::jsonb,
    nav_settings JSONB DEFAULT '[]'::jsonb
);

-- Ensure columns exist if site_settings was previously created
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_subtitle_mr TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_subtitle_en TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_badge_mr TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_badge_en TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_cta_text_mr TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_cta_text_en TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_cta_dest TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS contact_phone TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS contact_whatsapp TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS contact_email TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS contact_address_mr TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS contact_address_en TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS contact_hours_mr TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS contact_hours_en TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS contact_map_url TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS call_cta_phone TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS call_cta_text_mr TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS call_cta_text_en TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS about_heading_mr TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS about_heading_en TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS about_desc_mr TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS about_desc_en TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS about_image_url TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS about_mission_mr TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS about_mission_en TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS about_vision_mr TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS about_vision_en TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS about_values JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS about_timeline JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS home_sections JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS why_choose_us JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS nav_settings JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS site_title_mr TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS site_title_en TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS alc_code TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS csc_id TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS seo_title TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS seo_description TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS seo_keywords TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS social_facebook TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS social_instagram TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS social_youtube TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS footer_tagline TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS copyright_text TEXT;

-- Ensure is_active column on courses, csc_services, govt_services, site_gallery
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
ALTER TABLE public.csc_services ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
ALTER TABLE public.govt_services ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
ALTER TABLE public.site_gallery ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
ALTER TABLE public.site_gallery ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

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

-- 11. ADMIN USERS TABLE
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    role TEXT DEFAULT 'admin',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- SECURITY DEFINER HELPER FUNCTION
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admin_users
    WHERE user_id = auth.uid()
    AND is_active = true
  );
$$;

-- ============================================================
-- STRICT ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================

-- 1. Enable RLS on all content and admin tables
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.csc_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.govt_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faculties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- 2. Public Read / Admin Write Policies on Content & Settings Tables
DROP POLICY IF EXISTS "Public Read Courses" ON public.courses;
DROP POLICY IF EXISTS "Admin Write Courses" ON public.courses;
CREATE POLICY "Public Read Courses" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Admin Write Courses" ON public.courses FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Public Read CSC Services" ON public.csc_services;
DROP POLICY IF EXISTS "Admin Write CSC Services" ON public.csc_services;
CREATE POLICY "Public Read CSC Services" ON public.csc_services FOR SELECT USING (true);
CREATE POLICY "Admin Write CSC Services" ON public.csc_services FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Public Read Govt Services" ON public.govt_services;
DROP POLICY IF EXISTS "Admin Write Govt Services" ON public.govt_services;
CREATE POLICY "Public Read Govt Services" ON public.govt_services FOR SELECT USING (true);
CREATE POLICY "Admin Write Govt Services" ON public.govt_services FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Public Read Faculties" ON public.faculties;
DROP POLICY IF EXISTS "Admin Write Faculties" ON public.faculties;
CREATE POLICY "Public Read Faculties" ON public.faculties FOR SELECT USING (true);
CREATE POLICY "Admin Write Faculties" ON public.faculties FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Public Read Site Gallery" ON public.site_gallery;
DROP POLICY IF EXISTS "Admin Write Site Gallery" ON public.site_gallery;
CREATE POLICY "Public Read Site Gallery" ON public.site_gallery FOR SELECT USING (true);
CREATE POLICY "Admin Write Site Gallery" ON public.site_gallery FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Public Read Site Settings" ON public.site_settings;
DROP POLICY IF EXISTS "Admin Write Site Settings" ON public.site_settings;
CREATE POLICY "Public Read Site Settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admin Write Site Settings" ON public.site_settings FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Public Read Batches" ON public.batches;
DROP POLICY IF EXISTS "Admin Write Batches" ON public.batches;
CREATE POLICY "Public Read Batches" ON public.batches FOR SELECT USING (true);
CREATE POLICY "Admin Write Batches" ON public.batches FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Public Read News" ON public.news;
DROP POLICY IF EXISTS "Admin Write News" ON public.news;
CREATE POLICY "Public Read News" ON public.news FOR SELECT USING (true);
CREATE POLICY "Admin Write News" ON public.news FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Public Read Certificates" ON public.certificates;
DROP POLICY IF EXISTS "Admin Write Certificates" ON public.certificates;
CREATE POLICY "Public Read Certificates" ON public.certificates FOR SELECT USING (true);
CREATE POLICY "Admin Write Certificates" ON public.certificates FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 3. Inquiries Table Policies (Public Insert, Admin Manage)
DROP POLICY IF EXISTS "Public Insert Inquiry" ON public.inquiries;
DROP POLICY IF EXISTS "Admin Select Inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Admin Update Inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Admin Delete Inquiries" ON public.inquiries;
CREATE POLICY "Public Insert Inquiry" ON public.inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin Select Inquiries" ON public.inquiries FOR SELECT USING (public.is_admin());
CREATE POLICY "Admin Update Inquiries" ON public.inquiries FOR UPDATE USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin Delete Inquiries" ON public.inquiries FOR DELETE USING (public.is_admin());

-- 4. Admin Users Table (Admin Access Only)
DROP POLICY IF EXISTS "Admin Manage Admin Users" ON public.admin_users;
CREATE POLICY "Admin Manage Admin Users" ON public.admin_users FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 5. Storage Bucket Policies ('samarth-media')
DROP POLICY IF EXISTS "Public Read Storage Access" ON storage.objects;
DROP POLICY IF EXISTS "Admin Insert Storage Access" ON storage.objects;
DROP POLICY IF EXISTS "Admin Delete Storage Access" ON storage.objects;
CREATE POLICY "Public Read Storage Access" ON storage.objects FOR SELECT USING (bucket_id = 'samarth-media');
CREATE POLICY "Admin Insert Storage Access" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'samarth-media' AND public.is_admin());
CREATE POLICY "Admin Delete Storage Access" ON storage.objects FOR DELETE USING (bucket_id = 'samarth-media' AND public.is_admin());


