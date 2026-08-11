# Technical Architecture & System Design — Samarth Computers Khandala

## System Architecture Diagram

```
+-------------------------------------------------------------------------+
|                                  USER                                   |
|               (Student / Citizen / Admin / Visitor Device)              |
+-------------------------------------------------------------------------+
                                    |
                                    | HTTP / HTTPS Requests
                                    v
+-------------------------------------------------------------------------+
|                          REACT 19 / VITE 6 FRONTEND                     |
|                                                                         |
|  +---------------------+  +---------------------+  +-----------------+  |
|  |   App Shell & View  |  |  Stitch Design Sys  |  |   AuthContext   |  |
|  | Router (currentView)|  | (Tailwind CSS 3.4)  |  | (Rate Limiter)  |  |
|  +---------------------+  +---------------------+  +-----------------+  |
|  +-------------------------------------------------------------------+  |
|  | Components (Header, Navbar, Footer, Hero, CSCServices, Courses)   |  |
|  +-------------------------------------------------------------------+  |
|  +-------------------------------------------------------------------+  |
|  | Views (Home, Courses, CSC, Govt, About, Faculty, AdminDashboard)    |  |
|  +-------------------------------------------------------------------+  |
+-------------------------------------------------------------------------+
                                    |
                                    | Method Invocations
                                    v
+-------------------------------------------------------------------------+
|                       REPOSITORY & SERVICE LAYER                        |
|                                                                         |
|  +-----------------------+  +-------------------+  +-----------------+  |
|  |    AdminRepository    |  | CourseRepository  |  |InquiryRepository|  |
|  +-----------------------+  +-------------------+  +-----------------+  |
|  +-----------------------+  +-------------------+  +-----------------+  |
|  |     sharedStore       |  |  StorageService   |  |   supabase.js   |  |
|  | (LocalStorage Cache)  |  | (Media Bucket)    |  | (JS Client)     |  |
|  +-----------------------+  +-------------------+  +-----------------+  |
+-------------------------------------------------------------------------+
                                    |
                                    | Supabase Client API Requests
                                    v
+-------------------------------------------------------------------------+
|                                SUPABASE                                 |
|                                                                         |
|  +-----------------------+  +-------------------+  +-----------------+  |
|  |      PostgreSQL       |  |  Authentication   |  | Storage Bucket  |  |
|  | (10 RLS Tables)       |  |  (Email/Password) |  | (samarth-media) |  |
|  +-----------------------+  +-------------------+  +-----------------+  |
|  +-------------------------------------------------------------------+  |
|  | Row Level Security (RLS) Policies (Public Select/Insert + Admin)  |  |
|  +-------------------------------------------------------------------+  |
+-------------------------------------------------------------------------+
```

---

## Architecture Components Overview

### 1. Presentation Layer (React 19 + Vite 6)
- **App Shell (`App.jsx`)**: Enforces top-level state management with `currentView` routing (`home`, `courses`, `details`, `csc`, `govt`, `about`, `faculty`, `gallery`, `contact`, `timetable`, `verification`, `admin`).
- **AuthProvider (`AuthContext.jsx`)**: Encapsulates admin login session state, persistent LocalStorage tokens (`samarth_admin_session`), and rate-limiting brute force protection (5 failed attempts lockout).
- **Design System (`index.css` & `tailwind.config.js`)**: Pure Tailwind CSS 3.4 with Stitch design tokens (`#C62828` Primary Red, `#10B981` Emerald, `#0F172A` Dark Navy).

### 2. Repository & Data Access Layer
- **`AdminRepository.js`**: Direct interface to Supabase database. Handles CRUD operations for all 10 tables with automatic fallback column handling (`upsertWithColumnFallback`).
- **`CourseRepository.js`**: Fetches course catalog items, filtered by category and active status.
- **`InquiryRepository.js`**: Manages lead submissions for course admissions, CSC services, and government certificate inquiries.
- **`sharedStore.js`**: Dual-layer state manager using reactive observer patterns (`subscribe`). Serves as instant LocalStorage cache fallback if Supabase is offline.
- **`StorageService.js`**: Handles file uploads to Supabase Storage bucket `samarth-media`. Generates cache-busting versioned URLs (`?v=timestamp`) and provides Base64 Data URL fallback.

### 3. Supabase Backend Infrastructure
- **PostgreSQL Database**: Relational database storing inquiries, courses, services, faculty, gallery items, batch timetables, news announcements, certificates, and site settings.
- **Row Level Security (RLS)**: Policies enforcing public read-only access for catalog tables, public insert for lead inquiries, and full write access for administrators.
- **Storage Bucket (`samarth-media`)**: Public storage bucket hosting center logos, hero banners, course thumbnails, and faculty portraits.
