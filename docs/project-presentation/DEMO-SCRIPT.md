# Live Demonstration Script — Samarth Computers Khandala

**Target Duration:** 7 – 10 Minutes  
**Demonstrator:** Project Presenter / Student Developer  
**Live Site URL:** `https://samarth-computers.pages.dev` (or `http://localhost:3000`)

---

## ⏱️ Live Demonstration Sequence

| Step | Time | Screen / View | Demonstration Actions | Key Talking Points |
| :-: | :-: | :--- | :--- | :--- |
| **1** | 0:00 - 0:30 | **Browser Launch** | Open `https://samarth-computers.pages.dev` in browser. | "Notice the fast load time under 1 second powered by Vite and Cloudflare Pages CDN." |
| **2** | 0:30 - 1:30 | **Home Page** | Scroll through Hero banner, MKCL trust badges, stats counter, and click the Marathi / English toggle. | "Here is the Home Page featuring full bilingual support in Marathi and English with zero page reload." |
| **3** | 1:30 - 2:30 | **Courses Catalog** | Click **Courses** in navbar. Filter by category (Govt, Typing, Accounting). Click MS-CIT **Details**. Click **Apply Now**. | "Students can browse courses, inspect syllabus modules, check fees, and submit direct admission inquiries." |
| **4** | 2:30 - 3:30 | **CSC Services** | Click **Services** in navbar. Click **Document Checklist** for Aadhaar or PAN Card. | "For local citizens, our CSC desk provides clear document checklists before visiting the center." |
| **5** | 3:30 - 4:30 | **Faculty, News & Gallery** | View Faculty mentor cards, News announcements ticker, Photo Gallery grid, and Batch Timetable schedule. | "Displays center head profiles, active batch schedules, and campus lab photos." |
| **6** | 4:30 - 5:15 | **Contact & Map** | Click **Contact**. Highlight office address, click-to-call phone button, WhatsApp link, and embedded Google Map. | "Walk-in visitors can find exact location coordinates, operating hours, and direct call buttons." |
| **7** | 5:15 - 5:45 | **Admin Login** | Click **Admin** link in footer or navigate to `/admin`. Enter allowed email & password (`pawansingh3760@gmail.com`). | "Now let me access the secure Admin Dashboard. The system features brute-force rate limiting and session persistence." |
| **8** | 5:45 - 6:45 | **Admin Dashboard** | Show Overview KPI cards, Recent Lead feed, and recent inquiry status updates (`New Lead` → `In Process`). | "The Dashboard displays live lead counts, active courses, and allows instant status updating for student leads." |
| **9** | 6:45 - 8:00 | **CRUD Demo** | Navigate to **Courses** tab in sidebar. Click **Add New Course**. Create a demo course entry, edit a fee, then delete. | "Let's demonstrate real-time CRUD: adding a new course updates the database and reflects immediately on the public site." |
| **10** | 8:00 - 9:00 | **Settings Accordion** | Expand **Settings & Config** accordion in sidebar. Open **Site Information**, **SEO**, and **Branding**. Edit a value & click **Save**. | "All secondary website settings are organized into a single expandable accordion, saving directly to `site_settings`." |
| **11** | 9:00 - 9:30 | **Supabase Persistence** | Refresh the browser tab while on Admin Dashboard or public page. Confirm saved value remains intact. | "Upon refreshing, all updated content persists cleanly via Supabase PostgreSQL." |
| **12** | 9:30 - 10:00 | **Logout & Wrap-Up** | Click **Logout** button. Confirm redirect to login/home screen. | "Clicking Logout securely terminates the admin session. This concludes our live demonstration. Thank you!" |
