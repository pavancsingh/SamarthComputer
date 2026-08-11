# PowerPoint Presentation Deck — Samarth Computers Khandala

**Degree Program:** Bachelor of Computer Applications (BCA)  
**Project Title:** Samarth Computers Khandala — Modern Computer Education & Digital Services Platform  
**File Output:** [Samarth_Computers_BCA_Presentation.pptx](file:///d:/Samarthcomputers/docs/project-presentation/Samarth_Computers_BCA_Presentation.pptx)  
**Aspect Ratio:** 16:9 Widescreen  
**Branding Palette:** `#C62828` Primary Red, `#0F172A` Navy Slate, `#10B981` Emerald, `#64748B` Muted Gray  

---

## Slide 1: Title Slide
- **Title:** Samarth Computers Khandala
- **Subtitle:** Modern Computer Education & Digital Services Platform
- **Accreditation:** MKCL Authorized Learning Center (ALC 13210399 / 13210273)
- **Tagline:** Full-Stack Web Application for Computer Training & Digital Service Portal
- **Visual Design:** Dark Navy background (`#0F172A`), red vertical accent bar (`#C62828`), emerald subtitle (`#10B981`).
- **Speaker Notes:** "Good morning respected examiners and faculty members. Today I am presenting my BCA final year project: Samarth Computers Khandala, a full-stack digital platform for computer training and government service assistance."

---

## Slide 2: Project Overview & Background
- **Card 1 — What is Samarth Computers?**
  - Established MKCL Authorized Learning Center in Khandala, Satara.
  - Offers IT courses: MS-CIT, Tally Prime GST, Typing (GCC-TBC), Advanced Excel.
  - Operates an official CSC Digital Seva Kendra for citizen services.
- **Card 2 — Purpose of Digital Platform**
  - Bridge student aspirations with 24/7 web course discovery.
  - Eliminate document confusion for government service applicants.
  - Provide automated student certificate verification.
- **Card 3 — System Architecture Scope**
  - High-converting public marketing website.
  - Comprehensive Admin Operations Dashboard.
  - Real-time data synchronization backed by Supabase PostgreSQL.
- **Speaker Notes:** "Samarth Computers is a trusted IT institute in Khandala. This project delivers a production-grade web platform combining a public portal for course/CSC discovery with a full Admin Dashboard."

---

## Slide 3: Problem Statement
- **Card 1 — Manual Content & Pamphlet Dependency**
  - Course syllabus, fee details, and batch timings relied on printed flyers and verbal explanation.
  - No single digital destination for prospective students to review course curriculum.
- **Card 2 — Difficult Service & Fee Updates**
  - Updating batch timetables or fees required physical poster re-printing.
  - Static websites required developer intervention for basic text modifications.
- **Card 3 — Scattered Student & Customer Data**
  - Student admission inquiries were written manually in physical registers.
  - High risk of lost phone numbers, unorganized leads, and delayed follow-ups.
- **Card 4 — Limited Citizen Guidance & Accessibility**
  - Citizens frequently arrived at CSC center without required application documents.
  - No online mechanism for employers to verify course completion certificates.
- **Speaker Notes:** "Before this application, institute inquiries were logged in paper registers, document checklists were explained verbally, and content updates required manual effort."

---

## Slide 4: Project Objectives
1. **Digitalize Institute Information:** Provide 24/7 web access to MKCL course syllabi, fee schedules, faculty profiles, and campus facilities.
2. **Streamline CSC & Govt Services:** Eliminate citizen confusion with interactive document checklists and step-by-step application instructions.
3. **Centralize Administration:** Build a secure Admin Dashboard featuring rate-limited auth, lead inbox management, and 19 CRUD sub-panels.
4. **Enable Certificate Verification:** Implement instant online verification of student completion certificates using registration numbers.
5. **Responsive & Bilingual Experience:** Deliver zero-reload dynamic language switching between Marathi and English with mobile-first layouts.
- **Speaker Notes:** "Our core objectives were to digitize institute communications, streamline CSC document guidance, centralize administration, provide certificate verification, and deliver a bilingual Marathi/English user experience."

---

## Slide 5: Proposed System Architecture Flow
- **Public Visitor Workflow:**
  - Explore MKCL Courses & Syllabus Modules
  - Review CSC Document Checklists
  - Check Live Batch Timetables
  - Verify Student Completion Certificates
  - Submit Admission & Service Inquiry Leads
- **React 19 App Shell:**
  - Client-side SPA Router (`currentView`)
  - Bilingual Engine (Marathi / English)
  - Stitch Design System Tokens
  - AuthContext & Security Rate Limiter
  - `sharedStore` LocalStorage Observer Cache
- **Admin & Database Backend:**
  - Rate-limited Admin Login Authentication
  - Real-Time Digital Leads Inbox
  - 19 Modular CRUD Control Panels
  - Supabase PostgreSQL (10 RLS Tables)
  - Supabase Storage (`samarth-media` bucket)
- **Speaker Notes:** "The proposed system replaces manual logbooks with a unified React single-page application connected directly to Supabase cloud infrastructure for real-time lead tracking and content management."

---

## Slide 6: Technology Stack
- **React 19 (Frontend Core):** Client-side rendering, component-driven UI architecture.
- **Vite 6 (Build Tool & Dev Server):** Ultra-fast HMR compilation, optimized production bundling.
- **Tailwind CSS 3.4 (Design System):** Stitch design tokens, responsive grid layouts, custom typography.
- **Supabase Cloud (Backend Infrastructure):** PostgreSQL database, Auth, Storage bucket, instant APIs.
- **PostgreSQL (Relational Database):** 10 tables with Row Level Security (RLS) policies.
- **Cloudflare Pages (Hosting & Edge CDN):** Global high-availability deployment with SSL & deep-link routing.
- **Speaker Notes:** "We selected React 19 and Vite 6 for high-speed client rendering, Tailwind CSS 3.4 for UI styling, Supabase PostgreSQL for backend persistence, and Cloudflare Pages for edge hosting."

---

## Slide 7: Public Website Features
- **Key Modules Listed:**
  - Home Page: Hero banner, MKCL badges, statistics counter.
  - Course Catalog: Filterable MS-CIT, Tally, Typing, Excel cards.
  - CSC Services Desk: Identity & Revenue scheme guides.
  - Faculty Directory: Teacher credentials & experience.
  - Batch Timetable: Morning/Afternoon/Evening schedule slots.
  - Certificate Verification: Search by Registration Number.
  - Contact Page: Address, click-to-call, embedded map.
- **Embedded UI Media:** Screen capture of `01-home-hero.png`.
- **Speaker Notes:** "The public website provides an intuitive interface for students and citizens to explore courses, check timetables, verify certificates, and locate the institute."

---

## Slide 8: Courses & CSC Services Desk
- **Interactive Discovery Modules:**
  - Categorized Course Exploration: MS-CIT, Tally Prime GST, Typing (GCC-TBC 30/40 wpm), Advanced Excel.
  - Course Detail Drawer: Syllabus modules list, duration, fee estimates, and career opportunities.
  - CSC Identity Services: Aadhaar Card, PAN Card, Voter ID.
  - Revenue Services: 7/12 Utara, Domicile, Income Certificate.
  - Document Checklist Modal (`DocChecklistModal`): Clear step-by-step document guidance for local citizens.
- **Embedded UI Media:** Screen capture of `03-course-details-modal.png` / `04-csc-services-desk.png`.
- **Speaker Notes:** "Students can open detailed syllabus drawers for any course, while citizens receive exact document checklists before visiting the center for government certificate applications."

---

## Slide 9: Centralized Admin Operations Dashboard
- **Management Capabilities:**
  - Overview Analytics: Live KPI cards for total leads, active courses, CSC services, and faculty count.
  - Quick Action Bar: One-click creation for courses, timetable slots, gallery photos, and news.
  - Real-Time Leads Inbox: Captures student inquiries with status tags (`New Lead`, `In Process`, `Completed`).
  - Live Database Persistence: All administrative edits sync directly with Supabase PostgreSQL.
- **Embedded UI Media:** Screen capture of `12-admin-overview.png`.
- **Speaker Notes:** "The Admin Dashboard gives institute managers total control over student lead tracking, course catalogs, timetable slots, and center announcements from a single screen."

---

## Slide 10: Admin Sidebar Architecture & Accordion Redesign
- **3-Tier Grouped Sidebar:**
  - Tier 1: **MAIN NAVIGATION** — Dashboard, Inbox Leads, Courses, CSC Services, Faculty, News, Timetable, Photos.
  - Tier 2: **WEBSITE PAGES** — Home Page, About Page, Contact & Call CTA configuration.
  - Tier 3: **SETTINGS & CONFIG ACCORDION** — Consolidated single collapsible menu housing 10 sub-panels:
    - *Navigation, Branding, Govt Certificates, Theme, Site Info, SEO, Social Links, Footer.*
- **Speaker Notes:** "To improve admin usability, we restructured the sidebar into three distinct categories and consolidated secondary site configuration controls into a clean expandable accordion."

---

## Slide 11: Supabase Database & Architecture Diagram
- **React 19 Frontend:** App Shell, View Router, AuthContext, Stitch UI, Language State.
- **Repository Layer:** `AdminRepository.js`, `CourseRepository.js`, `InquiryRepository.js`, `sharedStore`, `StorageService.js`.
- **Supabase Cloud Backend:** PostgreSQL Engine (10 RLS Tables), Supabase Auth, `samarth-media` Storage Bucket, Base64 Fallback Engine.
- **Speaker Notes:** "The application follows a clean 3-tier data architecture linking the React client to repository abstractions, which query Supabase cloud database and storage services."

---

## Slide 12: Verified Database Modules (10 PostgreSQL Tables)
1. `public.inquiries` — Leads inbox storing student admissions & service inquiries.
2. `public.courses` — Course catalog with JSONB syllabus modules & fee structure.
3. `public.csc_services` — CSC identity services with JSONB document checklists.
4. `public.govt_services` — Revenue services with JSONB application steps.
5. `public.faculties` — Instructor profiles, designations, & specializations.
6. `public.site_gallery` — Campus lab photos & event gallery records.
7. `public.site_settings` — Central center configuration record (`main_settings`).
8. `public.batches` — Morning, afternoon, evening timetable slots.
9. `public.news` — Institute announcements & examination news updates.
10. `public.certificates` — Student completion records for online verification.
- **Speaker Notes:** "The backend relies on 10 verified PostgreSQL tables in Supabase. We utilize JSONB columns for flexible syllabus modules and document checklists."

---

## Slide 13: Site Settings & Configuration Persistence
- **Configurable Sub-Panels:**
  - Navigation: Custom menu order & visibility.
  - Branding: Institute logo upload & hero banner background.
  - Govt Certificates: MKCL ALC code & CSC registration ID.
  - Theme: Custom primary & secondary color accents.
  - Site Information: Office hours, contact numbers, map URL.
  - SEO & Meta: Search meta title, description, and keywords.
  - Social Links: Facebook, Instagram, YouTube URLs.
  - Footer: Tagline, copyright notice, & quick links.
- **Speaker Notes:** "All center parameters, logos, contact numbers, and SEO metadata are managed dynamically through the site settings accordion and saved to Supabase."

---

## Slide 14: Security & Data Protection Engine
- **Admin Auth & Brute-Force Protection:** Access restricted to allowed emails (`pawansingh3760@gmail.com`). Rate limiter locks login for 60 seconds after 5 failed password attempts.
- **PostgreSQL Row Level Security (RLS):** Enabled across all 10 database tables. Public SELECT for catalog tables; Public INSERT strictly for lead inquiries.
- **Session Management:** Encapsulated `AuthContext` provider with encrypted persistent session tokens stored in LocalStorage.
- **Environment Security:** `VITE_SUPABASE_URL` and `ANON_KEY` isolation. Protected storage bucket upload policies (`samarth-media`).
- **Speaker Notes:** "Security is enforced at multiple levels: rate-limited login, allowed email validation, LocalStorage session persistence, and PostgreSQL Row Level Security policies."

---

## Slide 15: Responsive UI & Bilingual (Marathi / English) Engine
- **Dynamic Language Switching:** Zero-reload toggle between Marathi (मराठी) and English across all UI components.
- **Dual-Language Data Model:** Backend schemas support dual text fields (`title_mr` / `title_en`, `overview_mr` / `overview_en`).
- **Mobile-First Layout:** Responsive grid scaling gracefully across smartphones, tablets, and 4K desktop screens.
- **Touch-Friendly Controls:** Mobile navigation drawer, high-contrast buttons, and smooth touch scrolling.
- **Embedded UI Media:** Screen capture of `17-mobile-responsive-ui.png`.
- **Speaker Notes:** "The application is built mobile-first and offers seamless bilingual switching between Marathi and English without refreshing the page."

---

## Slide 16: Testing & Quality Assurance Results
- **Production Build Audit:** `npm run build` executed successfully with 0 errors in 18.46s via Vite 6.
- **End-to-End Persistence QA:** 100% verification across all 19 admin management modules on Supabase PostgreSQL.
- **Storage & Image Upload QA:** Direct file uploads to `samarth-media` bucket verified with versioned cache-busting URLs (`?v=timestamp`).
- **Cross-Device UI Verification:** Mobile responsive drawer menu and certificate verification search engine fully verified.
- **Speaker Notes:** "Our testing confirmed 100% data persistence across all 19 admin modules, passing production build checks with zero compilation errors."

---

## 17. Slide 17: Deployment & Production Operations Architecture
- **1. Code & CI/CD:** GitHub Repository (`pavancsingh/SamarthComputer`), branch `main`, automated Cloudflare build hooks.
- **2. Production Build:** `npm run build` command, `dist/` bundle directory, `_redirects` SPA deep-link routing rule (`/* /index.html 200`).
- **3. Live Hosting & Backend:** Cloudflare Pages global edge CDN (`https://samarth-computers.pages.dev`), SSL security, and environment variables.
- **Speaker Notes:** "The project is deployed live on Cloudflare Pages global edge CDN, integrated directly with GitHub for CI/CD and connected securely to Supabase."

---

## 18. Slide 18: Conclusion & Future Roadmap
- **Project Conclusion:** Modernized institute operations with a full-stack digital platform, eliminated paper registers with a real-time lead inbox, simplified CSC document checklists, and delivered high-performance React 19 architecture with Supabase PostgreSQL.
- **Future Roadmap (v2.0):**
  - Online Fee Payment Gateway: Direct Razorpay & UPI QR code integration.
  - Automated SMS & WhatsApp Alerts: Instant lead receipt confirmation.
  - Student Learning Portal: Dedicated dashboard for typing tests & study notes.
  - Online Admission Workflow: Direct document upload for student admissions.
- **Speaker Notes:** "In conclusion, Samarth Computers Khandala is a complete digital solution for computer education and government services. In future updates, we plan to add online fee payments and automated SMS alerts. Thank you!"
