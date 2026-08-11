# Samarth Computers Khandala — Project Presentation Package

## Overview
Welcome to the official documentation and presentation package for **Samarth Computers Khandala**, a full-stack, bilingual (Marathi/English) computer institute web application built with **React 19, Vite 6, Tailwind CSS 3.4, and Supabase (PostgreSQL + Storage)**.

---

## 📁 Package Structure

```
docs/project-presentation/
├── PROJECT-README.md             # Package index & project overview
├── PROJECT-REPORT.md             # Comprehensive BCA-level academic project report
├── PPT-CONTENT.md                # 18-slide presentation content with speaker notes
├── ARCHITECTURE.md               # Technical system architecture & component diagrams
├── DATABASE-DOCUMENTATION.md     # PostgreSQL schema, tables, RLS & persistence flow
├── DEMO-SCRIPT.md                # Step-by-step 7-10 minute live demonstration script
├── PORTFOLIO-DESCRIPTION.md      # Resume, LinkedIn & portfolio showcase blurbs
└── screenshots/
    └── README.md                 # List & description of required application screenshots
```

---

## 🎯 Quick Project Summary

- **Institute Name:** Samarth Computers Khandala
- **Accreditation:** MKCL Authorized Learning Center (ALC 13210399 / 13210273) & CSC Digital Seva Kendra
- **Target Audience:** Students, job seekers, local citizens needing government certificates, center administrators
- **Key Modules:** Courses Catalog, Online CSC Services, Govt Revenue Services, Faculty Directory, News & Announcements, Batch Timetable, Campus Photo Gallery, Student Certificate Verification, Admin Dashboard & Settings.

---

## 💻 Technical Stack Overview

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | React 19 + Vite 6 (JavaScript / JSX) |
| **Styling & Design System**| Tailwind CSS 3.4 (Stitch Design Tokens: `#C62828` Primary, `#10B981` Emerald, `#0F172A` Dark Navy) |
| **Iconography & Motion** | Lucide React + Framer Motion |
| **Backend & Database** | Supabase PostgreSQL Database (10 Tables with RLS) |
| **Authentication** | Supabase Auth + Local Rate-Limited Fallback (5 failed attempts lockout) |
| **File Storage** | Supabase Storage `samarth-media` Bucket with Base64 Data URL fallback |
| **Hosting & Deployment** | Cloudflare Pages (`https://samarth-computers.pages.dev`) |
