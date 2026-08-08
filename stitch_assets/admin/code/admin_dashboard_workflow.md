# Admin Dashboard Frontend Workflow & Architecture

This document provides a comprehensive structural breakdown of the **Frontend Admin Dashboard Workflow** for **Samarth Computers, Khandala**. Built strictly with **React 19, Vite, Tailwind CSS, Lucide React, Framer Motion**, and **Supabase (JS Client)**.

---

## 1. High-Level Component & Data Flow Diagram

```mermaid
flowchart TD
    A["👤 Admin User (Browser)"] -->|Access /admin| B["AdminLoginPage.jsx"]
    B -->|Submit Credentials| C["AuthContext.jsx"]
    C -->|Authenticate Session| D["AdminDashboard.jsx"]

    subgraph Frontend Admin State Layer
        D --> E["sharedStore.js (Reactive Singleton Store)"]
        D --> F["AdminRepository.js (Data Access Layer)"]
        D --> G["ImageCropperModal.jsx (Canvas Cropper)"]
    end

    subgraph Data & Storage Persistence
        E -->|Local Cache| H["LocalStorage"]
        F -->|PostgreSQL Queries| I["Supabase Database"]
        G -->|Upload Cropped JPEG| J["StorageService.js"]
        J -->|Push to Bucket| K["Supabase Storage ('samarth-media')"]
    end

    subgraph Public Website Views (Live Reactive Sync)
        E -->|Notify Listeners| L["HomePage.jsx"]
        E -->|Notify Listeners| M["FacultyPage.jsx"]
        E -->|Notify Listeners| N["BatchTimetableWidget.jsx"]
        E -->|Notify Listeners| O["News.jsx"]
    end
```

---

## 2. Component Hierarchy & Role Mapping

| File Path | Role & Responsibilities | Key Dependencies |
| :--- | :--- | :--- |
| **`src/pages/Admin/AdminLoginPage.jsx`** | Centered Login Card UI. Handles email & master password authentication. | `AuthContext.jsx`, `lucide-react` |
| **`src/pages/Admin/AdminDashboard.jsx`** | Master Admin Management Container. Renders Header controls, Credentials Banner, Tab Navigation, Grid Tables, Edit Modals, and Cropper triggers. | `sharedStore`, `AdminRepository`, `StorageService`, `ImageCropperModal` |
| **`src/components/admin/ImageCropperModal.jsx`** | Interactive HTML5 Canvas Cropper. Features Zoom slider, 90° rotation, pan dragging, and aspect-ratio mask cropping (1:1 & 16:9). | HTML5 `<canvas>`, `lucide-react` |
| **`src/repositories/sharedStore.js`** | Client-side reactive memory store. Maintains active datasets (`courses`, `cscServices`, `govtServices`, `siteGallery`, `faculty`, `batches`, `news`, `inquiries`) and notifies subscribers upon mutations. | `loadStorage()`, `saveStorage()` |
| **`src/repositories/AdminRepository.js`** | Bidirectional Data Access Repository. Queries Supabase PostgreSQL tables and updates `sharedStore`. Handles 1-click bulk sync (`syncAllLocalDataToSupabase`). | `@supabase/supabase-js`, `sharedStore` |
| **`src/services/StorageService.js`** | File upload service. Uploads files to Supabase Storage bucket `'samarth-media'` with Base64 data URL fallback. | `@supabase/supabase-js` |

---

## 3. Tab Navigation & Workflow Breakdown

The Admin Dashboard is structured into **9 distinct management tabs**:

```
[📥 Inbox Leads] -> [📚 Courses] -> [📜 CSC] -> [🏛️ Govt] -> [⏰ Batch Timetable] -> [📢 News & Updates] -> [👨‍🏫 Faculty] -> [🖼️ Campus Photos] -> [⚙️ Logo & Hero]
```

### Tab Details & Action Workflows:

1. **📥 Inbox Leads (`tab === 'inquiries'`)**:
   - **View**: Lists student lead submissions (Course admissions, CSC requests, Hardware repairs).
   - **Actions**: Change status (`New Lead`, `In Process`, `Completed`) or Delete lead.

2. **📚 Courses (`tab === 'courses'`)**:
   - **View**: Displays all courses with category tags, fee, and module counts.
   - **Actions**: Add new course, Edit course syllabus modules, Delete course, Upload course thumbnail with 4:3 cropper.

3. **📜 CSC Services (`tab === 'csc'`)**:
   - **View**: Manages Digital Seva CSC portal service cards.
   - **Actions**: Add/Edit/Delete timeline, Govt fees, required documents checklist, and steps.

4. **🏛️ Govt Services (`tab === 'govt'`)**:
   - **View**: Manages Tehsildar & MahaOnline revenue services.
   - **Actions**: Add/Edit/Delete revenue certificates and eligibility guidelines.

5. **⏰ Batch Timetable 2026 (`tab === 'batches'`)**:
   - **View**: Manages daily time slots categorized into `🌅 Morning`, `☀️ Afternoon`, and `🌙 Evening`.
   - **Actions**: Add/Edit/Delete batch timing, course title, status badge, and seat counts. Automatically updates public `BatchTimetableWidget.jsx`.

6. **📢 Programs & Updates (`tab === 'news'`)**:
   - **View**: Manages announcements, exam alerts, and admission news.
   - **Actions**: Add/Edit/Delete news headlines, date tags, and descriptions. Automatically updates public `News.jsx`.

7. **👨‍🏫 Faculty & Instructors (`tab === 'faculty'`)**:
   - **View**: Manages instructor profiles, experience badges, and bio.
   - **Actions**: Add/Edit/Delete faculty members. Includes **Interactive 1:1 Square Image Cropper** before uploading photo to Supabase storage. Automatically updates public `FacultyPage.jsx` and `Faculty.jsx`.

8. **🖼️ Campus Photos (`tab === 'gallery'`)**:
   - **View**: Manages campus event photos, lab infrastructure pictures, and celebration photos.
   - **Actions**: Add/Edit/Delete gallery cards. Includes **Interactive 16:9 Aspect Ratio Image Cropper** for widescreen presentation.

9. **⚙️ Logo & Hero Image (`tab === 'settings'`)**:
   - **View**: Controls site header brand logo and Hero section background banner URL.
   - **Actions**: Custom upload with cropper tool and immediate site-wide branding refresh.

---

## 4. Interactive Image Cropper & Upload Sub-Workflow

```
[User clicks "Choose & Crop Photo"]
           │
           ▼
[Triggers handleFileSelect(e, folder, aspectRatio)]
           │
           ▼
[Sets cropState -> Mounts ImageCropperModal.jsx]
           │
           ▼
[User adjusts Zoom / Pan Drag / Rotation on Canvas]
           │
           ▼
[User clicks "Crop & Upload"]
           │
           ▼
[Output Canvas renders cropped region & exports JPEG Blob]
           │
           ▼
[StorageService.uploadImage(blob, folder) -> Supabase Storage ('samarth-media')]
           │
           ▼
[Returns Public URL -> Updates active editing form state (imageUrl)]
```

---

## 5. Reactive Data Synchronization Architecture

To guarantee **zero page reloads** and **instant public updates**, the frontend uses an **Observer Pattern**:

1. **Initial Load**:
   `AdminDashboard` calls `AdminRepository.getAllFaculty()`, `getAllCourses()`, `getAllBatches()`, etc.
2. **Supabase Query**:
   `AdminRepository` fetches PostgreSQL rows and passes data to `sharedStore.syncFacultyFromRemote(data)`.
3. **Local Store Update**:
   `sharedStore` updates internal memory array, caches to `LocalStorage`, and invokes `this.notify()`.
4. **Subscriber Notification**:
   All mounted components (`HomePage`, `FacultyPage`, `BatchTimetableWidget`, `News`, `AdminDashboard`) listening via `sharedStore.subscribe(listener)` automatically re-render with fresh data!
