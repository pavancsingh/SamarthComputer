# Supabase Database Documentation & Schema Specification

## PostgreSQL Database Overview
The **Samarth Computers Khandala** application backend runs on **Supabase PostgreSQL**. The database comprises **10 verified tables**, secured with Row Level Security (RLS) policies, JSONB semi-structured payload fields, and foreign/logical UUID references.

---

## 🗄️ Database Tables Specification

### 1. `inquiries` (Leads Inbox Table)
Stores course admission inquiries, CSC service requests, and contact lead submissions.
- `id` (UUID, Primary Key, Default: `uuid_generate_v4()`)
- `created_at` (TIMESTAMP WITH TIME ZONE, Default: `NOW()`)
- `name` (TEXT, NOT NULL) — Lead applicant full name
- `mobile` (TEXT, NOT NULL) — Contact phone number
- `course_id` (TEXT, Optional) — Referenced course identifier
- `service_id` (TEXT, Optional) — Referenced CSC / Govt service identifier
- `issue_type` (TEXT, Optional) — Specific inquiry topic
- `type` (TEXT, Default: `'course_admission'`) — Inquiry classification (`'course_admission'`, `'csc_service'`, `'contact'`)
- `batch_timing` (TEXT, Optional) — Preferred student batch slot
- `status` (TEXT, Default: `'New Lead'`) — Lead progress state (`'New Lead'`, `'In Process'`, `'Completed'`)
- `details` (JSONB, Default: `'{}'::jsonb`) — Additional form field metadata

### 2. `courses` (Course Catalog Table)
Holds educational programs, fee structures, durations, and syllabus modules.
- `id` (UUID, Primary Key)
- `created_at` (TIMESTAMP WITH TIME ZONE)
- `slug` (TEXT, UNIQUE, NOT NULL) — URL slug (e.g. `'mscit'`, `'tally-prime'`)
- `title` (TEXT, NOT NULL) — Course title
- `subtitle_mr` / `subtitle_en` (TEXT) — Subtitles in Marathi and English
- `category` (TEXT, Default: `'govt'`) — Course category (`'govt'`, `'typing'`, `'accounting'`, `'design'`)
- `tag` (TEXT, Default: `'न्यू'`) — Badge tag text
- `duration_mr` / `duration_en` (TEXT) — Course duration (e.g. `'3 Months'`)
- `fee_mr` / `fee_en` (TEXT) — Course fee breakdown
- `certification_mr` / `certification_en` (TEXT) — Issuing authority
- `eligibility_mr` / `eligibility_en` (TEXT) — Minimum educational requirement
- `overview_mr` / `overview_en` (TEXT) — Extended course description
- `modules_mr` / `modules_en` (JSONB) — Syllabus module topic arrays
- `careers_mr` / `careers_en` (JSONB) — Career prospect title arrays
- `image_url` (TEXT) — Thumbnail image URL
- `is_primary` / `is_featured` / `is_active` (BOOLEAN) — Visibility flags
- `display_order` (INTEGER, Default: `0`) — Sorting priority

### 3. `csc_services` (Online CSC & Digital Services Table)
Contains Common Service Center offerings like Aadhaar, PAN Card, and Voter ID.
- `id` (UUID, Primary Key)
- `created_at` (TIMESTAMP WITH TIME ZONE)
- `slug` (TEXT, UNIQUE, NOT NULL)
- `title_mr` / `title_en` (TEXT, NOT NULL)
- `category` (TEXT) — Service grouping (`'identity'`, `'financial'`, `'revenue'`)
- `badge` (TEXT) — Badge tag
- `timeline_mr` / `timeline_en` (TEXT) — Expected processing duration
- `deadline_mr` / `deadline_en` (TEXT) — Application deadline notice
- `status` (TEXT, Default: `'Open'`)
- `official_url` (TEXT) — Government portal link
- `govt_fee_mr` / `govt_fee_en` (TEXT) — Processing fees
- `overview_mr` / `overview_en` (TEXT) — Service guide summary
- `required_docs_mr` / `required_docs_en` (JSONB) — Array of required documents
- `steps_mr` / `steps_en` (JSONB) — Application step instructions
- `image_url` (TEXT)
- `is_active` (BOOLEAN, Default: `true`)
- `display_order` (INTEGER, Default: `0`)

### 4. `govt_services` (Government Revenue Services Table)
Manages revenue services (7/12 Utara, Income Certificate, Domicile Certificate).
- `id` (UUID, Primary Key)
- `created_at` (TIMESTAMP WITH TIME ZONE)
- `slug` (TEXT, UNIQUE, NOT NULL)
- `title_mr` / `title_en` (TEXT, NOT NULL)
- `category` (TEXT)
- `badge` (TEXT)
- `timeline_mr` / `timeline_en` (TEXT)
- `govt_fee_mr` / `govt_fee_en` (TEXT)
- `overview_mr` / `overview_en` (TEXT)
- `required_docs_mr` / `required_docs_en` (JSONB)
- `steps_mr` / `steps_en` (JSONB)
- `image_url` (TEXT)
- `is_active` (BOOLEAN, Default: `true`)
- `display_order` (INTEGER, Default: `0`)

### 5. `faculties` (Faculty & Staff Table)
Stores instructor profiles and center heads.
- `id` (UUID, Primary Key)
- `name` (TEXT, NOT NULL) — Faculty member full name
- `role_mr` / `role_en` (TEXT) — Role / Designation
- `exp_mr` / `exp_en` (TEXT) — Teaching experience
- `spec_mr` / `spec_en` (TEXT) — Areas of specialization
- `badge` (TEXT) — Faculty badge (e.g. `'Center Head'`, `'Senior Faculty'`)
- `image_url` (TEXT) — Profile photo URL

### 6. `site_gallery` (Campus Photo Gallery Table)
Campus photographs and event highlights.
- `id` (UUID, Primary Key)
- `title_mr` / `title_en` (TEXT) — Photo title
- `desc_mr` / `desc_en` (TEXT) — Photo description
- `category` (TEXT, Default: `'Campus'`) — Photo category (`'Campus'`, `'Events'`, `'Labs'`)
- `image_url` (TEXT, NOT NULL) — Media image URL
- `is_active` (BOOLEAN, Default: `true`)
- `display_order` (INTEGER, Default: `0`)

### 7. `site_settings` (Center Information & Configuration Table)
Single-row table (`id = 'main_settings'`) storing site-wide content and configuration.
- `id` (TEXT, Primary Key, Default: `'main_settings'`)
- `logo_url` / `hero_bg_url` (TEXT) — Media URLs
- `hero_title_mr` / `hero_title_en` / `hero_subtitle_mr` / `hero_subtitle_en` / `hero_badge_mr` / `hero_badge_en` / `hero_cta_text_mr` / `hero_cta_text_en` / `hero_cta_dest` (TEXT) — Hero banner settings
- `contact_phone` / `contact_whatsapp` / `contact_email` / `contact_address_mr` / `contact_address_en` / `contact_hours_mr` / `contact_hours_en` / `contact_map_url` (TEXT) — Contact info
- `call_cta_phone` / `call_cta_text_mr` / `call_cta_text_en` (TEXT) — Direct call CTA button
- `about_heading_mr` / `about_heading_en` / `about_desc_mr` / `about_desc_en` / `about_image_url` / `about_mission_mr` / `about_mission_en` / `about_vision_mr` / `about_vision_en` (TEXT) — About page content
- `about_values` / `about_timeline` / `why_choose_us` (JSONB) — Structured data arrays
- `home_sections` (JSONB) — Section visibility & display order map
- `nav_settings` (JSONB) — Navigation menu items configuration
- `site_title_mr` / `site_title_en` / `alc_code` / `csc_id` / `seo_title` / `seo_description` / `seo_keywords` / `social_facebook` / `social_instagram` / `social_youtube` / `footer_tagline` / `copyright_text` (TEXT) — Secondary settings

### 8. `batches` (Batch Timetable Table)
Daily class schedules and seat availability.
- `id` (TEXT, Primary Key)
- `category` (TEXT) — Slot timing (`'morning'`, `'afternoon'`, `'evening'`)
- `time` (TEXT) — Time string (e.g. `'08:00 AM - 09:30 AM'`)
- `course_en` / `course_mr` (TEXT) — Course name
- `status_en` / `status_mr` (TEXT) — Admission status
- `seats_en` / `seats_mr` (TEXT) — Seats remaining counter

### 9. `news` (News & Announcements Table)
Center updates and upcoming examination alerts.
- `id` (TEXT, Primary Key)
- `title_en` / `title_mr` (TEXT) — Headline
- `category_en` / `category_mr` (TEXT) — Tag
- `date_str` (TEXT) — Publication date
- `desc_en` / `desc_mr` (TEXT) — News content

### 10. `certificates` (Student Verification Table)
Official student verification records.
- `id` (UUID, Primary Key)
- `reg_no` (TEXT, UNIQUE, NOT NULL) — Registration number (e.g. `'MKCL-2026-8841'`)
- `student_name_en` / `student_name_mr` (TEXT) — Student name
- `course_name` (TEXT, NOT NULL) — Completed course
- `issue_date` (TEXT) — Certificate issue date
- `grade` (TEXT) — Awarded grade (e.g. `'A+'`)
- `center_code` (TEXT, Default: `'ALC 13210399'`) — Verification center code
- `authority` (TEXT, Default: `'MKCL Authorized'`) — Certification body
- `certificate_url` (TEXT) — Digital certificate document URL

---

## 🔐 Security & RLS Policies Summary
- `ALTER TABLE <table_name> ENABLE ROW LEVEL SECURITY;` applied to all 10 tables.
- **Public Read Access**: `CREATE POLICY "Public Read" ON ... FOR SELECT USING (true);`
- **Public Lead Submissions**: `CREATE POLICY "Public Insert Inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);`
- **Storage Policy**: `samarth-media` bucket operates under `FOR ALL USING (bucket_id = 'samarth-media')`.
