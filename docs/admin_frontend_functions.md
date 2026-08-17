# Samarth Computers Admin Dashboard — Frontend Specification & Functional Map

This document outlines all **frontend functionalities, UI controls, user actions, modal forms, state management, and frontend handler functions** available in the Admin Interface (`AdminLoginPage.jsx` & `AdminDashboard.jsx`).

> [!NOTE]
> This specification focuses exclusively on **frontend actions and UI controls**. Backend database queries, SQL schemas, RLS policies, and server-side code are excluded.

---

## 1. Authentication & Session UI (`AdminLoginPage.jsx`)

### What the Admin Sees & Interacts With
- **Login Card Header:** Displays center title, admin portal badge, and lock icon.
- **Error Alert Banner:** Displays inline error messages for invalid credentials, locked accounts, or network issues.
- **Email / Username Input:** Input field accepting full admin email address or shortcut usernames (`admin`, `samarth`, `pavan`, `pawansingh`, `sagarbhosale`).
- **Master Password Input:** Password field with an interactive eye icon button (`Eye` / `EyeOff`) to toggle plain-text password visibility.
- **Sign In Button:** Submit button triggering authentication; displays a loading state (`Authenticating...`) while processing.
- **Back to Main Website Shortcut:** "← Back to Main Website" button returning the user to the public homepage.

### Frontend Handlers & State
- `email`, `password`: Form input state.
- `showPassword`: Boolean toggle for password visibility.
- `errorMsg`: String state holding validation and error alerts.
- `isSubmitting`: Loading state disabling submit buttons during login processing.
- `handleSubmit(e)`: Form submit handler invoking `loginAdmin(email, password)`.
- `handleBackToHome()`: Navigation callback redirecting to `currentView = 'home'`.

---

## 2. Dashboard Navigation & Header Bar (`AdminDashboard.jsx`)

### Header Bar Controls
- **Mobile Menu Toggle (`Menu` icon):** Drawer toggle for smaller viewports (`mobileMenuOpen`).
- **Global Search Bar (`Search` icon):** Live filter input field (`searchQuery`) filtering leads, courses, services, and faculty across the dashboard.
- **Refresh Live Data Button (`RefreshCw` icon):** Triggers `loadAllData()` to reload fresh state and displays a spinning icon while fetching.
- **Sync Supabase Button (`DatabaseBackup` icon):** Triggers `handleSyncToSupabase()` to sync local frontend store changes.
- **Logout Button (`LogOut` icon):** Invokes `handleLogout()` to terminate the admin session and return to the main website.
- **Action Banners (`actionNotice`):** Dismissible notification banners displaying success (green) or error (red) toast alerts after operations.

### Sidebar Navigation Groups (`tab` state)
1. **Core Operational Modules:**
   - `overview`: Dashboard Overview & KPI Metrics
   - `inquiries`: Inbox Leads & Enquiries
   - `courses`: Computer Courses Management
   - `csc`: Online CSC & MahaOnline Services
   - `faculty`: Faculty & Staff Profiles
   - `news`: News & Announcement Tickers
   - `timetable`: Classroom Batch Schedule
   - `gallery`: Campus Photo Gallery
2. **Website Page Content Controls:**
   - `home_control`: Home Page Hero & Section Ordering
   - `about_control`: About Us Content & Mission/Vision
   - `contact_control`: Contact Info, Call CTA & Social Links
3. **System Settings Submenu (Expandable Accordion):**
   - `settings`: Site Branding (Logo & Hero Banner)
   - `settings_social`: Contact & Social Media Configuration
   - `settings_info`: Center Registration & Accreditation Info

---

## 3. Module-by-Module Frontend Actions & Functions

### 3.1 Overview Dashboard (`tab === 'overview'`)
- **KPI Stat Cards:** Views summary counts for Total Leads, Active Courses, CSC Services, and Faculty Members.
- **Recent Lead Feed:** Views the 5 most recent student inquiries with instant status badges.
- **Quick Action Shortcuts:** Direct navigation buttons to Add Course (`courses`), Batch Schedule (`timetable`), and Branding Settings (`settings`).
- **"View All Leads" Link:** Switches active tab directly to `inquiries`.

---

### 3.2 Inbox Leads & Enquiries (`tab === 'inquiries'`)
- **View:** Data table of leads showing Student Name, Mobile Number, Requested Course/Service, Batch/Timing, Type Badge (`Course` / `Service`), Status Badge (`New Lead`, `In Process`, `Completed`).
- **Filter Pills:** Clickable filter tabs (`All`, `Course Leads`, `Service Requests`, `New Lead`, `In Process`, `Completed`) updating `leadFilter` state.
- **Search Filter:** Live search filtering leads by name, phone number, or course name.
- **Add Lead Button:** Opens the **Inquiry Lead Modal Form** (`formType = 'inquiry'`).
- **WhatsApp Direct Action:** Button generating a direct `wa.me/91<mobile>` chat URL pre-filled with a greeting message.
- **Status Change Action ("Done" button):** Triggers `handleInquiryStatus(id, 'Completed')` to update lead status.
- **Delete Action:** Prompts confirm dialog and triggers `handleDeleteInquiry(id)`.
- **Inquiry Modal Form Controls:**
  - Student Name text input.
  - Mobile Number telephone input.
  - Requested Course / Service text input.
  - Status dropdown (`New Lead`, `In Process`, `Completed`).
  - Submit button saving lead entry.

---

### 3.3 Computer Courses Management (`tab === 'courses'`)
- **View:** Card grid displaying course banner image thumbnail, title, category tag (`govt`, `job`, `klic`, `design`), duration, Primary/Home badge, Featured status badge, and display order position (`#`).
- **Add Course Button:** Opens the **Course Modal Form** (`formType = 'course'`) with empty defaults.
- **View Details Button:** Opens the **Slide-Over Side Drawer** (`drawerCourse`) showing full course details, syllabus modules, and practical skills.
- **Edit Button:** Populates `editingItem` state and opens the **Course Modal Form**.
- **Delete Button:** Prompts confirm dialog and triggers `handleDeleteCourse(id)`.
- **Course Modal Form Controls:**
  - Course Title text input.
  - Course Category dropdown (`Government`, `Job Oriented`, `MKCL KLiC`, `Design & CAD`).
  - Display Order numeric input.
  - Primary Course Checkbox (`isPrimary` / `is_primary` — toggles visibility on Home Page).
  - Featured Status Checkbox (`isFeatured` / `is_featured`).
  - Duration text input (e.g. `2 Months (2 hrs/day)`).
  - Short Overview / Description (English & Marathi textareas).
  - Curriculum Modules multiline textarea (one module per line).
  - Practical Skills & Exercises multiline textarea (one skill per line).
  - Eligibility / Who It's For text input.
  - Course Banner Photo picker button & Image URL text input.
  - Submit button invoking `handleSaveCourse(e)`.

---

### 3.4 CSC & Online Services (`tab === 'csc'`)
- **View:** Card grid of online services displaying Category tag, Timeline, Title (EN & MR), Overview snippet, and action buttons.
- **Add CSC Service Button:** Opens the **CSC Modal Form** (`formType = 'csc'`).
- **Edit & Delete Buttons:** Triggers `setEditingItem(service)` or `handleDeleteCSC(id)`.
- **CSC Modal Form Controls:**
  - Service Category dropdown (`Scholarship`, `Exams`, `CSC Identity`, `Admissions`, `Utilities`, `Revenue`).
  - Service Title (English & Marathi text inputs).
  - Badge Tag text input (e.g., `MPSC`, `Govt Service`).
  - Status select (`Open / Accepting`, `Closed / Expired`).
  - Deadline Note & Timeline inputs.
  - Official Portal URL text input (`official_url`).
  - Govt/Portal Fee text input.
  - Featured Service Checkbox.
  - Overview Description textarea.
  - Required Documents multiline textarea (one per line).
  - Submit button invoking `handleSaveCSC(e)`.

---

### 3.5 Government Services Catalog (`tab === 'govt'`)
- **View:** Card grid of government certificates and scheme services.
- **Add / Edit / Delete Controls:** Triggers `formType = 'govt'` modal or `handleDeleteGovt(id)`.
- **Govt Modal Form Controls:**
  - Government Service Title input.
  - Overview Description textarea.
  - Submit button invoking `handleSaveGovt(e)`.

---

### 3.6 Classroom Batch Timetable (`tab === 'timetable'`)
- **View:** Data table of classroom schedules showing Time Slot, Course Program, Category tag (`morning`, `afternoon`, `evening`), Status badge (`Admission Open`, `Full`), Seats Left counter.
- **Add Batch Slot Button:** Opens the **Batch Modal Form** (`formType = 'batch'`).
- **Edit & Delete Controls:** Triggers `setEditingItem(batch)` or `handleDeleteBatch(id)`.
- **Batch Modal Form Controls:**
  - Time Slot text input (e.g. `08:00 AM - 09:30 AM`).
  - Course Title text input.
  - Status text input (e.g. `Admission Open`).
  - Seats Left text input (e.g. `5 Seats Left`).
  - Submit button invoking `handleSaveBatch(e)`.

---

### 3.7 News & Announcements (`tab === 'news'`)
- **View:** Grid of news cards showing category tag (`Admissions`, `Exams`, `Scholarship`, `Notice`), date, title, details snippet.
- **Add Announcement Button:** Opens the **News Modal Form** (`formType = 'news'`).
- **Edit & Delete Controls:** Triggers `setEditingItem(news)` or `handleDeleteNews(id)`.
- **News Modal Form Controls:**
  - Announcement Title (English & Marathi inputs).
  - Category dropdown (`Admissions`, `Exams & Results`, `Scholarship`, `Notice`).
  - Announcement Date text input.
  - Description / Details textarea.
  - Submit button invoking `handleSaveNews(e)`.

---

### 3.8 Faculty & Staff Members (`tab === 'faculty'`)
- **View:** Profile cards showing profile headshot photo, faculty full name, badge tag (`Faculty` / `Center Head`), designation/role, experience summary.
- **Add Faculty Member Button:** Opens the **Faculty Modal Form** (`formType = 'faculty'`).
- **Edit & Delete Icon Buttons:** Triggers `setEditingItem(fac)` or `handleDeleteFaculty(id)`.
- **Faculty Modal Form Controls:**
  - Faculty Full Name input.
  - Designation / Role input.
  - Experience text input.
  - Headshot Photo File Picker & Image URL input.
  - Submit button invoking `handleSaveFaculty(e)`.

---

### 3.9 Campus Photo Gallery (`tab === 'gallery'`)
- **View:** Photo grid displaying campus images, category tag (`Campus`, `Events`, `Classroom`, `Facilities`), title, description.
- **Upload Dropzone Card:** Interactive card in grid enabling 1-click file selection for direct photo upload.
- **Upload New Photo Button:** Opens the **Gallery Modal Form** (`formType = 'gallery'`).
- **Edit & Delete Controls:** Triggers `setEditingItem(photo)` or `handleDeleteGalleryItem(id)`.
- **Gallery Modal Form Controls:**
  - Photo Title (English & Marathi inputs).
  - Category select (`Campus Infrastructure`, `Certificate Events`, `Practical Classroom`, `Facilities & Counters`).
  - Description text input.
  - Photo File Picker button & Image URL text input.
  - Submit button invoking `handleSaveGalleryItem(e)`.

---

### 3.10 Site Branding & Media Settings (`tab === 'settings'`)
- **View:** Brand Logo and Hero Banner background image management section with side-by-side "Current Active" vs "New Selected Preview" cards.
- **File Validation Controls:** Enforces file type check (`image/*`) and file size limit (<= 5 MB). Displays error alert if invalid.
- **Instant Preview:** Selecting a new file generates an instant local Object URL preview (`URL.createObjectURL`).
- **Discard Action:** "Discard" button (`handleCancelBrandingImage`) clears selected file previews and revokes Object URLs.
- **Branding Form Controls:**
  - Logo File Selector button & Logo URL input field.
  - Hero Banner File Selector button & Hero Banner URL input field.
  - "Save Site Branding Settings" submit button invoking `handleSaveSettings(e)`.

---

### 3.11 Home Page Content Controls (`tab === 'home_control'`)
- **Hero Banner Copy:** Input fields for Hero Heading (EN & MR), Hero Subtitle (EN & MR), Badge Tag (MR), CTA Button Text (MR), and CTA Target View select (`courses`, `services`, `contact`, `timetable`).
- **Section Visibility & Ordering:**
  - Checkboxes to show/hide individual sections on the Home Page (`visible`).
  - Display Order numeric inputs to reorder Home Page sections (`order`).
- **Submit Button:** Invokes `handleSaveSettings(e)` to update home settings.

---

### 3.12 About Page Content Controls (`tab === 'about_control'`)
- **About Copy:** Input fields for About Heading (EN & MR) and Institute Overview Description (EN & MR).
- **Institute Building Photo:** Upload file picker and Image URL input field for the institute photo.
- **Mission & Vision Statements:** Inputs for Mission (EN & MR) and Vision (EN & MR).
- **Submit Button:** Invokes `handleSaveSettings(e)` to update about settings.

---

### 3.13 Contact, Call CTA & Social Settings (`tab === 'contact_control'` / `settings_social`)
- **Primary Call CTA Settings:** Call Phone Number, Call Button Label (EN & MR).
- **General Contact:** Office Phone Number, WhatsApp Number, Email Address, Physical Address (EN & MR), Office Working Hours (EN & MR), Google Maps Embed iframe URL.
- **Social Media Handles:** Input fields for Facebook URL, Instagram URL, YouTube URL, and WhatsApp direct chat link.
- **Test Shortcuts:** "Open Link" / "Open Chat" buttons testing social handles in new tabs.
- **Submit Button:** Invokes `handleSaveSettings(e)` to update contact & social settings.

---

### 3.14 Site Information & Accreditation (`tab === 'settings_info'`)
- **Center Registration Fields:** Inputs for Institute Name (EN & MR), MKCL ALC Center Code (`13210399 / 13210273`), and CSC Digital Seva Kendra ID.
- **SEO Metadata Fields:** Inputs for Meta Title, Meta Description, and Meta Keywords.
- **Submit Button:** Invokes `handleSaveSettings(e)` to update institute info and SEO settings.

---

## 4. Frontend Media & Helper Subsystems

### Image Upload Handler (`handleFileUpload`)
- Triggered by file `<input type="file" accept="image/*">` change events across form modals.
- Invokes `StorageService.uploadImage(file, folder)` with folder destination (`courses`, `gallery`, `faculty`, `about`, `logo`, `hero`).
- Sets button loading state (`uploadingImage = true`) and displays spinning loader icon (`Loader2`).
- Updates `editingItem.imageUrl` state with the generated version-stamped public URL (`toVersionedUrl`).

### Data Refresh & Observer Subscriptions
- Component mounts a listener to `sharedStore.subscribe()` to auto-update frontend state when store contents change.
- `loadAllData()` function refreshes all local arrays (`inquiries`, `courses`, `cscServices`, `govtServices`, `siteGallery`, `facultyList`, `batchesList`, `newsList`).
- Cleans up Object URLs on component unmount (`useEffect` return cleanup).
