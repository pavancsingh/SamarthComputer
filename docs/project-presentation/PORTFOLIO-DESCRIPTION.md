# Portfolio & Resume Descriptions — Samarth Computers Khandala

---

## 📌 1-Line Project Title
**Samarth Computers Khandala** — Full-Stack Bilingual Web Platform & Admin Management Suite for Computer Training Institutes and Government Service Centers.

---

## 📝 50-Word Project Description
A full-stack, mobile-responsive web platform engineered with React 19, Tailwind CSS 3.4, and Supabase PostgreSQL for an MKCL-authorized computer institute in Maharashtra. Features bilingual (Marathi/English) course discovery, CSC government service checklists, online certificate verification, and a custom 19-module Admin Dashboard with real-time data persistence.

---

## 📄 100-Word Project Description
Samarth Computers Khandala is a production-grade full-stack web application designed for a premier computer training center and Common Service Center (CSC). Built using React 19, Vite 6, Tailwind CSS 3.4, and Supabase (PostgreSQL + Storage), the portal offers seamless bilingual (Marathi/English) navigation across course syllabi, fee structures, faculty profiles, news announcements, and batch timetables. It includes an interactive document checklist guide for government services, student certificate verification, and a secure Admin Dashboard featuring rate-limited authentication, full CRUD control across 10 PostgreSQL tables, and global Cloudflare Pages deployment.

---

## ⭐ Key Features
- **Bilingual Interface:** Instant client-side switching between Marathi and English without page reload.
- **Interactive Course Catalog:** Filterable catalog (MS-CIT, Tally Prime GST, Typing, Advanced Excel) with syllabus breakdown and career prospects.
- **CSC & Govt Services Desk:** Document checklist guidance for Aadhaar, PAN Card, Income Certificate, and 7/12 Utara.
- **Student Certificate Verification:** Real-time certificate search engine against official registration numbers.
- **Custom Admin Dashboard:** 3-tier organized sidebar menu with full CRUD modules for courses, services, faculty, timetable, gallery, and news.
- **Settings & Config Accordion:** Centralized site configuration (Branding, SEO, Social links, Contact info, Navigation menu).
- **Direct Media Storage:** Direct image upload to Supabase Storage with cache-busting versioned URLs.

---

## 💻 Tech Stack
- **Frontend:** React 19, Vite 6, JavaScript (ES6+), JSX, Tailwind CSS 3.4, Lucide React, Framer Motion
- **Backend & Database:** Supabase PostgreSQL (10 Tables with Row Level Security)
- **Authentication:** Supabase Auth + Local Rate-Limiting Protection (5 failed attempts lockout)
- **File Storage:** Supabase Storage `samarth-media` Bucket with Base64 Data URL fallback
- **Hosting & CI/CD:** Cloudflare Pages Global CDN (`https://samarth-computers.pages.dev`)

---

## 🛡️ Security Features
- **Row Level Security (RLS):** Enabled across all 10 PostgreSQL database tables.
- **Rate-Limited Authentication:** Lockout protection after 5 consecutive failed admin login attempts.
- **Email Access Control:** Restricted login to verified center administrator accounts.
- **Input Validation & Sanitization:** Client and repository layer data normalization.

---

## 🙋 My Contribution
- Designed and developed the entire frontend architecture using React 19 and Tailwind CSS 3.4.
- Architected the 10-table PostgreSQL database schema and RLS security policies on Supabase.
- Built the data repository layer (`AdminRepository.js`, `InquiryRepository.js`, `sharedStore.js`) with column fallback handling.
- Redesigned the Admin Dashboard sidebar into a 3-tier layout with an expandable settings accordion.
- Implemented bilingual Marathi/English state management and responsive mobile drawer navigation.
- Configured production deployment pipeline on Cloudflare Pages.

---

## 🔗 Links & Placeholders
- **Live Demo:** [https://samarth-computers.pages.dev](https://samarth-computers.pages.dev)
- **GitHub Repository:** [https://github.com/pavancsingh/SamarthComputer](https://github.com/pavancsingh/SamarthComputer)
