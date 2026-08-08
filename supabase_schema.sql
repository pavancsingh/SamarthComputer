-- ===================================================
-- SAMARTH COMPUTERS, KHANDALA - FULL DATABASE SCHEMA & SEED DATA
-- ===================================================

-- 1. Courses Table
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
  careers_mr TEXT[] DEFAULT '{}',
  careers_en TEXT[] DEFAULT '{}',
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. CSC Services Table
CREATE TABLE IF NOT EXISTS public.csc_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title_mr TEXT NOT NULL,
  title_en TEXT NOT NULL,
  category TEXT DEFAULT 'identity',
  badge TEXT DEFAULT 'शासकीय सेवा',
  timeline_mr TEXT,
  timeline_en TEXT,
  govt_fee_mr TEXT,
  govt_fee_en TEXT,
  overview_mr TEXT,
  overview_en TEXT,
  required_docs_mr TEXT[] DEFAULT '{}',
  required_docs_en TEXT[] DEFAULT '{}',
  steps_mr TEXT[] DEFAULT '{}',
  steps_en TEXT[] DEFAULT '{}',
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Government Portal Services Table
CREATE TABLE IF NOT EXISTS public.govt_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title_mr TEXT NOT NULL,
  title_en TEXT NOT NULL,
  category TEXT DEFAULT 'revenue',
  badge TEXT DEFAULT 'तहसीलदार प्रमाणपत्र',
  timeline_mr TEXT,
  timeline_en TEXT,
  govt_fee_mr TEXT,
  govt_fee_en TEXT,
  overview_mr TEXT,
  overview_en TEXT,
  requirements_mr TEXT[] DEFAULT '{}',
  requirements_en TEXT[] DEFAULT '{}',
  steps_mr TEXT[] DEFAULT '{}',
  steps_en TEXT[] DEFAULT '{}',
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Inquiries & Admissions Table (Leads)
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT DEFAULT 'course_admission', -- 'course_admission' | 'csc_service' | 'govt_service' | 'repair_request'
  name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  course_id TEXT,
  service_id TEXT,
  batch_timing TEXT,
  issue_type TEXT,
  status TEXT DEFAULT 'Pending', -- 'Pending' | 'In Process' | 'Completed'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Refurbished Laptops Table
CREATE TABLE IF NOT EXISTS public.laptops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  model TEXT NOT NULL,
  specs TEXT NOT NULL,
  price TEXT NOT NULL,
  condition TEXT DEFAULT 'Grade A Certified',
  warranty TEXT DEFAULT '6 Months Center Warranty',
  image TEXT DEFAULT 'laptop-dell',
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Hardware Repair Services Table
CREATE TABLE IF NOT EXISTS public.repair_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title_mr TEXT NOT NULL,
  title_en TEXT NOT NULL,
  category TEXT DEFAULT 'repair',
  est_time_mr TEXT,
  est_time_en TEXT,
  est_cost_mr TEXT,
  est_cost_en TEXT,
  warranty TEXT DEFAULT '30 Days Service Warranty',
  overview_mr TEXT,
  overview_en TEXT,
  highlights_mr TEXT[] DEFAULT '{}',
  highlights_en TEXT[] DEFAULT '{}',
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Verified Student Certificates Table
CREATE TABLE IF NOT EXISTS public.certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reg_no TEXT UNIQUE NOT NULL,
  student_name_mr TEXT NOT NULL,
  student_name_en TEXT NOT NULL,
  course_name TEXT NOT NULL,
  issue_date TEXT NOT NULL,
  marks TEXT NOT NULL,
  grade TEXT NOT NULL,
  center_code TEXT DEFAULT 'Center Code #MKCL-412802',
  status TEXT DEFAULT 'VERIFIED_GENUINE',
  authority TEXT DEFAULT 'Maharashtra Knowledge Corporation Limited (MKCL)',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Downloadable Forms Table
CREATE TABLE IF NOT EXISTS public.downloadable_forms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_mr TEXT NOT NULL,
  name_en TEXT NOT NULL,
  size TEXT DEFAULT '250 KB',
  type TEXT DEFAULT 'PDF',
  file_url TEXT DEFAULT '#brochure',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. News & Announcements Table
CREATE TABLE IF NOT EXISTS public.news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_mr TEXT NOT NULL,
  title_en TEXT NOT NULL,
  category_mr TEXT DEFAULT 'प्रवेश अपडेट',
  category_en TEXT DEFAULT 'Admissions',
  date_str TEXT DEFAULT '२०२६',
  desc_mr TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Site Gallery & About Images Table
CREATE TABLE IF NOT EXISTS public.site_gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_mr TEXT NOT NULL,
  title_en TEXT NOT NULL,
  desc_mr TEXT,
  desc_en TEXT,
  category TEXT DEFAULT 'Campus',
  image_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===================================================
-- ROW LEVEL SECURITY (RLS) POLICIES & STORAGE BUCKET
-- ===================================================
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.csc_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.govt_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.laptops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.repair_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.downloadable_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_gallery ENABLE ROW LEVEL SECURITY;

-- Storage Bucket Setup for Image Uploads
INSERT INTO storage.buckets (id, name, public) 
VALUES ('samarth-media', 'samarth-media', true)
ON CONFLICT (id) DO NOTHING;

-- Public Storage Access Policies
CREATE POLICY "Public Storage Read Access" 
ON storage.objects FOR SELECT USING (bucket_id = 'samarth-media');

CREATE POLICY "Authenticated Upload Storage Access" 
ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'samarth-media');


-- Drop existing policies if re-running
DROP POLICY IF EXISTS "Public Read Courses" ON public.courses;
DROP POLICY IF EXISTS "Public Read CSC" ON public.csc_services;
DROP POLICY IF EXISTS "Public Read Govt" ON public.govt_services;
DROP POLICY IF EXISTS "Public Read Laptops" ON public.laptops;
DROP POLICY IF EXISTS "Public Read Repairs" ON public.repair_services;
DROP POLICY IF EXISTS "Public Read Certificates" ON public.certificates;
DROP POLICY IF EXISTS "Public Read Forms" ON public.downloadable_forms;
DROP POLICY IF EXISTS "Public Read News" ON public.news;
DROP POLICY IF EXISTS "Public Insert Inquiries" ON public.inquiries;

-- Public Read Access Policies
CREATE POLICY "Public Read Courses" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Public Read CSC" ON public.csc_services FOR SELECT USING (true);
CREATE POLICY "Public Read Govt" ON public.govt_services FOR SELECT USING (true);
CREATE POLICY "Public Read Laptops" ON public.laptops FOR SELECT USING (true);
CREATE POLICY "Public Read Repairs" ON public.repair_services FOR SELECT USING (true);
CREATE POLICY "Public Read Certificates" ON public.certificates FOR SELECT USING (true);
CREATE POLICY "Public Read Forms" ON public.downloadable_forms FOR SELECT USING (true);
CREATE POLICY "Public Read News" ON public.news FOR SELECT USING (true);
CREATE POLICY "Public Read Gallery" ON public.site_gallery FOR SELECT USING (true);

-- Public Lead Inquiries Policy
CREATE POLICY "Public Insert Inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);

-- Admin Full Management Policies (Authenticated User)
CREATE POLICY "Admin All Courses" ON public.courses FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All CSC" ON public.csc_services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Govt" ON public.govt_services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Inquiries" ON public.inquiries FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Laptops" ON public.laptops FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Repairs" ON public.repair_services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Certificates" ON public.certificates FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Forms" ON public.downloadable_forms FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All News" ON public.news FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Gallery" ON public.site_gallery FOR ALL USING (auth.role() = 'authenticated');


-- ===================================================
-- INITIAL CATALOG SEED DATA
-- ===================================================

-- Seed Courses
INSERT INTO public.courses (slug, title, subtitle_mr, subtitle_en, category, tag, duration_mr, duration_en, fee_mr, fee_en, certification_mr, certification_en, eligibility_mr, eligibility_en, overview_mr, overview_en, modules_mr, modules_en, careers_mr, careers_en)
VALUES
(
  'mscit',
  'MS-CIT (MKCL Authorized)',
  'महाराष्ट्र शासन व MKCL मान्यताप्राप्त अधिकृत संगणक कोर्स',
  'Govt of Maharashtra & MKCL Authorized Information Technology Course',
  'govt',
  'सर्वात लोकप्रिय',
  '२ महिने (रोज २ तास) किंवा ३ महिने (रोज १ तास)',
  '2 Months (2 hrs/day) or 3 Months (1 hr/day)',
  '₹४,५०० (२ ते ३ सुलभ हप्त्यांमध्ये भरता येते)',
  '₹4,500 (2 or 3 Easy Instalments)',
  'महाराष्ट्र ज्ञान महामंडळ (MKCL) व महाराष्ट्र शासन',
  'Maharashtra Knowledge Corporation Limited (MKCL) & Govt of Maharashtra',
  'इयत्ता ५ वी पुढील सर्व विद्यार्थी, नागरिक व नोकरदार',
  'Students 5th Standard & Above, Job Seekers, Housewives & Seniors',
  'MS-CIT हा महाराष्ट्र शासनाचा सर्वात लोकप्रिय संगणक कोर्स आहे. यामध्ये संगणकाचे मूलभूत ज्ञान, Windows 11, MS Office 2021, इंटरनेट, डिजिटल पेमेंट, कृत्रिम बुद्धिमत्ता (AI) टूल्स आणि २१ व्या शतकातील ५० हून अधिक आवश्यक डिजिटल कौशल्यांचा समावेश आहे.',
  'MS-CIT is Maharashtra’s flagship IT literacy program. It covers computer fundamentals, Windows 11, MS Office 2021, internet safety, digital financial transactions, AI productivity tools, and over 50 essential 21st-century digital skills.',
  '[{"name": "संगणक पायाभूत ज्ञान", "desc": "Windows 11, फाइल मॅनेजमेंट, कॉम्प्युटर सेटिंग्ज"}, {"name": "MS Word 2021", "desc": "पत्रव्यवहार, रिज्युमे बनवणे, रिपोर्ट टायपिंग"}, {"name": "MS Excel 2021", "desc": "स्प्रेडशीट, फॉर्म्युले, चार्ट्स व बजेट"}, {"name": "MS PowerPoint 2021", "desc": "ॲनिमेशन, व्हिडिओ प्रेझेंटेशन"}, {"name": "इंटरनेट & AI टूल्स", "desc": "ऑनलाइन बिल भरणा, ई-तिकीट, ChatGPT"}, {"name": "सायबर सुरक्षा", "desc": "ऑनलाइन फ्रॉडपासून संरक्षण, UPI सुरक्षा"}]'::jsonb,
  '[{"name": "Computer Operating & Windows 11", "desc": "Operating basics, file management"}, {"name": "MS Word 2021", "desc": "Letter drafting, resume building"}, {"name": "MS Excel 2021", "desc": "Data management, formulas, charts"}, {"name": "MS PowerPoint 2021", "desc": "Slide animations, decks"}, {"name": "Internet & AI Tools", "desc": "Utility bills, railway tickets, ChatGPT"}, {"name": "Cyber Security", "desc": "Fraud prevention, UPI safety"}]'::jsonb,
  ARRAY['सरकारी लिपिक भरतीसाठी आवश्यक', 'डाटा एंट्री ऑपरेटर', 'ऑफिस असिस्टंट'],
  ARRAY['Mandatory for Govt Clerk Exams', 'Data Entry Operator', 'Office Assistant']
),
(
  'tally-prime-gst',
  'Tally Prime with GST Accounting',
  'प्रॅक्टिकल अकाउंटिंग, GST इन्व्हॉईसिंग आणि टॅली ऑथोराईज्ड प्रमाणपत्र',
  'Real-World Business Accounting, GST Invoicing & Tally Authorized Certification',
  'job',
  'नोकरीसाठी १००% उपयुक्त',
  '२ महिने (रोज २ तास)',
  '2 Months (2 hrs/day)',
  '₹५,५०० (हप्त्याने उपलब्ध)',
  '₹5,500 (Instalment Available)',
  'टॅली एज्युकेशन प्रा. लि. (Tally Authorized Certificate)',
  'Tally Education Pvt. Ltd. Authorized Certificate',
  '१० वी / १२ वी / बी.कॉम / एम.कॉम विद्यार्थी व व्यावसायिक',
  'Commerce Students, Job Seekers, Shopkeepers & Accountants',
  'हा कोर्स विद्यार्थ्यांना प्रॅक्टिकल व्यावसायिक अकाउंटिंग शिकवतो. यामध्ये टॅली प्राइम ॲप्लिकेशन, अकाउंट्स क्रिएशन, GST बिलिंग, E-Way बिल, पेरोल, TDS, आणि टॅली ऑडिटचा समावेश आहे. शिरवळ MIDC मधील कंपन्यांसाठी विशेष उपयुक्त.',
  'Comprehensive practical business accounting training. Learn Tally Prime, ledger creation, GST invoicing, E-Way bills, payroll, TDS, and audit compliance. Highly demanded in Shirwal MIDC manufacturing units.',
  '[{"name": "अकाउंटिंग तत्त्वे", "desc": "गोल्डन रूल्स, जर्नल एंट्रीज, लेजर"}, {"name": "Tally Prime परिचय", "desc": "कंपनी क्रिएशन, लेजर्स व इन्व्हेंटरी"}, {"name": "GST इन्व्हॉईसिंग", "desc": "CGST, SGST, IGST बिलिंग & E-Way"}, {"name": "पेरोल & TDS", "desc": "कर्मचाऱ्यांचे पगार पत्रक, PF, TDS"}]'::jsonb,
  '[{"name": "Accounting Fundamentals", "desc": "Golden rules, journal entries, ledger"}, {"name": "Tally Prime Architecture", "desc": "Company creation, ledger setup"}, {"name": "GST Billing & Invoicing", "desc": "CGST, SGST, IGST & E-Way bills"}, {"name": "Payroll & TDS", "desc": "Pay slips, PF, ESI & TDS"}]'::jsonb,
  ARRAY['टॅली अकाउंटंट (शिरवळ MIDC)', 'अकाउंट्स असिस्टंट', 'GST बिलिंग एक्झिक्युटिव्ह'],
  ARRAY['Tally Accountant (Shirwal MIDC)', 'Accounts Executive', 'GST Billing Operator']
)
ON CONFLICT (slug) DO NOTHING;

-- Seed CSC Services
INSERT INTO public.csc_services (slug, title_mr, title_en, category, badge, timeline_mr, timeline_en, govt_fee_mr, govt_fee_en, overview_mr, overview_en, required_docs_mr, required_docs_en, steps_mr, steps_en)
VALUES
(
  'pan-card',
  'झटपट पॅन कार्ड (Instant PAN Card)',
  'Instant PAN Card Application & Correction',
  'identity',
  'झटपट २ तासात ई-पॅन',
  '२ ते २४ तास (ई-पॅन), ७ ते १० दिवस (फिजिकल कार्ड)',
  '2-24 Hours (E-PAN), 7-10 Days (Physical Card)',
  '₹१०७ (शासकीय शुल्क) + सेतू प्रक्रिया फी',
  '₹107 (Govt Fee) + Processing Charge',
  'नवीन पॅन कार्ड काढणे किंवा जुन्या पॅन कार्डमध्ये नाव, जन्मतारीख व पत्ता दुरुस्ती करणे. आधार कार्ड लिंक करून फक्त २ तासात डिजिटल ई-पॅन प्राप्त करा.',
  'Apply for a new PAN card or request corrections in name, date of birth, or photo. Get digital E-PAN in just 2 hours via Aadhaar biometric/OTP verification.',
  ARRAY['आधार कार्ड (Aadhaar Card)', '२ नवीन पासपोर्ट साईझ फोटो', 'आधार कार्डशी लिंक असलेला मोबाईल नंबर'],
  ARRAY['Aadhaar Card copy', '2 Recent Passport Size Photographs', 'Aadhaar Linked Active Mobile Number'],
  ARRAY['केंद्रावर आधार कार्ड घेऊन या.', 'बायोमेट्रिक किंवा मोबाईल OTP द्वारे व्हेरिफिकेशन करा.', '२ तासात ई-पॅन प्राप्त करा.'],
  ARRAY['Visit center with Aadhaar Card.', 'Verify via Aadhaar OTP or Biometric scan.', 'Receive E-PAN PDF within 2 hours.']
),
(
  'income-certificate',
  'उत्पन्न दाखला (Income Certificate)',
  'Income Certificate (1 Year & 3 Years)',
  'certificates',
  'तहसीलदार मान्यताप्राप्त',
  '३ ते ५ कार्यदिवस',
  '3-5 Working Days',
  '₹५६ (आपले सरकार पोर्टल शुल्क)',
  '₹56 (Aaple Sarkar Portal Fee)',
  'शासकीय शिष्यवृत्ती, कॉलेज प्रवेश, रेशन कार्ड व विविध योजनांसाठी १ वर्ष किंवा ३ वर्षाचा तहसीलदार स्वाक्षरीचा अधिकृत उत्पन्नाचा दाखला.',
  'Official Tehsildar signed Income Certificate valid for 1 year or 3 years. Essential for college scholarship applications, fee concessions, and government welfare schemes.',
  ARRAY['रेशन कार्ड प्रत', 'तलाठी उत्पन्नाचा दाखला / पासबुक', 'अर्जदाराचे आधार कार्ड'],
  ARRAY['Ration Card Copy', 'Talathi Income Certificate or Bank Passbook', 'Applicant Aadhaar Card'],
  ARRAY['कागदपत्रांची सेतू केंद्रात तपासणी.', 'पोर्टलवर ऑनलाईन अर्ज सादर करणे.', 'डिजिटल दाखला प्राप्त करणे.'],
  ARRAY['Document verification at center desk.', 'Online application on portal.', 'Receive Tehsildar certificate.']
)
ON CONFLICT (slug) DO NOTHING;

-- Seed Govt Services
INSERT INTO public.govt_services (slug, title_mr, title_en, category, badge, timeline_mr, timeline_en, govt_fee_mr, govt_fee_en, overview_mr, overview_en, requirements_mr, requirements_en, steps_mr, steps_en)
VALUES
(
  'caste-certificate',
  'जातीचा दाखला (Caste Certificate)',
  'Caste Certificate Application',
  'revenue',
  'उपविभागीय अधिकारी (SDO) स्वाक्षरी',
  '१५ ते २१ कार्यदिवस',
  '15-21 Working Days',
  '₹५६ (आपले सरकार पोर्टलकडून)',
  '₹56 (Aaple Sarkar Portal Fee)',
  'शासकीय नोकरी सवलत, शैक्षणिक प्रवेश आरक्षण व सवलतीसाठी उपविभागीय अधिकारी (SDO) यांच्याकडून जारी केला जाणारा अधिकृत जातीचा दाखला.',
  'Official Caste Certificate issued by Sub-Divisional Officer (SDO). Essential for educational seat reservations, scholarship fee concessions, and government job quota applications.',
  ARRAY['अर्जदाराचे आधार कार्ड व शाळा सोडल्याचा दाखला (TC/LC)', 'वडिलांचे किंवा आजोबांचे शाळा सोडल्याचा दाखला', '१९६७ पूर्वीचा महसुली पुरावा'],
  ARRAY['Applicant Aadhaar Card & School Leaving Certificate', 'Father’s or Grandfather’s School Leaving Certificate', 'Pre-1967 Revenue Proof'],
  ARRAY['वंशावळ पुरावे सेतू केंद्रात जमा करा.', 'पोर्टलवर ऑनलाईन अर्ज सादर करा.', 'एसडीओ कार्यालयाकडून दाखला प्राप्त करा.'],
  ARRAY['Submit family genealogy proof & identity cards.', 'Filing application on portal with affidavit.', 'Receive SDO Caste Certificate.']
),
(
  'domicile-certificate',
  'महाराष्ट्राचे रहिवासी प्रमाणपत्र (Domicile Certificate)',
  'Domicile & Nationality Certificate',
  'revenue',
  'तहसीलदार प्रमाणपत्र',
  '७ ते १० कार्यदिवस',
  '7-10 Working Days',
  '₹५६ (पोर्टल शुल्क)',
  '₹56 (Portal Fee)',
  'महाराष्ट्र राज्यात सलग १५ वर्षे किंवा त्याहून अधिक काळ राहणाऱ्या नागरिकांसाठी तहसीलदार स्वाक्षरीचे अधिवास व भारतीय राष्ट्रीयत्व प्रमाणपत्र.',
  'Official Domicile & Nationality Certificate issued by Tehsildar for citizens residing in Maharashtra for 15+ years. Mandatory for Engineering, Medical, & Govt job admissions.',
  ARRAY['अर्जदाराचे आधार कार्ड व शाळा सोडल्याचा दाखला', 'मागील १५ वर्षांचा रहिवासी पुरावा', 'वडिलांचे आधार कार्ड'],
  ARRAY['Applicant Aadhaar Card & TC/LC', '15 Years Residence Proof (Electricity Bill / Ration Card)', 'Father’s Aadhaar Card'],
  ARRAY['१५ वर्षांचे रहिवासी पुरावे तपासा.', 'ऑनलाईन अर्ज करा.', 'स्वाक्षरीचे अधिवास प्रमाणपत्र डाऊनलोड करा.'],
  ARRAY['Verify 15-year residence proofs.', 'Online filing on portal.', 'Download Domicile Certificate.']
)
ON CONFLICT (slug) DO NOTHING;

-- Seed Refurbished Laptops
INSERT INTO public.laptops (model, specs, price, condition, warranty, image)
VALUES
('Dell Latitude 5490 (Corporate Series)', 'Intel Core i5 8th Gen / 8GB DDR4 RAM / 256GB NVMe SSD / 14" FHD', '₹14,499', 'Grade A Corporate Certified', '6 Months Center Warranty', 'laptop-dell'),
('HP EliteBook 840 G5 (Aluminum Body)', 'Intel Core i5 8th Gen / 16GB DDR4 RAM / 512GB NVMe SSD / Backlit Keyboard', '₹17,999', 'Grade A Slim Business Edition', '6 Months Center Warranty', 'laptop-hp'),
('Lenovo ThinkPad T480 (Rugged Business)', 'Intel Core i5 8th Gen / 8GB RAM / 256GB SSD / Dual Battery Support', '₹15,999', 'Grade A Commercial Grade', '6 Months Center Warranty', 'laptop-lenovo');

-- Seed Repair Services
INSERT INTO public.repair_services (slug, title_mr, title_en, category, est_time_mr, est_time_en, est_cost_mr, est_cost_en, warranty, overview_mr, overview_en, highlights_mr, highlights_en)
VALUES
(
  'motherboard-repair',
  'मदरबोर्ड चिप-लेव्हल रिपेअरिंग',
  'Chip-Level Motherboard Repair',
  'repair',
  'त्याच दिवशी किंवा २४ तास',
  'Same Day or 24 Hours',
  '₹८०० - ₹२,५०० (समस्येनुसार)',
  '₹800 - ₹2,500 (Subject to issue)',
  '30 Days Service Warranty',
  'लॅपटॉप पूर्णपणे बंद असणे, नो-डिस्पले, शॉर्टिंग, किंवा लिक्विड डॅमेज समस्यांसाठी प्रगत मायक्रो-सोल्डरिंग उपकरणांद्वारे दुरुस्ती.',
  'Advanced micro-soldering chip-level repair for dead laptops, no-display issues, power short circuits, and liquid spill damage.',
  ARRAY['माइक्रोस्कोप तपासणी', 'मूळ आयसी रिप्लेसमेंट', '३० दिवसांची वॉरंटी'],
  ARRAY['Microscopic Fault Diagnosis', 'Genuine IC Replacement', '30-Day Service Warranty']
),
(
  'ssd-upgrade',
  'NVMe SSD अपग्रेड & OS फिक्स',
  'NVMe SSD Speed Upgrade & Genuine OS',
  'upgrade',
  '१ ते २ तास',
  '1-2 Hours',
  '₹१,५०० - ₹३,२००',
  '₹1,500 - ₹3,200',
  '3 Years SSD Warranty',
  'जुना व स्लो चालणारा लॅपटॉप ५ पट फास्ट करा. M.2 NVMe SSD अपग्रेड, 8GB/16GB RAM वाढवणे आणि ओरिजिनल Windows 11 इन्स्टॉलेशन.',
  'Boost slow laptop boot speed by 5x with M.2 NVMe SSD upgrades, 8GB/16GB RAM expansions, and clean Windows 11 installation.',
  ARRAY['५ पट फास्ट बूट स्पीड', '३ वर्षांची ब्रँड वॉरंटी', 'डेटा 100% सुरक्षित'],
  ARRAY['5x Faster Boot & App Speed', '3-Year Brand Warranty', '100% Data Protection']
)
ON CONFLICT (slug) DO NOTHING;

-- Seed Verified Student Certificates
INSERT INTO public.certificates (reg_no, student_name_mr, student_name_en, course_name, issue_date, marks, grade, center_code, status, authority)
VALUES
('MSCIT20268841', 'पूजा संजय सूर्यवंशी', 'Pooja Sanjay Suryavanshi', 'MS-CIT (MKCL Certified)', '15 MAY 2026', '96%', 'O Grade (Outstanding)', 'Center Code #MKCL-412802', 'VERIFIED_GENUINE', 'Maharashtra Knowledge Corporation Limited (MKCL)'),
('TALLY20269912', 'रोहन विकास कदम', 'Rohan Vikas Kadam', 'Tally Prime with GST Advanced', '20 JUN 2026', '92%', 'A+ Grade', 'Tally Authorized Center #SAT-091', 'VERIFIED_GENUINE', 'Tally Education Pvt. Ltd. Bengaluru'),
('TYPING20264410', 'अमित दत्तात्रय पवार', 'Amit Dattatray Pawar', 'GCC-TBC Typing 40 wpm (English/Marathi)', '10 JUL 2026', '94%', 'First Class with Distinction', 'State Board Center #MSEC-412', 'VERIFIED_GENUINE', 'Maharashtra State Examination Council Pune')
ON CONFLICT (reg_no) DO NOTHING;

-- Seed Downloadable Forms
INSERT INTO public.downloadable_forms (name_mr, name_en, size, type, file_url)
VALUES
('उत्पन्न दाखला स्वयंघोषणा पत्र', 'Income Cert Self-Declaration Form', '240 KB', 'PDF', '#brochure'),
('महाराष्ट्राचे रहिवासी प्रमाणपत्र अर्ज', 'Domicile Certificate Application', '310 KB', 'PDF', '#brochure'),
('राजपत्र (गॅझेट) नाव बदल शपथपत्र', 'Gazette Name Change Affidavit', '180 KB', 'PDF / DOC', '#brochure'),
('नवीन पॅन कार्ड अर्ज फॉर्म ४९A', 'New PAN Card Form 49A', '420 KB', 'PDF', '#brochure');

-- Seed Sample Inquiries
INSERT INTO public.inquiries (type, name, mobile, course_id, service_id, batch_timing, status)
VALUES
('course_admission', 'पूजा सूर्यवंशी', '9822001122', 'MS-CIT', NULL, 'Morning 09:30 AM', 'New Lead'),
('csc_service', 'अमित कदम', '9423004455', NULL, 'Instant PAN Card', NULL, 'In Process');

-- 11. Faculties Table
CREATE TABLE IF NOT EXISTS public.faculties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role_mr TEXT,
  role_en TEXT,
  exp_mr TEXT,
  exp_en TEXT,
  spec_mr TEXT,
  spec_en TEXT,
  badge TEXT DEFAULT 'Faculty',
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.faculties ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Faculties" ON public.faculties FOR SELECT USING (true);
CREATE POLICY "Admin All Faculties" ON public.faculties FOR ALL USING (auth.role() = 'authenticated');

-- 12. Batch Timetable 2026 Table
CREATE TABLE IF NOT EXISTS public.batch_timetable (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT DEFAULT 'morning',
  time TEXT NOT NULL,
  course_mr TEXT,
  course_en TEXT,
  status_mr TEXT,
  status_en TEXT,
  seats_mr TEXT,
  seats_en TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.batch_timetable ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Batches" ON public.batch_timetable FOR SELECT USING (true);
CREATE POLICY "Admin All Batches" ON public.batch_timetable FOR ALL USING (auth.role() = 'authenticated');


